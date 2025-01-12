import React from 'react';
import { Box } from './common/Box';

export const AssignCustomersCard = () => {
    return (
        <Box className="bg-white mt-6">
            <div className="flex justify-between w-full pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-black-black font-medium">Assign Customers to Pricing Profile</h2>
                    <p className="text-sm text-black-grey">Choose which customers this profile will be applied to</p>
                </div>
                <span className="relative pl-4 text-black black font-medium inline-flex items-center before:content-[''] before:w-2 before:h-2 before:bg-black black before:rounded-full before:mr-2">Not Started</span>
            </div>
        </Box>

    )
}