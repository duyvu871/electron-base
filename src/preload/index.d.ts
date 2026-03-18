declare global {
    interface Window {
        electronApi: {
            getAppVersion: () => Promise<string>
            openExternal: (url: string) => Promise<void>
            getAppSetting: (key: string) => Promise<string | null>
            setAppSetting: (key: string, value: string) => Promise<void>
        }
    }
}

export { }

