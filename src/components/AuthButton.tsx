"use client";

import { signIn, signOut } from "next-auth/react";

export default function SignOutButton({
  authOption,
}: {
  authOption: "sign-in" | "sign-out";
}) {
  return (
    <button
      onClick={() => (authOption == "sign-in" ? signIn() : signOut())}
      className="bg-slate-200 px-3 py-2 rounded text-slate-900 font-bold hover:bg-slate-300 transition ease-in-out duration-300 focus:outline-none focus:bg-slate-300 focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 focus:ring-offset-black active:bg-slate-400 capitalize"
    >
      {authOption.split("-").join(" ")}
    </button>
  );
}
