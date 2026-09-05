export const site = {
  nom: "Art'péro",
  baseline: "Café-atelier créatif — Paris 5e, face à la Grande Mosquée",
  note: 4.8,
  nbAvis: 213,
  adresse: "5 Rue Georges Desplas, 75005 Paris",
  metro: "Métro Censier-Daubenton (ligne 7)",
  telephone: "01 45 00 00 00",
  email: "bonjour@artpero.paris",
  horaires: [
    { jour: "Mardi — Jeudi", heures: "11h — 19h" },
    { jour: "Vendredi — Samedi", heures: "11h — 23h" },
    { jour: "Dimanche", heures: "12h — 18h" },
    { jour: "Lundi", heures: "Fermé (ou privatisable)" },
  ],
  reseaux: [
    { nom: "Instagram", href: "#instagram" },
    { nom: "Facebook", href: "#facebook" },
    { nom: "TikTok", href: "#tiktok" },
  ],
};

export type Vignette = {
  legende: string;
  from: string;
  to: string;
  emoji: string;
};

/** Grille galerie : placeholders dégradés + emoji, à remplacer par de vraies photos. */
export const galerie: Vignette[] = [
  { legende: "Atelier soie du samedi", from: "#1F3A5F", to: "#7E8F6E", emoji: "🪷" },
  { legende: "Totems en cours de séchage", from: "#C2603F", to: "#D9A441", emoji: "🗿" },
  { legende: "Jam du vendredi soir", from: "#2B2320", to: "#C2603F", emoji: "🎸" },
  { legende: "Le comptoir & les thés", from: "#D9A441", to: "#F0E4D2", emoji: "🫖" },
  { legende: "Team building Groupe Lumen", from: "#7E8F6E", to: "#1F3A5F", emoji: "🎉" },
  { legende: "La devanture, rue Georges Desplas", from: "#E08B6A", to: "#F6EADB", emoji: "🏠" },
];
