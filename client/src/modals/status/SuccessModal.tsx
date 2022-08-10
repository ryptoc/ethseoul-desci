import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';

const SuccessModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('successModal');

    return (
        <CustomModal
            modalName='successModal'
            className='status-modal success-modal'
            overlayClassName='status-modal'
        >
            <div className='content'>
                <div className='status'>{modalData.status}</div>
                <div
                    className='message'
                    dangerouslySetInnerHTML={{ __html: modalData.message }}
                />
                <button onClick={onClose}>Confirm</button>
            </div>
        </CustomModal>
    );
};

export default SuccessModal;
