import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  value: {
    asset?: {
      _ref?: string
    }
    alt?: string
    caption?: string
  }
  width?: number
  height?: number
  className?: string
  priority?: boolean
}

export function SanityImage({
  value,
  width = 800,
  height,
  className,
  priority = false,
}: SanityImageProps) {
  if (!value?.asset) return null

  const computedHeight = height || Math.round(width / 1.5)

  return (
    <figure className="my-6">
      <Image
        className={className || 'rounded-lg'}
        src={urlFor(value).width(width).height(computedHeight).url()}
        alt={value.alt || ''}
        width={width}
        height={computedHeight}
        priority={priority}
      />
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-[var(--color-text-light)]">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
