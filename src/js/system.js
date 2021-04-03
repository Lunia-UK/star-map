import * as THREE from 'three';
import * as dat from 'dat.gui'
import Juridictions from './juridictions'
import Labels from './label'
import GetData from './getData'
import Stars from './stars.js'

export default class System {
  constructor(scene) {
    this.scene = scene
    this.scale = 1300000
  }

  init() {
    this.makeSystem();
    this.makeStar()
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

  makeStar(){
    new Stars(this.scene);
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
        const juridictions = new Juridictions(this.scene, this.system, this.scale, this.geometrySphere);
        const labels = new Labels(this.scene, this.system, this.scale);
        data.getData().then(dataJuridictions => juridictions.createJuridiction(dataJuridictions));
        data.getData().then(dataJuridictions => labels.createLabel(dataJuridictions))
      }
    )
  }
};