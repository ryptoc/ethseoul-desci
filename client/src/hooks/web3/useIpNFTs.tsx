import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';
import { getIpNftContract } from '../../helpers/typechain';
import useProposals from './useProposals';

type IpNftType = {
    name: string;
    description: string;
    image: string;
    proposal: string;
    research: string[];
    createdOn: number;
    owner: string;
    proposalID: number;
};

const useIpNFTs = () => {
    const { library } = useWeb3React();

    const { proposals } = useProposals();

    const { data, error, mutate } = useSWR(
        ['ipnfts', proposals],
        async (_, proposals) => {
            const proposalIds = proposals
                ?.filter(({ state }) => state === 2)
                .map(({ id }) => id);

            if (!proposalIds?.length) return [];

            const tokenURIs = await Promise.all(
                proposalIds.map(async (proposalID) => {
                    const ipnftContract = getIpNftContract(library.getSigner());

                    const tokenUri = await ipnftContract.tokenURI(proposalID);
                    const owner = await ipnftContract.ownerOf(proposalID);

                    return { uri: tokenUri.replace('ipfs://', ''), owner, proposalID };
                })
            );

            const baseData = await Promise.all(
                tokenURIs.map(async ({ uri, owner, proposalID }) => {
                    const data = await fetch(`https://${uri}.ipfs.dweb.link/`).then(
                        (res) => res.json()
                    );

                    return {
                        ...data,
                        owner,
                        proposalID,
                    };
                })
            );

            return baseData as IpNftType[];
        }
    );

    return {
        ipNFTS: data,
        isLoading: !error && !data,
        error,
        update: mutate,
    };
};

export default useIpNFTs;
