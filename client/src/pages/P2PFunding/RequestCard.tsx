import { Link } from 'react-router-dom';
import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';

interface RequestCardProps {
    request: {
        category: string;
        title: string;
        creator: string;
        minTrustScore: number;
        description?: string;
        fundingAmount: number;
        fundingAsset: Tokens;
    };
    to: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, to }) => (
    <Link to={to} className='request-card'>
        <span className={`request-category ${request.category.toLowerCase()}`}>
            {request.category}
        </span>
        <div className='request-detail'>
            <div className='inner__left'>
                <div className='title'>{request.title}</div>
                <div className='creator'>{request.creator}</div>
                <div className='min-trust-score'>({request.minTrustScore})</div>
            </div>
            {request.description && (
                <div className='inner__right'>
                    <p>{request.description}</p>
                </div>
            )}
        </div>
        <div className='funding-amount'>
            {request.fundingAmount}
            {TokenIcons[request.fundingAsset]}
        </div>
    </Link>
);

export default RequestCard;
