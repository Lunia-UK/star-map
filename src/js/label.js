import * as THREE from 'three';

export default class Labels {
  constructor(juridiction, labels, scale, data) {
    this.juridiction = juridiction
    this.labels = labels
    this.scale = scale
    this.data = data
    this.createLabel(this.data)
  }

  createLabel(data){
      function initCircleMaterial( text ) {
        let canvas = document.createElement( 'canvas' );
        canvas.width = 160;
        canvas.height = 80;
        let ctx = canvas.getContext( '2d' );
        ctx.fillStyle = 'white';
        ctx.font = `25px Azonix`;
        ctx.textBaseline = 'left';
        ctx.fillText( text, 0, 20);
        let map = new THREE.CanvasTexture( canvas );
        return new THREE.SpriteMaterial( { map } )
      }
      this.spriteLabel = new THREE.Sprite( initCircleMaterial( data.id));
      this.spriteLabel.name = data.id + " Label"
      this.spriteLabel.transparent = true
      this.spriteLabel.scale.set(1.5,1.5,1.5);
      this.juridiction.add( this.spriteLabel );
  }
}