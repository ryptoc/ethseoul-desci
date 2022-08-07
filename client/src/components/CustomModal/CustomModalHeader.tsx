import { ReactNode } from 'react';
import { CrossIcon } from '../../assets/icons';

type Props = {
    title: ReactNode;
    onClose: () => void;
};

const CustomModalHeader: React.FC<Props> = ({ title, onClose }) => (
    <div className='header'>
        <span>{title}</span>
        <CrossIcon onClick={onClose} />
    </div>
);

export default CustomModalHeader;
