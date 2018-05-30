'use strict'

const { app, BrowserWindow } = require('electron')

let window

app.on('before-quit', () => {
    console.log('Saliendo..')
})

app.on('ready', () => {
    window = new BrowserWindow({
		width: 1024,
        height: 768,
        title: 'Examenes',
        center: true,
        minWidth: 1024,
        minHeight: 768,
        show: false
    })
    
    window.setMenu(null)
    window.loadURL(`file://${__dirname}/render/index.html`)

    window.once('ready-to-show', () => {
        window.show()
    })

    window.on('close', () => {
        window = null
        app.quit()
    })
})
