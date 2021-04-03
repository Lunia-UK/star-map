import * as THREE from 'three';
import Loader from './loader'

export default class Juridictions {
  constructor(scene, system, geometry) {
    this.scene = scene
    this.system = system
    this.geometrySphere = geometry
    this.scale = 1300000
  }

  createJuridiction(dataJuridictions){
    for(const juridiction of dataJuridictions ){
      if(juridiction.texture !== 'none'){
        this.planet = new THREE.Object3D();
        this.planet.name = juridiction.astreName;
        this.planet.position.x = juridiction.Xposition; 
        this.planet.position.y = juridiction.Xposition;
        this.planet.position.z = juridiction.Xposition;
        console.log(this.planet)
        this.system.add(this.planet);

        const loadTexture = juridiction.texture;
        const texture = new THREE.TextureLoader().load('textures/' + loadTexture);
        const astreMesh = new THREE.Mesh(
            this.geometrySphere,
            new THREE.MeshPhongMaterial({map: texture})
          )
        astreMesh.position.set(juridiction.Xposition / this.scale, juridiction.Yposition / this.scale, juridiction.Zposition / this.scale)
        astreMesh.scale.set(0.3,0.3,0.3)
        this.scene.add(astreMesh)
      }
  }
  }
}
