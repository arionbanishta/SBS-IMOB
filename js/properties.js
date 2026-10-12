/* =========================================================
   Property catalog – sample data.
   deal: "kauf" (buy) | "miete" (rent)
   type: "wohnung" (apartment) | "haus" (house) | "mfh" (whole building / Mehrfamilienhaus)
   To add a property: copy one block, give it a new id, change the values.
   Later this can be replaced by a CMS or database without touching the pages.
   ========================================================= */
const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w || 1200}&q=75`;

window.PROPERTIES = [
  {
    id: "w-101", deal: "kauf", type: "wohnung", status: "neu", added: "2026-09-24",
    title: { de: "Helle 3-Zimmer-Wohnung mit Südbalkon", en: "Bright 3-room apartment with south balcony" },
    district: "Altstadt", price: 389000, area: 82, rooms: 3, bedrooms: 2, baths: 1, floor: "2. OG / 4", year: 1998, renovated: 2021,
    hausgeld: 320, commission: 3.57,
    energy: { cls: "C", value: 95, kind: "Verbrauchsausweis", source: "Gas" },
    features: ["balkon", "einbaukueche", "keller", "aufzug", "stellplatz"],
    images: ["1502672260266-1c1ef2d93688", "1484154218962-a197022b5858", "1505691938895-1758d7feb511", "1560185893-a55cbc8c57e8"],
    desc: {
      de: "Diese gepflegte Wohnung überzeugt mit einem durchdachten Grundriss, viel Tageslicht und einem ruhigen Südbalkon. 2021 wurden Bad und Böden modernisiert. Einkaufsmöglichkeiten, Schulen und der öffentliche Nahverkehr sind in wenigen Minuten zu Fuß erreichbar – ideal für Paare und kleine Familien.",
      en: "This well-kept apartment offers a thoughtful floor plan, lots of daylight and a quiet south-facing balcony. Bathroom and floors were modernised in 2021. Shops, schools and public transport are a few minutes' walk away – ideal for couples and small families."
    }
  },
  {
    id: "w-102", deal: "kauf", type: "wohnung", status: "exklusiv", added: "2026-09-18",
    title: { de: "Penthouse mit Dachterrasse und Weitblick", en: "Penthouse with roof terrace and panoramic view" },
    district: "Parkviertel", price: 749000, area: 128, rooms: 4, bedrooms: 3, baths: 2, floor: "5. OG / 5", year: 2019,
    hausgeld: 480, commission: 3.57,
    energy: { cls: "A", value: 42, kind: "Bedarfsausweis", source: "Fernwärme" },
    features: ["terrasse", "aufzug", "fussbodenheizung", "einbaukueche", "garage", "barrierefrei", "gaeste_wc"],
    images: ["1600607687939-ce8a6c25118c", "1600566753190-17f0baa2a6c3", "1600585154340-be6161a56a0c", "1556911220-bff31c812dba"],
    desc: {
      de: "Wohnen über den Dächern von City: 60 m² Dachterrasse, bodentiefe Fenster und hochwertige Ausstattung mit Fußbodenheizung und Designerküche. Der Aufzug führt direkt bis in die Wohnung, zwei Tiefgaragenstellplätze sind inklusive.",
      en: "Living above the rooftops of City: 60 m² roof terrace, floor-to-ceiling windows and high-end fittings including underfloor heating and a designer kitchen. The lift goes right up to the apartment; two underground parking spaces are included."
    }
  },
  {
    id: "w-103", deal: "kauf", type: "wohnung", status: "kapitalanlage", added: "2026-09-10",
    title: { de: "2-Zimmer-Wohnung – vermietet, ideal als Kapitalanlage", en: "2-room apartment – let, ideal as an investment" },
    district: "Südstadt", price: 229000, area: 54, rooms: 2, bedrooms: 1, baths: 1, floor: "1. OG / 3", year: 1972, renovated: 2018,
    hausgeld: 240, commission: 3.57, rentIncome: 780,
    energy: { cls: "D", value: 118, kind: "Verbrauchsausweis", source: "Gas" },
    features: ["balkon", "keller", "vermietet"],
    images: ["1522708323590-d24dbb6b0267", "1560448204-e02f11c3d0e2", "1493809842364-78817add7ffb"],
    desc: {
      de: "Solide Kapitalanlage in gefragter Lage: Die Wohnung ist seit 2019 zuverlässig für 780 € Kaltmiete vermietet. Die Eigentümergemeinschaft ist gut aufgestellt, die Instandhaltungsrücklage ausreichend.",
      en: "A solid investment in a sought-after location: the apartment has been reliably let since 2019 at €780 net cold rent. The owners' association is well organised with sufficient maintenance reserves."
    }
  },
  {
    id: "h-201", deal: "kauf", type: "haus", status: "neu", added: "2026-09-27",
    title: { de: "Familienhaus mit Garten in ruhiger Lage", en: "Family house with garden in a quiet area" },
    district: "Waldsiedlung", price: 625000, area: 145, plot: 480, rooms: 5, bedrooms: 4, baths: 2, floor: "EG–DG", year: 2008,
    commission: 3.57,
    energy: { cls: "B", value: 62, kind: "Bedarfsausweis", source: "Wärmepumpe" },
    features: ["garten", "terrasse", "garage", "keller", "einbaukueche", "gaeste_wc", "fussbodenheizung"],
    images: ["1570129477492-45c003edd2be", "1564013799919-ab600027ffc6", "1556911220-bff31c812dba", "1505691938895-1758d7feb511"],
    desc: {
      de: "Freistehendes Einfamilienhaus auf einem sonnigen Grundstück mit altem Baumbestand. Vier Schlafzimmer, großzügiger Wohn-Essbereich mit Zugang zur Terrasse und eine effiziente Wärmepumpe machen das Haus zukunftssicher.",
      en: "Detached single-family house on a sunny plot with mature trees. Four bedrooms, a generous living/dining area opening onto the terrace and an efficient heat pump make it future-proof."
    }
  },
  {
    id: "h-202", deal: "kauf", type: "haus", added: "2026-09-05",
    title: { de: "Reihenmittelhaus nahe Schulen und Park", en: "Terraced house close to schools and park" },
    district: "Nordviertel", price: 459000, area: 118, plot: 210, rooms: 4, bedrooms: 3, baths: 1, floor: "EG–DG", year: 1994,
    commission: 3.57,
    energy: { cls: "C", value: 88, kind: "Verbrauchsausweis", source: "Gas" },
    features: ["garten", "terrasse", "stellplatz", "keller", "gaeste_wc"],
    images: ["1512917774080-9991f1c4c750", "1560185007-cde436f6a4d0", "1493809842364-78817add7ffb"],
    desc: {
      de: "Familienfreundliches Reihenmittelhaus mit pflegeleichtem Garten. Grundschule, Kita und Park liegen direkt um die Ecke. Das Dachgeschoss bietet Raum für ein Arbeits- oder Gästezimmer.",
      en: "Family-friendly terraced house with an easy-care garden. Primary school, nursery and park are just around the corner. The attic offers space for a study or guest room."
    }
  },
  {
    id: "w-104", deal: "kauf", type: "wohnung", status: "neubau", added: "2026-08-29",
    title: { de: "Neubau-Gartenwohnung im Effizienzhaus-Standard", en: "New-build garden apartment, energy-efficient standard" },
    district: "Neustadt", price: 519000, area: 96, rooms: 3, bedrooms: 2, baths: 2, floor: "EG / 4", year: 2026,
    hausgeld: 290, commission: 0,
    energy: { cls: "A+", value: 24, kind: "Bedarfsausweis", source: "Wärmepumpe" },
    features: ["garten", "terrasse", "aufzug", "fussbodenheizung", "barrierefrei", "stellplatz", "keller"],
    images: ["1600596542815-ffad4c1539a9", "1600585154340-be6161a56a0c", "1600566753190-17f0baa2a6c3"],
    desc: {
      de: "Erstbezug: barrierefreie Erdgeschosswohnung mit eigenem Garten, bodengleicher Dusche und Wärmepumpe mit Photovoltaik. Provisionsfrei direkt vom Bauträger – Förderung über KfW möglich.",
      en: "First occupancy: step-free ground-floor apartment with private garden, walk-in shower and heat pump with solar PV. Commission-free directly from the developer – KfW funding possible."
    }
  },
  {
    id: "m-301", deal: "kauf", type: "mfh", status: "gesamtobjekt", added: "2026-09-15",
    title: { de: "Mehrfamilienhaus mit 8 Wohneinheiten", en: "Apartment building with 8 units" },
    district: "Bahnhofsviertel", price: 2150000, area: 640, plot: 720, units: 8, rooms: 24, year: 1962, renovated: 2015,
    commission: 3.57, rentIncomeYear: 118800,
    energy: { cls: "D", value: 128, kind: "Verbrauchsausweis", source: "Gas" },
    features: ["keller", "stellplatz", "vermietet", "garten"],
    images: ["1545324418-cc1a3fa10c00", "1460317442991-0ec209397118", "1486406146926-c627a92ad1ab"],
    desc: {
      de: "Voll vermietetes Mehrfamilienhaus mit acht Wohnungen zwischen 58 und 95 m². Dach, Fenster und Heizung wurden 2015 erneuert. Die Mieten liegen unter dem Mietspiegel – Potenzial für Wertsteigerung. Unterlagen (Mieterliste, Grundrisse) auf Anfrage.",
      en: "Fully let apartment building with eight flats between 58 and 95 m². Roof, windows and heating were renewed in 2015. Rents are below the local rent index – upside potential. Documents (rent roll, floor plans) on request."
    }
  },
  {
    id: "m-302", deal: "kauf", type: "mfh", status: "gesamtobjekt", added: "2026-08-20",
    title: { de: "Wohn- und Geschäftshaus in zentraler Lage", en: "Mixed-use building in a central location" },
    district: "Zentrum", price: 3480000, area: 910, plot: 640, units: 12, rooms: 34, year: 1910, renovated: 2012,
    commission: 3.57, rentIncomeYear: 176400,
    energy: { cls: "E", value: 142, kind: "Verbrauchsausweis", source: "Fernwärme" },
    features: ["aufzug", "keller", "vermietet", "denkmal"],
    images: ["1486406146926-c627a92ad1ab", "1545324418-cc1a3fa10c00", "1460317442991-0ec209397118"],
    desc: {
      de: "Repräsentatives Gründerzeithaus mit zwei Ladenflächen im Erdgeschoss und zehn Altbauwohnungen. Denkmalschutz ermöglicht erhöhte steuerliche Abschreibung. Langfristige Gewerbemietverträge sorgen für stabile Erträge.",
      en: "Stately period building with two retail units on the ground floor and ten period apartments. Listed-building status allows enhanced tax depreciation. Long-term commercial leases ensure stable income."
    }
  },
  {
    id: "w-401", deal: "miete", type: "wohnung", added: "2026-09-26",
    title: { de: "Möblierte 1-Zimmer-Wohnung für Pendler", en: "Furnished studio for commuters" },
    district: "Zentrum", rent: 690, utilities: 160, deposit: 2070, area: 34, rooms: 1, bedrooms: 1, baths: 1, floor: "3. OG / 5", year: 2014,
    available: { de: "ab sofort", en: "immediately" },
    energy: { cls: "B", value: 71, kind: "Verbrauchsausweis", source: "Fernwärme" },
    features: ["moebliert", "einbaukueche", "aufzug"],
    images: ["1560448204-e02f11c3d0e2", "1522708323590-d24dbb6b0267"],
    desc: {
      de: "Voll möbliertes Apartment, fünf Gehminuten zum Hauptbahnhof. Internet und Waschmaschine inklusive.",
      en: "Fully furnished apartment, five minutes' walk to the main station. Internet and washing machine included."
    }
  },
  {
    id: "w-402", deal: "miete", type: "wohnung", added: "2026-09-19",
    title: { de: "3-Zimmer-Altbauwohnung mit Stuck", en: "3-room period apartment with stucco ceilings" },
    district: "Altstadt", rent: 1280, utilities: 260, deposit: 3840, area: 88, rooms: 3, bedrooms: 2, baths: 1, floor: "2. OG / 4", year: 1905, renovated: 2020,
    available: { de: "ab 01.11.2026", en: "from 1 Nov 2026" },
    energy: { cls: "D", value: 121, kind: "Verbrauchsausweis", source: "Gas" },
    features: ["balkon", "keller", "einbaukueche"],
    images: ["1493809842364-78817add7ffb", "1484154218962-a197022b5858", "1505691938895-1758d7feb511"],
    desc: {
      de: "Charmante Altbauwohnung mit hohen Decken, Dielenböden und Stuck. Modernes Bad, Einbauküche und ein Balkon zum ruhigen Innenhof.",
      en: "Charming period apartment with high ceilings, wooden floors and stucco. Modern bathroom, fitted kitchen and a balcony facing the quiet courtyard."
    }
  },
  {
    id: "h-403", deal: "miete", type: "haus", added: "2026-09-02",
    title: { de: "Doppelhaushälfte mit Garage", en: "Semi-detached house with garage" },
    district: "Waldsiedlung", rent: 1950, utilities: 320, deposit: 5850, area: 132, plot: 320, rooms: 5, bedrooms: 3, baths: 2, floor: "EG–DG", year: 2011,
    available: { de: "ab 01.12.2026", en: "from 1 Dec 2026" },
    energy: { cls: "B", value: 66, kind: "Bedarfsausweis", source: "Gas" },
    features: ["garten", "garage", "terrasse", "keller", "gaeste_wc"],
    images: ["1564013799919-ab600027ffc6", "1570129477492-45c003edd2be"],
    desc: {
      de: "Gepflegte Doppelhaushälfte mit Garten und Garage in ruhiger Wohnstraße – ideal für Familien.",
      en: "Well-kept semi-detached house with garden and garage on a quiet residential street – ideal for families."
    }
  },
  {
    id: "w-404", deal: "miete", type: "wohnung", added: "2026-08-25",
    title: { de: "Moderne 2-Zimmer-Wohnung mit Einbauküche", en: "Modern 2-room apartment with fitted kitchen" },
    district: "Neustadt", rent: 940, utilities: 190, deposit: 2820, area: 61, rooms: 2, bedrooms: 1, baths: 1, floor: "1. OG / 4", year: 2021,
    available: { de: "ab 15.10.2026", en: "from 15 Oct 2026" },
    energy: { cls: "A", value: 38, kind: "Bedarfsausweis", source: "Wärmepumpe" },
    features: ["balkon", "einbaukueche", "aufzug", "fussbodenheizung", "stellplatz"],
    images: ["1560185893-a55cbc8c57e8", "1600607687939-ce8a6c25118c"],
    desc: {
      de: "Neuwertige Wohnung mit offener Küche, Fußbodenheizung und Balkon. Tiefgaragenstellplatz für 80 € zusätzlich anmietbar.",
      en: "As-new apartment with open kitchen, underfloor heating and balcony. Underground parking space available for an extra €80."
    }
  }
];

window.imgUrl = IMG;
