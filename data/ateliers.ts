/**
 * Données factices de la maquette Art'péro.
 * Tout est éditable ici : titres, prix, durées, créneaux, places restantes.
 */

export type Atelier = {
  id: string;
  nom: string;
  accroche: string;
  description: string;
  duree: string;
  prix: number;
  placesRestantes: number;
  couleur: "terracotta" | "sauge" | "indigo" | "ocre";
  emoji: string;
  /** Jours de la semaine où l'atelier a lieu (0 = dimanche). */
  jours: number[];
  creneaux: string[];
};

export const ateliers: Atelier[] = [
  {
    id: "peinture-soie",
    nom: "Peinture sur soie",
    accroche: "Le grand classique de la maison",
    description:
      "Gutta, encres et pinceaux : repartez avec votre foulard peint à la main. Aucune expérience requise, on vous guide du premier trait au séchage.",
    duree: "2h30",
    prix: 65,
    placesRestantes: 4,
    couleur: "indigo",
    emoji: "🪷",
    jours: [3, 5, 6],
    creneaux: ["14h00", "18h30"],
  },
  {
    id: "totems",
    nom: "Création de totems",
    accroche: "Sculpture & récup'",
    description:
      "Bois, argile, textiles récupérés : on assemble un totem à votre image. Un atelier sculpture très libre, très bavard, très chaleureux.",
    duree: "3h",
    prix: 75,
    placesRestantes: 2,
    couleur: "terracotta",
    emoji: "🗿",
    jours: [4, 6],
    creneaux: ["15h00", "19h00"],
  },
  {
    id: "soiree-jam",
    nom: "Soirée jam musicale",
    accroche: "Scène ouverte, tous niveaux",
    description:
      "Instruments sur place, ampli branché, cuisine maison au comptoir. Vous jouez, vous écoutez, vous découvrez — tout est permis.",
    duree: "3h",
    prix: 12,
    placesRestantes: 18,
    couleur: "ocre",
    emoji: "🎸",
    jours: [5, 6],
    creneaux: ["20h00"],
  },
  {
    id: "decouverte",
    nom: "Atelier découverte",
    accroche: "Première fois chez nous ?",
    description:
      "Une heure trente pour goûter à tout : un peu de soie, un peu d'argile, un thé à la menthe et beaucoup de discussions.",
    duree: "1h30",
    prix: 35,
    placesRestantes: 6,
    couleur: "sauge",
    emoji: "🎨",
    jours: [2, 3, 4, 6, 0],
    creneaux: ["11h00", "16h00", "18h00"],
  },
];

export const typesTeamBuilding = [
  "Peinture sur soie collective",
  "Totem d'équipe",
  "Jam session & apéro",
  "Parcours découverte (multi-ateliers)",
  "Sur-mesure — on en discute",
];
