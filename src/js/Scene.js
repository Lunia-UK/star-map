import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';
import System from './system';

export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;
  }

  init(){
    this.scene = new THREE.Scene();

    //Camera 
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / innerHeight, 0.01, 1000);
    this.camera.position.set(0, 0, 50)

    //Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.7)
    this.scene.add(pointLight)

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.maxDistance = 800

    //Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.system = new System(this.scene);
    this.system.init()
    this.initDatGUI();
    this.animate();
    this.resize();
  }

  initDatGUI(){
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x').min(-25).max(25).step(1).name('position x')
    cameraFolder.add(this.camera.position, 'y').min(-25).max(25).step(1).name('position y')
    cameraFolder.add(this.camera.position, 'z').min(10).max(500).step(5).name('position z')
  }

  animate() {
    requestAnimationFrame( () => this.animate(
      // Update controls
      this.controls.update()
    ) );
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