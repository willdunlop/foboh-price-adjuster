import { Product } from '@prisma/client';
import React from 'react';

interface Props {
    product: Product;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, product: Product) => void;

}

export const ProductSearchResult = ({ product, checked, onChange }: Props) => {
    return (
        <label key={product.id} htmlFor={product.id} className="flex items-center w-full max-w-[640px] mb-4">
            <input
                id={product.id}
                type="checkbox"
                className="mr-4"
                checked={checked}
                onChange={(e) => onChange(e, product)}
            />
            <div>
                <p className="text-black-black">{product.title}</p>
                <div className="mt-2 flex gap-2 justify-between text-sm">
                    <p>{product.skuCode}</p>
                    <p>{product.subCategory}</p>
                    <p>{product.segment}</p>
                </div>
            </div>
        </label>
    )
}