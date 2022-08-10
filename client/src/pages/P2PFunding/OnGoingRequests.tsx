import { Tokens } from '../../config/constants';
import { BrowseRequest } from './BrowseRequests';
import RequestCard from './RequestCard';

const fundingRequests: BrowseRequest[] = [
    {
        title: 'Analysis of Water Samples from Mississippi River',
        category: 'Experiment',
        creator: 'jmisslor',
        description:
            'As part of an analysis of the differences in water quality across major global rivers, we are offering a significant bounty to local participants in our study. This bounty specifically pertains to the taking of and subsequent analysis of samples of Mississippi River water over a 6 month period between March 2023 and September 2023...',
        minTrustScore: 10,
        fundingAmount: 3000,
        fundingAsset: Tokens.USDC,
    },
    {
        title: 'Effects of new Energy Drink on Cognitive Performance',
        category: 'Sponsor',
        creator: 'jmisslor',
        description:
            'Wingspan Energy is a newly conceived energy drink by Joja Corporation. We are offering to sponsor an independent double blind study that evaluates the effects of our energy drink on human cognitive performance compared to  regular caffeinated beverages...',
        minTrustScore: 20,
        fundingAmount: 25000,
        fundingAsset: Tokens.USDC,
    },
];

const researchRequests: BrowseRequest[] = [
    {
        title: 'Study on behavioral differences across cultures (South Korea)',
        category: 'Partnership',
        creator: 'jmisslor',
        description:
            'PhD students from Humboldt University looking to conduct a global study on differences in human behavior in certain societal situations. Seeking partners to conduct our research by replicating our methodology across different cultures. ',
        minTrustScore: 30,
        fundingAmount: 30000,
        fundingAsset: Tokens.USDC,
    },
];

const OnGoingRequests = () => {
    return (
        <>
            <section id='p2p-funding-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h1>Ongoing Requests</h1>
                        <p>
                            Research previously held captive by institutional gatekeeping
                            and narrative control can be unlocked through decentralised
                            funding streams. Fund future-forward research here!
                        </p>
                    </div>
                </div>
            </section>
            <section id='ongoing-requests'>
                <div className='container'>
                    <div className='inner__left'>
                        <h2>Funding Requests</h2>
                        <div className='funding-requests'>
                            {fundingRequests.map((request, index) => (
                                <RequestCard
                                    to='/ongoing-project/2'
                                    request={request}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='inner__right'>
                        <h2>Research Requests</h2>
                        <div className='research-requests'>
                            {researchRequests.map((request, index) => (
                                <RequestCard
                                    to='/ongoing-project/2'
                                    request={request}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OnGoingRequests;
