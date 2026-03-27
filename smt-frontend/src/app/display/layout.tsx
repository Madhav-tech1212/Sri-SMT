import type { Metadata } from 'next';
import "./display.css";

export const metadata: Metadata = {
  title:"SMT Display",
  description: "Created by Madhav",
}


export default function displaylayout({
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