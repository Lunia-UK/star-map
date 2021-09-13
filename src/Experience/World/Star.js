import * as THREE from 'three'
import Time from '../Utils/Time'

import vertexShaderSun from "../../shaders/sun/vertex.glsl";
import fragmentShaderSun from "../../shaders/sun/fragment.glsl";
import vertexShaderSunPerlin from "../../shaders/sunPerlin/vertex.glsl";
import fragmentShaderSunPerlin from "../../shaders/sunPerlin/fragment.glsl";

export default class Star {
    constructor(systemGroup, data, _options) {
        this.experience = window.experience
        this.config = this.experience.config
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.sceneSun = this.experience.sceneSun
        this.debug = this.experience.debug
        this.system = systemGroup
        this.data = data
        this.time = new Time()
        this.setStar()
    }

    setStar() {
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
        this.sun.scale.set(12,12,12)
        this.system.add(this.sun)

        this.cubeRenderTarget1 = new THREE.WebGLCubeRenderTarget( 256, {
            format: THREE.RGBFormat,
            generateMipmaps: true,
            minFilter: THREE.LinearMipmapLinearFilter,
            encoding: THREE.sRGBEncoding
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

        this.time.on('tick', () => {
            this.materialSun.uniforms.uTime.value = this.time.elapsed / 1000
            this.materialPerlin.uniforms.uTime.value = this.time.elapsed / 1000
            this.cubeCamera1.update( this.renderer.instance, this.sceneSun );
            this.materialSun.uniforms.uPerlin.value = this.cubeRenderTarget1.texture;
        })

        // Debug
        if(this.debug) {
            const starFolder = this.debug.spaceFolder.addFolder(this.data.systemName)
            starFolder.add(this.sun, 'visible' )
        }
    }

    resize() {
    }

    update() {

    }

    destroy() {
        this.time.off('tick')
    }
}