import { Navigate, Route, Routes } from 'react-router-dom';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';
import IpNfts from '../pages/IPNFTS';
import FundingRequests from '../pages/P2PFunding/FundingRequests';
import OnGoingRequests from '../pages/P2PFunding/OnGoingRequests';
import ResearchRequests from '../pages/P2PFunding/ResearchRequests';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/ipnfts' element={<IpNfts />} />
        <Route path='/funding-requests' element={<FundingRequests />} />
        <Route path='/research-requests' element={<ResearchRequests />} />
        <Route path='/ongoing-requests' element={<OnGoingRequests />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
);

export default AppRoutes;
