/** Base URL backend CMS/API. Kosongkan untuk mode statis (data lokal). */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export const hasApi = Boolean(API_BASE_URL);
