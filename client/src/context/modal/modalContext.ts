import { createContext } from 'react';
import { ModalStateType } from './modalTypes';

const modalContext = createContext({} as ModalStateType);

export default modalContext;
