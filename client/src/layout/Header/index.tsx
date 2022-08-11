import { useWeb3React } from '@web3-react/core';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button';
import modalContext from '../../context/modal/modalContext';
import { formatAccount } from '../../helpers/formats';

const navLinks = [
    {
        label: 'P2P FUNDING',
        to: '/funding-requests',
    },
    {
        label: 'MY DASHBOARD',
        to: '/',
    },
    {
        label: 'IPNFTS',
        to: '/ipnfts',
    },
];

const Header = () => {
    const { openModal } = useContext(modalContext);

    const { account } = useWeb3React();

    return (
        <header>
            <div className='container'>
                <nav>
                    {navLinks.map(({ label, to }) => (
                        <NavLink key={label} to={to}>
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <Button
                    variant='secondary'
                    onClick={() => openModal('connectWalletModal')}
                >
                    {account ? formatAccount(account) : 'Connect wallet ↗'}
                </Button>
            </div>
        </header>
    );
};

export default Header;
