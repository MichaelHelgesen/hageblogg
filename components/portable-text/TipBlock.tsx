'use client'

import { PortableText } from 'next-sanity'

const variantStyles = {
  plant: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '🌱',
    label: 'Plantetips',
  },
  tool: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '🔧',
    label: 'Verktøytips',
  },
  remember: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: '💡',
    label: 'Husk',
  },
  warning: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '⚠️',
    label: 'NB!',
  },
} as const

interface TipBlockProps {
  value: {
    variant: keyof typeof variantStyles
    title?: string
    tip?: any[]
  }
}

export function TipBlock({ value }: TipBlockProps) {
  const { variant = 'remember', title, tip } = value
  const style = variantStyles[variant] || variantStyles.remember

  return (
    <aside
      className={`my-6 rounded-lg border-l-4 p-4 ${style.bg} ${style.border}`}
    >
      <div className="flex items-center gap-2 font-semibold">
        <span>{style.icon}</span>
        <span>{title || style.label}</span>
      </div>
      {tip && (
        <div className="mt-2 text-sm">
          <PortableText value={tip} />
        </div>
      )}
    </aside>
  )
}
