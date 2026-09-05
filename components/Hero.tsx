"use client";

import { motion } from "framer-motion";
import { Bouton } from "./ui/Bouton";
import { Wordmark } from "./Wordmark";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section id="top" className="section relative pb-10 pt-8 sm:pt-14">
      <div className="grid items-center gap-10 md:grid-cols-[1.05fr_1fr] md:gap-14">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-ocre/40 bg-ocre/12 px-3.5 py-1.5"
          >
            <span className="text-ocre" aria-hidden>
              ★
            </span>
            <span className="text-sm font-medium text-encre/80">
              {site.note.toString().replace(".", ",")} sur Google
            </span>
            <span className="text-sm text-encre/45">· {site.nbAvis} avis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="font-serif text-[3.2rem] leading-[0.95] sm:text-7xl"
          >
            <Wordmark className="text-[1em]" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-encre/75"
          >
            {site.baseline}. On peint, on sculpte, on joue, on partage un verre —
            tout est fait maison, y compris l&rsquo;ambiance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Bouton onClick={() => document.getElementById("ateliers")?.scrollIntoView()}>
              Réserver un atelier
            </Bouton>
            <Bouton
              variante="secondaire"
              onClick={() => document.getElementById("entreprises")?.scrollIntoView()}
            >
              Privatiser le lieu
            </Bouton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-6 text-sm text-encre/50"
          >
            {site.adresse} · {site.metro}
          </motion.p>
        </div>

        {/* Visuel placeholder : composition peinte, remplaçable par une vraie photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          className="grain relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[5/4] md:aspect-[4/5]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo via-terracotta to-ocre" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(250,244,234,.34),transparent_55%)]" />
          <svg
            viewBox="0 0 400 500"
            aria-hidden
            className="absolute inset-0 h-full w-full opacity-60 mix-blend-soft-light"
          >
            <path d="M-20 380 C90 300 150 430 260 350 S400 300 430 340" fill="none" stroke="#FAF4EA" strokeWidth="26" strokeLinecap="round" />
            <circle cx="300" cy="130" r="62" fill="#FAF4EA" opacity=".5" />
            <path d="M40 120 C120 60 180 190 250 120" fill="none" stroke="#F0E4D2" strokeWidth="14" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-creme/92 px-4 py-3 backdrop-blur">
            <p className="font-serif text-lg leading-tight">Atelier peinture sur soie</p>
            <p className="text-sm text-encre/60">Tous les mercredis, vendredis &amp; samedis</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
