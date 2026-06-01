import { postJson } from './client';
import { hasApi } from './config';

/**
 * Simpan lead ke backend sebelum redirect WhatsApp.
 * @returns {Promise<{ id: number, message: string } | null>}
 */
export async function createLead(payload, options = {}) {
  if (!hasApi) {
    return null;
  }

  return postJson('/leads', payload, options);
}
