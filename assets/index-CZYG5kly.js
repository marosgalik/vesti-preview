(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[],t=()=>{};function n(t,n){let r=[],i=t.replace(/:(\w+)/g,(e,t)=>(r.push(t),`([^/]+)`));e.push({regex:RegExp(`^${i}$`),keys:r,screen:n})}function r(){let[e,t=``]=(location.hash.slice(1)||`/`).split(`?`);return{path:e,query:Object.fromEntries(new URLSearchParams(t))}}function i(t){for(let n of e){let e=n.regex.exec(t);if(e){let t=Object.fromEntries(n.keys.map((t,n)=>[t,decodeURIComponent(e[n+1])]));return{screen:n.screen,params:t}}}return null}function a(e,{replace:n=!1}={}){let r=history.state?.index??0;n?history.replaceState({index:r},``,`#${e}`):history.pushState({index:r+1},``,`#${e}`),t()}function o(e){history.replaceState(history.state,``,`#${e}`)}function s(e){(history.state?.index??0)>0?history.back():a(e,{replace:!0})}function c(e){t=e,window.addEventListener(`popstate`,()=>e()),e()}var l=new TextEncoder,u=new TextDecoder,d=6e5;function f(e){let t=new Uint8Array(e),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}var p=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)),m=e=>crypto.getRandomValues(new Uint8Array(e)),h=()=>f(m(16));async function g(e,t,n=d){let r=await crypto.subtle.importKey(`raw`,l.encode(e),`PBKDF2`,!1,[`deriveKey`]);return crypto.subtle.deriveKey({name:`PBKDF2`,salt:p(t),iterations:n,hash:`SHA-256`},r,{name:`AES-GCM`,length:256},!1,[`wrapKey`,`unwrapKey`])}var _=()=>crypto.subtle.generateKey({name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`]);async function v(e,t){let n=m(12),r=await crypto.subtle.wrapKey(`raw`,e,t,{name:`AES-GCM`,iv:n});return{iv:f(n),key:f(r)}}function y(e,t){return crypto.subtle.unwrapKey(`raw`,p(e.key),t,{name:`AES-GCM`,iv:p(e.iv)},{name:`AES-GCM`,length:256},!0,[`encrypt`,`decrypt`])}async function b(e,t){let n=m(12),r=await crypto.subtle.encrypt({name:`AES-GCM`,iv:n},t,l.encode(JSON.stringify(e)));return{enc:1,iv:f(n),data:f(r)}}async function x(e,t){let n=await crypto.subtle.decrypt({name:`AES-GCM`,iv:p(e.iv)},t,p(e.data));return JSON.parse(u.decode(n))}var S=`vm:data`,C=`vm:lock`,w=5,T=3e4,E=9e5,D=null,O=Promise.resolve();function k(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(e){return console.error(`[storage] Dáta sa nepodarilo načítať`,e),null}}function A(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(e){console.error(`[storage] Dáta sa nepodarilo uložiť`,e)}}var j=()=>!!k(C),ee=()=>!j()||!!D,te=()=>k(C)?.language??null,ne=()=>k(C)?.theme??null;function re({language:e,theme:t}){let n=k(C);n&&A(C,{...n,...e?{language:e}:{},...t?{theme:t}:{}})}var ie=()=>k(C)?.blockedUntil??0;function ae(e){let t=(e.failed??0)+1,n=t-w,r=n>=0?Date.now()+Math.min(T*2**n,E):0;return A(C,{...e,failed:t,blockedUntil:r}),{failed:t,blockedUntil:r,remaining:Math.max(w-t,0)}}var oe=class extends Error{constructor(e,t={}){super(e),this.code=e,Object.assign(this,t)}};async function se(e){let t=k(C);if(!t)throw new oe(`wrong`);if(t.blockedUntil&&t.blockedUntil>Date.now())throw new oe(`blocked`,{blockedUntil:t.blockedUntil});try{let n=await g(e,t.salt,t.iterations),r=await y(t.wrapped,n);return A(C,{...t,failed:0,blockedUntil:0}),r}catch{throw new oe(`wrong`,ae(k(C)))}}function ce(){if(j())return null;let e=k(S);return e?.enc?null:e}function le(e){if(!j()){A(S,e);return}if(!D)return;let t=b(e,D);O=O.then(()=>t).then(e=>A(S,e)).catch(e=>console.error(`[storage] Dáta sa nepodarilo zašifrovať`,e))}async function ue(e){let t=await se(e),n=k(S),r=n?.enc?await x(n,t):n;return D=t,r}async function de(e){return await se(e),!0}async function fe(e,t,{language:n,theme:r}={}){let i=h(),a=await g(e,i),o=await _(),s=await v(o,a),c=await b(t,o);await O,A(C,{v:1,salt:i,iterations:d,wrapped:s,language:n,theme:r,failed:0,blockedUntil:0}),A(S,c),D=o}async function pe(e){let t=k(C);if(!t||!D)return;let n=h(),r=await g(e,n),i=await v(D,r);A(C,{...t,salt:n,iterations:d,wrapped:i,failed:0,blockedUntil:0})}async function me(e){await O,localStorage.removeItem(C),D=null,A(S,e)}function he(){D=null}function ge(){D=null;try{localStorage.removeItem(S),localStorage.removeItem(C)}catch(e){console.error(`[storage] Dáta sa nepodarilo vymazať`,e)}}var _e=e=>String(e).padStart(2,`0`);function M(e=new Date){let t=new Date(e);return`${t.getFullYear()}-${_e(t.getMonth()+1)}-${_e(t.getDate())}`}function ve(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function ye(e=new Date){let t=new Date(e);return`${_e(t.getHours())}:${_e(t.getMinutes())}`}function be(e,t=`12:00`){let n=ve(e),[r,i]=t.split(`:`).map(Number);return n.setHours(r||0,i||0,0,0),n.toISOString()}function xe(e,t){let n=new Date(e);return n.setDate(n.getDate()+t),n}var Se=(e,t)=>M(e)===M(t),Ce=e=>Se(e,new Date),we=(e=new Date)=>M(e).slice(0,7);function Te(e){let[t,n]=e.split(`-`).map(Number);return new Date(t,n-1,1)}function Ee(e,t){let n=Te(e);return n.setMonth(n.getMonth()+t),we(n)}var De=1;function Oe(){return{schemaVersion:De,settings:{language:null,onboardingCompletedAt:null,name:``,nameSetAt:null,goals:[],condition:null,cycleTracking:null,reminder:{enabled:!1,time:`20:00`},theme:`system`,reduceMotion:!1,demoSeededAt:null,consent:null,autoLockMinutes:1},medications:[],medicationIntakes:[],episodes:[],symptomLogs:[],sleepLogs:[],cycleEntries:[],customSymptoms:[],customTriggers:[]}}function ke(e){let t=Oe();return e?{...t,...e,schemaVersion:De,settings:{...t.settings,...e.settings}}:t}var N=Oe();function Ae(e){N=ke(e)}function je(){N=Oe()}function P(){le(N)}var Me=()=>globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,Ne=()=>new Date().toISOString();function Pe(e){let t=Ne();return{id:Me(),createdAt:t,updatedAt:t,...e}}var Fe=e=>(t,n)=>n[e].localeCompare(t[e]),F=()=>N.settings;function Ie(e){N.settings={...N.settings,...e},P()}var Le=()=>!!N.settings.onboardingCompletedAt;function Re(){Ie({onboardingCompletedAt:Ne()})}var ze=()=>N.medications,Be=e=>N.medications.find(t=>t.id===e)??null;function Ve({name:e=``,type:t,dose:n=``,frequency:r=``,note:i=``,startDate:a=null,endDate:o=null}){return{name:String(e).trim(),type:t===`acute`?`acute`:`preventive`,dose:String(n).trim(),frequency:String(r).trim(),note:String(i).trim(),startDate:a||null,endDate:o||null}}function He(e){let t=Pe(Ve(e));return N.medications.push(t),P(),t}function Ue(e,t){let n=Be(e);return n?(Object.assign(n,Ve({...n,...t}),{updatedAt:Ne()}),P(),n):null}function We(e){let t={medication:Be(e),intakes:N.medicationIntakes.filter(t=>t.medicationId===e)};return N.medications=N.medications.filter(t=>t.id!==e),N.medicationIntakes=N.medicationIntakes.filter(t=>t.medicationId!==e),P(),t}function Ge(e){e?.medication&&!Be(e.medication.id)&&(N.medications.push(e.medication),N.medicationIntakes.push(...e.intakes),P())}function Ke(e){return N.medicationIntakes.filter(t=>!e||t.medicationId===e).sort(Fe(`takenAt`))}var qe=e=>N.medicationIntakes.find(t=>t.id===e)??null;function Je(e){return N.episodes.find(t=>t.startedAt<=e&&(!t.endedAt||t.endedAt>=e))??null}function Ye({medicationId:e,takenAt:t,dose:n=``,effect:r=null,note:i=``}){return{medicationId:e,takenAt:t,dose:String(n).trim(),effect:r||null,note:String(i).trim(),episodeId:Je(t)?.id??null}}function Xe(e){let t=Pe(Ye(e));return N.medicationIntakes.push(t),P(),t}function Ze(e,t){let n=qe(e);return n?(Object.assign(n,Ye({...n,...t}),{updatedAt:Ne()}),P(),n):null}function Qe(e){let t=qe(e);return N.medicationIntakes=N.medicationIntakes.filter(t=>t.id!==e),P(),t}function $e(e){e&&!qe(e.id)&&(N.medicationIntakes.push(e),P())}var et=e=>N.symptomLogs.find(t=>t.id===e)??null,tt=e=>N.symptomLogs.filter(t=>t.episodeId===e).sort(Fe(`occurredAt`));function nt({id:e,occurredAt:t,symptoms:n,vertigoType:r=null,duration:i=null,note:a=``,episodeId:o=null}){let s={occurredAt:t,symptoms:n.map(({key:e,intensity:t})=>({key:e,intensity:t??null})),vertigoType:n.some(e=>e.key===`vertigo`)?r:null,duration:i,note:String(a).trim(),episodeId:o},c=e?et(e):null;if(c)return Object.assign(c,s,{updatedAt:Ne()}),P(),c;let l=Pe(s);return N.symptomLogs.push(l),P(),l}function rt(e){let t=et(e);return N.symptomLogs=N.symptomLogs.filter(t=>t.id!==e),P(),t}function it(e){e&&!et(e.id)&&(N.symptomLogs.push(e),P())}function at(e){let t=e.symptoms.map(e=>e.intensity).filter(e=>e!=null);return t.length?Math.max(...t):null}var ot=()=>N.customSymptoms,st=e=>N.customSymptoms.find(t=>t.key===e)??null;function ct(e){let t=String(e).trim().slice(0,40);if(!t)return null;let n=N.customSymptoms.find(e=>e.label.toLocaleLowerCase()===t.toLocaleLowerCase());if(n)return n;let r={key:`custom:${Me()}`,label:t,createdAt:Ne()};return N.customSymptoms.push(r),P(),r}var lt=e=>N.episodes.find(t=>t.id===e)??null;function ut(){return N.episodes.filter(e=>!e.endedAt).sort(Fe(`startedAt`))[0]??null}function dt(){let e=Pe({startedAt:Ne(),endedAt:null,type:null,intensity:null,symptoms:[],vertigoTypes:[],triggers:[],medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``});return N.episodes.push(e),P(),e}function ft(e,t){let n=lt(e);return n?(Object.assign(n,t,{updatedAt:Ne()}),P(),n):null}var pt=e=>ft(e,{endedAt:Ne()}),mt=e=>ft(e,{endedAt:null});function ht(e){let t=lt(e);return N.episodes=N.episodes.filter(t=>t.id!==e),P(),t}function gt(e){e&&!lt(e.id)&&(N.episodes.push(e),P())}var _t=e=>N.cycleEntries.some(t=>t.date===e&&t.type===`period`);function vt(e){return _t(e)?N.cycleEntries=N.cycleEntries.filter(t=>t.date!==e||t.type!==`period`):N.cycleEntries.push({id:Me(),date:e,type:`period`,createdAt:Ne()}),P(),_t(e)}var yt=e=>N.sleepLogs.find(t=>t.date===e)??null;function bt({date:e,minutes:t,quality:n=null,note:r=``}){let i={date:e,minutes:Math.max(0,Math.round(t)),quality:n||null,note:String(r).trim(),source:`manual`},a=yt(e);if(a)return Object.assign(a,i,{updatedAt:Ne()}),P(),a;let o=Pe({...i,bedtime:null,wakeTime:null,externalId:null});return N.sleepLogs.push(o),P(),o}function xt(e){let t=yt(e);return N.sleepLogs=N.sleepLogs.filter(t=>t.date!==e),P(),t}function St(e){e&&!yt(e.date)&&(N.sleepLogs.push(e),P())}var Ct=()=>N;function wt(e){return{episodes:N.episodes.filter(t=>M(t.startedAt)===e).sort(Fe(`startedAt`)),symptomLogs:N.symptomLogs.filter(t=>M(t.occurredAt)===e).sort(Fe(`occurredAt`)),intakes:N.medicationIntakes.filter(t=>M(t.takenAt)===e).sort(Fe(`takenAt`)),sleep:yt(e),period:_t(e)}}function Tt(e=new Date){let t=wt(M(e)),n=ut();return n&&!t.episodes.includes(n)&&t.episodes.unshift(n),t}var Et=[`medications`,`episodes`,`symptomLogs`,`medicationIntakes`,`sleepLogs`,`cycleEntries`],Dt=e=>String(e.id).startsWith(`demo-`);function Ot(){N.settings.name!==`Simona`||N.settings.nameSetAt||(N.settings={...N.settings,name:``},P())}function kt({records:e}){for(let t of Et)N[t]=[...N[t].filter(e=>!Dt(e)),...e[t]];N.settings={...N.settings,demoSeededAt:M()},Ot(),P()}function At(){ge(),N=Oe()}var jt=class{constructor(e){this.value=e}toString(){return this.value}},Mt={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Nt=e=>String(e).replace(/[&<>"']/g,e=>Mt[e]),Pt=e=>new jt(String(e??``));function Ft(e){return e==null||e===!1||e===!0?``:e instanceof jt?e.value:Array.isArray(e)?e.map(Ft).join(``):Nt(e)}function I(e,...t){let n=e[0];for(let r=0;r<t.length;r++)n+=Ft(t[r])+e[r+1];return new jt(n)}var It={activity:`
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
`},Lt=Object.keys(It);function L(e,{size:t=24,label:n,strokeWidth:r=1.75}={}){let i=It[e];if(!i)return console.warn(`[icons] Neznáma ikona: ${e}`),Pt(``);let a=n?`role="img" aria-label="${Nt(n)}"`:`aria-hidden="true" focusable="false"`;return Pt(i.trim().replace(`<svg`,`<svg ${a}`).replace(`class="lucide`,`class="icon lucide`).replace(`width="24"`,`width="${t}"`).replace(`height="24"`,`height="${t}"`).replace(`stroke-width="2"`,`stroke-width="${r}"`))}var Rt={sk:{app:{name:`Vestibulárna migréna`,logo:`Vestibulárna migréna – logo`},common:{continue:`Pokračovať`,skip:`Preskočiť`,back:`Späť`,save:`Uložiť`,cancel:`Zrušiť`,close:`Zavrieť`,yes:`Áno`,undo:`Vrátiť`,optional:`nepovinné`,on:`Zapnuté`,off:`Vypnuté`,stepOf:`Krok {step} z {total}`,edit:`Upraviť`,delete:`Vymazať`},language:{title:`Vyber si jazyk`,sk:`Slovenčina`,en:`English`},welcome:{title:`Vitaj v aplikácii Vestibulárna migréna`,text:`Zaznamenávaj svoje symptómy, hľadaj možné súvislosti a maj prehľad pre svojho lekára.`,cta:`Začať`},goals:{title:`S čím ti môže aplikácia pomôcť?`,lead:`Vyber, čo je pre teba dôležité. Môžeš zvoliť viac možností alebo pokračovať bez výberu.`,options:{symptoms:`Sledovať moje symptómy`,triggers:`Zaznamenávať možné spúšťače`,patterns:`Vidieť vzorce v čase`,doctor:`Pripraviť informácie pre môjho lekára`,tips:`Získať užitočné tipy a informácie`}},condition:{title:`Čo chceš sledovať?`,lead:`Výber slúži len na prispôsobenie obsahu, nejde o diagnózu. Môžeš ho kedykoľvek zmeniť.`,options:{vestibular_migraine:`Vestibulárna migréna`,migraine:`Migréna`,other_vestibular:`Iné vestibulárne ochorenie`,unsure:`Nie som si istý/istá`}},cycle:{title:`Chceš sledovať menštruačný cyklus?`,lead:`Táto funkcia je voliteľná. Neskôr ju môžeš zapnúť alebo vypnúť v nastaveniach.`,yes:`Áno`,no:`Nie`},medications:{title:`Chceš pridať svoje lieky?`,lead:`Môžeš pridať lieky, ktoré užívaš preventívne alebo pri akútnych ťažkostiach. Tento krok môžeš vynechať a lieky pridať neskôr.`,add:`Pridať lieky`,addAnother:`Pridať ďalší liek`,added:`Pridané lieky`,remove:`Odstrániť liek {name}`,disclaimer:`Aplikácia neodporúča dávkovanie ani nemení tvoju liečbu.`,types:{preventive:`Preventívny`,acute:`Akútny`}},medForm:{title:`Nový liek`,name:`Názov lieku`,namePlaceholder:`napr. Betahistín`,nameRequired:`Zadaj názov lieku.`,type:`Typ lieku`,dose:`Dávka`,dosePlaceholder:`napr. 24 mg`,frequency:`Frekvencia`,frequencyPlaceholder:`napr. 2× denne`,note:`Poznámka`,submit:`Uložiť liek`,saved:`Liek {name} bol pridaný`},reminders:{title:`Chceš si nastaviť pripomienku?`,lead:`Jemná denná pripomienka ti môže pomôcť nezabudnúť zaznamenať svoje symptómy.`,yes:`Áno`,no:`Nie, zatiaľ nie`,time:`Kedy ti ju máme pripomenúť?`,permission:`Telefón ťa potom požiada o povolenie posielať upozornenia. Pripomienku môžeš kedykoľvek vypnúť v profile.`},today:{greeting:`Ahoj`,greetingName:`Ahoj, {name}`,howAreYou:`Ako sa dnes cítiš?`,noEntries:`Dnes zatiaľ nemáš zaznamenané žiadne príznaky.`,loggedToday:`Dnes zaznamenané`,addSymptom:`Pridať príznak`,startEpisode:`Spustiť epizódu`,overview:`Dnes`,sleep:`Spánok`,symptoms:`Príznaky`,meds:`Lieky`,nothingYet:`Zatiaľ nič`,entries:`Dnešné záznamy`,entriesEmpty:`Keď niečo zaznamenáš, nájdeš to tu.`,symptomsToday:`Dnes zaznamenané príznaky`,intakeTitle:`Liek`,episodeOverline:`Epizóda`,episodeStart:`Spustiť`},episode:{title:`Epizóda`,ongoing:`Prebieha epizóda`,statusOngoing:`Prebieha`,statusEnded:`Ukončená`,started:`Epizóda bola spustená`,startedAt:`Začiatok`,endedAt:`Koniec`,duration:`Trvanie`,since:`od {time}`,lasting:`trvá {duration}`,detailsLater:`Podrobnosti môžeš doplniť teraz alebo kedykoľvek neskôr. Epizóda zostane uložená, aj keď aplikáciu zavrieš.`,addDetails:`Pridať podrobnosti`,finishLater:`Dokončiť neskôr`,end:`Ukončiť epizódu`,endedToast:`Epizóda bola ukončená`,mistake:`Spustená omylom?`,cancel:`Zrušiť epizódu`,cancelledToast:`Epizóda bola zrušená`,delete:`Vymazať epizódu`,deleteTitle:`Vymazať epizódu?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Epizóda bola vymazaná`,notFound:`Táto epizóda už neexistuje.`,linkedSymptoms:`Príznaky zaznamenané počas epizódy`,linkedIntakes:`Lieky užité počas epizódy`},duration:{underMinute:`menej ako minúta`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Hlavná navigácia`,today:`Domov`,calendar:`Kalendár`,insights:`Prehľady`,treatment:`Liečba`,profile:`Profil`},comingSoon:{title:`Pripravujeme`,text:`Túto časť dokončíme v ďalšom kroku vývoja.`,toast:`Túto funkciu pripravujeme`},profile:{title:`Profil`,me:`Môj profil`,name:`Meno`,namePlaceholder:`Nepovinné`,nameHint:`Použijeme ho iba na pozdrav na domovskej obrazovke.`,language:`Jazyk`,tracking:`Sledovanie`,cycle:`Menštruačný cyklus`,reminders:`Denná pripomienka`,reminderTime:`Čas pripomienky`,display:`Zobrazenie`,reduceMotion:`Obmedziť animácie`,reduceMotionHint:`Vhodné pri citlivosti na pohyb. Ak máš obmedzenie pohybu zapnuté v telefóne, animácie sú vypnuté automaticky.`,privacy:`Súkromie`,deleteAll:`Vymazať všetky dáta`,deleteAllTitle:`Vymazať všetky dáta?`,deleteAllText:`Odstránia sa všetky záznamy, lieky a nastavenia v tomto zariadení. Túto akciu nie je možné vrátiť.`,deleteAllConfirm:`Áno, vymazať`,dev:`Pre vývoj`,styleguide:`Dizajn systém`,saved:`Uložené`,disclaimer:`Aplikácia slúži na osobné zaznamenávanie. Neposkytuje diagnózu ani liečbu a nenahrádza konzultáciu s lekárom.`,integrations:`Prepojenia`,health:`Smart hodinky a zdravotné údaje`,healthHint:`Synchronizácia spánku a ďalších údajov cez Apple Health (iPhone) a Health Connect (Android) pribudne v mobilnej aplikácii.`,comingSoon:`Pripravujeme`,demoReset:`Obnoviť ukážkové dáta`,demoResetTitle:`Obnoviť ukážkové dáta?`,demoResetText:`Ukážkové záznamy za posledných 8 týždňov sa vrátia do pôvodného stavu. Tvoje vlastné záznamy zostanú.`,demoResetConfirm:`Obnoviť`,demoResetDone:`Ukážkové dáta sú obnovené`,onboardingAgain:`Prejsť úvodom znova`,demoNote:`Náhľad obsahuje ukážkové dáta, aby bolo vidieť, ako appka vyzerá po niekoľkých týždňoch používania.`,logout:`Odhlásiť sa`,logoutNoPinTitle:`Najprv si nastav PIN`,logoutNoPinText:`Bez PIN-u by sa do appky po odhlásení dostal ktokoľvek s tvojím telefónom. Nastav si PIN a potom sa môžeš odhlásiť.`,logoutNoPinConfirm:`Nastaviť PIN`,appearance:`Vzhľad`,themes:{light:`Svetlý`,dark:`Tmavý`,system:`Automaticky`}},symptoms:{vertigo:`Závrat / vertigo`,rocking:`Hojdanie / kolísanie`,floating:`Pocit vznášania`,unsteadiness:`Nestabilita / neistota pri chôdzi`,nausea:`Nevoľnosť`,vomiting:`Vracanie`,light_sensitivity:`Citlivosť na svetlo`,sound_sensitivity:`Citlivosť na zvuk`,visual_sensitivity:`Vizuálna citlivosť`,tinnitus:`Tinnitus / pískanie v ušiach`,ear_pressure:`Tlak v uchu`,headache:`Bolesť hlavy`,brain_fog:`Mozgová hmla`,fatigue:`Únava`,unknown:`Neznámy príznak`},vertigoTypes:{rotational:`Rotačný (točenie sa)`,rocking:`Hojdanie (ako na lodi)`,swaying:`Kývanie`,floating:`Vznášanie (ako na oblakoch)`,unsteady:`Nestabilita`,lightheaded:`Ľahká závrať, točenie hlavy`,other:`Iný typ`,unsure:`Neviem presne`},durations:{just_started:`Práve začali`,under_1h:`Menej ako 1 hodinu`,"1_3h":`1–3 hodiny`,"3_6h":`3–6 hodín`,"6_12h":`6–12 hodín`,over_12h:`Viac ako 12 hodín`,ongoing:`Stále pretrvávajú`},triggers:{poor_sleep:`Nekvalitný / krátky spánok`,stress:`Stres`,skipped_meal:`Vynechané jedlo`,dehydration:`Dehydratácia`,caffeine:`Kofeín`,alcohol:`Alkohol`,exertion:`Fyzická námaha`,illness:`Choroba / infekcia`,visual_stimulation:`Vizuálna stimulácia`,screen_time:`Dlhý čas pred obrazovkou`,weather_change:`Zmena počasia`,menstrual_cycle:`Menštruačný cyklus`,travel:`Cestovanie / pohyb`,other:`Iné`},effects:{helped:`Pomohlo`,partly:`Čiastočne`,not_helped:`Nepomohlo`,unknown:`Neviem`},intensity:{none:`žiadna`,mild:`mierna`,moderate:`stredná`,severe:`silná`,notSet:`Nezadané`,value:`{value} – {level}`,highest:`najvyššia intenzita {value}`},log:{symptomsTitle:`Aké príznaky zaznamenávaš?`,symptomsLead:`Vyber jeden alebo viac príznakov.`,search:`Hľadať príznak`,noMatch:`Žiadny príznak nezodpovedá hľadaniu. Môžeš pridať vlastný.`,custom:`Vlastný príznak`,customPlaceholder:`Napíš názov príznaku`,customAdd:`Pridať`,continueCount:`Pokračovať ({n})`,intensityTitle:`Aká silná je intenzita?`,intensityLead:`0 = žiadna, 10 = najhoršia. Ktorýkoľvek príznak môžeš vynechať.`,clear:`Vynechať`,vertigoTitle:`Aký typ závratu pociťuješ?`,vertigoLead:`Vyber ten, ktorý sa najviac podobá. Môžeš aj preskočiť.`,detailsTitle:`Ako dlho tieto príznaky trvajú?`,detailsLead:`Všetko na tejto obrazovke je nepovinné.`,when:`Kedy začali`,date:`Dátum`,time:`Čas`,note:`Poznámka`,linkEpisode:`Priradiť k prebiehajúcej epizóde`,save:`Uložiť záznam`,saved:`Záznam bol uložený`},symptomLog:{title:`Príznaky`,vertigoType:`Typ závratu`,duration:`Trvanie`,note:`Poznámka`,episode:`Súčasť epizódy`,openEpisode:`Otvoriť epizódu`,edit:`Upraviť záznam`,delete:`Vymazať záznam`,deleteTitle:`Vymazať záznam?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam bol vymazaný`,notFound:`Tento záznam už neexistuje.`},treatment:{title:`Liečba`,lead:`Tvoje lieky, ich užívanie a ako ti podľa teba pomáhajú.`,preventive:`Preventívne`,acute:`Akútne`,add:`Pridať liek`,empty:`Zatiaľ nemáš pridané žiadne lieky.`,noneOfType:`Žiadne lieky v tejto skupine.`,lastTaken:`Naposledy {when}`,neverTaken:`Zatiaľ bez záznamu užitia`,disclaimer:`Aplikácia nepredpisuje lieky ani nenavrhuje zmenu dávkovania. O liečbe sa rozhoduj so svojím lekárom.`,type:`Typ`,dose:`Dávka`,frequency:`Frekvencia`,startDate:`Začiatok užívania`,endDate:`Koniec užívania`,note:`Poznámka`,logIntake:`Zaznamenať užitie`,history:`História užitia`,historyEmpty:`Zatiaľ tu nie je žiadne užitie.`,taken:`Užité`,effectSummary:`Účinok podľa teba`,edit:`Upraviť liek`,delete:`Odstrániť liek`,deleteTitle:`Odstrániť liek?`,deleteText:`Odstráni sa liek aj celá história jeho užitia.`,deletedToast:`Liek bol odstránený`,notFound:`Tento liek už neexistuje.`,inEpisode:`počas epizódy`,effectMissing:`účinok nezadaný`,showAll:`Zobraziť celú históriu ({n})`},intake:{title:`Užitie lieku`,editTitle:`Upraviť užitie`,date:`Dátum`,time:`Čas`,dose:`Dávka`,effect:`Pomohlo to?`,effectHint:`Ak ešte nevieš, doplň to neskôr.`,note:`Poznámka`,save:`Uložiť užitie`,saved:`Užitie bolo uložené`,delete:`Vymazať užitie`,deleteTitle:`Vymazať užitie?`,deleteText:`Záznam o užití sa natrvalo odstráni.`,deletedToast:`Užitie bolo vymazané`,notFound:`Tento záznam už neexistuje.`},calendar:{title:`Kalendár`,prev:`Predchádzajúci mesiac`,next:`Nasledujúci mesiac`,backToday:`Dnes`,legend:`Vysvetlivky`,legendLevels:`Bodky = najvyššia intenzita dňa: 1 mierna, 2 stredná, 3 silná`,legendNoIntensity:`Krúžok = záznam bez intenzity`,legendPeriod:`Čiarka = menštruácia`,dayEmpty:`V tento deň nemáš žiadne záznamy.`,addSymptom:`Pridať príznak`,period:`Menštruácia`,periodMark:`Zaznamenať menštruáciu v tento deň`,summaryEntries:`počet záznamov {n}`,summaryPeriod:`menštruácia`,summaryNone:`bez záznamov`,selected:`vybraný deň`,today:`dnes`},insights:{title:`Prehľady`,periodLabel:`Obdobie`,empty:`Pokračuj v zaznamenávaní, aby sa tu postupne zobrazil prehľad.`,overview:`Prehľad obdobia`,symptomDays:`Dni so symptómami`,episodes:`Epizódy`,avgIntensity:`Priemerná intenzita`,avgDuration:`Priemerné trvanie epizódy`,noValue:`nezadané`,topSymptoms:`Najčastejšie príznaky`,topSymptomsLead:`Počet záznamov, v ktorých sa príznak objavil.`,topTriggers:`Najčastejšie možné spúšťače`,triggersEmpty:`Zatiaľ tu nie sú žiadne možné spúšťače. Pribudnú s podrobnosťami epizódy.`,meds:`Lieky`,medsEmpty:`V tomto období nie je zaznamenané žiadne užitie lieku.`,interpretation:`Zaznamenaná súvislosť nie je dôkazom príčiny. Prehľad počíta iba so zadanými údajmi.`,report:`Vytvoriť report pre lekára`},report:{title:`Report pre lekára`,lead:`Vyber obdobie. Report zhrnie tvoje záznamy do prehľadu, ktorý môžeš ukázať lekárovi.`,custom:`Vlastné obdobie`,from:`Od`,to:`Do`,create:`Vytvoriť report`,invalidRange:`Dátum „Od“ musí byť skôr alebo v ten istý deň ako „Do“.`,docTitle:`Zaznamenané príznaky a liečba`,period:`Obdobie`,created:`Vytvorené`,disclaimer:`Údaje zaznamenal používateľ v aplikácii Vestibulárna migréna. Nejde o diagnózu ani lekársky záznam.`,fewData:`V tomto období je zaznamenaných málo údajov, prehľad nemusí byť reprezentatívny.`,summary:`Súhrn`,symptoms:`Najčastejšie príznaky`,vertigoTypes:`Typy závratu`,triggers:`Zaznamenané možné spúšťače`,meds:`Lieky a účinok podľa používateľa`,sleep:`Spánok`,sleepNone:`V tomto období nebol zaznamenaný spánok.`,cycle:`Menštruačný cyklus`,cycleDays:`Zaznamenané dni menštruácie`,notes:`Poznámky`,timeline:`Časová os`,colDate:`Dátum a čas`,colEntry:`Záznam`,colDetail:`Podrobnosti`,none:`Bez záznamov.`,print:`Uložiť ako PDF`,printHint:`V okne tlače zvoľ „Uložiť ako PDF“.`,sleepQuality:`Kvalita spánku`},sleep:{title:`Spánok`,formTitle:`Ako sa ti spalo?`,lead:`Zaznamenaj dĺžku spánku. Kvalitu a poznámku môžeš vynechať.`,date:`Deň prebudenia`,duration:`Dĺžka spánku`,hours:`Hodiny`,minutes:`Minúty`,durationRequired:`Zadaj dĺžku spánku.`,quality:`Kvalita spánku`,qualities:{good:`Dobrá`,fair:`Priemerná`,poor:`Zlá`},note:`Poznámka`,save:`Uložiť spánok`,saved:`Spánok bol uložený`,add:`Zaznamenať spánok`,entry:`Spánok {duration}`,delete:`Vymazať záznam spánku`,deleteTitle:`Vymazať záznam spánku?`,deleteText:`Záznam sa natrvalo odstráni z tohto zariadenia.`,deletedToast:`Záznam spánku bol vymazaný`,avg:`Priemerný spánok`,nights:`Zaznamenané noci`},consent:{title:`Tvoje údaje zostávajú v tvojom telefóne`,lead:`Skôr než začneš, pozri sa, ako s tvojimi údajmi zaobchádzame.`,factDevice:`Záznamy o zdraví sa ukladajú iba v tomto telefóne.`,factNoServer:`Appka nemá účet na internete, nič neodosiela a nepoužíva reklamy ani analytické nástroje.`,factPin:`Prihlasovať sa budeš PIN kódom a tvoje údaje budú zašifrované.`,factControl:`Údaje môžeš kedykoľvek exportovať do súboru alebo natrvalo vymazať.`,health:`Súhlasím so spracovaním mojich údajov o zdraví v tomto telefóne na účely osobného sledovania.`,age:`Mám aspoň 16 rokov.`,policyLink:`Prečítať zásady ochrany súkromia`,submit:`Súhlasím a pokračujem`},privacyPolicy:{title:`Zásady ochrany súkromia`,draft:`Návrh`,version:`Verzia {version}`,draftNote:`Pracovný návrh na pripomienkovanie. Pred vydaním ho skontroluje právnik a doplnia sa údaje prevádzkovateľa.`,controllerTitle:`Kto je prevádzkovateľ`,controllerText:`[Názov prevádzkovateľa, sídlo, IČO – doplniť]. Kontakt pre otázky o osobných údajoch: [e-mail – doplniť].`,dataTitle:`Aké údaje appka spracúva`,dataText:`Iba to, čo do nej zadáš: príznaky a ich intenzitu, epizódy, lieky a ich účinok, spánok, voliteľne menštruačný cyklus a meno na pozdrav. Ide o údaje o zdraví, preto ich chránime osobitne.`,storageTitle:`Kde sú tvoje údaje`,storageText:`Iba v tomto telefóne. Appka nemá server ani účet na internete, údaje nikam neodosiela a nepoužíva reklamné ani analytické nástroje. Prevádzkovateľ k tvojim údajom nemá prístup.`,purposeTitle:`Na čo slúžia`,purposeText:`Na tvoje osobné sledovanie ťažkostí a na prehľad alebo report, ktorý môžeš ukázať lekárovi. Report sa vytvorí v telefóne a ty rozhodneš, komu ho dáš.`,legalTitle:`Na akom základe`,legalText:`Na základe tvojho výslovného súhlasu so spracovaním údajov o zdraví (čl. 9 ods. 2 písm. a) GDPR). Súhlas môžeš kedykoľvek odvolať v Profile – údaje sa tým vymažú.`,rightsTitle:`Tvoje práva`,rightsText:`Údaje si môžeš kedykoľvek pozrieť, upraviť, exportovať do súboru alebo natrvalo vymazať priamo v appke (Profil → Súkromie). Máš aj právo podať sťažnosť na Úrad na ochranu osobných údajov SR.`,securityTitle:`Zabezpečenie`,securityText:`Do appky sa prihlasuješ 6-miestnym PIN-om. Kým je PIN zapnutý, všetky údaje v telefóne sú zašifrované (AES-256) a bez neho sa k nim nedá dostať. Ak PIN zabudneš, údaje nie je možné obnoviť.`,backupTitle:`Zálohovanie`,backupText:`Keďže údaje sú iba v telefóne, pri strate alebo výmene telefónu sa stratia, ak si ich predtým neexportuješ.`,ageTitle:`Vek`,ageText:`Appka je určená pre ľudí od 16 rokov.`,changesTitle:`Zmeny zásad`,changesText:`O zmenách týchto zásad ťa upozorníme priamo v appke.`},profileSetup:{title:`Vytvor si profil`,lead:`Profil existuje iba v tomto telefóne – bez e-mailu a hesla na internete. Prihlasovať sa budeš PIN kódom.`,pinTitle:`Prihlasovací PIN`,pinText:`V ďalšom kroku si nastavíš 6-miestny PIN. Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne.`,nameLabel:`Ako ťa máme oslovovať?`,namePlaceholder:`Tvoje meno`,nameHint:`Nepovinné. Uvidíš ho v pozdrave na domovskej obrazovke.`,pinAlready:`PIN už máš nastavený. Zmeniť ho môžeš v Profile → Zabezpečenie.`},pin:{progress:`Zadané {n} z {total} číslic`,keypad:`Klávesnica na PIN`,delete:`Zmazať číslicu`,prompt:{current:`Zadaj svoj súčasný PIN`,new:`Zvoľ si 6-miestny PIN`,confirm:`Zopakuj PIN pre kontrolu`},title:{set:`Nastav si prihlasovací PIN`,change:`Zmena PIN-u`,disable:`Vypnutie PIN-u`},setLead:`Budeš sa ním prihlasovať a zároveň zašifruje tvoje údaje v telefóne. Ak ho zabudneš, údaje nie je možné obnoviť – nikto iný k nim nemá prístup.`,checking:`Overujem…`,wrong:`Nesprávny PIN. Skús to znova.`,blocked:`Príliš veľa nesprávnych pokusov. Skús to znova o {time}.`,weak:`Tento PIN sa dá ľahko uhádnuť. Zvoľ iný.`,mismatch:`PIN-y sa nezhodujú. Zvoľ si PIN znova.`,saving:`Šifrujem údaje…`,enabled:`PIN je nastavený, údaje sú zašifrované`,changed:`PIN bol zmenený`,disabled:`PIN je vypnutý`,blockedSeconds:`Príliš veľa nesprávnych pokusov. Skús to znova o {n} s.`},lock:{title:`Prihlás sa`,lead:`Zadaj svoj PIN`,forgot:`Zabudnutý PIN?`,forgotTitle:`Zabudnutý PIN`,forgotText:`PIN nie je možné obnoviť – tvoje údaje sú zašifrované iba v tomto telefóne a nikto iný k nim nemá kľúč. Môžeš ich iba vymazať a začať odznova.`,forgotConfirm:`Vymazať všetko a začať odznova`},security:{title:`Zabezpečenie`,pin:`Prihlasovanie PIN-om`,pinOnHint:`Údaje sú v telefóne zašifrované. Bez PIN-u sa k nim nedá dostať.`,pinOffHint:`Bez PIN-u sa do appky dostane ktokoľvek s tvojím telefónom a údaje nie sú zašifrované.`,changePin:`Zmeniť PIN`,autoLock:`Automaticky odhlásiť`,autoLockOptions:{m0:`Hneď po odchode z appky`,m1:`Po 1 minúte`,m5:`Po 5 minútach`,m15:`Po 15 minútach`},biometrics:`Odomykanie tvárou alebo odtlačkom`,biometricsHint:`Dostupné v mobilnej aplikácii.`},privacy:{deviceOnly:`Údaje sú iba v tomto telefóne`,deviceOnlyHint:`Appka nič neodosiela na internet a nemá k nim prístup nikto iný.`,export:`Exportovať moje údaje`,exportHint:`Stiahne všetky záznamy do súboru (JSON).`,exportDone:`Súbor s údajmi je pripravený`,consent:`Súhlas so spracovaním údajov`,consentGiven:`Udelený {date}`,withdraw:`Odvolať súhlas`,withdrawTitle:`Odvolať súhlas?`,withdrawText:`Bez súhlasu appka nemôže uchovávať tvoje údaje o zdraví. Odvolaním sa natrvalo vymažú všetky údaje v tomto telefóne.`,withdrawConfirm:`Odvolať a vymazať údaje`},plural:{entries:{one:`{n} záznam`,few:`{n} záznamy`,other:`{n} záznamov`},times:{other:`{n}×`},days:{one:`{n} deň`,few:`{n} dni`,other:`{n} dní`},episodes:{one:`{n} epizóda`,few:`{n} epizódy`,other:`{n} epizód`}}},en:{app:{name:`Vestibular Migraine`,logo:`Vestibular Migraine – logo`},common:{continue:`Continue`,skip:`Skip`,back:`Back`,save:`Save`,cancel:`Cancel`,close:`Close`,yes:`Yes`,undo:`Undo`,optional:`optional`,on:`On`,off:`Off`,stepOf:`Step {step} of {total}`,edit:`Edit`,delete:`Delete`},language:{title:`Choose your language`,sk:`Slovenčina`,en:`English`},welcome:{title:`Welcome to Vestibular Migraine`,text:`Track your symptoms, explore possible patterns and prepare useful information for your doctor.`,cta:`Get started`},goals:{title:`What can the app help you with?`,lead:`Choose what matters to you. You can pick several options or continue without choosing.`,options:{symptoms:`Track my symptoms`,triggers:`Log possible triggers`,patterns:`See patterns over time`,doctor:`Prepare information for my doctor`,tips:`Get useful tips and information`}},condition:{title:`What would you like to track?`,lead:`This only tailors the content – it is not a diagnosis. You can change it at any time.`,options:{vestibular_migraine:`Vestibular migraine`,migraine:`Migraine`,other_vestibular:`Other vestibular condition`,unsure:`I'm not sure`}},cycle:{title:`Would you like to track your menstrual cycle?`,lead:`This feature is optional. You can turn it on or off later in settings.`,yes:`Yes`,no:`No`},medications:{title:`Would you like to add your medications?`,lead:`You can add medications you take preventively or for acute symptoms. You can skip this and add them later.`,add:`Add medications`,addAnother:`Add another medication`,added:`Added medications`,remove:`Remove medication {name}`,disclaimer:`The app does not recommend doses or change your treatment.`,types:{preventive:`Preventive`,acute:`Acute`}},medForm:{title:`New medication`,name:`Medication name`,namePlaceholder:`e.g. Betahistine`,nameRequired:`Please enter the medication name.`,type:`Type`,dose:`Dose`,dosePlaceholder:`e.g. 24 mg`,frequency:`Frequency`,frequencyPlaceholder:`e.g. twice a day`,note:`Note`,submit:`Save medication`,saved:`{name} was added`},reminders:{title:`Would you like to set a reminder?`,lead:`A gentle daily reminder can help you remember to log your symptoms.`,yes:`Yes`,no:`No, not now`,time:`When should we remind you?`,permission:`Your phone will then ask for permission to send notifications. You can turn the reminder off in your profile at any time.`},today:{greeting:`Hello`,greetingName:`Hello, {name}`,howAreYou:`How are you feeling today?`,noEntries:`You haven't logged any symptoms today yet.`,loggedToday:`Logged today`,addSymptom:`Add symptom`,startEpisode:`Start episode`,overview:`Today`,sleep:`Sleep`,symptoms:`Symptoms`,meds:`Medications`,nothingYet:`Nothing yet`,entries:`Today's entries`,entriesEmpty:`Anything you log will show up here.`,symptomsToday:`Symptoms logged today`,intakeTitle:`Medication`,episodeOverline:`Episode`,episodeStart:`Start`},episode:{title:`Episode`,ongoing:`Episode in progress`,statusOngoing:`In progress`,statusEnded:`Ended`,started:`Episode started`,startedAt:`Started`,endedAt:`Ended`,duration:`Duration`,since:`since {time}`,lasting:`lasting {duration}`,detailsLater:`You can add details now or at any time later. The episode stays saved even if you close the app.`,addDetails:`Add details`,finishLater:`Finish later`,end:`End episode`,endedToast:`Episode ended`,mistake:`Started it by mistake?`,cancel:`Cancel episode`,cancelledToast:`Episode cancelled`,delete:`Delete episode`,deleteTitle:`Delete this episode?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Episode deleted`,notFound:`This episode no longer exists.`,linkedSymptoms:`Symptoms logged during the episode`,linkedIntakes:`Medications taken during the episode`},duration:{underMinute:`less than a minute`,minutes:`{m} min`,hours:`{h} h`,hoursMinutes:`{h} h {m} min`},nav:{label:`Main navigation`,today:`Today`,calendar:`Calendar`,insights:`Insights`,treatment:`Treatment`,profile:`Profile`},comingSoon:{title:`Coming soon`,text:`We will finish this section in the next development step.`,toast:`This feature is coming soon`},profile:{title:`Profile`,me:`My profile`,name:`Name`,namePlaceholder:`Optional`,nameHint:`Used only to greet you on the home screen.`,language:`Language`,tracking:`Tracking`,cycle:`Menstrual cycle`,reminders:`Daily reminder`,reminderTime:`Reminder time`,display:`Display`,reduceMotion:`Reduce animations`,reduceMotionHint:`Helpful if motion bothers you. If reduced motion is turned on in your phone settings, animations are already off.`,privacy:`Privacy`,deleteAll:`Delete all data`,deleteAllTitle:`Delete all data?`,deleteAllText:`All entries, medications and settings on this device will be removed. This cannot be undone.`,deleteAllConfirm:`Yes, delete`,dev:`For development`,styleguide:`Design system`,saved:`Saved`,disclaimer:`This app is for personal tracking. It does not provide a diagnosis or treatment and does not replace consulting a doctor.`,integrations:`Connections`,health:`Smartwatch and health data`,healthHint:`Syncing sleep and other data via Apple Health (iPhone) and Health Connect (Android) will come with the mobile app.`,comingSoon:`Coming soon`,demoReset:`Reset sample data`,demoResetTitle:`Reset sample data?`,demoResetText:`Sample entries for the last 8 weeks will be restored. Entries you added yourself will stay.`,demoResetConfirm:`Reset`,demoResetDone:`Sample data has been reset`,onboardingAgain:`Go through the intro again`,demoNote:`This preview contains sample data to show how the app looks after a few weeks of use.`,logout:`Sign out`,logoutNoPinTitle:`Set a PIN first`,logoutNoPinText:`Without a PIN, anyone with your phone could open the app after you sign out. Set a PIN and then you can sign out.`,logoutNoPinConfirm:`Set a PIN`,appearance:`Appearance`,themes:{light:`Light`,dark:`Dark`,system:`Automatic`}},symptoms:{vertigo:`Dizziness / vertigo`,rocking:`Rocking / swaying`,floating:`Floating sensation`,unsteadiness:`Unsteadiness when walking`,nausea:`Nausea`,vomiting:`Vomiting`,light_sensitivity:`Sensitivity to light`,sound_sensitivity:`Sensitivity to sound`,visual_sensitivity:`Visual sensitivity`,tinnitus:`Tinnitus / ringing in the ears`,ear_pressure:`Ear pressure`,headache:`Headache`,brain_fog:`Brain fog`,fatigue:`Fatigue`,unknown:`Unknown symptom`},vertigoTypes:{rotational:`Rotational (spinning)`,rocking:`Rocking (like on a boat)`,swaying:`Swaying`,floating:`Floating (like on clouds)`,unsteady:`Unsteadiness`,lightheaded:`Lightheadedness`,other:`Other type`,unsure:`Not sure`},durations:{just_started:`Just started`,under_1h:`Less than 1 hour`,"1_3h":`1–3 hours`,"3_6h":`3–6 hours`,"6_12h":`6–12 hours`,over_12h:`More than 12 hours`,ongoing:`Still ongoing`},triggers:{poor_sleep:`Poor / insufficient sleep`,stress:`Stress`,skipped_meal:`Skipped meal`,dehydration:`Dehydration`,caffeine:`Caffeine`,alcohol:`Alcohol`,exertion:`Physical exertion`,illness:`Illness / infection`,visual_stimulation:`Visual stimulation`,screen_time:`Extended screen time`,weather_change:`Weather change`,menstrual_cycle:`Menstrual cycle`,travel:`Travel / motion`,other:`Other`},effects:{helped:`Helped`,partly:`Partly`,not_helped:`Didn't help`,unknown:`Not sure`},intensity:{none:`none`,mild:`mild`,moderate:`moderate`,severe:`severe`,notSet:`Not set`,value:`{value} – {level}`,highest:`highest intensity {value}`},log:{symptomsTitle:`Which symptoms are you logging?`,symptomsLead:`Choose one or more symptoms.`,search:`Search symptoms`,noMatch:`No symptom matches your search. You can add your own.`,custom:`Custom symptom`,customPlaceholder:`Type the symptom name`,customAdd:`Add`,continueCount:`Continue ({n})`,intensityTitle:`How intense is it?`,intensityLead:`0 = none, 10 = worst. You can skip any symptom.`,clear:`Skip`,vertigoTitle:`What kind of dizziness do you feel?`,vertigoLead:`Choose the one that fits best. You can also skip this.`,detailsTitle:`How long have these symptoms lasted?`,detailsLead:`Everything on this screen is optional.`,when:`When they started`,date:`Date`,time:`Time`,note:`Note`,linkEpisode:`Add to the ongoing episode`,save:`Save entry`,saved:`Entry saved`},symptomLog:{title:`Symptoms`,vertigoType:`Type of dizziness`,duration:`Duration`,note:`Note`,episode:`Part of an episode`,openEpisode:`Open episode`,edit:`Edit entry`,delete:`Delete entry`,deleteTitle:`Delete this entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Entry deleted`,notFound:`This entry no longer exists.`},treatment:{title:`Treatment`,lead:`Your medications, when you take them and how they seem to help.`,preventive:`Preventive`,acute:`Acute`,add:`Add medication`,empty:`You haven't added any medications yet.`,noneOfType:`No medications in this group.`,lastTaken:`Last taken {when}`,neverTaken:`No intake logged yet`,disclaimer:`The app does not prescribe medications or suggest dose changes. Decide on treatment with your doctor.`,type:`Type`,dose:`Dose`,frequency:`Frequency`,startDate:`Started taking`,endDate:`Stopped taking`,note:`Note`,logIntake:`Log intake`,history:`Intake history`,historyEmpty:`You haven't logged any intake yet.`,taken:`Taken`,effectSummary:`Effect as you rated it`,edit:`Edit medication`,delete:`Remove medication`,deleteTitle:`Remove this medication?`,deleteText:`The medication and its whole intake history will be removed.`,deletedToast:`Medication removed`,notFound:`This medication no longer exists.`,inEpisode:`during an episode`,effectMissing:`effect not rated`,showAll:`Show full history ({n})`},intake:{title:`Medication intake`,editTitle:`Edit intake`,date:`Date`,time:`Time`,dose:`Dose`,effect:`Did it help?`,effectHint:`If you don't know yet, add it later.`,note:`Note`,save:`Save intake`,saved:`Intake saved`,delete:`Delete intake`,deleteTitle:`Delete this intake?`,deleteText:`The intake record will be permanently removed.`,deletedToast:`Intake deleted`,notFound:`This entry no longer exists.`},calendar:{title:`Calendar`,prev:`Previous month`,next:`Next month`,backToday:`Today`,legend:`Legend`,legendLevels:`Dots = highest intensity of the day: 1 mild, 2 moderate, 3 severe`,legendNoIntensity:`Ring = entry without intensity`,legendPeriod:`Bar = period`,dayEmpty:`You have no entries on this day.`,addSymptom:`Add symptom`,period:`Period`,periodMark:`Log period on this day`,summaryEntries:`{n} entries`,summaryPeriod:`period`,summaryNone:`no entries`,selected:`selected day`,today:`today`},insights:{title:`Insights`,periodLabel:`Period`,empty:`Keep logging and an overview will gradually appear here.`,overview:`Period overview`,symptomDays:`Days with symptoms`,episodes:`Episodes`,avgIntensity:`Average intensity`,avgDuration:`Average episode duration`,noValue:`not entered`,topSymptoms:`Most frequent symptoms`,topSymptomsLead:`Number of entries in which the symptom appeared.`,topTriggers:`Most frequent possible triggers`,triggersEmpty:`You haven't logged any possible triggers yet. They will come with episode details.`,meds:`Medications`,medsEmpty:`You didn't log any medication intake in this period.`,interpretation:`A recorded connection is not proof of a cause. The overview only uses data you entered.`,report:`Create a report for your doctor`},report:{title:`Report for your doctor`,lead:`Choose a period. The report summarises your entries so you can show them to your doctor.`,custom:`Custom period`,from:`From`,to:`To`,create:`Create report`,invalidRange:`The “From” date must be on or before the “To” date.`,docTitle:`Recorded symptoms and treatment`,period:`Period`,created:`Created`,disclaimer:`Data recorded by the user in the Vestibular Migraine app. This is not a diagnosis or a medical record.`,fewData:`Few entries were recorded in this period, so the overview may not be representative.`,summary:`Summary`,symptoms:`Most frequent symptoms`,vertigoTypes:`Types of dizziness`,triggers:`Recorded possible triggers`,meds:`Medications and effect as rated by the user`,sleep:`Sleep`,sleepNone:`No sleep was recorded in this period.`,cycle:`Menstrual cycle`,cycleDays:`Recorded period days`,notes:`Notes`,timeline:`Timeline`,colDate:`Date and time`,colEntry:`Entry`,colDetail:`Details`,none:`No entries.`,print:`Save as PDF`,printHint:`In the print window, choose “Save as PDF”.`,sleepQuality:`Sleep quality`},sleep:{title:`Sleep`,formTitle:`How did you sleep?`,lead:`Log how long you slept. Quality and a note are optional.`,date:`Day you woke up`,duration:`Sleep duration`,hours:`Hours`,minutes:`Minutes`,durationRequired:`Please enter how long you slept.`,quality:`Sleep quality`,qualities:{good:`Good`,fair:`Fair`,poor:`Poor`},note:`Note`,save:`Save sleep`,saved:`Sleep saved`,add:`Log sleep`,entry:`Sleep {duration}`,delete:`Delete sleep entry`,deleteTitle:`Delete this sleep entry?`,deleteText:`The entry will be permanently removed from this device.`,deletedToast:`Sleep entry deleted`,avg:`Average sleep`,nights:`Nights recorded`},consent:{title:`Your data stays on your phone`,lead:`Before you start, here is how we handle your data.`,factDevice:`Health entries are stored only on this phone.`,factNoServer:`The app has no online account, sends nothing anywhere and uses no ads or analytics.`,factPin:`You will sign in with a PIN and your data will be encrypted.`,factControl:`You can export your data to a file or delete it permanently at any time.`,health:`I agree to the processing of my health data on this phone for personal tracking.`,age:`I am at least 16 years old.`,policyLink:`Read the privacy policy`,submit:`Agree and continue`},privacyPolicy:{title:`Privacy policy`,draft:`Draft`,version:`Version {version}`,draftNote:`Working draft for review. Before release it will be checked by a lawyer and the controller details will be added.`,controllerTitle:`Who is the controller`,controllerText:`[Controller name, address, company ID – to be added]. Contact for personal data questions: [e-mail – to be added].`,dataTitle:`What data the app processes`,dataText:`Only what you enter yourself: symptoms and their intensity, episodes, medications and their effect, sleep, optionally your menstrual cycle and a name for the greeting. This is health data, so we protect it specially.`,storageTitle:`Where your data is`,storageText:`Only on this phone. The app has no server or online account, sends no data anywhere and uses no advertising or analytics tools. The controller has no access to your data.`,purposeTitle:`What it is for`,purposeText:`For your personal tracking and for an overview or report you can show your doctor. The report is created on the phone and you decide who gets it.`,legalTitle:`Legal basis`,legalText:`Your explicit consent to the processing of health data (Art. 9(2)(a) GDPR). You can withdraw it at any time in your Profile – your data will then be deleted.`,rightsTitle:`Your rights`,rightsText:`You can view, edit, export or permanently delete your data at any time in the app (Profile → Privacy). You also have the right to lodge a complaint with the data protection authority.`,securityTitle:`Security`,securityText:`You sign in to the app with a 6-digit PIN. While the PIN is on, all data on the phone is encrypted (AES-256) and cannot be accessed without it. If you forget the PIN, the data cannot be recovered.`,backupTitle:`Backup`,backupText:`Because your data is only on this phone, it will be lost if you lose or replace the phone without exporting it first.`,ageTitle:`Age`,ageText:`The app is intended for people aged 16 and over.`,changesTitle:`Changes to this policy`,changesText:`We will let you know about changes directly in the app.`},profileSetup:{title:`Create your profile`,lead:`Your profile exists only on this phone – no online e-mail or password. You will sign in with a PIN.`,pinTitle:`Sign-in PIN`,pinText:`In the next step you will set a 6-digit PIN. You will use it to sign in and it also encrypts your data on the phone.`,nameLabel:`What should we call you?`,namePlaceholder:`Your name`,nameHint:`Optional. You will see it in the greeting on the home screen.`,pinAlready:`You already have a PIN. You can change it in Profile → Security.`},pin:{progress:`{n} of {total} digits entered`,keypad:`PIN keypad`,delete:`Delete digit`,prompt:{current:`Enter your current PIN`,new:`Choose a 6-digit PIN`,confirm:`Enter the PIN again to confirm`},title:{set:`Set your sign-in PIN`,change:`Change PIN`,disable:`Turn off PIN`},setLead:`You will use it to sign in and it also encrypts your data on the phone. If you forget it, the data cannot be recovered – nobody else has access to it.`,checking:`Checking…`,wrong:`Wrong PIN. Please try again.`,blocked:`Too many wrong attempts. Try again at {time}.`,weak:`This PIN is easy to guess. Please choose another one.`,mismatch:`The PINs don't match. Please choose your PIN again.`,saving:`Encrypting your data…`,enabled:`PIN set, your data is encrypted`,changed:`PIN changed`,disabled:`PIN turned off`,blockedSeconds:`Too many wrong attempts. Try again in {n} s.`},lock:{title:`Sign in`,lead:`Enter your PIN`,forgot:`Forgot your PIN?`,forgotTitle:`Forgotten PIN`,forgotText:`The PIN cannot be recovered – your data is encrypted only on this phone and nobody else has the key. You can only delete it and start over.`,forgotConfirm:`Delete everything and start over`},security:{title:`Security`,pin:`Sign in with PIN`,pinOnHint:`Your data is encrypted on the phone and cannot be accessed without the PIN.`,pinOffHint:`Without a PIN, anyone with your phone can open the app and your data is not encrypted.`,changePin:`Change PIN`,autoLock:`Sign out automatically`,autoLockOptions:{m0:`Right after leaving the app`,m1:`After 1 minute`,m5:`After 5 minutes`,m15:`After 15 minutes`},biometrics:`Unlock with face or fingerprint`,biometricsHint:`Available in the mobile app.`},privacy:{deviceOnly:`Your data is only on this phone`,deviceOnlyHint:`The app sends nothing to the internet and nobody else can access it.`,export:`Export my data`,exportHint:`Downloads all entries to a file (JSON).`,exportDone:`Your data file is ready`,consent:`Consent to data processing`,consentGiven:`Given on {date}`,withdraw:`Withdraw consent`,withdrawTitle:`Withdraw consent?`,withdrawText:`Without consent the app cannot keep your health data. Withdrawing will permanently delete all data on this phone.`,withdrawConfirm:`Withdraw and delete data`},plural:{entries:{one:`{n} entry`,other:`{n} entries`},times:{other:`{n}×`},days:{one:`{n} day`,other:`{n} days`},episodes:{one:`{n} episode`,other:`{n} episodes`}}}},zt=[`sk`,`en`],Bt={sk:`sk-SK`,en:`en-GB`},Vt=`sk`;function Ht(e){Vt=Rt[e]?e:`sk`,document.documentElement.lang=Vt}var Ut=()=>Bt[Vt];function Wt(e,t){return t.split(`.`).reduce((e,t)=>e?.[t],e)}function Gt(e,t){return t?e.replace(/\{(\w+)\}/g,(e,n)=>t[n]??``):e}function Kt(e,t,n){let r=Wt(Rt[e],t)??Wt(Rt.sk,t);return typeof r==`string`?Gt(r,n):(console.warn(`[i18n] Chýba preklad: ${t}`),t)}var R=(e,t)=>Kt(Vt,e,t);function qt(e,t){let n=new Intl.PluralRules(Ut()).select(t),r=Wt(Rt[Vt],e)??{};return Gt(r[n]??r.other??e,{n:t})}var Jt=(e,t)=>t==null||t===!1?``:I` ${Pt(e)}="${t}"`,Yt=(e,t)=>t?Pt(` ${e}`):``;function Xt(e={}){return Pt(Object.entries(e).map(([e,t])=>` data-${e}="${Nt(t)}"`).join(``))}function z({header:e=``,body:t,footer:n=``,nav:r=``,variant:i=``,form:a=!1}){let o=I`
    ${e}
    <div class="screen__body">${t}</div>
    ${n?I`<div class="screen__footer">${n}</div>`:``}
    ${r}`;return a?I`<form class="screen ${i}" novalidate>${o}</form>`:I`<div class="screen ${i}">${o}</div>`}var Zt=(e,t)=>z({variant:`screen--tab`,body:t,nav:$t(e)});function B({back:e,backAction:t,step:n,total:r}={}){return I`
    <header class="screen__header">
      ${e||t?I`<button type="button" class="icon-btn" data-action="${t??`back`}"${Jt(`data-fallback`,e)} aria-label="${R(`common.back`)}">
            ${L(`chevronLeft`)}
          </button>`:I`<span class="topbar__spacer"></span>`}
      ${n?I`<div class="progress">
            <span class="visually-hidden">${R(`common.stepOf`,{step:n,total:r})}</span>
            ${Array.from({length:r},(e,t)=>I`<span class="progress__seg ${t<n?`is-done`:``}" aria-hidden="true"></span>`)}
          </div>`:I`<span class="progress"></span>`}
      <span class="topbar__spacer"></span>
    </header>`}var Qt=[{key:`today`,path:`/today`,icon:`home`},{key:`calendar`,path:`/calendar`,icon:`calendar`},{key:`insights`,path:`/insights`,icon:`chart`},{key:`treatment`,path:`/treatment`,icon:`pill`},{key:`profile`,path:`/profile`,icon:`user`}];function $t(e){return I`
    <nav class="tabbar" aria-label="${R(`nav.label`)}">
      ${Qt.map(t=>I`
          <a class="tabbar__item" href="#${t.path}" data-replace${t.key===e?Pt(` aria-current="page"`):``}>
            <span class="tabbar__icon">${L(t.icon)}</span>
            ${R(`nav.${t.key}`)}
          </a>`)}
    </nav>`}function V({label:e,variant:t=`primary`,action:n,type:r=`button`,iconName:i,block:a=!1,compact:o=!1,disabled:s=!1,data:c,id:l}){return I`<button type="${r}" class="${[`btn`,`btn--${t}`,a&&`btn--block`,o&&`btn--compact`].filter(Boolean).join(` `)}"${Jt(`id`,l)}${Jt(`data-action`,n)}${Xt(c)}${Yt(`disabled`,s)}>
    ${i?L(i,{size:20}):``}<span>${e}</span>
  </button>`}function en({name:e,type:t=`radio`,options:n,selected:r,legend:i}){let a=new Set([].concat(r??[]));return I`
    <fieldset class="options">
      ${i?I`<legend class="visually-hidden">${i}</legend>`:``}
      ${n.map(n=>I`
          <label class="option option--${t}">
            <input type="${t}" name="${e}" value="${n.value}" id="${e}-${n.value}"${Yt(`checked`,a.has(n.value))} />
            <span class="option__control">${L(`check`,{size:16,strokeWidth:3})}</span>
            <span class="option__label">${n.label}</span>
          </label>`)}
    </fieldset>`}function tn({name:e,options:t,selected:n,legend:r}){return I`
    <fieldset class="segmented">
      ${r?I`<legend class="visually-hidden">${r}</legend>`:``}
      ${t.map(t=>I`
          <label class="segmented__item">
            <input type="radio" name="${e}" value="${t.value}" id="${e}-${t.value}"${Yt(`checked`,t.value===n)} />
            <span>${t.label}</span>
          </label>`)}
    </fieldset>`}function H({label:e,name:t,type:n=`text`,value:r=``,placeholder:i,hint:a,optional:o=!1,required:s=!1,multiline:c=!1,autocomplete:l=`off`,maxlength:u=120}){let d=`f-${t}`,f=[a&&`${d}-hint`,`${d}-error`].filter(Boolean).join(` `),p=c?I`<textarea class="field__input" id="${d}" name="${t}"${Jt(`placeholder`,i)} maxlength="1000" aria-describedby="${f}">${r}</textarea>`:I`<input class="field__input" id="${d}" name="${t}" type="${n}" value="${r}"${Jt(`placeholder`,i)}${Jt(`autocomplete`,l)}${n===`text`?Jt(`maxlength`,u):``}${Yt(`required`,s)} aria-describedby="${f}" />`;return I`
    <div class="field">
      <label class="field__label" for="${d}">
        ${e}${o?I` <span class="field__optional">(${R(`common.optional`)})</span>`:``}
      </label>
      ${p}
      ${a?I`<p class="field__hint" id="${d}-hint">${a}</p>`:``}
      <p class="field__error" id="${d}-error" hidden></p>
    </div>`}function nn(e,t,n){let r=e.querySelector(`#f-${t}`),i=e.querySelector(`#f-${t}-error`);i&&(i.textContent=n,i.hidden=!1),r?.setAttribute(`aria-invalid`,`true`),r?.focus()}function rn(e){if(e?.getAttribute?.(`aria-invalid`)!==`true`)return;e.removeAttribute(`aria-invalid`);let t=document.getElementById(`${e.id}-error`);t&&(t.hidden=!0)}function an({name:e,label:t,hint:n,checked:r,iconName:i}){return I`
    <label class="list__row list__row--switch" for="f-${e}">
      ${i?L(i):``}
      <span class="list__text">
        <span class="list__label">${t}</span>
        ${n?I`<span class="list__hint" id="f-${e}-hint">${n}</span>`:``}
      </span>
      <input class="switch" type="checkbox" role="switch" id="f-${e}" name="${e}"${Yt(`checked`,r)}${n?I` aria-describedby="f-${e}-hint"`:``} />
    </label>`}var on=(e,{live:t=!1,neutral:n=!1}={})=>I`<span class="chip ${t?`chip--live`:``} ${n?`chip--neutral`:``}">${e}</span>`,sn=(e,{large:t=!1}={})=>I`<span class="icon-badge ${t?`icon-badge--lg`:``}">${L(e,{size:t?34:22})}</span>`;function cn(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function ln(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}var un={autoSleep:120,force3D:`auto`,nullTargetWarn:1,units:{lineHeight:``}},dn={duration:.5,overwrite:!1,delay:0},fn,pn,U,mn=1e8,W=1/mn,hn=Math.PI*2,gn=hn/4,_n=0,vn=Math.sqrt,yn=Math.cos,bn=Math.sin,xn=function(e){return typeof e==`string`},G=function(e){return typeof e==`function`},Sn=function(e){return typeof e==`number`},Cn=function(e){return e===void 0},wn=function(e){return typeof e==`object`},Tn=function(e){return e!==!1},En=function(){return typeof window<`u`},Dn=function(e){return G(e)||xn(e)},On=typeof ArrayBuffer==`function`&&ArrayBuffer.isView||function(){},kn=Array.isArray,An=/random\([^)]+\)/g,jn=/,\s*/g,Mn=/(?:-?\.?\d|\.)+/gi,Nn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Pn=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Fn=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,In=/[+-]=-?[.\d]+/,Ln=/[^,'"\[\]\s]+/gi,Rn=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,K,zn,Bn,Vn,Hn={},Un={},Wn,Gn=function(e){return(Un=xr(e,Hn))&&La},Kn=function(e,t){return console.warn(`Invalid property`,e,`set to`,t,`Missing plugin? gsap.registerPlugin()`)},qn=function(e,t){return!t&&console.warn(e)},Jn=function(e,t){return e&&(Hn[e]=t)&&Un&&(Un[e]=t)||Hn},Yn=function(){return 0},Xn={suppressEvents:!0,isStart:!0,kill:!1},Zn={suppressEvents:!0,kill:!1},Qn={suppressEvents:!0},$n={},er=[],tr={},nr,rr={},ir={},ar=30,or=[],sr=``,cr=function(e){var t=e[0],n,r;if(wn(t)||G(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=or.length;r--&&!or[r].targetTest(t););n=or[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ji(e[r],n)))||e.splice(r,1);return e},lr=function(e){return e._gsap||cr(ii(e))[0]._gsap},ur=function(e,t,n){return(n=e[t])&&G(n)?e[t]():Cn(n)&&e.getAttribute&&e.getAttribute(t)||n},dr=function(e,t){return(e=e.split(`,`)).forEach(t)||e},q=function(e){return Math.round(e*1e5)/1e5||0},J=function(e){return Math.round(e*1e7)/1e7||0},fr=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n===`+`?e+r:n===`-`?e-r:n===`*`?e*r:e/r},pr=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},mr=function(){var e=er.length,t=er.slice(0),n,r;for(tr={},er.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},hr=function(e){return!!(e._initted||e._startAt||e.add)},gr=function(e,t,n,r){er.length&&!pn&&mr(),e.render(t,n,r||!!(pn&&t<0&&hr(e))),er.length&&!pn&&mr()},_r=function(e){var t=parseFloat(e);return(t||t===0)&&(e+``).match(Ln).length<2?t:xn(e)?e.trim():e},vr=function(e){return e},yr=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},br=function(e){return function(t,n){for(var r in n)r in t||r===`duration`&&e||r===`ease`||(t[r]=n[r])}},xr=function(e,t){for(var n in t)e[n]=t[n];return e},Sr=function e(t,n){for(var r in n)r!==`__proto__`&&r!==`constructor`&&r!==`prototype`&&(t[r]=wn(n[r])?e(t[r]||(t[r]={}),n[r]):n[r]);return t},Cr=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},wr=function(e){var t=e.parent||K,n=e.keyframes?br(kn(e.keyframes)):yr;if(Tn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Tr=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},Er=function(e,t,n,r,i){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var a=e[r],o;if(i)for(o=t[i];a&&a[i]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Dr=function(e,t,n,r){n===void 0&&(n=`_first`),r===void 0&&(r=`_last`);var i=t._prev,a=t._next;i?i._next=a:e[n]===t&&(e[n]=a),a?a._prev=i:e[r]===t&&(e[r]=i),t._next=t._prev=t.parent=null},Or=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},kr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Ar=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},jr=function(e,t,n,r){return e._startAt&&(pn?e._startAt.revert(Zn):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Mr=function e(t){return!t||t._ts&&e(t.parent)},Nr=function(e){return e._repeat?Pr(e._tTime,e=e.duration()+e._rDelay)*e:0},Pr=function(e,t){var n=Math.floor(e=J(e/t));return e&&n===e?n-1:n},Fr=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ir=function(e){return e._end=J(e._start+(e._tDur/Math.abs(e._ts||e._rts||W)||0))},Lr=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=J(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ir(e),n._dirty||kr(n,e)),e},Rr=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Fr(e.rawTime(),t),(!t._dur||Qr(0,t.totalDuration(),n)-t._tTime>W)&&t.render(n,!0)),kr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-W}},zr=function(e,t,n,r){return t.parent&&Or(t),t._start=J((Sn(n)?n:n||e!==K?Yr(e,n,t):e._time)+t._delay),t._end=J(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Er(e,t,`_first`,`_last`,e._sort?`_start`:0),Ur(t)||(e._recent=t),r||Rr(e,t),e._ts<0&&Lr(e,e._tTime),e},Br=function(e,t){return(Hn.ScrollTrigger||Kn(`scrollTrigger`,t))&&Hn.ScrollTrigger.create(t,e)},Vr=function(e,t,n,r,i){if(ra(e,t,i),!e._initted)return 1;if(!n&&e._pt&&!pn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&nr!==Fi.frame)return er.push(e),e._lazy=[i,r],1},Hr=function e(t){var n=t.parent;return n&&n._ts&&n._initted&&!n._lock&&(n.rawTime()<0||e(n))},Ur=function(e){var t=e.data;return t===`isFromStart`||t===`isStart`},Wr=function(e,t,n,r){var i=e.ratio,a=t<0||!t&&(!e._start&&Hr(e)&&(e._initted||!Ur(e))||(e._ts<0||e._dp._ts<0)&&!Ur(e))?0:1,o=e._rDelay,s=0,c,l,u;if(o&&e._repeat&&(s=Qr(0,e._tDur,t),l=Pr(s,o),e._yoyo&&l&1&&(a=1-a),l!==Pr(e._tTime,o)&&(i=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==i||pn||r||e._zTime===W||!t&&e._zTime){if(!e._initted&&Vr(e,t,r,n,s))return;for(u=e._zTime,e._zTime=t||(n?W:0),n||=t&&!u,e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=s,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&jr(e,t,n,!0),e._onUpdate&&!n&&xi(e,`onUpdate`),s&&e._repeat&&!n&&e.parent&&xi(e,`onRepeat`),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Or(e,1),!n&&!pn&&(xi(e,a?`onComplete`:`onReverseComplete`,!0),e._prom&&e._prom()))}else e._zTime||=t},Gr=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data===`isPause`&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data===`isPause`&&r._start<t)return r;r=r._prev}},Kr=function(e,t,n,r){var i=e._repeat,a=J(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=i?i<0?1e10:J(a*(i+1)+e._rDelay*i):a,o>0&&!r&&Lr(e,e._tTime=e._tDur*o),e.parent&&Ir(e),n||kr(e.parent,e),e},qr=function(e){return e instanceof Xi?kr(e):Kr(e,e._dur)},Jr={_start:0,endTime:Yn,totalDuration:Yn},Yr=function e(t,n,r){var i=t.labels,a=t._recent||Jr,o=t.duration()>=mn?a.endTime(!1):t._dur,s,c,l;return xn(n)&&(isNaN(n)||n in i)?(c=n.charAt(0),l=n.substr(-1)===`%`,s=n.indexOf(`=`),c===`<`||c===`>`?(s>=0&&(n=n.replace(/=/,``)),(c===`<`?a._start:a.endTime(a._repeat>=0))+(parseFloat(n.substr(1))||0)*(l?(s<0?a:r).totalDuration()/100:1)):s<0?(n in i||(i[n]=o),i[n]):(c=parseFloat(n.charAt(s-1)+n.substr(s+1)),l&&r&&(c=c/100*(kn(r)?r[0]:r).totalDuration()),s>1?e(t,n.substr(0,s-1),r)+c:o+c)):n==null?o:+n},Xr=function(e,t,n){var r=Sn(t[1]),i=(r?2:1)+(e<2?0:1),a=t[i],o,s;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,s=n;s&&!(`immediateRender`in o);)o=s.vars.defaults||{},s=Tn(s.vars.inherit)&&s.parent;a.immediateRender=Tn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[i-1]}return new Z(t[0],a,t[i+1])},Zr=function(e,t){return e||e===0?t(e):t},Qr=function(e,t,n){return n<e?e:n>t?t:n},$r=function(e,t){return!xn(e)||!(t=Rn.exec(e))?``:t[1]},ei=function(e,t,n){return Zr(n,function(n){return Qr(e,t,n)})},ti=[].slice,ni=function(e,t){return e&&wn(e)&&`length`in e&&(!t&&!e.length||e.length-1 in e&&wn(e[0]))&&!e.nodeType&&e!==zn},ri=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(e){var r;return xn(e)&&!t||ni(e,1)?(r=n).push.apply(r,ii(e)):n.push(e)})||n},ii=function(e,t,n){return U&&!t&&U.selector?U.selector(e):xn(e)&&!n&&(Bn||!Ii())?ti.call((t||Vn).querySelectorAll(e),0):kn(e)?ri(e,n):ni(e)?ti.call(e,0):e?[e]:[]},ai=function(e){return e=ii(e)[0]||qn(`Invalid scope`)||{},function(t){var n=e.current||e.nativeElement||e;return ii(t,n.querySelectorAll?n:n===e?qn(`Invalid scope`)||Vn.createElement(`div`):e)}},oi=function(e){return e.sort(function(){return .5-Math.random()})},si=function(e){if(G(e))return e;var t=wn(e)?e:{each:e},n=Ui(t.ease),r=t.from||0,i=parseFloat(t.base)||0,a={},o=r>0&&r<1,s=isNaN(r)||o,c=t.axis,l=r,u=r;return xn(r)?l=u={center:.5,edges:.5,end:1}[r]||0:!o&&s&&(l=r[0],u=r[1]),function(e,o,d){var f=(d||t).length,p=a[f],m,h,g,_,v,y,b,x,S;if(!p){if(S=t.grid===`auto`?0:(t.grid||[1,mn])[1],!S){for(b=-mn;b<(b=d[S++].getBoundingClientRect().left)&&S<f;);S<f&&S--}for(p=a[f]=[],m=s?Math.min(S,f)*l-.5:r%S,h=S===mn?0:s?f*u/S-.5:r/S|0,b=0,x=mn,y=0;y<f;y++)g=y%S-m,_=h-(y/S|0),p[y]=v=c?Math.abs(c===`y`?_:g):vn(g*g+_*_),v>b&&(b=v),v<x&&(x=v);r===`random`&&oi(p),p.max=b-x,p.min=x,p.v=f=(parseFloat(t.amount)||parseFloat(t.each)*(S>f?f-1:c?c===`y`?f/S:S:Math.max(S,f/S))||0)*(r===`edges`?-1:1),p.b=f<0?i-f:i,p.u=$r(t.amount||t.each)||0,n=n&&f<0?Hi(n):n}return f=(p[e]-p.min)/p.max||0,J(p.b+(n?n(f):f)*p.v)+p.u}},ci=function(e){var t=10**((e+``).split(`.`)[1]||``).length;return function(n){var r=J(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(Sn(n)?0:$r(n))}},li=function(e,t){var n=kn(e),r,i;return!n&&wn(e)&&(r=n=e.radius||mn,e.values?(e=ii(e.values),(i=!Sn(e[0]))&&(r*=r)):e=ci(e.increment)),Zr(t,n?G(e)?function(t){return i=e(t),Math.abs(i-t)<=r?i:t}:function(t){for(var n=parseFloat(i?t.x:t),a=parseFloat(i?t.y:0),o=mn,s=0,c=e.length,l,u;c--;)i?(l=e[c].x-n,u=e[c].y-a,l=l*l+u*u):l=Math.abs(e[c]-n),l<o&&(o=l,s=c);return s=!r||o<=r?e[s]:t,i||s===t||Sn(t)?s:s+$r(t)}:ci(e))},ui=function(e,t,n,r){return Zr(kn(e)?!t:n===!0?!!(n=0):!r,function(){return kn(e)?e[~~(Math.random()*e.length)]:(n||=1e-5)&&(r=n<1?10**((n+``).length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},di=function(){var e=[...arguments];return function(t){return e.reduce(function(e,t){return t(e)},t)}},fi=function(e,t){return function(n){return e(parseFloat(n))+(t||$r(n))}},pi=function(e,t,n){return vi(e,t,0,1,n)},mi=function(e,t,n){return Zr(n,function(n){return e[~~t(n)]})},hi=function e(t,n,r){var i=n-t;return kn(t)?mi(t,e(0,t.length),n):Zr(r,function(e){return(i+(e-t)%i)%i+t})},gi=function e(t,n,r){var i=n-t,a=i*2;return kn(t)?mi(t,e(0,t.length-1),n):Zr(r,function(e){return e=(a+(e-t)%a)%a||0,t+(e>i?a-e:e)})},_i=function(e){return e.replace(An,function(e){var t=e.indexOf(`[`)+1,n=e.substring(t||7,t?e.indexOf(`]`):e.length-1).split(jn);return ui(t?n:+n[0],t?0:+n[1],+n[2]||1e-5)})},vi=function(e,t,n,r,i){var a=t-e,o=r-n;return Zr(i,function(t){return n+((t-e)/a*o||0)})},yi=function e(t,n,r,i){var a=isNaN(t+n)?0:function(e){return(1-e)*t+e*n};if(!a){var o=xn(t),s={},c,l,u,d,f;if(r===!0&&(i=1)&&(r=null),o)t={p:t},n={p:n};else if(kn(t)&&!kn(n)){for(u=[],d=t.length,f=d-2,l=1;l<d;l++)u.push(e(t[l-1],t[l]));d--,a=function(e){e*=d;var t=Math.min(f,~~e);return u[t](e-t)},r=n}else i||(t=xr(kn(t)?[]:{},t));if(!u){for(c in n)Qi.call(s,t,c,`get`,n[c]);a=function(e){return va(e,s)||(o?t.p:t)}}}return Zr(r,a)},bi=function(e,t,n){var r=e.labels,i=mn,a,o,s;for(a in r)o=r[a]-t,o<0==!!n&&o&&i>(o=Math.abs(o))&&(s=a,i=o);return s},xi=function(e,t,n){var r=e.vars,i=r[t],a=U,o=e._ctx,s,c,l;if(i)return s=r[t+`Params`],c=r.callbackScope||e,n&&er.length&&mr(),o&&(U=o),l=s?i.apply(c,s):i.call(c),U=a,l},Si=function(e){return Or(e),e.scrollTrigger&&e.scrollTrigger.kill(!!pn),e.progress()<1&&xi(e,`onInterrupt`),e},Ci,wi=[],Ti=function(e){if(e){if(e=!e.name&&e.default||e,En()||e.headless){var t=e.name,n=G(e),r=t&&!n&&e.init?function(){this._props=[]}:e,i={init:Yn,render:va,add:Qi,kill:ba,modifier:ya,rawVars:0},a={targetTest:0,get:0,getSetter:ma,aliases:{},register:0};if(Ii(),e!==r){if(rr[t])return;yr(r,yr(Cr(e,i),a)),xr(r.prototype,xr(i,Cr(e,a))),rr[r.prop=t]=r,e.targetTest&&(or.push(r),$n[t]=1),t=(t===`css`?`CSS`:t.charAt(0).toUpperCase()+t.substr(1))+`Plugin`}Jn(t,r),e.register&&e.register(La,r,Ca)}else wi.push(e)}},Y=255,Ei={aqua:[0,Y,Y],lime:[0,Y,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Y],navy:[0,0,128],white:[Y,Y,Y],olive:[128,128,0],yellow:[Y,Y,0],orange:[Y,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Y,0,0],pink:[Y,192,203],cyan:[0,Y,Y],transparent:[Y,Y,Y,0]},Di=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Y+.5|0},Oi=function(e,t,n){var r=e?Sn(e)?[e>>16,e>>8&Y,e&Y]:0:Ei.black,i,a,o,s,c,l,u,d,f,p;if(!r){if(e.substr(-1)===`,`&&(e=e.substr(0,e.length-1)),Ei[e])r=Ei[e];else if(e.charAt(0)===`#`){if(e.length<6&&(i=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e=`#`+i+i+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):``)),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Y,r&Y,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Y,e&Y]}else if(e.substr(0,3)===`hsl`){if(r=p=e.match(Mn),!t)s=r[0]%360/360,c=r[1]/100,l=r[2]/100,a=l<=.5?l*(c+1):l+c-l*c,i=l*2-a,r.length>3&&(r[3]*=1),r[0]=Di(s+1/3,i,a),r[1]=Di(s,i,a),r[2]=Di(s-1/3,i,a);else if(~e.indexOf(`=`))return r=e.match(Nn),n&&r.length<4&&(r[3]=1),r}else r=e.match(Mn)||Ei.transparent;r=r.map(Number)}return t&&!p&&(i=r[0]/Y,a=r[1]/Y,o=r[2]/Y,u=Math.max(i,a,o),d=Math.min(i,a,o),l=(u+d)/2,u===d?s=c=0:(f=u-d,c=l>.5?f/(2-u-d):f/(u+d),s=u===i?(a-o)/f+(a<o?6:0):u===a?(o-i)/f+2:(i-a)/f+4,s*=60),r[0]=~~(s+.5),r[1]=~~(c*100+.5),r[2]=~~(l*100+.5)),n&&r.length<4&&(r[3]=1),r},ki=function(e){var t=[],n=[],r=-1;return e.split(ji).forEach(function(e){var i=e.match(Pn)||[];t.push.apply(t,i),n.push(r+=i.length+1)}),t.c=n,t},Ai=function(e,t,n){var r=``,i=(e+r).match(ji),a=t?`hsla(`:`rgba(`,o=0,s,c,l,u;if(!i)return e;if(i=i.map(function(e){return(e=Oi(e,t,1))&&a+(t?e[0]+`,`+e[1]+`%,`+e[2]+`%,`+e[3]:e.join(`,`))+`)`}),n&&(l=ki(e),s=n.c,s.join(r)!==l.c.join(r)))for(c=e.replace(ji,`1`).split(Pn),u=c.length-1;o<u;o++)r+=c[o]+(~s.indexOf(o)?i.shift()||a+`0,0,0,0)`:(l.length?l:i.length?i:n).shift());if(!c)for(c=e.split(ji),u=c.length-1;o<u;o++)r+=c[o]+i[o];return r+c[u]},ji=function(){var e=`(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b`,t;for(t in Ei)e+=`|`+t+`\\b`;return RegExp(e+`)`,`gi`)}(),Mi=/hsl[a]?\(/,Ni=function(e){var t=e.join(` `),n;if(ji.lastIndex=0,ji.test(t))return n=Mi.test(t),e[1]=Ai(e[1],n),e[0]=Ai(e[0],n,ki(e[1])),!0},Pi,Fi=function(){var e=Date.now,t=500,n=33,r=e(),i=r,a=1e3/240,o=a,s=[],c,l,u,d,f,p,m=function u(m){var h=e()-i,g=m===!0,_,v,y,b;if((h>t||h<0)&&(r+=h-n),i+=h,y=i-r,_=y-o,(_>0||g)&&(b=++d.frame,f=y-d.time*1e3,d.time=y/=1e3,o+=_+(_>=a?4:a-_),v=1),g||(c=l(u)),v)for(p=0;p<s.length;p++)s[p](y,f,b,m)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(e){return f/(1e3/(e||60))},wake:function(){Wn&&(!Bn&&En()&&(zn=Bn=window,Vn=zn.document||{},Hn.gsap=La,(zn.gsapVersions||(zn.gsapVersions=[])).push(La.version),Gn(Un||zn.GreenSockGlobals||!zn.gsap&&zn||{}),wi.forEach(Ti)),u=typeof requestAnimationFrame<`u`&&requestAnimationFrame,c&&d.sleep(),l=u||function(e){return setTimeout(e,o-d.time*1e3+1|0)},Pi=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),Pi=0,l=Yn},lagSmoothing:function(e,r){t=e||1/0,n=Math.min(r||33,t)},fps:function(e){a=1e3/(e||240),o=d.time*1e3+a},add:function(e,t,n){var r=t?function(t,n,i,a){e(t,n,i,a),d.remove(r)}:e;return d.remove(e),s[n?`unshift`:`push`](r),Ii(),r},remove:function(e,t){~(t=s.indexOf(e))&&s.splice(t,1)&&p>=t&&p--},_listeners:s},d}(),Ii=function(){return!Pi&&Fi.wake()},X={},Li=/^[\d.\-M][\d.\-,\s]/,Ri=/["']/g,zi=function(e){for(var t={},n=e.substr(1,e.length-3).split(`:`),r=n[0],i=1,a=n.length,o,s,c;i<a;i++)s=n[i],o=i===a-1?s.length:s.lastIndexOf(`,`),c=s.substr(0,o),t[r]=isNaN(c)?c.replace(Ri,``).trim():+c,r=s.substr(o+1).trim();return t},Bi=function(e){var t=e.indexOf(`(`)+1,n=e.indexOf(`)`),r=e.indexOf(`(`,t);return e.substring(t,~r&&r<n?e.indexOf(`)`,n+1):n)},Vi=function(e){var t=(e+``).split(`(`),n=X[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf(`{`)?[zi(t[1])]:Bi(e).split(`,`).map(_r)):X._CE&&Li.test(e)?X._CE(``,e):n},Hi=function(e){return function(t){return 1-e(1-t)}},Ui=function(e,t){return e&&(G(e)?e:X[e]||Vi(e))||t},Wi=function(e,t,n,r){n===void 0&&(n=function(e){return 1-t(1-e)}),r===void 0&&(r=function(e){return e<.5?t(e*2)/2:1-t((1-e)*2)/2});var i={easeIn:t,easeOut:n,easeInOut:r},a;return dr(e,function(e){for(var t in X[e]=Hn[e]=i,X[a=e.toLowerCase()]=n,i)X[a+(t===`easeIn`?`.in`:t===`easeOut`?`.out`:`.inOut`)]=X[e+`.`+t]=i[t]}),i},Gi=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ki=function e(t,n,r){var i=n>=1?n:1,a=(r||(t?.3:.45))/(n<1?n:1),o=a/hn*(Math.asin(1/i)||0),s=function(e){return e===1?1:i*2**(-10*e)*bn((e-o)*a)+1},c=t===`out`?s:t===`in`?function(e){return 1-s(1-e)}:Gi(s);return a=hn/a,c.config=function(n,r){return e(t,n,r)},c},qi=function e(t,n){n===void 0&&(n=1.70158);var r=function(e){return e?--e*e*((n+1)*e+n)+1:0},i=t===`out`?r:t===`in`?function(e){return 1-r(1-e)}:Gi(r);return i.config=function(n){return e(t,n)},i};dr(`Linear,Quad,Cubic,Quart,Quint,Strong`,function(e,t){var n=t<5?t+1:t;Wi(e+`,Power`+(n-1),t?function(e){return e**+n}:function(e){return e},function(e){return 1-(1-e)**n},function(e){return e<.5?(e*2)**n/2:1-((1-e)*2)**n/2})}),X.Linear.easeNone=X.none=X.Linear.easeIn,Wi(`Elastic`,Ki(`in`),Ki(`out`),Ki()),(function(e,t){var n=1/t,r=2*n,i=2.5*n,a=function(a){return a<n?e*a*a:a<r?e*(a-1.5/t)**2+.75:a<i?e*(a-=2.25/t)*a+.9375:e*(a-2.625/t)**2+.984375};Wi(`Bounce`,function(e){return 1-a(1-e)},a)})(7.5625,2.75),Wi(`Expo`,function(e){return 2**(10*(e-1))*e+e*e*e*e*e*e*(1-e)}),Wi(`Circ`,function(e){return-(vn(1-e*e)-1)}),Wi(`Sine`,function(e){return e===1?1:-yn(e*gn)+1}),Wi(`Back`,qi(`in`),qi(`out`),qi()),X.SteppedEase=X.steps=Hn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+ +!t,i=+!!t,a=1-W;return function(e){return((r*Qr(0,a,e)|0)+i)*n}}},dn.ease=X[`quad.out`],dr(`onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt`,function(e){return sr+=e+`,`+e+`Params,`});var Ji=function(e,t){this.id=_n++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:ur,this.set=t?t.getSetter:ma},Yi=function(){function e(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Kr(this,+e.duration,1,1),this.data=e.data,U&&(this._ctx=U,U.data.push(this)),Pi||Fi.wake()}var t=e.prototype;return t.delay=function(e){return e||e===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+e-this._delay),this._delay=e,this):this._delay},t.duration=function(e){return arguments.length?this.totalDuration(this._repeat>0?e+(e+this._rDelay)*this._repeat:e):this.totalDuration()&&this._dur},t.totalDuration=function(e){return arguments.length?(this._dirty=0,Kr(this,this._repeat<0?e:(e-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(e,t){if(Ii(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Lr(this,e),!n._dp||n.parent||Rr(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&e<this._tDur||this._ts<0&&e>0||!this._tDur&&!e)&&zr(this._dp,this,this._start-this._delay)}return(this._tTime!==e||!this._dur&&!t||this._initted&&Math.abs(this._zTime)===W||!this._initted&&this._dur&&e||!e&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=e),gr(this,e,t)),this},t.time=function(e,t){return arguments.length?this.totalTime(Math.min(this.totalDuration(),e+Nr(this))%(this._dur+this._rDelay)||(e?this._dur:0),t):this._time},t.totalProgress=function(e,t){return arguments.length?this.totalTime(this.totalDuration()*e,t):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(e,t){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-e:e)+Nr(this),t):this.duration()?Math.min(1,this._time/this._dur):+(this.rawTime()>0)},t.iteration=function(e,t){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(e-1)*n,t):this._repeat?Pr(this._tTime,n)+1:1},t.timeScale=function(e,t){if(!arguments.length)return this._rts===-W?0:this._rts;if(this._rts===e)return this;var n=this.parent&&this._ts?Fr(this.parent._time,this):this._tTime;return this._rts=+e||0,this._ts=this._ps||e===-W?0:this._rts,this.totalTime(Qr(-Math.abs(this._delay),this.totalDuration(),n),t!==!1),Ir(this),Ar(this)},t.paused=function(e){return arguments.length?(this._ps!==e&&(this._ps=e,e?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ii(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==W&&(this._tTime-=W)))),this):this._ps},t.startTime=function(e){if(arguments.length){this._start=J(e);var t=this.parent||this._dp;return t&&(t._sort||!this.parent)&&zr(t,this,this._start-this._delay),this}return this._start},t.endTime=function(e){return this._start+(Tn(e)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(e){var t=this.parent||this._dp;return t?e&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Fr(t.rawTime(e),this):this._tTime:this._tTime},t.revert=function(e){e===void 0&&(e=Qn);var t=pn;return pn=e,hr(this)&&(this.timeline&&this.timeline.revert(e),this.totalTime(-.01,e.suppressEvents)),this.data!==`nested`&&e.kill!==!1&&this.kill(),pn=t,this},t.globalTime=function(e){for(var t=this,n=arguments.length?e:t.rawTime();t;)n=t._start+n/(Math.abs(t._ts)||1),t=t._dp;return!this.parent&&this._sat?this._sat.globalTime(e):n},t.repeat=function(e){return arguments.length?(this._repeat=e===1/0?-2:e,qr(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(e){if(arguments.length){var t=this._time;return this._rDelay=e,qr(this),t?this.time(t):this}return this._rDelay},t.yoyo=function(e){return arguments.length?(this._yoyo=e,this):this._yoyo},t.seek=function(e,t){return this.totalTime(Yr(this,e),Tn(t))},t.restart=function(e,t){return this.play().totalTime(e?-this._delay:0,Tn(t)),this._dur||(this._zTime=-W),this},t.play=function(e,t){return e!=null&&this.seek(e,t),this.reversed(!1).paused(!1)},t.reverse=function(e,t){return e!=null&&this.seek(e||this.totalDuration(),t),this.reversed(!0).paused(!1)},t.pause=function(e,t){return e!=null&&this.seek(e,t),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(e){return arguments.length?(!!e!==this.reversed()&&this.timeScale(-this._rts||(e?-W:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-W,this},t.isActive=function(){var e=this.parent||this._dp,t=this._start,n;return!!(!e||this._ts&&this._initted&&e.isActive()&&(n=e.rawTime(!0))>=t&&n<this.endTime(!0)-W)},t.eventCallback=function(e,t,n){var r=this.vars;return arguments.length>1?(t?(r[e]=t,n&&(r[e+`Params`]=n),e===`onUpdate`&&(this._onUpdate=t)):delete r[e],this):r[e]},t.then=function(e){var t=this,n=t._prom;return new Promise(function(r){var i=G(e)?e:vr,a=function(){var e=t.then;t.then=null,n&&n(),G(i)&&(i=i(t))&&(i.then||i===t)&&(t.then=e),r(i),t.then=e};t._initted&&t.totalProgress()===1&&t._ts>=0||!t._tTime&&t._ts<0?a():t._prom=a})},t.kill=function(){Si(this)},e}();yr(Yi.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-W,_prom:0,_ps:!1,_rts:1});var Xi=function(e){ln(t,e);function t(t,n){var r;return t===void 0&&(t={}),r=e.call(this,t)||this,r.labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=Tn(t.sortChildren),K&&zr(t.parent||K,cn(r),n),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Br(cn(r),t.scrollTrigger),r}var n=t.prototype;return n.to=function(e,t,n){return Xr(0,arguments,this),this},n.from=function(e,t,n){return Xr(1,arguments,this),this},n.fromTo=function(e,t,n,r){return Xr(2,arguments,this),this},n.set=function(e,t,n){return t.duration=0,t.parent=this,wr(t).repeatDelay||(t.repeat=0),t.immediateRender=!!t.immediateRender,new Z(e,t,Yr(this,n),1),this},n.call=function(e,t,n){return zr(this,Z.delayedCall(0,e,t),n)},n.staggerTo=function(e,t,n,r,i,a,o){return n.duration=t,n.stagger=n.stagger||r,n.onComplete=a,n.onCompleteParams=o,n.parent=this,new Z(e,n,Yr(this,i)),this},n.staggerFrom=function(e,t,n,r,i,a,o){return n.runBackwards=1,wr(n).immediateRender=Tn(n.immediateRender),this.staggerTo(e,t,n,r,i,a,o)},n.staggerFromTo=function(e,t,n,r,i,a,o,s){return r.startAt=n,wr(r).immediateRender=Tn(r.immediateRender),this.staggerTo(e,t,r,i,a,o,s)},n.render=function(e,t,n){var r=this._time,i=this._dirty?this.totalDuration():this._tDur,a=this._dur,o=e<=0?0:J(e),s=this._zTime<0!=e<0&&(this._initted||!a),c,l,u,d,f,p,m,h,g,_,v,y;if(this!==K&&o>i&&e>=0&&(o=i),o!==this._tTime||n||s){if(r!==this._time&&a&&(o+=this._time-r,e+=this._time-r),c=o,g=this._start,h=this._ts,p=!h,s&&(a||(r=this._zTime),(e||!t)&&(this._zTime=e)),this._repeat){if(v=this._yoyo,f=a+this._rDelay,this._repeat<-1&&e<0)return this.totalTime(f*100+e,t,n);if(c=J(o%f),o===i?(d=this._repeat,c=a):(_=J(o/f),d=~~_,d&&d===_&&(c=a,d--),c>a&&(c=a)),_=Pr(this._tTime,f),!r&&this._tTime&&_!==d&&this._tTime-_*f-this._dur<=0&&(_=d),v&&d&1&&(c=a-c,y=1),d!==_&&!this._lock){var b=v&&_&1,x=b===(v&&d&1);if(d<_&&(b=!b),r=b?0:o%a?a:o,this._lock=1,this.render(r||(y?0:J(d*f)),t,!a)._lock=0,this._tTime=o,!t&&this.parent&&xi(this,`onRepeat`),this.vars.repeatRefresh&&!y&&(this.invalidate()._lock=1,_=d),r&&r!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act||(a=this._dur,i=this._tDur,x&&(this._lock=2,r=b?a:-1e-4,this.render(r,!0),this.vars.repeatRefresh&&!y&&this.invalidate()),this._lock=0,!this._ts&&!p))return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(m=Gr(this,J(r),J(c)),m&&(o-=c-(c=m._start))),this._tTime=o,this._time=c,this._act=!!h,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=e,r=0),!r&&o&&a&&!t&&!_&&(xi(this,`onStart`),this._tTime!==o))return this;if(c>=r&&e>=0)for(l=this._first;l;){if(u=l._next,(l._act||c>=l._start)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(c-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(c-l._start)*l._ts,t,n),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=-W);break}}l=u}else{l=this._last;for(var S=e<0?e:c;l;){if(u=l._prev,(l._act||S<=l._end)&&l._ts&&m!==l){if(l.parent!==this)return this.render(e,t,n);if(l.render(l._ts>0?(S-l._start)*l._ts:(l._dirty?l.totalDuration():l._tDur)+(S-l._start)*l._ts,t,n||pn&&hr(l)),c!==this._time||!this._ts&&!p){m=0,u&&(o+=this._zTime=S?-W:W);break}}l=u}}if(m&&!t&&(this.pause(),m.render(c>=r?0:-W)._zTime=c>=r?1:-1,this._ts))return this._start=g,Ir(this),this.render(e,t,n);this._onUpdate&&!t&&xi(this,`onUpdate`,!0),(o===i&&this._tTime>=this.totalDuration()||!o&&r)&&(g===this._start||Math.abs(h)!==Math.abs(this._ts))&&(this._lock||((e||!a)&&(o===i&&this._ts>0||!o&&this._ts<0)&&Or(this,1),!t&&!(e<0&&!r)&&(o||r||!i)&&(xi(this,o===i&&e>=0?`onComplete`:`onReverseComplete`,!0),this._prom&&!(o<i&&this.timeScale()>0)&&this._prom())))}return this},n.add=function(e,t){var n=this;if(Sn(t)||(t=Yr(this,t,e)),!(e instanceof Yi)){if(kn(e))return e.forEach(function(e){return n.add(e,t)}),this;if(xn(e))return this.addLabel(e,t);if(G(e))e=Z.delayedCall(0,e);else return this}return this===e?this:zr(this,e,t)},n.getChildren=function(e,t,n,r){e===void 0&&(e=!0),t===void 0&&(t=!0),n===void 0&&(n=!0),r===void 0&&(r=-mn);for(var i=[],a=this._first;a;)a._start>=r&&(a instanceof Z?t&&i.push(a):(n&&i.push(a),e&&i.push.apply(i,a.getChildren(!0,t,n)))),a=a._next;return i},n.getById=function(e){for(var t=this.getChildren(1,1,1),n=t.length;n--;)if(t[n].vars.id===e)return t[n]},n.remove=function(e){return xn(e)?this.removeLabel(e):G(e)?this.killTweensOf(e):(e.parent===this&&Dr(this,e),e===this._recent&&(this._recent=this._last),kr(this))},n.totalTime=function(t,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=J(Fi.time-(this._ts>0?t/this._ts:(this.totalDuration()-t)/-this._ts))),e.prototype.totalTime.call(this,t,n),this._forcing=0,this):this._tTime},n.addLabel=function(e,t){return this.labels[e]=Yr(this,t),this},n.removeLabel=function(e){return delete this.labels[e],this},n.addPause=function(e,t,n){var r=Z.delayedCall(0,t||Yn,n);return r.data=`isPause`,this._hasPause=1,zr(this,r,Yr(this,e))},n.removePause=function(e){var t=this._first;for(e=Yr(this,e);t;)t._start===e&&t.data===`isPause`&&Or(t),t=t._next},n.killTweensOf=function(e,t,n){for(var r=this.getTweensOf(e,n),i=r.length;i--;)ta!==r[i]&&r[i].kill(e,t);return this},n.getTweensOf=function(e,t){for(var n=[],r=ii(e),i=this._first,a=Sn(t),o;i;)i instanceof Z?pr(i._targets,r)&&(a?(!ta||i._initted&&i._ts)&&i.globalTime(0)<=t&&i.globalTime(i.totalDuration())>t:!t||i.isActive())&&n.push(i):(o=i.getTweensOf(r,t)).length&&n.push.apply(n,o),i=i._next;return n},n.tweenTo=function(e,t){t||={};var n=this,r=Yr(n,e),i=t,a=i.startAt,o=i.onStart,s=i.onStartParams,c=i.immediateRender,l,u=Z.to(n,yr({ease:t.ease||`none`,lazy:!1,immediateRender:!1,time:r,overwrite:`auto`,duration:t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale())||W,onStart:function(){if(n.pause(),!l){var e=t.duration||Math.abs((r-(a&&`time`in a?a.time:n._time))/n.timeScale());u._dur!==e&&Kr(u,e,0,1).render(u._time,!0,!0),l=1}o&&o.apply(u,s||[])}},t));return c?u.render(0):u},n.tweenFromTo=function(e,t,n){return this.tweenTo(t,yr({startAt:{time:Yr(this,e)}},n))},n.recent=function(){return this._recent},n.nextLabel=function(e){return e===void 0&&(e=this._time),bi(this,Yr(this,e))},n.previousLabel=function(e){return e===void 0&&(e=this._time),bi(this,Yr(this,e),1)},n.currentLabel=function(e){return arguments.length?this.seek(e,!0):this.previousLabel(this._time+W)},n.shiftChildren=function(e,t,n){n===void 0&&(n=0);var r=this._first,i=this.labels,a;for(e=J(e);r;)r._start>=n&&(r._start+=e,r._end+=e),r=r._next;if(t)for(a in i)i[a]>=n&&(i[a]+=e);return kr(this)},n.invalidate=function(t){var n=this._first;for(this._lock=0;n;)n.invalidate(t),n=n._next;return e.prototype.invalidate.call(this,t)},n.clear=function(e){e===void 0&&(e=!0);for(var t=this._first,n;t;)n=t._next,this.remove(t),t=n;return this._dp&&(this._time=this._tTime=this._pTime=0),e&&(this.labels={}),kr(this)},n.totalDuration=function(e){var t=0,n=this,r=n._last,i=mn,a,o,s;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-e:e));if(n._dirty){for(s=n.parent;r;)a=r._prev,r._dirty&&r.totalDuration(),o=r._start,o>i&&n._sort&&r._ts&&!n._lock?(n._lock=1,zr(n,r,o-r._delay,1)._lock=0):i=o,o<0&&r._ts&&(t-=o,(!s&&!n._dp||s&&s.smoothChildTiming)&&(n._start+=J(o/n._ts),n._time-=o,n._tTime-=o),n.shiftChildren(-o,!1,-1/0),i=0),r._end>t&&r._ts&&(t=r._end),r=a;Kr(n,n===K&&n._time>t?n._time:t,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(e){if(K._ts&&(gr(K,Fr(e,K)),nr=Fi.frame),Fi.frame>=ar){ar+=un.autoSleep||120;var t=K._first;if((!t||!t._ts)&&un.autoSleep&&Fi._listeners.length<2){for(;t&&!t._ts;)t=t._next;t||Fi.sleep()}}},t}(Yi);yr(Xi.prototype,{_lock:0,_hasPause:0,_forcing:0});var Zi=function(e,t,n,r,i,a,o){var s=new Ca(this._pt,e,t,0,1,_a,null,i),c=0,l=0,u,d,f,p,m,h,g,_;for(s.b=n,s.e=r,n+=``,r+=``,(g=~r.indexOf(`random(`))&&(r=_i(r)),a&&(_=[n,r],a(_,e,t),n=_[0],r=_[1]),d=n.match(Fn)||[];u=Fn.exec(r);)p=u[0],m=r.substring(c,u.index),f?f=(f+1)%5:m.substr(-5)===`rgba(`&&(f=1),p!==d[l++]&&(h=parseFloat(d[l-1])||0,s._pt={_next:s._pt,p:m||l===1?m:`,`,s:h,c:p.charAt(1)===`=`?fr(h,p)-h:parseFloat(p)-h,m:f&&f<4?Math.round:0},c=Fn.lastIndex);return s.c=c<r.length?r.substring(c,r.length):``,s.fp=o,(In.test(r)||g)&&(s.e=0),this._pt=s,s},Qi=function(e,t,n,r,i,a,o,s,c,l){G(r)&&(r=r(i||0,e,a));var u=e[t],d=n===`get`?G(u)?c?e[t.indexOf(`set`)||!G(e[`get`+t.substr(3)])?t:`get`+t.substr(3)](c):e[t]():u:n,f=G(u)?c?fa:da:ua,p;if(xn(r)&&(~r.indexOf(`random(`)&&(r=_i(r)),r.charAt(1)===`=`&&(p=fr(d,r)+($r(d)||0),(p||p===0)&&(r=p))),!l||d!==r||na)return!isNaN(d*r)&&r!==``?(p=new Ca(this._pt,e,t,+d||0,r-(d||0),typeof u==`boolean`?ga:ha,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!u&&!(t in e)&&Kn(t,r),Zi.call(this,e,t,d,r,f,s||un.stringFilter,c))},$i=function(e,t,n,r,i){if(G(e)&&(e=sa(e,i,t,n,r)),!wn(e)||e.style&&e.nodeType||kn(e)||On(e))return xn(e)?sa(e,i,t,n,r):e;var a={},o;for(o in e)a[o]=sa(e[o],i,t,n,r);return a},ea=function(e,t,n,r,i,a){var o,s,c,l;if(rr[e]&&(o=new rr[e]).init(i,o.rawVars?t[e]:$i(t[e],r,i,a,n),n,r,a)!==!1&&(n._pt=s=new Ca(n._pt,i,e,0,1,o.render,o,0,o.priority),n!==Ci))for(c=n._ptLookup[n._targets.indexOf(i)],l=o._props.length;l--;)c[o._props[l]]=s;return o},ta,na,ra=function e(t,n,r){var i=t.vars,a=i.ease,o=i.startAt,s=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,p=i.autoRevert,m=t._dur,h=t._startAt,g=t._targets,_=t.parent,v=_&&_.data===`nested`?_.vars.targets:g,y=t._overwrite===`auto`&&!fn,b=t.timeline,x=i.easeReverse||d,S,C,w,T,E,D,O,k,A,j,ee,te,ne;if(b&&(!f||!a)&&(a=`none`),t._ease=Ui(a,dn.ease),t._rEase=x&&(Ui(x)||t._ease),t._from=!b&&!!i.runBackwards,t._from&&(t.ratio=1),!b||f&&!i.stagger){if(k=g[0]?lr(g[0]).harness:0,te=k&&i[k.prop],S=Cr(i,$n),h&&(h._zTime<0&&h.progress(1),n<0&&u&&s&&!p?h.render(-1,!0):h.revert(u&&m?Zn:Xn),h._lazy=0),o){if(Or(t._startAt=Z.set(g,yr({data:`isStart`,overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&Tn(c),startAt:null,delay:0,onUpdate:l&&function(){return xi(t,`onUpdate`)},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,n<0&&(pn||!s&&!p)&&t._startAt.revert(Zn),s&&m&&n<=0&&r<=0){n&&(t._zTime=n);return}}else if(u&&m&&!h){if(n&&(s=!1),w=yr({overwrite:!1,data:`isFromStart`,lazy:s&&!h&&Tn(c),immediateRender:s,stagger:0,parent:_},S),te&&(w[k.prop]=te),Or(t._startAt=Z.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,n<0&&(pn?t._startAt.revert(Zn):t._startAt.render(-1,!0)),t._zTime=n,!s)e(t._startAt,W,W);else if(!n)return}for(t._pt=t._ptCache=0,c=m&&Tn(c)||c&&!m,C=0;C<g.length;C++){if(E=g[C],O=E._gsap||cr(g)[C]._gsap,t._ptLookup[C]=j={},tr[O.id]&&er.length&&mr(),ee=v===g?C:v.indexOf(E),k&&(A=new k).init(E,te||S,t,ee,v)!==!1&&(t._pt=T=new Ca(t._pt,E,A.name,0,1,A.render,A,0,A.priority),A._props.forEach(function(e){j[e]=T}),A.priority&&(D=1)),!k||te)for(w in S)rr[w]&&(A=ea(w,S,t,ee,E,v))?A.priority&&(D=1):j[w]=T=Qi.call(t,E,w,`get`,S[w],ee,v,0,i.stringFilter);t._op&&t._op[C]&&t.kill(E,t._op[C]),y&&t._pt&&(ta=t,K.killTweensOf(E,j,t.globalTime(n)),ne=!t.parent,ta=0),t._pt&&c&&(tr[O.id]=1)}D&&Sa(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!ne,f&&n<=0&&b.render(mn,!0,!0)},ia=function(e,t,n,r,i,a,o,s){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],l,u,d,f;if(!c)for(c=e._ptCache[t]=[],d=e._ptLookup,f=e._targets.length;f--;){if(l=d[f][t],l&&l.d&&l.d._pt)for(l=l.d._pt;l&&l.p!==t&&l.fp!==t;)l=l._next;if(!l)return na=1,e.vars[t]=`+=0`,ra(e,o),na=0,s?qn(t+` not eligible for reset. Try splitting into individual properties`):1;c.push(l)}for(f=c.length;f--;)u=c[f],l=u._pt||u,l.s=(r||r===0)&&!i?r:l.s+(r||0)+a*l.c,l.c=n-l.s,u.e&&(u.e=q(n)+$r(u.e)),u.b&&(u.b=l.s+$r(u.b))},aa=function(e,t){var n=e[0]?lr(e[0]).harness:0,r=n&&n.aliases,i,a,o,s;if(!r)return t;for(a in i=xr({},t),r)if(a in i)for(s=r[a].split(`,`),o=s.length;o--;)i[s[o]]=i[a];return i},oa=function(e,t,n,r){var i=t.ease||r||`power1.inOut`,a,o;if(kn(t))o=n[e]||(n[e]=[]),t.forEach(function(e,n){return o.push({t:n/(t.length-1)*100,v:e,e:i})});else for(a in t)o=n[a]||(n[a]=[]),a===`ease`||o.push({t:parseFloat(e),v:t[a],e:i})},sa=function(e,t,n,r,i){return G(e)?e.call(t,n,r,i):xn(e)&&~e.indexOf(`random(`)?_i(e):e},ca=sr+`repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert`,la={};dr(ca+`,id,stagger,delay,duration,paused,scrollTrigger`,function(e){return la[e]=1});var Z=function(e){ln(t,e);function t(t,n,r,i){var a;typeof n==`number`&&(r.duration=n,n=r,r=null),a=e.call(this,i?n:wr(n))||this;var o=a.vars,s=o.duration,c=o.delay,l=o.immediateRender,u=o.stagger,d=o.overwrite,f=o.keyframes,p=o.defaults,m=o.scrollTrigger,h=n.parent||K,g=(kn(t)||On(t)?Sn(t[0]):`length`in n)?[t]:ii(t),_,v,y,b,x,S,C,w;if(a._targets=g.length?cr(g):qn(`GSAP target `+t+` not found. https://gsap.com`,!un.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,f||u||Dn(s)||Dn(c)){n=a.vars;var T=n.easeReverse||n.yoyoEase;if(_=a.timeline=new Xi({data:`nested`,defaults:p||{},targets:h&&h.data===`nested`?h.vars.targets:g}),_.kill(),_.parent=_._dp=cn(a),_._start=0,u||Dn(s)||Dn(c)){if(b=g.length,C=u&&si(u),wn(u))for(x in u)~ca.indexOf(x)&&(w||={},w[x]=u[x]);for(v=0;v<b;v++)y=Cr(n,la),y.stagger=0,T&&(y.easeReverse=T),w&&xr(y,w),S=g[v],y.duration=+sa(s,cn(a),v,S,g),y.delay=(+sa(c,cn(a),v,S,g)||0)-a._delay,!u&&b===1&&y.delay&&(a._delay=c=y.delay,a._start+=c,y.delay=0),_.to(S,y,C?C(v,S,g):0),_._ease=X.none;_.duration()?s=c=0:a.timeline=0}else if(f){wr(yr(_.vars.defaults,{ease:`none`})),_._ease=Ui(f.ease||n.ease||`none`);var E=0,D,O,k;if(kn(f))f.forEach(function(e){return _.to(g,e,`>`)}),_.duration();else{for(x in y={},f)x===`ease`||x===`easeEach`||oa(x,f[x],y,f.easeEach);for(x in y)for(D=y[x].sort(function(e,t){return e.t-t.t}),E=0,v=0;v<D.length;v++)O=D[v],k={ease:O.e,duration:(O.t-(v?D[v-1].t:0))/100*s},k[x]=O.v,_.to(g,k,E),E+=k.duration;_.duration()<s&&_.to({},{duration:s-_.duration()})}}s||a.duration(s=_.duration())}else a.timeline=0;return d===!0&&!fn&&(ta=cn(a),K.killTweensOf(g),ta=0),zr(h,cn(a),r),n.reversed&&a.reverse(),n.paused&&a.paused(!0),(l||!s&&!f&&a._start===J(h._time)&&Tn(l)&&Mr(cn(a))&&h.data!==`nested`)&&(a._tTime=-W,a.render(Math.max(0,-c)||0)),m&&Br(cn(a),m),a}var n=t.prototype;return n.render=function(e,t,n){var r=this._time,i=this._tDur,a=this._dur,o=e<0,s=e>i-W&&!o?i:e<W?0:e,c,l,u,d,f,p,m,h;if(!a)Wr(this,e,t,n);else if(s!==this._tTime||!e||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==o||this._lazy){if(c=s,h=this.timeline,this._repeat){if(d=a+this._rDelay,this._repeat<-1&&o)return this.totalTime(d*100+e,t,n);if(c=J(s%d),s===i?(u=this._repeat,c=a):(f=J(s/d),u=~~f,u&&u===f?(c=a,u--):c>a&&(c=a)),p=this._yoyo&&u&1,p&&(c=a-c),f=Pr(this._tTime,d),c===r&&!n&&this._initted&&u===f)return this._tTime=s,this;u!==f&&this.vars.repeatRefresh&&!p&&!this._lock&&c!==d&&this._initted&&(this._lock=n=1,this.render(J(d*u),!0).invalidate()._lock=0)}if(!this._initted){if(Vr(this,o?e:c,n,t,s))return this._tTime=0,this;if(r!==this._time&&!(n&&this.vars.repeatRefresh&&u!==f))return this;if(a!==this._dur)return this.render(e,t,n)}if(this._rEase){var g=c<r;if(g!==this._inv){var _=g?r:a-r;this._inv=g,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=r,this._invRecip=_?(g?-1:1)/_:0,this._invScale=g?-this.ratio:1-this.ratio,this._invEase=g?this._rEase:this._ease}this.ratio=m=this._invRatio+this._invScale*this._invEase((c-this._invTime)*this._invRecip)}else this.ratio=m=this._ease(c/a);if(this._from&&(this.ratio=m=1-m),this._tTime=s,this._time=c,!this._act&&this._ts&&(this._act=1,this._lazy=0),!r&&s&&!t&&!f&&(xi(this,`onStart`),this._tTime!==s))return this;for(l=this._pt;l;)l.r(m,l.d),l=l._next;h&&h.render(e<0?e:h._dur*h._ease(c/this._dur),t,n)||this._startAt&&(this._zTime=e),this._onUpdate&&!t&&(o&&jr(this,e,t,n),xi(this,`onUpdate`)),this._repeat&&u!==f&&this.vars.onRepeat&&!t&&this.parent&&xi(this,`onRepeat`),(s===this._tDur||!s)&&this._tTime===s&&(o&&!this._onUpdate&&jr(this,e,!0,!0),(e||!a)&&(s===this._tDur&&this._ts>0||!s&&this._ts<0)&&Or(this,1),!t&&(!o||r)&&(s||r||p)&&(xi(this,s===i?`onComplete`:`onReverseComplete`,!0),this._prom&&!(s<i&&this.timeScale()>0)&&this._prom()))}return this},n.targets=function(){return this._targets},n.invalidate=function(t){return(!t||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),e.prototype.invalidate.call(this,t)},n.resetTo=function(e,t,n,r,i){Pi||Fi.wake(),this._ts||this.play();var a=Math.min(this._dur,(this._dp._time-this._start)*this._ts),o;return this._initted||ra(this,a),o=this._ease(a/this._dur),ia(this,e,t,n,r,o,a,i)?this.resetTo(e,t,n,r,1):(Lr(this,0),this.parent||Er(this._dp,this,`_first`,`_last`,this._dp._sort?`_start`:0),this.render(0))},n.kill=function(e,t){if(t===void 0&&(t=`all`),!e&&(!t||t===`all`))return this._lazy=this._pt=0,this.parent?Si(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pn),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(e,t,ta&&ta.vars.overwrite!==!0)._first||Si(this),this.parent&&n!==this.timeline.totalDuration()&&Kr(this,this._dur*this.timeline._tDur/n,0,1),this}var r=this._targets,i=e?ii(e):r,a=this._ptLookup,o=this._pt,s,c,l,u,d,f,p;if((!t||t===`all`)&&Tr(r,i))return t===`all`&&(this._pt=0),Si(this);for(s=this._op=this._op||[],t!==`all`&&(xn(t)&&(d={},dr(t,function(e){return d[e]=1}),t=d),t=aa(r,t)),p=r.length;p--;)if(~i.indexOf(r[p]))for(d in c=a[p],t===`all`?(s[p]=t,u=c,l={}):(l=s[p]=s[p]||{},u=t),u)f=c&&c[d],f&&((!(`kill`in f.d)||f.d.kill(d)===!0)&&Dr(this,f,`_pt`),delete c[d]),l!==`all`&&(l[d]=1);return this._initted&&!this._pt&&o&&Si(this),this},t.to=function(e,n){return new t(e,n,arguments[2])},t.from=function(e,t){return Xr(1,arguments)},t.delayedCall=function(e,n,r,i){return new t(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:e,onComplete:n,onReverseComplete:n,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},t.fromTo=function(e,t,n){return Xr(2,arguments)},t.set=function(e,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new t(e,n)},t.killTweensOf=function(e,t,n){return K.killTweensOf(e,t,n)},t}(Yi);yr(Z.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),dr(`staggerTo,staggerFrom,staggerFromTo`,function(e){Z[e]=function(){var t=new Xi,n=ti.call(arguments,0);return n.splice(e===`staggerFromTo`?5:4,0,0),t[e].apply(t,n)}});var ua=function(e,t,n){return e[t]=n},da=function(e,t,n){return e[t](n)},fa=function(e,t,n,r){return e[t](r.fp,n)},pa=function(e,t,n){return e.setAttribute(t,n)},ma=function(e,t){return G(e[t])?da:Cn(e[t])&&e.setAttribute?pa:ua},ha=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},ga=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},_a=function(e,t){var n=t._pt,r=``;if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},va=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ya=function(e,t,n,r){for(var i=this._pt,a;i;)a=i._next,i.p===r&&i.modifier(e,t,n),i=a},ba=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Dr(this,t,`_pt`):t.dep||(n=1),t=r;return!n},xa=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},Sa=function(e){for(var t=e._pt,n,r,i,a;t;){for(n=t._next,r=i;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:i=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=i},Ca=function(){function e(e,t,n,r,i,a,o,s,c){this.t=t,this.s=r,this.c=i,this.p=n,this.r=a||ha,this.d=o||this,this.set=s||ua,this.pr=c||0,this._next=e,e&&(e._prev=this)}var t=e.prototype;return t.modifier=function(e,t,n){this.mSet=this.mSet||this.set,this.set=xa,this.m=e,this.mt=n,this.tween=t},e}();dr(sr+`parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse`,function(e){return $n[e]=1}),Hn.TweenMax=Hn.TweenLite=Z,Hn.TimelineLite=Hn.TimelineMax=Xi,K=new Xi({sortChildren:!1,defaults:dn,autoRemoveChildren:!0,id:`root`,smoothChildTiming:!0}),un.stringFilter=Ni;var wa=[],Ta={},Ea=[],Da=0,Oa=0,ka=function(e){return(Ta[e]||Ea).map(function(e){return e()})},Aa=function(){var e=Date.now(),t=[];e-Da>2&&(ka(`matchMediaInit`),wa.forEach(function(e){var n=e.queries,r=e.conditions,i,a,o,s;for(a in n)i=zn.matchMedia(n[a]).matches,i&&(o=1),i!==r[a]&&(r[a]=i,s=1);s&&(e.revert(),o&&t.push(e))}),ka(`matchMediaRevert`),t.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Da=e,ka(`matchMedia`))},ja=function(){function e(e,t){this.selector=t&&ai(t),this.data=[],this._r=[],this.isReverted=!1,this.id=Oa++,e&&this.add(e)}var t=e.prototype;return t.add=function(e,t,n){G(e)&&(n=t,t=e,e=G);var r=this,i=function(){var e=U,i=r.selector,a;return e&&e!==r&&e.data.push(r),n&&(r.selector=ai(n)),U=r,a=t.apply(r,arguments),G(a)&&r._r.push(a),U=e,r.selector=i,r.isReverted=!1,a};return r.last=i,e===G?i(r,function(e){return r.add(null,e)}):e?r[e]=i:i},t.ignore=function(e){var t=U;U=null,e(this),U=t},t.getTweens=function(){var t=[];return this.data.forEach(function(n){return n instanceof e?t.push.apply(t,n.getTweens()):n instanceof Z&&!(n.parent&&n.parent.data===`nested`)&&t.push(n)}),t},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(e,t){var n=this;if(e?(function(){for(var t=n.getTweens(),r=n.data.length,i;r--;)i=n.data[r],i.data===`isFlip`&&(i.revert(),i.getChildren(!0,!0,!1).forEach(function(e){return t.splice(t.indexOf(e),1)}));for(t.map(function(e){return{g:e._dur||e._delay||e._sat&&!e._sat.vars.immediateRender?e.globalTime(0):-1/0,t:e}}).sort(function(e,t){return t.g-e.g||-1/0}).forEach(function(t){return t.t.revert(e)}),r=n.data.length;r--;)i=n.data[r],i instanceof Xi?i.data!==`nested`&&(i.scrollTrigger&&i.scrollTrigger.revert(),i.kill()):!(i instanceof Z)&&i.revert&&i.revert(e);n._r.forEach(function(t){return t(e,n)}),n.isReverted=!0})():this.data.forEach(function(e){return e.kill&&e.kill()}),this.clear(),t)for(var r=wa.length;r--;)wa[r].id===this.id&&wa.splice(r,1)},t.revert=function(e){this.kill(e||{})},e}(),Ma=function(){function e(e){this.contexts=[],this.scope=e,U&&U.data.push(this)}var t=e.prototype;return t.add=function(e,t,n){wn(e)||(e={matches:e});var r=new ja(0,n||this.scope),i=r.conditions={},a,o,s;for(o in U&&!r.selector&&(r.selector=U.selector),this.contexts.push(r),t=r.add(`onMatch`,t),r.queries=e,e)o===`all`?s=1:(a=zn.matchMedia(e[o]),a&&(wa.indexOf(r)<0&&wa.push(r),(i[o]=a.matches)&&(s=1),a.addListener?a.addListener(Aa):a.addEventListener(`change`,Aa)));return s&&t(r,function(e){return r.add(null,e)}),this},t.revert=function(e){this.kill(e||{})},t.kill=function(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},e}(),Na={registerPlugin:function(){[...arguments].forEach(function(e){return Ti(e)})},timeline:function(e){return new Xi(e)},getTweensOf:function(e,t){return K.getTweensOf(e,t)},getProperty:function(e,t,n,r){xn(e)&&(e=ii(e)[0]);var i=lr(e||{}).get,a=n?vr:_r;return n===`native`&&(n=``),e&&(t?a((rr[t]&&rr[t].get||i)(e,t,n,r)):function(t,n,r){return a((rr[t]&&rr[t].get||i)(e,t,n,r))})},quickSetter:function(e,t,n){if(e=ii(e),e.length>1){var r=e.map(function(e){return La.quickSetter(e,t,n)}),i=r.length;return function(e){for(var t=i;t--;)r[t](e)}}e=e[0]||{};var a=rr[t],o=lr(e),s=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(t){var r=new a;Ci._pt=0,r.init(e,n?t+n:t,Ci,0,[e]),r.render(1,r),Ci._pt&&va(1,Ci)}:o.set(e,s);return a?c:function(t){return c(e,s,n?t+n:t,o,1)}},quickTo:function(e,t,n){var r,i=La.to(e,yr((r={},r[t]=`+=0.1`,r.paused=!0,r.stagger=0,r),n||{})),a=function(e,n,r){return i.resetTo(t,e,n,r)};return a.tween=i,a},isTweening:function(e){return K.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ui(e.ease,dn.ease)),Sr(dn,e||{})},config:function(e){return Sr(un,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,i=e.defaults,a=e.extendTimeline;(r||``).split(`,`).forEach(function(e){return e&&!rr[e]&&!Hn[e]&&qn(t+` effect requires `+e+` plugin.`)}),ir[t]=function(e,t,r){return n(ii(e),yr(t||{},i),r)},a&&(Xi.prototype[t]=function(e,n,r){return this.add(ir[t](e,wn(n)?n:(r=n)&&{},this),r)})},registerEase:function(e,t){X[e]=Ui(t)},parseEase:function(e,t){return arguments.length?Ui(e,t):X},getById:function(e){return K.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Xi(e),r,i;for(n.smoothChildTiming=Tn(e.smoothChildTiming),K.remove(n),n._dp=0,n._time=n._tTime=K._time,r=K._first;r;)i=r._next,(t||!(!r._dur&&r instanceof Z&&r.vars.onComplete===r._targets[0]))&&zr(n,r,r._start-r._delay),r=i;return zr(K,n,0),n},context:function(e,t){return e?new ja(e,t):U},matchMedia:function(e){return new Ma(e)},matchMediaRefresh:function(){return wa.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||Aa()},addEventListener:function(e,t){var n=Ta[e]||(Ta[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Ta[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:hi,wrapYoyo:gi,distribute:si,random:ui,snap:li,normalize:pi,getUnit:$r,clamp:ei,splitColor:Oi,toArray:ii,selector:ai,mapRange:vi,pipe:di,unitize:fi,interpolate:yi,shuffle:oi},install:Gn,effects:ir,ticker:Fi,updateRoot:Xi.updateRoot,plugins:rr,globalTimeline:K,core:{PropTween:Ca,globals:Jn,Tween:Z,Timeline:Xi,Animation:Yi,getCache:lr,_removeLinkedListItem:Dr,reverting:function(){return pn},context:function(e){return e&&U&&(U.data.push(e),e._ctx=U),U},suppressOverwrites:function(e){return fn=e}}};dr(`to,from,fromTo,delayedCall,set,killTweensOf`,function(e){return Na[e]=Z[e]}),Fi.add(Xi.updateRoot),Ci=Na.to({},{duration:0});var Pa=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Fa=function(e,t){var n=e._targets,r,i,a;for(r in t)for(i=n.length;i--;)a=e._ptLookup[i][r],(a&&=a.d)&&(a._pt&&(a=Pa(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[i],r))},Ia=function(e,t){return{name:e,headless:1,rawVars:1,init:function(e,n,r){r._onInit=function(e){var r,i;if(xn(n)&&(r={},dr(n,function(e){return r[e]=1}),n=r),t){for(i in r={},n)r[i]=t(n[i]);n=r}Fa(e,n)}}}},La=Na.registerPlugin({name:`attr`,init:function(e,t,n,r,i){var a,o,s;for(a in this.tween=n,t)s=e.getAttribute(a)||``,o=this.add(e,`setAttribute`,(s||0)+``,t[a],r,i,0,0,a),o.op=a,o.b=s,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)pn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:`endArray`,headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ia(`roundProps`,ci),Ia(`modifiers`),Ia(`snap`,li))||Na;Z.version=Xi.version=La.version=`3.15.0`,Wn=1,En()&&Ii(),X.Power0,X.Power1,X.Power2,X.Power3,X.Power4,X.Linear,X.Quad,X.Cubic,X.Quart,X.Quint,X.Strong,X.Elastic,X.Back,X.SteppedEase,X.Bounce,X.Sine,X.Expo,X.Circ;var Ra,za,Ba,Va,Ha,Ua,Wa,Ga=function(){return typeof window<`u`},Ka={},qa=180/Math.PI,Ja=Math.PI/180,Ya=Math.atan2,Xa=1e8,Za=/([A-Z])/g,Qa=/(left|right|width|margin|padding|x)/i,$a=/[\s,\(]\S/,eo={autoAlpha:`opacity,visibility`,scale:`scaleX,scaleY`,alpha:`opacity`},to=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},no=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ro=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},io=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ao=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},oo=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},so=function(e,t){return t.set(t.t,t.p,e===1?t.e:t.b,t)},co=function(e,t,n){return e.style[t]=n},lo=function(e,t,n){return e.style.setProperty(t,n)},uo=function(e,t,n){return e._gsap[t]=n},fo=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},po=function(e,t,n,r,i){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(i,a)},mo=function(e,t,n,r,i){var a=e._gsap;a[t]=n,a.renderTransform(i,a)},Q=`transform`,ho=Q+`Origin`,go=function e(t,n){var r=this,i=this.target,a=i.style,o=i._gsap;if(t in Ka&&a){if(this.tfm=this.tfm||{},t!==`transform`)t=eo[t]||t,~t.indexOf(`,`)?t.split(`,`).forEach(function(e){return r.tfm[e]=Fo(i,e)}):this.tfm[t]=o.x?o[t]:Fo(i,t),t===ho&&(this.tfm.zOrigin=o.zOrigin);else return eo.transform.split(`,`).forEach(function(t){return e.call(r,t,n)});if(this.props.indexOf(Q)>=0)return;o.svg&&(this.svgo=i.getAttribute(`data-svg-origin`),this.props.push(ho,n,``)),t=Q}(a||n)&&this.props.push(t,n,a[t])},_o=function(e){e.translate&&(e.removeProperty(`translate`),e.removeProperty(`scale`),e.removeProperty(`rotate`))},vo=function(){for(var e=this.props,t=this.target,n=t.style,r=t._gsap,i=0,a;i<e.length;i+=3)e[i+1]?e[i+1]===2?t[e[i]](e[i+2]):t[e[i]]=e[i+2]:e[i+2]?n[e[i]]=e[i+2]:n.removeProperty(e[i].substr(0,2)===`--`?e[i]:e[i].replace(Za,`-$1`).toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute(`data-svg-origin`,this.svgo||``)),i=Wa(),(!i||!i.isStart)&&!n[Q]&&(_o(n),r.zOrigin&&n[ho]&&(n[ho]+=` `+r.zOrigin+`px`,r.zOrigin=0,r.renderTransform()),r.uncache=1)}},yo=function(e,t){var n={target:e,props:[],revert:vo,save:go};return e._gsap||La.core.getCache(e),t&&e.style&&e.nodeType&&t.split(`,`).forEach(function(e){return n.save(e)}),n},bo,xo=function(e,t){var n=za.createElementNS?za.createElementNS((t||`http://www.w3.org/1999/xhtml`).replace(/^https/,`http`),e):za.createElement(e);return n&&n.style?n:za.createElement(e)},So=function e(t,n,r){var i=getComputedStyle(t);return i[n]||i.getPropertyValue(n.replace(Za,`-$1`).toLowerCase())||i.getPropertyValue(n)||!r&&e(t,wo(n)||n,1)||``},Co=`O,Moz,ms,Ms,Webkit`.split(`,`),wo=function(e,t,n){var r=(t||Ha).style,i=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(Co[i]+e in r););return i<0?null:(i===3?`ms`:i>=0?Co[i]:``)+e},To=function(){Ga()&&window.document&&(Ra=window,za=Ra.document,Ba=za.documentElement,Ha=xo(`div`)||{style:{}},xo(`div`),Q=wo(Q),ho=Q+`Origin`,Ha.style.cssText=`border-width:0;line-height:0;position:absolute;padding:0`,bo=!!wo(`perspective`),Wa=La.core.reverting,Va=1)},Eo=function(e){var t=e.ownerSVGElement,n=xo(`svg`,t&&t.getAttribute(`xmlns`)||`http://www.w3.org/2000/svg`),r=e.cloneNode(!0),i;r.style.display=`block`,n.appendChild(r),Ba.appendChild(n);try{i=r.getBBox()}catch{}return n.removeChild(r),Ba.removeChild(n),i},Do=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Oo=function(e){var t,n;try{t=e.getBBox()}catch{t=Eo(e),n=1}return t&&(t.width||t.height)||n||(t=Eo(e)),t&&!t.width&&!t.x&&!t.y?{x:+Do(e,[`x`,`cx`,`x1`])||0,y:+Do(e,[`y`,`cy`,`y1`])||0,width:0,height:0}:t},ko=function(e){return!(!e.getCTM||e.parentNode&&!e.ownerSVGElement||!Oo(e))},Ao=function(e,t){if(t){var n=e.style,r;t in Ka&&t!==ho&&(t=Q),n.removeProperty?(r=t.substr(0,2),(r===`ms`||t.substr(0,6)===`webkit`)&&(t=`-`+t),n.removeProperty(r===`--`?t:t.replace(Za,`-$1`).toLowerCase())):n.removeAttribute(t)}},jo=function(e,t,n,r,i,a){var o=new Ca(e._pt,t,n,0,1,a?so:oo);return e._pt=o,o.b=r,o.e=i,e._props.push(n),o},Mo={deg:1,rad:1,turn:1},No={grid:1,flex:1},Po=function e(t,n,r,i){var a=parseFloat(r)||0,o=(r+``).trim().substr((a+``).length)||`px`,s=Ha.style,c=Qa.test(n),l=t.tagName.toLowerCase()===`svg`,u=(l?`client`:`offset`)+(c?`Width`:`Height`),d=100,f=i===`px`,p=i===`%`,m,h,g,_;if(i===o||!a||Mo[i]||Mo[o])return a;if(o!==`px`&&!f&&(a=e(t,n,r,`px`)),_=t.getCTM&&ko(t),(p||o===`%`)&&(Ka[n]||~n.indexOf(`adius`)))return m=_?t.getBBox()[c?`width`:`height`]:t[u],q(p?a/m*d:a/100*m);if(s[c?`width`:`height`]=d+(f?o:i),h=i!==`rem`&&~n.indexOf(`adius`)||i===`em`&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===za||!h.appendChild)&&(h=za.body),g=h._gsap,g&&p&&g.width&&c&&g.time===Fi.time&&!g.uncache)return q(a/g.width*d);if(p&&(n===`height`||n===`width`)){var v=t.style[n];t.style[n]=d+i,m=t[u],v?t.style[n]=v:Ao(t,n)}else(p||o===`%`)&&!No[So(h,`display`)]&&(s.position=So(t,`position`)),h===t&&(s.position=`static`),h.appendChild(Ha),m=Ha[u],h.removeChild(Ha),s.position=`absolute`;return c&&p&&(g=lr(h),g.time=Fi.time,g.width=h[u]),q(f?m*a/d:m&&a?d/m*a:0)},Fo=function(e,t,n,r){var i;return Va||To(),t in eo&&t!==`transform`&&(t=eo[t],~t.indexOf(`,`)&&(t=t.split(`,`)[0])),Ka[t]&&t!==`transform`?(i=qo(e,r),i=t===`transformOrigin`?i.svg?i.origin:Jo(So(e,ho))+` `+i.zOrigin+`px`:i[t]):(i=e.style[t],(!i||i===`auto`||r||~(i+``).indexOf(`calc(`))&&(i=Bo[t]&&Bo[t](e,t,n)||So(e,t)||ur(e,t)||+(t===`opacity`))),n&&!~(i+``).trim().indexOf(` `)?Po(e,t,i,n)+n:i},Io=function(e,t,n,r){if(!n||n===`none`){var i=wo(t,e,1),a=i&&So(e,i,1);a&&a!==n?(t=i,n=a):t===`borderColor`&&(n=So(e,`borderTopColor`))}var o=new Ca(this._pt,e.style,t,0,1,_a),s=0,c=0,l,u,d,f,p,m,h,g,_,v,y,b;if(o.b=n,o.e=r,n+=``,r+=``,r.substring(0,6)===`var(--`&&(r=So(e,r.substring(4,r.indexOf(`)`)))),r===`auto`&&(m=e.style[t],e.style[t]=r,r=So(e,t)||r,m?e.style[t]=m:Ao(e,t)),l=[n,r],Ni(l),n=l[0],r=l[1],d=n.match(Pn)||[],b=r.match(Pn)||[],b.length){for(;u=Pn.exec(r);)h=u[0],_=r.substring(s,u.index),p?p=(p+1)%5:(_.substr(-5)===`rgba(`||_.substr(-5)===`hsla(`)&&(p=1),h!==(m=d[c++]||``)&&(f=parseFloat(m)||0,y=m.substr((f+``).length),h.charAt(1)===`=`&&(h=fr(f,h)+y),g=parseFloat(h),v=h.substr((g+``).length),s=Pn.lastIndex-v.length,v||(v=v||un.units[t]||y,s===r.length&&(r+=v,o.e+=v)),y!==v&&(f=Po(e,t,m,v)||0),o._pt={_next:o._pt,p:_||c===1?_:`,`,s:f,c:g-f,m:p&&p<4||t===`zIndex`?Math.round:0});o.c=s<r.length?r.substring(s,r.length):``}else o.r=t===`display`&&r===`none`?so:oo;return In.test(r)&&(o.e=0),this._pt=o,o},Lo={top:`0%`,bottom:`100%`,left:`0%`,right:`100%`,center:`50%`},Ro=function(e){var t=e.split(` `),n=t[0],r=t[1]||`50%`;return(n===`top`||n===`bottom`||r===`left`||r===`right`)&&(e=n,n=r,r=e),t[0]=Lo[n]||n,t[1]=Lo[r]||r,t.join(` `)},zo=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,i=t.u,a=n._gsap,o,s,c;if(i===`all`||i===!0)r.cssText=``,s=1;else for(i=i.split(`,`),c=i.length;--c>-1;)o=i[c],Ka[o]&&(s=1,o=o===`transformOrigin`?ho:Q),Ao(n,o);s&&(Ao(n,Q),a&&(a.svg&&n.removeAttribute(`transform`),r.scale=r.rotate=r.translate=`none`,qo(n,1),a.uncache=1,_o(r)))}},Bo={clearProps:function(e,t,n,r,i){if(i.data!==`isFromStart`){var a=e._pt=new Ca(e._pt,t,n,0,0,zo);return a.u=r,a.pr=-10,a.tween=i,e._props.push(n),1}}},Vo=[1,0,0,1,0,0],Ho={},Uo=function(e){return e===`matrix(1, 0, 0, 1, 0, 0)`||e===`none`||!e},Wo=function(e){var t=So(e,Q);return Uo(t)?Vo:t.substr(7).match(Nn).map(q)},Go=function(e,t){var n=e._gsap||lr(e),r=e.style,i=Wo(e),a,o,s,c;return n.svg&&e.getAttribute(`transform`)?(s=e.transform.baseVal.consolidate().matrix,i=[s.a,s.b,s.c,s.d,s.e,s.f],i.join(`,`)===`1,0,0,1,0,0`?Vo:i):(i===Vo&&!e.offsetParent&&e!==Ba&&!n.svg&&(s=r.display,r.display=`block`,a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Ba.appendChild(e)),i=Wo(e),s?r.display=s:Ao(e,`display`),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ba.removeChild(e))),t&&i.length>6?[i[0],i[1],i[4],i[5],i[12],i[13]]:i)},Ko=function(e,t,n,r,i,a){var o=e._gsap,s=i||Go(e,!0),c=o.xOrigin||0,l=o.yOrigin||0,u=o.xOffset||0,d=o.yOffset||0,f=s[0],p=s[1],m=s[2],h=s[3],g=s[4],_=s[5],v=t.split(` `),y=parseFloat(v[0])||0,b=parseFloat(v[1])||0,x,S,C,w;n?s!==Vo&&(S=f*h-p*m)&&(C=h/S*y+b*(-m/S)+(m*_-h*g)/S,w=y*(-p/S)+f/S*b-(f*_-p*g)/S,y=C,b=w):(x=Oo(e),y=x.x+(~v[0].indexOf(`%`)?y/100*x.width:y),b=x.y+(~(v[1]||v[0]).indexOf(`%`)?b/100*x.height:b)),r||r!==!1&&o.smooth?(g=y-c,_=b-l,o.xOffset=u+(g*f+_*m)-g,o.yOffset=d+(g*p+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=b,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[ho]=`0px 0px`,a&&(jo(a,o,`xOrigin`,c,y),jo(a,o,`yOrigin`,l,b),jo(a,o,`xOffset`,u,o.xOffset),jo(a,o,`yOffset`,d,o.yOffset)),e.setAttribute(`data-svg-origin`,y+` `+b)},qo=function(e,t){var n=e._gsap||new Ji(e);if(`x`in n&&!t&&!n.uncache)return n;var r=e.style,i=n.scaleX<0,a=`px`,o=`deg`,s=getComputedStyle(e),c=So(e,ho)||`0`,l=u=d=m=h=g=_=v=y=0,u,d,f=p=1,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,ee,te,ne,re,ie,ae,oe,se,ce;return n.svg=!!(e.getCTM&&ko(e)),s.translate&&((s.translate!==`none`||s.scale!==`none`||s.rotate!==`none`)&&(r[Q]=(s.translate===`none`?``:`translate3d(`+(s.translate+` 0 0`).split(` `).slice(0,3).join(`, `)+`) `)+(s.rotate===`none`?``:`rotate(`+s.rotate+`) `)+(s.scale===`none`?``:`scale(`+s.scale.split(` `).join(`,`)+`) `)+(s[Q]===`none`?``:s[Q])),r.scale=r.rotate=r.translate=`none`),S=Go(e,n.svg),n.svg&&(n.uncache?(te=e.getBBox(),c=n.xOrigin-te.x+`px `+(n.yOrigin-te.y)+`px`,ee=``):ee=!t&&e.getAttribute(`data-svg-origin`),Ko(e,ee||c,!!ee||n.originIsAbsolute,n.smooth!==!1,S)),b=n.xOrigin||0,x=n.yOrigin||0,S!==Vo&&(E=S[0],D=S[1],O=S[2],k=S[3],l=A=S[4],u=j=S[5],S.length===6?(f=Math.sqrt(E*E+D*D),p=Math.sqrt(k*k+O*O),m=E||D?Ya(D,E)*qa:0,_=O||k?Ya(O,k)*qa+m:0,_&&(p*=Math.abs(Math.cos(_*Ja))),n.svg&&(l-=b-(b*E+x*O),u-=x-(b*D+x*k))):(ce=S[6],oe=S[7],re=S[8],ie=S[9],ae=S[10],se=S[11],l=S[12],u=S[13],d=S[14],C=Ya(ce,ae),h=C*qa,C&&(w=Math.cos(-C),T=Math.sin(-C),ee=A*w+re*T,te=j*w+ie*T,ne=ce*w+ae*T,re=A*-T+re*w,ie=j*-T+ie*w,ae=ce*-T+ae*w,se=oe*-T+se*w,A=ee,j=te,ce=ne),C=Ya(-O,ae),g=C*qa,C&&(w=Math.cos(-C),T=Math.sin(-C),ee=E*w-re*T,te=D*w-ie*T,ne=O*w-ae*T,se=k*T+se*w,E=ee,D=te,O=ne),C=Ya(D,E),m=C*qa,C&&(w=Math.cos(C),T=Math.sin(C),ee=E*w+D*T,te=A*w+j*T,D=D*w-E*T,j=j*w-A*T,E=ee,A=te),h&&Math.abs(h)+Math.abs(m)>359.9&&(h=m=0,g=180-g),f=q(Math.sqrt(E*E+D*D+O*O)),p=q(Math.sqrt(j*j+ce*ce)),C=Ya(A,j),_=Math.abs(C)>2e-4?C*qa:0,y=se?1/(se<0?-se:se):0),n.svg&&(ee=e.getAttribute(`transform`),n.forceCSS=e.setAttribute(`transform`,``)||!Uo(So(e,Q)),ee&&e.setAttribute(`transform`,ee))),Math.abs(_)>90&&Math.abs(_)<270&&(i?(f*=-1,_+=m<=0?180:-180,m+=m<=0?180:-180):(p*=-1,_+=_<=0?180:-180)),t||=n.uncache,n.x=l-((n.xPercent=l&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-l)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=u-((n.yPercent=u&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-u)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=d+a,n.scaleX=q(f),n.scaleY=q(p),n.rotation=q(m)+o,n.rotationX=q(h)+o,n.rotationY=q(g)+o,n.skewX=_+o,n.skewY=v+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(` `)[2])||!t&&n.zOrigin||0)&&(r[ho]=Jo(c)),n.xOffset=n.yOffset=0,n.force3D=un.force3D,n.renderTransform=n.svg?ts:bo?es:Xo,n.uncache=0,n},Jo=function(e){return(e=e.split(` `))[0]+` `+e[1]},Yo=function(e,t,n){var r=$r(t);return q(parseFloat(t)+parseFloat(Po(e,`x`,n+`px`,r)))+r},Xo=function(e,t){t.z=`0px`,t.rotationY=t.rotationX=`0deg`,t.force3D=0,es(e,t)},Zo=`0deg`,Qo=`0px`,$o=`) `,es=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.z,c=n.rotation,l=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,p=n.scaleX,m=n.scaleY,h=n.transformPerspective,g=n.force3D,_=n.target,v=n.zOrigin,y=``,b=g===`auto`&&e&&e!==1||g===!0;if(v&&(u!==Zo||l!==Zo)){var x=parseFloat(l)*Ja,S=Math.sin(x),C=Math.cos(x),w;x=parseFloat(u)*Ja,w=Math.cos(x),a=Yo(_,a,S*w*-v),o=Yo(_,o,-Math.sin(x)*-v),s=Yo(_,s,C*w*-v+v)}h!==Qo&&(y+=`perspective(`+h+$o),(r||i)&&(y+=`translate(`+r+`%, `+i+`%) `),(b||a!==Qo||o!==Qo||s!==Qo)&&(y+=s!==Qo||b?`translate3d(`+a+`, `+o+`, `+s+`) `:`translate(`+a+`, `+o+$o),c!==Zo&&(y+=`rotate(`+c+$o),l!==Zo&&(y+=`rotateY(`+l+$o),u!==Zo&&(y+=`rotateX(`+u+$o),(d!==Zo||f!==Zo)&&(y+=`skew(`+d+`, `+f+$o),(p!==1||m!==1)&&(y+=`scale(`+p+`, `+m+$o),_.style[Q]=y||`translate(0, 0)`},ts=function(e,t){var n=t||this,r=n.xPercent,i=n.yPercent,a=n.x,o=n.y,s=n.rotation,c=n.skewX,l=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,p=n.xOrigin,m=n.yOrigin,h=n.xOffset,g=n.yOffset,_=n.forceCSS,v=parseFloat(a),y=parseFloat(o),b,x,S,C,w;s=parseFloat(s),c=parseFloat(c),l=parseFloat(l),l&&(l=parseFloat(l),c+=l,s+=l),s||c?(s*=Ja,c*=Ja,b=Math.cos(s)*u,x=Math.sin(s)*u,S=Math.sin(s-c)*-d,C=Math.cos(s-c)*d,c&&(l*=Ja,w=Math.tan(c-l),w=Math.sqrt(1+w*w),S*=w,C*=w,l&&(w=Math.tan(l),w=Math.sqrt(1+w*w),b*=w,x*=w)),b=q(b),x=q(x),S=q(S),C=q(C)):(b=u,C=d,x=S=0),(v&&!~(a+``).indexOf(`px`)||y&&!~(o+``).indexOf(`px`))&&(v=Po(f,`x`,a,`px`),y=Po(f,`y`,o,`px`)),(p||m||h||g)&&(v=q(v+p-(p*b+m*S)+h),y=q(y+m-(p*x+m*C)+g)),(r||i)&&(w=f.getBBox(),v=q(v+r/100*w.width),y=q(y+i/100*w.height)),w=`matrix(`+b+`,`+x+`,`+S+`,`+C+`,`+v+`,`+y+`)`,f.setAttribute(`transform`,w),_&&(f.style[Q]=w)},ns=function(e,t,n,r,i){var a=360,o=xn(i),s=parseFloat(i)*(o&&~i.indexOf(`rad`)?qa:1)-r,c=r+s+`deg`,l,u;return o&&(l=i.split(`_`)[1],l===`short`&&(s%=a,s!==s%(a/2)&&(s+=s<0?a:-a)),l===`cw`&&s<0?s=(s+a*Xa)%a-~~(s/a)*a:l===`ccw`&&s>0&&(s=(s-a*Xa)%a-~~(s/a)*a)),e._pt=u=new Ca(e._pt,t,n,r,s,no),u.e=c,u.u=`deg`,e._props.push(n),u},rs=function(e,t){for(var n in t)e[n]=t[n];return e},is=function(e,t,n){var r=rs({},n._gsap),i=`perspective,force3D,transformOrigin,svgOrigin`,a=n.style,o,s,c,l,u,d,f,p;for(s in r.svg?(c=n.getAttribute(`transform`),n.setAttribute(`transform`,``),a[Q]=t,o=qo(n,1),Ao(n,Q),n.setAttribute(`transform`,c)):(c=getComputedStyle(n)[Q],a[Q]=t,o=qo(n,1),a[Q]=c),Ka)c=r[s],l=o[s],c!==l&&i.indexOf(s)<0&&(f=$r(c),p=$r(l),u=f===p?parseFloat(c):Po(n,s,c,p),d=parseFloat(l),e._pt=new Ca(e._pt,o,s,u,d-u,to),e._pt.u=p||0,e._props.push(s));rs(o,r)};dr(`padding,margin,Width,Radius`,function(e,t){var n=`Top`,r=`Right`,i=`Bottom`,a=`Left`,o=(t<3?[n,r,i,a]:[n+a,n+r,i+r,i+a]).map(function(n){return t<2?e+n:`border`+n+e});Bo[t>1?`border`+e:e]=function(e,t,n,r,i){var a,s;if(arguments.length<4)return a=o.map(function(t){return Fo(e,t,n)}),s=a.join(` `),s.split(a[0]).length===5?a[0]:s;a=(r+``).split(` `),s={},o.forEach(function(e,t){return s[e]=a[t]=a[t]||a[(t-1)/2|0]}),e.init(t,s,i)}});var as={name:`css`,register:To,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,i){var a=this._props,o=e.style,s=n.vars.startAt,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;for(m in Va||To(),this.styles=this.styles||yo(e),C=this.styles.props,this.tween=n,t)if(m!==`autoRound`&&(l=t[m],!(rr[m]&&ea(m,t,n,r,e,i)))){if(f=typeof l,p=Bo[m],f===`function`&&(l=l.call(n,r,e,i),f=typeof l),f===`string`&&~l.indexOf(`random(`)&&(l=_i(l)),p)p(this,e,m,l,n)&&(S=1);else if(m.substr(0,2)===`--`)c=(getComputedStyle(e).getPropertyValue(m)+``).trim(),l+=``,ji.lastIndex=0,ji.test(c)||(h=$r(c),g=$r(l),g?h!==g&&(c=Po(e,m,c,g)+g):h&&(l+=h)),this.add(o,`setProperty`,c,l,r,i,0,0,m),a.push(m),C.push(m,0,o[m]);else if(f!==`undefined`){if(s&&m in s?(c=typeof s[m]==`function`?s[m].call(n,r,e,i):s[m],xn(c)&&~c.indexOf(`random(`)&&(c=_i(c)),$r(c+``)||c===`auto`||(c+=un.units[m]||$r(Fo(e,m))||``),(c+``).charAt(1)===`=`&&(c=Fo(e,m))):c=Fo(e,m),d=parseFloat(c),_=f===`string`&&l.charAt(1)===`=`&&l.substr(0,2),_&&(l=l.substr(2)),u=parseFloat(l),m in eo&&(m===`autoAlpha`&&(d===1&&Fo(e,`visibility`)===`hidden`&&u&&(d=0),C.push(`visibility`,0,o.visibility),jo(this,o,`visibility`,d?`inherit`:`hidden`,u?`inherit`:`hidden`,!u)),m!==`scale`&&m!==`transform`&&(m=eo[m],~m.indexOf(`,`)&&(m=m.split(`,`)[0]))),v=m in Ka,v){if(this.styles.save(m),w=l,f===`string`&&l.substring(0,6)===`var(--`){if(l=So(e,l.substring(4,l.indexOf(`)`))),l.substring(0,5)===`calc(`){var T=e.style.perspective;e.style.perspective=l,l=So(e,`perspective`),T?e.style.perspective=T:Ao(e,`perspective`)}u=parseFloat(l)}if(y||(b=e._gsap,b.renderTransform&&!t.parseTransform||qo(e,t.parseTransform),x=t.smoothOrigin!==!1&&b.smooth,y=this._pt=new Ca(this._pt,o,Q,0,1,b.renderTransform,b,0,-1),y.dep=1),m===`scale`)this._pt=new Ca(this._pt,b,`scaleY`,b.scaleY,(_?fr(b.scaleY,_+u):u)-b.scaleY||0,to),this._pt.u=0,a.push(`scaleY`,m),m+=`X`;else if(m===`transformOrigin`){C.push(ho,0,o[ho]),l=Ro(l),b.svg?Ko(e,l,0,x,0,this):(g=parseFloat(l.split(` `)[2])||0,g!==b.zOrigin&&jo(this,b,`zOrigin`,b.zOrigin,g),jo(this,o,m,Jo(c),Jo(l)));continue}else if(m===`svgOrigin`){Ko(e,l,1,x,0,this);continue}else if(m in Ho){ns(this,b,m,d,_?fr(d,_+l):l);continue}else if(m===`smoothOrigin`){jo(this,b,`smooth`,b.smooth,l);continue}else if(m===`force3D`){b[m]=l;continue}else if(m===`transform`){is(this,l,e);continue}}else m in o||(m=wo(m)||m);if(v||(u||u===0)&&(d||d===0)&&!$a.test(l)&&m in o)h=(c+``).substr((d+``).length),u||=0,g=$r(l)||(m in un.units?un.units[m]:h),h!==g&&(d=Po(e,m,c,g)),this._pt=new Ca(this._pt,v?b:o,m,d,(_?fr(d,_+u):u)-d,!v&&(g===`px`||m===`zIndex`)&&t.autoRound!==!1?ao:to),this._pt.u=g||0,v&&w!==l?(this._pt.b=c,this._pt.e=w,this._pt.r=io):h!==g&&g!==`%`&&(this._pt.b=c,this._pt.r=ro);else if(m in o)Io.call(this,e,m,c,_?_+l:l);else if(m in e)this.add(e,m,c||e[m],_?_+l:l,r,i);else if(m!==`parseTransform`){Kn(m,l);continue}v||(m in o?C.push(m,0,o[m]):typeof e[m]==`function`?C.push(m,2,e[m]()):C.push(m,1,c||e[m])),a.push(m)}}S&&Sa(this)},render:function(e,t){if(t.tween._time||!Wa())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Fo,aliases:eo,getSetter:function(e,t,n){var r=eo[t];return r&&r.indexOf(`,`)<0&&(t=r),t in Ka&&t!==ho&&(e._gsap.x||Fo(e,`x`))?n&&Ua===n?t===`scale`?fo:uo:(Ua=n||{})&&(t===`scale`?po:mo):e.style&&!Cn(e.style[t])?co:~t.indexOf(`-`)?lo:ma(e,t)},core:{_removeProperty:Ao,_getMatrix:Go}};La.utils.checkPrefix=wo,La.core.getStyleSaver=yo,(function(e,t,n,r){var i=dr(e+`,`+t+`,`+n,function(e){Ka[e]=1});dr(t,function(e){un.units[e]=`deg`,Ho[e]=1}),eo[i[13]]=e+`,`+t,dr(r,function(e){var t=e.split(`:`);eo[t[1]]=i[t[0]]})})(`x,y,z,scale,scaleX,scaleY,xPercent,yPercent`,`rotation,rotationX,rotationY,skewX,skewY`,`transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective`,`0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY`),dr(`x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective`,function(e){un.units[e]=`px`}),La.registerPlugin(as);var os=La.registerPlugin(as)||La;os.core.Tween,os.defaults({duration:.32,ease:`power2.out`});var ss=window.matchMedia(`(prefers-reduced-motion: reduce)`),cs=()=>!ss.matches&&!F().reduceMotion;function ls(){document.documentElement.classList.toggle(`reduce-motion`,!cs())}ss.addEventListener(`change`,ls);var us=[`.language`,`.welcome`,`.step-options`,`.options`,`.med-list`,`.section`,`.tiles`,`.entries`,`.coming`,`.episode-started`,`.profile-section`,`.form-stack`,`.stack`,`.intensity-list`,`.sym-rows`].join(`,`);function ds(e){let t=[];for(let n of e.children)n.matches(`legend, .visually-hidden`)||(n.matches(us)?t.push(...ds(n)):t.push(n));return t}var fs=0,ps=null;function ms(e){let t=e.querySelector(`.screen`);if(!t)return;let n=t.querySelectorAll(`.progress__seg.is-done`),r=t.querySelector(`.tabbar__item[aria-current]`),i=fs,a=ps;if(fs=n.length,ps=r?.getAttribute(`href`)??null,!cs())return;let o=t.querySelector(`.screen__body`),s=o?ds(o):[];os.from(s,{opacity:0,y:10,duration:.4,stagger:Math.min(.05,.4/Math.max(s.length,1)),clearProps:`transform,opacity`});let c=t.querySelectorAll(`.screen__footer > *`);c.length&&os.from(c,{opacity:0,delay:.12,stagger:.05,clearProps:`opacity`}),n.length>i&&os.from([...n].slice(i),{scaleX:0,transformOrigin:`left center`,duration:.45,ease:`power2.inOut`,clearProps:`transform`}),r&&a!==ps&&os.from(r.querySelector(`.tabbar__icon`),{scaleX:.5,autoAlpha:0,duration:.28,clearProps:`all`});let l=t.querySelector(`.episode-started .icon-badge`);l&&os.from(l,{scale:.7,duration:.5,ease:`back.out(1.4)`,clearProps:`transform`})}function hs(e){if(!cs()||!e.checked)return;let t=e.closest(`.option`)?.querySelector(`.option__control`);t&&os.fromTo(t,{scale:.75},{scale:1,duration:.3,ease:`back.out(2)`,clearProps:`transform`})}function gs(e){cs()&&e&&os.from(e,{autoAlpha:0,y:-6,duration:.3,clearProps:`transform,opacity,visibility`})}function _s(e){return!cs()||!e?Promise.resolve():new Promise(t=>{os.to(e,{autoAlpha:0,scale:.98,duration:.22,ease:`power1.in`,onComplete:t})})}function vs(e){cs()&&os.from(e,{autoAlpha:0,y:12,duration:.28,clearProps:`transform,opacity,visibility`})}function ys(e,t){if(!cs())return t();os.to(e,{autoAlpha:0,y:8,duration:.2,ease:`power1.in`,onComplete:t})}function bs(e){cs()&&os.fromTo(e,{opacity:0,y:8,scale:.97},{opacity:1,y:0,scale:1,duration:.25,clearProps:`transform,opacity`})}var xs=56,Ss=[2,9,16,24,33,41,50],Cs=[48,47,46,45,20,19,18,17],ws=[{key:`betahistine`,name:`Betahistín`,type:`preventive`,dose:`24 mg`,frequency:`2× denne`,since:95},{key:`magnesium`,name:`Magnézium`,type:`preventive`,dose:`300 mg`,frequency:`1× denne večer`,since:60},{key:`ibuprofen`,name:`Ibuprofén`,type:`acute`,dose:`400 mg`,frequency:`podľa potreby`},{key:`dimenhydrinate`,name:`Dimenhydrinát`,type:`acute`,dose:`50 mg`,frequency:`pri nevoľnosti`}],Ts=[`Začalo v obchode pri regáloch, pomohlo ľahnúť si do tmy.`,`Celý deň pri počítači, večer sa to rozbehlo.`,`Pred tým som zle spala.`,``,``],Es=[[`brain_fog`,2,4],[`fatigue`,3,5],[`unsteadiness`,2,4],[`tinnitus`,1,3],[`ear_pressure`,2,3],[`rocking`,2,4],[`floating`,2,3],[`headache`,2,4]],Ds=[`poor_sleep`,`stress`,`screen_time`,`weather_change`,`skipped_meal`,`visual_stimulation`,`dehydration`];function Os(e){return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function ks(e=new Date){let t=Os(20261019),n=(e,n)=>Math.round(e+t()*(n-e)),r=e=>t()<e,i=e=>e[Math.floor(t()*e.length)],a=0,o=e=>`demo-${e}-${++a}`,s=(t,n,r=0)=>{let i=xe(e,-t);return i.setHours(n,r,0,0),i<=e?i:null},c=(e,t)=>new Date(e.getTime()+t*6e4),l=e=>({createdAt:e.toISOString(),updatedAt:e.toISOString()}),u=ws.map(t=>{let n=xe(e,-(t.since??90));return{id:`demo-med-${t.key}`,...l(n),name:t.name,type:t.type,dose:t.dose,frequency:t.frequency,note:``,startDate:t.since?M(n):null,endDate:null}}),d=e=>u.find(t=>t.id===`demo-med-${e}`),f=[],p=[],m=[],h=[],g=(e,t,{effect:n=null,episodeId:r=null}={})=>{t&&m.push({id:o(`intake`),...l(t),medicationId:e.id,takenAt:t.toISOString(),dose:e.dose,effect:n,note:``,episodeId:r})},_=(e,t,n={})=>{e&&p.push({id:o(`log`),...l(e),occurredAt:e.toISOString(),symptoms:t,vertigoType:null,duration:null,note:``,episodeId:null,...n})};for(let t of Ss){let a=s(t,n(13,19),i([0,15,30,45]));if(!a)continue;let u=n(18,66)*5,p=c(a,u),m=n(5,8),h=new Set([i(Ds)]);r(.6)&&h.add(i(Ds)),Cs.some(e=>Math.abs(e-t)<=1)&&h.add(`menstrual_cycle`);let v=o(`episode`);f.push({id:v,...l(a),startedAt:a.toISOString(),endedAt:p<=e?p.toISOString():null,type:null,intensity:m,symptoms:[],vertigoTypes:[],triggers:[...h],medicationIntakeIds:[],helped:null,relief:[],impact:[],note:``});let y=n(3,6),b=[{key:`vertigo`,intensity:m},{key:`nausea`,intensity:y}];r(.6)&&b.push(i([{key:`light_sensitivity`,intensity:n(3,6)},{key:`headache`,intensity:n(3,7)},{key:`sound_sensitivity`,intensity:n(2,5)}])),_(c(a,10),b,{episodeId:v,vertigoType:i([`rotational`,`rocking`,`floating`,`rotational`]),duration:u<180?`1_3h`:u<360?`3_6h`:`6_12h`,note:i(Ts)}),r(.4)&&p<=e&&_(c(p,-20),[{key:`fatigue`,intensity:n(4,6)},{key:`brain_fog`,intensity:n(3,5)}],{episodeId:v}),g(d(y>=4?`dimenhydrinate`:`ibuprofen`),c(a,35),{effect:i([`helped`,`partly`,`helped`,`not_helped`,`partly`]),episodeId:v})}for(let t=0;t<xs;t++){let a=M(xe(e,-t)),u=Ss.includes(t);if(t<=3||r(.88)){let i=u?n(60,71)*5:n(74,100)*5,s=i>=430?r(.85)?`good`:`fair`:i>=380?`fair`:`poor`,c=xe(e,-t);c.setHours(6,30,0,0),h.push({id:o(`sleep`),...l(c<=e?c:e),date:a,minutes:i,quality:s,note:``,bedtime:null,wakeTime:null,source:`manual`,externalId:null})}if(t===0)_(s(0,9,15)??c(e,-20),[{key:`brain_fog`,intensity:3},{key:`fatigue`,intensity:4}]);else if(!u&&r(.32)){let e=r(.35)?2:1,a=[];for(;a.length<e;){let[e,t,o]=i(Es);a.some(t=>t.key===e)||a.push({key:e,intensity:r(.8)?n(t,o):null})}_(s(t,n(8,20),i([0,10,20,30,40,50])),a,{duration:r(.6)?i([`under_1h`,`under_1h`,`1_3h`]):null})}r(.65)&&g(d(`betahistine`),s(t,8,n(0,40))),r(.35)&&g(d(`betahistine`),s(t,20,n(0,30))),t<60&&r(.4)&&g(d(`magnesium`),s(t,21,n(0,30)))}return{records:{medications:u,episodes:f,symptomLogs:p,medicationIntakes:m,sleepLogs:h,cycleEntries:Cs.map(t=>({id:o(`cycle`),date:M(xe(e,-t)),type:`period`,createdAt:xe(e,-t).toISOString()}))}}}var As=[`light`,`dark`,`system`],js=window.matchMedia(`(prefers-color-scheme: dark)`),Ms=`system`;function Ns(e=Ms){Ms=As.includes(e)?e:`system`;let t=Ms===`system`?js.matches?`dark`:`light`:Ms;document.documentElement.dataset.theme=t;let n=getComputedStyle(document.documentElement).getPropertyValue(`--color-bg`).trim();document.querySelector(`meta[name="theme-color"]`)?.setAttribute(`content`,n)}js.addEventListener(`change`,()=>{Ms===`system`&&Ns()});var Ps=null;function Fs(e){Ae(e),Ht(F().language??te()??`sk`),Ns(F().theme),ls(),Ot(),Le()&&F().demoSeededAt!==M()&&kt(ks())}function Is(){j()?(Ht(te()??`sk`),Ns(ne()??`system`),ls()):Fs(ce())}var Ls=()=>ee();function Rs(e){j()&&(Ps=e&&e!==`/lock`?e:Ps,he(),je())}function zs(e){e&&e!==`/lock`&&(Ps=e)}function Bs(){let e=Ps??`/today`;return Ps=null,e}function Vs(){Re(),kt(ks()),a(`/today`,{replace:!0})}function Hs(){return Pt(`
    <svg class="logo__mark" viewBox="0 0 120 64" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" stroke-width="4">
        <ellipse cx="60" cy="32" rx="54" ry="18" transform="rotate(-14 60 32)" />
        <ellipse cx="60" cy="32" rx="54" ry="18" transform="rotate(14 60 32)" />
      </g>
      <text x="60" y="42" text-anchor="middle" fill="currentColor"
        font-family="Georgia, serif" font-size="28" font-weight="700" letter-spacing="1">VM</text>
    </svg>`)}function Us({stacked:e=!1}={}){return I`
    <div class="logo ${e?`logo--stacked`:``}" role="img" aria-label="${R(`app.logo`)}">
      ${Hs()}
      <span class="logo__word" aria-hidden="true">Vestibulárna<br />migréna</span>
    </div>`}function Ws({symbol:e,size:t=280}={}){return I`
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
      ${Pt(e?String(L(e,{size:64,strokeWidth:1.4})).replace(`<svg`,`<svg x="108" y="86"`):`
      <circle cx="140" cy="118" r="34" fill="var(--color-coral-soft)" opacity="0.55" />
      <circle cx="140" cy="118" r="18" fill="var(--color-coral)" opacity="0.5" />`)}
    </svg>`}var Gs={render(){return z({variant:`screen--language`,body:I`
        <div class="language">
          ${Us({stacked:!0})}
          ${Ws({size:220})}
          <h1 class="screen-title language__title" tabindex="-1">
            <span lang="sk">${Kt(`sk`,`language.title`)}</span>
            <span class="language__alt" lang="en">${Kt(`en`,`language.title`)}</span>
          </h1>
          <div class="stack">
            ${zt.map(e=>I`
                <button type="button" class="choice" data-action="choose" data-lang="${e}" lang="${e}">
                  <span class="choice__badge" aria-hidden="true">${e.toUpperCase()}</span>
                  <span>${Kt(e,`language.${e}`)}</span>
                  <span class="choice__end">${L(`chevronRight`)}</span>
                </button>`)}
          </div>
        </div>`})},actions:{choose(e){let{lang:t}=e.dataset;Ht(t),Ie({language:t}),a(`/start/welcome`)}}},Ks={render(){return z({variant:`screen--welcome`,header:B({back:`/start/language`}),body:I`
        <div class="welcome">
          ${Us()}
          <h1 class="screen-title welcome__title" tabindex="-1">${R(`welcome.title`)}</h1>
          <p class="screen-lead">${R(`welcome.text`)}</p>
          ${Ws()}
        </div>`,footer:V({label:R(`welcome.cta`),action:`start`,block:!0})})},actions:{start(){a(`/start/privacy`)}}},qs=[`/start/privacy`,`/start/profile`,`/start/goals`,`/start/condition`,`/start/cycle`,`/start/medications`,`/start/reminders`];function Js(e){let t=qs.indexOf(e);return{step:t+1,total:qs.length,prev:qs[t-1]??`/start/welcome`,next:qs[t+1]??`/today`}}var Ys=`/start/goals`,Xs=[`symptoms`,`triggers`,`patterns`,`doctor`,`tips`],Zs={render(){let{step:e,total:t,prev:n}=Js(Ys);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`goals.title`)}</h1>
        <p class="screen-lead">${R(`goals.lead`)}</p>
        <div class="step-options">
          ${en({name:`goals`,type:`checkbox`,legend:R(`goals.title`),options:Xs.map(e=>({value:e,label:R(`goals.options.${e}`)})),selected:F().goals})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Ie({goals:new FormData(e).getAll(`goals`)}),a(Js(Ys).next)},actions:{skip(){a(Js(Ys).next)}}},Qs=`/start/condition`,$s=[`vestibular_migraine`,`migraine`,`other_vestibular`,`unsure`],ec={render(){let{step:e,total:t,prev:n}=Js(Qs);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`condition.title`)}</h1>
        <p class="screen-lead">${R(`condition.lead`)}</p>
        <div class="step-options">
          ${en({name:`condition`,legend:R(`condition.title`),options:$s.map(e=>({value:e,label:R(`condition.options.${e}`)})),selected:F().condition??`vestibular_migraine`})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onSubmit(e){Ie({condition:new FormData(e).get(`condition`)}),a(Js(Qs).next)},actions:{skip(){a(Js(Qs).next)}}},tc=`/start/cycle`;function nc(){let{cycleTracking:e}=F();return e===!0?`yes`:e===!1?`no`:null}var rc={render(){let{step:e,total:t,prev:n}=Js(tc),r=nc();return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`cycle.title`)}</h1>
        <p class="screen-lead">${R(`cycle.lead`)}</p>
        <div class="step-options">
          ${en({name:`cycle`,legend:R(`cycle.title`),options:[{value:`yes`,label:R(`cycle.yes`)},{value:`no`,label:R(`cycle.no`)}],selected:r})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),type:`submit`,block:!0,id:`cycle-continue`,disabled:!r})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`skip`,block:!0})}`})},onChange(e){e.name===`cycle`&&(document.getElementById(`cycle-continue`).disabled=!1)},onSubmit(e){let t=new FormData(e).get(`cycle`);t&&(Ie({cycleTracking:t===`yes`}),a(Js(tc).next))},actions:{skip(){a(Js(tc).next)}}},ic=`/start/medications`;function ac(e){return[R(`medications.types.${e.type}`),e.dose,e.frequency].filter(Boolean).join(` · `)}var oc={render(){let{step:e,total:t,prev:n}=Js(ic),r=ze(),i=r.length>0;return z({header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`medications.title`)}</h1>
        <p class="screen-lead">${R(`medications.lead`)}</p>
        ${i?I`
              <h2 class="visually-hidden">${R(`medications.added`)}</h2>
              <ul class="med-list">
                ${r.map(e=>I`
                    <li class="med">
                      ${sn(`pill`)}
                      <span class="med__main">
                        <span class="med__name">${e.name}</span>
                        <span class="med__meta">${ac(e)}</span>
                      </span>
                      <button type="button" class="icon-btn" data-action="remove" data-id="${e.id}"
                        aria-label="${R(`medications.remove`,{name:e.name})}">
                        ${L(`x`,{size:20})}
                      </button>
                    </li>`)}
              </ul>`:Ws({symbol:`pill`,size:240})}
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`medications.disclaimer`)}</span></p>`,footer:i?I`
            ${V({label:R(`common.continue`),action:`next`,block:!0})}
            ${V({label:R(`medications.addAnother`),variant:`secondary`,action:`add`,iconName:`plus`,block:!0})}`:I`
            ${V({label:R(`medications.add`),action:`add`,iconName:`plus`,block:!0})}
            ${V({label:R(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},actions:{add(){a(`/start/medications/new`)},async remove(e,t){e.disabled=!0,await _s(e.closest(`.med`)),We(e.dataset.id),t.rerender()},next(){a(Js(ic).next)}}},sc=`/start/reminders`,cc={render(){let{step:e,total:t,prev:n}=Js(sc),{reminder:r}=F();return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`reminders.title`)}</h1>
        <p class="screen-lead">${R(`reminders.lead`)}</p>
        ${Ws({symbol:`bell`,size:180})}
        <div class="step-options">
          ${en({name:`reminder`,legend:R(`reminders.title`),options:[{value:`yes`,label:R(`reminders.yes`)},{value:`no`,label:R(`reminders.no`)}],selected:r.enabled?`yes`:null})}
        </div>
        <!-- Zobrazí sa iba pri „Áno“ (CSS :has), bez prekresľovania obrazovky -->
        <div class="reminder-extra">
          ${H({label:R(`reminders.time`),name:`time`,type:`time`,value:r.time})}
          <p class="field__hint">${R(`reminders.permission`)}</p>
        </div>`,footer:V({label:R(`common.continue`),type:`submit`,block:!0})})},onChange(e){e.name===`reminder`&&e.value===`yes`&&gs(document.querySelector(`.reminder-extra`))},onSubmit(e){let t=new FormData(e);Ie({reminder:{enabled:t.get(`reminder`)===`yes`,time:String(t.get(`time`)||F().reminder.time)}}),Vs()}};function $(e,{actionLabel:t,onAction:n,duration:r}={}){let i=document.getElementById(`toast-region`),a=document.createElement(`div`);a.className=`toast`;let o=document.createElement(`span`);o.textContent=e,a.append(o);let s=setTimeout(c,r??(t?6e3:3500));function c(){clearTimeout(s),ys(a,()=>a.remove())}if(t){let e=document.createElement(`button`);e.type=`button`,e.className=`toast__action`,e.textContent=t,e.addEventListener(`click`,()=>{c(),n?.()}),a.append(e)}i.replaceChildren(a),vs(a)}function lc({title:e,text:t,confirmLabel:n,cancelLabel:r=R(`common.cancel`)}){let i=document.getElementById(`dialog`);return i.setAttribute(`aria-labelledby`,`dialog-title`),i.innerHTML=String(I`
    <h2 class="dialog__title" id="dialog-title">${e}</h2>
    ${t?I`<p class="dialog__text">${t}</p>`:``}
    <form method="dialog" class="dialog__actions">
      <button class="btn btn--primary btn--block" value="confirm">${n}</button>
      <button class="btn btn--ghost btn--block" value="cancel" autofocus>${r}</button>
    </form>`),new Promise(e=>{let t=!1,n=n=>{t||(t=!0,e(n))};i.returnValue=``,i.querySelector(`form`).addEventListener(`submit`,e=>n(e.submitter?.value===`confirm`)),i.addEventListener(`close`,()=>n(i.returnValue===`confirm`),{once:!0}),i.showModal(),bs(i)})}var uc={name:``,type:`preventive`,dose:``,frequency:``,note:``,startDate:``,endDate:``};function dc({returnTo:e,withDates:t=!1}){let n=t=>typeof e==`function`?e(t):e;return{render(e){let r=e.params.id?Be(e.params.id):null,i={...uc,...r??{}};return z({form:!0,header:B({back:n(e)}),body:I`
          <h1 class="screen-title" tabindex="-1">${R(r?`treatment.edit`:`medForm.title`)}</h1>
          <div class="form-stack">
            ${H({label:R(`medForm.name`),name:`name`,value:i.name,placeholder:R(`medForm.namePlaceholder`),required:!0})}
            <div class="field">
              <span class="field__label" aria-hidden="true">${R(`medForm.type`)}</span>
              ${tn({name:`type`,legend:R(`medForm.type`),selected:i.type,options:[{value:`preventive`,label:R(`medications.types.preventive`)},{value:`acute`,label:R(`medications.types.acute`)}]})}
            </div>
            ${H({label:R(`medForm.dose`),name:`dose`,value:i.dose,placeholder:R(`medForm.dosePlaceholder`),optional:!0})}
            ${H({label:R(`medForm.frequency`),name:`frequency`,value:i.frequency,placeholder:R(`medForm.frequencyPlaceholder`),optional:!0})}
            ${t?I`<div class="field-row">
                  ${H({label:R(`treatment.startDate`),name:`startDate`,type:`date`,value:i.startDate??``,optional:!0})}
                  ${H({label:R(`treatment.endDate`),name:`endDate`,type:`date`,value:i.endDate??``,optional:!0})}
                </div>`:``}
            ${H({label:R(`medForm.note`),name:`note`,value:i.note,multiline:!0,optional:!0})}
            <p class="disclaimer">${R(`medications.disclaimer`)}</p>
          </div>`,footer:V({label:R(`medForm.submit`),type:`submit`,block:!0})})},onSubmit(e,r){let i=new FormData(e),a=String(i.get(`name`)??``).trim();if(!a){nn(e,`name`,R(`medForm.nameRequired`));return}let o={name:a,type:i.get(`type`),dose:String(i.get(`dose`)??``),frequency:String(i.get(`frequency`)??``),note:String(i.get(`note`)??``),...t?{startDate:i.get(`startDate`)||null,endDate:i.get(`endDate`)||null}:{}};r.params.id&&Be(r.params.id)?(Ue(r.params.id,o),$(R(`profile.saved`))):$(R(`medForm.saved`,{name:He(o).name})),s(n(r))}}}var fc=e=>e.charAt(0).toLocaleUpperCase(Ut())+e.slice(1);function pc(e=new Date){return fc(new Intl.DateTimeFormat(Ut(),{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}).format(e))}function mc(e){return new Intl.DateTimeFormat(Ut(),{hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function hc(e){let t=new Date(e),n=new Date;return t.toDateString()===n.toDateString()?mc(t):new Intl.DateTimeFormat(Ut(),{day:`numeric`,month:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(t)}function gc(e){return new Intl.DateTimeFormat(Ut(),{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`}).format(new Date(e))}function _c(e){return new Intl.DateTimeFormat(Ut(),{day:`numeric`,month:`numeric`,year:`numeric`}).format(new Date(e))}function vc(e){return fc(new Intl.DateTimeFormat(Ut(),{month:`long`,year:`numeric`}).format(e))}function yc(e){return new Intl.NumberFormat(Ut(),{minimumFractionDigits:1,maximumFractionDigits:1}).format(e)}function bc(e){return xc(0,Math.round(e)*6e4)}function xc(e,t=new Date){let n=Math.max(0,Math.floor((new Date(t)-new Date(e))/6e4));if(n<1)return R(`duration.underMinute`);if(n<60)return R(`duration.minutes`,{m:n});let r=Math.floor(n/60),i=n%60;return i?R(`duration.hoursMinutes`,{h:r,m:i}):R(`duration.hours`,{h:r})}var Sc=[{key:`vertigo`,icon:`orbit`},{key:`rocking`,icon:`sailboat`},{key:`floating`,icon:`cloud`},{key:`unsteadiness`,icon:`footprints`},{key:`nausea`,icon:`waves`},{key:`vomiting`,icon:`droplets`},{key:`light_sensitivity`,icon:`sun`},{key:`sound_sensitivity`,icon:`volume`},{key:`visual_sensitivity`,icon:`eye`},{key:`tinnitus`,icon:`audioWave`},{key:`ear_pressure`,icon:`ear`},{key:`headache`,icon:`zap`},{key:`brain_fog`,icon:`cloudFog`},{key:`fatigue`,icon:`battery`}],Cc=[`rotational`,`rocking`,`swaying`,`floating`,`unsteady`,`lightheaded`,`other`,`unsure`],wc=[`just_started`,`under_1h`,`1_3h`,`3_6h`,`6_12h`,`over_12h`,`ongoing`],Tc=[`helped`,`partly`,`not_helped`,`unknown`];function Ec(e){return e==null?null:e===0?`none`:e<=3?`mild`:e<=6?`moderate`:`severe`}var Dc=`custom:`,Oc=e=>e.startsWith(Dc);function kc(e){return Oc(e)?st(e)?.label??R(`symptoms.unknown`):R(`symptoms.${e}`)}var Ac=e=>Sc.find(t=>t.key===e)?.icon??`sparkles`;function jc(e){return e==null?R(`intensity.notSet`):R(`intensity.value`,{value:e,level:R(`intensity.${Ec(e)}`)})}function Mc(e){return e.symptoms.map(e=>e.intensity==null?kc(e.key):`${kc(e.key)} ${e.intensity}`).join(`, `)}var Nc=e=>R(`vertigoTypes.${e}`),Pc=e=>R(`durations.${e}`),Fc=e=>R(`effects.${e}`),Ic=e=>R(`triggers.${e}`),Lc=e=>R(`sleep.qualities.${e}`);function Rc({href:e,iconName:t,title:n,meta:r,badge:i}){return I`
    <li>
      <a class="entry" href="${e}">
        ${sn(t)}
        <span class="entry__main">
          <span class="entry__title">${n}${i??``}</span>
          <span class="entry__meta">${r}</span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}function zc(e){return Rc({href:`#/episode/${e.id}`,iconName:`timer`,title:R(`episode.title`),badge:e.endedAt?``:on(R(`episode.statusOngoing`),{live:!0}),meta:e.endedAt?`${hc(e.startedAt)} – ${mc(e.endedAt)} · ${xc(e.startedAt,e.endedAt)}`:R(`episode.since`,{time:hc(e.startedAt)})})}function Bc(e){let t=at(e);return Rc({href:`#/symptom/${e.id}`,iconName:`activity`,title:Mc(e),meta:[mc(e.occurredAt),t==null?``:R(`intensity.highest`,{value:jc(t)})].filter(Boolean).join(` · `)})}function Vc(e){let t=Be(e.medicationId);return Rc({href:`#/intake/${e.id}`,iconName:`pill`,title:[t?.name??R(`today.intakeTitle`),e.dose].filter(Boolean).join(` `),meta:[mc(e.takenAt),e.effect?Fc(e.effect):``].filter(Boolean).join(` · `)})}function Hc(e){return Rc({href:`#/sleep?date=${e.date}`,iconName:`bed`,title:R(`sleep.entry`,{duration:bc(e.minutes)}),meta:e.quality?Lc(e.quality):R(`sleep.title`)})}function Uc({episodes:e=[],symptomLogs:t=[],intakes:n=[],sleep:r=null}){return I`<ul class="entries">${[...e.map(e=>({at:e.startedAt,render:()=>zc(e)})),...t.map(e=>({at:e.occurredAt,render:()=>Bc(e)})),...n.map(e=>({at:e.takenAt,render:()=>Vc(e)})),...r?[{at:r.wakeTime??be(r.date,`06:00`),render:()=>Hc(r)}]:[]].sort((e,t)=>t.at.localeCompare(e.at)).map(e=>e.render())}</ul>`}var Wc=null;function Gc({logId:e=null,date:t=null}={}){let n=e?et(e):null,r=n?new Date(n.occurredAt):new Date;return Wc={id:n?.id??null,symptoms:n?n.symptoms.map(e=>({...e})):[],vertigoType:n?.vertigoType??null,duration:n?.duration??null,note:n?.note??``,date:n?M(r):t??M(r),time:ye(r),episodeId:n?.episodeId??null,linkEpisode:!n||!!n.episodeId},Wc}var Kc=()=>Wc;function qc(){Wc=null}var Jc=()=>!!Wc?.symptoms.some(e=>e.key===`vertigo`);function Yc(){return[`/log/symptoms`,`/log/intensity`,...Jc()?[`/log/vertigo`]:[],`/log/details`]}function Xc(e){let t=Yc(),n=t.indexOf(e);return{step:n+1,total:t.length,prev:t[n-1]??null,next:t[n+1]??null}}function Zc(e){return I`
    <section class="card card--accent episode-live" aria-labelledby="live-title">
      <div class="episode-live__head">
        ${on(R(`episode.statusOngoing`),{live:!0})}
        <span class="muted small">${R(`episode.since`,{time:hc(e.startedAt)})}</span>
      </div>
      <div>
        <h2 class="card__title" id="live-title">${R(`episode.title`)}</h2>
        <p class="muted">${R(`episode.lasting`,{duration:xc(e.startedAt)})}</p>
      </div>
      <div class="btn-row">
        ${V({label:R(`episode.addDetails`),variant:`secondary`,action:`details`,compact:!0})}
        ${V({label:R(`episode.end`),variant:`secondary`,action:`endEpisode`,data:{id:e.id},compact:!0})}
      </div>
    </section>`}function Qc(e){let t=e=>I`
    <span class="today-episode__text" aria-hidden="true">
      <span class="today-episode__over">${R(`today.episodeOverline`)}</span>
      <span class="today-episode__main">${e}</span>
    </span>`;return e?I`
      <a class="today-episode today-episode--live" href="#/episode/${e.id}" aria-label="${R(`episode.ongoing`)}">
        <span class="today-episode__dot" aria-hidden="true"></span>${t(R(`episode.statusOngoing`))}
      </a>`:I`
    <button type="button" class="today-episode" data-action="startEpisode" aria-label="${R(`today.startEpisode`)}">
      <span class="today-episode__play" aria-hidden="true">${L(`play`,{size:14,strokeWidth:2.5})}</span>${t(R(`today.episodeStart`))}
    </button>`}function $c(e,t,n,r){let i=I`
    ${L(e,{size:22})}
    <span class="tile__label">${t}</span>
    <span class="tile__value">${n}</span>`;return r?I`<a class="tile tile--link" href="${r}">${i}</a>`:I`<div class="tile">${i}</div>`}function el(e){let t=new Map;for(let n of e)for(let e of n.symptoms){let n=t.get(e.key);t.set(e.key,n==null?e.intensity:Math.max(n,e.intensity??n))}return I`
    <ul class="sym-chips" aria-label="${R(`today.symptomsToday`)}">
      ${[...t].map(([e,t])=>I`<li class="sym-chip">${kc(e)}${t==null?``:I` <strong>${t}</strong>`}</li>`)}
    </ul>`}var tl={render(){let{name:e}=F(),t=Tt(),n=ut(),r=t.episodes.length+t.symptomLogs.length+t.intakes.length>0||!!t.sleep,i=t.sleep?[bc(t.sleep.minutes),t.sleep.quality?Lc(t.sleep.quality):``].filter(Boolean).join(` · `):R(`sleep.add`),a=R(`today.nothingYet`);return Zt(`today`,I`
      <header class="today-header">
        <h1 class="screen-title today-title" tabindex="-1">
          ${e?R(`today.greetingName`,{name:e}):R(`today.greeting`)}
        </h1>
        ${Qc(n)}
        <p class="today-date">${pc()}</p>
      </header>

      ${n?Zc(n):``}

      <section class="card feeling" aria-labelledby="feeling-title">
        <h2 class="card__title" id="feeling-title">${R(`today.howAreYou`)}</h2>
        ${t.symptomLogs.length?el(t.symptomLogs):I`${Ws({size:150})}<p class="muted">${R(`today.noEntries`)}</p>`}
        <div class="btn-row">
          ${V({label:R(`today.addSymptom`),iconName:`plus`,action:`addSymptom`,compact:!0})}
        </div>
      </section>

      <section class="section" aria-labelledby="overview-title">
        <h2 class="section-title" id="overview-title">${R(`today.overview`)}</h2>
        <div class="tiles">
          ${$c(`bed`,R(`today.sleep`),i,`#/sleep?date=${M()}`)}
          ${$c(`activity`,R(`today.symptoms`),t.symptomLogs.length?qt(`plural.entries`,t.symptomLogs.length):a)}
          ${$c(`pill`,R(`today.meds`),t.intakes.length?qt(`plural.entries`,t.intakes.length):a)}
        </div>
      </section>

      <section class="section" aria-labelledby="entries-title">
        <h2 class="section-title" id="entries-title">${R(`today.entries`)}</h2>
        ${r?Uc(t):I`<p class="empty">${R(`today.entriesEmpty`)}</p>`}
      </section>`)},mount(e,t){if(!ut())return null;let n=setInterval(()=>t.rerender(),3e4);return()=>clearInterval(n)},actions:{addSymptom(){Gc(),a(`/log/symptoms`)},details(){$(R(`comingSoon.toast`))},startEpisode(){a(`/episode/${dt().id}?new=1`)},async endEpisode(e,t){let{id:n}=e.dataset;e.disabled=!0,await _s(e.closest(`.episode-live`)),pt(n),t.rerender(),$(R(`episode.endedToast`),{actionLabel:R(`common.undo`),onAction:()=>{mt(n),t.rerender()}})}}};function nl(){return z({header:B({back:`/today`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`episode.title`)}</h1>
      <p class="screen-lead">${R(`episode.notFound`)}</p>`})}function rl(e){return z({variant:`screen--center`,header:B({back:`/today`}),body:I`
      <div class="episode-started">
        ${sn(`timer`,{large:!0})}
        <h1 class="screen-title" tabindex="-1">${R(`episode.started`)}</h1>
        <p class="big-time">
          <span class="big-time__label">${R(`episode.startedAt`)}</span>
          <time datetime="${e.startedAt}">${mc(e.startedAt)}</time>
        </p>
        <p class="muted">${R(`episode.detailsLater`)}</p>
      </div>`,footer:I`
      ${V({label:R(`episode.addDetails`),action:`addDetails`,block:!0})}
      ${V({label:R(`episode.finishLater`),variant:`outline`,action:`finishLater`,block:!0})}
      <p class="mistake">
        <span>${R(`episode.mistake`)}</span>
        <button type="button" class="link-btn" data-action="cancelNew">${R(`episode.cancel`)}</button>
      </p>`})}function il(e){let t=tt(e.id),n=Ke().filter(t=>t.episodeId===e.id);return I`
    ${t.length?I`<section class="section"><h2 class="section-title">${R(`episode.linkedSymptoms`)}</h2>${Uc({symptomLogs:t})}</section>`:``}
    ${n.length?I`<section class="section"><h2 class="section-title">${R(`episode.linkedIntakes`)}</h2>${Uc({intakes:n})}</section>`:``}`}function al(e){let t=!e.endedAt;return z({header:B({back:`/today`}),body:I`
      <div class="episode-head">
        <h1 class="screen-title" tabindex="-1">${R(`episode.title`)}</h1>
        ${t?on(R(`episode.statusOngoing`),{live:!0}):on(R(`episode.statusEnded`),{neutral:!0})}
      </div>
      <p class="screen-lead">${pc(new Date(e.startedAt))}</p>
      <dl class="facts">
        <div class="fact">
          <dt>${R(`episode.startedAt`)}</dt>
          <dd>${mc(e.startedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${R(`episode.endedAt`)}</dt>
          <dd>${t?`—`:mc(e.endedAt)}</dd>
        </div>
        <div class="fact">
          <dt>${R(`episode.duration`)}</dt>
          <dd>${xc(e.startedAt,e.endedAt??new Date)}</dd>
        </div>
      </dl>
      ${il(e)}`,footer:I`
      ${t?V({label:R(`episode.end`),action:`end`,block:!0}):``}
      ${V({label:R(`episode.addDetails`),variant:t?`secondary`:`primary`,action:`addDetails`,block:!0})}
      ${V({label:R(`episode.delete`),variant:`danger`,action:`delete`,block:!0})}`})}var ol={render(e){let t=lt(e.params.id);return t?e.query.new===`1`&&!t.endedAt?rl(t):al(t):nl()},actions:{addDetails(){$(R(`comingSoon.toast`))},finishLater(){a(`/today`,{replace:!0})},cancelNew(e,t){let n=ht(t.params.id);a(`/today`,{replace:!0}),$(R(`episode.cancelledToast`),{actionLabel:R(`common.undo`),onAction:()=>{gt(n),t.rerender()}})},end(e,t){let{id:n}=t.params;pt(n),t.rerender(),$(R(`episode.endedToast`),{actionLabel:R(`common.undo`),onAction:()=>{mt(n),t.rerender()}})},async delete(e,t){if(!await lc({title:R(`episode.deleteTitle`),text:R(`episode.deleteText`),confirmLabel:R(`episode.delete`)}))return;let n=ht(t.params.id);s(`/today`),$(R(`episode.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{gt(n),t.rerender()}})}}},sl=[0,1,5,15];function cl(e){let t=j();return I`
    <section class="profile-section" aria-labelledby="security-title">
      <h2 id="security-title">${R(`security.title`)}</h2>
      <div class="list">
        ${an({name:`appLock`,label:R(`security.pin`),hint:R(t?`security.pinOnHint`:`security.pinOffHint`),checked:t,iconName:`lock`})}
        ${t?I`
              <a class="list__row" href="#/security/pin?mode=change">
                ${L(`keyRound`)}<span class="list__label">${R(`security.changePin`)}</span>${L(`chevronRight`,{size:20})}
              </a>
              <div class="list__field">
                <label class="field__label" for="f-autoLock">${R(`security.autoLock`)}</label>
                <select class="field__input" id="f-autoLock" name="autoLock">
                  ${sl.map(t=>I`<option value="${t}"${t===(e.autoLockMinutes??1)?I` selected`:``}>
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
    </section>`}function ll(){let e=new Blob([JSON.stringify(Ct(),null,2)],{type:`application/json`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`vestibularna-migrena-${M()}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var ul={render(){let e=F();return Zt(`profile`,I`
      <h1 class="screen-title" tabindex="-1">${R(`profile.title`)}</h1>

      <section class="profile-section" aria-labelledby="me-title">
        <h2 id="me-title">${R(`profile.me`)}</h2>
        <div class="card">
          ${H({label:R(`profile.name`),name:`name`,value:e.name,placeholder:R(`profile.namePlaceholder`),hint:R(`profile.nameHint`),autocomplete:`given-name`,maxlength:40})}
        </div>
      </section>

      <section class="profile-section" aria-labelledby="lang-title">
        <h2 id="lang-title">${R(`profile.language`)}</h2>
        <label class="visually-hidden" for="f-language">${R(`profile.language`)}</label>
        <select class="field__input" id="f-language" name="language">
          ${zt.map(t=>I`<option value="${t}" lang="${t}"${t===e.language?I` selected`:``}>${Kt(t,`language.${t}`)}</option>`)}
        </select>
      </section>

      <section class="profile-section" aria-labelledby="tracking-title">
        <h2 id="tracking-title">${R(`profile.tracking`)}</h2>
        <div class="list">
          ${an({name:`cycleTracking`,label:R(`profile.cycle`),checked:e.cycleTracking===!0,iconName:`calendar`})}
          ${an({name:`reminderEnabled`,label:R(`profile.reminders`),checked:e.reminder.enabled,iconName:`bell`})}
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
            ${tn({name:`theme`,legend:R(`profile.appearance`),selected:e.theme??`system`,options:As.map(e=>({value:e,label:R(`profile.themes.${e}`)}))})}
          </div>
          ${an({name:`reduceMotion`,label:R(`profile.reduceMotion`),hint:R(`profile.reduceMotionHint`),checked:e.reduceMotion,iconName:`sparkles`})}
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
              <span class="list__chip">${on(R(`profile.comingSoon`),{neutral:!0})}</span>
            </span>
          </div>
        </div>
      </section>

      ${cl(e)}

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
                ${e.consent?.healthDataAt?R(`privacy.consentGiven`,{date:_c(e.consent.healthDataAt)}):``}
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
                <button type="button" class="list__row" data-action="demoReset">
                  ${L(`sparkles`)}<span class="list__label">${R(`profile.demoReset`)}</span>
                </button>
                <button type="button" class="list__row" data-action="onboardingAgain">
                  ${L(`arrowRight`)}<span class="list__label">${R(`profile.onboardingAgain`)}</span>
                </button>`}
          <a class="list__row" href="#/styleguide">
            ${L(`palette`)}
            <span class="list__label">${R(`profile.styleguide`)}</span>
            ${L(`chevronRight`,{size:20})}
          </a>
        </div>
        ${I`<p class="field__hint section-sm">${R(`profile.demoNote`)}</p>`}
      </section>

      <div class="section">
        ${V({label:R(`profile.logout`),variant:`outline`,iconName:`logOut`,action:`logout`,block:!0})}
      </div>

      <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`profile.disclaimer`)}</span></p>`)},onChange(e,t){let{reminder:n}=F();switch(e.name){case`name`:Ie({name:e.value.trim(),nameSetAt:e.value.trim()?new Date().toISOString():null}),$(R(`profile.saved`));break;case`language`:Ht(e.value),Ie({language:e.value}),re({language:e.value}),t.rerender();break;case`theme`:Ie({theme:e.value}),re({theme:e.value}),Ns(e.value);break;case`appLock`:a(`/security/pin?mode=${e.checked?`set`:`disable`}`);break;case`autoLock`:Ie({autoLockMinutes:Number(e.value)}),$(R(`profile.saved`));break;case`cycleTracking`:Ie({cycleTracking:e.checked});break;case`reminderEnabled`:Ie({reminder:{...n,enabled:e.checked}}),t.rerender(),e.checked&&gs(document.querySelector(`.list__field`));break;case`reduceMotion`:Ie({reduceMotion:e.checked}),ls();break;case`reminderTime`:e.value&&Ie({reminder:{...n,time:e.value}})}},actions:{async demoReset(e,t){await lc({title:R(`profile.demoResetTitle`),text:R(`profile.demoResetText`),confirmLabel:R(`profile.demoResetConfirm`)})&&(kt(ks()),t.rerender(),$(R(`profile.demoResetDone`)))},onboardingAgain(){Ie({onboardingCompletedAt:null}),a(`/start/welcome`,{replace:!0})},exportData(){ll(),$(R(`privacy.exportDone`))},async logout(){j()?(Rs(`/today`),a(`/lock`,{replace:!0})):await lc({title:R(`profile.logoutNoPinTitle`),text:R(`profile.logoutNoPinText`),confirmLabel:R(`profile.logoutNoPinConfirm`)})&&a(`/security/pin?mode=set`)},async withdrawConsent(){await lc({title:R(`privacy.withdrawTitle`),text:R(`privacy.withdrawText`),confirmLabel:R(`privacy.withdrawConfirm`)})&&(At(),ls(),a(`/start/language`,{replace:!0}))},async deleteAll(){await lc({title:R(`profile.deleteAllTitle`),text:R(`profile.deleteAllText`),confirmLabel:R(`profile.deleteAllConfirm`)})&&(At(),ls(),a(`/start/language`,{replace:!0}))}}},dl=[[`--color-bg`,`Pozadie`],[`--color-blob`,`Organické tvary`],[`--color-surface`,`Karty`],[`--color-surface-tint`,`Zvolené / sekundárne`],[`--color-border`,`Okraje`],[`--color-border-strong`,`Výrazné okraje`],[`--color-coral`,`Korálová – akcent`],[`--color-coral-soft`,`Korálová jemná`],[`--color-cta`,`Tlačidlá`],[`--color-cta-pressed`,`Tlačidlá – stlačené`],[`--color-text`,`Text`],[`--color-text-muted`,`Text tlmený`]],fl=(e,t)=>I`
  <section class="sg-section">
    <h2 class="section-title">${e}</h2>
    ${t}
  </section>`,pl={render(){return z({header:B({back:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">Dizajn systém</h1>
        <p class="screen-lead">Farby, písma, logo a ilustrácie sú zástupné. Po dodaní podkladov sa menia v súboroch
          <code>src/styles/tokens.css</code> a <code>src/ui/placeholders.js</code>.</p>

        ${fl(`Farby`,I`<div class="sg-swatches">
            ${dl.map(([e,t])=>I`
                <div class="sg-swatch">
                  <span class="sg-swatch__color" style="background:var(${e})"></span>
                  <span class="sg-swatch__label">${t}</span>
                  <code class="sg-swatch__token">${e}</code>
                </div>`)}
          </div>`)}

        ${fl(`Typografia`,I`<div class="stack">
            <p class="sg-type sg-type--3xl">Nadpis úvodu 38</p>
            <p class="sg-type sg-type--2xl">Nadpis obrazovky 32</p>
            <p class="sg-type sg-type--xl">Nadpis dialógu 26</p>
            <p class="sg-type sg-type--lg">Nadpis sekcie a karty 20</p>
            <p>Bežný text 17 – Zaznamenávajte svoje symptómy, hľadajte možné súvislosti.</p>
            <p class="muted small">Doplnkový text 15 – tlmená farba pre vysvetlivky.</p>
          </div>`)}

        ${fl(`Tlačidlá`,I`<div class="stack">
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

        ${fl(`Výber možností`,I`<div class="stack">
            ${en({name:`sg-radio`,legend:`Jedna možnosť`,options:[{value:`a`,label:`Vestibulárna migréna`},{value:`b`,label:`Migréna`}],selected:`a`})}
            ${en({name:`sg-check`,type:`checkbox`,legend:`Viac možností`,options:[{value:`a`,label:`Sledovať moje symptómy`},{value:`b`,label:`Zaznamenávať možné spúšťače`}],selected:[`a`]})}
            ${tn({name:`sg-seg`,legend:`Segment`,selected:`a`,options:[{value:`a`,label:`Preventívny`},{value:`b`,label:`Akútny`}]})}
          </div>`)}

        ${fl(`Polia a prepínače`,I`<div class="stack">
            ${H({label:`Názov lieku`,name:`sg-name`,placeholder:`napr. Betahistín`})}
            ${H({label:`Poznámka`,name:`sg-note`,multiline:!0,optional:!0})}
            <div class="list">${an({name:`sg-switch`,label:`Denná pripomienka`,checked:!0,iconName:`bell`})}</div>
          </div>`)}

        ${fl(`Karty a štítky`,I`<div class="stack">
            <div class="card">
              <h3 class="card__title">Karta</h3>
              <p class="muted">Zaoblená plocha s jemným tieňom.</p>
            </div>
            <div class="card card--accent">
              <h3 class="card__title">Zvýraznená karta</h3>
              <p class="muted">Napríklad prebiehajúca epizóda.</p>
            </div>
            <div class="btn-row">${on(`Prebieha`,{live:!0})} ${on(`Ukončená`,{neutral:!0})}</div>
          </div>`)}

        ${fl(`Ikony (Lucide)`,I`<div class="sg-icons">
            ${Lt.map(e=>I`<span class="sg-icon" title="${e}">${L(e)}</span>`)}
          </div>
          <div class="btn-row" style="margin-top:16px">${sn(`timer`)} ${sn(`pill`,{large:!0})}</div>`)}

        ${fl(`Logo a ilustrácie (zástupné)`,I`<div class="stack">
            ${Us()}
            ${Us({stacked:!0})}
            ${Ws({size:220})}
            ${Ws({symbol:`bell`,size:160})}
          </div>`)}`})},actions:{demo(){$(`Toto je upozornenie (toast)`,{actionLabel:`Vrátiť`,onAction:()=>{}})}}},ml=`/log/symptoms`,hl=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase();function gl(){return[...Sc.map(e=>({key:e.key,icon:e.icon,label:R(`symptoms.${e.key}`)})),...ot().map(e=>({key:e.key,icon:`sparkles`,label:e.label}))]}function _l(){let e=Kc().symptoms.length,t=document.getElementById(`log-continue`);t.disabled=e===0,t.querySelector(`span`).textContent=e?R(`log.continueCount`,{n:e}):R(`common.continue`)}var vl={render(){let e=Kc(),{step:t,total:n}=Xc(ml),r=new Set(e.symptoms.map(e=>e.key)),i=r.size;return z({header:B({back:`/today`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.symptomsTitle`)}</h1>
        <p class="screen-lead">${R(`log.symptomsLead`)}</p>

        <div class="search">
          ${L(`search`,{size:20})}
          <input class="field__input search__input" type="search" id="symptom-search" autocomplete="off"
            placeholder="${R(`log.search`)}" aria-label="${R(`log.search`)}" />
        </div>

        <fieldset class="sym-grid">
          <legend class="visually-hidden">${R(`log.symptomsTitle`)}</legend>
          ${gl().map(e=>I`
              <label class="sym-tile" data-search="${hl(e.label)}">
                <input type="checkbox" name="symptom" value="${e.key}" id="sym-${e.key}"${r.has(e.key)?I` checked`:``} />
                <span class="sym-tile__icon">${L(e.icon,{size:22})}</span>
                <span class="sym-tile__label">${e.label}</span>
                <span class="sym-tile__check">${L(`check`,{size:14,strokeWidth:3})}</span>
              </label>`)}
        </fieldset>
        <p class="empty" id="sym-empty" hidden>${R(`log.noMatch`)}</p>

        <form class="custom-add" data-form="custom">
          <label class="field__label" for="custom-symptom">${R(`log.custom`)}</label>
          <div class="custom-add__row">
            <input class="field__input" id="custom-symptom" name="custom" maxlength="40" autocomplete="off"
              placeholder="${R(`log.customPlaceholder`)}" />
            <button type="submit" class="btn btn--secondary btn--compact">${L(`plus`,{size:20})}<span>${R(`log.customAdd`)}</span></button>
          </div>
        </form>`,footer:V({label:i?R(`log.continueCount`,{n:i}):R(`common.continue`),action:`next`,id:`log-continue`,disabled:i===0,block:!0})})},onInput(e){if(e.id!==`symptom-search`)return;let t=hl(e.value.trim()),n=0;for(let e of document.querySelectorAll(`.sym-tile`)){let r=!t||e.dataset.search.includes(t);e.hidden=!r,r&&(n+=1)}document.getElementById(`sym-empty`).hidden=n>0},onChange(e){if(e.name!==`symptom`)return;let t=Kc();e.checked?t.symptoms.push({key:e.value,intensity:null}):t.symptoms=t.symptoms.filter(t=>t.key!==e.value),_l()},onSubmit(e,t){if(e.dataset.form!==`custom`)return;let n=ct(e.elements.custom.value);if(!n)return;let r=Kc();r.symptoms.some(e=>e.key===n.key)||r.symptoms.push({key:n.key,intensity:null}),t.rerender(),document.getElementById(`custom-symptom`).value=``},actions:{next(){Kc().symptoms.length&&a(Xc(ml).next,{replace:!0})}}},yl=`/log/intensity`;function bl(e){let t=Kc().symptoms[e],n=document.querySelector(`.intensity[data-index="${e}"]`),r=t.intensity==null;n.classList.toggle(`is-unset`,r),n.querySelector(`.intensity__value`).textContent=jc(t.intensity),n.querySelector(`[data-action="clear"]`).hidden=r;let i=n.querySelector(`input[type="range"]`);i.setAttribute(`aria-valuetext`,jc(t.intensity)),r&&(i.value=5)}var xl={render(){let{symptoms:e}=Kc(),{step:t,total:n}=Xc(yl);return z({header:B({backAction:`prevStep`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.intensityTitle`)}</h1>
        <p class="screen-lead">${R(`log.intensityLead`)}</p>
        <div class="intensity-list">
          ${e.map((e,t)=>I`
              <div class="intensity ${e.intensity==null?`is-unset`:``}" data-index="${t}">
                <div class="intensity__head">
                  <span class="intensity__icon">${L(Ac(e.key),{size:22})}</span>
                  <label class="intensity__label" for="int-${t}">${kc(e.key)}</label>
                </div>
                <output class="intensity__value" for="int-${t}">${jc(e.intensity)}</output>
                <input class="range" type="range" id="int-${t}" data-index="${t}" min="0" max="10" step="1"
                  value="${e.intensity??5}" aria-valuetext="${jc(e.intensity)}" />
                <div class="intensity__scale" aria-hidden="true"><span>0</span><span>5</span><span>10</span></div>
                <button type="button" class="link-btn intensity__clear" data-action="clear" data-index="${t}"${e.intensity==null?I` hidden`:``}>
                  ${R(`log.clear`)}
                </button>
              </div>`)}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),action:`next`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},onInput(e){if(e.type!==`range`)return;let t=Number(e.dataset.index);Kc().symptoms[t].intensity=Number(e.value),bl(t)},onChange(e){this.onInput(e)},actions:{clear(e){let t=Number(e.dataset.index);Kc().symptoms[t].intensity=null,bl(t),document.getElementById(`int-${t}`).focus()},next(){a(Xc(yl).next,{replace:!0})},prevStep(){a(Xc(yl).prev,{replace:!0})}}},Sl=`/log/vertigo`,Cl={render(){let{step:e,total:t}=Xc(Sl);return z({header:B({backAction:`prevStep`,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.vertigoTitle`)}</h1>
        <p class="screen-lead">${R(`log.vertigoLead`)}</p>
        <div class="step-options">
          ${en({name:`vertigoType`,legend:R(`log.vertigoTitle`),options:Cc.map(e=>({value:e,label:Nc(e)})),selected:Kc().vertigoType})}
        </div>`,footer:I`
        ${V({label:R(`common.continue`),action:`next`,block:!0})}
        ${V({label:R(`common.skip`),variant:`ghost`,action:`next`,block:!0})}`})},onChange(e){e.name===`vertigoType`&&(Kc().vertigoType=e.value)},actions:{next(){a(Xc(Sl).next,{replace:!0})},prevStep(){a(Xc(Sl).prev,{replace:!0})}}},wl=`/log/details`;function Tl(e){return e.episodeId?lt(e.episodeId):Ce(e.date)?ut():null}var El={render(){let e=Kc(),{step:t,total:n}=Xc(wl),r=Tl(e);return z({header:B({backAction:`prevStep`,step:t,total:n}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`log.detailsTitle`)}</h1>
        <p class="screen-lead">${R(`log.detailsLead`)}</p>
        <div class="step-options">
          ${en({name:`duration`,legend:R(`log.detailsTitle`),options:wc.map(e=>({value:e,label:Pc(e)})),selected:e.duration})}
        </div>

        <fieldset class="form-section">
          <legend class="section-title">${R(`log.when`)}</legend>
          <div class="field-row">
            <div class="field">
              <label class="field__label" for="f-date">${R(`log.date`)}</label>
              <input class="field__input" type="date" id="f-date" name="date" value="${e.date}" max="${M()}" required />
            </div>
            <div class="field">
              <label class="field__label" for="f-time">${R(`log.time`)}</label>
              <input class="field__input" type="time" id="f-time" name="time" value="${e.time}" required />
            </div>
          </div>
          ${r?en({name:`linkEpisode`,type:`checkbox`,legend:R(`log.linkEpisode`),options:[{value:`yes`,label:`${R(`log.linkEpisode`)} (${R(`episode.since`,{time:mc(r.startedAt)})})`}],selected:e.linkEpisode?`yes`:null}):``}
        </fieldset>

        <div class="form-section">
          ${H({label:R(`log.note`),name:`note`,value:e.note,multiline:!0,optional:!0})}
        </div>`,footer:V({label:R(`log.save`),action:`save`,iconName:`check`,block:!0})})},onChange(e){let t=Kc();e.name===`duration`&&(t.duration=e.value),e.name===`date`&&e.value&&(t.date=e.value),e.name===`time`&&e.value&&(t.time=e.value),e.name===`linkEpisode`&&(t.linkEpisode=e.checked)},onInput(e){e.name===`note`&&(Kc().note=e.value)},actions:{save(){let e=Kc(),t=Tl(e);nt({id:e.id,occurredAt:be(e.date,e.time),symptoms:e.symptoms,vertigoType:e.vertigoType,duration:e.duration,note:e.note,episodeId:t&&e.linkEpisode?t.id:null}),qc(),s(`/today`),$(R(`log.saved`))},prevStep(){a(Xc(wl).prev,{replace:!0})}}};function Dl(e){return I`
    <ul class="sym-rows">
      ${e.symptoms.map(e=>I`
          <li class="sym-row">
            <span class="icon-badge">${L(Ac(e.key),{size:22})}</span>
            <span class="sym-row__label">${kc(e.key)}</span>
            <span class="sym-row__value ${e.intensity==null?`muted`:``}">${jc(e.intensity)}</span>
          </li>`)}
    </ul>`}var Ol={render(e){let t=et(e.params.id);if(!t)return z({header:B({back:`/today`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`symptomLog.title`)}</h1>
          <p class="screen-lead">${R(`symptomLog.notFound`)}</p>`});let n=t.episodeId?lt(t.episodeId):null;return z({header:B({back:`/today`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`symptomLog.title`)}</h1>
        <p class="screen-lead">${pc(new Date(t.occurredAt))} · ${mc(t.occurredAt)}</p>
        ${Dl(t)}
        <dl class="facts">
          ${t.vertigoType?I`<div class="fact"><dt>${R(`symptomLog.vertigoType`)}</dt><dd>${Nc(t.vertigoType)}</dd></div>`:``}
          ${t.duration?I`<div class="fact"><dt>${R(`symptomLog.duration`)}</dt><dd>${Pc(t.duration)}</dd></div>`:``}
          ${n?I`<div class="fact"><dt>${R(`symptomLog.episode`)}</dt>
                <dd><a href="#/episode/${n.id}">${R(`episode.since`,{time:mc(n.startedAt)})}</a></dd></div>`:``}
        </dl>
        ${t.note?I`<h2 class="section-title section">${R(`symptomLog.note`)}</h2><p class="note-text">${t.note}</p>`:``}`,footer:I`
        ${V({label:R(`symptomLog.edit`),variant:`secondary`,iconName:`pencil`,action:`edit`,block:!0})}
        ${V({label:R(`symptomLog.delete`),variant:`danger`,action:`delete`,block:!0})}`})},actions:{edit(e,t){Gc({logId:t.params.id}),a(`/log/symptoms`)},async delete(e,t){if(!await lc({title:R(`symptomLog.deleteTitle`),text:R(`symptomLog.deleteText`),confirmLabel:R(`symptomLog.delete`)}))return;let n=rt(t.params.id);s(`/today`),$(R(`symptomLog.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{it(n),t.rerender()}})}}};function kl(e){let t=Ke(e.id)[0];return I`
    <li>
      <a class="entry" href="#/treatment/${e.id}">
        ${sn(`pill`)}
        <span class="entry__main">
          <span class="entry__title">${[e.name,e.dose].filter(Boolean).join(` · `)}</span>
          <span class="entry__meta">
            ${[e.frequency,t?R(`treatment.lastTaken`,{when:hc(t.takenAt)}):R(`treatment.neverTaken`)].filter(Boolean).join(` · `)}
          </span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}function Al(e,t){let n=t.filter(t=>t.type===e);return I`
    <section class="section" aria-labelledby="group-${e}">
      <h2 class="section-title" id="group-${e}">${R(`treatment.${e}`)}</h2>
      ${n.length?I`<ul class="entries">${n.map(kl)}</ul>`:I`<p class="empty">${R(`treatment.noneOfType`)}</p>`}
    </section>`}var jl={render(){let e=ze();return Zt(`treatment`,I`
        <h1 class="screen-title" tabindex="-1">${R(`treatment.title`)}</h1>
        <p class="screen-lead">${R(`treatment.lead`)}</p>
        ${e.length?I`${Al(`preventive`,e)}${Al(`acute`,e)}`:I`<p class="empty section">${R(`treatment.empty`)}</p>`}
        <div class="section">
          ${V({label:R(`treatment.add`),iconName:`plus`,variant:e.length?`secondary`:`primary`,action:`add`,block:!0})}
        </div>
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`treatment.disclaimer`)}</span></p>`)},actions:{add(){a(`/treatment/new`)}}},Ml=20,Nl=(e,t)=>t?I`<div class="fact"><dt>${e}</dt><dd>${t}</dd></div>`:``,Pl=e=>e?pc(ve(e)):``;function Fl(e){let t=[e.dose,e.effect?Fc(e.effect):R(`treatment.effectMissing`),e.episodeId?R(`treatment.inEpisode`):``].filter(Boolean);return I`
    <li>
      <a class="entry" href="#/intake/${e.id}">
        ${sn(`clock`)}
        <span class="entry__main">
          <span class="entry__title">${gc(e.takenAt)}</span>
          <span class="entry__meta">${t.join(` · `)}</span>
        </span>
        ${L(`chevronRight`,{size:20})}
      </a>
    </li>`}var Il={render(e){let t=Be(e.params.id);if(!t)return z({header:B({back:`/treatment`}),body:I`<h1 class="screen-title" tabindex="-1">${R(`treatment.title`)}</h1>
          <p class="screen-lead">${R(`treatment.notFound`)}</p>`});let n=Ke(t.id),r=e.query.all===`1`,i=Tc.map(e=>({key:e,count:n.filter(t=>t.effect===e).length})).filter(e=>e.count);return z({header:B({back:`/treatment`}),body:I`
        <div class="episode-head">
          <h1 class="screen-title" tabindex="-1">${t.name}</h1>
          ${on(R(`medications.types.${t.type}`),{neutral:!0})}
        </div>
        <dl class="facts">
          ${Nl(R(`treatment.dose`),t.dose)}
          ${Nl(R(`treatment.frequency`),t.frequency)}
          ${Nl(R(`treatment.startDate`),Pl(t.startDate))}
          ${Nl(R(`treatment.endDate`),Pl(t.endDate))}
          ${Nl(R(`treatment.taken`),qt(`plural.times`,n.length))}
        </dl>
        ${t.note?I`<p class="note-text section-sm">${t.note}</p>`:``}

        ${i.length?I`<section class="section" aria-labelledby="effect-title">
              <h2 class="section-title" id="effect-title">${R(`treatment.effectSummary`)}</h2>
              <ul class="sym-chips sym-chips--start">
                ${i.map(e=>I`<li class="sym-chip">${Fc(e.key)} <strong>${qt(`plural.times`,e.count)}</strong></li>`)}
              </ul>
            </section>`:``}

        <section class="section" aria-labelledby="history-title">
          <h2 class="section-title" id="history-title">${R(`treatment.history`)}</h2>
          ${n.length?I`<ul class="entries">${(r?n:n.slice(0,Ml)).map(Fl)}</ul>
                ${!r&&n.length>Ml?I`<button type="button" class="link-btn section-sm" id="show-all" data-action="showAll">
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
        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`treatment.disclaimer`)}</span></p>`,footer:V({label:R(`treatment.logIntake`),iconName:`plus`,action:`logIntake`,block:!0})})},actions:{showAll(e,t){o(`/treatment/${t.params.id}?all=1`),t.rerender()},logIntake(e,t){a(`/treatment/${t.params.id}/intake`)},async delete(e,t){if(!await lc({title:R(`treatment.deleteTitle`),text:R(`treatment.deleteText`),confirmLabel:R(`treatment.delete`)}))return;let n=We(t.params.id);s(`/treatment`),$(R(`treatment.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{Ge(n),t.rerender()}})}}};function Ll(e,t){if(t===`edit`){let t=qe(e.params.id);return{intake:t,medication:t?Be(t.medicationId):null}}return{intake:null,medication:Be(e.params.id)}}function Rl({mode:e}){return{render(t){let{intake:n,medication:r}=Ll(t,e),i=r?`/treatment/${r.id}`:`/treatment`;if(!r||e===`edit`&&!n)return z({header:B({back:i}),body:I`<h1 class="screen-title" tabindex="-1">${R(`intake.title`)}</h1>
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
              ${en({name:`effect`,legend:R(`intake.effect`),options:Tc.map(e=>({value:e,label:Fc(e)})),selected:n?.effect})}
            </fieldset>
            ${H({label:R(`intake.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
          </div>`,footer:I`
          ${V({label:R(`intake.save`),type:`submit`,iconName:`check`,block:!0})}
          ${n?V({label:R(`intake.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(t,n){let{intake:r,medication:i}=Ll(n,e);if(!i)return;let a=new FormData(t),o=String(a.get(`date`)||M()),c={medicationId:i.id,takenAt:be(o,String(a.get(`time`)||ye())),dose:String(a.get(`dose`)??``),effect:a.get(`effect`),note:String(a.get(`note`)??``)};r?Ze(r.id,c):Xe(c),$(R(`intake.saved`)),s(`/treatment/${i.id}`)},actions:{async delete(t,n){let{intake:r,medication:i}=Ll(n,e);if(!await lc({title:R(`intake.deleteTitle`),text:R(`intake.deleteText`),confirmLabel:R(`intake.delete`)}))return;let a=Qe(r.id);s(`/treatment/${i.id}`),$(R(`intake.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{$e(a),n.rerender()}})}}}}var zl={none:1,mild:1,moderate:2,severe:3};function Bl(e){let t=wt(e),n=[...t.symptomLogs.map(at),...t.episodes.map(e=>e.intensity)].filter(e=>e!=null);return{entries:t,count:t.symptomLogs.length+t.episodes.length,level:n.length?Ec(Math.max(...n)):null,period:t.period}}function Vl(){let e=new Date(2024,0,1),t=new Intl.DateTimeFormat(Ut(),{weekday:`short`});return Array.from({length:7},(n,r)=>{let i=t.format(xe(e,r)).replace(`.`,``);return i.charAt(0).toLocaleUpperCase(Ut())+i.slice(1)})}function Hl(e,t,{isToday:n,isSelected:r}){let i=[pc(ve(e))];return n&&i.push(R(`calendar.today`)),t.count&&(i.push(R(`calendar.summaryEntries`,{n:t.count})),t.level&&i.push(R(`intensity.${t.level}`))),t.period&&i.push(R(`calendar.summaryPeriod`)),!t.count&&!t.period&&i.push(R(`calendar.summaryNone`)),r&&i.push(R(`calendar.selected`)),i.join(`, `)}function Ul(e,{inMonth:t,selectedKey:n,todayKey:r,cycleOn:i}){let a=Bl(e),o=e===r,s=e===n,c=a.count&&a.level?zl[a.level]:0;return I`
    <button type="button" class="${[`cal-day`,t?``:`cal-day--outside`,a.level?`cal-day--${a.level}`:``,o?`cal-day--today`:``,s?`cal-day--selected`:``].filter(Boolean).join(` `)}" id="day-${e}" data-action="selectDay" data-day="${e}"
      aria-label="${Hl(e,a,{isToday:o,isSelected:s})}"${s?I` aria-pressed="true"`:I` aria-pressed="false"`}>
      <span class="cal-day__num" aria-hidden="true">${Number(e.slice(8))}</span>
      <span class="cal-day__marks" aria-hidden="true">
        ${a.count&&!c?I`<span class="cal-ring"></span>`:``}
        ${Array.from({length:c},()=>I`<span class="cal-dot"></span>`)}
      </span>
      ${i&&a.period?I`<span class="cal-period" aria-hidden="true"></span>`:``}
    </button>`}function Wl(e,t,n){let r=Te(e),i=(r.getDay()+6)%7,a=xe(r,-i),o=M(),s=Math.ceil((i+new Date(r.getFullYear(),r.getMonth()+1,0).getDate())/7),c=Array.from({length:s*7},(e,t)=>M(xe(a,t)));return I`
    <div class="cal">
      <div class="cal-weekdays" aria-hidden="true">${Vl().map(e=>I`<span>${e}</span>`)}</div>
      <div class="cal-grid">
        ${c.map(r=>Ul(r,{inMonth:r.startsWith(e),selectedKey:t,todayKey:o,cycleOn:n}))}
      </div>
    </div>`}function Gl(e,t){let{entries:n,count:r}=Bl(e),i=r+n.intakes.length>0||!!n.sleep,a=e>M();return I`
    <section class="section cal-detail" aria-labelledby="day-title">
      <h2 class="section-title" id="day-title">${pc(ve(e))}</h2>
      ${i?Uc(n):I`<p class="empty">${R(`calendar.dayEmpty`)}</p>`}
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
    </section>`}var Kl={render(e){let t=M(),n=e.query.day??t,r=e.query.month??n.slice(0,7),i=F().cycleTracking===!0,a=r===we();return Zt(`calendar`,I`
        <h1 class="screen-title" tabindex="-1">${R(`calendar.title`)}</h1>
        <div class="cal-head">
          <button type="button" class="icon-btn" id="cal-prev" data-action="month" data-month="${Ee(r,-1)}" aria-label="${R(`calendar.prev`)}">
            ${L(`chevronLeft`)}
          </button>
          <h2 class="cal-head__title" aria-live="polite">${vc(Te(r))}</h2>
          <button type="button" class="icon-btn" id="cal-next" data-action="month" data-month="${Ee(r,1)}" aria-label="${R(`calendar.next`)}">
            ${L(`chevronRight`)}
          </button>
        </div>
        ${a?``:I`<button type="button" class="link-btn cal-today-link" data-action="goToday">${R(`calendar.backToday`)}</button>`}
        ${Wl(r,n,i)}
        <details class="cal-legend">
          <summary>${R(`calendar.legend`)}</summary>
          <ul>
            <li><span class="cal-legend__dots" aria-hidden="true"><span class="cal-dot"></span><span class="cal-dot"></span><span class="cal-dot"></span></span>${R(`calendar.legendLevels`)}</li>
            <li><span class="cal-legend__dots" aria-hidden="true"><span class="cal-ring"></span></span>${R(`calendar.legendNoIntensity`)}</li>
            ${i?I`<li><span class="cal-legend__dots" aria-hidden="true"><span class="cal-period cal-period--legend"></span></span>${R(`calendar.legendPeriod`)}</li>`:``}
          </ul>
        </details>
        ${Gl(n,i)}`)},onChange(e,t){e.name===`period`&&(vt(e.dataset.day),t.rerender())},actions:{month(e,t){let n=t.query.day;o(`/calendar?month=${e.dataset.month}${n?`&day=${n}`:``}`),t.rerender()},goToday(e,t){o(`/calendar`),t.rerender(),document.getElementById(`day-${M()}`)?.focus()},selectDay(e,t){let n=e.dataset.day;o(`/calendar?month=${n.slice(0,7)}&day=${n}`),t.rerender(),document.getElementById(`day-title`)?.scrollIntoView({block:`nearest`})},addSymptom(e){Gc({date:e.dataset.day}),a(`/log/symptoms`)},addSleep(e){a(`/sleep?date=${e.dataset.day}`)}}};function ql(e){return{from:M(xe(new Date,-(e-1))),to:M()}}function Jl(e){let t=new Map;for(let n of e)t.set(n,(t.get(n)??0)+1);return[...t].map(([e,t])=>({key:e,count:t})).sort((e,t)=>t.count-e.count)}var Yl=e=>e.length?e.reduce((e,t)=>e+t,0)/e.length:null;function Xl({from:e,to:t}){let{symptomLogs:n,episodes:r,medicationIntakes:i,medications:a,cycleEntries:o,sleepLogs:s}=Ct(),c=s.filter(n=>n.date>=e&&n.date<=t).sort((e,t)=>e.date.localeCompare(t.date)),l=n=>{let r=M(n);return r>=e&&r<=t},u=n.filter(e=>l(e.occurredAt)).sort((e,t)=>e.occurredAt.localeCompare(t.occurredAt)),d=r.filter(e=>l(e.startedAt)).sort((e,t)=>e.startedAt.localeCompare(t.startedAt)),f=i.filter(e=>l(e.takenAt)).sort((e,t)=>e.takenAt.localeCompare(t.takenAt)),p=new Set([...u.map(e=>M(e.occurredAt)),...d.map(e=>M(e.startedAt))]),m=[...u.map(at),...d.map(e=>e.intensity)].filter(e=>e!=null),h=d.filter(e=>e.endedAt).map(e=>(new Date(e.endedAt)-new Date(e.startedAt))/6e4),g=a.map(e=>{let t=f.filter(t=>t.medicationId===e.id);return{medication:e,count:t.length,effects:Jl(t.map(e=>e.effect).filter(Boolean))}}).filter(e=>e.count>0).sort((e,t)=>t.count-e.count);return{from:e,to:t,logs:u,episodes:d,intakes:f,recordCount:u.length+d.length,symptomDays:p.size,episodeCount:d.length,avgIntensity:Yl(m),avgDurationMinutes:Yl(h),symptoms:Jl([...u.flatMap(e=>e.symptoms.map(e=>e.key)),...d.flatMap(e=>(e.symptoms??[]).map(e=>e.key??e))]),vertigoTypes:Jl([...u.map(e=>e.vertigoType).filter(Boolean),...d.flatMap(e=>e.vertigoTypes??[])]),triggers:Jl(d.flatMap(e=>(e.triggers??[]).map(e=>e.key??e))),meds:g,periodDays:o.filter(n=>n.type===`period`&&n.date>=e&&n.date<=t).length,sleeps:c,avgSleepMinutes:Yl(c.map(e=>e.minutes)),sleepQuality:Jl(c.map(e=>e.quality).filter(Boolean))}}var Zl=[30,60,90];function Ql(e,t){let n=Math.max(...e.map(e=>e.count),1);return I`
    <ul class="bars">
      ${e.map(e=>I`
          <li class="bars__row">
            <span class="bars__label">${t(e.key)}</span>
            <span class="bars__value">${qt(`plural.times`,e.count)}</span>
            <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width:${Math.max(e.count/n*100,4)}%"></span></span>
          </li>`)}
    </ul>`}var $l=(e,t,{empty:n=!1}={})=>I`
  <div class="stat">
    <span class="stat__value ${n?`stat__value--empty`:``}">${t}</span>
    <span class="stat__label">${e}</span>
  </div>`,eu={render(e){let t=Zl.includes(Number(e.query.days))?Number(e.query.days):30,n=Xl(ql(t)),r=R(`insights.noValue`),i=I`
      <h1 class="screen-title" tabindex="-1">${R(`insights.title`)}</h1>
      <div class="insights-period">
        ${tn({name:`days`,legend:R(`insights.periodLabel`),selected:String(t),options:Zl.map(e=>({value:String(e),label:qt(`plural.days`,e)}))})}
      </div>`;return!n.recordCount&&!n.intakes.length&&!n.sleeps.length?Zt(`insights`,I`${i}
          <div class="coming">
            ${Ws({symbol:`chart`,size:200})}
            <p class="muted">${R(`insights.empty`)}</p>
          </div>
          ${V({label:R(`insights.report`),iconName:`fileText`,variant:`secondary`,action:`report`,block:!0})}`):Zt(`insights`,I`${i}
        <section class="card section" aria-labelledby="ov-title">
          <h2 class="card__title" id="ov-title">${R(`insights.overview`)}</h2>
          <div class="stats">
            ${$l(R(`insights.symptomDays`),n.symptomDays)}
            ${$l(R(`insights.episodes`),n.episodeCount)}
            ${$l(R(`insights.avgIntensity`),n.avgIntensity==null?r:yc(n.avgIntensity),{empty:n.avgIntensity==null})}
            ${$l(R(`insights.avgDuration`),n.avgDurationMinutes==null?r:bc(n.avgDurationMinutes),{empty:n.avgDurationMinutes==null})}
          </div>
        </section>

        <section class="card section" aria-labelledby="sym-title">
          <h2 class="card__title" id="sym-title">${R(`insights.topSymptoms`)}</h2>
          <p class="muted small">${R(`insights.topSymptomsLead`)}</p>
          ${n.symptoms.length?Ql(n.symptoms.slice(0,6),kc):I`<p class="muted">${R(`insights.empty`)}</p>`}
        </section>

        <section class="card section" aria-labelledby="trig-title">
          <h2 class="card__title" id="trig-title">${R(`insights.topTriggers`)}</h2>
          ${n.triggers.length?Ql(n.triggers.slice(0,6),Ic):I`<p class="muted">${R(`insights.triggersEmpty`)}</p>`}
        </section>

        <section class="card section" aria-labelledby="sleep-title">
          <h2 class="card__title" id="sleep-title">${R(`sleep.title`)}</h2>
          ${n.sleeps.length?I`<div class="stats">
                  ${$l(R(`sleep.avg`),bc(n.avgSleepMinutes))}
                  ${$l(R(`sleep.nights`),n.sleeps.length)}
                </div>
                ${n.sleepQuality.length?Ql(n.sleepQuality,Lc):``}`:I`<p class="muted">${R(`report.sleepNone`)}</p>`}
        </section>

        <section class="card section" aria-labelledby="meds-title">
          <h2 class="card__title" id="meds-title">${R(`insights.meds`)}</h2>
          ${n.meds.length?I`<ul class="med-stats">
                ${n.meds.map(e=>I`
                    <li class="med-stats__row">
                      <a href="#/treatment/${e.medication.id}" class="med-stats__name">${e.medication.name}</a>
                      <span class="med-stats__count">${qt(`plural.times`,e.count)}</span>
                      ${e.effects.length?I`<span class="med-stats__effects">${e.effects.map(e=>`${Fc(e.key)} ${qt(`plural.times`,e.count)}`).join(` · `)}</span>`:``}
                    </li>`)}
              </ul>`:I`<p class="muted">${R(`insights.medsEmpty`)}</p>`}
        </section>

        <p class="disclaimer">${L(`info`,{size:20})}<span>${R(`insights.interpretation`)}</span></p>
        <div class="section">
          ${V({label:R(`insights.report`),iconName:`fileText`,action:`report`,block:!0})}
        </div>`)},onChange(e,t){e.name===`days`&&(o(`/insights?days=${e.value}`),t.rerender())},actions:{report(e,t){a(`/report?days=${t.query.days??30}`)}}},tu={render(e){let t=Zl.includes(Number(e.query.days))?String(e.query.days):`30`,n=ql(30);return z({form:!0,header:B({back:`/insights`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`report.title`)}</h1>
        <p class="screen-lead">${R(`report.lead`)}</p>
        <div class="step-options">
          ${en({name:`range`,legend:R(`report.period`),options:[...Zl.map(e=>({value:String(e),label:qt(`plural.days`,e)})),{value:`custom`,label:R(`report.custom`)}],selected:t})}
        </div>
        <!-- Zobrazí sa iba pri „Vlastné obdobie“ (CSS :has) -->
        <div class="report-custom field-row">
          ${H({label:R(`report.from`),name:`from`,type:`date`,value:n.from})}
          ${H({label:R(`report.to`),name:`to`,type:`date`,value:n.to})}
        </div>`,footer:V({label:R(`report.create`),type:`submit`,iconName:`fileText`,block:!0})})},onSubmit(e){let t=new FormData(e),n=t.get(`range`),r,i;if(n===`custom`){if(r=String(t.get(`from`)||``),i=String(t.get(`to`)||M()),!r||r>i){nn(e,`from`,R(`report.invalidRange`));return}}else({from:r,to:i}=ql(Number(n)));a(`/report/view?from=${r}&to=${i}`)}},nu=5;function ru(e,t){return e.length?I`
    <table class="report-table">
      <tbody>
        ${e.map(e=>I`<tr><td>${t(e.key)}</td><td class="num">${qt(`plural.times`,e.count)}</td></tr>`)}
      </tbody>
    </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}function iu(e){let t=[...e.logs.map(e=>{let t=at(e);return{at:e.occurredAt,entry:R(`symptomLog.title`),detail:[Mc(e),t==null?``:R(`intensity.highest`,{value:jc(t)}),e.vertigoType?Nc(e.vertigoType):``,e.duration?Pc(e.duration):``].filter(Boolean).join(` · `)}}),...e.episodes.map(e=>({at:e.startedAt,entry:R(`episode.title`),detail:e.endedAt?`${gc(e.startedAt)} – ${gc(e.endedAt)}`:R(`episode.statusOngoing`)})),...e.intakes.filter(e=>Be(e.medicationId)?.type===`acute`||e.effect||e.episodeId).map(e=>({at:e.takenAt,entry:Be(e.medicationId)?.name??R(`today.intakeTitle`),detail:[e.dose,e.effect?Fc(e.effect):``].filter(Boolean).join(` · `)})),...e.sleeps.map(e=>({at:e.wakeTime??be(e.date,`06:00`),dateOnly:!0,entry:R(`sleep.title`),detail:[bc(e.minutes),e.quality?Lc(e.quality):``].filter(Boolean).join(` · `)}))].sort((e,t)=>e.at.localeCompare(t.at));return t.length?I`
    <table class="report-table report-table--timeline">
      <thead><tr><th>${R(`report.colDate`)}</th><th>${R(`report.colEntry`)}</th><th>${R(`report.colDetail`)}</th></tr></thead>
      <tbody>${t.map(e=>I`<tr><td>${e.dateOnly?_c(e.at):gc(e.at)}</td><td>${e.entry}</td><td>${e.detail}</td></tr>`)}</tbody>
    </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}var au={render(e){let t=e.query.from??M(),n=e.query.to??M(),r=Xl({from:t,to:n}),i=F().cycleTracking===!0,a=r.logs.filter(e=>e.note),o=R(`insights.noValue`);return z({variant:`screen--report`,header:B({back:`/insights`}),body:I`
        <h1 class="visually-hidden" tabindex="-1">${R(`report.title`)}</h1>
        <p class="report-hint">${R(`report.printHint`)}</p>
        <article class="report-doc">
          <header class="report-doc__head">
            <p class="report-doc__app">${R(`app.name`)}</p>
            <h2 class="report-doc__title screen-title" tabindex="-1">${R(`report.docTitle`)}</h2>
            <dl class="report-meta">
              <div><dt>${R(`report.period`)}</dt><dd>${_c(ve(t))} – ${_c(ve(n))}</dd></div>
              <div><dt>${R(`report.created`)}</dt><dd>${_c(new Date)}</dd></div>
            </dl>
            <p class="report-disclaimer">${R(`report.disclaimer`)}</p>
            ${r.recordCount<nu?I`<p class="report-warning">${R(`report.fewData`)}</p>`:``}
          </header>

          <section>
            <h3>${R(`report.summary`)}</h3>
            <table class="report-table">
              <tbody>
                <tr><td>${R(`insights.symptomDays`)}</td><td class="num">${r.symptomDays}</td></tr>
                <tr><td>${R(`insights.episodes`)}</td><td class="num">${r.episodeCount}</td></tr>
                <tr><td>${R(`insights.avgIntensity`)}</td><td class="num">${r.avgIntensity==null?o:yc(r.avgIntensity)}</td></tr>
                <tr><td>${R(`insights.avgDuration`)}</td><td class="num">${r.avgDurationMinutes==null?o:bc(r.avgDurationMinutes)}</td></tr>
              </tbody>
            </table>
          </section>

          <section>
            <h3>${R(`report.symptoms`)}</h3>
            ${ru(r.symptoms,kc)}
          </section>

          <section>
            <h3>${R(`report.vertigoTypes`)}</h3>
            ${ru(r.vertigoTypes,Nc)}
          </section>

          <section>
            <h3>${R(`report.triggers`)}</h3>
            ${ru(r.triggers,Ic)}
          </section>

          <section>
            <h3>${R(`report.meds`)}</h3>
            ${r.meds.length?I`<table class="report-table">
                  <tbody>
                    ${r.meds.map(e=>I`<tr>
                        <td>${[e.medication.name,e.medication.dose].filter(Boolean).join(` `)}<br /><span class="report-sub">${R(`medications.types.${e.medication.type}`)}</span></td>
                        <td class="num">${qt(`plural.times`,e.count)}</td>
                        <td>${e.effects.map(e=>`${Fc(e.key)} ${qt(`plural.times`,e.count)}`).join(`, `)||R(`treatment.effectMissing`)}</td>
                      </tr>`)}
                  </tbody>
                </table>`:I`<p class="report-none">${R(`report.none`)}</p>`}
          </section>

          <section>
            <h3>${R(`report.sleep`)}</h3>
            ${r.sleeps.length?I`<table class="report-table">
                  <tbody>
                    <tr><td>${R(`sleep.avg`)}</td><td class="num">${bc(r.avgSleepMinutes)}</td></tr>
                    <tr><td>${R(`sleep.nights`)}</td><td class="num">${r.sleeps.length}</td></tr>
                    ${r.sleepQuality.map(e=>I`<tr><td>${R(`report.sleepQuality`)}: ${Lc(e.key)}</td><td class="num">${qt(`plural.times`,e.count)}</td></tr>`)}
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
                  ${a.map(e=>I`<li><strong>${gc(e.occurredAt)}:</strong> ${e.note}</li>`)}
                </ul>
              </section>`:``}

          <section>
            <h3>${R(`report.timeline`)}</h3>
            ${iu(r)}
          </section>
        </article>`,footer:V({label:R(`report.print`),iconName:`printer`,action:`print`,block:!0})})},actions:{print(){window.print()}}},ou=[`good`,`fair`,`poor`],su=Array.from({length:17},(e,t)=>t),cu=Array.from({length:12},(e,t)=>t*5);function lu({name:e,label:t,values:n,selected:r,suffix:i=``}){return I`
    <div class="field">
      <label class="field__label" for="f-${e}">${t}</label>
      <select class="field__input" id="f-${e}" name="${e}" aria-describedby="f-${e}-error">
        ${n.map(e=>I`<option value="${e}"${e===r?I` selected`:``}>${e}${i}</option>`)}
      </select>
    </div>`}var uu={render(e){let t=e.query.date??M(),n=yt(t),r=n?Math.floor(n.minutes/60):7,i=n?Math.min(55,Math.round(n.minutes%60/5)*5):0;return z({form:!0,header:B({back:`/today`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`sleep.formTitle`)}</h1>
        <p class="screen-lead">${R(`sleep.lead`)}</p>
        <div class="form-stack">
          ${H({label:R(`sleep.date`),name:`date`,type:`date`,value:t})}
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${R(`sleep.duration`)}</legend>
            <div class="field-row">
              ${lu({name:`hours`,label:R(`sleep.hours`),values:su,selected:r,suffix:` h`})}
              ${lu({name:`minutes`,label:R(`sleep.minutes`),values:cu,selected:i,suffix:` min`})}
            </div>
            <p class="field__error" id="f-hours-error" hidden></p>
          </fieldset>
          <fieldset class="form-section form-section--tight">
            <legend class="field__label">${R(`sleep.quality`)} <span class="field__optional">(${R(`common.optional`)})</span></legend>
            ${en({name:`quality`,legend:R(`sleep.quality`),options:ou.map(e=>({value:e,label:R(`sleep.qualities.${e}`)})),selected:n?.quality})}
          </fieldset>
          ${H({label:R(`sleep.note`),name:`note`,value:n?.note??``,multiline:!0,optional:!0})}
        </div>`,footer:I`
        ${V({label:R(`sleep.save`),type:`submit`,iconName:`check`,block:!0})}
        ${n?V({label:R(`sleep.delete`),variant:`danger`,action:`delete`,block:!0}):``}`})},onSubmit(e){let t=new FormData(e),n=Number(t.get(`hours`))*60+Number(t.get(`minutes`));n<=0?nn(e,`hours`,R(`sleep.durationRequired`)):(bt({date:String(t.get(`date`)||M()),minutes:n,quality:t.get(`quality`),note:String(t.get(`note`)??``)}),$(R(`sleep.saved`)),s(`/today`))},actions:{async delete(e,t){let n=t.query.date??M();if(!await lc({title:R(`sleep.deleteTitle`),text:R(`sleep.deleteText`),confirmLabel:R(`sleep.delete`)}))return;let r=xt(n);s(`/today`),$(R(`sleep.deletedToast`),{actionLabel:R(`common.undo`),onAction:()=>{St(r),t.rerender()}})}}},du=`2026-10`,fu=[[`smartphone`,`consent.factDevice`],[`shield`,`consent.factNoServer`],[`lock`,`consent.factPin`],[`download`,`consent.factControl`]];function pu(){let e=document.querySelectorAll(`input[name="consent"]:checked`).length;document.getElementById(`consent-submit`).disabled=e<2}function mu({onboarding:e}){let t=`/start/privacy`;return{render(){let n=!!F().consent?.healthDataAt,r=e?Js(t):null;return z({form:!0,header:e?B({back:r.prev,step:r.step,total:r.total}):``,variant:e?``:`screen--tab`,body:I`
          <h1 class="screen-title" tabindex="-1">${R(`consent.title`)}</h1>
          <p class="screen-lead">${R(`consent.lead`)}</p>
          <ul class="facts-list">
            ${fu.map(([e,t])=>I`<li>${L(e,{size:22})}<span>${R(t)}</span></li>`)}
          </ul>
          <div class="step-options">
            ${en({name:`consent`,type:`checkbox`,legend:R(`consent.title`),options:[{value:`health`,label:R(`consent.health`)},{value:`age`,label:R(`consent.age`)}],selected:n?[`health`,`age`]:[]})}
          </div>
          <p class="section-sm"><a href="#/privacy-policy">${R(`consent.policyLink`)}</a></p>`,footer:V({label:R(`consent.submit`),type:`submit`,id:`consent-submit`,disabled:!n,block:!0})})},onChange(e){e.name===`consent`&&pu()},onSubmit(n){let r=new FormData(n).getAll(`consent`);if(!r.includes(`health`)||!r.includes(`age`))return;let i=new Date().toISOString();Ie({consent:{healthDataAt:i,ageConfirmedAt:i,policyVersion:du}}),a(e?Js(t).next:`/today`,{replace:!e})}}}var hu=[`controller`,`data`,`storage`,`purpose`,`legal`,`rights`,`security`,`backup`,`age`,`changes`],gu={render(){return z({header:B({back:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`privacyPolicy.title`)}</h1>
        <p class="screen-lead">${on(R(`privacyPolicy.draft`),{neutral:!0})} ${R(`privacyPolicy.version`,{version:du})}</p>
        <p class="field__hint section-sm">${R(`privacyPolicy.draftNote`)}</p>
        <div class="policy">
          ${hu.map(e=>I`
              <section>
                <h2 class="section-title">${R(`privacyPolicy.${e}Title`)}</h2>
                <p>${R(`privacyPolicy.${e}Text`)}</p>
              </section>`)}
        </div>`})}},_u=`/start/profile`,vu={render(){let{step:e,total:t,prev:n}=Js(_u);return z({form:!0,header:B({back:n,step:e,total:t}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`profileSetup.title`)}</h1>
        <p class="screen-lead">${R(`profileSetup.lead`)}</p>
        <div class="form-stack">
          ${H({label:R(`profileSetup.nameLabel`),name:`name`,value:F().name,placeholder:R(`profileSetup.namePlaceholder`),hint:R(`profileSetup.nameHint`),autocomplete:`given-name`,maxlength:40})}
          <div class="card card--accent pin-offer">
            <div class="pin-offer__head">${L(`lock`,{size:22})}<h2 class="card__title">${R(`profileSetup.pinTitle`)}</h2></div>
            <p class="muted">${R(j()?`profileSetup.pinAlready`:`profileSetup.pinText`)}</p>
          </div>
        </div>`,footer:V({label:R(`common.continue`),type:`submit`,block:!0})})},onSubmit(e){let t=String(new FormData(e).get(`name`)??``).trim();Ie({name:t,nameSetAt:t?new Date().toISOString():null});let n=Js(_u).next;j()?a(n):a(`/security/pin?mode=set&next=${encodeURIComponent(n)}`)}};function yu(){return I`
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
    </div>`}function bu({onComplete:e}){let t=``,n=!1;function r(){let e=document.getElementById(`pin-dots`);e&&([...e.children].forEach((e,n)=>e.classList.toggle(`is-filled`,n<t.length)),e.setAttribute(`aria-label`,R(`pin.progress`,{n:t.length,total:6})))}let i={async digit(a){if(!(n||t.length>=6)&&(t+=a,r(),t.length===6)){let a=t;n=!0,i.setDisabled(!0);try{await e(a)}finally{n=!1,t=``,r(),i.setDisabled(!1)}}},backspace(){n||(t=t.slice(0,-1),r())},status(e,{error:t=!1}={}){let n=document.getElementById(`pin-status`);n&&(n.textContent=e??``,n.classList.toggle(`pin__status--error`,t))},setDisabled(e){document.querySelectorAll(`.pinpad__key`).forEach(t=>{t.disabled=e})},listenToKeyboard(){let e=e=>{/^[0-9]$/.test(e.key)?i.digit(e.key):e.key===`Backspace`&&i.backspace()};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)}};return i}function xu(e,t){let n=Math.ceil((e-Date.now())/1e3);return n<=120?R(`pin.blockedSeconds`,{n:Math.max(n,1)}):R(`pin.blocked`,{time:t(e)})}function Su(e){if(/^(\d)\1+$/.test(e))return!0;let t=[...e].slice(1).map((t,n)=>Number(t)-Number(e[n]));return t.every(e=>e===1)||t.every(e=>e===-1)}var Cu={set:`new`,change:`current`,disable:`current`},wu=null,Tu=null;function Eu(){return R(`pin.prompt.${wu.step}`)}function Du(){let e=document.querySelector(`.pin-setup__prompt`);e&&(e.textContent=Eu())}function Ou(e){return e?.blockedUntil?xu(e.blockedUntil,mc):R(`pin.wrong`)}var ku={render(e){let t=[`set`,`change`,`disable`].includes(e.query.mode)?e.query.mode:`set`;return wu={mode:t,step:Cu[t],first:null},z({variant:`screen--pin`,header:B({back:e.query.next?`/start/profile`:`/profile`}),body:I`
        <h1 class="screen-title" tabindex="-1">${R(`pin.title.${t}`)}</h1>
        ${t===`set`?I`<p class="screen-lead">${R(`pin.setLead`)}</p>`:``}
        <p class="pin-setup__prompt">${Eu()}</p>
        ${yu()}`})},mount(e,t){return Tu=bu({onComplete:async e=>{if(Tu.status(``),wu.step===`current`){Tu.status(R(`pin.checking`));try{await de(e)}catch(e){Tu.status(Ou(e),{error:!0});return}if(wu.mode===`disable`){await me(Ct()),$(R(`pin.disabled`)),s(`/profile`);return}wu.step=`new`,Tu.status(``),Du()}else if(wu.step===`new`){if(Su(e)){Tu.status(R(`pin.weak`),{error:!0});return}wu.first=e,wu.step=`confirm`,Du()}else e===wu.first?(Tu.status(R(`pin.saving`)),wu.mode===`set`?await fe(e,Ct(),{language:F().language,theme:F().theme}):await pe(e),$(R(wu.mode===`set`?`pin.enabled`:`pin.changed`)),t.query.next?a(t.query.next,{replace:!0}):s(`/profile`)):(wu.step=`new`,wu.first=null,Du(),Tu.status(R(`pin.mismatch`),{error:!0}))}}),Tu.listenToKeyboard()},actions:{pinDigit(e){Tu?.digit(e.dataset.digit)},pinBackspace(){Tu?.backspace()}}},Au=null;function ju(){let e=ie();return e>Date.now()&&(Au.setDisabled(!0),Au.status(xu(e,mc),{error:!0}),!0)}n(`/start/language`,Gs),n(`/start/welcome`,Ks),n(`/start/privacy`,mu({onboarding:!0})),n(`/start/goals`,Zs),n(`/start/condition`,ec),n(`/start/cycle`,rc),n(`/start/medications`,oc),n(`/start/medications/new`,dc({returnTo:`/start/medications`})),n(`/start/reminders`,cc),n(`/start/profile`,vu),n(`/consent`,mu({onboarding:!1})),n(`/privacy-policy`,gu),n(`/security/pin`,ku),n(`/lock`,{render(){return z({variant:`screen--pin screen--lock`,body:I`
        <div class="lock">
          ${Us()}
          <h1 class="screen-title lock__title" tabindex="-1">${R(`lock.title`)}</h1>
          <p class="pin-setup__prompt">${R(`lock.lead`)}</p>
          ${yu()}
          <button type="button" class="link-btn lock__forgot" data-action="forgot">${R(`lock.forgot`)}</button>
        </div>`})},mount(){Au=bu({onComplete:async e=>{Au.status(R(`pin.checking`));try{let t=await ue(e);Au.status(``),Fs(t),a(Bs(),{replace:!0})}catch(e){e?.code===`blocked`||e?.blockedUntil?Au.status(xu(e.blockedUntil,mc),{error:!0}):Au.status(R(`pin.wrong`),{error:!0})}}});let e=ju(),t=setInterval(()=>{let t=ju();!t&&e&&(Au.setDisabled(!1),Au.status(``)),e=t},1e3),n=Au.listenToKeyboard();return()=>{clearInterval(t),n()}},actions:{pinDigit(e){ie()<=Date.now()&&Au?.digit(e.dataset.digit)},pinBackspace(){Au?.backspace()},async forgot(){await lc({title:R(`lock.forgotTitle`),text:R(`lock.forgotText`),confirmLabel:R(`lock.forgotConfirm`)})&&(ge(),je(),a(`/start/language`,{replace:!0}))}}}),n(`/today`,tl),n(`/episode/:id`,ol),n(`/log/symptoms`,vl),n(`/log/intensity`,xl),n(`/log/vertigo`,Cl),n(`/log/details`,El),n(`/symptom/:id`,Ol),n(`/calendar`,Kl),n(`/insights`,eu),n(`/report`,tu),n(`/report/view`,au),n(`/sleep`,uu),n(`/treatment`,jl),n(`/treatment/new`,dc({returnTo:`/treatment`,withDates:!0})),n(`/treatment/:id`,Il),n(`/treatment/:id/edit`,dc({returnTo:e=>`/treatment/${e.params.id}`,withDates:!0})),n(`/treatment/:id/intake`,Rl({mode:`new`})),n(`/intake/:id`,Rl({mode:`edit`})),n(`/profile`,ul),n(`/styleguide`,pl);var Mu=[`/privacy-policy`,`/security/pin`];function Nu(e){return Ls()?e===`/lock`?`/today`:e===`/styleguide`?null:F().language?Le()?e===`/`||e.startsWith(`/start/`)?`/today`:F().consent?.healthDataAt?e.startsWith(`/log/`)&&!Kc()?`/today`:null:e===`/consent`||e===`/privacy-policy`?null:`/consent`:e.startsWith(`/start/`)||Mu.includes(e)?null:`/start/welcome`:e===`/start/language`?null:`/start/language`:(zs(e),e===`/lock`?null:`/lock`)}var Pu=document.getElementById(`app`),Fu=null;function Iu({navigation:e=!0}={}){let{path:t,query:n}=r(),o=Nu(t);if(o)return a(o,{replace:!0});let s=i(t);if(!s)return a(`/today`,{replace:!0});let c=e?null:document.activeElement?.id,l=e?0:Pu.querySelector(`.screen__body`)?.scrollTop??0;Fu?.cleanup?.();let u=document.getElementById(`dialog`);e&&u.open&&u.close();let d={params:s.params,query:n,rerender:()=>Iu({navigation:!1})};Pu.innerHTML=String(s.screen.render(d)),Fu={screen:s.screen,ctx:d,cleanup:s.screen.mount?.(Pu,d)};let f=Pu.querySelector(`.screen__body`);f&&(f.scrollTop=l),e?(Pu.querySelector(`.screen-title`)?.focus({preventScroll:!0}),ms(Pu)):c&&document.getElementById(c)?.focus({preventScroll:!0})}var Lu={back:e=>s(e.dataset.fallback||`/today`)};Pu.addEventListener(`click`,e=>{let t=e.target.closest(`a[href^="#/"]`);if(t){e.preventDefault(),a(t.getAttribute(`href`).slice(1),{replace:t.hasAttribute(`data-replace`)});return}let n=e.target.closest(`[data-action]`);if(!n||!Fu)return;let r=Fu.screen.actions?.[n.dataset.action]??Lu[n.dataset.action];r&&(e.preventDefault(),r(n,Fu.ctx,e))}),Pu.addEventListener(`submit`,e=>{e.preventDefault(),Fu?.screen.onSubmit?.(e.target,Fu.ctx,e)}),Pu.addEventListener(`change`,e=>{e.target.matches(`.option input`)&&hs(e.target),Fu?.screen.onChange?.(e.target,Fu.ctx,e)}),Pu.addEventListener(`input`,e=>{rn(e.target),Fu?.screen.onInput?.(e.target,Fu.ctx,e)});var Ru=0;function zu(){Rs(r().path),a(`/lock`,{replace:!0})}document.addEventListener(`visibilitychange`,()=>{if(!j()||!Ls())return;let e=F().autoLockMinutes??1;document.hidden?(Ru=Date.now(),e===0&&zu()):Ru&&Date.now()-Ru>=e*6e4&&zu()}),Is(),history.state||history.replaceState({index:0},``,location.href),c(()=>Iu());