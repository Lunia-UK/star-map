varying vec2 vUv;
uniform float uTime;
varying float vTime;
varying vec3 vPosition;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;
varying vec3 vNormal;


mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c,-s,s,c);
}

void main()
{
    vNormal = normal;

    vec4 worlPosition = modelMatrix * vec4( position, 1.0);
    eyeVector = normalize(worlPosition.xyz - cameraPosition);

    float t = uTime*0.005;

    mat2 rot = rotate(t);
    vec3 p0 = position;
    p0.yz = rot*p0.yz;
    vLayer0 = p0;

    mat2 rot1 = rotate(t + 10.0);
    vec3 p1 = position;
    p1.xz = rot1*p1.xz;
    vLayer1 = p1;

    mat2 rot2 = rotate(t + 30.0);
    vec3 p2 = position;
    p2.xz = rot2*p2.xz;
    vLayer2 = p2;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vPosition = position;
    vUv = uv;
    vTime = uTime;
}