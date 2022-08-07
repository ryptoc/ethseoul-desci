import { SupportedConnectors } from '../config/constants';
import {
    fortmatic,
    injected,
    ledger,
    portis,
    torus,
    trezor,
    walletConnect,
    walletlink,
} from './connectors';

const walletConnections: Record<SupportedConnectors, any> = {
    [SupportedConnectors.METAMASK]: injected,
    [SupportedConnectors.PORTIS]: portis,
    [SupportedConnectors.WALLET_CONNECT]: walletConnect,
    [SupportedConnectors.LEDGER]: ledger,
    [SupportedConnectors.COINBASE]: walletlink,
    [SupportedConnectors.TORUS]: torus,
    [SupportedConnectors.TREZOR]: trezor,
    [SupportedConnectors.FORTMATIC]: fortmatic,
};

export const ClosableWallet = [
    SupportedConnectors.WALLET_CONNECT,
    SupportedConnectors.PORTIS,
    SupportedConnectors.TORUS,
    SupportedConnectors.FORTMATIC,
];

export default walletConnections;
