
import { use } from 'react';
import { getItem } from '../api';
import type { Category, Item } from '../types';

const cache = new Map<string, Promise<Item>>();

export const useItem = (category: Category, id: string): Item => {
    const cacheKey = `${category}-${id}`;
    let itemsPromise = cache.get(cacheKey);
    
    if (!itemsPromise) {
      itemsPromise = getItem(category, id);
      cache.set(cacheKey, itemsPromise);
    }
  
    return use(itemsPromise);
};
