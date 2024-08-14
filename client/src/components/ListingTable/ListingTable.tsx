import styles from '@/styles/listingPage.module.sass';
import { ContactType } from '../../types/types';

const { listingTable, zeroData } = styles;

interface IListingTable {
    availableContacts: ContactType[];
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
    availableContacts,
    setShowEditDialog,
    setShowDeleteDialog,
}: IListingTable) => {
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
                {availableContacts.length === 0 && (
                    <tr>
                        <td className={zeroData} colSpan={4}>
                            <h2>There is no data entry.</h2>
                        </td>
                    </tr>
                )}
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
