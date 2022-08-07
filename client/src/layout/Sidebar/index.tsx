import { NavLink } from 'react-router-dom';
import { AboutIcon, ContactIcon, HomeIcon } from '../../assets/icons';
import Logo from '../../assets/logos/Logo';
import Socials from '../Socials';

const sidebarLinks = [
    {
        to: '/',
        icon: HomeIcon,
    },
    {
        to: '/contact',
        icon: ContactIcon,
    },
    {
        to: '/about',
        icon: AboutIcon,
    },
];

const Sidebar = () => {
    return (
        <aside className='sidenav'>
            <div className='container'>
                <Logo />
                <nav>
                    {sidebarLinks.map(({ to, icon }) => (
                        <NavLink key={to} to={to}>
                            {icon()}
                        </NavLink>
                    ))}
                </nav>
                <Socials />
            </div>
        </aside>
    );
};

export default Sidebar;
