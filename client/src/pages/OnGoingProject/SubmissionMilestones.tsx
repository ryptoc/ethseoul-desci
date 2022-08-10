import Button from '../../components/Button';

type Milestone = {
    milestone: number;
    releaseAmount: number;
    status: 'completed' | 'ongoing';
    markedAsComplete?: boolean;
};

const milestones: Milestone[] = [
    {
        milestone: 1,
        releaseAmount: 3000,
        status: 'completed',
    },
    {
        milestone: 2,
        releaseAmount: 2000,
        status: 'completed',
    },
    {
        milestone: 3,
        releaseAmount: 5000,
        status: 'ongoing',
        markedAsComplete: true,
    },
];

const SubmissionComments = () => {
    const isFunder = false;

    const renderStatus = (milestone: Milestone) => {
        if (milestone.status === 'completed') {
            return '// COMPLETE //';
        }

        if (!isFunder) return '// IN REVIEW //';

        return milestone.markedAsComplete
            ? '// RESEARCHER HAS MARKED COMPLETE //'
            : '// WAITING TO BE MARKED COMPLETE //';
    };

    const renderButtons = (milestone: Milestone) => {
        if (isFunder) {
            if (milestone.status === 'completed') {
                return <Button variant='tertiary'>View Milestone Documents</Button>;
            }

            return (
                <>
                    {milestone.markedAsComplete && (
                        <Button variant='tertiary'>Unlock Escrow</Button>
                    )}
                    <Button variant='tertiary'>Review Documents</Button>
                </>
            );
        }

        return (
            milestone.status !== 'completed' && (
                <Button variant='tertiary'>Submit to Review Committee</Button>
            )
        );
    };

    return (
        <div className='tab-content submission-milestones'>
            {milestones.map((milestone, index) => (
                <div className='milestone' key={index}>
                    <div className='inner__left'>
                        <div className='milestone-number'>
                            Milestone {milestone.milestone}
                        </div>
                        <div className='release-amount'>
                            Amount {milestone.status === 'ongoing' ? 'to be' : ''}{' '}
                            unlocked: <strong>{milestone.releaseAmount} USDC</strong>
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
