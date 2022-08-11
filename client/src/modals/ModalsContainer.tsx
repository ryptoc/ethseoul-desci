import ConnectWalletModal from './connectWallet/ConnectWalletModal';
import CreateIpNftModal from './CreateIpNft';
import CurrentOffersModal from './CurrentOffersModal';
import RequestToContributeModal from './RequestToContributeModal';
import ErrorModal from './status/ErrorModal';
import SuccessModal from './status/SuccessModal';
import WaitingModal from './status/WaitingModal';
import WarningModal from './status/WarningModal';
import SubmitMilestoneModal from './SubmitMilestoneModal';

const ModalsContainer = () => (
    <>
        <CurrentOffersModal />
        <RequestToContributeModal />
        <CreateIpNftModal />
        <SubmitMilestoneModal />
        <ErrorModal />
        <WarningModal />
        <SuccessModal />
        <WaitingModal />
        <ConnectWalletModal />
    </>
);

export default ModalsContainer;
