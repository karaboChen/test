import{M as r}from"./modal-e4494c62.js";import{r as s,l as _,o as b,c as u,a as e,t as l,b as d}from"./index-150f1a48.js";const h={class:"modal-dialog",role:"document"},p={class:"modal-content border-0"},y={class:"modal-header bg-danger text-white"},M={class:"modal-title"},v=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),f={class:"modal-body"},g={class:"text-danger"},x=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"},"取消 ",-1),V={__name:"DelModal",props:{item:{type:Object}},emits:["del-item"],setup(n,{expose:i,emit:c}){const o=n,a=s(null),t=s(null);function m(){c("del-item")}return _(()=>{t.value=new r(a.value)}),i({myModal_show:()=>{t.value.show()},myModal_hide:()=>{t.value.hide()}}),(B,D)=>(b(),u("div",{class:"modal fade",id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref_key:"modal",ref:a},[e("div",h,[e("div",p,[e("div",y,[e("h5",M,[e("span",null,"刪除 "+l(o.item.title),1)]),v]),e("div",f,[d(" 是否刪除 "),e("strong",g,l(o.item.title),1),d(" (刪除後將無法恢復)。 ")]),e("div",{class:"modal-footer"},[x,e("button",{type:"button",class:"btn btn-danger",onClick:m},"確認刪除 ")])])])],512))}};export{V as _};