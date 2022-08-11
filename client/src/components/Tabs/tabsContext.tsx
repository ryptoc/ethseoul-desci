import { createContext } from 'react';
import { TabTypes } from './tabTypes';

const tabsContext = createContext({} as TabTypes);

export default tabsContext;
