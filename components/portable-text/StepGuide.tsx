'use client'

import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

interface Step {
  _key: string
  title?: string
  content?: any[]
  image?: {
    asset?: { _ref?: string }
    alt?: string
    caption?: string
  }
}

interface StepGuideProps {
  value: {
    title?: string
    steps?: Step[]
  }
}

export function StepGuide({ value }: StepGuideProps) {
  const { title, steps } = value

  if (!steps || steps.length === 0) return null

  return (
    <div className="my-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-6">
      {title && (
        <h3 className="mb-6 text-xl font-semibold">{title}</h3>
      )}
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={step._key} className="relative pl-10">
            <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white">
              {index + 1}
            </span>
            <div>
              {step.title && (
                <h4 className="mb-2 font-semibold">{step.title}</h4>
              )}
              {step.image?.asset && (
                <figure className="mb-3">
                  <Image
                    src={urlFor(step.image).width(600).height(400).url()}
                    alt={step.image.alt || ''}
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                  {step.image.caption && (
                    <figcaption className="mt-1 text-sm text-[var(--color-text-light)]">
                      {step.image.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {step.content && (
                <div className="prose prose-sm max-w-none text-[var(--color-text-light)]">
                  <PortableText value={step.content} />
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
