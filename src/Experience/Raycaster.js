import * as THREE from 'three'
import gsap from "gsap";

export default class Raycaster {

    constructor() {
        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.controls = this.camera.modes.debug.orbitControls
        this.resources = this.experience.resources
        this.infoElements = this.experience.infoElements
        this.objectToTest = []
        this.objectFocus = false
        // this.animationInProgress = false

        this.mouse()
        this.setRaycaster()
    }

    mouse() {
        this.mouse = new THREE.Vector2()
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
    }
    setRaycaster() {
        this.raycaster = new THREE.Raycaster()
        this.time.on('tick', () => {
            this.raycaster.setFromCamera(this.mouse, this.camera.instance)
            this.intersects = this.raycaster.intersectObjects(this.objectToTest);
            for(const intersect of this.intersects) {
                if(this.intersects.length && this.objectFocus !== this.intersects[0].object) {
                    this.currentIntersect = this.intersects[0]
                    this.currentPlanetWireframe = intersect.object.parent.children[1]
                    this.currentOrbit = intersect.object.parent.children[2]
                    this.currentPlanetWireframe.visible = true
                    this.currentOrbit.material.color = new THREE.Color(this.currentOrbit.focusColor)
                } else {
                    this.currentIntersect = null
                }
            }
            for(const object of this.objectToTest) {
                if(!this.intersects.find(intersect => intersect.object === object)) {
                    this.currentPlanetWireframe = object.parent.children[1]
                    this.currentOrbit = object.parent.children[2]
                    this.currentPlanetWireframe.visible = false
                    if(object !== this.objectFocus){
                        this.currentOrbit.material.color = new THREE.Color(this.currentOrbit.color)
                    }
                }
            }

        })
        this.resources.on('groupEnd', (_group) => {
            if(_group.name === 'base') {
                this.dblClick();
                this.controlsChange();
            }
        })

    }

    controlsChange() {
        this.controls.addEventListener('change', () => {
            if(this.objectFocus && !this.animationInProgress){
                this.distance = this.camera.instance.position.distanceTo( this.objectFocus.parent.position );
                if (this.distance > 20) {
                    this.objectFocus = null
                    this.infoElements[0].innerText = 'System'
                    this.infoElements[1].innerText = 'Stanton'
                    this.infoElements[2].innerText = `${this.resources.items.dataStanton.coords.lat.toPrecision(8)}, ${this.resources.items.dataStanton.coords.long.toPrecision(8)}`
                    this.infoElements[3].innerText = this.resources.items.dataStanton.area
                }
            }
        })
    }

    dblClick() {
        window.addEventListener(
            "dblclick",
            () => {
                if(this.currentIntersect && this.objectFocus !== this.currentIntersect.object) {
                    this.objectFocus = this.currentIntersect.object;
                    this.animationInProgress = true
                    this.x = this.currentIntersect.object.parent.position.x
                    this.y = this.currentIntersect.object.parent.position.y
                    this.z = this.currentIntersect.object.parent.position.z
                    gsap.to(this.camera.modes.debug.instance.position, {
                        duration: 1,
                        x: this.x,
                        y: this.y ,
                        z: this.z + 3,
                    })
                    setTimeout(() => {
                        this.animationInProgress = false
                    }, 1000);
                    this.objectFocusPosition = this.objectFocus.parent.position.clone()
                    this.camera.modes.debug.orbitControls.target = this.objectFocusPosition
                    this.infoElements[0].innerText = this.currentIntersect.object.parent.type
                    this.infoElements[1].innerText = this.currentIntersect.object.parent.name
                    this.infoElements[2].innerText = `${this.objectFocus.parent.position.x.toPrecision(8)}, ${this.objectFocus.parent.position.z.toPrecision(8)}`
                    this.infoElements[3].innerText = this.currentIntersect.object.parent.area
                }
            },
            false
        )
    };
}