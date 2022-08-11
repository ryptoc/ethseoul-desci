import { ReactNode } from 'react';

type CustomModalContentProps = {
    children: ReactNode;
};

const CustomModalContent: React.FC<CustomModalContentProps> = ({ children }) => (
    <div className='content-wrapper'>
        <div className='content'>{children}</div>
    </div>
);

export default CustomModalContent;
