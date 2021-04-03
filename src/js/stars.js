import * as THREE from 'three';

export default class Stars {
  constructor(scene) {
    this.scene = scene;
    this.createStar();
  }

  createStar() {
    this.particles = 30000;
    this.particlesGeometry = new THREE.BufferGeometry();
    // let positions = new Float32Array( particles * 3 );
    let positions = [];
    let colors = new Float32Array(this.particles * 3);
    let color = new THREE.Color();
    let n = 2500,
      n2 = n / 2;
    for (let i = 0; i < this.particles; i += 3) {
      let x = Math.random() * n - n2;
      let y = Math.random() * n - n2;
      let z = Math.random() * n - n2;

      let positionVector = new THREE.Vector3(x, y, z);
      let distanceParticules = positionVector.distanceTo(
        new THREE.Vector3(0, 0, 0)
      );

      if (distanceParticules > 400) {
        // position
        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        positions.push = x;
        positions.push = y;
        positions.push = z;

        // colors
        // Blue star
        let br = Math.floor(Math.random() * (255 - 160 + 1) + 160) / 255;
        let bg = 230 / 255;
        let bb = 255 / 255;

        // Red Star
        let rr = 1;
        let rg = Math.floor(Math.random() * (220 - 0 + 1) + 0) / 255;
        let rb = 0;

        let randomRedStar = Math.random();
        if (randomRedStar < 0.3) {
          color.setRGB(rr, rg, rb);
        } else {
          color.setRGB(br, bg, bb);
        }

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
    }
    let positionsParticules = new Float32Array(positions);
    this.particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionsParticules, 3)
    );
    this.particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial();
    particlesMaterial.size = 15;
    particlesMaterial.vertexColors = THREE.VertexColors;
    particlesMaterial.transparent = true;
    particlesMaterial.alphaMap = new THREE.TextureLoader().load('textures/stars/4.png');
    let particleSystem = new THREE.Points(this.particlesGeometry, particlesMaterial);
    this.scene.add(particleSystem);
  }
}
