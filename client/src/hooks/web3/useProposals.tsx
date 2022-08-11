import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import useSWR from 'swr';
import { getPlatformContract } from '../../helpers/typechain';
import { ResearchProposalViewStructOutput } from '../../typechain/contracts/DeSciPlatform';

export type ProposalType = {
    id: number;
    title: string;
    description: string;
    researchCid: string;
    pictureCid: string;
    state: number;
    proposalMilestones: {
        comment: string;
        milestoneResearchCid: string;
        payoutAmount: BigNumber;
        percentage: BigNumber;
        state: number;
    }[];
    milestoneIndex: BigNumber;
    researcher: string;
    researchAmount: BigNumber;
    funder: string;
    researcherApplications: string[];
};

const useProposals = () => {
    const { library } = useWeb3React();

    const { data, error, mutate } = useSWR('proposals', async () => {
        const platform = getPlatformContract(library);

        return platform.getProposals();
    });

    const formatData = (
        proposals: ResearchProposalViewStructOutput[] | undefined
    ): ProposalType[] | undefined =>
        proposals
            ? proposals.map((proposal, index) => ({
                  id: index,
                  title: proposal.title,
                  description: proposal.description,
                  researchCid: proposal.researchCid,
                  pictureCid: proposal.pictureCid,
                  state: proposal.state,
                  proposalMilestones: proposal.proposalMilestones.map(
                      ({
                          comment,
                          milestoneResearchCid,
                          payoutAmount,
                          percentage,
                          state,
                      }) => ({
                          comment,
                          milestoneResearchCid,
                          payoutAmount,
                          percentage,
                          state,
                      })
                  ),
                  milestoneIndex: proposal.milestoneIndex,
                  researcher: proposal.researcher,
                  researchAmount: proposal.researchAmount,
                  funder: proposal.funder,
                  researcherApplications: proposal.researcherApplications,
              }))
            : undefined;

    return {
        proposals: formatData(data),
        isLoading: !error && !data,
        error,
        update: mutate,
    };
};

export default useProposals;
