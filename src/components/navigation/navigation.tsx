"use client";

import { LayoutDashboard, Lightbulb, LogOut, Receipt } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import NavElement from "./nav-element";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const sections = [
  {
    name: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    name: "Cost",
    href: "/dashboard/cost",
    Icon: Receipt,
  },
  {
    name: "Appliances",
    href: "/dashboard/appliances",
    Icon: Lightbulb,
  },
];

export default function Navigation({
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="mt-10 flex flex-col items-stretch gap-3 text-neutral-100/70">
        {sections.map((section) => (
          <NavElement
            section={section}
            active={section.href == pathname}
            key={section.href}
            setOpen={setOpen}
          />
        ))}
        <li>
          <button
            className="flex w-full items-center gap-3 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-800 focus:outline-none md:focus:bg-indigo-800"
            onClick={() => {
              setOpen && setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
          >
            <LogOut />
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
