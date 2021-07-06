import * as THREE from 'three';
import createOrbit from "./orbit";
import Labels from './label'

export default class Juridictions {
  constructor(scene, system, juridictions, juridictionsMesh, scale, geometry) {
    this.scene = scene
    this.system = system
    this.juridictions = juridictions
    this.juridictionsMesh = juridictionsMesh
    this.geometrySphere = geometry
    this.scale = scale
  }

  createJuridiction(dataJuridictions){
    for(const dataJuridiction of dataJuridictions ){
      if(dataJuridiction.astre.texture !== null){
        this.juridiction = new THREE.Group();
        this.juridiction.name = dataJuridiction.id;
        this.juridiction.position.x = dataJuridiction.astre.Xposition / this.scale;
        this.juridiction.position.y = dataJuridiction.astre.Yposition / this.scale;
        this.juridiction.position.z = dataJuridiction.astre.Zposition / this.scale;
        this.system.add(this.juridiction);
        this.createPlanet(dataJuridiction)
        new Labels(this.juridiction, this.labels, this.scale, dataJuridiction)
        createOrbit(this.system, this.scale, dataJuridiction.astre.Xposition, dataJuridiction.astre.Zposition, dataJuridiction.astre.color)
      }
    }
  }
  createPlanet(dataJuridiction){
    this.loadTexture = dataJuridiction.astre.texture;
    this.texture = new THREE.TextureLoader().load('textures/' + this.loadTexture);
    this.astreMesh = new THREE.Mesh(
        this.geometrySphere,
        new THREE.MeshPhongMaterial({map: this.texture})
    );
    this.astreMesh.name = dataJuridiction.id + " Mesh"
    this.astreMesh.scale.set(0.5,0.5,0.5);
    this.juridiction.add(this.astreMesh);
    this.juridictionsMesh.push(this.astreMesh);
    this.juridictions.push(this.juridiction);
  }
}
