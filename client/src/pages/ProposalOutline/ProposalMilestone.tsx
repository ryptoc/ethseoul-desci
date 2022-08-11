import { formatUnits } from '@ethersproject/units';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { formatUSD } from '../../helpers/formats';
import useProposals from '../../hooks/web3/useProposals';

const ProposalMilestone = () => {
    const { proposals } = useProposals();

    const { projectID } = useParams();

    const proposalFound = useMemo(
        () =>
            proposals
                ? proposals.find((proposal) => proposal.id.toString() === projectID)
                : undefined,
        [proposals, projectID]
    );
    return (
        <div className='container tab-content proposal-milestone'>
            {proposalFound?.proposalMilestones.map((milestone, index) => (
                <div className='milestone' key={index}>
                    <label className='percent-completion'>
                        <span>
                            Milestone (%) {milestone.state === 3 ? '- Completed' : ''}
                        </span>
                        <input value={milestone.percentage.toString()} readOnly />
                    </label>
                    <label className='release-amount'>
                        <span>USDC to be released</span>
                        <input
                            value={formatUSD(formatUnits(milestone.payoutAmount))}
                            readOnly
                        />
                    </label>
                    <label className='comments'>
                        <span>Comments</span>
                        <textarea value={milestone.comment} readOnly />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ProposalMilestone;
