import React, { ReactNode } from 'react';

type DropdownProps = {
    open: boolean;
    children: ReactNode;
};

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean;
    children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ open, children }) => (
    <div className={`dropdown-container ${open ? 'collapsed' : ''}`}>{children}</div>
);

export default Dropdown;

export const DropdownItem: React.FC<DropdownItemProps> = ({
    children,
    active,
    ...rest
}) => (
    <div className={`dropdown-item ${active ? 'selected' : ''}`} {...rest}>
        {children}
    </div>
);
