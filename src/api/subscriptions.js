import axiosInstance from './axiosInstance';

/** GET /api/subscriptions/plans/ — public */
export const listPlans = () =>
  axiosInstance.get('/api/subscriptions/plans/');

/** GET /api/subscriptions/status/ — auth */
export const getSubscriptionStatus = () =>
  axiosInstance.get('/api/subscriptions/status/');

/** POST /api/subscriptions/cancel/ — auth (currently returns 503) */
export const cancelSubscription = () =>
  axiosInstance.post('/api/subscriptions/cancel/');
