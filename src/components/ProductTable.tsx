'use client';

import React from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@prisma/client'; // Ensure the Product type is available
import { Input } from './common/Input';
import { ProfileFormValues } from '@/app/page';
import { calculateNewPrice } from '@/utils';
import { FieldErrors } from 'react-hook-form';
import classNames from 'classnames';

interface ProductTableProps {
    data: Product[];
    profile: ProfileFormValues | null;
    adjustments: { productId: string; value: number | null }[];
    onAdjustmentChange: (productId: string, value: number | null) => void;
}




export const ProductTable: React.FC<ProductTableProps> = ({ data, profile, adjustments, onAdjustmentChange }) => {
    const productColumns: ColumnDef<Product>[] = [
        {
            accessorKey: 'title', // Key from the Product model
            header: 'Product Title',
            cell: ({ getValue }) => <span>{getValue<string>()}</span>, // Optional: Customize cell rendering
        },
        {
            accessorKey: 'skuCode',
            header: 'SKU Code',
        },
        {
            accessorKey: 'subCategory',
            header: 'Category',
        },
        {
            accessorKey: 'globalPrice',
            header: 'Based on Price',
            cell: ({ getValue }) => <span>${getValue<number>()}</span>, // Format price
        },
        {
            header: 'Adjustment',
            cell: ({ row }) => {
                const productId = row.original.id;
                const existingAdjustment = adjustments.find(
                    (adjustment) => adjustment.productId === productId
                );
                let modePrefix, typePrefix;
                if (profile?.adjustmentMode === "increase") modePrefix = "+"
                else if (profile?.adjustmentMode === "decrease") modePrefix = "-"

                if (profile?.adjustmentType === "fixed") typePrefix = "$"
                else if (profile?.adjustmentType === "dynamic") typePrefix = "%"

                return (
                    <div className="flex items-center">
                        <span>{modePrefix}</span>
                        <span>{typePrefix}</span>
                        <Input
                            type="number"
                            className="ml-2 max-w-[160px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            disabled={!(profile?.adjustmentMode && profile.adjustmentType)}
                            value={existingAdjustment?.value ?? ""}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : null
                                onAdjustmentChange(productId, value)
                            }}
                        />
                    </div>
                )
            }
        },
        {
            header: 'New Price',
            cell: ({ row }) => {
                const product = row.original;
                const adjustment = adjustments.find(
                    (adj) => adj.productId === product.id
                );

                if (!profile || !adjustment || !profile.adjustmentType) return;

                const newPrice = calculateNewPrice({
                    globalPrice: product.globalPrice,
                    adjustmentType: profile.adjustmentType,
                    adjustmentValue: adjustment?.value,
                    isIncrement: profile?.adjustmentMode === "increase"
                })
                const isNegative = newPrice?.isNegative()
                if (newPrice) return (
                    <div className="flex flex-col items-center w-[120px]">
                    <span className={classNames("", {
                        "text-red-500": isNegative,
                    })}>$ {newPrice.toFixed(2)}</span>
                    <p className="h-3 text-red-500">{isNegative && "Negative value"}</p>
                    </div>
                )
            }
        }
    ];


    const table = useReactTable({
        data,
        columns: productColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto mt-16">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                                >
                                    {typeof header.column.columnDef.header === 'function'
                                        ? header.column.columnDef.header(header.getContext())
                                        : header.column.columnDef.header ?? null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-4 text-sm text-gray-500">
                                    {typeof cell.column.columnDef.cell === 'function'
                                        ? cell.column.columnDef.cell(cell.getContext())
                                        : cell.getValue()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};