import { TokenIcons } from '../../assets/icons';
import { Tokens } from '../../config/constants';
import CalendarIcon from '../../assets/images/calendar.png';
import ClockIcon from '../../assets/images/clock.png';
import UsersIcon from '../../assets/images/users.png';
import Button from '../../components/Button';
import ProposalDetails from './ProposalDetails';
import { useContext, useEffect } from 'react';
import modalContext from '../../context/modal/modalContext';
import { useWeb3React } from '@web3-react/core';
import useProposals from '../../hooks/web3/useProposals';
import { useParams } from 'react-router-dom';
import { formatAccount, formatUSD } from '../../helpers/formats';
import { AddressZero } from '@ethersproject/constants';
import { formatUnits } from '@ethersproject/units';
import { getProposalState } from '../../helpers/typechain';

const ProposalOutline = () => {
    const { openModal, setModalData } = useContext(modalContext);

    const { account } = useWeb3React();

    const { projectID } = useParams();

    const { proposals } = useProposals();

    const proposal = proposals
        ? proposals.find(({ id }) => id.toString() === projectID)
        : undefined;

    useEffect(() => {
        if (!projectID) return;

        setModalData((prev) => ({ ...prev, data: projectID }));
    }, [projectID, setModalData]);

    const viewOffers = () => openModal('currentOffersModal');
    const requestToContribute = () => openModal('requestToContributeModal');

    return (
        <section id='proposal-outline'>
            <div className='container'>
                <h1>Research Request Proposal Outline</h1>
                <hr />
                <div className='details'>
                    <div className='title'>{proposal?.title || 'Title'}</div>
                    <div className='status'>
                        <span>{getProposalState(proposal?.state || 0)}</span>
                    </div>
                    <div className='creator'>
                        {formatAccount(proposal?.funder || AddressZero)}
                    </div>
                    <div className='contributors'>12 contributors</div>
                    <p className='description'>
                        {proposal?.description || 'Description'}
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
                        <span>Offer</span>
                        <div className='offer-amount'>
                            <div className='asset'>
                                <span>USDC</span>
                                <span className='amount'>
                                    {formatUSD(
                                        formatUnits(proposal?.researchAmount || '0') || 0
                                    )}
                                </span>
                            </div>
                            {TokenIcons[Tokens.USDC]}
                        </div>
                    </div>
                    <div className='action-container'>
                        {proposal?.funder === account ? (
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
