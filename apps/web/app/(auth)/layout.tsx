import type {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-8 h-full bg-white flex flex-col items-center">
      {children}
    </div>
  );
}
