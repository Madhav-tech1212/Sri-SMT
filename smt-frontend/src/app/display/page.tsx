"use client";

import { useRouter } from "next/navigation";
import useKeyboardShortcuts from "../dashboard/hooks/useKeyboardShortcuts";
import RightPanel from "../dashboard/component/RightPanel";
import { SHORTCUT_KEYS } from "@/config/shortcuts";

export default function DisplayPage() {
  
const router = useRouter();

  const actions = {
    [SHORTCUT_KEYS.BACK]: () => router.back(),

  };

  useKeyboardShortcuts(actions);

  const buttons = [

    { shortcut: "Esc", label: "Back", onClick: actions[SHORTCUT_KEYS.BACK] },

  ];


  return (
    <div className="flex">
      <div className="flex-1 p-6">
        Display Page Content
      </div>
      <RightPanel buttons={buttons} />
    </div>
  );
}