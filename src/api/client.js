import { API_BASE_URL } from './config';

export class ApiError extends Error {
  constructor(message, { status, url } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

export async function getJson(path, { signal } = {}) {
  if (!API_BASE_URL) {
    throw new ApiError('API_BASE_URL belum dikonfigurasi');
  }

  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!res.ok) {
    throw new ApiError(`Request gagal (${res.status})`, { status: res.status, url });
  }

  return res.json();
}

export async function postJson(path, body, { signal } = {}) {
  if (!API_BASE_URL) {
    throw new ApiError('API_BASE_URL belum dikonfigurasi');
  }

  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    throw new ApiError(`Request gagal (${res.status})`, { status: res.status, url });
  }

  return res.json();
}
