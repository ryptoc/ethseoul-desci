import React, {
    useEffect,
    cloneElement,
    isValidElement,
    useRef,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import { useCallback } from 'react';
import { InfoRoundedIcon } from '../../assets/icons';
import useWidth from '../../hooks/useWidth';
import Portal from '../Portal';

type InfoPopUpProp = {
    children: ReactNode;
    trigger: ReactNode;
    className?: string;
    triggerMargin?: {
        x?: number;
        y?: number;
    };
};

type PositionObject = {
    top: string | number;
    left: string | number;
    right?: string | number;
    overflowY?: boolean;
};

const InfoPopUp: React.FC<InfoPopUpProp> = ({
    className = '',
    children,
    trigger,
    triggerMargin = {
        x: 6,
        y: 5,
    },
}) => {
    const triggerRef = useRef<SVGSVGElement | HTMLElement>(null);

    const contentRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const [position, setPosition] = useState<PositionObject>({ top: 0, left: 0 });

    const windowWidth = useWidth();

    const show: React.MouseEventHandler<SVGSVGElement | HTMLElement> = useCallback(
        (e) => {
            e.stopPropagation();
            e.preventDefault();

            setOpen(true);
        },
        []
    );

    const hide = useCallback(() => {
        setOpen(false);
    }, []);

    const clonedIcon = useMemo(
        () =>
            isValidElement(trigger)
                ? cloneElement(trigger, {
                      onClick: show,
                      onMouseEnter: show,
                      onMouseLeave: hide,
                      ref: triggerRef,
                  })
                : undefined,
        [trigger, show, hide]
    );

    const calculatePosition = useCallback(() => {
        if (!triggerRef.current || !contentRef.current) return;
        const triggerBounds = triggerRef.current?.getBoundingClientRect();
        const contentBounds = contentRef.current?.getBoundingClientRect();

        if (!triggerBounds || !contentBounds) return;

        const { top, left, right, height } = triggerBounds;
        const { width, height: contentHeight } = contentBounds;

        const isOverflowX = left + width > window.innerWidth;
        const isOverfowY = top + contentHeight > window.innerHeight;

        const topSpacing = height + (triggerMargin.y ?? 5);

        setPosition((prev) => ({
            ...prev,
            top: isOverfowY
                ? top - contentHeight - height + (triggerMargin.y ?? 5)
                : top + topSpacing,
            left: !isOverflowX ? left - (triggerMargin.x ?? 6) : 'unset',
            right: isOverflowX
                ? window.innerWidth - right - (triggerMargin.x ?? 6)
                : 'unset',
            overflowY: isOverfowY,
        }));
    }, [triggerRef, contentRef, triggerMargin.x, triggerMargin.y]);

    useEffect(() => {
        if (!open) return;
        calculatePosition();
    }, [open, calculatePosition]);

    useEffect(() => {
        if (!open) return;

        const scrollListener = () => hide();

        window.addEventListener('scroll', scrollListener);

        return () => window.removeEventListener('scroll', scrollListener);
    }, [hide, open, windowWidth]);

    return (
        <div className={`info-container ${className}`}>
            {clonedIcon ?? (
                <InfoRoundedIcon
                    ref={triggerRef as React.Ref<SVGSVGElement>}
                    onClick={show}
                    onMouseEnter={show}
                    onMouseLeave={hide}
                />
            )}
            {open && (
                <Portal>
                    <div
                        className={`info-pop-up overlay ${open ? 'shown' : ''}`}
                        style={{
                            top: position?.top,
                            left: position?.left,
                            right: position?.right,
                        }}
                    >
                        <div
                            className={`content ${className} ${
                                position?.right !== 'unset' ? 'flipped' : ''
                            }  ${position?.overflowY ? 'vertical-flipped' : ''}`}
                            ref={contentRef}
                        >
                            {children}
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default InfoPopUp;
