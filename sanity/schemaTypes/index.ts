import { type SchemaTypeDefinition } from 'sanity'
import recipe from './recipe'
import comment from './comment'

// שולחים את כל הסכימות לסטודיו
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [recipe, comment],
}