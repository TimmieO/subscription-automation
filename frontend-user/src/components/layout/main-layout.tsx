'use client';

import { SideMenu } from './side-menu';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  padding-top: 4rem;
`;

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer>
      <SideMenu />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
} 