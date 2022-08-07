import React, { forwardRef, ReactNode } from 'react';
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
                    <span className='border' />
                    <span>{children}</span>
                </Link>
            );
        }

        if (externalLink) {
            return (
                <ExternalLink to={externalLink} className={buttonClassName}>
                    <span className='border' />
                    <span>{children}</span>
                </ExternalLink>
            );
        }

        return (
            <button ref={ref} type={type} className={buttonClassName} {...rest}>
                <span className='border' />
                <span>{children}</span>
            </button>
        );
    }
);

export default Button;
