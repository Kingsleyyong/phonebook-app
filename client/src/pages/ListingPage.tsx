import styles from '@/styles/listingPage.module.sass';
import ListingTable from '../components/ListingTable/ListingTable';
import AppendEditDialog from '../components/Dialog/AppendEditDialog';

const { listingPage, headerBar } = styles;

const ListingPage = () => {
  return (
    <div className={listingPage}>
      {/* <AppendEditDialog /> */}
      <div className={headerBar}>
        <h2>Listing Page</h2>
        <button>Add Contact</button>
      </div>

      <ListingTable />
    </div>
  );
};
export default ListingPage;
