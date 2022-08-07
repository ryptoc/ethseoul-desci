import { NavLink } from 'react-router-dom';
import Button from '../../components/Button';

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
        label: 'IPNFGS',
        to: '/ipnfts',
    },
];

const Header = () => {
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
                <Button variant='secondary'>Connect wallet ↗</Button>
            </div>
        </header>
    );
};

export default Header;
