import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import { Tab, TabBody, TabHeader, Tabs } from '../../components/Tabs';
import NewSubmission from './NewSubmission';
import SubmissionMilestones from './SubmissionMilestones';
import SubmissionFiles from './SubmissionFiles';
import SubmissionIpNft from './SubmissionIpNft';

const OnGoingProject = () => {
    const { projectID } = useParams();

    return (
        <section id='ongoing-project'>
            <div className='container'>
                <h1>PhD Research of Fungis’ Communication Network</h1>
                <h2>Submission Details</h2>
                <div className='submission-overview'>
                    <div className='inner__left'>
                        <span>Status: Ongoing</span>
                        <span>Milestones Obtained: 20% Progress Milestone</span>
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
                            <Tab>ipNFT</Tab>
                            <Tab>New Submission</Tab>
                        </TabHeader>
                        <TabBody>
                            <SubmissionFiles />
                            <SubmissionMilestones />
                            <SubmissionIpNft />
                            <NewSubmission />
                        </TabBody>
                    </Tabs>
                </div>
            </div>
        </section>
    );
};

export default OnGoingProject;
