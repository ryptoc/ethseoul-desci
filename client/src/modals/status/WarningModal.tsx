import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';
import { CrossIcon, WarningIcon } from '../../assets/icons';

const WarningModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('warningModal');

    return (
        <CustomModal modalName='warningModal' className='warning-modal'>
            <div className='content'>
                <button type='button' onClick={onClose}>
                    <CrossIcon />
                </button>
                <WarningIcon />
                <div className='status'>Warning!</div>
                <div
                    className='message'
                    dangerouslySetInnerHTML={{ __html: modalData.message }}
                />
            </div>
        </CustomModal>
    );
};

export default WarningModal;
