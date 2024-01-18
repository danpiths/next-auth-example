import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col items-center gap-7">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Dashboard 👋</h1>
        <p className="">This is a protected page 🔒</p>
      </div>
      <Link
        href="/"
        className="rounded bg-blue-600 px-3 py-2 font-bold capitalize text-blue-100 transition duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-black active:bg-blue-800"
      >
        Back to home
      </Link>
    </div>
  );
}
