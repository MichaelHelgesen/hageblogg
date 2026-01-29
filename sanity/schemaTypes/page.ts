
import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Side',
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
      name: 'pageType',
      title: 'Type side',
      type: 'string',
      options: {
        list: [
          { title: 'Om oss', value: 'about' },
          { title: 'Kontakt', value: 'contact' },
          { title: 'Annen', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
        name: "menuOrder",
        title: "Menyvekting",
        type: "number",
    },
    {
      name: 'content',
      title: 'Innhold',
      type: 'blockContent',
      description: 'Fleksibelt innhold som kan bestå av tekst, bilder, guider osv.',
    },
    // Eksempel på ekstra felt for kontakt-side
    {
      name: 'contactEmail',
      title: 'E-postadresse (for kontakt)',
      type: 'string',
      hidden: ({ parent }) => parent?.pageType !== 'contact',
    },
    {
      name: 'contactPhone',
      title: 'Telefonnummer',
      type: 'string',
      hidden: ({ parent }) => parent?.pageType !== 'contact',
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'pageType',
    },
  },
})
