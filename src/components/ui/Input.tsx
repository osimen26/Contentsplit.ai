import React, { useState } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'filled' | 'outlined' | 'standard'
  label?: string
  supportingText?: string
  error?: boolean
  required?: boolean
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
  fullWidth?: boolean
  characterLimit?: number
  type?: 'text' | 'password' | 'email' | 'search' | 'tel' | 'url' | 'date'
  containerClassName?: string
}

export const Input: React.FC<InputProps> = ({
  variant = 'filled',
  id,
  label,
  supportingText,
  error = false,
  required = false,
  iconLeading,
  iconTrailing,
  fullWidth = true,
  characterLimit,
  type = 'text',
  containerClassName = '',
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')
  const generatedId = React.useId()
  const inputId = id || generatedId
  const currentValue = value !== undefined ? value : internalValue

  const baseClass = `input-${variant}`
  const errorClass = error ? 'error' : ''
  const disabledClass = props.disabled ? 'disabled' : ''
  const searchClass = type === 'search' ? 'search' : ''
  const datePickerClass = type === 'date' ? 'date-picker' : ''
  const selectClass = ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onChange) onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const currentLength = typeof currentValue === 'string' ? currentValue.length : 0
  const characterCounter = characterLimit ? (
    <div className={`character-counter ${currentLength > characterLimit ? 'error' : ''}`}>
      {currentLength}/{characterLimit}
    </div>
  ) : null

  const inputElement = (
    <>
      {iconLeading && <span className="input-icon-leading">{iconLeading}</span>}
      <input
        id={inputId}
        type={type}
        className={[
          baseClass,
          errorClass,
          disabledClass,
          searchClass,
          datePickerClass,
          selectClass,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        {...props}
      />
      {iconTrailing && <span className="input-icon-trailing">{iconTrailing}</span>}
      {label && (
        <label
          htmlFor={inputId}
          className={[
            'input-label',
            isFocused || currentValue ? 'floating' : '',
            error ? 'error' : '',
            required ? 'required' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>
      )}
      {supportingText && (
        <div className={`input-supporting-text ${error ? 'error' : ''}`}>{supportingText}</div>
      )}
      {characterCounter}
    </>
  )

  if (fullWidth || label || iconLeading || iconTrailing) {
    return <div className={`input-container ${containerClassName}`}>{inputElement}</div>
  }

  return inputElement
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'filled' | 'outlined' | 'standard'
  id?: string
  label?: string
  supportingText?: string
  error?: boolean
  required?: boolean
  fullWidth?: boolean
  characterLimit?: number
  rows?: number
  containerClassName?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  variant = 'filled',
  id,
  label,
  supportingText,
  error = false,
  required = false,
  fullWidth = true,
  characterLimit,
  containerClassName = '',
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  rows = 4,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState(value || '')
  const generatedId = React.useId()
  const textareaId = id || generatedId
  const currentValue = value !== undefined ? value : internalValue

  const baseClass = `input-${variant} textarea`
  const errorClass = error ? 'error' : ''
  const disabledClass = props.disabled ? 'disabled' : ''

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (value === undefined) {
      setInternalValue(newValue)
    }
    if (onChange) onChange(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    if (onFocus) onFocus(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const currentLength = typeof currentValue === 'string' ? currentValue.length : 0
  const characterCounter = characterLimit ? (
    <div className={`character-counter ${currentLength > characterLimit ? 'error' : ''}`}>
      {currentLength}/{characterLimit}
    </div>
  ) : null

  const textareaElement = (
    <>
      <textarea
        id={textareaId}
        className={[baseClass, errorClass, disabledClass, className].filter(Boolean).join(' ')}
        value={currentValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        rows={rows}
        {...props}
      />
      {label && (
        <label
          htmlFor={textareaId}
          className={[
            'input-label',
            isFocused || currentValue ? 'floating' : '',
            error ? 'error' : '',
            required ? 'required' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>
      )}
      {supportingText && (
        <div className={`input-supporting-text ${error ? 'error' : ''}`}>{supportingText}</div>
      )}
      {characterCounter}
    </>
  )

  if (fullWidth || label) {
    return <div className={`input-container ${containerClassName}`}>{textareaElement}</div>
  }

  return textareaElement
}
