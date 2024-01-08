import AuthButton from "@/components/AuthButton";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-5xl font-bold">
        {session && session.user
          ? `user: ${session.user.name}`
          : "Please sign in"}
      </h1>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="bg-blue-600 px-3 py-2 rounded text-blue-100 font-bold hover:bg-blue-700 transition ease-in-out duration-300 focus:outline-none focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-black active:bg-blue-800 capitalize"
        >
          {session && session.user
            ? "Visit the Dashboard"
            : "Visit the Dashboard (unauthenticated)"}
        </Link>
        <AuthButton
          authOption={session && session.user ? "sign-out" : "sign-in"}
        />
      </div>
    </div>
  );
}
