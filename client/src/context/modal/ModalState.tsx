import React, { ReactNode, useCallback, useState } from 'react';
import ModalContext from './modalContext';
import { ModalDataTypes, Modals } from './modalTypes';

type Props = {
    children: ReactNode;
};

const ModalState: React.FC<Props> = ({ children }) => {
    const initialState: Modals = {
        waitingModal: false,
        errorModal: false,
        warningModal: false,
        successModal: false,
        connectWalletModal: false,
    };

    const [modal, setModal] = useState(initialState);
    const [modalData, setModalData] = useState<ModalDataTypes>({
        message: '',
        status: '',
        txHash: '',
    });

    const openModal = useCallback((name: keyof Modals): void => {
        setModal((prev) => ({ ...prev, [name]: true }));
    }, []);

    const closeModal = useCallback((name: keyof Modals): void => {
        setModal((prev) => ({ ...prev, [name]: false }));
    }, []);

    return (
        <ModalContext.Provider
            value={{
                modal,
                modalData,
                openModal,
                closeModal,
                setModalData,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalState;
