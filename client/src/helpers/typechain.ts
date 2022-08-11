import { Provider } from '@ethersproject/providers';
import { Signer } from 'ethers';
import { config } from '../config/config';
import { DeSciPlatform__factory, IpNFT__factory, MockToken__factory } from '../typechain';

export const getPlatformContract = (signer: Signer | Provider) => {
    return DeSciPlatform__factory.connect(config.addresses.platform, signer);
};

export const getTokenContract = (signer: Signer | Provider) => {
    return MockToken__factory.connect(config.addresses.mockToken, signer);
};

export const getIpNftContract = (signer: Signer | Provider) => {
    return IpNFT__factory.connect(config.addresses.ipnft, signer);
};

export const getProposalState = (state: number) => {
    switch (state) {
        case 0:
            return 'Submitted';
        case 1:
            return 'In Research';
        case 2:
            return 'Researched';
        case 3:
            return 'Discarded';
        default:
            return '';
    }
};

export const getProposalMilestoneState = (state: number) => {
    switch (state) {
        case 0:
            return 'None';
        case 1:
            return 'In Progress';
        case 2:
            return 'Under Review';
        case 3:
            return 'Researched';
        case 4:
            return 'Discarded';
        default:
            return '';
    }
};
