"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Atelier } from "@/data/ateliers";
import { dateLongue, emailValide, euros, prochainsJours } from "@/lib/format";
import { Bouton } from "./ui/Bouton";

type Etape = 1 | 2 | 3;

type Coordonnees = { prenom: string; email: string; personnes: number };

export function BookingModal({
  atelier,
  onClose,
  onConfirme,
}: {
  atelier: Atelier | null;
  onClose: () => void;
  onConfirme: (atelierId: string, personnes: number) => void;
}) {
  const [etape, setEtape] = useState<Etape>(1);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [creneau, setCreneau] = useState<string | null>(null);
  const [form, setForm] = useState<Coordonnees>({ prenom: "", email: "", personnes: 1 });
  const [touche, setTouche] = useState(false);

  const jours = useMemo(
    () => (atelier ? prochainsJours(atelier.jours) : []),
    [atelier],
  );
  const jourChoisi = jours.find((j) => j.key === dateKey);

  // Réinitialise le tunnel à chaque nouvel atelier
  useEffect(() => {
    if (atelier) {
      setEtape(1);
      setDateKey(null);
      setCreneau(null);
      setForm({ prenom: "", email: "", personnes: 1 });
      setTouche(false);
    }
  }, [atelier]);

  // Échap pour fermer + blocage du scroll de fond
  useEffect(() => {
    if (!atelier) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [atelier, onClose]);

  if (!atelier) return null;

  const erreurs = {
    prenom: form.prenom.trim().length < 2 ? "Indiquez votre prénom" : null,
    email: emailValide(form.email) ? null : "Email invalide",
    personnes:
      form.personnes < 1 || form.personnes > Math.max(atelier.placesRestantes, 1)
        ? `Entre 1 et ${atelier.placesRestantes} personne(s)`
        : null,
  };
  const formValide = !erreurs.prenom && !erreurs.email && !erreurs.personnes;

  const valider = () => {
    setTouche(true);
    if (!formValide) return;
    onConfirme(atelier.id, form.personnes);
    setEtape(3);
  };

  const total = atelier.prix * form.personnes;

  return (
    <AnimatePresence>
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
          aria-label={`Réserver — ${atelier.nom}`}
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="grain relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-creme shadow-lift sm:rounded-3xl"
        >
          {/* En-tête */}
          <div className="flex items-start justify-between gap-4 border-b border-encre/8 bg-creme-warm px-5 py-4 sm:px-7">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-terracotta">
                {etape === 3 ? "C'est réservé" : `Étape ${etape} sur 2`}
              </p>
              <p className="mt-1 font-serif text-xl leading-tight">{atelier.nom}</p>
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

          {/* Barre de progression */}
          {etape < 3 && (
            <div className="h-1 bg-encre/8">
              <motion.div
                className="h-full bg-terracotta"
                initial={false}
                animate={{ width: etape === 1 ? "50%" : "100%" }}
                transition={{ type: "spring", stiffness: 200, damping: 28 }}
              />
            </div>
          )}

          <div className="grow overflow-y-auto px-5 py-6 sm:px-7">
            <AnimatePresence mode="wait">
              {/* ÉTAPE 1 — date & créneau */}
              {etape === 1 && (
                <motion.div
                  key="e1"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="font-serif text-2xl">Choisissez votre date</h3>
                  <p className="mt-1.5 text-sm text-encre/60">
                    Les 14 prochains jours · durée {atelier.duree}
                  </p>

                  <div className="mt-5 grid grid-cols-7 gap-1.5 sm:gap-2">
                    {jours.map((j) => {
                      const actif = j.key === dateKey;
                      return (
                        <button
                          key={j.key}
                          disabled={!j.disponible}
                          onClick={() => {
                            setDateKey(j.key);
                            setCreneau(null);
                          }}
                          className={`flex flex-col items-center rounded-lg border py-1.5 transition-all sm:rounded-xl sm:py-2 ${
                            actif
                              ? "border-terracotta bg-terracotta text-creme shadow-soft"
                              : j.disponible
                                ? "border-encre/12 bg-white/70 hover:border-terracotta/50 hover:bg-white"
                                : "cursor-not-allowed border-transparent bg-encre/4 text-encre/25"
                          }`}
                        >
                          <span className="text-[0.58rem] uppercase tracking-tight opacity-70 sm:text-[0.65rem]">
                            {j.labelJour}
                          </span>
                          <span className="text-sm font-medium sm:text-base">{j.labelNum}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {jourChoisi && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-6 text-sm font-medium text-encre/70">
                          Créneaux du {dateLongue(jourChoisi.date)}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {atelier.creneaux.map((c) => (
                            <button
                              key={c}
                              onClick={() => setCreneau(c)}
                              className={`rounded-full border px-4 py-2 text-sm transition-all ${
                                creneau === c
                                  ? "border-indigo bg-indigo text-creme"
                                  : "border-encre/15 bg-white/70 hover:border-indigo/50"
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!jourChoisi && (
                    <p className="mt-6 rounded-xl bg-sable/60 px-4 py-3 text-sm text-encre/55">
                      Sélectionnez un jour surligné pour voir les créneaux disponibles.
                    </p>
                  )}
                </motion.div>
              )}

              {/* ÉTAPE 2 — coordonnées */}
              {etape === 2 && (
                <motion.div
                  key="e2"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.22 }}
                >
                  <h3 className="font-serif text-2xl">Vos coordonnées</h3>
                  <p className="mt-1.5 text-sm text-encre/60">
                    {jourChoisi && dateLongue(jourChoisi.date)} à {creneau}
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label htmlFor="prenom" className="mb-1.5 block text-sm text-encre/70">
                        Prénom
                      </label>
                      <input
                        id="prenom"
                        value={form.prenom}
                        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                        placeholder="Camille"
                        className={`champ ${touche && erreurs.prenom ? "champ-erreur" : ""}`}
                      />
                      {touche && erreurs.prenom && (
                        <p className="mt-1.5 text-sm text-terracotta">{erreurs.prenom}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm text-encre/70">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="camille@exemple.fr"
                        className={`champ ${touche && erreurs.email ? "champ-erreur" : ""}`}
                      />
                      {touche && erreurs.email && (
                        <p className="mt-1.5 text-sm text-terracotta">{erreurs.email}</p>
                      )}
                    </div>

                    <div>
                      <span className="mb-1.5 block text-sm text-encre/70">
                        Nombre de personnes
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 rounded-full border border-encre/15 bg-white/80 p-1">
                          <button
                            aria-label="Retirer une personne"
                            onClick={() =>
                              setForm({ ...form, personnes: Math.max(1, form.personnes - 1) })
                            }
                            className="h-9 w-9 rounded-full text-lg text-encre/70 transition-colors hover:bg-encre/6"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-base font-medium">
                            {form.personnes}
                          </span>
                          <button
                            aria-label="Ajouter une personne"
                            onClick={() =>
                              setForm({
                                ...form,
                                personnes: Math.min(atelier.placesRestantes, form.personnes + 1),
                              })
                            }
                            className="h-9 w-9 rounded-full text-lg text-encre/70 transition-colors hover:bg-encre/6"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm text-encre/50">
                          {atelier.placesRestantes} place{atelier.placesRestantes > 1 ? "s" : ""} au
                          total
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-sable/70 px-4 py-3.5">
                      <span className="text-sm text-encre/65">
                        {form.personnes} × {euros(atelier.prix)}
                      </span>
                      <span className="font-serif text-2xl">{euros(total)}</span>
                    </div>
                    <p className="text-xs text-encre/45">
                      Paiement sur place ou en ligne — aucun prélèvement dans cette démonstration.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ÉTAPE 3 — confirmation */}
              {etape === 3 && (
                <motion.div
                  key="e3"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sauge/18"
                  >
                    <motion.svg width="38" height="38" viewBox="0 0 40 40" aria-hidden>
                      <motion.path
                        d="M10 21l7 7 14-15"
                        fill="none"
                        stroke="#7E8F6E"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mt-6 font-serif text-3xl"
                  >
                    Réservation confirmée !
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="mt-2 text-encre/70"
                  >
                    On vous attend chez Art&rsquo;péro ☕🎨
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="mx-auto mt-7 max-w-sm rounded-2xl border border-encre/10 bg-white/75 p-5 text-left"
                  >
                    <Ligne label="Atelier" valeur={atelier.nom} />
                    <Ligne
                      label="Quand"
                      valeur={`${jourChoisi ? dateLongue(jourChoisi.date) : ""} · ${creneau}`}
                    />
                    <Ligne
                      label="Au nom de"
                      valeur={`${form.prenom} · ${form.personnes} pers.`}
                    />
                    <Ligne label="Total" valeur={euros(total)} />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-5 text-sm text-encre/50"
                  >
                    Un récapitulatif part à <strong className="font-medium">{form.email}</strong>.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pied du modal */}
          <div className="flex items-center justify-between gap-3 border-t border-encre/8 bg-creme-warm px-5 py-4 sm:px-7">
            {etape === 1 && (
              <>
                <button onClick={onClose} className="text-sm text-encre/55 hover:text-encre">
                  Annuler
                </button>
                <Bouton disabled={!dateKey || !creneau} onClick={() => setEtape(2)}>
                  Continuer
                </Bouton>
              </>
            )}
            {etape === 2 && (
              <>
                <button
                  onClick={() => setEtape(1)}
                  className="text-sm text-encre/55 hover:text-encre"
                >
                  ← Retour
                </button>
                <Bouton onClick={valider}>Confirmer ma réservation</Bouton>
              </>
            )}
            {etape === 3 && (
              <Bouton variante="sombre" onClick={onClose} className="w-full">
                Parfait, merci !
              </Bouton>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Ligne({ label, valeur }: { label: string; valeur: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-encre/6 py-2 last:border-0">
      <span className="text-sm text-encre/50">{label}</span>
      <span className="text-right text-sm font-medium">{valeur}</span>
    </div>
  );
}
