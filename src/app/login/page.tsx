"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import z from "zod";
import HeroImage from "../../../public/login-hero-image.jpg";

export default function Page() {
  const session = useSession();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const userIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session.status !== "loading" && session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (pending) {
        return;
      }
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
    <div className="flex relative flex-1 justify-center items-center w-full">
      <Image
        alt="Hero Image for Login Page"
        src={HeroImage}
        className="fixed top-4 -z-10 h-1/2 w-[95%] rounded-md object-cover object-center md:h-60 md:w-[98%]"
        priority
      />
      <form
        className="flex w-[22%] min-w-72 flex-col gap-5 rounded-md bg-neutral-100 p-4 drop-shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="relative p-5 -mt-10 w-full bg-gradient-to-bl rounded-md from-neutral-700 to-neutral-900 text-neutral-100 drop-shadow-lg">
          <Link
            href="/"
            className="fixed top-2 right-3 rounded transition duration-200 ease-in-out focus:ring-2 focus:ring-rose-500 focus:outline-none"
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
              className="transition duration-200 ease-in-out hover:text-rose-500 lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Link>
          <h1 className="mb-5 text-2xl font-bold text-center">Sign In</h1>
          <p className="text-sm text-center text-balance">
            Enter your email and password to Sign In
          </p>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label htmlFor="userid" className="text-xs text-neutral-600">
            User Id
          </label>
          <input
            ref={userIdRef}
            type="text"
            name="userid"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
            placeholder="some_username"
            className="border-b-2 transition duration-300 ease-in-out focus:outline-none border-b-neutral-300 bg-neutral-100 caret-neutral-900 selection:bg-neutral-900 selection:text-neutral-100 focus:border-b-neutral-600"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-neutral-600" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="*************"
            className="border-b-2 transition duration-300 ease-in-out focus:outline-none border-b-neutral-300 bg-neutral-100 caret-neutral-900 selection:bg-neutral-900 selection:text-neutral-100 focus:border-b-neutral-600"
          />
        </div>
        {err && <p className="text-rose-500">{err}</p>}
        <button
          disabled={pending}
          className={`flex items-center justify-center gap-2 rounded bg-gradient-to-bl from-neutral-700 to-neutral-900 p-3 text-sm font-semibold uppercase text-neutral-100 transition duration-300 ease-in-out enabled:hover:-translate-y-1 enabled:hover:transform enabled:hover:drop-shadow-xl enabled:focus:-translate-y-1 enabled:focus:transform enabled:focus:outline-none enabled:focus:ring-2 enabled:focus:ring-neutral-700 enabled:focus:ring-offset-2 enabled:focus:ring-offset-neutral-400 enabled:focus:drop-shadow-xl disabled:cursor-not-allowed disabled:opacity-50 ${!err && "mt-5"
            }`}
        >
          Sign In
          {pending && (
            <div className="inline-block w-4 h-4 rounded-full border-2 border-current border-solid animate-spin border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          )}
        </button>
      </form>
    </div>
  );
}
