import { SocialIcons } from '../../assets/icons';
import ExternalLink from '../../components/ExternalLink';
import { config } from '../../config/config';
import { Socials as SocialsEnum } from '../../config/constants';

const Socials = () => (
    <div className='socials'>
        {Object.entries(config.socialMedias).map(([name, to], index) => (
            <ExternalLink key={index} to={to}>
                {SocialIcons[name as SocialsEnum]}
            </ExternalLink>
        ))}
    </div>
);

export default Socials;
