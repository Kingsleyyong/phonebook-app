import styles from '@/styles/statusBox.module.sass';
import { useEffect, useState } from 'react';

const { statusBox, success, error, fadeout } = styles;

interface IStatus {
    status: boolean | undefined;
    message: string;
    onCloseStatusHandler: () => void;
}

const StatusBox = ({ status, message, onCloseStatusHandler }: IStatus) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isClosing) return;

        const timeout = setTimeout(() => {
            setIsClosing(true);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isClosing]);

    const onClickHandler = () => {
        setIsClosing(true);
    };

    return (
        <div
            className={`${statusBox} ${status ? success : error} ${isClosing && fadeout}`}
            onAnimationEnd={onCloseStatusHandler}
        >
            <span>{message}</span>

            <button onClick={onClickHandler}>╳</button>
        </div>
    );
};
export default StatusBox;
