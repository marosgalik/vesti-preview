(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l=new TextEncoder,u=new TextDecoder,d=6e5;function f(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var p=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),m=e=>crypto.getRandomValues(new Uint8Array(e)),h=()=>f(m(16));async function g(e,t,n=d){let r=await crypto.subtle.importKey(`raw`,l.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:p(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var _=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function v(e,t){let n=m(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:f(n),key:f(r)}}function y(e,t){return crypto.subtle.unwrapKey(`raw`,p(e.key),t,{name:`AES-GCM`,iv:p(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function b(e,t){let n=m(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,l.encode(JSON.stringify(e)));return{enc:1,iv:f(n),data:f(r)}}async function x(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:p(e.iv)},t,p(e.data));return JSON.parse(u.decode(n))}var S=`vm:data`,C=`vm:lock`,w=5,T=3e4,E=9e5,D=null,O=Promise.resolve();function k(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function A(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var j=()=>!!k(C),ee=()=>!j()||!!D,te=()=>k(C)?.language??null,ne=()=>k(C)?.theme??null;function re({language:e,theme:t}){let n=k(C);n&&A(C,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var ie=()=>k(C)?.blockedUntil??0;function ae(e){let t=(e.failed??0)+1,n=t-w,r=n>=0?Date.now()+Math.min(T*2**n,E):0;return A(C,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(w-t,0)}}var oe=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}};async function se(e){let t=k(C);if(!t)throw new oe(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new oe(`blocked`,{blockedUntil:t.blockedUntil});try{let n=await g(e,t.salt,t.iterations),r=await y(t.wrapped,n);return A(C,{...t,failed:0,blockedUntil:0}),r}catch{throw new oe(`wrong`,ae(k(C)))}}function ce(){if(j())return null;let e=k(S);return e?.enc?null:e}function le(e){if(!j()){A(S,e);return}if(!D)return;let t=b(e,D);O=O.then(()=>t).then(e=>A(S,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function ue(e){let t=await se(e),n=k(S),r=n?.enc?await x(n,t):n;return D=t,r}async function de(e){return await se(e),!0}async function fe(e,t,{language:n,theme:r}={}){let i=h(),a=await g(e,i),o=await _(),s=await v(o,a),c=await b(t,o);await O,A(C,{v:1,salt:i,iterations:d,wrapped:s,language:n,theme:r,failed:0,blockedUntil:0}),A(S,c),D=o}async function pe(e){let t=k(C);if(!t||!D)return;let n=h(),r=await g(e,n),i=await v(D,r);A(C,{...t,salt:n,iterations:d,wrapped:i,failed:0,blockedUntil:0})}async function me(e){await O,localStorage.removeItem(C),D=null,A(S,e)}function he(){D=null}function ge(){D=null;try{localStorage.removeItem(S),localStorage.removeItem(C)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}}var _e=e=>String(e).padStart(2,`0`);function M(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${_e(t.getMonth()+1)}-${_e(t.getDate())}`}function ve(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function ye(e=new Date){let t=new Date(e);return`${_e(t.getHours())}:${_e(t.getMinutes())}`}function be(e,t=`12:00`){let n=ve(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function xe(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var Se=(e,t)=>M(e)===M(t),Ce=e=>Se(e,new Date),we=(e=new Date)=>M(e).slice(0,7);function Te(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function Ee(e,t){let n=Te(e);return n.setMonth(n.getMonth()+t),we(n)}var De=1;function Oe(){return{schemaVersion:De,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,reduceMotion:!1,demoSeededAt:null,demoEnabled:!0,consent:null,autoLockMinutes:1},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[]}}function ke(e){let t=Oe();return e?{...t,...e,schemaVersion:De,settings:{...t.settings,...e.settings}}:t}var N=Oe();function Ae(e){N=ke(e)}function je(){N=Oe()}function P(){le(N)}var Me=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,Ne=()=>new Date().toISOString();function Pe(e){let t=Ne();return{id:Me(),createdAt:t,updatedAt:t,...e}}var Fe=e=>(t,n)=>n[e].localeCompare(t[e]),F=()=>N.settings;function Ie(e){N.settings={...N.settings,...e},P()}var Le=()=>!!N.settings.onboardingCompletedAt;function Re(){Ie({onboardingCompletedAt:Ne()})}var ze=()=>N.medications,Be=e=>N.medications.find(t=>t.id===e)??null;function Ve({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function He(e){let t=Pe(Ve(e));return N.medications.push(t),P(),t}function Ue(e,t){let n=Be(e);return n?(Object.assign(n,Ve({...n,...t}),{updatedAt:Ne()}),P(),n):null}function We(e){let t={medication:Be(e),intakes:N.medicationIntakes.filter(t=>t.medicationId===e)};return N.medications=N.medications.filter(t=>t.id!==e),N.medicationIntakes=N.medicationIntakes.filter(t=>t.medicationId!==e),P(),t}function Ge(e){e?.medication&&!Be(e.medication.id)&&(N.medications.push(e.medication),N.medicationIntakes.push(...e.intakes),P())}function Ke(e){return N.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(Fe(`takenAt`))}var qe=e=>N.medicationIntakes.find(t=>t.id===e)??null;function Je(e){return N.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function Ye({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:Je(t)?.id??null}}function Xe(e){let t=Pe(Ye(e));return N.medicationIntakes.push(t),P(),t}function Ze(e,t){let n=qe(e);return n?(Object.assign(n,Ye({...n,...t}),{updatedAt:Ne()}),P(),n):null}function Qe(e){let t=qe(e);return N.medicationIntakes=N.medicationIntakes.filter(t=>t.id!==e),P(),t}function $e(e){e&&!qe(e.id)&&(N.medicationIntakes.push(e),P())}var et=e=>N.symptomLogs.find(t=>t.id===e)??null,tt=e=>N.symptomLogs.filter(t=>t.episodeId===e).sort(Fe(`occurredAt`));function nt({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:r,duration:i,note:String(a).trim(),episodeId:o},c=e?et(e):null;if(c)return Object.assign(c,s,{updatedAt:Ne()}),P(),c;let l=Pe(s);return N.symptomLogs.push(l),P(),l}function rt(e){let t=et(e);return N.symptomLogs=N.symptomLogs.filter(t=>t.id!==e),P(),t}function it(e){e&&!et(e.id)&&(N.symptomLogs.push(e),P())}function at(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var ot=()=>N.customSymptoms,st=e=>N.customSymptoms.find(t=>t.key===e)??null;function ct(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=N.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${Me()}`,label:t,createdAt:Ne()};return N.customSymptoms.push(r),P(),r}var lt=e=>N.episodes.find(t=>t.id===e)??null;function ut(){return N.episodes.filter(e=>!e.endedAt).sort(Fe(`startedAt`))[0]??null}function dt(){let e=Pe({startedAt:Ne(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],reliefOther:``,impact:[],impactOther:``,note:``});return N.episodes.push(e),P(),e}function ft(e,t){let n=lt(e);return n?(Object.assign(n,t,{updatedAt:Ne()}),P(),n):null}var pt=e=>ft(e,{endedAt:Ne()}),mt=(e,t)=>ft(e,t),ht=e=>Ke().filter(t=>t.episodeId===e),gt=e=>ft(e,{endedAt:null});function _t(e){let t=lt(e);return N.episodes=N.episodes.filter(t=>t.id!==e),P(),t}function vt(e){e&&!lt(e.id)&&(N.episodes.push(e),P())}var yt=e=>N.cycleEntries.some(t=>t.date===e&&t.type===`period`);function bt(e){return yt(e)?N.cycleEntries=N.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):N.cycleEntries.push({id:Me(),date:e,type:`period`,createdAt:Ne()}),P(),yt(e)}var xt=e=>N.sleepLogs.find(t=>t.date===e)??null;function St({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=xt(e);if(a)return Object.assign(a,i,{updatedAt:Ne()}),P(),a;let o=Pe({...i,bedtime:null,wakeTime:null,externalId:null});return N.sleepLogs.push(o),P(),o}function Ct(e){let t=xt(e);return N.sleepLogs=N.sleepLogs.filter(t=>t.date!==e),P(),t}function wt(e){e&&!xt(e.date)&&(N.sleepLogs.push(e),P())}var Tt=()=>N;function Et(e){return{episodes:N.episodes.filter(t=>M(t.startedAt)===e).sort(Fe(`startedAt`)),symptomLogs:N.symptomLogs.filter(t=>M(t.occurredAt)===e).sort(Fe(`occurredAt`)),intakes:N.medicationIntakes.filter(t=>M(t.takenAt)===e).sort(Fe(`takenAt`)),sleep:xt(e),period:yt(e)}}function Dt(e=new Date){let t=Et(M(e)),n=ut();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var Ot=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],kt=e=>String(e.id).startsWith(`demo-`);function At(){N.settings.name!==`Simona`||N.settings.nameSetAt||(N.settings={...N.settings,name:``},P())}function jt({records:e}){for(let t of Ot)N[t]=[...N[t].filter(e=>!kt(e)),...e[t]];N.settings={...N.settings,demoSeededAt:M(),demoEnabled:!0},At(),P()}function Mt(){for(let e of Ot)N[e]=N[e].filter(e=>!kt(e));N.medicationIntakes=N.medicationIntakes.filter(e=>!String(e.medicationId).startsWith(`demo-`)),N.settings={...N.settings,demoEnabled:!1},P()}function Nt(){ge(),N=Oe()}var Pt=class{constructor(e){this.value=e}toString(){return this.value}},Ft={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},It=e=>String(e).replace(/[&<>"']/g,e=>Ft[e]),Lt=e=>new Pt(String(e??``));function Rt(e){return e==null||e===!1||e===!0?``:e instanceof Pt?e.value:Array.isArray(e)?e.map(Rt).join(``):It(e)}function I(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=Rt(t[r])+e[r+1];return new Pt(n)}var zt={activity:`
<svg
  class="lucide lucide-activity"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
</svg>
`,arrowRight:`
<svg
  class="lucide lucide-arrow-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="m12 5 7 7-7 7" />
</svg>
`,audioWave:`
<svg
  class="lucide lucide-audio-waveform"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2" />
</svg>
`,battery:`
<svg
  class="lucide lucide-battery-low"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M22 14v-4" />
  <path d="M6 14v-4" />
  <rect x="2" y="6" width="16" height="12" rx="2" />
</svg>
`,bed:`
<svg
  class="lucide lucide-bed-double"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
  <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
  <path d="M12 4v6" />
  <path d="M2 18h20" />
</svg>
`,bone:`
<svg
  class="lucide lucide-bone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
</svg>
`,brain:`
<svg
  class="lucide lucide-brain"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 18V5" />
  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
  <path d="M18 18a4 4 0 0 0 2-7.464" />
  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
  <path d="M6 18a4 4 0 0 1-2-7.464" />
  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
</svg>
`,bell:`
<svg
  class="lucide lucide-bell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.268 21a2 2 0 0 0 3.464 0" />
  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
</svg>
`,calendar:`
<svg
  class="lucide lucide-calendar-days"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 2v3" />
  <path d="M16 2v3" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
  <path d="M3 9h18" />
  <path d="M8 13h.01" />
  <path d="M12 13h.01" />
  <path d="M16 13h.01" />
  <path d="M8 17h.01" />
  <path d="M12 17h.01" />
  <path d="M16 17h.01" />
</svg>
`,camera:`
<svg
  class="lucide lucide-camera"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
  <circle cx="12" cy="13" r="3" />
</svg>
`,car:`
<svg
  class="lucide lucide-car"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
  <circle cx="7" cy="17" r="2" />
  <path d="M9 17h6" />
  <circle cx="17" cy="17" r="2" />
</svg>
`,calendarPlus:`
<svg
  class="lucide lucide-calendar-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 18h6" />
  <path d="M16 2v3" />
  <path d="M19 15v6" />
  <path d="M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3" />
  <path d="M3 9h18" />
  <path d="M8 2v3" />
</svg>
`,chart:`
<svg
  class="lucide lucide-chart-column"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 3v16a2 2 0 0 0 2 2h16" />
  <path d="M18 17V9" />
  <path d="M13 17V5" />
  <path d="M8 17v-3" />
</svg>
`,check:`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,chevronLeft:`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,chevronRight:`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,clock:`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`,coffee:`
<svg
  class="lucide lucide-coffee"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v2" />
  <path d="M14 2v2" />
  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
  <path d="M6 2v2" />
</svg>
`,cloud:`
<svg
  class="lucide lucide-cloud"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
</svg>
`,cloudFog:`
<svg
  class="lucide lucide-cloud-fog"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
  <path d="M16 17H7" />
  <path d="M17 21H9" />
</svg>
`,delete:`
<svg
  class="lucide lucide-delete"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
  <path d="m12 9 6 6" />
  <path d="m18 9-6 6" />
</svg>
`,download:`
<svg
  class="lucide lucide-download"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15V3" />
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  <path d="m7 10 5 5 5-5" />
</svg>
`,droplet:`
<svg
  class="lucide lucide-droplet"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
</svg>
`,droplets:`
<svg
  class="lucide lucide-droplets"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
  <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
</svg>
`,dumbbell:`
<svg
  class="lucide lucide-dumbbell"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
  <path d="m2.5 21.5 1.4-1.4" />
  <path d="m20.1 3.9 1.4-1.4" />
  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
  <path d="m9.6 14.4 4.8-4.8" />
</svg>
`,ear:`
<svg
  class="lucide lucide-ear"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
  <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
</svg>
`,ellipsis:`
<svg
  class="lucide lucide-ellipsis"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="19" cy="12" r="1" />
  <circle cx="5" cy="12" r="1" />
</svg>
`,externalLink:`
<svg
  class="lucide lucide-external-link"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="M10 14 21 3" />
  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
</svg>
`,eye:`
<svg
  class="lucide lucide-eye"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,fileText:`
<svg
  class="lucide lucide-file-text"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
  <path d="M10 9H8" />
  <path d="M16 13H8" />
  <path d="M16 17H8" />
</svg>
`,flower:`
<svg
  class="lucide lucide-flower-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
  <circle cx="12" cy="8" r="2" />
  <path d="M12 10v12" />
  <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
  <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
</svg>
`,footprints:`
<svg
  class="lucide lucide-footprints"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
  <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
  <path d="M16 17h4" />
  <path d="M4 13h4" />
</svg>
`,gauge:`
<svg
  class="lucide lucide-gauge"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 14 4-4" />
  <path d="M3.34 19a10 10 0 1 1 17.32 0" />
</svg>
`,glassWater:`
<svg
  class="lucide lucide-glass-water"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" />
  <path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" />
</svg>
`,globe:`
<svg
  class="lucide lucide-globe"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
  <path d="M2 12h20" />
</svg>
`,home:`
<svg
  class="lucide lucide-house"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
</svg>
`,hourglass:`
<svg
  class="lucide lucide-hourglass"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 22h14" />
  <path d="M5 2h14" />
  <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
  <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
</svg>
`,info:`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`,keyRound:`
<svg
  class="lucide lucide-key-round"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`,languages:`
<svg
  class="lucide lucide-languages"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m5 8 6 6" />
  <path d="m4 14 6-6 2-3" />
  <path d="M2 5h12" />
  <path d="M7 2h1" />
  <path d="m22 22-5-10-5 10" />
  <path d="M14 18h6" />
</svg>
`,lock:`
<svg
  class="lucide lucide-lock"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>
`,lockKeyhole:`
<svg
  class="lucide lucide-lock-keyhole"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="16" r="1" />
  <rect x="3" y="10" width="18" height="12" rx="2" />
  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
</svg>
`,logOut:`
<svg
  class="lucide lucide-log-out"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 17 5-5-5-5" />
  <path d="M21 12H9" />
  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
</svg>
`,messages:`
<svg
  class="lucide lucide-messages-square"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
</svg>
`,monitor:`
<svg
  class="lucide lucide-monitor"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="3" rx="2" />
  <line x1="8" x2="16" y1="21" y2="21" />
  <line x1="12" x2="12" y1="17" y2="21" />
</svg>
`,moon:`
<svg
  class="lucide lucide-moon"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
</svg>
`,note:`
<svg
  class="lucide lucide-notebook-pen"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
  <path d="M2 6h4" />
  <path d="M2 10h4" />
  <path d="M2 14h4" />
  <path d="M2 18h4" />
  <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
</svg>
`,orbit:`
<svg
  class="lucide lucide-orbit"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
  <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
  <circle cx="12" cy="12" r="3" />
  <circle cx="19" cy="5" r="2" />
  <circle cx="5" cy="19" r="2" />
</svg>
`,palette:`
<svg
  class="lucide lucide-palette"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
`,pencil:`
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,pill:`
<svg
  class="lucide lucide-pill"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
  <path d="m8.5 8.5 7 7" />
</svg>
`,play:`
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,plus:`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,printer:`
<svg
  class="lucide lucide-printer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
  <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
  <rect x="6" y="14" width="12" height="8" rx="1" />
</svg>
`,rotate3d:`
<svg
  class="lucide lucide-rotate-3d"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
  <path d="M16.47214 7.52786 A 5 10 0 1 0 13 21.79796" />
  <path d="M21.79796 11 A 10 5 0 1 0 19 15.57071" />
</svg>
`,sailboat:`
<svg
  class="lucide lucide-sailboat"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 2v15" />
  <path d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z" />
  <path d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z" />
</svg>
`,scanFace:`
<svg
  class="lucide lucide-scan-face"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
  <path d="M9 9h.01" />
  <path d="M15 9h.01" />
</svg>
`,search:`
<svg
  class="lucide lucide-search"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
</svg>
`,shield:`
<svg
  class="lucide lucide-shield-check"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  <path d="m9 12 2 2 4-4" />
</svg>
`,smartphone:`
<svg
  class="lucide lucide-smartphone"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
  <path d="M12 18h.01" />
</svg>
`,sparkles:`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,stethoscope:`
<svg
  class="lucide lucide-stethoscope"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 2v2" />
  <path d="M5 2v2" />
  <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
  <path d="M8 15a6 6 0 0 0 12 0v-3" />
  <circle cx="20" cy="10" r="2" />
</svg>
`,sun:`
<svg
  class="lucide lucide-sun"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`,thermometer:`
<svg
  class="lucide lucide-thermometer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
</svg>
`,timer:`
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,trash:`
<svg
  class="lucide lucide-trash"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,user:`
<svg
  class="lucide lucide-circle-user-round"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
  <circle cx="12" cy="11" r="4" />
  <circle cx="12" cy="12" r="10" />
</svg>
`,users:`
<svg
  class="lucide lucide-users"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
  <circle cx="9" cy="7" r="4" />
</svg>
`,utensils:`
<svg
  class="lucide lucide-utensils"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
  <path d="M7 2v20" />
  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
</svg>
`,volume:`
<svg
  class="lucide lucide-volume-2"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
  <path d="M16 9a5 5 0 0 1 0 6" />
  <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
</svg>
`,watch:`
<svg
  class="lucide lucide-watch"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 10v2.2l1.6 1" />
  <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
  <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
  <circle cx="12" cy="12" r="6" />
</svg>
`,wine:`
<svg
  class="lucide lucide-wine"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M8 22h8" />
  <path d="M7 10h10" />
  <path d="M12 15v7" />
  <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
</svg>
`,waves:`
<svg
  class="lucide lucide-waves-horizontal"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
</svg>
`,wind:`
<svg
  class="lucide lucide-wind"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
  <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
  <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
</svg>
`,x:`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,zap:`
<svg
  class="lucide lucide-zap"
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" />
</svg>
`},Bt=Object.keys(zt);function L(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=zt[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),Lt(``);let a=n?`role="img" aria-label="${It(n)}"`:`aria-hidden="true" focusable="false"`;return Lt(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var Vt={sk:{app:{name:`Vestie`,logo:`Vestie – Vestibulárna migréna`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`,edit:`Upraviť`,delete:`Vymazať`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,en:`English`},welcome:{title:`Tvoj denník príznakov`,text:`Zapisuj príznaky, epizódy, lieky a spánok. Appka ich zoradí do kalendára a prehľadov a pripraví report, ktorý môžeš ukázať lekárovi.`,cta:`Začať`},goals:{title:`S čím ti môže aplikácia pomôcť?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Zaznamenávať príznaky`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Porozumieť svojim ťažkostiam`,doctor:`Pripraviť prehľad pre lekára`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`napr. Betahistín`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 24 mg`,frequency:`Frekvencia`,frequencyPlaceholder:`napr. 2× denne`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Každý deň ti v čase, ktorý si zvolíš, pripomenieme, aby si si zaznamenal/a svoje príznaky a to, ako sa cítiš.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,loggedToday:`Dnes zaznamenané`,addSymptom:`Pridať príznak`,startEpisode:`Spustiť epizódu`,overview:`Dnes`,sleep:`Spánok`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entriesEmpty:`Zatiaľ tu nič nie je. Príznak pridáš tlačidlom vyššie, epizódu spustíš v strede spodného menu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,logIntake:`Zaznamenať liek`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`,editDetails:`Upraviť podrobnosti`,saveLater:`Uložiť a doplniť neskôr`,savedLater:`Epizóda je uložená. Podrobnosti doplníš kedykoľvek v jej detaile.`,details:`Podrobnosti`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`,startEpisode:`Spustiť epizódu`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,reduceMotion:`Obmedziť animácie`,reduceMotionHint:`Vhodné pri citlivosti na pohyb. Ak máš obmedzenie pohybu zapnuté v telefóne, animácie sú vypnuté automaticky.`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť.`,deleteAllConfirm:`Áno, vymazať`,dev:`Pre vývoj`,styleguide:`Dizajn systém`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Synchronizácia spánku a ďalších údajov cez Apple Health (iPhone) a Health Connect (Android) pribudne v mobilnej aplikácii.`,comingSoon:`Pripravujeme`,demoReset:`Obnoviť ukážkové dáta`,demoResetTitle:`Obnoviť ukážkové dáta?`,demoResetText:`Ukážkové záznamy za posledných 8 týždňov sa vrátia do pôvodného stavu. Tvoje vlastné záznamy zostanú.`,demoResetConfirm:`Obnoviť`,demoResetDone:`Ukážkové dáta sú obnovené`,onboardingAgain:`Prejsť úvodom znova`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Po nastavení PIN-u ťa hneď odhlásime.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Podľa telefónu`},demoSection:`Ukážka appky`,demoFill:`Vyplnená appka`,demoFillHint:`Vypni a uvidíš prázdnu appku ako nový človek.`,demoFillOn:`Ukážkové dáta sú zapnuté`,demoFillOff:`Ukážkové dáta sú vypnuté, appka je prázdna`},symptoms:{dizziness:`Závrat`,vertigo:`Vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v ušiach`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`,moment:`Chvíľu (sekundy až minúty)`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`,long_sleep:`Príliš dlhý spánok`,bright_light:`Ostré svetlo / slnečné žiarenie`,strong_smells:`Silné pachy`,neck_pain:`Bolesť alebo napätie krku`,allergy:`Alergia`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Posuvník začína na 5 – posuň ho podľa toho, ako sa cítiš. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`,whenToday:`Dnes o {time}`,whenOn:`{date} o {time}`,changeTime:`Zmeniť čas`,clearLabel:`Vynechať intenzitu: {name}`,restore:`Zadať intenzitu`},symptomLog:{title:`Príznaky`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,openEpisode:`Otvoriť epizódu`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a ako ti podľa teba pomáhajú.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`,hint:`Kliknutím na liek môžeš zaznamenať jeho užitie a sledovať, ako ti pomáha.`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendPeriod:`Menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,period:`Menštruácia`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`,legendEpisode:`Deň s epizódou`,legendSymptoms:`Zaznamenané príznaky`,summaryEpisode:`epizóda`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Prehľad sa skladá z tvojich záznamov. Keď budeš mať zapísané príznaky z viacerých dní, uvidíš tu, čo sa opakuje.`,overview:`Súhrn`,symptomDays:`Dni s príznakmi`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestie. Nejde o diagnózu ani lekársky záznam.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje údaje zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,factDevice:`Záznamy o zdraví sa ukladajú iba v tomto telefóne.`,factNoServer:`Appka nemá účet na internete, nič neodosiela a nepoužíva reklamy ani analytické nástroje.`,factPin:`Prihlasovať sa budeš PIN kódom a tvoje údaje budú zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím so spracovaním mojich údajov o zdraví v tomto telefóne na účely osobného sledovania.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,submit:`Súhlasím a pokračujem`},privacyPolicy:{title:`Zásady ochrany súkromia`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik a doplnia sa údaje prevádzkovateľa.`,controllerTitle:`Kto je prevádzkovateľ`,controllerText:`[Názov prevádzkovateľa, sídlo, IČO – doplniť]. Kontakt pre otázky o osobných údajoch: [e-mail – doplniť].`,dataTitle:`Aké údaje appka spracúva`,dataText:`Iba to, čo do nej zadáš: príznaky a ich intenzitu, epizódy, lieky a ich účinok, spánok, voliteľne menštruačný cyklus a meno na pozdrav. Ide o údaje o zdraví, preto ich chránime osobitne.`,storageTitle:`Kde sú tvoje údaje`,storageText:`Iba v tomto telefóne. Appka nemá server ani účet na internete, údaje nikam neodosiela a nepoužíva reklamné ani analytické nástroje. Prevádzkovateľ k tvojim údajom nemá prístup.`,purposeTitle:`Na čo slúžia`,purposeText:`Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš.`,legalTitle:`Na akom základe`,legalText:`Na základe tvojho výslovného súhlasu so spracovaním údajov o zdraví (čl. 9 ods. 2 písm. a) GDPR). Súhlas môžeš kedykoľvek odvolať v Profile – údaje sa tým vymažú.`,rightsTitle:`Tvoje práva`,rightsText:`Údaje si môžeš kedykoľvek pozrieť, upraviť, exportovať do súboru alebo natrvalo vymazať priamo v appke (Profil → Súkromie). Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR.`,securityTitle:`Zabezpečenie`,securityText:`Do appky sa prihlasuješ 6-miestnym PIN-om. Kým je PIN zapnutý, všetky údaje v telefóne sú zašifrované (AES-256) a bez neho sa k nim nedá dostať. Ak PIN zabudneš, údaje nie je možné obnoviť.`,backupTitle:`Zálohovanie`,backupText:`Keďže údaje sú iba v telefóne, pri strate alebo výmene telefónu sa stratia, ak si ich predtým neexportuješ.`,ageTitle:`Vek`,ageText:`Appka je určená pre ľudí od 16 rokov.`,changesTitle:`Zmeny zásad`,changesText:`O zmenách týchto zásad ťa upozorníme priamo v appke.`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – nikto iný k nim nemá prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a nikto iný k nim nemá kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované. Bez PIN-u sa k nim nedá dostať.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Údaje sú iba v tomto telefóne`,deviceOnlyHint:`Appka nič neodosiela na internet a nemá k nim prístup nikto iný.`,export:`Exportovať moje údaje`,exportHint:`Stiahne všetky záznamy do súboru (JSON).`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne.`,withdrawConfirm:`Odvolať a vymazať údaje`},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`}},community:{title:`Komunita a podpora`,lead:`Nemusíš na to byť osamote. V našej komunite zdieľame vlastné skúsenosti, podržíme sa a odporúčame si špecialistov.`,facebook:`Facebook skupina`,facebookHint:`Skúsenosti, otázky a vzájomná podpora`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Rozhovory s komunitou v reálnom čase`,webTitle:`Články na našom webe`,webText:`O diagnóze, liečbe a živote s vestibulárnou migrénou.`,webUrl:`www.vestibularnamigrena.sk`,external:`(otvorí sa mimo aplikácie)`,note:`Skúsenosti a odporúčania z komunity nenahrádzajú vyšetrenie a radu lekára.`,soon:`Čoskoro`},episodeTypes:{vestibular:`Vestibulárna epizóda`,migraine_headache:`Migréna s bolesťou hlavy`,migraine_no_headache:`Migréna bez bolesti hlavy`,other:`Iné`,unsure:`Neviem`},relief:{rest:`Oddych`,sleep:`Spánok`,dark_room:`Oddych v tmavej miestnosti`,hydration:`Pitie vody`,relaxation:`Relaxácia alebo meditácia`,cold_compress:`Studený obklad`,warm_compress:`Teplý obklad`,shower:`Sprcha`,food:`Jedlo`,other:`Iné`},impact:{work_study:`Práca alebo štúdium`,sleep:`Spánok`,daily_activities:`Bežné denné činnosti`,social:`Kontakt s rodinou a priateľmi`,movement:`Pohyb a fyzické aktivity`,rest:`Oddych a relaxácia`,other:`Iné`,none:`Epizóda ma výrazne neobmedzila`},episodeFlow:{typeTitle:`Aká to bola epizóda?`,typeLead:`Všetko v podrobnostiach je nepovinné. Čo nevieš, preskoč a doplň neskôr.`,intensity:`Celková intenzita`,symptomsTitle:`Aké príznaky sa objavili?`,symptomsLead:`Vyber jeden alebo viac. Silu každého zadáš v ďalšom kroku.`,date:`Dátum`,time:`Čas`,triggersTitle:`Čo ju mohlo spustiť?`,triggersLead:`Vyber všetko, čo sa ťa týka. Ide o možné súvislosti, nie potvrdené príčiny. Môžeš vybrať viac možností.`,triggerOther:`Iný spúšťač`,triggerOtherPlaceholder:`Napíš, čo to bolo`,medsTitle:`Užil/a si počas epizódy liek?`,medsLead:`Označ lieky a kedy si ich užil/a. Užitie sa uloží aj do Liečby.`,medsLogged:`Už zaznamenané počas epizódy`,medsNone:`Zatiaľ nemáš pridané žiadne lieky.`,addMed:`Pridať liek`,medsWhen:`Kedy si ich užil/a`,medsOutside:`Čas musí byť počas epizódy.`,helped:`Pomohlo to?`,reliefTitle:`Čo ti prinieslo úľavu?`,summaryTitle:`Zhrnutie epizódy`,summaryLead:`Skontroluj, čo si vyplnil/a. Každú časť môžeš upraviť.`,summaryMissing:`Ešte môžeš doplniť`,save:`Uložiť epizódu`,saved:`Epizóda bola uložená`,edit:`Upraviť`,sections:{type:`Typ`,intensity:`Intenzita`,time:`Čas`,symptoms:`Príznaky`,triggers:`Možné spúšťače`,meds:`Lieky`,helped:`Pomohlo to?`,relief:`Úľava`,impact:`Obmedzenia`},reliefLead:`Môžeš vybrať viac možností.`,reliefOther:`Čo ešte ti pomohlo?`,reliefOtherPlaceholder:`Napíš, čo to bolo`,impactTitle:`Ako ťa epizóda obmedzila?`,impactLead:`V ktorých oblastiach každodenného života si pocítil/a jej vplyv?`,impactOther:`Čo ešte epizóda ovplyvnila?`,impactOtherPlaceholder:`Napíš, čo to bolo`},symptomInfo:{open:`Čo znamená {name}?`,close:`Rozumiem`,dizziness:`Pocit omámenia, neistoty alebo straty rovnováhy. Môžeš mať pocit, že sa ti zatočila hlava, cítiš sa na odpadnutie alebo nemáš istotu pri státí či chôdzi.`,vertigo:`Falošný pocit pohybu, hoci sa v skutočnosti nehýbeš. Môžeš mať pocit, že sa točíš ty, že sa otáča miestnosť alebo že sa okolité prostredie pohybuje.`,brain_fog:`Stav, pri ktorom máš problém sústrediť sa, jasne premýšľať alebo spracovávať informácie. Môžeš mať pocit, že ti to myslí pomalšie, ťažšie hľadáš slová alebo sa horšie orientuješ v myšlienkach.`,visual_sensitivity:`Zvýšená citlivosť na vizuálne podnety. Pohybujúce sa obrazy, rušné prostredie, vzory, davy ľudí alebo obrazovky môžu vyvolávať závrat, nevoľnosť alebo dezorientáciu.`,tinnitus:`Vnímanie zvuku v jednom alebo oboch ušiach, hoci v okolí nie je žiadny skutočný zdroj zvuku. Môže ísť o pískanie, hučanie, bzučanie alebo šumenie.`,rocking:`Pocit, akoby sa tvoje telo alebo okolie jemne hojdalo, kolísalo zo strany na stranu alebo pohybovalo dopredu a dozadu, podobne ako na lodi.`,floating:`Pocit, akoby si sa nadnášal/a, nemal/a pevný kontakt so zemou.`,unsteadiness:`Pocit neistoty pri státí alebo chôdzi, akoby si strácal/a rovnováhu, vychyľoval/a sa do strán alebo potreboval/a oporu pri pohybe.`},quickIntake:{title:`Ktorý liek si užil/a?`,lead:`Vyber liek. V ďalšom kroku zadáš čas a či ti pomohol.`,add:`Pridať nový liek`,empty:`Zatiaľ nemáš pridané žiadne lieky. Pridaj liek a potom zaznamenáš jeho užitie.`}},en:{app:{name:`Vestie`,logo:`Vestie – Vestibular Migraine`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`,edit:`Edit`,delete:`Delete`},language:{title:`Choose your language`,sk:`Slovenčina`,en:`English`},welcome:{title:`Your symptom diary`,text:`Log symptoms, episodes, medication and sleep. The app arranges them into a calendar and insights and prepares a report you can show your doctor.`,cta:`Get started`},goals:{title:`What can the app help you with?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Log symptoms`,triggers:`Log possible triggers`,patterns:`Understand my difficulties`,doctor:`Prepare an overview for my doctor`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`e.g. Betahistine`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 24 mg`,frequency:`Frequency`,frequencyPlaceholder:`e.g. twice a day`,note:`Note`,submit:`Save medication`,saved:`{name} was added`},reminders:{title:`Would you like to set a reminder?`,lead:`Every day, at a time you choose, we'll remind you to log your symptoms and how you feel.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,loggedToday:`Logged today`,addSymptom:`Add symptom`,startEpisode:`Start episode`,overview:`Today`,sleep:`Sleep`,meds:`Medications`,nothingYet:`Nothing yet`,entriesEmpty:`Nothing here yet. Add a symptom with the button above, start an episode in the middle of the bottom menu.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,logIntake:`Log medication`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`,editDetails:`Edit details`,saveLater:`Save and finish later`,savedLater:`The episode is saved. You can add details any time in its detail view.`,details:`Details`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`,startEpisode:`Start episode`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,reduceMotion:`Reduce animations`,reduceMotionHint:`Helpful if motion bothers you. If reduced motion is turned on in your phone settings, animations are already off.`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone.`,deleteAllConfirm:`Yes, delete`,dev:`For development`,styleguide:`Design system`,saved:`Saved`,disclaimer:`This app is for personal tracking. It does not provide a diagnosis or treatment and does not replace consulting a doctor.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Syncing sleep and other data via Apple Health (iPhone) and Health Connect (Android) will come with the mobile app.`,comingSoon:`Coming soon`,demoReset:`Reset sample data`,demoResetTitle:`Reset sample data?`,demoResetText:`Sample entries for the last 8 weeks will be restored. Entries you added yourself will stay.`,demoResetConfirm:`Reset`,demoResetDone:`Sample data has been reset`,onboardingAgain:`Go through the intro again`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Once you set a PIN, we will sign you out right away.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`},demoSection:`App preview`,demoFill:`Filled app`,demoFillHint:`Turn off to see the empty app, as a new person would.`,demoFillOn:`Sample data is on`,demoFillOff:`Sample data is off, the app is empty`},symptoms:{dizziness:`Dizziness`,vertigo:`Vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`,moment:`A moment (seconds to minutes)`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`,long_sleep:`Too much sleep`,bright_light:`Bright light / sunlight`,strong_smells:`Strong smells`,neck_pain:`Neck pain or tension`,allergy:`Allergy`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. The slider starts at 5 – move it to match how you feel. You can skip any symptom.`,clear:`Skip`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`,whenToday:`Today at {time}`,whenOn:`{date} at {time}`,changeTime:`Change time`,clearLabel:`Skip intensity: {name}`,restore:`Rate intensity`},symptomLog:{title:`Symptoms`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,openEpisode:`Open episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and how they seem to help.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`,hint:`Tap a medication to log when you take it and see how it helps you.`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendPeriod:`Period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,period:`Period`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`,legendEpisode:`Day with an episode`,legendSymptoms:`Symptoms logged`,summaryEpisode:`episode`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Insights are built from your entries. Once you've logged symptoms on several days, you'll see here what keeps coming back.`,overview:`Summary`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestie app. This is not a diagnosis or a medical record.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your data stays on your phone`,lead:`Before you start, here is how we handle your data.`,factDevice:`Health entries are stored only on this phone.`,factNoServer:`The app has no online account, sends nothing anywhere and uses no ads or analytics.`,factPin:`You will sign in with a PIN and your data will be encrypted.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree to the processing of my health data on this phone for personal tracking.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,submit:`Agree and continue`},privacyPolicy:{title:`Privacy policy`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer and the controller details will be added.`,controllerTitle:`Who is the controller`,controllerText:`[Controller name, address, company ID – to be added]. Contact for personal data questions: [e-mail – to be added].`,dataTitle:`What data the app processes`,dataText:`Only what you enter yourself: symptoms and their intensity, episodes, medications and their effect, sleep, optionally your menstrual cycle and a name for the greeting. This is health data, so we protect it specially.`,storageTitle:`Where your data is`,storageText:`Only on this phone. The app has no server or online account, sends no data anywhere and uses no advertising or analytics tools. The controller has no access to your data.`,purposeTitle:`What it is for`,purposeText:`For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it.`,legalTitle:`Legal basis`,legalText:`Your explicit consent to the processing of health data (Art. 9(2)(a) GDPR). You can withdraw it at any time in your Profile – your data will then be deleted.`,rightsTitle:`Your rights`,rightsText:`You can view, edit, export or permanently delete your data at any time in the app (Profile → Privacy). You also have the right to lodge a complaint with the data protection authority.`,securityTitle:`Security`,securityText:`You sign in to the app with a 6-digit PIN. While the PIN is on, all data on the phone is encrypted (AES-256) and cannot be accessed without it. If you forget the PIN, the data cannot be recovered.`,backupTitle:`Backup`,backupText:`Because your data is only on this phone, it will be lost if you lose or replace the phone without exporting it first.`,ageTitle:`Age`,ageText:`The app is intended for people aged 16 and over.`,changesTitle:`Changes to this policy`,changesText:`We will let you know about changes directly in the app.`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – nobody else has access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and nobody else has the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and cannot be accessed without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your data is only on this phone`,deviceOnlyHint:`The app sends nothing to the internet and nobody else can access it.`,export:`Export my data`,exportHint:`Downloads all entries to a file (JSON).`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone.`,withdrawConfirm:`Withdraw and delete data`},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},episodes:{one:`{n} episode`,other:`{n} episodes`}},community:{title:`Community & support`,lead:`You don't have to face it alone. In our community we share our own experiences, support each other and recommend specialists.`,facebook:`Facebook group`,facebookHint:`Experiences, questions and mutual support`,instagram:`Instagram`,instagramHint:`@vestibularnamigrena`,discord:`Discord`,discordHint:`Real-time conversations with the community`,webTitle:`Articles on our website`,webText:`About the diagnosis, treatment and living with vestibular migraine (in Slovak).`,webUrl:`www.vestibularnamigrena.sk`,external:`(opens outside the app)`,note:`Experiences and recommendations from the community don't replace a doctor's examination and advice.`,soon:`Coming soon`},episodeTypes:{vestibular:`Vestibular episode`,migraine_headache:`Migraine with headache`,migraine_no_headache:`Migraine without headache`,other:`Other`,unsure:`I don't know`},relief:{rest:`Rest`,sleep:`Sleep`,dark_room:`Resting in a dark room`,hydration:`Drinking water`,relaxation:`Relaxation or meditation`,cold_compress:`Cold compress`,warm_compress:`Warm compress`,shower:`Shower`,food:`Food`,other:`Other`},impact:{work_study:`Work or study`,sleep:`Sleep`,daily_activities:`Everyday activities`,social:`Contact with family and friends`,movement:`Movement and physical activity`,rest:`Rest and relaxation`,other:`Other`,none:`The episode didn't limit me much`},episodeFlow:{typeTitle:`What kind of episode was it?`,typeLead:`Every detail is optional. Skip what you don't know and add it later.`,intensity:`Overall intensity`,symptomsTitle:`Which symptoms appeared?`,symptomsLead:`Choose one or more. You'll rate each one in the next step.`,date:`Date`,time:`Time`,triggersTitle:`What might have triggered it?`,triggersLead:`Choose everything that applies. These are possible links, not confirmed causes. You can choose more than one.`,triggerOther:`Other trigger`,triggerOtherPlaceholder:`Describe what it was`,medsTitle:`Did you take any medication during the episode?`,medsLead:`Tick the medication and when you took it. It will also be saved in Treatment.`,medsLogged:`Already logged during the episode`,medsNone:`You haven't added any medication yet.`,addMed:`Add medication`,medsWhen:`When you took it`,medsOutside:`The time must be during the episode.`,helped:`Did it help?`,reliefTitle:`What brought you relief?`,summaryTitle:`Episode summary`,summaryLead:`Check what you filled in. You can edit any part.`,summaryMissing:`You can still add`,save:`Save episode`,saved:`The episode was saved`,edit:`Edit`,sections:{type:`Type`,intensity:`Intensity`,time:`Time`,symptoms:`Symptoms`,triggers:`Possible triggers`,meds:`Medication`,helped:`Did it help?`,relief:`Relief`,impact:`Limitations`},reliefLead:`You can choose more than one.`,reliefOther:`What else helped?`,reliefOtherPlaceholder:`Describe what it was`,impactTitle:`How did the episode limit you?`,impactLead:`Which areas of everyday life did it affect?`,impactOther:`What else did the episode affect?`,impactOtherPlaceholder:`Describe what it was`},symptomInfo:{open:`What does {name} mean?`,close:`Got it`,dizziness:`A feeling of lightheadedness, unsteadiness or loss of balance. You may feel your head is spinning, feel faint or feel unsure when standing or walking.`,vertigo:`A false sense of movement even though you aren't moving. You may feel that you are spinning, that the room is turning or that your surroundings are moving.`,brain_fog:`A state in which it is hard to concentrate, think clearly or process information. Your thinking may feel slower, words may be harder to find or your thoughts harder to follow.`,visual_sensitivity:`Increased sensitivity to visual stimuli. Moving images, busy environments, patterns, crowds or screens can trigger dizziness, nausea or disorientation.`,tinnitus:`Hearing a sound in one or both ears even though there is no real source of sound around you. It may be ringing, humming, buzzing or hissing.`,rocking:`A feeling as if your body or surroundings are gently rocking, swaying from side to side or moving back and forth, like on a boat.`,floating:`A feeling as if you are floating, without firm contact with the ground.`,unsteadiness:`A feeling of unsteadiness when standing or walking, as if you are losing your balance, drifting to the sides or need support to move.`},quickIntake:{title:`Which medication did you take?`,lead:`Choose a medication. Next you'll enter the time and whether it helped.`,add:`Add a new medication`,empty:`You haven't added any medication yet. Add one and then log taking it.`}}},Ht=[`sk`,`en`],Ut={sk:`sk-SK`,en:`en-GB`},Wt=`sk`;function Gt(e){Wt=Vt[e]?e:`sk`,document.documentElement.lang=Wt}var Kt=()=>Ut[Wt];function qt(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function Jt(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function Yt(e,t,n){let r=qt(Vt[e],t)??qt(Vt.sk,t);return typeof r==`string`?Jt(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var R=(e,t)=>Yt(Wt,e,t);function Xt(e,t){let n=new Intl.PluralRules(Kt()).select(t),r=qt(Vt[Wt],e)??{};return Jt(r[n]??r.other??e,{n:t})}var Zt=(e,t)=>t==null||t===!1?``:I` ${Lt(e)}="${t}"`,Qt=(e,t)=>t?Lt(` ${e}`):``;function $t(e={}){return Lt(Object.entries(e).map(([e,t])=>` data-${e}="${It(t)}"`).join(``))}function z({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=I`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?I`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?I`<form class="screen ${i}" novalidate>${o}</form>`:I`<div class="screen ${i}">${o}</div>`}var en=(e,t,{header:n}={})=>z({variant:n?``:`screen--tab`,header:n,body:t,nav:an(e)});function B({back:e,backAction:t,step:n,total:r}={}){return I`
    <header class="screen__header">
      ${e||t?I`<button type="button" class="icon-btn" data-action="${t??`back`}"${Zt(`data-fallback`,e)} aria-label="${R(`common.back`)}">
            ${L(`chevronLeft`)}
          </button>`:I`<span class="topbar__spacer"></span>`}
      ${n?I`<div class="progress">
            <span class="visually-hidden">${R(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>I`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:I`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var tn=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`}],nn=(e,t)=>I`
  <a class="tabbar__item" href="#${e.path}" data-replace${e.key===t?Lt(` aria-current="page"`):``}>
    <span class="tabbar__icon">${L(e.icon)}</span>
    ${R(`nav.${e.key}`)}
  </a>`;function rn(){let e=ut();return e?I`
      <a class="tabbar__fab tabbar__fab--live" href="#/episode/${e.id}" aria-label="${R(`episode.ongoing`)}">
        <span class="tabbar__fab-circle" aria-hidden="true">${L(`timer`,{size:30})}</span>
        <span class="tabbar__fab-label" aria-hidden="true">${R(`episode.statusOngoing`)}</span>
      </a>`:I`
    <button type="button" class="tabbar__fab" data-action="startEpisode">
      <span class="tabbar__fab-circle" aria-hidden="true">${L(`play`,{size:28,strokeWidth:2.5})}</span>
      <span class="tabbar__fab-label">${R(`nav.startEpisode`)}</span>
    </button>`}function an(e){let[t,n,r,i]=tn;return I`
    <nav class="tabbar" aria-label="${R(`nav.label`)}">
      ${nn(t,e)}${nn(n,e)}${rn()}${nn(r,e)}${nn(i,e)}
    </nav>`}var on=()=>I`<a href="#/profile" class="icon-btn" aria-label="${R(`nav.profile`)}">${L(`user`)}</a>`,sn=e=>I`
  <header class="tab-title">
    <h1 class="screen-title" tabindex="-1">${e}</h1>
    ${on()}
  </header>`;function V({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return I`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${Zt(`id`,l)}${Zt(`data-action`,n)}${$t(c)}${Qt(`disabled`,s)}>
    ${i?L(i,{size:20}):``}<span>${e}</span>
  </button>`}function cn({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return I`
    <fieldset class="options">
      ${i?I`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>I`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${Qt(`checked`,a.has(n.value))} />
            <span class="option__control">${L(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function ln({name:e,options:t,selected:n,legend:r}){return I`
    <fieldset class="segmented">
      ${r?I`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>I`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${Qt(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function H({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?I`<textarea class="field__input" id="${d}" name="${t}"${Zt(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:I`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${Zt(`placeholder`,i)}${Zt(`autocomplete`,l)}${n===`text`?Zt(`maxlength`,u):``}${Qt(`required`,s)} aria-describedby="${f}" />`;return I`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?I` <span class="field__optional">(${R(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?I`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function un(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function dn(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function fn({name:e,label:t,hint:n,checked:r,iconName:i}){return I`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?L(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?I`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${Qt(`checked`,r)}${n?I` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var pn=(e,{live:t=!1,neutral:n=!1}={})=>I`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`,mn=(e,{large:t=!1}={})=>I`<span class="icon-badge ${t?`icon-badge--lg`:``}">${L(e,{size:t?34:22})}</span>`;function hn(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function gn(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var _n={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},vn={duration:.5,overwrite:!1,delay:0},yn,bn,U,xn=1e8,W=1/xn,Sn=Math.PI*2,Cn=Sn/4,wn=0,Tn=Math.sqrt,En=Math.cos,Dn=Math.sin,On=function(e){return typeof e==`string`},G=function(e){return typeof e==`function`},kn=function(e){return typeof e==`number`},An=function(e){return e===void 0},jn=function(e){return typeof e==`object`},Mn=function(e){return e!==!1},Nn=function(){return typeof window<`u`},Pn=function(e){return G(e)||On(e)},Fn=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},In=Array.isArray,Ln=/random\([^)]+\)/g,Rn=/,\s*/g,zn=/(?:-?\.?\d|\.)+/gi,Bn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Vn=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Hn=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Un=/[+-]=-?[.\d]+/,Wn=/[^,'"\[\]\s]+/gi,Gn=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,K,Kn,qn,Jn,Yn={},Xn={},Zn,Qn=function(e){return(Xn=Or(e,Yn))&&Ga},$n=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},er=function(e,t){return!t&&console.warn(e)},tr=function(e,t){return e&&(Yn[e]=t)&&Xn&&(Xn[e]=t)||Yn},nr=function(){return 0},rr={suppressEvents:!0,isStart:!0,kill:!1},ir={suppressEvents:!0,kill:!1},ar={suppressEvents:!0},or={},sr=[],cr={},lr,ur={},dr={},fr=30,pr=[],mr=``,hr=function(e){var t=e[0],n,r;if(jn(t)||G(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=pr.length;r--&&!pr[r].targetTest(t););n=pr[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new ta(e[r],n)))||e.splice(r,1);return e},gr=function(e){return e._gsap||hr(di(e))[0]._gsap},_r=function(e,t,n){return(n=e[t])&&G(n)?e[t]():An(n)&&e.getAttribute&&e.getAttribute(t)||n},vr=function(e,t){return(e=e.split(`,`)).forEach(t)||e},q=function(e){return Math.round(e*1e5)/1e5||0},J=function(e){return Math.round(e*1e7)/1e7||0},yr=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},br=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},xr=function(){var e=sr.length,t=sr.slice(0),n,r;for(cr={},sr.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Sr=function(e){return!!(e._initted||e._startAt||e.add)},Cr=function(e,t,n,r){sr.length&&!bn&&xr(),e.render(t,n,r||!!(bn&&t<0&&Sr(e))),sr.length&&!bn&&xr()},wr=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Wn).length<2?t:On(e)?e.trim():e},Tr=function(e){return e},Er=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Dr=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},Or=function(e,t){for(var n in t)e[n]=t[n];return e},kr=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=jn(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Ar=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},jr=function(e){var t=e.parent||K,n=e.keyframes?Dr(In(e.keyframes)):Er;if(Mn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Mr=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Nr=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Pr=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Fr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ir=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Lr=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Rr=function(e,t,n,r){return e._startAt&&(bn?e._startAt.revert(ir):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},zr=function e(t){return!t||t._ts&&e(t.parent)},Br=function(e){return e._repeat?Vr(e._tTime,e=e.duration()+e._rDelay)*e:0},Vr=function(e,t){var n=Math.floor(e=J(e/t));return e&&n===e?n-1:n},Hr=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ur=function(e){return e._end=J(e._start+(e._tDur/Math.abs(e._ts||e._rts||W)||0))},Wr=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=J(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ur(e),n._dirty||Ir(n,e)),e},Gr=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Hr(e.rawTime(),t),(!t._dur||ai(0,t.totalDuration(),n)-t._tTime>W)&&t.render(n,!0)),Ir(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-W}},Kr=function(e,t,n,r){return t.parent&&Fr(t),t._start=J((kn(n)?n:n||e!==K?ni(e,n,t):e._time)+t._delay),t._end=J(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Nr(e,t,`_first`,`_last`,e._sort?`_start`:0),Xr(t)||(e._recent=t),r||Gr(e,t),e._ts<0&&Wr(e,e._tTime),e},qr=function(e,t){return(Yn.ScrollTrigger||$n(`scrollTrigger`,t))&&Yn.ScrollTrigger.create(t,e)},Jr=function(e,t,n,r,i){if(ua(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!bn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&lr!==Hi.frame)return sr.push(e),e._lazy=[i,r],1},Yr=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Xr=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Zr=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Yr(e)&&(e._initted||!Xr(e))||(e._ts<0||e._dp._ts<0)&&!Xr(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=ai(0,e._tDur,t),l=Vr(s,o),e._yoyo&&l&1&&(a=1-a),l!==Vr(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||bn||r||e._zTime===W||!t&&e._zTime){if(!e._initted&&Jr(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?W:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Rr(e,t,n,!0),e._onUpdate&&!n&&Oi(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&Oi(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Fr(e,1),!n&&!bn&&(Oi(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Qr=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},$r=function(e,t,n,r){var i=e._repeat,a=J(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:J(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Wr(e,e._tTime=e._tDur*o),e.parent&&Ur(e),n||Ir(e.parent,e),e},ei=function(e){return e instanceof ra?Ir(e):$r(e,e._dur)},ti={_start:0,endTime:nr,totalDuration:nr},ni=function e(t,n,r){var i=t.labels,a=t._recent||ti,o=t.duration()>=xn?a.endTime(!1):t._dur,s,c,l;return On(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(In(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},ri=function(e,t,n){var r=kn(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Mn(s.vars.inherit)&&s.parent;a.immediateRender=Mn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new _a(t[0],a,t[i+1])},ii=function(e,t){return e||e===0?t(e):t},ai=function(e,t,n){return n<e?e:n>t?t:n},oi=function(e,t){return!On(e)||!(t=Gn.exec(e))?``:t[1]},si=function(e,t,n){return ii(n,function(n){return ai(e,t,n)})},ci=[].slice,li=function(e,t){return e&&jn(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&jn(e[0]))&&!e.nodeType&&e!==Kn},ui=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return On(e)&&!t||li(e,1)?(r=n).push.apply(r,di(e)):n.push(e)})||n},di=function(e,t,n){return U&&!t&&U.selector?U.selector(e):On(e)&&!n&&(qn||!Ui())?ci.call((t||Jn).querySelectorAll(e),0):In(e)?ui(e,n):li(e)?ci.call(e,0):e?[e]:[]},fi=function(e){return e=di(e)[0]||er(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return di(t,n.querySelectorAll?n:n===e?er(`Invalid scope`)||Jn.createElement(`div`):e)}},pi=function(e){return e.sort(function(){return .5-Math.random()})},mi=function(e){if(G(e))return e;var t=jn(e)?e:{each:e},n=Xi(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return On(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,xn])[1],!S){for(b=-xn;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===xn?0:s?f*u/S-.5:r/S|0,b=0,x=xn,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):Tn(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&pi(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=oi(t.amount||t.each)||0,n=n&&f<0?Yi(n):n}return f=(p[e]-p.min)/p.max||0,J(p.b+(n?n(f):f)*p.v)+p.u}},hi=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=J(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(kn(n)?0:oi(n))}},gi=function(e,t){var n=In(e),r,i;return!n&&jn(e)&&(r=n=e.radius||xn,e.values?(e=di(e.values),(i=!kn(e[0]))&&(r*=r)):e=hi(e.increment)),ii(t,n?G(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=xn,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||kn(t)?s:s+oi(t)}:hi(e))},_i=function(e,t,n,r){return ii(In(e)?!t:n===!0?!!(n=0):!r,function(){return In(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},vi=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},yi=function(e,t){return function(n){return e(parseFloat(n))+(t||oi(n))}},bi=function(e,t,n){return Ti(e,t,0,1,n)},xi=function(e,t,n){return ii(n,function(n){return e[~~t(n)]})},Si=function e(t,n,r){var i=n-t;return In(t)?xi(t,e(0,t.length),n):ii(r,function(e){return(i+(e-t)%i)%i+t})},Ci=function e(t,n,r){var i=n-t,a=i*2;return In(t)?xi(t,e(0,t.length-1),n):ii(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},wi=function(e){return e.replace(Ln,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(Rn);return _i(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},Ti=function(e,t,n,r,i){var a=t-e,o=r-n;return ii(i,function(t){return n+((t-e)/a*o||0)})},Ei=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=On(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(In(t)&&!In(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=Or(In(t)?[]:{},t));if(!u){for(c in n)aa.call(s,t,c,`get`,n[c]);a=function(e){return Ea(e,s)||(o?t.p:t)}}}return ii(r,a)},Di=function(e,t,n){var r=e.labels,i=xn,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},Oi=function(e,t,n){var r=e.vars,i=r[t],a=U,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&sr.length&&xr(),o&&(U=o),l=s?i.apply(c,s):i.call(c),U=a,l},ki=function(e){return Fr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!bn),e.progress()<1&&Oi(e,`onInterrupt`),e},Ai,ji=[],Mi=function(e){if(e){if(e=!e.name&&e.default||e,Nn()||e.headless){var t=e.name,n=G(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:nr,render:Ea,add:aa,kill:Oa,modifier:Da,rawVars:0},a={targetTest:0,get:0,getSetter:Sa,aliases:{},register:0};if(Ui(),e!==r){if(ur[t])return;Er(r,Er(Ar(e,i),a)),Or(r.prototype,Or(i,Ar(e,a))),ur[r.prop=t]=r,e.targetTest&&(pr.push(r),or[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}tr(t,r),e.register&&e.register(Ga,r,ja)}else ji.push(e)}},Y=255,Ni={aqua:[0,Y,Y],lime:[0,Y,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y],navy:[0,0,128],white:[Y,Y,Y],olive:[128,128,0],yellow:[Y,Y,0],orange:[Y,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y,0,0],pink:[Y,192,203],cyan:[0,Y,Y],transparent:[Y,Y,Y,0]},Pi=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Y+.5|0},Fi=function(e,t,n){var r=e?kn(e)?[e>>16,e>>8&Y,e&Y]:0:Ni.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ni[e])r=Ni[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Y,r&Y,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Y,e&Y]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(zn),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Pi(s+1/3,i,a),r[1]=Pi(s,i,a),r[2]=Pi(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Bn),n&&r.length<4&&(r[3]=1),r}else r=e.match(zn)||Ni.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/Y,a=r[1]/Y,o=r[2]/Y,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},Ii=function(e){var t=[],n=[],r=-1;return e.split(Ri).forEach(function(e){var i=e.match(Vn)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Li=function(e,t,n){var r=``,i=(e+r).match(Ri),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Fi(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=Ii(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(Ri,`1`).split(Vn),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(Ri),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},Ri=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ni)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),zi=/hsl[a]?\(/,Bi=function(e){var t=e.join(` `),n;if(Ri.lastIndex=0,Ri.test(t))return n=zi.test(t),e[1]=Li(e[1],n),e[0]=Li(e[0],n,Ii(e[1])),!0},Vi,Hi=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Zn&&(!qn&&Nn()&&(Kn=qn=window,Jn=Kn.document||{},Yn.gsap=Ga,(Kn.gsapVersions||(Kn.gsapVersions=[])).push(Ga.version),Qn(Xn||Kn.GreenSockGlobals||!Kn.gsap&&Kn||{}),ji.forEach(Mi)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Vi=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Vi=0,l=nr},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Ui(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Ui=function(){return!Vi&&Hi.wake()},X={},Wi=/^[\d.\-M][\d.\-,\s]/,Gi=/["']/g,Ki=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Gi,``).trim():+c,r=s.substr(o+1).trim();return t},qi=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Ji=function(e){var t=(e+``).split(`(`),n=X[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[Ki(t[1])]:qi(e).split(`,`).map(wr)):X._CE&&Wi.test(e)?X._CE(``,e):n},Yi=function(e){return function(t){return 1-e(1-t)}},Xi=function(e,t){return e&&(G(e)?e:X[e]||Ji(e))||t},Zi=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return vr(e,function(e){for(var t in X[e]=Yn[e]=i,X[a=e.toLowerCase()]=n,i)X[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=X[e+`.`+t]=i[t]}),i},Qi=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},$i=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/Sn*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*Dn((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Qi(s);return a=Sn/a,c.config=function(n,r){return e(t,n,r)},c},ea=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Qi(r);return i.config=function(n){return e(t,n)},i};vr(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Zi(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),X.Linear.easeNone=X.none=X.Linear.easeIn,Zi(`Elastic`,$i(`in`),$i(`out`),$i()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Zi(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Zi(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Zi(`Circ`,function(e){return-(Tn(1-e*e)-1)}),Zi(`Sine`,function(e){return e===1?1:-En(e*Cn)+1}),Zi(`Back`,ea(`in`),ea(`out`),ea()),X.SteppedEase=X.steps=Yn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-W;return function(e){return((r*ai(0,a,e)|0)+i)*n}}},vn.ease=X[`quad.out`],vr(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return mr+=e+`,`+e+`Params,`});var ta=function(e,t){this.id=wn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:_r,this.set=t?t.getSetter:Sa},na=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,$r(this,+e.duration,1,1),this.data=e.data,U&&(this._ctx=U,U.data.push(this)),Vi||Hi.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,$r(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Ui(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Wr(this,e),!n._dp||n.parent||Gr(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&Kr(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===W||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),Cr(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Br(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Br(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Vr(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-W?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Hr(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-W?0:this._rts,this.totalTime(ai(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Ur(this),Lr(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ui(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==W&&(this._tTime-=W)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=J(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&Kr(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Mn(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Hr(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=ar);var t=bn;return bn=e,Sr(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),bn=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,ei(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,ei(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(ni(this,e),Mn(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Mn(t)),this._dur||(this._zTime=-W),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-W:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-W,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-W)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=G(e)?e:Tr,a=function(){var e=t.then;t.then=null,n&&n(),G(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){ki(this)},e}();Er(na.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-W,_prom:0,_ps:!1,_rts:1});var ra=function(e){gn(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Mn(t.sortChildren),K&&Kr(t.parent||K,hn(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&qr(hn(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return ri(0,arguments,this),this},n.from=function(e,t,n){return ri(1,arguments,this),this},n.fromTo=function(e,t,n,r){return ri(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,jr(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new _a(e,t,ni(this,n),1),this},n.call=function(e,t,n){return Kr(this,_a.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new _a(e,n,ni(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,jr(n).immediateRender=Mn(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,jr(r).immediateRender=Mn(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:J(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==K&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=J(o%f),o===i?(d=this._repeat,c=a):(_=J(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Vr(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:J(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&Oi(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Qr(this,J(r),J(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(Oi(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-W);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||bn&&Sr(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-W:W);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-W)._zTime=c>=r?1:-1,this._ts))return this._start=g,Ur(this),this.render(e,t,n);this._onUpdate&&!t&&Oi(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Fr(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(Oi(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(kn(t)||(t=ni(this,t,e)),!(e instanceof na)){if(In(e))return e.forEach(function(e){return n.add(e,t)}),this;if(On(e))return this.addLabel(e,t);if(G(e))e=_a.delayedCall(0,e);else return this}return this===e?this:Kr(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-xn);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof _a?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return On(e)?this.removeLabel(e):G(e)?this.killTweensOf(e):(e.parent===this&&Pr(this,e),e===this._recent&&(this._recent=this._last),Ir(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=J(Hi.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=ni(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=_a.delayedCall(0,t||nr,n);return r.data=`isPause`,this._hasPause=1,Kr(this,r,ni(this,e))},n.removePause=function(e){var t=this._first;for(e=ni(this,e);t;)t._start===e&&t.data===`isPause`&&Fr(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)ca!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=di(e),i=this._first,a=kn(t),o;i;)i instanceof _a?br(i._targets,r)&&(a?(!ca||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=ni(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=_a.to(n,Er({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||W,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&$r(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,Er({startAt:{time:ni(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),Di(this,ni(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),Di(this,ni(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+W)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=J(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return Ir(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),Ir(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=xn,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,Kr(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=J(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;$r(n,n===K&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(K._ts&&(Cr(K,Hr(e,K)),lr=Hi.frame),Hi.frame>=fr){fr+=_n.autoSleep||120;var t=K._first;if((!t||!t._ts)&&_n.autoSleep&&Hi._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Hi.sleep()}}},t}(na);Er(ra.prototype,{_lock:0,_hasPause:0,_forcing:0});var ia=function(e,t,n,r,i,a,o){var s=new ja(this._pt,e,t,0,1,Ta,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=wi(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Hn)||[];u=Hn.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?yr(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Hn.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(Un.test(r)||g)&&(s.e=0),this._pt=s,s},aa=function(e,t,n,r,i,a,o,s,c,l){G(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?G(u)?c?e[t.indexOf(`set`)||!G(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=G(u)?c?ba:ya:va,p;if(On(r)&&(~r.indexOf(`random(`)&&(r=wi(r)),r.charAt(1)===`=`&&(p=yr(d,r)+(oi(d)||0),(p||p===0)&&(r=p))),!l||d!==r||la)return!isNaN(d*r)&&r!==``?(p=new ja(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?wa:Ca,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&$n(t,r),ia.call(this,e,t,d,r,f,s||_n.stringFilter,c))},oa=function(e,t,n,r,i){if(G(e)&&(e=ma(e,i,t,n,r)),!jn(e)||e.style&&e.nodeType||In(e)||Fn(e))return On(e)?ma(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=ma(e[o],i,t,n,r);return a},sa=function(e,t,n,r,i,a){var o,s,c,l;if(ur[e]&&(o=new ur[e]).init(i,o.rawVars?t[e]:oa(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new ja(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ai))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},ca,la,ua=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!yn,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,ee,te,ne;if(b&&(!f||!a)&&(a=`none`),t._ease=Xi(a,vn.ease),t._rEase=x&&(Xi(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?gr(g[0]).harness:0,te=k&&i[k.prop],S=Ar(i,or),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?ir:rr),h._lazy=0),o){if(Fr(t._startAt=_a.set(g,Er({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Mn(c),startAt:null,delay:0,onUpdate:l&&function(){return Oi(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(bn||!s&&!p)&&t._startAt.revert(ir),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=Er({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Mn(c),immediateRender:s,stagger:0,parent:_},S),te&&(w[k.prop]=te),Fr(t._startAt=_a.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(bn?t._startAt.revert(ir):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,W,W);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Mn(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||hr(g)[C]._gsap,t._ptLookup[C]=j={},cr[O.id]&&sr.length&&xr(),ee=v===g?C:v.indexOf(E),k&&(A=new k).init(E,te||S,t,ee,v)!==!1&&(t._pt=T=new ja(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||te)for(w in S)ur[w]&&(A=sa(w,S,t,ee,E,v))?A.priority&&(D=1):j[w]=T=aa.call(t,E,w,`get`,S[w],ee,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(ca=t,K.killTweensOf(E,j,t.globalTime(n)),ne=!t.parent,ca=0),t._pt&&c&&(cr[O.id]=1)}D&&Aa(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ne,f&&n<=0&&b.render(xn,!0,!0)},da=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return la=1,e.vars[t]=`+=0`,ua(e,o),la=0,s?er(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=q(n)+oi(u.e)),u.b&&(u.b=l.s+oi(u.b))},fa=function(e,t){var n=e[0]?gr(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=Or({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},pa=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(In(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},ma=function(e,t,n,r,i){return G(e)?e.call(t,n,r,i):On(e)&&~e.indexOf(`random(`)?wi(e):e},ha=mr+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,ga={};vr(ha+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return ga[e]=1});var _a=function(e){gn(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:jr(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||K,g=(In(t)||Fn(t)?kn(t[0]):`length`in n)?[t]:di(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?hr(g):er(`GSAP target `+t+` not found. https://gsap.com`,!_n.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Pn(s)||Pn(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new ra({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=hn(a),_._start=0,u||Pn(s)||Pn(c)){if(b=g.length,C=u&&mi(u),jn(u))for(x in u)~ha.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Ar(n,ga),y.stagger=0,T&&(y.easeReverse=T),w&&Or(y,w),S=g[v],y.duration=+ma(s,hn(a),v,S,g),y.delay=(+ma(c,hn(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=X.none;_.duration()?s=c=0:a.timeline=0}else if(f){jr(Er(_.vars.defaults,{ease:`none`})),_._ease=Xi(f.ease||n.ease||`none`);var E=0,D,O,k;if(In(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||pa(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!yn&&(ca=hn(a),K.killTweensOf(g),ca=0),Kr(h,hn(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===J(h._time)&&Mn(l)&&zr(hn(a))&&h.data!==`nested`)&&(a._tTime=-W,a.render(Math.max(0,-c)||0)),m&&qr(hn(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-W&&!o?i:e<W?0:e,c,l,u,d,f,p,m,h;if(!a)Zr(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=J(s%d),s===i?(u=this._repeat,c=a):(f=J(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Vr(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(J(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(Jr(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(Oi(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&Rr(this,e,t,n),Oi(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&Oi(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&Rr(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Fr(this,1),!t&&(!o||r)&&(s||r||p)&&(Oi(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Vi||Hi.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||ua(this,a),o=this._ease(a/this._dur),da(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Wr(this,0),this.parent||Nr(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?ki(this):this.scrollTrigger&&this.scrollTrigger.kill(!!bn),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,ca&&ca.vars.overwrite!==!0)._first||ki(this),this.parent&&n!==this.timeline.totalDuration()&&$r(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?di(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Mr(r,i))return t===`all`&&(this._pt=0),ki(this);for(s=this._op=this._op||[],t!==`all`&&(On(t)&&(d={},vr(t,function(e){return d[e]=1}),t=d),t=fa(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Pr(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&ki(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return ri(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return ri(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return K.killTweensOf(e,t,n)},t}(na);Er(_a.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),vr(`staggerTo,staggerFrom,staggerFromTo`,function(e){_a[e]=function(){var t=new ra,n=ci.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var va=function(e,t,n){return e[t]=n},ya=function(e,t,n){return e[t](n)},ba=function(e,t,n,r){return e[t](r.fp,n)},xa=function(e,t,n){return e.setAttribute(t,n)},Sa=function(e,t){return G(e[t])?ya:An(e[t])&&e.setAttribute?xa:va},Ca=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},wa=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Ta=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Ea=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},Da=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},Oa=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Pr(this,t,`_pt`):t.dep||(n=1),t=r;return!n},ka=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Aa=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},ja=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||Ca,this.d=o||this,this.set=s||va,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=ka,this.m=e,this.mt=n,this.tween=t},e}();vr(mr+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return or[e]=1}),Yn.TweenMax=Yn.TweenLite=_a,Yn.TimelineLite=Yn.TimelineMax=ra,K=new ra({sortChildren:!1,defaults:vn,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),_n.stringFilter=Bi;var Ma=[],Na={},Pa=[],Fa=0,Ia=0,La=function(e){return(Na[e]||Pa).map(function(e){return e()})},Ra=function(){var e=Date.now(),t=[];e-Fa>2&&(La(`matchMediaInit`),Ma.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=Kn.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),La(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Fa=e,La(`matchMedia`))},za=function(){function e(e,t){this.selector=t&&fi(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Ia++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){G(e)&&(n=t,t=e,e=G);var r=this,i=function(){var e=U,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=fi(n)),U=r,a=t.apply(r,arguments),G(a)&&r._r.push(a),U=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===G?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=U;U=null,e(this),U=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof _a&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof ra?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof _a)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=Ma.length;r--;)Ma[r].id===this.id&&Ma.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Ba=function(){function e(e){this.contexts=[],this.scope=e,U&&U.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){jn(e)||(e={matches:e});var r=new za(0,n||this.scope),i=r.conditions={},a,o,s;for(o in U&&!r.selector&&(r.selector=U.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=Kn.matchMedia(e[o]),a&&(Ma.indexOf(r)<0&&Ma.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Ra):a.addEventListener(`change`,Ra)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Va={registerPlugin:function(){[...arguments].forEach(function(e){return Mi(e)})},timeline:function(e){return new ra(e)},getTweensOf:function(e,t){return K.getTweensOf(e,t)},getProperty:function(e,t,n,r){On(e)&&(e=di(e)[0]);var i=gr(e||{}).get,a=n?Tr:wr;return n===`native`&&(n=``),e&&(t?a((ur[t]&&ur[t].get||i)(e,t,n,r)):function(t,n,r){return a((ur[t]&&ur[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=di(e),e.length>1){var r=e.map(function(e){return Ga.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=ur[t],o=gr(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ai._pt=0,r.init(e,n?t+n:t,Ai,0,[e]),r.render(1,r),Ai._pt&&Ea(1,Ai)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=Ga.to(e,Er((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return K.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Xi(e.ease,vn.ease)),kr(vn,e||{})},config:function(e){return kr(_n,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!ur[e]&&!Yn[e]&&er(t+` effect requires `+e+` plugin.`)}),dr[t]=function(e,t,r){return n(di(e),Er(t||{},i),r)},a&&(ra.prototype[t]=function(e,n,r){return this.add(dr[t](e,jn(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){X[e]=Xi(t)},parseEase:function(e,t){return arguments.length?Xi(e,t):X},getById:function(e){return K.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ra(e),r,i;for(n.smoothChildTiming=Mn(e.smoothChildTiming),K.remove(n),n._dp=0,n._time=n._tTime=K._time,r=K._first;r;)i=r._next,(t||!(!r._dur&&r instanceof _a&&r.vars.onComplete===r._targets[0]))&&Kr(n,r,r._start-r._delay),r=i;return Kr(K,n,0),n},context:function(e,t){return e?new za(e,t):U},matchMedia:function(e){return new Ba(e)},matchMediaRefresh:function(){return Ma.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Ra()},addEventListener:function(e,t){var n=Na[e]||(Na[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Na[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Si,wrapYoyo:Ci,distribute:mi,random:_i,snap:gi,normalize:bi,getUnit:oi,clamp:si,splitColor:Fi,toArray:di,selector:fi,mapRange:Ti,pipe:vi,unitize:yi,interpolate:Ei,shuffle:pi},install:Qn,effects:dr,ticker:Hi,updateRoot:ra.updateRoot,plugins:ur,globalTimeline:K,core:{PropTween:ja,globals:tr,Tween:_a,Timeline:ra,Animation:na,getCache:gr,_removeLinkedListItem:Pr,reverting:function(){return bn},context:function(e){return e&&U&&(U.data.push(e),e._ctx=U),U},suppressOverwrites:function(e){return yn=e}}};vr(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Va[e]=_a[e]}),Hi.add(ra.updateRoot),Ai=Va.to({},{duration:0});var Ha=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Ua=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Ha(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Wa=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(On(n)&&(r={},vr(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Ua(e,n)}}}},Ga=Va.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)bn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Wa(`roundProps`,hi),Wa(`modifiers`),Wa(`snap`,gi))||Va;_a.version=ra.version=Ga.version=`3.15.0`,Zn=1,Nn()&&Ui(),X.Power0,X.Power1,X.Power2,X.Power3,X.Power4,X.Linear,X.Quad,X.Cubic,X.Quart,X.Quint,X.Strong,X.Elastic,X.Back,X.SteppedEase,X.Bounce,X.Sine,X.Expo,X.Circ;var Ka,qa,Ja,Ya,Xa,Za,Qa,$a=function(){return typeof window<`u`},eo={},to=180/Math.PI,no=Math.PI/180,ro=Math.atan2,io=1e8,ao=/([A-Z])/g,oo=/(left|right|width|margin|padding|x)/i,so=/[\s,\(]\S/,co={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},lo=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},uo=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},fo=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},po=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},mo=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},ho=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},go=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},_o=function(e,t,n){return e.style[t]=n},vo=function(e,t,n){return e.style.setProperty(t,n)},yo=function(e,t,n){return e._gsap[t]=n},bo=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},xo=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},So=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},Z=`transform`,Co=Z+`Origin`,wo=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in eo&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=co[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Uo(i,e)}):this.tfm[t]=o.x?o[t]:Uo(i,t),t===Co&&(this.tfm.zOrigin=o.zOrigin);else return co.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(Z)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(Co,n,``)),t=Z}(a||n)&&this.props.push(t,n,a[t])},To=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},Eo=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(ao,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Qa(),(!i||!i.isStart)&&!n[Z]&&(To(n),r.zOrigin&&n[Co]&&(n[Co]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Do=function(e,t){var n={target:e,props:[],revert:Eo,save:wo};return e._gsap||Ga.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},Oo,ko=function(e,t){var n=qa.createElementNS?qa.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):qa.createElement(e);return n&&n.style?n:qa.createElement(e)},Ao=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(ao,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,Mo(n)||n,1)||``},jo=`O,Moz,ms,Ms,Webkit`.split(`,`),Mo=function(e,t,n){var r=(t||Xa).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(jo[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?jo[i]:``)+e},No=function(){$a()&&window.document&&(Ka=window,qa=Ka.document,Ja=qa.documentElement,Xa=ko(`div`)||{style:{}},ko(`div`),Z=Mo(Z),Co=Z+`Origin`,Xa.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,Oo=!!Mo(`perspective`),Qa=Ga.core.reverting,Ya=1)},Po=function(e){var t=e.ownerSVGElement,n=ko(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ja.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ja.removeChild(n),i},Fo=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Io=function(e){var t,n;try{t=e.getBBox()}catch{t=Po(e),n=1}return t&&(t.width||t.height)||n||(t=Po(e)),t&&!t.width&&!t.x&&!t.y?{x:+Fo(e,[`x`,`cx`,`x1`])||0,y:+Fo(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},Lo=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!Io(e))},Ro=function(e,t){if(t){var n=e.style,r;t in eo&&t!==Co&&(t=Z),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(ao,`-$1`).toLowerCase())):n.removeAttribute(t)}},zo=function(e,t,n,r,i,a){var o=new ja(e._pt,t,n,0,1,a?go:ho);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Bo={deg:1,rad:1,turn:1},Vo={grid:1,flex:1},Ho=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Xa.style,c=oo.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Bo[i]||Bo[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&Lo(t),(p||o===`%`)&&(eo[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],q(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===qa||!h.appendChild)&&(h=qa.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Hi.time&&!g.uncache)return q(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Ro(t,n)}else(p||o===`%`)&&!Vo[Ao(h,`display`)]&&(s.position=Ao(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Xa),m=Xa[u],h.removeChild(Xa),s.position=`absolute`;return c&&p&&(g=gr(h),g.time=Hi.time,g.width=h[u]),q(f?m*a/d:m&&a?d/m*a:0)},Uo=function(e,t,n,r){var i;return Ya||No(),t in co&&t!==`transform`&&(t=co[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),eo[t]&&t!==`transform`?(i=ts(e,r),i=t===`transformOrigin`?i.svg?i.origin:ns(Ao(e,Co))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=Jo[t]&&Jo[t](e,t,n)||Ao(e,t)||_r(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Ho(e,t,i,n)+n:i},Wo=function(e,t,n,r){if(!n||n===`none`){var i=Mo(t,e,1),a=i&&Ao(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=Ao(e,`borderTopColor`))}var o=new ja(this._pt,e.style,t,0,1,Ta),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=Ao(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=Ao(e,t)||r,m?e.style[t]=m:Ro(e,t)),l=[n,r],Bi(l),n=l[0],r=l[1],d=n.match(Vn)||[],b=r.match(Vn)||[],b.length){for(;u=Vn.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=yr(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Vn.lastIndex-v.length,v||(v=v||_n.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Ho(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?go:ho;return Un.test(r)&&(o.e=0),this._pt=o,o},Go={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Ko=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Go[n]||n,t[1]=Go[r]||r,t.join(` `)},qo=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],eo[o]&&(s=1,o=o===`transformOrigin`?Co:Z),Ro(n,o);s&&(Ro(n,Z),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,ts(n,1),a.uncache=1,To(r)))}},Jo={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new ja(e._pt,t,n,0,0,qo);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Yo=[1,0,0,1,0,0],Xo={},Zo=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Qo=function(e){var t=Ao(e,Z);return Zo(t)?Yo:t.substr(7).match(Bn).map(q)},$o=function(e,t){var n=e._gsap||gr(e),r=e.style,i=Qo(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Yo:i):(i===Yo&&!e.offsetParent&&e!==Ja&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ja.appendChild(e)),i=Qo(e),s?r.display=s:Ro(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ja.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},es=function(e,t,n,r,i,a){var o=e._gsap,s=i||$o(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Yo&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Io(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Co]=`0px 0px`,a&&(zo(a,o,`xOrigin`,c,y),zo(a,o,`yOrigin`,l,b),zo(a,o,`xOffset`,u,o.xOffset),zo(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},ts=function(e,t){var n=e._gsap||new ta(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=Ao(e,Co)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,ee,te,ne,re,ie,ae,oe,se,ce;return n.svg=!!(e.getCTM&&Lo(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[Z]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[Z]===`none`?``:s[Z])),r.scale=r.rotate=r.translate=`none`),S=$o(e,n.svg),n.svg&&(n.uncache?(te=e.getBBox(),c=n.xOrigin-te.x+`px `+(n.yOrigin-te.y)+`px`,ee=``):ee=!t&&e.getAttribute(`data-svg-origin`),es(e,ee||c,!!ee||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Yo&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?ro(D,E)*to:0,_=O||k?ro(O,k)*to+m:0,_&&(p*=Math.abs(Math.cos(_*no))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(ce=S[6],oe=S[7],re=S[8],ie=S[9],ae=S[10],se=S[11],l=S[12],u=S[13],d=S[14],C=ro(ce,ae),h=C*to,C&&(w=Math.cos(-C),T=Math.sin(-C),ee=A*w+re*T,te=j*w+ie*T,ne=ce*w+ae*T,re=A*-T+re*w,ie=j*-T+ie*w,ae=ce*-T+ae*w,se=oe*-T+se*w,A=ee,j=te,ce=ne),C=ro(-O,ae),g=C*to,C&&(w=Math.cos(-C),T=Math.sin(-C),ee=E*w-re*T,te=D*w-ie*T,ne=O*w-ae*T,se=k*T+se*w,E=ee,D=te,O=ne),C=ro(D,E),m=C*to,C&&(w=Math.cos(C),T=Math.sin(C),ee=E*w+D*T,te=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=ee,A=te),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=q(Math.sqrt(E*E+D*D+O*O)),p=q(Math.sqrt(j*j+ce*ce)),C=ro(A,j),_=Math.abs(C)>2e-4?C*to:0,y=se?1/(se<0?-se:se):0),n.svg&&(ee=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Zo(Ao(e,Z)),ee&&e.setAttribute(`transform`,ee))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=q(f),n.scaleY=q(p),n.rotation=q(m)+o,n.rotationX=q(h)+o,n.rotationY=q(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[Co]=ns(c)),n.xOffset=n.yOffset=0,n.force3D=_n.force3D,n.renderTransform=n.svg?ls:Oo?cs:is,n.uncache=0,n},ns=function(e){return(e=e.split(` `))[0]+` `+e[1]},rs=function(e,t,n){var r=oi(t);return q(parseFloat(t)+parseFloat(Ho(e,`x`,n+`px`,r)))+r},is=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,cs(e,t)},as=`0deg`,os=`0px`,ss=`) `,cs=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==as||l!==as)){var x=parseFloat(l)*no,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*no,w=Math.cos(x),a=rs(_,a,S*w*-v),o=rs(_,o,-Math.sin(x)*-v),s=rs(_,s,C*w*-v+v)}h!==os&&(y+=`perspective(`+h+ss),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==os||o!==os||s!==os)&&(y+=s!==os||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+ss),c!==as&&(y+=`rotate(`+c+ss),l!==as&&(y+=`rotateY(`+l+ss),u!==as&&(y+=`rotateX(`+u+ss),(d!==as||f!==as)&&(y+=`skew(`+d+`, `+f+ss),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+ss),_.style[Z]=y||`translate(0, 0)`},ls=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=no,c*=no,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=no,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=q(b),x=q(x),S=q(S),C=q(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Ho(f,`x`,a,`px`),y=Ho(f,`y`,o,`px`)),(p||m||h||g)&&(v=q(v+p-(p*b+m*S)+h),y=q(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=q(v+r/100*w.width),y=q(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[Z]=w)},us=function(e,t,n,r,i){var a=360,o=On(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?to:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*io)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*io)%a-~~(s/a)*a)),e._pt=u=new ja(e._pt,t,n,r,s,uo),u.e=c,u.u=`deg`,e._props.push(n),u},ds=function(e,t){for(var n in t)e[n]=t[n];return e},fs=function(e,t,n){var r=ds({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[Z]=t,o=ts(n,1),Ro(n,Z),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[Z],a[Z]=t,o=ts(n,1),a[Z]=c),eo)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=oi(c),p=oi(l),u=f===p?parseFloat(c):Ho(n,s,c,p),d=parseFloat(l),e._pt=new ja(e._pt,o,s,u,d-u,lo),e._pt.u=p||0,e._props.push(s));ds(o,r)};vr(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});Jo[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Uo(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var ps={name:`css`,register:No,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Ya||No(),this.styles=this.styles||Do(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(ur[m]&&sa(m,t,n,r,e,i)))){if(f=typeof l,p=Jo[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=wi(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,Ri.lastIndex=0,Ri.test(c)||(h=oi(c),g=oi(l),g?h!==g&&(c=Ho(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],On(c)&&~c.indexOf(`random(`)&&(c=wi(c)),oi(c+``)||c===`auto`||(c+=_n.units[m]||oi(Uo(e,m))||``),(c+``).charAt(1)===`=`&&(c=Uo(e,m))):c=Uo(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in co&&(m===`autoAlpha`&&(d===1&&Uo(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),zo(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=co[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in eo,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=Ao(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=Ao(e,`perspective`),T?e.style.perspective=T:Ro(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||ts(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new ja(this._pt,o,Z,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new ja(this._pt,b,`scaleY`,b.scaleY,(_?yr(b.scaleY,_+u):u)-b.scaleY||0,lo),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(Co,0,o[Co]),l=Ko(l),b.svg?es(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&zo(this,b,`zOrigin`,b.zOrigin,g),zo(this,o,m,ns(c),ns(l)));continue}else if(m===`svgOrigin`){es(e,l,1,x,0,this);continue}else if(m in Xo){us(this,b,m,d,_?yr(d,_+l):l);continue}else if(m===`smoothOrigin`){zo(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){fs(this,l,e);continue}}else m in o||(m=Mo(m)||m);if(v||(u||u===0)&&(d||d===0)&&!so.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=oi(l)||(m in _n.units?_n.units[m]:h),h!==g&&(d=Ho(e,m,c,g)),this._pt=new ja(this._pt,v?b:o,m,d,(_?yr(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?mo:lo),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=po):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=fo);else if(m in o)Wo.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){$n(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Aa(this)},render:function(e,t){if(t.tween._time||!Qa())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Uo,aliases:co,getSetter:function(e,t,n){var r=co[t];return r&&r.indexOf(`,`)<0&&(t=r),t in eo&&t!==Co&&(e._gsap.x||Uo(e,`x`))?n&&Za===n?t===`scale`?bo:yo:(Za=n||{})&&(t===`scale`?xo:So):e.style&&!An(e.style[t])?_o:~t.indexOf(`-`)?vo:Sa(e,t)},core:{_removeProperty:Ro,_getMatrix:$o}};Ga.utils.checkPrefix=Mo,Ga.core.getStyleSaver=Do,(function(e,t,n,r){var i=vr(e+`,`+t+`,`+n,function(e){eo[e]=1});vr(t,function(e){_n.units[e]=`deg`,Xo[e]=1}),co[i[13]]=e+`,`+t,vr(r,function(e){var t=e.split(`:`);co[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),vr(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){_n.units[e]=`px`}),Ga.registerPlugin(ps);var ms=Ga.registerPlugin(ps)||Ga;ms.core.Tween,ms.defaults({duration:.32,ease:`power2.out`});var hs=window.matchMedia(`(prefers-reduced-motion: reduce)`),gs=()=>!hs.matches&&!F().reduceMotion;function _s(){document.documentElement.classList.toggle(`reduce-motion`,!gs())}hs.addEventListener(`change`,_s);var vs=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function ys(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(vs)?t.push(...ys(n)):t.push(n));return t}var bs=0,xs=null;function Ss(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=bs,a=xs;if(bs=n.length,xs=r?.getAttribute(`href`)??null,!gs())return;let o=t.querySelector(`.screen__body`),s=o?ys(o):[];ms.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&ms.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&ms.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==xs&&ms.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&ms.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function Cs(e){if(!gs()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&ms.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function ws(e){gs()&&e&&ms.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function Ts(e){return!gs()||!e?Promise.resolve():new Promise(t=>{ms.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function Es(e){gs()&&ms.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function Ds(e,t){if(!gs())return t();ms.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function Os(e){gs()&&ms.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var ks=56,As=[2,9,16,24,33,41,50],js=[48,47,46,45,20,19,18,17],Ms=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`}],Ns=[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],Ps=[[`dizziness`,2,4],[`brain_fog`,2,4],[`fatigue`,3,5],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],Fs=[`poor_sleep`,`stress`,`screen_time`,`weather_change`,`skipped_meal`,`visual_stimulation`,`dehydration`,`bright_light`,`neck_pain`,`long_sleep`];function Is(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Ls(e=new Date){let t=Is(20261019),n=(e,n)=>Math.round(e+t()*(n-e)),r=e=>t()<e,i=e=>e[Math.floor(t()*e.length)],a=0,o=e=>`demo-${e}-${++a}`,s=(t,n,r=0)=>{let i=xe(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},c=(e,t)=>new Date(e.getTime()+t*6e4),l=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),u=Ms.map(t=>{let n=xe(e,-(t.since??90));return{id:`demo-med-${t.key}`,...l(n),name:t.name,type:t.type,dose:t.dose,frequency:t.frequency,note:``,startDate:null,endDate:null}}),d=e=>u.find(t=>t.id===`demo-med-${e}`),f=[],p=Is(20261026),m=e=>e[Math.floor(p()*e.length)],h=(e,t)=>[...new Set(Array.from({length:1+Math.floor(p()*t)},()=>m(e)))],g=e=>({type:m([`vestibular`,`vestibular`,`vestibular`,`migraine_no_headache`,`migraine_headache`]),helped:e,relief:h([`rest`,`sleep`,`dark_room`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`shower`],2),impact:h([`work_study`,`daily_activities`,`daily_activities`,`social`,`movement`,`sleep`,`rest`],2)}),_=[],v=[],y=[],b=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&v.push({id:o(`intake`),...l(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},x=(e,t,n={})=>{e&&_.push({id:o(`log`),...l(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let t of As){let a=s(t,n(13,19),i([0,15,30,45]));if(!a)continue;let u=n(18,66)*5,p=c(a,u),m=n(5,8),h=new Set([i(Fs)]);r(.6)&&h.add(i(Fs)),js.some(e=>Math.abs(e-t)<=1)&&h.add(`menstrual_cycle`);let _=o(`episode`),v={id:_,...l(a),startedAt:a.toISOString(),endedAt:p<=e?p.toISOString():null,type:null,intensity:m,symptoms:[],vertigoTypes:[],triggers:[...h],triggerOther:``,medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``};f.push(v);let y=n(3,6),S=[{key:`vertigo`,intensity:m},{key:`nausea`,intensity:y}];r(.6)&&S.push(i([{key:`light_sensitivity`,intensity:n(3,6)},{key:`headache`,intensity:n(3,7)},{key:`sound_sensitivity`,intensity:n(2,5)}])),x(c(a,10),S,{episodeId:_,duration:u<180?`1_3h`:u<360?`3_6h`:`6_12h`,note:i(Ns)}),r(.4)&&p<=e&&x(c(p,-20),[{key:`fatigue`,intensity:n(4,6)},{key:`brain_fog`,intensity:n(3,5)}],{episodeId:_});let C=i([`helped`,`partly`,`helped`,`not_helped`,`partly`]);b(d(y>=4?`dimenhydrinate`:`ibuprofen`),c(a,35),{effect:C,episodeId:_}),t!==As[0]&&Object.assign(v,g(C))}for(let t=0;t<ks;t++){let a=M(xe(e,-t)),u=As.includes(t);if(t<=3||r(.88)){let i=u?n(60,71)*5:n(74,100)*5,s=i>=430?r(.85)?`good`:`fair`:i>=380?`fair`:`poor`,c=xe(e,-t);c.setHours(6,30,0,0),y.push({id:o(`sleep`),...l(c<=e?c:e),date:a,minutes:i,quality:s,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)x(s(0,9,15)??c(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!u&&r(.32)){let e=r(.35)?2:1,a=[];for(;a.length<e;){let[e,t,o]=i(Ps);a.some(t=>t.key===e)||a.push({key:e,intensity:r(.8)?n(t,o):null})}x(s(t,n(8,20),i([0,10,20,30,40,50])),a,{duration:r(.6)?i([`moment`,`under_1h`,`under_1h`,`1_3h`]):null})}r(.65)&&b(d(`betahistine`),s(t,8,n(0,40))),r(.35)&&b(d(`betahistine`),s(t,20,n(0,30))),t<60&&r(.4)&&b(d(`magnesium`),s(t,21,n(0,30)))}return{records:{medications:u,episodes:f,symptomLogs:_,medicationIntakes:v,sleepLogs:y,cycleEntries:js.map(t=>({id:o(`cycle`),date:M(xe(e,-t)),type:`period`,createdAt:xe(e,-t).toISOString()}))}}}var Rs={facebook:`https://www.facebook.com/groups/3261623930593764`,instagram:`https://www.instagram.com/vestibularnamigrena/`,discord:null,web:`https://www.vestibularnamigrena.sk/`},zs=[`light`,`dark`,`system`],Bs=window.matchMedia(`(prefers-color-scheme: dark)`),Vs=`system`;function Hs(e=Vs){Vs=zs.includes(e)?e:`system`;let t=Vs===`system`?Bs.matches?`dark`:`light`:Vs;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}Bs.addEventListener(`change`,()=>{Vs===`system`&&Hs()});var Us=null;function Ws(e){Ae(e),Gt(F().language??te()??`sk`),Hs(F().theme),_s(),At(),Le()&&F().demoEnabled&&F().demoSeededAt!==M()&&jt(Ls())}function Gs(){j()?(Gt(te()??`sk`),Hs(ne()??`system`),_s()):Ws(ce())}var Ks=()=>ee();function qs(e){j()&&(Us=e&&e!==`/lock`?e:Us,he(),je())}function Js(){qs(`/today`),a(`/lock`,{replace:!0})}function Ys(e){e&&e!==`/lock`&&(Us=e)}function Xs(){let e=Us??`/today`;return Us=null,e}function Zs(){Re(),F().demoEnabled&&jt(Ls()),a(`/today`,{replace:!0})}var Qs=`<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 573.28 138.03">
  <defs>
    <style>
      .cls-1 {
        fill: #f97c5f;
      }

      .cls-2 {
        fill: #1d262d;
      }
    </style>
  </defs>
  <g>
    <path class="cls-1" d="M101.68,39.33l-3.1-.16c-1.11-.05-2.12.73-2.32,1.84-.79,4.33-2.04,11.15-3.29,17.99-1.14,6.21-2.28,12.43-3.07,16.78l-5.28-26.34c-.24-1.19-1.36-1.97-2.56-1.77l-3.05.49c-.6.1-1.14.44-1.49.94-.35.5-.48,1.13-.35,1.72l8.95,44.59c.21,1.05,1.13,1.8,2.2,1.8h.02l3.49-.04c1.07-.01,1.99-.79,2.18-1.84,1.32-7.23,3.1-16.98,4.88-26.73,1.78-9.71,3.55-19.41,4.86-26.62.12-.64-.05-1.29-.45-1.79-.4-.51-1-.82-1.64-.85Z"/>
    <path class="cls-1" d="M135.04,54.1h0c-.43-.42-.98-.65-1.61-.65l-4.89.06c-.73.01-1.4.37-1.82.97-1.87,2.7-3.71,5.43-5.55,8.16l-.65.96-6.25-9.14c-.43-.63-1.13-.99-1.91-.98l-4.74.12c-1.22.03-2.2,1.04-2.19,2.26l.41,55.61c0,.59.25,1.17.68,1.59.42.41.98.64,1.57.64h.03l3.1-.05c1.23-.02,2.22-1.04,2.21-2.26l-.32-45.14c.59.89,1.22,1.86,1.86,2.84,1.11,1.7,2.22,3.41,3.09,4.69.42.62,1.11.99,1.85.99h1.52c.75,0,1.45-.38,1.87-1.01.89-1.36,2.01-3.18,3.09-4.95.56-.92,1.12-1.84,1.65-2.69-.04,5.51-.07,11.76-.11,18-.04,6.48-.08,12.94-.12,18.5,0,.6.23,1.18.66,1.61.42.42,1,.69,1.61.66l3.1-.03c1.22-.01,2.21-1.01,2.22-2.23l.3-46.92c0-.6-.24-1.18-.66-1.6Z"/>
  </g>
  <g>
    <g>
      <path class="cls-2" d="M297.99,21.49c-.33.33-.77.51-1.23.51h-23.63c-.84,0-1.55.6-1.7,1.42-2.88,15.82-5.76,31.65-8.64,47.47-.15.82-.86,1.41-1.68,1.42l-4.35.05c-.83,0-1.55-.57-1.72-1.39l-10.82-53.66c-.09-.46,0-.94.27-1.33s.68-.65,1.15-.72l3.8-.62c.92-.15,1.79.46,1.97,1.37l6.55,32.51c.07.35.38.61.74.6.36,0,.67-.26.73-.62,1.97-10.83,3.94-21.66,5.92-32.49.16-.86.92-1.46,1.79-1.42,0,0,19.14.07,29.57.08.95,0,1.72.76,1.73,1.71l.04,3.87c0,.46-.17.91-.5,1.24ZM299.82,69.71c.02.47-.16.92-.48,1.26-.32.34-.77.53-1.24.53l-20.83.07c-.95,0-1.73-.77-1.74-1.72l-.3-38.77c0-.46.18-.9.5-1.23.32-.33.76-.51,1.22-.51l19.64-.07c.95,0,1.73.76,1.74,1.71l.04,3.86c0,.46-.17.91-.5,1.23-.32.33-.77.51-1.23.52l-13.49.05c-.23,0-.45.09-.61.26-.16.16-.25.38-.25.61,0,.17,0,1.22.01,2.9,0,.46.36.83.81.86l10.58.66c.47.03.9.25,1.2.6s.45.82.41,1.28l-.3,3.35c-.08.93-.89,1.63-1.83,1.57l-9.92-.62c-.24-.02-.47.07-.65.23s-.27.39-.27.63c.04,9.97.1,8.44.12,14.38,0,.23.09.45.26.61.16.16.38.25.61.25l14.62-.05c.94,0,1.7.74,1.74,1.67l.13,3.87Z"/>
      <path class="cls-2" d="M328.83,57.97c1.09,9.78-7.72,17.53-17.23,14.48-8.23-2.64-9.3-11.64-8.68-19.66.07-.92.85-1.62,1.77-1.59l3.7.1c.48.01.93.22,1.25.58.32.36.47.83.42,1.31-.39,3.67-.32,7.54,1.39,10.41,2.24,3.77,7.98,2.49,9.54-1.13,2.05-4.75-1.75-9.51-4.58-13.03-6.19-7.71-15.01-16.87-11.16-27.53,1.62-4.48,5.97-7.99,10.84-8.03,4.81-.05,8.66,3.35,10.37,7.65,1.36,3.43,1.19,7.01.45,10.52-.19.87-1,1.45-1.88,1.36l-3.79-.4c-.5-.05-.94-.32-1.23-.73-.29-.41-.38-.92-.27-1.4,3.46-14.51-12.39-11.38-6.99,1.12,4,9.24,14.88,15.42,16.05,25.98Z"/>
      <path class="cls-2" d="M361.39,15.17c.33.33.51.77.5,1.24l-.04,3.85c0,.95-.78,1.71-1.73,1.72h-12.55c-.23.01-.45.11-.61.27s-.25.39-.25.62l.6,47.53c.01.94-.73,1.72-1.68,1.75l-3.86.12c-.46.01-.92-.16-1.25-.48s-.53-.76-.53-1.23c-.2-15.9-.4-31.79-.6-47.69,0-.48-.39-.86-.87-.85l-6.69.02c-.95,0-1.73-.76-1.74-1.72l-.03-3.87c0-.46.17-.9.5-1.23s.76-.51,1.22-.51c6.15-.02,18.18-.04,28.38-.05.46,0,.91.18,1.23.51ZM361.07,31.42v39.23c0,.94-.76,1.71-1.7,1.73l-3.86.07c-.46,0-.91-.17-1.24-.5s-.52-.77-.52-1.23V31.4c0-.46.18-.9.51-1.23.33-.32.77-.51,1.23-.5l3.87.02c.95,0,1.72.78,1.72,1.73Z"/>
      <path class="cls-2" d="M390.33,64.75c-2.53,8.69-12.24,9.11-20.69,8.14-.86-.1-1.52-.82-1.54-1.69l-.83-55.13c-.02-.93.7-1.71,1.63-1.76,10.74-.58,21.88,5.45,22.38,17.3.16,7.11-2.2,14.04-6.68,19.57-.17.21-.22.49-.15.75.07.26.26.48.51.58.38.16.75.35,1.11.55,3.96,2.24,5.48,7.48,4.25,11.7ZM374.88,48.87c0,.33.2.64.51.78.31.14.66.09.92-.12,4.77-4,7.54-11.07,7.66-16.91.23-5.17-3.65-8.95-8.31-10.33-.26-.08-.55-.02-.76.15-.22.17-.34.43-.34.7.11,8.58.22,17.16.33,25.74ZM382.99,63.42c2.56-4.45-3.47-5.14-7.19-4.84-.45.04-.8.42-.79.87.02,1.85.05,3.7.07,5.56,0,.47.38.84.84.85,2.51.05,5.77-.16,7.06-2.44h0Z"/>
      <path class="cls-2" d="M420.14,14.95c.47-.02.93.15,1.28.48.34.33.53.78.53,1.25-.03,11.53-.05,23.06-.11,34.58-.05,8.44-2.07,22.17-13.46,21.79-11.57-.39-12.41-14.78-12.42-23.29-.04-11,.08-22,.36-33,.02-.94.79-1.69,1.73-1.69h3.86c.47-.02.92.17,1.24.5.33.33.5.79.49,1.25-.21,8.71-.33,17.43-.35,26.14-.01,4.55-.27,9.21.16,13.74.27,2.86,1.25,8.75,5.02,9,3.79.25,5.36-5.11,5.76-7.96.63-4.41.29-9.06.3-13.5.03-9.14.06-18.27.08-27.41,0-.92.73-1.68,1.65-1.72l3.87-.18Z"/>
      <path class="cls-2" d="M435.67,64.97c.16.16.39.25.62.25l12.29-.16c.95-.01,1.73.74,1.75,1.68l.1,3.64c.01.46-.16.92-.48,1.25-.32.33-.77.53-1.23.53l-18.89.17c-.46,0-.91-.18-1.23-.5-.33-.33-.51-.77-.51-1.23V16.75c0-.93.74-1.7,1.67-1.73l3.87-.14c.47-.02.92.16,1.26.48s.53.78.53,1.24v47.74c0,.23.09.45.26.62Z"/>
      <path class="cls-2" d="M478.04,70.91c-.04.92-.79,1.64-1.71,1.65l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.7.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.3-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.87,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.78-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.28,3.33,12.69.25,4.67.44,9.35.59,14.02.28,8.69.38,17.4,0,26.09ZM460.34,7.53l4.46-6.75c.25-.38.65-.65,1.1-.74.45-.09.92,0,1.3.25l2.21,1.46c.8.53,1.02,1.6.49,2.4l-4.5,6.83c-.26.39-.66.66-1.12.75-.46.09-.94-.02-1.32-.29l-2.16-1.53c-.76-.54-.96-1.59-.45-2.37ZM469.48,29.07c.34-.39.48-.9.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.36,3.93-2.51,6.42-.02.49.16.97.51,1.32s.83.53,1.32.49c1.99-.11,3.98-.15,5.98-.13.51.01,1.01-.21,1.34-.6Z"/>
      <path class="cls-2" d="M509.94,70.13c0,.93-.75,1.69-1.68,1.72l-3.82.11c-.47.02-.93-.16-1.27-.5-.34-.33-.52-.79-.51-1.26.15-7.99.12-21.82-5.19-26.73-1.46-1.17-3.19-1.97-5.03-2.33-.26-.05-.53.01-.73.18-.2.17-.32.42-.32.68.12,9.51.24,19.01.36,28.52.01.95-.74,1.73-1.68,1.75l-3.58.1c-.46.01-.91-.16-1.25-.48s-.53-.76-.53-1.22l-.75-54.4c-.01-.94.73-1.72,1.67-1.76,5.17-.19,10.41.08,15.17,2.18,9.62,4.35,10.28,14.78,1.59,20.13-.23.14-.38.37-.41.64-.03.26.07.53.26.71,7.29,7.06,7.77,20.75,7.7,31.95ZM492.11,21.95c-.25-.03-.49.05-.68.22s-.29.41-.28.65l.12,9.3c0,.25.12.5.31.66.2.16.45.23.7.19,3.09-.57,6.96-1.79,8.52-4.57,2.04-4.25-5.08-6.01-8.69-6.44Z"/>
      <path class="cls-2" d="M540.74,16.49c.39,17.97.78,35.94,1.17,53.91.01.47-.17.92-.49,1.25s-.77.52-1.24.52h-3.87c-.94,0-1.71-.75-1.73-1.69l-.75-34.53c0-.23-.1-.45-.27-.61l-9.67-9.25c-.25-.24-.62-.31-.94-.17-.32.14-.53.45-.53.8v43.64c0,.94-.75,1.71-1.69,1.73l-3.87.08c-.47,0-.92-.17-1.25-.49-.33-.33-.52-.77-.52-1.24V16.68c0-.94.76-1.71,1.7-1.73l5.23-.08c.46,0,.9.16,1.22.48l8.83,8.45c.25.24.63.31.95.17s.52-.46.52-.81c-.05-2.19-.09-4.37-.14-6.56-.01-.46.16-.91.49-1.25.32-.33.77-.52,1.23-.52l3.86-.02c.95,0,1.72.75,1.74,1.69Z"/>
      <path class="cls-2" d="M573.03,70.91c-.04.92-.79,1.64-1.71,1.65l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.7.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.31-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.87,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.79-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.27,3.33,12.69.25,4.67.44,9.35.59,14.02.28,8.69.38,17.4,0,26.09ZM557.15,29.79c1.99-.11,3.98-.15,5.97-.13.51.01,1.01-.21,1.34-.6.34-.39.49-.91.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.37,3.93-2.51,6.42-.02.49.16.97.51,1.32s.83.52,1.33.49h0Z"/>
    </g>
    <g>
      <path class="cls-2" d="M281.93,78.99c.33.33.51.77.51,1.24l-.38,53.86c0,.95-.77,1.71-1.71,1.72l-3.87.04c-.46,0-.91-.18-1.24-.51s-.51-.77-.51-1.24c.1-14.27.2-28.53.3-42.8,0-.23-.15-.44-.37-.5-.22-.07-.46.02-.59.22-2.09,3.28-4.95,8.13-6.93,11.15-.32.48-.86.78-1.44.77h-1.89c-.57,0-1.11-.28-1.43-.76-1.99-2.97-5.05-7.72-7.18-10.93-.13-.19-.37-.28-.58-.21-.22.07-.37.27-.37.5l.41,42.23c0,.95-.75,1.73-1.7,1.75l-3.87.06c-.46,0-.91-.17-1.24-.49-.33-.32-.52-.76-.52-1.22l-.52-53.45c0-.95.74-1.72,1.69-1.75l5.91-.14c.59-.02,1.14.27,1.47.75l8.26,12.07c.1.14.26.23.43.23s.33-.08.43-.23c2.71-4.03,5.41-8.06,8.17-12.05.32-.46.84-.74,1.4-.75l6.1-.07c.46,0,.91.17,1.24.5Z"/>
      <path class="cls-2" d="M296.21,80.75v53.37c0,.94-.75,1.71-1.69,1.73l-3.87.09c-.47.01-.92-.17-1.25-.49s-.52-.77-.52-1.24v-53.48c0-.46.18-.9.51-1.23.33-.33.77-.51,1.23-.5l3.87.03c.95,0,1.72.78,1.72,1.73Z"/>
      <path class="cls-2" d="M323.66,77.29c.48.01.93.23,1.24.59.31.36.47.83.42,1.31l-.36,3.81c-.09.9-.86,1.59-1.77,1.57-12.56-.09-15.16,12.94-14.62,23.62.41,8.17,1.9,18.93,11.05,20.93.26.06.52,0,.73-.17.2-.16.32-.41.33-.67.06-9.61.37-19.22.52-28.84,0-.23-.09-.46-.25-.62-.16-.17-.39-.26-.62-.26h-3.66c-.46,0-.91-.19-1.23-.51-.32-.33-.5-.77-.5-1.24l.04-3.87c.01-.95.78-1.71,1.73-1.71h9.81c.46,0,.91.19,1.23.52.33.33.5.78.5,1.24l-.65,41.92c-.02.88-.69,1.61-1.57,1.7-17.91,1.74-24.25-12.07-24.78-28.42-.27-8.34.73-17.44,6.21-24.11,3.77-4.59,10.22-6.89,16.2-6.78Z"/>
      <path class="cls-2" d="M359.81,133.79c0,.93-.75,1.69-1.68,1.72l-3.82.11c-.47.02-.93-.16-1.27-.5-.34-.33-.52-.79-.51-1.26.15-7.99.12-21.82-5.19-26.73-1.46-1.17-3.19-1.97-5.03-2.33-.26-.05-.53.01-.73.18-.2.17-.32.42-.32.68.12,9.51.24,19.01.36,28.52.01.95-.74,1.73-1.68,1.75l-3.58.1c-.46.01-.91-.16-1.25-.48s-.53-.76-.53-1.22l-.75-54.4c-.01-.94.73-1.72,1.67-1.76,5.17-.19,10.41.08,15.17,2.18,9.62,4.35,10.28,14.78,1.59,20.13-.23.14-.38.37-.41.64s.07.53.26.71c7.29,7.06,7.77,20.75,7.7,31.95ZM341.99,85.61c-.25-.03-.5.05-.68.22-.19.17-.29.41-.28.66l.12,9.3c0,.25.12.49.31.66s.45.23.7.19c3.09-.57,6.96-1.79,8.52-4.57,2.04-4.26-5.08-6.01-8.69-6.44Z"/>
      <path class="cls-2" d="M389.4,134.23c.02.47-.16.92-.48,1.26-.33.34-.77.53-1.24.53l-20.83.07c-.95,0-1.73-.77-1.74-1.72l-.3-41.6c0-.46.18-.9.5-1.23.32-.33.76-.51,1.22-.51l19.64-.07c.95,0,1.73.76,1.74,1.71l.04,3.87c0,.46-.17.91-.5,1.23s-.77.51-1.23.52l-13.48.05c-.23,0-.45.09-.61.26-.16.16-.25.38-.25.61,0,.17,0,1.22.01,2.9,0,.46.36.83.81.86l10.58.67c.47.03.9.25,1.2.6s.45.82.41,1.28l-.3,3.35c-.08.94-.89,1.63-1.83,1.57l-9.92-.62c-.24-.02-.47.07-.65.23-.17.16-.27.39-.27.63.04,9.97.1,11.27.12,17.21,0,.23.09.45.26.61.16.16.38.25.61.25l14.62-.05c.94,0,1.71.74,1.74,1.67l.13,3.87ZM372.67,84.81l4.46-6.75c.53-.8,1.6-1.02,2.4-.49l2.21,1.46c.8.53,1.02,1.6.49,2.4l-4.5,6.83c-.26.39-.66.66-1.12.75-.46.09-.94-.02-1.32-.29l-2.16-1.53c-.76-.54-.96-1.59-.44-2.37Z"/>
      <path class="cls-2" d="M418.8,80.15c.39,17.97.78,35.94,1.17,53.91.01.47-.17.92-.49,1.25s-.77.52-1.24.52h-3.87c-.94,0-1.71-.75-1.73-1.69l-.75-34.53c0-.23-.1-.45-.27-.61l-9.67-9.25c-.25-.24-.62-.31-.94-.17-.32.14-.53.45-.53.8v43.64c0,.94-.75,1.71-1.69,1.73l-3.87.08c-.47,0-.92-.17-1.25-.49s-.52-.77-.52-1.24v-53.76c0-.95.76-1.72,1.7-1.73l5.23-.08c.46,0,.9.16,1.22.48l8.83,8.45c.25.24.63.31.95.17.32-.14.52-.46.52-.81-.05-2.19-.09-4.37-.14-6.56-.01-.46.16-.91.49-1.25.32-.33.77-.52,1.23-.52l3.86-.02c.95,0,1.72.75,1.74,1.69Z"/>
      <path class="cls-2" d="M451.09,134.57c-.04.92-.79,1.64-1.71,1.66l-3.86.05c-.48,0-.93-.19-1.26-.53-.33-.34-.5-.81-.48-1.28.47-10.71.15-21.42-.2-32.12-.03-.92-.77-1.66-1.69-1.68-2.31-.04-4.61,0-6.92.13-.91.06-1.61.8-1.62,1.71-.1,10.62-.35,21.24-.4,31.86,0,.46-.19.9-.51,1.22-.33.32-.77.5-1.23.5l-3.87-.02c-.96,0-1.73-.78-1.72-1.74.06-12.63.4-25.25.45-37.88.02-4.26-.07-8.67,1.83-12.6,3.8-7.88,13.96-9.19,19.26-2.08,2.73,3.66,3.1,8.28,3.33,12.69.25,4.67.44,9.35.59,14.03.28,8.69.38,17.4,0,26.09ZM435.21,93.45c1.99-.11,3.98-.15,5.97-.13.51.01,1.01-.21,1.34-.6.34-.39.49-.91.4-1.41-.65-3.93-2.88-9.44-7.05-6.09-1.8,1.53-2.36,3.94-2.51,6.42-.02.49.16.97.51,1.32s.83.52,1.33.49h0Z"/>
    </g>
  </g>
  <path class="cls-1" d="M191.32,85.63c-1.91-1.72-3.9-3.45-6-5.18-1.29-1.06-2.62-2.12-3.98-3.18-2.12-1.65-4.31-3.31-6.6-4.95-1.36-.98-2.74-1.96-4.15-2.92-13.73-9.52-29.9-18.71-47.34-26.87-.13-.06-.26-.13-.39-.18-1.94-.9-3.89-1.79-5.87-2.66,2.18-.83,4.35-1.63,6.48-2.4,24.4-8.73,45.37-12.82,59.94-12.82,11.33,0,18.81,2.48,21,7.18,3.5,7.52-6.03,21.73-25.71,37.56,2.26,1.64,4.43,3.3,6.53,4.95,20.32-16.61,32.22-33.47,26.42-45.89-9.03-19.37-53.95-12.73-98.59,4.41-2.17.83-4.34,1.69-6.51,2.57-3.49,1.42-6.97,2.9-10.42,4.44-1.97.87-3.93,1.76-5.87,2.66-.13.06-.26.13-.39.18-17.44,8.16-33.61,17.36-47.34,26.85-1.42.97-2.8,1.95-4.15,2.93-1.37-1.04-2.69-2.08-3.97-3.12C14.73,53.38,5.21,39.17,8.71,31.65c2.19-4.7,9.66-7.18,21-7.18,14.57,0,35.54,4.09,59.94,12.82,3.47-1.6,6.95-3.14,10.41-4.61C55.42,15.54,10.49,8.9,1.46,28.27c-5.79,12.42,6.11,29.29,26.43,45.89,1.27,1.04,2.57,2.08,3.89,3.1,2.13,1.67,4.35,3.32,6.64,4.96,1.36.98,2.75,1.95,4.17,2.92,14.14,9.76,30.56,19.05,47.28,26.87.13.06.26.13.39.18,1.95.91,3.9,1.8,5.85,2.67-2.17.82-4.34,1.62-6.48,2.4-16.2,5.79-31.6,9.79-45.06,11.65-19.46,2.68-32.87.43-35.87-6.01-3.01-6.45,3.89-18.17,18.45-31.35,2.26-2.04,4.66-4.09,7.2-6.14-2.26-1.64-4.45-3.3-6.56-4.96-2.1,1.73-4.1,3.46-6,5.18C3.73,102-3.31,116.05,1.46,126.28c3.63,7.77,13.33,11.74,28.36,11.74,4.76,0,10.05-.4,15.85-1.2,16.12-2.23,34.89-7.41,54.42-14.94,2.15-.82,4.3-1.68,6.47-2.57,3.46-1.42,6.94-2.9,10.43-4.45,1.95-.87,3.9-1.76,5.85-2.67.13-.06.26-.13.39-.18,16.72-7.82,33.14-17.11,47.28-26.87,1.42-.97,2.8-1.94,4.15-2.92,1.39,1.05,2.74,2.11,4.06,3.18,2.55,2.04,4.95,4.1,7.21,6.14,14.56,13.18,21.46,24.9,18.45,31.35-3,6.45-16.42,8.7-35.88,6.01-13.44-1.86-28.86-5.87-45.06-11.65-3.49,1.61-6.97,3.15-10.44,4.62,19.53,7.53,38.3,12.71,54.42,14.94,5.8.8,11.09,1.2,15.84,1.2,15.04,0,24.74-3.97,28.36-11.74,4.77-10.24-2.26-24.29-20.33-40.65ZM163.7,80.22c-12.38,8.35-27.25,16.82-44.23,24.74-2.23,1.04-4.46,2.05-6.69,3.04-2.08.91-4.15,1.81-6.22,2.68-2.07-.87-4.14-1.76-6.23-2.68-2.23-.98-4.45-2-6.69-3.04-16.97-7.92-31.84-16.39-44.23-24.74-1.45-.98-2.88-1.96-4.26-2.94,1.39-.97,2.81-1.95,4.25-2.92,12.94-8.74,28.02-17.2,44.24-24.77,2.24-1.05,4.47-2.05,6.68-3.04,2.1-.92,4.18-1.83,6.24-2.68,2.05.86,4.13,1.76,6.23,2.68,2.2.98,4.44,1.99,6.68,3.04,16.22,7.57,31.28,16.02,44.23,24.77,1.44.97,2.85,1.94,4.25,2.93-1.38.97-2.8,1.95-4.25,2.93Z"/>
</svg>`,$s=(e,t)=>[...Qs.matchAll(RegExp(`<path class="${e}" d="([^"]+)"`,`g`))].map(e=>`<path class="logo__${t}" d="${e[1]}"/>`).join(``),ec=$s(`cls-1`,`mark`),tc=$s(`cls-2`,`word`),nc=Qs.match(/viewBox="([^"]+)"/)[1];function rc({large:e=!1}={}){return I`
    <div class="logo ${e?`logo--large`:``}" role="img" aria-label="${R(`app.logo`)}">
      <span class="logo__name">${R(`app.name`)}</span>
      ${Lt(`<svg class="logo__svg" viewBox="${nc}" aria-hidden="true" focusable="false">${ec}${tc}</svg>`)}
    </div>`}function ic({symbol:e,size:t=280}={}){return I`
    <svg class="illustration" viewBox="0 0 280 240" style="max-width:${t}px;color:var(--color-coral)" aria-hidden="true" focusable="false">
      <path fill="var(--color-blob)"
        d="M57 63c30-38 95-49 141-29 47 20 72 70 60 116-12 47-60 80-112 79-52-1-101-37-112-82-8-32 2-58 23-84z" />
      <path fill="var(--color-surface-tint)" opacity="0.9"
        d="M92 82c22-22 66-26 92-6 27 20 31 60 11 86-20 27-63 33-93 18-30-16-41-50-29-73 4-9 11-17 19-25z" />
      <g fill="none" stroke="var(--color-coral)" stroke-width="1.5" opacity="0.55">
        <ellipse cx="140" cy="120" rx="128" ry="44" transform="rotate(-12 140 120)" />
        <ellipse cx="140" cy="120" rx="112" ry="70" transform="rotate(18 140 120)" opacity="0.6" />
      </g>
      <circle cx="31" cy="104" r="5" fill="var(--color-coral)" opacity="0.7" />
      <circle cx="246" cy="148" r="4" fill="var(--color-coral)" opacity="0.5" />
      ${Lt(e?String(L(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var ac={render(){return z({variant:`screen--language`,body:I`
        <div class="language">
          ${rc({large:!0})}
          ${ic({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            <span lang="sk">${Yt(`sk`,`language.title`)}</span>
            <span class="language__alt" lang="en">${Yt(`en`,`language.title`)}</span>
          </h1>
          <div class="stack">
            ${Ht.map(e=>I`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${Yt(e,`language.${e}`)}</span>
                  <span class="choice__end">${L(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;Gt(t),Ie({language:t}),a(`/start/welcome`)}}},oc={render(){return z({variant:`screen--welcome`,header:B({back:`/start/language`}),body:I`
        <div class="welcome">
          ${rc()}
          <h1 class="screen-title welcome__title" tabindex="-1">${R(`welcome.title`)}</h1>
          <p class="screen-lead">${R(`welcome.text`)}</p>
          ${ic()}
        </div>`,footer:V({label:R(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},sc=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function cc(e){let t=sc.indexOf(e);return{step:t+1,total:sc.length,prev:sc[t-1]??`/start/welcome`,next:sc[t+1]??`/today`}}var lc=`/start/goals`,uc=[`symptoms`,`triggers`,`patterns`,`doctor`],dc={render(){let{step:e,total:t,prev:n}=cc(lc);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`goals.title`)}</h1>
        <p class="screen-lead">${R(`goals.lead`)}</p>
        <div class="step-options">
          ${cn({name:`goals`,type:`checkbox`,legend:R(`goals.title`),options:uc.map(e=>({value:e,label:R(`goals.options.${e}`)})),selected:F().goals})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Ie({goals:new FormData(e).getAll(`goals`)}),a(cc(lc).next)},actions:{skip(){a(cc(lc).next)}}},fc=`/start/condition`,pc=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`],mc={render(){let{step:e,total:t,prev:n}=cc(fc);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`condition.title`)}</h1>
        <p class="screen-lead">${R(`condition.lead`)}</p>
        <div class="step-options">
          ${cn({name:`condition`,legend:R(`condition.title`),options:pc.map(e=>({value:e,label:R(`condition.options.${e}`)})),selected:F().condition??`vestibular_migraine`})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Ie({condition:new FormData(e).get(`condition`)}),a(cc(fc).next)},actions:{skip(){a(cc(fc).next)}}},hc=`/start/cycle`;function gc(){let{cycleTracking:e}=F();return e===!0?`yes`:e===!1?`no`:null}var _c={render(){let{step:e,total:t,prev:n}=cc(hc),r=gc();return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`cycle.title`)}</h1>
        <p class="screen-lead">${R(`cycle.lead`)}</p>
        <div class="step-options">
          ${cn({name:`cycle`,legend:R(`cycle.title`),options:[{value:`yes`,label:R(`cycle.yes`)},{value:`no`,label:R(`cycle.no`)}],selected:r})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(Ie({cycleTracking:t===`yes`}),a(cc(hc).next))},actions:{skip(){a(cc(hc).next)}}},vc=`/start/medications`;function yc(e){return[R(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var bc={render(){let{step:e,total:t,prev:n}=cc(vc),r=ze(),i=r.length>0;return z({header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`medications.title`)}</h1>
        <p class="screen-lead">${R(`medications.lead`)}</p>
        ${i?I`
              <h2 class="visually-hidden">${R(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>I`
                    <li class="med">
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${yc(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${R(`medications.remove`,{name:e.name})}">
                        ${L(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:ic({symbol:`pill`,size:240})}
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`medications.disclaimer`)}</span></p>`,footer:i?I`
            ${V({label:R(`common.continue`),action:`next`,block:!0})}
            ${V({label:R(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:I`
            ${V({label:R(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${V({label:R(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await Ts(e.closest(`.med`)),We(e.dataset.id),t.rerender()},next(){a(cc(vc).next)}}},xc=`/start/reminders`,Sc={render(){let{step:e,total:t,prev:n}=cc(xc),{reminder:r}=F();return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`reminders.title`)}</h1>
        <p class="screen-lead">${R(`reminders.lead`)}</p>
        ${ic({symbol:`bell`,size:180})}
        <div class="step-options">
          ${cn({name:`reminder`,legend:R(`reminders.title`),options:[{value:`yes`,label:R(`reminders.yes`)},{value:`no`,label:R(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${H({label:R(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${R(`reminders.permission`)}</p>
        </div>`,footer:V({label:R(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&ws(document.querySelector(`.reminder-extra`))},onSubmit(e){let t=new FormData(e);Ie({reminder:{enabled:t.get(`reminder`)===`yes`,time:String(t.get(`time`)||F().reminder.time)}}),Zs()}};function Q(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),Ds(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),Es(a)}function Cc({title:e,text:t,closeLabel:n=R(`common.close`)}){let r=document.getElementById(`dialog`);return r.setAttribute(`aria-labelledby`,`dialog-title`),r.innerHTML=String(I`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?I`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="close" autofocus>${n}</button>
    </form>`),new Promise(e=>{let t=!1,n=()=>{t||(t=!0,e())};r.querySelector(`form`).addEventListener(`submit`,n),r.addEventListener(`close`,n,{once:!0}),r.showModal(),Os(r)})}function wc({title:e,text:t,confirmLabel:n,cancelLabel:r=R(`common.cancel`)}){let i=document.getElementById(`dialog`);return i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(I`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?I`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="confirm">${n}</button>
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`),new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(e.submitter?.value===`confirm`)),i.addEventListener(`close`,()=>n(i.returnValue===`confirm`),{once:!0}),i.showModal(),Os(i)})}var Tc={name:``,type:`preventive`,dose:``,frequency:``,note:``};function Ec({returnTo:e}){let t=t=>typeof e==`function`?e(t):e;return{render(e){let n=e.params.id?Be(e.params.id):null,r={...Tc,...n??{}};return z({form:!0,header:B({back:t(e)}),body:I`
          <h1 class="screen-title" tabindex="-1">${R(n?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${H({label:R(`medForm.name`),name:`name`,value:r.name,placeholder:R(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${R(`medForm.type`)}</span>
              ${ln({name:`type`,legend:R(`medForm.type`),selected:r.type,options:[{value:`preventive`,label:R(`medications.types.preventive`)},{value:`acute`,label:R(`medications.types.acute`)}]})}
            </div>
            ${H({label:R(`medForm.dose`),name:`dose`,value:r.dose,placeholder:R(`medForm.dosePlaceholder`),optional:!0})}
            ${H({label:R(`medForm.frequency`),name:`frequency`,value:r.frequency,placeholder:R(`medForm.frequencyPlaceholder`),optional:!0})}
            ${H({label:R(`medForm.note`),name:`note`,value:r.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${R(`medications.disclaimer`)}</p>
          </div>`,footer:V({label:R(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,n){let r=new FormData(e),i=String(r.get(`name`)??``).trim();if(!i){un(e,`name`,R(`medForm.nameRequired`));return}let a={name:i,type:r.get(`type`),dose:String(r.get(`dose`)??``),frequency:String(r.get(`frequency`)??``),note:String(r.get(`note`)??``)};n.params.id&&Be(n.params.id)?(Ue(n.params.id,a),Q(R(`profile.saved`))):Q(R(`medForm.saved`,{name:He(a).name})),s(t(n))}}}var Dc=e=>e.charAt(0).toLocaleUpperCase(Kt())+e.slice(1);function Oc(e=new Date){return Dc(new Intl.DateTimeFormat(Kt(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function kc(e){return new Intl.DateTimeFormat(Kt(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function Ac(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?kc(t):new Intl.DateTimeFormat(Kt(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function jc(e){return new Intl.DateTimeFormat(Kt(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function Mc(e){return new Intl.DateTimeFormat(Kt(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function Nc(e){return Dc(new Intl.DateTimeFormat(Kt(),{month:`long`,year:`numeric`}).format(e))}function Pc(e){return new Intl.NumberFormat(Kt(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function Fc(e){return Ic(0,Math.round(e)*6e4)}function Ic(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return R(`duration.underMinute`);if(n<60)return R(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?R(`duration.hoursMinutes`,{h:r,m:i}):R(`duration.hours`,{h:r})}var Lc=[{key:`dizziness`,icon:`orbit`,info:!0},{key:`vertigo`,icon:`rotate3d`,info:!0},{key:`rocking`,icon:`sailboat`,info:!0},{key:`floating`,icon:`cloud`,info:!0},{key:`unsteadiness`,icon:`footprints`,info:!0},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`,info:!0},{key:`tinnitus`,icon:`audioWave`,info:!0},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`,info:!0},{key:`fatigue`,icon:`battery`}],Rc=[`moment`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`],zc=[`vestibular`,`migraine_headache`,`migraine_no_headache`,`other`,`unsure`],Bc=[`poor_sleep`,`long_sleep`,`stress`,`skipped_meal`,`dehydration`,`caffeine`,`alcohol`,`exertion`,`illness`,`visual_stimulation`,`bright_light`,`strong_smells`,`screen_time`,`neck_pain`,`weather_change`,`menstrual_cycle`,`allergy`,`travel`,`other`],Vc={poor_sleep:`bed`,long_sleep:`moon`,stress:`brain`,skipped_meal:`utensils`,dehydration:`glassWater`,caffeine:`coffee`,alcohol:`wine`,exertion:`dumbbell`,illness:`thermometer`,visual_stimulation:`eye`,bright_light:`sun`,strong_smells:`wind`,screen_time:`monitor`,neck_pain:`bone`,weather_change:`cloud`,menstrual_cycle:`droplet`,allergy:`flower`,travel:`car`,other:`ellipsis`},Hc=[`rest`,`sleep`,`dark_room`,`hydration`,`relaxation`,`cold_compress`,`warm_compress`,`shower`,`food`,`other`],Uc=[`work_study`,`sleep`,`daily_activities`,`social`,`movement`,`rest`,`other`,`none`],Wc=[`helped`,`partly`,`not_helped`,`unknown`];function Gc(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var Kc=`custom:`,qc=e=>e.startsWith(Kc);function Jc(e){return qc(e)?st(e)?.label??R(`symptoms.unknown`):R(`symptoms.${e}`)}var Yc=e=>Lc.find(t=>t.key===e)?.icon??`sparkles`;function Xc(e){return e==null?R(`intensity.notSet`):R(`intensity.value`,{value:e,level:R(`intensity.${Gc(e)}`)})}function Zc(e){return e.symptoms.map(e=>e.intensity==null?Jc(e.key):`${Jc(e.key)} ${e.intensity}`).join(`, `)}var Qc=e=>R(`durations.${e}`),$c=e=>R(`effects.${e}`),el=e=>R(`triggers.${e}`),tl=e=>R(`episodeTypes.${e}`),nl=e=>R(`relief.${e}`),rl=e=>R(`impact.${e}`),il=e=>R(`sleep.qualities.${e}`);function al({href:e,iconName:t,title:n,meta:r,badge:i}){return I`
    <li>
      <a class="entry" href="${e}">
        ${L(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}function ol(e){return al({href:`#/episode/${e.id}`,iconName:`timer`,title:R(`episode.title`),badge:e.endedAt?``:pn(R(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${Ac(e.startedAt)} – ${kc(e.endedAt)} · ${Ic(e.startedAt,e.endedAt)}`:R(`episode.since`,{time:Ac(e.startedAt)})})}function sl(e){let t=at(e);return al({href:`#/symptom/${e.id}`,iconName:`activity`,title:Zc(e),meta:[kc(e.occurredAt),t==null?``:R(`intensity.highest`,{value:Xc(t)})].filter(Boolean).join(` · `)})}function cl(e){let t=Be(e.medicationId);return al({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??R(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[kc(e.takenAt),e.effect?$c(e.effect):``].filter(Boolean).join(` · `)})}function ll(e){return al({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:R(`sleep.entry`,{duration:Fc(e.minutes)}),meta:e.quality?il(e.quality):R(`sleep.title`)})}function ul({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return I`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>ol(e)})),...t.map(e=>({at:e.occurredAt,render:()=>sl(e)})),...n.map(e=>({at:e.takenAt,render:()=>cl(e)})),...r?[{at:r.wakeTime??be(r.date,`06:00`),render:()=>ll(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}var dl=null;function fl({logId:e=null,date:t=null}={}){let n=e?et(e):null,r=n?new Date(n.occurredAt):new Date;return dl={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e,pending:!1})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?M(r):t??M(r),time:ye(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},dl}var pl=()=>dl;function ml(){dl=null}function hl(){return[`/log/symptoms`,`/log/intensity`,`/log/details`]}function gl(e){let t=hl(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}var _l=e=>e.intensity??(e.pending?5:null);function vl(e,t){e.intensity=t,e.pending=!1}function yl(e){e.pending&&vl(e,5)}function bl({index:e,label:t,value:n,iconName:r}){let i=`int-${e}`;return I`
    <div class="intensity ${n==null?`is-unset`:``}" data-index="${e}">
      <div class="intensity__head">
        ${r?I`<span class="intensity__icon">${L(r,{size:22})}</span>`:``}
        <label class="intensity__label" for="${i}">${t}</label>
      </div>
      <output class="intensity__value" for="${i}">${Xc(n)}</output>
      <input class="range" type="range" id="${i}" data-index="${e}" min="0" max="10" step="1"
        value="${n??5}" aria-valuetext="${Xc(n)}" />
      <div class="intensity__scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
      <!-- Vynechať a späť zadať: jedno z dvoch tlačidiel je vždy viditeľné -->
      <div class="intensity__actions">
        <button type="button" class="pill-btn" data-action="clear" data-index="${e}" aria-label="${R(`log.clearLabel`,{name:t})}"${n==null?I` hidden`:``}>
          ${L(`x`,{size:16,strokeWidth:2.25})}${R(`log.clear`)}
        </button>
        <button type="button" class="pill-btn pill-btn--accent" data-action="restore" data-index="${e}"${n==null?``:I` hidden`}>
          ${L(`plus`,{size:16,strokeWidth:2.25})}${R(`log.restore`)}
        </button>
      </div>
    </div>`}function xl(e,t){let n=document.querySelector(`.intensity[data-index="${e}"]`),r=t==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=Xc(t),n.querySelector(`[data-action="clear"]`).hidden=r,n.querySelector(`[data-action="restore"]`).hidden=!r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,Xc(t)),r&&(i.value=5)}var Sl=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function Cl(){return[...Lc.map(e=>({key:e.key,icon:e.icon,label:Jc(e.key),info:!!e.info})),...ot().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function wl({name:e,legend:t,items:n,selected:r,search:i=!1}){return I`
    <fieldset class="sym-grid">
      <legend class="visually-hidden">${t}</legend>
      ${n.map(t=>I`
          <div class="sym-cell ${t.info?`sym-cell--info`:``}"${i?I` data-search="${Sl(t.label)}"`:``}>
            <label class="sym-tile">
              <input type="checkbox" name="${e}" value="${t.key}" id="${e}-${t.key}"${r.includes(t.key)?I` checked`:``} />
              <span class="sym-tile__icon">${L(t.icon,{size:22})}</span>
              <span class="sym-tile__label">${t.label}</span>
              <span class="sym-tile__check">${L(`check`,{size:14,strokeWidth:3})}</span>
            </label>
            ${t.info?I`<button type="button" class="sym-tile__info" data-action="symptomInfo" data-key="${t.key}"
                  aria-label="${R(`symptomInfo.open`,{name:t.label})}">${L(`info`,{size:20})}</button>`:``}
          </div>`)}
    </fieldset>`}var Tl={symptomInfo(e){let{key:t}=e.dataset;Cc({title:Jc(t),text:R(`symptomInfo.${t}`),closeLabel:R(`symptomInfo.close`)}).then(()=>e.focus())}};function El(e){let{startedAt:t,endedAt:n}=e,r=n?Se(t,n)?kc(n):Ac(n):R(`episode.statusOngoing`);return`${Ac(t)} – ${r} · ${Ic(t,n??new Date)}`}function Dl(e=[],t,n){let r=e.filter(e=>e!==`other`).map(t);return e.includes(`other`)&&r.push(n?.trim()||t(`other`)),r.length?r.join(`, `):null}function Ol(e){let t=ht(e.id);return t.length?t.map(e=>[Be(e.medicationId)?.name,e.dose,kc(e.takenAt)].filter(Boolean).join(` · `)).join(`, `):null}function kl(e,{withTime:t=!0}={}){return[{key:`type`,step:`type`,value:e.type?tl(e.type):null},{key:`intensity`,step:`type`,value:e.intensity==null?null:Xc(e.intensity)},t&&{key:`time`,value:El(e)},{key:`symptoms`,step:`symptoms`,value:e.symptoms?.length?Zc(e):null},{key:`triggers`,step:`triggers`,value:Dl(e.triggers,el,e.triggerOther)},{key:`meds`,step:`meds`,value:Ol(e)},{key:`helped`,step:`meds`,value:e.helped?$c(e.helped):null},{key:`relief`,step:`relief`,value:Dl(e.relief,nl,e.reliefOther)},{key:`impact`,step:`impact`,value:Dl(e.impact,rl,e.impactOther)}].filter(Boolean)}var Al=e=>kl(e,{withTime:!1}).some(e=>e.value);function jl(e,{editable:t=!1}={}){return t?I`
      <ul class="summary-list">
        ${e.map(e=>{let t=R(`episodeFlow.sections.${e.key}`);return e.step?I`
            <li>
              <button type="button" class="summary-row summary-row--edit" data-action="edit" data-step="${e.step}">
                <span class="summary-row__text">
                  <span class="summary-row__label">${t}</span>
                  <span class="summary-row__value">${e.value}</span>
                </span>
                <span class="summary-row__edit" aria-hidden="true">${L(`pencil`,{size:18})}</span>
                <span class="visually-hidden">${R(`episodeFlow.edit`)}</span>
              </button>
            </li>`:I`
              <li class="summary-row">
                <span class="summary-row__label">${t}</span>
                <span class="summary-row__value">${e.value}</span>
              </li>`})}
      </ul>`:I`
    <dl class="summary-list">
      ${e.map(e=>I`
          <div class="summary-row">
            <dt class="summary-row__label">${R(`episodeFlow.sections.${e.key}`)}</dt>
            <dd class="summary-row__value">${e.value}</dd>
          </div>`)}
    </dl>`}var $=null;function Ml(e){let t=new Date(e.startedAt),n=e.endedAt&&new Date(e.endedAt)?t:new Date;return{episodeId:e.id,type:e.type??null,overall:{intensity:e.intensity??null,pending:e.intensity==null&&!Al(e)},symptoms:(e.symptoms??[]).map(e=>({...e,pending:!1})),triggers:[...e.triggers??[]],triggerOther:e.triggerOther??``,medIds:[],medDate:M(n),medTime:ye(n),helped:e.helped??null,relief:[...e.relief??[]],reliefOther:e.reliefOther??``,impact:[...e.impact??[]],impactOther:e.impactOther??``}}function Nl(e){return $=Ml(e),`/episode/${e.id}/details/${Al(e)?`summary`:`type`}`}function Pl(){return[`type`,`symptoms`,...$.symptoms.length?[`intensity`]:[],`triggers`,`meds`,`relief`,`impact`,`summary`]}var Fl=(e,t,n)=>n?[...new Set([...e,t])]:e.filter(e=>e!==t);function Il(e,t){return un(document.querySelector(`.screen`),e,t),!1}function Ll(e){let t=new Date(e);return t.setSeconds(0,0),t}function Rl(){let e=$.episodeId;mt(e,{type:$.type,intensity:$.overall.intensity,symptoms:$.symptoms.map(({key:e,intensity:t})=>({key:e,intensity:t})),triggers:[...$.triggers],triggerOther:$.triggers.includes(`other`)?$.triggerOther.trim():``,helped:$.helped,relief:[...$.relief],reliefOther:$.relief.includes(`other`)?$.reliefOther.trim():``,impact:[...$.impact],impactOther:$.impact.includes(`other`)?$.impactOther.trim():``})}function zl(){let e=lt($.episodeId),t=new Date(e.startedAt).getTime(),n=e.endedAt?new Date(e.endedAt).getTime():Date.now(),r=new Date(Math.min(Math.max(new Date(be($.medDate,$.medTime)).getTime(),t),n)).toISOString();for(let e of ze().filter(e=>$.medIds.includes(e.id)))Xe({medicationId:e.id,takenAt:r,dose:e.dose,effect:$.helped});$.medIds=[];let i=ht($.episodeId);if($.helped)for(let e of i.filter(e=>!e.effect))Ze(e.id,{effect:$.helped});mt($.episodeId,{medicationIntakeIds:i.map(e=>e.id)})}var Bl=(e,t,n)=>I`
  <div class="field-row">
    ${H({label:R(`episodeFlow.date`),name:`${e}Date`,type:`date`,value:t})}
    ${H({label:R(`episodeFlow.time`),name:`${e}Time`,type:`time`,value:n})}
  </div>`,Vl=(e,t,n)=>I`
  <div class="form-section" id="${e}-wrap"${t.includes(`other`)?``:I` hidden`}>
    ${H({label:R(`episodeFlow.${e}`),name:e,value:n,placeholder:R(`episodeFlow.${e}Placeholder`),maxlength:80})}
  </div>`,Hl={type:{title:()=>R(`episodeFlow.typeTitle`),lead:()=>R(`episodeFlow.typeLead`),body:()=>I`
      <div class="step-options">
        ${cn({name:`episodeType`,legend:R(`episodeFlow.sections.type`),options:zc.map(e=>({value:e,label:tl(e)})),selected:$.type})}
      </div>
      <div class="intensity-list form-section">
        ${bl({index:`overall`,label:R(`episodeFlow.intensity`),value:_l($.overall)})}
      </div>`,onChange(e){e.name===`episodeType`&&($.type=e.value)},confirm:()=>yl($.overall)},symptoms:{title:()=>R(`episodeFlow.symptomsTitle`),lead:()=>R(`episodeFlow.symptomsLead`),body:()=>I`
      ${wl({name:`symptom`,legend:R(`episodeFlow.symptomsTitle`),items:Cl(),selected:$.symptoms.map(e=>e.key)})}
      <form class="custom-add" data-form="custom">
        <label class="field__label" for="custom-symptom">${R(`log.custom`)}</label>
        <div class="custom-add__row">
          <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
            placeholder="${R(`log.customPlaceholder`)}" />
          <button type="submit" class="btn btn--secondary btn--compact">${L(`plus`,{size:20})}<span>${R(`log.customAdd`)}</span></button>
        </div>
      </form>`,onChange(e){e.name===`symptom`&&(e.checked?$.symptoms.push({key:e.value,intensity:null,pending:!0}):$.symptoms=$.symptoms.filter(t=>t.key!==e.value))}},intensity:{title:()=>R(`log.intensityTitle`),lead:()=>R(`log.intensityLead`),body:()=>I`
      <div class="intensity-list">
        ${$.symptoms.map((e,t)=>bl({index:t,label:Jc(e.key),value:_l(e),iconName:Yc(e.key)}))}
      </div>`,confirm:()=>$.symptoms.forEach(yl)},triggers:{title:()=>R(`episodeFlow.triggersTitle`),lead:()=>R(`episodeFlow.triggersLead`),body:()=>I`
      ${wl({name:`trigger`,legend:R(`episodeFlow.triggersTitle`),items:Bc.map(e=>({key:e,icon:Vc[e],label:el(e)})),selected:$.triggers})}
      <div class="form-section" id="trigger-other"${$.triggers.includes(`other`)?``:I` hidden`}>
        ${H({label:R(`episodeFlow.triggerOther`),name:`triggerOther`,value:$.triggerOther,placeholder:R(`episodeFlow.triggerOtherPlaceholder`),maxlength:80})}
      </div>`,onChange(e){e.name===`trigger`&&($.triggers=Fl($.triggers,e.value,e.checked),e.value===`other`&&(document.getElementById(`trigger-other`).hidden=!e.checked))},onInput(e){e.name===`triggerOther`&&($.triggerOther=e.value)}},meds:{title:()=>R(`episodeFlow.medsTitle`),lead:()=>R(`episodeFlow.medsLead`),body:()=>{let e=ze(),t=ht($.episodeId);return I`
        ${t.length?I`<section class="form-section" aria-labelledby="meds-logged">
              <h2 class="section-title" id="meds-logged">${R(`episodeFlow.medsLogged`)}</h2>
              ${ul({intakes:t})}
            </section>`:``}
        ${e.length?I`
              <div class="step-options">
                ${cn({name:`med`,type:`checkbox`,legend:R(`episodeFlow.medsTitle`),options:e.map(e=>({value:e.id,label:[e.name,e.dose].filter(Boolean).join(` · `)})),selected:$.medIds})}
              </div>
              <fieldset class="form-section" id="med-when"${$.medIds.length?``:I` hidden`}>
                <legend class="section-title">${R(`episodeFlow.medsWhen`)}</legend>
                ${Bl(`med`,$.medDate,$.medTime)}
              </fieldset>`:I`<p class="empty form-section">${R(`episodeFlow.medsNone`)}</p>`}
        <div class="form-section">
          ${V({label:R(`episodeFlow.addMed`),iconName:`plus`,variant:`secondary`,action:`addMed`,block:!0})}
        </div>
        ${e.length||t.length?I`<fieldset class="form-section">
              <legend class="section-title">${R(`episodeFlow.helped`)}</legend>
              ${cn({name:`helped`,legend:R(`episodeFlow.helped`),options:Wc.map(e=>({value:e,label:$c(e)})),selected:$.helped})}
            </fieldset>`:``}`},onChange(e){e.name===`med`&&($.medIds=Fl($.medIds,e.value,e.checked),document.getElementById(`med-when`).hidden=!$.medIds.length),e.name===`helped`&&($.helped=e.value),[`medDate`,`medTime`].includes(e.name)&&e.value&&($[e.name]=e.value)},validate(){if(!$.medIds.length)return!0;let e=lt($.episodeId),t=new Date(be($.medDate,$.medTime));return t>=Ll(e.startedAt)&&t<=Ll(e.endedAt??new Date)||Il(`medTime`,R(`episodeFlow.medsOutside`))},afterCommit:zl},relief:{title:()=>R(`episodeFlow.reliefTitle`),lead:()=>R(`episodeFlow.reliefLead`),body:()=>I`
      <div class="step-options">
        ${cn({name:`relief`,type:`checkbox`,legend:R(`episodeFlow.reliefTitle`),options:Hc.map(e=>({value:e,label:nl(e)})),selected:$.relief})}
      </div>
      ${Vl(`reliefOther`,$.relief,$.reliefOther)}`,onChange(e){e.name===`relief`&&($.relief=Fl($.relief,e.value,e.checked),e.value===`other`&&(document.getElementById(`reliefOther-wrap`).hidden=!e.checked))},onInput(e){e.name===`reliefOther`&&($.reliefOther=e.value)}},impact:{title:()=>R(`episodeFlow.impactTitle`),lead:()=>R(`episodeFlow.impactLead`),body:()=>I`
      <div class="step-options">
        ${cn({name:`impact`,type:`checkbox`,legend:R(`episodeFlow.impactTitle`),options:Uc.map(e=>({value:e,label:rl(e)})),selected:$.impact})}
      </div>
      ${Vl(`impactOther`,$.impact,$.impactOther)}`,onChange(e){if(e.name!==`impact`)return;$.impact=Fl($.impact,e.value,e.checked);let t=$.impact.filter(e=>e!==`none`);if(e.checked&&(e.value===`none`?t.length:$.impact.includes(`none`))){$.impact=e.value===`none`?[`none`]:t;for(let e of document.querySelectorAll(`input[name="impact"]`))e.checked=$.impact.includes(e.value)}document.getElementById(`impactOther-wrap`).hidden=!$.impact.includes(`other`)},onInput(e){e.name===`impactOther`&&($.impactOther=e.value)}},summary:{title:()=>R(`episodeFlow.summaryTitle`),lead:()=>R(`episodeFlow.summaryLead`),body:e=>{let t=kl(e),n=t.filter(e=>!e.value);return I`
        <div class="summary-status">
          ${e.endedAt?pn(R(`episode.statusEnded`),{neutral:!0}):pn(R(`episode.statusOngoing`),{live:!0})}
        </div>
        ${jl(t.filter(e=>e.value),{editable:!0})}
        ${n.length?I`<section class="summary-missing" aria-labelledby="missing-title">
              <h2 class="section-title" id="missing-title">${R(`episodeFlow.summaryMissing`)}</h2>
              <div class="summary-missing__list">
                ${n.map(e=>I`<button type="button" class="chip-btn" data-action="edit" data-step="${e.step}">
                    ${L(`plus`,{size:16})}${R(`episodeFlow.sections.${e.key}`)}
                  </button>`)}
              </div>
            </section>`:``}`}}};function Ul(){return z({header:B({back:`/today`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`episode.title`)}</h1>
      <p class="screen-lead">${R(`episode.notFound`)}</p>`})}var Wl=e=>Hl[e.params.step]&&Pl().includes(e.params.step)?e.params.step:`type`;function Gl(e){let t=Hl[Wl(e)];return t.validate&&!t.validate()?!1:(Rl(),t.afterCommit?.(),!0)}var Kl=(e,t)=>`/episode/${e.params.id}/details/${t}`,ql=e=>e===`overall`?$.overall:$.symptoms[Number(e)],Jl={render(e){let t=lt(e.params.id);if(!t)return Ul();(!$||$.episodeId!==t.id)&&($=Ml(t));let n=Wl(e),r=Hl[n],i=Pl();return z({header:B({backAction:`prevStep`,step:i.indexOf(n)+1,total:i.length}),body:I`
        <h1 class="screen-title" tabindex="-1">${r.title(t)}</h1>
        ${r.lead?I`<p class="screen-lead">${r.lead(t)}</p>`:``}
        ${r.body(t)}`,footer:n===`summary`?V({label:R(`episodeFlow.save`),iconName:`check`,action:`save`,block:!0}):I`
              ${V({label:R(`common.continue`),action:`next`,block:!0})}
              ${V({label:R(`episode.saveLater`),variant:`ghost`,action:`later`,block:!0})}`})},onChange(e,t){if(e.type===`range`)return this.onInput(e,t);Hl[Wl(t)].onChange?.(e)},onInput(e,t){if(e.type===`range`){let t=Number(e.value);vl(ql(e.dataset.index),t),xl(e.dataset.index,t)}else Hl[Wl(t)].onInput?.(e)},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=ct(e.elements.custom.value);n&&($.symptoms.some(e=>e.key===n.key)||$.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender())},actions:{...Tl,clear(e){let{index:t}=e.dataset;vl(ql(t),null),xl(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let{index:t}=e.dataset;vl(ql(t),5),xl(t,5),document.getElementById(`int-${t}`).focus()},next(e,t){if(Hl[Wl(t)].confirm?.(),!Gl(t))return;let n=Pl(),r=n[n.indexOf(Wl(t))+1],i=t.query.from===`summary`,o=i&&r!==`intensity`?`summary`:r;a(`${Kl(t,o)}${i&&o!==`summary`?`?from=summary`:``}`,{replace:!0})},prevStep(e,t){if(!Gl(t))return;let n=Pl(),r=n.indexOf(Wl(t));t.query.from===`summary`?a(Kl(t,`summary`),{replace:!0}):a(r>0?Kl(t,n[r-1]):`/episode/${t.params.id}`,{replace:!0})},later(e,t){Gl(t)&&($=null,a(`/today`,{replace:!0}),Q(R(`episode.savedLater`)))},save(){Rl(),$=null,a(`/today`,{replace:!0}),Q(R(`episodeFlow.saved`))},edit(e,t){a(`${Kl(t,e.dataset.step)}?from=summary`,{replace:!0})},addMed(e,t){Gl(t)&&a(`/treatment/new`)}}};function Yl(e){return I`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${pn(R(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${R(`episode.since`,{time:Ac(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${R(`episode.title`)}</h2>
        <p class="muted">${R(`episode.lasting`,{duration:Ic(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${V({label:R(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${V({label:R(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function Xl(e,t,n,{href:r,add:i,empty:a=!1}={}){let o=I`
    <span class="tile__label">${L(e,{size:18})}${t}</span>
    <span class="tile__value${a?` tile__value--empty`:``}">${n}</span>`;return r?I`<a class="tile tile--link" href="${r}">${o}</a>`:i?I`
    <div class="tile tile--with-add">
      ${o}
      <a class="tile__add" href="${i.href}" aria-label="${i.label}" title="${i.label}">${L(`plus`,{size:22,strokeWidth:2.25})}</a>
    </div>`:I`<div class="tile">${o}</div>`}function Zl(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return I`
    <ul class="sym-chips" aria-label="${R(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>I`<li class="sym-chip">${Jc(e)}${t==null?``:I` <strong>${t}</strong>`}</li>`)}
    </ul>`}function Ql(){let e=I`<span class="visually-hidden">${R(`community.external`)}</span>`,t=(t,n)=>{let r=I`
      ${L(n)}
      <span class="list__text">
        <span class="list__label">${R(`community.${t}`)}</span>
        <span class="list__hint">${R(`community.${t}Hint`)}</span>
      </span>`;return Rs[t]?I`
      <a class="list__row" href="${Rs[t]}" target="_blank" rel="noopener noreferrer">
        ${r}
        <span class="community__ext">${L(`externalLink`,{size:18})}</span>
        ${e}
      </a>`:I`<div class="list__row">${r}${pn(R(`community.soon`),{neutral:!0})}</div>`};return I`
    <section class="section" aria-labelledby="community-title">
      <h2 class="section-title" id="community-title">${R(`community.title`)}</h2>
      <p class="community__lead">${R(`community.lead`)}</p>
      <div class="list">${t(`facebook`,`users`)}${t(`instagram`,`camera`)}${t(`discord`,`messages`)}</div>
      <div class="community-web">
        <h3 class="community-web__title">${R(`community.webTitle`)}</h3>
        <p class="muted">${R(`community.webText`)}</p>
        <a class="community-web__link" href="${Rs.web}" target="_blank" rel="noopener noreferrer">
          ${R(`community.webUrl`)}${L(`externalLink`,{size:18})}${e}
        </a>
      </div>
      <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`community.note`)}</span></p>
    </section>`}var $l={render(){let{name:e}=F(),t=Dt(),n=ut(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[Fc(t.sleep.minutes),t.sleep.quality?il(t.sleep.quality):``].filter(Boolean).join(` · `):``,a=`#/sleep?date=${M()}`,o=R(`today.nothingYet`);return en(`today`,I`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?R(`today.greetingName`,{name:e}):R(`today.greeting`)}
        </h1>
        ${on()}
        <p class="today-date">${Oc()}</p>
      </header>

      ${n?Yl(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${R(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?Zl(t.symptomLogs):I`${ic({size:150})}<p class="muted">${R(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${V({label:R(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${R(`today.overview`)}</h2>
        <div class="tiles">
          ${t.sleep?Xl(`bed`,R(`today.sleep`),i,{href:a}):Xl(`bed`,R(`today.sleep`),o,{empty:!0,add:{href:a,label:R(`sleep.add`)}})}
          ${Xl(`pill`,R(`today.meds`),t.intakes.length?Xt(`plural.entries`,t.intakes.length):o,{empty:!t.intakes.length,add:{href:`#/medication-intake`,label:R(`today.logIntake`)}})}
        </div>
        ${r?ul(t):I`<p class="empty">${R(`today.entriesEmpty`)}</p>`}
      </section>

      ${Ql()}`)},mount(e,t){if(!ut())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){fl(),a(`/log/symptoms`)},details(){a(Nl(ut()))},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await Ts(e.closest(`.episode-live`)),pt(n),t.rerender(),Q(R(`episode.endedToast`),{actionLabel:R(`common.undo`),onAction:()=>{gt(n),t.rerender()}})}}};function eu(){return z({header:B({back:`/today`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`episode.title`)}</h1>
      <p class="screen-lead">${R(`episode.notFound`)}</p>`})}function tu(e){return z({variant:`screen--center`,header:B({back:`/today`}),body:I`
      <div class="episode-started">
        ${mn(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${R(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${R(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${kc(e.startedAt)}</time>
        </p>
        <p class="muted">${R(`episode.detailsLater`)}</p>
      </div>`,footer:I`
      ${V({label:R(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${V({label:R(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${R(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${R(`episode.cancel`)}</button>
      </p>`})}function nu(e){let t=tt(e.id),n=Ke().filter(t=>t.episodeId===e.id);return I`
    ${t.length?I`<section class="section"><h2 class="section-title">${R(`episode.linkedSymptoms`)}</h2>${ul({symptomLogs:t})}</section>`:``}
    ${n.length?I`<section class="section"><h2 class="section-title">${R(`episode.linkedIntakes`)}</h2>${ul({intakes:n})}</section>`:``}`}function ru(e){let t=!e.endedAt,n=Al(e),r=kl(e,{withTime:!1}).filter(e=>e.value);return z({header:B({back:`/today`}),body:I`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${R(`episode.title`)}</h1>
        ${t?pn(R(`episode.statusOngoing`),{live:!0}):pn(R(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${Oc(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${R(`episode.startedAt`)}</dt>
          <dd>${kc(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${R(`episode.endedAt`)}</dt>
          <dd>${t?`—`:kc(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${R(`episode.duration`)}</dt>
          <dd>${Ic(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${n?I`<section class="section" aria-labelledby="details-title">
            <h2 class="section-title" id="details-title">${R(`episode.details`)}</h2>
            ${jl(r)}
          </section>`:``}
      ${nu(e)}`,footer:I`
      ${t?V({label:R(`episode.end`),action:`end`,block:!0}):``}
      ${V({label:R(n?`episode.editDetails`:`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${t||n?``:V({label:R(`episode.saveLater`),variant:`secondary`,action:`saveLater`,block:!0})}
      ${V({label:R(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var iu={render(e){let t=lt(e.params.id);return t?e.query.new===`1`&&!t.endedAt?tu(t):ru(t):eu()},actions:{addDetails(e,t){a(Nl(lt(t.params.id)),{replace:t.query.new===`1`})},saveLater(){a(`/today`,{replace:!0}),Q(R(`episode.savedLater`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=_t(t.params.id);a(`/today`,{replace:!0}),Q(R(`episode.cancelledToast`),{actionLabel:R(`common.undo`),onAction:()=>{vt(n),t.rerender()}})},end(e,t){let{id:n}=t.params;pt(n),t.rerender(),Q(R(`episode.endedToast`),{actionLabel:R(`common.undo`),onAction:()=>{gt(n),t.rerender()}})},async delete(e,t){if(!await wc({title:R(`episode.deleteTitle`),text:R(`episode.deleteText`),confirmLabel:R(`episode.delete`)}))return;let n=_t(t.params.id);s(`/today`),Q(R(`episode.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{vt(n),t.rerender()}})}}};function au(e){return I`
    <li>
      <a class="entry" href="#/treatment/${e.id}/intake" data-replace>
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          ${e.frequency?I`<span class="entry__meta">${e.frequency}</span>`:``}
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}function ou(e,t){let n=t.filter(t=>t.type===e);return n.length?I`
    <section class="section" aria-labelledby="pick-${e}">
      <h2 class="section-title" id="pick-${e}">${R(`treatment.${e}`)}</h2>
      <ul class="entries">${n.map(au)}</ul>
    </section>`:``}var su={render(){let e=ze();return z({header:B({back:`/today`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`quickIntake.title`)}</h1>
        ${e.length?I`<p class="screen-lead">${R(`quickIntake.lead`)}</p>${ou(`acute`,e)}${ou(`preventive`,e)}`:I`<p class="screen-lead">${R(`quickIntake.empty`)}</p>`}`,footer:V({label:R(`quickIntake.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})})},actions:{add(){a(`/treatment/new`)}}},cu=[0,1,5,15];function lu(e){let t=j();return I`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${R(`security.title`)}</h2>
      <div class="list">
        ${fn({name:`appLock`,label:R(`security.pin`),hint:R(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?I`
              <a class="list__row" href="#/security/pin?mode=change">
                ${L(`keyRound`)}<span class="list__label">${R(`security.changePin`)}</span>${L(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${R(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${cu.map(t=>I`<option value="${t}"${t===(e.autoLockMinutes??1)?I` selected`:``}>
                      ${R(`security.autoLockOptions.m${t}`)}
                    </option>`)}
                </select>
              </div>`:``}
        <label class="list__row list__row--switch is-disabled" for="f-biometrics">
          ${L(`scanFace`)}
          <span class="list__text">
            <span class="list__label">${R(`security.biometrics`)}</span>
            <span class="list__hint" id="f-biometrics-hint">${R(`security.biometricsHint`)}</span>
          </span>
          <input class="switch" type="checkbox" role="switch" id="f-biometrics" disabled aria-describedby="f-biometrics-hint" />
        </label>
      </div>
    </section>`}function uu(){let e=new Blob([JSON.stringify(Tt(),null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`vestie-${M()}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var du={render(){let e=F();return en(`profile`,I`
      <h1 class="screen-title" tabindex="-1">${R(`profile.title`)}</h1>

      ${I`<section class="profile-section" aria-labelledby="demo-title">
            <h2 id="demo-title">${R(`profile.demoSection`)}</h2>
            <div class="list">
              ${fn({name:`demoEnabled`,label:R(`profile.demoFill`),hint:R(`profile.demoFillHint`),checked:e.demoEnabled,iconName:`sparkles`})}
            </div>
          </section>`}

      <section class="profile-section" aria-labelledby="me-title">
        <h2 id="me-title">${R(`profile.me`)}</h2>
        ${H({label:R(`profile.name`),name:`name`,value:e.name,placeholder:R(`profile.namePlaceholder`),hint:R(`profile.nameHint`),autocomplete:`given-name`,maxlength:40})}
      </section>

      <section class="profile-section" aria-labelledby="lang-title">
        <h2 id="lang-title">${R(`profile.language`)}</h2>
        <label class="visually-hidden" for="f-language">${R(`profile.language`)}</label>
        <select class="field__input" id="f-language" name="language">
          ${Ht.map(t=>I`<option value="${t}" lang="${t}"${t===e.language?I` selected`:``}>${Yt(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${R(`profile.tracking`)}</h2>
        <div class="list">
          ${fn({name:`cycleTracking`,label:R(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${fn({name:`reminderEnabled`,label:R(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
          ${e.reminder.enabled?I`<div class="list__field">
                ${H({label:R(`profile.reminderTime`),name:`reminderTime`,type:`time`,value:e.reminder.time})}
              </div>`:``}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="display-title">
        <h2 id="display-title">${R(`profile.display`)}</h2>
        <div class="list">
          <div class="list__field list__field--first">
            <span class="field__label" aria-hidden="true">${R(`profile.appearance`)}</span>
            ${ln({name:`theme`,legend:R(`profile.appearance`),selected:e.theme??`system`,options:zs.map(e=>({value:e,label:R(`profile.themes.${e}`)}))})}
          </div>
          ${fn({name:`reduceMotion`,label:R(`profile.reduceMotion`),hint:R(`profile.reduceMotionHint`),checked:e.reduceMotion,iconName:`sparkles`})}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="integrations-title">
        <h2 id="integrations-title">${R(`profile.integrations`)}</h2>
        <div class="list">
          <div class="list__row">
            ${L(`watch`)}
            <span class="list__text">
              <span class="list__label">${R(`profile.health`)}</span>
              <span class="list__hint">${R(`profile.healthHint`)}</span>
              <span class="list__chip">${pn(R(`profile.comingSoon`),{neutral:!0})}</span>
            </span>
          </div>
        </div>
      </section>

      ${lu(e)}

      <section class="profile-section" aria-labelledby="privacy-title">
        <h2 id="privacy-title">${R(`profile.privacy`)}</h2>
        <div class="list">
          <div class="list__row">
            ${L(`smartphone`)}
            <span class="list__text">
              <span class="list__label">${R(`privacy.deviceOnly`)}</span>
              <span class="list__hint">${R(`privacy.deviceOnlyHint`)}</span>
            </span>
          </div>
          <button type="button" class="list__row" data-action="exportData">
            ${L(`download`)}
            <span class="list__text">
              <span class="list__label">${R(`privacy.export`)}</span>
              <span class="list__hint">${R(`privacy.exportHint`)}</span>
            </span>
          </button>
          <a class="list__row" href="#/privacy-policy">
            ${L(`fileText`)}
            <span class="list__label">${R(`privacyPolicy.title`)}</span>
            ${L(`chevronRight`,{size:20})}
          </a>
          <div class="list__row">
            ${L(`shield`)}
            <span class="list__text">
              <span class="list__label">${R(`privacy.consent`)}</span>
              <span class="list__hint">
                ${e.consent?.healthDataAt?R(`privacy.consentGiven`,{date:Mc(e.consent.healthDataAt)}):``}
              </span>
              <button type="button" class="link-btn list__chip" data-action="withdrawConsent">${R(`privacy.withdraw`)}</button>
            </span>
          </div>
          <button type="button" class="list__row list__row--danger" data-action="deleteAll">
            ${L(`trash`)}
            <span class="list__label">${R(`profile.deleteAll`)}</span>
          </button>
        </div>
      </section>

      <section class="profile-section" aria-labelledby="dev-title">
        <h2 id="dev-title">${R(`profile.dev`)}</h2>
        <div class="list">
          ${I`
                ${e.demoEnabled?I`<button type="button" class="list__row" data-action="demoReset">
                      ${L(`sparkles`)}<span class="list__label">${R(`profile.demoReset`)}</span>
                    </button>`:``}
                <button type="button" class="list__row" data-action="onboardingAgain">
                  ${L(`arrowRight`)}<span class="list__label">${R(`profile.onboardingAgain`)}</span>
                </button>`}
          <a class="list__row" href="#/styleguide">
            ${L(`palette`)}
            <span class="list__label">${R(`profile.styleguide`)}</span>
            ${L(`chevronRight`,{size:20})}
          </a>
        </div>
      </section>

      <div class="section">
        ${V({label:R(`profile.logout`),variant:`outline`,iconName:`logOut`,action:`logout`,block:!0})}
      </div>

      <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`profile.disclaimer`)}</span></p>`,{header:B({back:`/today`})})},onChange(e,t){let{reminder:n}=F();switch(e.name){case`name`:Ie({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),Q(R(`profile.saved`));break;case`language`:Gt(e.value),Ie({language:e.value}),re({language:e.value}),t.rerender();break;case`theme`:Ie({theme:e.value}),re({theme:e.value}),Hs(e.value);break;case`demoEnabled`:e.checked?jt(Ls()):Mt(),t.rerender(),Q(R(e.checked?`profile.demoFillOn`:`profile.demoFillOff`));break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:Ie({autoLockMinutes:Number(e.value)}),Q(R(`profile.saved`));break;case`cycleTracking`:Ie({cycleTracking:e.checked});break;case`reminderEnabled`:Ie({reminder:{...n,enabled:e.checked}}),t.rerender(),e.checked&&ws(document.querySelector(`.list__field`));break;case`reduceMotion`:Ie({reduceMotion:e.checked}),_s();break;case`reminderTime`:e.value&&Ie({reminder:{...n,time:e.value}})}},actions:{async demoReset(e,t){await wc({title:R(`profile.demoResetTitle`),text:R(`profile.demoResetText`),confirmLabel:R(`profile.demoResetConfirm`)})&&(jt(Ls()),t.rerender(),Q(R(`profile.demoResetDone`)))},onboardingAgain(){Ie({onboardingCompletedAt:null}),a(`/start/welcome`,{replace:!0})},exportData(){uu(),Q(R(`privacy.exportDone`))},async logout(){j()?Js():await wc({title:R(`profile.logoutNoPinTitle`),text:R(`profile.logoutNoPinText`),confirmLabel:R(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set&logout=1`)},async withdrawConsent(){await wc({title:R(`privacy.withdrawTitle`),text:R(`privacy.withdrawText`),confirmLabel:R(`privacy.withdrawConfirm`)})&&(Nt(),_s(),a(`/start/language`,{replace:!0}))},async deleteAll(){await wc({title:R(`profile.deleteAllTitle`),text:R(`profile.deleteAllText`),confirmLabel:R(`profile.deleteAllConfirm`)})&&(Nt(),_s(),a(`/start/language`,{replace:!0}))}}},fu=[[`--color-bg`,`Pozadie`],[`--color-blob`,`Organické tvary`],[`--color-surface`,`Karty`],[`--color-surface-tint`,`Zvolené / sekundárne`],[`--color-border`,`Okraje`],[`--color-border-strong`,`Výrazné okraje`],[`--color-coral`,`Korálová – akcent`],[`--color-coral-soft`,`Korálová jemná`],[`--color-cta`,`Tlačidlá`],[`--color-cta-pressed`,`Tlačidlá – stlačené`],[`--color-text`,`Text`],[`--color-text-muted`,`Text tlmený`]],pu=(e,t)=>I`
  <section class="sg-section">
    <h2 class="section-title">${e}</h2>
    ${t}
  </section>`,mu={render(){return z({header:B({back:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">Dizajn systém</h1>
        <p class="screen-lead">Farby a písma sú v <code>src/styles/tokens.css</code>, logo v
          <code>src/assets/brand/vm-logo.svg</code>. Ilustrácie sú zatiaľ zástupné v <code>src/ui/placeholders.js</code>.</p>

        ${pu(`Farby`,I`<div class="sg-swatches">
            ${fu.map(([e,t])=>I`
                <div class="sg-swatch">
                  <span class="sg-swatch__color" style="background:var(${e})"></span>
                  <span class="sg-swatch__label">${t}</span>
                  <code class="sg-swatch__token">${e}</code>
                </div>`)}
          </div>`)}

        ${pu(`Typografia`,I`<div class="stack">
            <p class="sg-type sg-type--3xl">Nadpis úvodu 38</p>
            <p class="sg-type sg-type--2xl">Nadpis obrazovky 32</p>
            <p class="sg-type sg-type--xl">Nadpis dialógu 26</p>
            <p class="sg-type sg-type--lg">Nadpis sekcie a karty 20</p>
            <p>Bežný text 17 – Zaznamenávajte svoje symptómy, hľadajte možné súvislosti.</p>
            <p class="muted small">Doplnkový text 15 – tlmená farba pre vysvetlivky.</p>
          </div>`)}

        ${pu(`Tlačidlá`,I`<div class="stack">
            ${V({label:`Primárne`,block:!0,action:`demo`})}
            ${V({label:`Sekundárne`,variant:`secondary`,block:!0,action:`demo`})}
            ${V({label:`Obrysové`,variant:`outline`,block:!0,action:`demo`})}
            ${V({label:`Textové (Preskočiť)`,variant:`ghost`,block:!0,action:`demo`})}
            ${V({label:`Nebezpečná akcia`,variant:`danger`,block:!0,action:`demo`})}
            ${V({label:`Neaktívne`,block:!0,disabled:!0})}
            <div class="btn-row">
              ${V({label:`S ikonou`,iconName:`plus`,compact:!0,action:`demo`})}
              ${V({label:`Kompaktné`,variant:`secondary`,iconName:`timer`,compact:!0,action:`demo`})}
            </div>
          </div>`)}

        ${pu(`Výber možností`,I`<div class="stack">
            ${cn({name:`sg-radio`,legend:`Jedna možnosť`,options:[{value:`a`,label:`Vestibulárna migréna`},{value:`b`,label:`Migréna`}],selected:`a`})}
            ${cn({name:`sg-check`,type:`checkbox`,legend:`Viac možností`,options:[{value:`a`,label:`Sledovať moje symptómy`},{value:`b`,label:`Zaznamenávať možné spúšťače`}],selected:[`a`]})}
            ${ln({name:`sg-seg`,legend:`Segment`,selected:`a`,options:[{value:`a`,label:`Preventívny`},{value:`b`,label:`Akútny`}]})}
          </div>`)}

        ${pu(`Polia a prepínače`,I`<div class="stack">
            ${H({label:`Názov lieku`,name:`sg-name`,placeholder:`napr. Betahistín`})}
            ${H({label:`Poznámka`,name:`sg-note`,multiline:!0,optional:!0})}
            <div class="list">${fn({name:`sg-switch`,label:`Denná pripomienka`,checked:!0,iconName:`bell`})}</div>
          </div>`)}

        ${pu(`Karty a štítky`,I`<div class="stack">
            <div class="card">
              <h3 class="card__title">Karta</h3>
              <p class="muted">Zaoblená plocha s jemným tieňom.</p>
            </div>
            <div class="card card--accent">
              <h3 class="card__title">Zvýraznená karta</h3>
              <p class="muted">Napríklad prebiehajúca epizóda.</p>
            </div>
            <div class="btn-row">${pn(`Prebieha`,{live:!0})} ${pn(`Ukončená`,{neutral:!0})}</div>
          </div>`)}

        ${pu(`Ikony (Lucide)`,I`<div class="sg-icons">
            ${Bt.map(e=>I`<span class="sg-icon" title="${e}">${L(e)}</span>`)}
          </div>
          <div class="btn-row" style="margin-top:16px">${mn(`timer`)} ${mn(`pill`,{large:!0})}</div>`)}

        ${pu(`Logo a ilustrácie (ilustrácie sú zástupné)`,I`<div class="stack">
            ${rc()}
            ${rc({large:!0})}
            ${ic({size:220})}
            ${ic({symbol:`bell`,size:160})}
          </div>`)}`})},actions:{demo(){Q(`Toto je upozornenie (toast)`,{actionLabel:`Vrátiť`,onAction:()=>{}})}}},hu=`/log/symptoms`;function gu(){let e=pl().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?R(`log.continueCount`,{n:e}):R(`common.continue`)}var _u={render(){let e=pl(),{step:t,total:n}=gl(hu),r=e.symptoms.map(e=>e.key),i=r.length;return z({header:B({back:`/today`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${R(`log.symptomsLead`)}</p>

        <div class="search">
          ${L(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${R(`log.search`)}" aria-label="${R(`log.search`)}" />
        </div>

        ${wl({name:`symptom`,legend:R(`log.symptomsTitle`),items:Cl(),selected:r,search:!0})}
        <p class="empty" id="sym-empty" hidden>${R(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${R(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${R(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${L(`plus`,{size:20})}<span>${R(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:V({label:i?R(`log.continueCount`,{n:i}):R(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=Sl(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-cell`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=pl();e.checked?t.symptoms.push({key:e.value,intensity:null,pending:!0}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),gu()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=ct(e.elements.custom.value);if(!n)return;let r=pl();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null,pending:!0}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{...Tl,next(){pl().symptoms.length&&a(gl(hu).next,{replace:!0})}}},vu=`/log/intensity`,yu={render(){let{symptoms:e}=pl(),{step:t,total:n}=gl(vu);return z({header:B({backAction:`prevStep`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${R(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>bl({index:t,label:Jc(e.key),value:_l(e),iconName:Yc(e.key)}))}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),action:`next`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);vl(pl().symptoms[t],Number(e.value)),xl(t,Number(e.value))},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);vl(pl().symptoms[t],null),xl(t,null),document.querySelector(`[data-action="restore"][data-index="${t}"]`).focus()},restore(e){let t=Number(e.dataset.index);vl(pl().symptoms[t],5),xl(t,5),document.getElementById(`int-${t}`).focus()},next(){pl().symptoms.forEach(yl),a(gl(vu).next,{replace:!0})},skip(){for(let e of pl().symptoms)vl(e,null);a(gl(vu).next,{replace:!0})},prevStep(){a(gl(vu).prev,{replace:!0})}}},bu=`/log/details`;function xu(e){return e.episodeId?lt(e.episodeId):Ce(e.date)?ut():null}function Su(e){return Ce(ve(e.date))?R(`log.whenToday`,{time:e.time}):R(`log.whenOn`,{date:Oc(ve(e.date)),time:e.time})}var Cu={render(){let e=pl(),{step:t,total:n}=gl(bu),r=xu(e);return z({header:B({backAction:`prevStep`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${R(`log.detailsLead`)}</p>
        <div class="step-options">
          ${cn({name:`duration`,legend:R(`log.detailsTitle`),options:Rc.map(e=>({value:e,label:Qc(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${R(`log.when`)}</legend>
          <!-- Čas je predvyplnený (teraz alebo deň z kalendára); polia sa ukážu až na požiadanie -->
          <div class="when-summary"${e.editTime?I` hidden`:``}>
            <span>${Su(e)}</span>
            <button type="button" class="link-btn" data-action="changeTime" aria-controls="when-fields">${R(`log.changeTime`)}</button>
          </div>
          <div class="field-row" id="when-fields"${e.editTime?``:I` hidden`}>
            <div class="field">
              <label class="field__label" for="f-date">${R(`log.date`)}</label>
              <input class="field__input" type="date" id="f-date" name="date" value="${e.date}" max="${M()}" required />
            </div>
            <div class="field">
              <label class="field__label" for="f-time">${R(`log.time`)}</label>
              <input class="field__input" type="time" id="f-time" name="time" value="${e.time}" required />
            </div>
          </div>
          ${r?cn({name:`linkEpisode`,type:`checkbox`,legend:R(`log.linkEpisode`),options:[{value:`yes`,label:`${R(`log.linkEpisode`)} (${R(`episode.since`,{time:kc(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${H({label:R(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:V({label:R(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=pl();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(pl().note=e.value)},actions:{changeTime(){pl().editTime=!0,document.querySelector(`.when-summary`).hidden=!0,document.getElementById(`when-fields`).hidden=!1,document.getElementById(`f-date`).focus()},save(){let e=pl(),t=xu(e);nt({id:e.id,occurredAt:be(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),ml(),s(`/today`),Q(R(`log.saved`))},prevStep(){a(gl(bu).prev,{replace:!0})}}};function wu(e){return I`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>I`
          <li class="sym-row">
            <span class="icon-badge">${L(Yc(e.key),{size:22})}</span>
            <span class="sym-row__label">${Jc(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${Xc(e.intensity)}</span>
          </li>`)}
    </ul>`}var Tu={render(e){let t=et(e.params.id);if(!t)return z({header:B({back:`/today`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`symptomLog.title`)}</h1>
          <p class="screen-lead">${R(`symptomLog.notFound`)}</p>`});let n=t.episodeId?lt(t.episodeId):null;return z({header:B({back:`/today`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`symptomLog.title`)}</h1>
        <p class="screen-lead">${Oc(new Date(t.occurredAt))} · ${kc(t.occurredAt)}</p>
        ${wu(t)}
        <dl class="facts">
          ${t.duration?I`<div class="fact"><dt>${R(`symptomLog.duration`)}</dt><dd>${Qc(t.duration)}</dd></div>`:``}
          ${n?I`<div class="fact"><dt>${R(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${R(`episode.since`,{time:kc(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?I`<h2 class="section-title section">${R(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:I`
        ${V({label:R(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${V({label:R(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){fl({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await wc({title:R(`symptomLog.deleteTitle`),text:R(`symptomLog.deleteText`),confirmLabel:R(`symptomLog.delete`)}))return;let n=rt(t.params.id);s(`/today`),Q(R(`symptomLog.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{it(n),t.rerender()}})}}};function Eu(e){let t=Ke(e.id)[0];return I`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?R(`treatment.lastTaken`,{when:Ac(t.takenAt)}):R(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}function Du(e,t){let n=t.filter(t=>t.type===e);return I`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${R(`treatment.${e}`)}</h2>
      ${n.length?I`<ul class="entries">${n.map(Eu)}</ul>`:I`<p class="empty">${R(`treatment.noneOfType`)}</p>`}
    </section>`}var Ou={render(){let e=ze();return en(`treatment`,I`
        ${sn(R(`treatment.title`))}
        <p class="screen-lead">${R(`treatment.lead`)}</p>
        ${e.length?I`<p class="treatment-hint">${R(`treatment.hint`)}</p>`:``}
        ${e.length?I`${Du(`preventive`,e)}${Du(`acute`,e)}`:I`<p class="empty section">${R(`treatment.empty`)}</p>`}
        <div class="section">
          ${V({label:R(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},ku=20,Au=(e,t)=>t?I`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``;function ju(e){let t=[e.dose,e.effect?$c(e.effect):R(`treatment.effectMissing`),e.episodeId?R(`treatment.inEpisode`):``].filter(Boolean);return I`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        <span class="entry__main">
          <span class="entry__title">${jc(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}var Mu={render(e){let t=Be(e.params.id);if(!t)return z({header:B({back:`/treatment`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`treatment.title`)}</h1>
          <p class="screen-lead">${R(`treatment.notFound`)}</p>`});let n=Ke(t.id),r=e.query.all===`1`,i=Wc.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return z({header:B({back:`/treatment`}),body:I`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${pn(R(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${Au(R(`treatment.dose`),t.dose)}
          ${Au(R(`treatment.frequency`),t.frequency)}
          ${Au(R(`treatment.taken`),Xt(`plural.times`,n.length))}
        </dl>
        ${t.note?I`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?I`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${R(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>I`<li class="sym-chip">${$c(e.key)} <strong>${Xt(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${R(`treatment.history`)}</h2>
          ${n.length?I`<ul class="entries">${(r?n:n.slice(0,ku)).map(ju)}</ul>
                ${!r&&n.length>ku?I`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
                      ${R(`treatment.showAll`,{n:n.length})}
                    </button>`:``}`:I`<p class="empty">${R(`treatment.historyEmpty`)}</p>`}
        </section>

        <div class="list section">
          <a class="list__row" href="#/treatment/${t.id}/edit">
            ${L(`pencil`)}<span class="list__label">${R(`treatment.edit`)}</span>${L(`chevronRight`,{size:20})}
          </a>
          <button type="button" class="list__row list__row--danger" data-action="delete">
            ${L(`trash`)}<span class="list__label">${R(`treatment.delete`)}</span>
          </button>
        </div>
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`treatment.disclaimer`)}</span></p>`,footer:V({label:R(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await wc({title:R(`treatment.deleteTitle`),text:R(`treatment.deleteText`),confirmLabel:R(`treatment.delete`)}))return;let n=We(t.params.id);s(`/treatment`),Q(R(`treatment.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{Ge(n),t.rerender()}})}}};function Nu(e,t){if(t===`edit`){let t=qe(e.params.id);return{intake:t,medication:t?Be(t.medicationId):null}}return{intake:null,medication:Be(e.params.id)}}function Pu({mode:e}){return{render(t){let{intake:n,medication:r}=Nu(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return z({header:B({back:i}),body:I`<h1 class="screen-title" tabindex="-1">${R(`intake.title`)}</h1>
            <p class="screen-lead">${R(`intake.notFound`)}</p>`});let a=n?new Date(n.takenAt):new Date,o=n?M(a):t.query.date??M(a);return z({form:!0,header:B({back:i}),body:I`
          <h1 class="screen-title" tabindex="-1">${R(n?`intake.editTitle`:`intake.title`)}</h1>
          <p class="screen-lead">${[r.name,r.dose].filter(Boolean).join(` · `)}</p>
          <div class="form-stack">
            <div class="field-row">
              ${H({label:R(`intake.date`),name:`date`,type:`date`,value:o})}
              ${H({label:R(`intake.time`),name:`time`,type:`time`,value:ye(a)})}
            </div>
            ${H({label:R(`intake.dose`),name:`dose`,value:n?.dose??r.dose,optional:!0})}
            <fieldset class="form-section form-section--tight">
              <legend class="field__label">${R(`intake.effect`)}</legend>
              <p class="field__hint">${R(`intake.effectHint`)}</p>
              ${cn({name:`effect`,legend:R(`intake.effect`),options:Wc.map(e=>({value:e,label:$c(e)})),selected:n?.effect})}
            </fieldset>
            ${H({label:R(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:I`
          ${V({label:R(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?V({label:R(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=Nu(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||M()),c={medicationId:i.id,takenAt:be(o,String(a.get(`time`)||ye())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?Ze(r.id,c):Xe(c),Q(R(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=Nu(n,e);if(!await wc({title:R(`intake.deleteTitle`),text:R(`intake.deleteText`),confirmLabel:R(`intake.delete`)}))return;let a=Qe(r.id);s(`/treatment/${i.id}`),Q(R(`intake.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{$e(a),n.rerender()}})}}}}function Fu(e){let t=Et(e);return{entries:t,count:t.symptomLogs.length+t.episodes.length,episode:t.episodes.length>0,symptoms:t.symptomLogs.length>0,period:t.period}}function Iu(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(Kt(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(xe(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(Kt())+i.slice(1)})}function Lu(e,t,{isToday:n,isSelected:r}){let i=[Oc(ve(e))];return n&&i.push(R(`calendar.today`)),t.episode&&i.push(R(`calendar.summaryEpisode`)),t.count&&i.push(R(`calendar.summaryEntries`,{n:t.count})),t.period&&i.push(R(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(R(`calendar.summaryNone`)),r&&i.push(R(`calendar.selected`)),i.join(`, `)}function Ru(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=Fu(e),o=e===r,s=e===n;return I`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.episode?`cal-day--episode`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${Lu(e,a,{isToday:o,isSelected:s})}"${s?I` aria-pressed="true"`:I` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">${a.symptoms?I`<span class="cal-dot"></span>`:``}</span>
      ${i&&a.period?I`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function zu(e,t,n){let r=Te(e),i=(r.getDay()+6)%7,a=xe(r,-i),o=M(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>M(xe(a,t)));return I`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${Iu().map(e=>I`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>Ru(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function Bu(e,t){let{entries:n,count:r}=Fu(e),i=r+n.intakes.length>0||!!n.sleep,a=e>M();return I`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${Oc(ve(e))}</h2>
      ${i?ul(n):I`<p class="empty">${R(`calendar.dayEmpty`)}</p>`}
      ${t?I`<div class="list cal-period-toggle">
            <label class="list__row list__row--switch" for="f-period">
              ${L(`droplet`)}
              <span class="list__label">${R(`calendar.periodMark`)}</span>
              <input class="switch" type="checkbox" role="switch" id="f-period" name="period" data-day="${e}"${n.period?I` checked`:``} />
            </label>
          </div>`:``}
      ${a?``:I`<div class="cal-detail__actions">
            ${V({label:R(`calendar.addSymptom`),iconName:`plus`,variant:`secondary`,action:`addSymptom`,data:{day:e},block:!0})}
            ${n.sleep?``:V({label:R(`sleep.add`),iconName:`bed`,variant:`secondary`,action:`addSleep`,data:{day:e},block:!0})}
          </div>`}
    </section>`}var Vu={render(e){let t=M(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=F().cycleTracking===!0,a=r===we();return en(`calendar`,I`
        ${sn(R(`calendar.title`))}
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${Ee(r,-1)}" aria-label="${R(`calendar.prev`)}">
            ${L(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${Nc(Te(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${Ee(r,1)}" aria-label="${R(`calendar.next`)}">
            ${L(`chevronRight`)}
          </button>
        </div>
        ${a?``:I`<button type="button" class="link-btn cal-today-link" data-action="goToday">${R(`calendar.backToday`)}</button>`}
        ${zu(r,n,i)}
        <ul class="cal-legend" aria-label="${R(`calendar.legend`)}">
          <li><span class="cal-legend__mark cal-legend__mark--episode" aria-hidden="true"></span>${R(`calendar.legendEpisode`)}</li>
          <li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-dot"></span></span>${R(`calendar.legendSymptoms`)}</li>
          ${i?I`<li><span class="cal-legend__mark" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${R(`calendar.legendPeriod`)}</li>`:``}
        </ul>
        ${Bu(n,i)}`)},onChange(e,t){e.name===`period`&&(bt(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${M()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){fl({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}};function Hu(e){return{from:M(xe(new Date,-(e-1))),to:M()}}function Uu(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var Wu=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function Gu({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=Tt(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=M(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>M(e.occurredAt)),...d.map(e=>M(e.startedAt))]),m=[...u.map(at),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:Uu(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:Wu(m),avgDurationMinutes:Wu(h),symptoms:Uu([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),triggers:Uu(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:Wu(c.map(e=>e.minutes)),sleepQuality:Uu(c.map(e=>e.quality).filter(Boolean))}}var Ku=[30,60,90];function qu(e,t){let n=Math.max(...e.map(e=>e.count),1);return I`
    <ul class="bars">
      ${e.map(e=>I`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${Xt(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var Ju=(e,t,{empty:n=!1}={})=>I`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,Yu={render(e){let t=Ku.includes(Number(e.query.days))?Number(e.query.days):30,n=Gu(Hu(t)),r=R(`insights.noValue`),i=I`
      ${sn(R(`insights.title`))}
      <div class="insights-period">
        ${ln({name:`days`,legend:R(`insights.periodLabel`),selected:String(t),options:Ku.map(e=>({value:String(e),label:Xt(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?en(`insights`,I`${i}
          <div class="coming">
            ${ic({symbol:`chart`,size:200})}
            <p class="muted">${R(`insights.empty`)}</p>
          </div>
          ${V({label:R(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}`):en(`insights`,I`${i}
        <section class="section" aria-labelledby="ov-title">
          <h2 class="section-title" id="ov-title">${R(`insights.overview`)}</h2>
          <div class="stats">
            ${Ju(R(`insights.symptomDays`),n.symptomDays)}
            ${Ju(R(`insights.episodes`),n.episodeCount)}
            ${Ju(R(`insights.avgIntensity`),n.avgIntensity==null?r:Pc(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${Ju(R(`insights.avgDuration`),n.avgDurationMinutes==null?r:Fc(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        <section class="section" aria-labelledby="sym-title">
          <h2 class="section-title" id="sym-title">${R(`insights.topSymptoms`)}</h2>
          <p class="muted small">${R(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?qu(n.symptoms.slice(0,6),Jc):I`<p class="muted">${R(`insights.empty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="trig-title">
          <h2 class="section-title" id="trig-title">${R(`insights.topTriggers`)}</h2>
          ${n.triggers.length?qu(n.triggers.slice(0,6),el):I`<p class="muted">${R(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="section" aria-labelledby="sleep-title">
          <h2 class="section-title" id="sleep-title">${R(`sleep.title`)}</h2>
          ${n.sleeps.length?I`<div class="stats">
                  ${Ju(R(`sleep.avg`),Fc(n.avgSleepMinutes))}
                  ${Ju(R(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?qu(n.sleepQuality,il):``}`:I`<p class="muted">${R(`report.sleepNone`)}</p>`}
        </section>

        <section class="section" aria-labelledby="meds-title">
          <h2 class="section-title" id="meds-title">${R(`insights.meds`)}</h2>
          ${n.meds.length?I`<ul class="med-stats">
                ${n.meds.map(e=>I`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${Xt(`plural.times`,e.count)}</span>
                      ${e.effects.length?I`<span class="med-stats__effects">${e.effects.map(e=>`${$c(e.key)} ${Xt(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:I`<p class="muted">${R(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`insights.interpretation`)}</span></p>
        <div class="section">
          ${V({label:R(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},Xu={render(e){let t=Ku.includes(Number(e.query.days))?String(e.query.days):`30`,n=Hu(30);return z({form:!0,header:B({back:`/insights`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`report.title`)}</h1>
        <p class="screen-lead">${R(`report.lead`)}</p>
        <div class="step-options">
          ${cn({name:`range`,legend:R(`report.period`),options:[...Ku.map(e=>({value:String(e),label:Xt(`plural.days`,e)})),{value:`custom`,label:R(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${H({label:R(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${H({label:R(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>`,footer:V({label:R(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||M()),!r||r>i){un(e,`from`,R(`report.invalidRange`));return}}else({from:r,to:i}=Hu(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},Zu=5;function Qu(e,t){return e.length?I`
    <table class="report-table">
      <tbody>
        ${e.map(e=>I`<tr><td>${t(e.key)}</td><td class="num">${Xt(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}function $u(e){let t=[...e.logs.map(e=>{let t=at(e);return{at:e.occurredAt,entry:R(`symptomLog.title`),detail:[Zc(e),t==null?``:R(`intensity.highest`,{value:Xc(t)}),e.duration?Qc(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:R(`episode.title`),detail:e.endedAt?`${jc(e.startedAt)} – ${jc(e.endedAt)}`:R(`episode.statusOngoing`)})),...e.intakes.filter(e=>Be(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:Be(e.medicationId)?.name??R(`today.intakeTitle`),detail:[e.dose,e.effect?$c(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??be(e.date,`06:00`),dateOnly:!0,entry:R(`sleep.title`),detail:[Fc(e.minutes),e.quality?il(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?I`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${R(`report.colDate`)}</th><th>${R(`report.colEntry`)}</th><th>${R(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>I`<tr><td>${e.dateOnly?Mc(e.at):jc(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}var ed={render(e){let t=e.query.from??M(),n=e.query.to??M(),r=Gu({from:t,to:n}),i=F().cycleTracking===!0,a=r.logs.filter(e=>e.note),o=R(`insights.noValue`);return z({variant:`screen--report`,header:B({back:`/insights`}),body:I`
        <h1 class="visually-hidden" tabindex="-1">${R(`report.title`)}</h1>
        <p class="report-hint">${R(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${R(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${R(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${R(`report.period`)}</dt><dd>${Mc(ve(t))} – ${Mc(ve(n))}</dd></div>
              <div><dt>${R(`report.created`)}</dt><dd>${Mc(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${R(`report.disclaimer`)}</p>
            ${r.recordCount<Zu?I`<p class="report-warning">${R(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${R(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${R(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${R(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${R(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:Pc(r.avgIntensity)}</td></tr>
                <tr><td>${R(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:Fc(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${R(`report.symptoms`)}</h3>
            ${Qu(r.symptoms,Jc)}
          </section>

          <section>
            <h3>${R(`report.triggers`)}</h3>
            ${Qu(r.triggers,el)}
          </section>

          <section>
            <h3>${R(`report.meds`)}</h3>
            ${r.meds.length?I`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>I`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${R(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${Xt(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${$c(e.key)} ${Xt(`plural.times`,e.count)}`).join(`, `)||R(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${R(`report.sleep`)}</h3>
            ${r.sleeps.length?I`<table class="report-table">
                  <tbody>
                    <tr><td>${R(`sleep.avg`)}</td><td class="num">${Fc(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${R(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>I`<tr><td>${R(`report.sleepQuality`)}: ${il(e.key)}</td><td class="num">${Xt(`plural.times`,e.count)}</td></tr>`)}
                  </tbody>
                </table>`:I`<p class="report-none">${R(`report.sleepNone`)}</p>`}
          </section>

          ${i?I`<section>
                <h3>${R(`report.cycle`)}</h3>
                <p>${R(`report.cycleDays`)}: <strong>${r.periodDays}</strong></p>
              </section>`:``}

          ${a.length?I`<section>
                <h3>${R(`report.notes`)}</h3>
                <ul class="report-notes">
                  ${a.map(e=>I`<li><strong>${jc(e.occurredAt)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${R(`report.timeline`)}</h3>
            ${$u(r)}
          </section>
        </article>`,footer:V({label:R(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){window.print()}}},td=[`good`,`fair`,`poor`],nd=Array.from({length:17},(e,t)=>t),rd=Array.from({length:12},(e,t)=>t*5);function id({name:e,label:t,values:n,selected:r,suffix:i=``}){return I`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>I`<option value="${e}"${e===r?I` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var ad={render(e){let t=e.query.date??M(),n=xt(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return z({form:!0,header:B({back:`/today`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${R(`sleep.lead`)}</p>
        <div class="form-stack">
          ${H({label:R(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${R(`sleep.duration`)}</legend>
            <div class="field-row">
              ${id({name:`hours`,label:R(`sleep.hours`),values:nd,selected:r,suffix:` h`})}
              ${id({name:`minutes`,label:R(`sleep.minutes`),values:rd,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${R(`sleep.quality`)} <span class="field__optional">(${R(`common.optional`)})</span></legend>
            ${cn({name:`quality`,legend:R(`sleep.quality`),options:td.map(e=>({value:e,label:R(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${H({label:R(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:I`
        ${V({label:R(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?V({label:R(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?un(e,`hours`,R(`sleep.durationRequired`)):(St({date:String(t.get(`date`)||M()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),Q(R(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??M();if(!await wc({title:R(`sleep.deleteTitle`),text:R(`sleep.deleteText`),confirmLabel:R(`sleep.delete`)}))return;let r=Ct(n);s(`/today`),Q(R(`sleep.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{wt(r),t.rerender()}})}}},od=`2026-10`,sd=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`]];function cd(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function ld({onboarding:e}){let t=`/start/privacy`;return{render(){let n=!!F().consent?.healthDataAt,r=e?cc(t):null;return z({form:!0,header:e?B({back:r.prev,step:r.step,total:r.total}):``,variant:e?``:`screen--tab`,body:I`
          <h1 class="screen-title" tabindex="-1">${R(`consent.title`)}</h1>
          <p class="screen-lead">${R(`consent.lead`)}</p>
          <ul class="facts-list">
            ${sd.map(([e,t])=>I`<li>${L(e,{size:22})}<span>${R(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${cn({name:`consent`,type:`checkbox`,legend:R(`consent.title`),options:[{value:`health`,label:R(`consent.health`)},{value:`age`,label:R(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${R(`consent.policyLink`)}</a></p>`,footer:V({label:R(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})})},onChange(e){e.name===`consent`&&cd()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();Ie({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:od}}),a(e?cc(t).next:`/today`,{replace:!e})}}}var ud=[`controller`,`data`,`storage`,`purpose`,`legal`,`rights`,`security`,`backup`,`age`,`changes`],dd={render(){return z({header:B({back:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`privacyPolicy.title`)}</h1>
        <p class="screen-lead">${pn(R(`privacyPolicy.draft`),{neutral:!0})} ${R(`privacyPolicy.version`,{version:od})}</p>
        <p class="field__hint section-sm">${R(`privacyPolicy.draftNote`)}</p>
        <div class="policy">
          ${ud.map(e=>I`
              <section>
                <h2 class="section-title">${R(`privacyPolicy.${e}Title`)}</h2>
                <p>${R(`privacyPolicy.${e}Text`)}</p>
              </section>`)}
        </div>`})}},fd=`/start/profile`,pd={render(){let{step:e,total:t,prev:n}=cc(fd);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`profileSetup.title`)}</h1>
        <p class="screen-lead">${R(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${H({label:R(`profileSetup.nameLabel`),name:`name`,value:F().name,placeholder:R(`profileSetup.namePlaceholder`),hint:R(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${L(`lock`,{size:22})}<h2 class="card__title">${R(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${R(j()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:V({label:R(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();Ie({name:t,nameSetAt:t?new Date().toISOString():null});let n=cc(fd).next;j()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function md(){return I`
    <div class="pin">
      <div class="pin__dots" id="pin-dots" role="img" aria-label="${R(`pin.progress`,{n:0,total:6})}">
        ${Array.from({length:6},()=>I`<span class="pin__dot"></span>`)}
      </div>
      <p class="pin__status" id="pin-status" role="status" aria-live="polite"></p>
      <div class="pinpad" role="group" aria-label="${R(`pin.keypad`)}">
        ${[1,2,3,4,5,6,7,8,9].map(e=>I`<button type="button" class="pinpad__key" data-action="pinDigit" data-digit="${e}">${e}</button>`)}
        <span></span>
        <button type="button" class="pinpad__key" data-action="pinDigit" data-digit="0">0</button>
        <button type="button" class="pinpad__key pinpad__key--icon" data-action="pinBackspace" aria-label="${R(`pin.delete`)}">
          ${L(`delete`,{size:26})}
        </button>
      </div>
    </div>`}function hd({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,R(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function gd(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?R(`pin.blockedSeconds`,{n:Math.max(n,1)}):R(`pin.blocked`,{time:t(e)})}function _d(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var vd={set:`new`,change:`current`,disable:`current`},yd=null,bd=null;function xd(){return R(`pin.prompt.${yd.step}`)}function Sd(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=xd())}function Cd(e){return e?.blockedUntil?gd(e.blockedUntil,kc):R(`pin.wrong`)}var wd={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return yd={mode:t,step:vd[t],first:null},z({variant:`screen--pin`,header:B({back:e.query.next?`/start/profile`:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`pin.title.${t}`)}</h1>
        ${t===`set`?I`<p class="screen-lead">${R(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${xd()}</p>
        ${md()}`})},mount(e,t){return bd=hd({onComplete:async e=>{if(bd.status(``),yd.step===`current`){bd.status(R(`pin.checking`));try{await de(e)}catch(e){bd.status(Cd(e),{error:!0});return}if(yd.mode===`disable`){await me(Tt()),Q(R(`pin.disabled`)),s(`/profile`);return}yd.step=`new`,bd.status(``),Sd()}else if(yd.step===`new`){if(_d(e)){bd.status(R(`pin.weak`),{error:!0});return}yd.first=e,yd.step=`confirm`,Sd()}else e===yd.first?(bd.status(R(`pin.saving`)),yd.mode===`set`?await fe(e,Tt(),{language:F().language,theme:F().theme}):await pe(e),Q(R(yd.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.logout?Js():t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(yd.step=`new`,yd.first=null,Sd(),bd.status(R(`pin.mismatch`),{error:!0}))}}),bd.listenToKeyboard()},actions:{pinDigit(e){bd?.digit(e.dataset.digit)},pinBackspace(){bd?.backspace()}}},Td=null;function Ed(){let e=ie();return e>Date.now()&&(Td.setDisabled(!0),Td.status(gd(e,kc),{error:!0}),!0)}n(`/start/language`,ac),n(`/start/welcome`,oc),n(`/start/privacy`,ld({onboarding:!0})),n(`/start/goals`,dc),n(`/start/condition`,mc),n(`/start/cycle`,_c),n(`/start/medications`,bc),n(`/start/medications/new`,Ec({returnTo:`/start/medications`})),n(`/start/reminders`,Sc),n(`/start/profile`,pd),n(`/consent`,ld({onboarding:!1})),n(`/privacy-policy`,dd),n(`/security/pin`,wd),n(`/lock`,{render(){return z({variant:`screen--pin screen--lock`,body:I`
        <div class="lock">
          ${rc()}
          <h1 class="screen-title lock__title" tabindex="-1">${R(`lock.title`)}</h1>
          <p class="pin-setup__prompt">${R(`lock.lead`)}</p>
          ${md()}
          <button type="button" class="link-btn lock__forgot" data-action="forgot">${R(`lock.forgot`)}</button>
        </div>`})},mount(){Td=hd({onComplete:async e=>{Td.status(R(`pin.checking`));try{let t=await ue(e);Td.status(``),Ws(t),a(Xs(),{replace:!0})}catch(e){e?.code===`blocked`||e?.blockedUntil?Td.status(gd(e.blockedUntil,kc),{error:!0}):Td.status(R(`pin.wrong`),{error:!0})}}});let e=Ed(),t=setInterval(()=>{let t=Ed();!t&&e&&(Td.setDisabled(!1),Td.status(``)),e=t},1e3),n=Td.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){ie()<=Date.now()&&Td?.digit(e.dataset.digit)},pinBackspace(){Td?.backspace()},async forgot(){await wc({title:R(`lock.forgotTitle`),text:R(`lock.forgotText`),confirmLabel:R(`lock.forgotConfirm`)})&&(ge(),je(),a(`/start/language`,{replace:!0}))}}}),n(`/today`,$l),n(`/episode/:id`,iu),n(`/episode/:id/details/:step`,Jl),n(`/log/symptoms`,_u),n(`/log/intensity`,yu),n(`/log/details`,Cu),n(`/symptom/:id`,Tu),n(`/calendar`,Vu),n(`/insights`,Yu),n(`/report`,Xu),n(`/report/view`,ed),n(`/sleep`,ad),n(`/treatment`,Ou),n(`/treatment/new`,Ec({returnTo:`/treatment`})),n(`/treatment/:id`,Mu),n(`/treatment/:id/edit`,Ec({returnTo:e=>`/treatment/${e.params.id}`})),n(`/treatment/:id/intake`,Pu({mode:`new`})),n(`/intake/:id`,Pu({mode:`edit`})),n(`/medication-intake`,su),n(`/profile`,du),n(`/styleguide`,mu);var Dd=[`/privacy-policy`,`/security/pin`];function Od(e){return Ks()?e===`/lock`?`/today`:e===`/styleguide`?null:F().language?Le()?e===`/`||e.startsWith(`/start/`)?`/today`:F().consent?.healthDataAt?e.startsWith(`/log/`)&&!pl()?`/today`:null:e===`/consent`||e===`/privacy-policy`?null:`/consent`:e.startsWith(`/start/`)||Dd.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(Ys(e),e===`/lock`?null:`/lock`)}var kd=document.getElementById(`app`),Ad=null;function jd({navigation:e=!0}={}){let{path:t,query:n}=r(),o=Od(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:kd.querySelector(`.screen__body`)?.scrollTop??0;Ad?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>jd({navigation:!1})};kd.innerHTML=String(s.screen.render(d)),Ad={screen:s.screen,ctx:d,cleanup:s.screen.mount?.(kd,d)};let f=kd.querySelector(`.screen__body`);f&&(f.scrollTop=l),e?(kd.querySelector(`.screen-title`)?.focus({preventScroll:!0}),Ss(kd)):c&&document.getElementById(c)?.focus({preventScroll:!0})}var Md={back:e=>s(e.dataset.fallback||`/today`),startEpisode:()=>{a(`/episode/${dt().id}?new=1`)}};kd.addEventListener(`click`,e=>{let t=e.target.closest(`a[href^="#/"]`);if(t){e.preventDefault(),a(t.getAttribute(`href`).slice(1),{replace:t.hasAttribute(`data-replace`)});return}let n=e.target.closest(`[data-action]`);if(!n||!Ad)return;let r=Ad.screen.actions?.[n.dataset.action]??Md[n.dataset.action];r&&(e.preventDefault(),r(n,Ad.ctx,e))}),kd.addEventListener(`submit`,e=>{e.preventDefault(),Ad?.screen.onSubmit?.(e.target,Ad.ctx,e)}),kd.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&Cs(e.target),Ad?.screen.onChange?.(e.target,Ad.ctx,e)}),kd.addEventListener(`input`,e=>{dn(e.target),Ad?.screen.onInput?.(e.target,Ad.ctx,e)});var Nd=0;function Pd(){qs(r().path),a(`/lock`,{replace:!0})}document.addEventListener(`visibilitychange`,()=>{if(!j()||!Ks())return;let e=F().autoLockMinutes??1;document.hidden?(Nd=Date.now(),e===0&&Pd()):Nd&&Date.now()-Nd>=e*6e4&&Pd()}),Gs(),history.state||history.replaceState({index:0},``,location.href),c(()=>jd());