"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { carte, onglets, type OngletId } from "@/data/menu";
import { prixCarte } from "@/lib/format";
import { site } from "@/data/site";

export function MenuModal({ ouvert, onClose }: { ouvert: boolean; onClose: () => void }) {
  const [onglet, setOnglet] = useState<OngletId | "tout">("tout");

  useEffect(() => {
    if (!ouvert) return;
    setOnglet("tout");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [ouvert, onClose]);

  const categories = carte.filter((c) => onglet === "tout" || c.onglet === onglet);

  return (
    <AnimatePresence>
      {ouvert && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-encre/45 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            key="panneau"
            role="dialog"
            aria-modal="true"
            aria-label="La carte du café"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="grain relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-creme shadow-lift sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 bg-creme-warm px-5 pt-4 sm:px-7">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-terracotta">Au comptoir</p>
                <p className="mt-1 font-serif text-xl leading-tight">La carte</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="-mr-1 -mt-1 rounded-full p-2 text-encre/45 transition-colors hover:bg-encre/6 hover:text-encre"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden>
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Onglets, façon carte de café */}
            <div className="relative z-10 flex gap-6 border-b border-encre/8 bg-creme-warm px-5 sm:px-7">
              {[{ id: "tout" as const, label: "Tout" }, ...onglets].map((o) => (
                <button
                  key={o.id}
                  onClick={() => setOnglet(o.id)}
                  className={`relative shrink-0 pb-3 pt-3 text-sm transition-colors ${
                    onglet === o.id ? "text-encre" : "text-encre/50 hover:text-encre/80"
                  }`}
                >
                  {o.label}
                  {onglet === o.id && (
                    <motion.span
                      layoutId="onglet-carte"
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-terracotta"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="grow overflow-y-auto px-5 py-6 sm:px-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={onglet}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {categories.map((c) => (
                    <section key={c.id}>
                      <h3 className="font-serif text-xl">{c.nom}</h3>
                      {c.items.length === 0 ? (
                        <p className="mt-3 rounded-xl bg-sable/60 px-4 py-3 text-sm text-encre/55">
                          Carte en cours de mise à jour.
                        </p>
                      ) : (
                        <ul className="mt-3 divide-y divide-encre/8">
                          {c.items.map((i) => (
                            <li key={i.nom} className="flex items-baseline justify-between gap-4 py-3">
                              <div>
                                <p className="text-[0.95rem] text-encre">{i.nom}</p>
                                {i.description && (
                                  <p className="mt-0.5 text-sm text-encre/55">{i.description}</p>
                                )}
                              </div>
                              <span className="shrink-0 font-serif text-lg text-encre/85">
                                {prixCarte(i.prix)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-encre/8 bg-creme-warm px-5 py-4 text-center text-sm text-encre/55 sm:px-7">
              Servi sur place, {site.adresse.split(",")[0]} · sans réservation
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
