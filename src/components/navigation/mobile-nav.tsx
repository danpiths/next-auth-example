"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Navigation from "./navigation";
import { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="w-[60%] border-0 bg-indigo-950 p-0 pt-10 text-slate-100 md:hidden"
      >
        <SheetHeader>
          <SheetTitle className="text-slate-100">Company Name</SheetTitle>
        </SheetHeader>
        <Navigation setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
}
