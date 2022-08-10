import React, { useContext } from 'react';
import { WalletConnectorIcons } from '../../assets/icons';
import CustomModal from '../../components/CustomModal';
import { SupportedConnectors } from '../../config/constants';
import connectionContext from '../../context/connection/connectionContext';
import modalContext from '../../context/modal/modalContext';
import walletConnections from '../../web3/walletConnections';

const ConnectWalletModal: React.FC = () => {
    const { closeModal } = useContext(modalContext);
    const { activeConnector, activateWallet, disconnectWallet } =
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

    return (
        <CustomModal modalName='connectWalletModal' className='connect-wallet-modal'>
            <div className='content'>
                <div className='wallet-connections'>
                    {Object.entries(walletConnections).map(([walletName, connector]) => (
                        <button
                            key={walletName}
                            className={
                                walletName === activeConnector.name ? 'active' : undefined
                            }
                            onClick={() =>
                                handleWalletClick(
                                    walletName as SupportedConnectors,
                                    connector
                                )
                            }
                        >
                            <div className='icon-container'>
                                {WalletConnectorIcons[walletName as SupportedConnectors]}
                            </div>
                            {walletName}
                        </button>
                    ))}
                </div>
            </div>
        </CustomModal>
    );
};

export default ConnectWalletModal;
