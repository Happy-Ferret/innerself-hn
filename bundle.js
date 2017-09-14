(function(){"use strict";function a([a,...b],...c){return c.reduce((a,c)=>a.concat(c,b.shift()),[a]).filter((a)=>null!=a).join("")}function b(){const a=window.location.pathname.slice(1),b=-1!==C.indexOf(a),c=i(window.location.search),d=b?a:r;return b||history.pushState({},"Innerself News","/"),{path:d,query:c}}function c(a){return F(a).then((b)=>f(R(a,b))).catch((b)=>{console.error(b),f(S(a,b))}),Q(a)}function d(a){const b=+a;return E(b).then((a)=>f(X(a))).catch((a)=>f(Y(a,b))),W(b)}function e(a){return G(a).then((a)=>f(da(a))).catch((b)=>f(ea(b,a))),ca(a)}function f(a,b){return b?`'dispatch(${JSON.stringify(a)})'`:setTimeout(ia,0,a)}const g=()=>({type:"INIT"}),h=(a,b)=>{let c=300;"number"==typeof b?(c=b,b=void 0):"object"==typeof b&&(c=b.seconds||c);let d=`__innerself_news__${a}`,e=localStorage.getItem(d),f=localStorage.getItem(d+":ts");if(null!==e&&null!==f){let a=(Date.now()-+f)/1e3;if(a<c){let a=new Response(new Blob([e]));return Promise.resolve(a)}localStorage.removeItem(d),localStorage.removeItem(d+":ts")}return fetch(a,b).then((a)=>{if(200===a.status){let b=a.headers.get("Content-Type");b&&(b.match(/application\/json/i)||b.match(/text\//i))&&a.clone().text().then((a)=>{localStorage.setItem(d,a),localStorage.setItem(d+":ts",Date.now().toString())})}return a})},i=(a)=>{const b=new URLSearchParams(a),c={};for(const[d,e]of b.entries())c[d]=e;return c},j=(a)=>{const b=new URLSearchParams,c=Object.keys(a);return c.forEach((c)=>b.set(c,a[c])),b.toString()},k=60000,l=60*k,m=24*l,{round:n}=Math,o=(a)=>1===a?" ago":"s ago",p=(a)=>{const b=new Date(1e3*a),c=new Date,d=c.getTime()-b.getTime();switch(!0){case d>m:{const a=n(d/m);return a+" day"+o(a)}case d>l:{const a=n(d/l);return a+" hour"+o(a)}case d>k:{const a=n(d/k);return n(d/k)+" minute"+o(a)}default:return"less than a minute ago";}},q="new",r="",s="item",t="show",u="ask",v="user",w="submitted";var x=Object.freeze({NEW:q,COMMENTS:"comments",HOME:r,ITEM:s,SHOW:t,ASK:u,USER:v,SUBMITTED:w});const y="LOCATION_CHANGE_SUCCESS",z="LOCATION_CHANGE_REQUEST",A=(a,b)=>({type:z,payload:{path:a,query:b}}),B=Object.keys(x),C=B.map((a)=>x[a]),D=(a,b={})=>{const c=new URLSearchParams;Object.keys(b).forEach((a)=>c.set(a,b[a]));const d=`${"https://hacker-news.firebaseio.com/v0/"}/${a}.json?${c.toString()}`;return h(d).then((a)=>a.json())},E=(a)=>D(`item/${a}`),F=(a,b=20)=>D(a+"stories").then((a)=>Promise.all(a.slice(0,b).map((a)=>E(a)))),G=(a)=>D(`user/${a}`),H="INSERT_ENTITIES",I=(a)=>({type:H,payload:{entities:a.reduce((a,b)=>(a[b.id]=b,a),{})}}),J="INSERT_USER",K=(a)=>({type:J,payload:{users:{[a.id]:a}}}),L=(a,b)=>{const c=a.db.entities;return c&&c[b]},M=(a,b)=>{const c=a.db.users;return c&&c[b]},N="TOP_SUBMISSION_REQUEST",O="TOP_SUBMISSION_SUCCESS",P="TOP_SUBMISSION_FAILURE",Q=(a)=>({type:N,payload:{id:a}}),R=(a,b)=>(f(I(b)),{type:O,payload:{id:a,submissions:b.map((a)=>a.id)}}),S=(a,b)=>({type:P,payload:{id:a,error:b}}),T="GET_ITEM_REQUEST",U="GET_ITEM_SUCCESS",V="GET_ITEM_FAILURE",W=(a)=>({type:T,payload:{id:a}}),X=(a)=>(f({type:U,payload:{id:a.id}}),I([a])),Y=(a,b)=>({type:V,payload:{error:a,id:b}}),Z="TOGGLE_EXPAND_ITEM",$=(a)=>{return{type:Z,payload:{id:+a}}},_="GET_USER_REQUEST",aa="GET_USER_SUCCESS",ba="GET_USER_FAILURE",ca=(a)=>({type:_,payload:{id:a}}),da=(a)=>(f({type:aa,payload:{id:a.id}}),K(a)),ea=(a,b)=>({type:ba,payload:{error:a,id:b}}),fa=(a,b,c)=>Object.assign({},a,{requesting:Object.assign({},a.requesting,{[b]:c})}),ga=((a)=>{const b=Object.keys(a),c=g();return(d,e=c)=>b.reduce((b,c)=>(b[c]=a[c](b[c],e),b),d||{})})({router:function(a=b(),c){switch(c.type){case y:return Object.assign({},c.payload,{previous:Object.assign({},a,{previous:void 0})});default:return a;}},submissions:function(a={requesting:{},expanded:{},items:{}},b){switch(b.type){case"CLEAR_TOP_SUBMISSION":return Object.assign({},a,{items:{}});case N:return fa(a,b.payload.id,!0);case O:{const c=b.payload.id;return Object.assign({},fa(a,c,!1),{items:Object.assign({},a.items,{[c]:b.payload.submissions})})}case P:return Object.assign({},fa(a,b.payload.id,!1),{error:b.payload.error});case _:case T:return fa(a,b.payload.id,!0);case aa:case ba:case U:case V:return fa(a,b.payload.id,!1);case Z:{const{id:c}=b.payload;return Object.assign({},a,{expanded:Object.assign({},a.expanded,{[c]:!a.expanded[c]})})}}return a},db:function(a={entities:{},users:{}},b){switch(b.type){case H:return Object.assign({},a,{entities:Object.assign({},a.entities,b.payload.entities)});case J:return Object.assign({},a,{users:Object.assign({},a.users,b.payload.users)});default:return a;}}}),ha=((...a)=>{const b=a.pop();return b?(c)=>a.reduceRight((a,b)=>b(a),b(c)):(b)=>b})((()=>(window.addEventListener("popstate",()=>{f({type:y,payload:b()})}),(a)=>{switch(a.type){case z:{const{path:b,query:c}=a.payload,d=c&&j(c);return history.pushState({},b,(b||"/")+(d?"?"+d:"")),{type:y,payload:a.payload}}}return a}))());setInterval(()=>{const a=/^__innerself_news__.*:ts$/g,b=Object.keys(localStorage).filter((b)=>a.test(b));for(const a of b){const b=localStorage.getItem(a);let c=(Date.now()-+b)/1e3;c>300&&localStorage.removeItem(a)}},300000);const{dispatch:ia,connect:ja,attach:ka}=function(a){function b(){for(const[a,b]of d){const d=b();if(d!==e.get(a)){e.set(a,d),a.innerHTML=d;const b=new CustomEvent("render",{detail:c});a.dispatchEvent(b)}}}let c=a();const d=new Map,e=new Map;return{attach(a,c){d.set(c,a),b()},connect(a){return(...b)=>a(c,...b)},dispatch(d,...e){c=a(c,d,e),b()}}}(((a)=>(b,c)=>a(b,c&&ha(c)))(ga));window.dispatch=f;const la=()=>a`
  <div>
    Ooops, I can't find what you are looking for...
  </div>
`,ma=(a,b)=>f(A(a,b),!0),na=(b)=>{const{path:c,text:d,query:e,className:f=""}=b;return a`
      <a class="${f}"
        onclick=${ma(c,e)}>
        ${d||c}
      </a>
    `},oa=ja((a,b)=>{const c=a.router.path===b.path,d=(b.className||"")+" navbar-link "+(c?"active":"");return na(Object.assign({},b,{className:d}))}),pa=[{path:"new"},{path:"show"},{path:"ask"}],qa=()=>a`
  <div class="navbar">
    <div class="navbar-links">
      ${oa({path:r,className:"logo",text:"Innerself News"})}
      ${pa.map(oa).join(" | ")}
    </div>
    <div class="navbar-right">
      <a class="navbar-link"
      href="https://github.com/bsouthga/innerself-hn">
        <img
          style="height:15px;width:15px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" />
      </a>
    </div>
  </div>
`,ra=()=>a`
  <div class="loading">
    loading...
  </div>
`,sa=({item:b,index:c})=>{const d=na({path:"user",text:`${b.by}`,className:"article-link",query:{id:b.by||""}}),e=na({path:"item",text:`${b.descendants||0} comments`,className:"article-link",query:{id:b.id.toString()}}),f="undefined"==typeof c?"":a`<div class="article-index">
        ${c+1}.
      </div>`;return a`
    <div class="article">
      ${f}
      <div>
        <a class="article-title" href="${b.url||"#"}">${b.title}</a>
        <div class="article-info">
        ${b.score} points by ${d} ${p(b.time)} | ${e}
        </div>
      </div>
    </div>
  `},ta=ja((b,c)=>{const{items:d}=c,e=d.map((a)=>L(b,a)).filter((a)=>a&&"story"===a.type);return a`
    <div class="article-list">
      <div>
        ${e.length?e.map((a,b)=>sa({item:a,index:b})):"(no items)"}
      </div>
    </div>
  `}),ua=(a,b)=>{const{submissions:d,router:e}=a,{items:g,requesting:h}=d,i=g[b];return i?ta({items:i}):(h[b]||f(c(b)),ra())},va=(b)=>a`
  <a class="comment-expand"
     onclick=${f($(b.id),!0)}>
    ${b.children}
  </a>
`,wa=ja((b,c)=>{const{id:e,child:g}=c,{requesting:h,expanded:i}=b.submissions,j=L(b,e);if(!j)return h[e]||f(d(+e)),"";if("comment"!==j.type)return"";const k=na({path:"user",text:`${j.by}`,className:"article-link",query:{id:j.by||""}}),l=j.kids||[],m=l.length?i[e]?a`
        ${va({id:e,children:`hide children`})}
        ${l.map((a)=>wa({id:a,child:!0}))}
      `:va({id:e,children:`show children (${l.length})`}):"";return a`
    <div class="comment${g?" comment-child":""}">
      <div class="comment-info">
       ${k} ${p(j.time)}
      </div>
      <div class="comment-text">
        ${j.text}
      </div>
      ${m}
    </div>
  `}),xa=(b)=>{const{id:c=""}=b.router.query||{},{requesting:e}=b.submissions,g=L(b,c);if(!g)return e[c]||f(d(c)),ra();if("story"!==g.type)return"";const{kids:h}=g,i=h?h.map((a)=>wa({id:a})).join(""):"(no comments)";return a`
    ${sa({item:g})}
    <div class="comments">
      ${""===i?ra():i}
    </div>
  `},ya=(a)=>{const{router:{query:b},submissions:{requesting:c}}=a,{id:d=""}=b||{};if(!d)return la();const g=M(a,d);return g?g:(c[d]||f(e(d)),ra())},za=(b)=>{const c=ya(b);return"string"==typeof c?c:a`
    <div>
      <table>
        <tr><td>user:</td><td>${c.id}</td></tr>
        <tr><td>created:</td><td>${p(c.created)}</td></tr>
        <tr><td>karma:</td><td>${c.karma}</td></tr>
        <tr><td>about:</td><td>${c.about||"blank"}</td></tr>
        <tr>
          <td>links:</td>
          <td>
            ${na({path:"submitted",query:{id:c.id}})}
          </td>
        </tr>
      </table>
    </div>
  `},Aa=(a)=>{const b=ya(a);return"string"==typeof b?b:ta({items:b.submitted||[]})},Ba=ja((a)=>{switch(a.router.path){case r:return ua(a,"top");case q:return ua(a,"new");case u:return ua(a,"ask");case t:return ua(a,"show");case s:return xa(a);case v:return za(a);case w:return Aa(a);default:return la();}});ka(()=>a`
  <div class="container">
    ${qa()}
    <div class="content">
      ${Ba()}
    </div>
  </div>
`,document.getElementById("root"))})();
