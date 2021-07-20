import * as THREE from 'three';

export default class CreateOrbit  {
  constructor(group, scale, x, z, color, focusColor) {
    this.experience = window.experience
    this.config = this.experience.config
    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.group = group
    this.scale = scale
    this.x = x
    this.z = z
    this.color = color
    this.focusColor = focusColor

    this.setOrbit()
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
    this.pointsOrbit = this.curveOrbit.getPoints( 100 );
    this.geometryOrbit = new THREE.BufferGeometry().setFromPoints( this.pointsOrbit );
    this.materialOrbit = new THREE.LineBasicMaterial( {
      color : this.color,
      opacity: 0.9,
      transparent: true
    });

    this.orbit = new THREE.Line( this.geometryOrbit,this.materialOrbit );
    this.orbit.focusColor = this.focusColor
    this.orbit.color = this.color
    this.orbit.rotateX(Math.PI/2)
    this.orbit.position.set(- this.x / this.scale,0, - this.z / this.scale)
    this.group.add(this.orbit)

  }

};