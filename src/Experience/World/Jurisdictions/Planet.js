import * as THREE from 'three'
import Time from '../../Utils/Time'

export default class Planet {
    constructor(jurisdiction, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.raycaster = this.experience.raycaster
        this.jurisdiction = jurisdiction
        this.data = data
        this.time = new Time()

        this.setPlanets()
    }

    setPlanets() {
        this.astreMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 64, 64, 1),
            new THREE.MeshStandardMaterial({
                opacity: 1,
                transparent: true,
            })
        );
        const textureMap = this.data.astre.astreName.toLowerCase() + 'Texture'
        this.astreMesh.material.map = this.resources.items[textureMap]
        this.astreMesh.name = this.data.astre.astreName
        this.astreMesh.objectType = 'Planet'
        this.astreMesh.area = this.data.area
        this.astreMesh.description = this.data.astre.description
        this.astreMesh.habitable = this.data.astre.habitable
        this.astreMesh.spaceStations = this.data.astre.spaceStations
        this.astreMesh.gravity = this.data.astre.gravity
        this.astreMesh.cycleOrbital = this.data.astre.cycleOrbital
        this.astreMesh.atmosphericPressure = this.data.astre.atmosphericPressure
        this.astreMesh.compositionByVolume = this.data.astre.compositionByVolume
        this.astreMesh.temperature = this.data.astre.temperature
        this.astreMesh.discovered = this.data.astre.discovered
        this.astreMesh.scale.set(10,10,10);
        this.jurisdiction.add(this.astreMesh)
        this.raycaster.objectsToTest.push(this.astreMesh)
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}