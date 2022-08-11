import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import useTabsState from '../../components/Tabs/useTabsState';
import errorContext from '../../context/error/errorContext';
import modalContext from '../../context/modal/modalContext';
import { formatUSD } from '../../helpers/formats';
import useProposals from '../../hooks/web3/useProposals';

type Milestone = {
    comment: string;
    milestoneResearchCid: string;
    payoutAmount: BigNumber;
    percentage: BigNumber;
    state: number;
};

const SubmissionComments = () => {
    const { account } = useWeb3React();

    const { projectID } = useParams();

    const { proposals } = useProposals();

    const { openModal, setModalData } = useContext(modalContext);

    const { setError } = useContext(errorContext);

    const { setTabIndex } = useTabsState();

    const proposalFound = useMemo(
        () =>
            proposals
                ? proposals.find((proposal) => proposal.id.toString() === projectID)
                : undefined,
        [proposals, projectID]
    );

    const isFunder = proposalFound?.funder === account;

    const unlockEscrow = async () => {
        try {
            openModal('submitMilestoneModal');
            setModalData((prev) => ({
                ...prev,
                data: projectID,
            }));
        } catch (error) {
            setError(error);
        }
    };

    const renderStatus = (milestone: Milestone) => {
        if (milestone.state === 3) {
            return '// COMPLETE //';
        }

        if (!isFunder && milestone.milestoneResearchCid) return '// IN REVIEW //';

        if (milestone.state === 0) return '';

        return milestone.milestoneResearchCid
            ? '// RESEARCHER HAS MARKED COMPLETE //'
            : '// WAITING TO BE MARKED COMPLETE //';
    };

    const renderButtons = (milestone: Milestone) => {
        if (isFunder) {
            if (milestone.state === 3) {
                return (
                    <Button variant='tertiary' onClick={() => setTabIndex(0)}>
                        View Documents
                    </Button>
                );
            }

            return (
                <>
                    {milestone.milestoneResearchCid && (
                        <Button variant='tertiary' onClick={unlockEscrow}>
                            Unlock Escrow
                        </Button>
                    )}
                    <Button variant='tertiary' onClick={() => setTabIndex(0)}>
                        Review Documents
                    </Button>
                </>
            );
        }

        return (
            milestone.state !== 3 && (
                <>
                    <Button variant='tertiary'>Submit to Review Committee</Button>
                </>
            )
        );
    };

    return (
        <div className='tab-content submission-milestones'>
            {proposalFound?.proposalMilestones.map((milestone, index) => (
                <div className='milestone' key={index}>
                    <div className='inner__left'>
                        <div className='milestone-number'>Milestone {index + 1}</div>
                        <div className='release-amount'>
                            Amount {milestone.state === 3 ? '' : 'to be'} unlocked:{' '}
                            <strong>
                                {formatUSD(formatUnits(milestone.payoutAmount))} USDC
                            </strong>
                        </div>
                        <div className='status'>{renderStatus(milestone)}</div>
                    </div>
                    <div className='inner__right'>{renderButtons(milestone)}</div>
                </div>
            ))}
        </div>
    );
};

export default SubmissionComments;
