"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", shortcut: "H" },
  { label: "Inventory", href: "/dashboard/inventory", shortcut: "I" },
  { label: "Ledger", href: "/dashboard/ledger", shortcut: "L" },
  { label: "Sales", href: "/dashboard/sales", shortcut: "S" },
  { label: "Purchase", href: "/dashboard/purchase", shortcut: "P" },
  { label: "Reports", href: "/dashboard/reports", shortcut: "R" },
  { label: "Display", href: "/display", shortcut: "D" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="erp-shell">
      {/* Sidebar */}
      <aside className="erp-sidebar">
        <div className="erp-logo">
          <div className="erp-logo-mark">SMT</div>
          <div className="erp-logo-sub">ERP System</div>
        </div>

        <nav className="erp-nav">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`erp-nav-item ${isActive ? "active" : ""}`}
              >
                <span className="erp-nav-shortcut">{item.shortcut}</span>
                <span className="erp-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="erp-sidebar-footer">
          <div className="erp-company">Sri SMT</div>
          <div className="erp-version">v1.0.0</div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="erp-main">
        {/* Header */}
        <header className="erp-header">
          <div className="erp-header-left">
            <span className="erp-breadcrumb">
              {NAV_ITEMS.find(
                (n) =>
                  n.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(n.href)
              )?.label ?? "Dashboard"}
            </span>
          </div>
          <div className="erp-header-right">
            <span className="erp-date">{today}</span>
            <span className="erp-user">Admin</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="erp-content">{children}</main>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .erp-shell {
          display: flex;
          height: 100vh;
          font-family: 'Courier New', Courier, monospace;
          background: #0f1117;
          color: #e2e8f0;
          overflow: hidden;
        }

        /* SIDEBAR */
        .erp-sidebar {
          width: 200px;
          min-width: 200px;
          background: #0f1117;
          border-right: 1px solid #1e2533;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .erp-logo {
          padding: 20px 16px 18px;
          border-bottom: 1px solid #1e2533;
        }

        .erp-logo-mark {
          font-size: 22px;
          font-weight: 900;
          color: #f59e0b;
          letter-spacing: 3px;
        }

        .erp-logo-sub {
          font-size: 9px;
          color: #4a5568;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .erp-nav {
          flex: 1;
          padding: 8px 0;
          overflow-y: auto;
        }

        .erp-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 16px;
          text-decoration: none;
          color: #718096;
          font-size: 12px;
          letter-spacing: 0.5px;
          border-left: 3px solid transparent;
          transition: all 0.1s;
        }

        .erp-nav-item:hover {
          color: #e2e8f0;
          background: #1a1f2e;
          border-left-color: #374151;
        }

        .erp-nav-item.active {
          color: #f59e0b;
          background: #1a1a0f;
          border-left-color: #f59e0b;
        }

        .erp-nav-shortcut {
          font-size: 10px;
          font-weight: 700;
          background: #1e2533;
          color: #4a5568;
          padding: 1px 5px;
          border-radius: 2px;
          min-width: 18px;
          text-align: center;
        }

        .erp-nav-item.active .erp-nav-shortcut {
          background: #2d2a00;
          color: #f59e0b;
        }

        .erp-nav-label {
          font-size: 12px;
        }

        .erp-sidebar-footer {
          padding: 12px 16px;
          border-top: 1px solid #1e2533;
        }

        .erp-company {
          font-size: 9px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.5;
        }

        .erp-version {
          font-size: 9px;
          color: #2d3748;
          margin-top: 2px;
        }

        /* MAIN */
        .erp-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #f8fafc;
        }

        /* HEADER */
        .erp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #1e293b;
          padding: 0 20px;
          height: 38px;
          min-height: 38px;
          border-bottom: 1px solid #334155;
        }

        .erp-header-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .erp-breadcrumb {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .erp-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .erp-date {
          font-size: 11px;
          color: #f59e0b;
          letter-spacing: 0.5px;
        }

        .erp-user {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* CONTENT */
        .erp-content {
          flex: 1;
          overflow-y: auto;
          background: #f1f5f9;
        }
      `}</style>
    </div>
  );
}
