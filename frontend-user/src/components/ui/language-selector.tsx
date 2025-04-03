'use client';

import { useLocale } from 'next-intl';
import { Button } from '@/components/styled/Button';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from '@/lib/i18n';
import styled from 'styled-components';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'sv', name: 'Svenska' },
];

const LanguageSelectorContainer = styled.div`
  position: relative;
  &:hover {
    .language-dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const LanguageButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LanguageIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
`;

const LanguageName = styled.span`
  font-size: 0.875rem;
`;

const LanguageDropdown = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
  width: 12rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
`;

const LanguageList = styled.div`
  padding: 0.25rem 0;
`;

const LanguageOption = styled.button<{ $active: boolean }>`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ $active, theme }) => $active ? `${theme.colors.text.secondary}11` : 'transparent'};
  &:hover {
    background-color: ${({ theme }) => `${theme.colors.text.secondary}11`};
  }
`;

export function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  const changeLanguage = (newLocale: string) => {
    Cookies.set('NEXT_LOCALE', newLocale, { expires: 365 });
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <LanguageSelectorContainer>
      <LanguageButton variant="ghost">
        <LanguageIcon
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </LanguageIcon>
        <LanguageName>
          {languages.find(lang => lang.code === locale)?.name}
        </LanguageName>
      </LanguageButton>
      <LanguageDropdown className="language-dropdown">
        <LanguageList role="menu">
          {languages.map((lang) => (
            <LanguageOption
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              $active={locale === lang.code}
              role="menuitem"
            >
              {lang.name}
            </LanguageOption>
          ))}
        </LanguageList>
      </LanguageDropdown>
    </LanguageSelectorContainer>
  );
} 