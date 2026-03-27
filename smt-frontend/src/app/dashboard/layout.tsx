import type { Metadata } from 'next';
import "./dashboard.css";

export const metadata: Metadata = {
  title:"SMT Dashboard",
  description: "Created by Madhav",
}


export default function dashboardlayout({
  children,
}: Readonly<{
  children:  React.ReactNode;
}>) {
  return(
    <div className='min-h-full flex flex-col item'>
      {children}
    </div>
  );
}