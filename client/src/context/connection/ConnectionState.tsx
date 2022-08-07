import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import {
    UserRejectedRequestError,
    WalletConnectConnector,
} from '@web3-react/walletconnect-connector';
import React, { ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import { SupportedConnectors } from '../../config/constants';
import useIsMounted from '../../hooks/useIsMounted';
import { networkConnector } from '../../web3/connectors';
import modalContext from '../modal/modalContext';
import ConnectionContext from './connectionContext';
import connectionReducer from './connectionReducer';

type Props = {
    children: ReactNode;
};

const ConnectionState: React.FC<Props> = ({ children }) => {
    const { error, activate, deactivate, setError } = useWeb3React();

    const { openModal, closeModal, setModalData } = useContext(modalContext);

    const isMounted = useIsMounted();

    const resetWalletConnector = useCallback((connector: any) => {
        if (
            connector &&
            connector instanceof WalletConnectConnector &&
            connector.walletConnectProvider?.connector?.uri
        ) {
            connector.walletConnectProvider = undefined;
        }
    }, []);

    const activateWallet = useCallback(
        async (name: SupportedConnectors, connector: any) => {
            try {
                await activate(connector, undefined, true);
                dispatch({
                    type: 'SET_WALLET_CONNECTION',
                    payload: {
                        name,
                        connector,
                    },
                });
                closeModal('connectWalletModal');
            } catch (error: any) {
                setError(error);
                resetWalletConnector(connector);
            }
        },
        [activate, closeModal, setError, resetWalletConnector]
    );

    const disconnectWallet = () => {
        dispatch({
            type: 'DISCONNECT_WALLET',
        });
        deactivate();
    };

    const handleDisconnect = async () => {
        await disconnectWallet();
        activeConnector.connector.close();
    };

    const initialState = {
        activeConnector: {
            connector: null,
            name: null,
        },
        activateWallet,
        disconnectWallet,
        handleDisconnect,
    };

    const [state, dispatch] = useReducer(connectionReducer, initialState);

    const { activeConnector } = state;

    // useEffect(() => {
    //     (async () => {
    //         if (
    //             connector &&
    //             connector instanceof SafeAppConnector &&
    //             (await connector.isSafeApp()) &&
    //             chainId &&
    //             chainId !== SupportedChains.MAINNET
    //         ) {
    //             isMounted() &&
    //                 setError(
    //                     new UnsupportedChainIdError(chainId, [SupportedChains.MAINNET])
    //                 );
    //         }
    //     })();
    // }, [connector, chainId, setError, isMounted]);

    useEffect(() => {
        if (!error) return;

        switch (true) {
            case error instanceof UnsupportedChainIdError:
                openModal('warningModal');
                setModalData((prev) => ({
                    ...prev,
                    message: 'Please connect to Ethereum Mainnet',
                }));
                break;
            case error instanceof NoEthereumProviderError:
                openModal('warningModal');
                setModalData((prev) => ({
                    ...prev,
                    message: 'No ethereum provider found',
                }));
                break;
            case error.name === 'TransportError':
                openModal('warningModal');
                setModalData((prev) => ({
                    ...prev,
                    message: 'U2F browser support is required',
                }));
                break;
            case error.message === 'Transport is missing':
                openModal('warningModal');
                setModalData((prev) => ({
                    ...prev,
                    message: 'Trezor Bridge not installed',
                }));
                break;
            // case error === 'User denied login.':
            case error instanceof UserRejectedRequestError:
            case error.message === 'User cancelled login':
                return;
            default:
                console.log(error);
        }

        closeModal('connectWalletModal');
    }, [error, closeModal, openModal, setModalData]);

    return (
        <ConnectionContext.Provider
            value={{
                activeConnector,
                activateWallet,
                disconnectWallet,
                handleDisconnect,
            }}
        >
            <AttempInitializeConnection />
            {children}
        </ConnectionContext.Provider>
    );
};

export default ConnectionState;

const AttempInitializeConnection = () => {
    const { active, activate } = useWeb3React();

    useEffect(() => {
        if (!active) {
            activate(networkConnector);
        }
    }, [active, activate]);

    return null;
};
