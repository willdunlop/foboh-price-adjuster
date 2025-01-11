import cn from 'classnames';
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const Box = ({ className, children }: Props) => {

    return (
        <div className={cn("p-6 rounded-2xl", className)}>{children}</div>
    )
}