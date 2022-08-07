import { createContext } from 'react';
import { ConnectionType } from './connectionTypes';

const connectionContext = createContext({} as ConnectionType);

export default connectionContext;
