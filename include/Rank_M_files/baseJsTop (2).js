var jindo=window.jindo||{};
jindo._p_={};
jindo._p_.jindoName="jindo";
if(window[jindo._p_.jindoName]){var __old_j=window[jindo._p_.jindoName];
for(var i in __old_j){jindo[i]=__old_j[i]
}}function _settingPolyfill(target,objectName,methodName,polyfillMethod,force){if(force||!target[objectName].prototype[methodName]){target[objectName].prototype[methodName]=polyfillMethod
}}function polyfillArray(global){function checkCallback(callback){if(typeof callback!=="function"){throw new TypeError("callback is not a function.")
}}_settingPolyfill(global,"Array","forEach",function(callback,ctx){checkCallback(callback);
var thisArg=arguments.length>=2?ctx:void 0;
for(var i=0,l=this.length;
i<l;
i++){callback.call(thisArg,this[i],i,this)
}});
_settingPolyfill(global,"Array","every",function(callback,ctx){checkCallback(callback);
var thisArg=arguments.length>=2?ctx:void 0;
for(var i=0,l=this.length;
i<l;
i++){if(!callback.call(thisArg,this[i],i,this)){return false
}}return true
})
}if(!window.__isPolyfillTestMode){polyfillArray(window)
}if(!Function.prototype.bind){Function.prototype.bind=function(target){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var arg=Array.prototype.slice.call(arguments,1),bind=this,nop=function(){},wrap=function(){return bind.apply(nop.prototype&&this instanceof nop&&target?this:target,arg.concat(Array.prototype.slice.call(arguments)))
};
nop.prototype=this.prototype;
wrap.prototype=new nop();
return wrap
}
}function polyfillTimer(global){var agent=global.navigator.userAgent,isIOS=/i(Pad|Phone|Pod)/.test(agent),iOSVersion;
if(isIOS){var matchVersion=agent.match(/OS\s(\d)/);
if(matchVersion){iOSVersion=parseInt(matchVersion[1],10)
}}var raf=global.requestAnimationFrame||global.webkitRequestAnimationFrame||global.mozRequestAnimationFrame||global.msRequestAnimationFrame,caf=global.cancelAnimationFrame||global.webkitCancelAnimationFrame||global.mozCancelAnimationFrame||global.msCancelAnimationFrame;
if(raf&&!caf){var keyInfo={},oldraf=raf;
raf=function(callback){function wrapCallback(){if(keyInfo[key]){callback()
}}var key=oldraf(wrapCallback);
keyInfo[key]=true;
return key
};
caf=function(key){delete keyInfo[key]
}
}else{if(!(raf&&caf)){raf=function(callback){return global.setTimeout(callback,16)
};
caf=global.clearTimeout
}}global.requestAnimationFrame=raf;
global.cancelAnimationFrame=caf;
if(iOSVersion>=6){global.requestAnimationFrame(function(){})
}if(iOSVersion==6){var timerInfo={},SET_TIMEOUT="setTimeout",CLEAR_TIMEOUT="clearTimeout",SET_INTERVAL="setInterval",CLEAR_INTERVAL="clearInterval",orignal={setTimeout:global.setTimeout.bind(global),clearTimeout:global.clearTimeout.bind(global),setInterval:global.setInterval.bind(global),clearInterval:global.clearInterval.bind(global)};
[[SET_TIMEOUT,CLEAR_TIMEOUT],[SET_INTERVAL,CLEAR_INTERVAL]].forEach(function(v){global[v[0]]=(function(timerName,clearTimerName){return function(callback,time){var timer={key:"",isCall:false,timerType:timerName,clearType:clearTimerName,realCallback:callback,callback:function(){var callback=this.realCallback;
callback();
if(this.timerType===SET_TIMEOUT){this.isCall=true;
delete timerInfo[this.key]
}},delay:time,createdTime:global.Date.now()};
timer.key=orignal[timerName](timer.callback.bind(timer),time);
timerInfo[timer.key]=timer;
return timer.key
}
})(v[0],v[1]);
global[v[1]]=(function(clearTimerName){return function(key){if(key&&timerInfo[key]){orignal[clearTimerName](timerInfo[key].key);
delete timerInfo[key]
}}
})(v[1])
});
function restoreTimer(){var currentTime=global.Date.now();
var newTimerInfo={},gap;
for(var i in timerInfo){var timer=timerInfo[i];
orignal[timer.clearType](timerInfo[i].key);
delete timerInfo[i];
if(timer.timerType==SET_TIMEOUT){gap=currentTime-timer.createdTime;
timer.delay=(gap>=timer.delay)?0:timer.delay-gap
}if(!timer.isCall){timer.key=orignal[timer.timerType](timer.callback.bind(timer),timer.delay);
newTimerInfo[i]=timer
}}timerInfo=newTimerInfo;
newTimerInfo=null
}global.addEventListener("scroll",function(e){restoreTimer()
})
}return global
}if(!window.__isPolyfillTestMode){polyfillTimer(window)
}jindo._p_={};
jindo._p_.jindoName="jindo";
jindo._p_._j_ag=navigator.userAgent;
jindo._p_._JINDO_IS_FF=jindo._p_._j_ag.indexOf("Firefox")>-1;
jindo._p_._JINDO_IS_OP=jindo._p_._j_ag.indexOf("Opera")>-1;
jindo._p_._JINDO_IS_SP=jindo._p_._j_ag.indexOf("Safari")>-1;
jindo._p_._JINDO_IS_SF=jindo._p_._j_ag.indexOf("Apple")>-1;
jindo._p_._JINDO_IS_CH=jindo._p_._j_ag.indexOf("Chrome")>-1;
jindo._p_._JINDO_IS_WK=jindo._p_._j_ag.indexOf("WebKit")>-1;
jindo._p_._JINDO_IS_MO=/(iPad|Mobile|Android|Nokia|webOS|BlackBerry|Opera Mini)/.test(jindo._p_._j_ag);
jindo._p_.trim=function(str){var sBlank="\\s|\\t|"+String.fromCharCode(12288),re=new RegExp(["^(?:",")+|(?:",")+$"].join(sBlank),"g");
return str.replace(re,"")
};
jindo.$Jindo=function(){var cl=arguments.callee;
var cc=cl._cached;
if(cc){return cc
}if(!(this instanceof cl)){return new cl()
}if(!cc){cl._cached=this
}this.version="2.10.0"
};
jindo.$Jindo.VERSION="2.10.0";
jindo._p_.addExtension=function(sClass,sMethod,fpFunction){if(jindo[sClass][sMethod]){jindo.$Jindo._warn(sClass+"."+sMethod+" was overwrite.")
}else{if(/^x/.test(sMethod)){jindo[sClass][sMethod]=fpFunction
}else{jindo.$Jindo._warn("The Extension Method("+sClass+"."+sMethod+") must be used with x prefix.")
}}};
jindo.$Jindo.compatible=function(){return false
};
jindo.$Jindo.mixin=function(oDestination,oSource){g_checkVarType(arguments,{obj:["oDestination:Hash+","oSource:Hash+"]},"<static> $Jindo#mixin");
var oReturn={};
for(var i in oDestination){oReturn[i]=oDestination[i]
}for(i in oSource){if(oSource.hasOwnProperty(i)&&!jindo.$Jindo.isHash(oSource[i])){oReturn[i]=oSource[i]
}}return oReturn
};
jindo._p_._objToString=Object.prototype.toString;
jindo.$Error=function(sMessage,sMethod){this.message="\tmethod : "+sMethod+"\n\tmessage : "+sMessage;
this.type="Jindo Custom Error";
this.toString=function(){return this.message+"\n\t"+this.type
}
};
jindo.$Except={CANNOT_USE_OPTION:"해당 옵션은 사용할 수 없습니다.",CANNOT_USE_HEADER:"type이 jsonp 또는 데스크탑 환경에서 CORS 호출시 XDomainRequest(IE8,9) 객체가 사용되는 경우 header메서드는 사용할 수 없습니다.",PARSE_ERROR:"파싱중 에러가 발생했습니다.",NOT_FOUND_ARGUMENT:"파라미터가 없습니다.",NOT_STANDARD_QUERY:"css셀렉터가 정상적이지 않습니다.",INVALID_DATE:"날짜 포멧이 아닙니다.",REQUIRE_AJAX:"가 없습니다.",NOT_FOUND_ELEMENT:"엘리먼트가 없습니다.",HAS_FUNCTION_FOR_GROUP:"그룹으로 지우지 않는 경우 detach할 함수가 있어야 합니다.",NONE_ELEMENT:"에 해당하는 엘리먼트가 없습니다.",NOT_SUPPORT_SELECTOR:"는 지원하지 않는 selector입니다.",NOT_SUPPORT_CORS:"현재 브라우저는 CORS를 지원하지 않습니다.",NOT_SUPPORT_METHOD:"desktop에서 지원하지 않는 메서드 입니다.",JSON_MUST_HAVE_ARRAY_HASH:"get메서드는 json타입이 hash나 array타입만 가능합니다.",MUST_APPEND_DOM:"document에 붙지 않은 엘리먼트를 기준 엘리먼트로 사용할 수 없습니다.",NOT_USE_CSS:"는 css를 사용 할수 없습니다.",NOT_WORK_DOMREADY:"domready이벤트는 iframe안에서 사용할 수 없습니다.",CANNOT_SET_OBJ_PROPERTY:"속성은 오브젝트입니다.\n클래스 속성이 오브젝트이면 모든 인스턴스가 공유하기 때문에 위험합니다.",NOT_FOUND_HANDLEBARS:"{{not_found_handlebars}}"};
jindo._p_._toArray=function(aArray){return Array.prototype.slice.apply(aArray)
};
try{Array.prototype.slice.apply(document.documentElement.childNodes)
}catch(e){jindo._p_._toArray=function(aArray){var returnArray=[];
var leng=aArray.length;
for(var i=0;
i<leng;
i++){returnArray.push(aArray[i])
}return returnArray
}
}jindo.$Jindo.isNumeric=function(nNum){return !isNaN(parseFloat(nNum))&&!jindo.$Jindo.isArray(nNum)&&isFinite(nNum)
};
(function(){var oType={Element:1,Document:9};
for(var i in oType){jindo.$Jindo["is"+i]=(function(sType,nNodeNumber){return function(oObj){if(new RegExp(sType).test(jindo._p_._objToString.call(oObj))){return true
}else{if(jindo._p_._objToString.call(oObj)=="[object Object]"&&oObj!==null&&oObj!==undefined&&oObj.nodeType==nNodeNumber){return true
}}return false
}
})(i,oType[i])
}var _$type=["Function","Array","String","Boolean","Date","RegExp"];
for(var i=0,l=_$type.length;
i<l;
i++){jindo.$Jindo["is"+_$type[i]]=(function(type){return function(oObj){return jindo._p_._objToString.call(oObj)=="[object "+type+"]"
}
})(_$type[i])
}})();
jindo.$Jindo.isNode=function(eEle){try{return !!(eEle&&eEle.nodeType)
}catch(e){return false
}};
jindo.$Jindo.isHash=function(oObj){return jindo._p_._objToString.call(oObj)=="[object Object]"&&oObj!==null&&oObj!==undefined&&!!!oObj.nodeType&&!jindo.$Jindo.isWindow(oObj)
};
jindo.$Jindo.isNull=function(oObj){return oObj===null
};
jindo.$Jindo.isUndefined=function(oObj){return oObj===undefined
};
jindo.$Jindo.isWindow=function(oObj){return oObj&&(oObj==window.top||oObj==oObj.window)
};
jindo.$Jindo.Break=function(){if(!(this instanceof arguments.callee)){throw new arguments.callee
}};
jindo.$Jindo.Continue=function(){if(!(this instanceof arguments.callee)){throw new arguments.callee
}};
jindo.$Jindo._F=function(sKeyType){return sKeyType
};
jindo.$Jindo._warn=function(sMessage){window.console&&((console.warn&&console.warn(sMessage),true)||(console.log&&console.log(sMessage),true))
};
jindo.$Jindo._maxWarn=function(nCurrentLength,nMaxLength,sMessage){if(nCurrentLength>nMaxLength){jindo.$Jindo._warn("추가적인 파라미터가 있습니다. : "+sMessage)
}};
jindo.$Jindo.checkVarType=function(aArgs,oRules,sFuncName){var sFuncName=sFuncName||aArgs.callee.name||"anonymous";
var $Jindo=jindo.$Jindo;
var bCompat=$Jindo.compatible();
var fpChecker=aArgs.callee["_checkVarType_"+bCompat];
if(fpChecker){return fpChecker(aArgs,oRules,sFuncName)
}var aPrependCode=[];
aPrependCode.push("var nArgsLen = aArgs.length;");
aPrependCode.push("var $Jindo = "+jindo._p_.jindoName+".$Jindo;");
if(bCompat){aPrependCode.push("var nMatchScore;");
aPrependCode.push("var nMaxMatchScore = -1;");
aPrependCode.push("var oFinalRet = null;")
}var aBodyCode=[];
var nMaxRuleLen=0;
for(var sType in oRules){if(oRules.hasOwnProperty(sType)){nMaxRuleLen=Math.max(oRules[sType].length,nMaxRuleLen)
}}for(var sType in oRules){if(oRules.hasOwnProperty(sType)){var aRule=oRules[sType];
var nRuleLen=aRule.length;
var aBodyPrependCode=[];
var aBodyIfCode=[];
var aBodyThenCode=[];
if(!bCompat){if(nRuleLen<nMaxRuleLen){aBodyIfCode.push("nArgsLen === "+nRuleLen)
}else{aBodyIfCode.push("nArgsLen >= "+nRuleLen)
}}aBodyThenCode.push("var oRet = new $Jindo._varTypeRetObj();");
var nTypeCount=nRuleLen;
for(var i=0;
i<nRuleLen;
++i){/^([^:]+):([^\+]*)(\+?)$/.test(aRule[i]);
var sVarName=RegExp.$1,sVarType=RegExp.$2,bAutoCast=RegExp.$3?true:false;
if(sVarType==="Variant"){if(bCompat){aBodyIfCode.push(i+" in aArgs")
}aBodyThenCode.push('oRet["'+sVarName+'"] = aArgs['+i+"];");
nTypeCount--
}else{if($Jindo._varTypeList[sVarType]){var vVar="tmp"+sVarType+"_"+i;
aBodyPrependCode.push("var "+vVar+" = $Jindo._varTypeList."+sVarType+"(aArgs["+i+"], "+bAutoCast+");");
aBodyIfCode.push(vVar+" !== "+jindo._p_.jindoName+".$Jindo.VARTYPE_NOT_MATCHED");
aBodyThenCode.push('oRet["'+sVarName+'"] = '+vVar+";")
}else{if(/^\$/.test(sVarType)&&jindo[sVarType]){var sOR="",sNativeVarType;
if(bAutoCast){sNativeVarType=({$Fn:"Function",$S:"String",$A:"Array",$H:"Hash",$ElementList:"Array"})[sVarType]||sVarType.replace(/^\$/,"");
if(jindo.$Jindo["is"+sNativeVarType]){sOR=" || $Jindo.is"+sNativeVarType+"(vNativeArg_"+i+")"
}}aBodyIfCode.push("(aArgs["+i+"] instanceof "+jindo._p_.jindoName+"."+sVarType+sOR+")");
aBodyThenCode.push('oRet["'+sVarName+'"] = '+jindo._p_.jindoName+"."+sVarType+"(aArgs["+i+"]);")
}else{if(jindo.$Jindo["is"+sVarType]){var sOR="",sWrapedVarType;
if(bAutoCast){sWrapedVarType=({Function:"$Fn",String:"$S",Array:"$A",Hash:"$H"})[sVarType]||"$"+sVarType;
if(jindo[sWrapedVarType]){sOR=" || aArgs["+i+"] instanceof "+jindo._p_.jindoName+"."+sWrapedVarType
}}aBodyIfCode.push("($Jindo.is"+sVarType+"(aArgs["+i+"])"+sOR+")");
aBodyThenCode.push('oRet["'+sVarName+'"] = vNativeArg_'+i+";")
}else{throw new Error("VarType("+sVarType+") Not Found")
}}}}}aBodyThenCode.push('oRet.__type = "'+sType+'";');
if(bCompat){aBodyThenCode.push("nMatchScore = "+(nRuleLen*1000+nTypeCount*10)+" + (nArgsLen === "+nRuleLen+" ? 1 : 0);");
aBodyThenCode.push("if (nMatchScore > nMaxMatchScore) {");
aBodyThenCode.push("	nMaxMatchScore = nMatchScore;");
aBodyThenCode.push("	oFinalRet = oRet;");
aBodyThenCode.push("}")
}else{aBodyThenCode.push("return oRet;")
}aBodyCode.push(aBodyPrependCode.join("\n"));
if(aBodyIfCode.length){aBodyCode.push("if ("+aBodyIfCode.join(" && ")+") {")
}aBodyCode.push(aBodyThenCode.join("\n"));
if(aBodyIfCode.length){aBodyCode.push("}")
}}}aPrependCode.push("	$Jindo._maxWarn(nArgsLen,"+nMaxRuleLen+',"'+sFuncName+'");');
for(var i=0;
i<nMaxRuleLen;
++i){var sArg="aArgs["+i+"]";
aPrependCode.push(["var vNativeArg_",i," = ",sArg," && ",sArg,".$value ? ",sArg,".$value() : ",sArg+";"].join(""))
}if(!bCompat){aBodyCode.push("$Jindo.checkVarType._throwException(aArgs, oRules, sFuncName);")
}aBodyCode.push("return oFinalRet;");
aArgs.callee["_checkVarType_"+bCompat]=fpChecker=new Function("aArgs,oRules,sFuncName",aPrependCode.join("\n")+aBodyCode.join("\n"));
return fpChecker(aArgs,oRules,sFuncName)
};
var g_checkVarType=jindo.$Jindo.checkVarType;
jindo.$Jindo._varTypeRetObj=function(){};
jindo.$Jindo._varTypeRetObj.prototype.toString=function(){return this.__type
};
jindo.$Jindo.checkVarType._throwException=function(aArgs,oRules,sFuncName){var fpGetType=function(vArg){for(var sKey in jindo){if(jindo.hasOwnProperty(sKey)){var oConstructor=jindo[sKey];
if(typeof oConstructor!=="function"){continue
}if(vArg instanceof oConstructor){return sKey
}}}var $Jindo=jindo.$Jindo;
for(var sKey in $Jindo){if($Jindo.hasOwnProperty(sKey)){if(!/^is(.+)$/.test(sKey)){continue
}var sType=RegExp.$1;
var fpMethod=$Jindo[sKey];
if(fpMethod(vArg)){return sType
}}}return"Unknown"
};
var fpErrorMessage=function(sUsed,aSuggs,sURL){var aMsg=["잘못된 파라미터입니다.",""];
if(sUsed){aMsg.push("호출한 형태 :");
aMsg.push("\t"+sUsed);
aMsg.push("")
}if(aSuggs.length){aMsg.push("사용 가능한 형태 :");
for(var i=0,nLen=aSuggs.length;
i<nLen;
i++){aMsg.push("\t"+aSuggs[i])
}aMsg.push("")
}if(sURL){aMsg.push("매뉴얼 페이지 :");
aMsg.push("\t"+sURL);
aMsg.push("")
}aMsg.unshift();
return aMsg.join("\n")
};
var aArgName=[];
for(var i=0,ic=aArgs.length;
i<ic;
++i){try{aArgName.push(fpGetType(aArgs[i]))
}catch(e){aArgName.push("Unknown")
}}var sUsed=sFuncName+"("+aArgName.join(", ")+")";
var aSuggs=[];
for(var sKey in oRules){if(oRules.hasOwnProperty(sKey)){var aRule=oRules[sKey];
aSuggs.push(""+sFuncName+"("+aRule.join(", ").replace(/(^|,\s)[^:]+:/g,"$1")+")")
}}var sURL;
if(/(\$\w+)#(\w+)?/.test(sFuncName)){sURL="http://jindo.dev.naver.com/docs/jindo/2.10.0/desktop/ko/classes/jindo."+encodeURIComponent(RegExp.$1)+".html#method_"+RegExp.$2
}throw new TypeError(fpErrorMessage(sUsed,aSuggs,sURL))
};
jindo.$Jindo.varType=function(){var oArgs=this.checkVarType(arguments,{s4str:["sTypeName:String+","fpFunc:Function+"],s4obj:["oTypeLists:Hash+"],g:["sTypeName:String+"]});
var sDenyTypeListComma=jindo.$Jindo._denyTypeListComma;
switch(oArgs+""){case"s4str":var sTypeNameComma=","+oArgs.sTypeName.replace(/\+$/,"")+",";
if(sDenyTypeListComma.indexOf(sTypeNameComma)>-1){throw new Error("Not allowed Variable Type")
}this._varTypeList[oArgs.sTypeName]=oArgs.fpFunc;
return this;
case"s4obj":var oTypeLists=oArgs.oTypeLists;
for(var sTypeName in oTypeLists){if(oTypeLists.hasOwnProperty(sTypeName)){fpFunc=oTypeLists[sTypeName];
arguments.callee.call(this,sTypeName,fpFunc)
}}return this;
case"g":return this._varTypeList[oArgs.sTypeName]
}};
jindo.$Jindo.VARTYPE_NOT_MATCHED={};
(function(){var oVarTypeList=jindo.$Jindo._varTypeList={};
var cache=jindo.$Jindo;
var ___notMatched=cache.VARTYPE_NOT_MATCHED;
oVarTypeList.Numeric=function(v){if(cache.isNumeric(v)){return v*1
}return ___notMatched
};
oVarTypeList.Hash=function(val,bAutoCast){if(bAutoCast&&jindo.$H&&val instanceof jindo.$H){return val.$value()
}else{if(cache.isHash(val)){return val
}}return ___notMatched
};
oVarTypeList["$Class"]=function(val,bAutoCast){if((!cache.isFunction(val))||!val.extend){return ___notMatched
}return val
};
var aDenyTypeList=[];
for(var sTypeName in cache){if(cache.hasOwnProperty(sTypeName)){if(/^is(.+)$/.test(sTypeName)){aDenyTypeList.push(RegExp.$1)
}}}cache._denyTypeListComma=aDenyTypeList.join(",");
cache.varType("ArrayStyle",function(val,bAutoCast){if(!val){return ___notMatched
}if(/(Arguments|NodeList|HTMLCollection|global|Window)/.test(jindo._p_._objToString.call(val))||/Object/.test(jindo._p_._objToString.call(val))&&cache.isNumeric(val.length)){return jindo._p_._toArray(val)
}return ___notMatched
});
cache.varType("Form",function(val,bAutoCast){if(!val){return ___notMatched
}if(bAutoCast&&val.$value){val=val.$value()
}if(val.tagName&&val.tagName.toUpperCase()=="FORM"){return val
}return ___notMatched
})
})();
jindo._p_._createEle=function(sParentTag,sHTML,oDoc,bWantParent){var sId="R"+new Date().getTime()+parseInt(Math.random()*100000,10);
var oDummy=oDoc.createElement("div");
switch(sParentTag){case"select":case"table":case"dl":case"ul":case"fieldset":case"audio":oDummy.innerHTML="<"+sParentTag+' class="'+sId+'">'+sHTML+"</"+sParentTag+">";
break;
case"thead":case"tbody":case"col":oDummy.innerHTML="<table><"+sParentTag+' class="'+sId+'">'+sHTML+"</"+sParentTag+"></table>";
break;
case"tr":oDummy.innerHTML='<table><tbody><tr class="'+sId+'">'+sHTML+"</tr></tbody></table>";
break;
default:oDummy.innerHTML='<div class="'+sId+'">'+sHTML+"</div>"
}var oFound;
for(oFound=oDummy.firstChild;
oFound;
oFound=oFound.firstChild){if(oFound.className==sId){break
}}return bWantParent?oFound:oFound.childNodes
};
jindo.$=function(sID){if(!arguments.length){throw new jindo.$Error(jindo.$Except.NOT_FOUND_ARGUMENT,"$")
}var ret=[],arg=arguments,nArgLeng=arg.length,lastArgument=arg[nArgLeng-1],doc=document,el=null;
var reg=/^<([a-z]+|h[1-5])>$/i;
var reg2=/^<([a-z]+|h[1-5])(\s+[^>]+)?>/i;
if(nArgLeng>1&&typeof lastArgument!="string"&&lastArgument.body){arg=Array.prototype.slice.apply(arg,[0,nArgLeng-1]);
doc=lastArgument
}for(var i=0;
i<nArgLeng;
i++){el=arg[i]&&arg[i].$value?arg[i].$value():arg[i];
if(jindo.$Jindo.isString(el)||jindo.$Jindo.isNumeric(el)){el+="";
el=el.replace(/^\s+|\s+$/g,"");
el=el.replace(/<!--(.|\n)*?-->/g,"");
if(el.indexOf("<")>-1){if(reg.test(el)){el=doc.createElement(RegExp.$1)
}else{if(reg2.test(el)){var p={thead:"table",tbody:"table",tr:"tbody",td:"tr",dt:"dl",dd:"dl",li:"ul",legend:"fieldset",option:"select",source:"audio"};
var tag=RegExp.$1.toLowerCase();
var ele=jindo._p_._createEle(p[tag],el,doc);
for(var i=0,leng=ele.length;
i<leng;
i++){ret.push(ele[i])
}el=null
}}}else{el=doc.getElementById(el)
}}if(el&&el.nodeType){ret[ret.length]=el
}}return ret.length>1?ret:(ret[0]||null)
};
jindo.$Class=function(oDef){var oArgs=g_checkVarType(arguments,{"4obj":["oDef:Hash+"]},"$Class");
function typeClass(){var t=this;
var a=[];
var superFunc=function(m,superClass,func){if(m!="constructor"&&func.toString().indexOf("$super")>-1){var funcArg=func.toString().replace(/function\s*\(([^\)]*)[\w\W]*/g,"$1").split(",");
var funcStr=func.toString().replace(/function[^{]*{/,"").replace(/(\w|\.?)(this\.\$super|this)/g,function(m,m2,m3){if(!m2){return m3+".$super"
}return m
});
funcStr=funcStr.substr(0,funcStr.length-1);
func=superClass[m]=eval("false||function("+funcArg.join(",")+"){"+funcStr+"}")
}return function(){var f=this.$this[m];
var t=this.$this;
var r=(t[m]=func).apply(t,arguments);
t[m]=f;
return r
}
};
while(t._$superClass!==undefined){t.$super=new Object;
t.$super.$this=this;
for(var x in t._$superClass.prototype){if(t._$superClass.prototype.hasOwnProperty(x)){if(this[x]===undefined&&x!="$init"){this[x]=t._$superClass.prototype[x]
}if(x!="constructor"&&x!="_$superClass"&&typeof t._$superClass.prototype[x]=="function"){t.$super[x]=superFunc(x,t._$superClass,t._$superClass.prototype[x])
}else{t.$super[x]=t._$superClass.prototype[x]
}}}if(typeof t.$super.$init=="function"){a[a.length]=t
}t=t.$super
}for(var i=a.length-1;
i>-1;
i--){a[i].$super.$init.apply(a[i].$super,arguments)
}if(this.$autoBind){for(var i in this){if(/^\_/.test(i)){this[i]=jindo.$Fn(this[i],this).bind()
}}}if(typeof this.$init=="function"){this.$init.apply(this,arguments)
}}if(oDef.$static!==undefined){var i=0,x;
for(x in oDef){if(oDef.hasOwnProperty(x)){x=="$static"||i++
}}for(x in oDef.$static){if(oDef.$static.hasOwnProperty(x)){typeClass[x]=oDef.$static[x]
}}if(!i){return oDef.$static
}delete oDef.$static
}typeClass.prototype=oDef;
typeClass.prototype.constructor=typeClass;
typeClass.prototype.kindOf=function(oClass){return jindo._p_._kindOf(this.constructor.prototype,oClass.prototype)
};
typeClass.extend=jindo.$Class.extend;
return typeClass
};
jindo._p_._kindOf=function(oThis,oClass){if(oThis!=oClass){if(oThis._$superClass){return jindo._p_._kindOf(oThis._$superClass.prototype,oClass)
}else{return false
}}else{return true
}};
jindo.$Class.extend=function(superClass){var oArgs=g_checkVarType(arguments,{"4obj":["oDef:$Class"]},"<static> $Class#extend");
this.prototype._$superClass=superClass;
var superProto=superClass.prototype;
for(var prop in superProto){if(jindo.$Jindo.isHash(superProto[prop])){jindo.$Jindo._warn(jindo.$Except.CANNOT_SET_OBJ_PROPERTY)
}}for(var x in superClass){if(superClass.hasOwnProperty(x)){if(x=="prototype"){continue
}this[x]=superClass[x]
}}return this
};
jindo.VERSION="2.10.0";
jindo.TYPE="mobile";
jindo.$$=jindo.cssquery=(function(){var cssquery;
this._dummyWrap;
function createDummy(){var elDummyWrap=cssquery._dummyWrap;
if(!elDummyWrap){cssquery._dummyWrap=elDummyWrap=document.createElement("div");
elDummyWrap.id="__jindo_cssquery_mockdiv";
elDummyWrap.style.cssText="display:none !important;";
elDummyWrap.className="This element is for jindo.$$.test";
document.body.insertBefore(elDummyWrap,document.body.firstChild)
}cssquery._dummyWrap=elDummyWrap
}var UID=1;
var validUID={};
function _isNonStandardQueryButNotException(sQuery){return/\[\s*(?:checked|selected|disabled)/.test(sQuery)
}function _commaRevise(sQuery,sChange){return sQuery.replace(/\,/gi,sChange)
}function _startCombinator(sQuery){return/^[~>+]/.test(sQuery)
}function _getParentElement(oParent){if(!oParent){return document
}var nParentNodeType;
oParent=oParent&&oParent.$value?oParent.$value():oParent;
if(jindo.$Jindo.isString(oParent)){oParent=document.getElementById(oParent)
}nParentNodeType=oParent.nodeType;
if(nParentNodeType!=1&&nParentNodeType!=9&&nParentNodeType!=10&&nParentNodeType!=11){oParent=oParent.ownerDocument||oParent.document
}return oParent||oParent.ownerDocument||oParent.document
}function _addQueryId(el,sIdName){var sQueryId,sValue;
if(/^\w+$/.test(el.id)){sQueryId="#"+el.id
}else{sValue="C"+new Date().getTime()+Math.floor(Math.random()*1000000);
el.setAttribute(sIdName,sValue);
sQueryId="["+sIdName+"="+sValue+"]"
}return sQueryId
}function _getSelectorMethod(sQuery,bDocument){var oRet={method:null,query:null};
if(/^\s*[a-z]+\s*$/i.test(sQuery)){oRet.method="getElementsByTagName"
}else{if(/^\s*([#\.])([\w\-]+)\s*$/i.test(sQuery)){oRet.method=RegExp.$1=="#"?"getElementById":"getElementsByClassName";
oRet.query=RegExp.$2
}}if(!document[oRet.method]||RegExp.$1=="#"&&!bDocument){oRet.method=oRet.query=null
}return oRet
}function distinct(aList){var aDistinct=[],oDummy={},nUID,oEl,i;
for(i=0;
oEl=aList[i];
i++){nUID=getUID4HTML(oEl);
if(oDummy[nUID]){continue
}aDistinct.push(oEl);
oDummy[nUID]=true
}return aDistinct
}function getUID4HTML(oEl){var nUID=oEl._cssquery_UID;
if(nUID&&validUID[nUID]==oEl){return nUID
}oEl._cssquery_UID=nUID=UID++;
validUID[nUID]=oEl;
return nUID
}var _parseTreeReg1=/(.*?)\s*(![>+~]?)\s*(.*)/;
var _parseTreeReg2=/[!>~+\s]/;
var _parseTreeReg3=/(.*?)[!>~+\s]/;
function makeQueryParseTree(sQuery){var returnVal=[];
var match=sQuery.match(_parseTreeReg1);
if(match){if(_parseTreeReg2.test(match[3])){var right;
var recursive=match[3].replace(_parseTreeReg3,function(m,_){right=_;
return jindo._p_.trim(m.replace(_,""))
});
returnVal.push({left:match[1],com:match[2],right:jindo._p_.trim(right)});
var recursiveObj=makeQueryParseTree(recursive);
for(var i=0,l=recursiveObj.length;
i<l;
i++){returnVal.push(recursiveObj[i])
}}else{returnVal.push({left:match[1],com:match[2],right:match[3]})
}}else{returnVal.push({left:sQuery,com:"",right:""})
}return returnVal
}function exclamationMarkQuery(sQuery,oParent,oOptions){var base=oParent;
if(oParent.nodeType==1){base=oParent.ownerDocument||oParent.document
}var parseTree=makeQueryParseTree(sQuery);
var result=[base];
for(var i=0,l=parseTree.length;
i<l;
i++){result=findElement(parseTree[i],result,oOptions&&oOptions.single&&(i==parseTree.length-1))
}if(!result){return[]
}return distinct(result)
}function findElement(parseTree,baseEle,isBreak){var type=parseTree.com;
switch(type){case"!":case"!>":return findTarget("parentNode",parseTree,baseEle,type=="!",isBreak);
case"!~":case"!+":return findTarget("previousElementSibling",parseTree,baseEle,type=="!~",isBreak);
default:return findDefault(parseTree,baseEle,isBreak)
}}function findTarget(type,parseTree,baseEle,bRise,isBreak){var revision=[];
var result=[];
if(parseTree.left){for(var i=0,l=baseEle.length;
i<l;
i++){revision=revision.concat(cssquery(parseTree.left,baseEle[i]))
}}else{revision=baseEle
}var target;
var right=parseTree.right;
for(var i=0,l=revision.length;
i<l;
i++){target=revision[i][type];
if(bRise){while(target){if(cssquery.test(target,right)){result.push(target);
if(result.length>0&&isBreak){break
}}target=target[type]
}}else{if(target&&cssquery.test(target,right)){result.push(target)
}}if(result.length>0&&isBreak){break
}}return result
}function findDefault(parseTree,baseEle,isBreak){var result=[];
for(var i=0,l=baseEle.length;
i<l;
i++){result=result.concat(cssquery(parseTree.left,baseEle[i]));
if(result.length>0&&isBreak){break
}}return result
}var _div=document.createElement("div");
cssquery=function(sQuery,oParent,oOptions){var oArgs=jindo.$Jindo.checkVarType(arguments,{"4str":["sQuery:String+"],"4var":["sQuery:String+","oParent:Variant"],"4var2":["sQuery:String+","oParent:Variant","oOptions:Variant"]},"cssquery"),sTempId,aRet,nParentNodeType,sProperty,oOldParent,queryid,_clone,sTagName,_parent,vSelectorMethod,sQueryAttrName="queryid";
oParent=_getParentElement(oParent);
oOptions=oOptions&&oOptions.$value?oOptions.$value():oOptions;
var re=/\[(.*?)=([\w\d]*)\]/g;
if(re.test(sQuery)){sQuery=sQuery.replace(re,"[$1='$2']")
}if(_isNonStandardQueryButNotException(sQuery)){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_SELECTOR,(oOptions&&oOptions.single?"<static> cssquery.getSingle":"cssquery"))
}nParentNodeType=oParent.nodeType;
sTagName=(oParent.tagName||"").toUpperCase();
vSelectorMethod=_getSelectorMethod(sQuery,nParentNodeType==9);
if(vSelectorMethod.query){sQuery=vSelectorMethod.query
}vSelectorMethod=vSelectorMethod.method;
if(nParentNodeType!==9&&sTagName!="HTML"){if(nParentNodeType===11){oParent=oParent.cloneNode(true);
_clone=_div.cloneNode(true);
_clone.appendChild(oParent);
oParent=_clone;
_clone=null
}if(!vSelectorMethod){queryid=_addQueryId(oParent,sQueryAttrName);
sQuery=_commaRevise(queryid+" "+sQuery,", "+queryid+" ")
}if((_parent=oParent.parentNode)||sTagName==="BODY"||jindo.$Element._contain((oParent.ownerDocument||oParent.document).body,oParent)){if(!vSelectorMethod){oOldParent=oParent;
oParent=_parent
}}else{if(!vSelectorMethod){_clone=_div.cloneNode(true);
oOldParent=oParent;
_clone.appendChild(oOldParent);
oParent=_clone
}}}else{oParent=(oParent.ownerDocument||oParent.document||oParent);
if(_startCombinator(sQuery)){return[]
}}try{if(!/!=/.test(sQuery)&&sQuery.indexOf("!")>-1){aRet=exclamationMarkQuery(sQuery,oParent,oOptions)
}else{if(oOptions&&oOptions.single){if(vSelectorMethod){aRet=oParent[vSelectorMethod](sQuery);
aRet=[vSelectorMethod=="getElementById"?aRet:aRet[0]]
}else{aRet=[oParent.querySelector(sQuery)]
}}else{if(vSelectorMethod){aRet=oParent[vSelectorMethod](sQuery);
if(vSelectorMethod=="getElementById"){aRet=aRet?[aRet]:[]
}}else{aRet=oParent.querySelectorAll(sQuery)
}aRet=jindo._p_._toArray(aRet)
}}}catch(e){throw e
}finally{if(sProperty){oOldParent.removeAttribute(sQueryAttrName);
_clone=null
}}return aRet
};
cssquery.test=function(oEl,sQuery){if(!cssquery._dummyWrap){createDummy()
}var bRet=false;
if(oEl.nodeType==1){var elDummyClone=oEl.cloneNode(false);
cssquery._dummyWrap.appendChild(elDummyClone);
bRet=cssquery.getSingle(sQuery,cssquery._dummyWrap)?true:false;
cssquery._dummyWrap.innerHTML=""
}return bRet
};
cssquery.useCache=function(bFlag){};
cssquery.clearCache=function(){};
cssquery.release=function(){};
cssquery.getSingle=function(sQuery,oParent,oOptions){return cssquery(sQuery,oParent,{single:true})[0]||null
};
cssquery.extreme=function(bExtreme){};
cssquery._makeQueryParseTree=makeQueryParseTree;
return cssquery
})();
jindo.$Agent=function(){var cl=arguments.callee;
var cc=cl._cached;
if(cc){return cc
}if(!(this instanceof cl)){return new cl
}if(!cc){cl._cached=this
}this._navigator=navigator;
this._dm=document.documentMode
};
jindo.$Agent.prototype.navigator=function(){var info={};
ver=-1,nativeVersion=-1,u=this._navigator.userAgent,v=this._navigator.vendor||"",dm=this._dm;
function f(s,h){return((h||"").indexOf(s)>-1)
}info.getName=function(){var name="";
for(var x in info){if(x!=="mobile"&&typeof info[x]=="boolean"&&info[x]&&info.hasOwnProperty(x)){name=x
}}return name
};
info.webkit=f("WebKit",u);
info.opera=(window.opera!==undefined)||f("Opera",u)||f("OPR",u);
info.chrome=info.webkit&&!info.opera&&f("Chrome",u)||f("CriOS",u);
info.firefox=f("Firefox",u);
info.mobile=(f("Mobile",u)||f("Android",u)||f("Nokia",u)||f("webOS",u)||f("Opera Mini",u)||f("BlackBerry",u)||(f("Windows",u)&&f("PPC",u))||f("Smartphone",u)||f("IEMobile",u))&&!f("iPad",u);
info.msafari=((!f("IEMobile",u)&&f("Mobile",u))||(f("iPad",u)&&f("Safari",u)))&&!info.chrome&&!info.opera&&!info.firefox;
info.mopera=f("Opera Mini",u);
info.mie=f("PPC",u)||f("Smartphone",u)||f("IEMobile",u);
try{if(info.mie){if(dm>0){ver=dm;
if(u.match(/(?:Trident)\/([\d.]+)/)){var nTridentNum=parseInt(RegExp.$1,10);
if(nTridentNum>3){nativeVersion=nTridentNum+4
}}else{nativeVersion=ver
}}else{nativeVersion=ver=u.match(/(?:MSIE) ([\d.]+)/)[1]
}}else{if(info.msafari){ver=parseFloat(u.match(/Safari\/([\d.]+)/)[1]);
if(ver==100){ver=1.1
}else{if(u.match(/Version\/([\d.]+)/)){ver=RegExp.$1
}else{ver=[1,1.2,-1,1.3,2,3][Math.floor(ver/100)]
}}}else{if(info.mopera){ver=u.match(/(?:Opera\sMini)\/([\d.]+)/)[1]
}else{if(info.opera){ver=u.match(/(?:Version|OPR|Opera)[\/\s]?([\d.]+)(?!.*Version)/)[1]
}else{if(info.firefox){ver=u.match(/Firefox\/([\d.]+)/)[1]
}else{if(info.chrome){ver=u.match(/Chrome[ \/]([\d.]+)/)[1]
}}}}}}info.version=parseFloat(ver);
info.nativeVersion=parseFloat(nativeVersion);
if(isNaN(info.version)){info.version=-1
}}catch(e){info.version=-1
}this.navigator=function(){return info
};
return info
};
jindo.$Agent.prototype.os=function(){var info={},u=this._navigator.userAgent,p=this._navigator.platform,f=function(s,h){return(h.indexOf(s)>-1)
},aMatchResult=null;
info.getName=function(){var name="";
for(x in info){if(info[x]===true&&info.hasOwnProperty(x)){name=x
}}return name
};
info.ipad=f("iPad",u);
info.iphone=f("iPhone",u)&&!info.ipad;
info.android=f("Android",u);
info.nokia=f("Nokia",u);
info.blackberry=f("BlackBerry",u);
info.mwin=f("PPC",u)||f("Smartphone",u)||f("IEMobile",u)||f("Windows Phone",u);
info.ios=info.ipad||info.iphone;
info.symbianos=f("SymbianOS",u);
info.version=null;
if(info.android){aMatchResult=u.match(/Android ([\d|\.]+)/);
if(aMatchResult!=null&&aMatchResult[1]!=undefined){info.version=aMatchResult[1]
}}else{if(info.ios){aMatchResult=u.match(/(iPhone )?OS ([\d|_]+)/);
if(aMatchResult!=null&&aMatchResult[2]!=undefined){info.version=String(aMatchResult[2]).split("_").join(".")
}}else{if(info.blackberry){aMatchResult=u.match(/Version\/([\d|\.]+)/);
if(aMatchResult==null){aMatchResult=u.match(/BlackBerry\s?\d{4}\/([\d|\.]+)/)
}if(aMatchResult!=null&&aMatchResult[1]!=undefined){info.version=aMatchResult[1]
}}else{if(info.symbianos){aMatchResult=u.match(/SymbianOS\/(\d+.\w+)/);
if(aMatchResult!=null&&aMatchResult[1]!=undefined){info.version=aMatchResult[1]
}}else{if(info.mwin){aMatchResult=u.match(/Windows CE ([\d|\.]+)/);
if(aMatchResult!=null&&aMatchResult[1]!=undefined){info.version=aMatchResult[1]
}if(!info.version&&(aMatchResult=u.match(/Windows Phone (OS )?([\d|\.]+)/))){info.version=aMatchResult[2]
}}}}}}this.os=function(){return info
};
return info
};
jindo.$A=function(array){var cl=arguments.callee;
if(array instanceof cl){return array
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$A");
return new cl(array)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4voi":[],"4arr":["aPram:Array+"],"4nul":["oNull:Null"],"4und":["oUndefined:Undefined"],arrt:["aPram:ArrayStyle"]},"$A");
if(oArgs==null){array=[]
}switch(oArgs+""){case"arrt":case"4arr":array=oArgs.aPram;
break;
case"4nul":case"4und":case"4voi":array=[]
}this._array=[];
for(var i=0;
i<array.length;
i++){this._array[this._array.length]=array[i]
}};
jindo.$A.checkVarTypeObj={"4fun":["fCallback:Function+"],"4thi":["fCallback:Function+","oThis:Variant"]};
jindo.$A.prototype.toString=function(){return this._array.toString()
};
jindo.$A.prototype.get=function(nIndex){g_checkVarType(arguments,{"4num":["nIndex:Numeric"]},"$A#get");
return this._array[nIndex]
};
jindo.$A.prototype.set=function(nIndex,vValue){g_checkVarType(arguments,{"4num":["nIndex:Numeric","vValue:Variant"]},"$A#set");
this._array[nIndex]=vValue;
return this
};
jindo.$A.prototype.length=function(nLen,oValue){var oArgs=g_checkVarType(arguments,{"4num":[jindo.$Jindo._F("nLen:Numeric")],sv:["nLen:Numeric","vValue:Variant"],"4voi":[]},"$A#length");
switch(oArgs+""){case"4num":this._array.length=oArgs.nLen;
return this;
case"sv":var l=this._array.length;
this._array.length=oArgs.nLen;
for(var i=l;
i<nLen;
i++){this._array[i]=oArgs.vValue
}return this;
case"4voi":return this._array.length
}};
jindo.$A.prototype.has=function(oValue){return(this.indexOf(oValue)>-1)
};
jindo.$A.prototype.indexOf=function(oValue){return this._array.indexOf(oValue)
};
jindo.$A.prototype.$value=function(){return this._array
};
jindo.$A.prototype.push=function(oValue1){return this._array.push.apply(this._array,jindo._p_._toArray(arguments))
};
jindo.$A.prototype.pop=function(){return this._array.pop()
};
jindo.$A.prototype.shift=function(){return this._array.shift()
};
jindo.$A.prototype.unshift=function(oValue1){this._array.unshift.apply(this._array,jindo._p_._toArray(arguments));
return this._array.length
};
jindo.$A.prototype.forEach=function(fCallback,oThis){var oArgs=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#forEach");
var that=this;
function f(v,i,a){try{fCallback.apply(oThis||that,jindo._p_._toArray(arguments))
}catch(e){if(!(e instanceof that.constructor.Continue)){throw e
}}}try{this._array.forEach(f)
}catch(e){if(!(e instanceof this.constructor.Break)){throw e
}}return this
};
jindo.$A.prototype.slice=function(nStart,nEnd){var a=this._array.slice.call(this._array,nStart,nEnd);
return jindo.$A(a)
};
jindo.$A.prototype.splice=function(nIndex,nHowMany){var a=this._array.splice.apply(this._array,jindo._p_._toArray(arguments));
return jindo.$A(a)
};
jindo.$A.prototype.shuffle=function(){this._array.sort(function(a,b){return Math.random()>Math.random()?1:-1
});
return this
};
jindo.$A.prototype.reverse=function(){this._array.reverse();
return this
};
jindo.$A.prototype.empty=function(){this._array.length=0;
return this
};
jindo.$A.prototype.concat=function(vValue){var aRes=[];
if(!arguments.length){return this
}else{aRes=this._array.concat();
for(var i=0,vVal;
vVal=arguments[i];
i++){aRes=aRes.concat(vVal instanceof jindo.$A?vVal._array:vVal)
}return jindo.$A(aRes)
}};
jindo.$A.prototype.sort=function(fpSort){var oArgs=g_checkVarType(arguments,{"void":[],"4fp":["fpSort:Function+"]},"$A#sort");
if(fpSort){this._array.sort(jindo.$Fn(oArgs.fpSort,this).bind())
}else{this._array.sort()
}return this
};
jindo.$A.Break=jindo.$Jindo.Break;
jindo.$A.Continue=jindo.$Jindo.Continue;
jindo.$A.prototype.map=function(fCallback,oThis){var oArgs=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#map");
if(oArgs==null){return this
}var returnArr=[];
var that=this;
function f(v,i,a){try{returnArr.push(fCallback.apply(oThis||this,jindo._p_._toArray(arguments)))
}catch(e){if(e instanceof that.constructor.Continue){returnArr.push(v)
}else{throw e
}}}this.forEach(f);
return jindo.$A(returnArr)
};
jindo.$A.prototype.filter=function(fCallback,oThis){var oArgs=g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#filter");
if(oArgs==null){return this
}var returnArr=[];
var that=this;
function f(v,i,a){try{if(fCallback.apply(oThis||that,jindo._p_._toArray(arguments))){returnArr.push(v)
}}catch(e){if(!(e instanceof that.constructor.Continue)){throw e
}}}try{this.forEach(f)
}catch(e){if(!(e instanceof this.constructor.Break)){throw e
}}return jindo.$A(returnArr)
};
jindo.$A.prototype.every=function(fCallback,oThis){g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#every");
return this._array.every(fCallback,oThis||this)
};
jindo.$A.prototype.some=function(fCallback,oThis){g_checkVarType(arguments,jindo.$A.checkVarTypeObj,"$A#some");
return this._array.some(fCallback,oThis||this)
};
jindo.$A.prototype.refuse=function(oValue1){var a=jindo.$A(jindo._p_._toArray(arguments));
return this.filter(function(v,i){return !(a.indexOf(v)>-1)
})
};
jindo.$A.prototype.unique=function(){var a=this._array,b=[],l=a.length;
var i,j;
for(i=0;
i<l;
i++){for(j=0;
j<b.length;
j++){if(a[i]==b[j]){break
}}if(j>=b.length){b[j]=a[i]
}}this._array=b;
return this
};
jindo.$Ajax=function(url,option){var cl=arguments.callee;
if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Ajax");
return new cl(url,option||{})
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var ___ajax=jindo.$Ajax;
var oArgs=g_checkVarType(arguments,{"4str":["sURL:String+"],"4obj":["sURL:String+","oOption:Hash+"]},"$Ajax");
if(oArgs+""=="for_string"){oArgs.oOption={}
}function _getXHR(){return new XMLHttpRequest()
}var loc=location.toString();
var domain="";
try{domain=loc.match(/^https?:\/\/([a-z0-9_\-\.]+)/i)[1]
}catch(e){}this._status=0;
this._url=oArgs.sURL;
this._headers={};
this._options={type:"xhr",method:"post",proxy:"",timeout:0,onload:function(req){},onerror:null,ontimeout:function(req){},jsonp_charset:"utf-8",callbackid:"",callbackname:"",async:true,decode:true,postBody:false,withCredentials:false};
this._options=___ajax._setProperties(oArgs.oOption,this);
___ajax._validationOption(this._options,"$Ajax");
if(___ajax.CONFIG){this.option(___ajax.CONFIG)
}var _opt=this._options;
_opt.type=_opt.type.toLowerCase();
_opt.method=_opt.method.toLowerCase();
if(window["__"+jindo._p_.jindoName+"_callback"]===undefined){window["__"+jindo._p_.jindoName+"_callback"]=[];
window["__"+jindo._p_.jindoName+"2_callback"]=[]
}var t=this;
switch(_opt.type){case"put":case"delete":case"get":case"post":_opt.method=_opt.type;
case"xhr":this._request=_getXHR();
break;
case"jsonp":if(!___ajax.JSONPRequest){throw new ___error(jindo._p_.jindoName+".$Ajax.JSONPRequest"+___except.REQUIRE_AJAX,"$Ajax")
}this._request=new ___ajax.JSONPRequest(function(name,value){return t.option.apply(t,arguments)
})
}this._checkCORS(this._url,_opt.type,"")
};
jindo.$Ajax.prototype._checkCORS=function(sUrl,sType,sMethod){this._bCORS=false;
if(/^http/.test(sUrl)&&!new RegExp("^http://"+window.location.host,"i").test(sUrl)&&sType==="xhr"){if(!("withCredentials" in this._request)){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_CORS,"$Ajax"+sMethod)
}this._bCORS=true
}};
jindo.$Ajax._setProperties=function(option,context){option=option||{};
var type;
if((option.type=="put"||option.type=="delete"||option.type=="get"||option.type=="post")&&!option.method){option.method=option.type;
type=option.type="xhr"
}type=option.type=(option.type||"xhr");
option.onload=jindo.$Fn(option.onload||function(){},context).bind();
option.ontimeout=jindo.$Fn(option.ontimeout||function(){},context).bind();
option.onerror=jindo.$Fn(option.onerror||function(){},context).bind();
option.method=option.method||"post";
if(type=="xhr"){option.async=option.async===undefined?true:option.async;
option.postBody=option.postBody===undefined?false:option.postBody;
option.withCredentials=option.withCredentials===undefined?false:option.withCredentials
}else{if(type=="jsonp"){option.method="get";
option.jsonp_charset=option.jsonp_charset||"utf-8";
option.callbackid=option.callbackid||"";
option.callbackname=option.callbackname||""
}}return option
};
jindo.$Ajax._validationOption=function(oOption,sMethod){var ___error=jindo.$Error;
var ___except=jindo.$Except;
var sType=oOption.type;
if(sType==="jsonp"){if(oOption.method!=="get"){jindo.$Jindo._warn(___except.CANNOT_USE_OPTION+"\n\t"+sMethod+"-method="+oOption.method)
}}else{if(sType==="flash"){if(!(oOption.method==="get"||oOption.method==="post")){jindo.$Jindo._warn(___except.CANNOT_USE_OPTION+"\n\t"+sMethod+"-method="+oOption.method)
}}}if(oOption.postBody){if(!(sType==="xhr"&&(oOption.method!=="get"))){jindo.$Jindo._warn(___except.CANNOT_USE_OPTION+"\n\t"+oOption.method+"-postBody="+oOption.postBody)
}}var oTypeProperty={xhr:"onload|timeout|ontimeout|onerror|async|method|postBody|type|withCredentials",jsonp:"onload|timeout|ontimeout|onerror|jsonp_charset|callbackid|callbackname|method|type"},aName=[],i=0;
for(aName[i++] in oOption){}var sProperty=oTypeProperty[sType]||"";
for(var i=0,l=aName.length;
i<l;
i++){if(sProperty.indexOf(aName[i])==-1){jindo.$Jindo._warn(___except.CANNOT_USE_OPTION+"\n\t"+sType+"-"+aName[i])
}}};
jindo.$Ajax.prototype._onload=function(){var status=this._request.status;
var bSuccess=this._request.readyState==4&&(status==200||status==0);
var oResult;
if(this._request.readyState==4){try{if((!bSuccess)&&jindo.$Jindo.isFunction(this._options.onerror)){this._options.onerror(new jindo.$Ajax.Response(this._request))
}else{oResult=this._options.onload(new jindo.$Ajax.Response(this._request))
}}finally{this._status--;
if(jindo.$Jindo.isFunction(this._oncompleted)){this._oncompleted(bSuccess,oResult)
}}}};
jindo.$Ajax.prototype.request=function(oData){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4voi":[],"4obj":[cache._F("oData:Hash+")],"4str":["sData:String+"]},"$Ajax#request");
this._status++;
var t=this;
var req=this._request;
var opt=this._options;
var data,v,a=[],data="";
var _timer=null;
var url=this._url;
this._is_abort=false;
var sUpType=opt.type.toUpperCase();
var sUpMethod=opt.method.toUpperCase();
if(opt.postBody&&sUpType=="XHR"&&sUpMethod!="GET"){if(oArgs+""=="4str"){data=oArgs.sData
}else{if(oArgs+""=="4obj"){data=jindo.$Json(oArgs.oData).toString()
}else{data=null
}}}else{switch(oArgs+""){case"4voi":data=null;
break;
case"4obj":var oData=oArgs.oData;
for(var k in oData){if(oData.hasOwnProperty(k)){v=oData[k];
if(cache.isFunction(v)){v=v()
}if(cache.isArray(v)||(jindo.$A&&v instanceof jindo.$A)){if(v instanceof jindo.$A){v=v._array
}for(var i=0;
i<v.length;
i++){a[a.length]=k+"="+encodeURIComponent(v[i])
}}else{a[a.length]=k+"="+encodeURIComponent(v)
}}}data=a.join("&")
}}if(data&&sUpType=="XHR"&&sUpMethod=="GET"){if(url.indexOf("?")==-1){url+="?"
}else{url+="&"
}url+=data;
data=null
}if(sUpType=="XHR"){req.open(sUpMethod,url,!!opt.async)
}else{req.open(sUpMethod,url)
}if(opt.withCredentials){req.withCredentials=true
}if(sUpType=="XHR"&&sUpMethod=="POST"){req.setRequestHeader("If-Modified-Since","Thu, 1 Jan 1970 00:00:00 GMT")
}if(sUpType=="XHR"){if(!this._headers["Content-Type"]){req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8")
}if(!this._bCORS&&!this._headers["X-Requested-With"]){req.setRequestHeader("X-Requested-With","XMLHttpRequest")
}for(var x in this._headers){if(this._headers.hasOwnProperty(x)){if(typeof this._headers[x]=="function"){continue
}req.setRequestHeader(x,String(this._headers[x]))
}}}if(req.addEventListener){if(this._loadFunc){req.removeEventListener("load",this._loadFunc,false)
}if(this._errorFun){req.removeEventListener("error",this._errorFun,false)
}this._loadFunc=function(rq){clearTimeout(_timer);
_timer=undefined;
t._onload()
};
this._errorFun=function(rq){clearTimeout(_timer);
_timer=undefined;
t._options.onerror(new jindo.$Ajax.Response(t._request))
};
req.addEventListener("load",this._loadFunc,false);
req.addEventListener("error",this._errorFun,false)
}else{if(req.onload!==undefined){req.onload=function(rq){if(req.readyState==4&&!t._is_abort){clearTimeout(_timer);
_timer=undefined;
t._onload()
}}
}else{req.onreadystatechange=function(rq){if(req.readyState==4){clearTimeout(_timer);
_timer=undefined;
t._onload()
}}
}}if(opt.timeout>0){if(this._timer){clearTimeout(this._timer)
}_timer=setTimeout(function(){t._is_abort=true;
if(t._interval){clearInterval(t._interval);
t._interval=undefined
}try{req.abort()
}catch(e){}opt.ontimeout(req);
if(cache.isFunction(t._oncompleted)){t._oncompleted(false)
}},opt.timeout*1000);
this._timer=_timer
}this._test_url=url;
req.send(data);
return this
};
jindo.$Ajax.prototype.isIdle=function(){return this._status==0
};
jindo.$Ajax.prototype.abort=function(){try{if(this._interval){clearInterval(this._interval)
}if(this._timer){clearTimeout(this._timer)
}this._interval=undefined;
this._timer=undefined;
this._is_abort=true;
this._request.abort()
}finally{this._status--
}return this
};
jindo.$Ajax.prototype.url=function(sURL){var oArgs=g_checkVarType(arguments,{g:[],s:["sURL:String+"]},"$Ajax#url");
switch(oArgs+""){case"g":return this._url;
case"s":this._checkCORS(oArgs.sURL,this._options.type,"#url");
this._url=oArgs.sURL;
return this
}};
jindo.$Ajax.prototype.option=function(name,value){var oArgs=g_checkVarType(arguments,{s4var:["sKey:String+","vValue:Variant"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax#option");
switch(oArgs+""){case"s4var":oArgs.oOption={};
oArgs.oOption[oArgs.sKey]=oArgs.vValue;
case"s4obj":var oOption=oArgs.oOption;
try{for(var x in oOption){if(oOption.hasOwnProperty(x)){if(x==="onload"||x==="ontimeout"||x==="onerror"){this._options[x]=jindo.$Fn(oOption[x],this).bind()
}else{this._options[x]=oOption[x]
}}}}catch(e){}break;
case"g":return this._options[oArgs.sKey]
}this._checkCORS(this._url,this._options.type,"#option");
jindo.$Ajax._validationOption(this._options,"$Ajax#option");
return this
};
jindo.$Ajax.prototype.header=function(name,value){if(this._options.type==="jsonp"){jindo.$Jindo._warn(jindo.$Except.CANNOT_USE_HEADER)
}var oArgs=g_checkVarType(arguments,{s4str:["sKey:String+","sValue:String+"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax#option");
switch(oArgs+""){case"s4str":this._headers[oArgs.sKey]=oArgs.sValue;
break;
case"s4obj":var oOption=oArgs.oOption;
try{for(var x in oOption){if(oOption.hasOwnProperty(x)){this._headers[x]=oOption[x]
}}}catch(e){}break;
case"g":return this._headers[oArgs.sKey]
}return this
};
jindo.$Ajax.Response=function(req){this._response=req;
this._regSheild=/^for\(;;\);/
};
jindo.$Ajax.Response.prototype.xml=function(){return this._response.responseXML
};
jindo.$Ajax.Response.prototype.text=function(){return this._response.responseText.replace(this._regSheild,"")
};
jindo.$Ajax.Response.prototype.status=function(){var status=this._response.status;
return status==0?200:status
};
jindo.$Ajax.Response.prototype.readyState=function(){return this._response.readyState
};
jindo.$Ajax.Response.prototype.json=function(){if(this._response.responseJSON){return this._response.responseJSON
}else{if(this._response.responseText){try{return eval("("+this.text()+")")
}catch(e){throw new jindo.$Error(jindo.$Except.PARSE_ERROR,"$Ajax#json")
}}}return{}
};
jindo.$Ajax.Response.prototype.header=function(name){var oArgs=g_checkVarType(arguments,{"4str":["name:String+"],"4voi":[]},"$Ajax.Response#header");
switch(oArgs+""){case"4str":return this._response.getResponseHeader(name);
case"4voi":return this._response.getAllResponseHeaders()
}};
var klass=jindo.$Class;
jindo.$Ajax.RequestBase=klass({_respHeaderString:"",callbackid:"",callbackname:"",responseXML:null,responseJSON:null,responseText:"",status:404,readyState:0,$init:function(fpOption){},onload:function(){},abort:function(){},open:function(){},send:function(){},setRequestHeader:function(sName,sValue){g_checkVarType(arguments,{"4str":["sName:String+","sValue:String+"]},"$Ajax.RequestBase#setRequestHeader");
this._headers[sName]=sValue
},getResponseHeader:function(sName){g_checkVarType(arguments,{"4str":["sName:String+"]},"$Ajax.RequestBase#getResponseHeader");
return this._respHeaders[sName]||""
},getAllResponseHeaders:function(){return this._respHeaderString
},_getCallbackInfo:function(){var id="";
if(this.option("callbackid")!=""){var idx=0;
do{id="_"+this.option("callbackid")+"_"+idx;
idx++
}while(window["__"+jindo._p_.jindoName+"_callback"][id])
}else{do{id="_"+Math.floor(Math.random()*10000)
}while(window["__"+jindo._p_.jindoName+"_callback"][id])
}if(this.option("callbackname")==""){this.option("callbackname","_callback")
}return{callbackname:this.option("callbackname"),id:id,name:"window.__"+jindo._p_.jindoName+"_callback."+id}
}});
jindo.$Ajax.JSONPRequest=klass({_headers:{},_respHeaders:{},_script:null,_onerror:null,$init:function(fpOption){this.option=fpOption
},_callback:function(data){if(this._onerror){clearTimeout(this._onerror);
this._onerror=null
}var self=this;
this.responseJSON=data;
this.onload(this);
setTimeout(function(){self.abort()
},10)
},abort:function(){if(this._script){try{this._script.parentNode.removeChild(this._script)
}catch(e){}}},open:function(method,url){g_checkVarType(arguments,{"4str":["method:String+","url:String+"]},"$Ajax.JSONPRequest#open");
this.responseJSON=null;
this._url=url
},send:function(data){var oArgs=g_checkVarType(arguments,{"4voi":[],"4nul":["data:Null"],"4str":["data:String+"]},"$Ajax.JSONPRequest#send");
var t=this;
var info=this._getCallbackInfo();
var head=document.getElementsByTagName("head")[0];
this._script=document.createElement("script");
this._script.type="text/javascript";
this._script.charset=this.option("jsonp_charset");
if(head){head.appendChild(this._script)
}else{if(document.body){document.body.appendChild(this._script)
}}window["__"+jindo._p_.jindoName+"_callback"][info.id]=function(data){try{t.readyState=4;
t.status=200;
t._callback(data)
}finally{delete window["__"+jindo._p_.jindoName+"_callback"][info.id];
delete window["__"+jindo._p_.jindoName+"2_callback"][info.id]
}};
window["__"+jindo._p_.jindoName+"2_callback"][info.id]=function(data){window["__"+jindo._p_.jindoName+"_callback"][info.id](data)
};
var _loadCallback=function(){if(!t.responseJSON){t.readyState=4;
t.status=500;
t._onerror=setTimeout(function(){t._callback(null)
},200)
}};
this._script.onload=this._script.onerror=function(){_loadCallback();
this.onerror=null;
this.onload=null
};
var delimiter="&";
if(this._url.indexOf("?")==-1){delimiter="?"
}switch(oArgs+""){case"4voi":case"4nul":data="";
break;
case"4str":data="&"+data
}this._test_url=this._script.src=this._url+delimiter+info.callbackname+"="+info.name+data
}}).extend(jindo.$Ajax.RequestBase);
jindo.$Ajax.Queue=function(option){var cl=arguments.callee;
if(!(this instanceof cl)){return new cl(option||{})
}var oArgs=g_checkVarType(arguments,{"4voi":[],"4obj":["option:Hash+"]},"$Ajax.Queue");
option=oArgs.option;
this._options={async:false,useResultAsParam:false,stopOnFailure:false};
this.option(option);
this._queue=[]
};
jindo.$Ajax.Queue.prototype.option=function(name,value){var oArgs=g_checkVarType(arguments,{s4str:["sKey:String+","sValue:Variant"],s4obj:["oOption:Hash+"],g:["sKey:String+"]},"$Ajax.Queue#option");
switch(oArgs+""){case"s4str":this._options[oArgs.sKey]=oArgs.sValue;
break;
case"s4obj":var oOption=oArgs.oOption;
try{for(var x in oOption){if(oOption.hasOwnProperty(x)){this._options[x]=oOption[x]
}}}catch(e){}break;
case"g":return this._options[oArgs.sKey]
}return this
};
jindo.$Ajax.Queue.prototype.add=function(oAjax,oParam){var oArgs=g_checkVarType(arguments,{"4obj":["oAjax:Hash+"],"4obj2":["oAjax:Hash+","oPram:Hash+"]},"$Ajax.Queue");
switch(oArgs+""){case"4obj2":oParam=oArgs.oPram
}this._queue.push({obj:oAjax,param:oParam});
return this
};
jindo.$Ajax.Queue.prototype.request=function(){this._requestAsync.apply(this,this.option("async")?[]:[0]);
return this
};
jindo.$Ajax.Queue.prototype._requestSync=function(nIdx,oParam){var t=this;
var queue=this._queue;
if(queue.length>nIdx+1){queue[nIdx].obj._oncompleted=function(bSuccess,oResult){if(!t.option("stopOnFailure")||bSuccess){t._requestSync(nIdx+1,oResult)
}}
}var _oParam=queue[nIdx].param||{};
if(this.option("useResultAsParam")&&oParam){try{for(var x in oParam){if(_oParam[x]===undefined&&oParam.hasOwnProperty(x)){_oParam[x]=oParam[x]
}}}catch(e){}}queue[nIdx].obj.request(_oParam)
};
jindo.$Ajax.Queue.prototype._requestAsync=function(){for(var i=0;
i<this._queue.length;
i++){this._queue[i].obj.request(this._queue[i].param||{})
}};
jindo.$H=function(hashObject){var cl=arguments.callee;
if(hashObject instanceof cl){return hashObject
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$H");
return new cl(hashObject||{})
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4obj":["oObj:Hash+"],"4vod":[]},"$H");
this._table={};
for(var k in hashObject){if(hashObject.hasOwnProperty(k)){this._table[k]=hashObject[k]
}}};
jindo.$H.prototype.$value=function(){return this._table
};
jindo.$H.prototype.$=function(key,value){var oArgs=g_checkVarType(arguments,{s4var:[jindo.$Jindo._F("key:String+"),"value:Variant"],s4var2:["key:Numeric","value:Variant"],g4str:["key:String+"],s4obj:["oObj:Hash+"],g4num:["key:Numeric"]},"$H#$");
switch(oArgs+""){case"s4var":case"s4var2":this._table[key]=value;
return this;
case"s4obj":var obj=oArgs.oObj;
for(var i in obj){if(obj.hasOwnProperty(i)){this._table[i]=obj[i]
}}return this;
default:return this._table[key]
}};
jindo.$H.prototype.length=function(){var index=0;
var sortedIndex=this["__jindo_sorted_index"];
if(sortedIndex){return sortedIndex.length
}else{for(var k in this._table){if(this._table.hasOwnProperty(k)){if(Object.prototype[k]!==undefined&&Object.prototype[k]===this._table[k]){continue
}index++
}}}return index
};
jindo.$H.prototype.forEach=function(callback,scopeObject){var oArgs=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#forEach");
var t=this._table;
var h=this.constructor;
var sortedIndex=this["__jindo_sorted_index"];
if(sortedIndex){for(var i=0,l=sortedIndex.length;
i<l;
i++){try{var k=sortedIndex[i];
callback.call(scopeObject||this,t[k],k,t)
}catch(e){if(e instanceof h.Break){break
}if(e instanceof h.Continue){continue
}throw e
}}}else{for(var k in t){if(t.hasOwnProperty(k)){if(!t.propertyIsEnumerable(k)){continue
}try{callback.call(scopeObject||this,t[k],k,t)
}catch(e){if(e instanceof h.Break){break
}if(e instanceof h.Continue){continue
}throw e
}}}}return this
};
jindo.$H.prototype.filter=function(callback,thisObject){var oArgs=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#filter");
var h=jindo.$H();
var t=this._table;
var hCon=this.constructor;
for(var k in t){if(t.hasOwnProperty(k)){if(!t.propertyIsEnumerable(k)){continue
}try{if(callback.call(thisObject||this,t[k],k,t)){h.add(k,t[k])
}}catch(e){if(e instanceof hCon.Break){break
}if(e instanceof hCon.Continue){continue
}throw e
}}}return h
};
jindo.$H.prototype.map=function(callback,thisObject){var oArgs=g_checkVarType(arguments,{"4fun":["callback:Function+"],"4obj":["callback:Function+","thisObject:Variant"]},"$H#map");
var h=jindo.$H();
var t=this._table;
var hCon=this.constructor;
for(var k in t){if(t.hasOwnProperty(k)){if(!t.propertyIsEnumerable(k)){continue
}try{h.add(k,callback.call(thisObject||this,t[k],k,t))
}catch(e){if(e instanceof hCon.Break){break
}if(e instanceof hCon.Continue){h.add(k,t[k])
}else{throw e
}}}}return h
};
jindo.$H.prototype.add=function(key,value){var oArgs=g_checkVarType(arguments,{"4str":["key:String+","value:Variant"],"4num":["key:Numeric","value:Variant"]},"$H#add");
var sortedIndex=this["__jindo_sorted_index"];
if(sortedIndex&&this._table[key]==undefined){this["__jindo_sorted_index"].push(key)
}this._table[key]=value;
return this
};
jindo.$H.prototype.remove=function(key){var oArgs=g_checkVarType(arguments,{"4str":["key:String+"],"4num":["key:Numeric"]},"$H#remove");
if(this._table[key]===undefined){return null
}var val=this._table[key];
delete this._table[key];
var sortedIndex=this["__jindo_sorted_index"];
if(sortedIndex){var newSortedIndex=[];
for(var i=0,l=sortedIndex.length;
i<l;
i++){if(sortedIndex[i]!=key){newSortedIndex.push(sortedIndex[i])
}}this["__jindo_sorted_index"]=newSortedIndex
}return val
};
jindo.$H.prototype.search=function(value){var oArgs=g_checkVarType(arguments,{"4str":["value:Variant"]},"$H#search");
var result=false;
var t=this._table;
for(var k in t){if(t.hasOwnProperty(k)){if(!t.propertyIsEnumerable(k)){continue
}var v=t[k];
if(v===value){result=k;
break
}}}return result
};
jindo.$H.prototype.hasKey=function(key){var oArgs=g_checkVarType(arguments,{"4str":["key:String+"],"4num":["key:Numeric"]},"$H#hasKey");
return this._table[key]!==undefined
};
jindo.$H.prototype.hasValue=function(value){var oArgs=g_checkVarType(arguments,{"4str":["value:Variant"]},"$H#hasValue");
return(this.search(value)!==false)
};
jindo._p_.defaultSort=function(oArgs,that,type){var aSorted=[];
var fpSort=oArgs.fpSort;
for(var k in that._table){if(that._table.hasOwnProperty(k)){(function(k,v){aSorted.push({key:k,val:v})
})(k,that._table[k])
}}if(oArgs+""==="vo"){fpSort=function(a,b){return a===b?0:a>b?1:-1
}
}aSorted.sort(function(beforeVal,afterVal){return fpSort.call(that,beforeVal[type],afterVal[type])
});
var sortedKey=[];
for(var i=0,l=aSorted.length;
i<l;
i++){sortedKey.push(aSorted[i].key)
}return sortedKey
};
jindo.$H.prototype.sort=function(fpSort){var oArgs=g_checkVarType(arguments,{vo:[],"4fp":["fpSort:Function+"]},"$H#sort");
this["__jindo_sorted_index"]=jindo._p_.defaultSort(oArgs,this,"val");
return this
};
jindo.$H.prototype.ksort=function(fpSort){var oArgs=g_checkVarType(arguments,{vo:[],"4fp":["fpSort:Function+"]},"$H#ksort");
this["__jindo_sorted_index"]=jindo._p_.defaultSort(oArgs,this,"key");
return this
};
jindo.$H.prototype.keys=function(){var keys=this["__jindo_sorted_index"];
if(!keys){keys=[];
for(var k in this._table){if(this._table.hasOwnProperty(k)){keys.push(k)
}}}return keys
};
jindo.$H.prototype.values=function(){var values=[];
for(var k in this._table){if(this._table.hasOwnProperty(k)){values[values.length]=this._table[k]
}}return values
};
jindo.$H.prototype.toQueryString=function(){var buf=[],val=null,idx=0;
for(var k in this._table){if(this._table.hasOwnProperty(k)){val=this._table[k];
if(jindo.$Jindo.isArray(val)){for(i=0;
i<val.length;
i++){buf[buf.length]=encodeURIComponent(k)+"[]="+encodeURIComponent(val[i]+"")
}}else{buf[buf.length]=encodeURIComponent(k)+"="+encodeURIComponent(this._table[k]+"")
}}}return buf.join("&")
};
jindo.$H.prototype.empty=function(){this._table={};
delete this["__jindo_sorted_index"];
return this
};
jindo.$H.Break=jindo.$Jindo.Break;
jindo.$H.Continue=jindo.$Jindo.Continue;
jindo.$Json=function(sObject){var cl=arguments.callee;
if(sObject instanceof cl){return sObject
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Json");
return new cl(arguments.length?sObject:{})
}catch(e){if(e instanceof TypeError){return null
}throw e
}}g_checkVarType(arguments,{"4var":["oObject:Variant"]},"$Json");
this._object=sObject
};
jindo.$Json._oldMakeJSON=function(sObject,sType){try{if(jindo.$Jindo.isString(sObject)&&/^(?:\s*)[\{\[]/.test(sObject)){sObject=eval("("+sObject+")")
}else{return sObject
}}catch(e){throw new jindo.$Error(jindo.$Except.PARSE_ERROR,sType)
}return sObject
};
jindo.$Json.fromXML=function(sXML){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4str":["sXML:String+"]},"<static> $Json#fromXML");
var o={};
var re=/\s*<(\/?[\w:\-]+)((?:\s+[\w:\-]+\s*=\s*(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'))*)\s*((?:\/>)|(?:><\/\1>|\s*))|\s*<!\[CDATA\[([\w\W]*?)\]\]>\s*|\s*>?([^<]*)/ig;
var re2=/^[0-9]+(?:\.[0-9]+)?$/;
var ec={"&amp;":"&","&nbsp;":" ","&quot;":'"',"&lt;":"<","&gt;":">"};
var fg={tags:["/"],stack:[o]};
var es=function(s){if(cache.isUndefined(s)){return""
}return s.replace(/&[a-z]+;/g,function(m){return(cache.isString(ec[m]))?ec[m]:m
})
};
var at=function(s,c){s.replace(/([\w\:\-]+)\s*=\s*(?:"((?:\\"|[^"])*)"|'((?:\\'|[^'])*)')/g,function($0,$1,$2,$3){c[$1]=es(($2?$2.replace(/\\"/g,'"'):undefined)||($3?$3.replace(/\\'/g,"'"):undefined))
})
};
var em=function(o){for(var x in o){if(o.hasOwnProperty(x)){if(Object.prototype[x]){continue
}return false
}}return true
};
var cb=function($0,$1,$2,$3,$4,$5){var cur,cdata="";
var idx=fg.stack.length-1;
if(cache.isString($1)&&$1){if($1.substr(0,1)!="/"){var has_attr=(typeof $2=="string"&&$2);
var closed=(typeof $3=="string"&&$3);
var newobj=(!has_attr&&closed)?"":{};
cur=fg.stack[idx];
if(cache.isUndefined(cur[$1])){cur[$1]=newobj;
cur=fg.stack[idx+1]=cur[$1]
}else{if(cur[$1] instanceof Array){var len=cur[$1].length;
cur[$1][len]=newobj;
cur=fg.stack[idx+1]=cur[$1][len]
}else{cur[$1]=[cur[$1],newobj];
cur=fg.stack[idx+1]=cur[$1][1]
}}if(has_attr){at($2,cur)
}fg.tags[idx+1]=$1;
if(closed){fg.tags.length--;
fg.stack.length--
}}else{fg.tags.length--;
fg.stack.length--
}}else{if(cache.isString($4)&&$4){cdata=$4
}else{if(cache.isString($5)&&$5){cdata=es($5)
}}}if(cdata.replace(/^\s+/g,"").length>0){var par=fg.stack[idx-1];
var tag=fg.tags[idx];
if(re2.test(cdata)){cdata=parseFloat(cdata)
}else{if(cdata=="true"){cdata=true
}else{if(cdata=="false"){cdata=false
}}}if(cache.isUndefined(par)){return
}if(par[tag] instanceof Array){var o=par[tag];
if(cache.isHash(o[o.length-1])&&!em(o[o.length-1])){o[o.length-1].$cdata=cdata;
o[o.length-1].toString=function(){return cdata
}
}else{o[o.length-1]=cdata
}}else{if(cache.isHash(par[tag])&&!em(par[tag])){par[tag].$cdata=cdata;
par[tag].toString=function(){return cdata
}
}else{par[tag]=cdata
}}}};
sXML=sXML.replace(/<(\?|\!-)[^>]*>/g,"");
sXML.replace(re,cb);
return jindo.$Json(o)
};
jindo.$Json.prototype.get=function(sPath){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4str":["sPath:String+"]},"$Json#get");
var o=jindo.$Json._oldMakeJSON(this._object,"$Json#get");
if(!(cache.isHash(o)||cache.isArray(o))){throw new jindo.$Error(jindo.$Except.JSON_MUST_HAVE_ARRAY_HASH,"$Json#get")
}var p=sPath.split("/");
var re=/^([\w:\-]+)\[([0-9]+)\]$/;
var stack=[[o]],cur=stack[0];
var len=p.length,c_len,idx,buf,j,e;
for(var i=0;
i<len;
i++){if(p[i]=="."||p[i]==""){continue
}if(p[i]==".."){stack.length--
}else{buf=[];
idx=-1;
c_len=cur.length;
if(c_len==0){return[]
}if(re.test(p[i])){idx=+RegExp.$2
}for(j=0;
j<c_len;
j++){e=cur[j][p[i]];
if(cache.isUndefined(e)){continue
}if(cache.isArray(e)){if(idx>-1){if(idx<e.length){buf[buf.length]=e[idx]
}}else{buf=buf.concat(e)
}}else{if(idx==-1){buf[buf.length]=e
}}}stack[stack.length]=buf
}cur=stack[stack.length-1]
}return cur
};
jindo.$Json.prototype.toString=function(){return jindo.$Json._oldToString(this._object)
};
jindo.$Json._oldToString=function(oObj){var cache=jindo.$Jindo;
var func={$:function($){if(cache.isNull($)||!cache.isString($)&&$==Infinity){return"null"
}if(cache.isFunction($)){return undefined
}if(cache.isUndefined($)){return undefined
}if(cache.isBoolean($)){return $?"true":"false"
}if(cache.isString($)){return this.s($)
}if(cache.isNumeric($)){return $
}if(cache.isArray($)){return this.a($)
}if(cache.isHash($)){return this.o($)
}if(cache.isDate($)){return $+""
}if(typeof $=="object"||cache.isRegExp($)){return"{}"
}if(isNaN($)){return"null"
}},s:function(s){var e={'"':'\\"',"\\":"\\\\","\n":"\\n","\r":"\\r","\t":"\\t"};
var c=function(m){return(e[m]!==undefined)?e[m]:m
};
return'"'+s.replace(/[\\"'\n\r\t]/g,c)+'"'
},a:function(a){var s="[",c="",n=a.length;
for(var i=0;
i<n;
i++){if(cache.isFunction(a[i])){continue
}s+=c+this.$(a[i]);
if(!c){c=","
}}return s+"]"
},o:function(o){o=jindo.$H(o).ksort().$value();
var s="{",c="";
for(var x in o){if(o.hasOwnProperty(x)){if(cache.isUndefined(o[x])||cache.isFunction(o[x])){continue
}s+=c+this.s(x)+":"+this.$(o[x]);
if(!c){c=","
}}}return s+"}"
}};
return func.$(oObj)
};
jindo.$Json.prototype.toXML=function(){var f=function($,tag){var t=function(s,at){return"<"+tag+(at||"")+">"+s+"</"+tag+">"
};
switch(typeof $){case"undefined":case"null":return t("");
case"number":return t($);
case"string":if($.indexOf("<")<0){return t($.replace(/&/g,"&amp;"))
}else{return t("<![CDATA["+$+"]]>")
}case"boolean":return t(String($));
case"object":var ret="";
if($ instanceof Array){var len=$.length;
for(var i=0;
i<len;
i++){ret+=f($[i],tag)
}}else{var at="";
for(var x in $){if($.hasOwnProperty(x)){if(x=="$cdata"||typeof $[x]=="function"){continue
}ret+=f($[x],x)
}}if(tag){ret=t(ret,at)
}}return ret
}};
return f(jindo.$Json._oldMakeJSON(this._object,"$Json#toXML"),"")
};
jindo.$Json.prototype.toObject=function(){return jindo.$Json._oldMakeJSON(this._object,"$Json#toObject")
};
jindo.$Json.prototype.compare=function(oObj){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4obj":["oData:Hash+"],"4arr":["oData:Array+"]},"$Json#compare");
function compare(vSrc,vTar){if(cache.isArray(vSrc)){if(vSrc.length!==vTar.length){return false
}for(var i=0,nLen=vSrc.length;
i<nLen;
i++){if(!arguments.callee(vSrc[i],vTar[i])){return false
}}return true
}else{if(cache.isRegExp(vSrc)||cache.isFunction(vSrc)||cache.isDate(vSrc)){return String(vSrc)===String(vTar)
}else{if(typeof vSrc==="number"&&isNaN(vSrc)){return isNaN(vTar)
}else{if(cache.isHash(vSrc)){var nLen=0;
for(var k in vSrc){nLen++
}for(var k in vTar){nLen--
}if(nLen!==0){return false
}for(var k in vSrc){if(k in vTar===false||!arguments.callee(vSrc[k],vTar[k])){return false
}}return true
}}}}return vSrc===vTar
}try{return compare(jindo.$Json._oldMakeJSON(this._object,"$Json#compare"),oObj)
}catch(e){return false
}};
jindo.$Json.prototype.$value=jindo.$Json.prototype.toObject;
jindo.$Cookie=function(){var cl=arguments.callee;
var cached=cl._cached;
if(cl._cached){return cl._cached
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Cookie");
return(arguments.length>0)?new cl(arguments[0]):new cl
}catch(e){if(e instanceof TypeError){return null
}throw e
}}if(!(this instanceof cl)){return new cl
}if(typeof jindo.$Jindo.isUndefined(cl._cached)){cl._cached=this
}var oArgs=jindo.$Jindo.checkVarType(arguments,{"4voi":[],"4bln":["bURIComponent:Boolean"]},"$Cookie");
switch(oArgs+""){case"4voi":this._bURIComponent=false;
break;
case"4bln":this._bURIComponent=oArgs.bURIComponent;
break
}};
jindo.$Cookie.prototype.keys=function(){var ca=document.cookie.split(";");
var re=/^\s+|\s+$/g;
var a=new Array;
for(var i=0;
i<ca.length;
i++){a[a.length]=ca[i].substr(0,ca[i].indexOf("=")).replace(re,"")
}return a
};
jindo.$Cookie.prototype.get=function(sName){var oArgs=jindo.$Jindo.checkVarType(arguments,{"4str":["sName:String+"]},"$Cookie#get");
var ca=document.cookie.split(/\s*;\s*/);
var re=new RegExp("^(\\s*"+sName+"\\s*=)");
var sEncoded;
var sDecoded;
for(var i=0;
i<ca.length;
i++){if(re.test(ca[i])){sEncoded=ca[i].substr(RegExp.$1.length);
if(this._bURIComponent&&jindo.$Jindo.isNull(sEncoded.match(/%u\w{4}/))){sDecoded=decodeURIComponent(sEncoded)
}else{sDecoded=unescape(sEncoded)
}return sDecoded
}}return null
};
jindo.$Cookie.prototype.set=function(sName,sValue,nDays,sDomain,sPath){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4str":["sName:String+","sValue:String+"],day_for_string:["sName:String+","sValue:String+","nDays:Numeric"],domain_for_string:["sName:String+","sValue:String+","nDays:Numeric","sDomain:String+"],path_for_string:["sName:String+","sValue:String+","nDays:Numeric","sDomain:String+","sPath:String+"],"4num":["sName:String+","sValue:Numeric"],day_for_num:["sName:String+","sValue:Numeric","nDays:Numeric"],domain_for_num:["sName:String+","sValue:Numeric","nDays:Numeric","sDomain:String+"],path_for_num:["sName:String+","sValue:Numeric","nDays:Numeric","sDomain:String+","sPath:String+"]},"$Cookie#set");
var sExpire="";
var sEncoded;
if(oArgs+""!=="4str"&&nDays!==0){sExpire=";expires="+(new Date((new Date()).getTime()+nDays*1000*60*60*24)).toGMTString()
}if(cache.isUndefined(sDomain)){sDomain=""
}if(cache.isUndefined(sPath)){sPath="/"
}if(this._bURIComponent){sEncoded=encodeURIComponent(sValue)
}else{sEncoded=escape(sValue)
}document.cookie=sName+"="+sEncoded+sExpire+"; path="+sPath+(sDomain?"; domain="+sDomain:"");
return this
};
jindo.$Cookie.prototype.remove=function(sName,sDomain,sPath){var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4str":["sName:String+"],domain_for_string:["sName:String+","sDomain:String+"],path_for_string:["sName:String+","sDomain:String+","sPath:String+"]},"$Cookie#remove");
var aArg=jindo._p_._toArray(arguments);
var aPram=[];
for(var i=0,l=aArg.length;
i<l;
i++){aPram.push(aArg[i]);
if(i==0){aPram.push("");
aPram.push(-1)
}}if(!cache.isNull(this.get(sName))){this.set.apply(this,aPram)
}return this
};
jindo.$Event=function(e){var cl=arguments.callee;
if(e instanceof cl){return e
}if(!(this instanceof cl)){return new cl(e)
}this._event=this._posEvent=e;
this._globalEvent=window.event;
this.type=e.type.toLowerCase();
if(this.type=="dommousescroll"){this.type="mousewheel"
}else{if(this.type=="domcontentloaded"){this.type="domready"
}}this.realType=this.type;
this.isTouch=false;
if(this.type.indexOf("touch")>-1){this._posEvent=e.changedTouches[0];
this.isTouch=true
}this.canceled=false;
this.element=e.target||e.srcElement;
this.srcElement=this.element;
this.currentElement=e.currentTarget;
this.relatedElement=null;
this.delegatedElement=null;
if(!jindo.$Jindo.isUndefined(e.relatedTarget)){this.relatedElement=e.relatedTarget
}else{if(e.fromElement&&e.toElement){this.relatedElement=e[(this.type=="mouseout")?"toElement":"fromElement"]
}}};
jindo._p_.customEvent={};
jindo._p_.customEventStore={};
jindo._p_.normalCustomEvent={};
jindo._p_.hasCustomEvent=function(sName){return !!(jindo._p_.getCustomEvent(sName)||jindo._p_.normalCustomEvent[sName])
};
jindo._p_.getCustomEvent=function(sName){return jindo._p_.customEvent[sName]
};
jindo._p_.addCustomEventListener=function(eEle,sElementId,sEvent,vFilter,oCustomInstance){if(!jindo._p_.customEventStore[sElementId]){jindo._p_.customEventStore[sElementId]={};
jindo._p_.customEventStore[sElementId].ele=eEle
}if(!jindo._p_.customEventStore[sElementId][sEvent]){jindo._p_.customEventStore[sElementId][sEvent]={}
}if(!jindo._p_.customEventStore[sElementId][sEvent][vFilter]){jindo._p_.customEventStore[sElementId][sEvent][vFilter]={custom:oCustomInstance}
}};
jindo._p_.setCustomEventListener=function(sElementId,sEvent,vFilter,aNative,aWrap){jindo._p_.customEventStore[sElementId][sEvent][vFilter].real_listener=aNative;
jindo._p_.customEventStore[sElementId][sEvent][vFilter].wrap_listener=aWrap
};
jindo._p_.getCustomEventListener=function(sElementId,sEvent,vFilter){var store=jindo._p_.customEventStore[sElementId];
if(store&&store[sEvent]&&store[sEvent][vFilter]){return store[sEvent][vFilter]
}return{}
};
jindo._p_.getNormalEventListener=function(sElementId,sEvent,vFilter){var store=jindo._p_.normalCustomEvent[sEvent];
if(store&&store[sElementId]&&store[sElementId][vFilter]){return store[sElementId][vFilter]
}return{}
};
jindo._p_.hasCustomEventListener=function(sElementId,sEvent,vFilter){var store=jindo._p_.customEventStore[sElementId];
if(store&&store[sEvent]&&store[sEvent][vFilter]){return true
}return false
};
jindo.$Event.customEvent=function(sName,oEvent){var oArgs=g_checkVarType(arguments,{s4str:["sName:String+"],s4obj:["sName:String+","oEvent:Hash+"]},"$Event.customEvent");
switch(oArgs+""){case"s4str":if(jindo._p_.hasCustomEvent(sName)){throw new jindo.$Error("The Custom Event Name have to unique.")
}else{jindo._p_.normalCustomEvent[sName]={}
}return this;
case"s4obj":if(jindo._p_.hasCustomEvent(sName)){throw new jindo.$Error("The Custom Event Name have to unique.")
}else{jindo._p_.normalCustomEvent[sName]={};
jindo._p_.customEvent[sName]=function(){this.name=sName;
this.real_listener=[];
this.wrap_listener=[]
};
var _proto=jindo._p_.customEvent[sName].prototype;
_proto.events=[];
for(var i in oEvent){_proto[i]=oEvent[i];
_proto.events.push(i)
}jindo._p_.customEvent[sName].prototype.fireEvent=function(oCustomEvent){for(var i=0,l=this.wrap_listener.length;
i<l;
i++){this.wrap_listener[i](oCustomEvent)
}}
}return this
}};
jindo.$Event.prototype.mouse=function(){var e=this._event;
var ele=this.element;
var delta=0;
var ret={};
if(e.wheelDelta){delta=e.wheelDelta/120
}else{if(e.detail){delta=-e.detail/3
}}ret={delta:delta};
this.mouse=function(){return ret
};
return ret
};
jindo.$Event.prototype.key=function(){var e=this._event;
var k=e.keyCode||e.charCode;
var ret={keyCode:k,alt:e.altKey,ctrl:e.ctrlKey,meta:e.metaKey,shift:e.shiftKey,up:(k==38),down:(k==40),left:(k==37),right:(k==39),enter:(k==13),esc:(k==27)};
this.key=function(){return ret
};
return ret
};
jindo.$Event.prototype.pos=function(bGetOffset){g_checkVarType(arguments,{voi:[],bol:["bGetOffset:Boolean"]});
var e=this._posEvent;
var doc=(this.element.ownerDocument||document);
var b=doc.body;
var de=doc.documentElement;
var pos=[b.scrollLeft||de.scrollLeft,b.scrollTop||de.scrollTop];
var ret={clientX:e.clientX,clientY:e.clientY,pageX:"pageX" in e?e.pageX:e.clientX+pos[0]-b.clientLeft,pageY:"pageY" in e?e.pageY:e.clientY+pos[1]-b.clientTop,layerX:"offsetX" in e?e.offsetX:e.layerX-1,layerY:"offsetY" in e?e.offsetY:e.layerY-1};
if(bGetOffset&&jindo.$Element){var offset=jindo.$Element(this.element).offset();
ret.offsetX=ret.pageX-offset.left;
ret.offsetY=ret.pageY-offset.top
}return ret
};
jindo.$Event.prototype.stop=function(nCancel){g_checkVarType(arguments,{voi:[],num:["nCancel:Numeric"]});
nCancel=nCancel||jindo.$Event.CANCEL_ALL;
var e=(window.event&&window.event==this._globalEvent)?this._globalEvent:this._event;
var b=!!(nCancel&jindo.$Event.CANCEL_BUBBLE);
var d=!!(nCancel&jindo.$Event.CANCEL_DEFAULT);
var type=this.realType;
if(b&&(type==="focusin"||type==="focusout")){jindo.$Jindo._warn("The "+type+" event can't stop bubble.")
}this.canceled=true;
if(d){if(e.preventDefault!==undefined){e.preventDefault()
}}if(b){if(e.stopPropagation!==undefined){e.stopPropagation()
}}return this
};
jindo.$Event.prototype.stopDefault=function(){return this.stop(jindo.$Event.CANCEL_DEFAULT)
};
jindo.$Event.prototype.stopBubble=function(){return this.stop(jindo.$Event.CANCEL_BUBBLE)
};
jindo.$Event.CANCEL_BUBBLE=1;
jindo.$Event.CANCEL_DEFAULT=2;
jindo.$Event.CANCEL_ALL=3;
jindo.$Event.prototype.$value=function(){return this._event
};
(function(aType){var sTouches="Touch";
for(var i=0,l=aType.length;
i<l;
i++){jindo.$Event.prototype[aType[i]+sTouches]=(function(sType){return function(nIndex){if(this.isTouch){var oRet=[];
var ev=this._event[sType+"es"];
var l=ev.length;
var e;
for(var i=0;
i<l;
i++){e=ev[i];
oRet.push({id:e.identifier,event:this,element:e.target,_posEvent:e,pos:jindo.$Event.prototype.pos})
}this[sType]=function(nIndex){var oArgs=g_checkVarType(arguments,{"void":[],"4num":["nIndex:Numeric"]},"$Event#"+sType);
if(oArgs+""=="void"){return oRet
}return oRet[nIndex]
}
}else{this[sType]=function(nIndex){throw new jindo.$Error(jindo.$Except.NOT_SUPPORT_METHOD,"$Event#"+sType)
}
}return this[sType].apply(this,jindo._p_._toArray(arguments))
}
})(aType[0]+sTouches)
}})(["changed","target"]);
jindo.$Element=function(el){var cl=arguments.callee;
if(el&&el instanceof cl){return el
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Element");
return new cl(el)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var cache=jindo.$Jindo;
var oArgs=cache.checkVarType(arguments,{"4str":["sID:String+"],"4nod":["oEle:Node"],"4doc":["oEle:Document+"],"4win":["oEle:Window+"]},"$Element");
switch(oArgs+""){case"4str":el=jindo.$(el);
break;
default:el=oArgs.oEle
}this._element=el;
if(this._element!=null){if(this._element.__jindo__id){this._key=this._element.__jindo__id
}else{this._element.__jindo__id=this._key=jindo._p_._makeRandom()
}this.tag=(this._element.tagName||"").toLowerCase()
}else{throw new TypeError("{not_found_element}")
}};
jindo._p_.NONE_GROUP="_jindo_event_none";
jindo._p_.splitEventSelector=function(sEvent){var matches=sEvent.match(/^([a-z_]*)(.*)/i);
var eventName=jindo._p_.trim(matches[1]);
var selector=jindo._p_.trim(matches[2].replace("@",""));
return{type:selector?"delegate":"normal",event:eventName,selector:selector}
};
jindo._p_._makeRandom=function(){return"e"+new Date().getTime()+parseInt(Math.random()*100000000,10)
};
jindo._p_.releaseEventHandlerForAllChildren=function(wel){var children=wel._element.all||wel._element.getElementsByTagName("*"),nChildLength=children.length,elChild=null,i;
for(i=0;
i<nChildLength;
i++){elChild=children[i];
if(elChild.nodeType==1&&elChild.__jindo__id){jindo.$Element.eventManager.cleanUpUsingKey(elChild.__jindo__id,true)
}}children=elChild=null
};
jindo._p_.canUseClassList=function(){jindo._p_.canUseClassList=function(){return"classList" in document.body&&"classList" in document.createElementNS("http://www.w3.org/2000/svg","g")
};
return jindo._p_.canUseClassList()
};
jindo._p_.vendorPrefixObj={"-moz":"Moz","-ms":"ms","-o":"O","-webkit":"webkit"};
jindo._p_.cssNameToJavaScriptName=function(sName){if(/^(\-(?:moz|ms|o|webkit))/.test(sName)){var vandorPerfix=RegExp.$1;
sName=sName.replace(vandorPerfix,jindo._p_.vendorPrefixObj[vandorPerfix])
}return sName.replace(/(:?-(\w))/g,function(_,_,m){return m.toUpperCase()
})
};
jindo._p_.getStyleIncludeVendorPrefix=function(_test){var styles=["Transition","Transform","Animation","Perspective"];
var vendors=["webkit","-","Moz","O","ms"];
var style="";
var vendor="";
var vendorStyle="";
var result={};
var styleObj=_test||document.body.style;
for(var i=0,l=styles.length;
i<l;
i++){style=styles[i];
for(var j=0,m=vendors.length;
j<m;
j++){vendor=vendors[j];
vendorStyle=vendor!="-"?(vendor+style):style.toLowerCase();
if(typeof styleObj[vendorStyle]!=="undefined"){result[style.toLowerCase()]=vendorStyle;
break
}result[style.toLowerCase()]=false
}}if(_test){return result
}jindo._p_.getStyleIncludeVendorPrefix=function(){return result
};
return jindo._p_.getStyleIncludeVendorPrefix()
};
jindo._p_.getTransformStringForValue=function(_test){var info=jindo._p_.getStyleIncludeVendorPrefix(_test);
var transform=info.transform;
if(info.transform==="MozTransform"){transform="-moz-transform"
}else{if(info.transform==="webkitTransform"){transform="-webkit-transform"
}else{if(info.transform==="OTransform"){transform="-o-transform"
}else{if(info.transform==="msTransform"){transform="-ms-transform"
}}}}if(_test){return transform
}jindo._p_.getTransformStringForValue=function(){return transform
};
return jindo._p_.getTransformStringForValue()
};
jindo._p_.setOpacity=function(ele,val){ele.offsetHeight;
ele.style.opacity=val
};
jindo.$Element._eventBind=function(oEle,sEvent,fAroundFunc,bUseCapture){oEle.addEventListener(sEvent,fAroundFunc,!!bUseCapture)
};
jindo.$Element._unEventBind=function(oEle,sType,fAroundFunc){oEle.removeEventListener(sType,fAroundFunc,false)
};
jindo.$Element.prototype.$value=function(){return this._element
};
jindo.$Element.prototype.visible=function(bVisible,sDisplay){var oArgs=g_checkVarType(arguments,{g:[],s4bln:[jindo.$Jindo._F("bVisible:Boolean")],s4str:["bVisible:Boolean","sDisplay:String+"]},"$Element#visible");
switch(oArgs+""){case"g":return(this._getCss(this._element,"display")!="none");
case"s4bln":this[bVisible?"show":"hide"]();
return this;
case"s4str":this[bVisible?"show":"hide"](sDisplay);
return this
}};
jindo.$Element.prototype.show=function(sDisplay){var oArgs=g_checkVarType(arguments,{"4voi":[],"4str":["sDisplay:String+"]},"$Element#show");
var s=this._element.style;
var b="block";
var c={p:b,div:b,form:b,h1:b,h2:b,h3:b,h4:b,ol:b,ul:b,fieldset:b,td:"table-cell",th:"table-cell",li:"list-item",table:"table",thead:"table-header-group",tbody:"table-row-group",tfoot:"table-footer-group",tr:"table-row",col:"table-column",colgroup:"table-column-group",caption:"table-caption",dl:b,dt:b,dd:b};
try{switch(oArgs+""){case"4voi":var type=c[this.tag];
s.display=type||"inline";
break;
case"4str":s.display=sDisplay
}}catch(e){s.display="block"
}return this
};
jindo.$Element.prototype.hide=function(){this._element.style.display="none";
return this
};
jindo.$Element.prototype.toggle=function(sDisplay){var oArgs=g_checkVarType(arguments,{"4voi":[],"4str":["sDisplay:String+"]},"$Element#toggle");
this[this._getCss(this._element,"display")=="none"?"show":"hide"].apply(this,arguments);
return this
};
jindo.$Element.prototype.opacity=function(value){var oArgs=g_checkVarType(arguments,{g:[],s:["nOpacity:Numeric"],str:["sOpacity:String"]},"$Element#opacity"),e=this._element,b=(this._getCss(e,"display")!="none"),v;
switch(oArgs+""){case"g":b=(this._getCss(e,"display")!="none");
(v=e.style.opacity).length||(v=this._getCss(e,"opacity"));
v=parseFloat(v);
if(isNaN(v)){v=b?1:0
}return v;
case"s":value=oArgs.nOpacity;
e.style.zoom=1;
value=Math.max(Math.min(value,1),0);
e.style.opacity=value;
return this;
case"str":if(value===""){e.style.zoom=e.style.opacity=""
}return this
}};
jindo._p_._revisionCSSAttr=function(name,vendorPrefix){var custumName=jindo.$Element.hook(name);
if(custumName){name=custumName
}else{name=jindo._p_.cssNameToJavaScriptName(name).replace(/^(animation|perspective|transform|transition)/i,function(_1){return vendorPrefix[_1.toLowerCase()]
})
}return name
};
jindo._p_.changeTransformValue=function(name,_test){return(name+"").replace(/([\s|-]*)(?:transform)/,function(_,m1){return jindo._p_.trim(m1).length>0?_:m1+jindo._p_.getTransformStringForValue(_test)
})
};
jindo.$Element.prototype.css=function(sName,sValue){var oArgs=g_checkVarType(arguments,{g:["sName:String+"],s4str:[jindo.$Jindo._F("sName:String+"),jindo.$Jindo._F("vValue:String+")],s4num:["sName:String+","vValue:Numeric"],s4obj:["oObj:Hash+"]},"$Element#css");
var e=this._element;
switch(oArgs+""){case"s4str":case"s4num":var obj={};
sName=jindo._p_._revisionCSSAttr(sName,jindo._p_.getStyleIncludeVendorPrefix());
obj[sName]=sValue;
sName=obj;
break;
case"s4obj":sName=oArgs.oObj;
var obj={};
var vendorPrefix=jindo._p_.getStyleIncludeVendorPrefix();
for(i in sName){if(sName.hasOwnProperty(i)){obj[jindo._p_._revisionCSSAttr(i,vendorPrefix)]=sName[i]
}}sName=obj;
break;
case"g":var vendorPrefix=jindo._p_.getStyleIncludeVendorPrefix();
sName=jindo._p_._revisionCSSAttr(sName,vendorPrefix);
var _getCss=this._getCss;
if(sName=="opacity"){return this.opacity()
}if(sName=="padding"||sName=="margin"){var top=_getCss(e,sName+"Top");
var right=_getCss(e,sName+"Right");
var bottom=_getCss(e,sName+"Bottom");
var left=_getCss(e,sName+"Left");
if((top==right)&&(bottom==left)){return top
}else{if(top==bottom){if(right==left){return top+" "+right
}else{return top+" "+right+" "+bottom+" "+left
}}else{return top+" "+right+" "+bottom+" "+left
}}}return _getCss(e,sName)
}var v,type;
for(var k in sName){if(sName.hasOwnProperty(k)){v=sName[k];
if(!(jindo.$Jindo.isString(v)||jindo.$Jindo.isNumeric(v))){continue
}if(k=="opacity"){this.opacity(v);
continue
}if(k=="backgroundPositionX"||k=="backgroundPositionY"){var bp=this.css("backgroundPosition").split(/\s+/);
v=k=="backgroundPositionX"?v+" "+bp[1]:bp[0]+" "+v;
this._setCss(e,"backgroundPosition",v)
}else{this._setCss(e,k,/transition/i.test(k)?jindo._p_.changeTransformValue(v):v)
}}}return this
};
jindo.$Element.prototype._getCss=function(e,sName){try{if(sName=="cssFloat"){sName="float"
}var d=e.ownerDocument||e.document||document;
var sVal=e.style[sName];
if(!e.style[sName]){var computedStyle=d.defaultView.getComputedStyle(e,null);
sName=sName.replace(/([A-Z])/g,"-$1").replace(/^(webkit|ms)/g,"-$1").toLowerCase();
sVal=computedStyle.getPropertyValue(sName);
sVal=sVal===undefined?computedStyle[sName]:sVal
}if(sName=="textDecoration"){sVal=sVal.replace(",","")
}return sVal
}catch(ex){throw new jindo.$Error((e.tagName||"document")+jindo.$Except.NOT_USE_CSS,"$Element#css")
}};
jindo.$Element.prototype._setCss=function(e,k,v){if(("#top#left#right#bottom#").indexOf(k+"#")>0&&(typeof v=="number"||(/\d$/.test(v)))){e.style[k]=parseInt(v,10)+"px"
}else{e.style[k]=v
}};
jindo.$Element.prototype.attr=function(sName,sValue){var oArgs=g_checkVarType(arguments,{g:["sName:String+"],s4str:["sName:String+","vValue:String+"],s4num:["sName:String+","vValue:Numeric"],s4nul:["sName:String+","vValue:Null"],s4bln:["sName:String+","vValue:Boolean"],s4arr:["sName:String+","vValue:Array+"],s4obj:[jindo.$Jindo._F("oObj:Hash+")]},"$Element#attr");
var e=this._element,aValue=null,i,length,nIndex,fGetIndex,elOption,wa;
switch(oArgs+""){case"s4str":case"s4nul":case"s4num":case"s4bln":case"s4arr":var obj={};
obj[sName]=sValue;
sName=obj;
break;
case"s4obj":sName=oArgs.oObj;
break;
case"g":if(sName=="class"||sName=="className"){return e.className
}else{if(sName=="style"){return e.style.cssText
}else{if(sName=="checked"||sName=="disabled"){return !!e[sName]
}else{if(sName=="value"){if(this.tag=="button"){return e.getAttributeNode("value").value
}else{if(this.tag=="select"){if(e.multiple){for(i=0,length=e.options.length;
i<length;
i++){elOption=e.options[i];
if(elOption.selected){if(!aValue){aValue=[]
}sValue=elOption.value;
if(sValue==""){sValue=elOption.text
}aValue.push(sValue)
}}return aValue
}else{if(e.selectedIndex<0){return null
}sValue=e.options[e.selectedIndex].value;
return(sValue=="")?e.options[e.selectedIndex].text:sValue
}}else{return e.value
}}}else{if(sName=="href"){return e.getAttribute(sName,2)
}}}}}return e.getAttribute(sName)
}fGetIndex=function(oOPtions,vValue){var nIndex=-1,i,length,elOption;
for(i=0,length=oOPtions.length;
i<length;
i++){elOption=oOPtions[i];
if(elOption.value===vValue||elOption.text===vValue){nIndex=i;
break
}}return nIndex
};
for(var k in sName){if(sName.hasOwnProperty(k)){var v=sName[k];
if(jindo.$Jindo.isNull(v)){if(this.tag=="select"){if(e.multiple){for(i=0,length=e.options.length;
i<length;
i++){e.options[i].selected=false
}}else{e.selectedIndex=-1
}}else{e.removeAttribute(k)
}}else{if(k=="class"||k=="className"){e.className=v
}else{if(k=="style"){e.style.cssText=v
}else{if(k=="checked"||k=="disabled"){e[k]=v
}else{if(k=="value"){if(this.tag=="select"){if(e.multiple){if(jindo.$Jindo.isArray(v)){wa=jindo.$A(v);
for(i=0,length=e.options.length;
i<length;
i++){elOption=e.options[i];
elOption.selected=wa.has(elOption.value)||wa.has(elOption.text)
}}else{e.selectedIndex=fGetIndex(e.options,v)
}}else{e.selectedIndex=fGetIndex(e.options,v)
}}else{e.value=v
}}else{e.setAttribute(k,v)
}}}}}}}return this
};
jindo.$Element.prototype.width=function(width){var oArgs=g_checkVarType(arguments,{g:[],s:["nWidth:Numeric"]},"$Element#width");
switch(oArgs+""){case"g":return this._element.offsetWidth;
case"s":width=oArgs.nWidth;
var e=this._element;
e.style.width=width+"px";
var off=e.offsetWidth;
if(off!=width&&off!==0){var w=(width*2-off);
if(w>0){e.style.width=w+"px"
}}return this
}};
jindo.$Element.prototype.height=function(height){var oArgs=g_checkVarType(arguments,{g:[],s:["nHeight:Numeric"]},"$Element#height");
switch(oArgs+""){case"g":return this._element.offsetHeight;
case"s":height=oArgs.nHeight;
var e=this._element;
e.style.height=height+"px";
var off=e.offsetHeight;
if(off!=height&&off!==0){var height=(height*2-off);
if(height>0){e.style.height=height+"px"
}}return this
}};
jindo.$Element.prototype.className=function(sClass){var oArgs=g_checkVarType(arguments,{g:[],s:[jindo.$Jindo._F("sClass:String+")]},"$Element#className");
var e=this._element;
switch(oArgs+""){case"g":return e.className;
case"s":e.className=sClass;
return this
}};
jindo.$Element.prototype.hasClass=function(sClass){var ___checkVarType=g_checkVarType;
if(jindo._p_.canUseClassList()){jindo.$Element.prototype.hasClass=function(sClass){var oArgs=___checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#hasClass");
return this._element.classList.contains(sClass)
}
}else{jindo.$Element.prototype.hasClass=function(sClass){var oArgs=___checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#hasClass");
return(" "+this._element.className+" ").indexOf(" "+sClass+" ")>-1
}
}return this.hasClass.apply(this,arguments)
};
jindo.$Element.prototype.addClass=function(sClass){if(this._element.classList){jindo.$Element.prototype.addClass=function(sClass){if(this._element==null){return this
}var oArgs=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#addClass");
var aClass=(sClass+"").split(/\s+/);
var flistApi=this._element.classList;
for(var i=aClass.length;
i--;
){aClass[i]!=""&&flistApi.add(aClass[i])
}return this
}
}else{jindo.$Element.prototype.addClass=function(sClass){var oArgs=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#addClass");
var e=this._element;
var sClassName=e.className;
var aClass=(sClass+"").split(" ");
var sEachClass;
for(var i=aClass.length-1;
i>=0;
i--){sEachClass=aClass[i];
if((" "+sClassName+" ").indexOf(" "+sEachClass+" ")==-1){sClassName=sClassName+" "+sEachClass
}}e.className=sClassName.replace(/\s+$/,"").replace(/^\s+/,"");
return this
}
}return this.addClass.apply(this,arguments)
};
jindo.$Element.prototype.removeClass=function(sClass){if(this._element.classList){jindo.$Element.prototype.removeClass=function(sClass){var oArgs=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#removeClass");
if(this._element==null){return this
}var flistApi=this._element.classList;
var aClass=(sClass+"").split(" ");
for(var i=aClass.length;
i--;
){aClass[i]!=""&&flistApi.remove(aClass[i])
}return this
}
}else{jindo.$Element.prototype.removeClass=function(sClass){var oArgs=g_checkVarType(arguments,{"4str":["sClass:String+"]},"$Element#removeClass");
var e=this._element;
var sClassName=e.className;
var aClass=(sClass+"").split(" ");
var sEachClass;
for(var i=aClass.length-1;
i>=0;
i--){if(/\W/g.test(aClass[i])){aClass[i]=aClass[i].replace(/(\W)/g,"\\$1")
}sClassName=(" "+sClassName+" ").replace(new RegExp("\\s+"+aClass[i]+"(?=\\s+)","g")," ")
}e.className=sClassName.replace(/\s+$/,"").replace(/^\s+/,"");
return this
}
}return this.removeClass.apply(this,arguments)
};
jindo.$Element.prototype.toggleClass=function(sClass,sClass2){var ___checkVarType=g_checkVarType;
if(jindo._p_.canUseClassList()){jindo.$Element.prototype.toggleClass=function(sClass,sClass2){var oArgs=___checkVarType(arguments,{"4str":["sClass:String+"],"4str2":["sClass:String+","sClass2:String+"]},"$Element#toggleClass");
switch(oArgs+""){case"4str":this._element.classList.toggle(sClass+"");
break;
case"4str2":sClass=sClass+"";
sClass2=sClass2+"";
if(this.hasClass(sClass)){this.removeClass(sClass);
this.addClass(sClass2)
}else{this.addClass(sClass);
this.removeClass(sClass2)
}}return this
}
}else{jindo.$Element.prototype.toggleClass=function(sClass,sClass2){var oArgs=___checkVarType(arguments,{"4str":["sClass:String+"],"4str2":["sClass:String+","sClass2:String+"]},"$Element#toggleClass");
sClass2=sClass2||"";
if(this.hasClass(sClass)){this.removeClass(sClass);
if(sClass2){this.addClass(sClass2)
}}else{this.addClass(sClass);
if(sClass2){this.removeClass(sClass2)
}}return this
}
}return this.toggleClass.apply(this,arguments)
};
jindo.$Element.prototype.cssClass=function(vClass,bCondition){var oArgs=g_checkVarType(arguments,{g:["sClass:String+"],s4bln:["sClass:String+","bCondition:Boolean"],s4obj:["oObj:Hash+"]},"$Element#cssClass");
switch(oArgs+""){case"g":return this.hasClass(oArgs.sClass);
case"s4bln":if(oArgs.bCondition){this.addClass(oArgs.sClass)
}else{this.removeClass(oArgs.sClass)
}return this;
case"s4obj":var e=this._element;
vClass=oArgs.oObj;
var sClassName=e.className;
for(var sEachClass in vClass){if(vClass.hasOwnProperty(sEachClass)){if(vClass[sEachClass]){if((" "+sClassName+" ").indexOf(" "+sEachClass+" ")==-1){sClassName=(sClassName+" "+sEachClass).replace(/^\s+/,"")
}}else{if((" "+sClassName+" ").indexOf(" "+sEachClass+" ")>-1){sClassName=(" "+sClassName+" ").replace(" "+sEachClass+" "," ").replace(/\s+$/,"").replace(/^\s+/,"")
}}}}e.className=sClassName;
return this
}};
jindo.$Element.prototype.text=function(sText){var oArgs=g_checkVarType(arguments,{g:[],s4str:["sText:String+"],s4num:[jindo.$Jindo._F("sText:Numeric")],s4bln:["sText:Boolean"]},"$Element#text"),ele=this._element,tag=this.tag,prop,oDoc;
switch(oArgs+""){case"g":prop=(ele.textContent!==undefined)?"textContent":"innerText";
if(tag=="textarea"||tag=="input"){prop="value"
}return ele[prop];
case"s4str":case"s4num":case"s4bln":try{if(tag=="textarea"||tag=="input"){ele.value=sText+""
}else{var oDoc=ele.ownerDocument||ele.document||document;
this.empty();
ele.appendChild(oDoc.createTextNode(sText))
}}catch(e){return ele.innerHTML=(sText+"").replace(/&/g,"&amp;").replace(/</g,"&lt;")
}return this
}};
jindo.$Element.prototype.html=function(sHTML){var oArgs=g_checkVarType(arguments,{g:[],s4str:[jindo.$Jindo._F("sText:String+")],s4num:["sText:Numeric"],s4bln:["sText:Boolean"]},"$Element#html");
switch(oArgs+""){case"g":return this._element.innerHTML;
case"s4str":case"s4num":case"s4bln":sHTML+="";
var oEl=this._element,_oEl;
if(this._element.tagName.toLowerCase()=="table"&&!sHTML.match(/<tbody[^>]*>/i)&&sHTML.match(/<(thead|tfoot|caption|colgroup|col|th|tr|td)[^>]*>(?:.*?)(<\/\1>)?/i)){var oDoc=oEl.ownerDocument||oEl.document||document;
oDoc.createDocumentFragment().appendChild(_oEl=oEl.cloneNode(1));
_oEl.innerHTML=sHTML;
if(!_oEl.getElementsByTagName("tbody").length){sHTML=_oEl.innerHTML=["<tbody>","</tbody>"].join(_oEl.innerHTML)
}oDoc=null
}oEl.innerHTML=sHTML;
return this
}};
jindo.$Element.prototype.outerHTML=function(){var e=this._element;
e=jindo.$Jindo.isDocument(e)?e.documentElement:e;
if(e.outerHTML!==undefined){return e.outerHTML
}var oDoc=e.ownerDocument||e.document||document;
var div=oDoc.createElement("div");
var par=e.parentNode;
if(!par){return e.innerHTML
}par.insertBefore(div,e);
div.style.display="none";
div.appendChild(e);
var s=div.innerHTML;
par.insertBefore(e,div);
par.removeChild(div);
return s
};
jindo.$Element.prototype.toString=function(){return this.outerHTML()||"[object $Element]"
};
jindo.$Element.prototype.attach=function(sEvent,fpCallback){var oArgs=g_checkVarType(arguments,{"4str":["sEvent:String+","fpCallback:Function+"],"4obj":["hListener:Hash+"]},"$Element#attach");
var oSpilt,hListener;
switch(oArgs+""){case"4str":oSpilt=jindo._p_.splitEventSelector(oArgs.sEvent);
this._add(oSpilt.type,oSpilt.event,oSpilt.selector,fpCallback);
break;
case"4obj":hListener=oArgs.hListener;
for(var i in hListener){this.attach(i,hListener[i])
}break
}return this
};
jindo.$Element.prototype.detach=function(sEvent,fpCallback){var oArgs=g_checkVarType(arguments,{"4str":["sEvent:String+","fpCallback:Function+"],"4obj":["hListener:Hash+"]},"$Element#detach");
var oSpilt,hListener;
switch(oArgs+""){case"4str":oSpilt=jindo._p_.splitEventSelector(oArgs.sEvent);
this._del(oSpilt.type,oSpilt.event,oSpilt.selector,fpCallback);
break;
case"4obj":hListener=oArgs.hListener;
for(var i in hListener){this.detach(i,hListener[i])
}break
}return this
};
jindo.$Element.prototype.delegate=function(sEvent,vFilter,fpCallback){var oArgs=g_checkVarType(arguments,{"4str":["sEvent:String+","vFilter:String+","fpCallback:Function+"],"4fun":["sEvent:String+","vFilter:Function+","fpCallback:Function+"]},"$Element#delegate");
return this._add("delegate",sEvent,vFilter,fpCallback)
};
jindo.$Element.prototype.undelegate=function(sEvent,vFilter,fpCallback){var oArgs=g_checkVarType(arguments,{"4str":["sEvent:String+","vFilter:String+","fpCallback:Function+"],"4fun":["sEvent:String+","vFilter:Function+","fpCallback:Function+"],group_for_string:["sEvent:String+","vFilter:String+"],group_for_function:["sEvent:String+","vFilter:Function+"]},"$Element#undelegate");
return this._del("delegate",sEvent,vFilter,fpCallback)
};
jindo._p_.customEventAttach=function(sType,sEvent,vFilter,fpCallback,fpCallbackBind,eEle,fpAdd){if(!jindo._p_.hasCustomEventListener(eEle.__jindo__id,sEvent,vFilter)){var CustomEvent=jindo._p_.getCustomEvent(sEvent);
var customInstance=new CustomEvent();
var events=customInstance.events;
customInstance.real_listener.push(fpCallback);
customInstance.wrap_listener.push(fpCallbackBind);
for(var i=0,l=events.length;
i<l;
i++){customInstance["_fp"+events[i]]=jindo.$Fn(customInstance[events[i]],customInstance).bind();
fpAdd(sType,events[i],vFilter,customInstance["_fp"+events[i]])
}jindo._p_.addCustomEventListener(eEle,eEle.__jindo__id,sEvent,vFilter,customInstance)
}else{var customInstance=jindo._p_.getCustomEventListener(eEle.__jindo__id,sEvent,vFilter).custom;
if(customInstance.real_listener){customInstance.real_listener.push(fpCallback);
customInstance.wrap_listener.push(fpCallbackBind)
}}};
jindo._p_.normalCustomEventAttach=function(ele,sEvent,jindo_id,vFilter,fpCallback,fpCallbackBind){if(!jindo._p_.normalCustomEvent[sEvent][jindo_id]){jindo._p_.normalCustomEvent[sEvent][jindo_id]={};
jindo._p_.normalCustomEvent[sEvent][jindo_id].ele=ele;
jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter]={};
jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter].real_listener=[];
jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter].wrap_listener=[]
}jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter].real_listener.push(fpCallback);
jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter].wrap_listener.push(fpCallbackBind)
};
jindo.$Element.prototype._add=function(sType,sEvent,vFilter,fpCallback){var oManager=jindo.$Element.eventManager;
var realEvent=sEvent;
sEvent=sEvent.toLowerCase();
var oEvent=oManager.splitGroup(sEvent);
sEvent=oEvent.event;
var sGroup=oEvent.group;
var ele=this._element;
var jindo_id=ele.__jindo__id;
var oDoc=ele.ownerDocument||ele.document||document;
if(jindo._p_.hasCustomEvent(sEvent)){vFilter=vFilter||"_NONE_";
var fpCallbackBind=jindo.$Fn(fpCallback,this).bind();
jindo._p_.normalCustomEventAttach(ele,sEvent,jindo_id,vFilter,fpCallback,fpCallbackBind);
if(jindo._p_.getCustomEvent(sEvent)){jindo._p_.customEventAttach(sType,sEvent,vFilter,fpCallback,fpCallbackBind,ele,jindo.$Fn(this._add,this).bind())
}}else{if(sEvent=="domready"&&jindo.$Jindo.isWindow(ele)){jindo.$Element(oDoc).attach(sEvent,fpCallback);
return this
}if(sEvent=="load"&&ele===oDoc){jindo.$Element(window).attach(sEvent,fpCallback);
return this
}sEvent=oManager.revisionEvent(sType,sEvent,realEvent);
fpCallback=oManager.revisionCallback(sType,sEvent,realEvent,fpCallback);
if(!oManager.isInit(this._key)){oManager.init(this._key,ele)
}if(!oManager.hasEvent(this._key,sEvent,realEvent)){oManager.initEvent(this,sEvent,realEvent,sGroup)
}if(!oManager.hasGroup(this._key,sEvent,sGroup)){oManager.initGroup(this._key,sEvent,sGroup)
}oManager.addEventListener(this._key,sEvent,sGroup,sType,vFilter,fpCallback)
}return this
};
jindo._p_.customEventDetach=function(sType,sEvent,vFilter,fpCallback,eEle,fpDel){var customObj=jindo._p_.getCustomEventListener(eEle.__jindo__id,sEvent,vFilter);
var customInstance=customObj.custom;
var events=customInstance.events;
for(var i=0,l=events.length;
i<l;
i++){fpDel(sType,events[i],vFilter,customInstance["_fp"+events[i]])
}};
jindo.$Element.prototype._del=function(sType,sEvent,vFilter,fpCallback){var oManager=jindo.$Element.eventManager;
var realEvent=sEvent;
sEvent=sEvent.toLowerCase();
var oEvent=oManager.splitGroup(sEvent);
sEvent=oEvent.event;
var sGroup=oEvent.group;
var oDoc=this._element.ownerDocument||this._element.document||document;
if(jindo._p_.hasCustomEvent(sEvent)){var jindo_id=this._element.__jindo__id;
vFilter=vFilter||"_NONE_";
var oNormal=jindo._p_.getNormalEventListener(jindo_id,sEvent,vFilter);
var aWrap=oNormal.wrap_listener;
var aReal=oNormal.real_listener;
var aNewWrap=[];
var aNewReal=[];
for(var i=0,l=aReal.length;
i<l;
i++){if(aReal[i]!=fpCallback){aNewWrap.push(aWrap[i]);
aNewReal.push(aReal[i])
}}if(aNewReal.length==0){var oNormalJindo=jindo._p_.normalCustomEvent[sEvent][jindo_id];
var count=0;
for(var i in oNormalJindo){if(i!=="ele"){count++;
break
}}if(count===0){delete jindo._p_.normalCustomEvent[sEvent][jindo_id]
}else{delete jindo._p_.normalCustomEvent[sEvent][jindo_id][vFilter]
}}if(jindo._p_.customEvent[sEvent]){jindo._p_.setCustomEventListener(jindo_id,sEvent,vFilter,aNewReal,aNewWrap);
if(aNewReal.length==0){jindo._p_.customEventDetach(sType,sEvent,vFilter,fpCallback,this._element,jindo.$Fn(this._del,this).bind());
delete jindo._p_.customEventStore[jindo_id][sEvent][vFilter]
}}}else{if(sEvent=="domready"&&jindo.$Jindo.isWindow(this._element)){jindo.$Element(oDoc).detach(sEvent,fpCallback);
return this
}if(sEvent=="load"&&this._element===oDoc){jindo.$Element(window).detach(sEvent,fpCallback);
return this
}sEvent=oManager.revisionEvent(sType,sEvent,realEvent);
if(sGroup===jindo._p_.NONE_GROUP&&!jindo.$Jindo.isFunction(fpCallback)&&!vFilter){throw new jindo.$Error(jindo.$Except.HAS_FUNCTION_FOR_GROUP,"$Element#"+(sType=="normal"?"detach":"delegate"))
}oManager.removeEventListener(this._key,sEvent,sGroup,sType,vFilter,fpCallback)
}return this
};
jindo._p_.mouseTouchPointerEvent=function(sEvent){var eventMap={};
if(window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0){eventMap={mousedown:"MSPointerDown",mouseup:"MSPointerUp",mousemove:"MSPointerMove",mouseover:"MSPointerOver",mouseout:"MSPointerOut",touchstart:"MSPointerDown",touchend:"MSPointerUp",touchmove:"MSPointerMove",pointerdown:"MSPointerDown",pointerup:"MSPointerUp",pointermove:"MSPointerMove",pointerover:"MSPointerOver",pointerout:"MSPointerOut",pointercancel:"MSPointerCancel"}
}else{if(jindo._p_._JINDO_IS_MO){eventMap={mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove",pointerdown:"touchstart",pointerup:"touchend",pointermove:"touchmove"}
}}jindo._p_.mouseTouchPointerEvent=function(sEvent){return eventMap[sEvent]?eventMap[sEvent]:sEvent
};
return jindo._p_.mouseTouchPointerEvent(sEvent)
};
jindo.$Element.eventManager=(function(){var eventStore={};
function bind(fpFunc,oScope,aPram){return function(){var args=jindo._p_._toArray(arguments);
if(aPram.length){args=aPram.concat(args)
}return fpFunc.apply(oScope,args)
}
}var touch={mousedown:"mousedown",mousemove:"mousemove",mouseup:"mouseup"};
return{revisionCallback:function(sType,sEvent,realEvent,fpCallback){if(realEvent=="mouseenter"||realEvent=="mouseleave"){var fpWrapCallback=jindo.$Element.eventManager._fireWhenElementBoundary(sType,fpCallback);
fpWrapCallback._origin_=fpCallback;
fpCallback=fpWrapCallback
}return fpCallback
},_fireWhenElementBoundary:function(sType,fpCallback){return function(oEvent){var woRelatedElement=oEvent.relatedElement?jindo.$Element(oEvent.relatedElement):null;
var eElement=oEvent.currentElement;
if(sType=="delegate"){eElement=oEvent.element
}if(woRelatedElement&&(woRelatedElement.isEqual(eElement)||woRelatedElement.isChildOf(eElement))){return
}fpCallback(oEvent)
}
},revisionEvent:function(sType,sEvent,realEvent){if(/^ms/i.test(realEvent)){return realEvent
}var customEvent=jindo.$Event.hook(sEvent);
if(customEvent){if(jindo.$Jindo.isFunction(customEvent)){return jindo._p_.customEvent()
}else{return customEvent
}}sEvent=sEvent.toLowerCase();
if(sEvent=="domready"||sEvent=="domcontentloaded"){sEvent="DOMContentLoaded"
}else{if(sEvent=="mousewheel"&&!jindo._p_._JINDO_IS_WK&&!jindo._p_._JINDO_IS_OP){sEvent="DOMMouseScroll"
}else{if(sEvent=="mouseenter"){sEvent="mouseover"
}else{if(sEvent=="mouseleave"){sEvent="mouseout"
}else{if(sEvent=="transitionend"||sEvent=="transitionstart"){var sPostfix=sEvent.replace("transition","");
var info=jindo._p_.getStyleIncludeVendorPrefix();
if(info.transition!="transition"){sPostfix=sPostfix.substr(0,1).toUpperCase()+sPostfix.substr(1)
}sEvent=info.transition+sPostfix
}else{if(sEvent=="animationstart"||sEvent=="animationend"||sEvent=="animationiteration"){var sPostfix=sEvent.replace("animation","");
var info=jindo._p_.getStyleIncludeVendorPrefix();
if(info.animation!="animation"){sPostfix=sPostfix.substr(0,1).toUpperCase()+sPostfix.substr(1)
}sEvent=info.animation+sPostfix
}else{if(sEvent==="focusin"||sEvent==="focusout"){sEvent=sEvent==="focusin"?"focus":"blur"
}}}}}}}return jindo._p_.mouseTouchPointerEvent(sEvent)
},test:function(){return eventStore
},isInit:function(sKey){return !!eventStore[sKey]
},init:function(sKey,eEle){eventStore[sKey]={ele:eEle,event:{}}
},getEventConfig:function(sKey){return eventStore[sKey]
},hasEvent:function(sKey,sEvent,realEvent){try{return !!eventStore[sKey]["event"][sEvent]
}catch(e){return false
}},hasGroup:function(sKey,sEvent,sGroup){return !!eventStore[sKey]["event"][sEvent]["type"][sGroup]
},createEvent:function(wEvent,realEvent,element,delegatedElement){if(wEvent.currentTarget===undefined){wEvent.currentTarget=element
}var weEvent=jindo.$Event(wEvent);
if(!weEvent.currentElement){weEvent.currentElement=element
}weEvent.realType=realEvent;
weEvent.delegatedElement=delegatedElement;
return weEvent
},initEvent:function(oThis,sEvent,realEvent,sGroup){var sKey=oThis._key;
var oEvent=eventStore[sKey]["event"];
var that=this;
var fAroundFunc=bind(function(sEvent,realEvent,scope,wEvent){wEvent=wEvent||window.event;
var oEle=wEvent.target||wEvent.srcElement;
var oManager=jindo.$Element.eventManager;
var oConfig=oManager.getEventConfig((wEvent.currentTarget||this._element).__jindo__id);
var oType=oConfig.event[sEvent].type;
for(var i in oType){if(oType.hasOwnProperty(i)){var aNormal=oType[i].normal;
for(var j=0,l=aNormal.length;
j<l;
j++){aNormal[j].call(this,scope.createEvent(wEvent,realEvent,this._element,null))
}var oDelegate=oType[i].delegate;
var aResultFilter;
var afpFilterCallback;
for(var k in oDelegate){if(oDelegate.hasOwnProperty(k)){aResultFilter=oDelegate[k].checker(oEle);
if(aResultFilter[0]){afpFilterCallback=oDelegate[k].callback;
var weEvent;
for(var m=0,leng=afpFilterCallback.length;
m<leng;
m++){weEvent=scope.createEvent(wEvent,realEvent,this._element,aResultFilter[1]);
weEvent.element=aResultFilter[1];
afpFilterCallback[m].call(this,weEvent)
}}}}}}},oThis,[sEvent,realEvent,this]);
oEvent[sEvent]={listener:fAroundFunc,type:{}};
jindo.$Element._eventBind(oThis._element,sEvent,fAroundFunc,(realEvent==="focusin"||realEvent==="focusout"))
},initGroup:function(sKey,sEvent,sGroup){var oType=eventStore[sKey]["event"][sEvent]["type"];
oType[sGroup]={normal:[],delegate:{}}
},addEventListener:function(sKey,sEvent,sGroup,sType,vFilter,fpCallback){var oEventInfo=eventStore[sKey]["event"][sEvent]["type"][sGroup];
if(sType==="normal"){oEventInfo.normal.push(fpCallback)
}else{if(sType==="delegate"){if(!this.hasDelegate(oEventInfo,vFilter)){this.initDelegate(eventStore[sKey].ele,oEventInfo,vFilter)
}this.addDelegate(oEventInfo,vFilter,fpCallback)
}}},hasDelegate:function(oEventInfo,vFilter){return !!oEventInfo.delegate[vFilter]
},containsElement:function(eOwnEle,eTarget,sCssquery,bContainOwn){if(eOwnEle==eTarget&&bContainOwn){return jindo.$$.test(eTarget,sCssquery)
}var aSelectElement=jindo.$$(sCssquery,eOwnEle);
for(var i=0,l=aSelectElement.length;
i<l;
i++){if(aSelectElement[i]==eTarget){return true
}}return false
},initDelegate:function(eOwnEle,oEventInfo,vFilter){var fpCheck;
if(jindo.$Jindo.isString(vFilter)){fpCheck=bind(function(eOwnEle,sCssquery,oEle){var eIncludeEle=oEle;
var isIncludeEle=this.containsElement(eOwnEle,oEle,sCssquery,true);
if(!isIncludeEle){var aPropagationElements=this._getParent(eOwnEle,oEle);
for(var i=0,leng=aPropagationElements.length;
i<leng;
i++){eIncludeEle=aPropagationElements[i];
if(this.containsElement(eOwnEle,eIncludeEle,sCssquery)){isIncludeEle=true;
break
}}}return[isIncludeEle,eIncludeEle]
},this,[eOwnEle,vFilter])
}else{fpCheck=bind(function(eOwnEle,fpFilter,oEle){var eIncludeEle=oEle;
var isIncludeEle=fpFilter(eOwnEle,oEle);
if(!isIncludeEle){var aPropagationElements=this._getParent(eOwnEle,oEle);
for(var i=0,leng=aPropagationElements.length;
i<leng;
i++){eIncludeEle=aPropagationElements[i];
if(fpFilter(eOwnEle,eIncludeEle)){isIncludeEle=true;
break
}}}return[isIncludeEle,eIncludeEle]
},this,[eOwnEle,vFilter])
}oEventInfo.delegate[vFilter]={checker:fpCheck,callback:[]}
},addDelegate:function(oEventInfo,vFilter,fpCallback){oEventInfo.delegate[vFilter].callback.push(fpCallback)
},removeEventListener:function(sKey,sEvent,sGroup,sType,vFilter,fpCallback){var oEventInfo;
try{oEventInfo=eventStore[sKey]["event"][sEvent]["type"][sGroup]
}catch(e){return
}var aNewCallback=[];
var aOldCallback;
if(sType==="normal"){aOldCallback=oEventInfo.normal
}else{aOldCallback=oEventInfo.delegate[vFilter].callback
}if(sEvent==jindo._p_.NONE_GROUP||jindo.$Jindo.isFunction(fpCallback)){for(var i=0,l=aOldCallback.length;
i<l;
i++){if((aOldCallback[i]._origin_||aOldCallback[i])!=fpCallback){aNewCallback.push(aOldCallback[i])
}}}if(sType==="normal"){delete oEventInfo.normal;
oEventInfo.normal=aNewCallback
}else{if(sType==="delegate"){delete oEventInfo.delegate[vFilter].callback;
oEventInfo.delegate[vFilter].callback=aNewCallback
}}this.cleanUp(sKey,sEvent)
},cleanUpAll:function(){var oEvent;
for(var sKey in eventStore){if(eventStore.hasOwnProperty(sKey)){this.cleanUpUsingKey(sKey,true)
}}},cleanUpUsingKey:function(sKey,bForce){var oEvent;
if(!eventStore[sKey]||!eventStore[sKey].event){return
}oEvent=eventStore[sKey].event;
for(var sEvent in oEvent){if(oEvent.hasOwnProperty(sEvent)){this.cleanUp(sKey,sEvent,bForce)
}}},cleanUp:function(sKey,sEvent,bForce){var oTypeInfo;
try{oTypeInfo=eventStore[sKey]["event"][sEvent]["type"]
}catch(e){return
}var oEventInfo;
var bHasEvent=false;
if(!bForce){for(var i in oTypeInfo){if(oTypeInfo.hasOwnProperty(i)){oEventInfo=oTypeInfo[i];
if(oEventInfo.normal.length){bHasEvent=true;
break
}var oDele=oEventInfo.delegate;
for(var j in oDele){if(oDele.hasOwnProperty(j)){if(oDele[j].callback.length){bHasEvent=true;
break
}}}if(bHasEvent){break
}}}}if(!bHasEvent){jindo.$Element._unEventBind(eventStore[sKey].ele,sEvent,eventStore[sKey]["event"][sEvent]["listener"]);
delete eventStore[sKey]["event"][sEvent];
var bAllDetach=true;
var oEvent=eventStore[sKey]["event"];
for(var k in oEvent){if(oEvent.hasOwnProperty(k)){bAllDetach=false;
break
}}if(bAllDetach){delete eventStore[sKey]
}}},splitGroup:function(sEvent){var aMatch=/\s*(.+?)\s*\(\s*(.*?)\s*\)/.exec(sEvent);
if(aMatch){return{event:aMatch[1].toLowerCase(),group:aMatch[2].toLowerCase()}
}else{return{event:sEvent.toLowerCase(),group:jindo._p_.NONE_GROUP}
}},_getParent:function(oOwnEle,oEle){var e=oOwnEle;
var a=[],p=null;
var oDoc=oEle.ownerDocument||oEle.document||document;
while(oEle.parentNode&&p!=e){p=oEle.parentNode;
if(p==oDoc.documentElement){break
}a[a.length]=p;
oEle=p
}return a
}}
})();
jindo.$Element.prototype.appear=function(duration,callback){var oArgs=g_checkVarType(arguments,{"4voi":[],"4num":["nDuration:Numeric"],"4fun":["nDuration:Numeric","fpCallback:Function+"]},"$Element#appear");
switch(oArgs+""){case"4voi":duration=0.3;
callback=function(){};
break;
case"4num":duration=oArgs.nDuration;
callback=function(){};
break;
case"4fun":duration=oArgs.nDuration;
callback=oArgs.fpCallback
}var self=this;
if(this.visible()){setTimeout(function(){callback.call(self,self)
},16);
return this
}var ele=this._element;
var oTransition=jindo._p_.getStyleIncludeVendorPrefix();
var name=oTransition.transition;
var endName;
if(name=="transition"){endName="end"
}else{endName="End"
}var bindFunc=function(){self.show();
ele.style[name+"Property"]="";
ele.style[name+"Duration"]="";
ele.style[name+"TimingFunction"]="";
ele.style.opacity="";
callback.call(self,self);
ele.removeEventListener(name+endName,arguments.callee,false)
};
if(!this.visible()){ele.style.opacity=ele.style.opacity||0;
self.show()
}ele.addEventListener(name+endName,bindFunc,false);
ele.style[name+"Property"]="opacity";
ele.style[name+"Duration"]=duration+"s";
ele.style[name+"TimingFunction"]="linear";
jindo._p_.setOpacity(ele,"1");
return this
};
jindo.$Element.prototype.disappear=function(duration,callback){var oArgs=g_checkVarType(arguments,{"4voi":[],"4num":["nDuration:Numeric"],"4fun":["nDuration:Numeric","fpCallback:Function+"]},"$Element#disappear");
switch(oArgs+""){case"4voi":duration=0.3;
callback=function(){};
break;
case"4num":duration=oArgs.nDuration;
callback=function(){};
break;
case"4fun":duration=oArgs.nDuration;
callback=oArgs.fpCallback
}var self=this;
if(!this.visible()){setTimeout(function(){callback.call(self,self)
},16);
return this
}var ele=this._element;
var oTransition=jindo._p_.getStyleIncludeVendorPrefix();
var name=oTransition.transition;
var endName;
if(name=="transition"){endName="end"
}else{endName="End"
}var bindFunc=function(){self.hide();
ele.style[name+"Property"]="";
ele.style[name+"Duration"]="";
ele.style[name+"TimingFunction"]="";
ele.style.opacity="";
callback.call(self,self);
ele.removeEventListener(name+endName,arguments.callee,false)
};
ele.addEventListener(name+endName,bindFunc,false);
ele.style[name+"Property"]="opacity";
ele.style[name+"Duration"]=duration+"s";
ele.style[name+"TimingFunction"]="linear";
jindo._p_.setOpacity(ele,"0");
return this
};
jindo.$Element.prototype.offset=function(nTop,nLeft){var oArgs=g_checkVarType(arguments,{g:[],s:["nTop:Numeric","nLeft:Numeric"]},"$Element#offset");
switch(oArgs+""){case"g":return this.offset_get();
case"s":return this.offset_set(oArgs.nTop,oArgs.nLeft)
}};
jindo.$Element.prototype.offset_set=function(nTop,nLeft){var oEl=this._element;
var oPhantom=null;
if(isNaN(parseFloat(this._getCss(oEl,"top")))){oEl.style.top="0px"
}if(isNaN(parseFloat(this._getCss(oEl,"left")))){oEl.style.left="0px"
}var oPos=this.offset_get();
var oGap={top:nTop-oPos.top,left:nLeft-oPos.left};
oEl.style.top=parseFloat(this._getCss(oEl,"top"))+oGap.top+"px";
oEl.style.left=parseFloat(this._getCss(oEl,"left"))+oGap.left+"px";
return this
};
jindo.$Element.prototype.offset_get=function(nTop,nLeft){var oEl=this._element;
var oPhantom=null;
var bOnlySafari=jindo._p_._JINDO_IS_SP&&!jindo._p_._JINDO_IS_CH;
var nVer=0;
var fpSafari=function(oEl){var oPos={left:0,top:0};
for(var oParent=oEl,oOffsetParent=oParent.offsetParent;
oParent=oParent.parentNode;
){if(oParent.offsetParent){oPos.left-=oParent.scrollLeft;
oPos.top-=oParent.scrollTop
}if(oParent==oOffsetParent){oPos.left+=oEl.offsetLeft+oParent.clientLeft;
oPos.top+=oEl.offsetTop+oParent.clientTop;
if(!oParent.offsetParent){oPos.left+=oParent.offsetLeft;
oPos.top+=oParent.offsetTop
}oOffsetParent=oParent.offsetParent;
oEl=oParent
}}return oPos
};
var fpOthers=function(oEl){var oPos={left:0,top:0};
var oDoc=oEl.ownerDocument||oEl.document||document;
var oHtml=oDoc.documentElement;
var oBody=oDoc.body;
if(oEl.getBoundingClientRect){if(!oPhantom){var bHasFrameBorder=(window==top);
if(!bHasFrameBorder){try{bHasFrameBorder=(window.frameElement&&window.frameElement.frameBorder==1)
}catch(e){}}oPhantom={left:0,top:0}
}var box=oEl.getBoundingClientRect();
if(oEl!==oHtml&&oEl!==oBody){oPos.left=box.left-oPhantom.left;
oPos.top=box.top-oPhantom.top;
oPos.left+=oHtml.scrollLeft||oBody.scrollLeft;
oPos.top+=oHtml.scrollTop||oBody.scrollTop
}}else{if(oDoc.getBoxObjectFor){var box=oDoc.getBoxObjectFor(oEl);
var vpBox=oDoc.getBoxObjectFor(oHtml||oBody);
oPos.left=box.screenX-vpBox.screenX;
oPos.top=box.screenY-vpBox.screenY
}else{for(var o=oEl;
o;
o=o.offsetParent){oPos.left+=o.offsetLeft;
oPos.top+=o.offsetTop
}for(var o=oEl.parentNode;
o;
o=o.parentNode){if(o.tagName=="BODY"){break
}if(o.tagName=="TR"){oPos.top+=2
}oPos.left-=o.scrollLeft;
oPos.top-=o.scrollTop
}}}return oPos
};
return(bOnlySafari?fpSafari:fpOthers)(oEl)
};
jindo.$Element.prototype.evalScripts=function(sHTML){var oArgs=g_checkVarType(arguments,{"4str":["sHTML:String+"]},"$Element#evalScripts");
var aJS=[];
var leftScript="<script(\\s[^>]+)*>(.*?)</";
var rightScript="script>";
sHTML=sHTML.replace(new RegExp(leftScript+rightScript,"gi"),function(_1,_2,sPart){aJS.push(sPart);
return""
});
eval(aJS.join("\n"));
return this
};
jindo.$Element.prototype.clone=function(bDeep){var oArgs=g_checkVarType(arguments,{"default":[],set:["bDeep:Boolean"]},"$Element#clone");
if(oArgs+""=="default"){bDeep=true
}return jindo.$Element(this._element.cloneNode(bDeep))
};
jindo.$Element._common=function(oElement,sMethod){try{return jindo.$Element(oElement)._element
}catch(e){throw TypeError(e.message.replace(/\$Element/g,"$Element#"+sMethod).replace(/Element\.html/g,"Element.html#"+sMethod))
}};
jindo.$Element._prepend=function(oParent,oChild){var nodes=oParent.childNodes;
if(nodes.length>0){oParent.insertBefore(oChild,nodes[0])
}else{oParent.appendChild(oChild)
}};
jindo.$Element.prototype.append=function(oElement){this._element.appendChild(jindo.$Element._common(oElement,"append"));
return this
};
jindo.$Element.prototype.prepend=function(oElement){jindo.$Element._prepend(this._element,jindo.$Element._common(oElement,"prepend"));
return this
};
jindo.$Element.prototype.replace=function(oElement){oElement=jindo.$Element._common(oElement,"replace");
if(jindo.cssquery){jindo.cssquery.release()
}var e=this._element;
var oParentNode=e.parentNode;
if(oParentNode&&oParentNode.replaceChild){oParentNode.replaceChild(oElement,e);
return this
}var _o=oElement;
oParentNode.insertBefore(_o,e);
oParentNode.removeChild(e);
return this
};
jindo.$Element.prototype.appendTo=function(oElement){jindo.$Element._common(oElement,"appendTo").appendChild(this._element);
return this
};
jindo.$Element.prototype.prependTo=function(oElement){jindo.$Element._prepend(jindo.$Element._common(oElement,"prependTo"),this._element);
return this
};
jindo.$Element.prototype.before=function(oElement){var o=jindo.$Element._common(oElement,"before");
this._element.parentNode.insertBefore(o,this._element);
return this
};
jindo.$Element.prototype.after=function(oElement){oElement=jindo.$Element._common(oElement,"after");
this.before(oElement);
jindo.$Element(oElement).before(this);
return this
};
jindo.$Element.prototype.parent=function(pFunc,limit){var oArgs=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"],for_function_number:["fpFunc:Function+","nLimit:Numeric"],for_null_number:["fpFunc:Null","nLimit:Numeric"]},"$Element#parent");
var e=this._element;
switch(oArgs+""){case"4voi":return e.parentNode?jindo.$Element(e.parentNode):null;
case"4fun":case"4nul":limit=-1;
break;
case"for_function_number":case"for_null_number":if(oArgs.nLimit==0){limit=-1
}}var a=[],p=null;
while(e.parentNode&&limit--!=0){try{p=jindo.$Element(e.parentNode)
}catch(e){p=null
}if(e.parentNode==document.documentElement){break
}if(!pFunc||(pFunc&&pFunc.call(this,p))){a[a.length]=p
}e=e.parentNode
}return a
};
jindo.$Element.prototype.child=function(pFunc,limit){var oArgs=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"],for_function_number:["fpFunc:Function+","nLimit:Numeric"],for_null_number:["fpFunc:Null","nLimit:Numeric"]},"$Element#child");
var e=this._element;
var a=[],c=null,f=null;
switch(oArgs+""){case"4voi":var child=e.childNodes;
var filtered=[];
for(var i=0,l=child.length;
i<l;
i++){if(child[i].nodeType==1){try{filtered.push(jindo.$Element(child[i]))
}catch(e){filtered.push(null)
}}}return filtered;
case"4fun":case"4nul":limit=-1;
break;
case"for_function_number":case"for_null_number":if(oArgs.nLimit==0){limit=-1
}}(f=function(el,lim,context){var ch=null,o=null;
for(var i=0;
i<el.childNodes.length;
i++){ch=el.childNodes[i];
if(ch.nodeType!=1){continue
}try{o=jindo.$Element(el.childNodes[i])
}catch(e){o=null
}if(!pFunc||(pFunc&&pFunc.call(context,o))){a[a.length]=o
}if(lim!=0){f(el.childNodes[i],lim-1)
}}})(e,limit-1,this);
return a
};
jindo.$Element.prototype.prev=function(pFunc){var oArgs=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"]},"$Element#prev");
var e=this._element;
var a=[];
switch(oArgs+""){case"4voi":if(!e){return null
}do{e=e.previousSibling;
if(!e||e.nodeType!=1){continue
}try{if(e==null){return null
}return jindo.$Element(e)
}catch(e){return null
}}while(e);
try{if(e==null){return null
}return jindo.$Element(e)
}catch(e){return null
}case"4fun":case"4nul":if(!e){return a
}do{e=e.previousSibling;
if(!e||e.nodeType!=1){continue
}if(!pFunc||pFunc.call(this,e)){try{if(e==null){a[a.length]=null
}else{a[a.length]=jindo.$Element(e)
}}catch(e){a[a.length]=null
}}}while(e);
try{return a
}catch(e){return null
}}};
jindo.$Element.prototype.next=function(pFunc){var oArgs=g_checkVarType(arguments,{"4voi":[],"4fun":["fpFunc:Function+"],"4nul":["fpFunc:Null"]},"$Element#next");
var e=this._element;
var a=[];
switch(oArgs+""){case"4voi":if(!e){return null
}do{e=e.nextSibling;
if(!e||e.nodeType!=1){continue
}try{if(e==null){return null
}return jindo.$Element(e)
}catch(e){return null
}}while(e);
try{if(e==null){return null
}return jindo.$Element(e)
}catch(e){return null
}case"4fun":case"4nul":if(!e){return a
}do{e=e.nextSibling;
if(!e||e.nodeType!=1){continue
}if(!pFunc||pFunc.call(this,e)){try{if(e==null){a[a.length]=null
}else{a[a.length]=jindo.$Element(e)
}}catch(e){a[a.length]=null
}}}while(e);
try{return a
}catch(e){return null
}}};
jindo.$Element.prototype.first=function(){var el=this._element.firstElementChild||this._element.firstChild;
if(!el){return null
}while(el&&el.nodeType!=1){el=el.nextSibling
}try{return el?jindo.$Element(el):null
}catch(e){return null
}};
jindo.$Element.prototype.last=function(){var el=this._element.lastElementChild||this._element.lastChild;
if(!el){return null
}while(el&&el.nodeType!=1){el=el.previousSibling
}try{return el?jindo.$Element(el):null
}catch(e){return null
}};
jindo.$Element._contain=function(eParent,eChild){if(document.compareDocumentPosition){return !!(eParent.compareDocumentPosition(eChild)&16)
}else{var e=eParent;
var el=eChild;
while(e&&e.parentNode){e=e.parentNode;
if(e==el){return true
}}return false
}};
jindo.$Element.prototype.isChildOf=function(element){try{return jindo.$Element._contain(jindo.$Element(element)._element,this._element)
}catch(e){return false
}};
jindo.$Element.prototype.isParentOf=function(element){try{return jindo.$Element._contain(this._element,jindo.$Element(element)._element)
}catch(e){return false
}};
jindo.$Element.prototype.isEqual=function(element){try{return(this._element===jindo.$Element(element)._element)
}catch(e){return false
}};
jindo._p_.fireCustomEvent=function(ele,sEvent,self,bIsNormalType){var oInfo=jindo._p_.normalCustomEvent[sEvent];
var targetEle,oEvent;
for(var i in oInfo){oEvent=oInfo[i];
targetEle=oEvent.ele;
var wrap_listener;
for(var sCssquery in oEvent){if(sCssquery==="_NONE_"){if(targetEle==ele||self.isChildOf(targetEle)){wrap_listener=oEvent[sCssquery].wrap_listener;
for(var k=0,l=wrap_listener.length;
k<l;
k++){wrap_listener[k]()
}}}else{if(jindo.$Element.eventManager.containsElement(targetEle,ele,sCssquery,false)){wrap_listener=oEvent[sCssquery].wrap_listener;
for(var k=0,l=wrap_listener.length;
k<l;
k++){wrap_listener[k]()
}}}}}};
jindo.$Element.prototype.fireEvent=function(sEvent,oProps){var oArgs=g_checkVarType(arguments,{"4str":[jindo.$Jindo._F("sEvent:String+")],"4obj":["sEvent:String+","oProps:Hash+"]},"$Element#fireEvent");
var ele=this._element;
var oldEvent=sEvent;
sEvent=jindo.$Element.eventManager.revisionEvent("",sEvent,sEvent);
if(jindo._p_.normalCustomEvent[sEvent]){jindo._p_.fireCustomEvent(ele,sEvent,this,!!jindo._p_.normalCustomEvent[sEvent]);
return this
}var sType="HTMLEvents";
sEvent=(sEvent+"").toLowerCase();
if(sEvent=="click"||sEvent.indexOf("mouse")==0){sType="MouseEvent"
}else{if(oldEvent.indexOf("wheel")>0){sEvent="DOMMouseScroll";
sType=jindo._p_._JINDO_IS_FF?"MouseEvent":"MouseWheelEvent"
}else{if(sEvent.indexOf("key")==0){sType="KeyboardEvent"
}else{if(sEvent.indexOf("pointer")>0){sType="MouseEvent";
sEvent=oldEvent
}}}}var evt;
switch(oArgs+""){case"4obj":oProps=oArgs.oProps;
oProps.button=0+(oProps.middle?1:0)+(oProps.right?2:0);
oProps.ctrl=oProps.ctrl||false;
oProps.alt=oProps.alt||false;
oProps.shift=oProps.shift||false;
oProps.meta=oProps.meta||false;
switch(sType){case"MouseEvent":evt=document.createEvent(sType);
evt.initMouseEvent(sEvent,true,true,null,oProps.detail||0,oProps.screenX||0,oProps.screenY||0,oProps.clientX||0,oProps.clientY||0,oProps.ctrl,oProps.alt,oProps.shift,oProps.meta,oProps.button,oProps.relatedElement||null);
break;
case"KeyboardEvent":if(window.KeyEvent){evt=document.createEvent("KeyEvents");
evt.initKeyEvent(sEvent,true,true,window,oProps.ctrl,oProps.alt,oProps.shift,oProps.meta,oProps.keyCode,oProps.keyCode)
}else{try{evt=document.createEvent("Events")
}catch(e){evt=document.createEvent("UIEvents")
}finally{evt.initEvent(sEvent,true,true);
evt.ctrlKey=oProps.ctrl;
evt.altKey=oProps.alt;
evt.shiftKey=oProps.shift;
evt.metaKey=oProps.meta;
evt.keyCode=oProps.keyCode;
evt.which=oProps.keyCode
}}break;
default:evt=document.createEvent(sType);
evt.initEvent(sEvent,true,true)
}break;
case"4str":evt=document.createEvent(sType);
evt.initEvent(sEvent,true,true)
}var el=this._element;
if(jindo.$Jindo.isWindow(el)&&/(iPhone|iPad|iPod).*OS\s+([0-9\.]+)/.test(jindo._p_._j_ag)&&parseFloat(RegExp.$2)<4){el=el.document
}el.dispatchEvent(evt);
return this
};
jindo.$Element.prototype.empty=function(){if(jindo.cssquery){jindo.cssquery.release()
}this.html("");
return this
};
jindo.$Element.prototype.remove=function(oChild){if(jindo.cssquery){jindo.cssquery.release()
}var ___element=jindo.$Element;
___element(___element._common(oChild,"remove")).leave();
return this
};
jindo.$Element.prototype.leave=function(){var e=this._element;
if(e.parentNode){if(jindo.cssquery){jindo.cssquery.release()
}e.parentNode.removeChild(e)
}if(this._element.__jindo__id){jindo.$Element.eventManager.cleanUpUsingKey(this._element.__jindo__id,true)
}return this
};
jindo.$Element.prototype.wrap=function(wrapper){var e=this._element;
wrapper=jindo.$Element._common(wrapper,"wrap");
if(e.parentNode){e.parentNode.insertBefore(wrapper,e)
}wrapper.appendChild(e);
return this
};
jindo.$Element.prototype.ellipsis=function(stringTail){var oArgs=g_checkVarType(arguments,{"4voi":[],"4str":["stringTail:String+"]},"$Element#ellipsis");
stringTail=stringTail||"...";
var txt=this.text();
var len=txt.length;
var padding=parseInt(this._getCss(this._element,"paddingTop"),10)+parseInt(this._getCss(this._element,"paddingBottom"),10);
var cur_h=this._element.offsetHeight-padding;
var i=0;
var h=this.text("A")._element.offsetHeight-padding;
if(cur_h<h*1.5){this.text(txt);
return this
}cur_h=h;
while(cur_h<h*1.5){i+=Math.max(Math.ceil((len-i)/2),1);
cur_h=this.text(txt.substring(0,i)+stringTail)._element.offsetHeight-padding
}while(cur_h>h*1.5){i--;
cur_h=this.text(txt.substring(0,i)+stringTail)._element.offsetHeight-padding
}return this
};
jindo.$Element.prototype.indexOf=function(element){try{var e=jindo.$Element(element)._element;
var n=this._element.childNodes;
var c=0;
var l=n.length;
for(var i=0;
i<l;
i++){if(n[i].nodeType!=1){continue
}if(n[i]===e){return c
}c++
}}catch(e){}return -1
};
jindo.$Element.prototype.queryAll=function(sSelector){var oArgs=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#queryAll");
var arrEle=jindo.cssquery(sSelector,this._element);
var returnArr=[];
for(var i=0,l=arrEle.length;
i<l;
i++){returnArr.push(jindo.$Element(arrEle[i]))
}return returnArr
};
jindo.$Element.prototype.query=function(sSelector){var oArgs=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#query");
var ele=jindo.cssquery.getSingle(sSelector,this._element);
return ele===null?ele:jindo.$Element(ele)
};
jindo.$Element.prototype.test=function(sSelector){var oArgs=g_checkVarType(arguments,{"4str":["sSelector:String+"]},"$Element#test");
return jindo.cssquery.test(this._element,sSelector)
};
jindo.$Element.prototype.xpathAll=function(sXPath){var oArgs=g_checkVarType(arguments,{"4str":["sXPath:String+"]},"$Element#xpathAll");
var arrEle=jindo.cssquery.xpath(sXPath,this._element);
var returnArr=[];
for(var i=0,l=arrEle.length;
i<l;
i++){returnArr.push(jindo.$Element(arrEle[i]))
}return returnArr
};
jindo.$Element.insertAdjacentHTML=function(ins,html,insertType,type,fn,sType){var aArg=[html];
aArg.callee=arguments.callee;
var oArgs=g_checkVarType(aArg,{"4str":["sHTML:String+"]},"$Element#"+sType);
var _ele=ins._element;
html=html+"";
if(_ele.insertAdjacentHTML&&!(/^<(option|tr|td|th|col)(?:.*?)>/.test(jindo._p_.trim(html).toLowerCase()))){_ele.insertAdjacentHTML(insertType,html)
}else{var oDoc=_ele.ownerDocument||_ele.document||document;
var fragment=oDoc.createDocumentFragment();
var defaultElement;
var sTag=jindo._p_.trim(html);
var oParentTag={option:"select",tr:"tbody",thead:"table",tbody:"table",col:"table",td:"tr",th:"tr",div:"div"};
var aMatch=/^\<(option|tr|thead|tbody|td|th|col)(?:.*?)\>/i.exec(sTag);
var sChild=aMatch===null?"div":aMatch[1].toLowerCase();
var sParent=oParentTag[sChild];
defaultElement=jindo._p_._createEle(sParent,sTag,oDoc,true);
var scripts=defaultElement.getElementsByTagName("script");
for(var i=0,l=scripts.length;
i<l;
i++){scripts[i].parentNode.removeChild(scripts[i])
}if(_ele.tagName.toLowerCase()=="table"&&!_ele.getElementsByTagName("tbody").length&&!sTag.match(/<tbody[^>]*>/i)){var elTbody=oDoc.createElement("tbody"),bTheadTfoot=sTag.match(/^<t(head|foot)[^>]*>/i);
if(!bTheadTfoot){fragment.appendChild(elTbody);
fragment=elTbody
}}while(defaultElement[type]){fragment.appendChild(defaultElement[type])
}bTheadTfoot&&fragment.appendChild(elTbody);
fn(fragment.cloneNode(true))
}return ins
};
jindo.$Element.prototype.appendHTML=function(sHTML){return jindo.$Element.insertAdjacentHTML(this,sHTML,"beforeEnd","firstChild",jindo.$Fn(function(oEle){var ele=this._element;
if(ele.tagName.toLowerCase()==="table"){var nodes=ele.childNodes;
for(var i=0,l=nodes.length;
i<l;
i++){if(nodes[i].nodeType==1){ele=nodes[i];
break
}}}ele.appendChild(oEle)
},this).bind(),"appendHTML")
};
jindo.$Element.prototype.prependHTML=function(sHTML){var ___element=jindo.$Element;
return ___element.insertAdjacentHTML(this,sHTML,"afterBegin","firstChild",jindo.$Fn(function(oEle){var ele=this._element;
if(ele.tagName.toLowerCase()==="table"){var nodes=ele.childNodes;
for(var i=0,l=nodes.length;
i<l;
i++){if(nodes[i].nodeType==1){ele=nodes[i];
break
}}}___element._prepend(ele,oEle)
},this).bind(),"prependHTML")
};
jindo.$Element.prototype.beforeHTML=function(sHTML){return jindo.$Element.insertAdjacentHTML(this,sHTML,"beforeBegin","firstChild",jindo.$Fn(function(oEle){this._element.parentNode.insertBefore(oEle,this._element)
},this).bind(),"beforeHTML")
};
jindo.$Element.prototype.afterHTML=function(sHTML){return jindo.$Element.insertAdjacentHTML(this,sHTML,"afterEnd","firstChild",jindo.$Fn(function(oEle){this._element.parentNode.insertBefore(oEle,this._element.nextSibling)
},this).bind(),"afterHTML")
};
jindo.$Element.prototype.hasEventListener=function(sEvent){var oArgs=g_checkVarType(arguments,{"4str":["sEvent:String+"]},"$Element#hasEventListener"),oDoc,bHasEvent=false,sLowerCaseEvent=oArgs.sEvent.toLowerCase();
if(this._key){oDoc=this._element.ownerDocument||this._element.document||document;
if(sLowerCaseEvent=="load"&&this._element===oDoc){bHasEvent=jindo.$Element(window).hasEventListener(oArgs.sEvent)
}else{if(sLowerCaseEvent=="domready"&&jindo.$Jindo.isWindow(this._element)){bHasEvent=jindo.$Element(oDoc).hasEventListener(oArgs.sEvent)
}else{var realEvent=jindo.$Element.eventManager.revisionEvent("",sEvent);
bHasEvent=!!jindo.$Element.eventManager.hasEvent(this._key,realEvent,oArgs.sEvent)
}}return bHasEvent
}return false
};
jindo.$Element.prototype.preventTapHighlight=function(bFlag){if(jindo._p_._JINDO_IS_MO){var sClassName="no_tap_highlight"+new Date().getTime();
var elStyleTag=document.createElement("style");
var elHTML=document.getElementsByTagName("html")[0];
elStyleTag.type="text/css";
elHTML.insertBefore(elStyleTag,elHTML.firstChild);
var oSheet=elStyleTag.sheet||elStyleTag.styleSheet;
oSheet.insertRule("."+sClassName+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0);
oSheet.insertRule("."+sClassName+" * { -webkit-tap-highlight-color: rgba(0,0,0,.25); }",0);
jindo.$Element.prototype.preventTapHighlight=function(bFlag){return this[bFlag?"addClass":"removeClass"](sClassName)
}
}else{jindo.$Element.prototype.preventTapHighlight=function(bFlag){return this
}
}return this.preventTapHighlight.apply(this,jindo._p_._toArray(arguments))
};
jindo.$Element.prototype.data=function(sKey,vValue){var oType={g:["sKey:String+"],s4var:["sKey:String+","vValue:Variant"],s4obj:["oObj:Hash+"]};
var jindoKey="_jindo";
function toCamelCase(name){return name.replace(/\-(.)/g,function(_,a){return a.toUpperCase()
})
}function toDash(name){return name.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()
})
}if(document.body.dataset){jindo.$Element.prototype.data=function(sKey,vValue){var sToStr,oArgs=g_checkVarType(arguments,oType,"$Element#data");
var isNull=jindo.$Jindo.isNull;
switch(oArgs+""){case"g":sKey=toCamelCase(sKey);
var isMakeFromJindo=this._element.dataset[sKey+jindoKey];
var sDateSet=this._element.dataset[sKey];
if(sDateSet){if(isMakeFromJindo){return window.JSON.parse(sDateSet)
}return sDateSet
}return null;
case"s4var":var oData;
if(isNull(vValue)){sKey=toCamelCase(sKey);
delete this._element.dataset[sKey];
delete this._element.dataset[sKey+jindoKey];
return this
}else{oData={};
oData[sKey]=vValue;
sKey=oData
}case"s4obj":var sChange;
for(var i in sKey){sChange=toCamelCase(i);
if(isNull(sKey[i])){delete this._element.dataset[sChange];
delete this._element.dataset[sChange+jindoKey]
}else{sToStr=jindo.$Json._oldToString(sKey[i]);
if(sToStr!=null){this._element.dataset[sChange]=sToStr;
this._element.dataset[sChange+jindoKey]="jindo"
}}}return this
}}
}else{jindo.$Element.prototype.data=function(sKey,vValue){var sToStr,oArgs=g_checkVarType(arguments,oType,"$Element#data");
var isNull=jindo.$Jindo.isNull;
switch(oArgs+""){case"g":sKey=toDash(sKey);
var isMakeFromJindo=this._element.getAttribute("data-"+sKey+jindoKey);
var sVal=this._element.getAttribute("data-"+sKey);
if(isMakeFromJindo){return(sVal!=null)?eval("("+sVal+")"):null
}else{return sVal
}case"s4var":var oData;
if(isNull(vValue)){sKey=toDash(sKey);
this._element.removeAttribute("data-"+sKey);
this._element.removeAttribute("data-"+sKey+jindoKey);
return this
}else{oData={};
oData[sKey]=vValue;
sKey=oData
}case"s4obj":var sChange;
for(var i in sKey){sChange=toDash(i);
if(isNull(sKey[i])){this._element.removeAttribute("data-"+sChange);
this._element.removeAttribute("data-"+sChange+jindoKey)
}else{sToStr=jindo.$Json._oldToString(sKey[i]);
if(sToStr!=null){this._element.setAttribute("data-"+sChange,sToStr);
this._element.setAttribute("data-"+sChange+jindoKey,"jindo")
}}}return this
}}
}return this.data.apply(this,jindo._p_._toArray(arguments))
};
jindo.$Fn=function(func,thisObject){var cl=arguments.callee;
if(func instanceof cl){return func
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Fn");
return new cl(func,thisObject)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4fun":["func:Function+"],"4fun2":["func:Function+","thisObject:Variant"],"4str":["func:String+","thisObject:String+"]},"$Fn");
this._tmpElm=null;
this._key=null;
switch(oArgs+""){case"4str":this._func=eval("false||function("+func+"){"+thisObject+"}");
break;
case"4fun":case"4fun2":this._func=func;
this._this=thisObject
}};
jindo.$Fn._commonPram=function(oPram,sMethod){return g_checkVarType(oPram,{"4ele":["eElement:Element+","sEvent:String+"],"4ele2":["eElement:Element+","sEvent:String+","bUseCapture:Boolean"],"4str":["eElement:String+","sEvent:String+"],"4str2":["eElement:String+","sEvent:String+","bUseCapture:Boolean"],"4arr":["aElement:Array+","sEvent:String+"],"4arr2":["aElement:Array+","sEvent:String+","bUseCapture:Boolean"],"4doc":["eElement:Document+","sEvent:String+"],"4win":["eElement:Window+","sEvent:String+"],"4doc2":["eElement:Document+","sEvent:String+","bUseCapture:Boolean"],"4win2":["eElement:Window+","sEvent:String+","bUseCapture:Boolean"]},sMethod)
};
jindo.$Fn.prototype.$value=function(){return this._func
};
jindo.$Fn.prototype.bind=function(){var a=jindo._p_._toArray(arguments);
var f=this._func;
var t=this._this||this;
var b;
if(f.bind){a.unshift(t);
b=Function.prototype.bind.apply(f,a)
}else{b=function(){var args=jindo._p_._toArray(arguments);
if(a.length){args=a.concat(args)
}return f.apply(t,args)
}
}return b
};
jindo.$Fn.prototype.attach=function(oElement,sEvent,bUseCapture){var oArgs=jindo.$Fn._commonPram(arguments,"$Fn#attach");
var fn=null,l,ev=sEvent,el=oElement,ua=jindo._p_._j_ag;
if(bUseCapture!==true){bUseCapture=false
}this._bUseCapture=bUseCapture;
switch(oArgs+""){case"4arr":case"4arr2":var el=oArgs.aElement;
var ev=oArgs.sEvent;
for(var i=0,l=el.length;
i<l;
i++){this.attach(el[i],ev,!!bUseCapture)
}return this
}fn=this._bind=this._bind?this._bind:this.bind();
jindo.$Element(el).attach(ev,fn);
return this
};
jindo.$Fn.prototype.detach=function(oElement,sEvent,bUseCapture){var oArgs=jindo.$Fn._commonPram(arguments,"$Fn#detach");
var fn=null,l,el=oElement,ev=sEvent,ua=jindo._p_._j_ag;
switch(oArgs+""){case"4arr":case"4arr2":var el=oArgs.aElement;
var ev=oArgs.sEvent;
for(var i=0,l=el.length;
i<l;
i++){this.detach(el[i],ev,!!bUseCapture)
}return this
}fn=this._bind=this._bind?this._bind:this.bind();
jindo.$Element(oArgs.eElement).detach(oArgs.sEvent,fn);
return this
};
jindo.$Fn.prototype.delay=function(nSec,args){var oArgs=g_checkVarType(arguments,{"4num":["nSec:Numeric"],"4arr":["nSec:Numeric","args:Array+"]},"$Fn#delay");
switch(oArgs+""){case"4num":args=args||[];
break;
case"4arr":args=oArgs.args
}this._delayKey=setTimeout(this.bind.apply(this,args),nSec*1000);
return this
};
jindo.$Fn.prototype.setInterval=function(nSec,args){var oArgs=g_checkVarType(arguments,{"4num":["nSec:Numeric"],"4arr":["nSec:Numeric","args:Array+"]},"$Fn#setInterval");
switch(oArgs+""){case"4num":args=args||[];
break;
case"4arr":args=oArgs.args
}this._repeatKey=setInterval(this.bind.apply(this,args),nSec*1000);
return this
};
jindo.$Fn.prototype.repeat=jindo.$Fn.prototype.setInterval;
jindo.$Fn.prototype.stopDelay=function(){if(this._delayKey!==undefined){window.clearTimeout(this._delayKey);
delete this._delayKey
}return this
};
jindo.$Fn.prototype.stopRepeat=function(){if(this._repeatKey!==undefined){window.clearInterval(this._repeatKey);
delete this._repeatKey
}return this
};
jindo.$ElementList=function(els){var cl=arguments.callee;
if(els instanceof cl){return els
}if(!(this instanceof cl)){try{return new cl(els)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4arr":["aEle:Array+"],"4str":["sCssQuery:String+"],"4nul":["oEle:Null"],"4und":["oEle:Undefined"]},"$ElementList");
switch(oArgs+""){case"4arr":els=oArgs.aEle;
break;
case"4str":els=jindo.cssquery(oArgs.sCssQuery);
break;
case"4nul":case"4und":els=[]
}this._elements=[];
for(var i=0,l=els.length;
i<l;
i++){this._elements.push(jindo.$Element(els[i]))
}};
(function(proto){var setters=["show","hide","toggle","addClass","removeClass","toggleClass","fireEvent","leave","empty","className","width","height","text","html","css","attr"];
for(var i=0,l=setters.length;
i<l;
i++){var name=setters[i];
if(jindo.$Element.prototype[name]){proto[setters[i]]=(function(name){return function(){try{var args=[];
for(var j=0,m=arguments.length;
j<m;
j++){args.push(arguments[j])
}for(var k=0,n=this._elements.length;
k<n;
k++){this._elements[k][name].apply(this._elements[k],args)
}return this
}catch(e){throw TypeError(e.message.replace(/\$Element/g,"$Elementlist#"+name).replace(/Element\.html/g,"Elementlist.html#"+name))
}}
})(setters[i])
}}var setters2=["appear","disappear"];
for(var i=0,l=setters2.length;
i<l;
i++){if(jindo.$Element.prototype[name]){proto[setters2[i]]=(function(name){return function(duration,callback){try{var self=this;
for(var j=0,m=this._elements.length;
j<m;
j++){if(j==m-1){this._elements[j][name](duration,function(){callback&&callback(self)
})
}else{this._elements[j][name](duration)
}}return this
}catch(e){throw TypeError(e.message.replace(/\$Element/g,"$Elementlist#"+name).replace(/Element\.html/g,"Elementlist.html#"+name))
}}
})(setters2[i])
}}})(jindo.$ElementList.prototype);
jindo.$ElementList.prototype.get=function(idx){var oArgs=g_checkVarType(arguments,{"4num":["nIdx:Numeric"]},"$ElementList#get");
return this._elements[idx]
};
jindo.$ElementList.prototype.getFirst=function(){return this._elements[0]
};
jindo.$ElementList.prototype.getLast=function(){return this._elements[Math.max(this._elements.length-1,0)]
};
jindo.$ElementList.prototype.length=function(nLen,oValue){var oArgs=g_checkVarType(arguments,{"4voi":[],"4num":[jindo.$Jindo._F("nLen:Numeric")],"4var":["nLen:Numeric","oValue:Variant"]},"$ElementList#length");
var waEle=jindo.$A(this._elements);
try{return waEle.length.apply(waEle,jindo._p_._toArray(arguments))
}catch(e){throw TypeError(e.message.replace(/\$A/g,"$Elementlist#length").replace(/A\.html/g,"Elementlist.html#length"))
}};
jindo.$ElementList.prototype.$value=function(){return this._elements
};
jindo.$S=function(str){var cl=arguments.callee;
if(str instanceof cl){return str
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Json");
return new cl(str||"")
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{nul:["nul:Null"],unde:["unde:Undefined"],"4var":["str:Variant"]},"$S");
switch(oArgs+""){case"nul":case"unde":this._str="";
break;
case"4var":this._str=(oArgs.str).toString();
break
}};
jindo.$S.prototype.$value=function(){return this._str
};
jindo.$S.prototype.toString=jindo.$S.prototype.$value;
jindo.$S.prototype.trim=function(){if("".trim){jindo.$S.prototype.trim=function(){return jindo.$S(this._str.trim())
}
}else{jindo.$S.prototype.trim=function(){return jindo._p_.trim(this._str)
}
}return jindo.$S(this.trim())
};
jindo.$S.prototype.escapeHTML=function(){var entities={'"':"quot","&":"amp","<":"lt",">":"gt","'":"#39"};
var s=this._str.replace(/[<>&"']/g,function(m0){return entities[m0]?"&"+entities[m0]+";":m0
});
return jindo.$S(s)
};
jindo.$S.prototype.stripTags=function(){return jindo.$S(this._str.replace(/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/ig,""))
};
jindo.$S.prototype.times=function(nTimes){var oArgs=g_checkVarType(arguments,{"4str":["nTimes:Numeric"]},"$S#times");
if(!oArgs){return this
}return jindo.$S(Array(oArgs.nTimes+1).join(this._str))
};
jindo.$S.prototype.unescapeHTML=function(){var entities={quot:'"',amp:"&",lt:"<",gt:">","#39":"'"};
var s=this._str.replace(/&([a-z]+|#[0-9]+);/g,function(m0,m1){return entities[m1]?entities[m1]:m0
});
return jindo.$S(s)
};
jindo.$S.prototype.escape=function(){var s=this._str.replace(/([\u0080-\uFFFF]+)|[\n\r\t"'\\]/g,function(m0,m1,_){if(m1){return escape(m1).replace(/%/g,"\\")
}return(_={"\n":"\\n","\r":"\\r","\t":"\\t"})[m0]?_[m0]:"\\"+m0
});
return jindo.$S(s)
};
jindo.$S.prototype.bytes=function(vConfig){var oArgs=g_checkVarType(arguments,{"4voi":[],"4num":["nConfig:Numeric"],"4obj":["nConfig:Hash+"]},"$S#bytes");
var code=0,bytes=0,i=0,len=this._str.length;
var charset=((document.charset||document.characterSet||document.defaultCharset)+"");
var cut,nBytes;
switch(oArgs+""){case"4voi":cut=false;
break;
case"4num":cut=true;
nBytes=vConfig;
break;
case"4obj":charset=vConfig.charset||charset;
nBytes=vConfig.size||false;
cut=!!nBytes;
break
}if(charset.toLowerCase()=="utf-8"){for(i=0;
i<len;
i++){code=this._str.charCodeAt(i);
if(code<128){bytes+=1
}else{if(code<2048){bytes+=2
}else{if(code<65536){bytes+=3
}else{bytes+=4
}}}if(cut&&bytes>nBytes){this._str=this._str.substr(0,i);
break
}}}else{for(i=0;
i<len;
i++){bytes+=(this._str.charCodeAt(i)>128)?2:1;
if(cut&&bytes>nBytes){this._str=this._str.substr(0,i);
break
}}}return cut?this:bytes
};
jindo.$S.prototype.parseString=function(){if(this._str==""){return{}
}var str=this._str.split(/&/g),pos,key,val,buf={},isescape=false;
for(var i=0;
i<str.length;
i++){key=str[i].substring(0,pos=str[i].indexOf("=")),isescape=false;
try{val=decodeURIComponent(str[i].substring(pos+1))
}catch(e){isescape=true;
val=decodeURIComponent(unescape(str[i].substring(pos+1)))
}if(key.substr(key.length-2,2)=="[]"){key=key.substring(0,key.length-2);
if(jindo.$Jindo.isUndefined(buf[key])){buf[key]=[]
}buf[key][buf[key].length]=isescape?escape(val):val
}else{buf[key]=isescape?escape(val):val
}}return buf
};
jindo.$S.prototype.escapeRegex=function(){var s=this._str;
var r=/([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\\|])/g;
return jindo.$S(s.replace(r,"\\$1"))
};
jindo.$S.prototype.format=function(){var args=arguments;
var idx=0;
var s=this._str.replace(/%([ 0])?(-)?([1-9][0-9]*)?([bcdsoxX])/g,function(m0,m1,m2,m3,m4){var a=args[idx++];
var ret="",pad="";
m3=m3?+m3:0;
if(m4=="s"){ret=a+""
}else{if(" bcdoxX".indexOf(m4)>0){if(!jindo.$Jindo.isNumeric(a)){return""
}ret=(m4=="c")?String.fromCharCode(a):a.toString(({b:2,d:10,o:8,x:16,X:16})[m4]);
if(" X".indexOf(m4)>0){ret=ret.toUpperCase()
}}}if(ret.length<m3){pad=jindo.$S(m1||" ").times(m3-ret.length)._str
}(m2=="-")?(ret+=pad):(ret=pad+ret);
return ret
});
return jindo.$S(s)
};
jindo.$Document=function(el){var cl=arguments.callee;
if(el instanceof cl){return el
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Document");
return new cl(el||document)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4doc":["oDocument:Document+"]},"$Document");
if(oArgs==null){this._doc=document
}else{this._doc=el
}this._docKey="documentElement"
};
(function(){var qu=jindo.cssquery;
var type={query:qu.getSingle,queryAll:qu,xpathAll:qu.xpath};
for(var i in type){jindo.$Document.prototype[i]=(function(sMethod,fp){return function(sQuery){var oArgs=g_checkVarType(arguments,{"4str":["sQuery:String+"]},"$Document#"+sMethod);
return fp(sQuery,this._doc)
}
})(i,type[i])
}})();
jindo.$Document.prototype.$value=function(){return this._doc
};
jindo.$Document.prototype.scrollSize=function(){var oDoc=this._doc[jindo._p_._JINDO_IS_WK?"body":this._docKey];
return{width:Math.max(oDoc.scrollWidth,oDoc.clientWidth),height:Math.max(oDoc.scrollHeight,oDoc.clientHeight)}
};
jindo.$Document.prototype.scrollPosition=function(){var oDoc=this._doc[jindo._p_._JINDO_IS_WK?"body":this._docKey];
return{left:oDoc.scrollLeft||window.pageXOffset||window.scrollX||0,top:oDoc.scrollTop||window.pageYOffset||window.scrollY||0}
};
jindo.$Document.prototype.clientSize=function(){var oDoc=this._doc[this._docKey];
var isSafari=jindo._p_._JINDO_IS_SP&&!jindo._p_._JINDO_IS_CH;
return(isSafari)?{width:window.innerWidth,height:window.innerHeight}:{width:oDoc.clientWidth,height:oDoc.clientHeight}
};
jindo.$Form=function(el){var cl=arguments.callee;
if(el instanceof cl){return el
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,1,"$Form");
return new cl(el)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4str":["oForm:String+"],"4ele":["oForm:Element+"]},"$Form+");
switch(oArgs+""){case"4str":el=jindo.$(el);
break
}if(!(el.tagName&&el.tagName.toUpperCase()=="FORM")){throw TypeError("only form")
}this._form=el
};
jindo.$Form.prototype.$value=function(){return this._form
};
jindo.$Form.prototype.serialize=function(){var self=this;
var oRet={};
var nLen=arguments.length;
var fpInsert=function(eEle,sKey){if(!eEle.disabled){var sVal=self.value(sKey);
if(sVal!==undefined){oRet[sKey]=sVal
}}};
if(nLen==0){var len=this._form.elements.length;
for(var i=0;
i<len;
i++){var o=this._form.elements[i];
if(o.name){fpInsert(o,o.name)
}}}else{for(var i=0;
i<nLen;
i++){fpInsert(this.element(arguments[i]),arguments[i])
}}return jindo.$H(oRet).toQueryString()
};
jindo.$Form.prototype.element=function(sKey){var oArgs=g_checkVarType(arguments,{"4voi":[],"4str":[jindo.$Jindo._F("sKey:String+")]},"$Form#element");
switch(oArgs+""){case"4voi":return jindo._p_._toArray(this._form.elements);
case"4str":return this._form.elements[sKey+""]
}};
jindo.$Form.prototype.enable=function(sKey){var oArgs=g_checkVarType(arguments,{s4bln:["sName:String+","bEnable:Boolean"],s4obj:["oObj:Hash+"],g:[jindo.$Jindo._F("sName:String+")]},"$Form#enable");
switch(oArgs+""){case"s4bln":var aEls=this._form[sKey];
if(!aEls){return this
}aEls=aEls.nodeType==1?[aEls]:aEls;
var sFlag=oArgs.bEnable;
for(var i=0;
i<aEls.length;
i++){aEls[i].disabled=!sFlag
}return this;
case"s4obj":sKey=oArgs.oObj;
var self=this;
for(var k in sKey){if(sKey.hasOwnProperty(k)){self.enable(k,sKey[k])
}}return this;
case"g":var aEls=this._form[sKey];
if(!aEls){return this
}aEls=aEls.nodeType==1?[aEls]:aEls;
var bEnabled=true;
for(var i=0;
i<aEls.length;
i++){if(aEls[i].disabled){bEnabled=false;
break
}}return bEnabled
}};
jindo.$Form.prototype.value=function(sKey){var oArgs=g_checkVarType(arguments,{s4str:["sKey:String+","vValue:Variant"],s4obj:[jindo.$Jindo._F("oObj:Hash+")],g:["sKey:String+"]},"$Form#value");
if(oArgs+""=="s4obj"){var self=this;
sKey=oArgs.oObj;
for(var k in sKey){if(sKey.hasOwnProperty(k)){self.value(k,sKey[k])
}}return this
}var aEls=this._form[sKey];
if(!aEls){throw new jindo.$Error(sKey+jindo.$Except.NONE_ELEMENT,"$Form#value")
}aEls=aEls.nodeType==1?[aEls]:aEls;
switch(oArgs+""){case"s4str":var sVal=oArgs.vValue;
var nLen=aEls.length;
for(var i=0;
i<nLen;
i++){var o=aEls[i];
switch(o.type){case"radio":o.checked=(o.value==sVal);
break;
case"checkbox":if(sVal.constructor==Array){o.checked=jindo.$A(sVal).has(o.value)
}else{o.checked=(o.value==sVal)
}break;
case"select-one":var nIndex=-1;
for(var i=0,len=o.options.length;
i<len;
i++){if(o.options[i].value==sVal){nIndex=i
}}o.selectedIndex=nIndex;
break;
case"select-multiple":var nIndex=-1;
if(sVal.constructor==Array){var waVal=jindo.$A(sVal);
for(var i=0,len=o.options.length;
i<len;
i++){o.options[i].selected=waVal.has(o.options[i].value)
}}else{for(var i=0,len=o.options.length;
i<len;
i++){if(o.options[i].value==sVal){nIndex=i
}}o.selectedIndex=nIndex
}break;
default:o.value=sVal
}}return this;
case"g":var aRet=[];
var nLen=aEls.length;
for(var i=0;
i<nLen;
i++){var o=aEls[i];
switch(o.type){case"radio":case"checkbox":if(o.checked){aRet.push(o.value)
}break;
case"select-one":if(o.selectedIndex!=-1){aRet.push(o.options[o.selectedIndex].value)
}break;
case"select-multiple":if(o.selectedIndex!=-1){for(var i=0,len=o.options.length;
i<len;
i++){if(o.options[i].selected){aRet.push(o.options[i].value)
}}}break;
default:aRet.push(o.value)
}}return aRet.length>1?aRet:aRet[0]
}};
jindo.$Form.prototype.submit=function(sTargetName,fValidation){var oArgs=g_checkVarType(arguments,{voi:[],"4str":["sTargetName:String+"],"4fun":["fValidation:Function+"],"4fun2":["sTargetName:String+","fValidation:Function+"]},"$Form#submit");
var sOrgTarget=null;
switch(oArgs+""){case"4str":sOrgTarget=this._form.target;
this._form.target=oArgs.sTargetName;
break;
case"4fun":case"4fun2":if(!oArgs.fValidation.call(this,this._form)){return this
}if(oArgs+""=="4fun2"){sOrgTarget=this._form.target;
this._form.target=oArgs.sTargetName
}}this._form.submit();
if(!jindo.$Jindo.isNull(sOrgTarget)){this._form.target=sOrgTarget
}return this
};
jindo.$Form.prototype.reset=function(fValidation){var oArgs=g_checkVarType(arguments,{"4voi":[],"4fun":["fValidation:Function+"]},"$Form#reset");
if(oArgs+""=="4fun"){if(!fValidation.call(this,this._form)){return this
}}this._form.reset();
return this
};
jindo.$Template=function(str,sEngineName){var obj=null,tag="",cl=arguments.callee,_sEngineName;
if(str instanceof cl){return str
}if(!(this instanceof cl)){try{jindo.$Jindo._maxWarn(arguments.length,2,"$Template");
return new cl(str||"",sEngineName||"default")
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4str":["str:String+"],"4ele":["ele:Element+"],"4str3":["str:String+","sEngineName:String+"],"4ele3":["ele:Element+","sEngineName:String+"]},"$Template");
if((obj=document.getElementById(str)||str)&&obj.tagName&&(tag=obj.tagName.toUpperCase())&&(tag=="TEXTAREA"||(tag=="SCRIPT"&&obj.getAttribute("type")=="text/template"))){str=(obj.value||obj.innerHTML).replace(/^\s+|\s+$/g,"")
}this._str=str+"";
_sEngineName="default";
switch(oArgs+""){case"4str3":case"4ele3":_sEngineName=oArgs.sEngineName;
break
}this._compiler=jindo.$Template.getEngine(_sEngineName)
};
jindo.$Template._aEngines={};
jindo.$Template._cache={};
jindo.$Template.splitter=/(?!\\)[\{\}]/g;
jindo.$Template.pattern=/^(?:if (.+)|elseif (.+)|for (?:(.+)\:)?(.+) in (.+)|(else)|\/(if|for)|=(.+)|js (.+)|set (.+)|gset (.+))$/;
jindo.$Template.addEngine=function(sEngineName,fEngine){var oArgs=g_checkVarType(arguments,{"4fun":["sEngineName:String+","fEngine:Function+"]},"$Template#addEngine");
jindo.$Template._aEngines[oArgs.sEngineName]=oArgs.fEngine
};
jindo.$Template.getEngine=function(sEngineName){var oArgs=g_checkVarType(arguments,{"4str":["sEngineName:String+"]},"$Template#getEngine");
return jindo.$Template._aEngines[oArgs.sEngineName]
};
jindo.$Template.prototype.process=function(data){var oArgs=g_checkVarType(arguments,{"4obj":["data:Hash+"],"4voi":[]},"$Template#process"),fProcess;
if(jindo.$Template._cache&&jindo.$Template._cache[this._str]){fProcess=jindo.$Template._cache[this._str];
return fProcess(oArgs+""=="for_void"?"":oArgs.data)
}jindo.$Template._cache[this._str]=fProcess=this._compiler(this._str);
return fProcess(oArgs+""=="for_void"?"":oArgs.data)
};
jindo.$Template.addEngine("default",function(str){var code=[];
var parsed=false;
function stripString(s){return s.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n")
}code.push("var $RET$ = [];");
code.push('var $SCOPE$ = $ARG$ && typeof $ARG$ === "object" ? $ARG$ : {};');
code.push("with ($SCOPE$) {");
var key_num=0;
do{parsed=false;
str=str.replace(/^[^{]+/,function(_){parsed=code.push('$RET$.push("'+stripString(_)+'");');
return""
});
str=str.replace(/^{=([^}]+)}/,function(_,varname){parsed=code.push("$RET$.push("+varname+");");
return""
});
str=str.replace(/^{js\s+([^}]+)}/,function(_,syntax){syntax=syntax.replace(/(=(?:[a-zA-Z_][\w\.]*)+)/g,function(m){return m.replace("=","")
});
parsed=code.push("$RET$.push("+syntax+");");
return""
});
str=str.replace(/^{(g)?set\s+([^=]+)=([^}]+)}/,function(_,at_g,key,val){parsed=code.push((at_g?"var ":"$SCOPE$.")+key+"="+val.replace(/\(=/g,"(")+";");
return""
});
str=str.replace(/^{for\s+([^:}]+)(:([^\s]+))?\s+in\s+([^}]+)}/,function(_,key,_,val,obj){if(!val){val=key;
key="$NULL$"+key_num
}var key_str="$I$"+key_num;
var callback="$CB$"+key_num;
key_num++;
code.push("(function("+callback+") {");
code.push("if (jindo.$Jindo.isArray("+obj+")) {");
code.push("for (var "+key_str+" = 0; "+key_str+" < "+obj+".length; "+key_str+"++) {");
code.push(callback+"("+key_str+", "+obj+"["+key_str+"]);");
code.push("}");
code.push("} else {");
code.push("for (var "+key_str+" in "+obj+") if ("+obj+".hasOwnProperty("+key_str+")) { ");
code.push(callback+"("+key_str+", "+obj+"["+key_str+"]);");
code.push("}");
code.push("}");
code.push("})(function("+key+", "+val+") {");
parsed=true;
return""
});
str=str.replace(/^{\/for}/,function(_){parsed=code.push("});");
return""
});
str=str.replace(/^{(else)?if\s+([^}]+)}/,function(_,iselse,expr){parsed=code.push((iselse?"} else ":"")+"if ("+expr+") {");
return""
});
str=str.replace(/^{else}/,function(_){parsed=code.push("} else {");
return""
});
str=str.replace(/^{\/if}/,function(_){parsed=code.push("}");
return""
})
}while(parsed);
code.push("}");
code.push('return $RET$.join("");');
var r=new Function("$ARG$",code.join("\n").replace(/\r/g,""));
return r
});
jindo.$Template.addEngine("micro",function(sTemplate){return new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+sTemplate.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');")
});
jindo.$Template.addEngine("handlebars",function(sTemplate){if(typeof Handlebars=="undefined"){throw new jindo.$Error(jindo.$Except.NOT_FOUND_HANDLEBARS,"$Template#process")
}return Handlebars.compile(sTemplate)
});
jindo.$Template.addEngine("simple",function(sTemplate){return function(oData){return sTemplate.replace(/\{\{([^{}]*)\}\}/g,function(sMatchA,sMatchB){return(typeof oData[sMatchB]=="undefined")?"":oData[sMatchB]
})
}
});
jindo.$Date=function(src){var a=arguments,t="";
var cl=arguments.callee;
if(src&&src instanceof cl){return src
}if(!(this instanceof cl)){var str="";
for(var i=0,l=a.length;
i<l;
i++){str+="a["+i+"],"
}var init=new Function("cl","a","return new cl("+str.replace(/,$/,"")+");");
try{jindo.$Jindo._maxWarn(arguments.length,7,"$Date");
return init(cl,a)
}catch(e){if(e instanceof TypeError){return null
}throw e
}}var oArgs=g_checkVarType(arguments,{"4voi":[],"4str":["src:String+"],"4num":["src:Numeric"],"4dat":["src:Date+"],"4num2":["src:Numeric","src:Numeric"],"4num3":["src:Numeric","src:Numeric","src:Numeric"],"4num4":["src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num5":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num6":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"],"4num7":["src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric","src:Numeric"]},"$Date");
switch(oArgs+""){case"4voi":this._date=new Date;
break;
case"4num":this._date=new Date(src*1);
break;
case"4str":if(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)))/.test(src)){this._date=jindo.$Date._makeISO(src)
}else{this._date=cl.parse(src)
}break;
case"4dat":(this._date=new Date).setTime(src.getTime());
this._date.setMilliseconds(src.getMilliseconds());
break;
case"4num2":case"4num3":case"4num4":case"4num5":case"4num6":case"4num7":for(var i=0;
i<7;
i++){if(!jindo.$Jindo.isNumeric(a[i])){a[i]=1
}}this._date=new Date(a[0],a[1],a[2],a[3],a[4],a[5],a[6])
}this._names={};
for(var i in jindo.$Date.names){if(jindo.$Date.names.hasOwnProperty(i)){this._names[i]=jindo.$Date.names[i]
}}};
jindo.$Date._makeISO=function(src){var match=src.match(/(\d{4})(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/);
var hour=parseInt(match[4]||0,10);
var min=parseInt(match[5]||0,10);
if(match[8]=="Z"){hour+=jindo.$Date.utc
}else{if(match[9]=="+"||match[9]=="-"){hour+=(jindo.$Date.utc-parseInt(match[9]+match[10],10));
min+=parseInt(match[9]+match[11],10)
}}return new Date(match[1]||0,parseInt(match[2]||0,10)-1,match[3]||0,hour,min,match[6]||0,match[7]||0)
};
jindo.$Date._paramCheck=function(aPram,sType){return g_checkVarType(aPram,{s:["nParm:Numeric"],g:[]},"$Date#"+sType)
};
jindo.$Date.names={month:["January","Febrary","March","April","May","June","July","August","September","October","Novermber","December"],s_month:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],day:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],s_day:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ampm:["AM","PM"]};
jindo.$Date.utc=9;
jindo.$Date.now=function(){if(Date.now){this.now=function(){return Date.now()
}
}else{this.now=function(){return +new Date()
}
}return this.now()
};
jindo.$Date.prototype.name=function(vName,aValue){var oArgs=g_checkVarType(arguments,{s4str:["sKey:String+","aValue:Array+"],s4obj:["oObject:Hash+"],g:["sKey:String+"]},"$Date#name");
switch(oArgs+""){case"s4str":this._names[vName]=aValue;
break;
case"s4obj":vName=oArgs.oObject;
for(var i in vName){if(vName.hasOwnProperty(i)){this._names[i]=vName[i]
}}break;
case"g":return this._names[vName]
}return this
};
jindo.$Date.parse=function(strDate){var oArgs=g_checkVarType(arguments,{"4str":["sKey:String+"]},"$Date#parse");
var date=new Date(Date.parse(strDate));
if(isNaN(date)||date=="Invalid Date"){throw new jindo.$Error(jindo.$Except.INVALID_DATE,"$Date#parse")
}return date
};
jindo.$Date.prototype.$value=function(){return this._date
};
jindo.$Date.prototype.format=function(strFormat){var oArgs=g_checkVarType(arguments,{"4str":["sFormat:String+"]},"$Date#format");
strFormat=oArgs.sFormat;
var o={};
var d=this._date;
var name=this._names;
var self=this;
return(strFormat||"").replace(/[a-z]/ig,function callback(m){if(o[m]!==undefined){return o[m]
}switch(m){case"d":case"j":o.j=d.getDate();
o.d=(o.j>9?"":"0")+o.j;
return o[m];
case"l":case"D":case"w":case"N":o.w=d.getDay();
o.N=o.w?o.w:7;
o.D=name.s_day[o.w];
o.l=name.day[o.w];
return o[m];
case"S":return(!!(o.S=["st","nd","rd"][d.getDate()]))?o.S:(o.S="th");
case"z":o.z=Math.floor((d.getTime()-(new Date(d.getFullYear(),0,1)).getTime())/(3600*24*1000));
return o.z;
case"m":case"n":o.n=d.getMonth()+1;
o.m=(o.n>9?"":"0")+o.n;
return o[m];
case"L":o.L=self.isLeapYear();
return o.L;
case"o":case"Y":case"y":o.o=o.Y=d.getFullYear();
o.y=(o.o+"").substr(2);
return o[m];
case"a":case"A":case"g":case"G":case"h":case"H":o.G=d.getHours();
o.g=(o.g=o.G%12)?o.g:12;
o.A=o.G<12?name.ampm[0]:name.ampm[1];
o.a=o.A.toLowerCase();
o.H=(o.G>9?"":"0")+o.G;
o.h=(o.g>9?"":"0")+o.g;
return o[m];
case"i":o.i=(((o.i=d.getMinutes())>9)?"":"0")+o.i;
return o.i;
case"s":o.s=(((o.s=d.getSeconds())>9)?"":"0")+o.s;
return o.s;
case"u":o.u=d.getMilliseconds();
return o.u;
case"U":o.U=self.time();
return o.U;
default:return m
}})
};
jindo.$Date.prototype.time=function(nTime){var oArgs=jindo.$Date._paramCheck(arguments,"time");
nTime=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setTime(nTime);
return this;
case"g":return this._date.getTime()
}};
jindo.$Date.prototype.year=function(nYear){var oArgs=jindo.$Date._paramCheck(arguments,"year");
nYear=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setFullYear(nYear);
return this;
case"g":return this._date.getFullYear()
}};
jindo.$Date.prototype.month=function(nMon){var oArgs=jindo.$Date._paramCheck(arguments,"month");
nMon=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setMonth(nMon);
return this;
case"g":return this._date.getMonth()
}};
jindo.$Date.prototype.date=function(nDate){var oArgs=jindo.$Date._paramCheck(arguments,"date");
nDate=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setDate(nDate);
return this;
case"g":return this._date.getDate()
}};
jindo.$Date.prototype.day=function(){return this._date.getDay()
};
jindo.$Date.prototype.hours=function(nHour){var oArgs=jindo.$Date._paramCheck(arguments,"hours");
nHour=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setHours(nHour);
return this;
case"g":return this._date.getHours()
}};
jindo.$Date.prototype.minutes=function(nMin){var oArgs=jindo.$Date._paramCheck(arguments,"minutes");
nMin=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setMinutes(nMin);
return this;
case"g":return this._date.getMinutes()
}};
jindo.$Date.prototype.seconds=function(nSec){var oArgs=jindo.$Date._paramCheck(arguments,"seconds");
nSec=oArgs.nParm;
switch(oArgs+""){case"s":this._date.setSeconds(nSec);
return this;
case"g":return this._date.getSeconds()
}};
jindo.$Date.prototype.isLeapYear=function(){var y=this._date.getFullYear();
return !(y%4)&&!!(y%100)||!(y%400)
};
jindo.$Date.prototype.compare=function(oDate,sType){var oArgs=g_checkVarType(arguments,{"4dat":["oDate:Date+"],"4str":["oDate:Date+","sType:String+"]},"$Date#compare");
oDate=oArgs.oDate;
sType=oArgs.sType;
if(!sType){return oDate-this._date
}else{if(sType==="s"){return Math.floor(oDate/1000)-Math.floor(this._date/1000)
}else{if(sType==="i"){return Math.floor(Math.floor(oDate/1000)/60)-Math.floor(Math.floor(this._date/1000)/60)
}else{if(sType==="h"){return Math.floor(Math.floor(Math.floor(oDate/1000)/60)/60)-Math.floor(Math.floor(Math.floor(this._date/1000)/60)/60)
}else{if(sType==="d"){return Math.floor(Math.floor(Math.floor(Math.floor(oDate/1000)/60)/60)/24)-Math.floor(Math.floor(Math.floor(Math.floor(this._date/1000)/60)/60)/24)
}else{if(sType==="m"){return oDate.getMonth()-this._date.getMonth()
}else{if(sType==="y"){return oDate.getFullYear()-this._date.getFullYear()
}}}}}}}};
var aClass=["$Agent","$Ajax","$A","$Cookie","$Date","$Document","$Element","$ElementList","$Event","$Form","$Fn","$H","$Json","$S","$Template"];
var sClass,oClass;
for(var i=0,l=aClass.length;
i<l;
i++){sClass=aClass[i];
oClass=jindo[sClass];
if(oClass){oClass.addExtension=(function(sClass){return function(sMethod,fpFunc){jindo._p_.addExtension(sClass,sMethod,fpFunc);
return this
}
})(sClass)
}}var hooks=["$Element","$Event"];
for(var i=0,l=hooks.length;
i<l;
i++){var _className=hooks[i];
if(jindo[_className]){jindo[_className].hook=(function(className){var __hook={};
return function(sName,vRevisionKey){var oArgs=jindo.$Jindo.checkVarType(arguments,{g:["sName:String+"],s4var:["sName:String+","vRevisionKey:Variant"],s4obj:["oObj:Hash+"]},"jindo."+className+".hook");
switch(oArgs+""){case"g":return __hook[oArgs.sName.toLowerCase()];
case"s4var":if(vRevisionKey==null){delete __hook[oArgs.sName.toLowerCase()]
}else{__hook[oArgs.sName.toLowerCase()]=vRevisionKey
}return this;
case"s4obj":var oObj=oArgs.oObj;
for(var i in oObj){__hook[i.toLowerCase()]=oObj[i]
}return this
}}
})(_className)
}}if(!jindo.$Jindo.isUndefined(window)&&!(jindo._p_._j_ag.indexOf("IEMobile")==-1&&jindo._p_._j_ag.indexOf("Mobile")>-1&&jindo._p_._JINDO_IS_SP)){(new jindo.$Element(window)).attach("unload",function(e){jindo.$Element.eventManager.cleanUpAll()
})
}if(typeof define==="function"&&define.amd&&define.amd.jindo){define("jindo",[],function(){return jindo
})
}jindo.Component=jindo.$Class({_htEventHandler:null,_htOption:null,$init:function(){this._htEventHandler={};
this._htOption={};
this._htOption._htSetter={};
this.constructor.$count=(this.constructor.$count||0)+1
},option:function(sName,vValue){switch(typeof sName){case"undefined":var oOption={};
for(var i in this._htOption){if(!(i=="htCustomEventHandler"||i=="_htSetter")){oOption[i]=this._htOption[i]
}}return oOption;
case"string":if(typeof vValue!="undefined"){if(sName=="htCustomEventHandler"){if(typeof this._htOption[sName]=="undefined"){this.attach(vValue)
}else{return this
}}this._htOption[sName]=vValue;
if(typeof this._htOption._htSetter[sName]=="function"){this._htOption._htSetter[sName](vValue)
}}else{return this._htOption[sName]
}break;
case"object":for(var sKey in sName){if(sKey=="htCustomEventHandler"){if(typeof this._htOption[sKey]=="undefined"){this.attach(sName[sKey])
}else{continue
}}if(sKey!=="_htSetter"){this._htOption[sKey]=sName[sKey]
}if(typeof this._htOption._htSetter[sKey]=="function"){this._htOption._htSetter[sKey](sName[sKey])
}}break
}return this
},optionSetter:function(sName,fSetter){switch(typeof sName){case"undefined":return this._htOption._htSetter;
case"string":if(typeof fSetter!="undefined"){this._htOption._htSetter[sName]=jindo.$Fn(fSetter,this).bind()
}else{return this._htOption._htSetter[sName]
}break;
case"object":for(var sKey in sName){this._htOption._htSetter[sKey]=jindo.$Fn(sName[sKey],this).bind()
}break
}return this
},fireEvent:function(sEvent,oEvent){oEvent=oEvent||{};
var fInlineHandler=this["on"+sEvent],aHandlerList=this._htEventHandler[sEvent]||[],bHasInlineHandler=typeof fInlineHandler=="function",bHasHandlerList=aHandlerList.length>0;
if(!bHasInlineHandler&&!bHasHandlerList){return true
}aHandlerList=aHandlerList.concat();
oEvent.sType=sEvent;
if(typeof oEvent._aExtend=="undefined"){oEvent._aExtend=[];
oEvent.stop=function(){if(oEvent._aExtend.length>0){oEvent._aExtend[oEvent._aExtend.length-1].bCanceled=true
}}
}oEvent._aExtend.push({sType:sEvent,bCanceled:false});
var aArg=[oEvent],i,nLen;
for(i=2,nLen=arguments.length;
i<nLen;
i++){aArg.push(arguments[i])
}if(bHasInlineHandler){fInlineHandler.apply(this,aArg)
}if(bHasHandlerList){var fHandler;
for(i=0,fHandler;
(fHandler=aHandlerList[i]);
i++){fHandler.apply(this,aArg)
}}return !oEvent._aExtend.pop().bCanceled
},attach:function(sEvent,fHandlerToAttach){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.attach(sEvent,fHandler)
},this).bind());
return this
}var aHandler=this._htEventHandler[sEvent];
if(typeof aHandler=="undefined"){aHandler=this._htEventHandler[sEvent]=[]
}aHandler.push(fHandlerToAttach);
return this
},detach:function(sEvent,fHandlerToDetach){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.detach(sEvent,fHandler)
},this).bind());
return this
}var aHandler=this._htEventHandler[sEvent];
if(aHandler){for(var i=0,fHandler;
(fHandler=aHandler[i]);
i++){if(fHandler===fHandlerToDetach){aHandler=aHandler.splice(i,1);
break
}}}return this
},detachAll:function(sEvent){var aHandler=this._htEventHandler;
if(arguments.length){if(typeof aHandler[sEvent]=="undefined"){return this
}delete aHandler[sEvent];
return this
}for(var o in aHandler){delete aHandler[o]
}return this
}});
jindo.Component.factory=function(aObject,htOption){var aReturn=[],oInstance;
if(typeof htOption=="undefined"){htOption={}
}for(var i=0,el;
(el=aObject[i]);
i++){oInstance=new this(el,htOption);
aReturn[aReturn.length]=oInstance
}return aReturn
};
jindo.Component.getInstance=function(){throw new Error("JC 1.11.0 or JMC 1.13.0 later, getInstance method of Component is not longer supported.")
};
jindo.Component.VERSION="1.12.0";
jindo.LazyLoading={_waLoading:jindo.$A([]),_waLoaded:jindo.$A([]),_whtScript:jindo.$H({}),_whtCallback:jindo.$H({})};
jindo.LazyLoading.load=function(sUrl,fCallback,sCharset){if(typeof fCallback!="function"){fCallback=function(){}
}if(sUrl instanceof Array){var fLoad=arguments.callee;
var bRet=true;
var nLen=sUrl.length;
var nRemained=nLen;
for(var i=0;
i<nLen;
i++){bRet&=this.load(sUrl[i],function(){nRemained--;
if(nRemained===0){fCallback()
}},sCharset)
}return bRet
}this._queueCallback(sUrl,fCallback);
if(this._checkIsLoading(sUrl)){return false
}if(this._checkAlreadyLoaded(sUrl)){this._doCallback(sUrl);
return true
}this._waLoading.push(sUrl);
var self=this;
var elHead=document.getElementsByTagName("head")[0];
var elScript=document.createElement("script");
elScript.type="text/javascript";
elScript.charset=sCharset||"utf-8";
elScript.src=sUrl;
this._whtScript.add(sUrl,elScript);
if("onload" in elScript){elScript.onload=function(){self._waLoaded.push(sUrl);
self._waLoading=self._waLoading.refuse(sUrl);
self._doCallback(sUrl)
}
}else{elScript.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){self._waLoaded.push(sUrl);
self._waLoading=self._waLoading.refuse(sUrl);
self._doCallback(sUrl);
this.onreadystatechange=null
}}
}elHead.appendChild(elScript);
return true
};
jindo.LazyLoading._queueCallback=function(sUrl,fCallback){var aCallback=this._whtCallback.$(sUrl);
if(aCallback){aCallback.push(fCallback)
}else{this._whtCallback.$(sUrl,[fCallback])
}};
jindo.LazyLoading._doCallback=function(sUrl){var aCallback=this._whtCallback.$(sUrl).concat();
for(var i=0;
i<aCallback.length;
i++){this._whtCallback.$(sUrl).splice(i,1);
aCallback[i]()
}};
jindo.LazyLoading.abort=function(sUrl){if(this._checkIsLoading(sUrl)){var elScript=this.getScriptElement(sUrl);
this._waLoading=this._waLoading.refuse(sUrl);
if("onload" in elScript){elScript.onload=null
}else{elScript.onreadystatechange=null
}jindo.$Element(elScript).leave();
this._whtScript.remove(sUrl);
this._whtCallback.remove(sUrl);
return true
}else{return false
}};
jindo.LazyLoading._checkAlreadyLoaded=function(sUrl){return this._waLoaded.has(sUrl)
};
jindo.LazyLoading._checkIsLoading=function(sUrl){return this._waLoading.has(sUrl)
};
jindo.LazyLoading.getLoaded=function(){return this._waLoaded.$value()
};
jindo.LazyLoading.getLoading=function(){return this._waLoading.$value()
};
jindo.LazyLoading.getScriptElement=function(sUrl){return this._whtScript.$(sUrl)||null
};
jindo.Timer=jindo.$Class({$init:function(){this._nTimer=null;
this._nLatest=null;
this._nRemained=0;
this._nDelay=null;
this._fRun=null;
this._bIsRunning=false
},start:function(fRun,nDelay){this.abort();
this._nRemained=0;
this._nDelay=nDelay;
this._fRun=fRun;
this._bIsRunning=true;
this._nLatest=this._getTime();
this.fireEvent("wait");
this._excute(this._nDelay,false);
return true
},isRunning:function(){return this._bIsRunning
},_getTime:function(){return new Date().getTime()
},_clearTimer:function(){var bFlag=false;
if(this._nTimer){clearTimeout(this._nTimer);
this._bIsRunning=false;
bFlag=true
}this._nTimer=null;
return bFlag
},abort:function(){this._clearTimer();
if(this._fRun){this.fireEvent("abort");
this._fRun=null;
return true
}return false
},pause:function(){var nPassed=this._getTime()-this._nLatest;
this._nRemained=Math.max(this._nDelay-nPassed,0);
return this._clearTimer()
},_excute:function(nDelay,bResetDelay){var self=this;
this._clearTimer();
this._bIsRunning=true;
var launcher=function(bDontUseTimer){if(!self._fRun){return
}if(self._nTimer||bDontUseTimer){self.fireEvent("run");
var r=self._fRun();
self._nLatest=self._getTime();
if(!r){if(!bDontUseTimer){clearTimeout(self._nTimer)
}self._nTimer=null;
self._bIsRunning=false;
self.fireEvent("end");
return
}self.fireEvent("wait");
self._excute(self._nDelay,false)
}};
if(nDelay>-1){this._nTimer=setTimeout(launcher,nDelay)
}else{launcher(true)
}},resume:function(){if(!this._fRun||this.isRunning()){return false
}this._bIsRunning=true;
this.fireEvent("wait");
this._excute(this._nRemained,true);
this._nRemained=0;
return true
}}).extend(jindo.Component);
jindo.UIComponent=jindo.$Class({$init:function(){this._bIsActivating=false
},isActivating:function(){return this._bIsActivating
},activate:function(){if(this.isActivating()){return this
}this._bIsActivating=true;
if(arguments.length>0){this._onActivate.apply(this,arguments)
}else{this._onActivate()
}return this
},deactivate:function(){if(!this.isActivating()){return this
}this._bIsActivating=false;
if(arguments.length>0){this._onDeactivate.apply(this,arguments)
}else{this._onDeactivate()
}return this
}}).extend(jindo.Component);
jindo.WatchInput=jindo.$Class({_bTimerRunning:false,_bFocused:false,_sPrevValue:"",$init:function(sInputId,htOption){var htDefaultOption={nInterval:100,bUseTimerOnIE:false,sKeyEvent:"keyup",bPermanent:false,bActivateOnload:true};
this.option(htDefaultOption);
this.option(htOption||{});
this._elInput=jindo.$(sInputId);
this._oTimer=new jindo.Timer();
this._bIE=jindo.$Agent().navigator().ie;
this._wfFocus=jindo.$Fn(this._onFocus,this);
this._wfBlur=jindo.$Fn(this._onBlur,this);
this._wfKeyEvent=jindo.$Fn(this._onKeyEvent,this);
this._wfStartTimer=jindo.$Fn(this._startTimer,this);
this._wfStopTimer=jindo.$Fn(this._stopTimer,this);
if(this.option("bActivateOnload")){this.activate(true)
}},getInput:function(){return this._elInput
},setInputValue:function(s){this.getInput().value=s;
this.setCompareValue(s);
return this
},getCompareValue:function(){return this._sPrevValue
},setCompareValue:function(s){this._sPrevValue=s;
return this
},fireChangeEvent:function(){var elInput=this.getInput(),sValue=elInput.value;
this.setCompareValue(sValue);
this.fireEvent("change",{elInput:elInput,sText:sValue});
return this
},start:function(bCompareOnce){return this.activate(bCompareOnce||false)
},stop:function(){return this.deactivate()
},_onActivate:function(bCompareOnce){this.setCompareValue("");
var elInput=this.getInput();
this._wfFocus.attach(elInput,"focus");
if(this._bIE&&!this.option("bUseTimerOnIE")){this.fireEvent("start");
this._wfKeyEvent.attach(elInput,this.option("sKeyEvent"))
}else{if(this._isTimerRunning()){return
}this.fireEvent("start");
if(this.option("bPermanent")){this._startTimer()
}else{this._wfStartTimer.attach(elInput,"focus");
this._wfStopTimer.attach(elInput,"blur")
}}this._wfBlur.attach(elInput,"blur");
if(bCompareOnce||false){this.compare()
}},_onDeactivate:function(){var elInput=this.getInput();
this._wfFocus.detach(elInput,"focus");
this._wfKeyEvent.detach(elInput,this.option("sKeyEvent"));
this._stopTimer();
this._wfStartTimer.detach(elInput,"focus");
this._wfStopTimer.detach(elInput,"blur");
this._wfBlur.detach(elInput,"blur");
this.fireEvent("stop")
},getInterval:function(){return this.option("nInterval")
},setInterval:function(n){this.option("nInterval",n);
return this
},_isTimerRunning:function(){return this._bTimerRunning
},_startTimer:function(){if(this._isTimerRunning()){return
}this._bTimerRunning=true;
this.fireEvent("timerStart");
this.compare();
var self=this;
this._oTimer.start(function(){self.compare();
return true
},this.getInterval())
},_stopTimer:function(){if(this._isTimerRunning()){this._oTimer.abort();
this._bTimerRunning=false;
this.compare();
this.fireEvent("timerStop")
}},_onKeyEvent:function(){this.compare()
},_onFocus:function(){this._bFocused=true;
this.fireEvent("focus")
},_onBlur:function(){this._bFocused=false;
this.fireEvent("blur")
},compare:function(){if(this.getInput().value!=this.getCompareValue()){this.fireChangeEvent()
}return this
}}).extend(jindo.UIComponent);
var raf=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;
var caf=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;
if(raf&&!caf){var keyInfo={};
var oldraf=raf;
raf=function(callback){function wrapCallback(){if(keyInfo[key]){callback()
}}var key=oldraf(wrapCallback);
keyInfo[key]=true;
return key
};
caf=function(key){delete keyInfo[key]
}
}else{if(!(raf&&caf)){raf=function(callback){return window.setTimeout(callback,16)
};
caf=window.clearTimeout
}}window.requestAnimationFrame=raf;
window.cancelAnimationFrame=caf;
jindo.m=(function(){var _isVertical=null,_nPreWidth=-1,_nRotateTimer=null,_htHandler={},_htDeviceInfo={},_htAddPatch={},_htOsInfo={},_htBrowserInfo={},_htTouchEventName={start:"mousedown",move:"mousemove",end:"mouseup",cancel:null},_htDeviceList={galaxyTab:["SHW-M180"],galaxyTab2:["SHW-M380"],galaxyS:["SHW-M110"],galaxyS2:["SHW-M250","GT-I9100"],galaxyS2LTE:["SHV-E110"],galaxyS3:["SHV-E210","SHW-M440","GT-I9300"],galaxyNote:["SHV-E160"],galaxyNote2:["SHV-E250"],galaxyNexus:["Galaxy Nexus"],optimusLte2:["LG-F160"],optimusVu:["LG-F100"],optimusLte:["LG-LU6200","LG-SU640","LG-F120K"]};
function _initTouchEventName(){if("ontouchstart" in window){_htTouchEventName.start="touchstart";
_htTouchEventName.move="touchmove";
_htTouchEventName.end="touchend";
_htTouchEventName.cancel="touchcancel"
}else{if(window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0){_htTouchEventName.start="MSPointerDown";
_htTouchEventName.move="MSPointerMove";
_htTouchEventName.end="MSPointerUp";
_htTouchEventName.cancel="MSPointerCancel"
}}}function _getOrientationChangeEvt(){var bEvtName="onorientationchange" in window?"orientationchange":"resize";
if((_htOsInfo.android&&_htOsInfo.version==="2.1")){bEvtName="resize"
}return bEvtName
}function _getVertical(){var bVertical=null,sEventType=_getOrientationChangeEvt();
if(sEventType==="resize"){var screenWidth=document.documentElement.clientWidth;
if(_nPreWidth==-1){bVertical=screenWidth<document.documentElement.clientHeight
}else{if(screenWidth<_nPreWidth){bVertical=true
}else{if(screenWidth==_nPreWidth){bVertical=_isVertical
}else{bVertical=false
}}}_nPreWidth=screenWidth
}else{var windowOrientation=window.orientation;
if(windowOrientation===0||windowOrientation==180){bVertical=true
}else{if(windowOrientation==90||windowOrientation==-90){bVertical=false
}}}return bVertical
}function _attachEvent(){var fnOrientation=jindo.$Fn(_onOrientationChange,this).attach(window,_getOrientationChangeEvt()).attach(window,"load");
var fnPageShow=jindo.$Fn(_onPageshow,this).attach(window,"pageshow")
}function _initDeviceInfo(){_setOsInfo();
_setBrowserInfo();
var sName=navigator.userAgent;
var ar=null;
function f(s,h){return((h||"").indexOf(s)>-1)
}_htDeviceInfo={iphone:_htOsInfo.iphone,ipad:_htOsInfo.ipad,android:_htOsInfo.android,win:f("Windows Phone",sName),galaxyTab:/SHW-M180/.test(sName),galaxyTab2:/SHW-M380/.test(sName),galaxyS:/SHW-M110/.test(sName),galaxyS2:/SHW-M250|GT-I9100/.test(sName),galaxyS2LTE:/SHV-E110/.test(sName),galaxyS3:/SHV-E210|SHW-M440|GT-I9300/.test(sName),galaxyNote:/SHV-E160/.test(sName),galaxyNote2:/SHV-E250/.test(sName),galaxyNexus:/Galaxy Nexus/.test(sName),optimusLte2:/LG-F160/.test(sName),optimusVu:/LG-F100/.test(sName),optimusLte:/LG-LU6200|LG-SU640|LG-F120K'/.test(sName),galaxyS4:/SHV-E300|GT-I9500|GT-I9505|SGH-M919|SPH-L720|SGH-I337|SCH-I545/.test(sName),bChrome:_htBrowserInfo.chrome,bSBrowser:_htBrowserInfo.bSBrowser,bInapp:false,version:_htOsInfo.version,browserVersion:_htBrowserInfo.version};
for(var x in _htDeviceInfo){if(typeof _htDeviceInfo[x]=="boolean"&&_htDeviceInfo[x]&&_htDeviceInfo.hasOwnProperty(x)){if(x[0]!=="b"){_htDeviceInfo.name=x
}}}_htDeviceInfo.samsung=/GT-|SCH-|SHV-|SHW-|SPH|SWT-|SGH-|EK-|Galaxy Nexus|SAMSUNG/.test(sName);
_htDeviceInfo.lg=/LG-/.test(sName);
_htDeviceInfo.pantech=/IM-/.test(sName);
if(_htDeviceInfo.iphone||_htDeviceInfo.ipad){if(!f("Safari",sName)){_htDeviceInfo.bInapp=true
}}else{if(_htDeviceInfo.android){sName=sName.toLowerCase();
if(f("inapp",sName)||f("app",sName.replace("applewebkit",""))){_htDeviceInfo.bInapp=true
}}}}function _setOsInfo(){_htOsInfo=jindo.$Agent().os();
_isInapp();
_htOsInfo.version=_htOsInfo.version||_getOsVersion();
_htOsInfo.ios=typeof _htOsInfo.ios=="undefined"?(_htOsInfo.ipad||_htOsInfo.iphone):_htOsInfo.ios
}function _setBrowserInfo(){_htBrowserInfo=jindo.$Agent().navigator();
if(_htOsInfo.ios&&/CriOS/.test(navigator.userAgent)){_htBrowserInfo.chrome=true
}if(typeof _htBrowserInfo.firefox=="undefined"){_htBrowserInfo.firefox=/Firefox/.test(navigator.userAgent)
}_isSBrowser();
_updateUnderVersion()
}function _updateUnderVersion(){if(_htBrowserInfo.msafari&&_htBrowserInfo.chrome){if(_htOsInfo.ios){_htBrowserInfo.version=parseFloat(navigator.userAgent.match(/CriOS[ \/]([0-9.]+)/)[1])
}else{_htBrowserInfo.version=parseFloat(navigator.userAgent.match(/Chrome[ \/]([0-9.]+)/)[1])
}}else{if(_htBrowserInfo.firefox){_htBrowserInfo.version=parseFloat(navigator.userAgent.match(/Firefox[ \/]([0-9.]+)/)[1])
}}}function _isInapp(){var sName=navigator.userAgent;
_htOsInfo.bInapp=false;
if(_htOsInfo.ios){if(sName.indexOf("Safari")==-1){_htOsInfo.bInapp=true
}}else{if(_htOsInfo.android){sName=sName.toLowerCase();
if(sName.indexOf("inapp")!=-1||sName.replace("applewebkit","").indexOf("app")!=-1){_htOsInfo.bInapp=true
}}}}function _isSBrowser(){_htBrowserInfo.bSBrowser=false;
var sUserAgent=navigator.userAgent;
var aMatchReturn=sUserAgent.match(/(SAMSUNG|Chrome)/gi)||"";
if(aMatchReturn.length>1){_htBrowserInfo.bSBrowser=true
}}function _getOsVersion(){if(!_htOsInfo.version){var sName=navigator.userAgent,sVersion="",ar;
if(_htOsInfo.iphone||_htOsInfo.ipad){ar=sName.match(/OS\s([\d|\_]+\s)/i);
if(ar!==null&&ar.length>1){sVersion=ar[1]
}}else{if(_htOsInfo.android){ar=sName.match(/Android\s([^\;]*)/i);
if(ar!==null&&ar.length>1){sVersion=ar[1]
}}else{if(_htOsInfo.mwin){ar=sName.match(/Windows Phone\s([^\;]*)/i);
if(ar!==null&&ar.length>1){sVersion=ar[1]
}}}}return sVersion.replace(/\_/g,".").replace(/\s/g,"")
}}function _onOrientationChange(we){var self=this;
if(we.type==="load"){_nPreWidth=document.documentElement.clientWidth;
if(!_htOsInfo.bInapp&&(_htOsInfo.iphone||_htOsInfo.ipad||_getOrientationChangeEvt()!=="resize")){_isVertical=_getVertical()
}else{if(_nPreWidth>document.documentElement.clientHeight){_isVertical=false
}else{_isVertical=true
}}return
}if(_getOrientationChangeEvt()==="resize"){setTimeout(function(){_orientationChange(we)
},0)
}else{var screenWidth=jindo.$Document().clientSize().width;
var nTime=300;
if(_htDeviceInfo.android){if(we.type=="orientationchange"&&screenWidth==_nPreWidth){setTimeout(function(){_onOrientationChange(we)
},500);
return false
}_nPreWidth=screenWidth
}clearTimeout(_nRotateTimer);
_nRotateTimer=setTimeout(function(){_orientationChange(we)
},nTime)
}}function _orientationChange(we){var nPreVertical=_isVertical;
_isVertical=_getVertical();
if(jindo.$Agent().navigator().mobile||jindo.$Agent().os().ipad){if(nPreVertical!==_isVertical){we.sType="rotate";
we.isVertical=_isVertical;
_fireEvent("mobilerotate",we)
}}}function _onPageshow(we){_isVertical=_getVertical();
we.sType="pageShow";
setTimeout(function(){_fireEvent("mobilePageshow",we)
},300)
}function _getTranslateOffsetFromCSSMatrix(element){var curTransform=new WebKitCSSMatrix(window.getComputedStyle(element).webkitTransform);
return{top:curTransform.m42,left:curTransform.m41}
}function _fireEvent(sType,ht){if(_htHandler[sType]){var aData=_htHandler[sType].concat();
for(var i=0,len=aData.length;
i<len;
i++){aData[i].call(this,ht)
}}}function _getTranslateOffsetFromStyle(element){var nTop=0,nLeft=0,aTemp=null,s=element.style[jindo.m.getCssPrefix()==""?"transform":jindo.m.getCssPrefix()+"Tranform"];
if(!!s&&s.length>0){aTemp=s.match(/translate.{0,2}\((.*)\)/);
if(!!aTemp&&aTemp.length>1){var a=aTemp[1].split(",");
if(!!a&&a.length>1){nTop=parseInt(a[1],10);
nLeft=parseInt(a[0],10)
}}}return{top:nTop,left:nLeft}
}var __M__={MOVETYPE:{0:"hScroll",1:"vScroll",2:"dScroll",3:"tap",4:"longTap",5:"doubleTap",6:"pinch",7:"rotate",8:"pinch-rotate"},sVersion:"unknown",$init:function(){_initDeviceInfo();
_initTouchEventName();
_attachEvent()
},bindRotate:function(fHandlerToBind){var aHandler=_htHandler.mobilerotate;
if(typeof aHandler=="undefined"){aHandler=_htHandler.mobilerotate=[]
}aHandler.push(fHandlerToBind)
},unbindRotate:function(fHandlerToUnbind){var aHandler=_htHandler.mobilerotate;
if(aHandler){for(var i=0,fHandler;
(fHandler=aHandler[i]);
i++){if(fHandler===fHandlerToUnbind){aHandler.splice(i,1);
break
}}}},bindPageshow:function(fHandlerToBind){var aHandler=_htHandler.mobilePageshow;
if(typeof aHandler=="undefined"){aHandler=_htHandler.mobilePageshow=[]
}aHandler.push(fHandlerToBind)
},unbindPageshow:function(fHandlerToUnbind){var aHandler=_htHandler.mobilePageshow;
if(aHandler){for(var i=0,fHandler;
(fHandler=aHandler[i]);
i++){if(fHandler===fHandlerToUnbind){aHandler.splice(i,1);
break
}}}},getDeviceInfo:function(){return _htDeviceInfo
},getOsInfo:function(){return _htOsInfo
},getBrowserInfo:function(){return _htBrowserInfo
},isVertical:function(){if(_isVertical===null){_isVertical=_getVertical();
return _isVertical
}else{return _isVertical
}},getNodeElement:function(el){while(el.nodeType!=1){el=el.parentNode
}return el
},getTranslateOffset:function(wel){wel=jindo.$Element(wel);
var element=wel.$value(),htOffset;
if(_htOsInfo.android&&parseInt(_htOsInfo.version,10)===3){htOffset=_getTranslateOffsetFromStyle(element)
}else{if("WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()){htOffset=_getTranslateOffsetFromCSSMatrix(element)
}else{htOffset=_getTranslateOffsetFromStyle(element)
}}return htOffset
},getStyleOffset:function(wel){var nLeft=parseInt(wel.css("left"),10),nTop=parseInt(wel.css("top"),10);
nLeft=isNaN(nLeft)?0:nLeft;
nTop=isNaN(nTop)?0:nTop;
return{left:nLeft,top:nTop}
},attachTransitionEnd:function(element,fHandlerToBind){var nVersion=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
if(nVersion>230){element._jindo_fn_=jindo.$Fn(fHandlerToBind,this).attach(element,"transitionend")
}else{var sEvent=((this.getCssPrefix()==="ms")?"MS":this.getCssPrefix())+"TransitionEnd";
element.addEventListener(sEvent,fHandlerToBind,false)
}},detachTransitionEnd:function(element,fHandlerToUnbind){var nVersion=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
if(nVersion>230){if(element._jindo_fn_){element._jindo_fn_.detach(element,"transitionend");
delete element._jindo_fn_
}}else{var sEvent=((this.getCssPrefix()==="ms")?"MS":this.getCssPrefix())+"TransitionEnd";
element.removeEventListener(sEvent,fHandlerToUnbind,false)
}},_attachFakeJindo:function(element,fn,sEvent){var nVersion=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
var wfn=null;
if(nVersion<230&&(typeof _notSupport!=="undefined")){wfn=_notSupport.$Fn(fn).attach(element,sEvent)
}else{wfn=jindo.$Fn(fn).attach(element,sEvent)
}return wfn
},_getTouchEventName:function(){return _htTouchEventName
},getCssPrefix:function(){var sCssPrefix="";
if(typeof document.body.style.webkitTransition!=="undefined"){sCssPrefix="webkit"
}else{if(typeof document.body.style.transition!=="undefined"){}else{if(typeof document.body.style.MozTransition!=="undefined"){sCssPrefix="Moz"
}else{if(typeof document.body.style.OTransition!=="undefined"){sCssPrefix="O"
}else{if(typeof document.body.style.msTransition!=="undefined"){sCssPrefix="ms"
}}}}}jindo.m.getCssPrefix=function(){return sCssPrefix
};
return sCssPrefix
},getClosest:function(sSelector,elBaseElement){var elClosest;
var welBaseElement=jindo.$Element(elBaseElement);
var reg=/<\/?(?:h[1-5]|[a-z]+(?:\:[a-z]+)?)[^>]*>/ig;
if(reg.test(sSelector)){if("<"+elBaseElement.tagName.toUpperCase()+">"==sSelector.toUpperCase()){elClosest=elBaseElement
}else{elClosest=welBaseElement.parent(function(v){if("<"+v.$value().tagName.toUpperCase()+">"==sSelector.toUpperCase()){return v
}});
elClosest=elClosest.length?elClosest[0].$value():false
}}else{if(sSelector.indexOf(".")==0){sSelector=sSelector.substring(1,sSelector.length)
}if(welBaseElement.hasClass(sSelector)){elClosest=elBaseElement
}else{elClosest=welBaseElement.parent(function(v){if(v.hasClass(sSelector)){return v
}});
elClosest=elClosest.length?elClosest[0].$value():false
}}return elClosest
},useCss3d:function(isLongRange){if(_htAddPatch.useCss3d&&typeof _htAddPatch.useCss3d=="function"){switch(_htAddPatch.useCss3d()){case -1:return false;
case 1:return true
}}if(typeof isLongRange==="undefined"){isLongRange=false
}var bRet=false;
if(_htBrowserInfo.chrome&&_htBrowserInfo.version<"25"&&!_htBrowserInfo.bSBrowser){return bRet
}if(_htOsInfo.ios){bRet=true
}else{if(_htBrowserInfo.firefox){bRet=true
}else{if(_htOsInfo.android){var s=navigator.userAgent.match(/\(.*\)/);
if(s instanceof Array&&s.length>0){s=s[0]
}if(_htOsInfo.version>="4.1.0"){if(/EK-GN120|SM-G386F/.test(s)){bRet=false
}else{bRet=true
}}else{if(_htOsInfo.version>="4.0"){bRet=true
}if(_htOsInfo.version>="4.0.3"&&/SHW-|SHV-|GT-|SCH-|SGH-|SPH-|LG-F160|LG-F100|LG-F180|LG-F200|EK-|IM-A|LG-F240|LG-F260/.test(s)&&!/SHW-M420|SHW-M200|GT-S7562/.test(s)){bRet=true
}}}}}return bRet
},patch:function(ver){_htAddPatch.ver=ver;
return this
},_checkPatchVersion:function(){var aVer=jindo.m.Component.VERSION.split("."),sVer=aVer.slice(0,3).join(".");
if(_htAddPatch.ver>=sVer){return true
}return false
},add:function(htOption){if(this._checkPatchVersion()){for(var i in htOption){_htAddPatch[i]=htOption[i]
}}return this
},getDeviceName:function(){if(_htAddPatch.getDeviceName&&typeof _htAddPatch.getDeviceName=="function"){if(_htAddPatch.getDeviceName()){return _htAddPatch.getDeviceName()
}}var sUserAgent=navigator.userAgent;
for(var i in _htDeviceList){if(eval("/"+_htDeviceList[i].join("|")+"/").test(sUserAgent)){return i;
break
}}var htInfo=jindo.$Agent().os();
for(var x in htInfo){if(htInfo[x]===true&&htInfo.hasOwnProperty(x)){return x;
break
}}},useFixed:function(){if(_htAddPatch.useFixed&&typeof _htAddPatch.useFixed=="function"){switch(_htAddPatch.useFixed()){case -1:return false;
case 1:return true
}}var isFixed=false;
if(_htBrowserInfo.chrome||_htBrowserInfo.firefox||(_htOsInfo.android&&parseInt(_htOsInfo.version,10)>=3)||(_htOsInfo.ios&&parseInt(_htOsInfo.version,10)>=5)||(_htOsInfo.mwin&&parseInt(_htOsInfo.version,10)>=8)){isFixed=true
}return isFixed
},useTimingFunction:function(isLongRange){if(_htAddPatch.useTimingFunction&&typeof _htAddPatch.useTimingFunction=="function"&&_htAddPatch.useTimingFunction()){switch(_htAddPatch.useTimingFunction()){case -1:return false;
case 1:return true
}}if(typeof isLongRange==="undefined"){isLongRange=false
}var bUse=this.useCss3d();
if(_htOsInfo.android){bUse=false;
if(!isLongRange&&_htOsInfo.version>="4.3"){bUse=true
}}else{if(_htOsInfo.ios&&parseInt(_htOsInfo.version,10)>=6){bUse=isLongRange?true:false
}}return bUse
},_cacheMaxClientSize:{},_fullSizeCheckElement:null,_allEventStop:function(fp,type){if(!this._htEvent){this._htEvent={}
}if(type=="detach"){this._htEvent.touchstart.detach(document.body,"touchstart").detach(document.body,"touchmove");
this._htEvent={}
}else{if(!this._htEvent.touchstart&&type=="attach"){this._htEvent.touchstart=jindo.$Fn(fp,this).attach(document.body,"touchstart").attach(document.body,"touchmove")
}}},_stopDefault:function(e){e.stop()
},_hasOrientation:window.orientation!==undefined,_maxClientSize:function(fpCallBack,bInit){var _htOsInfo=this.getOsInfo();
this._allEventStop(this._stopDefault,"attach");
if(!this._fullSizeCheckElement){this._fullSizeCheckElement=document.createElement("div")
}var delay=_htOsInfo.android?500:100;
delay=bInit?1:delay;
var type;
if(this._hasOrientation){type=Math.abs(window.orientation/90)%2;
delay=this._cacheMaxClientSize[type]!==undefined?0:delay
}var that=this;
if(document.body.scrollTop<=1){document.body.appendChild(that._fullSizeCheckElement);
that._fullSizeCheckElement.style.cssText="position:absolute; top: 0px; width:100%;height:"+parseInt(window.innerHeight+200,10)+"px;";
window.scrollTo(0,1);
setTimeout(function(){that._checkSize(that._hasOrientation,that._cacheMaxClientSize,type,fpCallBack,that,delay)
},delay)
}else{this._fullSizeCheckElement.style.height=window.innerHeight+"px";
this._checkSize(this._hasOrientation,this._cacheMaxClientSize,type,fpCallBack,that,delay)
}},_checkSize:function(hasOrientation,cacheMaxClientSize,type,fpCallBack,that,delay){var _htOsInfo=this.getOsInfo();
var _htBrowserInfo=this.getBrowserInfo();
this._allEventStop(this._stopDefault,"attach");
var size;
if(hasOrientation&&cacheMaxClientSize[type]){size=cacheMaxClientSize[type]
}else{that._fullSizeCheckElement.style.cssText="position:absolute; top: 0px; width:100%;height:"+window.innerHeight+"px;overflow:hidden";
size=_htBrowserInfo.mobile||_htOsInfo.ipad?{width:window.innerWidth,height:window.innerHeight}:{width:document.documentElement.clientWidth,height:document.documentElement.clientHeight};
if(hasOrientation){cacheMaxClientSize[type]=size
}}fpCallBack.call(that,size);
var self=this;
this._allEventStop(this._stopDefault,"detach");
if(delay===0){this._fullSizeCheckElement.style.height="0px"
}else{setTimeout(function(){self._fullSizeCheckElement.style.height="0px"
},delay)
}},hasOffsetBug:function(){if(_htAddPatch.hasOffsetBug&&typeof _htAddPatch.hasOffsetBug=="function"){switch(_htAddPatch.hasOffsetBug()){case -1:return false;
case 1:return true
}}var bResult=false;
if(_htOsInfo.android){if(_htBrowserInfo.chrome||_htBrowserInfo.firefox){bResult=false
}else{if(_htOsInfo.version<"4"){bResult=true
}else{bResult=false
}}}else{bResult=false
}return bResult
},hasClickBug:function(){if(_htAddPatch.hasClickBug&&typeof _htAddPatch.hasClickBug=="function"){switch(_htAddPatch.hasClickBug()){case -1:return false;
case 1:return true
}}return(_htOsInfo.ios||(window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0)||false)
},_getTranslate:function(sX,sY,bUseCss3d){bUseCss3d=(typeof bUseCss3d=="undefined"?true:bUseCss3d);
return"translate"+(bUseCss3d?"3d(":"(")+sX+","+sY+(bUseCss3d?",0)":")")
},_toPrefixStr:function(str){if(str.length<=0){return str
}str=this.getCssPrefix()==""?str.charAt(0).toLowerCase()+str.substr(1):str.charAt(0).toUpperCase()+str.substr(1);
return this.getCssPrefix()+str
}};
__M__._isUseFixed=__M__.useFixed;
__M__._isUseTimingFunction=__M__.useTimingFunction;
__M__._isUseCss3d=__M__.useCss3d;
__M__.getCssOffset=__M__.getTranslateOffset;
__M__.$init();
return __M__
})();
if(!("mixin" in jindo.$Jindo)){jindo.$Jindo.mixin=function(oDestination,oSource){var oReturn={};
for(var i in oDestination){oReturn[i]=oDestination[i]
}for(i in oSource){if(oSource.hasOwnProperty(i)&&typeof oSource[i]!="undefined"){oReturn[i]=oSource[i]
}}return oReturn
}
}jindo.m.Effect=function(fEffect){if(this instanceof arguments.callee){throw new Error("You can't create a instance of this")
}var rxNumber=/^(\-?[0-9\.]+)(%|\w+)?$/,rxRGB=/^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i,rxRGBA=/^rgba\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+),\s?([0-9\.]+)\)$/i,rxHSL=/^hsl\(([0-9\.]+)\s?,\s?([0-9\.]+)%\s?,\s?([0-9\.]+)%\)$/i,rxHSLA=/^hsla\(([0-9\.]+)\s?,\s?([0-9\.]+)%\s?,\s?([0-9\.]+)%,\s?([0-9\.]+)\)$/i,rxHex=/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,rx3to6=/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i;
var getUnitAndValue=function(v){var nValue=v,sUnit;
if(rxNumber.test(v)){nValue=parseFloat(v);
sUnit=RegExp.$2||""
}else{if(rxRGB.test(v)){nValue=[parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10),1];
sUnit="color"
}else{if(rxRGBA.test(v)){nValue=[parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10),parseFloat(RegExp.$4,10)];
sUnit="color"
}else{if(rxHSL.test(v)){nValue=hsl2rgb(parseFloat(RegExp.$1,10),parseFloat(RegExp.$2,10)/100,parseFloat(RegExp.$3,10)/100,1);
nValue.push(1);
sUnit="color"
}else{if(rxHSLA.test(v)){nValue=hsl2rgb(parseFloat(RegExp.$1,10),parseFloat(RegExp.$2,10)/100,parseFloat(RegExp.$3,10)/100,1);
nValue.push(parseFloat(RegExp.$4,10));
sUnit="color"
}else{if(rxHex.test(v=v.replace(rx3to6,"#$1$1$2$2$3$3"))){nValue=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16),1];
sUnit="color"
}else{throw new Error("unit error ("+v+")")
}}}}}}return{nValue:nValue,sUnit:sUnit}
};
var fExplode=function(sStr){var aRet=[];
sStr.replace(/([^\s]+\([^\)]*\)|[^\s]+)\s?/g,function(_,a){aRet.push(a)
});
return aRet
};
var getUnitAndValueList=function(v){var aList=fExplode(v?v+"":"0");
var aRet=[];
for(var i=0,nLen=aList.length;
i<nLen;
i++){aRet.push(getUnitAndValue(aList[i]))
}return aRet
};
var copy=function(oValue){if(typeof oValue==="object"){return{nValue:oValue.nValue,sUnit:oValue.sUnit}
}return oValue
};
var hsl2rgb=function(H,S,L){var C=(1-Math.abs((2*L)-1))*S;
var H_=H/60;
var X=C*(1-Math.abs((H_%2)-1));
var R1,G1,B1;
if(H===undefined||isNaN(H)||H===null){R1=G1=B1=0
}else{if(H_>=0&&H_<1){R1=C;
G1=X;
B1=0
}else{if(H_>=1&&H_<2){R1=X;
G1=C;
B1=0
}else{if(H_>=2&&H_<3){R1=0;
G1=C;
B1=X
}else{if(H_>=3&&H_<4){R1=0;
G1=X;
B1=C
}else{if(H_>=4&&H_<5){R1=X;
G1=0;
B1=C
}else{if(H_>=5&&H_<6){R1=C;
G1=0;
B1=X
}}}}}}}var m=L-(C/2);
return[Math.round((R1+m)*255),Math.round((G1+m)*255),Math.round((B1+m)*255)]
};
return function(sStart,sEnd){var aStart,aEnd;
var fParse=function(){var bChanged=false;
if(fReturn.start!==sStart){aStart=getUnitAndValueList(fReturn.start);
sStart=fReturn.start;
bChanged=true
}if(fReturn.end!==sEnd){aEnd=getUnitAndValueList(fReturn.end);
sEnd=fReturn.end;
bChanged=true
}if(bChanged){var nLen=Math.max(aStart.length,aEnd.length);
var oStart,oEnd;
if(aStart.length!==aEnd.length&&nLen>1){switch(aStart.length){case 1:aStart[1]=copy(aStart[2]=copy(aStart[3]=copy(aStart[0])));
break;
case 2:aStart[2]=copy(aStart[0]),aStart[3]=copy(aStart[1]);
break;
case 3:aStart[3]=copy(aStart[1]);
break
}switch(aEnd.length){case 1:aEnd[1]=aEnd[2]=aEnd[3]=aEnd[0];
break;
case 2:aEnd[2]=aEnd[0],aEnd[3]=aEnd[1];
break;
case 3:aEnd[3]=aEnd[1];
break
}}for(var i=0;
i<nLen;
i++){oStart=aStart[i];
oEnd=aEnd[i];
if(oStart.nValue===0){oStart.sUnit=oEnd.sUnit
}else{if(oEnd.nValue===0){oEnd.sUnit=oStart.sUnit
}}if(oStart.sUnit!=oEnd.sUnit){throw new Error("unit error ("+sStart+", "+sEnd+")")
}}}};
var fReturn=function(p){var aRet=[];
fParse();
var oStart,oEnd;
var nStart,nEnd,sUnit;
for(var i=0,nLen=Math.max(aStart.length,aEnd.length);
i<nLen;
i++){oStart=aStart[i];
oEnd=aEnd[i];
nStart=oStart.nValue;
nEnd=oEnd.nValue;
sUnit=oStart.sUnit;
var nValue=fEffect(p),getResult=function(s,d,sUnit){return(d-s)*nValue+s+(sUnit||0)
};
if(sUnit=="color"){var alpha=getResult(nStart[3],nEnd[3],0);
if(alpha===1){var r=Math.max(0,Math.min(255,Math.round(getResult(nStart[0],nEnd[0],0))))<<16;
r|=Math.max(0,Math.min(255,Math.round(getResult(nStart[1],nEnd[1],0))))<<8;
r|=Math.max(0,Math.min(255,Math.round(getResult(nStart[2],nEnd[2],0))));
r=r.toString(16).toUpperCase();
for(var j=0;
6-r.length;
j++){r="0"+r
}aRet.push("#"+r)
}else{aRet.push("rgba("+[Math.round(getResult(nStart[0],nEnd[0],0)),Math.round(getResult(nStart[1],nEnd[1],0)),Math.round(getResult(nStart[2],nEnd[2],0)),getResult(nStart[3],nEnd[3],0)].join(",")+")")
}continue
}aRet.push(getResult(nStart,nEnd,sUnit))
}return aRet.join(" ")
};
switch(arguments.length){case 0:break;
case 1:sEnd=sStart||"0";
sStart="0";
fReturn.setStart=function(sStart){this.start=sStart
};
break
}fReturn.start=sStart;
fReturn.end=sEnd;
fReturn.effectConstructor=arguments.callee;
sStart=sEnd=null;
if(arguments.length>1){fParse()
}return fReturn
}
};
jindo.m.Effect.linear=jindo.m.Effect(function(s){return s
});
jindo.m.Effect.linear.toString=function(){return"linear"
};
jindo.m.Effect.easeInSine=jindo.m.Effect(function(s){return(s==1)?1:-Math.cos(s*(Math.PI/2))+1
});
jindo.m.Effect.easeOutSine=jindo.m.Effect(function(s){return Math.sin(s*(Math.PI/2))
});
jindo.m.Effect.easeInOutSine=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInSine(0,1)(2*s)*0.5:jindo.m.Effect.easeOutSine(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInSine=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutSine(0,1)(2*s)*0.5:jindo.m.Effect.easeInSine(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInQuad=jindo.m.Effect(function(s){return s*s
});
jindo.m.Effect.easeOutQuad=jindo.m.Effect(function(s){return -(s*(s-2))
});
jindo.m.Effect.easeInOutQuad=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInQuad(0,1)(2*s)*0.5:jindo.m.Effect.easeOutQuad(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInQuad=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutQuad(0,1)(2*s)*0.5:jindo.m.Effect.easeInQuad(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInCubic=jindo.m.Effect(function(s){return Math.pow(s,3)
});
jindo.m.Effect.easeOutCubic=jindo.m.Effect(function(s){return Math.pow((s-1),3)+1
});
jindo.m.Effect.easeInOutCubic=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeIn(0,1)(2*s)*0.5:jindo.m.Effect.easeOut(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInCubic=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOut(0,1)(2*s)*0.5:jindo.m.Effect.easeIn(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInQuart=jindo.m.Effect(function(s){return Math.pow(s,4)
});
jindo.m.Effect.easeOutQuart=jindo.m.Effect(function(s){return -(Math.pow(s-1,4)-1)
});
jindo.m.Effect.easeInOutQuart=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInQuart(0,1)(2*s)*0.5:jindo.m.Effect.easeOutQuart(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInQuart=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutQuart(0,1)(2*s)*0.5:jindo.m.Effect.easeInQuart(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInQuint=jindo.m.Effect(function(s){return Math.pow(s,5)
});
jindo.m.Effect.easeOutQuint=jindo.m.Effect(function(s){return Math.pow(s-1,5)+1
});
jindo.m.Effect.easeInOutQuint=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInQuint(0,1)(2*s)*0.5:jindo.m.Effect.easeOutQuint(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInQuint=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutQuint(0,1)(2*s)*0.5:jindo.m.Effect.easeInQuint(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInCircle=jindo.m.Effect(function(s){return -(Math.sqrt(1-(s*s))-1)
});
jindo.m.Effect.easeOutCircle=jindo.m.Effect(function(s){return Math.sqrt(1-(s-1)*(s-1))
});
jindo.m.Effect.easeInOutCircle=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInCircle(0,1)(2*s)*0.5:jindo.m.Effect.easeOutCircle(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInCircle=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutCircle(0,1)(2*s)*0.5:jindo.m.Effect.easeInCircle(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInBack=jindo.m.Effect(function(s){var n=1.70158;
return(s==1)?1:(s/1)*(s/1)*((1+n)*s-n)
});
jindo.m.Effect.easeOutBack=jindo.m.Effect(function(s){var n=1.70158;
return(s===0)?0:(s=s/1-1)*s*((n+1)*s+n)+1
});
jindo.m.Effect.easeInOutBack=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInBack(0,1)(2*s)*0.5:jindo.m.Effect.easeOutBack(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInElastic=jindo.m.Effect(function(s){var p=0,a=0,n;
if(s===0){return 0
}if((s/=1)==1){return 1
}if(!p){p=0.3
}if(!a||a<1){a=1;
n=p/4
}else{n=p/(2*Math.PI)*Math.asin(1/a)
}return -(a*Math.pow(2,10*(s-=1))*Math.sin((s-1)*(2*Math.PI)/p))
});
jindo.m.Effect.easeOutElastic=jindo.m.Effect(function(s){var p=0,a=0,n;
if(s===0){return 0
}if((s/=1)==1){return 1
}if(!p){p=0.3
}if(!a||a<1){a=1;
n=p/4
}else{n=p/(2*Math.PI)*Math.asin(1/a)
}return(a*Math.pow(2,-10*s)*Math.sin((s-n)*(2*Math.PI)/p)+1)
});
jindo.m.Effect.easeInOutElastic=jindo.m.Effect(function(s){var p=0,a=0,n;
if(s===0){return 0
}if((s=s/(1/2))==2){return 1
}if(!p){p=(0.3*1.5)
}if(!a||a<1){a=1;
n=p/4
}else{n=p/(2*Math.PI)*Math.asin(1/a)
}if(s<1){return -0.5*(a*Math.pow(2,10*(s-=1))*Math.sin((s-n)*(2*Math.PI)/p))
}return a*Math.pow(2,-10*(s-=1))*Math.sin((s-n)*(2*Math.PI)/p)*0.5+1
});
jindo.m.Effect.easeOutBounce=jindo.m.Effect(function(s){if(s<(1/2.75)){return(7.5625*s*s)
}else{if(s<(2/2.75)){return(7.5625*(s-=(1.5/2.75))*s+0.75)
}else{if(s<(2.5/2.75)){return(7.5625*(s-=(2.25/2.75))*s+0.9375)
}else{return(7.5625*(s-=(2.625/2.75))*s+0.984375)
}}}});
jindo.m.Effect.easeInBounce=jindo.m.Effect(function(s){return 1-jindo.m.Effect.easeOutBounce(0,1)(1-s)
});
jindo.m.Effect.easeInOutBounce=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInBounce(0,1)(2*s)*0.5:jindo.m.Effect.easeOutBounce(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeInExpo=jindo.m.Effect(function(s){return(s===0)?0:Math.pow(2,10*(s-1))
});
jindo.m.Effect.easeOutExpo=jindo.m.Effect(function(s){return(s==1)?1:-Math.pow(2,-10*s/1)+1
});
jindo.m.Effect.easeInOutExpo=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeInExpo(0,1)(2*s)*0.5:jindo.m.Effect.easeOutExpo(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect.easeOutInExpo=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.easeOutExpo(0,1)(2*s)*0.5:jindo.m.Effect.easeInExpo(0,1)((2*s)-1)*0.5+0.5
});
jindo.m.Effect._cubicBezier=function(x1,y1,x2,y2){return function(t){var cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;
function sampleCurveX(t){return((ax*t+bx)*t+cx)*t
}function sampleCurveY(t){return((ay*t+by)*t+cy)*t
}function sampleCurveDerivativeX(t){return(3*ax*t+2*bx)*t+cx
}function solveCurveX(x,epsilon){var t0,t1,t2,x2,d2,i;
for(t2=x,i=0;
i<8;
i++){x2=sampleCurveX(t2)-x;
if(Math.abs(x2)<epsilon){return t2
}d2=sampleCurveDerivativeX(t2);
if(Math.abs(d2)<0.000001){break
}t2=t2-x2/d2
}t0=0;
t1=1;
t2=x;
if(t2<t0){return t0
}if(t2>t1){return t1
}while(t0<t1){x2=sampleCurveX(t2);
if(Math.abs(x2-x)<epsilon){return t2
}if(x>x2){t0=t2
}else{t1=t2
}t2=(t1-t0)*0.5+t0
}return t2
}return sampleCurveY(solveCurveX(t,1/200))
}
};
jindo.m.Effect.cubicBezier=function(x1,y1,x2,y2){var f=jindo.m.Effect(jindo.m.Effect._cubicBezier(x1,y1,x2,y2));
var cssTimingFunction="cubic-bezier("+[x1,y1,x2,y2].join(",")+")";
f.toString=function(){return cssTimingFunction
};
return f
};
jindo.m.Effect.cubicEase=jindo.m.Effect.cubicBezier(0.25,0.1,0.25,1);
jindo.m.Effect.cubicEaseIn=jindo.m.Effect.cubicBezier(0.42,0,1,1);
jindo.m.Effect.cubicEaseOut=jindo.m.Effect.cubicBezier(0,0,0.58,1);
jindo.m.Effect.cubicEaseInOut=jindo.m.Effect.cubicBezier(0.42,0,0.58,1);
jindo.m.Effect.cubicEaseOutIn=jindo.m.Effect.cubicBezier(0,0.42,1,0.58);
jindo.m.Effect.overphase=jindo.m.Effect(function(s){s/=0.652785;
return(Math.sqrt((2-s)*s)+(0.1*s)).toFixed(5)
});
jindo.m.Effect.sinusoidal=jindo.m.Effect(function(s){return(-Math.cos(s*Math.PI)/2)+0.5
});
jindo.m.Effect.mirror=jindo.m.Effect(function(s){return(s<0.5)?jindo.m.Effect.sinusoidal(0,1)(s*2):jindo.m.Effect.sinusoidal(0,1)(1-(s-0.5)*2)
});
jindo.m.Effect.pulse=function(nPulse){return jindo.m.Effect(function(s){return(-Math.cos((s*(nPulse-0.5)*2)*Math.PI)/2)+0.5
})
};
jindo.m.Effect.wave=function(nPeriod,nHeight){return jindo.m.Effect(function(s){return(nHeight||1)*(Math.sin(nPeriod*(s*360)*Math.PI/180)).toFixed(5)
})
};
jindo.m.Effect.stepStart=jindo.m.Effect(function(s){return s===0?0:1
});
jindo.m.Effect.stepEnd=jindo.m.Effect(function(s){return s===1?1:0
});
jindo.m.Effect.easeIn=jindo.m.Effect.easeInCubic;
jindo.m.Effect.easeOut=jindo.m.Effect.easeOutCubic;
jindo.m.Effect.easeInOut=jindo.m.Effect.easeInOutCubic;
jindo.m.Effect.easeOutIn=jindo.m.Effect.easeOutInCubic;
jindo.m.Effect.bounce=jindo.m.Effect.easeOutBounce;
jindo.m.Effect.elastic=jindo.m.Effect.easeInElastic;
jindo.m.Component=jindo.$Class({_htEventHandler:null,_htOption:null,$init:function(){this._htEventHandler={};
this._htOption={};
this._htOption._htSetter={};
this.constructor.$count=(this.constructor.$count||0)+1
},option:function(sName,vValue){switch(typeof sName){case"undefined":var oOption={};
for(var i in this._htOption){if(!(i=="htCustomEventHandler"||i=="_htSetter")){oOption[i]=this._htOption[i]
}}return oOption;
case"string":if(typeof vValue!="undefined"){if(sName=="htCustomEventHandler"){if(typeof this._htOption[sName]=="undefined"){this.attach(vValue)
}else{return this
}}this._htOption[sName]=vValue;
if(typeof this._htOption._htSetter[sName]=="function"){this._htOption._htSetter[sName](vValue)
}}else{return this._htOption[sName]
}break;
case"object":for(var sKey in sName){if(sKey=="htCustomEventHandler"){if(typeof this._htOption[sKey]=="undefined"){this.attach(sName[sKey])
}else{continue
}}if(sKey!=="_htSetter"){this._htOption[sKey]=sName[sKey]
}if(typeof this._htOption._htSetter[sKey]=="function"){this._htOption._htSetter[sKey](sName[sKey])
}}break
}return this
},optionSetter:function(sName,fSetter){switch(typeof sName){case"undefined":return this._htOption._htSetter;
case"string":if(typeof fSetter!="undefined"){this._htOption._htSetter[sName]=jindo.$Fn(fSetter,this).bind()
}else{return this._htOption._htSetter[sName]
}break;
case"object":for(var sKey in sName){this._htOption._htSetter[sKey]=jindo.$Fn(sName[sKey],this).bind()
}break
}return this
},fireEvent:function(sEvent,oEvent){oEvent=oEvent||{};
var fInlineHandler=this["on"+sEvent],aHandlerList=this._htEventHandler[sEvent]||[],bHasInlineHandler=typeof fInlineHandler=="function",bHasHandlerList=aHandlerList.length>0;
if(!bHasInlineHandler&&!bHasHandlerList){return true
}aHandlerList=aHandlerList.concat();
oEvent.sType=sEvent;
if(typeof oEvent._aExtend=="undefined"){oEvent._aExtend=[];
oEvent.stop=function(){if(oEvent._aExtend.length>0){oEvent._aExtend[oEvent._aExtend.length-1].bCanceled=true
}}
}oEvent._aExtend.push({sType:sEvent,bCanceled:false});
var aArg=[oEvent],i,nLen;
for(i=2,nLen=arguments.length;
i<nLen;
i++){aArg.push(arguments[i])
}if(bHasInlineHandler){fInlineHandler.apply(this,aArg)
}if(bHasHandlerList){var fHandler;
for(i=0,fHandler;
(fHandler=aHandlerList[i]);
i++){fHandler.apply(this,aArg)
}}return !oEvent._aExtend.pop().bCanceled
},attach:function(sEvent,fHandlerToAttach){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.attach(sEvent,fHandler)
},this).bind());
return this
}var aHandler=this._htEventHandler[sEvent];
if(typeof aHandler=="undefined"){aHandler=this._htEventHandler[sEvent]=[]
}aHandler.push(fHandlerToAttach);
return this
},detach:function(sEvent,fHandlerToDetach){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.detach(sEvent,fHandler)
},this).bind());
return this
}var aHandler=this._htEventHandler[sEvent];
if(aHandler){for(var i=0,fHandler;
(fHandler=aHandler[i]);
i++){if(fHandler===fHandlerToDetach){aHandler=aHandler.splice(i,1);
break
}}}return this
},detachAll:function(sEvent){var aHandler=this._htEventHandler;
if(arguments.length){if(typeof aHandler[sEvent]=="undefined"){return this
}delete aHandler[sEvent];
return this
}for(var o in aHandler){delete aHandler[o]
}return this
}});
jindo.m.Component.factory=function(aObject,htOption){var aReturn=[],oInstance;
if(typeof htOption=="undefined"){htOption={}
}for(var i=0,el;
(el=aObject[i]);
i++){oInstance=new this(el,htOption);
aReturn[aReturn.length]=oInstance
}return aReturn
};
jindo.m.Component.getInstance=function(){throw new Error("JC 1.11.0 or JMC 1.13.0 later, getInstance method of Component is not longer supported.")
};
jindo.m.Component.VERSION="1.14.0-MAIN";
jindo.m.Morph=jindo.$Class({$init:function(oOptions){this.option({fEffect:jindo.m.Effect.linear,bUseTransition:true}).option(oOptions);
var oStyle=document.body.style;
this._bTransitionSupport=("transition" in oStyle||"webkitTransition" in oStyle||"MozTransition" in oStyle||"OTransition" in oStyle||"msTransition" in oStyle);
var oAgent=jindo.$Agent();
var oOS=oAgent.os();
var oNavigator=oAgent.navigator();
this._bHasTransformRenderBug=oOS.ios&&parseInt(oOS.version,10)===5&&oNavigator.msafari;
this._aQueue=[];
this._aIngItem=null;
this._oTimer=null;
this._bPlaying=null;
this._nPtr=0;
this._nPausePassed=0;
this._aRepeat=[];
this._sTransitionEnd=(("webkitTransition" in oStyle&&"webkitTransitionEnd")||("transition" in oStyle&&"transitionend")||("MozTransition" in oStyle&&"transitionend")||("OTransition" in oStyle&&"oTransitionEnd")||("msTransition" in oStyle&&"MSTransitionEnd"))
},pushAnimate:function(nDuration,aLists){if(aLists&&!(aLists instanceof Array)){throw Error("aLists should be a instance of Array")
}aLists=[].concat(aLists);
aLists.duration=nDuration;
this._aQueue.push(aLists);
return this
},pushKeyframe:function(nDuration,oKeyframe){this._aQueue.push({action:"keyframe",args:{duration:nDuration,keyframe:oKeyframe}});
return this
},pushWait:function(nDuration){var oMorph;
for(var i=0,nLen=arguments.length;
i<nLen;
i++){var vItem=arguments[i];
if(vItem instanceof this.constructor){this._aQueue.push(vItem)
}else{this.pushAnimate(vItem,[])
}}return this
},pushCall:function(fpCallback){this._aQueue.push(fpCallback);
return this
},pushRepeatStart:function(nTimes){if(typeof nTimes==="undefined"){nTimes=1
}var sLabel="L"+Math.round(new Date().getTime()*Math.random());
this._aRepeat.push(sLabel);
this._pushLabel(sLabel,nTimes);
return this
},_pushLabel:function(sLabel,nTimes){if(typeof nTimes==="undefined"){nTimes=Infinity
}this._aQueue.push({action:"label",args:{label:sLabel,times:nTimes}});
return this
},pushRepeatEnd:function(){var self=this;
var sLabel=this._aRepeat.pop();
var fpLoop=function(){var nIndex=self._getLabelIndex(sLabel);
if(nIndex===-1){throw"Repeat calls don't matched."
}var aLabelItem=this._aQueue[nIndex];
aLabelItem.args.count=aLabelItem.args.count||0;
if(++aLabelItem.args.count<aLabelItem.args.times){self._goto(nIndex+1)
}};
fpLoop.__repeat_end=sLabel;
this.pushCall(fpLoop);
return this
},_waitMorph:function(oMorph){var self=this;
if(!oMorph.isPlaying()){return true
}var fHandler=function(){oMorph.detach("end",fHandler).detach("pause",fHandler);
self._flushQueue()
};
oMorph.attach("end",fHandler).attach("pause",fHandler);
return false
},_getLabelIndex:function(sLabel){var aItem=null;
for(var i=0,nLen=this._aQueue.length;
i<nLen;
i++){aItem=this._aQueue[i];
if(aItem.action==="label"&&aItem.args.label===sLabel){return i
}}return -1
},_getRepeatEndIndex:function(sLabel,nFrom){var aItem=null;
for(var i=nFrom||0,nLen=this._aQueue.length;
i<nLen;
i++){aItem=this._aQueue[i];
if(aItem instanceof Function&&aItem.__repeat_end===sLabel){return i
}}return -1
},_flushQueue:function(){var bSync,aItem;
var self=this;
var oKeyframe,nPausePassed,aCompiledItem;
do{bSync=false;
aItem=this._aIngItem=this._aQueue[this._nPtr];
if(!aItem){this._bPlaying=false;
if(!aItem){this.fireEvent("end")
}return
}this._nPtr++;
if(aItem instanceof Function){aItem.call(this);
bSync=true;
continue
}else{if(aItem instanceof this.constructor){bSync=this._waitMorph(aItem);
continue
}else{if(typeof aItem==="number"){setTimeout(function(){self._flushQueue()
},aItem);
continue
}else{if(aItem.action==="label"){delete aItem.args.count;
if(aItem.args.times<1){var nIndex=this._getRepeatEndIndex(aItem.args.label,this._nPtr);
if(nIndex>-1){this._goto(nIndex+1)
}}bSync=true;
continue
}else{if(aItem.action==="goto"){this._goto(aItem.args.label);
bSync=true;
continue
}else{if(aItem.action==="keyframe"){oKeyframe=aItem.args.keyframe;
nPausePassed=this._nPausePassed;
aCompiledItem=this._aCompiledItem=aItem.args;
bSync=aCompiledItem.duration<0;
if(bSync){this._processKeyframe(1,oKeyframe);
continue
}this._playKeyframe(nPausePassed,oKeyframe);
this._nPausePassed=0;
continue
}}}}}}aCompiledItem=this._aCompiledItem;
nPausePassed=this._nPausePassed;
if(!nPausePassed){aCompiledItem=this._aCompiledItem=this._compileItem(aItem)
}else{for(var i=0,nLen=aCompiledItem.length;
i<nLen;
i++){aCompiledItem[i].sTimingFunc=""
}aCompiledItem.allCSS=false
}if(aCompiledItem.length===0){setTimeout(function(){self._flushQueue()
},aCompiledItem.duration);
continue
}bSync=aCompiledItem.duration<0;
if(bSync){this._processItem(1,true);
continue
}this._playItem(nPausePassed);
this._nPausePassed=0
}while(bSync)
},_playKeyframe:function(nPausePassed,oKeyframe){var self=this;
this._nStart=new Date().getTime()-nPausePassed;
var aCompiledItem=this._aCompiledItem;
var nDuration=aCompiledItem.duration;
(function _animationLoop(){self._oTimer=self._requestAnimationFrame(function(){var nStart=self._nStart;
if(self._oTimer===null){return
}self._oTimer=null;
var nPer=Math.min(1,Math.max(0,(new Date().getTime()-nStart)/nDuration));
oKeyframe.frame(nPer);
if(nPer<1){_animationLoop()
}else{self.fireEvent("timerEnd");
self._flushQueue()
}})
})()
},_playItem:function(nPausePassed){var self=this;
this._nStart=new Date().getTime()-nPausePassed;
this._nIng=2;
if(!nPausePassed){this._processItem(0,true,3,true)
}var aCompiledItem=this._aCompiledItem;
if(!aCompiledItem.allCSS){this._animationLoop(true)
}else{this._nIng--
}(function(){var aTransitionCache=self._processItem(1,true,1).transitionCache;
if(!aTransitionCache||aCompiledItem.duration===0){if(--self._nIng===0){self._flushQueue()
}return
}var welObj=null;
var nLen=aTransitionCache.length;
for(var i=0;
i<nLen;
i++){welObj=aTransitionCache[i];
break
}var fpNext=function(bPause){var oItem;
var aShouldReset=[];
while(oItem=aTransitionCache.pop()){oItem.css(self._getCSSKey("transitionDuration"),"0.0001ms");
aShouldReset.push(oItem)
}aTransitionCache=null;
(window.requestAnimationFrame||window.setTimeout)(function(){while(oItem=aShouldReset.pop()){oItem.css(self._getCSSKey("transitionDuration"),"0");
oItem.css(self._getCSSKey("transitionProperty"),"none")
}aShouldReset=null
},0);
self.fireEvent("transitionEnd");
if(--self._nIng===0&&!bPause){self._requestAnimationFrame(function(){self._flushQueue()
})
}};
if(!welObj){fpNext();
return
}var elObj=welObj.$value();
var fpOnTransitionEnd=function(bPause){elObj.removeEventListener(self._sTransitionEnd,self._fpOnTransitionEnd,true);
self._fpOnTransitionEnd=null;
fpNext(bPause===true)
};
self._fpOnTransitionEnd=function(evt){fpOnTransitionEnd(evt)
};
elObj.addEventListener(self._sTransitionEnd,self._fpOnTransitionEnd,true)
})()
},_animationLoop:function(bSetStatic){var self=this;
this._oTimer=this._requestAnimationFrame(function(){var nStart=self._nStart;
var nDuration=self._aCompiledItem.duration;
if(self._oTimer===null){return
}self._oTimer=null;
var nPer=Math.min(1,Math.max(0,(new Date().getTime()-nStart)/nDuration));
self._processItem(nPer,bSetStatic,2);
if(nPer<1){self._animationLoop()
}else{self.fireEvent("timerEnd");
if(--self._nIng===0){self._flushQueue()
}}})
},_processKeyframe:function(nRate,oKeyframe){oKeyframe.preprocess().frame(nRate)
},_processItem:function(nRate,bSetStatic,nTargetType,bPause){var oRet={normalPropsToPause:[],transitionCache:[]};
var aNormalPropsToPause=oRet.normalPropsToPause;
var aTransitionCache=oRet.transitionCache;
var self=this;
var aCompiledItem=this._aCompiledItem;
var nDuration=aCompiledItem.duration;
if(nDuration===0){nDuration=1
}else{if(nDuration<0){nDuration=0
}}var oObj,welObj,oProps;
var vProp,nType;
var bFirstCSS=true;
var sStyleKey;
var bHasTransformRenderBug=this._bHasTransformRenderBug;
nTargetType=nTargetType||(1|2);
if(!this.fireEvent("beforeProgress",{nRate:nRate})){return
}var aLists=[],oListProp;
for(var i=0,oItem;
oItem=aCompiledItem[i];
i++){oObj=oItem.oObj;
welObj=oItem.welObj;
oProps=oItem.oProps;
var sObjTimingFunc=oItem.sTimingFunc;
if(sObjTimingFunc&&(nTargetType&1)){welObj&&welObj.$value().clientHeight;
if(!("@transition" in oProps)&&!bPause){if(!("@transitionProperty" in oProps)){welObj.css(this._getCSSKey("transitionProperty"),"all")
}if(!("@transitionDuration" in oProps)){welObj.css(this._getCSSKey("transitionDuration"),(nDuration/1000).toFixed(3)+"s")
}if(!("@transitionTimingFunction" in oProps)){welObj.css(this._getCSSKey("transitionTimingFunction"),sObjTimingFunc)
}}aTransitionCache.push(welObj)
}oListProp={};
aLists.push(oObj,oListProp);
if(bPause&&nRate===1&&"@transform" in oProps&&/AppleWebKit\/534\.30/.test(navigator.userAgent)){welObj.css(this._getCSSKey("transform"),"");
oObj.clientHeight
}for(var sKey in oProps){if(oProps.hasOwnProperty(sKey)){vProp=oProps[sKey];
sStyleKey=/^@(.*)$/.test(sKey)&&RegExp.$1;
nType=sObjTimingFunc&&sStyleKey?1:2;
if(!(nTargetType&nType)){continue
}if(typeof vProp==="function"){vProp=vProp(nRate)
}else{if(!bSetStatic){continue
}}if(sStyleKey){if(/transition/.test(sKey)){vProp=this._getCSSVal(vProp)
}if(bHasTransformRenderBug&&"@transform"===sKey&&("@left" in oProps||"@top" in oProps)){oObj.clientHeight
}welObj.css(this._getCSSKey(sStyleKey),vProp)
}else{if(bPause){aNormalPropsToPause.push([oObj,sKey,vProp])
}else{oObj[sKey]=vProp
}}oListProp[sKey]=vProp
}}}this.fireEvent("progress",{aLists:aLists,nRate:nRate});
return oRet
},_compileItem:function(aItem){var bFoundShouldTimer=aItem.length==0;
var aRet=[];
aRet.duration=aItem.duration;
var oObj,welObj,oProps;
var vDepa,vDest;
var oCompiledProps;
var bIsStyleKey,sStyleKey;
var fDefaultEffect=this.option("fEffect");
for(var i=0,nLen=aItem.length;
i<nLen;
i+=2){var fObjEffect,sObjTimingFunc=null;
oObj=aItem[i];
welObj=jindo.$Element(oObj);
oProps=aItem[i+1];
oCompiledProps={};
var bHasProps=false;
for(var sKey in oProps){if(oProps.hasOwnProperty(sKey)){var fPropEffect,sPropTimingFunc;
vDest=oProps[sKey];
bIsStyleKey=/^@(.*)$/.test(sKey);
sStyleKey=RegExp.$1;
if(vDest instanceof Array){vDepa=vDest[0];
vDest=vDest[1]
}else{if(bIsStyleKey){vDepa=welObj.css(this._getCSSKey(sStyleKey))
}else{vDepa=oObj[sKey]
}}vDepa=(vDepa===0?vDepa:vDepa||"");
fPropEffect=typeof vDest==="function"?vDest.effectConstructor:fDefaultEffect;
sPropTimingFunc=this._getEffectCSS(fPropEffect)||"";
if(/^@transform$/.test(sKey)){if(typeof vDest==="function"){vDest=vDest.end
}oCompiledProps[sKey]=this._getTransformFunction(vDepa,vDest,fPropEffect,oObj);
if(jindo.m){var osInfo=jindo.m.getOsInfo();
if(/matrix/.test(vDepa)||/matrix/.test(vDest)){if(osInfo.android&&parseFloat(osInfo.version)<3){sPropTimingFunc=""
}}}}else{try{if(typeof vDest==="function"){if("setStart" in vDest){vDest.setStart(vDepa)
}oCompiledProps[sKey]=vDest
}else{oCompiledProps[sKey]=fPropEffect(vDepa,vDest)
}}catch(e){if(!/^unit error/.test(e.message)){throw e
}oCompiledProps[sKey]=vDest
}}var fProp=oCompiledProps[sKey];
if(typeof fProp==="function"&&fProp(0)===fProp(1)){delete oCompiledProps[sKey];
continue
}if(bIsStyleKey){if(sObjTimingFunc===null){sObjTimingFunc=sPropTimingFunc
}else{if(sObjTimingFunc!==sPropTimingFunc){sObjTimingFunc=""
}}}else{sPropTimingFunc=""
}bFoundShouldTimer=bFoundShouldTimer||!sObjTimingFunc;
bHasProps=true
}}if(!welObj.visible()){sObjTimingFunc=null,bFoundShouldTimer=true
}bHasProps&&aRet.push({oObj:oObj,welObj:welObj,oProps:oCompiledProps,sTimingFunc:sObjTimingFunc})
}aRet.allCSS=!bFoundShouldTimer;
return aRet
},play:function(){if(!this._bPlaying){this._bPlaying=true;
this.fireEvent("play");
this._flushQueue()
}return this
},reset:function(){return this._goto(0)
},pause:function(nRate){if(!this._bPlaying){return this
}this._cancelAnimationFrame(this._oTimer);
this._oTimer=null;
var aCompiledItem=this._aCompiledItem;
var nDuration=aCompiledItem.duration;
if(typeof nRate==="undefined"){var nPassed=new Date().getTime()-this._nStart;
nRate=nPassed/nDuration
}nRate=Math.max(0,Math.min(1,nRate));
var aNormalPropsToPause=null;
if(aCompiledItem.keyframe){this._processKeyframe(nRate,aCompiledItem.keyframe)
}else{aNormalPropsToPause=this._processItem(nRate,true,3,true).normalPropsToPause
}this._nPtr--;
this._nPausePassed=Math.round(nDuration*nRate);
if(this._fpOnTransitionEnd){this._fpOnTransitionEnd(true)
}if(aNormalPropsToPause){for(var i=0,nLen=aNormalPropsToPause.length;
i<nLen;
i++){var aNormalProp=aNormalPropsToPause[i];
aNormalProp[0][aNormalProp[1]]=aNormalProp[2]
}}this._bPlaying=false;
this.fireEvent("pause");
return this
},_goto:function(nIndex){var sLabel=nIndex;
if(typeof nIndex==="number"){nIndex=nIndex||0
}else{nIndex=this._getLabelIndex(sLabel);
if(nIndex===-1){throw"Label not found"
}nIndex++
}this._nPtr=nIndex;
this._nPausePassed=0;
return this
},isPlaying:function(){return this._bPlaying||false
},clear:function(){this._aQueue.length=0;
this._aRepeat.length=0;
this._nPtr=0;
this._nPausePassed=0;
return this
},_getPointer:function(){return this._nPtr
},_oProperPrefix:{},_getProperPrefix:function(sType){var oProperPrefix=this._oProperPrefix;
if(sType in oProperPrefix){return oProperPrefix[sType]
}var oBodyStyle=document.body.style;
var aPrefix=["webkit","","Moz","O","ms"];
var sPrefix,sFullType;
for(var i=0,nLen=aPrefix.length;
i<nLen;
i++){sPrefix=aPrefix[i];
sFullType=sPrefix+(sPrefix?sType.replace(/^[a-z]/,function(s){return s.toUpperCase()
}):sType);
if(sFullType in oBodyStyle){return(oProperPrefix[sType]=sPrefix)
}}return(oProperPrefix[sType]="")
},_getCSSKey:function(sName){var self=this;
var sPrefix="";
var sFullname=sName.replace(/^(\-(webkit|o|moz|ms)\-)?([a-z]+)/,function(_0,_1,_sPrefix,sType){sPrefix=_sPrefix||self._getProperPrefix(sType);
if(sPrefix){sType=sType.replace(/^[a-z]/,function(s){return s.toUpperCase()
})
}return sType
}).replace(/\-(\w)/g,function(_,sChar){return sChar.toUpperCase()
});
return(({o:"O",moz:"Moz",webkit:"Webkit"})[sPrefix]||sPrefix)+sFullname
},_getCSSVal:function(sName){var self=this;
var sFullname=sName.replace(/(^|\s)(\-(webkit|moz|o|ms)\-)?([a-z]+)/g,function(_0,sHead,_2,sPrefix,sType){sPrefix=sPrefix||self._getProperPrefix(sType);
return sHead+(sPrefix&&"-"+sPrefix+"-")+sType
});
return sFullname
},_parseTransformText:function(sText){sText=sText||"";
var oRet={};
sText.replace(/([\w\-]+)\(([^\)]*)\)/g,function(_,sKey,sVal){var aVal=sVal.split(/\s*,\s*/);
switch(sKey){case"translate3d":case"scale3d":case"skew3d":sKey=sKey.replace(/3d$/,"");
oRet[sKey+"Z"]=aVal[2];
case"translate":case"scale":case"skew":oRet[sKey+"X"]=aVal[0];
if(typeof aVal[1]==="undefined"){if(sKey==="scale"){oRet[sKey+"Y"]=aVal[0]
}}else{oRet[sKey+"Y"]=aVal[1]
}break;
default:oRet[sKey]=aVal.join(",");
break
}});
return oRet
},_getMatrixObj:function(sTransform,elBox){sTransform=sTransform.replace(/\b(translate(3d)?)\(\s*([^,]+)\s*,\s*([^,\)]+)/g,function(_1,key,_2,x,y){if(/%$/.test(x)){x=parseFloat(x)/100*elBox.offsetWidth+"px"
}if(/%$/.test(y)){y=parseFloat(y)/100*elBox.offsetHeight+"px"
}return key+"("+x+","+y
}).replace(/\b(translate([XY]))\(\s*([^\)]+)/g,function(_,key,type,val){if(type==="X"&&/%$/.test(val)){val=parseFloat(val)/100*elBox.offsetWidth+"px"
}else{if(type==="Y"&&/%$/.test(val)){val=parseFloat(val)/100*elBox.offsetHeight+"px"
}}return key+"("+val
});
var getMatrixValue;
var CSSMatrix=window.WebKitCSSMatrix||window.MSCSSMatrix||window.OCSSMatrix||window.MozCSSMatrix||window.CSSMatrix;
if(CSSMatrix){getMatrixValue=function(sTransform){return new CSSMatrix(sTransform).toString()
}
}else{var sID="M"+Math.round(new Date().getTime()*Math.random());
var sTransformKey="-"+(jindo.$Agent().navigator().firefox?"moz":"o")+"-transform";
var elStyleTag=document.createElement("style");
elStyleTag.type="text/css";
var elHTML=document.getElementsByTagName("html")[0];
elHTML.insertBefore(elStyleTag,elHTML.firstChild);
var oSheet=elStyleTag.sheet||elStyleTag.styleSheet;
var elDummy=document.createElement("div");
elDummy.id=sID;
var oComputedStyle=window.getComputedStyle(elDummy,null);
getMatrixValue=function(sTransform){try{oSheet.insertRule("#"+sID+" { "+sTransformKey+": "+sTransform+" !important; }",0);
document.body.insertBefore(elDummy,document.body.firstChild);
return oComputedStyle.getPropertyValue(sTransformKey)
}finally{document.body.removeChild(elDummy);
oSheet.deleteRule(0)
}}
}var sVal=getMatrixValue(sTransform);
if(/^([^\(]+)\(([^\)]*)\)$/.test(sVal)){return{key:RegExp.$1,val:RegExp.$2.replace(/\s*,\s*/g," ")}
}return null
},_convertMatrix3d:function(oTransformObj){if(oTransformObj.key==="matrix3d"){return oTransformObj
}var aVal=oTransformObj.val.split(" ");
oTransformObj.key="matrix3d";
aVal.splice(2,0,"0");
aVal.splice(3,0,"0");
aVal.splice(6,0,"0");
aVal.splice(7,0,"0");
aVal.splice(8,0,"0");
aVal.splice(9,0,"0");
aVal.splice(10,0,"1");
aVal.splice(11,0,"0");
aVal.splice(14,0,"0");
aVal.splice(15,0,"1");
oTransformObj.val=aVal.join(" ");
return oTransformObj
},_getTransformFunction:function(sDepa,sDest,fEffect,elBox){var self=this;
var sKey;
var oDepa,oDest;
if(/matrix/.test(sDepa+sDest)){oDepa=this._getMatrixObj(sDepa,elBox);
oDest=this._getMatrixObj(sDest,elBox);
if(oDepa.key!==oDest.key){oDepa=this._convertMatrix3d(oDepa);
oDest=this._convertMatrix3d(oDest)
}fEffect=fEffect(oDepa.val,oDest.val);
return function(nRate){return nRate===1?sDest:oDepa.key+"("+fEffect(nRate).replace(/ /g,",")+")"
}
}oDepa=this._parseTransformText(sDepa);
oDest=this._parseTransformText(sDest);
var oProp={};
for(sKey in oDepa){if(oDepa.hasOwnProperty(sKey)){oProp[sKey]=fEffect(oDepa[sKey],oDest[sKey]||(/^scale/.test(sKey)?1:0))
}}for(sKey in oDest){if(oDest.hasOwnProperty(sKey)&&!(sKey in oDepa)){oProp[sKey]=fEffect(oDepa[sKey]||(/^scale/.test(sKey)?1:0),oDest[sKey])
}}var fpFunc=function(nRate){var aRet=[];
for(var sKey in oProp){if(oProp.hasOwnProperty(sKey)){aRet.push(sKey+"("+oProp[sKey](nRate)+")")
}}return aRet.join(" ")
};
return fpFunc
},_getEffectCSS:function(fEffect){var bUseTransition=this.option("bUseTransition")&&this._bTransitionSupport;
if(!bUseTransition){return null
}if((this._htEventHandler.progress&&this._htEventHandler.progress.length)||(this._htEventHandler.beforeProgress&&this._htEventHandler.beforeProgress.length)){return null
}switch(fEffect){case jindo.m.Effect.linear:return"linear";
break;
case jindo.m.Effect.cubicEase:return"ease";
break;
case jindo.m.Effect.cubicEaseIn:return"ease-in";
break;
case jindo.m.Effect.cubicEaseOut:return"ease-out";
break;
case jindo.m.Effect.cubicEaseInOut:return"ease-in-out";
break;
default:if(fEffect.cubicBezier&&Math.max.apply(Math,fEffect.cubicBezier)<=1&&Math.min.apply(Math,fEffect.cubicBezier)>=0){return"cubic-bezier("+fEffect.cubicBezier.join(",")+")"
}break
}return null
},_requestAnimationFrame:function(fFunc){var ret;
var self=this;
var fWrap=function(){if(ret===self._oLastRAF){self._oLastRAF=null;
fFunc()
}};
if(window.requestAnimationFrame){ret=requestAnimationFrame(fWrap)
}else{ret=setTimeout(fWrap,1000/60)
}return(this._oLastRAF=ret)
},_cancelAnimationFrame:function(nTimer){var ret;
if(window.cancelAnimationFrame){ret=cancelAnimationFrame(nTimer)
}else{ret=clearTimeout(nTimer)
}this._oLastRAF=null;
return ret
}}).extend(jindo.m.Component);
jindo.m.UIComponent=jindo.$Class({$init:function(){this._bIsActivating=false
},isActivating:function(){return this._bIsActivating
},activate:function(){if(this.isActivating()){return this
}this._bIsActivating=true;
if(arguments.length>0){this._onActivate.apply(this,arguments)
}else{this._onActivate()
}return this
},deactivate:function(){if(!this.isActivating()){return this
}this._bIsActivating=false;
if(arguments.length>0){this._onDeactivate.apply(this,arguments)
}else{this._onDeactivate()
}return this
}}).extend(jindo.m.Component);
jindo.m.Animation=jindo.$Class({$init:function(htUserOption){this.option({bUseH:true,bHasOffsetBug:false,fEffect:jindo.m.Effect.cubicEaseOut,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction()});
this.option(htUserOption||{});
this._initVar()
},_initVar:function(el){this.sCssPrefix=jindo.m.getCssPrefix();
this._htTans=this.option("bUseCss3d")?{open:"3d(",end:",0)"}:{open:"(",end:")"};
this._oMorph=new jindo.m.Morph({fEffect:this.option("fEffect"),bUseTransition:this.option("bUseTimingFunction")}).attach({end:jindo.$Fn(function(we){this._oMorph.clear();
this.fireEvent("end",we)
},this).bind()});
this._welTarget=null
},setStyle:function(){},move:function(nX,nY,nDuration,option){},getTarget:function(isWrapper){if(isWrapper){return this._welTarget
}else{return this._welTarget.$value()
}},p:function(str){return jindo.m._toPrefixStr(str)
},getTranslate:function(sX,sY){return"translate"+this._htTans.open+sX+","+sY+this._htTans.end
},toCss:function(ht){var p,pResult,prefix,htResult={};
for(p in ht){pResult=p;
if(/^@/.test(p)){p.match(/^(@\w)/);
prefix=RegExp.$1;
if(/transition|transform/.test(pResult)){if(this.sCssPrefix==""){pResult=p.replace(prefix,prefix.toLowerCase())
}else{pResult=p.replace(prefix,prefix.toUpperCase())
}pResult=pResult.replace("@",this.sCssPrefix)
}else{pResult=pResult.replace("@","")
}}htResult[pResult]=ht[p]
}return htResult
},isPlaying:function(){return this._oMorph.isPlaying()
},stop:function(nMode){if(typeof nMode==="undefined"){nMode=0
}this._oMorph.pause(nMode).clear()
},destroy:function(){this._oMorph.detachAll("end")
}}).extend(jindo.m.UIComponent);
jindo.m.Flicking=jindo.$Class({$init:function(sId,htUserOption){this.option({bHorizontal:true,nDefaultIndex:0,sClassPrefix:"flick-",sContentClass:"ct",nDuration:100,nFlickThreshold:40,bUseCircular:false,sAnimation:"slide",nFlickDistanceOffset:null,bAutoResize:true,nBounceDuration:100,bSetNextPanelPos:false,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction(),bUseTranslate:true,bActivateOnload:true,bUseDiagonalTouch:false,nDefaultScale:0.94,nZIndex:2000});
this.option(htUserOption||{});
this._initVar(sId);
if(this.option("bActivateOnload")){this.activate()
}},$static:{_htAnimation:{flip:"_FlipFlicking_","circular-flip":"_FlipFlicking_",alignFlip:"_AlignFlipFlicking_","circular-alignFlip":"_AlignFlipFlicking_","circular-slide":"SlideFlicking",slide:"SlideFlicking","circular-cover":"CoverFlicking",cover:"CoverFlicking"}},_initVar:function(sId){this._el=jindo.$(sId);
this._oFlickingImpl=null;
if(/slide|cover/.test(this.option("sAnimation"))){this._isSwipeType=true
}else{this._isSwipeType=false
}},_createFlicking:function(){var sType=this.option("sAnimation");
if(this.option("bUseCircular")){sType="circular-"+sType
}try{var ht=this.option();
ht.bActivateOnload=false;
this._oFlickingImpl=new jindo.m[jindo.m.Flicking._htAnimation[sType]](this._el,ht)
}catch(e){console.error("_createFlicking ERROR ! "+e)
}},refresh:function(n,bResize,bFireEvent){if(this._oFlickingImpl){if(this._isSwipeType){this._oFlickingImpl.resize();
this._oFlickingImpl.refresh(n,bFireEvent,true)
}else{this._oFlickingImpl.refresh(n,bResize,bFireEvent)
}}},getIndexByElement:function(el){if(this._oFlickingImpl){if(this._isSwipeType){return this._oFlickingImpl._getIndexByElement(el)
}else{return this._oFlickingImpl.getIndexByElement(el)
}}else{return -1
}},getElement:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getElement()
}else{return null
}},getContentElement:function(){return this.getElement()
},getContentIndex:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getContentIndex()
}else{return null
}},getNextElement:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getNextElement()
}else{return null
}},getPrevElement:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getPrevElement()
}else{return null
}},getTotalContents:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getTotalContents()
}else{return null
}},getTotalPanels:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getTotalPanels()
}else{return null
}},getPanels:function(){if(this._oFlickingImpl){return this._oFlickingImpl._htWElement.aPanel
}else{return null
}},getPrevIndex:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getPrevIndex()
}else{return null
}},getNextIndex:function(){if(this._oFlickingImpl){return this._oFlickingImpl.getNextIndex()
}else{return null
}},moveNext:function(nDuration){if(!this.isActivating()){return
}if(this._oFlickingImpl){this._oFlickingImpl.moveNext(nDuration)
}},movePrev:function(nDuration){if(!this.isActivating()){return
}if(this._oFlickingImpl){this._oFlickingImpl.movePrev(nDuration)
}},moveTo:function(nIndex,nDuration,bFireEvent){if((typeof nIndex==="undefined")||(nIndex==this.getContentIndex())){return
}if(nIndex<0||nIndex>=this.getTotalContents()){return
}if(this._oFlickingImpl){if(this._isSwipeType){this._oFlickingImpl._moveTo(nIndex,{duration:typeof nDuration==="undefined"?0:nDuration,fireEvent:bFireEvent,fireMoveEvent:true})
}else{this._oFlickingImpl.moveTo(nIndex,nDuration,bFireEvent)
}}},isAnimating:function(){if(this._oFlickingImpl){if(this._isSwipeType){return this._oFlickingImpl.isPlaying()
}else{return this._oFlickingImpl._doFlicking
}}},_onActivate:function(){if(!this._oFlickingImpl){this._createFlicking()
}if(this._oFlickingImpl&&!this._oFlickingImpl.isActivating()){this._oFlickingImpl.activate();
this._attachEvent();
if(!this._isSwipeType){this.refresh(this.getContentIndex(),true,false)
}}},_onDeactivate:function(){this._oFlickingImpl.deactivate();
this._detachEvent()
},_attachEvent:function(){if(!this._oFlickingImpl){return
}var self=this;
this._oFlickingImpl.attach({touchStart:function(oCustomEvent){if(!self.fireEvent("touchStart",oCustomEvent)){oCustomEvent.stop()
}},touchMove:function(oCustomEvent){self.fireEvent("touchMove",oCustomEvent)
},touchEnd:function(oCustomEvent){self.fireEvent("touchEnd",oCustomEvent)
},beforeFlicking:function(oCustomEvent){if(!self.fireEvent("beforeFlicking",oCustomEvent)){oCustomEvent.stop()
}},afterFlicking:function(oCustomEvent){self.fireEvent("afterFlicking",oCustomEvent)
},beforeMove:function(oCustomEvent){if(!self.fireEvent("beforeMove",oCustomEvent)){oCustomEvent.stop()
}},move:function(oCustomEvent){self.fireEvent("move",oCustomEvent)
},scroll:function(oCustomEvent){self.fireEvent("scroll")
},beforeRestore:function(oCustomEvent){if(!self.fireEvent("beforeRestore",oCustomEvent)){oCustomEvent.stop()
}},restore:function(oCustomEvent){self.fireEvent("restore",oCustomEvent)
}})
},_detachEvent:function(){if(this._oFlickingImpl){this._oFlickingImpl.detachAll()
}},destroy:function(){this.deactivate();
this._el=null;
this._oFlickingImpl=null;
this._isSwipeType=false
}}).extend(jindo.m.UIComponent);
jindo.m.Slide=jindo.$Class({$init:function(htUserOption){this.option({});
this.option(htUserOption||{})
},setStyle:function(aArgs){var htCss={};
htCss[this.p("TransitionProperty")]=this.sCssPrefix==""?"tranform":"-"+this.sCssPrefix+"-transform";
htCss[this.p("TransitionDuration")]="0ms";
htCss[this.p("Transform")]=this.getTranslate(0,0);
this._welTarget=aArgs[0].css(htCss);
this.fireEvent("set",{css:htCss});
return htCss
},move:function(nX,nY,nDuration,option){option=option||{};
var welTarget=this.getTarget(true),htCss;
if(option.useCircular){if(this.option("bUseH")){nX=this._getPos(nX,option)
}else{nY=this._getPos(nY,option)
}}else{if(this.option("bHasOffsetBug")){var htStyleOffset=jindo.m.getStyleOffset(welTarget);
nX-=htStyleOffset.left;
nY-=htStyleOffset.top
}}htCss={"@transitionProperty":this.sCssPrefix==""?"tranform":"-"+this.sCssPrefix+"-transform","@transform":this.getTranslate(nX+"px",nY+"px")};
if(!!nDuration){this._oMorph.pushAnimate(nDuration,[welTarget,htCss])
}else{welTarget.css(this.toCss(htCss))
}return this._oMorph
},_getPos:function(nPos,option){var n=nPos,bNext=option.next,nRange=option.range;
if(option.restore){n=0
}else{if(option.duration!=0&&nPos%nRange===0){n=bNext?-nRange:nRange
}else{if(typeof option.startIndex!="undefined"){var nDiff=parseInt(n/nRange,10)*-1;
if(nDiff==option.startIndex||nDiff>option.startIndex){bNext=true
}else{bNext=false
}n=(n%nRange)+((bNext?-1:1)*(Math.abs(nDiff-option.startIndex)*nRange))
}else{n=(n%nRange)+(bNext?0:2*nRange);
n%=nRange
}}}return n
}}).extend(jindo.m.Animation);
jindo.m.Touch=jindo.$Class({$init:function(sId,htUserOption){this._el=jindo.$Element(sId).$value();
var htDefaultOption={nMomentumDuration:350,nMoveThreshold:7,nSlopeThreshold:25,nLongTapDuration:1000,nDoubleTapDuration:400,nTapThreshold:6,nPinchThreshold:0.1,nRotateThreshold:5,bActivateOnload:true,bUseAutoDirection:false,nUseDiagonal:1,bVertical:true,bHorizental:false};
this.option(htDefaultOption);
this.option(htUserOption||{});
if(this.option("nUseDiagonal")>0){this.option({bVertical:true,bHorizental:true})
}this._initVariable();
this._initTouchEventName();
this._initPreventSystemEvent();
this._setSlope();
if(this.option("bActivateOnload")){this.activate()
}},$static:{MOVETYPE:{0:"hScroll",1:"vScroll",2:"dScroll",3:"tap",4:"longTap",5:"doubleTap",6:"pinch",7:"rotate",8:"pinch-rotate"}},_initTouchEventName:function(){if("ontouchstart" in window){this._htEventName.start="touchstart";
this._htEventName.move="touchmove";
this._htEventName.end="touchend";
this._htEventName.cancel="touchcancel";
this._hasTouchEvent=true
}else{if(window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0){this._htEventName.start="MSPointerDown";
this._htEventName.move="MSPointerMove";
this._htEventName.end="MSPointerUp";
this._htEventName.cancel="MSPointerCancel";
this._hasTouchEvent=false
}}},_initPreventSystemEvent:function(){if(this._el.style&&typeof this._el.style.msTouchAction!="undefined"){var type="none";
if(this.option("bHorizental")&&!this.option("bVertical")){type="pan-x"
}if(this.option("bVertical")&&!this.option("bHorizental")){type="pan-y"
}this._el.style.msTouchAction=type
}},_preventSystemEvent:function(we,htParam){var nMoveType=this.nMoveType;
switch(nMoveType){case 0:if(this.option("bHorizental")||this.option("bUseAutoDirection")){}break;
case 1:if(this.option("bVertical")||this.option("bUseAutoDirection")){}break;
case 2:if(this.option("bUseAutoDirection")||this.option("bVertical")||this.option("bHorizental")){}break;
default:break
}return true
},_initVariable:function(){this._htEventName={start:"mousedown",move:"mousemove",end:"mouseup",cancel:null};
this._hasTouchEvent=false;
this._radianToDegree=180/Math.PI;
this._htMoveInfo={nStartX:0,nStartY:0,nBeforeX:0,nBeforeY:0,nStartTime:0,nBeforeTime:0,nStartDistance:0,nBeforeDistance:0,nStartAngle:0,nLastAngle:0,aPos:[]};
this.htEndInfo={nX:0,nY:0};
this.bStart=false;
this.bMove=false;
this.nMoveType=-1;
this._nStartMoveType=-1;
this._nVSlope=0;
this._nHSlope=0;
this.bSetSlope=false
},_attachEvents:function(){this._htEvent={};
var bTouch=this._hasTouchEvent;
this._htEvent[this._htEventName.start]={fn:jindo.$Fn(this._onStart,this).bind(),el:this._el};
this._htEvent[this._htEventName.move]={fn:jindo.$Fn(this._onMove,this).bind(),el:this._el};
this._htEvent[this._htEventName.end]={fn:jindo.$Fn(this._onEnd,this).bind(),el:this._el};
this._htEvent.rotate=jindo.$Fn(this._onResize,this).bind();
jindo.m.bindRotate(this._htEvent.rotate);
if(this._htEventName.cancel){this._htEvent[this._htEventName.cancel]={fn:jindo.$Fn(this._onCancel,this).bind(),el:this._el}
}for(var p in this._htEvent){if(this._htEvent[p].fn){this._htEvent[p].ref=this._attachFakeJindo(this._htEvent[p].el,this._htEvent[p].fn,p)
}}},_attachFakeJindo:function(element,fn,sEvent){var nVersion=+jindo.$Jindo().version.replace(/[a-z.]/gi,"");
var wfn=null;
if(nVersion<230&&(typeof _notSupport!=="undefined")){wfn=_notSupport.$Fn(fn).attach(element,sEvent)
}else{wfn=jindo.$Fn(fn).attach(element,sEvent)
}return wfn
},_detachEvents:function(){for(var p in this._htEvent){var htTargetEvent=this._htEvent[p];
if(htTargetEvent.ref){htTargetEvent.ref.detach(htTargetEvent.el,p)
}}jindo.m.unbindRotate(this._htEvent.rotate);
this._htEvent=null
},_onCancel:function(oEvent){this._onEnd(oEvent)
},_onStart:function(oEvent){this._resetTouchInfo();
var htInfo=this._getTouchInfo(oEvent);
var htParam={element:htInfo[0].el,nX:htInfo[0].nX,nY:htInfo[0].nY,oEvent:oEvent};
if(!this._fireCustomEvent("touchStart",htParam)){return
}this.bStart=true;
this._updateTouchInfo(htInfo,"start");
this._startLongTapTimer(htInfo,oEvent)
},_onMove:function(oEvent){if(!this.bStart){return
}this.bMove=true;
var htInfo=this._getTouchInfo(oEvent);
if(htInfo.length===1){if(this.nMoveType<0||this.nMoveType==3||this.nMoveType==4){var nMoveType=this._getMoveType(htInfo);
if(!((this.nMoveType==4)&&(nMoveType==3))){if(this.option("nUseDiagonal")==2&&(nMoveType==0||nMoveType==1)){this._nStartMoveType=nMoveType;
this.nMoveType=2
}else{this.nMoveType=this._nStartMoveType=nMoveType
}}}}else{if(this.nMoveType!==8){this.nMoveType=this._nStartMoveType=this._getMoveType(htInfo)
}}var htParam=this._getCustomEventParam(htInfo,false,oEvent);
(this.nMoveType!=3)&&this._deleteLongTapTimer();
var nDis=0;
if(this.nMoveType==0){nDis=Math.abs(htParam.nDistanceX)
}else{if(this.nMoveType==1){nDis=Math.abs(htParam.nDistanceY)
}else{nDis=Math.abs(Math.sqrt(Math.pow(htParam.nDistanceX,2)+Math.pow(htParam.nDistanceY,2)))
}}if(nDis<this.option("nMoveThreshold")||nDis<this.option("nSlopeThreshold")){return
}this._updateTouchInfo(htInfo,"move");
var sMoveType=htParam.sMoveType;
var nVectorX=Math.abs(htParam.nVectorX);
var bHorizentalMove=(this.option("bHorizental")&&sMoveType==jindo.m.Touch.MOVETYPE[0]);
var bVerticalMove=(this.option("bVertical")&&sMoveType==jindo.m.Touch.MOVETYPE[1]);
var bUseDiagonalMove=(this.option("nUseDiagonal")==1&&sMoveType==jindo.m.Touch.MOVETYPE[2]);
var bFreeMove=this.option("nUseDiagonal")==2;
if((bHorizentalMove||bVerticalMove||bUseDiagonalMove)||bFreeMove){if(!this.fireEvent("touchMove",htParam)){this.bStart=false;
return
}}},_onEnd:function(oEvent){if(!this.bStart){return
}var self=this;
this._deleteLongTapTimer();
if(!this.bMove&&(this.nMoveType!=4)){this.nMoveType=3
}var htInfo=this._getTouchInfo(oEvent);
if(this._isDblTap(htInfo[0].nX,htInfo[0].nY,htInfo[0].nTime)){clearTimeout(this._nTapTimer);
this._nTapTimer=-1;
this.nMoveType=5
}this._updateTouchInfo(htInfo,"end");
var htParam=this._getCustomEventParam(htInfo,true,oEvent);
var sMoveType=htParam.sMoveType;
if((typeof this._htEventHandler[jindo.m.Touch.MOVETYPE[5]]!="undefined"&&(this._htEventHandler[jindo.m.Touch.MOVETYPE[5]].length>0))&&(this.nMoveType==3)){this._nTapTimer=setTimeout(function(){self._fireCustomEvent(sMoveType,htParam);
self._nTapTimer=-1;
self.fireEvent("touchEnd",htParam)
},this.option("nDoubleTapDuration"))
}else{if(this.nMoveType!=4){if(this.nMoveType===8){htParam.sMoveType=jindo.m.Touch.MOVETYPE[6];
this._fireCustomEvent(jindo.m.Touch.MOVETYPE[6],htParam);
htParam.sMoveType=jindo.m.Touch.MOVETYPE[7];
this._fireCustomEvent(jindo.m.Touch.MOVETYPE[7],htParam);
this.fireEvent("touchEnd",htParam)
}else{setTimeout(function(){self._fireCustomEvent(sMoveType,htParam);
self.fireEvent("touchEnd",htParam)
},0)
}}}this._updateTouchEndInfo(htInfo);
this._resetTouchInfo()
},_fireCustomEvent:function(sEvent,htOption){return this.fireEvent(sEvent,htOption)
},_getCustomEventParam:function(htTouchInfo,bTouchEnd,we){var htMoveInfoPos=this._htMoveInfo.aPos[(this._htMoveInfo.aPos.length>0&&!bTouchEnd?this._htMoveInfo.aPos.length-1:0)];
var sMoveType=jindo.m.Touch.MOVETYPE[this.nMoveType],sStartMoveType=jindo.m.Touch.MOVETYPE[this._nStartMoveType],nDuration=htTouchInfo[0].nTime-this._htMoveInfo.nStartTime,nMomentumX=0,nMomentumY=0,nSpeedX=0,nSpeedY=0,nMMomentumX=0,nMMomentumY=0,nMSpeedX=0,nMSpeedY=0,nDisX=(this.nMoveType===1)?0:htTouchInfo[0].nX-this._htMoveInfo.nStartX,nDisY=(this.nMoveType===0)?0:htTouchInfo[0].nY-this._htMoveInfo.nStartY,nMomentumDisX=(this.nMoveType===1)?0:htTouchInfo[0].nX-htMoveInfoPos.nX,nMomentumDisY=(this.nMoveType===0)?0:htTouchInfo[0].nY-htMoveInfoPos.nY,nMomentumDuration=htTouchInfo[0].nTime-htMoveInfoPos.nTime,htParam={element:htTouchInfo[0].el,nX:htTouchInfo[0].nX,nY:htTouchInfo[0].nY,nVectorX:htTouchInfo[0].nX-this._htMoveInfo.nBeforeX,nVectorY:htTouchInfo[0].nY-this._htMoveInfo.nBeforeY,nDistanceX:nDisX,nDistanceY:nDisY,sMoveType:sMoveType,sStartMoveType:sStartMoveType,nStartX:this._htMoveInfo.nStartX,nStartY:this._htMoveInfo.nStartY,nStartTimeStamp:this._htMoveInfo.nStartTime,htMomentum:{nDistanceX:nMomentumDisX,nDistanceY:nMomentumDisY,nDuration:nMomentumDuration},oEvent:we||{}};
if((htTouchInfo.length)>1||(this.nMoveType>=6)){htParam.nScale=this._getScale(htTouchInfo);
htParam.nRotation=this._getRotation(htTouchInfo);
(htParam.nScale===null)&&(htParam.nScale=this._htMoveInfo.nBeforeScale);
(htParam.nRotation===null)&&(htParam.nRotation=this._htMoveInfo.nBeforeRotation)
}if(htTouchInfo.length>=1){htParam.aX=[];
htParam.aY=[];
htParam.aElement=[];
for(var i=0,nLen=htTouchInfo.length;
i<nLen;
i++){htParam.aX.push(htTouchInfo[i].nX);
htParam.aY.push(htTouchInfo[i].nY);
htParam.aElement.push(htTouchInfo[i].el)
}}if(bTouchEnd){if(this.nMoveType==0||this.nMoveType==1||this.nMoveType==2){if(nDuration<=this.option("nMomentumDuration")){}if(nDuration<=this.option("nMomentumDuration")){nSpeedX=Math.abs(nDisX)/nDuration;
nMomentumX=(nSpeedX*nSpeedX)/2;
nSpeedY=Math.abs(nDisY)/nDuration;
nMomentumY=(nSpeedY*nSpeedY)/2
}if(nMomentumDuration<=this.option("nMomentumDuration")){nMSpeedX=Math.abs(nMomentumDisX)/nMomentumDuration;
nMMomentumX=(nMSpeedX*nMSpeedX)/2;
nMSpeedY=Math.abs(nMomentumDisY)/nMomentumDuration;
nMMomentumY=(nMSpeedY*nMSpeedY)/2
}}htParam.nMomentumX=nMomentumX;
htParam.nMomentumY=nMomentumY;
htParam.nSpeedX=nSpeedX;
htParam.nSpeedY=nSpeedY;
htParam.nDuration=nDuration;
htParam.htMomentum.nMomentumX=nMMomentumX;
htParam.htMomentum.nMomentumY=nMMomentumY;
htParam.htMomentum.nSpeedX=nMSpeedX;
htParam.htMomentum.nSpeedY=nMSpeedY
}return htParam
},_updateTouchEndInfo:function(htInfo){this.htEndInfo={element:htInfo[0].el,time:htInfo[0].nTime,movetype:this.nMoveType,nX:htInfo[0].nX,nY:htInfo[0].nY}
},_deleteLongTapTimer:function(){if(typeof this._nLongTapTimer!="undefined"){clearTimeout(this._nLongTapTimer);
delete this._nLongTapTimer
}},_startLongTapTimer:function(htInfo,oEvent){var self=this;
if((typeof this._htEventHandler[jindo.m.Touch.MOVETYPE[4]]!="undefined")&&(this._htEventHandler[jindo.m.Touch.MOVETYPE[4]].length>0)){self._nLongTapTimer=setTimeout(function(){self.fireEvent("longTap",{element:htInfo[0].el,oEvent:oEvent,nX:htInfo[0].nX,nY:htInfo[0].nY});
self.nMoveType=4
},self.option("nLongTapDuration"))
}},_onResize:function(){this._setSlope()
},_isDblTap:function(nX,nY,nTime){if((typeof this._nTapTimer!="undefined")&&this.nMoveType==3){var nGap=this.option("nTapThreshold");
if((Math.abs(this.htEndInfo.nX-nX)<=nGap)&&(Math.abs(this.htEndInfo.nY-nY)<=nGap)){return true
}}return false
},_setSlope:function(){if(!this.bSetSlope){this._nHSlope=((window.innerHeight/2)/window.innerWidth).toFixed(2)*1;
this._nVSlope=(window.innerHeight/(window.innerWidth/2)).toFixed(2)*1
}},setSlope:function(nVSlope,nHSlope){this._nHSlope=nHSlope;
this._nVSlope=nVSlope;
this.bSetSlope=true
},getSlope:function(){return{nVSlope:this._nVSlope,nHSlope:this._nHSlope}
},_resetTouchInfo:function(){for(var x in this._htMoveInfo){if(x!="aPos"){this._htMoveInfo[x]=0
}else{this._htMoveInfo.aPos.length=0
}}this._deleteLongTapTimer();
this.bStart=false;
this.bMove=false;
this.nMoveType=-1;
this._nStartMoveType=-1
},_updateTouchInfo:function(htInfo,sType){if(sType=="end"){this.htEndInfo={nX:htInfo[0].nX,nY:htInfo[0].nY};
if(this._htMoveInfo.aPos.length>3){this._htMoveInfo.aPos.pop()
}}else{if(sType=="start"){this._htMoveInfo.nStartX=htInfo[0].nX;
this._htMoveInfo.nStartY=htInfo[0].nY;
this._htMoveInfo.nStartTime=htInfo[0].nTime
}else{this._htMoveInfo.nBeforeTime=htInfo[0].nTime
}this._htMoveInfo.nBeforeX=htInfo[0].nX;
this._htMoveInfo.nBeforeY=htInfo[0].nY;
this._htMoveInfo.aPos.push({nX:htInfo[0].nX,nY:htInfo[0].nY,nTime:htInfo[0].nTime});
(this._htMoveInfo.aPos.length>5)&&this._htMoveInfo.aPos.shift()
}},_getMoveTypeBySingle:function(x,y){var nType=this.nMoveType;
var nX=Math.abs(this._htMoveInfo.nStartX-x);
var nY=Math.abs(this._htMoveInfo.nStartY-y);
var nDis=nX+nY;
var nGap=this.option("nTapThreshold");
if((nX<=nGap)&&(nY<=nGap)){nType=3
}else{nType=-1
}if(this.option("nSlopeThreshold")<=nDis){var nSlope=nY/(nX+nY)*90;
if((this._nHSlope===-1)&&(this._nVSlope===-1)&&this.option("nUseDiagonal")>0){nType=2
}else{if(nSlope<=25){nType=0
}else{if(nSlope>=65){nType=1
}else{if(this.option("nUseDiagonal")>1){nType=2
}else{nType=2
}}}}}return nType
},_getMoveTypeByMulti:function(aPos){var nType=-1;
if((this.nMoveType===6)||Math.abs(1-this._htMoveInfo.nBeforeScale)>=this.option("nPinchThreshold")){nType=6
}if((this.nMoveType===7)||Math.abs(0-this._htMoveInfo.nBeforeRotation)>=this.option("nRotateThreshold")){if(nType===6){nType=8
}else{nType=7
}}if(nType===-1){return this.nMoveType
}return nType
},_getScale:function(aPos){var nScale=-1;
var nDistance=this._getDistance(aPos);
if(nDistance<=0){return null
}if(this._htMoveInfo.nStartDistance===0){nScale=1;
this._htMoveInfo.nStartDistance=nDistance
}else{nScale=nDistance/this._htMoveInfo.nStartDistance
}this._htMoveInfo.nBeforeScale=nScale;
return nScale
},_getRotation:function(aPos){var nRotation=-1;
var nAngle=this._getAngle(aPos);
if(nAngle===null){return null
}if(this._htMoveInfo.nStartAngle===0){this._htMoveInfo.nStartAngle=nAngle;
nRotation=0
}else{nRotation=nAngle-this._htMoveInfo.nStartAngle
}this._htMoveInfo.nLastAngle=nAngle;
this._htMoveInfo.nBeforeRotation=nRotation;
return nRotation
},_getMoveType:function(aPos){var nType=this.nMoveType;
if(aPos.length===1){nType=this._getMoveTypeBySingle(aPos[0].nX,aPos[0].nY)
}else{if(aPos.length===2){nType=this._getMoveTypeByMulti(aPos)
}}return nType
},_getDistance:function(aPos){if(aPos.length===1){return -1
}return Math.sqrt(Math.pow(Math.abs(aPos[0].nX-aPos[1].nX),2)+Math.pow(Math.abs(aPos[0].nY-aPos[1].nY),2))
},_getAngle:function(aPos){if(aPos.length===1){return null
}var deltaX=aPos[0].nX-aPos[1].nX,deltaY=aPos[0].nY-aPos[1].nY;
var nAngle=Math.atan2(deltaY,deltaX)*this._radianToDegree;
if(this._htMoveInfo.nLastAngle!==null){var nDiff=Math.abs(this._htMoveInfo.nLastAngle-nAngle);
var nNext=nAngle+360;
var nPrev=nAngle-360;
if(Math.abs(nNext-this._htMoveInfo.nLastAngle)<nDiff){nAngle=nNext
}else{if(Math.abs(nPrev-this._htMoveInfo.nLastAngle)<nDiff){nAngle=nPrev
}}}return nAngle
},_getTouchInfo:function(oEvent){var aReturn=[];
var nTime=oEvent.$value().timeStamp;
var oTouch=null;
if(this._hasTouchEvent){if(oEvent.type==="touchend"){oTouch=oEvent.$value().changedTouches
}else{oTouch=oEvent.$value().targetTouches||oEvent.$value().changedTouches
}for(var i=0,nLen=oTouch.length;
i<nLen;
i++){aReturn.push({el:jindo.m.getNodeElement(oTouch[i].target),nX:oTouch[i].pageX,nY:oTouch[i].pageY,nTime:nTime})
}}else{aReturn.push({el:oEvent.element,nX:oEvent.pos().pageX,nY:oEvent.pos().pageY,nTime:nTime})
}return aReturn
},getBaseElement:function(el){return this._el
},_onDeactivate:function(){this._detachEvents()
},_onActivate:function(){this._attachEvents()
},destroy:function(){var p;
this.deactivate();
this._el=null;
for(p in this._htMoveInfo){this._htMoveInfo[p]=null
}this._htMoveInfo=null;
for(p in this.htEndInfo){this.htEndInfo[p]=null
}this.htEndInfo=null;
this.bStart=null;
this.bMove=null;
this.nMoveType=null;
this._nStartMoveType=null;
this._nVSlope=null;
this._nHSlope=null;
this.bSetSlope=null
}}).extend(jindo.m.UIComponent);
jindo.m.SwipeCommon=jindo.$Class({$init:function(el,htUserOption){this.option({bActivateOnload:true,bUseHighlight:true,bUseDiagonalTouch:true,bUseMomentum:true,nDeceleration:0.0006,bAutoResize:true,fEffect:jindo.m.Effect.cubicEaseOut,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction(),nZIndex:2000})
},_getAnimationOption:function(htOption){return jindo.$Jindo.mixin({bUseH:this._bUseH,bHasOffsetBug:this._hasOffsetBug(),fEffect:this.option("fEffect"),bUseCss3d:this.option("bUseCss3d"),bUseTimingFunction:this.option("bUseTimingFunction")},htOption||{})
},_initVar:function(){this._htWElement={};
this._bUseH=false;
this._bUseV=false;
this._nX=0;
this._nY=0;
this._bUseDiagonalTouch=this.option("bUseDiagonalTouch");
this._bClickBug=jindo.m.hasClickBug();
this._htOffsetBug={hasBug:jindo.m.hasOffsetBug()&&this.option("bUseHighlight"),timer:-1,elDummyTag:null};
this._htSize={viewWidth:0,viewHeight:0,contWidth:0,contHeight:0,maxX:0,maxY:0};
this._isStop=false;
this._oTouch=null;
this._oAnimation=null
},_setWrapperElement:function(el){this._htWElement.view=jindo.$Element(el);
this._htWElement.base=jindo.$Element(this._htWElement.view.query("."+this.option("sClassPrefix")+"base"));
if(this._htWElement.base){this._htWElement.container=this._htWElement.base.query("."+this.option("sClassPrefix")+"container")
}else{this._htWElement.container=this._htWElement.view.query("."+this.option("sClassPrefix")+"container")||this._htWElement.view.first()
}this._htWElement.container=jindo.$Element(this._htWElement.container);
this._htWElement.view.css({overflow:"hidden",zIndex:this.option("nZIndex")});
if(this._htWElement.base){this._htWElement.base.css({position:"relavite"})
}this._htWElement.container.css({left:"0px",top:"0px"});
this._createOffsetBugDummyTag()
},_onActivate:function(){if(!this._oTouch){this._oTouch=new jindo.m.Touch(this._htWElement.view.$value(),{nMoveThreshold:0,nUseDiagonal:0,bVertical:this.bUseH,bHorizental:!this.bUseH,nMomentumDuration:200,nTapThreshold:1,nSlopeThreshold:5,nEndEventThreshold:(jindo.m.getDeviceInfo().win8?100:0),bActivateOnload:false})
}this._attachEvent();
this._attachAniEvent();
this._oTouch.activate()
},_onDeactivate:function(){this._detachEvent();
this._detachAniEvent();
this._oTouch.deactivate();
if(this._oAnimation){this._oAnimation.deactivate()
}},_attachEvent:function(){this._htEvent={};
this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind();
this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind();
this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind();
this._oTouch.attach({touchStart:this._htEvent.touchStart,touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd});
if(this.option("bAutoResize")){this._htEvent.resize=jindo.$Fn(this._onResize,this).bind();
jindo.m.bindRotate(this._htEvent.resize);
jindo.m.bindPageshow(this._htEvent.resize)
}},_detachEvent:function(){this._oTouch.detachAll();
if(this.option("bAutoResize")){jindo.m.unbindRotate(this._htEvent.resize);
jindo.m.unbindPageshow(this._htEvent.resize)
}},_getX:function(nPos){return(nPos>=0?0:(nPos<=this._htSize.maxX?this._htSize.maxX:nPos))
},_getY:function(nPos){return(nPos>=0?0:(nPos<=this._htSize.maxY?this._htSize.maxY:nPos))
},_attachAniEvent:function(){if(this._oAnimation){this._htEvent.endAni=jindo.$Fn(this._onEndAniImpl,this).bind();
this._oAnimation.attach({end:this._htEvent.endAni})
}},_detachAniEvent:function(){if(this._oAnimation){this._oAnimation.detachAll()
}},set:function(){var aArgs=Array.prototype.slice.apply(arguments);
if(aArgs.length>=1){this._oAnimation=aArgs.shift();
this._oAnimation.setStyle(aArgs);
this._attachAniEvent()
}return this._oAnimation
},getAnimation:function(){return this._oAnimation
},isPlaying:function(){if(this._oAnimation){return this._oAnimation.isPlaying()
}return false
},isAnimating:this.isPlaying,refresh:function(){},resize:function(){var welView=this._htWElement.view,welContainer=this._htWElement.container,nWidthLeft=parseInt(welView.css("borderLeftWidth"),10),nWidthRight=parseInt(welView.css("borderRightWidth"),10),nHeightTop=parseInt(welView.css("borderTopWidth"),10),nHeightBottom=parseInt(welView.css("borderBottomWidth"),10);
nWidthLeft=isNaN(nWidthLeft)?0:nWidthLeft;
nWidthRight=isNaN(nWidthRight)?0:nWidthRight;
nHeightTop=isNaN(nHeightTop)?0:nHeightTop;
nHeightBottom=isNaN(nHeightBottom)?0:nHeightBottom;
this._htSize.viewWidth=welView.width()-nWidthLeft-nWidthRight;
this._htSize.viewHeight=welView.height()-nHeightTop-nHeightBottom;
this._htSize.contWidth=welContainer.width();
this._htSize.contHeight=welContainer.height()
},_calcMomentum:function(nDistance,nSpeed,nMomentum,nMaxDistUpper,nMaxDistLower,nSize){var nDeceleration=this.option("nDeceleration"),nNewDist=nMomentum/nDeceleration,nNewTime=0,nOutsideDist=0;
if(nDistance>0&&nNewDist>nMaxDistUpper){nOutsideDist=nSize/(6/(nNewDist/nSpeed*nDeceleration));
nMaxDistUpper=nMaxDistUpper+nOutsideDist;
nSpeed=nSpeed*nMaxDistUpper/nNewDist;
nNewDist=nMaxDistUpper
}else{if(nDistance<0&&nNewDist>nMaxDistLower){nOutsideDist=nSize/(6/(nNewDist/nSpeed*nDeceleration));
nMaxDistLower=nMaxDistLower+nOutsideDist;
nSpeed=nSpeed*nMaxDistLower/nNewDist;
nNewDist=nMaxDistLower
}}nNewDist=nNewDist*(nDistance<0?-1:1);
nNewTime=nSpeed/nDeceleration;
return{nDist:nNewDist,nTime:Math.round(nNewTime)}
},_onStart:function(we){if(this.isPlaying()){we.oEvent.stop();
return
}this._clearOffsetBug();
if(this.fireEvent("beforeTouchStart",we)){this._isStop=false;
this._startImpl(we);
if(!this.fireEvent("touchStart",jindo.$Jindo.mixin(we,{}))){we.stop()
}}else{we.stop()
}},_onMove:function(we){this._clearOffsetBug();
this._bClickBug&&this._htWElement.container.css("pointerEvents","none");
if(this.fireEvent("beforeTouchMove",we)){var bPrevent=this._preventSystemEvent(we);
if(bPrevent&&!this.isPlaying()){this._moveImpl(we)
}if(!bPrevent){this.fireEvent("scroll")
}var htParam=jindo.$Jindo.mixin(we,{});
htParam.bPreventDefaultEvent=bPrevent;
if(!this.fireEvent("touchMove",htParam)){we.stop()
}}else{we.stop()
}},_onEnd:function(we){if(this.isPlaying()){return
}if(!this._isStop){this._clearOffsetBug()
}if(this.fireEvent("beforeTouchEnd",we)){if(we.sMoveType===jindo.m.MOVETYPE[3]||we.sMoveType===jindo.m.MOVETYPE[4]||we.sMoveType===jindo.m.MOVETYPE[5]){if(this._isStop){we.oEvent.stop(jindo.$Event.CANCEL_ALL)
}else{this._tapImpl&&this._tapImpl()
}}else{this._endImpl(we)
}if(!this.fireEvent("touchEnd",jindo.$Jindo.mixin(we,{}))){we.stop()
}}else{we.stop()
}this._bClickBug&&this._htWElement.container.css("pointerEvents","auto")
},_preventSystemEvent:function(we){var weParent=we.oEvent;
if(we.sMoveType===jindo.m.MOVETYPE[0]){if(this._bUseH){weParent.stop();
return true
}else{return false
}}else{if(we.sMoveType===jindo.m.MOVETYPE[1]){if(this._bUseV){weParent.stop();
return true
}else{return false
}}else{if(we.sMoveType===jindo.m.MOVETYPE[2]){if(this._bUseDiagonalTouch){weParent.stop();
return true
}else{return false
}}else{if(we.sMoveType===jindo.m.MOVETYPE[6]||we.sMoveType===jindo.m.MOVETYPE[7]||we.sMoveType===jindo.m.MOVETYPE[8]){weParent.stop();
return true
}else{weParent.stop();
return true
}}}}},_onResize:function(we){if(we.sType==="rotate"){if(this.fireEvent("rotate",{isVertical:we.isVertical})){this._resizeImpl(we)
}}else{this._resizeImpl(we)
}},_getMomentumData:function(we,nThreshold,isBounce){var htMomentumX={nDist:0,nTime:0},htMomentumY={nDist:0,nTime:0},htData={momentumX:we.nMomentumX,momentumY:we.nMomentumY,distanceX:we.nDistanceX,distanceY:we.nDistanceY,x:this._nX,y:this._nY,nextX:this._nX,nextY:this._nY};
if(this.option("bUseMomentum")&&((we.nMomentumX&&we.nMomentumX>nThreshold)||(we.nMomentumY&&we.nMomentumY>nThreshold))){if(this._bUseH){htMomentumX=this._calcMomentum(we.nDistanceX,we.nSpeedX,we.nMomentumX,-this._nX,-this._htSize.maxX+this._nX,isBounce?this._htSize.viewWidth:0)
}if(this._bUseV){htMomentumY=this._calcMomentum(we.nDistanceY,we.nSpeedY,we.nMomentumY,-this._nY,-this._htSize.maxY+this._nY,isBounce?this._htSize.viewHeight:0)
}htData.nextX=this._nX+htMomentumX.nDist;
htData.nextY=this._nY+htMomentumY.nDist;
htData.duration=Math.max(Math.max(htMomentumX.nTime,htMomentumY.nTime),10);
htData.duration=jindo.m.getOsInfo().android?htData.duration*0.7:htData.duration
}else{htData.duration=0
}return htData
},_makeStylePos:function(wel){var oUI=this.getAnimation(),htTranslateOffset=jindo.m.getTranslateOffset(wel),htStyleOffset=jindo.m.getStyleOffset(wel),htCss={top:(htTranslateOffset.top+htStyleOffset.top)+"px",left:(htTranslateOffset.left+htStyleOffset.left)+"px"};
htCss[oUI.p("Transform")]=oUI.getTranslate("0px","0px");
wel.css(htCss);
this._htOffsetBug.elDummyTag.focus()
},_createOffsetBugDummyTag:function(){if(this._hasOffsetBug()){this._htOffsetBug.elDummyTag=jindo.$$.getSingle("._offsetbug_dummy_atag_",this._htWElement.view.$value());
if(!this._htOffsetBug.elDummyTag){this._htOffsetBug.elDummyTag=jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_offsetbug_dummy_atag_'></a>");
this._htWElement.view.append(this._htOffsetBug.elDummyTag)
}}},_clearOffsetBug:function(){if(this._hasOffsetBug()){clearTimeout(this._htOffsetBug.timer);
this._htOffsetBug.timer=-1
}},_fixOffsetBugImpl:function(){if(this._hasOffsetBug()){var self=this;
var welTarget=this.getAnimation().getTarget(true);
this._clearOffsetBug();
this._htOffsetBug.timer=setTimeout(function(){if(welTarget){self._makeStylePos(welTarget)
}},200)
}},_hasOffsetBug:function(){return this._htOffsetBug.hasBug
},destroy:function(){var p;
this.deactivate();
for(p in this._htWElement){this._htWElement[p]=null
}this._htWElement=null;
for(p in this._htEvent){this._htEvent[p]=null
}this._htEvent=null;
if(this._oTouch){this._oTouch.destroy()
}if(this._oAnimation){this._oAnimation.destroy()
}}}).extend(jindo.m.UIComponent);
jindo.m.Flick=jindo.$Class({$init:function(el,htUserOption){this.option({bHorizontal:true,sClassPrefix:"flick-",sContentClass:"ct",bUseCircular:false,nTotalContents:3,nFlickThreshold:40,nDuration:100,nBounceDuration:100,fpPanelEffect:jindo.m.Effect.cubicEaseIn,nDefaultIndex:0,bFitContentSize:true,nDeceleration:0.001,bUseMomentum:false})
},_initVar:function(){jindo.m.SwipeCommon.prototype._initVar.apply(this);
this._bUseH=this.option("bHorizontal");
this._bUseV=!this._bUseH;
this._bUseCircular=this.option("bUseCircular");
this._nContentIndex=0;
this._welElement=null;
this._aPos=[];
this._nRange=null;
this._nDefaultPanel=3;
this._sHighlightClass="_jmc_no_tap_highlight_";
this._hasHighlightBug=jindo.m.getBrowserInfo().chrome&&!jindo.m.getBrowserInfo().bSBrowser;
this._nHightlightBug=-1
},_setWrapperElement:function(el){jindo.m.SwipeCommon.prototype._setWrapperElement.call(this,el);
var sSizeKey=this.option("bHorizontal")?"height":"width";
this._htWElement.aPanel=this._htWElement.container.queryAll("."+this.option("sClassPrefix")+this.option("sContentClass"));
var wa=jindo.$A(this._htWElement.aPanel);
if(!this._bUseCircular){wa=wa.filter(function(v,i,a){return jindo.$Element(v).visible()
})
}this._htWElement.container.css({position:"relative"}).css(sSizeKey,"100%");
this._htWElement.aPanel=wa.forEach(function(v,i,a){a[i]=jindo.$Element(v).css(sSizeKey,"100%")
}).$value()
},_checkIndex:function(n){var bRet=true,nMax=this.getTotalContents()-1;
if(isNaN((n*1))||n<0){bRet=false
}if(n>nMax){bRet=false
}return bRet
},_refreshPanelInfo:function(){var nTotal=0;
this._aPos=[0];
for(var i=0,sKey=this._bUseH?"width":"height",nLen=this.getTotalContents();
i<nLen;
i++){if(this._nRange!=null){nTotal-=this._nRange
}else{nTotal-=this._htWElement.aPanel[i][sKey]()
}this._aPos.push(nTotal)
}},_onActivate:function(){jindo.m.SwipeCommon.prototype._onActivate.apply(this)
},_onDeactivate:function(){jindo.m.SwipeCommon.prototype._onDeactivate.apply(this)
},set:function(){if(!this._oAnimation){jindo.m.SwipeCommon.prototype.set.apply(this,Array.prototype.slice.apply(arguments));
if(this._bUseCircular){this.option("nTotalContents",parseInt(this.option("nTotalContents"),10))
}else{this.option("nTotalContents",this._htWElement.aPanel.length)
}var n=this.option("nDefaultIndex");
if(!this._checkIndex(n)){n=0
}this.resize();
this.refresh(n)
}return this._oAnimation
},refresh:function(n,bFireEvent,bFireMoveEvent){jindo.m.SwipeCommon.prototype.refresh.call(this);
n=typeof n==="undefined"?this.getContentIndex():n;
this._makeHighlightStyle();
this._moveTo(n,{duration:0,fireEvent:bFireEvent,fireMoveEvent:bFireMoveEvent,corrupt:true})
},resize:function(){jindo.m.SwipeCommon.prototype.resize.call(this);
if(!this.option("bFitContentSize")&&!this._bUseCircular){this._nRange=null
}else{this._nRange=this._bUseH?this._htSize.viewWidth:this._htSize.viewHeight;
if(this._nRange==0){this._nRange=this._htWElement.view[this._bUseH?"width":"height"]()
}}this._refreshPanelInfo();
if(this._nRange!=null){if(this._bUseH){this._htSize.maxX=(this.option("nTotalContents")-1)*-this._nRange;
this._nX=this._aPos[this.getContentIndex()]
}else{this._htSize.maxY=(this.option("nTotalContents")-1)*-this._nRange;
this._nY=this._aPos[this.getContentIndex()]
}}},getElement:function(){var n=this.getContentIndex();
if(this._bUseCircular){if(this._welElement){return this._welElement
}else{n%=this._nDefaultPanel;
return this._htWElement.aPanel[n]
}}else{return this._htWElement.aPanel[n]
}},getNextElement:function(){var n;
if(this._bUseCircular){n=this._getIndexByElement(this.getElement());
n=((((n+1)%this._nDefaultPanel)>this._nDefaultPanel-1)?0:(n+1))%this._nDefaultPanel
}else{n=this.getNextIndex()
}return this._htWElement.aPanel[n]
},getPrevElement:function(){var n;
if(this._bUseCircular){n=this._getIndexByElement(this.getElement());
n=((n-1)<0)?this._nDefaultPanel-1:(n-1)
}else{n=this.getPrevIndex()
}return this._htWElement.aPanel[n]
},_getIndexByElement:function(wel){var bValue=-1;
jindo.$A(this._htWElement.aPanel).forEach(function(v,i,a){if(v.isEqual(wel)){bValue=i
}});
return bValue
},getContentIndex:function(){return parseInt(this._nContentIndex,10)
},getNextIndex:function(){var n=this.getContentIndex()+1,nMax=this.getTotalContents()-1;
if(this._bUseCircular&&(n>nMax)){n=0
}return Math.min(nMax,n)
},getPrevIndex:function(){var n=this.getContentIndex()-1;
if(this._bUseCircular&&n<0){n=this.getTotalContents()-1
}return Math.max(0,n)
},getTotalContents:function(){if(this._bUseCircular){return this.option("nTotalContents")
}else{return this._htWElement.aPanel.length
}},setTotalContents:function(n){if(isNaN(n)||n<1){return
}n=parseInt(n,10);
if((this.getContentIndex()+1)>n){this._moveTo(n-1,{duration:0,fireEvent:true,fireMoveEvent:true})
}this.option("nTotalContents",n);
this.resize()
},getTotalPanels:function(){return this._htWElement.aPanel.length
},getPanels:function(){return this._htWElement.aPanel
},moveTo:function(nIndex,nDuration){if(nIndex==this.getContentIndex()){return
}return this._moveTo(nIndex,{duration:nDuration})
},_moveTo:function(nIndex,htUserOption){if((this._nRange==null)&&(this._aPos.indexOf(this._bUseH?this._htSize.maxX:this._htSize.maxY))<nIndex){return
}var htOption={duration:typeof htUserOption.duration==="undefined"?this.option("nDuration"):htUserOption.duration,fireEvent:typeof htUserOption.fireEvent==="undefined"?true:htUserOption.fireEvent,fireMoveEvent:typeof htUserOption.fireMoveEvent==="undefined"?false:htUserOption.fireMoveEvent,corrupt:typeof htUserOption.corrupt=="undefined"?false:htUserOption.corrupt,direct:typeof htUserOption.direct=="undefined"?false:htUserOption.direct};
if(this.isPlaying()||isNaN(nIndex)||nIndex<0||nIndex>=this.getTotalContents()){return
}var nStart=this._bUseH?this._nX:this._nY,nEnd=this._getPos(nIndex);
if(this._bUseCircular){var nCurrentIndex=this._posToIndex(nStart),nMax=this.getTotalContents();
if(nCurrentIndex==0&&nIndex==nMax-1){nEnd=this._nRange
}else{if(nCurrentIndex==nMax-1&&nIndex==0){nEnd=this._getPos(nCurrentIndex)-this._nRange
}}}if(nStart==nEnd){if(htOption.duration===0&&htOption.fireEvent){if(htOption.fireMoveEvent){if(this._fireMoveEvent(nIndex)){this._fireMoveEvent()
}}else{var ht={next:null,moveCount:0,corrupt:htOption.corrupt,contentsNextIndex:nIndex};
if(this._fireFlickingEvent("beforeFlicking",ht)){this._fireFlickingEvent("flicking",ht);
this._fireFlickingEvent("afterFlicking",ht)
}}}return
}this._move(nStart,nEnd,{duration:htOption.duration,contentsNextIndex:nIndex,fireEvent:htOption.fireEvent,fireMoveEvent:htOption.fireMoveEvent,corrupt:htOption.corrupt,direct:htUserOption.direct})
},moveNext:function(nDuration){if(this._bUseCircular&&this.option("nTotalContents")<3){if(this._bUseH){this._nX--
}else{this._nY--
}}var nNext=this.getNextIndex();
this._moveTo(this.getNextIndex(),{duration:nDuration})
},movePrev:function(nDuration){if(this._bUseCircular&&this.option("nTotalContents")<3){if(this._bUseH){this._nX++
}else{this._nY++
}}this._moveTo(this.getPrevIndex(),{duration:nDuration})
},_startImpl:function(we){if(this.isPlaying()){return
}this._nPosToIndex=this._posToIndex(this._bUseH?this._nX:this._nY)
},_moveImpl:function(we){var nVector=this._bUseH?we.nVectorX:we.nVectorY,nDis=this._bUseH?we.nDistanceX:we.nDistanceY,bNext=nDis<0,nPos=this._bUseH?this._nX:this._nY,nMoveIdx=bNext?this.getNextIndex():this.getPrevIndex();
if(this._bUseCircular){nPos+=nVector
}else{nPos+=(nMoveIdx==this.getContentIndex()?nVector/2:nVector)
}this._nX=this._bUseH?nPos:0;
this._nY=this._bUseV?nPos:0;
we.bNext=bNext;
this._moveAfterCall&&this._moveAfterCall(we);
return bNext
},_endImpl:function(we){var ht=null,bNext=(this._bUseH?we.nDistanceX:we.nDistanceY)<0,nContentsIndex=this.getContentIndex(),nContentsNextIndex=bNext?this.getNextIndex():this.getPrevIndex(),nStart=this._getPos(nContentsIndex),nDis=Math.abs((this._bUseH?this._nX:this._nY)-nStart),isRestore=(nContentsIndex===nContentsNextIndex)||(nDis<parseInt(this.option("nFlickThreshold"),10)||(this._aPos.indexOf(this._bUseH?this._htSize.maxX:this._htSize.maxY))<nContentsNextIndex);
if(nDis==0){return
}if(isRestore){this._restore()
}else{ht=this._getMomentumData(we,1.5);
if(ht.duration===0||(bNext&&nContentsIndex===this.getTotalContents()-1)||(!bNext&&nContentsIndex===0)){var nPos=this._bUseH?this._nX:this._nY;
if((bNext&&(nPos<this._aPos[nContentsNextIndex]))||(!bNext&&(nPos>this._aPos[nContentsNextIndex]))){this._setCurrentPos(nContentsIndex,bNext)
}this._moveTo(this._nRange==null?this._getNextIndexByView(nContentsIndex,bNext):nContentsNextIndex,{duration:this.option("nDuration"),direct:true})
}else{var nEndIndex=this._posToIndex(this._bUseH?ht.nextX:ht.nextY);
if(nEndIndex==nContentsIndex){this._restore()
}else{if(this._bUseCircular){nContentsIndex+=bNext?1:-1;
this._setCurrentPos(nContentsIndex,bNext)
}else{this._setCurrentPos(nContentsIndex,bNext)
}this._moveTo(nEndIndex,{duration:ht.duration})
}}}},_getNextIndexByView:function(nIndex,bNext){return bNext?this.getNextIndex():this.getPrevIndex()
},_setCurrentPos:function(nIndex,bNext){if(this._bUseH){this._nX=this._aPos[nIndex]
}else{this._nY=this._aPos[nIndex]
}},_resizeImpl:function(we){this.resize()
},_restore:function(){if(!this._bUseH&&!this._bUseV){return
}var nNewPos=this._getPos(this.getContentIndex()),htPos=jindo.m.getTranslateOffset(this._htWElement.container),nPos=this._bUseH?htPos.left:htPos.top;
if(nNewPos===nPos){return
}else{this._move(nPos,nNewPos,{duration:this.option("nBounceDuration"),restore:true})
}},_getRevisionNo:function(nNo){var nMax=this.getTotalContents();
if(nNo<0){nNo+=nMax
}else{if(nNo>nMax-1){nNo=nNo%nMax
}}return nNo
},_fireCustomBeforeEvent:function(option){if(option.restore){if(!this._fireRestoreEvent("beforeRestore",option)){return false
}}else{if(option.fireMoveEvent){if(option.moveIndex==0){if(!this._fireMoveEvent(option.contentsNextIndex)){return false
}}}else{if(!this._fireFlickingEvent("beforeFlicking",option)){return false
}}}return true
},_setPanelEndInfo:function(option){if(option.restore){this._nX=this._bUseH?this._getPos(option.no):0;
this._nY=this._bUseV?this._getPos(option.no):0
}else{option.no=this._getRevisionNo(option.no);
this._updateFlickInfo(option.no,option.next?this.getNextElement():this.getPrevElement())
}},_fireCustomEvent:function(option){if(option.restore){this._fireRestoreEvent("restore",option)
}else{if(option.fireMoveEvent){if(option.duration===0||option.moveCount==(option.moveIndex+1)){this._fireMoveEvent()
}}else{this._fireFlickingEvent("flicking",option);
this._fireFlickingEvent("afterFlicking",option)
}}},_fireFlickingEvent:function(name,we){if(typeof this._htEventHandler[name]=="undefined"){return true
}var ht={nContentsIndex:this.getContentIndex(),bNext:we.next},nNextIndex=null;
if(/before/.test(name)){if(we.direct||(we.duration===0&&we.moveCount>1)){ht.nContentsNextIndex=we.contentsNextIndex
}else{ht.nContentsNextIndex=we.next?this.getNextIndex():this.getPrevIndex()
}}ht.nMoveCount=we.moveCount;
ht.bCorrupt=we.corrupt;
ht[this._bUseH?"bLeft":"bTop"]=ht.bNext;
return this.fireEvent(name,ht)
},_fireRestoreEvent:function(name,we){return this.fireEvent(name,{nContentsIndex:this.getContentIndex()})
},_fireMoveEvent:function(nNextIndex){if(typeof nNextIndex==="undefined"){return this.fireEvent("move",{nContentsIndex:this.getContentIndex()})
}else{return this.fireEvent("beforeMove",{nContentsIndex:this.getContentIndex(),nContentsNextIndex:nNextIndex})
}},_updateFlickInfo:function(nIndex,wel){this._nContentIndex=typeof nIndex==="undefined"?this.getContentIndex():nIndex;
wel=typeof wel==="undefined"?this.getElement():wel;
this._nX=this._bUseH?this._getPos(this._nContentIndex):0;
this._nY=this._bUseV?this._getPos(this._nContentIndex):0;
this._welElement=wel
},_onEndAniImpl:function(we){if(this._bUseCircular){}},_makeOption:function(ht){var result=jindo.$Jindo.mixin({duration:0,restore:false,fireEvent:true,fireMoveEvent:false,moveCount:1,moveIndex:0,corrupt:false,useCircular:this._bUseCircular,range:this._nRange},ht||{});
result.restore&&(result.moveCount=0);
(result.moveCount>1&&result.duration===0)&&(result.corrupt=true);
result.direct=result.direct||(jindo.m.SlideFlicking&&this instanceof jindo.m.SlideFlicking&&typeof this._htEventHandler.beforeFlicking=="undefined"&&typeof this._htEventHandler.flicking=="undefined"&&typeof this._htEventHandler.afterFlicking=="undefined");
return result
},_moveWithEvent:function(nPos,nDuration,htOption){var self=this,htParam={};
htOption.no=this._posToIndex(nPos);
htParam=jindo.$Jindo.mixin(htOption,{});
if(!htParam.fireMoveEvent&&htParam.moveCount>1){htParam.contentsNextIndex=htParam.no
}self._panelEndBeforeCall&&self._panelEndBeforeCall(htParam);
this._oAnimation._oMorph.pushCall(function(){if(htParam.fireEvent&&!self._fireCustomBeforeEvent(htParam)){this.clear();
self._restore()
}});
this._oAnimation.move(this._bUseH?nPos:0,this._bUseV?nPos:0,nDuration,htParam);
this._oAnimation._oMorph.pushCall(function(){self._setPanelEndInfo(htParam);
self._panelEndAfterCall&&self._panelEndAfterCall(htParam);
htParam.fireEvent&&self._fireCustomEvent(htParam)
});
return this._oAnimation._oMorph
},_move:function(nStart,nEnd,htOption){if(!this._bUseCircular){var nMax=this._bUseH?this._htSize.maxX:this._htSize.maxY;
nEnd=nEnd<nMax?nMax:nEnd
}if(nStart===nEnd){return
}this._clearOffsetBug();
var bNext=nStart>nEnd,nStepCount=this._getStepCount(nStart,nEnd);
htOption=htOption||{};
htOption.moveCount=nStepCount;
htOption.next=bNext;
htOption=this._makeOption(htOption);
if(htOption.restore){this._moveWithEvent(nEnd,htOption.duration,htOption).play();
return
}if(htOption.duration==0){this._moveWithEvent(nEnd,0,htOption).play()
}else{if(htOption.direct){this._moveWithEvent(nEnd,htOption.duration,htOption).play()
}else{var nStepDuration=0,nStartPart=nStart,nEndPart=0,fnEffect=this.option("fpPanelEffect")(0,htOption.duration);
for(var i=0;
i<nStepCount;
i++){htOption.moveIndex=i;
nEndPart=this._getPanelEndPos(nStartPart,nEnd,bNext);
nStepDuration=fnEffect((i+1)/nStepCount)-fnEffect(i/nStepCount);
this._moveWithEvent(nEndPart,nStepDuration,htOption);
nStartPart=nEndPart
}}this._oAnimation._oMorph.play()
}},_getPos:function(nIndex){if(nIndex<0||nIndex>=this._aPos.length){console.error("wrong index",nIndex);
return 0
}else{return this._aPos[nIndex]
}},_isPosPoint:function(nPos){return this._aPos.indexOf(nPos)!=-1
},_getStepCount:function(nStart,nEnd){var bNext=nStart>nEnd;
var nStartIdx=this._posToIndex(nStart),nEndIdx=this._posToIndex(nEnd),nCount=Math.abs(nEndIdx-nStartIdx);
if(!bNext&&!this._isPosPoint(nStart)&&this._isPosPoint(nEnd)){nCount++
}return nCount
},_posToIndex:function(nPos){for(var i=0,nIndex=-1,v,nLen=this._aPos.length;
i<nLen;
i++){v=this._aPos[i];
if(nPos<v){nIndex++
}else{if(nPos==v){nIndex++;
break
}else{break
}}}return nIndex
},_getPanelEndPos:function(nStart,nEnd,bNext){var nCurrentPanel=this._posToIndex(nStart),nEndPos;
(!bNext&&!this._isPosPoint(nStart))&&(nCurrentPanel++);
nCurrentPanel+=bNext?1:-1;
if(this._bUseCircular&&nCurrentPanel<0){nEndPos=nStart+nEnd
}else{nEndPos=this._getPos(nCurrentPanel)
}((this._nRange==null)&&bNext)&&(nEndPos=nEnd>nEndPos?nEnd:nEndPos);
return nEndPos
},_getTranslate:function(nPos){return this._oAnimation.getTranslate(this._bUseH?nPos:0,this._bUseV?nPos:0)
},_makeHighlightStyle:function(){if(!this._hasHighlightBug){return
}var elStyleTag=jindo.$("_jmc_no_tap_highlight_tag_");
if(!elStyleTag){elStyleTag=document.createElement("style");
var elHTML=document.getElementsByTagName("html")[0];
elStyleTag.type="text/css";
elStyleTag.id="_jmc_no_tap_highlight_tag_";
elHTML.insertBefore(elStyleTag,elHTML.firstChild);
var oSheet=elStyleTag.sheet||elStyleTag.styleSheet;
oSheet.insertRule("."+this._sHighlightClass+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0);
oSheet.insertRule("."+this._sHighlightClass+" * { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0)
}this._htWElement.container.addClass(this._sHighlightClass)
},_tapImpl:function(){if(this._hasHighlightBug){this._htWElement.container.removeClass(this._sHighlightClass);
var self=this;
clearTimeout(this._nHightlightBug);
this._nHightlightBug=setTimeout(function(){self._htWElement.container.addClass(self._sHighlightClass)
},200)
}},destroy:function(){jindo.m.SwipeCommon.prototype.destroy.apply(this)
}}).extend(jindo.m.SwipeCommon);
jindo.m.SlideFlicking=jindo.$Class({$init:function(el,htUserOption){this.option(htUserOption||{});
this._initVar();
this._oDocFragment=document.createDocumentFragment();
this._setWrapperElement(el);
if(this.option("bActivateOnload")){this.activate()
}},_onActivate:function(){jindo.m.Flick.prototype._onActivate.apply(this);
var self=this;
this.set(new jindo.m.Slide(this._getAnimationOption()).attach({set:function(we){self._setStyle(we.css)
}}),this._htWElement.container)
},_setStyle:function(htCss){var htContCss={},nPos=0,nSizeKey=this._bUseH?"width":"height",nPosKey=this._bUseH?"left":"top";
jindo.$Jindo.mixin(htContCss,htCss);
if(this._bUseCircular){htContCss[nSizeKey]="100%";
htContCss[nPosKey]="-100%";
htCss.position="absolute";
htCss[nSizeKey]="100%";
htCss.left=0;
htCss.top=0
}if(this._bUseH){htContCss.clear="both";
htCss["float"]="left"
}this._htWElement.container.css(htContCss);
jindo.$A(this._htWElement.aPanel).forEach(function(v,i,a){if(this._bUseCircular){nPos=(((i+1)%(this._nDefaultPanel))*100)+"%";
if(this._hasOffsetBug()){htCss[nPosKey]=nPos
}else{htCss[jindo.m._toPrefixStr("Transform")]=this._getTranslate(nPos)
}}v.css(htCss)
},this)
},resize:function(){jindo.m.Flick.prototype.resize.call(this);
var nSizeKey=this._bUseH?"width":"height",nViewSize=this._htWElement.view[nSizeKey]();
if(!this._bUseCircular){this._htWElement.container.css(nSizeKey,-this._aPos[this._aPos.length-1]+"px");
if(this.option("bFitContentSize")){jindo.$A(this._htWElement.aPanel).forEach(function(v,i,a){v.css(nSizeKey,nViewSize+"px")
})
}else{var nLastPos=this._aPos[this._aPos.length-1]+nViewSize;
if(nLastPos<0){jindo.$A(this._aPos).forEach(function(v,i,a){if(v<nLastPos){this._aPos.length=i;
jindo.$A.Break()
}},this);
this._aPos.push(nLastPos);
if(this._bUseH){this._htSize.maxX=nLastPos
}else{this._htSize.maxY=nLastPos
}if(this._aPos.length<=this.getContentIndex()){this._nContentIndex=this._aPos.length-1
}}}this._updateFlickInfo();
this._oAnimation.move(this._nX,this._nY)
}},_restorePanel:function(wel){wel=wel||this.getElement();
var n=this._getIndexByElement(wel),sPosition=this._hasOffsetBug()?(this._bUseH?"left":"top"):jindo.m._toPrefixStr("Transform"),nPrev=(((n-1)<0)?(this._nDefaultPanel-1):(n-1))%(this._nDefaultPanel),nNext=((((n+1)%(this._nDefaultPanel))>(this._nDefaultPanel-1))?0:(n+1))%(this._nDefaultPanel),nCenter=n%(this._nDefaultPanel);
this._welElement=this._htWElement.aPanel[nCenter];
this._htWElement.container.css(jindo.m._toPrefixStr("Transform"),this._getTranslate(0));
this._welElement.css(sPosition,this._getPosValue("100%")).css("zIndex",10);
this._htWElement.aPanel[nPrev].css(sPosition,this._getPosValue("0%")).css("zIndex",1);
this._htWElement.aPanel[nNext].css(sPosition,this._getPosValue("200%")).css("zIndex",1);
if(jindo.m.getOsInfo().ios&&this._bUseCircular){this._oDocFragment.appendChild(this._htWElement.aPanel[nPrev].$value());
this._oDocFragment.appendChild(this._htWElement.aPanel[nNext].$value());
this._htWElement.container.$value().appendChild(this._oDocFragment)
}},_getPosValue:function(sV){return this._hasOffsetBug()?sV:this._getTranslate(sV)
},_panelEndAfterCall:function(option){if(this._bUseCircular){this._restorePanel()
}},_moveAfterCall:function(we){this._oAnimation.move(this._nX,this._nY,0,this._makeOption({next:we.bNext}))
},_onEndAniImpl:function(we){jindo.m.Flick.prototype._onEndAniImpl.apply(this);
if(!this._bUseCircular){this._fixOffsetBugImpl()
}},destroy:function(){jindo.m.Flick.prototype.destroy.apply(this)
}}).extend(jindo.m.Flick);
jindo.m.CircularFlicking=jindo.$Class({$init:function(sId,htUserOption){this.option({bHorizontal:true,sClassPrefix:"flick-",nFlickThreshold:40,nDuration:100,nTotalContents:3,nBounceDuration:100,bActivateOnload:true,bSetNextPanelPos:false,bUseCss3d:jindo.m.useCss3d(),bUseTimingFunction:jindo.m.useTimingFunction(),bUseTranslate:true,bUseDiagonalTouch:true});
this.option(htUserOption||{});
this._initVar();
this._setWrapperElement(sId);
this._initFlicking(sId);
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this._oFlicking=null
},_initFlicking:function(el){var htOption=this.option();
htOption.sContentClass="panel";
htOption.sAnimation="slide";
htOption.bUseCircular=true;
htOption.bActivateOnload=false;
this._oFlicking=new jindo.m.Flicking(jindo.$Element(el),htOption).attach({touchStart:jindo.$Fn(this._onTouchStart,this).bind(),touchMove:jindo.$Fn(this._onTouchMove,this).bind(),touchEnd:jindo.$Fn(this._onTouchEnd,this).bind(),beforeMove:jindo.$Fn(this._onBeforeMove,this).bind(),move:jindo.$Fn(this._onMove,this).bind(),rotate:jindo.$Fn(this._onRotate,this).bind(),scroll:jindo.$Fn(this._onScroll,this).bind(),beforeFlicking:jindo.$Fn(this._onBeforeFlicking,this).bind(),afterFlicking:jindo.$Fn(this._onAfterFlicking,this).bind()})
},_setWrapperElement:function(el){this._htWElement={circularFlickBase:jindo.$Element(el)};
var welContainer=jindo.$Element(this._htWElement.circularFlickBase.query("."+this.option("sClassPrefix")+"container"));
var aPanels=welContainer.queryAll("."+this.option("sClassPrefix")+"panel");
if(aPanels&&aPanels.length<3){var nLen=3-aPanels.length;
for(var i=0;
i<nLen;
i++){welContainer.$value().appendChild(jindo.$('<div class="'+this.option("sClassPrefix")+'panel">'))
}}},getPanelIndex:function(){return this._oFlicking.getIndexByElement(this.getPanelElement().$value())
},getPanelElement:function(){return this._oFlicking.getElement()
},getRightPanelIndex:function(){return this._oFlicking.getIndexByElement(this.getRightPanelElement().$value())
},getRightPanelElement:function(){return this._oFlicking.getNextElement()
},getLeftPanelIndex:function(){return this._oFlicking.getIndexByElement(this.getLeftPanelElement().$value())
},getLeftPanelElement:function(){return this._oFlicking.getPrevElement()
},getContentIndex:function(){return this._oFlicking.getContentIndex()
},getRightContentIndex:function(){return this._oFlicking.getNextIndex()
},getLeftContentIndex:function(){return this._oFlicking.getPrevIndex()
},_onTouchStart:function(oCustomEvt){var bRet=this.fireEvent("touchStart",oCustomEvt);
if(!bRet){oCustomEvt.stop();
return
}},_onTouchMove:function(oCustomEvt){this.fireEvent("touchMove",oCustomEvt)
},_onTouchEnd:function(oCustomEvt){this.fireEvent("touchEnd",oCustomEvt)
},_onBeforeMove:function(oCustomEvt){var nPanelIndex=oCustomEvt.nContentsNextIndex%3;
if(!this.fireEvent("beforeMove",{nPanelIndex:this.getPanelIndex(),nContentIndex:oCustomEvt.nContentsIndex,nNextPanelIndex:nPanelIndex,nNextContentIndex:oCustomEvt.nContentsNextIndex})){oCustomEvt.stop()
}},_onMove:function(oCustomEvt){this.fireEvent("move",{nPanelIndex:this.getPanelIndex(),nPanelLeftIndex:this.getLeftPanelIndex(),nPanelRightIndex:this.getRightPanelIndex(),nContentIndex:this.getContentIndex(),nContentLeftIndex:this.getLeftContentIndex(),nContentRightIndex:this.getRightContentIndex()})
},_onRotate:function(evt){this.fireEvent("rotate",evt)
},_onScroll:function(){this.fireEvent("scroll")
},_onBeforeFlicking:function(oCustomEvent){var htParam={nContentIndex:oCustomEvent.nContentsIndex,nNextContentIndex:oCustomEvent.nContentsNextIndex,nPanelIndex:this.getPanelIndex(),nNextPanelIndex:this.getLeftPanelIndex()};
if(oCustomEvent.bTop){htParam.bTop=oCustomEvent.bTop
}if(oCustomEvent.bLeft){htParam.bLeft=oCustomEvent.bLeft
}if(htParam.bTop||htParam.bLeft){htParam.nNextPanelIndex=this.getRightPanelIndex()
}if(!this.fireEvent("beforeFlicking",htParam)){oCustomEvent.stop()
}},_onAfterFlicking:function(oCustomEvent){var htParam={nPanelIndex:this.getPanelIndex(),nPanelLeftIndex:this.getLeftPanelIndex(),nPanelRightIndex:this.getRightPanelIndex(),nContentIndex:this.getContentIndex(),nContentLeftIndex:this.getLeftContentIndex(),nContentRightIndex:this.getRightContentIndex()};
if(oCustomEvent.bTop){htParam.bTop=oCustomEvent.bTop
}if(oCustomEvent.bLeft){htParam.bLeft=oCustomEvent.bLeft
}this._htWElement.aPanel=this._oFlicking._oFlickingImpl._htWElement.aPanel;
this.fireEvent("afterFlicking",htParam)
},moveNext:function(nDuration){if(!this.isActivating()){return
}this._oFlicking.moveNext()
},movePrev:function(nDuration){if(!this.isActivating()){return
}this._oFlicking.movePrev()
},refresh:function(n,bResize,bFireEvent){var self=this;
if(!this.isActivating()){return
}if(typeof bResize==="undefined"){bResize=false
}if(typeof bFireEvent==="undefined"){bFireEvent=false
}this._oFlicking.refresh(n,bResize,bFireEvent)
},setContentIndex:function(n,bRefresh){if(!this.isActivating()){return
}n=parseInt(n,10);
if(n<0||n>(this.option("nTotalContents")-1)){return
}if(typeof bRefresh==="undefined"){bRefresh=true
}this.refresh(n,bRefresh,true)
},_onActivate:function(){this._oFlicking.activate()
},_onDeactivate:function(){this._oFlicking.deactivate()
},destroy:function(){this.deactivate();
this._oFlicking=null;
for(var p in this._htWElement){this._htWElement[p]=null
}}}).extend(jindo.m.UIComponent);
jindo.m.LayerEffect=jindo.$Class({$init:function(el,htUserOption){this.option({nDuration:250,fEffect:jindo.m.Effect.linear,bActivateOnload:true});
this._initVar();
if(arguments[0]&&(typeof arguments[0]=="string"||arguments[0].nodeType==1)){this.setLayer(el);
this.option(htUserOption||{})
}else{this.option(arguments[0]||{})
}this._initTransition();
if(this.option("bActivateOnload")){this.activate()
}},_htEffect:{expand:"jindo.m.ExpandEffect",contract:"jindo.m.ContractEffect",fade:"jindo.m.FadeEffect",pop:"jindo.m.PopEffect",slide:"jindo.m.SlideEffect",flip:"jindo.m.FlipEffect"},_initVar:function(){this._htEffectInstance={};
this._htLayerInfo={};
this._htWElement={};
this._htCurrentTask={};
this.bAndroid=jindo.m.getDeviceInfo().android;
this.sClassHighligting="_effct_hide_highlighting_tmp"
},_initTransition:function(){this._oMorph=new jindo.m.Morph({fEffect:this.option("fEffect")||(this.option("sEffect")?this._getEffect(this.option("sEffect")):null),bUseTransition:jindo.m.useTimingFunction()})
},_getEffect:function(sValue){var oEffect=jindo.m.Effect.cubicEaseInOut;
switch(sValue){case"linear":oEffect=jindo.m.Effect.linear;
break;
case"ease":oEffect=jindo.m.Effect.cubicEase;
break;
case"ease-in":oEffect=jindo.m.Effect.cubicEaseIn;
break;
case"ease-out":oEffect=jindo.m.Effect.cubicEaseOut;
break;
case"ease-in-out":oEffect=jindo.m.Effect.cubicEaseInOut;
break
}return oEffect
},_createEffect:function(sType){if(this._htEffect[sType]&&!this._htEffectInstance[sType]){try{this._htEffectInstance[sType]=eval("new "+this._htEffect[sType]+"()")
}catch(e){}this._htEffectInstance[sType].setLayerInfo(this._htLayerInfo)
}},_createFunc:function(){var aFunc=["slide","pop","flip","fade","expand","contract"];
for(var i=0,nFor=aFunc.length;
i<nFor;
i++){this[aFunc[i]]=(function(sFunc){return function(htOption){var sType=sFunc;
if(typeof arguments[0]=="string"||arguments[0].nodeType==1){this.setLayer(arguments[0]);
var htSecondArg=arguments[2]||{};
htSecondArg.sDirection=arguments[1];
this._run(sType,htSecondArg)
}else{this._run(sType,htOption)
}}
})(aFunc[i])
}},isPlaying:function(){return this._oMorph.isPlaying()
},_fireCustomEvent:function(sType,htOption){return this.fireEvent(sType,htOption)
},_run:function(sType,htOption){if(!this._isAvailableEffect()){return
}this._createEffect(sType);
if(typeof htOption==="undefined"){htOption={}
}var oEffect=this._htEffectInstance[sType];
var el=this.getLayer();
var nDuration=(typeof htOption.nDuration==="undefined")?this.option("nDuration"):parseInt(htOption.nDuration,10);
var htBefore=oEffect.getBeforeCommand(el,htOption);
var htCommand=oEffect.getCommand(el,htOption);
this._htCurrentTask=htOption;
this._htCurrentTask.elLayer=el;
this._htCurrentTask.sTaskName=htCommand.sTaskName;
this._htCurrentTask.nDuration=nDuration;
if(!this._fireCustomEvent("beforeEffect",{elLayer:el,sEffect:htCommand.sTaskName,nDuration:nDuration})){return
}if(htBefore){this._oMorph.pushAnimate(-1,[this.getLayer(),htBefore.htStyle])
}var self=this;
if(htOption.sEffect){this._oMorph.pushCall(function(){this.option({fEffect:self._getEffect(htOption.sEffect)})
})
}nDuration=nDuration==0?-1:nDuration;
this._oMorph.pushAnimate(nDuration,[this.getLayer(),htCommand.htStyle]);
if(htCommand.fCallback){if(typeof htCommand.fCallback=="function"){this._oMorph.pushCall(function(){htCommand.fCallback()
})
}else{if(typeof htCommand.fCallback=="object"){this._oMorph.pushAnimate(-1,[this.getLayer(),htCommand.fCallback.htStyle||{}])
}}}this._oMorph.play()
},setLayer:function(el){this._htWElement.el=jindo.$(el);
this._htWElement.wel=jindo.$Element(this._htWElement.el);
var elFocus;
if(!!this.bAndroid){elFocus=jindo.$$.getSingle("."+this.sClassHighligting,this._htWElement.el);
if(!elFocus){var sTpl='<a href="javascript:void(0)" style="position:absolute" class="'+this.sClassHighligting+'"></a>';
elFocus=jindo.$(sTpl);
this._htWElement.wel.append(elFocus);
elFocus.style.opacity="0";
elFocus.style.width=0;
elFocus.style.height=0;
elFocus.style.left="-1000px";
elFocus.style.top="-1000px"
}}this.setSize()
},stop:function(bAfter){if(typeof bAfter==="undefined"){bAfter=true
}if(this._oMorph){this._oMorph.pause(bAfter)
}},clearEffect:function(bAfter){if(this._oMorph){this.stop(bAfter);
this._oMorph.clear()
}},getLayer:function(){return this._htWElement.el
},setSize:function(){var elToMeasure=this._htWElement.el.cloneNode(true);
var welToMeasure=jindo.$Element(elToMeasure);
welToMeasure.opacity(0);
this._htWElement.wel.after(welToMeasure);
welToMeasure.show();
this._htLayerInfo.nWidth=this._htWElement.wel.width();
this._htLayerInfo.nHeight=this._htWElement.wel.height();
welToMeasure.css({position:"absolute",top:"0px",left:"0px"});
this._htLayerInfo.nMarginLeft=parseInt(welToMeasure.css("marginLeft"),10);
this._htLayerInfo.nMarginTop=parseInt(welToMeasure.css("marginTop"),10);
this._htLayerInfo.nMarginLeft=isNaN(this._htLayerInfo.nMarginLeft)?0:this._htLayerInfo.nMarginLeft;
this._htLayerInfo.nMarginTop=isNaN(this._htLayerInfo.nMarginTop)?0:this._htLayerInfo.nMarginTop;
this._htLayerInfo.nOpacity=this._htWElement.wel.opacity();
this._htLayerInfo.sPosition=this._htWElement.wel.css("position");
var sDisplay=this._htWElement.wel.css("display");
sDisplay=((sDisplay==="none")||(sDisplay.length===0))?"block":sDisplay;
this._htLayerInfo.sDisplay=sDisplay;
this._htLayerInfo.sClassHighligting=this.sClassHighligting;
welToMeasure.leave();
this._setEffectLayerInfo()
},_setEffectLayerInfo:function(){for(var p in this._htEffectInstance){this._htEffectInstance[p].setLayerInfo(this._htLayerInfo)
}},_onTransitionEnd:function(oCustomEvent){if(this._htCurrentTask){this._fireCustomEvent("afterEffect",{elLayer:this._htCurrentTask.elLayer,sEffect:this._htCurrentTask.sTaskName,nDuration:this._htCurrentTask.nDuration})
}},_onTransitionStop:function(oCustomEvent){if(oCustomEvent.sTaskName){this._fireCustomEvent("stop",{elLayer:this._htCurrentTask.elLayer,sEffect:this._htCurrentTask.sTaskName,nDuration:this._htCurrentTask.nDuration})
}},_isAvailableEffect:function(){return this.isActivating()
},_onActivate:function(){this._attachEvent();
this._createFunc()
},_onDeactivate:function(){this._detachEvent()
},_attachEvent:function(){this._htEvent={};
this._htEvent.end=jindo.$Fn(this._onTransitionEnd,this).bind();
this._htEvent.stop=jindo.$Fn(this._onTransitionStop,this).bind();
if(this._oMorph){this._oMorph.attach({end:this._htEvent.end,stop:this._htEvent.stop})
}},_detachEvent:function(){this._htEvent=null
},destroy:function(){this.deactivate();
for(var p in this._htWElement){this._htWElement[p]=null
}this._htWElement=null
}}).extend(jindo.m.UIComponent);
jindo.m._Effect_=jindo.$Class({$init:function(){this._sCssPrefix=jindo.m.getCssPrefix();
var htDInfo=jindo.m.getDeviceInfo();
this.bIos=(htDInfo.iphone||htDInfo.ipad);
this.bIos3=htDInfo.iphone&&(htDInfo.version.length>0)&&(htDInfo.version.substring(0,1)=="3");
this.bAndroid=htDInfo.android;
this.bAndroid3Up=htDInfo.android&&(htDInfo.version.length>0)&&(htDInfo.version.substring(0,1)>="3");
this.bAndroid2_1=htDInfo.android&&(htDInfo.version.length>0)&&(htDInfo.version==="2.1");
this.sTranOpen=(this.bIos)?"translate3d(":"translate(";
this.sTranEnd=(this.bIos)?",0px)":")";
this._initVar()
},_initVar:function(){this._htLayerInfo={}
},setLayerInfo:function(htInfo){this._htLayerInfo={};
for(var p in htInfo){this._htLayerInfo[p]=htInfo[p]
}},getTranslateStyle:function(htStyle,htReturn){var htData=htReturn||{};
for(var i in htStyle){htData["@"+i]=htStyle[i]
}return htData
},getTransitionTask:function(){return null
},getBeforeCommand:function(){return null
},getCommand:function(){return null
}});
jindo.m.ContractEffect=jindo.$Class({sEffectName:"contract",getCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"down";
var sProperty="width";
var nSize=this._htLayerInfo.nWidth;
if(sDirection=="up"||sDirection=="down"){sProperty="height";
nSize=this._htLayerInfo.nHeight
}var htStyle=htOption.htTo||{};
htStyle[sProperty]="0px";
if(sDirection=="right"){htStyle.marginLeft=(this._htLayerInfo.nMarginLeft+this._htLayerInfo.nWidth)+"px"
}if(sDirection=="down"){htStyle.marginTop=(this._htLayerInfo.nMarginTop+this._htLayerInfo.nHeight)+"px"
}var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle,htTransform:{},fCallback:{htStyle:{"@marginLeft":this._htLayerInfo.nMarginLeft+"px","@marginTop":this._htLayerInfo.nMarginTop+"px"}}}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"down";
var htBeforeStyle=htOption.htFrom||{};
htBeforeStyle.overflow="hidden";
var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle,htTransform:{}}
}}).extend(jindo.m._Effect_);
jindo.m.DragArea=jindo.$Class({$init:function(el,htOption){this.option({sClassPrefix:"drag-",bFlowOut:false,nThreshold:10,nMoveThreshold:3,bActivateOnload:true});
this.option(htOption||{});
this._initVar();
this._setWrapperElement(el);
this._initTouch();
this._setAnchorElement();
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this._oTouch=null;
this._sDragClass="."+this.option("sClassPrefix")+"dragging";
this._sHandleClass="."+this.option("sClassPrefix")+"handle";
this._htInfo={elDrag:null,elHandle:null,nStartX:null,nStartY:null,nX:null,nY:null,bDragStart:false,nCount:0,bPrepared:false};
this._htTans=jindo.m.useCss3d()?{open:"3d(",end:",0)"}:{open:"(",end:")"};
this._sCssUserSelect="-"+jindo.m.getCssPrefix()+"-user-select";
this._sCssUserSelectValue=document.body.style[this._sCssUserSelect];
var htInfo=jindo.m.getDeviceInfo();
this._isIos=(htInfo.iphone||htInfo.ipad);
this._aAnchor=null;
this._fnDummyFnc=function(){return false
};
this._bBlocked=false;
var nVersion=parseFloat(htInfo.version,10);
this._bTouchStop=false;
this._bTouchStop=htInfo.android&&((nVersion==2.1)||(nVersion>=3));
if(!this._bTouchStop){this._bTouchStop=htInfo.iphone&&(nVersion>=3&&nVersion<4)
}},_setWrapperElement:function(el){this._htWElement={};
el=jindo.$(el);
this._htWElement.base=jindo.$Element(el)
},_initTouch:function(){if(!this._oTouch){this._oTouch=new jindo.m.Touch(this._htWElement.base.$value(),{nSlopeThreshold:1,nMoveThreshold:this.option("nMoveThreshold"),bActivateOnload:false});
this._oTouch.setSlope(-1,-1)
}},_getDragElement:function(el,sClass){if(jindo.$$.test(el,"input[type=text], textarea, select")){return null
}var self=this;
var isChildOfDragArea=function(baseElement,el){if(!el){return false
}if(baseElement===document||baseElement===el){return true
}return jindo.$Element(baseElement).isParentOf(el)
};
var elReturn=jindo.$$.test(el,this._sDragClass)?el:jindo.m.getClosest(this._sDragClass,el);
if(!isChildOfDragArea(this._htWElement.base,elReturn)){elReturn=null
}var elHandle=null;
if(elReturn){try{elHandle=jindo.$$.getSingle(this._sHandleClass,elReturn)
}catch(e){}if(elHandle){if(!isChildOfDragArea(elHandle,el)){elReturn=null
}}}return{elDrag:elReturn,elHandle:elHandle}
},_onStart:function(oCustomEvt){if(!this.isActivating()||this._htInfo.bPrepared){return
}this._initInfo();
var htElement=this._getDragElement(oCustomEvt.element,this._sHandleClass);
if(!htElement.elDrag){return
}var htParam={elHandle:htElement.elHandle,elDrag:htElement.elDrag,oEvent:oCustomEvt.oEvent};
if(!this.fireEvent("handleDown",htParam)){return
}if(this._bTouchStop){oCustomEvt.oEvent.stop()
}this._htInfo.bPrepared=true;
this._clearAnchor();
this._htInfo.welDrag=jindo.$Element(htParam.elDrag);
this._htInfo.elHandle=htParam.elHandle;
var htOffset=this._htInfo.welDrag.offset();
this._htInfo.nStartX=htOffset.left;
this._htInfo.nStartY=htOffset.top;
this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transition","-webkit-transform 0ms");
this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform","translate"+this._htTans.open+this._htInfo.nStartX+"px,"+this._htInfo.nStartY+"px"+this._htTans.end);
this._htInfo.welDrag.css("position","absolute");
this._htInfo.welDrag.offset(0,0);
this._htInfo.nX=this._htInfo.nStartX;
this._htInfo.nY=this._htInfo.nStartY;
this._oTouch.attach({touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd});
document.body.style[this._sCssUserSelect]="none"
},_onMove:function(oCustomEvt){oCustomEvt.oEvent.stop();
if(!this._htInfo.bPrepared){return
}var nDisX=oCustomEvt.nDistanceX,nDisY=oCustomEvt.nDistanceY;
if((Math.abs(nDisX)+Math.abs(nDisY))<this.option("nThreshold")){return
}var htOffset={nX:this._htInfo.nStartX+nDisX,nY:this._htInfo.nStartY+nDisY};
if(!this.option("bFlowOut")){var htNewOffset=this._onReCalculateOffset(this._htInfo.welDrag.$value(),htOffset.nX,htOffset.nY);
htOffset.nX=htNewOffset.nX;
htOffset.nY=htNewOffset.nY
}var htParam={nX:htOffset.nX,nY:htOffset.nY,elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle,nGapX:nDisX,nGapY:nDisY,nDragCount:this._htInfo.nCount,nTouchX:oCustomEvt.nX,nTouchY:oCustomEvt.nY};
if(!this._htInfo.bDragStart){if(!this.fireEvent("dragStart",htParam)){this._htInfo.bPrepared=false;
return
}}this._htInfo.bDragStart=true;
if(!this.fireEvent("beforeDrag",htParam)){return
}this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform","translate"+this._htTans.open+htParam.nX+"px,"+htParam.nY+"px"+this._htTans.end);
this._htInfo.nX=htParam.nX;
this._htInfo.nY=htParam.nY;
this._htInfo.nCount++;
this.fireEvent("drag",htParam)
},_onReCalculateOffset:function(elDrag,nX,nY){var elParent=this._htWElement.base;
var htOffset=elParent.offset();
var htParent={nX:htOffset.left,nY:htOffset.top,nWidth:elParent.$value().offsetWidth,nHeight:elParent.$value().offsetHeight};
var htDrag={nWidth:elDrag.offsetWidth,nHeight:elDrag.offsetHeight};
var newX=Math.max(nX,htParent.nX);
newX=Math.min(newX,htParent.nX+htParent.nWidth-htDrag.nWidth);
var newY=Math.max(nY,htParent.nY);
newY=Math.min(newY,htParent.nY+htParent.nHeight-htDrag.nHeight);
return{nX:newX,nY:newY}
},_onEnd:function(oCustomEvt){if(!this._htInfo.bPrepared){return
}this._stopDrag(false);
this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Transform","");
this._htInfo.welDrag.css(jindo.m.getCssPrefix()+"Translate","");
this._htInfo.welDrag.offset(this._htInfo.nY,this._htInfo.nX);
if(oCustomEvt.sMoveType===jindo.m.MOVETYPE[3]||oCustomEvt.sMoveType===jindo.m.MOVETYPE[4]){this._restoreAnchor()
}if(this._htInfo.welDrag){var htParam={elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle};
this.fireEvent("handleUp",htParam)
}this._initInfo()
},isDragging:function(){return this._htInfo.bDragStart
},stopDragging:function(){this._stopDrag(true)
},_stopDrag:function(bInterupted){if(typeof bInterupted==="undefined"){bInterupted=false
}this._oTouch.detach({touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd});
document.body.style[this._sCssUserSelect]=this._sCssUserSelectValue?this._sCssUserSelectValue:"";
if(this.isDragging()){var htParam={nX:parseInt(this._htInfo.welDrag.css("left"),10)||0,nY:parseInt(this._htInfo.welDrag.css("top"),10)||0,elDrag:this._htInfo.welDrag.$value(),elHandle:this._htInfo.elHandle,bInterupted:bInterupted};
this.fireEvent("dragEnd",htParam);
this._htInfo.bDragStart=false
}},_setAnchorElement:function(){if(this._isIos){this._aAnchor=jindo.$$("A",this._htWElement.base.$value())
}},_clearAnchor:function(){if(this._aAnchor&&!this._bBlocked){var aClickAddEvent=null;
for(var i=0,nILength=this._aAnchor.length;
i<nILength;
i++){if(this._fnDummyFnc!==this._aAnchor[i].onclick){this._aAnchor[i]._onclick=this._aAnchor[i].onclick
}this._aAnchor[i].onclick=this._fnDummyFnc;
aClickAddEvent=this._aAnchor[i].___listeners___||[];
for(var j=0,nJLength=aClickAddEvent.length;
j<nJLength;
j++){___Old__removeEventListener___.call(this._aAnchor[i],"click",aClickAddEvent[j].listener,aClickAddEvent[j].useCapture)
}}this._bBlocked=true
}},_restoreAnchor:function(){if(this._aAnchor&&this._bBlocked){var aClickAddEvent=null;
for(var i=0,nILength=this._aAnchor.length;
i<nILength;
i++){if(this._fnDummyFnc!==this._aAnchor[i]._onclick){this._aAnchor[i].onclick=this._aAnchor[i]._onclick
}else{this._aAnchor[i].onclick=null
}aClickAddEvent=this._aAnchor[i].___listeners___||[];
for(var j=0,nJLength=aClickAddEvent.length;
j<nJLength;
j++){___Old__addEventListener___.call(this._aAnchor[i],"click",aClickAddEvent[j].listener,aClickAddEvent[j].useCapture)
}}this._bBlocked=false
}},_initInfo:function(){this._htInfo.welDrag=null;
this._htInfo.elHandle=null;
this._htInfo.nStartX=null;
this._htInfo.nStartY=null;
this._htInfo.nX=null;
this._htInfo.nY=null;
this._htInfo.bDragStart=false;
this._htInfo.bPrepared=false;
this._htInfo.nCount=0
},_onActivate:function(){this._attachEvent();
this._oTouch.activate()
},_onDeactivate:function(){this._detachEvent();
this._oTouch.deactivate()
},_attachEvent:function(){this._htEvent={};
this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind();
this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind();
this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind();
this._oTouch.attach("touchStart",this._htEvent.touchStart)
},_detachEvent:function(){this._oTouch.detachAll();
for(var p in this._htEvent){this._htEvent[p]=null
}this._htEvent=null
},destroy:function(){this.deactivate();
for(var p in this._htWElement){this._htWElement[p]=null
}for(p in this._htInfo){this._htInfo[p]=null
}this._htWElement=null;
this._htInfo=null;
this._isIos=null;
this._aAnchor=null;
this._fnDummyFnc=null;
this._bBlocked=null;
this._bTouchStop=null
}}).extend(jindo.m.UIComponent);
jindo.m.DropArea=jindo.$Class({$init:function(el,htOption){this.option({sClassPrefix:"drop-",oDragInstance:null,bActivateOnload:true,bUseTouchPoint:false});
this.option(htOption||{});
this._initVar();
this._setWrapperElement(el);
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this._waOveredDroppableElement=jindo.$A([]);
this._sEvent="ontouchstart" in window?"touchmove":"mousemove";
this._sDropClassName="."+this.option("sClassPrefix")+"area";
this._aItem=null;
this._aItemRect=null;
this._elHandle=null;
this._elDragging=null;
var htInfo=jindo.m.getDeviceInfo();
this._bReCalculateOffset=((htInfo.iphone||htInfo.ipad)&&htInfo.bInapp)?false:true
},_setWrapperElement:function(el){this._htWElement={};
el=jindo.$(el);
this._htWElement.base=jindo.$Element(el)
},_getRectInfo:function(el){var htOffset=jindo.$Element(el).offset();
var nVectorX=0;
var nVectorY=0;
if(this._bReCalculateOffset){jindo.$Element(el).parent(function(v){var htCssOffset=jindo.m.getCssOffset(v.$value());
nVectorX+=htCssOffset.left;
nVectorY+=htCssOffset.top
})
}return{nLeft:htOffset.left+(nVectorX),nTop:htOffset.top+(nVectorY),nRight:htOffset.left+nVectorX+el.offsetWidth,nBottom:htOffset.top+nVectorY+el.offsetHeight}
},_reCalculate:function(){var elBase=this._htWElement.base.$value();
var aItem=jindo.$$(this._sDropClassName,elBase);
if(elBase.tagName&&jindo.$$.test(elBase,this._sDropClassName)){aItem.push(elBase)
}this._aItem=aItem;
this._aItemRect=[];
for(var i=0,el;
(el=aItem[i]);
i++){this._aItemRect.push(this._getRectInfo(el))
}},_findDroppableElement:function(el){var elDroppable=jindo.$$.test(el,this._sDropClassName)?el:jindo.m.getClosest(this._sDropClassName,el);
if(!this._isChildOfDropArea(el)){elDroppable=null
}return elDroppable
},_isChildOfDropArea:function(el){if(this._el===document||this._el===el){return true
}return this._htWElement.base.isParentOf(el)
},_isDropMove:function(nLeft,nTop,nRight,nBottom){var aItem=this._aItem;
var aItemRect=this._aItemRect,i,htRect,el;
if(!this.option("bUseTouchPoint")){for(i=0;
((htRect=aItemRect[i])&&(el=aItem[i]));
i++){var bHOver=this._checkOverArea({nMin:htRect.nLeft,nMax:htRect.nRight},{nMin:nLeft,nMax:nRight});
var bVOver=this._checkOverArea({nMin:htRect.nTop,nMax:htRect.nBottom},{nMin:nTop,nMax:nBottom});
if(bHOver&&bVOver){this._addOveredDroppableElement(el);
this._fireMoveEvent(el,htRect,{nX:nLeft,nY:nTop})
}else{this._removeOveredDroppableElement(el)
}}}else{for(i=0;
((htRect=aItemRect[i])&&(el=aItem[i]));
i++){if(htRect.nLeft<=nLeft&&nLeft<=htRect.nRight&&htRect.nTop<=nTop&&nTop<=htRect.nBottom){this._addOveredDroppableElement(el);
this._fireMoveEvent(el,htRect,{nX:nLeft,nY:nTop})
}else{this._removeOveredDroppableElement(el)
}}}},_checkOverArea:function(htBase,htCheck){if(htCheck.nMin<htBase.nMin){if(htCheck.nMax>htBase.nMin){return true
}}else{if(htCheck.nMin<htBase.nMax){return true
}}return false
},_fireMoveEvent:function(elDrop,htRect,htTouchInfo){var nRatioX=(htTouchInfo.nX-htRect.nLeft)/(htRect.nRight-htRect.nLeft);
var nRatioY=(htTouchInfo.nY-htRect.nTop)/(htRect.nBottom-htRect.nTop);
this.fireEvent("move",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:elDrop,nRatioX:nRatioX,nRatioY:nRatioY})
},_addOveredDroppableElement:function(elDroppable){if(this._waOveredDroppableElement.indexOf(elDroppable)==-1){this._waOveredDroppableElement.push(elDroppable);
this.fireEvent("over",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:elDroppable})
}},_removeOveredDroppableElement:function(elDroppable){var nIndex=this._waOveredDroppableElement.indexOf(elDroppable);
if(nIndex!=-1){this._waOveredDroppableElement.splice(nIndex,1);
this.fireEvent("out",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:elDroppable})
}},_clearOveredDroppableElement:function(){for(var elDroppable;
(elDroppable=this._waOveredDroppableElement.$value()[0]);
){this._waOveredDroppableElement.splice(0,1);
this.fireEvent("drop",{elHandle:this._elHandle,elDrag:this._elDragging,elDrop:elDroppable})
}},getOveredLists:function(){return this._waOveredDroppableElement?this._waOveredDroppableElement.$value():[]
},_onActivate:function(){this._attachEvent();
if(this.option("oDragInstance")){var oDrag=this.option("oDragInstance");
var self=this;
oDrag.attach({handleDown:function(oCustomEvent){self._elHandle=oCustomEvent.elHandle;
self._elDragging=oCustomEvent.elDrag;
self._waOveredDroppableElement.empty();
self.fireEvent(oCustomEvent.sType,oCustomEvent)
},dragStart:function(oCustomEvent){if(!self.fireEvent(oCustomEvent.sType,oCustomEvent)){oCustomEvent.stop()
}else{self._reCalculate()
}},beforeDrag:function(oCustomEvent){self.fireEvent(oCustomEvent.sType,oCustomEvent)
},drag:function(oCustomEvent){self._elDragging=oCustomEvent.elDrag;
var wel=jindo.$Element(oCustomEvent.elDrag);
var nTop=self.option("bUseTouchPoint")?oCustomEvent.nTouchY:oCustomEvent.nY;
var nLeft=self.option("bUseTouchPoint")?oCustomEvent.nTouchX:oCustomEvent.nX;
var nRight=nLeft+wel.width();
var nBottom=nTop+wel.height();
self._isDropMove(nLeft,nTop,nRight,nBottom);
self.fireEvent(oCustomEvent.sType,oCustomEvent)
},dragEnd:function(oCustomEvent){var oParam={};
oParam.aElDrop=self.getOveredLists().concat();
for(var p in oCustomEvent){oParam[p]=oCustomEvent[p]
}self._clearOveredDroppableElement();
self.fireEvent(oCustomEvent.sType,oParam)
},handleUp:function(oCustomEvent){self.fireEvent("handleUp",{elHandle:self._elHandle,elDrag:self._elDragging});
self._elHandle=null;
self._elDragging=null
}})
}},_onDeactivate:function(){this._detachEvent();
if(this.option("oDragInstance")){var oDrag=this.option("oDragInstance");
oDrag.detachAll()
}},_attachEvent:function(){this._htEvent={}
},_detachEvent:function(){this._htEvent=null
},destroy:function(){this.deactivate();
for(var p in this._htWElement){this._htWElement[p]=null
}this._htWElement=null
}}).extend(jindo.m.UIComponent);
jindo.m.Scroll=jindo.$Class({$init:function(el,htUserOption){this.option({bActivateOnload:true,bUseHScroll:false,bUseVScroll:true,bUseMomentum:true,nDeceleration:0.0006,nOffsetTop:0,nOffsetBottom:0,nHeight:0,nWidth:0,bUseBounce:true,bUseHighlight:true,sClassPrefix:"scroll_",bUseCss3d:jindo.m.useCss3d(true),bUseTimingFunction:jindo.m.useTimingFunction(true),bAutoResize:false,bUseDiagonalTouch:true,fEffect:jindo.m.Effect.cubicBezier(0.18,0.35,0.56,1),nZIndex:2000,sListElement:"",nRatio:1.5,bUseScrollbar:true,nScrollbarHideThreshold:0,bUseFixedScrollbar:false,sScrollbarBorder:"1px solid white",sScrollbarColor:"#8e8e8e",bUseScrollBarRadius:true,bUsePullDown:false,bUsePullUp:false,fnPullDownIdle:null,fnPullDownBeforeUpdate:null,fnPullDownUpdating:null,fnPullUpIdle:null,fnPullUpBeforeUpdate:null,fnPullUpUpdating:null});
this.option(htUserOption||{});
this._initVar();
this._setWrapperElement(el);
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this.isPositionBug=jindo.m.hasOffsetBug();
this.isClickBug=jindo.m.hasClickBug();
this.nVersion=parseFloat(jindo.m.getDeviceInfo().version.substr(0,3));
this.sCssPrefix=jindo.m.getCssPrefix();
this._bUseCss3d=this.option("bUseCss3d");
this.nWrapperW=null;
this.nWrapperH=null;
this.nScrollW=null;
this.nScrollH=null;
this.nMaxScrollLeft=null;
this.nMaxScrollTop=null;
this.nMinScrollTop=0;
this.bUseHScroll=null;
this.bUseVScroll=null;
this.bUseHighlight=this.option("bUseHighlight");
this._nPropHScroll=null;
this._nPropVScroll=null;
this._nLeft=0;
this._nTop=0;
this._aAni=[];
this._htTimer={ani:-1,fixed:-1,touch:-1,scrollbar:-1};
this._htPlugin={dynamic:{},pull:{}};
this._oTouch=null;
this._isAnimating=false;
this._isControling=false;
this._isStop=false;
if(this.option("sListElement")){this.option("bUseTimingFunction",false)
}if(this.bUseHighlight){this._sHighlightClass="_jmc_no_tap_highlight_";
this._hasHighlightBug=jindo.m.getBrowserInfo().chrome&&!jindo.m.getBrowserInfo().bSBrowser;
this._nHightlightBug=-1;
this._hasHighlightBug&&this._makeHighlightStyle();
if(this.isPositionBug){this._elDummyTag=null
}}this._nUpdater=-1;
this._oMoveData={nLeft:0,nTop:0}
},getCurrentPos:function(){return{nTop:this._nTop,nLeft:this._nLeft}
},setLayer:function(el){this._htWElement.wrapper=jindo.$Element(el);
this._htWElement.wrapper.css({overflow:"hidden",zIndex:this.option("nZIndex")});
if(this._htWElement.wrapper.css("position")=="static"){this._htWElement.wrapper.css("position","relative")
}if(!this.bUseHighlight){this._htWElement.wrapper.css(jindo.m._toPrefixStr("TapHighlightColor"),"rgba(0,0,0,0)")
}this.setScroller()
},setScroller:function(){this._htWElement.scroller=this._htWElement.wrapper.first();
this._htWElement.scroller.css({position:"absolute",zIndex:1,left:0,top:0});
this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionProperty"),this.sCssPrefix==""?"transform":"-"+this.sCssPrefix+"-transform").css(this.sCssPrefix+"Transform",jindo.m._getTranslate(0,0,this._bUseCss3d));
if(this.option("bUseTimingFunction")){this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionTimingFunction"),this.option("fEffect").toString())
}if(this.isPositionBug&&this.bUseHighlight&&this.nVersion<3){this._elDummyTag=this._htWElement.scroller.query("._scroller_dummy_atag_");
if(!this._elDummyTag){this._elDummyTag=jindo.$("<a href='javascript:void(0);' style='position:absolute;height:0px;width:0px;' class='_scroller_dummy_atag_'></a>");
this._htWElement.scroller.append(this._elDummyTag)
}else{this._elDummyTag=this._elDummyTag.$value()
}}},width:function(nValue){if(nValue){this.option("nWidth",nValue);
this.refresh()
}else{if(this.option("nWidth")){return parseInt(this.option("nWidth"),10)
}else{return this._htWElement.wrapper.width()
}}},height:function(nValue){if(nValue){this.option("nHeight",nValue);
this.refresh()
}else{if(this.option("nHeight")){return parseInt(this.option("nHeight"),10)
}else{return this._htWElement.wrapper.height()
}}},_setWrapperElement:function(el){this._htWElement={};
this.setLayer(el)
},hasHScroll:function(){return this.bUseHScroll
},hasVScroll:function(){return this.bUseVScroll
},_createDynamicPlugin:function(sDirection){var ht={nRatio:this.option("nRatio"),sListElement:this.option("sListElement"),sDirection:sDirection};
if(this._inst("dynamic")){this._inst("dynamic").option(ht)
}else{this._htPlugin.dynamic.o=new jindo.m.DynamicPlugin(this._htWElement.wrapper,ht)
}this._inst("dynamic").refresh(sDirection=="V"?this._nTop:this._nLeft);
this.option("bUseTimingFunction",false);
this._htPlugin.dynamic.bUse=true
},_refreshDynamicPlugin:function(){this._htPlugin.dynamic.bUse=false;
if(this.option("sListElement")&&!(this.bUseVScroll&&this.bUseHScroll)){var nRange=this.option("nRatio")*2;
if(this.bUseVScroll&&(this.nScrollH>(this.nWrapperH*nRange))){this._createDynamicPlugin("V")
}else{if(this.bUseHScroll&&(this.nScrollW>(this.nWrapperW*nRange))){this._createDynamicPlugin("H")
}}}},_refreshPullPlugin:function(){this._htPlugin.pull.bUse=this.option("bUsePullDown")||this.option("bUsePullUp");
if(!this._isUse("pull")){return false
}if(!this._inst("pull")){this._htPlugin.pull.o=new jindo.m.PullPlugin(this)
}this._inst("pull").refresh();
return true
},refresh:function(bNoRepos){if(!this.isActivating()){return
}this._hasHighlightBug&&this._htWElement.wrapper.addClass(this._sHighlightClass);
this.option("nWidth")&&this._htWElement.wrapper.width(parseInt(this.option("nWidth"),10));
this.option("nHeight")&&this._htWElement.wrapper.height(parseInt(this.option("nHeight"),10));
var nWidthLeft=parseInt(this._htWElement.wrapper.css("border-left-width"),10),nWidthRight=parseInt(this._htWElement.wrapper.css("border-right-width"),10),nHeightTop=parseInt(this._htWElement.wrapper.css("border-top-width"),10),nHeightBottom=parseInt(this._htWElement.wrapper.css("border-bottom-width"),10);
nWidthLeft=isNaN(nWidthLeft)?0:nWidthLeft;
nWidthRight=isNaN(nWidthRight)?0:nWidthRight;
nHeightTop=isNaN(nHeightTop)?0:nHeightTop;
nHeightBottom=isNaN(nHeightBottom)?0:nHeightBottom;
this.nWrapperW=this._htWElement.wrapper.width()-nWidthLeft-nWidthRight;
this.nWrapperH=this._htWElement.wrapper.height()-nHeightTop-nHeightBottom;
if(!this._refreshPullPlugin()){this.nScrollW=this._htWElement.scroller.width();
this.nScrollH=this._htWElement.scroller.height()-this.option("nOffsetBottom");
this.nMinScrollTop=-this.option("nOffsetTop");
this.nMaxScrollTop=this.nWrapperH-this.nScrollH
}this.nMaxScrollLeft=this.nWrapperW-this.nScrollW;
this.bUseHScroll=this.option("bUseHScroll")&&(this.nWrapperW<=this.nScrollW);
this.bUseVScroll=this.option("bUseVScroll")&&(this.nWrapperH<=this.nScrollH);
if(this.bUseHScroll&&!this.bUseVScroll){this._htWElement.scroller.$value().style.height="100%"
}if(!this.bUseHScroll&&this.bUseVScroll){this._htWElement.scroller.$value().style.width="100%"
}this._refreshDynamicPlugin();
if(this.option("bUseScrollbar")){this._refreshScroll("V");
this._refreshScroll("H")
}(!this.bUseHScroll&&!this.bUseVScroll)&&this._fixPositionBug();
(!bNoRepos)&&this.restorePos(0)
},_setPos:function(nLeft,nTop){var sDirection;
nLeft=this.bUseHScroll?parseInt(nLeft,10):0;
nTop=this.bUseVScroll?parseInt(nTop,10):0;
this._isUse("dynamic")&&(sDirection=this._checkDirection(nLeft,nTop));
var htParam={nLeft:this._nLeft,nTop:this._nTop,nNextLeft:nLeft,nNextTop:nTop,nVectorX:nLeft-this._nLeft,nVectorY:nTop-this._nTop};
if(this._fireEvent("beforePosition",htParam)){this._isControling=true;
this._nLeft=nLeft=htParam.nNextLeft;
this._nTop=nTop=htParam.nNextTop;
this._isUse("dynamic")&&this._inst("dynamic").updateListStatus(sDirection,this.bUseVScroll?this._nTop:this._nLeft);
if(this.bUseHighlight&&this.isPositionBug){var htStyleOffset=this.getStyleOffset(this._htWElement.scroller);
nLeft-=htStyleOffset.left;
nTop-=htStyleOffset.top
}this._htWElement.scroller.css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate(nLeft+"px",nTop+"px",this._bUseCss3d));
if(this.option("bUseScrollbar")){this._htTimer.scrollbar=clearTimeout(this._htTimer.scrollbar);
this._setScrollBarPos("V",this._nTop);
this._setScrollBarPos("H",this._nLeft)
}this._oMoveData={nLeft:this._nLeft,nTop:this._nTop};
this._fireEvent("position",{nLeft:this._nLeft,nTop:this._nTop})
}else{this._isAnimating=false
}},_isUse:function(sName){return this._htPlugin[sName].bUse
},_inst:function(sName){return this._htPlugin[sName].o
},_checkDirection:function(nLeft,nTop){var nBeforePos=this.bUseVScroll?this._nTop:this._nLeft,nAfterPos=this.bUseVScroll?nTop:nLeft,sDirection;
if(nBeforePos>nAfterPos){sDirection="forward"
}else{sDirection="backward"
}return sDirection
},restorePos:function(nDuration){if(!this.bUseHScroll&&!this.bUseVScroll){return
}var nNewLeft=this.getPosLeft(this._nLeft),nNewTop=this.getPosTop(this._nTop);
if(nNewLeft===this._nLeft&&nNewTop===this._nTop){this._isControling=false;
this._isStop=false;
this._fireAfterScroll();
this._fixPositionBug();
return
}else{this._scrollTo(nNewLeft,nNewTop,nDuration)
}},_getMomentum:function(nDistance,nSpeed,nMomentum,nSize,nMaxDistUpper,nMaxDistLower){var nDeceleration=this.option("nDeceleration"),nNewDist=nMomentum/nDeceleration,nNewTime=0,nOutsideDist=0;
if(nDistance<0&&nNewDist>nMaxDistUpper){nOutsideDist=nSize/(6/(nNewDist/nSpeed*nDeceleration));
nMaxDistUpper=nMaxDistUpper+nOutsideDist;
nSpeed=nSpeed*nMaxDistUpper/nNewDist;
nNewDist=nMaxDistUpper
}else{if(nDistance>0&&nNewDist>nMaxDistLower){nOutsideDist=nSize/(6/(nNewDist/nSpeed*nDeceleration));
nMaxDistLower=nMaxDistLower+nOutsideDist;
nSpeed=nSpeed*nMaxDistLower/nNewDist;
nNewDist=nMaxDistLower
}}nNewDist=nNewDist*(nDistance>0?-1:1);
nNewTime=nSpeed/nDeceleration;
return{nDist:nNewDist,nTime:Math.round(nNewTime)}
},_stop:function(){if(this.option("bUseTimingFunction")){jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd);
this._transitionTime(0)
}else{cancelAnimationFrame(this._htTimer.ani);
this._stopUpdater()
}this._setPos(this._nLeft,this._nTop);
this._aAni=[];
this._isAnimating=false;
this._isStop=true
},_scrollTo:function(nLeft,nTop,nDuration){this._stop();
nLeft=this.bUseHScroll?nLeft:0;
nTop=this.bUseVScroll?nTop:0;
this._aAni.push({nLeft:nLeft,nTop:nTop,nDuration:nDuration||0});
this._animate()
},scrollTo:function(nLeft,nTop,nDuration){nDuration=nDuration||0;
nLeft=-Math.abs(nLeft);
nTop=-Math.abs(nTop);
nTop+=this.getTop();
this._scrollTo((nLeft>=this.getLeft()?this.getLeft():(nLeft<=this.getRight()?this.getRight():nLeft)),(nTop>=this.getTop()?this.getTop():(nTop<=this.getBottom()?this.getBottom():nTop)),nDuration)
},getRight:function(){return this.nMaxScrollLeft
},getLeft:function(){return 0
},getBottom:function(){return this.nMaxScrollTop
},getTop:function(){return this.nMinScrollTop
},isMoving:function(){return this._isControling
},_animate:function(){var self=this,oStep;
if(this._isAnimating){return
}if(!this._aAni.length){this.restorePos(300);
return
}do{oStep=this._aAni.shift();
if(!oStep){return
}}while(oStep.nLeft==this._nLeft&&oStep.nTop==this._nTop);
if(oStep.nDuration==0){if(this.option("bUseTimingFunction")){this._transitionTime(0)
}this._setPos(oStep.nLeft,oStep.nTop);
this._animate()
}else{this._isAnimating=true;
if(this.option("bUseTimingFunction")){this._transitionTime(oStep.nDuration);
this._setPos(oStep.nLeft,oStep.nTop);
this._isAnimating=false;
jindo.m.attachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd)
}else{self._startUpdater();
var startTime=(new Date()).getTime(),fx=this.bUseHScroll?this.option("fEffect")(this._nLeft,oStep.nLeft):null,fy=this.bUseVScroll?this.option("fEffect")(this._nTop,oStep.nTop):null,now;
(function animate(){now=(new Date()).getTime();
if(now>=startTime+oStep.nDuration){self._stopUpdater();
self._setPos(oStep.nLeft,oStep.nTop);
self._isAnimating=false;
self._animate();
return
}now=(now-startTime)/oStep.nDuration;
self._oMoveData={nLeft:fx&&fx(now),nTop:fy&&fy(now)};
if(self._isAnimating){self._htTimer.ani=requestAnimationFrame(animate)
}else{self._stopUpdater()
}})()
}}},_onRotate:function(we){if(this.fireEvent("rotate",{isVertical:we.isVertical})){this.refresh()
}},_transitionTime:function(nDuration){nDuration+="ms";
this._htWElement.scroller.css(jindo.m._toPrefixStr("TransitionDuration"),nDuration);
if(this.option("bUseScrollbar")){this._setScrollbarDuration(nDuration)
}},_setScrollbarDuration:function(nDuration){if(this.bUseHScroll&&this._htWElement.HscrollbarIndicator){this._htWElement.HscrollbarIndicator.css(jindo.m._toPrefixStr("TransitionDuration"),nDuration)
}if(this.bUseVScroll&&this._htWElement.VscrollbarIndicator){this._htWElement.VscrollbarIndicator.css(jindo.m._toPrefixStr("TransitionDuration"),nDuration)
}},_stopScroll:function(){var htCssOffset=jindo.m.getTranslateOffset(this._htWElement.scroller.$value()),htStyleOffset={left:0,top:0},nTop,nLeft;
if(this.isPositionBug&&this.bUseHighlight){htStyleOffset=this.getStyleOffset(this._htWElement.scroller)
}nLeft=htCssOffset.left+htStyleOffset.left;
nTop=htCssOffset.top+htStyleOffset.top;
if(!this.option("bUseFixedScrollbar")){this._hideScrollBar("V");
this._hideScrollBar("H")
}this._stopUpdater();
this._stop();
this._setPos(this.getPosLeft(nLeft),this.getPosTop(nTop));
this._isControling=false;
this._fireAfterScroll();
this._fixPositionBug()
},getStyleOffset:function(wel){var nLeft=parseInt(wel.css("left"),10),nTop=parseInt(wel.css("top"),10);
nLeft=isNaN(nLeft)?0:nLeft;
nTop=isNaN(nTop)?0:nTop;
return{left:nLeft,top:nTop}
},getPosLeft:function(nPos){if(this.bUseHScroll){return(nPos>=0?0:(nPos<=this.nMaxScrollLeft?this.nMaxScrollLeft:nPos))
}else{return 0
}},getPosTop:function(nPos){if(this.bUseVScroll){return(nPos>=this.nMinScrollTop?this.nMinScrollTop:(nPos<=this.nMaxScrollTop?this.nMaxScrollTop:nPos))
}else{return 0
}},_hideScrollBar:function(sDirection){if(!this._htWElement){return
}var wel=this._htWElement[sDirection+"scrollbar"],bUseScroll=(sDirection==="H"?this.bUseHScroll:this.bUseVScroll);
if(bUseScroll&&wel){wel.hide();
wel.css("left",wel.css("left")+"px");
if(this.isPositionBug&&this.bUseHighlight){this.makeStylePos(this._htWElement[sDirection+"scrollbarIndicator"])
}}},_fireAfterScroll:function(){if(this.option("bUseScrollbar")){var self=this;
this._htTimer.scrollbar=setTimeout(function(){if(!self.option("bUseFixedScrollbar")){self._hideScrollBar("V");
self._hideScrollBar("H")
}},this.option("nScrollbarHideThreshold"))
}this._fireEvent("afterScroll")
},_fireEventbeforeScroll:function(htParam){return this.fireEvent("beforeScroll",htParam)
},_fireEventScroll:function(htParam){this.fireEvent("scroll",htParam)
},_fireEvent:function(sType){return this.fireEvent(sType,this._getNowPosition())
},_fireTouchEvent:function(sType,we){return this.fireEvent(sType,this._getNowPosition(we))
},_getNowPosition:function(we){return{nLeft:this._nLeft,nTop:this._nTop,nMaxScrollLeft:this.nMaxScrollLeft,nMaxScrollTop:this.nMaxScrollTop,oEvent:we||{}}
},setUsePullDown:function(bUse){if(this._isUse("pull")){this.option("bUsePullDown",bUse);
this.refresh()
}},setUsePullUp:function(bUse){if(this._isUse("pull")){this.option("bUsePullUp",bUse);
this.refresh()
}},_onUpdater:function(we){if(this._oMoveData.nLeft!=this._nLeft||this._oMoveData.nTop!=this._nTop){this._setPos(this._oMoveData.nLeft,this._oMoveData.nTop)
}this._startUpdater()
},_startUpdater:function(){this._stopUpdater();
this._nUpdater=window.requestAnimationFrame(this._htEvent.updater)
},_stopUpdater:function(){window.cancelAnimationFrame(this._nUpdater);
this._nUpdater=-1
},_onStart:function(we){this._clearPositionBug();
this._isStop=false;
if(this._fireTouchEvent("beforeTouchStart",we)){if(this.option("bUseTimingFunction")){this._transitionTime(0)
}this._isAnimating&&this._stopScroll()&&(this._isAnimating=false);
this._isControling=true;
if(!this._fireTouchEvent("touchStart",we)){we.stop()
}}else{we.stop()
}},_onMove:function(we){var nNewLeft=0,nNewTop=0;
this._clearTouchEnd();
this._clearPositionBug();
this.isClickBug&&this._htWElement.scroller.css("pointerEvents","none");
if(this._fireTouchEvent("beforeTouchMove",we)){if(this._isUse("pull")){this._inst("pull").touchMoveForUpdate(we,this.nMaxScrollTop)
}var weParent=we.oEvent;
if(we.sMoveType===jindo.m.MOVETYPE[0]){if(this.bUseHScroll){if(!this.option("bUseBounce")&&((this._nLeft>=0&&we.nVectorX>0)||(this._nLeft<=this.nMaxScrollLeft&&we.nVectorX<0))){this._forceRestore(we);
return
}else{weParent.stop(jindo.$Event.CANCEL_ALL)
}}else{return true
}}else{if(we.sMoveType===jindo.m.MOVETYPE[1]){if(this.bUseVScroll){if(!this.option("bUseBounce")&&((this._nTop>=this.nMinScrollTop&&we.nVectorY>0)||(this._nTop<=this.nMaxScrollTop&&we.nVectorY<0))){this._forceRestore(we);
return
}else{weParent.stop(jindo.$Event.CANCEL_ALL)
}}else{return true
}}else{if(we.sMoveType===jindo.m.MOVETYPE[2]){if(this.option("bUseDiagonalTouch")){weParent.stop(jindo.$Event.CANCEL_ALL)
}else{return
}}else{weParent.stop(jindo.$Event.CANCEL_ALL);
return true
}}}if(this.option("bUseBounce")){if(this.bUseHScroll){nNewLeft=this._nLeft+(this._nLeft>=0||this._nLeft<=this.nMaxScrollLeft?we.nVectorX/2:we.nVectorX)
}if(this.bUseVScroll){nNewTop=this._nTop+(this._nTop>=this.nMinScrollTop||this._nTop<=this.nMaxScrollTop?we.nVectorY/2:we.nVectorY)
}var self=this;
this._htTimer.touch=setTimeout(function(){self._forceRestore(we)
},500)
}else{nNewLeft=this.getPosLeft(this._nLeft+we.nVectorX);
nNewTop=this.getPosTop(this._nTop+we.nVectorY)
}this._setPos(nNewLeft,nNewTop);
if(!this._fireTouchEvent("touchMove",we)){we.stop()
}}else{we.stop()
}},_onEnd:function(we){if(this._isUse("pull")){this._inst("pull").pullUploading()
}if(this._fireTouchEvent("beforeTouchEnd",we)){this._clearPositionBug();
this._clearTouchEnd();
if(we.sMoveType===jindo.m.MOVETYPE[0]||we.sMoveType===jindo.m.MOVETYPE[1]||we.sMoveType===jindo.m.MOVETYPE[2]){this._endForScroll(we);
if(this.nVersion<4.1){we.oEvent.stop(jindo.$Event.CANCEL_DEFAULT)
}}else{this._isControling=false;
if(!this._isStop){this._tapHighlight()
}}if(!this._fireTouchEvent("touchEnd",we)){we.stop()
}}else{we.stop()
}this.isClickBug&&this._htWElement.scroller.css("pointerEvents","auto")
},_makeHighlightStyle:function(){var elStyleTag=jindo.$("_jmc_no_tap_highlight_tag_");
if(!elStyleTag){elStyleTag=document.createElement("style");
var elHTML=document.getElementsByTagName("html")[0];
elStyleTag.type="text/css";
elStyleTag.id="_jmc_no_tap_highlight_tag_";
elHTML.insertBefore(elStyleTag,elHTML.firstChild);
var oSheet=elStyleTag.sheet||elStyleTag.styleSheet;
oSheet.insertRule("."+this._sHighlightClass+" { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0);
oSheet.insertRule("."+this._sHighlightClass+" * { -webkit-tap-highlight-color: rgba(0,0,0,0); }",0)
}},_tapHighlight:function(){if(this._hasHighlightBug){this._htWElement.wrapper.removeClass(this._sHighlightClass);
var self=this;
clearTimeout(this._nHightlightBug);
this._nHightlightBug=setTimeout(function(){self._htWElement.wrapper.addClass(self._sHighlightClass)
},200)
}},_forceRestore:function(we){we.nMomentumX=we.nMomentumY=null;
this._endForScroll(we);
this._clearPositionBug();
this._clearTouchEnd()
},_endForScroll:function(we){clearTimeout(this._nFixedDubbleEndBugTimer);
var htMomentumX={nDist:0,nTime:0},htMomentumY={nDist:0,nTime:0},htParam={nMomentumX:we.nMomentumX,nMomentumY:we.nMomentumY,nDistanceX:we.nDistanceX,nDistanceY:we.nDistanceY,nLeft:this._nLeft,nTop:this._nTop};
if(this.option("bUseMomentum")&&(we.nMomentumX||we.nMomentumY)){if(this.bUseHScroll){htMomentumX=this._getMomentum(-we.nDistanceX,we.nSpeedX,we.nMomentumX,this.nWrapperW,-this._nLeft,-this.nMaxScrollLeft+this._nLeft)
}if(this.bUseVScroll){htMomentumY=this._getMomentum(-we.nDistanceY,we.nSpeedY,we.nMomentumY,this.nWrapperH,-this._nTop,-this.nMaxScrollTop+this._nTop)
}htParam.nNextLeft=this._nLeft+htMomentumX.nDist;
htParam.nNextTop=this._nTop+htMomentumY.nDist;
htParam.nTime=Math.max(Math.max(htMomentumX.nTime,htMomentumY.nTime),10);
if(this._fireEventbeforeScroll(htParam)){if(this.option("bUseBounce")){this._scrollTo(htParam.nNextLeft,htParam.nNextTop,htParam.nTime)
}else{this._scrollTo(this.getPosLeft(htParam.nNextLeft),this.getPosTop(htParam.nNextTop),htParam.nTime)
}this._fireEventScroll(htParam)
}}else{htParam.nNextLeft=this._nLeft;
htParam.nNextTop=this._nTop;
htParam.nTime=0;
if(this._fireEventbeforeScroll(htParam)){if(this._nLeft!==htParam.nNextLeft||this._nTop!==htParam.nNextTop){this._scrollTo(htParam.nNextLeft,htParam.nNextTop,htParam.nTime)
}else{this.restorePos(300)
}this._fireEventScroll(htParam)
}}},_onTransitionEnd:function(we){jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd);
this._animate()
},_onDocumentStart:function(we){if(this._htWElement.wrapper.visible()){if(this._htWElement.wrapper.isChildOf(we.element)){return true
}else{if(this._isAnimating&&this._isControling){this._stopScroll()
}}}},_onActivate:function(){if(!this._oTouch){this._oTouch=new jindo.m.Touch(this._htWElement.wrapper.$value(),{nMoveThreshold:0,nMomentumDuration:(jindo.m.getDeviceInfo().android?500:200),nUseDiagonal:0,nTapThreshold:1,nSlopeThreshold:5,nEndEventThreshold:(jindo.m.getDeviceInfo().win8?100:0),bHorizental:this.option("bUseHScroll"),bVertical:this.option("bUseVScroll")})
}else{this._oTouch.activate()
}this._attachEvent();
this.refresh()
},_onDeactivate:function(){this._detachEvent();
this._oTouch.deactivate()
},_attachEvent:function(){this._htEvent={};
this._htEvent.touchStart=jindo.$Fn(this._onStart,this).bind();
this._htEvent.touchMove=jindo.$Fn(this._onMove,this).bind();
this._htEvent.touchEnd=jindo.$Fn(this._onEnd,this).bind();
this._htEvent.TransitionEnd=jindo.$Fn(this._onTransitionEnd,this).bind();
this._htEvent.document=jindo.$Fn(this._onDocumentStart,this).attach(document,"touchstart");
this._oTouch.attach({touchStart:this._htEvent.touchStart,touchMove:this._htEvent.touchMove,touchEnd:this._htEvent.touchEnd});
if(this.option("bAutoResize")){this._htEvent.rotate=jindo.$Fn(this._onRotate,this).bind();
jindo.m.bindRotate(this._htEvent.rotate)
}if(!this.option("bUseTimingFunction")){this._htEvent.updater=jindo.$Fn(this._onUpdater,this).bind()
}},_fixPositionBug:function(){if(this.isPositionBug&&this.bUseHighlight){var self=this;
this._clearPositionBug();
this._htTimer.fixed=setTimeout(function(){if(self._htWElement&&self._htWElement.scroller){self.makeStylePos(self._htWElement.scroller);
if(self.nVersion<=3){self._elDummyTag.focus()
}}},200)
}},makeStylePos:function(wel){var ele=wel.$value();
var htCssOffset=jindo.m.getTranslateOffset(ele);
var htScrollOffset=wel.offset();
if(this.nVersion>=4){ele.style[jindo.m._toPrefixStr("Transform")]=jindo.m._getTranslate(0,0,this._bUseCss3d)
}else{ele.style[jindo.m._toPrefixStr("Transform")]=null
}ele.style[jindo.m._toPrefixStr("TransitionDuration")]=null;
wel.offset(htCssOffset.top+htScrollOffset.top,htCssOffset.left+htScrollOffset.left)
},_clearPositionBug:function(){if(this.isPositionBug&&this.bUseHighlight){clearTimeout(this._htTimer.fixed);
this._htTimer.fixed=-1
}},_clearTouchEnd:function(){clearTimeout(this._htTimer.touch);
this._htTimer.touch=-1
},_detachEvent:function(){jindo.m.detachTransitionEnd(this._htWElement.scroller.$value(),this._htEvent.TransitionEnd);
this._htEvent.document.detach(document,"touchstart");
if(this.option("bAutoResize")){jindo.m.unbindRotate(this._htEvent.rotate)
}this._oTouch.detachAll();
if(this._elDummyTag){this._htWElement.scroller.remove(this._elDummyTag)
}if(!this.option("bUseTimingFunction")){this._stopUpdater()
}},_createScroll:function(sDirection){if(!(sDirection==="H"?this.bUseHScroll:this.bUseVScroll)){return
}var welScrollbar=this._htWElement[sDirection+"scrollbar"],welScrollbarIndicator=this._htWElement[sDirection+"scrollbarIndicator"],welWrapper=this._htWElement.wrapper;
if(welScrollbar){welWrapper.remove(welScrollbar);
this._htWElement[sDirection+"scrollbar"]=this._htWElement[sDirection+"scrollbarIndicator"]=null
}welScrollbar=this._createScrollbar(sDirection);
welScrollbarIndicator=this._createScrollbarIndicator(sDirection);
this._htWElement[sDirection+"scrollbar"]=welScrollbar;
this._htWElement[sDirection+"scrollbarIndicator"]=welScrollbarIndicator;
welScrollbar.append(welScrollbarIndicator);
welWrapper.append(welScrollbar)
},_createScrollbar:function(sDirection){var welScrollbar=jindo.$Element("<div>");
welScrollbar.css({position:"absolute",zIndex:100,bottom:(sDirection==="H"?"1px":(this.bUseHScroll?"7":"2")+"px"),right:(sDirection==="H"?(this.bUseVScroll?"7":"2")+"px":"1px"),pointerEvents:"none"});
if(this.option("bUseFixedScrollbar")){welScrollbar.show()
}else{welScrollbar.hide()
}if(sDirection==="H"){welScrollbar.css({height:"5px",left:"2px"})
}else{welScrollbar.css({width:"5px",top:"2px"})
}return welScrollbar
},_createScrollbarIndicator:function(sDirection){var welScrollbarIndicator=jindo.$Element("<div>").css({position:"absolute",zIndex:100,border:this.option("sScrollbarBorder"),pointerEvents:"none",left:0,top:0,backgroundColor:this.option("sScrollbarColor")});
if(jindo.m.getOsInfo().ios&&this.option("bUseScrollBarRadius")){welScrollbarIndicator.css(jindo.m._toPrefixStr("BorderRadius"),"12px")
}welScrollbarIndicator.css(jindo.m._toPrefixStr("TransitionProperty"),this.sCssPrefix==""?"transform":"-"+this.sCssPrefix+"-transform").css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate(0,0,this._bUseCss3d));
if(this.option("bUseTimingFunction")){welScrollbarIndicator.css(jindo.m._toPrefixStr("TransitionTimingFunction"),this.option("fEffect").toString())
}if(sDirection==="H"){welScrollbarIndicator.height(5)
}else{welScrollbarIndicator.width(5)
}return welScrollbarIndicator
},_refreshScroll:function(sDirection){if(sDirection==="H"){if(!this.bUseHScroll||this.nWrapperW==this.nScrollW){return
}}else{if(!this.bUseVScroll||this.nWrapperH==this.nScrollH){return
}}if(!this._htWElement[sDirection+"scrollbar"]){this._createScroll(sDirection)
}var welScrollbar=this._htWElement[sDirection+"scrollbar"],welScrollbarIndicator=this._htWElement[sDirection+"scrollbarIndicator"],nSize=0;
if(sDirection==="H"){nSize=Math.max(Math.round(Math.pow(this.nWrapperW,2)/this.nScrollW),8);
this._nPropHScroll=(this.nWrapperW-nSize)/this.nMaxScrollLeft;
welScrollbar.width(this.nWrapperW);
welScrollbarIndicator.width(isNaN(nSize)?0:nSize)
}else{nSize=Math.max(Math.round(Math.pow(this.nWrapperH,2)/this.nScrollH),8);
this._nPropVScroll=(this.nWrapperH-nSize)/this.nMaxScrollTop;
welScrollbar.height(this.nWrapperH);
welScrollbarIndicator.height(isNaN(nSize)?0:nSize)
}},_setScrollBarPos:function(sDirection,nPos){if(!(sDirection==="H"?this.bUseHScroll:this.bUseVScroll)){return
}var welIndicator=this._htWElement[sDirection+"scrollbarIndicator"],welScrollbar=this._htWElement[sDirection+"scrollbar"];
if(!welIndicator||!welScrollbar){return
}nPos=this["_nProp"+sDirection+"Scroll"]*nPos;
if(!this.option("bUseFixedScrollbar")&&welScrollbar&&!welScrollbar.visible()){welScrollbar.show();
if(this.option("bUseTimingFunction")){welScrollbar.$value().clientHeight
}}if(welIndicator){if(this.isPositionBug&&this.bUseHighlight){var nBufferPos=parseInt((sDirection==="H"?welIndicator.css("left"):welIndicator.css("top")),10);
nPos-=isNaN(nBufferPos)?0:nBufferPos
}welIndicator.css(jindo.m._toPrefixStr("Transform"),jindo.m._getTranslate(sDirection=="H"?nPos+"px":0,sDirection=="H"?0:nPos+"px",this._bUseCss3d))
}},destroy:function(){this.deactivate();
for(var p in this._htWElement){this._htWElement[p]=null
}this._htWElement=null;
this._oTouch.destroy();
delete this._oTouch
}}).extend(jindo.m.UIComponent);
jindo.m.DynamicPlugin=jindo.$Class({$init:function(el,htUserOption){this.option({nRatio:1.5,sListElement:"li",sDirection:"V"});
this.option(htUserOption||{});
this._initVar(el)
},_initVar:function(el){this._wel=jindo.$Element(el);
this._aListElement=null;
this._nStartIdx=-1;
this._nEndIdx=-1;
this._nRatio=parseInt(this.option("nRatio"),10);
this._nPos=-1;
this._nSize=-1;
this._sDirection=this.option("sDirection")
},refresh:function(nPos){var aListElement=this._wel.queryAll(this.option("sListElement"));
var wel;
if(!aListElement){return
}this._aListElement=[];
for(var i=0,nLength=aListElement.length;
i<nLength;
i++){wel=jindo.$Element(aListElement[i]);
this._aListElement.push({el:wel.$value(),wel:wel,htRange:this._getElementPos(wel),sDisplay:wel.css("display"),sPosition:wel.css("position")})
}this._nPos=nPos||0;
this._nSize=this._sDirection=="V"?this._wel.height():this._wel.width();
this._covertPositionType()
},_covertPositionType:function(){var nStartPos=this._getStartBoundary(),nEndPos=this._getEndBoundary();
for(var i=0,ht,nLength=this._aListElement.length;
i<nLength;
i++){ht=this._aListElement[i];
if(this._sDirection=="V"){ht.wel.css({top:ht.htRange.nStartPos+"px",width:"100%"})
}else{ht.wel.css({left:ht.htRange.nStartPos+"px",height:"100%"})
}ht.wel.css("position","absolute");
if(ht.htRange.nStartPos<=-nStartPos){this._nStartIdx=i
}else{if(ht.htRange.nEndPos<=-nEndPos){ht.el.style.display=ht.sDisplay;
this._nEndIdx=i
}else{ht.el.style.display="none"
}}}},updateListStatus:function(sDirection,nPos){if(!this._aListElement){return
}this._nPos=nPos;
var nStartPos=this._getStartBoundary(),nEndPos=this._getEndBoundary(),nLength=this._aListElement.length,ht,i,nWelPos;
if(sDirection=="forward"){for(i=this._nStartIdx+1;
i<nLength;
i++){ht=this._aListElement[i];
nWelPos=ht.htRange.nEndPos;
if(nWelPos<-nStartPos){ht.el.style.display="none";
this._nStartIdx=i
}else{break
}}for(i=this._nEndIdx;
i<nLength;
i++){ht=this._aListElement[i];
nWelPos=ht.htRange.nStartPos;
if(nWelPos<-nEndPos){ht.el.style.display=ht.sDisplay;
this._nEndIdx++
}else{break
}}}else{if(sDirection=="backward"){for(i=this._nEndIdx-1;
i>=0;
i--){ht=this._aListElement[i];
nWelPos=ht.htRange.nStartPos;
if(nWelPos<-nEndPos){break
}else{ht.el.style.display="none";
this._nEndIdx--
}}for(i=this._nStartIdx;
i>=0;
i--){ht=this._aListElement[i];
nWelPos=ht.htRange.nEndPos;
if(nWelPos<-nStartPos){break
}else{ht.el.style.display=ht.sDisplay;
this._nStartIdx--
}}}}},_getStartBoundary:function(){return this._nPos+(this._nSize*this._nRatio)
},_getEndBoundary:function(){return this._nPos-this._nSize-(this._nSize*this._nRatio)
},_getElementPos:function(wel){var nStartPos,nEndPos;
if(this._sDirection=="V"){nStartPos=wel.offset().top-this._wel.offset().top;
nEndPos=nStartPos+wel.height()
}else{nStartPos=wel.offset().left-this._wel.offset().left;
nEndPos=nStartPos+wel.width()
}return{nStartPos:nStartPos,nEndPos:nEndPos}
}}).extend(jindo.m.Component);
jindo.m.ExpandEffect=jindo.$Class({sEffectName:"expand",getCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"down";
var sProperty="width";
var nSize=this._htLayerInfo.nWidth;
if(sDirection=="up"||sDirection=="down"){sProperty="height";
nSize=this._htLayerInfo.nHeight
}var htStyle=htOption.htTo||{};
htStyle[sProperty]=(htOption.nDistance||nSize)+"px";
if(sDirection=="left"){htStyle.marginLeft=(htOption.nDistance?(parseInt(this._htLayerInfo.nMarginLeft,10)+nSize)-htOption.nDistance:this._htLayerInfo.nMarginLeft)+"px"
}if(sDirection=="up"){htStyle.marginTop=(htOption.nDistance?(parseInt(this._htLayerInfo.nMarginTop,10)+nSize)-htOption.nDistance:this._htLayerInfo.nMarginTop)+"px"
}var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle,htTransform:{}}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"down";
var sProperty="width";
if(sDirection=="up"||sDirection=="down"){sProperty="height"
}var htBeforeStyle=htOption.htFrom||{};
htBeforeStyle[sProperty]="0";
htBeforeStyle.overflow="hidden";
if(sDirection=="left"){htBeforeStyle.marginLeft=(this._htLayerInfo.nWidth+this._htLayerInfo.nMarginLeft)+"px"
}if(sDirection=="up"){htBeforeStyle.marginTop=(this._htLayerInfo.nHeight+this._htLayerInfo.nMarginTop)+"px"
}var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle,htTransform:{}}
}}).extend(jindo.m._Effect_);
jindo.m.FadeEffect=jindo.$Class({sEffectName:"fade",getCommand:function(el,htOption){if(!htOption.htTo){htOption.htTo={}
}if(htOption.nDistance){htOption.htTo.opacity=htOption.nDistance
}var sDirection=htOption.sDirection?htOption.sDirection:"in";
var htStyle=htOption.htTo||{};
var nOpacity=(sDirection=="in")?1:0;
htStyle.opacity=(typeof htStyle.opacity!=="undefined")?htStyle.opacity:nOpacity;
var htCallback={};
if(sDirection=="out"){htCallback.htStyle={};
htCallback.htStyle["@display"]="none";
htCallback.htStyle["@opacity"]=this._htLayerInfo.nOpacity
}var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle,fCallback:htCallback}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"in";
var htBeforeStyle=htOption.htFrom||{};
var nOpacity=(sDirection=="in")?0:1;
htBeforeStyle.display=this._htLayerInfo.sDisplay;
htBeforeStyle.opacity=(typeof htBeforeStyle.opacity=="undefined")?nOpacity:htBeforeStyle.opacity;
var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle,htTransform:{}}
}}).extend(jindo.m._Effect_);
jindo.m.FlipEffect=jindo.$Class({sEffectName:"flip",getCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"left";
var sCoord="Y";
if(sDirection=="up"||sDirection=="down"){sCoord="X"
}var htStyle=htOption.htTo||{};
var welFrom=htOption.elFlipFrom?jindo.$Element(htOption.elFlipFrom):jindo.$Element(el);
var welTo=htOption.elFlipTo?jindo.$Element(htOption.elFlipTo):null;
var htTo=this._getCssRotate(this._getCssTransform(welFrom));
htTo[sCoord]=htTo[sCoord]+((sDirection=="left"||sDirection=="down")?180*-1:180);
var sTransform="rotateX("+htTo.X+"deg) rotateY("+htTo.Y+"deg)";
if(welTo){welTo.$value().style[this._sCssPrefix+"Transform"]="rotate"+sCoord+"(0deg)";
sTransform="rotate"+sCoord+"(0deg)"
}htStyle.transformStyle="preserve-3d";
htStyle.transform=sTransform;
var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
if(htOption&&htOption.elBack){htOption.elBack.style[this._sCssPrefix+"BackfaceVisibility"]="hidden";
htOption.elBack.style[this._sCssPrefix+"Transform"]="rotate"+sCoord+"( 180deg )";
welFrom.$value().style[this._sCssPrefix+"BackfaceVisibility"]="hidden"
}return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"left";
var htBeforeStyle=htOption.htFrom||{};
var sCoord="Y",nFrom=0;
if(sDirection=="up"||sDirection=="down"){sCoord="X"
}var welFrom=htOption.elFlipFrom?jindo.$Element(htOption.elFlipFrom):jindo.$Element(el);
var welTo=htOption.elFlipTo?jindo.$Element(htOption.elFlipTo):null;
var elParent=welFrom.$value().parentNode;
elParent.style.webkitPerspective="1200";
var htFrom=this._getCssRotate(this._getCssTransform(welFrom));
var sTransform="rotateX("+htFrom.X+"deg) rotateY("+htFrom.Y+"deg)";
if(welTo){welTo.$value().style[this._sCssPrefix+"Transform"]="rotate"+sCoord+"(-180deg)";
sTransform="rotate"+sCoord+"(-180deg)"
}htBeforeStyle.perspective="1200";
htBeforeStyle.transformStyle="preserve-3d";
htBeforeStyle.transform=sTransform;
var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle}
},_getCssRotate:function(str){var sRotate=str;
var htReturn={X:0,Y:0};
if(!sRotate){return htReturn
}var aTemp=sRotate.match(/rotateX\((\-?\d*)deg/);
if(aTemp&&aTemp.length>1){htReturn.X=aTemp[1]*1;
if(htReturn.X%360==0){htReturn.X=0
}}aTemp=sRotate.match(/rotateY\((\-?\d*)deg/);
if(aTemp&&aTemp.length>1){htReturn.Y=aTemp[1]*1;
if(htReturn.Y%360==0){htReturn.Y=0
}}return htReturn
},_getCssTransform:function(wel){return wel.css(this._sCssPrefix+"Transform")||""
}}).extend(jindo.m._Effect_);
jindo.m.IndexScroll=jindo.$Class({$init:function(el,htUserOption){this.option("bUseTimingFunction",false);
if(this instanceof jindo.m.IndexScroll){if(this.option("bActivateOnload")){this.activate()
}}},_initVar:function(){this.$super._initVar();
this._aIndexInfo=null;
this._bUseIndex=true;
if((jindo.m.getDeviceInfo().iphone||jindo.m.getDeviceInfo().ipad)&&(parseInt(jindo.m.getDeviceInfo().version,10)<5)){this._sEvent="click"
}else{this._sEvent="touchstart"
}},_setWrapperElement:function(el){this.$super._setWrapperElement(el);
this._createFixedIndex();
this._createIndexView()
},_refreshIndexInfo:function(){var aIndexElement=this._htWElement.scroller.queryAll("."+this.option("sClassPrefix")+"index"),aIndexInfo=[],nWrapperMarginTop=this._htWElement.wrapper.offset().top;
for(var i=0,nLength=aIndexElement.length;
i<nLength;
i++){aIndexInfo.push(this._getIndexInfo(jindo.$Element(aIndexElement[i]),nWrapperMarginTop))
}for(i=0,nLength=aIndexInfo.length-1;
i<nLength;
i++){aIndexInfo[i].nNextTop=aIndexInfo[i+1].nTop;
aIndexInfo[i].nLast=aIndexInfo[i+1].nTop-aIndexInfo[i].nHeight
}this._aIndexInfo=aIndexInfo;
if(this.option("bUseIndexView")){this._refreshIndexView()
}},_createIndexView:function(){var nId=this.option("sClassPrefix")+"_indexview__";
this._htWElement.indexview=jindo.$Element(nId);
if(!this._htWElement.indexview){this._htWElement.indexview=jindo.$Element("<ul id='"+nId+"' class='"+this.option("sClassPrefix")+"indexview' style='position:absolute;z-index:2002;-"+jindo.m.getCssPrefix()+"-tap-highlight-color:transparent;'>");
this._htWElement.indexview.appendTo(document.body)
}},showIndexView:function(){if(this.option("bUseIndexView")&&this._htWElement.indexview){this._htWElement.indexview.show()
}},hideIndexView:function(){if(this.option("bUseIndexView")&&this._htWElement.indexview){this._htWElement.indexview.hide()
}},_refreshIndexView:function(){var htOffset=this._htWElement.wrapper.offset(),sName,wel,nTop,nLeft,sHTML="";
for(var i=0,nLength=this._aIndexInfo.length;
i<nLength;
i++){wel=this._aIndexInfo[i].wel;
sName=wel.attr("data-text")?wel.attr("data-text"):wel.text();
sHTML+="<li class='"+this.option("sClassPrefix")+"indexview_item' data-index='"+i+"'>"+sName+"</li>"
}this._htWElement.indexview.html(sHTML);
nTop=htOffset.top+this._htWElement.wrapper.height()/2;
nLeft=htOffset.left+this._htWElement.wrapper.width();
this._htWElement.indexview.css({top:(nTop-this._htWElement.indexview.height()/2)+"px",left:(nLeft-this._htWElement.indexview.width()-10)+"px"})
},_attachEvent:function(){this.$super._attachEvent();
this._htEvent.position=jindo.$Fn(this._onPosition,this).bind();
this.attach("position",this._htEvent.position);
if(this.option("bUseIndexView")){this._htEvent.indexview=jindo.$Fn(this._onIndexView,this).attach(this._htWElement.indexview,this._sEvent)
}},_detachEvent:function(){this.detach("position",this._htEvent.position);
if(this.option("bUseIndexView")){this._htEvent.indexview.detach(this._htWElement.indexview,this._sEvent)
}},_onIndexView:function(we){if(we.element.tagName=="LI"){var wel=jindo.$Element(we.element),nIdx=wel.attr("data-index");
this.scrollTo(0,this._aIndexInfo[nIdx].nTop)
}},_onPosition:function(we){if(this._bUseIndex){this._setPosFixedIndex(-we.nTop)
}},_getIndexInfo:function(welIndex,nWrapperMarginTop){var htInfo={};
htInfo.wel=welIndex;
htInfo.nTop=welIndex.offset().top-nWrapperMarginTop;
htInfo.nHeight=welIndex.height();
htInfo.nBottom=htInfo.nTop+htInfo.nHeight;
return htInfo
},_setPosFixedIndex:function(nTop){var nBeforeIndex=this._nBeforeIndex;
var nIdx=this._getCurrentIdx(nTop),htIndexInfo=this._aIndexInfo[nIdx],nMoveTop;
if(nIdx==-1){this._htWElement.index_top.hide();
this._htWElement.index_bottom.hide()
}else{if(htIndexInfo.nLast&&(htIndexInfo.nLast<=nTop&&nTop<htIndexInfo.nNextTop)){nMoveTop=htIndexInfo.nLast-nTop;
if(nBeforeIndex!=nIdx){this._htWElement.index_top.html(htIndexInfo.wel.outerHTML())
}this._htWElement.index_top.css(this.sCssPrefix+"Transform","translate"+this.sTranOpen+"0, "+nMoveTop+"px"+this.sTranEnd).show();
if(nBeforeIndex!=nIdx){this._htWElement.index_bottom.html(this._aIndexInfo[nIdx+1].wel.outerHTML()).show();
this._bShowIndex=true
}this._htWElement.index_bottom.css(this.sCssPrefix+"Transform","translate"+this.sTranOpen+"0, "+(nMoveTop+htIndexInfo.nHeight)+"px"+this.sTranEnd)
}else{if(nBeforeIndex!=nIdx||this._bShowIndex){this._htWElement.index_top.html(htIndexInfo.wel.outerHTML()).css(this.sCssPrefix+"Transform","translate"+this.sTranOpen+"0, 0"+this.sTranEnd).css("display","block");
this._htWElement.index_bottom.hide();
this._bShowIndex=false
}}}this._nBeforeIndex=nIdx
},hideIndex:function(){this._bUseIndex=false;
this._htWElement.index_top.hide();
this._htWElement.index_bottom.hide()
},showIndex:function(){this._bUseIndex=true;
this._setPosFixedIndex(this._nTop);
this._htWElement.index_top.show()
},_getCurrentIdx:function(nPos){for(var i=0,nLength=this._aIndexInfo.length;
i<nLength;
i++){if(this._aIndexInfo[i].nTop>nPos){break
}}return i-1
},_createFixedIndex:function(){var sStyle="position:absolute;width:100%;top:0;z-index:2001; display:none";
this._htWElement.index_top=jindo.$Element(this._htWElement.wrapper.query("._scroller_index_scroll_top_"));
if(!this._htWElement.index_top){this._htWElement.index_top=jindo.$Element("<div style='"+sStyle+"' class='_scroller_index_scroll_top_'></div>");
this._htWElement.wrapper.append(this._htWElement.index_top)
}this._htWElement.index_bottom=jindo.$Element(this._htWElement.wrapper.query("._scroller_index_scroll_bottom_"));
if(!this._htWElement.index_bottom){this._htWElement.index_bottom=jindo.$Element("<div style='"+sStyle+"' class='_scroller_index_scroll_bottom_'></div>");
this._htWElement.wrapper.append(this._htWElement.index_bottom)
}},refresh:function(){if(this.option("bUsePullDown")){this.option("bUsePullDown",false)
}if(this.option("bUsePullUp")){this.option("bUsePullUp",false)
}if(this.option("bUseHScroll")){this.option("bUseHScroll",false)
}this.option("bUseCss3d",false);
this.$super.refresh();
this._refreshIndexInfo()
}}).extend(jindo.m.Scroll);
jindo.m.LayerManager=jindo.$Class({$init:function(el,htOption){var oDeviceInfo=jindo.m.getDeviceInfo();
this.option({bActivateOnload:true});
this.option(htOption||{});
this._initVar();
this._setWrapperElement(el);
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this._aLink=[];
this._oTouch=null
},_setWrapperElement:function(el){this._htWElement={};
this.setLayer(el)
},_onActivate:function(){this._attachEvent()
},_onDeactivate:function(){this._detachEvent()
},setLayer:function(el){el=(typeof el=="string"?jindo.$(el):el);
this._htWElement.element=jindo.$Element(el);
this._htWElement.element.css("position","absolute");
return this
},getVisible:function(){return this._htWElement.element.visible()
},getLayer:function(){return this._htWElement.element.$value()
},getLinks:function(){return this._aLink
},link:function(vElement){if(arguments.length>1){for(var i=0,len=arguments.length;
i<len;
i++){this.link(arguments[i])
}return this
}if(this._find(vElement)!=-1){return this
}this._aLink.push(vElement);
return this
},unlink:function(vElement){if(arguments.length>1){for(var i=0,len=arguments.length;
i<len;
i++){this.unlink(arguments[i])
}return this
}var nIndex=this._find(vElement);
if(nIndex>-1){this._aLink.splice(nIndex,1)
}return this
},_check:function(el){var wel=jindo.$Element(el);
for(var i=0,elLink,welLink;
(elLink=this._aLink[i]);
i++){welLink=jindo.$Element(elLink);
if(welLink){elLink=welLink.$value();
if(elLink&&(el==elLink||wel.isChildOf(elLink))){return true
}}}return false
},_find:function(el){for(var i=0,elLink;
(elLink=this._aLink[i]);
i++){if(elLink==el){return i
}}return -1
},_fireEventBeforeShow:function(){return this.fireEvent("beforeShow",{elLayer:this.getLayer(),aLinkedElement:this.getLinks()})
},_fireEventShow:function(){this.fireEvent("show",{elLayer:this.getLayer(),aLinkedElement:this.getLinks()})
},_fireEventBeforeHide:function(el){return this.fireEvent("beforeHide",{elTarget:el,elLayer:this.getLayer(),aLinkedElement:this.getLinks()})
},_fireEventHide:function(el){this.fireEvent("hide",{elTarget:el,elLayer:this.getLayer(),aLinkedElement:this.getLinks()})
},show:function(){if(!this.getVisible()){if(this._fireEventBeforeShow()){this._htWElement.element.show();
this._fireEventShow()
}}return this
},hide:function(el){if(this.getVisible()){if(this._fireEventBeforeHide(el)){this._htWElement.element.hide();
this._fireEventHide(el)
}}return this
},toggle:function(){if(this.getVisible()){this.hide()
}else{this.show()
}return this
},_onEvent:function(we){var el=we.element;
if(this.getVisible()){if(this._check(el)){this.fireEvent("ignore",{elTarget:el})
}else{this.hide(el);
return true
}we.stop()
}},_attachEvent:function(){var self=this;
this._oTouch=new jindo.m.Touch(document).attach("touchEnd",function(we){if(we.sMoveType===jindo.m.MOVETYPE[3]){self._onEvent(we)
}})
},_detachEvent:function(){if(this._oTouch){this._oTouch.detachAll("touchEnd")
}},destroy:function(){this.deactivate();
for(var p in this._htWElement){this._htWElement[p]=null
}this._htWElement=null;
delete this._aLink;
delete this._oTouch
}}).extend(jindo.m.UIComponent);
jindo.m.PopEffect=jindo.$Class({sEffectName:"pop",getCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"in";
var htStyle=htOption.htTo||{};
if(typeof htStyle.opacity==="undefined"){htStyle.opacity=(sDirection=="in")?1:0.1
}var nScale=(sDirection=="in")?1:((this.bIos3||this.bAndroid3Up)?0.1:0);
var htCallback={};
if(sDirection=="out"){htCallback.htStyle={};
htCallback.htStyle["@display"]="none";
htCallback.htStyle["@opacity"]=this._htLayerInfo.nOpacity;
htCallback.htStyle["@transform"]="scale(1)"
}var sTransform="scale("+nScale+")";
if(this.bAndroid3Up){sTransform+=" scaleZ(1.0)"
}htStyle.transformOrigin="50% 50%";
htStyle.transform=sTransform;
var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle,fCallback:htCallback}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"in";
var htBeforeStyle=htOption.htFrom||{};
if(typeof htBeforeStyle.opacity==="undefined"){htBeforeStyle.opacity=(sDirection=="in")?0.1:1
}htBeforeStyle.display=this._htLayerInfo.sDisplay;
var nScale=(sDirection=="in")?((this.bIos3||this.bAndroid3Up)?0.1:0):1;
var sTransform="scale("+nScale+")";
if(this.bAndroid3Up){sTransform+=" scaleZ(1.0)"
}htBeforeStyle.transformOrigin="50% 50%";
htBeforeStyle.transform=sTransform;
var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle}
}}).extend(jindo.m._Effect_);
jindo.m.PreviewFlicking=jindo.$Class({$init:function(el,htUserOption){this.option({nTotalContents:5,nWidthPer:50});
this.option(htUserOption||{});
this._initVar();
this._setWrapperElement(el);
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){jindo.m.Flick.prototype._initVar.apply(this);
this._nDefaultPanel=5
},_onActivate:function(){jindo.m.Flick.prototype._onActivate.apply(this);
var self=this;
this.set(new jindo.m.Slide(this._getAnimationOption()).attach({set:function(we){self._setStyle(we.css)
}}),this._htWElement.container)
},_setStyle:function(htCss){var htContCss={},nPos=0,nSizeKey=this._bUseH?"width":"height",nPosKey=this._bUseH?"left":"top";
for(var i in htCss){htContCss[i]=htCss[i]
}htContCss.position="relative";
if(this._bUseCircular){htCss.position="absolute"
}if(this._bUseH){htContCss.clear="both";
htCss["float"]="left";
this._htWElement.base.css("margin","0 auto")
}else{var nHeight=this._htWElement.view.height();
var nHalfMargin=(nHeight-this._htWElement.aPanel[0].height())/2;
this._htWElement.base.css("marginTop",nHalfMargin+"px")
}if(this.option("nMinWidth")){var sKey=nSizeKey.charAt(0).toUpperCase()+nSizeKey.substr(1);
this._htWElement.base.css("min"+sKey,this.option("nMinWidth").replace(/\D/gi,"")+"px")
}this._htWElement.base.css({position:"relative"});
this._htWElement.base.css(nSizeKey,this.option("nWidthPer")+"%");
this._htWElement.container.css(htContCss);
var self=this;
jindo.$A(this._htWElement.aPanel).forEach(function(value,index,array){var wel=value;
if(self._bUseCircular){wel.css("position","absolute")
}if(!this._bUseH){htCss.width="100%"
}else{htCss[nSizeKey]=(100/self._htWElement.aPanel.length)+"%"
}wel.css(htCss)
},this)
},_setWrapperElement:function(el){jindo.m.SwipeCommon.prototype._setWrapperElement.call(this,el);
var sSizeKey=this.option("bHorizontal")?"height":"width";
this._htWElement.aPanel=this._htWElement.container.queryAll("."+this.option("sClassPrefix")+this.option("sContentClass"));
for(var i in this._htWElement.aPanel){this._htWElement.aPanel[i]=jindo.$Element(this._htWElement.aPanel[i])
}this._htWElement.container.css({left:"",top:""})
},resize:function(){jindo.m.SwipeCommon.prototype.resize.call(this);
this._restorePanel();
var nSizeKey=this._bUseH?"width":"height",nViewSize=this._htWElement.view[nSizeKey]();
this._htWElement.container.css(nSizeKey,this._htWElement.aPanel.length*100+"%");
this._nRange=(this._bUseH?this._htWElement.aPanel[0].width():this._htWElement.aPanel[0].height());
this._refreshPanelInfo();
if(this._bUseH){this._htSize.maxX=(this.option("nTotalContents")-1)*-this._nRange;
this._nX=this._aPos[this.getContentIndex()]
}else{this._htSize.maxY=(this.option("nTotalContents")-1)*-this._nRange;
this._nY=this._aPos[this.getContentIndex()]
}this._updateFlickInfo();
if(!this._bUseCircular){this._oAnimation.move(this._nX,this._nY)
}},_restorePanel:function(wel){wel=wel||this.getElement();
var nLen=this.getTotalPanels(),sPosition=this._bUseH?"left":"top",nCenter=this._getIndexByElement(wel);
this._htWElement.container.css(this._oAnimation.p("Transform"),this._getTranslate(0));
var nSum=0;
var nCompare=Math.floor(nLen/2);
for(var i=0;
i<nLen;
i++){nSum=i-nCenter;
if(this._bUseCircular){if(nSum>nCompare){nSum=nSum-nLen
}else{if(nSum<-nCompare){nSum=nSum+nLen
}}}this._htWElement.aPanel[i].css(sPosition,(nSum*20)+"%");
if(nSum==0){this._htWElement.aPanel[i].css("zIndex",10)
}else{this._htWElement.aPanel[i].css("zIndex",1)
}}},_getPosValue:function(sV){return this._hasOffsetBug()?sV:this._getTranslate(sV)
},_panelEndAfterCall:function(option){if(this._bUseCircular){this._restorePanel()
}},_moveAfterCall:function(we){this._oAnimation.move(this._nX,this._nY,0,this._makeOption({next:we.bNext,startIndex:this._nPosToIndex}))
},getIndexByElement:function(el){var nValue=-1;
for(var i=0,nLen=this._htWElement.aPanel.length;
i<nLen;
i++){if(this._htWElement.aPanel[i].$value()===el){nValue=i;
break
}}return nValue
},destroy:function(){jindo.m.Flick.prototype.destroy.apply(this)
}}).extend(jindo.m.Flick);
jindo.m.PullPlugin=jindo.$Class({$init:function(oParent){this.option(oParent.option());
this._initVar(oParent);
this._initPullDownFunc();
this._initPullUpFunc()
},_initVar:function(oParent){this._oParent=oParent;
this._htWElement=oParent._htWElement;
this._isPullDown=false;
this._isPullUp=false;
this._isUpdating=false;
this._nOrgMaxScrollTop=null;
this._htWElement.pullDown=jindo.$Element(this._htWElement.wrapper.query("."+this.option("sClassPrefix")+"pullDown"));
this._htWElement.pullUp=jindo.$Element(this._htWElement.wrapper.query("."+this.option("sClassPrefix")+"pullUp"))
},refresh:function(){this.option(this._oParent.option());
this._isUpdating=false;
this._nOrgMaxScrollTop=null;
this._isPullDown=this.option("bUsePullDown")&&this.option("bUseVScroll")&&!this.option("bUseHScroll")&&this.option("bUseBounce")&&(this._htWElement.pullDown!==null);
this._isPullUp=this.option("bUsePullUp")&&this.option("bUseVScroll")&&!this.option("bUseHScroll")&&this.option("bUseBounce")&&(this._htWElement.pullUp!==null);
if(this._isPullDown&&this.option("fnPullDownIdle")){this._htWElement.pullDown._isReady_=false;
this._htWElement.pullDown.show();
this.option("fnPullDownIdle")(this._htWElement.pullDown)
}if(this._isPullUp&&this.option("fnPullUpIdle")){this._htWElement.pullUp._isReady_=false;
this._htWElement.pullUp.show();
this.option("fnPullUpIdle")(this._htWElement.pullUp)
}if(!this.option("bUseVScroll")){if(this._htWElement.pullDown!==null){this._htWElement.pullDown.hide()
}if(this._htWElement.pullUp!==null){this._htWElement.pullUp.hide()
}}this._oParent.nScrollW=this._htWElement.scroller.width();
this._oParent.nScrollH=this._htWElement.scroller.height()-this._getBottomMargin();
this._oParent.nMinScrollTop=-this._getTopMargin();
this._oParent.nMaxScrollTop=this._oParent.nWrapperH-this._oParent.nScrollH
},_getTopMargin:function(){return(this._isPullDown?this._htWElement.pullDown.height():0)+this.option("nOffsetTop")
},_getBottomMargin:function(){return(this._isPullUp?this._htWElement.pullUp.height():0)+this.option("nOffsetBottom")
},_initPullDownFunc:function(){if(this.option("bUsePullDown")===true){if(!this.option("fnPullDownIdle")){this.option("fnPullDownIdle",function(wel){wel.html("업데이트하시려면 아래로 내려주세요")
})
}if(!this.option("fnPullDownBeforeUpdate")){this.option("fnPullDownBeforeUpdate",function(wel){wel.html("업데이트 합니다")
})
}if(!this.option("fnPullDownUpdating")){this.option("fnPullDownUpdating",function(wel){wel.html("업데이트 중입니다...")
})
}}},_initPullUpFunc:function(){if(this.option("bUsePullUp")===true){if(!this.option("fnPullUpIdle")){this.option("fnPullUpIdle",function(wel){wel.html("더 보시려면 위로 올려주세요")
})
}if(!this.option("fnPullUpBeforeUpdate")){this.option("fnPullUpBeforeUpdate",function(wel){wel.html("로드 합니다")
})
}if(!this.option("fnPullUpUpdating")){this.option("fnPullUpUpdating",function(wel){wel.html("로드 중...")
})
}}},touchMoveForUpdate:function(we,nMaxScrollTop){if(this._isUpdating){return
}var nTopMargin=this._getTopMargin(),nBottomMargin=this._getBottomMargin();
nMaxScrollTop=this._nOrgMaxScrollTop||nMaxScrollTop;
if(this._isPullDown){if(this._htWElement.pullDown._isReady_){if(nTopMargin>this._oParent._nTop){this._htWElement.pullDown._isReady_=false;
if(this.option("fnPullDownIdle")){this.option("fnPullDownIdle")(this._htWElement.pullDown);
this._oParent.nMinScrollTop=-nTopMargin
}}}else{if(this._oParent._nTop>nTopMargin){this._htWElement.pullDown._isReady_=true;
if(this.option("fnPullDownBeforeUpdate")){this.option("fnPullDownBeforeUpdate")(this._htWElement.pullDown);
this._oParent.nMinScrollTop=0
}}}}if(this._isPullUp){if(this._htWElement.pullUp._isReady_){if(this._oParent._nTop>=(nMaxScrollTop-nBottomMargin)){this._htWElement.pullUp._isReady_=false;
if(this.option("fnPullUpIdle")){this.option("fnPullUpIdle")(this._htWElement.pullUp);
this._oParent.nMaxScrollTop=nMaxScrollTop
}}}else{if(this._oParent._nTop<(this._oParent.nMaxScrollTop-nBottomMargin)){this._htWElement.pullUp._isReady_=true;
if(this.option("fnPullUpBeforeUpdate")){this.option("fnPullUpBeforeUpdate")(this._htWElement.pullUp);
this._nOrgMaxScrollTop=nMaxScrollTop;
this._oParent.nMaxScrollTop=nMaxScrollTop-nBottomMargin
}}}}},pullUploading:function(){var isUp=null,wel=null;
if(this._isPullDown&&this._htWElement.pullDown._isReady_){wel=this._htWElement.pullDown;
isUp=isUp||false
}if(this._isPullUp&&this._htWElement.pullUp._isReady_){wel=this._htWElement.pullUp;
isUp=isUp||true
}if(!wel){return false
}var fn=isUp?this.option("fnPullUpUpdating"):this.option("fnPullDownUpdating"),self=this;
this._isUpdating=true;
wel._isReady_=false;
if(fn){setTimeout(function(){fn(wel);
if(isUp){self._fireEventPullUp()
}else{self._fireEventPullDown()
}},0)
}},_fireEventPullDown:function(){if(!this._htWElement){return
}this._oParent.fireEvent("pullDown",{welElement:this._htWElement.pullDown,oScroll:this._oParent})
},_fireEventPullUp:function(){if(!this._htWElement){return
}this._oParent.fireEvent("pullUp",{welElement:this._htWElement.pullUp,oScroll:this._oParent})
}}).extend(jindo.m.Component);
jindo.m.RevealCommon=jindo.$Class({$init:function(htOption){this.option({sClassPrefix:"reveal-",sDirection:"right",nDuration:500,nMargin:100,bActivateOnload:true,bAutoResize:true,bFixNaviSize:false,bUseTimingFunction:jindo.m.useTimingFunction(),bUseOffsetBug:jindo.m.hasOffsetBug()});
this.option(htOption||{});
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(bInit){if(bInit){this._bShow=false;
this._sCssPrefix=jindo.m.getCssPrefix();
this._htEvent={};
this._htInstance={};
this._htNavSize={}
}this._aEndStatus=[];
this._htSize=jindo.$Document().clientSize();
if(!this._htWElement.nav.visible()){this._htWElement.nav.show();
this._nNavHeight=this._htWElement.nav.height();
this._htWElement.nav.hide()
}else{this._nNavHeight=this._htWElement.nav.height()
}this._bUseCss3d=jindo.m.useCss3d();
this._getTranslate()
},setNavHeight:function(nHeight){this._htNavSize.height=nHeight
},_getTranslate:function(){this._sTranslateStart="translate(";
this._sTranslateEnd=")";
if(this._bUseCss3d){this._sTranslateStart="translate3d(";
this._sTranslateEnd=",0px)"
}},_setWrapperElement:function(){this._htWElement={};
this._htWElement.nav=jindo.$Element(jindo.$$.getSingle("."+this.option("sClassPrefix")+"nav"));
this._htWElement.header=jindo.$Element(jindo.$$.getSingle("."+this.option("sClassPrefix")+"header"));
this._htWElement.content=jindo.$Element(jindo.$$.getSingle("."+this.option("sClassPrefix")+"contents"));
this._htWElement.wrap=jindo.$Element(jindo.$$.getSingle("."+this.option("sClassPrefix")+"wrap"));
if(!this._htWElement.header){this._htWElement.header=this._htWElement.nav
}if(this._htWElement.header.indexOf(this._htWElement.nav)>-1){this._bNavInHeader=true
}},_attachEvent:function(){if(this.option("bAutoResize")){this._htEvent.rotate=jindo.$Fn(this._onResize,this).bind();
jindo.m.bindRotate(this._htEvent.rotate);
jindo.m.bindPageshow(this._htEvent.rotate)
}},_setInitStyle:function(bInit){this._htWElement.content.css("position","relative");
var htPosInfo=this._getPosInfo();
this._setHeaderStyle();
this._setNavStyle(htPosInfo,bInit)
},_setHeaderStyle:function(){if(this.option("sDirection")=="down"){if(this._bNavInHeader){this._htWElement.header.css("top",this._bShow?(!this.option("bUseOffsetBug")?-this._nNavHeight:0):-this._nNavHeight)
}else{this._htWElement.nav.css({position:"absolute",top:this._bShow?0:-this._nNavHeight})
}}},_setNavStyle:function(htPosInfo){var htNavStyle={width:this._getNaviWidth()+"px"};
if(this.option("sDirection")!="down"){if(this.option("sDirection")=="left"){htNavStyle.left=this._htSize.width
}else{if(this.option("sDirection")=="right"){htNavStyle.left=htPosInfo.nMarginLeftPos
}}this._htWElement.nav.css(htNavStyle)
}},_onResize:function(){this._initVar();
if(!this.fireEvent("beforeRotate")){return false
}this._setInitStyle();
var htPosInfo=this._getPosInfo();
if(htPosInfo.nMarginLeftPos&&(this.option("sDirection")=="left"||this.option("sDirection")=="right")&&this._bShow){if(!this.option("bUseOffsetBug")){this._htMorph.pushAnimate(-1,[this._htWElement.header.$value(),{"@transform":this._sTranslateStart+-htPosInfo.nMarginLeftPos+"px, "+htPosInfo.nHeader.Y+"px"+this._sTranslateEnd},this._htWElement.content.$value(),{"@transform":this._sTranslateStart+-htPosInfo.nMarginLeftPos+"px, "+htPosInfo.nContent.Y+"px"+this._sTranslateEnd},this._htWElement.nav.$value(),{"@transform":this._sTranslateStart+-htPosInfo.nMarginLeftPos+"px, "+htPosInfo.nNav.Y+"px"+this._sTranslateEnd}]);
this._htMorph.play();
this._htMorph.clear()
}else{this._htWElement.header.css({left:-htPosInfo.nMarginLeftPos+"px"});
this._htWElement.content.css({left:-htPosInfo.nMarginLeftPos+"px"});
this._htWElement.nav.css("left",(this.option("sDirection")=="left"?(this.option("bFixNaviSize")?this._htSize.width-this.option("nMargin"):this.option("nMargin")):0))
}var self=this;
this._setMaxClientSize({fFunction:function(){self._rotateFireEvent();
self._setWrapStyle()
},bInit:false});
return false
}this._rotateFireEvent()
},_getWrapStyle:function(){this._nNavHeight=this._htWElement.nav.height();
return{overflow:"hidden",width:this._htSize.width+"px",height:(this._nNavHeight>this._htSize.height?this._nNavHeight:this._htSize.height)+"px",position:"relative"}
},_setWrapStyle:function(){var htWrapStyle={overflow:"",width:"",height:"",position:""};
if(this._bShow){htWrapStyle=this._getWrapStyle()
}if(this._htWElement.wrap&&this.option("sDirection")!="down"){this._htWElement.wrap.css(htWrapStyle)
}},_rotateFireEvent:function(){this.fireEvent("rotate")
},_getPosInfo:function(){},toggle:function(bType,nDuration){if(this.isPlaying()){return
}if(typeof bType=="undefined"){bType=this._bShow?"hide":"show"
}if(bType=="show"&&this._bShow){return false
}if(bType=="hide"&&!this._bShow){return false
}this._setMoveCss(bType,nDuration)
},show:function(nDuration){if(!this.option("bUseTimingFunction")&&nDuration==0){nDuration=1
}this.toggle("show",nDuration)
},isPlaying:function(){return this._htMorph.isPlaying()
},hide:function(nDuration){if(!this.option("bUseTimingFunction")&&nDuration==0){nDuration=1
}this.toggle("hide",nDuration)
},getVisible:function(){return this._bShow
},_getTransitionOption:function(){return{fEffect:jindo.m.Effect.cubicEaseOut,bUseTransition:this.option("bUseTimingFunction")}
},_createMorph:function(){this._htMorph={};
var htInOption=this._getTransitionOption();
var self=this;
this._htMorph=new jindo.m.Morph(htInOption).attach({end:function(){self._setContentPos();
self._setHeaderPos();
self._setNavPos();
self._setEnd()
}})
},_setMoveCss:function(bType,nDuration){this._bMove=true;
if(!this._bShow){this._htWElement.nav.show()
}var tmpShow=this._bShow;
if(!this.fireEvent("before"+(!this._bShow?"Show":"Hide"))){this._bShow=tmpShow;
return false
}nDuration=(typeof nDuration!="undefined"&&nDuration>=0)?nDuration:null||this.option("nDuration");
this._setMoveCssDetail(nDuration);
this._htMorph.play()
},_setMoveCssDetail:function(nDuration){var htPosInfo=this._getPosInfo();
if(this._bUseCss3d){this._sTranslateStart="translate3d(";
this._sTranslateEnd=",0px)"
}var aData=[this._htWElement.header.$value(),{"@transform":this._sTranslateStart+htPosInfo.nHeader.X+"px, "+htPosInfo.nHeader.Y+"px"+this._sTranslateEnd},this._htWElement.content.$value(),{"@transform":this._sTranslateStart+htPosInfo.nContent.X+"px, "+htPosInfo.nContent.Y+"px"+this._sTranslateEnd}];
if(!this._bNavInHeader){aData.push(this._htWElement.nav.$value(),{"@transform":this._sTranslateStart+htPosInfo.nNav.X+"px, "+htPosInfo.nNav.Y+"px"+this._sTranslateEnd})
}this._htMorph.pushAnimate.apply(this._htMorph,[nDuration,aData])
},_setEnd:function(bType){this._htMorph.clear();
var sAct="";
var bShow=this._bShow?true:false;
if(this._bMove){sAct=!this._bShow?"show":"hide";
bShow=this._bShow?false:true;
this._bMove=false
}if(!bShow&&this.option("sDirection")!="down"){this._htWElement.nav.hide()
}var self=this;
this.fireEvent(sAct);
this._bShow=bShow
},_setContentPos:function(){if(this.option("bUseOffsetBug")){var htPosInfo=this._getPosInfo();
this._htWElement.content.css(this._sCssPrefix+"Transform","");
this._htWElement.content.css({left:htPosInfo.nLeftPos+"px",top:htPosInfo.nLastContent+"px"})
}},_setHeaderPos:function(){if(this.option("bUseOffsetBug")){var htPosInfo=this._getPosInfo();
this._htWElement.header.css(this._sCssPrefix+"Transform","");
this._htWElement.header.css({left:htPosInfo.nLeftPos+"px",top:htPosInfo.nLastHeader+"px"})
}},_setNavPos:function(){var htWrapStyle={overflow:"",width:"",height:"",position:""};
if(this.option("bUseOffsetBug")){var htPosInfo=this._getPosInfo();
this._htWElement.nav.css(this._sCssPrefix+"Transform","");
this._htWElement.nav.css({left:htPosInfo.nNavLeftPos+"px",top:htPosInfo.nLastNav+"px"})
}if(!this._bShow){htWrapStyle=this._getWrapStyle()
}if(this._htWElement.wrap&&this.option("sDirection")!="down"){this._htWElement.wrap.css(htWrapStyle)
}},_onActivate:function(){this._setWrapperElement();
this._initVar(true);
this._setMaxClientSize({bInit:true});
this._setInitStyle(true);
this._createMorph();
this._attachEvent()
},_setMaxClientSize:function(htOption){var self=this;
jindo.m._maxClientSize(function(htData){self._htSize=htData;
if(htOption&&typeof htOption.fCallback=="function"){htOption.fCallback()
}},(htOption.bInit?true:false))
},_onDeactivate:function(){jindo.m.unbindRotate(this._htEvent.rotate);
jindo.m.unbindPageshow(this._htEvent.rotate);
for(var i in this._htInstance){if(this._htInstance[i]){this._htInstance[i].destroy()
}}this._bShow=this._sCssPrefix=this._htEvent=this._htSize=this._nNavHeight=null;
this._htWElement=this._htEvent=this._htMorph=this._htInstance=null
},destroy:function(){this.deactivate()
}}).extend(jindo.m.UIComponent);
jindo.m.SlideReveal=jindo.$Class({$init:function(htOption){this.option(htOption||{})
},_initVar:function(bInit){jindo.m.RevealCommon.prototype._initVar.call(this,bInit);
if(bInit){var htCss={};
htCss[this._sCssPrefix+"Transform"]=this._sTranslateStart+"0px, 0px"+this._sTranslateEnd;
this._htWElement.nav.css(htCss)
}},_getPosInfo:function(){var nNaviWidth=this._getNaviWidth();
switch(this.option("sDirection")){case"down":return{nHeader:{Y:this._nNavHeight*(this._bShow?(this.option("bUseOffsetBug")?-1:0):1),X:0},nNav:{Y:this._nNavHeight*(this._bShow?(this.option("bUseOffsetBug")?-1:0):1),X:0},nContent:{Y:this._nNavHeight*(this._bShow?(this.option("bUseOffsetBug")?-1:0):1),X:0},nLastHeader:this._nNavHeight*(this._bShow?(this._bNavInHeader?-1:0):(this._bNavInHeader?0:1)),nLastNav:this._nNavHeight*(this._bShow?(this.option("bUseOffsetBug")?-1:0):0),nLastContent:this._nNavHeight*(this._bShow?0:1),nLeftPos:0,nNavHeight:this._nNavHeight};
break;
case"left":return{nHeader:{Y:!this._bShow?(this.option("bUseOffsetBug")?-parseInt(this._htWElement.content.css("top")|0,10):0):0,X:nNaviWidth*(this._bShow?(this.option("bUseOffsetBug")?1:0):-1)},nContent:{Y:!this._bShow?(this.option("bUseOffsetBug")?-parseInt(this._htWElement.content.css("top")|0,10):0):0,X:(nNaviWidth)*(this._bShow?(this.option("bUseOffsetBug")?1:0):-1)},nNav:{Y:0,X:this._bShow?(this.option("bUseOffsetBug")?nNaviWidth:0):(nNaviWidth)*(this._bShow?0:-1)},nDefaultNavPos:(nNaviWidth)*(this._bShow?0:1),nMarginLeftPos:nNaviWidth,nLeftPos:!this._bShow?this._getHideWidth():0,nNavHeight:0,nNavLeftPos:!this._bShow?(this.option("bFixNaviSize")?this._htSize.width-this.option("nMargin"):this.option("nMargin")):this._htSize.width};
case"right":var nHideWidth=this._getHideWidth();
return{nHeader:{Y:!this._bShow?(this.option("bUseOffsetBug")?-parseInt(this._htWElement.content.css("top")|0,10):0):0,X:(nNaviWidth)*(this._bShow?(this.option("bUseOffsetBug")?-1:0):1)},nContent:{Y:!this._bShow?(this.option("bUseOffsetBug")?-parseInt(this._htWElement.content.css("top")|0,10):0):0,X:(nNaviWidth)*(this._bShow?(this.option("bUseOffsetBug")?-1:0):1)},nNav:{Y:0,X:this._bShow?(this.option("bUseOffsetBug")?nHideWidth:0):(nNaviWidth)*(this._bShow?0:1)},nDefaultNavPos:(nNaviWidth)*(this._bShow?0:1),nMarginLeftPos:-nNaviWidth,nLeftPos:!this._bShow?nNaviWidth:0,nNavHeight:0,nNavLeftPos:!this._bShow?0:nHideWidth};
break
}},_getNaviWidth:function(){if(!this.option("bFixNaviSize")){return this._htSize.width-this.option("nMargin")
}else{return this.option("nMargin")
}},_getHideWidth:function(){if(!this.option("bFixNaviSize")){return -this._htSize.width+this.option("nMargin")
}else{return -this.option("nMargin")
}}}).extend(jindo.m.RevealCommon);
jindo.m.RevealSidebarUI=jindo.$Class({$init:function(el,htOption){this.option({bActivateOnload:true,nSildeThreshold:50,sDefaultArea:"main",htScrollOption:{},nSlideDuration:200,bUseCss3d:jindo.m._isUseCss3d(),bUseTimingFunction:jindo.m._isUseTimingFunction()});
this.option(htOption||{});
this._initVar();
this._setWrapperElement(el);
this._initComponent();
if(this.option("bActivateOnload")){this.activate()
}},_initVar:function(){this._sStatus=this.option("sDefaultArea");
this._oLeftLayoutInfo=null;
this._oRightLayoutInfo=null;
this._oLeftScroll=null;
this._oRightScroll=null;
this._oSize={};
this._bUseRebuild=false;
this._oSlideReveal={}
},_setWrapperElement:function(el){this._htWElement={};
el=jindo.$Element(el);
this._htWElement.body=jindo.$Element(jindo.$$.getSingle(".rs-body")).css({overflow:"hidden"});
if(this._htWElement.body.css("position")=="static"){this._htWElement.body.css("position","relative")
}this._bUseRebuild=(this._htWElement.body.attr("markup")&&this._htWElement.body.attr("markup").toUpperCase()=="DETAILED")?false:true;
this._htWElement.main=jindo.$Element(this._htWElement.body.query(".rs-main"));
if(this._bUseRebuild&&el&&!el.isEqual(this._htWElement.body)){this._htWElement.main.hide();
this._htWElement.main=el;
this._htWElement.main.addClass("rs-main")
}this._htWElement.main.css({position:"absolute",zIndex:10,left:0});
this._htWElement.left=jindo.$Element(this._htWElement.body.query(".rs-left"));
if(this._htWElement.left){this._htWElement.left.css({position:"absolute",zIndex:5,left:0,top:0}).show()
}this._htWElement.right=jindo.$Element(this._htWElement.body.query(".rs-right"));
if(this._htWElement.right){this._htWElement.right.css({position:"absolute",zIndex:5,left:this.option("nSildeThreshold")+"px",top:0}).show()
}this._htWElement.blocker=jindo.$Element("<div style='position:absolute;opacity:0;display:none;z-index:1000;opacity:0;-webkit-tap-highlight-color:transparent;top:0px;'>");
this._htWElement.blocker.appendTo(this._htWElement.body);
if(this._htWElement.left){this._oLeftLayoutInfo=this._setLayout(this._htWElement.left)
}if(this._htWElement.right){this._oRightLayoutInfo=this._setLayout(this._htWElement.right)
}},resize:function(){this._oSize=jindo.$Document().clientSize();
var self=this;
jindo.m._maxClientSize(function(eSize){self._oSize=eSize;
self._setSizeWhenResize()
});
this._setSizeWhenResize()
},_setSizeWhenResize:function(){if(this._htWElement.right){this._htWElement.right.show()
}if(this._htWElement.left){this._htWElement.left.show()
}var oLeftSize=this._getScrollSize(this._oLeftLayoutInfo),oRightSize=this._getScrollSize(this._oRightLayoutInfo),nPos=this._getPos(this._sStatus);
this._htWElement.body.css({width:"100%",height:this._oSize.height+"px"});
this._htWElement.blocker.css({width:this.option("nSildeThreshold")+"px",height:this._oSize.height+"px",left:this._sStatus=="left"?nPos+"px":"0px"});
this._htWElement.main.css({width:this._oSize.width+"px",height:this._oSize.height+"px"});
if(this._oLeftScroll){this._oLeftScroll.option({nWidth:oLeftSize.nWidth,nHeight:oLeftSize.nHeight});
this._oLeftScroll.refresh()
}if(this._oRightScroll){this._oRightScroll.option({nWidth:oRightSize.nWidth,nHeight:oRightSize.nHeight});
this._oRightScroll.refresh()
}switch(this._sStatus){case"left":if(this._htWElement.right){this._htWElement.right.hide()
}break;
case"right":if(this._htWElement.left){this._htWElement.left.hide()
}break;
case"main":if(this._htWElement.left){this._htWElement.left.hide()
}if(this._htWElement.right){this._htWElement.right.hide()
}break
}},_onRotate:function(we){if(we.sType=="pageShow"&&!we.$value().persisted){return false
}this.resize()
},_initComponent:function(){this._oLeftScroll=this._initScroll(this._oLeftLayoutInfo);
this._oRightScroll=this._initScroll(this._oRightLayoutInfo)
},_initScroll:function(oLayoutInfo){if(oLayoutInfo){return new jindo.m.Scroll(oLayoutInfo.welWrapper,this.option("htScrollOption"))
}else{return null
}},_setLayout:function(wel){var welHeader=jindo.$Element(wel.query(".rs-header")),welFooter=jindo.$Element(wel.query(".rs-footer")),welContent=jindo.$Element(wel.query(".rs-content")),bHeaderFixed=welHeader&&welHeader.attr("position")=="fixed",bFooterFixed=welFooter&&welFooter.attr("position")=="fixed",welWrapper=null;
if(this._bUseRebuild){welWrapper=this._arrangeDom({welContent:welContent,bHeaderFixed:bHeaderFixed,bFooterFixed:bFooterFixed,welHeader:welHeader,welFooter:welFooter})
}else{welWrapper=jindo.$Element(wel.query(".scroller"))
}return{welWrapper:welWrapper,welHeader:welHeader,welFooter:welFooter,bHeaderFixed:bHeaderFixed,bFooterFixed:bFooterFixed}
},_getScrollSize:function(oLayoutInfo){if(!oLayoutInfo){return{nWidth:0,nHeight:0}
}var nLeft=0,nNoFixedHeight=this._oSize.height,bVisible=oLayoutInfo.welWrapper.visible();
if(!bVisible){nLeft=oLayoutInfo.welWrapper.css("left");
oLayoutInfo.welWrapper.css("left","-999px").show()
}if(oLayoutInfo.bHeaderFixed){nNoFixedHeight-=oLayoutInfo.welHeader.height()
}if(oLayoutInfo.bFooterFixed){nNoFixedHeight-=oLayoutInfo.welFooter.height()
}if(!bVisible){oLayoutInfo.welWrapper.css("left",nLeft).hide()
}return{nWidth:this._oSize.width-this.option("nSildeThreshold"),nHeight:nNoFixedHeight}
},_arrangeDom:function(ht){ht.welContent.wrap("<div>").wrap("<div>");
var welScroller=ht.welContent.parent();
if(!ht.bHeaderFixed&&ht.welHeader){welScroller.prepend(ht.welHeader)
}if(!ht.bFooterFixed&&ht.welFooter){welScroller.append(ht.welFooter)
}return welScroller.parent()
},_slide:function(isRight,nDuration){if(this._oSlideReveal.left.isPlaying()&&this._oSlideReveal.right.isPlaying()){return
}var nPos=this._getPos(isRight?"right":"left"),self=this;
nDuration=(typeof nDuration=="undefined")?this.option("nSlideDuration"):nDuration;
if(this.fireEvent("beforeSlide",{sStatus:this._sStatus})){self._htWElement.blocker.show();
if(isRight){if(this._htWElement.left){this._htWElement.left.css("zIndex",5)
}if(this._htWElement.right){this._htWElement.right.css("zIndex",6).show()
}self._htWElement.blocker.css("left","0px");
this._sStatus="right"
}else{if(this._htWElement.right){this._htWElement.right.css("zIndex",5)
}if(this._htWElement.left){this._htWElement.left.css("zIndex",6).show()
}self._htWElement.blocker.css("left",nPos+"px");
this._sStatus="left"
}if(isRight){if(this._htWElement.left){this._oSlideReveal.left.hide(nDuration/2)
}if(this._htWElement.right){this._oSlideReveal.right.show(nDuration)
}}else{if(this._htWElement.right){this._oSlideReveal.right.hide(nDuration/2)
}if(this._htWElement.left){this._oSlideReveal.left.show(nDuration)
}}}},_getPos:function(sStatus){var nPos=parseInt(this._oSize.width-this.option("nSildeThreshold"),10);
switch(sStatus){case"left":break;
case"main":nPos=0;
break;
case"right":nPos=-nPos;
break
}return nPos
},move:function(sType,nDuration){nDuration=(typeof nDuration=="undefined")?this.option("nSlideDuration"):nDuration;
switch(sType){case"left":this._slide(false,nDuration);
break;
case"main":this.restore(nDuration);
break;
case"right":this._slide(true,nDuration);
break
}},toggleSlide:function(isRight){if(this._sStatus!="main"){this.restore();
return
}else{this._slide(isRight);
return
}},restore:function(nDuration){if(this._oSlideReveal.left.isPlaying()&&this._oSlideReveal.right.isPlaying()){return
}nDuration=(typeof nDuration=="undefined")?this.option("nSlideDuration"):nDuration;
if(this.fireEvent("beforeRestore",{sStatus:this._sStatus})){if(this._sStatus=="right"){this._oSlideReveal.right.hide(nDuration)
}else{this._oSlideReveal.left.hide(nDuration)
}}},_onRevealShow:function(){if(this._sStatus=="left"&&this._oSlideReveal[this._sStatus]){this._oSlideReveal.right._bShow=false;
this._htWElement.right.hide()
}if(this._sStatus=="right"&&this._oSlideReveal[this._sStatus]){this._oSlideReveal.left._bShow=false;
this._htWElement.left.hide()
}this.fireEvent("slide",{sStatus:this._sStatus})
},_onRevealRestore:function(sStatus){this._sStatus="main";
this._htWElement.blocker.hide();
if(sStatus=="left"&&this._htWElement.left){this._htWElement.left.hide()
}if(sStatus=="right"&&this._htWElement.right){this._htWElement.right.hide()
}this.fireEvent("restore",{sStatus:this._sStatus})
},_initSlideReveal:function(){var self=this;
var htDefaultOption={nDuration:this.option("nSlideDuration"),nMargin:this.option("nSildeThreshold"),bUseTimingFunction:this.option("bUseTimingFunction")};
if(this._htWElement.left){this._htWElement.main.addClass("revealLeft-contents");
this._htWElement.left.addClass("revealLeft-nav");
this._oSlideReveal.left=new jindo.m.SlideReveal(jindo.$Jindo.mixin(htDefaultOption,{sClassPrefix:"revealLeft-",sDirection:"right"})).attach({show:function(e){self._onRevealShow()
},hide:function(e){self._onRevealRestore("left")
}})
}if(this._htWElement.right){this._htWElement.main.addClass("revealRight-contents");
this._htWElement.right.addClass("revealRight-nav");
this._oSlideReveal.right=new jindo.m.SlideReveal(jindo.$Jindo.mixin(htDefaultOption,{sClassPrefix:"revealRight-",sDirection:"left"})).attach({show:function(e){self._onRevealShow()
},hide:function(e){self._onRevealRestore("right")
}})
}},_onActivate:function(){this._attachEvent();
this.resize();
this._initSlideReveal()
},_onDeactivate:function(){this._detachEvent()
},_attachEvent:function(){this._htEvent={};
this._htEvent.restore=jindo.$Fn(this._onRestore,this).attach(this._htWElement.blocker,"click");
this._htEvent.rotate=jindo.$Fn(this._onRotate,this).bind();
jindo.m.bindRotate(this._htEvent.rotate);
jindo.m.bindPageshow(this._htEvent.rotate)
},_detachEvent:function(){this._htEvent.restore.detach(this._htWElement.blocker,"click");
jindo.m.unbindRotate(this._htEvent.rotate);
jindo.m.unbindPageshow(this._htEvent.rotate);
this._htEvent=null
},_onRestore:function(we){this.restore()
},destroy:function(){this.deactivate();
this._oLeftScroll.destroy();
this._oLeftScroll=null;
this._oRightScroll.destroy();
this._oRightScroll=null
}}).extend(jindo.m.UIComponent);
jindo.m.ScrollEnd=jindo.$Class({$init:function(el,htUserOption){this._initVar();
this._setWrapperElement(el);
this._attachEvent()
},_initVar:function(){this._nType=this._getDetectType();
this._bIOS=jindo.m.getDeviceInfo().iphone||jindo.m.getDeviceInfo().ipad;
if(this._nType===2){this._nScrollTimer=-1
}this._isTouched=false;
this._isMoved=false;
this._nObserver=null;
this._nScrollEndTimer=null;
this._nPreLeft=null;
this._nPreTop=null;
this._bMoveIOS=0
},_getDetectType:function(){var nRet=0;
if(jindo.m.getDeviceInfo().android){if(parseInt(jindo.m.getDeviceInfo().version,10)>=3){nRet=2
}else{nRet=1
}}else{if(jindo.m.getDeviceInfo().win){if(parseInt(jindo.m.getDeviceInfo().version,10)>=8){nRet=2
}}}return nRet
},_setWrapperElement:function(el){this._htElement={};
this._htElement.body=document.body
},_attachEvent:function(){this._htEvent={};
this._htEvent.event_scroll={ref:jindo.$Fn(this._onScroll,this).attach(window,"scroll"),el:window};
if(this._nType==0&&this._bIOS){this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForIOS,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body}
}if(this._nType==1){this._htEvent.event_touchstart={ref:jindo.$Fn(this._onStartForAndroid,this).attach(this._htElement.body,"touchstart"),el:this._htElement.body};
this._htEvent.event_touchmove={ref:jindo.$Fn(this._onMoveForAndroid,this).attach(this._htElement.body,"touchmove"),el:this._htElement.body};
this._htEvent.event_touchend={ref:jindo.$Fn(this._onEndForAndroid,this).attach(this._htElement.body,"touchend"),el:this._htElement.body}
}},_onMoveForIOS:function(){this._bMoveIOS=0
},_detachEvent:function(){for(var p in this._htEvent){var ht=this._htEvent[p];
ht.ref.detach(ht.el,p.substring(p.lastIndexOf("_")))
}},_startObserver:function(){var self=this;
this._stopObserver();
this._nObserver=setInterval(function(){self._observe()
},100)
},_observe:function(){if(this._isTouched||(this._nPreTop!==window.pageYOffset||this._nPreLeft!==window.pageXOffset)){this._nPreTop=window.pageYOffset;
this._nPreLeft=window.pageXOffset
}else{this._stopObserver();
this._fireEventScrollEnd()
}},_stopObserver:function(){clearInterval(this._nObserver);
this._nObserver=null
},_onScroll:function(we){switch(this._nType){case 0:if(this._bIOS&&this._bMoveIOS>0){return false
}this._fireEventScrollEnd();
this._bMoveIOS++;
break;
case 1:this._startObserver();
break;
case 2:var self=this;
clearTimeout(this._nScrollTimer);
this._nScrollTimer=setTimeout(function(){self._fireEventScrollEnd()
},350);
break
}},_onStartForAndroid:function(we){this._isTouched=true;
this._isMoved=false;
this._nPreTop=null;
this._nPreLeft=null
},_onMoveForAndroid:function(we){this._isMoved=true
},_onEndForAndroid:function(we){this._isTouched=false;
if(this._isMoved){this._startObserver()
}},_fireEventScrollEnd:function(){this.fireEvent("scrollEnd",{nTop:window.pageYOffset,nLeft:window.pageXOffset})
},_fireEventScrollEndForAndroid:function(){var self=this;
clearTimeout(this._nScrollEndTimer);
this._nScrollEndTimer=setTimeout(function(){self._fireEventScrollEnd()
},500)
},destroy:function(){this._detachEvent();
this._nType=-1;
this._isTouched=null;
this._isMoved=null;
this._nObserver=null;
this._nPreLeft=null;
this._nPreTop=null
}}).extend(jindo.m.Component);
jindo.m.SlideEffect=jindo.$Class({sEffectName:"slide",getCommand:function(el,htOption){if(htOption.nDistance){htOption.nSize=htOption.nDistance
}var sDirection=htOption.sDirection?htOption.sDirection:"left";
var htCurOffset=jindo.m.getCssOffset(el);
var toX=htCurOffset.left;
var toY=htCurOffset.top;
var nW,nH,wel;
nW=(typeof htOption.nSize!="undefined")?htOption.nSize:this._htLayerInfo.nWidth;
nH=(typeof htOption.nSize!="undefined")?htOption.nSize:this._htLayerInfo.nHeight;
if(sDirection=="up"||sDirection=="down"){toY+=((sDirection=="up")?nH*-1:nH)
}if(sDirection=="left"||sDirection=="right"){toX+=((sDirection=="left")?nW*-1:nW)
}if(typeof htOption.elBaseLayer!="undefined"){toX=0;
toY=0;
var welBaseLayer=jindo.$Element(htOption.elBaseLayer);
wel=jindo.$Element(el);
nH=(typeof htOption.nSize!="undefined")?htOption.nSize:welBaseLayer.height();
nW=(typeof htOption.nSize!="undefined")?htOption.nSize:welBaseLayer.width();
if(sDirection=="up"||sDirection=="down"){toY=(sDirection=="down")?nH*-1:nH
}if(sDirection=="left"||sDirection=="right"){toX=(sDirection=="left")?nW:nW*-1
}toX=toX*-1;
toY=toY*-1
}var sPosition=this._htLayerInfo.sPosition;
var bAndroid=this.bAndroid;
var bAndroid3Up=this.bAndroid3Up;
var sClassHighligting=this._htLayerInfo.sClassHighligting;
var bAndroid2_1=this.bAndroid2_1;
wel=jindo.$Element(el);
var htStyle=htOption.htTo||{};
htStyle.transform=this.sTranOpen+toX+"px, "+toY+"px"+this.sTranEnd;
var htReturnStyle={};
this.getTranslateStyle(htStyle,htReturnStyle);
return{sTaskName:this.sEffectName+"-"+sDirection,htStyle:htReturnStyle,fCallback:function(){var htCurOffset=jindo.m.getCssOffset(el);
var top=wel.css("top").replace("px","")*1;
var left=wel.css("left").replace("px","")*1;
top=isNaN(top)?0:top;
left=isNaN(left)?0:left;
if(sPosition=="relative"){wel.css("position","relative")
}else{wel.css("position","absolute")
}var sPrefix=jindo.m.getCssPrefix();
wel.css(sPrefix+"Transform","");
if(bAndroid3Up){wel.offset()
}wel.$value().style.top=parseInt((top+htCurOffset.top),10)+"px";
wel.$value().style.left=parseInt((htCurOffset.left+left),10)+"px";
if(bAndroid&&!bAndroid3Up){var elFocus=jindo.$$.getSingle("."+sClassHighligting,wel.$value());
if(elFocus){if(bAndroid2_1){setTimeout(function(){elFocus.focus()
},5)
}else{elFocus.focus()
}}}}}
},getBeforeCommand:function(el,htOption){var sDirection=htOption.sDirection?htOption.sDirection:"left";
var htBeforeStyle=htOption.htFrom||{};
var wel=jindo.$Element(el);
if(typeof htOption.elBaseLayer!="undefined"){var welBaseLayer=jindo.$Element(htOption.elBaseLayer);
if(!welBaseLayer.isParentOf(wel)){welBaseLayer.append(wel);
var sPosition=wel.css("position");
if(!(sPosition=="relative"||sPosition=="absolute")){wel.css("position","absolute")
}wel.css("opacity",0)
}var fromX=0,fromY=0;
var nH=welBaseLayer.height();
var nW=welBaseLayer.width();
if(sDirection=="up"||sDirection=="down"){fromY=(sDirection=="down")?nH*-1:nH
}if(sDirection=="left"||sDirection=="right"){fromX=(sDirection=="left")?nW:nW*-1
}welBaseLayer.css("overflow","hidden");
htBeforeStyle.left=fromX+"px";
htBeforeStyle.top=fromY+"px";
htBeforeStyle.opacity=this._htLayerInfo.nOpacity
}var htBeforeReturnStyle={};
this.getTranslateStyle(htBeforeStyle,htBeforeReturnStyle);
return{htStyle:htBeforeReturnStyle}
}}).extend(jindo.m._Effect_);
jindo.m.Visible=jindo.$Class({$init:function(elWrap,htOption){this._elWrap=jindo.$(elWrap)||document;
this._nTimer=null;
this.option({sClassName:"check_visible",nExpandSize:0});
this.option(htOption||{});
this.refresh()
},_supportGetElementsByClassName:function(){var oConst=this.constructor;
if(!("__supportGetElementsByClassName" in oConst)){oConst.__supportGetElementsByClassName=(function(){var elDummy=document.createElement("div");
if(!elDummy.getElementsByClassName){return false
}var aDummies=elDummy.getElementsByClassName("dummy");
elDummy.innerHTML='<span class="dummy"></span>';
return aDummies===1
})()
}return oConst.__supportGetElementsByClassName
},refresh:function(){if(this._supportGetElementsByClassName()){this._aTargets=this._elWrap.getElementsByClassName(this.option("sClassName"));
this.refresh=function(){}
}else{this._aTargets=jindo.$$("."+this.option("sClassName"),this._elWrap)
}return this
},check:function(nDelay){var self=this;
if(typeof nDelay==="undefined"){nDelay=-1
}if(this._nTimer){clearTimeout(this._nTimer);
this._nTimer=null
}if(nDelay<0){this._check()
}else{this._nTimer=setTimeout(function(){self._check();
self._nTimer=null
},nDelay)
}return this
},_check:function(){var _=new Date();
var i;
var oArea=null;
var elWrap=this._elWrap;
var aTargets=this._aTargets;
var nExpandSize=this.option("nExpandSize");
var oCount={"true":0,"false":0};
if(elWrap===document){var wdDoc=jindo.$Document(document);
var oClientSize=wdDoc.clientSize();
oArea={top:0,left:0,bottom:oClientSize.height,right:oClientSize.width}
}else{oArea=elWrap.getBoundingClientRect();
oArea={top:oArea.top,left:oArea.left,bottom:oArea.bottom,right:oArea.right}
}oArea.top-=nExpandSize;
oArea.left-=nExpandSize;
oArea.bottom+=nExpandSize;
oArea.right+=nExpandSize;
var aFireList=[];
for(i=aTargets.length-1;
i>=0;
i--){var elTarget=aTargets[i];
var oTargetArea=elTarget.getBoundingClientRect();
if(!this._bSupportQSA&&!jindo.$Element(elTarget).hasClass(this.option("sClassName"))){delete elTarget.__VISIBLE;
aTargets.splice(i,1);
continue
}var bBefore=!!elTarget.__VISIBLE;
var bAfter=!(oTargetArea.bottom<oArea.top||oArea.bottom<oTargetArea.top||oTargetArea.right<oArea.left||oArea.right<oTargetArea.left);
elTarget.__VISIBLE=bAfter;
if(bBefore!==bAfter){aFireList.push([bAfter,elTarget]);
oCount[!bAfter]++
}else{oCount[bAfter]++
}}for(i=aFireList.length-1;
i>=0;
i--){var oFireItem=aFireList[i];
oCount[!oFireItem[0]]--;
oCount[oFireItem[0]]++;
this.fireEvent(oFireItem[0]?"visible":"invisible",{elTarget:oFireItem[1],nVisible:oCount["true"],nInvisible:oCount["false"]})
}var elCost=jindo.$("cost");
elCost&&(elCost.innerHTML=aTargets.length+"pcs : "+(new Date()-_)+"ms")
}}).extend(jindo.m.Component);
function replaceHTML(elOldElement,sNewHTML){if(!elOldElement||!elOldElement.nodeName){return
}var elNewElement=document.createElement(elOldElement.nodeName);
if(elOldElement.id){elNewElement.id=elOldElement.id
}if(elOldElement.className){elNewElement.className=elOldElement.className
}elNewElement.innerHTML=sNewHTML||"";
elOldElement.parentNode.replaceChild(elNewElement,elOldElement);
return elNewElement
}function replaceWhiteSpace(sString){return(typeof(sString)=="string")?sString.replace(/\s{2}/g,"&nbsp;&nbsp;"):""
}function restoreWhiteSpace(sString){return(typeof(sString)=="string")?sString.replace(/\&nbsp\;/g," "):""
}function replaceDollarSign(sString){return(typeof(sString)=="string")?sString.replace(/\$/g,"&#36;"):""
}function replaceSpecialChar(sString){return(typeof(sString)=="string")?(sString.replace(/\&/g,"&amp;").replace(/\"/g,"&quot;").replace(/\'/g,"&#39;").replace(/</g,"&lt;").replace(/\>/g,"&gt;")):""
}function restoreSpecialChar(sString){return(typeof(sString)=="string")?(sString.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">")):""
}function restoreAllSpecialChar(sString){var elDummy=document.createElement("div");
elDummy.innerHTML=sString;
try{return elDummy.textContent||elDummy.innerText
}finally{elDummy=null
}}function stripScripts(sString){return(typeof sString=="string")?sString.replace(/<script[^>]*>([\S\s]*?)<\/script>/img,""):""
}function extractScripts(sString){return(typeof sString=="string")?(sString.match(/<script[^>]*>([\S\s]*?)<\/script>/img)||[]):[]
}function evaluateScripts(sString){var arr=extractScripts(sString);
var i=0,nLen=arr.length;
while(i<nLen){eval(arr[i].replace(/<(\/)?script[^>]*>/img,""));
i++
}}function stripHTML(sString){return(typeof sString=="string")?sString.replace(/<(?:.|\s)*?>/g,""):""
}function addStrongTag(elAddElement,elRemoveElement){if(!!elRemoveElement&&elRemoveElement.nodeName){elRemoveElement.innerHTML=elRemoveElement.innerHTML.replace(/<\/?strong>/gi,"")
}if(elAddElement){var sNoStrongAddElement=elAddElement.innerHTML.replace(/<\/?strong>/gi,"");
elAddElement.innerHTML="<strong>"+sNoStrongAddElement+"</strong>"
}}function addSelectboxOption(elSelectbox,sOptionText,sOptionValue,bOptionSelected){var elNewOption=new Option(sOptionText,sOptionValue,bOptionSelected||false);
elSelectbox.options[elSelectbox.options.length]=elNewOption;
elNewOption=null
}function removeSelectboxOption(elSelectbox,nOptionIndex){if(nOptionIndex){elSelectbox.options[nOptionIndex]=null
}else{elSelectbox.options.length=0
}}function cutString(sString,nMaxLength,sTail){var sSource=(typeof sString!="String")?sString.toString():sString;
var nLimit=parseInt(nMaxLength,10);
var sAdd=sTail||"";
return(sSource.length>nLimit)?sSource.substring(0,nLimit)+sAdd:sSource
}function cutStringByByte(sString,nMaxByte,sTail){var sSource=(typeof sString!="String")?sString.toString():sString;
var nLimit=parseInt(nMaxByte,10);
var sAdd=sTail||"";
for(var i=0,nLen=sSource.length,nCurrentByte=0;
i<nLen;
i++){nCurrentByte+=(sSource.charCodeAt(i)>128)?2:1;
if(nCurrentByte>nLimit){return sSource.substring(0,i)+sAdd
}}return sSource
}function cutStringByPixel(sString,nMaxPixel,sTail){var sSource=(typeof sString!="String")?sString.toString():sString;
var nLimit=parseInt(nMaxPixel,10);
var sAdd=sTail||"";
var aResultString=[];
var sTmpChat="";
if(!this.welMeasure){this.welMeasure=$Element("<span>");
this.welMeasure.css({position:"absolute",top:"-1000px",left:"-1000px"});
this.welMeasure.prependTo(document.body)
}else{this.welMeasure.empty()
}sSource=sSource.replace(/\r?\n/gim," ");
for(var i=0,nLen=sSource.length;
i<nLen;
i++){sTmpChat=sSource.charAt(i);
if(sTmpChat===" "){aResultString.push(";")
}else{aResultString.push(sTmpChat)
}this.welMeasure.text(aResultString.join("")+sAdd);
if(this.welMeasure.width()>nLimit){return sSource.substring(0,(aResultString.length-1))+sAdd
}}return sSource
}function getConstructorName(oObject){if(oObject&&oObject.constructor){var sCode=oObject.constructor.toString();
var aMatch=sCode.match(/function ([^\(]*)/);
return(aMatch&&aMatch[1])||null
}return null
}function cloneObject(oObject){var sConstructor;
var oDestinationTarget;
if(oObject&&typeof oObject=="object"&&(sConstructor=getConstructorName(oObject))){oDestinationTarget=eval("new "+sConstructor+"()");
for(var key in oObject){oDestinationTarget[key]=arguments.callee(oObject[key])
}}else{oDestinationTarget=oObject
}return oDestinationTarget
}function isArray(oMaybeArray){return Object.prototype.toString.call(oMaybeArray)=="[object Array]"
}function isEqualObject(oBase,oComparison){if(!oBase||!oComparison){return false
}for(var x in oBase){if(oBase[x] instanceof Object){if(!this.isEqualObject(oBase[x],oComparison[x])){return false
}}else{if(oBase[x]!=oComparison[x]){return false
}}}return true
}function makeTemplate(sTemplate,htObject){return sTemplate.replace(/{([^{}]*)}/g,function(a,b){var r=htObject[b]||"";
return r
})
}function changeJavascriptDate(sNormalDate){var dReturnDate=null;
var aValue=sNormalDate.match(/^([0-9]{4,})-([01][0-9])-([0-3][0-9]) ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])/);
if(aValue===null){aValue=sNormalDate.match(/^([0-9]{4,})-([01][0-9])-([0-3][0-9])/);
if(aValue!==null){dReturnDate=new Date(aValue[1],Number(aValue[2])-1,aValue[3])
}}else{dReturnDate=new Date(aValue[1],Number(aValue[2])-1,aValue[3],aValue[4],aValue[5],aValue[6])
}return dReturnDate
}function changeDateFormat(dJavascriptDate,htOption){if(arguments.length<1){return false
}if(!(dJavascriptDate.constructor==Date||dJavascriptDate.constructor==Date())){return false
}var options={format:"{yyyy}/{mm}/{0d} {0H}:{0i}",monthFormat:["01","02","03","04","05","06","07","08","09","10","11","12"],weekFormat:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],ampmFormat:["am","pm"]};
htOption=htOption||{};
for(var i in htOption){options[i]=htOption[i]
}options.rowData=[dJavascriptDate.getFullYear()+"",dJavascriptDate.getMonth(),dJavascriptDate.getDate(),dJavascriptDate.getDay(),dJavascriptDate.getHours()<12?0:1,dJavascriptDate.getHours(),dJavascriptDate.getMinutes(),dJavascriptDate.getSeconds()];
if(options.rowData[3]===0){options.rowData[3]=7
}return options.format.replace(/\{([^{}]*)\}/g,function(type){var coptions=options;
function addZero(num){return(num>=10)?num:"0"+num
}function twelveNotation(num){return(num>12)?num-12:num
}var rowData=coptions.rowData;
var monthFormat=coptions.monthFormat;
var weekFormat=coptions.weekFormat;
var ampmFormat=coptions.ampmFormat;
return type=="{yyyy}"&&rowData[0]||type=="{yy}"&&rowData[0].slice(2,4)||type=="{mm}"&&monthFormat[rowData[1]]||type=="{dd}"&&rowData[2]||type=="{0d}"&&addZero(rowData[2])||type=="{ww}"&&weekFormat[rowData[3]-1]||type=="{ap}"&&ampmFormat[rowData[4]]||type=="{hh}"&&twelveNotation(rowData[5])||type=="{HH}"&&rowData[5]||type=="{0h}"&&addZero(twelveNotation(rowData[5]))||type=="{0H}"&&addZero(rowData[5])||type=="{ii}"&&addZero(rowData[6])||type=="{0i}"&&addZero(rowData[6])||type=="{ss}"&&rowData[7]||type=="{0s}"&&addZero(rowData[7])||"'"+type+":undefined type'"
})
}function isNumberOnly(sNumberString){if(/^[\d]+$/.test(sNumberString)){return true
}return false
}function isEmpty(sString){if(sString&&sString.length>0){return false
}return true
}function trim(sString){if(!sString){return sString
}return(typeof sString=="string")?sString.replace(/^\s+/g,"").replace(/\s+$/g,""):""
}function isEmail(sEmail){var sEmailTrim=(typeof sEmail=="string")?trim(sEmail):"";
var aResult=sEmailTrim.match(/[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)+/);
if(aResult&&aResult[0]==sEmailTrim){return true
}else{return false
}}function isEmailFirst(sEmailFirst){var rxEmailFirst=/^[\w\d]+([-_\.]?[\w\d])*$/i;
if(sEmailFirst&&rxEmailFirst.test(sEmailFirst)){return true
}return false
}function isEmailLast(sEmailLast){var rxEmailLast=/^[\w\d]([-_\.]?[\w\d])*\.[\w]{2,3}$/i;
if(sEmailLast&&rxEmailLast.test(sEmailLast)){return true
}return false
}function isPhone(sPhone){var rxPhone=/^0\d{1,2}-[1-9]\d{2,3}-\d{4}$/;
if(sPhone&&rxPhone.test(sPhone)){return true
}return false
}function isIP(sIP){var rxIP=/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)$/;
if(sIP&&rxIP.test(sIP)){return true
}return false
}function isURL(sURL){var rxURL=/^(http|https|ftp|mailto|mms):(?:\/\/)?((\w|-)+(?:[\.:@](\w|-))+)(?:\/|@)?([^"\?]*?)(?:\?([^\?"]*?))?$/;
if(sURL&&rxURL.test(sURL)){return true
}return false
}function replaceAll(sString,sBefore,sAfter){return(typeof sString=="string")?sString.replace(new RegExp(sBefore,"g"),sAfter):""
}function removeNewline(sString){return(typeof sString=="string")?sString.replace(/\r/gi,"").replace(/\n/gi,""):""
}function replaceNewline(sHTMLString){return(typeof sHTMLString=="string")?sHTMLString.replace(/<br\s?\/?>/gi,"\n").replace(/<\/?p>/gi,"\n"):""
}function getCharByte(sChar){if(!sChar){return 0
}var nByteSize=0;
var str=escape(sChar);
if(str.length==1){nByteSize++
}else{if(str.indexOf("%u")!=-1){nByteSize+=2
}else{if(str.indexOf("%")!=-1){nByteSize+=str.length/3
}}}return nByteSize
}function getStringByte(sString){var sSource=(typeof sString=="string")?sString:"";
var sByte=0;
var sChar="";
var sLen=sSource.length;
for(i=0;
i<sLen;
i++){sChar=sSource.charAt(i);
sByte+=getCharByte(sChar)
}return sByte
}function cutFilenameByByte(sFileName,nMaxByte,sTail){var sSourceFileName=sFileName||"";
var sAddTail=sTail||"";
var nCutSize=parseInt(nMaxByte,10);
if(nCutSize<1||nCutSize>=getStringByte(sSourceFileName)){return sSourceFileName
}var aToken=sSourceFileName.split(".");
var nTokenLength=aToken.length;
var sFileExt="";
var nFileExtSize=0;
if(nTokenLength>1){sFileExt=aToken[nTokenLength-1];
nFileExtSize=getStringByte(sFileExt);
aToken.pop();
sSourceFileName=aToken.join(".")
}var nTailSize=0;
if(sAddTail!=""){nTailSize=getStringByte(sAddTail)
}var nSize=nTailSize+nFileExtSize;
if(nCutSize>nSize){nCutSize-=nSize
}else{sSourceFileName=""
}for(var i=0,nResultSize=0,nFileNameLength=sSourceFileName.length;
i<nFileNameLength;
i++){nResultSize+=getCharByte(sSourceFileName.charAt(i));
if(nResultSize>nCutSize){sSourceFileName=sSourceFileName.substring(0,i);
break
}}return sSourceFileName+sAddTail+sFileExt
}function makeRandomString(nMaxLength,sElements){var string_length=nMaxLength||0;
var chars=sElements||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
var randomstring="";
for(var i=0;
i<string_length;
i++){var rnum=Math.floor(Math.random()*chars.length);
randomstring+=chars.substring(rnum,rnum+1)
}return randomstring
}function getFileSize(nByte){var nByteSize=nByte||0;
var sRet="",sUnit="",nSize=0;
var aUnit=["KB","MB","GB","TB","PB","EB","ZB","YB"];
var i=aUnit.length;
if(nByteSize===0){return nByteSize+aUnit[0]
}while(i>=0){nSize=nByteSize/Math.pow(1024,i);
if(Math.floor(nSize)>0){if(i===0){nSize=1;
sUnit=aUnit[i]
}else{sUnit=aUnit[i-1]
}break
}i--
}if(sUnit=="KB"){sRet=Math.ceil(nSize)+sUnit
}else{var aMatch=String(nSize).match(/((\d*)\.(\d{0,2}))(\d)?/i);
if(!aMatch[4]||Number(aMatch[4])===0){if(Number(aMatch[3])===0){sRet=String(aMatch[2])+sUnit
}else{sRet=String(aMatch[1])+sUnit
}}else{var nCeilSize=Math.round((Number(aMatch[1])*100)+1)/100;
sRet=String(nCeilSize)+sUnit
}}return sRet
}function changeNumberFormat(vNumber){var sUnderNumber="";
var sNumberString=vNumber||0;
sNumberString=(typeof sNumberString!="String")?String(sNumberString):sNumberString;
if(sNumberString.indexOf(".")>-1){var aNumber=sNumberString.split(".");
sNumberString=aNumber[0];
sUnderNumber="."+aNumber[1]
}return sNumberString.replace(/(\d)(?=(\d{3})+$)/igm,"$1,")+sUnderNumber
}function getFolderName(sPath){return(typeof sPath=="string")?sPath.match(/.*\/(.[^\/]*)\/?$/i)[1]:""
}function isUpperPath(sUpperPath,sMaybeLowerPath){var bIsUpper=false;
var sRegexUpperPath=$S(sUpperPath).escapeRegex().$value();
var sReg=new RegExp("^"+sRegexUpperPath,"i");
var aMatch=sReg.exec(sMaybeLowerPath);
if(aMatch){bIsUpper=true
}return bIsUpper
}function getParentPath(sPath){var sParentPath=sPath.replace(/([^\/]*\/?)$/i,"");
if(/^(\w*:\/{2,3})$/.test(sParentPath)){sParentPath=""
}return sParentPath
}function sortArray(aTargetArray,sSortType,sFieldName){var aSortedArray;
var nTargetArrayLength=aTargetArray.length;
var vCompareA,vCompareB;
if(nTargetArrayLength/2<1){aSortedArray=aTargetArray
}else{if(nTargetArrayLength/2==1){var nTemp;
vCompareA=(sFieldName)?aTargetArray[0][sFieldName]:aTargetArray[0];
vCompareB=(sFieldName)?aTargetArray[1][sFieldName]:aTargetArray[1];
if(sSortType=="asc"){if(vCompareA>vCompareB){nTemp=aTargetArray[1];
aTargetArray[1]=aTargetArray[0];
aTargetArray[0]=nTemp
}}else{if(vCompareA<vCompareB){nTemp=aTargetArray[1];
aTargetArray[1]=aTargetArray[0];
aTargetArray[0]=nTemp
}}aSortedArray=[aTargetArray[0],aTargetArray[1]]
}else{var nMiddleIndex=Math.round(nTargetArrayLength/2)-1;
var nLeftIndex=0;
var nRightIndex=0;
var aLeftArray=[];
var aRightArray=[];
if(sSortType=="asc"){for(var i=0;
i<nMiddleIndex;
i++){vCompareA=(sFieldName)?aTargetArray[i][sFieldName]:aTargetArray[i];
vCompareB=(sFieldName)?aTargetArray[nMiddleIndex][sFieldName]:aTargetArray[nMiddleIndex];
if(vCompareA>vCompareB){aRightArray[nRightIndex++]=aTargetArray[i]
}else{aLeftArray[nLeftIndex++]=aTargetArray[i]
}}for(var j=nMiddleIndex+1;
j<nTargetArrayLength;
j++){vCompareA=(sFieldName)?aTargetArray[j][sFieldName]:aTargetArray[j];
vCompareB=(sFieldName)?aTargetArray[nMiddleIndex][sFieldName]:aTargetArray[nMiddleIndex];
if(vCompareA<vCompareB){aLeftArray[nLeftIndex++]=aTargetArray[j]
}else{aRightArray[nRightIndex++]=aTargetArray[j]
}}}else{for(var i=0;
i<nMiddleIndex;
i++){vCompareA=(sFieldName)?aTargetArray[i][sFieldName]:aTargetArray[i];
vCompareB=(sFieldName)?aTargetArray[nMiddleIndex][sFieldName]:aTargetArray[nMiddleIndex];
if(vCompareA<vCompareB){aRightArray[nRightIndex++]=aTargetArray[i]
}else{aLeftArray[nLeftIndex++]=aTargetArray[i]
}}for(var j=nMiddleIndex+1;
j<nTargetArrayLength;
j++){vCompareA=(sFieldName)?aTargetArray[j][sFieldName]:aTargetArray[j];
vCompareB=(sFieldName)?aTargetArray[nMiddleIndex][sFieldName]:aTargetArray[nMiddleIndex];
if(vCompareA>vCompareB){aLeftArray[nLeftIndex++]=aTargetArray[j]
}else{aRightArray[nRightIndex++]=aTargetArray[j]
}}}var nLeftArrayLength=aLeftArray.length;
var nRigthArrayLength=aRightArray.length;
var aLeft,aRight;
if(nLeftArrayLength>1){aLeft=arguments.callee(aLeftArray,sSortType,sFieldName)
}else{aLeft=aLeftArray
}if(nRigthArrayLength>1){aRight=arguments.callee(aRightArray,sSortType,sFieldName)
}else{aRight=aRightArray
}aSortedArray=new Array(nLeftArrayLength+nRigthArrayLength-1);
var nSortedIndex=0;
for(var i=0,nLeftLen=aLeft.length;
i<nLeftLen;
i++){aSortedArray[nSortedIndex++]=aLeft[i]
}aSortedArray[nSortedIndex++]=aTargetArray[nMiddleIndex];
for(var i=0,nRightLen=aRight.length;
i<nRightLen;
i++){aSortedArray[nSortedIndex++]=aRight[i]
}}}return aSortedArray
}function getCookie(sName){var ca=document.cookie.split(/\s*;\s*/);
var re=new RegExp("^(\\s*"+sName+"\\s*=)");
for(var i=0;
i<ca.length;
i++){if(re.test(ca[i])){return unescape(ca[i].substr(RegExp.$1.length))
}}return null
}function setCookie(sName,sValue,nDays,sDomain,sPath){var sExpire="";
if(typeof nDays=="number"){sExpire=";expires="+(new Date((new Date()).getTime()+nDays*1000*60*60*24)).toGMTString()
}if(typeof sDomain=="undefined"){sDomain=""
}if(typeof sPath=="undefined"){sPath="/"
}document.cookie=sName+"="+escape(sValue)+sExpire+"; path="+sPath+(sDomain?"; domain="+sDomain:"")
}function extend(oDestination,oSource){for(var name in oSource){if(typeof(oDestination[name])=="undefined"){oDestination[name]=oSource[name]
}}return oDestination
}function bind(oObject,fFunc){var oSelf=oObject;
return function(){return fFunc.apply(oSelf,arguments)
}
}function disableSelection(elElement){var oNavigator=$Agent().navigator();
if(oNavigator.ie||oNavigator.opera){elElement.unselectable="on"
}else{if(oNavigator.safari||oNavigator.chrome){elElement.style.KhtmlUserSelect="none"
}else{elElement.style.MozUserSelect="-moz-none"
}}}function setLayerAttrs(elElement,htAttr){for(var prop in htAttr){if(typeof htAttr[prop]!="object"){elElement[prop]=htAttr[prop]
}else{arguments.callee(elElement[prop],htAttr[prop])
}}return elElement
}function pad(sSource,nLength,sPadChar){var sPad=sPadChar||" ";
var sResult=sSource+"";
if(sResult.length<nLength){var aStr=new Array((nLength-sResult.length)+1);
aStr[aStr.length-1]=sResult;
sResult=aStr.join(sPad)
}return sResult
}function getCSSRule(sSelector){var fpTry=function(sSelector){var aSheets=document.styleSheets;
for(var i=aSheets.length-1;
i>=0;
i--){try{var oSheet=aSheets[i];
var aRules=oSheet.cssRules||oSheet.rules;
for(var j=aRules.length-1;
j>=0;
j--){var oRule=aRules[j];
if(oRule.selectorText.toLowerCase()==sSelector.toLowerCase()){return oRule.style||null
}}}catch(e){}}return null
};
var oStyle=fpTry(sSelector);
if(oStyle){return oStyle
}var oEl=document.createElement("style");
oEl.type="text/css";
if(oEl.styleSheet){oEl.styleSheet.cssText=sSelector+"{}"
}else{oEl.appendChild(document.createTextNode(sSelector+"{}"))
}document.getElementsByTagName("head")[0].appendChild(oEl);
return fpTry(sSelector)
}function arrangeCenter(elInner,elOuter){var elChild=elInner;
var elParent=elOuter||elChild.parentNode;
var aOuterSize=[elParent.offsetWidth,elParent.offsetHeight];
var aInnerSize=[elChild.offsetWidth,elChild.offsetHeight];
elChild.style.left=(aOuterSize[0]-aInnerSize[0])/2+"px";
elChild.style.top=(aOuterSize[1]-aInnerSize[1])/2+"px"
}function setImageOn(elImg,bFlag){var sSrc=elImg.src;
sSrc=sSrc.replace(/(\w+)(\.\w+)(\?.*)?$/,function($0,sFileName,sExt,$3){sFileName=sFileName.replace(/_on$/,"");
if(bFlag){sFileName=sFileName+"_on"
}return sFileName+sExt+($3||"")
});
elImg.src=sSrc
}function isImageOn(elImg){var rxImg=/(\w+)_on(\.\w+)(\?.*)?$/;
return rxImg.test(elImg.src)
}function avoidFlashHashBug(){var sTitle=document.title;
window.setTimeout(function(){document.title=sTitle
},0)
}function openPopup(sUrl,sTitle,nWidth,nHeight,isCenter){var sPosition="";
var bCenter=isCenter||false;
if(bCenter){nLeftPosition=(screen.availWidth-nWidth)/2;
nTopPosition=(screen.availHeight-nHeight)/2;
sPosition="left="+nLeftPosition+", top="+nTopPosition+","
}return window.open(sUrl,sTitle,sPosition+" toolbar=no, location=no, status=no, menubars=no, resizable=no, width="+nWidth+", height="+nHeight)
}function getDomain(sURL){var sSourceURL=sURL||window.location.toString();
var aMatch=sSourceURL.match(/^(http|https|mms):\/\/([^\/]*)/i);
return(!!aMatch)?aMatch[0]:""
}function getSimpleURL(sURL){var sSourceURL=sURL||window.location.toString();
if(sSourceURL.indexOf("?")>-1){sSourceURL=sSourceURL.split("?")[0]
}if(sSourceURL.indexOf("#")>-1){sSourceURL=sSourceURL.split("#")[0]
}return sSourceURL
}function getURLParameter(sURL){var sSourceURL=sURL||window.location.toString();
var sURLParams="";
if(sSourceURL.indexOf("?")>-1){sURLParams=sSourceURL.split("?")[1];
if(sURLParams.indexOf("#")>-1){sURLParams=sURLParams.split("#")[0]
}}return sURLParams
}function getURLHash(sURL){var sSourceURL=sURL||window.location.toString();
var sURLHash="";
if(sSourceURL.indexOf("#")>-1){sURLHash=sSourceURL.split("#")[1]
}return sURLHash
}function changeQueryStringToObject(sQueryString){var htObject={};
var aParams=[];
var sQuery=sQueryString||"";
if(sQuery.indexOf("&")>-1){aParams=sQuery.split("&")
}else{aParams[0]=sQuery
}for(var i=0,nLength=aParams.length;
i<nLength;
i++){if(aParams[i].indexOf("=")>-1){var aParam=aParams[i].split("=");
htObject[aParam[0]]=aParam[1]
}}return htObject
}function changeObjectToQueryString(htObject){var aParam=[];
for(var key in htObject){aParam.push(key+"="+htObject[key])
}return aParam.join("&")
}function stopFlicker(){var m=document.uniqueID&&document.compatMode&&!window.XMLHttpRequest&&document.execCommand;
try{if(!!m){m("BackgroundImageCache",false,true)
}}catch(oh){}}function contains(elUpper,elMaybeLower){if(typeof elUpper.contains!="undefined"&&elMaybeLower.nodeType==1){return elUpper==elMaybeLower||elUpper.contains(elMaybeLower)
}if(typeof elUpper.compareDocumentPosition!="undefined"){return elUpper==elMaybeLower||Boolean(elUpper.compareDocumentPosition(elMaybeLower)&16)
}while(elMaybeLower&&elUpper!=elMaybeLower){elMaybeLower=elMaybeLower.parentNode
}return elMaybeLower==elUpper
}var lcs_add={};
var lcs_ver="v0.4.14.m";
var lcs_cnt=0;
function lcs_do(etc){if(!lcs_SerName){var lcs_SerName="lcs.naver.com"
}var rs="";
var index;
var doc=document;
var wlt=window.location;
try{var lcs_Addr=(wlt.protocol?wlt.protocol:"http:")+"//"+lcs_SerName+"/m?"
}catch(e){return
}try{rs=lcs_Addr+"u="+encodeURIComponent(wlt.href)+"&e="+(doc.referrer?encodeURIComponent(doc.referrer):"")
}catch(e){}try{if(typeof lcs_add.i=="undefined"){lcs_add.i=""
}for(var index in lcs_add){if(typeof lcs_add[index]!="function"){rs+="&"+index+"="+encodeURIComponent(lcs_add[index])
}}for(var index in etc){if((index.length>=3&&(typeof etc[index]!="function"))||index=="qy"){rs+="&"+index+"="+encodeURIComponent(etc[index])
}}if(lcs_cnt>0){var timeStr=(new Date).getTime();
rs+="&ts="+timeStr
}rs+="&EOU";
var obj=(new Image());
obj.src=rs;
obj.onload=function(){obj.onload=null;
return
};
lcs_cnt++
}catch(e){return
}}function lcs_do_gdid(gdid,etc){try{if(gdid){lcs_add.i=gdid;
if(etc){lcs_do(etc)
}else{lcs_do()
}}}catch(e){}}(function(a){var c,b,e=a.document;
if(typeof BMR==="undefined"){BMR={}
}if(BMR.v){return
}c={v:"t5",cN:"BMR=",bU:"",aL:function(f,d){if(a.addEventListener){a.addEventListener(f,d,false)
}else{if(a.attachEvent){a.attachEvent("on"+f,d)
}}},sT:function(){c.sC({s:new Date().getTime(),r:e.URL.replace(/#.*/,""),r2:e.referrer.replace(/#.*/,"")})
},eU:function(d){return encodeURIComponent(d)
},sC:function(f){var g="",d;
for(d in f){if(f.hasOwnProperty(d)){g+="&"+c.eU(d)+"="+c.eU(f[d])
}}g=g.replace(/^&/,"");
e.cookie=c.cN+g+"; path=/; domain="+a.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase()
},gC:function(){var h,g=e.cookie+";",f,d,k,j={};
if(!((h=g.indexOf(c.cN))>=0)){return null
}h+=c.cN.length;
f=g.substring(h,g.indexOf(";",h)).split("&");
if(f.length===0){return null
}for(h=0,d=f.length;
h<d;
h++){k=f[h].split("=");
k.push("");
j[decodeURIComponent(k[0])]=decodeURIComponent(k[1])
}return j
},run:function(f){if(!f){return
}var d=function(){if(c.sT){c.sT.call()
}c.sT=null
};
c.bU=f;
if("onpagehide" in a){c.aL("pagehide",d)
}else{c.aL("unload",d);
c.aL("beforeunload",d)
}c.aL(("onpageshow" in a)?"pageshow":"load",function(){c.done.call()
})
},done:function(){var g,f,d=e.URL.replace(/#.*/,""),i=r2=e.referrer.replace(/#.*/,""),h=c.gC();
c.sC({});
if(h!=null){i=h.r;
if(i==r2&&(i!=h.r2||i!=d)){f=new Date().getTime()-parseInt(h.s,10);
d=c.bU+"?v="+c.v+"&t="+f+"&u="+c.eU(d)+"&r="+c.eU(i);
(new Image()).src=d
}}}};
for(b in c){if(c.hasOwnProperty(b)){BMR[b]=c[b]
}}}(window));
document.domain="naver.com";
var $Class=jindo.$Class;
var $=jindo.$;
var $$=jindo.$$;
var $Element=jindo.$Element;
var $Fn=jindo.$Fn;
var $Template=jindo.$Template;
var $Agent=jindo.$Agent;
var nhn=window.nhn||{};
var exeJs=[];
var gameCenterKey="naver.sports.gamecenter";
var FAVICON_URL="http://imgsports.naver.net/images/mobile/favicon_20140331/";
function defineMobileUtil(){if(typeof window!="undefined"&&typeof window.m=="undefined"){window.m={}
}if(typeof window!="undefined"&&typeof window.m.util=="undefined"&&(window.m.util={},typeof window.m.util.getDeviceInfo=="undefined")){window.m.util.getDeviceInfo=function(){var b={},a=navigator.userAgent;
b.getName=function(){var a="";
for(x in b){typeof b[x]=="boolean"&&b[x]&&b.hasOwnProperty(x)&&(a=x)
}return a
};
b.iphone=(a||"").indexOf("iPhone")>-1;
b.ipad=(a||"").indexOf("iPad")>-1;
b.mobile=(a||"").indexOf("Mobile")>-1;
b.samsungPhone=(a||"").indexOf("SAMSUNG")>-1;
b.lgPhone=(a||"").indexOf("LG-")>-1;
b.chrome=(a||"").indexOf("Chrome")>-1;
b.android=(a||"").indexOf("Android")>-1;
b.galaxyS4=(a||"").indexOf("SHV-E300")>-1;
b.galaxyTab=(a||"").indexOf("SHW-M180S")>-1;
b.galaxyTab101=(a||"").indexOf("SHW-M380")>-1;
b.galaxyTab89=(a||"").indexOf("SHV-E140")>-1;
b.galaxyK=(a||"").indexOf("SWH-M130K")>-1;
b.galaxyNote=(a||"").indexOf("SHV-E160")>-1;
if(b.iphone||b.ipad){if(a=a.match(/OS\s([\d|\_]+\s)/i),a!=null&&a.length>1){b.version=a[1]
}}else{if(b.android&&(a=a.match(/Android\s(\d\.\d)/i),a!=null&&a.length>1)){b.version=a[1]
}}return b
}
}}defineMobileUtil();
function getDeviceInfo(){if(!window.m.util){defineMobileUtil()
}return m.util.getDeviceInfo()
}function getGalaxyTab(){return(getDeviceInfo().galaxyTab||getDeviceInfo().galaxyTab89)
}function naverLogin(){document.location.href="https://nid.naver.com/nidlogin.login?svctype=262144"
}function naverLogout(){if(confirm("로그아웃 하시겠습니까?")){document.location.href="https://nid.naver.com/nidlogin.logout?svctype=262144&amp;url="+encodeURIComponent(document.location)
}}function topPage(){try{window.scrollTo(0,1)
}catch(e){}}function bottomPage(){setTimeout(function(){window.scrollTo(0,document.body.scrollHeight)
},100)
}function getLocalStorage(key){if(window.localStorage){return window.localStorage.getItem(key)
}else{return null
}}function setLocalStorage(key,value){if(window.localStorage){window.localStorage.setItem(key,value)
}}function removeLocalStorage(key){if(window.localStorage){window.localStorage.removeItem(key)
}}function clearLocalStorage(){if(window.localStorage){window.localStorage.clear()
}}function toogleNaverServiceMenu(pos){var svcMenuButton=jindo.$Element("u_button_"+pos);
var svcMenuDesc=jindo.$Element("u_desc_"+pos);
var svcMenuLayer=jindo.$Element("u_layer_"+pos);
var svcMenuListTop=jindo.$Element("u_list_top");
var svcMenuListBottom=jindo.$Element("u_list_bottom");
var searchLayer=jindo.$Element("search");
if(svcMenuListBottom!=null){svcMenuListBottom.html(svcMenuListTop.html())
}if(svcMenuLayer.visible()){if(pos=="top"){svcMenuButton.removeClass("on");
svcMenuDesc.html("전체서비스 펼치기")
}else{svcMenuButton.removeClass("u_ftlkbt_fd");
svcMenuDesc.html(" 펼치기")
}svcMenuLayer.toggle()
}else{if(pos=="top"){svcMenuButton.addClass("on");
svcMenuDesc.html("전체서비스 접기");
if(searchLayer.visible()){toggleSearchButton()
}}else{svcMenuButton.addClass("on");
svcMenuDesc.html(" 접기");
bottomPage()
}svcMenuLayer.toggle()
}}function toggleLnb(){var lnbMenuLayer=jindo.$Element("u_lnb_layer");
var bullet=jindo.$Element("spt_bullet");
if(lnbMenuLayer.visible()){bullet.removeClass("spt_up")
}else{bullet.addClass("spt_up")
}lnbMenuLayer.toggle()
}function setlnb(){if(typeof menulist_bottom!="undefined"){jindo.$Element("u_lnb_bottom_menu").html(menulist_bottom)
}}function toggleSearchButton(){var searchLayer=jindo.$Element("search");
var searchBtn=jindo.$Element("searchBtn");
var svcMenuLayer=jindo.$Element("u_layer_top");
if(searchLayer.visible()){searchBtn.removeClass("on")
}else{searchBtn.addClass("on");
if(svcMenuLayer.visible()){toogleNaverServiceMenu("top")
}}jindo.$Element("search").toggle()
}function searchInputClear(){jindo.$("query").value=""
}function onSubmitSearch(){document.getElementById("sm").value="msv_hty";
document.getElementById("search").submit()
}var oAutoComplete=null;
function autoComplete(){try{jindo.$("hidden_input").value="@in_txt@";
var htAcOption={sUrl:"http://mac.search.naver.com/mobile/ac",sFormName:"search",nCutstr:30,nMaxListCount:5,sClearBtn:"clear_input",sCloseBtn:"close_input",sQueryFormat:"{query}",sRequestType:"jsonp",htRequestFormat:{q:"{query}",st:"1",frm:"mobile_nv",t_koreng:1}};
oAutoComplete=new nhn.AutoCompleteMobile("query","autocomplete_layer",htAcOption).attach({onBlur:function(){},onChangeInput:function(){},onFocus:function(){},actSubmit:function(){document.getElementById("sm").value="msv_sug";
this.elForm.submit()
},acShow:function(){},acHide:function(){}})
}catch(e){}}exeJs.push(autoComplete);
function selectChannel(channelBtn){var welPrevSelectedObj=jindo.$Element(jindo.$$.getSingle(".lnk_air_wrp2 .air_select a.on"));
welPrevSelectedObj?welPrevSelectedObj.removeClass("on"):"";
var welClickedObj=jindo.$Element(channelBtn);
welClickedObj.toggleClass("on","");
return false
}function viewTv(gameId){var viewVodAjax=jindo.$Ajax("/tv.nhn",{onload:function(res){var result=jindo.$Json(res.text());
var status=result.get("status");
var url=result.get("url");
if(status=="foreignip"){if(confirm("해외에서는 서비스를 이용할 수 없습니다. \n 도움말로 이동하시겠습니까?")){location.href="http://m.help.naver.com/serviceMain.nhn?falias=mo_sports_web&type=faq#faqDetail?faqId=27544&readType=1"
}else{return
}}else{if(status=="blocking"){alert("TV중계가 원활하지 않습니다.\n잠시 후 이용해 주세요.")
}else{if(status=="wwan"){alert("3G 환경 및 이용 장소의\n 네트워크 상태에 따라서 시청이 제한될 수 있습니다.")
}else{if(status=="notOnAir"){alert("Live 중계 준비 중입니다.")
}else{if(url==""){alert("Live 중계 준비 중입니다.")
}else{if(status!=""){if(confirm("Wi-Fi가 아닌 경우\n 데이터 과금에 주의하시고,\n 시청 중단 시 브라우저를 종료해 주세요")){if(url!=null&&url!=""){location.href=url
}}}else{alert("잠시 후 다시 시도해주십시오.")
}}}}}}},onerror:function(res){alert("잠시 후 다시 시도해주십시오.");
return
},ontimeout:function(res){alert("잠시 후 다시 시도해주십시오.");
return
}}).request({gameId:gameId})
}function view3gTv(gameId,quality,openType){var welSelectedBtn=jindo.$Element(jindo.$$.getSingle(".lnk_air_wrp2 .air_select a.on"));
var channelIndex=welSelectedBtn.attr("id");
var viewVodAjax=jindo.$Ajax("/tvByQuality.nhn",{onload:function(res){var result=jindo.$Json(res.text());
var status=result.get("status");
var url=result.get("url");
if(status=="foreignip"){if(confirm("해외에서는 서비스를 이용할 수 없습니다. \n 도움말로 이동하시겠습니까?")){location.href="http://m.help.naver.com/serviceMain.nhn?falias=mo_sports_web&type=faq#faqDetail?faqId=27544&readType=1"
}else{return
}}else{if(status=="blocking"){alert("TV중계가 원활하지 않습니다.\n잠시 후 이용해 주세요.")
}else{if(status=="notOnAir"){alert("Live 중계 준비 중입니다.")
}else{if(url==""){alert("Live 중계 준비 중입니다.")
}else{if(status!=""){if(confirm("Wi-Fi가 아닌 경우\n 데이터 과금에 주의하시고,\n 시청 중단 시 브라우저를 종료해 주세요")){if(openType=="app_a"){var strQuality="";
if(quality=="2M"){strQuality="HD화질"
}else{if(quality=="800"){strQuality="고화질"
}}if(confirm("고화질 이상은 네이버 미디어 플레이어로 재생되며, 해당 앱이 없으면 구글 플레이 스토어로 이동합니다.\n Wi-Fi가 아닌 경우 데이터 과금에 각별히 주의하세요")){if(url!=null&&url!=""){location.href=url
}}}else{if(openType=="app_i"){if(confirm("고화질 이상은 네이버 미디어 플레이어로 재생되며, 해당 앱이 없으면 애플 앱스토어로 이동합니다.\n Wi-Fi가 아닌 경우 데이터 과금에 각별히 주의하세요")){if(url!=null&&url!=""){var hidden,state,visibilityChange;
if(typeof document.hidden!=="undefined"){hidden="hidden";
visibilityChange="visibilitychange";
state="visibilityState"
}else{if(typeof document.mozHidden!=="undefined"){hidden="mozHidden";
visibilityChange="mozvisibilitychange";
state="mozVisibilityState"
}else{if(typeof document.msHidden!=="undefined"){hidden="msHidden";
visibilityChange="msvisibilitychange";
state="msVisibilityState"
}else{if(typeof document.webkitHidden!=="undefined"){hidden="webkitHidden";
visibilityChange="webkitvisibilitychange";
state="webkitVisibilityState"
}}}}var visible=document[state]=="visible";
document.addEventListener(visibilityChange,function(){visible=document[state]=="visible"
},false);
var a=+new Date;
try{var iFrame=document.createElement("iframe");
iFrame.style.display="none";
iFrame.src=url;
document.body.appendChild(iFrame)
}catch(c){window.location="https://itunes.apple.com/kr/app/neibeo-midieo-peulleieo-naver/id925205585?l=ko&ls=1&mt=8";
return
}setTimeout(function(){if(+new Date-a<1500&&visible){window.location="https://itunes.apple.com/kr/app/neibeo-midieo-peulleieo-naver/id925205585?l=ko&ls=1&mt=8";
return
}},1000)
}}}else{if(url!=null&&url!=""){location.href=url
}}}}}else{alert("잠시 후 다시 시도해주십시오.")
}}}}}},onerror:function(res){alert("잠시 후 다시 시도해주십시오.");
return
},ontimeout:function(res){alert("잠시 후 다시 시도해주십시오.");
return
}}).request({gameId:gameId,quality:quality,openType:openType,channelIndex:channelIndex})
}function goToAppleApp(url){var hidden,state,visibilityChange;
if(typeof document.hidden!=="undefined"){hidden="hidden";
visibilityChange="visibilitychange";
state="visibilityState"
}else{if(typeof document.mozHidden!=="undefined"){hidden="mozHidden";
visibilityChange="mozvisibilitychange";
state="mozVisibilityState"
}else{if(typeof document.msHidden!=="undefined"){hidden="msHidden";
visibilityChange="msvisibilitychange";
state="msVisibilityState"
}else{if(typeof document.webkitHidden!=="undefined"){hidden="webkitHidden";
visibilityChange="webkitvisibilitychange";
state="webkitVisibilityState"
}}}}var visible=document[state]=="visible";
document.addEventListener(visibilityChange,function(){visible=document[state]=="visible"
},false);
var a=+new Date;
try{var iFrame=document.createElement("iframe");
iFrame.style.display="none";
iFrame.id="naverMeidaPlayer";
iFrame.src=url;
document.body.appendChild(iFrame);
jindo.$(iFrameObj).load(function(){callback(window.naverMeidaPlayer.document.body.innerHTML);
document.body.removeChild(iFrame)
})
}catch(c){window.location="https://itunes.apple.com/kr/app/neibeo-midieo-peulleieo-naver/id925205585?l=ko&ls=1&mt=8";
return
}setTimeout(function(){if(+new Date-a<1500&&visible){window.location="https://itunes.apple.com/kr/app/neibeo-midieo-peulleieo-naver/id925205585?l=ko&ls=1&mt=8";
return
}},1000)
}function isIOS5(){var device=getDeviceInfo();
var deviceVersion=getDeviceInfo().version;
if((device.iphone)&&deviceVersion.substr(0,1)==5){return true
}return false
}var playId="";
var playCategory="kbo";
var flag_arr=new Array();
function play(id,category){if(category=="brazil2014"){location.href="/brazil2014/video/view.nhn?id="+id
}else{location.href="/video.nhn?id="+id
}}function viewVod(id,category){location.href="/video.nhn?id="+id
}function goVideo(id,type){location.href="/video.nhn?id="+id+"&type="+type
}function getPlayerTagType(){var tagType="aTag";
var deviceVersion=getDeviceInfo().version;
var isGalaxyTab=getGalaxyTab();
var jellybean=(deviceVersion.substr(0,1)>=4&&deviceVersion.substr(2,3)>=1);
if(getDeviceInfo().android&&deviceVersion.substr(0,1)<4&&isGalaxyTab==false||(getDeviceInfo().android&&getDeviceInfo().lgPhone&&jellybean==false)||(getDeviceInfo().android&&getDeviceInfo().chrome)){tagType="videoTag"
}if(getDeviceInfo().galaxyS4==true&&getDeviceInfo().samsungPhone==true){tagType="aTag"
}return tagType
}function isMobile(){var mobile=getDeviceInfo().mobile;
var isIpad=getDeviceInfo().ipad;
var isGalaxyTab=getGalaxyTab();
if(isIpad){mobile=true
}if(isGalaxyTab){mobile=true
}return mobile
}function videoTagPlay(id){var videoNode=document.getElementById("v_"+id);
videoNode.addEventListener("webkitendfullscreen",function(){if(videoNode.paused){}else{videoNode.pause()
}});
videoNode.addEventListener("webkitfullscreenchange",function(){if(document.webkitIsFullScreen!=true){if(videoNode.paused){}else{videoNode.pause()
}}});
if(videoNode.webkitSupportsFullscreen){videoNode.load();
videoNode.webkitEnterFullscreen();
videoNode.onloadedmetadata=videoNode.play()
}else{videoNode.load();
videoNode.play()
}}function checkVod(id,category){vodUrl="/vod.nhn";
jindo.$Ajax(vodUrl,{onload:function(res){var result=jindo.$Json(res.text())
},onerror:function(res){return
},ontimeout:function(res){return
}}).request({id:id,category:category})
}function playVod(id,category,inkey){vodUrl="/vod.nhn";
var isClearIntervalFlag=false;
var videoTagPlayFlag=false;
if(confirm("Wi-fi가 아닌 이동통신망에 접속된 상태에서 동영상 재생시 별도의 데이터 통화료가 부과될 수 있습니다")){var tagType=getPlayerTagType();
var videoArea=document.getElementById("videoTag");
if(tagType=="videoTag"&&videoArea!=null&&videoArea.innerHTML!=""){videoTagPlay(id)
}else{jindo.$Ajax(vodUrl,{onload:function(res){var result=jindo.$Json(res.text());
var url=result.get("url");
var status=result.get("status");
var mobile=isMobile();
if(status=="foreignip"){isClearIntervalFlag=true;
if(confirm("해외에서는 서비스를 이용할 수 없습니다. \n 도움말로 이동하시겠습니까?")){location.href="http://m.help.naver.com/serviceMain.nhn?falias=mo_sports_web&type=faq#faqDetail?faqId=27544&readType=1"
}else{return
}}else{if(status=="exfiredVod"){isClearIntervalFlag=true;
alert("해당 영상은 서비스 계약 기간이 만료되어, 재생할 수 없습니다.\n양해 부탁드립니다.")
}else{if(mobile==false){isClearIntervalFlag=true;
if(category=="london2012"){var m_result=confirm("해당 기기에서는 PC버전의 네이버 런던올림픽 서비스를 이용해 주세요");
if(m_result==true){location.href="http://sports.news.naver.com/london2012/index.nhn"
}}else{var m_result=confirm("해당 기기에서는 PC버전의 네이버스포츠 서비스를 이용하여 주세요");
if(m_result==true){location.href="http://sports.news.naver.com/videoCenter/index.nhn?id="+id
}}}else{if(url!=""){if(tagType=="videoTag"){if(category=="london2012"){viewVodByAndroid(id,url);
videoTagPlayFlag=true
}else{var videoArea=document.getElementById("videoTag");
var videoTag="<video src='"+url+"' poster='' width='1' height='1'  id='v_"+id+"' type='video/mp4'></video>";
videoArea.innerHTML=videoTag;
videoTagPlayFlag=true
}}else{location.href=url
}}else{isClearIntervalFlag=true;
alert("잠시 후 다시 시도해주십시오.")
}}}}},onerror:function(res){isClearIntervalFlag=true;
alert("잠시 후 다시 시도해주십시오.");
return
},ontimeout:function(res){isClearIntervalFlag=true;
alert("잠시 후 다시 시도해주십시오.");
return
}}).request({id:id,category:category,inkey:inkey});
if(tagType=="videoTag"){var timer=setInterval(function(){if(isClearIntervalFlag){clearInterval(timer)
}if(videoTagPlayFlag){clearInterval(timer);
videoTagPlay(id)
}},1000)
}}}}function viewVodByAndroid(id,url){var viewNode=document.getElementById("view_"+id);
var imageNode=viewNode.firstChild;
var imageTagName=imageNode.tagName;
var imageSrc="";
var imageWidth="";
var imageHeight="";
if(imageTagName=="IMG"){imageSrc=imageNode.src;
imageWidth=imageNode.width;
imageHeight=imageNode.height
}else{if(imageTagName=="VIDEO"){imageSrc=imageNode.poster;
imageWidth=imageNode.width;
imageHeight=imageNode.height
}}var videoTag="<video src='"+url+"' poster='"+imageSrc+"' width='"+imageWidth+"' height='"+imageHeight+"'  id='v_"+id+"' type='video/mp4'></video></div>";
viewNode.innerHTML=videoTag
}function getParam(url,var_name){url=url.split("?");
var parm=url[1];
var val="";
var tmpvalue="";
var i=0;
if(parm){parm=parm.split("&");
for(i=0;
i<parm.length;
i++){if(parm[i].indexOf(var_name+"=")>=0){if(parm[i].indexOf("#")>=0){parm[i]=parm[i].substr(0,parm[i].indexOf("#"))
}if(parm[i]){tmpvalue=parm[i].split("=")
}val=tmpvalue[1]
}}}return val
}function trim(str){return str.replace(/(^\s*)|(\s*$)/g,"")
}function gameCenterClose(){var url=getLocalStorage(gameCenterKey);
if(url==""||url==null){url="/index.nhn"
}location.href=url
}function cutString(sString,nMaxLength,sTail){var sSource=(typeof sString!="String")?sString.toString():sString;
var nLimit=parseInt(nMaxLength,10);
var sAdd=sTail||"";
return(sSource.length>nLimit)?sSource.substring(0,nLimit)+sAdd:sSource
}function closePage(defaultUrl){var url=document.referrer;
if(url==null){url=""
}if(isEmpty(defaultUrl)){defaultUrl="/index.nhn"
}url=url.trim();
if(url==""||url.indexOf("view.nhn")>=0){if(navigator.userAgent.indexOf("inapp")>-1){url="http://m.naver.com"
}else{url=defaultUrl
}}location.href=url
}function isEmpty(str){return(!str||0===str.length)
}setlnb();
function createLink(rel,size,href){var fileref=document.createElement("link");
fileref.setAttribute("rel",rel);
if(size!==""){fileref.setAttribute("sizes",size)
}fileref.setAttribute("href",href);
document.getElementsByTagName("head")[0].appendChild(fileref)
}function initFavicon(){var oOS=jindo.$Agent().os();
var sOsVer=oOS.version;
var sDummyParam="?v=20140401";
if(oOS.iphone||oOS.ipad||oOS.ios){createLink("apple-touch-icon-precomposed","57x57",FAVICON_URL+"ios/iOS6_57X57_iphone3.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","72x72",FAVICON_URL+"ios/iOS6_72X72_ipad.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","114x114",FAVICON_URL+"ios/iOS6_114X114_iphone4.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","76x76",FAVICON_URL+"ios/iOS7_76X76_ipad.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","144x144",FAVICON_URL+"ios/iOS6_144X144_ipad_retina.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","120x120",FAVICON_URL+"ios/iOS7_120X120_iphone.png"+sDummyParam);
createLink("apple-touch-icon-precomposed","152x152",FAVICON_URL+"ios/iOS7_152X152_ipad_retina.png"+sDummyParam)
}else{if(oOS.android){if(devicePixelRatio>2&&sOsVer>="4.1"){createLink("apple-touch-icon-precomposed","144x144",FAVICON_URL+"android/android_144x144_XXHDPI.png"+sDummyParam)
}else{createLink("apple-touch-icon-precomposed","96x96",FAVICON_URL+"android/android_96x96_XHDPI.png"+sDummyParam)
}}else{createLink("apple-touch-icon-precomposed","96x96",FAVICON_URL+"android/android_96x96_XHDPI.png"+sDummyParam)
}}createLink("shortcut icon","",FAVICON_URL+"favicon.ico"+sDummyParam)
}exeJs.push(initFavicon);
function onCreateFavicon(e){e.preventDefault();
var sOsVer=jindo.$Agent().os().version;
var sImgUrl="";
if(devicePixelRatio>2&&sOsVer>="4.1"){sImgUrl=encodeURIComponent(FAVICON_URL+"android/android_144x144_XXHDPI.png")
}else{sImgUrl=encodeURIComponent(FAVICON_URL+"android/android_96x96_XHDPI.png")
}var sTitle=encodeURIComponent("네이버 스포츠");
var sUrl=encodeURIComponent("http://m.sports.naver.com");
var sIntent="intent://addshortcut?url="+sUrl+"&icon="+sImgUrl+"&title="+sTitle+"&serviceCode=sports&version=7#Intent;scheme=naversearchapp;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.search;end";
location.href=sIntent
}function imageLazyLoading(){if(typeof jindo=="undefined"){if(typeof document.querySelectorAll=="undefined"){return
}else{var aImgList=document.querySelectorAll(".lazyLoadImage")
}}else{var aImgList=jindo.$$(".lazyLoadImage")
}var elImg;
var nImgListLength=aImgList.length;
if(nImgListLength<1){return
}var sDataSrc;
for(var i=0;
i<nImgListLength;
i++){elImg=aImgList[i];
sDataSrc=elImg.getAttribute("lazy-src");
if(sDataSrc){elImg.src=sDataSrc
}}}exeJs.push(imageLazyLoading);
function changeNumberFormat(vNumber){var sUnderNumber="";
var sNumberString=vNumber||0;
sNumberString=(typeof sNumberString!="String")?String(sNumberString):sNumberString;
if(sNumberString.indexOf(".")>-1){var aNumber=sNumberString.split(".");
sNumberString=aNumber[0];
sUnderNumber="."+aNumber[1]
}return sNumberString.replace(/(\d)(?=(\d{3})+$)/igm,"$1,")+sUnderNumber
}exeJs.push(lcs_do);
if(typeof nclk=="undefined"){nclk={}
}if(!g_pid){var g_pid=""
}if(!g_sid){var g_sid=""
}if(!ccsrv){var ccsrv="cc.naver.com"
}if(!nsc){var nsc="decide.me"
}nclk.vs="0.1.8";
nclk.md="cc";
nclk.pt=(window.location.protocol=="https:")?"https:":"http:";
nclk.ct=0;
nclk.ec=encodeURIComponent;
nclk.st=0;
if(window.g_ssc!=undefined&&window.g_query!=undefined){nclk.st=1
}else{nclk.st=0
}nclk.iss=(navigator.userAgent.toLowerCase().indexOf("safari")!=-1?true:false);
function nclk(d,k,h,b,c,j){var e,f,p;
var n=window.event;
if(!c){c=0
}if(!j){j=""
}e=nclk.m(d,c);
p=nclk.gl(k,h,b,"",0,nclk.st,j);
f=nclk.l(d,p);
if(e==1&&nclk.iss&&n.preventDefault){n.preventDefault();
nclk.sd(f,function(){nclk.go(d)
})
}else{nclk.sd(f)
}return true
}nclk.l=function(d,b){var a,e,c;
if(d&&d.href){e=d.tagName.toLowerCase();
c=d.href.toLowerCase();
if(c&&c.indexOf(nclk.pt+"//"+ccsrv)==0){a=d.href
}else{if(c&&c.indexOf(nclk.pt+"//"+ccsrv)!=0&&e&&e!="img"){a=b+"&u="+nclk.ec(d.href)
}}return a
}return b+"&u=about%3Ablank"
};
nclk.m=function(f,d){var a,g,e,c,b;
if(d==1){a=0
}else{if(f.href){g=f.tagName.toLowerCase();
e=f.href.toLowerCase();
c=f.target;
b=f.getAttribute("href",2);
if((c&&c!="_self"&&c!="_top"&&c!="_parent")||(e.indexOf("javascript:")!=-1)||(b&&b.charAt(0)=="#")||(e.indexOf("#")!=-1&&(e.substr(0,f.href.indexOf("#"))==document.URL))||g=="img"){a=0
}else{a=1
}}else{a=0
}}return a
};
nclk.sd=function(a,c){var d=0;
var g;
if(nclk.ct>0){var b=new Date().getTime();
a+="&nt="+b
}if(typeof c=="function"){d=1
}var e=new Image();
e.src=a;
e.onload=function(){if(g){clearTimeout(g)
}if(d){c()
}e.onload=null;
return
};
if(d){g=setTimeout(function(){c()
},5000)
}nclk.ct++
};
nclk.gl=function(d,f,k,e,b,h,j){if(b==undefined){b=1
}if(h==undefined){h=0
}var c=nclk.pt+"//"+ccsrv+"/"+nclk.md+"?a="+d+"&r="+k+"&i="+f+"&m="+b;
if(h==1){c+="&ssc="+g_ssc+"&q="+nclk.ec(g_query)+"&s="+g_sid+"&p="+g_pid
}else{c+="&nsc="+nsc
}if(j){c+="&g="+j
}if(e){c+="&u="+nclk.ec(e)
}return c
};
nclk.al=function(c,b){var a=window;
if(a.addEventListener){a.addEventListener(c,b,false)
}else{if(a.attachEvent){a.attachEvent("on"+c,b)
}}};
nclk.oo="";
nclk.of="";
if("onpageshow" in window){nclk.al("pageshow",function(){nclk.oo.onclick=nclk.of
})
}nclk.go=function(c){var b=c.onclick;
c.onclick="";
nclk.oo=c;
nclk.of=b;
if(document.createEvent){var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",false,true,window,0,0,0,0,0,false,false,false,false,0,null);
c.dispatchEvent(a)
}else{if(document.createEventObject){c.fireEvent("onclick")
}}c.onclick=b
};
function nclkR(b,d,f,c,e){window.location.href=nclk.gl(b,d,f,c,1,nclk.st,e)
}function nclkF(c,d,h,j,e){var b=nclk.gl(c,d,h,"about:blank",0,nclk.st,e);
nclk.sd(b,j)
}nhn=nhn||{};
nhn.AppLauncher=$Class({_htOS:$Agent().os(),_sInstallMessage:"앱을 설치하거나\n업데이트하시면\n이용할 수 있습니다.\n설치 하시겠습니까?",_nDelayForCheckingInstallation:1500,_nLimitForCheckingInstallation:2000,$init:function(htOption){this._bInstalled=htOption.bInstalled||false;
this._sInstallURLForIOS=htOption.sInstallURLForIOS||"";
this._sInstallURLForANDROID=htOption.sInstallURLForANDROID||"";
this._sAPPName=htOption.sAPPName||"";
if(!this._sInstallURLForIOS||!this._sInstallURLForANDROID){return
}if(this._sAPPName){this._sInstallMessage=this._sAPPName+this._sInstallMessage
}},_install:function(){var oDate=new Date(),self=this;
naverAppCheckTimer=setTimeout(function(){if(new Date()-oDate<self._nLimitForCheckingInstallation){if(confirm(self._sInstallMessage)){if(self._htOS.iphone||self._htOS.ipad){window.location.href=self._sInstallURLForIOS
}else{if(self._htOS.android){window.location.href=self._sInstallURLForANDROID
}}}}},this._nDelayForCheckingInstallation)
},_run:function(appURL){if(this._htOS.iphone||this._htOS.ipad){location.href=appURL
}else{if(this._htOS.android){var sRunAppId="__iframeForRunAppInAndroid__",elRunApp=$(sRunAppId),welRunApp;
if(!elRunApp){$Element('<div id="'+sRunAppId+'"></div>').prependTo(document.body);
elRunApp=$(sRunAppId)
}welRunApp=$Element(elRunApp);
welRunApp.html("<iframe src='"+appURL+"' height='0' width='0' frameborder='0'></iframe>");
setTimeout(function(){welRunApp.empty()
},1000)
}}},run:function(appURL){if(!this._bInstalled){this._install()
}this._run(appURL)
}});
var bOnLoad=false;
function lazyloadjs(file,callback){if(bOnLoad){_lazyloadjs(file,callback)
}else{if(window.addEventListener){window.addEventListener("load",function(){bOnLoad=true;
_lazyloadjs(file,callback)
},true)
}else{window.attachEvent("onload",function(){bOnLoad=true;
_lazyloadjs(file,callback)
})
}}}function _lazyloadjs(file,callback){var tag=document.createElement("script");
tag.type="text/javascript";
if(callback){tag.onload=callback
}tag.src=file;
document.getElementsByTagName("head")[0].appendChild(tag)
}sports=window.sports||{};
sports.m=window.sports.m||{};
sports.m.CloseButton={that:"",_naverUrl:"http://m.naver.com",_storageKey:"",_excludeUrl:"",_defaultUrl:"",_bindElementId:"",init:function(storageKey,excludeUrl,defaultUrl,bindElementId){that=this;
this._storageKey=storageKey;
this._excludeUrl=excludeUrl;
this._defaultUrl=defaultUrl;
this._bindElementId=bindElementId;
this._setStorage();
this._attachEvent()
},_attachEvent:function(){var el=document.getElementById(that._bindElementId);
if(!el){return false
}if(el.addEventListener){el.addEventListener("click",that._close,false)
}else{el.attachEvent("onclick",that._close)
}},_isEmpty:function(str){if(!str||0===str.length){return true
}return false
},_isExcludeUrl:function(testUrl,excludeUrl){var bExcludeUrl=false;
if(excludeUrl instanceof Array){for(var i in excludeUrl){if(testUrl.indexOf(excludeUrl[i])>-1){bExcludeUrl=true;
break
}}}else{if(testUrl.indexOf(excludeUrl)>-1){bExcludeUrl=true
}}return bExcludeUrl
},_setStorage:function(){if(!window.localStorage){return false
}var referrer=document.referrer;
if(that._isEmpty(referrer)){if(navigator.userAgent.toLowerCase().indexOf("inapp")>-1){referrer=this._naverUrl
}else{return false
}}if(that._isExcludeUrl(referrer,that._excludeUrl)){return false
}window.localStorage.setItem(that._storageKey,referrer)
},_close:function(e){e.preventDefault();
if(window.localStorage){var url=window.localStorage.getItem(that._storageKey);
if(!that._isEmpty(url)){location.href=url;
return false
}}if(navigator.userAgent.toLowerCase().indexOf("inapp")>-1){location.href=that._naverUrl;
return false
}location.href=that._defaultUrl;
return false
}};