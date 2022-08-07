import { SupportedConnectors } from '../../config/constants';

export type ActiveConnector = {
    connector: any | null;
    name: SupportedConnectors | null;
};

export type ConnectionActions =
    | {
          type: 'SET_WALLET_CONNECTION';
          payload: ActiveConnector;
      }
    | {
          type: 'DISCONNECT_WALLET';
      };

export type ConnectionType = {
    activeConnector: ActiveConnector;
    activateWallet: (name: SupportedConnectors, connector: any) => void;
    disconnectWallet: () => void;
    handleDisconnect: () => void;
};
