'use client';

import { Bars3Icon, ChartPieIcon, Cog6ToothIcon, CpuChipIcon, CubeIcon, ShoppingBagIcon, TagIcon, TruckIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { Logo } from "@/assets/Logo"
import { Button } from './common/Button';
import cn from 'classnames';
import { useScreenSize } from '@/hooks/useScreenSize';

interface Props {
    isOpen: boolean;
    onOpen: () => void;
}

export const Sidebar = ({ isOpen, onOpen }: Props) => {
    const { isMobile } = useScreenSize()

    return (
        <div className='h-full'>
            <div className="fixed h-full shadow-md bg-slate-50 z-10">
                <div className={
                    cn(
                        "flex flex-col h-full pt-28 text-black-grey shadow-md bg-slate-50 w-[260px] absolute lg:shadow-none lg:relative transition-all duration-300 ease-in-out z-10",
                        {
                            'translate-x-0': isOpen && isMobile,
                            'translate-x-[-260px]': !isOpen && isMobile
                        }
                    )}>

                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <ChartPieIcon className="h-6 w-6" />
                        <p>Dashboard</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <ShoppingBagIcon className="h-6 w-6" />
                        <p>Orders</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <UserCircleIcon className="h-6 w-6" />
                        <p>Customers</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <CubeIcon className="h-6 w-6" />
                        <p>Products</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 text-black-black font-semibold bg-slate-100">
                        <TagIcon className="h-6 w-6 text-green-primary" />
                        <p>Pricing</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <TruckIcon className="h-6 w-6" />
                        <p>Freight</p>
                    </Link>
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <CpuChipIcon className="h-6 w-6" />
                        <p>Integrations</p>
                    </Link>
                    <div className="border-t-2 border-t-slate-100 mx-8" />
                    <Link href="#" className="flex gap-3 justify-start px-8 py-3 hover:bg-slate-100">
                        <Cog6ToothIcon className="h-6 w-6" />
                        <p>Settings</p>
                    </Link>

                    <div className="mt-auto p-7">
                        <Logo />
                    </div>

                </div>
            </div >
            <Button
                variant="text"
                className={cn(
                    "fixed text-white py-4 top-3 rounded-full z-20 lg:hidden",
                    {
                        "fixed": isOpen
                    }
                )}
                onClick={onOpen}
            >
                {
                    !isOpen
                        ? <Bars3Icon className="h-6 w-6 text-white" />
                        : <XMarkIcon className="h-6 w-6 text-black-black" />
                        
                }
            </Button>
        </div>
    )
}