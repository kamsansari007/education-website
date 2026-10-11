import type { EnquiryPayload, EnquiryResult } from '@/types/dto'

/**
 * Phase 1: simulated. Nothing is sent or stored, and there is no network request (PRD §13.3).
 * The short delay stands in for a real request so the UI shows its pending state.
 * Phase 2 replaces this with `POST /api/enquiries` behind the same signature.
 */
export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  void payload
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { status: 'simulated' }
}
