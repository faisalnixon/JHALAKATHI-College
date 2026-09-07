import { getEnv } from "./env";

const GRAPH_API_VERSION = "v26.0";
const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

const CACHE_TTL_MS = 15 * 60 * 1000;

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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

export interface NoticePhoto {
  id: string;
  url: string;
  alt: string;
}

export interface NoticePost {
  id: string;
  description: string;
  createdTime: string;
  updatedTime: string;
  hashtags: string[];
  photos: NoticePhoto[];
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

/*
 * The posts feed uses a DIFFERENT attachment shape than the album/photos
 * endpoint above: a single already-sized image at `media.image.src`
 * (not an `images[]` array of multiple resolutions), and — for
 * multi-photo posts — a `subattachments.data[]` array of the same shape
 * nested one level deep.
 */
interface FacebookPostAttachmentNode {
  description?: string;
  media?: {
    image?: {
      src?: string;
      width?: number;
      height?: number;
    };
  };
  subattachments?: {
    data?: FacebookPostAttachmentNode[];
  };
  target?: {
    id?: string;
    url?: string;
  };
  type?: string;
}

interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  updated_time: string;
  attachments?: {
    data?: FacebookPostAttachmentNode[];
  };
}

interface FacebookListResponse<T> {
  data: T[];
  paging?: FacebookPaging;
}

/* -------------------------------------------------------------------------- */
/*                            SHARED FETCH HELPERS                            */
/* -------------------------------------------------------------------------- */

async function facebookFetch<T>(endpoint: string): Promise<T> {
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

async function fetchAllPages<T>(firstUrl: string): Promise<T[]> {
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

/* -------------------------------------------------------------------------- */
/*                          ALBUMS / GALLERY PIPELINE                         */
/* -------------------------------------------------------------------------- */

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

async function fetchGalleryAlbums(): Promise<GalleryAlbum[]> {
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

  return normalizedAlbums;
}

/* -------------------------------------------------------------------------- */
/*                         POSTS / NOTICES PIPELINE                           */
/* -------------------------------------------------------------------------- */

async function fetchAllPosts(): Promise<FacebookPost[]> {
  const env = getEnv();

  const url = new URL(
    `${GRAPH_API_BASE_URL}/${env.FACEBOOK_PAGE_ID}/posts`
  );

  url.searchParams.set(
    "fields",
    "id,message,created_time,updated_time,attachments"
  );

  url.searchParams.set("limit", "100");

  return fetchAllPages<FacebookPost>(url.toString());
}

/*
 * Pulls every `#hashtag` token out of a post's message. Tokens are kept
 * without the leading '#' and in their original case; matching against a
 * requested hashtag is done case-insensitively elsewhere. `&` (as in
 * "#honours&masters") isn't whitespace so it's captured as part of the
 * same token, which is what we want.
 */
function extractHashtags(message: string): string[] {
  const matches = message.match(/#[^\s#]+/g);

  return matches
    ? matches.map((tag) => tag.slice(1))
    : [];
}

/*
 * Recursively pulls photos out of a post's attachment tree.
 *
 * When a node has subattachments (a multi-photo post), the node's own
 * `media.image` is just a duplicate "cover" of the first subattachment —
 * so subattachments are used exclusively and the parent's own image is
 * skipped, to avoid double-counting that first photo. Nodes are walked
 * recursively (not just one level deep) since Facebook occasionally
 * nests subattachments more than one level.
 */
function extractPhotosFromAttachmentNode(
  node: FacebookPostAttachmentNode,
  fallbackAlt: string,
  fallbackId: string
): NoticePhoto[] {
  const subData = node.subattachments?.data;

  if (Array.isArray(subData) && subData.length > 0) {
    return subData.flatMap((child, index) =>
      extractPhotosFromAttachmentNode(
        child,
        fallbackAlt,
        `${fallbackId}-${index}`
      )
    );
  }

  const src = node.media?.image?.src;

  if (!src) {
    return [];
  }

  return [
    {
      // Prefer Facebook's own photo id (from `target.id`) so the same
      // photo always resolves to the same id across requests — needed
      // for the download-by-id endpoint below.
      id: node.target?.id ?? fallbackId,
      url: src,
      alt: node.description?.trim() || fallbackAlt,
    },
  ];
}

function extractPostPhotos(
  attachments: FacebookPost["attachments"],
  postId: string
): NoticePhoto[] {
  const nodes = attachments?.data ?? [];

  return nodes.flatMap((node, index) =>
    extractPhotosFromAttachmentNode(
      node,
      "Notice photo",
      `${postId}-${index}`
    )
  );
}

function buildNoticePosts(
  rawPosts: FacebookPost[]
): NoticePost[] {
  return rawPosts
    .filter(
      (post): post is FacebookPost & { message: string } =>
        typeof post.message === "string" &&
        post.message.trim().length > 0
    )
    .map((post) => ({
      id: post.id,
      description: post.message.trim(),
      createdTime: post.created_time,
      updatedTime: post.updated_time,
      hashtags: extractHashtags(post.message),
      photos: extractPostPhotos(
        post.attachments,
        post.id
      ),
    }))
    /*
     * Only posts that are (a) tagged with at least one hashtag and
     * (b) carry at least one photo belong on a notice board — plain
     * text posts or untagged photo posts have nowhere to display.
     */
    .filter(
      (post) =>
        post.hashtags.length > 0 &&
        post.photos.length > 0
    )
    .sort(
      (a, b) =>
        new Date(b.createdTime).getTime() -
        new Date(a.createdTime).getTime()
    );
}

function normalizeHashtag(hashtag: string): string {
  return hashtag.trim().replace(/^#+/, "").toLowerCase();
}

/* -------------------------------------------------------------------------- */
/*                    SHARED CACHE (ALBUMS + NOTICES TOGETHER)                */
/* -------------------------------------------------------------------------- */

/*
 * Albums and notices are fetched and cached together under one TTL, so
 * visiting the gallery page and then a notice page (or vice versa)
 * within the cache window never triggers a second round of Facebook API
 * calls. A single in-flight promise also de-duplicates concurrent
 * cache-miss requests (e.g. several visitors landing at once right
 * after the cache expires), so only one upstream fetch happens even
 * under concurrent load.
 */

interface FacebookData {
  albums: GalleryAlbum[];
  posts: NoticePost[];
  cachedAt: string;
}

interface FacebookDataCache {
  data: FacebookData;
  expiresAt: number;
}

let facebookDataCache: FacebookDataCache | null = null;
let inFlightFetch: Promise<FacebookData> | null = null;

async function fetchFacebookDataFresh(): Promise<FacebookData> {
  const [albums, rawPosts] = await Promise.all([
    fetchGalleryAlbums(),
    fetchAllPosts(),
  ]);

  return {
    albums,
    posts: buildNoticePosts(rawPosts),
    cachedAt: new Date().toISOString(),
  };
}

async function getFacebookData(): Promise<FacebookData> {
  const now = Date.now();

  if (facebookDataCache && facebookDataCache.expiresAt > now) {
    return facebookDataCache.data;
  }

  if (!inFlightFetch) {
    inFlightFetch = fetchFacebookDataFresh()
      .then((data) => {
        facebookDataCache = {
          data,
          expiresAt: Date.now() + CACHE_TTL_MS,
        };

        return data;
      })
      .catch((error) => {
        /*
         * If Facebook is temporarily unavailable, serve the previous
         * cache (covering both albums and notices) if we have one.
         */
        if (facebookDataCache) {
          console.error(
            "Facebook request failed. Serving stale cache.",
            error
          );

          return facebookDataCache.data;
        }

        throw error;
      })
      .finally(() => {
        inFlightFetch = null;
      });
  }

  return inFlightFetch;
}

/* -------------------------------------------------------------------------- */
/*                              PUBLIC API                                    */
/* -------------------------------------------------------------------------- */

export async function getFacebookGallery(): Promise<GalleryResponse> {
  const { albums, cachedAt } = await getFacebookData();

  return { albums, cachedAt };
}

export async function getNoticesByHashtag(
  hashtag: string
): Promise<NoticePost[]> {
  const { posts } = await getFacebookData();
  const target = normalizeHashtag(hashtag);

  return posts.filter((post) =>
    post.hashtags.some(
      (tag) => tag.toLowerCase() === target
    )
  );
}

export async function findNoticePhotoById(
  photoId: string
): Promise<NoticePhoto | null> {
  const { posts } = await getFacebookData();

  for (const post of posts) {
    const match = post.photos.find(
      (photo) => photo.id === photoId
    );

    if (match) {
      return match;
    }
  }

  return null;
}

/*
 * Useful if you later want an admin endpoint
 * that manually clears the cache.
 */
export function clearFacebookCache(): void {
  facebookDataCache = null;
}

















// import { getEnv } from "./env";

// const GRAPH_API_VERSION = "v26.0";
// const GRAPH_API_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

// const CACHE_TTL_MS = 15 * 60 * 1000;

// export interface GalleryPhoto {
//   id: string;
//   url: string;
//   alt: string;
// }

// export interface GalleryAlbum {
//   id: string;
//   name: string;
//   photos: GalleryPhoto[];
// }

// export interface GalleryResponse {
//   albums: GalleryAlbum[];
//   cachedAt: string;
// }

// interface FacebookPaging {
//   next?: string;
// }

// interface FacebookAlbum {
//   id: string;
//   name?: string;
// }

// interface FacebookImage {
//   source?: string;
//   width?: number;
//   height?: number;
// }

// interface FacebookPhoto {
//   id: string;
//   name?: string;
//   images?: FacebookImage[];
//   picture?: string;
// }

// interface FacebookListResponse<T> {
//   data: T[];
//   paging?: FacebookPaging;
// }

// interface GalleryCache {
//   data: GalleryResponse;
//   expiresAt: number;
// }

// let galleryCache: GalleryCache | null = null;

// async function facebookFetch<T>(
//   endpoint: string
// ): Promise<T> {
//   const env = getEnv();

//   const url = new URL(
//     endpoint.startsWith("http")
//       ? endpoint
//       : `${GRAPH_API_BASE_URL}${endpoint}`
//   );

//   url.searchParams.set(
//     "access_token",
//     env.FACEBOOK_PAGE_ACCESS_TOKEN
//   );

//   const response = await fetch(url);

//   if (!response.ok) {
//     const errorText = await response.text();

//     throw new Error(
//       `Facebook Graph API error ${response.status}: ${errorText}`
//     );
//   }

//   return (await response.json()) as T;
// }

// async function fetchAllPages<T>(
//   firstUrl: string
// ): Promise<T[]> {
//   const results: T[] = [];

//   let nextUrl: string | null = firstUrl;

//   while (nextUrl) {
//   const response: FacebookListResponse<T> =
//     await facebookFetch<FacebookListResponse<T>>(nextUrl);

//   results.push(...response.data);

//   nextUrl = response.paging?.next ?? null;
// }

//   return results;
// }

// async function fetchAlbums(): Promise<FacebookAlbum[]> {
//   const env = getEnv();

//   const url = new URL(
//     `${GRAPH_API_BASE_URL}/${env.FACEBOOK_PAGE_ID}/albums`
//   );

//   url.searchParams.set("fields", "id,name");
//   url.searchParams.set("limit", "100");

//   return fetchAllPages<FacebookAlbum>(url.toString());
// }

// async function fetchAlbumPhotos(
//   albumId: string,
//   albumName: string
// ): Promise<GalleryPhoto[]> {
//   const url = new URL(
//     `${GRAPH_API_BASE_URL}/${albumId}/photos`
//   );

//   url.searchParams.set(
//     "fields",
//     "id,name,images,picture"
//   );

//   url.searchParams.set("type", "uploaded");

//   url.searchParams.set("limit", "100");

//   const photos =
//     await fetchAllPages<FacebookPhoto>(
//       url.toString()
//     );

//   return photos
//     .map((photo) => {
//       /*
//        * Facebook can return multiple image sizes.
//        * Pick the largest available image.
//        */
//       const bestImage = photo.images
//         ?.filter((image) => Boolean(image.source))
//         .sort(
//           (a, b) =>
//             (b.width ?? 0) * (b.height ?? 0) -
//             (a.width ?? 0) * (a.height ?? 0)
//         )[0];

//       const url =
//         bestImage?.source ??
//         photo.picture;

//       if (!url) {
//         return null;
//       }

//       return {
//         id: photo.id,
//         url,
//         alt: photo.name
//           ? `${albumName} - ${photo.name}`
//           : albumName,
//       };
//     })
//     .filter(
//       (photo): photo is GalleryPhoto =>
//         photo !== null
//     );
// }

// async function fetchGalleryFromFacebook(): Promise<GalleryResponse> {
//   const albums = await fetchAlbums();

//   const excludedAlbumNames = new Set([
//     "photos",
//     "cover photos",
//     "profile pictures",
//   ]);

//   const normalizedAlbums: GalleryAlbum[] = [];

//   for (const album of albums) {
//     const albumName =
//       album.name?.trim() || "Facebook Album";

//     /*
//      * Facebook automatically creates some albums that
//      * should not appear in the college gallery.
//      */
//     if (
//       excludedAlbumNames.has(
//         albumName.toLowerCase()
//       )
//     ) {
//       continue;
//     }

//     const photos = await fetchAlbumPhotos(
//       album.id,
//       albumName
//     );

//     /*
//      * Don't return albums that contain no usable
//      * images.
//      */
//     if (photos.length === 0) {
//       continue;
//     }

//     normalizedAlbums.push({
//       id: album.id,
//       name: albumName,
//       photos,
//     });
//   }

//   return {
//     albums: normalizedAlbums,
//     cachedAt: new Date().toISOString(),
//   };
// }

// export async function getFacebookGallery(): Promise<GalleryResponse> {
//   const now = Date.now();

//   /*
//    * Fresh cache
//    */
//   if (
//     galleryCache &&
//     galleryCache.expiresAt > now
//   ) {
//     return galleryCache.data;
//   }

//   try {
//     const freshData =
//       await fetchGalleryFromFacebook();

//     galleryCache = {
//       data: freshData,
//       expiresAt: now + CACHE_TTL_MS,
//     };

//     return freshData;
//   } catch (error) {
//     /*
//      * If Facebook is temporarily unavailable,
//      * serve the previous cache if we have one.
//      */
//     if (galleryCache) {
//       console.error(
//         "Facebook request failed. Serving stale gallery cache.",
//         error
//       );

//       return galleryCache.data;
//     }

//     throw error;
//   }
// }

// /*
//  * Useful if you later want an admin endpoint
//  * that manually clears the cache.
//  */
// export function clearFacebookGalleryCache(): void {
//   galleryCache = null;
// }