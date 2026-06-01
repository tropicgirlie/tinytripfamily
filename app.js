const trip = {
  guests: 10,
  checkIn: "2026-12-27",
  checkOut: "2027-01-07",
  nights: 11,
};

const pinnedStorageKey = "micheauFamilyTripPinned";
let pinnedVillaName = localStorage.getItem(pinnedStorageKey) || "";
let selectedGuessName = "";
let familyMembers = JSON.parse(localStorage.getItem("tinyTripFamilyMembers") || "null") || [
  { name: "Toddler", age: 2 },
  { name: "Luana", age: 36 },
];

const brandDefaults = {
  name: "Micheau Family Trip",
  subdomain: "micheau",
  logo: "./assets/micheau-logo.svg",
};

let brandState = {
  ...brandDefaults,
  ...(JSON.parse(localStorage.getItem("tinyTripIndexBrand") || "null") || {}),
};

if (brandState.name === "Luana's Family Trip") {
  brandState.name = brandDefaults.name;
}

if (brandState.subdomain === "luana") {
  brandState.subdomain = brandDefaults.subdomain;
}

function placeholderImage(label, tone = "villa") {
  const palette =
    tone === "activity"
      ? { bg: "#eef6ff", line: "#c9ddff", text: "#315aa8" }
      : { bg: "#f7f7f7", line: "#d8d8d8", text: "#6f6f6f" };
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650">
      <rect width="900" height="650" rx="32" fill="${palette.bg}"/>
      <path d="M120 462 286 310l116 104 88-82 290 214H120Z" fill="#fff" stroke="${palette.line}" stroke-width="10"/>
      <circle cx="642" cy="188" r="58" fill="#fff" stroke="${palette.line}" stroke-width="10"/>
      <rect x="80" y="78" width="740" height="494" rx="28" fill="none" stroke="${palette.line}" stroke-width="10" stroke-dasharray="18 18"/>
      <text x="450" y="596" text-anchor="middle" font-family="Nunito Sans, sans-serif" font-size="34" font-weight="700" fill="${palette.text}">${label}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const areas = [
  {
    name: "Carvoeiro / Ferragudo",
    verdict: "Best overall first search",
    detail:
      "Central Algarve base with coves, restaurants, supermarkets, and easy day trips to Lagos, Albufeira, and Faro.",
  },
  {
    name: "Vilamoura / Quarteira",
    verdict: "Best for walkable marina evenings",
    detail:
      "Polished, convenient, and close to golf, beaches, restaurants, pharmacies, and bigger supermarkets.",
  },
  {
    name: "Lagos / Praia da Luz",
    verdict: "Best scenery and town energy",
    detail:
      "Excellent beaches and restaurants, but farther west for Faro airport and eastern Algarve day trips.",
  },
  {
    name: "Vale do Lobo / Quinta do Lago",
    verdict: "Best luxury option",
    detail:
      "High-end villas, resort amenities, golf, beach clubs, and strong services, usually at a higher price.",
  },
  {
    name: "Tavira / Cabanas",
    verdict: "Best quieter suggestion",
    detail:
      "Lovely eastern Algarve towns with a local feel; farther from many classic central/western beach outings.",
  },
  {
    name: "Albufeira / Olhos de Agua",
    verdict: "Best for broad inventory",
    detail:
      "Large supply of villas and restaurants; choose carefully for winter calm and family-friendly surroundings.",
  },
];

const villas = [
  {
    name: "Cove House for a Christmas Crew",
    area: "Carvoeiro / Ferragudo",
    price: 9800,
    bedrooms: 6,
    bathrooms: 5,
    rating: 4.9,
    distance: "8 min drive to Carvoeiro beach",
    fit: 96,
    source: "Booking.com / Vrbo style match",
    amenities: ["heated pool", "beach nearby", "supermarket nearby", "games room"],
    childAmenities: ["crib available", "high chair", "toddler-safe pool gate", "playground nearby"],
    bestFor: ["toddler", "balanced base", "short drives"],
    activities: [
      "Benagil and Carvoeiro coastal walk",
      "Ferragudo lunch and marina stroll",
      "Slide & Splash or Zoomarine if open for the season",
    ],
    bring: ["warm layers for evenings", "pool towels", "walking shoes", "family board games"],
    flights: "Fly into Faro Airport, then plan a 45-55 minute transfer or hire cars for day trips.",
    note:
      "The strongest first pick: central, practical for groceries and restaurants, and friendly for mixed ages.",
    image: placeholderImage("Villa placeholder 1"),
  },
  {
    name: "Marina Walk Villa",
    area: "Vilamoura / Quarteira",
    price: 11200,
    bedrooms: 6,
    bathrooms: 6,
    rating: 4.8,
    distance: "12 min walk to marina restaurants",
    fit: 92,
    source: "Expedia Rapid / Vrbo style match",
    amenities: ["heated pool", "walkable restaurants", "supermarket nearby", "golf nearby"],
    childAmenities: ["crib available", "high chair", "playground nearby"],
    bestFor: ["toddler", "walkable dinners", "easy airport transfer"],
    activities: [
      "Vilamoura marina dinners",
      "Quarteira promenade walk",
      "Golf lesson or spa afternoon",
    ],
    bring: ["smart-casual dinner clothes", "swimwear", "light rain jackets", "golf gear if needed"],
    flights: "Fly into Faro Airport, then plan a 25-35 minute transfer. Cars are still useful for beaches.",
    note:
      "Great if the family wants easy dinners without driving. Usually more polished, sometimes less characterful.",
    image: placeholderImage("Villa placeholder 2"),
  },
  {
    name: "Praia da Luz Long Table Villa",
    area: "Lagos / Praia da Luz",
    price: 8700,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.7,
    distance: "10 min drive to Lagos old town",
    fit: 88,
    source: "Booking.com / direct villa agency style match",
    amenities: ["beach nearby", "walkable restaurants", "family kitchen", "sea view"],
    childAmenities: ["crib available", "high chair"],
    bestFor: ["scenery", "older kids", "beach walks"],
    activities: [
      "Lagos old town and marina",
      "Ponta da Piedade viewpoints",
      "Praia da Luz beach walks",
    ],
    bring: ["windbreakers", "walking shoes", "binoculars for viewpoints", "car seats if hiring cars"],
    flights: "Fly into Faro Airport, then plan a 60-75 minute transfer. This base benefits from car hire.",
    note:
      "A scenic western option with excellent beaches nearby, but it is a longer run from Faro airport.",
    image: placeholderImage("Villa placeholder 3"),
  },
  {
    name: "Golden Triangle Resort Villa",
    area: "Vale do Lobo / Quinta do Lago",
    price: 16500,
    bedrooms: 7,
    bathrooms: 7,
    rating: 4.9,
    distance: "6 min drive to beach clubs",
    fit: 86,
    source: "Vrbo / luxury villa partner style match",
    amenities: ["heated pool", "golf nearby", "private chef option", "supermarket nearby"],
    childAmenities: ["crib available", "high chair", "toddler-safe pool gate"],
    bestFor: ["luxury", "toddler", "resort services"],
    activities: [
      "Quinta do Lago nature trail",
      "Vale do Lobo beach afternoon",
      "Private chef dinner at the villa",
    ],
    bring: ["restaurant outfits", "trainers for resort paths", "swimwear", "booking confirmations"],
    flights: "Fly into Faro Airport, then plan a 20-30 minute transfer. Private transfers work well here.",
    note:
      "Excellent for comfort and services, but it pushes the budget and may need cars for most outings.",
    image: placeholderImage("Villa placeholder 4"),
  },
  {
    name: "Olhos de Agua Family Base",
    area: "Albufeira / Olhos de Agua",
    price: 7600,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.6,
    distance: "15 min walk to local beach",
    fit: 84,
    source: "Booking.com / Expedia style match",
    amenities: ["walkable restaurants", "beach nearby", "supermarket nearby", "pool"],
    childAmenities: ["high chair", "playground nearby"],
    bestFor: ["value", "walkable basics", "broad inventory"],
    activities: [
      "Olhos de Agua beach",
      "Albufeira old town lunch",
      "Clifftop walks toward Falesia",
    ],
    bring: ["comfortable shoes", "beach layers", "shared grocery list", "portable chargers"],
    flights: "Fly into Faro Airport, then plan a 35-45 minute transfer. Check the exact street for calm.",
    note:
      "Good value and broad inventory. Best when the exact street is calm and away from late-night zones.",
    image: placeholderImage("Villa placeholder 5"),
  },
  {
    name: "Tavira Slow Winter House",
    area: "Tavira / Cabanas",
    price: 6900,
    bedrooms: 5,
    bathrooms: 4,
    rating: 4.8,
    distance: "9 min drive to Tavira centre",
    fit: 78,
    source: "Direct villa agency style match",
    amenities: ["supermarket nearby", "quiet area", "heated pool", "historic town"],
    childAmenities: ["crib available", "high chair"],
    bestFor: ["quiet stay", "slow travel", "winter town walks"],
    activities: [
      "Tavira historic centre",
      "Ria Formosa boat trip",
      "Cabanas waterfront lunch",
    ],
    bring: ["warm layers", "books", "walking shoes", "birdwatching or camera gear"],
    flights: "Fly into Faro Airport, then plan a 35-45 minute transfer. Cars help for wider Algarve outings.",
    note:
      "A beautiful quieter suggestion if the family wants slower days. Less central for classic Algarve touring.",
    image: placeholderImage("Villa placeholder 6"),
  },
];

const activities = [
  {
    name: "Lagos Christmas market and old town lights",
    area: "Lagos",
    type: ["christmas", "toddler", "rainy"],
    status: "2026 dates to verify",
    ages: ["toddler", "kids", "adults"],
    note:
      "Good family evening option if the market returns in late December. Keep this as a festive candidate until official 2026 dates are published.",
  },
  {
    name: "Vila Real de Santo Antonio Vila Natal",
    area: "Eastern Algarve",
    type: ["christmas", "toddler"],
    status: "Likely seasonal pattern",
    ages: ["toddler", "kids", "adults", "grandparents"],
    note:
      "Past editions have run from late November into early January, which makes it useful for the 27 Dec to 7 Jan trip window.",
  },
  {
    name: "Portimao Christmas village",
    area: "Portimao",
    type: ["christmas", "toddler", "rainy"],
    status: "2026 dates to verify",
    ages: ["toddler", "kids", "adults"],
    note:
      "A practical family option when running, with Santa-style programming, lights, and simple child-friendly entertainment.",
  },
  {
    name: "Benagil or Carvoeiro coastal viewpoint",
    area: "Carvoeiro",
    type: ["outdoors"],
    status: "Weather dependent",
    ages: ["kids", "adults", "grandparents"],
    note:
      "Best for calm dry days. With a 2-year-old, plan a short viewpoint stop rather than a long cliff walk.",
  },
  {
    name: "Zoomarine or indoor play backup",
    area: "Albufeira / Guia",
    type: ["toddler", "rainy"],
    status: "Seasonal opening to verify",
    ages: ["toddler", "kids"],
    note:
      "Keep as a rainy-day candidate, but opening calendars should be checked close to travel.",
  },
  {
    name: "Supermarket and pharmacy setup run",
    area: "Pinned villa area",
    type: ["toddler", "rainy"],
    status: "Day-one essential",
    ages: ["toddler", "adults"],
    note:
      "Add nappies, snacks, milk, wipes, child medicine basics, and breakfast food before everyone arrives.",
  },
  {
    name: "Private chef and early family dinner",
    area: "Pinned villa",
    type: ["rainy"],
    status: "Book after villa is final",
    ages: ["toddler", "kids", "adults", "grandparents"],
    note:
      "Best for a mixed-age group because the toddler can sleep while adults still get a proper dinner.",
  },
  {
    name: "Older kids beach photo challenge",
    area: "Nearest beach",
    type: ["outdoors"],
    status: "Low-cost idea",
    ages: ["kids", "teens"],
    note:
      "Give children and teens a scavenger list: shells, cliffs, funny family photo, sunset, and best snack.",
  },
];

const flightAlerts = [
  {
    airline: "Aer Lingus",
    route: "Dublin to Faro",
    status: "Seats showing",
    trend: "Direct route",
    action: "Book soon",
    nudge: "Book soon for the Christmas week return window.",
  },
  {
    airline: "Ryanair",
    route: "Dublin to Faro",
    status: "Low fare watch",
    trend: "Price watch",
    action: "Track weekly",
    nudge: "Good option for family members booking separately.",
  },
  {
    airline: "TAP / connection",
    route: "Lisbon or Porto to Faro",
    status: "Backup route",
    trend: "Fallback",
    action: "Keep open",
    nudge: "Useful if direct flights get expensive.",
  },
];

const currency = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const areaFilter = document.querySelector("#areaFilter");
const priceFilter = document.querySelector("#priceFilter");
const priceValue = document.querySelector("#priceValue");
const bedFilter = document.querySelector("#bedFilter");
const amenityFilter = document.querySelector("#amenityFilter");
const childFilter = document.querySelector("#childFilter");
const villaList = document.querySelector("#villaList");
const resultCount = document.querySelector("#resultCount");
const areaGrid = document.querySelector("#areaGrid");
const activityFilter = document.querySelector("#activityFilter");
const activityGrid = document.querySelector("#activityGrid");
const pinnedName = document.querySelector("#pinnedName");
const pinnedContent = document.querySelector("#pinnedContent");
const countdownDays = document.querySelector("#countdownDays");
const flightWatch = document.querySelector("#flightWatch");
const heroCountdownDays = document.querySelector("#heroCountdownDays");
const landingHero = document.querySelector("#landingHero");
const brandNameInput = document.querySelector("#brandNameInput");
const subdomainInput = document.querySelector("#subdomainInput");
const brandLogoInput = document.querySelector("#brandLogoInput");
const brandLogoUpload = document.querySelector("#brandLogoUpload");
const brandLogo = document.querySelector("#brandLogo");
const brandHeroTitle = document.querySelector("#brandHeroTitle");
const phoneBrandName = document.querySelector("#phoneBrandName");
const footerBrandName = document.querySelector("#footerBrandName");
const subdomainPreview = document.querySelector("#subdomainPreview");
const heroVillaImage = document.querySelector("#heroVillaImage");
const heroVillaName = document.querySelector("#heroVillaName");
const heroVillaMeta = document.querySelector("#heroVillaMeta");
const heroBeds = document.querySelector("#heroBeds");
const memberForm = document.querySelector("#memberForm");
const memberName = document.querySelector("#memberName");
const memberAge = document.querySelector("#memberAge");
const memberList = document.querySelector("#memberList");
const matchedActivities = document.querySelector("#matchedActivities");
const hostViewLink = document.querySelector("#hostViewLink");
const guestViewLink = document.querySelector("#guestViewLink");

function initAreaOptions() {
  areas.forEach((area) => {
    const option = document.createElement("option");
    option.value = area.name;
    option.textContent = area.name;
    areaFilter.append(option);
  });
}

function renderAreas() {
  areaGrid.innerHTML = areas
    .map(
      (area) => `
        <article class="area-card">
          <strong>${area.name}</strong>
          <p><b>${area.verdict}.</b> ${area.detail}</p>
        </article>
      `,
    )
    .join("");
}

function villaMatches(villa) {
  const maxPrice = Number(priceFilter.value);
  const minBeds = Number(bedFilter.value);
  const amenity = amenityFilter.value;
  const childAmenity = childFilter.value;
  const area = areaFilter.value;

  return (
    villa.price <= maxPrice &&
    villa.bedrooms >= minBeds &&
    (amenity === "all" || villa.amenities.includes(amenity)) &&
    (childAmenity === "all" || villa.childAmenities.includes(childAmenity)) &&
    (area === "all" || villa.area === area)
  );
}

function renderVillas() {
  priceValue.textContent = `${currency.format(Number(priceFilter.value))} total`;
  const matches = villas.filter(villaMatches).sort((a, b) => b.fit - a.fit || b.rating - a.rating);

  resultCount.textContent = `${matches.length} ${matches.length === 1 ? "match" : "matches"}`;

  if (!matches.length) {
    villaList.innerHTML = `
      <div class="empty">
        No villas match those filters yet. Raise the budget, lower the bedroom count, or remove the amenity filter.
      </div>
    `;
    return;
  }

  villaList.innerHTML = matches
    .map(
      (villa) => `
        <article class="villa-card">
          <div class="villa-media">
            <img src="${villa.image}" alt="${villa.area} villa with family-sized outdoor space" loading="lazy" />
            <span>${villa.source}</span>
          </div>
          <div class="villa-copy">
            <div class="villa-head">
              <div>
                <p class="eyebrow">${villa.area}</p>
                <h3>${villa.name}</h3>
                <span class="listing-rating"><i class="ph ph-star" aria-hidden="true"></i>${villa.rating} rating target - <i class="ph ph-sparkle" aria-hidden="true"></i>${villa.fit}% AI family fit</span>
              </div>
              <div class="villa-price">${currency.format(villa.price)}</div>
            </div>
            <div class="fit-strip" aria-label="${villa.fit}% family fit">
              <span style="width: ${villa.fit}%"></span>
            </div>
            <p>${villa.note}</p>
            <div class="chips">
              ${villa.amenities.map((amenity) => renderChip(amenity)).join("")}
              ${villa.childAmenities.map((amenity) => renderChip(amenity, "chip child-chip")).join("")}
            </div>
            <div class="villa-stats">
              <div class="stat"><i class="ph ph-bed" aria-hidden="true"></i><strong>${villa.bedrooms}</strong><span>bedrooms</span></div>
              <div class="stat"><i class="ph ph-star" aria-hidden="true"></i><strong>${villa.rating}</strong><span>rating target</span></div>
              <div class="stat"><i class="ph ph-sparkle" aria-hidden="true"></i><strong>${villa.fit}%</strong><span>AI fit</span></div>
            </div>
            <p><b>Nearby:</b> ${villa.distance}.</p>
            <div class="villa-actions">
              <button class="guess-button" type="button" data-guess="${villa.name}">
                <i class="ph ph-question" aria-hidden="true"></i>Guess final villa
              </button>
              <button class="pin-button" type="button" data-pin="${villa.name}">
                <i class="ph ph-push-pin" aria-hidden="true"></i>${villa.name === pinnedVillaName ? "Pinned as plan" : "Pin as host choice"}
              </button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll("[data-pin]").forEach((button) => {
    button.addEventListener("click", () => {
      pinnedVillaName = button.dataset.pin;
      localStorage.setItem(pinnedStorageKey, pinnedVillaName);
      renderPinnedPlan();
      renderVillas();
      document.querySelector("#pinned").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-guess]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedGuessName = button.dataset.guess;
      renderPinnedPlan();
      document.querySelector("#pinned").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function bindFilters() {
  [areaFilter, priceFilter, bedFilter, amenityFilter, childFilter].forEach((input) => {
    input.addEventListener("input", renderVillas);
  });
  activityFilter.addEventListener("input", renderActivities);
  document.querySelector("#destinationInput").addEventListener("input", renderBrand);

  [brandNameInput, subdomainInput, brandLogoInput].forEach((input) => {
    input.addEventListener("input", () => {
      brandState = {
        name: brandNameInput.value.trim() || brandDefaults.name,
        subdomain: normalizeSubdomain(subdomainInput.value),
        logo: brandLogoInput.value.trim() || brandDefaults.logo,
      };
      saveAndRenderBrand();
    });
  });

  brandLogoUpload.addEventListener("change", () => {
    const file = brandLogoUpload.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      brandState.logo = reader.result;
      brandLogoInput.value = "Uploaded image";
      saveAndRenderBrand();
    });
    reader.readAsDataURL(file);
  });

  memberForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = memberName.value.trim();
    const age = Number(memberAge.value);
    if (!name || Number.isNaN(age)) return;

    familyMembers.push({ name, age });
    memberName.value = "";
    memberAge.value = "";
    saveAndRenderFamily();
  });
}

function getViewMode() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("view");
  if (requested === "guest" || requested === "host") return requested;
  return localStorage.getItem("tinyTripViewMode") || "guest";
}

function renderViewMode() {
  const mode = getViewMode();
  localStorage.setItem("tinyTripViewMode", mode);
  document.body.classList.toggle("guest-view", mode === "guest");
  document.body.classList.toggle("host-view", mode === "host");
  hostViewLink.classList.toggle("active", mode === "host");
  guestViewLink.classList.toggle("active", mode === "guest");
}

function normalizeSubdomain(value) {
  return (value || brandDefaults.subdomain)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 42) || brandDefaults.subdomain;
}

function saveAndRenderBrand() {
  localStorage.setItem("tinyTripIndexBrand", JSON.stringify(brandState));
  renderBrand();
}

function renderBrand() {
  const cleanSubdomain = normalizeSubdomain(brandState.subdomain);
  const title = brandState.name || brandDefaults.name;
  brandState.subdomain = cleanSubdomain;
  brandNameInput.value = title;
  subdomainInput.value = cleanSubdomain;
  if (!brandState.logo.startsWith("data:")) {
    brandLogoInput.value = brandState.logo;
  }
  brandLogo.src = brandState.logo || brandDefaults.logo;
  brandLogo.alt = title;
  phoneBrandName.textContent = title;
  footerBrandName.textContent = title;
  subdomainPreview.textContent = `${cleanSubdomain}.tinytripindex.com`;
  document.title = `${title} | TinyTripIndex`;

  const destination = document.querySelector("#destinationInput")?.value.replace(", Portugal", "") || "Algarve";
  brandHeroTitle.textContent = `Our ${destination} family escape`;
}

function renderList(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

const chipIconMap = {
  adults: "ph-user",
  "beach nearby": "ph-umbrella",
  "crib available": "ph-baby-carriage",
  christmas: "ph-confetti",
  "family kitchen": "ph-cooking-pot",
  "games room": "ph-game-controller",
  "golf nearby": "ph-golf",
  "heated pool": "ph-swimming-pool",
  "high chair": "ph-baby",
  "historic town": "ph-buildings",
  kids: "ph-users-three",
  outdoors: "ph-tree",
  "playground nearby": "ph-baby",
  pool: "ph-swimming-pool",
  "private chef option": "ph-chef-hat",
  "quiet area": "ph-moon",
  rainy: "ph-cloud-rain",
  "sea view": "ph-waves",
  "supermarket nearby": "ph-shopping-cart",
  teens: "ph-user-circle",
  toddler: "ph-baby",
  "toddler-safe pool gate": "ph-shield-check",
  "walkable restaurants": "ph-fork-knife",
};

function renderChip(label, className = "chip") {
  const icon = chipIconMap[label] || "ph-check-circle";
  return `<span class="${className}"><i class="ph ${icon}" aria-hidden="true"></i>${label}</span>`;
}

function getAgeGroup(age) {
  if (age <= 3) return "toddler";
  if (age <= 12) return "kids";
  if (age <= 17) return "teens";
  if (age >= 65) return "grandparents";
  return "adults";
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function getMatchPercent(score) {
  if (!familyMembers.length) return 0;
  return Math.round((score / familyMembers.length) * 100);
}

function saveAndRenderFamily() {
  localStorage.setItem("tinyTripFamilyMembers", JSON.stringify(familyMembers));
  renderFamily();
  renderActivities();
  renderPinnedPlan();
}

function removeMember(index) {
  familyMembers = familyMembers.filter((_, memberIndex) => memberIndex !== index);
  saveAndRenderFamily();
}

function getActivityScore(activity) {
  const groups = familyMembers.map((member) => getAgeGroup(member.age));
  const matches = groups.filter((group) => activity.ages.includes(group)).length;
  return matches;
}

function renderFamily() {
  if (!familyMembers.length) {
    memberList.innerHTML = `
      <article class="empty">
        Add family members to personalize activities and room preferences.
      </article>
    `;
  } else {
    memberList.innerHTML = familyMembers
      .map(
        (member, index) => `
          <article class="member-card">
            <div class="member-person">
              <span class="member-avatar" aria-hidden="true">${getInitials(member.name)}</span>
              <div>
                <strong>${member.name}</strong>
                <span>${member.age} years old - ${getAgeGroup(member.age)}</span>
              </div>
            </div>
            <button type="button" data-remove-member="${index}">Remove</button>
          </article>
        `,
      )
      .join("");
  }

  document.querySelectorAll("[data-remove-member]").forEach((button) => {
    button.addEventListener("click", () => removeMember(Number(button.dataset.removeMember)));
  });

  const ranked = activities
    .map((activity) => ({ ...activity, score: getActivityScore(activity) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  matchedActivities.innerHTML = `
    <h3>Best matches for this group</h3>
    ${ranked
      .map(
        (activity) => `
          <article class="match-card">
            <div class="component-row">
              <span>${activity.score} family match${activity.score === 1 ? "" : "es"}</span>
              <span>${activity.area}</span>
            </div>
            <strong>${activity.name}</strong>
            <div class="match-meter" aria-label="${activity.score} family matches">
              <span style="width: ${getMatchPercent(activity.score)}%"></span>
            </div>
            <p>${activity.note}</p>
          </article>
        `,
      )
      .join("")}
  `;
}

function renderRoomPreferences(villa) {
  if (!pinnedVillaName) return "";

  const grouped = familyMembers.reduce(
    (acc, member) => {
      acc[getAgeGroup(member.age)].push(member);
      return acc;
    },
    { toddler: [], kids: [], teens: [], adults: [], grandparents: [] },
  );

  const roomIdeas = [
    grouped.toddler.length
      ? `Keep ${grouped.toddler.map((member) => member.name).join(", ")} near parents and away from pool doors.`
      : "No toddler room needs added yet.",
    grouped.grandparents.length
      ? `Prioritize ground-floor or easiest-access room for ${grouped.grandparents.map((member) => member.name).join(", ")}.`
      : "No mobility-first room request added yet.",
    grouped.kids.length || grouped.teens.length
      ? "Group children or teens near shared bathroom if the villa layout allows it."
      : "Add children or teens to generate room grouping ideas.",
  ];

  return `
    <article>
      <h3>Room preferences</h3>
      <p>This is not room booking yet. It is a lightweight preference board for the organizer after the villa is final.</p>
      <ul>${renderList(roomIdeas)}</ul>
      <p><b>Villa capacity:</b> ${villa.bedrooms} bedrooms, ${villa.bathrooms} bathrooms.</p>
    </article>
  `;
}

function renderPinnedPlan() {
  const villa = villas.find((option) => option.name === pinnedVillaName) || villas[0];
  const hasPinnedVilla = Boolean(pinnedVillaName);
  landingHero.classList.toggle("is-mystery", !hasPinnedVilla);
  landingHero.style.setProperty("--pinned-property-image", `url("${villa.image}")`);
  heroVillaImage.src = villa.image;
  heroVillaName.textContent = hasPinnedVilla ? villa.name : "Mystery Villa";
  heroVillaMeta.textContent = hasPinnedVilla
    ? `${villa.area} - ${villa.bedrooms} bed - pool - sea view`
    : "The organizer has not revealed the final choice yet";
  heroBeds.textContent = `${villa.bedrooms} bed`;
  pinnedName.textContent = hasPinnedVilla ? villa.name : "Mystery villa reveal";

  if (!hasPinnedVilla) {
    pinnedContent.innerHTML = `
      <div class="mystery-board">
        <div class="mystery-copy-panel">
          <span class="status-pill"><i class="ph ph-lock-key" aria-hidden="true"></i>Not revealed yet</span>
          <p class="mystery-copy">
            Luana is still holding the final choice. Pick which villa you think will win, then spin the reveal.
          </p>
          <div class="guess-grid">
            ${villas
              .slice(0, 3)
              .map(
                (option, index) => `
                  <button class="guess-card ${selectedGuessName === option.name ? "selected" : ""}" type="button" data-mystery-guess="${option.name}">
                    <span>Option ${index + 1}</span>
                    <img src="${option.image}" alt="Blurred mystery villa ${index + 1}" />
                    <strong>${option.area}</strong>
                    <small>${currency.format(option.price)} estimate - ${option.bedrooms} bedrooms</small>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="reveal-wheel">
          <div class="wheel" id="wheel">?</div>
          <button class="button primary" type="button" id="spinReveal"><i class="ph ph-shuffle" aria-hidden="true"></i>Spin the reveal</button>
          <p id="revealResult">No final villa has been revealed yet. The spin will tell the family to keep guessing.</p>
        </div>
      </div>
    `;

    document.querySelectorAll("[data-mystery-guess]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedGuessName = button.dataset.mysteryGuess;
        renderPinnedPlan();
      });
    });

    document.querySelector("#spinReveal").addEventListener("click", () => {
      document.querySelector("#wheel").classList.add("spinning");
      document.querySelector("#revealResult").textContent = selectedGuessName
        ? "Guess locked. Luana has not revealed the answer yet."
        : "Pick villa 1, 2, or 3 first, then spin again.";
    });
    return;
  }

  pinnedContent.innerHTML = `
    <div class="pinned-layout">
      <img src="${villa.image}" alt="${villa.area} pinned villa location" />
      <div class="pinned-summary">
        <span class="status-pill"><i class="ph ph-check-circle" aria-hidden="true"></i>Final villa pinned</span>
        <div class="pinned-meta">
          <span>${villa.area}</span>
          <span>${currency.format(villa.price)} total estimate</span>
          <span>${villa.bedrooms} bedrooms</span>
          <span>${villa.rating} rating target</span>
        </div>
        <p>${villa.note}</p>
        <div class="chips">
          ${villa.amenities.map((amenity) => renderChip(amenity)).join("")}
        </div>
      </div>
    </div>
    <div class="admin-board">
      <article>
        <h3>Organizer and payment</h3>
        <p><b>Luana is the organizer and payer.</b> She researches, pins the final choice, and shares one clean plan with the family.</p>
        <p><b>Decision status:</b> ${selectedGuessName === villa.name ? "Your guess was right." : "Pinned and ready for family review."}</p>
        <button class="guess-button" type="button" id="resetMystery">Reset to mystery mode</button>
      </article>
      <article>
        <h3>Reveal game</h3>
        <div class="mini-wheel ${selectedGuessName === villa.name ? "right" : ""}">${selectedGuessName === villa.name ? "Right" : "Pinned"}</div>
        <p>${selectedGuessName ? `Family guess: ${selectedGuessName}.` : "No family guess has been locked yet."}</p>
      </article>
      <article>
        <h3>Nearby activities</h3>
        <ul>${renderList(villa.activities)}</ul>
      </article>
      <article>
        <h3>What to bring</h3>
        <ul>${renderList(villa.bring)}</ul>
      </article>
      <article>
        <h3>2-year-old checklist</h3>
        <ul>${renderList(villa.childAmenities)}</ul>
      </article>
      ${renderRoomPreferences(villa)}
      <article>
        <h3>Flights and arrival</h3>
        <p>${villa.flights}</p>
        <p><b>Planning note:</b> Add family flight numbers here once booked so everyone can coordinate arrivals.</p>
      </article>
    </div>
  `;

  document.querySelector("#resetMystery").addEventListener("click", () => {
    pinnedVillaName = "";
    selectedGuessName = "";
    localStorage.removeItem(pinnedStorageKey);
    renderPinnedPlan();
    renderVillas();
  });
}

function renderCountdown() {
  const today = new Date();
  const start = new Date(`${trip.checkIn}T00:00:00`);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const remaining = Math.max(0, Math.ceil((start - today) / millisecondsPerDay));
  countdownDays.textContent = `${remaining} days`;
  heroCountdownDays.textContent = `${remaining} days`;
}

function renderFlights() {
  flightWatch.innerHTML = flightAlerts
    .map(
      (alert) => `
        <article class="flight-card">
          <div class="flight-card-top">
            <span><i class="ph ph-airplane-takeoff" aria-hidden="true"></i>${alert.status}</span>
            <strong><i class="ph ph-bell-ringing" aria-hidden="true"></i>${alert.action}</strong>
          </div>
          <div>
            <h3>${alert.airline}</h3>
            <p><b>${alert.route}</b> - ${alert.nudge}</p>
          </div>
          <div class="flight-meta">
            <span><i class="ph ph-trend-up" aria-hidden="true"></i>${alert.trend}</span>
            <span><i class="ph ph-map-pin" aria-hidden="true"></i>Faro airport</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderActivities() {
  const selectedType = activityFilter.value;
  const visible = activities
    .filter((activity) => selectedType === "all" || activity.type.includes(selectedType))
    .map((activity) => ({ ...activity, score: getActivityScore(activity) }))
    .sort((a, b) => b.score - a.score);

  activityGrid.innerHTML = visible
    .map(
      (activity) => `
        <article class="activity-card">
          <div>
            <div class="activity-card-top">
              <span class="status-pill">${activity.status}</span>
              <span class="match-score">${activity.score}/${familyMembers.length || 0}</span>
            </div>
            <h3>${activity.name}</h3>
            <div class="match-meter" aria-label="${activity.score} personalized matches">
              <span style="width: ${getMatchPercent(activity.score)}%"></span>
            </div>
            <p><b>${activity.area}</b> - ${activity.note}</p>
          </div>
          <div class="chips">
            ${activity.ages.map((age) => renderChip(age, "chip age-chip")).join("")}
            ${activity.type.map((type) => renderChip(type)).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

initAreaOptions();
renderViewMode();
renderAreas();
bindFilters();
renderBrand();
renderFamily();
renderPinnedPlan();
renderCountdown();
renderFlights();
renderActivities();
renderVillas();

console.info("Micheau Family Trip search defaults", trip);
