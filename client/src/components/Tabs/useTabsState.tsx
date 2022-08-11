import { useContext } from 'react';
import tabsContext from './tabsContext';

const useTabsState = () => {
    const context = useContext(tabsContext);

    return context;
};

export default useTabsState;
