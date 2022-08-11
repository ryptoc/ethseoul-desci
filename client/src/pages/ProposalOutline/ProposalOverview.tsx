import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Web3File } from 'web3.storage';
import useProposals from '../../hooks/web3/useProposals';
import useWeb3Storage from '../../hooks/web3/useWeb3Storage';

const ProposalOverview = () => {
    const [file, setFile] = useState<Web3File>();

    const { proposals } = useProposals();

    const { projectID } = useParams();

    const client = useWeb3Storage();

    useEffect(() => {
        if (!proposals || !client) return;

        const proposalFound = proposals.find(
            (proposal) => proposal.id.toString() === projectID
        );

        if (!proposalFound) return;

        (async () => {
            try {
                const res = await client.get(proposalFound.researchCid); // Promise<Web3Response | null>

                if (!res) return;

                const files = await res.files(); // Promise<Web3File[]>

                setFile(files[0]);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [proposals, client, projectID]);

    return (
        <div className='container tab-content proposal-overview'>
            <object
                width='100%'
                height='900'
                data={`https://${file?.cid}.ipfs.dweb.link/`}
                type='application/pdf'
            >
                {' '}
            </object>
        </div>
    );
};

export default ProposalOverview;
