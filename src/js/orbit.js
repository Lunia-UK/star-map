import * as THREE from 'three';

export default function createOrbit(scene, scale, x, z, color)  {
  const raduis = Math.sqrt((x)**2 + (z)**2) / scale
  const curveOrbit = new THREE.EllipseCurve(
      0,  0,            // ax, aY
      raduis, raduis,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
  );
  const pointsOrbit = curveOrbit.getPoints( 100 );
  const geometryOrbit = new THREE.BufferGeometry().setFromPoints( pointsOrbit );
  
  const materialOrbit = new THREE.LineBasicMaterial( { color : color } );

  const orbit = new THREE.Line( geometryOrbit,materialOrbit );
  orbit.rotateX(Math.PI/2)
  scene.add(orbit)
};