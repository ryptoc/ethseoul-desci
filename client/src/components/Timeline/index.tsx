import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';
import { formatUSD } from '../../helpers/formats';
import InfoPopUp from '../InfoPopUp';

type TimelineType = {
    milestone: string;
    releaseAmount: string;
};

interface TimelineProps {
    data: TimelineType[];
}

const Timeline: React.FC<TimelineProps> = ({ data }) => {
    return (
        <div className='timeline-container'>
            <div className='timeline-progress'>
                <div className='start'>
                    <span>Start</span>
                </div>
                {data
                    .filter(({ milestone, releaseAmount }) => milestone && releaseAmount)
                    .map(({ milestone, releaseAmount }, index) => (
                        <div key={index} style={{ left: `${+milestone}%` }}>
                            <InfoPopUp trigger={TokenIcons[Tokens.USDC]}>
                                {formatUSD(releaseAmount)} USDC
                            </InfoPopUp>
                            <span>
                                {+milestone === 100 ? 'Completion' : `${milestone}%`}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Timeline;
