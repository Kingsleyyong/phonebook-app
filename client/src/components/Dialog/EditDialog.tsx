import styles from '@/styles/dialog.module.sass';

const { dialog, dialogBox } = styles;

interface IEditDialog {
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditDialog = ({ setShowEditDialog }: IEditDialog) => {
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
          <button onClick={() => setShowEditDialog(false)}>Cancel</button>
          <button>Submit</button>
        </span>
      </div>
    </div>
  );
};
export default EditDialog;
