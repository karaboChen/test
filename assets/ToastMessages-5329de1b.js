import{q as k,r as T,l as S,o as m,c as p,a as E,j as q,t as v,i as U,s as j,F as B,h as F,x as K}from"./index-150f1a48.js";import{r as W,a as P,b as Y,c as z}from"./component-functions-ad01dfa8.js";function G(s){return{all:s=s||new Map,on:function(o,n){var t=s.get(o);t?t.push(n):s.set(o,[n])},off:function(o,n){var t=s.get(o);t&&(n?t.splice(t.indexOf(n)>>>0,1):s.set(o,[]))},emit:function(o,n){var t=s.get(o);t&&t.slice().map(function(i){i(n)}),(t=s.get("*"))&&t.slice().map(function(i){i(o,n)})}}}const it=G();var g={},Q={get exports(){return g},set exports(s){g=s}};/*!
  * Bootstrap toast.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(s,o){(function(n,t){s.exports=t(W(),P(),Y(),z())})(k,function(n,t,i,u){const l=_=>_&&typeof _=="object"&&"default"in _?_:{default:_},r=l(t),N=l(i),w="toast",c=".bs.toast",L=`mouseover${c}`,I=`mouseout${c}`,A=`focusin${c}`,C=`focusout${c}`,D=`hide${c}`,M=`hidden${c}`,O=`show${c}`,$=`shown${c}`,x="fade",y="hide",d="show",f="showing",H={animation:"boolean",autohide:"boolean",delay:"number"},V={animation:!0,autohide:!0,delay:5e3};class h extends N.default{constructor(e,a){super(e,a),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return V}static get DefaultType(){return H}static get NAME(){return w}show(){if(r.default.trigger(this._element,O).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(x);const a=()=>{this._element.classList.remove(f),r.default.trigger(this._element,$),this._maybeScheduleHide()};this._element.classList.remove(y),n.reflow(this._element),this._element.classList.add(d,f),this._queueCallback(a,this._element,this._config.animation)}hide(){if(!this.isShown()||r.default.trigger(this._element,D).defaultPrevented)return;const a=()=>{this._element.classList.add(y),this._element.classList.remove(f,d),r.default.trigger(this._element,M)};this._element.classList.add(f),this._queueCallback(a,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(d),super.dispose()}isShown(){return this._element.classList.contains(d)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(e,a){switch(e.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=a;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=a;break}}if(a){this._clearTimeout();return}const b=e.relatedTarget;this._element===b||this._element.contains(b)||this._maybeScheduleHide()}_setListeners(){r.default.on(this._element,L,e=>this._onInteraction(e,!0)),r.default.on(this._element,I,e=>this._onInteraction(e,!1)),r.default.on(this._element,A,e=>this._onInteraction(e,!0)),r.default.on(this._element,C,e=>this._onInteraction(e,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each(function(){const a=h.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof a[e]>"u")throw new TypeError(`No method named "${e}"`);a[e](this)}})}}return u.enableDismissTrigger(h),n.defineJQueryPlugin(h),h})})(Q);const J=g,R={class:"toast-header"},X={class:"me-auto"},Z=E("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close"},null,-1),tt={key:0,class:"toast-body"},et={__name:"Toast-e",props:{msg:{type:Object}},setup(s){const o=T(null);return S(()=>{const n=o.value;new J(n,{delay:6e3}).show()}),(n,t)=>(m(),p("div",{class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true",ref_key:"toast",ref:o},[E("div",R,[E("span",{class:q([`bg-${s.msg.style}`,"p-2 rounded me-2 d-inline-block"])},null,2),E("strong",X,v(s.msg.title),1),Z]),s.msg.content?(m(),p("div",tt,v(s.msg.content),1)):U("",!0)],512))}},st={class:"toast-container position-absolute pe-3 top-0 end-0",style:{"z-index":"1050"}},rt={__name:"ToastMessages",setup(s){const o=T([]),n=j("emitter");return S(()=>{n.on("push-message",t=>{const{style:i="success",title:u,content:l}=t;o.value.push({style:i,title:u,content:l})})}),(t,i)=>(m(),p("div",st,[(m(!0),p(B,null,F(o.value,(u,l)=>(m(),K(et,{key:l,msg:u},null,8,["msg"]))),128))]))}};export{rt as _,it as e};