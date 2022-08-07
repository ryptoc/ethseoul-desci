import React, { useState } from 'react';
import { TokenIcons } from '../../assets/icons';
import IntellectualProperty from '../../assets/images/intellectual_property.png';
import { Tokens } from '../../config/constants';

type NftsType = {
    title: string;
    creator: string;
    minTrustScore: number;
    fundingAmount: number;
    fundingAsset: Tokens;
};

const nfts: NftsType[] = [
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River2',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River3',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River4',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River5',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River6',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River7',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River8',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River9',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River10',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River11',
        creator: 'jmisslor',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
    {
        title: 'Field Research in Mississipi River12',
        creator: 'jmisslorabang',
        minTrustScore: 15,
        fundingAmount: 3,
        fundingAsset: Tokens.ETH,
    },
];

const IpNfts = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setSearchTerm(value);
    };

    return (
        <section id='ipnfts'>
            <div className='container'>
                <div className='hero'>
                    <div className='inner__left'>
                        <h1>Intellectual Property NFTs</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Integer porttitor euismod ligula a consequat. Mauris non porta
                            ex. Phasellus pretium tincidunt ornare. Nulla neque nisl,
                            auctor vel orci efficitur, facilisis condimentum nunc.
                        </p>
                    </div>
                    <div className='inner__right'>
                        <img src={IntellectualProperty} alt='intellectual property' />
                    </div>
                </div>
                <input
                    type='search'
                    value={searchTerm}
                    placeholder='Search here...'
                    onChange={handleChange}
                />
                <div className='nft-container'>
                    {nfts
                        .filter(
                            (data) =>
                                data.title.includes(searchTerm) ||
                                data.creator.includes(searchTerm)
                        )
                        .map((nft, index) => (
                            <div key={index} className='card'>
                                <div className='title'>{nft.title}</div>
                                <div className='creator'>{nft.creator}</div>
                                <div className='min-trust-score'>
                                    ({nft.minTrustScore})
                                </div>
                                <div className='funding-amount'>
                                    {nft.fundingAmount}
                                    {TokenIcons[nft.fundingAsset]}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default IpNfts;
