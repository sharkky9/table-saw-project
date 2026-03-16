(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const tt="modulepreload",rt=function(t){return"/table-saw-project/"+t},me={},st=function(e,s,n){let r=Promise.resolve();if(s&&s.length>0){let u=function(p){return Promise.all(p.map(h=>Promise.resolve(h).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var i=u;document.getElementsByTagName("link");const c=document.querySelector("meta[property=csp-nonce]"),o=c?.nonce||c?.getAttribute("nonce");r=u(s.map(p=>{if(p=rt(p),p in me)return;me[p]=!0;const h=p.endsWith(".css"),d=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${d}`))return;const k=document.createElement("link");if(k.rel=h?"stylesheet":tt,h||(k.as="script"),k.crossOrigin="",k.href=p,o&&k.setAttribute("nonce",o),document.head.appendChild(k),h)return new Promise((m,v)=>{k.addEventListener("load",m),k.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${p}`)))})}))}function a(c){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=c,window.dispatchEvent(o),!o.defaultPrevented)throw c}return r.then(c=>{for(const o of c||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};function re(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var T=re();function Te(t){T=t}var P={exec:()=>null};function g(t,e=""){let s=typeof t=="string"?t:t.source,n={replace:(r,a)=>{let i=typeof a=="string"?a:a.source;return i=i.replace(x.caret,"$1"),s=s.replace(r,i),n},getRegex:()=>new RegExp(s,e)};return n}var nt=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),x={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] /,listReplaceTask:/^\[[ xX]\] +/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},at=/^(?:[ \t]*(?:\n|$))+/,it=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,lt=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,z=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ot=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,se=/(?:[*+-]|\d{1,9}[.)])/,Ae=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ie=g(Ae).replace(/bull/g,se).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ct=g(Ae).replace(/bull/g,se).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ne=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pt=/^[^\n]+/,ae=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ut=g(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ae).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dt=g(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,se).getRegex(),H="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ie=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ht=g("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ie).replace("tag",H).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Le=g(ne).replace("hr",z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",H).getRegex(),gt=g(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Le).getRegex(),le={blockquote:gt,code:it,def:ut,fences:lt,heading:ot,hr:z,html:ht,lheading:Ie,list:dt,newline:at,paragraph:Le,table:P,text:pt},be=g("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",H).getRegex(),ft={...le,lheading:ct,table:be,paragraph:g(ne).replace("hr",z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",be).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",H).getRegex()},kt={...le,html:g(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ie).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:P,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:g(ne).replace("hr",z).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ie).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mt=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ee=/^( {2,}|\\)\n(?!\s*$)/,wt=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Q=/[\p{P}\p{S}]/u,oe=/[\s\p{P}\p{S}]/u,Pe=/[^\s\p{P}\p{S}]/u,xt=g(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,oe).getRegex(),ze=/(?!~)[\p{P}\p{S}]/u,vt=/(?!~)[\s\p{P}\p{S}]/u,yt=/(?:[^\s\p{P}\p{S}]|~)/u,$t=g(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nt?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ce=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,St=g(Ce,"u").replace(/punct/g,Q).getRegex(),_t=g(Ce,"u").replace(/punct/g,ze).getRegex(),Me="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Rt=g(Me,"gu").replace(/notPunctSpace/g,Pe).replace(/punctSpace/g,oe).replace(/punct/g,Q).getRegex(),Tt=g(Me,"gu").replace(/notPunctSpace/g,yt).replace(/punctSpace/g,vt).replace(/punct/g,ze).getRegex(),At=g("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Pe).replace(/punctSpace/g,oe).replace(/punct/g,Q).getRegex(),It=g(/\\(punct)/,"gu").replace(/punct/g,Q).getRegex(),Lt=g(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Et=g(ie).replace("(?:-->|$)","-->").getRegex(),Pt=g("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Et).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),j=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,zt=g(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",j).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Be=g(/^!?\[(label)\]\[(ref)\]/).replace("label",j).replace("ref",ae).getRegex(),qe=g(/^!?\[(ref)\](?:\[\])?/).replace("ref",ae).getRegex(),Ct=g("reflink|nolink(?!\\()","g").replace("reflink",Be).replace("nolink",qe).getRegex(),we=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ce={_backpedal:P,anyPunctuation:It,autolink:Lt,blockSkip:$t,br:Ee,code:bt,del:P,emStrongLDelim:St,emStrongRDelimAst:Rt,emStrongRDelimUnd:At,escape:mt,link:zt,nolink:qe,punctuation:xt,reflink:Be,reflinkSearch:Ct,tag:Pt,text:wt,url:P},Mt={...ce,link:g(/^!?\[(label)\]\((.*?)\)/).replace("label",j).getRegex(),reflink:g(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",j).getRegex()},K={...ce,emStrongRDelimAst:Tt,emStrongLDelim:_t,url:g(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",we).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:g(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",we).getRegex()},Bt={...K,br:g(Ee).replace("{2,}","*").getRegex(),text:g(K.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},M={normal:le,gfm:ft,pedantic:kt},I={normal:ce,gfm:K,breaks:Bt,pedantic:Mt},qt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},xe=t=>qt[t];function S(t,e){if(e){if(x.escapeTest.test(t))return t.replace(x.escapeReplace,xe)}else if(x.escapeTestNoEncode.test(t))return t.replace(x.escapeReplaceNoEncode,xe);return t}function ve(t){try{t=encodeURI(t).replace(x.percentDecode,"%")}catch{return null}return t}function ye(t,e){let s=t.replace(x.findPipe,(a,i,c)=>{let o=!1,u=i;for(;--u>=0&&c[u]==="\\";)o=!o;return o?"|":" |"}),n=s.split(x.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(x.slashPipe,"|");return n}function L(t,e,s){let n=t.length;if(n===0)return"";let r=0;for(;r<n&&t.charAt(n-r-1)===e;)r++;return t.slice(0,n-r)}function jt(t,e){if(t.indexOf(e[1])===-1)return-1;let s=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])s++;else if(t[n]===e[1]&&(s--,s<0))return n;return s>0?-2:-1}function $e(t,e,s,n,r){let a=e.href,i=e.title||null,c=t[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let o={type:t[0].charAt(0)==="!"?"image":"link",raw:s,href:a,title:i,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,o}function Nt(t,e,s){let n=t.match(s.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(a=>{let i=a.match(s.other.beginningSpace);if(i===null)return a;let[c]=i;return c.length>=r.length?a.slice(r.length):a}).join(`
`)}var N=class{options;rules;lexer;constructor(t){this.options=t||T}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let s=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?s:L(s,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let s=e[0],n=Nt(s,e[3]||"",this.rules);return{type:"code",raw:s,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let s=e[2].trim();if(this.rules.other.endingHash.test(s)){let n=L(s,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(s=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:L(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let s=L(e[0],`
`).split(`
`),n="",r="",a=[];for(;s.length>0;){let i=!1,c=[],o;for(o=0;o<s.length;o++)if(this.rules.other.blockquoteStart.test(s[o]))c.push(s[o]),i=!0;else if(!i)c.push(s[o]);else break;s=s.slice(o);let u=c.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,r=r?`${r}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,a,!0),this.lexer.state.top=h,s.length===0)break;let d=a.at(-1);if(d?.type==="code")break;if(d?.type==="blockquote"){let k=d,m=k.raw+`
`+s.join(`
`),v=this.blockquote(m);a[a.length-1]=v,n=n.substring(0,n.length-k.raw.length)+v.raw,r=r.substring(0,r.length-k.text.length)+v.text;break}else if(d?.type==="list"){let k=d,m=k.raw+`
`+s.join(`
`),v=this.list(m);a[a.length-1]=v,n=n.substring(0,n.length-d.raw.length)+v.raw,r=r.substring(0,r.length-k.raw.length)+v.raw,s=m.substring(a.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:a,text:r}}}list(t){let e=this.rules.block.list.exec(t);if(e){let s=e[1].trim(),n=s.length>1,r={type:"list",raw:"",ordered:n,start:n?+s.slice(0,-1):"",loose:!1,items:[]};s=n?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=n?s:"[*+-]");let a=this.rules.other.listItemRegex(s),i=!1;for(;t;){let o=!1,u="",p="";if(!(e=a.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,W=>" ".repeat(3*W.length)),d=t.split(`
`,1)[0],k=!h.trim(),m=0;if(this.options.pedantic?(m=2,p=h.trimStart()):k?m=e[1].length+1:(m=e[2].search(this.rules.other.nonSpaceChar),m=m>4?1:m,p=h.slice(m),m+=e[1].length),k&&this.rules.other.blankLine.test(d)&&(u+=d+`
`,t=t.substring(d.length+1),o=!0),!o){let W=this.rules.other.nextBulletRegex(m),ge=this.rules.other.hrRegex(m),fe=this.rules.other.fencesBeginRegex(m),ke=this.rules.other.headingBeginRegex(m),et=this.rules.other.htmlBeginRegex(m);for(;t;){let U=t.split(`
`,1)[0],A;if(d=U,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),A=d):A=d.replace(this.rules.other.tabCharGlobal,"    "),fe.test(d)||ke.test(d)||et.test(d)||W.test(d)||ge.test(d))break;if(A.search(this.rules.other.nonSpaceChar)>=m||!d.trim())p+=`
`+A.slice(m);else{if(k||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||fe.test(h)||ke.test(h)||ge.test(h))break;p+=`
`+d}!k&&!d.trim()&&(k=!0),u+=U+`
`,t=t.substring(U.length+1),h=A.slice(m)}}r.loose||(i?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0));let v=null,he;this.options.gfm&&(v=this.rules.other.listIsTask.exec(p),v&&(he=v[0]!=="[ ] ",p=p.replace(this.rules.other.listReplaceTask,""))),r.items.push({type:"list_item",raw:u,task:!!v,checked:he,loose:!1,text:p,tokens:[]}),r.raw+=u}let c=r.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let o=0;o<r.items.length;o++)if(this.lexer.state.top=!1,r.items[o].tokens=this.lexer.blockTokens(r.items[o].text,[]),!r.loose){let u=r.items[o].tokens.filter(h=>h.type==="space"),p=u.length>0&&u.some(h=>this.rules.other.anyLine.test(h.raw));r.loose=p}if(r.loose)for(let o=0;o<r.items.length;o++)r.items[o].loose=!0;return r}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let s=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:s,raw:e[0],href:n,title:r}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let s=ye(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],a={type:"table",raw:e[0],header:[],align:[],rows:[]};if(s.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?a.align.push("right"):this.rules.other.tableAlignCenter.test(i)?a.align.push("center"):this.rules.other.tableAlignLeft.test(i)?a.align.push("left"):a.align.push(null);for(let i=0;i<s.length;i++)a.header.push({text:s[i],tokens:this.lexer.inline(s[i]),header:!0,align:a.align[i]});for(let i of r)a.rows.push(ye(i,a.header.length).map((c,o)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:a.align[o]})));return a}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let s=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:s,tokens:this.lexer.inline(s)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let s=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(s)){if(!this.rules.other.endAngleBracket.test(s))return;let a=L(s.slice(0,-1),"\\");if((s.length-a.length)%2===0)return}else{let a=jt(e[2],"()");if(a===-2)return;if(a>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+a;e[2]=e[2].substring(0,a),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],r="";if(this.options.pedantic){let a=this.rules.other.pedanticHrefTitle.exec(n);a&&(n=a[1],r=a[3])}else r=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(s)?n=n.slice(1):n=n.slice(1,-1)),$e(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let s;if((s=this.rules.inline.reflink.exec(t))||(s=this.rules.inline.nolink.exec(t))){let n=(s[2]||s[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[n.toLowerCase()];if(!r){let a=s[0].charAt(0);return{type:"text",raw:a,text:a}}return $e(s,r,s[0],this.lexer,this.rules)}}emStrong(t,e,s=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&s.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!s||this.rules.inline.punctuation.exec(s))){let r=[...n[0]].length-1,a,i,c=r,o=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+r);(n=u.exec(e))!=null;){if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!a)continue;if(i=[...a].length,n[3]||n[4]){c+=i;continue}else if((n[5]||n[6])&&r%3&&!((r+i)%3)){o+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+o);let p=[...n[0]][0].length,h=t.slice(0,r+n.index+p+i);if(Math.min(r,i)%2){let k=h.slice(1,-1);return{type:"em",raw:h,text:k,tokens:this.lexer.inlineTokens(k)}}let d=h.slice(2,-2);return{type:"strong",raw:h,text:d,tokens:this.lexer.inlineTokens(d)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let s=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(s),r=this.rules.other.startingSpaceChar.test(s)&&this.rules.other.endingSpaceChar.test(s);return n&&r&&(s=s.substring(1,s.length-1)),{type:"codespan",raw:e[0],text:s}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let s,n;return e[2]==="@"?(s=e[1],n="mailto:"+s):(s=e[1],n=s),{type:"link",raw:e[0],text:s,href:n,tokens:[{type:"text",raw:s,text:s}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let s,n;if(e[2]==="@")s=e[0],n="mailto:"+s;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);s=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:s,href:n,tokens:[{type:"text",raw:s,text:s}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let s=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:s}}}},y=class X{tokens;options;state;tokenizer;inlineQueue;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||T,this.options.tokenizer=this.options.tokenizer||new N,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let s={other:x,block:M.normal,inline:I.normal};this.options.pedantic?(s.block=M.pedantic,s.inline=I.pedantic):this.options.gfm&&(s.block=M.gfm,this.options.breaks?s.inline=I.breaks:s.inline=I.gfm),this.tokenizer.rules=s}static get rules(){return{block:M,inline:I}}static lex(e,s){return new X(s).lex(e)}static lexInline(e,s){return new X(s).inlineTokens(e)}lex(e){e=e.replace(x.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let s=0;s<this.inlineQueue.length;s++){let n=this.inlineQueue[s];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,s=[],n=!1){for(this.options.pedantic&&(e=e.replace(x.tabCharGlobal,"    ").replace(x.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(i=>(r=i.call({lexer:this},e,s))?(e=e.substring(r.raw.length),s.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let i=s.at(-1);r.raw.length===1&&i!==void 0?i.raw+=`
`:s.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let i=s.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.at(-1).src=i.text):s.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let i=s.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},s.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),s.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),s.push(r);continue}let a=e;if(this.options.extensions?.startBlock){let i=1/0,c=e.slice(1),o;this.options.extensions.startBlock.forEach(u=>{o=u.call({lexer:this},c),typeof o=="number"&&o>=0&&(i=Math.min(i,o))}),i<1/0&&i>=0&&(a=e.substring(0,i+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){let i=s.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):s.push(r),n=a.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let i=s.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):s.push(r);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,s}inline(e,s=[]){return this.inlineQueue.push({src:e,tokens:s}),s}inlineTokens(e,s=[]){let n=e,r=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let a;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)a=r[2]?r[2].length:0,n=n.slice(0,r.index+a)+"["+"a".repeat(r[0].length-a-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,c="";for(;e;){i||(c=""),i=!1;let o;if(this.options.extensions?.inline?.some(p=>(o=p.call({lexer:this},e,s))?(e=e.substring(o.raw.length),s.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let p=s.at(-1);o.type==="text"&&p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):s.push(o);continue}if(o=this.tokenizer.emStrong(e,n,c)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.del(e)){e=e.substring(o.raw.length),s.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),s.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),s.push(o);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),d;this.options.extensions.startInline.forEach(k=>{d=k.call({lexer:this},h),typeof d=="number"&&d>=0&&(p=Math.min(p,d))}),p<1/0&&p>=0&&(u=e.substring(0,p+1))}if(o=this.tokenizer.inlineText(u)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(c=o.raw.slice(-1)),i=!0;let p=s.at(-1);p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):s.push(o);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return s}},D=class{options;parser;constructor(t){this.options=t||T}space(t){return""}code({text:t,lang:e,escaped:s}){let n=(e||"").match(x.notSpaceStart)?.[0],r=t.replace(x.endingNewline,"")+`
`;return n?'<pre><code class="language-'+S(n)+'">'+(s?r:S(r,!0))+`</code></pre>
`:"<pre><code>"+(s?r:S(r,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,s=t.start,n="";for(let i=0;i<t.items.length;i++){let c=t.items[i];n+=this.listitem(c)}let r=e?"ol":"ul",a=e&&s!==1?' start="'+s+'"':"";return"<"+r+a+`>
`+n+"</"+r+`>
`}listitem(t){let e="";if(t.task){let s=this.checkbox({checked:!!t.checked});t.loose?t.tokens[0]?.type==="paragraph"?(t.tokens[0].text=s+" "+t.tokens[0].text,t.tokens[0].tokens&&t.tokens[0].tokens.length>0&&t.tokens[0].tokens[0].type==="text"&&(t.tokens[0].tokens[0].text=s+" "+S(t.tokens[0].tokens[0].text),t.tokens[0].tokens[0].escaped=!0)):t.tokens.unshift({type:"text",raw:s+" ",text:s+" ",escaped:!0}):e+=s+" "}return e+=this.parser.parse(t.tokens,!!t.loose),`<li>${e}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",s="";for(let r=0;r<t.header.length;r++)s+=this.tablecell(t.header[r]);e+=this.tablerow({text:s});let n="";for(let r=0;r<t.rows.length;r++){let a=t.rows[r];s="";for(let i=0;i<a.length;i++)s+=this.tablecell(a[i]);n+=this.tablerow({text:s})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),s=t.header?"th":"td";return(t.align?`<${s} align="${t.align}">`:`<${s}>`)+e+`</${s}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${S(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:s}){let n=this.parser.parseInline(s),r=ve(t);if(r===null)return n;t=r;let a='<a href="'+t+'"';return e&&(a+=' title="'+S(e)+'"'),a+=">"+n+"</a>",a}image({href:t,title:e,text:s,tokens:n}){n&&(s=this.parser.parseInline(n,this.parser.textRenderer));let r=ve(t);if(r===null)return S(s);t=r;let a=`<img src="${t}" alt="${s}"`;return e&&(a+=` title="${S(e)}"`),a+=">",a}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:S(t.text)}},pe=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}},$=class J{options;renderer;textRenderer;constructor(e){this.options=e||T,this.options.renderer=this.options.renderer||new D,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new pe}static parse(e,s){return new J(s).parse(e)}static parseInline(e,s){return new J(s).parseInline(e)}parse(e,s=!0){let n="";for(let r=0;r<e.length;r++){let a=e[r];if(this.options.extensions?.renderers?.[a.type]){let c=a,o=this.options.extensions.renderers[c.type].call({parser:this},c);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(c.type)){n+=o||"";continue}}let i=a;switch(i.type){case"space":{n+=this.renderer.space(i);continue}case"hr":{n+=this.renderer.hr(i);continue}case"heading":{n+=this.renderer.heading(i);continue}case"code":{n+=this.renderer.code(i);continue}case"table":{n+=this.renderer.table(i);continue}case"blockquote":{n+=this.renderer.blockquote(i);continue}case"list":{n+=this.renderer.list(i);continue}case"html":{n+=this.renderer.html(i);continue}case"def":{n+=this.renderer.def(i);continue}case"paragraph":{n+=this.renderer.paragraph(i);continue}case"text":{let c=i,o=this.renderer.text(c);for(;r+1<e.length&&e[r+1].type==="text";)c=e[++r],o+=`
`+this.renderer.text(c);s?n+=this.renderer.paragraph({type:"paragraph",raw:o,text:o,tokens:[{type:"text",raw:o,text:o,escaped:!0}]}):n+=o;continue}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}parseInline(e,s=this.renderer){let n="";for(let r=0;r<e.length;r++){let a=e[r];if(this.options.extensions?.renderers?.[a.type]){let c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(a.type)){n+=c||"";continue}}let i=a;switch(i.type){case"escape":{n+=s.text(i);break}case"html":{n+=s.html(i);break}case"link":{n+=s.link(i);break}case"image":{n+=s.image(i);break}case"strong":{n+=s.strong(i);break}case"em":{n+=s.em(i);break}case"codespan":{n+=s.codespan(i);break}case"br":{n+=s.br(i);break}case"del":{n+=s.del(i);break}case"text":{n+=s.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},E=class{options;block;constructor(t){this.options=t||T}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?y.lex:y.lexInline}provideParser(){return this.block?$.parse:$.parseInline}},Dt=class{defaults=re();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=$;Renderer=D;TextRenderer=pe;Lexer=y;Tokenizer=N;Hooks=E;constructor(...t){this.use(...t)}walkTokens(t,e){let s=[];for(let n of t)switch(s=s.concat(e.call(this,n)),n.type){case"table":{let r=n;for(let a of r.header)s=s.concat(this.walkTokens(a.tokens,e));for(let a of r.rows)for(let i of a)s=s.concat(this.walkTokens(i.tokens,e));break}case"list":{let r=n;s=s.concat(this.walkTokens(r.items,e));break}default:{let r=n;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(a=>{let i=r[a].flat(1/0);s=s.concat(this.walkTokens(i,e))}):r.tokens&&(s=s.concat(this.walkTokens(r.tokens,e)))}}return s}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(s=>{let n={...s};if(n.async=this.defaults.async||n.async||!1,s.extensions&&(s.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let a=e.renderers[r.name];a?e.renderers[r.name]=function(...i){let c=r.renderer.apply(this,i);return c===!1&&(c=a.apply(this,i)),c}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let a=e[r.level];a?a.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),n.extensions=e),s.renderer){let r=this.defaults.renderer||new D(this.defaults);for(let a in s.renderer){if(!(a in r))throw new Error(`renderer '${a}' does not exist`);if(["options","parser"].includes(a))continue;let i=a,c=s.renderer[i],o=r[i];r[i]=(...u)=>{let p=c.apply(r,u);return p===!1&&(p=o.apply(r,u)),p||""}}n.renderer=r}if(s.tokenizer){let r=this.defaults.tokenizer||new N(this.defaults);for(let a in s.tokenizer){if(!(a in r))throw new Error(`tokenizer '${a}' does not exist`);if(["options","rules","lexer"].includes(a))continue;let i=a,c=s.tokenizer[i],o=r[i];r[i]=(...u)=>{let p=c.apply(r,u);return p===!1&&(p=o.apply(r,u)),p}}n.tokenizer=r}if(s.hooks){let r=this.defaults.hooks||new E;for(let a in s.hooks){if(!(a in r))throw new Error(`hook '${a}' does not exist`);if(["options","block"].includes(a))continue;let i=a,c=s.hooks[i],o=r[i];E.passThroughHooks.has(a)?r[i]=u=>{if(this.defaults.async&&E.passThroughHooksRespectAsync.has(a))return(async()=>{let h=await c.call(r,u);return o.call(r,h)})();let p=c.call(r,u);return o.call(r,p)}:r[i]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await c.apply(r,u);return h===!1&&(h=await o.apply(r,u)),h})();let p=c.apply(r,u);return p===!1&&(p=o.apply(r,u)),p}}n.hooks=r}if(s.walkTokens){let r=this.defaults.walkTokens,a=s.walkTokens;n.walkTokens=function(i){let c=[];return c.push(a.call(this,i)),r&&(c=c.concat(r.call(this,i))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return y.lex(t,e??this.defaults)}parser(t,e){return $.parse(t,e??this.defaults)}parseMarkdown(t){return(e,s)=>{let n={...s},r={...this.defaults,...n},a=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&n.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=t),r.async)return(async()=>{let i=r.hooks?await r.hooks.preprocess(e):e,c=await(r.hooks?await r.hooks.provideLexer():t?y.lex:y.lexInline)(i,r),o=r.hooks?await r.hooks.processAllTokens(c):c;r.walkTokens&&await Promise.all(this.walkTokens(o,r.walkTokens));let u=await(r.hooks?await r.hooks.provideParser():t?$.parse:$.parseInline)(o,r);return r.hooks?await r.hooks.postprocess(u):u})().catch(a);try{r.hooks&&(e=r.hooks.preprocess(e));let i=(r.hooks?r.hooks.provideLexer():t?y.lex:y.lexInline)(e,r);r.hooks&&(i=r.hooks.processAllTokens(i)),r.walkTokens&&this.walkTokens(i,r.walkTokens);let c=(r.hooks?r.hooks.provideParser():t?$.parse:$.parseInline)(i,r);return r.hooks&&(c=r.hooks.postprocess(c)),c}catch(i){return a(i)}}}onError(t,e){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+S(s.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(s);throw s}}},R=new Dt;function f(t,e){return R.parse(t,e)}f.options=f.setOptions=function(t){return R.setOptions(t),f.defaults=R.defaults,Te(f.defaults),f};f.getDefaults=re;f.defaults=T;f.use=function(...t){return R.use(...t),f.defaults=R.defaults,Te(f.defaults),f};f.walkTokens=function(t,e){return R.walkTokens(t,e)};f.parseInline=R.parseInline;f.Parser=$;f.parser=$.parse;f.Renderer=D;f.TextRenderer=pe;f.Lexer=y;f.lexer=y.lex;f.Tokenizer=N;f.Hooks=E;f.parse=f;f.options;f.setOptions;f.use;f.walkTokens;f.parseInline;$.parse;y.lex;const b=document.querySelector("#app"),je="fixed-top-bench-atlas-progress-v1",Ot=new Set(["build","atlas","library"]),G="/table-saw-project/";let B=null;const l={data:null,model:null,currentStepId:null,currentMediaId:null,currentResourceId:null,resourceQuery:"",resourceCategory:"all",viewer:null,progress:null,viewMode:"build",shareStatus:"",shareStatusTimer:null,viewerLoadToken:0};function Y(t){return{docs:"Docs",models:"Model",plans:"Plans",drawings:"Drawings",renders:"Renders",data:"Data"}[t]||t}function _(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function O(t){if(!t||/^(?:[a-z]+:)?\/\//i.test(t)||t.startsWith("data:"))return t;const e=G.endsWith("/")?G:`${G}/`,s=t.startsWith("/")?t.slice(1):t;return`${e}${s}`}function C(){return l.data.steps.find(t=>t.id===l.currentStepId)||l.data.steps[0]}function Zt(){return l.data.resources.find(t=>t.id===l.currentResourceId)||l.data.resources[0]}function Ne(t=C()){return t.media.find(e=>e===l.currentMediaId)||t.media[0]||null}function Ft(t=C()){const e=Ne(t);return e?We(e):null}function De(t){return l.data.steps.findIndex(e=>e.id===t)}function ee(){const t=De(l.currentStepId);return t>0?l.data.steps[t-1].id:null}function te(){const t=De(l.currentStepId);return t>=0&&t<l.data.steps.length-1?l.data.steps[t+1].id:null}function V(){return{completedSteps:{},actions:{},holdPoints:{},notes:{}}}function Oe(){try{const t=window.localStorage.getItem(je);return t?{...V(),...JSON.parse(t)}:V()}catch{return V()}}function q(){window.localStorage.setItem(je,JSON.stringify(l.progress))}function Ze(t,e){return`${t}:action:${e}`}function Fe(t,e){return`${t}:hold:${e}`}function He(t,e){return!!l.progress.actions[Ze(t,e)]}function Qe(t,e){return!!l.progress.holdPoints[Fe(t,e)]}function Ht(t){return t.actions.filter((e,s)=>He(t.id,s)).length}function Qt(t){return t.hold_points.filter((e,s)=>Qe(t.id,s)).length}function Z(t){return!!l.progress.completedSteps[t]}function Wt(t){return l.data.resources.find(e=>e.id===t)}function Ut(t){return l.data.gates.find(e=>e.id===t)}function We(t){return l.data.media.find(e=>e.id===t)}function Gt(){const t=l.resourceQuery.trim().toLowerCase();return l.data.resources.filter(e=>l.resourceCategory!=="all"&&e.category!==l.resourceCategory?!1:t?[e.title,e.path,e.summary||"",e.category].join(" ").toLowerCase().includes(t):!0)}function Ue(t){return f.parse(t,{mangle:!1,headerIds:!1})}function Vt(t){return f.parseInline(t,{mangle:!1,headerIds:!1})}function Kt(t){const e=t.columns||[],s=t.preview_rows||[];return`
    <div class="resource-table-shell">
      <div class="resource-table-head">${t.summary}</div>
      <div class="resource-table-scroll">
        <table class="resource-table">
          <thead>
            <tr>${e.map(n=>`<th>${_(n)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${s.map(n=>`
                  <tr>${e.map(r=>`<td>${_(String(n[r]??""))}</td>`).join("")}</tr>
                `).join("")}
          </tbody>
        </table>
      </div>
      <p class="resource-table-note">Previewing the first ${s.length} rows from the source CSV.</p>
    </div>
  `}function Xt(t){return`<pre class="code-block">${_(t.body||"")}</pre>`}function Jt(t){return`
    <figure class="image-viewer">
      <img src="${O(t.media_path)}" alt="${t.title}" />
      <figcaption>${t.title}</figcaption>
    </figure>
  `}function Yt(t){return t?t.type==="markdown"?`<div class="markdown-body">${Ue(t.body)}</div>`:t.type==="csv"?Kt(t):t.type==="json"?Xt(t):t.type==="image"?Jt(t):'<div class="empty-state">No renderer for this resource type.</div>':'<div class="empty-state">Pick a file to inspect the underlying source.</div>'}function Ge(t){return t.resources.map(Wt).filter(Boolean)}function er(t){return t.gate_ids.map(Ut).filter(Boolean)}function ue(t){return Ot.has(t)?t:"build"}function Se(){const t=new URLSearchParams(window.location.search),e=t.get("step"),s=t.get("media"),n=t.get("resource"),r=t.get("mode");e&&l.data.steps.some(a=>a.id===e)&&(l.currentStepId=e),s&&(l.currentMediaId=s),n&&l.data.resources.some(a=>a.id===n)&&(l.currentResourceId=n),r&&(l.viewMode=ue(r))}function tr(){const t=new URL(window.location.href);t.searchParams.set("step",l.currentStepId),t.searchParams.set("mode",l.viewMode),l.currentMediaId?t.searchParams.set("media",l.currentMediaId):t.searchParams.delete("media"),l.currentResourceId?t.searchParams.set("resource",l.currentResourceId):t.searchParams.delete("resource");const e=`${t.pathname}?${t.searchParams.toString()}`;window.history.replaceState({},"",e)}function rr(){l.progress||(l.progress=Oe()),(!l.currentStepId||!l.data.steps.some(e=>e.id===l.currentStepId))&&(l.currentStepId=l.data.landing_step),l.viewMode=ue(l.viewMode);const t=C();(!l.currentMediaId||!t.media.includes(l.currentMediaId))&&(l.currentMediaId=t.media[0]||null),(!l.currentResourceId||!l.data.resources.some(e=>e.id===l.currentResourceId))&&(l.currentResourceId=t.resources[0]||l.data.landing_resource)}function Ve(t){l.shareStatus=t,l.shareStatusTimer&&window.clearTimeout(l.shareStatusTimer),l.shareStatusTimer=window.setTimeout(()=>{l.shareStatus="",w()},2200)}function sr(){return B||(B=st(()=>import("./model-viewer-BijRJh67.js"),[]).catch(t=>{throw B=null,t})),B}function F(t){if(!t||!l.data.steps.some(s=>s.id===t))return;l.currentStepId=t;const e=C();l.currentMediaId=e.media[0]||null,l.currentResourceId=e.resources[0]||l.currentResourceId,w()}function nr(t){l.viewMode=ue(t),w()}async function ar(){const t=window.location.href;try{await navigator.clipboard.writeText(t),Ve("Link copied"),w()}catch{window.prompt("Copy this link",t)}}async function ir(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{Ve("Fullscreen unavailable")}}function Ke(){const t=()=>{window.requestAnimationFrame(()=>{window.requestAnimationFrame(()=>window.print())})};if(l.viewMode!=="build"){l.viewMode="build",w(),t();return}t()}function lr(t){return Z(t.id)?{label:"Done",className:"is-done"}:t.gate_ids.length||t.gate_summary.some(e=>e.gate!=="cut_now")?{label:"Watch gates",className:"is-gated"}:{label:"Ready",className:"is-ready"}}function _e(t){return String(t||"").replaceAll("_"," ").replace(/\b\w/g,e=>e.toUpperCase())}function Xe(t){return l.data.steps.length?Math.round(t/l.data.steps.length*100):0}function or(){const t=l.data?.dashboard?.project_snapshot?.[0];if(t)return t.replace(/\s+fixed-top bench$/i,"");const e=l.model?.metadata?.overall_bounds?.max,s=l.model?.metadata?.units||"in";return!e||e.length<3?"":`${e[0]} × ${e[1]} × ${e[2]} ${s}`}function cr(){const t=new Set;return l.data.steps.forEach(e=>{e.part_cards.forEach(s=>t.add(s.part_id))}),t.size}function pr(){const t=l.data.dashboard||{};return[...t.stats||[],...t.data_cards||[]]}function ur(t,e=""){return`
    <div class="metric-grid ${e}">
      ${t.map(s=>`
            <article class="metric-card">
              <strong>${_(s.value)}</strong>
              <span>${_(s.label)}</span>
            </article>
          `).join("")}
    </div>
  `}function dr(t,e,s,n){const r=document.fullscreenElement?"Exit fullscreen":"Fullscreen",a=Xe(n);return`
    <div class="command-deck">
      <div class="command-deck__actions">
        <button class="nav-chip" data-jump-step="${e||""}" ${e?"":"disabled"}>Previous</button>
        <button class="nav-chip nav-chip--primary" data-jump-step="${s||""}" ${s?"":"disabled"}>Next</button>
        <button class="nav-chip ${Z(t.id)?"is-active":""}" data-toggle-step-done="${t.id}">
          ${Z(t.id)?"Marked done":"Mark step done"}
        </button>
      </div>
      <div class="command-deck__actions command-deck__actions--utility">
        <button class="nav-chip" data-print-packet>Print packet</button>
        <button class="nav-chip" data-copy-link>${l.shareStatus||"Copy link"}</button>
        <button class="nav-chip" data-toggle-fullscreen>${r}</button>
      </div>
      <div class="command-deck__progress">
        <div class="progress-track" aria-hidden="true">
          <span style="width:${a}%"></span>
        </div>
        <div class="command-deck__metrics">
          <div class="metric-pill">
            <strong>${a}%</strong>
            <span>complete</span>
          </div>
          <div class="metric-pill">
            <strong>${Ht(t)}/${t.actions.length}</strong>
            <span>actions</span>
          </div>
          <div class="metric-pill">
            <strong>${Qt(t)}/${t.hold_points.length}</strong>
            <span>holds cleared</span>
          </div>
          <div class="metric-pill">
            <strong>${t.part_cards.length}</strong>
            <span>parts in play</span>
          </div>
        </div>
      </div>
    </div>
  `}function Re(t,e){const s=e==="hold"?t.hold_points:t.actions,n=e==="hold"?Qe:He,r=e==="hold"?"data-hold-check":"data-action-check",a=e==="hold"?"No hold points captured for this step.":"No action checklist items were parsed for this step.";return s.length?`
    <div class="task-list">
      ${s.map((i,c)=>`
            <label class="task-row ${n(t.id,c)?"is-checked":""}">
              <span class="task-row__toggle">
                <input type="checkbox" ${r}="${c}" ${n(t.id,c)?"checked":""} />
              </span>
              <span class="task-row__index">${String(c+1).padStart(2,"0")}</span>
              <span class="task-row__body">${e==="hold"?_(i):Vt(i)}</span>
            </label>
          `).join("")}
    </div>
  `:`<div class="empty-state empty-state--compact">${a}</div>`}function hr(t,e=""){return t.part_cards.length?`
    <div class="part-card-grid ${e}">
      ${t.part_cards.map(s=>`
            <article class="part-card">
              <div class="part-card__head">
                <strong>${s.part_id}</strong>
                <span class="chip ${s.gate==="cut_now"?"":"chip--warn"}">${s.gate_label}</span>
              </div>
              <p>${s.material} · qty ${s.qty}</p>
              <p class="part-card__dims">${s.final_l} × ${s.final_w} × ${s.thickness}</p>
              <small>${_(s.notes||"No extra notes attached to this part.")}</small>
            </article>
          `).join("")}
    </div>
  `:'<div class="empty-state empty-state--compact">No cut-list parts were linked to this step.</div>'}function Je(t,e,s=!1){return`
    <aside class="reference-board ${s?"reference-board--compact":""}">
      <div class="reference-board__header">
        <p class="eyebrow">Reference Plate</p>
        <h3>${e?e.title:"No reference image linked"}</h3>
        <p class="reference-board__summary">
          ${e?"Use this alongside the live stage state. Treat it as an orientation plate, not a direct machining template.":"This step currently relies on the live model and linked source files more than on a dedicated drawing."}
        </p>
      </div>
      <div class="reference-board__frame">
        ${e?`<img class="reference-board__image" src="${O(e.path)}" alt="${e.title}" />`:'<div class="empty-stage">No media plate linked to this stage.</div>'}
      </div>
      <div class="media-strip" data-print-hide="true">
        ${t.media.map(n=>{const r=We(n);return r?`
              <button class="media-chip ${n===Ne(t)?"is-active":""}" data-media-id="${n}">
                ${r.title}
              </button>
            `:""}).join("")}
      </div>
    </aside>
  `}function Ye(t){return t.length?t.map(e=>`
        <div class="gate-card">
          <strong>${e.title}</strong>
          <div class="markdown-body gate-card__body">${Ue(e.body)}</div>
          <div class="chip-row">
            ${e.parts.map(s=>`<span class="chip chip--warn">${s}</span>`).join("")}
          </div>
        </div>
      `).join(""):'<div class="empty-state empty-state--compact">This stage has no additional gate board linked beyond the general packet.</div>'}function de(t){return t.length?`
    <div class="packet-resource-list">
      ${t.map(e=>`
            <button class="resource-card resource-card--packet" data-open-resource-library="${e.id}">
              <span class="resource-meta">${Y(e.category)} · ${e.extension}</span>
              <strong>${e.title}</strong>
              <small>${e.summary||e.path}</small>
              <span class="resource-card__hint">Open in library</span>
            </button>
          `).join("")}
    </div>
  `:'<div class="empty-state empty-state--compact">No step-specific references linked here yet.</div>'}function gr(t){return`
    <div class="stage-rail" data-print-hide="true">
      ${l.data.steps.map(e=>{const s=lr(e);return`
            <button class="stage-card ${e.id===t.id?"is-active":""} ${s.className}" data-step-id="${e.id}">
              <span class="stage-card__index">${String(e.number).padStart(2,"0")}</span>
              <span class="stage-card__copy">
                <strong>${e.title}</strong>
                <small>${e.actions.length} actions · ${e.part_cards.length} parts</small>
              </span>
              <span class="stage-card__status">${s.label}</span>
            </button>
          `}).join("")}
    </div>
  `}function fr(){return`
    <div class="workspace-tabs" data-print-hide="true">
      ${[["build","Build","Checklist"],["atlas","Atlas","3D model"],["library","Library","Source files"]].map(([t,e,s])=>`
            <button class="workspace-tab ${l.viewMode===t?"is-active":""}" data-set-mode="${t}">
              <strong>${e}</strong>
              <small>${s}</small>
            </button>
          `).join("")}
    </div>
  `}function kr(t){return`
    <section class="navigator panel">
      <div class="navigator__top">
        <div>
          <p class="eyebrow">Build Flow</p>
          <h2>Stages And Workspaces</h2>
          <p class="navigator__summary">Move through the build order, jump into the 3D atlas, or browse the source library.</p>
        </div>
        ${fr()}
      </div>
      ${gr(t)}
    </section>
  `}function mr(t){return`
    <div class="atlas-loading">
      <p class="eyebrow">3D atlas loading</p>
      <h3>${t.number}. ${t.title}</h3>
      <p>${t.focus}</p>
      <div class="atlas-loading__pulse" aria-hidden="true"></div>
      <small>The interactive model loads separately so the packet UI stays responsive.</small>
    </div>
  `}function br(t,e,s,n){const r=l.data.dashboard||{},a=or();return`
    <header class="masthead panel">
      <div class="masthead__grid">
        <div class="masthead__copy">
          <p class="eyebrow">Table Saw Project Atlas</p>
          <h1>${r.headline||"A digital build manual for the fixed-top bench"}</h1>
          <p class="masthead__summary">${r.subheadline||t.summary}</p>
          <div class="chip-row chip-row--hero">
            ${a?`<span class="chip chip--strong">${a}</span>`:""}
            <span class="chip">${cr()} tracked parts</span>
            <span class="chip">${l.data.resources.length} live resources</span>
          </div>

          <div class="masthead__current">
            <p class="eyebrow">Current Stage</p>
            <h2>${t.number}. ${t.title}</h2>
            <p class="masthead__focus">${t.focus}</p>
            <p class="masthead__detail">${t.summary}</p>
            ${t.warnings.length?`
                  <ul class="snapshot-list snapshot-list--compact">
                    ${t.warnings.map(i=>`<li>${i}</li>`).join("")}
                  </ul>
                `:""}
          </div>
        </div>

        <div class="masthead__side">
          <article class="info-card info-card--dark">
            <p class="eyebrow">Bench Snapshot</p>
            <h3>What this project is</h3>
            <ul class="snapshot-list">
              ${(r.project_snapshot||[]).map(i=>`<li>${i}</li>`).join("")}
            </ul>
            ${(l.data.notes||[]).length?`
                  <div class="masthead__notes">
                    ${(l.data.notes||[]).map(i=>`<p>${i}</p>`).join("")}
                  </div>
                `:""}
          </article>

          <article class="info-card">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Live Package</p>
                <h3>Project signals</h3>
              </div>
              <span class="panel-kicker">${Xe(n)}% complete</span>
            </div>
            ${ur(pr())}
          </article>

          <article class="info-card">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Control Deck</p>
                <h3>Share and navigate</h3>
              </div>
              <span class="panel-kicker">${n}/${l.data.steps.length} done</span>
            </div>
            ${dr(t,e,s,n)}
          </article>
        </div>
      </div>
    </header>
  `}function wr({step:t,media:e,stepResourceCards:s,stepGateCards:n}){const r=t.gate_summary.some(a=>a.gate!=="cut_now");return`
    <section class="workspace workspace--build">
      <div class="build-layout">
        <article class="panel build-brief">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Guided Build</p>
              <h2>Make this stage tangible</h2>
            </div>
            <button class="nav-chip nav-chip--primary" data-set-mode="atlas">Open 3D atlas</button>
          </div>
          <p class="build-brief__focus">${t.focus}</p>
          <p class="build-brief__summary">${t.summary}</p>
          ${Re(t,"action")}
        </article>

        <article class="panel build-risk ${r?"build-risk--warn":""}">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Risk Board</p>
              <h2>Hold points and gates</h2>
            </div>
            <span class="panel-kicker">${t.hold_points.length} checks</span>
          </div>
          <p class="build-risk__summary">
            ${r?"This step still has gated parts or proof items. Resolve the hold points before cutting or fastening the blocked work.":"Use these checks to avoid locking bad geometry into the bench."}
          </p>
          ${Re(t,"hold")}
          <div class="build-risk__gates">
            ${Ye(n)}
          </div>
        </article>

        <article class="panel build-reference">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Visual anchor</p>
              <h2>Step snapshot</h2>
            </div>
            <button class="nav-chip" data-set-mode="library">Open library</button>
          </div>
          ${Je(t,e,!0)}
        </article>

        <article class="panel build-files">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Source pack</p>
              <h2>Step files</h2>
            </div>
            <span class="panel-kicker">${s.length} files</span>
          </div>
          ${de(s)}
        </article>

        <article class="panel build-parts">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Fabrication map</p>
              <h2>Parts in play</h2>
            </div>
            <span class="panel-kicker">${t.part_cards.length} tracked</span>
          </div>
          ${hr(t,"part-card-grid--dense")}
        </article>

        <article class="panel build-notes">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Field notes</p>
              <h2>What you learned</h2>
            </div>
            <span class="panel-kicker">saved locally</span>
          </div>
          <label class="notes-field">
            <span>Record fit-up notes, substitutions, spacer logic, or reminders for later steps.</span>
            <textarea data-step-notes rows="10" placeholder="Example: use a spacer block for LM-02 before driving screws...">${_(l.progress.notes[t.id]||"")}</textarea>
          </label>
        </article>
      </div>
    </section>
  `}function xr({step:t,media:e,stepResourceCards:s,stepGateCards:n}){const r=l.model?.metadata||{};return`
    <section class="workspace workspace--atlas">
      <div class="atlas-layout">
        <article class="panel atlas-stage">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">3D Atlas</p>
              <h2>Explore the bench in context</h2>
            </div>
            <button class="nav-chip" data-set-mode="build">Back to build</button>
          </div>
          <p class="atlas-stage__summary">${t.focus}</p>
          <div id="modelViewerMount"></div>
        </article>

        <aside class="atlas-support">
          <article class="panel atlas-support__callouts">
            <div class="panel-title-row">
              <div>
                <p class="eyebrow">Step lens</p>
                <h2>What to watch</h2>
              </div>
              <button class="nav-chip" data-set-mode="library">Open docs</button>
            </div>
            <ul class="checkpoint-list">
              ${t.warnings.map(a=>`<li>${a}</li>`).join("")}
              ${t.viewer.callouts.map(a=>`<li>${a}</li>`).join("")}
            </ul>
            <div class="chip-row">
              ${t.gate_summary.map(a=>`<span class="chip ${a.gate==="cut_now"?"":"chip--warn"}">${a.count} ${a.gate_label}</span>`).join("")}
            </div>
            <div class="atlas-meta-grid">
              <article class="atlas-note">
                <span>Precision policy</span>
                <strong>${_e(r.precision_ready_policy||"manual fit")}</strong>
              </article>
              <article class="atlas-note">
                <span>Dust status</span>
                <strong>${_e(r.dust_mockup_status||"pending")}</strong>
              </article>
              <article class="atlas-note">
                <span>Manual fit items</span>
                <strong>${(r.manual_fit_required||[]).length}</strong>
              </article>
            </div>
          </article>

          <article class="panel atlas-support__reference">
            ${Je(t,e,!0)}
          </article>

          <article class="panel atlas-support__resources">
            <div class="panel-title-row">
              <h2>Step Files</h2>
              <span class="panel-kicker">${s.length} files</span>
            </div>
            ${de(s)}
          </article>

          ${n.length?`
                <article class="panel atlas-support__gates">
                  <div class="panel-title-row">
                    <h2>Gate Board</h2>
                    <span class="panel-kicker">${n.length} active gates</span>
                  </div>
                  ${Ye(n)}
                </article>
              `:""}
        </aside>
      </div>
    </section>
  `}function vr({step:t,resource:e}){const s=Gt(),n=Ge(t);return`
    <section class="workspace workspace--library">
      <div class="library-layout">
        <aside class="panel library-sidebar">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Project library</p>
              <h2>Source files and notes</h2>
            </div>
            <span class="panel-kicker">${s.length} shown</span>
          </div>

          <div class="library-current">
            <p class="eyebrow">Current step</p>
            <h3>${t.number}. ${t.title}</h3>
            <p>${t.focus}</p>
          </div>

          <label class="search-field">
            <span>Search files</span>
            <input type="search" value="${_(l.resourceQuery)}" placeholder="assembly, dust, drawing..." />
          </label>

          <div class="filter-row">
            ${["all","plans","drawings","renders","docs","models","data"].map(r=>`
                  <button class="filter-chip ${l.resourceCategory===r?"is-active":""}" data-filter="${r}">
                    ${r==="all"?"All":Y(r)}
                  </button>
                `).join("")}
          </div>

          <div class="library-pins">
            <div class="panel-title-row">
              <h3>Current step files</h3>
              <button class="nav-chip" data-set-mode="build">Back to build</button>
            </div>
            ${de(n)}
          </div>

          <div class="resource-list library-resource-list">
            ${s.map(r=>`
                  <button class="resource-list-item ${r.id===e.id?"is-active":""}" data-resource-id="${r.id}">
                    <span class="resource-meta">${Y(r.category)} · ${r.extension}</span>
                    <strong>${r.title}</strong>
                    <small>${r.summary||r.path}</small>
                  </button>
                `).join("")}
          </div>
        </aside>

        <article class="panel library-reader">
          <div class="panel-title-row">
            <div>
              <p class="eyebrow">Reader</p>
              <h2>${e.title}</h2>
            </div>
            <span class="panel-kicker">${e.path}</span>
          </div>
          ${Yt(e)}
        </article>
      </div>
    </section>
  `}function w(){rr(),tr();const t=C(),e=ee(),s=te(),n=Zt(),r=Ft(t),a=Ge(t),i=er(t),c=l.data.steps.filter(u=>Z(u.id)).length,o=l.viewMode==="build"?wr({step:t,media:r,stepResourceCards:a,stepGateCards:i}):l.viewMode==="atlas"?xr({step:t,media:r,stepResourceCards:a,stepGateCards:i}):vr({step:t,resource:n});b.innerHTML=`
    <div class="app-shell">
      ${br(t,e,s,c)}
      ${kr(t)}
      ${o}
    </div>
  `,yr(),l.viewMode==="atlas"?$r(t):l.viewer&&(l.viewer.destroy(),l.viewer=null)}function yr(){b.querySelectorAll("[data-step-id]").forEach(a=>{a.addEventListener("click",()=>{F(a.dataset.stepId)})}),b.querySelectorAll("[data-jump-step]").forEach(a=>{a.disabled||a.addEventListener("click",()=>{F(a.dataset.jumpStep)})}),b.querySelectorAll("[data-toggle-step-done]").forEach(a=>{a.addEventListener("click",()=>{const i=a.dataset.toggleStepDone;l.progress.completedSteps[i]=!l.progress.completedSteps[i],q(),w()})}),b.querySelectorAll("[data-set-mode]").forEach(a=>{a.addEventListener("click",()=>{nr(a.dataset.setMode)})}),b.querySelectorAll("[data-media-id]").forEach(a=>{a.addEventListener("click",()=>{l.currentMediaId=a.dataset.mediaId,w()})}),b.querySelectorAll("[data-resource-id]").forEach(a=>{a.addEventListener("click",()=>{l.currentResourceId=a.dataset.resourceId,w()})}),b.querySelectorAll("[data-open-resource-library]").forEach(a=>{a.addEventListener("click",()=>{l.currentResourceId=a.dataset.openResourceLibrary,l.viewMode="library",w()})}),b.querySelectorAll("[data-filter]").forEach(a=>{a.addEventListener("click",()=>{l.resourceCategory=a.dataset.filter,w()})});const t=b.querySelector("input[type='search']");t&&t.addEventListener("input",a=>{l.resourceQuery=a.currentTarget.value,w()}),b.querySelectorAll("[data-action-check]").forEach(a=>{a.addEventListener("change",()=>{l.progress.actions[Ze(l.currentStepId,Number(a.dataset.actionCheck))]=a.checked,q(),w()})}),b.querySelectorAll("[data-hold-check]").forEach(a=>{a.addEventListener("change",()=>{l.progress.holdPoints[Fe(l.currentStepId,Number(a.dataset.holdCheck))]=a.checked,q(),w()})});const e=b.querySelector("[data-step-notes]");e&&e.addEventListener("input",a=>{l.progress.notes[l.currentStepId]=a.currentTarget.value,q()});const s=b.querySelector("[data-copy-link]");s&&s.addEventListener("click",()=>{ar()});const n=b.querySelector("[data-print-packet]");n&&n.addEventListener("click",()=>{Ke()});const r=b.querySelector("[data-toggle-fullscreen]");r&&r.addEventListener("click",()=>{ir()})}async function $r(t){const e=b.querySelector("#modelViewerMount");if(!e||!l.model)return;l.viewer&&(l.viewer.destroy(),l.viewer=null);const s=++l.viewerLoadToken;e.innerHTML=mr(t);try{const{createModelViewer:n}=await sr();if(s!==l.viewerLoadToken||!e.isConnected)return;l.viewer=n(e,l.model,{...t.viewer,summary:t.focus})}catch(n){if(s!==l.viewerLoadToken||!e.isConnected)return;l.viewer=null,e.innerHTML=`
      <div class="atlas-fallback">
        <p class="eyebrow">3D atlas unavailable</p>
        <h3>WebGL is not available in this browser context.</h3>
        <p>${t.focus}</p>
        <ul>
          ${t.viewer.callouts.map(r=>`<li>${r}</li>`).join("")}
        </ul>
      </div>
    `,console.error(n)}}async function Sr(){const[t,e]=await Promise.all([fetch(O("generated/instructions-data.json")),fetch(O("generated/bench-model.json"))]);if(!t.ok)throw new Error(`Failed to load generated site data: ${t.status}`);if(!e.ok)throw new Error(`Failed to load generated 3D model: ${e.status}`);l.data=await t.json(),l.model=await e.json(),l.progress=Oe(),Se(),window.addEventListener("keydown",s=>{s.target&&["INPUT","TEXTAREA"].includes(s.target.tagName)||(s.key==="ArrowRight"&&te()&&F(te()),s.key==="ArrowLeft"&&ee()&&F(ee()),s.key.toLowerCase()==="p"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),Ke()))}),window.addEventListener("fullscreenchange",()=>w()),window.addEventListener("popstate",()=>{Se(),w()}),w()}Sr().catch(t=>{b.innerHTML=`
    <div class="fatal">
      <p class="eyebrow">Instructions site failed to load</p>
      <h1>${t.message}</h1>
      <p>Run \`npm run build:content\` inside \`site/\` to regenerate the project data bundle.</p>
    </div>
  `});
