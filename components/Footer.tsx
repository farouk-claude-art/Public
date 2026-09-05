import { site } from "@/data/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer id="infos" className="scroll-mt-20 border-t border-encre/10 bg-creme-warm">
      <div className="section grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Wordmark className="text-3xl" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-encre/60">
            Café-atelier créatif ouvert à tous, du premier pinceau à la dernière note.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <span className="text-ocre" aria-hidden>
              ★★★★★
            </span>
            <span className="text-sm text-encre/60">
              {site.note.toString().replace(".", ",")} · {site.nbAvis} avis Google
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg">Nous trouver</h3>
          <address className="mt-3 space-y-1 text-sm not-italic leading-relaxed text-encre/65">
            <p>{site.adresse}</p>
            <p>{site.metro}</p>
            <p className="pt-2">{site.telephone}</p>
            <p>{site.email}</p>
          </address>
        </div>

        <div>
          <h3 className="font-serif text-lg">Horaires</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-encre/65">
            {site.horaires.map((h) => (
              <li key={h.jour} className="flex justify-between gap-4">
                <span>{h.jour}</span>
                <span className="text-encre/45">{h.heures}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg">Suivez-nous</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {site.reseaux.map((r) => (
              <li key={r.nom}>
                <a
                  href={r.href}
                  className="text-encre/65 transition-colors hover:text-terracotta"
                >
                  {r.nom}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-encre/8">
        <div className="section flex flex-col gap-2 py-5 text-xs text-encre/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Art&rsquo;péro — Paris 5e</p>
          <p>Maquette de démonstration — réservations et paiements simulés.</p>
        </div>
      </div>
    </footer>
  );
}
