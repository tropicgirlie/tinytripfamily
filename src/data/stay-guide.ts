export type LisbonModeId = "alfa" | "intercidades" | "transfer";

export type LisbonMode = {
  id: LisbonModeId;
  label: string;
  eyebrow: string;
  duration: string;
  price: string;
  fit: string;
  points: string[];
};

export const lisbonModes: LisbonMode[] = [
  {
    id: "alfa",
    label: "Alfa Pendular",
    eyebrow: "Best way for the adults going",
    duration:
      "About 2 hours 30 minutes from Lisboa Entrecampos, and about 2 hours 38 minutes from Lisboa Oriente, in the CP timetable valid until 12 December 2026.",
    price: "2026 standard adult one way: Conforto €32.90, Turística €25.30.",
    fit: "Reserved seats, and Conforto is the first-class carriage.",
    points: [
      "Direct from Albufeira-Ferreiras to Lisboa Entrecampos and Lisboa Oriente.",
      "Get off at Entrecampos. Oriente is the aquarium station, and this group has already been to the Oceanário.",
      "The fare above is per adult. This day does not include a child.",
      "CP sells Alfa Pendular up to 60 days ahead. This stay starts after the timetable above ends, so check cp.pt for the actual clocks, and again for any January 2027 fare change.",
    ],
  },
  {
    id: "intercidades",
    label: "Intercidades",
    eyebrow: "Same railway, a little slower",
    duration:
      "About 2 hours 58 minutes to 3 hours 2 minutes from Lisboa Entrecampos in that same timetable.",
    price: "2026 standard adult one way: 1st class €29.70, 2nd class €23.45.",
    fit: "First class exists here too. Useful if Sete Rios is the easier Lisbon station.",
    points: [
      "Also direct to Albufeira-Ferreiras. In the checked timetable it also stops at Lisboa Sete Rios, which Alfa Pendular does not.",
      "The fare above is per adult. No child fare on this day.",
      "Choose it when the departure fits the day better than Alfa Pendular. Recheck times on cp.pt for 27 December 2026 to 7 January 2027.",
    ],
  },
  {
    id: "transfer",
    label: "Private transfer",
    eyebrow: "Door to door, if the train is a fuss",
    duration: "About 2 hours 30 minutes, roughly 257–258 km, mostly on the A2.",
    price: "Published per vehicle, not per seat. A car for up to 3 is listed from €300, and a van for about 7 from €429.",
    fit: "Worth it when the adults going want the villa door and no station taxi. No child seat on this day.",
    points: [
      "TheEuroRoadTrip lists Albufeira to Lisbon at €300 for a sedan up to 3, €378 for an MPV up to 4, and €429 for a van up to 7, with tolls included.",
      "Vilamoura Chauffeurs lists from €420 for up to 3 in a Mercedes, and from €546 for a vehicle up to 7, about 2 hours 30 minutes from Albufeira.",
      "Book the size that matches the adults who are going. One car is enough unless that group is bigger than three.",
    ],
  },
];

export const lisbonRecommendation = {
  title: "Take Alfa Pendular in Conforto to Lisboa Entrecampos.",
  body: "This day is adults only. The Oceanário is already done, so there is no reason to get off at Oriente. Entrecampos is the Alfa stop in the city, and Conforto is first class. Book seats for the adults who are going, about 60 days ahead. A private car is only worth it if that group wants the villa door instead of the station.",
  note: "The train uses Albufeira-Ferreiras, not the old town or the beach. Plan a taxi from Rua Almeida Garrett at both ends. A published taxi fare for that short hop was not available, so it is not quoted here.",
};

export const dishes = [
  { name: "Cataplana", note: "Seafood stew cooked in a copper pan. The Algarve dish to share." },
  { name: "Frango piri-piri", note: "Grilled chicken with the Algarve chilli sauce." },
  { name: "Arroz de marisco", note: "A wet seafood rice, good for a table that wants one big plate." },
  { name: "Bacalhau", note: "Salt cod, on almost every Portuguese menu in winter." },
  { name: "Pastel de nata", note: "The custard tart. Easy to find, and kind to a toddler schedule." },
  { name: "Dom Rodrigo", note: "An Algarve sweet of egg threads, almond and cinnamon." },
  { name: "Bolo-rei", note: "The Christmas crown cake, eaten through 6 January. This stay sits in that window." },
];

export const foodPlaces = [
  {
    name: "Pastelaria Martinique Velha",
    where: "Estrada de Santa Eulália, Albufeira",
    why: "The local place to try a Dom Rodrigo.",
  },
  {
    name: "Dom Capito",
    where: "Rua Pedro Álvares Cabral 26, old town",
    why: "An old-town restaurant where people go for cataplana and piri-piri.",
  },
];

export const supermarketStops = [
  {
    name: "Intermarché Oura",
    where: "Estrada de Santa Eulália, Edifício Oura Praia",
    walk: "About 15 min walk",
    note: "Closest shop to the villa, about 1.2 km from Rua Almeida Garrett. Use it for a top-up. Listed hours are about 08:00–20:00. Recheck Christmas Day and New Year’s Day.",
  },
  {
    name: "Pingo Doce Bela Vista",
    where: "Avenida dos Descobrimentos",
    walk: "About 25 min walk",
    note: "About 2 km from the villa. Fine on foot with a light bag. Take a short taxi for a full shop.",
  },
  {
    name: "Continente Modelo Albufeira",
    where: "Rua do Município 32",
    walk: "About 25 min walk",
    note: "About 2 km, same choice as Pingo Doce: walk if you are travelling light, taxi if you are buying for the week. The store page lists 08:00–22:00 every day, with bakery, butcher, fish and a take-away counter. Recheck 25 December and 1 January.",
  },
];

export const basket = [
  "Pastéis de nata from the bakery",
  "Bolo-rei or bolo-rainha",
  "Rotisserie chicken, if the take-away counter is open",
  "Sumol and Água das Pedras",
  "Queijo and a little presunto",
  "Tinned fish in olive oil",
  "Oranges",
  "Almonds and dried figs",
  "Olive oil for the villa kitchen",
];

export const kidSpots = [
  {
    title: "Jardim Municipal de Albufeira",
    meta: "Free · playground",
    body: "Rua de Dunfermline. Lawns, a lake, paths and a playground. The easy outing with a 2-year-old when you do not want a drive.",
  },
  {
    title: "Krazy World, Algoz",
    meta: "Short drive · check the calendar",
    body: "Interactive zoo and play park at EN 264, Lagoa de Viseu, 8365-907 Algoz. The official site lists an online adult ticket at €16.95 (marked down from €18.95) and an Algarve-resident gate price of €13.95 for an adult and €8.95 for a child, with proof of address. It also lists a transfer from Albufeira: €44 for 1–4 people and €56 for 5–8. Christmas and New Year open days are not a fixed pattern, so check the park calendar before you promise the day.",
  },
  {
    title: "Zoomarine, Guia",
    meta: "Do not plan it this week",
    body: "Season guides for 2026 say the park runs from 12 March to 28 November and is closed from 29 November 2026 until March 2027. Confirm that on zoomarine.pt. It is the famous park near Albufeira, and it is the wrong week.",
  },
];

export const staySources = [
  { label: "CP Alfa Pendular 2026 fares", href: "https://www.cp.pt/info/documents/d/cp/precos-alfa-pendular-lisboa-porto-faro" },
  { label: "CP Intercidades 2026 fares", href: "https://cp.pt/info/documents/d/cp/precos-intercidades-lisboa-faro" },
  { label: "Lisbon to Albufeira timetable check", href: "https://everyrail.com/trains/lisbon-to-albufeira/" },
  { label: "TheEuroRoadTrip Albufeira to Lisbon", href: "https://www.theeuroroadtrip.eu/all-routes/albufeira-to-lisbon" },
  { label: "Vilamoura Chauffeurs", href: "https://www.vilamoura-chauffeurs.com/private-transfer-vilamoura-algarve-to-lisbon.html" },
  { label: "Continente Modelo Albufeira", href: "https://pp-missao.continente.pt/lojas/continente-modelo-albufeira" },
  { label: "Krazy World", href: "https://krazyworld.com/" },
  { label: "Babysits Albufeira", href: "https://www.babysits.pt/babysitter/albufeira/" },
];
