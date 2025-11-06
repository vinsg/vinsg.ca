import { ui, defaultLang, type UIKey } from './translations';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UIKey) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getLocalizedPath(path: string, lang: keyof typeof ui) {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function removeLocaleFromPath(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] in ui) {
    segments.shift();
  }
  return '/' + segments.join('/');
}
