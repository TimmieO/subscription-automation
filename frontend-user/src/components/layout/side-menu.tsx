'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';
import { cn } from '@/lib/utils';

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    ...(user ? [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/scripts', label: 'Scripts' },
      { href: '/executions', label: 'Executions' },
      { href: '/profile', label: 'Profile' },
    ] : []),
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-center">
          <span className={cn(
            "w-full h-0.5 bg-current transform transition-all duration-300",
            isOpen ? "rotate-45 translate-y-1.5" : ""
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transition-all duration-300 my-1",
            isOpen ? "opacity-0" : ""
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transform transition-all duration-300",
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          )} />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMenu}
      />

      {/* Side Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 z-40 transform transition-transform duration-300 ease-in-out shadow-xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex-1">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 rounded-xl transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
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
              <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-sm text-slate-600 dark:text-slate-400">Language</span>
              <LanguageSelector />
            </div>
            {user ? (
              <Button
                variant="outline"
                className="w-full border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" className="block" onClick={toggleMenu}>
                <Button className="w-full bg-primary text-white hover:bg-primary-dark">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 