import { useEffect, useState } from "react";
import { Download, ExternalLink, MoreHorizontal } from "lucide-react";

import { Table, TableBody, TableCell, TableRow } from "../components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  description: string;
}

interface GalleryPost {
  id: string;
  description: string;
  createdTime: string;
  updatedTime: string;
  hashtags: string[];
  photos: GalleryPhoto[];
}

interface HashtagPhotoTableProps {
  hashtag: string;
  title: string;
}

export default function HashtagPhotoTable({
  hashtag,
  title,
}: HashtagPhotoTableProps) {
  const [posts, setPosts] = useState<GalleryPost[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError("");

        const normalizedHashtag = hashtag.replace(/^#+/, "");

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/gallery/hashtag/${encodeURIComponent(normalizedHashtag)}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to load notices.");
        }

        if (!cancelled) {
          setPosts(Array.isArray(data?.posts) ? data.posts : []);
        }
      } catch (error) {
        if (!cancelled) {
          setError(
            error instanceof Error ? error.message : "Failed to load notices.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, [hashtag]);

  function openPhoto(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function downloadPhoto(photoId: string) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/gallery/photo/${encodeURIComponent(
          photoId,
        )}/download`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to download photo.");
      }

      const blob = await response.blob();

      const contentDisposition = response.headers.get("content-disposition");

      let filename = `jhalakathi-college-${photoId}.jpg`;

      const filenameMatch = contentDisposition?.match(/filename="([^"]+)"/i);

      if (filenameMatch?.[1]) {
        filename = filenameMatch[1];
      }

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = filename;

      document.body.appendChild(link);

      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download photo:", error);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("bn-BD", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  }

  return (
    <section className="w-full">
      {loading && (
        <section className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm">
          <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
            Loading notices...
          </div>
        </section>
      )}

      {error && !loading && (
        <section className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm">
          <div className="rounded-lg border border-destructive/30 p-8 text-center text-sm text-destructive">
            {error}
          </div>
        </section>
      )}

      {!loading && !error && posts.length === 0 && (
        <section className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm">
          <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
            No notices found for {hashtag}.
          </div>
        </section>
      )}

      {!loading && !error && posts.length > 0 && (
        <section
          id="notices"
          className="mx-auto w-[95%] overflow-hidden rounded-xl border border-border-neutral bg-surface p-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl text-notice-red">📢</span>

              <h3 className="font-headline-lg text-headline-lg">
                {title} Notice Board
              </h3>
            </div>

            <span className="font-bold text-primary">
              {posts.length} {posts.length === 1 ? "Notice" : "Notices"}
            </span>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableBody>
                {posts.map((post, index) => (
                  <TableRow key={post.id} className="border-b last:border-b-0">
                    <TableCell className="p-0">
                      <div
                        className={`group flex items-center justify-between rounded-lg border-l-4 bg-white p-4 transition-colors hover:bg-primary-container/20 ${
                          index % 2 === 0
                            ? "border-primary"
                            : "border-alert-amber"
                        }`}
                      >
                        <div className="flex min-w-0 flex-col">
                          <span className="font-label-md text-label-md text-primary">
                            {formatDate(post.createdTime)}
                          </span>

                          <span className="font-body-md text-body-md font-semibold text-on-surface">
                            {post.description}
                          </span>

                          {post.photos.length > 1 && (
                            <span className="mt-1 text-xs text-muted-foreground">
                              {post.photos.length} photos
                            </span>
                          )}
                        </div>

                        <div className="ml-4 flex shrink-0 items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground"
                                aria-label={`Actions for ${
                                  post.description || "notice"
                                }`}
                              >
                                <MoreHorizontal className="size-4" />
                              </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              {post.photos.map((photo, photoIndex) => (
                                <DropdownMenuItem
                                  key={photo.id}
                                  onClick={() => openPhoto(photo.url)}
                                >
                                  <ExternalLink />
                                  View Photo{" "}
                                  {post.photos.length > 1 ? photoIndex + 1 : ""}
                                </DropdownMenuItem>
                              ))}

                              {post.photos.map((photo, photoIndex) => (
                                <DropdownMenuItem
                                  key={`download-${photo.id}`}
                                  onClick={() => void downloadPhoto(photo.id)}
                                >
                                  <Download />
                                  Download Photo{" "}
                                  {post.photos.length > 1 ? photoIndex + 1 : ""}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <span className="text-on-surface-variant transition-transform group-hover:translate-x-1">
                            ↓
                          </span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </section>
  );
}
