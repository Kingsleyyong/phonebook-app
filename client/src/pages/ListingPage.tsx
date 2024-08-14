import styles from '@/styles/listingPage.module.sass';
import ListingTable from '../components/ListingTable/ListingTable';
import EditDialog from '../components/Dialog/EditDialog';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFetchContacts from '../hooks/useFetchContacts';
import Loading from '../components/Loading/Loading';
import { ContactType } from '../types/types';
import DeleteDialog from '../components/Dialog/DeleteDialog';

const { listingPage, headerBar } = styles;

const ListingPage = () => {
    const navigate = useNavigate();
    const [showEditDialog, setShowEditDialog] = useState<ContactType>();
    const [showDeleteDialog, setShowDeleteDialog] = useState<ContactType>();

    const { statusObject } = useFetchContacts();

    return (
        <>
            {!statusObject.loading && (
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
                        <button onClick={() => navigate('/add-contact')}>
                            Add Contact
                        </button>
                    </div>

                    <ListingTable
                        showEditDialog={showEditDialog}
                        showDeleteDialog={showDeleteDialog}
                        setShowEditDialog={setShowEditDialog}
                        setShowDeleteDialog={setShowDeleteDialog}
                    />
                </div>
            )}

            {statusObject.loading && showEditDialog === undefined && (
                <Loading />
            )}
        </>
    );
};
export default ListingPage;
