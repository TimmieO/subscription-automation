'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSelector } from '@/components/ui/language-selector';

const HamburgerButton = styled(Button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary}11;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`;

const SideMenuContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 16rem;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 50;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.2s ease-in-out;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled(Button)`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary}11;
  }
`;

const MenuContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuItem = styled(Button)`
  justify-content: flex-start;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  font-weight: 500;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary}11;
  }
`;

const MenuFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MenuFooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
`;

const MenuFooterLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('nav');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  const menuItems = [
    { href: '/', label: t('home') },
    { href: '/pricing', label: t('pricing') },
    ...(user ? [
      { href: '/dashboard', label: t('dashboard') },
      { href: '/scripts', label: t('scripts') },
      { href: '/executions', label: t('executions') },
      { href: '/profile', label: t('profile') },
    ] : []),
  ];

  return (
    <>
      <HamburgerButton variant="ghost" onClick={toggleMenu}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </HamburgerButton>

      <Overlay $isOpen={isOpen} onClick={toggleMenu} />

      <SideMenuContainer $isOpen={isOpen}>
        <MenuHeader>
          <MenuTitle>{t('menu')}</MenuTitle>
          <CloseButton variant="ghost" onClick={toggleMenu}>
            <X size={24} />
          </CloseButton>
        </MenuHeader>

        <MenuContent>
          {menuItems.map((item) => (
            <MenuItem
              key={item.href}
              variant="ghost"
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuContent>

        <MenuFooter>
          <MenuFooterItem>
            <MenuFooterLabel>{t('theme')}</MenuFooterLabel>
            <ThemeToggle />
          </MenuFooterItem>
          <MenuFooterItem>
            <MenuFooterLabel>{t('language')}</MenuFooterLabel>
            <LanguageSelector />
          </MenuFooterItem>
          {user ? (
            <Button variant="secondary" onClick={handleSignOut}>
              {t('logout')}
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  router.push('/login');
                  setIsOpen(false);
                }}
              >
                {t('login')}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  router.push('/signup');
                  setIsOpen(false);
                }}
              >
                {t('signup')}
              </Button>
            </>
          )}
        </MenuFooter>
      </SideMenuContainer>
    </>
  );
} 