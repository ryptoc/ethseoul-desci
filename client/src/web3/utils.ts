import { isAddress } from '@ethersproject/address';
import { parseFixed } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from 'ethers';

export const fetcher =
    (library: any, abi: any) =>
    (...args: any) => {
        const [arg1, arg2, ...params] = args;

        if (isAddress(arg1)) {
            const address = arg1;
            const method = arg2;

            const contract = new Contract(address, abi, library.getSigner());

            return contract[method](...params);
        }

        const method = arg1;

        return library[method](arg2, ...params);
    };

export const calculateMargin = (value: BigNumber) =>
    value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000));

export const toBigNumber = (value: string, decimalPlaces: number = 18) => {
    if (!value.includes('.')) {
        return parseFixed(value, decimalPlaces);
    }

    const parts = value.split('.');
    const fraction = parts[1].slice(0, decimalPlaces);

    return parseFixed(`${parts[0]}.${fraction}`, decimalPlaces);
};

export const preventOverflow = (value: string, decimalPlaces: number = 18) => {
    if (!value.includes('.')) return value;

    const parts = value.split('.');
    const fraction = parts[1].slice(0, decimalPlaces);

    return `${parts[0]}.${fraction}`;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
