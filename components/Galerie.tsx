"use client";

import { motion } from "framer-motion";
import { galerie } from "@/data/site";
import { Reveal } from "./ui/Reveal";

export function Galerie() {
  return (
    <section id="galerie" className="section scroll-mt-20 py-16 sm:py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="surtitre">La galerie</p>
          <h2 className="titre mt-3">Un aperçu de la maison</h2>
        </div>
        <a
          href="#instagram"
          className="text-sm text-encre/60 underline underline-offset-4 transition-colors hover:text-terracotta"
        >
          @artpero.paris →
        </a>
      </Reveal>

      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {galerie.map((v, i) => (
          <Reveal key={v.legende} delay={i * 0.05}>
            <motion.figure
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="grain group relative aspect-square overflow-hidden rounded-2xl shadow-soft"
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(140deg, ${v.from}, ${v.to})` }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center text-4xl opacity-70 transition-transform duration-500 group-hover:scale-110 sm:text-5xl"
                aria-hidden
              >
                {v.emoji}
              </span>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-encre/80 to-transparent px-3 pb-3 pt-8 text-[0.78rem] leading-tight text-creme opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                {v.legende}
              </figcaption>
            </motion.figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
