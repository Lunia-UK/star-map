import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui';
import System from './system';
import GetData from "./getData";

export default class Scene {
  constructor(canvas, mouse) {
    this.canvas = canvas;
    this.mouse = mouse;
    this.juridictions = [];
    this.juridictionsMesh = [];
    this.labels = [];
    this.currentIntersect = null;
    this.objectFocus = null;
    this.clock = new THREE.Clock();
    this.system = null
  }

  init(){
    this.getData()
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

    this.controls.dampingFactor = 0.1
    this.controls.screenSpacePanning = true
    this.controls.enableZoom = false

    this.controls.rotateSpeed = 0.5

    // this.controls.minDistance = 100;
    this.controls.maxDistance = 500;

    this.controls2 = new TrackballControls(this.camera,  this.canvas);
    this.controls2.noRotate = true;
    this.controls2.noPan = true;
    this.controls2.noZoom = false;
    this.controls2.zoomSpeed = 1.5;
    this.controls2.dynamicDampingFactor = 0.2; // set dampening factor
    // this.controls2 = this.controls;

    // Raycaster
    this.raycaster = new THREE.Raycaster();

    //Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.sortObjects = false;
    this.resize();

    this.controls.addEventListener('change', () => {
      if(this.objectFocus && !this.animationInProgress){
        this.distance = this.camera.position.distanceTo( this.objectFocus.parent.position );
        if (this.distance > 20) {
          this.objectFocus = null
          this.system.typeText.innerText = 'System'
          this.system.systemNameText.innerText = 'Stanton'
        }
      }
    })
  }

  getData() {
    window.addEventListener(
        "DOMContentLoaded",
        () => {
          const data = new GetData();
          this.system = new System(this.scene, this.juridictions, this.juridictionsMesh, this.labels, this.sceneSun);
          data.getData().then((datajurisdictions) => {
            this.system.makeSystem(datajurisdictions)
            this.initDatGUI()
            this.animate(this.juridictions)
            this.click();
          });
        }
    )
  }


  initDatGUI(){
    const gui = new dat.GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x').min(-25).max(25).step(1).name('position x')
    cameraFolder.add(this.camera.position, 'y').min(-25).max(25).step(1).name('position y')
    cameraFolder.add(this.camera.position, 'z').min(-500).max(500).step(5).name('position z')
    const starFolder = gui.addFolder('Star');
    starFolder.add(this.system.sun, 'visible' )
    const asteroidsFolder = gui.addFolder('Asteroids Belt');
    asteroidsFolder.add(this.system.asteroidBelt.asteroidBelt, 'visible' )
    asteroidsFolder.add(this.system.asteroidBelt.size, 'start').min(15).max(22).step(0.5).name('Start Belt')
    asteroidsFolder.add(this.system.asteroidBelt.size, 'stop').min(15).max(22).step(0.5).name('Stop Belt')
    const perlin = gui.addFolder('Perlin');
    perlin.add(this.system.perlin, 'visible' )

  }

  animate() {

    requestAnimationFrame( () => this.animate(
        // Update controls
        this.controls.update()
    ));
    let target = this.controls.target;
    this.controls.update();
    this.controls2.target.set(target.x, target.y, target.z);
    this.controls2.update();

    //Time
    this.elapsedTime = this.clock.getElapsedTime()
    this.system.materialSun.uniforms.uTime.value = this.elapsedTime

    this.system.materialPerlin.uniforms.uTime.value = this.elapsedTime
    this.system.cubeCamera1.update( this.renderer, this.sceneSun );

    this.system.materialSun.uniforms.uPerlin.value = this.system.cubeRenderTarget1.texture;

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const objectToTest = this.juridictionsMesh
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
          if(this.currentIntersect && this.objectFocus !== this.currentIntersect.object)
          {
            this.objectFocus = this.currentIntersect.object;
            let x = this.currentIntersect.object.parent.position.x
            let y = this.currentIntersect.object.parent.position.y
            let z = (this.currentIntersect.object.parent.position.z)
            this.controls.target = new THREE.Vector3(x, y, z)
            const controls = this.controls
            this.system.systemNameText.innerText = this.objectFocus.name
            this.animationInProgress = true
            gsap.to(this.camera.position, {
              duration: 1,
              x:x,
              y:y ,
              z:z +3,
            })
            setTimeout(() => {
              this.animationInProgress = false
            }, 1000);
            this.system.systemNameText.innerText = this.objectFocus.name
            this.system.typeText.innerText = this.objectFocus.parent.type
            this.system.coordsText.innerText = `${this.objectFocus.parent.position.x.toPrecision(8)}, ${this.objectFocus.parent.position.z.toPrecision(8)}`
            this.system.areaText.innerText = this.objectFocus.parent.area
          }
        },
        false
    )
  };
};



