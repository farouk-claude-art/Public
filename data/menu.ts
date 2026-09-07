/**
 * Carte du café.
 *
 * ⚠️ DONNÉES INCOMPLÈTES : seuls les items lisibles sur la fiche Tripadvisor
 * ont été repris (les trois prix ci-dessous sont réels). Les entrées avec
 * `prix: null` s'affichent avec un tiret — remplacez-les par les vrais prix,
 * et complétez la catégorie « Plats végétariens & véganes iraniens ».
 */

export type Item = {
  nom: string;
  description?: string;
  /** null = prix encore inconnu, affiché « — » sur la carte. */
  prix: number | null;
};

export type Categorie = {
  id: string;
  nom: string;
  onglet: OngletId;
  items: Item[];
};

export type OngletId = "boissons" | "plats";

export const onglets: { id: OngletId; label: string }[] = [
  { id: "boissons", label: "Boissons" },
  { id: "plats", label: "Cuisine iranienne" },
];

export const carte: Categorie[] = [
  {
    id: "non-cafeinees",
    nom: "Non caféinées",
    onglet: "boissons",
    items: [
      { nom: "Chocolat chaud", prix: 6 },
      { nom: "Golden latte", prix: 5.5 },
      { nom: "Lavande latte", prix: 4 },
      {
        nom: "Nectar d'Atelier",
        description: "Infusion de safran, graines de chia",
        prix: null,
      },
      { nom: "Infusion artisanale", prix: null },
    ],
  },
  {
    id: "cafeinees",
    nom: "Caféinées",
    onglet: "boissons",
    items: [
      { nom: "Espresso", prix: null },
      { nom: "Allongé", prix: null },
      { nom: "Café latté", prix: null },
    ],
  },
  {
    id: "plats-iraniens",
    nom: "Plats végétariens & véganes iraniens",
    onglet: "plats",
    items: [],
  },
];
