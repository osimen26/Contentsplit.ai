import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  group?: string
}

export interface SelectProps {
  variant?: 'filled' | 'outlined' | 'autocomplete' | 'multi'
  label?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  error?: boolean
  disabled?: boolean
  required?: boolean
  helperText?: string
  errorMessage?: string
  loading?: boolean
  fullWidth?: boolean
  className?: string
  containerClassName?: string
  allowClear?: boolean
  searchable?: boolean
  groupBy?: string
  id?: string
}

export const Select: React.FC<SelectProps> = ({
  variant = 'filled',
  label,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error = false,
  disabled = false,
  required = false,
  helperText,
  errorMessage,
  loading = false,
  fullWidth = true,
  className = '',
  containerClassName = '',
  allowClear = false,
  searchable = false,
  groupBy,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [internalValue, setInternalValue] = useState<string | string[]>(
    value || (variant === 'multi' ? [] : '')
  )
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const generatedId = React.useId()
  const selectId = id || generatedId

  const currentValue = value !== undefined ? value : internalValue

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (value !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInternalValue(value)
    }
  }, [value])

  const filteredOptions = searchQuery
    ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : options

  const selectedOption = Array.isArray(currentValue)
    ? options.filter((opt) => currentValue.includes(opt.value))
    : options.find((opt) => opt.value === currentValue)

  const handleSelect = (optionValue: string) => {
    if (disabled || loading) return

    let newValue: string | string[]
    if (variant === 'multi') {
      const currentArray = Array.isArray(currentValue) ? currentValue : []
      if (currentArray.includes(optionValue)) {
        newValue = currentArray.filter((v) => v !== optionValue)
      } else {
        newValue = [...currentArray, optionValue]
      }
    } else {
      newValue = optionValue
      setIsOpen(false)
      setSearchQuery('')
    }

    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newValue = variant === 'multi' ? [] : ''
    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleTriggerClick = () => {
    if (disabled || loading) return
    setIsOpen(!isOpen)
    if (searchable && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const renderTrigger = () => {
    const baseClass = `select-${variant}`
    const triggerClass = `${baseClass}-trigger`
    const errorClass = error ? 'error' : ''
    const disabledClass = disabled ? 'disabled' : ''
    const loadingClass = loading ? 'loading' : ''

    if (variant === 'autocomplete') {
      return (
        <div className={`${triggerClass} ${errorClass} ${disabledClass} ${loadingClass}`}>
          <input
            ref={inputRef}
            type="text"
            className="select-autocomplete-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            disabled={disabled}
            aria-label={label}
            aria-describedby={helperText ? `${selectId}-helper` : undefined}
          />
        </div>
      )
    }

    if (variant === 'multi') {
      const selectedValues = Array.isArray(currentValue) ? currentValue : []
      const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value))
      return (
        <div
          className={`${triggerClass} ${errorClass} ${disabledClass} ${loadingClass}`}
          onClick={handleTriggerClick}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-label={label}
          aria-describedby={helperText ? `${selectId}-helper` : undefined}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span key={opt.value} className="select-multi-chip">
                {opt.label}
                <button
                  type="button"
                  className="select-multi-chip-remove"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelect(opt.value)
                  }}
                  aria-label={`Remove ${opt.label}`}
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="select-multi-placeholder">{placeholder}</span>
          )}
        </div>
      )
    }

    // Filled or outlined
    return (
      <div
        className={`${triggerClass} ${errorClass} ${disabledClass} ${loadingClass}`}
        onClick={handleTriggerClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-label={label}
        aria-describedby={helperText ? `${selectId}-helper` : undefined}
      >
        <span className={`${baseClass}-value`}>
          {selectedOption && !Array.isArray(selectedOption) ? selectedOption.label : placeholder}
        </span>
        <div className={`${baseClass}-arrow`}>
          {loading ? (
            <div className="select-loading-spinner" />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
            </svg>
          )}
        </div>
        {allowClear && selectedOption && !Array.isArray(selectedOption) && (
          <button
            type="button"
            className="select-clear"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            ×
          </button>
        )}
      </div>
    )
  }

  const renderMenu = () => {
    if (!isOpen) return null

    const menuClass = 'select-menu'
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
      <div className={menuClass}>
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

  const renderOption = (option: SelectOption) => {
    const isSelected = Array.isArray(currentValue)
      ? currentValue.includes(option.value)
      : currentValue === option.value
    const optionClass = `select-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}`

    return (
      <div
        key={option.value}
        className={optionClass}
        onClick={() => !option.disabled && handleSelect(option.value)}
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

  const containerClass = `select-${variant} ${fullWidth ? 'layout-full-width' : ''} ${isOpen ? 'open' : ''} ${containerClassName}`
  const errorClass = error ? 'error' : ''
  const disabledClass = disabled ? 'disabled' : ''

  return (
    <div
      ref={selectRef}
      className={`${containerClass} ${errorClass} ${disabledClass} ${className}`}
      id={selectId}
    >
      {label && (
        <label className={`select-${variant}-label`} htmlFor={selectId}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      {renderTrigger()}
      {renderMenu()}
      {helperText && !error && (
        <div className="select-helper" id={`${selectId}-helper`}>
          {helperText}
        </div>
      )}
      {error && errorMessage && (
        <div className="select-error-message" id={`${selectId}-error`}>
          {errorMessage}
        </div>
      )}
    </div>
  )
}
