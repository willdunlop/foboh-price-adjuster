import React from 'react';
import { Box } from './common/Box';
import cn from 'classnames';
import { LoadingProfile } from './common/LoadingProfile';
import { DisplayItem } from './common/DisplayItem';

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
                        <DisplayItem
                            heading="You've created a Price Profile"
                            title={title}
                            subHeading="Marked as Default, and expires in 16 Days"
                        />
                    )
            }

        </Box>

    )
}