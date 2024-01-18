import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

export default function NavElement({
  section,
  active,
  setOpen,
}: {
  section: { name: string; href: string; Icon: LucideIcon };
  active: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <li>
      <Link
        href={section.href}
        className={`flex items-center gap-3 px-4 py-3 transition duration-300 ease-in-out hover:bg-indigo-800 focus:bg-indigo-800 focus:outline-none ${active && "border-l-4 border-x-cyan-300 text-neutral-100 md:border-l-0 md:border-r-4"}`}
        onClick={() => setOpen && setOpen(false)}
      >
        <section.Icon />
        {section.name}
      </Link>
    </li>
  );
}
