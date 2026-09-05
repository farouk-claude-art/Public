"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type Variante = "primaire" | "secondaire" | "sombre";

const styles: Record<Variante, string> = {
  primaire:
    "bg-terracotta text-creme shadow-soft hover:bg-terracotta-dark hover:shadow-lift",
  secondaire:
    "bg-transparent text-encre border border-encre/20 hover:border-encre/45 hover:bg-white/60",
  sombre: "bg-indigo text-creme shadow-soft hover:bg-indigo-light hover:shadow-lift",
};

type Props = HTMLMotionProps<"button"> & { variante?: Variante };

export function Bouton({ variante = "primaire", className = "", ...props }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5
                  text-[0.95rem] font-medium transition-colors disabled:opacity-45
                  disabled:pointer-events-none ${styles[variante]} ${className}`}
      {...props}
    />
  );
}
