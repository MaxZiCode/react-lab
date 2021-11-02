import { DependencyList, useEffect, useState } from "react";

export default function useLoadingPromise<T>(
  promiseFn: () => Promise<T>,
  deps?: DependencyList
): [T | undefined, boolean] {
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T>();

  useEffect(() => () => setIsMounted(false), []);

  useEffect(() => {
    setIsLoading(true);

    promiseFn()
      .then(setData)
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
  }, deps);

  return [data, isLoading];
}
