import type { Category } from '../types';

export const routesMap: Record<string, Category> = {
  'characters': 'character',
  'locations': 'location',
  'episodes': 'episode',
};

export const isValidCategory = (category: string): category is Category => {
  return ['characters', 'locations', 'episodes'].includes(category);
};