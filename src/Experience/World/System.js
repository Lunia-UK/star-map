import Star from './Star'
import Stars from './Stars'
import Jurisdiction from "./Jurisdictions";
import AsteroidBelt from "./AsteroidBelt";

export default class System {
    constructor(systemGroup, data, dataOutposts, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.resources = this.experience.resources
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.infoElements = this.experience.infoElements
        this.system = systemGroup
        this.data = data
        this.dataOutposts = dataOutposts
        this.setStar()
        this.setStars()
        this.setAsteroidBelt()
        this.setJurisdictions()
        this.setInfos()
    }

    setStar() {
        this.star = new Star(this.system, this.data)
    }

    setAsteroidBelt() {
        this.asteroidBelt = new AsteroidBelt(this.system)
    }
    
    setJurisdictions() {
        this.jurisdictions = []
        for (const dataJurisdiction of this.data.jurisdictions) {
            this.jurisdiction = new Jurisdiction(this.system, dataJurisdiction, this.resources.items.dataOutposts)
            this.jurisdictions.push(this.jurisdiction)
        }
    }

    setStars() {
        this.stars = new Stars(this.system)
    }

    setInfos() {
        this.infoElements[0].innerText = 'System'
        this.infoElements[1].innerText = this.resources.items.dataStanton.systemName
        this.infoElements[2].innerText = `${this.resources.items.dataStanton.coords.lat.toPrecision(8)}, ${this.resources.items.dataStanton.coords.long.toPrecision(8)}`
        this.infoElements[3].innerText = this.resources.items.dataStanton.area
    }

    resize() {
    }

    update() {
    }

    destroy() {
    }
}