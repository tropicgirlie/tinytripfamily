import { useMemo, useState, type FormEvent } from "react";
import { Box, Grid, Select, Slider, Text, TextField } from "@radix-ui/themes";
import { currency } from "./lib/format";
import { useTripPlanner } from "./hooks/useTripPlanner";
import { GuestDashboard } from "./components/dashboard/GuestDashboard";
import { HostDashboard } from "./components/dashboard/HostDashboard";
import { villas } from "./data/trip";

const hostSessionKey = "micheauHostSession";
const hostPasscode = "luana2026";

export default function App() {
  const planner = useTripPlanner();
  const [spinning, setSpinning] = useState(false);
  const [hostAuthed, setHostAuthed] = useState(() => localStorage.getItem(hostSessionKey) === "true");
  const [hostLoginValue, setHostLoginValue] = useState("");
  const [hostLoginError, setHostLoginError] = useState("");

  const {
    viewMode,
    switchView,
    brand,
    setBrand,
    destination,
    destinationInput,
    setDestinationInput,
    dateInput,
    setDateInput,
    originCity,
    setOriginCity,
    trip,
    maxPrice,
    setMaxPrice,
    areaFilter,
    setAreaFilter,
    bedFilter,
    setBedFilter,
    amenityFilter,
    setAmenityFilter,
    childFilter,
    setChildFilter,
    pinnedVillaName,
    selectedGuessName,
    setSelectedGuessName,
    pinVilla,
    resetMystery,
    familyMembers,
    matchedVillas,
    countdownDays,
    activeAreas,
    getAgeGroup,
    villaImageSrc,
    normalizeSubdomain,
  } = planner;

  const pinnedVilla =
    matchedVillas.find((villa) => villa.name === pinnedVillaName) ||
    matchedVillas[0] ||
    null;
  const hasPinnedVilla = Boolean(pinnedVillaName && pinnedVilla);

  const guestSummary = useMemo(() => {
    if (!familyMembers.length) return `${trip.guests}+ family`;
    const adults = familyMembers.filter((m) => getAgeGroup(m.age) === "adults").length;
    const kids = familyMembers.filter((m) => {
      const g = getAgeGroup(m.age);
      return g === "kids" || g === "toddler" || g === "teens";
    }).length;
    if (adults && kids) return `${adults} adult${adults === 1 ? "" : "s"}, ${kids} kid${kids === 1 ? "" : "s"}`;
    return `${familyMembers.length} guest${familyMembers.length === 1 ? "" : "s"}`;
  }, [familyMembers, getAgeGroup, trip.guests]);

  const isHost = viewMode === "host";

  const submitHostLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hostLoginValue.trim() !== hostPasscode) {
      setHostLoginError("That passcode is not correct.");
      return;
    }
    localStorage.setItem(hostSessionKey, "true");
    setHostAuthed(true);
    setHostLoginError("");
    setHostLoginValue("");
  };

  const signOutHost = () => {
    localStorage.removeItem(hostSessionKey);
    setHostAuthed(false);
    switchView("guest");
  };

  const hostPlanning = (
    <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4" className="host-workspace-form">
      <Box>
        <Text className="md-label" as="label" htmlFor="brandNameInput">
          Trip name
        </Text>
        <TextField.Root
          id="brandNameInput"
          value={brand.name}
          onChange={(e) => setBrand({ ...brand, name: e.target.value })}
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label" htmlFor="subdomainInput">
          Subdomain
        </Text>
        <TextField.Root
          id="subdomainInput"
          value={brand.subdomain}
          onChange={(e) => setBrand({ ...brand, subdomain: normalizeSubdomain(e.target.value) })}
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label" htmlFor="brandLogoInput">
          Logo or picture URL
        </Text>
        <TextField.Root
          id="brandLogoInput"
          value={brand.logo.startsWith("data:") ? "Uploaded image" : brand.logo}
          onChange={(e) => setBrand({ ...brand, logo: e.target.value })}
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label">
          Upload logo
        </Text>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              if (typeof reader.result === "string") {
                setBrand({ ...brand, logo: reader.result });
              }
            };
            reader.readAsDataURL(file);
          }}
        />
      </Box>
      <Box>
        <Text className="md-label" as="label" htmlFor="destinationInput">
          Destination
        </Text>
        <TextField.Root
          id="destinationInput"
          value={destinationInput}
          onChange={(e) => setDestinationInput(e.target.value)}
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label" htmlFor="originCityInput">
          Flying from
        </Text>
        <TextField.Root
          id="originCityInput"
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
          placeholder="Dublin"
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label" htmlFor="dateInput">
          Dates
        </Text>
        <TextField.Root
          id="dateInput"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          size="3"
        />
      </Box>
      <Box>
        <Text className="md-label" as="label">
          Area
        </Text>
        <Select.Root value={areaFilter} onValueChange={setAreaFilter}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="all">All {destination.label} areas</Select.Item>
            {activeAreas.map((area) => (
              <Select.Item key={area.name} value={area.name}>
                {area.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Box>
      <Box>
        <Text className="md-label" as="label">
          Max total price — {currency.format(maxPrice)}
        </Text>
        <Slider
          value={[maxPrice]}
          onValueChange={([value]) => setMaxPrice(value)}
          min={4500}
          max={18000}
          step={500}
        />
      </Box>
      <Box>
        <Text className="md-label" as="label">
          Bedrooms
        </Text>
        <Select.Root value={String(bedFilter)} onValueChange={(v) => setBedFilter(Number(v))}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="0">Any</Select.Item>
            <Select.Item value="5">5+</Select.Item>
            <Select.Item value="6">6+</Select.Item>
            <Select.Item value="7">7+</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
      <Box style={{ gridColumn: "span 2" }}>
        <Text className="md-label" as="label">
          Must have
        </Text>
        <Select.Root value={amenityFilter} onValueChange={setAmenityFilter}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="all">Any amenity</Select.Item>
            <Select.Item value="heated pool">Heated pool</Select.Item>
            <Select.Item value="walkable restaurants">Walkable restaurants</Select.Item>
            <Select.Item value="beach nearby">Beach nearby</Select.Item>
            <Select.Item value="supermarket nearby">Supermarket nearby</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
      <Box>
        <Text className="md-label" as="label">
          Child needs
        </Text>
        <Select.Root value={childFilter} onValueChange={setChildFilter}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="all">Any child amenity</Select.Item>
            <Select.Item value="crib available">Crib available</Select.Item>
            <Select.Item value="high chair">High chair</Select.Item>
            <Select.Item value="toddler-safe pool gate">Toddler-safe pool gate</Select.Item>
            <Select.Item value="playground nearby">Playground nearby</Select.Item>
          </Select.Content>
        </Select.Root>
      </Box>
    </Grid>
  );

  if (isHost && !hostAuthed) {
    return (
      <main className="host-login-shell">
        <section className="host-login-card" aria-labelledby="hostLoginTitle">
          <div className="host-login-brand">
            <img src={brand.logo} alt="" />
            <span>Beta</span>
          </div>
          <h1 id="hostLoginTitle">Host access</h1>
          <p>Luana&apos;s private planning workspace for villa search, family details, API setup and the final reveal.</p>
          <form onSubmit={submitHostLogin}>
            <label htmlFor="hostPasscode">Host passcode</label>
            <input
              id="hostPasscode"
              type="password"
              value={hostLoginValue}
              onChange={(event) => setHostLoginValue(event.target.value)}
              placeholder="Enter host passcode"
              autoComplete="current-password"
            />
            {hostLoginError ? <span className="host-login-error">{hostLoginError}</span> : null}
            <button type="submit">Log in as host</button>
          </form>
          <button type="button" className="host-login-guest" onClick={() => switchView("guest")}>
            Back to guest trip page
          </button>
        </section>
      </main>
    );
  }

  if (isHost) {
    return (
      <HostDashboard
        planner={planner}
        hostPlanning={hostPlanning}
        matchedVillas={matchedVillas}
        tripNights={trip.nights}
        pinnedVillaName={pinnedVillaName}
        onPinVilla={pinVilla}
        villaImageSrc={villaImageSrc}
        hasPinnedVilla={hasPinnedVilla}
        pinnedVilla={pinnedVilla}
        selectedGuessName={selectedGuessName}
        setSelectedGuessName={setSelectedGuessName}
        resetMystery={resetMystery}
        spinning={spinning}
        setSpinning={setSpinning}
        brandSubdomain={normalizeSubdomain(brand.subdomain)}
        onSignOut={signOutHost}
      />
    );
  }

  const displayVilla =
    villas.find((villa) => villa.name === "Luxury villa with pool bar and heatable pool") ?? null;
  const showingOriginalPin = Boolean(displayVilla);

  return (
    <GuestDashboard
      planner={planner}
      brand={brand}
      guestSummary={guestSummary}
      countdownDays={countdownDays}
      displayVilla={displayVilla}
      hasPinnedVilla={showingOriginalPin}
      villaImageSrc={villaImageSrc}
      deepSections={null}
    />
  );
}
