import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.bake-and-balance.com';

  // שליפת כל ה-Slugs של המתכונים מ-Sanity
  const recipes = await client.fetch(`*[_type == "recipe" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);

  const recipeUrls = recipes.map((recipe: any) => ({
    url: `${baseUrl}/recipe/${recipe.slug}`,
    lastModified: new Date(recipe._updatedAt),
    changeFrequency: 'weekly' as const, // הוספת as const מבטיחה שהטייפ יהיה מדויק
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/conversions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    ...recipeUrls,
  ];
}