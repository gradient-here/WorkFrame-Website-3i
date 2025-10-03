/**
 * Product Mapping Configuration
 * 
 * Defines the allowlisted product slugs and their corresponding URLs.
 * This prevents open redirect vulnerabilities by using an explicit allowlist.
 */

export interface ProductConfig {
  slug: string;
  url: string;
  name: string;
  description?: string;
}

export const PRODUCT_MAPPING: Record<string, ProductConfig> = {
  'quickread': {
    slug: 'quickread',
    url: 'https://chatgpt.com/g/g-689bf5fb269481918fccb4ffc7c32451-quickread',
    name: 'QuickRead',
    description: 'Choose your next book with confidence'
  },
  'zettelkasten': {
    slug: 'zettelkasten',
    url: 'https://www.notion.so/Zettelkasten-26de70b7724b8088870acb39d8538f9e?duplicate=true&from=stripe',
    name: 'Zettelkasten',
    description: 'Note-taking and knowledge management system'
  },
  'chat': {
    slug: 'chat',
    url: '/products/chat',
    name: 'Chat on a Page',
    description: 'AI chat interface for productivity'
  },
  'topic-atomizer': {
    slug: 'topic-atomizer',
    url: '/products/topic-atomizer',
    name: 'Topic Atomizer',
    description: 'Break down complex topics into digestible parts'
  },
  'chat-on-a-page': {
    slug: 'chat-on-a-page',
    url: '/products/chat-on-a-page',
    name: 'Chat on a Page',
    description: 'Embedded chat functionality'
  }
};

/**
 * Get product configuration by slug
 */
export function getProductBySlug(slug: string): ProductConfig | null {
  return PRODUCT_MAPPING[slug] || null;
}

/**
 * Check if a product slug is valid
 */
export function isValidProductSlug(slug: string): boolean {
  return slug in PRODUCT_MAPPING;
}

/**
 * Get all available product slugs
 */
export function getAllProductSlugs(): string[] {
  return Object.keys(PRODUCT_MAPPING);
}