import Button from '../../components/Button';

const RequestsOverview = () => {
    return (
        <section id='requests-overview'>
            <div className='container'>
                <div className='funding-requests'>
                    <h2>FUNDING REQUESTS</h2>
                    <h3>Researchers looking for funding</h3>
                    <p>
                        Looking to fund world-changing research projects from around the
                        world?
                        <br />
                        Browse Funding Requests below to view projects which require
                        funding.
                    </p>
                    <Button variant='tertiary'>Create a Funding Request</Button>
                    <Button variant='tertiary'>View Funding Requests</Button>
                </div>
                <div className='research-requests'>
                    <h2>RESEARCH REQUESTS</h2>
                    <h3>Funders looking for research</h3>
                    <p>
                        Are you a researcher looking for ideas to validate, work on and
                        develop academic papers on?
                        <br />
                        Browse this section to view requests by Funders.
                    </p>
                    <Button variant='tertiary'>Create a Research Request</Button>
                    <Button variant='tertiary'>View Research Requests</Button>
                </div>
            </div>
        </section>
    );
};

export default RequestsOverview;
