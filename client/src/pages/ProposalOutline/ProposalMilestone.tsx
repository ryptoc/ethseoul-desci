const milestones = [
    {
        milestone: 100,
        releaseAmount: 10000,
        comments: 'Synthesise protein amyloids',
    },
    {
        milestone: 50,
        releaseAmount: 5000,
        comments: 'Gather carbon data',
    },
];

const ProposalMilestone = () => {
    return (
        <div className='container tab-content proposal-milestone'>
            {milestones.map((milestone) => (
                <div className='milestone'>
                    <label className='percent-completion'>
                        <span>Milestone (%)</span>
                        <input value={milestone.milestone} readOnly />
                    </label>
                    <label className='release-amount'>
                        <span>USDC to be released</span>
                        <input value={milestone.releaseAmount} readOnly />
                    </label>
                    <label className='comments'>
                        <span>Comments</span>
                        <textarea value={milestone.comments} readOnly />
                    </label>
                </div>
            ))}
        </div>
    );
};

export default ProposalMilestone;
