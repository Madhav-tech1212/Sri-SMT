"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import RightPanel from "./component/RightPanel";
import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import { SHORTCUT_KEYS } from "@/config/shortcuts";

export default function DashboardPage() {
  const router = useRouter();

  const actions = useMemo(
    () => ({
      [SHORTCUT_KEYS.DATE]: () => console.log("Date"),
      [SHORTCUT_KEYS.COMPANY]: () => console.log("Company"),
      [SHORTCUT_KEYS.INVENTORY]: () => router.push("/dashboard/inventory"),
      [SHORTCUT_KEYS.DISPLAY]: () => router.push("/display"),
    }),
    [router]
  );

  useKeyboardShortcuts(actions);

  const buttons = [
    { shortcut: "F2", label: "Date", onClick: actions[SHORTCUT_KEYS.DATE] },
    { shortcut: "F3", label: "Company", onClick: actions[SHORTCUT_KEYS.COMPANY] },
    { shortcut: "I", label: "Inventory", onClick: actions[SHORTCUT_KEYS.INVENTORY] },
    { shortcut: "D", label: "Display", onClick: actions[SHORTCUT_KEYS.DISPLAY] },
  ];

  return (
    <div className="flex">
      <div className="flex-1 p-6">
        Dashboard Page Content
      </div>

      <RightPanel buttons={buttons} />
    </div>
  );
}