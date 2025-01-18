'use client';

import React, { useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { AppBar } from "@/components/AppBar";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="h-full flex">
      <Sidebar isOpen={isSidebarOpen} onOpen={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="relative ml-0 lg:ml-[260px] w-full h-full">
        <AppBar />
        <div className="mt-16 overflow-y-visible">
          {children}
        </div>
      </div>
    </div>
  );
}
