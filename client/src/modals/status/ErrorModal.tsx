import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';

const ErrorModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('errorModal');

    return (
        <CustomModal
            modalName='errorModal'
            className='status-modal error-modal'
            overlayClassName='status-modal error-modal'
        >
            <div className='content'>
                <div className='status'>Error!</div>
                <div
                    className='message'
                    dangerouslySetInnerHTML={{ __html: modalData.message }}
                />
                <button onClick={onClose}>Confirm</button>
            </div>
        </CustomModal>
    );
};

export default ErrorModal;
