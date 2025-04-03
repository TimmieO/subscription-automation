import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Automation Platform
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === "/"
                    ? "text-primary"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === "/pricing"
                    ? "text-primary"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                )}
              >
                Pricing
              </Link>
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === "/dashboard"
                        ? "text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/scripts"
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === "/scripts"
                        ? "text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    Scripts
                  </Link>
                  <Link
                    href="/executions"
                    className={cn(
                      "text-sm font-medium transition-colors",
                      pathname === "/executions"
                        ? "text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    Executions
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" className="text-slate-800 dark:text-slate-200">
                  Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-slate-800 dark:text-slate-200">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-primary text-white hover:bg-primary-dark">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 