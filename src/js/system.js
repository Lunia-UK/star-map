import * as THREE from 'three';
import * as dat from 'dat.gui'
import Jurisdiction from './jurisdiction'
// import Labels from './label'
import GetData from './getData'
import Stars from './stars.js'
import fragmentShaderSunPerlin from '../shaders/sunPerlin/fragment.glsl'
import vertexShaderSunPerlin from '../shaders/sunPerlin/vertex.glsl'
import fragmentShaderSun from '../shaders/sun/fragment.glsl'
import vertexShaderSun from '../shaders/sun/vertex.glsl'
import asteroidBelt from "./asteroidBelt.js";


export default class System {
  constructor(scene, jurisdictions, jurisdictionsMesh, labels, sceneSun) {
    this.scene = scene
    this.sceneSun = sceneSun
    this.jurisdictions = jurisdictions
    this.jurisdictionsMesh = jurisdictionsMesh
    this.labels = labels
    this.scale = 1300000
  }

  makeSystem(data) {
    this.system = new THREE.Group();
    this.scene.add(this.system);
    this.geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32);
    this.makeStars()
    this.makeStar()
    this.makeAsteroidBelt()
    this.jurisdictions = new Jurisdiction(this.scene, this.system, this.jurisdictions, this.jurisdictionsMesh, this.scale, this.geometrySphere);
    this.jurisdictions.createJuridiction(data.jurisdictions)
    this.typeText = document.querySelector('.type')
    this.typeText.innerText = 'System'
    this.systemNameText = document.querySelector('.systemName')
    this.systemNameText.innerText = data.systemName
    this.coordsText = document.querySelector('.coords')
    this.coordsText.innerText = `${data.coords.lat}, ${data.coords.long}`
    this.areaText = document.querySelector('.area')
    this.areaText.innerText = data.area
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
};