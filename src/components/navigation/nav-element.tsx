import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavElement({
  section,
  active,
}: {
  section: { name: string; href: string; Icon: LucideIcon };
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={section.href}
        className={`flex items-center gap-3 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none ${active && "border-r-4 border-r-cyan-300 text-neutral-100"}`}
      >
        <section.Icon />
        {section.name}
      </Link>
    </li>
  );
}
