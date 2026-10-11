import { FileText, ListChecks, Phone, type LucideIcon } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ExternalButtonLink } from '@/components/ui/Button'
import { GuidanceButton } from '@/features/enquiry/GuidanceButton'
import { whatsappHref } from '@/lib/site'

const STOPS: { title: string; text: string; glyph: LucideIcon }[] = [
  {
    title: 'Tell us what you’re considering',
    text: 'The course, budget and location you have in mind. A rough idea is enough.',
    glyph: FileText,
  },
  {
    title: 'A counsellor calls you',
    text: 'They talk through your options, eligibility and fees, and answer your questions.',
    glyph: Phone,
  },
  {
    title: 'You get a shortlist',
    text: 'Options that fit your goals, with the facts you need to compare them.',
    glyph: ListChecks,
  },
]

/**
 * Q: "Can someone help me?" Three stops on a dashed route (a real sequence), on coral paper
 * because guidance is about people. One calm CTA; the WhatsApp link is secondary.
 */
export function GuidanceSection() {
  return (
    <Section labelledBy="guidance-title" tone="surface" spacing="feature">
      <SectionHeading
        id="guidance-title"
        size="section"
        title="Talk it through with a counsellor"
        description="If you’d rather not decide alone, three stops is all it takes."
      />
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-8 right-[10%] left-[6%] hidden border-t-[3px] border-dashed border-ink-900/35 md:block"
        />
        <ol className="relative grid gap-5 md:grid-cols-[repeat(3,minmax(0,1fr))] md:gap-8">
          {STOPS.map((stop, index) => {
            const Glyph = stop.glyph
            return (
              <li key={stop.title} className="min-w-0 rounded-card bg-paper-coral p-6">
                <div className="flex items-center justify-between">
                  <span
                    aria-hidden="true"
                    className="text-5xl leading-none font-bold tabular-nums [font-stretch:75%]"
                  >
                    {index + 1}
                  </span>
                  <Glyph aria-hidden="true" className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-xl leading-tight font-bold [font-stretch:112.5%]">
                  <span className="sr-only">Step {index + 1}: </span>
                  {stop.title}
                </h3>
                <p className="mt-1">{stop.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
        <GuidanceButton context={{ source: { type: 'general' } }} />
        <ExternalButtonLink
          href={whatsappHref('Hello, I would like guidance on choosing a course.')}
          variant="tertiary"
        >
          Chat on WhatsApp
        </ExternalButtonLink>
        <span className="type-small text-muted sm:ml-auto">
          This is a demo. Guidance requests are not sent or stored.
        </span>
      </div>
    </Section>
  )
}
