import { defineType } from 'sanity'

export const guide = defineType({
  name: 'guide',
  title: 'Steg-for-steg guide',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'plantTypes',
      title: 'Plantetyper',
      description: 'Hvilke plantetyper handler guiden om? (f.eks. Tomat, Gulrot)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'plantType' }] }],
    },
    {
      name: 'plants',
      title: 'Planter (sorter)',
      description: 'Spesifikke sorter som omtales (f.eks. San Marzano, Nantes)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'plant' }] }],
    },
    {
      name: 'plantCategories',
      title: 'Plantekategorier',
      description: 'Hvilke plantekategorier handler guiden om? (f.eks. Grønnsaker, Urter)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'plantCategory' }] }],
    },
    {
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Hovedbilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt-tekst', type: 'string' },
        { name: 'caption', title: 'Bildetekst', type: 'string' },
      ],
    },
    {
      name: 'steps',
      title: 'Steg',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
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
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      plantTypes: 'plantTypes',
    },
    prepare({ title, plantTypes }) {
      const count = plantTypes?.length || 0
      const subtitle = count > 0 ? `${count} plantetype${count > 1 ? 'r' : ''}` : 'Ingen plantetype valgt'

      return { title, subtitle }
    },
  },
})
