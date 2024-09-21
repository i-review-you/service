import React, {ReactNode} from "react";
import Header from "../../styles/Header";

export default function ReviewsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <Header/>
      <main>
        {children}
      </main>
    </div>
  );
}
