import * as THREE from 'three';
import createOrbit from './orbit'

export default class Labels {
  constructor(scene, system, scale) {
    this.scene = scene
    this.system = system
    this.scale = scale
  }

  createLabel(dataJuridictions){
    for(const juridiction of dataJuridictions){
      createOrbit(this.scene, this.scale, juridiction.Xposition, juridiction.Zposition, juridiction.color)
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
        spriteLabel.position.set(juridiction.Xposition/ this.scale , juridiction.Yposition/ this.scale, juridiction.Zposition / this.scale);
        spriteLabel.scale.set(4,4,4);
        this.system.add( spriteLabel );
    }
  }
}