import {makeDroneNumber} from './DroneNumber';
import {Group,Mesh,MeshStandardMaterial,Texture,ShaderMaterial,Vector2,Color,CylinderGeometry,CanvasTexture,WebGLRenderer,MeshBasicMaterial,AdditiveBlending} from 'three';
import type {GLTF} from 'three/addons/loaders/GLTFLoader.js';
import engineVert from '../shaders/engine.vert.glsl?raw';
import engineFrag from '../shaders/engine.frag.glsl?raw';
const aces='vec3 ACESFilm(vec3 x){return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.0,1.0);}';
export class Drone{
 readonly root=new Group();readonly motion=new Group();readonly model=new Group();readonly engine:ShaderMaterial;
 constructor(source:GLTF,env:Texture,noise:Texture,index:number,renderer:WebGLRenderer){this.root.add(this.motion);this.motion.add(this.model);this.model.scale.setScalar(100);const body=(source.scene.getObjectByName('USAvionix_geo') as Mesh).material as MeshStandardMaterial;const material=body.clone();material.envMap=env;material.roughness=1;material.metalness=1;material.envMapIntensity=1.5;
 material.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\n'+aces).replace('#include <dithering_fragment>',`vec3 texColor = texture2D(map,vMapUv).rgb;gl_FragColor*=0.4;float isWhiteLine=step(.325,texColor.r)*step(.325,texColor.g)*step(.325,texColor.b);float luminance=dot(gl_FragColor.rgb,vec3(.299,.587,.114)*2.);float highlightBoost=smoothstep(.2,1.,luminance)*10.;gl_FragColor.rgb*=1.+highlightBoost*(1.-isWhiteLine);gl_FragColor.rgb=pow(gl_FragColor.rgb,vec3(1.2));gl_FragColor.rgb=ACESFilm(gl_FragColor.rgb);#include <dithering_fragment>`.replace('#include','\n#include'))};
 for(const name of ['USAvionix_geo','USAvionix_decals','USAvionix_turbine']){const original=source.scene.getObjectByName(name) as Mesh;const mesh=original.clone();mesh.material=name==='USAvionix_geo'?material:(original.material as MeshStandardMaterial).clone();if(name==='USAvionix_turbine'){const m=mesh.material as MeshStandardMaterial;m.envMap=env;m.envMapIntensity=.5;m.metalness=1;m.roughness=.4;m.emissive=new Color('#fff');m.emissiveIntensity=1}this.model.add(mesh)}
 const number=source.scene.getObjectByName('USAvionix_number') as Mesh;const target=makeDroneNumber(renderer,index+1);const n=number.clone();n.material=new MeshBasicMaterial({color:'#ddd',alphaMap:target.texture,transparent:true,blending:AdditiveBlending,depthWrite:false});this.model.add(n);
 this.engine=new ShaderMaterial({vertexShader:engineVert,fragmentShader:engineFrag,uniforms:{uTime:{value:0},uSceneTexture:{value:null},uResolution:{value:new Vector2(1280,720)},uDistortionStrength:{value:.02},uNoiseTexture:{value:noise},uSpeedMultiplier:{value:0},isMobile:{value:true}},transparent:true,depthWrite:false});const flame=new Mesh(new CylinderGeometry(.025,.1,1,8,20,true),this.engine);flame.position.set(.000613,.001914,1.368548);flame.rotation.set(-Math.PI/2,0,0);this.model.add(flame);
 }
 update(t:number,boost:boolean){this.engine.uniforms.uTime.value=t;this.engine.uniforms.uSpeedMultiplier.value=boost?1:0}
 dispose(){this.model.traverse(o=>{if(o instanceof Mesh){const m=Array.isArray(o.material)?o.material:[o.material];m.forEach(x=>x.dispose())}})}
}
