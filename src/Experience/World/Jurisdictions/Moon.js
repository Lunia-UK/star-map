import * as THREE from 'three'
import Time from '../../Utils/Time'
import Orbit from "../Orbit";

export default class Moon {
    constructor(jurisdictionGroup, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.raycaster = this.experience.raycaster
        this.jurisdictionGroup = jurisdictionGroup
        this.data = data
        this.scale = 70000
        this.time = new Time()

        this.setMoon()
        this.setOrbit()
    }

    setMoon() {
        this.moonGroup = new THREE.Group()
        this.moonGroup.name = this.data.name
        this.moonGroup.description = this.data.description
        this.moonGroup.habitable = this.data.habitable
        this.moonGroup.spaceStations = this.data.spaceStations
        this.moonGroup.gravity = this.data.gravity
        this.moonGroup.cycleOrbital = this.data.cycleOrbital
        this.moonGroup.atmosphericPressure = this.data.atmosphericPressure
        this.moonGroup.compositionByVolume = this.data.compositionByVolume
        this.moonGroup.temperature = this.data.temperature
        this.moonGroup.discovered = this.data.discovered
        this.moonGroup.position.x = this.data.Xposition;
        this.moonGroup.position.y = this.data.Yposition;
        this.moonGroup.position.z = this.data.Zposition;
        this.moonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32, 1),
            new THREE.MeshStandardMaterial({
                opacity: 1,
                transparent: true,
            })
        );
        const textureMap = this.data.name.toLowerCase() + 'Texture'
        this.moonMesh.material.map = this.resources.items[textureMap]
        this.moonMesh.name = this.data.name
        this.moonMesh.objectType = 'Moon'
        this.moonMesh.area = this.data.area
        this.moonMesh.scale.set(0.02,0.02,0.02);
        this.moonGroup.add(this.moonMesh)
        this.jurisdictionGroup.add(this.moonGroup)
        this.raycaster.objectsToTest.push(this.moonMesh)
    }

    setOrbit() {
        this.orbit = new Orbit(this.moonGroup, 1, this.data.Xposition, this.data.Zposition, this.data.color, this.data.focusColor)
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}