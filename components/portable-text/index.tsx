'use client'

import { PortableText as PortableTextComponent } from 'next-sanity'
import type { PortableTextComponents } from 'next-sanity'
import Link from 'next/link'
import { SanityImage } from './SanityImage'
import { TipBlock } from './TipBlock'
import { RelatedGuide } from './RelatedGuide'
import { StepGuide } from './StepGuide'

const components: PortableTextComponents = {
  // Block styles
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-medium">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-text-light)]">
        {children}
      </blockquote>
    ),
  },

  // Custom types
  types: {
    image: SanityImage,
    tipBlock: TipBlock,
    relatedGuide: RelatedGuide,
    stepGuide: StepGuide,
    relatedPost: ({ value }) => {
      const post = value.post
      if (!post) return null
      return (
        <div className="my-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <Link
              href={`/blogg/${post.slug?.current}`}
              className="font-semibold text-[var(--color-primary)] hover:underline"
            >
              {post.title}
            </Link>
          </div>
        </div>
      )
    },
  },

  // Marks (inline annotations)
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || ''
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[var(--color-primary)] underline hover:no-underline"
        >
          {children}
        </a>
      )
    },
    internalLink: ({ children, value }) => {
      const ref = value?.reference
      if (!ref) return <>{children}</>

      // Bestem URL basert på type
      let href = '/'
      if (ref._type === 'post') {
        href = `/blogg/${ref.slug?.current}`
      } else if (ref._type === 'plant') {
        href = `/planter/${ref.slug?.current}`
      } else if (ref._type === 'category') {
        href = `/kategorier/${ref.slug?.current}`
      } else if (ref._type === 'guide') {
        href = `/guider/${ref.slug?.current}`
      }

      return (
        <Link
          href={href}
          className="text-[var(--color-primary)] underline hover:no-underline"
        >
          {children}
        </Link>
      )
    },
  },

  // Lists
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

interface PortableTextProps {
  value: any[] | null
}

export function PortableText({ value }: PortableTextProps) {
  if (!value || !Array.isArray(value)) return null

  return <PortableTextComponent value={value} components={components} />
}
