#define GLSLIFY 1
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec2 uResolution;
uniform sampler2D uNoiseTexture;
uniform float uDistortionStrength;
uniform sampler2D map;
uniform float uTime;
uniform float uOpacity;
uniform float uFadeDistance;

#define pow2(x) (x * x)
const float pi = atan(1.0) * 4.0;
const int samples = 51;
const float sigma = float(samples) * 0.15;

float gaussian1D(float x) {
    return exp(-(x * x) / (2.0 * sigma * sigma));
}

vec3 blurH(sampler2D sp, vec2 uv, vec2 scale) {
    vec3 col = vec3(0.0);
    float accum = 0.0;

    for (int i = -samples / 2; i <= samples / 2; i++) {
        float w = gaussian1D(float(i));
        vec2 offset = vec2(float(i) * scale.x, 0.0);

        col += texture2D(sp, uv + offset).rgb * w;
        accum += w;
    }

    return col / accum;
}

vec3 blurV(sampler2D sp, vec2 uv, vec2 scale) {
    vec3 col = vec3(0.0);
    float accum = 0.0;

    for (int i = -samples / 2; i <= samples / 2; i++) {
        float w = gaussian1D(float(i));
        vec2 offset = vec2(0.0, float(i) * scale.y);

        col += texture2D(sp, uv + offset).rgb * w;
        accum += w;
    }

    return col / accum;
}

vec3 blurSeparable(sampler2D sp, vec2 uv, vec2 ps) {
    vec3 h = blurH(sp, uv, ps);
    return blurV(sp, uv, ps); 
}

float sdUnevenCapsule(vec2 p, float r1, float r2, float h) {
    p.x = abs(p.x);
    float b = (r1 - r2) / h;
    float a = sqrt(1.0 - b * b);
    float k = dot(p, vec2(-b, a));

    if (k < 0.0) return length(p) - r1;
    if (k > a * h) return length(p - vec2(0.0, h)) - r2;
    return dot(p, vec2(a, b)) - r1;
}

float pointInTriangle(vec2 p, vec2 v0, vec2 v1, vec2 v2) {

    float edge0 = (p.x - v0.x) * (v1.y - v0.y) - (p.y - v0.y) * (v1.x - v0.x);
    float edge1 = (p.x - v1.x) * (v2.y - v1.y) - (p.y - v1.y) * (v2.x - v1.x);
    float edge2 = (p.x - v2.x) * (v0.y - v2.y) - (p.y - v2.y) * (v0.x - v2.x);
    
    return step(0.0, edge0 * edge1) * step(0.0, edge1 * edge2);
}

void main() {
    vec2 topMiddle = vec2(0.5, 1.0);
    vec2 bottomLeft = vec2(0.0, 0.0);
    vec2 bottomRight = vec2(1.0, 0.0);

    vec2 screenUv = gl_FragCoord.xy / uResolution;

    float d = sdUnevenCapsule(vec2(vUv.x - 0.5, ((vUv.y * 2.0 + sin(uTime *99.) * 0.1) - 0.5 )),
                              0.001, 0.05, 1.5);

    float edge = 0.25;
    float dist = abs(vUv.y - 0.5);
    float alpha = 1.0 - smoothstep(0.5 - edge, 0.5, dist);

    vec4 screenColor = texture2D(map, screenUv);
    vec2 noiseUv = fract(vec2(vUv.x, vUv.y + uTime));
    float noise = texture2D(uNoiseTexture, noiseUv).r;

    vec2 distortion = (vec2(noise, noise) - 0.5) * uDistortionStrength;
    float shake = (noise + sin(uTime * 99.0)) * 0.0001;
    vec2 ps = 1.0 / uResolution;
    vec2 blurPs = vec2(ps.x, ps.y * 0.4 +abs(shake));
    vec3 blurred = blurSeparable(map, screenUv + distortion, blurPs);

    gl_FragColor = vec4(blurred, (-(d * 100.) * alpha ) * uOpacity);
}
