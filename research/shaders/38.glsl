#define GLSLIFY 1
varying vec2 vUv;
void main() {
    vec3 pos = position;
    // pos.x *= 0.4 + 0.6 * uv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
}