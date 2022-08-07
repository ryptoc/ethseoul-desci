import Button from '../../components/Button';
import BrowseRequests, { BrowseRequest } from './BrowseRequests';

const requests: BrowseRequest[] = [
    {
        title: 'Field Research in Mississipi River',
        category: 'Experiment',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: 'ETH',
    },
    {
        title: 'Field Research in Mississipi River',
        category: 'Sponsor',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: 'USDC',
    },
    {
        title: 'Field Research in Mississipi River',
        category: 'Partnership',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: 'ETH',
    },
    {
        title: 'Field Research in Mississipi River',
        category: 'Consultation',
        creator: 'jmisslor',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor euismod ligula a consequat. Mauris non porta ex. Phasellus pretium tincidunt ornare. Nulla neque nisl, auctor vel orci efficitur, facilisis condimentum nunc.',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: 'USDC',
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
                    <div className='inner__right'>
                        <Button>
                            View Past <br /> Completed Requests
                        </Button>
                        <Button>Top Researchers</Button>
                    </div>
                </div>
            </section>
            <BrowseRequests requests={requests} className='ongoing' />
        </>
    );
};

export default OnGoingRequests;
