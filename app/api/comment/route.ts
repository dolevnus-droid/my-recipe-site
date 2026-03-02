import { NextResponse } from "next/server";
import { client as sanityClient } from '@/sanity/lib/client';

// use a write-enabled instance by attaching the API token
const client = sanityClient.withConfig({
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { name, comment, recipeId, rating } = await req.json();

    await client.create({
      _type: "comment",
      name,
      comment,
      rating: Number(rating),
      recipe: {
        _type: "reference",
        _ref: recipeId,
      },
      approved: false,
    });

    return NextResponse.json({ message: "התגובה נשלחה לאישור" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "שגיאה בשליחה", err }, { status: 500 });
  }
}