import { AddressZero } from '@ethersproject/constants';
import ipnft_singular_1 from '../../assets/images/ipnft_singular_1.png';
import ipnft_singular_3 from '../../assets/images/ipnft_singular_3.png';
import { useParams } from 'react-router-dom';
import useIpNFTs from '../../hooks/web3/useIpNFTs';
import ExternalLink from '../../components/ExternalLink';

const IpNftSingular = () => {
    const { ipnftID } = useParams();

    const { ipNFTS } = useIpNFTs();

    const found = ipNFTS?.length
        ? ipNFTS.find(({ proposalID }) => proposalID.toString() === ipnftID)
        : undefined;

    const openResearches = () => {
        found?.research.forEach((research) => {
            window.open(`https://${research.replace('ipfs://', '')}.ipfs.dweb.link/`);
        });
    };

    return (
        <section id='ipnft-singular'>
            <div className='container'>
                <div className='overview'>
                    <div className='inner__left'>
                        <img
                            src={`https://${found?.image.replace(
                                'ipfs://',
                                ''
                            )}.ipfs.dweb.link/`}
                            alt='NFT'
                        />
                    </div>
                    <div className='inner__right'>
                        <span>Network: Polygon Testnet</span>
                        <h1>{found?.name || 'NFT Name'}</h1>
                        <p>{found?.description || 'NFT Descriptipn'}</p>
                        <div className='awarded'>
                            Owner: {found?.owner || AddressZero}
                        </div>
                    </div>
                </div>
            </div>
            <div className='ipnft-details'>
                <div className='container'>
                    <h2>ipNFT Details</h2>
                </div>
                <div className='details'>
                    <div className='container'>
                        <div className='card' onClick={openResearches}>
                            <img src={ipnft_singular_1} alt='ipnft_singular_1' />
                            <div className='content'>
                                <div className='title'>
                                    IP Agreement and Documentation
                                </div>
                                <span>Stored on IPFS</span>
                            </div>
                        </div>
                        {/* <div className='card'>
                            <img src={ipnft_singular_2} alt='ipnft_singular_2' />
                            <div className='content'>
                                <div className='title'>
                                    Review Committee Feedback and Statements
                                </div>
                                <span>Stored on IPFS</span>
                            </div>
                        </div> */}
                        <ExternalLink
                            to={`https://${found?.proposal.replace(
                                'ipfs://',
                                ''
                            )}.ipfs.dweb.link/`}
                            className='card'
                        >
                            <img src={ipnft_singular_3} alt='ipnft_singular_3' />
                            <div className='content'>
                                <div className='title'>Original Proposal Document</div>
                                <span>Stored on IPFS</span>
                            </div>
                        </ExternalLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IpNftSingular;
