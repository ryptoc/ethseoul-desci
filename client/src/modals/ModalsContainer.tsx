import ConnectWalletModal from './connectWallet/ConnectWalletModal';
import CreateIpNftModal from './CreateIpNft';
import CurrentOffersModal from './CurrentOffersModal';
import RequestToContributeModal from './RequestToContributeModal';
import ErrorModal from './status/ErrorModal';
import SuccessModal from './status/SuccessModal';
import WaitingModal from './status/WaitingModal';
import WarningModal from './status/WarningModal';

const ModalsContainer = () => (
    <>
        <ErrorModal />
        <WarningModal />
        <SuccessModal />
        <WaitingModal />
        <ConnectWalletModal />
        <CurrentOffersModal />
        <RequestToContributeModal />
        <CreateIpNftModal />
    </>
);

export default ModalsContainer;
