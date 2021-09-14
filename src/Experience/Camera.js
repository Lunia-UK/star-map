import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = window.experience
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene

        // Set up
        this.mode = 'debug' // defaultCamera \ debugCamera

        this.setInstance()
        this.setModes()
    }

    setInstance()
    {
        // Set up
        this.instance = new THREE.PerspectiveCamera(25, this.config.width / this.config.height, 0.01, 5000)
        this.instance.rotation.reorder('YXZ')

        this.scene.add(this.instance)
    }

    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        this.modes.default.instance.rotation.reorder('YXZ')

        // Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        this.modes.debug.instance.rotation.reorder('YXZ')
        this.modes.debug.instance.position.set(0, 250, 1100)

        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        this.modes.debug.orbitControls.screenSpacePanning = true
        this.modes.debug.orbitControls.enableKeys = false
        this.modes.debug.orbitControls.enableZoom = false
        this.modes.debug.orbitControls.zoomSpeed = 0.25
        this.modes.debug.orbitControls.enableDamping = true
        this.modes.debug.orbitControls.update()

        this.modes.debug.trackballControls = new TrackballControls(this.modes.debug.instance, this.targetElement);
        this.modes.debug.trackballControls.noRotate = true;
        this.modes.debug.trackballControls.noPan = true;
        this.modes.debug.trackballControls.noZoom = false;
        this.modes.debug.trackballControls.maxDistance = 1500;
        this.modes.debug.trackballControls.zoomSpeed = 1.5;
        this.modes.debug.trackballControls.update()

        // Debug
        if(this.debug) {
            const controlsFolder = this.debug.utilsFolder.addFolder('Controls')
            controlsFolder.add(this.modes.debug.orbitControls, 'enabled' ).name('Orbit control')
            controlsFolder.add(this.modes.debug.trackballControls, 'enabled' ).name('Trackball control')
        }
    }


    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.debug.instance.aspect = this.config.width / this.config.height
        this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        let target = this.modes.debug.orbitControls.target;
        // Update debug orbit controls
        this.modes.debug.orbitControls.update()

        // Update debug trackball controls
        this.modes.debug.trackballControls.target.set(target.x, target.y, target.z);
        this.modes.debug.trackballControls.update()

        // Apply coordinates
        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection
    }

    destroy()
    {
        this.modes.debug.orbitControls.destroy()
    }
}