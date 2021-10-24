import * as THREE from 'three';

export default class CreateOrbit  {
  constructor(group, scale, x, z, color, focusColor) {
    this.experience = window.experience
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.raycaster = this.experience.raycaster
    this.controls = this.experience.controls

    this.group = group
    this.scale = scale
    this.x = x
    this.z = z
    this.color = color
    this.focusColor = focusColor

    this.setOrbit()
    this.selectedOrbit()
  }

  setOrbit() {
    this.raduis = Math.sqrt((this.x)**2 + (this.z)**2) / this.scale
    this.curveOrbit = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        this.raduis, this.raduis,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    this.pointsOrbit = this.curveOrbit.getPoints( 350 );
    this.geometryOrbit = new THREE.BufferGeometry().setFromPoints( this.pointsOrbit );
    this.materialOrbit = new THREE.LineBasicMaterial( {
      color : this.color,
      opacity: 0.85,
      transparent: true
    });

    this.orbit = new THREE.Line( this.geometryOrbit,this.materialOrbit );
    this.orbit.focusColor = this.focusColor
    this.orbit.color = this.color
    this.orbit.rotateX(Math.PI/2)
    this.orbit.position.set(- this.x / this.scale,0, - this.z / this.scale)
    this.group.add(this.orbit)

  }

  selectedOrbit() {
    this.controls.on('objectSelected', () => {
      this.currentOrbit = this.raycaster.currentIntersect.object.parent.children[1]
      if(this.orbit === this.currentOrbit) {
        this.currentOrbit.material.color = new THREE.Color(this.currentOrbit.focusColor)
      } else {
        this.orbit.material.color = new THREE.Color(this.currentOrbit.color)
      }
    })
    this.controls.on('passLimiteDistance', ()=> {
      this.orbit.material.color = new THREE.Color(this.currentOrbit.color)
    })
  }
};