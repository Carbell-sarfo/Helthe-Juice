export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'publishedAt',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt',
      description: 'Short summary shown on the blog listing page',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    },
    {
      name: 'body',
      type: 'blockContent',
    },
  ],
}