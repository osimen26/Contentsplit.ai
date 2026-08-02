import React from 'react'
import { cn } from '@utils/cn'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  title?: string
  icon?: React.ReactNode
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(({
  className,
  variant = 'default',
  title,
  icon,
  children,
  ...props
}, ref) => {
  const variants = {
    default: "bg-surface-secondary text-ink-950 border-border",
    destructive: "bg-red-50 text-red-900 border-red-200 dark:bg-red-900/10 dark:text-red-500 dark:border-red-900/50",
    success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-900/10 dark:text-green-500 dark:border-green-900/50",
    warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-900/10 dark:text-amber-500 dark:border-amber-900/50",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-ink-950",
        variants[variant],
        className
      )}
      {...props}
    >
      {icon}
      {title && (
        <h5 className="mb-1 font-medium leading-none tracking-tight">
          {title}
        </h5>
      )}
      <div className="text-sm [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
})
Alert.displayName = "Alert"
