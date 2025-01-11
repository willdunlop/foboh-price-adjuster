import cn from 'classnames';
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const Card = ({ className, children }: Props) => {

    return (
        <div className={cn("px-6 py-8 rounded-2xl", className)}>{children}</div>
    )
}