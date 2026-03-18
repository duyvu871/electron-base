import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

export const QueryProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60,
                        retry: 1,
                        refetchOnWindowFocus: false
                    }
                }
            })
    )

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
