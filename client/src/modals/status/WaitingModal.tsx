import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';

const WaitingModal: React.FC = () => {
    const { modalData } = useContext(modalContext);

    return (
        <CustomModal
            modalName='waitingModal'
            className='waiting-modal'
            overlayClassName='waiting-modal'
            shouldCloseOnOverlayClick={false}
        >
            <div className='status'>Please Wait!</div>
            <div className='spinner'>spinning icon...</div>
            <div
                className='message'
                dangerouslySetInnerHTML={{ __html: modalData?.message }}
            />
        </CustomModal>
    );
};

export default WaitingModal;
