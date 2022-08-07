import { useState } from 'react';
import TabContext from './tabsContext';
import { TabsProps } from './tabTypes';

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <TabContext.Provider
            value={{
                tabIndex,
                setTabIndex,
            }}
        >
            {children}
        </TabContext.Provider>
    );
};

export default Tabs;
