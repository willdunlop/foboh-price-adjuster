'use client';

import React from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Product } from '@prisma/client'; // Ensure the Product type is available
import { Input } from './common/Input';

interface ProductTableProps {
  data: Product[];
  adjustments: string;
  onAdjustmentChange: () => void;
}




export const ProductTable: React.FC<ProductTableProps> = ({ data }) => {
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
      //   {
      //     accessorKey: 'segment',
      //     header: 'Segment',
      //   },
      //   {
      //     accessorKey: 'brand',
      //     header: 'Brand',
      //   },
        {
          accessorKey: 'globalPrice',
          header: 'Based on Price',
          cell: ({ getValue }) => <span>${getValue<number>()}</span>, // Format price
        },
        {
          header: 'Adjustment',
          cell: () => (<Input />)
        },
        {
          header: 'New Price'
        }
      ];

      
    const table = useReactTable({
      data,
      columns: productColumns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <div className="overflow-x-auto">
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