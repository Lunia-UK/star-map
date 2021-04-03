import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { DoubleSide } from 'three'

const scale = 1300000
/**
 * Debug
 */
const gui = new dat.GUI()


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1600)
camera.position.set(0, 25, 50)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxDistance = 800

/**
  * Lights
  */
 
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
//  scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.7)
pointLight.position.x = 0
pointLight.position.z = 0
scene.add(pointLight)



/**
 * Textures
 */

 const textureLoader = new THREE.TextureLoader()
 const crusaderTexture = textureLoader.load('/textures/crusader2.jpg')
 const yelaTexture = textureLoader.load('/textures/yela.jpg')
 const celinTexture = textureLoader.load('/textures/celin.jpg')
 const daymarTexture = textureLoader.load('/textures/daymar.jpg')
 const particleTexture = textureLoader.load('/textures/4.png')
 const nebulaTexture2 = textureLoader.load('/textures/cloud1.png')
 


/**
 * Data
 */
 class Data {
    async getData(){
       try {
           let result = await fetch('/data.json');
           let data = await result.json();
           let dataJuridictions = data.juridiction;
           dataJuridictions = dataJuridictions.map(item => {
                const {astreName, Xposition, Yposition, Zposition, size, texture, color} = item.astre;
                return {astreName, Xposition, Yposition, Zposition, size , texture, color}
           })
           return dataJuridictions;
       } catch (error) {
           console.log(error)
       }
    }
}

class Labels {
    createLabel(dataJuridictions){
        for(const juridiction of dataJuridictions){
            createOrbit(juridiction.Xposition, juridiction.Zposition, juridiction.color)
                function initCircleMaterial( text ) {
                    let canvas = document.createElement( 'canvas' );   
                    canvas.width = 250;
                    canvas.height = 250;
                    let ctx = canvas.getContext( '2d' );
                    ctx.beginPath();
                    ctx.arc(125, 125, 20, 0, 2 * Math.PI);
                    ctx.strokeStyle = juridiction.color;
                    ctx.lineWidth = 4;
                    ctx.stroke();
                    ctx.fillStyle = 'white';
                    ctx.font = `50px Arial`;
                    ctx.textBaseline = 'middle';
                    ctx.fillText( text, 25, 80); 
                    var map = new THREE.CanvasTexture( canvas );   
                    return new THREE.SpriteMaterial( { map } )
                }
                let spriteLabel = new THREE.Sprite( initCircleMaterial(juridiction.astreName));
                spriteLabel.position.set(juridiction.Xposition/ scale , juridiction.Yposition/ scale, juridiction.Zposition / scale);
                spriteLabel.scale.set(4,4,4);
                scene.add( spriteLabel );
        }
    
    }
};

/**
 * Objects
 */
const stantonSystem = new THREE.Object3D();
const geometrySphere = new THREE.SphereBufferGeometry(1, 32, 32)
const stanton = new THREE.Mesh(
    geometrySphere,
    new THREE.MeshBasicMaterial({color: 0xffff80})
 )
stanton.scale.set(0.3,0.3,0.3)
// stanton.position.set(2, 8, 8)
scene.add(stanton)

// CREATE JURIDICATION
let planet;
let juridictions = [];
class Juridictions{
    createJuridiction(dataJuridictions){
        for(const juridiction of dataJuridictions ){
            if(juridiction.texture !== 'none'){
                planet = new THREE.Object3D();
                planet.name = juridiction.astreName;
                planet.position.x = juridiction.Xposition; 
                planet.position.y = juridiction.Xposition;
                planet.position.z = juridiction.Xposition;
                stantonSystem.add(planet);
                juridictions.push(planet)
    
                const loadTexture = juridiction.texture;
                const texture = new THREE.TextureLoader().load('textures/' + loadTexture);
                const astreMesh = new THREE.Mesh(
                    geometrySphere,
                    new THREE.MeshPhongMaterial({map: texture})
                 )
                astreMesh.position.set(juridiction.Xposition / scale, juridiction.Yposition / scale, juridiction.Zposition / scale)
                astreMesh.scale.set(0.3,0.3,0.3)
                scene.add(astreMesh)
            }
        }
    }
}

function zoom() {
    let coordX = (juridiction.Xposition - camera.position.x)
    let coordZ = (juridiction.Zposition - camera.position.z)
    let vecteur = coordX**2 + coordZ**2
    let racine = Math.sqrt(vecteur)
    let valeur = 50/racine
    let destinationX = coordX*valeur
    let destinationZ = coordZ*valeur
    var tween3 = new TWEEN.Tween(camera.position)
        .to({ x: juridiction.Xposition, y: (juridiction.Yposition) + 50, z: (juridiction.Zposition)+ 100 }, 1500)

        // .to({ x: destinationX, y: juridiction.Yposition, z:  destinationZ }, 1500)
        .start();
    var tween4 = new TWEEN.Tween(controls.target)
        .to({x:juridiction.Xposition, y:juridiction.Yposition ,  z: juridiction.Zposition }, 1500)
        .start();            
    }

document.addEventListener("DOMContentLoaded", ()=> {
    const data = new Data();
    const juridictions = new Juridictions();
    const labels = new Labels();
    data.getData().then(dataJuridictions => labels.createLabel(dataJuridictions))
    data.getData().then(dataJuridictions => juridictions.createJuridiction(dataJuridictions));
})

/**
 * Particles
 */
// Geometry
let particles = 30000;
let particlesGeometry = new THREE.BufferGeometry();
// let positions = new Float32Array( particles * 3 );
let positions = [];
let colors = new Float32Array( particles * 3 );
let color = new THREE.Color();
let n = 2500, n2 = n / 2;
for ( let i = 0; i < particles; i += 3 ) {
    let x = Math.random() * n - n2;
    let y = Math.random() * n - n2;
    let z = Math.random() * n - n2;

    let positionVector = new THREE.Vector3( x, y, z ); 
    let distanceParticules = positionVector.distanceTo(new THREE.Vector3( 0, 0, 0 ))

    if(distanceParticules > 400) {
        // position 
        positions[ i ]     = x;
        positions[ i + 1 ] = y;
        positions[ i + 2 ] = z;

        positions.push = x
        positions.push = y
        positions.push = z
        
        // colors
        // Blue star
        let br = Math.floor(Math.random() * ((255-160)+1) + 160) / 255
        let bg = 230 / 255
        let bb = 255 / 255

        // Red Star
        let rr = 1
        let rg = Math.floor(Math.random() * ((220-0)+1) + 0) /255
        let rb = 0

        let randomRedStar = Math.random()
        if(randomRedStar < 0.3){
            color.setRGB( rr, rg, rb );
        }else{
            color.setRGB( br, bg, bb );
        }

        colors[ i ]     = color.r;
        colors[ i + 1 ] = color.g;
        colors[ i + 2 ] = color.b;
    }
}
let positionsParticules = new Float32Array( positions )
particlesGeometry.setAttribute( 'position', new THREE.BufferAttribute( positionsParticules, 3 ) );
particlesGeometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 15
particlesMaterial.vertexColors = THREE.VertexColors
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
let particleSystem = new THREE.Points( particlesGeometry, particlesMaterial );
scene.add( particleSystem );


/**
 * Cloud
 */
const cloudSize = 1
const cloudgeometry1 = new THREE.PlaneGeometry(1, 1)
const cloudMaterial1 = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});
cloudMaterial1.color= new THREE.Color('rgb(255, 200, 0)')
cloudMaterial1.transparent = true
// cloudMaterial1.side = THREE.DoubleSide
cloudMaterial1.alphaMap = nebulaTexture2

const cloud1 = new THREE.Mesh( cloudgeometry1, cloudMaterial1 );
cloud1.position.set(20416175/scale,0,-33587889/scale);
cloud1.rotation.y = -0.12;
cloud1.rotation.z = 0.5;
scene.add(cloud1);

const cloudgeometry2 = new THREE.PlaneGeometry(cloudSize, cloudSize)
const cloudMaterial2 = new THREE.MeshStandardMaterial();
cloudMaterial2.color= new THREE.Color('rgb(255, 220, 0)')
cloudMaterial2.transparent = true
cloudMaterial2.alphaMap = nebulaTexture2
cloudMaterial2.alphaTest = 0.001

const cloud2 = new THREE.Mesh( cloudgeometry2, cloudMaterial2 );
cloud2.position.set(20416175/scale,0,-33587889/scale);
cloud2.rotation.y = -0.12;
cloud2.rotation.z = 0.2;
scene.add(cloud2);

const cloudgeometry3 = new THREE.PlaneGeometry(cloudSize, cloudSize)
const cloudMaterial3 = new THREE.MeshStandardMaterial();
cloudMaterial3.color= new THREE.Color('rgb(255, 170, 0)')
cloudMaterial3.transparent = true
cloudMaterial3.alphaMap = nebulaTexture2
cloudMaterial3.alphaTest = 0.001

const cloud3 = new THREE.Mesh( cloudgeometry3, cloudMaterial3 );
cloud3.position.set(20416175/scale,0,-33587889/scale);
cloud3.rotation.y = -0.12;
cloud3.rotation.z = 0.8;
scene.add(cloud3);

const cloudgeometry4 = new THREE.PlaneGeometry(cloudSize, cloudSize)
const cloudMaterial4 = new THREE.MeshStandardMaterial();
cloudMaterial4.color= new THREE.Color('rgb(255, 130, 0)')
cloudMaterial4.transparent = true
cloudMaterial4.alphaMap = nebulaTexture2
cloudMaterial4.alphaTest = 0.001

const cloud4 = new THREE.Mesh( cloudgeometry4, cloudMaterial4 );
cloud4.position.set(20216175/scale,0,-33287889/scale);
cloud4.rotation.y = -0.12;
cloud4.rotation.z = 1.2
scene.add(cloud4);
// for(let p=0; p<5; p++) {

//     let cloud = new THREE.Mesh(cloudgeometry,cloudMaterial);
//     cloud.position.set(
//       0,
//       0,
//       (Math.random()* (0.9 + 0.8) + 0.8 ) * -300
//     );
//     let r = 1
//     let g = Math.floor(Math.random() * ((220-0)+1) + 0)
//     let b = 0
    
//     cloudMaterial.color = new THREE.Color(`rgb(${r}, ${g}, ${b})`)
//     cloudMaterial.transparent = true
//     cloudMaterial.alphaMap = nebulaTexture2
//     cloudMaterial.alphaTest = 0.001
//     console.log(cloud.position)
//     // cloud.rotation.x = 1.16;
//     cloud.rotation.y = -0.12;
//     cloud.rotation.z = Math.random()*360;
//     cloud.material.opacity = 0.6;
//     scene.add(cloud);
// }




/**
 * Environement
 */
// const environementMaterial = new THREE.MeshBasicMaterial({map: environementTexture, side: THREE.BackSide})
// const geometrySphereEnvironement = new THREE.SphereBufferGeometry(1200, 45, 45)

// const environement = new THREE.Mesh(
//     geometrySphereEnvironement,
//     environementMaterial
//  )
// scene.add(environement)


const createOrbit = (x, z, color) => {
    const raduis = Math.sqrt((x)**2 + (z)**2) / scale
    const curveCelinOrbit = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        raduis, raduis,           // xRadius, yRadius
        0,  2 * Math.PI,  // aStartAngle, aEndAngle
        false,            // aClockwise
        0                 // aRotation
    );
    const pointsCelinOrbit = curveCelinOrbit.getPoints( 100 );
    const geometryCelinOrbit = new THREE.BufferGeometry().setFromPoints( pointsCelinOrbit );
    
    const materialCelinOrbit = new THREE.LineBasicMaterial( { color : color } );
    
    
    const orbit = new THREE.Line( geometryCelinOrbit,materialCelinOrbit );
    orbit.rotateX(Math.PI/2)
    scene.add(orbit)
}

/**
 * Models
 */
 const gltfLoader = new GLTFLoader()
 gltfLoader.load(
    '/obj/kareah.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.01, 0.01, 0.01)
        gltf.scene.position.set(-12,-0.5,-18.5)
        gltf.scene.rotateX(Math.PI / 10)
        scene.add(gltf.scene)
    }  
)

//  groupCrusader.position.x = -25




//  const iconCrusader = document.querySelector('.iconCrusader')
//  const displayCrusader = () => {
//     gsap.to(camera.position, {duration: 1, x:-24, y:1, z:7})
//     gsap.to(controls.target, {duration: 1, x:-24, y:0, z:0})
//     // controls.target.set(-25,0,0)
//     iconCrusader.style.opacity = 0
//     scene.add(groupCrusader)
//     // scene.remove(crusaderOrbit)
//     crusaderOrbit.material.opacity = 0.2;  ;
//     const infoBox = document.querySelector('.info')
//     infoBox.style.display = 'flex';
//     infoBox.style.opacity = '1';
//     const img = document.createElement('img')
//     infoBox.appendChild(img)
//     img.setAttribute("src", "/img/CrusaderIndustries.svg");

//     const title = document.createElement('h1')
//     title.innerText = 'Crusader Industrie'
//     infoBox.appendChild(title)

//     const infoDistanceStar = document.createElement('p')
//     infoDistanceStar.innerText = 'Distance to Stanton : 50M km'
//     infoBox.appendChild(infoDistanceStar)

//     const infoMoon = document.createElement('p')
//     infoMoon.innerText = 'Moons : 3'
//     infoBox.appendChild(infoMoon)
    
//  }

//  iconCrusader.addEventListener('click', displayCrusader)

 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// scene.fog = new THREE.FogExp2(0x03544e, 0.002);
// renderer.setClearColor(scene.fog.color);
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()