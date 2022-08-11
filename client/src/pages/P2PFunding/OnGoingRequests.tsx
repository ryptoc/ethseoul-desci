import { useWeb3React } from '@web3-react/core';
import useProposals from '../../hooks/web3/useProposals';
import RequestCard from './RequestCard';

const OnGoingRequests = () => {
    const { proposals, isLoading } = useProposals();

    const { account } = useWeb3React();

    const fundingProposals = proposals
        ? proposals.filter(
              (proposal) => proposal.funder === account && proposal.state !== 2
          )
        : [];

    const researchProposals = proposals
        ? proposals.filter(
              (proposal) => proposal.researcher === account && proposal.state !== 2
          )
        : [];

    return (
        <>
            <section id='p2p-funding-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h1>Ongoing Requests</h1>
                        <p>
                            Research previously held captive by institutional gatekeeping
                            and narrative control can be unlocked through decentralised
                            funding streams. Fund future-forward research here!
                        </p>
                    </div>
                </div>
            </section>
            <section id='ongoing-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h2>Funding Requests</h2>
                        <div className='funding-requests'>
                            {isLoading
                                ? 'Loading proposals...'
                                : proposals && fundingProposals.length
                                ? fundingProposals.map((request, index) => (
                                      <RequestCard
                                          to={`/ongoing-project/${request.id}`}
                                          request={request}
                                          key={index}
                                      />
                                  ))
                                : 'No funding requests...'}
                        </div>
                    </div>
                    <div className='inner__right'>
                        <h2>Research Requests</h2>
                        <div className='research-requests'>
                            {isLoading
                                ? 'Loading proposals...'
                                : proposals && researchProposals.length
                                ? researchProposals.map((request, index) => (
                                      <RequestCard
                                          to={`/ongoing-project/${request.id}`}
                                          request={request}
                                          key={index}
                                      />
                                  ))
                                : 'No research requests...'}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OnGoingRequests;
