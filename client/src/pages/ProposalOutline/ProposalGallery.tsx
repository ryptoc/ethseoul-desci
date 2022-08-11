import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Web3File, Web3Storage } from 'web3.storage';
import useProposals from '../../hooks/web3/useProposals';
import useWeb3Storage from '../../hooks/web3/useWeb3Storage';

const ProposalGallery = () => {
    const [file, setFile] = useState<Web3File[]>();

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
                const res = await client.get(proposalFound.pictureCid); // Promise<Web3Response | null>

                if (!res) return;

                const files = await res.files(); // Promise<Web3File[]>

                setFile(files);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [proposals, client, projectID]);

    return (
        <div className='container tab-content proposal-gallery'>
            {file &&
                file.map((file, index) => (
                    <div className='img-container' key={index}>
                        <img src={`https://dweb.link/ipfs/${file.cid}`} alt='' />
                    </div>
                ))}
        </div>
    );
};

export default ProposalGallery;
