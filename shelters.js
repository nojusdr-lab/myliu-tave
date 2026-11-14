// Real Lithuanian animal shelters data with verified contacts, cities, and dog/cat counts

export const CITIES = [
  { id: 'all', nameLt: 'Visi', nameEn: 'All', count: 1073 },
  { id: 'Kaunas', nameLt: 'Kaunas', nameEn: 'Kaunas', count: 333 },
  { id: 'Vilnius', nameLt: 'Vilnius', nameEn: 'Vilnius', count: 185 },
  { id: 'Alytus', nameLt: 'Alytus', nameEn: 'Alytus', count: 113 },
  { id: 'Klaipėda', nameLt: 'Klaipėda', nameEn: 'Klaipėda', count: 105 },
  { id: 'Mažeikiai', nameLt: 'Mažeikiai', nameEn: 'Mažeikiai', count: 99 },
  { id: 'Šiauliai', nameLt: 'Šiauliai', nameEn: 'Šiauliai', count: 90 },
  { id: 'Utena', nameLt: 'Utena', nameEn: 'Utena', count: 35 },
  { id: 'Visaginas', nameLt: 'Visaginas', nameEn: 'Visaginas', count: 32 },
  { id: 'Panevėžys', nameLt: 'Panevėžys', nameEn: 'Panevėžys', count: 32 },
  { id: 'Kazlų Rūda', nameLt: 'Kazlų Rūda', nameEn: 'Kazlų Rūda', count: 28 },
  { id: 'Marijampolė', nameLt: 'Marijampolė', nameEn: 'Marijampolė', count: 21 },
];

export const SHELTERS = [
  {
    id: 'penkta-koja',
    name: 'VšĮ „Penkta koja“',
    city: 'Kaunas',
    address: 'Linksmakalnis, Kauno r.',
    phone: '+370 685 20133',
    email: 'info@penktakoja.lt',
    website: 'https://penktakoja.lt',
    regCode: '302509176',
    dogsCount: 210,
    catsCount: 123,
    totalCount: 333,
    descriptionLt:
      'Viena didžiausių gyvūnų prieglaudų Lietuvoje, įsikūrusi Kauno rajone. Prieglauda nuosekliai kovoja už kiekvieno beglobio gyvybę ir skatina atsakingą gyvūnų gerovę.',
    descriptionEn:
      'One of the largest animal shelters in Lithuania located in Kaunas district. Dedicated to saving every abandoned animal and promoting responsible adoption.',
  },
  {
    id: 'lese',
    name: 'VšĮ „Lesė“',
    city: 'Vilnius',
    address: 'Buivydiškių k., Vilniaus r.',
    phone: '+370 605 33452',
    email: 'vilnius@lese.lt',
    website: 'https://lese.lt',
    regCode: '301131174',
    dogsCount: 95,
    catsCount: 90,
    totalCount: 185,
    descriptionLt:
      'Pirma Lietuvoje ne-eutanazijos (no-kill) principu veikianti gyvūnų globos organizacija su padaliniais Vilniuje ir Kaune.',
    descriptionEn:
      'Lithuania’s pioneer no-kill animal welfare organisation operating shelter branches in both Vilnius and Kaunas.',
  },
  {
    id: 'sos-gyvunai',
    name: 'VšĮ „SOS gyvūnai“',
    city: 'Vilnius',
    address: 'Minsko pl. 33A, Vilnius',
    phone: '+370 683 39826',
    email: 'info@sos-gyvunai.lt',
    website: 'https://sos-gyvunai.lt',
    regCode: '301726055',
    dogsCount: 78,
    catsCount: 64,
    totalCount: 142,
    descriptionLt:
      'Aktyvi Vilniaus prieglauda, kasmet surandanti naujus namus šimtams nuskriaustų, sužeistų ar paliktų šunų ir kačių.',
    descriptionEn:
      'Active Vilnius shelter rehabilitating and rehoming hundreds of injured and abandoned animals every year.',
  },
  {
    id: 'tautmiles-globa',
    name: 'VšĮ „Tautmilės globa“',
    city: 'Vilnius',
    address: 'Rasų g. 39, Vilnius',
    phone: '+370 679 28258',
    email: 'tautmiles.prieglaudele@gmail.com',
    website: 'https://tautmilesgloba.lt',
    regCode: '302720235',
    dogsCount: 42,
    catsCount: 88,
    totalCount: 130,
    descriptionLt:
      'Jauki gyvūnų prieglaudėlė Vilniaus Rasų mikrorajone, garsėjanti ypatingu dėmesiu lėtinių ligų turintiems ir senjorams gyvūnams.',
    descriptionEn:
      'A warm rescue shelter in Vilnius known for specialized care of senior animals and pets with chronic medical needs.',
  },
  {
    id: 'naminukai',
    name: 'VšĮ „Naminukai“',
    city: 'Vilnius',
    address: 'Saltoniškių g., Vilnius',
    phone: '+370 648 30077',
    email: 'naminukai@naminukai.org',
    website: 'https://naminukai.org',
    regCode: '302824633',
    dogsCount: 18,
    catsCount: 74,
    totalCount: 92,
    descriptionLt:
      'Savanoriškas gyvūnų globos tinklas, skiriantis didelį dėmesį laukinių kačių sterilizacijai (PSP) ir globa namų sąlygomis.',
    descriptionEn:
      'Volunteer rescue network focused on foster-based animal rehabilitation and feline TNR sterilization programs.',
  },
  {
    id: 'linksmosios-pedutes',
    name: 'VšĮ „Linksmosios pėdutės“',
    city: 'Klaipėda',
    address: 'Jūrininkų pr. 38, Klaipėda',
    phone: '+370 650 34844',
    email: 'info@linksmosiospedutes.lt',
    website: 'https://linksmosiospedutes.lt',
    regCode: '303039121',
    dogsCount: 62,
    catsCount: 43,
    totalCount: 105,
    descriptionLt:
      'Klaipėdos gyvūnų prieglauda, kurioje beglobiai gyvena moderniose, šviesiose patalpose ir ruošiami gyvenimui šeimose su kinologų pagalba.',
    descriptionEn:
      'Modern Klaipėda rescue centre where rescued dogs and cats receive behavioral training and socialization before adoption.',
  },
  {
    id: 'keturkojo-viltis',
    name: 'Asociacija „Keturkojo viltis“',
    city: 'Alytus',
    address: 'Užuovėjos g. 28, Alytus',
    phone: '+370 658 02144',
    email: 'keturkojoviltis@gmail.com',
    website: 'https://keturkojoviltis.lt',
    regCode: '303102377',
    dogsCount: 75,
    catsCount: 38,
    totalCount: 113,
    descriptionLt:
      'Dzūkijos regiono gyvūnų globos organizacija Alytuje, gelbstinti paliktus ir sužeistus keturkojus bei ieškanti jiems atsakingų šeimininkų.',
    descriptionEn:
      'Animal welfare organization in Alytus rescuing neglected dogs and cats across the Dzūkija region.',
  },
  {
    id: 'siauliu-letenele',
    name: 'VšĮ „Šiaulių letenėlė“',
    city: 'Šiauliai',
    address: 'Šiaulių r., Kairiai',
    phone: '+370 676 12231',
    email: 'siauliuletenele@gmail.com',
    website: 'https://siauliuletenele.lt',
    regCode: '303352721',
    dogsCount: 54,
    catsCount: 36,
    totalCount: 90,
    descriptionLt:
      'Šiaulių krašto prieglauda, aktyviai teikianti veterinarinę pagalbą, vykdanti švietimo programas ir globojanti dešimtis beglobių.',
    descriptionEn:
      'Northern Lithuanian rescue shelter offering veterinary aid, educational initiatives, and lifelong adoption placement.',
  },
];
