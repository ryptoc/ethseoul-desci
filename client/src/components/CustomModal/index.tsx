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

const CustomModal: React.FC<Props> = ({
    modalName,
    shouldCloseOnOverlayClick = true,
    className = '',
    overlayClassName = '',
    children,
}) => {
    const { modal, closeModal } = useContext(modalContext);

    const onClose = () => {
        closeModal(modalName);
    };

    const otherModalOpen = Object.values(modal).includes(true);

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={modal[modalName]}
            overlayClassName={`modal-overlay ${overlayClassName ?? ''}`}
            className='modal-content'
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
            onRequestClose={onClose}
            onAfterOpen={() => (document.body.style.overflow = 'hidden')}
            onAfterClose={() =>
                !otherModalOpen && (document.body.style.overflow = 'unset')
            }
        >
            <div
                className='blur-background'
                onClick={shouldCloseOnOverlayClick ? onClose : undefined}
            />
            <div className={`modal-content-inner card card-primary ${className ?? ''}`}>
                {children}
            </div>
        </ReactModal>
    );
};

export default CustomModal;
