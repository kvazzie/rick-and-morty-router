
import { useEffect, useMemo, useState } from 'react';
import { getItems } from '../../api';
import type { Category, Item, PaginatedResponse } from '../../types';
import { useNavigate } from 'react-router';

export function useItems<T extends Category>(
  category: T,
  setHistory: (items: PaginatedResponse<T>) => void, 
): [Promise<PaginatedResponse<T>>, () => void] {
  const navigate = useNavigate();
  let pageNum = Number(
    window.location.hash.replace('#', '') ?? 
    0
  );

  function incrementPage() {
    navigate(`#${pageNum + 1}`, { replace: true });
  }

  // console.log('after useItems pageNum: ', pageNum);
  const f = useMemo(() => 
    (console.log('recreate'), createAsyncGenerator(category, pageNum + 1, setHistory)), 
    []
  );

  const [currentPage, setCurrentPage] = 
    useState<Promise<PaginatedResponse<T>>>((console.log("init state"), () => f.next().then($ => $.value)));

  return [
    currentPage, 
    () => setCurrentPage(async $ => {
      incrementPage();

      const r = await f.next()

      if (!r.done || r.value)
        return r.value
      return $;
    }),
  ];
} 

async function* createAsyncGenerator<T extends Category>(
  category: T, 
  initNum: number,
  saveHistory: (items: PaginatedResponse<T>) => void,
): AsyncGenerator<PaginatedResponse<T>, PaginatedResponse<T>, unknown> {

  type CurryGetItems = (index: Parameters<typeof getItems>[1]) => 
    Promise<PaginatedResponse<T>>;
  const curryGetItems: CurryGetItems = (index) => 
    getItems(category, index);

  let lastHandled: PaginatedResponse<T>;

  {
    console.log(initNum);
    const requests = Array.from(
      { length: initNum }, 
      (_, index) => curryGetItems(index + 1)
    );
    const lastEl = requests.pop()!;

    yield* iterateQueueWithLazyEffects(requests, async $ => {
      saveHistory(await $)
    });
    
    lastHandled = await lastEl;
    console.log('after initial requests', lastHandled);
  }

   while (lastHandled.info.next !== null) {
    yield (console.log('yield'), lastHandled);
    const request = curryGetItems(lastHandled.info.next);
    saveHistory(lastHandled);
    lastHandled = await request;
  };
  return lastHandled;
}

async function* iterateQueueWithLazyEffects<T extends Array<any>> (
  queue: T, 
  effect?: (item: T[number], index: number) => void,
) {
  console.log('enter into iterateQueueWithLazyEffects', queue.length);
  for (let i = 0; i < queue.length; ++i) {
    yield queue[i];
    if (effect) 
      effect(queue[i], i);
  }
}