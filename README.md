# Art'péro — maquette de démonstration

> **Ceci est une maquette de démonstration.** Aucune base de données, aucun paiement :
> les réservations et les demandes de devis sont simulées en mémoire (React state) et
> disparaissent au rechargement de la page.

Site vitrine + tunnel de réservation en direct pour **Art'péro**, café-atelier créatif
situé 5 rue Georges Desplas, Paris 5e.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000. Conçu mobile-first — à voir de préférence sur un
téléphone ou en vue mobile du navigateur.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Ce qu'il y a dedans

- **Hero** avec wordmark maison et badge Google 4,8★
- **4 ateliers** (peinture sur soie, totems, jam, découverte) avec places restantes en direct
- **Tunnel de réservation en 3 étapes** : date & créneau → coordonnées → confirmation animée.
  Les places restantes se décrémentent réellement après une réservation.
- **Section entreprises / privatisation** avec formulaire de demande de devis validé
- **Galerie** façon Instagram (6 vignettes placeholder)
- **Encart « réservation en direct, 0 % de commission »**
- **La carte du café** : bandeau « Au comptoir » et entrée de nav qui ouvrent une modale
  à onglets (Tout / Boissons / Cuisine iranienne), même traitement que la réservation

## Éditer le contenu

| Fichier | Contenu |
| --- | --- |
| `data/ateliers.ts` | ateliers, prix, durées, jours d'ouverture, créneaux, places, formules entreprise |
| `data/site.ts` | adresse, horaires, réseaux, note Google, vignettes de la galerie |
| `data/menu.ts` | la carte du café — **incomplète**, voir l'avertissement en tête de fichier |
| `tailwind.config.ts` | palette (terracotta, ocre, crème, sauge, indigo) |

Les vignettes de la galerie et le visuel du hero sont des dégradés placeholder :
remplacez-les par de vraies photos dans `public/` quand elles sont disponibles.
