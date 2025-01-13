import React from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import cn from 'classnames'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    formRegister: UseFormRegisterReturn
    name?: string;
    value: string;
    options: string[]
    resetValue?: () => void
}



export const Select = ({ formRegister, name, value, options, className, resetValue }: Props) => {
    return (
        <div className="flex items-center">
            <select
                {...formRegister}
                className={cn(
                    "block h-full w-full border border-black-grey bg-white p-3",
                    {
                        "select-input__border": value,
                        "rounded-lg": !value
                    },
                    className
                )}>
                    {name && (<option className="capitalize text-black-black text-xs font-medium" value="" disabled>{name}</option>)}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>

                ))}
            </select>

            {value && typeof resetValue === "function" &&  (
                <button
                    type="button"
                    onClick={resetValue}
                    className="flex h-full px-1 items-center text-gray-500 select-clear__border border border-black-grey hover:text-black"
                >
                    ✕
                </button>
            )}
        </div>

    )
}