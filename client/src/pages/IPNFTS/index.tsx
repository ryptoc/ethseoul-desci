import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TokenIcons } from '../../assets/icons';
import IntellectualProperty from '../../assets/images/intellectual_property.png';
import { Tokens } from '../../config/constants';

type NftsType = {
    title: string;
    creator: string;
    category: string;
    mintDate: number;
};

const nfts: NftsType[] = [
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
    },
    {
        title: 'Field Research in Mississipi River',
        creator: 'jmisslor',
        category: 'Geography',
        mintDate: 1660156446,
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
                            <Link to={'/ipnfts/2'} key={index} className='card'>
                                <div className='category'>
                                    Category: <span>{nft.category}</span>
                                </div>
                                <div className='title'>{nft.title}</div>
                                <div className='creator'>{nft.creator}</div>
                                <div className='mint-date'>
                                    Mint Date:{' '}
                                    {moment.unix(nft.mintDate).format('DD/MM/YYYY')}
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default IpNfts;
