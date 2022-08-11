import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Web3File } from 'web3.storage';
import Button from '../../components/Button';
import ExternalLink from '../../components/ExternalLink';
import Select from '../../components/Select';
import useProposals, { ProposalType } from '../../hooks/web3/useProposals';
import useWeb3Storage from '../../hooks/web3/useWeb3Storage';

const SubmissionFiles = () => {
    const { projectID } = useParams();

    const { proposals } = useProposals();

    const [selectedMilestone, setSelectedMilestone] = useState(0);
    const [proposalFound, setProposalFound] = useState<ProposalType>();

    const [files, setFiles] = useState<Web3File[]>();

    const client = useWeb3Storage();

    useEffect(() => {
        if (!projectID || proposalFound) return;

        const proposal = proposals
            ? proposals.find((proposal) => proposal.id.toString() === projectID)
            : undefined;

        if (!proposal) return;

        setProposalFound(proposal);
    }, [projectID, proposalFound, proposals]);

    useEffect(() => {
        if (!client || !proposalFound) return;

        setFiles([]);

        (async () => {
            try {
                const res = await client.get(
                    proposalFound.proposalMilestones[selectedMilestone]
                        .milestoneResearchCid
                ); // Promise<Web3Response | null>

                if (!res) return;

                const files = await res.files(); // Promise<Web3File[]>

                setFiles(files);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [client, proposalFound, selectedMilestone]);

    return (
        <div className='tab-content submission-files'>
            <div className='inner__left'>
                <span>Last Updated: 6 Aug 2022 16:26:29</span>
                <div className='files-container'>
                    {files && files.length
                        ? files.map((file, index) => (
                              <ExternalLink
                                  to={`https://dweb.link/ipfs/${file.cid}`}
                                  key={index}
                              >
                                  {file.name}
                              </ExternalLink>
                          ))
                        : 'No files found...'}
                </div>
            </div>
            <div className='inner__right'>
                <Select
                    options={
                        proposalFound
                            ? proposalFound.proposalMilestones.map((_, index) => ({
                                  milestone: index,
                              }))
                            : [{ milestone: 0 }]
                    }
                    optionKey='milestone'
                    renderOption={(option) => `Milestone ${option.milestone + 1}`}
                    renderSelected={(option) => `Milestone ${option.milestone + 1}`}
                    onChange={(option) => setSelectedMilestone(option.milestone)}
                />
                {(proposalFound?.milestoneIndex.toNumber() || 0) > selectedMilestone && (
                    <Button
                        externalLink={`https://dweb.link/ipfs/${proposalFound?.proposalMilestones[selectedMilestone].milestoneResearchCid}`}
                        variant='tertiary'
                    >
                        Link to IPFS CID (Zip File)
                    </Button>
                )}

                <Button
                    externalLink={
                        files && files.length
                            ? `https://dweb.link/ipfs/${files[0].cid}`
                            : '/'
                    }
                    variant='tertiary'
                >
                    Download file
                </Button>
            </div>
        </div>
    );
};
export default SubmissionFiles;
