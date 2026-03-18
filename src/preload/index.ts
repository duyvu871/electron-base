import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
    throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

contextBridge.exposeInMainWorld('electronApi', {
    getAppVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
    openExternal: (url: string): Promise<void> => ipcRenderer.invoke('app:open-external', url),
    getAppSetting: (key: string): Promise<string | null> => ipcRenderer.invoke('app-settings:get', key),
    setAppSetting: (key: string, value: string): Promise<void> => ipcRenderer.invoke('app-settings:set', key, value)
})
