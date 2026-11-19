# src/services
`storage.js`: the **only** file that reads or writes `localStorage`. Built together (issue #2).
Every page uses its functions (`getTrips()`, `addBooking()`, `updateBookingStatus()`…), listed in the README, section 5.2.
Never call `localStorage` directly from a page.
