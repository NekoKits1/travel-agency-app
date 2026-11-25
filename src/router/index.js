import { createRouter, createWebHistory } from 'vue-router'

// One line per page. Path = the URL, name = the shared nickname of the page (README, section 6).
// Each page loads only when it is visited.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Customer side
    { path: '/', name: 'home', component: () => import('@/features/home/HomePage.vue') },
    {
      path: '/trips',
      name: 'catalogue',
      component: () => import('@/features/catalogue/CataloguePage.vue'),
    },
    {
      path: '/trips/:id',
      name: 'trip-detail',
      component: () => import('@/features/trip-detail/TripDetailPage.vue'),
    },
    {
      path: '/trips/:id/book',
      name: 'booking',
      component: () => import('@/features/booking/BookingPage.vue'),
    },
    {
      path: '/my-bookings',
      name: 'my-bookings',
      component: () => import('@/features/my-bookings/MyBookingsPage.vue'),
    },

    // Admin side (the protection of these pages comes with issue #10)
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('@/features/admin-login/AdminLoginPage.vue'),
    },
    {
      path: '/admin/trips',
      name: 'admin-trips',
      component: () => import('@/features/admin-trips/AdminTripsPage.vue'),
    },
    {
      path: '/admin/bookings',
      name: 'admin-bookings',
      component: () => import('@/features/admin-bookings/AdminBookingsPage.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('@/features/admin-dashboard/AdminDashboardPage.vue'),
    },
  ],
})

export default router
