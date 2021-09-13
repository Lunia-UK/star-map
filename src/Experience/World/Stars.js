import * as THREE from 'three';

export default class Stars {
  constructor(system) {
    this.experience = window.experience
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.systemGroup = system;

    this.createStar();
  }

  createStar() {
    this.particles = {number: 50000};
    this.particlesGeometry = new THREE.BufferGeometry();
    // let positions = new Float32Array( this.particles.number * 3 );
    let positions = [];
    this.colors = new Float32Array(this.particles.number * 3);
    this.color = new THREE.Color();
    this.n = 3500
    this.n2 = this.n / 2;
    for (let i = 0; i < this.particles.number; i += 3) {
      this.x = Math.random() * this.n - this.n2;
      this.y = Math.random() * this.n - this.n2;
      this.z = Math.random() * this.n - this.n2;

      this.positionVector = new THREE.Vector3(this.x, this.y, this.z);
      this.distanceParticules = this.positionVector.distanceTo(
        new THREE.Vector3(0, 0, 0)
      );

      if (this.distanceParticules > 1500) {
        // position
        positions[i] = this.x;
        positions[i + 1] = this.y;
        positions[i + 2] = this.z;

        positions.push = this.x;
        positions.push = this.y;
        positions.push = this.z;

        // colors
        // Blue star
        this.br = Math.floor(Math.random() * (255 - 160 + 1) + 160) / 255;
        this.bg = 230 / 255;
        this.bb = 255 / 255;

        // Red Star
        this.rr = 1;
        this.rg = Math.floor(Math.random() * (220 - 0 + 1) + 0) / 255;
        this.rb = 0;

        this.randomRedStar = Math.random();
        if (this.randomRedStar < 0.1) {
          this.color.setRGB(this.rr, this.rg, this.rb);
        } else {
          this.color.setRGB(this.br, this.bg, this.bb);
        }

        this.colors[i] = this.color.r;
        this.colors[i + 1] = this.color.g;
        this.colors[i + 2] = this.color.b;
      }
    }
    this.positionsParticules = new Float32Array(positions);
    this.particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positionsParticules, 3)
    );
    this.particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(this.colors, 3)
    );
    this.particlesMaterial = new THREE.PointsMaterial();
    this.particlesMaterial.size = 15;
    this.particlesMaterial.vertexColors = THREE.VertexColors;
    this.particlesMaterial.transparent = true;
    this.particlesMaterial.alphaMap = this.resources.items.starsTexture
    this.starsParticles = new THREE.Points(this.particlesGeometry, this.particlesMaterial);

    this.systemGroup.add(this.starsParticles);

    // Debug
    if(this.debug) {
      const starsFolder = this.debug.spaceFolder.addFolder('Stars')
      starsFolder.add(this.starsParticles, 'visible' )
    }
  }
}
