import { getJson } from './client';
import { hasApi } from './config';
import {
  WHATSAPP_DEFAULT_MESSAGE,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
} from '../utils/constants';

const STATIC_CONTACT = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappUrl: buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE),
  whatsappDefaultMessage: WHATSAPP_DEFAULT_MESSAGE,
};

export async function fetchContactSettings({ signal } = {}) {
  if (!hasApi) {
    return STATIC_CONTACT;
  }

  return getJson('/contact-settings', { signal });
}
