import { Children } from 'react';
import { TabBodyProps } from './tabTypes';
import useTabsState from './useTabsState';

const TabBody: React.FC<TabBodyProps> = ({ children }) => {
    const { tabIndex } = useTabsState();

    return (
        <div className='tab-body'>
            {Children.map(children, (child, index) =>
                index === tabIndex ? child : null
            )}
        </div>
    );
};

export default TabBody;
