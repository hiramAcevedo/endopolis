import { Header, Footer, WhatsAppButton } from "@/components/layout";
import {
  Hero,
  ServicesSection,
  TeamSection,
  ContactSection,
} from "@/components/landing";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <Header user={session} />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
