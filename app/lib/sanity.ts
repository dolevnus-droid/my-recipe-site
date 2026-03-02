import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

interface Recipe {
  _id: string
  title: string
  slug: string
  mainImage: any
  description: string
  imageUrl: string
}

export async function getRecipes(): Promise<Recipe[]> {
  const recipes = await client.fetch(
    `*[_type == "recipe"] {
      _id,
      title,
      slug,
      mainImage,
      description
    }`
  )

  return recipes.map((recipe: any) => ({
    _id: recipe._id,
    title: recipe.title,
    slug: recipe.slug.current,
    mainImage: recipe.mainImage,
    description: recipe.description,
    imageUrl: recipe.mainImage ? urlFor(recipe.mainImage).url() : '',
  }))
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const recipe = await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      description
    }`,
    { slug }
  )

  if (!recipe) return null

  return {
    _id: recipe._id,
    title: recipe.title,
    slug: recipe.slug.current,
    mainImage: recipe.mainImage,
    description: recipe.description,
    imageUrl: recipe.mainImage ? urlFor(recipe.mainImage).url() : '',
  }
}
