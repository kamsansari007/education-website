import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import type { ButtonSize, ButtonVariant } from '@/components/ui/buttonStyles'
import type { EnquiryContext } from '@/types/dto'
import { useEnquiry } from './enquiryContext'

/** The one "Get guidance" control: opens the shared enquiry dialog with this page's context. */
export function GuidanceButton({
  context,
  variant,
  size,
  fullWidth,
  className,
  onBeforeOpen,
  children = 'Get guidance',
}: {
  context?: EnquiryContext
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  /** E.g. close the mobile menu first. */
  onBeforeOpen?: () => void
  children?: ReactNode
}) {
  const enquiry = useEnquiry()
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.()
        enquiry.open(context)
      }}
    >
      {children}
    </Button>
  )
}
