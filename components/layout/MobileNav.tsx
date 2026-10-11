import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ExternalButtonLink } from '@/components/ui/Button'
import { SheetContent, SheetRoot, SheetTrigger } from '@/components/ui/Sheet'
import { useNavigateAndClose } from '@/components/ui/useNavigateAndClose'
import { GuidanceButton } from '@/features/enquiry/GuidanceButton'
import { cn } from '@/lib/cn'
import { COMPANY_NAV, PRIMARY_NAV } from '@/lib/navigation'
import { whatsappHref } from '@/lib/site'

/** Navigation drawer for screens below 1024px. */
export function MobileNav({ triggerClassName }: { triggerClassName?: string }) {
  const { open, setOpen, closeAfterNavigation: close, onCloseAutoFocus } = useNavigateAndClose()

  return (
    <SheetRoot open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          'inline-flex min-h-11 items-center gap-2 rounded-control px-2 font-semibold text-current hover:bg-white/10',
          triggerClassName,
        )}
      >
        <Menu aria-hidden="true" className="size-6" strokeWidth={1.75} />
        Menu
      </SheetTrigger>
      <SheetContent title="Menu" onCloseAutoFocus={onCloseAutoFocus}>
        <nav aria-label="Main" className="px-4">
          <ul>
            {PRIMARY_NAV.map((item) => (
              <li key={item.to} className="border-b border-rule">
                <NavLink
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-14 items-center text-lg font-semibold',
                      isActive ? 'text-ink' : 'text-body',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="mt-4">
            {COMPANY_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={close}
                  className="flex min-h-12 items-center text-body"
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 space-y-2 border-t border-rule px-4 pt-6 pb-8">
          <GuidanceButton fullWidth onBeforeOpen={() => setOpen(false)} />
          <ExternalButtonLink
            href={whatsappHref('Hello, I would like guidance on courses and colleges.')}
            variant="tertiary"
            fullWidth
          >
            Chat on WhatsApp
          </ExternalButtonLink>
        </div>
      </SheetContent>
    </SheetRoot>
  )
}
