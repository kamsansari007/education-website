import { createContext, useContext } from 'react'
import type { EnquiryContext } from '@/types/dto'

export interface EnquiryApi {
  /** Opens the shared enquiry dialog, prefilled from the initiating page or entity. */
  open: (context?: EnquiryContext) => void
}

export const EnquiryApiContext = createContext<EnquiryApi | null>(null)

export function useEnquiry(): EnquiryApi {
  const value = useContext(EnquiryApiContext)
  if (!value) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return value
}

export interface EnquiryDraft {
  fullName: string
  mobile: string
  email: string
  location: string
  interest: string
  mode: '' | 'regular' | 'online' | 'distance' | 'not-sure'
  message: string
  consent: boolean
}

export const EMPTY_DRAFT: EnquiryDraft = {
  fullName: '',
  mobile: '',
  email: '',
  location: '',
  interest: '',
  mode: '',
  message: '',
  consent: false,
}
