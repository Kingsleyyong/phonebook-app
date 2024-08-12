import styles from '@/styles/listingPage.module.sass';
import { useEffect, useState } from 'react';
import { ContactType } from '../../types/types';
import useFetchContacts from '../../hooks/useFetchContacts';

const { listingTable } = styles;

interface IListingTable {
    showEditDialog: ContactType | undefined;
    showDeleteDialog: ContactType | undefined;
    setShowEditDialog: React.Dispatch<
        React.SetStateAction<ContactType | undefined>
    >;
    setShowDeleteDialog: React.Dispatch<
        React.SetStateAction<ContactType | undefined>
    >;
}

const ListingTable = ({
    showEditDialog,
    showDeleteDialog,
    setShowEditDialog,
    setShowDeleteDialog,
}: IListingTable) => {
    const [availableContacts, setAvailableContacts] = useState<ContactType[]>(
        []
    );
    const { fetchData } = useFetchContacts();

    useEffect(() => {
        if (showEditDialog !== undefined || showDeleteDialog !== undefined)
            return;

        fetchData().then((response) => {
            setAvailableContacts(response);
        });
    }, [showEditDialog, showDeleteDialog]);

    return (
        <table className={listingTable}>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {availableContacts.map((contact, index) => (
                    <tr key={`${index + 1} ${contact.name}`}>
                        <td>{contact.id}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>
                            <button onClick={() => setShowEditDialog(contact)}>
                                ✏️
                            </button>
                            <button
                                onClick={() => setShowDeleteDialog(contact)}
                            >
                                🗑️
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ListingTable;
