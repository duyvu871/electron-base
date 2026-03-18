import { z } from 'zod'

const rendererEnvSchema = z.object({
    VITE_APP_ENV: z.enum(['development', 'production']),
    VITE_API_BASE_URL: z.string().url()
})

const rawRendererEnv = {
    VITE_APP_ENV:
        import.meta.env.VITE_APP_ENV ?? (import.meta.env.PROD ? 'production' : 'development'),
    VITE_API_BASE_URL:
        import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'
}

export const rendererEnv = rendererEnvSchema.parse(rawRendererEnv)
