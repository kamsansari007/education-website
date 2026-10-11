import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { buttonClasses, type ButtonStyleOptions } from './buttonStyles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, fullWidth, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
})

type ButtonLinkProps = LinkProps & ButtonStyleOptions

/** Internal navigation styled as a button. Targets must be app routes, never user input. */
export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses({ variant, size, fullWidth }), className)} {...props} />
}

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonStyleOptions & { href: string }

/** External link (e.g. WhatsApp) that opens in a new tab and says so to screen readers. */
export function ExternalButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonClasses({ variant, size, fullWidth }), className)}
      {...props}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
