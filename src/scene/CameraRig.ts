import {AnimationMixer,AnimationClip,Group,Object3D} from 'three';
import type {GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {progress} from './timeline';
// These clip names and stage mappings are recovered from the original camera controller.
const cameras:[number,string][]=[[1,'Camera01'],[2,'Camera02'],[3,'Camera03'],[4,'Camera04-02'],[6,'Camera05'],[7,'Camera06'],[9,'Camera07'],[11,'Camera08'],[14,'Camera09']];
export class ClipSampler{
 private mixer:AnimationMixer;
 private clips:Map<string,AnimationClip>;
 constructor(private gltf:GLTF){this.mixer=new AnimationMixer(gltf.scene);this.clips=new Map(gltf.animations.map(c=>[c.name,c]));}
 sample(name:string,p:number){const clip=this.clips.get(name);if(!clip)return;this.mixer.stopAllAction();const a=this.mixer.clipAction(clip);a.play();a.paused=true;a.time=Math.max(0,Math.min(clip.duration-1e-6,clip.duration*p));this.mixer.update(0);}
 node(name:string){return this.gltf.scene.getObjectByName(name)}
 dispose(){this.mixer.stopAllAction();this.mixer.uncacheRoot(this.gltf.scene)}
}
export class CameraRig{
 readonly group=new Group();
 private cam:ClipSampler;private drones:ClipSampler;
 constructor(camera:GLTF,drone:GLTF,private mobile:boolean){this.cam=new ClipSampler(camera);this.drones=new ClipSampler(drone)}
 update(y:number,targets:Object3D[]){
  for(const [i,name] of cameras)if(i===1||progress(i,y)>0){this.cam.sample(name,progress(i,y));const tracker=this.cam.node(this.mobile?'Camera-mobile':'Camera');if(tracker){this.group.position.copy(tracker.position);this.group.quaternion.copy(tracker.quaternion)}}
  const copy=(index:number,name:string,p:number)=>{this.drones.sample(name,p);const suffix=this.mobile?'-mobile':'';const node=this.drones.node((index===0?'Drone':`Drone00${index}`)+suffix)||this.drones.node((index===0?'Drone':`Drone.00${index}`)+suffix);if(node){targets[index].position.copy(node.position);targets[index].quaternion.copy(node.quaternion)}};
  copy(0,'Drone01-01',1);copy(1,'Drone02-01',progress(2,y));copy(2,'Drone03-01',progress(2,y));
  if(progress(3,y)>0)copy(1,'Drone02-02',progress(3,y));if(progress(4,y)>0){copy(1,'Drone02-03',progress(4,y));copy(2,'Drone03-02',progress(4,y))}
 }
 dispose(){this.cam.dispose();this.drones.dispose()}
}
