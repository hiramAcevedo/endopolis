import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Header, Footer, WhatsAppButton } from "@/components/layout";

export default async function MiCuentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <>
      <Header user={session} />
      <main className="flex-1 bg-slate-50 py-8">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

