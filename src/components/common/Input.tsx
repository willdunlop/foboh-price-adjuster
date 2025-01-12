import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form';
import cn from 'classnames'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    formRegister?: UseFormRegisterReturn;
}


export const Input = ({ formRegister, ...rest }: Props) => (
    <input
        {...formRegister}
        {...rest}
        className={cn("block w-full rounded-lg border border-black-grey p-3", rest.className)}
    />

)