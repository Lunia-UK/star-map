import * as THREE from 'three';

export default class Juridictions {
  constructor(scene, system, juridictions, scale, geometry) {
    this.scene = scene
    this.system = system
    this.juridictions = juridictions
    this.geometrySphere = geometry
    this.scale = scale
  }

  createJuridiction(dataJuridictions){
    for(const juridiction of dataJuridictions ){
      if(juridiction.texture !== null){
        this.planet = new THREE.Object3D();
        this.planet.name = juridiction.astreName;
        this.planet.position.x = juridiction.Xposition; 
        this.planet.position.y = juridiction.Xposition;
        this.planet.position.z = juridiction.Xposition;
        this.system.add(this.planet);

        const loadTexture = juridiction.texture;
        const texture = new THREE.TextureLoader().load('textures/' + loadTexture);
        const astreMesh = new THREE.Mesh(
            this.geometrySphere,
            new THREE.MeshPhongMaterial({map: texture})
          )
        astreMesh.position.set(juridiction.Xposition / this.scale, juridiction.Yposition / this.scale, juridiction.Zposition / this.scale)
        astreMesh.scale.set(0.3,0.3,0.3)
        this.system.add(astreMesh)
        this.juridictions.push(astreMesh)
      }
    }
  }
}
