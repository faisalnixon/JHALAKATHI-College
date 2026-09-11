import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../components/ui/carousel";
import RippleImageSlider from "../components/Rippleimageslider";
import { HeroPhotos } from "../lib/HeroPhotos";

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
}

interface GalleryAlbum {
  id: string;
  name: string;
  photos: GalleryPhoto[];
}

interface GalleryResponse {
  albums: GalleryAlbum[];
  cachedAt: string;
}

// export const heroPhotos = Object.entries(
//   import.meta.glob<{ default: string }>(
//     "../assets/college-pic/*.{jpg,jpeg,png,webp}",
//     { eager: true },
//   ),
// )
//   .sort(([a], [b]) => a.localeCompare(b))
//   .map(([, mod], index) => ({
//     id: `hero-${index}`,
//     url: mod.default,
//     alt: `Gallery highlight ${index + 1}`,
//   }));

function GalleryPage() {
  const [albums, setAlbums] = useState<GalleryAlbum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track which album is the "active" (fully sized) one so the
  // upcoming album peeking in below can be rendered ~10% smaller.
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  // Which album's fullscreen ripple slider is open, if any.
  const [openAlbum, setOpenAlbum] = useState<GalleryAlbum | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadGallery() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/gallery`,
        );

        if (!response.ok) {
          throw new Error("Failed to load gallery.");
        }

        const data = (await response.json()) as GalleryResponse;

        if (!cancelled) {
          setAlbums(data.albums);
        }
      } catch (error) {
        console.error("Gallery loading error:", error);

        if (!cancelled) {
          setError("Unable to load the gallery right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    setActiveIndex(api.selectedScrollSnap());

    const onSelect = () => setActiveIndex(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-muted-foreground">Loading gallery...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (albums.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-muted-foreground">
            No gallery albums are available.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-3 py-8 sm:px-4 md:py-10">
      <section className="mb-10 flex justify-center  px-1 py-4 border-4 border-primary/60 rounded-2xl  shadow-sm lg:w-[70%] lg:justify-self-center">
        <div className="h-[75vh] lg:h-[80vh] w-[95%]  overflow-hidden border-2 border-primary/60 rounded-2xl ">
          <RippleImageSlider
            images={HeroPhotos}
            fullscreen={false}
            autoPlay
            autoPlayDelay={5000}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 text-center md:mb-10">
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Explore moments from JHALAKATHI College.
          </p>
        </div>

        {/* Album Carousel — extra top/bottom padding so the prev/next
            buttons never crowd the heading above or the page edge below */}
        <div className="py-8 md:py-10">
          <Carousel
            orientation="vertical"
            setApi={setApi}
            opts={{ align: "start" }}
            className="mx-auto w-full"
          >
            {/* ~47dvh track height so each 40dvh album leaves roughly
                7dvh of the next album peeking in underneath it. */}
            <CarouselContent className="h-[47dvh] min-h-85 max-h-160">
              {albums.map((album, index) => {
                const isActive = index === activeIndex;

                return (
                  <CarouselItem
                    key={album.id}
                    // Each slide only takes ~85% of the track height,
                    // so the next album's card peeks in below it.
                    className="basis-[85%] pb-3"
                  >
                    <article
                      onClick={() => setOpenAlbum(album)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setOpenAlbum(album);
                        }
                      }}
                      aria-label={`Open ${album.name} album`}
                      className={` flex h-[40dvh] min-h-65 w-full origin-top cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-card p-3 shadow-sm transition-all duration-300 sm:p-4 md:p-5
                        ${
                          isActive
                            ? "scale-100 border-primary/60 opacity-100"
                            : "scale-[0.9] border-primary/20 opacity-70"
                        }
                      `}
                    >
                      {/* Album title — cloud-shaped translucent backdrop, flush to the card's bottom-right corner */}
                      <div className="absolute bottom-0 right-0 z-30 w-fit max-w-[75%]">
                        <svg
                          viewBox="0 0 200 110"
                          preserveAspectRatio="none"
                          className="absolute inset-0 h-full w-full "
                          aria-hidden="true"
                        >
                          <g fill="#6bc2b9" opacity="0.8">
                            <ellipse cx="42" cy="72" rx="38" ry="30" />
                            <ellipse cx="92" cy="42" rx="48" ry="40" />
                            <ellipse cx="150" cy="58" rx="44" ry="36" />
                            <ellipse cx="180" cy="76" rx="28" ry="24" />
                            <rect
                              x="18"
                              y="58"
                              width="168"
                              height="48"
                              rx="24"
                            />
                          </g>
                        </svg>

                        <div className="relative z-10 px-6 pb-3 pt-8 text-right sm:px-7 sm:pb-4 sm:pt-10">
                          <h2 className="text-sm font-semibold text-black drop-shadow-sm md:text-base">
                            {album.name}
                          </h2>

                          <p className="mt-0.5 text-[11px] text-black/90 md:text-xs">
                            {album.photos.length}{" "}
                            {album.photos.length === 1 ? "photo" : "photos"}
                          </p>
                        </div>
                      </div>

                      {/* Photos — masonry-style CSS grid gallery. Card
                          height is fixed at 40dvh and overflow is hidden,
                          so any photos beyond that height are simply
                          clipped rather than scrolled. Each thumbnail is
                          shrunk to 30% of its column's width and centered,
                          with a tight 2px gap and no border on the tiles. */}
                      <div className="min-h-0 flex-1 overflow-hidden px-1 sm:px-2">
                        <div className="columns-2 gap-0.5 sm:columns-3 lg:columns-4">
                          {album.photos.map((photo) => (
                            <div
                              key={photo.id}
                              className=" group mb-0.5 flex items-center justify-center break-inside-avoid overflow-hidden rounded-lg bg-muted
                              "
                            >
                              <img
                                src={photo.url}
                                alt={photo.alt}
                                loading="lazy"
                                className=" mx-auto block h-fit w-fit object-cover transition-transform duration-300 group-hover:scale-110
                                "
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Larger carousel buttons, pulled further out from the track
                so they sit clear of the heading text and card content */}
            <CarouselPrevious className=" -top-6 size-12 border-2 border-primary/40 shadow-md md:-top-8 md:size-14 " />

            <CarouselNext
              className=" -bottom-6 size-12 border-2 border-primary/40 shadow-md md:-bottom-8 md:size-14
              "
            />
          </Carousel>
        </div>
      </section>

      {/* Fullscreen ripple-wipe slider for the clicked album */}
      {openAlbum && (
        <RippleImageSlider
          images={openAlbum.photos}
          onClose={() => setOpenAlbum(null)}
        />
      )}
    </main>
  );
}

export default GalleryPage;
