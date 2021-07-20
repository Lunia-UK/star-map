import * as dat from 'dat.gui'

export default class Debug
{
    constructor(_active)
    {
        this.debug = new dat.GUI({width: 300})

        this.active = false

        if(_active) {
            this.activate()
        }
    }

    activate() {
        this.active = true
        this.spaceFolder = this.debug.addFolder('Space')
        this.utilsFolder = this.debug.addFolder('Utils')
    }

    deactivate() {
        this.active = false
    }

    update() {
        if(!this.active) {
            return
        }
        this.debug.update()
    }

    destroy() {
        this.deactivate()
    }
}