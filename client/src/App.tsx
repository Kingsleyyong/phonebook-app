import styles from '@/styles/app.module.sass';
import ListingPage from './pages/ListingPage.tsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddContactPage from './pages/AddContactPage.tsx';

const { appPage } = styles;

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ListingPage />,
    },
    {
      path: '/add-contact',
      element: <AddContactPage />,
    },
  ]);

  return (
    <div className={appPage}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
