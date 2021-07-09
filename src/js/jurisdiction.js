import * as THREE from 'three';
import createOrbit from "./orbit";
import Labels from './label'

export default class Jurisdiction {
  constructor(scene, system, jurisdictions, jurisdictionsMesh, scale, geometry) {
    this.scene = scene
    this.system = system
    this.jurisdictions = jurisdictions
    this.jurisdictionsMesh = jurisdictionsMesh
    this.geometrySphere = geometry
    this.scale = scale
  }

  createJuridiction(datajurisdictions){
    for(const dataJurisdiction of datajurisdictions ){
      if(dataJurisdiction.astre.texture !== null){
        this.jurisdiction = new THREE.Group();
        this.jurisdiction.name = dataJurisdiction.id;
        this.jurisdiction.type = 'Jurisdiction';
        this.jurisdiction.area = dataJurisdiction.area
        this.jurisdiction.position.x = dataJurisdiction.astre.Xposition / this.scale;
        this.jurisdiction.position.y = dataJurisdiction.astre.Yposition / this.scale;
        this.jurisdiction.position.z = dataJurisdiction.astre.Zposition / this.scale;
        this.system.add(this.jurisdiction);
        this.createPlanet(dataJurisdiction)
        this.createMoons(dataJurisdiction.moons)
        createOrbit(this.system, this.scale, dataJurisdiction.astre.Xposition, dataJurisdiction.astre.Zposition, dataJurisdiction.astre.color)
      }
    }
  }
  createPlanet(dataJurisdiction){
    this.loadTexture = dataJurisdiction.astre.texture;
    this.texture = new THREE.TextureLoader().load('textures/' + this.loadTexture);
    this.astreMesh = new THREE.Mesh(
        this.geometrySphere,
        new THREE.MeshPhongMaterial({map: this.texture})
    );
    this.astreMesh.name = dataJurisdiction.id
    this.astreMesh.scale.set(0.5,0.5,0.5);
    this.jurisdiction.add(this.astreMesh);
    this.jurisdictionsMesh.push(this.astreMesh);
    this.jurisdictions.push(this.jurisdiction);

  }
  createMoons(dataMoons){
    for(const dataMoon of dataMoons ){
      if(dataMoon.texture !== null){
        this.moon = new THREE.Group();
        this.moon.name = dataMoon.name;
        this.moon.position.x = dataMoon.Xposition;
        this.moon.position.y = dataMoon.Yposition;
        this.moon.position.z = dataMoon.Zposition;
        this.jurisdiction.add(this.moon);

        this.loadTextureMoon = dataMoon.texture;
        this.textureMoon = new THREE.TextureLoader().load('textures/' + this.loadTextureMoon);
        this.moonMesh = new THREE.Mesh(
            this.geometrySphere,
            new THREE.MeshPhongMaterial({map: this.textureMoon})
        );
        this.moonMesh.name = dataMoon.name + " Mesh"
        this.moonMesh.scale.set(0.15,0.15,0.15);
        this.moon.add(this.moonMesh);
        // createOrbit(this.juridiction, this.scale, dataMoon.Xposition * this.scale, dataMoon.Zposition * this.scale , dataMoon.color)
      }
    }
  }
}

