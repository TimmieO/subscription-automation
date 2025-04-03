import * as React from 'react';
import styled from 'styled-components';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input<InputProps>`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}33;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease-in-out;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}, 0 0 0 4px ${({ theme }) => theme.colors.primary}33;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &[type="file"] {
    border: none;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    return (
      <StyledInput
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input }; 