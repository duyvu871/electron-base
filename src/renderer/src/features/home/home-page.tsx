import { BookOpenText, ExternalLink, LoaderCircle } from 'lucide-react'
import { type FC, useEffect, useMemo, useState } from 'react'

import { BaseLayout } from '@/components/layout/base-layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type TechDoc = {
  title: string
  description: string
  url: string
  category: 'core' | 'ui' | 'data' | 'validation' | 'db'
}

export const HomePage: FC = () => {
  const [isLoadingScreen, setIsLoadingScreen] = useState(true)

  const docs = useMemo<TechDoc[]>(
    () => [
      {
        title: 'Electron Documentation',
        description: 'Main process, preload bridge, security and packaging.',
        url: 'https://www.electronjs.org/docs/latest/',
        category: 'core'
      },
      {
        title: 'Drizzle ORM Documentation',
        description: 'Type-safe SQL schema, query builder and migrations.',
        url: 'https://orm.drizzle.team/docs/overview',
        category: 'db'
      },
      {
        title: 'React Query (TanStack Query)',
        description: 'Remote state management, caching and async queries.',
        url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
        category: 'data'
      },
      {
        title: 'Axios Documentation',
        description: 'HTTP client usage and request/response interceptors.',
        url: 'https://axios-http.com/docs/intro',
        category: 'data'
      },
      {
        title: 'shadcn/ui Documentation',
        description: 'Component primitives and CLI component generation.',
        url: 'https://ui.shadcn.com/docs',
        category: 'ui'
      },
      {
        title: 'React Hook Form',
        description: 'Performant form management for React applications.',
        url: 'https://react-hook-form.com/get-started',
        category: 'validation'
      },
      {
        title: 'Zod Documentation',
        description: 'Runtime schema validation and type-safe parsing.',
        url: 'https://zod.dev/',
        category: 'validation'
      }
    ],
    []
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingScreen(false)
    }, 1300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const openDoc = async (url: string): Promise<void> => {
    await window.electronApi.openExternal(url)
  }

  if (isLoadingScreen) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <Card className="w-full max-w-xl border-slate-300/80 bg-white/85 backdrop-blur">
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <LoaderCircle className="animate-spin text-slate-700" size={38} />
            <h1 className="text-2xl font-semibold text-slate-900">Loading Base Project</h1>
            <p className="max-w-md text-sm text-slate-600">
              Preparing the workspace and documentation shortcuts for the project stack...
            </p>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <BaseLayout
      appSubtitle="Quick access to official technology docs used by this base repository"
      appTitle="Electron Base Project"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.title}>
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <Badge variant="outline">{doc.category}</Badge>
                <BookOpenText className="text-slate-500" size={18} />
              </div>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button
                className="w-full"
                onClick={() => void openDoc(doc.url)}
                type="button"
                variant="secondary"
              >
                Open Documentation
                <ExternalLink size={14} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </BaseLayout>
  )
}
