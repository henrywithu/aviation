#define GLSLIFY 1
uniform sampler2D uRenderTarget;
uniform float uMixFactor;
uniform float uNextSceneProgress;

#define MAX_STRENGTH 0.3

float Exponential_easeInOut(float begin, float change, float duration, float time) {
    if (time == 0.0) return begin;
    if (time == duration) return begin + change;
    float t = time / (duration / 2.0);
    if (t < 1.0) return change / 2.0 * pow(2.0, 10.0 * (t - 1.0)) + begin;
    return change / 2.0 * (-pow(2.0, -10.0 * (t - 1.0)) + 2.0) + begin;
}

float Sinusoidal_easeInOut(float begin, float change, float duration, float time) {
    return -change / 2.0 * (cos(PI * time / duration) - 1.0) + begin;
}

float rand(vec3 scale, float seed) {
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

vec3 crossFade(vec2 texCoord, float dissolve) {
    vec3 fromColor = texture2D(inputBuffer, texCoord).rgb;
    vec3 toColor = texture2D(uRenderTarget, texCoord).rgb;
    return mix(fromColor, toColor, dissolve);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float progress = uMixFactor;
    float fadeOut = 1.0 - smoothstep(0.05, 0.15, uNextSceneProgress);
    
    if (progress <= 0.0 || fadeOut <= 0.0) {
        outputColor = inputColor;
        return;
    }
    
    vec2 center = vec2(0.5);
    float dissolve = Exponential_easeInOut(0.0, 1.0, 1.0, progress);
    
    float strength = Sinusoidal_easeInOut(0.0, MAX_STRENGTH, 0.5, progress);
    
    vec3 color = vec3(0.0);
    float total = 0.0;
    vec2 toCenter = center - uv;
    
    float offset = rand(vec3(12.9898, 78.233, 151.7182), 0.0) * 0.5;
    
    for (float t = 0.0; t <= 20.0; t++) {
        float percent = (t + offset) / 20.0;
        float weight = percent - percent * percent;
        color += crossFade(uv + toCenter * percent * strength, dissolve) * weight;
        total += weight;
    }
    
    vec3 blurred = color / total;
    
    outputColor = vec4(mix(inputColor.rgb, blurred, fadeOut), 1.0);
}

