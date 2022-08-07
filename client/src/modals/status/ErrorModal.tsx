import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';
import { CrossIcon, ErrorIcon } from '../../assets/icons';

const ErrorModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('errorModal');

    return (
        <CustomModal
            modalName='errorModal'
            overlayClassName='error-modal'
            className='error-modal'
        >
            <button type='button' onClick={onClose}>
                <CrossIcon />
            </button>
            <ErrorIcon />
            <div className='status'>Error!</div>
            <div className='message'>{modalData.message}</div>
        </CustomModal>
    );
};

export default ErrorModal;
