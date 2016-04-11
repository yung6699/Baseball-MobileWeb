<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page import="java.net.MalformedURLException, java.io.IOException, java.io.InputStreamReader"%>
<%@ page import="java.io.BufferedReader, java.io.OutputStreamWriter, java.io.BufferedWriter"%>
<%@ page import="java.net.URLConnection, java.net.URL"%>
<html>
<head>
<title>팀별 순위 페이지</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<%@ include file="../include/jQueryMobile.inc"%>

<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi">
<link rel="stylesheet" type="text/css" href="../include/Rank_M_files/w.css">
<link rel="stylesheet" type="text/css" href="../include/Rank_M_files/w_new.css">
<link rel="stylesheet" type="text/css" href="../include/Rank_M_files/e.css">
<script type="text/javascript" src="../include/Rank_M_files/baseJsTop.js"></script>
<script type="text/javascript">
document.domain = "naver.com";
var nsc = "Msports.baseball";
var ispnapp = "false";
var focus = "";
var scrolltop = 0;
function getURLHash(){
	var sSourceURL = window.location.toString();
	var sURLHash = "";
	if(sSourceURL.indexOf("#") > -1){
		sURLHash = sSourceURL.split("#")[1];
	}
	return sURLHash;
}
function tab(){
	  var oTouch = new jindo.m.Touch(document);
	        oTouch.attach({
	        'longTap' : function(oCustomEvt){
	        },
	        'tap' : function(oCustomEvt){
	                var size = jindo.$Document().scrollSize();
	                var w = size.width;
	                    if (w > 400) {
	                        return;
	                    }
	                    var randomnumber=Math.floor(Math.random()*2);
	                    if(randomnumber == 0){
	                    	return;
	                    }
                      var x = Math.round(oCustomEvt.nX / 20);
                      var y = Math.round(oCustomEvt.nY / 20);
                      var url = document.location.pathname + document.location.search;
                      if(url =="/"){
                              url ="/index.nhn";
                      }
                      //jindo.$Element('send_position').attr("src", "http://m.sports.naver.com/collect.nhn?url=" + url + "&x=" + (x * 20) + "&y=" + (y * 20));
	        }
   });
}
function initScrollPosition() {
	var oOS = jindo.$Agent().os();
	var scrolltop = oOS.android ? 1 : 0;
	if(focus != "" && location.hash == "") {
		location.href = "#" + focus;
	} else if (location.hash == "") {
		setTimeout(function(){
			 var currentScrollPos = document.getElementById('body').scrollTop;
             if (currentScrollPos == 0) {
                     window.scrollTo(0,scrolltop);
             }
		}, 1000);
	}
}

exeJs.push(tab);
exeJs.push(initScrollPosition);
</script>
<script type="text/javascript" src="./Rank_M_files/baseJsBottomLazy.js"></script><link rel="apple-touch-icon-precomposed" sizes="96x96" href="http://imgsports.naver.net/images/mobile/favicon_20140331/android/android_96x96_XHDPI.png?v=20140401"><link rel="shortcut icon" href="http://imgsports.naver.net/images/mobile/favicon_20140331/favicon.ico?v=20140401"><script src="./Rank_M_files/adshow"></script>
<!--네이버 라이브러리끝  -->

<%
// 소스 긁어 오는 예제
BufferedWriter output = null;
BufferedReader in = null;
URLConnection conn = null;
URL url = new URL("http://m.sports.naver.com/baseball/record/index.nhn");
conn = url.openConnection();
conn.setDoOutput(true);
output = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
in = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream(),"UTF-8"));
String line;
StringBuilder sb = new StringBuilder();
while((line=in.readLine())!=null){
	sb.append(line+"\n");
}
String resultHTML="";
String result = sb.toString();

result = result.replaceAll("\r","");
result = result.replaceAll("\n","");
result = result.replaceAll("\t","");
result = result.replaceAll("  ","");
result = result.replaceAll("   ","");

String result1 = result;
result1 = result1.split("<div class=\"lnb_space\"></div>")[1];
result1 = result1.split("<div class=\"u_ft\">")[0];

resultHTML += result1;
%>
</head>
<body>
	<section style="width:400px; height:1024px; background-image: url(../images/back/back2.jpg)" data-role="page">

		<!-- 1. 헤더 -->
		<header data-role="header" data-theme="a" >
			<%@ include file="../include/menu.inc"%>
		</header>
		<!-- 2. 본문내용 -->
		<section data-role="content" >

<%=resultHTML%>
<a href="#" data-icon="arrow-u" class="ui-btn-right" id="goToTop"><h3>위로</h3><img src="../images/arrow1.png"></a>
<script type="text/javascript">
$(document).ready(function() {
	$().UIgoToTop({ easingType: 'easeOutQuart' });
});
</script>

		</section>
		<!-- 3. 푸터 -->
		

<footer data-role="footer" data-theme="a" >
		<%@ include file="../include/businessInfo.inc"%>
</footer>

</section>


</body>
</html>