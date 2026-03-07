import { client } from '@/sanity/lib/client';
import { Metadata } from 'next';
import RecipeClient from './RecipeClient';

type Props = {
  params: Promise<{ slug: string }>;
};

// פונקציה ליצירת Metadata עבור גוגל ורשתות חברתיות
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const recipe = await client.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{ title, description, "imageUrl": mainImage.asset->url }`,
    { slug }
  );

  if (!recipe) return { title: 'מתכון לא נמצא | Bake & Balance' };

  return {
    title: recipe.title,
    description: recipe.description,
    metadataBase: new URL('https://www.bake-and-balance.com'),
    alternates: {
      canonical: `/recipe/${slug}`,
    },
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [{ url: recipe.imageUrl }],
      type: 'article',
    },
  };
}

// הקומפוננטה הראשית שמעבירה את הנתונים ל-RecipeClient
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <RecipeClient params={resolvedParams} />;
}