import styles from '@/styles/dialog.module.sass';
import { ContactType } from '../../types/types';
import Loading from '../Loading/Loading';
import useFetchContacts from '../../hooks/useFetchContacts';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const { dialog, dialogBox } = styles;

interface IEditDialog {
  showEditDialog: ContactType | undefined;
  setShowEditDialog: React.Dispatch<
    React.SetStateAction<ContactType | undefined>
  >;
}

const EditDialog = ({ showEditDialog, setShowEditDialog }: IEditDialog) => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const { editDataByID, errorLoading, setErrorLoading } = useFetchContacts();

  const onSubmitHandler = () => {
    const contact: ContactType = {
      id: showEditDialog?.id ?? -1,
      name: nameRef.current?.value ?? '',
      phoneNumber: phoneNumberRef.current?.value ?? '',
    };

    if (contact.name === '' || contact.phoneNumber === '') {
      setErrorLoading((prev) => ({
        ...prev,
        error:
          contact.name === ''
            ? 'Please fill up name field.'
            : 'Please fill up phone number field.',
      }));

      return;
    }

    if (
      contact.name === showEditDialog?.name &&
      contact.phoneNumber === showEditDialog?.phoneNumber
    ) {
      setErrorLoading((prev) => ({
        ...prev,
        error: 'Please make changes.',
      }));

      return;
    }

    editDataByID(contact).then((response) => {
      if (response) navigate(-1);
    });
  };

  return (
    <div className={dialog}>
      <div className={dialogBox}>
        {errorLoading.loading && <Loading />}

        {!errorLoading.loading && (
          <>
            <span>
              <label>No: </label>
              <label>{showEditDialog?.id ?? ''}</label>
            </span>
            <span>
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                defaultValue={showEditDialog?.name ?? ''}
                ref={nameRef}
              />
            </span>
            <span>
              <label htmlFor="">Phone Number: </label>
              <input
                type="tel"
                defaultValue={showEditDialog?.phoneNumber ?? ''}
                ref={phoneNumberRef}
              />
            </span>
            <span>
              <button onClick={() => setShowEditDialog(undefined)}>
                Cancel
              </button>
              <button onClick={onSubmitHandler}>Submit</button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};
export default EditDialog;
