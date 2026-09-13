#define GLSLIFY 1
varying vec2 vUv;
uniform float uOpacity;
uniform vec3 uColor;
uniform sampler2D uBlueNoiseTexture;
uniform float uHeat;

void main() {
    vec2 blueNoiseTexelSize = vec2(textureSize(uBlueNoiseTexture, 0));
    vec4 blueNoiseSample = texture2D(uBlueNoiseTexture, gl_FragCoord.xy / blueNoiseTexelSize);
    
    float dist = length(vec2(3.0, 2.0) * (vUv - 0.5));
    float circle = smoothstep(0.9, 0.0, dist);
    
    float circleHeat = smoothstep(0.2, 0.0, dist);
    float circleLight = smoothstep(0.3, 0.0, dist);
    vec3 heat = uHeat * (0.03 * vec3(1.0, 0.3, 0.3) * circleHeat + 0.01 * vec3(0.0, 1.0, 1.0) * circleLight);

    gl_FragColor = vec4(0.05 * uColor + 0.25 * heat, uOpacity * circle + blueNoiseSample.x / 255.0);
}