#define GLSLIFY 1
varying vec2 vUv;
uniform sampler2D map;
uniform float uTime;
uniform sampler2D uNoiseTexture;
uniform vec2 uResolution;
uniform float uOpacity;
uniform float uFadeDistance;
uniform float uDistortionStrength;
uniform float uNoiseSpeed;

vec3 chromaticAberration(vec2 uv, sampler2D tDiffuse, float amount) {
    vec2 center = vec2(0.5);

    float dist = distance(uv, center);

    float strength = pow(dist, 2.0) * amount;

    vec2 direction = normalize(uv - center);

    vec2 rOffset = direction * strength * 1.0;
    vec2 bOffset = direction * strength * -1.0;

    float r = texture2D(tDiffuse, uv + rOffset).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv + bOffset).b;

    return vec3(r, g, b);
}

vec3 blur(sampler2D tex, vec2 uv, float radius) {
    vec3 sum = vec3(0.0);
    float total = 0.0;

    for(int x = -1; x <= 1; x++) {
        for(int y = -1; y <= 1; y++) {
            vec2 offset = vec2(float(x), float(y)) * radius / uResolution;
            sum += texture2D(tex, uv + offset).rgb;
            total += 1.0;
        }
    }

    return sum / total;
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
    vec2 center = vec2(0.5);
    float dist = distance(center, vUv);
    float gradient = 1.0 - smoothstep(0.0, uFadeDistance, dist * 6.);

    vec4 noise = texture2D(uNoiseTexture, fract(vec2(vUv.x + sin(uTime * 20.), vUv.y - uTime * uNoiseSpeed)));
    vec3 glowColor = vec3(0.0, 0.7, 0.6);

    vec2 distortion = (noise.rg - 0.5) * uDistortionStrength * gradient;

    vec2 distortedScreen = screenUv + distortion;
    vec4 sceneColor = texture2D(map, distortedScreen);
    // keep the crispy refraction (distorted scene); drop the blur ("blurryness")
    vec3 finalColor = sceneColor.rgb;
    // finalColor += chromaticAberration(distortedScreen, map, noise.r * 0.05) * gradient;

    // keep the interior opaque (the processed/"crispy" layer over the drone)
    // but fade only the outer border so there's no hard rectangular edge
    float edge = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    gl_FragColor = vec4(finalColor, smoothstep(0.0, 0.08, edge));
}
