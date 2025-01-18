import React from 'react';
import { Box } from './common/Box';
import cn from 'classnames';

export const AssignCustomersCard = () => {
    return (
        <Box className="bg-white mt-6">
            <div className="flex flex-col-reverse justify-between w-full pb-6 border-b border-slate-200 sm:flex-row">
                <div>
                    <h2 className="text-black-black font-medium">Assign Customers to Pricing Profile</h2>
                    <p className="text-sm text-black-grey">Choose which customers this profile will be applied to</p>
                </div>
                <span className={cn(
                    "relative pl-0 mb-2 text-black black font-medium inline-flex items-center sm:pl-4 sm:mb-0",
                    "before:content-[''] before:w-2 before:h-2 before:bg-black black before:rounded-full before:mr-2"
                )}>Not Started</span>
            </div>
        </Box>

    )
}