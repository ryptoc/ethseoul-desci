import { Children, cloneElement, isValidElement } from 'react';
import { TabHeaderProps } from './tabTypes';
import useTabsState from './useTabsState';

const TabHeader: React.FC<TabHeaderProps> = ({ children }) => {
    const { tabIndex, setTabIndex } = useTabsState();

    const allChildren = Children.map(children, (child, index) =>
        isValidElement(child)
            ? cloneElement(child, {
                  active: tabIndex === index,
                  onClick: () => setTabIndex(index),
              })
            : 'invalid element'
    );

    return <div className='tabs-header-container'>{allChildren}</div>;
};

export default TabHeader;
