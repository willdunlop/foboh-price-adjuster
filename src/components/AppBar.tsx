import { BellIcon, QuestionMarkCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import React from 'react';

export const AppBar = () => {
    
    return (
        <div className="fixed w-full lg:w-[calc(100%-260px)] flex justify-end shadow-md sm:justify-between bg-green-primary text-white px-4 py-5">
            <div className="hidden sm:block sm:ml-11 lg:ml-0">
                <p className="font-semibold">Hello, FOBOH</p>
                <p>{dayjs().format('ddd, DD MMMM YYYY ')}</p>
            </div>
            <div className="flex gap-6">
                {/** Icon tray */}
                <div className="flex gap-4 items-center">
                    <button className="p-2 rounded-full bg-white">
                        <BellIcon className="h-5 w-5 text-black-black" />
                    </button>
                    <button className="p-2 rounded-full bg-white">
                        <QuestionMarkCircleIcon className="h-5 w-5 text-black-black" />
                    </button>
                </div>
                {/** User menu */}
                <div className="flex gap-2 items-center">
                    <div className="hidden sm:block">
                        <p className="font-semibold">FOBOH Team</p>
                        <p>Cork & Barrel Cellar</p>
                    </div>
                    <div className="rounded-full bg-white">
                        <UserCircleIcon className="h-10 w-10 text-black-black" />
                    </div>
                </div>
            </div>
        </div>
    )
}