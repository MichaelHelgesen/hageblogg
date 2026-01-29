'use client'

import { useState } from 'react'
import { PortableText } from 'next-sanity'
import Link from 'next/link'

interface Step {
  _key: string
  title?: string
  content?: any[]
  image?: {
    asset?: { _ref?: string }
    alt?: string
  }
}

interface Guide {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  steps?: Step[]
}

interface RelatedGuideProps {
  value: {
    guide?: Guide
    showDescription?: boolean
    displayMode?: 'short' | 'full' | 'collapsed'
  }
}

export function RelatedGuide({ value }: RelatedGuideProps) {
  const { guide, showDescription = false, displayMode = 'short' } = value
  const [isExpanded, setIsExpanded] = useState(false)

  if (!guide) return null

  // Kort visning - kun lenke
  if (displayMode === 'short') {
    return (
      <div className="my-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <div>
            <Link
              href={`/guider/${guide.slug?.current}`}
              className="font-semibold text-[var(--color-primary)] hover:underline"
            >
              {guide.title}
            </Link>
            {showDescription && guide.description && (
              <p className="mt-1 text-sm text-[var(--color-text-light)]">
                {guide.description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Collapsed visning - ekspanderbar
  if (displayMode === 'collapsed') {
    return (
      <div className="my-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📖</span>
            <span className="font-semibold">{guide.title}</span>
          </div>
          <span className="text-xl">{isExpanded ? '−' : '+'}</span>
        </button>
        {isExpanded && (
          <div className="border-t border-[var(--color-border)] p-4">
            {showDescription && guide.description && (
              <p className="mb-4 text-[var(--color-text-light)]">
                {guide.description}
              </p>
            )}
            <GuideSteps steps={guide.steps} />
          </div>
        )}
      </div>
    )
  }

  // Full visning - alle steg synlige
  return (
    <div className="my-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg">📖</span>
        <h3 className="text-lg font-semibold">{guide.title}</h3>
      </div>
      {showDescription && guide.description && (
        <p className="mb-4 text-[var(--color-text-light)]">{guide.description}</p>
      )}
      <GuideSteps steps={guide.steps} />
    </div>
  )
}

function GuideSteps({ steps }: { steps?: Step[] }) {
  if (!steps || steps.length === 0) return null

  return (
    <ol className="space-y-4">
      {steps.map((step, index) => (
        <li key={step._key} className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
            {index + 1}
          </span>
          <div>
            {step.title && (
              <h4 className="font-medium">{step.title}</h4>
            )}
            {step.content && (
              <div className="mt-1 text-sm text-[var(--color-text-light)]">
                <PortableText value={step.content} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
