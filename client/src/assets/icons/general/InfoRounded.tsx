import { forwardRef } from 'react';

type Props = React.SVGAttributes<SVGSVGElement>;
type Ref = SVGSVGElement;

const InfoRounded = forwardRef<Ref, Props>((props, ref) => (
    <svg
        ref={ref}
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <circle cx='7.5' cy='7.5' r='7' stroke='#23B3E5' />
        <line x1='7.5' y1='6' x2='7.5' y2='12' stroke='#23B3E5' />
        <path d='M7.5 3V5' stroke='#23B3E5' />
    </svg>
));

export default InfoRounded;
