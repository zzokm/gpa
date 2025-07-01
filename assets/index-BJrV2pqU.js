var x_=Object.defineProperty;var S_=(t,e,n)=>e in t?x_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Wo=(t,e,n)=>S_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function Al(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var om={exports:{}},bl={},am={exports:{}},ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Do=Symbol.for("react.element"),M_=Symbol.for("react.portal"),E_=Symbol.for("react.fragment"),T_=Symbol.for("react.strict_mode"),w_=Symbol.for("react.profiler"),C_=Symbol.for("react.provider"),A_=Symbol.for("react.context"),b_=Symbol.for("react.forward_ref"),R_=Symbol.for("react.suspense"),P_=Symbol.for("react.memo"),I_=Symbol.for("react.lazy"),Kf=Symbol.iterator;function D_(t){return t===null||typeof t!="object"?null:(t=Kf&&t[Kf]||t["@@iterator"],typeof t=="function"?t:null)}var lm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},cm=Object.assign,um={};function Is(t,e,n){this.props=t,this.context=e,this.refs=um,this.updater=n||lm}Is.prototype.isReactComponent={};Is.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Is.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function dm(){}dm.prototype=Is.prototype;function Nd(t,e,n){this.props=t,this.context=e,this.refs=um,this.updater=n||lm}var Ud=Nd.prototype=new dm;Ud.constructor=Nd;cm(Ud,Is.prototype);Ud.isPureReactComponent=!0;var Zf=Array.isArray,fm=Object.prototype.hasOwnProperty,Fd={current:null},hm={key:!0,ref:!0,__self:!0,__source:!0};function pm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)fm.call(e,i)&&!hm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Do,type:t,key:s,ref:o,props:r,_owner:Fd.current}}function L_(t,e){return{$$typeof:Do,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Od(t){return typeof t=="object"&&t!==null&&t.$$typeof===Do}function N_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Qf=/\/+/g;function Ql(t,e){return typeof t=="object"&&t!==null&&t.key!=null?N_(""+t.key):e.toString(36)}function Pa(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Do:case M_:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Ql(o,0):i,Zf(r)?(n="",t!=null&&(n=t.replace(Qf,"$&/")+"/"),Pa(r,e,n,"",function(c){return c})):r!=null&&(Od(r)&&(r=L_(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Qf,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Zf(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Ql(s,a);o+=Pa(s,e,n,l,r)}else if(l=D_(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Ql(s,a++),o+=Pa(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function jo(t,e,n){if(t==null)return t;var i=[],r=0;return Pa(t,i,"","",function(s){return e.call(n,s,r++)}),i}function U_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var qt={current:null},Ia={transition:null},F_={ReactCurrentDispatcher:qt,ReactCurrentBatchConfig:Ia,ReactCurrentOwner:Fd};function mm(){throw Error("act(...) is not supported in production builds of React.")}ke.Children={map:jo,forEach:function(t,e,n){jo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return jo(t,function(){e++}),e},toArray:function(t){return jo(t,function(e){return e})||[]},only:function(t){if(!Od(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ke.Component=Is;ke.Fragment=E_;ke.Profiler=w_;ke.PureComponent=Nd;ke.StrictMode=T_;ke.Suspense=R_;ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=F_;ke.act=mm;ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=cm({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Fd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)fm.call(e,l)&&!hm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:Do,type:t.type,key:r,ref:s,props:i,_owner:o}};ke.createContext=function(t){return t={$$typeof:A_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:C_,_context:t},t.Consumer=t};ke.createElement=pm;ke.createFactory=function(t){var e=pm.bind(null,t);return e.type=t,e};ke.createRef=function(){return{current:null}};ke.forwardRef=function(t){return{$$typeof:b_,render:t}};ke.isValidElement=Od;ke.lazy=function(t){return{$$typeof:I_,_payload:{_status:-1,_result:t},_init:U_}};ke.memo=function(t,e){return{$$typeof:P_,type:t,compare:e===void 0?null:e}};ke.startTransition=function(t){var e=Ia.transition;Ia.transition={};try{t()}finally{Ia.transition=e}};ke.unstable_act=mm;ke.useCallback=function(t,e){return qt.current.useCallback(t,e)};ke.useContext=function(t){return qt.current.useContext(t)};ke.useDebugValue=function(){};ke.useDeferredValue=function(t){return qt.current.useDeferredValue(t)};ke.useEffect=function(t,e){return qt.current.useEffect(t,e)};ke.useId=function(){return qt.current.useId()};ke.useImperativeHandle=function(t,e,n){return qt.current.useImperativeHandle(t,e,n)};ke.useInsertionEffect=function(t,e){return qt.current.useInsertionEffect(t,e)};ke.useLayoutEffect=function(t,e){return qt.current.useLayoutEffect(t,e)};ke.useMemo=function(t,e){return qt.current.useMemo(t,e)};ke.useReducer=function(t,e,n){return qt.current.useReducer(t,e,n)};ke.useRef=function(t){return qt.current.useRef(t)};ke.useState=function(t){return qt.current.useState(t)};ke.useSyncExternalStore=function(t,e,n){return qt.current.useSyncExternalStore(t,e,n)};ke.useTransition=function(){return qt.current.useTransition()};ke.version="18.3.1";am.exports=ke;var J=am.exports;const Yn=Al(J);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O_=J,k_=Symbol.for("react.element"),B_=Symbol.for("react.fragment"),z_=Object.prototype.hasOwnProperty,H_=O_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,V_={key:!0,ref:!0,__self:!0,__source:!0};function gm(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)z_.call(e,i)&&!V_.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:k_,type:t,key:s,ref:o,props:r,_owner:H_.current}}bl.Fragment=B_;bl.jsx=gm;bl.jsxs=gm;om.exports=bl;var b=om.exports,eu={},vm={exports:{}},pn={},_m={exports:{}},ym={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(N,Y){var Q=N.length;N.push(Y);e:for(;0<Q;){var ae=Q-1>>>1,Se=N[ae];if(0<r(Se,Y))N[ae]=Y,N[Q]=Se,Q=ae;else break e}}function n(N){return N.length===0?null:N[0]}function i(N){if(N.length===0)return null;var Y=N[0],Q=N.pop();if(Q!==Y){N[0]=Q;e:for(var ae=0,Se=N.length,qe=Se>>>1;ae<qe;){var q=2*(ae+1)-1,se=N[q],pe=q+1,oe=N[pe];if(0>r(se,Q))pe<Se&&0>r(oe,se)?(N[ae]=oe,N[pe]=Q,ae=pe):(N[ae]=se,N[q]=Q,ae=q);else if(pe<Se&&0>r(oe,Q))N[ae]=oe,N[pe]=Q,ae=pe;else break e}}return Y}function r(N,Y){var Q=N.sortIndex-Y.sortIndex;return Q!==0?Q:N.id-Y.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],f=1,h=null,d=3,p=!1,g=!1,y=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(N){for(var Y=n(c);Y!==null;){if(Y.callback===null)i(c);else if(Y.startTime<=N)i(c),Y.sortIndex=Y.expirationTime,e(l,Y);else break;Y=n(c)}}function v(N){if(y=!1,x(N),!g)if(n(l)!==null)g=!0,$(P);else{var Y=n(c);Y!==null&&ee(v,Y.startTime-N)}}function P(N,Y){g=!1,y&&(y=!1,u(R),R=-1),p=!0;var Q=d;try{for(x(Y),h=n(l);h!==null&&(!(h.expirationTime>Y)||N&&!I());){var ae=h.callback;if(typeof ae=="function"){h.callback=null,d=h.priorityLevel;var Se=ae(h.expirationTime<=Y);Y=t.unstable_now(),typeof Se=="function"?h.callback=Se:h===n(l)&&i(l),x(Y)}else i(l);h=n(l)}if(h!==null)var qe=!0;else{var q=n(c);q!==null&&ee(v,q.startTime-Y),qe=!1}return qe}finally{h=null,d=Q,p=!1}}var C=!1,M=null,R=-1,T=5,S=-1;function I(){return!(t.unstable_now()-S<T)}function U(){if(M!==null){var N=t.unstable_now();S=N;var Y=!0;try{Y=M(!0,N)}finally{Y?L():(C=!1,M=null)}}else C=!1}var L;if(typeof _=="function")L=function(){_(U)};else if(typeof MessageChannel<"u"){var W=new MessageChannel,j=W.port2;W.port1.onmessage=U,L=function(){j.postMessage(null)}}else L=function(){m(U,0)};function $(N){M=N,C||(C=!0,L())}function ee(N,Y){R=m(function(){N(t.unstable_now())},Y)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(N){N.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,$(P))},t.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<N?Math.floor(1e3/N):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(N){switch(d){case 1:case 2:case 3:var Y=3;break;default:Y=d}var Q=d;d=Y;try{return N()}finally{d=Q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(N,Y){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var Q=d;d=N;try{return Y()}finally{d=Q}},t.unstable_scheduleCallback=function(N,Y,Q){var ae=t.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?ae+Q:ae):Q=ae,N){case 1:var Se=-1;break;case 2:Se=250;break;case 5:Se=1073741823;break;case 4:Se=1e4;break;default:Se=5e3}return Se=Q+Se,N={id:f++,callback:Y,priorityLevel:N,startTime:Q,expirationTime:Se,sortIndex:-1},Q>ae?(N.sortIndex=Q,e(c,N),n(l)===null&&N===n(c)&&(y?(u(R),R=-1):y=!0,ee(v,Q-ae))):(N.sortIndex=Se,e(l,N),g||p||(g=!0,$(P))),N},t.unstable_shouldYield=I,t.unstable_wrapCallback=function(N){var Y=d;return function(){var Q=d;d=Y;try{return N.apply(this,arguments)}finally{d=Q}}}})(ym);_m.exports=ym;var G_=_m.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var W_=J,fn=G_;function ne(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var xm=new Set,uo={};function Ir(t,e){_s(t,e),_s(t+"Capture",e)}function _s(t,e){for(uo[t]=e,t=0;t<e.length;t++)xm.add(e[t])}var vi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),tu=Object.prototype.hasOwnProperty,j_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Jf={},eh={};function q_(t){return tu.call(eh,t)?!0:tu.call(Jf,t)?!1:j_.test(t)?eh[t]=!0:(Jf[t]=!0,!1)}function X_(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function $_(t,e,n,i){if(e===null||typeof e>"u"||X_(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Xt(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Nt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Nt[t]=new Xt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Nt[e]=new Xt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Nt[t]=new Xt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Nt[t]=new Xt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Nt[t]=new Xt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Nt[t]=new Xt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Nt[t]=new Xt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Nt[t]=new Xt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Nt[t]=new Xt(t,5,!1,t.toLowerCase(),null,!1,!1)});var kd=/[\-:]([a-z])/g;function Bd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(kd,Bd);Nt[e]=new Xt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(kd,Bd);Nt[e]=new Xt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(kd,Bd);Nt[e]=new Xt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Nt[t]=new Xt(t,1,!1,t.toLowerCase(),null,!1,!1)});Nt.xlinkHref=new Xt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Nt[t]=new Xt(t,1,!1,t.toLowerCase(),null,!0,!0)});function zd(t,e,n,i){var r=Nt.hasOwnProperty(e)?Nt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&($_(e,n,r,i)&&(n=null),i||r===null?q_(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ti=W_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,qo=Symbol.for("react.element"),Kr=Symbol.for("react.portal"),Zr=Symbol.for("react.fragment"),Hd=Symbol.for("react.strict_mode"),nu=Symbol.for("react.profiler"),Sm=Symbol.for("react.provider"),Mm=Symbol.for("react.context"),Vd=Symbol.for("react.forward_ref"),iu=Symbol.for("react.suspense"),ru=Symbol.for("react.suspense_list"),Gd=Symbol.for("react.memo"),Di=Symbol.for("react.lazy"),Em=Symbol.for("react.offscreen"),th=Symbol.iterator;function Os(t){return t===null||typeof t!="object"?null:(t=th&&t[th]||t["@@iterator"],typeof t=="function"?t:null)}var ht=Object.assign,Jl;function Ks(t){if(Jl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Jl=e&&e[1]||""}return`
`+Jl+t}var ec=!1;function tc(t,e){if(!t||ec)return"";ec=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{ec=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ks(t):""}function Y_(t){switch(t.tag){case 5:return Ks(t.type);case 16:return Ks("Lazy");case 13:return Ks("Suspense");case 19:return Ks("SuspenseList");case 0:case 2:case 15:return t=tc(t.type,!1),t;case 11:return t=tc(t.type.render,!1),t;case 1:return t=tc(t.type,!0),t;default:return""}}function su(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Zr:return"Fragment";case Kr:return"Portal";case nu:return"Profiler";case Hd:return"StrictMode";case iu:return"Suspense";case ru:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Mm:return(t.displayName||"Context")+".Consumer";case Sm:return(t._context.displayName||"Context")+".Provider";case Vd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Gd:return e=t.displayName||null,e!==null?e:su(t.type)||"Memo";case Di:e=t._payload,t=t._init;try{return su(t(e))}catch{}}return null}function K_(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return su(e);case 8:return e===Hd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Yi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Tm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Z_(t){var e=Tm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Xo(t){t._valueTracker||(t._valueTracker=Z_(t))}function wm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Tm(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Ya(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ou(t,e){var n=e.checked;return ht({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function nh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Yi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Cm(t,e){e=e.checked,e!=null&&zd(t,"checked",e,!1)}function au(t,e){Cm(t,e);var n=Yi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?lu(t,e.type,n):e.hasOwnProperty("defaultValue")&&lu(t,e.type,Yi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function ih(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function lu(t,e,n){(e!=="number"||Ya(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Zs=Array.isArray;function cs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Yi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function cu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ne(91));return ht({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function rh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ne(92));if(Zs(n)){if(1<n.length)throw Error(ne(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Yi(n)}}function Am(t,e){var n=Yi(e.value),i=Yi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function sh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function bm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function uu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?bm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var $o,Rm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for($o=$o||document.createElement("div"),$o.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=$o.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function fo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var to={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Q_=["Webkit","ms","Moz","O"];Object.keys(to).forEach(function(t){Q_.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),to[e]=to[t]})});function Pm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||to.hasOwnProperty(t)&&to[t]?(""+e).trim():e+"px"}function Im(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Pm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var J_=ht({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function du(t,e){if(e){if(J_[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ne(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ne(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ne(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ne(62))}}function fu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hu=null;function Wd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var pu=null,us=null,ds=null;function oh(t){if(t=Uo(t)){if(typeof pu!="function")throw Error(ne(280));var e=t.stateNode;e&&(e=Ll(e),pu(t.stateNode,t.type,e))}}function Dm(t){us?ds?ds.push(t):ds=[t]:us=t}function Lm(){if(us){var t=us,e=ds;if(ds=us=null,oh(t),e)for(t=0;t<e.length;t++)oh(e[t])}}function Nm(t,e){return t(e)}function Um(){}var nc=!1;function Fm(t,e,n){if(nc)return t(e,n);nc=!0;try{return Nm(t,e,n)}finally{nc=!1,(us!==null||ds!==null)&&(Um(),Lm())}}function ho(t,e){var n=t.stateNode;if(n===null)return null;var i=Ll(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ne(231,e,typeof n));return n}var mu=!1;if(vi)try{var ks={};Object.defineProperty(ks,"passive",{get:function(){mu=!0}}),window.addEventListener("test",ks,ks),window.removeEventListener("test",ks,ks)}catch{mu=!1}function e0(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var no=!1,Ka=null,Za=!1,gu=null,t0={onError:function(t){no=!0,Ka=t}};function n0(t,e,n,i,r,s,o,a,l){no=!1,Ka=null,e0.apply(t0,arguments)}function i0(t,e,n,i,r,s,o,a,l){if(n0.apply(this,arguments),no){if(no){var c=Ka;no=!1,Ka=null}else throw Error(ne(198));Za||(Za=!0,gu=c)}}function Dr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Om(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function ah(t){if(Dr(t)!==t)throw Error(ne(188))}function r0(t){var e=t.alternate;if(!e){if(e=Dr(t),e===null)throw Error(ne(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return ah(r),t;if(s===i)return ah(r),e;s=s.sibling}throw Error(ne(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ne(189))}}if(n.alternate!==i)throw Error(ne(190))}if(n.tag!==3)throw Error(ne(188));return n.stateNode.current===n?t:e}function km(t){return t=r0(t),t!==null?Bm(t):null}function Bm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Bm(t);if(e!==null)return e;t=t.sibling}return null}var zm=fn.unstable_scheduleCallback,lh=fn.unstable_cancelCallback,s0=fn.unstable_shouldYield,o0=fn.unstable_requestPaint,_t=fn.unstable_now,a0=fn.unstable_getCurrentPriorityLevel,jd=fn.unstable_ImmediatePriority,Hm=fn.unstable_UserBlockingPriority,Qa=fn.unstable_NormalPriority,l0=fn.unstable_LowPriority,Vm=fn.unstable_IdlePriority,Rl=null,Kn=null;function c0(t){if(Kn&&typeof Kn.onCommitFiberRoot=="function")try{Kn.onCommitFiberRoot(Rl,t,void 0,(t.current.flags&128)===128)}catch{}}var zn=Math.clz32?Math.clz32:f0,u0=Math.log,d0=Math.LN2;function f0(t){return t>>>=0,t===0?32:31-(u0(t)/d0|0)|0}var Yo=64,Ko=4194304;function Qs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ja(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Qs(a):(s&=o,s!==0&&(i=Qs(s)))}else o=n&~r,o!==0?i=Qs(o):s!==0&&(i=Qs(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-zn(e),r=1<<n,i|=t[n],e&=~r;return i}function h0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function p0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-zn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=h0(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function vu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Gm(){var t=Yo;return Yo<<=1,!(Yo&4194240)&&(Yo=64),t}function ic(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Lo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-zn(e),t[e]=n}function m0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-zn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function qd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-zn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var et=0;function Wm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var jm,Xd,qm,Xm,$m,_u=!1,Zo=[],Bi=null,zi=null,Hi=null,po=new Map,mo=new Map,Ni=[],g0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ch(t,e){switch(t){case"focusin":case"focusout":Bi=null;break;case"dragenter":case"dragleave":zi=null;break;case"mouseover":case"mouseout":Hi=null;break;case"pointerover":case"pointerout":po.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":mo.delete(e.pointerId)}}function Bs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Uo(e),e!==null&&Xd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function v0(t,e,n,i,r){switch(e){case"focusin":return Bi=Bs(Bi,t,e,n,i,r),!0;case"dragenter":return zi=Bs(zi,t,e,n,i,r),!0;case"mouseover":return Hi=Bs(Hi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return po.set(s,Bs(po.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,mo.set(s,Bs(mo.get(s)||null,t,e,n,i,r)),!0}return!1}function Ym(t){var e=gr(t.target);if(e!==null){var n=Dr(e);if(n!==null){if(e=n.tag,e===13){if(e=Om(n),e!==null){t.blockedOn=e,$m(t.priority,function(){qm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Da(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=yu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);hu=i,n.target.dispatchEvent(i),hu=null}else return e=Uo(n),e!==null&&Xd(e),t.blockedOn=n,!1;e.shift()}return!0}function uh(t,e,n){Da(t)&&n.delete(e)}function _0(){_u=!1,Bi!==null&&Da(Bi)&&(Bi=null),zi!==null&&Da(zi)&&(zi=null),Hi!==null&&Da(Hi)&&(Hi=null),po.forEach(uh),mo.forEach(uh)}function zs(t,e){t.blockedOn===e&&(t.blockedOn=null,_u||(_u=!0,fn.unstable_scheduleCallback(fn.unstable_NormalPriority,_0)))}function go(t){function e(r){return zs(r,t)}if(0<Zo.length){zs(Zo[0],t);for(var n=1;n<Zo.length;n++){var i=Zo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(Bi!==null&&zs(Bi,t),zi!==null&&zs(zi,t),Hi!==null&&zs(Hi,t),po.forEach(e),mo.forEach(e),n=0;n<Ni.length;n++)i=Ni[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ni.length&&(n=Ni[0],n.blockedOn===null);)Ym(n),n.blockedOn===null&&Ni.shift()}var fs=Ti.ReactCurrentBatchConfig,el=!0;function y0(t,e,n,i){var r=et,s=fs.transition;fs.transition=null;try{et=1,$d(t,e,n,i)}finally{et=r,fs.transition=s}}function x0(t,e,n,i){var r=et,s=fs.transition;fs.transition=null;try{et=4,$d(t,e,n,i)}finally{et=r,fs.transition=s}}function $d(t,e,n,i){if(el){var r=yu(t,e,n,i);if(r===null)hc(t,e,i,tl,n),ch(t,i);else if(v0(r,t,e,n,i))i.stopPropagation();else if(ch(t,i),e&4&&-1<g0.indexOf(t)){for(;r!==null;){var s=Uo(r);if(s!==null&&jm(s),s=yu(t,e,n,i),s===null&&hc(t,e,i,tl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else hc(t,e,i,null,n)}}var tl=null;function yu(t,e,n,i){if(tl=null,t=Wd(i),t=gr(t),t!==null)if(e=Dr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Om(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return tl=t,null}function Km(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(a0()){case jd:return 1;case Hm:return 4;case Qa:case l0:return 16;case Vm:return 536870912;default:return 16}default:return 16}}var Oi=null,Yd=null,La=null;function Zm(){if(La)return La;var t,e=Yd,n=e.length,i,r="value"in Oi?Oi.value:Oi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return La=r.slice(t,1<i?1-i:void 0)}function Na(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Qo(){return!0}function dh(){return!1}function mn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Qo:dh,this.isPropagationStopped=dh,this}return ht(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Qo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Qo)},persist:function(){},isPersistent:Qo}),e}var Ds={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Kd=mn(Ds),No=ht({},Ds,{view:0,detail:0}),S0=mn(No),rc,sc,Hs,Pl=ht({},No,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Hs&&(Hs&&t.type==="mousemove"?(rc=t.screenX-Hs.screenX,sc=t.screenY-Hs.screenY):sc=rc=0,Hs=t),rc)},movementY:function(t){return"movementY"in t?t.movementY:sc}}),fh=mn(Pl),M0=ht({},Pl,{dataTransfer:0}),E0=mn(M0),T0=ht({},No,{relatedTarget:0}),oc=mn(T0),w0=ht({},Ds,{animationName:0,elapsedTime:0,pseudoElement:0}),C0=mn(w0),A0=ht({},Ds,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),b0=mn(A0),R0=ht({},Ds,{data:0}),hh=mn(R0),P0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},I0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},D0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=D0[t])?!!e[t]:!1}function Zd(){return L0}var N0=ht({},No,{key:function(t){if(t.key){var e=P0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Na(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?I0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zd,charCode:function(t){return t.type==="keypress"?Na(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Na(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),U0=mn(N0),F0=ht({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ph=mn(F0),O0=ht({},No,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zd}),k0=mn(O0),B0=ht({},Ds,{propertyName:0,elapsedTime:0,pseudoElement:0}),z0=mn(B0),H0=ht({},Pl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),V0=mn(H0),G0=[9,13,27,32],Qd=vi&&"CompositionEvent"in window,io=null;vi&&"documentMode"in document&&(io=document.documentMode);var W0=vi&&"TextEvent"in window&&!io,Qm=vi&&(!Qd||io&&8<io&&11>=io),mh=" ",gh=!1;function Jm(t,e){switch(t){case"keyup":return G0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function eg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Qr=!1;function j0(t,e){switch(t){case"compositionend":return eg(e);case"keypress":return e.which!==32?null:(gh=!0,mh);case"textInput":return t=e.data,t===mh&&gh?null:t;default:return null}}function q0(t,e){if(Qr)return t==="compositionend"||!Qd&&Jm(t,e)?(t=Zm(),La=Yd=Oi=null,Qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Qm&&e.locale!=="ko"?null:e.data;default:return null}}var X0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function vh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!X0[t.type]:e==="textarea"}function tg(t,e,n,i){Dm(i),e=nl(e,"onChange"),0<e.length&&(n=new Kd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ro=null,vo=null;function $0(t){fg(t,0)}function Il(t){var e=ts(t);if(wm(e))return t}function Y0(t,e){if(t==="change")return e}var ng=!1;if(vi){var ac;if(vi){var lc="oninput"in document;if(!lc){var _h=document.createElement("div");_h.setAttribute("oninput","return;"),lc=typeof _h.oninput=="function"}ac=lc}else ac=!1;ng=ac&&(!document.documentMode||9<document.documentMode)}function yh(){ro&&(ro.detachEvent("onpropertychange",ig),vo=ro=null)}function ig(t){if(t.propertyName==="value"&&Il(vo)){var e=[];tg(e,vo,t,Wd(t)),Fm($0,e)}}function K0(t,e,n){t==="focusin"?(yh(),ro=e,vo=n,ro.attachEvent("onpropertychange",ig)):t==="focusout"&&yh()}function Z0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Il(vo)}function Q0(t,e){if(t==="click")return Il(e)}function J0(t,e){if(t==="input"||t==="change")return Il(e)}function ey(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Gn=typeof Object.is=="function"?Object.is:ey;function _o(t,e){if(Gn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!tu.call(e,r)||!Gn(t[r],e[r]))return!1}return!0}function xh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Sh(t,e){var n=xh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xh(n)}}function rg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?rg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function sg(){for(var t=window,e=Ya();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ya(t.document)}return e}function Jd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ty(t){var e=sg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&rg(n.ownerDocument.documentElement,n)){if(i!==null&&Jd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Sh(n,s);var o=Sh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ny=vi&&"documentMode"in document&&11>=document.documentMode,Jr=null,xu=null,so=null,Su=!1;function Mh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Su||Jr==null||Jr!==Ya(i)||(i=Jr,"selectionStart"in i&&Jd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),so&&_o(so,i)||(so=i,i=nl(xu,"onSelect"),0<i.length&&(e=new Kd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Jr)))}function Jo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var es={animationend:Jo("Animation","AnimationEnd"),animationiteration:Jo("Animation","AnimationIteration"),animationstart:Jo("Animation","AnimationStart"),transitionend:Jo("Transition","TransitionEnd")},cc={},og={};vi&&(og=document.createElement("div").style,"AnimationEvent"in window||(delete es.animationend.animation,delete es.animationiteration.animation,delete es.animationstart.animation),"TransitionEvent"in window||delete es.transitionend.transition);function Dl(t){if(cc[t])return cc[t];if(!es[t])return t;var e=es[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in og)return cc[t]=e[n];return t}var ag=Dl("animationend"),lg=Dl("animationiteration"),cg=Dl("animationstart"),ug=Dl("transitionend"),dg=new Map,Eh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qi(t,e){dg.set(t,e),Ir(e,[t])}for(var uc=0;uc<Eh.length;uc++){var dc=Eh[uc],iy=dc.toLowerCase(),ry=dc[0].toUpperCase()+dc.slice(1);Qi(iy,"on"+ry)}Qi(ag,"onAnimationEnd");Qi(lg,"onAnimationIteration");Qi(cg,"onAnimationStart");Qi("dblclick","onDoubleClick");Qi("focusin","onFocus");Qi("focusout","onBlur");Qi(ug,"onTransitionEnd");_s("onMouseEnter",["mouseout","mouseover"]);_s("onMouseLeave",["mouseout","mouseover"]);_s("onPointerEnter",["pointerout","pointerover"]);_s("onPointerLeave",["pointerout","pointerover"]);Ir("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ir("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ir("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ir("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ir("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ir("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Js="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Js));function Th(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,i0(i,e,void 0,t),t.currentTarget=null}function fg(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Th(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Th(r,a,c),s=l}}}if(Za)throw t=gu,Za=!1,gu=null,t}function ot(t,e){var n=e[Cu];n===void 0&&(n=e[Cu]=new Set);var i=t+"__bubble";n.has(i)||(hg(e,t,2,!1),n.add(i))}function fc(t,e,n){var i=0;e&&(i|=4),hg(n,t,i,e)}var ea="_reactListening"+Math.random().toString(36).slice(2);function yo(t){if(!t[ea]){t[ea]=!0,xm.forEach(function(n){n!=="selectionchange"&&(sy.has(n)||fc(n,!1,t),fc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ea]||(e[ea]=!0,fc("selectionchange",!1,e))}}function hg(t,e,n,i){switch(Km(e)){case 1:var r=y0;break;case 4:r=x0;break;default:r=$d}n=r.bind(null,e,n,t),r=void 0,!mu||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function hc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=gr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Fm(function(){var c=s,f=Wd(n),h=[];e:{var d=dg.get(t);if(d!==void 0){var p=Kd,g=t;switch(t){case"keypress":if(Na(n)===0)break e;case"keydown":case"keyup":p=U0;break;case"focusin":g="focus",p=oc;break;case"focusout":g="blur",p=oc;break;case"beforeblur":case"afterblur":p=oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=fh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=E0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=k0;break;case ag:case lg:case cg:p=C0;break;case ug:p=z0;break;case"scroll":p=S0;break;case"wheel":p=V0;break;case"copy":case"cut":case"paste":p=b0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=ph}var y=(e&4)!==0,m=!y&&t==="scroll",u=y?d!==null?d+"Capture":null:d;y=[];for(var _=c,x;_!==null;){x=_;var v=x.stateNode;if(x.tag===5&&v!==null&&(x=v,u!==null&&(v=ho(_,u),v!=null&&y.push(xo(_,v,x)))),m)break;_=_.return}0<y.length&&(d=new p(d,g,null,n,f),h.push({event:d,listeners:y}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==hu&&(g=n.relatedTarget||n.fromElement)&&(gr(g)||g[_i]))break e;if((p||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?gr(g):null,g!==null&&(m=Dr(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(y=fh,v="onMouseLeave",u="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(y=ph,v="onPointerLeave",u="onPointerEnter",_="pointer"),m=p==null?d:ts(p),x=g==null?d:ts(g),d=new y(v,_+"leave",p,n,f),d.target=m,d.relatedTarget=x,v=null,gr(f)===c&&(y=new y(u,_+"enter",g,n,f),y.target=x,y.relatedTarget=m,v=y),m=v,p&&g)t:{for(y=p,u=g,_=0,x=y;x;x=Ur(x))_++;for(x=0,v=u;v;v=Ur(v))x++;for(;0<_-x;)y=Ur(y),_--;for(;0<x-_;)u=Ur(u),x--;for(;_--;){if(y===u||u!==null&&y===u.alternate)break t;y=Ur(y),u=Ur(u)}y=null}else y=null;p!==null&&wh(h,d,p,y,!1),g!==null&&m!==null&&wh(h,m,g,y,!0)}}e:{if(d=c?ts(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var P=Y0;else if(vh(d))if(ng)P=J0;else{P=Z0;var C=K0}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(P=Q0);if(P&&(P=P(t,c))){tg(h,P,n,f);break e}C&&C(t,d,c),t==="focusout"&&(C=d._wrapperState)&&C.controlled&&d.type==="number"&&lu(d,"number",d.value)}switch(C=c?ts(c):window,t){case"focusin":(vh(C)||C.contentEditable==="true")&&(Jr=C,xu=c,so=null);break;case"focusout":so=xu=Jr=null;break;case"mousedown":Su=!0;break;case"contextmenu":case"mouseup":case"dragend":Su=!1,Mh(h,n,f);break;case"selectionchange":if(ny)break;case"keydown":case"keyup":Mh(h,n,f)}var M;if(Qd)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else Qr?Jm(t,n)&&(R="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(Qm&&n.locale!=="ko"&&(Qr||R!=="onCompositionStart"?R==="onCompositionEnd"&&Qr&&(M=Zm()):(Oi=f,Yd="value"in Oi?Oi.value:Oi.textContent,Qr=!0)),C=nl(c,R),0<C.length&&(R=new hh(R,t,null,n,f),h.push({event:R,listeners:C}),M?R.data=M:(M=eg(n),M!==null&&(R.data=M)))),(M=W0?j0(t,n):q0(t,n))&&(c=nl(c,"onBeforeInput"),0<c.length&&(f=new hh("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:c}),f.data=M))}fg(h,e)})}function xo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function nl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ho(t,n),s!=null&&i.unshift(xo(t,s,r)),s=ho(t,e),s!=null&&i.push(xo(t,s,r))),t=t.return}return i}function Ur(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function wh(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=ho(n,s),l!=null&&o.unshift(xo(n,l,a))):r||(l=ho(n,s),l!=null&&o.push(xo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var oy=/\r\n?/g,ay=/\u0000|\uFFFD/g;function Ch(t){return(typeof t=="string"?t:""+t).replace(oy,`
`).replace(ay,"")}function ta(t,e,n){if(e=Ch(e),Ch(t)!==e&&n)throw Error(ne(425))}function il(){}var Mu=null,Eu=null;function Tu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var wu=typeof setTimeout=="function"?setTimeout:void 0,ly=typeof clearTimeout=="function"?clearTimeout:void 0,Ah=typeof Promise=="function"?Promise:void 0,cy=typeof queueMicrotask=="function"?queueMicrotask:typeof Ah<"u"?function(t){return Ah.resolve(null).then(t).catch(uy)}:wu;function uy(t){setTimeout(function(){throw t})}function pc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),go(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);go(e)}function Vi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function bh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ls=Math.random().toString(36).slice(2),Xn="__reactFiber$"+Ls,So="__reactProps$"+Ls,_i="__reactContainer$"+Ls,Cu="__reactEvents$"+Ls,dy="__reactListeners$"+Ls,fy="__reactHandles$"+Ls;function gr(t){var e=t[Xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_i]||n[Xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=bh(t);t!==null;){if(n=t[Xn])return n;t=bh(t)}return e}t=n,n=t.parentNode}return null}function Uo(t){return t=t[Xn]||t[_i],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ts(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ne(33))}function Ll(t){return t[So]||null}var Au=[],ns=-1;function Ji(t){return{current:t}}function at(t){0>ns||(t.current=Au[ns],Au[ns]=null,ns--)}function rt(t,e){ns++,Au[ns]=t.current,t.current=e}var Ki={},Ht=Ji(Ki),Jt=Ji(!1),Tr=Ki;function ys(t,e){var n=t.type.contextTypes;if(!n)return Ki;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function en(t){return t=t.childContextTypes,t!=null}function rl(){at(Jt),at(Ht)}function Rh(t,e,n){if(Ht.current!==Ki)throw Error(ne(168));rt(Ht,e),rt(Jt,n)}function pg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ne(108,K_(t)||"Unknown",r));return ht({},n,i)}function sl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ki,Tr=Ht.current,rt(Ht,t),rt(Jt,Jt.current),!0}function Ph(t,e,n){var i=t.stateNode;if(!i)throw Error(ne(169));n?(t=pg(t,e,Tr),i.__reactInternalMemoizedMergedChildContext=t,at(Jt),at(Ht),rt(Ht,t)):at(Jt),rt(Jt,n)}var ci=null,Nl=!1,mc=!1;function mg(t){ci===null?ci=[t]:ci.push(t)}function hy(t){Nl=!0,mg(t)}function er(){if(!mc&&ci!==null){mc=!0;var t=0,e=et;try{var n=ci;for(et=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ci=null,Nl=!1}catch(r){throw ci!==null&&(ci=ci.slice(t+1)),zm(jd,er),r}finally{et=e,mc=!1}}return null}var is=[],rs=0,ol=null,al=0,Sn=[],Mn=0,wr=null,di=1,fi="";function cr(t,e){is[rs++]=al,is[rs++]=ol,ol=t,al=e}function gg(t,e,n){Sn[Mn++]=di,Sn[Mn++]=fi,Sn[Mn++]=wr,wr=t;var i=di;t=fi;var r=32-zn(i)-1;i&=~(1<<r),n+=1;var s=32-zn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,di=1<<32-zn(e)+r|n<<r|i,fi=s+t}else di=1<<s|n<<r|i,fi=t}function ef(t){t.return!==null&&(cr(t,1),gg(t,1,0))}function tf(t){for(;t===ol;)ol=is[--rs],is[rs]=null,al=is[--rs],is[rs]=null;for(;t===wr;)wr=Sn[--Mn],Sn[Mn]=null,fi=Sn[--Mn],Sn[Mn]=null,di=Sn[--Mn],Sn[Mn]=null}var un=null,cn=null,ct=!1,Fn=null;function vg(t,e){var n=Tn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Ih(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,un=t,cn=Vi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,un=t,cn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=wr!==null?{id:di,overflow:fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Tn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,un=t,cn=null,!0):!1;default:return!1}}function bu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ru(t){if(ct){var e=cn;if(e){var n=e;if(!Ih(t,e)){if(bu(t))throw Error(ne(418));e=Vi(n.nextSibling);var i=un;e&&Ih(t,e)?vg(i,n):(t.flags=t.flags&-4097|2,ct=!1,un=t)}}else{if(bu(t))throw Error(ne(418));t.flags=t.flags&-4097|2,ct=!1,un=t}}}function Dh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;un=t}function na(t){if(t!==un)return!1;if(!ct)return Dh(t),ct=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Tu(t.type,t.memoizedProps)),e&&(e=cn)){if(bu(t))throw _g(),Error(ne(418));for(;e;)vg(t,e),e=Vi(e.nextSibling)}if(Dh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ne(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){cn=Vi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}cn=null}}else cn=un?Vi(t.stateNode.nextSibling):null;return!0}function _g(){for(var t=cn;t;)t=Vi(t.nextSibling)}function xs(){cn=un=null,ct=!1}function nf(t){Fn===null?Fn=[t]:Fn.push(t)}var py=Ti.ReactCurrentBatchConfig;function Vs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ne(309));var i=n.stateNode}if(!i)throw Error(ne(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ne(284));if(!n._owner)throw Error(ne(290,t))}return t}function ia(t,e){throw t=Object.prototype.toString.call(e),Error(ne(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Lh(t){var e=t._init;return e(t._payload)}function yg(t){function e(u,_){if(t){var x=u.deletions;x===null?(u.deletions=[_],u.flags|=16):x.push(_)}}function n(u,_){if(!t)return null;for(;_!==null;)e(u,_),_=_.sibling;return null}function i(u,_){for(u=new Map;_!==null;)_.key!==null?u.set(_.key,_):u.set(_.index,_),_=_.sibling;return u}function r(u,_){return u=qi(u,_),u.index=0,u.sibling=null,u}function s(u,_,x){return u.index=x,t?(x=u.alternate,x!==null?(x=x.index,x<_?(u.flags|=2,_):x):(u.flags|=2,_)):(u.flags|=1048576,_)}function o(u){return t&&u.alternate===null&&(u.flags|=2),u}function a(u,_,x,v){return _===null||_.tag!==6?(_=Mc(x,u.mode,v),_.return=u,_):(_=r(_,x),_.return=u,_)}function l(u,_,x,v){var P=x.type;return P===Zr?f(u,_,x.props.children,v,x.key):_!==null&&(_.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Di&&Lh(P)===_.type)?(v=r(_,x.props),v.ref=Vs(u,_,x),v.return=u,v):(v=Ha(x.type,x.key,x.props,null,u.mode,v),v.ref=Vs(u,_,x),v.return=u,v)}function c(u,_,x,v){return _===null||_.tag!==4||_.stateNode.containerInfo!==x.containerInfo||_.stateNode.implementation!==x.implementation?(_=Ec(x,u.mode,v),_.return=u,_):(_=r(_,x.children||[]),_.return=u,_)}function f(u,_,x,v,P){return _===null||_.tag!==7?(_=Mr(x,u.mode,v,P),_.return=u,_):(_=r(_,x),_.return=u,_)}function h(u,_,x){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Mc(""+_,u.mode,x),_.return=u,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case qo:return x=Ha(_.type,_.key,_.props,null,u.mode,x),x.ref=Vs(u,null,_),x.return=u,x;case Kr:return _=Ec(_,u.mode,x),_.return=u,_;case Di:var v=_._init;return h(u,v(_._payload),x)}if(Zs(_)||Os(_))return _=Mr(_,u.mode,x,null),_.return=u,_;ia(u,_)}return null}function d(u,_,x,v){var P=_!==null?_.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return P!==null?null:a(u,_,""+x,v);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case qo:return x.key===P?l(u,_,x,v):null;case Kr:return x.key===P?c(u,_,x,v):null;case Di:return P=x._init,d(u,_,P(x._payload),v)}if(Zs(x)||Os(x))return P!==null?null:f(u,_,x,v,null);ia(u,x)}return null}function p(u,_,x,v,P){if(typeof v=="string"&&v!==""||typeof v=="number")return u=u.get(x)||null,a(_,u,""+v,P);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case qo:return u=u.get(v.key===null?x:v.key)||null,l(_,u,v,P);case Kr:return u=u.get(v.key===null?x:v.key)||null,c(_,u,v,P);case Di:var C=v._init;return p(u,_,x,C(v._payload),P)}if(Zs(v)||Os(v))return u=u.get(x)||null,f(_,u,v,P,null);ia(_,v)}return null}function g(u,_,x,v){for(var P=null,C=null,M=_,R=_=0,T=null;M!==null&&R<x.length;R++){M.index>R?(T=M,M=null):T=M.sibling;var S=d(u,M,x[R],v);if(S===null){M===null&&(M=T);break}t&&M&&S.alternate===null&&e(u,M),_=s(S,_,R),C===null?P=S:C.sibling=S,C=S,M=T}if(R===x.length)return n(u,M),ct&&cr(u,R),P;if(M===null){for(;R<x.length;R++)M=h(u,x[R],v),M!==null&&(_=s(M,_,R),C===null?P=M:C.sibling=M,C=M);return ct&&cr(u,R),P}for(M=i(u,M);R<x.length;R++)T=p(M,u,R,x[R],v),T!==null&&(t&&T.alternate!==null&&M.delete(T.key===null?R:T.key),_=s(T,_,R),C===null?P=T:C.sibling=T,C=T);return t&&M.forEach(function(I){return e(u,I)}),ct&&cr(u,R),P}function y(u,_,x,v){var P=Os(x);if(typeof P!="function")throw Error(ne(150));if(x=P.call(x),x==null)throw Error(ne(151));for(var C=P=null,M=_,R=_=0,T=null,S=x.next();M!==null&&!S.done;R++,S=x.next()){M.index>R?(T=M,M=null):T=M.sibling;var I=d(u,M,S.value,v);if(I===null){M===null&&(M=T);break}t&&M&&I.alternate===null&&e(u,M),_=s(I,_,R),C===null?P=I:C.sibling=I,C=I,M=T}if(S.done)return n(u,M),ct&&cr(u,R),P;if(M===null){for(;!S.done;R++,S=x.next())S=h(u,S.value,v),S!==null&&(_=s(S,_,R),C===null?P=S:C.sibling=S,C=S);return ct&&cr(u,R),P}for(M=i(u,M);!S.done;R++,S=x.next())S=p(M,u,R,S.value,v),S!==null&&(t&&S.alternate!==null&&M.delete(S.key===null?R:S.key),_=s(S,_,R),C===null?P=S:C.sibling=S,C=S);return t&&M.forEach(function(U){return e(u,U)}),ct&&cr(u,R),P}function m(u,_,x,v){if(typeof x=="object"&&x!==null&&x.type===Zr&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case qo:e:{for(var P=x.key,C=_;C!==null;){if(C.key===P){if(P=x.type,P===Zr){if(C.tag===7){n(u,C.sibling),_=r(C,x.props.children),_.return=u,u=_;break e}}else if(C.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===Di&&Lh(P)===C.type){n(u,C.sibling),_=r(C,x.props),_.ref=Vs(u,C,x),_.return=u,u=_;break e}n(u,C);break}else e(u,C);C=C.sibling}x.type===Zr?(_=Mr(x.props.children,u.mode,v,x.key),_.return=u,u=_):(v=Ha(x.type,x.key,x.props,null,u.mode,v),v.ref=Vs(u,_,x),v.return=u,u=v)}return o(u);case Kr:e:{for(C=x.key;_!==null;){if(_.key===C)if(_.tag===4&&_.stateNode.containerInfo===x.containerInfo&&_.stateNode.implementation===x.implementation){n(u,_.sibling),_=r(_,x.children||[]),_.return=u,u=_;break e}else{n(u,_);break}else e(u,_);_=_.sibling}_=Ec(x,u.mode,v),_.return=u,u=_}return o(u);case Di:return C=x._init,m(u,_,C(x._payload),v)}if(Zs(x))return g(u,_,x,v);if(Os(x))return y(u,_,x,v);ia(u,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,_!==null&&_.tag===6?(n(u,_.sibling),_=r(_,x),_.return=u,u=_):(n(u,_),_=Mc(x,u.mode,v),_.return=u,u=_),o(u)):n(u,_)}return m}var Ss=yg(!0),xg=yg(!1),ll=Ji(null),cl=null,ss=null,rf=null;function sf(){rf=ss=cl=null}function of(t){var e=ll.current;at(ll),t._currentValue=e}function Pu(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function hs(t,e){cl=t,rf=ss=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Qt=!0),t.firstContext=null)}function Cn(t){var e=t._currentValue;if(rf!==t)if(t={context:t,memoizedValue:e,next:null},ss===null){if(cl===null)throw Error(ne(308));ss=t,cl.dependencies={lanes:0,firstContext:t}}else ss=ss.next=t;return e}var vr=null;function af(t){vr===null?vr=[t]:vr.push(t)}function Sg(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,af(e)):(n.next=r.next,r.next=n),e.interleaved=n,yi(t,i)}function yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Li=!1;function lf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function mi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Gi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,je&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,yi(t,n)}return r=i.interleaved,r===null?(e.next=e,af(i)):(e.next=r.next,r.next=e),i.interleaved=e,yi(t,n)}function Ua(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,qd(t,n)}}function Nh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function ul(t,e,n,i){var r=t.updateQueue;Li=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=c:a.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;o=0,f=c=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){f!==null&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,y=a;switch(d=e,p=n,y.tag){case 1:if(g=y.payload,typeof g=="function"){h=g.call(p,h,d);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=y.payload,d=typeof g=="function"?g.call(p,h,d):g,d==null)break e;h=ht({},h,d);break e;case 2:Li=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(!0);if(f===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Ar|=o,t.lanes=o,t.memoizedState=h}}function Uh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ne(191,r));r.call(i)}}}var Fo={},Zn=Ji(Fo),Mo=Ji(Fo),Eo=Ji(Fo);function _r(t){if(t===Fo)throw Error(ne(174));return t}function cf(t,e){switch(rt(Eo,e),rt(Mo,t),rt(Zn,Fo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:uu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=uu(e,t)}at(Zn),rt(Zn,e)}function Ms(){at(Zn),at(Mo),at(Eo)}function Eg(t){_r(Eo.current);var e=_r(Zn.current),n=uu(e,t.type);e!==n&&(rt(Mo,t),rt(Zn,n))}function uf(t){Mo.current===t&&(at(Zn),at(Mo))}var dt=Ji(0);function dl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var gc=[];function df(){for(var t=0;t<gc.length;t++)gc[t]._workInProgressVersionPrimary=null;gc.length=0}var Fa=Ti.ReactCurrentDispatcher,vc=Ti.ReactCurrentBatchConfig,Cr=0,ft=null,Tt=null,Rt=null,fl=!1,oo=!1,To=0,my=0;function Ft(){throw Error(ne(321))}function ff(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Gn(t[n],e[n]))return!1;return!0}function hf(t,e,n,i,r,s){if(Cr=s,ft=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Fa.current=t===null||t.memoizedState===null?yy:xy,t=n(i,r),oo){s=0;do{if(oo=!1,To=0,25<=s)throw Error(ne(301));s+=1,Rt=Tt=null,e.updateQueue=null,Fa.current=Sy,t=n(i,r)}while(oo)}if(Fa.current=hl,e=Tt!==null&&Tt.next!==null,Cr=0,Rt=Tt=ft=null,fl=!1,e)throw Error(ne(300));return t}function pf(){var t=To!==0;return To=0,t}function jn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Rt===null?ft.memoizedState=Rt=t:Rt=Rt.next=t,Rt}function An(){if(Tt===null){var t=ft.alternate;t=t!==null?t.memoizedState:null}else t=Tt.next;var e=Rt===null?ft.memoizedState:Rt.next;if(e!==null)Rt=e,Tt=t;else{if(t===null)throw Error(ne(310));Tt=t,t={memoizedState:Tt.memoizedState,baseState:Tt.baseState,baseQueue:Tt.baseQueue,queue:Tt.queue,next:null},Rt===null?ft.memoizedState=Rt=t:Rt=Rt.next=t}return Rt}function wo(t,e){return typeof e=="function"?e(t):e}function _c(t){var e=An(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=Tt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var f=c.lane;if((Cr&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,o=i):l=l.next=h,ft.lanes|=f,Ar|=f}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,Gn(i,e.memoizedState)||(Qt=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,ft.lanes|=s,Ar|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function yc(t){var e=An(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Gn(s,e.memoizedState)||(Qt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Tg(){}function wg(t,e){var n=ft,i=An(),r=e(),s=!Gn(i.memoizedState,r);if(s&&(i.memoizedState=r,Qt=!0),i=i.queue,mf(bg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Rt!==null&&Rt.memoizedState.tag&1){if(n.flags|=2048,Co(9,Ag.bind(null,n,i,r,e),void 0,null),Pt===null)throw Error(ne(349));Cr&30||Cg(n,e,r)}return r}function Cg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ft.updateQueue,e===null?(e={lastEffect:null,stores:null},ft.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ag(t,e,n,i){e.value=n,e.getSnapshot=i,Rg(e)&&Pg(t)}function bg(t,e,n){return n(function(){Rg(e)&&Pg(t)})}function Rg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Gn(t,n)}catch{return!0}}function Pg(t){var e=yi(t,1);e!==null&&Hn(e,t,1,-1)}function Fh(t){var e=jn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},e.queue=t,t=t.dispatch=_y.bind(null,ft,t),[e.memoizedState,t]}function Co(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=ft.updateQueue,e===null?(e={lastEffect:null,stores:null},ft.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Ig(){return An().memoizedState}function Oa(t,e,n,i){var r=jn();ft.flags|=t,r.memoizedState=Co(1|e,n,void 0,i===void 0?null:i)}function Ul(t,e,n,i){var r=An();i=i===void 0?null:i;var s=void 0;if(Tt!==null){var o=Tt.memoizedState;if(s=o.destroy,i!==null&&ff(i,o.deps)){r.memoizedState=Co(e,n,s,i);return}}ft.flags|=t,r.memoizedState=Co(1|e,n,s,i)}function Oh(t,e){return Oa(8390656,8,t,e)}function mf(t,e){return Ul(2048,8,t,e)}function Dg(t,e){return Ul(4,2,t,e)}function Lg(t,e){return Ul(4,4,t,e)}function Ng(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ug(t,e,n){return n=n!=null?n.concat([t]):null,Ul(4,4,Ng.bind(null,e,t),n)}function gf(){}function Fg(t,e){var n=An();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ff(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Og(t,e){var n=An();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&ff(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function kg(t,e,n){return Cr&21?(Gn(n,e)||(n=Gm(),ft.lanes|=n,Ar|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Qt=!0),t.memoizedState=n)}function gy(t,e){var n=et;et=n!==0&&4>n?n:4,t(!0);var i=vc.transition;vc.transition={};try{t(!1),e()}finally{et=n,vc.transition=i}}function Bg(){return An().memoizedState}function vy(t,e,n){var i=ji(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},zg(t))Hg(e,n);else if(n=Sg(t,e,n,i),n!==null){var r=jt();Hn(n,t,i,r),Vg(n,e,i)}}function _y(t,e,n){var i=ji(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(zg(t))Hg(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Gn(a,o)){var l=e.interleaved;l===null?(r.next=r,af(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Sg(t,e,r,i),n!==null&&(r=jt(),Hn(n,t,i,r),Vg(n,e,i))}}function zg(t){var e=t.alternate;return t===ft||e!==null&&e===ft}function Hg(t,e){oo=fl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vg(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,qd(t,n)}}var hl={readContext:Cn,useCallback:Ft,useContext:Ft,useEffect:Ft,useImperativeHandle:Ft,useInsertionEffect:Ft,useLayoutEffect:Ft,useMemo:Ft,useReducer:Ft,useRef:Ft,useState:Ft,useDebugValue:Ft,useDeferredValue:Ft,useTransition:Ft,useMutableSource:Ft,useSyncExternalStore:Ft,useId:Ft,unstable_isNewReconciler:!1},yy={readContext:Cn,useCallback:function(t,e){return jn().memoizedState=[t,e===void 0?null:e],t},useContext:Cn,useEffect:Oh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Oa(4194308,4,Ng.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Oa(4194308,4,t,e)},useInsertionEffect:function(t,e){return Oa(4,2,t,e)},useMemo:function(t,e){var n=jn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=jn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=vy.bind(null,ft,t),[i.memoizedState,t]},useRef:function(t){var e=jn();return t={current:t},e.memoizedState=t},useState:Fh,useDebugValue:gf,useDeferredValue:function(t){return jn().memoizedState=t},useTransition:function(){var t=Fh(!1),e=t[0];return t=gy.bind(null,t[1]),jn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=ft,r=jn();if(ct){if(n===void 0)throw Error(ne(407));n=n()}else{if(n=e(),Pt===null)throw Error(ne(349));Cr&30||Cg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Oh(bg.bind(null,i,s,t),[t]),i.flags|=2048,Co(9,Ag.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=jn(),e=Pt.identifierPrefix;if(ct){var n=fi,i=di;n=(i&~(1<<32-zn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=To++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=my++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},xy={readContext:Cn,useCallback:Fg,useContext:Cn,useEffect:mf,useImperativeHandle:Ug,useInsertionEffect:Dg,useLayoutEffect:Lg,useMemo:Og,useReducer:_c,useRef:Ig,useState:function(){return _c(wo)},useDebugValue:gf,useDeferredValue:function(t){var e=An();return kg(e,Tt.memoizedState,t)},useTransition:function(){var t=_c(wo)[0],e=An().memoizedState;return[t,e]},useMutableSource:Tg,useSyncExternalStore:wg,useId:Bg,unstable_isNewReconciler:!1},Sy={readContext:Cn,useCallback:Fg,useContext:Cn,useEffect:mf,useImperativeHandle:Ug,useInsertionEffect:Dg,useLayoutEffect:Lg,useMemo:Og,useReducer:yc,useRef:Ig,useState:function(){return yc(wo)},useDebugValue:gf,useDeferredValue:function(t){var e=An();return Tt===null?e.memoizedState=t:kg(e,Tt.memoizedState,t)},useTransition:function(){var t=yc(wo)[0],e=An().memoizedState;return[t,e]},useMutableSource:Tg,useSyncExternalStore:wg,useId:Bg,unstable_isNewReconciler:!1};function Nn(t,e){if(t&&t.defaultProps){e=ht({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Iu(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:ht({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Fl={isMounted:function(t){return(t=t._reactInternals)?Dr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=jt(),r=ji(t),s=mi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Gi(t,s,r),e!==null&&(Hn(e,t,r,i),Ua(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=jt(),r=ji(t),s=mi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Gi(t,s,r),e!==null&&(Hn(e,t,r,i),Ua(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=jt(),i=ji(t),r=mi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Gi(t,r,i),e!==null&&(Hn(e,t,i,n),Ua(e,t,i))}};function kh(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!_o(n,i)||!_o(r,s):!0}function Gg(t,e,n){var i=!1,r=Ki,s=e.contextType;return typeof s=="object"&&s!==null?s=Cn(s):(r=en(e)?Tr:Ht.current,i=e.contextTypes,s=(i=i!=null)?ys(t,r):Ki),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Fl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Bh(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Fl.enqueueReplaceState(e,e.state,null)}function Du(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},lf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Cn(s):(s=en(e)?Tr:Ht.current,r.context=ys(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Iu(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Fl.enqueueReplaceState(r,r.state,null),ul(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Es(t,e){try{var n="",i=e;do n+=Y_(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function xc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Lu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var My=typeof WeakMap=="function"?WeakMap:Map;function Wg(t,e,n){n=mi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){ml||(ml=!0,Gu=i),Lu(t,e)},n}function jg(t,e,n){n=mi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Lu(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Lu(t,e),typeof i!="function"&&(Wi===null?Wi=new Set([this]):Wi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function zh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new My;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Fy.bind(null,t,e,n),e.then(t,t))}function Hh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Vh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=mi(-1,1),e.tag=2,Gi(n,e,1))),n.lanes|=1),t)}var Ey=Ti.ReactCurrentOwner,Qt=!1;function Wt(t,e,n,i){e.child=t===null?xg(e,null,n,i):Ss(e,t.child,n,i)}function Gh(t,e,n,i,r){n=n.render;var s=e.ref;return hs(e,r),i=hf(t,e,n,i,s,r),n=pf(),t!==null&&!Qt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,xi(t,e,r)):(ct&&n&&ef(e),e.flags|=1,Wt(t,e,i,r),e.child)}function Wh(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Tf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,qg(t,e,s,i,r)):(t=Ha(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:_o,n(o,i)&&t.ref===e.ref)return xi(t,e,r)}return e.flags|=1,t=qi(s,i),t.ref=e.ref,t.return=e,e.child=t}function qg(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(_o(s,i)&&t.ref===e.ref)if(Qt=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(Qt=!0);else return e.lanes=t.lanes,xi(t,e,r)}return Nu(t,e,n,i,r)}function Xg(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},rt(as,ln),ln|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,rt(as,ln),ln|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,rt(as,ln),ln|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,rt(as,ln),ln|=i;return Wt(t,e,r,n),e.child}function $g(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Nu(t,e,n,i,r){var s=en(n)?Tr:Ht.current;return s=ys(e,s),hs(e,r),n=hf(t,e,n,i,s,r),i=pf(),t!==null&&!Qt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,xi(t,e,r)):(ct&&i&&ef(e),e.flags|=1,Wt(t,e,n,r),e.child)}function jh(t,e,n,i,r){if(en(n)){var s=!0;sl(e)}else s=!1;if(hs(e,r),e.stateNode===null)ka(t,e),Gg(e,n,i),Du(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Cn(c):(c=en(n)?Tr:Ht.current,c=ys(e,c));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Bh(e,o,i,c),Li=!1;var d=e.memoizedState;o.state=d,ul(e,i,o,r),l=e.memoizedState,a!==i||d!==l||Jt.current||Li?(typeof f=="function"&&(Iu(e,n,f,i),l=e.memoizedState),(a=Li||kh(e,n,a,i,d,l,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Mg(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Nn(e.type,a),o.props=c,h=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Cn(l):(l=en(n)?Tr:Ht.current,l=ys(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==h||d!==l)&&Bh(e,o,i,l),Li=!1,d=e.memoizedState,o.state=d,ul(e,i,o,r);var g=e.memoizedState;a!==h||d!==g||Jt.current||Li?(typeof p=="function"&&(Iu(e,n,p,i),g=e.memoizedState),(c=Li||kh(e,n,c,i,d,g,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Uu(t,e,n,i,s,r)}function Uu(t,e,n,i,r,s){$g(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Ph(e,n,!1),xi(t,e,s);i=e.stateNode,Ey.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=Ss(e,t.child,null,s),e.child=Ss(e,null,a,s)):Wt(t,e,a,s),e.memoizedState=i.state,r&&Ph(e,n,!0),e.child}function Yg(t){var e=t.stateNode;e.pendingContext?Rh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Rh(t,e.context,!1),cf(t,e.containerInfo)}function qh(t,e,n,i,r){return xs(),nf(r),e.flags|=256,Wt(t,e,n,i),e.child}var Fu={dehydrated:null,treeContext:null,retryLane:0};function Ou(t){return{baseLanes:t,cachePool:null,transitions:null}}function Kg(t,e,n){var i=e.pendingProps,r=dt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),rt(dt,r&1),t===null)return Ru(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bl(o,i,0,null),t=Mr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ou(n),e.memoizedState=Fu,t):vf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Ty(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=qi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=qi(a,s):(s=Mr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Ou(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Fu,i}return s=t.child,t=s.sibling,i=qi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function vf(t,e){return e=Bl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ra(t,e,n,i){return i!==null&&nf(i),Ss(e,t.child,null,n),t=vf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Ty(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=xc(Error(ne(422))),ra(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Bl({mode:"visible",children:i.children},r,0,null),s=Mr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Ss(e,t.child,null,o),e.child.memoizedState=Ou(o),e.memoizedState=Fu,s);if(!(e.mode&1))return ra(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ne(419)),i=xc(s,i,void 0),ra(t,e,o,i)}if(a=(o&t.childLanes)!==0,Qt||a){if(i=Pt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,yi(t,r),Hn(i,t,r,-1))}return Ef(),i=xc(Error(ne(421))),ra(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Oy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,cn=Vi(r.nextSibling),un=e,ct=!0,Fn=null,t!==null&&(Sn[Mn++]=di,Sn[Mn++]=fi,Sn[Mn++]=wr,di=t.id,fi=t.overflow,wr=e),e=vf(e,i.children),e.flags|=4096,e)}function Xh(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Pu(t.return,e,n)}function Sc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Zg(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(Wt(t,e,i.children,n),i=dt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Xh(t,n,e);else if(t.tag===19)Xh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(rt(dt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&dl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Sc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&dl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Sc(e,!0,n,null,s);break;case"together":Sc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ka(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function xi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ar|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ne(153));if(e.child!==null){for(t=e.child,n=qi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=qi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function wy(t,e,n){switch(e.tag){case 3:Yg(e),xs();break;case 5:Eg(e);break;case 1:en(e.type)&&sl(e);break;case 4:cf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;rt(ll,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(rt(dt,dt.current&1),e.flags|=128,null):n&e.child.childLanes?Kg(t,e,n):(rt(dt,dt.current&1),t=xi(t,e,n),t!==null?t.sibling:null);rt(dt,dt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Zg(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),rt(dt,dt.current),i)break;return null;case 22:case 23:return e.lanes=0,Xg(t,e,n)}return xi(t,e,n)}var Qg,ku,Jg,ev;Qg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};ku=function(){};Jg=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,_r(Zn.current);var s=null;switch(n){case"input":r=ou(t,r),i=ou(t,i),s=[];break;case"select":r=ht({},r,{value:void 0}),i=ht({},i,{value:void 0}),s=[];break;case"textarea":r=cu(t,r),i=cu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=il)}du(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(uo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(uo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ot("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};ev=function(t,e,n,i){n!==i&&(e.flags|=4)};function Gs(t,e){if(!ct)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Ot(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Cy(t,e,n){var i=e.pendingProps;switch(tf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ot(e),null;case 1:return en(e.type)&&rl(),Ot(e),null;case 3:return i=e.stateNode,Ms(),at(Jt),at(Ht),df(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(na(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Fn!==null&&(qu(Fn),Fn=null))),ku(t,e),Ot(e),null;case 5:uf(e);var r=_r(Eo.current);if(n=e.type,t!==null&&e.stateNode!=null)Jg(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ne(166));return Ot(e),null}if(t=_r(Zn.current),na(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Xn]=e,i[So]=s,t=(e.mode&1)!==0,n){case"dialog":ot("cancel",i),ot("close",i);break;case"iframe":case"object":case"embed":ot("load",i);break;case"video":case"audio":for(r=0;r<Js.length;r++)ot(Js[r],i);break;case"source":ot("error",i);break;case"img":case"image":case"link":ot("error",i),ot("load",i);break;case"details":ot("toggle",i);break;case"input":nh(i,s),ot("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ot("invalid",i);break;case"textarea":rh(i,s),ot("invalid",i)}du(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ta(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ta(i.textContent,a,t),r=["children",""+a]):uo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ot("scroll",i)}switch(n){case"input":Xo(i),ih(i,s,!0);break;case"textarea":Xo(i),sh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=il)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=bm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Xn]=e,t[So]=i,Qg(t,e,!1,!1),e.stateNode=t;e:{switch(o=fu(n,i),n){case"dialog":ot("cancel",t),ot("close",t),r=i;break;case"iframe":case"object":case"embed":ot("load",t),r=i;break;case"video":case"audio":for(r=0;r<Js.length;r++)ot(Js[r],t);r=i;break;case"source":ot("error",t),r=i;break;case"img":case"image":case"link":ot("error",t),ot("load",t),r=i;break;case"details":ot("toggle",t),r=i;break;case"input":nh(t,i),r=ou(t,i),ot("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=ht({},i,{value:void 0}),ot("invalid",t);break;case"textarea":rh(t,i),r=cu(t,i),ot("invalid",t);break;default:r=i}du(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Im(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Rm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&fo(t,l):typeof l=="number"&&fo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(uo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ot("scroll",t):l!=null&&zd(t,s,l,o))}switch(n){case"input":Xo(t),ih(t,i,!1);break;case"textarea":Xo(t),sh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Yi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?cs(t,!!i.multiple,s,!1):i.defaultValue!=null&&cs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=il)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Ot(e),null;case 6:if(t&&e.stateNode!=null)ev(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ne(166));if(n=_r(Eo.current),_r(Zn.current),na(e)){if(i=e.stateNode,n=e.memoizedProps,i[Xn]=e,(s=i.nodeValue!==n)&&(t=un,t!==null))switch(t.tag){case 3:ta(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ta(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Xn]=e,e.stateNode=i}return Ot(e),null;case 13:if(at(dt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ct&&cn!==null&&e.mode&1&&!(e.flags&128))_g(),xs(),e.flags|=98560,s=!1;else if(s=na(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ne(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ne(317));s[Xn]=e}else xs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ot(e),s=!1}else Fn!==null&&(qu(Fn),Fn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||dt.current&1?wt===0&&(wt=3):Ef())),e.updateQueue!==null&&(e.flags|=4),Ot(e),null);case 4:return Ms(),ku(t,e),t===null&&yo(e.stateNode.containerInfo),Ot(e),null;case 10:return of(e.type._context),Ot(e),null;case 17:return en(e.type)&&rl(),Ot(e),null;case 19:if(at(dt),s=e.memoizedState,s===null)return Ot(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Gs(s,!1);else{if(wt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=dl(t),o!==null){for(e.flags|=128,Gs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return rt(dt,dt.current&1|2),e.child}t=t.sibling}s.tail!==null&&_t()>Ts&&(e.flags|=128,i=!0,Gs(s,!1),e.lanes=4194304)}else{if(!i)if(t=dl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Gs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ct)return Ot(e),null}else 2*_t()-s.renderingStartTime>Ts&&n!==1073741824&&(e.flags|=128,i=!0,Gs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=_t(),e.sibling=null,n=dt.current,rt(dt,i?n&1|2:n&1),e):(Ot(e),null);case 22:case 23:return Mf(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?ln&1073741824&&(Ot(e),e.subtreeFlags&6&&(e.flags|=8192)):Ot(e),null;case 24:return null;case 25:return null}throw Error(ne(156,e.tag))}function Ay(t,e){switch(tf(e),e.tag){case 1:return en(e.type)&&rl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ms(),at(Jt),at(Ht),df(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return uf(e),null;case 13:if(at(dt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ne(340));xs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return at(dt),null;case 4:return Ms(),null;case 10:return of(e.type._context),null;case 22:case 23:return Mf(),null;case 24:return null;default:return null}}var sa=!1,zt=!1,by=typeof WeakSet=="function"?WeakSet:Set,me=null;function os(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){gt(t,e,i)}else n.current=null}function Bu(t,e,n){try{n()}catch(i){gt(t,e,i)}}var $h=!1;function Ry(t,e){if(Mu=el,t=sg(),Jd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,f=0,h=t,d=null;t:for(;;){for(var p;h!==n||r!==0&&h.nodeType!==3||(a=o+r),h!==s||i!==0&&h.nodeType!==3||(l=o+i),h.nodeType===3&&(o+=h.nodeValue.length),(p=h.firstChild)!==null;)d=h,h=p;for(;;){if(h===t)break t;if(d===n&&++c===r&&(a=o),d===s&&++f===i&&(l=o),(p=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Eu={focusedElem:t,selectionRange:n},el=!1,me=e;me!==null;)if(e=me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,me=t;else for(;me!==null;){e=me;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var y=g.memoizedProps,m=g.memoizedState,u=e.stateNode,_=u.getSnapshotBeforeUpdate(e.elementType===e.type?y:Nn(e.type,y),m);u.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ne(163))}}catch(v){gt(e,e.return,v)}if(t=e.sibling,t!==null){t.return=e.return,me=t;break}me=e.return}return g=$h,$h=!1,g}function ao(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Bu(e,n,s)}r=r.next}while(r!==i)}}function Ol(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function zu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function tv(t){var e=t.alternate;e!==null&&(t.alternate=null,tv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Xn],delete e[So],delete e[Cu],delete e[dy],delete e[fy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function nv(t){return t.tag===5||t.tag===3||t.tag===4}function Yh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||nv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Hu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=il));else if(i!==4&&(t=t.child,t!==null))for(Hu(t,e,n),t=t.sibling;t!==null;)Hu(t,e,n),t=t.sibling}function Vu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Vu(t,e,n),t=t.sibling;t!==null;)Vu(t,e,n),t=t.sibling}var Dt=null,Un=!1;function wi(t,e,n){for(n=n.child;n!==null;)iv(t,e,n),n=n.sibling}function iv(t,e,n){if(Kn&&typeof Kn.onCommitFiberUnmount=="function")try{Kn.onCommitFiberUnmount(Rl,n)}catch{}switch(n.tag){case 5:zt||os(n,e);case 6:var i=Dt,r=Un;Dt=null,wi(t,e,n),Dt=i,Un=r,Dt!==null&&(Un?(t=Dt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Dt.removeChild(n.stateNode));break;case 18:Dt!==null&&(Un?(t=Dt,n=n.stateNode,t.nodeType===8?pc(t.parentNode,n):t.nodeType===1&&pc(t,n),go(t)):pc(Dt,n.stateNode));break;case 4:i=Dt,r=Un,Dt=n.stateNode.containerInfo,Un=!0,wi(t,e,n),Dt=i,Un=r;break;case 0:case 11:case 14:case 15:if(!zt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Bu(n,e,o),r=r.next}while(r!==i)}wi(t,e,n);break;case 1:if(!zt&&(os(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){gt(n,e,a)}wi(t,e,n);break;case 21:wi(t,e,n);break;case 22:n.mode&1?(zt=(i=zt)||n.memoizedState!==null,wi(t,e,n),zt=i):wi(t,e,n);break;default:wi(t,e,n)}}function Kh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new by),e.forEach(function(i){var r=ky.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Pn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Dt=a.stateNode,Un=!1;break e;case 3:Dt=a.stateNode.containerInfo,Un=!0;break e;case 4:Dt=a.stateNode.containerInfo,Un=!0;break e}a=a.return}if(Dt===null)throw Error(ne(160));iv(s,o,r),Dt=null,Un=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){gt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)rv(e,t),e=e.sibling}function rv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Pn(e,t),Wn(t),i&4){try{ao(3,t,t.return),Ol(3,t)}catch(y){gt(t,t.return,y)}try{ao(5,t,t.return)}catch(y){gt(t,t.return,y)}}break;case 1:Pn(e,t),Wn(t),i&512&&n!==null&&os(n,n.return);break;case 5:if(Pn(e,t),Wn(t),i&512&&n!==null&&os(n,n.return),t.flags&32){var r=t.stateNode;try{fo(r,"")}catch(y){gt(t,t.return,y)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Cm(r,s),fu(a,o);var c=fu(a,s);for(o=0;o<l.length;o+=2){var f=l[o],h=l[o+1];f==="style"?Im(r,h):f==="dangerouslySetInnerHTML"?Rm(r,h):f==="children"?fo(r,h):zd(r,f,h,c)}switch(a){case"input":au(r,s);break;case"textarea":Am(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?cs(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?cs(r,!!s.multiple,s.defaultValue,!0):cs(r,!!s.multiple,s.multiple?[]:"",!1))}r[So]=s}catch(y){gt(t,t.return,y)}}break;case 6:if(Pn(e,t),Wn(t),i&4){if(t.stateNode===null)throw Error(ne(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(y){gt(t,t.return,y)}}break;case 3:if(Pn(e,t),Wn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{go(e.containerInfo)}catch(y){gt(t,t.return,y)}break;case 4:Pn(e,t),Wn(t);break;case 13:Pn(e,t),Wn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(xf=_t())),i&4&&Kh(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(zt=(c=zt)||f,Pn(e,t),zt=c):Pn(e,t),Wn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(me=t,f=t.child;f!==null;){for(h=me=f;me!==null;){switch(d=me,p=d.child,d.tag){case 0:case 11:case 14:case 15:ao(4,d,d.return);break;case 1:os(d,d.return);var g=d.stateNode;if(typeof g.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(y){gt(i,n,y)}}break;case 5:os(d,d.return);break;case 22:if(d.memoizedState!==null){Qh(h);continue}}p!==null?(p.return=d,me=p):Qh(h)}f=f.sibling}e:for(f=null,h=t;;){if(h.tag===5){if(f===null){f=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=h.stateNode,l=h.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Pm("display",o))}catch(y){gt(t,t.return,y)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(y){gt(t,t.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Pn(e,t),Wn(t),i&4&&Kh(t);break;case 21:break;default:Pn(e,t),Wn(t)}}function Wn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(nv(n)){var i=n;break e}n=n.return}throw Error(ne(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(fo(r,""),i.flags&=-33);var s=Yh(t);Vu(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Yh(t);Hu(t,a,o);break;default:throw Error(ne(161))}}catch(l){gt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Py(t,e,n){me=t,sv(t)}function sv(t,e,n){for(var i=(t.mode&1)!==0;me!==null;){var r=me,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||sa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||zt;a=sa;var c=zt;if(sa=o,(zt=l)&&!c)for(me=r;me!==null;)o=me,l=o.child,o.tag===22&&o.memoizedState!==null?Jh(r):l!==null?(l.return=o,me=l):Jh(r);for(;s!==null;)me=s,sv(s),s=s.sibling;me=r,sa=a,zt=c}Zh(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,me=s):Zh(t)}}function Zh(t){for(;me!==null;){var e=me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:zt||Ol(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!zt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Nn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Uh(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Uh(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&go(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ne(163))}zt||e.flags&512&&zu(e)}catch(d){gt(e,e.return,d)}}if(e===t){me=null;break}if(n=e.sibling,n!==null){n.return=e.return,me=n;break}me=e.return}}function Qh(t){for(;me!==null;){var e=me;if(e===t){me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,me=n;break}me=e.return}}function Jh(t){for(;me!==null;){var e=me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Ol(4,e)}catch(l){gt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){gt(e,r,l)}}var s=e.return;try{zu(e)}catch(l){gt(e,s,l)}break;case 5:var o=e.return;try{zu(e)}catch(l){gt(e,o,l)}}}catch(l){gt(e,e.return,l)}if(e===t){me=null;break}var a=e.sibling;if(a!==null){a.return=e.return,me=a;break}me=e.return}}var Iy=Math.ceil,pl=Ti.ReactCurrentDispatcher,_f=Ti.ReactCurrentOwner,wn=Ti.ReactCurrentBatchConfig,je=0,Pt=null,Mt=null,Lt=0,ln=0,as=Ji(0),wt=0,Ao=null,Ar=0,kl=0,yf=0,lo=null,Zt=null,xf=0,Ts=1/0,li=null,ml=!1,Gu=null,Wi=null,oa=!1,ki=null,gl=0,co=0,Wu=null,Ba=-1,za=0;function jt(){return je&6?_t():Ba!==-1?Ba:Ba=_t()}function ji(t){return t.mode&1?je&2&&Lt!==0?Lt&-Lt:py.transition!==null?(za===0&&(za=Gm()),za):(t=et,t!==0||(t=window.event,t=t===void 0?16:Km(t.type)),t):1}function Hn(t,e,n,i){if(50<co)throw co=0,Wu=null,Error(ne(185));Lo(t,n,i),(!(je&2)||t!==Pt)&&(t===Pt&&(!(je&2)&&(kl|=n),wt===4&&Ui(t,Lt)),tn(t,i),n===1&&je===0&&!(e.mode&1)&&(Ts=_t()+500,Nl&&er()))}function tn(t,e){var n=t.callbackNode;p0(t,e);var i=Ja(t,t===Pt?Lt:0);if(i===0)n!==null&&lh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&lh(n),e===1)t.tag===0?hy(ep.bind(null,t)):mg(ep.bind(null,t)),cy(function(){!(je&6)&&er()}),n=null;else{switch(Wm(i)){case 1:n=jd;break;case 4:n=Hm;break;case 16:n=Qa;break;case 536870912:n=Vm;break;default:n=Qa}n=hv(n,ov.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function ov(t,e){if(Ba=-1,za=0,je&6)throw Error(ne(327));var n=t.callbackNode;if(ps()&&t.callbackNode!==n)return null;var i=Ja(t,t===Pt?Lt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=vl(t,i);else{e=i;var r=je;je|=2;var s=lv();(Pt!==t||Lt!==e)&&(li=null,Ts=_t()+500,Sr(t,e));do try{Ny();break}catch(a){av(t,a)}while(!0);sf(),pl.current=s,je=r,Mt!==null?e=0:(Pt=null,Lt=0,e=wt)}if(e!==0){if(e===2&&(r=vu(t),r!==0&&(i=r,e=ju(t,r))),e===1)throw n=Ao,Sr(t,0),Ui(t,i),tn(t,_t()),n;if(e===6)Ui(t,i);else{if(r=t.current.alternate,!(i&30)&&!Dy(r)&&(e=vl(t,i),e===2&&(s=vu(t),s!==0&&(i=s,e=ju(t,s))),e===1))throw n=Ao,Sr(t,0),Ui(t,i),tn(t,_t()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ne(345));case 2:ur(t,Zt,li);break;case 3:if(Ui(t,i),(i&130023424)===i&&(e=xf+500-_t(),10<e)){if(Ja(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){jt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=wu(ur.bind(null,t,Zt,li),e);break}ur(t,Zt,li);break;case 4:if(Ui(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-zn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=_t()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Iy(i/1960))-i,10<i){t.timeoutHandle=wu(ur.bind(null,t,Zt,li),i);break}ur(t,Zt,li);break;case 5:ur(t,Zt,li);break;default:throw Error(ne(329))}}}return tn(t,_t()),t.callbackNode===n?ov.bind(null,t):null}function ju(t,e){var n=lo;return t.current.memoizedState.isDehydrated&&(Sr(t,e).flags|=256),t=vl(t,e),t!==2&&(e=Zt,Zt=n,e!==null&&qu(e)),t}function qu(t){Zt===null?Zt=t:Zt.push.apply(Zt,t)}function Dy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Gn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ui(t,e){for(e&=~yf,e&=~kl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-zn(e),i=1<<n;t[n]=-1,e&=~i}}function ep(t){if(je&6)throw Error(ne(327));ps();var e=Ja(t,0);if(!(e&1))return tn(t,_t()),null;var n=vl(t,e);if(t.tag!==0&&n===2){var i=vu(t);i!==0&&(e=i,n=ju(t,i))}if(n===1)throw n=Ao,Sr(t,0),Ui(t,e),tn(t,_t()),n;if(n===6)throw Error(ne(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ur(t,Zt,li),tn(t,_t()),null}function Sf(t,e){var n=je;je|=1;try{return t(e)}finally{je=n,je===0&&(Ts=_t()+500,Nl&&er())}}function br(t){ki!==null&&ki.tag===0&&!(je&6)&&ps();var e=je;je|=1;var n=wn.transition,i=et;try{if(wn.transition=null,et=1,t)return t()}finally{et=i,wn.transition=n,je=e,!(je&6)&&er()}}function Mf(){ln=as.current,at(as)}function Sr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ly(n)),Mt!==null)for(n=Mt.return;n!==null;){var i=n;switch(tf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&rl();break;case 3:Ms(),at(Jt),at(Ht),df();break;case 5:uf(i);break;case 4:Ms();break;case 13:at(dt);break;case 19:at(dt);break;case 10:of(i.type._context);break;case 22:case 23:Mf()}n=n.return}if(Pt=t,Mt=t=qi(t.current,null),Lt=ln=e,wt=0,Ao=null,yf=kl=Ar=0,Zt=lo=null,vr!==null){for(e=0;e<vr.length;e++)if(n=vr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}vr=null}return t}function av(t,e){do{var n=Mt;try{if(sf(),Fa.current=hl,fl){for(var i=ft.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}fl=!1}if(Cr=0,Rt=Tt=ft=null,oo=!1,To=0,_f.current=null,n===null||n.return===null){wt=1,Ao=e,Mt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Lt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=a,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Hh(o);if(p!==null){p.flags&=-257,Vh(p,o,a,s,e),p.mode&1&&zh(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var y=new Set;y.add(l),e.updateQueue=y}else g.add(l);break e}else{if(!(e&1)){zh(s,c,e),Ef();break e}l=Error(ne(426))}}else if(ct&&a.mode&1){var m=Hh(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Vh(m,o,a,s,e),nf(Es(l,a));break e}}s=l=Es(l,a),wt!==4&&(wt=2),lo===null?lo=[s]:lo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=Wg(s,l,e);Nh(s,u);break e;case 1:a=l;var _=s.type,x=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(Wi===null||!Wi.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var v=jg(s,a,e);Nh(s,v);break e}}s=s.return}while(s!==null)}uv(n)}catch(P){e=P,Mt===n&&n!==null&&(Mt=n=n.return);continue}break}while(!0)}function lv(){var t=pl.current;return pl.current=hl,t===null?hl:t}function Ef(){(wt===0||wt===3||wt===2)&&(wt=4),Pt===null||!(Ar&268435455)&&!(kl&268435455)||Ui(Pt,Lt)}function vl(t,e){var n=je;je|=2;var i=lv();(Pt!==t||Lt!==e)&&(li=null,Sr(t,e));do try{Ly();break}catch(r){av(t,r)}while(!0);if(sf(),je=n,pl.current=i,Mt!==null)throw Error(ne(261));return Pt=null,Lt=0,wt}function Ly(){for(;Mt!==null;)cv(Mt)}function Ny(){for(;Mt!==null&&!s0();)cv(Mt)}function cv(t){var e=fv(t.alternate,t,ln);t.memoizedProps=t.pendingProps,e===null?uv(t):Mt=e,_f.current=null}function uv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Ay(n,e),n!==null){n.flags&=32767,Mt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{wt=6,Mt=null;return}}else if(n=Cy(n,e,ln),n!==null){Mt=n;return}if(e=e.sibling,e!==null){Mt=e;return}Mt=e=t}while(e!==null);wt===0&&(wt=5)}function ur(t,e,n){var i=et,r=wn.transition;try{wn.transition=null,et=1,Uy(t,e,n,i)}finally{wn.transition=r,et=i}return null}function Uy(t,e,n,i){do ps();while(ki!==null);if(je&6)throw Error(ne(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ne(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(m0(t,s),t===Pt&&(Mt=Pt=null,Lt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||oa||(oa=!0,hv(Qa,function(){return ps(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=wn.transition,wn.transition=null;var o=et;et=1;var a=je;je|=4,_f.current=null,Ry(t,n),rv(n,t),ty(Eu),el=!!Mu,Eu=Mu=null,t.current=n,Py(n),o0(),je=a,et=o,wn.transition=s}else t.current=n;if(oa&&(oa=!1,ki=t,gl=r),s=t.pendingLanes,s===0&&(Wi=null),c0(n.stateNode),tn(t,_t()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(ml)throw ml=!1,t=Gu,Gu=null,t;return gl&1&&t.tag!==0&&ps(),s=t.pendingLanes,s&1?t===Wu?co++:(co=0,Wu=t):co=0,er(),null}function ps(){if(ki!==null){var t=Wm(gl),e=wn.transition,n=et;try{if(wn.transition=null,et=16>t?16:t,ki===null)var i=!1;else{if(t=ki,ki=null,gl=0,je&6)throw Error(ne(331));var r=je;for(je|=4,me=t.current;me!==null;){var s=me,o=s.child;if(me.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(me=c;me!==null;){var f=me;switch(f.tag){case 0:case 11:case 15:ao(8,f,s)}var h=f.child;if(h!==null)h.return=f,me=h;else for(;me!==null;){f=me;var d=f.sibling,p=f.return;if(tv(f),f===c){me=null;break}if(d!==null){d.return=p,me=d;break}me=p}}}var g=s.alternate;if(g!==null){var y=g.child;if(y!==null){g.child=null;do{var m=y.sibling;y.sibling=null,y=m}while(y!==null)}}me=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,me=o;else e:for(;me!==null;){if(s=me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ao(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,me=u;break e}me=s.return}}var _=t.current;for(me=_;me!==null;){o=me;var x=o.child;if(o.subtreeFlags&2064&&x!==null)x.return=o,me=x;else e:for(o=_;me!==null;){if(a=me,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Ol(9,a)}}catch(P){gt(a,a.return,P)}if(a===o){me=null;break e}var v=a.sibling;if(v!==null){v.return=a.return,me=v;break e}me=a.return}}if(je=r,er(),Kn&&typeof Kn.onPostCommitFiberRoot=="function")try{Kn.onPostCommitFiberRoot(Rl,t)}catch{}i=!0}return i}finally{et=n,wn.transition=e}}return!1}function tp(t,e,n){e=Es(n,e),e=Wg(t,e,1),t=Gi(t,e,1),e=jt(),t!==null&&(Lo(t,1,e),tn(t,e))}function gt(t,e,n){if(t.tag===3)tp(t,t,n);else for(;e!==null;){if(e.tag===3){tp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Wi===null||!Wi.has(i))){t=Es(n,t),t=jg(e,t,1),e=Gi(e,t,1),t=jt(),e!==null&&(Lo(e,1,t),tn(e,t));break}}e=e.return}}function Fy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=jt(),t.pingedLanes|=t.suspendedLanes&n,Pt===t&&(Lt&n)===n&&(wt===4||wt===3&&(Lt&130023424)===Lt&&500>_t()-xf?Sr(t,0):yf|=n),tn(t,e)}function dv(t,e){e===0&&(t.mode&1?(e=Ko,Ko<<=1,!(Ko&130023424)&&(Ko=4194304)):e=1);var n=jt();t=yi(t,e),t!==null&&(Lo(t,e,n),tn(t,n))}function Oy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),dv(t,n)}function ky(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ne(314))}i!==null&&i.delete(e),dv(t,n)}var fv;fv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Jt.current)Qt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Qt=!1,wy(t,e,n);Qt=!!(t.flags&131072)}else Qt=!1,ct&&e.flags&1048576&&gg(e,al,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ka(t,e),t=e.pendingProps;var r=ys(e,Ht.current);hs(e,n),r=hf(null,e,i,t,r,n);var s=pf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,en(i)?(s=!0,sl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,lf(e),r.updater=Fl,e.stateNode=r,r._reactInternals=e,Du(e,i,t,n),e=Uu(null,e,i,!0,s,n)):(e.tag=0,ct&&s&&ef(e),Wt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(ka(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=zy(i),t=Nn(i,t),r){case 0:e=Nu(null,e,i,t,n);break e;case 1:e=jh(null,e,i,t,n);break e;case 11:e=Gh(null,e,i,t,n);break e;case 14:e=Wh(null,e,i,Nn(i.type,t),n);break e}throw Error(ne(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Nn(i,r),Nu(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Nn(i,r),jh(t,e,i,r,n);case 3:e:{if(Yg(e),t===null)throw Error(ne(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Mg(t,e),ul(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Es(Error(ne(423)),e),e=qh(t,e,i,n,r);break e}else if(i!==r){r=Es(Error(ne(424)),e),e=qh(t,e,i,n,r);break e}else for(cn=Vi(e.stateNode.containerInfo.firstChild),un=e,ct=!0,Fn=null,n=xg(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(xs(),i===r){e=xi(t,e,n);break e}Wt(t,e,i,n)}e=e.child}return e;case 5:return Eg(e),t===null&&Ru(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Tu(i,r)?o=null:s!==null&&Tu(i,s)&&(e.flags|=32),$g(t,e),Wt(t,e,o,n),e.child;case 6:return t===null&&Ru(e),null;case 13:return Kg(t,e,n);case 4:return cf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ss(e,null,i,n):Wt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Nn(i,r),Gh(t,e,i,r,n);case 7:return Wt(t,e,e.pendingProps,n),e.child;case 8:return Wt(t,e,e.pendingProps.children,n),e.child;case 12:return Wt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,rt(ll,i._currentValue),i._currentValue=o,s!==null)if(Gn(s.value,o)){if(s.children===r.children&&!Jt.current){e=xi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=mi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Pu(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ne(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Pu(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Wt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,hs(e,n),r=Cn(r),i=i(r),e.flags|=1,Wt(t,e,i,n),e.child;case 14:return i=e.type,r=Nn(i,e.pendingProps),r=Nn(i.type,r),Wh(t,e,i,r,n);case 15:return qg(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Nn(i,r),ka(t,e),e.tag=1,en(i)?(t=!0,sl(e)):t=!1,hs(e,n),Gg(e,i,r),Du(e,i,r,n),Uu(null,e,i,!0,t,n);case 19:return Zg(t,e,n);case 22:return Xg(t,e,n)}throw Error(ne(156,e.tag))};function hv(t,e){return zm(t,e)}function By(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Tn(t,e,n,i){return new By(t,e,n,i)}function Tf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function zy(t){if(typeof t=="function")return Tf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Vd)return 11;if(t===Gd)return 14}return 2}function qi(t,e){var n=t.alternate;return n===null?(n=Tn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ha(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Tf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Zr:return Mr(n.children,r,s,e);case Hd:o=8,r|=8;break;case nu:return t=Tn(12,n,e,r|2),t.elementType=nu,t.lanes=s,t;case iu:return t=Tn(13,n,e,r),t.elementType=iu,t.lanes=s,t;case ru:return t=Tn(19,n,e,r),t.elementType=ru,t.lanes=s,t;case Em:return Bl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Sm:o=10;break e;case Mm:o=9;break e;case Vd:o=11;break e;case Gd:o=14;break e;case Di:o=16,i=null;break e}throw Error(ne(130,t==null?t:typeof t,""))}return e=Tn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Mr(t,e,n,i){return t=Tn(7,t,i,e),t.lanes=n,t}function Bl(t,e,n,i){return t=Tn(22,t,i,e),t.elementType=Em,t.lanes=n,t.stateNode={isHidden:!1},t}function Mc(t,e,n){return t=Tn(6,t,null,e),t.lanes=n,t}function Ec(t,e,n){return e=Tn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Hy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ic(0),this.expirationTimes=ic(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ic(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function wf(t,e,n,i,r,s,o,a,l){return t=new Hy(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Tn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},lf(s),t}function Vy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function pv(t){if(!t)return Ki;t=t._reactInternals;e:{if(Dr(t)!==t||t.tag!==1)throw Error(ne(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(en(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ne(171))}if(t.tag===1){var n=t.type;if(en(n))return pg(t,n,e)}return e}function mv(t,e,n,i,r,s,o,a,l){return t=wf(n,i,!0,t,r,s,o,a,l),t.context=pv(null),n=t.current,i=jt(),r=ji(n),s=mi(i,r),s.callback=e??null,Gi(n,s,r),t.current.lanes=r,Lo(t,r,i),tn(t,i),t}function zl(t,e,n,i){var r=e.current,s=jt(),o=ji(r);return n=pv(n),e.context===null?e.context=n:e.pendingContext=n,e=mi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Gi(r,e,o),t!==null&&(Hn(t,r,o,s),Ua(t,r,o)),o}function _l(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function np(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Cf(t,e){np(t,e),(t=t.alternate)&&np(t,e)}function Gy(){return null}var gv=typeof reportError=="function"?reportError:function(t){console.error(t)};function Af(t){this._internalRoot=t}Hl.prototype.render=Af.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ne(409));zl(t,e,null,null)};Hl.prototype.unmount=Af.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;br(function(){zl(null,t,null,null)}),e[_i]=null}};function Hl(t){this._internalRoot=t}Hl.prototype.unstable_scheduleHydration=function(t){if(t){var e=Xm();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ni.length&&e!==0&&e<Ni[n].priority;n++);Ni.splice(n,0,t),n===0&&Ym(t)}};function bf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Vl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function ip(){}function Wy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=_l(o);s.call(c)}}var o=mv(e,i,t,0,null,!1,!1,"",ip);return t._reactRootContainer=o,t[_i]=o.current,yo(t.nodeType===8?t.parentNode:t),br(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=_l(l);a.call(c)}}var l=wf(t,0,!1,null,null,!1,!1,"",ip);return t._reactRootContainer=l,t[_i]=l.current,yo(t.nodeType===8?t.parentNode:t),br(function(){zl(e,l,n,i)}),l}function Gl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=_l(o);a.call(l)}}zl(e,o,t,r)}else o=Wy(n,e,t,r,i);return _l(o)}jm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Qs(e.pendingLanes);n!==0&&(qd(e,n|1),tn(e,_t()),!(je&6)&&(Ts=_t()+500,er()))}break;case 13:br(function(){var i=yi(t,1);if(i!==null){var r=jt();Hn(i,t,1,r)}}),Cf(t,1)}};Xd=function(t){if(t.tag===13){var e=yi(t,134217728);if(e!==null){var n=jt();Hn(e,t,134217728,n)}Cf(t,134217728)}};qm=function(t){if(t.tag===13){var e=ji(t),n=yi(t,e);if(n!==null){var i=jt();Hn(n,t,e,i)}Cf(t,e)}};Xm=function(){return et};$m=function(t,e){var n=et;try{return et=t,e()}finally{et=n}};pu=function(t,e,n){switch(e){case"input":if(au(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Ll(i);if(!r)throw Error(ne(90));wm(i),au(i,r)}}}break;case"textarea":Am(t,n);break;case"select":e=n.value,e!=null&&cs(t,!!n.multiple,e,!1)}};Nm=Sf;Um=br;var jy={usingClientEntryPoint:!1,Events:[Uo,ts,Ll,Dm,Lm,Sf]},Ws={findFiberByHostInstance:gr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qy={bundleType:Ws.bundleType,version:Ws.version,rendererPackageName:Ws.rendererPackageName,rendererConfig:Ws.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ti.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=km(t),t===null?null:t.stateNode},findFiberByHostInstance:Ws.findFiberByHostInstance||Gy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var aa=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!aa.isDisabled&&aa.supportsFiber)try{Rl=aa.inject(qy),Kn=aa}catch{}}pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=jy;pn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bf(e))throw Error(ne(200));return Vy(t,e,null,n)};pn.createRoot=function(t,e){if(!bf(t))throw Error(ne(299));var n=!1,i="",r=gv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=wf(t,1,!1,null,null,n,!1,i,r),t[_i]=e.current,yo(t.nodeType===8?t.parentNode:t),new Af(e)};pn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ne(188)):(t=Object.keys(t).join(","),Error(ne(268,t)));return t=km(e),t=t===null?null:t.stateNode,t};pn.flushSync=function(t){return br(t)};pn.hydrate=function(t,e,n){if(!Vl(e))throw Error(ne(200));return Gl(null,t,e,!0,n)};pn.hydrateRoot=function(t,e,n){if(!bf(t))throw Error(ne(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=gv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=mv(e,null,t,1,n??null,r,!1,s,o),t[_i]=e.current,yo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Hl(e)};pn.render=function(t,e,n){if(!Vl(e))throw Error(ne(200));return Gl(null,t,e,!1,n)};pn.unmountComponentAtNode=function(t){if(!Vl(t))throw Error(ne(40));return t._reactRootContainer?(br(function(){Gl(null,null,t,!1,function(){t._reactRootContainer=null,t[_i]=null})}),!0):!1};pn.unstable_batchedUpdates=Sf;pn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!Vl(n))throw Error(ne(200));if(t==null||t._reactInternals===void 0)throw Error(ne(38));return Gl(t,e,n,!1,i)};pn.version="18.3.1-next-f1338f8080-20240426";function vv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vv)}catch(t){console.error(t)}}vv(),vm.exports=pn;var Wl=vm.exports;const Rf=Al(Wl);var rp=Wl;eu.createRoot=rp.createRoot,eu.hydrateRoot=rp.hydrateRoot;var _v={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var e={}.hasOwnProperty;function n(){for(var s="",o=0;o<arguments.length;o++){var a=arguments[o];a&&(s=r(s,i(a)))}return s}function i(s){if(typeof s=="string"||typeof s=="number")return s;if(typeof s!="object")return"";if(Array.isArray(s))return n.apply(null,s);if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]"))return s.toString();var o="";for(var a in s)e.call(s,a)&&s[a]&&(o=r(o,a));return o}function r(s,o){return o?s?s+" "+o:s+o:s}t.exports?(n.default=n,t.exports=n):window.classNames=n})()})(_v);var Xy=_v.exports;const $t=Al(Xy),$y=["xxl","xl","lg","md","sm","xs"],Yy="xs",jl=J.createContext({prefixes:{},breakpoints:$y,minBreakpoint:Yy}),{Consumer:Qw,Provider:Jw}=jl;function hn(t,e){const{prefixes:n}=J.useContext(jl);return t||n[e]||e}function Ky(){const{breakpoints:t}=J.useContext(jl);return t}function Zy(){const{minBreakpoint:t}=J.useContext(jl);return t}var yv={exports:{}},Qy="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Jy=Qy,ex=Jy;function xv(){}function Sv(){}Sv.resetWarningCache=xv;var tx=function(){function t(i,r,s,o,a,l){if(l!==ex){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}t.isRequired=t;function e(){return t}var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:Sv,resetWarningCache:xv};return n.PropTypes=n,n};yv.exports=tx();var nx=yv.exports;const ms=Al(nx);function ix(t,e){return J.Children.toArray(t).some(n=>J.isValidElement(n)&&n.type===e)}function rx({as:t,bsPrefix:e,className:n,...i}){e=hn(e,"col");const r=Ky(),s=Zy(),o=[],a=[];return r.forEach(l=>{const c=i[l];delete i[l];let f,h,d;typeof c=="object"&&c!=null?{span:f,offset:h,order:d}=c:f=c;const p=l!==s?`-${l}`:"";f&&o.push(f===!0?`${e}${p}`:`${e}${p}-${f}`),d!=null&&a.push(`order${p}-${d}`),h!=null&&a.push(`offset${p}-${h}`)}),[{...i,className:$t(n,...o,...a)},{as:t,bsPrefix:e,spans:o}]}const Mv=J.forwardRef((t,e)=>{const[{className:n,...i},{as:r="div",bsPrefix:s,spans:o}]=rx(t);return b.jsx(r,{...i,ref:e,className:$t(n,!o.length&&s)})});Mv.displayName="Col";const Ev=J.forwardRef(({bsPrefix:t,fluid:e=!1,as:n="div",className:i,...r},s)=>{const o=hn(t,"container"),a=typeof e=="string"?`-${e}`:"-fluid";return b.jsx(n,{ref:s,...r,className:$t(i,e?`${o}${a}`:o)})});Ev.displayName="Container";const sx={type:ms.string,tooltip:ms.bool,as:ms.elementType},ql=J.forwardRef(({as:t="div",className:e,type:n="valid",tooltip:i=!1,...r},s)=>b.jsx(t,{...r,ref:s,className:$t(e,`${n}-${i?"tooltip":"feedback"}`)}));ql.displayName="Feedback";ql.propTypes=sx;const Si=J.createContext({}),Pf=J.forwardRef(({id:t,bsPrefix:e,className:n,type:i="checkbox",isValid:r=!1,isInvalid:s=!1,as:o="input",...a},l)=>{const{controlId:c}=J.useContext(Si);return e=hn(e,"form-check-input"),b.jsx(o,{...a,ref:l,type:i,id:t||c,className:$t(n,e,r&&"is-valid",s&&"is-invalid")})});Pf.displayName="FormCheckInput";const yl=J.forwardRef(({bsPrefix:t,className:e,htmlFor:n,...i},r)=>{const{controlId:s}=J.useContext(Si);return t=hn(t,"form-check-label"),b.jsx("label",{...i,ref:r,htmlFor:n||s,className:$t(e,t)})});yl.displayName="FormCheckLabel";const Tv=J.forwardRef(({id:t,bsPrefix:e,bsSwitchPrefix:n,inline:i=!1,reverse:r=!1,disabled:s=!1,isValid:o=!1,isInvalid:a=!1,feedbackTooltip:l=!1,feedback:c,feedbackType:f,className:h,style:d,title:p="",type:g="checkbox",label:y,children:m,as:u="input",..._},x)=>{e=hn(e,"form-check"),n=hn(n,"form-switch");const{controlId:v}=J.useContext(Si),P=J.useMemo(()=>({controlId:t||v}),[v,t]),C=!m&&y!=null&&y!==!1||ix(m,yl),M=b.jsx(Pf,{..._,type:g==="switch"?"checkbox":g,ref:x,isValid:o,isInvalid:a,disabled:s,as:u});return b.jsx(Si.Provider,{value:P,children:b.jsx("div",{style:d,className:$t(h,C&&e,i&&`${e}-inline`,r&&`${e}-reverse`,g==="switch"&&n),children:m||b.jsxs(b.Fragment,{children:[M,C&&b.jsx(yl,{title:p,children:y}),c&&b.jsx(ql,{type:f,tooltip:l,children:c})]})})})});Tv.displayName="FormCheck";const xl=Object.assign(Tv,{Input:Pf,Label:yl}),wv=J.forwardRef(({bsPrefix:t,type:e,size:n,htmlSize:i,id:r,className:s,isValid:o=!1,isInvalid:a=!1,plaintext:l,readOnly:c,as:f="input",...h},d)=>{const{controlId:p}=J.useContext(Si);return t=hn(t,"form-control"),b.jsx(f,{...h,type:e,size:i,ref:d,readOnly:c,id:r||p,className:$t(s,l?`${t}-plaintext`:t,n&&`${t}-${n}`,e==="color"&&`${t}-color`,o&&"is-valid",a&&"is-invalid")})});wv.displayName="FormControl";const ox=Object.assign(wv,{Feedback:ql}),Cv=J.forwardRef(({className:t,bsPrefix:e,as:n="div",...i},r)=>(e=hn(e,"form-floating"),b.jsx(n,{ref:r,className:$t(t,e),...i})));Cv.displayName="FormFloating";const If=J.forwardRef(({controlId:t,as:e="div",...n},i)=>{const r=J.useMemo(()=>({controlId:t}),[t]);return b.jsx(Si.Provider,{value:r,children:b.jsx(e,{...n,ref:i})})});If.displayName="FormGroup";const Av=J.forwardRef(({as:t="label",bsPrefix:e,column:n=!1,visuallyHidden:i=!1,className:r,htmlFor:s,...o},a)=>{const{controlId:l}=J.useContext(Si);e=hn(e,"form-label");let c="col-form-label";typeof n=="string"&&(c=`${c} ${c}-${n}`);const f=$t(r,e,i&&"visually-hidden",n&&c);return s=s||l,n?b.jsx(Mv,{ref:a,as:"label",className:f,htmlFor:s,...o}):b.jsx(t,{ref:a,className:f,htmlFor:s,...o})});Av.displayName="FormLabel";const bv=J.forwardRef(({bsPrefix:t,className:e,id:n,...i},r)=>{const{controlId:s}=J.useContext(Si);return t=hn(t,"form-range"),b.jsx("input",{...i,type:"range",ref:r,className:$t(e,t),id:n||s})});bv.displayName="FormRange";const Rv=J.forwardRef(({bsPrefix:t,size:e,htmlSize:n,className:i,isValid:r=!1,isInvalid:s=!1,id:o,...a},l)=>{const{controlId:c}=J.useContext(Si);return t=hn(t,"form-select"),b.jsx("select",{...a,size:n,ref:l,className:$t(i,t,e&&`${t}-${e}`,r&&"is-valid",s&&"is-invalid"),id:o||c})});Rv.displayName="FormSelect";const Pv=J.forwardRef(({bsPrefix:t,className:e,as:n="small",muted:i,...r},s)=>(t=hn(t,"form-text"),b.jsx(n,{...r,ref:s,className:$t(e,t,i&&"text-muted")})));Pv.displayName="FormText";const Iv=J.forwardRef((t,e)=>b.jsx(xl,{...t,ref:e,type:"switch"}));Iv.displayName="Switch";const ax=Object.assign(Iv,{Input:xl.Input,Label:xl.Label}),Dv=J.forwardRef(({bsPrefix:t,className:e,children:n,controlId:i,label:r,...s},o)=>(t=hn(t,"form-floating"),b.jsxs(If,{ref:o,className:$t(e,t),controlId:i,...s,children:[n,b.jsx("label",{htmlFor:i,children:r})]})));Dv.displayName="FloatingLabel";const lx={_ref:ms.any,validated:ms.bool,as:ms.elementType},Df=J.forwardRef(({className:t,validated:e,as:n="form",...i},r)=>b.jsx(n,{...i,ref:r,className:$t(t,e&&"was-validated")}));Df.displayName="Form";Df.propTypes=lx;const cx=Object.assign(Df,{Group:If,Control:ox,Floating:Cv,Check:xl,Switch:ax,Label:Av,Text:Pv,Range:bv,Select:Rv,FloatingLabel:Dv});function ux(t){if(t===null)return 0;switch(t){case"A+":return 4;case"A":return 3.7;case"A-":return 3.4;case"B+":return 3.2;case"B":return 3;case"B-":return 2.8;case"C+":return 2.6;case"C":return 2.4;case"C-":return 2.2;case"D+":return 2;case"D":return 1.5;case"D-":return 1;case"F":return 0;default:return 0}}function Lv(t){if(t.length===0)return 0;const e=t.filter(r=>r.grade!==null);if(e.length===0)return 0;let n=0,i=0;return e.forEach(r=>{const s=ux(r.grade);n+=s*r.hours,i+=r.hours}),i>0?n/i:0}function dx(t){if(t===null)return"#9ca3af";switch(t){case"A+":return"#16a34a";case"A":return"#22c55e";case"A-":return"#4ade80";case"B+":return"#65a30d";case"B":return"#84cc16";case"B-":return"#a3e635";case"C+":return"#eab308";case"C":return"#fbbf24";case"C-":return"#fcd34d";case"D+":return"#f97316";case"D":return"#fb923c";case"D-":return"#dc2626";case"F":return"#b91c1c";default:return"#6b7280"}}function Nv(t){return{backgroundColor:dx(t),color:"#ffffff"}}const mr=class mr{constructor(){Wo(this,"activeDropdown",null);Wo(this,"callbacks",new Map)}static getInstance(){return mr.instance||(mr.instance=new mr),mr.instance}register(e,n){this.callbacks.set(e,n)}unregister(e){this.callbacks.delete(e)}openDropdown(e){if(this.activeDropdown&&this.activeDropdown!==e){const n=this.callbacks.get(this.activeDropdown);n&&n()}this.activeDropdown=e}closeDropdown(e){this.activeDropdown===e&&(this.activeDropdown=null)}closeAllDropdowns(){this.callbacks.forEach(e=>{e()}),this.activeDropdown=null}};Wo(mr,"instance");let Sl=mr;const sp=["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"],fx=({onSelectGrade:t,triggerRef:e})=>{const n=J.useRef(null),[i,r]=J.useState({top:0,left:0}),[s,o]=J.useState(null);return J.useEffect(()=>{const a=document.createElement("div");return a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.width="0",a.style.height="0",a.style.overflow="visible",a.style.pointerEvents="none",a.style.zIndex="100000",document.body.appendChild(a),o(a),()=>{document.body.removeChild(a)}},[]),J.useEffect(()=>{if(!e.current||!s)return;const a=()=>{const l=e.current.getBoundingClientRect(),c=165;let f=l.bottom+8,h=l.left+l.width/2-c/2;const d=document.documentElement.clientWidth;h<10?h=10:h+c>d-10&&(h=d-c-10);const p=document.documentElement.clientHeight,g=300;f+g>p&&(f=Math.max(10,l.top-g-8)),s.style.transform=`translate(${window.scrollX}px, ${window.scrollY}px)`,r({top:f,left:h})};return a(),window.addEventListener("scroll",a),window.addEventListener("resize",a),()=>{window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}},[e,s]),J.useEffect(()=>{const a=c=>{c.stopPropagation()},l=n.current;return l&&(l.addEventListener("mouseover",a),l.addEventListener("mouseenter",a),l.addEventListener("mouseleave",a)),()=>{l&&(l.removeEventListener("mouseover",a),l.removeEventListener("mouseenter",a),l.removeEventListener("mouseleave",a))}},[]),s?Wl.createPortal(b.jsx("div",{className:"grade-dropdown-menu",style:{top:`${i.top}px`,left:`${i.left}px`},ref:n,children:b.jsx("div",{className:"grade-dropdown-content",children:sp.map((a,l)=>b.jsxs(Yn.Fragment,{children:[b.jsx("button",{className:"grade-dropdown-option",onClick:c=>{c.preventDefault(),c.stopPropagation(),t(a)},style:Nv(a),type:"button",children:a}),l<sp.length-1&&b.jsx("div",{className:"grade-dropdown-separator"})]},a))})}),s):null},Uv=({courseId:t,courseName:e,onSelectGrade:n,currentGrade:i,displayMode:r="badge"})=>{const[s,o]=J.useState(!1),a=J.useRef(null),l=Sl.getInstance(),c=`grade-${t}`;J.useEffect(()=>{const d=()=>o(!1);return l.register(c,d),()=>{l.unregister(c)}},[c,l]),J.useEffect(()=>{if(!a.current)return;const d=a.current.closest("tr");d&&(s?d.classList.add("dropdown-open"):d.classList.remove("dropdown-open"))},[s]),J.useEffect(()=>{function d(p){a.current&&!a.current.contains(p.target)&&(o(!1),l.closeDropdown(c))}if(s)return setTimeout(()=>{document.addEventListener("click",d)},10),()=>document.removeEventListener("click",d)},[s,c,l]);const f=d=>{d.preventDefault(),d.stopPropagation(),s?(l.closeDropdown(c),o(!1)):(l.openDropdown(c),o(!0))},h=d=>{n(t,d),o(!1),l.closeDropdown(c)};return b.jsxs("div",{className:`grade-dropdown ${r==="input"?"grade-dropdown-input-mode":""}`,ref:a,children:[b.jsxs("button",{className:`grade-dropdown-trigger ${r==="input"?"form-input-style-trigger":i?"grade-dropdown-trigger-compact":""}`,onClick:f,"aria-label":`${i?"Change":"Select"} grade for ${e}`,"aria-expanded":s,type:"button",children:[r==="input"&&b.jsx("span",{className:"grade-dropdown-input-text",children:i||"Select Grade"}),"        ",b.jsx("svg",{className:`grade-dropdown-arrow ${s?"open":""}`,width:"8",height:"8",viewBox:"0 0 12 12",fill:"currentColor",children:b.jsx("path",{d:"M6 8.5C5.88079 8.5 5.76159 8.45746 5.66967 8.37239L2.16967 5.37239C1.94678 5.18863 1.9155 4.85904 2.09926 4.63615C2.28301 4.41325 2.61261 4.38197 2.8355 4.56573L6 7.29194L9.1645 4.56573C9.38739 4.38197 9.71699 4.41325 9.90074 4.63615C10.0845 4.85904 10.0532 5.18863 9.83033 5.37239L6.33033 8.37239C6.23841 8.45746 6.11921 8.5 6 8.5Z"})})]}),s&&b.jsx(fx,{onSelectGrade:h,triggerRef:a})]})},hx=({value:t,onChange:e,min:n=0,max:i=3,disabled:r=!1})=>{const s=J.useRef(null),[o,a]=J.useState([]);J.useEffect(()=>{const d=[];for(let p=n;p<=i;p++)d.push(p);a(d)},[n,i]);const l=()=>{if(!s.current)return;const d=s.current.closest(".perspective-container"),g=(()=>{const v=Math.min(window.innerWidth||1/0,document.documentElement.clientWidth||1/0,document.body.clientWidth||1/0);return v<=360?36:v<=480?40:50})(),y=(d==null?void 0:d.offsetWidth)||200,m=Math.floor(y/2),u=o.indexOf(t),_=m-u*g-g/2;s.current.style.setProperty("--x-offset",`${_}px`),s.current.style.transform=`translateY(-50%) translateX(${_}px)`,s.current.style.left="0",s.current.style.top="50%";const x=s.current.querySelectorAll(".number-item");x.forEach(v=>{v.style.width=`${g}px`,v.style.minWidth=`${g}px`,v.style.maxWidth=`${g}px`,v.style.flex=`0 0 ${g}px`,v.style.boxSizing="border-box",v.style.margin="0",v.style.padding="0",v.style.textAlign="center",v.style.display="flex",v.style.justifyContent="center",v.style.alignItems="center"}),x.forEach(v=>{const P=parseInt(v.dataset.value||"0",10);if(P===t)v.style.transform="translateZ(15px) scale(1.15)",v.style.color="#111827",v.style.fontWeight="800",v.style.opacity="1",v.style.textShadow="0 1px 3px rgba(0, 0, 0, 0.2)",v.style.background="radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",v.style.filter="none";else{const C=Math.abs(P-t),M=Math.max(.4,1-C*.2),R=Math.max(.2,1-C*.35),T=C<=1?4:6;v.style.transform=`scale(${M}) translateZ(-${C*15}px)`,v.style.color=C<=1?"#4b5563":"#6b7280",v.style.fontWeight=C<=1?"500":"400",v.style.opacity=R.toString(),v.style.textShadow="none",v.style.background="none",v.style.filter=`blur(${T}px) opacity(${R})`}})};J.useEffect(()=>{l();let d;const p=()=>{window.clearTimeout(d),d=window.setTimeout(()=>{l()},100)};window.addEventListener("resize",p),l();const g=setTimeout(()=>{l()},10),y=setTimeout(()=>{l()},100);return()=>{window.removeEventListener("resize",p),window.clearTimeout(d),window.clearTimeout(g),window.clearTimeout(y)}},[t,o,n,i]);const c=d=>{if(!s.current)return;l();const p=s.current.style.getPropertyValue("--x-offset");s.current.classList.remove("animating","shaking"),s.current.offsetHeight,s.current.classList.add("shaking"),s.current.style.transition="transform 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)";const g=d==="left"?-1:1;[{offset:5*g,delay:0},{offset:-3.5*g,delay:80},{offset:2*g,delay:160},{offset:-1*g,delay:240},{offset:0,delay:300}].forEach(m=>{setTimeout(()=>{if(s.current){const _=`${parseFloat(p||"0px")+m.offset}px`;s.current.style.setProperty("--x-offset",_),s.current.style.transform=`translateY(-50%) translateX(${_})`,m.offset===0&&setTimeout(()=>{s.current&&(s.current.classList.remove("shaking"),s.current.style.transition="transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",s.current.style.setProperty("--x-offset",p),s.current.style.transform=`translateY(-50%) translateX(${p})`,l())},100)}},m.delay)})},f=()=>{if(r)return;let d=t-1;if(d<n){c("left");return}e(d)},h=()=>{if(r)return;let d=t+1;if(d>i){c("right");return}e(d)};return b.jsx("div",{className:"credit-hours-input",children:b.jsxs("div",{className:"perspective-container",children:[b.jsx("div",{className:"number-dial-viewport",children:b.jsx("div",{ref:s,id:"number-strip",className:"number-strip",style:{"--x-offset":"0px"},children:o.map(d=>b.jsx("div",{className:`number-item ${d===t?"active":d===t-1||t===n&&d===i?"prev":d===t+1||t===i&&d===n?"next":""}`,"data-value":d,"aria-selected":d===t,children:d},d))})}),b.jsx("div",{className:"glass-pane-left",onClick:f,style:{pointerEvents:r?"none":"auto",cursor:r?"not-allowed":"pointer"},children:b.jsx("div",{className:"arrow-button",style:{left:"5px"},children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:b.jsx("polyline",{points:"15 18 9 12 15 6"})})})}),b.jsx("div",{className:"glass-pane-right",onClick:h,style:{pointerEvents:r?"none":"auto",cursor:r?"not-allowed":"pointer"},children:b.jsx("div",{className:"arrow-button",style:{right:"5px"},children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:b.jsx("polyline",{points:"9 18 15 12 9 6"})})})}),b.jsx("div",{className:"center-window"})]})})},px="Cairo University",mx="Faculty of Computers and Artificial Intelligence",gx={general_requirements:{title:"General Requirements",total_credit_hours:12,mandatory:{title:"Mandatory Courses",credit_hours:6,courses:[{code:"HU111",name:"Technical Report Writing",credit_hours:2,prerequisites:"None",type:"Mandatory",description:"The basic rudiments of report writing the rationale for report writing - the structure of reports and such details as physical appearance and linguistic style - writing reports."},{code:"HU112",name:"Ethics and Professionalism",credit_hours:2,prerequisites:"None",type:"Mandatory",description:"Critical examination of ethical problems associated with computer science and engineering - legal and quasi-legal (i.e. policy and regulative) issues - Process of ethical decision-making - Privacy and confidentiality Computer crime Professional codes and responsibilities - Software piracy - Impact of computers on society."},{code:"HU113",name:"Creative Thinking and Communication Skills",credit_hours:2,prerequisites:"None",type:"Mandatory",description:"Meta-cognition (thinking about thinking) - Edward do Bono's CoRT (cognitive research trust) program of learning thinking. Vertical and lateral thinking approaches Creative thinking tools like Brainstorming, Tony Buzan's Mind mapping and Edward do Bono's Six Thinking hats. Theories of communication - How to translate theories into complete strategies to communicate with diverse audience - Written Communications: Memoranda, Letters, Executive summaries, Business and research reports. Oral Communications: Listening, Presentation skills, Interviewing, Conducting meetings, Interpersonal communication Negotiation. Intercultural communication - Importance of communication in team building."}]},elective:{title:"Elective Courses (Student chooses 6 credit hours)",credit_hours:6,courses:[{code:"HU121",name:"Fundamentals of Economics",credit_hours:2,prerequisites:"None",type:"Elective",description:"Concept of economics - the economic problem - Theory of demand including: utility theory theory of production - theory of cost theory of firm including: pricing theory Economics of education Economics of science and technology - Economics of automation including: computerization."},{code:"DS251",name:"Fundamentals of Management",credit_hours:2,prerequisites:"Passing 30 Credit Hours",type:"Elective",description:"History of Management decisions planning, fundamentals of planning making strategic planning plans and planning tools Organizing and managing human resources Influencing leadership controlling Production management and control Quality management - Management of service industries - accounting for risk - and economic analysis."},{code:"HU123",name:"Marketing and Sales",credit_hours:2,prerequisites:"None",type:"Elective",description:"Define marketing Marketing process Market analysis: customer base; competition Best practices and lessons learned Business research and forecasting tools and techniques - Trend analysis: economics; social; political; environmental; technology Technology assessment practices and techniques Presentation skills; Sales and advertising practices Customer satisfaction strategies - Marketing and branding techniques Product portfolio analysis Global trade and international operations Pricing strategies Managing marketing through: customer relationships social responsibility - marketing ethics E-Commerce Application and Implementation through Business Models and Technology Essentials."},{code:"HU114",name:"Fundamentals of Psychology",credit_hours:2,prerequisites:"None",type:"Elective",description:"Research methods neurobiological foundations of behavior learning memory personality stress and its effect on well-being- abnormal behavior and pathology, and social psychology Abnormal behavior. General principles of psychology as they are applied to work relationships and self. Includes perception, learning, development motivation - emotion - therapy - communication - attitudes."},{code:"HU115",name:"Fundamentals of Sociology",credit_hours:2,prerequisites:"None",type:"Elective",description:"Basic concepts Basic examination of major theoretical perspectives Structural functionalism - Symbolic interactionism - conflict theory Types of Society: Tribal, agrarian, industrial, Post-industrial - Culture Social networks Social institutions - Deviance Education - Religion - Race and ethnicity Social class - Socialization - Gender identity - Social construction of the family Community Health - Social processes - Social change - Social Problems Social demography."},{code:"HU116",name:"Comparative Politics",credit_hours:2,prerequisites:"None",type:"Elective",description:"Central concepts and methods in comparative studies Political development and democratization - revolution political culture Comparison of different countries with respect to the founding principles of: Political system - Electoral system Parities Interest organizations - Parliament - Government - Public administration - Policy processes - Political economy. Internationalization."},{code:"HU118",name:"Selected Topics in Humanities",credit_hours:2,prerequisites:"None",type:"Elective",description:"This course aims at introducing students to interesting topics in humanities that need to be identified in a responsive manner to current time."}]}},university_requirements_no_credit:{title:"University Requirements (No Credit Hours)",total_credit_hours:0,courses:[{code:"HU117",name:"Social Issues",credit_hours:0,prerequisites:"None",type:"Mandatory",description:"Introduction-Definition of human rights - historical development of the concept of human rights culture relativism versus universally accepted human rights standards various human rights: personal, political, civil, social, economical ...etc. covering human rights within official international organizations influence of business and global economic restructuring on human rights monitoring human rights - human rights violations."},{code:"HU124",name:"Critical Thinking",credit_hours:2,prerequisites:"None",type:"Mandatory",description:"Determine the position of critical thinking among the forms of human thinking and its different levels and patterns Know what critical thinking is and its different skills - Discover common mistakes in thinking Set the criteria for critical thinking - Discriminate between correct and incorrect thinking patterns Apply critical thinking skills in different life situations Apply critical and logical thinking in solving problems and making various decisions - Identify the validity of the arguments, and their strengths and weaknesses - Detect logical fallacies in thinking - Apply critical reading skills on what he reads in various fields Apply critical thinking skills on what he receives from news and opinions via various mass media - Determine the nature of propaganda and media methods - Apply critical thinking skills to confront the media."},{code:"HU225",name:"Entrepreneurship",credit_hours:0,prerequisites:"Critical Thinking",type:"Mandatory",description:"Understand the meaning of Entrepreneurship, its importance to the Entrepreneur and to the economy Know the importance of an entrepreneurial idea, the means and sources of generate this idea Identify the characteristics, aptitudes, and qualifications of effective Entrepreneur - Identify different areas and fields that Entrepreneur can choose among them to start his project - Prepare a feasibility study for the project Formulate a strategic/business plan for the project Manage the project professionally Know the organizations that support and incubate the entrepreneurial projects."}]},college_requirements:{title:"College Requirements",total_credit_hours:57,mathematics_and_basic_sciences:{title:"Mathematics and Basic Sciences",credit_hours:21,type:"Mandatory",courses:[{code:"MA111",name:"Math-1",credit_hours:3,prerequisites:"None",type:"Mandatory",description:"Functions - Limits and Continuity - Definition of the derivative Higher order derivatives - the chain rule differentials - implicit differentiation - parametric differentiation nth derivative of a function and Leibentiz theorem. Roll's theorem and the mean value theorem Taylor and Maclaurin series. Indeterminate forms and L'Hopital rule. Maximum and minimum values curve sketching. Anti-derivative and Standard Integration Integral. Analytic Geometry: straight line - Conic Sections - Solid geometry."},{code:"MA112",name:"Discrete Mathematics",credit_hours:3,prerequisites:"None",type:"Mandatory",description:"Foundations of discrete mathematics as they apply to computer science focusing on providing a solid theoretical foundation for further work. Topics include functions - relations - sets simple proof techniques - Boolean algebra propositional logic - digital logic - elementary number theory - fundamentals of counting."},{code:"MA113",name:"Math-2",credit_hours:3,prerequisites:"MA111",type:"Mandatory",description:"Techniques of integration- Definite integrals-the fundamental theorem of calculus improper Integrals - Area between curves solids of revolution arc length surface areas of revolution. Partial Differentiation. First Order Differential Equations Second and Higher Order Linear Ordinary Differential Equations. Multiple Integrals. Line and surface integral. Sequences and Infinite Series: Tests of convergence and divergence Alternating series Power Series."},{code:"MA214",name:"Math-3",credit_hours:3,prerequisites:"MA113",type:"Mandatory",description:"Matrices: Properties and Algebraic operations Solution of linear systems of equations Eigen-value problem: Model matrix and similarity Cayley-Hamilton theorem and its applications. Harmonic analysis: Real and Complex Fourier Series Half range and Quarter range expansions. Fourier Integral Transform. Laplace and Inverse Laplace Transforms: Properties and Applications."},{code:"IT111",name:"Electronics",credit_hours:3,prerequisites:"None",type:"Mandatory",description:"Basic electrical circuits - Columb's law - Gauss law - Capacitors - Resistors Inductors Kirchhoff's law Basic circuit theory and circuit analysis Fundamentals of three phase circuits and transformers Fundamentals of semiconductor devices - P-N Junction diode - Bipolar junction and field effect transistors structures. Semiconductor devices and circuits filters - Power supply and Rectification. Fundamentals of Amplifiers. Integrated Circuits and VLSI."},{code:"ST121",name:"Probability and Statistics - 1",credit_hours:3,prerequisites:"MA111",type:"Mandatory",description:"Define statistics (types of data types of statistics - population versus sample- Measurement's levels) Describing Data (Frequency tables Graphic Presentation - Numerical Measures - Displaying and Exploring Data) - Survey of Probability Concept (Rules of probability Conditional probability- Total Probability Theory and Bays Rule) - Random Variables and its probability distribution with some properties - Discrete probability distribution (Binomial Poisson Negative Binomial Geometric- Hyper geometric) Continuous Probability distribution (Normal - Exponential)."},{code:"ST222",name:"Probability and Statistics-2",credit_hours:3,prerequisites:"ST121",type:"Mandatory",description:"Sampling Distribution (distribution of mean) - Central limit theorem - Concept of estimation theory - Point estimation some properties (maximum likelihood method Moment method) Interval estimation (population mean and variance two population mean and variance) - concept of testing hypothesis (population mean and variance two population mean and variance) chi-square test - Introduction to Correlation and Regression."}]},basic_computer_science:{title:"Basic Computer Science",credit_hours:36,type:"Mandatory",courses:[{code:"CS111",name:"Fundamentals of Computer Science",credit_hours:3,prerequisites:"None",type:"Mandatory",description:"Introduction to computer and information systems. Types of computers. Computer hardware and software components. Data representation and number systems. Introduction to networking. Introduction to internet. Algorithm development algorithm representation, flowcharts, stepwise refinement - problem solving methods and tools."},{code:"CS112",name:"Structured Programming",credit_hours:3,prerequisites:"CS111",type:"Mandatory",description:"Structured program development: problem solving decision structure, repetition structures. Top-down and stepwise refinement. Subprograms: Procedures and functions. Structured data types: one/two dimension arrays, strings - Dynamic data structures (pointers) - Recursion."},{code:"CS213",name:"Object Oriented Programming",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"Concepts of object-oriented programming. Data Abstraction, use of classes, fundamentals of object-oriented design- Encapsulation and Inheritance. Polymorphism. analysis of algorithms. basic searching and sorting techniques."},{code:"CS214",name:"Data Structures",credit_hours:3,prerequisites:"CS213",type:"Mandatory",description:"Built-in data structures. Stacks queues, linked lists - and tree structures. Binary tree binary search tree balanced tree, simple graphs and hash tables. Sorting algorithms. Quadratic and sub-quadratic linear sorting algorithms asymptotic complexity. (e.g., quick sort merge sort - heap sort - insertion sort - selection sort and count). searching algorithms and hashing. Abstract data types (ADT)."},{code:"CS251",name:"Introduction to Software Engineering",credit_hours:3,prerequisites:"CS213",type:"Mandatory",description:"Software crisis. Software process models. Agile software development. Analysis Requirements engineering - Use case model - Design principles. UML Tools and Methods. Basic design patterns. Introduction to testing. Unit testing - Version control."},{code:"DS211",name:"Introduction to Operations Research and Decision Support",credit_hours:3,prerequisites:["CS112","ST121"],type:"Mandatory",description:"Principles of problem identification and definition, model formulation, solution approaches, analysis and implementation, linear programming - integer programming - networks project management - simulation models solution approaches of these models with the help of relevant software packages will be covered introduction to decision support systems (DSS) principles of computer modeling languages, applications and use of integrated software packages."},{code:"IS211",name:"Introduction to Database Systems",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"What is and Why a database - Relational Model - Relational Algebra - SQL - The Entity-Relationship (ER) Model - Mapping ER Model to Relations."},{code:"IS231",name:"Web Technology",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"Introduction to Internet Concepts. Front End Development: HTML - CSS - JS. Backend Development: Web Development Platforms: J2EE, PHP. Content Management Systems: Drupal, Joomla. Introduction to Web Development Frameworks: Laravel - Symfony."},{code:"IT212",name:"Logic design",credit_hours:3,prerequisites:"IT111",type:"Mandatory",description:"Basic logic concepts: Logic states number systems - Boolean algebra - basic logical operations gates and truth tables. Combinational logic: Minimization techniques multiplexers and de-multiplexers encoders decoders adders and subtractors comparators programmable logic arrays and memories design with MSI - logic families - tri-state devices. Sequential logic: Flip flops, mono-stable multi-vibrators - latches and registers - Counters."},{code:"IT221",name:"Computer Networks Technology",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"Introduction to computer networking, the Internet basic concepts. Internet Protocol (IP). Socket programming - TCP and UDP protocols, FTP - SMTP - and Peer to peer applications and DNS."},{code:"CS321",name:"Algorithms Analysis and Design",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Algorithm concept: computational analysis and complexity. Design methods: divide and conquer - backtracking - binary search, merge sort, quick sort, selection - matrix multiplication, the greedy method. Dynamic programming: shortest paths, optimal search trees. Backtracking. NP-hard and NP-complete problems."},{code:"CS341",name:"Operating Systems",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Computer-system structures - Types of operating systems - Operating Systems structures- system components and services. Interrupt Handling. Virtual machines. Processes and threads. Process management. CPU scheduling: Scheduling concepts and algorithms - Memory management. File systems. Disk scheduling - Virtual memory."}]}}},vx={Computer_Science:{title:"Computer Science",major_requirements:{title:"Major Requirements",total_credit_hours:63,applied_sciences_mandatory:{title:"Applied Sciences (Mandatory)",credit_hours:39,courses:[{code:"CS316",name:"Advanced Data Structures",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Dynamic optimality and memory hierarchy hashing dynamic graphs and strings (searching for phrases in giant text). Indexing of unstructured data Btree, B+ tree, B* tree."},{code:"CS322",name:"Concepts of Programming Languages",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Different types of programming languages, implementation methods - Declarative programming - Functional Programming. Describing Syntax and Semantics, BNF notations and Parse Trees, denotational and operational semantics- names, Binding, Lifetime and scope - Data Types, type checking - Expressions and Assignment Statements - side effect, short-circuit evaluation. Subprograms, Parameter passing, lambda expressions - concurrency."},{code:"CS331",name:"Computer Organization and Architecture",credit_hours:3,prerequisites:"IT212",type:"Mandatory",description:"Computer organization fundamentals. Modern processor memory and peripherals design and organization - Modern computer design principles and levels of abstraction - Instruction set architecture design and implementation. Computer hardware-software interface - Computer performance-based design. Computer processor design data path and control. Instruction pipelining. Parallel computer paradigms, instruction set architectures and design. Architecture-oriented programming. Power and energy aware computing. Tools and simulation for computer design and performance enhancement."},{code:"CS342",name:"Advanced Operating Systems",credit_hours:3,prerequisites:"CS341",type:"Mandatory",description:"Operating system for different platforms: cell phones, multi-core, parallel systems, distributed systems. System support for Internet-scale computing, clouds."},{code:"CS352",name:"Advanced Software Engineering",credit_hours:3,prerequisites:"CS251",type:"Mandatory",description:"Software architecture, Architectural styles, Service oriented architectures. Advanced design patterns - Software quality assurance. Reviews - Refactoring. Testing. Software Configuration management. Software evolution and maintenance."},{code:"CS361",name:"Artificial Intelligence",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Knowledge Representations: Predicate Calculus - Structured Representations, Network Representations. State Space Search: simple search - heuristic search - reasoning with uncertain or incomplete knowledge constraints satisfaction problem."},{code:"CS371",name:"High performance computing",credit_hours:3,prerequisites:"CS341",type:"Mandatory",description:"The need for parallel processing and the limitations of uniprocessors. Basic concepts of parallel processing and their impact on computer architecture. Various kinds of system architectures - design methodologies - communication networks for parallel computers, various programming models - performance evaluation, parallelizing techniques, parallel algorithms and resource management of parallel and distributed systems."},{code:"IT351",name:"Information Theory and Data Compression",credit_hours:3,prerequisites:["MA214","CS213"],type:"Mandatory",description:"Introduction to Data Compression Approaches - Dictionary based compression approach. Introduction to information theory and Entropy calculation. Shannon theorem and its applications. Huffman Coding approaches. Arithmetic Coding Approaches. Quantization with application. Prediction Coding techniques. Transform Coding and DCT. Compression of Color images- JPEG Compression and its building blocks - Video basics, MPEG Compression and its building blocks - Motion Estimation and compensation in Video."},{code:"IT361",name:"Computer Graphics",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"Introduction to Computer Graphics. Overview of Graphics systems. Line drawing algorithms - Circle drawing algorithms - Ellipse drawing algorithms. Area filling algorithms - Polygon filling algorithms - Line clipping algorithms. Polygon clipping algorithms - Two dimensional transformations - (translation, rotation, scaling, general transformations, composite transformations). Three dimensional object representation and Projections. Three dimensional modeling and transformations (translation, rotation, scaling, sheer, reflection - composite). Three dimensional Viewing and Camera Model."},{code:"CS423",name:"Compilers",credit_hours:3,prerequisites:"CS322",type:"Mandatory",description:"Basic concepts. Lexical analysis. Regular expressions. Context-free grammars. Parsing - Top-down parsers, Predictive parsers, LR parsers, Shift-reduce parsers. Semantic analysis - Intermediate code generation - Code generation - Code optimization."},{code:"CS432",name:"Theory of Computation",credit_hours:3,prerequisites:"MA112",type:"Mandatory",description:"Regular languages - Regular expressions Properties of regular expressions. Proofs. Finite automata Non-deterministic finite automata Deterministic finite automata. Transformation of regular expressions to finite automata. Transformation of DFAs to NFAs. Transformation of finite automata to regular expressions - Context-free grammars - Push-down automata - Parsing - Turing machines - Complexity theory-down automata Parsing - Turing machines Complexity theory."},{code:"CS462",name:"Machine Learning",credit_hours:3,prerequisites:["MA113","ST121"],type:"Mandatory",description:"Linear Regression, Polynomial Regression. Logistic Regression. Regularization. Machine Learning System Design. Naive Bayes. Support Vector Machines. Decision Trees. Unsupervised Learning - Recommender Systems. Application Examples such as (Recommender Systems) and Project."},{code:"CS472",name:"Cloud Computing",credit_hours:3,prerequisites:"CS342",type:"Mandatory",description:"Overview of Cloud Computing; Introduction to distributed systems, Advantages, History, Characteristics, concepts of cloud computing services. Service and Deployment Models- such as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), and Software as a Service (SaaS). Virtualization Concepts. Migration Approaches - Resource Management."}]},electives:{title:"Elective Courses (Student chooses 18 credit hours)",credit_hours:18,courses:[{code:"CS434",name:"Big Data Analysis",credit_hours:3,prerequisites:["MA113","ST121","IS211"],type:"Elective",description:"Map Reduce. Clustering algorithms for high-dimensional data, predictive analytics. Dimensionality reduction. Application of machine learning algorithms for analyzing structure of large graphs like social network graphs. Technologies for extracting important properties of large datasets."},{code:"CS435",name:"Bioinformatics Systems",credit_hours:3,prerequisites:"CS321",type:"Elective",description:"Biological background related to bioinformatics -the genome, protein and motif databases DNA replication-motifs finding algorithms- local and global pairwise sequence alignment scoring matrices introduction to multiple sequence alignment genome assembly algorithms microarray gene expression databases- applications on microarrays datasets- genome compression."},{code:"CS436",name:"Mobile Computing",credit_hours:3,prerequisites:"CS341",type:"Elective",description:"Mobile systems and devices. Mobile operating systems - Types of mobile devices. Application development. Mobile application development with sensors of mobile and controllers of mobile - Mobile integration with embedded and internet of things systems - Mobile development project."},{code:"CS453",name:"Software Testing and Quality Assurance",credit_hours:3,prerequisites:["MA113","CS352"],type:"Elective",description:"Quality: how to assure it and verify it, the need for a culture of quality. Avoidance of errors and other quality problems. Inspections and reviews. Testing: verification and validation techniques. Process assurance versus Product assurance. Quality process standards - Product and process assurance - Problem analysis and reporting."},{code:"CS454",name:"Software security",credit_hours:3,prerequisites:["MA113","CS352"],type:"Elective",description:"Software design process choices of programming languages, operating systems, databases and platforms for building secure systems; common software vulnerabilities such as buffer overflows and race conditions, auditing software, proving properties of software, and the benefits of open and closed source development."},{code:"CS455",name:"Human Computer Interaction",credit_hours:3,prerequisites:"CS352",type:"Elective",description:"Relationship between people and machine, the role of human factors and psychology. Motivation for usability. Principles of interaction - interface design issues. Command languages, menus, windows, icons, error messages, response time. Physical interaction - devices - interaction styles and techniques. The design process and user models. Interface evaluation, rapid prototyping, iterative refinement. Natural language and voice interfaces, text-to-speech technology."},{code:"CS456",name:"Software Design and Architecture",credit_hours:3,prerequisites:"CS352",type:"Elective",description:"Study of design patterns. Frameworks and architectures. Survey of current middleware architectures. Design of distributed systems using middleware. Component based design - Measurement theory and appropriate use of metrics in design. Designing for software qualities attributes. Measuring internal qualities and complexity of software - Evaluation and evolution of designs. Basics of software evolution - reengineering - reverse engineering."},{code:"CS457",name:"Selected Topics in Software Engineering",credit_hours:3,prerequisites:"CS352",type:"Elective",description:"This course aims at introducing students to novel topics in software engineering that need to be identified in a responsive manner as technology evolve and develop."},{code:"CS463",name:"Natural Language Processing",credit_hours:3,prerequisites:"CS462",type:"Elective",description:"Introduction - Language Models - Text Classification - Information Retrieval. Information Extraction. Morphological Analysis and the Lexicon. Phrase Structure Grammars - Parsing - Context Free Grammar - Augmented grammar rules. Semantic interpretation. Machine Translation Systems. Statistical Machine Translation."},{code:"CS464",name:"Semantic Web and Ontology",credit_hours:3,prerequisites:["CS361","IS231"],type:"Elective",description:"Introduction Semantic web. Descriptive logic. Describing web resources in RDF. Ontology development. Ontology development Ontology language. Web ontology language OWL - OWL API - Rule Interchange Format RIF. Query language. Semantic Portals - applying Semantic Web technologies to the Social Web."},{code:"CS465",name:"Soft Computing",credit_hours:3,prerequisites:["ST121","MA113"],type:"Elective",description:"Genetic Algorithms, Population, Chromosomes, Fitness functions, Crossover, Mutation, Binary bit chromosomes, Floating point array chromosomes, Schema theory. Fuzzy logic, Fuzzy systems, Fuzzy operators - Fuzzy rule-based systems - Neural networks - Feed forward neural networks - Back propagation algorithm - Bias - Scaling - Proof of Delta rule. Performance issues. Hybrid systems. Feature selection. Training of NNs with GAs - Evolution of fuzzy rule-based systems. Genetic programming. Immune systems - Evolution strategy."},{code:"CS466",name:"Knowledge Discovery",credit_hours:3,prerequisites:["IS211","CS361"],type:"Elective",description:"Basic principle of knowledge discovery in large dataset - Data pre-processing, transformation techniques, classification, deviation detection, fuzzy rule prediction - association rules generation techniques - evaluation of patterns from data. Knowledge discovery in unstructured texts. Techniques for evaluating methods."},{code:"CS467",name:"Selected Topics in Artificial Intelligence",credit_hours:3,prerequisites:["MA113","CS361"],type:"Elective",description:"This course aims at introducing students to novel topics in artificial intelligence that need to be identified in a responsive manner as technology evolve and develop."},{code:"CS473",name:"Advanced High performance computing",credit_hours:3,prerequisites:["CS371","CS342"],type:"Elective",description:"Quick Overview about Parallel Processing Concepts. Fundamental Design Issues in Parallel Computing - Synchronization, Scheduling - Job Allocation, Job Partitioning - Dependency Analysis. Mapping Parallel Algorithms onto Parallel Architectures - Performance Analysis of Parallel Algorithms - Parallel programming Models shard Memory, Message Passing. Fundamental Limitations Facing Parallel Computing. Bandwidth Limitations, Latency Limitations, Latency Hiding/Tolerating Techniques and their limitations. Power-Aware Computing and Communication."},{code:"CS474",name:"Selected Topics in High Performance Computing",credit_hours:3,prerequisites:"CS371",type:"Elective",description:"This course aims at introducing students to novel topics in High Performance Computing that need to be identified in a responsive manner as technology evolve and develop."},{code:"CS495",name:"Selected Topics in Computer Science - 1",credit_hours:3,prerequisites:"CS322",type:"Elective",description:"This course aims at introducing students to novel topics in computer science that need to be identified in a responsive manner as technology evolve and develop."},{code:"CS496",name:"Selected Topics in Computer Science - 2",credit_hours:3,prerequisites:"CS322",type:"Elective",description:"This course aims at introducing students to novel topics in computer science that need to be identified in a responsive manner as technology evolve and develop."}]},graduation_project:{title:"Graduation Project",credit_hours:6,courses:[{code:"CS498",name:"Graduation Project",credit_hours:6,prerequisites:"Passing 85 Credit Hours",type:"Mandatory",description:"This course will continue for two semesters. In the first semester; a group of students will select one of the projects proposed by the department and analyze the underlying problem. In the second semester; the design and implementation of the project will be conducted."}]},field_training:{title:"Field Training",credit_hours:3,courses:[{code:"TR301",name:"Field Training",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Mandatory",description:"Particular emphasis is placed on the importance of practical experience and all teaching involves industry standard hardware, software, methods and techniques. Students asked to complete training on chosen area of specialization to be familiar with the industry."}]}}},Information_Technology:{title:"Information Technology",major_requirements:{title:"Major Requirements",total_credit_hours:63,applied_sciences_mandatory:{title:"Applied Sciences (Mandatory)",credit_hours:39,courses:[{code:"IT313",name:"Computer Architecture",credit_hours:3,prerequisites:"IT212",type:"Mandatory",description:"Design principles associated with modern computer architectures - performance and cost considerations architectural features influenced by high level languages - networking and security considerations - processor implementation strategies, pipelining, CISC and RISC processors, vector micro-programming, memory hierarchy and architectures I/O and bus subsystems, special purpose architectures - parallel processing - distributed systems."},{code:"IT314",name:"Micro Controllers",credit_hours:3,prerequisites:"IT212",type:"Mandatory",description:"Microcontroller Basics, Microcontroller Components, Processor Core, Memory, Digital I/O, Analog I/O, Interrupts, Timer. Communication Interfaces, SCI, SPI, IIC. Development Cycle, Assembly Language Programming - Debugging. Hardware Switch, Keypad, Potentiometer, Phototransistor - Position - Numeric Display, Multiplexed - Switching Loads, Motors."},{code:"IT322",name:"Advanced Computer Networks",credit_hours:3,prerequisites:["IT221","IT331"],type:"Mandatory",description:"Introduction to Network Architectures - LANs/MANs topologies - transmission and protocols. Medium Access Control (MAC) protocols. Ethernet types and technologies. Internet routing protocols. Transport network protocols. Introduction to Data Center Networks. Fundamentals of Network/Internet management and measurements - Introduction to Software Defined Networks. Introduction to Cloud-based Networks - Content distribution networks."},{code:"IT331",name:"Data communication",credit_hours:3,prerequisites:"MA113",type:"Mandatory",description:"Basic concepts of data communications. Layered architecture of communication protocols. OSI reference model, TCP/IP protocol suite. Guided/unguided transmission media. Analog/digital data transmission. Encoding techniques - Multiplexing techniques - Error detection and correction. Data link protocol."},{code:"IT341",name:"Signals and Systems",credit_hours:3,prerequisites:"MA214",type:"Mandatory",description:"Signals Applications - Signals Definitions and Classifications. Signals' Power and Energy. Basic Signals. Systems and Systems' Properties - Linear and Time-Invariant (LTI) Systems. Fourier series, Fourier transform for continuous and discrete time signals - Sampling theorem - Laplace transform - Z-Transform. State apace representation. Transfer function. Filters design and applications."},{code:"IT342",name:"Digital Signal Processing",credit_hours:3,prerequisites:"IT341",type:"Mandatory",description:"Discrete-Time Signals- Discrete-Time Systems. Linear Time Invariant Systems. Linear Constant-Coefficient Difference Equations. Discrete time Fourier Transform Theorems- Z-Transform Properties of the Region of Convergence of the z-Transform - The Inverse Z-Transform - Discrete Fourier Series- Discrete-Fourier Transform: Sampling of Continuous-Time Signals. Reconstruction of a Band limited Signal from Its Samples -Block Diagram and Signal Flow graph representation- Basic Structures of IIR and FIR Systems- Filter Design Techniques. Design of Discrete-Time IIR Filters from Continuous-Time Filters. Design of FIR Filters by Windowing. Optimum Approximation of FIR Filters."},{code:"IT351",name:"Information Theory and Data Compression",credit_hours:3,prerequisites:["MA214","CS213"],type:"Mandatory",description:"Introduction to Data Compression Approaches - Dictionary based compression approach. Introduction to information theory and Entropy calculation. Shannon theorem and its applications. Huffman Coding approaches. Arithmetic Coding Approaches. Quantization with application. Prediction Coding techniques. Transform Coding and DCT. Compression of Color images- JPEG Compression and its building blocks - Video basics, MPEG Compression and its building blocks - Motion Estimation and compensation in Video."},{code:"IT352",name:"Pattern Recognition",credit_hours:3,prerequisites:["ST222","IT341"],type:"Mandatory",description:"Feature Extraction approaches (Geometrical, Statistical, Transformational, texture based). Intentionality Reduction techniques. Feature Selection Techniques. Linear discriminant Analysis. Bayesian Classifier. Neural Network Classifier - Hidden Markov Model Classifier - Similarity Measures. Basic clustering techniques."},{code:"IT361",name:"Computer Graphics",credit_hours:3,prerequisites:"CS112",type:"Mandatory",description:"Introduction to Computer Graphics. Overview of Graphics systems. Line drawing algorithms - Circle drawing algorithms - Ellipse drawing algorithms. Area filling algorithms - Polygon filling algorithms - Line clipping algorithms. Polygon clipping algorithms - Two dimensional transformations - (translation, rotation, scaling, general transformations, composite transformations). Three dimensional object representation and Projections. Three dimensional modeling and transformations (translation, rotation, scaling, sheer, reflection - composite). Three dimensional Viewing and Camera Model."},{code:"IT423",name:"Information and Computer Networks Security",credit_hours:3,prerequisites:"IT322",type:"Mandatory",description:"Basic concepts of information and network security - Hash functions/algorithms. Classical encryption techniques. Public and Private Key Cryptography. Basic and Advanced Encryption. Authentication - Hashing - Symmetric and asymmetric crypto. Digital Signature and Authentication. Application Security (email security) - Network security and Firewalls - Web Security. Introduction to digital steganography and watermarking techniques."},{code:"IT432",name:"Communication Technology",credit_hours:3,prerequisites:"IT221",type:"Mandatory",description:"Communication technology concepts and terminology - Optical Circuit/Packet/ Burst Switching - Passive Optical Networks - RFID Technology. Internet of Things Technologies. Wireless Communication Fundamentals, 3G/4G/5G. Recent Trends in Communication Technologies."},{code:"IT443",name:"Image processing",credit_hours:3,prerequisites:"IT341",type:"Mandatory",description:"Image sampling and quantization - Zooming in and zooming out - Overview of image processing systems - Point operations - Spatial filters - Image transform. Filters in frequency domain. Image noise reduction. Image restoration. Image segmentation - Image classification accuracy evaluation - Morphological operations - Application field."},{code:"IT444",name:"Multimedia Mining",credit_hours:3,prerequisites:"IT352",type:"Mandatory",description:"Data Collection and Pre-processing - Multimedia Mining Techniques. Image and Video Mining - Audio and Speech Mining - Text Mining."}]},electives:{title:"Elective Courses (Student chooses 18 credit hours)",credit_hours:18,courses:[{code:"IT415",name:"Machine Vision",credit_hours:3,prerequisites:["IT443","IT361"],type:"Elective",description:"Fundamentals of image formation. Camera imaging geometry. Feature detection and matching. Multiview geometry including stereo - Motion estimation and tracking and classification - Methods for depth recovery from stereo. Camera calibration. Image stabilization - Automated alignment (e.g. panoramas) - Tracking - and action recognition."},{code:"IT416",name:"Robotics",credit_hours:3,prerequisites:"IT314",type:"Elective",description:"Theory and application of mathematical models to analyze the kinematics and dynamics of robot mechanisms or their components using vector algebra, differential equations and computer simulations - robot vehicle kinematics, robot arm kinematics and robot dynamics with computational examples and problems. Some basic programming skills and familiarity with MATLAB are expected."},{code:"IT417",name:"Embedded Systems",credit_hours:3,prerequisites:"IT314",type:"Elective",description:"Embedded systems software design either in assembly language or a high-level language or both for typical embedded systems applications using modern tools and approaches for development and debugging. Digital interfacing using both parallel and asynchronous/synchronous serial techniques incorporating typical on-chip modules as such as general purpose I/O - timers and serial communication modules (i.e. UART, SPI, I2C, CAN - etc.). analog interfacing using analog-to-digital convertors connected to common sensor elements and digital-to-analog converters connected to typical actuator elements. Mobile and wireless embedded systems using both short-range (Bluetooth, 802.15.4) and long-range (cellular Ethernet) in various interconnection architectures."},{code:"IT418",name:"Selected Topics in Embedded Systems and Robotics",credit_hours:3,prerequisites:"IT314",type:"Elective",description:"This course aims at introducing students to novel topics in embedded systems and robotics that need to be identified in a responsive manner as technology evolve and develop."},{code:"IT424",name:"Wireless and Mobile Networks",credit_hours:3,prerequisites:"IT322",type:"Elective",description:"Antennas: types - Radiation patterns - Antenna gain. Propagation models. Line of sight transmission. Impairments. Fading in wireless environment. Satellites: orbits, types. Geostationary satellites, LEO satellites, MEO satellites. Footprint. Capacity allocation: FDMA, TDMA, CDMA. Cellular networks: definition - architecture - frequency reuse. Call forwarding - Handoff - power control - Main architecture - Last generation architecture. Ad-hoc networks: definition, problems, MAC protocol - routing, energy management. Wireless sensor networks: definition, applications, routing, energy consumption - aggregation techniques."},{code:"IT425",name:"Cloud Computing Networks",credit_hours:3,prerequisites:"IT322",type:"Elective",description:"Introduction to cloud computing - Cloud computing reference model - Physical Layer (Compute/Storage - FC SAN, IPSAN - FcoE) - Virtual layer (VLAN, VSAN, Tunneling Protocols). Characteristics of cloud networking. Deployment models - Network virtualization techniques used in data centers. Data center evolution - Routing inside a Data center."},{code:"IT426",name:"Internet Programming and Protocols",credit_hours:3,prerequisites:"IT322",type:"Elective",description:"The principal structure of the internet and its most important protocols including TCP - IP - in addition to application layer protocols (DHCP - DNS, HTTP - SMTP - POP - IMAP) - basics of socket and thread programming."},{code:"IT427",name:"Optical Networks",credit_hours:3,prerequisites:"IT322",type:"Elective",description:"Optical Multiplexing (WDM - SONET - SDH) - Optical Transmission System. Optical Devices/Components. Optical Circuit/Packet/Burst Switching. Optical Switch Architectures and technologies. Passive Optical Networks. Free-Space Optical Networks. Optical Data Centers. Optical Sensors. Optical Networks Measurements - Optical Networks Emerging Technologies."},{code:"IT428",name:"Wireless Sensor Networks",credit_hours:3,prerequisites:"IT424",type:"Elective",description:"Sensor node architecture - Introduction to applications - Network architecture. Key aspects of the communication protocol stack - Physical layer, MAC, IEEE 802.15.4. Routing - RPL. Distributed detection. Distributed estimation, localization and positioning. Time synchronization. Sensor operation system, TinyOS - WSN control."},{code:"IT429",name:"Selected Topics in Computer Networks",credit_hours:3,prerequisites:"IT322",type:"Elective",description:"This course aims at introducing students to novel topics in computer networks that need to be identified in a responsive manner as technology evolve and develop."},{code:"IT433",name:"Cyber Security",credit_hours:3,prerequisites:"IT423",type:"Elective",description:"Network attacks and defenses, operating system holes - web security - e-mail, Botnet, malware, social engineering attacks - Privacy and digital rights management."},{code:"IT445",name:"Advanced Image Processing",credit_hours:3,prerequisites:"IT443",type:"Elective",description:"Image Pyramids - Subband Coding - Haar Transform - Multiresolution Theory. Wavelet Transform, Fast Wavelet Transform, Wavelet Packets. Applications of Wavelet Transform/Packets in Image Processing and Examples. Image Formation. Color Systems - Pseudo Color Image Processing - Full Color Image Processing - Object and Region Representation Methods - Object and Region Description Methods. Thresholding - Image Alias. Fuzzy Image Processing. Integral Image and Real Time Image Classification. Watermarking Theories and Techniques."},{code:"IT446",name:"Virtual Reality",credit_hours:3,prerequisites:["IT443","IT361"],type:"Elective",description:"3D geometric modeling and transformation - Free form deformation - Particle systems. Physical simulation - Human factors - VR hardware. VR software. VR applications."},{code:"IT447",name:"Speech Processing",credit_hours:3,prerequisites:"IT342",type:"Elective",description:"Introduction to Speech Processing and Related Technologies - Fundamentals of DSP (Revision): z-Transform - Fourier Transform - Digital Filters - Sampling Theorem - Fundamentals of Speech Science: Speech Production Mechanism, Sound Units, Acoustic Theory - Digital Modeling. Speech Analysis: time-domain analysis, frequency-domain analysis - Linear Prediction Analysis. Speech Recognition: Feature Extraction, Template Matching, Statistical Modeling - Design of Recognition Systems."},{code:"IT448",name:"Selected Topics in Multimedia",credit_hours:3,prerequisites:"IT352",type:"Elective",description:"This course aims at introducing students to novel topics in multimedia that need to be identified in a responsive manner as technology evolve and develop."},{code:"IT453",name:"Advanced Pattern Recognition",credit_hours:3,prerequisites:"IT352",type:"Elective",description:"Decision Tree classifier. Convolutional Neural Network (CNN) - Recurrent Neural Network (RNN) - Long Short Term Memory (LSTM) network. Support Vector Machines (SVM). Kernel Functions. SVM with Kernels. Multi-classifier Approaches. Technical Training Issues (Data Size, Over fitting, Augmentation - Stopping criteria), technical implementation issues."},{code:"IT454",name:"Human Language Technology",credit_hours:3,prerequisites:"IT352",type:"Elective",description:"Natural text parsing, semantic understanding, text generation - dialogue systems management, name entity recognition - word sense disambiguation, carefreeness resolution - sentiment analysis - machine translation - phonetics, speech synthesis - speech recognition - handwriting recognition."},{code:"IT462",name:"Advanced Computer Graphics",credit_hours:3,prerequisites:"IT361",type:"Elective",description:"Visible surface detection algorithms. Reflection and illumination models. Rendering algorithms for 3-D objects - Parametric representation of 3-D objects - Shadows algorithms, 2-D texture mapping, 3-D texture mapping - Ray tracing. Volume rendering. Anti-Aliasing. Introduction to fractals - 3-D computer animation - Color Space in Computer Graphics."},{code:"IT463",name:"Computer Animation",credit_hours:3,prerequisites:"IT361",type:"Elective",description:"3D Modeling. Rendering Techniques. Key framing - Interpolations. Hierarchical animation - Camera animation - Light animation - Special effects. Digital animation techniques - Recording and production planning."},{code:"IT471",name:"Ubiquitous Computing",credit_hours:3,prerequisites:["IT322","CS112"],type:"Elective",description:"Software infrastructure for pervasive computing, sensors and sensor networks that can capture and disseminate context information, context-aware applications, embedding computing into everyday objects, user interfaces for ubiquitous computing - security and privacy to protect access to user context information, application migration, spontaneous interaction, social computing."},{code:"IT472",name:"Concurrency and Parallel Computing",credit_hours:3,prerequisites:["IT313","CS112"],type:"Elective",description:"Paradigms of concurrency and parallel computing and distinguish between them. Parallel architectures including multi-core considerations of cache coherence. Parallel programming models. Methodologies. Parallel algorithms - Limitations of parallelism - Parallel programming performance."},{code:"IT473",name:"Intelligent and Quantum Computing",credit_hours:3,prerequisites:["IT313","CS214"],type:"Elective",description:"Physics of information processing. Quantum logic. Quantum algorithms including Shor's factoring algorithm and Grover's search algorithm - Quantum error correction - Quantum communication - and cryptography."},{code:"IT495",name:"Selected Topics in Information Technology-1",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Elective",description:"This course aims at introducing students to novel topics in information technology that need to be identified in a responsive manner as technology evolve and develop."},{code:"IT496",name:"Selected Topics in Information Technology - 2",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Elective",description:"This course aims at introducing students to novel topics in information technology that need to be identified in a responsive manner as technology evolve and develop."}]},graduation_project:{title:"Graduation Project",credit_hours:6,courses:[{code:"IT498",name:"Graduation Project",credit_hours:6,prerequisites:"Passing 85 Credit Hours",type:"Mandatory",description:"This course will continue for two semesters. In the first semester; a group of students will select one of the projects proposed by the department and analyze the underlying problem. In the second semester; the design and implementation of the project will be conducted."}]},field_training:{title:"Field Training",credit_hours:3,courses:[{code:"TR302",name:"Field Training",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Mandatory",description:"Particular emphasis is placed on the importance of practical experience and all teaching involves industry standard hardware, software, methods and techniques. Students asked to complete training on chosen area of specialization to be familiar with the industry."}]}}},Information_Systems:{title:"Information Systems",major_requirements:{title:"Major Requirements",total_credit_hours:63,applied_sciences_mandatory:{title:"Applied Sciences (Mandatory)",credit_hours:39,courses:[{code:"IS312",name:"Database Management Systems",credit_hours:3,prerequisites:["IS211","CS213"],type:"Mandatory",description:"Transaction Management - Concurrency Control - Database Recovery - Query Processing - Query Optimization - Database Security - Different Architectures of DBMSs - Advanced SQL - Stored Procedures and Triggers."},{code:"IS313",name:"Data Warehousing",credit_hours:3,prerequisites:"IS211",type:"Mandatory",description:"Introduction to data warehouses. Data warehouses and decision support systems, data warehouses characteristics and architecture, data warehouse tools. Design issues - Dimensional models and data cubes - Data warehouse models: star schema and snowflake schema. Data warehouses in real world: Sales, Inventory, Education, Health, Transportation and others. Querying data warehouses using MDX."},{code:"IS321",name:"File Management and Processing",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Basic Files Operations. Types of storage devices and their architecture. Computing access time. Simple Index, Consequential Processing - Multi-Level Indexing - B-Trees, B* Trees - Indexed Sequential Access - B+Trees. Hashing - Advanced indexing mechanisms."},{code:"IS322",name:"Information Retrieval",credit_hours:3,prerequisites:["ST121","IS211"],type:"Mandatory",description:"Boolean and vector-Space Retrieval Models. Basic tokenizing, Text Indexing, Text similarity. Performance evaluation of Information Retrieval Systems. Web Search, Automated Text Categorization, Text Clustering - Text classification, and Recommender Systems."},{code:"IS332",name:"Analysis and Design of Information Systems",credit_hours:3,prerequisites:"IS211",type:"Mandatory",description:"Introduction to Systems analysis and design - Systems development lifecycle. Requirements Engineering. Object-oriented Systems analysis. Use cases, Domain Classes, Behavioral modelling. Architectural design, Detailed design, User and System interfaces. Extending requirements model into design models - Design-specific Models - Design Principles - Deploying the system. Agile Methodologies: Unified Process, Extreme Programming, SCRUM - Traditional System development approach - Data Flow Diagrams - Process Descriptions - Data descriptions/dictionary."},{code:"IS333",name:"Web-based Information Systems Development",credit_hours:3,prerequisites:"IS231",type:"Mandatory",description:"MVC Architecture. J2EE, Sessions, Security, Data connectivity. Advanced JavaScript, AJAX, JQuery. Framework for JS: Angular JS. Framework for Java: Spring - Hibernate - JSF."},{code:"IS341",name:"Business Process Management",credit_hours:3,prerequisites:"IS332",type:"Mandatory",description:"Introduction to BPM. Business Process Lifecycle. Process Modeling Techniques. Business Process Model and Notation. Petri nets. Correctness of Business Process Models - Simulation of Business Process Models - Process Instantiation Semantics - BPEL - Mapping from BPMN to BPEL."},{code:"CS352",name:"Advanced Software Engineering",credit_hours:3,prerequisites:"CS251",type:"Mandatory",description:"Software architecture, Architectural styles, Service oriented architectures. Advanced design patterns - Software quality assurance. Reviews - Refactoring. Testing. Software Configuration management. Software evolution and maintenance."},{code:"CS361",name:"Artificial Intelligence",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Knowledge Representations: Predicate Calculus - Structured Representations, Network Representations. State Space Search: simple search - heuristic search - reasoning with uncertain or incomplete knowledge constraints satisfaction problem."},{code:"IS414",name:"Managing and Modeling Big Data",credit_hours:3,prerequisites:"IS312",type:"Mandatory",description:"Introduction to big data and its characteristics. Big data sources and applications. Data science and big data analytics. Introduction to virtualization and cloud computing. Data analytics life cycle. Hadoop ecosystem (Hive - PIG - Spark etc.). Map-Reduce paradigm - R-language for querying and analyzing big data. NoSQL vs relational databases. Machine learning techniques for big data analytics. Graph databases for representing big data and social networks. Introduction to recommendation systems and other applications."},{code:"IS422",name:"Data Mining",credit_hours:3,prerequisites:"IS322",type:"Mandatory",description:"Introduction and Basic Concepts. Data Exploration. Summary statistics. Graphic Displays of Data Summaries. Measuring Data Similarity and Dissimilarity - Data Preprocessing. Mining Frequent Patterns - Associations and Correlations. Pattern Evaluation. Clustering. Classification and Prediction."},{code:"IS434",name:"Service-Oriented Architecture",credit_hours:3,prerequisites:"IS333",type:"Mandatory",description:"Evolution of client server computing in the context of the World Wide Web. Design and develop a functioning distributed application: various standards and specifications that support service orientation, XML API's, DBMS APIS - XML databases and XQuery - Directory Services. Application Servers and Registries. Security and configuration issues for enterprise systems - Design issues for n-tier distributed systems."},{code:"CS462",name:"Machine Learning",credit_hours:3,prerequisites:["MA113","ST121"],type:"Mandatory",description:"Linear Regression, Polynomial Regression. Logistic Regression. Regularization. Machine Learning System Design. Naive Bayes. Support Vector Machines. Decision Trees. Unsupervised Learning - Recommender Systems. Application Examples such as (Recommender Systems) and Project."}]},electives:{title:"Elective Courses (Student chooses 18 credit hours)",credit_hours:18,courses:[{code:"IS331",name:"Fundamentals of Information Systems",credit_hours:3,prerequisites:"IS211",type:"Elective",description:"Introduction to Information Systems, components of IS, types of IS, IS development life cycle - IS methodologies - quality of IS - project management concepts, the technical aspects of project management that are directly related to practice."},{code:"IS415",name:"Cloud Database",credit_hours:3,prerequisites:"IS312",type:"Elective",description:"Cloud storage: Blobs, NoSQL (Tables) and Relational (SQL Database), CDNS. Cloud Databases, CAP Theorem, NoSQL Database System, Database-as-a-Service, Virtualized Database Servers. Data Partitioning, Concurrency Management, Replication Management. Scalable Data Management in the Cloud. Dynamic provisioning - Map-Reduce queries. Hadoop Distributed File system (HDFS). Data Locality for Hadoop in the Cloud."},{code:"IS416",name:"Distributed Database",credit_hours:3,prerequisites:"IS312",type:"Elective",description:"DBMS Internal - Parallel Architectures for DBMSS - Data Placement Strategies. Parallel Algorithms. Parallel DBMS Implementation Techniques. Distributed DBMS Architectures - Distributed Database Design - Distributed Query Processing - Multi database Systems. Peer-to-Peer Systems - Transaction Management in distributed databases, approaches to concurrency control in Distributed database - deadlock and recovery in Distributed database."},{code:"IS417",name:"Selected Topics in Databases",credit_hours:3,prerequisites:"IS312",type:"Elective",description:"This course aims at introducing students to novel topics in Databases that need to be identified in a responsive manner as technology evolve and develop."},{code:"IS423",name:"Business Process Mining",credit_hours:3,prerequisites:"IS341",type:"Elective",description:"Review over business process management. Event logs. Process Mining: Discovery, Conformance, Enhancement. Discovery Approaches. Conformance Checking Approaches. Enhancement Approaches. Log-based Performance Analysis - Tools: ProM/Disco."},{code:"IS424",name:"Selected Topics in Data Engineering",credit_hours:3,prerequisites:"IS312",type:"Elective",description:"This course aims at introducing students to novel topics in Data Engineering that need to be identified in a responsive manner as technology evolve and develop."},{code:"IS435",name:"Usability Engineering",credit_hours:3,prerequisites:"CS251",type:"Elective",description:"Introduction to Human-Computer Interaction. Interaction styles and human psychology. Design methods, techniques and guidelines. Interface quality and evaluation - User-centered design and task analysis. Interactive systems and interface design examples - Emerging technologies and changes on design. Interface evaluation approaches. Interface design and implementation. Mobile design - limitations and evaluation."},{code:"IS436",name:"Enterprise Mobile Applications Development",credit_hours:3,prerequisites:"IS231",type:"Elective",description:"Mobile technologies and standards: basics concepts, layout, multiple activities and Intents, activity lifecycle, state and preferences. Software development frameworks and tools. Applicable programming language extensions and constraints. Limitations, strengths and opportunities of development for mobile devices. Market development for mobile applications. Current applications (local and international), analysis of successes and failures. Analysis and design techniques for mobile systems - Mobile data management: local databases and remote databases, Location-based services - data Security - Integration with Enterprise Applications."},{code:"IS437",name:"Information Systems Development Methodologies",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"Information Systems Development methodologies concepts, tools and techniques, different models of SDLC Process Methodologies. Object-oriented Methodologies - Rapid Application Development life-cycles such as iterative, spiral and agile."},{code:"IS438",name:"Business Information Systems",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"How IT is used in organizations for the improvement of quality and productivity. The concrete and profound managerial framework in IT management. Cases drawn from major corporations and small businesses to illustrate how Information Technology innovations that can solve organizational problems and challenges. A variety of cases which highlight problems many corporations encounter, as well as international cases, written by prominent international figures in the field, to illustrate how IT can be adapted to conform to other cultures. State-of-the-art advances in Management Information Systems."},{code:"IS439",name:"Selected Topics in Advanced Information Systems",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"This course aims at introducing students to novel topics in advanced information systems that need to be identified in a responsive manner as technology evolve and develop."},{code:"IS442",name:"Geographical Information Systems",credit_hours:3,prerequisites:"IS312",type:"Elective",description:"Introduction to the concepts and principles of Geographic Information systems (GIS), identifying and evaluating the Geographic Information systems, distinction between the geographic and non-geographic environments. Introduction to (GIS) programming tools and devices. Advanced state of the art (GIS) programming tools and devices."},{code:"IS443",name:"Information Systems Quality Assurance",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"IS-QA concepts - Standards, Techniques, Guides and Frameworks of IS-QA - Best Practices of SW Architecture and Development (The Open Group Architecture Framework TOGAF 9.1). Principles of IS Governance & IS Management - Quality attributes & Quality metrics & KPIs - ITIL & CMMI."},{code:"IS444",name:"Information Systems Security and Risk Management",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"Information Security Management Concepts - Risks Assessment and Analysis Methodologies - Information Risks Management and Compliance - Information Security Program Development and Management. Information Security Incident Management."},{code:"IS445",name:"Information Systems Audit and Control",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"The process of Auditing IS. Governance and Management of IT. IS Acquisition - Development and Implementation."},{code:"IS446",name:"Enterprise Information Systems Architecture",credit_hours:3,prerequisites:"IS438",type:"Elective",description:"The role that Enterprise Resource Planning Systems (ERPs) play in an organization and the challenging task of managing the Information Systems (IS) function - How ERP systems use relational databases, the role of an ERP in carrying out business processes in a company, an entire business process chain in different business cycle areas (Accounting - Sales - Procurement - Inventory Management...) - the advantages and challenges of ERP solutions and how to analyze operational data."},{code:"IS447",name:"Information Systems Project Management",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"The world of project management - The manager - the organization - and the team - Project activity and risk planning - Scheduling the project - Allocating resources to the project - Monitoring and controlling the project - Evaluating and terminating the project."},{code:"IS448",name:"E-Business",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"Introduction to the fundamental principles of e-Business and e- Commerce and the underlying used technologies with emphasis on Internet Technologies: web-based tools, e-commerce software - security issues - e-payment systems - web auctions, legal, ethical, international and tax issues, application of tools and services to the development of small scale e-Commerce applications."},{code:"IS449",name:"Selected Topics in Information Systems Engineering",credit_hours:3,prerequisites:"IS333",type:"Elective",description:"This course aims at introducing students to novel topics in Information Systems Engineering that need to be identified in a responsive manner as technology evolve and develop."},{code:"IS495",name:"Selected Topics in Information Systems-1",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"This course aims at introducing students to novel topics in information systems that need to be identified in a responsive manner as technology evolve and develop."},{code:"IS496",name:"Selected Topics in Information Systems-2",credit_hours:3,prerequisites:"IS332",type:"Elective",description:"This course aims at introducing students to novel topics in information systems that need to be identified in a responsive manner as technology evolve and develop."}]},graduation_project:{title:"Graduation Project",credit_hours:6,courses:[{code:"IS498",name:"Graduation Project",credit_hours:6,prerequisites:"Passing 85 Credit Hours",type:"Mandatory",description:"This course will continue for two semesters. In the first semester; a group of students will select one of the projects proposed by the department and analyze the underlying problem. In the second semester; the design and implementation of the project will be conducted."}]},field_training:{title:"Field Training",credit_hours:3,courses:[{code:"TR303",name:"Field Training",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Mandatory",description:"Particular emphasis is placed on the importance of practical experience and all teaching involves industry standard hardware, software, methods and techniques. Students asked to complete training on chosen area of specialization to be familiar with the industry."}]}}},Decision_Support_and_Operations_Research:{title:"Decision Support and Operations Research",major_requirements:{title:"Major Requirements",total_credit_hours:63,applied_sciences_mandatory:{title:"Applied Sciences (Mandatory)",credit_hours:39,courses:[{code:"DS312",name:"Decision Support and Future Studies Methodologies",credit_hours:3,prerequisites:"DS211",type:"Mandatory",description:"Concepts and techniques to construct and implement an effective computer-based decision support systems (DSS) including problem solving - decision-making process, types of DSS (Data/Model/ Knowledge DSS), model building and its languages, model selection/integration/execution, types of computer based information systems - system development life cycle - systems analysis and integrated computer-based DSS design methodologies, real life case studies of integrated DSS - foundations of futures studies - future studies methodologies, such as; Scenario approach, environmental scanning, and futures wheel - strategic foresight - software tools and integrated DSS software packages will be stressed used throughout the course."},{code:"DS313",name:"Computational Intelligence",credit_hours:3,prerequisites:["DS321","ST222"],type:"Mandatory",description:"main components of the field of computational intelligence (CI) such as evolutionary and fuzzy computation - emphasis will be made on the application of CI techniques to real life optimization problems - related heuristic techniques such as Ant Algorithms, Genetic Algorithms, Tabu search, Simulated Annealing are covered the advantages and limitations as well as the guidelines for selecting the most efficient approach for various types of problems implementation of CI techniques for various problems will be stressed throughout the course."},{code:"DS321",name:"Linear and Integer Programming",credit_hours:3,prerequisites:["DS211","MA113"],type:"Mandatory",description:"Formulation of problems into linear and integer programs, the graphical solution approach, the simplex method, two-phase method, dual simplex algorithm, revised simplex, duality in linear programming, sensitivity analysis, post-optimal analysis, parametric linear programming, decomposition technique, interior-point method, integer programming algorithms - economic interpretation of solutions - real life applications such as the traveling salesman, transportation and assignment problems real life case studies and state of art solver software will be used throughout the course."},{code:"DS322",name:"Non-linear Programming",credit_hours:3,prerequisites:"DS321",type:"Mandatory",description:"Definitions and properties of convex functions and sets, optimality conditions of unconstrained and constrained nonlinear programming problems - line search methods without using derivatives, line search methods using derivatives, multidimensional search methods without using derivatives - multidimensional search methods using derivatives - penalty and barrier functions methods - and methods of feasible directions real life case studies and state of art solver software will be used throughout the course."},{code:"DS323",name:"Dynamic Programming and Stochastic Modeling",credit_hours:3,prerequisites:"DS321",type:"Mandatory",description:"Dynamic programming, stochastic models, queuing theory - multistage decision-making - recursive equations - forward and backward recursion - state variables in dynamic programming -Markov chains and analysis, Markov decision process -random walk - Poisson process - truncated Poisson process, pure birth process - pure death process and birth and death process queuing systems covering single and multi-stage queuing models, queuing network models real life case studies and state of art solver software will be used throughout the course."},{code:"DS331",name:"System Modeling and Simulation",credit_hours:3,prerequisites:"CS213",type:"Mandatory",description:"Fundamentals of simulation as a modeling technique - emphasis is on the value of simulation as an experimental tool to support problem solving and decision making concepts of building a complete simulation study through stochastic discrete event simulation procedures (event, activity, and process based models). Input data analysis, different time advance mechanisms, validation and verification, output data analysis - using output to support decision making are studied through a number of mathematical, industrial and business applications. statistical methods in simulation experiments implementing different simulation models using computer programming is stressed throughout the course -introduction to software tools for simulation is given concepts of random number generation and sampling are discussed and used."},{code:"DS341",name:"Learning From Data",credit_hours:3,prerequisites:"ST222",type:"Mandatory",description:"Theoretical and practical aspects related to building data driven models - linear models for regression and classification - kernel machines, neural networks, emphasis will be placed on practical computational complexity and programming aspects of such models - exposition will be made of the problem of over fitting, the bias-variance dilemma - model regularization and model validation."},{code:"DS352",name:"Production and Operations Management",credit_hours:3,prerequisites:"DS312",type:"Mandatory",description:"Introduction to a variety of areas in operations and supply chain management, various operations management decision including service and product design, quality management, process and capacity, facility location, layout design, scheduling, and inventory management real life case studies and state of art software will be used throughout the course."},{code:"CS361",name:"Artificial Intelligence",credit_hours:3,prerequisites:"CS214",type:"Mandatory",description:"Knowledge Representations: Predicate Calculus - Structured Representations, Network Representations. State Space Search: simple search - heuristic search - reasoning with uncertain or incomplete knowledge constraints satisfaction problem."},{code:"DS414",name:"Game Theory",credit_hours:3,prerequisites:["ST222","DS321"],type:"Mandatory",description:"Strategy games, rationality, dominance relations - bargaining theory, non-cooperative games, cooperative games, games with incomplete information, repeated games and evolutionary stable strategies, case studies will be used to illustrate the application of game theory to real world problems along with implementing game-theoretic settings."},{code:"DS415",name:"Decision Theory",credit_hours:3,prerequisites:["ST222","DS321"],type:"Mandatory",description:"Basic concepts of decision making under certainty, risk and uncertainty, decision tables - decision trees - sequential decision-making - opportunity loss, one-time decisions - expected value of information - conditional probability - decision analysis, multiple comparison and multiple ranking methods are explained -approaches to the management of risk and concepts as such as uncertainty and variability, Quantifying uncertainty, Probability assessment methods and risk attitudes real life case studies and state of art software will be used throughout the course."},{code:"DS424",name:"Multi-objective Programming",credit_hours:3,prerequisites:"DS322",type:"Mandatory",description:"Concepts of multi-objective programming, vector optimization problems techniques, utility theory, goal programming methods, interactive multi-objective methods and evolutionary algorithms for multi-objective programming - real life case studies and state of art solver software will be used throughout the course."},{code:"DS425",name:"Network Modeling and Optimization",credit_hours:3,prerequisites:"DS323",type:"Mandatory",description:"Introduction to network problems in operations research, computer science, electrical engineering and systems engineering concepts of graph theory, network representations, network transformations, shortest paths algorithms, maximum flows algorithms, minimum cost flows algorithms, generalized network and combinatorial-based network models real life case studies and algorithms implementation will be stressed throughout the course."}]},electives:{title:"Elective Courses (Student chooses 18 credit hours)",credit_hours:18,courses:[{code:"DS342",name:"Data Analytics",credit_hours:3,prerequisites:"ST222",type:"Elective",description:"Design, build, verify, and test predictive data models to make data-driven decisions concepts, methods, and applications of pattern discovery in data mining, concepts of cluster analysis, clustering methodologies, algorithms, and applications, partitioning methods, hierarchical methods, and density-based methods - steps of data preparation, analysis, learning and modeling, and identifying the predictive/descriptive model that produces the best results."},{code:"DS343",name:"Probabilistic Reasoning",credit_hours:3,prerequisites:"ST222",type:"Elective",description:"Bayesian data analysis, inference and networks, a disciplined approach to hypothesis formulation and test and to cultivate and appreciation of reasoning and decision making under uncertainty."},{code:"DS344",name:"Forecasting and Predictive Analytics",credit_hours:3,prerequisites:"DS341",type:"Elective",description:"The effective application of popular data analytics tools - practical approaches to data cleaning, parsing, and extraction for various sources solving predictive analytics problems using models such as multiple linear regression, logistic regression, auto-regressive integrated moving average (ARIMA), decision trees, and neural networks time-series analysis forecasting process: goal definition, data visualization, modeling, performance, evaluation, and model deployment - interpretation of results."},{code:"DS416",name:"Strategic Decision Making",credit_hours:3,prerequisites:"DS321",type:"Elective",description:"Key concepts, principles, and tools of strategic management - overview of the strategic decision making process, formulating business vision and mission, external assessment - internal assessment - strategies analysis and choice - real life case studies, applications and use of state of art software packages are stressed throughout the course."},{code:"DS432",name:"System Dynamics Modeling",credit_hours:3,prerequisites:"DS331",type:"Elective",description:"Introduction to systems thinking and the system dynamics approach to policy analysis -applications to business management and public policy - causal-loop and 'stock and flow' models of business growth, technology adoption, marketing, and various other domains. use of role-based simulation games to explain key principles of systems. use of simulation software to model and solve problems - case studies in dynamic policy analysis."},{code:"DS433",name:"Agent-Based Modeling and Complex Systems",credit_hours:3,prerequisites:"DS331",type:"Elective",description:"Concepts of agent-based modeling (ABM) and complex systems -agents, their internal structure, their interactions, simulation environment -model validation. complex adaptive systems; feedback loops, externalities, nonlinearity, chaos theory, self-organization theory, emergent properties resilient and robustness, schemata and cellular automata real life case studies, applications and ABM implementations are stressed throughout the course."},{code:"DS453",name:"Crisis Management",credit_hours:3,prerequisites:"DS312",type:"Elective",description:"concepts and fundamentals of crisis management identifying, preventing, and controlling crisis situations, identifying potential risks or situations that may precipitate a crisis developing, assessing and determining consequences of contingency plans real life case studies, applications and use of state of art software packages are stressed throughout the course."},{code:"DS454",name:"Service Management",credit_hours:3,prerequisites:"DS312",type:"Elective",description:"A complete and comprehensive picture of the management of service industries -understanding of the nature and importance of the service sector in the international economy effective decision making in the management of a service organization -design and management of systems for services, contextualization of the service sector and its role in the economy. service marketing - service quality, service portfolio management, service systems, capacity management."},{code:"DS455",name:"Managerial Economics and Financial Analysis",credit_hours:3,prerequisites:"DS312",type:"Elective",description:"Formulating, estimating, and evaluating the expected economic outcomes of alternatives designed to accomplish a defined purpose mathematical techniques simplify the economic evaluation of alternatives determining the economic feasibility of projects; alternatives, especially the time value of money, interest rates, depreciation, replacement, economic life, present value, rate of return, and payback period financing supply and demand - private and social cost estimations, secondary and intangible benefits and costs, benefit-cost models - economic risk analysis - economic optimization."},{code:"DS456",name:"Project Management",credit_hours:3,prerequisites:"DS211",type:"Elective",description:"Introduction to the context and addresses the principles and the basic techniques of project management various project management techniques related to project definition, project scheduling, managing projects under resource limitation, and managing project risks -integrated planning, scheduling, and control systems for planning the scope of a project real life case studies and state of art software will be used throughout the course."},{code:"DS495",name:"Selected Topics in Operations Research and Decision Support - 1",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Elective",description:"This course aims at introducing students to novel topics in decision support that need to be identified in a responsive manner as technology evolve and develop."},{code:"DS496",name:"Selected Topics in Operations Research and Decision Support - 2",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Elective",description:"This course aims at introducing students to novel topics in decision support that need to be identified in a responsive manner as technology evolve and develop."}]},graduation_project:{title:"Graduation Project",credit_hours:6,courses:[{code:"DS498",name:"Graduation Project",credit_hours:6,prerequisites:"Passing 85 Credit Hours",type:"Mandatory",description:"This course will continue for two semesters. In the first semester; a group of students will select one of the projects proposed by the department and analyze the underlying problem. In the second semester; the design and implementation of the project will be conducted."}]},field_training:{title:"Field Training",credit_hours:3,courses:[{code:"TR304",name:"Field Training",credit_hours:3,prerequisites:"Passing 60 Credit Hours",type:"Mandatory",description:"Particular emphasis is placed on the importance of practical experience and all teaching involves industry standard hardware, software, methods and techniques. Students asked to complete training on chosen area of specialization to be familiar with the industry."}]}}}},ti={university:px,faculty:mx,program_requirements:gx,majors:vx},_x=t=>/[a-zA-Z]/.test(t)&&/[0-9]/.test(t),yx=()=>{var n,i,r,s,o,a,l,c;const t=[],e=new Set;try{const f=h=>{Array.isArray(h)&&h.forEach(d=>{if(d&&d.code&&d.name&&d.credit_hours!==void 0){const p=`${d.code}_${d.name}`;e.has(p)||(e.add(p),t.push({code:d.code,name:d.name,credit_hours:d.credit_hours}))}})};if((n=ti.program_requirements)!=null&&n.general_requirements){const h=ti.program_requirements.general_requirements;(i=h.mandatory)!=null&&i.courses&&f(h.mandatory.courses),(r=h.elective)!=null&&r.courses&&f(h.elective.courses)}if((o=(s=ti.program_requirements)==null?void 0:s.university_requirements_no_credit)!=null&&o.courses&&f(ti.program_requirements.university_requirements_no_credit.courses),(a=ti.program_requirements)!=null&&a.college_requirements){const h=ti.program_requirements.college_requirements;(l=h.mathematics_and_basic_sciences)!=null&&l.courses&&f(h.mathematics_and_basic_sciences.courses),(c=h.basic_computer_science)!=null&&c.courses&&f(h.basic_computer_science.courses)}ti.majors&&Object.keys(ti.majors).forEach(h=>{var p,g,y,m;const d=ti.majors[h];if(d&&d.major_requirements){const u=d.major_requirements;(p=u.applied_sciences_mandatory)!=null&&p.courses&&f(u.applied_sciences_mandatory.courses),(g=u.electives)!=null&&g.courses&&f(u.electives.courses),(y=u.graduation_project)!=null&&y.courses&&f(u.graduation_project.courses),(m=u.field_training)!=null&&m.courses&&f(u.field_training.courses)}})}catch(f){console.error("Error processing course data:",f)}return t},xx=({onAddCourse:t,onShowImport:e})=>{const[n,i]=J.useState(""),[r,s]=J.useState(2),[o,a]=J.useState("A+"),[l,c]=J.useState([]),[f,h]=J.useState(!1),[d,p]=J.useState([]),g=J.useRef(null),y=J.useRef(null);J.useEffect(()=>{p(yx())},[]),J.useEffect(()=>{const v=P=>{g.current&&!g.current.contains(P.target)&&y.current&&!y.current.contains(P.target)&&h(!1)};return document.addEventListener("mousedown",v),()=>{document.removeEventListener("mousedown",v)}},[]);const m=(v,P)=>{if(v=v.toLowerCase(),P=P.toLowerCase(),v===P)return 1;if(v.length===0||P.length===0)return 0;const C=U=>U<=5?1:U<=9?2:3,M=[];for(let U=0;U<=P.length;U++)M[0]=M[0]||[],M[0][U]=U;for(let U=0;U<=v.length;U++)M[U]=M[U]||[],M[U][0]=U;for(let U=1;U<=v.length;U++)for(let L=1;L<=P.length;L++)v.charAt(U-1)===P.charAt(L-1)?M[U][L]=M[U-1][L-1]:M[U][L]=Math.min(M[U-1][L-1]+1,Math.min(M[U][L-1]+1,M[U-1][L]+1));const R=M[v.length][P.length],T=Math.min(v.length,P.length),S=C(T);if(R>S)return 0;if(T<=2)return v===P?1:0;const I=Math.max(v.length,P.length);return Math.max(0,1-R/I)},u=v=>{const P=v.target.value;if(i(P),P.length>=2){const C=P.toLowerCase();let M=[];const R=_x(C);if(d.forEach(S=>{const I=R?S.code.toLowerCase().includes(C):!1,U=S.name.toLowerCase().includes(C);let L=0;if(!I&&!U){const W=S.name.split(/\s+/).map(j=>j.toLowerCase());for(const j of W)if(j.length>=3){const $=m(j,C);L=Math.max(L,$)}if(R){const j=m(S.code.toLowerCase(),C);L=Math.max(L,j)}}if(I||U||L>.85){let W=0;if(I&&(W+=.95),U&&(W+=.85),L>0){const j=L>=.95?.5:.25;W+=L*j}M.push({course:S,score:W})}}),M.sort((S,I)=>I.score-S.score),M.length>0){const S=M[0].score,I=Math.max(.7,S*.8);M=M.filter(U=>U.score>=I),M=M.slice(0,6)}const T=M.map(S=>S.course);c(T),h(T.length>0)}else c([]),h(!1)},_=v=>{i(v.name),s(v.credit_hours),h(!1)},x=v=>{v.preventDefault(),t({name:n,hours:r,grade:o}),i(""),s(2),a("A+")};return b.jsx("div",{className:"top-box",children:b.jsxs(cx,{onSubmit:x,children:[b.jsxs("div",{className:"form-row",children:[b.jsx("label",{className:"form-label",htmlFor:"courseName",children:"Course Name:"}),b.jsxs("div",{className:"form-grade-container",children:[b.jsx("input",{ref:y,type:"text",id:"courseName",className:"form-input",value:n,onChange:u,placeholder:"Enter course name",onFocus:()=>n.length>=2&&h(!0)}),f&&l.length>0&&b.jsx("div",{ref:g,style:{position:"absolute",top:"100%",left:0,right:0,backgroundColor:"white",border:"2px solid rgba(255, 255, 255, 0.5)",borderRadius:"var(--radius-md)",maxHeight:"200px",overflowY:"auto",zIndex:1e3,boxShadow:"var(--shadow-md)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",background:"rgba(255, 255, 255, 0.9)"},children:l.map((v,P)=>b.jsxs("div",{style:{padding:"10px 15px",cursor:"pointer",borderBottom:P<l.length-1?"1px solid rgba(203, 213, 225, 0.5)":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:500,color:"var(--text-color)",transition:"var(--transition-base)"},onClick:()=>_(v),onMouseEnter:C=>{C.currentTarget.style.backgroundColor="rgba(255, 121, 85, 0.1)",C.currentTarget.style.color="var(--primary-600)"},onMouseLeave:C=>{C.currentTarget.style.backgroundColor="",C.currentTarget.style.color="var(--text-color)"},children:[b.jsx("strong",{children:v.code})," - ",v.name]},P))})]})]}),b.jsxs("div",{className:"form-row",children:[b.jsx("label",{className:"form-label",htmlFor:"courseHours",children:"Credit Hours:"}),b.jsx(hx,{value:r,onChange:v=>s(v),min:0,max:3,disabled:!1})]}),b.jsxs("div",{className:"form-row",children:[b.jsx("label",{className:"form-label",htmlFor:"courseGrade",children:"Grade:"}),b.jsx("div",{className:"form-grade-container",children:b.jsx(Uv,{courseId:"form-grade",courseName:"Form Grade",onSelectGrade:(v,P)=>a(P),currentGrade:o,displayMode:"input"})})]}),b.jsxs("div",{className:"button-group",children:[b.jsx("button",{type:"submit",className:"btn-primary",children:"Add Course"}),b.jsx("button",{type:"button",className:"btn-secondary",onClick:e,children:"Import Courses"})]})]})})},op=[0,1,2,3],Sx=({onSelectCreditHours:t,triggerRef:e})=>{const n=J.useRef(null),[i,r]=J.useState({top:0,left:0}),[s,o]=J.useState(null);return J.useEffect(()=>{const a=document.createElement("div");return a.style.position="absolute",a.style.top="0",a.style.left="0",a.style.width="0",a.style.height="0",a.style.overflow="visible",a.style.pointerEvents="none",a.style.zIndex="100000",document.body.appendChild(a),o(a),()=>{document.body.removeChild(a)}},[]),J.useEffect(()=>{if(!e.current||!s)return;const a=()=>{const l=e.current.getBoundingClientRect(),c=165;let f=l.bottom+8,h=l.left+l.width/2-c/2;const d=document.documentElement.clientWidth;h<10?h=10:h+c>d-10&&(h=d-c-10);const p=document.documentElement.clientHeight,g=200;f+g>p&&(f=Math.max(10,l.top-g)),s.style.transform=`translate(${window.scrollX}px, ${window.scrollY}px)`,r({top:f,left:h})};return a(),window.addEventListener("scroll",a),window.addEventListener("resize",a),()=>{window.removeEventListener("scroll",a),window.removeEventListener("resize",a)}},[e,s]),J.useEffect(()=>{const a=c=>{c.stopPropagation()},l=n.current;return l&&(l.addEventListener("mouseover",a),l.addEventListener("mouseenter",a),l.addEventListener("mouseleave",a)),()=>{l&&(l.removeEventListener("mouseover",a),l.removeEventListener("mouseenter",a),l.removeEventListener("mouseleave",a))}},[]),s?Wl.createPortal(b.jsx("div",{className:"credit-hours-dropdown-menu",style:{top:`${i.top}px`,left:`${i.left}px`},ref:n,children:b.jsx("div",{className:"credit-hours-dropdown-content",children:op.map((a,l)=>b.jsxs(Yn.Fragment,{children:[b.jsx("button",{className:"credit-hours-dropdown-option",onClick:c=>{c.preventDefault(),c.stopPropagation(),t(a)},type:"button",children:a}),l<op.length-1&&b.jsx("div",{className:"credit-hours-dropdown-separator"})]},a))})}),s):null},Mx=({courseId:t,courseName:e,onSelectCreditHours:n})=>{const[i,r]=J.useState(!1),s=J.useRef(null),o=Sl.getInstance(),a=`credit-hours-${t}`;J.useEffect(()=>{const f=()=>r(!1);return o.register(a,f),()=>{o.unregister(a)}},[a,o]),J.useEffect(()=>{if(!s.current)return;const f=s.current.closest("tr");f&&(i?f.classList.add("dropdown-open"):f.classList.remove("dropdown-open"))},[i]),J.useEffect(()=>{function f(h){s.current&&!s.current.contains(h.target)&&(r(!1),o.closeDropdown(a))}if(i)return setTimeout(()=>{document.addEventListener("click",f)},10),()=>document.removeEventListener("click",f)},[i,a,o]);const l=f=>{f.preventDefault(),f.stopPropagation(),i?(o.closeDropdown(a),r(!1)):(o.openDropdown(a),r(!0))},c=f=>{n(t,f),r(!1),o.closeDropdown(a)};return b.jsxs("div",{className:"credit-hours-dropdown",ref:s,children:["      ",b.jsx("button",{className:"credit-hours-dropdown-trigger static-arrow",onClick:l,"aria-label":`Change credit hours for ${e}`,"aria-expanded":i,type:"button",children:b.jsx("svg",{className:`credit-hours-dropdown-arrow ${i?"open":""}`,width:"8",height:"8",viewBox:"0 0 12 12",fill:"currentColor",children:b.jsx("path",{d:"M6 8.5C5.88079 8.5 5.76159 8.45746 5.66967 8.37239L2.16967 5.37239C1.94678 5.18863 1.9155 4.85904 2.09926 4.63615C2.28301 4.41325 2.61261 4.38197 2.8355 4.56573L6 7.29194L9.1645 4.56573C9.38739 4.38197 9.71699 4.41325 9.90074 4.63615C10.0845 4.85904 10.0532 5.18863 9.83033 5.37239L6.33033 8.37239C6.23841 8.45746 6.11921 8.5 6 8.5Z"})})}),i&&b.jsx(Sx,{onSelectCreditHours:c,triggerRef:s})]})},Ex=({modalData:t,onClose:e})=>{const[n,i]=J.useState(!1),r=J.useRef(null),[s,o]=J.useState(!1);J.useEffect(()=>(t?(document.body.classList.add("modal-open"),setTimeout(()=>i(!0),10)):(document.body.classList.remove("modal-open"),i(!1)),()=>{document.body.classList.remove("modal-open")}),[t]),J.useEffect(()=>{const l=r.current;if(!l)return;const c=()=>{const h=l.scrollHeight>l.clientHeight,d=l.scrollHeight-l.scrollTop<=l.clientHeight+5;o(h&&!d)};c(),l.addEventListener("scroll",c);const f=new ResizeObserver(c);return f.observe(l),()=>{l.removeEventListener("scroll",c),f.unobserve(l)}},[t,n]);const a=()=>{var l;(l=r.current)==null||l.scrollTo({top:r.current.scrollHeight,behavior:"smooth"})};return t?Rf.createPortal(b.jsx("div",{className:`modal-overlay ${n?"modal-visible":""}`,onClick:e,children:b.jsxs("div",{className:"modal-content",onClick:l=>l.stopPropagation(),children:[b.jsxs("div",{className:"modal-header",children:[b.jsx("h2",{className:"modal-title",children:t.title}),b.jsx("button",{className:"modal-close",onClick:e,"aria-label":"Close",children:b.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:b.jsx("path",{d:"M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"})})}),"        "]}),b.jsxs("div",{className:"modal-body",children:[b.jsxs("div",{className:"stats-grid",children:[b.jsxs("div",{className:"stat-card",children:[b.jsx("div",{className:"stat-value",children:t.stats.courseCount}),b.jsx("div",{className:"stat-label",children:"Courses"})]}),t.stats.failedCredits>0?b.jsxs("div",{className:"stat-card",children:[b.jsxs("div",{className:"stat-value credits-split",children:[b.jsx("span",{className:"passed-credits",children:t.stats.passedCredits}),b.jsx("span",{className:"separator",children:"/"}),b.jsx("span",{className:"failed-credits",children:t.stats.failedCredits})]}),b.jsx("div",{className:"stat-label",children:"Credits (Pass/Fail)"})]}):b.jsxs("div",{className:"stat-card",children:[b.jsx("div",{className:"stat-value",children:t.stats.totalCredits}),b.jsx("div",{className:"stat-label",children:"Credit Hours"})]}),b.jsxs("div",{className:"stat-card",children:[b.jsx("div",{className:"stat-value",children:t.stats.gpa.toFixed(2)}),b.jsx("div",{className:"stat-label",children:"GPA"})]})]}),b.jsxs("div",{className:"course-list",children:[b.jsx("h3",{children:"Courses:"}),"            ",b.jsxs("div",{className:"course-items",ref:r,children:[" ",t.courses.map(l=>b.jsxs("div",{className:"course-item",children:[b.jsx("div",{className:"course-name",children:l.name}),b.jsxs("div",{className:"course-credits",children:[l.hours," credits"]}),b.jsxs("div",{className:"course-status-container",children:[l.grade==="F"&&b.jsx("span",{className:"course-status failed",children:"Failed"}),l.grade&&l.grade!=="F"&&b.jsx("span",{className:"course-status passed",children:"Passed"}),l.grade===null&&b.jsx("span",{className:"course-status pending",children:"Pending"})]})]},l.id))]}),s&&b.jsx("div",{className:"scroll-down-arrow",onClick:a,title:"Scroll to bottom",children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",width:"24",height:"24",children:b.jsx("path",{d:"M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"})})})]})]})]})}),document.body):null},Tx=({show:t,title:e,message:n,confirmText:i,cancelText:r,onConfirm:s,onCancel:o,isDanger:a=!1})=>{const[l,c]=J.useState(!1);return J.useEffect(()=>(t?(document.body.classList.add("modal-open"),setTimeout(()=>c(!0),10)):(document.body.classList.remove("modal-open"),c(!1)),()=>{document.body.classList.remove("modal-open")}),[t]),t?Rf.createPortal(b.jsx("div",{className:`modal-overlay ${l?"modal-visible":""}`,onClick:o,children:b.jsxs("div",{className:"modal-content confirmation-modal",onClick:f=>f.stopPropagation(),children:[b.jsxs("div",{className:"modal-header",children:[b.jsx("h2",{className:"modal-title",children:e}),b.jsx("button",{className:"modal-close",onClick:o,"aria-label":"Close",children:b.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:b.jsx("path",{d:"M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"})})})]}),b.jsx("div",{className:"modal-body",children:b.jsx("p",{className:"confirmation-message",children:n})}),b.jsx("div",{className:"modal-footer",children:b.jsxs("div",{className:"button-group",children:[b.jsx("button",{className:"btn-secondary",onClick:o,children:r}),b.jsx("button",{className:a?"btn-danger":"btn-primary",onClick:s,children:i})]})})]})}),document.body):null},ap="gpa-calculator-group-states",wx=({courses:t,onRemoveCourse:e,onUpdateGrade:n,onUpdateCreditHours:i,onClearCourses:r})=>{const[s,o]=J.useState({}),[a,l]=J.useState(null),[c,f]=J.useState(!1),[h,d]=J.useState(!1);J.useEffect(()=>{try{const M=localStorage.getItem(ap);let R={};if(M){const T=JSON.parse(M);Object.keys(T).forEach(S=>{const I=T[S];R[S]=typeof I=="number"?I===1:!!I})}Object.keys(y).forEach(T=>{const S=`level-${T}`;S in R||(R[S]=!0),Object.keys(y[T]).forEach(I=>{const U=`term-${T}-${I}`;U in R||(R[U]=!0)})}),o(R),f(!0)}catch(M){console.error("Failed to load group states from localStorage:",M);const R={};Object.keys(y).forEach(T=>{const S=`level-${T}`;R[S]=!0,Object.keys(y[T]).forEach(I=>{const U=`term-${T}-${I}`;R[U]=!0})}),o(R),f(!0)}},[t]),J.useEffect(()=>{if(c)try{localStorage.setItem(ap,JSON.stringify(s))}catch(M){console.error("Failed to save group states to localStorage:",M)}},[s,c]),J.useEffect(()=>{Object.entries(s).forEach(([M,R])=>{if(!R){const T=M.startsWith("level-")?`.${M.replace("level-","level-container.")}`:`.${M.replace("term-","term-container.")}`;document.querySelectorAll(T).forEach(I=>{if(I.style.pointerEvents="none",I.setAttribute("aria-hidden","true"),I.classList.contains("collapsed")||(I.classList.remove("expanded","expanding","collapsing"),I.classList.add("collapsed")),I.querySelectorAll('button, a, input, select, [role="button"], [tabindex], .remove-btn, .info-btn').forEach(L=>{if(L.hasAttribute("tabindex")&&L.getAttribute("tabindex")!=="-1"){const W=L.getAttribute("tabindex");L.setAttribute("data-original-tabindex",W||"0")}L.style.pointerEvents="none",L.setAttribute("tabindex","-1"),L.setAttribute("aria-hidden","true"),L.tagName==="BUTTON"&&(L.disabled=!0,L.style.cursor="default")}),!I.querySelector(".interaction-blocker")){const L=document.createElement("div");L.className="interaction-blocker",L.style.position="absolute",L.style.top="0",L.style.left="0",L.style.width="100%",L.style.height="100%",L.style.zIndex="1000",L.style.pointerEvents="auto",L.addEventListener("click",W=>(W.preventDefault(),W.stopPropagation(),!1)),I.style.position="relative",I.appendChild(L)}})}})},[s]);const p=t.filter(M=>M.isImported),g=t.filter(M=>!M.isImported),y={};p.forEach(M=>{M.level&&M.term&&(y[M.level]||(y[M.level]={}),y[M.level][M.term]||(y[M.level][M.term]=[]),y[M.level][M.term].push(M))});const m=M=>{const R=!s[M];o(T=>({...T,[M]:R})),setTimeout(()=>{document.querySelectorAll(`.${M.replace("level-","level-container.").replace("term-","term-container.")}`).forEach(S=>{const I=S.querySelectorAll('button, a, input, select, [role="button"], [tabindex]');R?(S.classList.remove("collapsed"),S.classList.add("expanding"),S.setAttribute("aria-hidden","false"),S.style.pointerEvents="none",setTimeout(()=>{S.classList.remove("expanding"),S.classList.add("expanded"),setTimeout(()=>{S.style.pointerEvents="auto",I.forEach(U=>{if(U.style.pointerEvents="auto",U.removeAttribute("aria-hidden"),U.hasAttribute("data-original-tabindex")){const L=U.getAttribute("data-original-tabindex");U.setAttribute("tabindex",L||"0"),U.removeAttribute("data-original-tabindex")}else U.setAttribute("tabindex","0")})},1200)},50)):(S.style.pointerEvents="none",S.setAttribute("aria-hidden","true"),I.forEach(U=>{if(U.hasAttribute("tabindex")){const L=U.getAttribute("tabindex");U.setAttribute("data-original-tabindex",L||"0")}U.style.pointerEvents="none",U.setAttribute("tabindex","-1"),U.setAttribute("aria-hidden","true")}),S.classList.remove("expanded"),S.classList.add("collapsing"),setTimeout(()=>{S.classList.remove("collapsing"),S.classList.add("collapsed")},1200))})},0)},u=M=>s[M]!==!1,_=(M,R,T)=>{l({title:M,stats:R,courses:T})},x=()=>{l(null)},v=M=>{const R=M.reduce((U,L)=>U+L.hours,0),T=M.reduce((U,L)=>L.grade!==null&&L.grade!=="F"?U+L.hours:U,0),S=M.reduce((U,L)=>L.grade==="F"?U+L.hours:U,0),I=Lv(M);return{courseCount:M.length,totalCredits:R,passedCredits:T,failedCredits:S,gpa:I}},P=M=>{const R=y[M];return Object.values(R).flat()},C=M=>b.jsxs("tr",{className:"course-row",children:[b.jsx("td",{className:"course-name",children:M.name}),"      ",b.jsx("td",{className:"course-hours",children:b.jsxs("div",{className:"credit-hours-cell",children:[b.jsx("div",{className:"credit-hours-value-container",children:b.jsx("span",{className:"credit-hours-value",children:M.hours})}),b.jsx(Mx,{courseId:M.id,courseName:M.name,onSelectCreditHours:i,currentHours:M.hours})]})}),b.jsx("td",{children:b.jsxs("div",{className:"grade-cell",children:[b.jsx("div",{className:"grade-badge-container",children:M.grade!==null?b.jsx("span",{className:"course-grade-badge",style:Nv(M.grade),children:M.grade}):b.jsx("span",{className:"course-grade-badge empty-grade",children:"-"})}),b.jsx(Uv,{courseId:M.id,courseName:M.name,onSelectGrade:n,currentGrade:M.grade!==null?M.grade:null})]})}),b.jsx("td",{children:b.jsx("button",{className:"remove-btn",onClick:()=>e(M.id),"aria-label":`Remove ${M.name}`,children:b.jsxs("svg",{fill:"#ffffff",viewBox:"-230 -230 1460.00 1460.00",xmlns:"http://www.w3.org/2000/svg",stroke:"#ffffff","stroke-width":"5",children:[b.jsx("g",{id:"SVGRepo_bgCarrier","stroke-width":"0",transform:"translate(0,0), scale(1)",children:b.jsx("rect",{x:"-230",y:"-230",width:"1460.00",height:"1460.00",rx:"730",fill:"#e81717",strokeWidth:"0"})}),b.jsx("g",{id:"SVGRepo_tracerCarrier","stroke-linecap":"round","stroke-linejoin":"round",stroke:"#CCCCCC","stroke-width":"2"}),b.jsx("g",{id:"SVGRepo_iconCarrier",children:b.jsx("path",{d:"M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 21.5t30 8.5h434q18 0 29-8.5t13-21.5l38-505q0-12-9-21t-21-9zM344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5l18 386q0 12-7.5 21t-18.5 9zm182-31q0 13-7.5 22t-18.5 9-18.5-9-7.5-22l-4-385q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm156 1q0 12-8 21t-18 9q-11 0-18.5-9t-7.5-21l18-386q0-12 9-20.5t21-8.5 21 8.5 9 20.5zm101-605l-179-30q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15l-179 30q-19 3-31.5 14.5T173 249v28q0 9 6.5 15t15.5 6h610q9 0 15.5-6t6.5-15v-28q0-17-12.5-28.5T783 206z"})})]})})})]},M.id);return t.length===0?b.jsx("div",{className:"table-box",children:b.jsxs("div",{className:"empty-state",children:[b.jsx("div",{className:"empty-state-icon",children:b.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:b.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"})})}),b.jsx("p",{children:"No courses added yet. Add your first course above or import your courses automatically!"})]})}):b.jsxs("div",{className:"table-box",children:[g.length>0&&b.jsxs("div",{className:"course-group level-group",children:[b.jsx("div",{className:"group-header level-header",children:b.jsx("h3",{className:"group-title",children:"Manually Added Courses"})}),b.jsx("div",{className:"table-container expanded",children:b.jsx("div",{className:"course-container",children:b.jsxs("table",{className:"course-table",children:[b.jsx("thead",{className:"table-header-hidden",children:b.jsxs("tr",{children:[b.jsx("th",{children:"Course Name"}),b.jsx("th",{children:"Credit Hours"}),b.jsx("th",{children:"Grade"}),b.jsx("th",{children:"Remove"})]})}),b.jsx("tbody",{children:g.map(C)})]})})})]}),Object.keys(y).sort().map(M=>{const R=P(M),T=v(R),S=u(`level-${M}`);return b.jsxs("div",{className:"course-group level-group",children:[b.jsx("div",{className:"group-header level-header clickable",onClick:I=>{I.preventDefault(),I.stopPropagation(),m(`level-${M}`)},role:"button",tabIndex:-1,children:b.jsxs("h3",{className:"group-title",children:["                ",b.jsxs("span",{className:`group-toggle ${S?"expanded":"collapsed"}`,children:[b.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:b.jsx("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"})}),"                "]}),M,b.jsx("button",{className:"info-btn",title:`GPA: ${T.gpa.toFixed(2)}`,"aria-label":`View statistics for ${M}`,onClick:I=>{I.preventDefault(),I.stopPropagation(),_(M,T,R)},children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:b.jsx("path",{d:"M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z",fill:"#ff7955"})})})]})}),b.jsx("div",{className:`table-container level-container ${S?"expanded":"collapsed"}`,"aria-hidden":!S,style:{pointerEvents:S?"auto":"none"},children:Object.keys(y[M]).sort((I,U)=>{const L={"First Term":1,"Second Term":2},W=L[I]||3,j=L[U]||3;return W!==j?W-j:I.localeCompare(U)}).map(I=>{const U=y[M][I],L=v(U),W=u(`term-${M}-${I}`);return b.jsxs("div",{className:"course-group term-group",children:[b.jsx("div",{className:"group-header term-header clickable",onClick:j=>{j.preventDefault(),j.stopPropagation(),m(`term-${M}-${I}`)},role:"button",tabIndex:-1,children:b.jsxs("h4",{className:"group-title term-title",children:["                          ",b.jsx("span",{className:`group-toggle ${W?"expanded":"collapsed"}`,children:b.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",children:b.jsx("path",{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"})})}),I,b.jsx("button",{className:"info-btn",title:`GPA: ${L.gpa.toFixed(2)}`,onClick:j=>{j.preventDefault(),j.stopPropagation(),_(`${M} - ${I}`,L,U)},children:b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:b.jsx("path",{d:"M10 .4C4.697.4.399 4.698.399 10A9.6 9.6 0 0 0 10 19.601c5.301 0 9.6-4.298 9.6-9.601 0-5.302-4.299-9.6-9.6-9.6zm.896 3.466c.936 0 1.211.543 1.211 1.164 0 .775-.62 1.492-1.679 1.492-.886 0-1.308-.445-1.282-1.182 0-.621.519-1.474 1.75-1.474zM8.498 15.75c-.64 0-1.107-.389-.66-2.094l.733-3.025c.127-.484.148-.678 0-.678-.191 0-1.022.334-1.512.664l-.319-.523c1.555-1.299 3.343-2.061 4.108-2.061.64 0 .746.756.427 1.92l-.84 3.18c-.149.562-.085.756.064.756.192 0 .82-.232 1.438-.719l.362.486c-1.513 1.512-3.162 2.094-3.801 2.094z",fill:"#ff7955"})})})]})}),b.jsx("div",{className:`table-container term-container ${W?"expanded":"collapsed"}`,"aria-hidden":!W,style:{pointerEvents:W?"auto":"none"},onClick:j=>{W||(j.preventDefault(),j.stopPropagation())},children:b.jsx("div",{className:"course-container",children:b.jsxs("table",{className:"course-table",children:[b.jsx("thead",{className:"table-header-hidden",children:b.jsxs("tr",{children:[b.jsx("th",{children:"Course Name"}),b.jsx("th",{children:"Credit Hours"}),b.jsx("th",{children:"Grade"}),b.jsx("th",{children:"Remove"})]})}),b.jsx("tbody",{children:U.map(C)})]})})})]},`${M}-${I}`)})})]},M)}),"      ",b.jsx("div",{className:"reset-button-container",children:b.jsxs("button",{className:"reset-button",onClick:()=>d(!0),title:"Reset all courses","aria-label":"Reset all courses",children:[b.jsx("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:b.jsx("path",{d:"M20.49 15C19.841 16.831 18.612 18.4108 16.9875 19.492C15.363 20.5732 13.4312 21.0972 11.4831 20.9851C9.5349 20.873 7.67594 20.1308 6.18628 18.8704C4.69663 17.61 3.65698 15.8996 3.22398 13.997C2.79098 12.0944 2.98809 10.1026 3.78562 8.32177C4.58314 6.54091 5.93787 5.06746 7.64568 4.12343C9.35349 3.17941 11.3219 2.81593 13.2542 3.08779C16.5167 3.54676 18.6721 5.91142 21 8M21 8V2M21 8H15",stroke:"currentColor",strokeWidth:"2.8",strokeLinecap:"round",strokeLinejoin:"round"})}),b.jsx("span",{children:"Reset All"})]})}),b.jsx(Ex,{modalData:a,onClose:x}),b.jsx(Tx,{show:h,title:"Reset All Courses",message:"Are you sure you want to delete all courses? This action cannot be undone.",confirmText:"Reset All",cancelText:"Cancel",onConfirm:()=>{r(),d(!1)},onCancel:()=>d(!1),isDanger:!0})]})},Cx=t=>t<1?{text:"Very Poor",color:"#B71C1C"}:t<2?{text:"Poor",color:"#E65100"}:t<2.5?{text:"Acceptable",color:"#FFC200"}:t<3?{text:"Good",color:"#2E7D32"}:t<3.5?{text:"Very Good",color:"#0D47A1"}:{text:"Excellent",color:"#4A148C"},Ax=({gpa:t})=>{const e=Cx(t);return b.jsxs("div",{className:"gpa-display",children:[b.jsx("div",{className:"gpa-label",children:"GPA"}),b.jsx("div",{className:"gpa-value",children:t.toFixed(2)}),b.jsx("div",{className:"gpa-scale",children:"out of 4.00"}),t!==0&&b.jsx("div",{className:"gpa-assessment",style:{color:e.color,textShadow:`0 0 10px ${e.color}33`,backgroundColor:`${e.color}15`},children:e.text})]})},bx=({show:t,onHide:e,onImport:n,currentCourses:i})=>{const[r,s]=J.useState(""),[o,a]=J.useState(!1);J.useEffect(()=>(t?(document.body.classList.add("modal-open"),setTimeout(()=>a(!0),10)):(document.body.classList.remove("modal-open"),a(!1)),()=>{document.body.classList.remove("modal-open")}),[t]);const l=async()=>{try{const d=await navigator.clipboard.readText();d?s(d):alert("No text found in clipboard.")}catch(d){console.error("Failed to read clipboard contents: ",d),alert("Clipboard access not supported or permission denied.")}},c=()=>{const d=r.trim();if(!d){alert("Please paste the HTML code.");return}const p=document.createElement("div");p.innerHTML=d;const g=p.querySelectorAll("table.table.table-striped.col-md-12 tr");if(g.length===0){alert("Invalid HTML. Please check that you pasted the correct code.");return}const y=[];if(g.forEach(m=>{const u=m.getElementsByTagName("td");if(u.length===0)return;const _=u[1]?u[1].innerText.trim():"",x=u[3]?u[3].innerText.trim():"";let v=null,P,C;if(u[6]){const M=u[6].querySelector("p"),R=M?M.innerText.trim():"";R&&R!==""&&R!=="-"&&R!=="N/A"&&R.trim()!==""&&["A+","A","A-","B+","B","B-","C+","C","C-","D+","D","D-","F"].includes(R)&&(v=R)}if(u[10]){const M=u[10].querySelector("div span"),R=M?M.innerText.trim():"";if(R){const T={1:"First Level",2:"Second Level",3:"Third Level",4:"Fourth Level",First:"First Level",Second:"Second Level",Third:"Third Level",Fourth:"Fourth Level",first:"First Level",second:"Second Level",third:"Third Level",fourth:"Fourth Level"};C=T[R]||T[R.replace(/ Level/i,"")]}}if(u[11]){const M=u[11].querySelector("div span"),R=M?M.innerText.trim():"";if(R){const T={1:"First Term",2:"Second Term",First:"First Term",Second:"Second Term",first:"First Term",second:"Second Term"};P=T[R]||T[R.replace(/ Term/i,"")]||R}}if(_&&x){const M=parseInt(x);isNaN(M)||y.push({name:_,hours:M,grade:v,term:P,level:C,isImported:!0})}}),y.length>0){const m=f(y);n(m),s("")}else alert("No valid courses found in the imported HTML.")},f=d=>{const p=new Map;i.forEach(y=>{p.set(y.name,y)});const g=[];return d.forEach(y=>{g.push(y),p.delete(y.name)}),p.forEach(y=>{g.push(y)}),g},h=()=>{s(""),e()};return t?Rf.createPortal(b.jsx("div",{className:`modal-overlay ${o?"modal-visible":""}`,onClick:h,children:b.jsxs("div",{className:"modal-content",onClick:d=>d.stopPropagation(),children:[b.jsxs("div",{className:"modal-header",children:[b.jsx("h2",{className:"modal-title",children:"Import Registered Courses"}),b.jsx("button",{className:"modal-close",onClick:h,"aria-label":"Close",children:b.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"currentColor",children:b.jsx("path",{d:"M14.7 1.3c-.4-.4-1-.4-1.4 0L8 6.6 2.7 1.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L6.6 8l-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l5.3 5.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l5.3-5.3c.4-.4.4-1 0-1.4z"})})})]}),b.jsxs("div",{className:"modal-body",children:[b.jsxs("p",{className:"modal-description",children:["Paste the HTML code from your ",b.jsx("a",{href:"http://newecom.fci.cu.edu.eg/#/courses-per-students",target:"_blank",rel:"noopener noreferrer",children:"Registered Courses"})," page below:"]}),b.jsxs("div",{className:"textarea-container",children:[b.jsx("textarea",{className:"import-textarea",value:r,onChange:d=>s(d.target.value),placeholder:"Paste HTML content here..."}),b.jsxs("button",{className:"paste-btn",onClick:l,type:"button",children:[b.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"12",height:"12",fill:"currentColor",children:b.jsx("path",{d:"M10.029,21h6.245c1.457,0,2.642-1.186,2.642-2.643V7.945c0-1.352-1.023-2.456-2.334-2.611C16.427,4.024,15.322,3,13.971,3H7.726C6.269,3,5.084,4.186,5.084,5.643v10.423c0,1.352,1.024,2.457,2.335,2.612C7.579,19.982,8.682,21,10.029,21z M17.916,7.945v10.412c0,0.905-0.736,1.643-1.642,1.643h-6.245c-0.905,0-1.643-0.737-1.643-1.643v-0.149V7.945c0-0.905,0.737-1.642,1.643-1.642h6.084h0.161C17.18,6.303,17.916,7.04,17.916,7.945z M6.084,16.065V5.643C6.084,4.737,6.82,4,7.726,4h6.245c0.789,0,1.45,0.56,1.607,1.303h-5.549c-1.457,0-2.643,1.185-2.643,2.642v9.728C6.644,17.517,6.084,16.854,6.084,16.065z"})}),"Paste"]})]})]}),b.jsx("div",{className:"modal-footer",children:b.jsxs("div",{className:"button-group",children:[b.jsx("button",{className:"btn-secondary",onClick:h,children:"Cancel"}),b.jsx("button",{className:"btn-primary",onClick:c,children:"Import Courses"})]})})]})}),document.body):null};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lf="176",Rx=0,lp=1,Px=2,Fv=1,Ix=2,ai=3,Zi=0,nn=1,ui=2,Xi=0,gs=1,cp=2,up=3,dp=4,Dx=5,hr=100,Lx=101,Nx=102,Ux=103,Fx=104,Ox=200,kx=201,Bx=202,zx=203,Xu=204,$u=205,Hx=206,Vx=207,Gx=208,Wx=209,jx=210,qx=211,Xx=212,$x=213,Yx=214,Yu=0,Ku=1,Zu=2,ws=3,Qu=4,Ju=5,ed=6,td=7,Ov=0,Kx=1,Zx=2,$i=0,Qx=1,Jx=2,eS=3,tS=4,nS=5,iS=6,rS=7,kv=300,Cs=301,As=302,nd=303,id=304,Xl=306,rd=1e3,yr=1001,sd=1002,Vn=1003,sS=1004,la=1005,$n=1006,Tc=1007,xr=1008,Mi=1009,Bv=1010,zv=1011,bo=1012,Nf=1013,Rr=1014,hi=1015,Oo=1016,Uf=1017,Ff=1018,Ro=1020,Hv=35902,Vv=1021,Gv=1022,kn=1023,Po=1026,Io=1027,Wv=1028,Of=1029,jv=1030,kf=1031,Bf=1033,Va=33776,Ga=33777,Wa=33778,ja=33779,od=35840,ad=35841,ld=35842,cd=35843,ud=36196,dd=37492,fd=37496,hd=37808,pd=37809,md=37810,gd=37811,vd=37812,_d=37813,yd=37814,xd=37815,Sd=37816,Md=37817,Ed=37818,Td=37819,wd=37820,Cd=37821,qa=36492,Ad=36494,bd=36495,qv=36283,Rd=36284,Pd=36285,Id=36286,oS=3200,aS=3201,lS=0,cS=1,Fi="",xn="srgb",bs="srgb-linear",Ml="linear",tt="srgb",Fr=7680,fp=519,uS=512,dS=513,fS=514,Xv=515,hS=516,pS=517,mS=518,gS=519,hp=35044,pp="300 es",pi=2e3,El=2001;class Ns{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wc=Math.PI/180,Dd=180/Math.PI;function ko(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(kt[t&255]+kt[t>>8&255]+kt[t>>16&255]+kt[t>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[n&63|128]+kt[n>>8&255]+"-"+kt[n>>16&255]+kt[n>>24&255]+kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]).toLowerCase()}function Be(t,e,n){return Math.max(e,Math.min(n,t))}function vS(t,e){return(t%e+e)%e}function Cc(t,e,n){return(1-n)*t+n*e}function js(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Kt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class nt{constructor(e=0,n=0){nt.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,n,i,r,s,o,a,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],f=i[4],h=i[7],d=i[2],p=i[5],g=i[8],y=r[0],m=r[3],u=r[6],_=r[1],x=r[4],v=r[7],P=r[2],C=r[5],M=r[8];return s[0]=o*y+a*_+l*P,s[3]=o*m+a*x+l*C,s[6]=o*u+a*v+l*M,s[1]=c*y+f*_+h*P,s[4]=c*m+f*x+h*C,s[7]=c*u+f*v+h*M,s[2]=d*y+p*_+g*P,s[5]=d*m+p*x+g*C,s[8]=d*u+p*v+g*M,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8];return n*o*f-n*a*c-i*s*f+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],h=f*o-a*c,d=a*l-f*s,p=c*s-o*l,g=n*h+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=h*y,e[1]=(r*c-f*i)*y,e[2]=(a*i-r*o)*y,e[3]=d*y,e[4]=(f*n-r*l)*y,e[5]=(r*s-a*n)*y,e[6]=p*y,e[7]=(i*l-c*n)*y,e[8]=(o*n-i*s)*y,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Ac.makeScale(e,n)),this}rotate(e){return this.premultiply(Ac.makeRotation(-e)),this}translate(e,n){return this.premultiply(Ac.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ac=new Ue;function $v(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Tl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function _S(){const t=Tl("canvas");return t.style.display="block",t}const mp={};function Xa(t){t in mp||(mp[t]=!0,console.warn(t))}function yS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function xS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function SS(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const gp=new Ue().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vp=new Ue().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function MS(){const t={enabled:!0,workingColorSpace:bs,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===tt&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===tt&&(r.r=vs(r.r),r.g=vs(r.g),r.b=vs(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Fi?Ml:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[bs]:{primaries:e,whitePoint:i,transfer:Ml,toXYZ:gp,fromXYZ:vp,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:e,whitePoint:i,transfer:tt,toXYZ:gp,fromXYZ:vp,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),t}const $e=MS();function gi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function vs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Or;class ES{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Or===void 0&&(Or=Tl("canvas")),Or.width=e.width,Or.height=e.height;const r=Or.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Or}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Tl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=gi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(gi(n[i]/255)*255):n[i]=gi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let TS=0;class zf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:TS++}),this.uuid=ko(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(bc(r[o].image)):s.push(bc(r[o]))}else s=bc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function bc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?ES.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wS=0;class rn extends Ns{constructor(e=rn.DEFAULT_IMAGE,n=rn.DEFAULT_MAPPING,i=yr,r=yr,s=$n,o=xr,a=kn,l=Mi,c=rn.DEFAULT_ANISOTROPY,f=Fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=ko(),this.name="",this.source=new zf(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isTextureArray=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isTextureArray=e.isTextureArray,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case rd:e.x=e.x-Math.floor(e.x);break;case yr:e.x=e.x<0?0:1;break;case sd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case rd:e.y=e.y-Math.floor(e.y);break;case yr:e.y=e.y<0?0:1;break;case sd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=kv;rn.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,n=0,i=0,r=1){yt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],f=l[4],h=l[8],d=l[1],p=l[5],g=l[9],y=l[2],m=l[6],u=l[10];if(Math.abs(f-d)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(f+d)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(c+1)/2,v=(p+1)/2,P=(u+1)/2,C=(f+d)/4,M=(h+y)/4,R=(g+m)/4;return x>v&&x>P?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=C/i,s=M/i):v>P?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=C/r,s=R/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=M/s,r=R/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(d-f)*(d-f));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(h-y)/_,this.z=(d-f)/_,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this.z=Be(this.z,e.z,n.z),this.w=Be(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this.z=Be(this.z,e,n),this.w=Be(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class CS extends Ns{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth?i.depth:1,this.scissor=new yt(0,0,e,n),this.scissorTest=!1,this.viewport=new yt(0,0,e,n);const r={width:e,height:n,depth:this.depth};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,multiview:!1},i);const s=new rn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new zf(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pr extends CS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Yv extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class AS extends rn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=yr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],f=i[r+2],h=i[r+3];const d=s[o+0],p=s[o+1],g=s[o+2],y=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h;return}if(a===1){e[n+0]=d,e[n+1]=p,e[n+2]=g,e[n+3]=y;return}if(h!==y||l!==d||c!==p||f!==g){let m=1-a;const u=l*d+c*p+f*g+h*y,_=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const P=Math.sqrt(x),C=Math.atan2(P,u*_);m=Math.sin(m*C)/P,a=Math.sin(a*C)/P}const v=a*_;if(l=l*m+d*v,c=c*m+p*v,f=f*m+g*v,h=h*m+y*v,m===1-a){const P=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=P,c*=P,f*=P,h*=P}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],f=i[r+3],h=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+f*h+l*p-c*d,e[n+1]=l*g+f*d+c*h-a*p,e[n+2]=c*g+f*p+a*d-l*h,e[n+3]=f*g-a*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),f=a(r/2),h=a(s/2),d=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*f*h+c*p*g,this._y=c*p*h-d*f*g,this._z=c*f*g+d*p*h,this._w=c*f*h-d*p*g;break;case"YXZ":this._x=d*f*h+c*p*g,this._y=c*p*h-d*f*g,this._z=c*f*g-d*p*h,this._w=c*f*h+d*p*g;break;case"ZXY":this._x=d*f*h-c*p*g,this._y=c*p*h+d*f*g,this._z=c*f*g+d*p*h,this._w=c*f*h-d*p*g;break;case"ZYX":this._x=d*f*h-c*p*g,this._y=c*p*h+d*f*g,this._z=c*f*g-d*p*h,this._w=c*f*h+d*p*g;break;case"YZX":this._x=d*f*h+c*p*g,this._y=c*p*h+d*f*g,this._z=c*f*g-d*p*h,this._w=c*f*h-d*p*g;break;case"XZY":this._x=d*f*h-c*p*g,this._y=c*p*h-d*f*g,this._z=c*f*g+d*p*h,this._w=c*f*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],f=n[6],h=n[10],d=i+a+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Be(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+o*a+r*c-s*l,this._y=r*f+o*l+s*a-i*c,this._z=s*f+o*c+i*l-r*a,this._w=o*f-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),f=Math.atan2(c,a),h=Math.sin((1-n)*f)/c,d=Math.sin(n*f)/c;return this._w=o*h+this._w*d,this._x=i*h+this._x*d,this._y=r*h+this._y*d,this._z=s*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,n=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(_p.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(_p.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),f=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+l*c+o*h-a*f,this.y=i+l*f+a*c-s*h,this.z=r+l*h+s*f-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Be(this.x,e.x,n.x),this.y=Be(this.y,e.y,n.y),this.z=Be(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Be(this.x,e,n),this.y=Be(this.y,e,n),this.z=Be(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Be(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rc.copy(this).projectOnVector(e),this.sub(Rc)}reflect(e){return this.sub(Rc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Be(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rc=new V,_p=new Bo;class zo{constructor(e=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(In.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(In.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=In.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(s,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ca.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ca.copy(i.boundingBox)),ca.applyMatrix4(e.matrixWorld),this.union(ca)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),ua.subVectors(this.max,qs),kr.subVectors(e.a,qs),Br.subVectors(e.b,qs),zr.subVectors(e.c,qs),Ci.subVectors(Br,kr),Ai.subVectors(zr,Br),ir.subVectors(kr,zr);let n=[0,-Ci.z,Ci.y,0,-Ai.z,Ai.y,0,-ir.z,ir.y,Ci.z,0,-Ci.x,Ai.z,0,-Ai.x,ir.z,0,-ir.x,-Ci.y,Ci.x,0,-Ai.y,Ai.x,0,-ir.y,ir.x,0];return!Pc(n,kr,Br,zr,ua)||(n=[1,0,0,0,1,0,0,0,1],!Pc(n,kr,Br,zr,ua))?!1:(da.crossVectors(Ci,Ai),n=[da.x,da.y,da.z],Pc(n,kr,Br,zr,ua))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ni=[new V,new V,new V,new V,new V,new V,new V,new V],In=new V,ca=new zo,kr=new V,Br=new V,zr=new V,Ci=new V,Ai=new V,ir=new V,qs=new V,ua=new V,da=new V,rr=new V;function Pc(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){rr.fromArray(t,s);const a=r.x*Math.abs(rr.x)+r.y*Math.abs(rr.y)+r.z*Math.abs(rr.z),l=e.dot(rr),c=n.dot(rr),f=i.dot(rr);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>a)return!1}return!0}const bS=new zo,Xs=new V,Ic=new V;class Hf{constructor(e=new V,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):bS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xs.subVectors(e,this.center);const n=Xs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Xs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ic.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xs.copy(e.center).add(Ic)),this.expandByPoint(Xs.copy(e.center).sub(Ic))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ii=new V,Dc=new V,fa=new V,bi=new V,Lc=new V,ha=new V,Nc=new V;class RS{constructor(e=new V,n=new V(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ii.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,n),ii.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Dc.copy(e).add(n).multiplyScalar(.5),fa.copy(n).sub(e).normalize(),bi.copy(this.origin).sub(Dc);const s=e.distanceTo(n)*.5,o=-this.direction.dot(fa),a=bi.dot(this.direction),l=-bi.dot(fa),c=bi.lengthSq(),f=Math.abs(1-o*o);let h,d,p,g;if(f>0)if(h=o*l-a,d=o*a-l,g=s*f,h>=0)if(d>=-g)if(d<=g){const y=1/f;h*=y,d*=y,p=h*(h+o*d+2*a)+d*(o*h+d+2*l)+c}else d=s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d=-s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-o*s+a)),d=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(h=Math.max(0,-(o*s+a)),d=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+d*(d+2*l)+c);else d=o>0?-s:s,h=Math.max(0,-(o*d+a)),p=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Dc).addScaledVector(fa,d),p}intersectSphere(e,n){ii.subVectors(e.center,this.origin);const i=ii.dot(this.direction),r=ii.dot(ii)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),f>=0?(s=(e.min.y-d.y)*f,o=(e.max.y-d.y)*f):(s=(e.max.y-d.y)*f,o=(e.min.y-d.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(a=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,n,i,r,s){Lc.subVectors(n,e),ha.subVectors(i,e),Nc.crossVectors(Lc,ha);let o=this.direction.dot(Nc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;bi.subVectors(this.origin,e);const l=a*this.direction.dot(ha.crossVectors(bi,ha));if(l<0)return null;const c=a*this.direction.dot(Lc.cross(bi));if(c<0||l+c>o)return null;const f=-a*bi.dot(Nc);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Et{constructor(e,n,i,r,s,o,a,l,c,f,h,d,p,g,y,m){Et.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,f,h,d,p,g,y,m)}set(e,n,i,r,s,o,a,l,c,f,h,d,p,g,y,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=f,u[10]=h,u[14]=d,u[3]=p,u[7]=g,u[11]=y,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Et().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Hr.setFromMatrixColumn(e,0).length(),s=1/Hr.setFromMatrixColumn(e,1).length(),o=1/Hr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const d=o*f,p=o*h,g=a*f,y=a*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=d-y*c,n[9]=-a*l,n[2]=y-d*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*f,p=l*h,g=c*f,y=c*h;n[0]=d+y*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*h,n[5]=o*f,n[9]=-a,n[2]=p*a-g,n[6]=y+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*f,p=l*h,g=c*f,y=c*h;n[0]=d-y*a,n[4]=-o*h,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*f,n[9]=y-d*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*f,p=o*h,g=a*f,y=a*h;n[0]=l*f,n[4]=g*c-p,n[8]=d*c+y,n[1]=l*h,n[5]=y*c+d,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,g=a*l,y=a*c;n[0]=l*f,n[4]=y-d*h,n[8]=g*h+p,n[1]=h,n[5]=o*f,n[9]=-a*f,n[2]=-c*f,n[6]=p*h+g,n[10]=d-y*h}else if(e.order==="XZY"){const d=o*l,p=o*c,g=a*l,y=a*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=d*h+y,n[5]=o*f,n[9]=p*h-g,n[2]=g*h-p,n[6]=a*f,n[10]=y*h+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(PS,e,IS)}lookAt(e,n,i){const r=this.elements;return on.subVectors(e,n),on.lengthSq()===0&&(on.z=1),on.normalize(),Ri.crossVectors(i,on),Ri.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),Ri.crossVectors(i,on)),Ri.normalize(),pa.crossVectors(on,Ri),r[0]=Ri.x,r[4]=pa.x,r[8]=on.x,r[1]=Ri.y,r[5]=pa.y,r[9]=on.y,r[2]=Ri.z,r[6]=pa.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],f=i[1],h=i[5],d=i[9],p=i[13],g=i[2],y=i[6],m=i[10],u=i[14],_=i[3],x=i[7],v=i[11],P=i[15],C=r[0],M=r[4],R=r[8],T=r[12],S=r[1],I=r[5],U=r[9],L=r[13],W=r[2],j=r[6],$=r[10],ee=r[14],N=r[3],Y=r[7],Q=r[11],ae=r[15];return s[0]=o*C+a*S+l*W+c*N,s[4]=o*M+a*I+l*j+c*Y,s[8]=o*R+a*U+l*$+c*Q,s[12]=o*T+a*L+l*ee+c*ae,s[1]=f*C+h*S+d*W+p*N,s[5]=f*M+h*I+d*j+p*Y,s[9]=f*R+h*U+d*$+p*Q,s[13]=f*T+h*L+d*ee+p*ae,s[2]=g*C+y*S+m*W+u*N,s[6]=g*M+y*I+m*j+u*Y,s[10]=g*R+y*U+m*$+u*Q,s[14]=g*T+y*L+m*ee+u*ae,s[3]=_*C+x*S+v*W+P*N,s[7]=_*M+x*I+v*j+P*Y,s[11]=_*R+x*U+v*$+P*Q,s[15]=_*T+x*L+v*ee+P*ae,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],f=e[2],h=e[6],d=e[10],p=e[14],g=e[3],y=e[7],m=e[11],u=e[15];return g*(+s*l*h-r*c*h-s*a*d+i*c*d+r*a*p-i*l*p)+y*(+n*l*p-n*c*d+s*o*d-r*o*p+r*c*f-s*l*f)+m*(+n*c*h-n*a*p-s*o*h+i*o*p+s*a*f-i*c*f)+u*(-r*a*f-n*l*h+n*a*d+r*o*h-i*o*d+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],f=e[8],h=e[9],d=e[10],p=e[11],g=e[12],y=e[13],m=e[14],u=e[15],_=h*m*c-y*d*c+y*l*p-a*m*p-h*l*u+a*d*u,x=g*d*c-f*m*c-g*l*p+o*m*p+f*l*u-o*d*u,v=f*y*c-g*h*c+g*a*p-o*y*p-f*a*u+o*h*u,P=g*h*l-f*y*l-g*a*d+o*y*d+f*a*m-o*h*m,C=n*_+i*x+r*v+s*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/C;return e[0]=_*M,e[1]=(y*d*s-h*m*s-y*r*p+i*m*p+h*r*u-i*d*u)*M,e[2]=(a*m*s-y*l*s+y*r*c-i*m*c-a*r*u+i*l*u)*M,e[3]=(h*l*s-a*d*s-h*r*c+i*d*c+a*r*p-i*l*p)*M,e[4]=x*M,e[5]=(f*m*s-g*d*s+g*r*p-n*m*p-f*r*u+n*d*u)*M,e[6]=(g*l*s-o*m*s-g*r*c+n*m*c+o*r*u-n*l*u)*M,e[7]=(o*d*s-f*l*s+f*r*c-n*d*c-o*r*p+n*l*p)*M,e[8]=v*M,e[9]=(g*h*s-f*y*s-g*i*p+n*y*p+f*i*u-n*h*u)*M,e[10]=(o*y*s-g*a*s+g*i*c-n*y*c-o*i*u+n*a*u)*M,e[11]=(f*a*s-o*h*s-f*i*c+n*h*c+o*i*p-n*a*p)*M,e[12]=P*M,e[13]=(f*y*r-g*h*r+g*i*d-n*y*d-f*i*m+n*h*m)*M,e[14]=(g*a*r-o*y*r-g*i*l+n*y*l+o*i*m-n*a*m)*M,e[15]=(o*h*r-f*a*r+f*i*l-n*h*l-o*i*d+n*a*d)*M,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,f=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,f*a+i,f*l-r*o,0,c*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,f=o+o,h=a+a,d=s*c,p=s*f,g=s*h,y=o*f,m=o*h,u=a*h,_=l*c,x=l*f,v=l*h,P=i.x,C=i.y,M=i.z;return r[0]=(1-(y+u))*P,r[1]=(p+v)*P,r[2]=(g-x)*P,r[3]=0,r[4]=(p-v)*C,r[5]=(1-(d+u))*C,r[6]=(m+_)*C,r[7]=0,r[8]=(g+x)*M,r[9]=(m-_)*M,r[10]=(1-(d+y))*M,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Hr.set(r[0],r[1],r[2]).length();const o=Hr.set(r[4],r[5],r[6]).length(),a=Hr.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Dn.copy(this);const c=1/s,f=1/o,h=1/a;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=f,Dn.elements[5]*=f,Dn.elements[6]*=f,Dn.elements[8]*=h,Dn.elements[9]*=h,Dn.elements[10]*=h,n.setFromRotationMatrix(Dn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=pi){const l=this.elements,c=2*s/(n-e),f=2*s/(i-r),h=(n+e)/(n-e),d=(i+r)/(i-r);let p,g;if(a===pi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===El)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=pi){const l=this.elements,c=1/(n-e),f=1/(i-r),h=1/(o-s),d=(n+e)*c,p=(i+r)*f;let g,y;if(a===pi)g=(o+s)*h,y=-2*h;else if(a===El)g=s*h,y=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Hr=new V,Dn=new Et,PS=new V(0,0,0),IS=new V(1,1,1),Ri=new V,pa=new V,on=new V,yp=new Et,xp=new Bo;class Ei{constructor(e=0,n=0,i=0,r=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],f=r[9],h=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(Be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Be(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Be(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return yp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return xp.setFromEuler(this),this.setFromQuaternion(xp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Kv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let DS=0;const Sp=new V,Vr=new Bo,ri=new Et,ma=new V,$s=new V,LS=new V,NS=new Bo,Mp=new V(1,0,0),Ep=new V(0,1,0),Tp=new V(0,0,1),wp={type:"added"},US={type:"removed"},Gr={type:"childadded",child:null},Uc={type:"childremoved",child:null};class dn extends Ns{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:DS++}),this.uuid=ko(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new V,n=new Ei,i=new Bo,r=new V(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ue}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Kv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Vr.setFromAxisAngle(e,n),this.quaternion.multiply(Vr),this}rotateOnWorldAxis(e,n){return Vr.setFromAxisAngle(e,n),this.quaternion.premultiply(Vr),this}rotateX(e){return this.rotateOnAxis(Mp,e)}rotateY(e){return this.rotateOnAxis(Ep,e)}rotateZ(e){return this.rotateOnAxis(Tp,e)}translateOnAxis(e,n){return Sp.copy(e).applyQuaternion(this.quaternion),this.position.add(Sp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Mp,e)}translateY(e){return this.translateOnAxis(Ep,e)}translateZ(e){return this.translateOnAxis(Tp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ma.copy(e):ma.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),$s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt($s,ma,this.up):ri.lookAt(ma,$s,this.up),this.quaternion.setFromRotationMatrix(ri),r&&(ri.extractRotation(r.matrixWorld),Vr.setFromRotationMatrix(ri),this.quaternion.premultiply(Vr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wp),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(US),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wp),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,e,LS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($s,NS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?{min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}:void 0,boundingSphere:a.boundingSphere?{radius:a.boundingSphere.radius,center:a.boundingSphere.center.toArray()}:void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:this.boundingSphere.center.toArray(),radius:this.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:this.boundingBox.min.toArray(),max:this.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),f=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const f=a[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}dn.DEFAULT_UP=new V(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ln=new V,si=new V,Fc=new V,oi=new V,Wr=new V,jr=new V,Cp=new V,Oc=new V,kc=new V,Bc=new V,zc=new yt,Hc=new yt,Vc=new yt;class On{constructor(e=new V,n=new V,i=new V){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Ln.subVectors(e,n),r.cross(Ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Ln.subVectors(r,n),si.subVectors(i,n),Fc.subVectors(e,n);const o=Ln.dot(Ln),a=Ln.dot(si),l=Ln.dot(Fc),c=si.dot(si),f=si.dot(Fc),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const d=1/h,p=(c*l-a*f)*d,g=(o*f-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,oi.x),l.addScaledVector(o,oi.y),l.addScaledVector(a,oi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return zc.setScalar(0),Hc.setScalar(0),Vc.setScalar(0),zc.fromBufferAttribute(e,n),Hc.fromBufferAttribute(e,i),Vc.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(zc,s.x),o.addScaledVector(Hc,s.y),o.addScaledVector(Vc,s.z),o}static isFrontFacing(e,n,i,r){return Ln.subVectors(i,n),si.subVectors(e,n),Ln.cross(si).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Ln.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return On.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return On.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return On.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return On.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return On.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Wr.subVectors(r,i),jr.subVectors(s,i),Oc.subVectors(e,i);const l=Wr.dot(Oc),c=jr.dot(Oc);if(l<=0&&c<=0)return n.copy(i);kc.subVectors(e,r);const f=Wr.dot(kc),h=jr.dot(kc);if(f>=0&&h<=f)return n.copy(r);const d=l*h-f*c;if(d<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(Wr,o);Bc.subVectors(e,s);const p=Wr.dot(Bc),g=jr.dot(Bc);if(g>=0&&p<=g)return n.copy(s);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(jr,a);const m=f*g-p*h;if(m<=0&&h-f>=0&&p-g>=0)return Cp.subVectors(s,r),a=(h-f)/(h-f+(p-g)),n.copy(r).addScaledVector(Cp,a);const u=1/(m+y+d);return o=y*u,a=d*u,n.copy(i).addScaledVector(Wr,o).addScaledVector(jr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Zv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},ga={h:0,s:0,l:0};function Gc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=$e.workingColorSpace){return this.r=e,this.g=n,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=$e.workingColorSpace){if(e=vS(e,1),n=Be(n,0,1),i=Be(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Gc(o,s,e+1/3),this.g=Gc(o,s,e),this.b=Gc(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,n=xn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xn){const i=Zv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=vs(e.r),this.g=vs(e.g),this.b=vs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return $e.fromWorkingColorSpace(Bt.copy(this),e),Math.round(Be(Bt.r*255,0,255))*65536+Math.round(Be(Bt.g*255,0,255))*256+Math.round(Be(Bt.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=$e.workingColorSpace){$e.fromWorkingColorSpace(Bt.copy(this),n);const i=Bt.r,r=Bt.g,s=Bt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const f=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=f<=.5?h/(o+a):h/(2-o-a),o){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=$e.workingColorSpace){return $e.fromWorkingColorSpace(Bt.copy(this),n),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=xn){$e.fromWorkingColorSpace(Bt.copy(this),e);const n=Bt.r,i=Bt.g,r=Bt.b;return e!==xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+n,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Pi),e.getHSL(ga);const i=Cc(Pi.h,ga.h,n),r=Cc(Pi.s,ga.s,n),s=Cc(Pi.l,ga.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new Qe;Qe.NAMES=Zv;let FS=0;class $l extends Ns{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:FS++}),this.uuid=ko(),this.name="",this.type="Material",this.blending=gs,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xu,this.blendDst=$u,this.blendEquation=hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fr,this.stencilZFail=Fr,this.stencilZPass=Fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(i.blending=this.blending),this.side!==Zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xu&&(i.blendSrc=this.blendSrc),this.blendDst!==$u&&(i.blendDst=this.blendDst),this.blendEquation!==hr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qv extends $l{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Ov,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new V,va=new nt;let OS=0;class Qn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:OS++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=hp,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)va.fromBufferAttribute(this,n),va.applyMatrix3(e),this.setXY(n,va.x,va.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix3(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyMatrix4(e),this.setXYZ(n,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.applyNormalMatrix(e),this.setXYZ(n,St.x,St.y,St.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)St.fromBufferAttribute(this,n),St.transformDirection(e),this.setXYZ(n,St.x,St.y,St.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=js(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Kt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=js(n,this.array)),n}setX(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=js(n,this.array)),n}setY(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=js(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=js(n,this.array)),n}setW(e,n){return this.normalized&&(n=Kt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Kt(n,this.array),i=Kt(i,this.array),r=Kt(r,this.array),s=Kt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==hp&&(e.usage=this.usage),e}}class Jv extends Qn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class e_ extends Qn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Er extends Qn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let kS=0;const yn=new Et,Wc=new dn,qr=new V,an=new zo,Ys=new zo,bt=new V;class Lr extends Ns{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kS++}),this.uuid=ko(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($v(e)?e_:Jv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ue().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,n,i){return yn.makeTranslation(e,n,i),this.applyMatrix4(yn),this}scale(e,n,i){return yn.makeScale(e,n,i),this.applyMatrix4(yn),this}lookAt(e){return Wc.lookAt(e),Wc.updateMatrix(),this.applyMatrix4(Wc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Er(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];an.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,an.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,an.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(an.min),this.boundingBox.expandByPoint(an.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hf);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(an.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Ys.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(an.min,Ys.min),an.expandByPoint(bt),bt.addVectors(an.max,Ys.max),an.expandByPoint(bt)):(an.expandByPoint(Ys.min),an.expandByPoint(Ys.max))}an.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,f=a.count;c<f;c++)bt.fromBufferAttribute(a,c),l&&(qr.fromBufferAttribute(e,c),bt.add(qr)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<i.count;R++)a[R]=new V,l[R]=new V;const c=new V,f=new V,h=new V,d=new nt,p=new nt,g=new nt,y=new V,m=new V;function u(R,T,S){c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,T),h.fromBufferAttribute(i,S),d.fromBufferAttribute(s,R),p.fromBufferAttribute(s,T),g.fromBufferAttribute(s,S),f.sub(c),h.sub(c),p.sub(d),g.sub(d);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(y.copy(f).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(I),m.copy(h).multiplyScalar(p.x).addScaledVector(f,-g.x).multiplyScalar(I),a[R].add(y),a[T].add(y),a[S].add(y),l[R].add(m),l[T].add(m),l[S].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let R=0,T=_.length;R<T;++R){const S=_[R],I=S.start,U=S.count;for(let L=I,W=I+U;L<W;L+=3)u(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const x=new V,v=new V,P=new V,C=new V;function M(R){P.fromBufferAttribute(r,R),C.copy(P);const T=a[R];x.copy(T),x.sub(P.multiplyScalar(P.dot(T))).normalize(),v.crossVectors(C,T);const I=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,I)}for(let R=0,T=_.length;R<T;++R){const S=_[R],I=S.start,U=S.count;for(let L=I,W=I+U;L<W;L+=3)M(e.getX(L+0)),M(e.getX(L+1)),M(e.getX(L+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new V,s=new V,o=new V,a=new V,l=new V,c=new V,f=new V,h=new V;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),y=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,y),o.fromBufferAttribute(n,m),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),a.add(f),l.add(f),c.add(f),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),i.setXYZ(d+0,f.x,f.y,f.z),i.setXYZ(d+1,f.x,f.y,f.z),i.setXYZ(d+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)bt.fromBufferAttribute(e,n),bt.normalize(),e.setXYZ(n,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,l){const c=a.array,f=a.itemSize,h=a.normalized,d=new c.constructor(l.length*f);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){a.isInterleavedBufferAttribute?p=l[y]*a.data.stride+a.offset:p=l[y]*f;for(let u=0;u<f;u++)d[g++]=c[p++]}return new Qn(d,f,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Lr,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let f=0,h=c.length;f<h;f++){const d=c[f],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const f=r[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let d=0,p=h.length;d<p;d++)f.push(h[d].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,f=o.length;c<f;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ap=new Et,sr=new RS,_a=new Hf,bp=new V,ya=new V,xa=new V,Sa=new V,jc=new V,Ma=new V,Rp=new V,Ea=new V;class Bn extends dn{constructor(e=new Lr,n=new Qv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ma.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=a[l],h=s[l];f!==0&&(jc.fromBufferAttribute(h,e),o?Ma.addScaledVector(jc,f):Ma.addScaledVector(jc.sub(n),f))}n.add(Ma)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_a.copy(i.boundingSphere),_a.applyMatrix4(s),sr.copy(e.ray).recast(e.near),!(_a.containsPoint(sr.origin)===!1&&(sr.intersectSphere(_a,bp)===null||sr.origin.distanceToSquared(bp)>(e.far-e.near)**2))&&(Ap.copy(s).invert(),sr.copy(e.ray).applyMatrix4(Ap),!(i.boundingBox!==null&&sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,sr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){const m=d[g],u=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,P=x;v<P;v+=3){const C=a.getX(v),M=a.getX(v+1),R=a.getX(v+2);r=Ta(this,u,e,i,c,f,h,C,M,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(a.count,p.start+p.count);for(let m=g,u=y;m<u;m+=3){const _=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);r=Ta(this,o,e,i,c,f,h,_,x,v),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,y=d.length;g<y;g++){const m=d[g],u=o[m.materialIndex],_=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,P=x;v<P;v+=3){const C=v,M=v+1,R=v+2;r=Ta(this,u,e,i,c,f,h,C,M,R),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,u=y;m<u;m+=3){const _=m,x=m+1,v=m+2;r=Ta(this,o,e,i,c,f,h,_,x,v),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function BS(t,e,n,i,r,s,o,a){let l;if(e.side===nn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Zi,a),l===null)return null;Ea.copy(a),Ea.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Ea);return c<n.near||c>n.far?null:{distance:c,point:Ea.clone(),object:t}}function Ta(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,ya),t.getVertexPosition(l,xa),t.getVertexPosition(c,Sa);const f=BS(t,e,n,i,ya,xa,Sa,Rp);if(f){const h=new V;On.getBarycoord(Rp,ya,xa,Sa,h),r&&(f.uv=On.getInterpolatedAttribute(r,a,l,c,h,new nt)),s&&(f.uv1=On.getInterpolatedAttribute(s,a,l,c,h,new nt)),o&&(f.normal=On.getInterpolatedAttribute(o,a,l,c,h,new V),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new V,materialIndex:0};On.getNormal(ya,xa,Sa,d.normal),f.face=d,f.barycoord=h}return f}class Ho extends Lr{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],f=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Er(c,3)),this.setAttribute("normal",new Er(f,3)),this.setAttribute("uv",new Er(h,2));function g(y,m,u,_,x,v,P,C,M,R,T){const S=v/M,I=P/R,U=v/2,L=P/2,W=C/2,j=M+1,$=R+1;let ee=0,N=0;const Y=new V;for(let Q=0;Q<$;Q++){const ae=Q*I-L;for(let Se=0;Se<j;Se++){const qe=Se*S-U;Y[y]=qe*_,Y[m]=ae*x,Y[u]=W,c.push(Y.x,Y.y,Y.z),Y[y]=0,Y[m]=0,Y[u]=C>0?1:-1,f.push(Y.x,Y.y,Y.z),h.push(Se/M),h.push(1-Q/R),ee+=1}}for(let Q=0;Q<R;Q++)for(let ae=0;ae<M;ae++){const Se=d+ae+j*Q,qe=d+ae+j*(Q+1),q=d+(ae+1)+j*(Q+1),se=d+(ae+1)+j*Q;l.push(Se,qe,se),l.push(qe,q,se),N+=6}a.addGroup(p,N,T),p+=N,d+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Rs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Gt(t){const e={};for(let n=0;n<t.length;n++){const i=Rs(t[n]);for(const r in i)e[r]=i[r]}return e}function zS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function t_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const HS={clone:Rs,merge:Gt};var VS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,GS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends $l{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=VS,this.fragmentShader=GS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rs(e.uniforms),this.uniformsGroups=zS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class n_ extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new V,Pp=new nt,Ip=new nt;class En extends n_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Dd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dd*2*Math.atan(Math.tan(wc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ii.x,Ii.y).multiplyScalar(-e/Ii.z)}getViewSize(e,n){return this.getViewBounds(e,Pp,Ip),n.subVectors(Ip,Pp)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(wc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Xr=-90,$r=1;class WS extends dn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(Xr,$r,e,n);r.layers=this.layers,this.add(r);const s=new En(Xr,$r,e,n);s.layers=this.layers,this.add(s);const o=new En(Xr,$r,e,n);o.layers=this.layers,this.add(o);const a=new En(Xr,$r,e,n);a.layers=this.layers,this.add(a);const l=new En(Xr,$r,e,n);l.layers=this.layers,this.add(l);const c=new En(Xr,$r,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===El)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,f]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(h,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class i_ extends rn{constructor(e=[],n=Cs,i,r,s,o,a,l,c,f){super(e,n,i,r,s,o,a,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jS extends Pr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new i_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:$n}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ho(5,5,5),s=new Jn({name:"CubemapFromEquirect",uniforms:Rs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:nn,blending:Xi});s.uniforms.tEquirect.value=n;const o=new Bn(r,s),a=n.minFilter;return n.minFilter===xr&&(n.minFilter=$n),new WS(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}class wa extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qS={type:"move"};class qc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const m=n.getJointPose(y,i),u=this._getHandJoint(c,y);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=f.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(qS)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new wa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class XS extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Xc=new V,$S=new V,YS=new Ue;class dr{constructor(e=new V(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Xc.subVectors(i,n).cross($S.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Xc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||YS.getNormalMatrix(e),r=this.coplanarPoint(Xc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const or=new Hf,Ca=new V;class r_{constructor(e=new dr,n=new dr,i=new dr,r=new dr,s=new dr,o=new dr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=pi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],f=r[5],h=r[6],d=r[7],p=r[8],g=r[9],y=r[10],m=r[11],u=r[12],_=r[13],x=r[14],v=r[15];if(i[0].setComponents(l-s,d-c,m-p,v-u).normalize(),i[1].setComponents(l+s,d+c,m+p,v+u).normalize(),i[2].setComponents(l+o,d+f,m+g,v+_).normalize(),i[3].setComponents(l-o,d-f,m-g,v-_).normalize(),i[4].setComponents(l-a,d-h,m-y,v-x).normalize(),n===pi)i[5].setComponents(l+a,d+h,m+y,v+x).normalize();else if(n===El)i[5].setComponents(a,h,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(or)}intersectsSprite(e){return or.center.set(0,0,0),or.radius=.7071067811865476,or.applyMatrix4(e.matrixWorld),this.intersectsSphere(or)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ca.x=r.normal.x>0?e.max.x:e.min.x,Ca.y=r.normal.y>0?e.max.y:e.min.y,Ca.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class s_ extends rn{constructor(e,n,i=Rr,r,s,o,a=Vn,l=Vn,c,f=Po){if(f!==Po&&f!==Io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,r,s,o,a,l,f,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Ps extends Lr{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,f=l+1,h=e/a,d=n/l,p=[],g=[],y=[],m=[];for(let u=0;u<f;u++){const _=u*d-o;for(let x=0;x<c;x++){const v=x*h-s;g.push(v,-_,0),y.push(0,0,1),m.push(x/a),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let _=0;_<a;_++){const x=_+c*u,v=_+c*(u+1),P=_+1+c*(u+1),C=_+1+c*u;p.push(x,v,C),p.push(v,P,C)}this.setIndex(p),this.setAttribute("position",new Er(g,3)),this.setAttribute("normal",new Er(y,3)),this.setAttribute("uv",new Er(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.width,e.height,e.widthSegments,e.heightSegments)}}class KS extends $l{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ZS extends $l{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class QS extends n_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class JS extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Dp(t,e,n,i){const r=eM(i);switch(n){case Vv:return t*e;case Wv:return t*e/r.components*r.byteLength;case Of:return t*e/r.components*r.byteLength;case jv:return t*e*2/r.components*r.byteLength;case kf:return t*e*2/r.components*r.byteLength;case Gv:return t*e*3/r.components*r.byteLength;case kn:return t*e*4/r.components*r.byteLength;case Bf:return t*e*4/r.components*r.byteLength;case Va:case Ga:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Wa:case ja:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ad:case cd:return Math.max(t,16)*Math.max(e,8)/4;case od:case ld:return Math.max(t,8)*Math.max(e,8)/2;case ud:case dd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case fd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case pd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case md:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case gd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case vd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case _d:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case yd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case xd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Md:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Td:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case wd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Cd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case qa:case Ad:case bd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case qv:case Rd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Pd:case Id:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function eM(t){switch(t){case Mi:case Bv:return{byteLength:1,components:1};case bo:case zv:case Oo:return{byteLength:2,components:1};case Uf:case Ff:return{byteLength:2,components:4};case Rr:case Nf:case hi:return{byteLength:4,components:1};case Hv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function o_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function tM(t){const e=new WeakMap;function n(a,l){const c=a.array,f=a.usage,h=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,f),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const f=l.array,h=l.updateRanges;if(t.bindBuffer(c,a),h.length===0)t.bufferSubData(c,0,f);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){const g=h[d],y=h[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++d,h[d]=y)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){const y=h[p];t.bufferSubData(c,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var nM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,mM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,gM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_M=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,SM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,MM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,EM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,TM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,AM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,PM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,IM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DM="gl_FragColor = linearToOutputTexel( gl_FragColor );",LM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,NM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,UM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,FM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,OM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,BM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,HM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,GM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,WM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,XM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$M=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,YM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ZM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_E=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,SE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ME=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,TE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,CE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,IE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,LE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,kE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,BE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,HE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,XE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$E=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,YE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ZE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,QE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,e1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const t1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,n1=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r1=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,l1=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,c1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,u1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,d1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,p1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,m1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
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
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,g1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,x1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,M1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,E1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,T1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,w1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,C1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,P1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,L1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,N1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:nM,alphahash_pars_fragment:iM,alphamap_fragment:rM,alphamap_pars_fragment:sM,alphatest_fragment:oM,alphatest_pars_fragment:aM,aomap_fragment:lM,aomap_pars_fragment:cM,batching_pars_vertex:uM,batching_vertex:dM,begin_vertex:fM,beginnormal_vertex:hM,bsdfs:pM,iridescence_fragment:mM,bumpmap_pars_fragment:gM,clipping_planes_fragment:vM,clipping_planes_pars_fragment:_M,clipping_planes_pars_vertex:yM,clipping_planes_vertex:xM,color_fragment:SM,color_pars_fragment:MM,color_pars_vertex:EM,color_vertex:TM,common:wM,cube_uv_reflection_fragment:CM,defaultnormal_vertex:AM,displacementmap_pars_vertex:bM,displacementmap_vertex:RM,emissivemap_fragment:PM,emissivemap_pars_fragment:IM,colorspace_fragment:DM,colorspace_pars_fragment:LM,envmap_fragment:NM,envmap_common_pars_fragment:UM,envmap_pars_fragment:FM,envmap_pars_vertex:OM,envmap_physical_pars_fragment:$M,envmap_vertex:kM,fog_vertex:BM,fog_pars_vertex:zM,fog_fragment:HM,fog_pars_fragment:VM,gradientmap_pars_fragment:GM,lightmap_pars_fragment:WM,lights_lambert_fragment:jM,lights_lambert_pars_fragment:qM,lights_pars_begin:XM,lights_toon_fragment:YM,lights_toon_pars_fragment:KM,lights_phong_fragment:ZM,lights_phong_pars_fragment:QM,lights_physical_fragment:JM,lights_physical_pars_fragment:eE,lights_fragment_begin:tE,lights_fragment_maps:nE,lights_fragment_end:iE,logdepthbuf_fragment:rE,logdepthbuf_pars_fragment:sE,logdepthbuf_pars_vertex:oE,logdepthbuf_vertex:aE,map_fragment:lE,map_pars_fragment:cE,map_particle_fragment:uE,map_particle_pars_fragment:dE,metalnessmap_fragment:fE,metalnessmap_pars_fragment:hE,morphinstance_vertex:pE,morphcolor_vertex:mE,morphnormal_vertex:gE,morphtarget_pars_vertex:vE,morphtarget_vertex:_E,normal_fragment_begin:yE,normal_fragment_maps:xE,normal_pars_fragment:SE,normal_pars_vertex:ME,normal_vertex:EE,normalmap_pars_fragment:TE,clearcoat_normal_fragment_begin:wE,clearcoat_normal_fragment_maps:CE,clearcoat_pars_fragment:AE,iridescence_pars_fragment:bE,opaque_fragment:RE,packing:PE,premultiplied_alpha_fragment:IE,project_vertex:DE,dithering_fragment:LE,dithering_pars_fragment:NE,roughnessmap_fragment:UE,roughnessmap_pars_fragment:FE,shadowmap_pars_fragment:OE,shadowmap_pars_vertex:kE,shadowmap_vertex:BE,shadowmask_pars_fragment:zE,skinbase_vertex:HE,skinning_pars_vertex:VE,skinning_vertex:GE,skinnormal_vertex:WE,specularmap_fragment:jE,specularmap_pars_fragment:qE,tonemapping_fragment:XE,tonemapping_pars_fragment:$E,transmission_fragment:YE,transmission_pars_fragment:KE,uv_pars_fragment:ZE,uv_pars_vertex:QE,uv_vertex:JE,worldpos_vertex:e1,background_vert:t1,background_frag:n1,backgroundCube_vert:i1,backgroundCube_frag:r1,cube_vert:s1,cube_frag:o1,depth_vert:a1,depth_frag:l1,distanceRGBA_vert:c1,distanceRGBA_frag:u1,equirect_vert:d1,equirect_frag:f1,linedashed_vert:h1,linedashed_frag:p1,meshbasic_vert:m1,meshbasic_frag:g1,meshlambert_vert:v1,meshlambert_frag:_1,meshmatcap_vert:y1,meshmatcap_frag:x1,meshnormal_vert:S1,meshnormal_frag:M1,meshphong_vert:E1,meshphong_frag:T1,meshphysical_vert:w1,meshphysical_frag:C1,meshtoon_vert:A1,meshtoon_frag:b1,points_vert:R1,points_frag:P1,shadow_vert:I1,shadow_frag:D1,sprite_vert:L1,sprite_frag:N1},le={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},envMapRotation:{value:new Ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},qn={basic:{uniforms:Gt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Gt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Gt([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Gt([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Gt([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Gt([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Gt([le.points,le.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Gt([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Gt([le.common,le.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Gt([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Gt([le.sprite,le.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ue}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Gt([le.common,le.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Gt([le.lights,le.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};qn.physical={uniforms:Gt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Aa={r:0,b:0,g:0},ar=new Ei,U1=new Et;function F1(t,e,n,i,r,s,o){const a=new Qe(0);let l=s===!0?0:1,c,f,h=null,d=0,p=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?n:e).get(v)),v}function y(x){let v=!1;const P=g(x);P===null?u(a,l):P&&P.isColor&&(u(P,1),v=!0);const C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(x,v){const P=g(v);P&&(P.isCubeTexture||P.mapping===Xl)?(f===void 0&&(f=new Bn(new Ho(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:Rs(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(C,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),ar.copy(v.backgroundRotation),ar.x*=-1,ar.y*=-1,ar.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),f.material.uniforms.envMap.value=P,f.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(U1.makeRotationFromEuler(ar)),f.material.toneMapped=$e.getTransfer(P.colorSpace)!==tt,(h!==P||d!==P.version||p!==t.toneMapping)&&(f.material.needsUpdate=!0,h=P,d=P.version,p=t.toneMapping),f.layers.enableAll(),x.unshift(f,f.geometry,f.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new Bn(new Ps(2,2),new Jn({name:"BackgroundMaterial",uniforms:Rs(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=$e.getTransfer(P.colorSpace)!==tt,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||d!==P.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,h=P,d=P.version,p=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function u(x,v){x.getRGB(Aa,t_(t)),i.buffers.color.setClear(Aa.r,Aa.g,Aa.b,v,o)}function _(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,u(a,l)},render:y,addToRenderList:m,dispose:_}}function O1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(S,I,U,L,W){let j=!1;const $=h(L,U,I);s!==$&&(s=$,c(s.object)),j=p(S,L,U,W),j&&g(S,L,U,W),W!==null&&e.update(W,t.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(S,I,U,L),W!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return t.createVertexArray()}function c(S){return t.bindVertexArray(S)}function f(S){return t.deleteVertexArray(S)}function h(S,I,U){const L=U.wireframe===!0;let W=i[S.id];W===void 0&&(W={},i[S.id]=W);let j=W[I.id];j===void 0&&(j={},W[I.id]=j);let $=j[L];return $===void 0&&($=d(l()),j[L]=$),$}function d(S){const I=[],U=[],L=[];for(let W=0;W<n;W++)I[W]=0,U[W]=0,L[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:L,object:S,attributes:{},index:null}}function p(S,I,U,L){const W=s.attributes,j=I.attributes;let $=0;const ee=U.getAttributes();for(const N in ee)if(ee[N].location>=0){const Q=W[N];let ae=j[N];if(ae===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),Q===void 0||Q.attribute!==ae||ae&&Q.data!==ae.data)return!0;$++}return s.attributesNum!==$||s.index!==L}function g(S,I,U,L){const W={},j=I.attributes;let $=0;const ee=U.getAttributes();for(const N in ee)if(ee[N].location>=0){let Q=j[N];Q===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor));const ae={};ae.attribute=Q,Q&&Q.data&&(ae.data=Q.data),W[N]=ae,$++}s.attributes=W,s.attributesNum=$,s.index=L}function y(){const S=s.newAttributes;for(let I=0,U=S.length;I<U;I++)S[I]=0}function m(S){u(S,0)}function u(S,I){const U=s.newAttributes,L=s.enabledAttributes,W=s.attributeDivisors;U[S]=1,L[S]===0&&(t.enableVertexAttribArray(S),L[S]=1),W[S]!==I&&(t.vertexAttribDivisor(S,I),W[S]=I)}function _(){const S=s.newAttributes,I=s.enabledAttributes;for(let U=0,L=I.length;U<L;U++)I[U]!==S[U]&&(t.disableVertexAttribArray(U),I[U]=0)}function x(S,I,U,L,W,j,$){$===!0?t.vertexAttribIPointer(S,I,U,W,j):t.vertexAttribPointer(S,I,U,L,W,j)}function v(S,I,U,L){y();const W=L.attributes,j=U.getAttributes(),$=I.defaultAttributeValues;for(const ee in j){const N=j[ee];if(N.location>=0){let Y=W[ee];if(Y===void 0&&(ee==="instanceMatrix"&&S.instanceMatrix&&(Y=S.instanceMatrix),ee==="instanceColor"&&S.instanceColor&&(Y=S.instanceColor)),Y!==void 0){const Q=Y.normalized,ae=Y.itemSize,Se=e.get(Y);if(Se===void 0)continue;const qe=Se.buffer,q=Se.type,se=Se.bytesPerElement,pe=q===t.INT||q===t.UNSIGNED_INT||Y.gpuType===Nf;if(Y.isInterleavedBufferAttribute){const oe=Y.data,Ce=oe.stride,Ye=Y.offset;if(oe.isInstancedInterleavedBuffer){for(let Pe=0;Pe<N.locationSize;Pe++)u(N.location+Pe,oe.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Pe=0;Pe<N.locationSize;Pe++)m(N.location+Pe);t.bindBuffer(t.ARRAY_BUFFER,qe);for(let Pe=0;Pe<N.locationSize;Pe++)x(N.location+Pe,ae/N.locationSize,q,Q,Ce*se,(Ye+ae/N.locationSize*Pe)*se,pe)}else{if(Y.isInstancedBufferAttribute){for(let oe=0;oe<N.locationSize;oe++)u(N.location+oe,Y.meshPerAttribute);S.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let oe=0;oe<N.locationSize;oe++)m(N.location+oe);t.bindBuffer(t.ARRAY_BUFFER,qe);for(let oe=0;oe<N.locationSize;oe++)x(N.location+oe,ae/N.locationSize,q,Q,ae*se,ae/N.locationSize*oe*se,pe)}}else if($!==void 0){const Q=$[ee];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(N.location,Q);break;case 3:t.vertexAttrib3fv(N.location,Q);break;case 4:t.vertexAttrib4fv(N.location,Q);break;default:t.vertexAttrib1fv(N.location,Q)}}}}_()}function P(){R();for(const S in i){const I=i[S];for(const U in I){const L=I[U];for(const W in L)f(L[W].object),delete L[W];delete I[U]}delete i[S]}}function C(S){if(i[S.id]===void 0)return;const I=i[S.id];for(const U in I){const L=I[U];for(const W in L)f(L[W].object),delete L[W];delete I[U]}delete i[S.id]}function M(S){for(const I in i){const U=i[I];if(U[S.id]===void 0)continue;const L=U[S.id];for(const W in L)f(L[W].object),delete L[W];delete U[S.id]}}function R(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:R,resetDefaultState:T,dispose:P,releaseStatesOfGeometry:C,releaseStatesOfProgram:M,initAttributes:y,enableAttribute:m,disableUnusedAttributes:_}}function k1(t,e,n){let i;function r(c){i=c}function s(c,f){t.drawArrays(i,c,f),n.update(f,i,1)}function o(c,f,h){h!==0&&(t.drawArraysInstanced(i,c,f,h),n.update(f,i,h))}function a(c,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,h);let p=0;for(let g=0;g<h;g++)p+=f[g];n.update(p,i,1)}function l(c,f,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],f[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,d,0,h);let g=0;for(let y=0;y<h;y++)g+=f[y]*d[y];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function B1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(M){return!(M!==kn&&i.convert(M)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){const R=M===Oo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(M!==Mi&&i.convert(M)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==hi&&!R)}function l(M){if(M==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,d=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,C=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:P,maxSamples:C}}function z1(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new dr,a=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||r;return r=d,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,d){n=f(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,u=t.get(h);if(!r||g===null||g.length===0||s&&!m)s?f(null):c();else{const _=s?0:i,x=_*4;let v=u.clippingState||null;l.value=v,v=f(g,d,x,p);for(let P=0;P!==x;++P)v[P]=n[P];u.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,d,p,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const u=p+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<u)&&(m=new Float32Array(u));for(let x=0,v=p;x!==y;++x,v+=4)o.copy(h[x]).applyMatrix4(_,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}function H1(t){let e=new WeakMap;function n(o,a){return a===nd?o.mapping=Cs:a===id&&(o.mapping=As),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===nd||a===id)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new jS(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const ls=4,Lp=[.125,.215,.35,.446,.526,.582],pr=20,$c=new QS,Np=new Qe;let Yc=null,Kc=0,Zc=0,Qc=!1;const fr=(1+Math.sqrt(5))/2,Yr=1/fr,Up=[new V(-fr,Yr,0),new V(fr,Yr,0),new V(-Yr,0,fr),new V(Yr,0,fr),new V(0,fr,-Yr),new V(0,fr,Yr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)],V1=new V;class Fp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=V1}=s;Yc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yc,Kc,Zc),this._renderer.xr.enabled=Qc,e.scissorTest=!1,ba(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Cs||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:Oo,format:kn,colorSpace:bs,depthBuffer:!1},r=Op(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Op(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=G1(s)),this._blurMaterial=W1(s,e,n)}return r}_compileMaterial(e){const n=new Bn(this._lodPlanes[0],e);this._renderer.compile(n,$c)}_sceneToCubeUV(e,n,i,r,s){const l=new En(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Np),h.toneMapping=$i,h.autoClear=!1;const g=new Qv({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),y=new Bn(new Ho,g);let m=!1;const u=e.background;u?u.isColor&&(g.color.copy(u),e.background=null,m=!0):(g.color.copy(Np),m=!0);for(let _=0;_<6;_++){const x=_%3;x===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[_],s.y,s.z)):x===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[_]));const v=this._cubeSize;ba(r,x*v,_>2?v:0,v,v),h.setRenderTarget(r),m&&h.render(y,l),h.render(e,l)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=u}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Cs||e.mapping===As;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Bn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ba(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,$c)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Up[(r-s-1)%Up.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,h=new Bn(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*pr-1),y=s/g,m=isFinite(s)?1+Math.floor(f*y):pr;m>pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pr}`);const u=[];let _=0;for(let M=0;M<pr;++M){const R=M/y,T=Math.exp(-R*R/2);u.push(T),M===0?_+=T:M<m&&(_+=2*T)}for(let M=0;M<u.length;M++)u[M]=u[M]/_;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=u,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-i;const v=this._sizeLods[r],P=3*v*(r>x-ls?r-x+ls:0),C=4*(this._cubeSize-v);ba(n,P,C,3*v,2*v),l.setRenderTarget(n),l.render(h,$c)}}function G1(t){const e=[],n=[],i=[];let r=t;const s=t-ls+1+Lp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-ls?l=Lp[o-t+ls-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),f=-c,h=1+c,d=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,g=6,y=3,m=2,u=1,_=new Float32Array(y*g*p),x=new Float32Array(m*g*p),v=new Float32Array(u*g*p);for(let C=0;C<p;C++){const M=C%3*2/3-1,R=C>2?0:-1,T=[M,R,0,M+2/3,R,0,M+2/3,R+1,0,M,R,0,M+2/3,R+1,0,M,R+1,0];_.set(T,y*g*C),x.set(d,m*g*C);const S=[C,C,C,C,C,C];v.set(S,u*g*C)}const P=new Lr;P.setAttribute("position",new Qn(_,y)),P.setAttribute("uv",new Qn(x,m)),P.setAttribute("faceIndex",new Qn(v,u)),e.push(P),r>ls&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Op(t,e,n){const i=new Pr(t,e,n);return i.texture.mapping=Xl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ba(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function W1(t,e,n){const i=new Float32Array(pr),r=new V(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function kp(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Bp(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Vf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function j1(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===nd||l===id,f=l===Cs||l===As;if(c||f){let h=e.get(a);const d=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return n===null&&(n=new Fp(t)),h=c?n.fromEquirectangular(a,h):n.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||f&&p&&r(p)?(n===null&&(n=new Fp(t)),h=c?n.fromEquirectangular(a):n.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const c=6;for(let f=0;f<c;f++)a[f]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function q1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Xa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function X1(t,e,n,i){const r={},s=new WeakMap;function o(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(h,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,g=h.attributes.position;let y=0;if(p!==null){const _=p.array;y=p.version;for(let x=0,v=_.length;x<v;x+=3){const P=_[x+0],C=_[x+1],M=_[x+2];d.push(P,C,C,M,M,P)}}else if(g!==void 0){const _=g.array;y=g.version;for(let x=0,v=_.length/3-1;x<v;x+=3){const P=x+0,C=x+1,M=x+2;d.push(P,C,C,M,M,P)}}else return;const m=new($v(d)?e_:Jv)(d,1);m.version=y;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function f(h){const d=s.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:f}}function $1(t,e,n){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,p){t.drawElements(i,p,s,d*o),n.update(p,i,1)}function c(d,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,d*o,g),n.update(p,i,g))}function f(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,g);let m=0;for(let u=0;u<g;u++)m+=p[u];n.update(m,i,1)}function h(d,p,g,y){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<d.length;u++)c(d[u]/o,p[u],y[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,y,0,g);let u=0;for(let _=0;_<g;_++)u+=p[_]*y[_];n.update(u,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function Y1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function K1(t,e,n){const i=new WeakMap,r=new yt;function s(o,a,l){const c=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=f!==void 0?f.length:0;let d=i.get(a);if(d===void 0||d.count!==h){let S=function(){R.dispose(),i.delete(a),a.removeEventListener("dispose",S)};var p=S;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),y===!0&&(v=2),m===!0&&(v=3);let P=a.attributes.position.count*v,C=1;P>e.maxTextureSize&&(C=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const M=new Float32Array(P*C*4*h),R=new Yv(M,P,C,h);R.type=hi,R.needsUpdate=!0;const T=v*4;for(let I=0;I<h;I++){const U=u[I],L=_[I],W=x[I],j=P*C*4*I;for(let $=0;$<U.count;$++){const ee=$*T;g===!0&&(r.fromBufferAttribute(U,$),M[j+ee+0]=r.x,M[j+ee+1]=r.y,M[j+ee+2]=r.z,M[j+ee+3]=0),y===!0&&(r.fromBufferAttribute(L,$),M[j+ee+4]=r.x,M[j+ee+5]=r.y,M[j+ee+6]=r.z,M[j+ee+7]=0),m===!0&&(r.fromBufferAttribute(W,$),M[j+ee+8]=r.x,M[j+ee+9]=r.y,M[j+ee+10]=r.z,M[j+ee+11]=W.itemSize===4?r.w:1)}}d={count:h,texture:R,size:new nt(P,C)},i.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const y=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",y),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function Z1(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==c&&(e.update(h),r.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return h}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}const a_=new rn,zp=new s_(1,1),l_=new Yv,c_=new AS,u_=new i_,Hp=[],Vp=[],Gp=new Float32Array(16),Wp=new Float32Array(9),jp=new Float32Array(4);function Us(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Hp[r];if(s===void 0&&(s=new Float32Array(r),Hp[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ct(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function At(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Yl(t,e){let n=Vp[e];n===void 0&&(n=new Int32Array(e),Vp[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Q1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function J1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2fv(this.addr,e),At(n,e)}}function eT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ct(n,e))return;t.uniform3fv(this.addr,e),At(n,e)}}function tT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4fv(this.addr,e),At(n,e)}}function nT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),At(n,e)}else{if(Ct(n,i))return;jp.set(i),t.uniformMatrix2fv(this.addr,!1,jp),At(n,i)}}function iT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),At(n,e)}else{if(Ct(n,i))return;Wp.set(i),t.uniformMatrix3fv(this.addr,!1,Wp),At(n,i)}}function rT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),At(n,e)}else{if(Ct(n,i))return;Gp.set(i),t.uniformMatrix4fv(this.addr,!1,Gp),At(n,i)}}function sT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function oT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2iv(this.addr,e),At(n,e)}}function aT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3iv(this.addr,e),At(n,e)}}function lT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4iv(this.addr,e),At(n,e)}}function cT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function uT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2uiv(this.addr,e),At(n,e)}}function dT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3uiv(this.addr,e),At(n,e)}}function fT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4uiv(this.addr,e),At(n,e)}}function hT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(zp.compareFunction=Xv,s=zp):s=a_,n.setTexture2D(e||s,r)}function pT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||c_,r)}function mT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||u_,r)}function gT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||l_,r)}function vT(t){switch(t){case 5126:return Q1;case 35664:return J1;case 35665:return eT;case 35666:return tT;case 35674:return nT;case 35675:return iT;case 35676:return rT;case 5124:case 35670:return sT;case 35667:case 35671:return oT;case 35668:case 35672:return aT;case 35669:case 35673:return lT;case 5125:return cT;case 36294:return uT;case 36295:return dT;case 36296:return fT;case 35678:case 36198:case 36298:case 36306:case 35682:return hT;case 35679:case 36299:case 36307:return pT;case 35680:case 36300:case 36308:case 36293:return mT;case 36289:case 36303:case 36311:case 36292:return gT}}function _T(t,e){t.uniform1fv(this.addr,e)}function yT(t,e){const n=Us(e,this.size,2);t.uniform2fv(this.addr,n)}function xT(t,e){const n=Us(e,this.size,3);t.uniform3fv(this.addr,n)}function ST(t,e){const n=Us(e,this.size,4);t.uniform4fv(this.addr,n)}function MT(t,e){const n=Us(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function ET(t,e){const n=Us(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function TT(t,e){const n=Us(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function wT(t,e){t.uniform1iv(this.addr,e)}function CT(t,e){t.uniform2iv(this.addr,e)}function AT(t,e){t.uniform3iv(this.addr,e)}function bT(t,e){t.uniform4iv(this.addr,e)}function RT(t,e){t.uniform1uiv(this.addr,e)}function PT(t,e){t.uniform2uiv(this.addr,e)}function IT(t,e){t.uniform3uiv(this.addr,e)}function DT(t,e){t.uniform4uiv(this.addr,e)}function LT(t,e,n){const i=this.cache,r=e.length,s=Yl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a_,s[o])}function NT(t,e,n){const i=this.cache,r=e.length,s=Yl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||c_,s[o])}function UT(t,e,n){const i=this.cache,r=e.length,s=Yl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||u_,s[o])}function FT(t,e,n){const i=this.cache,r=e.length,s=Yl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),At(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||l_,s[o])}function OT(t){switch(t){case 5126:return _T;case 35664:return yT;case 35665:return xT;case 35666:return ST;case 35674:return MT;case 35675:return ET;case 35676:return TT;case 5124:case 35670:return wT;case 35667:case 35671:return CT;case 35668:case 35672:return AT;case 35669:case 35673:return bT;case 5125:return RT;case 36294:return PT;case 36295:return IT;case 36296:return DT;case 35678:case 36198:case 36298:case 36306:case 35682:return LT;case 35679:case 36299:case 36307:return NT;case 35680:case 36300:case 36308:case 36293:return UT;case 36289:case 36303:case 36311:case 36292:return FT}}class kT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=vT(n.type)}}class BT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=OT(n.type)}}class zT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Jc=/(\w+)(\])?(\[|\.)?/g;function qp(t,e){t.seq.push(e),t.map[e.id]=e}function HT(t,e,n){const i=t.name,r=i.length;for(Jc.lastIndex=0;;){const s=Jc.exec(i),o=Jc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){qp(n,c===void 0?new kT(a,t,e):new BT(a,t,e));break}else{let h=n.map[a];h===void 0&&(h=new zT(a),qp(n,h)),n=h}}}class $a{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);HT(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function Xp(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const VT=37297;let GT=0;function WT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const $p=new Ue;function jT(t){$e._getMatrix($p,$e.workingColorSpace,t);const e=`mat3( ${$p.elements.map(n=>n.toFixed(4))} )`;switch($e.getTransfer(t)){case Ml:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Yp(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+WT(t.getShaderSource(e),o)}else return r}function qT(t,e){const n=jT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function XT(t,e){let n;switch(e){case Qx:n="Linear";break;case Jx:n="Reinhard";break;case eS:n="Cineon";break;case tS:n="ACESFilmic";break;case iS:n="AgX";break;case rS:n="Neutral";break;case nS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ra=new V;function $T(){$e.getLuminanceCoefficients(Ra);const t=Ra.x.toFixed(4),e=Ra.y.toFixed(4),n=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function YT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function KT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function ZT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function eo(t){return t!==""}function Kp(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zp(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const QT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ld(t){return t.replace(QT,ew)}const JT=new Map;function ew(t,e){let n=Oe[e];if(n===void 0){const i=JT.get(e);if(i!==void 0)n=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ld(n)}const tw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qp(t){return t.replace(tw,nw)}function nw(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Jp(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function iw(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Fv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Ix?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function rw(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Cs:case As:e="ENVMAP_TYPE_CUBE";break;case Xl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sw(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case As:e="ENVMAP_MODE_REFRACTION";break}return e}function ow(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Ov:e="ENVMAP_BLENDING_MULTIPLY";break;case Kx:e="ENVMAP_BLENDING_MIX";break;case Zx:e="ENVMAP_BLENDING_ADD";break}return e}function aw(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function lw(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=iw(n),c=rw(n),f=sw(n),h=ow(n),d=aw(n),p=YT(n),g=KT(s),y=r.createProgram();let m,u,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(eo).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(eo).join(`
`),u.length>0&&(u+=`
`)):(m=[Jp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),u=[Jp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==$i?"#define TONE_MAPPING":"",n.toneMapping!==$i?Oe.tonemapping_pars_fragment:"",n.toneMapping!==$i?XT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,qT("linearToOutputTexel",n.outputColorSpace),$T(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(eo).join(`
`)),o=Ld(o),o=Kp(o,n),o=Zp(o,n),a=Ld(a),a=Kp(a,n),a=Zp(a,n),o=Qp(o),a=Qp(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===pp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===pp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const x=_+m+o,v=_+u+a,P=Xp(r,r.VERTEX_SHADER,x),C=Xp(r,r.FRAGMENT_SHADER,v);r.attachShader(y,P),r.attachShader(y,C),n.index0AttributeName!==void 0?r.bindAttribLocation(y,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function M(I){if(t.debug.checkShaderErrors){const U=r.getProgramInfoLog(y).trim(),L=r.getShaderInfoLog(P).trim(),W=r.getShaderInfoLog(C).trim();let j=!0,$=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(j=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,y,P,C);else{const ee=Yp(r,P,"vertex"),N=Yp(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+ee+`
`+N)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(L===""||W==="")&&($=!1);$&&(I.diagnostics={runnable:j,programLog:U,vertexShader:{log:L,prefix:m},fragmentShader:{log:W,prefix:u}})}r.deleteShader(P),r.deleteShader(C),R=new $a(r,y),T=ZT(r,y)}let R;this.getUniforms=function(){return R===void 0&&M(this),R};let T;this.getAttributes=function(){return T===void 0&&M(this),T};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(y,VT)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=GT++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=P,this.fragmentShader=C,this}let cw=0;class uw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new dw(e),n.set(e,i)),i}}class dw{constructor(e){this.id=cw++,this.code=e,this.usedTimes=0}}function fw(t,e,n,i,r,s,o){const a=new Kv,l=new uw,c=new Set,f=[],h=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,S,I,U,L){const W=U.fog,j=L.geometry,$=T.isMeshStandardMaterial?U.environment:null,ee=(T.isMeshStandardMaterial?n:e).get(T.envMap||$),N=ee&&ee.mapping===Xl?ee.image.height:null,Y=g[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const Q=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ae=Q!==void 0?Q.length:0;let Se=0;j.morphAttributes.position!==void 0&&(Se=1),j.morphAttributes.normal!==void 0&&(Se=2),j.morphAttributes.color!==void 0&&(Se=3);let qe,q,se,pe;if(Y){const Je=qn[Y];qe=Je.vertexShader,q=Je.fragmentShader}else qe=T.vertexShader,q=T.fragmentShader,l.update(T),se=l.getVertexShaderID(T),pe=l.getFragmentShaderID(T);const oe=t.getRenderTarget(),Ce=t.state.buffers.depth.getReversed(),Ye=L.isInstancedMesh===!0,Pe=L.isBatchedMesh===!0,vt=!!T.map,ut=!!T.matcap,ze=!!ee,D=!!T.aoMap,gn=!!T.lightMap,Ge=!!T.bumpMap,He=!!T.normalMap,Ee=!!T.displacementMap,st=!!T.emissiveMap,Me=!!T.metalnessMap,A=!!T.roughnessMap,E=T.anisotropy>0,B=T.clearcoat>0,K=T.dispersion>0,te=T.iridescence>0,X=T.sheen>0,xe=T.transmission>0,ue=E&&!!T.anisotropyMap,Ae=B&&!!T.clearcoatMap,be=B&&!!T.clearcoatNormalMap,ie=B&&!!T.clearcoatRoughnessMap,ve=te&&!!T.iridescenceMap,Re=te&&!!T.iridescenceThicknessMap,De=X&&!!T.sheenColorMap,_e=X&&!!T.sheenRoughnessMap,Ve=!!T.specularMap,Fe=!!T.specularColorMap,it=!!T.specularIntensityMap,F=xe&&!!T.transmissionMap,de=xe&&!!T.thicknessMap,G=!!T.gradientMap,Z=!!T.alphaMap,he=T.alphaTest>0,fe=!!T.alphaHash,Ne=!!T.extensions;let pt=$i;T.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(pt=t.toneMapping);const Ut={shaderID:Y,shaderType:T.type,shaderName:T.name,vertexShader:qe,fragmentShader:q,defines:T.defines,customVertexShaderID:se,customFragmentShaderID:pe,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Pe,batchingColor:Pe&&L._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&L.instanceColor!==null,instancingMorph:Ye&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:oe===null?t.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:bs,alphaToCoverage:!!T.alphaToCoverage,map:vt,matcap:ut,envMap:ze,envMapMode:ze&&ee.mapping,envMapCubeUVHeight:N,aoMap:D,lightMap:gn,bumpMap:Ge,normalMap:He,displacementMap:d&&Ee,emissiveMap:st,normalMapObjectSpace:He&&T.normalMapType===cS,normalMapTangentSpace:He&&T.normalMapType===lS,metalnessMap:Me,roughnessMap:A,anisotropy:E,anisotropyMap:ue,clearcoat:B,clearcoatMap:Ae,clearcoatNormalMap:be,clearcoatRoughnessMap:ie,dispersion:K,iridescence:te,iridescenceMap:ve,iridescenceThicknessMap:Re,sheen:X,sheenColorMap:De,sheenRoughnessMap:_e,specularMap:Ve,specularColorMap:Fe,specularIntensityMap:it,transmission:xe,transmissionMap:F,thicknessMap:de,gradientMap:G,opaque:T.transparent===!1&&T.blending===gs&&T.alphaToCoverage===!1,alphaMap:Z,alphaTest:he,alphaHash:fe,combine:T.combine,mapUv:vt&&y(T.map.channel),aoMapUv:D&&y(T.aoMap.channel),lightMapUv:gn&&y(T.lightMap.channel),bumpMapUv:Ge&&y(T.bumpMap.channel),normalMapUv:He&&y(T.normalMap.channel),displacementMapUv:Ee&&y(T.displacementMap.channel),emissiveMapUv:st&&y(T.emissiveMap.channel),metalnessMapUv:Me&&y(T.metalnessMap.channel),roughnessMapUv:A&&y(T.roughnessMap.channel),anisotropyMapUv:ue&&y(T.anisotropyMap.channel),clearcoatMapUv:Ae&&y(T.clearcoatMap.channel),clearcoatNormalMapUv:be&&y(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&y(T.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&y(T.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&y(T.iridescenceThicknessMap.channel),sheenColorMapUv:De&&y(T.sheenColorMap.channel),sheenRoughnessMapUv:_e&&y(T.sheenRoughnessMap.channel),specularMapUv:Ve&&y(T.specularMap.channel),specularColorMapUv:Fe&&y(T.specularColorMap.channel),specularIntensityMapUv:it&&y(T.specularIntensityMap.channel),transmissionMapUv:F&&y(T.transmissionMap.channel),thicknessMapUv:de&&y(T.thicknessMap.channel),alphaMapUv:Z&&y(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(He||E),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!j.attributes.uv&&(vt||Z),fog:!!W,useFog:T.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Ce,skinning:L.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Se,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:t.shadowMap.enabled&&I.length>0,shadowMapType:t.shadowMap.type,toneMapping:pt,decodeVideoTexture:vt&&T.map.isVideoTexture===!0&&$e.getTransfer(T.map.colorSpace)===tt,decodeVideoTextureEmissive:st&&T.emissiveMap.isVideoTexture===!0&&$e.getTransfer(T.emissiveMap.colorSpace)===tt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ui,flipSided:T.side===nn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ne&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&T.extensions.multiDraw===!0||Pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function u(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const I in T.defines)S.push(I),S.push(T.defines[I]);return T.isRawShaderMaterial===!1&&(_(S,T),x(S,T),S.push(t.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function _(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function x(T,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),T.push(a.mask)}function v(T){const S=g[T.type];let I;if(S){const U=qn[S];I=HS.clone(U.uniforms)}else I=T.uniforms;return I}function P(T,S){let I;for(let U=0,L=f.length;U<L;U++){const W=f[U];if(W.cacheKey===S){I=W,++I.usedTimes;break}}return I===void 0&&(I=new lw(t,S,T,s),f.push(I)),I}function C(T){if(--T.usedTimes===0){const S=f.indexOf(T);f[S]=f[f.length-1],f.pop(),T.destroy()}}function M(T){l.remove(T)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:v,acquireProgram:P,releaseProgram:C,releaseShaderCache:M,programs:f,dispose:R}}function hw(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function pw(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function em(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function tm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(h,d,p,g,y,m){let u=t[e];return u===void 0?(u={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:y,group:m},t[e]=u):(u.id=h.id,u.object=h,u.geometry=d,u.material=p,u.groupOrder=g,u.renderOrder=h.renderOrder,u.z=y,u.group=m),e++,u}function a(h,d,p,g,y,m){const u=o(h,d,p,g,y,m);p.transmission>0?i.push(u):p.transparent===!0?r.push(u):n.push(u)}function l(h,d,p,g,y,m){const u=o(h,d,p,g,y,m);p.transmission>0?i.unshift(u):p.transparent===!0?r.unshift(u):n.unshift(u)}function c(h,d){n.length>1&&n.sort(h||pw),i.length>1&&i.sort(d||em),r.length>1&&r.sort(d||em)}function f(){for(let h=e,d=t.length;h<d;h++){const p=t[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:c}}function mw(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new tm,t.set(i,[o])):r>=s.length?(o=new tm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function gw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new V,color:new Qe};break;case"SpotLight":n={position:new V,direction:new V,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":n={color:new Qe,position:new V,halfWidth:new V,halfHeight:new V};break}return t[e.id]=n,n}}}function vw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let _w=0;function yw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function xw(t){const e=new gw,n=vw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const r=new V,s=new Et,o=new Et;function a(c){let f=0,h=0,d=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,y=0,m=0,u=0,_=0,x=0,v=0,P=0,C=0,M=0;c.sort(yw);for(let T=0,S=c.length;T<S;T++){const I=c[T],U=I.color,L=I.intensity,W=I.distance,j=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)f+=U.r*L,h+=U.g*L,d+=U.b*L;else if(I.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(I.sh.coefficients[$],L);M++}else if(I.isDirectionalLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,N=n.get(I);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.directionalShadow[p]=N,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=I.shadow.matrix,_++}i.directional[p]=$,p++}else if(I.isSpotLight){const $=e.get(I);$.position.setFromMatrixPosition(I.matrixWorld),$.color.copy(U).multiplyScalar(L),$.distance=W,$.coneCos=Math.cos(I.angle),$.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),$.decay=I.decay,i.spot[y]=$;const ee=I.shadow;if(I.map&&(i.spotLightMap[P]=I.map,P++,ee.updateMatrices(I),I.castShadow&&C++),i.spotLightMatrix[y]=ee.matrix,I.castShadow){const N=n.get(I);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.spotShadow[y]=N,i.spotShadowMap[y]=j,v++}y++}else if(I.isRectAreaLight){const $=e.get(I);$.color.copy(U).multiplyScalar(L),$.halfWidth.set(I.width*.5,0,0),$.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=$,m++}else if(I.isPointLight){const $=e.get(I);if($.color.copy(I.color).multiplyScalar(I.intensity),$.distance=I.distance,$.decay=I.decay,I.castShadow){const ee=I.shadow,N=n.get(I);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,N.shadowCameraNear=ee.camera.near,N.shadowCameraFar=ee.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=I.shadow.matrix,x++}i.point[g]=$,g++}else if(I.isHemisphereLight){const $=e.get(I);$.skyColor.copy(I.color).multiplyScalar(L),$.groundColor.copy(I.groundColor).multiplyScalar(L),i.hemi[u]=$,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=d;const R=i.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==y||R.rectAreaLength!==m||R.hemiLength!==u||R.numDirectionalShadows!==_||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==P||R.numLightProbes!==M)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=u,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=v+P-C,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=M,R.directionalLength=p,R.pointLength=g,R.spotLength=y,R.rectAreaLength=m,R.hemiLength=u,R.numDirectionalShadows=_,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=P,R.numLightProbes=M,i.version=_w++)}function l(c,f){let h=0,d=0,p=0,g=0,y=0;const m=f.matrixWorldInverse;for(let u=0,_=c.length;u<_;u++){const x=c[u];if(x.isDirectionalLight){const v=i.directional[h];v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(x.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=i.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const v=i.hemi[y];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),y++}}}return{setup:a,setupView:l,state:i}}function nm(t){const e=new xw(t),n=[],i=[];function r(f){c.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function o(f){i.push(f)}function a(){e.setup(n)}function l(f){e.setupView(n,f)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Sw(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new nm(t),e.set(r,[a])):s>=o.length?(a=new nm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const Mw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ew=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tw(t,e,n){let i=new r_;const r=new nt,s=new nt,o=new yt,a=new KS({depthPacking:aS}),l=new ZS,c={},f=n.maxTextureSize,h={[Zi]:nn,[nn]:Zi,[ui]:ui},d=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Mw,fragmentShader:Ew}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Lr;g.setAttribute("position",new Qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Bn(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fv;let u=this.type;this.render=function(C,M,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const T=t.getRenderTarget(),S=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),U=t.state;U.setBlending(Xi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const L=u!==ai&&this.type===ai,W=u===ai&&this.type!==ai;for(let j=0,$=C.length;j<$;j++){const ee=C[j],N=ee.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",ee,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const Y=N.getFrameExtents();if(r.multiply(Y),s.copy(N.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/Y.x),r.x=s.x*Y.x,N.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/Y.y),r.y=s.y*Y.y,N.mapSize.y=s.y)),N.map===null||L===!0||W===!0){const ae=this.type!==ai?{minFilter:Vn,magFilter:Vn}:{};N.map!==null&&N.map.dispose(),N.map=new Pr(r.x,r.y,ae),N.map.texture.name=ee.name+".shadowMap",N.camera.updateProjectionMatrix()}t.setRenderTarget(N.map),t.clear();const Q=N.getViewportCount();for(let ae=0;ae<Q;ae++){const Se=N.getViewport(ae);o.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),U.viewport(o),N.updateMatrices(ee,ae),i=N.getFrustum(),v(M,R,N.camera,ee,this.type)}N.isPointLightShadow!==!0&&this.type===ai&&_(N,R),N.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(T,S,I)};function _(C,M){const R=e.update(y);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Pr(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,t.setRenderTarget(C.mapPass),t.clear(),t.renderBufferDirect(M,null,R,d,y,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,t.setRenderTarget(C.map),t.clear(),t.renderBufferDirect(M,null,R,p,y,null)}function x(C,M,R,T){let S=null;const I=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)S=I;else if(S=R.isPointLight===!0?l:a,t.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0||M.alphaToCoverage===!0){const U=S.uuid,L=M.uuid;let W=c[U];W===void 0&&(W={},c[U]=W);let j=W[L];j===void 0&&(j=S.clone(),W[L]=j,M.addEventListener("dispose",P)),S=j}if(S.visible=M.visible,S.wireframe=M.wireframe,T===ai?S.side=M.shadowSide!==null?M.shadowSide:M.side:S.side=M.shadowSide!==null?M.shadowSide:h[M.side],S.alphaMap=M.alphaMap,S.alphaTest=M.alphaToCoverage===!0?.5:M.alphaTest,S.map=M.map,S.clipShadows=M.clipShadows,S.clippingPlanes=M.clippingPlanes,S.clipIntersection=M.clipIntersection,S.displacementMap=M.displacementMap,S.displacementScale=M.displacementScale,S.displacementBias=M.displacementBias,S.wireframeLinewidth=M.wireframeLinewidth,S.linewidth=M.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=t.properties.get(S);U.light=R}return S}function v(C,M,R,T,S){if(C.visible===!1)return;if(C.layers.test(M.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===ai)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);const L=e.update(C),W=C.material;if(Array.isArray(W)){const j=L.groups;for(let $=0,ee=j.length;$<ee;$++){const N=j[$],Y=W[N.materialIndex];if(Y&&Y.visible){const Q=x(C,Y,T,S);C.onBeforeShadow(t,C,M,R,L,Q,N),t.renderBufferDirect(R,null,L,Q,C,N),C.onAfterShadow(t,C,M,R,L,Q,N)}}}else if(W.visible){const j=x(C,W,T,S);C.onBeforeShadow(t,C,M,R,L,j,null),t.renderBufferDirect(R,null,L,j,C,null),C.onAfterShadow(t,C,M,R,L,j,null)}}const U=C.children;for(let L=0,W=U.length;L<W;L++)v(U[L],M,R,T,S)}function P(C){C.target.removeEventListener("dispose",P);for(const R in c){const T=c[R],S=C.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const ww={[Yu]:Ku,[Zu]:ed,[Qu]:td,[ws]:Ju,[Ku]:Yu,[ed]:Zu,[td]:Qu,[Ju]:ws};function Cw(t,e){function n(){let F=!1;const de=new yt;let G=null;const Z=new yt(0,0,0,0);return{setMask:function(he){G!==he&&!F&&(t.colorMask(he,he,he,he),G=he)},setLocked:function(he){F=he},setClear:function(he,fe,Ne,pt,Ut){Ut===!0&&(he*=pt,fe*=pt,Ne*=pt),de.set(he,fe,Ne,pt),Z.equals(de)===!1&&(t.clearColor(he,fe,Ne,pt),Z.copy(de))},reset:function(){F=!1,G=null,Z.set(-1,0,0,0)}}}function i(){let F=!1,de=!1,G=null,Z=null,he=null;return{setReversed:function(fe){if(de!==fe){const Ne=e.get("EXT_clip_control");fe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),de=fe;const pt=he;he=null,this.setClear(pt)}},getReversed:function(){return de},setTest:function(fe){fe?oe(t.DEPTH_TEST):Ce(t.DEPTH_TEST)},setMask:function(fe){G!==fe&&!F&&(t.depthMask(fe),G=fe)},setFunc:function(fe){if(de&&(fe=ww[fe]),Z!==fe){switch(fe){case Yu:t.depthFunc(t.NEVER);break;case Ku:t.depthFunc(t.ALWAYS);break;case Zu:t.depthFunc(t.LESS);break;case ws:t.depthFunc(t.LEQUAL);break;case Qu:t.depthFunc(t.EQUAL);break;case Ju:t.depthFunc(t.GEQUAL);break;case ed:t.depthFunc(t.GREATER);break;case td:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Z=fe}},setLocked:function(fe){F=fe},setClear:function(fe){he!==fe&&(de&&(fe=1-fe),t.clearDepth(fe),he=fe)},reset:function(){F=!1,G=null,Z=null,he=null,de=!1}}}function r(){let F=!1,de=null,G=null,Z=null,he=null,fe=null,Ne=null,pt=null,Ut=null;return{setTest:function(Je){F||(Je?oe(t.STENCIL_TEST):Ce(t.STENCIL_TEST))},setMask:function(Je){de!==Je&&!F&&(t.stencilMask(Je),de=Je)},setFunc:function(Je,bn,ei){(G!==Je||Z!==bn||he!==ei)&&(t.stencilFunc(Je,bn,ei),G=Je,Z=bn,he=ei)},setOp:function(Je,bn,ei){(fe!==Je||Ne!==bn||pt!==ei)&&(t.stencilOp(Je,bn,ei),fe=Je,Ne=bn,pt=ei)},setLocked:function(Je){F=Je},setClear:function(Je){Ut!==Je&&(t.clearStencil(Je),Ut=Je)},reset:function(){F=!1,de=null,G=null,Z=null,he=null,fe=null,Ne=null,pt=null,Ut=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let f={},h={},d=new WeakMap,p=[],g=null,y=!1,m=null,u=null,_=null,x=null,v=null,P=null,C=null,M=new Qe(0,0,0),R=0,T=!1,S=null,I=null,U=null,L=null,W=null;const j=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ee=0;const N=t.getParameter(t.VERSION);N.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(N)[1]),$=ee>=1):N.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),$=ee>=2);let Y=null,Q={};const ae=t.getParameter(t.SCISSOR_BOX),Se=t.getParameter(t.VIEWPORT),qe=new yt().fromArray(ae),q=new yt().fromArray(Se);function se(F,de,G,Z){const he=new Uint8Array(4),fe=t.createTexture();t.bindTexture(F,fe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ne=0;Ne<G;Ne++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(de,0,t.RGBA,1,1,Z,0,t.RGBA,t.UNSIGNED_BYTE,he):t.texImage2D(de+Ne,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,he);return fe}const pe={};pe[t.TEXTURE_2D]=se(t.TEXTURE_2D,t.TEXTURE_2D,1),pe[t.TEXTURE_CUBE_MAP]=se(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[t.TEXTURE_2D_ARRAY]=se(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),pe[t.TEXTURE_3D]=se(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(t.DEPTH_TEST),o.setFunc(ws),Ge(!1),He(lp),oe(t.CULL_FACE),D(Xi);function oe(F){f[F]!==!0&&(t.enable(F),f[F]=!0)}function Ce(F){f[F]!==!1&&(t.disable(F),f[F]=!1)}function Ye(F,de){return h[F]!==de?(t.bindFramebuffer(F,de),h[F]=de,F===t.DRAW_FRAMEBUFFER&&(h[t.FRAMEBUFFER]=de),F===t.FRAMEBUFFER&&(h[t.DRAW_FRAMEBUFFER]=de),!0):!1}function Pe(F,de){let G=p,Z=!1;if(F){G=d.get(de),G===void 0&&(G=[],d.set(de,G));const he=F.textures;if(G.length!==he.length||G[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,Ne=he.length;fe<Ne;fe++)G[fe]=t.COLOR_ATTACHMENT0+fe;G.length=he.length,Z=!0}}else G[0]!==t.BACK&&(G[0]=t.BACK,Z=!0);Z&&t.drawBuffers(G)}function vt(F){return g!==F?(t.useProgram(F),g=F,!0):!1}const ut={[hr]:t.FUNC_ADD,[Lx]:t.FUNC_SUBTRACT,[Nx]:t.FUNC_REVERSE_SUBTRACT};ut[Ux]=t.MIN,ut[Fx]=t.MAX;const ze={[Ox]:t.ZERO,[kx]:t.ONE,[Bx]:t.SRC_COLOR,[Xu]:t.SRC_ALPHA,[jx]:t.SRC_ALPHA_SATURATE,[Gx]:t.DST_COLOR,[Hx]:t.DST_ALPHA,[zx]:t.ONE_MINUS_SRC_COLOR,[$u]:t.ONE_MINUS_SRC_ALPHA,[Wx]:t.ONE_MINUS_DST_COLOR,[Vx]:t.ONE_MINUS_DST_ALPHA,[qx]:t.CONSTANT_COLOR,[Xx]:t.ONE_MINUS_CONSTANT_COLOR,[$x]:t.CONSTANT_ALPHA,[Yx]:t.ONE_MINUS_CONSTANT_ALPHA};function D(F,de,G,Z,he,fe,Ne,pt,Ut,Je){if(F===Xi){y===!0&&(Ce(t.BLEND),y=!1);return}if(y===!1&&(oe(t.BLEND),y=!0),F!==Dx){if(F!==m||Je!==T){if((u!==hr||v!==hr)&&(t.blendEquation(t.FUNC_ADD),u=hr,v=hr),Je)switch(F){case gs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case cp:t.blendFunc(t.ONE,t.ONE);break;case up:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case dp:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case gs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case cp:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case up:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case dp:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}_=null,x=null,P=null,C=null,M.set(0,0,0),R=0,m=F,T=Je}return}he=he||de,fe=fe||G,Ne=Ne||Z,(de!==u||he!==v)&&(t.blendEquationSeparate(ut[de],ut[he]),u=de,v=he),(G!==_||Z!==x||fe!==P||Ne!==C)&&(t.blendFuncSeparate(ze[G],ze[Z],ze[fe],ze[Ne]),_=G,x=Z,P=fe,C=Ne),(pt.equals(M)===!1||Ut!==R)&&(t.blendColor(pt.r,pt.g,pt.b,Ut),M.copy(pt),R=Ut),m=F,T=!1}function gn(F,de){F.side===ui?Ce(t.CULL_FACE):oe(t.CULL_FACE);let G=F.side===nn;de&&(G=!G),Ge(G),F.blending===gs&&F.transparent===!1?D(Xi):D(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);const Z=F.stencilWrite;a.setTest(Z),Z&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),st(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?oe(t.SAMPLE_ALPHA_TO_COVERAGE):Ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(F){S!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),S=F)}function He(F){F!==Rx?(oe(t.CULL_FACE),F!==I&&(F===lp?t.cullFace(t.BACK):F===Px?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ce(t.CULL_FACE),I=F}function Ee(F){F!==U&&($&&t.lineWidth(F),U=F)}function st(F,de,G){F?(oe(t.POLYGON_OFFSET_FILL),(L!==de||W!==G)&&(t.polygonOffset(de,G),L=de,W=G)):Ce(t.POLYGON_OFFSET_FILL)}function Me(F){F?oe(t.SCISSOR_TEST):Ce(t.SCISSOR_TEST)}function A(F){F===void 0&&(F=t.TEXTURE0+j-1),Y!==F&&(t.activeTexture(F),Y=F)}function E(F,de,G){G===void 0&&(Y===null?G=t.TEXTURE0+j-1:G=Y);let Z=Q[G];Z===void 0&&(Z={type:void 0,texture:void 0},Q[G]=Z),(Z.type!==F||Z.texture!==de)&&(Y!==G&&(t.activeTexture(G),Y=G),t.bindTexture(F,de||pe[F]),Z.type=F,Z.texture=de)}function B(){const F=Q[Y];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function K(){try{t.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function te(){try{t.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{t.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xe(){try{t.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ue(){try{t.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ae(){try{t.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function be(){try{t.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{t.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{t.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Re(){try{t.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function De(F){qe.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),qe.copy(F))}function _e(F){q.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),q.copy(F))}function Ve(F,de){let G=c.get(de);G===void 0&&(G=new WeakMap,c.set(de,G));let Z=G.get(F);Z===void 0&&(Z=t.getUniformBlockIndex(de,F.name),G.set(F,Z))}function Fe(F,de){const Z=c.get(de).get(F);l.get(de)!==Z&&(t.uniformBlockBinding(de,Z,F.__bindingPointIndex),l.set(de,Z))}function it(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),f={},Y=null,Q={},h={},d=new WeakMap,p=[],g=null,y=!1,m=null,u=null,_=null,x=null,v=null,P=null,C=null,M=new Qe(0,0,0),R=0,T=!1,S=null,I=null,U=null,L=null,W=null,qe.set(0,0,t.canvas.width,t.canvas.height),q.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:oe,disable:Ce,bindFramebuffer:Ye,drawBuffers:Pe,useProgram:vt,setBlending:D,setMaterial:gn,setFlipSided:Ge,setCullFace:He,setLineWidth:Ee,setPolygonOffset:st,setScissorTest:Me,activeTexture:A,bindTexture:E,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:te,texImage2D:ve,texImage3D:Re,updateUBOMapping:Ve,uniformBlockBinding:Fe,texStorage2D:be,texStorage3D:ie,texSubImage2D:X,texSubImage3D:xe,compressedTexSubImage2D:ue,compressedTexSubImage3D:Ae,scissor:De,viewport:_e,reset:it}}function Aw(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new nt,f=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return p?new OffscreenCanvas(A,E):Tl("canvas")}function y(A,E,B){let K=1;const te=Me(A);if((te.width>B||te.height>B)&&(K=B/Math.max(te.width,te.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(K*te.width),xe=Math.floor(K*te.height);h===void 0&&(h=g(X,xe));const ue=E?g(X,xe):h;return ue.width=X,ue.height=xe,ue.getContext("2d").drawImage(A,0,0,X,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+X+"x"+xe+")."),ue}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function m(A){return A.generateMipmaps}function u(A){t.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(A,E,B,K,te=!1){if(A!==null){if(t[A]!==void 0)return t[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=E;if(E===t.RED&&(B===t.FLOAT&&(X=t.R32F),B===t.HALF_FLOAT&&(X=t.R16F),B===t.UNSIGNED_BYTE&&(X=t.R8)),E===t.RED_INTEGER&&(B===t.UNSIGNED_BYTE&&(X=t.R8UI),B===t.UNSIGNED_SHORT&&(X=t.R16UI),B===t.UNSIGNED_INT&&(X=t.R32UI),B===t.BYTE&&(X=t.R8I),B===t.SHORT&&(X=t.R16I),B===t.INT&&(X=t.R32I)),E===t.RG&&(B===t.FLOAT&&(X=t.RG32F),B===t.HALF_FLOAT&&(X=t.RG16F),B===t.UNSIGNED_BYTE&&(X=t.RG8)),E===t.RG_INTEGER&&(B===t.UNSIGNED_BYTE&&(X=t.RG8UI),B===t.UNSIGNED_SHORT&&(X=t.RG16UI),B===t.UNSIGNED_INT&&(X=t.RG32UI),B===t.BYTE&&(X=t.RG8I),B===t.SHORT&&(X=t.RG16I),B===t.INT&&(X=t.RG32I)),E===t.RGB_INTEGER&&(B===t.UNSIGNED_BYTE&&(X=t.RGB8UI),B===t.UNSIGNED_SHORT&&(X=t.RGB16UI),B===t.UNSIGNED_INT&&(X=t.RGB32UI),B===t.BYTE&&(X=t.RGB8I),B===t.SHORT&&(X=t.RGB16I),B===t.INT&&(X=t.RGB32I)),E===t.RGBA_INTEGER&&(B===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),B===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),B===t.UNSIGNED_INT&&(X=t.RGBA32UI),B===t.BYTE&&(X=t.RGBA8I),B===t.SHORT&&(X=t.RGBA16I),B===t.INT&&(X=t.RGBA32I)),E===t.RGB&&B===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),E===t.RGBA){const xe=te?Ml:$e.getTransfer(K);B===t.FLOAT&&(X=t.RGBA32F),B===t.HALF_FLOAT&&(X=t.RGBA16F),B===t.UNSIGNED_BYTE&&(X=xe===tt?t.SRGB8_ALPHA8:t.RGBA8),B===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),B===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function v(A,E){let B;return A?E===null||E===Rr||E===Ro?B=t.DEPTH24_STENCIL8:E===hi?B=t.DEPTH32F_STENCIL8:E===bo&&(B=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Rr||E===Ro?B=t.DEPTH_COMPONENT24:E===hi?B=t.DEPTH_COMPONENT32F:E===bo&&(B=t.DEPTH_COMPONENT16),B}function P(A,E){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Vn&&A.minFilter!==$n?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function C(A){const E=A.target;E.removeEventListener("dispose",C),R(E),E.isVideoTexture&&f.delete(E)}function M(A){const E=A.target;E.removeEventListener("dispose",M),S(E)}function R(A){const E=i.get(A);if(E.__webglInit===void 0)return;const B=A.source,K=d.get(B);if(K){const te=K[E.__cacheKey];te.usedTimes--,te.usedTimes===0&&T(A),Object.keys(K).length===0&&d.delete(B)}i.remove(A)}function T(A){const E=i.get(A);t.deleteTexture(E.__webglTexture);const B=A.source,K=d.get(B);delete K[E.__cacheKey],o.memory.textures--}function S(A){const E=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(E.__webglFramebuffer[K]))for(let te=0;te<E.__webglFramebuffer[K].length;te++)t.deleteFramebuffer(E.__webglFramebuffer[K][te]);else t.deleteFramebuffer(E.__webglFramebuffer[K]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[K])}else{if(Array.isArray(E.__webglFramebuffer))for(let K=0;K<E.__webglFramebuffer.length;K++)t.deleteFramebuffer(E.__webglFramebuffer[K]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let K=0;K<E.__webglColorRenderbuffer.length;K++)E.__webglColorRenderbuffer[K]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[K]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const B=A.textures;for(let K=0,te=B.length;K<te;K++){const X=i.get(B[K]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),o.memory.textures--),i.remove(B[K])}i.remove(A)}let I=0;function U(){I=0}function L(){const A=I;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),I+=1,A}function W(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function j(A,E){const B=i.get(A);if(A.isVideoTexture&&Ee(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,A,E);return}}n.bindTexture(t.TEXTURE_2D,B.__webglTexture,t.TEXTURE0+E)}function $(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,B.__webglTexture,t.TEXTURE0+E)}function ee(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,E);return}n.bindTexture(t.TEXTURE_3D,B.__webglTexture,t.TEXTURE0+E)}function N(A,E){const B=i.get(A);if(A.version>0&&B.__version!==A.version){se(B,A,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,B.__webglTexture,t.TEXTURE0+E)}const Y={[rd]:t.REPEAT,[yr]:t.CLAMP_TO_EDGE,[sd]:t.MIRRORED_REPEAT},Q={[Vn]:t.NEAREST,[sS]:t.NEAREST_MIPMAP_NEAREST,[la]:t.NEAREST_MIPMAP_LINEAR,[$n]:t.LINEAR,[Tc]:t.LINEAR_MIPMAP_NEAREST,[xr]:t.LINEAR_MIPMAP_LINEAR},ae={[uS]:t.NEVER,[gS]:t.ALWAYS,[dS]:t.LESS,[Xv]:t.LEQUAL,[fS]:t.EQUAL,[mS]:t.GEQUAL,[hS]:t.GREATER,[pS]:t.NOTEQUAL};function Se(A,E){if(E.type===hi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===$n||E.magFilter===Tc||E.magFilter===la||E.magFilter===xr||E.minFilter===$n||E.minFilter===Tc||E.minFilter===la||E.minFilter===xr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,Y[E.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,Y[E.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,Y[E.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,Q[E.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,Q[E.minFilter]),E.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Vn||E.minFilter!==la&&E.minFilter!==xr||E.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function qe(A,E){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",C));const K=E.source;let te=d.get(K);te===void 0&&(te={},d.set(K,te));const X=W(E);if(X!==A.__cacheKey){te[X]===void 0&&(te[X]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,B=!0),te[X].usedTimes++;const xe=te[A.__cacheKey];xe!==void 0&&(te[A.__cacheKey].usedTimes--,xe.usedTimes===0&&T(E)),A.__cacheKey=X,A.__webglTexture=te[X].texture}return B}function q(A,E,B){let K=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(K=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(K=t.TEXTURE_3D);const te=qe(A,E),X=E.source;n.bindTexture(K,A.__webglTexture,t.TEXTURE0+B);const xe=i.get(X);if(X.version!==xe.__version||te===!0){n.activeTexture(t.TEXTURE0+B);const ue=$e.getPrimaries($e.workingColorSpace),Ae=E.colorSpace===Fi?null:$e.getPrimaries(E.colorSpace),be=E.colorSpace===Fi||ue===Ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let ie=y(E.image,!1,r.maxTextureSize);ie=st(E,ie);const ve=s.convert(E.format,E.colorSpace),Re=s.convert(E.type);let De=x(E.internalFormat,ve,Re,E.colorSpace,E.isVideoTexture);Se(K,E);let _e;const Ve=E.mipmaps,Fe=E.isVideoTexture!==!0,it=xe.__version===void 0||te===!0,F=X.dataReady,de=P(E,ie);if(E.isDepthTexture)De=v(E.format===Io,E.type),it&&(Fe?n.texStorage2D(t.TEXTURE_2D,1,De,ie.width,ie.height):n.texImage2D(t.TEXTURE_2D,0,De,ie.width,ie.height,0,ve,Re,null));else if(E.isDataTexture)if(Ve.length>0){Fe&&it&&n.texStorage2D(t.TEXTURE_2D,de,De,Ve[0].width,Ve[0].height);for(let G=0,Z=Ve.length;G<Z;G++)_e=Ve[G],Fe?F&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,Re,_e.data):n.texImage2D(t.TEXTURE_2D,G,De,_e.width,_e.height,0,ve,Re,_e.data);E.generateMipmaps=!1}else Fe?(it&&n.texStorage2D(t.TEXTURE_2D,de,De,ie.width,ie.height),F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie.width,ie.height,ve,Re,ie.data)):n.texImage2D(t.TEXTURE_2D,0,De,ie.width,ie.height,0,ve,Re,ie.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Fe&&it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,De,Ve[0].width,Ve[0].height,ie.depth);for(let G=0,Z=Ve.length;G<Z;G++)if(_e=Ve[G],E.format!==kn)if(ve!==null)if(Fe){if(F)if(E.layerUpdates.size>0){const he=Dp(_e.width,_e.height,E.format,E.type);for(const fe of E.layerUpdates){const Ne=_e.data.subarray(fe*he/_e.data.BYTES_PER_ELEMENT,(fe+1)*he/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,fe,_e.width,_e.height,1,ve,Ne)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,ie.depth,ve,_e.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,G,De,_e.width,_e.height,ie.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,ie.depth,ve,Re,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,G,De,_e.width,_e.height,ie.depth,0,ve,Re,_e.data)}else{Fe&&it&&n.texStorage2D(t.TEXTURE_2D,de,De,Ve[0].width,Ve[0].height);for(let G=0,Z=Ve.length;G<Z;G++)_e=Ve[G],E.format!==kn?ve!==null?Fe?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,G,De,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?F&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,ve,Re,_e.data):n.texImage2D(t.TEXTURE_2D,G,De,_e.width,_e.height,0,ve,Re,_e.data)}else if(E.isDataArrayTexture)if(Fe){if(it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,De,ie.width,ie.height,ie.depth),F)if(E.layerUpdates.size>0){const G=Dp(ie.width,ie.height,E.format,E.type);for(const Z of E.layerUpdates){const he=ie.data.subarray(Z*G/ie.data.BYTES_PER_ELEMENT,(Z+1)*G/ie.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,ie.width,ie.height,1,ve,Re,he)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,ve,Re,ie.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,De,ie.width,ie.height,ie.depth,0,ve,Re,ie.data);else if(E.isData3DTexture)Fe?(it&&n.texStorage3D(t.TEXTURE_3D,de,De,ie.width,ie.height,ie.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,ve,Re,ie.data)):n.texImage3D(t.TEXTURE_3D,0,De,ie.width,ie.height,ie.depth,0,ve,Re,ie.data);else if(E.isFramebufferTexture){if(it)if(Fe)n.texStorage2D(t.TEXTURE_2D,de,De,ie.width,ie.height);else{let G=ie.width,Z=ie.height;for(let he=0;he<de;he++)n.texImage2D(t.TEXTURE_2D,he,De,G,Z,0,ve,Re,null),G>>=1,Z>>=1}}else if(Ve.length>0){if(Fe&&it){const G=Me(Ve[0]);n.texStorage2D(t.TEXTURE_2D,de,De,G.width,G.height)}for(let G=0,Z=Ve.length;G<Z;G++)_e=Ve[G],Fe?F&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,ve,Re,_e):n.texImage2D(t.TEXTURE_2D,G,De,ve,Re,_e);E.generateMipmaps=!1}else if(Fe){if(it){const G=Me(ie);n.texStorage2D(t.TEXTURE_2D,de,De,G.width,G.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ve,Re,ie)}else n.texImage2D(t.TEXTURE_2D,0,De,ve,Re,ie);m(E)&&u(K),xe.__version=X.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function se(A,E,B){if(E.image.length!==6)return;const K=qe(A,E),te=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+B);const X=i.get(te);if(te.version!==X.__version||K===!0){n.activeTexture(t.TEXTURE0+B);const xe=$e.getPrimaries($e.workingColorSpace),ue=E.colorSpace===Fi?null:$e.getPrimaries(E.colorSpace),Ae=E.colorSpace===Fi||xe===ue?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const be=E.isCompressedTexture||E.image[0].isCompressedTexture,ie=E.image[0]&&E.image[0].isDataTexture,ve=[];for(let Z=0;Z<6;Z++)!be&&!ie?ve[Z]=y(E.image[Z],!0,r.maxCubemapSize):ve[Z]=ie?E.image[Z].image:E.image[Z],ve[Z]=st(E,ve[Z]);const Re=ve[0],De=s.convert(E.format,E.colorSpace),_e=s.convert(E.type),Ve=x(E.internalFormat,De,_e,E.colorSpace),Fe=E.isVideoTexture!==!0,it=X.__version===void 0||K===!0,F=te.dataReady;let de=P(E,Re);Se(t.TEXTURE_CUBE_MAP,E);let G;if(be){Fe&&it&&n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ve,Re.width,Re.height);for(let Z=0;Z<6;Z++){G=ve[Z].mipmaps;for(let he=0;he<G.length;he++){const fe=G[he];E.format!==kn?De!==null?Fe?F&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,fe.width,fe.height,De,fe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,Ve,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,0,0,fe.width,fe.height,De,_e,fe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he,Ve,fe.width,fe.height,0,De,_e,fe.data)}}}else{if(G=E.mipmaps,Fe&&it){G.length>0&&de++;const Z=Me(ve[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ve,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(ie){Fe?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ve[Z].width,ve[Z].height,De,_e,ve[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,ve[Z].width,ve[Z].height,0,De,_e,ve[Z].data);for(let he=0;he<G.length;he++){const Ne=G[he].image[Z].image;Fe?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,Ne.width,Ne.height,De,_e,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,Ve,Ne.width,Ne.height,0,De,_e,Ne.data)}}else{Fe?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,De,_e,ve[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ve,De,_e,ve[Z]);for(let he=0;he<G.length;he++){const fe=G[he];Fe?F&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,0,0,De,_e,fe.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,he+1,Ve,De,_e,fe.image[Z])}}}m(E)&&u(t.TEXTURE_CUBE_MAP),X.__version=te.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function pe(A,E,B,K,te,X){const xe=s.convert(B.format,B.colorSpace),ue=s.convert(B.type),Ae=x(B.internalFormat,xe,ue,B.colorSpace),be=i.get(E),ie=i.get(B);if(ie.__renderTarget=E,!be.__hasExternalTextures){const ve=Math.max(1,E.width>>X),Re=Math.max(1,E.height>>X);te===t.TEXTURE_3D||te===t.TEXTURE_2D_ARRAY?n.texImage3D(te,X,Ae,ve,Re,E.depth,0,xe,ue,null):n.texImage2D(te,X,Ae,ve,Re,0,xe,ue,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),He(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,te,ie.__webglTexture,0,Ge(E)):(te===t.TEXTURE_2D||te>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,K,te,ie.__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function oe(A,E,B){if(t.bindRenderbuffer(t.RENDERBUFFER,A),E.depthBuffer){const K=E.depthTexture,te=K&&K.isDepthTexture?K.type:null,X=v(E.stencilBuffer,te),xe=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ue=Ge(E);He(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ue,X,E.width,E.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,ue,X,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,X,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,xe,t.RENDERBUFFER,A)}else{const K=E.textures;for(let te=0;te<K.length;te++){const X=K[te],xe=s.convert(X.format,X.colorSpace),ue=s.convert(X.type),Ae=x(X.internalFormat,xe,ue,X.colorSpace),be=Ge(E);B&&He(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,be,Ae,E.width,E.height):He(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,be,Ae,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,Ae,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ce(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(E.depthTexture);K.__renderTarget=E,(!K.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),j(E.depthTexture,0);const te=K.__webglTexture,X=Ge(E);if(E.depthTexture.format===Po)He(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,te,0);else if(E.depthTexture.format===Io)He(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0,X):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Ye(A){const E=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),K){const te=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,K.removeEventListener("dispose",te)};K.addEventListener("dispose",te),E.__depthDisposeCallback=te}E.__boundDepthTexture=K}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const K=A.texture.mipmaps;K&&K.length>0?Ce(E.__webglFramebuffer[0],A):Ce(E.__webglFramebuffer,A)}else if(B){E.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[K]),E.__webglDepthbuffer[K]===void 0)E.__webglDepthbuffer[K]=t.createRenderbuffer(),oe(E.__webglDepthbuffer[K],A,!1);else{const te=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=E.__webglDepthbuffer[K];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,te,t.RENDERBUFFER,X)}}else{const K=A.texture.mipmaps;if(K&&K.length>0?n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),oe(E.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,te,t.RENDERBUFFER,X)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Pe(A,E,B){const K=i.get(A);E!==void 0&&pe(K.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),B!==void 0&&Ye(A)}function vt(A){const E=A.texture,B=i.get(A),K=i.get(E);A.addEventListener("dispose",M);const te=A.textures,X=A.isWebGLCubeRenderTarget===!0,xe=te.length>1;if(xe||(K.__webglTexture===void 0&&(K.__webglTexture=t.createTexture()),K.__version=E.version,o.memory.textures++),X){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let Ae=0;Ae<E.mipmaps.length;Ae++)B.__webglFramebuffer[ue][Ae]=t.createFramebuffer()}else B.__webglFramebuffer[ue]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<E.mipmaps.length;ue++)B.__webglFramebuffer[ue]=t.createFramebuffer()}else B.__webglFramebuffer=t.createFramebuffer();if(xe)for(let ue=0,Ae=te.length;ue<Ae;ue++){const be=i.get(te[ue]);be.__webglTexture===void 0&&(be.__webglTexture=t.createTexture(),o.memory.textures++)}if(A.samples>0&&He(A)===!1){B.__webglMultisampledFramebuffer=t.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ue=0;ue<te.length;ue++){const Ae=te[ue];B.__webglColorRenderbuffer[ue]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,B.__webglColorRenderbuffer[ue]);const be=s.convert(Ae.format,Ae.colorSpace),ie=s.convert(Ae.type),ve=x(Ae.internalFormat,be,ie,Ae.colorSpace,A.isXRRenderTarget===!0),Re=Ge(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,Re,ve,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,B.__webglColorRenderbuffer[ue])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=t.createRenderbuffer(),oe(B.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),Se(t.TEXTURE_CUBE_MAP,E);for(let ue=0;ue<6;ue++)if(E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)pe(B.__webglFramebuffer[ue][Ae],A,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Ae);else pe(B.__webglFramebuffer[ue],A,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(E)&&u(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(xe){for(let ue=0,Ae=te.length;ue<Ae;ue++){const be=te[ue],ie=i.get(be);n.bindTexture(t.TEXTURE_2D,ie.__webglTexture),Se(t.TEXTURE_2D,be),pe(B.__webglFramebuffer,A,be,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,0),m(be)&&u(t.TEXTURE_2D)}n.unbindTexture()}else{let ue=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ue=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ue,K.__webglTexture),Se(ue,E),E.mipmaps&&E.mipmaps.length>0)for(let Ae=0;Ae<E.mipmaps.length;Ae++)pe(B.__webglFramebuffer[Ae],A,E,t.COLOR_ATTACHMENT0,ue,Ae);else pe(B.__webglFramebuffer,A,E,t.COLOR_ATTACHMENT0,ue,0);m(E)&&u(ue),n.unbindTexture()}A.depthBuffer&&Ye(A)}function ut(A){const E=A.textures;for(let B=0,K=E.length;B<K;B++){const te=E[B];if(m(te)){const X=_(A),xe=i.get(te).__webglTexture;n.bindTexture(X,xe),u(X),n.unbindTexture()}}}const ze=[],D=[];function gn(A){if(A.samples>0){if(He(A)===!1){const E=A.textures,B=A.width,K=A.height;let te=t.COLOR_BUFFER_BIT;const X=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,xe=i.get(A),ue=E.length>1;if(ue)for(let be=0;be<E.length;be++)n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer);const Ae=A.texture.mipmaps;Ae&&Ae.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let be=0;be<E.length;be++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=t.STENCIL_BUFFER_BIT)),ue){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,xe.__webglColorRenderbuffer[be]);const ie=i.get(E[be]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ie,0)}t.blitFramebuffer(0,0,B,K,0,0,B,K,te,t.NEAREST),l===!0&&(ze.length=0,D.length=0,ze.push(t.COLOR_ATTACHMENT0+be),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ze.push(X),D.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,D)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ze))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ue)for(let be=0;be<E.length;be++){n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.RENDERBUFFER,xe.__webglColorRenderbuffer[be]);const ie=i.get(E[be]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,xe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.TEXTURE_2D,ie,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const E=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function Ge(A){return Math.min(r.maxSamples,A.samples)}function He(A){const E=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ee(A){const E=o.render.frame;f.get(A)!==E&&(f.set(A,E),A.update())}function st(A,E){const B=A.colorSpace,K=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==bs&&B!==Fi&&($e.getTransfer(B)===tt?(K!==kn||te!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}function Me(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=U,this.setTexture2D=j,this.setTexture2DArray=$,this.setTexture3D=ee,this.setTextureCube=N,this.rebindTextures=Pe,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=gn,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=He}function bw(t,e){function n(i,r=Fi){let s;const o=$e.getTransfer(r);if(i===Mi)return t.UNSIGNED_BYTE;if(i===Uf)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Ff)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Hv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Bv)return t.BYTE;if(i===zv)return t.SHORT;if(i===bo)return t.UNSIGNED_SHORT;if(i===Nf)return t.INT;if(i===Rr)return t.UNSIGNED_INT;if(i===hi)return t.FLOAT;if(i===Oo)return t.HALF_FLOAT;if(i===Vv)return t.ALPHA;if(i===Gv)return t.RGB;if(i===kn)return t.RGBA;if(i===Po)return t.DEPTH_COMPONENT;if(i===Io)return t.DEPTH_STENCIL;if(i===Wv)return t.RED;if(i===Of)return t.RED_INTEGER;if(i===jv)return t.RG;if(i===kf)return t.RG_INTEGER;if(i===Bf)return t.RGBA_INTEGER;if(i===Va||i===Ga||i===Wa||i===ja)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Va)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ga)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Va)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ga)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wa)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ja)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===od||i===ad||i===ld||i===cd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===od)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ad)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ld)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===cd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ud||i===dd||i===fd)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ud||i===dd)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===fd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===hd||i===pd||i===md||i===gd||i===vd||i===_d||i===yd||i===xd||i===Sd||i===Md||i===Ed||i===Td||i===wd||i===Cd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===hd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===pd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===md)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===gd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_d)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Md)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ed)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Td)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cd)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qa||i===Ad||i===bd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===qa)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ad)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qv||i===Rd||i===Pd||i===Id)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===qa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Id)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ro?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const Rw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Iw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new rn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!==i.depthNear||n.depthFar!==i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Jn({vertexShader:Rw,fragmentShader:Pw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Bn(new Ps(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dw extends Ns{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,f=null,h=null,d=null,p=null,g=null;const y=new Iw,m=n.getContextAttributes();let u=null,_=null;const x=[],v=[],P=new nt;let C=null;const M=new En;M.viewport=new yt;const R=new En;R.viewport=new yt;const T=[M,R],S=new JS;let I=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let se=x[q];return se===void 0&&(se=new qc,x[q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(q){let se=x[q];return se===void 0&&(se=new qc,x[q]=se),se.getGripSpace()},this.getHand=function(q){let se=x[q];return se===void 0&&(se=new qc,x[q]=se),se.getHandSpace()};function L(q){const se=v.indexOf(q.inputSource);if(se===-1)return;const pe=x[se];pe!==void 0&&(pe.update(q.inputSource,q.frame,c||o),pe.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){r.removeEventListener("select",L),r.removeEventListener("selectstart",L),r.removeEventListener("selectend",L),r.removeEventListener("squeeze",L),r.removeEventListener("squeezestart",L),r.removeEventListener("squeezeend",L),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",j);for(let q=0;q<x.length;q++){const se=v[q];se!==null&&(v[q]=null,x[q].disconnect(se))}I=null,U=null,y.reset(),e.setRenderTarget(u),p=null,d=null,h=null,r=null,_=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(u=e.getRenderTarget(),r.addEventListener("select",L),r.addEventListener("selectstart",L),r.addEventListener("selectend",L),r.addEventListener("squeeze",L),r.addEventListener("squeezestart",L),r.addEventListener("squeezeend",L),r.addEventListener("end",W),r.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await n.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(P),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,oe=null,Ce=null;m.depth&&(Ce=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,pe=m.stencil?Io:Po,oe=m.stencil?Ro:Rr);const Ye={colorFormat:n.RGBA8,depthFormat:Ce,scaleFactor:s};h=new XRWebGLBinding(r,n),d=h.createProjectionLayer(Ye),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new Pr(d.textureWidth,d.textureHeight,{format:kn,type:Mi,depthTexture:new s_(d.textureWidth,d.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,pe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Pr(p.framebufferWidth,p.framebufferHeight,{format:kn,type:Mi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qe.setContext(r),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function j(q){for(let se=0;se<q.removed.length;se++){const pe=q.removed[se],oe=v.indexOf(pe);oe>=0&&(v[oe]=null,x[oe].disconnect(pe))}for(let se=0;se<q.added.length;se++){const pe=q.added[se];let oe=v.indexOf(pe);if(oe===-1){for(let Ye=0;Ye<x.length;Ye++)if(Ye>=v.length){v.push(pe),oe=Ye;break}else if(v[Ye]===null){v[Ye]=pe,oe=Ye;break}if(oe===-1)break}const Ce=x[oe];Ce&&Ce.connect(pe)}}const $=new V,ee=new V;function N(q,se,pe){$.setFromMatrixPosition(se.matrixWorld),ee.setFromMatrixPosition(pe.matrixWorld);const oe=$.distanceTo(ee),Ce=se.projectionMatrix.elements,Ye=pe.projectionMatrix.elements,Pe=Ce[14]/(Ce[10]-1),vt=Ce[14]/(Ce[10]+1),ut=(Ce[9]+1)/Ce[5],ze=(Ce[9]-1)/Ce[5],D=(Ce[8]-1)/Ce[0],gn=(Ye[8]+1)/Ye[0],Ge=Pe*D,He=Pe*gn,Ee=oe/(-D+gn),st=Ee*-D;if(se.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(st),q.translateZ(Ee),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),Ce[10]===-1)q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Me=Pe+Ee,A=vt+Ee,E=Ge-st,B=He+(oe-st),K=ut*vt/A*Me,te=ze*vt/A*Me;q.projectionMatrix.makePerspective(E,B,K,te,Me,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Y(q,se){se===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(se.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let se=q.near,pe=q.far;y.texture!==null&&(y.depthNear>0&&(se=y.depthNear),y.depthFar>0&&(pe=y.depthFar)),S.near=R.near=M.near=se,S.far=R.far=M.far=pe,(I!==S.near||U!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),I=S.near,U=S.far),M.layers.mask=q.layers.mask|2,R.layers.mask=q.layers.mask|4,S.layers.mask=M.layers.mask|R.layers.mask;const oe=q.parent,Ce=S.cameras;Y(S,oe);for(let Ye=0;Ye<Ce.length;Ye++)Y(Ce[Ye],oe);Ce.length===2?N(S,M,R):S.projectionMatrix.copy(M.projectionMatrix),Q(q,S,oe)};function Q(q,se,pe){pe===null?q.matrix.copy(se.matrixWorld):(q.matrix.copy(pe.matrixWorld),q.matrix.invert(),q.matrix.multiply(se.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Dd*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(S)};let ae=null;function Se(q,se){if(f=se.getViewerPose(c||o),g=se,f!==null){const pe=f.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let oe=!1;pe.length!==S.cameras.length&&(S.cameras.length=0,oe=!0);for(let Pe=0;Pe<pe.length;Pe++){const vt=pe[Pe];let ut=null;if(p!==null)ut=p.getViewport(vt);else{const D=h.getViewSubImage(d,vt);ut=D.viewport,Pe===0&&(e.setRenderTargetTextures(_,D.colorTexture,D.depthStencilTexture),e.setRenderTarget(_))}let ze=T[Pe];ze===void 0&&(ze=new En,ze.layers.enable(Pe),ze.viewport=new yt,T[Pe]=ze),ze.matrix.fromArray(vt.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(vt.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(ut.x,ut.y,ut.width,ut.height),Pe===0&&(S.matrix.copy(ze.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),oe===!0&&S.cameras.push(ze)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const Pe=h.getDepthInformation(pe[0]);Pe&&Pe.isValid&&Pe.texture&&y.init(e,Pe,r.renderState)}}for(let pe=0;pe<x.length;pe++){const oe=v[pe],Ce=x[pe];oe!==null&&Ce!==void 0&&Ce.update(oe,se,c||o)}ae&&ae(q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const qe=new o_;qe.setAnimationLoop(Se),this.setAnimationLoop=function(q){ae=q},this.dispose=function(){}}}const lr=new Ei,Lw=new Et;function Nw(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,t_(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,_,x,v){u.isMeshBasicMaterial||u.isMeshLambertMaterial?s(m,u):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),f(m,u)):u.isMeshStandardMaterial?(s(m,u),d(m,u),u.isMeshPhysicalMaterial&&p(m,u,v)):u.isMeshMatcapMaterial?(s(m,u),g(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),y(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(o(m,u),u.isLineDashedMaterial&&a(m,u)):u.isPointsMaterial?l(m,u,_,x):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===nn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===nn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const _=e.get(u),x=_.envMap,v=_.envMapRotation;x&&(m.envMap.value=x,lr.copy(v),lr.x*=-1,lr.y*=-1,lr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(lr.y*=-1,lr.z*=-1),m.envMapRotation.value.setFromMatrix4(Lw.makeRotationFromEuler(lr)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function o(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function a(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,_,x){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*_,m.scale.value=x*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function f(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function d(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,_){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===nn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,u){u.matcap&&(m.matcap.value=u.matcap)}function y(m,u){const _=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Uw(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){const v=x.program;i.uniformBlockBinding(_,v)}function c(_,x){let v=r[_.id];v===void 0&&(g(_),v=f(_),r[_.id]=v,_.addEventListener("dispose",m));const P=x.program;i.updateUBOMapping(_,P);const C=e.render.frame;s[_.id]!==C&&(d(_),s[_.id]=C)}function f(_){const x=h();_.__bindingPointIndex=x;const v=t.createBuffer(),P=_.__size,C=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,v),t.bufferData(t.UNIFORM_BUFFER,P,C),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,v),v}function h(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const x=r[_.id],v=_.uniforms,P=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let C=0,M=v.length;C<M;C++){const R=Array.isArray(v[C])?v[C]:[v[C]];for(let T=0,S=R.length;T<S;T++){const I=R[T];if(p(I,C,T,P)===!0){const U=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let W=0;for(let j=0;j<L.length;j++){const $=L[j],ee=y($);typeof $=="number"||typeof $=="boolean"?(I.__data[0]=$,t.bufferSubData(t.UNIFORM_BUFFER,U+W,I.__data)):$.isMatrix3?(I.__data[0]=$.elements[0],I.__data[1]=$.elements[1],I.__data[2]=$.elements[2],I.__data[3]=0,I.__data[4]=$.elements[3],I.__data[5]=$.elements[4],I.__data[6]=$.elements[5],I.__data[7]=0,I.__data[8]=$.elements[6],I.__data[9]=$.elements[7],I.__data[10]=$.elements[8],I.__data[11]=0):($.toArray(I.__data,W),W+=ee.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,U,I.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,x,v,P){const C=_.value,M=x+"_"+v;if(P[M]===void 0)return typeof C=="number"||typeof C=="boolean"?P[M]=C:P[M]=C.clone(),!0;{const R=P[M];if(typeof C=="number"||typeof C=="boolean"){if(R!==C)return P[M]=C,!0}else if(R.equals(C)===!1)return R.copy(C),!0}return!1}function g(_){const x=_.uniforms;let v=0;const P=16;for(let M=0,R=x.length;M<R;M++){const T=Array.isArray(x[M])?x[M]:[x[M]];for(let S=0,I=T.length;S<I;S++){const U=T[S],L=Array.isArray(U.value)?U.value:[U.value];for(let W=0,j=L.length;W<j;W++){const $=L[W],ee=y($),N=v%P,Y=N%ee.boundary,Q=N+Y;v+=Y,Q!==0&&P-Q<ee.storage&&(v+=P-Q),U.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=ee.storage}}}const C=v%P;return C>0&&(v+=P-C),_.__size=v,_.__cache={},this}function y(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){const x=_.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function u(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:u}}class Fw{constructor(e={}){const{canvas:n=_S(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),y=new Int32Array(4);let m=null,u=null;const _=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let P=!1;this._outputColorSpace=xn;let C=0,M=0,R=null,T=-1,S=null;const I=new yt,U=new yt;let L=null;const W=new Qe(0);let j=0,$=n.width,ee=n.height,N=1,Y=null,Q=null;const ae=new yt(0,0,$,ee),Se=new yt(0,0,$,ee);let qe=!1;const q=new r_;let se=!1,pe=!1;const oe=new Et,Ce=new Et,Ye=new V,Pe=new yt,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ut=!1;function ze(){return R===null?N:1}let D=i;function gn(w,O){return n.getContext(w,O)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Lf}`),n.addEventListener("webglcontextlost",Z,!1),n.addEventListener("webglcontextrestored",he,!1),n.addEventListener("webglcontextcreationerror",fe,!1),D===null){const O="webgl2";if(D=gn(O,w),D===null)throw gn(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ge,He,Ee,st,Me,A,E,B,K,te,X,xe,ue,Ae,be,ie,ve,Re,De,_e,Ve,Fe,it,F;function de(){Ge=new q1(D),Ge.init(),Fe=new bw(D,Ge),He=new B1(D,Ge,e,Fe),Ee=new Cw(D,Ge),He.reverseDepthBuffer&&d&&Ee.buffers.depth.setReversed(!0),st=new Y1(D),Me=new hw,A=new Aw(D,Ge,Ee,Me,He,Fe,st),E=new H1(v),B=new j1(v),K=new tM(D),it=new O1(D,K),te=new X1(D,K,st,it),X=new Z1(D,te,K,st),De=new K1(D,He,A),ie=new z1(Me),xe=new fw(v,E,B,Ge,He,it,ie),ue=new Nw(v,Me),Ae=new mw,be=new Sw(Ge),Re=new F1(v,E,B,Ee,X,p,l),ve=new Tw(v,X,He),F=new Uw(D,st,He,Ee),_e=new k1(D,Ge,st),Ve=new $1(D,Ge,st),st.programs=xe.programs,v.capabilities=He,v.extensions=Ge,v.properties=Me,v.renderLists=Ae,v.shadowMap=ve,v.state=Ee,v.info=st}de();const G=new Dw(v,D);this.xr=G,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=Ge.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ge.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(w){w!==void 0&&(N=w,this.setSize($,ee,!1))},this.getSize=function(w){return w.set($,ee)},this.setSize=function(w,O,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,ee=O,n.width=Math.floor(w*N),n.height=Math.floor(O*N),z===!0&&(n.style.width=w+"px",n.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set($*N,ee*N).floor()},this.setDrawingBufferSize=function(w,O,z){$=w,ee=O,N=z,n.width=Math.floor(w*z),n.height=Math.floor(O*z),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(ae)},this.setViewport=function(w,O,z,H){w.isVector4?ae.set(w.x,w.y,w.z,w.w):ae.set(w,O,z,H),Ee.viewport(I.copy(ae).multiplyScalar(N).round())},this.getScissor=function(w){return w.copy(Se)},this.setScissor=function(w,O,z,H){w.isVector4?Se.set(w.x,w.y,w.z,w.w):Se.set(w,O,z,H),Ee.scissor(U.copy(Se).multiplyScalar(N).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(w){Ee.setScissorTest(qe=w)},this.setOpaqueSort=function(w){Y=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,z=!0){let H=0;if(w){let k=!1;if(R!==null){const re=R.texture.format;k=re===Bf||re===kf||re===Of}if(k){const re=R.texture.type,ce=re===Mi||re===Rr||re===bo||re===Ro||re===Uf||re===Ff,ge=Re.getClearColor(),ye=Re.getClearAlpha(),Le=ge.r,Ie=ge.g,Te=ge.b;ce?(g[0]=Le,g[1]=Ie,g[2]=Te,g[3]=ye,D.clearBufferuiv(D.COLOR,0,g)):(y[0]=Le,y[1]=Ie,y[2]=Te,y[3]=ye,D.clearBufferiv(D.COLOR,0,y))}else H|=D.COLOR_BUFFER_BIT}O&&(H|=D.DEPTH_BUFFER_BIT),z&&(H|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Z,!1),n.removeEventListener("webglcontextrestored",he,!1),n.removeEventListener("webglcontextcreationerror",fe,!1),Re.dispose(),Ae.dispose(),be.dispose(),Me.dispose(),E.dispose(),B.dispose(),X.dispose(),it.dispose(),F.dispose(),xe.dispose(),G.dispose(),G.removeEventListener("sessionstart",Gf),G.removeEventListener("sessionend",Wf),tr.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const w=st.autoReset,O=ve.enabled,z=ve.autoUpdate,H=ve.needsUpdate,k=ve.type;de(),st.autoReset=w,ve.enabled=O,ve.autoUpdate=z,ve.needsUpdate=H,ve.type=k}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ne(w){const O=w.target;O.removeEventListener("dispose",Ne),pt(O)}function pt(w){Ut(w),Me.remove(w)}function Ut(w){const O=Me.get(w).programs;O!==void 0&&(O.forEach(function(z){xe.releaseProgram(z)}),w.isShaderMaterial&&xe.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,z,H,k,re){O===null&&(O=vt);const ce=k.isMesh&&k.matrixWorld.determinant()<0,ge=p_(w,O,z,H,k);Ee.setMaterial(H,ce);let ye=z.index,Le=1;if(H.wireframe===!0){if(ye=te.getWireframeAttribute(z),ye===void 0)return;Le=2}const Ie=z.drawRange,Te=z.attributes.position;let We=Ie.start*Le,Ke=(Ie.start+Ie.count)*Le;re!==null&&(We=Math.max(We,re.start*Le),Ke=Math.min(Ke,(re.start+re.count)*Le)),ye!==null?(We=Math.max(We,0),Ke=Math.min(Ke,ye.count)):Te!=null&&(We=Math.max(We,0),Ke=Math.min(Ke,Te.count));const xt=Ke-We;if(xt<0||xt===1/0)return;it.setup(k,H,ge,z,ye);let mt,Xe=_e;if(ye!==null&&(mt=K.get(ye),Xe=Ve,Xe.setIndex(mt)),k.isMesh)H.wireframe===!0?(Ee.setLineWidth(H.wireframeLinewidth*ze()),Xe.setMode(D.LINES)):Xe.setMode(D.TRIANGLES);else if(k.isLine){let we=H.linewidth;we===void 0&&(we=1),Ee.setLineWidth(we*ze()),k.isLineSegments?Xe.setMode(D.LINES):k.isLineLoop?Xe.setMode(D.LINE_LOOP):Xe.setMode(D.LINE_STRIP)}else k.isPoints?Xe.setMode(D.POINTS):k.isSprite&&Xe.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Xa("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Xe.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))Xe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const we=k._multiDrawStarts,It=k._multiDrawCounts,Ze=k._multiDrawCount,Rn=ye?K.get(ye).bytesPerElement:1,Nr=Me.get(H).currentProgram.getUniforms();for(let sn=0;sn<Ze;sn++)Nr.setValue(D,"_gl_DrawID",sn),Xe.render(we[sn]/Rn,It[sn])}else if(k.isInstancedMesh)Xe.renderInstances(We,xt,k.count);else if(z.isInstancedBufferGeometry){const we=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,It=Math.min(z.instanceCount,we);Xe.renderInstances(We,xt,It)}else Xe.render(We,xt)};function Je(w,O,z){w.transparent===!0&&w.side===ui&&w.forceSinglePass===!1?(w.side=nn,w.needsUpdate=!0,Go(w,O,z),w.side=Zi,w.needsUpdate=!0,Go(w,O,z),w.side=ui):Go(w,O,z)}this.compile=function(w,O,z=null){z===null&&(z=w),u=be.get(z),u.init(O),x.push(u),z.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),w!==z&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(u.pushLight(k),k.castShadow&&u.pushShadow(k))}),u.setupLights();const H=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const re=k.material;if(re)if(Array.isArray(re))for(let ce=0;ce<re.length;ce++){const ge=re[ce];Je(ge,z,k),H.add(ge)}else Je(re,z,k),H.add(re)}),u=x.pop(),H},this.compileAsync=function(w,O,z=null){const H=this.compile(w,O,z);return new Promise(k=>{function re(){if(H.forEach(function(ce){Me.get(ce).currentProgram.isReady()&&H.delete(ce)}),H.size===0){k(w);return}setTimeout(re,10)}Ge.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let bn=null;function ei(w){bn&&bn(w)}function Gf(){tr.stop()}function Wf(){tr.start()}const tr=new o_;tr.setAnimationLoop(ei),typeof self<"u"&&tr.setContext(self),this.setAnimationLoop=function(w){bn=w,G.setAnimationLoop(w),w===null?tr.stop():tr.start()},G.addEventListener("sessionstart",Gf),G.addEventListener("sessionend",Wf),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(O),O=G.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,O,R),u=be.get(w,x.length),u.init(O),x.push(u),Ce.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),q.setFromProjectionMatrix(Ce),pe=this.localClippingEnabled,se=ie.init(this.clippingPlanes,pe),m=Ae.get(w,_.length),m.init(),_.push(m),G.enabled===!0&&G.isPresenting===!0){const re=v.xr.getDepthSensingMesh();re!==null&&Kl(re,O,-1/0,v.sortObjects)}Kl(w,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Y,Q),ut=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,ut&&Re.addToRenderList(m,w),this.info.render.frame++,se===!0&&ie.beginShadows();const z=u.state.shadowsArray;ve.render(z,w,O),se===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,k=m.transmissive;if(u.setupLights(),O.isArrayCamera){const re=O.cameras;if(k.length>0)for(let ce=0,ge=re.length;ce<ge;ce++){const ye=re[ce];qf(H,k,w,ye)}ut&&Re.render(w);for(let ce=0,ge=re.length;ce<ge;ce++){const ye=re[ce];jf(m,w,ye,ye.viewport)}}else k.length>0&&qf(H,k,w,O),ut&&Re.render(w),jf(m,w,O);R!==null&&M===0&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(v,w,O),it.resetDefaultState(),T=-1,S=null,x.pop(),x.length>0?(u=x[x.length-1],se===!0&&ie.setGlobalState(v.clippingPlanes,u.state.camera)):u=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function Kl(w,O,z,H){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)u.pushLight(w),w.castShadow&&u.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||q.intersectsSprite(w)){H&&Pe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Ce);const ce=X.update(w),ge=w.material;ge.visible&&m.push(w,ce,ge,z,Pe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||q.intersectsObject(w))){const ce=X.update(w),ge=w.material;if(H&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Pe.copy(w.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),Pe.copy(ce.boundingSphere.center)),Pe.applyMatrix4(w.matrixWorld).applyMatrix4(Ce)),Array.isArray(ge)){const ye=ce.groups;for(let Le=0,Ie=ye.length;Le<Ie;Le++){const Te=ye[Le],We=ge[Te.materialIndex];We&&We.visible&&m.push(w,ce,We,z,Pe.z,Te)}}else ge.visible&&m.push(w,ce,ge,z,Pe.z,null)}}const re=w.children;for(let ce=0,ge=re.length;ce<ge;ce++)Kl(re[ce],O,z,H)}function jf(w,O,z,H){const k=w.opaque,re=w.transmissive,ce=w.transparent;u.setupLightsView(z),se===!0&&ie.setGlobalState(v.clippingPlanes,z),H&&Ee.viewport(I.copy(H)),k.length>0&&Vo(k,O,z),re.length>0&&Vo(re,O,z),ce.length>0&&Vo(ce,O,z),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function qf(w,O,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[H.id]===void 0&&(u.state.transmissionRenderTarget[H.id]=new Pr(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Oo:Mi,minFilter:xr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const re=u.state.transmissionRenderTarget[H.id],ce=H.viewport||I;re.setSize(ce.z*v.transmissionResolutionScale,ce.w*v.transmissionResolutionScale);const ge=v.getRenderTarget();v.setRenderTarget(re),v.getClearColor(W),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),ut&&Re.render(z);const ye=v.toneMapping;v.toneMapping=$i;const Le=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),u.setupLightsView(H),se===!0&&ie.setGlobalState(v.clippingPlanes,H),Vo(w,z,H),A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Te=0,We=O.length;Te<We;Te++){const Ke=O[Te],xt=Ke.object,mt=Ke.geometry,Xe=Ke.material,we=Ke.group;if(Xe.side===ui&&xt.layers.test(H.layers)){const It=Xe.side;Xe.side=nn,Xe.needsUpdate=!0,Xf(xt,z,H,mt,Xe,we),Xe.side=It,Xe.needsUpdate=!0,Ie=!0}}Ie===!0&&(A.updateMultisampleRenderTarget(re),A.updateRenderTargetMipmap(re))}v.setRenderTarget(ge),v.setClearColor(W,j),Le!==void 0&&(H.viewport=Le),v.toneMapping=ye}function Vo(w,O,z){const H=O.isScene===!0?O.overrideMaterial:null;for(let k=0,re=w.length;k<re;k++){const ce=w[k],ge=ce.object,ye=ce.geometry,Le=ce.group;let Ie=ce.material;Ie.allowOverride===!0&&H!==null&&(Ie=H),ge.layers.test(z.layers)&&Xf(ge,O,z,ye,Ie,Le)}}function Xf(w,O,z,H,k,re){w.onBeforeRender(v,O,z,H,k,re),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(v,O,z,H,w,re),k.transparent===!0&&k.side===ui&&k.forceSinglePass===!1?(k.side=nn,k.needsUpdate=!0,v.renderBufferDirect(z,O,H,k,w,re),k.side=Zi,k.needsUpdate=!0,v.renderBufferDirect(z,O,H,k,w,re),k.side=ui):v.renderBufferDirect(z,O,H,k,w,re),w.onAfterRender(v,O,z,H,k,re)}function Go(w,O,z){O.isScene!==!0&&(O=vt);const H=Me.get(w),k=u.state.lights,re=u.state.shadowsArray,ce=k.state.version,ge=xe.getParameters(w,k.state,re,O,z),ye=xe.getProgramCacheKey(ge);let Le=H.programs;H.environment=w.isMeshStandardMaterial?O.environment:null,H.fog=O.fog,H.envMap=(w.isMeshStandardMaterial?B:E).get(w.envMap||H.environment),H.envMapRotation=H.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,Le===void 0&&(w.addEventListener("dispose",Ne),Le=new Map,H.programs=Le);let Ie=Le.get(ye);if(Ie!==void 0){if(H.currentProgram===Ie&&H.lightsStateVersion===ce)return Yf(w,ge),Ie}else ge.uniforms=xe.getUniforms(w),w.onBeforeCompile(ge,v),Ie=xe.acquireProgram(ge,ye),Le.set(ye,Ie),H.uniforms=ge.uniforms;const Te=H.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Te.clippingPlanes=ie.uniform),Yf(w,ge),H.needsLights=g_(w),H.lightsStateVersion=ce,H.needsLights&&(Te.ambientLightColor.value=k.state.ambient,Te.lightProbe.value=k.state.probe,Te.directionalLights.value=k.state.directional,Te.directionalLightShadows.value=k.state.directionalShadow,Te.spotLights.value=k.state.spot,Te.spotLightShadows.value=k.state.spotShadow,Te.rectAreaLights.value=k.state.rectArea,Te.ltc_1.value=k.state.rectAreaLTC1,Te.ltc_2.value=k.state.rectAreaLTC2,Te.pointLights.value=k.state.point,Te.pointLightShadows.value=k.state.pointShadow,Te.hemisphereLights.value=k.state.hemi,Te.directionalShadowMap.value=k.state.directionalShadowMap,Te.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Te.spotShadowMap.value=k.state.spotShadowMap,Te.spotLightMatrix.value=k.state.spotLightMatrix,Te.spotLightMap.value=k.state.spotLightMap,Te.pointShadowMap.value=k.state.pointShadowMap,Te.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Ie,H.uniformsList=null,Ie}function $f(w){if(w.uniformsList===null){const O=w.currentProgram.getUniforms();w.uniformsList=$a.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Yf(w,O){const z=Me.get(w);z.outputColorSpace=O.outputColorSpace,z.batching=O.batching,z.batchingColor=O.batchingColor,z.instancing=O.instancing,z.instancingColor=O.instancingColor,z.instancingMorph=O.instancingMorph,z.skinning=O.skinning,z.morphTargets=O.morphTargets,z.morphNormals=O.morphNormals,z.morphColors=O.morphColors,z.morphTargetsCount=O.morphTargetsCount,z.numClippingPlanes=O.numClippingPlanes,z.numIntersection=O.numClipIntersection,z.vertexAlphas=O.vertexAlphas,z.vertexTangents=O.vertexTangents,z.toneMapping=O.toneMapping}function p_(w,O,z,H,k){O.isScene!==!0&&(O=vt),A.resetTextureUnits();const re=O.fog,ce=H.isMeshStandardMaterial?O.environment:null,ge=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:bs,ye=(H.isMeshStandardMaterial?B:E).get(H.envMap||ce),Le=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ie=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Te=!!z.morphAttributes.position,We=!!z.morphAttributes.normal,Ke=!!z.morphAttributes.color;let xt=$i;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xt=v.toneMapping);const mt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Xe=mt!==void 0?mt.length:0,we=Me.get(H),It=u.state.lights;if(se===!0&&(pe===!0||w!==S)){const Vt=w===S&&H.id===T;ie.setState(H,w,Vt)}let Ze=!1;H.version===we.__version?(we.needsLights&&we.lightsStateVersion!==It.state.version||we.outputColorSpace!==ge||k.isBatchedMesh&&we.batching===!1||!k.isBatchedMesh&&we.batching===!0||k.isBatchedMesh&&we.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&we.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&we.instancing===!1||!k.isInstancedMesh&&we.instancing===!0||k.isSkinnedMesh&&we.skinning===!1||!k.isSkinnedMesh&&we.skinning===!0||k.isInstancedMesh&&we.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&we.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&we.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&we.instancingMorph===!1&&k.morphTexture!==null||we.envMap!==ye||H.fog===!0&&we.fog!==re||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==ie.numPlanes||we.numIntersection!==ie.numIntersection)||we.vertexAlphas!==Le||we.vertexTangents!==Ie||we.morphTargets!==Te||we.morphNormals!==We||we.morphColors!==Ke||we.toneMapping!==xt||we.morphTargetsCount!==Xe)&&(Ze=!0):(Ze=!0,we.__version=H.version);let Rn=we.currentProgram;Ze===!0&&(Rn=Go(H,O,k));let Nr=!1,sn=!1,Fs=!1;const lt=Rn.getUniforms(),vn=we.uniforms;if(Ee.useProgram(Rn.program)&&(Nr=!0,sn=!0,Fs=!0),H.id!==T&&(T=H.id,sn=!0),Nr||S!==w){Ee.buffers.depth.getReversed()?(oe.copy(w.projectionMatrix),xS(oe),SS(oe),lt.setValue(D,"projectionMatrix",oe)):lt.setValue(D,"projectionMatrix",w.projectionMatrix),lt.setValue(D,"viewMatrix",w.matrixWorldInverse);const Yt=lt.map.cameraPosition;Yt!==void 0&&Yt.setValue(D,Ye.setFromMatrixPosition(w.matrixWorld)),He.logarithmicDepthBuffer&&lt.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&lt.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,sn=!0,Fs=!0)}if(k.isSkinnedMesh){lt.setOptional(D,k,"bindMatrix"),lt.setOptional(D,k,"bindMatrixInverse");const Vt=k.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),lt.setValue(D,"boneTexture",Vt.boneTexture,A))}k.isBatchedMesh&&(lt.setOptional(D,k,"batchingTexture"),lt.setValue(D,"batchingTexture",k._matricesTexture,A),lt.setOptional(D,k,"batchingIdTexture"),lt.setValue(D,"batchingIdTexture",k._indirectTexture,A),lt.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&lt.setValue(D,"batchingColorTexture",k._colorsTexture,A));const _n=z.morphAttributes;if((_n.position!==void 0||_n.normal!==void 0||_n.color!==void 0)&&De.update(k,z,Rn),(sn||we.receiveShadow!==k.receiveShadow)&&(we.receiveShadow=k.receiveShadow,lt.setValue(D,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(vn.envMap.value=ye,vn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&O.environment!==null&&(vn.envMapIntensity.value=O.environmentIntensity),sn&&(lt.setValue(D,"toneMappingExposure",v.toneMappingExposure),we.needsLights&&m_(vn,Fs),re&&H.fog===!0&&ue.refreshFogUniforms(vn,re),ue.refreshMaterialUniforms(vn,H,N,ee,u.state.transmissionRenderTarget[w.id]),$a.upload(D,$f(we),vn,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&($a.upload(D,$f(we),vn,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&lt.setValue(D,"center",k.center),lt.setValue(D,"modelViewMatrix",k.modelViewMatrix),lt.setValue(D,"normalMatrix",k.normalMatrix),lt.setValue(D,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Vt=H.uniformsGroups;for(let Yt=0,Zl=Vt.length;Yt<Zl;Yt++){const nr=Vt[Yt];F.update(nr,Rn),F.bind(nr,Rn)}}return Rn}function m_(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function g_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,O,z){const H=Me.get(w);H.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Me.get(w.texture).__webglTexture=O,Me.get(w.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){const z=Me.get(w);z.__webglFramebuffer=O,z.__useDefaultFramebuffer=O===void 0};const v_=D.createFramebuffer();this.setRenderTarget=function(w,O=0,z=0){R=w,C=O,M=z;let H=!0,k=null,re=!1,ce=!1;if(w){const ye=Me.get(w);if(ye.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(D.FRAMEBUFFER,null),H=!1;else if(ye.__webglFramebuffer===void 0)A.setupRenderTarget(w);else if(ye.__hasExternalTextures)A.rebindTextures(w,Me.get(w.texture).__webglTexture,Me.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Te=w.depthTexture;if(ye.__boundDepthTexture!==Te){if(Te!==null&&Me.has(Te)&&(w.width!==Te.image.width||w.height!==Te.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(w)}}const Le=w.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(ce=!0);const Ie=Me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ie[O])?k=Ie[O][z]:k=Ie[O],re=!0):w.samples>0&&A.useMultisampledRTT(w)===!1?k=Me.get(w).__webglMultisampledFramebuffer:Array.isArray(Ie)?k=Ie[z]:k=Ie,I.copy(w.viewport),U.copy(w.scissor),L=w.scissorTest}else I.copy(ae).multiplyScalar(N).floor(),U.copy(Se).multiplyScalar(N).floor(),L=qe;if(z!==0&&(k=v_),Ee.bindFramebuffer(D.FRAMEBUFFER,k)&&H&&Ee.drawBuffers(w,k),Ee.viewport(I),Ee.scissor(U),Ee.setScissorTest(L),re){const ye=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,ye.__webglTexture,z)}else if(ce){const ye=Me.get(w.texture),Le=O;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,ye.__webglTexture,z,Le)}else if(w!==null&&z!==0){const ye=Me.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ye.__webglTexture,z)}T=-1},this.readRenderTargetPixels=function(w,O,z,H,k,re,ce){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(ge=ge[ce]),ge){Ee.bindFramebuffer(D.FRAMEBUFFER,ge);try{const ye=w.texture,Le=ye.format,Ie=ye.type;if(!He.textureFormatReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-H&&z>=0&&z<=w.height-k&&D.readPixels(O,z,H,k,Fe.convert(Le),Fe.convert(Ie),re)}finally{const ye=R!==null?Me.get(R).__webglFramebuffer:null;Ee.bindFramebuffer(D.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(w,O,z,H,k,re,ce){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=Me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ce!==void 0&&(ge=ge[ce]),ge)if(O>=0&&O<=w.width-H&&z>=0&&z<=w.height-k){Ee.bindFramebuffer(D.FRAMEBUFFER,ge);const ye=w.texture,Le=ye.format,Ie=ye.type;if(!He.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.bufferData(D.PIXEL_PACK_BUFFER,re.byteLength,D.STREAM_READ),D.readPixels(O,z,H,k,Fe.convert(Le),Fe.convert(Ie),0);const We=R!==null?Me.get(R).__webglFramebuffer:null;Ee.bindFramebuffer(D.FRAMEBUFFER,We);const Ke=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await yS(D,Ke,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Te),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,re),D.deleteBuffer(Te),D.deleteSync(Ke),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,z=0){const H=Math.pow(2,-z),k=Math.floor(w.image.width*H),re=Math.floor(w.image.height*H),ce=O!==null?O.x:0,ge=O!==null?O.y:0;A.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,ce,ge,k,re),Ee.unbindTexture()};const __=D.createFramebuffer(),y_=D.createFramebuffer();this.copyTextureToTexture=function(w,O,z=null,H=null,k=0,re=null){re===null&&(k!==0?(Xa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=k,k=0):re=0);let ce,ge,ye,Le,Ie,Te,We,Ke,xt;const mt=w.isCompressedTexture?w.mipmaps[re]:w.image;if(z!==null)ce=z.max.x-z.min.x,ge=z.max.y-z.min.y,ye=z.isBox3?z.max.z-z.min.z:1,Le=z.min.x,Ie=z.min.y,Te=z.isBox3?z.min.z:0;else{const _n=Math.pow(2,-k);ce=Math.floor(mt.width*_n),ge=Math.floor(mt.height*_n),w.isDataArrayTexture?ye=mt.depth:w.isData3DTexture?ye=Math.floor(mt.depth*_n):ye=1,Le=0,Ie=0,Te=0}H!==null?(We=H.x,Ke=H.y,xt=H.z):(We=0,Ke=0,xt=0);const Xe=Fe.convert(O.format),we=Fe.convert(O.type);let It;O.isData3DTexture?(A.setTexture3D(O,0),It=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),It=D.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),It=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Ze=D.getParameter(D.UNPACK_ROW_LENGTH),Rn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Nr=D.getParameter(D.UNPACK_SKIP_PIXELS),sn=D.getParameter(D.UNPACK_SKIP_ROWS),Fs=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,mt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,mt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Le),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ie),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Te);const lt=w.isDataArrayTexture||w.isData3DTexture,vn=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){const _n=Me.get(w),Vt=Me.get(O),Yt=Me.get(_n.__renderTarget),Zl=Me.get(Vt.__renderTarget);Ee.bindFramebuffer(D.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Ee.bindFramebuffer(D.DRAW_FRAMEBUFFER,Zl.__webglFramebuffer);for(let nr=0;nr<ye;nr++)lt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(w).__webglTexture,k,Te+nr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Me.get(O).__webglTexture,re,xt+nr)),D.blitFramebuffer(Le,Ie,ce,ge,We,Ke,ce,ge,D.DEPTH_BUFFER_BIT,D.NEAREST);Ee.bindFramebuffer(D.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||w.isRenderTargetTexture||Me.has(w)){const _n=Me.get(w),Vt=Me.get(O);Ee.bindFramebuffer(D.READ_FRAMEBUFFER,__),Ee.bindFramebuffer(D.DRAW_FRAMEBUFFER,y_);for(let Yt=0;Yt<ye;Yt++)lt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,_n.__webglTexture,k,Te+Yt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,_n.__webglTexture,k),vn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vt.__webglTexture,re,xt+Yt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Vt.__webglTexture,re),k!==0?D.blitFramebuffer(Le,Ie,ce,ge,We,Ke,ce,ge,D.COLOR_BUFFER_BIT,D.NEAREST):vn?D.copyTexSubImage3D(It,re,We,Ke,xt+Yt,Le,Ie,ce,ge):D.copyTexSubImage2D(It,re,We,Ke,Le,Ie,ce,ge);Ee.bindFramebuffer(D.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else vn?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(It,re,We,Ke,xt,ce,ge,ye,Xe,we,mt.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(It,re,We,Ke,xt,ce,ge,ye,Xe,mt.data):D.texSubImage3D(It,re,We,Ke,xt,ce,ge,ye,Xe,we,mt):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,re,We,Ke,ce,ge,Xe,we,mt.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,re,We,Ke,mt.width,mt.height,Xe,mt.data):D.texSubImage2D(D.TEXTURE_2D,re,We,Ke,ce,ge,Xe,we,mt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ze),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Rn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Nr),D.pixelStorei(D.UNPACK_SKIP_ROWS,sn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fs),re===0&&O.generateMipmaps&&D.generateMipmap(It),Ee.unbindTexture()},this.copyTextureToTexture3D=function(w,O,z=null,H=null,k=0){return Xa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,O,z,H,k)},this.initRenderTarget=function(w){Me.get(w).__webglFramebuffer===void 0&&A.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),Ee.unbindTexture()},this.resetState=function(){C=0,M=0,R=null,Ee.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),n.unpackColorSpace=$e._getUnpackColorSpace()}}const Ow=()=>{const t=J.useRef(null),e=J.useRef({});return J.useEffect(()=>{if(!t.current)return;const n=new XS,i=new En(40,window.innerWidth/window.innerHeight,.1,1e3);i.position.z=5;const r=new Fw({canvas:t.current,alpha:!0,antialias:!0});r.setSize(window.innerWidth,window.innerHeight),r.setPixelRatio(Math.min(window.devicePixelRatio,2));const s={uTime:{value:50},uOrangeColor:{value:new Qe("#ffe0d8")},uWhiteColor:{value:new Qe("#f9f9f9")},uWhiteThreshold:{value:.55},uOrangeThreshold:{value:.45},uBlurAmount:{value:.2},uVortexStrength:{value:.38},uSpeed:{value:.5},uNoiseIntensity:{value:.85},uBoundaryWave:{value:.28},uScatterFactor:{value:5.2},uMicroPatchesFrequency:{value:7.5}},o=new Jn({uniforms:s,vertexShader:`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform vec3 uOrangeColor;
        uniform vec3 uWhiteColor;
        uniform float uWhiteThreshold;
        uniform float uOrangeThreshold;
        uniform float uBlurAmount;
        uniform float uVortexStrength;
        uniform float uSpeed;
        uniform float uNoiseIntensity;
        uniform float uBoundaryWave;
        uniform float uScatterFactor;
        uniform float uMicroPatchesFrequency;
        varying vec2 vUv;
        
        // Simplified noise function for boundary distortion
        vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod(i, 289.0);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        // Flow transformation with enhanced scattering for much smaller, more frequent patterns
        vec2 flowEffect(vec2 uv, float strength, float time, float scatter) {
          // Create directional flow that moves content off-screen
          // This prevents circular accumulation by using a consistent flow direction
          
          // Base UV coordinate
          vec2 flowUv = uv;
          
          // Multiple layers of high frequency wave patterns for many small scattered patches
          flowUv.x += sin(uv.y * scatter * 1.2 + time * 0.22) * strength * 0.12;
          flowUv.y += cos(uv.x * (scatter - 0.5) + time * 0.33) * strength * 0.09;
          
          // Additional layers of even smaller wave patterns for micro-scattering
          flowUv.x += sin(uv.y * scatter * 2.3 - time * 0.17) * strength * 0.07;
          flowUv.y += cos(uv.x * scatter * 2.0 + time * 0.28) * strength * 0.06;
          
          // Ultra-fine detail layer for tiny patches
          flowUv.x += sin(uv.y * scatter * 3.8 + time * 0.11) * strength * 0.04;
          flowUv.y += cos(uv.x * scatter * 3.5 - time * 0.14) * strength * 0.035;
          
          // Add dynamic flow movement to prevent static areas and create more variation
          flowUv.x += sin(time * 0.22 + uv.x * 1.5) * strength * 0.04;
          flowUv.y += cos(time * 0.31 + uv.y * 1.3) * strength * 0.03;
          
          return flowUv;
        }
        
        void main() {
          // Apply enhanced flowing transformation with scatter factor for more distributed patterns
          vec2 distortedUv = flowEffect(vUv, uVortexStrength, uTime * uSpeed, uScatterFactor);
          
          // Create continuously moving boundary noise with much higher frequencies for smaller patches
          float boundaryNoise = snoise(vec2(
            distortedUv.x * 6.5 + uTime * uSpeed * 0.32, 
            distortedUv.y * 6.8 - uTime * uSpeed * 0.28
          )) * uBoundaryWave;
          
          // Higher frequency detail noise for much finer grain patterns
          float detailNoise = snoise(vec2(
            distortedUv.x * 12.5 + uTime * uSpeed * 0.18,
            distortedUv.y * 13.0 - uTime * uSpeed * 0.22
          )) * uNoiseIntensity * 0.5;
          
          // Add scattered high-frequency noise to create smaller, more distributed patches
          float extraNoise = snoise(vec2(
            distortedUv.x * 22.0 - uTime * uSpeed * 0.12,
            distortedUv.y * 20.0 + uTime * uSpeed * 0.14
          )) * uNoiseIntensity * 0.3;
          
          // Additional scattered micro-detail noise layer
          float microNoise = snoise(vec2(
            distortedUv.x * 28.0 + uTime * uSpeed * 0.06,
            distortedUv.y * 26.0 - uTime * uSpeed * 0.09
          )) * uNoiseIntensity * 0.2;
          
          // New ultra-fine micro patch layer for tiny frequent details
          float microPatchNoise = snoise(vec2(
            distortedUv.x * uMicroPatchesFrequency * 5.0 - uTime * uSpeed * 0.04,
            distortedUv.y * uMicroPatchesFrequency * 4.8 + uTime * uSpeed * 0.05
          )) * uNoiseIntensity * 0.15;
          
          // Define the main gradient with enhanced scatter noise patterns
          // Use scattered noise patterns with different frequencies to create smaller, distributed orange patches
          float mainGradient = distortedUv.y + boundaryNoise * 0.6 + detailNoise * 0.5 + extraNoise * 0.35 + microNoise * 0.25 + microPatchNoise * 0.3;
          
          // Create multiple sub-gradients at different frequencies for scattered patches
          float scatterGradient1 = mainGradient + microNoise * 0.7 - detailNoise * 0.35 + microPatchNoise * 0.4;
          float scatterGradient2 = mainGradient - extraNoise * 0.5 + boundaryNoise * 0.45 - microPatchNoise * 0.3;
          float scatterGradient3 = mainGradient + (sin(distortedUv.x * 25.0) * 0.025) - (cos(distortedUv.y * 22.0) * 0.02);
          float scatterGradient4 = mainGradient - microPatchNoise * 0.6 + extraNoise * 0.25;
          float scatterGradient5 = mainGradient + (cos(distortedUv.x * 40.0 + uTime * 0.1) * 0.015);
          
          // Calculate transition boundary with tighter blur control for smaller patches
          float transitionCenter = uOrangeThreshold;
          float blurRadius = uBlurAmount;
          
          // Create multiple transition layers at different frequencies for many tiny orange patches
          float blurFactor1 = smoothstep(transitionCenter - blurRadius, transitionCenter + blurRadius, mainGradient);
          float blurFactor2 = smoothstep(transitionCenter - blurRadius * 0.6, transitionCenter + blurRadius * 0.6, scatterGradient1);
          float blurFactor3 = smoothstep(transitionCenter - blurRadius * 0.8, transitionCenter + blurRadius * 0.8, scatterGradient2);
          float blurFactor4 = smoothstep(transitionCenter - blurRadius * 0.4, transitionCenter + blurRadius * 0.4, scatterGradient3);
          float blurFactor5 = smoothstep(transitionCenter - blurRadius * 0.25, transitionCenter + blurRadius * 0.25, mainGradient + microNoise * 0.6);
          float blurFactor6 = smoothstep(transitionCenter - blurRadius * 0.3, transitionCenter + blurRadius * 0.35, scatterGradient4);
          float blurFactor7 = smoothstep(transitionCenter - blurRadius * 0.2, transitionCenter + blurRadius * 0.2, scatterGradient5);
          
          // Combine blur factors with weighted distribution to create many small scattered patches
          float combinedBlur = (blurFactor1 * 0.15 + blurFactor2 * 0.15 + blurFactor3 * 0.15 + 
                               blurFactor4 * 0.15 + blurFactor5 * 0.15 + blurFactor6 * 0.15 + blurFactor7 * 0.1);
          
          // Apply additional scattered micro noise patterns to break up into many tiny areas
          float noisyBlur = combinedBlur + (microNoise * uBlurAmount * 0.12) + (extraNoise * uBlurAmount * 0.08) + 
                            (microPatchNoise * uBlurAmount * 0.15);
                            
          // High frequency detail breakup for tiny patches
          noisyBlur += sin(distortedUv.x * 50.0 + uTime * 0.07) * sin(distortedUv.y * 48.0 - uTime * 0.05) * uBlurAmount * 0.05;
                            
          // Ensure proper clamping to prevent color artifacts
          noisyBlur = clamp(noisyBlur, 0.0, 1.0);
          
          // Smooth color mixing with enhanced brightness for orange patches
          vec3 finalColor = mix(uOrangeColor, uWhiteColor, noisyBlur);
          
          // Enhance brightness of orange areas using noise patterns
          // This makes orange patches appear more vibrant
          float brightnessFactor = (1.0 - noisyBlur) * 0.18; // Only brightens orange areas
          finalColor += uOrangeColor * brightnessFactor;
          
          // Add ultra-fine micro-texture variation within each color region
          float textureNoise = snoise(vec2(
            distortedUv.x * 32.0 + uTime * 0.05,
            distortedUv.y * 28.0 - uTime * 0.06
          )) * 0.035;
          
          // Secondary fine texture for even more detail
          float secondaryTexture = snoise(vec2(
            distortedUv.x * 48.0 - uTime * 0.03,
            distortedUv.y * 42.0 + uTime * 0.04
          )) * 0.025;
          
          // Apply more texture variation to orange regions for scattered effect
          float orangeTextureIntensity = (1.0 - noisyBlur) * 0.8; // More texture in orange areas
          finalColor = mix(finalColor, finalColor * (1.0 + textureNoise + secondaryTexture), 0.35 + orangeTextureIntensity * 0.25);
          
          // Subtle alpha variation for glassmorphism compatibility
          float alpha = 0.96 + microNoise * 0.02;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,transparent:!0}),a=new Ps(100,100,32,32),l=new Bn(a,o);l.rotation.x=Math.PI*.1,l.position.set(0,0,-2),n.add(l);const c=new Ps(120,120,16,16),f=new Jn({uniforms:{...s,uTime:{value:s.uTime.value+5},uVortexStrength:{value:s.uVortexStrength.value*.65},uBoundaryWave:{value:s.uBoundaryWave.value*.85},uNoiseIntensity:{value:s.uNoiseIntensity.value*.45},uBlurAmount:{value:s.uBlurAmount.value*1.05},uScatterFactor:{value:s.uScatterFactor.value*.95},uMicroPatchesFrequency:{value:s.uMicroPatchesFrequency.value*.9}},vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,transparent:!0,opacity:.2}),h=new Bn(c,f);h.rotation.x=Math.PI*.08,h.position.set(0,0,-4),n.add(h),e.current={scene:n,camera:i,renderer:r};function d(){const y=requestAnimationFrame(d);e.current.animationId=y,s.uTime.value+=.005,f.uniforms.uTime&&(f.uniforms.uTime.value+=.003);const m=window.scrollY;e.current.scrollY=m;const u=m*.002;i.position.x=Math.sin(s.uTime.value*.1)*.1,i.position.y=Math.cos(s.uTime.value*.08)*.05-u,r.render(n,i)}d();const p=()=>{const y=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);i.aspect=window.innerWidth/window.innerHeight;const m=y/window.innerHeight;i.fov=Math.max(40,Math.min(60,40+m*5)),i.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)},g=()=>{};return window.addEventListener("resize",p),window.addEventListener("scroll",g),p(),()=>{window.removeEventListener("resize",p),window.removeEventListener("scroll",g),e.current.animationId&&cancelAnimationFrame(e.current.animationId),e.current.renderer&&e.current.renderer.dispose(),a&&a.dispose(),c&&c.dispose(),o&&o.dispose(),f&&f.dispose()}},[]),b.jsx("canvas",{ref:t,style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1,pointerEvents:"none",willChange:"transform",backfaceVisibility:"hidden",transform:"translateZ(0)",transition:"opacity 0.3s ease-in",opacity:1}})},im="/gpa/assets/logo-BEvnmV3r.svg";var d_={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},rm=Yn.createContext&&Yn.createContext(d_),kw=["attr","size","title"];function Bw(t,e){if(t==null)return{};var n=zw(t,e),i,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)i=s[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(t,i)&&(n[i]=t[i])}return n}function zw(t,e){if(t==null)return{};var n={};for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)){if(e.indexOf(i)>=0)continue;n[i]=t[i]}return n}function wl(){return wl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},wl.apply(this,arguments)}function sm(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function Cl(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?sm(Object(n),!0).forEach(function(i){Hw(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):sm(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}function Hw(t,e,n){return e=Vw(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Vw(t){var e=Gw(t,"string");return typeof e=="symbol"?e:e+""}function Gw(t,e){if(typeof t!="object"||!t)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function f_(t){return t&&t.map((e,n)=>Yn.createElement(e.tag,Cl({key:n},e.attr),f_(e.child)))}function Ww(t){return e=>Yn.createElement(jw,wl({attr:Cl({},t.attr)},e),f_(t.child))}function jw(t){var e=n=>{var{attr:i,size:r,title:s}=t,o=Bw(t,kw),a=r||n.size||"1em",l;return n.className&&(l=n.className),t.className&&(l=(l?l+" ":"")+t.className),Yn.createElement("svg",wl({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,i,o,{className:l,style:Cl(Cl({color:t.color||n.color},n.style),t.style),height:a,width:a,xmlns:"http://www.w3.org/2000/svg"}),s&&Yn.createElement("title",null,s),t.children)};return rm!==void 0?Yn.createElement(rm.Consumer,null,n=>e(n)):e(d_)}function qw(t){return Ww({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(t)}const Xw=t=>b.jsx("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",className:`copyright-icon ${t.className||""}`,...t,children:b.jsxs("g",{children:[b.jsx("path",{fill:"none",d:"M0 0h24v24H0z"}),b.jsx("path",{d:"M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 3c1.82 0 3.413.973 4.288 2.428l-1.714 1.029A3 3 0 1 0 12 15a2.998 2.998 0 0 0 2.573-1.456l1.715 1.028A4.999 4.999 0 0 1 7 12c0-2.76 2.24-5 5-5z"})]})}),$w=()=>{const t=new Date().getFullYear();return b.jsx("footer",{className:"app-footer",children:b.jsxs("div",{className:"footer-content",children:[b.jsxs("div",{className:"footer-left",children:[b.jsx("a",{href:"https://github.com/zzokm",target:"_blank",rel:"noopener noreferrer",className:"signature-logo-link",style:{WebkitMaskImage:`url(${im})`,maskImage:`url(${im})`},title:"Visit creator's profile"}),b.jsxs("span",{children:["Made by ",b.jsx("span",{style:{color:"#ff7955"},children:"Yehia"})]})]}),b.jsxs("div",{className:"footer-middle",children:["Copyright ",b.jsx(Xw,{})," ",t]}),b.jsx("div",{className:"footer-right",children:b.jsx("a",{href:"https://github.com/zzokm/gpa",target:"_blank",rel:"noopener noreferrer",className:"github-link",title:"View source code on GitHub",children:b.jsx(qw,{})})})]})})},h_="gpa-calculator-courses",Yw=()=>{try{const t=localStorage.getItem(h_);return t?JSON.parse(t):[]}catch(t){return console.error("Failed to load courses from localStorage:",t),[]}},Kw=()=>{const[t,e]=J.useState(Yw),[n,i]=J.useState(!1),[r,s]=J.useState({show:!1,message:""}),o=J.useCallback(()=>{e([]),s({show:!0,message:"All courses cleared!"}),setTimeout(()=>{s(p=>({...p,show:!1}))},1500)},[]),a=J.useCallback(p=>{const g=p.name.trim()||`Course ${t.length+1}`;e(y=>[...y,{...p,name:g,id:Date.now().toString(),isImported:!1}])},[t.length]),l=J.useCallback((p,g)=>{e(y=>y.map(m=>m.id===p?{...m,grade:g}:m))},[]),c=J.useCallback((p,g)=>{e(y=>y.map(m=>m.id===p?{...m,hours:g}:m)),s({show:!0,message:"Credit hours updated!"}),setTimeout(()=>{s(y=>({...y,show:!1}))},1500)},[]),f=J.useCallback(p=>{e(g=>g.filter(y=>y.id!==p))},[]),h=J.useCallback(p=>{const g=p.map(y=>({...y,id:Date.now().toString()+Math.random().toString()}));e(g),i(!1)},[]);J.useEffect(()=>{try{if(localStorage.setItem(h_,JSON.stringify(t)),t.length>0){const p=setTimeout(()=>{s(g=>({...g,show:!1}))},1500);return()=>clearTimeout(p)}}catch(p){console.error("Failed to save courses to localStorage:",p),s({show:!0,message:"Failed to save changes"});const g=setTimeout(()=>{s(y=>({...y,show:!1}))},1500);return()=>clearTimeout(g)}},[t]);const d=Lv(t);return b.jsxs(b.Fragment,{children:["      ",b.jsxs(Ev,{className:"container",children:[r.show&&b.jsx("div",{className:`save-notification ${r.message.includes("Failed")?"error":"success"}`,children:r.message}),b.jsxs("div",{children:[b.jsx("h1",{className:"app-title",children:"GPA Calculator"}),b.jsx("h5",{className:"app-subtitle",children:"FCAI - Cairo University"})]}),b.jsx(xx,{onAddCourse:a,onShowImport:()=>i(!0)}),"        ",b.jsx(wx,{courses:t,onRemoveCourse:f,onUpdateGrade:l,onUpdateCreditHours:c,onClearCourses:o}),b.jsx(Ax,{gpa:d}),"        ",b.jsx(bx,{show:n,onHide:()=>i(!1),onImport:h,currentCourses:t})]}),b.jsx(Ow,{}),b.jsx($w,{})]})};eu.createRoot(document.getElementById("root")).render(b.jsx(Yn.StrictMode,{children:b.jsx(Kw,{})}));
