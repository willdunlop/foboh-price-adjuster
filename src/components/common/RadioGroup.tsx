import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>
    options: { value: string; label: string }[];
    label: string;
}

export const RadioGroup = <T extends FieldValues>({ name, control, options, label }: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: "Please select an option" }}
            render={({ field }) => (
                <div className="mt-6">
                    <label>{label}</label>
                    <div className="flex gap-4 items-center mt-3">
                        {options.map((option) => (
                            <label key={option.value} className="flex items-center">
                                <input
                                    {...field}
                                    type="radio"
                                    value={option.value}
                                    checked={field.value === option.value}
                                    className="mr-2"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        />

    )
}