varying vec2 vUv;
uniform float uTime;
varying float vTime;
varying vec3 vPosition;

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vPosition = position;
    vUv = uv;
    vTime = uTime;
}