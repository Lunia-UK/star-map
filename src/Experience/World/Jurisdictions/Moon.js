import * as THREE from 'three'
import Time from '../../Utils/Time'

export default class Planet {
    constructor(jurisdiction, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.jurisdiction = jurisdiction
        this.data = data
        this.scale = 1300000
        this.time = new Time()

        this.setMoons()
    }

    setMoons() {
        for(const moon of this.data){
            this.moonMesh = new THREE.Mesh(
                new THREE.SphereGeometry(1, 32, 32, 1),
                new THREE.MeshPhongMaterial({
                    map: this.resources.items.microtechTexture,
                    opacity: 0.9,
                    transparent: true,
                })
            );
            this.moonMesh.name = moon.name
            this.moonMesh.position.x = moon.Xposition;
            this.moonMesh.position.y = moon.Yposition;
            this.moonMesh.position.z = moon.Zposition;
            this.moonMesh.scale.set(0.15,0.15,0.15);
            this.jurisdiction.add(this.moonMesh)
            // this.raycaster.objectToTest.push(this.moonMesh)
        }
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}