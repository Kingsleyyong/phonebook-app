import styles from '@/styles/app.module.sass';
import ListingPage from './pages/ListingPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddContactPage from './pages/AddContactPage';
import { useStatusContext } from './context/StatusContext';
import StatusBox from './components/StatusBox';

const { appPage } = styles;

const App = () => {
    const { statusObject, setStatusObject } = useStatusContext();

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

            {statusObject.success !== undefined && (
                <StatusBox
                    status={true}
                    message={statusObject.success}
                    onCloseStatusHandler={() => {
                        setStatusObject((prev) => ({
                            ...prev,
                            success: undefined,
                        }));
                    }}
                />
            )}

            {statusObject.error !== undefined && (
                <StatusBox
                    status={false}
                    message={statusObject.error}
                    onCloseStatusHandler={() => {
                        setStatusObject((prev) => ({
                            ...prev,
                            error: undefined,
                        }));
                    }}
                />
            )}
        </div>
    );
};

export default App;
