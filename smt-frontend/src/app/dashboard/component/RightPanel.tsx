import ActionButton from "./ActionButton";

type ButtonItem = {
  label: string;
  shortcut: string;
  onClick?: () => void;
};

export default function RightPanel({ buttons }: { buttons: ButtonItem[] }) {
  return (
    <div className="w-60 border-l min-h-screen bg-white">
      {buttons.map((btn, i) => (
        <ActionButton
          key={i}
          label={btn.label}
          shortcut={btn.shortcut}
          onClick={btn.onClick}
        />
      ))}
    </div>
  );
}