'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';

export function MainNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t } = useTranslation('common');

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
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors',
              pathname === item.href
                ? 'text-primary'
                : 'text-slate-700 dark:text-slate-300 hover:text-primary'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <LanguageSelector />
        {user ? (
          <Button
            variant="outline"
            className="border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={logout}
          >
            {t('nav.logout')}
          </Button>
        ) : (
          <Link href="/login">
            <Button className="bg-primary text-white hover:bg-primary-dark">
              {t('nav.login')}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
} 