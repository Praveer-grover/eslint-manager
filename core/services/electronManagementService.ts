import { BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';


class ElectronManagementService {

    public createWindow(dirName: string, isServeMode?: boolean): BrowserWindow {

        let win: BrowserWindow = null;

        const electronScreen = screen;
        const size = electronScreen.getPrimaryDisplay().workAreaSize;

        // Create the browser window.
        win = new BrowserWindow({
            x: 0,
            y: 0,
            width: size.width,
            height: size.height,
            webPreferences: {
                nodeIntegration: true,
                allowRunningInsecureContent: (isServeMode) ? true : false,
            },
        });

        if (isServeMode) {

            require('devtron').install();
            win.webContents.openDevTools();

            require('electron-reload')(dirName, {
                electron: require(`${dirName}/node_modules/electron`)
            });
            win.loadURL('http://localhost:4200');

        } else {
            win.loadURL(url.format({
                pathname: path.join(dirName, 'dist/index.html'),
                protocol: 'file:',
                slashes: true
            }));
        }

        return win;
    }

}

export const electronManagementService = new ElectronManagementService();