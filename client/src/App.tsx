import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ConnectionState from './context/connection/ConnectionState';
import ErrorState from './context/error/ErrorState';
import ModalState from './context/modal/ModalState';
import './css/App.scss';
import Footer from './layout/Footer';
import Header from './layout/Header';
import ScrollToTop from './layout/ScrollToTop';
import Sidebar from './layout/Sidebar';
import ModalsContainer from './modals/ModalsContainer';
import AppRoutes from './routes';

const App = () => {
    const getLibrary = (provider: any): Web3Provider => {
        const library = new Web3Provider(provider);
        library.pollingInterval = 12000;

        return library;
    };

    return (
        <Router>
            <ModalState>
                <ErrorState>
                    <Web3ReactProvider getLibrary={getLibrary}>
                        <ConnectionState>
                            <ScrollToTop />
                            <Sidebar />
                            <Header />
                            <main>
                                <AppRoutes />
                            </main>
                            <Footer />
                            <ModalsContainer />
                        </ConnectionState>
                    </Web3ReactProvider>
                </ErrorState>
            </ModalState>
        </Router>
    );
};

export default App;
