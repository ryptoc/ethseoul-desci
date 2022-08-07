const Cross = (props: React.SVGAttributes<SVGSVGElement>) => (
    <svg
        width='47'
        height='47'
        viewBox='0 0 47 47'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <rect
            x='11.3135'
            y='34.6482'
            width='33'
            height='1'
            rx='0.5'
            transform='rotate(-45 11.3135 34.6482)'
            fill='#F15266'
        />
        <rect
            x='34.6484'
            y='35.3552'
            width='33'
            height='1'
            rx='0.5'
            transform='rotate(-135 34.6484 35.3552)'
            fill='#F15266'
        />
    </svg>
);

export default Cross;
