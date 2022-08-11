import { Tab, TabBody, TabHeader, Tabs } from '../../components/Tabs';
// import ProposalGallery from './ProposalGallery';
import ProposalOverview from './ProposalOverview';
import ProposalMilestone from './ProposalMilestone';

const ProposalDetails = () => {
    return (
        <Tabs>
            <div className='tab-header-row'>
                <TabHeader>
                    <Tab>Overview</Tab>
                    {/* <Tab>Gallery</Tab> */}
                    <Tab>Milestone</Tab>
                </TabHeader>
            </div>
            <TabBody>
                <ProposalOverview />
                {/* <ProposalGallery /> */}
                <ProposalMilestone />
            </TabBody>
        </Tabs>
    );
};
export default ProposalDetails;
