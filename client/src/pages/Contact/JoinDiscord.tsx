import JoinDiscordArrow from '../../assets/icons/general/JoinDiscordArrow';
import Button from '../../components/Button';

const JoinDiscord = () => (
    <div className='join-discord-banner'>
        <svg
            width='80'
            height='80'
            viewBox='0 0 80 80'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            id='join-discord-logo'
        >
            <circle cx='40' cy='40' r='40' fill='#75FB4C' />
            <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M62.2196 6.7391C55.6409 2.34423 47.9066 -0.00100242 39.9949 3.21421e-07C29.388 0.00134542 19.2159 4.21551 11.7157 11.7157C4.21551 19.2159 0.00134505 29.388 3.21657e-07 39.9949C-0.00100279 47.9066 2.34423 55.6409 6.7391 62.2196C11.134 68.7984 17.3811 73.9261 24.6903 76.9542C31.9996 79.9823 40.0426 80.7749 47.8024 79.2316C55.5621 77.6884 62.6898 73.8787 68.2842 68.2842C73.8787 62.6898 77.6884 55.5621 79.2316 47.8024C80.7749 40.0426 79.9823 31.9996 76.9542 24.6903C73.9261 17.3811 68.7984 11.134 62.2196 6.7391ZM46.5678 22.7361C52.4103 23.1824 57.3602 27.0521 57.3602 27.0521C57.3602 27.0521 62.8883 35.0652 63.8418 50.8025C58.2681 57.2283 49.8086 57.279 49.8086 57.279L48.0386 54.9207C51.646 53.6854 54.8634 51.5195 57.3653 48.642C53.8659 51.2894 48.6015 54.0382 40.0964 54.0382C31.5913 54.0382 26.3168 51.2843 22.8224 48.642C25.3234 51.5206 28.541 53.6867 32.1492 54.9207L30.3792 57.279C30.3792 57.279 21.9247 57.2283 16.3459 50.8025C17.2943 35.0652 22.8224 27.0521 22.8224 27.0521C22.8224 27.0521 27.4782 23.3295 33.6301 22.7361L34.1372 23.7859C30.2881 24.6137 26.7437 26.4921 23.8976 29.2126C28.2592 26.9811 32.5955 24.8915 40.1065 24.8915C47.6176 24.8915 51.9285 26.9811 56.2952 29.2126C53.7594 26.9354 51.325 25.0792 46.0606 23.7859L46.5678 22.7361ZM29.2938 42.1655C29.2938 44.5492 30.9827 46.4815 33.0722 46.4815C35.1617 46.4815 36.8506 44.5492 36.8506 42.1655C36.8506 39.7819 35.1617 37.8445 33.0722 37.8445C30.9827 37.8445 29.2938 39.7819 29.2938 42.1655ZM43.327 42.1655C43.327 44.5492 45.0159 46.4815 47.1054 46.4815C49.1949 46.4815 50.8838 44.5492 50.8838 42.1655C50.8838 39.7819 49.1949 37.8445 47.1054 37.8445C45.0159 37.8445 43.327 39.7819 43.327 42.1655Z'
                fill='#00303F'
            />
        </svg>
        <JoinDiscordArrow />
        <JoinDiscordArrow />
        <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            id='right-angle-triangle'
        >
            <path d='M32 0V32H0L32 0Z' fill='#00303F' />
        </svg>

        <div className='card'>
            <p>
                <span>Please join our Discord</span> for urgent enquires and to
                participate in the community conversation:
            </p>
        </div>
        <Button variant='secondary'>Join our Discord ↗</Button>
    </div>
);

export default JoinDiscord;
