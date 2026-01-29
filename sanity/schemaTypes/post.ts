
import { defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blogginnlegg',
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
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
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
    {
      name: 'gallery',
      title: 'Galleri',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt-tekst',
              type: 'string',
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
    },
    {
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'plantTypes',
      title: 'Plantetyper',
      description: 'Hvilke plantetyper handler innlegget om? (f.eks. Tomat, Gulrot)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'plantType' }],
        },
      ],
    },
    {
      name: 'plants',
      title: 'Planter (sorter)',
      description: 'Spesifikke sorter som omtales (f.eks. San Marzano, Nantes)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'plant' }],
        },
      ],
    },
    {
        name: "listText",
        title: "Listetekst",
        type: "text"
    },
    {
      name: 'content',
      title: 'Innhold',
      type: 'blockContent',
    },
{
  name: 'relatedPosts',
  title: 'Relaterte innlegg (manuelt)',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{ type: 'post' }],
    },
  ],
},
{
  name: 'relatedGuides',
  title: 'Relaterte guider (manuelt)',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'guide' }] }],
},
{
  name: 'relatedPlants',
  title: 'Relaterte planter (manuelt)',
  description: 'Velg spesifikke sorter som er relatert til innlegget',
  type: 'array',
  of: [{ type: 'reference', to: [{ type: 'plant' }] }],
}
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
