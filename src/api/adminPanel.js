import axiosInstance from './axiosInstance';

// ── Stats ────────────────────────────────────────────────────────────────────

/** GET /api/admin-panel/stats/ */
export const getStats = () =>
  axiosInstance.get('/api/admin-panel/stats/');

// ── Plans ────────────────────────────────────────────────────────────────────

/** GET /api/admin-panel/plans/ */
export const listAdminPlans = () =>
  axiosInstance.get('/api/admin-panel/plans/');

/** POST /api/admin-panel/plans/ */
export const createPlan = (data) =>
  axiosInstance.post('/api/admin-panel/plans/', data);

/** GET /api/admin-panel/plans/:pk/ */
export const getAdminPlan = (pk) =>
  axiosInstance.get(`/api/admin-panel/plans/${pk}/`);

/** PATCH /api/admin-panel/plans/:pk/ */
export const updatePlan = (pk, data) =>
  axiosInstance.patch(`/api/admin-panel/plans/${pk}/`, data);

/** DELETE /api/admin-panel/plans/:pk/ */
export const deletePlan = (pk) =>
  axiosInstance.delete(`/api/admin-panel/plans/${pk}/`);

// ── Users ────────────────────────────────────────────────────────────────────

/**
 * GET /api/admin-panel/users/
 * @param {{ q?: string, role?: string, page?: number }} params
 */
export const listAdminUsers = (params = {}) =>
  axiosInstance.get('/api/admin-panel/users/', { params });

/**
 * PATCH /api/admin-panel/users/:pk/
 * e.g. { is_active: false } or { role: 'officer', is_verified: true }
 */
export const updateAdminUser = (pk, data) =>
  axiosInstance.patch(`/api/admin-panel/users/${pk}/`, data);

// ── Documents ────────────────────────────────────────────────────────────────

/**
 * GET /api/admin-panel/documents/
 * @param {{ q?: string, doc_type?: string, status?: string, flagged?: boolean, page?: number }} params
 */
export const listAdminDocuments = (params = {}) =>
  axiosInstance.get('/api/admin-panel/documents/', { params });

/** GET /api/admin-panel/documents/:pk/ */
export const getAdminDocument = (pk) =>
  axiosInstance.get(`/api/admin-panel/documents/${pk}/`);
