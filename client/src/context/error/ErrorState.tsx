import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { UserRejectedRequestError as WalletConnectUserRejectError } from '@web3-react/walletconnect-connector';
import { ReactNode, useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import modalContext from '../modal/modalContext';
import ErrorContext from './errorContext';

type Props = {
    children: ReactNode;
};

const ErrorState: React.FC<Props> = ({ children }) => {
    const { openModal, setModalData } = useContext(modalContext);

    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (!error) return;

        switch (true) {
            case error instanceof UserRejectedRequestError:
            case error instanceof WalletConnectUserRejectError:
            case error?.code === 4001:
                openModal('errorModal');
                setModalData((prev) => ({ ...prev, message: 'Transaction Rejected' }));
                return;
            default:
                openModal('errorModal');
                setModalData((prev) => ({
                    ...prev,
                    message: 'Unexpected error. Please try again later',
                }));
                console.log(error);
        }
    }, [error, openModal, setModalData]);

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};
export default ErrorState;
