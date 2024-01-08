"use client";

import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import z from "zod";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const userIdRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!userId || !password) {
        setErr("Please enter user id and password");
        return;
      }
      if (!z.string().safeParse(userId).success) {
        setErr("Please enter valid user id");
        return;
      }
      if (!z.string().safeParse(password).success) {
        setErr("Please enter valid password");
        return;
      }
      setPending(true);
      const res = await signIn("credentials", {
        redirect: false,
        userId,
        password,
      });
      if (res?.error) {
        setErr("Invalid credentials");
        setPending(false);
        return;
      }
      setPending(false);
      router.push("/");
    } catch (error) {
      setPending(false);
      console.log(error);
      setErr("Something went wrong. Please try again in a while.");
    }
  }

  useEffect(() => {
    if (userIdRef.current) {
      userIdRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (err && userIdRef.current) {
      userIdRef.current.focus();
      userIdRef.current.select();
    }
  }, [err]);

  return (
    <div className="flex-1 flex justify-center items-center background-pattern w-full">
      <form
        className="flex flex-col bg-black border-2 border-neutral-900 py-5 px-6 rounded-md gap-3 w-1/4 min-w-80"
        onSubmit={handleSubmit}
      >
        <Link
          href="/"
          className="ml-auto focus:outline-none focus:ring-2 focus:ring-rose-500 rounded transition ease-in-out duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x hover:text-rose-500 transition ease-in-out duration-200"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Link>
        <h1 className="text-2xl text-center underline decoration-blue-600 mb-5">
          Sign In
        </h1>
        <div className="flex flex-col gap-1">
          <label className="" htmlFor="userid">
            User Id
          </label>
          <input
            ref={userIdRef}
            type="text"
            name="userid"
            onChange={e => setUserId(e.target.value)}
            value={userId}
            className="p-2 rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-neutral-200 focus:ring-neutral-200 focus:ring-offset-neutral-900 transition ease-in-out duration-300 caret-neutral-900 selection:bg-neutral-900 selection:text-neutral-200 font-medium"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            className="p-2 rounded text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-neutral-200 focus:ring-neutral-200 focus:ring-offset-neutral-900 transition ease-in-out duration-300 caret-neutral-900 selection:bg-neutral-900 selection:text-neutral-200 font-medium"
          />
        </div>
        {err && <p className="text-rose-500">{err}</p>}
        <button
          disabled={pending}
          className={`bg-blue-600 px-3 py-2 rounded text-blue-100 font-bold hover:bg-blue-700 transition ease-in-out duration-300 focus:outline-none focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-black active:bg-blue-800 capitalize self-start disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2 ${
            !err && "mt-5"
          }`}
        >
          Submit
          {pending && (
            <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          )}
        </button>
      </form>
    </div>
  );
}
