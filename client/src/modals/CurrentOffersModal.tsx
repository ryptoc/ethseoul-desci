import { AddressZero } from '@ethersproject/constants';
import { useContext, useState } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import modalContext from '../context/modal/modalContext';
import { formatAccount } from '../helpers/formats';
import { sleep } from '../web3/utils';

const initialState = [
    {
        user: AddressZero,
        comments: 'abc',
    },
    {
        user: AddressZero,
        comments: 'bcd',
    },
];

const CurrentOffersModal = () => {
    const { openModal, closeModal, setModalData } = useContext(modalContext);

    const onClose = () => closeModal('currentOffersModal');

    const [offers, setOffers] = useState(initialState);

    const accept = async () => {
        openModal('warningModal');
        setModalData((prev) => ({
            ...prev,
            status: 'Notice',
            message:
                'You have accepted a request from a Researcher and the request is under DeScientist Committee Review.',
        }));

        await sleep(3000);

        closeModal('warningModal');

        openModal('successModal');
        setModalData((prev) => ({
            ...prev,
            status: 'Congratulations!',
            message:
                'The DeScientist Review Commitee has approved your proposal and researchers have begun.',
        }));
        onClose();
    };

    const reject = (offerIndex: number) => {
        setOffers((prev) => prev.filter((_, index) => offerIndex !== index));
    };

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
                    {offers.length ? (
                        offers.map(({ comments, user }, index) => (
                            <div className='row' key={index}>
                                <div>{formatAccount(user)}</div>
                                <div>{comments}</div>
                                <div>
                                    <Button variant='tertiary' onClick={accept}>
                                        Accept
                                    </Button>
                                    {' | '}
                                    <Button
                                        variant='tertiary'
                                        onClick={() => reject(index)}
                                    >
                                        Reject
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='row single'>
                            <div>No offers...</div>
                        </div>
                    )}
                </div>
                <Button onClick={onClose} variant='secondary'>
                    Cancel
                </Button>
            </div>
        </CustomModal>
    );
};

export default CurrentOffersModal;
