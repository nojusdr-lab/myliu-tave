# Myliu tave 🐾 — Lithuanian Pet Adoption App

**"Myliu tave"** is a Tinder-style pet adoption mobile app built with **Expo (React Native)** for animal shelters in Lithuania (VšĮ „Lesė“, VšĮ „Tautmilės globa“, VšĮ „Penkta koja“, VšĮ „Būk mano draugas“).

Designed following the **Organic** aesthetic anchor:
- **Palette**: Earth tones (sage `#8B9D83`, clay `#B08B6E`, terracotta `#C66B3D`, ochre `#C08E3A`, moss `#606C38`), sand `#E8DCC7` and oat `#D4B895` surfaces.
- **Structure**: Generous rounded corners (16–32 px).
- **Texture**: Soft tactile grain texture.
- **Motion**: Gentle ease (300–500 ms) and breathing pulse animations on hero actions.
- **Content Discipline**: Authentic Lithuanian rescue animals with verified shelter contacts, genuine adoption bios, and no fabricated telemetry.

---

## Features

1. **Swipeable Card Stack**: Smooth gesture-driven card deck (swipe right to like/match, swipe left to pass) with tactile stamps and angle physics.
2. **Pet Details & Multi-Photo Gallery**: High-resolution photos with left/right tap flipping, verified shelter badges, city indicators, and compatibility tags (*„Draugiškas su katėmis“*, *„Tinka bute“*, etc.).
3. **"Valio! Susisiekite su prieglauda" Match Modal**: Instant contact sheet upon right-swipe with direct phone calling, one-click email composer with pre-filled inquiry message, address, and copy buttons.
4. **Filters & Language Switcher**:
   - Filter pills: **Visi (All) / Šunys (Dogs) / Katės (Cats)**.
   - Language toggle: Instant bilingual support (**LT / EN**).
5. **Saved Likes Drawer**: Access saved pets anytime via the header heart counter.
6. **Google Play Store Ready**: Pre-configured `app.json` with package ID `com.myliutave.app`, adaptive icons, and required permissions.

---

## How to Run

The app is currently running live on:
- **Web preview**: [http://localhost:8081](http://localhost:8081)
- **Expo Go (Mobile)**: Scan the QR code in the terminal with the Expo Go app (iOS / Android).

### Manual Commands
```bash
# Start dev server
npm start

# Web preview
npm run web

# Build for Google Play Store (AAB) with EAS Build
npx eas build --platform android
```
