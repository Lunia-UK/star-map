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
            new THREE.SphereGeometry(1, 32, 32, 1),
            new THREE.MeshPhongMaterial({
                map: this.resources.items.microtechTexture,
                opacity: 0.9,
                transparent: true,
            })
        );
        this.astreMesh.name = this.data.astre.astreName
        this.astreMesh.scale.set(0.5,0.5,0.5);
        this.jurisdiction.add(this.astreMesh)
        this.raycaster.objectToTest.push(this.astreMesh)

        this.setWirefrane()
    }

    setWirefrane() {
        this.astreWireFrame = new THREE.Mesh(
            new THREE.IcosahedronGeometry(1.3, 1),
            new THREE.MeshPhongMaterial({
                opacity: 0.5,
                transparent: true,
                wireframe : true
            })
        );
        this.astreWireFrame.name = 'wireframe'
        this.astreWireFrame.scale.set(.5,.5,.5);
        this.astreWireFrame.visible = false
        this.jurisdiction.add(this.astreWireFrame);

        this.time.on('tick', () => {
            this.astreWireFrame.rotation.x += 0.003;
            this.astreWireFrame.rotation.z += 0.003;
        })
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}