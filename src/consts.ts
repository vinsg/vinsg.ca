import { ui } from './i18n/translations';

export function getSiteTitle(lang: keyof typeof ui) {
  return ui[lang]['site.title'];
}

export function getSiteDescription(lang: keyof typeof ui) {
  return ui[lang]['site.description'];
}

export const SOCIAL = {
    EMAIL: "contact@vinsg.ca"
}