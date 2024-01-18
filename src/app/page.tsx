import AuthButton from "@/components/AuthButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold md:text-5xl">
        {session && session.user
          ? `user: ${session.user.name}`
          : "Please sign in"}
      </h1>
      <div className="flex items-center gap-2">
        {session && session.user && (
          <Link
            href="/dashboard"
            className="rounded bg-blue-600 px-3 py-2 font-bold capitalize text-blue-100 transition duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-neutral-100 active:bg-blue-800"
          >
            Visit the Dashboard
          </Link>
        )}
        <AuthButton
          authOption={session && session.user ? "sign-out" : "sign-in"}
        />
      </div>
    </div>
  );
}
