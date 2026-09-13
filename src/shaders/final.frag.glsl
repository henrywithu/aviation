#define GLSLIFY 1
uniform vec3 uBgColor;
uniform float uOpacity;

uniform float uVignetteFrom;
uniform float uVignetteTo;
uniform vec2 uVignetteAspect;
uniform vec3 uVignetteColor;

uniform float uSaturation;
uniform float uContrast;
uniform float uBrightness;

uniform vec3 uTintColor;
uniform float uTintOpacity;

uniform float uSharpenKernelOffset;
uniform float uSharpenOpacity;

uniform float uGamma;

uniform float uGrainAmount;

uniform float uTime;

uniform float uThermalInvert;
uniform vec2 uThermalInvertPos;
uniform vec2 uThermalInvertSize;
uniform vec2 uThermalInvertTargetPos;

float hash13(vec3 p3) {
	p3 = fract(p3 * .1031);
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.x + p3.y) * p3.z);
}

vec3 screen(vec3 cb, vec3 cs) {
	return cb + cs - (cb * cs);
}

vec3 colorDodge(vec3 cb, vec3 cs) {
	return mix(min(vec3(1.0), cb / (1.0 - cs)), vec3(1.0), step(vec3(1.0), cs));
}

vec3 sharpen(sampler2D image, vec2 uv) {
	mat3 kernel = mat3(
		-1, -1, -1,
		-1,  9, -1,
		-1, -1, -1
	);
	float offset = uSharpenKernelOffset;
	vec3 sum = vec3(0.0);
	for (int x = -1; x <= 1; x++) {
		for (int y = -1; y <= 1; y++) {
			sum += texture2D(image, uv + vec2(float(x), float(y)) * offset).rgb * kernel[x + 1][y + 1];
		}
	}
	return sum;
}

vec3 colorVibrancy(vec3 color, float vibrancy, float luma) {
    float maxVal = max(max(color.r, color.g), color.b);
    float minVal = min(min(color.r, color.g), color.b);
    float sat = maxVal - minVal;

    float vibFactor = smoothstep(0.0, 0.5, sat);
    vibFactor = 1.0 + vibrancy * (1.0 - vibFactor);

    vec3 gray = vec3(luma);

    return mix(gray, color, vibFactor);
}

vec3 gammaCorrect(vec3 color, float gamma) {
  return pow(clamp(color, 0.0, 1.0), vec3(1.0 / gamma));
}

vec3 ACESFilm(vec3 x){
	return (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
}

const vec3 ironPalette[10] = vec3[10](
    vec3(1.0, 0.996, 0.957),    // #fffef4 - off-white
    vec3(1.0, 0.855, 0.055),    // #ffda0e - yellow
    vec3(0.961, 0.486, 0.0),    // #f57c00 - orange
    vec3(0.878, 0.216, 0.227),  // #e0373a - red-orange
    vec3(0.690, 0.004, 0.596),  // #b00198 - pink-purple
    vec3(0.486, 0.0, 0.616),    // #7c009d - purple
    vec3(0.290, 0.0, 0.588),    // #4a0096 - purple-blue
    vec3(0.106, 0.0, 0.502),    // #1b0080 - blue
    vec3(0.0, 0.0, 0.290),      // #00004a - dark blue
    vec3(0.0, 0.0, 0.039)       // #00000a - very dark
);

vec3 palette( in float t )
{
    t = clamp(t, 0.0, 1.0);
    float scaledT = t * 9.0; // Scale to 0-9 range (10 colors = 9 intervals)
    int index = int(floor(scaledT));
    float fract = scaledT - float(index);
    
    index = min(index, 8);
    
    return mix(ironPalette[index], ironPalette[index + 1], fract);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
	vec3 sharpenedColor = sharpen(inputBuffer, uv);
	vec3 color = mix(inputColor.rgb, sharpenedColor, uSharpenOpacity);

	float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
	// color = mix(vec3(luma), color, 1.0 + uSaturation);
	color = colorVibrancy(color, uSaturation, luma);
	color = 0.5 + (1.0 + uContrast) * (color - 0.5);
	color += uBrightness;

	float grain = fract(sin(dot(uv, vec2(100.9898 + uTime * 1.1,100.233))) * 43758.5453);
	float darkGrainAmount = uGrainAmount * pow(1. - luma, 3.);
	color += color * (grain - 0.8) * (uGrainAmount + darkGrainAmount);

	color = mix(color, screen(colorDodge(color, uTintColor), uTintColor), uTintOpacity);

	float d = length((uv - 0.5) * uVignetteAspect) * 2.0;
	color = mix(color, uVignetteColor, smoothstep(uVignetteFrom, uVignetteTo, d));
	color += hash13(vec3(gl_FragCoord.xy, uTime)) / 255.0;

	float verticalFalloff = smoothstep(0.25, 0.75, abs(uv.y - 0.5));
	color = mix(color, uVignetteColor, verticalFalloff);

	vec2 boxPos = vec2(uThermalInvertPos.x, 1.0 - uThermalInvertPos.y);
	vec2 targetPos = vec2(uThermalInvertTargetPos.x, 1.0 - uThermalInvertTargetPos.y);
	vec2 halfSize = 0.5 * uThermalInvertSize;
	vec2 boxMin = boxPos - halfSize;
	vec2 boxMax = boxPos + halfSize;
	bool inBox = all(greaterThanEqual(uv, boxMin)) && all(lessThanEqual(uv, boxMax));

	// legend box (inside thermal box, right side, 5% width, full height)
	float legendGap = 0.0;
	float legendWidth = uThermalInvertSize.x * 0.02;
	vec2 legendMax = vec2(boxMax.x - legendGap, boxMax.y);
	vec2 legendMin = vec2(boxMax.x - legendGap - legendWidth, boxMin.y);
	bool inLegend = all(greaterThanEqual(uv, legendMin)) && all(lessThanEqual(uv, legendMax));

	// thermal detection
	if (inBox) {
		float di = 1.0 - smoothstep(0.00, 0.6, distance(uv, targetPos));
		float di2 = 1.0 - smoothstep(0.015, 0.1, distance(uv, targetPos));

		di = pow(di, 24.0);
		di2 = pow(di2, 32.0);

		luma = mix(luma * 0.2, luma, di);
		luma = mix(luma, pow(luma * 7.0, 2.0), di2);

		vec3 thermalColor = palette(1.0 - luma);
		thermalColor = pow(thermalColor, vec3(1.75));

		color = mix(color, thermalColor, uThermalInvert);
	}

	if (inLegend) {
		float legendT = (uv.y - legendMin.y) / (legendMax.y - legendMin.y);
		legendT = pow(legendT * 1.0, 1.75);
		vec3 legendColor = palette(1.0 - legendT);
		legendColor *= vec3(2.0, 1.0, 1.0);	
		legendColor = pow(legendColor, vec3(1.5));

		color = mix(color, legendColor, uThermalInvert);
	}

	float fadeOut = smoothstep(0.0, 1.0 - uOpacity, uv.y);
	color = mix(uBgColor, color, fadeOut);
	color = gammaCorrect(color, uGamma);
	color = mix(color, ACESFilm(color), 0.15);

	outputColor = vec4(vec3(color), 1.0);
}
