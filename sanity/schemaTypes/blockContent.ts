import { defineType } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Riktekst',
  type: 'array',
  of: [
{
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternativ tekst',
      description: 'Viktig for universell utforming og SEO',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Bildetekst',
      description: 'Valgfritt – vises under bildet',
    },
  ],
},
    { type: 'block' },

    // 💬 Tips-blokk
{
  type: 'object',
  name: 'tipBlock',
  title: 'Tips-blokk',
  fields: [
    {
      name: 'variant',
      title: 'Type tips',
      type: 'string',
      options: {
        list: [
          { title: 'Plantetips', value: 'plant' },
          { title: 'Verktøytips', value: 'tool' },
          { title: 'Husk', value: 'remember' },
          { title: 'NB!', value: 'warning' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      name: 'tip',
      title: 'Tips',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              // 🔗 Ekstern lenke
              {
                name: 'link',
                type: 'object',
                title: 'Lenke',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
              // 🔗 Intern lenke
              {
                name: 'internalLink',
                type: 'object',
                title: 'Intern lenke',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    to: [
                      { type: 'post' },
                      { type: 'plant' },
                      { type: 'category' },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', variant: 'variant' },
    prepare({ title, variant }) {
      const labels = {
        plant: 'Plantetips',
        tool: 'Verktøytips',
        remember: 'Husk',
        warning: 'NB!',
      }
      return {
        title: `Tipsfelt: ${title}` || labels[variant] || 'Tips',
        subtitle: labels[variant] || 'Tipsfelt',
      }
    },
  },
},

    // 🔗 Relaterte guider
    {
      type: 'object',
      name: 'relatedGuide',
      title: 'Relatert steg-for-steg-guide',
      fields: [
        { name: 'guide', title: 'Guide', type: 'reference', to: [{ type: 'guide' }] },
{
      name: 'showDescription',
      title: 'Vis beskrivelse',
      type: 'boolean',
      description: 'Huk av hvis du vil vise guidens beskrivelse under tittelen.',
      initialValue: false,
    },
{
  name: 'displayMode',
  title: 'Visningsmodus',
  type: 'string',
  options: {
    list: [
      { title: 'Kort', value: 'short' },
      { title: 'Full', value: 'full' },
      { title: 'Lukket (ekspanderbar)', value: 'collapsed' },
    ],
    layout: 'radio',
  },
  initialValue: 'short',
}
      ],
      preview: {
        select: { title: 'guide.title' },
        prepare({ title }) {
          return { title: title ?? 'Relatert guide', subtitle: 'Referanse til guide' }
        },
      },
    },

{
  type: 'object',
  name: 'relatedPost',
  title: 'Relatert blogginnlegg',
  fields: [
    {
      name: 'post',
      title: 'Innlegg',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'post.title',
      subtitle: 'post.description',
      media: 'post.mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Relatert innlegg',
        subtitle: subtitle ?? 'Promoboks til blogginnlegg',
        media,
      }
    },
  },
},

    // 📖 Lokal steg-for-steg-guide
    {
      type: 'object',
      name: 'stepGuide',
      title: 'Unikt steg-for-steg-guide',
      fields: [
        { name: 'title', title: 'Tittel på guiden', type: 'string' },
        {
          name: 'steps',
          title: 'Steg',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'step',
              title: 'Steg',
              fields: [
                { name: 'title', title: 'Tittel', type: 'string' },
                {
                  name: 'content',
                  title: 'Innhold',
                  type: 'array',
                  of: [
                    {
                      type: 'block',
                      styles: [{ title: 'Normal', value: 'normal' }],
                      lists: [{ title: 'Punktliste', value: 'bullet' }],
                      marks: {
                        decorators: [
                          { title: 'Fet', value: 'strong' },
                          { title: 'Kursiv', value: 'em' },
                        ],
                        annotations: [
                          {
                            name: 'link',
                            type: 'object',
                            title: 'Lenke',
                            fields: [{ name: 'href', type: 'url', title: 'URL' }],
                          },
                          {
                            name: 'internalLink',
                            type: 'object',
                            title: 'Intern lenke',
                            fields: [
                              {
                                name: 'reference',
                                type: 'reference',
                                to: [{ type: 'post' }, { type: 'plant' }, { type: 'guide' }],
                              },
                            ],
                          },
                        ],
                      },
                    },
                    {
                      type: 'image',
                      options: { hotspot: true },
                      fields: [
                        { name: 'alt', title: 'Alt-tekst', type: 'string' },
                        { name: 'caption', title: 'Bildetekst', type: 'string' },
                      ],
                    },
                  ],
                },
                {
                  name: 'image',
                  title: 'Hovedbilde',
                  description: 'Vises alltid øverst/ved siden av steget',
                  type: 'image',
                  options: { hotspot: true },
                  fields: [
                    { name: 'alt', title: 'Alt-tekst', type: 'string' },
                    { name: 'caption', title: 'Bildetekst', type: 'string' },
                  ],
                },
              ],
              preview: { select: { title: 'title', media: 'image' } },
            },
          ],
          validation: (Rule) => Rule.min(1),
        },
      ],
      preview: {
        select: { title: 'title' },
        prepare({ title }) {
          return { title: title || 'Steg-for-steg-guide', subtitle: 'Innhold med flere steg' }
        },
      },
    },
  ],
})
