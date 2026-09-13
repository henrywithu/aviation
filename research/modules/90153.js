(e,t,r)=>{r.d(t,{_:()=>d});var n=r(96997),i=r(82752),l=r(48947),a=r(89874),o=r(39107),s=r(38833);let c=parseInt(i.sPf.replace(/\D+/g,"")),u=(0,a.b)({screenspace:!1,color:new i.Q1f("black"),opacity:1,thickness:.05,size:new i.I9Y},`#include <common>
   #include <morphtarget_pars_vertex>
   #include <skinning_pars_vertex>
   #include <clipping_planes_pars_vertex>
   uniform float thickness;
   uniform bool screenspace;
   uniform vec2 size;
   void main() {
     #if defined (USE_SKINNING)
	     #include <beginnormal_vertex>
       #include <morphnormal_vertex>
       #include <skinbase_vertex>
       #include <skinnormal_vertex>
       #include <defaultnormal_vertex>
     #endif
     #include <begin_vertex>
	   #include <morphtarget_vertex>
	   #include <skinning_vertex>
     #include <project_vertex>
     #include <clipping_planes_vertex>
     vec4 tNormal = vec4(normal, 0.0);
     vec4 tPosition = vec4(transformed, 1.0);
     #ifdef USE_INSTANCING
       tNormal = instanceMatrix * tNormal;
       tPosition = instanceMatrix * tPosition;
     #endif
     if (screenspace) {
       vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); 
     } else {
       vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
       vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
       vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
       clipPosition.xy += offset;
       gl_Position = clipPosition;
     }
   }`,`uniform vec3 color;
   uniform float opacity;
   #include <clipping_planes_pars_fragment>
   void main(){
     #include <clipping_planes_fragment>
     gl_FragColor = vec4(color, opacity);
     #include <tonemapping_fragment>
     #include <${c>=154?"colorspace_fragment":"encodings_fragment"}>
   }`);function d({color:e="black",opacity:t=1,transparent:r=!1,screenspace:a=!1,toneMapped:c=!0,polygonOffset:d=!1,polygonOffsetFactor:f=0,renderOrder:h=0,thickness:p=.05,angle:m=Math.PI,clippingPlanes:g,...v}){let y=l.useRef(null),[x]=l.useState(()=>new u({side:i.hsX})),{gl:b}=(0,o.C)(),A=b.getDrawingBufferSize(new i.I9Y);l.useMemo(()=>(0,o.e)({OutlinesMaterial:u}),[]);let w=l.useRef(0),S=l.useRef(null);return l.useLayoutEffect(()=>{let e=y.current;if(!e)return;let t=e.parent;if(t&&t.geometry&&(w.current!==m||S.current!==t.geometry)){var r;w.current=m,S.current=t.geometry;let n=null==(r=e.children)?void 0:r[0];n&&(m&&n.geometry.dispose(),e.remove(n)),t.skeleton?((n=new i.I46).material=x,n.bind(t.skeleton,t.bindMatrix)):t.isInstancedMesh?(n=new i.ZLX(t.geometry,x,t.count)).instanceMatrix=t.instanceMatrix:(n=new i.eaF).material=x,e.add(n),n.geometry=m?(0,s.pb)(t.geometry,m):t.geometry,n.morphTargetInfluences=t.morphTargetInfluences,n.morphTargetDictionary=t.morphTargetDictionary}}),l.useLayoutEffect(()=>{let n=y.current;if(!n)return;let i=n.children[0];if(i){i.renderOrder=h;let l=n.parent;(0,o.s)(i,{morphTargetInfluences:l.morphTargetInfluences,morphTargetDictionary:l.morphTargetDictionary}),(0,o.s)(i.material,{transparent:r,thickness:p,color:e,opacity:t,size:A,screenspace:a,toneMapped:c,polygonOffset:d,polygonOffsetFactor:f,clippingPlanes:g,clipping:g&&g.length>0})}}),l.useEffect(()=>()=>{let e=y.current;if(!e)return;let t=e.children[0];t&&(m&&t.geometry.dispose(),e.remove(t))},[]),l.createElement("group",(0,n.A)({ref:y},v))}}