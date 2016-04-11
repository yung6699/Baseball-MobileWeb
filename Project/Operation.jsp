<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page import="java.net.MalformedURLException, java.io.IOException, java.io.InputStreamReader"%>
<%@ page import="java.io.BufferedReader, java.io.OutputStreamWriter, java.io.BufferedWriter"%>
<%@ page import="java.net.URLConnection, java.net.URL"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>한국 야구 경기 체계</title>
<link href="http://image.koreabaseball.com/mobile/css/common.css" type="text/css" rel="stylesheet" />
<link href="http://image.koreabaseball.com/mobile/css/about.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="http://image.koreabaseball.com/mobile/js/common.js"></script>

<%@ include file="../include/jQueryMobile.inc"%>
<%@ page import="java.sql.*"%>
<%
// 소스 긁어 오는 예제
BufferedWriter output1 = null;
BufferedReader in1 = null;
URLConnection conn1 = null;
URL url1 = new URL("http://m.ikbo.net/About/Operating.aspx");

conn1 = url1.openConnection();
conn1.setDoOutput(true);
output1 = new BufferedWriter(new OutputStreamWriter(conn1.getOutputStream()));
in1 = new BufferedReader(new InputStreamReader(url1.openConnection().getInputStream(),"UTF-8"));
String line1;
StringBuilder sb1 = new StringBuilder();
while((line1=in1.readLine())!=null){
	sb1.append(line1+"\n");	
}
String resultHTML1="";		
String result = sb1.toString();  

result = result.replaceAll("\r",""); 
result = result.replaceAll("\n","");
result = result.replaceAll("\t","");
result = result.replaceAll("  ","");
result = result.replaceAll("   ","");
String result1="<div id=\"mContents\">";
String result2=result;
result2 = result2.split("<!-- //gnbTab -->")[1]; 
result2 = result2.split("<hr /><div id=\"footer\">")[0];

resultHTML1 += result1;
resultHTML1 += result2;


//2번째 파싱
BufferedWriter output2 = null;
BufferedReader in2 = null;
URLConnection conn2 = null;
URL url2 = new URL("http://m.ikbo.net/About/ChangeInfo.aspx");

conn2 = url2.openConnection();
conn2.setDoOutput(true);
output2 = new BufferedWriter(new OutputStreamWriter(conn2.getOutputStream()));
in2 = new BufferedReader(new InputStreamReader(url2.openConnection().getInputStream(),"UTF-8"));
String line2;
StringBuilder sb2 = new StringBuilder();
while((line2=in2.readLine())!=null){
	sb2.append(line2+"\n");	
}
result = sb2.toString();
String resultHTML2="";		

result = result.replaceAll("\r",""); 
result = result.replaceAll("\n","");
result = result.replaceAll("\t","");
result = result.replaceAll("  ","");
result = result.replaceAll("   ","");
String result3="<div id=\"mContents\">";
String result4=result;

result4 = result4.split("<!-- //gnbTab -->")[1]; 
result4 = result4.split("<hr /><div id=\"footer\">")[0];

resultHTML2 += result3;
resultHTML2 += result4;

%>

</head>
<body>

	<section style="width:400px; height:1024px; background-image: url(../images/back/back5.jpg)" data-role="page">

		<!-- 1. 헤더 -->
		<header data-role="header" data-theme="a">
			<%@ include file="../include/menu.inc"%>
		</header>


		<!-- 2. 팀 정보 목록 -->
		<section data-role="content">
			<ul data-role="listview" data-inset="true" data-theme="a">
				<li>
					경기 운영체제 소개
					<li data-theme="e">
						<%=resultHTML1%>
					</li>
				</li>
			</ul>
			<ul data-role="listview" data-inset="true" data-theme="a">
				<li>
					2014 달라지는 점 소개
					<li data-theme="e">
						<%=resultHTML2%>
					</li>
				</li>
			</ul>


<a href="#" data-icon="arrow-u" class="ui-btn-right" id="goToTop"><h3>위로</h3><img src="../images/arrow1.png"></a>
<script type="text/javascript">
$(document).ready(function() {
	$().UIgoToTop({ easingType: 'easeOutQuart' });
});
</script>

		</section>
		<!-- 리스트 끝 -->


		<!-- 3. 푸터 -->
		<footer data-role="footer">
			<%@ include file="../include/businessInfo.inc"%>

		</footer>

	</section>
	<!--  팀 정보 페이지 끝 -->

</body>
</html>