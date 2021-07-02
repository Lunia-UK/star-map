import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui';
import System from './system';


export default class Scene {
  constructor(canvas, mouse) {
    this.canvas = canvas;
    this.mouse = mouse;
    this.juridictions = [];
    this.labels = [];
    this.currentIntersect = null;
    this.clock = new THREE.Clock();
  }

  init(){
    this.scene = new THREE.Scene();
    this.sceneSun = new THREE.Scene();

    //Camera 
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / innerHeight, 0.01, 2500);
    this.camera.position.set(0, 15, 50)

    //Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.7)
    this.scene.add(pointLight)

    // Controls
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.maxDistance = 800

    // Raycaster
    this.raycaster = new THREE.Raycaster();

    //Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.system = new System(this.scene, this.juridictions, this.labels, this.sceneSun);
    this.system.init();
    this.initDatGUI();
    this.animate();
    this.resize();
    this.click();
  }

  initDatGUI(){
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x').min(-25).max(25).step(1).name('position x')
    cameraFolder.add(this.camera.position, 'y').min(-25).max(25).step(1).name('position y')
    cameraFolder.add(this.camera.position, 'z').min(-500).max(500).step(5).name('position z')
    cameraFolder.add(this.camera.rotation, 'x').min(0).max(10).step(1).name('rotation x')
    cameraFolder.add(this.camera.rotation, 'y').min(0).max(10).step(1).name('rotation y')
    cameraFolder.add(this.camera.rotation, 'z').min(0).max(10).step(1).name('rotation z')
  }

  animate() {
    requestAnimationFrame( () => this.animate(
      // Update controls
      this.controls.update()
    ));

    //Time
    this.elapsedTime = this.clock.getElapsedTime()

    this.system.materialSun.uniforms.uTime.value = this.elapsedTime
    this.system.materialPerlin.uniforms.uTime.value = this.elapsedTime

    this.system.cubeCamera1.update( this.renderer, this.sceneSun );
    this.system.materialSun.uniforms.uPerlin.value = this.system.cubeRenderTarget1.texture;

    this.raycaster.setFromCamera(this.mouse, this.camera)
    
    const objectToTest = this.juridictions
    const intersects = this.raycaster.intersectObjects(objectToTest);
    for(const intersect of intersects) {
      // console.log(intersect);
    }

    if(intersects.length){
      if( this.currentIntersect === null){
          // console.log('enter');
      }
      this.currentIntersect = intersects[0]
  } else {
      if( this.currentIntersect){
        // console.log('leave');
      }
      this.currentIntersect = null
  }

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

  click() {
    window.addEventListener(
      "click",
      () => {
        if(this.currentIntersect)
        { 
          let x = this.currentIntersect.object.position.x
          let y = this.currentIntersect.object.position.y
          let z = (this.currentIntersect.object.position.z)
          this.controls.target = new THREE.Vector3(x, y, z)
          const controls = this.controls
          gsap.to(this.camera.position, {
            duration: 1,
            x:x,
            y:y,
            z:z,
          } )
        }
      },
      false
    )
  };
};