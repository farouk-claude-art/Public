# Leads Google Maps — artisans / BTP

Genere un Excel de prospects a partir de Google Maps, filtres sur les criteres commerciaux :

| Critere | Valeur par defaut |
|---|---|
| Note Google | >= 4.7 |
| Nombre d'avis | >= 5 (evite les 5,0 avec 1 avis) |
| Site web | **aucun** — c'est la cible |
| Telephone | obligatoire |
| Etablissement | en activite |

## Installation

```bash
pip install -r requirements.txt
```

## Cle API

Il faut une cle Google Cloud avec **Places API (New)** activee :
console.cloud.google.com → APIs & Services → Enable APIs → "Places API (New)" → Credentials → Create API key.

```bash
export GOOGLE_MAPS_API_KEY="AIza..."
```

## Utilisation

```bash
python3 generate_leads.py                              # config.json, Casablanca
python3 generate_leads.py --city "Rabat, Maroc" --out leads_rabat.xlsx
```

Les categories et les seuils se modifient dans `config.json` :

```json
"filters": { "min_rating": 4.7, "min_reviews": 5, "require_no_website": true }
```

Mettre `"strict_greater_than": true` pour du strictement superieur a 4.7.

## Sortie

`leads_maps.xlsx` — deux onglets :
- **Leads** : tableau filtrable, une ligne par etablissement, lien cliquable vers la fiche Maps, colonnes `Statut contact` et `Notes` a remplir pendant la prospection.
- **Criteres** : rappel des filtres appliques et du total, pour tracer d'ou vient le fichier.

## Limites a connaitre

- Google renvoie **60 resultats maximum par requete** (3 pages de 20). Pour couvrir une grande ville, decouper : une requete par quartier (`--city "plomberie Maarif, Casablanca"`) plutot qu'une seule requete ville entiere.
- L'absence de `websiteUri` sur la fiche ne garantit pas l'absence totale de site (certains ne mettent qu'une page Facebook, d'autres ont un site non reference sur Maps). C'est un bon signal, pas une preuve.
- Le Text Search est facture par requete : ~15 categories x 3 pages = ~45 appels par ville.
