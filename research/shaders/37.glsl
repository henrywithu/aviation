#define GLSLIFY 1
varying vec2 vUv; 
uniform vec3 uBgColor;
uniform float uOpacity;

void main() {
    gl_FragColor.rgb = uBgColor;
    gl_FragColor.a = uOpacity * smoothstep(0.7, 1.0, vUv.y);
}