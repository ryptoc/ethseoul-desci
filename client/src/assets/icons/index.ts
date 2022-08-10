import { Socials, SupportedConnectors, Tokens } from '../../config/constants';

// socials
import Discord from './social/Discord';
import Telegram from './social/Telegram';
import Twitter from './social/Twitter';
import Medium from './social/Medium';
import Gitbook from './social/Gitbook';
import LinkedIn from './social/LinkedIn';

// connectors
import Metamask from './connectors/Metamask';
import WalletConnect from './connectors/WalletConnect';
import Coinbase from './connectors/Coinbase';
import Trezor from './connectors/Trezor';
import Portis from './connectors/Portis';
import Ledger from './connectors/Ledger';
import Torus from './connectors/Torus';
import Fortmatic from './connectors/Fortmatic';

// tokens
import Ether from './tokens/Ether';
import UsdCoin from './tokens/UsdCoin';

// modal
export { default as CrossIcon } from './modal/Cross';
export { default as ConnectWalletIcon } from './modal/ConnectWallet';
export { default as ErrorIcon } from './modal/Error';
export { default as SuccessIcon } from './modal/Success';
export { default as WarningIcon } from './modal/Warning';
export { default as SpinnerIcon } from './modal/Spinner';

// general
export { default as WalletIcon } from './general/Wallet';
export { default as InfoRoundedIcon } from './general/InfoRounded';

// layout
export { default as HomeIcon } from './layout/Home';
export { default as AboutIcon } from './layout/About';
export { default as ContactIcon } from './layout/Contact';

type Icons<T extends string | number> = Partial<Record<T, JSX.Element>>;

export const SocialIcons: Icons<Socials> = {
    [Socials.DISCORD]: Discord(),
    [Socials.TELEGRAM]: Telegram(),
    [Socials.TWITTER]: Twitter(),
    [Socials.MEDIUM]: Medium(),
    [Socials.GITBOOK]: Gitbook(),
    [Socials.LINKEDIN]: LinkedIn(),
};

export const TokenIcons: Icons<Tokens> = {
    [Tokens.ETH]: Ether(),
    [Tokens.USDC]: UsdCoin(),
};

export const WalletConnectorIcons: Icons<SupportedConnectors> = {
    [SupportedConnectors.METAMASK]: Metamask(),
    [SupportedConnectors.WALLET_CONNECT]: WalletConnect(),
    [SupportedConnectors.COINBASE]: Coinbase(),
    [SupportedConnectors.TREZOR]: Trezor(),
    [SupportedConnectors.PORTIS]: Portis(),
    [SupportedConnectors.LEDGER]: Ledger(),
    [SupportedConnectors.TORUS]: Torus(),
    [SupportedConnectors.FORTMATIC]: Fortmatic(),
};
