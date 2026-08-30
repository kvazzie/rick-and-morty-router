import { useMemo } from "react";

export function useIntersectionObserver(
  callback: ConstructorParameters<typeof IntersectionObserver>[0],
  _: object, 
  deps: any[] = [],
) {
  const observer = useMemo(() => {
    const observer = new IntersectionObserver(callback);
    return {
      observer,
      observe: (element: HTMLElement) => 
        observer.observe(element),
      unobserve: (element: HTMLElement) => 
        observer.unobserve(element),
    }
  }, deps);

  return observer;
}