# SANKALP AI — Delhi's Civic Nervous System

## Overview
A production-grade civic governance mobile app built with Expo/React Native. Acts as a live civic command center for Delhi's 20 million citizens and city administrators. Features real data, interactive maps, real-time SOS, gamification, bilingual EN/HI support, and a secret admin war room.

## Key Features Implemented
- **5-tab dashboard**: Dashboard, Complaints, Map, SOS, Bills + Profile
- **Animated Login Splash Carousel**: 3-slide story-style splash with Indian citizen photos (sadhu, youth2, men_namaste), progress bars, quotes, skip button — transitions to animated login form with Indian tricolor hero
- **Women Safety SOS — 5 Panic Methods**:
  1. Hardware-styled Volume Up button (6 taps in 4s)
  2. **TAP 6×** — Large dedicated purple card with 62px circle counter + pip dots
  3. **HOLD 2s** — Large indigo card with fill bar animation (onPressIn/onPressOut setInterval)
  4. **SHAKE 3×** — Accelerometer at 80ms intervals, threshold 2.5, real-time count shown in green circle
  5. AppState rapid background/foreground (power button 3× in 2s)
- **Admin Emergency Broadcast**: Admin sends city-wide alert to all citizen devices via WebSocket
- **Real Delhi Map**: react-native-maps with dark style, complaints/SOS/workers/police markers (web: canvas fallback)
- **Delhi Gov Bills**: MCD, DJB, BSES, Vehicle Tax, Property Tax with payment flow
- **Global Emergency Buzzer**: Overlay in root layout receives real-time broadcast alerts
- **expo-location**: Real GPS in SOS and Map screens
- **expo-sensors**: Accelerometer shake detection (3 shakes = panic trigger)
- **expo-av**: 30s audio recording as evidence for women safety SOS
- **Government Announcements**: Admin posts announcements (scheme/welfare/emergency/general) visible on public dashboard; full CRUD backend + admin UI
- **Complaint detail modal**: Admin War Room P1 complaints + Reports are fully clickable → detail modal with resolve/reject actions
- **Worker detail modal**: Worker cards → full modal with stats, assigned complaints, contact, performance
- **Admin Announcements screen**: Dedicated admin screen to post and delete government notices with type + priority
- **Photo capture in complaints**: expo-image-picker integration (camera + gallery) when submitting complaints
- **Emoji → Ionicons**: All emoji icons replaced with Ionicons throughout app (no emoji rendering issues on any platform)

**Tagline:** "Delhi's Civic Nervous System"

## Demo Credentials
- **Citizen:** Phone `9876543210` / PIN `123456`
- **Admin (secret):** Phone `9999999999` / PIN `000000`
- **Admin hint:** Tap the SANKALP logo 5 times on the login screen

## Architecture

### Frontend (Expo React Native)
- **Framework:** Expo Router (file-based routing)
- **State:** React Context (AuthContext, AppContext, LanguageContext) + AsyncStorage
- **Auth:** Token-based auth (Bearer) stored in AsyncStorage; AppContext reloads data reactively when token changes
- **API:** All data from real backend; `getApiUrl()` returns `http://localhost:5000` when on localhost (avoids Replit proxy CORS redirect), HTTPS Replit domain otherwise
- **UI:** Custom components, Animated API, LinearGradient, Ionicons, Inter fonts
- **Languages:** English / Hindi toggle via LanguageContext

### Backend (Express + TypeScript)
- Express.js server on port 5000
- In-memory storage with 220+ geo-tagged Delhi complaints across all wards
- 13 real Delhi police stations with coordinates
- Gamification: points, badges (First Report, Active Citizen, Hero, etc.), leaderboard
- WebSocket server for real-time updates
- Risk zones: high-risk areas across Delhi
- Token-based auth with Bearer tokens
- REST API: auth, complaints, SOS, wards, workers, police-stations, risk-zones, leaderboard, nearest-police

### Key Files
- `server/storage.ts` — 220+ geo complaints, 13 police stations, gamification, risk zones
- `server/routes.ts` — All API routes + WebSocket
- `context/AppContext.tsx` — Real backend API integration with 30s polling, token-reactive
- `context/AuthContext.tsx` — Auth with points/badges/level on user
- `context/LanguageContext.tsx` — EN/HI bilingual translations
- `components/DelhiMap.tsx` — Custom geo-projected interactive Delhi map
- `lib/query-client.ts` — API URL resolution (localhost→direct, otherwise EXPO_PUBLIC_DOMAIN)

## App Structure

### Auth Screens (app/(auth)/)
- `login.tsx` — Animated login with SANKALP logo, phone + PIN, tap-logo-5x for admin hint
- `register.tsx` — Registration with PIN strength meter

### Citizen Tabs (app/(tabs)/)
- `index.tsx` — Command Center Dashboard: live stats, civic health meter, active SOS badge, category distribution, recent complaints
- `complaints.tsx` — Full complaint management: 220+ real complaints, filter/search, proof system, upvote, AI classification simulation, detail modal with backdrop-close
- `map.tsx` — Interactive Delhi Map: geo-projected, complaints/SOS/police/workers/risk-zones markers with tap popups, filter pills
- `sos.tsx` — SOS Emergency: real geolocation, nearest 2 police stations, P1 auto-ticket, 6 emergency categories, active alert feed
- `profile.tsx` — Gamification profile: points, badges, level, language toggle, sign out
- `analytics.tsx` — Analytics: donut charts, bar charts, gamification leaderboard (accessible from dashboard)

### Admin Panel (app/admin/)
- `index.tsx` — War Room: KPI grid, Emergency Mode toggle, real-time polling, live SOS feed, worker tracking, risk zone map
- `reports.tsx` — Complaint reports with filter/sort (status, category, priority, AI score, upvotes)
- `alerts.tsx` — SOS monitoring with live resolve capability
- `workers.tsx` — Worker management with score, tasks, ratings

### Infrastructure
- `app/_layout.tsx` — Root layout: AuthGate with animated logo splash, AuthProvider→AppProvider→LanguageProvider
- `app/(tabs)/_layout.tsx` — Tab bar: Dashboard, Complaints, Map, SOS, Profile (SOS badge shows active count)
- `metro.config.js` — Excludes `.local` from Metro file watcher (prevents ENOENT crash on Replit)

## API Endpoints
- `POST /api/auth/login` — Login, returns user + Bearer token
- `POST /api/auth/register` — Register citizen
- `GET /api/complaints` — All 220+ geo-tagged complaints (auth required)
- `POST /api/complaints` — Submit new complaint (auth required)
- `PUT /api/complaints/:id/upvote` — Upvote complaint
- `PUT /api/complaints/:id/resolve` — Resolve with proof/rating
- `PUT /api/complaints/:id/reject` — Reject/reopen
- `GET /api/sos` — All SOS alerts
- `POST /api/sos` — Trigger SOS with location + auto P1 ticket
- `PUT /api/sos/:id/resolve` — Resolve SOS
- `GET /api/wards` — Ward health scores
- `GET /api/workers` — All workers
- `GET /api/police-stations` — 13 real Delhi police stations
- `GET /api/risk-zones` — High-risk areas across Delhi
- `GET /api/leaderboard` — Gamification leaderboard
- `GET /api/nearest-police?lat=&lng=` — Find nearest police stations

## Gamification
- **Points:** File complaint (+10), upvote (+2), SOS trigger (+5), resolve (+25)
- **Badges:** First Report, Active Citizen, Safety Hero, Community Guardian, City Champion
- **Levels:** Based on total points

## Delhi Geo Data
- Lat bounds: 28.40°N – 28.88°N
- Lng bounds: 76.84°E – 77.35°E
- 13 police stations with real coordinates
- 220+ geo-tagged complaints distributed across all Delhi wards

## Known Infrastructure Notes
- Metro FallbackWatcher may crash if Replit deletes `.local/state/workflow-logs/<hash>` while Metro is watching it. Fix: `mkdir -p .local/state/workflow-logs` before starting Metro. The `metro.config.js` blockList is also configured to mitigate this.
- API URL: When `window.location.hostname === 'localhost'` (dev/e2e), calls go to `http://localhost:5000` directly to avoid Replit proxy redirect on preflight OPTIONS requests.

## Color Palette
- Background: `#0A0F1C`
- Green (success): `#22C55E`
- Amber (warning): `#F59E0B`
- Red (danger): `#EF4444`
- Blue (info): `#3B82F6`
- Purple (AI): `#8B5CF6`
- Cyan (accent): `#06B6D4`
