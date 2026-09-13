(e,t,r)=>{r.d(t,{Do:()=>i,Fh:()=>d});var n=r(85687),a=r(82752);let i=/\bvoid\s+main\s*\(\s*\)\s*{/g;function o(e){return e.replace(/^[ \t]*#include +<([\w\d./]+)>/gm,function(e,t){let r=n.ShaderChunk[t];return r?o(r):e})}let l=[];for(let e=0;e<256;e++)l[e]=(e<16?"0":"")+e.toString(16);let s=Object.assign||function(){let e=arguments[0];for(let t=1,r=arguments.length;t<r;t++){let r=arguments[t];if(r)for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},f=Date.now(),c=new WeakMap,u=new Map,v=1e10;function d(e,t){let r=function(e){let t=JSON.stringify(e,g),r=m.get(t);return null==r&&m.set(t,r=++p),r}(t),n=c.get(e);if(n||c.set(e,n=Object.create(null)),n[r])return new n[r];let i=`_onBeforeCompile${r}`,b=function(n,a){e.onBeforeCompile.call(this,n,a);let l=this.customProgramCacheKey()+"|"+n.vertexShader+"|"+n.fragmentShader,c=u[l];if(!c){let e=function(e,{vertexShader:t,fragmentShader:r},n,a){let{vertexDefs:i,vertexMainIntro:l,vertexMainOutro:s,vertexTransform:f,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:v,fragmentColorTransform:d,customRewriter:g,timeUniform:p}=n;if(i=i||"",l=l||"",s=s||"",c=c||"",u=u||"",v=v||"",(f||g)&&(t=o(t)),(d||g)&&(r=o(r=r.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,"\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"))),g){let e=g({vertexShader:t,fragmentShader:r});t=e.vertexShader,r=e.fragmentShader}if(d){let e=[];r=r.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,t=>(e.push(t),"")),v=`${d}
${e.join("\n")}
${v}`}if(p){let e=`
uniform float ${p};
`;i=e+i,c=e+c}return f&&(t=`vec3 troika_position_${a};
vec3 troika_normal_${a};
vec2 troika_uv_${a};
${t}
`,i=`${i}
void troikaVertexTransform${a}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${f}
}
`,l=`
troika_position_${a} = vec3(position);
troika_normal_${a} = vec3(normal);
troika_uv_${a} = vec2(uv);
troikaVertexTransform${a}(troika_position_${a}, troika_normal_${a}, troika_uv_${a});
${l}
`,t=t.replace(/\b(position|normal|uv)\b/g,(e,t,r,n)=>/\battribute\s+vec[23]\s+$/.test(n.substr(0,r))?t:`troika_${t}_${a}`),e.map&&e.map.channel>0||(t=t.replace(/\bMAP_UV\b/g,`troika_uv_${a}`))),{vertexShader:t=h(t,a,i,l,s),fragmentShader:r=h(r,a,c,u,v)}}(this,n,t,r);c=u[l]=e}n.vertexShader=c.vertexShader,n.fragmentShader=c.fragmentShader,s(n.uniforms,this.uniforms),t.timeUniform&&(n.uniforms[t.timeUniform]={get value(){return Date.now()-f}}),this[i]&&this[i](n)},y=function(){return _(t.chained?e:e.clone())},_=function(n){let a=Object.create(n,x);return Object.defineProperty(a,"baseMaterial",{value:e}),Object.defineProperty(a,"id",{value:v++}),a.uuid=function(){let e=0xffffffff*Math.random()|0,t=0xffffffff*Math.random()|0,r=0xffffffff*Math.random()|0,n=0xffffffff*Math.random()|0;return(l[255&e]+l[e>>8&255]+l[e>>16&255]+l[e>>24&255]+"-"+l[255&t]+l[t>>8&255]+"-"+l[t>>16&15|64]+l[t>>24&255]+"-"+l[63&r|128]+l[r>>8&255]+"-"+l[r>>16&255]+l[r>>24&255]+l[255&n]+l[n>>8&255]+l[n>>16&255]+l[n>>24&255]).toUpperCase()}(),a.uniforms=s({},n.uniforms,t.uniforms),a.defines=s({},n.defines,t.defines),a.defines[`TROIKA_DERIVED_MATERIAL_${r}`]="",a.extensions=s({},n.extensions,t.extensions),a._listeners=void 0,a},x={constructor:{value:y},isDerivedMaterial:{value:!0},type:{get:()=>e.type,set:t=>{e.type=t}},isDerivedFrom:{writable:!0,configurable:!0,value:function(e){let t=this.baseMaterial;return e===t||t.isDerivedMaterial&&t.isDerivedFrom(e)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return e.customProgramCacheKey()+"|"+r}},onBeforeCompile:{get:()=>b,set(e){this[i]=e}},copy:{writable:!0,configurable:!0,value:function(t){return e.copy.call(this,t),e.isShaderMaterial||e.isDerivedMaterial||(s(this.extensions,t.extensions),s(this.defines,t.defines),s(this.uniforms,a.LlO.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){return _(new e.constructor).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let r=this._depthMaterial;return r||((r=this._depthMaterial=d(e.isDerivedMaterial?e.getDepthMaterial():new a.CSG({depthPacking:a.N5j}),t)).defines.IS_DEPTH_MATERIAL="",r.uniforms=this.uniforms),r}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let r=this._distanceMaterial;return r||((r=this._distanceMaterial=d(e.isDerivedMaterial?e.getDistanceMaterial():new a.aVO,t)).defines.IS_DISTANCE_MATERIAL="",r.uniforms=this.uniforms),r}},dispose:{writable:!0,configurable:!0,value(){let{_depthMaterial:t,_distanceMaterial:r}=this;t&&t.dispose(),r&&r.dispose(),e.dispose.call(this)}}};return n[r]=y,new y}function h(e,t,r,n,a){return(n||a||r)&&(e=e.replace(i,`
${r}
void troikaOrigMain${t}() {`)+`
void main() {
  ${n}
  troikaOrigMain${t}();
  ${a}
}`),e}function g(e,t){return"uniforms"===e?void 0:"function"==typeof t?t.toString():t}let p=0,m=new Map,b=`
uniform vec3 pointA;
uniform vec3 controlA;
uniform vec3 controlB;
uniform vec3 pointB;
uniform float radius;
varying float bezierT;

vec3 cubicBezier(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  float b0 = t2 * t2 * t2;
  float b1 = 3.0 * t * t2 * t2;
  float b2 = 3.0 * t * t * t2;
  float b3 = t * t * t;
  return b0 * p1 + b1 * c1 + b2 * c2 + b3 * p2;
}

vec3 cubicBezierDerivative(vec3 p1, vec3 c1, vec3 c2, vec3 p2, float t) {
  float t2 = 1.0 - t;
  return -3.0 * p1 * t2 * t2 +
    c1 * (3.0 * t2 * t2 - 6.0 * t2 * t) +
    c2 * (6.0 * t2 * t - 3.0 * t * t) +
    3.0 * p2 * t * t;
}
`,y=`
float t = position.y;
bezierT = t;
vec3 bezierCenterPos = cubicBezier(pointA, controlA, controlB, pointB, t);
vec3 bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t));

// Make "sideways" always perpendicular to the camera ray; this ensures that any twists
// in the cylinder occur where you won't see them: 
vec3 viewDirection = normalMatrix * vec3(0.0, 0.0, 1.0);
if (bezierDir == viewDirection) {
  bezierDir = normalize(cubicBezierDerivative(pointA, controlA, controlB, pointB, t == 1.0 ? t - 0.0001 : t + 0.0001));
}
vec3 sideways = normalize(cross(bezierDir, viewDirection));
vec3 upish = normalize(cross(sideways, bezierDir));

// Build a matrix for transforming this disc in the cylinder:
mat4 discTx;
discTx[0].xyz = sideways * radius;
discTx[1].xyz = bezierDir * radius;
discTx[2].xyz = upish * radius;
discTx[3].xyz = bezierCenterPos;
discTx[3][3] = 1.0;

// Apply transform, ignoring original y
position = (discTx * vec4(position.x, 0.0, position.z, 1.0)).xyz;
normal = normalize(mat3(discTx) * normal);
`,_=`
uniform vec3 dashing;
varying float bezierT;
`,x=`
if (dashing.x + dashing.y > 0.0) {
  float dashFrac = mod(bezierT - dashing.z, dashing.x + dashing.y);
  if (dashFrac > dashing.x) {
    discard;
  }
}
`,w=null,E=new a._4j({color:0xffffff,side:a.$EB});class M extends a.eaF{static getGeometry(){return w||(w=new a.Ho_(1,1,1,6,64).translate(0,.5,0))}constructor(){super(M.getGeometry(),E),this.pointA=new a.Pq0,this.controlA=new a.Pq0,this.controlB=new a.Pq0,this.pointB=new a.Pq0,this.radius=.01,this.dashArray=new a.I9Y,this.dashOffset=0,this.frustumCulled=!1}get material(){let e=this._derivedMaterial,t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=E.clone());return e&&e.baseMaterial===t||(e=this._derivedMaterial=d(t,{chained:!0,uniforms:{pointA:{value:new a.Pq0},controlA:{value:new a.Pq0},controlB:{value:new a.Pq0},pointB:{value:new a.Pq0},radius:{value:.01},dashing:{value:new a.Pq0}},vertexDefs:b,vertexTransform:y,fragmentDefs:_,fragmentMainIntro:x}),t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),e.dispose()})),e}set material(e){this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}onBeforeRender(){let{uniforms:e}=this.material,{pointA:t,controlA:r,controlB:n,pointB:a,radius:i,dashArray:o,dashOffset:l}=this;e.pointA.value.copy(t),e.controlA.value.copy(r),e.controlB.value.copy(n),e.pointB.value.copy(a),e.radius.value=i,e.dashing.value.set(o.x,o.y,l||0)}raycast(){}}}