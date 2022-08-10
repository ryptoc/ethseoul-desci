import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';
import RequestCard from './RequestCard';

export interface BrowseRequest {
    category: 'Experiment' | 'Sponsor' | 'Partnership' | 'Consultation';
    title: string;
    creator: string;
    minTrustScore: number;
    description: string;
    fundingAmount: number;
    fundingAsset: Tokens;
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
                        <RequestCard
                            to='/proposal-outline/2'
                            request={request}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrowseRequests;
