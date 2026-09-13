import {Group,Mesh,ShaderMaterial,Color,Vector2,Vector3,Texture} from 'three';
import type {GLTF} from 'three/addons/loaders/GLTFLoader.js';
import vert from '../shaders/terrain.vert.glsl?raw';
import frag from '../shaders/terrain.frag.glsl?raw';
import {progress,map,ease} from './timeline';
export class Terrain{
 readonly group=new Group();readonly material:ShaderMaterial;private cityMaterial:ShaderMaterial;private offset=0;private lock=0;private wasThermal=false;
 constructor(model:GLTF,noise:Texture,city:Texture,cityModel:GLTF){const source=model.scene.getObjectByName('Land-A') as Mesh;const base=(source.material as unknown as {map:Texture}).map;
 this.material=new ShaderMaterial({vertexShader:vert,fragmentShader:frag,uniforms:{uResolution:{value:new Vector2()},uDpr:{value:1},uBaseTexture:{value:base},uCityTexture:{value:city},uisCity:{value:false},uHideRatio:{value:0},uBgColor:{value:new Color(0)},uScanRatio:{value:0},uNoiseTexture:{value:noise},uLightingIntensity:{value:.5},uFresnelPower:{value:5},uNoiseInfluence:{value:.15},uNoiseFrequency:{value:48},uLightingMix:{value:.8},uLightDirection:{value:new Vector3(1,1,.8)},uLightColor:{value:new Color('#fff')},uFogStart:{value:12},uFogEnd:{value:32},uFogDensity:{value:1},uFogExponent:{value:1},uFogSkyColor:{value:new Color('#c9e0f7')},uFogBlendFactor:{value:.5}}});
 this.cityMaterial=this.material.clone();this.cityMaterial.uniforms.uisCity.value=true;const cityMesh=cityModel.scene.getObjectByName('Land-A') as Mesh;
 for(let z=0;z<6;z++)for(let x=-1;x<=2;x++){const isCity=x===0&&z===3;const m=new Mesh(isCity?cityMesh.geometry:source.geometry,isCity?this.cityMaterial:this.material);m.scale.setScalar(.04);m.position.set(x*15.99,0,z*15.99);m.userData.z=z*15.99;m.frustumCulled=false;this.group.add(m)}
 }
 update(y:number,dt:number,boost:boolean){const p=progress(1,y),flock=progress(4,y),thermal=progress(6,y),ignition=progress(7,y),ai=progress(8,y);if(thermal>0&&!this.wasThermal)this.lock=this.offset;this.wasThermal=thermal>0;if(thermal===0)this.offset+=2*dt*(.25+.2*p+.2*progress(5,y))*(boost?6:1);const z=thermal>0?this.lock+ease(thermal)*(31.98-this.lock%15.99):this.offset;
 this.group.children.forEach(m=>m.position.z=m.userData.z-(thermal===1?16:z%15.99));const u=this.material.uniforms;u.uHideRatio.value=ease(map(ai,0,.5));u.uFogStart.value=12+12*map(flock,.5,1)+12*thermal;u.uFogEnd.value=32+4*p-4*map(flock,.5,1)+24*thermal;u.uFogDensity.value=(1-p+map(flock,.5,1))*(1-ignition);u.uFogBlendFactor.value=.5-.3*map(flock,.5,1);for(const key of ['uHideRatio','uFogStart','uFogEnd','uFogDensity','uFogBlendFactor'])this.cityMaterial.uniforms[key].value=u[key].value;}
 resize(w:number,h:number,dpr:number){this.material.uniforms.uResolution.value.set(w*dpr,h*dpr);this.material.uniforms.uDpr.value=dpr;this.cityMaterial.uniforms.uResolution.value.set(w*dpr,h*dpr);this.cityMaterial.uniforms.uDpr.value=dpr}
 dispose(){this.material.dispose();this.cityMaterial.dispose()}
}
