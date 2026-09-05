"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Rappel discret qu'il s'agit d'une maquette — masquable pendant la présentation. */
export function BandeauDemo() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-encre text-creme"
        >
          <div className="section flex items-center justify-between gap-4 py-2">
            <p className="text-xs sm:text-sm">
              Maquette de démonstration · réservations simulées, aucun paiement réel
            </p>
            <button
              onClick={() => setVisible(false)}
              aria-label="Masquer le bandeau"
              className="shrink-0 rounded-full px-2 py-1 text-creme/60 transition-colors hover:text-creme"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
