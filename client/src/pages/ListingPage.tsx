import styles from '@/styles/listingPage.module.sass';
import ListingTable from '../components/ListingTable/ListingTable.tsx';
import EditDialog from '../components/Dialog/EditDialog.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFetchContacts from '../hooks/useFetchContacts.tsx';
import Loading from '../components/Loading/Loading.tsx';
import { ContactType } from '../types/types.ts';
import DeleteDialog from '../components/Dialog/DeleteDialog.tsx';

const { listingPage, headerBar } = styles;

const ListingPage = () => {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState<ContactType>();
  const [showDeleteDialog, setShowDeleteDialog] = useState<ContactType>();

  const { errorLoading } = useFetchContacts();

  return (
    <>
      {errorLoading.loading && showEditDialog === undefined && <Loading />}

      <div className={listingPage}>
        {showDeleteDialog && (
          <DeleteDialog
            showDeleteDialog={showDeleteDialog}
            setShowDeleteDialog={setShowDeleteDialog}
          />
        )}
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

        <ListingTable
          showEditDialog={showEditDialog}
          showDeleteDialog={showDeleteDialog}
          setShowEditDialog={setShowEditDialog}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      </div>
    </>
  );
};
export default ListingPage;
