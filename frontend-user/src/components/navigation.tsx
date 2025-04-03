import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Scripts', href: '/scripts' },
  { name: 'Executions', href: '/executions' },
  { name: 'Profile', href: '/profile' },
];

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-slate-200 bg-primary text-white dark:border-slate-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-white hover:text-indigo-300 transition-colors">
            Automation Platform
          </Link>
          <div className="hidden space-x-4 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-white'
                    : 'text-indigo-200 hover:text-indigo-300'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-indigo-200">
                {user.firstName} {user.lastName}
              </span>
              <Button variant="outline" onClick={() => logout()} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-primary hover:bg-indigo-100">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 