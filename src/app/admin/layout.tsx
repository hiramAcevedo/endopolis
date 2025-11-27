import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/admin-login");
  }

  if (session.role !== "ADMIN") {
    redirect("/mi-cuenta");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64 min-h-screen">
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

