import React, { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';
import CustomModal from '../../components/CustomModal';
import ExternalLink from '../../components/ExternalLink';
import { CrossIcon, SuccessIcon } from '../../assets/icons';
import { config } from '../../config/config';

const SuccessModal: React.FC = () => {
    const { modalData, closeModal } = useContext(modalContext);
    const onClose = () => closeModal('successModal');

    return (
        <CustomModal modalName='successModal' className='success-modal'>
            <button type='button' onClick={onClose}>
                <CrossIcon />
            </button>
            <SuccessIcon />
            <div
                className='status'
                dangerouslySetInnerHTML={{ __html: modalData?.status }}
            />
            {modalData?.message ? (
                <div className='message'>{modalData?.message}</div>
            ) : null}
            {modalData?.txHash ? (
                <div className='link'>
                    <ExternalLink to={`${config.urls.etherscan}/tx/${modalData.txHash}`}>
                        View on Etherscan
                    </ExternalLink>
                </div>
            ) : null}
        </CustomModal>
    );
};

export default SuccessModal;
