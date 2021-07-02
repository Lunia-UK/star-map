varying vec2 vUv;
varying float vTime;
varying vec3 vPosition;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;
varying vec3 eyeVector;
varying vec3 vNormal;

uniform samplerCube uPerlin;

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
}


vec3 brightnessToColor(float b){
    b *= 0.40;
    return (vec3(b, b*b, b*b*b*b )/0.25)*0.6;
}

float supersun(){
    float sum = 0.0;
    sum += textureCube(uPerlin,vLayer0).r;
    sum += textureCube(uPerlin,vLayer1).r;
    sum += textureCube(uPerlin,vLayer2).r;
    sum *= 0.33;
    return sum;
}

void main()
{
    float brigthness = supersun();
    brigthness = brigthness*3.0 + 1.0;


    float fres = Fresnel(eyeVector, vNormal);
    brigthness += fres;

    vec3 color = brightnessToColor(brigthness);
    gl_FragColor = vec4(color, 1.0);

}