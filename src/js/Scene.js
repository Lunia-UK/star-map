import * as THREE from 'three';

export default class Scene {
  constructor(canvas) {
    this.canvas = canvas;
  }
  init(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / innerHeight, 0.01, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.animate();
    this.resize();
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