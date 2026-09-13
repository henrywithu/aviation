import {LoadingManager,TextureLoader,RepeatWrapping,SRGBColorSpace} from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
export const manager=new LoadingManager();
const draco=new DRACOLoader(manager).setDecoderPath('/assets/draco/');
export const gltfLoader=new GLTFLoader(manager).setDRACOLoader(draco);
export const loadModel=(name:string)=>gltfLoader.loadAsync('/assets/models/'+name+'.glb');
export async function loadTexture(path:string,repeat=false,srgb=false){const t=await new TextureLoader(manager).loadAsync('/assets/'+path);if(repeat)t.wrapS=t.wrapT=RepeatWrapping;if(srgb)t.colorSpace=SRGBColorSpace;t.anisotropy=4;return t}
