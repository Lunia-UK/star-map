import * as THREE from 'three'
import gsap from "gsap";
import EventEmitter from "./Utils/EventEmitter";

export default class Controls extends EventEmitter{

    constructor() {
        super()

        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.raycaster = this.experience.raycaster
        this.camera = this.experience.camera
        this.controls = this.camera.modes.debug.orbitControls
        this.resources = this.experience.resources

        this.objectSelected = this.experience.objectSelected
        this.previosObjectSelected = this.experience.previosObjectSelected
        this.objectSelectedPosition = null
        this.currentLevel = 'System'

        this.infoElements = this.experience.infoElements
        this.primaryFrame = this.experience.primaryFrame

        this.init()
    }

    init() {
        this.raycaster.on('mouseEnter', () => {
            this.currentIntersect = this.raycaster.currentIntersect
        })
        this.onFocus();
        this.controlsChange();
    }

    controlsChange() {
        this.controls.addEventListener('change', () => {
            if (this.objectSelected && !this.animationInProgress) {
                this.distance = this.camera.instance.position.distanceTo(this.objectSelectedPosition);
                this.objectSelected.objectType !== 'Star' ? this.limiteDistance = 20 : this.limiteDistance = 100

                if (this.distance > this.limiteDistance) {
                    this.trigger('passLimiteDistance')
                    this.experience.primaryFrame.frame.style.opacity = 0
                    this.currentLevel = 'System'
                    this.experience.primaryFrame.name.innerText = 'Stanton'
                    this.objectSelected = null
                    this.experience.objectSelected = null
                    this.infoElements[0].innerText = this.currentLevel
                    this.infoElements[1].innerText = 'Stanton'
                    this.infoElements[2].innerText = `${this.resources.items.dataStanton.coords.lat.toPrecision(8)}, ${this.resources.items.dataStanton.coords.long.toPrecision(8)}`
                    this.infoElements[3].innerText = this.resources.items.dataStanton.area
                }
            }
        })
    }

    onFocus() {
        window.addEventListener(
            "dblclick",
            () => {
                this.objectSelected = this.currentIntersect.object;
                this.experience.objectSelected = this.objectSelected
                this.trigger('objectSelected')
                this.objectType()
                this.startAnimation()
            })
    }

    objectType() {
        if (this.currentIntersect) {
            // Type of selector object
            switch (this.objectSelected.objectType) {
                case 'Moon':
                    this.setCurrentLevel('Moon')
                    break;

                case 'Planet':
                    switch (this.currentLevel) {
                        case 'System':
                            this.setCurrentLevel('Jurisdiction')
                            break;
                        case 'Jurisdiction':
                            if (this.objectSelected !== this.previosObjectSelected) {
                                this.setCurrentLevel('Jurisdiction')
                            } else {
                                this.setCurrentLevel('Planet')
                            }
                            break;
                        case 'Planet':
                            this.setCurrentLevel('Jurisdiction')
                            break;
                        case 'Moon':
                            this.setCurrentLevel('Jurisdiction')
                            break;
                    }
                    break;

                case 'Star':
                    this.setCurrentLevel('System')
                    break;
            }
        }
    }

    setCurrentLevel(level) {
        switch (level) {
            case 'Moon':
                this.currentLevel = 'Moon'
                this.setIndication(this.currentLevel)
                this.setFrame(true, this.currentIntersect.object.parent)
                this.setPosition(this.currentIntersect.object)
                this.setAudio('click_v3')
                this.distanceFocusZ = 0.15
                this.distanceFocusY = 0.015
                break;

            case 'Planet':
                this.currentLevel = 'Planet'
                this.setIndication(this.currentLevel)
                this.setFrame(true, this.currentIntersect.object)
                this.setPosition(this.currentIntersect.object)
                this.setAudio('click_v3')
                this.distanceFocusZ = 0.7
                this.distanceFocusY = 0.025
                break;

            case 'Jurisdiction':
                this.currentLevel = 'Jurisdiction'
                this.setIndication(this.currentLevel)
                this.setFrame(false, this.currentIntersect.object)
                this.setPosition(this.currentIntersect.object)
                this.setAudio('click_v1')
                this.distanceFocusZ = 3
                this.distanceFocusY = 0.75
                break;

            case 'Star':
                this.currentLevel = 'System'
                this.setIndication(this.currentLevel)
                this.setFrame(false, this.currentIntersect.object)
                this.setPosition(this.currentIntersect.object)
                this.setAudio('click_v1')
                this.distanceFocusZ = 2
                this.distanceFocusY = 0.3
                break;
        }
    }

    setIndication(level) {
        this.infoElements[0].innerText = level
        if (level === 'Planet') {
            this.infoElements[1].innerText = this.objectSelected.name
        } else {
            this.infoElements[1].innerText = this.objectSelected.parent.name
        }
        this.infoElements[2].innerText = `${this.objectSelected.parent.position.x.toPrecision(8)}, ${this.objectSelected.parent.position.z.toPrecision(8)}`
        this.infoElements[3].innerText = this.objectSelected.area
    }

    setFrame(visible, objectSelected) {
        visible ? this.experience.primaryFrame.frame.style.opacity = 1 : this.experience.primaryFrame.frame.style.opacity = 0
        this.experience.primaryFrame.name.innerText = objectSelected.name
        const lists = {
            'description': '',
            'habitable': 'Habitable:',
            'spaceStations': 'Space Stations:',
            'discovered': 'Discovered in:',
            'gravity': 'Gravity:',
            'cycleOrbital': 'Cycle orbital:',
            'temperature': 'Temperature:',
            'atmosphericPressure': 'Atmospheric pressure:',
            'compositionByVolume': 'Composition by volume:',
        }
        for(let element in lists) {
            if (objectSelected[element] !== '') {
                this.experience.primaryFrame[element].innerText = `${lists[element]} ${objectSelected[element]}`
            }
        }
    }

    setPosition(object) {
        this.x = object.parent.position.x + object.parent.parent.position.x
        this.y = object.parent.position.y + object.parent.parent.position.y
        this.z = object.parent.position.z + object.parent.parent.position.z
        this.objectSelectedPosition = new THREE.Vector3(this.x, this.y, this.z)
    }

    setAudio(sound) {
        this.audioClick = new Audio(`../sounds/${sound}.mp3`);
        this.audioClick.play()
        this.audioClick.volume = 0.8
    }

    startAnimation() {
        this.animationInProgress = true
        this.camera.modes.debug.orbitControls.target = this.objectSelectedPosition
        gsap.to(this.camera.modes.debug.instance.position, {
            duration: 1.5,
            x: this.x,
            y: this.y + this.distanceFocusY,
            z: this.z + this.distanceFocusZ,
        })

        setTimeout(() => {
            this.animationInProgress = false
        }, 1500);

        this.previosObjectSelected = this.objectSelected
    }
}