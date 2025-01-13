'use client';

import React from 'react';
import cn from 'classnames';

type Variant = "primary" | "secondary" | "text"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    variant?: Variant
}

export const Button = ({ variant="primary",  children, disabled, className }: Props) => {

    return (
        <button
            className={cn(
                "px-4 py-3 rounded-3xl outline-none font-semibold",
                {
                    "bg-green-primary text-white": variant === "primary",
                    "bg-white font-black": variant === "secondary",
                    "bg-none font-black": variant === "text",

                    "bg-slate-300 cursor-not-allowed": disabled
                },
                className
            )}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
