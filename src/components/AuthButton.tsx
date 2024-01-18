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
      className="rounded bg-slate-200 px-3 py-2 font-bold capitalize text-slate-900 transition duration-300 ease-in-out hover:bg-slate-300 focus:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-black active:bg-slate-400"
    >
      {authOption.split("-").join(" ")}
    </button>
  );
}
