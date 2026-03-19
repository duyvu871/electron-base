import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
    throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

contextBridge.exposeInMainWorld('electronApi', {
    getAppVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
    getDatabaseHealth: (): Promise<{ path: string; healthy: boolean }> => ipcRenderer.invoke('app:get-db-health'),
    openExternal: (url: string): Promise<void> => ipcRenderer.invoke('app:open-external', url)
})
