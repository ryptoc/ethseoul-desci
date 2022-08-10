import { Tokens } from '../../config/constants';
import { BrowseRequest } from './BrowseRequests';
import RequestCard from './RequestCard';

const fundingRequests: BrowseRequest[] = [
    {
        title: 'Field Research in Mississipi River',
        category: 'Sponsor',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.USDC,
    },
    {
        title: 'Field Research in Mississipi River',
        category: 'Partnership',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.USDC,
    },
];

const researchRequests: BrowseRequest[] = [
    {
        title: 'Field Research in Mississipi River',
        category: 'Experiment',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
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
