import React from 'react'
import { cn } from '@utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  className,
  interactive,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-white text-ink-950 shadow-sm overflow-hidden",
        interactive && "transition-all duration-250 ease-out hover:shadow-md cursor-pointer hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Card.displayName = "Card"

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

export const CardHeadline = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({
  className,
  ...props
}, ref) => (
  <h3 ref={ref} className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props} />
))
CardHeadline.displayName = "CardHeadline"

export const CardSubhead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => (
  <p ref={ref} className={cn("text-sm text-text-secondary", className)} {...props} />
))
CardSubhead.displayName = "CardSubhead"

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

// Keeping old sub-component names for backwards compatibility if they are used elsewhere
export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { imageUrl?: string; imageAlt?: string }>(({
  className,
  imageUrl,
  imageAlt,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cn("relative w-full overflow-hidden", className)} {...props}>
    {imageUrl && <img src={imageUrl} alt={imageAlt || ''} className="w-full h-auto object-cover" />}
    {children && <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">{children}</div>}
  </div>
))
CardMedia.displayName = "CardMedia"

export const CardSupportingText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({
  className,
  ...props
}, ref) => (
  <p ref={ref} className={cn("text-base text-text-secondary p-6 pt-0", className)} {...props} />
))
CardSupportingText.displayName = "CardSupportingText"

export const CardActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { alignment?: 'start' | 'end' | 'between' }>(({
  className,
  alignment = 'end',
  ...props
}, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0 gap-2", 
    alignment === 'start' && "justify-start",
    alignment === 'end' && "justify-end",
    alignment === 'between' && "justify-between w-full",
  className)} {...props} />
))
CardActions.displayName = "CardActions"

