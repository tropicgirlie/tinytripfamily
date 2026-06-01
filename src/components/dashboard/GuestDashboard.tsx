import { type ReactNode, useMemo } from "react";
import {
  ArrowRight,
  Bell,
  CalendarBlank,
  CaretRight,
  ChatCircle,
  CloudSun,
  Heart,
  MapPin,
  Star,
  Sun,
  UsersThree,
} from "@phosphor-icons/react";
import type { useTripPlanner } from "../../hooks/useTripPlanner";
import type { BrandState } from "../../hooks/useTripPlanner";
import type { Villa } from "../../data/trip";
import {
  defaultFeaturedActivities,
  guestItineraryPreview,
  guestQuickNav,
  nearbyAmenities,
  packingTips,
  villaAmenityIcons,
  weatherForecast,
} from "../../data/guest-dashboard";
type Planner = ReturnType<typeof useTripPlanner>;

type Props = {
  planner: Planner;
  brand: BrandState;
  switchView: (mode: "guest" | "host") => void;
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
  switchView,
  guestSummary,
  countdownDays,
  displayVilla,
  hasPinnedVilla,
  villaImageSrc,
  deepSections,
}: Props) {
  const { destination, trip, formatDisplayDate, activities } = planner;

  const heroStyle = { ["--hero-beach" as string]: `url("${destination.heroImage}")` };

  const featuredActivities = useMemo(() => {
    const fromData = activities.slice(0, 5).map((a, i) => ({
      name: a.name,
      meta: a.area,
      badge: i === 0 ? "Top pick" : undefined,
      image: defaultFeaturedActivities[i]?.image ?? defaultFeaturedActivities[0].image,
    }));
    return fromData.length >= 4 ? fromData : defaultFeaturedActivities;
  }, [activities]);

  const villaPhotos = displayVilla
    ? [
        villaImageSrc(displayVilla),
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&h=280&q=80",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&h=280&q=80",
      ]
    : [];

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
          <div className="dashboard-view-toggle" role="tablist" aria-label="View mode">
            <button type="button" className="is-active" aria-current="page">
              Guest view
            </button>
            <button type="button" onClick={() => switchView("host")}>
              Host view
            </button>
          </div>
          <div className="dashboard-topbar-actions">
            <button type="button" className="dashboard-icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <button type="button" className="dashboard-icon-btn" aria-label="Messages">
              <ChatCircle size={20} />
            </button>
            <div className="dashboard-host-profile">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
                alt=""
                width={36}
                height={36}
              />
              <div>
                <strong>Michelle</strong>
              </div>
              <CaretRight size={16} aria-hidden />
            </div>
          </div>
        </header>

        <section className="guest-hero dashboard-hero" style={heroStyle} aria-label="Trip welcome">
          <div className="guest-hero-inner dashboard-hero-inner">
            <div>
              <h1>
                Our <span>{destination.label}</span> family escape
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
            <CloudSun size={22} aria-hidden />
            <div>
              <span>Weather</span>
              <strong>16–19°C · Partly sunny</strong>
            </div>
          </div>
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
          <article className="dashboard-panel guest-villa-panel" id="pinned">
            <div className="dashboard-panel-header">
              <h2>Your villa reveal</h2>
              <a href="#pinned">View details</a>
            </div>
            <div className="dashboard-panel-body">
              {displayVilla ? (
                <>
                  <div className="guest-villa-gallery">
                    <img
                      className="guest-villa-main"
                      src={villaPhotos[0]}
                      alt={displayVilla.name}
                      loading="lazy"
                    />
                    <div className="guest-villa-thumbs">
                      <img src={villaPhotos[1]} alt="" loading="lazy" />
                      <img src={villaPhotos[2]} alt="" loading="lazy" />
                      <span className="guest-villa-more">+12 photos</span>
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
                        {displayVilla.area.split("/")[0]?.trim()} · {displayVilla.bedrooms} bed · Pool
                        · Sea view
                      </p>
                    </div>
                    <p className="guest-villa-rating">
                      <Star size={16} weight="fill" aria-hidden />
                      {displayVilla.rating} <span>(48 reviews)</span>
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
                  <a href="#pinned" className="guest-text-link">
                    See villa details <ArrowRight size={14} aria-hidden />
                  </a>
                </>
              ) : (
                <p>No villa shortlisted yet. Ask your host to pin the final stay.</p>
              )}
            </div>
          </article>

          <article className="dashboard-panel" id="plan">
            <div className="dashboard-panel-header">
              <h2>Itinerary overview</h2>
              <a href="#plan">View full itinerary →</a>
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

        <section className="guest-activities-section" id="activitiesTitle" aria-labelledby="guestActivitiesTitle">
          <div className="guest-section-head">
            <h2 id="guestActivitiesTitle">Things to do</h2>
            <a href="#activitiesTitle">See all activities →</a>
          </div>
          <div className="guest-activities-scroll">
            {featuredActivities.map((activity) => (
              <article key={activity.name} className="guest-activity-card">
                <img src={activity.image} alt="" loading="lazy" />
                {activity.badge ? <span className="guest-activity-badge">{activity.badge}</span> : null}
                <button type="button" className="guest-activity-heart" aria-label="Save activity">
                  <Heart size={18} />
                </button>
                <div className="guest-activity-body">
                  <strong>{activity.name}</strong>
                  <span>{activity.meta}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="guest-grid-3">
          <article className="dashboard-panel" id="amenities">
            <div className="dashboard-panel-header">
              <h2>Nearby amenities</h2>
            </div>
            <div className="dashboard-panel-body guest-amenity-grid">
              {nearbyAmenities.map((item) => {
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
          </article>

          <article className="dashboard-panel guest-weather-panel">
            <div className="dashboard-panel-header">
              <h2>Weather in {destination.label}</h2>
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
              <p className="guest-weather-note">Partly sunny · Mild · Low chance of rain</p>
            </div>
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

        <section className="guest-footer-cta" aria-label="Trip encouragement">
          <Heart size={48} weight="regular" className="guest-footer-heart" aria-hidden />
          <div>
            <h2>Let&apos;s make this trip unforgettable</h2>
            <p>Relax, explore and enjoy every moment together.</p>
          </div>
          <div className="guest-footer-actions">
            <a href="#plan" className="guest-btn-primary">
              See full itinerary <ArrowRight size={16} aria-hidden />
            </a>
            <a href="#activitiesTitle" className="guest-btn-outline">
              Explore things to do <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </section>

        <div className="guest-deep-sections">{deepSections}</div>

        <footer className="guest-powered">
          <span>{brand.name}</span>
          <strong>Powered by TinyTripIndex</strong>
        </footer>
      </div>
    </div>
  );
}
