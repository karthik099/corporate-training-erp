import React, { useState } from "react";

// AdminDashboard.jsx
// Single-file React component using Tailwind CSS classes.
// Default export a React component. Drop this file into a CRA / Vite / Next.js + Tailwind project.

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());

  const stats = [
    { id: 1, title: "Users", value: 1242 },
    { id: 2, title: "Active", value: 842 },
    { id: 3, title: "Revenue", value: "$12.4k" },
    { id: 4, title: "Errors", value: 3 },
  ];

  const rows = [
    { id: 1, name: "Alice Johnson", role: "Admin", email: "alice@example.com", status: "Active" },
    { id: 2, name: "Bob Smith", role: "Moderator", email: "bob@example.com", status: "Inactive" },
    { id: 3, name: "Clara Green", role: "Member", email: "clara@example.com", status: "Active" },
    { id: 4, name: "David Lee", role: "Member", email: "david@example.com", status: "Pending" },
  ];

  function toggleRow(id) {
    const s = new Set(selectedRows);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelectedRows(s);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        {/* Sidebar */}
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

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">Dashboard</h2>
              <div className="text-sm text-slate-500">Overview of key metrics</div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search users, reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white shadow-sm focus:outline-none"
              />

              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700">Create</button>
            </div>
          </div>

          {/* Stats cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="text-sm text-slate-500">{s.title}</div>
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">Compared to last week</div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Table */}
            <div className="lg:col-span-2 bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Users</h3>
                <div className="text-sm text-slate-500">{rows.length} total</div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-600">
                      <th className="p-2"><input type="checkbox" aria-label="select all" /></th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Role</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.filter(r => (
                      r.name.toLowerCase().includes(query.toLowerCase()) ||
                      r.email.toLowerCase().includes(query.toLowerCase())
                    )).map((r) => (
                      <tr key={r.id} className="border-t hover:bg-slate-50">
                        <td className="p-2"><input checked={selectedRows.has(r.id)} onChange={() => toggleRow(r.id)} type="checkbox" /></td>
                        <td className="p-2 font-medium">{r.name}</td>
                        <td className="p-2">{r.role}</td>
                        <td className="p-2 text-slate-600">{r.email}</td>
                        <td className="p-2">
                          <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${r.status === 'Active' ? 'bg-green-100 text-green-800' : r.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-600'}`}>{r.status}</span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button className="px-2 py-1 border rounded text-sm">Edit</button>
                            <button className="px-2 py-1 border rounded text-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                <div>{selectedRows.size} selected</div>
                <div>Page 1 of 1</div>
              </div>
            </div>

            {/* Right column: Activity + Quick actions */}
            <aside className="bg-white p-4 rounded-lg border shadow-sm">
              <h4 className="font-medium mb-2">Recent activity</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Clara signed up • 2 hours ago</li>
                <li>Bob changed role • 1 day ago</li>
                <li>Backup completed • 3 days ago</li>
              </ul>

              <div className="mt-4">
                <h5 className="font-medium mb-2">Quick actions</h5>
                <div className="flex flex-col gap-2">
                  <button className="w-full px-3 py-2 border rounded">Invite user</button>
                  <button className="w-full px-3 py-2 border rounded">Export</button>
                </div>
              </div>
            </aside>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} Your Company — Built with Tailwind & React</footer>
        </main>
      </div>
    </div>
  );
}
