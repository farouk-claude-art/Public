const JOURS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export type Jour = {
  date: Date;
  key: string;
  labelJour: string;
  labelNum: string;
  disponible: boolean;
};

/** Génère les N prochains jours, en marquant ceux où l'atelier a lieu. */
export function prochainsJours(joursOuverts: number[], n = 14, depuis = new Date()): Jour[] {
  const out: Jour[] = [];
  for (let i = 1; i <= n; i++) {
    const d = new Date(depuis);
    d.setDate(d.getDate() + i);
    out.push({
      date: d,
      key: d.toISOString().slice(0, 10),
      labelJour: JOURS[d.getDay()],
      labelNum: String(d.getDate()),
      disponible: joursOuverts.includes(d.getDay()),
    });
  }
  return out;
}

export function dateLongue(d: Date) {
  return `${JOURS[d.getDay()].replace(".", "")} ${d.getDate()} ${MOIS[d.getMonth()]}`;
}

export function euros(n: number) {
  return `${n} €`;
}

export function emailValide(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}
