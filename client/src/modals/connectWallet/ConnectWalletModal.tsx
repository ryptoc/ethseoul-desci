import React, { useContext, useMemo } from 'react';
import { ConnectWalletIcon, CrossIcon, WalletConnectorIcons } from '../../assets/icons';
import CustomModal from '../../components/CustomModal';
import { SupportedConnectors } from '../../config/constants';
import connectionContext from '../../context/connection/connectionContext';
import modalContext from '../../context/modal/modalContext';
import walletConnections, { ClosableWallet } from '../../web3/walletConnections';

const ConnectWalletModal: React.FC = () => {
    const { closeModal } = useContext(modalContext);
    const { activeConnector, activateWallet, disconnectWallet, handleDisconnect } =
        useContext(connectionContext);

    const onClose = () => closeModal('connectWalletModal');

    const handleWalletClick = async (
        name: SupportedConnectors,
        connector: any | null
    ) => {
        activeConnector.name === name
            ? disconnectWallet()
            : activateWallet(name, connector);
    };

    const showDisconnect = useMemo(
        () => activeConnector.name && ClosableWallet.includes(activeConnector.name),
        [activeConnector.name]
    );

    return (
        <CustomModal modalName='connectWalletModal' className='connect-wallet-modal'>
            <div className='content'>
                <button type='button' onClick={onClose}>
                    <CrossIcon />
                </button>
                <ConnectWalletIcon />
                {showDisconnect ? (
                    <button className='disconnect' onClick={handleDisconnect}>
                        Disconnect Wallet
                    </button>
                ) : (
                    <>
                        <div className='title'>Connect Wallet</div>
                        <div className='wallet-connections'>
                            {Object.entries(walletConnections).map(
                                ([walletName, connector]) => (
                                    <button
                                        key={walletName}
                                        className={
                                            walletName === activeConnector.name
                                                ? 'active'
                                                : undefined
                                        }
                                        onClick={() =>
                                            handleWalletClick(
                                                walletName as SupportedConnectors,
                                                connector
                                            )
                                        }
                                    >
                                        <div className='icon-container'>
                                            {WalletConnectorIcons[walletName]}
                                        </div>
                                        {walletName}
                                    </button>
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </CustomModal>
    );
};

export default ConnectWalletModal;
