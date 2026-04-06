"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RightPanel from "./component/RightPanel";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";

const MODULES = [
  { key: "I", label: "Inventory", href: "/dashboard/inventory", desc: "Stock items, inward & outward" },
  { key: "L", label: "Ledger", href: "/dashboard/ledger", desc: "Accounts & ledger entries" },
  { key: "S", label: "Sales", href: "/dashboard/sales", desc: "Sales orders & invoices" },
  { key: "P", label: "Purchase", href: "/dashboard/purchase", desc: "Purchase orders & bills" },
  { key: "R", label: "Reports", href: "/dashboard/reports", desc: "Stock, sales & profit reports" },
  { key: "D", label: "Display", href: "/display", desc: "Live display & reports" },
];

export default function DashboardPage() {
  const router = useRouter();

  const actions = useMemo(
    () =>
      Object.fromEntries(
        MODULES.map((m) => [m.key, () => router.push(m.href)])
      ),
    [router]
  );

  useKeyboardShortcuts(actions);

  const buttons = MODULES.map((m) => ({
    shortcut: m.key,
    label: m.label,
    onClick: actions[m.key],
  }));

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Content */}
      <div style={{ flex: 1, padding: "24px 28px" }}>
        <div style={styles.pageTitle}>Gateway of SMT</div>
        <div style={styles.pageSubtitle}>Sri SM Timbers & Traders — ERP System</div>

        <div style={styles.grid}>
          {MODULES.map((mod) => (
            <button
              key={mod.key}
              onClick={() => router.push(mod.href)}
              style={styles.card}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#f59e0b";
                (e.currentTarget as HTMLButtonElement).style.background = "#fffbeb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              <div style={styles.cardKey}>{mod.key}</div>
              <div style={styles.cardLabel}>{mod.label}</div>
              <div style={styles.cardDesc}>{mod.desc}</div>
            </button>
          ))}
        </div>

        <div style={styles.hint}>
          Press the highlighted key to navigate • <span style={{ color: "#f59e0b" }}>ESC</span> to go back
        </div>
      </div>

      <RightPanel buttons={buttons} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pageTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#1e293b",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  pageSubtitle: {
    fontSize: "11px",
    color: "#94a3b8",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "28px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    maxWidth: "680px",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 0.15s, background 0.15s",
    fontFamily: "'Courier New', monospace",
  },
  cardKey: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#f59e0b",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "2px",
    padding: "1px 6px",
    display: "inline-block",
    marginBottom: "8px",
    letterSpacing: "1px",
  },
  cardLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "4px",
  },
  cardDesc: {
    fontSize: "10px",
    color: "#94a3b8",
    lineHeight: 1.4,
  },
  hint: {
    marginTop: "32px",
    fontSize: "10px",
    color: "#cbd5e1",
    letterSpacing: "0.5px",
    fontFamily: "'Courier New', monospace",
  },
};
