export const locales = ['en', 'sv'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number]; 