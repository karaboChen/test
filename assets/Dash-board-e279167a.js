import{i as o}from"./backend-556194ba.js";import{e as c,_ as n}from"./ToastMessages-5329de1b.js";import{u as i,p as m,d as p,o as u,c as _,e as t}from"./index-150f1a48.js";import"./component-functions-ad01dfa8.js";const d={class:"container-fluid"},x={__name:"Dash-board",setup(l){const s=i(),r=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");return o.defaults.headers.common.Authorization=r,o.post("api/user/check").then(e=>{e.data.success||s.push("/login")}),m("emitter",c),(e,f)=>{const a=p("RouterView");return u(),_("div",d,[t(n),t(a)])}}};export{x as default};