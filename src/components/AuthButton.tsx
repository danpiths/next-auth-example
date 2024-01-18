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
      className="rounded bg-neutral-800 px-3 py-2 font-bold capitalize text-neutral-100 transition duration-300 ease-in-out hover:bg-neutral-900 focus:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-100 active:bg-neutral-950"
    >
      {authOption.split("-").join(" ")}
    </button>
  );
}
