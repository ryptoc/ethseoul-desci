import { NavLink } from 'react-router-dom';
import Socials from '../Socials';

const footerLinks = [
    {
        label: 'Contact',
        to: '/contact',
    },
    {
        label: 'FAQS',
        to: '/faq',
    },
    {
        label: 'Documentation',
        to: '/documentation',
    },
];

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <nav>
                    {footerLinks.map(({ label, to }) => (
                        <NavLink key={to} to={to}>
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <Socials />
            </div>
        </footer>
    );
};

export default Footer;
