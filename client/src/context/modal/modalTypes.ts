export type ModalDataTypes = {
    message: string;
    status: string;
    txHash: string;
};

export type Modals = {
    waitingModal: boolean;
    errorModal: boolean;
    warningModal: boolean;
    successModal: boolean;
    connectWalletModal: boolean;
    currentOffersModal: boolean;
    requestToContributeModal: boolean;
    createIpNftModal: boolean;
};

export type ModalStateType = {
    modal: Modals;
    modalData: ModalDataTypes;
    openModal: (name: keyof Modals) => void;
    closeModal: (name: keyof Modals) => void;
    setModalData: React.Dispatch<React.SetStateAction<ModalDataTypes>>;
};
