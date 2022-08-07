import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import IpNfts from '../pages/IPNFTS';
import P2PFunding from '../pages/P2PFunding';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/ipnfts' element={<IpNfts />} />
        <Route path='/p2p-funding' element={<P2PFunding />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
);

export default AppRoutes;
