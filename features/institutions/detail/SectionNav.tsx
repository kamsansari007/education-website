import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useHideOnScroll } from '@/components/layout/useHideOnScroll'
import { cn } from '@/lib/cn'

export interface NavSection {
  id: string
  label: string
}

/**
 * Sticky "on this page" links (DESIGN-DIRECTION.md §10). Scrolls horizontally on phones.
 * Marks the section being read and publishes its height for scroll padding.
 */
export function SectionNav({
  sections,
  className,
}: {
  sections: NavSection[]
  className?: string
}) {
  const headerHidden = useHideOnScroll()
  const [active, setActive] = useState(sections[0]?.id)
  // Pages rebuild their section arrays each render; subscribe once per set of ids.
  const idList = sections.map((section) => section.id).join(',')
  const navRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const root = document.documentElement.style
    const element = navRef.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const height = Math.ceil(entry?.borderBoxSize[0]?.blockSize ?? element.offsetHeight)
      root.setProperty('--section-nav-height', `${height}px`)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      root.removeProperty('--section-nav-height')
    }
  }, [])

  useEffect(() => {
    // A section is "current" once its top passes the upper third of the viewport; at the
    // very bottom of the page the last section is, even if it can't reach that line.
    const targets = idList
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const line = window.innerHeight / 3
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        let current = targets[0]?.id
        for (const target of targets) {
          if (target.getBoundingClientRect().top <= line) current = target.id
        }
        if (atBottom) current = targets[targets.length - 1]?.id ?? current
        setActive(current)
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [idList])

  // Keep the current link visible in the horizontal strip. Scroll only the strip:
  // scrollIntoView() would also scroll the window, which fights the user's own scrolling.
  useEffect(() => {
    const strip = stripRef.current
    const link = strip?.querySelector<HTMLElement>('[aria-current="true"]')
    if (!strip || !link) return
    const left = link.offsetLeft - strip.offsetLeft
    const right = left + link.offsetWidth
    if (left < strip.scrollLeft) strip.scrollLeft = left
    else if (right > strip.scrollLeft + strip.clientWidth)
      strip.scrollLeft = right - strip.clientWidth
  }, [active])

  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    // Scroll without a router navigation, then move focus to the section heading.
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    const heading = target.querySelector<HTMLElement>('h2')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
    setActive(id)
  }

  return (
    <nav
      ref={navRef}
      aria-label="On this page"
      className={cn(
        'sticky z-10 -mx-4 border-b border-rule bg-paper px-4 transition-[top] duration-200 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0',
        headerHidden ? 'top-0 lg:top-16' : 'top-16',
        className,
      )}
    >
      <ul ref={stripRef} className="-mb-px flex gap-5 overflow-x-auto [scrollbar-width:none]">
        {sections.map((section) => (
          <li key={section.id} className="shrink-0">
            <a
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              onClick={(event) => onClick(event, section.id)}
              className={cn(
                'flex min-h-12 items-center border-b-2 font-medium whitespace-nowrap transition-colors duration-150',
                active === section.id
                  ? 'border-ink text-body'
                  : 'border-transparent text-muted hover:text-body',
              )}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
