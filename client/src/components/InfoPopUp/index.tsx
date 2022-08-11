import React, { cloneElement, isValidElement, ReactNode, useMemo, useId } from 'react';
import { InfoRoundedIcon } from '../../assets/icons';
import ReactTooltip from 'react-tooltip';
import Portal from '../Portal';

type InfoPopUpProp = {
    children: ReactNode;
    trigger?: ReactNode;
    className?: string;
};

const InfoPopUp: React.FC<InfoPopUpProp> = ({ className = '', children, trigger }) => {
    const uuid = useId();

    const clonedIcon = useMemo(
        () =>
            isValidElement(trigger)
                ? cloneElement(trigger, { 'data-tip': true, 'data-for': uuid })
                : undefined,
        [trigger, uuid]
    );

    return (
        <div className={`info-container ${className}`}>
            <Portal>
                <ReactTooltip offset={{ top: 10 }} id={uuid} className='info-pop-up'>
                    {children}
                </ReactTooltip>
            </Portal>
            {clonedIcon ?? <InfoRoundedIcon data-tip data-for={uuid} />}
        </div>
    );
};

export default InfoPopUp;
