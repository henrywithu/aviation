#define GLSLIFY 1
varying vec2 vUv;
uniform sampler2D uBlurredScene;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;

float sdUnevenCapsule( vec2 p, float r1, float r2, float h ) {
    p.x = abs(p.x);
    float b = (r1-r2)/h;
    float a = sqrt(1.0-b*b);
    float k = dot(p,vec2(-b,a));
    if( k < 0.0 ) return length(p) - r1;
    if( k > a*h ) return length(p-vec2(0.0,h)) - r2;
    return dot(p, vec2(a,b) ) - r1;
}

void main() {
    vec2 screenUv = gl_FragCoord.xy / uResolution;

    float d = sdUnevenCapsule(vec2(1.0 + 0.025 * sin(64.0 * uTime), 0.5 + 0.01 * sin(32.0 * uTime)) * (vUv - 0.5), uOpacity * 0.1 + 0.1, uOpacity * 0.1 + 0.5, uOpacity * 0.1 + 0.4);
    float alpha = smoothstep(0., -0.1, d);
    float distortion = sin(3.14 * mod(d, 0.05) * 40.0 - 90.0 * uTime) * 0.5 + 0.5;
    vec4 blurredScene = texture2D(uBlurredScene, screenUv + 0.001 * distortion);
    vec3 sceneColor = pow(blurredScene.rgb, vec3(2.2));

    gl_FragColor.rgb =  uColor * 0.5 * pow(vUv.y, 4.0) + (0.5 + 0.5 * uColor) * sceneColor ;
    gl_FragColor.a = alpha * smoothstep(0.0, 0.1, uOpacity);
}