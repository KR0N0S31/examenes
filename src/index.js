'use strict'

const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')
const url = require('url')

let window
app.showExitPrompt = true

app.once('ready', () => {
    window = new BrowserWindow({
        width: 1024,
        height: 768,
        title: 'Examenes',
        center: true,
        minWidth: 1024,
        minHeight: 768,
        icon: path.join(__dirname, 'assets/img/favicon.png'),
        show: false
    })
    
    window.setMenu(null)
    // window.toggleDevTools()
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'render/index.html'),
        protocol: 'file:',
        slashes: true
      }))

    window.once('ready-to-show', () => {
        window.show()
    })

    window.on('close', (e) => {
        if (app.showExitPrompt) {
            e.preventDefault()
            dialog.showMessageBox({
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Salir',
                message: 'Seguro que quieres salir?'
            }, (response) => {
                if (response === 0) {
                    app.showExitPrompt = false
                    window.close()
                }
            })
        } else {
            window = null
            app.quit()
        }
    })
})
