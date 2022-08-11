import { AddressZero } from '@ethersproject/constants';
import Button from '../../components/Button';
import useProposals from '../../hooks/web3/useProposals';
import BrowseRequests from './BrowseRequests';

const FundingRequests = () => {
    const { proposals, isLoading } = useProposals();

    return (
        <>
            <section id='p2p-funding-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h1>Funding Requests</h1>
                        <p>
                            Research previously held captive by institutional gatekeeping
                            and narrative control can be unlocked through decentralised
                            funding streams. Fund future-forward research here!
                        </p>
                    </div>
                    <div className='inner__right'>
                        <Button interalLink='/research-requests'>
                            View Research Requests
                        </Button>
                        <Button interalLink='/create-request/funding'>
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
                className='funding'
            />
        </>
    );
};

export default FundingRequests;
