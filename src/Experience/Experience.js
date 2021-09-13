import * as THREE from 'three'
import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/Stats.js'
import Debug from './Utils/Debug.js'

import Resources from './Resources.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'
import Lights from './Lights.js'
import World from './World.js'
import Raycaster from './Raycaster'

import assets from './assets.js'

export default class Experience {
    constructor(_options = {}) {
        window.experience = this

        this.targetElement = _options.targetElement

        if(!this.targetElement) {
            console.warn('Missing \'targetElement\' property')
            return
        }

        this.time = new Time()
        this.sizes = new Sizes()
        this.setConfig()
        this.setStats()
        this.setDebug()
        this.setScene()
        this.setCamera()
        this.setLights()
        this.setRenderer()
        this.setResources()
        this.setWorld()
        this.setInfo()
        this.setRaycaster()

        this.sizes.on('resize', () => {
            this.resize()
        })

        this.update()
    }

    setConfig() {
        this.config = {}

        // Debug
        this.config.debug = window.location.hash === '#debug'

        // Pixel ratio
        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        // Width and height
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height || window.innerHeight
    }

    setStats() {
        if(this.config.debug) {
            this.stats = new Stats(true)
        }
    }

    setDebug() {
        if(this.config.debug) {
            this.debug = new Debug(true)
        }
    }

    setScene() {
        this.scene = new THREE.Scene()
        this.sceneSun = new THREE.Scene();

    }

    setCamera() {
        this.camera = new Camera()
    }

    setLights() {
        this.lights = new Lights()
    }

    setRenderer() {
        this.renderer = new Renderer({ rendererInstance: this.rendererInstance })

        this.targetElement.appendChild(this.renderer.instance.domElement)
    }

    setResources() {
        this.resources = new Resources(assets)
    }

    setWorld() {
        this.world = new World()
    }

    setInfo() {
        this.containerInfo = document.createElement('div')
        this.containerInfo.setAttribute('id', 'containerInfo')
        document.body.appendChild(this.containerInfo);

        this.elements = [{name: 'type', type: 'p'},{name: 'systemName', type: 'p'},{name: 'coords', type: 'p'},{name: 'area', type: 'p'}]
        this.infoElements = []
        for(const element of this.elements){
            this.newelement = document.createElement(element.type)
            this.newelement.setAttribute('id', element.name)
            this.newelement.setAttribute('class', element.name)
            this.containerInfo.appendChild(this.newelement);
            this.infoElements.push(this.newelement)
        }
    }

    setRaycaster() {
        this.raycaster = new Raycaster()
    }

    update() {
        if(this.stats)
            this.stats.update()

        this.camera.update()

        if(this.world)
            this.world.update()

        if(this.renderer)
            this.renderer.update()

        window.requestAnimationFrame(() =>
        {
            this.update()
        })
    }

    resize() {
        // Config
        const boundings = this.targetElement.getBoundingClientRect()
        this.config.width = boundings.width
        this.config.height = boundings.height

        this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

        if(this.camera)
            this.camera.resize()

        if(this.renderer)
            this.renderer.resize()

        if(this.world)
            this.world.resize()

        if(this.navigation)
            this.navigation.resize()
    }

    destroy() {

    }
}
