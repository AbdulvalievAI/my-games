var IA=Object.defineProperty,MA=Object.defineProperties;var TA=Object.getOwnPropertyDescriptors;var fb=Object.getOwnPropertySymbols;var AA=Object.prototype.hasOwnProperty,kA=Object.prototype.propertyIsEnumerable;var mb=(t,n,e)=>n in t?IA(t,n,{enumerable:true,configurable:true,writable:true,value:e}):t[n]=e,v=(t,n)=>{for(var e in n||={})AA.call(n,e)&&mb(t,e,n[e]);if(fb)for(var e of fb(n))kA.call(n,e)&&mb(t,e,n[e]);return t},Y=(t,n)=>MA(t,TA(n));function se(t){return typeof t=="function"}function ts(t){let e=t(i=>{Error.call(i),i.stack=new Error().stack;});return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var td=ts(t=>function(e){t(this),this.message=e?`${e.length} errors occurred during unsubscription:
${e.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=e;});function Wr(t,n){if(t){let e=t.indexOf(n);0<=e&&t.splice(e,1);}}var ae=class t{constructor(n){this.initialTeardown=n,this.closed=false,this._parentage=null,this._finalizers=null;}unsubscribe(){let n;if(!this.closed){this.closed=true;let{_parentage:e}=this;if(e)if(this._parentage=null,Array.isArray(e))for(let o of e)o.remove(this);else e.remove(this);let{initialTeardown:i}=this;if(se(i))try{i();}catch(o){n=o instanceof td?o.errors:[o];}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{hb(o);}catch(s){n=n??[],s instanceof td?n=[...n,...s.errors]:n.push(s);}}if(n)throw new td(n)}}add(n){var e;if(n&&n!==this)if(this.closed)hb(n);else {if(n instanceof t){if(n.closed||n._hasParent(this))return;n._addParent(this);}(this._finalizers=(e=this._finalizers)!==null&&e!==void 0?e:[]).push(n);}}_hasParent(n){let{_parentage:e}=this;return e===n||Array.isArray(e)&&e.includes(n)}_addParent(n){let{_parentage:e}=this;this._parentage=Array.isArray(e)?(e.push(n),e):e?[e,n]:n;}_removeParent(n){let{_parentage:e}=this;e===n?this._parentage=null:Array.isArray(e)&&Wr(e,n);}remove(n){let{_finalizers:e}=this;e&&Wr(e,n),n instanceof t&&n._removeParent(this);}};ae.EMPTY=(()=>{let t=new ae;return t.closed=true,t})();var Mh=ae.EMPTY;function nd(t){return t instanceof ae||t&&"closed"in t&&se(t.remove)&&se(t.add)&&se(t.unsubscribe)}function hb(t){se(t)?t():t.unsubscribe();}var Sn={Promise:void 0};var ns={setTimeout(t,n,...e){return setTimeout(t,n,...e)},clearTimeout(t){return (clearTimeout)(t)},delegate:void 0};function id(t){ns.setTimeout(()=>{throw t});}function Ua(){}function is(t){t();}var Yr=class extends ae{constructor(n){super(),this.isStopped=false,n?(this.destination=n,nd(n)&&n.add(this)):this.destination=NA;}static create(n,e,i){return new _i(n,e,i)}next(n){this.isStopped?kh():this._next(n);}error(n){this.isStopped?kh():(this.isStopped=true,this._error(n));}complete(){this.isStopped?kh():(this.isStopped=true,this._complete());}unsubscribe(){this.closed||(this.isStopped=true,super.unsubscribe(),this.destination=null);}_next(n){this.destination.next(n);}_error(n){try{this.destination.error(n);}finally{this.unsubscribe();}}_complete(){try{this.destination.complete();}finally{this.unsubscribe();}}};var Rh=class{constructor(n){this.partialObserver=n;}next(n){let{partialObserver:e}=this;if(e.next)try{e.next(n);}catch(i){rd(i);}}error(n){let{partialObserver:e}=this;if(e.error)try{e.error(n);}catch(i){rd(i);}else rd(n);}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete();}catch(e){rd(e);}}},_i=class extends Yr{constructor(n,e,i){super();let r;if(se(n)||!n)r={next:n??void 0,error:e??void 0,complete:i??void 0};else {r=n;}this.destination=new Rh(r);}};function rd(t){id(t);}function OA(t){throw t}function kh(t,n){}var NA={closed:true,next:Ua,error:OA,complete:Ua};var rs=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Kt(t){return t}function Oh(...t){return Nh(t)}function Nh(t){return t.length===0?Kt:t.length===1?t[0]:function(e){return t.reduce((i,r)=>r(i),e)}}var Z=(()=>{class t{constructor(e){e&&(this._subscribe=e);}lift(e){let i=new t;return i.source=this,i.operator=e,i}subscribe(e,i,r){let o=PA(e)?e:new _i(e,i,r);return is(()=>{let{operator:s,source:a}=this;o.add(s?s.call(o,a):a?this._subscribe(o):this._trySubscribe(o));}),o}_trySubscribe(e){try{return this._subscribe(e)}catch(i){e.error(i);}}forEach(e,i){return i=yb(i),new i((r,o)=>{let s=new _i({next:a=>{try{e(a);}catch(l){o(l),s.unsubscribe();}},error:o,complete:r});this.subscribe(s);})}_subscribe(e){var i;return (i=this.source)===null||i===void 0?void 0:i.subscribe(e)}[rs](){return this}pipe(...e){return Nh(e)(this)}toPromise(e){return e=yb(e),new e((i,r)=>{let o;this.subscribe(s=>o=s,s=>r(s),()=>i(o));})}}return t.create=n=>new t(n),t})();function yb(t){var n;return (n=t??Sn.Promise)!==null&&n!==void 0?n:Promise}function FA(t){return t&&se(t.next)&&se(t.error)&&se(t.complete)}function PA(t){return t&&t instanceof Yr||FA(t)&&nd(t)}var bb=ts(t=>function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed";});var _=(()=>{class t extends Z{constructor(){super(),this.closed=false,this.currentObservers=null,this.observers=[],this.isStopped=false,this.hasError=false,this.thrownError=null;}lift(e){let i=new od(this,this);return i.operator=e,i}_throwIfClosed(){if(this.closed)throw new bb}next(e){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(e);}});}error(e){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=true,this.thrownError=e;let{observers:i}=this;for(;i.length;)i.shift().error(e);}});}complete(){is(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=true;let{observers:e}=this;for(;e.length;)e.shift().complete();}});}unsubscribe(){this.isStopped=this.closed=true,this.observers=this.currentObservers=null;}get observed(){var e;return ((e=this.observers)===null||e===void 0?void 0:e.length)>0}_trySubscribe(e){return this._throwIfClosed(),super._trySubscribe(e)}_subscribe(e){return this._throwIfClosed(),this._checkFinalizedStatuses(e),this._innerSubscribe(e)}_innerSubscribe(e){let{hasError:i,isStopped:r,observers:o}=this;return i||r?Mh:(this.currentObservers=null,o.push(e),new ae(()=>{this.currentObservers=null,Wr(o,e);}))}_checkFinalizedStatuses(e){let{hasError:i,thrownError:r,isStopped:o}=this;i?e.error(r):o&&e.complete();}asObservable(){let e=new Z;return e.source=this,e}}return t.create=(n,e)=>new od(n,e),t})(),od=class extends _{constructor(n,e){super(),this.destination=n,this.source=e;}next(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.next)===null||i===void 0||i.call(e,n);}error(n){var e,i;(i=(e=this.destination)===null||e===void 0?void 0:e.error)===null||i===void 0||i.call(e,n);}complete(){var n,e;(e=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||e===void 0||e.call(n);}_subscribe(n){var e,i;return (i=(e=this.source)===null||e===void 0?void 0:e.subscribe(n))!==null&&i!==void 0?i:Mh}};var Ke=class extends _{constructor(n){super(),this._value=n;}get value(){return this.getValue()}_subscribe(n){let e=super._subscribe(n);return !e.closed&&n.next(this._value),e}getValue(){let{hasError:n,thrownError:e,_value:i}=this;if(n)throw e;return this._throwIfClosed(),i}next(n){super.next(this._value=n);}};var De=new Z(t=>t.complete());function sd(t){return t&&se(t.schedule)}function Fh(t){return t[t.length-1]}function ad(t){return se(Fh(t))?t.pop():void 0}function Yn(t){return sd(Fh(t))?t.pop():void 0}function wb(t,n){return typeof Fh(t)=="number"?t.pop():n}function Db(t,n,e,i){function r(o){return o instanceof e?o:new e(function(s){s(o);})}return new(e||(e=Promise))(function(o,s){function a(u){try{c(i.next(u));}catch(f){s(f);}}function l(u){try{c(i.throw(u));}catch(f){s(f);}}function c(u){u.done?o(u.value):r(u.value).then(a,l);}c((i=i.apply(t,[])).next());})}function Cb(t){var n=typeof Symbol=="function"&&Symbol.iterator,e=n&&t[n],i=0;if(e)return e.call(t);if(t&&typeof t.length=="number")return {next:function(){return t&&i>=t.length&&(t=void 0),{value:t&&t[i++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Zr(t){return this instanceof Zr?(this.v=t,this):new Zr(t)}function xb(t,n,e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=e.apply(t,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",s),r[Symbol.asyncIterator]=function(){return this},r;function s(h){return function(p){return Promise.resolve(p).then(h,f)}}function a(h,p){i[h]&&(r[h]=function(b){return new Promise(function(x,P){o.push([h,b,x,P])>1||l(h,b);})},p&&(r[h]=p(r[h])));}function l(h,p){try{c(i[h](p));}catch(b){m(o[0][3],b);}}function c(h){h.value instanceof Zr?Promise.resolve(h.value.v).then(u,f):m(o[0][2],h);}function u(h){l("next",h);}function f(h){l("throw",h);}function m(h,p){h(p),o.shift(),o.length&&l(o[0][0],o[0][1]);}}function Eb(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t[Symbol.asyncIterator],e;return n?n.call(t):(t=typeof Cb=="function"?Cb(t):t[Symbol.iterator](),e={},i("next"),i("throw"),i("return"),e[Symbol.asyncIterator]=function(){return this},e);function i(o){e[o]=t[o]&&function(s){return new Promise(function(a,l){s=t[o](s),r(a,l,s.done,s.value);})};}function r(o,s,a,l){Promise.resolve(l).then(function(c){o({value:c,done:a});},s);}}var ld=t=>t&&typeof t.length=="number"&&typeof t!="function";function cd(t){return se(t?.then)}function dd(t){return se(t[rs])}function ud(t){return Symbol.asyncIterator&&se(t?.[Symbol.asyncIterator])}function fd(t){return new TypeError(`You provided ${t!==null&&typeof t=="object"?"an invalid object":`'${t}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function LA(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var md=LA();function hd(t){return se(t?.[md])}function pd(t){return xb(this,arguments,function*(){let e=t.getReader();try{for(;;){let{value:i,done:r}=yield Zr(e.read());if(r)return yield Zr(void 0);yield yield Zr(i);}}finally{e.releaseLock();}})}function gd(t){return se(t?.getReader)}function ke(t){if(t instanceof Z)return t;if(t!=null){if(dd(t))return jA(t);if(ld(t))return BA(t);if(cd(t))return VA(t);if(ud(t))return Sb(t);if(hd(t))return UA(t);if(gd(t))return HA(t)}throw fd(t)}function jA(t){return new Z(n=>{let e=t[rs]();if(se(e.subscribe))return e.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function BA(t){return new Z(n=>{for(let e=0;e<t.length&&!n.closed;e++)n.next(t[e]);n.complete();})}function VA(t){return new Z(n=>{t.then(e=>{n.closed||(n.next(e),n.complete());},e=>n.error(e)).then(null,id);})}function UA(t){return new Z(n=>{for(let e of t)if(n.next(e),n.closed)return;n.complete();})}function Sb(t){return new Z(n=>{zA(t,n).catch(e=>n.error(e));})}function HA(t){return Sb(pd(t))}function zA(t,n){var e,i,r,o;return Db(this,void 0,void 0,function*(){try{for(e=Eb(t);i=yield e.next(),!i.done;){let s=i.value;if(n.next(s),n.closed)return}}catch(s){r={error:s};}finally{try{i&&!i.done&&(o=e.return)&&(yield o.call(e));}finally{if(r)throw r.error}}n.complete();})}function $t(t,n,e,i=0,r=false){let o=n.schedule(function(){e(),r?t.add(this.schedule(null,i)):this.unsubscribe();},i);if(t.add(o),!r)return o}function Ph(t){return se(t?.lift)}function re(t){return n=>{if(Ph(n))return n.lift(function(e){try{return t(e,this)}catch(i){this.error(i);}});throw new TypeError("Unable to lift unknown Observable type")}}function ne(t,n,e,i,r){return new Lh(t,n,e,i,r)}var Lh=class extends Yr{constructor(n,e,i,r,o,s){super(n),this.onFinalize=o,this.shouldUnsubscribe=s,this._next=e?function(a){try{e(a);}catch(l){n.error(l);}}:super._next,this._error=r?function(a){try{r(a);}catch(l){n.error(l);}finally{this.unsubscribe();}}:super._error,this._complete=i?function(){try{i();}catch(a){n.error(a);}finally{this.unsubscribe();}}:super._complete;}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:e}=this;super.unsubscribe(),!e&&((n=this.onFinalize)===null||n===void 0||n.call(this));}}};function vd(t,n=0){return re((e,i)=>{e.subscribe(ne(i,r=>$t(i,t,()=>i.next(r),n),()=>$t(i,t,()=>i.complete(),n),r=>$t(i,t,()=>i.error(r),n)));})}function _d(t,n=0){return re((e,i)=>{i.add(t.schedule(()=>e.subscribe(i),n));})}function Ib(t,n){return ke(t).pipe(_d(n),vd(n))}function Mb(t,n){return ke(t).pipe(_d(n),vd(n))}function Tb(t,n){return new Z(e=>{let i=0;return n.schedule(function(){i===t.length?e.complete():(e.next(t[i++]),e.closed||this.schedule());})})}function Ab(t,n){return new Z(e=>{let i;return $t(e,n,()=>{i=t[md](),$t(e,n,()=>{let r,o;try{({value:r,done:o}=i.next());}catch(s){e.error(s);return}o?e.complete():e.next(r);},0,true);}),()=>se(i?.return)&&i.return()})}function yd(t,n){if(!t)throw new Error("Iterable cannot be null");return new Z(e=>{$t(e,n,()=>{let i=t[Symbol.asyncIterator]();$t(e,n,()=>{i.next().then(r=>{r.done?e.complete():e.next(r.value);});},0,true);});})}function kb(t,n){return yd(pd(t),n)}function Rb(t,n){if(t!=null){if(dd(t))return Ib(t,n);if(ld(t))return Tb(t,n);if(cd(t))return Mb(t,n);if(ud(t))return yd(t,n);if(hd(t))return Ab(t,n);if(gd(t))return kb(t,n)}throw fd(t)}function Re(t,n){return n?Rb(t,n):ke(t)}function R(...t){let n=Yn(t);return Re(t,n)}var{isArray:$A}=Array,{getPrototypeOf:GA,prototype:WA,keys:qA}=Object;function bd(t){if(t.length===1){let n=t[0];if($A(n))return {args:n,keys:null};if(YA(n)){let e=qA(n);return {args:e.map(i=>n[i]),keys:e}}}return {args:t,keys:null}}function YA(t){return t&&typeof t=="object"&&GA(t)===WA}function T$1(t,n){return re((e,i)=>{let r=0;e.subscribe(ne(i,o=>{i.next(t.call(n,o,r++));}));})}var{isArray:ZA}=Array;function KA(t,n){return ZA(n)?t(...n):t(n)}function wd(t){return T$1(n=>KA(t,n))}function Cd(t,n){return t.reduce((e,i,r)=>(e[i]=n[r],e),{})}function Zn(...t){let n=ad(t),{args:e,keys:i}=bd(t),r=new Z(o=>{let{length:s}=e;if(!s){o.complete();return}let a=new Array(s),l=s,c=s;for(let u=0;u<s;u++){let f=false;ke(e[u]).subscribe(ne(o,m=>{f||(f=true,c--),a[u]=m;},()=>l--,void 0,()=>{(!l||!f)&&(c||o.next(i?Cd(i,a):a),o.complete());}));}});return n?r.pipe(wd(n)):r}function fe(t,n){return re((e,i)=>{let r=0;e.subscribe(ne(i,o=>t.call(n,o,r++)&&i.next(o)));})}function je(t){return re((n,e)=>{let i=null,r=!1,o;i=n.subscribe(ne(e,void 0,void 0,s=>{o=ke(t(s,je(t)(n))),i?(i.unsubscribe(),i=null,o.subscribe(e)):r=!0;})),r&&(i.unsubscribe(),i=null,o.subscribe(e));})}function qe(t){return t<=0?()=>De:re((n,e)=>{let i=0;n.subscribe(ne(e,r=>{++i<=t&&(e.next(r),t<=i&&e.complete());}));})}function xe(t,n){return re((e,i)=>{let r=null,o=0,s=!1,a=()=>s&&!r&&i.complete();e.subscribe(ne(i,l=>{r?.unsubscribe();let c=0,u=o++;ke(t(l,u)).subscribe(r=ne(i,f=>i.next(n?n(l,f,u,c++):f),()=>{r=null,a();}));},()=>{s=!0,a();}));})}function A(t){return re((n,e)=>{ke(t).subscribe(ne(e,()=>e.complete(),Ua)),!e.closed&&n.subscribe(e);})}function tt(t,n,e){let i=se(t)||n||e?{next:t,error:n,complete:e}:t;return i?re((r,o)=>{var s;(s=i.subscribe)===null||s===void 0||s.call(i);let a=!0;r.subscribe(ne(o,l=>{var c;(c=i.next)===null||c===void 0||c.call(i,l),o.next(l);},()=>{var l;a=!1,(l=i.complete)===null||l===void 0||l.call(i),o.complete();},l=>{var c;a=!1,(c=i.error)===null||c===void 0||c.call(i,l),o.error(l);},()=>{var l,c;a&&((l=i.unsubscribe)===null||l===void 0||l.call(i)),(c=i.finalize)===null||c===void 0||c.call(i);}));}):Kt}function Ob(){return re((t,n)=>{let e=null;t._refCount++;let i=ne(n,void 0,void 0,void 0,()=>{if(!t||t._refCount<=0||0<--t._refCount){e=null;return}let r=t._connection,o=e;e=null,r&&(!o||r===o)&&r.unsubscribe(),n.unsubscribe();});t.subscribe(i),i.closed||(e=t.connect());})}var Ha=class extends Z{constructor(n,e){super(),this.source=n,this.subjectFactory=e,this._subject=null,this._refCount=0,this._connection=null,Ph(n)&&(this.lift=n.lift);}_subscribe(n){return this.getSubject().subscribe(n)}getSubject(){let n=this._subject;return (!n||n.isStopped)&&(this._subject=this.subjectFactory()),this._subject}_teardown(){this._refCount=0;let{_connection:n}=this;this._subject=this._connection=null,n?.unsubscribe();}connect(){let n=this._connection;if(!n){n=this._connection=new ae;let e=this.getSubject();n.add(this.source.subscribe(ne(e,void 0,()=>{this._teardown(),e.complete();},i=>{this._teardown(),e.error(i);},()=>this._teardown()))),n.closed&&(this._connection=null,n=ae.EMPTY);}return n}refCount(){return Ob()(this)}};var os={schedule(t){let n=requestAnimationFrame,e=cancelAnimationFrame;let r=n(o=>{e=void 0,t(o);});return new ae(()=>e?.(r))},requestAnimationFrame(...t){let{delegate:n}=os;return (n?.requestAnimationFrame||requestAnimationFrame)(...t)},cancelAnimationFrame(...t){return (cancelAnimationFrame)(...t)},delegate:void 0};var za={now(){return (za.delegate||Date).now()},delegate:void 0};var Zi=class extends _{constructor(n=1/0,e=1/0,i=za){super(),this._bufferSize=n,this._windowTime=e,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=true,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,e);}next(n){let{isStopped:e,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:s}=this;e||(i.push(n),!r&&i.push(o.now()+s)),this._trimBuffer(),super.next(n);}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let e=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let s=0;s<o.length&&!n.closed;s+=i?1:2)n.next(o[s]);return this._checkFinalizedStatuses(n),e}_trimBuffer(){let{_bufferSize:n,_timestampProvider:e,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let s=e.now(),a=0;for(let l=1;l<i.length&&i[l]<=s;l+=2)a=l;a&&i.splice(0,a+1);}}};var Dd=class extends ae{constructor(n,e){super();}schedule(n,e=0){return this}};var $a={setInterval(t,n,...e){let{delegate:i}=$a;return i?.setInterval?i.setInterval(t,n,...e):setInterval(t,n,...e)},clearInterval(t){return (clearInterval)(t)},delegate:void 0};var Ki=class extends Dd{constructor(n,e){super(n,e),this.scheduler=n,this.work=e,this.pending=false;}schedule(n,e=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,e)),this.pending=true,this.delay=e,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,e),this}requestAsyncId(n,e,i=0){return $a.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,e,i=0){if(i!=null&&this.delay===i&&this.pending===false)return e;e!=null&&$a.clearInterval(e);}execute(n,e){if(this.closed)return new Error("executing a cancelled action");this.pending=false;let i=this._execute(n,e);if(i)return i;this.pending===false&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null));}_execute(n,e){let i=false,r;try{this.work(n);}catch(o){i=true,r=o||new Error("Scheduled action threw falsy error");}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:e}=this,{actions:i}=e;this.work=this.state=this.scheduler=null,this.pending=false,Wr(i,this),n!=null&&(this.id=this.recycleAsyncId(e,n,null)),this.delay=null,super.unsubscribe();}}};var QA=1,jh,Bh={};function Nb(t){return t in Bh?(delete Bh[t],true):false}var Fb={setImmediate(t){let n=QA++;return Bh[n]=true,jh||(jh=Promise.resolve()),jh.then(()=>Nb(n)&&t()),n},clearImmediate(t){Nb(t);}};var{setImmediate:XA,clearImmediate:JA}=Fb,Ga={setImmediate(...t){let{delegate:n}=Ga;return (n?.setImmediate||XA)(...t)},clearImmediate(t){return (JA)(t)},delegate:void 0};var xd=class extends Ki{constructor(n,e){super(n,e),this.scheduler=n,this.work=e;}requestAsyncId(n,e,i=0){return i!==null&&i>0?super.requestAsyncId(n,e,i):(n.actions.push(this),n._scheduled||(n._scheduled=Ga.setImmediate(n.flush.bind(n,void 0))))}recycleAsyncId(n,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(n,e,i);let{actions:o}=n;e!=null&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(Ga.clearImmediate(e),n._scheduled===e&&(n._scheduled=void 0));}};var ss=class t{constructor(n,e=t.now){this.schedulerActionCtor=n,this.now=e;}schedule(n,e=0,i){return new this.schedulerActionCtor(this,n).schedule(i,e)}};ss.now=za.now;var Qi=class extends ss{constructor(n,e=ss.now){super(n,e),this.actions=[],this._active=false;}flush(n){let{actions:e}=this;if(this._active){e.push(n);return}let i;this._active=true;do if(i=n.execute(n.state,n.delay))break;while(n=e.shift());if(this._active=false,i){for(;n=e.shift();)n.unsubscribe();throw i}}};var Ed=class extends Qi{flush(n){this._active=true;let e=this._scheduled;this._scheduled=void 0;let{actions:i}=this,r;n=n||i.shift();do if(r=n.execute(n.state,n.delay))break;while((n=i[0])&&n.id===e&&i.shift());if(this._active=false,r){for(;(n=i[0])&&n.id===e&&i.shift();)n.unsubscribe();throw r}}};var Vh=new Ed(xd);var Wa=new Qi(Ki),Pb=Wa;var Sd=class extends Ki{constructor(n,e){super(n,e),this.scheduler=n,this.work=e;}requestAsyncId(n,e,i=0){return i!==null&&i>0?super.requestAsyncId(n,e,i):(n.actions.push(this),n._scheduled||(n._scheduled=os.requestAnimationFrame(()=>n.flush(void 0))))}recycleAsyncId(n,e,i=0){var r;if(i!=null?i>0:this.delay>0)return super.recycleAsyncId(n,e,i);let{actions:o}=n;e!=null&&e===n._scheduled&&((r=o[o.length-1])===null||r===void 0?void 0:r.id)!==e&&(os.cancelAnimationFrame(e),n._scheduled=void 0);}};var Id=class extends Qi{flush(n){this._active=true;let e;n?e=n.id:(e=this._scheduled,this._scheduled=void 0);let{actions:i}=this,r;n=n||i.shift();do if(r=n.execute(n.state,n.delay))break;while((n=i[0])&&n.id===e&&i.shift());if(this._active=false,r){for(;(n=i[0])&&n.id===e&&i.shift();)n.unsubscribe();throw r}}};var Uh=new Id(Sd);function sn(t,n){let e=se(t)?t:()=>t,i=r=>r.error(e());return new Z(i)}function Xi(t){return !!t&&(t instanceof Z||se(t.lift)&&se(t.subscribe))}var Kr=ts(t=>function(){t(this),this.name="EmptyError",this.message="no elements in sequence";});function Lb(t){return t instanceof Date&&!isNaN(t)}function as(...t){let n=Yn(t),e=ad(t),{args:i,keys:r}=bd(t);if(i.length===0)return Re([],n);let o=new Z(ek(i,n,r?s=>Cd(r,s):Kt));return e?o.pipe(wd(e)):o}function ek(t,n,e=Kt){return i=>{jb(n,()=>{let{length:r}=t,o=new Array(r),s=r,a=r;for(let l=0;l<r;l++)jb(n,()=>{let c=Re(t[l],n),u=false;c.subscribe(ne(i,f=>{o[l]=f,u||(u=true,a--),a||i.next(e(o.slice()));},()=>{--s||i.complete();}));},i);},i);}}function jb(t,n,e){t?$t(e,t,n):n();}function Bb(t,n,e,i,r,o,s,a){let l=[],c=0,u=0,f=false,m=()=>{f&&!l.length&&!c&&n.complete();},h=b=>c<i?p(b):l.push(b),p=b=>{c++;let x=false;ke(e(b,u++)).subscribe(ne(n,P=>{n.next(P);},()=>{x=true;},void 0,()=>{if(x)try{for(c--;l.length&&c<i;){let P=l.shift();s?$t(n,s,()=>p(P)):p(P);}m();}catch(P){n.error(P);}}));};return t.subscribe(ne(n,h,()=>{f=true,m();})),()=>{}}function wt(t,n,e=1/0){return se(n)?wt((i,r)=>T$1((o,s)=>n(i,o,r,s))(ke(t(i,r))),e):(typeof n=="number"&&(e=n),re((i,r)=>Bb(i,r,t,e)))}function Ji(t=1/0){return wt(Kt,t)}function Vb(){return Ji(1)}function er(...t){return Vb()(Re(t,Yn(t)))}function In(t){return new Z(n=>{ke(t()).subscribe(n);})}function Ub(t=0,n,e=Pb){let i=-1;return n!=null&&(sd(n)?e=n:i=n),new Z(r=>{let o=Lb(t)?+t-e.now():t;o<0&&(o=0);let s=0;return e.schedule(function(){r.closed||(r.next(s++),0<=i?this.schedule(void 0,i):r.complete());},o)})}function Mn(...t){let n=Yn(t),e=wb(t,1/0),i=t;return i.length?i.length===1?ke(i[0]):Ji(e)(Re(i,n)):De}function Hb(t){return re((n,e)=>{let i=!1,r=null,o=null,s=!1,a=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let c=r;r=null,e.next(c);}s&&e.complete();},l=()=>{o=null,s&&e.complete();};n.subscribe(ne(e,c=>{i=!0,r=c,o||ke(t(c)).subscribe(o=ne(e,a,l));},()=>{s=!0,(!i||!o||o.closed)&&e.complete();}));})}function qa(t,n=Wa){return Hb(()=>Ub(t,n))}function tr(t,n){return se(n)?wt(t,n,1):wt(t,1)}function Qr(t,n=Wa){return re((e,i)=>{let r=null,o=null,s=null,a=()=>{if(r){r.unsubscribe(),r=null;let c=o;o=null,i.next(c);}};function l(){let c=s+t,u=n.now();if(u<c){r=this.schedule(void 0,c-u),i.add(r);return}a();}e.subscribe(ne(i,c=>{o=c,s=n.now(),r||(r=n.schedule(l,t),i.add(r));},()=>{a(),i.complete();},void 0,()=>{o=r=null;}));})}function zb(t){return re((n,e)=>{let i=!1;n.subscribe(ne(e,r=>{i=!0,e.next(r);},()=>{i||e.next(t),e.complete();}));})}function ls(t,n=Kt){return t=t??tk,re((e,i)=>{let r,o=!0;e.subscribe(ne(i,s=>{let a=n(s);(o||!t(r,a))&&(o=!1,r=a,i.next(s));}));})}function tk(t,n){return t===n}function $b(t=nk){return re((n,e)=>{let i=!1;n.subscribe(ne(e,r=>{i=!0,e.next(r);},()=>i?e.complete():e.error(t())));})}function nk(){return new Kr}function Xr(t){return re((n,e)=>{try{n.subscribe(e);}finally{e.add(t);}})}function yi(t,n){let e=arguments.length>=2;return i=>i.pipe(t?fe((r,o)=>t(r,o,i)):Kt,qe(1),e?zb(n):$b(()=>new Kr))}function Md(t){return t<=0?()=>De:re((n,e)=>{let i=[];n.subscribe(ne(e,r=>{i.push(r),t<i.length&&i.shift();},()=>{for(let r of i)e.next(r);e.complete();},void 0,()=>{i=null;}));})}function Ya(){return re((t,n)=>{let e,i=!1;t.subscribe(ne(n,r=>{let o=e;e=r,i&&n.next([o,r]),i=!0;}));})}function Za(t={}){let{connector:n=()=>new _,resetOnError:e=true,resetOnComplete:i=true,resetOnRefCountZero:r=true}=t;return o=>{let s,a,l,c=0,u=false,f=false,m=()=>{a?.unsubscribe(),a=void 0;},h=()=>{m(),s=l=void 0,u=f=false;},p=()=>{let b=s;h(),b?.unsubscribe();};return re((b,x)=>{c++,!f&&!u&&m();let P=l=l??n();x.add(()=>{c--,c===0&&!f&&!u&&(a=Hh(p,r));}),P.subscribe(x),!s&&c>0&&(s=new _i({next:_e=>P.next(_e),error:_e=>{f=!0,m(),a=Hh(h,e,_e),P.error(_e);},complete:()=>{u=!0,m(),a=Hh(h,i),P.complete();}}),ke(b).subscribe(s));})(o)}}function Hh(t,n,...e){if(n===true){t();return}if(n===false)return;let i=new _i({next:()=>{i.unsubscribe(),t();}});return ke(n(...e)).subscribe(i)}function Ka(t,n,e){let i,r=false;return t&&typeof t=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=false,scheduler:e}=t:i=t??1/0,Za({connector:()=>new Zi(i,n,e),resetOnError:true,resetOnComplete:false,resetOnRefCountZero:r})}function Qa(t){return fe((n,e)=>t<=e)}function Ct(...t){let n=Yn(t);return re((e,i)=>{(n?er(t,e,n):er(t,e)).subscribe(i);})}function zh(t,n=false){return re((e,i)=>{let r=0;e.subscribe(ne(i,o=>{let s=t(o,r++);(s||n)&&i.next(o),!s&&i.complete();}));})}var Pt=null,Td=false,Jr=1,ct=Symbol("SIGNAL");function G(t){let n=Pt;return Pt=t,n}function Od(){return Pt}var eo={version:0,lastCleanEpoch:0,dirty:false,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:false,consumerAllowSignalWrites:false,consumerIsAlwaysLive:false,kind:"unknown",producerMustRecompute:()=>false,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function to(t){if(Td)throw new Error("");if(Pt===null)return;Pt.consumerOnSignalRead(t);let n=Pt.producersTail;if(n!==void 0&&n.producer===t)return;let e,i=Pt.recomputing;if(i&&(e=n!==void 0?n.nextProducer:Pt.producers,e!==void 0&&e.producer===t)){Pt.producersTail=e,e.lastReadVersion=t.version,e.knownValidAtEpoch=Jr;return}let r=t.consumersTail;if(r!==void 0&&r.consumer===Pt&&(!i||r.knownValidAtEpoch===Jr))return;let o=ds(Pt),s={producer:t,consumer:Pt,nextProducer:e,prevConsumer:void 0,knownValidAtEpoch:Jr,lastReadVersion:t.version,nextConsumer:void 0};Pt.producersTail=s,n!==void 0?n.nextProducer=s:Pt.producers=s,o&&Yb(t,s);}function Gb(){Jr++;}function Nd(t){if(!(ds(t)&&!t.dirty)&&!(!t.dirty&&t.lastCleanEpoch===Jr)){if(!t.producerMustRecompute(t)&&!cs(t)){Rd(t);return}t.producerRecomputeValue(t),Rd(t);}}function $h(t){if(t.consumers===void 0)return;let n=Td;Td=true;try{for(let e=t.consumers;e!==void 0;e=e.nextConsumer){let i=e.consumer;i.dirty||rk(i);}}finally{Td=n;}}function Gh(){return Pt?.consumerAllowSignalWrites!==false}function rk(t){t.dirty=true,$h(t),t.consumerMarkedDirty?.(t);}function Rd(t){t.dirty=false,t.lastCleanEpoch=Jr;}function nr(t){return t&&Wb(t),G(t)}function Wb(t){if(t.producersTail?.knownValidAtEpoch===Jr){let n=t.producers;for(;n!==void 0;)n.knownValidAtEpoch=null,n=n.nextProducer;}t.producersTail=void 0,t.recomputing=true;}function no(t,n){G(n),t&&qb(t);}function qb(t){t.recomputing=false;let n=t.producersTail,e=n!==void 0?n.nextProducer:t.producers;if(e!==void 0){if(ds(t))do e=Wh(e);while(e!==void 0);n!==void 0?n.nextProducer=void 0:t.producers=void 0;}}function cs(t){for(let n=t.producers;n!==void 0;n=n.nextProducer){let e=n.producer,i=n.lastReadVersion;if(i!==e.version||(Nd(e),i!==e.version))return  true}return  false}function ir(t){if(ds(t)){let n=t.producers;for(;n!==void 0;)n=Wh(n);}t.producers=void 0,t.producersTail=void 0,t.consumers=void 0,t.consumersTail=void 0;}function Yb(t,n){let e=t.consumersTail,i=ds(t);if(e!==void 0?(n.nextConsumer=e.nextConsumer,e.nextConsumer=n):(n.nextConsumer=void 0,t.consumers=n),n.prevConsumer=e,t.consumersTail=n,!i)for(let r=t.producers;r!==void 0;r=r.nextProducer)Yb(r.producer,r);}function Wh(t){let n=t.producer,e=t.nextProducer,i=t.nextConsumer,r=t.prevConsumer;if(t.nextConsumer=void 0,t.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!ds(n)){let o=n.producers;for(;o!==void 0;)o=Wh(o);}return e}function ds(t){return t.consumerIsAlwaysLive||t.consumers!==void 0}function Pd(t,n){return Object.is(t,n)}function Ja(t,n){let e=Object.create(ok);e.computation=t;let i=()=>{if(Nd(e),to(e),e.value===Xa)throw e.error;return e.value};return i[ct]=e,i}var Ad=Symbol("UNSET"),kd=Symbol("COMPUTING"),Xa=Symbol("ERRORED"),ok=Y(v({},eo),{value:Ad,dirty:true,error:null,equal:Pd,kind:"computed",producerMustRecompute(t){return t.value===Ad||t.value===kd},producerRecomputeValue(t){if(t.value===kd)throw new Error("");let n=t.value;t.value=kd;let e=nr(t),i,r=false;try{i=t.computation(),G(null),r=n!==Ad&&n!==Xa&&i!==Xa&&t.equal(n,i);}catch(o){i=Xa,t.error=o;}finally{no(t,e);}if(r){t.value=n;return}t.value=i,t.version++;}});function sk(){throw new Error}var Zb=sk;function Kb(t){Zb(t);}function qh(t){Zb=t;}function Yh(t,n){let e=Object.create(el);e.value=t,n!==void 0&&(e.equal=n);let i=()=>Qb(e);return i[ct]=e,[i,s=>us(e,s),s=>Zh(e,s)]}function Qb(t){return to(t),t.value}function us(t,n){Gh()||Kb(t),t.equal(t.value,n)||(t.value=n,lk(t));}function Zh(t,n){Gh()||Kb(t),us(t,n(t.value));}var el=Y(v({},eo),{equal:Pd,value:void 0,kind:"signal"});function lk(t){t.version++,Gb(),$h(t);}var Kh=Y(v({},eo),{consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,dirty:true,kind:"effect"});function Qh(t){if(t.dirty=false,t.version>0&&!cs(t))return;t.version++;let n=nr(t);try{t.cleanup(),t.fn();}finally{no(t,n);}}var Xh;function Ld(){return Xh}function Kn(t){let n=Xh;return Xh=t,n}var Xb=Symbol("NotFound");function fs(t){return t===Xb||t?.name==="\u0275NotFound"}function Jb(t){let n=G(null);try{return t()}finally{G(n);}}var $d="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",D=class extends Error{code;constructor(n,e){super(Xn(n,e)),this.code=n;}};function ck(t){return `NG0${Math.abs(t)}`}function Xn(t,n){return `${ck(t)}${n?": "+n:""}`}function Ee(t){for(let n in t)if(t[n]===Ee)return n;throw Error("")}function rw(t,n){for(let e in n)n.hasOwnProperty(e)&&!t.hasOwnProperty(e)&&(t[e]=n[e]);}function sl(t){if(typeof t=="string")return t;if(Array.isArray(t))return `[${t.map(sl).join(", ")}]`;if(t==null)return ""+t;let n=t.overriddenName||t.name;if(n)return `${n}`;let e=t.toString();if(e==null)return ""+e;let i=e.indexOf(`
`);return i>=0?e.slice(0,i):e}function Gd(t,n){return t?n?`${t} ${n}`:t:n||""}var dk=Ee({__forward_ref__:Ee});function Qt(t){return t.__forward_ref__=Qt,t}function Dt(t){return up(t)?t():t}function up(t){return typeof t=="function"&&t.hasOwnProperty(dk)&&t.__forward_ref__===Qt}function E(t){return {token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function V(t){return {providers:t.providers||[],imports:t.imports||[]}}function al(t){return uk(t,Wd)}function fp(t){return al(t)!==null}function uk(t,n){return t.hasOwnProperty(n)&&t[n]||null}function fk(t){let n=t?.[Wd]??null;return n||null}function ep(t){return t&&t.hasOwnProperty(Bd)?t[Bd]:null}var Wd=Ee({\u0275prov:Ee}),Bd=Ee({\u0275inj:Ee}),g=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,e){this._desc=n,this.\u0275prov=void 0,typeof e=="number"?this.__NG_ELEMENT_ID__=e:e!==void 0&&(this.\u0275prov=E({token:this,providedIn:e.providedIn||"root",factory:e.factory}));}get multi(){return this}toString(){return `InjectionToken ${this._desc}`}};function mp(t){return t&&!!t.\u0275providers}var hp=Ee({\u0275cmp:Ee}),pp=Ee({\u0275dir:Ee}),gp=Ee({\u0275pipe:Ee}),vp=Ee({\u0275mod:Ee}),nl=Ee({\u0275fac:Ee}),ao=Ee({__NG_ELEMENT_ID__:Ee}),ew=Ee({__NG_ENV_ID__:Ee});function ow(t){return qd(t),t[vp]||null}function Ci(t){return qd(t),t[hp]||null}function _p(t){return qd(t),t[pp]||null}function sw(t){return qd(t),t[gp]||null}function qd(t,n){if(t==null)throw new D(-919,false)}function Yd(t){return typeof t=="string"?t:t==null?"":String(t)}var aw=Ee({ngErrorCode:Ee}),mk=Ee({ngErrorMessage:Ee});Ee({ngTokenPath:Ee});function yp(t,n){return lw("",-200)}function Zd(t,n){throw new D(-201,false)}function lw(t,n,e){let i=new D(n,t);return i[aw]=n,i[mk]=t,i}function pk(t){return t[aw]}var tp;function cw(){return tp}function Lt(t){let n=tp;return tp=t,n}function bp(t,n,e){let i=al(t);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(e&8)return null;if(n!==void 0)return n;Zd();}var Jn=globalThis;var gk={},io=gk,vk="__NG_DI_FLAG__",np=class{injector;constructor(n){this.injector=n;}retrieve(n,e){let i=ro(e)||0;try{return this.injector.get(n,i&8?null:io,i)}catch(r){if(fs(r))return r;throw r}}};function _k(t,n=0){let e=Ld();if(e===void 0)throw new D(-203,false);if(e===null)return bp(t,void 0,n);{let i=yk(n),r=e.retrieve(t,i);if(fs(r)){if(i.optional)return null;throw r}return r}}function L(t,n=0){return (cw()||_k)(Dt(t),n)}function d(t,n){return L(t,ro(n))}function ro(t){return typeof t>"u"||typeof t=="number"?t:0|(t.optional&&8)|(t.host&&1)|(t.self&&2)|(t.skipSelf&&4)}function yk(t){return {optional:!!(t&8),host:!!(t&1),self:!!(t&2),skipSelf:!!(t&4)}}function ip(t){let n=[];for(let e=0;e<t.length;e++){let i=Dt(t[e]);if(Array.isArray(i)){if(i.length===0)throw new D(900,false);let r,o=0;for(let s=0;s<i.length;s++){let a=i[s],l=bk(a);typeof l=="number"?l===-1?r=a.token:o|=l:r=a;}n.push(L(r,o));}else n.push(L(i));}return n}function bk(t){return t[vk]}function rr(t,n){let e=t.hasOwnProperty(nl);return e?t[nl]:null}function dw(t,n,e){if(t.length!==n.length)return  false;for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(e&&(r=e(r),o=e(o)),o!==r)return  false}return  true}function uw(t){return t.flat(Number.POSITIVE_INFINITY)}function Kd(t,n){t.forEach(e=>Array.isArray(e)?Kd(e,n):n(e));}function wp(t,n,e){n>=t.length?t.push(e):t.splice(n,0,e);}function ll(t,n){return n>=t.length-1?t.pop():t.splice(n,1)[0]}function fw(t,n){let e=[];for(let i=0;i<t;i++)e.push(n);return e}function mw(t,n,e,i){let r=t.length;if(r==n)t.push(e,i);else if(r===1)t.push(i,t[0]),t[0]=e;else {for(r--,t.push(t[r-1],t[r]);r>n;){let o=r-2;t[r]=t[o],r--;}t[n]=e,t[n+1]=i;}}function Qd(t,n,e){let i=ps(t,n);return i>=0?t[i|1]=e:(i=~i,mw(t,i,n,e)),i}function Xd(t,n){let e=ps(t,n);if(e>=0)return t[e|1]}function ps(t,n){return wk(t,n,1)}function wk(t,n,e){let i=0,r=t.length>>e;for(;r!==i;){let o=i+(r-i>>1),s=t[o<<e];if(n===s)return o<<e;s>n?r=o:i=o+1;}return ~(r<<e)}var sr={},Tt=[],gs=new g(""),cl=new g("",-1),Cp=new g(""),hs=class{get(n,e=io){if(e===io){let r=lw("",-201);throw r.name="\u0275NotFound",r}return e}};function lo(t){return {\u0275providers:t}}function hw(...t){return {\u0275providers:Dp(true,t),\u0275fromNgModule:true}}function Dp(t,...n){let e=[],i=new Set,r,o=s=>{e.push(s);};return Kd(n,s=>{let a=s;Vd(a,o,[],i)&&(r||=[],r.push(a));}),r!==void 0&&pw(r,o),e}function pw(t,n){for(let e=0;e<t.length;e++){let{ngModule:i,providers:r}=t[e];xp(r,o=>{n(o,i);});}}function Vd(t,n,e,i){if(t=Dt(t),!t)return  false;let r=null,o=ep(t),s=!o&&Ci(t);if(!o&&!s){let l=t.ngModule;if(o=ep(l),o)r=l;else return  false}else {if(s&&!s.standalone)return  false;r=t;}let a=i.has(r);if(s){if(a)return  false;if(i.add(r),s.dependencies){let l=typeof s.dependencies=="function"?s.dependencies():s.dependencies;for(let c of l)Vd(c,n,e,i);}}else if(o){if(o.imports!=null&&!a){i.add(r);let c;Kd(o.imports,u=>{Vd(u,n,e,i)&&(c||=[],c.push(u));}),c!==void 0&&pw(c,n);}if(!a){let c=rr(r)||(()=>new r);n({provide:r,useFactory:c,deps:Tt},r),n({provide:Cp,useValue:r,multi:true},r),n({provide:gs,useValue:()=>L(r),multi:true},r);}let l=o.providers;if(l!=null&&!a){let c=t;xp(l,u=>{n(u,c);});}}else return  false;return r!==t&&t.providers!==void 0}function xp(t,n){for(let e of t)mp(e)&&(e=e.\u0275providers),Array.isArray(e)?xp(e,n):n(e);}var Ck=Ee({provide:String,useValue:Ee});function gw(t){return t!==null&&typeof t=="object"&&Ck in t}function Dk(t){return !!(t&&t.useExisting)}function xk(t){return !!(t&&t.useFactory)}function oo(t){return typeof t=="function"}function vw(t){return !!t.useClass}var dl=new g(""),jd={},tw={},Jh;function vs(){return Jh===void 0&&(Jh=new hs),Jh}var Se=class{},so=class extends Se{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=false;injectorDefTypes;constructor(n,e,i,r){super(),this.parent=e,this.source=i,this.scopes=r,op(n,s=>this.processProvider(s)),this.records.set(cl,ms(void 0,this)),r.has("environment")&&this.records.set(Se,ms(void 0,this));let o=this.records.get(dl);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(Cp,Tt,{self:true}));}retrieve(n,e){let i=ro(e)||0;try{return this.get(n,io,i)}catch(r){if(fs(r))return r;throw r}}destroy(){tl(this),this._destroyed=true;let n=G(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let e=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of e)i();}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),G(n);}}onDestroy(n){return tl(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){tl(this);let e=Kn(this),i=Lt(void 0);try{return n()}finally{Kn(e),Lt(i);}}get(n,e=io,i){if(tl(this),n.hasOwnProperty(ew))return n[ew](this);let r=ro(i),s=Kn(this),a=Lt(void 0);try{if(!(r&4)){let c=this.records.get(n);if(c===void 0){let u=Tk(n)&&al(n);u&&this.injectableDefInScope(u)?c=ms(rp(n),jd):c=null,this.records.set(n,c);}if(c!=null)return this.hydrate(n,c,r)}let l=r&2?vs():this.parent;return e=r&8&&e===io?null:e,l.get(n,e)}catch(l){let c=pk(l);throw c===-200||c===-201?new D(c,null):l}finally{Lt(a),Kn(s);}}resolveInjectorInitializers(){let n=G(null),e=Kn(this),i=Lt(void 0);try{let o=this.get(gs,Tt,{self:!0});for(let s of o)s();}finally{Kn(e),Lt(i),G(n);}}toString(){return "R3Injector[...]"}processProvider(n){n=Dt(n);let e=oo(n)?n:Dt(n&&n.provide),i=Sk(n);if(!oo(n)&&n.multi===true){let r=this.records.get(e);r||(r=ms(void 0,jd,true),r.factory=()=>ip(r.multi),this.records.set(e,r)),e=n,r.multi.push(n);}this.records.set(e,i);}hydrate(n,e,i){let r=G(null);try{if(e.value===tw)throw yp("");return e.value===jd&&(e.value=tw,e.value=e.factory(void 0,i)),typeof e.value=="object"&&e.value&&Mk(e.value)&&this._ngOnDestroyHooks.add(e.value),e.value}finally{G(r);}}injectableDefInScope(n){if(!n.providedIn)return  false;let e=Dt(n.providedIn);return typeof e=="string"?e==="any"||this.scopes.has(e):this.injectorDefTypes.has(e)}removeOnDestroy(n){let e=this._onDestroyHooks.indexOf(n);e!==-1&&this._onDestroyHooks.splice(e,1);}};function rp(t){let n=al(t),e=n!==null?n.factory:rr(t);if(e!==null)return e;if(t instanceof g)throw new D(-204,false);if(t instanceof Function)return Ek(t);throw new D(-204,false)}function Ek(t){if(t.length>0)throw new D(-204,false);let e=fk(t);return e!==null?()=>e.factory(t):()=>new t}function Sk(t){if(gw(t))return ms(void 0,t.useValue);{let n=Ep(t);return ms(n,jd)}}function Ep(t,n,e){let i;if(oo(t)){let r=Dt(t);return rr(r)||rp(r)}else if(gw(t))i=()=>Dt(t.useValue);else if(xk(t))i=()=>t.useFactory(...ip(t.deps||[]));else if(Dk(t))i=(r,o)=>L(Dt(t.useExisting),o!==void 0&&o&8?8:void 0);else {let r=Dt(t&&(t.useClass||t.provide));if(Ik(t))i=()=>new r(...ip(t.deps));else return rr(r)||rp(r)}return i}function tl(t){if(t.destroyed)throw new D(-205,false)}function ms(t,n,e=false){return {factory:t,value:n,multi:e?[]:void 0}}function Ik(t){return !!t.deps}function Mk(t){return t!==null&&typeof t=="object"&&typeof t.ngOnDestroy=="function"}function Tk(t){return typeof t=="function"||typeof t=="object"&&t.ngMetadataName==="InjectionToken"}function op(t,n){for(let e of t)Array.isArray(e)?op(e,n):e&&mp(e)?op(e.\u0275providers,n):n(e);}function ut(t,n){let e;t instanceof so?(tl(t),e=t):e=new np(t);let r=Kn(e),o=Lt(void 0);try{return n()}finally{Kn(r),Lt(o);}}function _w(){return cw()!==void 0||Ld()!=null}var Tn=0,U=1,J=2,dt=3,an=4,At=5,co=6,_s=7,Qe=8,ei=9,An=10,Me=11,ys=12,Sp=13,ar=14,jt=15,lr=16,uo=17,ti=18,ni=19,Ip=20,bi=21,Jd=22,or=23,Xt=24,fo=25,ii=26,Be=27,yw=1,Mp=6,cr=7,ul=8,mo=9,ze=10;function Di(t){return Array.isArray(t)&&typeof t[yw]=="object"}function ln(t){return Array.isArray(t)&&t[yw]===true}function Tp(t){return (t.flags&4)!==0}function xi(t){return t.componentOffset>-1}function bs(t){return (t.flags&1)===1}function ri(t){return !!t.template}function ws(t){return (t[J]&512)!==0}function ho(t){return (t[J]&256)===256}var Ap="svg",bw="math";function cn(t){for(;Array.isArray(t);)t=t[Tn];return t}function kp(t,n){return cn(n[t])}function dn(t,n){return cn(n[t.index])}function eu(t,n){return t.data[n]}function tu(t,n){return t[n]}function Rp(t,n,e,i){e>=t.data.length&&(t.data[e]=null,t.blueprint[e]=null),n[e]=i;}function un(t,n){let e=n[t];return Di(e)?e:e[Tn]}function ww(t){return (t[J]&4)===4}function nu(t){return (t[J]&128)===128}function Cw(t){return ln(t[dt])}function Jt(t,n){return n==null?null:t[n]}function Op(t){t[uo]=0;}function Np(t){t[J]&1024||(t[J]|=1024,nu(t)&&po(t));}function Dw(t,n){for(;t>0;)n=n[ar],t--;return n}function fl(t){return !!(t[J]&9216||t[Xt]?.dirty)}function iu(t){t[An].changeDetectionScheduler?.notify(8),t[J]&64&&(t[J]|=1024),fl(t)&&po(t);}function po(t){t[An].changeDetectionScheduler?.notify(0);let n=wi(t);for(;n!==null&&!(n[J]&8192||(n[J]|=8192,!nu(n)));)n=wi(n);}function ru(t,n){if(ho(t))throw new D(911,false);t[bi]===null&&(t[bi]=[]),t[bi].push(n);}function xw(t,n){if(t[bi]===null)return;let e=t[bi].indexOf(n);e!==-1&&t[bi].splice(e,1);}function wi(t){let n=t[dt];return ln(n)?n[dt]:n}function Fp(t){return t[_s]??=[]}function Pp(t){return t.cleanup??=[]}function Ew(t,n,e,i){let r=Fp(n);r.push(e),t.firstCreatePass&&Pp(t).push(i,r.length-1);}var le={lFrame:Pw(null),bindingsEnabled:true,skipHydrationRootTNode:null};var sp=false;function Sw(){return le.lFrame.elementDepthCount}function Iw(){le.lFrame.elementDepthCount++;}function Lp(){le.lFrame.elementDepthCount--;}function ou(){return le.bindingsEnabled}function jp(){return le.skipHydrationRootTNode!==null}function Bp(t){return le.skipHydrationRootTNode===t}function Vp(){le.skipHydrationRootTNode=null;}function W(){return le.lFrame.lView}function Te(){return le.lFrame.tView}function gt(t){return le.lFrame.contextLView=t,t[Qe]}function vt(t){return le.lFrame.contextLView=null,t}function nt(){let t=Up();for(;t!==null&&t.type===64;)t=t.parent;return t}function Up(){return le.lFrame.currentTNode}function Mw(){let t=le.lFrame,n=t.currentTNode;return t.isParent?n:n.parent}function Cs(t,n){let e=le.lFrame;e.currentTNode=t,e.isParent=n;}function Hp(){return le.lFrame.isParent}function zp(){le.lFrame.isParent=false;}function Tw(){return le.lFrame.contextLView}function $p(){return sp}function il(t){let n=sp;return sp=t,n}function su(){let t=le.lFrame,n=t.bindingRootIndex;return n===-1&&(n=t.bindingRootIndex=t.tView.bindingStartIndex),n}function Aw(t){return le.lFrame.bindingIndex=t}function dr(){return le.lFrame.bindingIndex++}function Gp(t){let n=le.lFrame,e=n.bindingIndex;return n.bindingIndex=n.bindingIndex+t,e}function kw(){return le.lFrame.inI18n}function Rw(t,n){let e=le.lFrame;e.bindingIndex=e.bindingRootIndex=t,au(n);}function Ow(){return le.lFrame.currentDirectiveIndex}function au(t){le.lFrame.currentDirectiveIndex=t;}function Nw(t){let n=le.lFrame.currentDirectiveIndex;return n===-1?null:t[n]}function lu(){return le.lFrame.currentQueryIndex}function ml(t){le.lFrame.currentQueryIndex=t;}function Ak(t){let n=t[U];return n.type===2?n.declTNode:n.type===1?t[At]:null}function Wp(t,n,e){if(e&4){let r=n,o=t;for(;r=r.parent,r===null&&!(e&1);)if(r=Ak(o),r===null||(o=o[ar],r.type&10))break;if(r===null)return  false;n=r,t=o;}let i=le.lFrame=Fw();return i.currentTNode=n,i.lView=t,true}function cu(t){let n=Fw(),e=t[U];le.lFrame=n,n.currentTNode=e.firstChild,n.lView=t,n.tView=e,n.contextLView=t,n.bindingIndex=e.bindingStartIndex,n.inI18n=false;}function Fw(){let t=le.lFrame,n=t===null?null:t.child;return n===null?Pw(t):n}function Pw(t){let n={currentTNode:null,isParent:true,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:false};return t!==null&&(t.child=n),n}function Lw(){let t=le.lFrame;return le.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}var qp=Lw;function du(){let t=Lw();t.isParent=true,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0;}function jw(t){return (le.lFrame.contextLView=Dw(t,le.lFrame.contextLView))[Qe]}function Ei(){return le.lFrame.selectedIndex}function ur(t){le.lFrame.selectedIndex=t;}function Ds(){let t=le.lFrame;return eu(t.tView,t.selectedIndex)}function fr(){le.lFrame.currentNamespace=Ap;}function hl(){kk();}function kk(){le.lFrame.currentNamespace=null;}function Yp(){return le.lFrame.currentNamespace}var Bw=true;function uu(){return Bw}function pl(t){Bw=t;}function ap(t,n=null,e=null,i){let r=Zp(t,n,e);return r.resolveInjectorInitializers(),r}function Zp(t,n=null,e=null,i,r=new Set){let o=[e||Tt,hw(t)];return new so(o,n||vs(),null,r)}var j=class t{static THROW_IF_NOT_FOUND=io;static NULL=new hs;static create(n,e){if(Array.isArray(n))return ap({name:""},e,n);{let i=n.name??"";return ap({name:i},n.parent,n.providers)}}static \u0275prov=E({token:t,providedIn:"any",factory:()=>L(cl)});static __NG_ELEMENT_ID__=-1},B=new g(""),xt=(()=>{class t{static __NG_ELEMENT_ID__=Rk;static __NG_ENV_ID__=e=>e}return t})(),Ud=class extends xt{_lView;constructor(n){super(),this._lView=n;}get destroyed(){return ho(this._lView)}onDestroy(n){let e=this._lView;return ru(e,n),()=>xw(e,n)}};function Rk(){return new Ud(W())}var Vw=false,Uw=new g(""),Si=(()=>{class t{taskId=0;pendingTasks=new Set;destroyed=false;pendingTask=new Ke(false);debugTaskTracker=d(Uw,{optional:true});get hasPendingTasks(){return this.destroyed?false:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new Z(e=>{e.next(false),e.complete();}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(true);let e=this.taskId++;return this.pendingTasks.add(e),this.debugTaskTracker?.add(e),e}has(e){return this.pendingTasks.has(e)}remove(e){this.pendingTasks.delete(e),this.debugTaskTracker?.remove(e),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(false);}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(false),this.destroyed=true,this.pendingTask.unsubscribe();}static \u0275prov=E({token:t,providedIn:"root",factory:()=>new t})}return t})(),lp=class extends _{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=false){super(),this.__isAsync=n,_w()&&(this.destroyRef=d(xt,{optional:true})??void 0,this.pendingTasks=d(Si,{optional:true})??void 0);}emit(n){let e=G(null);try{super.next(n);}finally{G(e);}}subscribe(n,e,i){let r=n,o=e||(()=>null),s=i;if(n&&typeof n=="object"){let l=n;r=l.next?.bind(l),o=l.error?.bind(l),s=l.complete?.bind(l);}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),s&&(s=this.wrapInTimeout(s)));let a=super.subscribe({next:r,error:o,complete:s});return n instanceof ae&&n.add(a),a}wrapInTimeout(n){return e=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(e);}finally{i!==void 0&&this.pendingTasks?.remove(i);}});}}},K=lp;function Hd(...t){}function Kp(t){let n,e;function i(){t=Hd;try{e!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(e),n!==void 0&&clearTimeout(n);}catch{}}return n=setTimeout(()=>{t(),i();}),typeof requestAnimationFrame=="function"&&(e=requestAnimationFrame(()=>{t(),i();})),()=>i()}function Hw(t){return queueMicrotask(()=>t()),()=>{t=Hd;}}var Qp="isAngularZone",rl=Qp+"_ID",Ok=0,O=class t{hasPendingMacrotasks=false;hasPendingMicrotasks=false;isStable=true;onUnstable=new K(false);onMicrotaskEmpty=new K(false);onStable=new K(false);onError=new K(false);constructor(n){let{enableLongStackTrace:e=false,shouldCoalesceEventChangeDetection:i=false,shouldCoalesceRunChangeDetection:r=false,scheduleInRootZone:o=Vw}=n;if(typeof Zone>"u")throw new D(908,false);Zone.assertZonePatched();let s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),e&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!r&&i,s.shouldCoalesceRunChangeDetection=r,s.callbackScheduled=false,s.scheduleInRootZone=o,Pk(s);}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Qp)===true}static assertInAngularZone(){if(!t.isInAngularZone())throw new D(909,false)}static assertNotInAngularZone(){if(t.isInAngularZone())throw new D(909,false)}run(n,e,i){return this._inner.run(n,e,i)}runTask(n,e,i,r){let o=this._inner,s=o.scheduleEventTask("NgZoneEvent: "+r,n,Nk,Hd,Hd);try{return o.runTask(s,e,i)}finally{o.cancelTask(s);}}runGuarded(n,e,i){return this._inner.runGuarded(n,e,i)}runOutsideAngular(n){return this._outer.run(n)}},Nk={};function Xp(t){if(t._nesting==0&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null);}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null));}finally{t.isStable=true;}}}function Fk(t){if(t.isCheckStableRunning||t.callbackScheduled)return;t.callbackScheduled=true;function n(){Kp(()=>{t.callbackScheduled=false,cp(t),t.isCheckStableRunning=true,Xp(t),t.isCheckStableRunning=false;});}t.scheduleInRootZone?Zone.root.run(()=>{n();}):t._outer.run(()=>{n();}),cp(t);}function Pk(t){let n=()=>{Fk(t);},e=Ok++;t._inner=t._inner.fork({name:"angular",properties:{[Qp]:true,[rl]:e,[rl+e]:true},onInvokeTask:(i,r,o,s,a,l)=>{if(Lk(l))return i.invokeTask(o,s,a,l);try{return nw(t),i.invokeTask(o,s,a,l)}finally{(t.shouldCoalesceEventChangeDetection&&s.type==="eventTask"||t.shouldCoalesceRunChangeDetection)&&n(),iw(t);}},onInvoke:(i,r,o,s,a,l,c)=>{try{return nw(t),i.invoke(o,s,a,l,c)}finally{t.shouldCoalesceRunChangeDetection&&!t.callbackScheduled&&!jk(l)&&n(),iw(t);}},onHasTask:(i,r,o,s)=>{i.hasTask(o,s),r===o&&(s.change=="microTask"?(t._hasPendingMicrotasks=s.microTask,cp(t),Xp(t)):s.change=="macroTask"&&(t.hasPendingMacrotasks=s.macroTask));},onHandleError:(i,r,o,s)=>(i.handleError(o,s),t.runOutsideAngular(()=>t.onError.emit(s)),false)});}function cp(t){t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&t.callbackScheduled===true?t.hasPendingMicrotasks=true:t.hasPendingMicrotasks=false;}function nw(t){t._nesting++,t.isStable&&(t.isStable=false,t.onUnstable.emit(null));}function iw(t){t._nesting--,Xp(t);}var ol=class{hasPendingMicrotasks=false;hasPendingMacrotasks=false;isStable=true;onUnstable=new K;onMicrotaskEmpty=new K;onStable=new K;onError=new K;run(n,e,i){return n.apply(e,i)}runGuarded(n,e,i){return n.apply(e,i)}runOutsideAngular(n){return n()}runTask(n,e,i,r){return n.apply(e,i)}};function Lk(t){return zw(t,"__ignore_ng_zone__")}function jk(t){return zw(t,"__scheduler_tick__")}function zw(t,n){return !Array.isArray(t)||t.length!==1?false:t[0]?.data?.[n]===true}var Gt=class{_console=console;handleError(n){this._console.error("ERROR",n);}},fn=new g("",{factory:()=>{let t=d(O),n=d(Se),e;return i=>{t.runOutsideAngular(()=>{n.destroyed&&!e?setTimeout(()=>{throw i}):(e??=n.get(Gt),e.handleError(i));});}}}),$w={provide:gs,useValue:()=>{d(Gt,{optional:true});},multi:true};function ve(t,n){let [e,i,r]=Yh(t,n?.equal),o=e;o[ct];return o.set=i,o.update=r,o.asReadonly=Gw.bind(o),o}function Gw(){let t=this[ct];if(t.readonlyFn===void 0){let n=()=>this();n[ct]=t,t.readonlyFn=n;}return t.readonlyFn}var Ii=new g("",{factory:()=>Bk}),Bk="ng";var fu=new g(""),go=new g("",{providedIn:"platform",factory:()=>"unknown"}),gl=new g(""),vo=new g("",{factory:()=>d(B).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var xs=(()=>{class t{view;node;constructor(e,i){this.view=e,this.node=i;}static __NG_ELEMENT_ID__=Vk}return t})();function Vk(){return new xs(W(),nt())}var Qn=class{},vl=new g("",{factory:()=>true});var Jp=new g(""),mu=(()=>{class t{static \u0275prov=E({token:t,providedIn:"root",factory:()=>new dp})}return t})(),dp=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n);}schedule(n){n.dirty&&this.dirtyEffectCount++;}remove(n){let e=n.zone,i=this.queues.get(e);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--);}enqueue(n){let e=n.zone;this.queues.has(e)||this.queues.set(e,new Set);let i=this.queues.get(e);i.has(n)||i.add(n);}flush(){for(;this.dirtyEffectCount>0;){let n=false;for(let[e,i]of this.queues)e===null?n||=this.flushQueue(i):n||=e.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0);}}flushQueue(n){let e=false;for(let i of n)i.dirty&&(this.dirtyEffectCount--,e=true,i.run());return e}},zd=class{[ct];constructor(n){this[ct]=n;}destroy(){this[ct].destroy();}};function kn(t,n){let e=n?.injector??d(j),i=n?.manualCleanup!==true?e.get(xt):null,r,o=e.get(xs,null,{optional:true}),s=e.get(Qn);return o!==null?(r=zk(o.view,s,t),i instanceof Ud&&i._lView===o.view&&(i=null)):r=$k(t,e.get(mu),s),r.injector=e,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new zd(r)}var Ww=Y(v({},Kh),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let t=il(false);try{Qh(this);}finally{il(t);}},cleanup(){if(!this.cleanupFns?.length)return;let t=G(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()();}finally{this.cleanupFns=[],G(t);}}}),Uk=Y(v({},Ww),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12);},destroy(){if(ir(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.scheduler.remove(this);}}),Hk=Y(v({},Ww),{consumerMarkedDirty(){this.view[J]|=8192,po(this.view),this.notifier.notify(13);},destroy(){if(ir(this),this.onDestroyFns!==null)for(let t of this.onDestroyFns)t();this.cleanup(),this.view[or]?.delete(this);}});function zk(t,n,e){let i=Object.create(Hk);return i.view=t,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=qw(i,e),t[or]??=new Set,t[or].add(i),i.consumerMarkedDirty(i),i}function $k(t,n,e){let i=Object.create(Uk);return i.fn=qw(i,t),i.scheduler=n,i.notifier=e,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function qw(t,n){return ()=>{n(e=>(t.cleanupFns??=[]).push(e));}}function Rn(t){return typeof t=="function"&&t[ct]!==void 0}function hu(t){return Rn(t)&&typeof t.set=="function"}var pu=(()=>{class t{internalPendingTasks=d(Si);scheduler=d(Qn);errorHandler=d(fn);add(){let e=this.internalPendingTasks.add();return ()=>{this.internalPendingTasks.has(e)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(e));}}run(e){let i=this.add();try{e().catch(this.errorHandler).finally(i);}catch(r){this.errorHandler(r),i();}}static \u0275prov=E({token:t,providedIn:"root",factory:()=>new t})}return t})();function Ml(t){return {toString:t}.toString()}var ye=(function(t){return t[t.TemplateCreateStart=0]="TemplateCreateStart",t[t.TemplateCreateEnd=1]="TemplateCreateEnd",t[t.TemplateUpdateStart=2]="TemplateUpdateStart",t[t.TemplateUpdateEnd=3]="TemplateUpdateEnd",t[t.LifecycleHookStart=4]="LifecycleHookStart",t[t.LifecycleHookEnd=5]="LifecycleHookEnd",t[t.OutputStart=6]="OutputStart",t[t.OutputEnd=7]="OutputEnd",t[t.BootstrapApplicationStart=8]="BootstrapApplicationStart",t[t.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",t[t.BootstrapComponentStart=10]="BootstrapComponentStart",t[t.BootstrapComponentEnd=11]="BootstrapComponentEnd",t[t.ChangeDetectionStart=12]="ChangeDetectionStart",t[t.ChangeDetectionEnd=13]="ChangeDetectionEnd",t[t.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",t[t.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",t[t.AfterRenderHooksStart=16]="AfterRenderHooksStart",t[t.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",t[t.ComponentStart=18]="ComponentStart",t[t.ComponentEnd=19]="ComponentEnd",t[t.DeferBlockStateStart=20]="DeferBlockStateStart",t[t.DeferBlockStateEnd=21]="DeferBlockStateEnd",t[t.DynamicComponentStart=22]="DynamicComponentStart",t[t.DynamicComponentEnd=23]="DynamicComponentEnd",t[t.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",t[t.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",t})(ye||{}),Du=class{previousValue;currentValue;firstChange;constructor(n,e,i){this.previousValue=n,this.currentValue=e,this.firstChange=i;}isFirstChange(){return this.firstChange}};function k0(t,n,e,i){n!==null?n.applyValueToInputSignal(n,i):t[e]=i;}var R0=null,Ye=(()=>{R0=Yw;let t=()=>Yw;return t.ngInherit=true,t})();function eR(){return R0}function Yw(t){return t.type.prototype.ngOnChanges&&(t.setInput=nR),tR}function tR(){let t=O0(this),n=t?.current;if(n){let e=t.previous;if(e===sr)t.previous=n;else for(let i in n)e[i]=n[i];t.current=null,this.ngOnChanges(n);}}function nR(t,n,e,i,r){let o=this.declaredInputs[i],s=O0(t)||iR(t,{previous:sr,current:null}),a=s.current||(s.current={}),l=s.previous,c=l[o];a[o]=new Du(c&&c.currentValue,e,l===sr),k0(t,n,r,e);}var ug="__ngSimpleChanges__";function O0(t){return Object.hasOwn(t,ug)&&t[ug]||null}function iR(t,n){return t[ug]=n}var Zw=[];var Ie=function(t,n=null,e){for(let i=0;i<Zw.length;i++){let r=Zw[i];r(t,n,e);}};function rR(t,n,e){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let s=eR()(n);(e.preOrderHooks??=[]).push(t,s),(e.preOrderCheckHooks??=[]).push(t,s);}r&&(e.preOrderHooks??=[]).push(0-t,r),o&&((e.preOrderHooks??=[]).push(t,o),(e.preOrderCheckHooks??=[]).push(t,o));}function N0(t,n){for(let e=n.directiveStart,i=n.directiveEnd;e<i;e++){let o=t.data[e].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:a,ngAfterViewInit:l,ngAfterViewChecked:c,ngOnDestroy:u}=o;s&&(t.contentHooks??=[]).push(-e,s),a&&((t.contentHooks??=[]).push(e,a),(t.contentCheckHooks??=[]).push(e,a)),l&&(t.viewHooks??=[]).push(-e,l),c&&((t.viewHooks??=[]).push(e,c),(t.viewCheckHooks??=[]).push(e,c)),u!=null&&(t.destroyHooks??=[]).push(e,u);}}function yu(t,n,e){F0(t,n,3,e);}function bu(t,n,e,i){(t[J]&3)===e&&F0(t,n,e,i);}function eg(t,n){let e=t[J];(e&3)===n&&(e&=16383,e+=1,t[J]=e);}function F0(t,n,e,i){let r=i!==void 0?t[uo]&65535:0,o=i??-1,s=n.length-1,a=0;for(let l=r;l<s;l++)if(typeof n[l+1]=="number"){if(a=n[l],i!=null&&a>=i)break}else n[l]<0&&(t[uo]+=65536),(a<o||o==-1)&&(oR(t,e,n,l),t[uo]=(t[uo]&4294901760)+l+2),l++;}function Kw(t,n){Ie(ye.LifecycleHookStart,t,n);let e=G(null);try{n.call(t);}finally{G(e),Ie(ye.LifecycleHookEnd,t,n);}}function oR(t,n,e,i){let r=e[i]<0,o=e[i+1],s=r?-e[i]:e[i],a=t[s];r?t[J]>>14<t[uo]>>16&&(t[J]&3)===n&&(t[J]+=16384,Kw(a,o)):Kw(a,o);}var Ss=-1,yo=class{factory;name;injectImpl;resolving=false;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,e,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=e,this.injectImpl=i;}};function sR(t){return (t.flags&8)!==0}function aR(t){return (t.flags&16)!==0}function lR(t,n,e){let i=0;for(;i<e.length;){let r=e[i];if(typeof r=="number"){if(r!==0)break;i++;let o=e[i++],s=e[i++],a=e[i++];t.setAttribute(n,s,a,o);}else {let o=r,s=e[++i];cR(o)?t.setProperty(n,o,s):t.setAttribute(n,o,s),i++;}}return i}function P0(t){return t===3||t===4||t===6}function cR(t){return t.charCodeAt(0)===64}function Is(t,n){if(!(n===null||n.length===0))if(t===null||t.length===0)t=n.slice();else {let e=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?e=r:e===0||(e===-1||e===2?Qw(t,e,r,null,n[++i]):Qw(t,e,r,null,null));}}return t}function Qw(t,n,e,i,r){let o=0,s=t.length;if(n===-1)s=-1;else for(;o<t.length;){let a=t[o++];if(typeof a=="number"){if(a===n){s=-1;break}else if(a>n){s=o-1;break}}}for(;o<t.length;){let a=t[o];if(typeof a=="number")break;if(a===e){r!==null&&(t[o+1]=r);return}o++,r!==null&&o++;}s!==-1&&(t.splice(s,0,n),o=s+1),t.splice(o++,0,e),r!==null&&t.splice(o++,0,r);}function L0(t){return t!==Ss}function xu(t){return t&32767}function dR(t){return t>>16}function Eu(t,n){let e=dR(t),i=n;for(;e>0;)i=i[ar],e--;return i}var fg=true;function Su(t){let n=fg;return fg=t,n}var uR=256,j0=uR-1,B0=5,fR=0,oi={};function mR(t,n,e){let i;typeof e=="string"?i=e.charCodeAt(0)||0:e.hasOwnProperty(ao)&&(i=e[ao]),i==null&&(i=e[ao]=fR++);let r=i&j0,o=1<<r;n.data[t+(r>>B0)]|=o;}function Iu(t,n){let e=V0(t,n);if(e!==-1)return e;let i=n[U];i.firstCreatePass&&(t.injectorIndex=n.length,tg(i.data,t),tg(n,null),tg(i.blueprint,null));let r=Wg(t,n),o=t.injectorIndex;if(L0(r)){let s=xu(r),a=Eu(r,n),l=a[U].data;for(let c=0;c<8;c++)n[o+c]=a[s+c]|l[s+c];}return n[o+8]=r,o}function tg(t,n){t.push(0,0,0,0,0,0,0,0,n);}function V0(t,n){return t.injectorIndex===-1||t.parent&&t.parent.injectorIndex===t.injectorIndex||n[t.injectorIndex+8]===null?-1:t.injectorIndex}function Wg(t,n){if(t.parent&&t.parent.injectorIndex!==-1)return t.parent.injectorIndex;let e=0,i=null,r=n;for(;r!==null;){if(i=G0(r),i===null)return Ss;if(e++,r=r[ar],i.injectorIndex!==-1)return i.injectorIndex|e<<16}return Ss}function mg(t,n,e){mR(t,n,e);}function hR(t,n){if(n==="class")return t.classes;if(n==="style")return t.styles;let e=t.attrs;if(e){let i=e.length,r=0;for(;r<i;){let o=e[r];if(P0(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof e[r]=="string";)r++;else {if(o===n)return e[r+1];r=r+2;}}}return null}function U0(t,n,e){if(e&8||t!==void 0)return t;Zd();}function H0(t,n,e,i){if(e&8&&i===void 0&&(i=null),(e&3)===0){let r=t[ei],o=Lt(void 0);try{return r?r.get(n,i,e&8):bp(n,i,e&8)}finally{Lt(o);}}return U0(i,n,e)}function z0(t,n,e,i=0,r){if(t!==null){if(n[J]&2048&&!(i&2)){let s=_R(t,n,e,i,oi);if(s!==oi)return s}let o=$0(t,n,e,i,oi);if(o!==oi)return o}return H0(n,e,i,r)}function $0(t,n,e,i,r){let o=gR(e);if(typeof o=="function"){if(!Wp(n,t,i))return i&1?U0(r,e,i):H0(n,e,i,r);try{let s;if(s=o(i),s==null&&!(i&8))Zd(e);else return s}finally{qp();}}else if(typeof o=="number"){let s=null,a=V0(t,n),l=Ss,c=i&1?n[jt][At]:null;for((a===-1||i&4)&&(l=a===-1?Wg(t,n):n[a+8],l===Ss||!Jw(i,false)?a=-1:(s=n[U],a=xu(l),n=Eu(l,n)));a!==-1;){let u=n[U];if(Xw(o,a,u.data)){let f=pR(a,n,e,s,i,c);if(f!==oi)return f}l=n[a+8],l!==Ss&&Jw(i,n[U].data[a+8]===c)&&Xw(o,a,n)?(s=u,a=xu(l),n=Eu(l,n)):a=-1;}}return r}function pR(t,n,e,i,r,o){let s=n[U],a=s.data[t+8],l=i==null?xi(a)&&fg:i!=s&&(a.type&3)!==0,c=r&1&&o===a,u=wu(a,s,e,l,c);return u!==null?Cl(n,s,u,a,r):oi}function wu(t,n,e,i,r){let o=t.providerIndexes,s=n.data,a=o&1048575,l=t.directiveStart,c=t.directiveEnd,u=o>>20,f=i?a:a+u,m=r?a+u:c;for(let h=f;h<m;h++){let p=s[h];if(h<l&&e===p||h>=l&&p.type===e)return h}if(r){let h=s[l];if(h&&ri(h)&&h.type===e)return l}return null}function Cl(t,n,e,i,r){let o=t[e],s=n.data;if(o instanceof yo){let a=o;if(a.resolving)throw yp();let l=Su(a.canSeeViewProviders);a.resolving=true;s[e].type||s[e];let f=a.injectImpl?Lt(a.injectImpl):null;Wp(t,i,0);try{o=t[e]=a.factory(void 0,r,s,t,i),n.firstCreatePass&&e>=i.directiveStart&&rR(e,s[e],n);}finally{f!==null&&Lt(f),Su(l),a.resolving=false,qp();}}return o}function gR(t){if(typeof t=="string")return t.charCodeAt(0)||0;let n=t.hasOwnProperty(ao)?t[ao]:void 0;return typeof n=="number"?n>=0?n&j0:vR:n}function Xw(t,n,e){let i=1<<t;return !!(e[n+(t>>B0)]&i)}function Jw(t,n){return !(t&2)&&!(t&1&&n)}var mr=class{_tNode;_lView;constructor(n,e){this._tNode=n,this._lView=e;}get(n,e,i){return z0(this._tNode,this._lView,n,ro(i),e)}};function vR(){return new mr(nt(),W())}function ft(t){return Ml(()=>{let n=t.prototype.constructor,e=n[nl]||hg(n),i=Object.prototype,r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==i;){let o=r[nl]||hg(r);if(o&&o!==e)return o;r=Object.getPrototypeOf(r);}return o=>new o})}function hg(t){return up(t)?()=>{let n=hg(Dt(t));return n&&n()}:rr(t)}function _R(t,n,e,i,r){let o=t,s=n;for(;o!==null&&s!==null&&s[J]&2048&&!ws(s);){let a=$0(o,s,e,i|2,oi);if(a!==oi)return a;let l=o.parent;if(!l){let c=s[Ip];if(c){let u=c.get(e,oi,i&-5);if(u!==oi)return u}l=G0(s),s=s[ar];}o=l;}return r}function G0(t){let n=t[U],e=n.type;return e===2?n.declTNode:e===1?t[At]:null}function Uu(t){return hR(nt(),t)}function S(t){return {token:t.token,providedIn:t.autoProvided===false?null:"root",factory:t.factory,value:void 0}}function yR(){return Rs(nt(),W())}function Rs(t,n){return new F(dn(t,n))}var F=(()=>{class t{nativeElement;constructor(e){this.nativeElement=e;}static __NG_ELEMENT_ID__=yR}return t})();function W0(t){return t instanceof F?t.nativeElement:t}function bR(){return this._results[Symbol.iterator]()}var bo=class{_emitDistinctChangesOnly;dirty=true;_onDirty=void 0;_results=[];_changesDetected=false;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new _}constructor(n=false){this._emitDistinctChangesOnly=n;}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,e){return this._results.reduce(n,e)}forEach(n){this._results.forEach(n);}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,e){this.dirty=false;let i=uw(n);(this._changesDetected=!dw(this._results,i,e))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0]);}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this);}onDirty(n){this._onDirty=n;}setDirty(){this.dirty=true,this._onDirty?.();}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe());}[Symbol.iterator]=bR};function q0(t){return (t.flags&128)===128}var qg=(function(t){return t[t.OnPush=0]="OnPush",t[t.Eager=1]="Eager",t[t.Default=1]="Default",t})(qg||{}),Y0=new Map,wR=0;function CR(){return wR++}function DR(t){Y0.set(t[ni],t);}function pg(t){Y0.delete(t[ni]);}var e0="__ngContext__";function Ms(t,n){Di(n)?(t[e0]=n[ni],DR(n)):t[e0]=n;}function Z0(t){return Q0(t[ys])}function K0(t){return Q0(t[an])}function Q0(t){for(;t!==null&&!ln(t);)t=t[an];return t}var gg;function Yg(t){gg=t;}function X0(){if(gg!==void 0)return gg;if(typeof document<"u")return document;throw new D(210,false)}var J0="r";var eC="di";var Zg=new g(""),tC=false,nC=new g("",{factory:()=>tC});var Hu=new g("");var t0=new WeakMap;function xR(t,n){if(t==null||typeof t!="object")return;let e=t0.get(t);e||(e=new WeakSet,t0.set(t,e)),e.add(n);}function zu(t){return (t.flags&32)===32}var IR=()=>null;function iC(t,n,e=false){return IR()}function rC(t,n){let e=t.contentQueries;if(e!==null){let i=G(null);try{for(let r=0;r<e.length;r+=2){let o=e[r],s=e[r+1];if(s!==-1){let a=t.data[s];ml(o),a.contentQueries(2,n[s],s);}}}finally{G(i);}}}function vg(t,n,e){ml(0);let i=G(null);try{n(t,e);}finally{G(i);}}function Kg(t,n,e){if(Tp(n)){let i=G(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let s=r;s<o;s++){let a=t.data[s];if(a.contentQueries){let l=e[s];a.contentQueries(1,l,s);}}}finally{G(i);}}}var Fn=(function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t[t.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",t})(Fn||{});var gu;function MR(){if(gu===void 0&&(gu=null,Jn.trustedTypes))try{gu=Jn.trustedTypes.createPolicy("angular",{createHTML:t=>t,createScript:t=>t,createScriptURL:t=>t});}catch{}return gu}function $u(t){return MR()?.createHTML(t)||t}var Mi=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n;}toString(){return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${$d})`}},_g=class extends Mi{getTypeName(){return "HTML"}},yg=class extends Mi{getTypeName(){return "Style"}},bg=class extends Mi{getTypeName(){return "Script"}},wg=class extends Mi{getTypeName(){return "URL"}},Cg=class extends Mi{getTypeName(){return "ResourceURL"}};function Ln(t){return t instanceof Mi?t.changingThisBreaksApplicationSecurity:t}function gr(t,n){let e=oC(t);if(e!=null&&e!==n){if(e==="ResourceURL"&&n==="URL")return  true;throw new Error(`Required a safe ${n}, got a ${e} (see ${$d})`)}return e===n}function oC(t){return t instanceof Mi&&t.getTypeName()||null}function Qg(t){return new _g(t)}function Xg(t){return new yg(t)}function Jg(t){return new bg(t)}function ev(t){return new wg(t)}function tv(t){return new Cg(t)}function TR(t){let n=new xg(t);return AR()?new Dg(n):n}var Dg=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n;}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let e=new window.DOMParser().parseFromString($u(n),"text/html").body;return e===null?this.inertDocumentHelper.getInertBodyElement(n):(e.firstChild?.remove(),e)}catch{return null}}},xg=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");}getInertBodyElement(n){let e=this.inertDocument.createElement("template");return e.innerHTML=$u(n),e}};function AR(){try{return !!new window.DOMParser().parseFromString($u(""),"text/html")}catch{return  false}}var kR=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function Tl(t){return t=String(t),t.match(kR)?t:"unsafe:"+t}function Ti(t){let n={};for(let e of t.split(","))n[e]=true;return n}function Al(...t){let n={};for(let e of t)for(let i in e)e.hasOwnProperty(i)&&(n[i]=true);return n}var sC=Ti("area,br,col,hr,img,wbr"),aC=Ti("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),lC=Ti("rp,rt"),RR=Al(lC,aC),OR=Al(aC,Ti("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),NR=Al(lC,Ti("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),n0=Al(sC,OR,NR,RR),cC=Ti("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),FR=Ti("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),PR=Ti("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),LR=Al(cC,FR,PR),jR=Ti("script,style,template"),Eg=class{sanitizedSomething=false;buf=[];sanitizeChildren(n){let e=n.firstChild,i=true,r=[];for(;e;){if(e.nodeType===Node.ELEMENT_NODE?i=this.startElement(e):e.nodeType===Node.TEXT_NODE?this.chars(e.nodeValue):this.sanitizedSomething=true,i&&e.firstChild){r.push(e),e=UR(e);continue}for(;e;){e.nodeType===Node.ELEMENT_NODE&&this.endElement(e);let o=VR(e);if(o){e=o;break}e=r.pop();}}return this.buf.join("")}startElement(n){let e=i0(n).toLowerCase();if(!n0.hasOwnProperty(e))return this.sanitizedSomething=true,!jR.hasOwnProperty(e);this.buf.push("<"),this.buf.push(e);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),s=o.name,a=s.toLowerCase();if(!LR.hasOwnProperty(a)){this.sanitizedSomething=true;continue}let l=o.value;cC[a]&&(l=Tl(l)),this.buf.push(" ",s,'="',r0(l),'"');}return this.buf.push(">"),true}endElement(n){let e=i0(n).toLowerCase();n0.hasOwnProperty(e)&&!sC.hasOwnProperty(e)&&(this.buf.push("</"),this.buf.push(e),this.buf.push(">"));}chars(n){this.buf.push(r0(n));}};function BR(t,n){return (t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function VR(t){let n=t.nextSibling;if(n&&t!==n.previousSibling)throw dC(n);return n}function UR(t){let n=t.firstChild;if(n&&BR(t,n))throw dC(n);return n}function i0(t){let n=t.nodeName;return typeof n=="string"?n:"FORM"}function dC(t){return new Error(`Failed to sanitize html because the element is clobbered: ${t.outerHTML}`)}var HR=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,zR=/([^\#-~ |!])/g;function r0(t){return t.replace(/&/g,"&amp;").replace(HR,function(n){let e=n.charCodeAt(0),i=n.charCodeAt(1);return "&#"+((e-55296)*1024+(i-56320)+65536)+";"}).replace(zR,function(n){return "&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var vu;function nv(t,n){let e=null;try{vu=vu||TR(t);let i=n?String(n):"";e=vu.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=e.innerHTML,e=vu.getInertBodyElement(i);}while(i!==o);let a=new Eg().sanitizeChildren(o0(e)||e);return $u(a)}finally{if(e){let i=o0(e)||e;for(;i.firstChild;)i.firstChild.remove();}}}function o0(t){return "content"in t&&$R(t)?t.content:null}function $R(t){return t.nodeType===Node.ELEMENT_NODE&&t.nodeName==="TEMPLATE"}var GR=/^>|^->|<!--|-->|--!>|<!-$/g,WR=/(<|>)/g,qR="\u200B$1\u200B";function YR(t){return t.replace(GR,n=>n.replace(WR,qR))}function ZR(t,n){return t.createText(n)}function KR(t,n,e){t.setValue(n,e);}function QR(t,n){return t.createComment(YR(n))}function uC(t,n,e){return t.createElement(n,e)}function Mu(t,n,e,i,r){t.insertBefore(n,e,i,r);}function fC(t,n,e){t.appendChild(n,e);}function s0(t,n,e,i,r){i!==null?Mu(t,n,e,i,r):fC(t,n,e);}function mC(t,n,e,i){t.removeChild(null,n,e,i);}function XR(t,n,e){t.setAttribute(n,"style",e);}function JR(t,n,e){e===""?t.removeAttribute(n,"class"):t.setAttribute(n,"class",e);}function hC(t,n,e){let{mergedAttrs:i,classes:r,styles:o}=e;i!==null&&lR(t,n,i),r!==null&&JR(t,n,r),o!==null&&XR(t,n,o);}var _t=(function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t[t.ATTRIBUTE_NO_BINDING=6]="ATTRIBUTE_NO_BINDING",t})(_t||{});function iv(t){let n=eO();return n?n.sanitize(_t.URL,t)||"":gr(t,"URL")?Ln(t):Tl(Yd(t))}function eO(){let t=W();return t&&t[An].sanitizer}function tO(t){return t instanceof Function?t():t}function nO(t,n,e){let i=t.length;for(;;){let r=t.indexOf(n,e);if(r===-1)return r;if(r===0||t.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||t.charCodeAt(r+o)<=32)return r}e=r+1;}}var pC="ng-template";function iO(t,n,e,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&nO(n[r+1].toLowerCase(),e,0)!==-1)return  true}else if(rv(t))return  false;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===e)return  true}return  false}function rv(t){return t.type===4&&t.value!==pC}function rO(t,n,e){let i=t.type===4&&!e?pC:t.value;return n===i}function oO(t,n,e){let i=4,r=t.attrs,o=r!==null?lO(r):0,s=false;for(let a=0;a<n.length;a++){let l=n[a];if(typeof l=="number"){if(!s&&!On(i)&&!On(l))return  false;if(s&&On(l))continue;s=false,i=l|i&1;continue}if(!s)if(i&4){if(i=2|i&1,l!==""&&!rO(t,l,e)||l===""&&n.length===1){if(On(i))return  false;s=true;}}else if(i&8){if(r===null||!iO(t,r,l,e)){if(On(i))return  false;s=true;}}else {let c=n[++a],u=sO(l,r,rv(t),e);if(u===-1){if(On(i))return  false;s=true;continue}if(c!==""){let f;if(u>o?f="":f=r[u+1].toLowerCase(),i&2&&c!==f){if(On(i))return  false;s=true;}}}}return On(i)||s}function On(t){return (t&1)===0}function sO(t,n,e,i){if(n===null)return  -1;let r=0;if(i||!e){let o=false;for(;r<n.length;){let s=n[r];if(s===t)return r;if(s===3||s===6)o=true;else if(s===1||s===2){let a=n[++r];for(;typeof a=="string";)a=n[++r];continue}else {if(s===4)break;if(s===0){r+=4;continue}}r+=o?1:2;}return  -1}else return cO(n,t)}function gC(t,n,e=false){for(let i=0;i<n.length;i++)if(oO(t,n[i],e))return  true;return  false}function aO(t){let n=t.attrs;if(n!=null){let e=n.indexOf(5);if((e&1)===0)return n[e+1]}return null}function lO(t){for(let n=0;n<t.length;n++){let e=t[n];if(P0(e))return n}return t.length}function cO(t,n){let e=t.indexOf(4);if(e>-1)for(e++;e<t.length;){let i=t[e];if(typeof i=="number")return  -1;if(i===n)return e;e++;}return  -1}function dO(t,n){e:for(let e=0;e<n.length;e++){let i=n[e];if(t.length===i.length){for(let r=0;r<t.length;r++)if(t[r]!==i[r])continue e;return  true}}return  false}function a0(t,n){return t?":not("+n.trim()+")":n}function uO(t){let n=t[0],e=1,i=2,r="",o=false;for(;e<t.length;){let s=t[e];if(typeof s=="string")if(i&2){let a=t[++e];r+="["+s+(a.length>0?'="'+a+'"':"")+"]";}else i&8?r+="."+s:i&4&&(r+=" "+s);else r!==""&&!On(s)&&(n+=a0(o,r),r=""),i=s,o=o||!On(i);e++;}return r!==""&&(n+=a0(o,r)),n}function fO(t){return t.map(uO).join(",")}function mO(t){let n=[],e=[],i=1,r=2;for(;i<t.length;){let o=t[i];if(typeof o=="string")r===2?o!==""&&n.push(o,t[++i]):r===8&&e.push(o);else {if(!On(r))break;r=o;}i++;}return e.length&&n.push(1,...e),n}var hn={},Pn=(function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t})(Pn||{}),hO;function ov(t,n){return hO(t,n)}typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Sg=new WeakMap;function vC(t){return t?t[ar]??t:null}var yl=new WeakSet;function pO(t,n,e){let i=Sg.get(t);if(!i||i.length===0)return;let r=n.parentNode,o=n.previousSibling,s=vC(e);for(let a=i.length-1;a>=0;a--){let{el:l,declarationView:c}=i[a],u=l.parentNode;l===n?(i.splice(a,1),yl.add(l),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}}))):o&&l===o?(i.splice(a,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),l.parentNode?.removeChild(l)):u&&r&&u!==r&&(s===null||c===null||s===c)&&(i.splice(a,1),l.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:true}})),l.parentNode?.removeChild(l));}}function gO(t,n,e){let i=vC(e),r=Sg.get(t);r?r.some(o=>o.el===n)||r.push({el:n,declarationView:i}):Sg.set(t,[{el:n,declarationView:i}]);}var hr=new Set,Gu=(function(t){return t[t.CHANGE_DETECTION=0]="CHANGE_DETECTION",t[t.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",t})(Gu||{}),ai=new g(""),l0=new Set;function jn(t){l0.has(t)||(l0.add(t),performance?.mark?.("mark_feature_usage",{detail:{feature:t}}));}var Wu=(()=>{class t{impl=null;execute(){this.impl?.execute();}static \u0275prov=E({token:t,providedIn:"root",factory:()=>new t})}return t})(),sv=[0,1,2,3],av=(()=>{class t{ngZone=d(O);scheduler=d(Qn);errorHandler=d(Gt,{optional:true});sequences=new Set;deferredRegistrations=new Set;executing=false;constructor(){d(ai,{optional:true});}execute(){let e=this.sequences.size>0;e&&Ie(ye.AfterRenderHooksStart),this.executing=true;for(let i of sv)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot));}catch(o){r.erroredOrDestroyed=true,this.errorHandler?.handleError(o);}this.executing=false;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),e&&Ie(ye.AfterRenderHooksEnd);}register(e){let{view:i}=e;i!==void 0?((i[fo]??=[]).push(e),po(i),i[J]|=8192):this.executing?this.deferredRegistrations.add(e):this.addSequence(e);}addSequence(e){this.sequences.add(e),this.scheduler.notify(7);}unregister(e){this.executing&&this.sequences.has(e)?(e.erroredOrDestroyed=true,e.pipelinedValue=void 0,e.once=true):(this.sequences.delete(e),this.deferredRegistrations.delete(e));}maybeTrace(e,i){return i?i.run(Gu.AFTER_NEXT_RENDER,e):e()}static \u0275prov=E({token:t,providedIn:"root",factory:()=>new t})}return t})(),Dl=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=false;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,e,i,r,o,s=null){this.impl=n,this.hooks=e,this.view=i,this.once=r,this.snapshot=s,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy());}afterRun(){this.erroredOrDestroyed=false,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null;}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[fo];n&&(this.view[fo]=n.filter(e=>e!==this));}};function rt(t,n){let e=n?.injector??d(j);return jn("NgAfterNextRender"),_O(t,e,n,true)}function vO(t){return t instanceof Function?[void 0,void 0,t,void 0]:[t.earlyRead,t.write,t.mixedReadWrite,t.read]}function _O(t,n,e,i){let r=n.get(Wu);r.impl??=n.get(av);let o=n.get(ai,null,{optional:true}),s=e?.manualCleanup!==true?n.get(xt):null,a=n.get(xs,null,{optional:true}),l=new Dl(r.impl,vO(t),a?.view,i,s,o?.snapshot(null));return r.impl.register(l),l}var lv=new g("",{factory:()=>{let t=d(Se),n=new Set;return t.onDestroy(()=>n.clear()),{queue:n,isScheduled:false,scheduler:null,injector:t}}});function _C(t,n,e){let i=t.get(lv);if(Array.isArray(n))for(let r of n)i.queue.add(r),e?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),e?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(t);}function yO(t,n){let e=t.get(lv);if(Array.isArray(n))for(let i of n)e.queue.delete(i);else e.queue.delete(n);}function bO(t,n){let e=t.get(lv);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)e.queue.delete(i);n.detachedLeaveAnimationFns=void 0;}}function wO(t,n){for(let[e,i]of n)_C(t,i.animateFns);}function c0(t,n,e,i){let r=t?.[ii]?.enter;n!==null&&r&&r.has(e.index)&&wO(i,r);}function d0(t,n,e,i){try{e.get(cl);}catch{return i(false)}let r=t?.[ii];r?.enter?.has(n.index)&&yO(e,r.enter.get(n.index).animateFns);let o=CO(t,n,r);if(o.size===0){let s=false;if(t){let a=[];qu(t,n,a),s=a.length>0;}if(!s)return i(false)}t&&hr.add(t[ni]),_C(e,()=>DO(t,n,r||void 0,o,i),r||void 0);}function CO(t,n,e){let i=new Map,r=e?.leave;if(r&&r.has(n.index)&&i.set(n.index,r.get(n.index)),t&&r)for(let[o,s]of r){if(i.has(o))continue;let l=t[U].data[o].parent;for(;l;){if(l===n){i.set(o,s);break}l=l.parent;}}return i}function DO(t,n,e,i,r){let o=[];if(e&&e.leave)for(let[s]of i){if(!e.leave.has(s))continue;let a=e.leave.get(s);for(let l of a.animateFns){let{promise:c}=l();o.push(c);}e.detachedLeaveAnimationFns=void 0;}if(t&&qu(t,n,o),o.length>0){let s=e||t?.[ii];if(s){let a=s.running;a&&o.push(a),s.running=Promise.allSettled(o),EO(t,s.running,r);}else Promise.allSettled(o).then(()=>{t&&hr.delete(t[ni]),r(true);});}else t&&hr.delete(t[ni]),r(false);}function qu(t,n,e){if(n.type&12){let r=t[n.index];if(ln(r))for(let o=ze;o<r.length;o++){let s=r[o];s[U].type===2&&xO(s,e);}}let i=n.child;for(;i;)qu(t,i,e),i=i.next;}function xO(t,n){let e=t[ii];if(e&&e.leave)for(let r of e.leave.values())for(let o of r.animateFns){let{promise:s}=o();n.push(s);}let i=t[U].firstChild;for(;i;)qu(t,i,n),i=i.next;}function EO(t,n,e){n.then(()=>{t[ii]?.running===n&&(t[ii].running=void 0,hr.delete(t[ni])),e(true);});}function Es(t,n,e,i,r,o,s,a){if(r!=null){let l,c=false;ln(r)?l=r:Di(r)&&(c=true,r=r[Tn]);let u=cn(r);t===0&&i!==null?(c0(a,i,o,e),s==null?fC(n,i,u):Mu(n,i,u,s||null,true)):t===1&&i!==null?(c0(a,i,o,e),Mu(n,i,u,s||null,true),pO(o,u,a)):t===2?(a?.[ii]?.leave?.has(o.index)&&gO(o,u,a),yl.delete(u),d0(a,o,e,f=>{if(yl.has(u)){yl.delete(u);return}mC(n,u,c,f);})):t===3&&(yl.delete(u),d0(a,o,e,()=>{n.destroyNode(u);})),l!=null&&FO(n,t,e,l,o,i,s);}}function SO(t,n){yC(t,n),n[Tn]=null,n[At]=null;}function IO(t,n,e,i,r,o){i[Tn]=r,i[At]=n,Zu(t,i,e,1,r,o);}function yC(t,n){n[An].changeDetectionScheduler?.notify(9),Zu(t,n,n[Me],2,null,null);}function MO(t){let n=t[ys];if(!n)return ng(t[U],t);for(;n;){let e=null;if(Di(n))e=n[ys];else {let i=n[ze];i&&(e=i);}if(!e){for(;n&&!n[an]&&n!==t;)Di(n)&&ng(n[U],n),n=n[dt];n===null&&(n=t),Di(n)&&ng(n[U],n),e=n&&n[an];}n=e;}}function cv(t,n){let e=t[mo],i=e.indexOf(n);e.splice(i,1);}function Yu(t,n){if(ho(n))return;let e=n[Me];e.destroyNode&&Zu(t,n,e,3,null,null),MO(n);}function ng(t,n){if(ho(n))return;let e=G(null);try{n[J]&=-129,n[J]|=256,n[Xt]&&ir(n[Xt]),AO(t,n),TO(t,n),n[U].type===1&&n[Me].destroy();let i=n[lr];if(i!==null&&ln(n[dt])){i!==n[dt]&&cv(i,n);let r=n[ti];r!==null&&r.detachView(t);}pg(n);}finally{G(e);}}function TO(t,n){let e=t.cleanup,i=n[_s];if(e!==null)for(let s=0;s<e.length-1;s+=2)if(typeof e[s]=="string"){let a=e[s+3];a>=0?i[a]():i[-a].unsubscribe(),s+=2;}else {let a=i[e[s+1]];e[s].call(a);}i!==null&&(n[_s]=null);let r=n[bi];if(r!==null){n[bi]=null;for(let s=0;s<r.length;s++){let a=r[s];a();}}let o=n[or];if(o!==null){n[or]=null;for(let s of o)s.destroy();}}function AO(t,n){let e;if(t!=null&&(e=t.destroyHooks)!=null)for(let i=0;i<e.length;i+=2){let r=n[e[i]];if(!(r instanceof yo)){let o=e[i+1];if(Array.isArray(o))for(let s=0;s<o.length;s+=2){let a=r[o[s]],l=o[s+1];Ie(ye.LifecycleHookStart,a,l);try{l.call(a);}finally{Ie(ye.LifecycleHookEnd,a,l);}}else {Ie(ye.LifecycleHookStart,r,o);try{o.call(r);}finally{Ie(ye.LifecycleHookEnd,r,o);}}}}}function bC(t,n,e){return kO(t,n.parent,e)}function kO(t,n,e){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return e[Tn];if(xi(i)){let{encapsulation:r}=t.data[i.directiveStart+i.componentOffset];if(r===Fn.None||r===Fn.Emulated)return null}return dn(i,e)}function wC(t,n,e){return OO(t,n,e)}function RO(t,n,e){return t.type&40?dn(t,e):null}var OO=RO;function dv(t,n,e,i){let r=bC(t,i,n),o=n[Me],s=i.parent||n[At],a=wC(s,i,n);if(r!=null)if(Array.isArray(e))for(let l=0;l<e.length;l++)s0(o,r,e[l],a,false);else s0(o,r,e,a,false);}function bl(t,n){if(n!==null){let e=n.type;if(e&3)return dn(n,t);if(e&4)return Ig(-1,t[n.index]);if(e&8){let i=n.child;if(i!==null)return bl(t,i);{let r=t[n.index];return ln(r)?Ig(-1,r):cn(r)}}else {if(e&128)return bl(t,n.next);if(e&32)return ov(n,t)()||cn(t[n.index]);{let i=CC(t,n);if(i!==null){if(Array.isArray(i))return i[0];let r=wi(t[jt]);return bl(r,i)}else return bl(t,n.next)}}}return null}function CC(t,n){if(n!==null){let i=t[jt][At],r=n.projection;return i.projection[r]}return null}function Ig(t,n){let e=ze+t+1;if(e<n.length){let i=n[e],r=i[U].firstChild;if(r!==null)return bl(i,r)}return n[cr]}function uv(t,n,e,i,r,o,s){for(;e!=null;){let a=i[ei];if(e.type===128){e=e.next;continue}let l=i[e.index],c=e.type;if(s&&n===0&&(l&&Ms(cn(l),i),e.flags|=2),!zu(e))if(c&8)uv(t,n,e.child,i,r,o,false),Es(n,t,a,r,l,e,o,i);else if(c&32){let u=ov(e,i),f;for(;f=u();)Es(n,t,a,r,f,e,o,i);Es(n,t,a,r,l,e,o,i);}else c&16?DC(t,n,i,e,r,o):Es(n,t,a,r,l,e,o,i);e=s?e.projectionNext:e.next;}}function Zu(t,n,e,i,r,o){uv(e,i,t.firstChild,n,r,o,false);}function NO(t,n,e){let i=n[Me],r=bC(t,e,n),o=e.parent||n[At],s=wC(o,e,n);DC(i,0,n,e,r,s);}function DC(t,n,e,i,r,o){let s=e[jt],l=s[At].projection[i.projection];if(Array.isArray(l))for(let c=0;c<l.length;c++){let u=l[c];Es(n,t,e[ei],r,u,i,o,e);}else {let c=l,u=s[dt];q0(i)&&(c.flags|=128),uv(t,n,c,u,r,o,true);}}function FO(t,n,e,i,r,o,s){let a=i[cr],l=cn(i);a!==l&&Es(n,t,e,o,a,r,s);for(let c=ze;c<i.length;c++){let u=i[c];Zu(u[U],u,t,n,o,a);}}function PO(t,n,e,i,r){if(n)r?t.addClass(e,i):t.removeClass(e,i);else {let o=i.indexOf("-")===-1?void 0:Pn.DashCase;r==null?t.removeStyle(e,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=Pn.Important),t.setStyle(e,i,r,o));}}function fv(t,n,e,i,r,o,s,a,l,c,u){let f=Be+i,m=f+r,h=LO(f,m),p=typeof c=="function"?c():c;return h[U]={type:t,blueprint:h,template:e,queries:null,viewQuery:a,declTNode:n,data:h.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:true,firstUpdatePass:true,staticViewQueries:false,staticContentQueries:false,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof s=="function"?s():s,firstChild:null,schemas:l,consts:p,incompleteFirstPass:false,ssrId:u}}function LO(t,n){let e=[];for(let i=0;i<n;i++)e.push(i<t?null:hn);return e}function jO(t){let n=t.tView;return n===null||n.incompleteFirstPass?t.tView=fv(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts,t.id):n}function mv(t,n,e,i,r,o,s,a,l,c,u){let f=n.blueprint.slice();return f[Tn]=r,f[J]=i|4|128|8|64|1024,(c!==null||t&&t[J]&2048)&&(f[J]|=2048),Op(f),f[dt]=f[ar]=t,f[Qe]=e,f[An]=s||t&&t[An],f[Me]=a||t&&t[Me],f[ei]=l||t&&t[ei]||null,f[At]=o,f[ni]=CR(),f[co]=u,f[Ip]=c,f[jt]=n.type==2?t[jt]:f,f}function BO(t,n,e){let i=dn(n,t),r=jO(e),o=t[An].rendererFactory,s=hv(t,mv(t,r,null,xC(e),i,n,null,o.createRenderer(i,e),null,null,null));return t[n.index]=s}function xC(t){let n=16;return t.signals?n=4096:t.onPush&&(n=64),n}function EC(t,n,e,i){if(e===0)return  -1;let r=n.length;for(let o=0;o<e;o++)n.push(i),t.blueprint.push(i),t.data.push(null);return r}function hv(t,n){return t[ys]?t[Sp][an]=n:t[ys]=n,t[Sp]=n,n}function C(t=1){SC(Te(),W(),Ei()+t);}function SC(t,n,e,i){if((n[J]&3)===3){let o=t.preOrderCheckHooks;o!==null&&yu(n,o,e);}else {let o=t.preOrderHooks;o!==null&&bu(n,o,0,e);}ur(e);}var Ku=(function(t){return t[t.None=0]="None",t[t.SignalBased=1]="SignalBased",t[t.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",t})(Ku||{});function wo(t,n,e,i){let r=G(null);try{let[o,s,a]=t.inputs[e],l=null;(s&Ku.SignalBased)!==0&&(l=n[o][ct]),l!==null&&l.transformFn!==void 0?i=l.transformFn(i):a!==null&&(i=a.call(n,i)),t.setInput!==null?t.setInput(n,l,i,e,o):k0(n,l,o,i);}finally{G(r);}}function IC(t,n,e,i,r){let o=Ei(),s=i&2;try{ur(-1),s&&n.length>Be&&SC(t,n,Be,!1);let a=s?ye.TemplateUpdateStart:ye.TemplateCreateStart;Ie(a,r,e),e(i,r);}finally{ur(o);let a=s?ye.TemplateUpdateEnd:ye.TemplateCreateEnd;Ie(a,r,e);}}function Qu(t,n,e){GO(t,n,e),(e.flags&64)===64&&WO(t,n,e);}function kl(t,n,e=dn){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let s=i[o+1],a=s===-1?e(n,t):t[s];t[r++]=a;}}}function VO(t,n,e,i){let o=i.get(nC,tC)||e===Fn.ShadowDom||e===Fn.ExperimentalIsolatedShadowDom,s=t.selectRootElement(n,o);return s}function zO(t){return t==="class"?"className":t==="for"?"htmlFor":t==="formaction"?"formAction":t==="innerHtml"?"innerHTML":t==="readonly"?"readOnly":t==="tabindex"?"tabIndex":t}function MC(t,n,e,i,r,o){let s=n[U];if(_v(t,s,n,e,i)){xi(t)&&$O(n,t.index);return}t.type&3&&(e=zO(e)),TC(t,n,e,i,r,o);}function TC(t,n,e,i,r,o){if(t.type&3){let s=dn(t,n);i=o!=null?o(i,t.value||"",e):i,r.setProperty(s,e,i);}else t.type&12;}function $O(t,n){let e=un(n,t);e[J]&16||(e[J]|=64);}function GO(t,n,e){let i=e.directiveStart,r=e.directiveEnd;xi(e)&&BO(n,e,t.data[i+e.componentOffset]),t.firstCreatePass||Iu(e,n);let o=e.initialInputs;for(let s=i;s<r;s++){let a=t.data[s],l=Cl(n,t,s,e);if(Ms(l,n),o!==null&&KO(n,s-i,l,a,e,o),ri(a)){let c=un(e.index,n);c[Qe]=Cl(n,t,s,e);}}}function WO(t,n,e){let i=e.directiveStart,r=e.directiveEnd,o=e.index,s=Ow();try{ur(o);for(let a=i;a<r;a++){let l=t.data[a],c=n[a];au(a),(l.hostBindings!==null||l.hostVars!==0||l.hostAttrs!==null)&&qO(l,c);}}finally{ur(-1),au(s);}}function qO(t,n){t.hostBindings!==null&&t.hostBindings(1,n);}function pv(t,n){let e=t.directiveRegistry,i=null;if(e)for(let r=0;r<e.length;r++){let o=e[r];gC(n,o.selectors,false)&&(i??=[],ri(o)?i.unshift(o):i.push(o));}return i}function YO(t,n,e,i,r,o){let s=dn(t,n);ZO(n[Me],s,o,t.value,e,i,r);}function ZO(t,n,e,i,r,o,s){if(o==null)s?.(o,i||"",r),t.removeAttribute(n,r,e);else {let a=s==null?Yd(o):s(o,i||"",r);t.setAttribute(n,r,a,e);}}function KO(t,n,e,i,r,o){let s=o[n];if(s!==null)for(let a=0;a<s.length;a+=2){let l=s[a],c=s[a+1];wo(i,e,l,c);}}function gv(t,n,e,i,r){let o=Be+e,s=n[U],a=r(s,n,t,i,e);n[o]=a,Cs(t,true);let l=t.type===2;return l?(hC(n[Me],a,t),(Sw()===0||bs(t))&&Ms(a,n),Iw()):Ms(a,n),uu()&&(!l||!zu(t))&&dv(s,n,a,t),t}function vv(t){let n=t;return Hp()?zp():(n=n.parent,Cs(n,false)),n}function QO(t,n){let e=t[ei];if(!e)return;let i;try{i=e.get(fn,null);}catch{i=null;}i?.(n);}function _v(t,n,e,i,r){let o=t.inputs?.[i],s=t.hostDirectiveInputs?.[i],a=false;if(s)for(let l=0;l<s.length;l+=2){let c=s[l],u=s[l+1],f=n.data[c];wo(f,e[c],u,r),a=true;}if(o)for(let l of o){let c=e[l],u=n.data[l];wo(u,c,i,r),a=true;}return a}function XO(t,n,e,i,r,o){let s=null,a=null,l=null,c=false,u=t.directiveToIndex.get(i.type);if(typeof u=="number"?s=u:[s,a,l]=u,a!==null&&l!==null&&t.hostDirectiveInputs?.hasOwnProperty(r)){let f=t.hostDirectiveInputs[r];for(let m=0;m<f.length;m+=2){let h=f[m];if(h>=a&&h<=l){let p=n.data[h],b=f[m+1];wo(p,e[h],b,o),c=true;}else if(h>l)break}}return s!==null&&i.inputs.hasOwnProperty(r)&&(wo(i,e[s],r,o),c=true),c}function JO(t,n){let e=un(n,t),i=e[U];eN(i,e);let r=e[Tn];r!==null&&e[co]===null&&(e[co]=iC(r,e[ei])),Ie(ye.ComponentStart);try{yv(i,e,e[Qe]);}finally{Ie(ye.ComponentEnd,e[Qe]);}}function eN(t,n){for(let e=n.length;e<t.blueprint.length;e++)n.push(t.blueprint[e]);}function yv(t,n,e){cu(n);try{let i=t.viewQuery;i!==null&&vg(1,i,e);let r=t.template;r!==null&&IC(t,n,r,1,e),t.firstCreatePass&&(t.firstCreatePass=!1),n[ti]?.finishViewCreation(t),t.staticContentQueries&&rC(t,n),t.staticViewQueries&&vg(2,t.viewQuery,e);let o=t.components;o!==null&&tN(n,o);}catch(i){throw t.firstCreatePass&&(t.incompleteFirstPass=true,t.firstCreatePass=false),i}finally{n[J]&=-5,du();}}function tN(t,n){for(let e=0;e<n.length;e++)JO(t,n[e]);}function Rl(t,n,e,i){let r=G(null);try{let o=n.tView,a=t[J]&4096?4096:16,l=mv(t,o,e,a,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),c=t[n.index];l[lr]=c;let u=t[ti];return u!==null&&(l[ti]=u.createEmbeddedView(o)),yv(o,l,e),l}finally{G(r);}}function Ts(t,n){return !n||n.firstChild===null||q0(t)}function xl(t,n,e,i,r=false){for(;e!==null;){if(e.type===128){e=r?e.projectionNext:e.next;continue}let o=n[e.index];o!==null&&i.push(cn(o)),ln(o)&&AC(o,i);let s=e.type;if(s&8)xl(t,n,e.child,i);else if(s&32){let a=ov(e,n),l;for(;l=a();)i.push(l);}else if(s&16){let a=CC(n,e);if(Array.isArray(a))i.push(...a);else {let l=wi(n[jt]);xl(l[U],l,a,i,true);}}e=r?e.projectionNext:e.next;}return i}function AC(t,n){for(let e=ze;e<t.length;e++){let i=t[e],r=i[U].firstChild;r!==null&&xl(i[U],i,r,n);}t[cr]!==t[Tn]&&n.push(t[cr]);}function kC(t){if(t[fo]!==null){for(let n of t[fo])n.impl.addSequence(n);t[fo].length=0;}}var RC=[];function nN(t){return t[Xt]??iN(t)}function iN(t){let n=RC.pop()??Object.create(oN);return n.lView=t,n}function rN(t){t.lView[Xt]!==t&&(t.lView=null,RC.push(t));}var oN=Y(v({},eo),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:t=>{po(t.lView);},consumerOnSignalRead(){this.lView[Xt]=this;}});function sN(t){let n=t[Xt]??Object.create(aN);return n.lView=t,n}var aN=Y(v({},eo),{consumerIsAlwaysLive:true,kind:"template",consumerMarkedDirty:t=>{let n=wi(t.lView);for(;n&&!OC(n[U]);)n=wi(n);n&&Np(n);},consumerOnSignalRead(){this.lView[Xt]=this;}});function OC(t){return t.type!==2}function NC(t){if(t[or]===null)return;let n=true;for(;n;){let e=false;for(let i of t[or])i.dirty&&(e=true,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=e&&!!(t[J]&8192);}}var lN=100;function FC(t,n=0){let i=t[An].rendererFactory;i.begin?.();try{cN(t,n);}finally{i.end?.();}}function cN(t,n){let e=$p();try{il(!0),Mg(t,n);let i=0;for(;fl(t);){if(i===lN)throw new D(103,!1);i++,Mg(t,1);}}finally{il(e);}}function dN(t,n,e,i){if(ho(n))return;let r=n[J],o=false,s=false;cu(n);let a=true,l=null,c=null;(OC(t)?(c=nN(n),l=nr(c)):Od()===null?(a=false,c=sN(n),l=nr(c)):n[Xt]&&(ir(n[Xt]),n[Xt]=null));try{Op(n),Aw(t.bindingStartIndex),e!==null&&IC(t,n,e,2,i);let u=(r&3)===3;if(!o)if(u){let h=t.preOrderCheckHooks;h!==null&&yu(n,h,null);}else {let h=t.preOrderHooks;h!==null&&bu(n,h,0,null),eg(n,0);}if(s||uN(n),NC(n),PC(n,0),t.contentQueries!==null&&rC(t,n),!o)if(u){let h=t.contentCheckHooks;h!==null&&yu(n,h);}else {let h=t.contentHooks;h!==null&&bu(n,h,1),eg(n,1);}mN(t,n);let f=t.components;f!==null&&jC(n,f,0);let m=t.viewQuery;if(m!==null&&vg(2,m,i),!o)if(u){let h=t.viewCheckHooks;h!==null&&yu(n,h);}else {let h=t.viewHooks;h!==null&&bu(n,h,2),eg(n,2);}if(t.firstUpdatePass===!0&&(t.firstUpdatePass=!1),n[Jd]){for(let h of n[Jd])h();n[Jd]=null;}o||(kC(n),n[J]&=-73);}catch(u){throw po(n),u}finally{c!==null&&(no(c,l),a&&rN(c)),du();}}function PC(t,n){for(let e=Z0(t);e!==null;e=K0(e))for(let i=ze;i<e.length;i++){let r=e[i];LC(r,n);}}function uN(t){for(let n=Z0(t);n!==null;n=K0(n)){if(!(n[J]&2))continue;let e=n[mo];for(let i=0;i<e.length;i++){let r=e[i];Np(r);}}}function fN(t,n,e){Ie(ye.ComponentStart);let i=un(n,t);try{LC(i,e);}finally{Ie(ye.ComponentEnd,i[Qe]);}}function LC(t,n){nu(t)&&Mg(t,n);}function Mg(t,n){let i=t[U],r=t[J],o=t[Xt],s=!!(n===0&&r&16);if(s||=!!(r&64&&n===0),s||=!!(r&1024),s||=!!(o?.dirty&&cs(o)),s||=false,o&&(o.dirty=false),t[J]&=-9217,s)dN(i,t,i.template,t[Qe]);else if(r&8192){let a=G(null);try{NC(t),PC(t,1);let l=i.components;l!==null&&jC(t,l,1),kC(t);}finally{G(a);}}}function jC(t,n,e){for(let i=0;i<n.length;i++)fN(t,n[i],e);}function mN(t,n){let e=t.hostBindingOpCodes;if(e!==null)try{for(let i=0;i<e.length;i++){let r=e[i];if(r<0)ur(~r);else {let o=r,s=e[++i],a=e[++i];Rw(s,o);let l=n[o];Ie(ye.HostBindingsUpdateStart,l);try{a(2,l);}finally{Ie(ye.HostBindingsUpdateEnd,l);}}}}finally{ur(-1);}}function bv(t,n){let e=$p()?64:1088;for(t[An].changeDetectionScheduler?.notify(n);t;){t[J]|=e;let i=wi(t);if(ws(t)&&!i)return t;t=i;}return null}function BC(t,n,e,i){return [t,true,0,n,null,i,null,e,null,null]}function VC(t,n){let e=ze+n;if(e<t.length)return t[e]}function Ol(t,n,e,i=true){let r=n[U];if(hN(r,n,t,e),i){let s=Ig(e,t),a=n[Me],l=a.parentNode(t[cr]);l!==null&&IO(r,t[At],a,n,l,s);}let o=n[co];o!==null&&o.firstChild!==null&&(o.firstChild=null);}function UC(t,n){let e=El(t,n);return e!==void 0&&Yu(e[U],e),e}function El(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e];if(i){let r=i[lr];r!==null&&r!==t&&cv(r,i),n>0&&(t[e-1][an]=i[an]);let o=ll(t,ze+n);SO(i[U],i);let s=o[ti];s!==null&&s.detachView(o[U]),i[dt]=null,i[an]=null,i[J]&=-129;}return i}function hN(t,n,e,i){let r=ze+i,o=e.length;i>0&&(e[r-1][an]=n),i<o-ze?(n[an]=e[r],wp(e,ze+i,n)):(e.push(n),n[an]=null),n[dt]=e;let s=n[lr];s!==null&&e!==s&&HC(s,n);let a=n[ti];a!==null&&a.insertView(t),iu(n),n[J]|=128;}function HC(t,n){let e=t[mo],i=n[dt];if(Di(i))t[J]|=2;else {let r=i[dt][jt];n[jt]!==r&&(t[J]|=2);}e===null?t[mo]=[n]:e.push(n);}var pr=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=false;exhaustive;get rootNodes(){let n=this._lView,e=n[U];return xl(e,n,e.firstChild,[])}constructor(n,e){this._lView=n,this._cdRefInjectingView=e;}get context(){return this._lView[Qe]}set context(n){this._lView[Qe]=n;}get destroyed(){return ho(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[dt];if(ln(n)){let e=n[ul],i=e?e.indexOf(this):-1;i>-1&&(El(n,i),ll(e,i));}this._attachedToViewContainer=false;}Yu(this._lView[U],this._lView);}onDestroy(n){ru(this._lView,n);}markForCheck(){bv(this._cdRefInjectingView||this._lView,4);}detach(){this._lView[J]&=-129;}reattach(){iu(this._lView),this._lView[J]|=128;}detectChanges(){this._lView[J]|=1024,FC(this._lView);}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new D(902,false);this._attachedToViewContainer=true;}detachFromAppRef(){this._appRef=null;let n=ws(this._lView),e=this._lView[lr];e!==null&&!n&&cv(e,this._lView),yC(this._lView[U],this._lView);}attachToAppRef(n){if(this._attachedToViewContainer)throw new D(902,false);this._appRef=n;let e=ws(this._lView),i=this._lView[lr];i!==null&&!e&&HC(i,this._lView),iu(this._lView);}};var Bt=(()=>{class t{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=pN;constructor(e,i,r){this._declarationLView=e,this._declarationTContainer=i,this.elementRef=r;}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(e,i){return this.createEmbeddedViewImpl(e,i)}createEmbeddedViewImpl(e,i,r){let o=Rl(this._declarationLView,this._declarationTContainer,e,{embeddedViewInjector:i,dehydratedView:r});return new pr(o)}}return t})();function pN(){return Xu(nt(),W())}function Xu(t,n){return t.type&4?new Bt(n,t,Rs(t,n)):null}function Os(t,n,e,i,r){let o=t.data[n];if(o===null)o=gN(t,n,e,i,r),kw()&&(o.flags|=32);else if(o.type&64){o.type=e,o.value=i,o.attrs=r;let s=Mw();o.injectorIndex=s===null?-1:s.injectorIndex;}return Cs(o,true),o}function gN(t,n,e,i,r){let o=Up(),s=Hp(),a=s?o:o&&o.parent,l=t.data[n]=_N(t,a,e,n,i,r);return vN(t,l,o,s),l}function vN(t,n,e,i){t.firstChild===null&&(t.firstChild=n),e!==null&&(i?e.child==null&&n.parent!==null&&(e.child=n):e.next===null&&(e.next=n,n.prev=e));}function _N(t,n,e,i,r,o){let s=n?n.injectorIndex:-1,a=0;return jp()&&(a|=128),{type:e,index:i,insertBeforeIndex:null,injectorIndex:s,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,namespace:Yp(),attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function yN(t){let n=t[Mp]??[],i=t[dt][Me],r=[];for(let o of n)o.data[eC]!==void 0?r.push(o):bN(o,i);t[Mp]=r;}function bN(t,n){let e=0,i=t.firstChild;if(i){let r=t.data[J0];for(;e<r;){let o=i.nextSibling;mC(n,i,false),i=o,e++;}}}var wN=()=>null,CN=()=>null;function Tu(t,n){return wN()}function zC(t,n,e){return CN()}var $C=class{},it=class{},Oe=(()=>{class t{destroyNode=null;static __NG_ELEMENT_ID__=()=>DN()}return t})();function DN(){let t=W(),n=nt(),e=un(n.index,t);return (Di(e)?e:t)[Me]}var GC=(()=>{class t{static \u0275prov=E({token:t,providedIn:"root",factory:()=>null})}return t})();function WC(t){return t.debugInfo?.className||t.type.name||null}var Cu={},Au=class{injector;parentInjector;constructor(n,e){this.injector=n,this.parentInjector=e;}get(n,e,i){let r=this.injector.get(n,Cu,i);return r!==Cu||e===Cu?r:this.parentInjector.get(n,e,i)}};function wv(t){return Ju(t)?Array.isArray(t)||!(t instanceof Map)&&Symbol.iterator in t:false}function qC(t,n){if(Array.isArray(t))for(let e=0;e<t.length;e++)n(t[e]);else {let e=t[Symbol.iterator](),i;for(;!(i=e.next()).done;)n(i.value);}}function Ju(t){return t!==null&&(typeof t=="function"||typeof t=="object")}function YC(t,n,e){return t[n]=e}function mn(t,n,e){if(e===hn)return  false;let i=t[n];return Object.is(i,e)?false:(t[n]=e,true)}function xN(t,n,e,i){let r=mn(t,n,e);return mn(t,n+1,i)||r}function _o(t,n,e){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&xR(r,o);let s=xi(t)?un(t.index,n):n;bv(s,5);let a=n[Qe],l=f0(n,a,e,r),c=i.__ngNextListenerFn__;for(;c;)l=f0(n,a,c,r)&&l,c=c.__ngNextListenerFn__;return l}}function f0(t,n,e,i){let r=G(null);try{return Ie(ye.OutputStart,n,e),e(i)!==!1}catch(o){return QO(t,o),false}finally{Ie(ye.OutputEnd,n,e),G(r);}}function Cv(t,n,e,i,r,o,s,a){let l=bs(t),c=false,u=null;if(!i&&l&&(u=SN(n,e,o,t.index)),u!==null){let f=u.__ngLastListenerFn__||u;f.__ngNextListenerFn__=s,u.__ngLastListenerFn__=s,c=true;}else {let f=dn(t,e),m=i?i(f):f;i||(a.__ngNativeEl__=f);let h=r.listen(m,o,a);if(!EN(o)){let p=i?b=>i(cn(b[t.index])):t.index;ZC(p,n,e,o,a,h,false);}}return c}function EN(t){return t.startsWith("animation")||t.startsWith("transition")}function SN(t,n,e,i){let r=t.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let s=r[o];if(s===e&&r[o+1]===i){let a=n[_s],l=r[o+2];return a&&a.length>l?a[l]:null}typeof s=="string"&&(o+=2);}return null}function ZC(t,n,e,i,r,o,s){let a=n.firstCreatePass?Pp(n):null,l=Fp(e),c=l.length;l.push(r,o),a&&a.push(i,t,c,(c+1)*(s?-1:1));}function m0(t,n,e,i,r){let o=null,s=null,a=null,l=false,c=t.directiveToIndex.get(e.type);if(typeof c=="number"?o=c:[o,s,a]=c,s!==null&&a!==null&&t.hostDirectiveOutputs?.hasOwnProperty(i)){let u=t.hostDirectiveOutputs[i];for(let f=0;f<u.length;f+=2){let m=u[f];if(m>=s&&m<=a)l=true,ku(t,n,m,u[f+1],i,r);else if(m>a)break}}return e.outputs.hasOwnProperty(i)&&(l=true,ku(t,n,o,i,i,r)),l}function ku(t,n,e,i,r,o){let s=n[e],a=n[U],c=a.data[e].outputs[i],f=s[c].subscribe(o);ZC(t.index,a,n,r,o,f,true);}function ef(){IN();}function IN(){let t=W(),n=Te(),e=nt();if(n.firstCreatePass&&TN(n,e),e.controlDirectiveIndex===-1)return;jn("NgSignalForms");let i=t[e.controlDirectiveIndex];n.data[e.controlDirectiveIndex].controlDef.create(i,new Ru(t,n,e));}function tf(){MN();}function MN(){let t=W(),n=Te(),e=Ds();if(e.controlDirectiveIndex===-1)return;let i=n.data[e.controlDirectiveIndex].controlDef,r=t[e.controlDirectiveIndex];i.update(r,new Ru(t,n,e));}var Ru=class{lView;tView;tNode;hasPassThrough;constructor(n,e,i){this.lView=n,this.tView=e,this.tNode=i,this.hasPassThrough=!!(i.flags&4096);}get customControl(){return this.tNode.customControlIndex!==-1?this.lView[this.tNode.customControlIndex]:void 0}get nativeElement(){return dn(this.tNode,this.lView)}get descriptor(){return `<${this.tNode.value}>`}listenToCustomControlOutput(n,e){let i=this.tView.data[this.tNode.customControlIndex];m0(this.tNode,this.lView,i,n,_o(this.tNode,this.lView,e));}listenToCustomControlModel(n){let e=this.tNode.flags&1024?"valueChange":"checkedChange",i=this.tView.data[this.tNode.customControlIndex];m0(this.tNode,this.lView,i,e,_o(this.tNode,this.lView,n));}listenToDom(n,e){Cv(this.tNode,this.tView,this.lView,void 0,this.lView[Me],n,e,_o(this.tNode,this.lView,e));}setInputOnDirectives(n,e){let i=this.tNode.inputs?.[n],r=this.tNode.hostDirectiveInputs?.[n];if(!i&&!r)return  false;let o=false;if(i)for(let s of i){if(s===this.tNode.controlDirectiveIndex)continue;let a=this.tView.data[s],l=this.lView[s];wo(a,l,n,e),o=true;}if(r)for(let s=0;s<r.length;s+=2){let a=r[s];if(a===this.tNode.controlDirectiveIndex)continue;let l=r[s+1],c=this.tView.data[a],u=this.lView[a];wo(c,u,l,e),o=true;}return o}setCustomControlModelInput(n){let e=this.tView.data[this.tNode.customControlIndex],i=this.tNode.flags&1024?"value":"checked";XO(this.tNode,this.tView,this.lView,e,i,n);}customControlHasInput(n){if(this.tNode.customControlIndex===-1)return  false;let e=this.tView.data[this.tNode.customControlIndex];return (e.signalFormsInputPresence??=this._buildCustomControlInputCache(e))[n]===true}_buildCustomControlInputCache(n){let e={};for(let i in n.inputs)e[i]=true;if(n.hostDirectives!==null){let i=[...n.hostDirectives];for(;i.length>0;){let r=i.shift();if(typeof r!="function"){for(let s in r.inputs)e[r.inputs[s]]=true;let o=h0(r.directive);o!==null&&i.push(...o);continue}for(let o of r()){if(typeof o=="function")continue;if(o.inputs)for(let a=0;a<o.inputs.length;a+=2){let l=o.inputs[a+1]||o.inputs[a];e[l]=true;}let s=h0(o.directive);s!==null&&i.push(...s);}}}return e}};function h0(t){return typeof t=="function"&&"\u0275dir"in t?t.\u0275dir.hostDirectives??null:null}function TN(t,n,e){for(let r=n.directiveStart;r<n.directiveEnd;r++)if(t.data[r].controlDef){n.controlDirectiveIndex=r;break}if(n.controlDirectiveIndex===-1)return;let i=t.data[n.controlDirectiveIndex].controlDef;if(i.passThroughInput&&(n.inputs?.[i.passThroughInput]?.length??0)>1){n.flags|=4096;return}AN(t,n);}function AN(t,n){for(let e=n.directiveStart;e<n.directiveEnd;e++){let i=t.data[e];if(!(n.directiveToIndex&&!n.directiveToIndex.has(i.type))){if(p0(i,"value")){n.flags|=1024,n.customControlIndex=e;return}if(p0(i,"checked")){n.flags|=2048,n.customControlIndex=e;return}}}if(n.hostDirectiveInputs!==null&&n.hostDirectiveOutputs!==null&&n.directiveToIndex!==null){let e=(i,r)=>{let o=n.hostDirectiveInputs[i],s=n.hostDirectiveOutputs[i+"Change"];if(!o||!s)return  false;for(let a=0;a<o.length;a+=2){let l=o[a];for(let c=0;c<s.length;c+=2){let u=s[c];if(l===u)for(let f of n.directiveToIndex.values()){if(!Array.isArray(f))continue;let[m,h,p]=f;if(l>=h&&l<=p)return n.flags|=r,n.customControlIndex=m,true}}}return  false};if(e("value",1024)||e("checked",2048))return}}function p0(t,n){return kN(t,n)&&RN(t,n+"Change")}function kN(t,n){return n in t.inputs}function RN(t,n){return n in t.outputs}var Tg=Symbol("BINDING");var xo=new g("");function Ou(t,n,e){let i=e?t.styles:null,r=e?t.classes:null,o=0;if(n!==null)for(let s=0;s<n.length;s++){let a=n[s];if(typeof a=="number")o=a;else if(o==1)r=Gd(r,a);else if(o==2){let l=a,c=n[++s];i=Gd(i,l+": "+c+";");}}e?t.styles=i:t.stylesWithoutHost=i,e?t.classes=r:t.classesWithoutHost=r;}function pe(t,n=0){let e=W();if(e===null)return L(t,n);let i=nt();return z0(i,e,Dt(t),n)}function Nl(){let t="invalid";throw new Error(t)}function KC(t,n,e,i,r){let o=i===null?null:{"":-1},s=r(t,e);if(s!==null){let a=s,l=null,c=null;for(let u of s)if(u.resolveHostDirectives!==null){[a,l,c]=u.resolveHostDirectives(s);break}FN(t,n,e,a,o,l,c);}o!==null&&i!==null&&ON(e,i,o);}function ON(t,n,e){let i=t.localNames=[];for(let r=0;r<n.length;r+=2){let o=e[n[r+1]];if(o==null)throw new D(-301,false);i.push(n[r],o);}}function NN(t,n,e){n.componentOffset=e,(t.components??=[]).push(n.index);}function FN(t,n,e,i,r,o,s){let a=i.length,l=null;for(let m=0;m<a;m++){let h=i[m];l===null&&ri(h)&&(l=h,NN(t,e,m)),mg(Iu(e,n),t,h.type);}UN(e,t.data.length,a),l?.viewProvidersResolver&&l.viewProvidersResolver(l);for(let m=0;m<a;m++){let h=i[m];h.providersResolver&&h.providersResolver(h);}let c=false,u=false,f=EC(t,n,a,null);a>0&&(e.directiveToIndex=new Map);for(let m=0;m<a;m++){let h=i[m];if(e.mergedAttrs=Is(e.mergedAttrs,h.hostAttrs),LN(t,e,n,f,h),VN(f,h,r),s!==null&&s.has(h)){let[b,x]=s.get(h);e.directiveToIndex.set(h.type,[f,b+e.directiveStart,x+e.directiveStart]);}else (o===null||!o.has(h))&&e.directiveToIndex.set(h.type,f);h.contentQueries!==null&&(e.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(e.flags|=64);let p=h.type.prototype;!c&&(p.ngOnChanges||p.ngOnInit||p.ngDoCheck)&&((t.preOrderHooks??=[]).push(e.index),c=true),!u&&(p.ngOnChanges||p.ngDoCheck)&&((t.preOrderCheckHooks??=[]).push(e.index),u=true),f++;}PN(t,e,o);}function PN(t,n,e){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=t.data[i];if(e===null||!e.has(r))g0(0,n,r,i),g0(1,n,r,i),_0(n,i,false);else {let o=e.get(r);v0(0,n,o,i),v0(1,n,o,i),_0(n,i,true);}}}function g0(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s;t===0?s=n.inputs??={}:s=n.outputs??={},s[o]??=[],s[o].push(i),QC(n,o);}}function v0(t,n,e,i){let r=t===0?e.inputs:e.outputs;for(let o in r)if(r.hasOwnProperty(o)){let s=r[o],a;t===0?a=n.hostDirectiveInputs??={}:a=n.hostDirectiveOutputs??={},a[s]??=[],a[s].push(i,o),QC(n,s);}}function QC(t,n){n==="class"?t.flags|=8:n==="style"&&(t.flags|=16);}function _0(t,n,e){let{attrs:i,inputs:r,hostDirectiveInputs:o}=t;if(i===null||!e&&r===null||e&&o===null||rv(t)){t.initialInputs??=[],t.initialInputs.push(null);return}let s=null,a=0;for(;a<i.length;){let l=i[a];if(l===0){a+=4;continue}else if(l===5){a+=2;continue}else if(typeof l=="number")break;if(!e&&r.hasOwnProperty(l)){let c=r[l];for(let u of c)if(u===n){s??=[],s.push(l,i[a+1]);break}}else if(e&&o.hasOwnProperty(l)){let c=o[l];for(let u=0;u<c.length;u+=2)if(c[u]===n){s??=[],s.push(c[u+1],i[a+1]);break}}a+=2;}t.initialInputs??=[],t.initialInputs.push(s);}function LN(t,n,e,i,r){t.data[i]=r;let o=r.factory||(r.factory=rr(r.type)),s=new yo(o,ri(r),pe,null);t.blueprint[i]=s,e[i]=s,jN(t,n,i,EC(t,e,r.hostVars,hn),r);}function jN(t,n,e,i,r){let o=r.hostBindings;if(o){let s=t.hostBindingOpCodes;s===null&&(s=t.hostBindingOpCodes=[]);let a=~n.index;BN(s)!=a&&s.push(a),s.push(e,i,o);}}function BN(t){let n=t.length;for(;n>0;){let e=t[--n];if(typeof e=="number"&&e<0)return e}return 0}function VN(t,n,e){if(e){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)e[n.exportAs[i]]=t;ri(n)&&(e[""]=t);}}function UN(t,n,e){t.flags|=1,t.directiveStart=n,t.directiveEnd=n+e,t.providerIndexes=n;}function Dv(t,n,e,i,r,o,s,a){let l=n[U],c=l.consts,u=Jt(c,s),f=Os(l,t,e,i,u);return KC(l,n,f,Jt(c,a),r),f.mergedAttrs=Is(f.mergedAttrs,f.attrs),f.attrs!==null&&Ou(f,f.attrs,false),f.mergedAttrs!==null&&Ou(f,f.mergedAttrs,true),l.queries!==null&&l.queries.elementStart(l,f),f}function xv(t,n){N0(t,n),Tp(n)&&t.queries.elementEnd(n);}function HN(t,n,e,i,r,o){let s=n.consts,a=Jt(s,r),l=Os(n,t,e,i,a);if(l.mergedAttrs=Is(l.mergedAttrs,l.attrs),o!=null){let c=Jt(s,o);l.localNames=[];for(let u=0;u<c.length;u+=2)l.localNames.push(c[u],-1);}return l.attrs!==null&&Ou(l,l.attrs,false),l.mergedAttrs!==null&&Ou(l,l.mergedAttrs,true),n.queries!==null&&n.queries.elementStart(n,l),l}var XC=typeof ShadowRoot<"u",zN=typeof Document<"u";function $N(t){return Object.keys(t).map(n=>{let[e,i,r]=t[n],o={propName:e,templateName:n,isSignal:(i&Ku.SignalBased)!==0};return r&&(o.transform=r),o})}function GN(t){return Object.keys(t).map(n=>({propName:t[n],templateName:n}))}function WN(t,n,e){let i=n instanceof Se?n:n?.injector;return i&&t.getStandaloneInjector!==null&&(i=t.getStandaloneInjector(i)||i),i?new Au(e,i):e}function qN(t){let n=t.get(it,null);if(n===null)throw new D(407,false);let e=t.get(GC,null),i=t.get(Qn,null),r=t.get(ai,null,{optional:true});return {rendererFactory:n,sanitizer:e,changeDetectionScheduler:i,ngReflect:false,tracingService:r}}function YN(t,n){let e=JC(t);return uC(n,e,e==="svg"?Ap:e==="math"?bw:null)}function ZN(t){if(t?.toLowerCase()==="script")throw new D(905,false)}function JC(t){return (t.selectors[0][0]||"div").toLowerCase()}var Co=class{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=$N(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=GN(this.componentDef.outputs),this.cachedOutputs}constructor(n,e){this.componentDef=n,this.ngModule=e,this.componentType=n.type,this.selector=fO(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!e;}create(n,e,i,r,o,s){Ie(ye.DynamicComponentStart);let a=G(null);try{let l=this.componentDef,c=WN(l,r||this.ngModule,n),u=qN(c),f=u.tracingService;return f&&f.componentCreate?f.componentCreate(WC(l),()=>this.createComponentRef(u,c,e,i,o,s)):this.createComponentRef(u,c,e,i,o,s)}finally{G(a);}}createComponentRef(n,e,i,r,o,s){let a=this.componentDef,l=KN(r,a,s,o),c=n.rendererFactory.createRenderer(null,a),u=r?VO(c,r,a.encapsulation,e):YN(a,c);ZN(u?.tagName);let f=e.get(xo,null),m=QN(u,()=>e.get(B,null)??X0());f&&f.addHost(m);let h=s?.some(y0)||o?.some(x=>typeof x!="function"&&x.bindings.some(y0)),p=mv(null,l,null,512|xC(a),null,null,n,c,e,null,iC(u,e,true));f&&XC&&m instanceof ShadowRoot&&ru(p,()=>{f.removeHost(m);}),p[Be]=u,cu(p);let b=null;try{let x=Dv(Be,p,2,"#host",()=>l.directiveRegistry,!0,0);hC(c,u,x),Ms(u,p),Qu(l,p,x),Kg(l,x,p),xv(l,x),i!==void 0&&JN(x,this.ngContentSelectors,i),b=un(x.index,p),p[Qe]=b[Qe],yv(l,p,null);}catch(x){throw b!==null&&pg(b),pg(p),x}finally{Ie(ye.DynamicComponentEnd),du();}return new Nu(this.componentType,p,!!h)}};function KN(t,n,e,i){let r=t?["ng-version","22.0.5"]:mO(n.selectors[0]),o=null,s=null,a=0;if(e)for(let u of e)a+=u[Tg].requiredVars,u.create&&(u.targetIdx=0,(o??=[]).push(u)),u.update&&(u.targetIdx=0,(s??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let f=i[u];if(typeof f!="function")for(let m of f.bindings){a+=m[Tg].requiredVars;let h=u+1;m.create&&(m.targetIdx=h,(o??=[]).push(m)),m.update&&(m.targetIdx=h,(s??=[]).push(m));}}let l=[n];if(i)for(let u of i){let f=typeof u=="function"?u:u.type,m=_p(f);l.push(m);}return fv(0,null,XN(o,s),1,a,l,null,null,null,[r],null)}function QN(t,n){let e=t.getRootNode?.();return zN&&e instanceof Document?e.head:e&&XC&&e instanceof ShadowRoot?e:n().head}function XN(t,n){return !t&&!n?null:e=>{if(e&1&&t)for(let i of t)i.create();if(e&2&&n)for(let i of n)i.update();}}function y0(t){let n=t[Tg].kind;return n==="input"||n==="twoWay"}var Nu=class extends $C{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,e,i){super(),this._rootLView=e,this._hasInputBindings=i,this._tNode=eu(e[U],Be),this.location=Rs(this._tNode,e),this.instance=un(this._tNode.index,e)[Qe],this.hostView=this.changeDetectorRef=new pr(e,void 0),this.componentType=n;}setInput(n,e){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),e))return;let r=this._rootLView;_v(i,r[U],r,n,e);this.previousInputValues.set(n,e);let s=un(i.index,r);bv(s,1);}get injector(){return new mr(this._tNode,this._rootLView)}destroy(){this.hostView.destroy();}onDestroy(n){this.hostView.onDestroy(n);}};function JN(t,n,e){let i=t.projection=[];for(let r=0;r<n.length;r++){let o=e[r];i.push(o!=null&&o.length?Array.from(o):null);}}var kt=(()=>{class t{static __NG_ELEMENT_ID__=eF}return t})();function eF(){let t=nt();return eD(t,W())}var Ag=class t extends kt{_lContainer;_hostTNode;_hostLView;constructor(n,e,i){super(),this._lContainer=n,this._hostTNode=e,this._hostLView=i;}get element(){return Rs(this._hostTNode,this._hostLView)}get injector(){return new mr(this._hostTNode,this._hostLView)}get parentInjector(){let n=Wg(this._hostTNode,this._hostLView);if(L0(n)){let e=Eu(n,this._hostLView),i=xu(n),r=e[U].data[i+8];return new mr(r,e)}else return new mr(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1);}get(n){let e=b0(this._lContainer);return e!==null&&e[n]||null}get length(){return this._lContainer.length-ze}createEmbeddedView(n,e,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let s=Tu(this._lContainer,n.ssrId),a=n.createEmbeddedViewImpl(e||{},o,s);return this.insertImpl(a,r,Ts(this._hostTNode,s)),a}createComponent(n,e,i,r,o,s,a){let l,c=e||{};l=c.index,i=c.injector,r=c.projectableNodes,o=c.environmentInjector||c.ngModuleRef,s=c.directives,a=c.bindings;let u=new Co(Ci(n)),f=i||this.parentInjector;if(!o&&u.ngModule==null){let P=this.parentInjector.get(Se,null);P&&(o=P);}let m=Ci(u.componentType??{}),h=Tu(this._lContainer,m?.id??null),p=null,b=u.create(f,r,p,o,s,a);return this.insertImpl(b.hostView,l,Ts(this._hostTNode,h)),b}insert(n,e){return this.insertImpl(n,e,true)}insertImpl(n,e,i){let r=n._lView;if(Cw(r)){let a=this.indexOf(n);if(a!==-1)this.detach(a);else {let l=r[dt],c=new t(l,l[At],l[dt]);c.detach(c.indexOf(n));}}let o=this._adjustIndex(e),s=this._lContainer;return Ol(s,r,o,i),n.attachToViewContainerRef(),wp(ig(s),o,n),n}move(n,e){return this.insert(n,e)}indexOf(n){let e=b0(this._lContainer);return e!==null?e.indexOf(n):-1}remove(n){let e=this._adjustIndex(n,-1),i=El(this._lContainer,e);i&&(ll(ig(this._lContainer),e),Yu(i[U],i));}detach(n){let e=this._adjustIndex(n,-1),i=El(this._lContainer,e);return i&&ll(ig(this._lContainer),e)!=null?new pr(i):null}_adjustIndex(n,e=0){return n??this.length+e}};function b0(t){return t[ul]}function ig(t){return t[ul]||(t[ul]=[])}function eD(t,n){let e,i=n[t.index];return ln(i)?e=i:(e=BC(i,n,null,t),n[t.index]=e,hv(n,e)),nF(e,n,t,i),new Ag(e,t,n)}function tF(t,n){let e=t[Me],i=e.createComment(""),r=dn(n,t),o=e.parentNode(r);return Mu(e,o,i,e.nextSibling(r),false),i}var nF=oF;function oF(t,n,e,i){if(t[cr])return;let r;e.type&8?r=cn(i):r=tF(n,e),t[cr]=r;}var kg=class t{queryList;matches=null;constructor(n){this.queryList=n;}clone(){return new t(this.queryList)}setDirty(){this.queryList.setDirty();}},Rg=class t{queries;constructor(n=[]){this.queries=n;}createEmbeddedView(n){let e=n.queries;if(e!==null){let i=n.contentQueries!==null?n.contentQueries[0]:e.length,r=[];for(let o=0;o<i;o++){let s=e.getByIndex(o),a=this.queries[s.indexInDeclarationView];r.push(a.clone());}return new t(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n);}detachView(n){this.dirtyQueriesWithMatches(n);}finishViewCreation(n){this.dirtyQueriesWithMatches(n);}dirtyQueriesWithMatches(n){for(let e=0;e<this.queries.length;e++)Sv(n,e).matches!==null&&this.queries[e].setDirty();}},Fu=class{flags;read;predicate;constructor(n,e,i=null){this.flags=e,this.read=i,typeof n=="string"?this.predicate=dF(n):this.predicate=n;}},Og=class t{queries;constructor(n=[]){this.queries=n;}elementStart(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,e);}elementEnd(n){for(let e=0;e<this.queries.length;e++)this.queries[e].elementEnd(n);}embeddedTView(n){let e=null;for(let i=0;i<this.length;i++){let r=e!==null?e.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,e!==null?e.push(o):e=[o]);}return e!==null?new t(e):null}template(n,e){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,e);}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n);}},Ng=class t{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=false;_declarationNodeIndex;_appliesToNextNode=true;constructor(n,e=-1){this.metadata=n,this._declarationNodeIndex=e;}elementStart(n,e){this.isApplyingToNode(e)&&this.matchTNode(n,e);}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=false);}template(n,e){this.elementStart(n,e);}embeddedTView(n,e){return this.isApplyingToNode(n)?(this.crossesNgTemplate=true,this.addMatch(-n.index,e),new t(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let e=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==e;)i=i.parent;return e===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,e){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,e,sF(e,o)),this.matchTNodeWithReadOption(n,e,wu(e,n,o,false,false));}else i===Bt?e.type&4&&this.matchTNodeWithReadOption(n,e,-1):this.matchTNodeWithReadOption(n,e,wu(e,n,i,false,false));}matchTNodeWithReadOption(n,e,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===F||r===kt||r===Bt&&e.type&4)this.addMatch(e.index,-2);else {let o=wu(e,n,r,false,false);o!==null&&this.addMatch(e.index,o);}else this.addMatch(e.index,i);}}addMatch(n,e){this.matches===null?this.matches=[n,e]:this.matches.push(n,e);}};function sF(t,n){let e=t.localNames;if(e!==null){for(let i=0;i<e.length;i+=2)if(e[i]===n)return e[i+1]}return null}function aF(t,n){return t.type&11?Rs(t,n):t.type&4?Xu(t,n):null}function lF(t,n,e,i){return e===-1?aF(n,t):e===-2?cF(t,n,i):Cl(t,t[U],e,n)}function cF(t,n,e){if(e===F)return Rs(n,t);if(e===Bt)return Xu(n,t);if(e===kt)return eD(n,t)}function tD(t,n,e,i){let r=n[ti].queries[i];if(r.matches===null){let o=t.data,s=e.matches,a=[];for(let l=0;s!==null&&l<s.length;l+=2){let c=s[l];if(c<0)a.push(null);else {let u=o[c];a.push(lF(n,u,s[l+1],e.metadata.read));}}r.matches=a;}return r.matches}function Fg(t,n,e,i){let r=t.queries.getByIndex(e),o=r.matches;if(o!==null){let s=tD(t,n,r,e);for(let a=0;a<o.length;a+=2){let l=o[a];if(l>0)i.push(s[a/2]);else {let c=o[a+1],u=n[-l];for(let f=ze;f<u.length;f++){let m=u[f];m[lr]===m[dt]&&Fg(m[U],m,c,i);}if(u[mo]!==null){let f=u[mo];for(let m=0;m<f.length;m++){let h=f[m];Fg(h[U],h,c,i);}}}}}return i}function Ev(t,n){return t[ti].queries[n].queryList}function nD(t,n,e){let i=new bo((e&4)===4);return Ew(t,n,i,i.destroy),(n[ti]??=new Rg).queries.push(new kg(i))-1}function iD(t,n,e){let i=Te();return i.firstCreatePass&&(oD(i,new Fu(t,n,e),-1),(n&2)===2&&(i.staticViewQueries=true)),nD(i,W(),n)}function rD(t,n,e,i){let r=Te();if(r.firstCreatePass){let o=nt();oD(r,new Fu(n,e,i),o.index),uF(r,t),(e&2)===2&&(r.staticContentQueries=true);}return nD(r,W(),e)}function dF(t){return t.split(",").map(n=>n.trim())}function oD(t,n,e){t.queries===null&&(t.queries=new Og),t.queries.track(new Ng(n,e));}function uF(t,n){let e=t.contentQueries||(t.contentQueries=[]),i=e.length?e[e.length-1]:-1;n!==i&&e.push(t.queries.length-1,n);}function Sv(t,n){return t.queries.getByIndex(n)}function sD(t,n){let e=t[U],i=Sv(e,n);return i.crossesNgTemplate?Fg(e,t,n,[]):tD(e,t,i,n)}function aD(t,n,e){let i,r=Ja(()=>{i._dirtyCounter();let o=fF(i,t);if(n&&o===void 0)throw new D(-951,false);return o});return i=r[ct],i._dirtyCounter=ve(0),i._flatValue=void 0,r}function Iv(t){return aD(true,false)}function Mv(t){return aD(true,true)}function lD(t,n){let e=t[ct];e._lView=W(),e._queryIndex=n,e._queryList=Ev(e._lView,n),e._queryList.onDirty(()=>e._dirtyCounter.update(i=>i+1));}function fF(t,n){let e=t._lView,i=t._queryIndex;if(e===void 0||i===void 0||e[J]&4)return n?void 0:Tt;let r=Ev(e,i),o=sD(e,i);return r.reset(o,W0),n?r.first:r._changesDetected||t._flatValue===void 0?t._flatValue=r.toArray():t._flatValue}function Ai(t){return !!t&&typeof t.then=="function"}function nf(t){return !!t&&typeof t.subscribe=="function"}var si=class{},rf=class{};var Pu=class extends si{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];constructor(n,e,i,r=true){super(),this.ngModuleType=n,this._parent=e;let o=ow(n);this._bootstrapComponents=tO(o.bootstrap),this._r3Injector=Zp(n,e,[{provide:si,useValue:this},...i],sl(n),new Set(["environment"])),r&&this.resolveInjectorInitializers();}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType);}get injector(){return this._r3Injector}destroy(){let n=this._r3Injector;!n.destroyed&&n.destroy(),this.destroyCbs.forEach(e=>e()),this.destroyCbs=null;}onDestroy(n){this.destroyCbs.push(n);}},Lu=class extends rf{moduleType;constructor(n){super(),this.moduleType=n;}create(n){return new Pu(this.moduleType,n,[])}};var Sl=class extends si{injector;instance=null;constructor(n){super();let e=new so([...n.providers,{provide:si,useValue:this}],n.parent||vs(),n.debugName,new Set(["environment"]));this.injector=e,n.runEnvironmentInitializers&&e.resolveInjectorInitializers();}destroy(){this.injector.destroy();}onDestroy(n){this.injector.onDestroy(n);}};function Ns(t,n,e=null){return new Sl({providers:t,parent:n,debugName:e,runEnvironmentInitializers:true}).injector}var mF=(()=>{class t{_injector;cachedInjectors=new Map;constructor(e){this._injector=e;}getOrCreateStandaloneInjector(e){if(!e.standalone)return null;if(!this.cachedInjectors.has(e)){let i=Dp(false,e.type),r=i.length>0?Ns([i],this._injector,""):null;this.cachedInjectors.set(e,r);}return this.cachedInjectors.get(e)}ngOnDestroy(){try{for(let e of this.cachedInjectors.values())e!==null&&e.destroy();}finally{this.cachedInjectors.clear();}}static \u0275prov=E({token:t,providedIn:"environment",factory:()=>new t(L(Se))})}return t})();function k(t){return Ml(()=>{let n=cD(t),e=Y(v({},n),{decls:t.decls,vars:t.vars,template:t.template,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,onPush:t.changeDetection!==qg.Eager,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&t.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(mF).getOrCreateStandaloneInjector(e):null,getExternalStyles:null,signals:t.signals??false,data:t.data||{},encapsulation:t.encapsulation||Fn.Emulated,styles:t.styles||Tt,_:null,schemas:t.schemas||null,tView:null,id:""});n.standalone&&jn("NgStandalone"),dD(e);let i=t.dependencies;return e.directiveDefs=w0(i,hF),e.pipeDefs=w0(i,sw),e.id=vF(e),e})}function hF(t){return Ci(t)||_p(t)}function H(t){return Ml(()=>({type:t.type,bootstrap:t.bootstrap||Tt,declarations:t.declarations||Tt,imports:t.imports||Tt,exports:t.exports||Tt,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null}))}function pF(t,n){if(t==null)return sr;let e={};for(let i in t)if(t.hasOwnProperty(i)){let r=t[i],o,s,a,l;Array.isArray(r)?(a=r[0],o=r[1],s=r[2]??o,l=r[3]||null):(o=r,s=r,a=Ku.None,l=null),e[o]=[i,a,l],n[o]=s;}return e}function gF(t){if(t==null)return sr;let n={};for(let e in t)t.hasOwnProperty(e)&&(n[t[e]]=e);return n}function I(t){return Ml(()=>{let n=cD(t);return dD(n),n})}function of(t){return {type:t.type,name:t.name,factory:null,pure:t.pure!==false,standalone:t.standalone??true,onDestroy:t.type.prototype.ngOnDestroy||null}}function cD(t){let n={};return {type:t.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:n,inputConfig:t.inputs||sr,exportAs:t.exportAs||null,standalone:t.standalone??true,signals:t.signals===true,selectors:t.selectors||Tt,viewQuery:t.viewQuery||null,features:t.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,signalFormsInputPresence:null,inputs:pF(t.inputs,n),outputs:gF(t.outputs),debugInfo:null}}function dD(t){t.features?.forEach(n=>n(t));}function w0(t,n){return t?()=>{let e=typeof t=="function"?t():t,i=[];for(let r of e){let o=n(r);o!==null&&i.push(o);}return i}:null}function vF(t){let n=0,e=typeof t.consts=="function"?"":t.consts,i=[t.selectors,t.ngContentSelectors,t.hostVars,t.hostAttrs,e,t.vars,t.decls,t.encapsulation,t.standalone,t.signals,t.exportAs,JSON.stringify(t.inputs),JSON.stringify(t.outputs),Object.getOwnPropertyNames(t.type.prototype),!!t.contentQueries,!!t.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}var Tv=new g("");function sf(t){return lo([{provide:Tv,multi:true,useValue:t}])}var Av=(()=>{class t{resolve;reject;initialized=false;done=false;donePromise=new Promise((e,i)=>{this.resolve=e,this.reject=i;});appInits=d(Tv,{optional:true})??[];injector=d(j);constructor(){}runInitializers(){if(this.initialized)return;let e=[];for(let r of this.appInits){let o=ut(this.injector,r);if(Ai(o))e.push(o);else if(nf(o)){let s=new Promise((a,l)=>{o.subscribe({complete:a,error:l});});e.push(s);}}let i=()=>{this.done=true,this.resolve();};Promise.all(e).then(()=>{i();}).catch(r=>{this.reject(r);}),e.length===0&&i(),this.initialized=true;}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function kv(t){return n=>{n.controlDef={create:(e,i)=>{e?.\u0275ngControlCreate(i);},update:(e,i)=>{e?.\u0275ngControlUpdate?.(i);},passThroughInput:t};}}function _F(t){return Object.getPrototypeOf(t.prototype).constructor}function ge(t){let n=_F(t.type),e=true,i=[t];for(;n;){let r;if(ri(t))r=n.\u0275cmp||n.\u0275dir;else {if(n.\u0275cmp)throw new D(903,false);r=n.\u0275dir;}if(r){if(e){i.push(r);let s=t;s.inputs=rg(t.inputs),s.declaredInputs=rg(t.declaredInputs),s.outputs=rg(t.outputs);let a=r.hostBindings;a&&DF(t,a);let l=r.viewQuery,c=r.contentQueries;if(l&&wF(t,l),c&&CF(t,c),yF(t,r),rw(t.outputs,r.outputs),ri(r)&&r.data.animation){let u=t.data;u.animation=(u.animation||[]).concat(r.data.animation);}}let o=r.features;if(o)for(let s=0;s<o.length;s++){let a=o[s];a&&a.ngInherit&&a(t),a===ge&&(e=false);}}n=Object.getPrototypeOf(n);}bF(i);}function yF(t,n){for(let e in n.inputs){if(!n.inputs.hasOwnProperty(e)||t.inputs.hasOwnProperty(e))continue;let i=n.inputs[e];i!==void 0&&(t.inputs[e]=i,t.declaredInputs[e]=n.declaredInputs[e]);}}function bF(t){let n=0,e=null;for(let i=t.length-1;i>=0;i--){let r=t[i];r.hostVars=n+=r.hostVars,r.hostAttrs=Is(r.hostAttrs,e=Is(e,r.hostAttrs));}}function rg(t){return t===sr?{}:t===Tt?[]:t}function wF(t,n){let e=t.viewQuery;e?t.viewQuery=(i,r)=>{n(i,r),e(i,r);}:t.viewQuery=n;}function CF(t,n){let e=t.contentQueries;e?t.contentQueries=(i,r,o)=>{n(i,r,o),e(i,r,o);}:t.contentQueries=n;}function DF(t,n){let e=t.hostBindings;e?t.hostBindings=(i,r)=>{n(i,r),e(i,r);}:t.hostBindings=n;}function uD(t,n,e,i,r,o,s,a){if(e.firstCreatePass){t.mergedAttrs=Is(t.mergedAttrs,t.attrs);let u=t.tView=fv(2,t,r,o,s,e.directiveRegistry,e.pipeRegistry,null,e.schemas,e.consts,null);e.queries!==null&&(e.queries.template(e,t),u.queries=e.queries.embeddedTView(t));}a&&(t.flags|=a),Cs(t,false);let l=EF(e,n);uu()&&dv(e,n,l,t),Ms(l,n);let c=BC(l,n,l,t);n[i+Be]=c,hv(n,c);}function xF(t,n,e,i,r,o,s,a,l,c,u){let f=e+Be,m;return n.firstCreatePass?(m=Os(n,f,4,s||null,a||null),KC(n,t,m,Jt(n.consts,c),pv),N0(n,m)):m=n.data[f],uD(m,t,n,e,i,r,o,l),bs(m)&&Qu(n,t,m),c!=null&&kl(t,m,u),m}function As(t,n,e,i,r,o,s,a,l,c,u){let f=e+Be,m;if(n.firstCreatePass){if(m=Os(n,f,4,s||null,a||null),c!=null){let h=Jt(n.consts,c);m.localNames=[];for(let p=0;p<h.length;p+=2)m.localNames.push(h[p],-1);}}else m=n.data[f];return uD(m,t,n,e,i,r,o,l),c!=null&&kl(t,m,u),m}function Et(t,n,e,i,r,o,s,a){let l=W(),c=Te(),u=Jt(c.consts,o);return xF(l,c,t,n,e,i,r,u,void 0,s,a),Et}function fD(t,n,e,i,r,o,s,a){let l=W(),c=Te(),u=Jt(c.consts,o);return As(l,c,t,n,e,i,r,u,void 0,s,a),fD}var EF=SF;function SF(t,n,e,i){return pl(true),n[Me].createComment("")}var af=(()=>{class t{log(e){console.log(e);}warn(e){console.warn(e);}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"platform"})}return t})();var Rv=new g("");var Fs=new g("");function mD(){qh(()=>{let t="";throw new D(600,t)});}var IF=10;var Vt=(()=>{class t{_runningTick=false;_destroyed=false;_destroyListeners=[];_views=[];internalErrorHandler=d(fn);afterRenderManager=d(Wu);zonelessEnabled=d(vl);rootEffectScheduler=d(mu);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=false;afterTick=new _;get allViews(){return [...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=d(Si);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(T$1(e=>!e))}constructor(){d(ai,{optional:true});}whenStable(){let e;return new Promise(i=>{e=this.isStable.subscribe({next:r=>{r&&i();}});}).finally(()=>{e.unsubscribe();})}_injector=d(Se);_rendererFactory=null;get injector(){return this._injector}bootstrap(e,i){return this.bootstrapImpl(e,i)}bootstrapImpl(e,i,r=j.NULL){return this._injector.get(O).run(()=>{if(Ie(ye.BootstrapComponentStart),!this._injector.get(Av).done){let P="";throw new D(405,P)}let a=Ci(e),l=this._injector.get(si),c=new Co(a,l);this.componentTypes.push(e);let{hostElement:u,directives:f,bindings:m}=MF(i),h=u||c.selector,p=c.create(r,[],h,l.injector,f,m),b=p.location.nativeElement,x=p.injector.get(Rv,null);return x?.registerApplication(b),p.onDestroy(()=>{this.detachView(p.hostView),wl(this.components,p),x?.unregisterApplication(b);}),this._loadComponent(p),Ie(ye.BootstrapComponentEnd,p),p})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick();}_tick(){Ie(ye.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(Gu.CHANGE_DETECTION,this.tickImpl):this.tickImpl();}tickImpl=()=>{if(this._runningTick)throw Ie(ye.ChangeDetectionEnd),new D(101,false);let e=G(null);try{this._runningTick=!0,this.synchronize();}finally{this._runningTick=false,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,G(e),this.afterTick.next(),Ie(ye.ChangeDetectionEnd);}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(it,null,{optional:true}));let e=0;for(;this.dirtyFlags!==0&&e++<IF;){Ie(ye.ChangeDetectionSyncStart);try{this.synchronizeOnce();}finally{Ie(ye.ChangeDetectionSyncEnd);}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let e=false;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!fl(r))continue;let o=i&&!this.zonelessEnabled?0:1;FC(r,o),e=true;}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}e||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews();}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:e})=>fl(e))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8;}attachView(e){let i=e;this._views.push(i),i.attachToAppRef(this);}detachView(e){let i=e;wl(this._views,i),i.detachFromAppRef();}_loadComponent(e){this.attachView(e.hostView);try{this.tick();}catch(r){this.internalErrorHandler(r);}this.components.push(e),this._injector.get(Fs,[]).forEach(r=>r(e));}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(e=>e()),this._views.slice().forEach(e=>e.destroy());}finally{this._destroyed=true,this._views=[],this._destroyListeners=[];}}onDestroy(e){return this._destroyListeners.push(e),()=>wl(this._destroyListeners,e)}destroy(){if(this._destroyed)throw new D(406,false);let e=this._injector;e.destroy&&!e.destroyed&&e.destroy();}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function MF(t){return t===void 0||typeof t=="string"||t instanceof Element?{hostElement:t}:t}function wl(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1);}function ce(t,n,e,i){let r=W(),o=dr();if(mn(r,o,n)){Te();let a=Ds();YO(a,r,t,n,e,i);}return ce}var Pg=class{destroy(n){}updateValue(n,e){}swap(n,e){let i=Math.min(n,e),r=Math.max(n,e),o=this.detach(r);if(r-i>1){let s=this.detach(i);this.attach(i,o),this.attach(r,s);}else this.attach(i,o);}move(n,e){this.attach(e,this.detach(n));}};function og(t,n,e,i,r){return t===e&&Object.is(n,i)?1:Object.is(r(t,n),r(e,i))?-1:0}function TF(t,n,e,i){let r,o,s=0,a=t.length-1;if(Array.isArray(n)){G(i);let c=n.length-1;for(G(null);s<=a&&s<=c;){let u=t.at(s),f=n[s],m=og(s,u,s,f,e);if(m!==0){m<0&&t.updateValue(s,f),s++;continue}let h=t.at(a),p=n[c],b=og(a,h,c,p,e);if(b!==0){b<0&&t.updateValue(a,p),a--,c--;continue}let x=e(s,u),P=e(a,h),_e=e(s,f);if(Object.is(_e,P)){let He=e(c,p);Object.is(He,x)?(t.swap(s,a),t.updateValue(a,p),c--,a--):t.move(a,s),t.updateValue(s,f),s++;continue}if(r??=new ju,o??=D0(t,s,a,e),Lg(t,r,s,_e))t.updateValue(s,f),s++,a++;else if(o.has(_e))r.set(x,t.detach(s)),a--;else {let He=t.create(s,n[s]);t.attach(s,He),s++,a++;}}for(;s<=c;)C0(t,r,e,s,n[s]),s++;}else if(n!=null){G(i);let c=n[Symbol.iterator]();G(null);let u=c.next();for(;!u.done&&s<=a;){let f=t.at(s),m=u.value,h=og(s,f,s,m,e);if(h!==0)h<0&&t.updateValue(s,m),s++,u=c.next();else {r??=new ju,o??=D0(t,s,a,e);let p=e(s,m);if(Lg(t,r,s,p))t.updateValue(s,m),s++,a++,u=c.next();else if(!o.has(p))t.attach(s,t.create(s,m)),s++,a++,u=c.next();else {let b=e(s,f);r.set(b,t.detach(s)),a--;}}}for(;!u.done;)C0(t,r,e,t.length,u.value),u=c.next();}for(;s<=a;)t.destroy(t.detach(a--));r?.forEach(c=>{t.destroy(c);});}function Lg(t,n,e,i){return n!==void 0&&n.has(i)?(t.attach(e,n.get(i)),n.delete(i),true):false}function C0(t,n,e,i,r){if(Lg(t,n,i,e(i,r)))t.updateValue(i,r);else {let o=t.create(i,r);t.attach(i,o);}}function D0(t,n,e,i){let r=new Set;for(let o=n;o<=e;o++)r.add(i(o,t.at(o)));return r}var ju=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return  false;let e=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(e)?(this.kvMap.set(n,this._vMap.get(e)),this._vMap.delete(e)):this.kvMap.delete(n),true}get(n){return this.kvMap.get(n)}set(n,e){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,e);}else this.kvMap.set(n,e);}forEach(n){for(let[e,i]of this.kvMap)if(n(i,e),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,e);}}};function Q(t,n,e,i,r,o,s,a){jn("NgControlFlow");let l=W(),c=Te(),u=Jt(c.consts,o);return As(l,c,t,n,e,i,r,u,256,s,a),Ov}function Ov(t,n,e,i,r,o,s,a){jn("NgControlFlow");let l=W(),c=Te(),u=Jt(c.consts,o);return As(l,c,t,n,e,i,r,u,512,s,a),Ov}function X(t,n){jn("NgControlFlow");let e=W(),i=dr(),r=e[i]!==hn?e[i]:-1,o=r!==-1?Bu(e,Be+r):void 0,s=0;if(mn(e,i,t)){let a=G(null);try{if(o!==void 0&&UC(o,s),t!==-1){let l=Be+t,c=Bu(e,l),u=Ug(e[U],l),f=zC(c,u,e),m=Rl(e,u,n,{dehydratedView:f});Ol(c,m,s,Ts(u,f));}}finally{G(a);}}else if(o!==void 0){let a=VC(o,s);a!==void 0&&(a[Qe]=n);}}var jg=class{lContainer;$implicit;$index;constructor(n,e,i){this.lContainer=n,this.$implicit=e,this.$index=i;}get $count(){return this.lContainer.length-ze}};function Fl(t,n){return n}var Bg=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,e,i){this.hasEmptyBlock=n,this.trackByFn=e,this.liveCollection=i;}};function Pl(t,n,e,i,r,o,s,a,l,c,u,f,m){jn("NgControlFlow");let h=W(),p=Te(),b=l!==void 0,x=W(),P=s,_e=new Bg(b,P);x[Be+t]=_e,As(h,p,t+1,n,e,i,r,Jt(p.consts,o),256);}var Vg=class extends Pg{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=false;constructor(n,e,i){super(),this.lContainer=n,this.hostLView=e,this.templateTNode=i;}get length(){return this.lContainer.length-ze}at(n){return this.getLView(n)[Qe].$implicit}attach(n,e){let i=e[co];this.needsIndexUpdate||=n!==this.length,Ol(this.lContainer,e,n,Ts(this.templateTNode,i)),AF(this.lContainer,n);}detach(n){return this.needsIndexUpdate||=n!==this.length-1,kF(this.lContainer,n),RF(this.lContainer,n)}create(n,e){let i=Tu(this.lContainer,this.templateTNode.tView.ssrId);return Rl(this.hostLView,this.templateTNode,new jg(this.lContainer,e,n),{dehydratedView:i})}destroy(n){Yu(n[U],n);}updateValue(n,e){this.getLView(n)[Qe].$implicit=e;}reset(){this.needsIndexUpdate=false;}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[Qe].$index=n;}getLView(n){return OF(this.lContainer,n)}};function Ll(t){let n=G(null),e=Ei();try{let i=W(),r=i[U],o=i[e],s=e+1,a=Bu(i,s);if(o.liveCollection===void 0){let c=Ug(r,s);o.liveCollection=new Vg(a,i,c);}else o.liveCollection.reset();let l=o.liveCollection;if(TF(l,t,o.trackByFn,n),l.updateIndexes(),o.hasEmptyBlock){let c=dr(),u=l.length===0;if(mn(i,c,u)){let f=e+2,m=Bu(i,f);if(u){let h=Ug(r,f),p=zC(m,h,i),b=Rl(i,h,void 0,{dehydratedView:p});Ol(m,b,0,Ts(h,p));}else r.firstUpdatePass&&yN(m),UC(m,0);}}}finally{G(n);}}function Bu(t,n){return t[n]}function AF(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e],r=i?i[ii]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[ei];bO(o,r),hr.delete(i[ni]),r.detachedLeaveAnimationFns=void 0;}}function kF(t,n){if(t.length<=ze)return;let e=ze+n,i=t[e],r=i?i[ii]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[]);}function RF(t,n){return El(t,n)}function OF(t,n){return VC(t,n)}function Ug(t,n){return eu(t,n)}function me(t,n,e){let i=W(),r=dr();if(mn(i,r,n)){Te();let s=Ds();MC(s,i,t,n,i[Me],e);}return me}function Hg(t,n,e,i,r){_v(n,t,e,r?"class":"style",i);}function y(t,n,e,i){let r=W(),o=r[U],s=t+Be,a=o.firstCreatePass?Dv(s,r,2,n,pv,ou(),e,i):o.data[s];if(xi(a)){let l=r[An].tracingService;if(l&&l.componentCreate){let c=o.data[a.directiveStart+a.componentOffset];return l.componentCreate(WC(c),()=>(x0(t,n,r,a,i),y))}}return x0(t,n,r,a,i),y}function x0(t,n,e,i,r){if(gv(i,e,t,n,hD),bs(i)){let o=e[U];Qu(o,e,i),Kg(o,i,e);}r!=null&&kl(e,i);}function w(){let t=Te(),n=nt(),e=vv(n);return t.firstCreatePass&&xv(t,e),Bp(e)&&Vp(),Lp(),e.classesWithoutHost!=null&&sR(e)&&Hg(t,e,W(),e.classesWithoutHost,true),e.stylesWithoutHost!=null&&aR(e)&&Hg(t,e,W(),e.stylesWithoutHost,false),w}function be(t,n,e,i){return y(t,n,e,i),w(),be}function Ze(t,n,e,i){let r=W(),o=r[U],s=t+Be,a=o.firstCreatePass?HN(s,o,2,n,e,i):o.data[s];return gv(a,r,t,n,hD),i!=null&&kl(r,a),Ze}function Xe(){let t=nt(),n=vv(t);return Bp(n)&&Vp(),Lp(),Xe}function mt(t,n,e,i){return Ze(t,n,e,i),Xe(),mt}var hD=(t,n,e,i,r)=>(pl(true),uC(n[Me],i,Yp()));function Nv(t,n,e){let i=W(),r=i[U],o=t+Be,s=r.firstCreatePass?Dv(o,i,8,"ng-container",pv,ou(),n,e):r.data[o];if(gv(s,i,t,"ng-container",NF),bs(s)){let a=i[U];Qu(a,i,s),Kg(a,s,i);}return e!=null&&kl(i,s),Nv}function Fv(){let t=Te(),n=nt(),e=vv(n);return t.firstCreatePass&&xv(t,e),Fv}function Ps(t,n,e){return Nv(t,n,e),Fv(),Ps}var NF=(t,n,e,i,r)=>(pl(true),QR(n[Me],""));function Rt(){return W()}function pn(t,n,e){let i=W(),r=dr();if(mn(i,r,n)){Te();let s=Ds();TC(s,i,t,n,i[Me],e);}return pn}var _l=void 0;function FF(t){let n=Math.floor(Math.abs(t)),e=t.toString().replace(/^[^.]*\.?/,"").length;return n===1&&e===0?1:5}var PF=["en",[["a","p"],["AM","PM"]],[["AM","PM"]],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],_l,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],_l,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm\u202Fa","h:mm:ss\u202Fa","h:mm:ss\u202Fa z","h:mm:ss\u202Fa zzzz"],["{1}, {0}",_l,_l,_l],[".",",",";","%","+","-","E","\xD7","\u2030","\u221E","NaN",":"],["#,##0.###","#,##0%","\xA4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",FF],sg=Object.create(null);function en(t){let n=LF(t),e=E0(n);if(e)return e;let i=n.split("-")[0];if(e=E0(i),e)return e;if(i==="en")return PF;throw new D(701,false)}function E0(t){if(!(t in sg)){let n=Jn.ng&&Jn.ng.common&&Jn.ng.common.locales&&Jn.ng.common.locales[t];return n!==void 0&&(sg[t]=n),n}return sg[t]}var ot={LocaleId:0,DayPeriodsFormat:1,DayPeriodsStandalone:2,DaysFormat:3,DaysStandalone:4,MonthsFormat:5,MonthsStandalone:6,Eras:7,DateFormat:10,TimeFormat:11,DateTimeFormat:12,NumberSymbols:13,ExtraData:21};function LF(t){return t.toLowerCase().replace(/_/g,"-")}var jl="en-US";function pD(t){typeof t=="string"&&(t.toLowerCase().replace(/_/g,"-"));}function ie(t,n,e){let i=W(),r=Te(),o=nt();return gD(r,i,i[Me],o,t,n,e),ie}function lf(t,n,e){let i=W(),r=Te(),o=nt();return (o.type&3||e)&&Cv(o,r,i,e,i[Me],t,n,_o(o,i,n)),lf}function gD(t,n,e,i,r,o,s){let a=true,l=null;if((i.type&3||s)&&(l??=_o(i,n,o),Cv(i,t,n,s,e,r,o,l)&&(a=false)),a){let c=i.outputs?.[r],u=i.hostDirectiveOutputs?.[r];if(u&&u.length)for(let f=0;f<u.length;f+=2){let m=u[f],h=u[f+1];l??=_o(i,n,o),ku(i,n,m,h,r,l);}if(c&&c.length)for(let f of c)l??=_o(i,n,o),ku(i,n,f,r,r,l);}}function z(t=1){return jw(t)}function BF(t,n){let e=null,i=aO(t);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){e=r;continue}if(i===null?gC(t,o,true):dO(i,o))return r}return e}function Ve(t){let n=W()[jt][At];if(!n.projection){let e=t?t.length:1,i=n.projection=fw(e,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let s=t?BF(o,t):0;s!==null&&(r[s]?r[s].projectionNext=o:i[s]=o,r[s]=o);}o=o.next;}}}function q(t,n=0,e,i,r,o){let s=W(),a=Te(),l=null;let c=Os(a,Be+t,16,null,null);c.projection===null&&(c.projection=n),zp();let f=!s[co]||jp();s[jt][At].projection[c.projection]===null&&l!==null?VF(s,a,l):f&&!zu(c)&&NO(a,s,c);}function VF(t,n,e){let i=Be+e,r=n.data[i],o=t[i],s=Tu(o,r.tView.ssrId),a=Rl(t,r,void 0,{dehydratedView:s});Ol(o,a,0,Ts(r,s));}function li(t,n,e,i){return rD(t,n,e,i),li}function $e(t,n,e){return iD(t,n,e),$e}function ee(t){let n=W(),e=Te(),i=lu();ml(i+1);let r=Sv(e,i);if(t.dirty&&ww(n)===((r.metadata.flags&2)===2)){if(r.matches===null)t.reset([]);else {let o=sD(n,i);t.reset(o,W0),t.notifyOnChanges();}return  true}return  false}function te(){return Ev(W(),lu())}function cf(t,n,e,i,r){return lD(n,rD(t,e,i,r)),cf}function df(t,n,e,i){return lD(t,iD(n,e,i)),df}function uf(t=1){ml(lu()+t);}function ki(t){let n=Tw();return tu(n,Be+t)}function _u(t,n){return t<<17|n<<2}function Do(t){return t>>17&32767}function UF(t){return (t&2)==2}function HF(t,n){return t&131071|n<<17}function zg(t){return t|2}function ks(t){return (t&131068)>>2}function ag(t,n){return t&-131069|n<<2}function zF(t){return (t&1)===1}function $g(t){return t|1}function $F(t,n,e,i,r,o){let s=o?n.classBindings:n.styleBindings,a=Do(s),l=ks(s);t[i]=e;let c=false,u;if(Array.isArray(e)){let f=e;u=f[1],(u===null||ps(f,u)>0)&&(c=true);}else u=e;if(r)if(l!==0){let m=Do(t[a+1]);t[i+1]=_u(m,a),m!==0&&(t[m+1]=ag(t[m+1],i)),t[a+1]=HF(t[a+1],i);}else t[i+1]=_u(a,0),a!==0&&(t[a+1]=ag(t[a+1],i)),a=i;else t[i+1]=_u(l,0),a===0?a=i:t[l+1]=ag(t[l+1],i),l=i;c&&(t[i+1]=zg(t[i+1])),S0(t,u,i,true),S0(t,u,i,false),GF(n,u,t,i,o),s=_u(a,l),o?n.classBindings=s:n.styleBindings=s;}function GF(t,n,e,i,r){let o=r?t.residualClasses:t.residualStyles;o!=null&&typeof n=="string"&&ps(o,n)>=0&&(e[i+1]=$g(e[i+1]));}function S0(t,n,e,i){let r=t[e+1],o=n===null,s=i?Do(r):ks(r),a=false;for(;s!==0&&(a===false||o);){let l=t[s],c=t[s+1];WF(l,n)&&(a=true,t[s+1]=i?$g(c):zg(c)),s=i?Do(c):ks(c);}a&&(t[e+1]=i?zg(r):$g(r));}function WF(t,n){return t===null||n==null||(Array.isArray(t)?t[1]:t)===n?true:Array.isArray(t)&&typeof n=="string"?ps(t,n)>=0:false}var Nn={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function qF(t){return t.substring(Nn.key,Nn.keyEnd)}function YF(t){return ZF(t),vD(t,_D(t,0,Nn.textEnd))}function vD(t,n){let e=Nn.textEnd;return e===n?-1:(n=Nn.keyEnd=KF(t,Nn.key=n,e),_D(t,n,e))}function ZF(t){Nn.key=0,Nn.keyEnd=0,Nn.value=0,Nn.valueEnd=0,Nn.textEnd=t.length;}function _D(t,n,e){for(;n<e&&t.charCodeAt(n)<=32;)n++;return n}function KF(t,n,e){for(;n<e&&t.charCodeAt(n)>32;)n++;return n}function vr(t,n,e){return yD(t,n,e,false),vr}function $$1(t,n){return yD(t,n,null,true),$$1}function Bn(t){XF(rP,QF,t,true);}function QF(t,n){for(let e=YF(n);e>=0;e=vD(n,e))Qd(t,qF(n),true);}function yD(t,n,e,i){let r=W(),o=Te(),s=Gp(2);if(o.firstUpdatePass&&wD(o,t,s,i),n!==hn&&mn(r,s,n)){let a=o.data[Ei()];CD(o,a,r,r[Me],t,r[s+1]=sP(n,e),i,s);}}function XF(t,n,e,i){let r=Te(),o=Gp(2);r.firstUpdatePass&&wD(r,null,o,i);let s=W();if(e!==hn&&mn(s,o,e)){let a=r.data[Ei()];if(DD(a,i)&&!bD(r,o)){let l=a.classesWithoutHost;l!==null&&(e=Gd(l,e||"")),Hg(r,a,s,e,i);}else oP(r,a,s,s[Me],s[o+1],s[o+1]=iP(t,n,e),i,o);}}function bD(t,n){return n>=t.expandoStartIndex}function wD(t,n,e,i){let r=t.data;if(r[e+1]===null){let o=r[Ei()],s=bD(t,e);DD(o,i)&&n===null&&!s&&(n=false),n=JF(r,o,n,i),$F(r,o,n,e,s,i);}}function JF(t,n,e,i){let r=Nw(t),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(e=lg(null,t,n,e,i),e=Il(e,n.attrs,i),o=null);else {let s=n.directiveStylingLast;if(s===-1||t[s]!==r)if(e=lg(r,t,n,e,i),o===null){let l=eP(t,n,i);l!==void 0&&Array.isArray(l)&&(l=lg(null,t,n,l[1],i),l=Il(l,n.attrs,i),tP(t,n,i,l));}else o=nP(t,n,i);}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),e}function eP(t,n,e){let i=e?n.classBindings:n.styleBindings;if(ks(i)!==0)return t[Do(i)]}function tP(t,n,e,i){let r=e?n.classBindings:n.styleBindings;t[Do(r)]=i;}function nP(t,n,e){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let s=t[o].hostAttrs;i=Il(i,s,e);}return Il(i,n.attrs,e)}function lg(t,n,e,i,r){let o=null,s=e.directiveEnd,a=e.directiveStylingLast;for(a===-1?a=e.directiveStart:a++;a<s&&(o=n[a],i=Il(i,o.hostAttrs,r),o!==t);)a++;return t!==null&&(e.directiveStylingLast=a),i}function Il(t,n,e){let i=e?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let s=n[o];typeof s=="number"?r=s:r===i&&(Array.isArray(t)||(t=t===void 0?[]:["",t]),Qd(t,s,e?true:n[++o]));}return t===void 0?null:t}function iP(t,n,e){if(e==null||e==="")return Tt;let i=[],r=Ln(e);if(Array.isArray(r))for(let o=0;o<r.length;o++)t(i,r[o],true);else if(r instanceof Set)for(let o of r)t(i,o,true);else if(typeof r=="object")for(let o in r)Object.hasOwn(r,o)&&t(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function rP(t,n,e){let i=String(n);i!==""&&!i.includes(" ")&&Qd(t,i,e);}function oP(t,n,e,i,r,o,s,a){r===hn&&(r=Tt);let l=0,c=0,u=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;u!==null||f!==null;){let m=l<r.length?r[l+1]:void 0,h=c<o.length?o[c+1]:void 0,p=null,b;u===f?(l+=2,c+=2,m!==h&&(p=f,b=h)):f===null||u!==null&&u<f?(l+=2,p=u):(c+=2,p=f,b=h),p!==null&&CD(t,n,e,i,p,b,s,a),u=l<r.length?r[l]:null,f=c<o.length?o[c]:null;}}function CD(t,n,e,i,r,o,s,a){if(!(n.type&3))return;let l=t.data,c=l[a+1],u=zF(c)?I0(l,n,e,r,ks(c),s):void 0;if(!Vu(u)){Vu(o)||UF(c)&&(o=I0(l,null,e,r,a,s));let f=kp(Ei(),e);PO(i,s,f,r,o);}}function I0(t,n,e,i,r,o){let s=n===null,a;for(;r>0;){let l=t[r],c=Array.isArray(l),u=c?l[1]:l,f=u===null,m=e[r+1];m===hn&&(m=f?Tt:void 0);let h=f?Xd(m,i):u===i?m:void 0;if(c&&!Vu(h)&&(h=Xd(l,i)),Vu(h)&&(a=h,s))return a;let p=t[r+1];r=s?Do(p):ks(p);}if(n!==null){let l=o?n.residualClasses:n.residualStyles;l!=null&&(a=Xd(l,i));}return a}function Vu(t){return t!==void 0}function sP(t,n){return t==null||t===""||(typeof n=="string"?t=t+n:typeof t=="object"&&(t=sl(Ln(t)))),t}function DD(t,n){return (t.flags&(n?8:16))!==0}function N(t,n=""){let e=W(),i=Te(),r=t+Be,o=i.firstCreatePass?Os(i,r,1,n,null):i.data[r],s=aP(i,e,o,n);e[r]=s,uu()&&dv(i,e,s,o),Cs(o,false);}var aP=(t,n,e,i)=>(pl(true),ZR(n[Me],i));function lP(t,n,e,i=""){return mn(t,dr(),e)?n+Yd(e)+i:hn}function Ut(t){return Je("",t),Ut}function Je(t,n,e){let i=W(),r=lP(i,t,n,e);return r!==hn&&cP(i,Ei(),r),Je}function cP(t,n,e){let i=kp(n,t);KR(t[Me],i,e);}function ff(t,n,e){hu(n)&&(n=n());let i=W(),r=dr();if(mn(i,r,n)){Te();let s=Ds();MC(s,i,t,n,i[Me],e);}return ff}function Pv(t,n){let e=hu(t);return e&&t.set(n),e}function mf(t,n){let e=W(),i=Te(),r=nt();return gD(i,e,e[Me],r,t,n),mf}function M0(t,n,e){let i=Te();i.firstCreatePass&&xD(n,i.data,i.blueprint,ri(t),e);}function xD(t,n,e,i,r){if(t=Dt(t),Array.isArray(t))for(let o=0;o<t.length;o++)xD(t[o],n,e,i,r);else {let o=Te(),s=W(),a=nt(),l=oo(t)?t:Dt(t.provide),c=Ep(t),u=a.providerIndexes&1048575,f=a.directiveStart,m=a.providerIndexes>>20;if(oo(t)||!t.multi){let h=new yo(c,r,pe,null),p=dg(l,n,u+m,f);p===-1?(mg(Iu(a,s),o,l),cg(o,t,n.length),n.push(l),a.directiveStart++,a.directiveEnd++,e.push(h),s.push(h)):(e[p]=h,s[p]=h);}else {let h=dg(l,n,u+m,f),p=dg(l,n,u,u+m),b=h>=0&&e[h],x=p>=0&&e[p];if(!b){mg(Iu(a,s),o,l);let P=fP(dP,e.length,r,i,c);x&&(e[p].providerFactory=P),cg(o,t,n.length,0),n.push(l),a.directiveStart++,a.directiveEnd++,e.push(P),s.push(P);}else {let P=ED(e[h],c,i);cg(o,t,h>-1?h:p,P);}i&&x&&e[p].componentProviders++;}}}function cg(t,n,e,i){let r=oo(n),o=vw(n);if(r||o){let l=(o?Dt(n.useClass):n).prototype.ngOnDestroy;if(l){let c=t.destroyHooks||(t.destroyHooks=[]);if(!r&&n.multi){let u=c.indexOf(e);u===-1?c.push(e,[i,l]):c[u+1].push(i,l);}else c.push(e,l);}}}function ED(t,n,e){return e&&t.componentProviders++,t.multi.push(n)-1}function dg(t,n,e,i){for(let r=e;r<i;r++)if(n[r]===t)return r;return  -1}function dP(t,n,e,i,r){return Gg(this.multi,[])}function Gg(t,n){for(let e=0;e<t.length;e++){let i=t[e];n.push(i());}return n}function fP(t,n,e,i,r,o){let s=new yo(t,e,pe,null);return s.multi=[],s.index=n,s.componentProviders=0,ED(s,r,i&&!e),s}function Ne(t,n){return e=>{e.providersResolver=(i,r)=>M0(i,r?r(t):t,false);}}function mP(t,n,e){return ID(W(),su(),t,n,e)}function SD(t,n){let e=t[n];return e===hn?void 0:e}function ID(t,n,e,i,r,o){let s=n+e;return mn(t,s,r)?YC(t,s+1,o?i.call(o,r):i(r)):SD(t,s+1)}function hP(t,n,e,i,r,o,s){let a=n+e;return xN(t,a,r,o)?YC(t,a+2,s?i.call(s,r,o):i(r,o)):SD(t,a+2)}function hf(t,n){let e=Te(),i,r=t+Be;e.firstCreatePass?(i=pP(n,e.pipeRegistry),e.data[r]=i,i.onDestroy&&(e.destroyHooks??=[]).push(r,i.onDestroy)):i=e.data[r];let o=i.factory||(i.factory=rr(i.type)),a=Lt(pe);try{let l=Su(!1),c=o();return Su(l),Rp(e,W(),r,c),c}finally{Lt(a);}}function pP(t,n){if(n)for(let e=n.length-1;e>=0;e--){let i=n[e];if(t===i.name)return i}}function pf(t,n,e){let i=t+Be,r=W(),o=tu(r,i);return MD(r,i)?ID(r,su(),n,o.transform,e,o):o.transform(e)}function gP(t,n,e,i){let r=t+Be,o=W(),s=tu(o,r);return MD(o,r)?hP(o,su(),n,s.transform,e,i,s):s.transform(e,i)}function MD(t,n){return t[U].data[n].pure}function Ls(t,n){return Xu(t,n)}var TD=(()=>{class t{applicationErrorHandler=d(fn);appRef=d(Vt);taskService=d(Si);ngZone=d(O);zonelessEnabled=d(vl);tracing=d(ai,{optional:true});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:true}}];subscriptions=new ae;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(rl):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(d(Jp,{optional:true})??false);cancelScheduledCallback=null;useMicrotaskScheduler=false;runningTick=false;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let e=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(e);return}this.switchToMicrotaskScheduler(),this.taskService.remove(e);})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup();}));}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let e=this.taskService.add();this.useMicrotaskScheduler=true,queueMicrotask(()=>{this.useMicrotaskScheduler=false,this.taskService.remove(e);});});}notify(e){if(!this.zonelessEnabled&&e===5)return;switch(e){case 0:case 2:{this.appRef.dirtyFlags|=2;break}case 3:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8;}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?Hw:Kp;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()));}shouldScheduleTick(){return !(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(rl+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let e=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick();},void 0,this.schedulerTickApplyArgs);}catch(i){this.applicationErrorHandler(i);}finally{this.taskService.remove(e),this.cleanup();}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup();}cleanup(){if(this.runningTick=false,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let e=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(e);}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function AD(){return [{provide:Qn,useExisting:TD},{provide:O,useClass:ol},{provide:vl,useValue:true}]}var Lv=(()=>{class t{compileModuleSync(e){return new Lu(e)}compileModuleAsync(e){return Promise.resolve(this.compileModuleSync(e))}clearCache(){}clearCacheFor(e){}getModuleId(e){}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function vP(){return typeof $localize<"u"&&$localize.locale||jl}var Bl=new g("",{factory:()=>d(Bl,{optional:true,skipSelf:true})||vP()});function Wt(t,n){return Ja(t)}function Fe(t){return Jb(t)}var jD=Symbol("InputSignalNode#UNSET"),NP=Y(v({},el),{transformFn:void 0,applyValueToInputSignal(t,n){us(t,n);}});function BD(t,n){let e=Object.create(NP);e.value=t,e.transformFn=n?.transform;function i(){if(to(e),e.value===jD){let r=null;throw new D(-950,r)}return e.value}return i[ct]=e,i}var Eo=class{attributeName;constructor(n){this.attributeName=n;}__NG_ELEMENT_ID__=()=>Uu(this.attributeName);toString(){return `HostAttributeToken ${this.attributeName}`}};function Zv(t){return FP(t)?t.default:t}function FP(t){return t&&typeof t=="object"&&"default"in t}function kD(t,n){return BD(t,n)}function PP(t){return BD(jD,t)}var Ul=(kD.required=PP,kD);function RD(t,n){return Iv()}function LP(t,n){return Mv()}var Hl=(RD.required=LP,RD);function OD(t,n){return Iv()}function jP(t,n){return Mv()}var VD=(OD.required=jP,OD);var Bv=class{supports(n){return wv(n)}create(n){return new Vv(n)}},VP=(t,n)=>n,Vv=class{length=0;collection;_linkedRecords=null;_unlinkedRecords=null;_previousItHead=null;_itHead=null;_itTail=null;_additionsHead=null;_additionsTail=null;_movesHead=null;_movesTail=null;_removalsHead=null;_removalsTail=null;_identityChangesHead=null;_identityChangesTail=null;_trackByFn;constructor(n){this._trackByFn=n||VP;}forEachItem(n){let e;for(e=this._itHead;e!==null;e=e._next)n(e);}forEachOperation(n){let e=this._itHead,i=this._removalsHead,r=0,o=null;for(;e||i;){let s=!i||e&&e.currentIndex<ND(i,r,o)?e:i,a=ND(s,r,o),l=s.currentIndex;if(s===i)r--,i=i._nextRemoved;else if(e=e._next,s.previousIndex==null)r++;else {o||(o=[]);let c=a-r,u=l-r;if(c!=u){for(let m=0;m<c;m++){let h=m<o.length?o[m]:o[m]=0,p=h+m;u<=p&&p<c&&(o[m]=h+1);}let f=s.previousIndex;o[f]=u-c;}}a!==l&&n(s,a,l);}}forEachPreviousItem(n){let e;for(e=this._previousItHead;e!==null;e=e._nextPrevious)n(e);}forEachAddedItem(n){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)n(e);}forEachMovedItem(n){let e;for(e=this._movesHead;e!==null;e=e._nextMoved)n(e);}forEachRemovedItem(n){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)n(e);}forEachIdentityChange(n){let e;for(e=this._identityChangesHead;e!==null;e=e._nextIdentityChange)n(e);}diff(n){if(n==null&&(n=[]),!wv(n))throw new D(900,false);return this.check(n)?this:null}onDestroy(){}check(n){this._reset();let e=this._itHead,i=false,r,o,s;if(Array.isArray(n)){this.length=n.length;for(let a=0;a<this.length;a++)o=n[a],s=this._trackByFn(a,o),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,o,s,a),i=true):(i&&(e=this._verifyReinsertion(e,o,s,a)),Object.is(e.item,o)||this._addIdentityChange(e,o)),e=e._next;}else r=0,qC(n,a=>{s=this._trackByFn(r,a),e===null||!Object.is(e.trackById,s)?(e=this._mismatch(e,a,s,r),i=true):(i&&(e=this._verifyReinsertion(e,a,s,r)),Object.is(e.item,a)||this._addIdentityChange(e,a)),e=e._next,r++;}),this.length=r;return this._truncate(e),this.collection=n,this.isDirty}get isDirty(){return this._additionsHead!==null||this._movesHead!==null||this._removalsHead!==null||this._identityChangesHead!==null}_reset(){if(this.isDirty){let n;for(n=this._previousItHead=this._itHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._additionsHead;n!==null;n=n._nextAdded)n.previousIndex=n.currentIndex;for(this._additionsHead=this._additionsTail=null,n=this._movesHead;n!==null;n=n._nextMoved)n.previousIndex=n.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null;}}_mismatch(n,e,i,r){let o;return n===null?o=this._itTail:(o=n._prev,this._remove(n)),n=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null),n!==null?(Object.is(n.item,e)||this._addIdentityChange(n,e),this._reinsertAfter(n,o,r)):(n=this._linkedRecords===null?null:this._linkedRecords.get(i,r),n!==null?(Object.is(n.item,e)||this._addIdentityChange(n,e),this._moveAfter(n,o,r)):n=this._addAfter(new Uv(e,i),o,r)),n}_verifyReinsertion(n,e,i,r){let o=this._unlinkedRecords===null?null:this._unlinkedRecords.get(i,null);return o!==null?n=this._reinsertAfter(o,n._prev,r):n.currentIndex!=r&&(n.currentIndex=r,this._addToMoves(n,r)),n}_truncate(n){for(;n!==null;){let e=n._next;this._addToRemovals(this._unlink(n)),n=e;}this._unlinkedRecords!==null&&this._unlinkedRecords.clear(),this._additionsTail!==null&&(this._additionsTail._nextAdded=null),this._movesTail!==null&&(this._movesTail._nextMoved=null),this._itTail!==null&&(this._itTail._next=null),this._removalsTail!==null&&(this._removalsTail._nextRemoved=null),this._identityChangesTail!==null&&(this._identityChangesTail._nextIdentityChange=null);}_reinsertAfter(n,e,i){this._unlinkedRecords!==null&&this._unlinkedRecords.remove(n);let r=n._prevRemoved,o=n._nextRemoved;return r===null?this._removalsHead=o:r._nextRemoved=o,o===null?this._removalsTail=r:o._prevRemoved=r,this._insertAfter(n,e,i),this._addToMoves(n,i),n}_moveAfter(n,e,i){return this._unlink(n),this._insertAfter(n,e,i),this._addToMoves(n,i),n}_addAfter(n,e,i){return this._insertAfter(n,e,i),this._additionsTail===null?this._additionsTail=this._additionsHead=n:this._additionsTail=this._additionsTail._nextAdded=n,n}_insertAfter(n,e,i){let r=e===null?this._itHead:e._next;return n._next=r,n._prev=e,r===null?this._itTail=n:r._prev=n,e===null?this._itHead=n:e._next=n,this._linkedRecords===null&&(this._linkedRecords=new vf),this._linkedRecords.put(n),n.currentIndex=i,n}_remove(n){return this._addToRemovals(this._unlink(n))}_unlink(n){this._linkedRecords!==null&&this._linkedRecords.remove(n);let e=n._prev,i=n._next;return e===null?this._itHead=i:e._next=i,i===null?this._itTail=e:i._prev=e,n}_addToMoves(n,e){return n.previousIndex===e||(this._movesTail===null?this._movesTail=this._movesHead=n:this._movesTail=this._movesTail._nextMoved=n),n}_addToRemovals(n){return this._unlinkedRecords===null&&(this._unlinkedRecords=new vf),this._unlinkedRecords.put(n),n.currentIndex=null,n._nextRemoved=null,this._removalsTail===null?(this._removalsTail=this._removalsHead=n,n._prevRemoved=null):(n._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=n),n}_addIdentityChange(n,e){return n.item=e,this._identityChangesTail===null?this._identityChangesTail=this._identityChangesHead=n:this._identityChangesTail=this._identityChangesTail._nextIdentityChange=n,n}},Uv=class{item;trackById;currentIndex=null;previousIndex=null;_nextPrevious=null;_prev=null;_next=null;_prevDup=null;_nextDup=null;_prevRemoved=null;_nextRemoved=null;_nextAdded=null;_nextMoved=null;_nextIdentityChange=null;constructor(n,e){this.item=n,this.trackById=e;}},Hv=class{_head=null;_tail=null;add(n){this._head===null?(this._head=this._tail=n,n._nextDup=null,n._prevDup=null):(this._tail._nextDup=n,n._prevDup=this._tail,n._nextDup=null,this._tail=n);}get(n,e){let i;for(i=this._head;i!==null;i=i._nextDup)if((e===null||e<=i.currentIndex)&&Object.is(i.trackById,n))return i;return null}remove(n){let e=n._prevDup,i=n._nextDup;return e===null?this._head=i:e._nextDup=i,i===null?this._tail=e:i._prevDup=e,this._head===null}},vf=class{map=new Map;put(n){let e=n.trackById,i=this.map.get(e);i||(i=new Hv,this.map.set(e,i)),i.add(n);}get(n,e){let i=n,r=this.map.get(i);return r?r.get(n,e):null}remove(n){let e=n.trackById;return this.map.get(e).remove(n)&&this.map.delete(e),n}get isEmpty(){return this.map.size===0}clear(){this.map.clear();}};function ND(t,n,e){let i=t.previousIndex;if(i===null)return i;let r=0;return e&&i<e.length&&(r=e[i]),i+n+r}var zv=class{supports(n){return n instanceof Map||Ju(n)}create(){return new $v}},$v=class{_records=new Map;_mapHead=null;_appendAfter=null;_previousMapHead=null;_changesHead=null;_changesTail=null;_additionsHead=null;_additionsTail=null;_removalsHead=null;get isDirty(){return this._additionsHead!==null||this._changesHead!==null||this._removalsHead!==null}forEachItem(n){let e;for(e=this._mapHead;e!==null;e=e._next)n(e);}forEachPreviousItem(n){let e;for(e=this._previousMapHead;e!==null;e=e._nextPrevious)n(e);}forEachChangedItem(n){let e;for(e=this._changesHead;e!==null;e=e._nextChanged)n(e);}forEachAddedItem(n){let e;for(e=this._additionsHead;e!==null;e=e._nextAdded)n(e);}forEachRemovedItem(n){let e;for(e=this._removalsHead;e!==null;e=e._nextRemoved)n(e);}diff(n){if(!n)n=new Map;else if(!(n instanceof Map||Ju(n)))throw new D(900,false);return this.check(n)?this:null}check(n){this._reset();let e=this._mapHead;if(this._appendAfter=null,this._forEach(n,(i,r)=>{if(e&&e.key===r)this._maybeAddToChanges(e,i),this._appendAfter=e,e=e._next;else {let o=this._getOrCreateRecordForKey(r,i);e=this._insertBeforeOrAppend(e,o);}}),e){e._prev&&(e._prev._next=null),this._removalsHead=e;for(let i=e;i!==null;i=i._nextRemoved)i===this._mapHead&&(this._mapHead=null),this._records.delete(i.key),i._nextRemoved=i._next,i.previousValue=i.currentValue,i.currentValue=null,i._prev=null,i._next=null;}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(n,e){if(n){let i=n._prev;return e._next=n,e._prev=i,n._prev=e,i&&(i._next=e),n===this._mapHead&&(this._mapHead=e),this._appendAfter=n,n}return this._appendAfter?(this._appendAfter._next=e,e._prev=this._appendAfter):this._mapHead=e,this._appendAfter=e,null}_getOrCreateRecordForKey(n,e){if(this._records.has(n)){let r=this._records.get(n);this._maybeAddToChanges(r,e);let o=r._prev,s=r._next;return o&&(o._next=s),s&&(s._prev=o),r._next=null,r._prev=null,r}let i=new Gv(n);return this._records.set(n,i),i.currentValue=e,this._addToAdditions(i),i}_reset(){if(this.isDirty){let n;for(this._previousMapHead=this._mapHead,n=this._previousMapHead;n!==null;n=n._next)n._nextPrevious=n._next;for(n=this._changesHead;n!==null;n=n._nextChanged)n.previousValue=n.currentValue;for(n=this._additionsHead;n!=null;n=n._nextAdded)n.previousValue=n.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null;}}_maybeAddToChanges(n,e){Object.is(e,n.currentValue)||(n.previousValue=n.currentValue,n.currentValue=e,this._addToChanges(n));}_addToAdditions(n){this._additionsHead===null?this._additionsHead=this._additionsTail=n:(this._additionsTail._nextAdded=n,this._additionsTail=n);}_addToChanges(n){this._changesHead===null?this._changesHead=this._changesTail=n:(this._changesTail._nextChanged=n,this._changesTail=n);}_forEach(n,e){n instanceof Map?n.forEach(e):Object.keys(n).forEach(i=>e(n[i],i));}},Gv=class{key;previousValue=null;currentValue=null;_nextPrevious=null;_next=null;_prev=null;_nextAdded=null;_nextRemoved=null;_nextChanged=null;constructor(n){this.key=n;}};function FD(){return new _f([new Bv])}var _f=(()=>{class t{factories;static \u0275prov=E({token:t,providedIn:"root",factory:FD});constructor(e){this.factories=e;}static create(e,i){if(i!=null){let r=i.factories.slice();e=e.concat(r);}return new t(e)}static extend(e){return {provide:t,useFactory:()=>{let i=d(t,{optional:true,skipSelf:true});return t.create(e,i||FD())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i!=null)return i;throw new D(901,false)}}return t})();function PD(){return new Kv([new zv])}var Kv=(()=>{class t{static \u0275prov=E({token:t,providedIn:"root",factory:PD});factories;constructor(e){this.factories=e;}static create(e,i){if(i){let r=i.factories.slice();e=e.concat(r);}return new t(e)}static extend(e){return {provide:t,useFactory:()=>{let i=d(t,{optional:true,skipSelf:true});return t.create(e,i||PD())}}}find(e){let i=this.factories.find(r=>r.supports(e));if(i)return i;throw new D(901,false)}}return t})(),Ge=(()=>{class t{static __NG_ELEMENT_ID__=UP}return t})();function UP(t){return HP(nt(),W(),(t&16)===16)}function HP(t,n,e){if(xi(t)&&!e){let i=un(t.index,n);return new pr(i,i)}else if(t.type&175){let i=n[jt];return new pr(i,n)}return null}var Wv=new g(""),zP=new g("");function Vl(t){return !t.moduleRef}function $P(t){let n=Vl(t)?t.r3Injector:t.moduleRef.injector,e=n.get(O);return e.run(()=>{Vl(t)?t.r3Injector.resolveInjectorInitializers():t.moduleRef.resolveInjectorInitializers();let i=n.get(fn),r;if(e.runOutsideAngular(()=>{r=e.onError.subscribe({next:i});}),Vl(t)){let o=()=>n.destroy(),s=t.platformInjector.get(Wv);s.add(o),n.onDestroy(()=>{r.unsubscribe(),s.delete(o);});}else {let o=()=>t.moduleRef.destroy(),s=t.platformInjector.get(Wv);s.add(o),t.moduleRef.onDestroy(()=>{wl(t.allPlatformModules,t.moduleRef),r.unsubscribe(),s.delete(o);});}return WP(i,e,()=>{let o=n.get(Si),s=o.add(),a=n.get(Av);return a.runInitializers(),a.donePromise.then(()=>{let l=n.get(Bl,jl);if(pD(l||jl),!n.get(zP,!0))return Vl(t)?n.get(Vt):(t.allPlatformModules.push(t.moduleRef),t.moduleRef);if(Vl(t)){let u=n.get(Vt);return t.rootComponent!==void 0&&u.bootstrap(t.rootComponent),u}else return GP?.(t.moduleRef,t.allPlatformModules),t.moduleRef}).finally(()=>{o.remove(s);})})})}var GP;function WP(t,n,e){try{let i=e();return Ai(i)?i.catch(r=>{throw n.runOutsideAngular(()=>t(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>t(i)),i}}var gf=null;function qP(t=[],n){return j.create({name:n,providers:[{provide:dl,useValue:"platform"},{provide:Wv,useValue:new Set([()=>gf=null])},...t]})}function YP(t=[]){if(gf)return gf;let n=qP(t);return gf=n,mD(),ZP(n),n}function ZP(t){let n=t.get(fu,null);ut(t,()=>{n?.forEach(e=>e());});}function UD(t){let{rootComponent:n,appProviders:e,platformProviders:i,platformRef:r}=t;Ie(ye.BootstrapApplicationStart);try{let o=r?.injector??YP(i),s=[AD(),$w,...e||[]],a=new Sl({providers:s,parent:o,debugName:"",runEnvironmentInitializers:!1});return $P({r3Injector:a.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{Ie(ye.BootstrapApplicationEnd);}}function de(t){return typeof t=="boolean"?t:t!=null&&t!=="false"}function ci(t,n=NaN){return !isNaN(parseFloat(t))&&!isNaN(Number(t))?Number(t):n}var jv=Symbol("NOT_SET"),HD=new Set,KP=Y(v({},el),{kind:"afterRenderEffectPhase",consumerIsAlwaysLive:true,consumerAllowSignalWrites:true,value:jv,cleanup:null,consumerMarkedDirty(){if(this.sequence.impl.executing){if(this.sequence.lastPhase===null||this.sequence.lastPhase<this.phase)return;this.sequence.erroredOrDestroyed=true;}this.sequence.scheduler.notify(7);},phaseFn(t){if(this.sequence.lastPhase=this.phase,!this.dirty)return this.signal;if(this.dirty=false,this.value!==jv&&!cs(this))return this.signal;try{for(let r of this.cleanup??HD)r();}finally{this.cleanup?.clear();}let n=[];t!==void 0&&n.push(t),n.push(this.registerCleanupFn);let e=nr(this),i;try{i=this.userFn.apply(null,n);}finally{no(this,e);}return (this.value===jv||!this.equal(this.value,i))&&(this.value=i,this.version++),this.signal}}),qv=class extends Dl{scheduler;lastPhase=null;nodes=[void 0,void 0,void 0,void 0];onDestroyFns=null;constructor(n,e,i,r,o,s=null){super(n,[void 0,void 0,void 0,void 0],i,false,o.get(xt),s),this.scheduler=r;for(let a of sv){let l=e[a];if(l===void 0)continue;let c=Object.create(KP);c.sequence=this,c.phase=a,c.userFn=l,c.dirty=true,c.signal=()=>(to(c),c.value),c.signal[ct]=c,c.registerCleanupFn=u=>(c.cleanup??=new Set).add(u),this.nodes[a]=c,this.hooks[a]=u=>c.phaseFn(u);}}afterRun(){super.afterRun(),this.lastPhase=null;}destroy(){if(this.onDestroyFns!==null)for(let n of this.onDestroyFns)n();super.destroy();for(let n of this.nodes)if(n)try{for(let e of n.cleanup??HD)e();}finally{ir(n);}}};function zD(t,n){let e=d(j),i=e.get(Qn),r=e.get(Wu),o=e.get(ai,null,{optional:true});r.impl??=e.get(av);let s=t;typeof s=="function"&&(s={mixedReadWrite:t});let a=e.get(xs,null,{optional:true}),l=new qv(r.impl,[s.earlyRead,s.write,s.mixedReadWrite,s.read],a?.view,i,e,o?.snapshot(null));return r.impl.register(l),l}function yf(t,n){let e=Ci(t),i=n.elementInjector||vs();return new Co(e).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}function $D(t){let n=Ci(t);if(!n)return null;let e=new Co(n);return {get selector(){return e.selector},get type(){return e.componentType},get inputs(){return e.inputs},get outputs(){return e.outputs},get ngContentSelectors(){return e.ngContentSelectors},get isStandalone(){return n.standalone},get isSignal(){return n.signals}}}var GD=null;function gn(){return GD}function Qv(t){GD??=t;}var zl=class{},So=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:()=>d(WD),providedIn:"platform"})}return t})(),Xv=new g(""),WD=(()=>{class t extends So{_location;_history;_doc=d(B);constructor(){super(),this._location=window.location,this._history=window.history;}getBaseHrefFromDOM(){return gn().getBaseHref(this._doc)}onPopState(e){let i=gn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",e,false),()=>i.removeEventListener("popstate",e)}onHashChange(e){let i=gn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",e,false),()=>i.removeEventListener("hashchange",e)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(e){this._location.pathname=e;}pushState(e,i,r){this._history.pushState(e,i,r);}replaceState(e,i,r){this._history.replaceState(e,i,r);}forward(){this._history.forward();}back(){this._history.back();}historyGo(e=0){this._history.go(e);}getState(){return this._history.state}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:()=>new t,providedIn:"platform"})}return t})();function bf(t,n){return t?n?t.endsWith("/")?n.startsWith("/")?t+n.slice(1):t+n:n.startsWith("/")?t+n:`${t}/${n}`:t:n}function qD(t){let n=t.search(/#|\?|$/);return t[n-1]==="/"?t.slice(0,n-1)+t.slice(n):t}function Vn(t){return t&&t[0]!=="?"?`?${t}`:t}var Ri=(()=>{class t{historyGo(e){throw new Error("")}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:()=>d(Cf),providedIn:"root"})}return t})(),wf=new g(""),Cf=(()=>{class t extends Ri{_platformLocation;_baseHref;_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??d(B).location?.origin??"";}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()();}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e));}getBaseHref(){return this._baseHref}prepareExternalUrl(e){return bf(this._baseHref,e)}path(e=false){let i=this._platformLocation.pathname+Vn(this._platformLocation.search),r=this._platformLocation.hash;return r&&e?`${i}${r}`:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Vn(o));this._platformLocation.pushState(e,i,s);}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Vn(o));this._platformLocation.replaceState(e,i,s);}forward(){this._platformLocation.forward();}back(){this._platformLocation.back();}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e);}static \u0275fac=function(i){return new(i||t)(L(So),L(wf,8))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var di=(()=>{class t{_subject=new _;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(e){this._locationStrategy=e;let i=this._locationStrategy.getBaseHref();this._basePath=JP(qD(YD(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(true),pop:true,state:r.state,type:r.type});});}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[];}path(e=false){return this.normalize(this._locationStrategy.path(e))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(e,i=""){return this.path()==this.normalize(e+Vn(i))}normalize(e){return t.stripTrailingSlash(XP(this._basePath,YD(e)))}prepareExternalUrl(e){return e&&e[0]!=="/"&&(e="/"+e),this._locationStrategy.prepareExternalUrl(e)}go(e,i="",r=null){this._locationStrategy.pushState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Vn(i)),r);}replaceState(e,i="",r=null){this._locationStrategy.replaceState(r,"",e,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(e+Vn(i)),r);}forward(){this._locationStrategy.forward();}back(){this._locationStrategy.back();}historyGo(e=0){this._locationStrategy.historyGo?.(e);}onUrlChange(e){return this._urlChangeListeners.push(e),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state);}),()=>{let i=this._urlChangeListeners.indexOf(e);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null);}}_notifyUrlChangeListeners(e="",i){this._urlChangeListeners.forEach(r=>r(e,i));}subscribe(e,i,r){return this._subject.subscribe({next:e,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Vn;static joinWithSlash=bf;static stripTrailingSlash=qD;static \u0275fac=function(i){return new(i||t)(L(Ri))};static \u0275prov=E({token:t,factory:()=>QP(),providedIn:"root"})}return t})();function QP(){return new di(L(Ri))}function XP(t,n){if(!t||!n.startsWith(t))return n;let e=n.substring(t.length);return e===""||["/",";","?","#"].includes(e[0])?e:n}function YD(t){return t.replace(/\/index\.html$/,"")}function JP(t){if(new RegExp("^(https?:)?//").test(t)){let[,e]=t.split(/\/\/[^\/]+/);return e}return t}var r_=(()=>{class t extends Ri{_platformLocation;_baseHref="";_removeListenerFns=[];constructor(e,i){super(),this._platformLocation=e,i!=null&&(this._baseHref=i);}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()();}onPopState(e){this._removeListenerFns.push(this._platformLocation.onPopState(e),this._platformLocation.onHashChange(e));}getBaseHref(){return this._baseHref}path(e=false){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(e){let i=bf(this._baseHref,e);return i.length>0?"#"+i:i}pushState(e,i,r,o){let s=this.prepareExternalUrl(r+Vn(o))||this._platformLocation.pathname;this._platformLocation.pushState(e,i,s);}replaceState(e,i,r,o){let s=this.prepareExternalUrl(r+Vn(o))||this._platformLocation.pathname;this._platformLocation.replaceState(e,i,s);}forward(){this._platformLocation.forward();}back(){this._platformLocation.back();}getState(){return this._platformLocation.getState()}historyGo(e=0){this._platformLocation.historyGo?.(e);}static \u0275fac=function(i){return new(i||t)(L(So),L(wf,8))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();var Ot=(function(t){return t[t.Format=0]="Format",t[t.Standalone=1]="Standalone",t})(Ot||{}),Ae=(function(t){return t[t.Narrow=0]="Narrow",t[t.Abbreviated=1]="Abbreviated",t[t.Wide=2]="Wide",t[t.Short=3]="Short",t})(Ae||{}),qt=(function(t){return t[t.Short=0]="Short",t[t.Medium=1]="Medium",t[t.Long=2]="Long",t[t.Full=3]="Full",t})(qt||{}),Ni={MinusSign:5};function KD(t){return en(t)[ot.LocaleId]}function QD(t,n,e){let i=en(t),r=[i[ot.DayPeriodsFormat],i[ot.DayPeriodsStandalone]],o=vn(r,n);return vn(o,e)}function XD(t,n,e){let i=en(t),r=[i[ot.DaysFormat],i[ot.DaysStandalone]],o=vn(r,n);return vn(o,e)}function JD(t,n,e){let i=en(t),r=[i[ot.MonthsFormat],i[ot.MonthsStandalone]],o=vn(r,n);return vn(o,e)}function ex(t,n){let i=en(t)[ot.Eras];return vn(i,n)}function $l(t,n){let e=en(t);return vn(e[ot.DateFormat],n)}function Gl(t,n){let e=en(t);return vn(e[ot.TimeFormat],n)}function Wl(t,n){let i=en(t)[ot.DateTimeFormat];return vn(i,n)}function ql(t,n){let e=en(t),i=e[ot.NumberSymbols][n];return i}function tx(t){if(!t[ot.ExtraData])throw new D(2303,false)}function nx(t){let n=en(t);return tx(n),(n[ot.ExtraData][2]||[]).map(i=>typeof i=="string"?Jv(i):[Jv(i[0]),Jv(i[1])])}function ix(t,n,e){let i=en(t);tx(i);let r=[i[ot.ExtraData][0],i[ot.ExtraData][1]],o=vn(r,n)||[];return vn(o,e)||[]}function vn(t,n){for(let e=n;e>-1;e--)if(typeof t[e]<"u")return t[e];throw new D(2304,false)}function Jv(t){let[n,e]=t.split(":");return {hours:+n,minutes:+e}}var e1=/^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,Df={},t1=/((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,n1=256;function rx(t,n,e,i){let r=f1(t);i1(n),n=Oi(e,n)||n;let s=[],a;for(;n;)if(a=t1.exec(n),a){s=s.concat(a.slice(1));let u=s.pop();if(!u)break;n=u;}else {s.push(n);break}let l=r.getTimezoneOffset();i&&(l=sx(i,l),r=u1(r,i));let c="";return s.forEach(u=>{let f=c1(u);c+=f?f(r,e,l):u==="''"?"'":u.replace(/(^'|'$)/g,"").replace(/''/g,"'");}),c}function i1(t){if(t.length>n1)throw new D(2300,false)}function Mf(t,n,e){let i=new Date(0);return i.setFullYear(t,n,e),i.setHours(0,0,0),i}function Oi(t,n){let e=KD(t);if(Df[e]??={},Df[e][n])return Df[e][n];let i="";switch(n){case "shortDate":i=$l(t,qt.Short);break;case "mediumDate":i=$l(t,qt.Medium);break;case "longDate":i=$l(t,qt.Long);break;case "fullDate":i=$l(t,qt.Full);break;case "shortTime":i=Gl(t,qt.Short);break;case "mediumTime":i=Gl(t,qt.Medium);break;case "longTime":i=Gl(t,qt.Long);break;case "fullTime":i=Gl(t,qt.Full);break;case "short":let r=Oi(t,"shortTime"),o=Oi(t,"shortDate");i=xf(Wl(t,qt.Short),[r,o]);break;case "medium":let s=Oi(t,"mediumTime"),a=Oi(t,"mediumDate");i=xf(Wl(t,qt.Medium),[s,a]);break;case "long":let l=Oi(t,"longTime"),c=Oi(t,"longDate");i=xf(Wl(t,qt.Long),[l,c]);break;case "full":let u=Oi(t,"fullTime"),f=Oi(t,"fullDate");i=xf(Wl(t,qt.Full),[u,f]);break}return i&&(Df[e][n]=i),i}function xf(t,n){return n&&(t=t.replace(/\{([^}]+)}/g,function(e,i){return Object.hasOwn(n,i)?n[i]:e})),t}function Un(t,n,e="-",i,r){let o="";(t<0||r&&t<=0)&&(r?t=-t+1:(t=-t,o=e));let s=String(t);for(;s.length<n;)s="0"+s;return i&&(s=s.slice(s.length-n)),o+s}function r1(t,n){return Un(t,3).substring(0,n)}function st(t,n,e=0,i=false,r=false){return function(o,s){let a=o1(t,o);if((e>0||a>-e)&&(a+=e),t===3)a===0&&e===-12&&(a=12);else if(t===6)return r1(a,n);let l=ql(s,Ni.MinusSign);return Un(a,n,l,i,r)}}function o1(t,n){switch(t){case 0:return n.getFullYear();case 1:return n.getMonth();case 2:return n.getDate();case 3:return n.getHours();case 4:return n.getMinutes();case 5:return n.getSeconds();case 6:return n.getMilliseconds();case 7:return n.getDay();default:throw new D(2301,false)}}function Pe(t,n,e=Ot.Format,i=false){return function(r,o){return s1(r,o,t,n,e,i)}}function s1(t,n,e,i,r,o){switch(e){case 2:return JD(n,r,i)[t.getMonth()];case 1:return XD(n,r,i)[t.getDay()];case 0:let s=t.getHours(),a=t.getMinutes();if(o){let c=nx(n),u=ix(n,r,i),f=c.findIndex(m=>{if(Array.isArray(m)){let[h,p]=m,b=s>=h.hours&&a>=h.minutes,x=s<p.hours||s===p.hours&&a<p.minutes;if(h.hours<p.hours){if(b&&x)return  true}else if(b||x)return  true}else if(m.hours===s&&m.minutes===a)return  true;return  false});if(f!==-1)return u[f]}return QD(n,r,i)[s<12?0:1];case 3:return ex(n,i)[t.getFullYear()<=0?0:1];default:throw new D(2302,false)}}function Ef(t){return function(n,e,i){let r=-1*i,o=ql(e,Ni.MinusSign),s=r>0?Math.floor(r/60):Math.ceil(r/60);switch(t){case 0:return (r>=0?"+":"")+Un(s,2,o)+Un(Math.abs(r%60),2,o);case 1:return "GMT"+(r>=0?"+":"")+Un(s,1,o);case 2:return "GMT"+(r>=0?"+":"")+Un(s,2,o)+":"+Un(Math.abs(r%60),2,o);case 3:return i===0?"Z":(r>=0?"+":"")+Un(s,2,o)+":"+Un(Math.abs(r%60),2,o);default:throw new D(2310,false)}}}var a1=0,If=4;function l1(t){let n=Mf(t,a1,1).getDay();return Mf(t,0,1+(n<=If?If:If+7)-n)}function ox(t){let n=t.getDay(),e=n===0?-3:If-n;return Mf(t.getFullYear(),t.getMonth(),t.getDate()+e)}function e_(t,n=false){return function(e,i){let r;if(n){let o=new Date(e.getFullYear(),e.getMonth(),1).getDay()-1,s=e.getDate();r=1+Math.floor((s+o)/7);}else {let o=ox(e),s=l1(o.getFullYear()),a=o.getTime()-s.getTime();r=1+Math.round(a/6048e5);}return Un(r,t,ql(i,Ni.MinusSign))}}function Sf(t,n=false){return function(e,i){let o=ox(e).getFullYear();return Un(o,t,ql(i,Ni.MinusSign),n)}}var t_={};function c1(t){if(t_[t])return t_[t];let n;switch(t){case "G":case "GG":case "GGG":n=Pe(3,Ae.Abbreviated);break;case "GGGG":n=Pe(3,Ae.Wide);break;case "GGGGG":n=Pe(3,Ae.Narrow);break;case "y":n=st(0,1,0,false,true);break;case "yy":n=st(0,2,0,true,true);break;case "yyy":n=st(0,3,0,false,true);break;case "yyyy":n=st(0,4,0,false,true);break;case "Y":n=Sf(1);break;case "YY":n=Sf(2,true);break;case "YYY":n=Sf(3);break;case "YYYY":n=Sf(4);break;case "M":case "L":n=st(1,1,1);break;case "MM":case "LL":n=st(1,2,1);break;case "MMM":n=Pe(2,Ae.Abbreviated);break;case "MMMM":n=Pe(2,Ae.Wide);break;case "MMMMM":n=Pe(2,Ae.Narrow);break;case "LLL":n=Pe(2,Ae.Abbreviated,Ot.Standalone);break;case "LLLL":n=Pe(2,Ae.Wide,Ot.Standalone);break;case "LLLLL":n=Pe(2,Ae.Narrow,Ot.Standalone);break;case "w":n=e_(1);break;case "ww":n=e_(2);break;case "W":n=e_(1,true);break;case "d":n=st(2,1);break;case "dd":n=st(2,2);break;case "c":case "cc":n=st(7,1);break;case "ccc":n=Pe(1,Ae.Abbreviated,Ot.Standalone);break;case "cccc":n=Pe(1,Ae.Wide,Ot.Standalone);break;case "ccccc":n=Pe(1,Ae.Narrow,Ot.Standalone);break;case "cccccc":n=Pe(1,Ae.Short,Ot.Standalone);break;case "E":case "EE":case "EEE":n=Pe(1,Ae.Abbreviated);break;case "EEEE":n=Pe(1,Ae.Wide);break;case "EEEEE":n=Pe(1,Ae.Narrow);break;case "EEEEEE":n=Pe(1,Ae.Short);break;case "a":case "aa":case "aaa":n=Pe(0,Ae.Abbreviated);break;case "aaaa":n=Pe(0,Ae.Wide);break;case "aaaaa":n=Pe(0,Ae.Narrow);break;case "b":case "bb":case "bbb":n=Pe(0,Ae.Abbreviated,Ot.Standalone,true);break;case "bbbb":n=Pe(0,Ae.Wide,Ot.Standalone,true);break;case "bbbbb":n=Pe(0,Ae.Narrow,Ot.Standalone,true);break;case "B":case "BB":case "BBB":n=Pe(0,Ae.Abbreviated,Ot.Format,true);break;case "BBBB":n=Pe(0,Ae.Wide,Ot.Format,true);break;case "BBBBB":n=Pe(0,Ae.Narrow,Ot.Format,true);break;case "h":n=st(3,1,-12);break;case "hh":n=st(3,2,-12);break;case "H":n=st(3,1);break;case "HH":n=st(3,2);break;case "m":n=st(4,1);break;case "mm":n=st(4,2);break;case "s":n=st(5,1);break;case "ss":n=st(5,2);break;case "S":n=st(6,1);break;case "SS":n=st(6,2);break;case "SSS":n=st(6,3);break;case "Z":case "ZZ":case "ZZZ":n=Ef(0);break;case "ZZZZZ":n=Ef(3);break;case "O":case "OO":case "OOO":case "z":case "zz":case "zzz":n=Ef(1);break;case "OOOO":case "ZZZZ":case "zzzz":n=Ef(2);break;default:return null}return t_[t]=n,n}function sx(t,n){t=t.replace(/:/g,"");let e=Date.parse("Jan 01, 1970 00:00:00 "+t)/6e4;return isNaN(e)?n:e}function d1(t,n){return t=new Date(t.getTime()),t.setMinutes(t.getMinutes()+n),t}function u1(t,n,e){let r=t.getTimezoneOffset(),o=sx(n,r);return d1(t,-1*(o-r))}function f1(t){if(ZD(t))return t;if(typeof t=="number"&&!isNaN(t))return new Date(t);if(typeof t=="string"){if(t=t.trim(),/^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(t)){let[r,o=1,s=1]=t.split("-").map(a=>+a);return Mf(r,o-1,s)}let e=parseFloat(t);if(!isNaN(t-e))return new Date(e);let i;if(i=t.match(e1))return m1(i)}let n=new Date(t);if(!ZD(n))throw new D(2311,false);return n}function m1(t){let n=new Date(0),e=0,i=0,r=t[8]?n.setUTCFullYear:n.setFullYear,o=t[8]?n.setUTCHours:n.setHours;t[9]&&(e=Number(t[9]+t[10]),i=Number(t[9]+t[11])),r.call(n,Number(t[1]),Number(t[2])-1,Number(t[3]));let s=Number(t[4]||0)-e,a=Number(t[5]||0)-i,l=Number(t[6]||0),c=Math.floor(parseFloat("0."+(t[7]||0))*1e3);return o.call(n,s,a,l,c),n}function ZD(t){return t instanceof Date&&!isNaN(t.valueOf())}var h1=(()=>{class t{_ngEl;_differs;_renderer;_ngStyle=null;_differ=null;constructor(e,i,r){this._ngEl=e,this._differs=i,this._renderer=r;}set ngStyle(e){this._ngStyle=e,!this._differ&&e&&(this._differ=this._differs.find(e).create());}ngDoCheck(){if(this._differ){let e=this._differ.diff(this._ngStyle);e&&this._applyChanges(e);}}_setStyle(e,i){let[r,o]=e.split("."),s=r.indexOf("-")===-1?void 0:Pn.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,o?`${i}${o}`:i,s):this._renderer.removeStyle(this._ngEl.nativeElement,r,s);}_applyChanges(e){e.forEachRemovedItem(i=>this._setStyle(i.key,null)),e.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),e.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue));}static \u0275fac=function(i){return new(i||t)(pe(F),pe(Kv),pe(Oe))};static \u0275dir=I({type:t,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"}})}return t})(),Yl=(()=>{class t{_viewContainerRef;_viewRef=null;ngTemplateOutletContext=null;ngTemplateOutlet=null;ngTemplateOutletInjector=null;injector=d(j);constructor(e){this._viewContainerRef=e;}ngOnChanges(e){if(this._shouldRecreateView(e)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this._getInjector()});}}_getInjector(){return this.ngTemplateOutletInjector==="outlet"?this.injector:this.ngTemplateOutletInjector??void 0}_shouldRecreateView(e){return !!e.ngTemplateOutlet||!!e.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(e,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):false,get:(e,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}static \u0275fac=function(i){return new(i||t)(pe(kt))};static \u0275dir=I({type:t,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},features:[Ye]})}return t})();function ax(t,n){return new D(2100,false)}var n_=class{createSubscription(n,e,i){return Fe(()=>n.subscribe({next:e,error:i}))}dispose(n){Fe(()=>n.unsubscribe());}},i_=class{createSubscription(n,e,i){return n.then(r=>e?.(r),r=>i?.(r)),{unsubscribe:()=>{e=null,i=null;}}}dispose(n){n.unsubscribe();}},p1=new i_,g1=new n_,o_=(()=>{class t{_ref;_latestValue=null;markForCheckOnValueUpdate=true;_subscription=null;_obj=null;_strategy=null;applicationErrorHandler=d(fn);constructor(e){this._ref=e;}ngOnDestroy(){this._subscription&&this._dispose(),this._ref=null;}transform(e){if(!this._obj){if(e)try{this.markForCheckOnValueUpdate=!1,this._subscribe(e);}finally{this.markForCheckOnValueUpdate=true;}return this._latestValue}return e!==this._obj?(this._dispose(),this.transform(e)):this._latestValue}_subscribe(e){this._obj=e,this._strategy=this._selectStrategy(e),this._subscription=this._strategy.createSubscription(e,i=>this._updateLatestValue(e,i),i=>this.applicationErrorHandler(i));}_selectStrategy(e){if(Ai(e))return p1;if(nf(e))return g1;throw ax()}_dispose(){this._strategy.dispose(this._subscription),this._latestValue=null,this._subscription=null,this._obj=null;}_updateLatestValue(e,i){e===this._obj&&(this._latestValue=i,this.markForCheckOnValueUpdate&&this._ref?.markForCheck());}static \u0275fac=function(i){return new(i||t)(pe(Ge,16))};static \u0275pipe=of({name:"async",type:t,pure:false})}return t})();var v1="mediumDate",lx=new g(""),cx=new g(""),_1=(()=>{class t{locale;defaultTimezone;defaultOptions;constructor(e,i,r){this.locale=e,this.defaultTimezone=i,this.defaultOptions=r;}transform(e,i,r,o){if(e==null||e===""||e!==e)return null;try{let s=i??this.defaultOptions?.dateFormat??v1,a=r??this.defaultOptions?.timezone??this.defaultTimezone??void 0;return rx(e,s,o||this.locale,a)}catch(s){throw ax(t,s.message)}}static \u0275fac=function(i){return new(i||t)(pe(Bl,16),pe(lx,24),pe(cx,24))};static \u0275pipe=of({name:"date",type:t,pure:true})}return t})();var Tf=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();function s_(t,n){n=encodeURIComponent(n);for(let e of t.split(";")){let i=e.indexOf("="),[r,o]=i==-1?[e,""]:[e.slice(0,i),e.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var l_="browser";function dx(t){return t===l_}var c_=(()=>{class t{static \u0275prov=E({token:t,providedIn:"root",factory:()=>new a_(d(B),window)})}return t})(),a_=class{document;window;offset=()=>[0,0];constructor(n,e){this.document=n,this.window=e;}setOffset(n){Array.isArray(n)?this.offset=()=>n:this.offset=n;}getScrollPosition(){return [this.window.scrollX,this.window.scrollY]}scrollToPosition(n,e){this.window.scrollTo(Y(v({},e),{left:n[0],top:n[1]}));}scrollToAnchor(n,e){let i=b1(this.document,n);i&&(this.scrollToElement(i,e),i.focus({preventScroll:true}));}setHistoryScrollRestoration(n){try{this.window.history.scrollRestoration=n;}catch{console.warn(Xn(2400,false));}}scrollToElement(n,e){let i=n.getBoundingClientRect(),r=i.left+this.window.pageXOffset,o=i.top+this.window.pageYOffset,s=this.offset();this.window.scrollTo(Y(v({},e),{left:r-s[0],top:o-s[1]}));}};function b1(t,n){let e=t.getElementById(n)||t.getElementsByName(n)[0];if(e)return e;if(typeof t.createTreeWalker=="function"&&t.body&&typeof t.body.attachShadow=="function"){let i=t.createTreeWalker(t.body,NodeFilter.SHOW_ELEMENT),r=i.currentNode;for(;r;){let o=r.shadowRoot;if(o){let s=o.getElementById(n)||o.querySelector(`[name="${CSS.escape(n)}"]`);if(s)return s}r=i.nextNode();}}return null}var Zl=class{_doc;constructor(n){this._doc=n;}manager},Af=(()=>{class t extends Zl{constructor(e){super(e);}supports(e){return  true}addEventListener(e,i,r,o){return e.addEventListener(i,r,o),()=>this.removeEventListener(e,i,r,o)}removeEventListener(e,i,r,o){return e.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||t)(L(B))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})(),Of=new g(""),m_=(()=>{class t{_zone;_plugins;_eventNameToPlugin=new Map;constructor(e,i){this._zone=i,e.forEach(s=>{s.manager=this;});let r=e.filter(s=>!(s instanceof Af));this._plugins=r.slice().reverse();let o=e.find(s=>s instanceof Af);o&&this._plugins.push(o);}addEventListener(e,i,r,o){return this._findPluginFor(i).addEventListener(e,i,r,o)}getZone(){return this._zone}_findPluginFor(e){let i=this._eventNameToPlugin.get(e);if(i)return i;if(i=this._plugins.find(o=>o.supports(e)),!i)throw new D(-5101,false);return this._eventNameToPlugin.set(e,i),i}static \u0275fac=function(i){return new(i||t)(L(Of),L(O))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})(),d_="ng-app-id";function ux(t){for(let n of t)n.remove();}function fx(t,n){let e=n.createElement("style");return e.textContent=t,e}function w1(t,n,e,i){let r=t.head?.querySelectorAll(`style[${d_}="${n}"],link[${d_}="${n}"]`);if(!r||r.length===0)return  false;for(let o of r)o.removeAttribute(d_),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&e.set(o.textContent,{usage:0,elements:[o]});return  true}function f_(t,n){let e=n.createElement("link");return e.setAttribute("rel","stylesheet"),e.setAttribute("href",t),e}var h_=(()=>{class t{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(e,i,r,o={}){this.doc=e,this.appId=i,this.nonce=r,w1(e,i,this.inline,this.external)&&this.hosts.add(e.head);}addStyles(e,i){for(let r of e)this.addUsage(r,this.inline,fx);i?.forEach(r=>this.addUsage(r,this.external,f_));}removeStyles(e,i){for(let r of e)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external));}addUsage(e,i,r){let o=i.get(e);o?o.usage++:i.set(e,{usage:1,elements:[...this.hosts].map(s=>this.addElement(s,r(e,this.doc)))});}removeUsage(e,i){let r=i.get(e);r&&(r.usage--,r.usage<=0&&(ux(r.elements),i.delete(e)));}ngOnDestroy(){for(let[,{elements:e}]of [...this.inline,...this.external])ux(e);this.hosts.clear();}addHost(e){if(!this.hosts.has(e)){this.hosts.add(e);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(e,fx(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(e,f_(i,this.doc)));}}removeHost(e){this.hosts.delete(e);for(let i of [...this.inline.values(),...this.external.values()]){let r=[];for(let o of i.elements)o.parentNode===e?o.remove():r.push(o);i.elements=r;}}addElement(e,i){return this.nonce&&i.setAttribute("nonce",this.nonce),e.appendChild(i)}static \u0275fac=function(i){return new(i||t)(L(B),L(Ii),L(vo,8),L(go))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})(),u_={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},p_=/%COMP%/g;var hx="%COMP%",C1=`_nghost-${hx}`,D1=`_ngcontent-${hx}`,x1=true,E1=new g("",{factory:()=>x1});function S1(t){return D1.replace(p_,t)}function I1(t){return C1.replace(p_,t)}function px(t,n){return n.map(e=>e.replace(p_,t))}var g_=(()=>{class t{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(e,i,r,o,s,a,l=null,c=null){this.eventManager=e,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=s,this.ngZone=a,this.nonce=l,this.tracingService=c,this.defaultRenderer=new Kl(e,s,a,this.tracingService);}createRenderer(e,i){if(!e||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(e,i);return r instanceof Rf?r.applyToHost(e):r instanceof Ql&&r.applyStyles(),r}getOrCreateRenderer(e,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let s=this.doc,a=this.ngZone,l=this.eventManager,c=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Fn.Emulated:o=new Rf(l,c,i,this.appId,u,s,a,f);break;case Fn.ShadowDom:return new kf(l,e,i,s,a,this.nonce,f,c);case Fn.ExperimentalIsolatedShadowDom:return new kf(l,e,i,s,a,this.nonce,f);default:o=new Ql(l,c,i,u,s,a,f);break}r.set(i.id,o);}return o}ngOnDestroy(){this.rendererByCompId.clear();}componentReplaced(e){this.rendererByCompId.delete(e);}static \u0275fac=function(i){return new(i||t)(L(m_),L(xo),L(Ii),L(E1),L(B),L(O),L(vo),L(ai,8))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})(),Kl=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=true;constructor(n,e,i,r){this.eventManager=n,this.doc=e,this.ngZone=i,this.tracingService=r;}destroy(){}destroyNode=null;createElement(n,e){return e?this.doc.createElementNS(u_[e]||e,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,e){(mx(n)?n.content:n).appendChild(e);}insertBefore(n,e,i){n&&(mx(n)?n.content:n).insertBefore(e,i);}removeChild(n,e){e.remove();}selectRootElement(n,e){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new D(-5104,false);return e||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,e,i,r){if(r){e=r+":"+e;let o=u_[r];o?n.setAttributeNS(o,e,i):n.setAttribute(e,i);}else n.setAttribute(e,i);}removeAttribute(n,e,i){if(i){let r=u_[i];r?n.removeAttributeNS(r,e):n.removeAttribute(`${i}:${e}`);}else n.removeAttribute(e);}addClass(n,e){n.classList.add(e);}removeClass(n,e){n.classList.remove(e);}setStyle(n,e,i,r){r&(Pn.DashCase|Pn.Important)?n.style.setProperty(e,i,r&Pn.Important?"important":""):n.style[e]=i;}removeStyle(n,e,i){i&Pn.DashCase?n.style.removeProperty(e):n.style[e]="";}setProperty(n,e,i){n!=null&&(n[e]=i);}setValue(n,e){n.nodeValue=e;}listen(n,e,i,r){if(typeof n=="string"&&(n=gn().getGlobalEventTarget(this.doc,n),!n))throw new D(-5102,false);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,e,o)),this.eventManager.addEventListener(n,e,o,r)}decoratePreventDefault(n){return e=>{if(e==="__ngUnwrap__")return n;n(e)===false&&e.preventDefault();}}};function mx(t){return t.tagName==="TEMPLATE"&&t.content!==void 0}var kf=class extends Kl{hostEl;sharedStylesHost;shadowRoot;constructor(n,e,i,r,o,s,a,l){super(n,r,o,a),this.hostEl=e,this.sharedStylesHost=l,this.shadowRoot=e.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let c=i.styles;c=px(i.id,c);for(let f of c){let m=document.createElement("style");s&&m.setAttribute("nonce",s),m.textContent=f,this.shadowRoot.appendChild(m);}let u=i.getExternalStyles?.();if(u)for(let f of u){let m=f_(f,r);s&&m.setAttribute("nonce",s),this.shadowRoot.appendChild(m);}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,e){return super.appendChild(this.nodeOrShadowRoot(n),e)}insertBefore(n,e,i){return super.insertBefore(this.nodeOrShadowRoot(n),e,i)}removeChild(n,e){return super.removeChild(null,e)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot);}},Ql=class extends Kl{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,e,i,r,o,s,a,l){super(n,o,s,a),this.sharedStylesHost=e,this.removeStylesOnCompDestroy=r;let c=i.styles;this.styles=l?px(l,c):c,this.styleUrls=i.getExternalStyles?.(l);}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls);}destroy(){this.removeStylesOnCompDestroy&&hr.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls);}},Rf=class extends Ql{contentAttr;hostAttr;constructor(n,e,i,r,o,s,a,l){let c=r+"-"+i.id;super(n,e,i,o,s,a,l,c),this.contentAttr=S1(c),this.hostAttr=I1(c);}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"");}createElement(n,e){let i=super.createElement(n,e);return super.setAttribute(i,this.contentAttr,""),i}};var Nf=class t extends zl{supportsDOMEvents=true;static makeCurrent(){Qv(new t);}onAndCancel(n,e,i,r){return n.addEventListener(e,i,r),()=>{n.removeEventListener(e,i,r);}}dispatchEvent(n,e){n.dispatchEvent(e);}remove(n){n.remove();}createElement(n,e){return e=e||this.getDefaultDocument(),e.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,e){return e==="window"?window:e==="document"?n:e==="body"?n.body:null}getBaseHref(n){let e=M1();return e==null?null:T1(e)}resetBaseElement(){Xl=null;}getUserAgent(){return window.navigator.userAgent}getCookie(n){return s_(document.cookie,n)}},Xl=null;function M1(){return Xl=Xl||document.head.querySelector("base"),Xl?Xl.getAttribute("href"):null}function T1(t){return new URL(t,document.baseURI).pathname}var gx=["alt","control","meta","shift"],A1={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},k1={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey},vx=(()=>{class t extends Zl{constructor(e){super(e);}supports(e){return t.parseEventName(e)!=null}addEventListener(e,i,r,o){let s=t.parseEventName(i),a=t.eventCallback(s.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>gn().onAndCancel(e,s.domEventName,a,o))}static parseEventName(e){let i=e.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=t._normalizeKey(i.pop()),s="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),s="code."),gx.forEach(c=>{let u=i.indexOf(c);u>-1&&(i.splice(u,1),s+=c+".");}),s+=o,i.length!=0||o.length===0)return null;let l={};return l.domEventName=r,l.fullKey=s,l}static matchEventFullKeyCode(e,i){let r=A1[e.key]||e.key,o="";return i.indexOf("code.")>-1&&(r=e.code,o="code."),r==null||!r?false:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),gx.forEach(s=>{if(s!==r){let a=k1[s];a(e)&&(o+=s+".");}}),o+=r,o===i)}static eventCallback(e,i,r){return o=>{t.matchEventFullKeyCode(o,e)&&r.runGuarded(()=>i(o));}}static _normalizeKey(e){return e==="esc"?"escape":e}static \u0275fac=function(i){return new(i||t)(L(B))};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();async function R1(t,n,e){let i=v({rootComponent:t},O1(n,e));return UD(i)}function O1(t,n){return {platformRef:n?.platformRef,appProviders:[...j1,...t?.providers??[]],platformProviders:L1}}function N1(){Nf.makeCurrent();}function F1(){return new Gt}function P1(){return Yg(document),document}var L1=[{provide:go,useValue:l_},{provide:fu,useValue:N1,multi:true},{provide:B,useFactory:P1}];var j1=[{provide:dl,useValue:"root"},{provide:Gt,useFactory:F1},{provide:Of,useClass:Af,multi:true},{provide:Of,useClass:vx,multi:true},g_,{provide:xo,useClass:h_},{provide:h_,useExisting:xo},m_,{provide:it,useExisting:g_},[]];var yn=class t{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(e=>{let i=e.indexOf(":");if(i>0){let r=e.slice(0,i),o=e.slice(i+1).trim();this.addHeaderEntry(r,o);}});}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((e,i)=>{this.addHeaderEntry(i,e);})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([e,i])=>{this.setHeaderEntries(e,i);});}:this.headers=new Map;}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let e=this.headers.get(n.toLowerCase());return e&&e.length>0?e[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,e){return this.clone({name:n,value:e,op:"a"})}set(n,e){return this.clone({name:n,value:e,op:"s"})}delete(n,e){return this.clone({name:n,value:e,op:"d"})}maybeSetNormalizedName(n,e){this.normalizedNames.has(e)||this.normalizedNames.set(e,n);}init(){this.lazyInit&&(this.lazyInit instanceof t?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null));}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(e=>{this.headers.set(e,n.headers.get(e)),this.normalizedNames.set(e,n.normalizedNames.get(e));});}clone(n){let e=new t;return e.lazyInit=this.lazyInit&&this.lazyInit instanceof t?this.lazyInit:this,e.lazyUpdate=(this.lazyUpdate||[]).concat([n]),e}applyUpdate(n){let e=n.name.toLowerCase();switch(n.op){case "a":case "s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,e);let r=(n.op==="a"?this.headers.get(e):void 0)||[];r.push(...i),this.headers.set(e,r);break;case "d":let o=n.value;if(!o)this.headers.delete(e),this.normalizedNames.delete(e);else {let s=this.headers.get(e);if(!s)return;s=s.filter(a=>o.indexOf(a)===-1),s.length===0?(this.headers.delete(e),this.normalizedNames.delete(e)):this.headers.set(e,s);}break}}addHeaderEntry(n,e){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(e):this.headers.set(i,[e]);}setHeaderEntries(n,e){let i=(Array.isArray(e)?e:[e]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r);}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(e=>n(this.normalizedNames.get(e),this.headers.get(e)));}};var y_=class{map=new Map;set(n,e){return this.map.set(n,e),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},b_=class{encodeKey(n){return _x(n)}encodeValue(n){return _x(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function B1(t,n){let e=new Map;return t.length>0&&t.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[s,a]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],l=e.get(s)||[];l.push(a),e.set(s,l);}),e}var V1=/%(\d[a-f0-9])/gi,U1={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function _x(t){return encodeURIComponent(t).replace(V1,(n,e)=>U1[e]??n)}function Ff(t){return `${t}`}var _n=class t{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new b_,n.fromString){if(n.fromObject)throw new D(2805,false);this.map=B1(n.fromString,this.encoder);}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(e=>{let i=n.fromObject[e],r=Array.isArray(i)?i.map(Ff):[Ff(i)];this.map.set(e,r);})):this.map=null;}has(n){return this.init(),this.map.has(n)}get(n){this.init();let e=this.map.get(n);return e?e[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,e){return this.clone({param:n,value:e,op:"a"})}appendAll(n){let e=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{e.push({param:i,value:o,op:"a"});}):e.push({param:i,value:r,op:"a"});}),this.clone(e)}set(n,e){return this.clone({param:n,value:e,op:"s"})}delete(n,e){return this.clone({param:n,value:e,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let e=this.encoder.encodeKey(n);return this.map.get(n).map(i=>e+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let e=new t({encoder:this.encoder});return e.cloneFrom=this.cloneFrom||this,e.updates=(this.updates||[]).concat(n),e}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case "a":case "s":let e=(n.op==="a"?this.map.get(n.param):void 0)||[];e.push(Ff(n.value)),this.map.set(n.param,e);break;case "d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(Ff(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param);}else {this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null);}};function H1(t){switch(t){case "DELETE":case "GET":case "HEAD":case "OPTIONS":case "JSONP":return  false;default:return  true}}function yx(t){return typeof ArrayBuffer<"u"&&t instanceof ArrayBuffer}function bx(t){return typeof Blob<"u"&&t instanceof Blob}function wx(t){return typeof FormData<"u"&&t instanceof FormData}function z1(t){return typeof URLSearchParams<"u"&&t instanceof URLSearchParams}var v_="Content-Type",Cx="Accept",xx="text/plain",Ex="application/json",$1=`${Ex}, ${xx}, */*`,js=class t{url;body=null;headers;context;reportProgress=false;reportUploadProgress=false;reportDownloadProgress=false;withCredentials=false;credentials;keepalive=false;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,e,i,r){this.url=e,this.method=n.toUpperCase();let o;if(H1(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.reportUploadProgress=!!o.reportUploadProgress,this.reportDownloadProgress=!!o.reportDownloadProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new D(2822,"");this.timeout=o.timeout;}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer!==void 0&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache;}if(this.headers??=new yn,this.context??=new y_,!this.params)this.params=new _n,this.urlWithParams=e;else {let s=this.params.toString();if(s.length===0)this.urlWithParams=e;else {let a=e,l="",c=e.indexOf("#");c!==-1&&(l=e.substring(c),a=e.substring(0,c));let u=a.indexOf("?"),f=u===-1?"?":u<a.length-1?"&":"";this.urlWithParams=a+f+s+l;}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||yx(this.body)||bx(this.body)||wx(this.body)||z1(this.body)?this.body:this.body instanceof _n?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||wx(this.body)?null:bx(this.body)?this.body.type||null:yx(this.body)?null:typeof this.body=="string"?xx:this.body instanceof _n?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Ex:null}clone(n={}){let e=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,s=n.priority||this.priority,a=n.cache||this.cache,l=n.mode||this.mode,c=n.redirect||this.redirect,u=n.credentials||this.credentials,f=n.referrer??this.referrer,m=n.integrity||this.integrity,h=n.referrerPolicy||this.referrerPolicy,p=n.transferCache??this.transferCache,b=n.timeout??this.timeout,x=n.body!==void 0?n.body:this.body,P=n.withCredentials??this.withCredentials,_e=n.reportProgress??this.reportProgress,He=n.reportUploadProgress??this.reportUploadProgress,En=n.reportDownloadProgress??this.reportDownloadProgress,qn=n.headers||this.headers,$r=n.params||this.params,ed=n.context??this.context;return n.setHeaders!==void 0&&(qn=Object.keys(n.setHeaders).reduce((es,Gr)=>es.set(Gr,n.setHeaders[Gr]),qn)),n.setParams&&($r=Object.keys(n.setParams).reduce((es,Gr)=>es.set(Gr,n.setParams[Gr]),$r)),new t(e,i,x,{params:$r,headers:qn,context:ed,reportProgress:_e,reportUploadProgress:He,reportDownloadProgress:En,responseType:r,withCredentials:P,transferCache:p,keepalive:o,cache:a,priority:s,timeout:b,mode:l,redirect:c,credentials:u,referrer:f,integrity:m,referrerPolicy:h})}},Bs=(function(t){return t[t.Sent=0]="Sent",t[t.UploadProgress=1]="UploadProgress",t[t.ResponseHeader=2]="ResponseHeader",t[t.DownloadProgress=3]="DownloadProgress",t[t.Response=4]="Response",t[t.User=5]="User",t})(Bs||{}),Jl=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,e=200,i="OK"){this.headers=n.headers||new yn,this.status=n.status!==void 0?n.status:e,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300;}},w_=class t extends Jl{constructor(n={}){super(n);}type=Bs.ResponseHeader;clone(n={}){return new t({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},ec=class t extends Jl{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null;}type=Bs.Response;clone(n={}){return new t({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},Io=class extends Jl{name="HttpErrorResponse";message;error;ok=false;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null;}},G1=200;var W1=/^\)\]\}',?\n/,q1=new g("",{factory:()=>null}),Y1=(()=>{class t{fetchImpl=d(C_,{optional:true})?.fetch??((...e)=>globalThis.fetch(...e));ngZone=d(O);destroyRef=d(xt);maxResponseSize=d(q1);handle(e){return new Z(i=>{let r=new AbortController;this.doRequest(e,r.signal,i).then(D_,s=>i.error(new Io({error:s})));let o;return e.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"));},e.timeout))),()=>{o!==void 0&&clearTimeout(o),r.abort();}})}async doRequest(e,i,r){let o=this.createRequestInit(e),s;try{let x=this.ngZone.runOutsideAngular(()=>this.fetchImpl(e.urlWithParams,v({signal:i},o)));Z1(x),r.next({type:Bs.Sent}),s=await x;}catch(x){r.error(new Io({error:x,status:x.status??0,statusText:x.statusText,url:e.urlWithParams,headers:x.headers}));return}let a=new yn(s.headers),l=s.statusText,c=s.url||e.urlWithParams,u=s.status,f=null,m=e.reportProgress||e.reportDownloadProgress;if(m&&r.next(new w_({headers:a,status:u,statusText:l,url:c})),s.body){let x=s.headers.get("content-length"),P=x!==null?Number(x):NaN;this.maxResponseSize!==null&&Number.isFinite(P)&&P>this.maxResponseSize&&Dx(this.maxResponseSize);let _e=[],He=s.body.getReader(),En=0,qn,$r,ed=typeof Zone<"u"&&Zone.current,es=false;if(await this.ngZone.runOutsideAngular(async()=>{for(;;){if(this.destroyRef.destroyed){await He.cancel(),es=true;break}let{done:Va,value:Ih}=await He.read();if(Va)break;if(_e.push(Ih),En+=Ih.length,this.maxResponseSize!==null&&En>this.maxResponseSize&&(await He.cancel(),Dx(this.maxResponseSize)),m){$r=e.responseType==="text"?($r??"")+(qn??=new TextDecoder).decode(Ih,{stream:true}):void 0;let ub=()=>r.next({type:Bs.DownloadProgress,total:Number.isFinite(P)?P:void 0,loaded:En,partialText:$r});ed?ed.run(ub):ub();}}}),es){r.complete();return}let Gr=this.concatChunks(_e,En);try{let Va=s.headers.get(v_)??"";f=this.parseBody(e,Gr,Va,u);}catch(Va){r.error(new Io({error:Va,headers:new yn(s.headers),status:s.status,statusText:s.statusText,url:s.url||e.urlWithParams}));return}}u===0&&(u=f?G1:0);let h=u>=200&&u<300,p=s.redirected,b=s.type;h?(r.next(new ec({body:f,headers:a,status:u,statusText:l,url:c,redirected:p,responseType:b})),r.complete()):r.error(new Io({error:f,headers:a,status:u,statusText:l,url:c,redirected:p,responseType:b}));}parseBody(e,i,r,o){switch(e.responseType){case "json":let s=new TextDecoder().decode(i).replace(W1,"");if(s==="")return null;try{return JSON.parse(s)}catch(a){if(o<200||o>=300)return s;throw a}case "text":return new TextDecoder().decode(i);case "blob":return new Blob([i],{type:r});case "arraybuffer":return i.buffer}}createRequestInit(e){if(e.reportUploadProgress)throw new D(2824,false);let i={},r;if(r=e.credentials,e.withCredentials&&(r="include"),e.headers.forEach((o,s)=>i[o]=s.join(",")),e.headers.has(Cx)||(i[Cx]=$1),!e.headers.has(v_)){let o=e.detectContentTypeHeader();o!==null&&(i[v_]=o);}return {body:e.serializeBody(),method:e.method,headers:i,credentials:r,keepalive:e.keepalive,cache:e.cache,priority:e.priority,mode:e.mode,redirect:e.redirect,referrer:e.referrer,integrity:e.integrity,referrerPolicy:e.referrerPolicy}}concatChunks(e,i){let r=new Uint8Array(i),o=0;for(let s of e)r.set(s,o),o+=s.length;return r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),C_=class{};function D_(){}function Z1(t){t.then(D_,D_);}function Dx(t){throw new D(-2825,false)}function K1(t,n){return n(t)}function Q1(t,n,e){return (i,r)=>ut(e,()=>n(i,o=>t(o,r)))}var X1=new g("",{factory:()=>[]}),Sx=new g(""),J1=new g("",{factory:()=>true});var eL=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=L(Y1),r},providedIn:"root"})}return t})();var tL=(()=>{class t{backend;injector;chain=null;pendingTasks=d(pu);contributeToStability=d(J1);constructor(e,i){this.backend=e,this.injector=i;}handle(e){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(X1),...this.injector.get(Sx,[])]));this.chain=i.reduceRight((r,o)=>Q1(r,o,this.injector),K1);}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(e,r=>this.backend.handle(r)).pipe(Xr(i))}else return this.chain(e,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||t)(L(eL),L(Se))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),nL=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=L(tL),r},providedIn:"root"})}return t})();function __(t,n){return v({body:n},t)}var Mo=(()=>{class t{handler;constructor(e){this.handler=e;}request(e,i,r={}){let o;if(e instanceof js)o=e;else {let l;r.headers instanceof yn?l=r.headers:l=new yn(r.headers);let c;r.params&&(r.params instanceof _n?c=r.params:c=new _n({fromObject:r.params})),o=new js(e,i,r.body!==void 0?r.body:null,{headers:l,context:r.context,params:c,reportProgress:r.reportProgress,reportUploadProgress:r.reportUploadProgress,reportDownloadProgress:r.reportDownloadProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout});}let s=R(o).pipe(tr(l=>this.handler.handle(l)));if(e instanceof js||r.observe==="events")return s;let a=s.pipe(fe(l=>l instanceof ec));switch(r.observe||"body"){case "body":switch(o.responseType){case "arraybuffer":return a.pipe(T$1(l=>{if(l.body!==null&&!(l.body instanceof ArrayBuffer))throw new D(2806,false);return l.body}));case "blob":return a.pipe(T$1(l=>{if(l.body!==null&&!(l.body instanceof Blob))throw new D(2807,false);return l.body}));case "text":return a.pipe(T$1(l=>{if(l.body!==null&&typeof l.body!="string")throw new D(2808,false);return l.body}));default:return a.pipe(T$1(l=>l.body))}case "response":return a;default:throw new D(2809,false)}}delete(e,i={}){return this.request("DELETE",e,i)}get(e,i={}){return this.request("GET",e,i)}head(e,i={}){return this.request("HEAD",e,i)}jsonp(e,i){return this.request("JSONP",e,{params:new _n().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(e,i={}){return this.request("OPTIONS",e,i)}patch(e,i,r={}){return this.request("PATCH",e,__(r,i))}post(e,i,r={}){return this.request("POST",e,__(r,i))}put(e,i,r={}){return this.request("PUT",e,__(r,i))}static \u0275fac=function(i){return new(i||t)(L(nL))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Ix=(()=>{class t{_doc;constructor(e){this._doc=e;}getTitle(){return this._doc.title}setTitle(e){this._doc.title=e||"";}static \u0275fac=function(i){return new(i||t)(L(B))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var tc=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:function(i){let r=null;return i?r=new(i||t):r=L(rL),r},providedIn:"root"})}return t})(),rL=(()=>{class t extends tc{_doc=d(B);sanitize(e,i){if(i==null)return null;switch(e){case _t.NONE:return i;case _t.HTML:return gr(i,"HTML")?Ln(i):nv(this._doc,String(i)).toString();case _t.STYLE:return gr(i,"Style")?Ln(i):i;case _t.SCRIPT:if(gr(i,"Script"))return Ln(i);throw new D(5200,false);case _t.URL:return gr(i,"URL")?Ln(i):Tl(String(i));case _t.RESOURCE_URL:if(gr(i,"ResourceURL"))return Ln(i);throw new D(5201,false);default:throw new D(5202,false)}}bypassSecurityTrustHtml(e){return Qg(e)}bypassSecurityTrustStyle(e){return Xg(e)}bypassSecurityTrustScript(e){return Jg(e)}bypassSecurityTrustUrl(e){return ev(e)}bypassSecurityTrustResourceUrl(e){return tv(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var oe="primary",mc=Symbol("RouteTitle"),M_=class{params;constructor(n){this.params=n||{};}has(n){return Object.prototype.hasOwnProperty.call(this.params,n)}get(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e[0]:e}return null}getAll(n){if(this.has(n)){let e=this.params[n];return Array.isArray(e)?e:[e]}return []}get keys(){return Object.keys(this.params)}};function Ao(t){return new M_(t)}function x_(t,n,e){for(let i=0;i<t.length;i++){let r=t[i],o=n[i];if(r[0]===":")e[r.substring(1)]=o;else if(r!==o.path)return  false}return  true}function Lx(t,n,e){let i=e.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>t.length||e.pathMatch==="full"&&(n.hasChildren()||i.length<t.length))return null;let l={},c=t.slice(0,i.length);return x_(i,c,l)?{consumed:c,posParams:l}:null}if(r!==i.lastIndexOf("**"))return null;let o=i.slice(0,r),s=i.slice(r+1);if(o.length+s.length>t.length||e.pathMatch==="full"&&n.hasChildren()&&e.path!=="**")return null;let a={};return !x_(o,t.slice(0,o.length),a)||!x_(s,t.slice(t.length-s.length),a)?null:{consumed:t,posParams:a}}function Uf(t){return new Promise((n,e)=>{t.pipe(yi()).subscribe({next:i=>n(i),error:i=>e(i)});})}function oL(t,n){if(t.length!==n.length)return  false;for(let e=0;e<t.length;++e)if(!ui(t[e],n[e]))return  false;return  true}function ui(t,n){let e=t?T_(t):void 0,i=n?T_(n):void 0;if(!e||!i||e.length!=i.length)return  false;let r;for(let o=0;o<e.length;o++)if(r=e[o],!jx(t[r],n[r]))return  false;return  true}function T_(t){return [...Object.keys(t),...Object.getOwnPropertySymbols(t)]}function jx(t,n){if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return  false;let e=[...t].sort(),i=[...n].sort();return e.every((r,o)=>i[o]===r)}else return t===n}function sL(t){return t.length>0?t[t.length-1]:null}function Ro(t){return Xi(t)?t:Ai(t)?Re(Promise.resolve(t)):R(t)}function Bx(t){return Xi(t)?Uf(t):Promise.resolve(t)}var aL={exact:Hx,subset:zx},Vx={exact:lL,subset:cL,ignored:()=>true},Ux={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},A_={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function Tx(t,n,e){return aL[e.paths](t.root,n.root,e.matrixParams)&&Vx[e.queryParams](t.queryParams,n.queryParams)&&!(e.fragment==="exact"&&t.fragment!==n.fragment)}function lL(t,n){return ui(t,n)}function Hx(t,n,e){if(!To(t.segments,n.segments)||!jf(t.segments,n.segments,e)||t.numberOfChildren!==n.numberOfChildren)return  false;for(let i in n.children)if(!t.children[i]||!Hx(t.children[i],n.children[i],e))return  false;return  true}function cL(t,n){return Object.keys(n).length<=Object.keys(t).length&&Object.keys(n).every(e=>jx(t[e],n[e]))}function zx(t,n,e){return $x(t,n,n.segments,e)}function $x(t,n,e,i){if(t.segments.length>e.length){let r=t.segments.slice(0,e.length);return !(!To(r,e)||n.hasChildren()||!jf(r,e,i))}else if(t.segments.length===e.length){if(!To(t.segments,e)||!jf(t.segments,e,i))return  false;for(let r in n.children)if(!t.children[r]||!zx(t.children[r],n.children[r],i))return  false;return  true}else {let r=e.slice(0,t.segments.length),o=e.slice(t.segments.length);return !To(t.segments,r)||!jf(t.segments,r,i)||!t.children[oe]?false:$x(t.children[oe],n,o,i)}}function jf(t,n,e){return n.every((i,r)=>Vx[e](t[r].parameters,i.parameters))}var wn=class{root;queryParams;fragment;_queryParamMap;constructor(n=new we([],{}),e={},i=null){this.root=n,this.queryParams=e,this.fragment=i;}get queryParamMap(){return this._queryParamMap??=Ao(this.queryParams),this._queryParamMap}toString(){return fL.serialize(this)}},we=class{segments;children;parent=null;constructor(n,e){this.segments=n,this.children=e,Object.values(e).forEach(i=>i.parent=this);}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return Bf(this)}},_r=class{path;parameters;_parameterMap;constructor(n,e){this.path=n,this.parameters=e;}get parameterMap(){return this._parameterMap??=Ao(this.parameters),this._parameterMap}toString(){return Wx(this)}};function dL(t,n){return To(t,n)&&t.every((e,i)=>ui(e.parameters,n[i].parameters))}function To(t,n){return t.length!==n.length?false:t.every((e,i)=>e.path===n[i].path)}function uL(t,n){let e=[];return Object.entries(t.children).forEach(([i,r])=>{i===oe&&(e=e.concat(n(r,i)));}),Object.entries(t.children).forEach(([i,r])=>{i!==oe&&(e=e.concat(n(r,i)));}),e}var Oo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:()=>new Pi})}return t})(),Pi=class{parse(n){let e=new R_(n);return new wn(e.parseRootSegment(),e.parseQueryParams(),e.parseFragment())}serialize(n){let e=`/${nc(n.root,true)}`,i=pL(n.queryParams),r=typeof n.fragment=="string"?`#${mL(n.fragment)}`:"";return `${e}${i}${r}`}},fL=new Pi;function Bf(t){return t.segments.map(n=>Wx(n)).join("/")}function nc(t,n){if(!t.hasChildren())return Bf(t);if(n){let e=t.children[oe]?nc(t.children[oe],false):"",i=[];return Object.entries(t.children).forEach(([r,o])=>{r!==oe&&i.push(`${r}:${nc(o,false)}`);}),i.length>0?`${e}(${i.join("//")})`:e}else {let e=uL(t,(i,r)=>r===oe?[nc(t.children[oe],false)]:[`${r}:${nc(i,false)}`]);return Object.keys(t.children).length===1&&t.children[oe]!=null?`${Bf(t)}/${e[0]}`:`${Bf(t)}/(${e.join("//")})`}}function Gx(t){return encodeURIComponent(t).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Pf(t){return Gx(t).replace(/%3B/gi,";")}function mL(t){return encodeURI(t)}function k_(t){return Gx(t).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function Vf(t){return decodeURIComponent(t)}function Ax(t){return Vf(t.replace(/\+/g,"%20"))}function Wx(t){return `${k_(t.path)}${hL(t.parameters)}`}function hL(t){return Object.entries(t).map(([n,e])=>`;${k_(n)}=${k_(e)}`).join("")}function pL(t){let n=Object.entries(t).map(([e,i])=>Array.isArray(i)?i.map(r=>`${Pf(e)}=${Pf(r)}`).join("&"):`${Pf(e)}=${Pf(i)}`).filter(e=>e);return n.length?`?${n.join("&")}`:""}var gL=/^[^\/()?;#]+/;function E_(t){let n=t.match(gL);return n?n[0]:""}var vL=/^[^\/()?;=#]+/;function _L(t){let n=t.match(vL);return n?n[0]:""}var yL=/^[^=?&#]+/;function bL(t){let n=t.match(yL);return n?n[0]:""}var wL=/^[^&#]+/;function CL(t){let n=t.match(wL);return n?n[0]:""}var R_=class{url;remaining;constructor(n){this.url=n,this.remaining=n;}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new we([],{}):new we([],this.parseChildren())}parseQueryParams(){let n={};if(this.consumeOptional("?"))do this.parseQueryParam(n);while(this.consumeOptional("&"));return n}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(n=0){if(n>50)throw new D(4010,false);if(this.remaining==="")return {};this.consumeOptional("/");let e=[];for(this.peekStartsWith("(")||e.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),e.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(true,n));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(false,n)),(e.length>0||Object.keys(i).length>0)&&(r[oe]=new we(e,i)),r}parseSegment(){let n=E_(this.remaining);if(n===""&&this.peekStartsWith(";"))throw new D(4009,false);return this.capture(n),new _r(Vf(n),this.parseMatrixParams())}parseMatrixParams(){let n={};for(;this.consumeOptional(";");)this.parseParam(n);return n}parseParam(n){let e=_L(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let r=E_(this.remaining);r&&(i=r,this.capture(i));}n[Vf(e)]=Vf(i);}parseQueryParam(n){let e=bL(this.remaining);if(!e)return;this.capture(e);let i="";if(this.consumeOptional("=")){let s=CL(this.remaining);s&&(i=s,this.capture(i));}let r=Ax(e),o=Ax(i);if(n.hasOwnProperty(r)){let s=n[r];Array.isArray(s)||(s=[s],n[r]=s),s.push(o);}else n[r]=o;}parseParens(n,e){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=E_(this.remaining),o=this.remaining[r.length];if(o!=="/"&&o!==")"&&o!==";")throw new D(4010,false);let s;r.indexOf(":")>-1?(s=r.slice(0,r.indexOf(":")),this.capture(s),this.capture(":")):n&&(s=oe);let a=this.parseChildren(e+1);i[s??oe]=Object.keys(a).length===1&&a[oe]?a[oe]:new we([],a),this.consumeOptional("//");}return i}peekStartsWith(n){return this.remaining.startsWith(n)}consumeOptional(n){return this.peekStartsWith(n)?(this.remaining=this.remaining.substring(n.length),true):false}capture(n){if(!this.consumeOptional(n))throw new D(4011,false)}};function qx(t){return t.segments.length>0?new we([],{[oe]:t}):t}function Yx(t){let n={};for(let[i,r]of Object.entries(t.children)){let o=Yx(r);if(i===oe&&o.segments.length===0&&o.hasChildren())for(let[s,a]of Object.entries(o.children))n[s]=a;else (o.segments.length>0||o.hasChildren())&&(n[i]=o);}let e=new we(t.segments,n);return DL(e)}function DL(t){if(t.numberOfChildren===1&&t.children[oe]){let n=t.children[oe];return new we(t.segments.concat(n.segments),n.children)}return t}function $s(t){return t instanceof wn}function Zx(t,n,e=null,i=null,r=new Pi){let o=Kx(t);return Qx(o,n,e,i,r)}function Kx(t){let n;function e(o){let s={};for(let l of o.children){let c=e(l);s[l.outlet]=c;}let a=new we(o.url,s);return o===t&&(n=a),a}let i=e(t.root),r=qx(i);return n??r}function Qx(t,n,e,i,r){let o=t;for(;o.parent;)o=o.parent;if(n.length===0)return S_(o,o,o,e,i,r);let s=xL(n);if(s.toRoot())return S_(o,o,new we([],{}),e,i,r);let a=EL(s,o,t),l=a.processChildren?rc(a.segmentGroup,a.index,s.commands):Jx(a.segmentGroup,a.index,s.commands);return S_(o,a.segmentGroup,l,e,i,r)}function Hf(t){return typeof t=="object"&&t!=null&&!t.outlets&&!t.segmentPath}function sc(t){return typeof t=="object"&&t!=null&&t.outlets}function kx(t,n,e){t||="\u0275";let i=new wn;return i.queryParams={[t]:n},e.parse(e.serialize(i)).queryParams[t]}function S_(t,n,e,i,r,o){let s={};for(let[c,u]of Object.entries(i??{}))s[c]=Array.isArray(u)?u.map(f=>kx(c,f,o)):kx(c,u,o);let a;t===n?a=e:a=Xx(t,n,e);let l=qx(Yx(a));return new wn(l,s,r)}function Xx(t,n,e){let i={};return Object.entries(t.children).forEach(([r,o])=>{o===n?i[r]=e:i[r]=Xx(o,n,e);}),new we(t.segments,i)}var zf=class{isAbsolute;numberOfDoubleDots;commands;constructor(n,e,i){if(this.isAbsolute=n,this.numberOfDoubleDots=e,this.commands=i,n&&i.length>0&&Hf(i[0]))throw new D(4003,false);let r=i.find(sc);if(r&&r!==sL(i))throw new D(4004,false)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function xL(t){if(typeof t[0]=="string"&&t.length===1&&t[0]==="/")return new zf(true,0,t);let n=0,e=false,i=t.reduce((r,o,s)=>{if(typeof o=="object"&&o!=null){if(o.outlets){let a={};return Object.entries(o.outlets).forEach(([l,c])=>{a[l]=typeof c=="string"?c.split("/"):c;}),[...r,{outlets:a}]}if(o.segmentPath)return [...r,o.segmentPath]}return typeof o!="string"?[...r,o]:s===0?(o.split("/").forEach((a,l)=>{l==0&&a==="."||(l==0&&a===""?e=true:a===".."?n++:a!=""&&r.push(a));}),r):[...r,o]},[]);return new zf(e,n,i)}var Us=class{segmentGroup;processChildren;index;constructor(n,e,i){this.segmentGroup=n,this.processChildren=e,this.index=i;}};function EL(t,n,e){if(t.isAbsolute)return new Us(n,true,0);if(!e)return new Us(n,false,NaN);if(e.parent===null)return new Us(e,true,0);let i=Hf(t.commands[0])?0:1,r=e.segments.length-1+i;return SL(e,r,t.numberOfDoubleDots)}function SL(t,n,e){let i=t,r=n,o=e;for(;o>r;){if(o-=r,i=i.parent,!i)throw new D(4005,false);r=i.segments.length;}return new Us(i,false,r-o)}function IL(t){return sc(t[0])?t[0].outlets:{[oe]:t}}function Jx(t,n,e){if(t??=new we([],{}),t.segments.length===0&&t.hasChildren())return rc(t,n,e);let i=ML(t,n,e),r=e.slice(i.commandIndex);if(i.match&&i.pathIndex<t.segments.length){let o=new we(t.segments.slice(0,i.pathIndex),{});return o.children[oe]=new we(t.segments.slice(i.pathIndex),t.children),rc(o,0,r)}else return i.match&&r.length===0?new we(t.segments,{}):i.match&&!t.hasChildren()?O_(t,n,e):i.match?rc(t,0,r):O_(t,n,e)}function rc(t,n,e){if(e.length===0)return new we(t.segments,{});{let i=IL(e),r={};if(Object.keys(i).some(o=>o!==oe)&&t.children[oe]&&t.numberOfChildren===1&&t.children[oe].segments.length===0){let o=rc(t.children[oe],n,e);return new we(t.segments,o.children)}return Object.entries(i).forEach(([o,s])=>{typeof s=="string"&&(s=[s]),s!==null&&(r[o]=Jx(t.children[o],n,s));}),Object.entries(t.children).forEach(([o,s])=>{i[o]===void 0&&(r[o]=s);}),new we(t.segments,r)}}function ML(t,n,e){let i=0,r=n,o={match:false,pathIndex:0,commandIndex:0};for(;r<t.segments.length;){if(i>=e.length)return o;let s=t.segments[r],a=e[i];if(sc(a))break;let l=`${a}`,c=i<e.length-1?e[i+1]:null;if(r>0&&l===void 0)break;if(l&&c&&typeof c=="object"&&c.outlets===void 0){if(!Ox(l,c,s))return o;i+=2;}else {if(!Ox(l,{},s))return o;i++;}r++;}return {match:true,pathIndex:r,commandIndex:i}}function O_(t,n,e){let i=t.segments.slice(0,n),r=0;for(;r<e.length;){let o=e[r];if(sc(o)){let l=TL(o.outlets);return new we(i,l)}if(r===0&&Hf(e[0])){let l=t.segments[n];i.push(new _r(l.path,Rx(e[0]))),r++;continue}let s=sc(o)?o.outlets[oe]:`${o}`,a=r<e.length-1?e[r+1]:null;s&&a&&Hf(a)?(i.push(new _r(s,Rx(a))),r+=2):(i.push(new _r(s,{})),r++);}return new we(i,{})}function TL(t){let n={};return Object.entries(t).forEach(([e,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(n[e]=O_(new we([],{}),0,i));}),n}function Rx(t){let n={};return Object.entries(t).forEach(([e,i])=>n[e]=`${i}`),n}function Ox(t,n,e){return t==e.path&&ui(n,e.parameters)}var Hs="imperative",ht=(function(t){return t[t.NavigationStart=0]="NavigationStart",t[t.NavigationEnd=1]="NavigationEnd",t[t.NavigationCancel=2]="NavigationCancel",t[t.NavigationError=3]="NavigationError",t[t.RoutesRecognized=4]="RoutesRecognized",t[t.ResolveStart=5]="ResolveStart",t[t.ResolveEnd=6]="ResolveEnd",t[t.GuardsCheckStart=7]="GuardsCheckStart",t[t.GuardsCheckEnd=8]="GuardsCheckEnd",t[t.RouteConfigLoadStart=9]="RouteConfigLoadStart",t[t.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",t[t.ChildActivationStart=11]="ChildActivationStart",t[t.ChildActivationEnd=12]="ChildActivationEnd",t[t.ActivationStart=13]="ActivationStart",t[t.ActivationEnd=14]="ActivationEnd",t[t.Scroll=15]="Scroll",t[t.NavigationSkipped=16]="NavigationSkipped",t})(ht||{}),nn=class{id;url;constructor(n,e){this.id=n,this.url=e;}},yr=class extends nn{type=ht.NavigationStart;navigationTrigger;restoredState;constructor(n,e,i="imperative",r=null){super(n,e),this.navigationTrigger=i,this.restoredState=r;}toString(){return `NavigationStart(id: ${this.id}, url: '${this.url}')`}},zn=class extends nn{urlAfterRedirects;type=ht.NavigationEnd;constructor(n,e,i){super(n,e),this.urlAfterRedirects=i;}toString(){return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Nt=(function(t){return t[t.Redirect=0]="Redirect",t[t.SupersededByNewNavigation=1]="SupersededByNewNavigation",t[t.NoDataFromResolver=2]="NoDataFromResolver",t[t.GuardRejected=3]="GuardRejected",t[t.Aborted=4]="Aborted",t})(Nt||{}),Gs=(function(t){return t[t.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",t[t.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",t})(Gs||{}),bn=class extends nn{reason;code;type=ht.NavigationCancel;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r;}toString(){return `NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function eE(t){return t instanceof bn&&(t.code===Nt.Redirect||t.code===Nt.SupersededByNewNavigation)}var fi=class extends nn{reason;code;type=ht.NavigationSkipped;constructor(n,e,i,r){super(n,e),this.reason=i,this.code=r;}},ko=class extends nn{error;target;type=ht.NavigationError;constructor(n,e,i,r){super(n,e),this.error=i,this.target=r;}toString(){return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},ac=class extends nn{urlAfterRedirects;state;type=ht.RoutesRecognized;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r;}toString(){return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},$f=class extends nn{urlAfterRedirects;state;type=ht.GuardsCheckStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r;}toString(){return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Gf=class extends nn{urlAfterRedirects;state;shouldActivate;type=ht.GuardsCheckEnd;constructor(n,e,i,r,o){super(n,e),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=o;}toString(){return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},Wf=class extends nn{urlAfterRedirects;state;type=ht.ResolveStart;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r;}toString(){return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},qf=class extends nn{urlAfterRedirects;state;type=ht.ResolveEnd;constructor(n,e,i,r){super(n,e),this.urlAfterRedirects=i,this.state=r;}toString(){return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},Yf=class{route;type=ht.RouteConfigLoadStart;constructor(n){this.route=n;}toString(){return `RouteConfigLoadStart(path: ${this.route.path})`}},Zf=class{route;type=ht.RouteConfigLoadEnd;constructor(n){this.route=n;}toString(){return `RouteConfigLoadEnd(path: ${this.route.path})`}},Kf=class{snapshot;type=ht.ChildActivationStart;constructor(n){this.snapshot=n;}toString(){return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Qf=class{snapshot;type=ht.ChildActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Xf=class{snapshot;type=ht.ActivationStart;constructor(n){this.snapshot=n;}toString(){return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Jf=class{snapshot;type=ht.ActivationEnd;constructor(n){this.snapshot=n;}toString(){return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},Ws=class{routerEvent;position;anchor;scrollBehavior;type=ht.Scroll;constructor(n,e,i,r){this.routerEvent=n,this.position=e,this.anchor=i,this.scrollBehavior=r;}toString(){let n=this.position?`${this.position[0]}, ${this.position[1]}`:null;return `Scroll(anchor: '${this.anchor}', position: '${n}')`}},qs=class{},lc=class{},Ys=class{url;navigationBehaviorOptions;constructor(n,e){this.url=n,this.navigationBehaviorOptions=e;}};function AL(t){return !(t instanceof qs)&&!(t instanceof Ys)&&!(t instanceof lc)}var em=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(n){this.rootInjector=n,this.children=new No(this.rootInjector);}},No=(()=>{class t{rootInjector;contexts=new Map;constructor(e){this.rootInjector=e;}onChildOutletCreated(e,i){let r=this.getOrCreateContext(e);r.outlet=i,this.contexts.set(e,r);}onChildOutletDestroyed(e){let i=this.getContext(e);i&&(i.outlet=null,i.attachRef=null);}onOutletDeactivated(){let e=this.contexts;return this.contexts=new Map,e}onOutletReAttached(e){this.contexts=e;}getOrCreateContext(e){let i=this.getContext(e);return i||(i=new em(this.rootInjector),this.contexts.set(e,i)),i}getContext(e){return this.contexts.get(e)||null}static \u0275fac=function(i){return new(i||t)(L(Se))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),tm=class{_root;constructor(n){this._root=n;}get root(){return this._root.value}parent(n){let e=this.pathFromRoot(n);return e.length>1?e[e.length-2]:null}children(n){let e=N_(n,this._root);return e?e.children.map(i=>i.value):[]}firstChild(n){let e=N_(n,this._root);return e&&e.children.length>0?e.children[0].value:null}siblings(n){let e=F_(n,this._root);return e.length<2?[]:e[e.length-2].children.map(r=>r.value).filter(r=>r!==n)}pathFromRoot(n){return F_(n,this._root).map(e=>e.value)}};function N_(t,n){if(t===n.value)return n;for(let e of n.children){let i=N_(t,e);if(i)return i}return null}function F_(t,n){if(t===n.value)return [n];for(let e of n.children){let i=F_(t,e);if(i.length)return i.unshift(n),i}return []}var tn=class{value;children;constructor(n,e){this.value=n,this.children=e;}toString(){return `TreeNode(${this.value})`}};function Vs(t){let n={};return t&&t.children.forEach(e=>n[e.value.outlet]=e),n}var cc=class extends tm{snapshot;constructor(n,e){super(n),this.snapshot=e,$_(this,n);}toString(){return this.snapshot.toString()}};function tE(t,n){let e=kL(t,n),i=new Ke([new _r("",{})]),r=new Ke({}),o=new Ke({}),s=new Ke({}),a=new Ke(""),l=new Li(i,r,s,a,o,oe,t,e.root);return l.snapshot=e.root,new cc(new tn(l,[]),e)}function kL(t,n){let e={},i={},r={},s=new Zs([],e,r,"",i,oe,t,null,{},n);return new dc("",new tn(s,[]))}var Li=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;_localInjector;constructor(n,e,i,r,o,s,a,l){this.urlSubject=n,this.paramsSubject=e,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=o,this.outlet=s,this.component=a,this._futureSnapshot=l,this.title=this.dataSubject?.pipe(T$1(c=>c[mc]))??R(void 0),this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o;}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(T$1(n=>Ao(n))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(T$1(n=>Ao(n))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}},RL="always";function z_(t,n,e){let i,{routeConfig:r}=t;return n!==null&&(e==="always"||r?.path===""||!n.component&&!n.routeConfig?.loadComponent)?i={params:v(v({},n.params),t.params),data:v(v({},n.data),t.data),resolve:v(v(v(v({},t.data),n.data),r?.data),t._resolvedData)}:i={params:v({},t.params),data:v({},t.data),resolve:v(v({},t.data),t._resolvedData??{})},r&&iE(r)&&(i.resolve[mc]=r.title),i}var Zs=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[mc]}constructor(n,e,i,r,o,s,a,l,c,u){this.url=n,this.params=e,this.queryParams=i,this.fragment=r,this.data=o,this.outlet=s,this.component=a,this.routeConfig=l,this._resolve=c,this._environmentInjector=u;}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=Ao(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=Ao(this.queryParams),this._queryParamMap}toString(){let n=this.url.map(i=>i.toString()).join("/"),e=this.routeConfig?this.routeConfig.path:"";return `Route(url:'${n}', path:'${e}')`}},dc=class extends tm{url;constructor(n,e){super(e),this.url=n,$_(this,e);}toString(){return nE(this._root)}};function $_(t,n){n.value._routerState=t,n.children.forEach(e=>$_(t,e));}function nE(t){let n=t.children.length>0?` { ${t.children.map(nE).join(", ")} } `:"";return `${t.value}${n}`}function I_(t){if(t.snapshot){let n=t.snapshot,e=t._futureSnapshot;t.snapshot=e,ui(n.queryParams,e.queryParams)||t.queryParamsSubject.next(e.queryParams),n.fragment!==e.fragment&&t.fragmentSubject.next(e.fragment),ui(n.params,e.params)||t.paramsSubject.next(e.params),oL(n.url,e.url)||t.urlSubject.next(e.url),ui(n.data,e.data)||t.dataSubject.next(e.data);}else t.snapshot=t._futureSnapshot,t.dataSubject.next(t._futureSnapshot.data);}function P_(t,n){let e=ui(t.params,n.params)&&dL(t.url,n.url),i=!t.parent!=!n.parent;return e&&!i&&(!t.parent||P_(t.parent,n.parent))}function iE(t){return typeof t.title=="string"||t.title===null}var rE=new g(""),G_=(()=>{class t{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=oe;activateEvents=new K;deactivateEvents=new K;attachEvents=new K;detachEvents=new K;routerOutletData=Ul();parentContexts=d(No);location=d(kt);changeDetector=d(Ge);inputBinder=d(hc,{optional:true});supportsBindingToComponentInputs=true;ngOnChanges(e){if(e.name){let{firstChange:i,previousValue:r}=e.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName();}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this);}isTrackedInParentContexts(e){return this.parentContexts.getContext(e)?.outlet===this}ngOnInit(){this.initializeOutletWithName();}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let e=this.parentContexts.getContext(this.name);e?.route&&(e.attachRef?this.attach(e.attachRef,e.route):this.activateWith(e.route,e.injector));}get isActivated(){return !!this.activated}get component(){if(!this.activated)throw new D(4012,false);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new D(4012,false);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new D(4012,false);this.location.detach();let e=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(e.instance),e}attach(e,i){this.activated=e,this._activatedRoute=i,this.location.insert(e.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(e.instance);}deactivate(){if(this.activated){let e=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(e);}}activateWith(e,i){if(this.isActivated)throw new D(4013,false);this._activatedRoute=e;let r=this.location,s=e.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,l=new L_(e,a,r.injector,this.routerOutletData);this.activated=r.createComponent(s,{index:r.length,injector:l,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance);}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Ye]})}return t})(),L_=class{route;childContexts;parent;outletData;constructor(n,e,i,r){this.route=n,this.childContexts=e,this.parent=i,this.outletData=r;}get(n,e){return n===Li?this.route:n===No?this.childContexts:n===rE?this.outletData:this.parent.get(n,e)}},hc=new g(""),oE=(()=>{class t{options;outletDataSubscriptions=new Map;outletSeenKeys=new Map;constructor(e){this.options=e,this.options.queryParams??=true;}bindActivatedRouteToOutletComponent(e){this.unsubscribeFromRouteData(e),this.subscribeToRouteData(e);}unsubscribeFromRouteData(e){this.outletDataSubscriptions.get(e)?.unsubscribe(),this.outletDataSubscriptions.delete(e),this.outletSeenKeys.delete(e);}subscribeToRouteData(e){let{activatedRoute:i}=e,r=as([this.options.queryParams?i.queryParams:R({}),i.params,i.data]).pipe(xe(([o,s,a],l)=>(a=v(v(v({},o),s),a),l===0?R(a):Promise.resolve(a)))).subscribe(o=>{if(!e.isActivated||!e.activatedComponentRef||e.activatedRoute!==i||i.component===null){this.unsubscribeFromRouteData(e);return}let s=$D(i.component);if(!s){this.unsubscribeFromRouteData(e);return}let a=this.outletSeenKeys.get(e);a||(a=new Set,this.outletSeenKeys.set(e,a));for(let c of Object.keys(o))a.add(c);let l=this.options.unmatchedInputBehavior??"alwaysUndefined";for(let{templateName:c}of s.inputs){let u=o[c];(u!==void 0||l==="alwaysUndefined"||a.has(c))&&e.activatedComponentRef.setInput(c,u);}});this.outletDataSubscriptions.set(e,r);}static \u0275fac=function(i){Nl();};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})(),W_=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&be(0,"router-outlet");},dependencies:[G_],encapsulation:2,changeDetection:1})}return t})();function q_(t){let n=t.children&&t.children.map(q_),e=n?Y(v({},t),{children:n}):v({},t);return !e.component&&!e.loadComponent&&(n||e.loadChildren)&&e.outlet&&e.outlet!==oe&&(e.component=W_),e}function OL(t,n,e){let i=new Set,r=uc(t,n._root,e?e._root:void 0,i);return {newlyCreatedRoutes:i,state:new cc(r,n)}}function uc(t,n,e,i){if(e&&t.shouldReuseRoute(n.value,e.value.snapshot)){let r=e.value;r._futureSnapshot=n.value;let o=NL(t,n,e,i);return new tn(r,o)}else {if(t.shouldAttach(n.value)){let s=t.retrieve(n.value);if(s!==null){let a=s.route;return a.value._futureSnapshot=n.value,a.children=n.children.map(l=>uc(t,l,void 0,i)),a}}let r=FL(n.value);i.add(r);let o=n.children.map(s=>uc(t,s,void 0,i));return new tn(r,o)}}function NL(t,n,e,i){return n.children.map(r=>{for(let o of e.children)if(t.shouldReuseRoute(r.value,o.value.snapshot))return uc(t,r,o,i);return uc(t,r,void 0,i)})}function FL(t){return new Li(new Ke(t.url),new Ke(t.params),new Ke(t.queryParams),new Ke(t.fragment),new Ke(t.data),t.outlet,t.component,t)}var Ks=class{redirectTo;navigationBehaviorOptions;constructor(n,e){this.redirectTo=n,this.navigationBehaviorOptions=e;}},sE="ngNavigationCancelingError";function nm(t,n){let{redirectTo:e,navigationBehaviorOptions:i}=$s(n)?{redirectTo:n,navigationBehaviorOptions:void 0}:n,r=aE(false,Nt.Redirect);return r.url=e,r.navigationBehaviorOptions=i,r}function aE(t,n){let e=new Error(`NavigationCancelingError: ${""}`);return e[sE]=true,e.cancellationCode=n,e}function PL(t){return lE(t)&&$s(t.url)}function lE(t){return !!t&&t[sE]}var j_=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(n,e,i,r,o){this.routeReuseStrategy=n,this.futureState=e,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=o;}activate(n){let e=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(e,i,n),I_(this.futureState.root),this.activateChildRoutes(e,i,n);}deactivateChildRoutes(n,e,i){let r=Vs(e);n.children.forEach(o=>{let s=o.value.outlet;this.deactivateRoutes(o,r[s],i),delete r[s];}),Object.values(r).forEach(o=>{this.deactivateRouteAndItsChildren(o,i);});}deactivateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(r===o)if(r.component){let s=i.getContext(r.outlet);s&&this.deactivateChildRoutes(n,e,s.children);}else this.deactivateChildRoutes(n,e,i);else o&&this.deactivateRouteAndItsChildren(e,i);}deactivateRouteAndItsChildren(n,e){n.value.component&&this.routeReuseStrategy.shouldDetach(n.value.snapshot)?this.detachAndStoreRouteSubtree(n,e):this.deactivateRouteAndOutlet(n,e);}detachAndStoreRouteSubtree(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=Vs(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);if(i&&i.outlet){let s=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(n.value.snapshot,{componentRef:s,route:n,contexts:a});}}deactivateRouteAndOutlet(n,e){let i=e.getContext(n.value.outlet),r=i&&n.value.component?i.children:e,o=Vs(n);for(let s of Object.values(o))this.deactivateRouteAndItsChildren(s,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null),n.value._localInjector?.destroy();}activateChildRoutes(n,e,i){let r=Vs(e);n.children.forEach(o=>{this.activateRoutes(o,r[o.value.outlet],i),this.forwardEvent(new Jf(o.value.snapshot));}),n.children.length&&this.forwardEvent(new Qf(n.value.snapshot));}activateRoutes(n,e,i){let r=n.value,o=e?e.value:null;if(I_(r),r===o)if(r.component){let s=i.getOrCreateContext(r.outlet);this.activateChildRoutes(n,e,s.children);}else this.activateChildRoutes(n,e,i);else if(r.component){let s=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),s.children.onOutletReAttached(a.contexts),s.attachRef=a.componentRef,s.route=a.route.value,s.outlet&&s.outlet.attach(a.componentRef,a.route.value),I_(a.route.value),this.activateChildRoutes(n,null,s.children);}else s.attachRef=null,s.route=r,s.outlet&&s.outlet.activateWith(r,s.injector),this.activateChildRoutes(n,null,s.children);}else this.activateChildRoutes(n,null,i);}},im=class{path;route;constructor(n){this.path=n,this.route=this.path[this.path.length-1];}},zs=class{component;route;constructor(n,e){this.component=n,this.route=e;}};function LL(t,n,e){let i=t._root,r=n?n._root:null;return ic(i,r,e,[i.value])}function jL(t){let n=t.routeConfig?t.routeConfig.canActivateChild:null;return !n||n.length===0?null:{node:t,guards:n}}function Xs(t,n){let e=Symbol(),i=n.get(t,e);return i===e?typeof t=="function"&&!fp(t)?t:n.get(t):i}function ic(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=Vs(n);return t.children.forEach(s=>{BL(s,o[s.value.outlet],e,i.concat([s.value]),r),delete o[s.value.outlet];}),Object.entries(o).forEach(([s,a])=>oc(a,e.getContext(s),r)),r}function BL(t,n,e,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let o=t.value,s=n?n.value:null,a=e?e.getContext(t.value.outlet):null;if(s&&o.routeConfig===s.routeConfig){let l=VL(s,o,o.routeConfig.runGuardsAndResolvers);l?r.canActivateChecks.push(new im(i)):(o.data=s.data,o._resolvedData=s._resolvedData),o.component?ic(t,n,a?a.children:null,i,r):ic(t,n,e,i,r),l&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new zs(a.outlet.component,s));}else s&&oc(n,a,r),r.canActivateChecks.push(new im(i)),o.component?ic(t,null,a?a.children:null,i,r):ic(t,null,e,i,r);return r}function VL(t,n,e){if(typeof e=="function")return ut(n._environmentInjector,()=>e(t,n));switch(e){case "pathParamsChange":return !To(t.url,n.url);case "pathParamsOrQueryParamsChange":return !To(t.url,n.url)||!ui(t.queryParams,n.queryParams);case "always":return  true;case "paramsOrQueryParamsChange":return !P_(t,n)||!ui(t.queryParams,n.queryParams);default:return !P_(t,n)}}function oc(t,n,e){let i=Vs(t),r=t.value;Object.entries(i).forEach(([o,s])=>{r.component?n?oc(s,n.children.getContext(o),e):oc(s,null,e):oc(s,n,e);}),r.component?n&&n.outlet&&n.outlet.isActivated?e.canDeactivateChecks.push(new zs(n.outlet.component,r)):e.canDeactivateChecks.push(new zs(null,r)):e.canDeactivateChecks.push(new zs(null,r));}function pc(t){return typeof t=="function"}function UL(t){return typeof t=="boolean"}function HL(t){return t&&pc(t.canLoad)}function zL(t){return t&&pc(t.canActivate)}function $L(t){return t&&pc(t.canActivateChild)}function GL(t){return t&&pc(t.canDeactivate)}function WL(t){return t&&pc(t.canMatch)}function cE(t){return t instanceof Kr||t?.name==="EmptyError"}var Lf=Symbol("INITIAL_VALUE");function Qs(){return xe(t=>as(t.map(n=>n.pipe(qe(1),Ct(Lf)))).pipe(T$1(n=>{for(let e of n)if(e!==true){if(e===Lf)return Lf;if(e===false||qL(e))return e}return  true}),fe(n=>n!==Lf),qe(1)))}function qL(t){return $s(t)||t instanceof Ks}function dE(t){return t.aborted?R(void 0).pipe(qe(1)):new Z(n=>{let e=()=>{n.next(),n.complete();};return t.addEventListener("abort",e),()=>t.removeEventListener("abort",e)})}function uE(t){return A(dE(t))}function YL(t){return wt(n=>{let{targetSnapshot:e,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:o}}=n;return o.length===0&&r.length===0?R(Y(v({},n),{guardsResult:true})):ZL(o,e,i).pipe(wt(s=>s&&UL(s)?KL(e,r,t):R(s)),T$1(s=>Y(v({},n),{guardsResult:s})))})}function ZL(t,n,e){return Re(t).pipe(wt(i=>tj(i.component,i.route,e,n)),yi(i=>i!==true,true))}function KL(t,n,e){return Re(n).pipe(tr(i=>er(XL(i.route.parent,e),QL(i.route,e),ej(t,i.path),JL(t,i.route))),yi(i=>i!==true,true))}function QL(t,n){return t!==null&&n&&n(new Xf(t)),R(true)}function XL(t,n){return t!==null&&n&&n(new Kf(t)),R(true)}function JL(t,n){let e=n.routeConfig?n.routeConfig.canActivate:null;if(!e||e.length===0)return R(true);let i=e.map(r=>In(()=>{let o=n._environmentInjector,s=Xs(r,o),a=zL(s)?s.canActivate(n,t):ut(o,()=>s(n,t));return Ro(a).pipe(yi())}));return R(i).pipe(Qs())}function ej(t,n){let e=n[n.length-1],r=n.slice(0,n.length-1).reverse().map(o=>jL(o)).filter(o=>o!==null).map(o=>In(()=>{let s=o.guards.map(a=>{let l=o.node._environmentInjector,c=Xs(a,l),u=$L(c)?c.canActivateChild(e,t):ut(l,()=>c(e,t));return Ro(u).pipe(yi())});return R(s).pipe(Qs())}));return R(r).pipe(Qs())}function tj(t,n,e,i){let r=n&&n.routeConfig?n.routeConfig.canDeactivate:null;if(!r||r.length===0)return R(true);let o=r.map(s=>{let a=n._environmentInjector,l=Xs(s,a),c=GL(l)?l.canDeactivate(t,n,e,i):ut(a,()=>l(t,n,e,i));return Ro(c).pipe(yi())});return R(o).pipe(Qs())}function nj(t,n,e,i,r){let o=n.canLoad;if(o===void 0||o.length===0)return R(true);let s=o.map(a=>{let l=Xs(a,t),c=HL(l)?l.canLoad(n,e):ut(t,()=>l(n,e)),u=Ro(c);return r?u.pipe(uE(r)):u});return R(s).pipe(Qs(),fE(i))}function fE(t){return Oh(tt(n=>{if(typeof n!="boolean")throw nm(t,n)}),T$1(n=>n===true))}function ij(t,n,e,i,r,o){let s=n.canMatch;if(!s||s.length===0)return R(true);let a=s.map(l=>{let c=Xs(l,t),u=WL(c)?c.canMatch(n,e,r):ut(t,()=>c(n,e,r));return Ro(u).pipe(uE(o))});return R(a).pipe(Qs(),fE(i))}var Fi=class t extends Error{segmentGroup;constructor(n){super(),this.segmentGroup=n||null,Object.setPrototypeOf(this,t.prototype);}},fc=class t extends Error{urlTree;constructor(n){super(),this.urlTree=n,Object.setPrototypeOf(this,t.prototype);}};function rj(t){throw new D(4e3,false)}function oj(t){throw aE(false,Nt.GuardRejected)}var B_=class{urlSerializer;urlTree;constructor(n,e){this.urlSerializer=n,this.urlTree=e;}async lineralizeSegments(n,e){let i=[],r=e.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[oe])throw rj(`${n.redirectTo}`);r=r.children[oe];}}async applyRedirectCommands(n,e,i,r,o){let s=await sj(e,r,o);if(s instanceof wn)throw new fc(s);let a=this.applyRedirectCreateUrlTree(s,this.urlSerializer.parse(s),n,i);if(s[0]==="/")throw new fc(a);return a}applyRedirectCreateUrlTree(n,e,i,r){let o=this.createSegmentGroup(n,e.root,i,r);return new wn(o,this.createQueryParams(e.queryParams,this.urlTree.queryParams),e.fragment)}createQueryParams(n,e){let i={};return Object.entries(n).forEach(([r,o])=>{if(typeof o=="string"&&o[0]===":"){let a=o.substring(1);i[r]=e[a];}else i[r]=o;}),i}createSegmentGroup(n,e,i,r){let o=this.createSegments(n,e.segments,i,r),s={};return Object.entries(e.children).forEach(([a,l])=>{s[a]=this.createSegmentGroup(n,l,i,r);}),new we(o,s)}createSegments(n,e,i,r){return e.map(o=>o.path[0]===":"?this.findPosParam(n,o,r):this.findOrReturn(o,i))}findPosParam(n,e,i){let r=i[e.path.substring(1)];if(!r)throw new D(4001,false);return r}findOrReturn(n,e){let i=0;for(let r of e){if(r.path===n.path)return e.splice(i),r;i++;}return n}};function sj(t,n,e){if(typeof t=="string")return Promise.resolve(t);let i=t;return Uf(Ro(ut(e,()=>i(n))))}function aj(t,n){return t.providers&&!t._injector&&(t._injector=Ns(t.providers,n,`Route: ${t.path}`)),t._injector??n}function Hn(t){return t.outlet||oe}function lj(t,n){let e=t.filter(i=>Hn(i)===n);return e.push(...t.filter(i=>Hn(i)!==n)),e}var V_={matched:false,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function mE(t){return {routeConfig:t.routeConfig,url:t.url,params:t.params,queryParams:t.queryParams,fragment:t.fragment,data:t.data,outlet:t.outlet,title:t.title,paramMap:t.paramMap,queryParamMap:t.queryParamMap}}function cj(t,n,e,i,r,o,s){let a=hE(t,n,e);if(!a.matched)return R(a);let l=mE(o(a));return i=aj(n,i),ij(i,n,e,r,l,s).pipe(T$1(c=>c===true?a:v({},V_)))}function hE(t,n,e){if(n.path==="")return n.pathMatch==="full"&&(t.hasChildren()||e.length>0)?v({},V_):{matched:true,consumedSegments:[],remainingSegments:e,parameters:{},positionalParamSegments:{}};let r=(n.matcher||Lx)(e,t,n);if(!r)return v({},V_);let o={};Object.entries(r.posParams??{}).forEach(([a,l])=>{o[a]=l.path;});let s=r.consumed.length>0?v(v({},o),r.consumed[r.consumed.length-1].parameters):o;return {matched:true,consumedSegments:r.consumed,remainingSegments:e.slice(r.consumed.length),parameters:s,positionalParamSegments:r.posParams??{}}}function Nx(t,n,e,i,r){return e.length>0&&fj(t,e,i,r)?{segmentGroup:new we(n,uj(i,new we(e,t.children))),slicedSegments:[]}:e.length===0&&mj(t,e,i)?{segmentGroup:new we(t.segments,dj(t,e,i,t.children)),slicedSegments:e}:{segmentGroup:new we(t.segments,t.children),slicedSegments:e}}function dj(t,n,e,i){let r={};for(let o of e)if(om(t,n,o)&&!i[Hn(o)]){let s=new we([],{});r[Hn(o)]=s;}return v(v({},i),r)}function uj(t,n){let e={};e[oe]=n;for(let i of t)if(i.path===""&&Hn(i)!==oe){let r=new we([],{});e[Hn(i)]=r;}return e}function fj(t,n,e,i){return e.some(r=>!om(t,n,r)||!(Hn(r)!==oe)?false:!(i!==void 0&&Hn(r)===i))}function mj(t,n,e){return e.some(i=>om(t,n,i))}function om(t,n,e){return (t.hasChildren()||n.length>0)&&e.pathMatch==="full"?false:e.path===""}function hj(t,n,e){return n.length===0&&!t.children[e]}var U_=class{};async function pj(t,n,e,i,r,o,s,a){return new H_(t,n,e,i,r,s,o,a).recognize()}var gj=31,H_=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=true;constructor(n,e,i,r,o,s,a,l){this.injector=n,this.configLoader=e,this.rootComponentType=i,this.config=r,this.urlTree=o,this.paramsInheritanceStrategy=s,this.urlSerializer=a,this.abortSignal=l,this.applyRedirects=new B_(this.urlSerializer,this.urlTree);}noMatchError(n){return new D(4002,`'${n.segmentGroup}'`)}async recognize(){let n=Nx(this.urlTree.root,[],[],this.config).segmentGroup,{children:e,rootSnapshot:i}=await this.match(n),r=new tn(i,e),o=new dc("",r),s=Zx(i,[],this.urlTree.queryParams,this.urlTree.fragment);return s.queryParams=this.urlTree.queryParams,o.url=this.urlSerializer.serialize(s),{state:o,tree:s}}async match(n){let e=new Zs([],Object.freeze({}),Object.freeze(v({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),oe,this.rootComponentType,null,{},this.injector);try{return {children:await this.processSegmentGroup(this.injector,this.config,n,oe,e),rootSnapshot:e}}catch(i){if(i instanceof fc)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof Fi?this.noMatchError(i):i}}async processSegmentGroup(n,e,i,r,o){if(i.segments.length===0&&i.hasChildren())return this.processChildren(n,e,i,o);let s=await this.processSegment(n,e,i,i.segments,r,true,o);return s instanceof tn?[s]:[]}async processChildren(n,e,i,r){let o=[];for(let l of Object.keys(i.children))l==="primary"?o.unshift(l):o.push(l);let s=[];for(let l of o){let c=i.children[l],u=lj(e,l),f=await this.processSegmentGroup(n,u,c,l,r);s.push(...f);}let a=pE(s);return vj(a),a}async processSegment(n,e,i,r,o,s,a){for(let l of e)try{return await this.processSegmentAgainstRoute(l._injector??n,e,l,i,r,o,s,a)}catch(c){if(c instanceof Fi||cE(c))continue;throw c}if(hj(i,r,o))return new U_;throw new Fi(i)}async processSegmentAgainstRoute(n,e,i,r,o,s,a,l){if(Hn(i)!==s&&(s===oe||!om(r,o,i)))throw new Fi(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(n,r,i,o,s,l);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(n,r,e,i,o,s,l);throw new Fi(r)}async expandSegmentAgainstRouteUsingRedirect(n,e,i,r,o,s,a){let{matched:l,parameters:c,consumedSegments:u,positionalParamSegments:f,remainingSegments:m}=hE(e,r,o);if(!l)throw new Fi(e);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>gj&&(this.allowRedirects=false));let h=this.createSnapshot(n,r,o,c,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let p=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,f,mE(h),n),b=await this.applyRedirects.lineralizeSegments(r,p);return this.processSegment(n,i,e,b.concat(m),s,false,a)}createSnapshot(n,e,i,r,o){let s=new Zs(i,r,Object.freeze(v({},this.urlTree.queryParams)),this.urlTree.fragment,yj(e),Hn(e),e.component??e._loadedComponent??null,e,bj(e),n),a=z_(s,o,this.paramsInheritanceStrategy);return s.params=Object.freeze(a.params),s.data=Object.freeze(a.data),s}async matchSegmentAgainstRoute(n,e,i,r,o,s){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=He=>this.createSnapshot(n,i,He.consumedSegments,He.parameters,s),l=await Uf(cj(e,i,r,n,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(e.children={}),!l?.matched)throw new Fi(e);n=i._injector??n;let{routes:c}=await this.getChildConfig(n,i,r),u=i._loadedInjector??n,{parameters:f,consumedSegments:m,remainingSegments:h}=l,p=this.createSnapshot(n,i,m,f,s),{segmentGroup:b,slicedSegments:x}=Nx(e,m,h,c,o);if(x.length===0&&b.hasChildren()){let He=await this.processChildren(u,c,b,p);return new tn(p,He)}if(c.length===0&&x.length===0)return new tn(p,[]);let P=Hn(i)===o,_e=await this.processSegment(u,c,b,x,P?oe:o,true,p);return new tn(p,_e instanceof tn?[_e]:[])}async getChildConfig(n,e,i){if(e.children)return {routes:e.children,injector:n};if(e.loadChildren){if(e._loadedRoutes!==void 0){let o=e._loadedNgModuleFactory;return o&&!e._loadedInjector&&(e._loadedInjector=o.create(n).injector),{routes:e._loadedRoutes,injector:e._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await Uf(nj(n,e,i,this.urlSerializer,this.abortSignal))){let o=await this.configLoader.loadChildren(n,e);return e._loadedRoutes=o.routes,e._loadedInjector=o.injector,e._loadedNgModuleFactory=o.factory,o}throw oj()}return {routes:[],injector:n}}};function vj(t){t.sort((n,e)=>n.value.outlet===oe?-1:e.value.outlet===oe?1:n.value.outlet.localeCompare(e.value.outlet));}function _j(t){let n=t.value.routeConfig;return n&&n.path===""}function pE(t){let n=[],e=new Set;for(let i of t){if(!_j(i)){n.push(i);continue}let r=n.find(o=>i.value.routeConfig===o.value.routeConfig);r!==void 0?(r.children.push(...i.children),e.add(r)):n.push(i);}for(let i of e){let r=pE(i.children);n.push(new tn(i.value,r));}return n.filter(i=>!e.has(i))}function yj(t){return t.data||{}}function bj(t){return t.resolve||{}}function wj(t,n,e,i,r,o,s){return wt(async a=>{let{state:l,tree:c}=await pj(t,n,e,i,a.extractedUrl,r,o,s);return Y(v({},a),{targetSnapshot:l,urlAfterRedirects:c})})}function Cj(t){return wt(n=>{let{targetSnapshot:e,guards:{canActivateChecks:i}}=n;if(!i.length)return R(n);let r=new Set(i.map(a=>a.route)),o=new Set;for(let a of r)if(!o.has(a))for(let l of gE(a))o.add(l);let s=0;return Re(o).pipe(tr(a=>r.has(a)?Dj(a,e,t):(a.data=z_(a,a.parent,t).resolve,R(void 0))),tt(()=>s++),Md(1),wt(a=>s===o.size?R(n):De))})}function gE(t){let n=t.children.map(e=>gE(e)).flat();return [t,...n]}function Dj(t,n,e){let i=t.routeConfig,r=t._resolve;return i?.title!==void 0&&!iE(i)&&(r[mc]=i.title),In(()=>(t.data=z_(t,t.parent,e).resolve,xj(r,t,n).pipe(T$1(o=>(t._resolvedData=o,t.data=v(v({},t.data),o),null)))))}function xj(t,n,e){let i=T_(t);if(i.length===0)return R({});let r={};return Re(i).pipe(wt(o=>Ej(t[o],n,e).pipe(yi(),tt(s=>{if(s instanceof Ks)throw nm(new Pi,s);r[o]=s;}))),Md(1),T$1(()=>r),je(o=>cE(o)?De:sn(o)))}function Ej(t,n,e){let i=n._environmentInjector,r=Xs(t,i),o=r.resolve?r.resolve(n,e):ut(i,()=>r(n,e));return Ro(o)}function Fx(t){return xe(n=>{let e=t(n);return e?Re(e).pipe(T$1(()=>n)):R(n)})}var Y_=(()=>{class t{buildTitle(e){let i,r=e.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(o=>o.outlet===oe);return i}getResolvedTitleForRoute(e){return e.data[mc]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:()=>d(vE)})}return t})(),vE=(()=>{class t extends Y_{title;constructor(e){super(),this.title=e;}updateTitle(e){let i=this.buildTitle(e);i!==void 0&&this.title.setTitle(i);}static \u0275fac=function(i){return new(i||t)(L(Ix))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Fo=new g("",{factory:()=>({})}),Po=new g(""),sm=(()=>{class t{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=d(Lv);async loadComponent(e,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await Bx(ut(e,()=>i.loadComponent())),s=await yE(Zv(o));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=s,s}finally{this.componentLoaders.delete(i);}})();return this.componentLoaders.set(i,r),r}loadChildren(e,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let o=await _E(i,this.compiler,e,this.onLoadEndListener);return i._loadedRoutes=o.routes,i._loadedInjector=o.injector,i._loadedNgModuleFactory=o.factory,o}finally{this.childrenLoaders.delete(i);}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();async function _E(t,n,e,i){let r=await Bx(ut(e,()=>t.loadChildren())),o=await yE(Zv(r)),s;o instanceof rf||Array.isArray(o)?s=o:s=await n.compileModuleAsync(o),i&&i(t);let a,l,u;return Array.isArray(s)?(l=s,true):(a=s.create(e).injector,u=s,l=a.get(Po,[],{optional:true,self:true}).flat()),{routes:l.map(q_),injector:a,factory:u}}async function yE(t){return t}var am=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:()=>d(Sj)})}return t})(),Sj=(()=>{class t{shouldProcessUrl(e){return  true}extract(e){return e}merge(e,i){return e}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),Z_=new g(""),K_=new g("");function bE(t,n,e){let i=t.get(K_),r=t.get(B);if(!r.startViewTransition||i.skipNextTransition)return i.skipNextTransition=false,new Promise(c=>setTimeout(c));let o,s=new Promise(c=>{o=c;}),a=r.startViewTransition(()=>(o(),Ij(t)));a.updateCallbackDone.catch(c=>{}),a.ready.catch(c=>{}),a.finished.catch(c=>{});let{onViewTransitionCreated:l}=i;return l&&ut(t,()=>l({transition:a,from:n,to:e})),s}function Ij(t){return new Promise(n=>{rt({read:()=>setTimeout(n)},{injector:t});})}var wE=new g(""),Mj=()=>{},Q_=new g(""),lm=(()=>{class t{currentNavigation=ve(null,{equal:()=>false});currentTransition=null;lastSuccessfulNavigation=ve(null);events=new _;transitionAbortWithErrorSubject=new _;configLoader=d(sm);environmentInjector=d(Se);destroyRef=d(xt);urlSerializer=d(Oo);rootContexts=d(No);location=d(di);inputBindingEnabled=d(hc,{optional:true})!==null;titleStrategy=d(Y_);options=d(Fo,{optional:true})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||RL;urlHandlingStrategy=d(am);createViewTransition=d(Z_,{optional:true});navigationErrorHandler=d(Q_,{optional:true});activatedRouteInjectorFeature=d(wE,{optional:true});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>R(void 0);rootComponentType=null;destroyed=false;constructor(){let e=r=>this.events.next(new Yf(r)),i=r=>this.events.next(new Zf(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=e,this.destroyRef.onDestroy(()=>{this.destroyed=true;});}complete(){this.transitions?.complete();}handleNavigationRequest(e){let i=++this.navigationId;Fe(()=>{this.transitions?.next(Y(v({},e),{extractedUrl:this.urlHandlingStrategy.extract(e.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}));});}setupNavigations(e){return this.transitions=new Ke(null),this.transitions.pipe(fe(i=>i!==null),xe(i=>{let r=true,o=false,s=new AbortController,a=()=>!o&&this.currentTransition?.id===i.id;return R(i).pipe(xe(l=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Nt.SupersededByNewNavigation),De;this.currentTransition=i;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:l.id,initialUrl:l.rawUrl,extractedUrl:l.extractedUrl,targetBrowserUrl:typeof l.extras.browserUrl=="string"?this.urlSerializer.parse(l.extras.browserUrl):l.extras.browserUrl,trigger:l.source,extras:l.extras,previousNavigation:c?Y(v({},c),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:l.routesRecognizeHandler,beforeActivateHandler:l.beforeActivateHandler});let u=!e.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),f=l.extras.onSameUrlNavigation??e.onSameUrlNavigation;if(!u&&f!=="reload")return this.events.next(new fi(l.id,this.urlSerializer.serialize(l.rawUrl),"",Gs.IgnoredSameUrlNavigation)),l.resolve(false),De;if(this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))return R(l).pipe(xe(m=>(this.events.next(new yr(m.id,this.urlSerializer.serialize(m.extractedUrl),m.source,m.restoredState)),m.id!==this.navigationId?De:Promise.resolve(m))),wj(this.environmentInjector,this.configLoader,this.rootComponentType,e.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),tt(m=>{i.targetSnapshot=m.targetSnapshot,i.urlAfterRedirects=m.urlAfterRedirects,this.currentNavigation.update(h=>(h.finalUrl=m.urlAfterRedirects,h)),this.events.next(new lc);}),xe(m=>Re(i.routesRecognizeHandler.deferredHandle??R(void 0)).pipe(T$1(()=>m))),tt(()=>{let m=new ac(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(m);}));if(u&&this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)){let{id:m,extractedUrl:h,source:p,restoredState:b,extras:x}=l,P=new yr(m,this.urlSerializer.serialize(h),p,b);this.events.next(P);let _e=tE(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=Y(v({},l),{targetSnapshot:_e,urlAfterRedirects:h,extras:Y(v({},x),{skipLocationChange:false,replaceUrl:false})}),this.currentNavigation.update(He=>(He.finalUrl=h,He)),R(i)}else return this.events.next(new fi(l.id,this.urlSerializer.serialize(l.extractedUrl),"",Gs.IgnoredByUrlHandlingStrategy)),l.resolve(false),De}),T$1(l=>{let c=new $f(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);return this.events.next(c),this.currentTransition=i=Y(v({},l),{guards:LL(l.targetSnapshot,l.currentSnapshot,this.rootContexts)}),i}),YL(l=>this.events.next(l)),xe(l=>{if(i.guardsResult=l.guardsResult,l.guardsResult&&typeof l.guardsResult!="boolean")throw nm(this.urlSerializer,l.guardsResult);let c=new Gf(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot,!!l.guardsResult);if(this.events.next(c),!a())return De;if(!l.guardsResult)return this.cancelNavigationTransition(l,"",Nt.GuardRejected),De;if(l.guards.canActivateChecks.length===0)return R(l);let u=new Wf(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);if(this.events.next(u),!a())return De;let f=false;return R(l).pipe(Cj(this.paramsInheritanceStrategy),tt({next:()=>{f=true;let m=new qf(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects),l.targetSnapshot);this.events.next(m);},complete:()=>{f||this.cancelNavigationTransition(l,"",Nt.NoDataFromResolver);}}))}),Fx(l=>{let c=f=>{let m=[];if(f.routeConfig?._loadedComponent)f.component=f.routeConfig?._loadedComponent;else if(f.routeConfig?.loadComponent){let h=f._environmentInjector;m.push(this.configLoader.loadComponent(h,f.routeConfig).then(p=>{f.component=p;}));}for(let h of f.children)m.push(...c(h));return m},u=c(l.targetSnapshot.root);return u.length===0?R(l):Re(Promise.all(u).then(()=>l))}),xe(l=>{let{newlyCreatedRoutes:c,state:u}=OL(e.routeReuseStrategy,l.targetSnapshot,l.currentRouterState);return this.currentTransition=i=l=Y(v({},l),{targetRouterState:u,newlyCreatedRoutes:c}),this.currentNavigation.update(f=>(f.targetRouterState=u,f)),R(l)}),this.activatedRouteInjectorFeature?.operator()??(l=>l),Fx(()=>this.afterPreactivation()),xe(()=>{let{currentSnapshot:l,targetSnapshot:c}=i,u=this.createViewTransition?.(this.environmentInjector,l.root,c.root);return u?Re(u).pipe(T$1(()=>i)):R(i)}),qe(1),xe(l=>{r=false,this.events.next(new qs);let c=i.beforeActivateHandler.deferredHandle;return c?Re(c.then(()=>l)):R(l)}),tt(l=>{new j_(e.routeReuseStrategy,i.targetRouterState,i.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),l.newlyCreatedRoutes?.clear(),a()&&(o=true,this.currentNavigation.update(c=>(c.abort=Mj,c)),this.lastSuccessfulNavigation.set(Fe(this.currentNavigation)),this.events.next(new zn(l.id,this.urlSerializer.serialize(l.extractedUrl),this.urlSerializer.serialize(l.urlAfterRedirects))),this.titleStrategy?.updateTitle(l.targetRouterState.snapshot),l.resolve(true));}),A(dE(s.signal).pipe(fe(()=>!o&&r),tt(()=>{this.cancelNavigationTransition(i,s.signal.reason+"",Nt.Aborted);}))),tt({complete:()=>{o=true;}}),A(this.transitionAbortWithErrorSubject.pipe(tt(l=>{throw l}))),Xr(()=>{s.abort(),o||this.cancelNavigationTransition(i,"",Nt.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null);}),je(l=>{if(o=true,Px(i),this.destroyed)return i.resolve(false),De;if(lE(l))this.events.next(new bn(i.id,this.urlSerializer.serialize(i.extractedUrl),l.message,l.cancellationCode)),PL(l)?this.events.next(new Ys(l.url,l.navigationBehaviorOptions)):i.resolve(false);else {let c=new ko(i.id,this.urlSerializer.serialize(i.extractedUrl),l,i.targetSnapshot??void 0);try{let u=ut(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(u instanceof Ks){let{message:f,cancellationCode:m}=nm(this.urlSerializer,u);this.events.next(new bn(i.id,this.urlSerializer.serialize(i.extractedUrl),f,m)),this.events.next(new Ys(u.redirectTo,u.navigationBehaviorOptions));}else throw this.events.next(c),l}catch(u){this.options.resolveNavigationPromiseOnError?i.resolve(false):i.reject(u);}}return De}))}))}cancelNavigationTransition(e,i,r){Px(e);let o=new bn(e.id,this.urlSerializer.serialize(e.extractedUrl),i,r);this.events.next(o),e.resolve(false);}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let e=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(true))),i=Fe(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return e.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function Tj(t){return t!==Hs}function Px(t){if(t.newlyCreatedRoutes)for(let n of t.newlyCreatedRoutes)n._localInjector?.destroy();}var CE=new g("");var DE=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:()=>d(Aj)})}return t})(),rm=class{shouldDetach(n){return  false}store(n,e){}shouldAttach(n){return  false}retrieve(n){return null}shouldReuseRoute(n,e){return n.routeConfig===e.routeConfig}shouldDestroyInjector(n){return  true}},Aj=(()=>{class t extends rm{static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),X_=(()=>{class t{urlSerializer=d(Oo);options=d(Fo,{optional:true})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=d(di);urlHandlingStrategy=d(am);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new wn;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:e,initialUrl:i,targetBrowserUrl:r}){let o=e!==void 0?this.urlHandlingStrategy.merge(e,i):i,s=r??o;return s instanceof wn?this.urlSerializer.serialize(s):s}routerUrlState(e){return e?.targetBrowserUrl===void 0||e?.finalUrl===void 0?{}:{\u0275routerUrl:this.urlSerializer.serialize(e.finalUrl)}}commitTransition({targetRouterState:e,finalUrl:i,initialUrl:r}){i&&e?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=e):this.rawUrlTree=r;}routerState=tE(null,d(Se));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento();}createStateMemento(){return {rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:()=>d(kj)})}return t})(),kj=(()=>{class t extends X_{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(e){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{e(i.url,i.state,"popstate",{replaceUrl:true});});})}handleRouterEvent(e,i){e instanceof yr?this.updateStateMemento():e instanceof fi?this.commitTransition(i):e instanceof ac?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof qs?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):e instanceof bn&&!eE(e)?this.restoreHistory(i):e instanceof ko?this.restoreHistory(i,true):e instanceof zn&&(this.lastSuccessfulId=e.id,this.currentPageId=this.browserPageId);}setBrowserUrl(e,i){let{extras:r,id:o}=i,{replaceUrl:s,state:a}=r;if(this.location.isCurrentPathEqualTo(e)||s){let l=this.browserPageId,c=v(v({},a),this.generateNgRouterState(o,l,i));this.location.replaceState(e,"",c);}else {let l=v(v({},a),this.generateNgRouterState(o,this.browserPageId+1,i));this.location.go(e,"",l);}}restoreHistory(e,i=false){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,o=this.currentPageId-r;o!==0?this.location.historyGo(o):this.getCurrentUrlTree()===e.finalUrl&&o===0&&(this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(e),this.resetUrlToCurrentUrlTree());}resetInternalState({finalUrl:e}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,e??this.rawUrlTree);}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId));}generateNgRouterState(e,i,r){return this.canceledNavigationResolution==="computed"?v({navigationId:e,\u0275routerPageId:i},this.routerUrlState(r)):v({navigationId:e},this.routerUrlState(r))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function cm(t,n){t.events.pipe(fe(e=>e instanceof zn||e instanceof bn||e instanceof ko||e instanceof fi),T$1(e=>e instanceof zn||e instanceof fi?0:(e instanceof bn?e.code===Nt.Redirect||e.code===Nt.SupersededByNewNavigation:false)?2:1),fe(e=>e!==2),qe(1)).subscribe(()=>{n();});}var br=(()=>{class t{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=false;nonRouterCurrentEntryChangeSubscription;console=d(af);stateManager=d(X_);options=d(Fo,{optional:true})||{};pendingTasks=d(Si);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=d(lm);urlSerializer=d(Oo);location=d(di);urlHandlingStrategy=d(am);injector=d(Se);_events=new _;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=false;routeReuseStrategy=d(DE);injectorCleanup=d(CE,{optional:true});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=d(Po,{optional:true})?.flat()??[];componentInputBindingEnabled=!!d(hc,{optional:true});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:e=>{}}),this.subscribeToNavigationEvents();}eventsSubscription=new ae;subscribeToNavigationEvents(){let e=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,o=Fe(this.navigationTransitions.currentNavigation);if(r!==null&&o!==null){if(this.stateManager.handleRouterEvent(i,o),i instanceof bn&&i.code!==Nt.Redirect&&i.code!==Nt.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof zn)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof Ys){let s=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),l=v({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||Tj(r.source)},s);this.scheduleNavigation(a,Hs,null,l,{resolve:r.resolve,reject:r.reject,promise:r.promise});}}AL(i)&&this._events.next(i);}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r);}});this.eventsSubscription.add(e);}resetRootComponentType(e){this.routerState.root.component=e,this.navigationTransitions.rootComponentType=e;}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(true),Hs,this.stateManager.restoredState(),{replaceUrl:true});}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((e,i,r,o)=>{this.navigateToSyncWithBrowser(e,r,i,o);});}navigateToSyncWithBrowser(e,i,r,o){let s=r?.navigationId?r:null,a=r?.\u0275routerUrl??e;if(r?.\u0275routerUrl&&(o=Y(v({},o),{browserUrl:e})),r){let c=v({},r);delete c.navigationId,delete c.\u0275routerPageId,delete c.\u0275routerUrl,Object.keys(c).length!==0&&(o.state=c);}let l=this.parseUrl(a);this.scheduleNavigation(l,i,s,o).catch(c=>{this.disposed||this.injector.get(fn)(c);});}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return Fe(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(e){this.config=e.map(q_),this.navigated=false;}ngOnDestroy(){this.dispose();}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=true,this.eventsSubscription.unsubscribe();}createUrlTree(e,i={}){let{relativeTo:r,queryParams:o,fragment:s,queryParamsHandling:a,preserveFragment:l}=i,c=l?this.currentUrlTree.fragment:s,u=null;switch(a??this.options.defaultQueryParamsHandling){case "merge":u=v(v({},this.currentUrlTree.queryParams),o);break;case "preserve":u=this.currentUrlTree.queryParams;break;default:u=o||null;}u!==null&&(u=this.removeEmptyProps(u));let f;try{let m=r?r.snapshot:this.routerState.snapshot.root;f=Kx(m);}catch{(typeof e[0]!="string"||e[0][0]!=="/")&&(e=[]),f=this.currentUrlTree.root;}return Qx(f,e,u,c??null,this.urlSerializer)}navigateByUrl(e,i={skipLocationChange:false}){let r=$s(e)?e:this.parseUrl(e),o=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(o,Hs,null,i)}navigate(e,i={skipLocationChange:false}){return Rj(e),this.navigateByUrl(this.createUrlTree(e,i),i)}serializeUrl(e){return this.urlSerializer.serialize(e)}parseUrl(e){try{return this.urlSerializer.parse(e)}catch{return this.console.warn(Xn(4018,false)),this.urlSerializer.parse("/")}}isActive(e,i){let r;if(i===true?r=v({},Ux):i===false?r=v({},A_):r=v(v({},A_),i),$s(e))return Tx(this.currentUrlTree,e,r);let o=this.parseUrl(e);return Tx(this.currentUrlTree,o,r)}removeEmptyProps(e){return Object.entries(e).reduce((i,[r,o])=>(o!=null&&(i[r]=o),i),{})}scheduleNavigation(e,i,r,o,s){if(this.disposed)return Promise.resolve(false);let a,l,c;s?(a=s.resolve,l=s.reject,c=s.promise):c=new Promise((f,m)=>{a=f,l=m;});let u=this.pendingTasks.add();return cm(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u));}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:e,extras:o,resolve:a,reject:l,promise:c,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),c.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function Rj(t){for(let n=0;n<t.length;n++)if(t[n]==null)throw new D(4008,false)}var gc=class{};var xE=(()=>{class t{router;injector;preloadingStrategy;loader;subscription;constructor(e,i,r,o){this.router=e,this.injector=i,this.preloadingStrategy=r,this.loader=o;}setUpPreloading(){this.subscription=this.router.events.pipe(fe(e=>e instanceof zn),tr(()=>this.preload())).subscribe(()=>{});}preload(){return this.processRoutes(this.injector,this.router.config)}ngOnDestroy(){this.subscription?.unsubscribe();}processRoutes(e,i){let r=[];for(let o of i){o.providers&&!o._injector&&(o._injector=Ns(o.providers,e,""));let s=o._injector??e;o._loadedNgModuleFactory&&!o._loadedInjector&&(o._loadedInjector=o._loadedNgModuleFactory.create(s).injector);let a=o._loadedInjector??s;(o.loadChildren&&!o._loadedRoutes&&o.canLoad===void 0||o.loadComponent&&!o._loadedComponent)&&r.push(this.preloadConfig(s,o)),(o.children||o._loadedRoutes)&&r.push(this.processRoutes(a,o.children??o._loadedRoutes));}return Re(r).pipe(Ji())}preloadConfig(e,i){return this.preloadingStrategy.preload(i,()=>{if(e.destroyed)return R(null);let r;i.loadChildren&&i.canLoad===void 0?r=Re(this.loader.loadChildren(e,i)):r=R(null);let o=r.pipe(wt(s=>s===null?R(void 0):(i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,this.processRoutes(s.injector??e,s.routes))));if(i.loadComponent&&!i._loadedComponent){let s=this.loader.loadComponent(e,i);return Re([o,s]).pipe(Ji())}else return o})}static \u0275fac=function(i){return new(i||t)(L(br),L(Se),L(gc),L(sm))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),EE=new g(""),Nj=(()=>{class t{options;routerEventsSubscription;scrollEventsSubscription;lastId=0;lastSource=Hs;restoredId=0;store={};isHydrating=d(Zg,{optional:true})??false;urlSerializer=d(Oo);zone=d(O);viewportScroller=d(c_);transitions=d(lm);constructor(e){this.options=e,this.options.scrollPositionRestoration||="disabled",this.options.anchorScrolling||="disabled",this.isHydrating&&d(Vt).whenStable().then(()=>{this.isHydrating=false;});}init(){this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.setHistoryScrollRestoration("manual"),this.routerEventsSubscription=this.createScrollEvents(),this.scrollEventsSubscription=this.consumeScrollEvents();}createScrollEvents(){return this.transitions.events.subscribe(e=>{e instanceof yr?(this.store[this.lastId]=this.viewportScroller.getScrollPosition(),this.lastSource=e.navigationTrigger,this.restoredId=e.restoredState?e.restoredState.navigationId:0):e instanceof zn?(this.lastId=e.id,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.urlAfterRedirects).fragment)):e instanceof fi&&e.code===Gs.IgnoredSameUrlNavigation&&(this.lastSource=void 0,this.restoredId=0,this.scheduleScrollEvent(e,this.urlSerializer.parse(e.url).fragment));})}consumeScrollEvents(){return this.transitions.events.subscribe(e=>{if(!(e instanceof Ws)||e.scrollBehavior==="manual")return;let i={behavior:"instant"};e.position?this.options.scrollPositionRestoration==="top"?this.viewportScroller.scrollToPosition([0,0],i):this.options.scrollPositionRestoration==="enabled"&&this.viewportScroller.scrollToPosition(e.position,i):e.anchor&&this.options.anchorScrolling==="enabled"?this.viewportScroller.scrollToAnchor(e.anchor):this.options.scrollPositionRestoration!=="disabled"&&this.viewportScroller.scrollToPosition([0,0]);})}scheduleScrollEvent(e,i){if(this.isHydrating)return;let r=Fe(this.transitions.currentNavigation)?.extras.scroll;this.zone.runOutsideAngular(async()=>{await new Promise(o=>{setTimeout(o),typeof requestAnimationFrame<"u"&&requestAnimationFrame(o);}),this.zone.run(()=>{this.transitions.events.next(new Ws(e,this.lastSource==="popstate"?this.store[this.restoredId]:null,i,r));});});}ngOnDestroy(){this.routerEventsSubscription?.unsubscribe(),this.scrollEventsSubscription?.unsubscribe();}static \u0275fac=function(i){Nl();};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();function Fj(t,...n){return lo([{provide:Po,multi:true,useValue:t},{provide:Li,useFactory:SE},{provide:Fs,multi:true,useFactory:IE},n.map(e=>e.\u0275providers)])}function SE(){return d(br).routerState.root}function vc(t,n){return {\u0275kind:t,\u0275providers:n}}function IE(){let t=d(j);return n=>{let e=t.get(Vt);if(n!==e.components[0])return;let i=t.get(br),r=t.get(ME);t.get(ey)===1&&i.initialNavigation(),t.get(kE,null,{optional:true})?.setUpPreloading(),t.get(EE,null,{optional:true})?.init(),i.resetRootComponentType(e.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe());}}var ME=new g("",{factory:()=>new _}),ey=new g("",{factory:()=>1});function TE(){let t=[{provide:Hu,useValue:true},{provide:ey,useValue:0},sf(()=>{let n=d(j);return n.get(Xv,Promise.resolve()).then(()=>new Promise(i=>{let r=n.get(br),o=n.get(ME);cm(r,()=>{i(true);}),n.get(lm).afterPreactivation=()=>(i(true),o.closed?R(void 0):o),r.initialNavigation();}))})];return vc(2,t)}function AE(){let t=[sf(()=>{d(br).setUpLocationChangeListener();}),{provide:ey,useValue:2}];return vc(3,t)}var kE=new g("");function RE(t){return vc(0,[{provide:kE,useExisting:xE},{provide:gc,useExisting:t}])}function OE(t={}){return vc(8,[{provide:hc,useFactory:()=>new oE(t)}])}function NE(t){jn("NgRouterViewTransitions");let n=[{provide:Z_,useValue:bE},{provide:K_,useValue:v({skipNextTransition:false},t)}];return vc(9,n)}var FE=[di,{provide:Oo,useClass:Pi},br,No,{provide:Li,useFactory:SE},sm],Pj=(()=>{class t{constructor(){}static forRoot(e,i){return {ngModule:t,providers:[FE,[],{provide:Po,multi:true,useValue:e},[],i?.errorHandler?{provide:Q_,useValue:i.errorHandler}:[],{provide:Fo,useValue:i||{}},i?.useHash?jj():Bj(),Lj(),i?.preloadingStrategy?RE(i.preloadingStrategy).\u0275providers:[],i?.initialNavigation?Vj(i):[],i?.bindToComponentInputs?OE(typeof i.bindToComponentInputs=="object"?i.bindToComponentInputs:{}).\u0275providers:[],i?.enableViewTransitions?NE().\u0275providers:[],Uj()]}}static forChild(e){return {ngModule:t,providers:[{provide:Po,multi:true,useValue:e}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();function Lj(){return {provide:EE,useFactory:()=>{let t=d(c_),n=d(Fo);return n.scrollOffset&&t.setOffset(n.scrollOffset),new Nj(n)}}}function jj(){return {provide:Ri,useClass:r_}}function Bj(){return {provide:Ri,useClass:Cf}}function Vj(t){return [t.initialNavigation==="disabled"?AE().\u0275providers:[],t.initialNavigation==="enabledBlocking"?TE().\u0275providers:[]]}var J_=new g("");function Uj(){return [{provide:J_,useFactory:IE},{provide:Fs,multi:true,useExisting:J_}]}var ty;try{ty=typeof Intl<"u"&&Intl.v8BreakIterator;}catch{ty=false;}var he=(()=>{class t{_platformId=d(go);isBrowser=this._platformId?dx(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||ty)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function Js(t){return Array.isArray(t)?t:[t]}var PE=new Set,Lo,ea=(()=>{class t{_platform=d(he);_nonce=d(vo,{optional:true});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):$j;}matchMedia(e){return (this._platform.WEBKIT||this._platform.BLINK)&&zj(e,this._nonce),this._matchMedia(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function zj(t,n){if(!PE.has(t))try{Lo||(Lo=document.createElement("style"),n&&Lo.setAttribute("nonce",n),Lo.setAttribute("type","text/css"),document.head.appendChild(Lo)),Lo.sheet&&(Lo.sheet.insertRule(`@media ${t.replace(/[{}]/g,"")} {body{ }}`,0),PE.add(t));}catch(e){console.error(e);}}function $j(t){return {matches:t==="all"||t==="",media:t,addListener:()=>{},removeListener:()=>{}}}var _c=(()=>{class t{_mediaMatcher=d(ea);_zone=d(O);_queries=new Map;_destroySubject=new _;ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete();}isMatched(e){return LE(Js(e)).some(r=>this._registerQuery(r).mql.matches)}observe(e){let r=LE(Js(e)).map(s=>this._registerQuery(s).observable),o=as(r);return o=er(o.pipe(qe(1)),o.pipe(Qa(1),Qr(0))),o.pipe(T$1(s=>{let a={matches:false,breakpoints:{}};return s.forEach(({matches:l,query:c})=>{a.matches=a.matches||l,a.breakpoints[c]=l;}),a}))}_registerQuery(e){if(this._queries.has(e))return this._queries.get(e);let i=this._mediaMatcher.matchMedia(e),o={observable:new Z(s=>{let a=l=>this._zone.run(()=>s.next(l));return i.addListener(a),()=>{i.removeListener(a);}}).pipe(Ct(i),T$1(({matches:s})=>({query:e,matches:s})),A(this._destroySubject)),mql:i};return this._queries.set(e,o),o}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function LE(t){return t.map(n=>n.split(",")).reduce((n,e)=>n.concat(e)).map(n=>n.trim())}var jE={HandsetPortrait:"(max-width: 599.98px) and (orientation: portrait)"};var Gj=new g("MATERIAL_ANIMATIONS"),BE=null;function ny(){return d(Gj,{optional:true})?.animationsDisabled||d(gl,{optional:true})==="NoopAnimations"?"di-disabled":(BE??=d(ea).matchMedia("(prefers-reduced-motion)").matches,BE?"reduced-motion":"enabled")}function We(){return ny()!=="enabled"}var Wj=new g("cdk-dir-doc",{providedIn:"root",factory:()=>d(B)}),qj=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function VE(t){let n=t?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?qj.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var Ht=(()=>{class t{get value(){return this.valueSignal()}valueSignal=ve("ltr");change=new K;constructor(){let e=d(Wj,{optional:true});if(e){let i=e.body?e.body.dir:null,r=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(VE(i||r||"ltr"));}}ngOnDestroy(){this.change.complete();}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var Ce=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();var Yj=["determinateSpinner"];function Zj(t,n){if(t&1&&(fr(),y(0,"svg",11),be(1,"circle",12),w()),t&2){let e=z();ce("viewBox",e._viewBox()),C(),vr("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),ce("r",e._circleRadius());}}var Kj=new g("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:UE})}),UE=100,Qj=10,HE=(()=>{class t{_elementRef=d(F);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=d(Kj),i=ny(),r=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=r.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&r.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0;}_diameter=UE;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return (this.diameter-Qj)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return `0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,r){if(i&1&&$e(Yj,5),i&2){let o;ee(o=te())&&(r._determinateCircle=o.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,r){i&2&&(ce("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",r.mode==="determinate"?r.value:null)("mode",r.mode),Bn("mat-"+r.color),vr("width",r.diameter,"px")("height",r.diameter,"px")("--mat-progress-spinner-size",r.diameter+"px")("--mat-progress-spinner-active-indicator-width",r.diameter+"px"),$$1("_mat-animation-noopable",r._noopAnimations)("mdc-circular-progress--indeterminate",r.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",ci],diameter:[2,"diameter","diameter",ci],strokeWidth:[2,"strokeWidth","strokeWidth",ci]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,r){if(i&1&&(Et(0,Zj,2,8,"ng-template",null,0,Ls),y(2,"div",2,1),fr(),y(4,"svg",3),be(5,"circle",4),w()(),hl(),y(6,"div",5)(7,"div",6)(8,"div",7),Ps(9,8),w(),y(10,"div",9),Ps(11,8),w(),y(12,"div",10),Ps(13,8),w()()()),i&2){let o=ki(1);C(4),ce("viewBox",r._viewBox()),C(),vr("stroke-dasharray",r._strokeCircumference(),"px")("stroke-dashoffset",r._strokeDashOffset(),"px")("stroke-width",r._circleStrokeWidth(),"%"),ce("r",r._circleRadius()),C(4),me("ngTemplateOutlet",o),C(2),me("ngTemplateOutlet",o),C(2),me("ngTemplateOutlet",o);}},dependencies:[Yl],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2})}return t})();var Qre=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce]})}return t})();function St(t,n=0){return zE(t)?Number(t):arguments.length===2?n:0}function zE(t){return !isNaN(parseFloat(t))&&!isNaN(Number(t))}function zt(t){return t instanceof F?t.nativeElement:t}var $n=(function(t){return t[t.NORMAL=0]="NORMAL",t[t.NEGATED=1]="NEGATED",t[t.INVERTED=2]="INVERTED",t})($n||{}),dm,jo;function um(){if(jo==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return jo=false,jo;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)jo=true;else {let t=Element.prototype.scrollTo;t?jo=!/\{\s*\[native code\]\s*\}/.test(t.toString()):jo=false;}}return jo}function ta(){if(typeof document!="object"||!document)return $n.NORMAL;if(dm==null){let t=document.createElement("div"),n=t.style;t.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let e=document.createElement("div"),i=e.style;i.width="2px",i.height="1px",t.appendChild(e),document.body.appendChild(t),dm=$n.NORMAL,t.scrollLeft===0&&(t.scrollLeft=1,dm=t.scrollLeft===0?$n.NEGATED:$n.INVERTED),t.remove();}return dm}var fm=class{};function $E(t){return t&&typeof t.connect=="function"&&!(t instanceof Ha)}var mm=class extends fm{_data;constructor(n){super(),this._data=n;}connect(){return Xi(this._data)?this._data:R(this._data)}disconnect(){}},yc=(function(t){return t[t.REPLACED=0]="REPLACED",t[t.INSERTED=1]="INSERTED",t[t.MOVED=2]="MOVED",t[t.REMOVED=3]="REMOVED",t})(yc||{}),hm=class{viewCacheSize=20;_viewCache=[];applyChanges(n,e,i,r,o){n.forEachOperation((s,a,l)=>{let c,u;if(s.previousIndex==null){let f=()=>i(s,a,l);c=this._insertView(f,l,e,r(s)),u=c?yc.INSERTED:yc.REPLACED;}else l==null?(this._detachAndCacheView(a,e),u=yc.REMOVED):(c=this._moveView(a,l,e,r(s)),u=yc.MOVED);o&&o({context:c?.context,operation:u,record:s});});}detach(){for(let n of this._viewCache)n.destroy();this._viewCache=[];}_insertView(n,e,i,r){let o=this._insertViewFromCache(e,i);if(o){o.context.$implicit=r;return}let s=n();return i.createEmbeddedView(s.templateRef,s.context,s.index)}_detachAndCacheView(n,e){let i=e.detach(n);this._maybeCacheView(i,e);}_moveView(n,e,i,r){let o=i.get(n);return i.move(o,e),o.context.$implicit=r,o}_maybeCacheView(n,e){if(this._viewCache.length<this.viewCacheSize)this._viewCache.push(n);else {let i=e.indexOf(n);i===-1?n.destroy():e.remove(i);}}_insertViewFromCache(n,e){let i=this._viewCache.pop();return i&&e.insert(i,n),i||null}};var Xj=["contentWrapper"],Jj=["*"],qE=new g("VIRTUAL_SCROLL_STRATEGY"),iy=class{_scrolledIndexChange=new _;scrolledIndexChange=this._scrolledIndexChange.pipe(ls());_viewport=null;_itemSize;_minBufferPx;_maxBufferPx;constructor(n,e,i){this._itemSize=n,this._minBufferPx=e,this._maxBufferPx=i;}attach(n){this._viewport=n,this._updateTotalContentSize(),this._updateRenderedRange();}detach(){this._scrolledIndexChange.complete(),this._viewport=null;}updateItemAndBufferSize(n,e,i){this._itemSize=n,this._minBufferPx=e,this._maxBufferPx=i,this._updateTotalContentSize(),this._updateRenderedRange();}onContentScrolled(){this._updateRenderedRange();}onDataLengthChanged(){this._updateTotalContentSize(),this._updateRenderedRange();}onContentRendered(){}onRenderedOffsetChanged(){}scrollToIndex(n,e){this._viewport&&this._viewport.scrollToOffset(n*this._itemSize,e);}_updateTotalContentSize(){this._viewport&&this._viewport.setTotalContentSize(this._viewport.getDataLength()*this._itemSize);}_updateRenderedRange(){if(!this._viewport)return;let n=this._viewport.getRenderedRange(),e={start:n.start,end:n.end},i=this._viewport.getViewportSize(),r=this._viewport.getDataLength(),o=this._viewport.measureScrollOffset(),s=this._itemSize>0?o/this._itemSize:0;if(e.end>r){let l=Math.ceil(i/this._itemSize),c=Math.max(0,Math.min(s,r-l));s!=c&&(s=c,o=c*this._itemSize,e.start=Math.floor(s)),e.end=Math.max(0,Math.min(r,e.start+l));}let a=o-e.start*this._itemSize;if(a<this._minBufferPx&&e.start!=0){let l=Math.ceil((this._maxBufferPx-a)/this._itemSize);e.start=Math.max(0,e.start-l),e.end=Math.min(r,Math.ceil(s+(i+this._minBufferPx)/this._itemSize));}else {let l=e.end*this._itemSize-(o+i);if(l<this._minBufferPx&&e.end!=r){let c=Math.ceil((this._maxBufferPx-l)/this._itemSize);c>0&&(e.end=Math.min(r,e.end+c),e.start=Math.max(0,Math.floor(s-this._minBufferPx/this._itemSize)));}}this._viewport.setRenderedRange(e),this._viewport.setRenderedContentOffset(Math.round(this._itemSize*e.start)),this._scrolledIndexChange.next(Math.floor(s));}};function eB(t){return t._scrollStrategy}var tB=(()=>{class t{get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=St(e);}_itemSize=20;get minBufferPx(){return this._minBufferPx}set minBufferPx(e){this._minBufferPx=St(e);}_minBufferPx=100;get maxBufferPx(){return this._maxBufferPx}set maxBufferPx(e){this._maxBufferPx=St(e);}_maxBufferPx=200;_scrollStrategy=new iy(this.itemSize,this.minBufferPx,this.maxBufferPx);ngOnChanges(){this._scrollStrategy.updateItemAndBufferSize(this.itemSize,this.minBufferPx,this.maxBufferPx);}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["cdk-virtual-scroll-viewport","itemSize",""]],inputs:{itemSize:"itemSize",minBufferPx:"minBufferPx",maxBufferPx:"maxBufferPx"},features:[Ne([{provide:qE,useFactory:eB,deps:[Qt(()=>t)]}]),Ye]})}return t})(),nB=20,Vo=(()=>{class t{_ngZone=d(O);_platform=d(he);_renderer=d(it).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new _;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)));}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e));}scrolled(e=nB){return this._platform.isBrowser?new Z(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(qa(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0);}}):R()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete();}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(fe(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._targetContainsElement(o,e)&&i.push(o);}),i}_targetContainsElement(e,i){let r=zt(i),o=e.getElementRef().nativeElement;do if(r==o)return  true;while(r=r.parentElement);return  false}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),ry=(()=>{class t{elementRef=d(F);scrollDispatcher=d(Vo);ngZone=d(O);dir=d(Ht,{optional:true});_scrollElement=this.elementRef.nativeElement;_destroyed=new _;_renderer=d(Oe);_cleanupScroll;_elementScrolled=new _;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this);}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete();}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";e.left==null&&(e.left=r?e.end:e.start),e.right==null&&(e.right=r?e.start:e.end),e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&ta()!=$n.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),ta()==$n.INVERTED?e.left=e.right:ta()==$n.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e);}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;um()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left));}measureScrollOffset(e){let i="left",r="right",o=this.elementRef.nativeElement;if(e=="top")return o.scrollTop;if(e=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let s=this.dir&&this.dir.value=="rtl";return e=="start"?e=s?r:i:e=="end"&&(e=s?i:r),s&&ta()==$n.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:s&&ta()==$n.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return t})(),iB=20,ji=(()=>{class t{_platform=d(he);_listeners;_viewportSize=null;_change=new _;_document=d(B);constructor(){let e=d(O),i=d(it).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)];}this.change().subscribe(()=>this._viewportSize=null);});}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete();}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return {top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return {top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect(),s=-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,a=-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return {top:s,left:a}}change(e=iB){return e>0?this._change.pipe(qa(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0};}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),GE=new g("VIRTUAL_SCROLLABLE"),rB=(()=>{class t extends ry{measureViewportSize(e){let i=this.elementRef.nativeElement;return e==="horizontal"?i.clientWidth:i.clientHeight}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,features:[ge]})}return t})();function oB(t,n){return t.start==n.start&&t.end==n.end}var sB=typeof requestAnimationFrame<"u"?Uh:Vh,YE=new g("CDK_VIRTUAL_SCROLL_VIEWPORT"),aB=(()=>{class t extends rB{elementRef=d(F);_changeDetectorRef=d(Ge);_scrollStrategy=d(qE,{optional:true});scrollable=d(GE,{optional:true});_platform=d(he);_detachedSubject=new _;_renderedRangeSubject=new _;_renderedContentOffsetSubject=new _;get orientation(){return this._orientation}set orientation(e){this._orientation!==e&&(this._orientation=e,this._calculateSpacerSize());}_orientation="vertical";appendOnly=false;scrolledIndexChange=new Z(e=>this._scrollStrategy.scrolledIndexChange.subscribe(i=>Promise.resolve().then(()=>this.ngZone.run(()=>e.next(i)))));_contentWrapper;renderedRangeStream=this._renderedRangeSubject;renderedContentOffset=this._renderedContentOffsetSubject.pipe(fe(e=>e!==null),ls());_totalContentSize=0;_totalContentWidth=ve("");_totalContentHeight=ve("");_renderedContentTransform;_renderedRange={start:0,end:0};_dataLength=0;_viewportSize=0;_forOf=null;_renderedContentOffset=0;_renderedContentOffsetNeedsRewrite=false;_changeDetectionNeeded=ve(false);_runAfterChangeDetection=[];_viewportChanges=ae.EMPTY;_injector=d(j);_isDestroyed=false;constructor(){super();let e=d(ji);this._scrollStrategy,this._viewportChanges=e.change().subscribe(()=>{this.checkViewportSize();}),this.scrollable||(this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable"),this.scrollable=this);let i=kn(()=>{this._changeDetectionNeeded()&&this._doChangeDetection();},{injector:d(Vt).injector});d(xt).onDestroy(()=>{i.destroy();});}ngOnInit(){this._platform.isBrowser&&(this.scrollable===this&&super.ngOnInit(),this.ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>{this._measureViewportSize(),this._scrollStrategy.attach(this),this.scrollable.elementScrolled().pipe(Ct(null),qa(0,sB),A(this._destroyed)).subscribe(()=>this._scrollStrategy.onContentScrolled()),this._markChangeDetectionNeeded();})));}ngOnDestroy(){this.detach(),this._scrollStrategy.detach(),this._renderedRangeSubject.complete(),this._detachedSubject.complete(),this._viewportChanges.unsubscribe(),this._isDestroyed=true,super.ngOnDestroy();}attach(e){this._forOf,this.ngZone.runOutsideAngular(()=>{this._forOf=e,this._forOf.dataStream.pipe(A(this._detachedSubject)).subscribe(i=>{let r=i.length;r!==this._dataLength&&(this._dataLength=r,this._scrollStrategy.onDataLengthChanged()),this._doChangeDetection();});});}detach(){this._forOf=null,this._detachedSubject.next();}getDataLength(){return this._dataLength}getViewportSize(){return this._viewportSize}getRenderedRange(){return this._renderedRange}measureBoundingClientRectWithScrollOffset(e){return this.getElementRef().nativeElement.getBoundingClientRect()[e]}setTotalContentSize(e){this._totalContentSize!==e&&(this._totalContentSize=e,this._calculateSpacerSize(),this._markChangeDetectionNeeded());}setRenderedRange(e){oB(this._renderedRange,e)||(this.appendOnly&&(e={start:0,end:Math.max(this._renderedRange.end,e.end)}),this._renderedRangeSubject.next(this._renderedRange=e),this._markChangeDetectionNeeded(()=>this._scrollStrategy.onContentRendered()));}getOffsetToRenderedContentStart(){return this._renderedContentOffsetNeedsRewrite?null:this._renderedContentOffset}setRenderedContentOffset(e,i="to-start"){e=this.appendOnly&&i==="to-start"?0:e;let r=this.dir&&this.dir.value=="rtl",o=this.orientation=="horizontal",s=o?"X":"Y",l=`translate${s}(${Number((o&&r?-1:1)*e)}px)`;this._renderedContentOffset=e,i==="to-end"&&(l+=` translate${s}(-100%)`,this._renderedContentOffsetNeedsRewrite=true),this._renderedContentTransform!=l&&(this._renderedContentTransform=l,this._markChangeDetectionNeeded(()=>{this._renderedContentOffsetNeedsRewrite?(this._renderedContentOffset-=this.measureRenderedContentSize(),this._renderedContentOffsetNeedsRewrite=false,this.setRenderedContentOffset(this._renderedContentOffset)):this._scrollStrategy.onRenderedOffsetChanged();}));}scrollToOffset(e,i="auto"){let r={behavior:i};this.orientation==="horizontal"?r.start=e:r.top=e,this.scrollable.scrollTo(r);}scrollToIndex(e,i="auto"){this._scrollStrategy.scrollToIndex(e,i);}measureScrollOffset(e){let i;return this.scrollable==this?i=r=>super.measureScrollOffset(r):i=r=>this.scrollable.measureScrollOffset(r),Math.max(0,i(e??(this.orientation==="horizontal"?"start":"top"))-this.measureViewportOffset())}measureViewportOffset(e){let i,r="left",o="right",s=this.dir?.value=="rtl";e=="start"?i=s?o:r:e=="end"?i=s?r:o:e?i=e:i=this.orientation==="horizontal"?"left":"top";let a=this.scrollable.measureBoundingClientRectWithScrollOffset(i);return this.elementRef.nativeElement.getBoundingClientRect()[i]-a}measureRenderedContentSize(){let e=this._contentWrapper.nativeElement;return this.orientation==="horizontal"?e.offsetWidth:e.offsetHeight}measureRangeSize(e){return this._forOf?this._forOf.measureRangeSize(e,this.orientation):0}checkViewportSize(){this._measureViewportSize(),this._scrollStrategy.onDataLengthChanged();}_measureViewportSize(){this._viewportSize=this.scrollable.measureViewportSize(this.orientation);}_markChangeDetectionNeeded(e){e&&this._runAfterChangeDetection.push(e),!Fe(this._changeDetectionNeeded)&&this.ngZone.runOutsideAngular(()=>{Promise.resolve().then(()=>{this.ngZone.run(()=>{this._changeDetectionNeeded.set(true);});});});}_doChangeDetection(){this._isDestroyed||this.ngZone.run(()=>{this._changeDetectorRef.markForCheck(),this._contentWrapper.nativeElement.style.transform=this._renderedContentTransform,this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart()),rt(()=>{this._changeDetectionNeeded.set(false);let e=this._runAfterChangeDetection;this._runAfterChangeDetection=[];for(let i of e)i();},{injector:this._injector});});}_calculateSpacerSize(){this._totalContentHeight.set(this.orientation==="horizontal"?"":`${this._totalContentSize}px`),this._totalContentWidth.set(this.orientation==="horizontal"?`${this._totalContentSize}px`:"");}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["cdk-virtual-scroll-viewport"]],viewQuery:function(i,r){if(i&1&&$e(Xj,7),i&2){let o;ee(o=te())&&(r._contentWrapper=o.first);}},hostAttrs:[1,"cdk-virtual-scroll-viewport"],hostVars:4,hostBindings:function(i,r){i&2&&$$1("cdk-virtual-scroll-orientation-horizontal",r.orientation==="horizontal")("cdk-virtual-scroll-orientation-vertical",r.orientation!=="horizontal");},inputs:{orientation:"orientation",appendOnly:[2,"appendOnly","appendOnly",de]},outputs:{scrolledIndexChange:"scrolledIndexChange"},features:[Ne([{provide:ry,useFactory:()=>d(GE,{optional:true})||d(t)},{provide:YE,useExisting:t}]),ge],ngContentSelectors:Jj,decls:4,vars:4,consts:[["contentWrapper",""],[1,"cdk-virtual-scroll-content-wrapper"],[1,"cdk-virtual-scroll-spacer"]],template:function(i,r){i&1&&(Ve(),Ze(0,"div",1,0),q(2),Xe(),mt(3,"div",2)),i&2&&(C(3),vr("width",r._totalContentWidth())("height",r._totalContentHeight()));},styles:[`cdk-virtual-scroll-viewport {
  display: block;
  position: relative;
  transform: translateZ(0);
}

.cdk-virtual-scrollable {
  overflow: auto;
  will-change: scroll-position;
  contain: strict;
  overflow-anchor: none;
  scroll-behavior: auto;
}

.cdk-virtual-scroll-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  contain: content;
}
[dir=rtl] .cdk-virtual-scroll-content-wrapper {
  right: 0;
  left: auto;
}

.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {
  min-height: 100%;
}
.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;
  border-left-width: 0;
  border-right-width: 0;
  outline: none;
}

.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {
  min-width: 100%;
}
.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  border-top-width: 0;
  border-bottom-width: 0;
  outline: none;
}

.cdk-virtual-scroll-spacer {
  height: 1px;
  transform-origin: 0 0;
  flex: 0 0 auto;
}
[dir=rtl] .cdk-virtual-scroll-spacer {
  transform-origin: 100% 0;
}
`],encapsulation:2})}return t})();function WE(t,n,e){let i=e;if(!i.getBoundingClientRect)return 0;let r=i.getBoundingClientRect();return t==="horizontal"?n==="start"?r.left:r.right:n==="start"?r.top:r.bottom}var lB=(()=>{class t{_viewContainerRef=d(kt);_template=d(Bt);_differs=d(_f);_viewRepeater=new hm;_viewport=d(YE,{skipSelf:true});viewChange=new _;_dataSourceChanges=new _;get cdkVirtualForOf(){return this._cdkVirtualForOf}set cdkVirtualForOf(e){this._cdkVirtualForOf=e,$E(e)?this._dataSourceChanges.next(e):this._dataSourceChanges.next(new mm(Xi(e)?e:Array.from(e||[])));}_cdkVirtualForOf;get cdkVirtualForTrackBy(){return this._cdkVirtualForTrackBy}set cdkVirtualForTrackBy(e){this._needsUpdate=true,this._cdkVirtualForTrackBy=e?(i,r)=>e(i+(this._renderedRange?this._renderedRange.start:0),r):void 0;}_cdkVirtualForTrackBy;set cdkVirtualForTemplate(e){e&&(this._needsUpdate=true,this._template=e);}get cdkVirtualForTemplateCacheSize(){return this._viewRepeater.viewCacheSize}set cdkVirtualForTemplateCacheSize(e){this._viewRepeater.viewCacheSize=St(e);}dataStream=this._dataSourceChanges.pipe(Ct(null),Ya(),xe(([e,i])=>this._changeDataSource(e,i)),Ka(1));_differ=null;_data=[];_renderedItems=[];_renderedRange={start:0,end:0};_needsUpdate=false;_destroyed=new _;constructor(){let e=d(O);this.dataStream.subscribe(i=>{this._data=i,this._onRenderedDataChange();}),this._viewport.renderedRangeStream.pipe(A(this._destroyed)).subscribe(i=>{this._renderedRange=i,this.viewChange.observers.length&&e.run(()=>this.viewChange.next(this._renderedRange)),this._onRenderedDataChange();}),this._viewport.attach(this);}measureRangeSize(e,i){if(e.start>=e.end)return 0;e.start<this._renderedRange.start||e.end>this._renderedRange.end;let r=e.start-this._renderedRange.start,o=e.end-e.start,s,a;for(let l=0;l<o;l++){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){s=a=c.rootNodes[0];break}}for(let l=o-1;l>-1;l--){let c=this._viewContainerRef.get(l+r);if(c&&c.rootNodes.length){a=c.rootNodes[c.rootNodes.length-1];break}}return s&&a?WE(i,"end",a)-WE(i,"start",s):0}ngDoCheck(){if(this._differ&&this._needsUpdate){let e=this._differ.diff(this._renderedItems);e?this._applyChanges(e):this._updateContext(),this._needsUpdate=false;}}ngOnDestroy(){this._viewport.detach(),this._dataSourceChanges.next(void 0),this._dataSourceChanges.complete(),this.viewChange.complete(),this._destroyed.next(),this._destroyed.complete(),this._viewRepeater.detach();}_onRenderedDataChange(){this._renderedRange&&(this._renderedItems=this._data.slice(this._renderedRange.start,this._renderedRange.end),this._differ||(this._differ=this._differs.find(this._renderedItems).create((e,i)=>this.cdkVirtualForTrackBy?this.cdkVirtualForTrackBy(e,i):i)),this._needsUpdate=true);}_changeDataSource(e,i){return e&&e.disconnect(this),this._needsUpdate=true,i?i.connect(this):R()}_updateContext(){let e=this._data.length,i=this._viewContainerRef.length;for(;i--;){let r=this._viewContainerRef.get(i);r.context.index=this._renderedRange.start+i,r.context.count=e,this._updateComputedContextProperties(r.context),r.detectChanges();}}_applyChanges(e){this._viewRepeater.applyChanges(e,this._viewContainerRef,(o,s,a)=>this._getEmbeddedViewArgs(o,a),o=>o.item),e.forEachIdentityChange(o=>{let s=this._viewContainerRef.get(o.currentIndex);s.context.$implicit=o.item;});let i=this._data.length,r=this._viewContainerRef.length;for(;r--;){let o=this._viewContainerRef.get(r);o.context.index=this._renderedRange.start+r,o.context.count=i,this._updateComputedContextProperties(o.context);}}_updateComputedContextProperties(e){e.first=e.index===0,e.last=e.index===e.count-1,e.even=e.index%2===0,e.odd=!e.even;}_getEmbeddedViewArgs(e,i){return {templateRef:this._template,context:{$implicit:e.item,cdkVirtualForOf:this._cdkVirtualForOf,index:-1,count:-1,first:false,last:false,odd:false,even:false},index:i}}static ngTemplateContextGuard(e,i){return  true}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","cdkVirtualFor","","cdkVirtualForOf",""]],inputs:{cdkVirtualForOf:"cdkVirtualForOf",cdkVirtualForTrackBy:"cdkVirtualForTrackBy",cdkVirtualForTemplate:"cdkVirtualForTemplate",cdkVirtualForTemplateCacheSize:"cdkVirtualForTemplateCacheSize"}})}return t})();var Bo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})(),oy=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce,Bo,Ce,Bo]})}return t})();function bc(t){return t.buttons===0||t.detail===0}function wc(t){let n=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return !!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var sy;function ZE(){if(sy==null){let t=typeof document<"u"?document.head:null;sy=!!(t&&(t.createShadowRoot||t.attachShadow));}return sy}function ay(t){if(ZE()){let n=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function na(){let t=typeof document<"u"&&document?document.activeElement:null;for(;t&&t.shadowRoot;){let n=t.shadowRoot.activeElement;if(n===t)break;t=n;}return t}function It(t){if(t.composedPath)try{return t.composedPath()[0]}catch{}return t.target}var Cc;function KE(){if(Cc==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Cc=!0}));}finally{Cc=Cc||false;}return Cc}function ia(t){return KE()?t:!!t.capture}var QE=new g("cdk-input-modality-detector-options"),XE={ignoreKeys:[18,17,224,91,16]},JE=650,ly={passive:true,capture:true},eS=(()=>{class t{_platform=d(he);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new Ke(null);_options;_lastTouchMs=0;_onKeydown=e=>{this._options?.ignoreKeys?.some(i=>i===e.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=It(e));};_onMousedown=e=>{Date.now()-this._lastTouchMs<JE||(this._modality.next(bc(e)?"keyboard":"mouse"),this._mostRecentTarget=It(e));};_onTouchstart=e=>{if(wc(e)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=It(e);};constructor(){let e=d(O),i=d(B),r=d(QE,{optional:true});if(this._options=v(v({},XE),r),this.modalityDetected=this._modality.pipe(Qa(1)),this.modalityChanged=this.modalityDetected.pipe(ls()),this._platform.isBrowser){let o=d(it).createRenderer(null,null);this._listenerCleanups=e.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,ly),o.listen(i,"mousedown",this._onMousedown,ly),o.listen(i,"touchstart",this._onTouchstart,ly)]);}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(e=>e());}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),Dc=(function(t){return t[t.IMMEDIATE=0]="IMMEDIATE",t[t.EVENTUAL=1]="EVENTUAL",t})(Dc||{}),tS=new g("cdk-focus-monitor-default-options"),pm=ia({passive:true,capture:true}),Uo=(()=>{class t{_ngZone=d(O);_platform=d(he);_inputModalityDetector=d(eS);_origin=null;_lastFocusOrigin=null;_windowFocused=false;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=false;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=true,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=false);};_document=d(B);_stopInputModalityDetector=new _;constructor(){let e=d(tS,{optional:true});this._detectionMode=e?.detectionMode||Dc.IMMEDIATE;}_rootNodeFocusAndBlurListener=e=>{let i=It(e);for(let r=i;r;r=r.parentElement)e.type==="focus"?this._onFocus(e,r):this._onBlur(e,r);};monitor(e,i=false){let r=zt(e);if(!this._platform.isBrowser||r.nodeType!==1)return R();let o=ay(r)||this._document,s=this._elementInfo.get(r);if(s)return i&&(s.checkChildren=true),s.subject;let a={checkChildren:i,subject:new _,rootNode:o};return this._elementInfo.set(r,a),this._registerGlobalListeners(a),a.subject}stopMonitoring(e){let i=zt(e),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r));}focusVia(e,i,r){let o=zt(e),s=this._document.activeElement;o===s?this._getClosestElementsInfo(o).forEach(([a,l])=>this._originChanged(a,i,l)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r));}ngOnDestroy(){this._elementInfo.forEach((e,i)=>this.stopMonitoring(i));}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(e){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(e)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:e&&this._isLastInteractionFromInputLabel(e)?"mouse":"program"}_shouldBeAttributedToTouch(e){return this._detectionMode===Dc.EVENTUAL||!!e?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(e,i){e.classList.toggle("cdk-focused",!!i),e.classList.toggle("cdk-touch-focused",i==="touch"),e.classList.toggle("cdk-keyboard-focused",i==="keyboard"),e.classList.toggle("cdk-mouse-focused",i==="mouse"),e.classList.toggle("cdk-program-focused",i==="program");}_setOrigin(e,i=false){this._ngZone.runOutsideAngular(()=>{if(this._origin=e,this._originFromTouchInteraction=e==="touch"&&i,this._detectionMode===Dc.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?JE:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r);}});}_onFocus(e,i){let r=this._elementInfo.get(i),o=It(e);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r);}_onBlur(e,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&e.relatedTarget instanceof Node&&i.contains(e.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null));}_emitOrigin(e,i){e.subject.observers.length&&this._ngZone.run(()=>e.subject.next(i));}_registerGlobalListeners(e){if(!this._platform.isBrowser)return;let i=e.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,pm),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,pm);}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener);}),this._inputModalityDetector.modalityDetected.pipe(A(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,true);}));}_removeGlobalListeners(e){let i=e.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,pm),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,pm),this._rootNodeFocusListenerCount.delete(i));}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId));}_originChanged(e,i,r){this._setClasses(e,i),this._emitOrigin(r,i),this._lastFocusOrigin=i;}_getClosestElementsInfo(e){let i=[];return this._elementInfo.forEach((r,o)=>{(o===e||r.checkChildren&&o.contains(e))&&i.push([o,r]);}),i}_isLastInteractionFromInputLabel(e){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===e||e.nodeName!=="INPUT"&&e.nodeName!=="TEXTAREA"||e.disabled)return  false;let o=e.labels;if(o){for(let s=0;s<o.length;s++)if(o[s].contains(i))return  true}return  false}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var gm=new WeakMap,yt=(()=>{class t{_appRef;_injector=d(j);_environmentInjector=d(Se);load(e){let i=this._appRef=this._appRef||this._injector.get(Vt),r=gm.get(i);r||(r={loaders:new Set,refs:[]},gm.set(i,r),i.onDestroy(()=>{gm.get(i)?.refs.forEach(o=>o.destroy()),gm.delete(i);})),r.loaders.has(e)||(r.loaders.add(e),r.refs.push(yf(e,{environmentInjector:this._environmentInjector})));}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var ra=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],exportAs:["cdkVisuallyHidden"],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-visually-hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
  outline: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  left: 0;
}
[dir=rtl] .cdk-visually-hidden {
  left: auto;
  right: 0;
}
`],encapsulation:2})}return t})(),vm;function cB(){if(vm===void 0&&(vm=null,typeof window<"u")){let t=window;t.trustedTypes!==void 0&&(vm=t.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}));}return vm}function Ho(t){return cB()?.createHTML(t)||t}function nS(t,n,e){let i=e.sanitize(_t.HTML,n);t.innerHTML=Ho(i||"");}function dB(t){if(t.type==="characterData"&&t.target instanceof Comment)return  true;if(t.type==="childList"){for(let n=0;n<t.addedNodes.length;n++)if(!(t.addedNodes[n]instanceof Comment))return  false;for(let n=0;n<t.removedNodes.length;n++)if(!(t.removedNodes[n]instanceof Comment))return  false;return  true}return  false}var iS=(()=>{class t{create(e){return typeof MutationObserver>"u"?null:new MutationObserver(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),rS=(()=>{class t{_mutationObserverFactory=d(iS);_observedElements=new Map;_ngZone=d(O);ngOnDestroy(){this._observedElements.forEach((e,i)=>this._cleanupObserver(i));}observe(e){let i=zt(e);return new Z(r=>{let s=this._observeElement(i).pipe(T$1(a=>a.filter(l=>!dB(l))),fe(a=>!!a.length)).subscribe(a=>{this._ngZone.run(()=>{r.next(a);});});return ()=>{s.unsubscribe(),this._unobserveElement(i);}})}_observeElement(e){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(e))this._observedElements.get(e).count++;else {let i=new _,r=this._mutationObserverFactory.create(o=>i.next(o));r&&r.observe(e,{characterData:true,childList:true,subtree:true}),this._observedElements.set(e,{observer:r,stream:i,count:1});}return this._observedElements.get(e).stream})}_unobserveElement(e){this._observedElements.has(e)&&(this._observedElements.get(e).count--,this._observedElements.get(e).count||this._cleanupObserver(e));}_cleanupObserver(e){if(this._observedElements.has(e)){let{observer:i,stream:r}=this._observedElements.get(e);i&&i.disconnect(),r.complete(),this._observedElements.delete(e);}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),oS=(()=>{class t{_contentObserver=d(rS);_elementRef=d(F);event=new K;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._disabled?this._unsubscribe():this._subscribe();}_disabled=false;get debounce(){return this._debounce}set debounce(e){this._debounce=St(e),this._subscribe();}_debounce;_currentSubscription=null;ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe();}ngOnDestroy(){this._unsubscribe();}_subscribe(){this._unsubscribe();let e=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?e.pipe(Qr(this.debounce)):e).subscribe(this.event);}_unsubscribe(){this._currentSubscription?.unsubscribe();}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",de],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return t})(),oa=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({providers:[iS]})}return t})();var uy=(()=>{class t{_platform=d(he);isDisabled(e){return e.hasAttribute("disabled")}isVisible(e){return fB(e)&&getComputedStyle(e).visibility==="visible"}isTabbable(e){if(!this._platform.isBrowser)return  false;let i=uB(bB(e));if(i&&(sS(i)===-1||!this.isVisible(i)))return  false;let r=e.nodeName.toLowerCase(),o=sS(e);return e.hasAttribute("contenteditable")?o!==-1:r==="iframe"||r==="object"||this._platform.WEBKIT&&this._platform.IOS&&!_B(e)?false:r==="audio"?e.hasAttribute("controls")?o!==-1:false:r==="video"?o===-1?false:o!==null?true:this._platform.FIREFOX||e.hasAttribute("controls"):e.tabIndex>=0}isFocusable(e,i){return yB(e)&&!this.isDisabled(e)&&(i?.ignoreVisibility||this.isVisible(e))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function uB(t){try{return t.frameElement}catch{return null}}function fB(t){return !!(t.offsetWidth||t.offsetHeight||typeof t.getClientRects=="function"&&t.getClientRects().length)}function mB(t){let n=t.nodeName.toLowerCase();return n==="input"||n==="select"||n==="button"||n==="textarea"}function hB(t){return gB(t)&&t.type=="hidden"}function pB(t){return vB(t)&&t.hasAttribute("href")}function gB(t){return t.nodeName.toLowerCase()=="input"}function vB(t){return t.nodeName.toLowerCase()=="a"}function cS(t){if(!t.hasAttribute("tabindex")||t.tabIndex===void 0)return  false;let n=t.getAttribute("tabindex");return !!(n&&!isNaN(parseInt(n,10)))}function sS(t){if(!cS(t))return null;let n=parseInt(t.getAttribute("tabindex")||"",10);return isNaN(n)?-1:n}function _B(t){let n=t.nodeName.toLowerCase(),e=n==="input"&&t.type;return e==="text"||e==="password"||n==="select"||n==="textarea"}function yB(t){return hB(t)?false:mB(t)||pB(t)||t.hasAttribute("contenteditable")||cS(t)}function bB(t){return t.ownerDocument&&t.ownerDocument.defaultView||window}var dy=class{_element;_checker;_ngZone;_document;_injector;_startAnchor=null;_endAnchor=null;_hasAttached=false;startAnchorListener=()=>this.focusLastTabbableElement();endAnchorListener=()=>this.focusFirstTabbableElement();get enabled(){return this._enabled}set enabled(n){this._enabled=n,this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor));}_enabled=true;constructor(n,e,i,r,o=false,s){this._element=n,this._checker=e,this._ngZone=i,this._document=r,this._injector=s,o||this.attachAnchors();}destroy(){let n=this._startAnchor,e=this._endAnchor;n&&(n.removeEventListener("focus",this.startAnchorListener),n.remove()),e&&(e.removeEventListener("focus",this.endAnchorListener),e.remove()),this._startAnchor=this._endAnchor=null,this._hasAttached=false;}attachAnchors(){return this._hasAttached?true:(this._ngZone.runOutsideAngular(()=>{this._startAnchor||(this._startAnchor=this._createAnchor(),this._startAnchor.addEventListener("focus",this.startAnchorListener)),this._endAnchor||(this._endAnchor=this._createAnchor(),this._endAnchor.addEventListener("focus",this.endAnchorListener));}),this._element.parentNode&&(this._element.parentNode.insertBefore(this._startAnchor,this._element),this._element.parentNode.insertBefore(this._endAnchor,this._element.nextSibling),this._hasAttached=true),this._hasAttached)}focusInitialElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusInitialElement(n)));})}focusFirstTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusFirstTabbableElement(n)));})}focusLastTabbableElementWhenReady(n){return new Promise(e=>{this._executeOnStable(()=>e(this.focusLastTabbableElement(n)));})}_getRegionBoundary(n){let e=this._element.querySelectorAll(`[cdk-focus-region-${n}], [cdkFocusRegion${n}], [cdk-focus-${n}]`);return n=="start"?e.length?e[0]:this._getFirstTabbableElement(this._element):e.length?e[e.length-1]:this._getLastTabbableElement(this._element)}focusInitialElement(n){let e=this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");if(e){if(!this._checker.isFocusable(e)){let i=this._getFirstTabbableElement(e);return i?.focus(n),!!i}return e.focus(n),true}return this.focusFirstTabbableElement(n)}focusFirstTabbableElement(n){let e=this._getRegionBoundary("start");return e&&e.focus(n),!!e}focusLastTabbableElement(n){let e=this._getRegionBoundary("end");return e&&e.focus(n),!!e}hasAttached(){return this._hasAttached}_getFirstTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=0;i<e.length;i++){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getFirstTabbableElement(e[i]):null;if(r)return r}return null}_getLastTabbableElement(n){if(this._checker.isFocusable(n)&&this._checker.isTabbable(n))return n;let e=n.children;for(let i=e.length-1;i>=0;i--){let r=e[i].nodeType===this._document.ELEMENT_NODE?this._getLastTabbableElement(e[i]):null;if(r)return r}return null}_createAnchor(){let n=this._document.createElement("div");return this._toggleAnchorTabIndex(this._enabled,n),n.classList.add("cdk-visually-hidden"),n.classList.add("cdk-focus-trap-anchor"),n.setAttribute("aria-hidden","true"),n}_toggleAnchorTabIndex(n,e){n?e.setAttribute("tabindex","0"):e.removeAttribute("tabindex");}toggleAnchors(n){this._startAnchor&&this._endAnchor&&(this._toggleAnchorTabIndex(n,this._startAnchor),this._toggleAnchorTabIndex(n,this._endAnchor));}_executeOnStable(n){rt(n,{injector:this._injector});}},fy=(()=>{class t{_checker=d(uy);_ngZone=d(O);_document=d(B);_injector=d(j);constructor(){d(yt).load(ra);}create(e,i=false){return new dy(e,this._checker,this._ngZone,this._document,i,this._injector)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var dS=new g("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),uS=new g("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),wB=0,xc=(()=>{class t{_ngZone=d(O);_defaultOptions=d(uS,{optional:true});_liveElement;_document=d(B);_sanitizer=d(tc);_previousTimeout;_currentPromise;_currentResolve;constructor(){let e=d(dS,{optional:true});this._liveElement=e||this._createLiveElement();}announce(e,...i){let r=this._defaultOptions,o,s;return i.length===1&&typeof i[0]=="number"?s=i[0]:[o,s]=i,this.clear(),clearTimeout(this._previousTimeout),o||(o=r&&r.politeness?r.politeness:"polite"),s==null&&r&&(s=r.duration),this._liveElement.setAttribute("aria-live",o),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(a=>this._currentResolve=a)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!e||typeof e=="string"?this._liveElement.textContent=e:nS(this._liveElement,e,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="");}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0;}_createLiveElement(){let e="cdk-live-announcer-element",i=this._document.getElementsByClassName(e),r=this._document.createElement("div");for(let o=0;o<i.length;o++)i[o].remove();return r.classList.add(e),r.classList.add("cdk-visually-hidden"),r.setAttribute("aria-atomic","true"),r.setAttribute("aria-live","polite"),r.id=`cdk-live-announcer-${wB++}`,this._document.body.appendChild(r),r}_exposeAnnouncerToModals(e){let i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e);}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var wr=(function(t){return t[t.NONE=0]="NONE",t[t.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",t[t.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",t})(wr||{}),aS="cdk-high-contrast-black-on-white",lS="cdk-high-contrast-white-on-black",cy="cdk-high-contrast-active",fS=(()=>{class t{_platform=d(he);_hasCheckedHighContrastMode=false;_document=d(B);_breakpointSubscription;constructor(){this._breakpointSubscription=d(_c).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=false,this._applyBodyHighContrastModeCssClasses());});}getHighContrastMode(){if(!this._platform.isBrowser)return wr.NONE;let e=this._document.createElement("div");e.style.backgroundColor="rgb(1,2,3)",e.style.position="absolute",this._document.body.appendChild(e);let i=this._document.defaultView||window,r=i&&i.getComputedStyle?i.getComputedStyle(e):null,o=(r&&r.backgroundColor||"").replace(/ /g,"");switch(e.remove(),o){case "rgb(0,0,0)":case "rgb(45,50,54)":case "rgb(32,32,32)":return wr.WHITE_ON_BLACK;case "rgb(255,255,255)":case "rgb(255,250,239)":return wr.BLACK_ON_WHITE}return wr.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe();}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let e=this._document.body.classList;e.remove(cy,aS,lS),this._hasCheckedHighContrastMode=true;let i=this.getHighContrastMode();i===wr.BLACK_ON_WHITE?e.add(cy,aS):i===wr.WHITE_ON_BLACK&&e.add(cy,lS);}}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),Ec=(()=>{class t{constructor(){d(fS)._applyBodyHighContrastModeCssClasses();}static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[oa]})}return t})();var CB=200,_m=class{_letterKeyStream=new _;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new _;selectedItem=this._selectedItem;constructor(n,e){let i=typeof e?.debounceInterval=="number"?e.debounceInterval:CB;e?.skipPredicate&&(this._skipPredicateFn=e.skipPredicate),this.setItems(n),this._setupKeyHandler(i);}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete();}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n;}setItems(n){this._items=n;}handleKey(n){let e=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(e>=65&&e<=90||e>=48&&e<=57)&&this._letterKeyStream.next(String.fromCharCode(e));}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[];}_setupKeyHandler(n){this._letterKeyStream.pipe(tt(e=>this._pressedLetters.push(e)),Qr(n),fe(()=>this._pressedLetters.length>0),T$1(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(e=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(e)===0){this._selectedItem.next(o);break}}this._pressedLetters=[];});}};function Ft(t,...n){return n.length?n.some(e=>t[e]):t.altKey||t.shiftKey||t.ctrlKey||t.metaKey}var sa=class{_items;_activeItemIndex=ve(-1);_activeItem=ve(null);_wrap=false;_typeaheadSubscription=ae.EMPTY;_itemChangesSubscription;_vertical=true;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=false;_pageUpAndDown={enabled:false,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,e){this._items=n,n instanceof bo?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):Rn(n)&&(this._effectRef=kn(()=>this._itemsChanged(n()),{injector:e}));}tabOut=new _;change=new _;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=true){return this._wrap=n,this}withVerticalOrientation(n=true){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let e=this._getItemsArray();return this._typeahead=new _m(e,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i);}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=true){return this._homeAndEnd=n,this}withPageUpDown(n=true,e=10){return this._pageUpAndDown={enabled:n,delta:e},this}setActiveItem(n){let e=this._activeItem();this.updateActiveItem(n),this._activeItem()!==e&&this.change.next(this._activeItemIndex());}onKeydown(n){let e=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(e){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(o<s?o:s-1,-1);break}else return;default:(r||Ft(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault();}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return !!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1);}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1);}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1);}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1);}updateActiveItem(n){let e=this._getItemsArray(),i=typeof n=="number"?n:e.indexOf(n),r=e[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i);}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete();}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n);}_setActiveInWrapMode(n){let e=this._getItemsArray();for(let i=1;i<=e.length;i++){let r=(this._activeItemIndex()+n*i+e.length)%e.length,o=e[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n);}_setActiveItemByIndex(n,e){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=e,!i[n])return;this.setActiveItem(n);}}_getItemsArray(){return Rn(this._items)?this._items():this._items instanceof bo?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let e=this._activeItem();if(e){let i=n.indexOf(e);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i));}}};var Sc=class extends sa{setActiveItem(n){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(n),this.activeItem&&this.activeItem.setActiveStyles();}};var py=class extends sa{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin);}};var gS=new Map,at=class t{_appId=d(Ii);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,e=false){this._appId!=="ng"&&(n+=this._appId);let i=gS.get(n);return i===void 0?i=0:i++,gS.set(n,i),`${n}${e?t._infix+"-":""}${i}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})};var _S=" ";function DB(t,n,e){let i=bm(t,n);e=e.trim(),!i.some(r=>r.trim()===e)&&(i.push(e),t.setAttribute(n,i.join(_S)));}function xB(t,n,e){let i=bm(t,n);e=e.trim();let r=i.filter(o=>o!==e);r.length?t.setAttribute(n,r.join(_S)):t.removeAttribute(n);}function bm(t,n){return t.getAttribute(n)?.match(/\S+/g)??[]}var yS="cdk-describedby-message",ym="cdk-describedby-host",vy=0,bS=(()=>{class t{_platform=d(he);_document=d(B);_messageRegistry=new Map;_messagesContainer=null;_id=`${vy++}`;constructor(){d(yt).load(ra),this._id=d(Ii)+"-"+vy++;}describe(e,i,r){if(!this._canBeDescribed(e,i))return;let o=gy(i,r);typeof i!="string"?(vS(i,this._id),this._messageRegistry.set(o,{messageElement:i,referenceCount:0})):this._messageRegistry.has(o)||this._createMessageElement(i,r),this._isElementDescribedByMessage(e,o)||this._addMessageReference(e,o);}removeDescription(e,i,r){if(!i||!this._isElementNode(e))return;let o=gy(i,r);if(this._isElementDescribedByMessage(e,o)&&this._removeMessageReference(e,o),typeof i=="string"){let s=this._messageRegistry.get(o);s&&s.referenceCount===0&&this._deleteMessageElement(o);}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null);}ngOnDestroy(){let e=this._document.querySelectorAll(`[${ym}="${this._id}"]`);for(let i=0;i<e.length;i++)this._removeCdkDescribedByReferenceIds(e[i]),e[i].removeAttribute(ym);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear();}_createMessageElement(e,i){let r=this._document.createElement("div");vS(r,this._id),r.textContent=e,i&&r.setAttribute("role",i),this._createMessagesContainer(),this._messagesContainer.appendChild(r),this._messageRegistry.set(gy(e,i),{messageElement:r,referenceCount:0});}_deleteMessageElement(e){this._messageRegistry.get(e)?.messageElement?.remove(),this._messageRegistry.delete(e);}_createMessagesContainer(){if(this._messagesContainer)return;let e="cdk-describedby-message-container",i=this._document.querySelectorAll(`.${e}[platform="server"]`);for(let o=0;o<i.length;o++)i[o].remove();let r=this._document.createElement("div");r.style.visibility="hidden",r.classList.add(e),r.classList.add("cdk-visually-hidden"),this._platform.isBrowser||r.setAttribute("platform","server"),this._document.body.appendChild(r),this._messagesContainer=r;}_removeCdkDescribedByReferenceIds(e){let i=bm(e,"aria-describedby").filter(r=>r.indexOf(yS)!=0);e.setAttribute("aria-describedby",i.join(" "));}_addMessageReference(e,i){let r=this._messageRegistry.get(i);DB(e,"aria-describedby",r.messageElement.id),e.setAttribute(ym,this._id),r.referenceCount++;}_removeMessageReference(e,i){let r=this._messageRegistry.get(i);r.referenceCount--,xB(e,"aria-describedby",r.messageElement.id),e.removeAttribute(ym);}_isElementDescribedByMessage(e,i){let r=bm(e,"aria-describedby"),o=this._messageRegistry.get(i),s=o&&o.messageElement.id;return !!s&&r.indexOf(s)!=-1}_canBeDescribed(e,i){if(!this._isElementNode(e))return  false;if(i&&typeof i=="object")return  true;let r=i==null?"":`${i}`.trim(),o=e.getAttribute("aria-label");return r?!o||o.trim()!==r:false}_isElementNode(e){return e.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function gy(t,n){return typeof t=="string"?`${n||""}/${t}`:t}function vS(t,n){t.id||(t.id=`${yS}-${n}-${vy++}`);}function _y(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var aa,wS=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function yy(){if(aa)return aa;if(typeof document!="object"||!document)return aa=new Set(wS),aa;let t=document.createElement("input");return aa=new Set(wS.filter(n=>(t.setAttribute("type",n),t.type===n))),aa}function et(t){return t==null?"":typeof t=="string"?t:`${t}px`}function bt(t){return t!=null&&`${t}`!="false"}var Cn=(function(t){return t[t.FADING_IN=0]="FADING_IN",t[t.VISIBLE=1]="VISIBLE",t[t.FADING_OUT=2]="FADING_OUT",t[t.HIDDEN=3]="HIDDEN",t})(Cn||{}),by=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=Cn.HIDDEN;constructor(n,e,i,r=false){this._renderer=n,this.element=e,this.config=i,this._animationForciblyDisabledThroughCss=r;}fadeOut(){this._renderer.fadeOutRipple(this);}},CS=ia({passive:true,capture:true}),wy=class{_events=new Map;addHandler(n,e,i,r){let o=this._events.get(e);if(o){let s=o.get(i);s?s.add(r):o.set(i,new Set([r]));}else this._events.set(e,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(e,this._delegateEventHandler,CS);});}removeHandler(n,e,i){let r=this._events.get(n);if(!r)return;let o=r.get(e);o&&(o.delete(i),o.size===0&&r.delete(e),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,CS)));}_delegateEventHandler=n=>{let e=It(n);e&&this._events.get(n.type)?.forEach((i,r)=>{(r===e||r.contains(e))&&i.forEach(o=>o.handleEvent(n));});}},Ic={enterDuration:225,exitDuration:150},EB=800,DS=ia({passive:true,capture:true}),xS=["mousedown","touchstart"],ES=["mouseup","mouseleave","touchend","touchcancel"],SB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2})}return t})(),zo=class t{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=false;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=false;_containerRect=null;static _eventManager=new wy;constructor(n,e,i,r,o){this._target=n,this._ngZone=e,this._platform=r,r.isBrowser&&(this._containerElement=zt(i)),o&&o.get(yt).load(SB);}fadeInRipple(n,e,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=v(v({},Ic),i.animation);i.centered&&(n=r.left+r.width/2,e=r.top+r.height/2);let s=i.radius||IB(n,e,r),a=n-r.left,l=e-r.top,c=o.enterDuration,u=document.createElement("div");u.classList.add("mat-ripple-element"),u.style.left=`${a-s}px`,u.style.top=`${l-s}px`,u.style.height=`${s*2}px`,u.style.width=`${s*2}px`,i.color!=null&&(u.style.backgroundColor=i.color),u.style.transitionDuration=`${c}ms`,this._containerElement.appendChild(u);let f=window.getComputedStyle(u),m=f.transitionProperty,h=f.transitionDuration,p=m==="none"||h==="0s"||h==="0s, 0s"||r.width===0&&r.height===0,b=new by(this,u,i,p);u.style.transform="scale3d(1, 1, 1)",b.state=Cn.FADING_IN,i.persistent||(this._mostRecentTransientRipple=b);let x=null;return !p&&(c||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let P=()=>{x&&(x.fallbackTimer=null),clearTimeout(He),this._finishRippleTransition(b);},_e=()=>this._destroyRipple(b),He=setTimeout(_e,c+100);u.addEventListener("transitionend",P),u.addEventListener("transitioncancel",_e),x={onTransitionEnd:P,onTransitionCancel:_e,fallbackTimer:He};}),this._activeRipples.set(b,x),(p||!c)&&this._finishRippleTransition(b),b}fadeOutRipple(n){if(n.state===Cn.FADING_OUT||n.state===Cn.HIDDEN)return;let e=n.element,i=v(v({},Ic),n.config.animation);e.style.transitionDuration=`${i.exitDuration}ms`,e.style.opacity="0",n.state=Cn.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n);}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut());}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut();});}setupTriggerEvents(n){let e=zt(n);!this._platform.isBrowser||!e||e===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=e,xS.forEach(i=>{t._eventManager.addHandler(this._ngZone,i,e,this);}));}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{ES.forEach(e=>{this._triggerElement.addEventListener(e,this,DS);});}),this._pointerUpEventsRegistered=true);}_finishRippleTransition(n){n.state===Cn.FADING_IN?this._startFadeOutTransition(n):n.state===Cn.FADING_OUT&&this._destroyRipple(n);}_startFadeOutTransition(n){let e=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=Cn.VISIBLE,!i&&(!e||!this._isPointerDown)&&n.fadeOut();}_destroyRipple(n){let e=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=Cn.HIDDEN,e!==null&&(n.element.removeEventListener("transitionend",e.onTransitionEnd),n.element.removeEventListener("transitioncancel",e.onTransitionCancel),e.fallbackTimer!==null&&clearTimeout(e.fallbackTimer)),n.element.remove();}_onMousedown(n){let e=bc(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+EB;!this._target.rippleDisabled&&!e&&!i&&(this._isPointerDown=true,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig));}_onTouchStart(n){if(!this._target.rippleDisabled&&!wc(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=true;let e=n.changedTouches;if(e)for(let i=0;i<e.length;i++)this.fadeInRipple(e[i].clientX,e[i].clientY,this._target.rippleConfig);}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=false,this._getActiveRipples().forEach(n=>{let e=n.state===Cn.VISIBLE||n.config.terminateOnPointerUp&&n.state===Cn.FADING_IN;!n.config.persistent&&e&&n.fadeOut();}));}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(xS.forEach(e=>t._eventManager.removeHandler(e,n,this)),this._pointerUpEventsRegistered&&(ES.forEach(e=>n.removeEventListener(e,this,DS)),this._pointerUpEventsRegistered=false));}};function IB(t,n,e){let i=Math.max(Math.abs(t-e.left),Math.abs(t-e.right)),r=Math.max(Math.abs(n-e.top),Math.abs(n-e.bottom));return Math.sqrt(i*i+r*r)}var Mc=new g("mat-ripple-global-options"),SS=(()=>{class t{_elementRef=d(F);_animationsDisabled=We();color;unbounded=false;centered=false;radius=0;animation;get disabled(){return this._disabled}set disabled(e){e&&this.fadeOutAllNonPersistent(),this._disabled=e,this._setupTriggerEventsIfEnabled();}_disabled=false;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(e){this._trigger=e,this._setupTriggerEventsIfEnabled();}_trigger;_rippleRenderer;_globalOptions;_isInitialized=false;constructor(){let e=d(O),i=d(he),r=d(Mc,{optional:true}),o=d(j);this._globalOptions=r||{},this._rippleRenderer=new zo(this,e,this._elementRef,i,o);}ngOnInit(){this._isInitialized=true,this._setupTriggerEventsIfEnabled();}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents();}fadeOutAll(){this._rippleRenderer.fadeOutAll();}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent();}get rippleConfig(){return {centered:this.centered,radius:this.radius,color:this.color,animation:v(v(v({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger);}launch(e,i=0,r){return typeof e=="number"?this._rippleRenderer.fadeInRipple(e,i,v(v({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,v(v({},this.rippleConfig),e))}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&$$1("mat-ripple-unbounded",r.unbounded);},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return t})();var MB={capture:true},TB=["focus","mousedown","mouseenter","touchstart"],Cy="mat-ripple-loader-uninitialized",Dy="mat-ripple-loader-class-name",IS="mat-ripple-loader-centered",wm="mat-ripple-loader-disabled",MS=(()=>{class t{_document=d(B);_animationsDisabled=We();_globalRippleOptions=d(Mc,{optional:true});_platform=d(he);_ngZone=d(O);_injector=d(j);_eventCleanups;_hosts=new Map;constructor(){let e=d(it).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>TB.map(i=>e.listen(this._document,i,this._onInteraction,MB)));}ngOnDestroy(){let e=this._hosts.keys();for(let i of e)this.destroyRipple(i);this._eventCleanups.forEach(i=>i());}configureRipple(e,i){e.setAttribute(Cy,this._globalRippleOptions?.namespace??""),(i.className||!e.hasAttribute(Dy))&&e.setAttribute(Dy,i.className||""),i.centered&&e.setAttribute(IS,""),i.disabled&&e.setAttribute(wm,"");}setDisabled(e,i){let r=this._hosts.get(e);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=true,r.renderer.setupTriggerEvents(e))):i?e.setAttribute(wm,""):e.removeAttribute(wm);}_onInteraction=e=>{let i=It(e);if(i instanceof HTMLElement){let r=i.closest(`[${Cy}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r);}};_createRipple(e){if(!this._document||this._hosts.has(e))return;e.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",e.getAttribute(Dy)),e.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??Ic.enterDuration,s=this._animationsDisabled?0:r?.animation?.exitDuration??Ic.exitDuration,a={rippleDisabled:this._animationsDisabled||r?.disabled||e.hasAttribute(wm),rippleConfig:{centered:e.hasAttribute(IS),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:s}}},l=new zo(a,this._ngZone,i,this._platform,this._injector),c=!a.rippleDisabled;c&&l.setupTriggerEvents(e),this._hosts.set(e,{target:a,renderer:l,hasSetUpEvents:c}),e.removeAttribute(Cy);}destroyRipple(e){let i=this._hosts.get(e);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(e));}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var la=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2})}return t})();var AB=["*",[["","progressIndicator",""]]],kB=["*","[progressIndicator]"];function RB(t,n){t&1&&(Ze(0,"div",1),q(1,1),Xe());}var OB=new g("MAT_BUTTON_CONFIG");function TS(t){return t==null?void 0:ci(t)}var Tc=(()=>{class t{_elementRef=d(F);_ngZone=d(O);_animationsDisabled=We();_config=d(OB,{optional:true});_focusMonitor=d(Uo);_cleanupClick;_renderer=d(Oe);_rippleLoader=d(MS);_isAnchor;_isFab=false;color;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=e,this._updateRippleDisabled();}_disableRipple=false;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._updateRippleDisabled();}_disabled=false;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(e){this.tabIndex=e;}showProgress=Ul(false,{transform:de});constructor(){d(yt).load(la);let e=this._elementRef.nativeElement;this._isAnchor=e.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??false,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(e,{className:"mat-mdc-button-ripple"});}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,true),this._isAnchor&&this._setupAsAnchor();}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);}focus(e="program",i){e?this._focusMonitor.focusVia(this._elementRef.nativeElement,e,i):this._elementRef.nativeElement.focus(i);}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?true:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:true}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled);}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation());}));}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,hostAttrs:[1,"mat-mdc-button-base"],hostVars:15,hostBindings:function(i,r){i&2&&(ce("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),Bn(r.color?"mat-"+r.color:""),$$1("mat-mdc-button-progress-indicator-shown",r.showProgress())("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled));},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",de],disabled:[2,"disabled","disabled",de],ariaDisabled:[2,"aria-disabled","ariaDisabled",de],disabledInteractive:[2,"disabledInteractive","disabledInteractive",de],tabIndex:[2,"tabIndex","tabIndex",TS],_tabindex:[2,"tabindex","_tabindex",TS],showProgress:[1,"showProgress"]}})}return t})(),NB=(()=>{class t extends Tc{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:true});}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[ge],ngContentSelectors:kB,decls:5,vars:1,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ve(AB),mt(0,"span",0),q(1),Q(2,RB,2,0,"div",1),mt(3,"span",2)(4,"span",3)),i&2&&(C(2),X(r.showProgress()?2:-1));},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__determinate-circle-graphic {
  width: inherit;
  height: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-progress-indicator-container .mdc-circular-progress__indeterminate-circle-graphic {
  height: 100%;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return t})();var ca=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce]})}return t})();var xy=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]],[["","progressIndicator",""]]],Ey=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]","[progressIndicator]"];function FB(t,n){t&1&&(Ze(0,"div",2),q(1,3),Xe());}function PB(t,n){t&1&&(Ze(0,"div",2),q(1,3),Xe());}function LB(t,n){t&1&&(Ze(0,"div",2),q(1,3),Xe());}var jB=`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  margin-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,AS=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),Cr=(()=>{class t extends Tc{get appearance(){return this._appearance}set appearance(e){this.setAppearance(e||this._config?.defaultAppearance||"text");}_appearance=null;constructor(){super();let e=BB(this._elementRef.nativeElement);e&&this.setAppearance(e);}setAppearance(e){if(e===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?AS.get(this._appearance):null,o=AS.get(e);r&&i.remove(...r),i.add(...o),this._appearance=e;}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[ge],ngContentSelectors:Ey,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ve(xy),mt(0,"span",0),q(1),Ze(2,"span",1),q(3,1),Xe(),q(4,2),Q(5,FB,2,0,"div",2),mt(6,"span",3)(7,"span",4)),i&2&&($$1("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),C(5),X(r.showProgress()?5:-1));},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2})}return t})();function BB(t){return t.hasAttribute("mat-raised-button")?"elevated":t.hasAttribute("mat-stroked-button")?"outlined":t.hasAttribute("mat-flat-button")?"filled":t.hasAttribute("mat-button")?"text":null}var kS=new g("mat-mdc-fab-default-options",{providedIn:"root",factory:()=>Ac}),Ac={color:"accent"},da=(()=>{class t extends Tc{_options=d(kS,{optional:true});_isFab=true;extended=false;constructor(){super(),this._options=this._options||Ac,this.color=this._options.color||Ac.color;}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","mat-fab",""],["a","mat-fab",""],["button","matFab",""],["a","matFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mat-mdc-fab"],hostVars:4,hostBindings:function(i,r){i&2&&$$1("mdc-fab--extended",r.extended)("mat-mdc-extended-fab",r.extended);},inputs:{extended:[2,"extended","extended",de]},exportAs:["matButton","matAnchor"],features:[ge],ngContentSelectors:Ey,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ve(xy),mt(0,"span",0),q(1),Ze(2,"span",1),q(3,1),Xe(),q(4,2),Q(5,PB,2,0,"div",2),mt(6,"span",3)(7,"span",4)),i&2&&($$1("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),C(5),X(r.showProgress()?5:-1));},styles:[`.mat-mdc-fab-base {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  overflow: visible;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 15ms linear 30ms, transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-fab-base .mat-mdc-button-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple,
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-fab-base .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-fab-base .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-fab-base .mdc-button__label,
.mat-mdc-fab-base .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-fab-base .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}
.mat-mdc-fab-base:focus-visible > .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-fab-base._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-fab-base::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mat-mdc-fab-base[hidden] {
  display: none;
}
.mat-mdc-fab-base::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mat-mdc-fab-base:active, .mat-mdc-fab-base:focus {
  outline: none;
}
.mat-mdc-fab-base:hover {
  cursor: pointer;
}
.mat-mdc-fab-base > svg {
  width: 100%;
}
.mat-mdc-fab-base .mat-icon, .mat-mdc-fab-base .material-icons {
  transition: transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);
  fill: currentColor;
  will-change: transform;
}
.mat-mdc-fab-base .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-fab-base[disabled], .mat-mdc-fab-base[disabled]:focus, .mat-mdc-fab-base.mat-mdc-button-disabled, .mat-mdc-fab-base.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-fab-base.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-fab {
  background-color: var(--mat-fab-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-container-shape, var(--mat-sys-corner-large));
  color: var(--mat-fab-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-fab:hover {
    box-shadow: var(--mat-fab-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-fab:focus {
  box-shadow: var(--mat-fab-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab:active, .mat-mdc-fab:focus:active {
  box-shadow: var(--mat-fab-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-fab[disabled], .mat-mdc-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-touch-target-size, 48px);
  display: var(--mat-fab-touch-target-display, block);
  left: 50%;
  width: var(--mat-fab-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-fab .mat-ripple-element {
  background-color: var(--mat-fab-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-disabled-state-layer-color);
}
.mat-mdc-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-mini-fab {
  width: 40px;
  height: 40px;
  background-color: var(--mat-fab-small-container-color, var(--mat-sys-primary-container));
  border-radius: var(--mat-fab-small-container-shape, var(--mat-sys-corner-medium));
  color: var(--mat-fab-small-foreground-color, var(--mat-sys-on-primary-container, inherit));
  box-shadow: var(--mat-fab-small-container-elevation-shadow, var(--mat-sys-level3));
}
@media (hover: hover) {
  .mat-mdc-mini-fab:hover {
    box-shadow: var(--mat-fab-small-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-mini-fab:focus {
  box-shadow: var(--mat-fab-small-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab:active, .mat-mdc-mini-fab:focus:active {
  box-shadow: var(--mat-fab-small-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-mini-fab[disabled], .mat-mdc-mini-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-fab-small-disabled-state-foreground-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-fab-small-disabled-state-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-mini-fab .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-fab-small-touch-target-size, 48px);
  display: var(--mat-fab-small-touch-target-display);
  left: 50%;
  width: var(--mat-fab-small-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-mini-fab .mat-ripple-element {
  background-color: var(--mat-fab-small-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-state-layer-color, var(--mat-sys-on-primary-container));
}
.mat-mdc-mini-fab.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-fab-small-disabled-state-layer-color);
}
.mat-mdc-mini-fab:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-mini-fab.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-mini-fab.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-mini-fab:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-fab-small-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}

.mat-mdc-extended-fab {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  padding-left: 20px;
  padding-right: 20px;
  width: auto;
  max-width: 100%;
  line-height: normal;
  box-shadow: var(--mat-fab-extended-container-elevation-shadow, var(--mat-sys-level3));
  height: var(--mat-fab-extended-container-height, 56px);
  border-radius: var(--mat-fab-extended-container-shape, var(--mat-sys-corner-large));
  font-family: var(--mat-fab-extended-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-fab-extended-label-text-size, var(--mat-sys-label-large-size));
  font-weight: var(--mat-fab-extended-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-fab-extended-label-text-tracking, var(--mat-sys-label-large-tracking));
}
@media (hover: hover) {
  .mat-mdc-extended-fab:hover {
    box-shadow: var(--mat-fab-extended-hover-container-elevation-shadow, var(--mat-sys-level4));
  }
}
.mat-mdc-extended-fab:focus {
  box-shadow: var(--mat-fab-extended-focus-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab:active, .mat-mdc-extended-fab:focus:active {
  box-shadow: var(--mat-fab-extended-pressed-container-elevation-shadow, var(--mat-sys-level3));
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-extended-fab[disabled], .mat-mdc-extended-fab[disabled]:focus, .mat-mdc-extended-fab.mat-mdc-button-disabled, .mat-mdc-extended-fab.mat-mdc-button-disabled:focus {
  box-shadow: none;
}
.mat-mdc-extended-fab.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
[dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .mat-icon, [dir=rtl] .mat-mdc-extended-fab .mdc-button__label + .material-icons,
.mat-mdc-extended-fab > .mat-icon,
.mat-mdc-extended-fab > .material-icons {
  margin-left: -8px;
  margin-right: 12px;
}
.mat-mdc-extended-fab .mdc-button__label + .mat-icon,
.mat-mdc-extended-fab .mdc-button__label + .material-icons, [dir=rtl] .mat-mdc-extended-fab > .mat-icon, [dir=rtl] .mat-mdc-extended-fab > .material-icons {
  margin-left: 12px;
  margin-right: -8px;
}
.mat-mdc-extended-fab .mat-mdc-button-touch-target {
  width: 100%;
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  margin-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`],encapsulation:2})}return t})(),RS=(()=>{class t extends Tc{_options=d(kS,{optional:true});_isFab=true;constructor(){super(),this._options=this._options||Ac,this.color=this._options.color||Ac.color;}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["button","mat-mini-fab",""],["a","mat-mini-fab",""],["button","matMiniFab",""],["a","matMiniFab",""]],hostAttrs:[1,"mdc-fab","mat-mdc-fab-base","mdc-fab--mini","mat-mdc-mini-fab"],exportAs:["matButton","matAnchor"],features:[ge],ngContentSelectors:Ey,decls:8,vars:5,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-mdc-button-progress-indicator-container"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(Ve(xy),mt(0,"span",0),q(1),Ze(2,"span",1),q(3,1),Xe(),q(4,2),Q(5,LB,2,0,"div",2),mt(6,"span",3)(7,"span",4)),i&2&&($$1("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab),C(5),X(r.showProgress()?5:-1));},styles:[jB],encapsulation:2})}return t})();var Gn=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[ca,Ce]})}return t})();var Rc=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach());}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n;}},Wn=class extends Rc{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(n,e,i,r,o,s){super(),this.component=n,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null,this.directives=s||null;}},Bi=class extends Rc{templateRef;viewContainerRef;context;injector;constructor(n,e,i,r){super(),this.templateRef=n,this.viewContainerRef=e,this.context=i,this.injector=r;}get origin(){return this.templateRef.elementRef}attach(n,e=this.context){return this.context=e,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Sy=class extends Rc{element;constructor(n){super(),this.element=n instanceof F?n.nativeElement:n;}},Dr=class{_attachedPortal=null;_disposeFn=null;_isDisposed=false;hasAttached(){return !!this._attachedPortal}attach(n){if(n instanceof Wn)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof Bi)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Sy)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn();}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=true;}setDisposeFn(n){this._disposeFn=n;}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null);}},Cm=class extends Dr{outletElement;_appRef;_defaultInjector;constructor(n,e,i){super(),this.outletElement=n,this._appRef=e,this._defaultInjector=i;}attachComponentPortal(n){let e;if(n.viewContainerRef){let i=n.injector||n.viewContainerRef.injector,r=i.get(si,null,{optional:true})||void 0;e=n.viewContainerRef.createComponent(n.component,{index:n.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),this.setDisposeFn(()=>e.destroy());}else {let i=this._appRef,r=n.injector||this._defaultInjector||j.NULL,o=r.get(Se,i.injector);e=yf(n.component,{elementInjector:r,environmentInjector:o,projectableNodes:n.projectableNodes||void 0,bindings:n.bindings||void 0,directives:n.directives||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy();});}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=n,e}attachTemplatePortal(n){let e=n.viewContainerRef,i=e.createEmbeddedView(n.templateRef,n.context,{injector:n.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r);}),this._attachedPortal=n,i}attachDomPortal=n=>{let e=n.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment("dom-portal");e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=n,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i);});};dispose(){super.dispose(),this.outletElement.remove();}_getComponentRootNode(n){return n.hostView.rootNodes[0]}};var xr=(()=>{class t extends Dr{_moduleRef=d(si,{optional:true});_document=d(B);_viewContainerRef=d(kt);_isInitialized=false;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null);}attached=new K;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=true;}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null;}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment("dom-portal");e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r);});};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[ge]})}return t})(),Er=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();var OS=um();function ma(t){return new Dm(t.get(ji),t.get(B))}var Dm=class{_viewportRuler;_previousHTMLStyles={top:"",left:""};_previousScrollPosition;_isEnabled=false;_document;constructor(n,e){this._viewportRuler=n,this._document=e;}attach(){}enable(){if(this._canBeEnabled()){let n=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=n.style.left||"",this._previousHTMLStyles.top=n.style.top||"",n.style.left=et(-this._previousScrollPosition.left),n.style.top=et(-this._previousScrollPosition.top),n.classList.add("cdk-global-scrollblock"),this._isEnabled=true;}}disable(){if(this._isEnabled){let n=this._document.documentElement,e=this._document.body,i=n.style,r=e.style,o=i.scrollBehavior||"",s=r.scrollBehavior||"";this._isEnabled=false,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,n.classList.remove("cdk-global-scrollblock"),OS&&(i.scrollBehavior=r.scrollBehavior="auto"),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),OS&&(i.scrollBehavior=o,r.scrollBehavior=s);}}_canBeEnabled(){if(this._document.documentElement.classList.contains("cdk-global-scrollblock")||this._isEnabled)return  false;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function VS(t,n){return new xm(t.get(Vo),t.get(O),t.get(ji),n)}var xm=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(n,e,i,r){this._scrollDispatcher=n,this._ngZone=e,this._viewportRuler=i,this._config=r;}attach(n){this._overlayRef,this._overlayRef=n;}enable(){if(this._scrollSubscription)return;let n=this._scrollDispatcher.scrolled(0).pipe(fe(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=n.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition();})):this._scrollSubscription=n.subscribe(this._detach);}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null);}detach(){this.disable(),this._overlayRef=null;}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach());}};var Oc=class{enable(){}disable(){}attach(){}};function Iy(t,n){return n.some(e=>{let i=t.bottom<e.top,r=t.top>e.bottom,o=t.right<e.left,s=t.left>e.right;return i||r||o||s})}function NS(t,n){return n.some(e=>{let i=t.top<e.top,r=t.bottom>e.bottom,o=t.left<e.left,s=t.right>e.right;return i||r||o||s})}function Wo(t,n){return new Em(t.get(Vo),t.get(ji),t.get(O),n)}var Em=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(n,e,i,r){this._scrollDispatcher=n,this._viewportRuler=e,this._ngZone=i,this._config=r;}attach(n){this._overlayRef,this._overlayRef=n;}enable(){if(!this._scrollSubscription){let n=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(n).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();Iy(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()));}});}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null);}detach(){this.disable(),this._overlayRef=null;}},US=(()=>{class t{_injector=d(j);noop=()=>new Oc;close=e=>VS(this._injector,e);block=()=>ma(this._injector);reposition=e=>Wo(this._injector,e);static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),Vi=class{positionStrategy;scrollStrategy=new Oc;panelClass="";hasBackdrop=false;backdropClass="cdk-overlay-dark-backdrop";disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=false;usePopover;eventPredicate;constructor(n){if(n){let e=Object.keys(n);for(let i of e)n[i]!==void 0&&(this[i]=n[i]);}}};var Sm=class{connectionPair;scrollableViewProperties;constructor(n,e){this.connectionPair=n,this.scrollableViewProperties=e;}};var HS=(()=>{class t{_attachedOverlays=[];_document=d(B);_isAttached=false;ngOnDestroy(){this.detach();}add(e){this.remove(e),this._attachedOverlays.push(e);}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach();}canReceiveEvent(e,i,r){return r.observers.length<1?false:e.eventPredicate?e.eventPredicate(i):true}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),zS=(()=>{class t extends HS{_ngZone=d(O);_renderer=d(it).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen("body","keydown",this._keydownListener);}),this._isAttached=true);}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=false);}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),$S=(()=>{class t extends HS{_platform=d(he);_ngZone=d(O);_renderer=d(it).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=false;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:true},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,"pointerdown",this._pointerDownListener,r),o.listen(i,"click",this._clickListener,r),o.listen(i,"auxclick",this._clickListener,r),o.listen(i,"contextmenu",this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor="pointer",this._cursorStyleIsSet=true),this._isAttached=true;}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=false),this._isAttached=false);}_pointerDownListener=e=>{this._pointerDownEventTarget=It(e);};_clickListener=e=>{let i=It(e),r=e.type==="click"&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let s=o.length-1;s>-1;s--){let a=o[s],l=a._outsidePointerEvents;if(!(!a.hasAttached()||!this.canReceiveEvent(a,e,l))){if(FS(a.overlayElement,i)||FS(a.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>l.next(e)):l.next(e);}}};static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function FS(t,n){let e=typeof ShadowRoot<"u"&&ShadowRoot,i=n;for(;i;){if(i===t)return  true;i=e&&i instanceof ShadowRoot?i.host:i.parentNode;}return  false}var GS=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-overlay-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return t})(),Tm=(()=>{class t{_platform=d(he);_containerElement;_document=d(B);_styleLoader=d(yt);ngOnDestroy(){this._containerElement?.remove();}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e="cdk-overlay-container";if(this._platform.isBrowser||_y()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove();}let i=this._document.createElement("div");i.classList.add(e),_y()?i.setAttribute("platform","test"):this._platform.isBrowser||i.setAttribute("platform","server"),this._document.body.appendChild(i),this._containerElement=i;}_loadStyles(){this._styleLoader.load(GS);}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),My=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(n,e,i,r){this._renderer=e,this._ngZone=i,this.element=n.createElement("div"),this.element.classList.add("cdk-overlay-backdrop"),this._cleanupClick=e.listen(this.element,"click",r);}detach(){this._ngZone.runOutsideAngular(()=>{let n=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(n,"transitionend",this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),n.style.pointerEvents="none",n.classList.remove("cdk-overlay-backdrop-showing");});}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove();}};function Ty(t){return t&&t.nodeType===1}var ua=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new _;_attachments=new _;_detachments=new _;_positionStrategy;_scrollStrategy;_locationChanges=ae.EMPTY;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=false;_previousHostParent;_keydownEvents=new _;_outsidePointerEvents=new _;_afterNextRenderRef;constructor(n,e,i,r,o,s,a,l,c,u=false,f,m){this._portalOutlet=n,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=s,this._document=a,this._location=l,this._outsideClickDispatcher=c,this._animationsDisabled=u,this._injector=f,this._renderer=m,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy;}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(n){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(n);return this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=rt(()=>{this.hasAttached()&&this.updatePosition();},{injector:this._injector}),this._togglePointerEvents(true),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,true),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation&&(this._locationChanges=this._location.subscribe(()=>this.dispose())),this._outsideClickDispatcher.add(this),typeof e?.onDestroy=="function"&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()));}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(false),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let n=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges.unsubscribe(),this._outsideClickDispatcher.remove(this),n}dispose(){if(this._disposed)return;let n=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges.unsubscribe(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,n&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=true;}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply();}updatePositionStrategy(n){n!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=n,this.hasAttached()&&(n.attach(this),this.updatePosition()));}updateSize(n){this._config=v(v({},this._config),n),this._updateElementSize();}setDirection(n){this._config=Y(v({},this._config),{direction:n}),this._updateElementDirection();}addPanelClass(n){this._pane&&this._toggleClasses(this._pane,n,true);}removePanelClass(n){this._pane&&this._toggleClasses(this._pane,n,false);}getDirection(){let n=this._config.direction;return n?typeof n=="string"?n:n.value:"ltr"}updateScrollStrategy(n){n!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=n,this.hasAttached()&&(n.attach(this),n.enable()));}_updateElementDirection(){this._host.setAttribute("dir",this.getDirection());}_updateElementSize(){if(!this._pane)return;let n=this._pane.style;n.width=et(this._config.width),n.height=et(this._config.height),n.minWidth=et(this._config.minWidth),n.minHeight=et(this._config.minHeight),n.maxWidth=et(this._config.maxWidth),n.maxHeight=et(this._config.maxHeight);}_togglePointerEvents(n){this._pane.style.pointerEvents=n?"":"none";}_attachHost(){if(!this._host.parentElement){let n=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Ty(n)?n.after(this._host):n?.type==="parent"?n.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host);}if(this._config.usePopover)try{this._host.showPopover();}catch{}}_attachBackdrop(){let n="cdk-overlay-backdrop-showing";this._backdropRef?.dispose(),this._backdropRef=new My(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e);}),this._animationsDisabled&&this._backdropRef.element.classList.add("cdk-overlay-backdrop-noop-animation"),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,true),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<"u"?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(n));}):this._backdropRef.element.classList.add(n);}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host);}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach();}_toggleClasses(n,e,i){let r=Js(e||[]).filter(o=>!!o);r.length&&(i?n.classList.add(...r):n.classList.remove(...r));}_detachContentWhenEmpty(){let n=false;try{this._detachContentAfterRenderRef=rt(()=>{n=!0,this._detachContent();},{injector:this._injector});}catch(e){if(n)throw e;this._detachContent();}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent();}),this._detachContentMutationObserver.observe(this._pane,{childList:true}));}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,false),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent());}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect();}_disposeScrollStrategy(){let n=this._scrollStrategy;n?.disable(),n?.detach?.();}},PS="cdk-overlay-connected-position-bounding-box",VB=/([A-Za-z%]+)$/;function Nc(t,n){return new Im(n,t.get(ji),t.get(B),t.get(he),t.get(Tm))}var Im=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=false;_lastBoundingBoxSize={width:0,height:0};_isPushed=false;_canPush=true;_growAfterOpen=false;_hasFlexibleDimensions=true;_positionLocked=false;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=false;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new _;_resizeSubscription=ae.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation="global";positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(n,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(n);}attach(n){this._overlayRef&&this._overlayRef,this._validatePositions(),n.hostElement.classList.add(PS),this._overlayRef=n,this._boundingBox=n.hostElement,this._pane=n.overlayElement,this._isDisposed=false,this._isInitialRender=true,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=true,this.apply();});}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let n=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],s;for(let a of this._preferredPositions){let l=this._getOriginPoint(n,r,a),c=this._getOverlayPoint(l,e,a),u=this._getOverlayFit(c,e,i,a);if(u.isCompletelyWithinViewport){this._isPushed=false,this._applyPosition(a,l);return}if(this._canFitWithFlexibleDimensions(u,c,i)){o.push({position:a,origin:l,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(l,a)});continue}(!s||s.overlayFit.visibleArea<u.visibleArea)&&(s={overlayFit:u,overlayPoint:c,originPoint:l,position:a,overlayRect:e});}if(o.length){let a=null,l=-1;for(let c of o){let u=c.boundingBoxRect.width*c.boundingBoxRect.height*(c.position.weight||1);u>l&&(l=u,a=c);}this._isPushed=false,this._applyPosition(a.position,a.origin);return}if(this._canPush){this._isPushed=true,this._applyPosition(s.position,s.originPoint);return}this._applyPosition(s.position,s.originPoint);}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe();}dispose(){this._isDisposed||(this._boundingBox&&$o(this._boundingBox.style,{top:"",left:"",right:"",bottom:"",height:"",width:"",alignItems:"",justifyContent:""}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(PS),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=true);}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let n=this._lastPosition;n?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(n,this._getOriginPoint(this._originRect,this._containerRect,n))):this.apply();}withScrollableContainers(n){return this._scrollables=n,this}withPositions(n){return this._preferredPositions=n,n.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(n){return this._viewportMargin=n,this}withFlexibleDimensions(n=true){return this._hasFlexibleDimensions=n,this}withGrowAfterOpen(n=true){return this._growAfterOpen=n,this}withPush(n=true){return this._canPush=n,this}withLockedPosition(n=true){return this._positionLocked=n,this}setOrigin(n){return this._origin=n,this}withDefaultOffsetX(n){return this._offsetX=n,this}withDefaultOffsetY(n){return this._offsetY=n,this}withTransformOriginOn(n){return this._transformOriginSelector=n,this}withPopoverLocation(n){return this._popoverLocation=n,this}getPopoverInsertionPoint(){return this._popoverLocation==="global"?null:this._popoverLocation!=="inline"?this._popoverLocation:this._origin instanceof F?this._origin.nativeElement:Ty(this._origin)?this._origin:null}_getOriginPoint(n,e,i){let r;if(i.originX=="center")r=n.left+n.width/2;else {let s=this._isRtl()?n.right:n.left,a=this._isRtl()?n.left:n.right;r=i.originX=="start"?s:a;}e.left<0&&(r-=e.left);let o;return i.originY=="center"?o=n.top+n.height/2:o=i.originY=="top"?n.top:n.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(n,e,i){let r;i.overlayX=="center"?r=-e.width/2:i.overlayX==="start"?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY=="center"?o=-e.height/2:o=i.overlayY=="top"?0:-e.height,{x:n.x+r,y:n.y+o}}_getOverlayFit(n,e,i,r){let o=jS(e),{x:s,y:a}=n,l=this._getOffset(r,"x"),c=this._getOffset(r,"y");l&&(s+=l),c&&(a+=c);let u=0-s,f=s+o.width-i.width,m=0-a,h=a+o.height-i.height,p=this._subtractOverflows(o.width,u,f),b=this._subtractOverflows(o.height,m,h),x=p*b;return {visibleArea:x,isCompletelyWithinViewport:o.width*o.height===x,fitsInViewportVertically:b===o.height,fitsInViewportHorizontally:p==o.width}}_canFitWithFlexibleDimensions(n,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,s=LS(this._overlayRef.getConfig().minHeight),a=LS(this._overlayRef.getConfig().minWidth),l=n.fitsInViewportVertically||s!=null&&s<=r,c=n.fitsInViewportHorizontally||a!=null&&a<=o;return l&&c}return  false}_pushOverlayOnScreen(n,e,i){if(this._previousPushAmount&&this._positionLocked)return {x:n.x+this._previousPushAmount.x,y:n.y+this._previousPushAmount.y};let r=jS(e),o=this._viewportRect,s=Math.max(n.x+r.width-o.width,0),a=Math.max(n.y+r.height-o.height,0),l=Math.max(o.top-i.top-n.y,0),c=Math.max(o.left-i.left-n.x,0),u=0,f=0;return r.width<=o.width?u=c||-s:u=n.x<this._getViewportMarginStart()?o.left-i.left-n.x:0,r.height<=o.height?f=l||-a:f=n.y<this._getViewportMarginTop()?o.top-i.top-n.y:0,this._previousPushAmount={x:u,y:f},{x:n.x+u,y:n.y+f}}_applyPosition(n,e){if(this._setTransformOrigin(n),this._setOverlayElementStyles(e,n),this._setBoundingBoxStyles(e,n),n.panelClass&&this._addPanelClasses(n.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(n!==this._lastPosition||!this._lastScrollVisibility||!UB(this._lastScrollVisibility,i)){let r=new Sm(n,i);this._positionChanges.next(r);}this._lastScrollVisibility=i;}this._lastPosition=n,this._isInitialRender=false;}_setTransformOrigin(n){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=n.overlayY;n.overlayX==="center"?i="center":this._isRtl()?i=n.overlayX==="start"?"right":"left":i=n.overlayX==="start"?"left":"right";for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`;}_calculateBoundingBoxRect(n,e){let i=this._viewportRect,r=this._isRtl(),o,s,a;if(e.overlayY==="top")s=n.y,o=i.height-s+this._getViewportMarginBottom();else if(e.overlayY==="bottom")a=i.height-n.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-a+this._getViewportMarginTop();else {let h=Math.min(i.bottom-n.y+i.top,n.y),p=this._lastBoundingBoxSize.height;o=h*2,s=n.y-h,o>p&&!this._isInitialRender&&!this._growAfterOpen&&(s=n.y-p/2);}let l=e.overlayX==="start"&&!r||e.overlayX==="end"&&r,c=e.overlayX==="end"&&!r||e.overlayX==="start"&&r,u,f,m;if(c)m=i.width-n.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),u=n.x-this._getViewportMarginStart();else if(l)f=n.x,u=i.right-n.x-this._getViewportMarginEnd();else {let h=Math.min(i.right-n.x+i.left,n.x),p=this._lastBoundingBoxSize.width;u=h*2,f=n.x-h,u>p&&!this._isInitialRender&&!this._growAfterOpen&&(f=n.x-p/2);}return {top:s,left:f,bottom:a,right:m,width:u,height:o}}_setBoundingBoxStyles(n,e){let i=this._calculateBoundingBoxRect(n,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left="0",r.bottom=r.right="auto",r.maxHeight=r.maxWidth="",r.width=r.height="100%";else {let o=this._overlayRef.getConfig().maxHeight,s=this._overlayRef.getConfig().maxWidth;r.width=et(i.width),r.height=et(i.height),r.top=et(i.top)||"auto",r.bottom=et(i.bottom)||"auto",r.left=et(i.left)||"auto",r.right=et(i.right)||"auto",e.overlayX==="center"?r.alignItems="center":r.alignItems=e.overlayX==="end"?"flex-end":"flex-start",e.overlayY==="center"?r.justifyContent="center":r.justifyContent=e.overlayY==="bottom"?"flex-end":"flex-start",o&&(r.maxHeight=et(o)),s&&(r.maxWidth=et(s));}this._lastBoundingBoxSize=i,$o(this._boundingBox.style,r);}_resetBoundingBoxStyles(){$o(this._boundingBox.style,{top:"0",left:"0",right:"0",bottom:"0",height:"",width:"",alignItems:"",justifyContent:""});}_resetOverlayElementStyles(){$o(this._pane.style,{top:"",left:"",bottom:"",right:"",position:"",transform:""});}_setOverlayElementStyles(n,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,s=this._overlayRef.getConfig();if(r){let u=this._viewportRuler.getViewportScrollPosition();$o(i,this._getExactOverlayY(e,n,u)),$o(i,this._getExactOverlayX(e,n,u));}else i.position="static";let a="",l=this._getOffset(e,"x"),c=this._getOffset(e,"y");l&&(a+=`translateX(${l}px) `),c&&(a+=`translateY(${c}px)`),i.transform=a.trim(),s.maxHeight&&(r?i.maxHeight=et(s.maxHeight):o&&(i.maxHeight="")),s.maxWidth&&(r?i.maxWidth=et(s.maxWidth):o&&(i.maxWidth="")),$o(this._pane.style,i);}_getExactOverlayY(n,e,i){let r={top:"",bottom:""},o=this._getOverlayPoint(e,this._overlayRect,n);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),n.overlayY==="bottom"){let s=this._document.documentElement.clientHeight;r.bottom=`${s-(o.y+this._overlayRect.height)}px`;}else r.top=et(o.y);return r}_getExactOverlayX(n,e,i){let r={left:"",right:""},o=this._getOverlayPoint(e,this._overlayRect,n);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let s;if(this._isRtl()?s=n.overlayX==="end"?"left":"right":s=n.overlayX==="end"?"right":"left",s==="right"){let a=this._document.documentElement.clientWidth;r.right=`${a-(o.x+this._overlayRect.width)}px`;}else r.left=et(o.x);return r}_getScrollVisibility(){let n=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return {isOriginClipped:NS(n,i),isOriginOutsideView:Iy(n,i),isOverlayClipped:NS(e,i),isOverlayOutsideView:Iy(e,i)}}_subtractOverflows(n,...e){return e.reduce((i,r)=>i-Math.max(r,0),n)}_getNarrowedViewportRect(){let n=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return {top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+n-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:n-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()==="rtl"}_hasExactPosition(){return !this._hasFlexibleDimensions||this._isPushed}_getOffset(n,e){return e==="x"?n.offsetX==null?this._offsetX:n.offsetX:n.offsetY==null?this._offsetY:n.offsetY}_validatePositions(){}_addPanelClasses(n){this._pane&&Js(n).forEach(e=>{e!==""&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e));});}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(n=>{this._pane.classList.remove(n);}),this._appliedPanelClasses=[]);}_getViewportMarginStart(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin=="number"?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let n=this._origin;if(n instanceof F)return n.nativeElement.getBoundingClientRect();if(n instanceof Element)return n.getBoundingClientRect();let e=n.width||0,i=n.height||0;return {top:n.y,bottom:n.y+i,left:n.x,right:n.x+e,height:i,width:e}}_getContainerRect(){let n=this._overlayRef.getConfig().usePopover&&this._popoverLocation!=="global",e=this._overlayContainer.getContainerElement();n&&(e.style.display="block");let i=e.getBoundingClientRect();return n&&(e.style.display=""),i}};function $o(t,n){for(let e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function LS(t){if(typeof t!="number"&&t!=null){let[n,e]=t.split(VB);return !e||e==="px"?parseFloat(n):null}return t||null}function jS(t){return {top:Math.floor(t.top),right:Math.floor(t.right),bottom:Math.floor(t.bottom),left:Math.floor(t.left),width:Math.floor(t.width),height:Math.floor(t.height)}}function UB(t,n){return t===n?true:t.isOriginClipped===n.isOriginClipped&&t.isOriginOutsideView===n.isOriginOutsideView&&t.isOverlayClipped===n.isOverlayClipped&&t.isOverlayOutsideView===n.isOverlayOutsideView}var BS="cdk-global-overlay-wrapper";function Sr(t){return new Mm}var Mm=class{_overlayRef;_cssPosition="static";_topOffset="";_bottomOffset="";_alignItems="";_xPosition="";_xOffset="";_width="";_height="";_isDisposed=false;attach(n){let e=n.getConfig();this._overlayRef=n,this._width&&!e.width&&n.updateSize({width:this._width}),this._height&&!e.height&&n.updateSize({height:this._height}),n.hostElement.classList.add(BS),this._isDisposed=false;}top(n=""){return this._bottomOffset="",this._topOffset=n,this._alignItems="flex-start",this}left(n=""){return this._xOffset=n,this._xPosition="left",this}bottom(n=""){return this._topOffset="",this._bottomOffset=n,this._alignItems="flex-end",this}right(n=""){return this._xOffset=n,this._xPosition="right",this}start(n=""){return this._xOffset=n,this._xPosition="start",this}end(n=""){return this._xOffset=n,this._xPosition="end",this}width(n=""){return this._overlayRef?this._overlayRef.updateSize({width:n}):this._width=n,this}height(n=""){return this._overlayRef?this._overlayRef.updateSize({height:n}):this._height=n,this}centerHorizontally(n=""){return this.left(n),this._xPosition="center",this}centerVertically(n=""){return this.top(n),this._alignItems="center",this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,i=this._overlayRef.getConfig(),{width:r,height:o,maxWidth:s,maxHeight:a}=i,l=(r==="100%"||r==="100vw")&&(!s||s==="100%"||s==="100vw"),c=(o==="100%"||o==="100vh")&&(!a||a==="100%"||a==="100vh"),u=this._xPosition,f=this._xOffset,m=this._overlayRef.getConfig().direction==="rtl",h="",p="",b="";l?b="flex-start":u==="center"?(b="center",m?p=f:h=f):m?u==="left"||u==="end"?(b="flex-end",h=f):(u==="right"||u==="start")&&(b="flex-start",p=f):u==="left"||u==="start"?(b="flex-start",h=f):(u==="right"||u==="end")&&(b="flex-end",p=f),n.position=this._cssPosition,n.marginLeft=l?"0":h,n.marginTop=c?"0":this._topOffset,n.marginBottom=this._bottomOffset,n.marginRight=l?"0":p,e.justifyContent=b,e.alignItems=c?"flex-start":this._alignItems;}dispose(){if(this._isDisposed||!this._overlayRef)return;let n=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(BS),i.justifyContent=i.alignItems=n.marginTop=n.marginBottom=n.marginLeft=n.marginRight=n.position="",this._overlayRef=null,this._isDisposed=true;}},WS=(()=>{class t{_injector=d(j);global(){return Sr()}flexibleConnectedTo(e){return Nc(this._injector,e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),Fc=new g("OVERLAY_DEFAULT_CONFIG");function Ui(t,n){t.get(yt).load(GS);let e=t.get(Tm),i=t.get(B),r=t.get(at),o=t.get(Vt),s=t.get(Ht),a=t.get(Oe,null,{optional:true})||t.get(it).createRenderer(null,null),l=new Vi(n),c=t.get(Fc,null,{optional:true})?.usePopover??true;l.direction=l.direction||s.value,"showPopover"in i.body?l.usePopover=n?.usePopover??c:l.usePopover=false;let u=i.createElement("div"),f=i.createElement("div");u.id=r.getId("cdk-overlay-"),u.classList.add("cdk-overlay-pane"),f.appendChild(u),l.usePopover&&(f.setAttribute("popover","manual"),f.classList.add("cdk-overlay-popover"));let m=l.usePopover?l.positionStrategy?.getPopoverInsertionPoint?.():null;return Ty(m)?m.after(f):m?.type==="parent"?m.element.appendChild(f):e.getContainerElement().appendChild(f),new ua(new Cm(u,o,t),f,u,l,t.get(O),t.get(zS),i,t.get(di),t.get($S),n?.disableAnimations??t.get(gl,null,{optional:true})==="NoopAnimations",t.get(Se),a)}var qS=(()=>{class t{scrollStrategies=d(US);_positionBuilder=d(WS);_injector=d(j);create(e){return Ui(this._injector,e)}position(){return this._positionBuilder}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),HB=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"}],zB=new g("cdk-connected-overlay-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(j);return ()=>Wo(t)}}),fa=(()=>{class t{elementRef=d(F);static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","cdk-overlay-origin",""],["","overlay-origin",""],["","cdkOverlayOrigin",""]],exportAs:["cdkOverlayOrigin"]})}return t})(),YS=new g("cdk-connected-overlay-default-config"),Am=(()=>{class t{_dir=d(Ht,{optional:true});_injector=d(j);_overlayRef;_templatePortal;_backdropSubscription=ae.EMPTY;_attachSubscription=ae.EMPTY;_detachSubscription=ae.EMPTY;_positionSubscription=ae.EMPTY;_offsetX;_offsetY;_position;_scrollStrategyFactory=d(zB);_ngZone=d(O);origin;positions;positionStrategy;get offsetX(){return this._offsetX}set offsetX(e){this._offsetX=e,this._position&&this._updatePositionStrategy(this._position);}get offsetY(){return this._offsetY}set offsetY(e){this._offsetY=e,this._position&&this._updatePositionStrategy(this._position);}width;height;minWidth;minHeight;backdropClass;panelClass;viewportMargin=0;scrollStrategy;open=false;disableClose=false;transformOriginSelector;hasBackdrop=false;lockPosition=false;flexibleDimensions=false;growAfterOpen=false;push=false;disposeOnNavigation=false;usePopover;matchWidth=false;set _config(e){typeof e!="string"&&this._assignConfig(e);}backdropClick=new K;positionChange=new K;attach=new K;detach=new K;overlayKeydown=new K;overlayOutsideClick=new K;constructor(){let e=d(Bt),i=d(kt),r=d(YS,{optional:true}),o=d(Fc,{optional:true});this.usePopover=o?.usePopover===false?null:"global",this._templatePortal=new Bi(e,i),this.scrollStrategy=this._scrollStrategyFactory(),r&&this._assignConfig(r);}get overlayRef(){return this._overlayRef}get dir(){return this._dir?this._dir.value:"ltr"}ngOnDestroy(){this._attachSubscription.unsubscribe(),this._detachSubscription.unsubscribe(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this._overlayRef?.dispose();}ngOnChanges(e){this._position&&(this._updatePositionStrategy(this._position),this._overlayRef?.updateSize({width:this._getWidth(),minWidth:this.minWidth,height:this.height,minHeight:this.minHeight}),e.origin&&this.open&&this._position.apply()),e.open&&(this.open?this.attachOverlay():this.detachOverlay());}_createOverlay(){(!this.positions||!this.positions.length)&&(this.positions=HB);let e=this._overlayRef=Ui(this._injector,this._buildConfig());this._attachSubscription=e.attachments().subscribe(()=>this.attach.emit()),this._detachSubscription=e.detachments().subscribe(()=>this.detach.emit()),e.keydownEvents().subscribe(i=>{this.overlayKeydown.next(i),i.keyCode===27&&!this.disableClose&&!Ft(i)&&(i.preventDefault(),this.detachOverlay());}),this._overlayRef.outsidePointerEvents().subscribe(i=>{let r=this._getOriginElement(),o=It(i);(!r||r!==o&&!r.contains(o))&&this.overlayOutsideClick.next(i);});}_buildConfig(){let e=this._position=this.positionStrategy||this._createPositionStrategy(),i=new Vi({direction:this._dir||"ltr",positionStrategy:e,scrollStrategy:this.scrollStrategy,hasBackdrop:this.hasBackdrop,disposeOnNavigation:this.disposeOnNavigation,usePopover:!!this.usePopover});return (this.height||this.height===0)&&(i.height=this.height),(this.minWidth||this.minWidth===0)&&(i.minWidth=this.minWidth),(this.minHeight||this.minHeight===0)&&(i.minHeight=this.minHeight),this.backdropClass&&(i.backdropClass=this.backdropClass),this.panelClass&&(i.panelClass=this.panelClass),i}_updatePositionStrategy(e){let i=this.positions.map(r=>({originX:r.originX,originY:r.originY,overlayX:r.overlayX,overlayY:r.overlayY,offsetX:r.offsetX||this.offsetX,offsetY:r.offsetY||this.offsetY,panelClass:r.panelClass||void 0}));return e.setOrigin(this._getOrigin()).withPositions(i).withFlexibleDimensions(this.flexibleDimensions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition).withTransformOriginOn(this.transformOriginSelector).withPopoverLocation(this.usePopover===null?"global":this.usePopover)}_createPositionStrategy(){let e=Nc(this._injector,this._getOrigin());return this._updatePositionStrategy(e),e}_getOrigin(){return this.origin instanceof fa?this.origin.elementRef:this.origin}_getOriginElement(){return this.origin instanceof fa?this.origin.elementRef.nativeElement:this.origin instanceof F?this.origin.nativeElement:typeof Element<"u"&&this.origin instanceof Element?this.origin:null}_getWidth(){return this.width?this.width:this.matchWidth?this._getOriginElement()?.getBoundingClientRect?.().width:void 0}attachOverlay(){this._overlayRef||this._createOverlay();let e=this._overlayRef;e.getConfig().hasBackdrop=this.hasBackdrop,e.updateSize({width:this._getWidth()}),e.hasAttached()||e.attach(this._templatePortal),this.hasBackdrop?this._backdropSubscription=e.backdropClick().subscribe(i=>this.backdropClick.emit(i)):this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.positionChange.observers.length>0&&(this._positionSubscription=this._position.positionChanges.pipe(zh(()=>this.positionChange.observers.length>0)).subscribe(i=>{this._ngZone.run(()=>this.positionChange.emit(i)),this.positionChange.observers.length===0&&this._positionSubscription.unsubscribe();})),this.open=true;}detachOverlay(){this._overlayRef?.detach(),this._backdropSubscription.unsubscribe(),this._positionSubscription.unsubscribe(),this.open=false;}_assignConfig(e){this.origin=e.origin??this.origin,this.positions=e.positions??this.positions,this.positionStrategy=e.positionStrategy??this.positionStrategy,this.offsetX=e.offsetX??this.offsetX,this.offsetY=e.offsetY??this.offsetY,this.width=e.width??this.width,this.height=e.height??this.height,this.minWidth=e.minWidth??this.minWidth,this.minHeight=e.minHeight??this.minHeight,this.backdropClass=e.backdropClass??this.backdropClass,this.panelClass=e.panelClass??this.panelClass,this.viewportMargin=e.viewportMargin??this.viewportMargin,this.scrollStrategy=e.scrollStrategy??this.scrollStrategy,this.disableClose=e.disableClose??this.disableClose,this.transformOriginSelector=e.transformOriginSelector??this.transformOriginSelector,this.hasBackdrop=e.hasBackdrop??this.hasBackdrop,this.lockPosition=e.lockPosition??this.lockPosition,this.flexibleDimensions=e.flexibleDimensions??this.flexibleDimensions,this.growAfterOpen=e.growAfterOpen??this.growAfterOpen,this.push=e.push??this.push,this.disposeOnNavigation=e.disposeOnNavigation??this.disposeOnNavigation,this.usePopover=e.usePopover??this.usePopover,this.matchWidth=e.matchWidth??this.matchWidth;}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","cdk-connected-overlay",""],["","connected-overlay",""],["","cdkConnectedOverlay",""]],inputs:{origin:[0,"cdkConnectedOverlayOrigin","origin"],positions:[0,"cdkConnectedOverlayPositions","positions"],positionStrategy:[0,"cdkConnectedOverlayPositionStrategy","positionStrategy"],offsetX:[0,"cdkConnectedOverlayOffsetX","offsetX"],offsetY:[0,"cdkConnectedOverlayOffsetY","offsetY"],width:[0,"cdkConnectedOverlayWidth","width"],height:[0,"cdkConnectedOverlayHeight","height"],minWidth:[0,"cdkConnectedOverlayMinWidth","minWidth"],minHeight:[0,"cdkConnectedOverlayMinHeight","minHeight"],backdropClass:[0,"cdkConnectedOverlayBackdropClass","backdropClass"],panelClass:[0,"cdkConnectedOverlayPanelClass","panelClass"],viewportMargin:[0,"cdkConnectedOverlayViewportMargin","viewportMargin"],scrollStrategy:[0,"cdkConnectedOverlayScrollStrategy","scrollStrategy"],open:[0,"cdkConnectedOverlayOpen","open"],disableClose:[0,"cdkConnectedOverlayDisableClose","disableClose"],transformOriginSelector:[0,"cdkConnectedOverlayTransformOriginOn","transformOriginSelector"],hasBackdrop:[2,"cdkConnectedOverlayHasBackdrop","hasBackdrop",de],lockPosition:[2,"cdkConnectedOverlayLockPosition","lockPosition",de],flexibleDimensions:[2,"cdkConnectedOverlayFlexibleDimensions","flexibleDimensions",de],growAfterOpen:[2,"cdkConnectedOverlayGrowAfterOpen","growAfterOpen",de],push:[2,"cdkConnectedOverlayPush","push",de],disposeOnNavigation:[2,"cdkConnectedOverlayDisposeOnNavigation","disposeOnNavigation",de],usePopover:[0,"cdkConnectedOverlayUsePopover","usePopover"],matchWidth:[2,"cdkConnectedOverlayMatchWidth","matchWidth",de],_config:[0,"cdkConnectedOverlay","_config"]},outputs:{backdropClick:"backdropClick",positionChange:"positionChange",attach:"attach",detach:"detach",overlayKeydown:"overlayKeydown",overlayOutsideClick:"overlayOutsideClick"},exportAs:["cdkConnectedOverlay"],features:[Ye]})}return t})(),mi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({providers:[qS],imports:[Ce,Er,oy,oy]})}return t})();function $B(t,n){if(t&1){let e=Rt();y(0,"div",1)(1,"button",2),ie("click",function(){gt(e);let r=z();return vt(r.action())}),N(2),w()();}if(t&2){let e=z();C(2),Je(" ",e.data.action," ");}}var GB=["label"];function WB(t,n){}var qB=Math.pow(2,31)-1,Pc=class{_overlayRef;instance;containerInstance;_afterDismissed=new _;_afterOpened=new _;_onAction=new _;_durationTimeoutId;_dismissedByAction=false;constructor(n,e){this._overlayRef=e,this.containerInstance=n,n._onExit.subscribe(()=>this._finishDismiss());}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId);}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=true,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId);}closeWithAction(){this.dismissWithAction();}_dismissAfter(n){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(n,qB));}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete());}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=false;}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}},ZS=new g("MatSnackBarData"),ha=class{politeness="polite";announcementMessage="";viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition="center";verticalPosition="bottom"},YB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matSnackBarLabel",""]],hostAttrs:[1,"mat-mdc-snack-bar-label","mdc-snackbar__label"]})}return t})(),ZB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matSnackBarActions",""]],hostAttrs:[1,"mat-mdc-snack-bar-actions","mdc-snackbar__actions"]})}return t})(),KB=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matSnackBarAction",""]],hostAttrs:[1,"mat-mdc-snack-bar-action","mdc-snackbar__action"]})}return t})(),QB=(()=>{class t{snackBarRef=d(Pc);data=d(ZS);action(){this.snackBarRef.dismissWithAction();}get hasAction(){return !!this.data.action}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["simple-snack-bar"]],hostAttrs:[1,"mat-mdc-simple-snack-bar"],exportAs:["matSnackBar"],decls:3,vars:2,consts:[["matSnackBarLabel",""],["matSnackBarActions",""],["matButton","","matSnackBarAction","",3,"click"]],template:function(i,r){i&1&&(y(0,"div",0),N(1),w(),Q(2,$B,3,1,"div",1)),i&2&&(C(),Je(" ",r.data.message,`
`),C(),X(r.hasAction?2:-1));},dependencies:[Cr,YB,ZB,KB],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})}return t})(),Ay="_mat-snack-bar-enter",ky="_mat-snack-bar-exit",XB=(()=>{class t extends Dr{_ngZone=d(O);_elementRef=d(F);_changeDetectorRef=d(Ge);_platform=d(he);_animationsDisabled=We();snackBarConfig=d(ha);_document=d(B);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=d(j);_announceDelay=150;_announceTimeoutId;_destroyed=false;_portalOutlet;_onAnnounce=new _;_onExit=new _;_onEnter=new _;_animationState="void";_live;_label;_role;_liveElementId=d(at).getId("mat-snack-bar-container-live-");constructor(){super();let e=this.snackBarConfig;e.politeness==="assertive"&&!e.announcementMessage?this._live="assertive":e.politeness==="off"?this._live="off":this._live="polite",this._platform.FIREFOX&&(this._live==="polite"&&(this._role="status"),this._live==="assertive"&&(this._role="alert"));}attachComponentPortal(e){this._assertNotAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),i}attachTemplatePortal(e){this._assertNotAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),i}attachDomPortal=e=>{this._assertNotAttached();let i=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),i};onAnimationEnd(e){e===ky?this._completeExit():e===Ay&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete();}));}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?rt(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Ay)));},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-snack-bar-fallback-visible"),this.onAnimationEnd(Ay);},200)));}exit(){return this._destroyed?R(void 0):(this._ngZone.run(()=>{this._animationState="hidden",this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute("mat-exit",""),clearTimeout(this._announceTimeoutId),this._animationsDisabled?rt(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(ky)));},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(ky),200));}),this._onExit)}ngOnDestroy(){this._destroyed=true,this._clearFromModals(),this._completeExit();}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete();});}_afterPortalAttached(){let e=this._elementRef.nativeElement,i=this.snackBarConfig.panelClass;i&&(Array.isArray(i)?i.forEach(s=>e.classList.add(s)):e.classList.add(i)),this._exposeToModals();let r=this._label.nativeElement,o="mdc-snackbar__label";r.classList.toggle(o,!r.querySelector(`.${o}`));}_exposeToModals(){let e=this._liveElementId,i=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let r=0;r<i.length;r++){let o=i[r],s=o.getAttribute("aria-owns");this._trackedModals.add(o),s?s.indexOf(e)===-1&&o.setAttribute("aria-owns",s+" "+e):o.setAttribute("aria-owns",e);}}_clearFromModals(){this._trackedModals.forEach(e=>{let i=e.getAttribute("aria-owns");if(i){let r=i.replace(this._liveElementId,"").trim();r.length>0?e.setAttribute("aria-owns",r):e.removeAttribute("aria-owns");}}),this._trackedModals.clear();}_assertNotAttached(){this._portalOutlet.hasAttached();}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,i=e.querySelector("[aria-hidden]"),r=e.querySelector("[aria-live]");if(i&&r){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&i.contains(document.activeElement)&&(o=document.activeElement),i.removeAttribute("aria-hidden"),r.appendChild(i),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete();}},this._announceDelay);});}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-snack-bar-container"]],viewQuery:function(i,r){if(i&1&&$e(xr,7)(GB,7),i&2){let o;ee(o=te())&&(r._portalOutlet=o.first),ee(o=te())&&(r._label=o.first);}},hostAttrs:[1,"mdc-snackbar","mat-mdc-snack-bar-container"],hostVars:6,hostBindings:function(i,r){i&1&&ie("animationend",function(s){return r.onAnimationEnd(s.animationName)})("animationcancel",function(s){return r.onAnimationEnd(s.animationName)}),i&2&&$$1("mat-snack-bar-container-enter",r._animationState==="visible")("mat-snack-bar-container-exit",r._animationState==="hidden")("mat-snack-bar-container-animations-enabled",!r._animationsDisabled);},features:[ge],decls:6,vars:3,consts:[["label",""],[1,"mdc-snackbar__surface","mat-mdc-snackbar-surface"],[1,"mat-mdc-snack-bar-label"],["aria-hidden","true"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(y(0,"div",1)(1,"div",2,0)(3,"div",3),Et(4,WB,0,0,"ng-template",4),w(),be(5,"div"),w()()),i&2&&(C(5),ce("aria-live",r._live)("role",r._role)("id",r._liveElementId));},dependencies:[xr],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--mat-snack-bar-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-snack-bar-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-snack-bar-container-color, var(--mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--mat-snack-bar-supporting-text-font, var(--mat-sys-body-medium-font));
  font-size: var(--mat-snack-bar-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-snack-bar-supporting-text-weight, var(--mat-sys-body-medium-weight));
  line-height: var(--mat-snack-bar-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--mat-snack-bar-button-color, var(--mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --mat-button-text-state-layer-color: currentColor;
  --mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})}return t})(),JB=new g("mat-snack-bar-default-options",{providedIn:"root",factory:()=>new ha}),Ir=(()=>{class t{_live=d(xc);_injector=d(j);_breakpointObserver=d(_c);_parentSnackBar=d(t,{optional:true,skipSelf:true});_defaultConfig=d(JB);_animationsDisabled=We();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=QB;snackBarContainerComponent=XB;handsetCssClass="mat-mdc-snack-bar-handset";get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e;}openFromComponent(e,i){return this._attach(e,i)}openFromTemplate(e,i){return this._attach(e,i)}open(e,i="",r){let o=v(v({},this._defaultConfig),r);return o.data={message:e,action:i},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss();}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss();}_attachSnackBarContainer(e,i){let r=i&&i.viewContainerRef&&i.viewContainerRef.injector,o=j.create({parent:r||this._injector,providers:[{provide:ha,useValue:i}]}),s=new Wn(this.snackBarContainerComponent,i.viewContainerRef,o),a=e.attach(s);return a.instance.snackBarConfig=i,a.instance}_attach(e,i){let r=v(v(v({},new ha),this._defaultConfig),i),o=this._createOverlay(r),s=this._attachSnackBarContainer(o,r),a=new Pc(s,o);if(e instanceof Bt){let l=new Bi(e,null,{$implicit:r.data,snackBarRef:a});a.instance=s.attachTemplatePortal(l);}else {let l=this._createInjector(r,a),c=new Wn(e,void 0,l),u=s.attachComponentPortal(c);a.instance=u.instance;}return this._breakpointObserver.observe(jE.HandsetPortrait).pipe(A(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches);}),r.announcementMessage&&s._onAnnounce.subscribe(()=>{this._live.announce(r.announcementMessage,r.politeness);}),this._animateSnackBar(a,r),this._openedSnackBarRef=a,this._openedSnackBarRef}_animateSnackBar(e,i){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),i.announcementMessage&&this._live.clear();}),i.duration&&i.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(i.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter();}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter();}_createOverlay(e){let i=new Vi;i.direction=e.direction;let r=Sr(this._injector),o=e.direction==="rtl",s=e.horizontalPosition==="left"||e.horizontalPosition==="start"&&!o||e.horizontalPosition==="end"&&o,a=!s&&e.horizontalPosition!=="center";return s?r.left("0"):a?r.right("0"):r.centerHorizontally(),e.verticalPosition==="top"?r.top("0"):r.bottom("0"),i.positionStrategy=r,i.disableAnimations=this._animationsDisabled,Ui(this._injector,i)}_createInjector(e,i){let r=e&&e.viewContainerRef&&e.viewContainerRef.injector;return j.create({parent:r||this._injector,providers:[{provide:Pc,useValue:i},{provide:ZS,useValue:e.data}]})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function eV(){this.__data__=[],this.size=0;}var KS=eV;function tV(t,n){return t===n||t!==t&&n!==n}var pa=tV;function nV(t,n){for(var e=t.length;e--;)if(pa(t[e][0],n))return e;return  -1}var Mr=nV;var iV=Array.prototype,rV=iV.splice;function oV(t){var n=this.__data__,e=Mr(n,t);if(e<0)return  false;var i=n.length-1;return e==i?n.pop():rV.call(n,e,1),--this.size,true}var QS=oV;function sV(t){var n=this.__data__,e=Mr(n,t);return e<0?void 0:n[e][1]}var XS=sV;function aV(t){return Mr(this.__data__,t)>-1}var JS=aV;function lV(t,n){var e=this.__data__,i=Mr(e,t);return i<0?(++this.size,e.push([t,n])):e[i][1]=n,this}var eI=lV;function ga(t){var n=-1,e=t==null?0:t.length;for(this.clear();++n<e;){var i=t[n];this.set(i[0],i[1]);}}ga.prototype.clear=KS;ga.prototype.delete=QS;ga.prototype.get=XS;ga.prototype.has=JS;ga.prototype.set=eI;var Tr=ga;function cV(){this.__data__=new Tr,this.size=0;}var tI=cV;function dV(t){var n=this.__data__,e=n.delete(t);return this.size=n.size,e}var nI=dV;function uV(t){return this.__data__.get(t)}var iI=uV;function fV(t){return this.__data__.has(t)}var rI=fV;var mV=typeof global=="object"&&global&&global.Object===Object&&global,km=mV;var hV=typeof self=="object"&&self&&self.Object===Object&&self,pV=km||hV||Function("return this")(),lt=pV;var gV=lt.Symbol,Dn=gV;var oI=Object.prototype,vV=oI.hasOwnProperty,_V=oI.toString,Lc=Dn?Dn.toStringTag:void 0;function yV(t){var n=vV.call(t,Lc),e=t[Lc];try{t[Lc]=void 0;var i=!0;}catch{}var r=_V.call(t);return i&&(n?t[Lc]=e:delete t[Lc]),r}var sI=yV;var bV=Object.prototype,wV=bV.toString;function CV(t){return wV.call(t)}var aI=CV;var DV="[object Null]",xV="[object Undefined]",lI=Dn?Dn.toStringTag:void 0;function EV(t){return t==null?t===void 0?xV:DV:lI&&lI in Object(t)?sI(t):aI(t)}var Hi=EV;function SV(t){var n=typeof t;return t!=null&&(n=="object"||n=="function")}var hi=SV;var IV="[object AsyncFunction]",MV="[object Function]",TV="[object GeneratorFunction]",AV="[object Proxy]";function kV(t){if(!hi(t))return  false;var n=Hi(t);return n==MV||n==TV||n==IV||n==AV}var Rm=kV;var RV=lt["__core-js_shared__"],Om=RV;var cI=(function(){var t=/[^.]+$/.exec(Om&&Om.keys&&Om.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""})();function OV(t){return !!cI&&cI in t}var dI=OV;var NV=Function.prototype,FV=NV.toString;function PV(t){if(t!=null){try{return FV.call(t)}catch{}try{return t+""}catch{}}return ""}var zi=PV;var LV=/[\\^$.*+?()[\]{}|]/g,jV=/^\[object .+?Constructor\]$/,BV=Function.prototype,VV=Object.prototype,UV=BV.toString,HV=VV.hasOwnProperty,zV=RegExp("^"+UV.call(HV).replace(LV,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function $V(t){if(!hi(t)||dI(t))return  false;var n=Rm(t)?zV:jV;return n.test(zi(t))}var uI=$V;function GV(t,n){return t?.[n]}var fI=GV;function WV(t,n){var e=fI(t,n);return uI(e)?e:void 0}var Yt=WV;var qV=Yt(lt,"Map"),Ar=qV;var YV=Yt(Object,"create"),$i=YV;function ZV(){this.__data__=$i?$i(null):{},this.size=0;}var mI=ZV;function KV(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n}var hI=KV;var QV="__lodash_hash_undefined__",XV=Object.prototype,JV=XV.hasOwnProperty;function e2(t){var n=this.__data__;if($i){var e=n[t];return e===QV?void 0:e}return JV.call(n,t)?n[t]:void 0}var pI=e2;var t2=Object.prototype,n2=t2.hasOwnProperty;function i2(t){var n=this.__data__;return $i?n[t]!==void 0:n2.call(n,t)}var gI=i2;var r2="__lodash_hash_undefined__";function o2(t,n){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=$i&&n===void 0?r2:n,this}var vI=o2;function va(t){var n=-1,e=t==null?0:t.length;for(this.clear();++n<e;){var i=t[n];this.set(i[0],i[1]);}}va.prototype.clear=mI;va.prototype.delete=hI;va.prototype.get=pI;va.prototype.has=gI;va.prototype.set=vI;var Ry=va;function s2(){this.size=0,this.__data__={hash:new Ry,map:new(Ar||Tr),string:new Ry};}var _I=s2;function a2(t){var n=typeof t;return n=="string"||n=="number"||n=="symbol"||n=="boolean"?t!=="__proto__":t===null}var yI=a2;function l2(t,n){var e=t.__data__;return yI(n)?e[typeof n=="string"?"string":"hash"]:e.map}var kr=l2;function c2(t){var n=kr(this,t).delete(t);return this.size-=n?1:0,n}var bI=c2;function d2(t){return kr(this,t).get(t)}var wI=d2;function u2(t){return kr(this,t).has(t)}var CI=u2;function f2(t,n){var e=kr(this,t),i=e.size;return e.set(t,n),this.size+=e.size==i?0:1,this}var DI=f2;function _a(t){var n=-1,e=t==null?0:t.length;for(this.clear();++n<e;){var i=t[n];this.set(i[0],i[1]);}}_a.prototype.clear=_I;_a.prototype.delete=bI;_a.prototype.get=wI;_a.prototype.has=CI;_a.prototype.set=DI;var Nm=_a;var m2=200;function h2(t,n){var e=this.__data__;if(e instanceof Tr){var i=e.__data__;if(!Ar||i.length<m2-1)return i.push([t,n]),this.size=++e.size,this;e=this.__data__=new Nm(i);}return e.set(t,n),this.size=e.size,this}var xI=h2;function ya(t){var n=this.__data__=new Tr(t);this.size=n.size;}ya.prototype.clear=tI;ya.prototype.delete=nI;ya.prototype.get=iI;ya.prototype.has=rI;ya.prototype.set=xI;var ba=ya;function p2(t,n){for(var e=-1,i=t==null?0:t.length;++e<i&&n(t[e],e,t)!==false;);return t}var EI=p2;var g2=(function(){try{var t=Yt(Object,"defineProperty");return t({},"",{}),t}catch{}})(),Oy=g2;function v2(t,n,e){n=="__proto__"&&Oy?Oy(t,n,{configurable:true,enumerable:true,value:e,writable:true}):t[n]=e;}var Fm=v2;var _2=Object.prototype,y2=_2.hasOwnProperty;function b2(t,n,e){var i=t[n];(!(y2.call(t,n)&&pa(i,e))||e===void 0&&!(n in t))&&Fm(t,n,e);}var Pm=b2;function w2(t,n,e,i){var r=!e;e||(e={});for(var o=-1,s=n.length;++o<s;){var a=n[o],l=i?i(e[a],t[a],a,e,t):void 0;l===void 0&&(l=t[a]),r?Fm(e,a,l):Pm(e,a,l);}return e}var Rr=w2;function C2(t,n){for(var e=-1,i=Array(t);++e<t;)i[e]=n(e);return i}var SI=C2;function D2(t){return t!=null&&typeof t=="object"}var rn=D2;var x2="[object Arguments]";function E2(t){return rn(t)&&Hi(t)==x2}var Ny=E2;var II=Object.prototype,S2=II.hasOwnProperty,I2=II.propertyIsEnumerable,M2=Ny((function(){return arguments})())?Ny:function(t){return rn(t)&&S2.call(t,"callee")&&!I2.call(t,"callee")},MI=M2;var T2=Array.isArray,Gi=T2;function A2(){return  false}var TI=A2;var RI=typeof exports=="object"&&exports&&!exports.nodeType&&exports,AI=RI&&typeof module=="object"&&module&&!module.nodeType&&module,k2=AI&&AI.exports===RI,kI=k2?lt.Buffer:void 0,R2=kI?kI.isBuffer:void 0,O2=R2||TI,qo=O2;var N2=9007199254740991,F2=/^(?:0|[1-9]\d*)$/;function P2(t,n){var e=typeof t;return n=n??N2,!!n&&(e=="number"||e!="symbol"&&F2.test(t))&&t>-1&&t%1==0&&t<n}var OI=P2;var L2=9007199254740991;function j2(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=L2}var Lm=j2;var B2="[object Arguments]",V2="[object Array]",U2="[object Boolean]",H2="[object Date]",z2="[object Error]",$2="[object Function]",G2="[object Map]",W2="[object Number]",q2="[object Object]",Y2="[object RegExp]",Z2="[object Set]",K2="[object String]",Q2="[object WeakMap]",X2="[object ArrayBuffer]",J2="[object DataView]",eU="[object Float32Array]",tU="[object Float64Array]",nU="[object Int8Array]",iU="[object Int16Array]",rU="[object Int32Array]",oU="[object Uint8Array]",sU="[object Uint8ClampedArray]",aU="[object Uint16Array]",lU="[object Uint32Array]",Ue={};Ue[eU]=Ue[tU]=Ue[nU]=Ue[iU]=Ue[rU]=Ue[oU]=Ue[sU]=Ue[aU]=Ue[lU]=true;Ue[B2]=Ue[V2]=Ue[X2]=Ue[U2]=Ue[J2]=Ue[H2]=Ue[z2]=Ue[$2]=Ue[G2]=Ue[W2]=Ue[q2]=Ue[Y2]=Ue[Z2]=Ue[K2]=Ue[Q2]=false;function cU(t){return rn(t)&&Lm(t.length)&&!!Ue[Hi(t)]}var NI=cU;function dU(t){return function(n){return t(n)}}var wa=dU;var FI=typeof exports=="object"&&exports&&!exports.nodeType&&exports,jc=FI&&typeof module=="object"&&module&&!module.nodeType&&module,uU=jc&&jc.exports===FI,Fy=uU&&km.process,fU=(function(){try{var t=jc&&jc.require&&jc.require("util").types;return t||Fy&&Fy.binding&&Fy.binding("util")}catch{}})(),Wi=fU;var PI=Wi&&Wi.isTypedArray,mU=PI?wa(PI):NI,jm=mU;var hU=Object.prototype,pU=hU.hasOwnProperty;function gU(t,n){var e=Gi(t),i=!e&&MI(t),r=!e&&!i&&qo(t),o=!e&&!i&&!r&&jm(t),s=e||i||r||o,a=s?SI(t.length,String):[],l=a.length;for(var c in t)(n||pU.call(t,c))&&!(s&&(c=="length"||r&&(c=="offset"||c=="parent")||o&&(c=="buffer"||c=="byteLength"||c=="byteOffset")||OI(c,l)))&&a.push(c);return a}var Bm=gU;var vU=Object.prototype;function _U(t){var n=t&&t.constructor,e=typeof n=="function"&&n.prototype||vU;return t===e}var Ca=_U;function yU(t,n){return function(e){return t(n(e))}}var Vm=yU;var bU=Vm(Object.keys,Object),LI=bU;var wU=Object.prototype,CU=wU.hasOwnProperty;function DU(t){if(!Ca(t))return LI(t);var n=[];for(var e in Object(t))CU.call(t,e)&&e!="constructor"&&n.push(e);return n}var jI=DU;function xU(t){return t!=null&&Lm(t.length)&&!Rm(t)}var Um=xU;function EU(t){return Um(t)?Bm(t):jI(t)}var Da=EU;function SU(t,n){return t&&Rr(n,Da(n),t)}var BI=SU;function IU(t){var n=[];if(t!=null)for(var e in Object(t))n.push(e);return n}var VI=IU;var MU=Object.prototype,TU=MU.hasOwnProperty;function AU(t){if(!hi(t))return VI(t);var n=Ca(t),e=[];for(var i in t)i=="constructor"&&(n||!TU.call(t,i))||e.push(i);return e}var UI=AU;function kU(t){return Um(t)?Bm(t,true):UI(t)}var xa=kU;function RU(t,n){return t&&Rr(n,xa(n),t)}var HI=RU;var WI=typeof exports=="object"&&exports&&!exports.nodeType&&exports,zI=WI&&typeof module=="object"&&module&&!module.nodeType&&module,OU=zI&&zI.exports===WI,$I=OU?lt.Buffer:void 0,GI=$I?$I.allocUnsafe:void 0;function NU(t,n){if(n)return t.slice();var e=t.length,i=GI?GI(e):new t.constructor(e);return t.copy(i),i}var qI=NU;function FU(t,n){var e=-1,i=t.length;for(n||(n=Array(i));++e<i;)n[e]=t[e];return n}var YI=FU;function PU(t,n){for(var e=-1,i=t==null?0:t.length,r=0,o=[];++e<i;){var s=t[e];n(s,e,t)&&(o[r++]=s);}return o}var ZI=PU;function LU(){return []}var Hm=LU;var jU=Object.prototype,BU=jU.propertyIsEnumerable,KI=Object.getOwnPropertySymbols,VU=KI?function(t){return t==null?[]:(t=Object(t),ZI(KI(t),function(n){return BU.call(t,n)}))}:Hm,Ea=VU;function UU(t,n){return Rr(t,Ea(t),n)}var QI=UU;function HU(t,n){for(var e=-1,i=n.length,r=t.length;++e<i;)t[r+e]=n[e];return t}var zm=HU;var zU=Vm(Object.getPrototypeOf,Object),$m=zU;var $U=Object.getOwnPropertySymbols,GU=$U?function(t){for(var n=[];t;)zm(n,Ea(t)),t=$m(t);return n}:Hm,Gm=GU;function WU(t,n){return Rr(t,Gm(t),n)}var XI=WU;function qU(t,n,e){var i=n(t);return Gi(t)?i:zm(i,e(t))}var Wm=qU;function YU(t){return Wm(t,Da,Ea)}var Bc=YU;function ZU(t){return Wm(t,xa,Gm)}var JI=ZU;var KU=Yt(lt,"DataView"),qm=KU;var QU=Yt(lt,"Promise"),Ym=QU;var XU=Yt(lt,"Set"),Zm=XU;var JU=Yt(lt,"WeakMap"),Km=JU;var eM="[object Map]",eH="[object Object]",tM="[object Promise]",nM="[object Set]",iM="[object WeakMap]",rM="[object DataView]",tH=zi(qm),nH=zi(Ar),iH=zi(Ym),rH=zi(Zm),oH=zi(Km),Yo=Hi;(qm&&Yo(new qm(new ArrayBuffer(1)))!=rM||Ar&&Yo(new Ar)!=eM||Ym&&Yo(Ym.resolve())!=tM||Zm&&Yo(new Zm)!=nM||Km&&Yo(new Km)!=iM)&&(Yo=function(t){var n=Hi(t),e=n==eH?t.constructor:void 0,i=e?zi(e):"";if(i)switch(i){case tH:return rM;case nH:return eM;case iH:return tM;case rH:return nM;case oH:return iM}return n});var qi=Yo;var sH=Object.prototype,aH=sH.hasOwnProperty;function lH(t){var n=t.length,e=new t.constructor(n);return n&&typeof t[0]=="string"&&aH.call(t,"index")&&(e.index=t.index,e.input=t.input),e}var oM=lH;var cH=lt.Uint8Array,Sa=cH;function dH(t){var n=new t.constructor(t.byteLength);return new Sa(n).set(new Sa(t)),n}var Ia=dH;function uH(t,n){var e=n?Ia(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}var sM=uH;var fH=/\w*$/;function mH(t){var n=new t.constructor(t.source,fH.exec(t));return n.lastIndex=t.lastIndex,n}var aM=mH;var lM=Dn?Dn.prototype:void 0,cM=lM?lM.valueOf:void 0;function hH(t){return cM?Object(cM.call(t)):{}}var dM=hH;function pH(t,n){var e=n?Ia(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}var uM=pH;var gH="[object Boolean]",vH="[object Date]",_H="[object Map]",yH="[object Number]",bH="[object RegExp]",wH="[object Set]",CH="[object String]",DH="[object Symbol]",xH="[object ArrayBuffer]",EH="[object DataView]",SH="[object Float32Array]",IH="[object Float64Array]",MH="[object Int8Array]",TH="[object Int16Array]",AH="[object Int32Array]",kH="[object Uint8Array]",RH="[object Uint8ClampedArray]",OH="[object Uint16Array]",NH="[object Uint32Array]";function FH(t,n,e){var i=t.constructor;switch(n){case xH:return Ia(t);case gH:case vH:return new i(+t);case EH:return sM(t,e);case SH:case IH:case MH:case TH:case AH:case kH:case RH:case OH:case NH:return uM(t,e);case _H:return new i;case yH:case CH:return new i(t);case bH:return aM(t);case wH:return new i;case DH:return dM(t)}}var fM=FH;var mM=Object.create,PH=(function(){function t(){}return function(n){if(!hi(n))return {};if(mM)return mM(n);t.prototype=n;var e=new t;return t.prototype=void 0,e}})(),hM=PH;function LH(t){return typeof t.constructor=="function"&&!Ca(t)?hM($m(t)):{}}var pM=LH;var jH="[object Map]";function BH(t){return rn(t)&&qi(t)==jH}var gM=BH;var vM=Wi&&Wi.isMap,VH=vM?wa(vM):gM,_M=VH;var UH="[object Set]";function HH(t){return rn(t)&&qi(t)==UH}var yM=HH;var bM=Wi&&Wi.isSet,zH=bM?wa(bM):yM,wM=zH;var $H=1,GH=2,WH=4,CM="[object Arguments]",qH="[object Array]",YH="[object Boolean]",ZH="[object Date]",KH="[object Error]",DM="[object Function]",QH="[object GeneratorFunction]",XH="[object Map]",JH="[object Number]",xM="[object Object]",ez="[object RegExp]",tz="[object Set]",nz="[object String]",iz="[object Symbol]",rz="[object WeakMap]",oz="[object ArrayBuffer]",sz="[object DataView]",az="[object Float32Array]",lz="[object Float64Array]",cz="[object Int8Array]",dz="[object Int16Array]",uz="[object Int32Array]",fz="[object Uint8Array]",mz="[object Uint8ClampedArray]",hz="[object Uint16Array]",pz="[object Uint32Array]",Le={};Le[CM]=Le[qH]=Le[oz]=Le[sz]=Le[YH]=Le[ZH]=Le[az]=Le[lz]=Le[cz]=Le[dz]=Le[uz]=Le[XH]=Le[JH]=Le[xM]=Le[ez]=Le[tz]=Le[nz]=Le[iz]=Le[fz]=Le[mz]=Le[hz]=Le[pz]=true;Le[KH]=Le[DM]=Le[rz]=false;function Qm(t,n,e,i,r,o){var s,a=n&$H,l=n&GH,c=n&WH;if(e&&(s=r?e(t,i,r,o):e(t)),s!==void 0)return s;if(!hi(t))return t;var u=Gi(t);if(u){if(s=oM(t),!a)return YI(t,s)}else {var f=qi(t),m=f==DM||f==QH;if(qo(t))return qI(t,a);if(f==xM||f==CM||m&&!r){if(s=l||m?{}:pM(t),!a)return l?XI(t,HI(s,t)):QI(t,BI(s,t))}else {if(!Le[f])return r?t:{};s=fM(t,f,a);}}o||(o=new ba);var h=o.get(t);if(h)return h;o.set(t,s),wM(t)?t.forEach(function(x){s.add(Qm(x,n,e,x,t,o));}):_M(t)&&t.forEach(function(x,P){s.set(P,Qm(x,n,e,P,t,o));});var p=c?l?JI:Bc:l?xa:Da,b=u?void 0:p(t);return EI(b||t,function(x,P){b&&(P=x,x=t[P]),Pm(s,P,Qm(x,n,e,P,t,o));}),s}var EM=Qm;var gz=1,vz=4;function _z(t){return EM(t,gz|vz)}var on=_z;var Ma=(()=>{class t{_serverDelay=0;serverDelay(e,i){return new Z(r=>{let o=setTimeout(()=>{try{let s=e();r.next(s),r.complete();}catch(s){r.error(s);}},i||this._serverDelay);return ()=>clearTimeout(o)})}filterGames(e,i){return e.filter(r=>{let o=i.filter(s=>{if(!Object.hasOwn(r,s.field))return  false;switch(s.operator){case "like":{let a=s.value,l=r[s.field];if(typeof l=="string"&&typeof a=="string")return l.toLocaleLowerCase().includes(a.toLocaleLowerCase());throw new Error('Operator "like" error: invalid types')}case "eq":{let a=s.value,l=r[s.field];if(typeof a=="string"&&Array.isArray(l))return l.includes(a);throw new Error('Operator "eq" error: invalid types')}}return  false});return i.length&&o.length===i.length})}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Py={redirectUri:"https://oauth.yandex.ru/verification_code",authUrl:"https://oauth.yandex.ru/authorize"},pt={diskUrl:"https://cloud-api.yandex.net/v1/disk/",folderPath:"my_game_db",emptyFileContent:"EMPTY_FILE"},ue=(function(t){return t.GAMES="db_games.json",t.GAMES_GROUPS="db_games_groups.json",t.PLATFORMS="db_platforms.json",t.GAMING_ACCOUNTS="db_gaming_accounts.json",t})(ue||{});var Or=(()=>{class t{http=d(Mo);useFake=false;_keyLsToken="yandex_token";_keyLsCliendId="client_id";getAuthUrl(e){if(e){let i=new URLSearchParams({response_type:"token",client_id:e,redirect_uri:Py.redirectUri});return `${Py.authUrl}?${i.toString()}`}throw new Error("Error create url")}openWindowToken(e){window.open(this.getAuthUrl(e));}logout(){this.clearCliendId(),this.clearToken();}isAuthorized(){return this.hasToken()&&this.hasCliendId()}hasToken(){return !!localStorage.getItem(this._keyLsToken)}getToken(){return localStorage.getItem(this._keyLsToken)}saveToken(e){localStorage.setItem(this._keyLsToken,e);}clearToken(){localStorage.removeItem(this._keyLsToken);}hasCliendId(){return !!localStorage.getItem(this._keyLsCliendId)}getCliendId(){return localStorage.getItem(this._keyLsCliendId)}saveCliendId(e){localStorage.setItem(this._keyLsCliendId,e);}clearCliendId(){localStorage.removeItem(this._keyLsCliendId);}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Zt=(function(t){return t.LOCAL="local",t.STEAM="steam",t.EPIC="epic",t.UBISOFT="ubisoft",t.GOG="gog",t.ROCKSTAR="rockstar",t.BATTLE="battle",t.ARC="arc",t.EA="electronicarts",t.BETHESDA="bethesda",t.VKPLAY="vkplay",t})(Zt||{}),xn=(function(t){return t.LOCAL="/assets/platforms_logo/Users.ico",t.STEAM="/assets/platforms_logo/Steam.ico",t.EPIC="/assets/platforms_logo/epic_games.svg",t.UBISOFT="/assets/platforms_logo/ubisoft.png",t.GOG="/assets/platforms_logo/gog_galaxy.svg",t.ROCKSTAR="/assets/platforms_logo/rockstar.svg",t.BATTLE="/assets/platforms_logo/Battlenet.ico",t.ARC="/assets/platforms_logo/arc.png",t.EA="/assets/platforms_logo/Electronic_Arts.png",t.BETHESDA="/assets/platforms_logo/bethesda.jpg",t.VKPLAY="/assets/platforms_logo/vkplay.png",t.EMPTY="/assets/alternative_logo.png",t})(xn||{}),Xm=[{id:"0",name:"Local",logo:xn.LOCAL,type:Zt.LOCAL},{id:"1",name:"Steam",logo:xn.STEAM,type:Zt.STEAM},{id:"2",name:"Epic Games",logo:xn.EPIC,type:Zt.EPIC},{id:"3",name:"Ubisoft",logo:xn.UBISOFT,type:Zt.UBISOFT},{id:"4",name:"GOG Galaxy",logo:xn.GOG,type:Zt.GOG},{id:"5",name:"Rockstar Games",logo:xn.ROCKSTAR,type:Zt.ROCKSTAR},{id:"6",name:"Battle.net",logo:xn.BATTLE,type:Zt.BATTLE},{id:"7",name:"Arc",logo:xn.ARC,type:Zt.ARC},{id:"8",name:"Electronic Arts",logo:xn.EA,type:Zt.EA},{id:"9",name:"Bethesda.net",logo:xn.BETHESDA,type:Zt.BETHESDA},{id:"11",name:"VK Play",logo:xn.VKPLAY,type:Zt.VKPLAY}];var Ta=(()=>{class t{generateFile(e,i={}){let{filename:r="data.json",format:o="json",mimeType:s=o==="json"?"application/json":"text/csv"}=i,a;if(e.length||(e=pt.emptyFileContent),o==="json")a=JSON.stringify(e,null,4);else throw new Error('Unsupported format. Use "json" or "csv"');return new File([a],r,{type:s})}downloadFile(e){let i=URL.createObjectURL(e),r=document.createElement("a");r.href=i,r.download=e.name,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i);}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Aa=(function(t){return t.FOLDER="resources",t.UPLOAD="resources/upload",t.DOWNLOAD="resources/download",t})(Aa||{}),Vc=(()=>{class t{_http=d(Mo);_authService=d(Or);_destroy$=new _;_snackBar=d(Ir);ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}uploadFile(e,i,r){let o=`${pt.diskUrl}${Aa.UPLOAD}`,s={headers:this._createAuthHeaders(r),params:{path:this._getPathFile(i),overwrite:true}};return this._http.get(o,s).pipe(A(this._destroy$),xe(a=>{let l=a.href;return this._http.put(l,e,{headers:new yn({"Content-Type":e.type})}).pipe(T$1(()=>true))}),je(a=>(this._error(a),sn(()=>a))))}downloadFile(e,i){let r=`${pt.diskUrl}${Aa.DOWNLOAD}`,o={headers:this._createAuthHeaders(i),params:{path:this._getPathFile(e)}};return this._http.get(r,o).pipe(A(this._destroy$),T$1(s=>s.href),xe(s=>this._http.get(s,{responseType:"text"})),T$1(s=>{try{let a=JSON.parse(s);return a===pt.emptyFileContent&&(a=[]),{status:!0,jsonData:a}}catch(a){return console.error(a),this._snackBar.open(a,"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",{duration:5e3}),{status:false,jsonData:[]}}}),je(s=>s.status===404?R({status:false,jsonData:[]}):(this._error(s),sn(()=>s))))}checkAccess(e){let i=pt.diskUrl,r={headers:this._createAuthHeaders(e)};return this._http.get(i,r).pipe(A(this._destroy$),T$1(o=>!!o?.user?.login),je(o=>(this._error(o),sn(()=>o))))}getFolderContents(){let e=`${pt.diskUrl}${Aa.FOLDER}`,i={headers:this._createAuthHeaders(),params:{path:pt.folderPath,limit:"5"}};return this._http.get(e,i).pipe(A(this._destroy$),T$1(r=>r._embedded.items.map(o=>o.name)),je(r=>(this._error(r),sn(()=>r))))}createFolder(e){let i=`${pt.diskUrl}${Aa.FOLDER}`,r={headers:this._createAuthHeaders(e),params:new _n().set("path",pt.folderPath)};return this._http.put(i,null,r).pipe(A(this._destroy$),T$1(()=>true),je(o=>(this._error(o),sn(()=>o))))}checkExistsFolder(e){let i=`${pt.diskUrl}${Aa.FOLDER}`,r={headers:this._createAuthHeaders(e),params:new _n().set("path",pt.folderPath)};return this._http.get(i,r).pipe(A(this._destroy$),T$1(()=>true),je(o=>o.status===404?R(false):(this._error(o),sn(()=>o))))}_createAuthHeaders(e){return new yn({Authorization:`OAuth ${e||this._authService.getToken()}`})}_getPathFile(e){switch(e){case ue.GAMES:return `${pt.folderPath}/${ue.GAMES}`;case ue.GAMES_GROUPS:return `${pt.folderPath}/${ue.GAMES_GROUPS}`;case ue.PLATFORMS:return `${pt.folderPath}/${ue.PLATFORMS}`;case ue.GAMING_ACCOUNTS:return `${pt.folderPath}/${ue.GAMING_ACCOUNTS}`}}_error(e){console.error(e),this._snackBar.open(e.error?.message||e.message,"\u0417\u0430\u043A\u0440\u044B\u0442\u044C",{duration:5e3});}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var SM=(()=>{class t{_diskService=d(Vc);_fileService=d(Ta);_toolsService=d(Ma);_gamesMap;_gameGroupMap;_platformsMap;_gamingAccountsMap;initData(){return Zn([this._diskService.downloadFile(ue.GAMES),this._diskService.downloadFile(ue.GAMES_GROUPS),this._diskService.downloadFile(ue.GAMING_ACCOUNTS)]).pipe(T$1(([e,i,r])=>(this._setMapGames(e?.jsonData||[]),this._setMapGameGroups(i?.jsonData||[]),this._setMapGamingAccounts(r?.jsonData||[]),this._setMapPlatforms(Xm),true)))}createGame(e){let i=this._getMapGames();i.push(e);let r=this._fileService.generateFile(i);return this._diskService.uploadFile(r,ue.GAMES).pipe(T$1(()=>(this._setMapGame(e),e)))}getGameById(e){return this._getMapGames().find(r=>r.id===e)}getGames(){return this._toolsService.serverDelay(()=>this._getMapGames(),1)}updateGame(e){let i=this._getMapGames(),r=i.findIndex(s=>s.id===e.id);i[r]=e;let o=this._fileService.generateFile(i);return this._diskService.uploadFile(o,ue.GAMES).pipe(T$1(()=>(this._setMapGame(e),e)))}updateGames(e){let i=this._getMapGames();e.forEach(o=>{let s=i.findIndex(a=>a.id===o.id);i[s]=o;});let r=this._fileService.generateFile(i);return this._diskService.uploadFile(r,ue.GAMES).pipe(T$1(()=>(e.forEach(o=>{this._setMapGame(o);}),i)))}deleteGame(e){let i=this._getMapGames(),r=i.findIndex(a=>a.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};i.splice(r,1);let s=this._fileService.generateFile(i);return this._diskService.uploadFile(s,ue.GAMES).pipe(T$1(()=>(this._gamesMap.delete(e),o)))}searchGames(e){let i=this._getMapGames();return this._toolsService.filterGames(i,e)}createGameGroup(e){let i=this._getMapGameGroups();i.push(e);let r=this._fileService.generateFile(i);return this._diskService.uploadFile(r,ue.GAMES_GROUPS).pipe(T$1(()=>(this._setMapGameGroup(e),e)))}getGameGroupById(e){return this._getMapGameGroups().find(r=>r.id===e)}getGameGroups(){return this._toolsService.serverDelay(()=>this._getMapGameGroups(),1)}updateGameGroup(e){let i=this._getMapGameGroups(),r=i.findIndex(s=>s.id===e.id);i[r]=e;let o=this._fileService.generateFile(i);return this._diskService.uploadFile(o,ue.GAMES_GROUPS).pipe(T$1(()=>(this._setMapGameGroup(e),e)))}deleteGameGroup(e){let i=this._getMapGameGroups(),r=i.findIndex(a=>a.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};i.splice(r,1);let s=this._fileService.generateFile(i);return this._diskService.uploadFile(s,ue.GAMES_GROUPS).pipe(T$1(()=>(this._gameGroupMap.delete(e),o)))}getPlatformByType(e){return this._getMapPlatforms().find(r=>r.type===e)}getPlatforms(){return this._toolsService.serverDelay(()=>this._getMapPlatforms(),1)}createGamingAccount(e){let i=this._getMapGamingAccounts();i.push(e);let r=this._fileService.generateFile(i);return this._diskService.uploadFile(r,ue.GAMING_ACCOUNTS).pipe(T$1(()=>(this._setMapGamingAccount(e),e)))}getGamingAccountById(e){return this._getMapGamingAccounts().find(r=>r.id===e)}getGamingAccounts(){return this._toolsService.serverDelay(()=>this._getMapGamingAccounts(),1)}updateGamingAccount(e){let i=this._getMapGamingAccounts(),r=i.findIndex(s=>s.id===e.id);i[r]=e;let o=this._fileService.generateFile(i);return this._diskService.uploadFile(o,ue.GAMING_ACCOUNTS).pipe(T$1(()=>(this._setMapGamingAccount(e),e)))}deleteGamingAccount(e){let i=this._getMapGamingAccounts(),r=i.findIndex(a=>a.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};i.splice(r,1);let s=this._fileService.generateFile(i);return this._diskService.uploadFile(s,ue.GAMING_ACCOUNTS).pipe(T$1(()=>(this._gamingAccountsMap.delete(e),o)))}_setMapGames(e){this._gamesMap=new Map(e.map(i=>[i.id,i]));}_setMapGame(e){this._gamesMap.set(e.id,e);}_getMapGames(){return this._gamesMap&&[...this._gamesMap.values()]||[]}_setMapGameGroups(e){this._gameGroupMap=new Map(e.map(i=>[i.id,i]));}_setMapGameGroup(e){this._gameGroupMap.set(e.id,e);}_getMapGameGroups(){return this._gameGroupMap&&[...this._gameGroupMap.values()]||[]}_setMapPlatforms(e){this._platformsMap=new Map(e.map(i=>[i.type,i]));}_getMapPlatforms(){return [...this._platformsMap.values()]}_setMapGamingAccounts(e){this._gamingAccountsMap=new Map(e.map(i=>[i.id,i]));}_setMapGamingAccount(e){this._gamingAccountsMap.set(e.id,e);}_getMapGamingAccounts(){return this._gamingAccountsMap&&[...this._gamingAccountsMap.values()]||[]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ka=(()=>{class t{_toolsService=d(Ma);_keyGame="games_list";_keyPlatforms="platforms_list";_keyGameGroups="game_groups_list";_keyGamingAccounts="gaming_accounts_list";createGame(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGame);return i.push(e),localStorage.setItem(this._keyGame,JSON.stringify(i)),on(e)})}getGameById(e){return this._getParseData(this._keyGame).find(r=>r.id===e)}getGames(){return this._toolsService.serverDelay(()=>this._getParseData(this._keyGame))}updateGame(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGame),r=i.findIndex(o=>o.id===e.id);if(r===-1)throw new Error(`\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0438\u0433\u0440\u0430 \u0441 id ${e.id}`);return i[r]=e,localStorage.setItem(this._keyGame,JSON.stringify(i)),on(e)})}updateGames(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGame);return e.forEach(r=>{let o=i.findIndex(s=>s.id===s.id);if(o===-1)throw new Error(`\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0438\u0433\u0440\u0430 \u0441 id ${r.id}`);i[o]=r;}),localStorage.setItem(this._keyGame,JSON.stringify(i)),on(i)})}deleteGame(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGame),r=i.findIndex(s=>s.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};return r===-1||(i.splice(r,1),localStorage.setItem(this._keyGame,JSON.stringify(i))),o})}searchGames(e){let i=this._getParseData(this._keyGame);return this._toolsService.filterGames(i,e)}setGames(e){localStorage.setItem(this._keyGame,JSON.stringify(e));}cleanGames(){localStorage.removeItem(this._keyGame);}createGameGroup(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGameGroups);return i.push(e),localStorage.setItem(this._keyGameGroups,JSON.stringify(i)),on(e)})}getGameGroupById(e){return this._getParseData(this._keyGameGroups).find(r=>r.id===e)}getGameGroups(){return this._toolsService.serverDelay(()=>this._getParseData(this._keyGameGroups))}updateGameGroup(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGameGroups),r=i.findIndex(o=>o.id===e.id);if(r===-1)throw new Error(`\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0433\u0440\u0443\u043F\u043F\u0430 \u0441 id ${e.id}`);return i[r]=e,localStorage.setItem(this._keyGameGroups,JSON.stringify(i)),on(e)})}deleteGameGroup(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGameGroups),r=i.findIndex(s=>s.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};return r===-1||(i.splice(r,1),localStorage.setItem(this._keyGameGroups,JSON.stringify(i))),o})}setGameGroups(e){localStorage.setItem(this._keyGameGroups,JSON.stringify(e));}cleanGameGroups(){localStorage.removeItem(this._keyGameGroups);}getPlatforms(){return this._toolsService.serverDelay(()=>on(this._getDataPlatforms()))}getPlatformByType(e){return this._getDataPlatforms().find(r=>r.type===e)}createGamingAccount(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGamingAccounts);return i.push(e),localStorage.setItem(this._keyGamingAccounts,JSON.stringify(i)),on(e)})}getGamingAccountById(e){return this._getParseData(this._keyGamingAccounts).find(r=>r.id===e)}getGamingAccounts(){return this._toolsService.serverDelay(()=>this._getParseData(this._keyGamingAccounts))}updateGamingAccount(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGamingAccounts),r=i.findIndex(o=>o.id===e.id);if(r===-1)throw new Error(`\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u0438\u0433\u0440\u0430 \u0441 id ${e.id}`);return i[r]=e,localStorage.setItem(this._keyGamingAccounts,JSON.stringify(i)),on(e)})}deleteGamingAccount(e){return this._toolsService.serverDelay(()=>{let i=this._getParseData(this._keyGamingAccounts),r=i.findIndex(s=>s.id===e),o={status:"success",message:`\u041E\u0431\u044A\u0435\u043A\u0442 c id ${e} \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0451\u043D`};return r===-1||(i.splice(r,1),localStorage.setItem(this._keyGamingAccounts,JSON.stringify(i))),o})}setGamingAccounts(e){localStorage.setItem(this._keyGamingAccounts,JSON.stringify(e));}cleanGamingAccounts(){localStorage.removeItem(this._keyGamingAccounts);}_getDataPlatforms(e=true){return e?on(Xm):this._getParseData(this._keyPlatforms)}_getParseData(e){let i=localStorage.getItem(e);return i?JSON.parse(i):[]}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Nr=(()=>{class t{_authService=d(Or);_dataCloudService=d(SM);_dataLocalService=d(ka);_toolsService=d(Ma);get _pointService(){return this._authService.isAuthorized()?this._dataCloudService:this._dataLocalService}syncData(){return this._pointService.initData?this._pointService.initData():this._toolsService.serverDelay(()=>true,1)}createGame(e){return this._pointService.createGame(e)}getGameById(e){return this._pointService.getGameById(e)}getGames(){return this._pointService.getGames()}updateGame(e){return this._pointService.updateGame(e)}updateGames(e){return this._pointService.updateGames(e)}deleteGame(e){return this._pointService.deleteGame(e)}searchGames(e){return this._pointService.searchGames(e)}createGameGroup(e){return this._pointService.createGameGroup(e)}getGameGroupById(e){return this._pointService.getGameGroupById(e)}getGameGroups(){return this._pointService.getGameGroups()}updateGameGroup(e){return this._pointService.updateGameGroup(e)}deleteGameGroup(e){return this._pointService.deleteGameGroup(e)}getPlatforms(){return this._pointService.getPlatforms()}getPlatformByType(e){return this._pointService.getPlatformByType(e)}createGamingAccount(e){return this._pointService.createGamingAccount(e)}getGamingAccountById(e){return this._pointService.getGamingAccountById(e)}getGamingAccounts(){return this._pointService.getGamingAccounts()}updateGamingAccount(e){return this._pointService.updateGamingAccount(e)}deleteGamingAccount(e){return this._pointService.deleteGamingAccount(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var NM=(()=>{class t{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i;}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(i){return new(i||t)(pe(Oe),pe(F))};static \u0275dir=I({type:t})}return t})(),yz=(()=>{class t extends NM{static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,features:[ge]})}return t})(),FM=new g("");var bz={provide:FM,useExisting:Qt(()=>ch),multi:true};function wz(){let t=gn()?gn().getUserAgent():"";return /android (\d+)/.test(t.toLowerCase())}var Cz=new g(""),ch=(()=>{class t extends NM{_compositionMode;_composing=false;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!wz());}writeValue(e){let i=e??"";this.setProperty("value",i);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(i){return new(i||t)(pe(Oe),pe(F),pe(Cz,8))};static \u0275dir=I({type:t,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(i,r){i&1&&ie("input",function(s){return r._handleInput(s.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(s){return r._compositionEnd(s.target.value)});},standalone:false,features:[Ne([bz]),ge]})}return t})();function Uy(t){return t==null||Hy(t)===0}function Hy(t){return t==null?null:Array.isArray(t)||typeof t=="string"?t.length:t instanceof Set?t.size:null}var dh=new g(""),zy=new g(""),Dz=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,pi=class{static min(n){return xz(n)}static max(n){return Ez(n)}static required(n){return PM(n)}static requiredTrue(n){return Sz(n)}static email(n){return Iz(n)}static minLength(n){return Mz(n)}static maxLength(n){return Tz(n)}static pattern(n){return Az(n)}static nullValidator(n){return th()}static compose(n){return HM(n)}static composeAsync(n){return zM(n)}};function xz(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return !isNaN(e)&&e<t?{min:{min:t,actual:n.value}}:null}}function Ez(t){return n=>{if(n.value==null||t==null)return null;let e=parseFloat(n.value);return !isNaN(e)&&e>t?{max:{max:t,actual:n.value}}:null}}function PM(t){return Uy(t.value)?{required:true}:null}function Sz(t){return t.value===true?null:{required:true}}function Iz(t){return Uy(t.value)||Dz.test(t.value)?null:{email:true}}function Mz(t){return n=>{let e=n.value?.length??Hy(n.value);return e===null||e===0?null:e<t?{minlength:{requiredLength:t,actualLength:e}}:null}}function Tz(t){return n=>{let e=n.value?.length??Hy(n.value);return e!==null&&e>t?{maxlength:{requiredLength:t,actualLength:e}}:null}}function Az(t){if(!t)return th;let n,e;return typeof t=="string"?(e="",t.charAt(0)!=="^"&&(e+="^"),e+=t,t.charAt(t.length-1)!=="$"&&(e+="$"),n=new RegExp(e)):(e=t.toString(),n=t),i=>{if(Uy(i.value))return null;let r=i.value;return n.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function th(t){return null}function LM(t){return t!=null}function jM(t){return Ai(t)?Re(t):t}function BM(t){let n={};return t.forEach(e=>{n=e!=null?v(v({},n),e):n;}),Object.keys(n).length===0?null:n}function VM(t,n){return n.map(e=>e(t))}function kz(t){return !t.validate}function UM(t){return t.map(n=>kz(n)?n:e=>n.validate(e))}function HM(t){if(!t)return null;let n=t.filter(LM);return n.length==0?null:function(e){return BM(VM(e,n))}}function $y(t){return t!=null?HM(UM(t)):null}function zM(t){if(!t)return null;let n=t.filter(LM);return n.length==0?null:function(e){let i=VM(e,n).map(jM);return Zn(i).pipe(T$1(BM))}}function Gy(t){return t!=null?zM(UM(t)):null}function IM(t,n){return t===null?[n]:Array.isArray(t)?[...t,n]:[t,n]}function $M(t){return t._rawValidators}function GM(t){return t._rawAsyncValidators}function Ly(t){return t?Array.isArray(t)?t:[t]:[]}function nh(t,n){return Array.isArray(t)?t.includes(n):t===n}function MM(t,n){let e=Ly(n);return Ly(t).forEach(r=>{nh(e,r)||e.push(r);}),e}function TM(t,n){return Ly(n).filter(e=>!nh(t,e))}var ih=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(n){this._rawValidators=n||[],this._composedValidatorFn=$y(this._rawValidators);}_setAsyncValidators(n){this._rawAsyncValidators=n||[],this._composedAsyncValidatorFn=Gy(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(n){this._onDestroyCallbacks.push(n);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(n=>n()),this._onDestroyCallbacks=[];}reset(n=void 0){this.control?.reset(n);}hasError(n,e){return this.control?this.control.hasError(n,e):false}getError(n,e){return this.control?this.control.getError(n,e):null}},Fr=class extends ih{name;get formDirective(){return null}get path(){return null}};var Uc="VALID",Jm="INVALID",Ra="PENDING",Hc="DISABLED",Pr=class{},rh=class extends Pr{value;source;constructor(n,e){super(),this.value=n,this.source=e;}},$c=class extends Pr{pristine;source;constructor(n,e){super(),this.pristine=n,this.source=e;}},Gc=class extends Pr{touched;source;constructor(n,e){super(),this.touched=n,this.source=e;}},Oa=class extends Pr{status;source;constructor(n,e){super(),this.status=n,this.source=e;}},oh=class extends Pr{source;constructor(n){super(),this.source=n;}},Zo=class extends Pr{source;constructor(n){super(),this.source=n;}};function Wy(t){return (uh(t)?t.validators:t)||null}function Rz(t){return Array.isArray(t)?$y(t):t||null}function qy(t,n){return (uh(n)?n.asyncValidators:t)||null}function Oz(t){return Array.isArray(t)?Gy(t):t||null}function uh(t){return t!=null&&!Array.isArray(t)&&typeof t=="object"}function WM(t,n,e){let i=t.controls;if(!(n?Object.keys(i):i).length)throw new D(1e3,"");if(!YM(i,e))throw new D(1001,"")}function qM(t,n,e){t._forEachChild((i,r)=>{if(e[r]===void 0)throw new D(-1002,"")});}var Na=class{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=ve(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(n,e){this._assignValidators(n),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(n){this._rawValidators=this._composedValidatorFn=n,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(n){this._rawAsyncValidators=this._composedAsyncValidatorFn=n;}get parent(){return this._parent}get status(){return Fe(this.statusReactive)}set status(n){Fe(()=>this.statusReactive.set(n));}_status=Wt(()=>this.statusReactive());statusReactive=ve(void 0);get valid(){return this.status===Uc}get invalid(){return this.status===Jm}get pending(){return this.status===Ra}get disabled(){return this.status===Hc}get enabled(){return this.status!==Hc}errors;get pristine(){return Fe(this.pristineReactive)}set pristine(n){Fe(()=>this.pristineReactive.set(n));}_pristine=Wt(()=>this.pristineReactive());pristineReactive=ve(true);get dirty(){return !this.pristine}get touched(){return Fe(this.touchedReactive)}set touched(n){Fe(()=>this.touchedReactive.set(n));}_touched=Wt(()=>this.touchedReactive());touchedReactive=ve(false);get untouched(){return !this.touched}_events=new _;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(n){this._assignValidators(n);}setAsyncValidators(n){this._assignAsyncValidators(n);}addValidators(n){this.setValidators(MM(n,this._rawValidators));}addAsyncValidators(n){this.setAsyncValidators(MM(n,this._rawAsyncValidators));}removeValidators(n){this.setValidators(TM(n,this._rawValidators));}removeAsyncValidators(n){this.setAsyncValidators(TM(n,this._rawAsyncValidators));}hasValidator(n){return nh(this._rawValidators,n)}hasAsyncValidator(n){return nh(this._rawAsyncValidators,n)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(n={}){let e=this.touched===false;this.touched=true;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsTouched(Y(v({},n),{sourceControl:i})),e&&n.emitEvent!==false&&this._events.next(new Gc(true,i));}markAllAsDirty(n={}){this.markAsDirty({onlySelf:true,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(n));}markAllAsTouched(n={}){this.markAsTouched({onlySelf:true,emitEvent:n.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(n));}markAsUntouched(n={}){let e=this.touched===true;this.touched=false,this._pendingTouched=false;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:true,emitEvent:n.emitEvent,sourceControl:i});}),n.onlySelf||this._parent?._updateTouched(n,i),e&&n.emitEvent!==false&&this._events.next(new Gc(false,i));}markAsDirty(n={}){let e=this.pristine===true;this.pristine=false;let i=n.sourceControl??this;n.onlySelf||this._parent?.markAsDirty(Y(v({},n),{sourceControl:i})),e&&n.emitEvent!==false&&this._events.next(new $c(false,i));}markAsPristine(n={}){let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let i=n.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:true,emitEvent:n.emitEvent});}),n.onlySelf||this._parent?._updatePristine(n,i),e&&n.emitEvent!==false&&this._events.next(new $c(true,i));}markAsPending(n={}){this.status=Ra;let e=n.sourceControl??this;n.emitEvent!==false&&(this._events.next(new Oa(this.status,e)),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.markAsPending(Y(v({},n),{sourceControl:e}));}disable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Hc,this.errors=null,this._forEachChild(r=>{r.disable(Y(v({},n),{onlySelf:true}));}),this._updateValue();let i=n.sourceControl??this;n.emitEvent!==false&&(this._events.next(new rh(this.value,i)),this._events.next(new Oa(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Y(v({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(true));}enable(n={}){let e=this._parentMarkedDirty(n.onlySelf);this.status=Uc,this._forEachChild(i=>{i.enable(Y(v({},n),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:n.emitEvent}),this._updateAncestors(Y(v({},n),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(false));}_updateAncestors(n,e){n.onlySelf||(this._parent?.updateValueAndValidity(n),n.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e));}setParent(n){this._parent=n;}getRawValue(){return this.value}updateValueAndValidity(n={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Uc||this.status===Ra)&&this._runAsyncValidator(i,n.emitEvent);}let e=n.sourceControl??this;n.emitEvent!==false&&(this._events.next(new rh(this.value,e)),this._events.next(new Oa(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),n.onlySelf||this._parent?.updateValueAndValidity(Y(v({},n),{sourceControl:e}));}_updateTreeValidity(n={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(n)),this.updateValueAndValidity({onlySelf:true,emitEvent:n.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?Hc:Uc;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(n,e){if(this.asyncValidator){this.status=Ra,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:n!==false};let i=jM(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:n});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let n=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,n}return  false}setErrors(n,e={}){this.errors=n,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(n){let e=n;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(n,e){let i=e?this.get(e):this;return i?.errors?i.errors[n]:null}hasError(n,e){return !!this.getError(n,e)}get root(){let n=this;for(;n._parent;)n=n._parent;return n}_updateControlsErrors(n,e,i){this.status=this._calculateStatus(),n&&this.statusChanges.emit(this.status),(n||i)&&this._events.next(new Oa(this.status,e)),this._parent&&this._parent._updateControlsErrors(n,e,i);}_initObservables(){this.valueChanges=new K,this.statusChanges=new K;}_calculateStatus(){return this._allControlsDisabled()?Hc:this.errors?Jm:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Ra)?Ra:this._anyControlsHaveStatus(Jm)?Jm:Uc}_anyControlsHaveStatus(n){return this._anyControls(e=>e.status===n)}_anyControlsDirty(){return this._anyControls(n=>n.dirty)}_anyControlsTouched(){return this._anyControls(n=>n.touched)}_updatePristine(n,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,n.onlySelf||this._parent?._updatePristine(n,e),r&&this._events.next(new $c(this.pristine,e));}_updateTouched(n={},e){this.touched=this._anyControlsTouched(),this._events.next(new Gc(this.touched,e)),n.onlySelf||this._parent?._updateTouched(n,e);}_onDisabledChange=[];_registerOnCollectionChange(n){this._onCollectionChange=n;}_setUpdateStrategy(n){uh(n)&&n.updateOn!=null&&(this._updateOn=n.updateOn);}_parentMarkedDirty(n){return !n&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(n){return null}_assignValidators(n){this._rawValidators=Array.isArray(n)?n.slice():n,this._composedValidatorFn=Rz(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(n){this._rawAsyncValidators=Array.isArray(n)?n.slice():n,this._composedAsyncValidatorFn=Oz(this._rawAsyncValidators);}_updateHasRequiredValidator(){Fe(()=>this._hasRequired.set(this.hasValidator(pi.required)));}};function YM(t,n){return Object.hasOwn(t,n)}function Nz(t){return t.tagName==="INPUT"||t.tagName==="SELECT"||t.tagName==="TEXTAREA"}function Fz(t,n,e,i){switch(e){case "name":t.setAttribute(n,e,i);break;case "disabled":case "readonly":case "required":i?t.setAttribute(n,e,""):t.removeAttribute(n,e);break;case "max":case "min":case "minLength":case "maxLength":i!==void 0?t.setAttribute(n,e,i.toString()):t.removeAttribute(n,e);break}}var jy=class{kind;context;control;message;constructor({kind:n,context:e,control:i}){this.kind=n,this.context=e,this.control=i;}};var Pz=(()=>{class t{_validator=th;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):th,this._onChange?.();}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,features:[Ye]})}return t})();var Lz={provide:dh,useExisting:Qt(()=>ZM),multi:true};var ZM=(()=>{class t extends Pz{required;inputName="required";normalizeInput=de;createValidator=e=>PM;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(i,r){i&2&&ce("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[Ne([Lz]),ge]})}return t})();var jz=new g(""),fh=new g("",{factory:()=>mh}),mh="always";function Bz(t,n){return [...n.path,t]}function Vz(t,n,e=mh){Yy(t,n),n.valueAccessor.writeValue(t.value),(t.disabled||e==="always")&&n.valueAccessor.setDisabledState?.(t.disabled),Hz(t,n),$z(t,n),zz(t,n),Uz(t,n);}function AM(t,n,e=true){let i=()=>{};n?.valueAccessor?.registerOnChange(i),n?.valueAccessor?.registerOnTouched(i),ah(t,n),t&&(n._invokeOnDestroyCallbacks(),t._registerOnCollectionChange(()=>{}));}function sh(t,n){t.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(n);});}function Uz(t,n){if(n.valueAccessor.setDisabledState){let e=i=>{n.valueAccessor.setDisabledState(i);};t.registerOnDisabledChange(e),n._registerOnDestroy(()=>{t._unregisterOnDisabledChange(e);});}}function Yy(t,n){let e=$M(t);n.validator!==null?t.setValidators(IM(e,n.validator)):typeof e=="function"&&t.setValidators([e]);let i=GM(t);n.asyncValidator!==null?t.setAsyncValidators(IM(i,n.asyncValidator)):typeof i=="function"&&t.setAsyncValidators([i]);let r=()=>t.updateValueAndValidity();sh(n._rawValidators,r),sh(n._rawAsyncValidators,r);}function ah(t,n){let e=false;if(t!==null){if(n.validator!==null){let r=$M(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.validator);o.length!==r.length&&(e=true,t.setValidators(o));}}if(n.asyncValidator!==null){let r=GM(t);if(Array.isArray(r)&&r.length>0){let o=r.filter(s=>s!==n.asyncValidator);o.length!==r.length&&(e=true,t.setAsyncValidators(o));}}}let i=()=>{};return sh(n._rawValidators,i),sh(n._rawAsyncValidators,i),e}function Hz(t,n){n.valueAccessor.registerOnChange(e=>{t._pendingValue=e,t._pendingChange=true,t._pendingDirty=true,t.updateOn==="change"&&KM(t,n);});}function zz(t,n){n.valueAccessor.registerOnTouched(()=>{t._pendingTouched=true,t.updateOn==="blur"&&t._pendingChange&&KM(t,n),t.updateOn!=="submit"&&t.markAsTouched();});}function KM(t,n){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:false}),n.viewToModelUpdate(t._pendingValue),t._pendingChange=false;}function $z(t,n){let e=(i,r)=>{n.valueAccessor.writeValue(i),r&&n.viewToModelUpdate(i);};t.registerOnChange(e),n._registerOnDestroy(()=>{t._unregisterOnChange(e);});}function QM(t,n){Yy(t,n);}function Gz(t,n){return ah(t,n)}function Wz(t,n){if(!t.hasOwnProperty("model"))return  false;let e=t.model;return e.isFirstChange()?true:!Object.is(n,e.currentValue)}function qz(t){return Object.getPrototypeOf(t.constructor)===yz}function XM(t,n){t._syncPendingControls(),n.forEach(e=>{let i=e.control;i.updateOn==="submit"&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=false);});}function Yz(t,n){if(!n)return null;let e,i,r;return n.forEach(o=>{o.constructor===ch?e=o:qz(o)?i=o:r=o;}),r||i||e||null}function Zz(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1);}var Kz={provide:jz,useFactory:()=>{let t=d(gi,{self:true});return {setParseErrors:n=>{t.setParseErrorSource(n);},set onReset(n){t.onReset=n;}}}},gi=class extends ih{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(n){this.userOnReset=n,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Zo&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Yz(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(n,e,i){super(),this.injector=n,this.renderer=e,this.rawValueAccessors=i,this.injector?.get(xt)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let n=this.injector?.get(Ge);if(!this.control||!n)return;let e=n.markForCheck.bind(n);this.subscription=new ae,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof Zo&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(n){!n.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!n.customControl||(this.isCustomControlBased=true,n.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(r);}),n.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=Nz(n.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof ZM));}ngControlUpdate(n,e){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,n.setCustomControlModelInput(i.value)),this.bindControlProperty(n,r,"touched",i.touched),this.bindControlProperty(n,r,"dirty",i.dirty),this.bindControlProperty(n,r,"valid",i.valid),this.bindControlProperty(n,r,"invalid",i.invalid),this.bindControlProperty(n,r,"pending",i.pending),this.bindControlProperty(n,r,"disabled",i.disabled),this.shouldBindRequired&&this.bindControlProperty(n,r,"required",this.isRequired);let o=i.errors;if(r.errors!==o){r.errors=o;let s=this._convertErrors(o);n.setInputOnDirectives("errors",s);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(n,e,i,r){if(e[i]===r)return;e[i]=r;let o=n.setInputOnDirectives(i,r);this.isNativeFormElement&&!o&&(i==="disabled"||i==="required")&&this.renderer&&Fz(this.renderer,n.nativeElement,i,r);}_convertErrors(n){if(n===null)return [];let e=this.control;return Object.entries(n).map(([i,r])=>new jy({context:r,kind:i,control:e}))}setParseErrorSource(n){if(n===void 0)return;let e=null,i=Wt(()=>{let r=n();return r.length===0?null:r.reduce((o,s)=>(o[s.kind]=s,o),{})});this.parseErrorsValidator=(()=>e).bind(this),kn(()=>{e=i(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(n){this.parseErrorsValidator&&(n?.removeValidators(this.parseErrorsValidator),n?.updateValueAndValidity({emitEvent:false}));}},lh=class{_cd;constructor(n){this._cd=n;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var JM=(()=>{class t extends lh{constructor(e){super(e);}static \u0275fac=function(i){return new(i||t)(pe(gi,2))};static \u0275dir=I({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(i,r){i&2&&$$1("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[ge]})}return t})(),eT=(()=>{class t extends lh{constructor(e){super(e);}static \u0275fac=function(i){return new(i||t)(pe(Fr,10))};static \u0275dir=I({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["","formArray",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:16,hostBindings:function(i,r){i&2&&$$1("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending)("ng-submitted",r.isSubmitted);},standalone:false,features:[ge]})}return t})(),Fa=class extends Na{constructor(n,e,i){super(Wy(e),qy(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(n,e){let i=this._find(n);return i||(this.controls[n]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(n,e,i={}){this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}removeControl(n,e={}){let i=this._find(n);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[n],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(n,e,i={}){let r=this._find(n);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[n],e&&this.registerControl(n,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}contains(n){return this._find(n)?.enabled===true}setValue(n,e={}){Fe(()=>{qM(this,true,n),Object.keys(n).forEach(i=>{WM(this,true,i),this.controls[i].setValue(n[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(n,e={}){n!=null&&(Object.keys(n).forEach(i=>{let r=this._find(i);r&&r.patchValue(n[i],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(n={},e={}){this._forEachChild((i,r)=>{i.reset(n?n[r]:null,Y(v({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new Zo(this));}getRawValue(){return this._reduceChildren({},(n,e,i)=>(n[i]=e.getRawValue(),n))}_syncPendingControls(){let n=this._reduceChildren(false,(e,i)=>i._syncPendingControls()?true:e);return n&&this.updateValueAndValidity({onlySelf:true}),n}_forEachChild(n){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&n(i,e);});}_setUpControls(){this._forEachChild(n=>{n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(n){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&n(i))return  true;return  false}_reduceValue(){let n={};return this._reduceChildren(n,(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(n,e){let i=n;return this._forEachChild((r,o)=>{i=e(i,r,o);}),i}_allControlsDisabled(){for(let n of Object.keys(this.controls))if(this.controls[n].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(n){return YM(this.controls,n)?this.controls[n]:null}};var By=class extends Fa{};var Qz={provide:Fr,useExisting:Qt(()=>Wc)},zc=Promise.resolve(),Wc=(()=>{class t extends Fr{callSetDisabledState;get submitted(){return Fe(this.submittedReactive)}_submitted=Wt(()=>this.submittedReactive());submittedReactive=ve(false);_directives=new Set;form;ngSubmit=new K;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new Fa({},$y(e),Gy(i));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){zc.then(()=>{let i=this._findContainer(e.path);e.control=i.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){zc.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){zc.then(()=>{let i=this._findContainer(e.path),r=new Fa({});QM(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){zc.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){zc.then(()=>{this.form.get(e.path).setValue(i);});}setValue(e){this.control.setValue(e);}onSubmit(e){return this.submittedReactive.set(true),XM(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new oh(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(i){return new(i||t)(pe(dh,10),pe(zy,10),pe(fh,8))};static \u0275dir=I({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(i,r){i&1&&ie("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[Ne([Qz]),ge]})}return t})();function kM(t,n){let e=t.indexOf(n);e>-1&&t.splice(e,1);}function RM(t){return typeof t=="object"&&t!==null&&Object.keys(t).length===2&&"value"in t&&"disabled"in t}var eh=class extends Na{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(n=null,e,i){super(Wy(e),qy(i,e)),this._applyFormState(n),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),uh(e)&&(e.nonNullable||e.initialValueIsDefault)&&(RM(n)?this.defaultValue=n.value:this.defaultValue=n);}setValue(n,e={}){Fe(()=>{this.value=this._pendingValue=n,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(n,e={}){this.setValue(n,e);}reset(n=this.defaultValue,e={}){this._applyFormState(n),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,e?.emitEvent!==false&&this._events.next(new Zo(this));}_updateValue(){}_anyControls(n){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(n){this._onChange.push(n);}_unregisterOnChange(n){kM(this._onChange,n);}registerOnDisabledChange(n){this._onDisabledChange.push(n);}_unregisterOnDisabledChange(n){kM(this._onDisabledChange,n);}_forEachChild(n){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(n){RM(n)?(this.value=this._pendingValue=n.value,n.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=n;}};var Xz=t=>t instanceof eh;var tT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["form",3,"ngNoForm","",3,"ngNativeValidate",""]],hostAttrs:["novalidate",""],standalone:false})}return t})();var Vy=class extends Na{constructor(n,e,i){super(Wy(e),qy(i,e)),this.controls=n,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;at(n){return this.controls[this._adjustIndex(n)]}push(n,e={}){Array.isArray(n)?n.forEach(i=>{this.controls.push(i),this._registerControl(i);}):(this.controls.push(n),this._registerControl(n)),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}insert(n,e,i={}){this.controls.splice(n,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:i.emitEvent});}removeAt(n,e={}){let i=this._adjustIndex(n);i<0&&(i=0),this.controls[i]&&this.controls[i]._registerOnCollectionChange(()=>{}),this.controls.splice(i,1),this.updateValueAndValidity({emitEvent:e.emitEvent});}setControl(n,e,i={}){let r=this._adjustIndex(n);r<0&&(r=0),this.controls[r]&&this.controls[r]._registerOnCollectionChange(()=>{}),this.controls.splice(r,1),e&&(this.controls.splice(r,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange();}get length(){return this.controls.length}setValue(n,e={}){Fe(()=>{qM(this,false,n),n.forEach((i,r)=>{WM(this,false,r),this.at(r).setValue(i,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(n,e={}){n!=null&&(n.forEach((i,r)=>{this.at(r)&&this.at(r).patchValue(i,{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(n=[],e={}){this._forEachChild((i,r)=>{i.reset(n[r],Y(v({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new Zo(this));}getRawValue(){return this.controls.map(n=>n.getRawValue())}clear(n={}){this.controls.length<1||(this._forEachChild(e=>e._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:n.emitEvent}));}_adjustIndex(n){return n<0?n+this.length:n}_syncPendingControls(){let n=this.controls.reduce((e,i)=>i._syncPendingControls()?true:e,false);return n&&this.updateValueAndValidity({onlySelf:true}),n}_forEachChild(n){this.controls.forEach((e,i)=>{n(e,i);});}_updateValue(){this.value=this.controls.filter(n=>n.enabled||this.disabled).map(n=>n.value);}_anyControls(n){return this.controls.some(e=>e.enabled&&n(e))}_setUpControls(){this._forEachChild(n=>this._registerControl(n));}_allControlsDisabled(){for(let n of this.controls)if(n.enabled)return  false;return this.controls.length>0||this.disabled}_registerControl(n){n.setParent(this),n._registerOnCollectionChange(this._onCollectionChange);}_find(n){return this.at(n)??null}};var Jz=(()=>{class t extends Fr{callSetDisabledState;get submitted(){return Fe(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=Wt(()=>this._submittedReactive());_submittedReactive=ve(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(ah(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let i=this.form.get(e.path);return e._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:false}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){AM(e.control||null,e,false),Zz(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,i){this.form.get(e.path).setValue(i);}onReset(){this.resetForm();}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(false);}onSubmit(e){return this.submitted=true,XM(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new oh(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&(AM(i||null,e),Xz(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let i=this.form.get(e.path);QM(i,e),i.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&Gz(i,e)&&i.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Yy(this.form,this),this._oldForm&&ah(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(i){return new(i||t)(pe(dh,10),pe(zy,10),pe(fh,8))};static \u0275dir=I({type:t,features:[ge,Ye]})}return t})();var nT=new g("");var e$={provide:gi,useExisting:Qt(()=>Zy)},Zy=(()=>{class t extends gi{_ngModelWarningConfig;_added=false;viewModel;control;name=null;set isDisabled(e){}model;update=new K;static _ngModelWarningSentOnce=false;_ngModelWarningSent=false;constructor(e,i,r,o,s,a,l){super(l,a,o),this._ngModelWarningConfig=s,this._parent=e,this._setValidators(i),this._setAsyncValidators(r);}_setupWithForm(e,i){this.control=e,this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,Vz(e,this,i));}ngOnChanges(e){this._added||this._setUpControl(),Wz(e,this.viewModel)&&(this.viewModel=this.model,this.formDirective.updateModel(this,this.model));}ngOnDestroy(){this.formDirective?.removeControl(this);}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}get path(){return Bz(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_setUpControl(){this.control=this.formDirective.addControl(this),this._added=true;}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){this.isCustomControlBased&&(this._added||this._setUpControl(),super.ngControlUpdate(e,true));}static \u0275fac=function(i){return new(i||t)(pe(Fr,13),pe(dh,10),pe(zy,10),pe(FM,10),pe(nT,8),pe(Oe,8),pe(j,8))};static \u0275dir=I({type:t,selectors:[["","formControlName",""]],inputs:{name:[0,"formControlName","name"],isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"]},outputs:{update:"ngModelChange"},standalone:false,features:[Ne([e$,Kz]),ge,Ye,kv(null)]})}return t})();var t$={provide:Fr,useExisting:Qt(()=>Ko)},Ko=(()=>{class t extends Jz{form=null;ngSubmit=new K;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","formGroup",""]],hostBindings:function(i,r){i&1&&ie("submit",function(s){return r.onSubmit(s)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[Ne([t$]),ge]})}return t})();var iT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();function OM(t){return !!t&&(t.asyncValidators!==void 0||t.validators!==void 0||t.updateOn!==void 0)}var rT=(()=>{class t{useNonNullable=false;get nonNullable(){let e=new t;return e.useNonNullable=true,e}group(e,i=null){let r=this._reduceControls(e),o={};return OM(i)?o=i:i!==null&&(o.validators=i.validator,o.asyncValidators=i.asyncValidator),new Fa(r,o)}record(e,i=null){let r=this._reduceControls(e);return new By(r,i)}control(e,i,r){let o={};return this.useNonNullable?(OM(i)?o=i:(o.validators=i,o.asyncValidators=r),new eh(e,Y(v({},o),{nonNullable:true}))):new eh(e,i,r)}array(e,i,r){let o=e.map(s=>this._createControl(s));return new Vy(o,i,r)}_reduceControls(e){let i={};return Object.keys(e).forEach(r=>{i[r]=this._createControl(e[r]);}),i}_createControl(e){if(e instanceof eh)return e;if(e instanceof Na)return e;if(Array.isArray(e)){let i=e[0],r=e.length>1?e[1]:null,o=e.length>2?e[2]:null;return this.control(i,r,o)}else return this.control(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var oT=(()=>{class t{static withConfig(e){return {ngModule:t,providers:[{provide:fh,useValue:e.callSetDisabledState??mh}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[iT]})}return t})(),sT=(()=>{class t{static withConfig(e){return {ngModule:t,providers:[{provide:nT,useValue:e.warnOnNgModelWithFormControl??"always"},{provide:fh,useValue:e.callSetDisabledState??mh}]}}static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[iT]})}return t})();var Ky=class{_box;_destroyed=new _;_resizeSubject=new _;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)));}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new Z(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n);}}).pipe(fe(e=>e.some(i=>i.target===n)),Ka({bufferSize:1,refCount:true}),A(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear();}},aT=(()=>{class t{_cleanupErrorListener;_observers=new Map;_ngZone=d(O);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.();}observe(e,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new Ky(r)),this._observers.get(r).observe(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var i$=["notch"],r$=["*"],lT=["iconPrefixContainer"],cT=["textPrefixContainer"],dT=["iconSuffixContainer"],uT=["textSuffixContainer"],o$=["textField"],s$=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],a$=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function l$(t,n){t&1&&be(0,"span",21);}function c$(t,n){if(t&1&&(y(0,"label",20),q(1,1),Q(2,l$,1,0,"span",21),w()),t&2){let e=z(2);me("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),ce("for",e._control.disableAutomaticLabeling?null:e._control.id),C(2),X(!e.hideRequiredMarker&&e._control.required?2:-1);}}function d$(t,n){if(t&1&&Q(0,c$,3,5,"label",20),t&2){let e=z();X(e._hasFloatingLabel()?0:-1);}}function u$(t,n){t&1&&be(0,"div",7);}function f$(t,n){}function m$(t,n){if(t&1&&Et(0,f$,0,0,"ng-template",13),t&2){z(2);let e=ki(1);me("ngTemplateOutlet",e);}}function h$(t,n){if(t&1&&(y(0,"div",9),Q(1,m$,1,1,null,13),w()),t&2){let e=z();me("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),C(),X(e._forceDisplayInfixLabel()?-1:1);}}function p$(t,n){t&1&&(y(0,"div",10,2),q(2,2),w());}function g$(t,n){t&1&&(y(0,"div",11,3),q(2,3),w());}function v$(t,n){}function _$(t,n){if(t&1&&Et(0,v$,0,0,"ng-template",13),t&2){z();let e=ki(1);me("ngTemplateOutlet",e);}}function y$(t,n){t&1&&(y(0,"div",14,4),q(2,4),w());}function b$(t,n){t&1&&(y(0,"div",15,5),q(2,5),w());}function w$(t,n){t&1&&be(0,"div",16);}function C$(t,n){t&1&&(y(0,"div",18),q(1,6),w());}function D$(t,n){if(t&1&&(y(0,"mat-hint",22),N(1),w()),t&2){let e=z(2);me("id",e._hintLabelId),C(),Ut(e.hintLabel);}}function x$(t,n){if(t&1&&(y(0,"div",19),Q(1,D$,2,2,"mat-hint",22),q(2,7),be(3,"div",23),q(4,8),w()),t&2){let e=z();C(),X(e.hintLabel?1:-1);}}var Lr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-label"]]})}return t})(),E$=new g("MatError");var ph=(()=>{class t{align="start";id=d(at).getId("mat-mdc-hint-");static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(i,r){i&2&&(pn("id",r.id),ce("align",null),$$1("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return t})(),S$=new g("MatPrefix");var _T=new g("MatSuffix"),yT=(()=>{class t{set _isTextSelector(e){this._isText=true;}_isText=false;static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matSuffix",""],["","matIconSuffix",""],["","matTextSuffix",""]],inputs:{_isTextSelector:[0,"matTextSuffix","_isTextSelector"]},features:[Ne([{provide:_T,useExisting:t}])]})}return t})(),bT=new g("FloatingLabelParent"),fT=(()=>{class t{_elementRef=d(F);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=d(aT);_ngZone=d(O);_parent=d(bT);_resizeSubscription=new ae;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return I$(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(i,r){i&2&&$$1("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return t})();function I$(t){let n=t;if(n.offsetParent!==null)return n.scrollWidth;let e=n.cloneNode(true);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var mT="mdc-line-ripple--active",hh="mdc-line-ripple--deactivating",hT=(()=>{class t{_elementRef=d(F);_cleanupTransitionEnd;constructor(){let e=d(O),i=d(Oe);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let e=this._elementRef.nativeElement.classList;e.remove(hh),e.add(mT);}deactivate(){this._elementRef.nativeElement.classList.add(hh);}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(hh);e.propertyName==="opacity"&&r&&i.remove(mT,hh);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return t})(),pT=(()=>{class t{_elementRef=d(F);_ngZone=d(O);open=false;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(".mdc-floating-label");i?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(i.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration="");}))):e.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width="":i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`);}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(i,r){if(i&1&&$e(i$,5),i&2){let o;ee(o=te())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(i,r){i&2&&$$1("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:r$,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(i,r){i&1&&(Ve(),mt(0,"div",1),Ze(1,"div",2,0),q(3),Xe(),mt(4,"div",3));},encapsulation:2})}return t})(),qc=(()=>{class t{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t})}return t})();var Yc=new g("MatFormField"),M$=new g("MAT_FORM_FIELD_DEFAULT_OPTIONS"),gT="fill",T$="auto",vT="fixed",A$="translateY(-50%)",Qo=(()=>{class t{_elementRef=d(F);_changeDetectorRef=d(Ge);_platform=d(he);_idGenerator=d(at);_ngZone=d(O);_defaults=d(M$,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Hl("iconPrefixContainer");_textPrefixContainerSignal=Hl("textPrefixContainer");_iconSuffixContainerSignal=Hl("iconSuffixContainer");_textSuffixContainerSignal=Hl("textSuffixContainer");_prefixSuffixContainers=Wt(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=VD(Lr);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=bt(e);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||T$}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||gT;this._appearanceSignal.set(i);}_appearanceSignal=ve(gT);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||vT}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||vT;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e;}_destroyed=new _;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=We();constructor(){let e=this._defaults,i=d(Ht);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),kn(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=Wt(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(e){let i=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges.pipe(Ct([void 0,void 0]),T$1(()=>[i.errorState,i.userAriaDescribedBy]),Ya(),fe(([[o,s],[a,l]])=>o!==a||s!==l)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&(this._valueChanges=i.ngControl.valueChanges.pipe(A(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),Mn(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e);}_syncOutlineLabelOffset(){zD({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Wt(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(e){let i=this._control?this._control.ngControl:null;return i&&i[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(a=>a.align==="start"):null,s=this._hintChildren?this._hintChildren.find(a=>a.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id);}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!o.includes(s)));}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,a=i?.getBoundingClientRect().width??0,l=r?.getBoundingClientRect().width??0,c=o?.getBoundingClientRect().width??0,u=this._currentDirection==="rtl"?"-1":"1",f=`${s+a}px`,h=`calc(${u} * (${f} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,p=`var(--mat-mdc-form-field-label-transform, ${A$} translateX(${h}))`,b=s+a+l+c;return [p,b]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r);}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-form-field"]],contentQueries:function(i,r,o){if(i&1&&(cf(o,r._labelChild,Lr,5),li(o,qc,5)(o,S$,5)(o,_T,5)(o,E$,5)(o,ph,5)),i&2){uf();let s;ee(s=te())&&(r._formFieldControl=s.first),ee(s=te())&&(r._prefixChildren=s),ee(s=te())&&(r._suffixChildren=s),ee(s=te())&&(r._errorChildren=s),ee(s=te())&&(r._hintChildren=s);}},viewQuery:function(i,r){if(i&1&&(df(r._iconPrefixContainerSignal,lT,5)(r._textPrefixContainerSignal,cT,5)(r._iconSuffixContainerSignal,dT,5)(r._textSuffixContainerSignal,uT,5),$e(o$,5)(lT,5)(cT,5)(dT,5)(uT,5)(fT,5)(pT,5)(hT,5)),i&2){uf(4);let o;ee(o=te())&&(r._textField=o.first),ee(o=te())&&(r._iconPrefixContainer=o.first),ee(o=te())&&(r._textPrefixContainer=o.first),ee(o=te())&&(r._iconSuffixContainer=o.first),ee(o=te())&&(r._textSuffixContainer=o.first),ee(o=te())&&(r._floatingLabel=o.first),ee(o=te())&&(r._notchedOutline=o.first),ee(o=te())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(i,r){i&2&&$$1("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Ne([{provide:Yc,useExisting:t},{provide:bT,useExisting:t}])],ngContentSelectors:a$,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(i,r){if(i&1&&(Ve(s$),Et(0,d$,1,1,"ng-template",null,0,Ls),y(2,"div",6,1),ie("click",function(s){return r._control.onContainerClick(s)}),Q(4,u$,1,0,"div",7),y(5,"div",8),Q(6,h$,2,2,"div",9),Q(7,p$,3,0,"div",10),Q(8,g$,3,0,"div",11),y(9,"div",12),Q(10,_$,1,1,null,13),q(11),w(),Q(12,y$,3,0,"div",14),Q(13,b$,3,0,"div",15),w(),Q(14,w$,1,0,"div",16),w(),y(15,"div",17),Q(16,C$,2,0,"div",18)(17,x$,5,1,"div",19),w()),i&2){let o;C(2),$$1("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),C(2),X(!r._hasOutline()&&!r._control.disabled?4:-1),C(2),X(r._hasOutline()?6:-1),C(),X(r._hasIconPrefix?7:-1),C(),X(r._hasTextPrefix?8:-1),C(2),X(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),C(2),X(r._hasTextSuffix?12:-1),C(),X(r._hasIconSuffix?13:-1),C(),X(r._hasOutline()?-1:14),C(),$$1("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let s=r._getSubscriptMessageType();C(),X((o=s)==="error"?16:o==="hint"?17:-1);}},dependencies:[fT,pT,Yl,hT,ph],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})}return t})();var Xo=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[oa,Qo,Ce]})}return t})();function wT(t){return Error(`Unable to find icon with the name "${t}"`)}function N$(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function CT(t){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`)}function DT(t){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`)}var Yi=class{url;svgText;options;svgElement=null;constructor(n,e,i){this.url=n,this.svgText=e,this.options=i;}},ET=(()=>{class t{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(e,i,r,o){this._httpClient=e,this._sanitizer=i,this._errorHandler=o,this._document=r;}addSvgIcon(e,i,r){return this.addSvgIconInNamespace("",e,i,r)}addSvgIconLiteral(e,i,r){return this.addSvgIconLiteralInNamespace("",e,i,r)}addSvgIconInNamespace(e,i,r,o){return this._addSvgIconConfig(e,i,new Yi(r,null,o))}addSvgIconResolver(e){return this._resolvers.push(e),this}addSvgIconLiteralInNamespace(e,i,r,o){let s=this._sanitizer.sanitize(_t.HTML,r);if(!s)throw DT(r);let a=Ho(s);return this._addSvgIconConfig(e,i,new Yi("",a,o))}addSvgIconSet(e,i){return this.addSvgIconSetInNamespace("",e,i)}addSvgIconSetLiteral(e,i){return this.addSvgIconSetLiteralInNamespace("",e,i)}addSvgIconSetInNamespace(e,i,r){return this._addSvgIconSetConfig(e,new Yi(i,null,r))}addSvgIconSetLiteralInNamespace(e,i,r){let o=this._sanitizer.sanitize(_t.HTML,i);if(!o)throw DT(i);let s=Ho(o);return this._addSvgIconSetConfig(e,new Yi("",s,r))}registerFontClassAlias(e,i=e){return this._fontCssClassesByAlias.set(e,i),this}classNameForFontAlias(e){return this._fontCssClassesByAlias.get(e)||e}setDefaultFontSetClass(...e){return this._defaultFontSetClass=e,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(e){let i=this._sanitizer.sanitize(_t.RESOURCE_URL,e);if(!i)throw CT(e);let r=this._cachedIconsByUrl.get(i);return r?R(gh(r)):this._loadSvgIconFromConfig(new Yi(e,null)).pipe(tt(o=>this._cachedIconsByUrl.set(i,o)),T$1(o=>gh(o)))}getNamedSvgIcon(e,i=""){let r=xT(i,e),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,e),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let s=this._iconSetConfigs.get(i);return s?this._getSvgFromIconSetConfigs(e,s):sn(wT(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear();}_getSvgFromConfig(e){return e.svgText?R(gh(this._svgElementFromConfig(e))):this._loadSvgIconFromConfig(e).pipe(T$1(i=>gh(i)))}_getSvgFromIconSetConfigs(e,i){let r=this._extractIconWithNameFromAnySet(e,i);if(r)return R(r);let o=i.filter(s=>!s.svgText).map(s=>this._loadSvgIconSetFromConfig(s).pipe(je(a=>{let c=`Loading icon set URL: ${this._sanitizer.sanitize(_t.RESOURCE_URL,s.url)} failed: ${a.message}`;return this._errorHandler.handleError(new Error(c)),R(null)})));return Zn(o).pipe(T$1(()=>{let s=this._extractIconWithNameFromAnySet(e,i);if(!s)throw wT(e);return s}))}_extractIconWithNameFromAnySet(e,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(e)>-1){let s=this._svgElementFromConfig(o),a=this._extractSvgIconFromSet(s,e,o.options);if(a)return a}}return null}_loadSvgIconFromConfig(e){return this._fetchIcon(e).pipe(tt(i=>e.svgText=i),T$1(()=>this._svgElementFromConfig(e)))}_loadSvgIconSetFromConfig(e){return e.svgText?R(null):this._fetchIcon(e).pipe(tt(i=>e.svgText=i))}_extractSvgIconFromSet(e,i,r){let o=e.querySelector(`[id="${i}"]`);if(!o)return null;let s=o.cloneNode(true);if(s.removeAttribute("id"),s.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(s,r);if(s.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(s),r);let a=this._svgElementFromString(Ho("<svg></svg>"));return a.appendChild(s),this._setSvgAttributes(a,r)}_svgElementFromString(e){let i=this._document.createElement("DIV");i.innerHTML=e;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(e){let i=this._svgElementFromString(Ho("<svg></svg>")),r=e.attributes;for(let o=0;o<r.length;o++){let{name:s,value:a}=r[o];s!=="id"&&i.setAttribute(s,a);}for(let o=0;o<e.childNodes.length;o++)e.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(e.childNodes[o].cloneNode(true));return i}_setSvgAttributes(e,i){return e.setAttribute("fit",""),e.setAttribute("height","100%"),e.setAttribute("width","100%"),e.setAttribute("preserveAspectRatio","xMidYMid meet"),e.setAttribute("focusable","false"),i&&i.viewBox&&e.setAttribute("viewBox",i.viewBox),e}_fetchIcon(e){let{url:i,options:r}=e,o=r?.withCredentials??false;if(!this._httpClient)throw N$();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let s=this._sanitizer.sanitize(_t.RESOURCE_URL,i);if(!s)throw CT(i);let a=this._inProgressUrlFetches.get(s);if(a)return a;let l=this._httpClient.get(s,{responseType:"text",withCredentials:o}).pipe(T$1(c=>Ho(c)),Xr(()=>this._inProgressUrlFetches.delete(s)),Za());return this._inProgressUrlFetches.set(s,l),l}_addSvgIconConfig(e,i,r){return this._svgIconConfigs.set(xT(e,i),r),this}_addSvgIconSetConfig(e,i){let r=this._iconSetConfigs.get(e);return r?r.push(i):this._iconSetConfigs.set(e,[i]),this}_svgElementFromConfig(e){if(!e.svgElement){let i=this._svgElementFromString(e.svgText);this._setSvgAttributes(i,e.options),e.svgElement=i;}return e.svgElement}_getIconConfigFromResolvers(e,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,e);if(o)return F$(o)?new Yi(o.url,null,o.options):new Yi(o,null)}}static \u0275fac=function(i){return new(i||t)(L(Mo,8),L(tc),L(B,8),L(Gt))};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function gh(t){return t.cloneNode(true)}function xT(t,n){return t+":"+n}function F$(t){return !!(t.url&&t.options)}var P$=["*"],L$=new g("MAT_ICON_DEFAULT_OPTIONS"),j$=new g("mat-icon-location",{providedIn:"root",factory:()=>{let t=d(B),n=t?t.location:null;return {getPathname:()=>n?n.pathname+n.search:""}}}),ST=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],B$=ST.map(t=>`[${t}]`).join(", "),V$=/^url\(['"]?#(.*?)['"]?\)$/,jr=(()=>{class t{_elementRef=d(F);_iconRegistry=d(ET);_location=d(j$);_errorHandler=d(Gt);_defaultColor;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;inline=false;get svgIcon(){return this._svgIcon}set svgIcon(e){e!==this._svgIcon&&(e?this._updateSvgIcon(e):this._svgIcon&&this._clearSvgElement(),this._svgIcon=e);}_svgIcon;get fontSet(){return this._fontSet}set fontSet(e){let i=this._cleanupFontValue(e);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses());}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(e){let i=this._cleanupFontValue(e);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses());}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=ae.EMPTY;constructor(){let e=d(new Eo("aria-hidden"),{optional:true}),i=d(L$,{optional:true});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),e||this._elementRef.nativeElement.setAttribute("aria-hidden","true");}_splitIconName(e){if(!e)return ["",""];let i=e.split(":");switch(i.length){case 1:return ["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${e}"`)}}ngOnInit(){this._updateFontIconClasses();}ngAfterViewChecked(){let e=this._elementsWithExternalReferences;if(e&&e.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i));}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();}_usingFontIcon(){return !this.svgIcon}_setSvgElement(e){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(e),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(e);}_clearSvgElement(){let e=this._elementRef.nativeElement,i=e.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=e.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove();}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let e=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>e.classList.remove(r)),i.forEach(r=>e.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&e.classList.remove(this._previousFontIconClass),this.fontIcon&&e.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon);}_cleanupFontValue(e){return typeof e=="string"?e.trim().split(" ")[0]:e}_prependPathToReferences(e){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(s=>{o.setAttribute(s.name,`url('${e}#${s.value}')`);});});}_cacheChildrenWithExternalReferences(e){let i=e.querySelectorAll(B$),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)ST.forEach(s=>{let a=i[o],l=a.getAttribute(s),c=l?l.match(V$):null;if(c){let u=r.get(a);u||(u=[],r.set(a,u)),u.push({name:s,value:c[1]});}});}_updateSvgIcon(e){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),e){let[i,r]=this._splitIconName(e);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(qe(1)).subscribe(o=>this._setSvgElement(o),o=>{let s=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(s));});}}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(ce("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),Bn(r.color?"mat-"+r.color:""),$$1("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"));},inputs:{color:"color",inline:[2,"inline","inline",de],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:P$,decls:1,vars:0,template:function(i,r){i&1&&(Ve(),q(0));},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2})}return t})(),Age=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce]})}return t})();var U$=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return t})(),H$={passive:true},IT=(()=>{class t{_platform=d(he);_ngZone=d(O);_renderer=d(it).createRenderer(null,null);_styleLoader=d(yt);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return De;this._styleLoader.load(U$);let i=zt(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new _,s="cdk-text-field-autofilled",a=c=>{c.animationName==="cdk-text-field-autofill-start"&&!i.classList.contains(s)?(i.classList.add(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:true}))):c.animationName==="cdk-text-field-autofill-end"&&i.classList.contains(s)&&(i.classList.remove(s),this._ngZone.run(()=>o.next({target:c.target,isAutofilled:false})));},l=this._ngZone.runOutsideAngular(()=>(i.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(i,"animationstart",a,H$)));return this._monitoredElements.set(i,{subject:o,unlisten:l}),o}stopMonitoring(e){let i=zt(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove("cdk-text-field-autofill-monitored"),i.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(i));}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i));}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var MT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({})}return t})();var TT=new g("MAT_INPUT_VALUE_ACCESSOR");var vh=(()=>{class t{isErrorState(e,i){return !!(e&&e.invalid&&(e.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();var Pa=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(n,e,i,r,o){this._defaultMatcher=n,this.ngControl=e,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o;}updateErrorState(){let n=this.errorState,e=this._parentFormGroup||this._parentForm,i=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=i?.isErrorState(r,e)??false;o!==n&&(this.errorState=o,this._stateChanges.next());}};var z$=["button","checkbox","file","hidden","image","radio","range","reset","submit"],$$=new g("MAT_INPUT_CONFIG"),AT=(()=>{class t{_elementRef=d(F);_platform=d(he);ngControl=d(gi,{optional:true,self:true});_autofillMonitor=d(IT);_ngZone=d(O);_formField=d(Yc,{optional:true});_renderer=d(Oe);_uid=d(at).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=d($$,{optional:true});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=false;_isNativeSelect=false;_isTextarea=false;_isInFormField=false;focused=false;stateChanges=new _;controlType="mat-input";autofilled=false;get disabled(){return this._disabled}set disabled(e){this._disabled=bt(e),this.focused&&(this.focused=false,this.stateChanges.next());}_disabled=false;get id(){return this._id}set id(e){this._id=e||this._uid;}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(pi.required)??false}set required(e){this._required=bt(e);}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&yy().has(this._type)&&(this._elementRef.nativeElement.type=this._type);}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next());}get readonly(){return this._readonly}set readonly(e){this._readonly=bt(e);}_readonly=false;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>yy().has(e));constructor(){let e=d(Wc,{optional:true}),i=d(Ko,{optional:true}),r=d(vh),o=d(TT,{optional:true,self:true}),s=this._elementRef.nativeElement,a=s.nodeName.toLowerCase();o?Rn(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=s,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(s,"keyup",this._iOSKeyupListener);}),this._errorStateTracker=new Pa(r,this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=a==="select",this._isTextarea=a==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||false,this._isNativeSelect&&(this.controlType=s.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&kn(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next();});}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next();});}ngOnChanges(){this.stateChanges.next();}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.();}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder();}focus(e){this._elementRef.nativeElement.focus(e);}updateErrorState(){this._errorStateTracker.updateErrorState();}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type==="number"?(i.type="text",i.setSelectionRange(0,0),i.type="number"):i.setSelectionRange(0,0);}this.focused=e,this.stateChanges.next();}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next());}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute("placeholder",e):i.removeAttribute("placeholder");}}_getPlaceholder(){return this.placeholder||null}_validateType(){z$.indexOf(this._type)>-1;}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return !this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby");}onContainerClick(){this.focused||this.focus();}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0));};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(i,r){i&1&&ie("focus",function(){return r._focusChanged(true)})("blur",function(){return r._focusChanged(false)})("input",function(){return r._onInput()}),i&2&&(pn("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),ce("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),$$1("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()));},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",de]},exportAs:["matInput"],features:[Ne([{provide:qc,useExisting:t}]),Ye]})}return t})(),kT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Xo,Xo,MT,Ce]})}return t})();var W$=["tooltip"],q$=20;var Y$=new g("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(j);return ()=>Wo(t,{scrollThrottle:q$})}}),Z$=new g("mat-tooltip-default-options",{providedIn:"root",factory:()=>({showDelay:0,hideDelay:0,touchendHideDelay:1500})});var RT="tooltip-panel",K$={passive:true},Q$=8,X$=8,J$=24,eG=200,Zc=(()=>{class t{_elementRef=d(F);_ngZone=d(O);_platform=d(he);_ariaDescriber=d(bS);_focusMonitor=d(Uo);_dir=d(Ht);_injector=d(j);_viewContainerRef=d(kt);_mediaMatcher=d(ea);_document=d(B);_renderer=d(Oe);_animationsDisabled=We();_defaultOptions=d(Z$,{optional:true});_overlayRef=null;_tooltipInstance=null;_overlayPanelClass;_portal;_position="below";_positionAtOrigin=false;_disabled=false;_tooltipClass;_viewInitialized=false;_pointerExitEventsInitialized=false;_tooltipComponent=OT;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending=false;_dirSubscribed=false;get position(){return this._position}set position(e){e!==this._position&&(this._position=e,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()));}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(e){this._positionAtOrigin=bt(e),this._detach(),this._overlayRef=null;}get disabled(){return this._disabled}set disabled(e){let i=bt(e);this._disabled!==i&&(this._disabled=i,i?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message));}get showDelay(){return this._showDelay}set showDelay(e){this._showDelay=St(e);}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(e){this._hideDelay=St(e),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay);}_hideDelay;touchGestures="auto";get message(){return this._message}set message(e){let i=this._message;this._message=e!=null?String(e).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(i);}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(e){this._tooltipClass=e,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass);}_eventCleanups=[];_touchstartTimeout=null;_destroyed=new _;_isDestroyed=false;constructor(){let e=this._defaultOptions;e&&(this._showDelay=e.showDelay,this._hideDelay=e.hideDelay,e.position&&(this.position=e.position),e.positionAtOrigin&&(this.positionAtOrigin=e.positionAtOrigin),e.touchGestures&&(this.touchGestures=e.touchGestures),e.tooltipClass&&(this.tooltipClass=e.tooltipClass)),this._viewportMargin=Q$;}ngAfterViewInit(){this._viewInitialized=true,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe(A(this._destroyed)).subscribe(e=>{e?e==="keyboard"&&this._ngZone.run(()=>this.show()):this._ngZone.run(()=>this.hide(0));});}ngOnDestroy(){let e=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._eventCleanups.forEach(i=>i()),this._eventCleanups.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=true,this._ariaDescriber.removeDescription(e,this.message,"tooltip"),this._focusMonitor.stopMonitoring(e);}show(e=this.showDelay,i){if(this.disabled||!this.message||this._isTooltipVisible()){this._tooltipInstance?._cancelPendingAnimations();return}let r=this._createOverlay(i);this._detach(),this._portal=this._portal||new Wn(this._tooltipComponent,this._viewContainerRef);let o=this._tooltipInstance=r.attach(this._portal).instance;o._triggerElement=this._elementRef.nativeElement,o._mouseLeaveHideDelay=this._hideDelay,o.afterHidden().pipe(A(this._destroyed)).subscribe(()=>this._detach()),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),o.show(e);}hide(e=this.hideDelay){let i=this._tooltipInstance;i&&(i.isVisible()?i.hide(e):(i._cancelPendingAnimations(),this._detach()));}toggle(e){this._isTooltipVisible()?this.hide():this.show(void 0,e);}_isTooltipVisible(){return !!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(e){if(this._overlayRef){let s=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!e)&&s._origin instanceof F)return this._overlayRef;this._detach();}let i=this._injector.get(Vo).getAncestorScrollContainers(this._elementRef),r=`${this._cssClassPrefix}-${RT}`,o=Nc(this._injector,this.positionAtOrigin?e||this._elementRef:this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(false).withViewportMargin(this._viewportMargin).withScrollableContainers(i).withPopoverLocation("global");return o.positionChanges.pipe(A(this._destroyed)).subscribe(s=>{this._updateCurrentPositionClass(s.connectionPair),this._tooltipInstance&&s.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run(()=>this.hide(0));}),this._overlayRef=Ui(this._injector,{direction:this._dir,positionStrategy:o,panelClass:this._overlayPanelClass?[...this._overlayPanelClass,r]:r,scrollStrategy:this._injector.get(Y$)(),disableAnimations:this._animationsDisabled,eventPredicate:this._overlayEventPredicate}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe(A(this._destroyed)).subscribe(()=>this._detach()),this._overlayRef.outsidePointerEvents().pipe(A(this._destroyed)).subscribe(()=>this._tooltipInstance?._handleBodyInteraction()),this._overlayRef.keydownEvents().pipe(A(this._destroyed)).subscribe(s=>{s.preventDefault(),s.stopPropagation(),this._ngZone.run(()=>this.hide(0));}),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=true,this._dir.change.pipe(A(this._destroyed)).subscribe(()=>{this._overlayRef&&this._updatePosition(this._overlayRef);})),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null;}_updatePosition(e){let i=e.getConfig().positionStrategy,r=this._getOrigin(),o=this._getOverlayPosition();i.withPositions([this._addOffset(v(v({},r.main),o.main)),this._addOffset(v(v({},r.fallback),o.fallback))]);}_addOffset(e){let i=X$,r=!this._dir||this._dir.value=="ltr";return e.originY==="top"?e.offsetY=-i:e.originY==="bottom"?e.offsetY=i:e.originX==="start"?e.offsetX=r?-i:i:e.originX==="end"&&(e.offsetX=r?i:-i),e}_getOrigin(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"||i=="below"?r={originX:"center",originY:i=="above"?"top":"bottom"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={originX:"start",originY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={originX:"end",originY:"center"});let{x:o,y:s}=this._invertPosition(r.originX,r.originY);return {main:r,fallback:{originX:o,originY:s}}}_getOverlayPosition(){let e=!this._dir||this._dir.value=="ltr",i=this.position,r;i=="above"?r={overlayX:"center",overlayY:"bottom"}:i=="below"?r={overlayX:"center",overlayY:"top"}:i=="before"||i=="left"&&e||i=="right"&&!e?r={overlayX:"end",overlayY:"center"}:(i=="after"||i=="right"&&e||i=="left"&&!e)&&(r={overlayX:"start",overlayY:"center"});let{x:o,y:s}=this._invertPosition(r.overlayX,r.overlayY);return {main:r,fallback:{overlayX:o,overlayY:s}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),rt(()=>{this._tooltipInstance&&this._overlayRef.updatePosition();},{injector:this._injector}));}_setTooltipClass(e){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=e instanceof Set?Array.from(e):e,this._tooltipInstance._markForCheck());}_invertPosition(e,i){return this.position==="above"||this.position==="below"?i==="top"?i="bottom":i==="bottom"&&(i="top"):e==="end"?e="start":e==="start"&&(e="end"),{x:e,y:i}}_updateCurrentPositionClass(e){let{overlayY:i,originX:r,originY:o}=e,s;if(i==="center"?this._dir&&this._dir.value==="rtl"?s=r==="end"?"left":"right":s=r==="start"?"left":"right":s=i==="bottom"&&o==="top"?"above":"below",s!==this._currentPosition){let a=this._overlayRef;if(a){let l=`${this._cssClassPrefix}-${RT}-`;a.removePanelClass(l+this._currentPosition),a.addPanelClass(l+s);}this._currentPosition=s;}}_setupPointerEnterEventsIfNeeded(){this._disabled||!this.message||!this._viewInitialized||this._eventCleanups.length||(this._isTouchPlatform()?this.touchGestures!=="off"&&(this._disableNativeGesturesIfNecessary(),this._addListener("touchstart",e=>{let i=e.targetTouches?.[0],r=i?{x:i.clientX,y:i.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);let o=500;this._touchstartTimeout=setTimeout(()=>{this._touchstartTimeout=null,this.show(void 0,r);},this._defaultOptions?.touchLongPressShowDelay??o);})):this._addListener("mouseenter",e=>{this._setupPointerExitEventsIfNeeded();let i;e.x!==void 0&&e.y!==void 0&&(i=e),this.show(void 0,i);}));}_setupPointerExitEventsIfNeeded(){if(!this._pointerExitEventsInitialized){if(this._pointerExitEventsInitialized=true,!this._isTouchPlatform())this._addListener("mouseleave",e=>{let i=e.relatedTarget;(!i||!this._overlayRef?.overlayElement.contains(i))&&this.hide();}),this._addListener("wheel",e=>{if(this._isTooltipVisible()){let i=this._document.elementFromPoint(e.clientX,e.clientY),r=this._elementRef.nativeElement;i!==r&&!r.contains(i)&&this.hide();}});else if(this.touchGestures!=="off"){this._disableNativeGesturesIfNecessary();let e=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay);};this._addListener("touchend",e),this._addListener("touchcancel",e);}}}_addListener(e,i){this._eventCleanups.push(this._renderer.listen(this._elementRef.nativeElement,e,i,K$));}_isTouchPlatform(){let e=this._defaultOptions?.detectHoverCapability;return typeof e=="function"?!e():this._platform.IOS||this._platform.ANDROID?true:this._platform.isBrowser?!!e&&this._mediaMatcher.matchMedia("(any-hover: none)").matches:false}_disableNativeGesturesIfNecessary(){let e=this.touchGestures;if(e!=="off"){let i=this._elementRef.nativeElement,r=i.style;(e==="on"||i.nodeName!=="INPUT"&&i.nodeName!=="TEXTAREA")&&(r.userSelect=r.msUserSelect=r.webkitUserSelect=r.MozUserSelect="none"),(e==="on"||!i.draggable)&&(r.webkitUserDrag="none"),r.touchAction="none",r.webkitTapHighlightColor="transparent";}}_syncAriaDescription(e){this._ariaDescriptionPending||(this._ariaDescriptionPending=true,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,e,"tooltip"),this._isDestroyed||rt({write:()=>{this._ariaDescriptionPending=false,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip");}},{injector:this._injector}));}_overlayEventPredicate=e=>e.type==="keydown"?this._isTooltipVisible()&&e.keyCode===27&&!Ft(e):true;static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function(i,r){i&2&&$$1("mat-mdc-tooltip-disabled",r.disabled);},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}return t})(),OT=(()=>{class t{_changeDetectorRef=d(Ge);_elementRef=d(F);_isMultiline=false;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled=We();_tooltip;_closeOnInteraction=false;_isVisible=false;_onHide=new _;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";show(e){this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout(()=>{this._toggleVisibility(true),this._showTimeoutId=void 0;},e);}hide(e){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout(()=>{this._toggleVisibility(false),this._hideTimeoutId=void 0;},e);}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null;}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0);}_markForCheck(){this._changeDetectorRef.markForCheck();}_handleMouseLeave({relatedTarget:e}){(!e||!this._triggerElement.contains(e))&&(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(false));}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck();}_isTooltipMultiline(){let e=this._elementRef.nativeElement.getBoundingClientRect();return e.height>J$&&e.width>=eG}_handleAnimationEnd({animationName:e}){(e===this._showAnimation||e===this._hideAnimation)&&this._finalizeAnimation(e===this._showAnimation);}_cancelPendingAnimations(){this._showTimeoutId!=null&&clearTimeout(this._showTimeoutId),this._hideTimeoutId!=null&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0;}_finalizeAnimation(e){e?this._closeOnInteraction=true:this.isVisible()||this._onHide.next();}_toggleVisibility(e){let i=this._tooltip.nativeElement,r=this._showAnimation,o=this._hideAnimation;if(i.classList.remove(e?o:r),i.classList.add(e?r:o),this._isVisible!==e&&(this._isVisible=e,this._changeDetectorRef.markForCheck()),e&&!this._animationsDisabled&&typeof getComputedStyle=="function"){let s=getComputedStyle(i);(s.getPropertyValue("animation-duration")==="0s"||s.getPropertyValue("animation-name")==="none")&&(this._animationsDisabled=true);}e&&this._onShow(),this._animationsDisabled&&(i.classList.add("_mat-animation-noopable"),this._finalizeAnimation(e));}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-tooltip-component"]],viewQuery:function(i,r){if(i&1&&$e(W$,7),i&2){let o;ee(o=te())&&(r._tooltip=o.first);}},hostAttrs:["aria-hidden","true"],hostBindings:function(i,r){i&1&&ie("mouseleave",function(s){return r._handleMouseLeave(s)});},decls:4,vars:5,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function(i,r){i&1&&(Ze(0,"div",1,0),lf("animationend",function(s){return r._handleAnimationEnd(s)}),Ze(2,"div",2),N(3),Xe()()),i&2&&(Bn(r.tooltipClass),$$1("mdc-tooltip--multiline",r._isMultiline),C(3),Ut(r.message));},styles:[`.mat-mdc-tooltip {
  position: relative;
  transform: scale(0);
  display: inline-flex;
}
.mat-mdc-tooltip::before {
  content: "";
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before {
  top: -8px;
}
.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before {
  bottom: -8px;
}
.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before {
  left: -8px;
}
.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before {
  right: -8px;
}
.mat-mdc-tooltip._mat-animation-noopable {
  animation: none;
  transform: scale(1);
}

.mat-mdc-tooltip-surface {
  word-break: normal;
  overflow-wrap: anywhere;
  padding: 4px 8px;
  min-width: 40px;
  max-width: 200px;
  min-height: 24px;
  max-height: 40vh;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
  will-change: transform, opacity;
  background-color: var(--mat-tooltip-container-color, var(--mat-sys-inverse-surface));
  color: var(--mat-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));
  border-radius: var(--mat-tooltip-container-shape, var(--mat-sys-corner-extra-small));
  font-family: var(--mat-tooltip-supporting-text-font, var(--mat-sys-body-small-font));
  font-size: var(--mat-tooltip-supporting-text-size, var(--mat-sys-body-small-size));
  font-weight: var(--mat-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));
  line-height: var(--mat-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));
  letter-spacing: var(--mat-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking));
}
.mat-mdc-tooltip-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}
.mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: left;
}
[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface {
  text-align: right;
}

.mat-mdc-tooltip-panel {
  line-height: normal;
}
.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive {
  pointer-events: none;
}

@keyframes mat-mdc-tooltip-show {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes mat-mdc-tooltip-hide {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
.mat-mdc-tooltip-show {
  animation: mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

.mat-mdc-tooltip-hide {
  animation: mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
`],encapsulation:2})}return t})();var _h=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ec,mi,Ce,Bo]})}return t})();var tG="__lodash_hash_undefined__";function nG(t){return this.__data__.set(t,tG),this}var FT=nG;function iG(t){return this.__data__.has(t)}var PT=iG;function yh(t){var n=-1,e=t==null?0:t.length;for(this.__data__=new Nm;++n<e;)this.add(t[n]);}yh.prototype.add=yh.prototype.push=FT;yh.prototype.has=PT;var LT=yh;function rG(t,n){for(var e=-1,i=t==null?0:t.length;++e<i;)if(n(t[e],e,t))return  true;return  false}var jT=rG;function oG(t,n){return t.has(n)}var BT=oG;var sG=1,aG=2;function lG(t,n,e,i,r,o){var s=e&sG,a=t.length,l=n.length;if(a!=l&&!(s&&l>a))return  false;var c=o.get(t),u=o.get(n);if(c&&u)return c==n&&u==t;var f=-1,m=true,h=e&aG?new LT:void 0;for(o.set(t,n),o.set(n,t);++f<a;){var p=t[f],b=n[f];if(i)var x=s?i(b,p,f,n,t,o):i(p,b,f,t,n,o);if(x!==void 0){if(x)continue;m=false;break}if(h){if(!jT(n,function(P,_e){if(!BT(h,_e)&&(p===P||r(p,P,e,i,o)))return h.push(_e)})){m=false;break}}else if(!(p===b||r(p,b,e,i,o))){m=false;break}}return o.delete(t),o.delete(n),m}var bh=lG;function cG(t){var n=-1,e=Array(t.size);return t.forEach(function(i,r){e[++n]=[r,i];}),e}var VT=cG;function dG(t){var n=-1,e=Array(t.size);return t.forEach(function(i){e[++n]=i;}),e}var UT=dG;var uG=1,fG=2,mG="[object Boolean]",hG="[object Date]",pG="[object Error]",gG="[object Map]",vG="[object Number]",_G="[object RegExp]",yG="[object Set]",bG="[object String]",wG="[object Symbol]",CG="[object ArrayBuffer]",DG="[object DataView]",HT=Dn?Dn.prototype:void 0,Qy=HT?HT.valueOf:void 0;function xG(t,n,e,i,r,o,s){switch(e){case DG:if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)return  false;t=t.buffer,n=n.buffer;case CG:return !(t.byteLength!=n.byteLength||!o(new Sa(t),new Sa(n)));case mG:case hG:case vG:return pa(+t,+n);case pG:return t.name==n.name&&t.message==n.message;case _G:case bG:return t==n+"";case gG:var a=VT;case yG:var l=i&uG;if(a||(a=UT),t.size!=n.size&&!l)return  false;var c=s.get(t);if(c)return c==n;i|=fG,s.set(t,n);var u=bh(a(t),a(n),i,r,o,s);return s.delete(t),u;case wG:if(Qy)return Qy.call(t)==Qy.call(n)}return  false}var zT=xG;var EG=1,SG=Object.prototype,IG=SG.hasOwnProperty;function MG(t,n,e,i,r,o){var s=e&EG,a=Bc(t),l=a.length,c=Bc(n),u=c.length;if(l!=u&&!s)return  false;for(var f=l;f--;){var m=a[f];if(!(s?m in n:IG.call(n,m)))return  false}var h=o.get(t),p=o.get(n);if(h&&p)return h==n&&p==t;var b=true;o.set(t,n),o.set(n,t);for(var x=s;++f<l;){m=a[f];var P=t[m],_e=n[m];if(i)var He=s?i(_e,P,m,n,t,o):i(P,_e,m,t,n,o);if(!(He===void 0?P===_e||r(P,_e,e,i,o):He)){b=false;break}x||(x=m=="constructor");}if(b&&!x){var En=t.constructor,qn=n.constructor;En!=qn&&"constructor"in t&&"constructor"in n&&!(typeof En=="function"&&En instanceof En&&typeof qn=="function"&&qn instanceof qn)&&(b=false);}return o.delete(t),o.delete(n),b}var $T=MG;var TG=1,GT="[object Arguments]",WT="[object Array]",wh="[object Object]",AG=Object.prototype,qT=AG.hasOwnProperty;function kG(t,n,e,i,r,o){var s=Gi(t),a=Gi(n),l=s?WT:qi(t),c=a?WT:qi(n);l=l==GT?wh:l,c=c==GT?wh:c;var u=l==wh,f=c==wh,m=l==c;if(m&&qo(t)){if(!qo(n))return  false;s=true,u=false;}if(m&&!u)return o||(o=new ba),s||jm(t)?bh(t,n,e,i,r,o):zT(t,n,l,e,i,r,o);if(!(e&TG)){var h=u&&qT.call(t,"__wrapped__"),p=f&&qT.call(n,"__wrapped__");if(h||p){var b=h?t.value():t,x=p?n.value():n;return o||(o=new ba),r(b,x,e,i,o)}}return m?(o||(o=new ba),$T(t,n,e,i,r,o)):false}var YT=kG;function ZT(t,n,e,i,r){return t===n?true:t==null||n==null||!rn(t)&&!rn(n)?t!==t&&n!==n:YT(t,n,e,i,ZT,r)}var KT=ZT;function RG(t,n){return KT(t,n)}var La=RG;var Xy=(()=>{class t{_dataService=d(Nr);_destroy$=new _;ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}createGameGroup(e){return this._dataService.createGameGroup(e).pipe(A(this._destroy$))}getGameGroupById(e){return this._dataService.getGameGroupById(e)}getGameGroups(){return this._dataService.getGameGroups().pipe(A(this._destroy$))}updateGameGroup(e){return this._dataService.updateGameGroup(e).pipe(A(this._destroy$))}deleteGameGroup(e){return this._dataService.deleteGameGroup(e).pipe(A(this._destroy$))}checkStructure(e){let i=["id","name","dateEdit"],r=s=>s.filter(a=>i.includes(a));return !e.filter(s=>{let a=r(Object.keys(s));return !La(i.sort(),a.sort())}).length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();var QT=(()=>{class t{_dataService=d(Nr);_destroy$=new _;ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}get mockGame(){return {id:"ERROR",name:"\u0427\u0442\u043E \u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A \\(\u041E-\u041E)/",logo:"/assets/omg.jpg",platforms:[Zt.STEAM],dateEdit:"2023-12-12T13:42:08.914Z"}}createGame(e){return this._dataService.createGame(e).pipe(A(this._destroy$))}getGameById(e){return this._dataService.getGameById(e)}getGames(){return this._dataService.getGames().pipe(A(this._destroy$))}updateGame(e){return this._dataService.updateGame(e).pipe(A(this._destroy$))}updateGames(e){return this._dataService.updateGames(e).pipe(A(this._destroy$))}deleteGame(e){return this._dataService.deleteGame(e).pipe(A(this._destroy$))}searchGamesByName(e){let i=[{field:"name",operator:"like",value:e}];return this._dataService.searchGames(i)}searchGamesByGroup(e){let i=[{field:"groups",operator:"eq",value:e}];return this._dataService.searchGames(i)}searchGamesByAccount(e){let i=[{field:"accounts",operator:"eq",value:e}];return this._dataService.searchGames(i)}deleteGroupFromGame(e,i){let r=this.getGameById(e);if(!r)throw new Error("\u0418\u0433\u0440\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430");let o=on(r);if(o?.groups?.length===1)delete o.groups;else if(o?.groups){let s=o.groups.findIndex(a=>i===a);o.groups.splice(s,1);}return this.updateGame(o)}addGameToGroup(e,i){let r=this.getGameById(e);if(!r)throw new Error("\u0418\u0433\u0440\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430");let o=on(r);return o?.groups||(o.groups=[]),o.groups.push(i),this.updateGame(o)}checkStructure(e){let i=["dateEdit","id","logo","name","platforms"],r=s=>s.filter(a=>i.includes(a));return !e.filter(s=>{let a=r(Object.keys(s));return !La(i.sort(),a.sort())}).length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Jy=(()=>{class t{_dataService=d(Nr);_destroy$=new _;ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}createGamingAccount(e){return this._dataService.createGamingAccount(e).pipe(A(this._destroy$))}getGamingAccountById(e){return this._dataService.getGamingAccountById(e)}getGamingAccounts(){return this._dataService.getGamingAccounts().pipe(A(this._destroy$))}updateGamingAccount(e){return this._dataService.updateGamingAccount(e).pipe(A(this._destroy$))}deleteGamingAccount(e){return this._dataService.deleteGamingAccount(e).pipe(A(this._destroy$))}checkStructure(e){let i=["id","name","dateEdit"],r=s=>s.filter(a=>i.includes(a));return !e.filter(s=>{let a=r(Object.keys(s));return !La(i.sort(),a.sort())}).length}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();var eb=(()=>{class t{_dataService=d(Nr);_destroy$=new _;ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}getPlatforms(){return this._dataService.getPlatforms().pipe(A(this._destroy$))}getPlatformsByTypes(e,i){return e.filter(r=>i.includes(r.type))}getPlatformByType(e){return this._dataService.getPlatformByType(e)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();var Kc=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new _;bulk={select:n=>this._select(n),deselect:n=>this._deselect(n),setSelection:n=>this._setSelection(n)};constructor(n=false,e,i=true,r){this._multiple=n,this._emitChanges=i,this.compareWith=r,e&&e.length&&(n?e.forEach(o=>this._markSelected(o)):this._markSelected(e[0]),this._selectedToEmit.length=0);}select(...n){return this._select(n)}deselect(...n){return this._deselect(n)}setSelection(...n){return this._setSelection(n)}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=true){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return !this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n);}isMultipleSelection(){return this._multiple}_select(n){this._verifyValueAssignment(n),n.forEach(i=>this._markSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(n){this._verifyValueAssignment(n),n.forEach(i=>this._unmarkSelected(i));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(n){this._verifyValueAssignment(n);let e=this.selected,i=new Set(n.map(o=>this._getConcreteValue(o)));n.forEach(o=>this._markSelected(o)),e.filter(o=>!i.has(this._getConcreteValue(o,i))).forEach(o=>this._unmarkSelected(o));let r=this._hasQueuedChanges();return this._emitChangeEvent(),r}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[]);}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n));}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n));}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n));}_verifyValueAssignment(n){n.length>1&&this._multiple;}_hasQueuedChanges(){return !!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let i of e)if(this.compareWith(n,i))return i;return n}else return n}};var XT=(()=>{class t{get vertical(){return this._vertical}set vertical(e){this._vertical=bt(e);}_vertical=false;get inset(){return this._inset}set inset(e){this._inset=bt(e);}_inset=false;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(i,r){i&2&&(ce("aria-orientation",r.vertical?"vertical":"horizontal"),$$1("mat-divider-vertical",r.vertical)("mat-divider-horizontal",!r.vertical)("mat-divider-inset",r.inset));},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-divider {
  display: block;
  margin: 0;
  border-top-style: solid;
  border-top-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-top-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-vertical {
  border-top: 0;
  border-right-style: solid;
  border-right-color: var(--mat-divider-color, var(--mat-sys-outline-variant));
  border-right-width: var(--mat-divider-width, 1px);
}
.mat-divider.mat-divider-inset {
  margin-left: 80px;
}
[dir=rtl] .mat-divider.mat-divider-inset {
  margin-left: auto;
  margin-right: 80px;
}
`],encapsulation:2})}return t})(),JT=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce]})}return t})();var eA=(()=>{class t{_animationsDisabled=We();state="unchecked";disabled=false;appearance="full";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(i,r){i&2&&$$1("mat-pseudo-checkbox-indeterminate",r.state==="indeterminate")("mat-pseudo-checkbox-checked",r.state==="checked")("mat-pseudo-checkbox-disabled",r.disabled)("mat-pseudo-checkbox-minimal",r.appearance==="minimal")("mat-pseudo-checkbox-full",r.appearance==="full")("_mat-animation-noopable",r._animationsDisabled);},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(i,r){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return t})();var Ch=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[Ce]})}return t})();var tA=["*"],OG=`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`,NG=["unscopedContent"],FG=["text"],PG=[[["","matListItemAvatar",""],["","matListItemIcon",""]],[["","matListItemTitle",""]],[["","matListItemLine",""]],"*",[["","matListItemMeta",""]],[["mat-divider"]]],LG=["[matListItemAvatar],[matListItemIcon]","[matListItemTitle]","[matListItemLine]","*","[matListItemMeta]","mat-divider"];var jG=new g("ListOption"),BG=(()=>{class t{_elementRef=d(F);static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matListItemTitle",""]],hostAttrs:[1,"mat-mdc-list-item-title","mdc-list-item__primary-text"]})}return t})(),VG=(()=>{class t{_elementRef=d(F);static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matListItemLine",""]],hostAttrs:[1,"mat-mdc-list-item-line","mdc-list-item__secondary-text"]})}return t})(),UG=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","matListItemMeta",""]],hostAttrs:[1,"mat-mdc-list-item-meta","mdc-list-item__end"]})}return t})(),nA=(()=>{class t{_listOption=d(jG,{optional:true});_isAlignedAtStart(){return !this._listOption||this._listOption?._getTogglePosition()==="after"}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,hostVars:4,hostBindings:function(i,r){i&2&&$$1("mdc-list-item__start",r._isAlignedAtStart())("mdc-list-item__end",!r._isAlignedAtStart());}})}return t})(),HG=(()=>{class t extends nA{static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","matListItemAvatar",""]],hostAttrs:[1,"mat-mdc-list-item-avatar"],features:[ge]})}return t})(),zG=(()=>{class t extends nA{static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","matListItemIcon",""]],hostAttrs:[1,"mat-mdc-list-item-icon"],features:[ge]})}return t})(),$G=new g("MAT_LIST_CONFIG"),Qc=(()=>{class t{_isNonInteractive=true;get disableRipple(){return this._disableRipple}set disableRipple(e){this._disableRipple=bt(e);}_disableRipple=false;get disabled(){return this._disabled()}set disabled(e){this._disabled.set(bt(e));}_disabled=ve(false);_defaultOptions=d($G,{optional:true});static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,hostVars:1,hostBindings:function(i,r){i&2&&ce("aria-disabled",r.disabled);},inputs:{disableRipple:"disableRipple",disabled:"disabled"}})}return t})(),GG=(()=>{class t{_elementRef=d(F);_ngZone=d(O);_listBase=d(Qc,{optional:true});_platform=d(he);_hostElement;_isButtonElement;_noopAnimations=We();_avatars;_icons;set lines(e){this._explicitLines=St(e,null),this._updateItemLines(false);}_explicitLines=null;get disableRipple(){return this.disabled||this._disableRipple||this._noopAnimations||!!this._listBase?.disableRipple}set disableRipple(e){this._disableRipple=bt(e);}_disableRipple=false;get disabled(){return this._disabled()||!!this._listBase?.disabled}set disabled(e){this._disabled.set(bt(e));}_disabled=ve(false);_subscriptions=new ae;_rippleRenderer=null;_hasUnscopedTextContent=false;rippleConfig;get rippleDisabled(){return this.disableRipple||!!this.rippleConfig.disabled}constructor(){d(yt).load(la);let e=d(Mc,{optional:true});this.rippleConfig=e||{},this._hostElement=this._elementRef.nativeElement,this._isButtonElement=this._hostElement.nodeName.toLowerCase()==="button",this._listBase&&!this._listBase._isNonInteractive&&this._initInteractiveListItem(),this._isButtonElement&&!this._hostElement.hasAttribute("type")&&this._hostElement.setAttribute("type","button");}ngAfterViewInit(){this._monitorProjectedLinesAndTitle(),this._updateItemLines(true);}ngOnDestroy(){this._subscriptions.unsubscribe(),this._rippleRenderer!==null&&this._rippleRenderer._removeTriggerEvents();}_hasIconOrAvatar(){return !!(this._avatars.length||this._icons.length)}_initInteractiveListItem(){this._hostElement.classList.add("mat-mdc-list-item-interactive"),this._rippleRenderer=new zo(this,this._ngZone,this._hostElement,this._platform,d(j)),this._rippleRenderer.setupTriggerEvents(this._hostElement);}_monitorProjectedLinesAndTitle(){this._ngZone.runOutsideAngular(()=>{this._subscriptions.add(Mn(this._lines.changes,this._titles.changes).subscribe(()=>this._updateItemLines(false)));});}_updateItemLines(e){if(!this._lines||!this._titles||!this._unscopedContent)return;e&&this._checkDomForUnscopedTextContent();let i=this._explicitLines??this._inferLinesFromContent(),r=this._unscopedContent.nativeElement;if(this._hostElement.classList.toggle("mat-mdc-list-item-single-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-one-line",i<=1),this._hostElement.classList.toggle("mdc-list-item--with-two-lines",i===2),this._hostElement.classList.toggle("mdc-list-item--with-three-lines",i===3),this._hasUnscopedTextContent){let o=this._titles.length===0&&i===1;r.classList.toggle("mdc-list-item__primary-text",o),r.classList.toggle("mdc-list-item__secondary-text",!o);}else r.classList.remove("mdc-list-item__primary-text"),r.classList.remove("mdc-list-item__secondary-text");}_inferLinesFromContent(){let e=this._titles.length+this._lines.length;return this._hasUnscopedTextContent&&(e+=1),e}_checkDomForUnscopedTextContent(){this._hasUnscopedTextContent=Array.from(this._unscopedContent.nativeElement.childNodes).filter(e=>e.nodeType!==e.COMMENT_NODE).some(e=>!!(e.textContent&&e.textContent.trim()));}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,contentQueries:function(i,r,o){if(i&1&&li(o,HG,4)(o,zG,4),i&2){let s;ee(s=te())&&(r._avatars=s),ee(s=te())&&(r._icons=s);}},hostVars:4,hostBindings:function(i,r){i&2&&(ce("aria-disabled",r.disabled)("disabled",r._isButtonElement&&r.disabled||null),$$1("mdc-list-item--disabled",r.disabled));},inputs:{lines:"lines",disableRipple:"disableRipple",disabled:"disabled"}})}return t})();var iA=(()=>{class t extends Qc{_isNonInteractive=false;static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275cmp=k({type:t,selectors:[["mat-action-list"]],hostAttrs:["role","group",1,"mat-mdc-action-list","mat-mdc-list-base","mdc-list"],exportAs:["matActionList"],features:[Ne([{provide:Qc,useExisting:t}]),ge],ngContentSelectors:tA,decls:1,vars:0,template:function(i,r){i&1&&(Ve(),q(0));},styles:[`.mdc-list {
  margin: 0;
  padding: 8px 0;
  list-style-type: none;
}
.mdc-list:focus {
  outline: none;
}

.mdc-list-item {
  display: flex;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  align-items: stretch;
  cursor: pointer;
  padding-left: 16px;
  padding-right: 16px;
  background-color: var(--mat-list-list-item-container-color, transparent);
  border-radius: var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none));
}
.mdc-list-item.mdc-list-item--selected {
  background-color: var(--mat-list-list-item-selected-container-color);
}
.mdc-list-item:focus {
  outline: 0;
}
.mdc-list-item.mdc-list-item--disabled {
  cursor: auto;
}
.mdc-list-item.mdc-list-item--with-one-line {
  height: var(--mat-list-list-item-one-line-container-height, 48px);
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-two-lines {
  height: var(--mat-list-list-item-two-line-container-height, 64px);
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end {
  align-self: center;
  margin-top: 0;
}
.mdc-list-item.mdc-list-item--with-three-lines {
  height: var(--mat-list-list-item-three-line-container-height, 88px);
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 16px;
}
.mdc-list-item.mdc-list-item--selected::before, .mdc-list-item.mdc-list-item--selected:focus::before, .mdc-list-item:not(.mdc-list-item--selected):focus::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  content: "";
  pointer-events: none;
}

a.mdc-list-item {
  color: inherit;
  text-decoration: none;
}

.mdc-list-item__start {
  fill: currentColor;
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-leading-icon-size, 24px);
  height: var(--mat-list-list-item-leading-icon-size, 24px);
  margin-left: 16px;
  margin-right: 32px;
}
[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-left: 32px;
  margin-right: 16px;
}
.mdc-list-item--with-leading-icon:hover .mdc-list-item__start {
  color: var(--mat-list-list-item-hover-leading-icon-color);
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start {
  width: var(--mat-list-list-item-leading-avatar-size, 40px);
  height: var(--mat-list-list-item-leading-avatar-size, 40px);
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}
.mdc-list-item--with-leading-avatar .mdc-list-item__start, [dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 50%;
}

.mdc-list-item__end {
  flex-shrink: 0;
  pointer-events: none;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  font-family: var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));
  line-height: var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));
  font-size: var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));
  font-weight: var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));
  letter-spacing: var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking));
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));
  width: var(--mat-list-list-item-trailing-icon-size, 24px);
  height: var(--mat-list-list-item-trailing-icon-size, 24px);
}
.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end {
  color: var(--mat-list-list-item-hover-trailing-icon-color);
}
.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  color: var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary));
}

.mdc-list-item__content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  align-self: center;
  flex: 1;
  pointer-events: none;
}
.mdc-list-item--with-two-lines .mdc-list-item__content, .mdc-list-item--with-three-lines .mdc-list-item__content {
  align-self: stretch;
}

.mdc-list-item__primary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-list-item:hover .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item:focus .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface));
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text, .mdc-list-item--with-three-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after, .mdc-list-item--with-three-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}

.mdc-list-item__secondary-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  margin-top: 0;
  color: var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));
  font-family: var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));
  font-weight: var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));
  letter-spacing: var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking));
}
.mdc-list-item__secondary-text::before {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-three-lines .mdc-list-item__secondary-text {
  white-space: normal;
  line-height: 20px;
}
.mdc-list-item--with-overline .mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: auto;
}

.mdc-list-item--with-leading-radio.mdc-list-item,
.mdc-list-item--with-leading-checkbox.mdc-list-item,
.mdc-list-item--with-leading-icon.mdc-list-item,
.mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,
[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text {
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-bottom: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after {
  display: inline-block;
  width: 0;
  height: 20px;
  content: "";
  vertical-align: -20px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  display: block;
  margin-top: 0;
  line-height: normal;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,
.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 32px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-trailing-icon.mdc-list-item, [dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item {
  padding-left: 0;
  padding-right: 0;
}
.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 16px;
}

.mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-meta .mdc-list-item__end {
  -webkit-user-select: none;
  user-select: none;
  margin-left: 28px;
  margin-right: 16px;
}
[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end {
  margin-left: 16px;
  margin-right: 28px;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end {
  display: block;
  line-height: normal;
  align-self: flex-start;
  margin-top: 0;
}
.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before, .mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before {
  display: inline-block;
  width: 0;
  height: 28px;
  content: "";
  vertical-align: 0;
}

.mdc-list-item--with-leading-radio .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 8px;
  margin-right: 24px;
}
[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,
[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start {
  margin-left: 24px;
  margin-right: 8px;
}
.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,
.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-item--with-trailing-radio.mdc-list-item,
.mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 16px;
  padding-right: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item {
  padding-left: 0;
  padding-right: 16px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-left: 0;
}
[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon, [dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,
[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar {
  padding-right: 0;
}
.mdc-list-item--with-trailing-radio .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 24px;
  margin-right: 8px;
}
[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,
[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end {
  margin-left: 8px;
  margin-right: 24px;
}
.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,
.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end {
  align-self: flex-start;
  margin-top: 8px;
}

.mdc-list-group__subheader {
  margin: 0.75rem 16px;
}

.mdc-list-item--disabled .mdc-list-item__start,
.mdc-list-item--disabled .mdc-list-item__content,
.mdc-list-item--disabled .mdc-list-item__end {
  opacity: 1;
}
.mdc-list-item--disabled .mdc-list-item__primary-text,
.mdc-list-item--disabled .mdc-list-item__secondary-text {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}
.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start {
  color: var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38);
}
.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end {
  color: var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38);
}

.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing, [dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing {
  padding-left: 0;
  padding-right: 0;
}

.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text {
  color: var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface));
}

.mdc-list-item:hover::before {
  background-color: var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}

.mdc-list-item.mdc-list-item--disabled::before {
  background-color: var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item:focus::before {
  background-color: var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}

.mdc-list-item--disabled .mdc-radio,
.mdc-list-item--disabled .mdc-checkbox {
  opacity: var(--mat-list-list-item-disabled-label-text-opacity, 0.3);
}

.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar {
  border-radius: var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));
  background-color: var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container));
}

.mat-mdc-list-item-icon {
  font-size: var(--mat-list-list-item-leading-icon-size, 24px);
}

@media (forced-colors: active) {
  a.mdc-list-item--activated::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  a.mdc-list-item--activated [dir=rtl]::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-list-base {
  display: block;
}
.mat-mdc-list-base .mdc-list-item__start,
.mat-mdc-list-base .mdc-list-item__end,
.mat-mdc-list-base .mdc-list-item__content {
  pointer-events: auto;
}

.mat-mdc-list-item,
.mat-mdc-list-option {
  width: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),
.mat-mdc-list-option:not(.mat-mdc-list-item-interactive) {
  cursor: default;
}
.mat-mdc-list-item .mat-divider-inset,
.mat-mdc-list-option .mat-divider-inset {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
.mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-left: 72px;
}
[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar ~ .mat-divider-inset,
[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar ~ .mat-divider-inset {
  margin-right: 72px;
}

.mat-mdc-list-item-interactive::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  content: "";
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.mat-mdc-list-item > .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-list-item:focus-visible > .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text {
  white-space: nowrap;
  line-height: normal;
}
.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

mat-action-list button {
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  outline: inherit;
  -webkit-tap-highlight-color: transparent;
  text-align: start;
}
mat-action-list button::-moz-focus-inner {
  border: 0;
}

.mdc-list-item--with-leading-icon .mdc-list-item__start {
  margin-inline-start: var(--mat-list-list-item-leading-icon-start-space, 16px);
  margin-inline-end: var(--mat-list-list-item-leading-icon-end-space, 16px);
}

.mat-mdc-nav-list .mat-mdc-list-item {
  border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
  --mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));
}
.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated {
  background-color: var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container));
}
`],encapsulation:2})}return t})();var Cye=(()=>{class t extends Qc{static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275cmp=k({type:t,selectors:[["mat-list"]],hostAttrs:[1,"mat-mdc-list","mat-mdc-list-base","mdc-list"],exportAs:["matList"],features:[Ne([{provide:Qc,useExisting:t}]),ge],ngContentSelectors:tA,decls:1,vars:0,template:function(i,r){i&1&&(Ve(),q(0));},styles:[OG],encapsulation:2})}return t})(),rA=(()=>{class t extends GG{_lines;_titles;_meta;_unscopedContent;_itemText;get activated(){return this._activated}set activated(e){this._activated=bt(e);}_activated=false;_getAriaCurrent(){return this._hostElement.nodeName==="A"&&this._activated?"page":null}_hasBothLeadingAndTrailing(){return this._meta.length!==0&&(this._avatars.length!==0||this._icons.length!==0)}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275cmp=k({type:t,selectors:[["mat-list-item"],["a","mat-list-item",""],["button","mat-list-item",""]],contentQueries:function(i,r,o){if(i&1&&li(o,VG,5)(o,BG,5)(o,UG,5),i&2){let s;ee(s=te())&&(r._lines=s),ee(s=te())&&(r._titles=s),ee(s=te())&&(r._meta=s);}},viewQuery:function(i,r){if(i&1&&$e(NG,5)(FG,5),i&2){let o;ee(o=te())&&(r._unscopedContent=o.first),ee(o=te())&&(r._itemText=o.first);}},hostAttrs:[1,"mat-mdc-list-item","mdc-list-item"],hostVars:13,hostBindings:function(i,r){i&2&&(ce("aria-current",r._getAriaCurrent()),$$1("mdc-list-item--activated",r.activated)("mdc-list-item--with-leading-avatar",r._avatars.length!==0)("mdc-list-item--with-leading-icon",r._icons.length!==0)("mdc-list-item--with-trailing-meta",r._meta.length!==0)("mat-mdc-list-item-both-leading-and-trailing",r._hasBothLeadingAndTrailing())("_mat-animation-noopable",r._noopAnimations));},inputs:{activated:"activated"},exportAs:["matListItem"],features:[ge],ngContentSelectors:LG,decls:10,vars:0,consts:[["unscopedContent",""],[1,"mdc-list-item__content"],[1,"mat-mdc-list-item-unscoped-content",3,"cdkObserveContent"],[1,"mat-focus-indicator"]],template:function(i,r){i&1&&(Ve(PG),q(0),y(1,"span",1),q(2,1),q(3,2),y(4,"span",2,0),ie("cdkObserveContent",function(){return r._updateItemLines(true)}),q(6,3),w()(),q(7,4),q(8,5),be(9,"div",3));},dependencies:[oS],encapsulation:2})}return t})();var oA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[oa,ca,Ch,Ce,JT]})}return t})();function qG(t,n){if(t&1){let e=Rt();y(0,"button",5),ie("click",function(){gt(e);let r=z().$implicit,o=z(2);return vt(o.clickBtn.emit(r))}),y(1,"mat-icon"),N(2),w()();}if(t&2){let e=z(3);me("color",e.btnConfig.color)("matTooltip",e.btnConfig.title)("disabled",e.disabled),C(2),Ut(e.btnConfig.icon);}}function YG(t,n){if(t&1){let e=Rt();y(0,"div",2)(1,"mat-list-item",3),ie("click",function(){let r=gt(e).$implicit,o=z(2);return vt(o.clickItem.emit(r))}),N(2),w(),Q(3,qG,3,4,"button",4),w();}if(t&2){let e=n.$implicit,i=z(2);C(),me("disabled",i.disabled),C(),Je(" ",e.name," "),C(),X(i.btnConfig?3:-1);}}function ZG(t,n){if(t&1&&(y(0,"div",0)(1,"mat-action-list",1),Pl(2,YG,4,3,"div",2,Fl),w()()),t&2){let e=z();C(),me("className",e.orientation),C(),Ll(e.buttonsList);}}var sA=(()=>{class t{buttonsList=[];orientation="vertical";btnConfig;disabled=false;clickItem=new K;clickBtn=new K;static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-btn-list"]],inputs:{buttonsList:"buttonsList",orientation:"orientation",btnConfig:"btnConfig",disabled:"disabled"},outputs:{clickItem:"clickItem",clickBtn:"clickBtn"},decls:1,vars:1,consts:[[1,"btn-list"],[3,"className"],[1,"btn-list__item"],[3,"click","disabled"],["mat-fab","",1,"btn-list__right",3,"color","matTooltip","disabled"],["mat-fab","",1,"btn-list__right",3,"click","color","matTooltip","disabled"]],template:function(i,r){i&1&&Q(0,ZG,4,1,"div",0),i&2&&X(r.buttonsList?.length?0:-1);},dependencies:[oA,iA,rA,jr,Gn,da,_h,Zc],styles:[".mat-icon.red[_ngcontent-%COMP%]{color:#f44336}.mat-icon.green[_ngcontent-%COMP%]{color:green}.horizontal[_ngcontent-%COMP%]{display:flex;flex-direction:row;padding:0;width:100%}.vertical[_ngcontent-%COMP%]{padding:0;width:100%}.btn-list[_ngcontent-%COMP%]{display:flex;border:1px solid grey;border-radius:5px;margin-bottom:10px;padding:10px}.btn-list__item[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:space-between;align-items:center}.btn-list__right[_ngcontent-%COMP%]{padding:0;width:34px;height:34px}.btn-list__right[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{height:26px;width:26px;font-size:26px;line-height:26px}"]})}return t})();var KG=["text"],QG=[[["mat-icon"]],"*"],XG=["mat-icon","*"];function JG(t,n){if(t&1&&be(0,"mat-pseudo-checkbox",1),t&2){let e=z();me("disabled",e.disabled)("state",e.selected?"checked":"unchecked");}}function e4(t,n){if(t&1&&be(0,"mat-pseudo-checkbox",3),t&2){let e=z();me("disabled",e.disabled);}}function t4(t,n){if(t&1&&(y(0,"span",4),N(1),w()),t&2){let e=z();C(),Je("(",e.group.label,")");}}var nb=new g("MAT_OPTION_PARENT_COMPONENT"),ib=new g("MatOptgroup");var tb=class{source;isUserInput;constructor(n,e=false){this.source=n,this.isUserInput=e;}},ja=(()=>{class t{_element=d(F);_changeDetectorRef=d(Ge);_parent=d(nb,{optional:true});group=d(ib,{optional:true});_signalDisableRipple=false;_selected=false;_active=false;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=d(at).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e);}_disabled=ve(false);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return !!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new K;_text;_stateChanges=new _;constructor(){let e=d(yt);e.load(la),e.load(ra),this._signalDisableRipple=!!this._parent&&Rn(this._parent.disableRipple);}get active(){return this._active}get viewValue(){return (this._text?.nativeElement.textContent||"").trim()}select(e=true){this._selected||(this._selected=true,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent());}deselect(e=true){this._selected&&(this._selected=false,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent());}focus(e,i){let r=this._getHostElement();typeof r.focus=="function"&&r.focus(i);}setActiveStyles(){this._active||(this._active=true,this._changeDetectorRef.markForCheck());}setInactiveStyles(){this._active&&(this._active=false,this._changeDetectorRef.markForCheck());}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!Ft(e)&&(this._selectViaInteraction(),e.preventDefault());}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:true,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(true));}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e);}}ngOnDestroy(){this._stateChanges.complete();}_emitSelectionChangeEvent(e=false){this.onSelectionChange.emit(new tb(this,e));}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-option"]],viewQuery:function(i,r){if(i&1&&$e(KG,7),i&2){let o;ee(o=te())&&(r._text=o.first);}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(i,r){i&1&&ie("click",function(){return r._selectViaInteraction()})("keydown",function(s){return r._handleKeydown(s)}),i&2&&(pn("id",r.id),ce("aria-selected",r.selected)("aria-disabled",r.disabled.toString()),$$1("mdc-list-item--selected",r.selected)("mat-mdc-option-multiple",r.multiple)("mat-mdc-option-active",r.active)("mdc-list-item--disabled",r.disabled));},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",de]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:XG,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(i,r){i&1&&(Ve(QG),Q(0,JG,1,2,"mat-pseudo-checkbox",1),q(1),y(2,"span",2,0),q(4,1),w(),Q(5,e4,1,1,"mat-pseudo-checkbox",3),Q(6,t4,2,1,"span",4),be(7,"div",5)),i&2&&(X(r.multiple?0:-1),C(5),X(!r.multiple&&r.selected&&!r.hideSingleSelectionIndicator?5:-1),C(),X(r.group&&r.group._inert?6:-1),C(),me("matRippleTrigger",r._getHostElement())("matRippleDisabled",r.disabled||r.disableRipple));},dependencies:[eA,SS],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})}return t})();function aA(t,n,e){if(e.length){let i=n.toArray(),r=e.toArray(),o=0;for(let s=0;s<t+1;s++)i[s].group&&i[s].group===r[o]&&o++;return o}return 0}function lA(t,n,e,i){return t<e?t:t+n>e+i?Math.max(0,t-i+n):e}var rb=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[ca,Ch,ja,Ce]})}return t})();var n4=["trigger"],i4=["panel"],r4=[[["mat-select-trigger"]],"*"],o4=["mat-select-trigger","*"];function s4(t,n){if(t&1&&(y(0,"span",4),N(1),w()),t&2){let e=z();C(),Ut(e.placeholder);}}function a4(t,n){t&1&&q(0);}function l4(t,n){if(t&1&&(y(0,"span",11),N(1),w()),t&2){let e=z(2);C(),Ut(e.triggerValue);}}function c4(t,n){if(t&1&&(y(0,"span",5),Q(1,a4,1,0)(2,l4,2,1,"span",11),w()),t&2){let e=z();C(),X(e.customTrigger?1:2);}}function d4(t,n){if(t&1){let e=Rt();y(0,"div",12,1),ie("keydown",function(r){gt(e);let o=z();return vt(o._handleKeydown(r))}),q(2,1),w();}if(t&2){let e=z();Bn(e.panelClass),$$1("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",e._parentFormField?.color==="primary")("mat-accent",e._parentFormField?.color==="accent")("mat-warn",e._parentFormField?.color==="warn")("mat-undefined",!e._parentFormField?.color),ce("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby());}}var u4=new g("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(j);return ()=>Wo(t)}}),f4=new g("MAT_SELECT_CONFIG"),cA=new g("MatSelectTrigger"),ob=class{source;value;constructor(n,e){this.source=n,this.value=e;}},dA=(()=>{class t{_viewportRuler=d(ji);_changeDetectorRef=d(Ge);_elementRef=d(F);_dir=d(Ht,{optional:true});_idGenerator=d(at);_renderer=d(Oe);_parentFormField=d(Yc,{optional:true});ngControl=d(gi,{self:true,optional:true});_liveAnnouncer=d(xc);_defaultOptions=d(f4,{optional:true});_animationsDisabled=We();_popoverLocation;_initialized=new _;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let i=this.options.toArray()[e];if(i){let r=this.panel.nativeElement,o=aA(e,this.options,this.optionGroups),s=i._getHostElement();e===0&&o===1?r.scrollTop=0:r.scrollTop=lA(s.offsetTop,s.offsetHeight,r.scrollTop,r.offsetHeight);}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0);}_getChangeEvent(e){return new ob(this,e)}_scrollStrategyFactory=d(u4);_panelOpen=false;_compareWith=(e,i)=>e===i;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new _;_errorStateTracker;stateChanges=new _;disableAutomaticLabeling=true;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=false;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=false;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e);}_disableRipple=ve(false);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties();}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??false;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next();}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(pi.required)??false}set required(e){this._required=e,this.stateChanges.next();}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e;}_multiple=false;disableOptionCentering=this._defaultOptions?.disableOptionCentering??false;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection();}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e);}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next();}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??false;optionSelectionChanges=In(()=>{let e=this.options;return e?e.changes.pipe(Ct(e),xe(()=>Mn(...e.map(i=>i.onSelectionChange)))):this._initialized.pipe(xe(()=>this.optionSelectionChanges))});openedChange=new K;_openedStream=this.openedChange.pipe(fe(e=>e),T$1(()=>{}));_closedStream=this.openedChange.pipe(fe(e=>!e),T$1(()=>{}));selectionChange=new K;valueChange=new K;constructor(){let e=d(vh),i=d(Wc,{optional:true}),r=d(Ko,{optional:true}),o=d(new Eo("tabindex"),{optional:true}),s=d(Fc,{optional:true});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new Pa(e,this.ngControl,r,i,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=o==null?0:parseInt(o)||0,this._popoverLocation=s?.usePopover===false?null:"inline",this.id=this.id;}ngOnInit(){this._selectionModel=new Kc(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(A(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges());});}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(A(this._destroy)).subscribe(e=>{e.added.forEach(i=>i.select()),e.removed.forEach(i=>i.deselect());}),this.options.changes.pipe(Ct(null),A(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection();});}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),i=this.ngControl;if(e!==this._triggerAriaLabelledBy){let r=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?r.setAttribute("aria-labelledby",e):r.removeAttribute("aria-labelledby");}i&&(this._previousControl!==i.control&&(this._previousControl!==void 0&&i.disabled!==null&&i.disabled!==this.disabled&&(this.disabled=i.disabled),this._previousControl=i.control),this.updateErrorState());}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass));}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete();}toggle(){this.panelOpen?this.close():this.open();}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=true,this._overlayDir.positionChange.pipe(qe(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled();}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(true)));}close(){this._panelOpen&&(this._panelOpen=false,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(false)));}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{i(),clearTimeout(r),this._cleanupDetach=void 0;};let e=this.panel.nativeElement,i=this._renderer.listen(e,"animationend",o=>{o.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay());}),r=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay();},200);e.classList.add("mat-select-panel-exit");}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck();}writeValue(e){this._assignValue(e);}registerOnChange(e){this._onChange=e;}registerOnTouched(e){this._onTouched=e;}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next();}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return "";if(this._multiple){let e=this._selectionModel.selected.map(i=>i.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState();}_isRtl(){return this._dir?this._dir.value==="rtl":false}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e));}_handleClosedKeydown(e){let i=e.keyCode,r=i===40||i===38||i===37||i===39,o=i===13||i===32,s=this._keyManager;if(!s.isTyping()&&o&&!Ft(e)||(this.multiple||e.altKey)&&r)e.preventDefault(),this.open();else if(!this.multiple){let a=this.selected;s.onKeydown(e);let l=this.selected;l&&a!==l&&this._liveAnnouncer.announce(l.viewValue,1e4);}}_handleOpenKeydown(e){let i=this._keyManager,r=e.keyCode,o=r===40||r===38,s=i.isTyping();if(o&&e.altKey)e.preventDefault(),this.close();else if(!s&&(r===13||r===32)&&i.activeItem&&!Ft(e))e.preventDefault(),i.activeItem._selectViaInteraction();else if(!s&&this._multiple&&r===65&&e.ctrlKey){e.preventDefault();let a=this.options.some(l=>!l.disabled&&!l.selected);this.options.forEach(l=>{l.disabled||(a?l.select():l.deselect());});}else {let a=i.activeItemIndex;i.onKeydown(e),this._multiple&&o&&e.shiftKey&&i.activeItem&&i.activeItemIndex!==a&&i.activeItem._selectViaInteraction();}}_handleOverlayKeydown(e){e.keyCode===27&&!Ft(e)&&(e.preventDefault(),this.close());}_onFocus(){this.disabled||(this._focused=true,this.stateChanges.next());}_onBlur(){this._focused=false,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next());}get empty(){return !this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next();});}_setSelectionByValue(e){if(this.options.forEach(i=>i.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(i=>this._selectOptionByValue(i)),this._sortValues();else {let i=this._selectOptionByValue(e);i?this._keyManager.updateActiveItem(i):this.panelOpen||this._keyManager.updateActiveItem(-1);}this._changeDetectorRef.markForCheck();}_selectOptionByValue(e){let i=this.options.find(r=>{if(this._selectionModel.isSelected(r))return  false;try{return (r.value!=null||this.canSelectNullableOptions)&&this._compareWith(r.value,e)}catch{return  false}});return i&&this._selectionModel.select(i),i}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,true):false}_skipPredicate=e=>this.panelOpen?false:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof fa?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck();}_initKeyManager(){this._keyManager=new Sc(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close());}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction();});}_resetOptions(){let e=Mn(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(A(e)).subscribe(i=>{this._onSelect(i.source,i.isUserInput),i.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus());}),Mn(...this.options.map(i=>i._stateChanges)).pipe(A(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next();});}_onSelect(e,i){let r=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(r!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),i&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),i&&this.focus())),r!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next();}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((i,r)=>this.sortComparator?this.sortComparator(i,r,e):e.indexOf(i)-e.indexOf(r)),this.stateChanges.next();}}_propagateChanges(e){let i;this.multiple?i=this.selected.map(r=>r.value):i=this.selected?this.selected.value:e,this._value=i,this.valueChange.emit(i),this._onChange(i),this.selectionChange.emit(this._getChangeEvent(i)),this._changeDetectorRef.markForCheck();}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let i=0;i<this.options.length;i++)if(!this.options.get(i).disabled){e=i;break}this._keyManager.setActiveItem(e);}else this._keyManager.setActiveItem(this._selectionModel.selected[0]);}_canOpen(){return !this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e);}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,i=e?e+" ":"";return this.ariaLabelledby?i+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute("aria-describedby",e.join(" ")):i.removeAttribute("aria-describedby");}onContainerClick(e){let i=It(e);i&&(i.tagName==="MAT-OPTION"||i.classList.contains("cdk-overlay-backdrop")||i.closest(".mat-mdc-select-panel"))||(this.focus(),this.open());}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-select"]],contentQueries:function(i,r,o){if(i&1&&li(o,cA,5)(o,ja,5)(o,ib,5),i&2){let s;ee(s=te())&&(r.customTrigger=s.first),ee(s=te())&&(r.options=s),ee(s=te())&&(r.optionGroups=s);}},viewQuery:function(i,r){if(i&1&&$e(n4,5)(i4,5)(Am,5),i&2){let o;ee(o=te())&&(r.trigger=o.first),ee(o=te())&&(r.panel=o.first),ee(o=te())&&(r._overlayDir=o.first);}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(i,r){i&1&&ie("keydown",function(s){return r._handleKeydown(s)})("focus",function(){return r._onFocus()})("blur",function(){return r._onBlur()}),i&2&&(ce("id",r.id)("tabindex",r.disabled?-1:r.tabIndex)("aria-controls",r.panelOpen?r.id+"-panel":null)("aria-expanded",r.panelOpen)("aria-label",r.ariaLabel||null)("aria-required",r.required.toString())("aria-disabled",r.disabled.toString())("aria-invalid",r.errorState)("aria-activedescendant",r._getAriaActiveDescendant()),$$1("mat-mdc-select-disabled",r.disabled)("mat-mdc-select-invalid",r.errorState)("mat-mdc-select-required",r.required)("mat-mdc-select-empty",r.empty)("mat-mdc-select-multiple",r.multiple)("mat-select-open",r.panelOpen));},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",de],disableRipple:[2,"disableRipple","disableRipple",de],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:ci(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",de],placeholder:"placeholder",required:[2,"required","required",de],multiple:[2,"multiple","multiple",de],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",de],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",ci],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",de]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[Ne([{provide:qc,useExisting:t},{provide:nb,useExisting:t}]),Ye],ngContentSelectors:o4,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(i,r){if(i&1&&(Ve(r4),y(0,"div",2,0),ie("click",function(){return r.open()}),y(3,"div",3),Q(4,s4,2,1,"span",4)(5,c4,3,1,"span",5),w(),y(6,"div",6)(7,"div",7),fr(),y(8,"svg",8),be(9,"path",9),w()()()(),Et(10,d4,3,16,"ng-template",10),ie("detach",function(){return r.close()})("backdropClick",function(){return r.close()})("overlayKeydown",function(s){return r._handleOverlayKeydown(s)})),i&2){let o=ki(1);C(3),ce("id",r._valueId),C(),X(r.empty?4:5),C(6),me("cdkConnectedOverlayDisableClose",true)("cdkConnectedOverlayPanelClass",r._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",r._scrollStrategy)("cdkConnectedOverlayOrigin",r._preferredOverlayOrigin||o)("cdkConnectedOverlayPositions",r._positions)("cdkConnectedOverlayWidth",r._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",true)("cdkConnectedOverlayUsePopover",r._popoverLocation);}},dependencies:[fa,Am],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})}return t})(),Ebe=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-select-trigger"]],features:[Ne([{provide:cA,useExisting:t}])]})}return t})(),Sbe=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({imports:[mi,rb,Ce,Bo,Xo,rb]})}return t})();function m4(t,n){}var Br=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=true;backdropClass="";disableClose=false;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=false;autoFocus="first-tabbable";restoreFocus=true;scrollStrategy;closeOnNavigation=true;closeOnDestroy=true;closeOnOverlayDetachments=true;disableAnimations=false;providers;container;templateContext;bindings};var ab=(()=>{class t extends Dr{_elementRef=d(F);_focusTrapFactory=d(fy);_config;_interactivityChecker=d(uy);_ngZone=d(O);_focusMonitor=d(Uo);_renderer=d(Oe);_changeDetectorRef=d(Ge);_injector=d(j);_platform=d(he);_document=d(B);_portalOutlet;_focusTrapped=new _;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=false;constructor(){super(),this._config=d(Br,{optional:true})||new Br,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy);}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck();}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck());}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus();}_captureInitialFocus(){this._trapFocus();}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=true,this._restoreFocus();}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus();}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),s(),e.removeAttribute("tabindex");},o=this._renderer.listen(e,"blur",r),s=this._renderer.listen(e,"mousedown",r);})),e.focus(i);}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i);}_trapFocus(e){this._isDestroyed||rt(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case  false:case "dialog":this._containsFocus()||i.focus(e);break;case  true:case "first-tabbable":this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case "first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]',e);break;default:this._focusByCssSelector(this._config.autoFocus,e);break}this._focusTrapped.next();},{injector:this._injector});}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e=="string"?i=this._document.querySelector(e):typeof e=="boolean"?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus=="function"){let r=na(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus());}this._focusTrap&&this._focusTrap.destroy();}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e);}_containsFocus(){let e=this._elementRef.nativeElement,i=na();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=na()));}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["cdk-dialog-container"]],viewQuery:function(i,r){if(i&1&&$e(xr,7),i&2){let o;ee(o=te())&&(r._portalOutlet=o.first);}},hostAttrs:["tabindex","-1",1,"cdk-dialog-container"],hostVars:6,hostBindings:function(i,r){i&2&&ce("id",r._config.id||null)("role",r._config.role)("aria-modal",r._config.ariaModal)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null);},features:[ge],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(i,r){i&1&&Et(0,m4,0,0,"ng-template",0);},dependencies:[xr],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})}return t})(),Xc=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new _;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(n,e){this.overlayRef=n,this.config=e,this.disableClose=e.disableClose,this.backdropClick=n.backdropClick(),this.keydownEvents=n.keydownEvents(),this.outsidePointerEvents=n.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!Ft(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:"keyboard"}));}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:"mouse"}):this.containerInstance._recaptureFocus?.();}),this._detachSubscription=n.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==false&&this.close();});}close(n,e){if(this._canClose(n)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||"program",this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(n),i.complete(),this.componentInstance=this.containerInstance=null;}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(n="",e=""){return this.overlayRef.updateSize({width:n,height:e}),this}addPanelClass(n){return this.overlayRef.addPanelClass(n),this}removePanelClass(n){return this.overlayRef.removePanelClass(n),this}_canClose(n){let e=this.config;return !!this.containerInstance&&(!e.closePredicate||e.closePredicate(n,e,this.componentInstance))}},h4=new g("DialogScrollStrategy",{providedIn:"root",factory:()=>{let t=d(j);return ()=>ma(t)}}),p4=new g("DialogData"),g4=new g("DefaultDialogConfig");function v4(t){let n=ve(t),e=new K;return {valueSignal:n,get value(){return n()},change:e,ngOnDestroy(){e.complete();}}}var lb=(()=>{class t{_injector=d(j);_defaultOptions=d(g4,{optional:true});_parentDialog=d(t,{optional:true,skipSelf:true});_overlayContainer=d(Tm);_idGenerator=d(at);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new _;_afterOpenedAtThisLevel=new _;_ariaHiddenElements=new Map;_scrollStrategy=d(h4);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=In(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Ct(void 0)));open(e,i){let r=this._defaultOptions||new Br;i=v(v({},r),i),i.id=i.id||this._idGenerator.getId("cdk-dialog-"),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),s=Ui(this._injector,o),a=new Xc(s,i),l=this._attachContainer(s,a,i);if(a.containerInstance=l,!this.openDialogs.length){let c=this._overlayContainer.getContainerElement();l._focusTrapped?l._focusTrapped.pipe(qe(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(c);}):this._hideNonDialogContentFromAssistiveTechnology(c);}return this._attachDialogContent(e,a,l,i),this.openDialogs.push(a),a.closed.subscribe(()=>this._removeOpenDialog(a,true)),this.afterOpened.next(a),a}closeAll(){sb(this.openDialogs,e=>e.close());}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){sb(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===false&&this._removeOpenDialog(e,false);}),sb(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[];}_getOverlayConfig(e){let i=new Vi({positionStrategy:e.positionStrategy||Sr().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,s=[{provide:Br,useValue:r},{provide:Xc,useValue:i},{provide:ua,useValue:e}],a;r.container?typeof r.container=="function"?a=r.container:(a=r.container.type,s.push(...r.container.providers(r))):a=ab;let l=new Wn(a,r.viewContainerRef,j.create({parent:o||this._injector,providers:s}));return e.attach(l).instance}_attachDialogContent(e,i,r,o){if(e instanceof Bt){let s=this._createInjector(o,i,r,void 0),a={$implicit:o.data,dialogRef:i};o.templateContext&&(a=v(v({},a),typeof o.templateContext=="function"?o.templateContext():o.templateContext)),r.attachTemplatePortal(new Bi(e,null,a,s));}else {let s=this._createInjector(o,i,r,this._injector),a=r.attachComponentPortal(new Wn(e,o.viewContainerRef,s,null,o.bindings));i.componentRef=a,i.componentInstance=a.instance;}}_createInjector(e,i,r,o){let s=e.injector||e.viewContainerRef?.injector,a=[{provide:p4,useValue:e.data},{provide:Xc,useValue:i}];return e.providers&&(typeof e.providers=="function"?a.push(...e.providers(i,e,r)):a.push(...e.providers)),e.direction&&(!s||!s.get(Ht,null,{optional:true}))&&a.push({provide:Ht,useValue:v4(e.direction)}),j.create({parent:s||o,providers:a})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,s)=>{o?s.setAttribute("aria-hidden",o):s.removeAttribute("aria-hidden");}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()));}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!=="SCRIPT"&&o.nodeName!=="STYLE"&&!o.hasAttribute("aria-live")&&!o.hasAttribute("popover")&&(this._ariaHiddenElements.set(o,o.getAttribute("aria-hidden")),o.setAttribute("aria-hidden","true"));}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})();function sb(t,n){let e=t.length;for(;e--;)n(t[e]);}var uA=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({providers:[lb],imports:[mi,Er,Ec,Er]})}return t})();function _4(t,n){}var Sh=class{viewContainerRef;injector;id;role="dialog";panelClass="";hasBackdrop=true;backdropClass="";disableClose=false;closePredicate;width="";height="";minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=false;autoFocus="first-tabbable";restoreFocus=true;delayFocusTrap=true;scrollStrategy;closeOnNavigation=true;enterAnimationDuration;exitAnimationDuration;bindings},cb="mdc-dialog--open",fA="mdc-dialog--opening",mA="mdc-dialog--closing",y4=150,b4=75,w4=(()=>{class t extends ab{_animationStateChanged=new K;_animationsEnabled=!We();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?pA(this._config.enterAnimationDuration)??y4:0;_exitAnimationDuration=this._animationsEnabled?pA(this._config.exitAnimationDuration)??b4:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation();}_startOpenAnimation(){this._animationStateChanged.emit({state:"opening",totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(hA,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(fA,cb)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(cb),Promise.resolve().then(()=>this._finishDialogOpen()));}_startExitAnimation(){this._animationStateChanged.emit({state:"closing",totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(cb),this._animationsEnabled?(this._hostElement.style.setProperty(hA,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(mA)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose());}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck();}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration);};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:"closed",totalTime:this._exitAnimationDuration});};_clearAnimationClasses(){this._hostElement.classList.remove(fA,mA);}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e);}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame=="function"?requestAnimationFrame(e):e();});}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus();}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:"opened",totalTime:e});}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer);}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add("mat-mdc-dialog-component-host"),i}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275cmp=k({type:t,selectors:[["mat-dialog-container"]],hostAttrs:["tabindex","-1",1,"mat-mdc-dialog-container","mdc-dialog"],hostVars:10,hostBindings:function(i,r){i&2&&(pn("id",r._config.id),ce("aria-modal",r._config.ariaModal)("role",r._config.role)("aria-labelledby",r._config.ariaLabel?null:r._ariaLabelledByQueue[0])("aria-label",r._config.ariaLabel)("aria-describedby",r._config.ariaDescribedBy||null),$$1("_mat-animation-noopable",!r._animationsEnabled)("mat-mdc-dialog-container-with-actions",r._actionSectionCount>0));},features:[ge],decls:3,vars:0,consts:[[1,"mat-mdc-dialog-inner-container","mdc-dialog__container"],[1,"mat-mdc-dialog-surface","mdc-dialog__surface"],["cdkPortalOutlet",""]],template:function(i,r){i&1&&(y(0,"div",0)(1,"div",1),Et(2,_4,0,0,"ng-template",2),w()());},dependencies:[xr],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--mat-dialog-container-max-width, 560px);
  min-width: var(--mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--mat-dialog-container-elevation-shadow, none);
  border-radius: var(--mat-dialog-container-shape, var(--mat-sys-corner-extra-large, 4px));
  background-color: var(--mat-dialog-container-color, var(--mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--mat-dialog-subhead-color, var(--mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--mat-dialog-subhead-font, var(--mat-sys-headline-small-font, inherit));
  line-height: var(--mat-dialog-subhead-line-height, var(--mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--mat-dialog-subhead-size, var(--mat-sys-headline-small-size, 1rem));
  font-weight: var(--mat-dialog-subhead-weight, var(--mat-sys-headline-small-weight, 400));
  letter-spacing: var(--mat-dialog-subhead-tracking, var(--mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--mat-dialog-supporting-text-color, var(--mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--mat-dialog-supporting-text-font, var(--mat-sys-body-medium-font, inherit));
  line-height: var(--mat-dialog-supporting-text-line-height, var(--mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--mat-dialog-supporting-text-size, var(--mat-sys-body-medium-size, 1rem));
  font-weight: var(--mat-dialog-supporting-text-weight, var(--mat-sys-body-medium-weight, 400));
  letter-spacing: var(--mat-dialog-supporting-text-tracking, var(--mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})}return t})(),hA="--mat-dialog-transition-duration";function pA(t){return t==null?null:typeof t=="number"?t:t.endsWith("ms")?St(t.substring(0,t.length-2)):t.endsWith("s")?St(t.substring(0,t.length-1))*1e3:t==="0"?0:null}var Eh=(function(t){return t[t.OPEN=0]="OPEN",t[t.CLOSING=1]="CLOSING",t[t.CLOSED=2]="CLOSED",t})(Eh||{}),Mt=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new Zi(1);_beforeClosed=new Zi(1);_result;_closeFallbackTimeout;_state=Eh.OPEN;_closeInteractionType;constructor(n,e,i){this._ref=n,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=n.id,n.addPanelClass("mat-mdc-dialog-panel"),i._animationStateChanged.pipe(fe(r=>r.state==="opened"),qe(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete();}),i._animationStateChanged.pipe(fe(r=>r.state==="closed"),qe(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose();}),n.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose();}),Mn(this.backdropClick(),this.keydownEvents().pipe(fe(r=>r.keyCode===27&&!this.disableClose&&!Ft(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),gA(this,r.type==="keydown"?"keyboard":"mouse"));});}close(n){let e=this._config.closePredicate;e&&!e(n,this._config,this.componentInstance)||(this._result=n,this._containerInstance._animationStateChanged.pipe(fe(i=>i.state==="closing"),qe(1)).subscribe(i=>{this._beforeClosed.next(n),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100);}),this._state=Eh.CLOSING,this._containerInstance._startExitAnimation());}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(n){let e=this._ref.config.positionStrategy;return n&&(n.left||n.right)?n.left?e.left(n.left):e.right(n.right):e.centerHorizontally(),n&&(n.top||n.bottom)?n.top?e.top(n.top):e.bottom(n.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(n="",e=""){return this._ref.updateSize(n,e),this}addPanelClass(n){return this._ref.addPanelClass(n),this}removePanelClass(n){return this._ref.removePanelClass(n),this}getState(){return this._state}_finishDialogClose(){this._state=Eh.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null;}};function gA(t,n,e){return t._closeInteractionType=n,t.close(e)}var Jo=new g("MatMdcDialogData"),C4=new g("mat-mdc-dialog-default-options"),D4=new g("mat-mdc-dialog-scroll-strategy",{providedIn:"root",factory:()=>{let t=d(j);return ()=>ma(t)}}),Jc=(()=>{class t{_defaultOptions=d(C4,{optional:true});_scrollStrategy=d(D4);_parentDialog=d(t,{optional:true,skipSelf:true});_idGenerator=d(at);_injector=d(j);_dialog=d(lb);_animationsDisabled=We();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new _;_afterOpenedAtThisLevel=new _;dialogConfigClass=Sh;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=In(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(Ct(void 0)));constructor(){this._dialogRefConstructor=Mt,this._dialogContainerType=w4,this._dialogDataToken=Jo;}open(e,i){let r;i=v(v({},this._defaultOptions||new Sh),i),i.id=i.id||this._idGenerator.getId("mat-mdc-dialog-"),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,Y(v({},i),{positionStrategy:Sr(this._injector).centerHorizontally().centerVertically(),disableClose:true,closePredicate:void 0,closeOnDestroy:false,closeOnOverlayDetachments:false,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()==="0"||i.exitAnimationDuration?.toString()==="0",container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:Br,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(s,a,l)=>(r=new this._dialogRefConstructor(s,i,l),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:l},{provide:this._dialogDataToken,useValue:a.data},{provide:this._dialogRefConstructor,useValue:r}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let s=this.openDialogs.indexOf(r);s>-1&&(this.openDialogs.splice(s,1),this.openDialogs.length||this._getAfterAllClosed().next());}),r}closeAll(){this._closeDialogs(this.openDialogs);}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete();}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close();}static \u0275fac=function(i){return new(i||t)};static \u0275prov=S({token:t,factory:t.\u0275fac})}return t})(),vA=(()=>{class t{dialogRef=d(Mt,{optional:true});_elementRef=d(F);_dialog=d(Jc);ariaLabel;type="button";dialogResult;_matDialogClose;ngOnInit(){this.dialogRef||(this.dialogRef=yA(this._elementRef,this._dialog.openDialogs));}ngOnChanges(e){let i=e._matDialogClose;i&&(this.dialogResult=i.currentValue);}_onButtonClick(e){this._elementRef.nativeElement.getAttribute("aria-disabled")!=="true"&&gA(this.dialogRef,e.screenX===0&&e.screenY===0?"keyboard":"mouse",this.dialogResult);}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["","mat-dialog-close",""],["","matDialogClose",""]],hostVars:2,hostBindings:function(i,r){i&1&&ie("click",function(s){return r._onButtonClick(s)}),i&2&&ce("aria-label",r.ariaLabel||null)("type",r.type);},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],type:"type",dialogResult:[0,"mat-dialog-close","dialogResult"],_matDialogClose:[0,"matDialogClose","_matDialogClose"]},exportAs:["matDialogClose"],features:[Ye]})}return t})(),x4=(()=>{class t{_dialogRef=d(Mt,{optional:true});_elementRef=d(F);_dialog=d(Jc);ngOnInit(){this._dialogRef||(this._dialogRef=yA(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd();});}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove();});}static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t})}return t})();var _A=(()=>{class t extends x4{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1);}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1);}static \u0275fac=(()=>{let e;return function(r){return (e||(e=ft(t)))(r||t)}})();static \u0275dir=I({type:t,selectors:[["","mat-dialog-actions",""],["mat-dialog-actions"],["","matDialogActions",""]],hostAttrs:[1,"mat-mdc-dialog-actions","mdc-dialog__actions"],hostVars:6,hostBindings:function(i,r){i&2&&$$1("mat-mdc-dialog-actions-align-start",r.align==="start")("mat-mdc-dialog-actions-align-center",r.align==="center")("mat-mdc-dialog-actions-align-end",r.align==="end");},inputs:{align:"align"},features:[ge]})}return t})();function yA(t,n){let e=t.nativeElement.parentElement;for(;e&&!e.classList.contains("mat-mdc-dialog-container");)e=e.parentElement;return e?n.find(i=>i.id===e.id):null}var vi=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=V({providers:[Jc],imports:[uA,mi,Er,Ce]})}return t})();var S4=["*"];var I4=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],M4=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],T4=new g("MAT_CARD_CONFIG"),Vr=(()=>{class t{appearance;constructor(){let e=d(T4,{optional:true});this.appearance=e?.appearance||"raised";}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&$$1("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled");},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:S4,decls:1,vars:0,template:function(i,r){i&1&&(Ve(),q(0));},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2})}return t})(),Ur=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return t})();var Hr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return t})();var Ba=(()=>{class t{align="start";static \u0275fac=function(i){return new(i||t)};static \u0275dir=I({type:t,selectors:[["mat-card-actions"]],hostAttrs:[1,"mat-mdc-card-actions","mdc-card__actions"],hostVars:2,hostBindings:function(i,r){i&2&&$$1("mat-mdc-card-actions-align-end",r.align==="end");},inputs:{align:"align"},exportAs:["matCardActions"]})}return t})(),zr=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:M4,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(i,r){i&1&&(Ve(I4),q(0),Ze(1,"div",0),q(2,1),Xe(),q(3,2));},encapsulation:2})}return t})();function A4(t,n){if(t&1&&(y(0,"span",2),N(1),w()),t&2){let e=z();C(),Je(" ",e.text," ");}}var bA=(()=>{class t{text="";static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-load-block"]],inputs:{text:"text"},decls:3,vars:2,consts:[[1,"load-block"],[1,"load-block__spinner",3,"diameter"],[1,"load-block__text"]],template:function(i,r){i&1&&(y(0,"div",0),be(1,"mat-spinner",1),Q(2,A4,2,1,"span",2),w()),i&2&&(C(),me("diameter",30),C(),X(r.text?2:-1));},dependencies:[Tf,HE],styles:[".load-block[_ngcontent-%COMP%]{display:flex;align-items:center;border:2px solid gray;border-radius:50px;padding:10px}.load-block__text[_ngcontent-%COMP%]{margin-left:10px}"]})}return t})();function k4(t,n){t&1&&(y(0,"mat-icon",3),N(1," check_circle "),w());}function R4(t,n){t&1&&(y(0,"mat-icon",4),N(1," error "),w());}function O4(t,n){if(t&1&&(y(0,"div",9)(1,"span",14),N(2),w(),y(3,"span"),N(4),w()()),t&2){let e=n.$implicit;C(2),Je(" ",e.title," "),C(2),Ut(e.text);}}function N4(t,n){t&1&&(y(0,"mat-form-field",11)(1,"mat-label"),N(2,"ID \u043A\u043B\u0438\u0435\u043D\u0442\u0430"),w(),be(3,"input",15),ef(),w()),t&2&&(C(3),tf());}function F4(t,n){if(t&1){let e=Rt();y(0,"div",17)(1,"button",18),ie("click",function(){gt(e);let r=z(2);return vt(r.openWindowToken())}),be(2,"img",19),N(3," \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0442\u043E\u043A\u0435\u043D \u042F\u043D\u0434\u0435\u043A\u0441.\u0414\u0438\u0441\u043A "),w()();}if(t&2){let e=z(2);C(),me("disabled",!e.form.controls.clientId?.valid);}}function P4(t,n){if(t&1&&(y(0,"mat-form-field",11)(1,"mat-label"),N(2,"\u0422\u043E\u043A\u0435\u043D"),w(),be(3,"textarea",16),ef(),w(),Q(4,F4,4,1,"div",17)),t&2){let e=z();C(3),tf(),C(),X(e.authService.isAuthorized()?-1:4);}}function L4(t,n){if(t&1){let e=Rt();y(0,"button",20),ie("click",function(){gt(e);let r=z();return vt(r.logout())}),y(1,"mat-icon"),N(2,"exit_to_app"),w(),N(3," \u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u042F\u043D\u0434\u0435\u043A\u0441\xA0\u0414\u0438\u0441\u043A "),w();}}function j4(t,n){if(t&1&&be(0,"app-load-block",21),t&2){let e=z();me("text",e.status);}}function B4(t,n){if(t&1){let e=Rt();y(0,"button",23),ie("click",function(){gt(e);let r=z(3);return vt(r.login())}),y(1,"mat-icon"),N(2,"login"),w(),N(3," \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F "),w();}if(t&2){let e=z(3);me("disabled",!e.form.valid);}}function V4(t,n){if(t&1&&Q(0,j4,1,1,"app-load-block",21)(1,B4,4,1,"button",22),t&2){let e=n;X(e&&e.isLoad?0:1);}}function U4(t,n){if(t&1&&(Q(0,V4,2,1),hf(1,"async")),t&2){let e,i=z();X((e=pf(1,1,i.isLoad$))?0:-1,e);}}var wA=(()=>{class t{dialogRef=d(Mt);authService=d(Or);_fb=d(rT);_ydxDiskService=d(Vc);_snackBar=d(Ir);_diskService=d(Vc);_dataLocalService=d(ka);_fileService=d(Ta);form;disabledForm=true;infoList=[];_currentToken;isLoad$=new Ke({isLoad:false,status:""});_destroy$=new _;ngOnInit(){this._initInfoList(),this._initForm();}ngOnDestroy(){this._destroy$.next(),this._destroy$.complete(),this.isLoad$.complete();}_initForm(){this.disabledForm=this.authService.isAuthorized();let e=this.authService.getToken(),i=this.authService.getCliendId();this.form=this._fb.group({token:this._createTokenControl(e,this.disabledForm),clientId:this._createCliendIdControl(i,this.disabledForm)});}login(){if(this.form.valid){let{clientId:e,token:i}=this.form.getRawValue();e&&i&&(this._currentToken=i,this._auth(this._currentToken).pipe(A(this._destroy$),xe(()=>this._checkExistsFolder(this._currentToken)),xe(r=>r?R(true):this._createFolder(i)),xe(()=>this._syncData())).subscribe(()=>{this.isLoad$.next({isLoad:false,status:"\u0423\u0441\u043F\u0435\u0448\u043D\u043E!"}),e&&this.authService.saveCliendId(e),i&&this.authService.saveToken(i),this._openSnackBar("\u2705 \u0423\u0441\u043F\u0435\u0448\u043D\u0430\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F! \u2705"),this.dialogRef.close("syncData");}));}}logout(){this.authService.logout(),this.dialogRef.close("syncData");}openWindowToken(){let e=this.form.value.clientId;e&&this.authService.openWindowToken(e);}_openSnackBar(e,i="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"){this._snackBar.open(e,i,{duration:5e3});}_createTokenControl(e,i=false){return this._fb.control({value:e,disabled:i},pi.required)}_createCliendIdControl(e,i=false){return this._fb.control({value:e,disabled:i},[pi.required])}_auth(e){return this.isLoad$.next({isLoad:true,status:"\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F..."}),this._ydxDiskService.checkAccess(e).pipe(je(i=>(console.error(i),this._openSnackBar("\u26D4 \u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438! \u26D4"),this.isLoad$.next({isLoad:false,status:"\u041E\u0448\u0438\u0431\u043A\u0430."}),De)))}_checkExistsFolder(e){return this.isLoad$.next({isLoad:true,status:"\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0434\u0438\u0441\u043A\u0430..."}),this._diskService.checkExistsFolder(e)}_createFolder(e){return this.isLoad$.next({isLoad:true,status:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043F\u0430\u043F\u043A\u0438..."}),this._ydxDiskService.createFolder(e).pipe(je(i=>(console.error(i),this._openSnackBar("\u26D4 \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0430\u043F\u043A\u0438! \u26D4"),this.isLoad$.next({isLoad:false,status:"\u041E\u0448\u0438\u0431\u043A\u0430."}),De)))}_syncData(){return this.isLoad$.next({isLoad:true,status:"\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445..."}),Zn([this._dataLocalService.getGames(),this._dataLocalService.getGameGroups()]).pipe(A(this._destroy$),xe(([e,i])=>Zn([this._syncGames(e),this._syncGameGroups(i)])),T$1(()=>true),je(e=>(console.error(e),this._openSnackBar("\u26D4 \u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u0438\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438! \u26D4"),this.isLoad$.next({isLoad:false,status:"\u041E\u0448\u0438\u0431\u043A\u0430."}),De)))}_syncGames(e){return e.length?this._diskService.downloadFile(ue.GAMES,this._currentToken).pipe(A(this._destroy$),xe(i=>{if(i.status){let r=new Map(i.jsonData.map(s=>[s.id,s]));e.forEach(s=>{let a=r.get(s.id);if(!a)r.set(s.id,s);else {let l=new Date(s.dateEdit),c=new Date(a.dateEdit);l>c&&r.set(s.id,s);}});let o=this._fileService.generateFile([...r.values()]);return this._diskService.uploadFile(o,ue.GAMES,this._currentToken)}else {let r=this._fileService.generateFile(e);return this._diskService.uploadFile(r,ue.GAMES,this._currentToken)}}),T$1(()=>(this._dataLocalService.cleanGames(),true))):R(true)}_syncGameGroups(e){return e.length?this._diskService.downloadFile(ue.GAMES_GROUPS,this._currentToken).pipe(A(this._destroy$),xe(i=>{if(i.status){let r=new Map(i.jsonData.map(s=>[s.id,s]));e.forEach(s=>{let a=r.get(s.id);if(!a)r.set(s.id,s);else {let l=new Date(s.dateEdit),c=new Date(a.dateEdit);l>c&&r.set(s.id,s);}});let o=this._fileService.generateFile([...r.values()]);return this._diskService.uploadFile(o,ue.GAMES_GROUPS,this._currentToken)}else {let r=this._fileService.generateFile(e);return this._diskService.uploadFile(r,ue.GAMES_GROUPS,this._currentToken)}}),T$1(()=>(this._dataLocalService.cleanGameGroups(),true))):R(true)}_initInfoList(){this.infoList=[{title:"\u041F\u0430\u043F\u043A\u0430 \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445:",text:pt.folderPath},{title:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u0430 \u0441 \u0438\u0433\u0440\u0430\u043C\u0438:",text:ue.GAMES},{title:"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u0430 \u0441 \u0433\u0440\u0443\u043F\u043F\u0430\u043C\u0438 \u0438\u0433\u0440:",text:ue.GAMES_GROUPS}];}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-auth-dialog"]],decls:27,vars:8,consts:[[1,"auth"],[1,"auth__header"],[1,"auth__title"],["matTooltip","\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D",1,"green","mr"],["matTooltip","\u041D\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D",1,"red","mr"],["matMiniFab","","color","primary",3,"click","disabled"],[1,"link-list"],["mat-button","","color","warn","href","https://yandex.ru/dev/id/doc/ru/register-api","target","_blank"],[1,"info-list"],[1,"info-list__item"],[3,"formGroup"],["appearance","outline","subscriptSizing","dynamic",1,"auth__field"],["align","end"],["matFab","","extended","",1,"mat-button","black"],[1,"info-list__title"],["matInput","","placeholder","ID \u043A\u043B\u0438\u0435\u043D\u0442\u0430","formControlName","clientId"],["matInput","","placeholder","\u0422\u043E\u043A\u0435\u043D","rows","5","formControlName","token"],[1,"auth__login"],["matFab","","extended","",1,"mat-button","black",3,"click","disabled"],["src","/assets/yandex.png","alt","Icon","width","30","height","30",1,"mr"],["matFab","","extended","",1,"mat-button","black",3,"click"],[3,"text"],["color","accent","matFab","","extended","",1,"mat-button",3,"disabled"],["color","accent","matFab","","extended","",1,"mat-button",3,"click","disabled"]],template:function(i,r){if(i&1&&(y(0,"mat-card",0)(1,"mat-card-header",1)(2,"mat-card-title")(3,"div",2),Q(4,k4,2,0,"mat-icon",3)(5,R4,2,0,"mat-icon",4),N(6," \u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F \u0432 \u042F\u043D\u0434\u0435\u043A\u0441 \u0414\u0438\u0441\u043A "),y(7,"button",5),hf(8,"async"),ie("click",function(){return r.dialogRef.close()}),y(9,"mat-icon"),N(10,"close"),w()()(),be(11,"mat-divider"),y(12,"div",6)(13,"a",7),N(14,"\u041A\u0430\u043A \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C clientId \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u042F\u043D\u0434\u0435\u043A\u0441 \u0414\u0438\u0441\u043A?"),w()(),be(15,"mat-divider"),y(16,"div",8),Pl(17,O4,5,2,"div",9,Fl),w(),be(19,"mat-divider"),w()(),y(20,"mat-card-content")(21,"form",10),Q(22,N4,4,0,"mat-form-field",11),Q(23,P4,5,1),w()(),y(24,"mat-card-actions",12),Q(25,L4,4,0,"button",13)(26,U4,2,3),w()()),i&2){let o;C(4),X(r.authService.isAuthorized()?4:5),C(3),me("disabled",(o=pf(8,6,r.isLoad$))==null?null:o.isLoad),C(10),Ll(r.infoList),C(4),me("formGroup",r.form),C(),X(r.form.get("clientId")?22:-1),C(),X(r.form.get("token")?23:-1),C(2),X(r.authService.isAuthorized()?25:26);}},dependencies:[Xo,Qo,Lr,kT,AT,Gn,Cr,RS,da,jr,oT,tT,ch,JM,eT,zr,Vr,Hr,Ur,Ba,vi,_h,Zc,sT,Ko,Zy,bA,XT,o_],styles:[".mt[_ngcontent-%COMP%]{margin-top:10px}.mb[_ngcontent-%COMP%]{margin-bottom:10px}.mr[_ngcontent-%COMP%]{margin-right:10px}.ml[_ngcontent-%COMP%]{margin-left:10px}.mat-icon.red[_ngcontent-%COMP%]{color:#f44336}.mat-icon.green[_ngcontent-%COMP%]{color:green}  .mat-button.black{background-color:#000!important;color:#fff!important}  .mdc-button__label{display:flex;align-items:center}  .mat-mdc-fab[disabled]{background-color:#e0e0e0!important}  mat-card-header .mat-mdc-card-header-text{width:100%}mat-card-title[_ngcontent-%COMP%]{width:100%}mat-card-title[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{height:40px;width:40px;font-size:40px;line-height:40px}mat-card-title[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:auto}.auth__header[_ngcontent-%COMP%]{margin-bottom:20px}.auth__header[_ngcontent-%COMP%]   mat-divider[_ngcontent-%COMP%]{margin-top:10px;margin-bottom:10px}.auth__field[_ngcontent-%COMP%]{width:100%;margin-bottom:10px}.auth__login[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:10px}.auth__login[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border-radius:15px;width:100%}.auth__title[_ngcontent-%COMP%]{display:flex;align-items:center}.info-list[_ngcontent-%COMP%]{font-size:16px}.info-list__title[_ngcontent-%COMP%]{margin-right:10px;font-weight:700}"]})}return t})();var H4=["fileInput"];function z4(t,n){if(t&1){let e=Rt();y(0,"mat-card",6)(1,"mat-card-header")(2,"mat-card-title"),N(3,"\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 JSON\u2011\u0444\u0430\u0439\u043B\u0430"),w()(),y(4,"mat-card-content",2)(5,"app-btn-list",3),ie("clickBtn",function(r){gt(e);let o=z();return vt(o.selectUploaddData(r))}),w(),y(6,"input",7,0),ie("change",function(r){gt(e);let o=z();return vt(o.onFileChange(r))}),w()()();}if(t&2){let e=z();C(5),me("buttonsList",e.uploadList)("btnConfig",e.btnUploadConfig);}}var CA=(()=>{class t{dialogRef=d(Mt);authService=d(Or);_gameGroupsService=d(Xy);_gamesService=d(QT);_platformsService=d(eb);_gamingAccountsService=d(Jy);_fileService=d(Ta);_snackBar=d(Ir);_dataLocalService=d(ka);fileInput;btnDownloadConfig={title:"\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0444\u0430\u0439\u043B",color:"accent",icon:"download"};btnUploadConfig={title:"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438",color:"accent",icon:"upload"};downloadList=[{id:"games",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u0433\u0440"},{id:"platforms",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C"},{id:"gameGroups",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0433\u0440\u0443\u043F\u043F"},{id:"gamingAccounts",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u0433\u0440\u043E\u0432\u044B\u0445 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u0432"}];uploadList=[{id:"games",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u0433\u0440"},{id:"gameGroups",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0433\u0440\u0443\u043F\u043F"},{id:"gamingAccounts",name:"\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u0433\u0440\u043E\u0432\u044B\u0445 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u0432"}];_selectedUploadId;_destroy$=new _;ngOnDestroy(){this._destroy$.next(),this._destroy$.complete();}downloadAllFiles(){this._downloadGames(),this._downloadPlatforms(),this._downloadGameGroups();}selectDownloadData(e){switch(e.id){case "games":{this._downloadGames();break}case "platforms":{this._downloadPlatforms();break}case "gameGroups":{this._downloadGameGroups();break}case "gamingAccounts":{this._downloadGamingAccounts();break}}}selectUploaddData(e){this._selectedUploadId=e.id,this.fileInput.nativeElement.click();}_downloadGames(){this._gamesService.getGames().pipe(A(this._destroy$),je(e=>(console.error(e),De))).subscribe(e=>{this._downloadFile(e,ue.GAMES);});}_downloadPlatforms(){this._platformsService.getPlatforms().pipe(A(this._destroy$),je(e=>(console.error(e),De))).subscribe(e=>{this._downloadFile(e,ue.PLATFORMS);});}_downloadGameGroups(){this._gameGroupsService.getGameGroups().pipe(A(this._destroy$),je(e=>(console.error(e),De))).subscribe(e=>{this._downloadFile(e,ue.GAMES_GROUPS);});}_downloadGamingAccounts(){this._gamingAccountsService.getGamingAccounts().pipe(A(this._destroy$),je(e=>(console.error(e),De))).subscribe(e=>{this._downloadFile(e,ue.GAMING_ACCOUNTS);});}_downloadFile(e,i){let r={filename:`${new Date().getTime()}_${i}`},o=this._fileService.generateFile(e,r);this._fileService.downloadFile(o);}onFileChange(e){let i=e.target;i.files&&i.files.length>0&&this._onSelectUploadFile(i.files[0]);}_onSelectUploadFile(e){this._readJsonFile(e).then(i=>{switch(this._selectedUploadId){case "games":{this._gamesService.checkStructure(i)?(this._dataLocalService.setGames(i),this._openSnackBar("\u0423\u0421\u041F\u0415\u0428\u041D\u041E! \u0418\u0433\u0440\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443!")):this._openSnackBar("\u041E\u0428\u0418\u0411\u041A\u0410! \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0433\u0440 \u043D\u0435 \u0432\u0435\u0440\u043D\u0430!");break}case "gameGroups":{this._gameGroupsService.checkStructure(i)?(this._dataLocalService.setGameGroups(i),this._openSnackBar("\u0423\u0421\u041F\u0415\u0428\u041D\u041E! \u0413\u0440\u0443\u043F\u043F\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443!")):this._openSnackBar("\u041E\u0428\u0418\u0411\u041A\u0410! \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0433\u0440\u0443\u043F\u043F \u043D\u0435 \u0432\u0435\u0440\u043D\u0430!");break}case "gamingAccounts":{this._gamingAccountsService.checkStructure(i)?(this._dataLocalService.setGamingAccounts(i),this._openSnackBar("\u0423\u0421\u041F\u0415\u0428\u041D\u041E! \u0410\u043A\u043A\u0430\u0443\u043D\u0442\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B \u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443!")):this._openSnackBar("\u041E\u0428\u0418\u0411\u041A\u0410! \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u0432 \u043D\u0435 \u0432\u0435\u0440\u043D\u0430!");break}}});}_readJsonFile(e){return new Promise((i,r)=>{let o=new FileReader;o.onload=()=>{try{let s=JSON.parse(o.result);i(s);}catch(s){console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430:",s),r(s);}},o.onerror=()=>{console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0447\u0442\u0435\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u0430:",o.error),r(o.error);},o.readAsText(e);})}_openSnackBar(e,i="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"){this._snackBar.open(e,i,{duration:5e3});}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-data-dialog"]],viewQuery:function(i,r){if(i&1&&$e(H4,5),i&2){let o;ee(o=te())&&(r.fileInput=o.first);}},features:[Ne([eb,Xy,Jy])],decls:13,vars:3,consts:[["fileInput",""],[1,"data-dialog"],[1,"mt","mb"],[3,"clickBtn","buttonsList","btnConfig"],["align","end"],["matFab","","extended","","color","accent",3,"click"],[1,"ml"],["type","file","accept",".json",2,"display","none",3,"change"]],template:function(i,r){i&1&&(y(0,"div",1)(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),N(4,"\u0412\u044B\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u044B\u0445"),w()(),y(5,"mat-card-content",2)(6,"app-btn-list",3),ie("clickBtn",function(s){return r.selectDownloadData(s)}),w()(),y(7,"mat-card-actions",4)(8,"button",5),ie("click",function(){return r.downloadAllFiles()}),y(9,"mat-icon"),N(10,"content_copy"),w(),N(11," \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0432\u0441\u0451 "),w()()(),Q(12,z4,8,2,"mat-card",6),w()),i&2&&(C(6),me("buttonsList",r.downloadList)("btnConfig",r.btnDownloadConfig),C(6),X(r.authService.isAuthorized()?-1:12));},dependencies:[zr,Vr,Hr,Ur,vi,sA,Ba,jr,Gn,da],styles:[".mt[_ngcontent-%COMP%]{margin-top:10px}.mb[_ngcontent-%COMP%]{margin-bottom:10px}.mr[_ngcontent-%COMP%]{margin-right:10px}.ml[_ngcontent-%COMP%]{margin-left:10px}.data-dialog[_ngcontent-%COMP%]{display:flex;padding:10px}"]})}return t})();function $4(t,n){if(t&1&&N(0),t&2){let e=z();Je(`
                        `,e.data,`
                    `);}}function G4(t,n){if(t&1&&N(0),t&2){let e=z(2);Je(`
                            `,e.data.stack,`
                        `);}}function W4(t,n){if(t&1&&N(0),t&2){let e=z(2);Je(`
                            `,e.data.message,`
                        `);}}function q4(t,n){if(t&1&&(N(0,`
                        `),Q(1,G4,1,1)(2,W4,1,1)),t&2){let e=z();C(),X(e.data.stack?1:e.data.message?2:-1);}}function Y4(t,n){if(t&1){let e=Rt();y(0,"mat-card-actions",1)(1,"button",2),ie("click",function(){gt(e);let r=z();return vt(r.copyTextError())}),y(2,"mat-icon"),N(3,"content_copy"),w(),N(4," \u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C "),w()();}}var DA=(()=>{class t{dialogRef=d(Mt);data=d(Jo);_snackBar=d(Ir);copyTextError(){navigator.clipboard.writeText(JSON.stringify(this.data.toString(),null,2)),this._openSnackBar("\u0422\u0435\u043A\u0441\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430");}_openSnackBar(e,i="\u0417\u0430\u043A\u0440\u044B\u0442\u044C"){this._snackBar.open(e,i,{duration:2e3});}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-error-dialog"]],decls:16,vars:2,consts:[["color","warn"],["align","end"],["matButton","","color","warn",3,"click"]],template:function(i,r){if(i&1&&(y(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title")(3,"mat-icon",0),N(4,"error"),w(),N(5," \u041E\u0448\u0438\u0431\u043A\u0430! "),w()(),y(6,"mat-card-content")(7,"pre"),N(8,"            "),y(9,"code"),N(10,`
                `),Q(11,$4,1,1)(12,q4,3,1),N(13,`
            `),w(),N(14,`
        `),w()(),Q(15,Y4,5,0,"mat-card-actions",1),w()),i&2){let o;C(11),X((o=typeof r.data)=="string"?11:o==="object"?12:-1),C(4),X(r.data?15:-1);}},dependencies:[vi,Vr,Hr,zr,Ur,jr,Ba,Gn,Cr],styles:["[_nghost-%COMP%]{display:flex;height:100%;padding:10px}code[_ngcontent-%COMP%]{text-wrap:auto}mat-card-title[_ngcontent-%COMP%]{display:flex;align-items:center}mat-icon[_ngcontent-%COMP%]{margin-right:10px}mat-card[_ngcontent-%COMP%]{width:100%}"]})}return t})();var xA=(()=>{class t{dialogRef=d(Mt);data=d(Jo);static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-image-dialog"]],decls:1,vars:1,consts:[["alt","data",3,"src"]],template:function(i,r){i&1&&mt(0,"img",0),i&2&&pn("src",r.data,iv);},dependencies:[vi],styles:["[_nghost-%COMP%]{display:flex;height:100%}img[_ngcontent-%COMP%]{width:100%;object-fit:contain}"]})}return t})();var db=(()=>{class t{currentTheme="indigo-pink";themeMap={"azure-blue":"assets/themes/azure-blue.css","cyan-orange":"assets/themes/cyan-orange.css","deeppurple-amber":"assets/themes/deeppurple-amber.css","indigo-pink":"assets/themes/indigo-pink.css","magenta-violet":"assets/themes/magenta-violet.css","pink-bluegrey":"assets/themes/pink-bluegrey.css","purple-green":"assets/themes/purple-green.css","rose-red":"assets/themes/rose-red.css"};setTheme(e){let i=this.themeMap[e];if(!i){console.warn(`Theme "${e}" not found in themeMap`);return}this._removeCurrentTheme(),this._loadTheme(i).then(()=>{this.currentTheme=e,localStorage.setItem("app-theme",e);}).catch(r=>{console.error("Failed to load theme:",r),this.setTheme("indigo-pink");});}getTheme(){return this.currentTheme}_loadTheme(e){return new Promise((i,r)=>{let o=document.createElement("link");o.rel="stylesheet",o.href=e,o.id="app-theme",o.onload=()=>i(),o.onerror=s=>r(s),document.head.appendChild(o);})}_removeCurrentTheme(){let e=document.getElementById("app-theme");e&&e.remove();}initializeTheme(){let e=localStorage.getItem("app-theme");e&&this.themeMap[e]?this.setTheme(e):this.setTheme("indigo-pink");}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();var EA=(()=>{class t{dialogRef=d(Mt);_themeService=d(db);selectedTheme="indigo-pink";constructor(){this.selectedTheme=this._themeService.getTheme();}onThemeChange(e){let i=e.value;i&&this._themeService.setTheme(i);}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-theme-switcher-dialog"]],features:[Ne([db])],decls:25,vars:1,consts:[[1,"mt"],["appearance","fill"],[3,"valueChange","selectionChange","value"],["value","azure-blue"],["value","cyan-orange"],["value","deeppurple-amber"],["value","indigo-pink"],["value","magenta-violet"],["value","pink-bluegrey"],["value","purple-green"],["value","rose-red"]],template:function(i,r){i&1&&(y(0,"mat-card")(1,"mat-card-header")(2,"mat-card-title"),N(3," \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0442\u0435\u043C\u044B \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F "),w()(),y(4,"mat-card-content",0)(5,"mat-form-field",1)(6,"mat-label"),N(7,"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043C\u0443"),w(),y(8,"mat-select",2),mf("valueChange",function(s){return Pv(r.selectedTheme,s)||(r.selectedTheme=s),s}),ie("selectionChange",function(s){return r.onThemeChange(s)}),y(9,"mat-option",3),N(10,"Azure Blue"),w(),y(11,"mat-option",4),N(12,"Cyan Orange"),w(),y(13,"mat-option",5),N(14,"Deep Purple Amber"),w(),y(15,"mat-option",6),N(16,"Indigo Pink"),w(),y(17,"mat-option",7),N(18,"Magenta Violet"),w(),y(19,"mat-option",8),N(20,"Pink Blue Grey"),w(),y(21,"mat-option",9),N(22,"Purple Green"),w(),y(23,"mat-option",10),N(24,"Rose Red"),w()()()()()),i&2&&(C(8),ff("value",r.selectedTheme));},dependencies:[ja,dA,Lr,Qo,Vr,zr,Hr,Ur],styles:[".mt[_ngcontent-%COMP%]{margin-top:10px}.mb[_ngcontent-%COMP%]{margin-bottom:10px}.mr[_ngcontent-%COMP%]{margin-right:10px}.ml[_ngcontent-%COMP%]{margin-left:10px}mat-form-field[_ngcontent-%COMP%]{width:100%}"]})}return t})();var SA=(()=>{class t{dialogRef=d(Mt);_settings=d(Jo);_defaultSettings={yesTextButton:"\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0442\u044C\u0441\u044F",noTextButton:"\u041E\u0442\u043C\u0435\u043D\u0430",textDialog:"\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435?"};get settings(){return this._settings?this._settings:this._defaultSettings}static \u0275fac=function(i){return new(i||t)};static \u0275cmp=k({type:t,selectors:[["app-yes-no-dialog"]],decls:7,vars:5,consts:[["align","end"],["color","primary","mat-raised-button","","mat-dialog-close","",3,"mat-dialog-close"],["color","warn","mat-raised-button","","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(i,r){i&1&&(y(0,"h3"),N(1),w(),y(2,"mat-dialog-actions",0)(3,"button",1),N(4),w(),y(5,"button",2),N(6),w()()),i&2&&(C(),Ut(r.settings.textDialog),C(2),me("mat-dialog-close",false),C(),Je(" ",r.settings.noTextButton," "),C(),me("mat-dialog-close",true),C(),Je(" ",r.settings.yesTextButton," "));},dependencies:[vi,vA,_A,Gn,Cr],styles:["h3[_ngcontent-%COMP%]{text-align:center}"]})}return t})();var $0e=(()=>{class t{_dialog=d(Jc);openErrorDialog(e){this._dialog.closeAll(),this._dialog.open(DA,{width:"540px",data:e});}openImageDialog(e){e&&(this._dialog.closeAll(),this._dialog.open(xA,{width:"50vh",height:"50vh",data:e}));}openYesNoDialog(e){return this._dialog.closeAll(),this._dialog.open(SA,e)}openAuthDialog(){return this._dialog.closeAll(),this._dialog.open(wA,{hasBackdrop:true,disableClose:true})}openThemeSwitcher(){return this._dialog.closeAll(),this._dialog.open(EA)}openDataDialog(){return this._dialog.closeAll(),this._dialog.open(CA)}static \u0275fac=function(i){return new(i||t)};static \u0275prov=E({token:t,factory:t.\u0275fac})}return t})();function b(t,D){t&1&&be(0,"mat-spinner",0),t&2&&me("diameter",100);}function $(t,D){t&1&&be(0,"router-outlet");}var T=(()=>{class t{themeService=d(db);_dataService=d(Nr);_dialogService=d($0e);isLoad$=new Ke(true);ngOnInit(){this.themeService.initializeTheme(),this._dataService.syncData().pipe(je(o=>(console.error(o),this._dialogService.openErrorDialog(o),this.isLoad$.next(false),De))).subscribe(()=>this.isLoad$.next(false));}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-root"]],features:[Ne([db,$0e])],decls:3,vars:3,consts:[[1,"spin-load-data",3,"diameter"]],template:function(e,P){e&1&&(Q(0,b,1,1,"mat-spinner",0),hf(1,"async"),Ov(2,$,1,0,"router-outlet")),e&2&&X(pf(1,1,P.isLoad$)?0:2);},dependencies:[Tf,Pj,G_,HE,o_],styles:[".spin-load-data[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%}"]})}return t})();var x=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",title:"\u0421\u043F\u0438\u0441\u043E\u043A \u0438\u0433\u0440",loadComponent:()=>import('./chunk-DB11aOlA.js').then(t=>t.HomeComponent)},{path:"game",title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0438\u0433\u0440\u044B",loadComponent:()=>import('./chunk-79V8YePc.js').then(t=>t.GameComponent)},{path:"game/:id",title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438\u0433\u0440\u044B",loadComponent:()=>import('./chunk-79V8YePc.js').then(t=>t.GameComponent)},{path:"gameGroupsList",title:"\u0421\u043F\u0438\u0441\u043E\u043A \u0433\u0440\u0443\u043F\u043F",loadComponent:()=>import('./chunk-DN-xYTe9.js').then(t=>t.GameGroupsListComponent)},{path:"gameGroup",title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B",loadComponent:()=>import('./chunk-Dnt_oRr-.js').then(t=>t.GameGroupComponent)},{path:"gameGroup/:id",title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B",loadComponent:()=>import('./chunk-Dnt_oRr-.js').then(t=>t.GameGroupComponent)},{path:"gamingAccountsList",title:"\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u043E\u0432",loadComponent:()=>import('./chunk-BLq9VB-K.js').then(t=>t.GamingAccountsListComponent)},{path:"gamingAccount",title:"\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",loadComponent:()=>import('./chunk-CdzONVEY.js').then(t=>t.GamingAccountComponent)},{path:"gamingAccount/:id",title:"\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430",loadComponent:()=>import('./chunk-CdzONVEY.js').then(t=>t.GamingAccountComponent)},{path:"**",redirectTo:"home",pathMatch:"full"}];R1(T,{providers:[Fj(x)]});export{$0e as $,A,oT as B,C,De as D,tT as E,ch as F,Gn as G,HE as H,JM as I,Jy as J,Ke as K,Lr as L,eT as M,Nr as N,Ov as O,kT as P,QT as Q,AT as R,RS as S,Sbe as T,dA as U,Ebe as V,ja as W,Xy as X,sT as Y,Zn as Z,_,Age as a,Uo as a$,Ko as a0,Zy as a1,oA as a2,Cye as a3,rA as a4,oy as a5,tB as a6,lB as a7,aB as a8,ki as a9,v as aA,at as aB,g as aC,py as aD,Ct as aE,xe as aF,Mn as aG,Ft as aH,rt as aI,Y as aJ,de as aK,Ve as aL,fD as aM,ce as aN,$e as aO,ee as aP,te as aQ,li as aR,ae as aS,Oe as aT,wc as aU,bc as aV,I as aW,ge as aX,Nv as aY,Fv as aZ,B as a_,me as aa,Rt as ab,mf as ac,z as ad,ff as ae,be as af,E as ag,Ir as ah,NB as ai,Pl as aj,Fl as ak,Je as al,Ll as am,Et as an,H as ao,V as ap,ca as aq,mi as ar,Ce as as,Bo as at,F as au,Ge as av,j as aw,We as ax,bo as ay,ve as az,jr as b,yt as b0,la as b1,SS as b2,q as b3,$$1 as b4,kt as b5,Ht as b6,O as b7,qe as b8,Ui as b9,gP as bA,Eo as bB,Ye as bC,FM as bD,dh as bE,Qt as bF,ci as bG,vr as bH,on as bI,iA as bJ,zr as bK,Vr as bL,Ur as bM,Hr as bN,xn as bO,Tf as bP,h1 as bQ,mP as bR,br as bS,Vi as ba,Nc as bb,R as bc,fe as bd,Bi as be,Nl as bf,fr as bg,Wo as bh,Ze as bi,lf as bj,gt as bk,vt as bl,Xe as bm,Bn as bn,pn as bo,iv as bp,Bt as bq,Pv as br,ef as bs,tf as bt,Ut as bu,Li as bv,tt as bw,pi as bx,sA as by,_1 as bz,da as c,d,eb as e,_h as f,Zc as g,Qre as h,Q as i,je as j,k,hf as l,ie as m,N as n,o_ as o,X as p,pf as q,Ne as r,rT as s,K as t,eh as u,Xo as v,w,Qo as x,y,yT as z};