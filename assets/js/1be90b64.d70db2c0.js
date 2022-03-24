"use strict";(self.webpackChunkleseq_docs=self.webpackChunkleseq_docs||[]).push([[968],{876:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return d}});var a=t(2784);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},f=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),f=c(t),d=r,m=f["".concat(s,".").concat(d)]||f[d]||u[d]||o;return t?a.createElement(m,i(i({ref:n},p),{},{components:t})):a.createElement(m,i({ref:n},p))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=f;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},8254:function(e,n,t){t.r(n),t.d(n,{assets:function(){return p},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return u}});var a=t(7896),r=t(1461),o=(t(2784),t(876)),i=["components"],l={id:"finalize",title:"Finalization, and Resource Management",sidebar_label:"Finalization, and Resource Management",sidebar_position:.5,custom_edit_url:null,hide_title:!0},s=void 0,c={unversionedId:"finalize",id:"finalize",title:"Finalization, and Resource Management",description:"Finalization, and Resource Management",source:"@site/docs/finalize.md",sourceDirName:".",slug:"/finalize",permalink:"/leseq/finalize",editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"finalize",title:"Finalization, and Resource Management",sidebar_label:"Finalization, and Resource Management",sidebar_position:.5,custom_edit_url:null,hide_title:!0},sidebar:"mainSidebar",previous:{title:"Equality Strategy",permalink:"/leseq/equality"},next:{title:"generators",permalink:"/leseq/api/generators/"}},p={},u=[{value:"Finalization, and Resource Management",id:"finalization-and-resource-management",level:2}],f={toc:u};function d(e){var n=e.components,t=(0,r.Z)(e,i);return(0,o.kt)("wrapper",(0,a.Z)({},f,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"finalization-and-resource-management"},"Finalization, and Resource Management"),(0,o.kt)("p",null,"In particular, the async iterator may have to allocate resources such as database connections and file handles at the start of iterator enumeration, and discard resources when enumeration is completed or abnormally terminated.\nIn other environments, this is called the ",(0,o.kt)("inlineCode",{parentName:"p"},"Dispose")," pattern."),(0,o.kt)("p",null,"leseq uses ",(0,o.kt)("a",{parentName:"p",href:"https://ugaya40.github.io/leseq/api/operators/#finalize"},"finalize"),"(",(0,o.kt)("a",{parentName:"p",href:"https://ugaya40.github.io/leseq/api/operators/#finalizeasync"},"finalizeAsync"),") operator to achieve this pattern."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(\n  takeAsync(3),\n  finalizeAsync(async () => console.log('finalized'))\n);\n \nfor await (const one of source) {\n  console.log(one)\n}\n\n//console: 1\n//console: 2\n//console: 3\n//console: finalized\n")),(0,o.kt)("p",null,"Finalize is always executed at the completion or abnormal end of an enumeration as long as the enumeration has started, whether it is a full enumeration in a for statement, a break in a for statement, toArray(), or outputting a value in ",(0,o.kt)("a",{parentName:"p",href:"https://ugaya40.github.io/leseq/api/values/"},"value functions"),"."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"break case")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const source = fromAsAsync([1, 2, 3, 4, 5]).pipe(\n  takeAsync(3),\n  finalizeAsync(async () => console.log('finalized'))\n);\n\nfor await (const one of source) {\n  console.log(one)\n  if(one == 2) break;\n}\n\n//console: 1\n//console: 2\n//console: finalized\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"value case")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(\n  takeAsync(3),\n  finalizeAsync(async () => console.log('finalized'))\n).valueAsync(findAsync(async i => i == 2));\n\n//result: 2\n//console: finalized\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"error case")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const result = await fromAsAsync([1, 2, 3, 4, 5]).pipe(\n  takeAsync(3),\n  tapAsync(async () => {throw new Error('test')}),\n  finalizeAsync(async () => console.log('finalized'))\n).toArrayAsync();\n\n//Error\n//console: finalized\n")),(0,o.kt)("p",null,"However, for those that do not actually enumerate at that time, such as ",(0,o.kt)("a",{parentName:"p",href:"https://ugaya40.github.io/leseq/api/values/#toasync"},"toAsync()"),", finalize does not work either; if ",(0,o.kt)("inlineCode",{parentName:"p"},"toAsync()")," starts enumerating, finalize will work at the end of enumeration or on an error."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const source = from([1, 2, 3]).pipe(\n  tap(() => {throw new Error('test')}),\n  finalize(() => {console.log('finalized')}),\n).value(toAsync());\n\n//no output\n\nfor await(const one of source) {\n  console.log(one);\n}\n\n//console: 1\n//console: 2\n//console: 3\n//console: finalized\n")),(0,o.kt)("p",null,"In addition, all finalizes work as expected even in such a compound case of iterable to async iterable and multiple finalizes."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const output = await from([1, 2, 3, 4, 5]).pipe(\n  tap(() => {throw new Error('test')}),\n  finalize(() => {console.log('iterable finalized')}),\n).value(toAsync()).pipe(\n  takeAsync(4),\n  finalizeAsync(async () => {console.log('async iterable finalized')}),\n).toArrayAsync();\n\n//Error\n//console: iterable finalized\n//console: async iterable finalized\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const output = from([1, 2, 3, 4, 5]).pipe(\n    finalize(() => {console.log('iterable finalized')}),\n  ).value(toAsync()).pipe(\n    takeAsync(4),\n    tapAsync(async () => {throw new Error('test')}),\n    finalizeAsync(async () => {console.log('async iterable finalized')}),\n  );\n\n//Error\n//console: iterable finalized\n//console: async iterable finalized\n")))}d.isMDXComponent=!0}}]);