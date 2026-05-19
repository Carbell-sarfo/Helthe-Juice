export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "publishedAt", type: "datetime", title: "Published At" },
    { name: "excerpt", type: "text", title: "Excerpt" },
    {
      name: "mainImage",
      type: "image",
      title: "Main Image",
      options: { hotspot: true },
    },
    {
      name: "body",
      type: "array",
      title: "Body",
      of: [{ type: "block" }, { type: "image" }],
    },
  ],
};