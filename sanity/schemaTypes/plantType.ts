import {defineType} from 'sanity'

export const plantType = defineType({
  name: 'plantType',
  title: 'Plantetype',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'latinName',
      title: 'Latinsk navn',
      type: 'string',
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
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'o')
            .replace(/å/g, 'a')
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'plantCategory',
      title: 'Plantekategori',
      type: 'reference',
      to: [{type: 'plantCategory'}],
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
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'latinName',
      media: 'image',
    },
  },
})
