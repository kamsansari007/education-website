import { cn } from '@/lib/cn'

/** `inverse` is the primary action on the deep-ink band: white fill, ink text. */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'inverse'
export type ButtonSize = 'md' | 'sm'

export interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'rounded-control bg-ink px-5 text-white hover:bg-ink-700 active:bg-ink-700',
  secondary:
    'rounded-control border-[1.5px] border-ink bg-surface px-5 text-ink hover:bg-ink-50 active:bg-ink-100',
  tertiary: 'px-1 text-ink underline decoration-transparent hover:decoration-current',
  inverse: 'rounded-control bg-white px-5 text-ink hover:bg-ink-50 active:bg-ink-100',
}

const SIZE: Record<ButtonSize, string> = {
  md: 'min-h-12',
  sm: 'min-h-11',
}

/** Three levels of action: primary (one per view), secondary, tertiary (text link). */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
}: ButtonStyleOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 text-base font-semibold leading-tight transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT[variant],
    SIZE[size],
    fullWidth && 'w-full',
  )
}
