import Image from "next/image";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
          <Image src={src} alt={`${title} screenshot ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
