import axios from 'axios'

import { rendererEnv } from '@/lib/env'

export const apiClient = axios.create({
    baseURL: rendererEnv.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
