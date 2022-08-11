import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { Tab, TabBody, TabHeader, Tabs } from '../../components/Tabs';
import NewSubmission from './NewSubmission';
import SubmissionMilestones from './SubmissionMilestones';
import SubmissionFiles from './SubmissionFiles';
import useProposals from '../../hooks/web3/useProposals';

const OnGoingProject = () => {
    const { projectID } = useParams();

    const { proposals } = useProposals();

    const proposal = proposals
        ? proposals.find(({ id }) => id.toString() === projectID)
        : undefined;

    return (
        <section id='ongoing-project'>
            <div className='container'>
                <h1>{proposal?.title || 'Title'}</h1>
                <h2>{proposal?.description || 'Description'}</h2>
                <div className='submission-overview'>
                    <div className='inner__left'>
                        <span>Status: Ongoing</span>
                        <span>Milestones Obtained: {} Progress Milestone</span>
                        <span>Last Updated: 6 Aug 2022 16:26:29</span>
                    </div>
                    <div className='inner__right'>
                        <Button interalLink={`/proposal-outline/${projectID}`}>
                            View Proposal
                        </Button>
                    </div>
                </div>
                <div className='submission-details'>
                    <Tabs>
                        <TabHeader>
                            <Tab>Submission Files</Tab>
                            <Tab>Milestones</Tab>
                            {/* <Tab>ipNFT</Tab> */}
                            <Tab>New Submission</Tab>
                        </TabHeader>
                        <TabBody>
                            <SubmissionFiles />
                            <SubmissionMilestones />
                            {/* <SubmissionIpNft /> */}
                            <NewSubmission />
                        </TabBody>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default OnGoingProject;
