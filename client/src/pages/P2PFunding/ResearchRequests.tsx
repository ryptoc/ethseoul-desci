import { AddressZero } from '@ethersproject/constants';
import Button from '../../components/Button';
import useProposals from '../../hooks/web3/useProposals';
import BrowseRequests from './BrowseRequests';

const ResearchRequests = () => {
    const { proposals, isLoading } = useProposals();

    return (
        <>
            <section id='p2p-funding-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h1>Research Requests</h1>
                        <p>
                            Research previously held captive by institutional gatekeeping
                            and narrative control can be unlocked through decentralised
                            funding streams. Fund future-forward research here!
                        </p>
                    </div>
                    <div className='inner__right'>
                        <Button interalLink='/funding-requests'>
                            View Funding Requests
                        </Button>
                        <Button interalLink='/create-request/research'>
                            Submit a Request
                        </Button>
                    </div>
                </div>
            </section>
            <BrowseRequests
                isLoading={isLoading}
                requests={
                    proposals
                        ? proposals.filter(
                              (proposal) => proposal.researcher === AddressZero
                          )
                        : undefined
                }
                className='research'
            />
        </>
    );
};

export default ResearchRequests;
