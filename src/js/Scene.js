import * as THREE from 'three';
import * as dat from 'dat.gui'

export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;
  }
  init(){
    this.scene = new THREE.Scene();
    //Camera 
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / innerHeight, 0.01, 1000);
    this.camera.position.set(0, 0, 50)

    //Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.makeSystem();
    this.initDatGUI();
    this.animate();
    this.resize();
  }

  makeSystem(){
    // const system = new THREE.Object3D();
    this.geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32);
    this.materialSphere = new THREE.MeshBasicMaterial({color: 0xffff80});
    this.stanton = new THREE.Mesh(this.geometrySphere, this.materialSphere)
    this.scene.add(this.stanton)
  }

  initDatGUI(){
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x').min(-25).max(25).step(1).name('position x')
    cameraFolder.add(this.camera.position, 'y').min(-25).max(25).step(1).name('position y')
    cameraFolder.add(this.camera.position, 'z').min(10).max(150).step(5).name('position z')
    const materialFolder = gui.addFolder('Material');
    materialFolder.add(this.materialSphere, 'wireframe')
  }

  animate() {
    requestAnimationFrame( () => this.animate() );
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    window.addEventListener(
      "resize",
      () => {
        // Update sizes
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Update camera
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        // Update renderer
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      },
      false
    )
  };
};