import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/styled/Button';
import styled from 'styled-components';

const navigation = [
  { name: 'Scripts', href: '/scripts' },
  { name: 'Executions', href: '/executions' },
  { name: 'Profile', href: '/profile' },
];

const Nav = styled.nav`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text.secondary}33;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const NavMenu = styled.div`
  display: none;
  gap: 1rem;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  color: ${({ $active, theme }) => $active ? 'white' : `${theme.colors.primary}dd`};
  &:hover {
    color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

const UserInfo = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary}dd;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const LoginButton = styled(Button)`
  color: white;
`;

const RegisterButton = styled(Button)`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
`;

export function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Nav>
      <Container>
        <NavLinks>
          <Logo href="/">
            Automation Platform
          </Logo>
          <NavMenu>
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                $active={pathname === item.href}
              >
                {item.name}
              </NavLink>
            ))}
          </NavMenu>
        </NavLinks>

        <AuthButtons>
          {user ? (
            <>
              <UserInfo>
                {user.firstName} {user.lastName}
              </UserInfo>
              <LogoutButton variant="secondary" onClick={() => logout()}>
                Logout
              </LogoutButton>
            </>
          ) : (
            <>
              <Link href="/login">
                <LoginButton variant="ghost">Login</LoginButton>
              </Link>
              <Link href="/register">
                <RegisterButton>Register</RegisterButton>
              </Link>
            </>
          )}
        </AuthButtons>
      </Container>
    </Nav>
  );
} 