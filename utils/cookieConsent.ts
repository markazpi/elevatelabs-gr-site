export const COOKIE_CONSENT_KEY = 'el_cookie_consent';
export const CONSENT_UPDATE_EVENT = 'el:consent-updated';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
}

export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString()
};

export const getConsent = (): CookieConsent | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    return null;
  }
};

export const saveConsent = (consent: CookieConsent) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new Event(CONSENT_UPDATE_EVENT));
};

export const hasAnalyticsConsent = (): boolean => {
  const consent = getConsent();
  return consent ? consent.analytics : false;
};

export const hasMarketingConsent = (): boolean => {
  const consent = getConsent();
  return consent ? consent.marketing : false;
};

// Helper to check if the banner should be shown
export const shouldShowBanner = (): boolean => {
  return getConsent() === null;
};
