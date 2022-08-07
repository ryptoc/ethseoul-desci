export interface BrowseRequest {
    category: 'Experiment' | 'Sponsor' | 'Partnership' | 'Consultation';
    title: string;
    creator: string;
    minTrustScore: number;
    description: string;
    fundingAmount: number;
    fundingAsset: string;
}

interface BrowseRequestsProps {
    requests: BrowseRequest[];
    className?: string;
}

const BrowseRequests: React.FC<BrowseRequestsProps> = ({ requests, className }) => {
    return (
        <section id='browse-requests'>
            <div className={`container ${className ?? ''}`}>
                <h2>BROWSE REQUESTS</h2>
                {/* eslint-disable-next-line */}
                <p>// researchers looking for funding //</p>
                <div className='request-container'>
                    {requests.map((request, index) => (
                        <div key={index} className='request'>
                            <span
                                className={`request-category ${request.category.toLowerCase()}`}
                            >
                                {request.category}
                            </span>
                            <div className='request-detail'>
                                <div className='inner__left'>
                                    <div className='title'>{request.title}</div>
                                    <div className='creator'>{request.creator}</div>
                                    <div className='min-trust-score'>
                                        ({request.minTrustScore})
                                    </div>
                                </div>
                                <div className='inner__right'>
                                    <p>{request.description}</p>
                                </div>
                            </div>
                            <div className='funding-amount'>
                                {request.fundingAmount}
                                {request.fundingAsset}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowseRequests;
