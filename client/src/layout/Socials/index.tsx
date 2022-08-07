import { SocialIcons } from '../../assets/icons';
import ExternalLink from '../../components/ExternalLink';
import { config } from '../../config/config';

const Socials = () => (
    <div className='socials'>
        {Object.entries(config.socialMedias).map(([name, to], index) => (
            <ExternalLink key={index} to={to}>
                {SocialIcons[name]}
            </ExternalLink>
        ))}
    </div>
);

export default Socials;
