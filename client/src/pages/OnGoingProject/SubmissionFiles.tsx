import Button from '../../components/Button';
import Select from '../../components/Select';

const SubmissionFiles = () => {
    return (
        <div className='tab-content submission-files'>
            <div className='inner__left'>
                <span>Last Updated: 6 Aug 2022 16:26:29</span>
                <div className='files-container'></div>
            </div>
            <div className='inner__right'>
                <Select
                    options={[
                        {
                            milestone: 'Milestone 1',
                        },
                        {
                            milestone: 'Milestone 2',
                        },
                        {
                            milestone: 'Milestone 3',
                        },
                    ]}
                    optionKey='milestone'
                />
                <Button externalLink='/' variant='tertiary'>
                    Link to IPFS CID (Zip File)
                </Button>
                <Button externalLink='/' variant='tertiary'>
                    Download selected files
                </Button>
                <Button externalLink='/' variant='tertiary'>
                    Download all files
                </Button>
            </div>
        </div>
    );
};
export default SubmissionFiles;
