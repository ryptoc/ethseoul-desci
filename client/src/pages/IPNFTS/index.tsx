import { AddressZero } from '@ethersproject/constants';
import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IntellectualProperty from '../../assets/images/intellectual_property.png';
import { formatAccount } from '../../helpers/formats';
import useIpNFTs from '../../hooks/web3/useIpNFTs';

const IpNfts = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { ipNFTS, isLoading } = useIpNFTs();

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
                            Browse all of the ipNFTs produce on the DeSciConnect platform
                            here.
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
                    {!isLoading
                        ? ipNFTS && ipNFTS.length
                            ? ipNFTS
                                  .filter(
                                      (data) =>
                                          data.name.includes(searchTerm) ||
                                          data.owner.includes(searchTerm)
                                  )
                                  .map((nft, index) => (
                                      <Link
                                          to={`/ipnfts/${nft.proposalID}`}
                                          key={index}
                                          className='card'
                                      >
                                          <div className='title'>{nft.name}</div>
                                          <div className='creator'>
                                              {formatAccount(nft.owner || AddressZero)}
                                          </div>
                                          <div className='mint-date'>
                                              Mint Date:{' '}
                                              {moment
                                                  .unix(nft.createdOn)
                                                  .format('DD/MM/YYYY')}
                                          </div>
                                      </Link>
                                  ))
                            : 'No ipNFTs found...'
                        : 'Loading...'}
                </div>
            </div>
        </section>
    );
};

export default IpNfts;
