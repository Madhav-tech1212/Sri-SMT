"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RightPanel from "../component/RightPanel";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";

const INVENTORY_MENU = [
  { key: "S", label: "Stock Items", href: "/dashboard/inventory/stock-items", desc: "Create & manage plywood stock items" },
  { key: "I", label: "Stock Inward", href: "/dashboard/inventory/inward", desc: "Goods received / production input" },
  { key: "O", label: "Stock Outward", href: "/dashboard/inventory/outward", desc: "Production output / dispatch" },
];

export default function InventoryPage() {
  const router = useRouter();

  const actions = useMemo(
    () => ({
      ...Object.fromEntries(INVENTORY_MENU.map((m) => [m.key, () => router.push(m.href)])),
      ESC: () => router.push("/dashboard"),
    }),
    [router]
  );

  useKeyboardShortcuts(actions);

  const buttons = [
    ...INVENTORY_MENU.map((m) => ({ shortcut: m.key, label: m.label, onClick: actions[m.key] })),
    { shortcut: "Esc", label: "Back", onClick: actions["ESC"] },
  ];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, padding: "24px 28px" }}>
        <div style={styles.pageTitle}>Inventory</div>
        <div style={styles.pageSubtitle}>Stock management for plywood manufacturing</div>

        <div style={styles.menuList}>
          {INVENTORY_MENU.map((item) => (
            <button
              key={item.key}
              onClick={() => router.push(item.href)}
              style={styles.menuItem}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#f59e0b";
                (e.currentTarget as HTMLButtonElement).style.background = "#fffbeb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#e2e8f0";
                (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              }}
            >
              <span style={styles.menuKey}>{item.key}</span>
              <span style={styles.menuLabel}>{item.label}</span>
              <span style={styles.menuDesc}>{item.desc}</span>
              <span style={styles.menuArrow}>›</span>
            </button>
          ))}
        </div>

        <div style={styles.hint}>
          Press key to navigate • <span style={{ color: "#f59e0b" }}>ESC</span> — Back to Dashboard
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
  menuList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "560px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    padding: "14px 16px",
    cursor: "pointer",
    textAlign: "left",
    transition: "border-color 0.15s, background 0.15s",
    fontFamily: "'Courier New', monospace",
    width: "100%",
  },
  menuKey: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#f59e0b",
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: "2px",
    padding: "1px 7px",
    minWidth: "22px",
    textAlign: "center",
    letterSpacing: "1px",
  },
  menuLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#1e293b",
    minWidth: "140px",
  },
  menuDesc: {
    fontSize: "11px",
    color: "#94a3b8",
    flex: 1,
  },
  menuArrow: {
    fontSize: "18px",
    color: "#cbd5e1",
  },
  hint: {
    marginTop: "32px",
    fontSize: "10px",
    color: "#cbd5e1",
    letterSpacing: "0.5px",
    fontFamily: "'Courier New', monospace",
  },
};
