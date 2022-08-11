import { formatUnits } from '@ethersproject/units';
import { Link } from 'react-router-dom';
import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';
import { formatUSD } from '../../helpers/formats';
import { ProposalType } from '../../hooks/web3/useProposals';

interface RequestCardProps {
    request: ProposalType;
    to: string;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, to }) => (
    <Link to={to} className='request-card'>
        <span className={`request-category partnership`}>Research</span>
        <div className='request-detail'>
            <div className='inner__left'>
                <div className='title'>{request.title}</div>
                <div className='creator'>{request.funder}</div>
                <div className='min-trust-score'>(10)</div>
            </div>
            {request.description && (
                <div className='inner__right'>
                    <p>{request.description}</p>
                </div>
            )}
        </div>
        <div className='funding-amount'>
            {formatUSD(formatUnits(request.researchAmount))}
            {TokenIcons[Tokens.USDC]}
        </div>
    </Link>
);

export default RequestCard;
