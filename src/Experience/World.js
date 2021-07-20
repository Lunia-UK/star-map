import * as THREE from 'three'
import System from "./World/System";

export default class World {
    constructor(_options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.resources.on('groupEnd', (_group) => {
            if(_group.name === 'base') {
                this.setSystem()
            }
        })
    }

    setSystem() {
        this.systemGroup = new THREE.Group();
        this.systemGroup.name = this.resources.items.dataStanton.systemName
        this.system = new System(this.systemGroup, this.resources.items.dataStanton)
        this.scene.add(this.systemGroup)
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}