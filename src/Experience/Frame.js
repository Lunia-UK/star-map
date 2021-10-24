export default class Frame {
    constructor(type, _options) {
        this.experience = window.experience
        this.resources = this.experience.resources
        this.type = type
        this.resources.on('groupEnd', (_group) => {
            if(_group.name === 'base') {
                this.createFrame();
            }
        })
    }

    createFrame() {
        this.frame = document.createElement("div");
        this.frame.classList.add('frame')
        this.frame.classList.add(`frame-${this.type}`)
        document.body.appendChild(this.frame)

        this.createName()
        this.createDescription()
        this.createContent()
    }

    createName() {
        this.name = document.createElement("h2");
        this.name.classList.add('frame-title')
        this.frame.appendChild(this.name)
    }

    createDescription() {
        this.description = document.createElement("p");
        this.description.classList.add('frame-description')
        this.frame.appendChild(this.description)
    }

    createContent() {
        this.habitable = document.createElement("p");
        this.frame.appendChild(this.habitable)

        this.spaceStations = document.createElement("p");
        this.frame.appendChild(this.spaceStations)

        this.gravity = document.createElement("p");
        this.frame.appendChild(this.gravity)

        this.cycleOrbital = document.createElement("p");
        this.frame.appendChild(this.cycleOrbital)

        this.atmosphericPressure = document.createElement("p");
        this.frame.appendChild(this.atmosphericPressure)

        this.compositionByVolume = document.createElement("p");
        this.frame.appendChild(this.compositionByVolume)

        this.temperature = document.createElement("p");
        this.frame.appendChild(this.temperature)

        this.discovered = document.createElement("p");
        this.frame.appendChild(this.discovered)
    }
}
