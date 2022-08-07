import React, { forwardRef, ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import ExternalLink from '../ExternalLink';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset' | undefined;
    variant?: 'primary' | 'secondary';
    className?: string;
    interalLink?: string;
    externalLink?: string;
    reverseTheme?: boolean;
    children?: ReactNode;
}

const Button = forwardRef<any, ButtonProps>(
    (
        {
            type = 'button',
            variant = 'primary',
            className = '',
            externalLink,
            interalLink,
            reverseTheme = false,
            children,
            ...rest
        },
        ref
    ) => {
        const buttonClassName = `custom ${className} button-${variant}`;

        if (interalLink) {
            return (
                <Link to={interalLink} className={buttonClassName}>
                    {children}
                </Link>
            );
        }

        if (externalLink) {
            return (
                <ExternalLink to={externalLink} className={buttonClassName}>
                    {children}
                </ExternalLink>
            );
        }

        return (
            <button ref={ref} type={type} className={buttonClassName} {...rest}>
                {children}
            </button>
        );
    }
);

export default Button;
