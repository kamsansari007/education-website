import type { EnquiryDraft } from './enquiryContext'

export type EnquiryField = 'fullName' | 'mobile' | 'email' | 'location' | 'consent'
export type EnquiryErrors = Partial<Record<EnquiryField, string>>

/** Digits only, with an optional leading +91 / 91 / 0 removed. */
export function normaliseMobile(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

/** Error messages state the cause and the fix (DESIGN-DIRECTION.md §13). */
export function validateField(field: EnquiryField, draft: EnquiryDraft): string | undefined {
  switch (field) {
    case 'fullName':
      return draft.fullName.trim().length < 2 ? 'Enter your full name.' : undefined
    case 'mobile': {
      const mobile = normaliseMobile(draft.mobile)
      if (!mobile) return 'Enter your mobile number.'
      return /^[6-9]\d{9}$/.test(mobile)
        ? undefined
        : 'Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9, without +91.'
    }
    case 'email': {
      const email = draft.email.trim()
      return email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? 'Enter an email address like name@example.com, or leave it blank.'
        : undefined
    }
    case 'location':
      return draft.location.trim() ? undefined : 'Enter your city or state.'
    case 'consent':
      return draft.consent ? undefined : 'Tick the box to agree to be contacted about your enquiry.'
  }
}

export const FIELD_ORDER: EnquiryField[] = ['fullName', 'mobile', 'email', 'location', 'consent']

export function validateAll(draft: EnquiryDraft): EnquiryErrors {
  const errors: EnquiryErrors = {}
  for (const field of FIELD_ORDER) {
    const message = validateField(field, draft)
    if (message) errors[field] = message
  }
  return errors
}
