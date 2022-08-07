import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: ReactNode;
};

const Portal: React.FC<Props> = ({ children }) => {
    const mount = document.body;
    const div = document.createElement('div');
    div.className = 'custom-portal';

    useEffect(() => {
        mount?.appendChild(div);

        return () => {
            mount?.removeChild(div);
        };
    }, [mount, div]);

    return createPortal(children, div);
};

export default Portal;
