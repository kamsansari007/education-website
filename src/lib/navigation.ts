export interface NavItem {
  to: string
  label: string
}

export const PRIMARY_NAV: NavItem[] = [
  { to: '/universities', label: 'Universities' },
  { to: '/colleges', label: 'Colleges' },
  { to: '/courses', label: 'Courses' },
  { to: '/articles', label: 'Articles' },
]

export const COMPANY_NAV: NavItem[] = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const LEGAL_NAV: NavItem[] = [
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]
