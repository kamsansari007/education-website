import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import { RouteError } from './RouteError'

/** Routes from PRD §5 that are scheduled for later milestones. */
const PLACEHOLDER_ROUTES: { path: string; title: string }[] = [
  { path: 'courses/:slug', title: 'Course' },
  { path: 'search', title: 'Search results' },
  { path: 'compare', title: 'Compare' },
  { path: 'articles', title: 'Guides and articles' },
  { path: 'articles/:slug', title: 'Article' },
  { path: 'about', title: 'About' },
  { path: 'contact', title: 'Contact' },
  { path: 'privacy', title: 'Privacy' },
  { path: 'terms', title: 'Terms' },
]

const placeholderRoutes: RouteObject[] = PLACEHOLDER_ROUTES.map(({ path, title }) => ({
  path,
  lazy: async () => {
    const { PlaceholderPage } = await import('@/pages/PlaceholderPage')
    return { element: <PlaceholderPage title={title} /> }
  },
}))

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      errorElement: <RouteError />,
      children: [
        {
          // Pathless boundary so route errors render inside the site shell.
          errorElement: <RouteError />,
          children: [
            {
              index: true,
              lazy: async () => ({ Component: (await import('@/pages/HomePage')).HomePage }),
            },
            {
              path: 'universities',
              lazy: async () => ({
                Component: (await import('@/pages/UniversitiesPage')).UniversitiesPage,
              }),
            },
            {
              path: 'colleges',
              lazy: async () => ({
                Component: (await import('@/pages/CollegesPage')).CollegesPage,
              }),
            },
            {
              path: 'courses',
              lazy: async () => ({ Component: (await import('@/pages/CoursesPage')).CoursesPage }),
            },
            {
              path: 'universities/:slug',
              lazy: async () => ({
                Component: (await import('@/pages/UniversityDetailPage')).UniversityDetailPage,
              }),
            },
            {
              path: 'colleges/:slug',
              lazy: async () => ({
                Component: (await import('@/pages/CollegeDetailPage')).CollegeDetailPage,
              }),
            },
            ...placeholderRoutes,
            {
              path: '*',
              lazy: async () => ({
                Component: (await import('@/pages/NotFoundPage')).NotFoundPage,
              }),
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
)
