/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.96
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

(function(){"use strict";const{Array:L,Object:v,Math:D,Error:T,Uint8Array:d,Uint16Array:Yt,Uint32Array:Q,Int32Array:Zt,DataView:x,Promise:j,TextEncoder:Y,crypto:C,postMessage:V,TransformStream:S,ReadableStream:At,WritableStream:Bt,CompressionStream:Z,DecompressionStream:$}=globalThis,tt=[];for(let t=0;256>t;t++){let e=t;for(let n=0;8>n;n++)1&e?e=e>>>1^3988292384:e>>>=1;tt[t]=e}class F{constructor(e){this.crc=e||-1}append(e){let n=0|this.crc;for(let s=0,i=0|e.length;i>s;s++)n=n>>>8^tt[255&(n^e[s])];this.crc=n}get(){return~this.crc}}class et extends S{constructor(){super({start(){this.crc32=new F},transform(e){this.crc32.append(e)},flush(e){const n=new d(4);new x(n.buffer).setUint32(0,this.crc32.get()),e.enqueue(n)}})}}const _={concat(t,e){if(t.length===0||e.length===0)return t.concat(e);const n=t[t.length-1],s=_.getPartial(n);return s===32?t.concat(e):_._shiftRight(e,s,0|n,t.slice(0,t.length-1))},bitLength(t){const e=t.length;if(e===0)return 0;const n=t[e-1];return 32*(e-1)+_.getPartial(n)},clamp(t,e){if(32*t.length<e)return t;const n=(t=t.slice(0,D.ceil(e/32))).length;return e&=31,n>0&&e&&(t[n-1]=_.partial(e,t[n-1]&2147483648>>e-1,1)),t},partial:(t,e,n)=>t===32?e:(n?0|e:e<<32-t)+1099511627776*t,getPartial:t=>D.round(t/1099511627776)||32,_shiftRight(t,e,n,s){for(s===void 0&&(s=[]);e>=32;e-=32)s.push(n),n=0;if(e===0)return s.concat(t);for(let a=0;a<t.length;a++)s.push(n|t[a]>>>e),n=t[a]<<32-e;const i=t.length?t[t.length-1]:0,r=_.getPartial(i);return s.push(_.partial(e+r&31,e+r>32?n:s.pop(),1)),s}},W={bytes:{fromBits(t){const e=_.bitLength(t)/8,n=new d(e);let s;for(let i=0;e>i;i++)(3&i)==0&&(s=t[i/4]),n[i]=s>>>24,s<<=8;return n},toBits(t){const e=[];let n,s=0;for(n=0;n<t.length;n++)s=s<<8|t[n],(3&n)==3&&(e.push(s),s=0);return 3&n&&e.push(_.partial(8*(3&n),s)),e}}},nt={sha1:function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()}};nt.sha1.prototype={blockSize:512,reset(){const t=this;return t._h=this._init.slice(0),t._buffer=[],t._length=0,t},update(t){const e=this;typeof t=="string"&&(t=W.utf8String.toBits(t));const n=e._buffer=_.concat(e._buffer,t),s=e._length,i=e._length=s+_.bitLength(t);if(i>9007199254740991)throw new T("Cannot hash more than 2^53 - 1 bits");const r=new Q(n);let a=0;for(let o=e.blockSize+s-(e.blockSize+s&e.blockSize-1);i>=o;o+=e.blockSize)e._block(r.subarray(16*a,16*(a+1))),a+=1;return n.splice(0,16*a),e},finalize(){const t=this;let e=t._buffer;const n=t._h;e=_.concat(e,[_.partial(1,1)]);for(let s=e.length+2;15&s;s++)e.push(0);for(e.push(D.floor(t._length/4294967296)),e.push(0|t._length);e.length;)t._block(e.splice(0,16));return t.reset(),n},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(t,e,n,s)=>t>19?t>39?t>59?t>79?void 0:e^n^s:e&n|e&s|n&s:e^n^s:e&n|~e&s,_S:(t,e)=>e<<t|e>>>32-t,_block(t){const e=this,n=e._h,s=L(80);for(let c=0;16>c;c++)s[c]=t[c];let i=n[0],r=n[1],a=n[2],o=n[3],l=n[4];for(let c=0;79>=c;c++){16>c||(s[c]=e._S(1,s[c-3]^s[c-8]^s[c-14]^s[c-16]));const h=e._S(5,i)+e._f(c,r,a,o)+l+s[c]+e._key[D.floor(c/20)]|0;l=o,o=a,a=e._S(30,r),r=i,i=h}n[0]=n[0]+i|0,n[1]=n[1]+r|0,n[2]=n[2]+a|0,n[3]=n[3]+o|0,n[4]=n[4]+l|0}};const Ht={getRandomValues(t){const e=new Q(t.buffer),n=s=>{let i=987654321;const r=4294967295;return()=>(i=36969*(65535&i)+(i>>16)&r,(((i<<16)+(s=18e3*(65535&s)+(s>>16)&r)&r)/4294967296+.5)*(D.random()>.5?1:-1))};for(let s,i=0;i<t.length;i+=4){const r=n(4294967296*(s||D.random()));s=987654071*r(),e[i/4]=4294967296*r()|0}return t}},P={importKey:t=>new P.hmacSha1(W.bytes.toBits(t)),pbkdf2(t,e,n,s){if(n=n||1e4,0>s||0>n)throw new T("invalid params to pbkdf2");const i=1+(s>>5)<<2;let r,a,o,l,c;const h=new ArrayBuffer(i),u=new x(h);let p=0;const w=_;for(e=W.bytes.toBits(e),c=1;(i||1)>p;c++){for(r=a=t.encrypt(w.concat(e,[c])),o=1;n>o;o++)for(a=t.encrypt(a),l=0;l<a.length;l++)r[l]^=a[l];for(o=0;(i||1)>p&&o<r.length;o++)u.setInt32(p,r[o]),p+=4}return h.slice(0,s/8)},hmacSha1:class{constructor(t){const e=this,n=e._hash=nt.sha1,s=[[],[]],i=n.prototype.blockSize/32;e._baseHash=[new n,new n],t.length>i&&(t=n.hash(t));for(let r=0;i>r;r++)s[0][r]=909522486^t[r],s[1][r]=1549556828^t[r];e._baseHash[0].update(s[0]),e._baseHash[1].update(s[1]),e._resultHash=new n(e._baseHash[0])}reset(){const t=this;t._resultHash=new t._hash(t._baseHash[0]),t._updated=!1}update(t){this._updated=!0,this._resultHash.update(t)}digest(){const t=this,e=t._resultHash.finalize(),n=new t._hash(t._baseHash[1]).update(e).finalize();return t.reset(),n}encrypt(t){if(this._updated)throw new T("encrypt on already updated hmac called!");return this.update(t),this.digest(t)}}},st="Invalid password",q=16,rt={name:"PBKDF2"},Kt=v.assign({hash:{name:"HMAC"}},rt),at=v.assign({iterations:1e3,hash:{name:"SHA-1"}},rt),xt=["deriveBits"],A=[8,12,16],B=[16,24,32],R=10,it=[0,0,0,0],ot="undefined",N="function",U=typeof C!=ot,ct=U&&typeof C.subtle!=ot,Wt=U&&typeof C.getRandomValues==N,Pt=U&&ct&&typeof C.subtle.importKey==N,Ut=U&&ct&&typeof C.subtle.deriveBits==N,z=W.bytes,lt=class{constructor(t){const e=this;e._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],e._tables[0][0][0]||e._precompute();const n=e._tables[0][4],s=e._tables[1],i=t.length;let r,a,o,l=1;if(i!==4&&i!==6&&i!==8)throw new T("invalid aes key size");for(e._key=[a=t.slice(0),o=[]],r=i;4*i+28>r;r++){let c=a[r-1];(r%i==0||i===8&&r%i==4)&&(c=n[c>>>24]<<24^n[c>>16&255]<<16^n[c>>8&255]<<8^n[255&c],r%i==0&&(c=c<<8^c>>>24^l<<24,l=l<<1^283*(l>>7))),a[r]=a[r-i]^c}for(let c=0;r;c++,r--){const h=a[3&c?r:r-4];o[c]=4>=r||4>c?h:s[0][n[h>>>24]]^s[1][n[h>>16&255]]^s[2][n[h>>8&255]]^s[3][n[255&h]]}}encrypt(t){return this._crypt(t,0)}decrypt(t){return this._crypt(t,1)}_precompute(){const t=this._tables[0],e=this._tables[1],n=t[4],s=e[4],i=[],r=[];let a,o,l,c;for(let h=0;256>h;h++)r[(i[h]=h<<1^283*(h>>7))^h]=h;for(let h=a=0;!n[h];h^=o||1,a=r[a]||1){let u=a^a<<1^a<<2^a<<3^a<<4;u=u>>8^255&u^99,n[h]=u,s[u]=h,c=i[l=i[o=i[h]]];let p=16843009*c^65537*l^257*o^16843008*h,w=257*i[u]^16843008*u;for(let g=0;4>g;g++)t[g][h]=w=w<<24^w>>>8,e[g][u]=p=p<<24^p>>>8}for(let h=0;5>h;h++)t[h]=t[h].slice(0),e[h]=e[h].slice(0)}_crypt(t,e){if(t.length!==4)throw new T("invalid aes block size");const n=this._key[e],s=n.length/4-2,i=[0,0,0,0],r=this._tables[e],a=r[0],o=r[1],l=r[2],c=r[3],h=r[4];let u,p,w,g=t[0]^n[0],f=t[e?3:1]^n[1],m=t[2]^n[2],y=t[e?1:3]^n[3],b=4;for(let I=0;s>I;I++)u=a[g>>>24]^o[f>>16&255]^l[m>>8&255]^c[255&y]^n[b],p=a[f>>>24]^o[m>>16&255]^l[y>>8&255]^c[255&g]^n[b+1],w=a[m>>>24]^o[y>>16&255]^l[g>>8&255]^c[255&f]^n[b+2],y=a[y>>>24]^o[g>>16&255]^l[f>>8&255]^c[255&m]^n[b+3],b+=4,g=u,f=p,m=w;for(let I=0;4>I;I++)i[e?3&-I:I]=h[g>>>24]<<24^h[f>>16&255]<<16^h[m>>8&255]<<8^h[255&y]^n[b++],u=g,g=f,f=m,m=y,y=u;return i}},ht=class{constructor(t,e){this._prf=t,this._initIv=e,this._iv=e}reset(){this._iv=this._initIv}update(t){return this.calculate(this._prf,t,this._iv)}incWord(t){if((t>>24&255)==255){let e=t>>16&255,n=t>>8&255,s=255&t;e===255?(e=0,n===255?(n=0,s===255?s=0:++s):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=s}else t+=1<<24;return t}incCounter(t){(t[0]=this.incWord(t[0]))===0&&(t[1]=this.incWord(t[1]))}calculate(t,e,n){let s;if(!(s=e.length))return[];const i=_.bitLength(e);for(let r=0;s>r;r+=4){this.incCounter(n);const a=t.encrypt(n);e[r]^=a[0],e[r+1]^=a[1],e[r+2]^=a[2],e[r+3]^=a[3]}return _.clamp(e,i)}},ut=P.hmacSha1;class Et extends S{constructor(e,n,s){let i;super({start(){v.assign(this,{ready:new j(r=>this.resolveReady=r),password:e,signed:n,strength:s-1,pending:new d})},async transform(r,a){const o=this;if(o.password){const c=o.password;o.password=null;const h=k(r,0,A[o.strength]+2);await(async(u,p,w)=>{await ft(u,w,k(p,0,A[u.strength]));const g=k(p,A[u.strength]),f=u.keys.passwordVerification;if(f[0]!=g[0]||f[1]!=g[1])throw new T(st)})(o,h,c),o.ctr=new ht(new lt(o.keys.key),L.from(it)),o.hmac=new ut(o.keys.authentication),r=k(r,A[o.strength]+2),o.resolveReady()}else await o.ready;const l=new d(r.length-R-(r.length-R)%q);a.enqueue(pt(o,r,l,0,R,!0))},async flush(r){const a=this;await a.ready;const o=a.pending,l=k(o,0,o.length-R),c=k(o,o.length-R);let h=new d;if(l.length){const u=K(z,l);a.hmac.update(u);const p=a.ctr.update(u);h=H(z,p)}if(i.valid=!0,a.signed){const u=k(H(z,a.hmac.digest()),0,R);for(let p=0;R>p;p++)u[p]!=c[p]&&(i.valid=!1)}r.enqueue(h)}}),i=this}}class Mt extends S{constructor(e,n){let s;super({start(){v.assign(this,{ready:new j(i=>this.resolveReady=i),password:e,strength:n-1,pending:new d})},async transform(i,r){const a=this;let o=new d;if(a.password){const c=a.password;a.password=null,o=await(async(h,u)=>{const p=(w=new d(A[h.strength]),Wt?C.getRandomValues(w):Ht.getRandomValues(w));var w;return await ft(h,u,p),O(p,h.keys.passwordVerification)})(a,c),a.ctr=new ht(new lt(a.keys.key),L.from(it)),a.hmac=new ut(a.keys.authentication),a.resolveReady()}else await a.ready;const l=new d(o.length+i.length-i.length%q);l.set(o,0),r.enqueue(pt(a,i,l,o.length,0))},async flush(i){const r=this;await r.ready;let a=new d;if(r.pending.length){const o=r.ctr.update(K(z,r.pending));r.hmac.update(o),a=H(z,o)}s.signature=H(z,r.hmac.digest()).slice(0,R),i.enqueue(O(a,s.signature))}}),s=this}}function pt(t,e,n,s,i,r){const a=e.length-i;let o;for(t.pending.length&&(e=O(t.pending,e),n=((l,c)=>{if(c&&c>l.length){const h=l;(l=new d(c)).set(h,0)}return l})(n,a-a%q)),o=0;a-q>=o;o+=q){const l=K(z,k(e,o,o+q));r&&t.hmac.update(l);const c=t.ctr.update(l);r||t.hmac.update(c),n.set(H(z,c),o+s)}return t.pending=k(e,o),n}async function ft(t,e,n){const s=(o=>{if(Y===void 0){const l=new d((o=unescape(encodeURIComponent(o))).length);for(let c=0;c<l.length;c++)l[c]=o.charCodeAt(c);return l}return new Y().encode(o)})(e),i=await((o,l,c,h,u)=>Pt?C.subtle.importKey("raw",l,c,!1,u):P.importKey(l))(0,s,Kt,0,xt),r=await(async(o,l,c)=>Ut?await C.subtle.deriveBits(o,l,c):P.pbkdf2(l,o.salt,at.iterations,c))(v.assign({salt:n},at),i,8*(2*B[t.strength]+2)),a=new d(r);t.keys={key:K(z,k(a,0,B[t.strength])),authentication:K(z,k(a,B[t.strength],2*B[t.strength])),passwordVerification:k(a,2*B[t.strength])}}function O(t,e){let n=t;return t.length+e.length&&(n=new d(t.length+e.length),n.set(t,0),n.set(e,t.length)),n}function k(t,e,n){return t.subarray(e,n)}function H(t,e){return t.fromBits(e)}function K(t,e){return t.toBits(e)}class Lt extends S{constructor(e,n){let s;super({start(){v.assign(this,{password:e,passwordVerification:n}),wt(this,e)},transform(i,r){const a=this;if(a.password){const o=dt(a,i.subarray(0,12));if(a.password=null,o[11]!=a.passwordVerification)throw new T(st);i=i.subarray(12)}r.enqueue(dt(a,i))},flush(){s.valid=!0}}),s=this}}class jt extends S{constructor(e,n){super({start(){v.assign(this,{password:e,passwordVerification:n}),wt(this,e)},transform(s,i){const r=this;let a,o;if(r.password){r.password=null;const l=C.getRandomValues(new d(12));l[11]=r.passwordVerification,a=new d(s.length+l.length),a.set(gt(r,l),0),o=12}else a=new d(s.length),o=0;a.set(gt(r,s),o),i.enqueue(a)},flush(){}})}}function dt(t,e){const n=new d(e.length);for(let s=0;s<e.length;s++)n[s]=yt(t)^e[s],G(t,n[s]);return n}function gt(t,e){const n=new d(e.length);for(let s=0;s<e.length;s++)n[s]=yt(t)^e[s],G(t,e[s]);return n}function wt(t,e){t.keys=[305419896,591751049,878082192],t.crcKey0=new F(t.keys[0]),t.crcKey2=new F(t.keys[2]);for(let n=0;n<e.length;n++)G(t,e.charCodeAt(n))}function G(t,e){t.crcKey0.append([e]),t.keys[0]=~t.crcKey0.get(),t.keys[1]=mt(t.keys[1]+_t(t.keys[0])),t.keys[1]=mt(D.imul(t.keys[1],134775813)+1),t.crcKey2.append([t.keys[1]>>>24]),t.keys[2]=~t.crcKey2.get()}function yt(t){const e=2|t.keys[2];return _t(D.imul(e,1^e)>>>8)}function _t(t){return 255&t}function mt(t){return 4294967295&t}class Ft extends S{constructor(e,n){let s;super({start(){s=new e(n)},transform(i,r){i=s.append(i),r.enqueue(i)},flush(i){const r=s.flush();r&&i.enqueue(r)}})}}const bt="Invalid signature",kt="deflate-raw",vt="undefined",Nt=typeof Z==vt,Ot=typeof $==vt;let St=!0,zt=!0;class Gt extends S{constructor(e,n,{chunkSize:s},...i){super({},...i);const{compressed:r,encrypted:a,useCompressionStream:o,password:l,passwordVerification:c,encryptionStrength:h,zipCrypto:u,signed:p,level:w}=n,g=this;let f,m,y=Tt(super.readable);if(a&&!u||!p||([y,f]=y.tee(),f=f.pipeThrough(new et)),r)if(o!==void 0&&!o||Nt&&!zt)y=E(e,y,{chunkSize:s,level:w});else try{y=y.pipeThrough(new Z(kt))}catch{zt=!1,y=E(e,y,{chunkSize:s,level:w})}a&&(u?y=y.pipeThrough(new jt(l,c)):(m=new Mt(l,h),y=y.pipeThrough(m))),Ct(g,y,async()=>{let b;a&&!u&&(b=m.signature),a&&!u||!p||(b=await f.getReader().read(),b=new x(b.value.buffer).getUint32(0)),g.signature=b})}}class Xt extends S{constructor(e,n,{chunkSize:s},...i){super({},...i);const{zipCrypto:r,encrypted:a,password:o,passwordVerification:l,signed:c,encryptionStrength:h,compressed:u,useCompressionStream:p}=n;let w,g,f=Tt(super.readable);if(a&&(r?f=f.pipeThrough(new Lt(o,l)):(g=new Et(o,c,h),f=f.pipeThrough(g))),u)if(p!==void 0&&!p||Ot&&!St)f=E(e,f,{chunkSize:s});else try{f=f.pipeThrough(new $(kt))}catch{St=!1,f=E(e,f,{chunkSize:s})}a&&!r||!c||([f,w]=f.tee(),w=w.pipeThrough(new et)),Ct(this,f,async()=>{if(a&&!r&&!g.valid)throw new T(bt);if((!a||r)&&c){const m=await w.getReader().read(),y=new x(m.value.buffer);if(n.signature!=y.getUint32(0,!1))throw new T(bt)}})}}function E(t,e,n){return e.pipeThrough(new Ft(t,n))}function Tt(t){return t.pipeThrough(new S({transform(e,n){e&&e.length&&n.enqueue(e)}}))}function Ct(t,e,n){t.size=0,e=e.pipeThrough(new S({transform(s,i){s&&s.length&&(t.size+=s.length,i.enqueue(s))},flush:n})),v.defineProperty(t,"readable",{get:()=>e})}const Dt="deflate",Rt="inflate",It="data";class Jt{constructor(e,n,s,i,r){const{codecType:a}=i;async function o(l){const c=new l(e,i,r);await n.pipeThrough(c).pipeTo(s,{preventClose:!0});const{size:h,signature:u}=c;return{size:h,signature:u}}a.startsWith(Dt)?this.run=()=>o(Gt):a.startsWith(Rt)&&(this.run=()=>o(Xt))}}const X=new Map;let Vt,M=0;async function Qt(t){try{const{options:e,scripts:n,config:s}=t,{codecType:i}=e;let r;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),i.startsWith(Dt)?r=self.Deflate:i.startsWith(Rt)&&(r=self.Inflate);const a={highWaterMark:1,size:()=>s.chunkSize},o=new At({async pull(c){let h=new j((w,g)=>X.set(M,{resolve:w,reject:g}));J({type:"pull",messageId:M}),M=(M+1)%Number.MAX_SAFE_INTEGER;const{value:u,done:p}=await h;c.enqueue(u),p&&c.close()}},a),l=new Bt({write(c){J({type:It,data:c})}},a);Vt=new Jt(r,o,l,e,s),J({type:"close",result:await Vt.run()})}catch(e){const{message:n,stack:s}=e;V({error:{message:n,stack:s}})}}function J(t){if(t.data){let{data:e}=t;if(e&&e.length)try{e=new d(e),t.data=e.buffer,V(t,[t.data])}catch{V(t)}else V(t)}else V(t)}function qt(t,e,n){return class{constructor(i){const r=this;v.hasOwn(i,"level")&&i.level===void 0&&delete i.level,r.codec=new t(v.assign({},e,i)),n(r.codec,a=>{if(r.pendingData){const{pendingData:o}=r;r.pendingData=new d(o.length+a.length),o.set(o,0),o.set(a,o.length)}else r.pendingData=new d(a)})}append(i){return this.codec.push(i),s(this)}flush(){return this.codec.push(new d,!0),s(this)}};function s(i){if(i.pendingData){const r=i.pendingData;return i.pendingData=null,r}return new d}}addEventListener("message",async t=>{const e=t.data,{type:n,messageId:s,data:i,done:r}=e;try{if(n=="start"&&Qt(e),n==It){const{resolve:a}=X.get(s);X.delete(s),a({value:new d(i),done:r})}}catch(a){V({error:{message:a.message,stack:a.stack}})}}),self.initCodec=()=>{const{Deflate:t,Inflate:e}=((n,s={},i)=>({Deflate:qt(n.Deflate,s.deflate,i),Inflate:qt(n.Inflate,s.inflate,i)}))(pako,{deflate:{raw:!0},inflate:{raw:!0}},(n,s)=>n.onData=s);self.Deflate=t,self.Inflate=e}})();
