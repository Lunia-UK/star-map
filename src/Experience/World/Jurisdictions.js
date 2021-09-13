import * as THREE from 'three'
import Planet from "./Jurisdictions/Planet";
import Moon from "./Jurisdictions/Moon";
import Orbit from "./Orbit";

export default class Jurisdiction {
    constructor(system, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.system = system
        this.data = data
        this.scale = 70000

        this.setJurisdiction()
    }

    setJurisdiction() {
        this.jurisdictionGroup = new THREE.Group()
        this.jurisdictionGroup.name = this.data.id
        this.jurisdictionGroup.type = 'Jurisdiction'
        this.jurisdictionGroup.area = this.data.area
        this.name = this.data.id
        this.jurisdictionGroup.position.x = this.data.astre.Xposition / this.scale
        this.jurisdictionGroup.position.y = this.data.astre.Yposition / this.scale
        this.jurisdictionGroup.position.z = this.data.astre.Zposition / this.scale
        this.planet = new Planet(this.jurisdictionGroup, this.data)
        this.orbit = new Orbit(this.jurisdictionGroup, this.scale, this.data.astre.Xposition, this.data.astre.Zposition, this.data.astre.color, this.data.astre.focusColor)

        this.moons = []
        for(const dataMoon of this.data.moons) {
            const moon =  new Moon(this.jurisdictionGroup, dataMoon)
            this.moons.push(moon)
        }
        this.system.add(this.jurisdictionGroup)
    }


    resize() {
    }

    update() {
    }

    destroy() {
    }
}