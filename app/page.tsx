"use client";

import { useState } from "react";
import { ateliers as ateliersInitiaux, type Atelier } from "@/data/ateliers";
import { BandeauDemo } from "@/components/BandeauDemo";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Ateliers } from "@/components/Ateliers";
import { BookingModal } from "@/components/BookingModal";
import { ZeroCommission } from "@/components/ZeroCommission";
import { TeamBuilding } from "@/components/TeamBuilding";
import { Galerie } from "@/components/Galerie";
import { Footer } from "@/components/Footer";

export default function Page() {
  // Tout l'état de la démo vit ici : aucune base de données.
  const [ateliers, setAteliers] = useState<Atelier[]>(ateliersInitiaux);
  const [selection, setSelection] = useState<Atelier | null>(null);

  const confirmer = (atelierId: string, personnes: number) => {
    setAteliers((prev) =>
      prev.map((a) =>
        a.id === atelierId
          ? { ...a, placesRestantes: Math.max(0, a.placesRestantes - personnes) }
          : a,
      ),
    );
  };

  return (
    <>
      <BandeauDemo />
      <Nav />
      <main>
        <Hero />
        <Ateliers ateliers={ateliers} onReserver={setSelection} />
        <ZeroCommission />
        <TeamBuilding />
        <Galerie />
      </main>
      <Footer />
      <BookingModal
        atelier={selection}
        onClose={() => setSelection(null)}
        onConfirme={confirmer}
      />
    </>
  );
}
