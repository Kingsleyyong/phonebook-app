import styles from '@/styles/addContactPage.module.sass';
import styles2 from '@/styles/dialog.module.sass';
import { useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { ContactType } from '../types/types';
import useFetchContacts from '../hooks/useFetchContacts';

const { addContactPage } = styles;
const { dialogBox } = styles2;

const AddContactPage = () => {
    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);

    const { postData, setErrorLoading } = useFetchContacts();

    const onSubmitHandler = () => {
        const contact: Partial<ContactType> = {
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

        postData(contact).then((response) => {
            if (response) navigate(-1);
        });
    };

    return (
        <div className={addContactPage}>
            <div className={dialogBox}>
                <span>
                    <label>Name: </label>
                    <input type="text" ref={nameRef} />
                </span>

                <span>
                    <label>Phone Number: </label>
                    <input type="tel" ref={phoneNumberRef} />
                </span>

                <span>
                    <button onClick={() => navigate(-1)}>Cancel</button>
                    <button onClick={onSubmitHandler}>Submit</button>
                </span>
            </div>
        </div>
    );
};
export default AddContactPage;
