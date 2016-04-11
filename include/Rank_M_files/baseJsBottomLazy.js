var fontSizeKey="naver.sports.news.fontsize";
var article_size=3;
var fontLayerControl="";
function viewNewsVideo(officeId,articleId){if(confirm("3G로 연결하여 동영상을 재생하면 별도의 데이터 통화료가 부과될 수 있습니다.")){location.href="http://m.news.naver.com/playVod.nhn?oid="+officeId+"&aid="+articleId
}}function click_article_font_resize(size){article_size=article_size+size;
article_font_resize(article_size);
if(size==1){fontLayerControl._setContentsBig(article_size)
}else{fontLayerControl._setContentsSmall(article_size)
}setLocalStorage(fontSizeKey,article_size)
}function article_font_resize(num){var big_html="<a href=\"javascript:click_article_font_resize(1);\" onClick=\"nclk(this, 'nwe.fontup', '', '');\" class=\"bigger_size\">가</a>";
var small_html="<a href=\"javascript:click_article_font_resize(-1);\" onClick=\"nclk(this, 'nwe.fontdown', '', '');\" class=\"smaller_size\">가</a>";
if(num>=5){big_html='<span class="bigger_size">가</span>'
}else{if(num<=1){small_html='<span class="smaller_size">가</span>'
}}if(document.getElementById("ct")&&document.getElementById("article_font_big")){document.getElementById("ct").className="fs"+num;
document.getElementById("article_font_big").innerHTML=big_html;
document.getElementById("article_font_small").innerHTML=small_html
}}function setDefaultFontSize(){var storage_size="";
if(window.localStorage){storage_size=window.localStorage.getItem(fontSizeKey)
}if(storage_size>0&&storage_size<=5){article_size=Number(storage_size)
}article_font_resize(article_size)
}var FontLayerControl=jindo.$Class({$init:function(){this._oFontTextBox=jindo.$Element("font_siz_text");
if(this._oFontTextBox){this._initVar();
this._initEffect()
}},_initVar:function(){this._de=document.documentElement;
this._be=document.body;
this._effectCount=0;
this._boxWidth=this._oFontTextBox.width();
this._boxHeight=this._oFontTextBox.height();
this._oFontTextBox.css("display","none")
},_initEffect:function(){this._oLayerEffectOut=new jindo.m.LayerEffect("font_siz_text");
this._oLayerEffectIn=new jindo.m.LayerEffect("font_siz_text").attach({beforeEffect:jindo.$Fn(function(we){this._effectCount++
},this).bind(),afterEffect:jindo.$Fn(function(we){setTimeout(jindo.$Fn(function(we){this._effectCount--;
if(this._effectCount==0){this._oLayerEffectOut.fade({sDirection:"out",nDuration:50})
}},this).bind(),300)
},this).bind()})
},_getScrollTop:function(){return document.all?(!this._de.scrollTop?this._be.scrollTop:this._de.scrollTop):(window.pageYOffset?window.pageYOffset:window.scrollY)
},_setContentsSmall:function(num){var msg=num==1?" 가장 작은 글자 크기 입니다. ":" 글자 크기가 작아졌습니다. ";
this._createEffect(msg)
},_setContentsBig:function(num){var msg=num==5?" 가장 큰 글자 크기 입니다. ":" 글자 크기가 커졌습니다. ";
this._createEffect(msg)
},_createEffect:function(msg){this._oFontTextBox.html(msg);
this._oFontTextBox.css("position","absolute");
this._oFontTextBox.css("z-index",1000);
this._oFontTextBox.css("top",this._getScrollTop()+window.innerHeight-this._boxHeight-20);
this._oFontTextBox.css("left",(window.innerWidth-this._boxWidth)*0.5);
this._oLayerEffectIn.fade({sDirection:"in",nDuration:50})
}});
function initFontLayerControl(){fontLayerControl=new FontLayerControl()
}function viewSportsNewsVideo(){var sportsNewsVideo=jindo.$$("div.sportsNewsVideo");
var videoLen=sportsNewsVideo.length;
if(videoLen>0){jindo.LazyLoading.load("http://serviceapi.rmcnmv.naver.com/resources/js/rmcplayer3_launcher_20131018.js?20141027",function(){for(var i=0;
i<videoLen;
i++){var el=jindo.$Element(sportsNewsVideo[i]);
el.html('<div class="nw_im_n"><img width=100% onload="checkVisible();" src=\'http://dthumb.phinf.naver.net/?src='+el.attr("imgUrl")+"&twidth=280&theight=65500&opts=18&qlt=80'></div>")
}visibleNewsVideo()
})
}}var visible=null;
function checkVisible(){visible.check(100)
}function visibleNewsVideo(){visible=new jindo.m.Visible(document,{sClassName:"sportsNewsVideo",nExpandSize:150});
jindo.$Fn(function(){visible.check(100)
}).attach(window,"scroll").attach(window,"resize");
visible.attach({visible:function(oCustomEvent){var el=jindo.$Element(oCustomEvent.elTarget);
if(!el.hasClass("visible")){var videoId=el.attr("videoId")||el.attr("videoid");
if(videoId){var url="/ajax/video.nhn";
var countAjax=jindo.$Ajax(url,{onload:function(res){var result=res.text();
el.html(result);
eval.call(window,jindo.$Element("video_"+videoId).html())
}}).request({id:videoId});
jindo.$Element(oCustomEvent.elTarget).addClass("visible")
}}}});
visible.check(100)
}function viewArticleVideo(){var layout={_width:null,setLayoutSize:function(){var di=jindo.m.getDeviceInfo();
if(di.android){this._width=window.innerWidth-20
}else{var body=jindo.$Element("<body>");
this._width=body.width()-20
}}};
layout.setLayoutSize();
var css=jindo.$$;
var el=jindo.$Element;
var articleVideo=jindo.$$("#articleContent>iframe,embed,object,IFRAME,EMBED,OBJECT");
var di=jindo.m.getDeviceInfo();
var bMobile=di.iphone||di.android||di.win;
if(articleVideo.length>0){layout.setLayoutSize();
jindo.$A(articleVideo).forEach(function(value,index){var element=el(value);
var width=element.attr("width");
if(layout._width!=null&&layout._width<width){element.attr("width",layout._width)
}if(bMobile){element.attr("height",layout._width/2)
}})
}}function changeNumberFormat(vNumber){var sUnderNumber="";
var sNumberString=vNumber||0;
sNumberString=(typeof sNumberString!="String")?String(sNumberString):sNumberString;
if(sNumberString.indexOf(".")>-1){var aNumber=sNumberString.split(".");
sNumberString=aNumber[0];
sUnderNumber="."+aNumber[1]
}return sNumberString.replace(/(\d)(?=(\d{3})+$)/igm,"$1,")+sUnderNumber
}function viewSocialCommentCount(){try{if(typeof gno=="undefined"||gno==null||gno==""){if(jindo.$Element("spt_commentCount")){jindo.$Element("spt_commentCount").hide()
}}var url="/api/comment/count.json";
var countAjax=jindo.$Ajax(url,{onload:function(res){var result=res.json();
if(typeof result.message.result.count=="undefined"){jindo.$Element("spt_commentCount").hide()
}else{jindo.$Element("spt_commentCount").html(changeNumberFormat(result.message.result.count))
}}}).request({gno:gno})
}catch(e){}}setTimeout(viewSocialCommentCount,0);
exeJs.push(initFontLayerControl);
exeJs.push(setDefaultFontSize);
exeJs.push(viewSportsNewsVideo);
exeJs.push(viewArticleVideo);
nhn.Component=jindo.$Class({_eventHandlers:null,_options:null,$init:function(){var aInstance=this.constructor.getInstance();
if(typeof aInstance=="undefined"){this.constructor._aInstance=aInstance=[]
}aInstance[aInstance.length]=this;
this._eventHandlers={};
this._options={};
this._options._setters={}
},option:function(sName,sValue){var sNameType=(typeof sName);
if(sNameType=="undefined"){return this._options
}else{if(sNameType=="string"){if(typeof sValue!="undefined"){this._options[sName]=sValue;
if(typeof this._options._setters[sName]=="function"){this._options._setters[sName](sValue)
}return this
}else{return this._options[sName]
}}else{if(sNameType=="object"){try{for(var x in sName){this._options[x]=sName[x];
if(typeof this._options._setters[x]=="function"){this._options._setters[x](sName[x])
}}}catch(e){}return this
}}}},optionSetter:function(sName,fSetter){var sNameType=(typeof sName);
if(sNameType=="undefined"){return this._options._setters
}else{if(sNameType=="string"){if(typeof fSetter!="undefined"){this._options._setters[sName]=jindo.$Fn(fSetter,this).bind();
return this
}else{return this._options._setters[sName]
}}else{if(sNameType=="object"){try{for(var x in sName){this._options._setters[x]=jindo.$Fn(sName[x],this).bind()
}}catch(e){}return this
}}}},fireEvent:function(sEvent,oEvent){var oEvent=oEvent?(oEvent instanceof jindo.$Event?oEvent._event:oEvent):{};
var inlineHandler=this["on"+sEvent];
var handlerList=this._eventHandlers[sEvent];
var bHasInlineHandler=typeof inlineHandler=="function";
var bHasHandlerList=typeof handlerList!="undefined";
if(!bHasInlineHandler&&!bHasHandlerList){return true
}handlerList=handlerList.concat();
var bIsRealEvent=(function(oEvent){try{if(oEvent instanceof Event){return true
}}catch(x){}try{if(oEvent instanceof MouseEvent){return true
}}catch(x){}try{if(oEvent instanceof KeyEvent){return true
}}catch(x){}try{if(("cancelBubble" in oEvent||"preventBubble" in oEvent)&&"type" in oEvent){return true
}}catch(x){}return false
})(oEvent);
if(!bIsRealEvent){try{if(typeof oEvent._extends=="undefined"){oEvent._extends=[];
oEvent.stop=function(){if(oEvent._extends.length>0){oEvent._extends[oEvent._extends.length-1].bCanceled=true
}}
}oEvent._extends.push({sType:sEvent,bCanceled:false});
oEvent.sType=sEvent
}catch(e){bIsRealEvent=true
}}if(bIsRealEvent){oEvent=jindo.$Event(oEvent)
}var aArg=[oEvent];
for(var i=2,nLen=arguments.length;
i<nLen;
i++){aArg.push(arguments[i])
}if(bHasInlineHandler){inlineHandler.apply(this,aArg)
}if(bHasHandlerList){for(var i=0,handler;
handler=handlerList[i];
i++){handler.apply(this,aArg)
}}if(bIsRealEvent){return !oEvent.bCanceled
}var oPopedEvent=oEvent._extends.pop();
return !oPopedEvent.bCanceled
},attach:function(sEvent,fHandler){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.attach(sEvent,fHandler)
},this).bind());
return this
}var handlers=this._eventHandlers[sEvent];
if(typeof handlers=="undefined"){handlers=this._eventHandlers[sEvent]=[]
}handlers.push(fHandler);
return this
},detach:function(sEvent,fHandler){if(arguments.length==1){jindo.$H(arguments[0]).forEach(jindo.$Fn(function(fHandler,sEvent){this.detach(sEvent,fHandler)
},this).bind());
return this
}var handlers=this._eventHandlers[sEvent];
if(typeof handlers=="undefined"){return this
}for(var i=0,handler;
handler=handlers[i];
i++){if(handler===fHandler){handlers=handlers.splice(i,1);
break
}}return this
},detachAll:function(sEvent){var handlers=this._eventHandlers;
if(arguments.length){if(typeof handlers[sEvent]=="undefined"){return this
}delete handlers[sEvent];
return this
}for(var o in handlers){delete handlers[o]
}return this
}});
nhn.Component.factory=function(aObject,oOption){var aReturn=[];
if(typeof oOption=="undefined"){oOption={}
}for(var i=0,nLen=aObject.length;
i<nLen;
i++){try{oInstance=new this(aObject[i],oOption);
aReturn[aReturn.length]=oInstance
}catch(e){}}return aReturn
};
nhn.Component.getInstance=function(){return this._aInstance
};
nhn.Timer=jindo.$Class({_timer:null,_lastest:null,_remained:0,_delay:null,_callback:null,$init:function(){},start:function(fpCallback,nDelay){var self=this;
this.abort();
this.fireEvent("wait");
this._lastest=new Date().getTime();
this._remained=0;
this._delay=nDelay;
this._callback=fpCallback;
this.resume();
return true
},_clearTimer:function(){var bFlag=false;
if(this._timer){clearInterval(this._timer);
bFlag=true
}this._timer=null;
return bFlag
},abort:function(){var bRet;
if(bRet=this._clearTimer()){this.fireEvent("abort")
}return bRet
},pause:function(){var nPassed=new Date().getTime()-this._lastest;
this._remained=this._delay-nPassed;
if(this._remained<0){this._remained=0
}return this._clearTimer()
},resume:function(){var self=this;
if(!this._callback){return false
}var fpGo=function(nDelay,bRecursive){self._clearTimer();
self._timer=setInterval(function(){if(!self._timer){return
}self.fireEvent("run");
var r=self._callback();
self._lastest=new Date().getTime();
if(!r){clearInterval(self._timer);
self._timer=null;
self.fireEvent("end");
return
}self.fireEvent("wait");
if(bRecursive){fpGo(self._delay,false)
}},nDelay)
};
if(this._remained){fpGo(this._remained,true);
this._remained=0
}else{fpGo(this._delay,false)
}return true
}}).extend(nhn.Component);
nhn.WatchInput=jindo.$Class({_bIsActivating:false,_bTimerRunning:false,_bEventAttached:false,_sPrevValue:"",$init:function(sInputId,oOption){var oDefaultOption={interval:100,useTimerOnIE:false,keyEvent:"keyup",activateOnload:true};
this.option(oDefaultOption);
this.option(oOption||{});
this._elInput=jindo.$(sInputId);
this._oTimer=new nhn.Timer();
this._bIE=jindo.$Agent().navigator().ie;
this._bAndroid=/Android/.test(navigator.userAgent);
if(this.option("useTimerOnIE")){this._bIE=false
}this._wfFocus=jindo.$Fn(this._onFocus,this);
this._wfBlur=jindo.$Fn(this._onBlur,this);
this._wfKeyEvent=jindo.$Fn(this._onKeyEvent,this);
if(this.option("activateOnload")){this.activate(true)
}},getInput:function(){return this._elInput
},setInputValue:function(s){this.getInput().value=s;
this.setCompareValue(s)
},getCompareValue:function(){return this._sPrevValue
},setCompareValue:function(s){this._sPrevValue=s
},start:function(bWithoutFocus){this.activate(bWithoutFocus||false)
},stop:function(){this.deactivate()
},isActivating:function(){return this._bIsActivating
},activate:function(bWithoutFocus){if(this.isActivating()){return
}var elInput=this.getInput();
var bWithoutFocus=bWithoutFocus||false;
if(this._bIE){this._wfKeyEvent.attach(elInput,this.option("keyEvent"))
}else{if(this._isTimerRunning()){return
}this._wfFocus.attach(elInput,"focus");
this._wfBlur.attach(elInput,"blur");
if(bWithoutFocus){this._onFocus()
}}this._bIsActivating=true;
this.fireEvent("start");
return this
},deactivate:function(){if(!this.isActivating()){return
}var elInput=this.getInput();
if(this._bIE){this._wfKeyEvent.detach(elInput,this.option("keyEvent"))
}else{if(this._isTimerRunning()){this._stopTimer()
}this._wfFocus.detach(elInput,"focus");
this._wfBlur.detach(elInput,"blur")
}this._bIsActivating=false;
this.fireEvent("stop");
return this
},getInterval:function(){return this.option("interval")
},setInterval:function(n){this.option("interval",n)
},_isTimerRunning:function(){return this._bTimerRunning
},_stopTimer:function(){var self=this;
return setTimeout(function(){self._oTimer.abort();
self._bTimerRunning=false;
self.fireEvent("timerStop")
},this.getInterval())
},_onKeyEvent:function(e){this._compare()
},_onFocus:function(){if(this._isTimerRunning()){clearTimeout(this._nTimerStopCall);
this._nTimerStopCall=null;
return
}this._bTimerRunning=true;
this.fireEvent("timerStart");
this._compare();
var self=this;
this._oTimer.start(function(){self._compare();
return true
},this.getInterval())
},_onBlur:function(){var self=this;
this._nTimerStopCall=this._stopTimer();
self.fireEvent("onBlur")
},_compare:function(){var sValue=this.getInput().value;
if(sValue!=this.getCompareValue()){this.fireEvent("change",{text:sValue});
this.setCompareValue(sValue)
}}}).extend(nhn.Component);
nhn.AutoCompleteMobile=jindo.$Class({_aData:null,_welInput:null,_welSuggestLayer:null,_welList:null,_welClearBtn:null,_welCloseBtn:null,_oWatcher:null,_nTotalListCnt:0,_oRequest:null,_rxQueryFormatter:null,_htCache:{},_welSelected:null,_sQuery:false,_sListTemplate:"",_bCheckTemplate:false,_bInitLoad:true,_htDefaultOption:{sRequestMethod:"get",sEmTagName:"em",sListTagName:"ul",nMaxListCount:5,nCutstr:0},$init:function(sInputId,sSuggestLayerId,htOption){this.option(this._htDefaultOption);
this.option(htOption);
this.elForm=document.forms[this._options.sFormName];
this._welInput=jindo.$Element(sInputId).attr("autocomplete","off");
this._welSuggestLayer=jindo.$Element(sSuggestLayerId);
this._welClearBtn=jindo.$Element(this.option("sClearBtn"));
this._welCloseBtn=jindo.$Element(this.option("sCloseBtn"));
this._htEvent=[];
this._htEvent._focus={el:this._welInput.$value(),ref:jindo.$Fn(this.onFocus,this).attach(this._welInput.$value(),"focus")};
this._htEvent.doument_click={el:document,ref:jindo.$Fn(this._clickDisplay,this).attach(document,"click")};
this._htEvent.button_click={el:this._welCloseBtn.$value(),ref:jindo.$Fn(this._setHide,this).attach(this._welCloseBtn.$value(),"click")};
if(this._welClearBtn){var sClickEvent=($Agent().navigator().mobile)?"touchstart":"mousedown";
this._htEvent["clear_"+sClickEvent]={el:this._welClearBtn.$value(),ref:jindo.$Fn(this._clearInputValue,this).attach(this._welClearBtn.$value(),sClickEvent)}
}this._setQueryFomatter(this.option("sQueryFormat"));
this._oWatcher=new nhn.WatchInput(sInputId,{activateOnload:false});
this._oWatcher.attach({change:jindo.$Fn(this.onChangeInput,this).bind(),onBlur:jindo.$Fn(this.fireEvent,this).bind("onBlur")});
this._oWatcher.start();
this._aData=[]
},_setQueryFomatter:function(sQueryVar){if(typeof sQueryVar=="undefined"){return this.option("sQueryFormat")
}this.option("sQueryFormat",sQueryVar);
this._rxQueryFormatter=new RegExp(sQueryVar.replace(/([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\])/g,"\\$1"),"g")
},_clickDisplay:function(oEvent){var elEvent=oEvent.element;
var elEventObject=jindo.$Element(elEvent);
if(!elEventObject){this.hide();
this.fireEvent("onBlur");
return false
}if((elEventObject.attr("id")==this._welInput.attr("id"))&&(this._welInput.$value().value&&!this._bInitLoad)){if(this._welSuggestLayer.visible()){this.hide()
}else{this.onChangeInput()
}}else{if(!this._welSuggestLayer.isParentOf(elEvent)){this.hide();
this.fireEvent("onBlur")
}}},_getData:function(sInputValue){this._sQuery="";
this._aData=[];
var self=this;
this._remoteQuery(sInputValue,function(htData){self._onDataLoad(htData)
})
},_remoteQuery:function(sKeyword,fCallback){function cutStr(sText,nCutStr){return(nCutStr>0&&sText.length>nCutStr)?sText.substring(0,nCutStr)+"...":sText
}var sCheckKeyword=sKeyword.replace(/\s/g,"");
if(!sCheckKeyword){return fCallback([])
}if(typeof this._htCache[sKeyword]!="undefined"){if(sKeyword.toLowerCase()==this._htCache[sKeyword].sQuery){this._sQuery=this._htCache[sKeyword].sQuery;
this._aData=this._htCache[sKeyword].data;
return fCallback(this._aData)
}}try{this._oRequest&&this._oRequest.abort();
this._oRequest=null
}catch(e){}var htOption=this.option();
var hData=jindo.$H(htOption.htRequestFormat);
hData.map(function(v,k,o){if(typeof v=="string"){o[k]=v.replace(this._rxQueryFormatter,sKeyword)
}else{return v
}},this);
var oThis=this;
var sUrl=htOption.sUrl;
var sRequestType=htOption.sRequestType;
var sRequestMethod=htOption.sRequestMethod;
var nCutStr=htOption.nCutstr;
this._oRequest=jindo.$Ajax(sUrl,{jsonp_charset:"UTF-8",type:sRequestType,method:sRequestMethod,onload:function(htReq){try{var htJson=htReq.json();
var aItems=htJson.items;
var sQuery=(htJson.query.length>0)?((htJson.query.length>1)?htJson.query[1]:htJson.query[0]):"";
oThis._sQuery=sQuery;
for(var i=0;
i<aItems.length;
i++){jindo.$A(aItems[i]).forEach(function(aItem){var sInTxt=oThis._trim(aItem[0]);
oThis._aData[oThis._aData.length]={name:cutStr(sInTxt,nCutStr),in_txt:sInTxt,_in_query:((sInTxt.indexOf(sKeyword)>-1)?sKeyword:false)}
})
}if(sQuery&&(sKeyword.toLowerCase()==sQuery)){oThis._htCache[sKeyword]={sQuery:oThis._sQuery,data:oThis._aData}
}fCallback(oThis._aData)
}catch(e){}}}).request(hData.$value())
},_onDataLoad:function(aData){this._aData=aData;
this.paint()
},_checkTemplate:function(){var elList=jindo.$$.getSingle(this.option("sListTagName"),this._welSuggestLayer.$value());
this._welList=elList?jindo.$Element(elList):null;
if(this._welList&&!this._bCheckTemplate){this._sListTemplate=this._welList.html();
this._bCheckTemplate=true
}},_getListHtml:function(sTpl,htData){var htTmpData={};
for(var x in htData){htTmpData[x]=htData[x];
if(x=="name"){sQuery=(htData._in_query)?htData._in_query:this._sQuery;
htTmpData.name=this._highlight(htData.name,sQuery)
}if(x=="email"){var sEmTag="<"+this.option("sEmTagName")+">";
htTmpData.email=(htTmpData.name.indexOf(sEmTag))?this._highlight(htData.email,this._sQuery):htData.email
}if(!htData.propertyIsEnumerable(x)){continue
}sTpl=sTpl.replace(new RegExp("@"+x+"@","g"),htTmpData[x])
}htTmpData=null;
return sTpl
},onChangeInput:function(){if(!this._welInput){return
}var sInputValue=this._welInput.$value().value;
this._getData(sInputValue);
(this._welClearBtn&&sInputValue)?this._welClearBtn.show():this._welClearBtn.hide();
this.fireEvent("onChangeInput")
},_highlight:function(sText,sQuery){var sReturn=this._makeBoldEffect(sText,sQuery);
return(sReturn=="")?this._replaceSpecialChar(sText):sReturn
},_makeBoldEffect:function(sText,sQuery){var escRegExp=new RegExp("[.*+?|()\\[\\]{}\\\\]","g");
var sTmp=this._trim(sQuery.replace(/()/g," "));
var sTmpCharacters=sTmp.match(/\S/g);
var aTmp=[];
for(var i=0,cnt=sTmpCharacters.length;
i<cnt;
i++){aTmp.push(sTmpCharacters[i].replace(/[\S]+/g,"["+sTmpCharacters[i].toLowerCase().replace(escRegExp,"\\$&")+"|"+sTmpCharacters[i].toUpperCase().replace(escRegExp,"\\$&")+"] ").replace(/[\s]+/g,"[\\s]*"))
}sTmp="("+aTmp.join("")+")";
var sReturn="";
var regQuery=new RegExp(sTmp);
if(regQuery.test(sText)){sReturn=sText.replace(regQuery,"<"+this.option("sEmTagName")+">"+RegExp.$1+"</"+this.option("sEmTagName")+">")
}return sReturn
},_replaceSpecialChar:function(sText){return sText.replace(/(<)/ig,"&lt;").replace(/(>)/ig,"&gt;")
},_setInputValue:function(sValue){var elInputValue=this._welInput.$value();
elInputValue.value=sValue||"";
elInputValue.focus()
},_trim:function(sText){return sText.replace(/^\s+|\s+$/g,"")
},onFocus:function(){if(!this._bCheckTemplate){this._checkTemplate()
}this.fireEvent("onFocus")
},_setHide:function(oEvent){var sInputValue=this._welInput.$value().value;
this._setInputValue(sInputValue);
this.hide();
oEvent.stop()
},_clearInputValue:function(oEvent){this._welClearBtn.hide();
this.hide();
this._setInputValue();
oEvent.stop();
return false
},setValue:function(ele){this._aData=[];
var sValue=$$.getSingle(">input",ele);
sValue=jindo.$Element(sValue).$value().value;
this._welInput.$value().value=sValue;
this.fireEvent("actSubmit")
},show:function(){this._welSuggestLayer.show();
this.fireEvent("acShow")
},hide:function(){this._aData=[];
this._bInitLoad=false;
this._welSuggestLayer.hide();
this.fireEvent("acHide")
},paint:function(){var sValue=this._welInput.$value().value;
if(!sValue||sValue==""){this.hide();
return false
}if(!this._welList){this._checkTemplate()
}if(!this._welList){return false
}var aListHtml=[];
var nListCount=this._getNumberOfData();
this._nTotalListCnt=nListCount;
if(nListCount>0){for(var i=0;
i<nListCount;
i++){aListHtml[aListHtml.length]=this._getListHtml(this._sListTemplate,this._aData[i])
}this._welList.html(aListHtml.join(""));
this.show()
}else{this._welList.html("");
this.hide()
}return this
},_getNumberOfData:function(){var nMaxListCount=this.option("nMaxListCount");
return(this._aData.length>nMaxListCount)?nMaxListCount:this._aData.length
},setListTemplate:function(sTemplate){this._sListTemplate=sTemplate;
this._bCheckTemplate=true
},destroy:function(){this._oWatcher.stop();
for(p in this._htEvent){var ht=this._htEvent[p];
ht.ref.detach(ht.el,p.substring(p.lastIndexOf("_")+1))
}this._oWatcher=null;
this.elForm=null;
this._welInput=null;
this._welSuggestLayer=null;
this._welClearBtn=null;
this._welCloseBtn=null;
this._aData=null;
this._nTotalListCnt=null;
this._oRequest=null;
this._rxQueryFormatter=null;
this._htCache=null;
this._welSelected=null;
this._sQuery=null;
this._sListTemplate=null
}}).extend(nhn.Component);
var oAutoComplete=null;
function autoComplete(){try{jindo.$("hidden_input").value="@in_txt@";
var htAcOption={sUrl:"http://mac.search.naver.com/mobile/ac",sFormName:"search",nCutstr:30,nMaxListCount:5,sClearBtn:"clear_input",sCloseBtn:"close_input",sQueryFormat:"{query}",sRequestType:"jsonp",htRequestFormat:{q:"{query}",st:"1",frm:"mobile_nv",t_koreng:1}};
oAutoComplete=new nhn.AutoCompleteMobile("query","autocomplete_layer",htAcOption).attach({onBlur:function(){},onChangeInput:function(){},onFocus:function(){},actSubmit:function(){document.getElementById("sm").value="msv_sug";
this.elForm.submit()
},acShow:function(){},acHide:function(){}})
}catch(e){}}exeJs.push(autoComplete);
function exeScript(){if(exeJs!=null){for(var i in exeJs){if(typeof exeJs[i]=="function"){try{exeJs[i]()
}catch(e){setTimeout(exeJs[i],500)
}}}}}exeScript();