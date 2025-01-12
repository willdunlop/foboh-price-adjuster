import React from 'react';
import { Box } from './common/Box';

interface Props {
    title: string;
}
export const ProfileCard = ({ title }: Props) => {
    return (
        <Box className="bg-white mt-6">
            <div className="flex justify-between w-full pb-6 border-b border-slate-200">
                <div>
                    <h2 className="text-black-black font-medium">Basic Pricing Profile</h2>
                    {/** @TODO MAKE ME A PROPER DESCRIPTION */}
                    <p className="text-sm text-black-grey">Cheeky little description goes in here</p>
                </div>
                <span className="relative pl-4 text-green-action font-medium inline-flex items-center before:content-[''] before:w-2 before:h-2 before:bg-green-action before:rounded-full before:mr-2">Completed</span>
            </div>
            <div className="mt-6 flex justify-between">
                <div>
                    <p className="text-xs">You&apos;ve created a Price Profile</p>
                    <h3 className="text-sm text-black-black font-medium">{title}</h3>
                    <p className="text-xs">Marked as Default, and expires in 16 Days</p>
                </div>
            </div>
        </Box>

    )
}