import About_1 from '../../assets/images/about_1.png';
import About_2 from '../../assets/images/about_2.png';

const About = () => (
    <section id='about'>
        <div className='container'>
            <h1>ABOUT US</h1>
            <div className='about'>
                <div className='inner__left'>
                    <h2>Decentralised, united and passionate.</h2>
                    <p>
                        DeSciWorld is being built by contributors: researchers; designers;
                        businesspeople; creators. Situated around the world, we bring
                        diverse views and people together to unite with the goal of
                        Decentralising Science.
                    </p>
                </div>
                <div className='inner__right'>
                    <img src={About_1} alt='About_1' />
                </div>
            </div>
            <div className='become-a-contributor'>
                <div className='inner__left'>
                    <img src={About_2} alt='About_2' />
                </div>
                <div className='inner__right'>
                    <h2>
                        Become a contributor <span>and grow</span>
                    </h2>
                    <p>
                        DeSciWorld is a constantly evolving ecosystem with a broad scope
                        for its future direction. We encourage researchers, builders,
                        community leaders, artists and creators - anyone - to contribute
                        and find a place in the community. Join our Discord and get
                        involved!
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default About;
