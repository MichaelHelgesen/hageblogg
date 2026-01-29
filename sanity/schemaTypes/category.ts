import { defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Kategori',
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
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
          description: 'Beskriv bildet for universell utforming og SEO',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Bildetittel',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Bildetekst / Beskrivelse',
          type: 'text',
          rows: 2,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
