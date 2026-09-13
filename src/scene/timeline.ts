import Lenis from 'lenis';
export const stageNames=['intro-scene','delta-drone','swarm-scene','mission-preset','flock-scene','real-time-detection','thermal-irregularity','ignition-verified','phalanx-ai','analysis-evaluation','integrated-notifications','interdrone-coordination','extra-support','zone-stabilized','multi-threat-response'] as const;
export const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
export const map=(v:number,a:number,b:number,c=0,d=1)=>c+(d-c)*clamp((v-a)/(b-a));
export const ease=(v:number)=>v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;
export const stageStart=(i:number,h=window.innerHeight)=>i===0?0:1+(i-1)*5*h-(i>13?4*h:0);
export const stageHeight=(i:number,h=window.innerHeight)=>i===0?1:(i===13?1:5)*h;
export const sceneEnd=(h=window.innerHeight)=>stageStart(14,h)+5*h;
export function progress(i:number,y=window.scrollY){return clamp((y-stageStart(i))/stageHeight(i))}
export function currentStage(y=window.scrollY){let i=0;while(i<14&&y>=stageStart(i+1))i++;return i}
let lenis:Lenis|undefined;
export function goToStage(i:number){const target=i===0?0:stageStart(i)+stageHeight(i);lenis?.scrollTo(target,{duration:3,easing:v=>v})}
export function createScroll(){lenis=new Lenis({lerp:.1,smoothWheel:true});return lenis}
export function scrollTo(y:number){lenis?.scrollTo(y,{duration:1.5})}
