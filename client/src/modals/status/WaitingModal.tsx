import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';
import { SpinnerIcon } from '../../assets/icons';

const WaitingModal: React.FC = () => {
    const { modalData } = useContext(modalContext);

    return (
        <CustomModal
            modalName='waitingModal'
            className='status-modal waiting-modal'
            overlayClassName='status-modal'
            shouldCloseOnOverlayClick={false}
        >
            <div className='content'>
                <div className='spinner-container'>
                    <SpinnerIcon />
                </div>
                <div
                    className='status'
                    dangerouslySetInnerHTML={{ __html: modalData?.status }}
                />
            </div>
        </CustomModal>
    );
};

export default WaitingModal;
