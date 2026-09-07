"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wordmark } from "./Wordmark";

const liens = [
  { href: "#ateliers", label: "Ateliers" },
  { href: "#entreprises", label: "Entreprises" },
  { href: "#galerie", label: "Galerie" },
  { href: "#infos", label: "Infos" },
];

export function Nav({ onOuvrirCarte }: { onOuvrirCarte: () => void }) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-40 transition-all ${
        compact ? "backdrop-blur-md bg-creme/85 border-b border-encre/8" : "bg-transparent"
      }`}
    >
      <div className="section flex items-center justify-between py-3.5">
        <a href="#top" aria-label="Art'péro — accueil">
          <Wordmark className="text-2xl" />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {liens.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-encre/70 transition-colors hover:text-terracotta"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onOuvrirCarte}
            className="text-sm text-encre/70 transition-colors hover:text-terracotta"
          >
            La carte
          </button>
        </nav>
        <a
          href="#ateliers"
          className="rounded-full bg-encre px-4 py-2 text-sm text-creme transition-colors hover:bg-terracotta"
        >
          Réserver
        </a>
      </div>
    </motion.header>
  );
}
