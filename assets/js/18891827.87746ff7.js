"use strict";(self.webpackChunkleseq_docs=self.webpackChunkleseq_docs||[]).push([[81],{876:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return m}});var n=a(2784);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=n.createContext({}),p=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(a),m=r,h=d["".concat(l,".").concat(m)]||d[m]||c[m]||s;return a?n.createElement(h,i(i({ref:t},u),{},{components:a})):n.createElement(h,i({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=a.length,i=new Array(s);i[0]=d;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var p=2;p<s;p++)i[p]=a[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},8795:function(e,t,a){a.r(t),a.d(t,{assets:function(){return m},contentTitle:function(){return c},default:function(){return g},frontMatter:function(){return u},metadata:function(){return d},toc:function(){return h}});var n=a(7896),r=a(1461),s=(a(2784),a(876)),i=["components"],o={toc:[{value:"Iterable",id:"iterable",level:2},{value:"Async Iterable",id:"async-iterable",level:2},{value:"Predefined Generators",id:"predefined-generators",level:2},{value:"Predefined Operators",id:"predefined-operators",level:2},{value:"Predefined Values",id:"predefined-values",level:2}]};function l(e){var t=e.components,a=(0,r.Z)(e,i);return(0,s.kt)("wrapper",(0,n.Z)({},o,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://badge.fury.io/js/leseq"},(0,s.kt)("img",{parentName:"a",src:"https://badge.fury.io/js/leseq.svg",alt:"npm version"}))),(0,s.kt)("p",null,"Lazy evaluation list with high tree-shaking affinity and easy customization."),(0,s.kt)("h1",{id:"features"},"Features"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"\ud83c\udf81 ",(0,s.kt)("strong",{parentName:"li"},"Lazy Evaluation"),": The collection is enumerated only as far as it needs to be, and never more than once."),(0,s.kt)("li",{parentName:"ul"},"\ud83c\udf84 ",(0,s.kt)("strong",{parentName:"li"},"Tree-Shakeable"),": Only the features you use will be bundled."),(0,s.kt)("li",{parentName:"ul"},"\ud83d\udc7b ",(0,s.kt)("strong",{parentName:"li"},"Async Iterator Support"),": ",(0,s.kt)("em",{parentName:"li"},"Iterable")," can also be seamlessly treated as ",(0,s.kt)("em",{parentName:"li"},"Async Iterator"),"."),(0,s.kt)("li",{parentName:"ul"},"\ud83d\udcce ",(0,s.kt)("strong",{parentName:"li"},"Easy-Customization"),": You can easily create the functions you need by yourself. ",(0,s.kt)("a",{parentName:"li",href:"https://ugaya40.github.io/leseq/create/"},"In this way.")),(0,s.kt)("li",{parentName:"ul"},"\ud83d\uddc2 ",(0,s.kt)("strong",{parentName:"li"},"Rxjs-like Syntax"),": To achieve tree-shaking, we use an ",(0,s.kt)("a",{parentName:"li",href:"https://rxjs.dev/"},"rxjs"),"-like syntax."),(0,s.kt)("li",{parentName:"ul"},"\u2705 ",(0,s.kt)("strong",{parentName:"li"},"Simple Equality Strategy"),": It uses a simple ",(0,s.kt)("a",{parentName:"li",href:"https://ugaya40.github.io/leseq/equality/"},"Equality Strategy"),"."),(0,s.kt)("li",{parentName:"ul"},"\ud83d\udcaf ",(0,s.kt)("strong",{parentName:"li"},"All Typed"),": The whole thing is written in TypeScript, which also provides completion for type conversion between operators."),(0,s.kt)("li",{parentName:"ul"},"\ud83d\udca8 ",(0,s.kt)("strong",{parentName:"li"},"No dependencies"))),(0,s.kt)("p",null,(0,s.kt)("img",{parentName:"p",src:"https://user-images.githubusercontent.com/1430166/157796751-d3217882-0ea3-4a38-9580-fdabe097cc6f.gif",alt:"asyncIterator"})),(0,s.kt)("h1",{id:"resource"},"Resource"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("h3",{parentName:"li",id:"demostackblitz"},(0,s.kt)("a",{parentName:"h3",href:"https://stackblitz.com/edit/typescript-vygaa6?devtoolsheight=33&file=index.ts"},"Demo(StackBlitz)"))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("h3",{parentName:"li",id:"docs"},(0,s.kt)("a",{parentName:"h3",href:"https://ugaya40.github.io/leseq/"},"Docs")))),(0,s.kt)("h1",{id:"getting-started"},"Getting Started"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"npm install leseq\n")),(0,s.kt)("p",null,"If you are using Async Iterable and ",(0,s.kt)("em",{parentName:"p"},'"target "')," in ",(0,s.kt)("strong",{parentName:"p"},"tsconfig.json")," is smaller than ",(0,s.kt)("strong",{parentName:"p"},'"es2018"'),", you must add ",(0,s.kt)("strong",{parentName:"p"},'"ES2018.AsyncGenerator "')," in ",(0,s.kt)("strong",{parentName:"p"},"tsconfig.json/lib")," and ",(0,s.kt)("strong",{parentName:"p"},'"ES2018.AsyncIterable "')," or the type will not display properly."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "compilerOptions": {\n    "target": "es6",\n    "lib": ["DOM", "ES6", "ES2018.AsyncGenerator", "ES2018.AsyncIterable"]\n  }\n}\n\n')),(0,s.kt)("h2",{id:"iterable"},"Iterable"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import {from, map, take, find} from 'leseq';\n\nconst result1 = from([1,2,3,4,5]).pipe(\n  map(i => i * i),\n  take(3)\n)\n\nfor (const one of result1) {\n  console.log(one)\n}\n\n//result: 1\n//result: 4\n//result: 9\n\nconst result2 = from([1,2,3,4,5]).pipe(\n  filter(i => i % 2 == 0)\n).value(\n  find(i => i > 2)\n);\n\n//result2: 4\n\n//lazy\nconst result3 = range(1, 10000000).pipe(\n  take(3),\n  reverse(),\n  map((i) => i * i)\n).toArray();\n\n//result3: [9,4,1]\n")),(0,s.kt)("h2",{id:"async-iterable"},"Async Iterable"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import {from, mapAsync, filterAsync, fromAsAsync, findAsync} from 'leseq';\n\nconst sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve,milliseconds));\n\n//from iterable to async iterable.\nconst result1 = await from([1,2,3,4,5]).toAsyncSeq().pipe(\n  mapAsync(async i => {\n    await sleep(1000);\n    return i * i;\n  }),\n  filterAsync(async i => i % 2 == 0)\n).toArrayAsync();\n\n//5 seconds later... result1: [4,16]\n\nconst result2 = await fromAsAsync([1,2,3,4,5]).pipe(\n  mapAsync(async i => {\n    await sleep(1000);\n    return i * i;\n  }),\n  filterAsync(async i => i % 2 == 0)\n).valueAsync(findAsync());\n\n//2 seconds later... result2: 4\n\nconst result3 = await fromConcatAsAsync([1,2],[3,4]).pipe(\n  mapAsync(async i => {\n    await sleep(1000);\n    return i * i;\n  }),\n);\n\nfor await (const one of result3) {\n  console.log(one);\n}\n\n//1 seconds later... result: 1\n//2 seconds later... result: 4\n//3 seconds later... result: 9\n//4 seconds later... result: 16\n")),(0,s.kt)("h1",{id:"usage"},"Usage"),(0,s.kt)("p",null,"You can generate a sequence(Seq","<","T",">","/AsyncSeq","<","T",">"," object) with ",(0,s.kt)("strong",{parentName:"p"},"Generator"),", perform transformations and other operations with any number of ",(0,s.kt)("strong",{parentName:"p"},"Operators"),", and convert it to a value with ",(0,s.kt)("strong",{parentName:"p"},"Value"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"// sync iterator\nSyncSource = \n  Generators(ex: from, fromConcat, ..etc) | \n  SyncSource.pipe(\n    ...SyncOperators(ex: map, filter, ...etc)\n  );\n\nvalue = SyncSource.value(SyncValues(ex: find,some, ...etc));\n\n// async iterator\nAsyncSource = \n  AsyncGenerators(ex: fromAsAsync, fromConcatAsAsync, ...etc) |\n  SyncSource.toAsyncSeq() | // iterable to async iterable.\n  AsyncSource.pipe(\n    ...AsyncOperators(ex: mapAsync, filterAsync, ...etc)\n  );\n\nvalue = await AsyncSource.valueAsync(AsyncValues(ex: findAsync,someAsync, ...etc));\n")),(0,s.kt)("p",null,"Since lazy evaluation is employed, the process is not executed when ",(0,s.kt)("strong",{parentName:"p"},"pipe()")," is called, but only when ",(0,s.kt)("strong",{parentName:"p"},"value(valueAsync)"),", ",(0,s.kt)("strong",{parentName:"p"},"toArray(toArrayAsync)"),", or ",(0,s.kt)("strong",{parentName:"p"},"forEach(forEachAsync)")," is called."),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},'Changes from "Iterable" or Seq<T',">",' to "Async Iterable" can be made at any time with the ',(0,s.kt)("strong",{parentName:"p"},"toAsyncSeq()")," method.\nbut ",(0,s.kt)("strong",{parentName:"p"},'Once the chain is changed to "Async Iterable" by ',(0,s.kt)("em",{parentName:"strong"},"toAsyncSeq()")," or other means, only the asynchronous version of Operator/Value can be used in the same chain thereafter."),' This is because, in principle, it is impossible to change from an "Async Iterable" to "Iterable".')),(0,s.kt)("p",null,"The predefined ",(0,s.kt)("strong",{parentName:"p"},"Generators/Operators/Values")," are as follows. And all of them have asynchronous versions(",(0,s.kt)("em",{parentName:"p"},"xxxAsAsync")," or ",(0,s.kt)("em",{parentName:"p"},"xxxAsync"),")."),(0,s.kt)("p",null,"If the function you want to use does not exist, you can also define your own Operator/Value function ",(0,s.kt)("a",{parentName:"p",href:"https://ugaya40.github.io/leseq/create/"},"in this way"),"."),(0,s.kt)("h2",{id:"predefined-generators"},"Predefined Generators"),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Generator"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#from"},"from")),(0,s.kt)("td",{parentName:"tr",align:null},"Generates a sequence from an iterable object. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#fromasasync"},"fromAsAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#fromconcat"},"fromConcat")),(0,s.kt)("td",{parentName:"tr",align:null},"Generates a concatenated sequence of multiple iterable objects. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#fromconcatasasync"},"fromConcatAsAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#fromvalue"},"fromValue")),(0,s.kt)("td",{parentName:"tr",align:null},"Generates a sequence from a single value. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#fromvalueasasync"},"fromValueAsAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#range"},"range")),(0,s.kt)("td",{parentName:"tr",align:null},"Generates a sequential number sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#rangeasasync"},"rangeAsAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#repeat"},"repeat")),(0,s.kt)("td",{parentName:"tr",align:null},"Generates a sequence in which the specified value is repeated a specified number of times. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/generators/#repeatasasync"},"repeatAsAsync")," )")))),(0,s.kt)("h2",{id:"predefined-operators"},"Predefined Operators"),(0,s.kt)("p",null,"It is used within the pipe method of the Seq","<","T",">"," object. Any number of operators can be connected."),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Operator"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#chunk"},"chunk")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence divided into array of the specified size. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#chunkasync"},"chunkAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#concat"},"concat")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence in which the current sequence and the specified sequence are concatenated. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#concatasync"},"concatAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#concatvalue"},"concatValue")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the sequence to which the specified value is added. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#concatvalueasync"},"concatValueAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#difference"},"difference")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the sequence that is the difference set between the current sequence and the specified sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#differenceasync"},"differenceAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#filter"},"filter")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence that has been filtered by the specified condition. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#filterasync"},"filterAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#flatten"},"flatten")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a flattened sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#flattenasync"},"flattenAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#groupby"},"groupBy")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence grouped by a specified key. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#groupbyasync"},"groupByAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#intersect"},"intersect")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence that is the product set of the current sequence and the specified sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#intersectasync"},"intersectAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#map"},"map")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the sequence in which each element has been transformed by the specified transformation function. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#mapasync"},"mapAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#orderby"},"orderBy")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence sorted by a specified key. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#orderbyasync"},"orderByAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#reverse"},"reverse")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence in reverse order of the current sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#reverseasync"},"reverseAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#scan"},"scan")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the resulting sequence after applying the aggregate function to the elements of the current sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#scanasync"},"scanAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#skip"},"skip")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the sequence with the specified number of skips. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#skipasync"},"skipAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#skipwhile"},"skipWhile")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the sequence of elements skipped while matching the condition. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#skipwhileasync"},"skipWhileAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#take"},"take")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence that enumerates the specified number of items. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#takeasync"},"takeAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#takewhile"},"takeWhile")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence to be enumerated only while the condition is matched. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#takewhileasync"},"takeWhileAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#tap"},"tap")),(0,s.kt)("td",{parentName:"tr",align:null},"Run side effects. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#tapasync"},"tapAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#union"},"union")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a sequence that is the union set of the current sequence and the specified sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#unionasync"},"unionAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#uniq"},"uniq")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns a deduplicated sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/operators/#uniqasync"},"uniqAsync")," )")))),(0,s.kt)("h2",{id:"predefined-values"},"Predefined Values"),(0,s.kt)("p",null,"Generates a value from a sequence. Used in the value method of the Seq","<","T",">"," object."),(0,s.kt)("table",null,(0,s.kt)("thead",{parentName:"table"},(0,s.kt)("tr",{parentName:"thead"},(0,s.kt)("th",{parentName:"tr",align:null},"Value"),(0,s.kt)("th",{parentName:"tr",align:null},"Description"))),(0,s.kt)("tbody",{parentName:"table"},(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#every"},"every")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns whether or not all elements of a sequence meet the specified conditions. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#everyasync"},"everyAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#find"},"find")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the first element that satisfies the condition. If no element satisfying the condition is found, an error is thrown. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#findasync"},"findAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#findordefault"},"findOrDefault")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the first element that satisfies the condition. If no element is found that satisfies the condition, it returns the specified default value. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#findordefaultasync"},"findOrDefaultAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#reduce"},"reduce")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns the result of applying the aggregate function to the elements of the current sequence. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#reduceasync"},"reduceAsync")," )")),(0,s.kt)("tr",{parentName:"tbody"},(0,s.kt)("td",{parentName:"tr",align:null},(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#some"},"some")),(0,s.kt)("td",{parentName:"tr",align:null},"Returns whether or not any element of the sequence satisfies the specified condition. (async version: ",(0,s.kt)("a",{parentName:"td",href:"https://ugaya40.github.io/leseq/api/values/#someasync"},"someAsync")," )")))))}l.isMDXComponent=!0;var p=["components"],u={id:"overview",title:"Overview",sidebar_label:"Overview",sidebar_position:.5,custom_edit_url:null,hide_title:!0,slug:"/"},c=void 0,d={unversionedId:"overview",id:"overview",title:"Overview",description:"",source:"@site/docs/overview.mdx",sourceDirName:".",slug:"/",permalink:"/leseq/",editUrl:null,tags:[],version:"current",sidebarPosition:.5,frontMatter:{id:"overview",title:"Overview",sidebar_label:"Overview",sidebar_position:.5,custom_edit_url:null,hide_title:!0,slug:"/"},sidebar:"mainSidebar",next:{title:"Equality Strategy",permalink:"/leseq/equality"}},m={},h=[],y={toc:h};function g(e){var t=e.components,a=(0,r.Z)(e,p);return(0,s.kt)("wrapper",(0,n.Z)({},y,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)(l,{mdxType:"README"}))}g.isMDXComponent=!0}}]);