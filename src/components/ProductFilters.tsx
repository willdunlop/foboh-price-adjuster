import React from 'react';
import { Input } from './common/Input';
import { Select } from './common/Select';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { FilterFormValues } from '@/app/page';

interface Props {
    filterFormValues: FilterFormValues
    registerFilter: UseFormRegister<FilterFormValues>
    setFilterValue: UseFormSetValue<FilterFormValues>
}

export const ProductFilters = ({ filterFormValues, registerFilter, setFilterValue }: Props) => {
    return (
        <form className="space-y-4">
            <div className="grid grid-cols-5 gap-2">
                <div>
                    <Input
                        formRegister={registerFilter("search")}
                        type="text"
                        id="search"
                        placeholder="Product / SKU"
                    />
                </div>
                <Select
                    name="Category"
                    formRegister={registerFilter("category")}
                    value={filterFormValues.category}
                    options={["Wine", "Beer", "Liquor & Spirits", "Cider", "Premixed & Ready-to-Drink", "Other"]}
                    resetValue={() => setFilterValue("category", "")}
                />
                <Select
                    name="Segment"
                    formRegister={registerFilter("segment")}
                    value={filterFormValues.segment}
                    options={["White", "Red", "Sparkling", "Port/Dessert"]}
                    resetValue={() => setFilterValue("segment", "")}
                />
                <Select
                    name="Brand"
                    formRegister={registerFilter("brand")}
                    value={filterFormValues.brand}
                    options={["High Garden", "Koyama Wines", "Lacourte-Godbillon"]}
                    resetValue={() => setFilterValue("brand", "")}
                />
            </div>
        </form>
    )
}