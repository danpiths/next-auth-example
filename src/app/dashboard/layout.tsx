import React from "react";
import Sidebar from "../../components/navigation/sidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-tr from-sky-950 to-sky-700 text-neutral-100 md:flex-row">
      <Sidebar />
      <main className="flex flex-1 px-5 py-5 md:px-6 md:py-12">{children}</main>
    </div>
  );
}
