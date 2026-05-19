import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// 1. Create Sanity client
export const client = createClient({
  projectId: '7nh8vnrz',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
});

// 2. Set up image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}