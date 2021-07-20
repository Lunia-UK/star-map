import * as THREE from 'three'

export default class Lights {
    constructor(_options = {}) {
        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.stats = this.experience.stats
        this.scene = this.experience.scene

        this.setLights()
    }

    setLights() {
        this.pointLight = new THREE.PointLight(0xffffff, 0.7)
        this.scene.add(this.pointLight)

        this.ambiantLight = new THREE.AmbientLight( 0x404040, 0.6 )
        this.scene.add(this.ambiantLight)


        // Debug
        if(this.config.debug) {
            this.lightsFolder = this.debug.utilsFolder.addFolder('Lights')
            this.lightsFolder.add(this.pointLight, 'intensity').min(0.2).max(1.5).name('Sun light')
            this.lightsFolder.add(this.ambiantLight, 'intensity').min(0.2).max(1.5).step(0.2).name('Ambient light')
        }
    }

    update() {

    }

    destroy() {
    }
}