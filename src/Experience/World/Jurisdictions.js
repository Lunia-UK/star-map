import * as THREE from 'three'
import Planet from "./Jurisdictions/planet";
import Moon from "./Jurisdictions/moon";
import Orbit from "./Orbit";

export default class Jurisdictions {
    constructor(systemGroup, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.system = systemGroup
        this.data = data
        this.scale = 1300000

        this.setJuridiction()
    }

    setJuridiction() {
        // Debug
        if(this.debug) {
            this.jurisdictionFolder = this.debug.spaceFolder.addFolder('Juridictions')
        }
        for(const dataJurisdiction of this.data.jurisdictions ){
            if(dataJurisdiction.astre.texture !== null){
                this.jurisdiction = new THREE.Group();
                this.jurisdiction.name = dataJurisdiction.id;
                this.jurisdiction.type = 'Jurisdiction';
                this.jurisdiction.area = dataJurisdiction.area
                this.jurisdiction.position.x = dataJurisdiction.astre.Xposition / this.scale;
                this.jurisdiction.position.y = dataJurisdiction.astre.Yposition / this.scale;
                this.jurisdiction.position.z = dataJurisdiction.astre.Zposition / this.scale;
                this.system.add(this.jurisdiction);
                this.planet = new Planet(this.jurisdiction, dataJurisdiction)
                this.paramOrbit = {
                    color: dataJurisdiction.astre.color
                }
                this.orbit = new Orbit(this.jurisdiction, this.scale, dataJurisdiction.astre.Xposition, dataJurisdiction.astre.Zposition, dataJurisdiction.astre.color, dataJurisdiction.astre.focusColor)
                this.moon = new Moon(this.jurisdiction, dataJurisdiction.moons)


                // this.createMoons(dataJurisdiction.moons)
            }
        }
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}