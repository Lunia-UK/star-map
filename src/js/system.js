import * as THREE from 'three';
import * as dat from 'dat.gui'
import Juridictions from './juridictions'
import GetData from './getData'

export default class System {
  constructor(scene) {
    this.scene = scene
  }

  init() {
    this.makeSystem();
    this.initDatGUI();
    this.animate();
    this.getData();
  }

  makeSystem() {    
    this.system = new THREE.Object3D();
    this.scene.add(this.system)
    this.geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32);
    this.materialSphere = new THREE.MeshBasicMaterial({color: 0xffff80});
    this.stanton = new THREE.Mesh(this.geometrySphere, this.materialSphere)
    this.system.add(this.stanton)
  }

  initDatGUI() {
    const gui = new dat.GUI();
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(this.materialSphere, 'wireframe')
  }

  animate() {
    // this.makeSystem()
  }

  getData() {
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const data = new GetData();
        const juridictions = new Juridictions(this.scene,this.system, this.geometrySphere);
        data.getData().then(dataJuridictions => juridictions.createJuridiction(dataJuridictions));
      }
    )
  }
};