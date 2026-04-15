import React from 'react'
import { SelectOption } from './Select'

export interface SelectMenuProps {
  isOpen: boolean
  options: SelectOption[]
  filteredOptions: SelectOption[]
  currentValue: string | string[]
  groupBy?: string
  onSelect: (value: string) => void
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  isOpen,
  filteredOptions,
  currentValue,
  groupBy,
  onSelect,
}) => {
  if (!isOpen) return null

  const renderOption = (option: SelectOption) => {
    const isSelected = Array.isArray(currentValue)
      ? currentValue.includes(option.value)
      : currentValue === option.value
    const optionClass = `select-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`

    return (
      <div
        key={option.value}
        className={optionClass}
        onClick={() => !option.disabled && onSelect(option.value)}
        role="option"
        aria-selected={isSelected}
        aria-disabled={option.disabled}
      >
        {option.icon && <span className="select-option-icon">{option.icon}</span>}
        <span className="select-option-label">{option.label}</span>
        {isSelected && (
          <span className="select-option-checkmark">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10L10 13L17 6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        )}
      </div>
    )
  }

  const groupedOptions = groupBy
    ? filteredOptions.reduce(
        (groups, option) => {
          const group = option.group || 'Ungrouped'
          if (!groups[group]) groups[group] = []
          groups[group].push(option)
          return groups
        },
        {} as Record<string, SelectOption[]>
      )
    : null

  return (
    <div className="select-menu">
      {groupedOptions
        ? Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
            <div key={groupName} className="select-group">
              <div className="select-group-label">{groupName}</div>
              <div className="select-group-options">
                {groupOptions.map((option) => renderOption(option))}
              </div>
            </div>
          ))
        : filteredOptions.map((option) => renderOption(option))}
      {filteredOptions.length === 0 && <div className="select-no-options">No options found</div>}
    </div>
  )
}
