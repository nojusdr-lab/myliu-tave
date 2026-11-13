// Realistic pet data from real Lithuanian shelters:
// - VšĮ „Penkta koja“ (Kaunas)
// - VšĮ „Lesė“ (Vilnius)
// - VšĮ „SOS gyvūnai“ (Vilnius)
// - VšĮ „Tautmilės globa“ (Vilnius)
// - VšĮ „Naminukai“ (Vilnius)
// - VšĮ „Linksmosios pėdutės“ (Klaipėda)
// - Asociacija „Keturkojo viltis“ (Alytus)
// - VšĮ „Šiaulių letenėlė“ (Šiauliai)

export const PETS = [
  {
    id: 'pet-1',
    name: 'Ronis',
    species: 'dog',
    gender: 'male',
    ageLt: '2 metai',
    ageEn: '2 years',
    city: 'Vilnius',
    waitingDays: 45,
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'lese',
      name: 'VšĮ „Lesė“',
      regCode: '301131174',
      city: 'Vilnius',
      address: 'Buivydiškių k., Vilniaus r.',
      phone: '+370 605 33452',
      email: 'vilnius@lese.lt',
      website: 'lese.lt',
    },
    compatibilityTagsLt: [
      'Draugiškas su šunimis',
      'Tinka bute',
      'Aktyvus',
      'Mėgsta mišką',
    ],
    compatibilityTagsEn: [
      'Friendly with dogs',
      'Apartment friendly',
      'Active companion',
      'Loves nature walks',
    ],
    personalityTraitsLt: ['Žaismingas', 'Mėgsta mišką', 'Greitai mokosi'],
    personalityTraitsEn: ['Playful', 'Loves forest hikes', 'Fast learner'],
    bioLt:
      'Ronis yra energingas, smalsus ir be galo draugiškas dvimetis šunelis. Ronis dievina ilgus pasivaikščiojimus gamtoje, uostinėjimo žaidimus ir bėgiojimą. Jis jau moka pagrindines komandas („sėdėt“, „duok leteną“) ir puikiai sutaria su kitais šunimis.',
    bioEn:
      'Ronis is an energetic, curious and deeply loving 2-year-old dog. He loves long nature walks, scent games and playing fetch. He already knows basic commands ("sit", "paw") and gets along wonderfully with other dogs.',
  },
  {
    id: 'pet-2',
    name: 'Mūza',
    species: 'cat',
    gender: 'female',
    ageLt: '1 metai',
    ageEn: '1 year',
    city: 'Kaunas',
    waitingDays: 240, // 180+ days long-term resident!
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'penkta-koja',
      name: 'VšĮ „Penkta koja“',
      regCode: '302509176',
      city: 'Kaunas',
      address: 'Linksmakalnis, Kauno r.',
      phone: '+370 685 20133',
      email: 'info@penktakoja.lt',
      website: 'penktakoja.lt',
    },
    compatibilityTagsLt: [
      'Draugiška su katėmis',
      'Tinka bute',
      'Rami ir meili',
      'Ieško namų ilgai',
    ],
    compatibilityTagsEn: [
      'Friendly with cats',
      'Apartment friendly',
      'Gentle & affectionate',
      'Long-term resident',
    ],
    personalityTraitsLt: ['Garsi murklė', 'Mėgsta šilumą', 'Kukli'],
    personalityTraitsEn: ['Loud purrer', 'Sunbather', 'Gentle soul'],
    bioLt:
      'Mūza – elegantiška trispalvė katytė, jau 8 mėnesius kantriai laukianti savo tikrojo žmogaus. Ji yra nepaprastai tvarkinga, dėžute naudojasi be priekaištų. Mėgsta susirangyti ant kelių ar šildytis saulėtoje palangėje ir garsiai murkti.',
    bioEn:
      'Mūza is an elegant calico cat who has been patiently waiting in the shelter for 8 months. She is exceptionally clean, uses the litter box perfectly, and loves curling up on your lap while purring like a gentle motor.',
  },
  {
    id: 'pet-3',
    name: 'Baronas',
    species: 'dog',
    gender: 'male',
    ageLt: '4 metai',
    ageEn: '4 years',
    city: 'Klaipėda',
    waitingDays: 195, // 180+ days long-term resident!
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'linksmosios-pedutes',
      name: 'VšĮ „Linksmosios pėdutės“',
      regCode: '303039121',
      city: 'Klaipėda',
      address: 'Jūrininkų pr. 38, Klaipėda',
      phone: '+370 650 34844',
      email: 'info@linksmosiospedutes.lt',
      website: 'linksmosiospedutes.lt',
    },
    compatibilityTagsLt: [
      'Puikus sargas',
      'Mėgsta vaikus',
      'Tinka namui su kiemu',
      'Ištikimas',
    ],
    compatibilityTagsEn: [
      'Loyal guardian',
      'Great with kids',
      'Ideal for house & yard',
      'Devoted',
    ],
    personalityTraitsLt: ['Kilnus', 'Klausantis', 'Mėgsta vandenį'],
    personalityTraitsEn: ['Noble', 'Attentive', 'Loves water'],
    bioLt:
      'Baronas – stotingas aviganio mišrūnas kilniu žvilgsniu ir auksine širdimi. Nors atrodo didelis ir rimtas sargas, su savais žmonėmis jis yra švelnus meškinas. Labai gražiai eina su pavadėliu, nepriekaištingai klauso šeimininko ir dievina pasivaikščiojimus pajūrio pušynuose.',
    bioEn:
      'Baronas is a stately shepherd mix with noble eyes and a heart of gold. While he looks like an imposing guardian, with his family he is a gentle teddy bear. He walks impeccably on a leash and adores breezy strolls along coastal pine forests.',
  },
  {
    id: 'pet-4',
    name: 'Pūkis',
    species: 'cat',
    gender: 'male',
    ageLt: '3 metai',
    ageEn: '3 years',
    city: 'Vilnius',
    waitingDays: 60,
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'tautmiles-globa',
      name: 'VšĮ „Tautmilės globa“',
      regCode: '302720235',
      city: 'Vilnius',
      address: 'Rasų g. 39, Vilnius',
      phone: '+370 679 28258',
      email: 'tautmiles.prieglaudele@gmail.com',
      website: 'tautmilesgloba.lt',
    },
    compatibilityTagsLt: [
      'Labai meilus',
      'Tinka bute',
      'Socialus',
      'Tvarkingas dėžutėje',
    ],
    compatibilityTagsEn: [
      'Very affectionate',
      'Apartment friendly',
      'Social & chatty',
      'Litter trained',
    ],
    personalityTraitsLt: ['Bendraujantis', 'Pūkuotas', 'Visada šalia'],
    personalityTraitsEn: ['Sociable', 'Fluffy ginger', 'Shadow companion'],
    bioLt:
      'Ryžas ugninis katinėlis su milžiniška širdimi. Pūkis yra tikras namų dvasios saugotojas – jis pasitinka prie durų, meiliai murkia, padeda dirbti prie kompiuterio ir miega susirangęs šalia kojų.',
    bioEn:
      'A fiery ginger tomcat with an enormous heart. Pūkis is a true home guardian – he greets you at the door, gently chirps hello, oversees your work laptop, and sleeps curled near your feet.',
  },
  {
    id: 'pet-5',
    name: 'Lora',
    species: 'dog',
    gender: 'female',
    ageLt: '8 mėnesiai',
    ageEn: '8 months',
    city: 'Kaunas',
    waitingDays: 35,
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: false,
    },
    photos: [
      'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'penkta-koja',
      name: 'VšĮ „Penkta koja“',
      regCode: '302509176',
      city: 'Kaunas',
      address: 'Linksmakalnis, Kauno r.',
      phone: '+370 685 20133',
      email: 'info@penktakoja.lt',
      website: 'penktakoja.lt',
    },
    compatibilityTagsLt: [
      'Jaunas šuniukas',
      'Greitai mokosi',
      'Tinka šeimai su vaikais',
      'Smalsi ir linksma',
    ],
    compatibilityTagsEn: [
      'Young puppy',
      'Fast learner',
      'Family & kid friendly',
      'Curious & joyful',
    ],
    personalityTraitsLt: ['Smalsi', 'Draugiška', 'Mėgsta kamuoliuką'],
    personalityTraitsEn: ['Inquisitive', 'Friendly', 'Loves balls'],
    bioLt:
      'Lora – jaunutė, be galo žavi mišrūnė, kuriai kiekviena diena yra stebuklingas nuotykis. Ji labai trokšta bendravimo, imliai mokosi naujų taisyklių ir dievina žaidimus su kamuoliuku. Paskiepyta ir čipuota.',
    bioEn:
      'Lora is a young, utterly charming pup for whom every day is a magical new adventure. She thrives on companionship, learns house manners eagerly, and loves playing ball. Vaccinated and microchipped.',
  },
  {
    id: 'pet-6',
    name: 'Džekis',
    species: 'dog',
    gender: 'male',
    ageLt: '5 metai',
    ageEn: '5 years',
    city: 'Alytus',
    waitingDays: 310, // 180+ days long-term resident!
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'keturkojo-viltis',
      name: 'Asociacija „Keturkojo viltis“',
      regCode: '303102377',
      city: 'Alytus',
      address: 'Užuovėjos g. 28, Alytus',
      phone: '+370 658 02144',
      email: 'keturkojoviltis@gmail.com',
      website: 'keturkojoviltis.lt',
    },
    compatibilityTagsLt: [
      'Ištikimas draugas',
      'Reikia ramių namų',
      'Labai kantrus',
      'Ieško namų ilgai',
    ],
    compatibilityTagsEn: [
      'Devoted companion',
      'Quiet home preferred',
      'Very patient',
      'Long-term resident',
    ],
    personalityTraitsLt: ['Ramus', 'Prieraišus', 'Mėgsta miegoti'],
    personalityTraitsEn: ['Calm', 'Affectionate', 'Loves naptime'],
    bioLt:
      'Džekis prieglaudoje praleido jau beveik metus. Šis auksaspalvis geruolis yra kantrus, ramus ir be proto ištikimas. Jis nereikalauja ilgų krosų, jam svarbiausia – jausti žmogaus ranką ir turėti saugų guolį.',
    bioEn:
      'Džekis has spent nearly a year in the shelter. This golden-hearted boy is patient, calm, and endlessly devoted. He does not need marathon runs; all he craves is a gentle hand and a safe place to rest.',
  },
  {
    id: 'pet-7',
    name: 'Bona',
    species: 'cat',
    gender: 'female',
    ageLt: '2 metai',
    ageEn: '2 years',
    city: 'Vilnius',
    waitingDays: 95,
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'sos-gyvunai',
      name: 'VšĮ „SOS gyvūnai“',
      regCode: '301726055',
      city: 'Vilnius',
      address: 'Minsko pl. 33A, Vilnius',
      phone: '+370 683 39826',
      email: 'info@sos-gyvunai.lt',
      website: 'sos-gyvunai.lt',
    },
    compatibilityTagsLt: [
      'Draugiška su vaikais',
      'Tinka bute',
      'Tvarkinga',
      'Mėgsta žaisliukus',
    ],
    compatibilityTagsEn: [
      'Great with kids',
      'Apartment friendly',
      'Litter trained',
      'Playful',
    ],
    personalityTraitsLt: ['Žvali', 'Smalsi', 'Mėgsta glamones'],
    personalityTraitsEn: ['Lively', 'Inquisitive', 'Affectionate'],
    bioLt:
      'Bona – šilkinio kailiuko juodai balta dama. Labai mėgsta žaisti su plunksnelėmis ir vakarais dainuoti murkiančias lopšines. Pilnai paruošta keliauti į mylinčius namus.',
    bioEn:
      'Bona is a silky tuxedo lady. She loves playing with feather wands and purring sweet lullabies in the evening. Fully prepared to move into a loving home.',
  },
  {
    id: 'pet-8',
    name: 'Tailsas',
    species: 'dog',
    gender: 'male',
    ageLt: '3 metai',
    ageEn: '3 years',
    city: 'Šiauliai',
    waitingDays: 215, // 180+ days long-term resident!
    medical: {
      chipped: true,
      vaccinated: true,
      neutered: true,
    },
    photos: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&auto=format&fit=crop&q=80',
    ],
    shelter: {
      id: 'siauliu-letenele',
      name: 'VšĮ „Šiaulių letenėlė“',
      regCode: '303352721',
      city: 'Šiauliai',
      address: 'Šiaulių r., Kairiai',
      phone: '+370 676 12231',
      email: 'siauliuletenele@gmail.com',
      website: 'siauliuletenele.lt',
    },
    compatibilityTagsLt: [
      'Labai draugiškas',
      'Moka komandas',
      'Tinka bute ar name',
      'Ieško namų ilgai',
    ],
    compatibilityTagsEn: [
      'Very friendly',
      'Knows basic commands',
      'Apartment or house',
      'Long-term resident',
    ],
    personalityTraitsLt: ['Paklusnus', 'Laimingas', 'Mėgsta paglostymus'],
    personalityTraitsEn: ['Obedient', 'Cheerful', 'Loves cuddles'],
    bioLt:
      'Tailsas – linksmas uodegytės vizgintojas, prieglaudoje laukiantis jau daugiau nei 7 mėnesius. Puikiai sutaria su žmonėmis, kantrus, geranoriškas ir visada pasirengęs pradžiuginti savo šeimininką.',
    bioEn:
      'Tailsas is a joyful tail-wagger who has been waiting in the shelter for over 7 months. He gets along wonderfully with people, is patient, cheerful and eager to please.',
  },
];
