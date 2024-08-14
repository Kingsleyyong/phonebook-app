import { useState } from 'react';
import { ContactType, StatusMapping } from '../types/types';

const useFetchContacts = () => {
    const [statusObject, setStatusObject] = useState<StatusMapping>({
        success: undefined,
        error: undefined,
        loading: false,
    });

    const baseUrl = import.meta.env.VITE_API_ENDPOINT;

    const fetchData = async () => {
        try {
            setStatusObject((prev) => ({ ...prev, loading: true }));
            const response = await fetch(`${baseUrl}/contacts`);
            if (!response.ok) {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'Network response was not ok',
                }));

                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            return result as ContactType[];
        } catch (error) {
            if (error instanceof Error) {
                setStatusObject((prev) => ({ ...prev, error: error.message }));
            } else {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'An unknown error occurred',
                }));
            }
            return [] as ContactType[];
        } finally {
            setStatusObject((prev) => ({ ...prev, loading: false }));
        }
    };

    const postData = async (newContact: Partial<ContactType>) => {
        try {
            setStatusObject((prev) => ({ ...prev, loading: true }));

            const response = await fetch(`${baseUrl}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newContact),
            });

            if (!response.ok) {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'Failed to post data',
                }));
                throw new Error('Failed to post data');
            }

            const result = await response.json();
            return result as ContactType;
        } catch (error) {
            if (error instanceof Error) {
                setStatusObject((prev) => ({ ...prev, error: error.message }));
            } else {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'An unknown error occurred',
                }));
            }
            return null;
        }
    };

    const editDataByID = async (updatedContact: ContactType) => {
        try {
            setStatusObject((prev) => ({ ...prev, loading: true }));

            const response = await fetch(
                `${baseUrl}/contacts/${updatedContact.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedContact),
                }
            );

            if (!response.ok) {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'Failed to update data',
                }));
                throw new Error('Failed to update data');
            }

            const result = await response.json();
            return result as ContactType;
        } catch (error) {
            if (error instanceof Error) {
                setStatusObject((prev) => ({ ...prev, error: error.message }));
            } else {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'An unknown error occurred',
                }));
            }
            return null;
        } finally {
            setStatusObject((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteDataByID = async (id: number) => {
        try {
            setStatusObject((prev) => ({ ...prev, loading: true }));

            const response = await fetch(`${baseUrl}/contacts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'Failed to delete data',
                }));
                throw new Error('Failed to delete data');
            }

            return true;
        } catch (error) {
            if (error instanceof Error) {
                setStatusObject((prev) => ({ ...prev, error: error.message }));
            } else {
                setStatusObject((prev) => ({
                    ...prev,
                    error: 'An unknown error occurred',
                }));
            }
            return false;
        } finally {
            setStatusObject((prev) => ({ ...prev, loading: false }));
        }
    };

    return {
        fetchData,
        postData,
        editDataByID,
        deleteDataByID,
        statusObject,
        setStatusObject,
    };
};

export default useFetchContacts;
