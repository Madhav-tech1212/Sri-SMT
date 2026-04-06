"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import RightPanel from "../../component/RightPanel";
import useKeyboardShortcuts from "../../hooks/useKeyboardShortcuts";

// ─── Types ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Commercial Plywood", code: "CP" },
  { label: "Waterproof Plywood", code: "WP" },
  { label: "Marine Plywood", code: "MP" },
  { label: "Particle Board", code: "PB" },
  { label: "Blockboard", code: "BB" },
  { label: "Veneer", code: "VN" },
  { label: "MDF", code: "MDF" },
  { label: "Laminate", code: "LAM" },
];

const THICKNESSES = [3, 4, 6, 8, 9, 12, 16, 18, 25];

interface StockItem {
  id: string;
  partNumber: string;
  itemName: string;
  category: string;
  categoryCode: string;
  length: number;
  width: number;
  thickness: number;
  sqftPerSheet: number;
  openingStock: number;
  ratePerSqft: number;
  totalSqft: number;
  totalValue: number;
  openingStockDate: string;
}

interface FormData {
  category: string;
  length: number | "";
  width: number | "";
  thickness: number | "";
  openingStock: number | "";
  ratePerSqft: number | "";
  openingStockDate: string;
}

const EMPTY_FORM: FormData = {
  category: "",
  length: 8,
  width: 4,
  thickness: 12,
  openingStock: "",
  ratePerSqft: "",
  openingStockDate: new Date().toISOString().split("T")[0],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildItemName(category: string, length: number | "", width: number | "", thickness: number | ""): string {
  if (!category || !length || !width || !thickness) return "";
  const cat = CATEGORIES.find((c) => c.label === category);
  if (!cat) return "";
  return `${length} X ${width} - ${thickness} MM ${cat.label.toUpperCase()} SHEET - ${cat.code}`;
}

function buildPartNumber(code: string, length: number | "", width: number | "", thickness: number | ""): string {
  if (!code || !length || !width || !thickness) return "";
  return `${code}${length}${width}${thickness}`;
}

// ─── Mock data (replace with Supabase fetch) ──────────────────────────────────

const MOCK_ITEMS: StockItem[] = [
  {
    id: "1",
    partNumber: "CP8412",
    itemName: "8 X 4 - 12 MM COMMERCIAL PLYWOOD SHEET - CP",
    category: "Commercial Plywood",
    categoryCode: "CP",
    length: 8,
    width: 4,
    thickness: 12,
    sqftPerSheet: 32,
    openingStock: 10,
    ratePerSqft: 80,
    totalSqft: 320,
    totalValue: 25600,
    openingStockDate: "2026-03-26",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StockItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<StockItem[]>(MOCK_ITEMS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  // Derived values
  const selectedCat = CATEGORIES.find((c) => c.label === form.category);
  const sqftPerSheet =
    form.length && form.width ? Number(form.length) * Number(form.width) : 0;
  const totalSqft = sqftPerSheet * (Number(form.openingStock) || 0);
  const totalValue = totalSqft * (Number(form.ratePerSqft) || 0);
  const itemName = buildItemName(form.category, form.length, form.width, form.thickness);
  const partNumber = buildPartNumber(selectedCat?.code ?? "", form.length, form.width, form.thickness);

  useEffect(() => {
    if (showForm) firstFieldRef.current?.focus();
  }, [showForm]);

  const actions = {
    N: () => { setShowForm(true); setForm(EMPTY_FORM); setError(""); },
    ESC: () => {
      if (showForm) { setShowForm(false); setError(""); }
      else router.push("/dashboard/inventory");
    },
  };

  useKeyboardShortcuts(actions);

  const buttons = showForm
    ? [
        { shortcut: "Enter", label: "Save", onClick: handleSave },
        { shortcut: "Esc", label: "Cancel", onClick: () => setShowForm(false) },
      ]
    : [
        { shortcut: "N", label: "New Item", onClick: actions["N"] },
        { shortcut: "Esc", label: "Back", onClick: actions["ESC"] },
      ];

  async function handleSave() {
    setError("");
    if (!form.category || !form.length || !form.width || !form.thickness) {
      setError("Category, Length, Width and Thickness are required.");
      return;
    }
    if (!form.openingStock || !form.ratePerSqft) {
      setError("Opening Stock and Rate are required.");
      return;
    }

    setSaving(true);
    try {
      // TODO: Replace with Supabase insert
      // const { data, error } = await supabase.from('stock_items').insert({ ... });

      const newItem: StockItem = {
        id: Date.now().toString(),
        partNumber,
        itemName,
        category: form.category,
        categoryCode: selectedCat?.code ?? "",
        length: Number(form.length),
        width: Number(form.width),
        thickness: Number(form.thickness),
        sqftPerSheet,
        openingStock: Number(form.openingStock),
        ratePerSqft: Number(form.ratePerSqft),
        totalSqft,
        totalValue,
        openingStockDate: form.openingStockDate,
      };

      setItems((prev) => [newItem, ...prev]);
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function updateForm(key: keyof FormData, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={styles.topBar}>
          <div>
            <span style={styles.pageTitle}>Stock Items</span>
            <span style={styles.count}>{items.length} items</span>
          </div>
          {!showForm && (
            <button style={styles.newBtn} onClick={actions["N"]}>
              <span style={styles.newBtnKey}>N</span> New Item
            </button>
          )}
        </div>

        {/* Inline Create Form */}
        {showForm && (
          <div style={styles.formWrap}>
            <div style={styles.formTitle}>New Stock Item</div>

            {error && <div style={styles.errorBox}>{error}</div>}

            {/* Auto-generated fields */}
            {(itemName || partNumber) && (
              <div style={styles.autoRow}>
                {partNumber && <span style={styles.autoTag}># {partNumber}</span>}
                {itemName && <span style={styles.autoName}>{itemName}</span>}
              </div>
            )}

            <div style={styles.formGrid}>
              {/* Category */}
              <div style={styles.field}>
                <label style={styles.label}>Category *</label>
                <select
                  ref={firstFieldRef}
                  style={styles.select}
                  value={form.category}
                  onChange={(e) => updateForm("category", e.target.value)}
                >
                  <option value="">— Select —</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.code} value={c.label}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Length */}
              <div style={styles.field}>
                <label style={styles.label}>Length (ft) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={form.length}
                  onChange={(e) => updateForm("length", e.target.value)}
                  placeholder="8"
                />
              </div>

              {/* Width */}
              <div style={styles.field}>
                <label style={styles.label}>Width (ft) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={form.width}
                  onChange={(e) => updateForm("width", e.target.value)}
                  placeholder="4"
                />
              </div>

              {/* Thickness */}
              <div style={styles.field}>
                <label style={styles.label}>Thickness (mm) *</label>
                <select
                  style={styles.select}
                  value={form.thickness}
                  onChange={(e) => updateForm("thickness", Number(e.target.value))}
                >
                  {THICKNESSES.map((t) => (
                    <option key={t} value={t}>{t} mm</option>
                  ))}
                </select>
              </div>

              {/* Opening Stock */}
              <div style={styles.field}>
                <label style={styles.label}>Opening Stock (sheets) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={form.openingStock}
                  onChange={(e) => updateForm("openingStock", e.target.value)}
                  placeholder="0"
                />
              </div>

              {/* Rate */}
              <div style={styles.field}>
                <label style={styles.label}>Rate per Sqft (₹) *</label>
                <input
                  type="number"
                  style={styles.input}
                  value={form.ratePerSqft}
                  onChange={(e) => updateForm("ratePerSqft", e.target.value)}
                  placeholder="80"
                />
              </div>

              {/* Opening Stock Date */}
              <div style={styles.field}>
                <label style={styles.label}>Opening Stock Date</label>
                <input
                  type="date"
                  style={styles.input}
                  value={form.openingStockDate}
                  onChange={(e) => updateForm("openingStockDate", e.target.value)}
                />
              </div>
            </div>

            {/* Calculated summary */}
            {sqftPerSheet > 0 && (
              <div style={styles.summaryRow}>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Sqft/Sheet</span>
                  <span style={styles.summaryVal}>{sqftPerSheet}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Total Sqft</span>
                  <span style={styles.summaryVal}>{totalSqft.toLocaleString()}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Total Value</span>
                  <span style={{ ...styles.summaryVal, color: "#16a34a" }}>
                    ₹{totalValue.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div style={styles.formActions}>
              <button
                style={{ ...styles.saveBtn, opacity: saving ? 0.7 : 1 }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Item"}
              </button>
              <button style={styles.cancelBtn} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Stock Items Table */}
        <div style={styles.tableWrap}>
          {items.length === 0 ? (
            <div style={styles.empty}>No stock items yet. Press <strong>N</strong> to create one.</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Part No.", "Item Name", "Category", "Size", "Thickness", "Stock", "Rate/Sqft", "Total Value"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{ background: i % 2 === 0 ? "#ffffff" : "#f8fafc" }}
                  >
                    <td style={styles.td}>
                      <span style={styles.partNo}>{item.partNumber}</span>
                    </td>
                    <td style={{ ...styles.td, maxWidth: "220px", fontSize: "11px" }}>{item.itemName}</td>
                    <td style={styles.td}>{item.category}</td>
                    <td style={styles.td}>{item.length} × {item.width} ft</td>
                    <td style={styles.td}>{item.thickness} mm</td>
                    <td style={styles.td}>{item.openingStock} sheets</td>
                    <td style={styles.td}>₹{item.ratePerSqft}</td>
                    <td style={{ ...styles.td, color: "#16a34a", fontWeight: 600 }}>
                      ₹{item.totalValue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <RightPanel buttons={buttons} />
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 24px",
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
  },
  pageTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#1e293b",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.5px",
    marginRight: "10px",
  },
  count: {
    fontSize: "11px",
    color: "#94a3b8",
    background: "#f1f5f9",
    padding: "2px 8px",
    borderRadius: "10px",
  },
  newBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#1e293b",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    padding: "7px 14px",
    fontSize: "11px",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  newBtnKey: {
    background: "#f59e0b",
    color: "#000",
    borderRadius: "2px",
    padding: "0 4px",
    fontWeight: 700,
    fontSize: "10px",
  },
  formWrap: {
    background: "#fffbeb",
    borderBottom: "1px solid #fde68a",
    padding: "20px 24px",
  },
  formTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1e293b",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "1px",
    marginBottom: "12px",
  },
  errorBox: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#b91c1c",
    borderRadius: "3px",
    padding: "8px 12px",
    fontSize: "11px",
    marginBottom: "12px",
  },
  autoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "14px",
    padding: "8px 12px",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "3px",
  },
  autoTag: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#16a34a",
    fontFamily: "'Courier New', monospace",
    background: "#dcfce7",
    padding: "2px 8px",
    borderRadius: "2px",
    whiteSpace: "nowrap",
  },
  autoName: {
    fontSize: "11px",
    color: "#15803d",
    fontFamily: "'Courier New', monospace",
    fontWeight: 600,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginBottom: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "10px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: 600,
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: "3px",
    padding: "7px 10px",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    background: "#ffffff",
    color: "#1e293b",
    outline: "none",
  },
  select: {
    border: "1px solid #d1d5db",
    borderRadius: "3px",
    padding: "7px 10px",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    background: "#ffffff",
    color: "#1e293b",
    outline: "none",
    cursor: "pointer",
  },
  summaryRow: {
    display: "flex",
    gap: "24px",
    padding: "10px 14px",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "3px",
    marginBottom: "14px",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  summaryLabel: {
    fontSize: "9px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  summaryVal: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#1e293b",
    fontFamily: "'Courier New', monospace",
  },
  formActions: {
    display: "flex",
    gap: "10px",
  },
  saveBtn: {
    background: "#1e293b",
    color: "#ffffff",
    border: "none",
    borderRadius: "3px",
    padding: "8px 20px",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  cancelBtn: {
    background: "transparent",
    color: "#64748b",
    border: "1px solid #d1d5db",
    borderRadius: "3px",
    padding: "8px 16px",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
    cursor: "pointer",
  },
  tableWrap: {
    flex: 1,
    overflow: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
    fontFamily: "'Courier New', monospace",
  },
  th: {
    padding: "10px 14px",
    background: "#1e293b",
    color: "#94a3b8",
    fontWeight: 600,
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    textAlign: "left",
    whiteSpace: "nowrap",
    position: "sticky" as const,
    top: 0,
    zIndex: 1,
  },
  td: {
    padding: "10px 14px",
    color: "#374151",
    borderBottom: "1px solid #f1f5f9",
    whiteSpace: "nowrap",
  },
  partNo: {
    fontWeight: 700,
    color: "#f59e0b",
    background: "#fffbeb",
    padding: "1px 6px",
    borderRadius: "2px",
    fontSize: "11px",
  },
  empty: {
    padding: "48px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "13px",
    fontFamily: "'Courier New', monospace",
  },
};
