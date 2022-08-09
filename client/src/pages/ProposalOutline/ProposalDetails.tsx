import { Tab, TabBody, TabHeader, Tabs } from '../../components/Tabs';
import ProposalGallery from './ProposalGallery';
import ProposalOverview from './ProposalOverview';
import ProposalResults from './ProposalResults';

const ProposalDetails = () => {
    return (
        <Tabs>
            <div className='tab-header-row'>
                <TabHeader>
                    <Tab>Overview</Tab>
                    <Tab>Gallery</Tab>
                    <Tab>Results</Tab>
                </TabHeader>
            </div>
            <TabBody>
                <ProposalOverview />
                <ProposalGallery />
                <ProposalResults />
            </TabBody>
        </Tabs>
    );
};
export default ProposalDetails;
