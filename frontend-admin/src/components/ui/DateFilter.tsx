import React from 'react';
import styled from 'styled-components';

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onPresetSelect: (days: number) => void;
}

const presets = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
];

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`;

const DateInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DateInput = styled.input`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.text.secondary}33;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary};
  }
`;

const PresetsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PresetsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PresetButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.text.secondary}11;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.text.secondary}22;
  }
`;

export default function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onPresetSelect,
}: DateFilterProps) {
  return (
    <FilterContainer>
      <DateInputGroup>
        <Label htmlFor="startDate">From:</Label>
        <DateInput
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </DateInputGroup>
      <DateInputGroup>
        <Label htmlFor="endDate">To:</Label>
        <DateInput
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </DateInputGroup>
      <PresetsGroup>
        <Label>Presets:</Label>
        <PresetsContainer>
          {presets.map((preset) => (
            <PresetButton
              key={preset.days}
              onClick={() => onPresetSelect(preset.days)}
            >
              {preset.label}
            </PresetButton>
          ))}
        </PresetsContainer>
      </PresetsGroup>
    </FilterContainer>
  );
} 