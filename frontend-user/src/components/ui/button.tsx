"use client";

import React from 'react';
import styled, { DefaultTheme } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const getVariantStyles = (variant: ButtonVariant, theme: DefaultTheme) => {
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
    case 'outline':
      return `
        background-color: transparent;
        border: 1px solid ${theme.colors.primary};
        color: ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.primary}11;
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
    case 'link':
      return `
        background-color: transparent;
        color: ${theme.colors.primary};
        padding: 0;
        &:hover {
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return `
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'md':
      return `
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      `;
    case 'lg':
      return `
        padding: 1rem 2rem;
        font-size: 1.125rem;
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant = 'primary', theme }) => getVariantStyles(variant, theme)}
  ${({ size = 'md' }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button'; 