import Button from '../../components/Button';

const Hero = () => {
    return (
        <section id='hero'>
            <div className='container'>
                <div className='inner'>
                    <div className='inner__left'>
                        <h1>Research, reDeScined</h1>
                        <p>
                            Decentralised, Peer-to-Peer funding can unlock research
                            opportunities previously closed to the majority. With
                            DeSciWorld, researchers can apply for funding or take on the
                            requests of others.
                        </p>
                    </div>
                    <div className='inner__right'>
                        <Button>
                            Meet our DeScientist <br />
                            Review Committee
                        </Button>
                        <Button>View Ongoing Projects</Button>
                    </div>
                </div>
                <div className='what-is-desci'>
                    <h2>What is De-Sci?</h2>
                    <p>
                        Decentralized Science (DeSci) implements blockchain-based
                        solutions such as Decentralized Autonomous Organizations (DAOs),
                        smart contracts, and cryptocurrencies to decentralize and
                        revolutionize the world of scientific research and its traditional
                        funding and publication landscape.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
