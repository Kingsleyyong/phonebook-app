import styles from '@/styles/addContactPage.module.sass';
import styles2 from '@/styles/dialog.module.sass';

const { addContactPage } = styles;
const { dialogBox } = styles2;

const AddContactPage = () => {
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
          <button>Cancel</button>
          <button>Submit</button>
        </span>
      </div>
    </div>
  );
};
export default AddContactPage;
