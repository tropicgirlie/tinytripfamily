import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  AirplaneTakeoff,
  Bell,
  CaretRight,
  CheckCircle,
  ChatCircle,
  Circle,
  FileText,
  HouseLine,
  MapPin,
  PencilSimple,
  PushPin,
  SlidersHorizontal,
  Sparkle,
  Sun,
  Trash,
  UserCircle,
  UsersThree,
  Wallet,
} from "../../lib/icons";
import type { useTripPlanner } from "../../hooks/useTripPlanner";
import type { Villa } from "../../data/trip";
import { currency } from "../../lib/format";
import { PinnedSection } from "../PinnedSection";
import { VillaCard } from "../VillaCard";
import {
  budgetBreakdown,
  documents,
  hostTasks,
  itineraryDays,
  itineraryHighlights,
  recentActivity,
  settingsRows,
  travelPreferences,
} from "../../data/dashboard";

type Planner = ReturnType<typeof useTripPlanner>;

type FamilyFitResult = {
  villaName: string;
  score: number;
  verdict: string;
  reasons: string[];
  childNotes: string;
  budgetNote: string;
  questions: string[];
};

type FamilyFitResponse = {
  provider: string;
  summary: string;
  results: FamilyFitResult[];
  error?: string;
};

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
  brandSubdomain: string;
  onSignOut: () => void;
};

function villaMeta(villa: Villa) {
  const bits = [
    villa.area.split("/")[0]?.trim() || villa.area,
    `${villa.bedrooms} bed`,
    villa.amenities.includes("heated pool") ? "Pool" : null,
    villa.amenities.includes("beach nearby") ? "Beach" : "Sea view",
  ].filter(Boolean);
  return bits.join(" · ");
}

export function HostDashboard({
  planner,
  hostPlanning,
  matchedVillas,
  tripNights,
  pinnedVillaName,
  onPinVilla,
  villaImageSrc,
  hasPinnedVilla,
  pinnedVilla,
  selectedGuessName,
  setSelectedGuessName,
  resetMystery,
  spinning,
  setSpinning,
  brandSubdomain,
  onSignOut,
}: Props) {
  const {
    switchView,
    brand,
    destination,
    trip,
    countdownDays,
    formatDisplayDate,
    flightInsights,
    familyMembers,
    addMember,
    addManualVilla,
    clearManualVillas,
    updateMember,
    removeMember,
    getAgeGroup,
    villaPricePerNight,
    guestContentCache,
    refreshGuestNearbyPlaces,
    placesRefreshLoading,
    placesRefreshError,
  } = planner;

  const heroStyle = { ["--hero-beach" as string]: `url("${destination.heroImage}")` };
  const topVilla = matchedVillas[0];
  const placesArea =
    (hasPinnedVilla && pinnedVilla?.address) ||
    topVilla?.address ||
    (hasPinnedVilla && pinnedVilla?.area) ||
    topVilla?.area ||
    destination.areas[0]?.name ||
    destination.label;
  const [tasks, setTasks] = useState(hostTasks);
  const [newGuest, setNewGuest] = useState({
    name: "",
    age: "",
    foodPreference: "",
    allergies: "",
  });
  const [manualPick, setManualPick] = useState({
    name: "",
    area: "",
    address: "",
    price: "",
    bedrooms: "",
    url: "",
    image: "",
  });
  const [familyFit, setFamilyFit] = useState<FamilyFitResponse | null>(null);
  const [familyFitLoading, setFamilyFitLoading] = useState(false);
  const [familyFitError, setFamilyFitError] = useState("");
  const completedTasks = tasks.filter((task) => task.done).length;
  const progressPct = Math.round((completedTasks / tasks.length) * 100);

  const familySummary = useMemo(() => {
    if (!familyMembers.length) return "No family members added yet";
    const adults = familyMembers.filter((member) => getAgeGroup(member.age) === "adults").length;
    const kids = familyMembers.filter((member) => {
      const group = getAgeGroup(member.age);
      return group === "kids" || group === "teens" || group === "toddler";
    }).length;
    return `${familyMembers.length} travellers · ${adults} adult${adults === 1 ? "" : "s"} · ${kids} kid${kids === 1 ? "" : "s"}`;
  }, [familyMembers, getAgeGroup]);

  const flightRows = flightInsights.length
    ? flightInsights.slice(0, 2)
    : [
        {
          route: `DUB → ${destination.airport.code}`,
          status: "Watch",
          action: "Book soon",
          trend: "Prices can move fast",
          nudge: "Track fares for the Christmas window.",
        },
      ];

  const apiSetupRows = [
    {
      name: "Google Places",
      detail: "Nearby amenities endpoint ready",
      status: "Local + Vercel env added",
      ready: true,
    },
    {
      name: "Gemini family fit",
      detail: "Fallback AI provider for family-fit scoring",
      status: "Optional fallback",
      ready: false,
    },
    {
      name: "OpenRouter AI",
      detail: "Primary family-fit provider for cheaper testing",
      status: "Local + Vercel env added",
      ready: true,
    },
    {
      name: "Expedia Rapid",
      detail: "Real villa inventory provider",
      status: "Needs partner approval",
      ready: false,
    },
    {
      name: "Google Flights",
      detail: "Outbound search links for guests",
      status: "MVP ready",
      ready: true,
    },
  ];

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  const submitGuest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const age = Number(newGuest.age);
    if (!newGuest.name.trim() || Number.isNaN(age)) return;
    addMember({
      name: newGuest.name.trim(),
      age,
      foodPreference: newGuest.foodPreference.trim(),
      allergies: newGuest.allergies.trim(),
    });
    setNewGuest({ name: "", age: "", foodPreference: "", allergies: "" });
  };

  const submitManualPick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const price = Number(manualPick.price);
    const bedrooms = Number(manualPick.bedrooms);
    if (!manualPick.name.trim() || !manualPick.image.trim() || !manualPick.url.trim()) return;
    if (Number.isNaN(price) || Number.isNaN(bedrooms)) return;

    addManualVilla({
      name: manualPick.name.trim(),
      area: manualPick.area.trim() || topVilla?.area || destination.areas[0]?.name || destination.label,
      address: manualPick.address.trim(),
      price,
      bedrooms,
      url: manualPick.url.trim(),
      image: manualPick.image.trim(),
    });
    setManualPick({ name: "", area: "", address: "", price: "", bedrooms: "", url: "", image: "" });
  };

  const clearManualPickForm = () => {
    setManualPick({ name: "", area: "", address: "", price: "", bedrooms: "", url: "", image: "" });
  };

  const scoreFamilyFit = async () => {
    setFamilyFitLoading(true);
    setFamilyFitError("");
    try {
      const response = await fetch("/api/ai/family-fit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: destination.displayName,
          dates: trip,
          travellers: familyMembers,
          villas: matchedVillas.slice(0, 6).map((villa) => ({
            name: villa.name,
            area: villa.area,
            price: villa.price,
            bedrooms: villa.bedrooms,
            bathrooms: villa.bathrooms,
            rating: villa.rating,
            fit: villa.fit,
            amenities: villa.amenities,
            childAmenities: villa.childAmenities,
            bestFor: villa.bestFor,
            distance: villa.distance,
            address: villa.address,
            note: villa.note,
          })),
          validatedResearchPolicy:
            "Use only validated Algarve baseline research and the host-entered villa details. Mark 2026/27 festive dates, live fares, opening hours and exact distances as verification items unless supplied by an API/cache.",
        }),
      });
      const data = (await response.json()) as FamilyFitResponse;
      setFamilyFit(data);
      if (data.error) {
        setFamilyFitError(String(data.error));
      } else if (String(data.provider).toLowerCase().includes("fallback")) {
        setFamilyFitError(
          "AI did not run — local rules-based score shown. Check OPENROUTER_API_KEY or GEMINI_API_KEY in .env.local / Vercel.",
        );
      } else {
        setFamilyFitError("");
      }
    } catch (error) {
      setFamilyFitError(error instanceof Error ? error.message : "Could not score villas");
    } finally {
      setFamilyFitLoading(false);
    }
  };

  return (
    <div className="dashboard-app host-clean-app" id="dashboard">
      <aside className="dashboard-sidebar" aria-label="Host navigation">
        <a className="dashboard-brand" href="#dashboard">
          <img src={brand.logo} alt="" />
          <div className="dashboard-brand-text">
            <strong>Micheau</strong>
            <span>Family trip</span>
          </div>
        </a>
        <nav className="dashboard-nav" aria-label="Main">
          <a href="#host-planning" className="is-active">
            <SlidersHorizontal size={20} weight="fill" aria-hidden />
            Planning
          </a>
          <a href="#results">
            <HouseLine size={20} aria-hidden />
            Villas
            <span className="dashboard-nav-badge">{matchedVillas.length}</span>
          </a>
          <a href="#pinned">
            <PushPin size={20} aria-hidden />
            Mystery villa
          </a>
        </nav>
        <div className="dashboard-sidebar-card">
          <h3>Host link</h3>
          <p>{brandSubdomain}.tinytripindex.com</p>
          <a href="#pinned">
            Review reveal <ArrowRight size={14} aria-hidden />
          </a>
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
            <span className="dashboard-planning-label">Luana controls</span>
            <span className="dashboard-beta-label">Beta</span>
          </div>
          <div className="dashboard-topbar-actions">
            <button type="button" className="dashboard-icon-btn" aria-label="Notifications">
              <Bell size={20} />
            </button>
            <button type="button" className="dashboard-icon-btn" aria-label="Messages">
              <ChatCircle size={20} />
            </button>
            <div className="dashboard-host-profile">
              <img src={brand.logo} alt="" width={36} height={36} />
              <div>
                <strong>Control page</strong>
              </div>
              <button type="button" onClick={onSignOut}>Sign out</button>
            </div>
          </div>
        </header>

        <section className="dashboard-hero" style={heroStyle} aria-label="Trip overview">
          <div className="dashboard-hero-inner">
            <div>
              <span className="dashboard-hero-badge">Host workspace</span>
              <h1>Plan the {destination.label} family escape.</h1>
              <p>
                Search villas, tune family filters, pin the final choice, then share one clean
                guest page with the family.
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

        <div className="dashboard-quick-actions host-action-strip" aria-label="Host quick actions">
          <a className="dashboard-quick-card" href="#results">
            <span className="dashboard-quick-icon teal">
              <HouseLine size={22} weight="duotone" aria-hidden />
            </span>
            <strong>Manage villa shortlist</strong>
            <span>{matchedVillas.length} villas shortlisted</span>
          </a>
          <a className="dashboard-quick-card" href="#host-planning">
            <span className="dashboard-quick-icon sun">
              <SlidersHorizontal size={22} weight="duotone" aria-hidden />
            </span>
            <strong>Search filters</strong>
            <span>Price, bedrooms and child needs</span>
          </a>
          <a className="dashboard-quick-card" href="#flights">
            <span className="dashboard-quick-icon violet">
              <AirplaneTakeoff size={22} weight="duotone" aria-hidden />
            </span>
            <strong>Flight watch</strong>
            <span>Track prices and routes</span>
          </a>
          <a className="dashboard-quick-card" href="#family">
            <span className="dashboard-quick-icon blue">
              <UsersThree size={22} weight="duotone" aria-hidden />
            </span>
            <strong>Guest profile</strong>
            <span>{familySummary}</span>
          </a>
        </div>

        <div className="dashboard-grid-3 host-function-grid">
          <article className="dashboard-panel" id="results-summary">
            <div className="dashboard-panel-header">
              <h2>Villa shortlist</h2>
              <a href="#results">View all</a>
            </div>
            <div className="dashboard-panel-body">
              {matchedVillas.slice(0, 3).map((villa, index) => (
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
            </div>
          </article>

          <article className="dashboard-panel" id="next-steps">
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
                    <button type="button" onClick={() => toggleTask(task.id)}>
                      {task.done ? (
                        <CheckCircle size={17} weight="fill" aria-hidden />
                      ) : (
                        <Circle size={17} aria-hidden />
                      )}
                      {task.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="dashboard-panel" id="flights">
            <div className="dashboard-panel-header">
              <h2>Flight watch</h2>
              <a href="#host-planning">Edit origin</a>
            </div>
            <div className="dashboard-panel-body host-flight-list">
              {flightRows.map((flight) => (
                <div key={flight.route} className="dashboard-flight-row">
                  <div className="dashboard-flight-route">{flight.route.replace(" - ", " → ")}</div>
                  <div className="dashboard-flight-meta">{flight.status}</div>
                  <div className="dashboard-flight-price">
                    <div>
                      <strong>{flight.action}</strong>
                      <div className="dashboard-trend down">{flight.trend}</div>
                    </div>
                  </div>
                  <p>{flight.nudge}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-grid-2 host-function-grid">
          <article className="dashboard-panel" id="family">
            <div className="dashboard-panel-header">
              <div>
                <h2>Guest profile</h2>
                <p>Manage names, ages, food preferences, allergies and photo placeholders.</p>
              </div>
            </div>
            <div className="dashboard-panel-body">
              <form className="host-guest-form" onSubmit={submitGuest}>
                <label>
                  Name
                  <input
                    value={newGuest.name}
                    onChange={(event) => setNewGuest({ ...newGuest, name: event.target.value })}
                    placeholder="e.g. Sofia"
                  />
                </label>
                <label>
                  Age
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newGuest.age}
                    onChange={(event) => setNewGuest({ ...newGuest, age: event.target.value })}
                    placeholder="2"
                  />
                </label>
                <label>
                  Food preference
                  <input
                    value={newGuest.foodPreference}
                    onChange={(event) =>
                      setNewGuest({ ...newGuest, foodPreference: event.target.value })
                    }
                    placeholder="Vegetarian, picky eater..."
                  />
                </label>
                <label>
                  Allergies
                  <input
                    value={newGuest.allergies}
                    onChange={(event) => setNewGuest({ ...newGuest, allergies: event.target.value })}
                    placeholder="Nuts, dairy, none..."
                  />
                </label>
                <button type="submit">Add guest</button>
              </form>

              <div className="host-guest-list">
                {familyMembers.map((member, index) => (
                  <div key={`${member.name}-${index}`} className="host-guest-card">
                    <div className="host-photo-placeholder">
                      <UserCircle size={30} weight="duotone" aria-hidden />
                      <span>Photo</span>
                    </div>
                    <div className="host-guest-fields">
                      <label>
                        Name
                        <input
                          value={member.name}
                          onChange={(event) => updateMember(index, { name: event.target.value })}
                        />
                      </label>
                      <label>
                        Age
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={member.age}
                          onChange={(event) => updateMember(index, { age: Number(event.target.value) })}
                        />
                      </label>
                      <label>
                        Food preference
                        <input
                          value={member.foodPreference ?? ""}
                          onChange={(event) =>
                            updateMember(index, { foodPreference: event.target.value })
                          }
                          placeholder="Not added"
                        />
                      </label>
                      <label>
                        Allergies
                        <input
                          value={member.allergies ?? ""}
                          onChange={(event) => updateMember(index, { allergies: event.target.value })}
                          placeholder="None added"
                        />
                      </label>
                      <p>{getAgeGroup(member.age)} profile</p>
                    </div>
                    <button
                      type="button"
                      className="host-remove-guest"
                      onClick={() => removeMember(index)}
                      aria-label={`Remove ${member.name}`}
                    >
                      <Trash size={16} aria-hidden />
                    </button>
                  </div>
                ))}
              </div>

              <div className="dashboard-tags" aria-label="Travel preferences">
                {travelPreferences.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>

          <article className="dashboard-panel" id="settings">
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
              <div className="host-api-settings">
                <div className="host-api-settings-head">
                  <strong>API setup</strong>
                  <span>Private provider settings</span>
                </div>
                {apiSetupRows.map((row) => (
                  <div key={row.name} className="host-api-settings-row">
                    {row.ready ? (
                      <CheckCircle size={18} weight="fill" aria-hidden />
                    ) : (
                      <Circle size={18} aria-hidden />
                    )}
                    <div>
                      <strong>{row.name}</strong>
                      <span>{row.detail}</span>
                    </div>
                    <em>{row.status}</em>
                  </div>
                ))}
                <div className="host-guest-content-refresh">
                  <div>
                    <strong>Nearby places for guest page</strong>
                    <span>
                      Calls Google Places once for <em>{placesArea}</em>, then saves for guests. Family
                      views do not use your API quota.
                    </span>
                    {guestContentCache ? (
                      <span className="host-cache-meta">
                        Cached {new Date(guestContentCache.updatedAt).toLocaleString()} ·{" "}
                        {guestContentCache.nearbyAmenities.length} places
                      </span>
                    ) : (
                      <span className="host-cache-meta">Not loaded yet — guests see sample distances.</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="dashboard-outline-btn"
                    disabled={placesRefreshLoading}
                    onClick={() => refreshGuestNearbyPlaces(placesArea)}
                  >
                    <MapPin size={16} aria-hidden />
                    {placesRefreshLoading ? "Loading..." : "Refresh for guests"}
                  </button>
                  {placesRefreshError ? (
                    <p className="host-ai-error">{placesRefreshError}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        </div>

        <section className="dashboard-panel host-ai-panel" id="ai-fit">
          <div className="dashboard-panel-header">
            <div>
              <h2>AI family fit</h2>
              <p>Private AI scoring for Luana: child needs, allergies, budget and villa tradeoffs.</p>
            </div>
            <Sparkle size={22} weight="duotone" aria-hidden />
          </div>
          <div className="dashboard-panel-body">
            <div className="host-ai-control-row">
              <div>
                <strong>{matchedVillas.length} villas ready to score</strong>
                <span>
                  Uses the first six shortlist options and {familyMembers.length} traveller profiles.
                </span>
              </div>
              <button type="button" onClick={scoreFamilyFit} disabled={familyFitLoading}>
                {familyFitLoading ? "Scoring..." : "Score with AI"}
              </button>
            </div>
            {familyFitError ? <p className="host-ai-error">{familyFitError}</p> : null}
            {familyFit ? (
              <div className="host-ai-results">
                <p className="host-ai-summary">
                  <span>{familyFit.provider}</span>
                  {familyFit.summary}
                </p>
                {familyFit.error ? <p className="host-ai-error">{familyFit.error}</p> : null}
                <div className="host-ai-result-grid">
                  {familyFit.results.map((result) => (
                    <article key={result.villaName} className="host-ai-result-card">
                      <div className="host-ai-score">
                        <strong>{result.score}</strong>
                        <span>/100</span>
                      </div>
                      <div>
                        <h3>{result.villaName}</h3>
                        <p>{result.verdict}</p>
                      </div>
                      <ul>
                        {result.reasons.slice(0, 3).map((reason) => (
                          <li key={reason}>{reason}</li>
                        ))}
                      </ul>
                      <p className="host-ai-child-note">{result.childNotes}</p>
                      <p className="host-ai-budget-note">{result.budgetNote}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <div className="dashboard-grid-bottom host-function-grid">
          <article className="dashboard-panel" id="plan">
            <div className="dashboard-panel-header">
              <h2>Itinerary overview</h2>
              <a href="?view=guest#plan">Manage itinerary</a>
            </div>
            <div className="dashboard-panel-body">
              <div className="dashboard-itinerary-strip" aria-label="Trip dates">
                {itineraryDays.slice(0, 8).map((day) => {
                  const Icon = day.icon;
                  return (
                    <div key={day.date} className="dashboard-day-chip">
                      <Icon size={18} aria-hidden />
                      {day.date}
                    </div>
                  );
                })}
              </div>
              <div className="dashboard-highlights" style={{ marginTop: 16 }}>
                <div>
                  <h3>Today&apos;s highlights</h3>
                  <ul>
                    {itineraryHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
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
        </div>

        <div className="dashboard-grid-2 host-function-grid">
          <article className="dashboard-panel" id="budget">
            <div className="dashboard-panel-header">
              <h2>Budget tracker</h2>
              <Wallet size={20} aria-hidden />
            </div>
            <div className="dashboard-panel-body">
              <div className="dashboard-budget-stats">
                <div>
                  <small>Total budget</small>
                  <strong>{currency.format(5000)}</strong>
                </div>
                <div>
                  <small>Villa estimate</small>
                  <strong>{topVilla ? currency.format(topVilla.price) : "Pending"}</strong>
                </div>
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
          </article>

          <article className="dashboard-panel" id="documents">
            <div className="dashboard-panel-header">
              <h2>Documents &amp; info</h2>
              <FileText size={20} aria-hidden />
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

        <section className="dashboard-host-planning" id="host-planning">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Host planning workspace</h2>
                <p>Private setup controls for Luana.</p>
              </div>
              <span className="dashboard-task-progress">{brand.name}</span>
            </div>
            <div className="dashboard-panel-body">{hostPlanning}</div>
          </div>
        </section>

        <section className="dashboard-villa-results" id="results" aria-label="Villa shortlist">
          <div className="dashboard-panel">
            <div className="dashboard-panel-header">
              <div>
                <h2>Villa shortlist ({matchedVillas.length})</h2>
                <p>
                  Sorted by family fit, rating and child-friendly amenities. Pin one choice when
                  Luana is ready.
                </p>
                <p className="host-api-note">
                  Availability opens through partner search today. Live Booking.com / Vrbo rates need
                  approved API keys on the backend before final booking.
                </p>
              </div>
              {topVilla ? (
                <span className="dashboard-task-progress">
                  Top pick: {currency.format(villaPricePerNight(topVilla))} / night
                </span>
              ) : null}
            </div>
            <form className="host-manual-pick-form" onSubmit={submitManualPick}>
              <div className="host-manual-pick-intro">
                <strong>Add an Airbnb pick manually</strong>
                <span>Paste the listing and image while live villa APIs are pending.</span>
              </div>
              <label>
                Listing name
                <input
                  type="text"
                  value={manualPick.name}
                  onChange={(event) => setManualPick((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Casa da Luz"
                />
              </label>
              <label>
                Area
                <input
                  type="text"
                  value={manualPick.area}
                  onChange={(event) => setManualPick((current) => ({ ...current, area: event.target.value }))}
                  placeholder="Lagos"
                />
              </label>
              <label className="host-manual-pick-wide">
                Exact address
                <input
                  type="text"
                  value={manualPick.address}
                  onChange={(event) => setManualPick((current) => ({ ...current, address: event.target.value }))}
                  placeholder="Paste villa address for real nearby amenities"
                />
              </label>
              <label>
                Total price
                <input
                  type="number"
                  min="0"
                  value={manualPick.price}
                  onChange={(event) => setManualPick((current) => ({ ...current, price: event.target.value }))}
                  placeholder="4980"
                />
              </label>
              <label>
                Bedrooms
                <input
                  type="number"
                  min="1"
                  value={manualPick.bedrooms}
                  onChange={(event) => setManualPick((current) => ({ ...current, bedrooms: event.target.value }))}
                  placeholder="5"
                />
              </label>
              <label className="host-manual-pick-wide">
                Airbnb or listing URL
                <input
                  type="url"
                  value={manualPick.url}
                  onChange={(event) => setManualPick((current) => ({ ...current, url: event.target.value }))}
                  placeholder="https://www.airbnb.com/rooms/..."
                />
              </label>
              <label className="host-manual-pick-wide">
                Image URL
                <input
                  type="url"
                  value={manualPick.image}
                  onChange={(event) => setManualPick((current) => ({ ...current, image: event.target.value }))}
                  placeholder="https://..."
                />
              </label>
              <div className="host-manual-pick-actions">
                <button type="submit">Add pick</button>
                <button type="button" className="is-secondary" onClick={clearManualPickForm}>
                  Clear fields
                </button>
                <button type="button" className="is-secondary" onClick={clearManualVillas}>
                  Remove manual picks
                </button>
              </div>
            </form>
            <div className="dashboard-panel-body dashboard-villa-list">
              {matchedVillas.map((villa) => (
                <VillaCard
                  key={villa.name}
                  villa={villa}
                  nights={tripNights}
                  imageSrc={villaImageSrc(villa)}
                  pricePerNight={villaPricePerNight(villa)}
                  isPinned={villa.name === pinnedVillaName}
                  onPin={() => onPinVilla(villa.name)}
                  onGuess={() => onPinVilla(villa.name)}
                />
              ))}
            </div>
          </div>
        </section>

        {topVilla ? (
          <section className="dashboard-panel host-best-pick" aria-label="Current best match">
            <img src={villaImageSrc(topVilla)} alt="" loading="lazy" />
            <div>
              <span className="dashboard-pill-top">Best current match</span>
              <h2>{topVilla.name}</h2>
              <p>{villaMeta(topVilla)}</p>
              <p>{topVilla.note}</p>
            </div>
          </section>
        ) : null}

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
      </div>
    </div>
  );
}
