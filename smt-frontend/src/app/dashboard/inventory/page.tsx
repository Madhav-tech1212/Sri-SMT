"use client";
import RightPanel from "../component/RightPanel";
import useKeyboardShortcuts from "../hooks/useKeyboardShortcuts";
import { useRouter } from "next/navigation";
import { SHORTCUT_KEYS } from "@/config/shortcuts";


export default function InventoryPage() {

  const router = useRouter();

  const actions = {
    [SHORTCUT_KEYS.DATE]: () => console.log("Date"),
    
    F2: () => alert("Date clicked"),
    F3: () => alert("Company clicked"),
    I: () => alert("Item clicked"),
    F5: () => alert("Sales clicked"),
    ESC: () => router.back(),
  };

  useKeyboardShortcuts(actions);

  const buttons = [
    { shortcut: "F2", label: "Date", onClick: actions[SHORTCUT_KEYS.DATE] },
    { shortcut: "F3", label: "Company", onClick: actions.F3 },
    { shortcut: "I", label: "Item", onClick: actions.I },
    { shortcut: "F5", label: "Sales", onClick: actions.F5 },
    { shortcut: "Esc", label: "Back", onClick: actions.ESC },

  ];

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        Inventory Page Content
      </div>

      <RightPanel buttons={buttons} />
    </div>
  );
}