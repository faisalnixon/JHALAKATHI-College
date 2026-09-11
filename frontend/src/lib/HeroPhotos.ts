export const HeroPhotos = Object.entries(
  import.meta.glob<{ default: string }>(
    "../assets/college-pic/*.{jpg,jpeg,png,webp}",
    { eager: true },
  ),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod], index) => ({
    id: `hero-${index}`,
    url: mod.default,
    alt: `Gallery highlight ${index + 1}`,
  }));