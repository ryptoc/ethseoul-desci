import { AddressZero } from '@ethersproject/constants';
import { formatAccount } from '../../helpers/formats';
import ipnft_singular_1 from '../../assets/images/ipnft_singular_1.png';
import ipnft_singular_2 from '../../assets/images/ipnft_singular_2.png';
import ipnft_singular_3 from '../../assets/images/ipnft_singular_3.png';

const IpNftSingular = () => {
    return (
        <section id='ipnft-singular'>
            <div className='container'>
                <div className='overview'>
                    <div className='inner__left'></div>
                    <div className='inner__right'>
                        <span>Network: Ethereum</span>
                        <h1>Microbes</h1>
                        <p>
                            Heterogenous mix of manually manipulated and generative art
                            from the micro-molecular world; creative interpretations of
                            real-life scientific metadata. Whilst most are aware ofthe
                            microbial world found on and in us all, few know of the true
                            beauty, diversity and chaos present. 999 unique works, created
                            with genuine scientific research as source material;
                            contextually educational, visually stimulating and thought
                            provoking.
                        </p>
                        <div className='awarded'>
                            Awarded to: {formatAccount(AddressZero)}
                        </div>
                        <div className='researched-by'>
                            Researched by: VisionDAO Biology Researchers
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
                        <div className='card'>
                            <img src={ipnft_singular_1} alt='ipnft_singular_1' />
                            <div className='content'>
                                <div className='title'>
                                    IP Agreement and Documentation
                                </div>
                                <span>Stored on IPFS</span>
                            </div>
                        </div>
                        <div className='card'>
                            <img src={ipnft_singular_2} alt='ipnft_singular_2' />
                            <div className='content'>
                                <div className='title'>
                                    Review Committee Feedback and Statements
                                </div>
                                <span>Stored on IPFS</span>
                            </div>
                        </div>
                        <div className='card'>
                            <img src={ipnft_singular_3} alt='ipnft_singular_3' />
                            <div className='content'>
                                <div className='title'>Original Proposal Document</div>
                                <span>Stored on IPFS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IpNftSingular;
