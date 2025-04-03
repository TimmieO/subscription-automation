import styled from 'styled-components';

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'ghost' }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  
  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          &:hover {
            background-color: ${theme.colors.primary}dd;
          }
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;
          &:hover {
            background-color: ${theme.colors.secondary}dd;
          }
        `;
      case 'danger':
        return `
          background-color: ${theme.colors.error};
          color: white;
          &:hover {
            background-color: ${theme.colors.error}dd;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.text.primary};
          &:hover {
            background-color: ${theme.colors.text.secondary}11;
          }
        `;
    }
  }}
`; 