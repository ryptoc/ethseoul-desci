import { ConnectionActions, ConnectionType } from './connectionTypes';

const connectionReducer = (state: ConnectionType, action: ConnectionActions) => {
    switch (action.type) {
        case 'SET_WALLET_CONNECTION':
            return {
                ...state,
                activeConnector: action.payload,
            };
        case 'DISCONNECT_WALLET':
            return {
                ...state,
                activeConnector: {
                    connector: null,
                    name: null,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default connectionReducer;
