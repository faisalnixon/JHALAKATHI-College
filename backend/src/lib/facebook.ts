import { getEnv } from "./env";

const GRAPH_API_VERSION = "v26.0";
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

const CACHE_TTL_MS = 15 * 60 * 1000;

export interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
}

export interface GalleryAlbum {
  id: string;
  name: string;
  photos: GalleryPhoto[];
}

export interface GalleryResponse {
  albums: GalleryAlbum[];
  cachedAt: string;
}

interface FacebookPaging {
  next?: string;
}

interface FacebookAlbum {
  id: string;
  name?: string;
}

interface FacebookImage {
  source?: string;
  width?: number;
  height?: number;
}

interface FacebookPhoto {
  id: string;
  name?: string;
  images?: FacebookImage[];
  picture?: string;
}

interface FacebookListResponse<T> {
  data: T[];
  paging?: FacebookPaging;
}

interface GalleryCache {
  data: GalleryResponse;
  expiresAt: number;
}

let galleryCache: GalleryCache | null = null;

async function facebookFetch<T>(
  endpoint: string
): Promise<T> {
  const env = getEnv();

  const url = new URL(
    endpoint.startsWith("http")
      ? endpoint
      : `${GRAPH_API_BASE_URL}${endpoint}`
  );

  url.searchParams.set(
    "access_token",
    env.FACEBOOK_PAGE_ACCESS_TOKEN
  );

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Facebook Graph API error ${response.status}: ${errorText}`
    );
  }

  return (await response.json()) as T;
}

async function fetchAllPages<T>(
  firstUrl: string
): Promise<T[]> {
  const results: T[] = [];

  let nextUrl: string | null = firstUrl;

  while (nextUrl) {
  const response: FacebookListResponse<T> =
    await facebookFetch<FacebookListResponse<T>>(nextUrl);

  results.push(...response.data);

  nextUrl = response.paging?.next ?? null;
}

  return results;
}

async function fetchAlbums(): Promise<FacebookAlbum[]> {
  const env = getEnv();

  const url = new URL(
    `${GRAPH_API_BASE_URL}/${env.FACEBOOK_PAGE_ID}/albums`
  );

  url.searchParams.set("fields", "id,name");
  url.searchParams.set("limit", "100");

  return fetchAllPages<FacebookAlbum>(url.toString());
}

async function fetchAlbumPhotos(
  albumId: string,
  albumName: string
): Promise<GalleryPhoto[]> {
  const url = new URL(
    `${GRAPH_API_BASE_URL}/${albumId}/photos`
  );

  url.searchParams.set(
    "fields",
    "id,name,images,picture"
  );

  url.searchParams.set("type", "uploaded");

  url.searchParams.set("limit", "100");

  const photos =
    await fetchAllPages<FacebookPhoto>(
      url.toString()
    );

  return photos
    .map((photo) => {
      /*
       * Facebook can return multiple image sizes.
       * Pick the largest available image.
       */
      const bestImage = photo.images
        ?.filter((image) => Boolean(image.source))
        .sort(
          (a, b) =>
            (b.width ?? 0) * (b.height ?? 0) -
            (a.width ?? 0) * (a.height ?? 0)
        )[0];

      const url =
        bestImage?.source ??
        photo.picture;

      if (!url) {
        return null;
      }

      return {
        id: photo.id,
        url,
        alt: photo.name
          ? `${albumName} - ${photo.name}`
          : albumName,
      };
    })
    .filter(
      (photo): photo is GalleryPhoto =>
        photo !== null
    );
}

async function fetchGalleryFromFacebook(): Promise<GalleryResponse> {
  const albums = await fetchAlbums();

  const excludedAlbumNames = new Set([
    "photos",
    "cover photos",
    "profile pictures",
  ]);

  const normalizedAlbums: GalleryAlbum[] = [];

  for (const album of albums) {
    const albumName =
      album.name?.trim() || "Facebook Album";

    /*
     * Facebook automatically creates some albums that
     * should not appear in the college gallery.
     */
    if (
      excludedAlbumNames.has(
        albumName.toLowerCase()
      )
    ) {
      continue;
    }

    const photos = await fetchAlbumPhotos(
      album.id,
      albumName
    );

    /*
     * Don't return albums that contain no usable
     * images.
     */
    if (photos.length === 0) {
      continue;
    }

    normalizedAlbums.push({
      id: album.id,
      name: albumName,
      photos,
    });
  }

  return {
    albums: normalizedAlbums,
    cachedAt: new Date().toISOString(),
  };
}

export async function getFacebookGallery(): Promise<GalleryResponse> {
  const now = Date.now();

  /*
   * Fresh cache
   */
  if (
    galleryCache &&
    galleryCache.expiresAt > now
  ) {
    return galleryCache.data;
  }

  try {
    const freshData =
      await fetchGalleryFromFacebook();

    galleryCache = {
      data: freshData,
      expiresAt: now + CACHE_TTL_MS,
    };

    return freshData;
  } catch (error) {
    /*
     * If Facebook is temporarily unavailable,
     * serve the previous cache if we have one.
     */
    if (galleryCache) {
      console.error(
        "Facebook request failed. Serving stale gallery cache.",
        error
      );

      return galleryCache.data;
    }

    throw error;
  }
}

/*
 * Useful if you later want an admin endpoint
 * that manually clears the cache.
 */
export function clearFacebookGalleryCache(): void {
  galleryCache = null;
}