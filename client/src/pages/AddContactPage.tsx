import styles from '@/styles/addContactPage.module.sass';
import styles2 from '@/styles/dialog.module.sass';

import { useNavigate } from 'react-router-dom';

const { addContactPage } = styles;
const { dialogBox } = styles2;

const AddContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className={addContactPage}>
      <div className={dialogBox}>
        <span>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" id="nameInput" />
        </span>

        <span>
          <label htmlFor="">Phone Number: </label>
          <input type="tel" name="telNumber" id="telInput" />
        </span>

        <span>
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button>Submit</button>
        </span>
      </div>
    </div>
  );
};
export default AddContactPage;
