import { SupportedChains } from '../config/constants';
import { NetworkConnector } from '@web3-react/network-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';

export const RPC_URLS = {
    [SupportedChains.MAINNET]: `https://spool-test.solidant.io`,
    // [SupportedChains.MAINNET]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [SupportedChains.ROPSTEN]: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [SupportedChains.RINKEBY]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [SupportedChains.GOERLI]: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [SupportedChains.KOVAN]: `https://kovan.infura.iov3/${process.env.REACT_APP_INFURA_ID}`,
};

const POLLING_INTERVAL = 12000;

export const networkConnector = new NetworkConnector({
    urls: {
        [SupportedChains.MAINNET]: 'https://cloudflare-eth.com/',
        // [SupportedChains.MAINNET]: RPC_URLS[SupportedChains.MAINNET],
        // [networks.ROPSTEN]: RPC_URLS[networks.ROPSTEN],
        // [SupportedChains.RINKEBY]: RPC_URLS[SupportedChains.RINKEBY],
        // [networks.GOERLI]: RPC_URLS[networks.GOERLI],
        // [networks.KOVAN]: RPC_URLS[networks.KOVAN],
    },
    defaultChainId: SupportedChains.MAINNET,
});

export const injected = new InjectedConnector({
    supportedChainIds: [
        SupportedChains.MAINNET,
        // networks.ROPSTEN,
        // SupportedChains.RINKEBY,
        // networks.GOERLI,
        // networks.KOVAN,
    ],
});

export const walletConnect = new WalletConnectConnector({
    rpc: { [SupportedChains.MAINNET]: RPC_URLS[SupportedChains.MAINNET] },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
});

export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[SupportedChains.MAINNET],
    appName: 'app.spool.fi',
});

export const trezor = new TrezorConnector({
    chainId: SupportedChains.MAINNET,
    url: RPC_URLS[SupportedChains.MAINNET],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: 'developer@xyz.com',
    manifestAppUrl: 'https://app.spool.fi',
});

export const portis = new PortisConnector({
    dAppId: 'e8bf51d3-ea8e-49e3-aad9-5dc6c3cf2b11',
    networks: [SupportedChains.MAINNET, 100],
});

export const ledger = new LedgerConnector({
    chainId: SupportedChains.MAINNET,
    url: RPC_URLS[SupportedChains.MAINNET],
    pollingInterval: POLLING_INTERVAL,
});

export const torus = new TorusConnector({ chainId: SupportedChains.MAINNET });

export const fortmatic = new FortmaticConnector({
    apiKey: 'pk_live_911E0486D54C05CE',
    chainId: SupportedChains.MAINNET,
});
