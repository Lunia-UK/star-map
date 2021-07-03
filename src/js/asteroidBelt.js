import * as THREE from 'three';

export default class asteroidBelt {
    constructor(scene) {
        this.scene = scene;
        this.createBelt();
    }

    createBelt() {
        this.particles = 500000;
        this.particlesGeometry = new THREE.BufferGeometry();
        this.positions = new Float32Array( this.particles * 3 );
        this.n = 50
        this.n2 = this.n / 2;
        for (let i = 0; i < this.particles; i += 3) {
            this.x = Math.random() * this.n - this.n2;
            this.y = 0;
            this.z = Math.random() * this.n - this.n2;

            this.positionVector = new THREE.Vector3(this.x, this.y, this.z);
            this.distanceParticules = this.positionVector.distanceTo(
                new THREE.Vector3(0, 0, 0)
            );

            if ( 20 > this.distanceParticules && 19 < this.distanceParticules ) {
                // position
                this.positions[i] = this.x;
                this.positions[i + 1] = this.y;
                this.positions[i + 2] = this.z;

                this.positions.push = this.x;
                this.positions.push = this.y;
                this.positions.push = this.z;
            }
        }
        this.positionsParticules = new Float32Array(this.positions);
        this.particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(this.positionsParticules, 3)
        );
        this.particlesMaterial = new THREE.PointsMaterial();
        this.particlesMaterial.size = 0.2;
        this.particlesMaterial.transparent = true;
        this.particlesMaterial.alphaMap = new THREE.TextureLoader().load('textures/stars/1.png');
        this.asteroidBelt = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.scene.add(this.asteroidBelt);
    }
}
