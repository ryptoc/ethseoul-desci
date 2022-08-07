import { ReactNode } from 'react';

export type TabTypes = {
    tabIndex: number;
    setTabIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type TabsProps = {
    children: ReactNode;
};

export type TabHeaderProps = {
    children: ReactNode;
};

export type TabBodyProps = {
    children: ReactNode;
};

export type TabProps = {
    children: ReactNode;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    to?: string;
};

export type TabContentProps = {
    children: ReactNode;
    to: string | string[];
};
