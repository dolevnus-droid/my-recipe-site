export default {
  name: 'comment',
  type: 'document',
  title: 'תגובות ודירוגים',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'שם הכותב/ת',
      readOnly: true,
    },
    {
      name: 'rating',
      type: 'number',
      title: 'דירוג (1-5)',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'comment',
      type: 'text',
      title: 'תוכן התגובה',
      readOnly: true,
    },
    {
      name: 'reply',
      type: 'text',
      title: 'תשובת צוות האתר',
    },
    {
      name: 'recipe',
      type: 'reference',
      to: [{ type: 'recipe' }],
      title: 'מתכון',
    },
    {
      name: 'approved',
      type: 'boolean',
      title: 'מאושר להצגה',
      initialValue: false,
    },
  ],
}