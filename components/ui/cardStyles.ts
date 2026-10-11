/**
 * Invite-register card (DESIGN-DIRECTION.md §7): white, hairline ring, large radius, no resting
 * shadow. The card's single link is stretched over the whole card with `stretchedLink`, and
 * the card shows the focus ring when that link is keyboard-focused.
 */
export const cardClass =
  'relative flex min-w-0 flex-col rounded-card bg-surface shadow-[0_0_0_1px_var(--color-rule)] transition-[box-shadow,translate] duration-200 hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--color-body)] has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ink'

export const cardPadding = 'p-6'

export const stretchedLink =
  'text-body after:absolute after:inset-0 after:rounded-card after:content-[""] focus-visible:outline-none'
