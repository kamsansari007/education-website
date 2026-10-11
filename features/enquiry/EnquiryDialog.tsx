import * as Dialog from '@radix-ui/react-dialog'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, ExternalButtonLink } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { focusPageHeading } from '@/lib/focusPageHeading'
import { whatsappHref } from '@/lib/site'
import { submitEnquiry } from '@/services'
import type { EnquiryContext } from '@/types/dto'
import { EMPTY_DRAFT, type EnquiryDraft } from './enquiryContext'
import {
  FIELD_ORDER,
  normaliseMobile,
  validateAll,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
} from './validation'

type Status = 'editing' | 'pending' | 'done'

const LABEL: Record<EnquiryField, string> = {
  fullName: 'Full name',
  mobile: 'Mobile number',
  email: 'Email',
  location: 'City or state',
  consent: 'Consent',
}

/** `joined`: right half of the +91 prefix group, so no top margin or left radius. */
const inputClass = (invalid: boolean, joined = false) =>
  cn(
    'h-12 w-full border bg-surface px-3 text-base text-body placeholder:text-muted',
    joined ? 'rounded-r-control' : 'mt-1.5 rounded-control',
    invalid ? 'border-error' : 'border-rule-strong',
  )

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="type-small text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="type-small mt-1.5 flex items-start gap-1.5 text-error">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * The simulated enquiry dialog (PRD §13). Desktop: centred dialog. Phones: bottom sheet.
 * Validates on blur and on submit; with two or more errors a linked summary takes focus,
 * otherwise the invalid field does. Nothing is sent or stored.
 */
export function EnquiryDialog({
  open,
  onOpenChange,
  context,
  draft,
  setDraft,
  opener,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  context: EnquiryContext
  draft: EnquiryDraft
  setDraft: (update: (current: EnquiryDraft) => EnquiryDraft) => void
  opener: RefObject<HTMLElement | null>
}) {
  const id = useId()
  const fieldId = (field: string) => `${id}-${field}`
  const { pathname } = useLocation()
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<Status>('editing')
  const [showSummary, setShowSummary] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedInterest, setSubmittedInterest] = useState('')

  // Move focus to the confirmation when it appears.
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus()
  }, [status])

  const update = <K extends keyof EnquiryDraft>(key: K, value: EnquiryDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    // Clear a field's error as soon as it becomes valid.
    if ((FIELD_ORDER as string[]).includes(key) && errors[key as EnquiryField]) {
      const message = validateField(key as EnquiryField, { ...draft, [key]: value })
      setErrors((current) => ({ ...current, [key]: message }))
    }
  }

  const onBlur = (field: EnquiryField) => {
    setErrors((current) => ({ ...current, [field]: validateField(field, draft) }))
  }

  const describedBy = (field: string, hint = false) =>
    [
      hint ? `${fieldId(field)}-hint` : '',
      errors[field as EnquiryField] ? `${fieldId(field)}-error` : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const found = validateAll(draft)
    setErrors(found)
    const invalid = FIELD_ORDER.filter((field) => found[field])
    if (invalid.length >= 2) {
      setShowSummary(true)
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }
    setShowSummary(false)
    if (invalid.length === 1 && invalid[0]) {
      document.getElementById(fieldId(invalid[0]))?.focus()
      return
    }
    setStatus('pending')
    const interest = draft.interest.trim() || 'General guidance'
    await submitEnquiry({
      fullName: draft.fullName.trim(),
      mobile: normaliseMobile(draft.mobile),
      email: draft.email.trim() || undefined,
      location: draft.location.trim(),
      interest,
      preferredMode: draft.mode || undefined,
      message: draft.message.trim() || undefined,
      consent: true,
      context: { ...context, pagePath: pathname, submittedAt: new Date().toISOString() },
    })
    setSubmittedName(draft.fullName.trim().split(/\s+/)[0] ?? '')
    setSubmittedInterest(interest)
    setStatus('done')
  }

  const onOpenChangeInternal = (next: boolean) => {
    if (!next && status === 'pending') return
    if (!next && status === 'done') {
      // A completed demo enquiry starts fresh next time.
      setDraft(() => EMPTY_DRAFT)
      setStatus('editing')
      setErrors({})
      setShowSummary(false)
    }
    onOpenChange(next)
  }

  const invalidFields = FIELD_ORDER.filter((field) => errors[field])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChangeInternal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-body/50 data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            // Return focus to whatever opened the dialog, or the page heading if it's gone.
            event.preventDefault()
            if (opener.current?.isConnected) opener.current.focus()
            else focusPageHeading()
          }}
          className={cn(
            'fixed z-50 flex flex-col bg-surface shadow-overlay focus:outline-none',
            // Phones: bottom sheet. ≥768px: centred dialog.
            'inset-x-0 bottom-0 max-h-[92dvh] rounded-t-layer pb-[env(safe-area-inset-bottom)] data-[state=closed]:animate-sheet-out-bottom data-[state=open]:animate-sheet-in-bottom',
            'md:inset-auto md:top-1/2 md:left-1/2 md:max-h-[90dvh] md:w-[min(34rem,calc(100%-2rem))] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-layer md:pb-0 md:data-[state=closed]:animate-fade-out md:data-[state=open]:animate-fade-in',
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-rule px-5 py-4 md:px-6">
            <div>
              <Dialog.Title className="type-h2">Get guidance</Dialog.Title>
              <Dialog.Description className="type-small mt-1 text-muted">
                {status === 'done'
                  ? 'Your demo enquiry is complete.'
                  : 'Tell us a little about what you’re considering, and a counsellor can talk through your options.'}
              </Dialog.Description>
            </div>
            <Dialog.Close
              disabled={status === 'pending'}
              className="-mr-2 grid size-11 shrink-0 place-items-center rounded-control hover:bg-ink-50 disabled:opacity-50"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 md:px-6">
            {status === 'done' ? (
              <div className="pb-6">
                <CheckCircle2
                  aria-hidden="true"
                  className="size-10 text-success"
                  strokeWidth={1.75}
                />
                <h3 ref={doneRef} tabIndex={-1} className="type-h2 mt-3 focus:outline-none">
                  Enquiry complete{submittedName ? `, thanks ${submittedName}` : ''}
                </h3>
                <p className="mt-2">
                  In the live service, a counsellor would get in touch about{' '}
                  <span className="font-semibold">{submittedInterest}</span> using the details you
                  gave.
                </p>
                <p
                  role="status"
                  className="mt-5 rounded-control border border-warning bg-warning-tint p-4 font-semibold text-warning"
                >
                  This is a demo. Nothing was sent or stored.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Dialog.Close asChild>
                    <Button>Back to browsing</Button>
                  </Dialog.Close>
                  <ExternalButtonLink
                    href={whatsappHref(`Hello, I would like guidance about ${submittedInterest}.`)}
                    variant="tertiary"
                  >
                    Chat on WhatsApp
                  </ExternalButtonLink>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-5">
                {showSummary && invalidFields.length >= 2 && (
                  <div
                    ref={summaryRef}
                    tabIndex={-1}
                    role="alert"
                    aria-labelledby={`${id}-summary-title`}
                    className="rounded-control border border-error bg-error-tint p-4 focus:outline-2 focus:outline-offset-2 focus:outline-error"
                  >
                    <p id={`${id}-summary-title`} className="font-semibold text-error">
                      Please fix {invalidFields.length} things before sending:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {invalidFields.map((field) => (
                        <li key={field}>
                          <a href={`#${fieldId(field)}`} className="text-error underline">
                            {LABEL[field]}: {errors[field]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Field id={fieldId('fullName')} label="Full name" error={errors.fullName}>
                  <input
                    id={fieldId('fullName')}
                    name="name"
                    autoComplete="name"
                    value={draft.fullName}
                    onChange={(event) => update('fullName', event.target.value)}
                    onBlur={() => onBlur('fullName')}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={describedBy('fullName')}
                    className={inputClass(Boolean(errors.fullName))}
                  />
                </Field>

                <Field
                  id={fieldId('mobile')}
                  label="Mobile number"
                  hint="10 digits. We’ll add +91."
                  error={errors.mobile}
                >
                  <div className="mt-1.5 flex">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-12 items-center rounded-l-control border border-r-0 border-rule-strong bg-paper px-3 text-muted"
                    >
                      +91
                    </span>
                    <input
                      id={fieldId('mobile')}
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={draft.mobile}
                      onChange={(event) => update('mobile', event.target.value)}
                      onBlur={() => onBlur('mobile')}
                      aria-invalid={Boolean(errors.mobile)}
                      aria-describedby={describedBy('mobile', true)}
                      className={inputClass(Boolean(errors.mobile), true)}
                    />
                  </div>
                </Field>

                <Field id={fieldId('email')} label="Email" optional error={errors.email}>
                  <input
                    id={fieldId('email')}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={draft.email}
                    onChange={(event) => update('email', event.target.value)}
                    onBlur={() => onBlur('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                    className={inputClass(Boolean(errors.email))}
                  />
                </Field>

                <Field id={fieldId('location')} label="City or state" error={errors.location}>
                  <input
                    id={fieldId('location')}
                    name="location"
                    autoComplete="address-level2"
                    value={draft.location}
                    onChange={(event) => update('location', event.target.value)}
                    onBlur={() => onBlur('location')}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={describedBy('location')}
                    className={inputClass(Boolean(errors.location))}
                  />
                </Field>

                <Field
                  id={fieldId('interest')}
                  label="Interested in"
                  optional
                  hint="Filled in from the page you were on. Change it if you like."
                >
                  <input
                    id={fieldId('interest')}
                    name="interest"
                    value={draft.interest}
                    onChange={(event) => update('interest', event.target.value)}
                    aria-describedby={`${fieldId('interest')}-hint`}
                    placeholder="A course, a university or a college"
                    className={inputClass(false)}
                  />
                </Field>

                <Field id={fieldId('mode')} label="Preferred study mode" optional>
                  <select
                    id={fieldId('mode')}
                    value={draft.mode}
                    onChange={(event) => update('mode', event.target.value as EnquiryDraft['mode'])}
                    className={inputClass(false)}
                  >
                    <option value="">Choose a mode</option>
                    <option value="regular">Regular (on campus)</option>
                    <option value="online">Online</option>
                    <option value="distance">Distance</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </Field>

                <Field id={fieldId('message')} label="Message" optional>
                  <textarea
                    id={fieldId('message')}
                    rows={3}
                    value={draft.message}
                    onChange={(event) => update('message', event.target.value)}
                    className={cn(inputClass(false), 'h-auto py-2.5')}
                  />
                </Field>

                <div>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3">
                    <input
                      id={fieldId('consent')}
                      type="checkbox"
                      checked={draft.consent}
                      onChange={(event) => update('consent', event.target.checked)}
                      onBlur={() => onBlur('consent')}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={describedBy('consent')}
                      className="mt-0.5 size-5 shrink-0 accent-ink"
                    />
                    <span>
                      I agree to be contacted about my enquiry by phone, WhatsApp, SMS or email. See
                      the{' '}
                      <Dialog.Close asChild>
                        <Link to="/privacy" className="text-ink underline">
                          privacy notice
                        </Link>
                      </Dialog.Close>
                      .
                    </span>
                  </label>
                  {errors.consent && (
                    <p
                      id={`${fieldId('consent')}-error`}
                      className="type-small mt-1.5 flex items-start gap-1.5 text-error"
                    >
                      <AlertCircle
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0"
                        strokeWidth={2}
                      />
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="sticky bottom-0 -mx-5 border-t border-rule bg-surface px-5 pt-4 pb-5 md:static md:mx-0 md:border-0 md:px-0 md:pb-6">
                  <Button
                    type="submit"
                    fullWidth
                    disabled={status === 'pending'}
                    aria-disabled={status === 'pending'}
                  >
                    {status === 'pending' ? 'Sending…' : 'Send enquiry'}
                  </Button>
                  <p role="status" className="sr-only">
                    {status === 'pending' ? 'Sending your enquiry' : ''}
                  </p>
                  <p className="type-caption mt-2 text-center">
                    This is a demo. Nothing is sent or stored.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
