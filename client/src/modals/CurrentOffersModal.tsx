import { useWeb3React } from '@web3-react/core';
import { useContext, useState } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import errorContext from '../context/error/errorContext';
import modalContext from '../context/modal/modalContext';
import { formatAccount } from '../helpers/formats';
import { getPlatformContract } from '../helpers/typechain';
import useProposals from '../hooks/web3/useProposals';

type OffersType = {
    user: string;
};

const CurrentOffersModal = () => {
    const { openModal, closeModal, setModalData, modalData } = useContext(modalContext);
    const { setError } = useContext(errorContext);

    const onClose = () => closeModal('currentOffersModal');

    const { library } = useWeb3React();

    const { proposals } = useProposals();

    const proposalFound = proposals
        ? proposals.find(({ id }) => id.toString() === modalData.data)
        : undefined;

    const [offers, setOffers] = useState<OffersType[]>();

    const accept = async (researcher: string) => {
        if (!proposalFound) return;
        try {
            openModal('waitingModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your transacation is being confirmed.',
            }));

            const platformContract = getPlatformContract(library.getSigner());

            const assign = await platformContract.assignResearcher(
                proposalFound.id,
                researcher
            );

            await assign.wait();

            openModal('successModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Success',
                message:
                    'You have assigned a Researcher and researchers will soon begun.',
            }));
            onClose();
        } catch (error) {
            setError(error);
        } finally {
            closeModal('waitingModal');
        }
    };

    const reject = (offerIndex: number) => {
        if (!offers) return;

        setOffers((prev) => prev!.filter((_, index) => offerIndex !== index));
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
                        <div>Action</div>
                    </div>
                    {proposalFound && proposalFound.researcherApplications.length ? (
                        proposalFound.researcherApplications.map((user, index) => (
                            <div className='row' key={index}>
                                <div>{formatAccount(user)}</div>
                                <div>
                                    <Button
                                        variant='tertiary'
                                        onClick={() => accept(user)}
                                    >
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
