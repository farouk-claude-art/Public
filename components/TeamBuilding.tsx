"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { typesTeamBuilding } from "@/data/ateliers";
import { emailValide } from "@/lib/format";
import { Bouton } from "./ui/Bouton";

type Devis = {
  entreprise: string;
  email: string;
  participants: number;
  date: string;
  type: string;
};

const vide: Devis = {
  entreprise: "",
  email: "",
  participants: 12,
  date: "",
  type: typesTeamBuilding[0],
};

export function TeamBuilding() {
  const [form, setForm] = useState<Devis>(vide);
  const [touche, setTouche] = useState(false);
  const [envoye, setEnvoye] = useState(false);

  const erreurs = {
    entreprise: form.entreprise.trim().length < 2 ? "Nom de l'entreprise requis" : null,
    email: emailValide(form.email) ? null : "Email professionnel invalide",
    participants: form.participants < 5 ? "À partir de 5 participants" : null,
    date: form.date ? null : "Choisissez une date souhaitée",
  };
  const valide = Object.values(erreurs).every((e) => e === null);

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    setTouche(true);
    if (valide) setEnvoye(true);
  };

  return (
    <section id="entreprises" className="scroll-mt-20 py-16 sm:py-24">
      <div className="section">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-indigo px-6 py-10 text-creme shadow-lift sm:px-10 sm:py-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-terracotta/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-ocre/20 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-ocre-light">
                Entreprises &amp; groupes
              </p>
              <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
                Privatisez l&rsquo;atelier pour votre équipe
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-creme/75">
                Le lieu entier pour vous : 60 personnes debout, 35 assises, deux salles
                d&rsquo;atelier, un bar et une cuisine maison. On adapte l&rsquo;atelier, le
                traiteur et le timing à votre journée.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  "Devis sous 24h, sans engagement",
                  "Animation par nos artistes-intervenants",
                  "Apéro dînatoire fait maison en option",
                  "De 5 à 60 participants",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-creme/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ocre" aria-hidden />
                    <span className="text-[0.95rem]">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-l-2 border-ocre/60 pl-4 font-serif text-lg italic leading-snug text-creme/80">
                « Nos 28 collaborateurs en parlent encore. On revient au printemps. »
                <span className="mt-1 block font-sans text-sm not-italic text-creme/50">
                  — Direction RH, agence du 11e
                </span>
              </p>
            </div>

            {/* Formulaire de devis */}
            <div className="rounded-3xl bg-creme p-5 text-encre shadow-lift sm:p-7">
              <AnimatePresence mode="wait">
                {envoye ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 250, damping: 15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-sauge/18 text-3xl"
                      aria-hidden
                    >
                      ✉️
                    </motion.div>
                    <h3 className="mt-5 font-serif text-2xl">Votre demande est envoyée</h3>
                    <p className="mt-2 max-w-xs text-encre/65">
                      Réponse sous 24h avec une proposition chiffrée pour{" "}
                      <strong className="font-medium">{form.entreprise}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        setForm(vide);
                        setTouche(false);
                        setEnvoye(false);
                      }}
                      className="mt-6 text-sm text-terracotta underline underline-offset-4"
                    >
                      Faire une autre demande
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={envoyer}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-2xl">Demande de devis</h3>

                    <div>
                      <label htmlFor="entreprise" className="mb-1.5 block text-sm text-encre/70">
                        Entreprise
                      </label>
                      <input
                        id="entreprise"
                        value={form.entreprise}
                        onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                        placeholder="Studio Lumen"
                        className={`champ ${touche && erreurs.entreprise ? "champ-erreur" : ""}`}
                      />
                      {touche && erreurs.entreprise && (
                        <p className="mt-1.5 text-sm text-terracotta">{erreurs.entreprise}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email-pro" className="mb-1.5 block text-sm text-encre/70">
                        Email professionnel
                      </label>
                      <input
                        id="email-pro"
                        type="email"
                        inputMode="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="prenom@entreprise.fr"
                        className={`champ ${touche && erreurs.email ? "champ-erreur" : ""}`}
                      />
                      {touche && erreurs.email && (
                        <p className="mt-1.5 text-sm text-terracotta">{erreurs.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="participants"
                          className="mb-1.5 block text-sm text-encre/70"
                        >
                          Participants
                        </label>
                        <input
                          id="participants"
                          type="number"
                          min={5}
                          max={60}
                          value={form.participants}
                          onChange={(e) =>
                            setForm({ ...form, participants: Number(e.target.value) })
                          }
                          className={`champ ${touche && erreurs.participants ? "champ-erreur" : ""}`}
                        />
                      </div>
                      <div>
                        <label htmlFor="date-pro" className="mb-1.5 block text-sm text-encre/70">
                          Date souhaitée
                        </label>
                        <input
                          id="date-pro"
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className={`champ ${touche && erreurs.date ? "champ-erreur" : ""}`}
                        />
                      </div>
                    </div>
                    {touche && (erreurs.participants || erreurs.date) && (
                      <p className="text-sm text-terracotta">
                        {erreurs.participants ?? erreurs.date}
                      </p>
                    )}

                    <div>
                      <label htmlFor="type" className="mb-1.5 block text-sm text-encre/70">
                        Type d&rsquo;atelier
                      </label>
                      <select
                        id="type"
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="champ appearance-none"
                      >
                        {typesTeamBuilding.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <Bouton type="submit" className="w-full">
                      Recevoir un devis
                    </Bouton>
                    <p className="text-center text-xs text-encre/45">
                      Réponse sous 24h · sans engagement
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
