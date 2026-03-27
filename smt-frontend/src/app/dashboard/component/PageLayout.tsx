type ButtonItem = {
  label: string;
  onClick?: () => void;
  link?: string;
};

export default function PageLayout({
  children,
  buttons = [],
}: {
  children: React.ReactNode;
  buttons?: ButtonItem[];
}) {
  return (
    <div className="flex w-full min-h-screen">
      
      {/* Left Content */}
      <div className="flex-1 p-6">
        {children}
      </div>

      {/* Right Buttons Column */}
      <div className="w-48 border-l p-4 flex flex-col gap-3">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={btn.onClick}
          >
            {btn.label}
          </button>
        ))}
      </div>

    </div>
  );
}