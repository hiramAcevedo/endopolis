import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Endopolis - Clínica de Gastroenterología y Nutrición",
  description:
    "Clínica especializada en Gastroenterología y Nutrición en Guadalajara. Agenda tu consulta con los mejores especialistas.",
  keywords: [
    "gastroenterología",
    "nutrición",
    "endoscopia",
    "colonoscopia",
    "Guadalajara",
    "clínica",
    "citas médicas",
  ],
  authors: [{ name: "Endopolis" }],
  openGraph: {
    title: "Endopolis - Clínica de Gastroenterología y Nutrición",
    description:
      "Clínica especializada en Gastroenterología y Nutrición en Guadalajara.",
    type: "website",
    locale: "es_MX",
    siteName: "Endopolis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className={`${outfit.className} min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
