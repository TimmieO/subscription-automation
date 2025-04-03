import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styled from "styled-components";

const Tabs = TabsPrimitive.Root;

const TabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.text.secondary}11;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.25rem;
`;

const TabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.text.secondary};
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}, 0 0 0 4px ${({ theme }) => theme.colors.primary}33;
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  &[data-state="active"] {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text.primary};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const TabsContent = styled(TabsPrimitive.Content)`
  margin-top: 0.5rem;
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}, 0 0 0 4px ${({ theme }) => theme.colors.primary}33;
  }
`;

export { Tabs, TabsList, TabsTrigger, TabsContent }; 