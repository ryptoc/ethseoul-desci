import { AddressZero } from '@ethersproject/constants';
import { useContext } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import modalContext from '../context/modal/modalContext';
import { formatAccount } from '../helpers/formats';

const CurrentOffersModal = () => {
    const { closeModal } = useContext(modalContext);

    const onClose = () => closeModal('currentOffersModal');

    return (
        <CustomModal modalName='currentOffersModal' className='current-offers-modal'>
            <div className='content'>
                <div className='heading'>
                    <span className='title'>Current Offers</span>
                    <span className='note'>
                        Note: You can only accept one researcher!
                    </span>
                </div>
                <div className='offers-container'>
                    <div className='row header'>
                        <div>User</div>
                        <div>Comments</div>
                        <div>Action</div>
                    </div>
                    <div className='row'>
                        <div>{formatAccount(AddressZero)}</div>
                        <div>abc</div>
                        <div>
                            <Button variant='tertiary'>Accept</Button>
                            {' | '}
                            <Button variant='tertiary'>Reject</Button>
                        </div>
                    </div>
                </div>
                <Button onClick={onClose} variant='secondary'>
                    Cancel
                </Button>
            </div>
        </CustomModal>
    );
};

export default CurrentOffersModal;
