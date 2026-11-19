# src/features
One folder per page. Each member works in the folders of their pages.
Code used only by one page stays in its folder; code used by two pages or more goes in `components/`, `services/` or `utils/`.

| Folder | Page | URL | Coded by | Issue |
|---|---|---|---|---|
| `home/` | Home | `/` | Member A | #5 |
| `catalogue/` | Catalogue + search and filters | `/trips` | Member B | #6 |
| `trip-detail/` | Trip detail | `/trips/:id` | Member C | #7 |
| `booking/` | Booking form | `/trips/:id/book` | Member C | #8 |
| `my-bookings/` | My bookings | `/my-bookings` | Member D | #9 |
| `admin-login/` | Admin login | `/admin/login` | Member C | #10 |
| `admin-trips/` | Manage trips | `/admin/trips` | Member D | #11 |
| `admin-bookings/` | Manage bookings | `/admin/bookings` | Member B | #12 |
| `admin-dashboard/` | Dashboard | `/admin/dashboard` | Member A | #13 |
