import React from 'react';
import Button from '../Button';
import { TabProps } from './tabTypes';

const Tab: React.FC<TabProps> = ({ children, active, onClick }) => (
    <Button
        variant='tertiary'
        className={`tab ${active ? 'active' : ''}`}
        onClick={onClick}
    >
        {children}
    </Button>
);

export default Tab;
