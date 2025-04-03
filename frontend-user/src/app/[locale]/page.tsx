"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from '@/lib/i18n';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled(Card)`
  padding: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CTASection = styled.section`
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const CTADescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const t = useTranslations('home');

  // If user is logged in, redirect to dashboard
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <Container>
      <HeroSection>
        <Title>
          {t('hero.title')} <span>{t('hero.titleHighlight')}</span>
        </Title>
        <Description>
          {t('hero.description')}
        </Description>
        <ButtonGroup>
          <Link href="/register">
            <Button>{t('hero.getStarted')}</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline">{t('hero.viewScripts')}</Button>
          </Link>
        </ButtonGroup>
      </HeroSection>

      <FeaturesSection>
        <FeatureCard>
          <FeatureTitle>{t('features.easyToUse.title')}</FeatureTitle>
          <FeatureDescription>
            {t('features.easyToUse.description')}
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>{t('features.secure.title')}</FeatureTitle>
          <FeatureDescription>
            {t('features.secure.description')}
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureTitle>{t('features.flexible.title')}</FeatureTitle>
          <FeatureDescription>
            {t('features.flexible.description')}
          </FeatureDescription>
        </FeatureCard>
      </FeaturesSection>

      <CTASection>
        <CTATitle>{t('cta.title')}</CTATitle>
        <CTADescription>{t('cta.description')}</CTADescription>
        <Link href="/register">
          <Button size="lg">{t('cta.button')}</Button>
        </Link>
      </CTASection>
    </Container>
  );
} 