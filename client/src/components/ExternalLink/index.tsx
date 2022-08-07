import React, { forwardRef, ReactNode } from 'react';

interface ExternalLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    to: string;
    children: ReactNode;
}

const ExternalLink = forwardRef<any, ExternalLinkProps>(
    ({ to, children, ...rest }, ref) => (
        <a ref={ref} href={to} target='_blank' rel='noreferrer noopener' {...rest}>
            {children}
        </a>
    )
);

export default ExternalLink;
