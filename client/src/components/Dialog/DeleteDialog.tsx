import styles from '@/styles/dialog.module.sass';
import { ContactType } from '../../types/types';
import useFetchContacts from '../../hooks/useFetchContacts';

const { dialog, dialogBox, contentBox } = styles;

interface IDeleteDialog {
  showDeleteDialog: ContactType | undefined;
  setShowDeleteDialog: React.Dispatch<
    React.SetStateAction<ContactType | undefined>
  >;
}

const DeleteDialog = ({
  showDeleteDialog,
  setShowDeleteDialog,
}: IDeleteDialog) => {
  const { deleteDataByID, errorLoading, setErrorLoading } = useFetchContacts();

  const onConfirmHandler = () => {
    if (showDeleteDialog === undefined) return;

    deleteDataByID(showDeleteDialog.id).then((response) => {
      if (response) setShowDeleteDialog(undefined);
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
          <button onClick={() => setShowDeleteDialog(undefined)}>Cancel</button>
          <button onClick={onConfirmHandler}>Confirm</button>
        </span>
      </div>
    </div>
  );
};
export default DeleteDialog;
