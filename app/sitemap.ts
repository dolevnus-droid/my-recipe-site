import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bake-and-balance.com';

  // שליפת כל ה-Slugs של המתכונים מ-Sanity
  const recipes = await client.fetch(`*[_type == "recipe" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

  const recipeUrls = recipes.map((recipe: any) => ({
    url: `${baseUrl}/recipe/${recipe.slug}`,
    lastModified: new Date(recipe._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...recipeUrls,
  ];
}