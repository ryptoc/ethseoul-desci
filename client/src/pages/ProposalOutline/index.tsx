import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';
import CalendarIcon from '../../assets/images/calendar.png';
import ClockIcon from '../../assets/images/clock.png';
import UsersIcon from '../../assets/images/users.png';
import Button from '../../components/Button';
import ProposalDetails from './ProposalDetails';
import { useContext } from 'react';
import modalContext from '../../context/modal/modalContext';

const ProposalOutline = () => {
    const { openModal } = useContext(modalContext);

    const viewOffers = () => openModal('currentOffersModal');
    const requestToContribute = () => openModal('requestToContributeModal');

    const isFunder = false;

    return (
        <section id='proposal-outline'>
            <div className='container'>
                <h1>Research Request Proposal Outline</h1>
                <hr />
                <div className='details'>
                    <div className='title'>
                        Study on behavioral differences across cultures (South Korea)
                    </div>
                    <div className='status'>
                        <span>Under Negotiation</span>
                    </div>
                    <div className='creator'>jmisslor</div>
                    <div className='contributors'>12 contributors</div>
                    <p className='description'>
                        PhD students from Humboldt University looking to conduct a global
                        study on differences in human behavior in certain societal
                        situations. Seeking partners to conduct our research by
                        replicating our methodology across different cultures.
                    </p>
                    <div className='proposal-meta'>
                        <div className='date'>
                            <img src={CalendarIcon} alt='calendar' />
                            <span>30/11/21</span>
                        </div>
                        <div className='time'>
                            <img src={ClockIcon} alt='Clock' />
                            <span>1 year</span>
                        </div>
                        <div className='users'>
                            <img src={UsersIcon} alt='Users' />
                            <span>Individual</span>
                        </div>
                    </div>
                    <div className='user-offer'>
                        <span>Your Offer</span>
                        <div className='offer-amount'>
                            <div className='asset'>
                                <span>USDC</span>
                                <span className='amount'>10000</span>
                            </div>
                            {TokenIcons[Tokens.USDC]}
                        </div>
                    </div>
                    <div className='action-container'>
                        {isFunder ? (
                            <Button variant='secondary' onClick={viewOffers}>
                                View offers
                            </Button>
                        ) : (
                            <Button variant='secondary' onClick={requestToContribute}>
                                Request to Contribute
                            </Button>
                        )}
                    </div>
                </div>
                <hr />
            </div>
            <ProposalDetails />
        </section>
    );
};

export default ProposalOutline;
