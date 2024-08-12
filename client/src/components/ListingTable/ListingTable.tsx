import styles from '@/styles/listingPage.module.sass';
import useFetchContacts from '../../hooks/useFetchContacts';
import { useEffect, useState } from 'react';
import { ContactType } from '../../types/types';

const { listingTable } = styles;

interface IListingTable {
  setShowEditDialog: React.Dispatch<
    React.SetStateAction<ContactType | undefined>
  >;
}

const ListingTable = ({ setShowEditDialog }: IListingTable) => {
  const [availableContacts, setAvailableContacts] = useState<ContactType[]>([]);
  const { fetchData } = useFetchContacts();

  useEffect(() => {
    fetchData().then((response) => {
      setAvailableContacts(response);
    });
  }, []);

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
              <button onClick={() => setShowEditDialog(contact)}>✏️</button>
              <button>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ListingTable;
