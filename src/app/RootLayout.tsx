import { Outlet, ScrollRestoration } from 'react-router-dom'
import { DemoStrip } from '@/components/layout/DemoStrip'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SkipLink } from '@/components/layout/SkipLink'
import { CompareProvider } from '@/features/compare/CompareProvider'
import { CompareTray } from '@/features/compare/CompareTray'
import { EnquiryProvider } from '@/features/enquiry/EnquiryProvider'
import { useRouteFocus } from './useRouteFocus'

export function RootLayout() {
  useRouteFocus()
  return (
    <CompareProvider>
      <EnquiryProvider>
        <SkipLink />
        <DemoStrip />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Outlet />
        </main>
        <SiteFooter />
        <CompareTray />
        <ScrollRestoration />
      </EnquiryProvider>
    </CompareProvider>
  )
}
