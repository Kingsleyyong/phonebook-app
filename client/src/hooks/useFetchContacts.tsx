import { useState } from 'react';
import { ContactType, ErrorLoadingMap } from '../types/types';

const useFetchContacts = () => {
  const [errorLoading, setErrorLoading] = useState<ErrorLoadingMap>({
    error: undefined,
    loading: false,
  });

  const fetchData = async () => {
    try {
      setErrorLoading((prev) => ({ ...prev, loading: true }));

      const baseUrl = import.meta.env.VITE_API_ENDPOINT;
      const response = await fetch(`${baseUrl}/contacts`);
      if (!response.ok) {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'Network response was not ok',
        }));

        return [] as ContactType[];
      }

      const result = await response.json();
      return result as ContactType[];
    } catch (error) {
      if (error instanceof Error) {
        setErrorLoading((prev) => ({ ...prev, error: error.message }));
      } else {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'An unknown error occurred',
        }));
      }
      return [] as ContactType[];
    } finally {
      setErrorLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  return { fetchData, errorLoading };
};

export default useFetchContacts;
