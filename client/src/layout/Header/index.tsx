import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button';
import modalContext from '../../context/modal/modalContext';

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
                    Connect wallet ↗
                </Button>
            </div>
        </header>
    );
};

export default Header;
