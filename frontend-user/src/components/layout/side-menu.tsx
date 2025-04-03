'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
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
        className="fixed top-4 right-4 z-50 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span className={cn(
            "w-full h-0.5 bg-current transform transition-all duration-300",
            isOpen ? "rotate-45 translate-y-2" : ""
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transition-all duration-300",
            isOpen ? "opacity-0" : ""
          )} />
          <span className={cn(
            "w-full h-0.5 bg-current transform transition-all duration-300",
            isOpen ? "-rotate-45 -translate-y-2" : ""
          )} />
        </div>
      </button>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleMenu}
      />

      {/* Side Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out shadow-xl",
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
                    "block px-4 py-2 rounded-lg transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={toggleMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-4 border-t">
            {user ? (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" className="block" onClick={toggleMenu}>
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 