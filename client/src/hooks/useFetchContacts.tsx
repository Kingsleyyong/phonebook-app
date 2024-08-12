import { useState } from 'react';
import { ContactType, ErrorLoadingMap } from '../types/types';

const useFetchContacts = () => {
  const [errorLoading, setErrorLoading] = useState<ErrorLoadingMap>({
    error: undefined,
    loading: false,
  });

  const baseUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchData = async () => {
    try {
      setErrorLoading((prev) => ({ ...prev, loading: true }));
      const response = await fetch(`${baseUrl}/contacts`);
      if (!response.ok) {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'Network response was not ok',
        }));

        throw new Error('Network response was not ok');
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

  const postData = async (newContact: Partial<ContactType>) => {
    try {
      setErrorLoading((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`${baseUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'Failed to post data',
        }));
        throw new Error('Failed to post data');
      }

      const result = await response.json();
      return result as ContactType;
    } catch (error) {
      if (error instanceof Error) {
        setErrorLoading((prev) => ({ ...prev, error: error.message }));
      } else {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'An unknown error occurred',
        }));
      }
      return null;
    } finally {
      setErrorLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  const editDataByID = async (updatedContact: ContactType) => {
    try {
      setErrorLoading((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`${baseUrl}/contacts/${updatedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (!response.ok) {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'Failed to update data',
        }));
        throw new Error('Failed to update data');
      }

      const result = await response.json();
      return result as ContactType;
    } catch (error) {
      if (error instanceof Error) {
        setErrorLoading((prev) => ({ ...prev, error: error.message }));
      } else {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'An unknown error occurred',
        }));
      }
      return null;
    } finally {
      setErrorLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  const deleteDataByID = async (id: number) => {
    try {
      setErrorLoading((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`${baseUrl}/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'Failed to delete data',
        }));
        throw new Error('Failed to delete data');
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setErrorLoading((prev) => ({ ...prev, error: error.message }));
      } else {
        setErrorLoading((prev) => ({
          ...prev,
          error: 'An unknown error occurred',
        }));
      }
      return false;
    } finally {
      setErrorLoading((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    fetchData,
    postData,
    editDataByID,
    deleteDataByID,
    errorLoading,
    setErrorLoading,
  };
};

export default useFetchContacts;
