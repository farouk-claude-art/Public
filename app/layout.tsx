import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const titre = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-title",
  display: "swap",
});

const corps = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.nom} — ${site.baseline}`,
  description:
    "Ateliers peinture sur soie, création de totems et soirées jam au cœur du 5e arrondissement. Réservez en direct, sans intermédiaire.",
  // Aperçu propre quand le lien est partagé par SMS, WhatsApp ou email.
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.nom,
    title: `${site.nom} — ${site.baseline}`,
    description:
      "Ateliers, soirées jam et privatisation d'entreprise. Réservation en direct.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF4EA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${titre.variable} ${corps.variable}`}>
      <body>{children}</body>
    </html>
  );
}
