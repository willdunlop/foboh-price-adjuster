import React from 'react';
import { Box } from './common/Box';
import cn from 'classnames';
import { LoadingProfile } from './common/LoadingProfile';

interface Props {
    title?: string;
    isLoading?: boolean;
}
export const ProfileCard = ({ title, isLoading = false }: Props) => {
    return (
        <Box className="bg-white mt-6">
            <div className="flex flex-col-reverse justify-between w-full pb-6 border-b border-slate-200 sm:flex-row">
                <div>
                    <h2 className="text-black-black font-medium">Basic Pricing Profile</h2>
                    <p className="text-sm text-black-grey">Cheeky little description goes in here</p>
                </div>
                <span className={cn(
                    "relative pl-0 mb-2 text-green-action font-medium inline-flex items-center sm:pl-4 sm:mb-0",
                    "before:content-[''] before:w-2 before:h-2 before:bg-green-action before:rounded-full before:mr-2"
                )}>Completed</span>
            </div>
            {
                isLoading
                    ? <LoadingProfile />
                    : (

                        <div className="mt-6 flex justify-between">
                            <div>
                                <p className="text-xs">You&apos;ve created a Price Profile</p>
                                <h3 className="text-sm text-black-black font-medium">{title}</h3>
                                <p className="text-xs">Marked as Default, and expires in 16 Days</p>
                            </div>
                        </div>
                    )
            }

        </Box>

    )
}