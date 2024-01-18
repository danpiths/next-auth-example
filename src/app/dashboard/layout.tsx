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
    <div className="flex flex-1 bg-gradient-to-r from-sky-900 to-sky-800 text-neutral-100">
      <Sidebar />
      <main className="flex flex-1 pl-6 pt-12">{children}</main>
    </div>
  );
}
