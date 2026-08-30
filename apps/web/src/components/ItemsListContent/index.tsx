import { Suspense, use, useEffect, useRef, useState } from 'react';
import { useItems } from './useItems';
import type { Category, PaginatedResponse } from '../../types';
import { ItemCard } from '../ItemCard';
import { Spinner } from '../Spinner';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { routesMap } from '../../utils';

type ItemsListContentProps = {
  category: Category;
};
export function ItemsListContent<T extends Category>({ category }: { category: T }) {
  const [history, setHistory] = useState<PaginatedResponse<T>[]>([]);
  const [items, nextItems] = useItems(routesMap[category], news => 
    (console.log('setHistory', news), setHistory(currents => [...currents, news])),
  );

  const observer = useIntersectionObserver((node) => {
      console.log('IntersectionObserver', node);
      if (node[0].isIntersecting) 
        console.log('Intersecting, load more...'), nextItems();
    }, {}, []);

  console.log('ItemsListContent', category);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {history && history.map(({ results: page }, index) => 
        <div key={`page-${index + 1}`} id={`page-${index + 1}`} className="contents">
          {page.map(item => 
            <ItemCard key={item.id} item={item} category={category} />)
          }
        </div>
      )}
      <Suspense fallback={<Spinner />}>
        <LastBlock promise={items} category={category} observer={observer} />
      </Suspense>
    </div>
  );
};

type LastBlockProps<T extends Category> = {
  promise: Promise<PaginatedResponse<T>>, 
  category: T,
  observer?: {
    observe: (element: HTMLElement) => void,
    unobserve: (element: HTMLElement) => void,
  },
}
function LastBlock<T extends Category>({ promise, category, observer }: LastBlockProps<T>) {
  const { info, results: items } = use(promise);
  console.log('LastBlock', items);
  const init = items.slice(0, -1), 
    last = items.at(-1);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = ref.current!;
    observer?.observe(target);
    return () => {console.log(observer), observer?.unobserve(target)};
  }, [promise, observer]);

  return (
    <>
      { init.map((item) => 
          <ItemCard key={item.id} item={item} category={category} />)
      }
      <ItemCard ref={ref} key={last!.id} item={last!} category={category} />
    </>
  );
}