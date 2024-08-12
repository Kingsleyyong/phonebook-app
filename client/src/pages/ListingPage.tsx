import styles from '@/styles/listingPage.module.sass';
import ListingTable from '../components/ListingTable/ListingTable';
import EditDialog from '../components/Dialog/EditDialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFetchContacts from '../hooks/useFetchContacts';
import Loading from '../components/Loading/Loading';
import { ContactType } from '../types/types';

const { listingPage, headerBar } = styles;

const ListingPage = () => {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState<ContactType>();

  const { errorLoading } = useFetchContacts();

  return (
    <>
      {errorLoading.loading && showEditDialog === undefined && <Loading />}

      <div className={listingPage}>
        {showEditDialog && (
          <EditDialog
            showEditDialog={showEditDialog}
            setShowEditDialog={setShowEditDialog}
          />
        )}

        <div className={headerBar}>
          <h2>Listing Page</h2>
          <button onClick={() => navigate('/add-contact')}>Add Contact</button>
        </div>

        <ListingTable setShowEditDialog={setShowEditDialog} />
      </div>
    </>
  );
};
export default ListingPage;
