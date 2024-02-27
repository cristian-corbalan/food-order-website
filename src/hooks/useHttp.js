import { useEffect, useState } from 'react';

export default function useHttp (initialValue, fetchFunction) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState({ message: '' });
  const [fetchData, setFetchData] = useState(initialValue);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const data = await fetchFunction();
        setFetchData(data);
      } catch (e) {
        setError({ message: e.message || 'Failed to fetch' });
      }
      setIsFetching(false);
    })();
  }, [fetchFunction]);

  return {
    isFetching,
    error,
    fetchData,
    setFetchData
  };
}
