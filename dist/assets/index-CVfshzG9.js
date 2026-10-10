import{r as _,b as At,F as ze,C as Ye,d as Be,D as st,e as Rt,f as Dt,h as Tt,X as Oe,I as rt,i as tt,T as ot,j as zt,G as yt,E as Ot,k as qt,P as Xt,R as vt,l as jt,m as Nt,n as Vt,o as wt,S as _e,p as Fe,q as Gt,s as Yt,t as Bt,M as Ut,L as qe,A as Ge,u as Ht,Z as Wt,v as Kt,w as De,x as kt,W as Jt,y as $t,z as Qt,B as Zt,H as ea,J as ta,K as aa,N as sa,O as ra,Q as ct,U as oa,V as na}from"./vendor-react-By8703fN.js";import{p as Ue,d as la,k as ia}from"./vendor-math-CJWJGkU0.js";import{P as et}from"./vendor-plotly-D_9Gs2QT.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var _t={exports:{}},He={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var da=_,ca=Symbol.for("react.element"),xa=Symbol.for("react.fragment"),ma=Object.prototype.hasOwnProperty,ua=da.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,pa={key:!0,ref:!0,__self:!0,__source:!0};function Ct(t,a,r){var o,i={},s=null,d=null;r!==void 0&&(s=""+r),a.key!==void 0&&(s=""+a.key),a.ref!==void 0&&(d=a.ref);for(o in a)ma.call(a,o)&&!pa.hasOwnProperty(o)&&(i[o]=a[o]);if(t&&t.defaultProps)for(o in a=t.defaultProps,a)i[o]===void 0&&(i[o]=a[o]);return{$$typeof:ca,type:t,key:s,ref:d,props:i,_owner:ua.current}}He.Fragment=xa;He.jsx=Ct;He.jsxs=Ct;_t.exports=He;var e=_t.exports,at={},xt=At;at.createRoot=xt.createRoot,at.hydrateRoot=xt.hydrateRoot;function me(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("La expresión matemática no puede estar vacía.");const a=t.trim();let r;try{r=Ue(a)}catch(d){throw new Error(`Error de sintaxis matemática: ${d.message||"Expresión no válida."}`)}const o=r.compile();return{evaluate:d=>{try{const n={x:d,e:Math.E,pi:Math.PI,PI:Math.PI},c=o.evaluate(n);if(typeof c=="object"&&c!==null&&"re"in c){if(Math.abs(c.im)>1e-12)throw new Error(`Resultado complejo no soportado en x = ${d}`);return c.re}if(typeof c!="number"||!Number.isFinite(c)||Number.isNaN(c))throw new Error(`Resultado no definido o infinito en x = ${d}`);return c}catch(n){throw new Error(`Error evaluando f(${d}): ${n.message}`)}},ast:r,toTex:()=>{try{return r.toTex({parenthesis:"auto"})}catch{return a}}}}function We(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("La expresión matemática no puede estar vacía.");const a=t.trim();let r;try{r=Ue(a)}catch(d){throw new Error(`Error de sintaxis en f(x, y): ${d.message||"Expresión no válida."}`)}const o=r.compile();return{evaluate:(d,n)=>{try{const c={x:d,y:n,e:Math.E,pi:Math.PI,PI:Math.PI},l=o.evaluate(c);if(typeof l=="object"&&l!==null&&"re"in l){if(Math.abs(l.im)>1e-12)throw new Error(`Resultado complejo en (x=${d}, y=${n})`);return l.re}if(typeof l!="number"||!Number.isFinite(l)||Number.isNaN(l))throw new Error(`Resultado indefinido en (x=${d}, y=${n})`);return l}catch(c){throw new Error(`Error evaluando f(${d}, ${n}): ${c.message}`)}},ast:r,toTex:()=>{try{return r.toTex({parenthesis:"auto"})}catch{return a}}}}function fa(t,a){try{const r=la(t,"x"),o=r.compile();return{evaluateDerivative:s=>{try{const d={x:s,e:Math.E,pi:Math.PI,PI:Math.PI},n=o.evaluate(d);if(typeof n!="number"||!Number.isFinite(n)||Number.isNaN(n))throw new Error("Derivada simbólica indefinida.");return n}catch{return mt(a,s)}},isSymbolic:!0,toTex:()=>r.toTex({parenthesis:"auto"})}}catch{return{evaluateDerivative:r=>mt(a,r),isSymbolic:!1,toTex:()=>`\\frac{d}{dx}\\left[${t}\\right]`}}}function mt(t,a,r=1e-5){const o=t(a+2*r),i=t(a+r),s=t(a-r),d=t(a-2*r);return(-o+8*i-8*s+d)/(12*r)}function N(t,a=6){return t==null||Number.isNaN(t)?"NaN":Number.isFinite(t)?Math.abs(t)<1e-12&&t!==0?"0":Math.abs(t)>=1e6||Math.abs(t)<1e-4&&t!==0?t.toExponential(Math.max(2,a-2)):Number(t.toFixed(a)).toString():t>0?"+∞":"-∞"}function ut(t){if(!t||typeof t!="string"||t.trim()==="")throw new Error("La expresión matemática no puede estar vacía.");const a=t.trim();let r;try{r=Ue(a)}catch(d){throw new Error(`Error de sintaxis en expresión: ${d.message||"Expresión no válida."}`)}const o=r.compile();return{evaluate:(d,n,c)=>{try{const l={t:d,x:d,y1:n,y:n,y2:c,v:c,z:c,e:Math.E,pi:Math.PI,PI:Math.PI},x=o.evaluate(l);if(typeof x=="object"&&x!==null&&"re"in x){if(Math.abs(x.im)>1e-12)throw new Error(`Resultado complejo en t = ${d}`);return x.re}if(typeof x!="number"||!Number.isFinite(x)||Number.isNaN(x))throw new Error(`Resultado no numérico o infinito en t = ${d}`);return x}catch(l){throw new Error(`Error evaluando "${a}" en (t=${d}, y1=${n}, y2=${c}): ${l.message}`)}},ast:r,toTex:()=>{try{return r.toTex({parenthesis:"auto"})}catch{return a}}}}const Ce=100,fe=1e-14;function ba(t,a,r,o=1e-6,i=Ce){const{evaluate:s}=me(t),d=Math.min(Math.max(1,i),Ce);let n=s(a),c=s(r);if(Math.abs(n)<fe)return{root:a,converged:!0,iterations:[{k:1,a,b:r,xi:a,f_xi:n,ea:0,ea_percent:0}],message:`El extremo inferior a = ${a} es exactamente una raíz de f(x).`,method:"Bisección",plotPoints:[{x:a,y:n,k:1}]};if(Math.abs(c)<fe)return{root:r,converged:!0,iterations:[{k:1,a,b:r,xi:r,f_xi:c,ea:0,ea_percent:0}],message:`El extremo superior b = ${r} es exactamente una raíz de f(x).`,method:"Bisección",plotPoints:[{x:r,y:c,k:1}]};if(n*c>0)throw new Error(`Violación del Teorema de Bolzano: f(a) = ${n.toFixed(6)} y f(b) = ${c.toFixed(6)} tienen el mismo signo (${n>0?"ambos positivos":"ambos negativos"}). No se puede garantizar la existencia de una raíz en el intervalo [${a}, ${r}]. Por favor, elija un intervalo donde los signos sean opuestos.`);const l=[],x=[];let m=a,u=r,b=null,p=m,g=!1;for(let h=1;h<=d;h++){const f=(m+u)/2,k=s(f);let C=null,E=null;if(b!==null&&(C=Math.abs(f-b),E=Math.abs(f)>fe?C/Math.abs(f)*100:C*100),l.push({k:h,a:m,b:u,xi:f,f_xi:k,ea:C!==null?C:Math.abs(u-m),ea_percent:E!==null?E:100}),x.push({x:f,y:k,k:h}),p=f,Math.abs(k)<fe||C!==null&&C<o){g=!0;break}n*k<0?(u=f,c=k):(m=f,n=k),b=f}return{root:p,converged:g,iterations:l,message:g?`Convergencia alcanzada exitosamente en ${l.length} iteraciones.`:`ADVERTENCIA: No se alcanzó la tolerancia especificada (|ea| < ${o}) tras el máximo de ${d} iteraciones. El valor mostrado es la mejor aproximación alcanzada, no un resultado exacto.`,method:"Bisección",plotPoints:x}}function ha(t,a,r,o=1e-6,i=Ce){const{evaluate:s}=me(t),d=Math.min(Math.max(1,i),Ce);let n=s(a),c=s(r);if(Math.abs(n)<fe)return{root:a,converged:!0,iterations:[{k:1,a,b:r,xi:a,f_xi:n,ea:0,ea_percent:0}],message:`El extremo inferior a = ${a} es una raíz exacta de f(x).`,method:"Regula Falsi",plotPoints:[{x:a,y:n,k:1}]};if(Math.abs(c)<fe)return{root:r,converged:!0,iterations:[{k:1,a,b:r,xi:r,f_xi:c,ea:0,ea_percent:0}],message:`El extremo superior b = ${r} es una raíz exacta de f(x).`,method:"Regula Falsi",plotPoints:[{x:r,y:c,k:1}]};if(n*c>0)throw new Error(`Violación del Teorema de Bolzano: f(a) y f(b) tienen el mismo signo. No se garantiza raíz en [${a}, ${r}]. Elija otro intervalo con cambio de signo.`);const l=[],x=[];let m=a,u=r,b=null,p=m,g=!1;for(let h=1;h<=d;h++){const f=c-n;if(Math.abs(f)<fe)throw new Error(`División entre cero: f(b) - f(a) ≈ 0 en la iteración ${h}. Los valores de la función son indistinguibles.`);const k=u-c*(u-m)/f,C=s(k);let E=null,$=null;if(b!==null&&(E=Math.abs(k-b),$=Math.abs(k)>fe?E/Math.abs(k)*100:E*100),l.push({k:h,a:m,b:u,xi:k,f_xi:C,ea:E!==null?E:Math.abs(u-m),ea_percent:$!==null?$:100}),x.push({x:k,y:C,k:h}),p=k,Math.abs(C)<fe||E!==null&&E<o){g=!0;break}n*C<0?(u=k,c=C):(m=k,n=C),b=k}return{root:p,converged:g,iterations:l,message:g?`Convergencia alcanzada exitosamente en ${l.length} iteraciones.`:`ADVERTENCIA: No se alcanzó la tolerancia deseada (|ea| < ${o}) en ${d} iteraciones. Se presenta la mejor aproximación.`,method:"Regula Falsi",plotPoints:x}}function ga(t,a,r=1e-6,o=Ce){const{evaluate:i}=me(t),{evaluateDerivative:s,isSymbolic:d}=fa(t,i),n=Math.min(Math.max(1,o),Ce),c=[],l=[];let x=a,m=x,u=!1;for(let b=1;b<=n;b++){const p=i(x),g=s(x);if(Math.abs(g)<fe)throw new Error(`División entre cero: La derivada f'(${x.toFixed(6)}) = 0 en la iteración ${b}. La recta tangente es horizontal. Sugerencia: cambie el punto inicial x0 o utilice el método de Bisección o Secante.`);const h=x-p/g,f=Math.abs(h-x),k=Math.abs(h)>fe?f/Math.abs(h)*100:f*100;if(c.push({k:b,xi:x,next_xi:h,f_xi:p,df_xi:g,ea:f,ea_percent:k}),l.push({x,y:p,k:b}),m=h,Math.abs(p)<fe||f<r){u=!0,l.push({x:h,y:i(h),k:b+1});break}x=h}return{root:m,converged:u,iterations:c,message:u?`Convergencia alcanzada en ${c.length} iteraciones. (Derivada: ${d?"Analítica Simbólica":"Numérica Central de orden superior"}).`:`ADVERTENCIA: No se alcanzó la tolerancia (|ea| < ${r}) en ${n} iteraciones. Posible oscilación o divergencia. Se presenta el último valor calculado.`,method:"Newton-Raphson",plotPoints:l}}function ya(t,a,r,o=1e-6,i=Ce){const{evaluate:s}=me(t),d=Math.min(Math.max(1,i),Ce);let n=a,c=r,l=s(n),x=s(c);const m=[],u=[{x:n,y:l,k:0},{x:c,y:x,k:1}];let b=c,p=!1;for(let g=1;g<=d;g++){const h=x-l;if(Math.abs(h)<fe)throw new Error(`División entre cero: f(x₁) - f(x₀) = 0 en la iteración ${g} (f(${c.toFixed(6)}) = ${x.toFixed(6)} y f(${n.toFixed(6)}) = ${l.toFixed(6)}). Pendiente horizontal en la secante. Sugerencia: use puntos iniciales más separados o recurra al método de Bisección.`);const f=c-x*(c-n)/h,k=s(f),C=Math.abs(f-c),E=Math.abs(f)>fe?C/Math.abs(f)*100:C*100;if(m.push({k:g,x0:n,x1:c,xi:f,f_xi:k,ea:C,ea_percent:E}),u.push({x:f,y:k,k:g+1}),b=f,Math.abs(k)<fe||C<o){p=!0;break}n=c,l=x,c=f,x=k}return{root:b,converged:p,iterations:m,message:p?`Convergencia alcanzada en ${m.length} iteraciones.`:`ADVERTENCIA: No se alcanzó la tolerancia tras ${d} iteraciones. Se presenta la mejor aproximación calculada.`,method:"Secante",plotPoints:u}}function xe({expression:t,displayMode:a=!1,className:r=""}){const o=_.useMemo(()=>{if(!t)return"";try{return ia.renderToString(t,{displayMode:a,throwOnError:!1,strict:!1})}catch{return`<span class="text-rose-400 font-mono text-xs">${t}</span>`}},[t,a]);return e.jsx("span",{className:`inline-block overflow-x-auto align-middle ${r}`,dangerouslySetInnerHTML:{__html:o}})}function ke({data:t=[],layout:a={},config:r={},className:o=""}){const i=_.useRef(null);return _.useEffect(()=>{if(!i.current)return;const s={autosize:!0,paper_bgcolor:"#1e293b",plot_bgcolor:"#0f172a",font:{family:"Inter, system-ui, sans-serif",color:"#cbd5e1",size:12},margin:{l:55,r:25,t:40,b:45},xaxis:{gridcolor:"#334155",zerolinecolor:"#64748b",zerolinewidth:1.5,tickfont:{color:"#94a3b8"},title:{text:"x",font:{color:"#e2e8f0",size:13}}},yaxis:{gridcolor:"#334155",zerolinecolor:"#64748b",zerolinewidth:1.5,tickfont:{color:"#94a3b8"},title:{text:"y",font:{color:"#e2e8f0",size:13}}},legend:{font:{color:"#cbd5e1"},bgcolor:"rgba(30, 41, 59, 0.85)",bordercolor:"#475569",borderwidth:1},...a},d={responsive:!0,displayModeBar:!0,displaylogo:!1,modeBarButtonsToRemove:["lasso2d","select2d"],toImageButtonOptions:{format:"png",filename:"grafico_metodos_numericos",height:600,width:900,scale:2},...r};et.react(i.current,t,s,d);const n=()=>{i.current&&et.Plots.resize(i.current)},c=new ResizeObserver(()=>n());return c.observe(i.current),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n),c.disconnect(),i.current&&et.purge(i.current)}},[t,a,r]),e.jsx("div",{ref:i,className:`w-full h-80 md:h-96 rounded-xl border border-slate-700/60 overflow-hidden shadow-xl shadow-slate-950/40 ${o}`})}function Le({columns:t,data:a=[],precision:r=6,title:o="Tabla de Resultados",filename:i="resultados_metodos_numericos"}){const[s,d]=_.useState(1),[n,c]=_.useState(10),[l,x]=_.useState(!1),m=Math.ceil(a.length/n)||1,u=_.useMemo(()=>{if(n>=a.length)return a;const h=(s-1)*n;return a.slice(h,h+n)},[a,s,n]),b=()=>{if(a.length===0)return;const h=t.map($=>`"${$.label}"`).join(","),f=a.map($=>t.map(T=>{let v=$[T.key];return typeof v=="number"&&(v=Number(v.toFixed(r))),`"${v??""}"`}).join(",")),k="data:text/csv;charset=utf-8,\uFEFF"+[h,...f].join(`
`),C=encodeURI(k),E=document.createElement("a");E.setAttribute("href",C),E.setAttribute("download",`${i}.csv`),document.body.appendChild(E),E.click(),document.body.removeChild(E)},p=()=>{if(a.length===0)return;const h=`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(a,null,2))}`,f=document.createElement("a");f.setAttribute("href",h),f.setAttribute("download",`${i}.json`),document.body.appendChild(f),f.click(),document.body.removeChild(f)},g=()=>{if(a.length===0)return;const h=t.map(k=>k.label).join("	"),f=a.map(k=>t.map(C=>{const E=k[C.key];return typeof E=="number"?Number(E.toFixed(r)):E??""}).join("	"));navigator.clipboard.writeText([h,...f].join(`
`)).then(()=>{x(!0),setTimeout(()=>x(!1),2e3)})};return!a||a.length===0?e.jsx("div",{className:"p-8 text-center text-slate-400 bg-slate-800/40 rounded-xl border border-slate-700/60",children:"No hay datos para mostrar. Ejecute el cálculo para visualizar los resultados."}):e.jsxs("div",{className:"w-full bg-slate-800/60 rounded-xl border border-slate-700/70 overflow-hidden shadow-lg shadow-slate-950/30",children:[e.jsxs("div",{className:"px-4 py-3 bg-slate-800/90 border-b border-slate-700/70 flex flex-wrap items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(ze,{className:"w-4 h-4 text-teal-400"}),e.jsx("h4",{className:"text-sm font-semibold text-slate-200",children:o}),e.jsxs("span",{className:"text-xs px-2 py-0.5 rounded-full bg-slate-700 text-teal-300 font-mono",children:[a.length," ",a.length===1?"fila":"filas"]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:g,title:"Copiar datos para Excel",className:"flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors",children:[l?e.jsx(Ye,{className:"w-3.5 h-3.5 text-emerald-400"}):e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:l?"Copiado":"Copiar"})]}),e.jsxs("button",{onClick:b,className:"flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 rounded-lg transition-colors",children:[e.jsx(st,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"CSV"})]}),e.jsxs("button",{onClick:p,className:"flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg transition-colors",children:[e.jsx(Rt,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"JSON"})]}),e.jsxs("select",{value:n,"aria-label":"Filas por página",onChange:h=>{c(Number(h.target.value)),d(1)},className:"text-xs bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-500",children:[e.jsx("option",{value:10,children:"10 / pág"}),e.jsx("option",{value:25,children:"25 / pág"}),e.jsx("option",{value:50,children:"50 / pág"}),e.jsx("option",{value:1e3,children:"Todas"})]})]})]}),e.jsx("div",{className:"overflow-x-auto max-h-[460px] overflow-y-auto",children:e.jsxs("table",{className:"w-full text-left text-xs sm:text-sm border-collapse",children:[e.jsx("thead",{className:"bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm",children:e.jsx("tr",{className:"border-b border-slate-700 text-slate-400",children:t.map(h=>e.jsx("th",{className:"px-4 py-3 font-semibold whitespace-nowrap",children:h.label},h.key))})}),e.jsx("tbody",{className:"divide-y divide-slate-700/50 font-mono text-slate-200",children:u.map((h,f)=>e.jsx("tr",{className:"hover:bg-slate-700/30 transition-colors odd:bg-slate-800/30 even:bg-slate-800/10",children:t.map(k=>{const C=h[k.key];return e.jsx("td",{className:"px-4 py-2.5 whitespace-nowrap",children:k.render?k.render(C,h):typeof C=="number"?N(C,r):C!=null?String(C):"—"},k.key)})},f))})]})}),m>1&&e.jsxs("div",{className:"px-4 py-2.5 bg-slate-800/90 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400",children:[e.jsxs("div",{children:["Página ",e.jsx("span",{className:"font-semibold text-slate-200",children:s})," de"," ",e.jsx("span",{className:"font-semibold text-slate-200",children:m})]}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("button",{onClick:()=>d(h=>Math.max(1,h-1)),disabled:s===1,className:"p-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:e.jsx(Dt,{className:"w-4 h-4 text-slate-200"})}),e.jsx("button",{onClick:()=>d(h=>Math.min(m,h+1)),disabled:s===m,className:"p-1 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",children:e.jsx(Tt,{className:"w-4 h-4 text-slate-200"})})]})]})]})}function Se({type:t="info",title:a,message:r,onClose:o}){if(!r)return null;const i={error:{bg:"bg-rose-950/40 border-rose-600/60 text-rose-200",icon:e.jsx(zt,{className:"w-5 h-5 text-rose-400 shrink-0 mt-0.5"}),defaultTitle:"Error de Cálculo"},warning:{bg:"bg-amber-950/40 border-amber-600/60 text-amber-200",icon:e.jsx(ot,{className:"w-5 h-5 text-amber-400 shrink-0 mt-0.5"}),defaultTitle:"Advertencia Numérica"},success:{bg:"bg-emerald-950/40 border-emerald-600/60 text-emerald-200",icon:e.jsx(tt,{className:"w-5 h-5 text-emerald-400 shrink-0 mt-0.5"}),defaultTitle:"Cálculo Exitoso"},info:{bg:"bg-cyan-950/40 border-cyan-600/60 text-cyan-200",icon:e.jsx(rt,{className:"w-5 h-5 text-cyan-400 shrink-0 mt-0.5"}),defaultTitle:"Aviso del Sistema"}},s=i[t]||i.info;return e.jsxs("div",{role:"alert",className:`p-4 rounded-xl border flex items-start gap-3 shadow-md backdrop-blur-sm ${s.bg}`,children:[s.icon,e.jsxs("div",{className:"flex-1 text-sm",children:[e.jsx("h5",{className:"font-semibold mb-0.5 text-slate-100",children:a||s.defaultTitle}),e.jsx("div",{className:"leading-relaxed break-words",children:r})]}),o&&e.jsx("button",{onClick:o,className:"text-slate-400 hover:text-slate-200 p-1 rounded-md transition-colors","aria-label":"Cerrar alerta",children:e.jsx(Oe,{className:"w-4 h-4"})})]})}function va({curve:t=[],markers:a=[],specialPoint:r=null,xLabel:o="x",yLabel:i="y",width:s=650,height:d=320,className:n=""}){const c={top:30,right:35,bottom:45,left:65},l=s-c.left-c.right,x=d-c.top-c.bottom,m=[],u=[];t.forEach(w=>{w&&Number.isFinite(w.x)&&Number.isFinite(w.y)&&(m.push(w.x),u.push(w.y))}),a.forEach(w=>{w&&Number.isFinite(w.x)&&Number.isFinite(w.y)&&(m.push(w.x),u.push(w.y))}),r&&Number.isFinite(r.x)&&Number.isFinite(r.y)&&(m.push(r.x),u.push(r.y));let b=m.length>0?Math.min(...m):0,p=m.length>0?Math.max(...m):1,g=u.length>0?Math.min(...u):0,h=u.length>0?Math.max(...u):1;b===p&&(b-=1,p+=1),g===h&&(g-=1,h+=1);const f=p-b||1,k=h-g||1;b-=f*.08,p+=f*.08,g-=k*.08,h+=k*.08;const C=w=>c.left+(w-b)/(p-b)*l,E=w=>c.top+x-(w-g)/(h-g)*x;let $="";t.forEach((w,S)=>{if(Number.isFinite(w.x)&&Number.isFinite(w.y)){const P=C(w.x),R=E(w.y);S===0||$===""?$+=`M ${P.toFixed(1)} ${R.toFixed(1)}`:$+=` L ${P.toFixed(1)} ${R.toFixed(1)}`}});const T=[],v=[],O=5;for(let w=0;w<=O;w++){const S=b+w/O*(p-b);T.push({val:S,sx:C(S)});const P=g+w/O*(h-g);v.push({val:P,sy:E(P)})}const q=0>=g&&0<=h?E(0):null,j=0>=b&&0<=p?C(0):null;return e.jsx("div",{className:`w-full overflow-x-auto flex justify-center ${n}`,children:e.jsxs("svg",{viewBox:`0 0 ${s} ${d}`,className:"w-full max-w-[650px] h-auto bg-slate-900/90 rounded-xl border border-slate-700/80 shadow-inner font-sans",style:{minWidth:"320px"},children:[T.map((w,S)=>e.jsx("line",{x1:w.sx,y1:c.top,x2:w.sx,y2:c.top+x,stroke:"#334155",strokeDasharray:"3,3",strokeWidth:"0.8"},`grid-x-${S}`)),v.map((w,S)=>e.jsx("line",{x1:c.left,y1:w.sy,x2:c.left+l,y2:w.sy,stroke:"#334155",strokeDasharray:"3,3",strokeWidth:"0.8"},`grid-y-${S}`)),q!==null&&e.jsx("line",{x1:c.left,y1:q,x2:c.left+l,y2:q,stroke:"#94a3b8",strokeWidth:"1.2"}),j!==null&&e.jsx("line",{x1:j,y1:c.top,x2:j,y2:c.top+x,stroke:"#94a3b8",strokeWidth:"1.2"}),e.jsx("rect",{x:c.left,y:c.top,width:l,height:x,fill:"none",stroke:"#475569",strokeWidth:"1"}),$&&e.jsx("path",{d:$,fill:"none",stroke:"#38bdf8",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"}),a.map((w,S)=>e.jsx("g",{children:e.jsx("circle",{cx:C(w.x),cy:E(w.y),r:"3.5",fill:"#fbbf24",stroke:"#0f172a",strokeWidth:"1"})},`marker-${S}`)),r&&Number.isFinite(r.x)&&Number.isFinite(r.y)&&e.jsxs("g",{children:[e.jsx("circle",{cx:C(r.x),cy:E(r.y),r:"7",fill:"#10b981",stroke:"#ffffff",strokeWidth:"2"}),r.label&&e.jsx("text",{x:C(r.x)+10,y:E(r.y)-8,fill:"#34d399",fontSize:"11",fontWeight:"bold",children:r.label})]}),T.map((w,S)=>e.jsx("text",{x:w.sx,y:c.top+x+18,fill:"#94a3b8",fontSize:"10",textAnchor:"middle",fontFamily:"monospace",children:N(w.val,2)},`lbl-x-${S}`)),v.map((w,S)=>e.jsx("text",{x:c.left-8,y:w.sy+3.5,fill:"#94a3b8",fontSize:"10",textAnchor:"end",fontFamily:"monospace",children:N(w.val,2)},`lbl-y-${S}`)),e.jsx("text",{x:c.left+l/2,y:d-10,fill:"#cbd5e1",fontSize:"12",fontWeight:"bold",textAnchor:"middle",children:o}),e.jsx("text",{x:18,y:c.top+x/2,fill:"#cbd5e1",fontSize:"12",fontWeight:"bold",textAnchor:"middle",transform:`rotate(-90, 18, ${c.top+x/2})`,children:i})]})})}function ja({curve:t=[],markers:a=[],specialPoint:r=null,xLabel:o="x",yLabel:i="y",width:s=650,height:d=300}){const n={top:25,right:30,bottom:40,left:60},c=s-n.left-n.right,l=d-n.top-n.bottom,x=[],m=[];t.forEach(j=>{j&&Number.isFinite(j.x)&&Number.isFinite(j.y)&&(x.push(j.x),m.push(j.y))}),a.forEach(j=>{j&&Number.isFinite(j.x)&&Number.isFinite(j.y)&&(x.push(j.x),m.push(j.y))}),r&&Number.isFinite(r.x)&&Number.isFinite(r.y)&&(x.push(r.x),m.push(r.y));let u=x.length>0?Math.min(...x):0,b=x.length>0?Math.max(...x):1,p=m.length>0?Math.min(...m):0,g=m.length>0?Math.max(...m):1;u===b&&(u-=1,b+=1),p===g&&(p-=1,g+=1);const h=b-u||1,f=g-p||1;u-=h*.08,b+=h*.08,p-=f*.08,g+=f*.08;const k=j=>n.left+(j-u)/(b-u)*c,C=j=>n.top+l-(j-p)/(g-p)*l;let E="";t.forEach((j,w)=>{if(Number.isFinite(j.x)&&Number.isFinite(j.y)){const S=k(j.x),P=C(j.y);w===0||E===""?E+=`M ${S.toFixed(1)} ${P.toFixed(1)}`:E+=` L ${S.toFixed(1)} ${P.toFixed(1)}`}});const $=[],T=[],v=5;for(let j=0;j<=v;j++){const w=u+j/v*(b-u);$.push({val:w,sx:k(w)});const S=p+j/v*(g-p);T.push({val:S,sy:C(S)})}const O=0>=p&&0<=g?C(0):null,q=0>=u&&0<=b?k(0):null;return`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${d}" style="width:100%; max-width:650px; height:auto; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; font-family:sans-serif;">
      ${$.map(j=>`<line x1="${j.sx}" y1="${n.top}" x2="${j.sx}" y2="${n.top+l}" stroke="#e2e8f0" stroke-dasharray="3,3" stroke-width="0.8" />`).join("")}
      ${T.map(j=>`<line x1="${n.left}" y1="${j.sy}" x2="${n.left+c}" y2="${j.sy}" stroke="#e2e8f0" stroke-dasharray="3,3" stroke-width="0.8" />`).join("")}
      ${O!==null?`<line x1="${n.left}" y1="${O}" x2="${n.left+c}" y2="${O}" stroke="#64748b" stroke-width="1.2" />`:""}
      ${q!==null?`<line x1="${q}" y1="${n.top}" x2="${q}" y2="${n.top+l}" stroke="#64748b" stroke-width="1.2" />`:""}
      <rect x="${n.left}" y="${n.top}" width="${c}" height="${l}" fill="none" stroke="#94a3b8" stroke-width="1" />
      ${E?`<path d="${E}" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`:""}
      ${a.map(j=>`<circle cx="${k(j.x).toFixed(1)}" cy="${C(j.y).toFixed(1)}" r="3.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1" />`).join("")}
      ${r&&Number.isFinite(r.x)&&Number.isFinite(r.y)?`<circle cx="${k(r.x).toFixed(1)}" cy="${C(r.y).toFixed(1)}" r="6" fill="#10b981" stroke="#ffffff" stroke-width="2" />
             <text x="${(k(r.x)+8).toFixed(1)}" y="${(C(r.y)-6).toFixed(1)}" fill="#059669" font-size="11" font-weight="bold">${r.label||"Solución"}</text>`:""}
      ${$.map(j=>`<text x="${j.sx.toFixed(1)}" y="${n.top+l+16}" fill="#475569" font-size="10" text-anchor="middle" font-family="monospace">${N(j.val,2)}</text>`).join("")}
      ${T.map(j=>`<text x="${n.left-6}" y="${(j.sy+3.5).toFixed(1)}" fill="#475569" font-size="10" text-anchor="end" font-family="monospace">${N(j.val,2)}</text>`).join("")}
      <text x="${n.left+c/2}" y="${d-8}" fill="#1e293b" font-size="11" font-weight="bold" text-anchor="middle">${o}</text>
      <text x="16" y="${n.top+l/2}" fill="#1e293b" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(-90, 16, ${n.top+l/2})">${i}</text>
    </svg>
  `}function Na(t,a){const r=new Blob([a],{type:"application/x-tex;charset=utf-8"}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=t.endsWith(".tex")?t:`${t}.tex`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}function wa(t){const{moduleTitle:a="Métodos Numéricos",methodName:r="Método Numérico",problemStatement:o="Resolución numérica del problema.",mathFormulationLatex:i="f(x) = 0",methodFormulaLatex:s="",parameters:d=[],resultSummary:n={},tableColumns:c=[],tableData:l=[],plotPoints:x={}}=t,m=d.map(C=>`\\textbf{${C.label}:} & ${C.value} \\\\`).join(`
`),u=25,b=l.slice(0,u),p=l.length>u,g=c.map(()=>"c").join(""),h=c.map(C=>`\\textbf{${C.label}}`).join(" & ")+" \\\\",f=b.map(C=>c.map(E=>{const $=C[E.key];return typeof $=="number"?N($,6):$==null?"---":String($)}).join(" & ")+" \\\\").join(`
`);let k="";if(x&&x.curve&&x.curve.length>0){const C=x.curve.filter(T=>T&&Number.isFinite(T.x)&&Number.isFinite(T.y)).slice(0,100).map(T=>`(${T.x.toFixed(4)}, ${T.y.toFixed(4)})`).join(`
            `);let E="";x.markers&&x.markers.length>0&&(E=x.markers.filter(T=>T&&Number.isFinite(T.x)&&Number.isFinite(T.y)).map(T=>`(${T.x.toFixed(4)}, ${T.y.toFixed(4)})`).join(" "));let $="";x.root&&Number.isFinite(x.root.x)&&Number.isFinite(x.root.y)&&($=`(${x.root.x.toFixed(4)}, ${x.root.y.toFixed(4)})`),k=`
\\begin{figure}[H]
\\centering
\\begin{tikzpicture}
\\begin{axis}[
    width=0.88\\textwidth,
    height=7.2cm,
    grid=both,
    grid style={line width=.1pt, draw=gray!25},
    major grid style={line width=.2pt, draw=gray!50},
    axis lines=middle,
    xlabel={$${x.xLabel||"x"}$},
    ylabel={$${x.yLabel||"y"}$},
    legend pos=north east,
    legend style={font=\\footnotesize, fill=white, fill opacity=0.9}
]
% 1. Curva continua del problema
\\addplot[thick, color=teal!80!black, smooth] coordinates {
            ${C}
};
\\addlegendentry{Trayectoria / Función}

${E?`% 2. Puntos de iteración
\\addplot[only marks, mark=*, mark size=2.5pt, color=orange!90!black] coordinates {
    ${E}
};
\\addlegendentry{Iteraciones}`:""}

${$?`% 3. Solución / Raíz destacada
\\addplot[only marks, mark=star, mark size=4.5pt, color=red!80!black] coordinates {
    ${$}
};
\\addlegendentry{Solución}`:""}

\\end{axis}
\\end{tikzpicture}
\\caption{Representación gráfica vectorial de convergencia generada con PGFPlots.}
\\label{fig:convergencia}
\\end{figure}
`}return`\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[spanish,es-nodecimaldot]{babel}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{booktabs}
\\usepackage{geometry}
\\usepackage{xcolor}
\\usepackage{hyperref}
\\usepackage{pgfplots}
\\usepackage{float}
\\usepackage{caption}
\\pgfplotsset{compat=1.18}
\\geometry{top=2.5cm, bottom=2.5cm, left=2.5cm, right=2.5cm}

\\hypersetup{
    colorlinks=true,
    linkcolor=teal,
    urlcolor=blue,
    citecolor=teal
}

\\title{
    \\vspace{-1.5cm}
    \\textbf{\\Large INFORME TÉCNICO FORMAL}\\\\[0.2cm]
    \\textbf{\\large ${a.toUpperCase()}}\\\\[0.1cm]
    \\normalsize Resolución Numérica: \\textsf{${r}}
}
\\author{\\textbf{NumCalc Pro} --- Laboratorio de Métodos Numéricos}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
El presente documento constituye el informe técnico formal generado para documentar la solución numérica
del problema planteado mediante el \\textbf{${r}}. Contiene la formulación matemática,
las fórmulas analíticas y recursivas del método, los parámetros computacionales configurados, la tabla de
iteraciones obtenida y la gráfica vectorial de convergencia.
\\end{abstract}

\\section{Planteamiento del Problema}
${o}

\\begin{equation}
    ${i}
\\end{equation}

\\subsection{Parámetros Computacionales de Entrada}
\\begin{center}
\\begin{tabular}{ll}
\\toprule
\\textbf{Parámetro} & \\textbf{Valor Asignado} \\\\
\\midrule
${m}
\\bottomrule
\\end{tabular}
\\end{center}

\\section{Fundamentación Teórica del Método}
El método seleccionado se rige por el siguiente esquema matemático o fórmula recursiva:

\\begin{equation}
    ${s||"% Fórmula analítica no disponible"}
\\end{equation}

\\section{Resultados y Convergencia}
A continuación se resumen los resultados obtenidos por el motor computacional:

\\begin{itemize}
    \\item \\textbf{Resultado Principal:} \\textsf{${n.mainResultLabel||"Solución"}} $\\approx$ \\textbf{${n.mainResultValue||"---"}}
    \\item \\textbf{Total de Iteraciones / Pasos:} ${n.iterationsCount??"---"}
    \\item \\textbf{Error Estimado / Residuo:} ${n.finalError||"---"}
    \\item \\textbf{Estado de Convergencia:} ${n.converged?"Convergencia satisfactoria alcanzada.":"Aproximación completada."}
\\end{itemize}

\\section{Tabla de Iteraciones}
La Tabla~\\ref{tab:iteraciones} presenta la traza numérica paso a paso del algoritmo.

\\begin{table}[H]
\\centering
\\caption{Traza de iteraciones numéricas del ${r}.}
\\label{tab:iteraciones}
\\small
\\begin{tabular}{${g}}
\\toprule
${h}
\\midrule
${f}
\\bottomrule
\\end{tabular}
${p?`\\\\[0.2cm]\\footnotesize \\textit{Nota: Se muestran las primeras ${u} de ${l.length} iteraciones.}`:""}
\\end{table}

${k}

\\section{Conclusiones y Observaciones Técnicas}
\\begin{enumerate}
    \\item El algoritmo computacional de \\textbf{${r}} completó el cálculo con ${n.iterationsCount??"N"} pasos.
    \\item Se verificó la consistencia matemática de los parámetros iniciales y la estabilidad del método.
    \\item La solución obtenida satisface las tolerancias de error especificadas por el usuario.
\\end{enumerate}

\\vspace{1cm}
\\noindent\\rule{\\textwidth}{0.4pt}
\\begin{center}
    \\footnotesize Documento generado automáticamente por \\textbf{NumCalc Pro} -- Motor Numérico Científico Client-Side.
\\end{center}

\\end{document}
`}function ka(t){const{moduleTitle:a="Métodos Numéricos",methodName:r="Método Numérico",problemStatement:o="Resolución del problema mediante métodos numéricos.",mathFormulationLatex:i="f(x) = 0",methodFormulaLatex:s="",parameters:d=[],resultSummary:n={},tableColumns:c=[],tableData:l=[],plotPoints:x={}}=t,m=ja({curve:x.curve||[],markers:x.markers||[],specialPoint:x.root||null,xLabel:x.xLabel||"x",yLabel:x.yLabel||"y",width:650,height:280});return`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Informe Técnico - ${r}</title>
  <!-- KaTeX CSS y JS para renderizar fórmulas matemáticas en la impresión -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"><\/script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"><\/script>

  <style>
    @page {
      size: A4;
      margin: 18mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      margin: 0;
      padding: 24px;
    }
    .header-bar {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 12px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .inst-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #475569;
    }
    .doc-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 4px 0 2px 0;
    }
    .doc-sub {
      font-size: 14px;
      color: #0d9488;
      font-weight: 600;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    h2 {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-left: 4px solid #0d9488;
      padding-left: 8px;
      margin-top: 24px;
      margin-bottom: 10px;
      color: #1e293b;
    }
    .formula-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 14px;
      margin: 12px 0;
      text-align: center;
      font-size: 15px;
    }
    .params-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 12px 0;
    }
    .param-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
    }
    .param-label {
      font-weight: 600;
      color: #475569;
    }
    .param-val {
      font-family: monospace;
      color: #0f172a;
      font-weight: 700;
      margin-left: 6px;
    }
    .result-banner {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 14px;
      margin: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .result-main {
      font-size: 20px;
      font-weight: 800;
      color: #166534;
      font-family: monospace;
    }
    .report-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      margin: 12px 0;
    }
    .report-table th {
      background: #f1f5f9;
      border-top: 1.5px solid #0f172a;
      border-bottom: 1.5px solid #0f172a;
      padding: 6px 8px;
      text-align: center;
      font-weight: 700;
      color: #1e293b;
    }
    .report-table td {
      border-bottom: 1px solid #e2e8f0;
      padding: 5px 8px;
      text-align: center;
      font-family: monospace;
      color: #334155;
    }
    .report-table tr:nth-child(even) {
      background: #f8fafc;
    }
    .chart-container {
      margin: 16px 0;
      page-break-inside: avoid;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .chart-caption {
      font-size: 11px;
      color: #64748b;
      margin-top: 6px;
      font-style: italic;
    }
    .footer-bar {
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #94a3b8;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
      .page-break {
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <!-- Botones de Acción en Pantalla -->
  <div class="no-print" style="margin-bottom: 16px; display: flex; gap: 8px;">
    <button onclick="window.print()" style="background:#0d9488; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">
      Imprimir / Guardar en PDF
    </button>
    <button onclick="window.close()" style="background:#e2e8f0; color:#334155; border:none; padding:8px 16px; border-radius:6px; cursor:pointer;">
      Cerrar
    </button>
  </div>

  <!-- Encabezado Institucional -->
  <div class="header-bar">
    <div>
      <div class="inst-title">NumCalc Pro • Laboratorio de Métodos Numéricos</div>
      <div class="doc-title">${r}</div>
      <div class="doc-sub">${a}</div>
    </div>
    <div class="meta-box">
      <div>Fecha: ${new Date().toLocaleDateString("es-ES",{year:"numeric",month:"long",day:"numeric"})}</div>
      <div>Motor: Client-Side Verified Engine</div>
      <div>Estado: ${n.converged?"Convergencia Exitosa":"Aproximación"}</div>
    </div>
  </div>

  <!-- Planteamiento del Problema -->
  <h2>1. Planteamiento Matemático</h2>
  <p style="font-size: 13px; color: #334155;">${o}</p>
  <div class="formula-card">
    $$${i}$$
  </div>

  <!-- Parámetros -->
  <h2>2. Parámetros de Configuración</h2>
  <div class="params-grid">
    ${d.map(u=>`
      <div class="param-item">
        <span class="param-label">${u.label}:</span>
        <span class="param-val">${u.value}</span>
      </div>
    `).join("")}
  </div>

  <!-- Teoría del Método -->
  ${s?`
  <h2>3. Fundamento Teórico del Método</h2>
  <div class="formula-card">
    $$${s}$$
  </div>
  `:""}

  <!-- Resultados Principales -->
  <h2>4. Resumen de Resultados</h2>
  <div class="result-banner">
    <div>
      <div style="font-size:11px; text-transform:uppercase; color:#15803d; font-weight:700;">
        ${n.mainResultLabel||"Resultado Final"}
      </div>
      <div class="result-main">
        ${n.mainResultValue||"---"}
      </div>
      <div style="font-size:11px; color:#166534; margin-top:3px;">
        ${n.message||"Cálculo completado exitosamente."}
      </div>
    </div>
    <div style="text-align:right; font-size:12px; color:#15803d;">
      <div>Iteraciones: <strong>${n.iterationsCount??"---"}</strong></div>
      <div>Error Final: <strong>${n.finalError||"---"}</strong></div>
    </div>
  </div>

  <!-- Gráfica Vectorial -->
  <h2>5. Visualización Vectorial de Convergencia</h2>
  <div class="chart-container">
    ${m}
    <div class="chart-caption">Figura 1. Gráfica vectorial de alta resolución del problema y sus puntos de iteración.</div>
  </div>

  <!-- Tabla de Iteraciones -->
  <h2>6. Tabla de Iteraciones</h2>
  <table class="report-table">
    <thead>
      <tr>
        ${c.map(u=>`<th>${u.label}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${l.slice(0,40).map(u=>`
        <tr>
          ${c.map(b=>{const p=u[b.key];return typeof p=="number"?`<td>${N(p,6)}</td>`:`<td>${p??"—"}</td>`}).join("")}
        </tr>
      `).join("")}
    </tbody>
  </table>
  ${l.length>40?`<div style="font-size:11px; color:#64748b; font-style:italic;">* Se muestran las primeras 40 iteraciones de un total de ${l.length}.</div>`:""}

  <!-- Pie de página -->
  <div class="footer-bar">
    <div>NumCalc Pro • Reporte Formal de Métodos Numéricos</div>
    <div>Documento verificado digitalmente • 100% Client-Side</div>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
          ]
        });
      }
    });
  <\/script>
</body>
</html>
`}function $a(t){const a=ka(t),r=window.open("","_blank");r&&(r.document.open(),r.document.write(a),r.document.close())}function _a({isOpen:t,onClose:a,data:r}){var m;const[o,i]=_.useState("preview"),[s,d]=_.useState(!1),n=_.useMemo(()=>r?wa(r):"",[r]);if(!t||!r)return null;const c=()=>{navigator.clipboard.writeText(n).then(()=>{d(!0),setTimeout(()=>d(!1),2e3)})},l=()=>{const b=`informe_${(r.methodId||"metodo").toLowerCase().replace(/[^a-z0-9]/g,"_")}.tex`;Na(b,n)},x=()=>{$a(r)};return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in",children:e.jsxs("div",{className:"bg-slate-900 border border-slate-700/80 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden",children:[e.jsxs("div",{className:"px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400",children:e.jsx(yt,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-bold text-base text-slate-100 flex items-center gap-2",children:[e.jsx("span",{children:"Informe Técnico Formal"}),e.jsx("span",{className:"text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800",children:"PDF & LaTeX Compilable"})]}),e.jsx("p",{className:"text-xs text-slate-400",children:"Documentación académica formal con formulación, fórmulas KaTeX, tabla y gráficos vectoriales."})]})]}),e.jsx("button",{onClick:a,className:"p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors","aria-label":"Cerrar modal",children:e.jsx(Oe,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"px-5 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800",children:[e.jsxs("button",{onClick:()=>i("preview"),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${o==="preview"?"bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}`,children:[e.jsx(Ot,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Vista Previa del Informe"})]}),e.jsxs("button",{onClick:()=>i("latex"),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${o==="latex"?"bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}`,children:[e.jsx(qt,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Código LaTeX (.tex)"})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:x,className:"flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer",children:[e.jsx(Xt,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Imprimir / Guardar en PDF"})]}),e.jsxs("button",{onClick:l,className:"flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer",children:[e.jsx(st,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Descargar .tex"})]}),e.jsxs("button",{onClick:c,className:"flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer",children:[s?e.jsx(Ye,{className:"w-3.5 h-3.5 text-emerald-400"}):e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:s?"Copiado":"Copiar LaTeX"})]})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-5 sm:p-7 bg-slate-950/40",children:o==="preview"?e.jsxs("div",{className:"max-w-4xl mx-auto bg-slate-900 border border-slate-700/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-slate-200",children:[e.jsxs("div",{className:"border-b border-slate-800 pb-5 flex flex-wrap items-end justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[11px] font-bold uppercase tracking-wider text-teal-400",children:"NumCalc Pro • Laboratorio de Métodos Numéricos"}),e.jsx("h1",{className:"text-xl sm:text-2xl font-extrabold text-white mt-1",children:r.methodName||"Informe de Métodos Numéricos"}),e.jsx("div",{className:"text-xs text-slate-400 mt-0.5",children:r.moduleTitle})]}),e.jsxs("div",{className:"text-right text-xs text-slate-400 space-y-0.5 font-mono",children:[e.jsxs("div",{children:["Fecha: ",new Date().toLocaleDateString("es-ES")]}),e.jsx("div",{className:"text-teal-400 font-semibold",children:(m=r.resultSummary)!=null&&m.converged?"Convergencia Exitosa":"Aproximación Numérica"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"1. Planteamiento Matemático del Problema"})]}),e.jsx("p",{className:"text-xs sm:text-sm text-slate-300 leading-relaxed",children:r.problemStatement}),r.mathFormulationLatex&&e.jsx("div",{className:"p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center",children:e.jsx(xe,{latex:r.mathFormulationLatex,displayMode:!0})})]}),r.parameters&&r.parameters.length>0&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"2. Parámetros Computacionales de Entrada"})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2.5",children:r.parameters.map((u,b)=>e.jsxs("div",{className:"p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs",children:[e.jsx("div",{className:"text-slate-400 font-medium",children:u.label}),e.jsx("div",{className:"text-slate-100 font-mono font-bold mt-0.5",children:u.value})]},b))})]}),r.methodFormulaLatex&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"3. Fundamento Teórico y Ecuación del Método"})]}),e.jsx("div",{className:"p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center",children:e.jsx(xe,{latex:r.methodFormulaLatex,displayMode:!0})})]}),r.resultSummary&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"4. Resultados del Cálculo"})]}),e.jsxs("div",{className:"p-4 rounded-xl bg-gradient-to-r from-emerald-950/30 to-teal-950/20 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-emerald-400 font-bold uppercase tracking-wider",children:r.resultSummary.mainResultLabel||"Resultado Final"}),e.jsx("div",{className:"text-2xl font-mono font-extrabold text-white mt-1",children:r.resultSummary.mainResultValue||"---"}),e.jsx("div",{className:"text-xs text-slate-400 mt-1",children:r.resultSummary.message})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"px-3.5 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-right",children:[e.jsx("div",{className:"text-[11px] text-slate-400",children:"Total Pasos"}),e.jsx("div",{className:"text-base font-bold font-mono text-teal-300",children:r.resultSummary.iterationsCount??"---"})]}),e.jsxs("div",{className:"px-3.5 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-right",children:[e.jsx("div",{className:"text-[11px] text-slate-400",children:"Error Final"}),e.jsx("div",{className:"text-base font-bold font-mono text-emerald-400",children:r.resultSummary.finalError||"---"})]})]})]})]}),r.plotPoints&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"5. Gráfica Vectorial de Convergencia (SVG Alta Resolución)"})]}),e.jsx(va,{curve:r.plotPoints.curve||[],markers:r.plotPoints.markers||[],specialPoint:r.plotPoints.root||null,xLabel:r.plotPoints.xLabel||"x",yLabel:r.plotPoints.yLabel||"y"}),e.jsx("div",{className:"text-[11px] text-center text-slate-400 italic",children:"Gráfico renderizado vectorialmente sin pixelación para exportación e impresión formal."})]}),r.tableColumns&&r.tableData&&r.tableData.length>0&&e.jsxs("div",{className:"space-y-3",children:[e.jsxs("h4",{className:"text-xs uppercase font-bold tracking-wider text-teal-400 flex items-center gap-2",children:[e.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"6. Tabla de Pasos e Iteraciones"})]}),e.jsx("div",{className:"overflow-x-auto max-h-64 rounded-xl border border-slate-800",children:e.jsxs("table",{className:"w-full text-xs text-left border-collapse",children:[e.jsx("thead",{className:"bg-slate-950 text-slate-400 border-b border-slate-800 font-semibold",children:e.jsx("tr",{children:r.tableColumns.map(u=>e.jsx("th",{className:"px-3 py-2 whitespace-nowrap text-center",children:u.label},u.key))})}),e.jsx("tbody",{className:"divide-y divide-slate-800 font-mono text-slate-300",children:r.tableData.slice(0,30).map((u,b)=>e.jsx("tr",{className:"hover:bg-slate-800/40",children:r.tableColumns.map(p=>{const g=u[p.key];return e.jsx("td",{className:"px-3 py-1.5 text-center whitespace-nowrap",children:typeof g=="number"?N(g,6):g!=null?String(g):"—"},p.key)})},b))})]})}),r.tableData.length>30&&e.jsxs("div",{className:"text-[11px] text-slate-400 italic text-center",children:["* Se muestran las primeras 30 iteraciones de un total de ",r.tableData.length,"."]})]})]}):e.jsx("div",{className:"rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-[13px] leading-relaxed select-text",children:e.jsx("pre",{className:"text-teal-200 whitespace-pre",children:n})})}),e.jsxs("div",{className:"px-5 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400",children:[e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx(rt,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"El código LaTeX incluye paquetes booktabs, amsmath y gráficos vectoriales TikZ/PGFPlots."})]}),e.jsx("button",{onClick:a,className:"px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors",children:"Cerrar"})]})]})})}function Pe(t,a,r={}){const{varMap:o={},vectorize:i=!0}=r;switch(t.type){case"ConstantNode":return String(t.value);case"SymbolNode":{const s=t.name;if(o[s])return o[s];if(s==="pi"||s==="PI"){if(a==="python")return"np.pi";if(a==="matlab")return"pi";if(a==="cpp")return"M_PI"}if(s==="e"||s==="E"){if(a==="python")return"np.e";if(a==="matlab")return"exp(1)";if(a==="cpp")return"M_E"}return s}case"ParenthesisNode":return`(${Pe(t.content,a,r)})`;case"OperatorNode":{if(t.isUnary()){const c=Pe(t.args[0],a,r);return`${t.op}${c}`}const s=Pe(t.args[0],a,r),d=Pe(t.args[1],a,r);if(t.op==="^"){if(a==="python")return`(${s} ** ${d})`;if(a==="matlab")return i?`(${s} .^ ${d})`:`(${s} ^ ${d})`;if(a==="cpp")return`std::pow(${s}, ${d})`}let n=t.op;return a==="matlab"&&i?n==="*"?n=" .* ":n==="/"?n=" ./ ":n=` ${n} `:n=` ${n} `,`${s}${n}${d}`}case"FunctionNode":{const s=t.args.map(n=>Pe(n,a,r)).join(", ");let d=t.name.toLowerCase();return d==="ln"&&(d="log"),a==="python"?d==="abs"?`np.abs(${s})`:`np.${d}(${s})`:a==="matlab"?`${d}(${s})`:a==="cpp"?d==="abs"?`std::fabs(${s})`:`std::${d}(${s})`:`${d}(${s})`}default:return t.toString()}}function $e(t,a,r={}){if(!t||typeof t!="string"||t.trim()==="")return a==="cpp"?"0.0":"0";const o=t.trim();try{const i=Ue(o);return Pe(i,a,r)}catch{let i=o;return a==="python"?(i=i.replace(/\^/g,"**"),i=i.replace(/\bpi\b/gi,"np.pi"),i=i.replace(/\be\b/g,"np.e"),i=i.replace(/\b(sin|cos|tan|exp|log|sqrt|sinh|cosh|tanh)\b/g,"np.$1")):a==="matlab"?(r.vectorize!==!1&&(i=i.replace(/\^/g,".^"),i=i.replace(/\*/g,".*"),i=i.replace(/\//g,"./")),i=i.replace(/\bln\b/g,"log")):a==="cpp"&&(i=i.replace(/\bpi\b/gi,"M_PI"),i=i.replace(/\b(sin|cos|tan|exp|log|sqrt|abs)\b/g,"std::$1"),i=i.replace(/([a-zA-Z0-9_]+)\s*\^\s*([a-zA-Z0-9_]+)/g,"std::pow($1, $2)")),i}}function Ca(t,a){const r=new Blob([a],{type:"text/plain;charset=utf-8"}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=t,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)}function pt(t){var x,m,u,b,p,g,h;const a=((x=t.rawInputs)==null?void 0:x.expression)||"x**3 - 2*x - 5",r=$e(a,"python"),o=t.methodId||"bisection",i=((m=t.rawInputs)==null?void 0:m.tolerance)||1e-4,s=((u=t.rawInputs)==null?void 0:u.maxIter)||100,d=((b=t.rawInputs)==null?void 0:b.paramA)??1,n=((p=t.rawInputs)==null?void 0:p.paramB)??3,c=((g=t.rawInputs)==null?void 0:g.paramX0)??2,l=((h=t.rawInputs)==null?void 0:h.paramX1)??3;return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Ecuaciones No Lineales
Método: ${t.methodName||o}
Ecuación: f(x) = ${a} = 0
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy import optimize

# 1. Definición de la función matemática f(x)
def f(x):
    return ${r}

# 2. Parámetros de ejecución
tolerancia = ${i}
max_iter = ${s}

print("=" * 65)
print("NumCalc Pro - Solución de Ecuaciones No Lineales")
print(f"Método seleccionado: ${t.methodName||o}")
print(f"Ecuación: f(x) = {${JSON.stringify(a)}}")
print("=" * 65)

${o==="bisection"?`# 3. Implementación Algorítmica: Bisección
a = ${d}
b = ${n}

if f(a) * f(b) > 0:
    raise ValueError("Error: Teorema de Bolzano no se cumple. f(a) y f(b) tienen el mismo signo.")

print(f"{'Iter':<5} {'a':<14} {'b':<14} {'x_mid':<14} {'f(x_mid)':<14} {'|ea|':<12}")
print("-" * 65)

iteraciones = []
xr_old = None

for k in range(1, max_iter + 1):
    xr = (a + b) / 2.0
    fxr = f(xr)
    ea = abs(xr - xr_old) if xr_old is not None else float('nan')
    iteraciones.append((k, xr, fxr, ea))

    print(f"{k:<5} {a:<14.6f} {b:<14.6f} {xr:<14.6f} {fxr:<14.6e} {ea:<12.6e}")

    if abs(fxr) < 1e-15 or (xr_old is not None and ea < tolerancia):
        break

    if f(a) * fxr < 0:
        b = xr
    else:
        a = xr
    xr_old = xr

raiz = xr
`:o==="regulaFalsi"?`# 3. Implementación Algorítmica: Regula Falsi (Falsa Posición)
a = ${d}
b = ${n}

if f(a) * f(b) > 0:
    raise ValueError("Error: Teorema de Bolzano no se cumple.")

print(f"{'Iter':<5} {'a':<14} {'b':<14} {'xr':<14} {'f(xr)':<14} {'|ea|':<12}")
print("-" * 65)

iteraciones = []
xr_old = None

for k in range(1, max_iter + 1):
    fa = f(a)
    fb = f(b)
    xr = b - (fb * (b - a)) / (fb - fa)
    fxr = f(xr)
    ea = abs(xr - xr_old) if xr_old is not None else float('nan')
    iteraciones.append((k, xr, fxr, ea))

    print(f"{k:<5} {a:<14.6f} {b:<14.6f} {xr:<14.6f} {fxr:<14.6e} {ea:<12.6e}")

    if abs(fxr) < 1e-15 or (xr_old is not None and ea < tolerancia):
        break

    if fa * fxr < 0:
        b = xr
    else:
        a = xr
    xr_old = xr

raiz = xr
`:o==="newton"?`# 3. Implementación Algorítmica: Newton-Raphson
x_k = ${c}
h_diff = 1e-6

def df(x):
    # Derivada numérica por diferencias centradas
    return (f(x + h_diff) - f(x - h_diff)) / (2.0 * h_diff)

print(f"{'Iter':<5} {'x_k':<14} {'f(x_k)':<14} {'df(x_k)':<14} {'x_{k+1}':<14} {'|ea|':<12}")
print("-" * 75)

iteraciones = []

for k in range(1, max_iter + 1):
    fx = f(x_k)
    dfx = df(x_k)
    if abs(dfx) < 1e-12:
        raise ZeroDivisionError(f"Derivada horizontal en iteración {k}.")

    x_next = x_k - fx / dfx
    ea = abs(x_next - x_k)
    iteraciones.append((k, x_k, fx, x_next, ea))

    print(f"{k:<5} {x_k:<14.6f} {fx:<14.6e} {dfx:<14.6e} {x_next:<14.6f} {ea:<12.6e}")

    if ea < tolerancia or abs(fx) < 1e-15:
        x_k = x_next
        break
    x_k = x_next

raiz = x_k
`:`# 3. Implementación Algorítmica: Secante
x_prev = ${c}
x_curr = ${l}

print(f"{'Iter':<5} {'x_{k-1}':<14} {'x_k':<14} {'x_{k+1}':<14} {'f(x_{k+1})':<14} {'|ea|':<12}")
print("-" * 75)

iteraciones = []

for k in range(1, max_iter + 1):
    f_prev = f(x_prev)
    f_curr = f(x_curr)
    denom = f_curr - f_prev
    if abs(denom) < 1e-14:
        raise ZeroDivisionError(f"División por cero en secante (f(x_k) ≈ f(x_{{k-1}})).")

    x_next = x_curr - f_curr * (x_curr - x_prev) / denom
    fx_next = f(x_next)
    ea = abs(x_next - x_curr)
    iteraciones.append((k, x_curr, x_next, ea))

    print(f"{k:<5} {x_prev:<14.6f} {x_curr:<14.6f} {x_next:<14.6f} {fx_next:<14.6e} {ea:<12.6e}")

    if ea < tolerancia:
        x_curr = x_next
        break
    x_prev = x_curr
    x_curr = x_next

raiz = x_curr
`}

# 4. Verificación con SciPy
try:
${o==="bisection"||o==="regulaFalsi"?`    sol_scipy = optimize.root_scalar(f, bracket=[${d}, ${n}], method='brentq')`:o==="newton"?`    sol_scipy = optimize.root_scalar(f, x0=${c}, fprime=df, method='newton')`:`    sol_scipy = optimize.root_scalar(f, x0=${c}, x1=${l}, method='secant')`}
    print(f"\\nSolución NumCalc Pro: x ≈ {raiz:.8f}")
    print(f"Solución SciPy (built-in): x ≈ {sol_scipy.root:.8f}")
    print(f"Error residual |f(x*)| = {abs(f(raiz)):.2e}")
except Exception as e:
    print(f"\\nSolución NumCalc Pro: x ≈ {raiz:.8f}")
    print(f"SciPy root_scalar info: {e}")

# 5. Visualización Científica con Matplotlib
x_vals = np.linspace(raiz - 2, raiz + 2, 400)
y_vals = f(x_vals)

plt.figure(figsize=(9, 5))
plt.plot(x_vals, y_vals, label=f'f(x) = ${a}$', color='#0284c7', linewidth=2)
plt.axhline(0, color='gray', linestyle='--', linewidth=1)
plt.plot(raiz, f(raiz), 'r*', markersize=14, label=f'Raíz encontrada (x* = {raiz:.6f})')

plt.title('NumCalc Pro - Búsqueda de Raíces: ' + ${JSON.stringify(t.methodName||o)}, fontsize=12)
plt.xlabel('x', fontsize=11)
plt.ylabel('f(x)', fontsize=11)
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`}function ft(t){var x,m,u,b,p,g,h;const a=((x=t.rawInputs)==null?void 0:x.expression)||"x^3 - 2*x - 5",r=$e(a,"matlab"),o=t.methodId||"bisection",i=((m=t.rawInputs)==null?void 0:m.tolerance)||1e-4,s=((u=t.rawInputs)==null?void 0:u.maxIter)||100,d=((b=t.rawInputs)==null?void 0:b.paramA)??1,n=((p=t.rawInputs)==null?void 0:p.paramB)??3,c=((g=t.rawInputs)==null?void 0:g.paramX0)??2,l=((h=t.rawInputs)==null?void 0:h.paramX1)??3;return`% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Ecuaciones No Lineales
% Método: ${t.methodName||o}
% =========================================================================
clc; clear; close all;

% 1. Definición de la función objetivo
f = @(x) ${r};

% 2. Parámetros
tol = ${i};
max_iter = ${s};

fprintf('=== NUMCALC PRO: SOLUCION DE ECUACIONES NO LINEALES ===\\n');
fprintf('Metodo: ${t.methodName||o}\\n');
fprintf('Ecuacion: f(x) = ${a}\\n\\n');

${o==="bisection"?`% 3. Bisección
a = ${d};
b = ${n};

if f(a) * f(b) > 0
    error('El Teorema de Bolzano no se cumple en [a, b].');
end

fprintf('%-5s %-12s %-12s %-12s %-12s %-12s\\n', 'k', 'a', 'b', 'xr', 'f(xr)', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

xr_old = NaN;
for k = 1:max_iter
    xr = (a + b) / 2;
    fxr = f(xr);
    ea = abs(xr - xr_old);
    
    fprintf('%-5d %-12.6f %-12.6f %-12.6f %-12.4e %-12.4e\\n', k, a, b, xr, fxr, ea);
    
    if abs(fxr) < 1e-15 || (~isnan(xr_old) && ea < tol)
        break;
    end
    
    if f(a) * fxr < 0
        b = xr;
    else
        a = xr;
    end
    xr_old = xr;
end
root = xr;
`:o==="regulaFalsi"?`% 3. Regula Falsi
a = ${d};
b = ${n};

if f(a) * f(b) > 0
    error('El Teorema de Bolzano no se cumple en [a, b].');
end

fprintf('%-5s %-12s %-12s %-12s %-12s %-12s\\n', 'k', 'a', 'b', 'xr', 'f(xr)', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

xr_old = NaN;
for k = 1:max_iter
    fa = f(a); fb = f(b);
    xr = b - (fb * (b - a)) / (fb - fa);
    fxr = f(xr);
    ea = abs(xr - xr_old);
    
    fprintf('%-5d %-12.6f %-12.6f %-12.6f %-12.4e %-12.4e\\n', k, a, b, xr, fxr, ea);
    
    if abs(fxr) < 1e-15 || (~isnan(xr_old) && ea < tol)
        break;
    end
    
    if fa * fxr < 0
        b = xr;
    else
        a = xr;
    end
    xr_old = xr;
end
root = xr;
`:o==="newton"?`% 3. Newton-Raphson
x_k = ${c};
h = 1e-6;
df = @(x) (f(x + h) - f(x - h)) / (2*h);

fprintf('%-5s %-14s %-14s %-14s %-12s\\n', 'k', 'x_k', 'f(x_k)', 'x_{k+1}', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

for k = 1:max_iter
    fx = f(x_k);
    dfx = df(x_k);
    if abs(dfx) < 1e-14
        error('Derivada nula detectada.');
    end
    x_next = x_k - fx / dfx;
    ea = abs(x_next - x_k);
    
    fprintf('%-5d %-14.6f %-14.4e %-14.6f %-12.4e\\n', k, x_k, fx, x_next, ea);
    
    if ea < tol || abs(fx) < 1e-15
        x_k = x_next;
        break;
    end
    x_k = x_next;
end
root = x_k;
`:`% 3. Secante
x_prev = ${c};
x_curr = ${l};

fprintf('%-5s %-14s %-14s %-14s %-12s\\n', 'k', 'x_{k-1}', 'x_k', 'x_{k+1}', '|ea|');
fprintf('%s\\n', repmat('-', 1, 65));

for k = 1:max_iter
    fp = f(x_prev);
    fc = f(x_curr);
    x_next = x_curr - fc * (x_curr - x_prev) / (fc - fp);
    ea = abs(x_next - x_curr);
    
    fprintf('%-5d %-14.6f %-14.6f %-14.6f %-12.4e\\n', k, x_prev, x_curr, x_next, ea);
    
    if ea < tol
        x_curr = x_next;
        break;
    end
    x_prev = x_curr;
    x_curr = x_next;
end
root = x_curr;
`}

% 4. Verificación nativa con MATLAB fzero
sol_fzero = fzero(f, ${o==="bisection"||o==="regulaFalsi"?`[${d}, ${n}]`:`${c}`});
fprintf('\\nRaiz NumCalc Pro: x = %.8f\\n', root);
fprintf('Raiz fzero nativo: x = %.8f\\n', sol_fzero);

% 5. Gráfico
figure('Name', 'NumCalc Pro - Raices');
fplot(f, [root - 2, root + 2], 'LineWidth', 2, 'Color', [0.0 0.45 0.74]);
hold on; grid on;
yline(0, '--k', 'LineWidth', 1);
plot(root, f(root), 'pr', 'MarkerSize', 12, 'MarkerFaceColor', 'r');
title(['Convergencia de ' '${t.methodName||o}']);
xlabel('x'); ylabel('f(x)');
legend('f(x)', 'y = 0', ['Raiz x* = ' num2str(root, '%.6f')]);
`}function bt(t){var x,m,u,b,p,g,h;const a=((x=t.rawInputs)==null?void 0:x.expression)||"x^3 - 2*x - 5",r=$e(a,"cpp"),o=t.methodId||"bisection",i=((m=t.rawInputs)==null?void 0:m.tolerance)||1e-4,s=((u=t.rawInputs)==null?void 0:u.maxIter)||100,d=((b=t.rawInputs)==null?void 0:b.paramA)??1,n=((p=t.rawInputs)==null?void 0:p.paramB)??3,c=((g=t.rawInputs)==null?void 0:g.paramX0)??2,l=((h=t.rawInputs)==null?void 0:h.paramX1)??3;return`/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Ecuaciones No Lineales
 * Método: ${t.methodName||o}
 * Compilación: g++ -std=c++17 -O2 main.cpp -o main && ./main
 */

#include <iostream>
#include <cmath>
#include <iomanip>
#include <string>

// 1. Función f(x)
double f(double x) {
    return ${r};
}

${o==="newton"?`double df(double x, double h = 1e-6) {
    return (f(x + h) - f(x - h)) / (2.0 * h);
}`:""}

int main() {
    std::cout << std::string(60, '=') << "\\n";
    std::cout << "NumCalc Pro - Solucion de Ecuaciones No Lineales\\n";
    std::cout << "Metodo: ${t.methodName||o}\\n";
    std::cout << std::string(60, '=') << "\\n\\n";

    const double tol = ${i};
    const int maxIter = ${s};

    std::cout << std::fixed << std::setprecision(6);

${o==="bisection"?`    double a = ${d};
    double b = ${n};

    if (f(a) * f(b) > 0) {
        std::cerr << "Error: No cumple el Teorema de Bolzano en [a, b].\\n";
        return 1;
    }

    std::cout << std::setw(6) << "k" 
              << std::setw(14) << "a" 
              << std::setw(14) << "b" 
              << std::setw(14) << "xr" 
              << std::setw(14) << "f(xr)" 
              << std::setw(14) << "|ea|" << "\\n";
    std::cout << std::string(76, '-') << "\\n";

    double xr_old = 0.0;
    double root = 0.0;

    for (int k = 1; k <= maxIter; ++k) {
        double xr = (a + b) / 2.0;
        double fxr = f(xr);
        double ea = (k == 1) ? 0.0 : std::fabs(xr - xr_old);

        std::cout << std::setw(6) << k 
                  << std::setw(14) << a 
                  << std::setw(14) << b 
                  << std::setw(14) << xr 
                  << std::setw(14) << fxr 
                  << std::setw(14) << ea << "\\n";

        if (std::fabs(fxr) < 1e-15 || (k > 1 && ea < tol)) {
            root = xr;
            break;
        }

        if (f(a) * fxr < 0) b = xr;
        else a = xr;
        xr_old = xr;
        root = xr;
    }

    std::cout << "\\nRaiz aproximada: x* = " << root << "\\n";
`:o==="newton"?`    double x_k = ${c};
    double root = x_k;

    std::cout << std::setw(6) << "k" 
              << std::setw(16) << "x_k" 
              << std::setw(16) << "f(x_k)" 
              << std::setw(16) << "x_{k+1}" 
              << std::setw(16) << "|ea|" << "\\n";
    std::cout << std::string(70, '-') << "\\n";

    for (int k = 1; k <= maxIter; ++k) {
        double fx = f(x_k);
        double dfx = df(x_k);
        if (std::fabs(dfx) < 1e-14) {
            std::cerr << "Derivada nula detectada.\\n";
            return 1;
        }
        double x_next = x_k - fx / dfx;
        double ea = std::fabs(x_next - x_k);

        std::cout << std::setw(6) << k 
                  << std::setw(16) << x_k 
                  << std::setw(16) << fx 
                  << std::setw(16) << x_next 
                  << std::setw(16) << ea << "\\n";

        if (ea < tol || std::fabs(fx) < 1e-15) {
            root = x_next;
            break;
        }
        x_k = x_next;
        root = x_k;
    }

    std::cout << "\\nRaiz aproximada: x* = " << root << "\\n";
`:`    double x_prev = ${c};
    double x_curr = ${l};
    double root = x_curr;

    for (int k = 1; k <= maxIter; ++k) {
        double fp = f(x_prev);
        double fc = f(x_curr);
        double x_next = x_curr - fc * (x_curr - x_prev) / (fc - fp);
        double ea = std::fabs(x_next - x_curr);

        if (ea < tol) {
            root = x_next;
            break;
        }
        x_prev = x_curr;
        x_curr = x_next;
        root = x_curr;
    }

    std::cout << "Raiz aproximada: x* = " << root << "\\n";
`}
    return 0;
}
`}function Ma(t){var c,l;const a=t.methodId||"gauss",r=((c=t.rawInputs)==null?void 0:c.matrixA)||[[2,1],[1,3]],o=((l=t.rawInputs)==null?void 0:l.vectorB)||[1,2],i=t.category==="eigen",s=r.length,d=JSON.stringify(r),n=JSON.stringify(o);return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Sistemas Lineales & Álgebra Matricial
Método: ${t.methodName||a}
Dimensión: ${s}x${s}
"""

import numpy as np
import scipy.linalg as la

A = np.array(${d}, dtype=float)
${i?"":`b = np.array(${n}, dtype=float)`}

print("=" * 60)
print("NumCalc Pro - Álgebra Lineal Numérica")
print(f"Método: ${t.methodName||a}")
print("Matriz A:")
print(A)
${i?"":'print("\\nVector b:", b)'}
print("=" * 60)

${i?`# 1. Resolución de Autovalores y Autovectores
${a==="power"?`# Método de la Potencia
v = np.ones(${s})
max_iter = 100
tol = 1e-6

for k in range(max_iter):
    v_next = A @ v
    lambda_val = np.max(np.abs(v_next))
    v_next = v_next / lambda_val
    if np.linalg.norm(v_next - v) < tol:
        v = v_next
        break
    v = v_next

print(f"\\nAutovalor dominante (Método Potencia): λ ≈ {lambda_val:.8f}")
print("Autovector asociado normalizado:", np.round(v, 6))
`:`# Cálculo con scipy.linalg.eig
eigenvalues, eigenvectors = la.eig(A)
print("\\nAutovalores:")
for i, ev in enumerate(eigenvalues):
    print(f"λ_{i+1} = {ev:.6f}")
`}
# Verificación con SciPy
vals_scipy, vecs_scipy = la.eig(A)
print("\\nVerificación SciPy la.eig(A):")
for i, val in enumerate(vals_scipy):
    print(f"  λ_{i+1} = {val.real:.6f} + {val.imag:.6f}j")
`:`# 1. Resolución del Sistema Ax = b
${a==="gauss"||a==="jordan"?`# Eliminación Gaussiana con pivoteo parcial
n = len(b)
Aug = np.hstack([A, b.reshape(-1, 1)])

for i in range(n):
    # Pivoteo parcial
    max_row = i + np.argmax(np.abs(Aug[i:, i]))
    Aug[[i, max_row]] = Aug[[max_row, i]]
    
    for j in range(i + 1, n):
        factor = Aug[j, i] / Aug[i, i]
        Aug[j, i:] -= factor * Aug[i, i:]

# Sustitución hacia atrás
x = np.zeros(n)
for i in range(n - 1, -1, -1):
    x[i] = (Aug[i, -1] - np.dot(Aug[i, i+1:n], x[i+1:n])) / Aug[i, i]
`:a==="doolittle"?`# Factorización LU Doolittle
P, L, U = la.lu(A)
y = la.solve_triangular(L, P.T @ b, lower=True)
x = la.solve_triangular(U, y, lower=False)
`:a==="cholesky"?`# Descomposición de Cholesky
L = la.cholesky(A, lower=True)
y = la.solve_triangular(L, b, lower=True)
x = la.solve_triangular(L.T, y, lower=False)
`:`# Método Iterativo (Jacobi / Gauss-Seidel)
x = np.zeros_like(b)
for k in range(100):
    x_new = np.copy(x)
    for i in range(len(b)):
        s1 = np.dot(A[i, :i], x_new[:i])
        s2 = np.dot(A[i, i+1:], x[i+1:])
        x_new[i] = (b[i] - s1 - s2) / A[i, i]
    if np.linalg.norm(x_new - x, ord=np.inf) < 1e-5:
        x = x_new
        break
    x = x_new
`}

# 2. Resultados
print("\\nVector Solución x:")
for i, val in enumerate(x):
    print(f"  x_{i+1} = {val:.8f}")

# 3. Verificación con numpy.linalg.solve
x_scipy = np.linalg.solve(A, b)
print("\\nSolución de referencia (np.linalg.solve):")
print(x_scipy)

# Residuo ||Ax - b||
residuo = np.linalg.norm(A @ x - b)
print(f"\\nNorma del Residuo ||Ax - b|| = {residuo:.2e}")
`}
`}function Ea(t){var n,c;const a=t.methodId||"gauss",r=((n=t.rawInputs)==null?void 0:n.matrixA)||[[2,1],[1,3]],o=((c=t.rawInputs)==null?void 0:c.vectorB)||[1,2],i=t.category==="eigen",s=r.map(l=>l.join(", ")).join("; "),d=o.join("; ");return`% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Sistemas Lineales & Álgebra Matricial
% =========================================================================
clc; clear; close all;

A = [${s}];
${i?"":`b = [${d}];`}

fprintf('=== NUMCALC PRO: SISTEMAS LINEALES ===\\n');
fprintf('Metodo: ${t.methodName||a}\\n\\n');

${i?`% 1. Cálculo de Autovalores y Autovectores
[V, D] = eig(A);
fprintf('Autovalores de A:\\n');
disp(diag(D));
fprintf('Matriz de Autovectores V:\\n');
disp(V);
`:`% 1. Solución con operador división matricial (A \\ b)
x_builtin = A \\ b;

fprintf('Vector Solución x:\\n');
for i = 1:length(x_builtin)
    fprintf('  x(%d) = %.8f\\n', i, x_builtin(i));
end

% 2. Verificación de residuo
residuo = norm(A * x_builtin - b);
fprintf('\\nNorma del residuo ||Ax - b|| = %.2e\\n', residuo);
`}
`}function Sa(t){var i,s;const a=((i=t.rawInputs)==null?void 0:i.matrixA)||[[2,1],[1,3]],r=((s=t.rawInputs)==null?void 0:s.vectorB)||[1,2];return`/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Sistemas Lineales (Eliminación Gaussiana con Pivoteo Parcial)
 * Compilación: g++ -std=c++17 -O2 main.cpp -o main && ./main
 */

#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>

int main() {
    const int n = ${a.length};
    std::vector<std::vector<double>> A = {
${a.map(d=>`        {${d.join(", ")}}`).join(`,
`)}
    };
    std::vector<double> b = {${r.join(", ")}};

    // Eliminación Gaussiana con Pivoteo Parcial
    for (int i = 0; i < n; ++i) {
        int maxRow = i;
        for (int k = i + 1; k < n; ++k) {
            if (std::abs(A[k][i]) > std::abs(A[maxRow][i])) {
                maxRow = k;
            }
        }
        std::swap(A[i], A[maxRow]);
        std::swap(b[i], b[maxRow]);

        for (int k = i + 1; k < n; ++k) {
            double c = A[k][i] / A[i][i];
            for (int j = i; j < n; ++j) {
                A[k][j] -= c * A[i][j];
            }
            b[k] -= c * b[i];
        }
    }

    // Sustitución hacia atrás
    std::vector<double> x(n);
    for (int i = n - 1; i >= 0; --i) {
        double sum = 0.0;
        for (int j = i + 1; j < n; ++j) {
            sum += A[i][j] * x[j];
        }
        x[i] = (b[i] - sum) / A[i][i];
    }

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Solucion del Sistema Ax = b:\\n";
    for (int i = 0; i < n; ++i) {
        std::cout << "  x_" << (i + 1) << " = " << x[i] << "\\n";
    }

    return 0;
}
`}function Pa(t){var c,l,x,m,u,b;const a=t.activeTab==="differentiation",r=((c=t.rawInputs)==null?void 0:c.expression)||(a?"x**3":"x**2"),o=$e(r,"python"),i=t.methodId||(a?"central":"simpson13");if(a){const p=((l=t.rawInputs)==null?void 0:l.x0)??2,g=((x=t.rawInputs)==null?void 0:x.h)??.01;return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Cálculo Numérico - Diferenciación Numérica
Fórmula: Diferencias Finitas (Adelante, Atrás, Centradas)
"""

import numpy as np

def f(x):
    return ${o}

x0 = ${p}
h = ${g}

# Fórmulas de diferenciación numérica
d_forward = (f(x0 + h) - f(x0)) / h
d_backward = (f(x0) - f(x0 - h)) / h
d_central = (f(x0 + h) - f(x0 - h)) / (2.0 * h)
d2_central = (f(x0 + h) - 2.0 * f(x0) + f(x0 - h)) / (h ** 2)

print("=" * 60)
print("NumCalc Pro - Diferenciación Numérica en x0 =", x0, "con paso h =", h)
print("=" * 60)
print(f"f'(x0) [Diferencia Progresiva O(h)]:    {d_forward:.8f}")
print(f"f'(x0) [Diferencia Regresiva O(h)]:     {d_backward:.8f}")
print(f"f'(x0) [Diferencia Centrada O(h^2)]:    {d_central:.8f}")
print(f"f''(x0) [Segunda Derivada Centrada]:    {d2_central:.8f}")
`}const s=((m=t.rawInputs)==null?void 0:m.a)??0,d=((u=t.rawInputs)==null?void 0:u.b)??1,n=((b=t.rawInputs)==null?void 0:b.n)??4;return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Cálculo Numérico - Integración Definida
Método: ${t.methodName||i}
Intervalo: [${s}, ${d}], n = ${n}
"""

import numpy as np
from scipy import integrate

# 1. Definición del integrando
def f(x):
    return ${o}

a = ${s}
b = ${d}
n = ${n}

# 2. Implementación del Método Numérico
${i==="simpson13"?`h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)

# Simpson 1/3 Compuesto
I_num = (h / 3.0) * (y_vals[0] + 4.0 * np.sum(y_vals[1:-1:2]) + 2.0 * np.sum(y_vals[2:-1:2]) + y_vals[-1])
`:i==="simpson38"?`h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)

# Simpson 3/8 Compuesto
sum_mod3 = 0.0
sum_others = 0.0
for i in range(1, n):
    if i % 3 == 0:
        sum_mod3 += y_vals[i]
    else:
        sum_others += y_vals[i]

I_num = (3.0 * h / 8.0) * (y_vals[0] + 3.0 * sum_others + 2.0 * sum_mod3 + y_vals[-1])
`:`# Regla del Trapecio Compuesta
h = (b - a) / n
x_vals = np.linspace(a, b, n + 1)
y_vals = f(x_vals)
I_num = (h / 2.0) * (y_vals[0] + 2.0 * np.sum(y_vals[1:-1]) + y_vals[-1])
`}

# 3. Verificación con SciPy Quad
I_scipy, error_est = integrate.quad(f, a, b)

print("=" * 60)
print("NumCalc Pro - Integración Numérica")
print(f"Método: ${t.methodName||i}")
print(f"Integral aproximada I ≈ {I_num:.8f}")
print(f"Referencia SciPy quad:   {I_scipy:.8f} (error est. {error_est:.2e})")
print(f"Diferencia absoluta:     {abs(I_num - I_scipy):.2e}")
print("=" * 60)
`}function Fa(t){var n,c,l,x,m,u;const a=t.activeTab==="differentiation",r=((n=t.rawInputs)==null?void 0:n.expression)||(a?"x^3":"x^2"),o=$e(r,"matlab");if(a){const b=((c=t.rawInputs)==null?void 0:c.x0)??2,p=((l=t.rawInputs)==null?void 0:l.h)??.01;return`% Diferenciación Numérica en MATLAB
clc; clear;
f = @(x) ${o};
x0 = ${b}; h = ${p};

d_prog = (f(x0 + h) - f(x0)) / h;
d_regr = (f(x0) - f(x0 - h)) / h;
d_cent = (f(x0 + h) - f(x0 - h)) / (2*h);

fprintf('f''(x0) Progresiva: %.8f\\n', d_prog);
fprintf('f''(x0) Regresiva:  %.8f\\n', d_regr);
fprintf('f''(x0) Centrada:   %.8f\\n', d_cent);
`}const i=((x=t.rawInputs)==null?void 0:x.a)??0,s=((m=t.rawInputs)==null?void 0:m.b)??1,d=((u=t.rawInputs)==null?void 0:u.n)??4;return`% Integración Numérica en MATLAB
clc; clear;
f = @(x) ${o};
a = ${i}; b = ${s}; n = ${d};

h = (b - a) / n;
x = linspace(a, b, n + 1);
y = f(x);

% Integral con función nativa integral()
I_builtin = integral(f, a, b);

% Simpson 1/3 Compuesto
I_simpson = (h/3) * (y(1) + 4*sum(y(2:2:end-1)) + 2*sum(y(3:2:end-2)) + y(end));

fprintf('Integral Simpson 1/3: %.8f\\n', I_simpson);
fprintf('Integral MATLAB nativa: %.8f\\n', I_builtin);
`}function La(t){var d,n,c,l;const a=((d=t.rawInputs)==null?void 0:d.expression)||"x^2",r=$e(a,"cpp"),o=((n=t.rawInputs)==null?void 0:n.a)??0,i=((c=t.rawInputs)==null?void 0:c.b)??1,s=((l=t.rawInputs)==null?void 0:l.n)??4;return`/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Cálculo Numérico - Integración (Regla de Simpson 1/3)
 */

#include <iostream>
#include <cmath>
#include <iomanip>

double f(double x) {
    return ${r};
}

int main() {
    double a = ${o};
    double b = ${i};
    int n = ${s};
    if (n % 2 != 0) n += 1; // n debe ser par para Simpson 1/3

    double h = (b - a) / n;
    double sum = f(a) + f(b);

    for (int i = 1; i < n; ++i) {
        double x = a + i * h;
        if (i % 2 == 1) sum += 4.0 * f(x);
        else sum += 2.0 * f(x);
    }

    double I = (h / 3.0) * sum;

    std::cout << std::fixed << std::setprecision(8);
    std::cout << "Integral aproximada (Simpson 1/3): I = " << I << "\\n";
    return 0;
}
`}function Ia(t){var c,l,x,m,u;const a=t.methodId||"rk4",r=((c=t.rawInputs)==null?void 0:c.expression)||"x + y",o=$e(r,"python"),i=((l=t.rawInputs)==null?void 0:l.paramX0)??0,s=((x=t.rawInputs)==null?void 0:x.paramY0)??1,d=((m=t.rawInputs)==null?void 0:m.paramXf)??1,n=((u=t.rawInputs)==null?void 0:u.paramH)??.1;return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Ecuaciones Diferenciales Ordinarias (EDO)
Método: ${t.methodName||a}
dy/dx = f(x, y) = ${r}
Condición inicial: y(${i}) = ${s}, intervalo [${i}, ${d}], h = ${n}
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# 1. Definición de la EDO dy/dx = f(x, y)
def f(x, y):
    return ${o}

x0 = ${i}
y0 = ${s}
xf = ${d}
h = ${n}

n_steps = int(round((xf - x0) / h))
x_vals = [x0]
y_vals = [y0]

print("=" * 60)
print("NumCalc Pro - Solución Numérica de EDOs")
print(f"Método: ${t.methodName||a}")
print(f"{'Paso':<6} {'x':<12} {'y':<14} {'f(x, y)':<14}")
print("-" * 60)
print(f"{0:<6} {x0:<12.4f} {y0:<14.6f} {f(x0, y0):<14.6f}")

x_curr = x0
y_curr = y0

for i in range(1, n_steps + 1):
${a==="euler"?`    # Método de Euler
    y_next = y_curr + h * f(x_curr, y_curr)
    x_next = x0 + i * h
`:a==="heun"?`    # Método de Heun (Euler Mejorado)
    k1 = f(x_curr, y_curr)
    k2 = f(x_curr + h, y_curr + h * k1)
    y_next = y_curr + (h / 2.0) * (k1 + k2)
    x_next = x0 + i * h
`:`    # Método de Runge-Kutta de 4° Orden (RK4)
    k1 = f(x_curr, y_curr)
    k2 = f(x_curr + 0.5 * h, y_curr + 0.5 * h * k1)
    k3 = f(x_curr + 0.5 * h, y_curr + 0.5 * h * k2)
    k4 = f(x_curr + h, y_curr + h * k3)
    y_next = y_curr + (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4)
    x_next = x0 + i * h
`}
    x_vals.append(x_next)
    y_vals.append(y_next)
    print(f"{i:<6} {x_next:<12.4f} {y_next:<14.6f} {f(x_next, y_next):<14.6f}")
    x_curr = x_next
    y_curr = y_next

# 2. Verificación con SciPy solve_ivp
sol_scipy = solve_ivp(lambda t, y: f(t, y[0]), [x0, xf], [y0], method='RK45', t_eval=x_vals)

# 3. Gráfica Comparativa
plt.figure(figsize=(9, 5))
plt.plot(x_vals, y_vals, 'o-', label=f'NumCalc Pro (${t.methodName||a})', color='#10b981', linewidth=2)
plt.plot(sol_scipy.t, sol_scipy.y[0], '--', label='SciPy solve_ivp (RK45)', color='#38bdf8')
plt.title(f'Solución de dy/dx = {${JSON.stringify(r)}} con ${t.methodName||a}', fontsize=12)
plt.xlabel('x')
plt.ylabel('y(x)')
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`}function Aa(t){var n,c,l,x,m;t.methodId;const a=((n=t.rawInputs)==null?void 0:n.expression)||"x + y",r=$e(a,"matlab"),o=((c=t.rawInputs)==null?void 0:c.paramX0)??0,i=((l=t.rawInputs)==null?void 0:l.paramY0)??1,s=((x=t.rawInputs)==null?void 0:x.paramXf)??1,d=((m=t.rawInputs)==null?void 0:m.paramH)??.1;return`% =========================================================================
% Script generado por NumCalc Pro
% Módulo: Ecuaciones Diferenciales Ordinarias (EDO)
% =========================================================================
clc; clear; close all;

f = @(x, y) ${r};
x0 = ${o}; y0 = ${i}; xf = ${s}; h = ${d};

x = x0:h:xf;
n = length(x);
y = zeros(1, n);
y(1) = y0;

for i = 1:n-1
    k1 = f(x(i), y(i));
    k2 = f(x(i) + 0.5*h, y(i) + 0.5*h*k1);
    k3 = f(x(i) + 0.5*h, y(i) + 0.5*h*k2);
    k4 = f(x(i) + h, y(i) + h*k3);
    y(i+1) = y(i) + (h/6)*(k1 + 2*k2 + 2*k3 + k4);
end

% Verificación con ode45
[t_ode, y_ode] = ode45(@(t, y) f(t, y), [x0 xf], y0);

figure('Name', 'NumCalc Pro - EDO');
plot(x, y, 'ro-', 'LineWidth', 1.5, 'DisplayName', 'NumCalc Pro RK4');
hold on; grid on;
plot(t_ode, y_ode, 'b--', 'LineWidth', 1.5, 'DisplayName', 'MATLAB ode45');
title('Solución de dy/dx = f(x, y)');
xlabel('x'); ylabel('y(x)');
legend('show');
`}function Ra(t){var n,c,l,x,m;const a=((n=t.rawInputs)==null?void 0:n.expression)||"x + y",r=$e(a,"cpp"),o=((c=t.rawInputs)==null?void 0:c.paramX0)??0,i=((l=t.rawInputs)==null?void 0:l.paramY0)??1,s=((x=t.rawInputs)==null?void 0:x.paramXf)??1,d=((m=t.rawInputs)==null?void 0:m.paramH)??.1;return`/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: EDO - Runge-Kutta 4° Orden (RK4)
 */

#include <iostream>
#include <iomanip>

double f(double x, double y) {
    return ${r};
}

int main() {
    double x = ${o};
    double y = ${i};
    const double xf = ${s};
    const double h = ${d};

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Paso\\t x\\t\\t y\\n";
    std::cout << "---------------------------------\\n";

    int step = 0;
    while (x <= xf + 1e-9) {
        std::cout << step << "\\t " << x << "\\t " << y << "\\n";

        double k1 = f(x, y);
        double k2 = f(x + 0.5 * h, y + 0.5 * h * k1);
        double k3 = f(x + 0.5 * h, y + 0.5 * h * k2);
        double k4 = f(x + h, y + h * k3);

        y += (h / 6.0) * (k1 + 2.0 * k2 + 2.0 * k3 + k4);
        x += h;
        step++;
    }

    return 0;
}
`}function Da(t){var s,d;const a=((s=t.rawInputs)==null?void 0:s.points)||[{x:0,y:1},{x:1,y:3},{x:2,y:2}],r=((d=t.rawInputs)==null?void 0:d.evalX)??1.5,o=a.map(n=>n.x),i=a.map(n=>n.y);return`"""
Script generado automáticamente por NumCalc Pro
Módulo: Interpolación & Ajuste de Curvas
Método: ${t.methodName||t.methodId||"lagrange"}
Puntos de entrada: ${a.length} nodos
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import lagrange, CubicSpline

# 1. Conjunto de datos (nodos)
x_data = np.array(${JSON.stringify(o)}, dtype=float)
y_data = np.array(${JSON.stringify(i)}, dtype=float)
x_eval = ${r}

# 2. Interpolación con SciPy
poly = lagrange(x_data, y_data)
spline = CubicSpline(x_data, y_data, bc_type='natural')

y_poly_eval = poly(x_eval)
y_spline_eval = spline(x_eval)

print("=" * 60)
print("NumCalc Pro - Interpolación Numérica")
print(f"Punto de evaluación x* = {x_eval}")
print(f"Valor interpolado (Polinomio de Lagrange): P(x*) = {y_poly_eval:.6f}")
print(f"Valor interpolado (Spline Cúbico Natural): S(x*) = {y_spline_eval:.6f}")
print("=" * 60)

# 3. Gráfico de curvas continuas
x_dense = np.linspace(min(x_data), max(x_data), 300)

plt.figure(figsize=(9, 5))
plt.plot(x_data, y_data, 'ro', markersize=8, label='Nodos de datos')
plt.plot(x_dense, poly(x_dense), 'b-', label='Polinomio Lagrange')
plt.plot(x_dense, spline(x_dense), 'g--', label='Spline Cúbico Natural')
plt.plot(x_eval, y_poly_eval, 'k*', markersize=12, label=f'Evaluación en x*={x_eval}')

plt.title('NumCalc Pro - Interpolación Polinomial y Splines')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, linestyle=':', alpha=0.6)
plt.legend()
plt.tight_layout()
plt.show()
`}function Ta(t){var s,d;const a=((s=t.rawInputs)==null?void 0:s.points)||[{x:0,y:1},{x:1,y:3},{x:2,y:2}],r=((d=t.rawInputs)==null?void 0:d.evalX)??1.5,o=a.map(n=>n.x).join(", "),i=a.map(n=>n.y).join(", ");return`% Interpolación en MATLAB
clc; clear; close all;

x = [${o}];
y = [${i}];
x_eval = ${r};

% Spline cúbico natural
y_spline = spline(x, y, x_eval);
fprintf('Spline evaluado en x* = %.4f: y = %.6f\\n', x_eval, y_spline);

% Gráfica
x_dense = linspace(min(x), max(x), 200);
y_dense = spline(x, y, x_dense);

figure;
plot(x, y, 'ro', 'MarkerSize', 8, 'DisplayName', 'Datos');
hold on; grid on;
plot(x_dense, y_dense, 'b-', 'LineWidth', 1.5, 'DisplayName', 'Spline Cúbico');
plot(x_eval, y_spline, 'k*', 'MarkerSize', 12, 'DisplayName', 'Punto evaluado');
legend('show');
`}function za(t){var o,i;const a=((o=t.rawInputs)==null?void 0:o.points)||[{x:0,y:1},{x:1,y:3},{x:2,y:2}],r=((i=t.rawInputs)==null?void 0:i.evalX)??1.5;return`/**
 * Código C++17 generado por NumCalc Pro
 * Módulo: Interpolación de Lagrange
 */

#include <iostream>
#include <vector>
#include <iomanip>

struct Point {
    double x, y;
};

double lagrangeInterpolation(const std::vector<Point>& pts, double x) {
    double result = 0.0;
    int n = pts.size();

    for (int i = 0; i < n; ++i) {
        double term = pts[i].y;
        for (int j = 0; j < n; ++j) {
            if (i != j) {
                term *= (x - pts[j].x) / (pts[i].x - pts[j].x);
            }
        }
        result += term;
    }
    return result;
}

int main() {
    std::vector<Point> points = {
${a.map(s=>`        {${s.x}, ${s.y}}`).join(`,
`)}
    };

    double x_eval = ${r};
    double y_eval = lagrangeInterpolation(points, x_eval);

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Interpolacion de Lagrange en x = " << x_eval << ": y = " << y_eval << "\\n";
    return 0;
}
`}function Oa(t){if(!t)return"# Sin datos disponibles.";switch(t.moduleId){case"nonlinear":return pt(t);case"linear":return Ma(t);case"calculus":return Pa(t);case"ode":return Ia(t);case"interpolation":return Da(t);default:return pt(t)}}function qa(t){if(!t)return"% Sin datos disponibles.";switch(t.moduleId){case"nonlinear":return ft(t);case"linear":return Ea(t);case"calculus":return Fa(t);case"ode":return Aa(t);case"interpolation":return Ta(t);default:return ft(t)}}function Xa(t){if(!t)return"// Sin datos disponibles.";switch(t.moduleId){case"nonlinear":return bt(t);case"linear":return Sa(t);case"calculus":return La(t);case"ode":return Ra(t);case"interpolation":return za(t);default:return bt(t)}}function Va({isOpen:t,onClose:a,data:r,initialTab:o="python"}){const[i,s]=_.useState(o),[d,n]=_.useState(!1);vt.useEffect(()=>{o&&s(o)},[o]);const c=_.useMemo(()=>r?i==="python"?Oa(r):i==="matlab"?qa(r):i==="cpp"?Xa(r):"":"",[r,i]);if(!t)return null;const l=()=>{navigator.clipboard.writeText(c).then(()=>{n(!0),setTimeout(()=>n(!1),2e3)})},x=()=>{const b=i==="python"?"py":i==="matlab"?"m":"cpp",g=`numcalc_${(r.methodId||"metodo").toLowerCase().replace(/[^a-z0-9]/g,"_")}.${b}`;Ca(g,c)},u=(()=>{switch(i){case"python":return{title:"Python (SciPy / NumPy)",ext:".py",cmd:"python numcalc_script.py",packages:"pip install numpy scipy matplotlib",iconColor:"text-amber-400"};case"matlab":return{title:"MATLAB / GNU Octave",ext:".m",cmd:`matlab -batch "run('numcalc_script.m')"`,packages:"MATLAB R2020a+ o GNU Octave 7.0+",iconColor:"text-orange-400"};case"cpp":return{title:"C++ Moderno (C++17 / STL)",ext:".cpp",cmd:"g++ -std=c++17 -O2 script.cpp -o script && ./script",packages:"Compilador GCC (g++), Clang o MSVC",iconColor:"text-cyan-400"};default:return{title:"Código",ext:"",cmd:"",packages:"",iconColor:""}}})();return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in",children:e.jsxs("div",{className:"bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden",children:[e.jsxs("div",{className:"px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2.5",children:[e.jsx("div",{className:"p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400",children:e.jsx(jt,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-bold text-base text-slate-100 flex items-center gap-2",children:[e.jsx("span",{children:"Generador de Código Científico"}),e.jsx("span",{className:"text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700",children:r.methodName||"Algoritmo"})]}),e.jsx("p",{className:"text-xs text-slate-400",children:"Script 100% reproducible y ejecutable para resolver este problema exacto."})]})]}),e.jsx("button",{onClick:a,className:"p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors","aria-label":"Cerrar modal",children:e.jsx(Oe,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"px-5 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800",children:[e.jsx("button",{onClick:()=>s("python"),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${i==="python"?"bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}`,children:e.jsx("span",{children:"Python (SciPy/NumPy)"})}),e.jsx("button",{onClick:()=>s("matlab"),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${i==="matlab"?"bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}`,children:e.jsx("span",{children:"MATLAB"})}),e.jsx("button",{onClick:()=>s("cpp"),className:`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${i==="cpp"?"bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm":"text-slate-400 hover:text-slate-200"}`,children:e.jsx("span",{children:"C++ (C++17)"})})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{onClick:l,className:"flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-semibold transition-colors",children:[d?e.jsx(Ye,{className:"w-3.5 h-3.5 text-emerald-400"}):e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:d?"Copiado al portapapeles":"Copiar Código"})]}),e.jsxs("button",{onClick:x,className:"flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-500 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-md shadow-teal-600/20",children:[e.jsx(st,{className:"w-3.5 h-3.5"}),e.jsxs("span",{children:["Descargar (",u.ext,")"]})]})]})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs sm:text-[13px] leading-relaxed select-text",children:e.jsx("pre",{className:"text-slate-300 whitespace-pre",children:c})}),e.jsxs("div",{className:"px-5 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Nt,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Ejecutar en terminal:"}),e.jsx("code",{className:"px-2 py-0.5 rounded bg-slate-950 text-teal-300 border border-slate-800 font-mono text-[11px]",children:u.cmd})]}),e.jsxs("div",{className:"flex items-center gap-1.5 text-[11px] text-slate-500",children:[e.jsx(rt,{className:"w-3.5 h-3.5"}),e.jsxs("span",{children:["Requisitos: ",u.packages]})]})]})]})})}function Ie({exportData:t,className:a=""}){const[r,o]=_.useState(!1),[i,s]=_.useState(!1),[d,n]=_.useState("python");if(!t)return null;const c=()=>{o(!0)},l=(x="python")=>{n(x),s(!0)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:`p-3.5 bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-lg flex flex-wrap items-center justify-between gap-3 ${a}`,children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"p-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400",children:e.jsx(yt,{className:"w-4 h-4"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-bold text-slate-200",children:"Exportación & Utilidad Académica"}),e.jsx("div",{className:"text-[11px] text-slate-400",children:"Genera informes formales en PDF/LaTeX o scripts equivalentes de código."})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("button",{type:"button",onClick:c,className:"flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer",children:[e.jsx(Vt,{className:"w-4 h-4"}),e.jsx("span",{children:"Exportar Informe Formal"})]}),e.jsxs("button",{type:"button",onClick:()=>l("python"),className:"flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer",children:[e.jsx(jt,{className:"w-3.5 h-3.5 text-amber-400"}),e.jsx("span",{children:"Ver en Python (SciPy/NumPy)"})]}),e.jsxs("button",{type:"button",onClick:()=>l("matlab"),className:"flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-orange-300 hover:text-orange-200 border border-orange-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer",children:[e.jsx(Nt,{className:"w-3.5 h-3.5 text-orange-400"}),e.jsx("span",{children:"Ver en MATLAB"})]}),e.jsxs("button",{type:"button",onClick:()=>l("cpp"),className:"flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-colors cursor-pointer",children:[e.jsx(wt,{className:"w-3.5 h-3.5 text-cyan-400"}),e.jsx("span",{children:"Ver en C++"})]})]})]}),e.jsx(_a,{isOpen:r,onClose:()=>o(!1),data:t}),e.jsx(Va,{isOpen:i,onClose:()=>s(!1),data:t,initialTab:d})]})}function Ga({precision:t=6}){var P;const[a,r]=_.useState("bisection"),[o,i]=_.useState("x^3 - 2*x - 5"),[s,d]=_.useState("1"),[n,c]=_.useState("3"),[l,x]=_.useState("2"),[m,u]=_.useState("3"),[b,p]=_.useState("0.0001"),[g,h]=_.useState("100"),[f,k]=_.useState(!1),[C,E]=_.useState(null),[$,T]=_.useState(null),v=_.useMemo(()=>{try{const{toTex:R}=me(o);return`f(x) = ${R()}`}catch{return`f(x) = \\text{${o||"..."}}`}},[o]),O=(R,L,G,X,V)=>{i(R),d(L),c(G),x(X),u(V),E(null),T(null)},q=R=>{R&&R.preventDefault(),E(null),T(null),k(!0),setTimeout(()=>{try{const L=parseFloat(b)||1e-6,G=Math.min(100,Math.max(1,parseInt(g,10)||100));let X;if(a==="bisection"){const V=parseFloat(s),ee=parseFloat(n);if(Number.isNaN(V)||Number.isNaN(ee))throw new Error("Los extremos a y b deben ser números válidos.");if(V>=ee)throw new Error("El extremo a debe ser menor que el extremo b.");X=ba(o,V,ee,L,G)}else if(a==="regulaFalsi"){const V=parseFloat(s),ee=parseFloat(n);if(Number.isNaN(V)||Number.isNaN(ee))throw new Error("Los extremos a y b deben ser números válidos.");if(V>=ee)throw new Error("El extremo a debe ser menor que b.");X=ha(o,V,ee,L,G)}else if(a==="newton"){const V=parseFloat(l);if(Number.isNaN(V))throw new Error("El punto inicial x0 debe ser un número válido.");X=ga(o,V,L,G)}else if(a==="secant"){const V=parseFloat(l),ee=parseFloat(m);if(Number.isNaN(V)||Number.isNaN(ee))throw new Error("Los puntos x0 y x1 deben ser números válidos.");if(V===ee)throw new Error("Los puntos iniciales x0 y x1 deben ser distintos.");X=ya(o,V,ee,L,G)}T(X)}catch(L){E(L.message||"Error desconocido durante el cálculo.")}finally{k(!1)}},50)},j=_.useMemo(()=>{if(!$)return[];try{const{evaluate:R}=me(o),L=$.iterations.map(y=>y.xi??y.x1??y.next_xi??$.root),G=Math.min(...L,parseFloat(s)||0,parseFloat(n)||0,$.root),X=Math.max(...L,parseFloat(s)||0,parseFloat(n)||0,$.root),V=Math.max(1.5,(X-G)*.4),ee=G-V,M=X+V,z=[],U=[],K=250,Q=(M-ee)/K;for(let y=0;y<=K;y++){const F=ee+y*Q;try{const D=R(F);Number.isFinite(D)&&Math.abs(D)<1e5?(z.push(F),U.push(D)):(z.push(F),U.push(null))}catch{z.push(F),U.push(null)}}const ne=[{x:z,y:U,type:"scatter",mode:"lines",name:"f(x)",line:{color:"#38bdf8",width:2.5}},{x:[ee,M],y:[0,0],type:"scatter",mode:"lines",name:"y = 0",line:{color:"#64748b",width:1.5,dash:"dash"}}];if($.iterations.length>0){const y=$.iterations.map(D=>D.xi??D.next_xi),F=$.iterations.map(D=>D.f_xi??0);ne.push({x:y,y:F,type:"scatter",mode:"markers+lines",name:"Iteraciones",line:{color:"#f59e0b",width:1.5,dash:"dot"},marker:{color:"#fbbf24",size:6,symbol:"circle"}})}return ne.push({x:[$.root],y:[R($.root)],type:"scatter",mode:"markers",name:`Raíz: ${$.root.toFixed(t)}`,marker:{color:"#10b981",size:14,symbol:"star",line:{color:"#ffffff",width:2}}}),ne}catch{return[]}},[$,o,s,n,t]),w=_.useMemo(()=>a==="bisection"||a==="regulaFalsi"?[{key:"k",label:"k (Iter)"},{key:"a",label:"a"},{key:"b",label:"b"},{key:"xi",label:"x_i (Aprox)"},{key:"f_xi",label:"f(x_i)"},{key:"ea",label:"|εa|"},{key:"ea_percent",label:"|εa| %",render:R=>R!==null?`${N(R,4)}%`:"—"}]:a==="newton"?[{key:"k",label:"k"},{key:"xi",label:"x_k"},{key:"f_xi",label:"f(x_k)"},{key:"df_xi",label:"f'(x_k)"},{key:"next_xi",label:"x_{k+1}"},{key:"ea",label:"|x_{k+1} - x_k|"},{key:"ea_percent",label:"|εa| %",render:R=>R!==null?`${N(R,4)}%`:"—"}]:[{key:"k",label:"k"},{key:"x0",label:"x_{k-1}"},{key:"x1",label:"x_k"},{key:"xi",label:"x_{k+1}"},{key:"f_xi",label:"f(x_{k+1})"},{key:"ea",label:"|εa|"},{key:"ea_percent",label:"|εa| %",render:R=>R!==null?`${N(R,4)}%`:"—"}],[a]),S=_.useMemo(()=>{var V,ee;if(!$)return null;const R={bisection:"Método de Bisección",regulaFalsi:"Método de Regula Falsi (Falsa Posición)",newton:"Método de Newton-Raphson",secant:"Método de la Secante"},L={bisection:"x_m = \\frac{a + b}{2}",regulaFalsi:"x_r = b - \\frac{f(b)(b - a)}{f(b) - f(a)}",newton:"x_{k+1} = x_k - \\frac{f(x_k)}{f'(x_k)}",secant:"x_{k+1} = x_k - \\frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}"},G=[];if(j&&j[0]&&j[0].x)for(let M=0;M<j[0].x.length;M+=2)j[0].y[M]!==null&&G.push({x:j[0].x[M],y:j[0].y[M]});const X=$.iterations.map(M=>({x:M.xi??M.next_xi??0,y:M.f_xi??0}));return{moduleId:"nonlinear",moduleTitle:"Ecuaciones No Lineales - Búsqueda de Raíces",methodId:a,methodName:R[a]||a,problemStatement:"Búsqueda de raíz real de la ecuación f(x) = 0 mediante aproximación numérica recursiva.",mathFormulationLatex:`f(x) = ${v.replace("f(x) = ","")} = 0`,methodFormulaLatex:L[a]||"",parameters:[{label:"Ecuación f(x)",value:o},...a==="bisection"||a==="regulaFalsi"?[{label:"Límite inferior a",value:s},{label:"Límite superior b",value:n}]:a==="newton"?[{label:"Punto inicial x0",value:l}]:[{label:"Punto inicial x0",value:l},{label:"Punto inicial x1",value:m}],{label:"Tolerancia (|εa|)",value:b},{label:"Máx. Iteraciones",value:g},{label:"Precisión Decimal",value:`${t} decimales`}],rawInputs:{expression:o,paramA:s,paramB:n,paramX0:l,paramX1:m,tolerance:parseFloat(b)||1e-4,maxIter:parseInt(g,10)||100},resultSummary:{converged:$.converged,mainResultLabel:"Raíz Aproximada (x*)",mainResultValue:`x ≈ ${N($.root,t)}`,iterationsCount:$.iterations.length,finalError:((V=$.iterations[$.iterations.length-1])==null?void 0:V.ea)!==null?N((ee=$.iterations[$.iterations.length-1])==null?void 0:ee.ea,t):"---",message:$.message},tableColumns:w,tableData:$.iterations,plotPoints:{curve:G,markers:X,root:{x:$.root,y:0,label:"Raíz x*"},xLabel:"x",yLabel:"f(x)"}}},[$,a,o,s,n,l,m,b,g,t,v,j,w]);return e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm",children:[{id:"bisection",label:"Bisección"},{id:"regulaFalsi",label:"Regula Falsi"},{id:"newton",label:"Newton-Raphson"},{id:"secant",label:"Secante"}].map(R=>e.jsx("button",{onClick:()=>{r(R.id),E(null),T(null)},className:`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${a===R.id?"bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:R.label},R.id))}),e.jsx("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm",children:e.jsxs("form",{onSubmit:q,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{htmlFor:"nonlinear-function-input",className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Función f(x)"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Presets:"}),e.jsx("button",{type:"button",onClick:()=>O("x^3 - 2*x - 5","1","3","2","3"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"x³-2x-5"}),e.jsx("button",{type:"button",onClick:()=>O("cos(x) - x","0","1","0.5","1"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"cos(x)-x"}),e.jsx("button",{type:"button",onClick:()=>O("e^(-x) - x","0","1","0","1"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"e⁻ˣ-x"})]})]}),e.jsx("input",{id:"nonlinear-function-input",type:"text",value:o,onChange:R=>i(R.target.value),placeholder:"Ej: x^3 - 2*x - 5",className:"w-full px-4 py-2.5 bg-slate-900/90 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20",required:!0}),e.jsxs("div",{className:"mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-sans",children:"Render LaTeX:"}),e.jsx(xe,{expression:v})]})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4",children:[(a==="bisection"||a==="regulaFalsi")&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bisection-param-a",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Límite inferior (a)"}),e.jsx("input",{id:"bisection-param-a",type:"number",step:"any",value:s,onChange:R=>d(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"bisection-param-b",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Límite superior (b)"}),e.jsx("input",{id:"bisection-param-b",type:"number",step:"any",value:n,onChange:R=>c(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]})]}),a==="newton"&&e.jsxs("div",{children:[e.jsx("label",{htmlFor:"newton-param-x0",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Punto inicial (x₀)"}),e.jsx("input",{id:"newton-param-x0",type:"number",step:"any",value:l,onChange:R=>x(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),a==="secant"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"secant-param-x0",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Punto inicial 0 (x₀)"}),e.jsx("input",{id:"secant-param-x0",type:"number",step:"any",value:l,onChange:R=>x(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"secant-param-x1",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Punto inicial 1 (x₁)"}),e.jsx("input",{id:"secant-param-x1",type:"number",step:"any",value:m,onChange:R=>u(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"nonlinear-tolerance-input",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Tolerancia de error (|εa|)"}),e.jsx("input",{id:"nonlinear-tolerance-input",type:"number",step:"any",value:b,onChange:R=>p(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"nonlinear-max-iter-input",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Iteraciones Máx (Tope: 100)"}),e.jsx("input",{id:"nonlinear-max-iter-input",type:"number",min:"1",max:"100",value:g,onChange:R=>h(R.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]})]}),e.jsxs("button",{type:"submit",disabled:f,className:"w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer",children:[f?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-slate-950"}),e.jsx("span",{children:f?"Calculando...":"Calcular Raíz"})]})]})}),C&&e.jsx(Se,{type:"error",title:"Error en la Búsqueda de Raíces",message:C,onClose:()=>E(null)}),$&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:S}),e.jsx("div",{className:`p-5 rounded-2xl border backdrop-blur-sm ${$.converged?"bg-emerald-950/20 border-emerald-600/50":"bg-amber-950/30 border-amber-600/60"}`,children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"text-xs uppercase font-bold tracking-wider text-slate-400",children:[$.method," • ",$.converged?"Convergencia Exitosa":"Aproximación Parcial"]}),e.jsx("div",{className:"text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1 flex items-baseline gap-2",children:e.jsxs("span",{children:["x ≈ ",N($.root,t)]})}),e.jsx("div",{className:"text-xs text-slate-400 mt-1",children:$.message})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"text-right px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-700/60",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"Total Iteraciones"}),e.jsx("div",{className:"text-lg font-bold font-mono text-teal-300",children:$.iterations.length})]}),e.jsxs("div",{className:"text-right px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-700/60",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"f(x_raíz)"}),e.jsx("div",{className:"text-lg font-bold font-mono text-emerald-400",children:N(((P=$.iterations[$.iterations.length-1])==null?void 0:P.f_xi)??0,t)})]})]})]})}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Gráfica de Convergencia 2D:"}),e.jsx("span",{className:"text-xs font-mono text-teal-400",children:"f(x) y Puntos de Iteración"})]}),e.jsx(ke,{data:j,layout:{title:{text:`Convergencia por ${$.method}`,font:{color:"#e2e8f0",size:14}}}})]}),e.jsx(Le,{title:`Iteraciones de ${$.method}`,columns:w,data:$.iterations,precision:t,filename:`raices_${a}`})]})]})}const be=1e-12,Ae=100;function he(t){return t.map(a=>[...a])}function nt(t){const a=t.length;let r=!0;const o=[];for(let i=0;i<a;i++){const s=Math.abs(t[i][i]);let d=0;for(let c=0;c<a;c++)i!==c&&(d+=Math.abs(t[i][c]));const n=s>d;n||(r=!1),o.push({row:i+1,diag:s,sumOffDiag:d,dominant:n})}return{isDominant:r,details:o,warning:r?null:"Advertencia: La matriz NO es diagonal dominante. Los métodos iterativos (Jacobi / Gauss-Seidel) podrían no converger o divergir rápidamente."}}const pe=10;function lt(t,a){const r=t.length;if(r<2||r>50)throw new Error("La dimensión del sistema debe estar entre 2 y 50.");if(a.length!==r)throw new Error("Las dimensiones de A y b no coinciden.");const o=[];for(let n=0;n<r;n++)o.push([...t[n],a[n]]);const i=[];i.push({title:"Matriz Aumentada Inicial [A | b]",matrix:r<=pe?he(o):null,description:`Estado inicial del sistema (${r}×${r}).`});for(let n=0;n<r;n++){let c=n,l=Math.abs(o[n][n]);for(let x=n+1;x<r;x++)Math.abs(o[x][n])>l&&(l=Math.abs(o[x][n]),c=x);if(l<be)throw new Error(`Matriz singular o mal condicionada detectada en la columna ${n+1} (pivote ≈ 0 tras pivoteo parcial). El sistema no tiene solución única o es indeterminado.`);if(c!==n){const x=o[n];o[n]=o[c],o[c]=x,(r<=pe||n===0)&&i.push({title:`Pivoteo Parcial en Columna ${n+1}`,matrix:r<=pe?he(o):null,description:`Intercambio de Fila ${n+1} con Fila ${c+1} para maximizar el pivote (|${l.toFixed(4)}|).`})}for(let x=n+1;x<r;x++){const m=o[x][n]/o[n][n];o[x][n]=0;for(let u=n+1;u<=r;u++)o[x][u]-=m*o[n][u]}(r<=pe||n===r-2||n===0)&&i.push({title:`Eliminación bajo el Pivote de Columna ${n+1}`,matrix:r<=pe?he(o):null,description:`Ceros creados bajo el elemento diagonal M[${n+1},${n+1}].`})}const s=new Array(r).fill(0),d=[];for(let n=r-1;n>=0;n--){let c=0;for(let x=n+1;x<r;x++)c+=o[n][x]*s[x];const l=o[n][n];if(Math.abs(l)<be)throw new Error(`Pivote diagonal casi nulo en sustitución hacia atrás en fila ${n+1}.`);s[n]=(o[n][r]-c)/l,(r<=pe||n>=r-3||n<=2)&&d.unshift({variable:`x_${n+1}`,formula:`(${o[n][r].toFixed(4)} - ${c.toFixed(4)}) / ${l.toFixed(4)}`,value:s[n]})}return{solution:s,steps:i,backSubstitution:d,method:"Eliminación Gaussiana con Pivoteo Parcial"}}function Ya(t,a){const r=t.length;if(r<2||r>50)throw new Error("La dimensión debe estar entre 2 y 50.");const o=[];for(let d=0;d<r;d++)o.push([...t[d],a[d]]);const i=[];i.push({title:"Matriz Aumentada Inicial [A | b]",matrix:r<=pe?he(o):null,description:`Estado inicial (${r}×${r}).`});for(let d=0;d<r;d++){let n=d,c=Math.abs(o[d][d]);for(let x=d+1;x<r;x++)Math.abs(o[x][d])>c&&(c=Math.abs(o[x][d]),n=x);if(c<be)throw new Error(`Matriz singular detectada en columna ${d+1}. El sistema no posee solución única.`);if(n!==d){const x=o[d];o[d]=o[n],o[n]=x,(r<=pe||d===0)&&i.push({title:`Pivoteo Parcial en Columna ${d+1}`,matrix:r<=pe?he(o):null,description:`Intercambio de Fila ${d+1} con Fila ${n+1}.`})}const l=o[d][d];for(let x=d;x<=r;x++)o[d][x]/=l;r<=pe&&i.push({title:`Normalización del Pivote en Fila ${d+1}`,matrix:he(o),description:`Fila ${d+1} dividida por su pivote ${l.toFixed(4)}.`});for(let x=0;x<r;x++)if(x!==d){const m=o[x][d];for(let u=d;u<=r;u++)o[x][u]-=m*o[d][u]}(r<=pe||d===r-1||d===0)&&i.push({title:`Eliminación Gauss-Jordan sobre Columna ${d+1}`,matrix:r<=pe?he(o):null,description:`Ceros generados en toda la columna ${d+1}, excepto la diagonal.`})}return{solution:o.map(d=>d[r]),steps:i,method:"Gauss-Jordan con Pivoteo Parcial"}}function Ba(t,a,r,o=1e-6,i=Ae){const s=t.length,d=nt(t);for(let m=0;m<s;m++)if(Math.abs(t[m][m])<be)throw new Error(`Elemento diagonal a_${m+1}${m+1} nulo o casi cero. El método de Jacobi requiere pivotes diagonales no nulos.`);const n=Math.min(Math.max(1,i),Ae);let c=r?[...r]:new Array(s).fill(0);const l=[];let x=!1;l.push({k:0,x:[...c],error:null});for(let m=1;m<=n;m++){const u=new Array(s).fill(0);for(let p=0;p<s;p++){let g=0;for(let h=0;h<s;h++)p!==h&&(g+=t[p][h]*c[h]);u[p]=(a[p]-g)/t[p][p]}let b=0;for(let p=0;p<s;p++){const g=Math.abs(u[p]-c[p]);g>b&&(b=g)}if(l.push({k:m,x:[...u],error:b}),b<o){x=!0,c=u;break}if(b>1e12||Number.isNaN(b))return{solution:u,converged:!1,iterations:l,dominance:d,message:"DIVERGENCIA DETECTADA: La secuencia diverge a infinito debido a que la matriz no es diagonal dominante.",method:"Jacobi"};c=u}return{solution:c,converged:x,iterations:l,dominance:d,message:x?`Convergencia alcanzada en ${l.length-1} iteraciones con tolerancia |ε| < ${o}.`:`ADVERTENCIA: El método de Jacobi NO convergió tras el límite de ${n} iteraciones. Se presenta la última aproximación calculada.`,method:"Jacobi"}}function Ua(t,a,r,o=1e-6,i=Ae){const s=t.length,d=nt(t);for(let m=0;m<s;m++)if(Math.abs(t[m][m])<be)throw new Error(`Elemento diagonal a_${m+1}${m+1} nulo o casi cero. Gauss-Seidel requiere elementos diagonales no nulos.`);const n=Math.min(Math.max(1,i),Ae);let c=r?[...r]:new Array(s).fill(0);const l=[];let x=!1;l.push({k:0,x:[...c],error:null});for(let m=1;m<=n;m++){const u=[...c];for(let p=0;p<s;p++){let g=0;for(let h=0;h<s;h++)p!==h&&(g+=t[p][h]*c[h]);c[p]=(a[p]-g)/t[p][p]}let b=0;for(let p=0;p<s;p++){const g=Math.abs(c[p]-u[p]);g>b&&(b=g)}if(l.push({k:m,x:[...c],error:b}),b<o){x=!0;break}if(b>1e12||Number.isNaN(b))return{solution:c,converged:!1,iterations:l,dominance:d,message:"DIVERGENCIA DETECTADA: La secuencia diverge numéricamente.",method:"Gauss-Seidel"}}return{solution:c,converged:x,iterations:l,dominance:d,message:x?`Convergencia alcanzada en ${l.length-1} iteraciones con tolerancia |ε| < ${o}.`:`ADVERTENCIA: El método de Gauss-Seidel NO convergió tras el límite de ${n} iteraciones. Se presenta la última tabla parcial calculada.`,method:"Gauss-Seidel"}}function Ha(t,a){const r=t.length,o=new Array(r).fill(0);for(let i=0;i<r;i++){let s=0;for(let d=0;d<t[i].length;d++)s+=t[i][d]*a[d];o[i]=s}return o}function Wa(t,a){const r=t.length,o=t[0].length,i=a[0].length,s=Array.from({length:r},()=>new Array(i).fill(0));for(let d=0;d<r;d++)for(let n=0;n<o;n++){const c=t[d][n];for(let l=0;l<i;l++)s[d][l]+=c*a[n][l]}return s}function Ka(t){const a=t.length,r=t[0].length,o=Array.from({length:r},()=>new Array(a).fill(0));for(let i=0;i<a;i++)for(let s=0;s<r;s++)o[s][i]=t[i][s];return o}function Re(t,a){let r=0;for(let o=0;o<t.length;o++)r+=t[o]*a[o];return r}function Xe(t){return Math.sqrt(Re(t,t))}function Ja(t){const a=t.length;if(a<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let s=0;s<a;s++)if(t[s].length!==a)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");const r=Array.from({length:a},(s,d)=>Array.from({length:a},(n,c)=>d===c?1:0)),o=Array.from({length:a},()=>new Array(a).fill(0)),i=[];for(let s=0;s<a;s++){for(let d=s;d<a;d++){let n=0;for(let c=0;c<s;c++)n+=r[s][c]*o[c][d];o[s][d]=t[s][d]-n}if(Math.abs(o[s][s])<be)throw new Error(`Elemento pivote u_${s+1}${s+1} ≈ 0 en Doolittle. La descomposición requiere pivotes diagonales no nulos.`);for(let d=s+1;d<a;d++){let n=0;for(let c=0;c<s;c++)n+=r[d][c]*o[c][s];r[d][s]=(t[d][s]-n)/o[s][s]}a<=pe&&i.push({step:s+1,title:`Etapa ${s+1}: Fila ${s+1} de U y Columna ${s+1} de L`,L:he(r),U:he(o)})}return{L:r,U:o,steps:i}}function Qa(t){const a=t.length;if(a<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let s=0;s<a;s++)if(t[s].length!==a)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");const r=Array.from({length:a},()=>new Array(a).fill(0)),o=Array.from({length:a},(s,d)=>Array.from({length:a},(n,c)=>d===c?1:0)),i=[];for(let s=0;s<a;s++){for(let d=s;d<a;d++){let n=0;for(let c=0;c<s;c++)n+=r[d][c]*o[c][s];r[d][s]=t[d][s]-n}if(Math.abs(r[s][s])<be)throw new Error(`Elemento pivote l_${s+1}${s+1} ≈ 0 en Crout. La descomposición requiere pivotes diagonales no nulos.`);for(let d=s+1;d<a;d++){let n=0;for(let c=0;c<s;c++)n+=r[s][c]*o[c][d];o[s][d]=(t[s][d]-n)/r[s][s]}a<=pe&&i.push({step:s+1,title:`Etapa ${s+1}: Columna ${s+1} de L y Fila ${s+1} de U`,L:he(r),U:he(o)})}return{L:r,U:o,steps:i}}function Za(t){const a=t.length;if(a<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let s=0;s<a;s++)if(t[s].length!==a)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");for(let s=0;s<a;s++)for(let d=s+1;d<a;d++)if(Math.abs(t[s][d]-t[d][s])>1e-9)throw new Error(`La matriz no es simétrica: A[${s+1}][${d+1}] (${t[s][d]}) ≠ A[${d+1}][${s+1}] (${t[d][s]}). Cholesky requiere simetría estricta.`);const r=Array.from({length:a},()=>new Array(a).fill(0)),o=[];for(let s=0;s<a;s++){for(let d=0;d<=s;d++){let n=0;for(let c=0;c<d;c++)n+=r[s][c]*r[d][c];if(s===d){const c=t[s][s]-n;if(c<=be)throw new Error(`La matriz no es definida positiva (pivote fila ${s+1} = ${c.toFixed(6)} ≤ 0). Cholesky requiere una matriz simétrica y definida positiva.`);r[s][s]=Math.sqrt(c)}else r[s][d]=(t[s][d]-n)/r[d][d]}a<=pe&&o.push({step:s+1,title:`Etapa ${s+1}: Fila ${s+1} de L`,L:he(r)})}const i=Ka(r);return{L:r,LT:i,steps:o}}function Mt(t,a){const r=t.length,o=new Array(r).fill(0),i=[];for(let s=0;s<r;s++){let d=0;for(let n=0;n<s;n++)d+=t[s][n]*o[n];if(Math.abs(t[s][s])<be)throw new Error(`Elemento diagonal L[${s+1}][${s+1}] nulo en sustitución hacia adelante.`);o[s]=(a[s]-d)/t[s][s],i.push({step:s+1,variable:`y_${s+1}`,value:o[s],formula:`(${a[s].toFixed(4)} - ${d.toFixed(4)}) / ${t[s][s].toFixed(4)} = ${o[s].toFixed(4)}`})}return{y:o,steps:i}}function Et(t,a){const r=t.length,o=new Array(r).fill(0),i=[];for(let s=r-1;s>=0;s--){let d=0;for(let n=s+1;n<r;n++)d+=t[s][n]*o[n];if(Math.abs(t[s][s])<be)throw new Error(`Elemento diagonal U[${s+1}][${s+1}] nulo en sustitución hacia atrás.`);o[s]=(a[s]-d)/t[s][s],i.push({step:r-s,variable:`x_${s+1}`,value:o[s],formula:`(${a[s].toFixed(4)} - ${d.toFixed(4)}) / ${t[s][s].toFixed(4)} = ${o[s].toFixed(4)}`})}return{x:o,steps:i}}function ht(t,a,r="doolittle"){const o=t.length;if(a.length!==o)throw new Error("La longitud del vector b debe coincidir con la dimensión de A.");const i=r==="crout"?Qa(t):Ja(t),{L:s,U:d}=i,{y:n,steps:c}=Mt(s,a),{x:l,steps:x}=Et(d,n);return{method:r==="crout"?"LU (Crout)":"LU (Doolittle)",L:s,U:d,y:n,solution:l,decompSteps:i.steps,forwardSteps:c,backwardSteps:x}}function es(t,a){const r=t.length;if(a.length!==r)throw new Error("La longitud del vector b debe coincidir con la dimensión de A.");const{L:o,LT:i,steps:s}=Za(t),{y:d,steps:n}=Mt(o,a),{x:c,steps:l}=Et(i,d);return{method:"Cholesky (LLᵀ)",L:o,LT:i,y:d,solution:c,decompSteps:s,forwardSteps:n,backwardSteps:l}}function ts(t,a=null,r=1e-6,o=Ae){const i=t.length;if(i<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let x=0;x<i;x++)if(t[x].length!==i)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");let s=a?[...a]:new Array(i).fill(1),d=Xe(s);if(d<be)throw new Error("El vector inicial x0 no puede ser el vector nulo.");s=s.map(x=>x/d);const n=[];let c=0,l=!1;for(let x=1;x<=o;x++){const m=Ha(t,s),u=c;c=Re(s,m)/Re(s,s);const b=Xe(m);if(b<be)throw new Error(`En la iteración ${x}, el vector convergió a cero (posible valor propio nulo).`);const p=m.map(h=>h/b),g=x===1?null:Math.abs(c-u);if(n.push({k:x,lambda:c,vector:[...p],error:g}),x>1&&g!==null&&g<r){l=!0,s=p;break}s=p}return{method:"Método de la Potencia (Dominante)",eigenvalue:c,eigenvector:s,converged:l,iterations:n,message:l?`Convergencia alcanzada en ${n.length} iteraciones con tolerancia |ε| < ${r}.`:`ADVERTENCIA: No se alcanzó la convergencia tras ${o} iteraciones.`}}function as(t,a=0,r=null,o=1e-6,i=Ae){const s=t.length;if(s<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let u=0;u<s;u++)if(t[u].length!==s)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");const d=he(t);for(let u=0;u<s;u++)d[u][u]-=a;let n=r?[...r]:new Array(s).fill(1),c=Xe(n);if(c<be)throw new Error("El vector inicial x0 no puede ser el vector nulo.");n=n.map(u=>u/c);const l=[];let x=0,m=!1;for(let u=1;u<=i;u++){let b;try{b=lt(d,n).solution}catch{return{method:"Método de la Potencia Inversa",eigenvalue:a,eigenvector:n,converged:!0,iterations:l,shift:a,message:`El desplazamiento μ = ${a} coincide exactamente con un valor propio de la matriz.`}}const p=Re(n,b)/Re(n,n),g=x;x=a+(Math.abs(p)>be?1/p:0);const h=Xe(b);if(h<be)throw new Error(`En la iteración ${u}, el vector convergió a cero.`);const f=b.map(C=>C/h),k=u===1?null:Math.abs(x-g);if(l.push({k:u,lambda:x,vector:[...f],error:k}),u>1&&k!==null&&k<o){m=!0,n=f;break}n=f}return{method:"Método de la Potencia Inversa",eigenvalue:x,eigenvector:n,shift:a,converged:m,iterations:l,message:m?`Convergencia alcanzada en ${l.length} iteraciones con tolerancia |ε| < ${o}.`:`ADVERTENCIA: No se alcanzó la convergencia tras ${i} iteraciones.`}}function ss(t,a=1e-6,r=200){const o=t.length;if(o<2)throw new Error("La dimensión de la matriz debe ser al menos 2x2.");for(let l=0;l<o;l++)if(t[l].length!==o)throw new Error("La matriz debe ser estrictamente cuadrada (n×n).");let i=he(t),s=!1,d=0;for(let l=1;l<=r;l++){d=l;const x=[];for(let h=0;h<o;h++){const f=[];for(let k=0;k<o;k++)f.push(i[k][h]);x.push(f)}const m=[],u=Array.from({length:o},()=>new Array(o).fill(0));for(let h=0;h<o;h++){let f=[...x[h]];for(let E=0;E<h;E++){const $=m[E],T=Re($,f);u[E][h]=T;for(let v=0;v<o;v++)f[v]-=T*$[v]}const k=Xe(f);u[h][h]=k;const C=k>1e-14?f.map(E=>E/k):new Array(o).fill(0);m.push(C)}const b=Array.from({length:o},(h,f)=>Array.from({length:o},(k,C)=>m[C][f])),p=Wa(u,b);let g=0;for(let h=1;h<o;h++){const f=Math.abs(p[h][h-1]);f>g&&(g=f)}if(i=p,g<a){s=!0;break}}const n=[];let c=0;for(;c<o;)if(c===o-1||Math.abs(i[c+1][c])<1e-4){const l=i[c][c];n.push({real:l,imag:0,text:l.toFixed(6)}),c++}else{const l=i[c][c],x=i[c][c+1],m=i[c+1][c],u=i[c+1][c+1],b=l+u,p=l*u-x*m,g=b*b-4*p;if(g>=0){const h=(b+Math.sqrt(g))/2,f=(b-Math.sqrt(g))/2;n.push({real:h,imag:0,text:h.toFixed(6)}),n.push({real:f,imag:0,text:f.toFixed(6)})}else{const h=b/2,f=Math.sqrt(-g)/2;n.push({real:h,imag:f,text:`${h.toFixed(6)} + ${f.toFixed(6)}i`}),n.push({real:h,imag:-f,text:`${h.toFixed(6)} - ${f.toFixed(6)}i`})}c+=2}return{method:"Algoritmo QR (Espectro Completo)",eigenvalues:n,iterations:d,converged:s,finalMatrix:i}}let we=null,rs=0;const Ee=new Map;function os(){if(typeof window>"u"||!window.Worker)return null;if(!we)try{we=new Worker(new URL("/assets/linearWorker-WXqkZ8WV.js",import.meta.url),{type:"module"}),we.onmessage=t=>{const{id:a,success:r,result:o,error:i,executionTimeMs:s}=t.data,d=Ee.get(a);d&&(Ee.delete(a),r?d.resolve({...o,executionTimeMs:s,isWorker:!0}):d.reject(new Error(i)))},we.onerror=t=>{console.error("Error en Web Worker de matrices:",t);for(const[a,r]of Ee.entries())r.reject(new Error("Fallo crítico en el Web Worker de cálculo matricial."));Ee.clear(),St()}}catch(t){console.warn("No se pudo inicializar el Web Worker, se usará ejecución síncrona en hilo principal.",t),we=null}return we}function St(){we&&(we.terminate(),we=null);for(const[t,a]of Ee.entries())a.reject(new Error("Cálculo cancelado por el usuario."));Ee.clear()}function ns({method:t,matrixA:a,vectorB:r,vectorX0:o,tolerance:i=1e-6,maxIter:s=100,shift:d=0}){const n=os();return n?new Promise((c,l)=>{const x=++rs;Ee.set(x,{resolve:c,reject:l}),n.postMessage({id:x,method:t,matrixA:a,vectorB:r,vectorX0:o,tolerance:i,maxIter:s,shift:d})}):new Promise((c,l)=>{setTimeout(()=>{const x=performance.now();try{const m=parseFloat(i)||1e-6,u=Math.min(200,Math.max(1,parseInt(s,10)||100));let b;if(t==="gauss")b=lt(a,r);else if(t==="jordan")b=Ya(a,r);else if(t==="doolittle")b=ht(a,r,"doolittle");else if(t==="crout")b=ht(a,r,"crout");else if(t==="cholesky")b=es(a,r);else if(t==="jacobi")b=Ba(a,r,o,m,u);else if(t==="seidel")b=Ua(a,r,o,m,u);else if(t==="power")b=ts(a,o,m,u);else if(t==="inverse_power")b=as(a,parseFloat(d)||0,o,m,u);else if(t==="qr_eigen")b=ss(a,m,u);else throw new Error(`Método no reconocido: ${t}`);const p=performance.now();c({...b,executionTimeMs:parseFloat((p-x).toFixed(2)),isWorker:!1})}catch(m){l(m)}},0)})}function ls({n:t,setN:a,matrixA:r,setMatrixA:o,vectorB:i,setVectorB:s,vectorX0:d,setVectorX0:n,isIterative:c=!1,hideVectorB:l=!1}){const[x,m]=_.useState(!1),[u,b]=_.useState(""),[p,g]=_.useState(null),h=j=>{const w=Math.max(2,Math.min(50,parseInt(j,10)||3));a(w);const S=Array.from({length:w},(R,L)=>Array.from({length:w},(G,X)=>r[L]&&r[L][X]!==void 0?r[L][X]:L===X?1:0));o(S);const P=Array.from({length:w},(R,L)=>i[L]!==void 0?i[L]:1);if(s(P),d){const R=Array.from({length:w},(L,G)=>d[G]!==void 0?d[G]:0);n(R)}},f=(j,w,S)=>{const P=parseFloat(S)||0,R=r.map((L,G)=>G===j?L.map((X,V)=>V===w?P:X):[...L]);o(R)},k=(j,w)=>{const S=parseFloat(w)||0,P=[...i];P[j]=S,s(P)},C=(j,w)=>{const S=parseFloat(w)||0,P=[...d];P[j]=S,n(P)},E=(j=t)=>{const w=[],S=[],P=[];for(let R=0;R<j;R++){const L=[];let G=0;for(let X=0;X<j;X++)if(R!==X){const V=Math.floor(Math.random()*9)-4;L.push(V),G+=Math.abs(V)}else L.push(0);L[R]=G+Math.floor(Math.random()*5)+3,w.push(L),S.push(Math.floor(Math.random()*40)-20),P.push(0)}a(j),o(w),s(S),n&&n(P)},$=(j=t)=>{const w=[],S=[],P=[];for(let R=0;R<j;R++){const L=[];for(let G=0;G<j;G++){let X=Math.floor(Math.random()*21)-10;R===G&&X===0&&(X=1),L.push(X)}w.push(L),S.push(Math.floor(Math.random()*30)-15),P.push(0)}a(j),o(w),s(S),n&&n(P)},T=(j=t)=>{const w=[],S=[],P=[];for(let R=0;R<j;R++){const L=new Array(j).fill(0);L[R]=4,R>0&&(L[R-1]=-1),R<j-1&&(L[R+1]=-1),w.push(L),S.push(R+1),P.push(0)}a(j),o(w),s(S),n&&n(P)},v=j=>{if(j==="example3x3")a(3),o([[2,1,-1],[-3,-1,2],[-2,1,2]]),s([8,-11,-3]),n&&n([0,0,0]);else if(j==="diagDominant3x3")a(3),o([[10,2,-1],[1,10,-1],[2,-1,10]]),s([34,64,-22]),n&&n([0,0,0]);else if(j==="cholesky3x3")a(3),o([[4,12,-16],[12,37,-43],[-16,-43,98]]),s([8,18,44]),n&&n([0,0,0]);else if(j==="symmetricEigen3x3")a(3),o([[4,1,1],[1,3,-1],[1,-1,2]]),s([1,1,1]),n&&n([1,1,1]);else if(j==="singular")a(3),o([[1,2,3],[2,4,6],[1,1,1]]),s([5,10,3]),n&&n([0,0,0]);else if(j==="clear"){const w=Array.from({length:t},(S,P)=>Array.from({length:t},(R,L)=>P===L?1:0));o(w),s(new Array(t).fill(1)),n&&n(new Array(t).fill(0))}},O=()=>{try{g(null);const j=u.trim().split(/\r?\n/).map(X=>X.trim()).filter(X=>X.length>0);if(j.length<2)throw new Error("Debe proporcionar al menos 2 filas de datos.");const w=j.map(X=>X.split(/[\t,;\s]+/).map(V=>parseFloat(V)).filter(V=>!Number.isNaN(V))),S=w.length;if(S>50)throw new Error("El tamaño máximo soportado es de 50x50.");const P=w.every(X=>X.length===S+1),R=w.every(X=>X.length===S);if(!P&&!R)throw new Error(`Formato irregular: Cada una de las ${S} filas debe contener ${S} números (para matriz A) o ${S+1} números (para matriz aumentada [A|b]).`);const L=w.map(X=>X.slice(0,S)),G=P?w.map(X=>X[S]):new Array(S).fill(1);a(S),o(L),s(G),n&&n(new Array(S).fill(0)),m(!1),b("")}catch(j){g(j.message||"Error al procesar el texto/CSV.")}},q=_.useMemo(()=>{try{return nt(r)}catch{return{isDominant:!1}}},[r]);return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/70 rounded-2xl border border-slate-700/60",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Gt,{className:"w-4 h-4 text-teal-400"}),e.jsx("label",{htmlFor:"matrix-dimension-input",className:"text-xs sm:text-sm font-semibold text-slate-300",children:"Dimensión (n × n):"}),e.jsx("input",{id:"matrix-dimension-input",type:"number",min:"2",max:"50",value:t,onChange:j=>h(j.target.value),className:"w-16 bg-slate-800 border border-slate-600 rounded-lg px-2.5 py-1 text-sm font-mono text-teal-300 text-center focus:outline-none focus:border-teal-400"})]}),e.jsx("div",{className:"flex items-center gap-1",children:[3,5,10,20,50].map(j=>e.jsxs("button",{type:"button",onClick:()=>h(j),className:`px-2 py-1 text-[11px] font-mono rounded-lg border transition-colors ${t===j?"bg-teal-500/20 border-teal-500 text-teal-300 font-bold":"bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"}`,children:[j,"×",j]},j))})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-xs",children:[e.jsxs("button",{type:"button",onClick:()=>$(t),title:"Generar coeficientes aleatorios para el tamaño actual",className:"px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors",children:[e.jsx(Yt,{className:"w-3.5 h-3.5 text-indigo-400"}),e.jsx("span",{children:"Aleatoria"})]}),e.jsxs("button",{type:"button",onClick:()=>E(t),title:"Genera matriz diagonal dominante (convergencia garantizada)",className:"px-2.5 py-1.5 rounded-lg bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-700/50 flex items-center gap-1.5 transition-colors",children:[e.jsx(tt,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Diag. Dominante"})]}),e.jsx("button",{type:"button",onClick:()=>T(t),title:"Generar sistema tridiagonal clásico (ej. transferencia de calor)",className:"px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors",children:e.jsx("span",{children:"Tridiagonal"})}),e.jsx("button",{type:"button",onClick:()=>v("cholesky3x3"),title:"Cargar matriz simétrica y definida positiva (para Cholesky)",className:"px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors",children:e.jsx("span",{children:"Simétrica Def. Pos."})}),e.jsx("button",{type:"button",onClick:()=>v("symmetricEigen3x3"),title:"Cargar matriz para cálculo de autovalores",className:"px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors",children:e.jsx("span",{children:"Autovalores 3×3"})}),e.jsxs("button",{type:"button",onClick:()=>m(!0),className:"px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 flex items-center gap-1.5 transition-colors",children:[e.jsx(ze,{className:"w-3.5 h-3.5 text-emerald-400"}),e.jsx("span",{children:"Pegar / CSV"})]}),e.jsx("button",{type:"button",onClick:()=>v("clear"),className:"p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 transition-colors",title:"Reiniciar a Matriz Identidad",children:e.jsx(Bt,{className:"w-3.5 h-3.5"})})]})]}),t>10&&e.jsx("div",{className:"p-3 rounded-xl bg-indigo-950/30 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-between gap-3",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Ut,{className:"w-4 h-4 shrink-0 text-indigo-400"}),e.jsxs("span",{children:[e.jsxs("strong",{children:["Matriz de Gran Escala (",t,"×",t,"):"]})," Se procesará en segundo plano mediante ",e.jsx("strong",{children:"Web Worker"})," para evitar pausas en la interfaz. Puedes editar celdas puntuales o utilizar el botón ",e.jsx("em",{children:"Pegar / CSV"})," o los generadores automáticos."]})]})}),c&&e.jsxs("div",{className:`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${q.isDominant?"bg-emerald-950/30 border-emerald-700/50 text-emerald-300":"bg-amber-950/30 border-amber-700/50 text-amber-300"}`,children:[q.isDominant?e.jsx(tt,{className:"w-4 h-4 shrink-0 text-emerald-400"}):e.jsx(ot,{className:"w-4 h-4 shrink-0 text-amber-400"}),e.jsx("span",{children:q.isDominant?"La matriz es diagonal dominante estricta (|a_ii| > ∑|a_ij|). Se garantiza la convergencia de Jacobi y Gauss-Seidel.":'Atención: La matriz NO es diagonal dominante. Jacobi y Gauss-Seidel pueden no converger o divergir. (Tip: pulsa el botón "Diag. Dominante" para probar un caso garantizado).'})]}),e.jsx("div",{className:"overflow-x-auto pb-2 border border-slate-700/50 rounded-2xl bg-slate-900/50 p-3",children:e.jsxs("div",{className:"inline-block min-w-full",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2 font-mono text-xs text-slate-400",children:[e.jsx("span",{className:"w-8 text-center text-slate-500",children:"Fila"}),e.jsxs("div",{className:"flex-1 text-center font-semibold tracking-wider text-slate-300",children:["MATRIZ DE COEFICIENTES [A] (",t,"×",t,")"]}),!l&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"w-4 text-center text-slate-500",children:"|"}),e.jsx("div",{className:"w-24 text-center font-semibold text-teal-400",children:"[b]"})]}),c&&d&&e.jsx("div",{className:"w-24 text-center font-semibold text-indigo-400",children:"[x₀]"})]}),e.jsx("div",{className:"space-y-1.5 max-h-[460px] overflow-y-auto pr-1",children:Array.from({length:t}).map((j,w)=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"w-8 text-xs font-mono text-slate-500 text-center shrink-0",children:w+1}),e.jsx("div",{className:"grid gap-1.5 flex-1",style:{gridTemplateColumns:`repeat(${t}, minmax(${t>12?"42px":"52px"}, 1fr))`},children:Array.from({length:t}).map((S,P)=>{var L;const R=w===P;return e.jsx("input",{type:"number",step:"any",value:((L=r[w])==null?void 0:L[P])??0,onChange:G=>f(w,P,G.target.value),className:`w-full px-1.5 py-1 text-center font-mono text-xs rounded-lg border transition-colors ${R?"bg-slate-900 border-teal-500/80 text-teal-200 font-bold focus:ring-1 focus:ring-teal-400":"bg-slate-800/80 border-slate-700/80 text-slate-100 hover:border-slate-500 focus:border-teal-400"}`,title:`a[${w+1},${P+1}]`},P)})}),!l&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"text-slate-600 font-mono font-bold px-0.5",children:"|"}),e.jsx("div",{className:"w-24 shrink-0",children:e.jsx("input",{type:"number",step:"any",value:i[w]??0,onChange:S=>k(w,S.target.value),className:"w-full px-2 py-1 text-center font-mono text-xs rounded-lg border bg-teal-950/40 border-teal-600/70 text-teal-300 font-semibold focus:border-teal-400",title:`b[${w+1}]`})})]}),c&&d&&e.jsx("div",{className:"w-24 shrink-0",children:e.jsx("input",{type:"number",step:"any",value:d[w]??0,onChange:S=>C(w,S.target.value),className:"w-full px-2 py-1 text-center font-mono text-xs rounded-lg border bg-indigo-950/40 border-indigo-600/70 text-indigo-300 focus:border-indigo-400",title:`x0[${w+1}]`})})]},w))})]})}),x&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm",children:e.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 text-slate-200",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-slate-800 pb-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-teal-400 font-bold text-base",children:[e.jsx(ze,{className:"w-5 h-5"}),e.jsx("span",{children:"Pegar Matriz (CSV / Texto / Excel)"})]}),e.jsx("button",{type:"button",onClick:()=>m(!1),className:"text-slate-400 hover:text-white text-sm px-2 py-1",children:"✕"})]}),e.jsx("p",{className:"text-xs text-slate-300",children:"Pega las filas separadas por comas, espacios o tabulaciones. Cada fila puede contener $n$ números (matriz $A$) o $n+1$ números (matriz aumentada $[A|b]$). La dimensión se detectará automáticamente."}),e.jsx("textarea",{rows:8,value:u,onChange:j=>b(j.target.value),placeholder:`Ejemplo 3x3 aumentada:
2  1 -1  8
-3 -1  2 -11
-2  1  2 -3`,className:"w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-teal-200 focus:border-teal-400 focus:outline-none"}),p&&e.jsx("div",{className:"p-3 rounded-lg bg-rose-950/40 border border-rose-700 text-rose-300 text-xs",children:p}),e.jsxs("div",{className:"flex justify-end gap-3 pt-2",children:[e.jsx("button",{type:"button",onClick:()=>m(!1),className:"px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs",children:"Cancelar"}),e.jsx("button",{type:"button",onClick:O,className:"px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20",children:"Cargar Matriz"})]})]})})]})}function is({precision:t=6}){var Q,ne;const[a,r]=_.useState("systems"),[o,i]=_.useState("gauss"),[s,d]=_.useState(3),[n,c]=_.useState([[2,1,-1],[-3,-1,2],[-2,1,2]]),[l,x]=_.useState([8,-11,-3]),[m,u]=_.useState([0,0,0]),[b,p]=_.useState("0.0001"),[g,h]=_.useState("100"),[f,k]=_.useState("0"),[C,E]=_.useState(!1),[$,T]=_.useState(null),[v,O]=_.useState(null),[q,j]=_.useState(!1),w=a==="eigen",S=o==="jacobi"||o==="seidel"||o==="power"||o==="inverse_power",P=o==="doolittle"||o==="crout",R=o==="cholesky",L=y=>{r(y),T(null),O(null),y==="eigen"?(i("power"),(!m||m.every(F=>F===0))&&u(new Array(s).fill(1))):i("gauss")},G=async y=>{y&&y.preventDefault(),T(null),O(null),E(!0);try{const F=await ns({method:o,matrixA:n,vectorB:l,vectorX0:m,tolerance:b,maxIter:g,shift:f});O(F)}catch(F){T(F.message||"Error resolviendo el cálculo matricial.")}finally{E(!1)}},X=()=>{St(),E(!1),T("Cálculo detenido por el usuario.")},V=()=>{if(!v)return;let y="";v.solution?y=v.solution.map((F,D)=>`x_${D+1} = ${F}`).join(`
`):v.eigenvector?y=`λ = ${v.eigenvalue}
Vector propio normalizado:
`+v.eigenvector.map((F,D)=>`v_${D+1} = ${F}`).join(`
`):v.eigenvalues&&(y=v.eigenvalues.map((F,D)=>`λ_${D+1} = ${F.text}`).join(`
`)),y&&(navigator.clipboard.writeText(y),j(!0),setTimeout(()=>j(!1),2e3))},ee=_.useMemo(()=>{if(o!=="jacobi"&&o!=="seidel"||!v||!v.iterations)return[];const y=[{key:"k",label:"k (Iter)"}],F=Math.min(s,8);for(let D=0;D<F;D++)y.push({key:`x_${D}`,label:`x_${D+1}`,render:(H,W)=>N(W.x[D],t)});return s>8&&(y.push({key:"more",label:"...",render:()=>"..."}),y.push({key:`x_${s-1}`,label:`x_${s}`,render:(D,H)=>N(H.x[s-1],t)})),y.push({key:"error",label:"||ε||_∞",render:D=>D!==null?N(D,t):"—"}),y},[o,v,s,t]),M=_.useMemo(()=>{if(o!=="power"&&o!=="inverse_power"||!v||!v.iterations)return[];const y=[{key:"k",label:"Iteración (k)"},{key:"lambda",label:"λ Cociente Rayleigh",render:D=>N(D,t)}],F=Math.min(s,5);for(let D=0;D<F;D++)y.push({key:`v_${D}`,label:`v_${D+1}`,render:(H,W)=>W.vector?N(W.vector[D],t):"—"});return s>5&&y.push({key:"more",label:"...",render:()=>"..."}),y.push({key:"error",label:"Error |Δλ|",render:D=>D!==null?N(D,t):"—"}),y},[o,v,s,t]),z=y=>!y||!Array.isArray(y)?null:`\\begin{pmatrix} 
 ${y.map(D=>{const H=D.slice(0,s).map(I=>N(I,3)).join(" & "),W=N(D[s],3);return`${H} & \\Big| & ${W}`}).join(` \\\\ 
`)} 
 \\end{pmatrix}`,U=y=>!y||!Array.isArray(y)?null:`\\begin{pmatrix} 
 ${y.map(D=>D.map(H=>N(H,3)).join(" & ")).join(` \\\\ 
`)} 
 \\end{pmatrix}`,K=_.useMemo(()=>{if(!v)return null;const y={gauss:"Eliminación Gaussiana con Pivoteo Parcial",jordan:"Eliminación Gauss-Jordan",doolittle:"Factorización LU (Doolittle)",crout:"Factorización LU (Crout)",cholesky:"Descomposición de Cholesky (LL^T)",jacobi:"Método Iterativo de Jacobi",seidel:"Método Iterativo de Gauss-Seidel",power:"Método de la Potencia (Autovalor Dominante)",inverse_power:"Método de la Potencia Inversa (con Shift)",qr_eigen:"Algoritmo QR de Autovalores"},F={gauss:"m_{ik} = \\frac{a_{ik}}{a_{kk}}, \\quad R_i \\leftarrow R_i - m_{ik}R_k",jordan:"R_i \\leftarrow R_i - \\frac{a_{ik}}{a_{kk}} R_k, \\quad \\forall i \\neq k",doolittle:"\\mathbf{A} = \\mathbf{L}\\mathbf{U}, \\quad L_{ii} = 1",crout:"\\mathbf{A} = \\mathbf{L}\\mathbf{U}, \\quad U_{ii} = 1",cholesky:"\\mathbf{A} = \\mathbf{L}\\mathbf{L}^T, \\quad l_{ii} = \\sqrt{a_{ii} - \\sum_{k=1}^{i-1} l_{ik}^2}",jacobi:"x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j \\neq i} a_{ij} x_j^{(k)}\\right)",seidel:"x_i^{(k+1)} = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j < i} a_{ij} x_j^{(k+1)} - \\sum_{j > i} a_{ij} x_j^{(k)}\\right)",power:"\\mathbf{v}^{(k+1)} = \\frac{\\mathbf{A}\\mathbf{v}^{(k)}}{\\|\\mathbf{A}\\mathbf{v}^{(k)}\\|_\\infty}, \\quad \\lambda^{(k+1)} = \\max(\\mathbf{A}\\mathbf{v}^{(k)})",inverse_power:"(\\mathbf{A} - \\mu \\mathbf{I})\\mathbf{w}^{(k+1)} = \\mathbf{v}^{(k)}, \\quad \\mathbf{v}^{(k+1)} = \\frac{\\mathbf{w}^{(k+1)}}{\\|\\mathbf{w}^{(k+1)}\\|}",qr_eigen:"\\mathbf{A}_{k} = \\mathbf{Q}_k \\mathbf{R}_k \\implies \\mathbf{A}_{k+1} = \\mathbf{R}_k \\mathbf{Q}_k"},D=`\\begin{pmatrix} ${n.map(J=>J.map(le=>N(le,4)).join(" & ")).join(" \\\\ ")} \\end{pmatrix}`,H=!w&&l?`\\begin{pmatrix} ${l.map(J=>N(J,4)).join(" \\\\ ")} \\end{pmatrix}`:"",W=w?`\\mathbf{A}\\mathbf{v} = \\lambda \\mathbf{v}, \\quad \\mathbf{A} = ${D}`:`\\mathbf{A}\\mathbf{x} = \\mathbf{b}, \\quad \\mathbf{A} = ${D}, \\quad \\mathbf{b} = ${H}`;let I="",B="Solución";v.solution?(B="Vector Solución (x)",I=`[${v.solution.map(J=>N(J,t)).join(", ")}]`):v.eigenvalue!==void 0?(B="Autovalor λ",I=`λ ≈ ${N(v.eigenvalue,t)}`):v.eigenvalues&&(B="Autovalores (Espectro QR)",I=v.eigenvalues.map((J,le)=>`λ_${le+1} = ${J.text||N(J.real,t)}`).join(", "));let oe=[],ge=[];v.iterations&&Array.isArray(v.iterations)&&v.iterations.length>0?o==="jacobi"||o==="seidel"?(oe=[{key:"k",label:"k (Iter)"},...Array.from({length:s},(J,le)=>({key:`x_${le+1}`,label:`x_${le+1}`})),{key:"ea",label:"||Δx||_∞"}],ge=v.iterations.map(J=>({k:J.k,...J.x.reduce((le,ve,ae)=>({...le,[`x_${ae+1}`]:N(ve,t)}),{}),ea:J.error!==void 0?N(J.error,t):"—"}))):(o==="power"||o==="inverse_power")&&(oe=[{key:"k",label:"Iteración (k)"},{key:"lambda",label:"λ Aprox."},{key:"ea",label:"Error |Δλ|"}],ge=v.iterations.map(J=>({k:J.k,lambda:N(J.lambda,t),ea:J.error!==void 0?N(J.error,t):"—"}))):v.solution&&(oe=[{key:"variable",label:"Variable"},{key:"value",label:"Valor Calculado"}],ge=v.solution.map((J,le)=>({variable:`x_${le+1}`,value:N(J,t)})));const ye=[];return v.iterations&&Array.isArray(v.iterations)&&v.iterations.forEach(J=>{const le=J.error??J.ea;le!==void 0&&Number.isFinite(le)&&ye.push({x:J.k,y:le})}),{moduleId:"linear",moduleTitle:"Sistemas de Ecuaciones Lineales & Autovalores",category:a,methodId:o,methodName:y[o]||o,problemStatement:w?`Cálculo de autovalores y autovectores asociados de la matriz cuadrada A de orden ${s}×${s}.`:`Solución del sistema algebraico lineal simultáneo Ax = b de orden ${s}×${s}.`,mathFormulationLatex:W,methodFormulaLatex:F[o]||"",parameters:[{label:"Dimensión de Matriz",value:`${s}×${s}`},{label:"Método Numérico",value:y[o]||o},...S?[{label:"Tolerancia",value:b},{label:"Máx. Iteraciones",value:g}]:[],...o==="inverse_power"?[{label:"Spectral Shift (μ)",value:f}]:[],{label:"Precisión Decimal",value:`${t} decimales`}],rawInputs:{matrixA:n,vectorB:l,vectorX0:m,tolerance:parseFloat(b)||1e-4,maxIter:parseInt(g,10)||100,shift:parseFloat(f)||0},resultSummary:{converged:v.converged??!0,mainResultLabel:B,mainResultValue:I,iterationsCount:v.iterations?Array.isArray(v.iterations)?v.iterations.length:v.iterations:1,finalError:v.residualNorm!==void 0?N(v.residualNorm,4):"---",message:v.message||"Cálculo completado exitosamente."},tableColumns:oe,tableData:ge,plotPoints:{curve:ye,markers:ye,xLabel:"Iteración (k)",yLabel:"Norma Error"}}},[v,a,o,n,l,m,b,g,f,s,t,w,S]);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex border-b border-slate-700/60 pb-3 gap-3",children:[e.jsxs("button",{type:"button",onClick:()=>L("systems"),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${a==="systems"?"bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:[e.jsx(qe,{className:"w-4 h-4"}),e.jsx("span",{children:"Sistemas Lineales ($A x = b$)"})]}),e.jsxs("button",{type:"button",onClick:()=>L("eigen"),className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${a==="eigen"?"bg-indigo-500 text-white shadow-lg shadow-indigo-500/20":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:[e.jsx(Ge,{className:"w-4 h-4"}),e.jsx("span",{children:"Autovalores & Autovectores ($A v = \\lambda v$)"})]})]}),a==="systems"?e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider",children:"Selecciona el Método de Solución:"}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm",children:[{id:"gauss",label:"Gauss"},{id:"jordan",label:"Gauss-Jordan"},{id:"doolittle",label:"LU Doolittle"},{id:"crout",label:"LU Crout"},{id:"cholesky",label:"Cholesky (LLᵀ)"},{id:"jacobi",label:"Jacobi"},{id:"seidel",label:"Gauss-Seidel"}].map(y=>e.jsx("button",{onClick:()=>{i(y.id),T(null),O(null)},className:`py-2 px-2.5 rounded-xl font-medium text-xs transition-all text-center ${o===y.id?"bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:y.label},y.id))})]}):e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-xs font-semibold text-slate-400 uppercase tracking-wider",children:"Selecciona el Algoritmo Espectral:"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm",children:[{id:"power",label:"Método de la Potencia",desc:"Autovalor dominante λ_max y autovector"},{id:"inverse_power",label:"Potencia Inversa con Shift",desc:"Autovalor más cercano a μ y autovector"},{id:"qr_eigen",label:"Algoritmo QR",desc:"Espectro completo (reales y complejos)"}].map(y=>e.jsxs("button",{onClick:()=>{i(y.id),T(null),O(null)},className:`p-3 rounded-xl transition-all text-left ${o===y.id?"bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:[e.jsx("div",{className:"text-xs font-bold",children:y.label}),e.jsx("div",{className:`text-[11px] font-normal ${o===y.id?"text-indigo-200":"text-slate-500"}`,children:y.desc})]},y.id))})]}),e.jsxs("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm space-y-5",children:[e.jsx(ls,{n:s,setN:d,matrixA:n,setMatrixA:c,vectorB:l,setVectorB:x,vectorX0:m,setVectorX0:u,isIterative:S,hideVectorB:w}),(S||o==="qr_eigen")&&e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"linear-tolerance-input",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Tolerancia de convergencia (|ε|)"}),e.jsx("input",{id:"linear-tolerance-input",type:"number",step:"any",value:b,onChange:y=>p(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"linear-max-iter-input",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Iteraciones Máximas (Tope: 200)"}),e.jsx("input",{id:"linear-max-iter-input",type:"number",min:"1",max:"200",value:g,onChange:y=>h(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none"})]}),o==="inverse_power"&&e.jsxs("div",{children:[e.jsx("label",{htmlFor:"linear-shift-input",className:"block text-xs font-semibold text-indigo-300 mb-1",children:"Desplazamiento Spectral Shift (μ)"}),e.jsx("input",{id:"linear-shift-input",type:"number",step:"any",value:f,onChange:y=>k(y.target.value),placeholder:"0 para autovalor menor",className:"w-full px-3 py-2 bg-slate-900 border border-indigo-500/70 rounded-xl text-indigo-200 text-sm font-mono focus:border-indigo-400 focus:outline-none"})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-3",children:[e.jsxs("button",{type:"button",onClick:G,disabled:C,className:`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer ${w?"bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-indigo-500/20":"bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-teal-500/20"}`,children:[C?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-current"}),e.jsx("span",{children:C?`Calculando (${s}×${s}) en Web Worker...`:w?`Calcular Autovalores (${s}×${s})`:`Resolver Sistema (${s}×${s})`})]}),C&&e.jsxs("button",{type:"button",onClick:X,className:"px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-700 flex items-center gap-2 text-xs font-semibold",children:[e.jsx(Ht,{className:"w-3.5 h-3.5 fill-rose-400"}),e.jsx("span",{children:"Detener Cómputo"})]})]})]}),$&&e.jsx(Se,{type:"error",title:"Error en el Cálculo Matricial",message:$,onClose:()=>T(null)}),v&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:K}),v.executionTimeMs!==void 0&&e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/70 border border-teal-800/50 rounded-xl text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2 text-teal-300",children:[e.jsx(Wt,{className:"w-4 h-4 text-amber-400"}),e.jsxs("span",{children:["Procesado con éxito en"," ",e.jsxs("strong",{className:"text-white font-mono",children:[v.executionTimeMs," ms"]}),v.isWorker?" mediante Web Worker (hilo secundario sin bloqueo)":" (hilo principal)","."]})]}),e.jsxs("button",{type:"button",onClick:V,className:"px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors",children:[q?e.jsx(Ye,{className:"w-3.5 h-3.5 text-emerald-400"}):e.jsx(Be,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:q?"¡Copiado!":"Copiar Resultado"})]})]}),w?e.jsxs("div",{className:"space-y-6",children:[o==="qr_eigen"&&v.eigenvalues&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-indigo-700/50 shadow-xl space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3",children:[e.jsxs("div",{className:"text-xs uppercase font-bold tracking-wider text-indigo-400 flex items-center gap-2",children:[e.jsx(_e,{className:"w-4 h-4 text-indigo-400"}),e.jsxs("span",{children:["Espectro de Autovalores • ",v.method," (",v.eigenvalues.length," Raíces)"]})]}),e.jsxs("span",{className:"text-xs font-mono text-slate-400",children:["Iteraciones QR: ",v.iterations]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3",children:v.eigenvalues.map((y,F)=>e.jsxs("div",{className:"p-3.5 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-1",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs text-slate-400 font-mono",children:[e.jsxs("span",{children:["λ_",F+1]}),e.jsx("span",{className:`px-1.5 py-0.5 rounded text-[10px] font-semibold ${y.imag!==0?"bg-purple-950 text-purple-300 border border-purple-800":"bg-indigo-950 text-indigo-300 border border-indigo-800"}`,children:y.imag!==0?"Complejo":"Real"})]}),e.jsx("div",{className:"text-base font-mono font-bold text-indigo-300 truncate",title:y.text,children:y.text})]},F))}),v.finalMatrix&&s<=8&&e.jsxs("div",{className:"mt-4 p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsx("div",{className:"text-xs font-semibold text-slate-300",children:"Matriz Cuasi-triangular de Schur ($A_k$ tras convergencia QR):"}),e.jsx("div",{className:"overflow-x-auto py-2 text-center",children:e.jsx(xe,{expression:U(v.finalMatrix),displayMode:!0})})]})]}),(o==="power"||o==="inverse_power")&&v.eigenvalue!==void 0&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"p-5 rounded-2xl border bg-indigo-950/25 border-indigo-600/50 shadow-xl backdrop-blur-sm space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"text-xs uppercase font-bold tracking-wider text-indigo-400",children:[v.method," • Convergencia"]}),e.jsxs("span",{className:"text-xs font-mono text-slate-400",children:["Iteraciones: ",((Q=v.iterations)==null?void 0:Q.length)||0]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-1",children:[e.jsx("div",{className:"text-xs text-slate-400 font-mono",children:o==="power"?"Valor Propio Dominante (λ_max):":`Valor Propio más cercano a μ = ${v.shift}:`}),e.jsxs("div",{className:"text-2xl font-bold font-mono text-indigo-300",children:["λ = ",N(v.eigenvalue,t)]}),e.jsx("div",{className:"text-xs text-slate-500 font-mono",children:"Cociente de Rayleigh: (xᵀ A x) / (xᵀ x)"})]}),e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-indigo-700/40 space-y-2",children:[e.jsx("div",{className:"text-xs text-slate-400 font-mono",children:"Vector Propio Normalizado (||v||₂ = 1):"}),e.jsx("div",{className:"flex flex-wrap gap-2 max-h-24 overflow-y-auto",children:(ne=v.eigenvector)==null?void 0:ne.map((y,F)=>e.jsxs("span",{className:"px-2 py-1 bg-slate-800 rounded font-mono text-xs text-indigo-200 border border-slate-700",children:["v_",F+1," = ",N(y,t)]},F))})]})]}),v.message&&e.jsx("div",{className:"text-xs text-slate-300 border-t border-slate-700/50 pt-2",children:v.message})]}),v.iterations&&e.jsx(Le,{title:`Historial de Convergencia Espectral • ${v.method}`,columns:M,data:v.iterations,precision:t,filename:`autovalores_${o}`})]})]}):e.jsxs("div",{className:"space-y-6",children:[v.solution&&e.jsxs("div",{className:"p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm",children:[e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsxs("div",{className:"text-xs uppercase font-bold tracking-wider text-emerald-400",children:["Solución del Sistema • ",v.method," (",s," Incógnitas)"]}),e.jsx("button",{type:"button",onClick:V,className:"text-xs text-emerald-300 hover:text-emerald-200 underline",children:q?"Copiado al portapapeles":"Copiar todas"})]}),e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-h-80 overflow-y-auto pr-1",children:v.solution.map((y,F)=>e.jsxs("div",{className:"p-3 bg-slate-900/80 rounded-xl border border-emerald-700/40 text-center",children:[e.jsxs("div",{className:"text-xs text-slate-400 font-mono",children:["x_",F+1]}),e.jsx("div",{className:"text-base sm:text-lg font-bold font-mono text-emerald-300 truncate",title:`${y}`,children:N(y,t)})]},F))}),v.message&&e.jsx("div",{className:"mt-3 text-xs text-slate-300 border-t border-slate-700/50 pt-2",children:v.message})]}),(P||R)&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-5",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(qe,{className:"w-4 h-4 text-teal-400"}),e.jsxs("span",{children:["Factorización Matricial ",R?"A = L · Lᵀ":"A = L · U",":"]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[v.L&&e.jsxs("div",{className:"p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsx("span",{className:"text-xs font-bold text-teal-300 uppercase tracking-wider block",children:"Matriz Triangular Inferior [L]:"}),s<=8?e.jsx("div",{className:"overflow-x-auto py-2 text-center",children:e.jsx(xe,{expression:U(v.L),displayMode:!0})}):e.jsxs("div",{className:"text-xs text-slate-500 font-mono py-2",children:["[Matriz L de dimensión ",s,"×",s," calculada]"]})]}),(v.U||v.LT)&&e.jsxs("div",{className:"p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsx("span",{className:"text-xs font-bold text-teal-300 uppercase tracking-wider block",children:R?"Matriz Traspuesta [Lᵀ]:":"Matriz Triangular Superior [U]:"}),s<=8?e.jsx("div",{className:"overflow-x-auto py-2 text-center",children:e.jsx(xe,{expression:U(v.U||v.LT),displayMode:!0})}):e.jsxs("div",{className:"text-xs text-slate-500 font-mono py-2",children:["[Matriz de dimensión ",s,"×",s," calculada]"]})]})]}),v.y&&e.jsxs("div",{className:"p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsx("div",{className:"text-xs font-bold text-slate-300",children:"Vector Intermedio [y] de la Sustitución hacia adelante ($L \\\\cdot y = b$):"}),e.jsx("div",{className:"flex flex-wrap gap-2 max-h-24 overflow-y-auto",children:v.y.map((y,F)=>e.jsxs("span",{className:"px-2.5 py-1 bg-slate-800 rounded-lg font-mono text-xs text-teal-300 border border-slate-700",children:["y_",F+1," = ",N(y,t)]},F))})]}),v.forwardSteps&&e.jsxs("div",{className:"space-y-2",children:[e.jsx("div",{className:"text-xs font-semibold text-slate-400",children:"Pasos de Sustitución Hacia Adelante ($L \\\\cdot y = b$):"}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto",children:v.forwardSteps.map((y,F)=>e.jsxs("div",{className:"p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/60 font-mono text-xs",children:[e.jsxs("span",{className:"text-teal-400 font-bold",children:[y.variable,": "]}),e.jsx("span",{className:"text-slate-400",children:y.formula})]},F))})]}),v.backwardSteps&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"text-xs font-semibold text-slate-400",children:["Pasos de Sustitución Hacia Atrás (",R?"$L^T \\cdot x = y$":"$U \\cdot x = y$","):"]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto",children:v.backwardSteps.map((y,F)=>e.jsxs("div",{className:"p-2.5 bg-slate-900/60 rounded-lg border border-slate-700/60 font-mono text-xs",children:[e.jsxs("span",{className:"text-emerald-400 font-bold",children:[y.variable,": "]}),e.jsx("span",{className:"text-slate-400",children:y.formula})]},F))})]})]}),v.backSubstitution&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-3",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(Kt,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Historial de Sustitución Hacia Atrás:"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto",children:v.backSubstitution.map((y,F)=>e.jsxs("div",{className:"p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 font-mono text-xs",children:[e.jsxs("div",{className:"text-teal-400 font-bold mb-1",children:[y.variable,":"]}),e.jsx("div",{className:"text-slate-400 mb-1",children:y.formula}),e.jsxs("div",{className:"text-emerald-300 font-semibold text-sm",children:["= ",N(y.value,t)]})]},F))})]}),v.steps&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(De,{className:"w-4 h-4 text-teal-400"}),e.jsxs("span",{children:["Evolución de la Matriz Aumentada Paso a Paso",s>10&&" (Resumen para matriz grande)",":"]})]}),e.jsx("div",{className:"space-y-4",children:v.steps.map((y,F)=>e.jsxs("div",{className:"p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs font-bold text-teal-300 uppercase tracking-wider",children:["Paso ",F+1,": ",y.title]}),e.jsx("span",{className:"text-xs text-slate-400",children:y.description})]}),y.matrix?e.jsx("div",{className:"overflow-x-auto py-2 text-center",children:e.jsx(xe,{expression:z(y.matrix),displayMode:!0})}):e.jsx("div",{className:"text-xs text-slate-500 italic py-1 font-mono",children:"[Matriz omitida para n > 10 para optimizar rendimiento de renderizado]"})]},F))})]}),(o==="jacobi"||o==="seidel")&&v.iterations&&e.jsx(Le,{title:`Convergencia por ${v.method}`,columns:ee,data:v.iterations,precision:t,filename:`sistema_${o}`})]})]})]})}function Me(t,a,r,o){const i=[];for(let s=0;s<a.length;s++){const d=a[s];try{const n=t(d);if(!Number.isFinite(n)||Number.isNaN(n))throw new Error("Valor infinito o indeterminado (NaN)");i.push(n)}catch(n){const c=s>0?a[s-1].toFixed(4):r.toFixed(4),l=s<a.length-1?a[s+1].toFixed(4):o.toFixed(4);throw new Error(`Error de dominio en x = ${d.toFixed(6)} (subintervalo [${c}, ${l}]): ${n.message}. La función no está definida en los reales en este punto.`)}}return i}function Ke(t,a,r,o=20){let i=0,s=0,d=0,n=0;const c=(r-a)/o,l=1e-4;let x=0,m=0;for(let p=0;p<=o;p++){const g=a+p*c;try{const h=t(g+l),f=t(g-l),k=t(g),C=(h-2*k+f)/(l*l);Number.isFinite(C)&&(i+=Math.abs(C),Math.abs(C)>s&&(s=Math.abs(C)),x++);const E=t(g+2*l),$=t(g-2*l),T=(E-4*h+6*k-4*f+$)/Math.pow(l,4);Number.isFinite(T)&&(d+=Math.abs(T),Math.abs(T)>n&&(n=Math.abs(T)),m++)}catch{}}const u=x>0?i/x:0,b=m>0?d/m:0;return{avgD2:u,maxD2:s,avgD4:b,maxD4:n}}function ds(t,a,r){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");const{evaluate:o}=me(t),[i,s]=Me(o,[a,r],a,r),d=r-a,n=d/2*(i+s),{maxD2:c}=Ke(o,a,r,10),l=Math.pow(d,3)/12*c;return{method:"Trapecio Simple",result:n,n:1,h:d,estimatedError:l,points:[{i:0,x:a,fx:i},{i:1,x:r,fx:s}],polygonPoints:[{x:a,y:0},{x:a,y:i},{x:r,y:s},{x:r,y:0}],adjustmentNotice:null}}function cs(t,a,r,o){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");const i=parseInt(o,10);if(!i||i<1)throw new Error("El número de subintervalos n debe ser un entero positivo mayor o igual a 1.");const{evaluate:s}=me(t),d=(r-a)/i,n=[];for(let p=0;p<=i;p++)n.push(a+p*d);const c=Me(s,n,a,r);let l=0;for(let p=1;p<i;p++)l+=c[p];const x=d/2*(c[0]+2*l+c[i]),{avgD2:m}=Ke(s,a,r,Math.min(i,30)),u=(r-a)*Math.pow(d,2)/12*m,b=n.map((p,g)=>({i:g,x:p,fx:c[g]}));return{method:"Trapecio Compuesto",result:x,n:i,h:d,estimatedError:u,points:b,adjustmentNotice:null}}function xs(t,a,r,o){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");let i=parseInt(o,10);(!i||i<2)&&(i=2);let s=null;if(i%2!==0){const h=i+1;s=`Ajuste automático: Simpson 1/3 requiere estrictamente un número PAR de subintervalos. El valor ingresado (n = ${i}) se ajustó automáticamente a n = ${h}.`,i=h}const{evaluate:d}=me(t),n=(r-a)/i,c=[];for(let h=0;h<=i;h++)c.push(a+h*n);const l=Me(d,c,a,r);let x=0,m=0;for(let h=1;h<i;h++)h%2===1?x+=l[h]:m+=l[h];const u=n/3*(l[0]+4*x+2*m+l[i]),{avgD4:b}=Ke(d,a,r,Math.min(i,30)),p=(r-a)*Math.pow(n,4)/180*b,g=c.map((h,f)=>({i:f,x:h,fx:l[f]}));return{method:"Simpson 1/3 Compuesto",result:u,n:i,h:n,estimatedError:p,points:g,adjustmentNotice:s}}function ms(t,a,r,o){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");let i=parseInt(o,10);(!i||i<3)&&(i=3);let s=null;if(i%3!==0){const f=i%3===1?i+2:i+1;s=`Ajuste automático: Simpson 3/8 requiere estrictamente que n sea múltiplo de 3. El valor ingresado (n = ${i}) se ajustó automáticamente al múltiplo más cercano válido: n = ${f}.`,i=f}const{evaluate:d}=me(t),n=(r-a)/i,c=[];for(let h=0;h<=i;h++)c.push(a+h*n);const l=Me(d,c,a,r);let x=0,m=0;for(let h=1;h<i;h++)h%3===0?m+=l[h]:x+=l[h];const u=3*n/8*(l[0]+3*x+2*m+l[i]),{avgD4:b}=Ke(d,a,r,Math.min(i,30)),p=(r-a)*Math.pow(n,4)/80*b,g=c.map((h,f)=>({i:f,x:h,fx:l[f]}));return{method:"Simpson 3/8 Compuesto",result:u,n:i,h:n,estimatedError:p,points:g,adjustmentNotice:s}}function us(t,a,r){if(r<=0)throw new Error("El tamaño de paso h debe ser estrictamente mayor que cero.");const{evaluate:o}=me(t),i=[a-2*r,a-r,a,a+r,a+2*r];Me(o,i,a-2*r,a+2*r);const s=o(a),d=o(a+r),n=o(a-r),c=o(a+2*r),l=o(a-2*r),x=(d-s)/r,m=(s-n)/r,u=(d-n)/(2*r),b=(-c+4*d-3*s)/(2*r),p=(3*s-4*n+l)/(2*r),g=(-c+8*d-8*n+l)/(12*r),h=(d-2*s+n)/(r*r),f=(c-2*d+s)/(r*r),k=(s-2*n+l)/(r*r);return{x0:a,h:r,fx0:s,firstDerivative:{forward1:{value:x,formula:"\\frac{f(x+h) - f(x)}{h}",order:"O(h)"},backward1:{value:m,formula:"\\frac{f(x) - f(x-h)}{h}",order:"O(h)"},central1:{value:u,formula:"\\frac{f(x+h) - f(x-h)}{2h}",order:"O(h^2)"},forward2:{value:b,formula:"\\frac{-f(x+2h) + 4f(x+h) - 3f(x)}{2h}",order:"O(h^2)"},backward2:{value:p,formula:"\\frac{3f(x) - 4f(x-h) + f(x-2h)}{2h}",order:"O(h^2)"},central4:{value:g,formula:"\\frac{-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h)}{12h}",order:"O(h^4)"}},secondDerivative:{central:{value:h,formula:"\\frac{f(x+h) - 2f(x) + f(x-h)}{h^2}",order:"O(h^2)"},forward:{value:f,formula:"\\frac{f(x+2h) - 2f(x+h) + f(x)}{h^2}",order:"O(h)"},backward:{value:k,formula:"\\frac{f(x) - 2f(x-h) + f(x-2h)}{h^2}",order:"O(h)"}},evaluations:[{point:"x - 2h",x:a-2*r,fx:l},{point:"x - h",x:a-r,fx:n},{point:"x",x:a,fx:s},{point:"x + h",x:a+r,fx:d},{point:"x + 2h",x:a+2*r,fx:c}]}}const gt={2:[{t:-1/Math.sqrt(3),w:1},{t:1/Math.sqrt(3),w:1}],3:[{t:-Math.sqrt(3/5),w:5/9},{t:0,w:8/9},{t:Math.sqrt(3/5),w:5/9}],4:[{t:-Math.sqrt((3+2*Math.sqrt(6/5))/7),w:(18-Math.sqrt(30))/36},{t:-Math.sqrt((3-2*Math.sqrt(6/5))/7),w:(18+Math.sqrt(30))/36},{t:Math.sqrt((3-2*Math.sqrt(6/5))/7),w:(18+Math.sqrt(30))/36},{t:Math.sqrt((3+2*Math.sqrt(6/5))/7),w:(18-Math.sqrt(30))/36}],5:[{t:-.3333333333333333*Math.sqrt(5+2*Math.sqrt(10/7)),w:(322-13*Math.sqrt(70))/900},{t:-.3333333333333333*Math.sqrt(5-2*Math.sqrt(10/7)),w:(322+13*Math.sqrt(70))/900},{t:0,w:128/225},{t:1/3*Math.sqrt(5-2*Math.sqrt(10/7)),w:(322+13*Math.sqrt(70))/900},{t:1/3*Math.sqrt(5+2*Math.sqrt(10/7)),w:(322-13*Math.sqrt(70))/900}],6:[{t:-.932469514203152,w:.1713244923791704},{t:-.6612093864662645,w:.3607615730481386},{t:-.2386191860831969,w:.467913934572691},{t:.2386191860831969,w:.467913934572691},{t:.6612093864662645,w:.3607615730481386},{t:.932469514203152,w:.1713244923791704}]};function ps(t,a,r,o=3){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");const i=parseInt(o,10);if(!gt[i])throw new Error(`El número de puntos para Gauss-Legendre debe ser 2, 3, 4, 5 o 6 (se recibió: ${o}).`);const{evaluate:s}=me(t),d=(r-a)/2,n=(a+r)/2,c=gt[i],l=c.map(b=>d*b.t+n),x=Me(s,l,a,r);let m=0;const u=[];for(let b=0;b<i;b++){const p=d*c[b].w*x[b];m+=p,u.push({i:b+1,t:c[b].t,w:c[b].w,x:l[b],fx:x[b],term:p})}return{method:"Cuadratura de Gauss-Legendre",result:m,n:i,a,b:r,points:u}}function fs(t,a,r,o=1e-8,i=6){if(a>=r)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");const s=Math.min(Math.max(2,parseInt(i,10)||6),10),{evaluate:d}=me(t),[n,c]=Me(d,[a,r],a,r),l=[];let x=2;const m=r-a;l[0]=[m/2*(n+c)];let u=!1,b=1,p=null;for(let h=1;h<s;h++){b=h+1;const f=Math.pow(2,h),k=(r-a)/f,C=[];for(let v=1;v<=f/2;v++)C.push(a+(2*v-1)*k);const E=Me(d,C,a,r);x+=E.length;const $=E.reduce((v,O)=>v+O,0);l[h]=new Array(h+1).fill(0),l[h][0]=.5*l[h-1][0]+k*$;for(let v=1;v<=h;v++){const O=Math.pow(4,v);l[h][v]=(O*l[h][v-1]-l[h-1][v-1])/(O-1)}const T=Math.abs(l[h][h]-l[h-1][h-1]);if(p=T,T<o){u=!0;break}}return{method:"Integración de Romberg (Extrapolación de Richardson)",result:l[b-1][b-1],table:l,levels:b,converged:u,tol:o,estimatedError:p,numEvaluations:x}}function bs({precision:t=6}){const[a,r]=_.useState("integration"),[o,i]=_.useState("simpson13"),[s,d]=_.useState("x^2"),[n,c]=_.useState("0"),[l,x]=_.useState("1"),[m,u]=_.useState("4"),[b,p]=_.useState("3"),[g,h]=_.useState("0.00000001"),[f,k]=_.useState("6"),[C,E]=_.useState("x^3"),[$,T]=_.useState("2"),[v,O]=_.useState("0.01"),[q,j]=_.useState(!1),[w,S]=_.useState(null),[P,R]=_.useState(null),[L,G]=_.useState(null),X=_.useMemo(()=>{try{const y=a==="integration"?s:C,{toTex:F}=me(y);return`f(x) = ${F()}`}catch{return"f(x) = \\text{...}"}},[a,s,C]),V=(y,F,D,H)=>{d(y),c(F),x(D),u(H),S(null),R(null)},ee=(y,F,D)=>{E(y),T(F),O(D),S(null),G(null)},M=y=>{y&&y.preventDefault(),S(null),R(null),j(!0),setTimeout(()=>{try{const F=parseFloat(n),D=parseFloat(l),H=parseInt(m,10);if(Number.isNaN(F)||Number.isNaN(D))throw new Error("Los límites a y b deben ser números válidos.");if(F>=D)throw new Error("El límite superior b debe ser mayor que el límite inferior a.");let W;o==="trapezoidSimple"?W=ds(s,F,D):o==="trapezoidComp"?W=cs(s,F,D,H):o==="simpson13"?W=xs(s,F,D,H):o==="simpson38"?W=ms(s,F,D,H):o==="gaussLegendre"?W=ps(s,F,D,parseInt(b,10)||3):o==="romberg"&&(W=fs(s,F,D,parseFloat(g)||1e-8,parseInt(f,10)||6)),R(W)}catch(F){S(F.message||"Error durante la integración numérica.")}finally{j(!1)}},50)},z=y=>{y&&y.preventDefault(),S(null),G(null),j(!0),setTimeout(()=>{try{const F=parseFloat($),D=parseFloat(v);if(Number.isNaN(F))throw new Error("El punto x0 debe ser un número válido.");if(Number.isNaN(D)||D<=0)throw new Error("El paso h debe ser estrictamente positivo.");const H=us(C,F,D);G(H)}catch(F){S(F.message||"Error durante la diferenciación numérica.")}finally{j(!1)}},50)},U=_.useMemo(()=>{if(!P)return[];try{const{evaluate:y}=me(s),F=parseFloat(n),D=parseFloat(l),H=(D-F)*.25,W=F-H,I=D+H,B=[],oe=[],ge=200,ye=(I-W)/ge;for(let ae=0;ae<=ge;ae++){const de=W+ae*ye;try{const je=y(de);B.push(de),oe.push(je)}catch{B.push(de),oe.push(null)}}let J=[],le=[];if(P.points&&P.points.length>0)J=[F,...P.points.map(ae=>ae.x),D],le=[0,...P.points.map(ae=>ae.fx),0];else{const de=(D-F)/50,je=[],A=[];for(let Y=0;Y<=50;Y++){const te=F+Y*de;je.push(te);try{A.push(y(te))}catch{A.push(0)}}J=[F,...je,D],le=[0,...A,0]}const ve=[{x:J,y:le,fill:"tozeroy",fillcolor:"rgba(20, 184, 166, 0.22)",line:{color:"#0d9488",width:1},type:"scatter",name:"Área Integrada",mode:"lines"},{x:B,y:oe,type:"scatter",mode:"lines",name:"f(x)",line:{color:"#38bdf8",width:2.5}}];return P.points&&P.points.length>0&&ve.push({x:P.points.map(ae=>ae.x),y:P.points.map(ae=>ae.fx),type:"scatter",mode:"markers+lines",name:o==="gaussLegendre"?"Puntos de Gauss":"Nodos de Mallado",marker:{color:"#f59e0b",size:o==="gaussLegendre"?9:6},line:{color:"#f59e0b",width:1,dash:"dot"}}),ve}catch{return[]}},[P,s,n,l,o]),K=_.useMemo(()=>{if(!L)return[];try{const{evaluate:y}=me(C),F=L.x0,D=L.h,H=Math.max(1,D*6),W=F-H,I=F+H,B=[],oe=[],ge=150,ye=(I-W)/ge;for(let de=0;de<=ge;de++){const je=W+de*ye;try{const A=y(je);B.push(je),oe.push(A)}catch{B.push(je),oe.push(null)}}const J=L.firstDerivative.central4.value,le=L.fx0,ve=[F-H*.7,F+H*.7],ae=ve.map(de=>le+J*(de-F));return[{x:B,y:oe,type:"scatter",mode:"lines",name:"f(x)",line:{color:"#38bdf8",width:2.5}},{x:ve,y:ae,type:"scatter",mode:"lines",name:`Tangente f'(x0) ≈ ${N(J,t)}`,line:{color:"#10b981",width:2,dash:"dash"}},{x:L.evaluations.map(de=>de.x),y:L.evaluations.map(de=>de.fx),type:"scatter",mode:"markers",name:"Puntos del Mallado (x0 ± kh)",marker:{color:"#fbbf24",size:8,symbol:"diamond"}}]}catch{return[]}},[L,C,t]),Q=[{key:"i",label:"i (Nodo)"},{key:"x",label:"x_i"},{key:"fx",label:"f(x_i)"}],ne=_.useMemo(()=>{if(a==="integration"&&P){const y={trapezoidSimple:"Regla del Trapecio Simple",trapezoidComp:"Regla del Trapecio Compuesta",simpson13:"Regla de Simpson 1/3 Compuesta",simpson38:"Regla de Simpson 3/8 Compuesta",gaussLegendre:"Cuadratura de Gauss-Legendre",romberg:"Integración de Romberg"},F={trapezoidSimple:"I \\approx \\frac{b - a}{2} [f(a) + f(b)]",trapezoidComp:"I \\approx \\frac{h}{2} \\left[ f(x_0) + 2\\sum_{i=1}^{n-1} f(x_i) + f(x_n) \\right]",simpson13:"I \\approx \\frac{h}{3} \\left[ f(x_0) + 4\\sum_{\\text{impar}} f(x_i) + 2\\sum_{\\text{par}} f(x_i) + f(x_n) \\right]",simpson38:"I \\approx \\frac{3h}{8} \\left[ f(x_0) + 3\\sum_{i \\nmid 3} f(x_i) + 2\\sum_{i \\mid 3} f(x_i) + f(x_n) \\right]",gaussLegendre:"I \\approx \\frac{b - a}{2} \\sum_{i=1}^n w_i f\\left(\\frac{b - a}{2}t_i + \\frac{a + b}{2}\\right)",romberg:"R(j, k) = \\frac{4^k R(j, k-1) - R(j-1, k-1)}{4^k - 1}"},D=[];return P.points&&P.points.length>0&&P.points.forEach(H=>D.push({x:H.x,y:H.fx})),{moduleId:"calculus",moduleTitle:"Cálculo Numérico - Integración Definida",activeTab:"integration",methodId:o,methodName:P.method||y[o]||o,problemStatement:`Aproximación numérica de la integral definida en el intervalo [${n}, ${l}].`,mathFormulationLatex:`I = \\int_{${n}}^{${l}} \\left(${X.replace("f(x) = ","")}\\right)\\,dx`,methodFormulaLatex:F[o]||"",parameters:[{label:"Integrando f(x)",value:s},{label:"Límite Inferior a",value:n},{label:"Límite Superior b",value:l},...o==="gaussLegendre"?[{label:"Puntos de Gauss",value:b}]:o==="romberg"?[{label:"Tolerancia Romberg",value:g}]:[{label:"Subintervalos (n)",value:m}],{label:"Precisión Decimal",value:`${t} decimales`}],rawInputs:{expression:s,a:parseFloat(n),b:parseFloat(l),n:parseInt(m,10)||4,gaussPoints:parseInt(b,10)||3},resultSummary:{converged:!0,mainResultLabel:"Valor de la Integral I",mainResultValue:`I ≈ ${N(P.result,t)}`,iterationsCount:P.n||P.levels||1,finalError:P.estimatedError!==void 0?N(P.estimatedError,t):"---",message:`Cálculo finalizado exitosamente mediante ${P.method}.`},tableColumns:Q,tableData:P.points||[],plotPoints:{curve:D,markers:D,xLabel:"x",yLabel:"f(x)"}}}else if(a==="differentiation"&&L){const y=L.firstDerivative.central4,F=[{scheme:"Centrada O(h⁴)",order:"O(h⁴)",formula:y.formula,value:y.value},{scheme:"Centrada O(h²)",order:"O(h²)",formula:L.firstDerivative.central1.formula,value:L.firstDerivative.central1.value},{scheme:"Adelante O(h²)",order:"O(h²)",formula:L.firstDerivative.forward2.formula,value:L.firstDerivative.forward2.value},{scheme:"Atrás O(h²)",order:"O(h²)",formula:L.firstDerivative.backward2.formula,value:L.firstDerivative.backward2.value},{scheme:"Adelante O(h)",order:"O(h)",formula:L.firstDerivative.forward1.formula,value:L.firstDerivative.forward1.value},{scheme:"Atrás O(h)",order:"O(h)",formula:L.firstDerivative.backward1.formula,value:L.firstDerivative.backward1.value},{scheme:"Segunda Derivada Centrada",order:"O(h²)",formula:L.secondDerivative.central2.formula,value:L.secondDerivative.central2.value}];return{moduleId:"calculus",moduleTitle:"Cálculo Numérico - Diferenciación Numérica",activeTab:"differentiation",methodId:"differentiation",methodName:"Diferenciación Numérica (Diferencias Finitas)",problemStatement:`Aproximación de derivadas de primer y segundo orden en el punto x₀ = ${$} con tamaño de paso h = ${v}.`,mathFormulationLatex:`f'(x_0) \\quad \\text{en } x_0 = ${$}, \\quad h = ${v}`,methodFormulaLatex:"f'(x_0) = \\frac{-f(x_0+2h) + 8f(x_0+h) - 8f(x_0-h) + f(x_0-2h)}{12h} + O(h^4)",parameters:[{label:"Función f(x)",value:C},{label:"Punto de Evaluación x0",value:$},{label:"Tamaño de Paso h",value:v},{label:"Precisión Decimal",value:`${t} decimales`}],rawInputs:{expression:C,x0:parseFloat($),h:parseFloat(v)},resultSummary:{converged:!0,mainResultLabel:"f'(x₀) [Centrada O(h⁴)]",mainResultValue:N(y.value,t),iterationsCount:1,finalError:`Paso h = ${v}`,message:"Diferenciación numérica calculada con 6 esquemas analíticos."},tableColumns:[{key:"scheme",label:"Esquema de Diferencias"},{key:"order",label:"Orden de Truncamiento"},{key:"value",label:"Valor Aproximado"}],tableData:F.map(D=>({...D,value:N(D.value,t)})),plotPoints:{curve:K&&K[0]&&K[0].x?K[0].x.map((D,H)=>({x:D,y:K[0].y[H]})).filter(D=>D.y!==null):[],markers:L.evaluations?L.evaluations.map(D=>({x:D.x,y:D.fx})):[],root:{x:parseFloat($),y:L.fx0,label:"x0"},xLabel:"x",yLabel:"f(x)"}}}return null},[a,P,L,o,s,n,l,m,b,g,C,$,v,t,X,Q,K]);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex rounded-2xl bg-slate-900/80 p-1.5 border border-slate-700/60 max-w-md",children:[e.jsxs("button",{onClick:()=>{r("integration"),S(null)},className:`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${a==="integration"?"bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-200"}`,children:[e.jsx(kt,{className:"w-4 h-4"}),e.jsx("span",{children:"Integración Numérica"})]}),e.jsxs("button",{onClick:()=>{r("differentiation"),S(null)},className:`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${a==="differentiation"?"bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-200"}`,children:[e.jsx(Ge,{className:"w-4 h-4"}),e.jsx("span",{children:"Diferenciación Finitas"})]})]}),a==="integration"&&e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60",children:[{id:"trapezoidSimple",label:"Trapecio Simple"},{id:"trapezoidComp",label:"Trapecio Comp."},{id:"simpson13",label:"Simpson 1/3"},{id:"simpson38",label:"Simpson 3/8"},{id:"gaussLegendre",label:"Gauss-Legendre"},{id:"romberg",label:"Romberg"}].map(y=>e.jsx("button",{onClick:()=>{i(y.id),S(null),R(null)},className:`py-2 px-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${o===y.id?"bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:y.label},y.id))}),e.jsxs("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{htmlFor:"integration-function-input",className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Función a integrar f(x)"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Presets:"}),e.jsx("button",{type:"button",onClick:()=>V("x^2","0","1","4"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"x² [0,1]"}),e.jsx("button",{type:"button",onClick:()=>V("sin(x)","0","pi","6"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"sin(x) [0,π]"}),e.jsx("button",{type:"button",onClick:()=>V("e^(-x^2)","0","2","8"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"e^(-x²) [0,2]"})]})]}),e.jsx("input",{id:"integration-function-input",type:"text",value:s,onChange:y=>d(y.target.value),placeholder:"Ej: x^2",className:"w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",required:!0}),e.jsxs("div",{className:"mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-sans",children:"Render LaTeX:"}),e.jsx(xe,{expression:X})]})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"integration-limit-a",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Límite inferior (a)"}),e.jsx("input",{id:"integration-limit-a",type:"number",step:"any",value:n,onChange:y=>c(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"integration-limit-b",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Límite superior (b)"}),e.jsx("input",{id:"integration-limit-b",type:"number",step:"any",value:l,onChange:y=>x(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),o!=="trapezoidSimple"&&o!=="gaussLegendre"&&o!=="romberg"&&e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"integration-subintervals-n",className:"block text-xs font-semibold text-slate-300 mb-1",children:["Subintervalos (n)",o==="simpson13"&&" [Par requerido]",o==="simpson38"&&" [Múltiplo de 3]"]}),e.jsx("input",{id:"integration-subintervals-n",type:"number",min:"1",value:m,onChange:y=>u(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),o==="gaussLegendre"&&e.jsxs("div",{children:[e.jsx("label",{htmlFor:"gauss-points-select",className:"block text-xs font-semibold text-teal-300 mb-1",children:"Puntos de Gauss (n = 2 a 6)"}),e.jsxs("select",{id:"gauss-points-select",value:b,onChange:y=>p(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-teal-500/70 rounded-xl text-teal-200 text-sm font-mono focus:border-teal-400 focus:outline-none cursor-pointer",children:[e.jsx("option",{value:"2",children:"2 Puntos (Exacto hasta grado 3)"}),e.jsx("option",{value:"3",children:"3 Puntos (Exacto hasta grado 5)"}),e.jsx("option",{value:"4",children:"4 Puntos (Exacto hasta grado 7)"}),e.jsx("option",{value:"5",children:"5 Puntos (Exacto hasta grado 9)"}),e.jsx("option",{value:"6",children:"6 Puntos (Exacto hasta grado 11)"})]})]}),o==="romberg"&&e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"romberg-tol-input",className:"block text-xs font-semibold text-teal-300 mb-1 truncate",title:"Tolerancia |ε|",children:"Tolerancia |ε|"}),e.jsx("input",{id:"romberg-tol-input",type:"number",step:"any",value:g,onChange:y=>h(y.target.value),className:"w-full px-2.5 py-2 bg-slate-900 border border-teal-500/70 rounded-xl text-teal-200 text-xs font-mono focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"romberg-levels-input",className:"block text-xs font-semibold text-slate-300 mb-1 truncate",title:"Nivel Máx. (2-10)",children:"Nivel Máx."}),e.jsx("input",{id:"romberg-levels-input",type:"number",min:"2",max:"10",value:f,onChange:y=>k(y.target.value),className:"w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono focus:border-teal-400 focus:outline-none"})]})]})]}),e.jsxs("button",{type:"button",onClick:M,disabled:q,className:"w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer",children:[q?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-slate-950"}),e.jsx("span",{children:q?"Integrando...":"Calcular Integral"})]})]}),(P==null?void 0:P.adjustmentNotice)&&e.jsx(Se,{type:"info",title:"Ajuste Automático de Subintervalos",message:P.adjustmentNotice}),w&&e.jsx(Se,{type:"error",title:"Error en Integración",message:w,onClose:()=>S(null)}),P&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:ne}),e.jsx("div",{className:"p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"text-xs uppercase font-bold tracking-wider text-teal-400",children:["Resultado Integral Definida • ",P.method]}),e.jsxs("div",{className:"text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1",children:["I ≈ ",N(P.result,t)]}),e.jsx("div",{className:"text-xs text-slate-400 mt-1",children:o==="romberg"?`Intervalo [${n}, ${l}] • ${P.levels} niveles calculados • ${P.numEvaluations} evaluaciones de f(x)`:o==="gaussLegendre"?`Intervalo [${n}, ${l}] • ${P.n} puntos de Gauss • Exacto hasta grado ${2*P.n-1}`:`En intervalo [${n}, ${l}] con n = ${P.n} (paso h = ${N(P.h,4)})`})]}),e.jsxs("div",{className:"px-4 py-2.5 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right",children:[e.jsx("div",{className:"text-xs text-slate-400 font-medium",children:o==="romberg"?"Error Estimado |ΔR|":o==="gaussLegendre"?"Precisión de Orden":"Error Teórico Estimado"}),e.jsx("div",{className:"text-sm font-mono text-amber-300 font-bold",children:o==="romberg"?`|E| ≈ ${N(P.estimatedError,t)}`:o==="gaussLegendre"?`Grado ≤ ${2*P.n-1}`:`|E_t| ≈ ${N(P.estimatedError,t)}`})]})]})}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Visualización del Área Segmentada:"}),e.jsx("span",{className:"text-xs font-mono text-teal-400",children:P.method})]}),e.jsx(ke,{data:U,layout:{title:{text:o==="romberg"?`Área bajo la curva con Romberg (${P.levels} niveles)`:o==="gaussLegendre"?`Área bajo la curva con Cuadratura de Gauss (${P.n} puntos)`:`Área bajo la curva con ${P.n} segmentos`,font:{color:"#e2e8f0",size:14}}}})]}),o==="romberg"&&P.table&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(De,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Tabla Triangular de Romberg (Extrapolación de Richardson):"})]}),e.jsx("span",{className:"text-xs text-slate-400 font-mono",children:P.converged?"✓ Convergencia alcanzada":"⚠️ Límite de niveles alcanzado"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs font-mono text-left border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-700 text-teal-400",children:[e.jsx("th",{className:"py-2 px-3",children:"k (Nivel)"}),e.jsx("th",{className:"py-2 px-3",children:"Subintervalos (2^k)"}),P.table[P.table.length-1].map((y,F)=>e.jsxs("th",{className:"py-2 px-3",children:["R[k, ",F,"] ",F===0?"(O(h²))":`(O(h^{${2*(F+1)}}))`]},F))]})}),e.jsx("tbody",{className:"divide-y divide-slate-800",children:P.table.map((y,F)=>e.jsxs("tr",{className:"hover:bg-slate-900/50",children:[e.jsx("td",{className:"py-2 px-3 text-slate-400 font-bold",children:F}),e.jsx("td",{className:"py-2 px-3 text-slate-400",children:Math.pow(2,F)}),y.map((D,H)=>{const W=F===P.table.length-1&&H===y.length-1;return e.jsx("td",{className:`py-2 px-3 ${W?"text-emerald-300 font-bold bg-emerald-950/40 rounded":"text-slate-200"}`,children:N(D,t)},H)})]},F))})]})})]}),P.points&&P.points.length>0&&e.jsx(Le,{title:o==="gaussLegendre"?`Nodos y Pesos de Gauss-Legendre (${P.n} puntos)`:"Valores de los Nodos f(x_i)",columns:o==="gaussLegendre"?[{key:"i",label:"i"},{key:"t",label:"Raíz Legendre (t_i)",render:y=>N(y,6)},{key:"w",label:"Peso (w_i)",render:y=>N(y,6)},{key:"x",label:"Punto Mapeado (x_i)",render:y=>N(y,t)},{key:"fx",label:"f(x_i)",render:y=>N(y,t)},{key:"term",label:"Término Ponderado",render:y=>N(y,t)}]:Q,data:P.points,precision:t,filename:o==="gaussLegendre"?"gauss_legendre_nodos":"nodos_integracion"})]})]}),a==="differentiation"&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{htmlFor:"differentiation-function-input",className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Función f(x)"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Presets:"}),e.jsx("button",{type:"button",onClick:()=>ee("x^3","2","0.01"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"x³ (x=2)"}),e.jsx("button",{type:"button",onClick:()=>ee("sin(x)","0.5","0.001"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"sin(x) (x=0.5)"}),e.jsx("button",{type:"button",onClick:()=>ee("e^x","1","0.01"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"eˣ (x=1)"})]})]}),e.jsx("input",{id:"differentiation-function-input",type:"text",value:C,onChange:y=>E(y.target.value),placeholder:"Ej: x^3",className:"w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",required:!0}),e.jsxs("div",{className:"mt-2 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-slate-700/40 text-sm flex items-center gap-2",children:[e.jsx("span",{className:"text-xs text-slate-400 font-sans",children:"Render LaTeX:"}),e.jsx(xe,{expression:X})]})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"differentiation-point-x0",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Punto de evaluación (x₀)"}),e.jsx("input",{id:"differentiation-point-x0",type:"number",step:"any",value:$,onChange:y=>T(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"differentiation-step-h",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Tamaño de paso (h > 0)"}),e.jsx("input",{id:"differentiation-step-h",type:"number",step:"any",value:v,onChange:y=>O(y.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]})]}),e.jsxs("button",{type:"button",onClick:z,disabled:q,className:"w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer",children:[q?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-slate-950"}),e.jsx("span",{children:q?"Calculando derivadas...":"Calcular Diferencias Finitas"})]})]}),w&&e.jsx(Se,{type:"error",title:"Error en Diferenciación",message:w,onClose:()=>S(null)}),L&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:ne}),e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-slate-700/60 pb-3",children:[e.jsxs("h4",{className:"text-sm font-bold text-slate-100 flex items-center gap-2",children:[e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-teal-400"}),e.jsx("span",{children:"Primera Derivada f'(x₀) — Comparativa de Esquemas"})]}),e.jsxs("span",{className:"text-xs font-mono text-teal-300",children:["f(",L.x0,") = ",N(L.fx0,t)]})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:[{title:"Centrada O(h⁴) [Máxima Precisión]",data:L.firstDerivative.central4,accent:"border-teal-500/70 bg-teal-950/20 text-teal-200"},{title:"Centrada O(h²)",data:L.firstDerivative.central1,accent:"border-cyan-500/50 bg-slate-900/60 text-cyan-200"},{title:"Hacia Adelante O(h²)",data:L.firstDerivative.forward2,accent:"border-slate-700 bg-slate-900/60 text-slate-200"},{title:"Hacia Atrás O(h²)",data:L.firstDerivative.backward2,accent:"border-slate-700 bg-slate-900/60 text-slate-200"},{title:"Hacia Adelante O(h)",data:L.firstDerivative.forward1,accent:"border-slate-700 bg-slate-900/60 text-slate-200"},{title:"Hacia Atrás O(h)",data:L.firstDerivative.backward1,accent:"border-slate-700 bg-slate-900/60 text-slate-200"}].map((y,F)=>e.jsxs("div",{className:`p-4 rounded-xl border flex flex-col justify-between ${y.accent}`,children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs font-semibold mb-1 text-slate-300",children:y.title}),e.jsx("div",{className:"my-2 py-1 text-xs",children:e.jsx(xe,{expression:y.data.formula})})]}),e.jsxs("div",{className:"pt-2 border-t border-slate-700/50 flex items-baseline justify-between",children:[e.jsx("span",{className:"text-xs text-slate-400 font-mono",children:y.data.order}),e.jsx("span",{className:"text-base font-bold font-mono text-emerald-300",children:N(y.data.value,t)})]})]},F))})]}),e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("h4",{className:"text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700/60 pb-3",children:[e.jsx("span",{className:"w-2.5 h-2.5 rounded-full bg-indigo-400"}),e.jsx("span",{children:"Segunda Derivada f''(x₀)"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",children:[{title:"Segunda Derivada Centrada O(h²)",data:L.secondDerivative.central,accent:"border-indigo-500/70 bg-indigo-950/20"},{title:"Segunda Derivada Adelante O(h)",data:L.secondDerivative.forward,accent:"border-slate-700 bg-slate-900/60"},{title:"Segunda Derivada Atrás O(h)",data:L.secondDerivative.backward,accent:"border-slate-700 bg-slate-900/60"}].map((y,F)=>e.jsxs("div",{className:`p-4 rounded-xl border ${y.accent}`,children:[e.jsx("div",{className:"text-xs font-semibold text-slate-300 mb-1",children:y.title}),e.jsx("div",{className:"my-2 text-xs",children:e.jsx(xe,{expression:y.data.formula})}),e.jsxs("div",{className:"pt-2 border-t border-slate-700/50 flex items-baseline justify-between",children:[e.jsx("span",{className:"text-xs text-slate-400 font-mono",children:y.data.order}),e.jsx("span",{className:"text-base font-bold font-mono text-indigo-300",children:N(y.data.value,t)})]})]},F))})]}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Visualización Geométrica:"}),e.jsx("span",{className:"text-xs font-mono text-teal-400",children:"Curva y Recta Tangente Local"})]}),e.jsx(ke,{data:K,layout:{title:{text:`Aproximación de f'(x₀) en x₀ = ${L.x0}`,font:{color:"#e2e8f0",size:14}}}})]})]})]})]})}const Te=1e4;function Je(t,a,r,o){if(typeof t!="number"||typeof a!="number"||typeof r!="number"||typeof o!="number")throw new Error("Todos los parámetros (x0, y0, xf, h) deben ser valores numéricos válidos.");if(o<=0)throw new Error("El tamaño de paso h debe ser estrictamente positivo (h > 0).");if(r<=t)throw new Error(`El valor final xf (${r}) debe ser estrictamente mayor que el valor inicial x0 (${t}).`);const i=(r-t)/o,s=Math.round(i);if(s<=0)throw new Error("El intervalo [x0, xf] con el paso h no genera pasos válidos.");if(s>Te)throw new Error(`El número de pasos (${s}) excede el límite seguro de ${Te}. Aumente el tamaño de paso h o reduzca el intervalo.`);return s}function Pt(t,a,r,o,i){const s=Je(a,r,o,i),{evaluate:d}=We(t),n=[];let c=a,l=r;for(let x=0;x<=s;x++){let m=0;try{m=d(c,l)}catch(u){throw new Error(`Error evaluando f(x, y) en el paso ${x} (x = ${c.toFixed(4)}, y = ${l.toFixed(4)}): ${u.message}`)}if(n.push({i:x,x:c,y:l,slope:m,k1:m}),x===s)break;if(l=l+i*m,c=a+(x+1)*i,!Number.isFinite(l))throw new Error(`Inestabilidad numérica o desbordamiento en el paso ${x+1} (x = ${c.toFixed(4)}). La solución diverge.`)}return{method:"Euler Clásico",x0:a,y0:r,xf:o,h:i,numSteps:s,finalY:n[n.length-1].y,trajectory:n}}function Ft(t,a,r,o,i){const s=Je(a,r,o,i),{evaluate:d}=We(t),n=[];let c=a,l=r;for(let x=0;x<=s;x++){let m=0;try{m=d(c,l)}catch(h){throw new Error(`Error en el paso ${x} (x = ${c.toFixed(4)}, y = ${l.toFixed(4)}): ${h.message}`)}if(x===s){n.push({i:x,x:c,y:l,slope:m,yPredictor:null});break}const u=l+i*m,b=a+(x+1)*i;let p=0;try{p=d(b,u)}catch(h){throw new Error(`Error evaluando corrector en paso ${x+1} (x = ${b.toFixed(4)}, yPred = ${u.toFixed(4)}): ${h.message}`)}const g=l+i/2*(m+p);if(n.push({i:x,x:c,y:l,slope:m,yPredictor:u,slopePredictor:p}),c=b,l=g,!Number.isFinite(l))throw new Error(`Inestabilidad numérica en x = ${c.toFixed(4)}.`)}return{method:"Euler Modificado (Heun)",x0:a,y0:r,xf:o,h:i,numSteps:s,finalY:n[n.length-1].y,trajectory:n}}function Lt(t,a,r,o,i){const s=Je(a,r,o,i),{evaluate:d}=We(t),n=[];let c=a,l=r;for(let x=0;x<=s;x++){if(x===s){let h=0;try{h=d(c,l)}catch{h=0}n.push({i:x,x:c,y:l,k1:h,k2:null,k3:null,k4:null});break}let m,u,b,p;try{m=d(c,l),u=d(c+.5*i,l+.5*i*m),b=d(c+.5*i,l+.5*i*u),p=d(c+i,l+i*b)}catch(h){throw new Error(`Error en RK4 en paso ${x} (x = ${c.toFixed(4)}, y = ${l.toFixed(4)}): ${h.message}`)}const g=l+i/6*(m+2*u+2*b+p);if(n.push({i:x,x:c,y:l,k1:m,k2:u,k3:b,k4:p}),c=a+(x+1)*i,l=g,!Number.isFinite(l))throw new Error(`Desbordamiento o divergencia en RK4 en x = ${c.toFixed(4)}.`)}return{method:"Runge-Kutta 4° Orden (RK4)",x0:a,y0:r,xf:o,h:i,numSteps:s,finalY:n[n.length-1].y,trajectory:n}}function hs(t,a,r,o,i){const s=Pt(t,a,r,o,i),d=Ft(t,a,r,o,i),n=Lt(t,a,r,o,i);return{euler:s,heun:d,rk4:n}}function It(t,a,r,o,i,s,d,n={}){const c=Je(r,o,s,d);if(typeof i!="number"||!Number.isFinite(i))throw new Error("El valor inicial y2_0 debe ser un número finito válido.");const{evaluate:l}=ut(t),{evaluate:x}=ut(a),m=[];let u=r,b=o,p=i;for(let g=0;g<=c;g++){if(g===c){m.push({i:g,t:u,y1:b,y2:p,k1_1:null,k1_2:null,k2_1:null,k2_2:null,k3_1:null,k3_2:null,k4_1:null,k4_2:null});break}let h,f,k,C,E,$,T,v;try{h=l(u,b,p),f=x(u,b,p);const j=u+.5*d,w=b+.5*d*h,S=p+.5*d*f;k=l(j,w,S),C=x(j,w,S);const P=b+.5*d*k,R=p+.5*d*C;E=l(j,P,R),$=x(j,P,R);const L=u+d,G=b+d*E,X=p+d*$;T=l(L,G,X),v=x(L,G,X)}catch(j){throw new Error(`Error en RK4 de sistema en paso ${g} (t = ${u.toFixed(4)}): ${j.message}`)}const O=b+d/6*(h+2*k+2*E+T),q=p+d/6*(f+2*C+2*$+v);if(m.push({i:g,t:u,y1:b,y2:p,k1_1:h,k1_2:f,k2_1:k,k2_2:C,k3_1:E,k3_2:$,k4_1:T,k4_2:v}),u=r+(g+1)*d,b=O,p=q,!Number.isFinite(b)||!Number.isFinite(p))throw new Error(`Inestabilidad numérica o divergencia en t = ${u.toFixed(4)}.`)}return{method:n.isSecondOrder?"RK4 para EDO de 2° Orden":"RK4 para Sistemas de EDOs",t0:r,tf:s,h:d,numSteps:c,finalY1:m[m.length-1].y1,finalY2:m[m.length-1].y2,var1Label:n.var1Label||"y_1",var2Label:n.var2Label||"y_2",isSecondOrder:!!n.isSecondOrder,trajectory:m}}function gs(t,a,r,o,i,s){return It("y2",t,a,r,o,i,s,{isSecondOrder:!0,var1Label:"y(t) (Posición)",var2Label:"y'(t) (Velocidad)"})}const ys=[0,1/5,3/10,4/5,8/9,1,1],vs=[[],[1/5],[3/40,9/40],[44/45,-56/15,32/9],[19372/6561,-25360/2187,64448/6561,-212/729],[9017/3168,-355/33,46732/5247,49/176,-5103/18656],[35/384,0,500/1113,125/192,-2187/6784,11/84]],js=[35/384,0,500/1113,125/192,-2187/6784,11/84,0],Ns=[71/57600,0,-71/16695,71/1920,-17253/339200,22/525,-1/40];function ws(t,a,r,o,i={}){if(typeof a!="number"||typeof r!="number"||typeof o!="number")throw new Error("Los parámetros iniciales (t0, y0, tf) deben ser valores numéricos.");if(o<=a)throw new Error(`El tiempo final tf (${o}) debe ser mayor que el tiempo inicial t0 (${a}).`);const s=typeof i.tol=="number"&&i.tol>0?i.tol:1e-5,d=i.hMin||1e-12,n=i.hMax||o-a;let c=i.h0||Math.min(.05,(o-a)/20);const{evaluate:l}=We(t),x=[],m=[];let u=a,b=r,p=0,g=0,h=0;x.push({i:0,t:u,y:b,h:c,error:0,accepted:!0});const f=.85,k=5,C=.1;for(;u<o&&p<Te;){p++,u+c>o&&(c=o-u);const E=new Array(7);try{E[0]=l(u,b);for(let S=1;S<7;S++){let P=0;for(let G=0;G<S;G++)P+=vs[S][G]*E[G];const R=u+ys[S]*c,L=b+c*P;E[S]=l(R,L)}}catch(S){throw new Error(`Error al evaluar la función diferencial f(t, y) en t = ${u.toFixed(4)}: ${S.message}`)}let $=0;for(let S=0;S<7;S++)$+=js[S]*E[S];const T=b+c*$;let v=0;for(let S=0;S<7;S++)v+=Ns[S]*E[S];const O=Math.abs(c*v),q=s+s*Math.max(Math.abs(b),Math.abs(T)),j=O/q,w=j<=1||c<=d;if(m.push({attempt:p,t:u,y:b,h:c,absError:O,errorRatio:j,accepted:w}),w){g++,u=u+c,b=T,x.push({i:g,t:u,y:b,h:c,error:O,accepted:!0});let S=j>1e-12?f*Math.pow(1/j,.2):k;S=Math.min(k,Math.max(C,S)),c=Math.min(n,Math.max(d,c*S))}else{h++;let S=f*Math.pow(1/j,.25);if(S=Math.min(1,Math.max(C,S)),c=Math.max(d,c*S),c<=d&&u+c===u)throw new Error(`El paso h se redujo al límite mínimo (${d.toExponential(2)}) sin satisfacer la tolerancia. Posible singularidad o rigidez severa en t = ${u.toFixed(4)}.`)}}if(p>=Te&&u<o)throw new Error(`Se superó el límite de seguridad de ${Te} pasos sin alcanzar tf = ${o}. Considere relajar la tolerancia tol.`);return{method:"Runge-Kutta Adaptativo (RK45 / Dormand-Prince)",t0:a,y0:r,tf:o,tol:s,finalY:x[x.length-1].y,numSteps:g,totalSteps:p,acceptedSteps:g,rejectedSteps:h,trajectory:x,allAttempts:m}}function ks({precision:t=6}){const[a,r]=_.useState("single"),[o,i]=_.useState("all"),[s,d]=_.useState("x + y"),[n,c]=_.useState("0"),[l,x]=_.useState("1"),[m,u]=_.useState("1"),[b,p]=_.useState("0.1"),[g,h]=_.useState("0.00001"),[f,k]=_.useState("1.2*y1 - 0.6*y1*y2"),[C,E]=_.useState("-0.8*y2 + 0.3*y1*y2"),[$,T]=_.useState("0"),[v,O]=_.useState("2"),[q,j]=_.useState("1"),[w,S]=_.useState("15"),[P,R]=_.useState("0.05"),[L,G]=_.useState("-0.4*y2 - 9*y1"),[X,V]=_.useState("0"),[ee,M]=_.useState("1"),[z,U]=_.useState("0"),[K,Q]=_.useState("8"),[ne,y]=_.useState("0.02"),[F,D]=_.useState(!1),[H,W]=_.useState(null),[I,B]=_.useState(null),oe=(A,Y,te,Z,ie)=>{d(A),c(Y),x(te),u(Z),p(ie),W(null),B(null)},ge=A=>{W(null),B(null),A==="lotka"?(k("1.2*y1 - 0.6*y1*y2"),E("-0.8*y2 + 0.3*y1*y2"),T("0"),O("2"),j("1"),S("15"),R("0.05")):A==="oscillator"&&(k("y2"),E("-y1"),T("0"),O("1"),j("0"),S("10"),R("0.05"))},ye=A=>{W(null),B(null),A==="damped"?(G("-0.4*y2 - 9*y1"),V("0"),M("1"),U("0"),Q("8"),y("0.02")):A==="pendulum"?(G("-sin(y1)"),V("0"),M("2.5"),U("0"),Q("12"),y("0.05")):A==="gravity"&&(G("-9.81 - 0.2*y2"),V("0"),M("50"),U("0"),Q("4"),y("0.05"))},J=A=>{A&&A.preventDefault(),W(null),B(null),D(!0),setTimeout(()=>{try{if(a==="single"){const Y=parseFloat(n),te=parseFloat(l),Z=parseFloat(m),ie=parseFloat(b);let re;o==="euler"?re={type:"single",single:Pt(s,Y,te,Z,ie),isMulti:!1}:o==="heun"?re={type:"single",single:Ft(s,Y,te,Z,ie),isMulti:!1}:o==="rk4"?re={type:"single",single:Lt(s,Y,te,Z,ie),isMulti:!1}:o==="rk45"?re={type:"single",single:ws(s,Y,te,Z,{tol:parseFloat(g)||1e-5,h0:parseFloat(b)||.05}),isMulti:!1,isAdaptive:!0}:re={type:"single",multi:hs(s,Y,te,Z,ie),isMulti:!0},B(re)}else if(a==="system"){const Y=parseFloat($),te=parseFloat(v),Z=parseFloat(q),ie=parseFloat(w),re=parseFloat(P),se=It(f,C,Y,te,Z,ie,re,{var1Label:"y_1 (Presa / Var 1)",var2Label:"y_2 (Depredador / Var 2)"});B({type:"system",system:se})}else if(a==="secondOrder"){const Y=parseFloat(X),te=parseFloat(ee),Z=parseFloat(z),ie=parseFloat(K),re=parseFloat(ne),se=gs(L,Y,te,Z,ie,re);B({type:"secondOrder",secondOrder:se})}}catch(Y){W(Y.message||"Error resolviendo la ecuación diferencial.")}finally{D(!1)}},50)},le=_.useMemo(()=>{if(!I||I.type!=="single")return[];if(I.isMulti){const{euler:A,heun:Y,rk4:te}=I.multi;return[{x:A.trajectory.map(Z=>Z.x),y:A.trajectory.map(Z=>Z.y),type:"scatter",mode:"lines+markers",name:`Euler: y(${m}) ≈ ${N(A.finalY,t)}`,line:{color:"#f59e0b",width:2,dash:"dot"},marker:{color:"#f59e0b",size:5}},{x:Y.trajectory.map(Z=>Z.x),y:Y.trajectory.map(Z=>Z.y),type:"scatter",mode:"lines+markers",name:`Heun: y(${m}) ≈ ${N(Y.finalY,t)}`,line:{color:"#06b6d4",width:2,dash:"dash"},marker:{color:"#06b6d4",size:6}},{x:te.trajectory.map(Z=>Z.x),y:te.trajectory.map(Z=>Z.y),type:"scatter",mode:"lines+markers",name:`RK4: y(${m}) ≈ ${N(te.finalY,t)}`,line:{color:"#10b981",width:2.5},marker:{color:"#10b981",size:7,symbol:"diamond"}}]}else{const A=I.single,Y=I.isAdaptive;return[{x:A.trajectory.map(te=>te.x??te.t),y:A.trajectory.map(te=>te.y),type:"scatter",mode:"lines+markers",name:Y?`RK45 (Dormand-Prince): y(${m}) ≈ ${N(A.finalY,t)}`:`${A.method}`,line:{color:"#14b8a6",width:2.5},marker:{color:Y?"#10b981":"#2dd4bf",size:Y?7:6,symbol:Y?"diamond":"circle"}}]}},[I,m,t]),ve=_.useMemo(()=>{if(!I||!I.isAdaptive)return null;const A=I.single.trajectory;return[{x:A.map(Y=>Y.t),y:A.map(Y=>Y.h),type:"scatter",mode:"lines+markers",name:"Tamaño de paso h(t)",line:{color:"#6366f1",width:2},marker:{color:"#818cf8",size:5}}]},[I]),ae=_.useMemo(()=>{if(!I||I.type!=="system"&&I.type!=="secondOrder")return null;const A=I.type==="system"?I.system:I.secondOrder,Y=A.trajectory,te=I.type==="secondOrder"?"Posición y(t)":"y₁(t)",Z=I.type==="secondOrder"?"Velocidad y'(t)":"y₂(t)",ie=[{x:Y.map(se=>se.t),y:Y.map(se=>se.y1),type:"scatter",mode:"lines",name:te,line:{color:"#14b8a6",width:2.5}},{x:Y.map(se=>se.t),y:Y.map(se=>se.y2),type:"scatter",mode:"lines",name:Z,line:{color:"#f59e0b",width:2.5,dash:"dash"}}],re=[{x:Y.map(se=>se.y1),y:Y.map(se=>se.y2),type:"scatter",mode:"lines+markers",name:"Órbita de Fase",line:{color:"#a855f7",width:2},marker:{color:Y.map((se,Ne)=>Ne),colorscale:"Viridis",size:4}},{x:[Y[0].y1],y:[Y[0].y2],type:"scatter",mode:"markers+text",name:"Condición Inicial",text:["Inicio"],textposition:"top center",marker:{color:"#38bdf8",size:10,symbol:"star"}}];return{timePlot:ie,phasePlot:re,label1:te,label2:Z,dataObj:A}},[I]),de=_.useMemo(()=>{if(!I)return null;if(I.type==="single")if(I.isMulti){const A=I.multi.euler.trajectory,Y=I.multi.heun.trajectory,te=I.multi.rk4.trajectory,Z=A.map((ie,re)=>{var se,Ne,Ve;return{i:ie.i,x:ie.x,y_euler:ie.y,y_heun:((se=Y[re])==null?void 0:se.y)??0,y_rk4:((Ne=te[re])==null?void 0:Ne.y)??0,diff:Math.abs((((Ve=te[re])==null?void 0:Ve.y)??0)-ie.y)}});return{columns:[{key:"i",label:"Paso (i)"},{key:"x",label:"x_i"},{key:"y_euler",label:"y (Euler)"},{key:"y_heun",label:"y (Heun)"},{key:"y_rk4",label:"y (RK4)"},{key:"diff",label:"|RK4 - Euler|"}],data:Z,filename:"edo_comparativa"}}else return I.isAdaptive?{columns:[{key:"i",label:"Paso (i)"},{key:"t",label:"t_i",render:A=>N(A,t)},{key:"y",label:"y(t_i)",render:A=>N(A,t)},{key:"h",label:"Paso h_i",render:A=>N(A,t)},{key:"error",label:"Error Local",render:A=>A!==null?N(A,t):"0"}],data:I.single.trajectory,filename:"edo_rk45_adaptativo"}:{columns:[{key:"i",label:"i"},{key:"x",label:"x_i"},{key:"y",label:"y_i"},{key:"k1",label:"Pendiente k₁"}],data:I.single.trajectory,filename:"edo_individual"};else{const A=I.type==="system"?I.system:I.secondOrder,Y=I.type==="secondOrder";return{columns:[{key:"i",label:"Paso (i)"},{key:"t",label:"Tiempo (t)"},{key:"y1",label:Y?"y(t) (Posición)":"y₁"},{key:"y2",label:Y?"y'(t) (Velocidad)":"y₂"}],data:A.trajectory,filename:Y?"edo_segundo_orden":"sistema_edos"}}},[I]),je=_.useMemo(()=>{if(!I)return null;const A={euler:"Método de Euler",heun:"Método de Heun (Euler Mejorado)",rk4:"Método de Runge-Kutta 4° Orden (RK4)",rk45:"Método Runge-Kutta-Fehlberg 4(5) Adaptativo",all:"Análisis Comparativo (Euler vs Heun vs RK4)"},Y={euler:"y_{n+1} = y_n + h f(x_n, y_n)",heun:"y_{n+1} = y_n + \\frac{h}{2}\\left[ f(x_n, y_n) + f(x_n + h, y_n + h f(x_n, y_n)) \\right]",rk4:"y_{n+1} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)",rk45:"\\hat{y}_{n+1} = y_n + h \\sum_{i=1}^6 c_i k_i, \\quad |TE| = |y_{n+1} - \\hat{y}_{n+1}|",all:"y_{n+1}^{(\\text{RK4})} = y_n + \\frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)"};let te="Ecuaciones Diferenciales Ordinarias (EDO)",Z="",ie="",re=[],se=[],Ne="";if(I.type==="single"){if(ie=A[o]||"Runge-Kutta 4",Z=`\\frac{dy}{dx} = ${s}, \\quad y(${n}) = ${l}`,se=[{label:"EDO dy/dx",value:s},{label:"Condición Inicial y(x0)",value:`y(${n}) = ${l}`},{label:"Extremo Final xf",value:m},...o==="rk45"?[{label:"Tolerancia Error",value:g}]:[{label:"Tamaño de Paso h",value:b}],{label:"Precisión Decimal",value:`${t} decimales`}],I.single&&I.single.trajectory){re=I.single.trajectory.map(ue=>({x:ue.x??ue.t,y:ue.y}));const ce=I.single.trajectory[I.single.trajectory.length-1];Ne=`y(${m}) ≈ ${N(ce==null?void 0:ce.y,t)}`}else if(I.comparative){const ce=I.comparative.rk4.trajectory;re=ce.map(dt=>({x:dt.x,y:dt.y}));const ue=ce[ce.length-1];Ne=`y(${m}) ≈ ${N(ue==null?void 0:ue.y,t)} (RK4)`}}else if(I.type==="system"){if(ie="Sistema Acoplado de 2 EDOs (RK4)",Z=`\\begin{cases} \\frac{dy_1}{dt} = ${f} \\\\ \\frac{dy_2}{dt} = ${C} \\end{cases}, \\quad y_1(${$})=${v}, \\, y_2(${$})=${q}`,se=[{label:"dy1/dt",value:f},{label:"dy2/dt",value:C},{label:"y1(t0), y2(t0)",value:`${v}, ${q}`},{label:"Tiempo Final tf",value:w},{label:"Paso h",value:P}],I.system&&I.system.trajectory){re=I.system.trajectory.map(ue=>({x:ue.t,y:ue.y1}));const ce=I.system.trajectory[I.system.trajectory.length-1];Ne=`y₁(${w}) ≈ ${N(ce==null?void 0:ce.y1,t)}, y₂(${w}) ≈ ${N(ce==null?void 0:ce.y2,t)}`}}else if(ie="EDO de 2° Orden y'' = f(t, y, y') (RK4)",Z=`y'' = ${L}, \\quad y(${X})=${ee}, \\, y'(${X})=${z}`,se=[{label:"y'' = f(t, y, y')",value:L},{label:"y(t0), y'(t0)",value:`${ee}, ${z}`},{label:"Tiempo Final tf",value:K},{label:"Paso h",value:ne}],I.secondOrder&&I.secondOrder.trajectory){re=I.secondOrder.trajectory.map(ue=>({x:ue.t,y:ue.y1}));const ce=I.secondOrder.trajectory[I.secondOrder.trajectory.length-1];Ne=`y(${K}) ≈ ${N(ce==null?void 0:ce.y1,t)}`}const Ve=re.filter((ce,ue)=>ue%Math.max(1,Math.floor(re.length/25))===0);return{moduleId:"ode",moduleTitle:te,methodId:o,methodName:ie,problemStatement:"Solución numérica de problema de valor inicial (PVI) mediante integración temporal.",mathFormulationLatex:Z,methodFormulaLatex:Y[o]||Y.rk4,parameters:se,rawInputs:{expression:a==="single"?s:a==="system"?`${f}; ${C}`:L,paramX0:n,paramY0:l,paramXf:m,paramH:b},resultSummary:{converged:!0,mainResultLabel:"Solución en Extremo Final",mainResultValue:Ne,iterationsCount:tableInfo.data.length,finalError:`Paso h = ${b}`,message:"Integración numérica de la trayectoria completada exitosamente."},tableColumns:tableInfo.columns,tableData:tableInfo.data,plotPoints:{curve:re,markers:Ve,xLabel:a==="single"?"x":"t",yLabel:"y(t)"}}},[I,a,o,s,n,l,m,b,g,f,C,$,v,q,w,P,L,X,ee,z,K,ne,t,tableInfo]);return e.jsxs("div",{className:"space-y-6",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-between gap-3 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/70 backdrop-blur-sm",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2 w-full",children:[{id:"single",label:"EDO 1er Orden dy/dx = f(x, y)"},{id:"system",label:"Sistema Acoplado (2 EDOs RK4)"},{id:"secondOrder",label:"EDO 2° Orden y'' = f(t, y, y')"}].map(A=>e.jsx("button",{onClick:()=>{r(A.id),W(null),B(null)},className:`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${a===A.id?"bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:A.label},A.id))})}),a==="single"&&e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-5 gap-2 p-1 bg-slate-900/60 rounded-xl border border-slate-800 text-xs",children:[{id:"all",label:"Comparar Todos"},{id:"rk45",label:"RK45 Adaptativo"},{id:"rk4",label:"Runge-Kutta 4°"},{id:"heun",label:"Heun"},{id:"euler",label:"Euler"}].map(A=>e.jsx("button",{onClick:()=>{i(A.id),W(null),B(null)},className:`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${o===A.id?"bg-slate-800 text-teal-300 font-bold border border-teal-500/50":"text-slate-400 hover:text-slate-200"}`,children:A.label},A.id))}),e.jsxs("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl space-y-5",children:[a==="single"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("label",{htmlFor:"ode-function-input",className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Ecuación diferencial: dy/dx = f(x, y)"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Presets:"}),e.jsx("button",{type:"button",onClick:()=>oe("x + y","0","1","1","0.1"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"x + y"}),e.jsx("button",{type:"button",onClick:()=>oe("x - y + 1","0","1","2","0.2"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"x - y + 1"}),e.jsx("button",{type:"button",onClick:()=>oe("y - x^2 + 1","0","0.5","2","0.1"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"y - x² + 1"})]})]}),e.jsx("input",{id:"ode-function-input",type:"text",value:s,onChange:A=>d(A.target.value),placeholder:"Ej: x + y",className:"w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",required:!0})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ode-param-x0",className:"block text-xs font-semibold text-slate-300 mb-1",children:"x Inicial (x₀)"}),e.jsx("input",{id:"ode-param-x0",type:"number",step:"any",value:n,onChange:A=>c(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ode-param-y0",className:"block text-xs font-semibold text-slate-300 mb-1",children:"y Inicial y(x₀)"}),e.jsx("input",{id:"ode-param-y0",type:"number",step:"any",value:l,onChange:A=>x(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ode-param-xf",className:"block text-xs font-semibold text-slate-300 mb-1",children:"x Final (x_f)"}),e.jsx("input",{id:"ode-param-xf",type:"number",step:"any",value:m,onChange:A=>u(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]}),o==="rk45"?e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ode-param-tol",className:"block text-xs font-semibold text-emerald-300 mb-1",children:"Tolerancia local (|ε|)"}),e.jsx("input",{id:"ode-param-tol",type:"number",step:"any",value:g,onChange:A=>h(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-emerald-500/70 rounded-xl text-emerald-200 text-sm font-mono focus:border-emerald-400 focus:outline-none",required:!0})]}):e.jsxs("div",{children:[e.jsx("label",{htmlFor:"ode-param-h",className:"block text-xs font-semibold text-slate-300 mb-1",children:"Paso (h > 0)"}),e.jsx("input",{id:"ode-param-h",type:"number",step:"any",value:b,onChange:A=>p(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-teal-400 focus:outline-none",required:!0})]})]})]}),a==="system"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Sistema de Ecuaciones Acopladas:"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Modelos:"}),e.jsx("button",{type:"button",onClick:()=>ge("lotka"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"Lotka-Volterra"}),e.jsx("button",{type:"button",onClick:()=>ge("oscillator"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"Oscilador"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-teal-300 mb-1",children:"dy₁/dt = f₁(t, y₁, y₂)"}),e.jsx("input",{type:"text",value:f,onChange:A=>k(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",placeholder:"Ej: 1.2*y1 - 0.6*y1*y2"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-indigo-300 mb-1",children:"dy₂/dt = f₂(t, y₁, y₂)"}),e.jsx("input",{type:"text",value:C,onChange:A=>E(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-indigo-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",placeholder:"Ej: -0.8*y2 + 0.3*y1*y2"})]})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-5 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"t Inicial (t₀)"}),e.jsx("input",{type:"number",step:"any",value:$,onChange:A=>T(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-teal-300 mb-1",children:"y₁(t₀)"}),e.jsx("input",{type:"number",step:"any",value:v,onChange:A=>O(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-indigo-300 mb-1",children:"y₂(t₀)"}),e.jsx("input",{type:"number",step:"any",value:q,onChange:A=>j(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-indigo-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"t Final (t_f)"}),e.jsx("input",{type:"number",step:"any",value:w,onChange:A=>S(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"Paso (h > 0)"}),e.jsx("input",{type:"number",step:"any",value:P,onChange:A=>R(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]})]})]}),a==="secondOrder"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:"text-xs sm:text-sm font-semibold text-slate-200",children:"Ecuación Diferencial de Segundo Orden: y'' = f(t, y, y')"}),e.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-400",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{children:"Casos Físicos:"}),e.jsx("button",{type:"button",onClick:()=>ye("damped"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"Amortiguado"}),e.jsx("button",{type:"button",onClick:()=>ye("pendulum"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"Péndulo No Lineal"}),e.jsx("button",{type:"button",onClick:()=>ye("gravity"),className:"px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-teal-300 font-mono",children:"Caída Libre"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-teal-300 mb-1",children:"Aceleración f(t, y, y') [alias: t, y1 para y, y2 para y']:"}),e.jsx("input",{type:"text",value:L,onChange:A=>G(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 focus:border-teal-400 rounded-xl font-mono text-slate-100 text-sm focus:outline-none",placeholder:"Ej: -0.4*y2 - 9*y1"})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-5 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"t₀"}),e.jsx("input",{type:"number",step:"any",value:X,onChange:A=>V(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-teal-300 mb-1",children:"y(t₀) (Posición)"}),e.jsx("input",{type:"number",step:"any",value:ee,onChange:A=>M(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-indigo-300 mb-1",children:"y'(t₀) (Velocidad)"}),e.jsx("input",{type:"number",step:"any",value:z,onChange:A=>U(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-indigo-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"t Final (t_f)"}),e.jsx("input",{type:"number",step:"any",value:K,onChange:A=>Q(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-semibold text-slate-300 mb-1",children:"Paso (h > 0)"}),e.jsx("input",{type:"number",step:"any",value:ne,onChange:A=>y(A.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-slate-100 focus:border-teal-400 focus:outline-none"})]})]})]}),e.jsxs("button",{type:"button",onClick:J,disabled:F,className:"w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer",children:[F?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-slate-950"}),e.jsx("span",{children:F?"Calculando trayectoria...":"Simular Trayectoria"})]})]}),H&&e.jsx(Se,{type:"error",title:"Error en EDO",message:H,onClose:()=>W(null)}),I&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:je}),I.type==="single"&&e.jsxs(e.Fragment,{children:[I.isMulti?e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"p-4 rounded-2xl border bg-slate-900/80 border-amber-500/40",children:[e.jsx("div",{className:"text-xs text-amber-400 font-semibold mb-1",children:"Euler Clásico"}),e.jsxs("div",{className:"text-xl font-bold font-mono text-slate-100",children:["y(",m,") ≈ ",N(I.multi.euler.finalY,t)]}),e.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:[I.multi.euler.numSteps," pasos"]})]}),e.jsxs("div",{className:"p-4 rounded-2xl border bg-slate-900/80 border-cyan-500/40",children:[e.jsx("div",{className:"text-xs text-cyan-400 font-semibold mb-1",children:"Euler Modificado (Heun)"}),e.jsxs("div",{className:"text-xl font-bold font-mono text-slate-100",children:["y(",m,") ≈ ",N(I.multi.heun.finalY,t)]}),e.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:[I.multi.heun.numSteps," pasos"]})]}),e.jsxs("div",{className:"p-4 rounded-2xl border bg-emerald-950/30 border-emerald-500/50",children:[e.jsx("div",{className:"text-xs text-emerald-400 font-semibold mb-1",children:"Runge-Kutta 4° Orden (RK4)"}),e.jsxs("div",{className:"text-xl font-bold font-mono text-emerald-200",children:["y(",m,") ≈ ",N(I.multi.rk4.finalY,t)]}),e.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:[I.multi.rk4.numSteps," pasos"]})]})]}):e.jsxs("div",{className:"p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"text-xs uppercase font-bold tracking-wider text-teal-400",children:["Solución Final • ",I.single.method]}),e.jsxs("div",{className:"text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono mt-1",children:["y(",m,") ≈ ",N(I.single.finalY,t)]}),e.jsxs("div",{className:"text-xs text-slate-400 mt-1",children:["Condición inicial: y(",n,") = ",l," | ",I.isAdaptive?`Tolerancia |ε| = ${g}`:`Paso h = ${b}`]})]}),e.jsx("div",{className:"flex items-center gap-3",children:I.isAdaptive?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"px-3 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"Pasos aceptados"}),e.jsx("div",{className:"text-lg font-bold font-mono text-emerald-300",children:I.single.acceptedSteps})]}),e.jsxs("div",{className:"px-3 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"Rechazados"}),e.jsx("div",{className:"text-lg font-bold font-mono text-amber-400",children:I.single.rejectedSteps})]})]}):e.jsxs("div",{className:"px-4 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"Número de pasos"}),e.jsx("div",{className:"text-lg font-bold font-mono text-teal-300",children:I.single.numSteps})]})})]}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Trayectoria de la Solución y(x):"}),e.jsx("span",{className:"text-xs font-mono text-teal-400",children:I.isMulti?"Comparativa Euler vs Heun vs RK4":I.single.method})]}),e.jsx(ke,{data:le,layout:{title:{text:`Solución numérica dy/dx = ${s}`,font:{color:"#e2e8f0",size:14}},xaxis:{title:{text:"x"}},yaxis:{title:{text:"y(x)"}}}})]}),I.isAdaptive&&ve&&e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-indigo-500/40 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx(Ge,{className:"w-4 h-4 text-indigo-400"}),e.jsx("span",{children:"Variación Dinámica del Tamaño de Paso h(t):"}),e.jsxs("span",{className:"text-xs font-mono text-indigo-400",children:["Adaptativo RK45 (Tolerancia: ",g,")"]})]}),e.jsx(ke,{data:ve,layout:{title:{text:"Paso h en función de t (Control local del error)",font:{color:"#e2e8f0",size:14}},xaxis:{title:{text:"t"}},yaxis:{title:{text:"h (Tamaño de paso)"}}}})]})]}),(I.type==="system"||I.type==="secondOrder")&&ae&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-xs uppercase font-bold tracking-wider text-teal-400",children:ae.dataObj.method}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mt-2",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"text-xs text-slate-400",children:[ae.label1," final:"]}),e.jsx("div",{className:"text-xl font-bold font-mono text-teal-300",children:N(ae.dataObj.finalY1,t)})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-xs text-slate-400",children:[ae.label2," final:"]}),e.jsx("div",{className:"text-xl font-bold font-mono text-amber-300",children:N(ae.dataObj.finalY2,t)})]})]})]}),e.jsxs("div",{className:"px-4 py-2 bg-slate-900/70 rounded-xl border border-slate-700/60 text-right",children:[e.jsx("div",{className:"text-xs text-slate-400",children:"Total de Pasos"}),e.jsx("div",{className:"text-lg font-bold font-mono text-teal-300",children:ae.dataObj.numSteps})]})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx(Ge,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Evolución Temporal vs Tiempo (t):"})]}),e.jsx(ke,{data:ae.timePlot,layout:{title:{text:"Trayectorias Temporales",font:{color:"#e2e8f0",size:13}},xaxis:{title:{text:"Tiempo (t)"}},yaxis:{title:{text:"Amplitud"}}}})]}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx(Jt,{className:"w-4 h-4 text-purple-400"}),e.jsx("span",{children:"Espacio de Fases (Retrato de Fase):"})]}),e.jsx(ke,{data:ae.phasePlot,layout:{title:{text:`${ae.label2} vs ${ae.label1}`,font:{color:"#e2e8f0",size:13}},xaxis:{title:{text:ae.label1}},yaxis:{title:{text:ae.label2}}}})]})]})]}),de&&e.jsx(Le,{title:"Tabla de Valores de la Trayectoria",columns:de.columns,data:de.data,precision:t,filename:de.filename})]})]})}function Qe(t,a=2){if(!Array.isArray(t)||t.length<a)throw new Error(`Se requieren al menos ${a} puntos para este método.`);const r=[...t].sort((i,s)=>i.x-s.x),o=new Set;for(let i=0;i<r.length;i++){const s=r[i];if(typeof s.x!="number"||typeof s.y!="number"||!Number.isFinite(s.x)||!Number.isFinite(s.y))throw new Error(`El punto en la fila ${i+1} contiene coordenadas no numéricas o inválidas.`);for(const d of o)if(Math.abs(s.x-d)<1e-12)throw new Error(`Abscisas duplicadas detectadas: x = ${s.x}. Todos los valores de x deben ser estrictamente diferentes para interpolar.`);o.add(s.x)}return r}function $s(t){const a=Qe(t,2),r=a.length,o=[];for(let x=0;x<r;x++){const m=a[x].x,u=a[x].y;let b=1;const p=[];for(let h=0;h<r;h++)if(x!==h){const f=a[h].x;b*=m-f,p.push({xj:f,text:f>=0?`(x - ${N(f,4)})`:`(x + ${N(Math.abs(f),4)})`})}const g=u/b;o.push({i:x,xi:m,yi:u,denominator:b,weight:g,factors:p,latex:`L_{${x}}(x) = \\prod_{j \\neq ${x}} \\frac{x - x_j}{x_{${x}} - x_j}`})}const i=x=>{let m=0;for(let u=0;u<r;u++){let b=a[u].y;for(let p=0;p<r;p++)u!==p&&(b*=(x-a[p].x)/(a[u].x-a[p].x));m+=b}return m},s=o.map(x=>{const m=x.factors.map(b=>b.xj>=0?`(x - ${N(b.xj,3)})`:`(x + ${N(Math.abs(b.xj),3)})`).join("");return`${x.yi>=0?"+":"-"} \\frac{${N(Math.abs(x.yi),4)}}{${N(x.denominator,4)}} ${m}`}).join(` \\\\[6pt] 
`),d=`P_{${r-1}}(x) = 
\\begin{aligned}
${s}
\\end{aligned}`;let n=new Array(r).fill(0);for(let x=0;x<r;x++){a[x].x;const m=a[x].y;let u=o[x].denominator,b=[1];for(let g=0;g<r;g++)if(x!==g){const h=a[g].x,f=new Array(b.length+1).fill(0);for(let k=0;k<b.length;k++)f[k+1]+=b[k],f[k]-=h*b[k];b=f}const p=m/u;for(let g=0;g<b.length;g++)n[g]+=b[g]*p}const c=[];for(let x=n.length-1;x>=0;x--){const m=n[x];Math.abs(m)>1e-10&&(x===0?c.push(N(m,4)):x===1?c.push(`${N(m,4)}x`):c.push(`${N(m,4)}x^{${x}}`))}const l=c.length>0?c.join(" + ").replace(/\+\s*-/g,"- "):"0";return{method:"Polinomios de Lagrange",degree:r-1,points:a,basis:o,evaluate:i,latex:d,expandedLatex:`P(x) = ${l}`,expandedCoeffs:n}}function _s(t){const a=Qe(t,2),r=a.length,o=Array.from({length:r},()=>new Array(r).fill(null));for(let l=0;l<r;l++)o[l][0]=a[l].y;for(let l=1;l<r;l++)for(let x=0;x<r-l;x++){const m=o[x+1][l-1]-o[x][l-1],u=a[x+l].x-a[x].x;o[x][l]=m/u}const i=[];for(let l=0;l<r;l++)i.push({order:l,value:o[0][l]});const s=l=>{let x=o[0][r-1];for(let m=r-2;m>=0;m--)x=o[0][m]+(l-a[m].x)*x;return x},d=[];for(let l=0;l<r;l++){const x=o[0][l];if(l===0)d.push(N(x,4));else{let m="";for(let b=0;b<l;b++){const p=a[b].x;m+=p>=0?`(x - ${N(p,3)})`:`(x + ${N(Math.abs(p),3)})`}const u=x>=0?"+":"-";d.push(`${u} ${N(Math.abs(x),4)} ${m}`)}}const n=`P_{${r-1}}(x) = ${d.join(" ")}`,c=a.map((l,x)=>{const m={i:x,x:l.x,y:l.y};for(let u=1;u<r;u++)m[`diff_${u}`]=o[x][u];return m});return{method:"Diferencias Divididas de Newton",degree:r-1,points:a,table:o,tableRows:c,coefficients:i,evaluate:s,latex:n}}function Cs(t){const a=Qe(t,3),r=a.length,o=r-1,i=new Array(o);new Array(o);for(let l=0;l<o;l++)if(i[l]=a[l+1].x-a[l].x,i[l]<=0)throw new Error("Los puntos deben estar estrictamente ordenados y sin abscisas repetidas.");const s=o-1,d=new Array(r).fill(0);if(s>0){const l=Array.from({length:s},()=>new Array(s).fill(0)),x=new Array(s).fill(0);for(let p=1;p<r-1;p++){const g=p-1,h=(a[p+1].y-a[p].y)/i[p],f=(a[p].y-a[p-1].y)/i[p-1];x[g]=6*(h-f),l[g][g]=2*(i[p-1]+i[p]),g>0&&(l[g][g-1]=i[p-1]),g<s-1&&(l[g][g+1]=i[p])}const m=new Array(s).fill(0),u=new Array(s).fill(0);m[0]=(l[0][1]||0)/l[0][0],u[0]=x[0]/l[0][0];for(let p=1;p<s;p++){const g=l[p][p-1],h=l[p][p],f=p<s-1?l[p][p+1]:0,k=h-g*m[p-1];m[p]=f/k,u[p]=(x[p]-g*u[p-1])/k}const b=new Array(s).fill(0);b[s-1]=u[s-1];for(let p=s-2;p>=0;p--)b[p]=u[p]-m[p]*b[p+1];for(let p=1;p<r-1;p++)d[p]=b[p-1]}const n=[];for(let l=0;l<o;l++){const x=a[l].x,m=a[l+1].x,u=a[l].y,b=a[l+1].y,p=i[l],g=u,h=d[l]/2,f=(d[l+1]-d[l])/(6*p),k=(b-u)/p-p/6*(2*d[l]+d[l+1]),C=`S_{${l}}(x) = ${N(g,4)} ${k>=0?"+":"-"} ${N(Math.abs(k),4)}(x - ${N(x,3)}) ${h>=0?"+":"-"} ${N(Math.abs(h),4)}(x - ${N(x,3)})^2 ${f>=0?"+":"-"} ${N(Math.abs(f),4)}(x - ${N(x,3)})^3`;n.push({i:l,x0:x,x1:m,y0:u,y1:b,h:p,a:g,b:k,c:h,d:f,M0:d[l],M1:d[l+1],formulaLatex:C,evaluate:E=>{const $=E-x;return g+k*$+h*Math.pow($,2)+f*Math.pow($,3)}})}return{method:"Splines Cúbicos Naturales",numIntervals:o,points:a,intervals:n,secondDerivatives:d,evaluate:l=>{if(l<=n[0].x0)return n[0].evaluate(l);if(l>=n[o-1].x1)return n[o-1].evaluate(l);for(let x=0;x<o;x++)if(l>=n[x].x0&&l<=n[x].x1)return n[x].evaluate(l);return n[o-1].evaluate(l)}}}function Ze(t,a=2){if(!Array.isArray(t)||t.length<a)throw new Error(`Se requieren al menos ${a} puntos para este modelo de regresión.`);for(let r=0;r<t.length;r++){const o=t[r];if(typeof o.x!="number"||typeof o.y!="number"||!Number.isFinite(o.x)||!Number.isFinite(o.y))throw new Error(`El punto en la fila ${r+1} contiene coordenadas no numéricas o inválidas.`)}return t}function it(t){const a=Ze(t,2),r=a.length;let o=0,i=0,s=0,d=0;for(let E=0;E<r;E++){const{x:$,y:T}=a[E];o+=$,i+=T,s+=$*T,d+=$*$}const n=r*d-o*o;if(Math.abs(n)<1e-14)throw new Error("No es posible ajustar una recta: todos los valores de x son idénticos.");const c=(r*s-o*i)/n,l=(i-c*o)/r,x=E=>c*E+l,m=i/r;let u=0,b=0;const p=[];for(let E=0;E<r;E++){const{x:$,y:T}=a[E],v=x($),O=T-v;u+=Math.pow(T-m,2),b+=Math.pow(O,2),p.push({x:$,y:T,yHat:v,residual:O})}const g=u>1e-14?Math.max(0,Math.min(1,1-b/u)):1,h=r>2?Math.sqrt(b/(r-2)):0,f=l>=0?"+":"-",k=`y = ${N(c,4)}x ${f} ${N(Math.abs(l),4)}`,C=`y = ${N(c,4)}x ${f} ${N(Math.abs(l),4)}`;return{type:"linear",name:"Regresión Lineal Simple",coefficients:{a0:l,a1:c},formula:k,formulaLatex:C,rSquared:g,standardError:h,ssRes:b,ssTot:u,residuals:p,evaluate:x}}function Ms(t,a=2){const r=Ze(t,a+1),o=r.length,i=parseInt(a,10);if(isNaN(i)||i<1)throw new Error("El grado del polinomio debe ser al menos 1.");if(i>=o)throw new Error(`El grado del polinomio (${i}) debe ser menor que el número de puntos (${o}).`);const s=i+1,d=Array.from({length:s},()=>new Array(s).fill(0)),n=new Array(s).fill(0),c=new Array(2*i+1).fill(0);for(let O=0;O<o;O++){const q=r[O].x;let j=1;for(let w=0;w<=2*i;w++)c[w]+=j,j*=q}for(let O=0;O<o;O++){const{x:q,y:j}=r[O];let w=1;for(let S=0;S<=i;S++)n[S]+=w*j,w*=q}for(let O=0;O<s;O++)for(let q=0;q<s;q++)d[O][q]=c[O+q];const{solution:l}=lt(d,n),x=l,m=O=>{let q=0,j=1;for(let w=0;w<=i;w++)q+=x[w]*j,j*=O;return q},b=r.reduce((O,q)=>O+q.y,0)/o;let p=0,g=0;const h=[];for(let O=0;O<o;O++){const{x:q,y:j}=r[O],w=m(q),S=j-w;p+=Math.pow(j-b,2),g+=Math.pow(S,2),h.push({x:q,y:j,yHat:w,residual:S})}const f=p>1e-14?Math.max(0,Math.min(1,1-g/p)):1,k=o-(i+1),C=k>0?Math.sqrt(g/k):0;let E=[],$=[];for(let O=i;O>=0;O--){const q=x[O];if(O===0){const j=q>=0&&E.length>0?"+ ":q<0?"- ":"";E.push(`${j}${N(Math.abs(q),4)}`),$.push(`${j}${N(Math.abs(q),4)}`)}else if(O===1){const j=q>=0&&E.length>0?"+ ":q<0?"- ":"";E.push(`${j}${N(Math.abs(q),4)}x`),$.push(`${j}${N(Math.abs(q),4)}x`)}else{const j=q>=0&&E.length>0?"+ ":q<0?"- ":"";E.push(`${j}${N(Math.abs(q),4)}x^${O}`),$.push(`${j}${N(Math.abs(q),4)}x^{${O}}`)}}const T=`y = ${E.join(" ")}`,v=`y = ${$.join(" ")}`;return{type:"polynomial",name:`Regresión Polinómica (Grado ${i})`,degree:i,coefficients:x,formula:T,formulaLatex:v,rSquared:f,standardError:C,ssRes:g,ssTot:p,residuals:h,evaluate:m}}function Es(t){const a=Ze(t,2),r=a.length;for(let f=0;f<r;f++)if(a[f].y<=0)throw new Error(`El punto (${a[f].x}, ${a[f].y}) tiene y ≤ 0. La regresión exponencial requiere que todos los valores de y sean estrictamente positivos.`);const o=a.map(f=>({x:f.x,y:Math.log(f.y)})),i=it(o),s=i.coefficients.a1,d=Math.exp(i.coefficients.a0),n=f=>d*Math.exp(s*f),l=a.reduce((f,k)=>f+k.y,0)/r;let x=0,m=0;const u=[];for(let f=0;f<r;f++){const{x:k,y:C}=a[f],E=n(k),$=C-E;x+=Math.pow(C-l,2),m+=Math.pow($,2),u.push({x:k,y:C,yHat:E,residual:$})}const b=x>1e-14?Math.max(0,Math.min(1,1-m/x)):1,p=r>2?Math.sqrt(m/(r-2)):0,g=`y = ${N(d,4)} * e^(${N(s,4)}x)`,h=`y = ${N(d,4)} \\cdot e^{${N(s,4)}x}`;return{type:"exponential",name:"Regresión Exponencial",coefficients:{a:d,b:s},formula:g,formulaLatex:h,rSquared:b,standardError:p,ssRes:m,ssTot:x,residuals:u,evaluate:n}}function Ss(t){const a=Ze(t,2),r=a.length;for(let f=0;f<r;f++)if(a[f].x<=0||a[f].y<=0)throw new Error(`El punto (${a[f].x}, ${a[f].y}) contiene valores ≤ 0. La regresión potencial requiere x > 0 e y > 0.`);const o=a.map(f=>({x:Math.log(f.x),y:Math.log(f.y)})),i=it(o),s=i.coefficients.a1,d=Math.exp(i.coefficients.a0),n=f=>d*Math.pow(f,s),l=a.reduce((f,k)=>f+k.y,0)/r;let x=0,m=0;const u=[];for(let f=0;f<r;f++){const{x:k,y:C}=a[f],E=n(k),$=C-E;x+=Math.pow(C-l,2),m+=Math.pow($,2),u.push({x:k,y:C,yHat:E,residual:$})}const b=x>1e-14?Math.max(0,Math.min(1,1-m/x)):1,p=r>2?Math.sqrt(m/(r-2)):0,g=`y = ${N(d,4)} * x^(${N(s,4)})`,h=`y = ${N(d,4)} \\cdot x^{${N(s,4)}}`;return{type:"power",name:"Regresión Potencial",coefficients:{a:d,b:s},formula:g,formulaLatex:h,rSquared:b,standardError:p,ssRes:m,ssTot:x,residuals:u,evaluate:n}}function Ps({precision:t=6}){const[a,r]=_.useState("interpolation"),[o,i]=_.useState("lagrange"),[s,d]=_.useState("linear"),[n,c]=_.useState("2"),[l,x]=_.useState([{x:-2,y:-3},{x:-1,y:2},{x:1,y:0},{x:2,y:5},{x:3,y:22}]),[m,u]=_.useState("1.5"),[b,p]=_.useState(!1),[g,h]=_.useState(null),[f,k]=_.useState(null),[C,E]=_.useState(!1),[$,T]=_.useState(""),[v,O]=_.useState(null),q=M=>{if(h(null),k(null),M==="runge"){const z=[-1,-.6,-.2,.2,.6,1].map(U=>({x:parseFloat(U.toFixed(2)),y:parseFloat((1/(1+25*U*U)).toFixed(4))}));x(z),u("0.0")}else M==="thermo"?(x([{x:0,y:1.0074},{x:20,y:.9988},{x:40,y:.998},{x:60,y:1.0001},{x:80,y:1.0037},{x:100,y:1.0084}]),u("50")):M==="kinematics"?(x([{x:0,y:0},{x:10,y:24.5},{x:20,y:39},{x:30,y:43.5},{x:40,y:38},{x:50,y:22.5},{x:60,y:0}]),u("25")):M==="regressionLinear"?(x([{x:1,y:2.1},{x:2,y:3.9},{x:3,y:6.2},{x:4,y:8},{x:5,y:10.1},{x:6,y:12.3}]),u("3.5")):M==="regressionExp"?(x([{x:0,y:1.1},{x:1,y:2.9},{x:2,y:8.1},{x:3,y:20.3},{x:4,y:54.8}]),u("2.5")):M==="simple3"&&(x([{x:1,y:2},{x:2,y:3},{x:4,y:7}]),u("3"))},j=(M,z,U)=>{const K=parseFloat(U),Q=[...l];Q[M]={...Q[M],[z]:Number.isNaN(K)?0:K},x(Q),k(null)},w=()=>{const M=l.length>0?l[l.length-1].x:0;x([...l,{x:M+1,y:0}]),k(null)},S=M=>{if(l.length<=2){h("Se requieren al menos 2 puntos para operar.");return}const z=l.filter((U,K)=>K!==M);x(z),k(null)},P=()=>{const M=[...l].sort((z,U)=>z.x-U.x);x(M),k(null)},R=()=>{try{O(null);const M=$.trim().split(/\r?\n/).map(U=>U.trim()).filter(U=>U.length>0);if(M.length<2)throw new Error("Debe proporcionar al menos 2 pares (x, y).");const z=M.map((U,K)=>{const Q=U.split(/[\t,;\s]+/).map(ne=>parseFloat(ne));if(Q.length<2||Number.isNaN(Q[0])||Number.isNaN(Q[1]))throw new Error(`Error en la fila ${K+1}: se requieren 2 valores numéricos (x e y).`);return{x:Q[0],y:Q[1]}});a==="interpolation"&&Qe(z,2),x(z),E(!1),T("")}catch(M){O(M.message||"Error importando datos.")}},L=_.useMemo(()=>{if(a==="interpolation"){const M=new Set;for(const z of l){if(M.has(z.x))return`Abscisa repetida x = ${z.x}. En interpolación todos los x deben ser distintos.`;M.add(z.x)}if(o==="spline"&&l.length<3)return"Los Splines Cúbicos requieren al menos 3 puntos."}else{if(s==="polynomial"){const M=parseInt(n,10);if(M>=l.length)return`El grado del polinomio (${M}) debe ser estrictamente menor que el número de puntos (${l.length}).`}if(s==="exponential"&&l.some(M=>M.y<=0))return"La regresión exponencial requiere que todos los valores de y sean estrictamente positivos (y > 0).";if(s==="power"&&l.some(M=>M.x<=0||M.y<=0))return"La regresión potencial requiere x > 0 e y > 0 en todos los puntos."}return null},[l,a,o,s,n]),G=M=>{M&&M.preventDefault(),h(null),k(null),p(!0),setTimeout(()=>{try{if(L)throw new Error(L);let z;a==="interpolation"?o==="lagrange"?z=$s(l):o==="newton"?z=_s(l):o==="spline"&&(z=Cs(l)):s==="linear"?z=it(l):s==="polynomial"?z=Ms(l,parseInt(n,10)||2):s==="exponential"?z=Es(l):s==="power"&&(z=Ss(l)),k(z)}catch(z){h(z.message||"Error realizando el cálculo.")}finally{p(!1)}},30)},X=_.useMemo(()=>{if(!f||!f.evaluate)return null;const M=parseFloat(m);if(Number.isNaN(M))return null;try{return f.evaluate(M)}catch{return null}},[f,m]),V=_.useMemo(()=>{if(!f||!f.evaluate)return[];const M=[...l].sort((I,B)=>I.x-B.x),z=M[0].x,U=M[M.length-1].x,K=U-z||1,Q=z-K*.08,ne=U+K*.08,y=200,F=[],D=[],H=(ne-Q)/(y-1);for(let I=0;I<y;I++){const B=Q+I*H;try{const oe=f.evaluate(B);Number.isFinite(oe)&&(F.push(B),D.push(oe))}catch{}}const W=[{x:F,y:D,type:"scatter",mode:"lines",name:a==="regression"?`Modelo (${f.name})`:`${f.method}`,line:{color:a==="regression"?"#818cf8":"#14b8a6",width:2.5}},{x:M.map(I=>I.x),y:M.map(I=>I.y),type:"scatter",mode:"markers",name:a==="regression"?"Datos Observados":`Nodos (${M.length})`,marker:{color:a==="regression"?"#f43f5e":"#38bdf8",size:8,symbol:a==="regression"?"diamond":"circle",line:{color:"#0f172a",width:1.5}}}];if(X!==null){const I=parseFloat(m);W.push({x:[I],y:[X],type:"scatter",mode:"markers+text",name:`Evaluado (${I}, ${N(X,3)})`,text:[`P(${I}) ≈ ${N(X,t)}`],textposition:"top right",marker:{color:"#f59e0b",size:11,symbol:"star",line:{color:"#0f172a",width:1.5}}})}return W},[f,l,X,m,t,a]),ee=_.useMemo(()=>{if(!f)return null;const M=a==="regression",z={lagrange:"Polinomio Interpolador de Lagrange",newton:"Polinomio de Newton (Diferencias Divididas)",spline:"Splines Cúbicos Naturales (C^2)",linear:"Regresión Lineal Simple (Mínimos Cuadrados)",polynomial:`Regresión Polinomial (Grado ${n})`,exponential:"Regresión Exponencial y = a*e^(bx)",power:"Regresión Potencial y = a*x^b"},U={lagrange:"P_n(x) = \\sum_{i=0}^n y_i L_i(x), \\quad L_i(x) = \\prod_{j \\neq i} \\frac{x - x_j}{x_i - x_j}",newton:"P_n(x) = f[x_0] + \\sum_{k=1}^n f[x_0,\\dots,x_k] \\prod_{j=0}^{k-1}(x - x_j)",spline:"S_i(x) = a_i + b_i(x - x_i) + c_i(x - x_i)^2 + d_i(x - x_i)^3, \\quad S''(x_0)=S''(x_n)=0",linear:"y = a_1 x + a_0, \\quad a_1 = \\frac{n\\sum x y - \\sum x \\sum y}{n\\sum x^2 - (\\sum x)^2}",polynomial:"\\mathbf{X}^T \\mathbf{X} \\mathbf{a} = \\mathbf{X}^T \\mathbf{y}",exponential:"\\ln(y) = \\ln(a) + b x",power:"\\ln(y) = \\ln(a) + b \\ln(x)"},K=M?s:o,Q=M?f.name:z[o]||o,ne=M?f.formulaLatex||"y = f(x)":f.polynomialLatex?`P(x) = ${f.polynomialLatex}`:"P(x) \\text{ interpolador}",y=[];if(V&&V[0]&&V[0].x)for(let B=0;B<V[0].x.length;B+=2)V[0].y[B]!==null&&y.push({x:V[0].x[B],y:V[0].y[B]});const F=l.map(B=>({x:B.x,y:B.y}));let D=[],H=[];M&&f.table?(D=[{key:"i",label:"i"},{key:"x",label:"x_i"},{key:"y",label:"y_i (Observado)"},{key:"y_pred",label:"y_pred (Modelo)"},{key:"residual",label:"Residuo e_i"}],H=f.table.map((B,oe)=>({i:oe+1,x:B.x,y:B.y,y_pred:N(B.y_pred,t),residual:N(B.residual,t)}))):(D=[{key:"i",label:"Nodo i"},{key:"x",label:"x_i"},{key:"y",label:"y_i = f(x_i)"}],H=l.map((B,oe)=>({i:oe,x:B.x,y:B.y})));const W=parseFloat(m),I=!Number.isNaN(W)&&X!==null?{x:W,y:X,label:`x*=${W}`}:null;return{moduleId:"interpolation",moduleTitle:M?"Ajuste de Curvas & Regresión":"Interpolación Numérica & Splines",category:a,methodId:K,methodName:Q,problemStatement:M?`Ajuste óptimo del modelo por el método de mínimos cuadrados para ${l.length} puntos observados.`:`Construcción del modelo interpolador exacto que interseca los ${l.length} nodos especificados.`,mathFormulationLatex:ne,methodFormulaLatex:U[K]||"",parameters:[{label:"Total de Puntos",value:`${l.length} nodos`},{label:"Método / Modelo",value:Q},...M?[{label:"Coeficiente R²",value:f.r2?N(f.r2,4):"---"}]:[],...m?[{label:"Punto Evaluado x*",value:m}]:[],{label:"Precisión Decimal",value:`${t} decimales`}],rawInputs:{points:l,evalX:parseFloat(m)||0,polyDegree:parseInt(n,10)||2},resultSummary:{converged:!0,mainResultLabel:X!==null?`Evaluación en x* = ${m}`:"Modelo Calculado",mainResultValue:X!==null?`f(${m}) ≈ ${N(X,t)}`:f.equationText||"Modelo listo",iterationsCount:l.length,finalError:f.r2?`R² = ${N(f.r2,4)}`:f.sr?`Sr = ${N(f.sr,4)}`:"---",message:M?`Bondad de ajuste R² = ${N(f.r2,4)}.`:"Polinomio interpolador calculado con éxito."},tableColumns:D,tableData:H,plotPoints:{curve:y,markers:F,root:I,xLabel:"x",yLabel:"y"}}},[f,a,o,s,n,l,m,X,t,V]);return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex border-b border-slate-700/60 pb-3 gap-3",children:[e.jsxs("button",{type:"button",onClick:()=>{r("interpolation"),h(null),k(null)},className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${a==="interpolation"?"bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:[e.jsx(qe,{className:"w-4 h-4"}),e.jsx("span",{children:"Interpolación Exacta"})]}),e.jsxs("button",{type:"button",onClick:()=>{r("regression"),h(null),k(null)},className:`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${a==="regression"?"bg-indigo-500 text-white shadow-lg shadow-indigo-500/20":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:[e.jsx($t,{className:"w-4 h-4"}),e.jsx("span",{children:"Ajuste de Curvas / Regresión (Mínimos Cuadrados)"})]})]}),a==="interpolation"?e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm",children:[{id:"lagrange",label:"Polinomios de Lagrange"},{id:"newton",label:"Diferencias Divididas de Newton"},{id:"spline",label:"Splines Cúbicos Naturales"}].map(M=>e.jsx("button",{onClick:()=>{i(M.id),h(null),k(null)},className:`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${o===M.id?"bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:M.label},M.id))}):e.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-700/60 backdrop-blur-sm",children:[{id:"linear",label:"Lineal Simple (y = ax + b)"},{id:"polynomial",label:"Polinómica (Grado m)"},{id:"exponential",label:"Exponencial (y = a·eᵇˣ)"},{id:"power",label:"Potencial (y = a·xᵇ)"}].map(M=>e.jsx("button",{onClick:()=>{d(M.id),h(null),k(null)},className:`py-2 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all text-center ${s===M.id?"bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/25":"text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}`,children:M.label},M.id))}),e.jsxs("div",{className:"bg-slate-800/70 p-5 sm:p-6 rounded-2xl border border-slate-700/70 shadow-xl backdrop-blur-sm space-y-5",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(qe,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{className:"text-sm font-semibold text-slate-200",children:a==="regression"?"Datos Experimentales (x_i, y_i):":"Nodos a Interpolar (x_i, y_i):"})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 text-xs",children:[e.jsxs("span",{className:"text-slate-400 mr-1 flex items-center gap-1",children:[e.jsx(_e,{className:"w-3.5 h-3.5 text-teal-400"}),"Presets:"]}),a==="interpolation"?e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>q("runge"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors",children:"Fenómeno Runge"}),e.jsx("button",{type:"button",onClick:()=>q("thermo"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors",children:"Termodinámica"}),e.jsx("button",{type:"button",onClick:()=>q("kinematics"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors",children:"Cinemática"})]}):e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",onClick:()=>q("regressionLinear"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-700/60 transition-colors",children:"Lineal (Dispersión)"}),e.jsx("button",{type:"button",onClick:()=>q("kinematics"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-700/60 transition-colors",children:"Parabólica"}),e.jsx("button",{type:"button",onClick:()=>q("regressionExp"),className:"px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-700/60 transition-colors",children:"Exponencial"})]}),e.jsxs("button",{type:"button",onClick:()=>E(!0),className:"px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-700/50 flex items-center gap-1 transition-colors",children:[e.jsx(ze,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Pegar / CSV"})]})]})]}),L&&e.jsxs("div",{className:"p-3 rounded-xl bg-amber-950/40 border border-amber-700/60 text-amber-300 text-xs flex items-center gap-2",children:[e.jsx(ot,{className:"w-4 h-4 shrink-0"}),e.jsx("span",{children:L})]}),e.jsxs("div",{className:"max-h-72 overflow-y-auto border border-slate-700/50 rounded-xl bg-slate-900/40 p-2",children:[e.jsxs("div",{className:"grid grid-cols-12 gap-2 text-xs font-semibold text-slate-400 mb-2 px-2",children:[e.jsx("span",{className:"col-span-1 text-center",children:"i"}),e.jsx("span",{className:"col-span-5 text-teal-400",children:"Abscisa (x_i)"}),e.jsx("span",{className:"col-span-5 text-indigo-400",children:"Ordenada (y_i)"}),e.jsx("span",{className:"col-span-1 text-center",children:"Acción"})]}),e.jsx("div",{className:"space-y-1.5",children:l.map((M,z)=>e.jsxs("div",{className:"grid grid-cols-12 gap-2 items-center bg-slate-800/50 hover:bg-slate-800 p-1.5 rounded-lg border border-slate-700/40",children:[e.jsx("span",{className:"col-span-1 text-center font-mono text-xs text-slate-500",children:z+1}),e.jsx("div",{className:"col-span-5",children:e.jsx("input",{type:"number",step:"any",value:M.x,onChange:U=>j(z,"x",U.target.value),className:"w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-xs focus:border-teal-400 focus:outline-none",placeholder:"x"})}),e.jsx("div",{className:"col-span-5",children:e.jsx("input",{type:"number",step:"any",value:M.y,onChange:U=>j(z,"y",U.target.value),className:"w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-xs focus:border-indigo-400 focus:outline-none",placeholder:"y"})}),e.jsx("div",{className:"col-span-1 flex justify-center",children:e.jsx("button",{type:"button",onClick:()=>S(z),title:"Eliminar punto",className:"p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors",children:e.jsx(Qt,{className:"w-4 h-4"})})})]},z))})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 pt-1",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("button",{type:"button",onClick:w,className:"px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer",children:[e.jsx(Zt,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Agregar Punto"})]}),e.jsxs("button",{type:"button",onClick:P,className:"px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors",title:"Ordenar ascendentemente por coordenada x",children:[e.jsx(ea,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Ordenar por X"})]})]}),e.jsxs("div",{className:"text-xs text-slate-400",children:["Total de datos: ",e.jsx("strong",{className:"text-teal-300",children:l.length})]})]}),a==="regression"&&s==="polynomial"&&e.jsxs("div",{className:"p-4 bg-slate-900/60 rounded-xl border border-indigo-700/40 flex items-center gap-4",children:[e.jsx("label",{htmlFor:"reg-poly-deg",className:"text-xs font-semibold text-indigo-300 whitespace-nowrap",children:"Grado del Polinomio (m):"}),e.jsx("input",{id:"reg-poly-deg",type:"number",min:"1",max:Math.max(1,l.length-1),value:n,onChange:M=>c(M.target.value),className:"w-24 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 font-mono text-xs focus:border-indigo-400 focus:outline-none"}),e.jsxs("span",{className:"text-[11px] text-slate-400",children:["(Debe ser menor a ",l.length,")"]})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 items-center",children:[e.jsxs("div",{children:[e.jsxs("label",{htmlFor:"interp-eval-x",className:"block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5",children:[e.jsx(ta,{className:"w-3.5 h-3.5 text-amber-400"}),e.jsx("span",{children:"Evaluar Modelo en x*:"})]}),e.jsx("input",{id:"interp-eval-x",type:"number",step:"any",value:m,onChange:M=>u(M.target.value),className:"w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm font-mono focus:border-amber-400 focus:outline-none",placeholder:"Ej: 1.5"})]}),e.jsxs("div",{className:"p-3 bg-slate-950/60 rounded-xl border border-slate-800",children:[e.jsx("span",{className:"text-[11px] text-slate-400 block",children:"Predicción f(x*):"}),e.jsx("div",{className:"text-lg font-bold font-mono text-amber-300",children:X!==null?`f(${m}) ≈ ${N(X,t)}`:"—"})]})]}),e.jsxs("button",{type:"button",onClick:G,disabled:b||!!L,className:`w-full sm:w-auto px-6 py-2.5 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer ${a==="regression"?"bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-indigo-500/20":"bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-teal-500/20"}`,children:[b?e.jsx("span",{className:"inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"}):e.jsx(Fe,{className:"w-4 h-4 fill-current"}),e.jsx("span",{children:b?"Calculando...":a==="regression"?"Ajustar Curva (Mínimos Cuadrados)":"Calcular Interpolación"})]})]}),g&&e.jsx(Se,{type:"error",title:"Error en Cálculo",message:g,onClose:()=>h(null)}),f&&e.jsxs("div",{className:"space-y-6",children:[e.jsx(Ie,{exportData:ee}),a==="regression"?e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-5 rounded-2xl border bg-indigo-950/25 border-indigo-600/50 shadow-xl backdrop-blur-sm space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3",children:[e.jsxs("span",{className:"text-xs uppercase font-bold tracking-wider text-indigo-400",children:["Ajuste de Modelo • ",f.name]}),e.jsxs("span",{className:"text-xs font-mono text-slate-400",children:[l.length," Datos Experimentales"]})]}),e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-indigo-700/40 text-center overflow-x-auto",children:[e.jsx("div",{className:"text-xs text-slate-400 mb-1 font-sans",children:"Ecuación del Modelo Ajustado:"}),e.jsx("div",{className:"text-lg font-mono text-indigo-200",children:e.jsx(xe,{expression:f.formulaLatex,displayMode:!0})})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-3",children:[e.jsxs("div",{className:"p-3 bg-slate-900/80 rounded-xl border border-indigo-700/40 text-center",children:[e.jsx("span",{className:"text-[11px] text-slate-400 block font-sans",children:"Coef. R²"}),e.jsx("span",{className:"text-base sm:text-lg font-bold font-mono text-indigo-300",children:N(f.rSquared,4)}),e.jsxs("span",{className:"text-[10px] text-slate-500 block",children:["(",(f.rSquared*100).toFixed(1),"% explicada)"]})]}),e.jsxs("div",{className:"p-3 bg-slate-900/80 rounded-xl border border-indigo-700/40 text-center",children:[e.jsx("span",{className:"text-[11px] text-slate-400 block font-sans",children:"Error Estándar (S_y/x)"}),e.jsx("span",{className:"text-base sm:text-lg font-bold font-mono text-emerald-300",children:N(f.standardError,t)})]}),e.jsxs("div",{className:"p-3 bg-slate-900/80 rounded-xl border border-indigo-700/40 text-center",children:[e.jsx("span",{className:"text-[11px] text-slate-400 block font-sans",children:"SS Residual (SS_res)"}),e.jsx("span",{className:"text-base sm:text-lg font-bold font-mono text-amber-300",children:N(f.ssRes,4)})]}),e.jsxs("div",{className:"p-3 bg-slate-900/80 rounded-xl border border-indigo-700/40 text-center",children:[e.jsx("span",{className:"text-[11px] text-slate-400 block font-sans",children:"SS Total (SS_tot)"}),e.jsx("span",{className:"text-base sm:text-lg font-bold font-mono text-slate-200",children:N(f.ssTot,4)})]})]})]}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Ajuste Visual del Modelo y Dispersión:"}),e.jsxs("span",{className:"text-xs font-mono text-indigo-400",children:["R² = ",N(f.rSquared,4)]})]}),e.jsx(ke,{data:V,layout:{title:{text:`Regresión por Mínimos Cuadrados • ${f.name}`,font:{color:"#e2e8f0",size:14}},xaxis:{title:{text:"x"}},yaxis:{title:{text:"y"}}}})]}),f.residuals&&e.jsx(Le,{title:"Análisis de Residuales (y_i - ŷ_i)",columns:[{key:"x",label:"x_i"},{key:"y",label:"y Observado"},{key:"yHat",label:"ŷ Estimado",render:M=>N(M,t)},{key:"residual",label:"Residual e_i",render:M=>N(M,t)},{key:"sqResidual",label:"e_i²",render:(M,z)=>N(Math.pow(z.residual,2),t)}],data:f.residuals,precision:t,filename:"residuales_regresion"})]}):e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"p-5 rounded-2xl border bg-emerald-950/25 border-emerald-600/50 shadow-xl backdrop-blur-sm space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("span",{className:"text-xs uppercase font-bold tracking-wider text-emerald-400",children:["Resultado • ",f.method]}),e.jsx("span",{className:"text-xs font-mono text-slate-400",children:f.degree!==void 0?`Polinomio de Grado n = ${f.degree}`:`${f.numIntervals} Tramos Cúbicos`})]}),f.expandedLatex&&e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-emerald-700/40 text-center overflow-x-auto",children:[e.jsx("div",{className:"text-xs text-slate-400 mb-1 font-sans",children:"Forma Canónica Expandida:"}),e.jsx(xe,{expression:f.expandedLatex,displayMode:!0})]}),f.intervals&&e.jsx("div",{className:"text-xs text-slate-300",children:"Ajuste cúbico continuo de clase $C^2$ con segundas derivadas continuas y extremos naturales ($S''(x_0) = S''(x_n) = 0$)."})]}),e.jsxs("div",{className:"bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/70 shadow-lg",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2",children:[e.jsx("span",{children:"Curva Interpolada y Nodos:"}),e.jsx("span",{className:"text-xs font-mono text-teal-400",children:f.method})]}),e.jsx(ke,{data:V,layout:{title:{text:`Interpolación mediante ${f.method}`,font:{color:"#e2e8f0",size:14}},xaxis:{title:{text:"x"}},yaxis:{title:{text:"y(x)"}}}})]}),f.basis&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(De,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Polinomio de Lagrange Completo y Términos Base:"})]}),e.jsx("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-x-auto text-center",children:e.jsx(xe,{expression:f.latex,displayMode:!0})}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:f.basis.map((M,z)=>e.jsxs("div",{className:"p-3 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs font-mono",children:[e.jsxs("div",{className:"text-teal-400 font-bold mb-1",children:["L_",z,"(x) en x_",z," = ",M.xi,":"]}),e.jsxs("div",{className:"text-slate-400 mb-1",children:["Denominador: ",N(M.denominator,4)," | Peso y_i / den: ",N(M.weight,4)]}),e.jsxs("div",{className:"text-slate-300",children:["Factores: ",M.factors.map(U=>U.text).join("")]})]},z))})]}),f.table&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(De,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Tabla de Diferencias Divididas de Newton:"})]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs font-mono border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"border-b border-slate-700 text-slate-400 bg-slate-900/80",children:[e.jsx("th",{className:"p-2 text-center",children:"i"}),e.jsx("th",{className:"p-2 text-center text-teal-400",children:"x_i"}),e.jsx("th",{className:"p-2 text-center text-indigo-400",children:"f[x_i]"}),Array.from({length:f.points.length-1}).map((M,z)=>e.jsx("th",{className:"p-2 text-center text-emerald-400",children:z===0?"1ra Dif.":`${z+1}a Dif.`},z))]})}),e.jsx("tbody",{children:f.points.map((M,z)=>e.jsxs("tr",{className:"border-b border-slate-800/60 hover:bg-slate-900/40",children:[e.jsx("td",{className:"p-2 text-center text-slate-500",children:z}),e.jsx("td",{className:"p-2 text-center font-bold text-slate-200",children:M.x}),e.jsx("td",{className:"p-2 text-center text-teal-300 font-semibold",children:N(f.table[z][0],t)}),Array.from({length:f.points.length-1}).map((U,K)=>{const Q=f.table[z][K+1],ne=z===0;return e.jsx("td",{className:`p-2 text-center ${ne?"bg-teal-950/30 text-teal-200 font-bold border-l border-r border-teal-800/50":"text-slate-400"}`,children:Q!=null?N(Q,t):"—"},K)})]},z))})]})}),e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 overflow-x-auto text-center",children:[e.jsx("div",{className:"text-xs text-slate-400 mb-1 font-sans",children:"Fórmula Polinómica en Forma de Newton:"}),e.jsx(xe,{expression:f.latex,displayMode:!0})]})]}),f.intervals&&e.jsxs("div",{className:"bg-slate-800/60 p-5 rounded-2xl border border-slate-700/70 shadow-lg space-y-4",children:[e.jsxs("h4",{className:"text-sm font-semibold text-slate-200 flex items-center gap-2",children:[e.jsx(De,{className:"w-4 h-4 text-teal-400"}),e.jsx("span",{children:"Ecuaciones de Cada Tramo Cúbico S_i(x):"})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:f.intervals.map((M,z)=>e.jsxs("div",{className:"p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between text-xs",children:[e.jsxs("span",{className:"font-bold text-teal-300 font-mono",children:["Tramo ",z+1,": x ∈ [",M.x0,", ",M.x1,"]"]}),e.jsxs("span",{className:"text-slate-400 font-mono",children:["h_",z," = ",M.h]})]}),e.jsx("div",{className:"overflow-x-auto py-1 text-center bg-slate-950/60 rounded-lg p-2",children:e.jsx(xe,{expression:M.formulaLatex,displayMode:!1})}),e.jsxs("div",{className:"grid grid-cols-4 gap-1 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800",children:[e.jsxs("div",{children:["a: ",N(M.a,3)]}),e.jsxs("div",{children:["b: ",N(M.b,3)]}),e.jsxs("div",{children:["c: ",N(M.c,3)]}),e.jsxs("div",{children:["d: ",N(M.d,3)]})]})]},z))}),e.jsxs("div",{className:"p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs",children:[e.jsx("span",{className:"font-semibold text-slate-300 block mb-1",children:"Segundas Derivadas en Nodos (M_i = S''(x_i)):"}),e.jsx("div",{className:"flex flex-wrap gap-2 font-mono",children:f.secondDerivatives.map((M,z)=>e.jsxs("span",{className:"px-2 py-0.5 rounded bg-slate-800 text-teal-300 border border-slate-700",children:["M_",z,": ",N(M,4)]},z))})]})]})]})]}),C&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm",children:e.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-200",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-slate-800 pb-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-teal-400 font-bold text-base",children:[e.jsx(ze,{className:"w-5 h-5"}),e.jsx("span",{children:"Pegar Puntos (x, y)"})]}),e.jsx("button",{type:"button",onClick:()=>E(!1),className:"text-slate-400 hover:text-white text-sm px-2 py-1",children:"✕"})]}),e.jsx("p",{className:"text-xs text-slate-300",children:"Pega pares de valores numéricos separados por comas, espacios o tabulaciones (una línea por punto)."}),e.jsx("textarea",{rows:8,value:$,onChange:M=>T(M.target.value),placeholder:`-2  -3
-1   2
 1   0
 2   5
 3  22`,className:"w-full p-3 bg-slate-950 border border-slate-700 rounded-xl font-mono text-xs text-teal-200 focus:border-teal-400 focus:outline-none"}),v&&e.jsx("div",{className:"p-3 rounded-lg bg-rose-950/40 border border-rose-700 text-rose-300 text-xs",children:v}),e.jsxs("div",{className:"flex justify-end gap-3 pt-2",children:[e.jsx("button",{type:"button",onClick:()=>E(!1),className:"px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs",children:"Cancelar"}),e.jsx("button",{type:"button",onClick:R,className:"px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20",children:"Cargar Puntos"})]})]})})]})}function Fs(){const[t,a]=_.useState("nonlinear"),[r,o]=_.useState(6),[i,s]=_.useState(!1),[d,n]=_.useState(!1),c=[{id:"nonlinear",title:"Ecuaciones No Lineales",subtitle:"Búsqueda de Raíces",icon:e.jsx(oa,{className:"w-5 h-5 text-cyan-400"}),badge:"Módulo 1"},{id:"linear",title:"Sistemas Lineales",subtitle:"Matrices & Álgebra",icon:e.jsx(qe,{className:"w-5 h-5 text-indigo-400"}),badge:"Módulo 2"},{id:"calculus",title:"Cálculo Numérico",subtitle:"Integración & Diferenciación",icon:e.jsx(kt,{className:"w-5 h-5 text-teal-400"}),badge:"Módulo 3"},{id:"ode",title:"Ecuaciones Diferenciales",subtitle:"Problemas de Valor Inicial (EDO)",icon:e.jsx($t,{className:"w-5 h-5 text-emerald-400"}),badge:"Módulo 4"},{id:"interpolation",title:"Interpolación & Ajuste",subtitle:"Lagrange, Newton & Splines",icon:e.jsx(na,{className:"w-5 h-5 text-amber-400"}),badge:"Módulo 5"}];return e.jsxs("div",{className:"min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-sans",children:[e.jsx("header",{className:"sticky top-0 z-30 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 shadow-lg",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("button",{onClick:()=>s(!i),className:"md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white","aria-label":"Abrir menú",children:i?e.jsx(Oe,{className:"w-5 h-5"}):e.jsx(aa,{className:"w-5 h-5"})}),e.jsx("div",{className:"w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20",children:e.jsx(sa,{className:"w-6 h-6 text-slate-950 stroke-[2.5]"})}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-slate-100 via-teal-200 to-emerald-300 bg-clip-text text-transparent",children:"NumCalc Pro"}),e.jsx("span",{className:"hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider font-semibold rounded-full bg-teal-950 text-teal-300 border border-teal-800",children:"Client-Side Engine"})]}),e.jsx("p",{className:"text-[11px] text-slate-400 hidden sm:block",children:"Calculadora Científica de Métodos Numéricos"})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700",children:[e.jsx(ra,{className:"w-3.5 h-3.5 text-slate-400"}),e.jsx("label",{htmlFor:"precision-selector",className:"text-xs text-slate-300 font-medium hidden sm:inline",children:"Precisión:"}),e.jsx("select",{id:"precision-selector",value:r,onChange:l=>o(Number(l.target.value)),className:"bg-slate-900 border border-slate-700 text-teal-300 text-xs font-mono rounded-lg px-2 py-1 focus:outline-none focus:border-teal-400",children:[2,3,4,5,6,7,8,9,10].map(l=>e.jsxs("option",{value:l,children:[l," dec"]},l))})]}),e.jsxs("button",{onClick:()=>n(!0),className:"flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-medium",children:[e.jsx(ct,{className:"w-3.5 h-3.5 text-teal-400"}),e.jsx("span",{className:"hidden sm:inline",children:"Manual y Métodos"})]})]})]})}),e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6",children:[e.jsxs("aside",{className:"hidden md:block w-72 shrink-0 space-y-2",children:[e.jsx("div",{className:"text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2",children:"Módulos de Análisis"}),c.map(l=>e.jsxs("button",{onClick:()=>a(l.id),className:`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 group ${t===l.id?"bg-gradient-to-r from-slate-800 to-slate-800/90 border-teal-500/60 shadow-lg shadow-teal-500/10":"bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 text-slate-400"}`,children:[e.jsx("div",{className:`p-2.5 rounded-xl transition-colors ${t===l.id?"bg-teal-500/10 text-teal-400":"bg-slate-800/80 text-slate-400 group-hover:text-slate-200"}`,children:l.icon}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:`font-semibold text-sm ${t===l.id?"text-slate-100":"text-slate-300"}`,children:l.title}),e.jsx("span",{className:"text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700/80",children:l.badge})]}),e.jsx("div",{className:"text-xs text-slate-400 mt-0.5",children:l.subtitle})]})]},l.id)),e.jsxs("div",{className:"mt-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-1.5 text-teal-400 font-semibold",children:[e.jsx(wt,{className:"w-3.5 h-3.5"}),e.jsx("span",{children:"Arquitectura Técnica"})]}),e.jsxs("p",{className:"leading-relaxed text-[11px]",children:["Motor matemático 100% en cliente con ",e.jsx("strong",{className:"text-slate-300",children:"mathjs AST"})," sin eval(), renderizado ",e.jsx("strong",{className:"text-slate-300",children:"KaTeX"})," y visualización científica con ",e.jsx("strong",{className:"text-slate-300",children:"Plotly.js"}),"."]})]})]}),i&&e.jsx("div",{className:"md:hidden grid grid-cols-2 gap-2 mb-4",children:c.map(l=>e.jsxs("button",{onClick:()=>{a(l.id),s(!1)},className:`p-3 rounded-xl border text-left flex flex-col gap-2 ${t===l.id?"bg-slate-800 border-teal-500/60 text-slate-100":"bg-slate-900/60 border-slate-800 text-slate-400"}`,children:[e.jsxs("div",{className:"flex items-center justify-between",children:[l.icon,e.jsx("span",{className:"text-[10px] font-mono text-teal-400",children:l.badge})]}),e.jsx("div",{className:"font-semibold text-xs text-slate-200",children:l.title})]},l.id))}),e.jsxs("main",{className:"flex-1 min-w-0",children:[t==="nonlinear"&&e.jsx(Ga,{precision:r}),t==="linear"&&e.jsx(is,{precision:r}),t==="calculus"&&e.jsx(bs,{precision:r}),t==="ode"&&e.jsx(ks,{precision:r}),t==="interpolation"&&e.jsx(Ps,{precision:r})]})]}),d&&e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm",children:e.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl space-y-4 text-slate-200",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-slate-800 pb-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-teal-400 font-bold text-lg",children:[e.jsx(ct,{className:"w-5 h-5"}),e.jsx("span",{children:"Manual de Métodos Numéricos y Casos Límite"})]}),e.jsx("button",{onClick:()=>n(!1),className:"text-slate-400 hover:text-white p-1 rounded-lg",children:e.jsx(Oe,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed",children:[e.jsxs("div",{children:[e.jsx("h5",{className:"font-bold text-teal-300",children:"1. Ecuaciones No Lineales"}),e.jsxs("p",{children:["Incluye Bisección, Regula Falsi, Newton-Raphson y Secante. Implementa validación del ",e.jsx("strong",{children:"Teorema de Bolzano"})," (si f(a)·f(b) > 0 se rechaza antes de iterar), detección estricta de ",e.jsx("strong",{children:"división entre cero"})," por derivada horizontal f'(x) = 0 o pendiente secante nula, y advertencia visible tras 100 iteraciones si no se alcanza la tolerancia especificada."]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-bold text-indigo-300",children:"2. Sistemas de Ecuaciones Lineales"}),e.jsxs("p",{children:["Eliminación Gaussiana con ",e.jsx("strong",{children:"pivoteo parcial obligatorio"}),", Gauss-Jordan, y métodos iterativos de Jacobi y Gauss-Seidel. Soporta matrices desde ",e.jsx("strong",{children:"2×2 hasta 50×50"})," procesadas asíncronamente mediante ",e.jsx("strong",{children:"Web Worker"})," en hilo secundario. Detecta automáticamente ",e.jsx("strong",{children:"matrices singulares o mal condicionadas"})," (|pivote| < 10⁻¹²) e incluye verificador de ",e.jsx("strong",{children:"diagonal dominante"}),"."]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-bold text-teal-300",children:"3. Diferenciación e Integración"}),e.jsxs("p",{children:["Reglas del Trapecio (simple y compuesto) y Simpson 1/3 y 3/8. Incorpora ",e.jsx("strong",{children:"ajuste automático de subintervalos"})," para garantizar paridad en Simpson 1/3 y múltiplos de 3 en Simpson 3/8, con notificación al usuario. Protege contra ",e.jsx("strong",{children:"fuera de dominio"})," (log de x ≤ 0, divisiones por cero) indicando con precisión qué subintervalo falló."]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-bold text-emerald-300",children:"4. Ecuaciones Diferenciales Ordinarias (EDO)"}),e.jsxs("p",{children:["Métodos de Euler, Heun (Euler modificado) y Runge-Kutta 4° Orden (RK4) para dy/dx = f(x, y). Modo comparativo simultáneo que grafica y contrasta las tres trayectorias sobre el mismo problema de valor inicial. Soporta además ",e.jsx("strong",{children:"Sistemas Acoplados"})," y ",e.jsx("strong",{children:"EDOs de 2° Orden"})," con retrato de fases."]})]}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-bold text-amber-300",children:"5. Interpolación y Ajuste de Curvas"}),e.jsx("p",{children:"Polinomios de Lagrange (bases $L_i(x)$ y forma canónica expandida), Diferencias Divididas de Newton (tabla piramidal y esquema de Horner), y Splines Cúbicos Naturales con resolución tridiagonal de Thomas para segundas derivadas continuas $C^2$ y $S''(x_0) = S''(x_n) = 0$."})]})]}),e.jsx("div",{className:"pt-3 border-t border-slate-800 flex justify-end",children:e.jsx("button",{onClick:()=>n(!1),className:"px-4 py-2 bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold rounded-xl text-xs sm:text-sm",children:"Entendido"})})]})}),e.jsx("footer",{className:"border-t border-slate-800/80 bg-slate-950/60 py-4 text-center text-xs text-slate-500",children:e.jsx("p",{children:"Calculadora Científica de Métodos Numéricos • 100% Client-Side Single Page Application"})})]})}at.createRoot(document.getElementById("root")).render(e.jsx(vt.StrictMode,{children:e.jsx(Fs,{})}));
