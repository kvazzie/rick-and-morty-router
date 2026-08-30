
import { isUrlString, type Category, type Item, type PaginatedResponse, type UrlString } from '../types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const getItems = async <T extends Category>(
  category: T,
  page?: UrlString | number,
): Promise<PaginatedResponse<T>> => {
  let url;
  
  if (typeof page === "number")
    url = `${API_BASE_URL}/${category}?page=${page}`;
  else if (isUrlString(page))
    url = page;
  else
    url = `${API_BASE_URL}/${category}`;

  const response = await fetch(url);

  if (!response.ok)
    throw new Error(`Failed to fetch ${category}`);

  return await response.json();
};

export const getItem = async (category: Category, id: string): Promise<Item> => {
  const endpoint = category;
  const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} with id ${id}`);
  }
  return response.json();
};
