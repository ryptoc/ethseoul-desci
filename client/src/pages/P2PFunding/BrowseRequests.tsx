import { ProposalType } from '../../hooks/web3/useProposals';
import RequestCard from './RequestCard';

interface BrowseRequestsProps {
    requests: ProposalType[] | undefined;
    className?: string;
    isLoading: boolean;
}

const BrowseRequests: React.FC<BrowseRequestsProps> = ({
    requests,
    className,
    isLoading,
}) => {
    const filterCompletedRequests = requests?.length
        ? requests.filter((request) => request.state !== 2)
        : [];

    return (
        <section id='browse-requests'>
            <div className={`container ${className ?? ''}`}>
                <h2>BROWSE REQUESTS</h2>
                {/* eslint-disable-next-line */}
                <p>// researchers looking for funding //</p>
                {isLoading ? (
                    'Loading requests...'
                ) : (
                    <div className='request-container'>
                        {requests && filterCompletedRequests.length
                            ? filterCompletedRequests.map((request, index) => (
                                  <RequestCard
                                      to={`/proposal-outline/${request.id}`}
                                      request={request}
                                      key={index}
                                  />
                              ))
                            : 'No requests found...'}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BrowseRequests;
