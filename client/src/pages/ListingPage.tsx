import styles from '@/styles/listingPage.module.sass';
import ListingTable from '../components/ListingTable/ListingTable';
import EditDialog from '../components/Dialog/EditDialog';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchContacts from '../hooks/useFetchContacts';
import Loading from '../components/Loading/Loading';
import { ContactType } from '../types/types';
import DeleteDialog from '../components/Dialog/DeleteDialog';
import { useStatusContext } from '../context/StatusContext';

const { listingPage, headerBar } = styles;

const ListingPage = () => {
    const navigate = useNavigate();
    const [showEditDialog, setShowEditDialog] = useState<ContactType>();
    const [showDeleteDialog, setShowDeleteDialog] = useState<ContactType>();
    const [availableContacts, setAvailableContacts] = useState<ContactType[]>(
        []
    );

    const { fetchData } = useFetchContacts();
    const { statusObject } = useStatusContext();

    useEffect(() => {
        fetchData().then((response) => {
            setAvailableContacts(response);
        });
    }, []);

    return (
        <>
            {statusObject.loading && <Loading />}

            {!statusObject.loading && (
                <div className={listingPage}>
                    {showDeleteDialog && (
                        <DeleteDialog
                            setAvailableContacts={setAvailableContacts}
                            showDeleteDialog={showDeleteDialog}
                            setShowDeleteDialog={setShowDeleteDialog}
                        />
                    )}
                    {showEditDialog && (
                        <EditDialog
                            setAvailableContacts={setAvailableContacts}
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
                        availableContacts={availableContacts}
                        showEditDialog={showEditDialog}
                        showDeleteDialog={showDeleteDialog}
                        setShowEditDialog={setShowEditDialog}
                        setShowDeleteDialog={setShowDeleteDialog}
                    />
                </div>
            )}
        </>
    );
};
export default ListingPage;
