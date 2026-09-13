import fs from 'node:fs';
import path from 'node:path';
import {parse} from '@babel/parser';
const out='research/modules';fs.mkdirSync(out,{recursive:true});
function walk(n,fn){if(!n||typeof n!=='object')return;fn(n);for(const [k,v]of Object.entries(n)){if(k==='loc')continue;if(Array.isArray(v))v.forEach(x=>walk(x,fn));else if(v&&typeof v==='object')walk(v,fn)}}
let shaders=[];
for(const file of fs.readdirSync('research/original/_next/static/chunks',{recursive:true}).filter(x=>x.endsWith('.js'))){const source=fs.readFileSync(path.join('research/original/_next/static/chunks',file),'utf8');const ast=parse(source);walk(ast,n=>{if(n.type==='ObjectProperty'&&n.key.type==='NumericLiteral'&&n.value.type==='ArrowFunctionExpression'){fs.writeFileSync(`${out}/${n.key.value}.js`,source.slice(n.value.start,n.value.end));}if(n.type==='StringLiteral'&&/void main(?:Image)?\s*\(/.test(n.value)){const id=shaders.length;shaders.push({id,file,start:n.start,source:n.value});}})}
fs.mkdirSync('research/shaders',{recursive:true});for(const s of shaders)fs.writeFileSync(`research/shaders/${s.id}.glsl`,s.source);fs.writeFileSync('research/shaders/manifest.json',JSON.stringify(shaders.map(({source,...s})=>s),null,2));console.log('Extracted',shaders.length,'shader strings');
