'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sv';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations object - you can expand this or move to separate files
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.dashboard': 'Dashboard',
    'nav.scripts': 'Scripts',
    'nav.executions': 'Executions',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.theme': 'Theme',
    'nav.language': 'Language',
    'nav.get_started': 'Get Started',
    'nav.learn_more': 'Learn More',
    
    // Home page
    'home.hero.title': 'Streamline Your Subscription Management',
    'home.hero.subtitle': 'Take control of your subscriptions with our powerful automation platform. Save time, reduce costs, and never miss a payment again.',
    'home.welcome.title': 'Welcome to Script Automation',
    'home.welcome.subtitle': 'Streamline your workflow with powerful automation tools',
    'home.features.title': 'Why Choose Our Platform?',
    'home.features.subtitle': 'Powerful features to manage your subscriptions efficiently',
    'home.feature1.title': 'Automated Payments',
    'home.feature1.description': 'Never miss a payment with our automated subscription management system.',
    'home.feature2.title': 'Smart Analytics',
    'home.feature2.description': 'Get insights into your subscription spending and optimize your budget.',
    'home.feature3.title': 'Secure Platform',
    'home.feature3.description': 'Your data is protected with enterprise-grade security measures.',
    'home.feature4.title': 'Time-Saving Automation',
    'home.feature4.description': 'Automate repetitive tasks and focus on what matters most to your business.',
    'home.testimonials.title': 'What Our Users Say',
    'home.testimonials.subtitle': 'Join thousands of satisfied customers',
    'home.testimonial1.quote': 'This platform has completely transformed how we manage our subscriptions. It\'s a game-changer!',
    'home.testimonial1.name': 'Sarah Johnson',
    'home.testimonial1.role': 'Finance Manager',
    'home.testimonial2.quote': 'The automation features save us hours every month. Highly recommended!',
    'home.testimonial2.name': 'Michael Chen',
    'home.testimonial2.role': 'Business Owner',
    'home.testimonial3.quote': 'Finally, a solution that makes subscription management simple and efficient.',
    'home.testimonial3.name': 'Emily Davis',
    'home.testimonial3.role': 'Operations Director',
    'home.cta.title': 'Ready to Get Started?',
    'home.cta.subtitle': 'Join thousands of users who have simplified their subscription management',
    'home.cta.button': 'Start Your Free Trial',
  },
  sv: {
    // Navigation
    'nav.home': 'Hem',
    'nav.pricing': 'Priser',
    'nav.dashboard': 'Dashboard',
    'nav.scripts': 'Skript',
    'nav.executions': 'Körningar',
    'nav.profile': 'Profil',
    'nav.login': 'Logga in',
    'nav.register': 'Registrera',
    'nav.logout': 'Logga ut',
    'nav.theme': 'Tema',
    'nav.language': 'Språk',
    'nav.get_started': 'Kom igång',
    'nav.learn_more': 'Läs mer',
    
    // Home page
    'home.hero.title': 'Effektivisera din prenumerationshantering',
    'home.hero.subtitle': 'Ta kontroll över dina prenumerationer med vår kraftfulla automatiseringsplattform. Spara tid, minska kostnader och missa aldrig en betalning igen.',
    'home.welcome.title': 'Välkommen till Script Automation',
    'home.welcome.subtitle': 'Effektivisera ditt arbetsflöde med kraftfulla automatiseringsverktyg',
    'home.features.title': 'Varför välja vår plattform?',
    'home.features.subtitle': 'Kraftfulla funktioner för att hantera dina prenumerationer effektivt',
    'home.feature1.title': 'Automatiserade betalningar',
    'home.feature1.description': 'Missa aldrig en betalning med vårt automatiserade prenumerationshanteringssystem.',
    'home.feature2.title': 'Smart analys',
    'home.feature2.description': 'Få insikter om dina prenumerationsutgifter och optimera din budget.',
    'home.feature3.title': 'Säker plattform',
    'home.feature3.description': 'Dina data skyddas med företagsgrad säkerhet.',
    'home.feature4.title': 'Tidsbesparande automatisering',
    'home.feature4.description': 'Automatisera upprepande uppgifter och fokusera på det som är viktigast för ditt företag.',
    'home.testimonials.title': 'Vad våra användare säger',
    'home.testimonials.subtitle': 'Gå med i tusentals nöjda kunder',
    'home.testimonial1.quote': 'Denna plattform har helt förändrat hur vi hanterar våra prenumerationer. Det är en spelväxlare!',
    'home.testimonial1.name': 'Sarah Johnson',
    'home.testimonial1.role': 'Finanschef',
    'home.testimonial2.quote': 'Automatiseringsfunktionerna sparar oss timmar varje månad. Starkt rekommenderat!',
    'home.testimonial2.name': 'Michael Chen',
    'home.testimonial2.role': 'Företagsägare',
    'home.testimonial3.quote': 'Slutligen en lösning som gör prenumerationshantering enkel och effektiv.',
    'home.testimonial3.name': 'Emily Davis',
    'home.testimonial3.role': 'Operationsdirektör',
    'home.cta.title': 'Redo att komma igång?',
    'home.cta.subtitle': 'Gå med i tusentals användare som har förenklat sin prenumerationshantering',
    'home.cta.button': 'Starta din gratis provperiod',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'sv')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 