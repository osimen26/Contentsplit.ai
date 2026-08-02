import React from 'react'
import { cn } from '@utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  supportingText?: string
  error?: boolean
  iconLeading?: React.ReactNode
  iconTrailing?: React.ReactNode
  fullWidth?: boolean
  containerClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  supportingText,
  error = false,
  required = false,
  iconLeading,
  iconTrailing,
  fullWidth = true,
  containerClassName,
  className,
  type = 'text',
  ...props
}, ref) => {
  const generatedId = React.useId()
  const inputId = id || generatedId

  const inputElement = (
    <div className="relative flex items-center">
      {iconLeading && (
        <span className="absolute left-3 text-ink-800 shrink-0 flex items-center justify-center pointer-events-none">
          {iconLeading}
        </span>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        className={cn(
          "flex h-12 w-full rounded-md border bg-white px-4 text-base transition-colors",
          "border-border text-ink-950 placeholder:text-text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:ring-red-500",
          iconLeading && "pl-10",
          iconTrailing && "pr-10",
          className
        )}
        {...props}
      />
      {iconTrailing && (
        <span className="absolute right-3 text-ink-800 shrink-0 flex items-center justify-center">
          {iconTrailing}
        </span>
      )}
    </div>
  )

  if (label || supportingText) {
    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink-950">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {inputElement}
        {supportingText && (
          <p className={cn("text-xs", error ? "text-red-500" : "text-text-secondary")}>
            {supportingText}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn(fullWidth && "w-full", containerClassName)}>
      {inputElement}
    </div>
  )
})

Input.displayName = 'Input'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  supportingText?: string
  error?: boolean
  fullWidth?: boolean
  containerClassName?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  id,
  label,
  supportingText,
  error = false,
  required = false,
  fullWidth = true,
  containerClassName,
  className,
  rows = 4,
  ...props
}, ref) => {
  const generatedId = React.useId()
  const textareaId = id || generatedId

  const textareaElement = (
    <textarea
      ref={ref}
      id={textareaId}
      required={required}
      rows={rows}
      className={cn(
        "flex w-full rounded-md border bg-white px-4 py-3 text-base transition-colors resize-y",
        "border-border text-ink-950 placeholder:text-text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-500 focus-visible:ring-red-500",
        className
      )}
      {...props}
    />
  )

  if (label || supportingText) {
    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full", containerClassName)}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-ink-950">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        {textareaElement}
        {supportingText && (
          <p className={cn("text-xs", error ? "text-red-500" : "text-text-secondary")}>
            {supportingText}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn(fullWidth && "w-full", containerClassName)}>
      {textareaElement}
    </div>
  )
})

TextArea.displayName = 'TextArea'

