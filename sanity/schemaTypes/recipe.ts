import { defineType } from 'sanity';

export default defineType({
  name: 'recipe',
  title: 'מתכון',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'כותרת המתכון',
      type: 'string',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'מזהה כתובת (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'תיאור קצר (יופיע בראש המתכון)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'categories', // שינינו מיחיד לרבים
      title: 'קטגוריות (ניתן לבחור כמה)',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'מתוקים', value: 'מתוקים' },
          { title: 'מלוחים', value: 'מלוחים' },
          { title: 'מאפים', value: 'מאפים' },
          { title: 'עוגיות', value: 'עוגיות' },
          { title: 'בריא', value: 'בריא' },
          { title: 'חגים', value: 'חגים' }, // הקטגוריה החדשה
        ],
      },
    },
    {
      name: 'prepTime',
      title: 'זמן הכנה (בדקות)',
      type: 'number',
    },
    {
      name: 'difficulty',
      title: 'דרגת קושי',
      type: 'string',
      options: {
        list: [
          { title: 'קל', value: 'קל' },
          { title: 'בינוני', value: 'בינוני' },
          { title: 'מאתגר', value: 'מאתגר' },
        ],
      },
    },
    {
      name: 'ingredients',
      title: 'מצרכים',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'מתכון נבחר (יופיע ראשון)',
      type: 'boolean',
    },
    {
      name: 'instructions',
      title: 'הוראות הכנה',
      type: 'text',
    },
    // שדה SEO חדש לקידום בגוגל
    {
      name: 'seoDescription',
      title: 'תיאור קצר לגוגל (SEO)',
      type: 'text',
      rows: 2,
      description: 'זה התיאור שיופיע בתוצאות החיפוש בגוגל. מומלץ לכתוב משהו מושך עד 160 תווים.',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.max(160).warning('תיאור ארוך מדי עלול להיחתך בגוגל'),
    },
  ],
});