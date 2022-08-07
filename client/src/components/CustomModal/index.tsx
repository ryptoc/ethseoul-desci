import React, { ReactNode, useContext } from 'react';
import ReactModal from 'react-modal';
import modalContext from '../../context/modal/modalContext';
import { Modals } from '../../context/modal/modalTypes';

type Props = {
    modalName: keyof Modals;
    className?: string;
    shouldCloseOnOverlayClick?: boolean;
    overlayClassName?: string;
    children: ReactNode;
};

const CustomModal: React.FC<Props> = (props) => {
    const { modal, closeModal } = useContext(modalContext);

    const onClose = () => {
        closeModal(props.modalName);
    };

    const otherModalOpen = Object.values(modal).includes(true);

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={modal[props.modalName]}
            overlayClassName={`modal-overlay ${props.overlayClassName ?? ''}`}
            className={`modal-content ${props.className ?? ''}`}
            shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick ?? true}
            onRequestClose={onClose}
            onAfterOpen={() => (document.body.style.overflow = 'hidden')}
            onAfterClose={() =>
                !otherModalOpen && (document.body.style.overflow = 'unset')
            }
        >
            {props.children}
        </ReactModal>
    );
};

export default CustomModal;
