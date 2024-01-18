import React from "react";
import Navigation from "./navigation";
import MobileNav from "./mobile-nav";

export default function Sidebar() {
  return (
    <>
      <header className="sticky top-0 flex items-center justify-between bg-indigo-950 p-4 drop-shadow md:hidden">
        <h2 className="text-lg">Company Name</h2>
        <MobileNav />
      </header>
      <aside className="sticky left-0 top-0 hidden h-screen w-2/12 bg-indigo-950 md:block">
        <h2 className="mt-14 text-center text-xl">Company Name</h2>
        <Navigation />
      </aside>
    </>
  );
}
