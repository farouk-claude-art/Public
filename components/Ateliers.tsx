"use client";

import { motion } from "framer-motion";
import type { Atelier } from "@/data/ateliers";
import { euros } from "@/lib/format";
import { Bouton } from "./ui/Bouton";
import { Reveal } from "./ui/Reveal";

const accents: Record<Atelier["couleur"], { bord: string; fond: string; texte: string }> = {
  terracotta: { bord: "border-terracotta/25", fond: "bg-terracotta/10", texte: "text-terracotta" },
  sauge: { bord: "border-sauge/30", fond: "bg-sauge/12", texte: "text-sauge" },
  indigo: { bord: "border-indigo/25", fond: "bg-indigo/10", texte: "text-indigo" },
  ocre: { bord: "border-ocre/35", fond: "bg-ocre/15", texte: "text-ocre" },
};

export function Ateliers({
  ateliers,
  onReserver,
}: {
  ateliers: Atelier[];
  onReserver: (a: Atelier) => void;
}) {
  return (
    <section id="ateliers" className="section scroll-mt-20 py-16 sm:py-24">
      <Reveal>
        <p className="surtitre">Nos ateliers</p>
        <h2 className="titre mt-3 max-w-xl">
          Quatre façons de repartir avec quelque chose fait de vos mains
        </h2>
        <p className="mt-4 max-w-lg text-encre/65">
          Petits groupes, matériel fourni, aucun niveau requis. Réservation immédiate,
          confirmation par email.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {ateliers.map((a, i) => {
          const c = accents[a.couleur];
          const complet = a.placesRestantes === 0;
          const presqueComplet = a.placesRestantes > 0 && a.placesRestantes <= 3;

          return (
            <Reveal key={a.id} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="grain relative flex h-full flex-col overflow-hidden rounded-3xl border border-encre/8 bg-white/70 p-6 shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${c.fond}`}
                    aria-hidden
                  >
                    {a.emoji}
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      complet
                        ? "border-encre/15 bg-encre/5 text-encre/45"
                        : presqueComplet
                          ? "border-terracotta/30 bg-terracotta/10 text-terracotta"
                          : "border-sauge/30 bg-sauge/12 text-sauge"
                    }`}
                  >
                    {complet
                      ? "Complet"
                      : `${a.placesRestantes} place${a.placesRestantes > 1 ? "s" : ""} restante${
                          a.placesRestantes > 1 ? "s" : ""
                        }`}
                  </span>
                </div>

                <p className={`mt-5 text-xs uppercase tracking-widest ${c.texte}`}>{a.accroche}</p>
                <h3 className="mt-1.5 font-serif text-2xl">{a.nom}</h3>
                <p className="mt-3 grow text-[0.95rem] leading-relaxed text-encre/65">
                  {a.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-encre/8 pt-5">
                  <div>
                    <p className="font-serif text-2xl">{euros(a.prix)}</p>
                    <p className="text-sm text-encre/50">
                      {a.duree} · matériel inclus
                    </p>
                  </div>
                  <Bouton disabled={complet} onClick={() => onReserver(a)} className="px-5 py-3">
                    {complet ? "Liste d'attente" : "Réserver"}
                  </Bouton>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
