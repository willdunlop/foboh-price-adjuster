import React from 'react';

export const LoadingProfile = () => {
    return (
        <div className="flex items-center animate-pulse w-full h-[52px] max-w-[640px] mt-6">
            <div>
                <p className="h-4 w-56 bg-gray-400"></p>
                <div className="mt-2 flex gap-2 h-2 w-80 bg-gray-200 justify-between text-sm">
                </div>
            </div>
        </div>
    )
}