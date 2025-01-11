import cn from 'classnames';
import React from 'react';

type Variant = "primary" | "secondary" | "text"

interface Props {
    children: React.ReactNode;
    variant?: Variant
}

export const Button = ({ variant="primary", children }: Props) => {

    return (
        <button
            className={cn("", {})}
        >
            {children}
        </button>
    )
}