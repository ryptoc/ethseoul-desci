import { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';

const useWeb3Storage = () => {
    const [client, setClient] = useState<Web3Storage>();

    useEffect(() => {
        if (!process.env.REACT_APP_WEB3_STORAGE_API) return;

        const web3storage = new Web3Storage({
            token: process.env.REACT_APP_WEB3_STORAGE_API,
            endpoint: new URL('https://api.web3.storage'),
        });

        setClient(web3storage);
    }, []);

    return client;
};

export default useWeb3Storage;
