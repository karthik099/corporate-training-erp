import React, { useState } from 'react'

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        // Sidebar
        <aside className={`bg-white border-r transition-all duration-200 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
            <div className="h-screen flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">TM</div>
                        {sidebarOpen && <h1 className="text-lg font-semibold">Training ERP</h1>}
                    </div>
                    <button
                        className="p-1 rounded hover:bg-slate-100"
                        onClick={() => setSidebarOpen(v => !v)}
                        aria-label="Toggle sidebar"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 p-3 overflow-auto">
                    <ul className="space-y-1">
                        {[
                            { key: 'dashboard', label: 'Dashboard' },
                            { key: 'users', label: 'Users' },
                            { key: 'reports', label: 'Reports' },
                            { key: 'settings', label: 'Settings' },
                        ].map((item) => (
                            <li key={item.key}>
                                <a className="group flex items-center gap-3 p-2 rounded hover:bg-slate-100" href="#">
                                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-3 border-t">
                    {sidebarOpen && (
                        <div className="text-sm text-slate-600">Signed in as <strong>Karthik</strong></div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar