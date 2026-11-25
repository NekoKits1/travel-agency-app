# Travel Agency Web App

Web Programming project — EFREI Paris, I2-NEW (M. Zoghlami).
A travel agency website: customers browse, search and book trips; an admin area manages trips and bookings.
No server and no database: all data is stored in the browser with `localStorage`.

**Stack:** HTML5 · CSS3 · JavaScript · Vue.js
**Deadlines:** report on Moodle — Mon 7 Dec 2026 · defense — Tue 8 Dec 2026

> This README is for the team: how the repo is organised, who does what, and the names we all use.
> It is not the project report.

> ⚠️ **Shared names — read sections 5 and 6 before writing any code.**
> Our pages use the same data (trips, bookings) and the same storage functions. Use **exactly** the names, fields and formats listed there: don't rename, don't change a format, never call `localStorage` directly. Need a new shared name? Ask the group first, then add it here.

---

## 1. Team

| Member | Codes | Checks |
|---|---|---|
| Nancy | Shared layout and styles (NavBar, footer, `variables.css`, `main.css`), Home, Dashboard | Amine |
| Wissem | Catalogue (search, filters, sorting), Manage bookings | Nancy |
| Audrey | Trip page, Booking form, Admin login and protected pages, sample data (`seed.js`, `resetData()`), project setup and CI | Wissem |
| Amine | My bookings, Manage trips | Audrey |

The full split, the checklist of each part and the deadlines are in the team Google Doc (sections 6 and 10).

---

## 2. How the repo is organised

The project is built with **Vite** (why, and how to install it: team doc, section 7).
The files at the root are settings files: each tool looks for its file there, so **don't move them**.

```
travel-agency-app/
├── .vscode/              → recommended VS Code settings and extensions
├── docs/                 → screenshots and diagrams for the report
├── public/               → files served as they are: favicon, images/ (trip photos)
├── src/
│   ├── main.js           → starts the app (loads App.vue, the router and the shared styles)
│   ├── App.vue           → the frame of every page: NavBar, the current page, footer
│   ├── router/index.js   → the list of URLs → pages, and the admin protection
│   ├── assets/styles/    → variables.css (colours, fonts) and main.css (shared styles)
│   ├── components/       → pieces used on several pages (NavBar, FooterBar, TripCard…)
│   ├── features/         → one folder per page (see section 6)
│   ├── services/         → storage.js: the ONLY file that talks to localStorage
│   ├── data/             → seed.js: the sample trips and bookings
│   └── utils/            → small helpers (formatPrice, formatDate, generateId)
├── index.html            → the single HTML page Vite fills with the app
├── package.json          → the project's libraries and commands (npm run …)
├── package-lock.json     → exact library versions: never edit it by hand
├── vite.config.js        → Vite settings
├── eslint.config.js, .oxlintrc.json, .prettierrc.json → code checks and formatting
├── jsconfig.json         → lets us write imports as '@/services/storage.js'
├── .gitignore, .gitattributes → what Git ignores; same line endings for everyone
└── README.md
```

Not on GitHub, created on your computer: `node_modules/` (by `npm install`), `dist/` (by `npm run build`).

**Files only one person changes:** `package.json`, `vite.config.js`, `index.html`, `src/main.js` and `src/router/index.js` belong to Audrey.
Need a new library or a new route? Ask her (for a route: add your own line, she checks it).

**Rule of thumb:** if only your page uses it, it goes in your `features/` folder.
If two pages or more use it, it goes in `components/`, `services/` or `utils/` — tell the group first.

---

## 3. How we work with Git

- `main` = the version that works. **Nobody pushes to `main` directly.** Everything arrives through a pull request.
- For each task, create a short branch from the latest `main`, named `firstname/task` (for example `nancy/home-page`).
- First push of a new branch: `git push -u origin firstname/task`. After that, a plain `git push` is enough.
- When the task works: push, open a pull request, add your checker as reviewer.
- The checker tests it, approves, and merges. The branch is then deleted.
- Before starting a new task: `git checkout main` → `git pull` → create the new branch.

**Commit messages:** `type(feature): what changed`

| Type | When | Example |
|---|---|---|
| `feat` | new feature | `feat(catalogue): add price filter` |
| `fix` | bug fix | `fix(booking): block 0 travellers` |
| `style` | design / CSS only | `style(home): new hero colours` |
| `docs` | README, comments | `docs: add data format to README` |
| `chore` | setup, config | `chore: add CI workflow` |

**What the checker checks before approving:** it works in the browser · no red error in the console (F12) ·
looks fine on phone size · data really saved (F12 → Application → Local Storage) · names follow section 4 and 5.

---

## 4. Writing rules

| What | Rule | Example |
|---|---|---|
| Variables and functions | camelCase, in English, a clear name | `filteredTrips`, `addBooking()` |
| Functions | start with a verb | `getTrips()`, `formatPrice()`, `submitBooking()` |
| Yes/no values | start with `is` or `has` | `isAdmin`, `hasPlaces` |
| Lists | plural | `trips`, `bookings` |
| One item | singular | `trip`, `booking` |
| Fixed values that never change | UPPER_SNAKE_CASE | `STORAGE_KEYS`, `BOOKING_STATUS` |
| Component files | PascalCase | `TripCard.vue`, `SearchFilters.vue` |
| Other JS files | camelCase | `storage.js`, `formatPrice.js` |
| CSS classes | kebab-case, `block__element--variant` | `trip-card`, `trip-card__title`, `btn--primary` |
| Dates | text `"YYYY-MM-DD"` | `"2026-12-20"` |
| Prices | number, in euros, no symbol | `1250` |

---

## 5. Shared names (everyone uses exactly these)

### 5.1 Shared data

```js
STORAGE_KEYS = { TRIPS: 'ta_trips', BOOKINGS: 'ta_bookings', SESSION: 'ta_session' }

CATEGORIES = ['beach', 'city', 'mountain', 'adventure', 'culture']

BOOKING_STATUS = { PENDING: 'pending', CONFIRMED: 'confirmed', CANCELLED: 'cancelled' }

ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' }   // demo only
```

**A trip**

| Field | Type | Example |
|---|---|---|
| `id` | text | `"trip-001"` |
| `title` | text | `"7 days in Lisbon"` |
| `destination` | text | `"Lisbon"` |
| `country` | text | `"Portugal"` |
| `category` | one of `CATEGORIES` | `"city"` |
| `price` | number (per person, €) | `890` |
| `durationDays` | number | `7` |
| `startDate` / `endDate` | `"YYYY-MM-DD"` | `"2027-04-10"` |
| `placesAvailable` | number | `12` |
| `image` | text (path) | `"/images/lisbon.jpg"` |
| `description` | text | `"Discover…"` |

**A booking**

| Field | Type | Example |
|---|---|---|
| `id` | text | `"booking-1734567890"` |
| `tripId` | text (a trip's `id`) | `"trip-001"` |
| `customerName` | text | `"Jane Doe"` |
| `email` | text | `"jane@mail.com"` |
| `travellers` | number | `2` |
| `totalPrice` | number (€) = trip price × travellers | `1780` |
| `bookingDate` | `"YYYY-MM-DD"` | `"2026-11-20"` |
| `status` | one of `BOOKING_STATUS` | `"pending"` |

### 5.2 Shared functions — `services/storage.js`

Nobody uses `localStorage` directly: always go through these.

| Function | What it does |
|---|---|
| `getTrips()` | returns all trips |
| `getTripById(id)` | returns one trip |
| `saveTrip(trip)` | adds the trip, or updates it if its `id` exists |
| `deleteTrip(id)` | removes a trip |
| `getBookings()` | returns all bookings |
| `getBookingsByEmail(email)` | returns the bookings of one customer |
| `addBooking(booking)` | saves a new booking and lowers `placesAvailable` |
| `updateBookingStatus(id, status)` | changes a booking's status |
| `loginAdmin(username, password)` | returns `true`/`false` and saves the session |
| `logoutAdmin()` | ends the admin session |
| `isAdminLoggedIn()` | returns `true`/`false` |
| `resetData()` | puts the sample data back (useful for the demo) |

### 5.3 Shared helpers — `utils/`

| Function | Result |
|---|---|
| `formatPrice(1250)` | `"1 250 €"` |
| `formatDate("2026-12-20")` | `"20/12/2026"` |
| `generateId('trip')` | `"trip-1734567890"` |

### 5.4 Shared components — `components/`

| Component | Receives | Used in |
|---|---|---|
| `NavBar` | — | every page |
| `FooterBar` | — | every page |
| `TripCard` | `trip` | Home, Catalogue |
| `BaseButton` | `label`, `variant` (`primary`/`secondary`/`danger`) | everywhere |

---

## 6. Pages and their names

### Page files and routes

Each page already exists as an almost empty file with its route: open your file and replace the title with your page.
**Never rename a file or a route name alone** — other pages link to them. To link to a page, use its route name:
`router.push({ name: 'trip-detail', params: { id: trip.id } })` or `<RouterLink :to="{ name: 'catalogue' }">`.

| Page | URL | Route name | File | Owner |
|---|---|---|---|---|
| Home | `/` | `home` | `features/home/HomePage.vue` | Nancy |
| Catalogue | `/trips` | `catalogue` | `features/catalogue/CataloguePage.vue` | Wissem |
| Trip page | `/trips/:id` | `trip-detail` | `features/trip-detail/TripDetailPage.vue` | Audrey |
| Booking form | `/trips/:id/book` | `booking` | `features/booking/BookingPage.vue` | Audrey |
| My bookings | `/my-bookings` | `my-bookings` | `features/my-bookings/MyBookingsPage.vue` | Amine |
| Admin login | `/admin/login` | `admin-login` | `features/admin-login/AdminLoginPage.vue` | Audrey |
| Manage trips | `/admin/trips` | `admin-trips` | `features/admin-trips/AdminTripsPage.vue` | Amine |
| Manage bookings | `/admin/bookings` | `admin-bookings` | `features/admin-bookings/AdminBookingsPage.vue` | Wissem |
| Dashboard | `/admin/dashboard` | `admin-dashboard` | `features/admin-dashboard/AdminDashboardPage.vue` | Nancy |

The routes are in `src/router/index.js` (Audrey). `App.vue` shows the current page with `<RouterView />`.

### Customer side

**Home** — `/` — `features/home/`
| Name | Type | Role |
|---|---|---|
| `featuredTrips` | list | 3 to 6 trips shown on the home page |
| `goToTrip(id)` | function | opens the trip page |
| CSS | | `.hero`, `.hero__title`, `.featured-trips` |

**Catalogue + search** — `/trips` — `features/catalogue/`
| Name | Type | Role |
|---|---|---|
| `trips` | list | all trips |
| `filteredTrips` | list | trips after filters and sorting |
| `searchText` | text | destination or title typed by the user |
| `selectedCategory` | text | one of `CATEGORIES`, or `''` for all |
| `minPrice` / `maxPrice` | number | price range |
| `dateFrom` / `dateTo` | date | travel dates |
| `sortBy` | text | `'price-asc'`, `'price-desc'`, `'date'` |
| `applyFilters()` | function | updates `filteredTrips` |
| `resetFilters()` | function | clears all filters |
| CSS | | `.catalogue`, `.search-filters`, `.trip-grid` |

**Trip page** — `/trips/:id` — `features/trip-detail/`
| Name | Type | Role |
|---|---|---|
| `tripId` | text | taken from the URL |
| `trip` | object | the trip shown |
| `hasPlaces` | yes/no | `placesAvailable > 0` |
| `goToBooking()` | function | opens the booking form |
| CSS | | `.trip-detail`, `.trip-detail__price` |

**Booking form** — `/trips/:id/book` — `features/booking/`
| Name | Type | Role |
|---|---|---|
| `trip` | object | the trip being booked |
| `bookingForm` | object | `{ customerName, email, travellers }` |
| `totalPrice` | number | `trip.price × bookingForm.travellers` |
| `formErrors` | object | one message per wrong field |
| `isSubmitted` | yes/no | shows the confirmation message |
| `validateForm()` | function | fills `formErrors`, returns `true`/`false` |
| `submitBooking()` | function | validates, then calls `addBooking()` |
| CSS | | `.booking-form`, `.form-field`, `.form-error` |

**My bookings** — `/my-bookings` — `features/my-bookings/`
| Name | Type | Role |
|---|---|---|
| `searchEmail` | text | email typed by the customer |
| `myBookings` | list | bookings found for that email |
| `findMyBookings()` | function | calls `getBookingsByEmail()` |
| `cancelMyBooking(id)` | function | sets status to `cancelled` |
| CSS | | `.my-bookings`, `.booking-row`, `.status-badge--pending` |

### Admin side

**Admin login** — `/admin/login` — `features/admin-login/`
| Name | Type | Role |
|---|---|---|
| `username` / `password` | text | form fields |
| `loginError` | text | message if wrong |
| `handleLogin()` | function | calls `loginAdmin()`, then goes to `/admin/trips` |
| `handleLogout()` | function | calls `logoutAdmin()` |
| CSS | | `.admin-login` |

**Manage trips** — `/admin/trips` — `features/admin-trips/`
| Name | Type | Role |
|---|---|---|
| `trips` | list | all trips |
| `tripForm` | object | same fields as a trip |
| `isFormOpen` | yes/no | shows the add/edit form |
| `isEditing` | yes/no | `true` = edit, `false` = new trip |
| `openCreateForm()` | function | empty form |
| `openEditForm(trip)` | function | form filled with that trip |
| `submitTripForm()` | function | calls `saveTrip()` |
| `removeTrip(id)` | function | asks confirmation, calls `deleteTrip()` |
| CSS | | `.admin-table`, `.trip-form` |

**Manage bookings** — `/admin/bookings` — `features/admin-bookings/`
| Name | Type | Role |
|---|---|---|
| `bookings` | list | all bookings |
| `statusFilter` | text | `''` or one of `BOOKING_STATUS` |
| `filteredBookings` | list | bookings after the filter |
| `confirmBooking(id)` / `cancelBooking(id)` | function | call `updateBookingStatus()` |
| `getTripTitle(tripId)` | function | shows the trip name instead of its id |
| CSS | | `.admin-table`, `.status-badge` |

**Dashboard** — `/admin/dashboard` — `features/admin-dashboard/`
| Name | Type | Role |
|---|---|---|
| `totalBookings` | number | all bookings |
| `pendingCount` / `confirmedCount` / `cancelledCount` | number | per status |
| `totalRevenue` | number | sum of `totalPrice` of confirmed bookings |
| `topDestination` | text | most booked destination |
| `bookingsByDestination` | object | `{ Lisbon: 4, Rome: 2 }` |
| CSS | | `.dashboard`, `.stat-card` |

---

## 7. Run the project

### First time (once per computer)

1. Install **Node.js, LTS version**, from https://nodejs.org (Windows: the `.msi` installer).
   Then close and reopen VS Code and check: `node -v` must show **v22.18 or higher** (or v24.12 or higher).
   With an older Node, `npm run dev` fails with *Cannot find native binding*.
2. Get the repo: `git clone https://github.com/NekoKits1/travel-agency-app.git` (or `git checkout main` → `git pull`).
3. In the project folder: `npm install` (downloads the libraries into `node_modules/`).
4. `npm run dev`, then open http://localhost:5173.

### Every day

| Command | What it does |
|---|---|
| `npm run dev` | starts the app on http://localhost:5173 while you code (stop it with Ctrl + C) |
| `npm run lint` | checks the code (Oxlint + ESLint). Run it before every pull request |
| `npm run format` | formats the code with Prettier (VS Code does it on save) |
| `npm run build` | builds the final website into `dist/`. Must work before every pull request |
| `npm install` | run it again after a `git pull` if `package.json` changed |

### If something breaks

- *Cannot find native binding* → your Node is too old: update it (step 1), then delete `node_modules` and `package-lock.json` and run `npm install`.
- *Missing script* → check the spelling (`npm run build`, not `built`) and that you are in the project folder.
- Any other error: copy the full message in the group before changing anything.
