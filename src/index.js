import style from './main.css'
import Scene from './js/scene'

const canvas =  document.querySelector('.canvas');
const scene = new Scene(canvas)
scene.init()

console.log(scene)
