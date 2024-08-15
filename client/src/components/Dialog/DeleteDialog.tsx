import useFetchContacts from '../../hooks/useFetchContacts';
import styles from '@/styles/dialog.module.sass';
import { ContactType } from '../../types/types';

const { dialog, dialogBox, contentBox } = styles;

interface IDeleteDialog {
    setAvailableContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
    showDeleteDialog: ContactType | undefined;
    setShowDeleteDialog: React.Dispatch<
        React.SetStateAction<ContactType | undefined>
    >;
}

const DeleteDialog = ({
    setAvailableContacts,
    showDeleteDialog,
    setShowDeleteDialog,
}: IDeleteDialog) => {
    const { deleteDataByID } = useFetchContacts();

    const onConfirmHandler = () => {
        if (showDeleteDialog === undefined) return;

        deleteDataByID(showDeleteDialog.id).then((response) => {
            if (!response) return;

            setAvailableContacts((prev) =>
                prev.filter((contact) => contact.id !== showDeleteDialog.id)
            );
            setShowDeleteDialog(undefined);
        });
    };

    return (
        <div className={dialog}>
            <div className={dialogBox}>
                <h3>Are you sure to delete?</h3>

                <div className={contentBox}>
                    <div>Name: {showDeleteDialog?.name}</div>
                    <div>Phone Number: {showDeleteDialog?.phoneNumber}</div>
                </div>

                <span>
                    <button onClick={() => setShowDeleteDialog(undefined)}>
                        Cancel
                    </button>
                    <button onClick={onConfirmHandler}>Confirm</button>
                </span>
            </div>
        </div>
    );
};
export default DeleteDialog;
