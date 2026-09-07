"use client";

import { motion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

/** Bandeau d'accès à la carte du café, entre les ateliers et l'argumentaire. */
export function Carte({ onOuvrir }: { onOuvrir: () => void }) {
  return (
    <section className="section py-6">
      <Reveal>
        <motion.button
          onClick={onOuvrir}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="grain group relative flex w-full items-center justify-between gap-5 overflow-hidden rounded-[1.75rem] border border-encre/10 bg-white/70 px-6 py-6 text-left shadow-soft hover:shadow-lift sm:px-8"
        >
          <div className="flex items-center gap-5">
            <span
              className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ocre/15 text-2xl sm:flex"
              aria-hidden
            >
              🫖
            </span>
            <div>
              <p className="surtitre">Au comptoir</p>
              <p className="mt-1.5 font-serif text-2xl leading-tight">La carte du café</p>
              <p className="mt-1 text-sm text-encre/60">
                Lattes signature, infusions maison et cuisine végétarienne iranienne.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-terracotta transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </motion.button>
      </Reveal>
    </section>
  );
}
