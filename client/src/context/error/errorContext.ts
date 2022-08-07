import { createContext } from 'react';
import { ErrorTypes } from './errorTypes';

const errorContext = createContext({} as ErrorTypes);

export default errorContext;
