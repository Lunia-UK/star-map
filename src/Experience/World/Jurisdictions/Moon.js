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
        this.moonGroup.position.x = this.data.Xposition;
        this.moonGroup.position.y = this.data.Yposition;
        this.moonGroup.position.z = this.data.Zposition;
        this.moonMesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32, 1),
            new THREE.MeshPhongMaterial({
                opacity: 1,
                transparent: true,
            })
        );
        const textureMap = this.data.name.toLowerCase() + 'Texture'
        this.moonMesh.material.map = this.resources.items[textureMap]
        this.moonMesh.name = this.data.name
        this.moonMesh.scale.set(0.08,0.08,0.08);
        this.moonGroup.add(this.moonMesh)
        this.jurisdictionGroup.add(this.moonGroup)
        this.raycaster.objectToTest.push(this.moonMesh)
    }

    setOrbit() {
        this.orbit = new Orbit(this.moonGroup, 1, this.data.Xposition, this.data.Zposition, this.data.color, this.data.focusColor)
        console.log(this.orbit)
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}