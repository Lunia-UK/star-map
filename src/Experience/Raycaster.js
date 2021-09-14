import * as THREE from 'three'
import gsap from "gsap";

export default class Raycaster {

    constructor() {
        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.objectSelected = this.experience.objectSelected
        this.objectSelectedPosition = null
        this.camera = this.experience.camera
        this.controls = this.camera.modes.debug.orbitControls
        this.resources = this.experience.resources
        this.infoElements = this.experience.infoElements
        this.objectToTest = []

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
                if(this.intersects.length && this.objectSelected !== this.intersects[0].object) {
                    this.currentIntersect = this.intersects[0]
                    this.currentOrbit = intersect.object.parent.children[1]
                    this.currentOrbit.material.color = new THREE.Color(this.currentOrbit.focusColor)
                } else {
                    this.currentIntersect = null
                }
            }
            for(const object of this.objectToTest) {
                if(!this.intersects.find(intersect => intersect.object === object)) {
                    this.currentOrbit = object.parent.children[1]
                    if(object !== this.objectSelected){
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
            if(this.objectSelected && !this.animationInProgress) {
                this.distance = this.camera.instance.position.distanceTo(this.objectSelectedPosition);
                this.objectSelected.objectType !== 'Star' ? this.limiteDistance = 20 : this.limiteDistance = 100

                console.log(this.limiteDistance)
                if (this.distance > this.limiteDistance) {
                    this.objectSelected = null
                    this.experience.objectSelected = null
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
                if(this.currentIntersect && this.objectSelected !== this.currentIntersect.object) {
                    this.objectSelected = this.currentIntersect.object;
                    this.experience.objectSelected = this.objectSelected
                    this.animationInProgress = true

                    console.log(this.objectSelected)
                    switch (this.objectSelected.objectType) {

                        case 'Moon':

                            // Moon position
                            this.x = this.currentIntersect.object.parent.position.x + this.currentIntersect.object.parent.parent.position.x
                            this.y = this.currentIntersect.object.parent.position.y + this.currentIntersect.object.parent.parent.position.y
                            this.z = this.currentIntersect.object.parent.position.z + this.currentIntersect.object.parent.parent.position.z
                            this.objectSelectedPosition =  new THREE.Vector3( this.x, this.y, this.z )

                            // Distance camera/moon
                            this.distanceFocusZ = 0.5
                            this.distanceFocusY = 0.05


                            break;
                        case 'Planet':

                            // Planet position
                            this.x = this.currentIntersect.object.parent.position.x
                            this.y = this.currentIntersect.object.parent.position.y
                            this.z = this.currentIntersect.object.parent.position.z
                            this.objectSelectedPosition =  new THREE.Vector3( this.x, this.y, this.z )

                            // Distance camera/Planet
                            this.distanceFocusZ = 5
                            this.distanceFocusY = 0.75


                            break;

                        case 'Star':

                            // Star position
                            this.x = this.currentIntersect.object.position.x
                            this.y = this.currentIntersect.object.position.y
                            this.z = this.currentIntersect.object.position.z
                            this.objectSelectedPosition =  new THREE.Vector3( this.x, this.y, this.z )

                            // Distance camera/Planet
                            this.distanceFocusZ = 80
                            this.distanceFocusY = 0.75

                            break;
                        default:
                            break;
                    }
                    this.camera.modes.debug.orbitControls.target = this.objectSelectedPosition
                    this.infoElements[0].innerText = this.objectSelected.objectType
                    this.infoElements[1].innerText = this.objectSelected.name
                    this.infoElements[2].innerText = `${this.objectSelected.parent.position.x.toPrecision(8)}, ${this.objectSelected.parent.position.z.toPrecision(8)}`
                    this.infoElements[3].innerText = this.objectSelected.area

                    gsap.to(this.camera.modes.debug.instance.position, {
                        duration: 1.5,
                        x: this.x,
                        y: this.y + this.distanceFocusY,
                        z: this.z + this.distanceFocusZ,
                    })

                    setTimeout(() => {
                        this.animationInProgress = false
                    }, 1500);

                }
            },
            false
        )
    };
}