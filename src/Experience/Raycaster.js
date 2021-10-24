import * as THREE from 'three'
import EventEmitter from "./Utils/EventEmitter";

export default class Raycaster extends EventEmitter {

    constructor() {
        super()

        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        this.currentIntersect = null
        this.objectsToTest = []

        this.mouse()
        this.setRaycaster()
    }

    mouse() {
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1
        })
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.time.on('tick', () => {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            this.intersects = this.raycaster.intersectObjects(this.objectsToTest)
            if (this.intersects.length) {
                // if (!this.currentIntersect) {
                //     console.log('enter')
                // }
                for (const intersect of this.intersects) {
                    this.currentIntersect = this.intersects[0]
                    this.trigger('mouseEnter')
                }
            } else {
                // if(this.currentIntersect) {
                //     console.log('leave')
                // }
                this.currentIntersect = null
                this.trigger('mouseLeave')
            }
        })
    }
}