import BenefitIcon_1 from '../../assets/images/research_empowerment.png';
import BenefitIcon_2 from '../../assets/images/decentralized_researcher_network.png';
import BenefitIcon_3 from '../../assets/images/crptographically_secured_systems.png';

const beneftDetails = [
    {
        icon: BenefitIcon_1,
        label: 'Researcher Empowerment',
        detail: 'Institutional constraints via selective funding and misaligned incentives have limited scientific innovation. This platform aims to correct these constraints by decentralizing the funding process for early stage research, bringing science back to the people.',
    },
    {
        icon: BenefitIcon_2,
        label: 'Decentralised Researcher Network',
        detail: 'As a P2P marketplace, this platform facilitates trade between two or more private individuals. The decentralized transaction infrastructure of Web3 and blockchain allows researchers and funders to connect in a trustless and transparent manner.',
    },
    {
        icon: BenefitIcon_3,
        label: 'Cryptographically Secured Systems',
        detail: 'Users must sign up to the platform using a web3 wallet; this wallet’s profile contains a “reputation score”, secured through ZkProofs.  Combined with smart contract-enabled escrow for funding, users can interact confidently with each other.',
    },
];

const Benefits = () => {
    return (
        <section id='benefits'>
            <div className='container'>
                <h2>Benefits of DeSci Research</h2>
                <div className='benefits-container'>
                    {beneftDetails.map(({ icon, label, detail }) => (
                        <div key={label} className='benefit'>
                            <div className='icon-container'>
                                <img src={icon} alt={label} />
                            </div>
                            <h3>{label}</h3>
                            <p>{detail}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
