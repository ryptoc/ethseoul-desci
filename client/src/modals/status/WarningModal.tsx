import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';

const WarningModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('warningModal');

    return (
        <CustomModal
            modalName='warningModal'
            className='status-modal warning-modal'
            overlayClassName='status-modal'
            shouldCloseOnOverlayClick={false}
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

export default WarningModal;
