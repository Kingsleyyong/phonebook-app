import styles from '@/styles/dialog.module.sass';

const { dialog, dialogBox } = styles;

const AppendEditDialog = () => {
  return (
    <div className={dialog}>
      <div className={dialogBox}>
        <span>
          <label htmlFor="">No: </label>
        </span>

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
export default AppendEditDialog;
