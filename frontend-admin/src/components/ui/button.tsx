import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const getVariantStyles = (variant: string = 'primary') => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary}dd;
        }
      `;
    case 'secondary':
      return `
        background-color: ${({ theme }) => theme.colors.secondary};
        color: white;
        &:hover {
          background-color: ${({ theme }) => theme.colors.secondary}dd;
        }
      `;
    case 'outline':
      return `
        background-color: transparent;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.primary};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary}11;
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: string = 'md') => {
  switch (size) {
    case 'sm':
      return `
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      `;
    case 'lg':
      return `
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
      `;
    default:
      return `
        padding: 0.625rem 1.25rem;
        font-size: 1rem;
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  ${({ variant }) => getVariantStyles(variant)}
  ${({ size }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

export function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return <StyledButton variant={variant} size={size} {...props} />;
} 