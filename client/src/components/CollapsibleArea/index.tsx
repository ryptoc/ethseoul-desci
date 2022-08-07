import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import useIsMounted from '../../hooks/useIsMounted';
import useWidth from '../../hooks/useWidth';

type CollapsibleAreaType = {
    updateCollapsedHeight: () => void;
};

type CollapsibleAreaProps = {
    children: ReactNode;
    collapsed: boolean;
    initialHeight?: number;
    className?: string;
    unMountOnExit?: boolean;
};

export const CollapsibleAreaContext = createContext({} as CollapsibleAreaType);

const CollapsibleArea: React.FC<CollapsibleAreaProps> = ({
    className = '',
    initialHeight = 0,
    collapsed = false,
    children,
    unMountOnExit = false,
}) => {
    const collapsibleRef = useRef<HTMLDivElement>(null);

    const isMounted = useIsMounted();

    const windowWidth = useWidth();

    const [maxHeight, setMaxHeight] = useState<number | string | undefined>(0);
    const [currentHeight, setCurrentHeight] = useState<number | string | undefined>(
        initialHeight
    );
    const [renderChildren, setRenderChildren] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const updateCollapsedHeight = useCallback(() => {
        setCurrentHeight(collapsibleRef.current?.scrollHeight);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        setVisibility(collapsed);

        if (!unMountOnExit) return;

        if (renderChildren && !collapsed) {
            setRenderChildren(false);
        }
    }, [unMountOnExit, renderChildren, collapsed]);

    useEffect(() => {
        if (collapsed && !renderChildren && isMounted()) {
            setRenderChildren(true);
        }
    }, [collapsed, renderChildren, isMounted]);

    useEffect(() => {
        if (renderChildren && isMounted()) {
            setMaxHeight(collapsibleRef.current?.scrollHeight);
        }
    }, [renderChildren, windowWidth, isMounted]);

    useEffect(() => {
        if (!maxHeight || !isMounted()) return;

        setCurrentHeight(maxHeight);
    }, [maxHeight, isMounted]);

    return (
        <CollapsibleAreaContext.Provider value={{ updateCollapsedHeight }}>
            <div
                className={`collapsible-area ${className} ${
                    collapsed ? 'collapsed' : 'hidden'
                }`}
                style={{
                    maxHeight: collapsed ? currentHeight : initialHeight,
                    visibility: collapsed || visibility ? 'visible' : 'hidden',
                }}
                ref={collapsibleRef}
                onTransitionEnd={handleTransitionEnd}
                aria-hidden={!collapsed}
                tabIndex={collapsed ? 1 : -1}
            >
                {unMountOnExit ? renderChildren && children : children}
            </div>
        </CollapsibleAreaContext.Provider>
    );
};

export default CollapsibleArea;
