import { defineType } from 'sanity'

export const plant = defineType({
  name: 'plant',
  title: 'Plante',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Navn (norsk)',
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
          input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').slice(0, 96),
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
      name: 'plantType',
      title: 'Plantetype',
      type: 'reference',
      to: [{type: 'plantType'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt-tekst', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'caption', title: 'Bildetittel', type: 'string' },
        { name: 'description', title: 'Bildetekst / Beskrivelse', type: 'text', rows: 2 },
      ],
    },

    // 🌱 Hardførhet
    {
      name: 'hardiness',
      title: 'Hardførhet',
      type: 'string',
      options: {
        list: ['Sone 1', 'Sone 2', 'Sone 3', 'Sone 4', 'Sone 5', 'Sone 6', 'Sone 7'],
        layout: 'dropdown',
      },
    },

    // 🌼 Sesong (planting/forberedelse)
    {
      name: 'seasons',
      title: 'Sesong (planting/forberedelse)',
      description: 'Når kan man plante eller forberede',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Vår', value: 'spring' },
          { title: 'Sommer', value: 'summer' },
          { title: 'Høst', value: 'autumn' },
          { title: 'Vinter', value: 'winter' },
        ],
        layout: 'grid',
      },
    },

    // 🎄 Temaer / Høytider
    {
      name: 'themes',
      title: 'Temaer / Høytider',
      description: 'Brukes for å vise relevant innhold i høytider',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Jul', value: 'christmas' },
          { title: 'Påske', value: 'easter' },
          { title: 'Advent', value: 'advent' },
          { title: '17. mai', value: 'constitution-day' },
           { title: 'Høsttakkefest', value: 'harvest' },
	  { title: 'Halloween', value: 'halloween' },
        ],
        layout: 'grid',
      },
    },

    // ⏳ Varighet
    {
      name: 'duration',
      title: 'Varighet',
      type: 'string',
      options: {
        list: ['Ettårig', 'Flerårig', 'Toårig'],
        layout: 'dropdown',
      },
    },

    // 🌸 Blomstring
    {
      name: 'flowering',
      title: 'Blomstringsmåneder',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Januar', value: '01' },
          { title: 'Februar', value: '02' },
          { title: 'Mars', value: '03' },
          { title: 'April', value: '04' },
          { title: 'Mai', value: '05' },
          { title: 'Juni', value: '06' },
          { title: 'Juli', value: '07' },
          { title: 'August', value: '08' },
          { title: 'September', value: '09' },
          { title: 'Oktober', value: '10' },
          { title: 'November', value: '11' },
          { title: 'Desember', value: '12' },
        ],
        layout: 'grid',
      },
    },

    // 🍎 Høsting
    {
      name: 'harvest',
      title: 'Høstingsmåneder',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Januar', value: '01' },
          { title: 'Februar', value: '02' },
          { title: 'Mars', value: '03' },
          { title: 'April', value: '04' },
          { title: 'Mai', value: '05' },
          { title: 'Juni', value: '06' },
          { title: 'Juli', value: '07' },
          { title: 'August', value: '08' },
          { title: 'September', value: '09' },
          { title: 'Oktober', value: '10' },
          { title: 'November', value: '11' },
          { title: 'Desember', value: '12' },
        ],
        layout: 'grid',
      },
    },

    // 🤧 Allergivennlighet
    {
      name: 'allergyFriendly',
      title: 'Allergivennlig',
      type: 'boolean',
      description: 'Er planten allergivennlig? Huk av for Ja.',
    },

    // 🏡 Tilleggsfelt, f.eks. plassering, jordtype etc.
    {
      name: 'location',
      title: 'Plassering',
      type: 'string',
      options: {
        list: ['Full sol', 'Halvskygge', 'Skygge'],
        layout: 'dropdown',
      },
    },
    {
      name: 'soilType',
      title: 'Jordtype',
      type: 'string',
      options: {
        list: ['Lett sandjord', 'Lett leirjord', 'Middels', 'Tung leirjord'],
        layout: 'dropdown',
      },
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
