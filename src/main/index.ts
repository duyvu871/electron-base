import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'

import { closeDatabase, getDatabaseHealth, initializeDatabase } from './db'
import icon from '../../resources/icon.png?asset'

if (process.platform === 'linux') {
    // Allow forcing ozone backend from environment for distro-specific issues.
    if (process.env.ELECTRON_OZONE_PLATFORM_HINT) {
        app.commandLine.appendSwitch('ozone-platform-hint', process.env.ELECTRON_OZONE_PLATFORM_HINT)
    }

    // Optional workaround for repeated GetVSyncParametersIfAvailable errors.
    if (process.env.ELECTRON_DISABLE_VSYNC === '1') {
        app.commandLine.appendSwitch('disable-gpu-vsync')
    }

    // Optional fallback for unstable drivers.
    if (process.env.ELECTRON_DISABLE_GPU === '1') {
        app.disableHardwareAcceleration()
    }

    // Software rendering fallback for machines with problematic OpenGL drivers.
    if (process.env.ELECTRON_USE_SWIFTSHADER === '1') {
        app.commandLine.appendSwitch('use-angle', 'swiftshader')
    }
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 760,
        minWidth: 1024,
        minHeight: 640,
        show: false,
        autoHideMenuBar: true,
        title: 'Electron Base Project',
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            devTools: is.dev,
            sandbox: true,
            contextIsolation: true
        }
    })

    if (!is.dev) {
        mainWindow.webContents.on('before-input-event', (event, input) => {
            const isF12 = input.key === 'F12'
            const isCtrlShiftI = (input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i'

            if (isF12 || isCtrlShiftI) {
                event.preventDefault()
            }
        })
    }

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)

        return { action: 'deny' }
    })

    if (is.dev && process.env.ELECTRON_RENDERER_URL) {
        mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)

        return
    }

    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.example.electronbaseproject')
    initializeDatabase()

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    ipcMain.handle('app:get-version', () => app.getVersion())
    ipcMain.handle('app:get-db-health', () => getDatabaseHealth())
    ipcMain.handle('app:open-external', async (_event, url: string) => {
        await shell.openExternal(url)
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('before-quit', () => {
    closeDatabase()
})
