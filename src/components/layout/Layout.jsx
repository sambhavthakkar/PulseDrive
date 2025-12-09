import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[var(--bg-app)] text-[var(--text-primary)] overflow-hidden font-body transition-colors">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-w-0 h-full relative">
                <Header onMenuClick={() => setIsSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6">
                    <div className="container-max mx-auto h-full flex flex-col">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
