import React, { useContext, useState } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import modalContext from '../context/modal/modalContext';
import { sleep } from '../web3/utils';

const initialState = [
    {
        milestone: 40,
        releaseAmount: 3000,
        comments: 'abc',
        agreed: false,
    },
    {
        milestone: 100,
        releaseAmount: 6000,
        comments: 'good job',
        agreed: false,
    },
];

const RequestToContributeModal = () => {
    const { openModal, closeModal, setModalData } = useContext(modalContext);

    const onClose = () => closeModal('requestToContributeModal');

    const [milestones, setMilestones] = useState(initialState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        milestoneIndex: number
    ) => {
        setMilestones((prev) =>
            prev.map((prevMilestone, index) =>
                index === milestoneIndex
                    ? { ...prevMilestone, agreed: e.target.checked }
                    : prevMilestone
            )
        );
    };

    const confirm = async () => {
        if (milestones.find(({ agreed }) => !agreed)) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Warning',
                message: 'You must agree to all milestones to proceed',
            }));
            return;
        }

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

    return (
        <CustomModal
            modalName='requestToContributeModal'
            className='request-to-contribute-modal'
        >
            <div className='content'>
                <div className='heading'>
                    <span className='title'>Request to Contribute to Research</span>
                    <span className='note'>
                        Note: You can only accept one researcher!
                    </span>
                </div>
                <div className='milestone-container'>
                    <div className='row header'>
                        <div>Milestone %</div>
                        <div>Amount Unlocked</div>
                        <div>Comments</div>
                        <div>Agreed?</div>
                    </div>
                    {milestones.map(
                        ({ comments, milestone, releaseAmount, agreed }, index) => (
                            <div className='row' key={index}>
                                <div>{milestone}%</div>
                                <div>{releaseAmount} USDC</div>
                                <div>{comments}</div>
                                <div>
                                    <input
                                        type='checkbox'
                                        checked={agreed}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className='actions-container'>
                    <Button onClick={onClose} variant='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={confirm} variant='secondary'>
                        Confirm
                    </Button>
                </div>
            </div>
        </CustomModal>
    );
};

export default RequestToContributeModal;
