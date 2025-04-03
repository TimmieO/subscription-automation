'use client';

import { SideMenu } from './side-menu';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SideMenu />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 