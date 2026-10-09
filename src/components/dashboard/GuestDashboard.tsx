import { type ReactNode } from "react";
import {
  ArrowRight,
  AirplaneTakeoff,
  Bell,
  BellRinging,
  CalendarBlank,
  CaretRight,
  ChatCircle,
  CloudSun,
  DownloadSimple,
  Heart,
  MapPin,
  Star,
  Sun,
  UsersThree,
  WhatsappLogo,
} from "../../lib/icons";
import type { useTripPlanner } from "../../hooks/useTripPlanner";
import type { BrandState } from "../../hooks/useTripPlanner";
import type { Villa } from "../../data/trip";
import {
  activityBoards,
  familyGroups,
  guestFlightOptions,
  guestFullItinerary,
  guestHostUpdates,
  guestItineraryPreview,
  guestQuickNav,
  nearbyAmenities,
  packingTips,
  villaAmenityIcons,
  weatherForecast,
} from "../../data/guest-dashboard";
import { GuestStayGuide } from "./GuestStayGuide";
type Planner = ReturnType<typeof useTripPlanner>;

type Props = {
  planner: Planner;
  brand: BrandState;
  guestSummary: string;
  countdownDays: number;
  displayVilla: Villa | null;
  hasPinnedVilla: boolean;
  villaImageSrc: (villa: Villa) => string;
  deepSections: ReactNode;
};

export function GuestDashboard({
  planner,
  brand,
  guestSummary,
  countdownDays,
  displayVilla,
  hasPinnedVilla,
  villaImageSrc,
  deepSections,
}: Props) {
  const { destination, trip, formatDisplayDate, flightInsights, guestContentCache } = planner;

  const topFlight = flightInsights[0];
  const tripBrief = [
    "Micheau Family Trip",
    `${destination.displayName}`,
    `${formatDisplayDate(trip.checkIn)} - ${formatDisplayDate(trip.checkOut)} (${trip.nights} nights)`,
    `${trip.guests} travellers: ${guestSummary}`,
    "",
    "Flight watch",
    "Check direct Dublin (DUB) to Faro (FAO) routes first: Aer Lingus and Ryanair.",
    destination.airportTransfer
      ? `Airport transfer: ${destination.airportTransfer.distance}; ${destination.airportTransfer.driveTime}; ${destination.airportTransfer.taxiEstimate}.`
      : "",
    "",
    "Host note",
    "Luana is validating villas, nearby amenities, child needs, flights and seasonal activities before final sharing.",
  ].join("\n");
  const tripBriefUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(tripBrief)}`;
  const whatsappMessage = encodeURIComponent(
    `Hi family, I checked the Micheau Family Trip page. Let's talk flights and plans for ${destination.displayName}.`,
  );
  const hostWhatsAppNumber = import.meta.env.VITE_HOST_WHATSAPP_NUMBER;
  const whatsappGroupUrl = import.meta.env.VITE_HOST_WHATSAPP_GROUP_URL;
  const whatsappUrl = whatsappGroupUrl || (hostWhatsAppNumber
    ? `https://wa.me/${hostWhatsAppNumber}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`);

  const villaPhotos = displayVilla?.galleryImages?.length
    ? displayVilla.galleryImages
    : displayVilla
      ? [villaImageSrc(displayVilla)]
      : [];
  const villaThumbs = villaPhotos.slice(1, 11);
  const villaMoreCount = Math.max(0, villaPhotos.length - 11);
  const heroPhoto = villaPhotos[0] || destination.heroImage;

  return (
    <div className="dashboard-app guest-app" id="overview">
      <div className="guest-main">
        <header className="guest-topbar dashboard-topbar">
          <a className="dashboard-brand" href="#overview">
            <img src={brand.logo} alt="" />
            <div className="dashboard-brand-text">
              <strong>Micheau</strong>
              <span>Family trip</span>
            </div>
          </a>
          <div className="guest-access-pill" aria-label="Guest access">
            <span>Beta</span>
            Guest trip page
          </div>
          <div className="dashboard-topbar-actions">
            <button type="button" className="dashboard-icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="badge">{guestHostUpdates.length}</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dashboard-icon-btn"
              aria-label="Message Luana on WhatsApp"
            >
              <ChatCircle size={20} />
            </a>
            <div className="dashboard-host-profile">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
                alt=""
                width={36}
                height={36}
              />
              <div>
                <strong>Luana</strong>
              </div>
              <CaretRight size={16} aria-hidden />
            </div>
          </div>
        </header>

        <section className="tti-hero" aria-label="Trip welcome">
          <div className="tti-hero-copy">
            <p className="tti-kicker">
              <span aria-hidden="true" /> For the Micheau family
            </p>
            <h1>
              Our <span className="tti-mark">{destination.label}</span> family escape
            </h1>
            <p className="guest-hero-tagline">
              Sun, sea and memories
              <Heart size={18} weight="regular" className="guest-heart-outline" aria-hidden />
            </p>
            <p className="guest-hero-dates">
              <CalendarBlank size={18} aria-hidden />
              {formatDisplayDate(trip.checkIn)} – {formatDisplayDate(trip.checkOut)} · {trip.nights}{" "}
              nights
            </p>
          </div>
          <div className="tti-hero-side">
            <img src={heroPhoto} alt={displayVilla?.imageFallback || ""} />
            <aside className="dashboard-countdown-float" aria-label="Trip countdown">
              <div className="dashboard-countdown-top">
                <p className="eyebrow">Trip countdown</p>
                <span className="dashboard-countdown-sun-badge" aria-hidden>
                  <Sun size={22} weight="fill" />
                </span>
              </div>
              <strong>{countdownDays}</strong>
              <span>days to go</span>
              <span className="dashboard-countdown-dates">
                {formatDisplayDate(trip.checkIn)} → {formatDisplayDate(trip.checkOut)}
              </span>
            </aside>
          </div>
        </section>

        <section className="guest-info-strip" aria-label="Trip facts">
          <div>
            <MapPin size={22} aria-hidden />
            <div>
              <span>Destination</span>
              <strong>{destination.displayName}</strong>
            </div>
          </div>
          <div>
            <CalendarBlank size={22} aria-hidden />
            <div>
              <span>Dates</span>
              <strong>
                {formatDisplayDate(trip.checkIn)} – {formatDisplayDate(trip.checkOut)}, {trip.nights}{" "}
                nights
              </strong>
            </div>
          </div>
          <div>
            <UsersThree size={22} aria-hidden />
            <div>
              <span>Travellers</span>
              <strong>
                {trip.guests} travellers · {guestSummary}
              </strong>
            </div>
          </div>
          <div>
            <AirplaneTakeoff size={22} aria-hidden />
            <div>
              <span>Airport transfer</span>
              <strong>
                {destination.airportTransfer?.driveTime ?? "Confirm after villa address"} ·{" "}
                {destination.airportTransfer?.taxiEstimate ?? "fare varies"}
              </strong>
            </div>
          </div>
          <div>
            <CloudSun size={22} aria-hidden />
            <div>
              <span>Weather</span>
              <strong>16–19°C · Partly sunny</strong>
            </div>
          </div>
        </section>

        <article className="dashboard-panel guest-villa-panel guest-villa-feature" id="pinned">
          <div className="dashboard-panel-header">
            <h2>Your villa reveal</h2>
            <a
              href={displayVilla?.bookingUrl || "#pinned"}
              target={displayVilla?.bookingUrl ? "_blank" : undefined}
              rel={displayVilla?.bookingUrl ? "noopener noreferrer" : undefined}
            >
              Airbnb listing
            </a>
          </div>
          <div className="dashboard-panel-body">
            {displayVilla ? (
              <>
                <div className="guest-villa-gallery">
                    <img
                      className="guest-villa-main"
                      src={villaPhotos[0]}
                      alt={displayVilla.name}
                      loading="eager"
                    />
                    <div className="guest-villa-thumbs">
                      {villaThumbs.map((src, index) => (
                        <img key={src} src={src} alt={`Villa preview ${index + 2}`} loading="eager" />
                      ))}
                      {villaMoreCount > 0 ? (
                        <span className="guest-villa-more">+{villaMoreCount} photos</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="guest-villa-headline">
                    <div>
                      {hasPinnedVilla ? (
                        <span className="dashboard-pill-top">Top pick</span>
                      ) : (
                        <span className="dashboard-pill-top guest-pill-muted">Shortlist preview</span>
                      )}
                      <h3>{displayVilla.name}</h3>
                      <p>
                        {displayVilla.area.split("/")[0]?.trim()} · {displayVilla.bedrooms} bed ·{" "}
                        {displayVilla.bathrooms} bath · Heatable pool
                      </p>
                      {displayVilla.address ? <p>{displayVilla.address}</p> : null}
                    </div>
                    <p className="guest-villa-rating">
                      <Star size={16} weight="fill" aria-hidden />
                      {displayVilla.rating} <span>{displayVilla.source}</span>
                    </p>
                  </div>
                  <p className="guest-villa-copy">{displayVilla.note}</p>
                <div className="guest-villa-amenities">
                  {villaAmenityIcons.map((item) => {
                    const Icon = item.icon;
                    return (
                      <span key={item.label}>
                        <Icon size={16} aria-hidden /> {item.label}
                      </span>
                    );
                  })}
                </div>
                  <a
                    href={displayVilla.bookingUrl || "#pinned"}
                    target={displayVilla.bookingUrl ? "_blank" : undefined}
                    rel={displayVilla.bookingUrl ? "noopener noreferrer" : undefined}
                    className="guest-text-link"
                  >
                    See Airbnb listing <ArrowRight size={14} aria-hidden />
                  </a>
              </>
            ) : (
              <p>No villa shortlisted yet. Ask your host to pin the final stay.</p>
            )}
          </div>
        </article>

        <section className="guest-family-channel" aria-label="Family trip channel">
          <div className="guest-section-head">
            <div>
              <h2>Family trip channel</h2>
              <p>One shared place for flights, the villa reveal, plans and updates for all 13 travellers.</p>
            </div>
            <div className="guest-channel-actions">
              <a href={tripBriefUrl} download="micheau-family-trip-brief.txt">
                <DownloadSimple size={16} aria-hidden />
                Download trip brief
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={17} aria-hidden />
                Family WhatsApp
              </a>
            </div>
          </div>
          <div className="guest-live-updates" aria-label="Host updates">
            <div className="guest-live-updates-head">
              <BellRinging size={20} weight="duotone" aria-hidden />
              <div>
                <strong>Luana updates</strong>
                <span>Notifications from the host will appear here first.</span>
              </div>
            </div>
            <div className="guest-update-list">
              {guestHostUpdates.map((update) => (
                <article key={update.title} className="guest-update-card">
                  <span>{update.time}</span>
                  <strong>{update.title}</strong>
                  <p>{update.body}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="guest-family-groups">
            {familyGroups.map((group) => (
              <article key={group.label} className="guest-family-group-card">
                <span>{group.count}</span>
                <div>
                  <strong>{group.label}</strong>
                  <p>{group.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guest-travel-priority" aria-label="Flights and seasonal weather">
          <article className="dashboard-panel guest-flight-card">
            <div className="dashboard-panel-header">
              <div>
                <h2>Flights &amp; travel tips</h2>
                <p>Find the best routes into {destination.airport.city} for the family dates.</p>
              </div>
              <AirplaneTakeoff size={22} aria-hidden />
            </div>
            <div className="dashboard-panel-body">
              <strong>{topFlight?.route ?? `Dublin → ${destination.airport.code}`}</strong>
              <span>{topFlight?.action ?? "Search fares and book soon"}</span>
              <p>{topFlight?.nudge ?? "Christmas travel can move quickly, so compare outbound and return seats early."}</p>
              {destination.airportTransfer ? (
                <div className="guest-transfer-card" aria-label="Airport transfer estimate">
                  <div>
                    <span>Faro Airport to Albufeira</span>
                    <strong>{destination.airportTransfer.distance}</strong>
                  </div>
                  <dl>
                    <div>
                      <dt>Drive</dt>
                      <dd>{destination.airportTransfer.driveTime}</dd>
                    </div>
                    <div>
                      <dt>Taxi</dt>
                      <dd>{destination.airportTransfer.taxiEstimate}</dd>
                    </div>
                    <div>
                      <dt>Family transfer</dt>
                      <dd>{destination.airportTransfer.privateTransferEstimate}</dd>
                    </div>
                  </dl>
                  <p>{destination.airportTransfer.note}</p>
                </div>
              ) : null}
              <div className="guest-flight-options">
                {guestFlightOptions.map((flight) => (
                  <article key={flight.airline}>
                    <div>
                      <strong>{flight.airline}</strong>
                      <span>{flight.status}</span>
                    </div>
                    <p>{flight.route}</p>
                    <dl>
                      <div>
                        <dt>Best time</dt>
                        <dd>{flight.depart}</dd>
                      </div>
                      <div>
                        <dt>Why</dt>
                        <dd>{flight.bestFor}</dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
              <p className="guest-flight-source-note">
                Current route data shows direct Aer Lingus and Ryanair options from Dublin to Faro.
                Christmas 2026 times and fares must be checked before booking.
              </p>
              <a
                href={topFlight?.searchUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="guest-btn-primary"
              >
                Search on Google Flights <ArrowRight size={16} aria-hidden />
              </a>
            </div>
          </article>

          <article className="dashboard-panel guest-weather-panel guest-weather-priority">
            <div className="dashboard-panel-header">
              <div>
                <h2>{destination.label} in late December</h2>
                <p>Typical winter planning range for the trip window.</p>
              </div>
              <Sun size={24} weight="fill" aria-hidden />
            </div>
            <div className="dashboard-panel-body">
              <div className="guest-weather-row">
                {weatherForecast.map((day) => {
                  const Icon = day.icon;
                  return (
                    <div key={day.day} className="guest-weather-day">
                      <span>{day.day}</span>
                      <Icon size={24} aria-hidden />
                      <strong>
                        {day.high}° / {day.low}°
                      </strong>
                    </div>
                  );
                })}
              </div>
              <p className="guest-weather-note">Partly sunny · Mild days · Cool evenings</p>
            </div>
          </article>
        </section>

        <nav className="guest-quick-nav" aria-label="Quick links">
          {guestQuickNav.map((item) => {
            const Icon = item.icon;
            return (
              <a key={item.id} href={item.href} className={`guest-quick-card tone-${item.tone}`}>
                <span className={`dashboard-quick-icon ${item.tone}`}>
                  <Icon size={22} weight="duotone" aria-hidden />
                </span>
                <strong>
                  {item.label} <ArrowRight size={14} aria-hidden />
                </strong>
              </a>
            );
          })}
        </nav>

        <div className="guest-grid-2">
          <article className="dashboard-panel" id="plan">
            <div className="dashboard-panel-header">
              <h2>Itinerary overview</h2>
              <a href="#full-itinerary">View full itinerary →</a>
            </div>
            <div className="dashboard-panel-body">
              <div className="guest-itinerary-timeline">
                {guestItineraryPreview.map((day) => {
                  const Icon = day.icon;
                  return (
                    <div key={day.date} className="guest-itinerary-day">
                      <span className="guest-itinerary-date">{day.date}</span>
                      <span className="guest-itinerary-icon">
                        <Icon size={20} aria-hidden />
                      </span>
                      <strong>{day.label}</strong>
                      <span>{day.sub}</span>
                    </div>
                  );
                })}
              </div>
              <p className="guest-itinerary-footer">
                <UsersThree size={16} aria-hidden />
                {trip.nights} nights · {trip.guests} travellers
              </p>
            </div>
          </article>
        </div>

        <section className="dashboard-panel guest-full-itinerary" id="full-itinerary">
          <div className="dashboard-panel-header">
            <div>
              <h2>Full itinerary</h2>
              <p>Draft family plan for the full Algarve stay. Luana can update it as bookings firm up.</p>
            </div>
            <a href="#plan">Back to overview ↑</a>
          </div>
          <div className="dashboard-panel-body guest-full-itinerary-list">
            {guestFullItinerary.map((item) => (
              <article key={`${item.date}-${item.title}`} className="guest-full-itinerary-row">
                <time>{item.date}</time>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.plan}</p>
                  <span>{item.familyNote}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="guest-activities-section" id="activitiesTitle" aria-labelledby="guestActivitiesTitle">
          <div className="guest-section-head">
            <div>
              <h2 id="guestActivitiesTitle">Things to do by age and moment</h2>
              <p>Researched Algarve ideas for toddler needs, older kids, Christmas and New Year.</p>
            </div>
          </div>
          <div className="guest-activity-board">
            {activityBoards.map((board) => (
              <article key={board.title} className="guest-activity-board-card">
                <div className="guest-activity-board-head">
                  <h3>{board.title}</h3>
                  <p>{board.intro}</p>
                </div>
                <div className="guest-activity-list">
                  {board.items.map((activity) => (
                    <article key={activity.name} className="guest-activity-card">
                      <img src={activity.image} alt="" loading="lazy" />
                      <span className="guest-activity-badge">{activity.tag}</span>
                      <button type="button" className="guest-activity-heart" aria-label="Save activity">
                        <Heart size={18} />
                      </button>
                      <div className="guest-activity-body">
                        <strong>{activity.name}</strong>
                        <span>{activity.meta}</span>
                        <p>{activity.note}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="guest-research-note">
            Seasonal event dates for 2026/27 are not fully published yet. This page uses validated
            seasonal patterns and should be refreshed when official winter calendars go live.
          </p>
        </section>

        <GuestStayGuide />

        <div className="guest-grid-2 guest-support-grid">
          <article className="dashboard-panel" id="amenities">
            <div className="dashboard-panel-header">
              <div>
                <h2>Nearby amenities</h2>
                <p>
                  Populated from the pinned villa area. Host can refresh this after adding the
                  Albufeira villa address or exact location.
                </p>
              </div>
            </div>
            <div className="dashboard-panel-body guest-amenity-grid">
              {guestContentCache?.nearbyAmenities?.length
                ? guestContentCache.nearbyAmenities.map((item) => (
                    <div key={item.label} className="guest-amenity-tile guest-amenity-tile-live">
                      <MapPin size={22} aria-hidden />
                      <strong>{item.name}</strong>
                      <span>
                        {item.label} · {item.distance}
                      </span>
                    </div>
                  ))
                : nearbyAmenities.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="guest-amenity-tile">
                        <Icon size={22} aria-hidden />
                        <strong>{item.label}</strong>
                        <span>{item.distance}</span>
                      </div>
                    );
                  })}
            </div>
            {guestContentCache ? (
              <p className="guest-cache-note">
                Google Places refreshed by host ({new Date(guestContentCache.updatedAt).toLocaleDateString()}
                ).
              </p>
            ) : (
              <p className="guest-cache-note">
                Placeholder distances until Luana refreshes nearby places from the chosen villa area.
              </p>
            )}
          </article>

          <article className="dashboard-panel" id="packing">
            <div className="dashboard-panel-header">
              <h2>Packing &amp; practical tips</h2>
            </div>
            <div className="dashboard-panel-body guest-packing-grid">
              {packingTips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div key={tip.label} className="guest-packing-tile">
                    <Icon size={20} aria-hidden />
                    <span>{tip.label}</span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>

        <section className="guest-family-memory" aria-label="Family travel note">
          <div>
            <span className="guest-memory-kicker">A little family thread</span>
            <h2>Everyone has one thing they want from this trip.</h2>
            <p>
              Warm mornings, easy dinners, kids with sand in their shoes, and a plan simple enough
              that nobody has to hold the whole holiday in their head.
            </p>
          </div>
          <ol className="guest-thread" aria-label="Dublin to the villa">
            <li>
              <span>Dublin</span>
              <small>Leave from here</small>
            </li>
            <li>
              <span>Faro</span>
              <small>Land and transfer</small>
            </li>
            <li>
              <span>Albufeira</span>
              <small>Villa Sapphire</small>
            </li>
          </ol>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="guest-memory-link">
            Tell the family group what matters to you <WhatsappLogo size={16} aria-hidden />
          </a>
        </section>

        {deepSections ? <div className="guest-deep-sections">{deepSections}</div> : null}

        <footer className="guest-powered">
          <span>{brand.name}</span>
          <strong>Powered by TinyTripIndex</strong>
        </footer>
      </div>
    </div>
  );
}
