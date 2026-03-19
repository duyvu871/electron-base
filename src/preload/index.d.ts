declare global {
  interface Window {
    electronApi: {
      getAppVersion: () => Promise<string>
      getDatabaseHealth: () => Promise<{ path: string; healthy: boolean }>
      openExternal: (url: string) => Promise<void>
    }
  }
}

export {}
