import {WebGLRenderer,WebGLRenderTarget,Scene,OrthographicCamera,Group,Mesh,MeshBasicMaterial,LinearSRGBColorSpace,LinearFilter,ShapeGeometry} from 'three';
import {FontLoader} from 'three/addons/loaders/FontLoader.js';import fontData from '../data/orbitron.json';
const font=new FontLoader().parse(fontData);
export function makeDroneNumber(renderer:WebGLRenderer,index:number){const target=new WebGLRenderTarget(360,692,{colorSpace:LinearSRGBColorSpace,minFilter:LinearFilter,generateMipmaps:true});const scene=new Scene();const camera=new OrthographicCamera(-180,180,-173,173,.1,100);camera.position.set(0,0,2);camera.lookAt(0,0,0);const geometry=new ShapeGeometry(font.generateShapes('01'+index,114));const text=new Mesh(geometry,new MeshBasicMaterial({color:'#c6c6c6'}));text.rotation.z=1.5*Math.PI;const center=new Group();center.add(text);text.updateMatrixWorld();geometry.computeBoundingBox();
 // Center the rotated glyph geometry as the reference's Center helper does.
 text.position.set(0,0,0);const outer=new Group();outer.add(center);scene.add(outer);
 const box=geometry.boundingBox!;center.position.set(-(box.min.y+box.max.y)/2,(box.min.x+box.max.x)/2,0);outer.position.set(-60,8,0);
 const old=renderer.getRenderTarget();const alpha=renderer.getClearAlpha();renderer.setRenderTarget(target);renderer.setClearAlpha(0);renderer.clear();renderer.render(scene,camera);renderer.setRenderTarget(old);renderer.setClearAlpha(alpha);geometry.dispose();(text.material as MeshBasicMaterial).dispose();return target}
