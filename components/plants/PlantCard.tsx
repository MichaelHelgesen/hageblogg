import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface PlantCardProps {
  plant: {
    _id: string;
    title: string;
    slug: { current: string };
    image?: {
      asset: { _ref: string };
      alt?: string;
    };
    description?: string;
    plantType?: {
      title: string;
      slug: { current: string };
    };
  };
  /** Variant for ulike visninger */
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function PlantCard({ plant, variant = "default", className = "" }: PlantCardProps) {
  const imageUrl = plant.image ? urlFor(plant.image).width(600).height(400).url() : null;

  if (variant === "featured") {
    return (
      <Link
        href={`/planter/${plant.plantType?.slug.current}/${plant.slug.current}`}
        className={`group relative block aspect-[4/3] overflow-hidden rounded-lg ${className}`}
      >
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={plant.image?.alt || plant.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {plant.plantType && (
            <span className="text-sm font-medium text-white/80">{plant.plantType.title}</span>
          )}
          <h3 className="text-2xl font-bold text-white mt-1">{plant.title}</h3>
          {plant.description && (
            <p className="text-white/80 mt-2 line-clamp-2">{plant.description}</p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/planter/${plant.plantType?.slug.current}/${plant.slug.current}`}
        className={`group flex gap-4 items-center ${className}`}
      >
        {imageUrl && (
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={plant.image?.alt || plant.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
            {plant.title}
          </h3>
          {plant.plantType && (
            <span className="text-sm text-[var(--color-text-light)]">{plant.plantType.title}</span>
          )}
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/planter/${plant.plantType?.slug.current}/${plant.slug.current}`}
      className={`group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      {imageUrl && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageUrl}
            alt={plant.image?.alt || plant.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        {plant.plantType && (
          <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wide">
            {plant.plantType.title}
          </span>
        )}
        <h3 className="font-semibold text-[var(--color-text)] mt-1 group-hover:text-[var(--color-primary)] transition-colors">
          {plant.title}
        </h3>
        {plant.description && (
          <p className="text-sm text-[var(--color-text-light)] mt-2 line-clamp-2">
            {plant.description}
          </p>
        )}
      </div>
    </Link>
  );
}
