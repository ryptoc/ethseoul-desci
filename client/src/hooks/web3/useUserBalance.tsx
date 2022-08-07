import { parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useEffect } from 'react';
import useSWR from 'swr';
import abis from '../../config/abis';
import { fetcher } from '../../web3/utils';

const useUserBalance = (tokenAddress: string | undefined) => {
    const { account, library } = useWeb3React();

    const { data: balance, mutate } = useSWR<BigNumber>(
        [tokenAddress ?? '', 'balanceOf', account],
        {
            fetcher: fetcher(library, abis.erc20),
            fallbackData: parseEther('0'),
        }
    );

    useEffect(() => {
        if (!library || !account) return;

        library.on('block', () => {
            mutate(undefined, true);
        });

        return () => {
            library.removeAllListeners('block');
        };
    }, [library, account, mutate]);

    return balance;
};

export default useUserBalance;
