<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page import="java.net.MalformedURLException, java.io.IOException, java.io.InputStreamReader"%>
<%@ page import="java.io.BufferedReader, java.io.OutputStreamWriter, java.io.BufferedWriter"%>
<%@ page import="java.net.URLConnection, java.net.URL"%>
<html>
<head>
<title>스케줄</title>

<meta name="viewport" content="width=device-width, initial-scale=1">

<%@ include file="../include/jQueryMobile.inc"%>

<!--네이버 복사 붙여 넣기 할곳 시작 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi">

<!-- css --> 
<link rel="stylesheet" type="text/css" href="../include/naver_M_files/w.css">
<link rel="stylesheet" type="text/css" href="../include/naver_M_files/w_new.css">
<link rel="stylesheet" type="text/css" href="../include/naver_M_files/e.css">
<!-- //css -->
<script type="text/javascript" src="../include/naver_M_files/baseJsTop.js"></script>


<!--네이버 라이브러리끝  -->

<%
// 소스 긁어 오는 예제
BufferedWriter output = null;
BufferedReader in = null;
URLConnection conn = null;
URL url = new URL("http://m.sports.naver.com/baseball/schedule/index.nhn?category=kbo");
conn = url.openConnection();
conn.setDoOutput(true);
output = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
in = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream(),"UTF-8"));
String line;
StringBuilder sb = new StringBuilder();
while((line=in.readLine())!=null){
	sb.append(line+"\n");
}
String resultHTML=null;
String result = sb.toString();

result = result.replaceAll("\r","");
result = result.replaceAll("\n","");
result = result.replaceAll("\t","");
result = result.replaceAll("  ","");
result = result.replaceAll("   ","");

String result1 = result;
String result2 = result;
result1 = result1.split("<div class=\"lnb_space\"></div>")[1];
result1 = result1.split("<div class=\"u_ft\">")[0];


resultHTML = result1;
%>

</head>
<body>
	<section style="width:400px; height:1024px; background-image:  url(../images/back/back1.jpg)" data-role="page">

		<!-- 1. 헤더 -->
		<header data-role="header" data-theme="a">
			<%@ include file="../include/menu.inc"%>
		</header>

		
		<!-- 2. 본문내용 -->
		<section data-role="content" >
			<div style="background:#FFFFFF; width:100%;"><div class="lnb_sub"><%=resultHTML%><div>
		</section>
		<!-- 3. 푸터 -->
		
		
<footer data-role="footer" data-theme="a"  data-position="fixed">
				<%@ include file="../include/businessInfo.inc"%>
			</footer>
		
	</section>
</body>
</html>
