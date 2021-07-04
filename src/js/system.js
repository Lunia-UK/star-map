import * as THREE from 'three';
import * as dat from 'dat.gui'
import Juridictions from './juridictions'
// import Labels from './label'
import GetData from './getData'
import Stars from './stars.js'
import fragmentShaderSunPerlin from '../shaders/sunPerlin/fragment.glsl'
import vertexShaderSunPerlin from '../shaders/sunPerlin/vertex.glsl'
import fragmentShaderSun from '../shaders/sun/fragment.glsl'
import vertexShaderSun from '../shaders/sun/vertex.glsl'
import asteroidBelt from "./asteroidBelt.js";


export default class System {
  constructor(scene, juridictions, juridictionsMesh, labels, sceneSun) {
    this.scene = scene
    this.sceneSun = sceneSun
    this.juridictions = juridictions
    this.juridictionsMesh = juridictionsMesh
    this.labels = labels
    this.scale = 1300000
  }

  init() {
    this.makeSystem();
    this.getData();
  }

  makeSystem() {    
    this.system = new THREE.Group();
    this.scene.add(this.system);
    this.geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32);
    this.makeStars()
    this.makeStar()
    this.makeAsteroidBelt()
  }

  makeAsteroidBelt(){
    this.asteroidBelt = new asteroidBelt(this.system)
  }

  makeStar() {
    this.geometryStar = new THREE.SphereGeometry(1, 32, 32)

    this.materialSun = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSun,
      fragmentShader: fragmentShaderSun,
      uniforms: {
        uTime: {value: 0},
        uPerlin: {value: null},
      },
      side: THREE.DoubleSide,

    })

    this.sun = new THREE.Mesh(this.geometryStar, this.materialSun)
    this.system.add(this.sun)

    this.cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget( 256, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
      encoding: THREE.sRGBEncoding // temporary -- to prevent the material's shader from recompiling every frame
    } );

    this.cubeCamera1 = new THREE.CubeCamera( 0.1, 10, this.cubeRenderTarget1 );

    this.materialPerlin = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSunPerlin,
      fragmentShader: fragmentShaderSunPerlin,
      uniforms: {
        uTime: {value: 0},
      },
      side: THREE.DoubleSide,

    })

    this.perlin = new THREE.Mesh(this.geometryStar, this.materialPerlin)
    this.sceneSun.add(this.perlin)
  }

  makeStars() {
    this.stars = new Stars(this.system);
  }

  getData() {
    window.addEventListener(
      "DOMContentLoaded",
      () => {
        const data = new GetData();
        const juridictions = new Juridictions(this.scene, this.system, this.juridictions, this.juridictionsMesh, this.scale, this.geometrySphere);
        // const labels = new Labels(this.scene, this.system, this.labels, this.scale);
        data.getData().then(dataJuridictions => juridictions.createJuridiction(dataJuridictions));
        // data.getData().then(dataJuridictions => labels.createLabel(dataJuridictions));
      }
    )
  }
};