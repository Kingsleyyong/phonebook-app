import styles from '@/styles/dialog.module.sass';
import { useRef } from 'react';
import useFetchContacts from '../../hooks/useFetchContacts';
import { ContactType } from '../../types/types';
import Loading from '../Loading/Loading';

const { dialog, dialogBox } = styles;

interface IEditDialog {
    setAvailableContacts: React.Dispatch<React.SetStateAction<ContactType[]>>;
    showEditDialog: ContactType | undefined;
    setShowEditDialog: React.Dispatch<
        React.SetStateAction<ContactType | undefined>
    >;
}

const EditDialog = ({
    showEditDialog,
    setShowEditDialog,
    setAvailableContacts,
}: IEditDialog) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const { editDataByID, statusObject, setStatusObject } = useFetchContacts();

    const onSubmitHandler = () => {
        const contact: ContactType = {
            id: showEditDialog?.id ?? -1,
            name: nameRef.current?.value ?? '',
            phoneNumber: phoneNumberRef.current?.value ?? '',
        };

        if (contact.name === '' || contact.phoneNumber === '') {
            setStatusObject((prev) => ({
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
            setStatusObject((prev) => ({
                ...prev,
                error: 'Please make changes.',
            }));

            return;
        }

        editDataByID(contact).then((response) => {
            if (!response) return;

            setAvailableContacts((prev) =>
                prev.map((contact) =>
                    contact.id === response.id ? response : contact
                )
            );
            setShowEditDialog(undefined);
        });
    };

    return (
        <div className={dialog}>
            {statusObject.loading ? (
                <Loading />
            ) : (
                <div className={dialogBox}>
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
                            <button
                                onClick={() => setShowEditDialog(undefined)}
                            >
                                Cancel
                            </button>
                            <button onClick={onSubmitHandler}>Submit</button>
                        </span>
                    </>
                </div>
            )}
        </div>
    );
};
export default EditDialog;
