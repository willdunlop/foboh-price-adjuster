'use client';

import React from 'react';
import cn from 'classnames';

type Variant = "primary" | "secondary" | "text"

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.ReactNode;
    variant?: Variant
}

export const Button = ({ variant="primary",  children }: Props) => {

    return (
        <button
            className={cn(
                "px-4 py-3 rounded-3xl outline-none font-semibold",
                {
                    "bg-green-primary text-white": variant === "primary",
                    "bg-white font-black": variant === "secondary",
                    "bg-none font-black": variant === "text"
                }
            )}
        >
            {children}
        </button>
    )
}


/**
 *  "@headlessui/react": "^2.2.0",
    "@prisma/client": "^6.2.1",
    "classnames": "^2.5.1",
    "decimal.js": "^10.4.3",
    "next": "15.1.4",
    "prisma": "^6.2.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-react": "^5.18.2"



    dev

        "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-react": "^4.18.3",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.0.0"




npm i @headlessui/react @prisma/client classnames decimal.js next prisma react react-dom swagger-jsdoc swagger-ui-react 


npm i -D @eslint/eslintrc @types/node @types/react @types/react-dom @types/swagger-jsdoc @types/swagger-ui-react eslint eslint-config-next postcss tailwindcss typescript --loglevel=verbose


*/