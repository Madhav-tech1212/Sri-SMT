type ActionButtonProps = {
  label: string;
  shortcut?: string;
  onClick?: () => void;
};

export default function ActionButton({
  label,
  shortcut,
  onClick,
}: ActionButtonProps) {
  return (
    <div className="m-2.5">

    <button
      onClick={onClick}
      className="flex justify-between items-center w-55 
      border border-blue-300 
      bg-blue-50 
      hover:bg-blue-100
      px-3 py-2 text-left"
      >
      <span>
        <span className="text-blue-700 font-semibold">
          {shortcut}
        </span>
        <span className="text-blue-700 font-semibold">
        {" : "}
        </span>
        <span className="text-gray-800">{label}</span>
      </span>

      <span className="text-blue-400 font-bold">{">"}</span>
    </button>
    </div>
  );
}