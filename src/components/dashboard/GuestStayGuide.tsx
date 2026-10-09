import { useState } from "react";
import { ArrowRight, Train } from "../../lib/icons";
import {
  basket,
  dishes,
  foodPlaces,
  kidSpots,
  lisbonModes,
  lisbonRecommendation,
  staySources,
  supermarketStops,
  type LisbonModeId,
} from "../../data/stay-guide";

export function GuestStayGuide() {
  const [modeId, setModeId] = useState<LisbonModeId>("alfa");
  const mode = lisbonModes.find((item) => item.id === modeId) ?? lisbonModes[0];

  return (
    <div className="stay-guide">
      <section className="stay-guide-intro" aria-label="New notes for this stay">
        <p>Useful facts for this stay</p>
        <strong>An adults-only day in Lisbon, food, and the walk to the shops.</strong>
      </section>

      <section className="stay-block" id="lisbon-day" aria-labelledby="lisbonDayTitle">
        <div className="stay-block-head">
          <p>Day trip</p>
          <h2 id="lisbonDayTitle">
            A day in <span>Lisbon</span>
          </h2>
          <p>
            Adults only. The child stays at the villa. The Oceanário is already done, so this day
            goes into the city, not out to the aquarium.
          </p>
        </div>

        <div className="stay-mode-switch" role="radiogroup" aria-label="Ways to Lisbon">
          {lisbonModes.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={item.id === modeId}
              className={item.id === modeId ? "is-selected" : undefined}
              onClick={() => setModeId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <article className="stay-mode-card" aria-live="polite">
          <p className="stay-eyebrow">{mode.eyebrow}</p>
          <h3>{mode.label}</h3>
          <dl>
            <div>
              <dt>Time</dt>
              <dd>{mode.duration}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{mode.price}</dd>
            </div>
            <div>
              <dt>Why it fits</dt>
              <dd>{mode.fit}</dd>
            </div>
          </dl>
          <ul>
            {mode.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>

        <aside className="stay-recommend">
          <Train size={28} aria-hidden />
          <div>
            <p>Recommendation</p>
            <h3>{lisbonRecommendation.title}</h3>
            <p>{lisbonRecommendation.body}</p>
            <p>{lisbonRecommendation.note}</p>
          </div>
        </aside>

        <article className="stay-sitter">
          <h3>Who stays with the child</h3>
          <p>
            Babysits currently lists 121 active sitters in Albufeira, with an identity check before
            anyone can message, and an average rate of €9.25 an hour. Yoopies also lists local
            sitters, each with a rate on the profile. Book ahead for the Lisbon day and for New
            Year’s Eve. These are marketplaces, not a sitter the family has already met.
          </p>
          <a href="https://www.babysits.pt/babysitter/albufeira/" target="_blank" rel="noopener noreferrer">
            Look up Albufeira sitters <ArrowRight size={16} aria-hidden />
          </a>
        </article>
      </section>

      <section className="stay-block" id="stay-food" aria-labelledby="stayFoodTitle">
        <div className="stay-block-head">
          <p>Food</p>
          <h2 id="stayFoodTitle">
            What to <span>eat</span>
          </h2>
          <p>
            Winter in the Algarve is cataplana, citrus and Christmas cake. Grilled sardines are a
            summer dish, so they are not the thing to chase on this trip.
          </p>
        </div>
        <div className="stay-dish-grid">
          {dishes.map((dish) => (
            <article key={dish.name}>
              <h3>{dish.name}</h3>
              <p>{dish.note}</p>
            </article>
          ))}
        </div>
        <div className="stay-place-row">
          {foodPlaces.map((place) => (
            <article key={place.name}>
              <h3>{place.name}</h3>
              <p>{place.where}</p>
              <p>{place.why}</p>
            </article>
          ))}
        </div>
        <p className="stay-inline-note">
          On the Lisbon day, eat in the city and leave Belém for another time. One long lunch is
          enough once the train ride is counted.
        </p>
      </section>

      <section className="stay-block" id="stay-shop" aria-labelledby="stayShopTitle">
        <div className="stay-block-head">
          <p>Supermarket</p>
          <h2 id="stayShopTitle">
            What to pick up and <span>try</span>
          </h2>
          <p>Walk times are from Rua Almeida Garrett, the villa street, to the shop door.</p>
        </div>
        <div className="stay-place-row">
          {supermarketStops.map((stop) => (
            <article key={stop.name}>
              <h3>{stop.name}</h3>
              <p className="stay-walk">{stop.walk}</p>
              <p>{stop.where}</p>
              <p>{stop.note}</p>
            </article>
          ))}
        </div>
        <ul className="stay-basket">
          {basket.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="stay-block" id="stay-kids" aria-labelledby="stayKidsTitle">
        <div className="stay-block-head">
          <p>Kids nearby</p>
          <h2 id="stayKidsTitle">
            Parks, a play day, and a <span>sitter</span>
          </h2>
          <p>For the people staying at the villa, including the 2-year-old. Lisbon is a separate adult day.</p>
        </div>
        <div className="stay-kid-grid">
          {kidSpots.map((spot) => (
            <article key={spot.title}>
              <span>{spot.meta}</span>
              <h3>{spot.title}</h3>
              <p>{spot.body}</p>
            </article>
          ))}
        </div>
      </section>

      <details className="stay-sources">
        <summary>Where these facts came from</summary>
        <ul>
          {staySources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
