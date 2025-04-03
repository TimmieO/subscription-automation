'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n';

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const t = useTranslations('common');

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '/', label: t('nav.home') },
    { href: '/pricing', label: t('nav.pricing') },
    ...(user ? [
      { href: '/dashboard', label: t('nav.dashboard') },
      { href: '/scripts', label: t('nav.scripts') },
      { href: '/executions', label: t('nav.executions') },
      { href: '/profile', label: t('nav.profile') },
    ] : []),
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {t('nav.menu')}
              </h2>
            </div>
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm font-medium',
                    pathname === item.href
                      ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  )}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">{t('nav.theme')}</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">{t('nav.language')}</span>
              <LanguageSelector />
            </div>
            {user && (
              <div className="px-4 pb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                >
                  {t('nav.logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 