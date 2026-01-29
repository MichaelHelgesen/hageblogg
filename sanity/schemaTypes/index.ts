import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { category } from './category'
import { guide } from './stepGuide'
import { page } from './page'
import { plant } from './plant'
import { plantCategory } from './plantCategory'
import { plantType } from './plantType'
import { post } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContent,
    category,
    guide,
    page,
    plantCategory,
    plantType,
    plant,
    post,
  ],
}
