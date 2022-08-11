import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';
import errorContext from '../context/error/errorContext';
import modalContext from '../context/modal/modalContext';
import { formatUSD } from '../helpers/formats';
import { getPlatformContract } from '../helpers/typechain';
import useProposals from '../hooks/web3/useProposals';
import { sleep } from '../web3/utils';

type MilestoneType = {
    comment: string;
    milestoneResearchCid: string;
    payoutAmount: BigNumber;
    percentage: BigNumber;
    state: number;
    agreed: boolean;
};

const RequestToContributeModal = () => {
    const { openModal, closeModal, setModalData, modalData } = useContext(modalContext);
    const { setError } = useContext(errorContext);

    const { library } = useWeb3React();

    const { proposals } = useProposals();

    const onClose = () => closeModal('requestToContributeModal');

    const [milestones, setMilestones] = useState<MilestoneType[]>();

    useEffect(() => {
        if (!proposals || milestones) return;

        const proposalFound = proposals.find(
            ({ id }) => id.toString() === modalData.data
        );

        if (!proposalFound) return;

        setMilestones(
            proposalFound.proposalMilestones.map((milestone) => ({
                ...milestone,
                agreed: false,
            }))
        );
    }, [proposals, milestones, modalData.data]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        milestoneIndex: number
    ) => {
        if (!milestones) return;

        setMilestones((prev) =>
            prev!.map((prevMilestone, index) =>
                index === milestoneIndex
                    ? { ...prevMilestone, agreed: e.target.checked }
                    : prevMilestone
            )
        );
    };

    const confirm = async () => {
        if (!milestones) return;

        if (milestones.find(({ agreed }) => !agreed)) {
            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Warning',
                message: 'You must agree to all milestones to proceed',
            }));
            return;
        }

        try {
            openModal('waitingModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Please wait as your transaction is being confirmed.',
            }));

            const platformContract = getPlatformContract(library.getSigner());

            const apply = await platformContract.applyForResearch(modalData.data);

            await apply.wait();

            closeModal('waitingModal');

            openModal('warningModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Notice',
                message:
                    'You have accepted a request from a Researcher and the request is under DeScientist Committee Review.',
            }));

            await sleep(2000);

            closeModal('warningModal');

            openModal('successModal');
            setModalData((prev) => ({
                ...prev,
                status: 'Congratulations!',
                message:
                    'The DeScientist Review Commitee has approved your proposal and researchers have begun.',
            }));
            onClose();
        } catch (error) {
            setError(error);
        } finally {
        }
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
                    {milestones &&
                        milestones.map(
                            ({ comment, percentage, payoutAmount, agreed }, index) => (
                                <div className='row' key={index}>
                                    <div>{percentage.toString()}%</div>
                                    <div>{formatUSD(formatUnits(payoutAmount))} USDC</div>
                                    <div>{comment}</div>
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
