import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useState } from 'react';
import { SupportedConnectors } from '../../config/constants';
import connectionContext from '../../context/connection/connectionContext';
import { injected } from '../../web3/connectors';

const useAutoConnect = () => {
    const [tried, setTried] = useState(false);

    const { active } = useWeb3React();
    const { activateWallet } = useContext(connectionContext);

    useEffect(() => {
        if (!active) {
            (async () => {
                const isAuthorized = await injected.isAuthorized();

                if (isAuthorized) {
                    activateWallet(SupportedConnectors.METAMASK, injected);
                } else {
                    setTried(true);
                }
            })();
        }
    }, [active, activateWallet]);

    useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);

    return tried;
};

export default useAutoConnect;
