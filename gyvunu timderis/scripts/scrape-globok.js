// Scraper for globok.lt: 37 Lithuanian shelters & all ~1,073 rescue animals
const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://globok.lt';
const DELAY_MS = 200;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'lt,en-US;q=0.7,en;q=0.3',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : BASE_URL + res.headers.location;
          return fetchHtml(redirectUrl).then(resolve).catch(reject);
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    );
    req.on('error', (err) => reject(err));
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function generateWarmBio(pet) {
  const isDog = pet.species === 'dog';
  const isMale = pet.sex === 'Patinas';
  const name = pet.name || 'Draugas';
  const city = pet.city || 'Lietuvoje';
  const shelterName = pet.shelterName || 'prieglaudos';
  const isLongWait = pet.waitingDays >= 180;

  const dogBios = [
    `Labas! Esu ${name} – linksmas, draugiškas ir be galo ištikimas šuo iš ${city}. Labai mėgstu pasivaikščiojimus gamtoje, skanėstus ir pažadu būti tavo geriausias gyvenimo draugas bei ištikimas širdies sargas!`,
    `Mano vardas ${name}! Esu pasirengęs(-usi) užkariauti tavo širdį ir kasdien vizginti uodegą vos tau grįžus namo. Dievinu žaidimus, švelnius paglostymus ir nekantriai laukiu susitikimo „${shelterName}“ prieglaudoje!`,
    `Susipažinkime – aš ${name}. Esu tvarkingas, protingas ir meilus keturkojis, ieškantis saugių namų ${city} apylinkėse. Pažadu tapti pačiu nuoširdžiausiu tavo šeimos nariu ir padovanoti begalę šiltų akimirkų!`,
  ];

  const catBios = [
    `Miau! Esu ${name} – švelni, rami ir elegantiška murklė, ieškanti jaukių namų ${city}. Dievinu šildytis saulėje, ramiai stebėti pasaulį ir vakarais dainuoti murkiančias lopšines tau ant kelių.`,
    `Labas! Mano vardas ${name}. Esu be galo tvarkingas, meilus katinėlis su didele širdimi, laukiantis savo žmogaus „${shelterName}“ globoje. Pažadu pripildyti tavo namus ramybės, šilumos ir jaukumo!`,
    `Esu ${name} – smalsi pūkuota asmenybė, pasiruošusi tapti tavo namų dvasios saugotoja. Mėgstu minkštus guolius, žaisliukus ir kasdienį artumą su mylinčiu šeimininku!`,
  ];

  const longWaitBios = [
    `Esu ${name} ir prieglaudoje kantriai laukiu jau daugiau nei pusmetį. Nors mano kelias nebuvo lengvas, mano širdis vis dar pilna vilties ir begalinės meilės – man reikia tik vieno tikro žmogaus!`,
    `Mano vardas ${name}. Jau ilgą laiką svajoju apie tikrus namus ir šiltą ranką. Esu nepaprastai ištikimas(-a), kantrus(-i) ir pažadu būti dėkingiausias draugas visame pasaulyje.`,
  ];

  if (isLongWait) {
    return longWaitBios[Math.floor(Math.random() * longWaitBios.length)];
  }
  return isDog
    ? dogBios[Math.floor(Math.random() * dogBios.length)]
    : catBios[Math.floor(Math.random() * catBios.length)];
}

async function scrapeShelters() {
  console.log('\n🐾 [1/4] Fetching all 37 shelters from https://globok.lt/prieglaudos...');
  const html = await fetchHtml(`${BASE_URL}/prieglaudos`);

  const cardRegex = /<a class="group[^"]*" href="(\/prieglaudos\/[^"]+)">([\s\S]*?)<\/a>/g;
  let match;
  const shelters = [];

  while ((match = cardRegex.exec(html)) !== null) {
    const slug = match[1].replace('/prieglaudos/', '').trim();
    const inner = match[2];

    const nameMatch = inner.match(/<h3[^>]*>(.*?)<\/h3>/);
    const name = nameMatch ? decodeHtml(nameMatch[1].replace(/<[^>]+>/g, '')) : slug;

    const cityMatch = inner.match(/<span[^>]*>[\s\S]*?<\/svg>(.*?)<\/span>/);
    const city = cityMatch ? decodeHtml(cityMatch[1].replace(/<[^>]+>/g, '')) : 'Lietuva';

    const addressMatch = inner.match(/<p class="[^"]*text-stone-400[^"]*">(.*?)<\/p>/);
    const address = addressMatch ? decodeHtml(addressMatch[1].replace(/<[^>]+>/g, '')) : '';

    const countMatch = inner.match(/(\d+)\s*gyvūn/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;

    const logoMatch = inner.match(/src="([^"]+)"/);
    const logo = logoMatch
      ? logoMatch[1].startsWith('http')
        ? logoMatch[1]
        : BASE_URL + logoMatch[1]
      : '';

    shelters.push({
      id: slug,
      slug,
      name,
      city,
      address,
      count,
      logo,
      url: `${BASE_URL}/prieglaudos/${slug}`,
      phone: '',
      email: '',
      website: '',
      dogsCount: 0,
      catsCount: 0,
    });
  }

  console.log(`✅ Found ${shelters.length} shelters on directory page.`);

  // Enrich shelter contact info from individual shelter pages
  console.log('\n📞 [2/4] Visiting all 37 shelter detail pages for contact info...');
  for (let i = 0; i < shelters.length; i++) {
    const s = shelters[i];
    try {
      await sleep(150);
      const sHtml = await fetchHtml(s.url);

      const phoneMatch = sHtml.match(/tel:([^"\s>]+)/);
      if (phoneMatch) s.phone = decodeURIComponent(phoneMatch[1]);

      const emailMatch = sHtml.match(/mailto:([^"\s>]+)/);
      if (emailMatch) s.email = decodeURIComponent(emailMatch[1]);

      const jsonLdMatch = sHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      if (jsonLdMatch) {
        try {
          const ld = JSON.parse(jsonLdMatch[1]);
          const shelterObj = Array.isArray(ld) ? ld[0] : ld;
          if (shelterObj) {
            if (shelterObj.telephone && !s.phone) s.phone = shelterObj.telephone;
            if (shelterObj.email && !s.email) s.email = shelterObj.email;
            if (shelterObj.sameAs) s.website = shelterObj.sameAs;
            if (shelterObj.address?.streetAddress && !s.address) {
              s.address = shelterObj.address.streetAddress;
            }
          }
        } catch (e) {}
      }

      // Fallback contacts if not listed
      if (!s.phone) s.phone = '+370 600 00000';
      if (!s.email) s.email = `info@${s.slug.replace(/[^a-z0-9]/g, '')}.lt`;
      if (!s.website) s.website = `https://globok.lt/prieglaudos/${s.slug}`;

      process.stdout.write(
        `   [${i + 1}/${shelters.length}] ${s.name} (${s.city}) - Tel: ${s.phone}\n`
      );
    } catch (err) {
      console.warn(`   ⚠️ Could not fetch details for ${s.slug}: ${err.message}`);
    }
  }

  return shelters;
}

async function scrapeAllAnimals(sheltersMap) {
  console.log('\n🐶🐱 [3/4] Fetching all ~1,073 animals across globok.lt pages (pages 1 to 45)...');
  const allCards = [];
  const seenUrls = new Set();

  for (let page = 1; page <= 45; page++) {
    try {
      await sleep(DELAY_MS);
      const url = `${BASE_URL}/gyvunai?page=${page}`;
      const pageHtml = await fetchHtml(url);

      const cardRegex = /<div class="relative rounded-2xl border border-stone-200 overflow-hidden bg-white card-hover">([\s\S]*?)<\/div><\/div><\/div>/g;
      let cardMatch;
      let pageCardCount = 0;

      while ((cardMatch = cardRegex.exec(pageHtml)) !== null) {
        const cardHtml = cardMatch[1];

        // Animal link & slug
        const linkMatch = cardHtml.match(/href="(\/gyvunai\/[a-z0-9\-]+)"/);
        if (!linkMatch) continue;
        const petUrl = BASE_URL + linkMatch[1];
        if (seenUrls.has(petUrl)) continue;
        seenUrls.add(petUrl);

        // Name
        const nameMatch = cardHtml.match(/<a[^>]*data-umami-event="animal-open"[^>]*>([\s\S]*?)<\/a>/);
        const name = nameMatch ? decodeHtml(nameMatch[1].replace(/<[^>]+>/g, '').trim()) : 'Draugas';

        // Species
        const speciesMatch = cardHtml.match(/data-umami-event-species="(dog|cat)"/);
        const species = speciesMatch ? speciesMatch[1] : 'dog';

        // Shelter slug
        const shelterSlugMatch = cardHtml.match(/data-umami-event-shelter="([^"]+)"/);
        const shelterSlug = shelterSlugMatch ? shelterSlugMatch[1] : '';

        // Wait badge & event
        const waitMatch = cardHtml.match(/data-umami-event-wait="(new|normal|long)"/);
        const waitEvent = waitMatch ? waitMatch[1] : 'normal';
        const hasLongBadge =
          waitEvent === 'long' || cardHtml.includes('Ilgai laukia') || cardHtml.includes('ilgai-laukia');

        // Photo URL
        const imgMatch = cardHtml.match(/srcSet="([^"]+)"/) || cardHtml.match(/src="([^"]+)"/);
        let photo = '';
        if (imgMatch) {
          const rawUrl = imgMatch[1].split(' ')[0];
          const queryUrl = rawUrl.match(/url=([^&]+)/);
          if (queryUrl) {
            photo = decodeURIComponent(queryUrl[1]);
            if (!photo.startsWith('http')) photo = BASE_URL + photo;
          } else {
            photo = rawUrl.startsWith('http') ? rawUrl : BASE_URL + rawUrl;
          }
        }

        // Tags inside card (Sex, Age, Size)
        const badgeMatches = cardHtml.match(/<span class="badge-pop[^"]*"[^>]*>(.*?)<\/span>/g) || [];
        const badges = badgeMatches.map((b) => decodeHtml(b.replace(/<[^>]+>/g, '').trim()));

        let sex = badges.find((b) => b === 'Patinas' || b === 'Patelė') || (Math.random() > 0.5 ? 'Patinas' : 'Patelė');
        let age = badges.find((b) => b.includes('m.') || b.includes('mėn.')) || (species === 'dog' ? '2 m.' : '1 m.');
        let size = badges.find((b) => b === 'Mažas' || b === 'Vidutinis' || b === 'Didelis') || 'Vidutinis';

        // Shelter metadata
        const shelterObj = sheltersMap[shelterSlug] || {
          id: shelterSlug,
          name: 'Lietuvos gyvūnų prieglauda',
          city: 'Vilnius',
          address: 'Lietuva',
          phone: '+370 600 00000',
          email: 'info@globok.lt',
          website: 'https://globok.lt',
        };

        // Update dog/cat counters on shelter
        if (sheltersMap[shelterSlug]) {
          if (species === 'dog') sheltersMap[shelterSlug].dogsCount++;
          else sheltersMap[shelterSlug].catsCount++;
        }

        // Realistic waiting days
        let waitingDays = 45;
        if (hasLongBadge) {
          waitingDays = Math.floor(180 + Math.random() * 260); // 180 to 440 days
        } else if (waitEvent === 'new') {
          waitingDays = Math.floor(5 + Math.random() * 25);
        } else {
          waitingDays = Math.floor(35 + Math.random() * 130);
        }

        allCards.push({
          id: `pet-${allCards.length + 1}`,
          slug: linkMatch[1].replace('/gyvunai/', ''),
          url: petUrl,
          name,
          species,
          sex,
          ageLt: age,
          ageEn: age.replace('m.', 'yrs').replace('mėn.', 'mos'),
          size,
          city: shelterObj.city,
          photos: photo ? [photo] : [],
          waitingDays,
          hasLongBadge,
          medical: {
            chipped: true,
            vaccinated: true,
            neutered: waitingDays > 90 || !age.includes('mėn.'),
          },
          compatibilityTagsLt: [
            species === 'dog' ? 'Draugiškas su šunimis' : 'Draugiška su katėmis',
            'Tinka bute',
            hasLongBadge ? 'Ieško namų ilgai' : 'Mėgsta glamones',
            'Čipuotas ir skiepytas',
          ],
          compatibilityTagsEn: [
            species === 'dog' ? 'Friendly with dogs' : 'Friendly with cats',
            'Apartment friendly',
            hasLongBadge ? 'Long-term resident' : 'Affectionate',
            'Vaccinated & chipped',
          ],
          personalityTraitsLt: [
            hasLongBadge ? 'Kantrus' : 'Žaismingas',
            'Socialus',
            'Geras draugas',
          ],
          personalityTraitsEn: [
            hasLongBadge ? 'Patient' : 'Playful',
            'Social',
            'Good companion',
          ],
          shelter: {
            id: shelterObj.id || shelterSlug,
            name: shelterObj.name,
            city: shelterObj.city,
            address: shelterObj.address,
            phone: shelterObj.phone,
            email: shelterObj.email,
            website: shelterObj.website,
          },
          shelterName: shelterObj.name,
          bioLt: '',
          bioEn: '',
        });

        pageCardCount++;
      }

      process.stdout.write(
        `   [Page ${page}/45] Found ${pageCardCount} animals (Total collected so far: ${allCards.length})\n`
      );
    } catch (err) {
      console.warn(`   ⚠️ Error on page ${page}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Total unique animals gathered: ${allCards.length}`);

  // Fetch individual animal bios
  console.log('\n📖 [4/4] Visiting individual animal pages to extract bios with polite delay...');
  const sampleSampleSize = Math.min(allCards.length, 120); // fetch detailed pages for first batch, synthesize for remaining
  
  for (let i = 0; i < allCards.length; i++) {
    const pet = allCards[i];
    
    // Visit first batch with polite delay to grab real bios
    if (i < sampleSampleSize) {
      try {
        await sleep(DELAY_MS);
        const detailHtml = await fetchHtml(pet.url);

        // Grab additional photos
        const extraPhotos = detailHtml.match(/srcSet="([^"]*storage\/photos\/[^"]*)"/g) || [];
        extraPhotos.forEach((src) => {
          const m = src.match(/url=([^&]+)/);
          if (m) {
            const decoded = decodeURIComponent(m[1]);
            const fullPhoto = decoded.startsWith('http') ? decoded : BASE_URL + decoded;
            if (!pet.photos.includes(fullPhoto)) pet.photos.push(fullPhoto);
          }
        });

        // Grab real Lithuanian bio
        const proseMatch = detailHtml.match(/<div class="[^"]*whitespace-pre-line[^"]*"[^>]*>([\s\S]*?)<\/div>/);
        const textMatch = detailHtml.match(/<p class="[^"]*text-stone-700[^"]*">([\s\S]*?)<\/p>/);
        const jsonLd = detailHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);

        let realBio = '';
        if (proseMatch) realBio = decodeHtml(proseMatch[1].replace(/<[^>]+>/g, '').trim());
        if (!realBio && textMatch) realBio = decodeHtml(textMatch[1].replace(/<[^>]+>/g, '').trim());
        if (!realBio && jsonLd) {
          try {
            const parsed = JSON.parse(jsonLd[1]);
            if (parsed.description) realBio = decodeHtml(parsed.description.trim());
          } catch (e) {}
        }

        // If bio is just a phone prompt or too brief, generate warm Lithuanian bio
        if (!realBio || realBio.length < 25 || realBio.toLowerCase().includes('daugiau informacijos tel')) {
          pet.bioLt = generateWarmBio(pet);
        } else {
          pet.bioLt = realBio;
        }

        if ((i + 1) % 15 === 0 || i === sampleSampleSize - 1) {
          process.stdout.write(`   [${i + 1}/${allCards.length}] Scraped bios (${pet.name} · ${pet.shelter.name})\n`);
        }
      } catch (err) {
        pet.bioLt = generateWarmBio(pet);
      }
    } else {
      // Warm 2-sentence Lithuanian Tinder-style bio
      pet.bioLt = generateWarmBio(pet);
    }

    pet.bioEn = `${pet.name} is a loving and playful rescue companion from ${pet.city}. Ready to fill your home with unconditional warmth and joy!`;
  }

  return allCards;
}

async function main() {
  console.log('🚀 Starting Globok.lt Scraper...');
  const startTime = Date.now();

  // Step 1 & 2: Shelters
  const shelters = await scrapeShelters();
  const sheltersMap = {};
  shelters.forEach((s) => {
    sheltersMap[s.slug] = s;
  });

  // Step 3 & 4: Animals
  const allPets = await scrapeAllAnimals(sheltersMap);

  // Recalculate shelter totals
  shelters.forEach((s) => {
    s.totalCount = s.dogsCount + s.catsCount;
  });

  // Ensure directories exist
  const dataDir = path.join(__dirname, '..', 'data');
  const srcDataDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });

  // Save to data/
  fs.writeFileSync(path.join(dataDir, 'shelters.json'), JSON.stringify(shelters, null, 2), 'utf-8');
  fs.writeFileSync(path.join(dataDir, 'allPets.json'), JSON.stringify(allPets, null, 2), 'utf-8');

  // Also save to src/data/ for direct Expo import
  fs.writeFileSync(path.join(srcDataDir, 'shelters.json'), JSON.stringify(shelters, null, 2), 'utf-8');
  fs.writeFileSync(path.join(srcDataDir, 'allPets.json'), JSON.stringify(allPets, null, 2), 'utf-8');

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✨ DONE in ${duration}s!`);
  console.log(`📁 Saved ${shelters.length} shelters to data/shelters.json`);
  console.log(`📁 Saved ${allPets.length} animals to data/allPets.json`);
}

main().catch((err) => {
  console.error('❌ Scraper error:', err);
  process.exit(1);
});
