import { Reveal } from "./ui/Reveal";

const points = [
  { titre: "0 % de commission", texte: "Chaque réservation vous revient entièrement." },
  { titre: "Vos clients restent vos clients", texte: "Emails et coordonnées vous appartiennent." },
  { titre: "Vos règles, vos dates", texte: "Créneaux, tarifs et annulations décidés par vous." },
];

export function ZeroCommission() {
  return (
    <section className="section py-6 sm:py-10">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-[1.75rem] border border-sauge/25 bg-sauge/8 px-6 py-8 sm:px-10 sm:py-10">
          <p className="font-serif text-2xl leading-snug sm:text-3xl">
            Réservation en direct, chez vous.
          </p>
          <p className="mt-2 max-w-xl text-encre/65">
            Vos visiteurs réservent sur votre site, pas ailleurs. Pas d&rsquo;intermédiaire entre
            votre atelier et les gens qui viennent y passer la soirée.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {points.map((p) => (
              <div key={p.titre} className="border-t border-sauge/30 pt-4">
                <p className="font-medium text-encre">{p.titre}</p>
                <p className="mt-1 text-sm leading-relaxed text-encre/60">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
