import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  CaretRight,
  ChatCircle,
  Lifebuoy,
  PencilSimple,
  Sun,
} from "@phosphor-icons/react";
import type { useTripPlanner } from "../../hooks/useTripPlanner";
import { currency } from "../../lib/format";
import type { Villa } from "../../data/trip";
import { PinnedSection } from "../PinnedSection";
import { VillaCard } from "../VillaCard";
import {
  budgetBreakdown,
  dashboardNav,
  demoTravelers,
  documents,
  guestSection,
  hostTasks,
  itineraryDays,
  itineraryHighlights,
  quickActions,
  recentActivity,
  settingsRows,
  travelPreferences,
} from "../../data/dashboard";
import type { FamilyMember } from "../../hooks/useTripPlanner";

type Planner = ReturnType<typeof useTripPlanner>;

type Props = {
  planner: Planner;
  hostPlanning: ReactNode;
  matchedVillas: Villa[];
  tripNights: number;
  pinnedVillaName: string;
  onPinVilla: (name: string) => void;
  villaImageSrc: Planner["villaImageSrc"];
  hasPinnedVilla: boolean;
  pinnedVilla: Villa | null;
  selectedGuessName: string;
  setSelectedGuessName: (name: string) => void;
  resetMystery: () => void;
  spinning: boolean;
  setSpinning: (v: boolean) => void;
  pinVilla: (name: string) => void;
  brandSubdomain: string;
};

function Sparkline({ up }: { up: boolean }) {
  const stroke = up ? "var(--dash-red)" : "var(--dash-green)";
  const points = up ? "4,22 18,14 32,18 46,8 60,12 68,6" : "4,8 18,14 32,10 46,18 60,12 68,20";
  return (
    <svg className="dashboard-sparkline" viewBox="0 0 72 28" aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function villaMeta(villa: Villa) {
  const bits = [
    villa.area.split("/")[0]?.trim() || villa.area,
    `${villa.bedrooms} bed`,
    villa.amenities.includes("heated pool") ? "Pool" : null,
    villa.amenities.includes("beach nearby") ? "Beach" : "Sea view",
  ].filter(Boolean);
  return bits.join(" · ");
}

function travelerPhoto(member: FamilyMember, index: number) {
  if (demoTravelers[index]) return demoTravelers[index].photo;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=dff5ee&color=0f2d3d&size=120`;
}

export function HostDashboard({
  planner,
  hostPlanning,
  matchedVillas: allVillas,
  tripNights,
  pinnedVillaName,
  onPinVilla,
  villaImageSrc: imageForVilla,
  hasPinnedVilla,
  pinnedVilla,
  selectedGuessName,
  setSelectedGuessName,
  resetMystery,
  spinning,
  setSpinning,
  pinVilla,
  brandSubdomain,
}: Props) {
  const {
    switchView,
    brand,
    destination,
    trip,
    countdownDays,
    matchedVillas,
    flightInsights,
    formatDisplayDate,
    villaImageSrc,
    villaPricePerNight,
    originCity,
    familyMembers,
    getAgeGroup,
  } = planner;

  const heroStyle = { ["--hero-beach" as string]: `url("${destination.heroImage}")` };
  const [tasks, setTasks] = useState(hostTasks);

  const shortlist = matchedVillas.slice(0, 3);
  const completedTasks = tasks.filter((t) => t.done).length;
  const progressPct = Math.round((completedTasks / tasks.length) * 100);

  const travelerSummary = useMemo(() => {
    if (!familyMembers.length) return "Family (2 adults + 2 kids + 1 toddler)";
    const adults = familyMembers.filter((m) => getAgeGroup(m.age) === "adults").length;
    const kids = familyMembers.filter((m) => {
      const g = getAgeGroup(m.age);
      return g === "kids" || g === "teens" || g === "toddler";
    }).length;
    const toddlers = familyMembers.filter((m) => getAgeGroup(m.age) === "toddler").length;
    const parts: string[] = [];
    if (adults) parts.push(`${adults} adult${adults === 1 ? "" : "s"}`);
    if (kids) parts.push(`${kids} kid${kids === 1 ? "" : "s"}`);
    if (toddlers) parts.push(`${toddlers} toddler${toddlers === 1 ? "" : "s"}`);
    return parts.length ? `Family (${parts.join(" + ")})` : `${familyMembers.length} travelers`;
  }, [familyMembers, getAgeGroup]);

  const profilePeople = familyMembers.length
    ? familyMembers.map((member, index) => ({
        name: member.name,
        role:
          index === 0
            ? "Host"
            : `${member.age} years old — ${getAgeGroup(member.age)}`,
        photo: travelerPhoto(member, index),
      }))
    : demoTravelers;

  const actionCards = useMemo(
    () =>
      quickActions.map((action) => {
        if (action.id === "villas") {
          return { ...action, meta: `${matchedVillas.length} villas shortlisted` };
        }
        if (action.id === "guests") {
          return {
            ...action,
            meta: `${profilePeople.length} traveler${profilePeople.length === 1 ? "" : "s"} added`,
          };
        }
        return action;
      }),
    [matchedVillas.length, profilePeople.length],
  );

  const flightRows = useMemo(() => {
    if (flightInsights.length >= 2) {
      return flightInsights.slice(0, 2).map((f, i) => ({
        route: f.route.replace("—", "→").replace(" - ", " → "),
        meta: i === 0 ? "Dec 27 · 1 stop" : "Jan 7 · 1 stop",
        price: i === 0 ? "€162" : "€175",
        trend: i === 0 ? "-8% since last week" : "+4% since last week",
        up: i === 1,
      }));
    }
    const code = destination.airport.code;
    const origin = originCity.slice(0, 3).toUpperCase();
    return [
      {
        route: `${origin} → ${code}`,
        meta: "Dec 27 · 1 stop",
        price: "€162",
        trend: "-8% since last week",
        up: false,
      },
      {
        route: `${code} → ${origin}`,
        meta: "Jan 7 · 1 stop",
        price: "€175",
        trend: "+4% since last week",
        up: true,
      },
    ];
  }, [flightInsights, destination.airport.code, originCity]);

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  return (
    <div className="dashboard-app" id="dashboard">
      <aside className="dashboard-sidebar" aria-label="Trip navigation">
        <a className="dashboard-brand" href="#dashboard">
          <img src={brand.logo} alt="" />
          <div className="dashboard-brand-text">
            <strong>Micheau</strong>
            <span>Family trip</span>
          </div>
        </a>
        <nav className="dashboard-nav" aria-label="Main">
          {dashboardNav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                className={item.active ? "is-active" : undefined}
              >
                <Icon size={20} weight={item.active ? "fill" : "regular"} aria-hidden />
                {item.label}
                {item.badge ? <span className="dashboard-nav-badge">{item.badge}</span> : null}
              </a>
            );
          })}
        </nav>
        <div className="dashboard-sidebar-card">
          <h3>Trip summary</h3>
          <ul>
            <li>
              <strong>{destination.label}</strong>
            </li>
            <li>
              {formatDisplayDate(trip.checkIn)} – {formatDisplayDate(trip.checkOut)}
            </li>
            <li>
              {trip.nights} nights / {trip.nights + 1} days
            </li>
            <li>{travelerSummary}</li>
          </ul>
          <a href={guestSection("plan")}>
            View full itinerary <ArrowRight size={14} aria-hidden />
          </a>
          <p style={{ margin: "10px 0 0", fontSize: "0.72rem", color: "var(--dash-muted)" }}>
            {brandSubdomain}.tinytripindex.com
          </p>
        </div>
        <div className="dashboard-help">
          <Lifebuoy size={22} weight="duotone" aria-hidden />
          <div>
            <strong>Need help?</strong>
            <p>Tips, guides and support for hosts.</p>
            <a href="#host-planning" className="dashboard-outline-btn">
              View host guide
            </a>
          </div>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-view-toggle" role="tablist" aria-label="View mode">
            <button type="button" onClick={() => switchView("guest")}>
              Guest view
            </button>
            <button type="button" className="is-active" aria-current="page">
              Host view
            </button>
            <span className="dashboard-planning-label">Planning controls</span>
          </div>
          <div className="dashboard-topbar-actions">
            <button type="button" className="dashboard-icon-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <button type="button" className="dashboard-icon-btn" aria-label="Messages">
              <ChatCircle size={20} />
              <span className="badge">21</span>
            </button>
            <div className="dashboard-host-profile">
              <img src={demoTravelers[0].photo} alt="" width={36} height={36} />
              <div>
                <strong>Host Michelle</strong>
              </div>
              <CaretRight size={16} aria-hidden />
            </div>
          </div>
        </header>

        <section className="dashboard-hero" style={heroStyle} aria-label="Trip overview">
          <div className="dashboard-hero-inner">
            <div>
              <span className="dashboard-hero-badge">Host dashboard</span>
              <h1>Our {destination.label} family escape</h1>
              <p>
                Paphos didn&apos;t work this year. {destination.label} gives us direct routes,
                winter sun, family villas and easier planning.
              </p>
              <a href="#host-planning" className="dashboard-hero-edit">
                <PencilSimple size={16} aria-hidden />
                Edit trip details
              </a>
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

        <section className="dashboard-pinned-wrap" id="pinned">
          <div className="dashboard-panel">
            <PinnedSection
              className="pinned-plan dashboard-pinned-inner"
              hasPinnedVilla={hasPinnedVilla}
              pinnedVilla={pinnedVilla}
              pinnedVillaName={pinnedVillaName}
              selectedGuessName={selectedGuessName}
              setSelectedGuessName={setSelectedGuessName}
              matchedVillas={matchedVillas}
              resetMystery={resetMystery}
              spinning={spinning}
              setSpinning={setSpinning}
              villaImageSrc={villaImageSrc}
            />
          </div>
        </section>

        <div className="dashboard-quick-actions" aria-label="Quick actions">
          {actionCards.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.id}
                className="dashboard-quick-card"
                href={action.href}
                onClick={
                  action.id === "share"
                    ? (e) => {
                        e.preventDefault();
                        switchView("guest");
                      }
                    : undefined
                }
              >
                <span className={`dashboard-quick-icon ${action.tone}`}>
                  <Icon size={22} weight="duotone" aria-hidden />
                </span>
                <strong>{action.label}</strong>
                <span>{action.meta}</span>
              </a>
            );
          })}
        </div>

        <div className="dashboard-grid-3">
          <article className="dashboard-panel" id="results">
            <div className="dashboard-panel-header">
              <h2>Villa shortlist ({matchedVillas.length})</h2>
              <a href="#results">View all</a>
            </div>
            <div className="dashboard-panel-body">
              {shortlist.map((villa, index) => (
                <div key={villa.name} className="dashboard-villa-row">
                  <img src={villaImageSrc(villa)} alt="" loading="lazy" />
                  <div>
                    {index === 0 ? <span className="dashboard-pill-top">Top pick</span> : null}
                    <strong>{villa.name}</strong>
                    <p>{villaMeta(villa)}</p>
                  </div>
                  <span className="dashboard-villa-price">
                    {currency.format(villaPricePerNight(villa))} / night
                  </span>
                </div>
              ))}
              <a href="#results" className="dashboard-outline-btn">
                + Add villa to shortlist
              </a>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Next steps</h2>
              <span className="dashboard-task-progress">
                {completedTasks} of {tasks.length} completed
              </span>
            </div>
            <div className="dashboard-panel-body">
              <div className="dashboard-progress-bar" aria-hidden>
                <span style={{ width: `${progressPct}%` }} />
              </div>
              <ul className="dashboard-task-list">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      {task.label}
                    </label>
                  </li>
                ))}
              </ul>
              <a href="#host-planning" className="dashboard-outline-btn">
                View all tasks
              </a>
            </div>
          </article>

          <article className="dashboard-panel" id="flights">
            <div className="dashboard-panel-header">
              <h2>Flight watch</h2>
              <a href="#flights">View all</a>
            </div>
            <div className="dashboard-panel-body">
              {flightRows.map((row) => (
                <div key={row.route} className="dashboard-flight-row">
                  <div className="dashboard-flight-route">{row.route}</div>
                  <div className="dashboard-flight-meta">{row.meta}</div>
                  <div className="dashboard-flight-price">
                    <div>
                      <strong>{row.price}</strong>
                      <div className={`dashboard-trend ${row.up ? "up" : "down"}`}>
                        {row.trend}
                      </div>
                    </div>
                    <Sparkline up={row.up} />
                  </div>
                </div>
              ))}
              <div className="dashboard-alert-card">
                <Bell size={18} weight="fill" aria-hidden />
                <p>Price alerts are on. You&apos;ll be notified of price drops.</p>
              </div>
            </div>
          </article>
        </div>

        <div className="dashboard-grid-2">
          <article className="dashboard-panel" id="family">
            <div className="dashboard-panel-header">
              <h2>Guest profile</h2>
              <a href="#family">Manage</a>
            </div>
            <div className="dashboard-panel-body">
              <div className="dashboard-guest-avatars">
                {profilePeople.map((person) => (
                  <div key={person.name} className="dashboard-guest-chip">
                    <img src={person.photo} alt="" width={52} height={52} loading="lazy" />
                    <strong>{person.name}</strong>
                    <span>{person.role}</span>
                  </div>
                ))}
              </div>
              <div className="dashboard-tags" aria-label="Travel preferences">
                {travelPreferences.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href={guestSection("family")} className="dashboard-outline-btn">
                + Add preference
              </a>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Settings &amp; controls</h2>
            </div>
            <div className="dashboard-panel-body">
              {settingsRows.map((row) => (
                <a key={row.label} href={row.href} className="dashboard-settings-row">
                  <strong>{row.label}</strong>
                  <span>
                    {row.value} <CaretRight size={14} aria-hidden />
                  </span>
                </a>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-grid-bottom">
          <article className="dashboard-panel" id="plan">
            <div className="dashboard-panel-header">
              <h2>Itinerary overview</h2>
              <a href="#plan">Manage itinerary</a>
            </div>
            <div className="dashboard-panel-body">
              <div className="dashboard-itinerary-strip" aria-label="Trip dates">
                {itineraryDays.map((day) => {
                  const Icon = day.icon;
                  return (
                    <div key={day.date} className="dashboard-day-chip">
                      <Icon size={18} aria-hidden />
                      {day.date}
                    </div>
                  );
                })}
              </div>
              <p style={{ margin: "12px 0 0", color: "var(--dash-muted)", fontSize: "0.82rem" }}>
                {trip.nights} nights · 28 activities · 6 booked
              </p>
              <div className="dashboard-highlights" style={{ marginTop: 16 }}>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "0.92rem" }}>Today&apos;s highlights</h3>
                  <ul>
                    {itineraryHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a href="#plan" className="dashboard-outline-btn">
                    View full itinerary
                  </a>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=280&h=200&q=80"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          <article className="dashboard-panel" id="messages">
            <div className="dashboard-panel-header">
              <h2>Recent activity</h2>
              <a href="#messages">View all</a>
            </div>
            <div className="dashboard-panel-body">
              {recentActivity.map((item) => (
                <div key={item.title} className="dashboard-activity-item">
                  <strong>{item.title}</strong>
                  <span>{item.when}</span>
                </div>
              ))}
            </div>
          </article>

          <div>
            <article className="dashboard-panel" id="budget" style={{ marginBottom: 14 }}>
              <div className="dashboard-panel-header">
                <h2>Budget tracker</h2>
                <a href="#budget">View details</a>
              </div>
              <div className="dashboard-panel-body">
                <div className="dashboard-budget-stats">
                  <div>
                    <small>Total budget</small>
                    <strong>€5,000</strong>
                  </div>
                  <div>
                    <small>Spent</small>
                    <strong>€1,240</strong>
                  </div>
                </div>
                <div className="dashboard-budget-donut-wrap">
                  <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
                    <div className="dashboard-budget-donut" aria-hidden />
                    <span className="dashboard-budget-donut-label">
                      25%
                      <br />
                      of budget used
                    </span>
                  </div>
                  <div className="dashboard-budget-legend">
                    {budgetBreakdown.map((row) => (
                      <div key={row.label}>
                        <span>{row.label}</span>
                        <span>
                          {row.amount} ({row.pct}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="dashboard-panel" id="documents">
              <div className="dashboard-panel-header">
                <h2>Documents &amp; info</h2>
                <a href="#documents">Upload / Manage</a>
              </div>
              <div className="dashboard-panel-body">
                {documents.map((doc) => (
                  <div key={doc.label} className="dashboard-doc-row">
                    <strong>{doc.label}</strong>
                    <span>{doc.status}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <section className="dashboard-host-planning" id="host-planning" style={{ marginBottom: 18 }}>
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>Host planning workspace</h2>
              <span className="dashboard-task-progress">{brand.name}</span>
            </div>
            <div className="dashboard-panel-body">{hostPlanning}</div>
          </div>
        </section>

        <section className="dashboard-villa-results" aria-label="Full villa shortlist">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <h2>All shortlisted villas ({allVillas.length})</h2>
            </div>
            <div className="dashboard-panel-body dashboard-villa-list">
              {allVillas.map((villa) => (
                <VillaCard
                  key={villa.name}
                  villa={villa}
                  nights={tripNights}
                  imageSrc={imageForVilla(villa)}
                  pricePerNight={villaPricePerNight(villa)}
                  isPinned={villa.name === pinnedVillaName}
                  onPin={() => onPinVilla(villa.name)}
                  onGuess={() => pinVilla(villa.name)}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
