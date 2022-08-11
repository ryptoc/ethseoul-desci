import { ReactNode } from 'react';
import { CrossIcon } from '../../assets/icons';
import Button from '../Button';

type Props = {
    title: ReactNode;
    onClose: () => void;
};

const CustomModalHeader: React.FC<Props> = ({ title, onClose }) => (
    <div className='header'>
        <span>{title}</span>
        <Button onClick={onClose}>
            <CrossIcon />
        </Button>
    </div>
);

export default CustomModalHeader;
