import { parseEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import abis from '../../config/abis';
import { fetcher, toBigNumber } from '../../web3/utils';

const useIsApproved = (
    tokenAddress: string | undefined,
    spender: string | undefined,
    amount: string
) => {
    const { library, account } = useWeb3React();

    const [isApproved, setIsApproved] = useState(false);

    const { data: allowance, mutate } = useSWR(
        [tokenAddress ?? '', 'allowance', account, spender],
        {
            fetcher: fetcher(library, abis.erc20),
            fallbackData: parseEther('0'),
            dedupingInterval: 1000,
        }
    );

    useEffect(() => {
        if (allowance.gt(toBigNumber(amount || '0'))) {
            setIsApproved(true);
            return;
        }

        setIsApproved(false);
    }, [allowance, amount]);

    return { isApproved, mutate };
};

export default useIsApproved;
