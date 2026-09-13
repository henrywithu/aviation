import {Color,Vector2,WebGLRenderer,Scene,Camera} from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import fragment from '../shaders/final.frag.glsl?raw';
export class PostProcessing{
 readonly composer:EffectComposer;readonly pass:ShaderPass;
 constructor(renderer:WebGLRenderer,scene:Scene,camera:Camera){this.composer=new EffectComposer(renderer);this.composer.addPass(new RenderPass(scene,camera));this.composer.addPass(new OutputPass());this.pass=new ShaderPass({uniforms:{inputBuffer:{value:null},uBgColor:{value:new Color(0)},uOpacity:{value:1},uVignetteFrom:{value:0},uVignetteTo:{value:1},uVignetteAspect:{value:new Vector2()},uVignetteColor:{value:new Color(0)},uSaturation:{value:.3},uContrast:{value:.02},uBrightness:{value:.02},uTintColor:{value:new Color('#092b3b')},uTintOpacity:{value:.06},uGamma:{value:1.1},uSharpenKernelOffset:{value:.00014},uSharpenOpacity:{value:.3},uGrainAmount:{value:.25},uTime:{value:0},uThermalInvert:{value:0},uThermalInvertPos:{value:new Vector2(.5,.5)},uThermalInvertSize:{value:new Vector2(.3,.35)},uThermalInvertTargetPos:{value:new Vector2(.5,.5)}},vertexShader:'varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform sampler2D inputBuffer; varying vec2 vUv;\n'+fragment+'\nvoid main(){mainImage(texture2D(inputBuffer,vUv),vUv,gl_FragColor);}'},'inputBuffer');this.composer.addPass(this.pass)}
 resize(w:number,h:number){this.composer.setSize(w,h);const n=h/Math.sqrt(w*w+h*h);this.pass.uniforms.uVignetteAspect.value.set(w/h*n,n)}
 render(t:number,thermal:number){this.pass.uniforms.uTime.value=t;this.pass.uniforms.uThermalInvert.value=thermal;this.composer.render()}
 dispose(){this.composer.dispose();this.pass.dispose()}
}
