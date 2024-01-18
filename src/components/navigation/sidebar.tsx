import React from "react";
import Navigation from "./navigation";

export default function Sidebar() {
  return (
    <aside className="sticky left-0 top-0 h-screen w-2/12 bg-indigo-950">
      <h2 className="mt-14 text-center text-xl">Company Name</h2>
      <Navigation />
    </aside>
  );
}
