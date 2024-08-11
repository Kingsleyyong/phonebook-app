import styles from '@/styles/listingPage.module.sass';

const { listingTable } = styles;

const ListingTable = () => {
  return (
    <table className={listingTable}>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Test</td>
          <td>+60-10 101 0010</td>

          <td>
            <button>✏️</button>
            <button>🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default ListingTable;
