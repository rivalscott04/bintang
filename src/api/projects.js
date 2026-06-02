import { PROJECTS } from '../data/projects';
import { getProjectBySlug, mergeProjectWithLocal } from '../utils/projects';
import { ApiError, getJson } from './client';
import { hasApi } from './config';

/** Ambil daftar proyek dari API jika tersedia, else data statis. */
export async function fetchProjects({ signal } = {}) {
  if (!hasApi) {
    return PROJECTS;
  }

  const payload = await getJson('/projects', { signal });
  const list = Array.isArray(payload) ? payload : payload.projects ?? PROJECTS;
  return list.map((project) => mergeProjectWithLocal(project));
}

/** Ambil satu proyek by slug dari API jika tersedia. */
export async function fetchProjectBySlug(slug, { signal } = {}) {
  if (!hasApi) {
    const project = getProjectBySlug(slug);
    if (!project) {
      throw new ApiError('Proyek tidak ditemukan', { status: 404 });
    }
    return project;
  }

  const payload = await getJson(`/projects/${encodeURIComponent(slug)}`, { signal });
  const project = payload.project ?? payload;
  return mergeProjectWithLocal(project);
}
