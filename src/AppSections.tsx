import { Box, Button, Card, Flex, Grid, Heading, Select, Text, TextField } from "@radix-ui/themes";
import { AirplaneTakeoff, Sparkle, UserCircle } from "./lib/icons";
import { Chip } from "./components/Chip";
import { VillaCard } from "./components/VillaCard";
import type { useTripPlanner } from "./hooks/useTripPlanner";
import { currency } from "./lib/format";

type Planner = ReturnType<typeof useTripPlanner>;

type Props = {
  planner: Planner;
  memberName: string;
  setMemberName: (v: string) => void;
  memberAge: string;
  setMemberAge: (v: string) => void;
  guestSummary: string;
  googleFlightsSearchUrl: string;
  /** Hide duplicate overview when guest shell already shows summary */
  sectionsOnly?: boolean;
};

export function AppSections({
  planner,
  memberName,
  setMemberName,
  memberAge,
  setMemberAge,
  googleFlightsSearchUrl,
  sectionsOnly = false,
}: Props) {
  const {
    viewMode,
    destination,
    trip,
    activityFilter,
    setActivityFilter,
    matchedVillas,
    activeAreas,
    activities,
    familyMembers,
    addMember,
    removeMember,
    pinnedVillaName,
    pinVilla,
    setSelectedGuessName,
    villaImageSrc,
    villaPricePerNight,
    getAgeGroup,
  } = planner;

  const isGuest = viewMode === "guest";
  const isHost = viewMode === "host";

  const rankedActivities = activities
    .filter((a) => activityFilter === "all" || a.type.includes(activityFilter))
    .map((activity) => ({
      ...activity,
      score: familyMembers.filter((m) => activity.ages.includes(getAgeGroup(m.age))).length,
    }))
    .sort((a, b) => b.score - a.score);

  const matchPercent = (score: number) =>
    familyMembers.length ? Math.round((score / familyMembers.length) * 100) : 0;

  const topMatches = activities
    .map((activity) => ({
      ...activity,
      score: familyMembers.filter((m) => activity.ages.includes(getAgeGroup(m.age))).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <>
      {isGuest && !sectionsOnly && (
        <Grid columns={{ initial: "1", md: "2" }} gap="5" className="overview-board guest-only" id="overview">
          <Card className="why-card">
            <Text size="1" weight="bold" className="eyebrow" as="p">
              Why {destination.label} in winter?
            </Text>
            <Heading size="5">Sunny, calmer, and easier for a big family.</Heading>
            <div className="reason-list">
              <span>
                <Sparkle size={20} aria-hidden /> <b>Mild days</b> 16–20°C for exploring
              </span>
              <span>
                <Sparkle size={20} aria-hidden /> <b>Less crowded</b> beaches and towns
              </span>
              <span>
                <Sparkle size={20} aria-hidden /> <b>Better value</b> winter villa pricing
              </span>
              <span>
                <Sparkle size={20} aria-hidden /> <b>Nature</b> cliffs, caves and walks
              </span>
            </div>
          </Card>
          <Card className="villa-preview-panel">
            <Flex justify="between" mb="4" className="section-row">
              <Box>
                <Text size="1" weight="bold" className="eyebrow" as="p">
                  Top rated villas
                </Text>
                <Heading size="5">Shortlist preview</Heading>
              </Box>
              <a href="#pinned">View reveal</a>
            </Flex>
            <div className="preview-villas">
              {matchedVillas.slice(0, 4).map((villa) => (
                <article key={villa.name}>
                  <img
                    src={villaImageSrc(villa)}
                    alt=""
                    style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 12 }}
                  />
                  <strong>{villa.name}</strong>
                  <span>
                    {villa.area} · {villa.rating} · {currency.format(villaPricePerNight(villa))}/ night
                  </span>
                </article>
              ))}
            </div>
          </Card>
        </Grid>
      )}

      {isHost && (
        <section className="content-grid host-only results-section" id="results">
          <aside className="results-aside">
            <div className="section-intro">
              <Text size="1" weight="bold" className="eyebrow" as="p">
                Shortlist
              </Text>
              <Heading size="6">Suggested {destination.label} villa bases</Heading>
              <Text size="2" color="gray" as="p">
                Partner API records for {destination.displayName}. Compare family fit, then pin one
                choice for the guest link.
              </Text>
              <Text size="2" className="results-api-note" as="p">
                <Sparkle size={16} aria-hidden /> Inventory layer connected in prototype mode.
              </Text>
            </div>
          </aside>
          <div className="results-panel">
            <Card className="result-meta">
              <Text weight="bold">
                {matchedVillas.length} {matchedVillas.length === 1 ? "match" : "matches"}
              </Text>
              <Text size="2" color="gray">
                Sorted by family fit, rating, and amenity access
              </Text>
            </Card>
            <div className="villa-list">
              {matchedVillas.length === 0 ? (
                <Card className="empty">
                  <Text size="2" color="gray">
                    No villas match those filters yet. Raise the budget or loosen filters.
                  </Text>
                </Card>
              ) : (
                matchedVillas.map((villa) => (
                  <VillaCard
                    key={villa.name}
                    villa={villa}
                    nights={trip.nights}
                    imageSrc={villaImageSrc(villa)}
                    pricePerNight={villaPricePerNight(villa)}
                    isPinned={villa.name === pinnedVillaName}
                    onPin={() => {
                      pinVilla(villa.name);
                      document.querySelector("#pinned")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onGuess={() => {
                      setSelectedGuessName(villa.name);
                      document.querySelector("#pinned")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {isHost && (
        <section className="area-band host-only" aria-labelledby="areasTitle">
          <Box>
            <Text size="1" weight="bold" className="eyebrow" as="p">
              Area intelligence
            </Text>
            <Heading size="6" id="areasTitle">
              Where to focus the first search in {destination.label}
            </Heading>
          </Box>
          <div className="area-grid">
            {activeAreas.map((area) => (
              <Card key={area.name} className="area-card">
                <Text weight="bold">{area.name}</Text>
                <Text size="2" color="gray" as="p">
                  <Text weight="bold" as="span">
                    {area.verdict}.
                  </Text>{" "}
                  {area.detail}
                </Text>
              </Card>
            ))}
          </div>
        </section>
      )}

      {isGuest && (
        <section className="family-section guest-only" aria-labelledby="familyTitle">
          <Flex
            direction={{ initial: "column", md: "row" }}
            align="end"
            justify="between"
            gap="4"
            mb="5"
            className="family-heading"
          >
            <Box>
              <Text size="1" weight="bold" className="eyebrow" as="p">
                Family profile
              </Text>
              <Heading size="6" id="familyTitle">
                Add names and ages for smarter activity ideas.
              </Heading>
            </Box>
            <Card className="member-form">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const age = Number(memberAge);
                  if (!memberName.trim() || Number.isNaN(age)) return;
                  addMember({ name: memberName.trim(), age });
                  setMemberName("");
                  setMemberAge("");
                }}
              >
                <Flex gap="3" wrap="wrap" align="end">
                  <Box>
                    <Text className="md-label" as="label">
                      Name
                    </Text>
                    <TextField.Root
                      value={memberName}
                      onChange={(e) => setMemberName(e.target.value)}
                      placeholder="e.g. Sofia"
                    />
                  </Box>
                  <Box>
                    <Text className="md-label" as="label">
                      Age
                    </Text>
                    <TextField.Root
                      type="number"
                      value={memberAge}
                      onChange={(e) => setMemberAge(e.target.value)}
                      placeholder="2"
                    />
                  </Box>
                  <Button type="submit" color="red" radius="full">
                    Add person
                  </Button>
                </Flex>
              </form>
            </Card>
          </Flex>
          <Grid columns={{ initial: "1", md: "2" }} gap="4" className="family-grid">
            <div className="member-list">
              {familyMembers.length === 0 ? (
                <Card className="empty">
                  <Text size="2" color="gray">
                    Add family members to personalize activities and room preferences.
                  </Text>
                </Card>
              ) : (
                familyMembers.map((member, index) => (
                  <Card key={member.name + index} className="member-card">
                    <Flex justify="between" align="center" gap="3" className="member-card-header">
                      <Flex gap="3" align="center">
                        <span className="member-avatar" aria-hidden>
                          {member.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                        <Box>
                          <Text weight="bold">{member.name}</Text>
                          <Text size="2" color="gray" className="member-meta">
                            {member.age} years old — {getAgeGroup(member.age)}
                          </Text>
                        </Box>
                      </Flex>
                      <Button variant="soft" color="gray" onClick={() => removeMember(index)}>
                        Remove
                      </Button>
                    </Flex>
                    <div
                      className="member-photo-placeholder"
                      role="img"
                      aria-label={`Photo placeholder for ${member.name}`}
                    >
                      <UserCircle size={52} weight="duotone" aria-hidden />
                      <Text size="1" color="gray">
                        Add photo
                      </Text>
                    </div>
                  </Card>
                ))
              )}
            </div>
            <Card className="matched-activities">
              <Heading size="4" mb="3">
                Best matches for this group
              </Heading>
              {topMatches.map((activity) => (
                <Box key={activity.name} className="match-card" mb="3">
                  <Flex justify="between">
                    <Text size="2">
                      {activity.score} family match{activity.score === 1 ? "" : "es"}
                    </Text>
                    <Text size="2" color="gray">
                      {activity.area}
                    </Text>
                  </Flex>
                  <Text weight="bold">{activity.name}</Text>
                  <div className="match-meter" aria-hidden>
                    <span style={{ width: `${matchPercent(activity.score)}%` }} />
                  </div>
                  <Text size="2" color="gray" as="p">
                    {activity.note}
                  </Text>
                </Box>
              ))}
            </Card>
          </Grid>
        </section>
      )}

      {isGuest && (
        <section className="activities-section guest-only" aria-labelledby="activitiesTitle">
          <Flex
            direction={{ initial: "column", md: "row" }}
            align="end"
            justify="between"
            gap="4"
            mb="5"
            className="activities-heading"
          >
            <Box>
              <Text size="1" weight="bold" className="eyebrow" as="p">
                Things to do
              </Text>
              <Heading size="6" id="activitiesTitle">
                Seasonal ideas for {destination.label}
              </Heading>
            </Box>
            <Box style={{ minWidth: 280 }}>
              <Text className="md-label" as="label">
                Activity type
              </Text>
              <Select.Root value={activityFilter} onValueChange={setActivityFilter}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="all">All ideas</Select.Item>
                  <Select.Item value="toddler">Toddler-friendly</Select.Item>
                  <Select.Item value="christmas">Christmas / New Year</Select.Item>
                  <Select.Item value="rainy">Rainy day backup</Select.Item>
                  <Select.Item value="outdoors">Outdoor gentle day</Select.Item>
                </Select.Content>
              </Select.Root>
            </Box>
          </Flex>
          <div className="activity-grid">
            {rankedActivities.map((activity) => (
              <Card key={activity.name} className="activity-card">
                <Box>
                  <Flex justify="between" mb="2">
                    <span className="status-pill">{activity.status}</span>
                    <Text size="2" weight="bold" color="red" className="match-score">
                      {activity.score}/{familyMembers.length || 0}
                    </Text>
                  </Flex>
                  <Heading size="4">{activity.name}</Heading>
                  <div className="match-meter" aria-hidden>
                    <span style={{ width: `${matchPercent(activity.score)}%` }} />
                  </div>
                  <Text size="2" as="p">
                    <Text weight="bold" as="span">
                      {activity.area}
                    </Text>{" "}
                    — {activity.note}
                  </Text>
                </Box>
                <div className="villa-chips">
                  {activity.ages.map((age) => (
                    <Chip key={age} label={age} className="chip age-chip" />
                  ))}
                  {activity.type.map((type) => (
                    <Chip key={type} label={type} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {isGuest && (
        <Card className="amenities-board guest-only" id="amenities" size="3">
          <Flex justify="between" mb="4" className="section-row">
            <Box>
              <Text size="1" weight="bold" className="eyebrow" as="p">
                Nearby amenities
              </Text>
              <Heading size="5">Everything guests will ask for first.</Heading>
            </Box>
            <a href="#pinned">View map</a>
          </Flex>
          <div className="amenity-grid">
            <span>
              <b>Supermarket</b> 2 min
            </span>
            <span>
              <b>Beach</b> 5 min
            </span>
            <span>
              <b>Pharmacy</b> 3 min
            </span>
            <span>
              <b>Cafe</b> 2 min
            </span>
            <span>
              <b>Restaurant</b> 3 min
            </span>
            <span>
              <b>Kids park</b> 4 min
            </span>
            <span>
              <b>Golf</b> 8 min
            </span>
            <span>
              <b>Fuel</b> 4 min
            </span>
          </div>
        </Card>
      )}

      {isGuest && (
        <Card className="plan-banner guest-only" id="plan" size="3">
          <Flex align="center" gap="5" wrap="wrap">
            <div className="banner-art" aria-hidden />
            <Box style={{ flex: 1 }}>
              <Heading size="5">Let&apos;s make this trip unforgettable.</Heading>
              <Text size="2" color="gray" as="p">
                Plan together, save favorites, and keep the villa reveal, flights, amenities and
                activities in one place.
              </Text>
            </Box>
            <Button asChild color="red" radius="full">
              <a href="#pinned">Start planning together</a>
            </Button>
          </Flex>
        </Card>
      )}

      {isGuest && (
        <Grid columns={{ initial: "1", md: "2" }} gap="5" className="travel-weather guest-only">
          <Card>
            <Text size="1" weight="bold" className="eyebrow" as="p">
              {destination.label} in late December
            </Text>
            <Heading size="5">Mild days, cool evenings.</Heading>
            <div className="weather-row">
              <span>Mon 18°C</span>
              <span>Tue 17°C</span>
              <span>Wed 18°C</span>
              <span>Thu 17°C</span>
              <span>Fri 16°C</span>
            </div>
          </Card>
          <Card>
            <Text size="1" weight="bold" className="eyebrow" as="p">
              Flights &amp; travel tips
            </Text>
            <Heading size="5">Find the best routes into {destination.airport.city}.</Heading>
            <Text size="2" color="gray" as="p">
              Smart picks for {originLabel(planner.originCity)} → {destination.airport.code} on your
              trip dates. Google Flights has no public API — we open a dated search for you.
            </Text>
            <Button asChild variant="outline" mt="3" radius="full">
              <a href={googleFlightsSearchUrl} target="_blank" rel="noopener noreferrer">
                <AirplaneTakeoff size={18} aria-hidden />
                Search on Google Flights
              </a>
            </Button>
          </Card>
        </Grid>
      )}

      {isHost && (
        <section className="api-section host-only" id="api">
          <Box>
            <Text size="1" weight="bold" className="eyebrow" as="p">
              API setup guide
            </Text>
            <Heading size="6">Connect inventory first, then use AI for ranking.</Heading>
            <Text size="2" color="gray" as="p">
              Google Flights does not offer a public search API. Use deep links in the UI, plus
              Amadeus or Duffel on a backend for live fares.
            </Text>
          </Box>
          <div className="api-cards">
            <Card>
              <Heading size="4">Stays inventory</Heading>
              <Text size="2" as="p">
                Booking.com Demand API or Expedia Rapid for search and rates.
              </Text>
            </Card>
            <Card>
              <Heading size="4">Places and activities</Heading>
              <Text size="2" as="p">
                Google Places or Viator partner feeds for amenities and hours.
              </Text>
            </Card>
            <Card>
              <Heading size="4">Flights</Heading>
              <Text size="2" as="p">
                Amadeus, Duffel, or SerpApi Google Flights via server proxy — not from the browser.
              </Text>
            </Card>
            <Card>
              <Heading size="4">AI planner</Heading>
              <Text size="2" as="p">
                OpenAI for structured trip scoring and itinerary JSON.
              </Text>
            </Card>
          </div>
        </section>
      )}
    </>
  );
}

function originLabel(city: string) {
  return city.trim() || "Dublin";
}
