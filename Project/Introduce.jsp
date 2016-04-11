<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page trimDirectiveWhitespaces="true"%>
<%@ page
	import="java.net.MalformedURLException, java.io.IOException, java.io.InputStreamReader"%>
<%@ page
	import="java.io.BufferedReader, java.io.OutputStreamWriter, java.io.BufferedWriter"%>
<%@ page import="java.net.URLConnection, java.net.URL"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>홈페이지 소개</title>
  <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/earlyaccess/hanna.css">
<%@ include file="../include/jQueryMobile.inc"%>
<style type="text/css">
 div {
        font-family: 'Hanna', serif;
        font-size: 20px;
      }

#article {
	width: 100%;
	height: 150px;
}
</style>
</head>
<body>

	<section style="width:400px; height:1024px; background-image: url(../images/back/back4.jpg)" data-role="page">
		<!-- 1. 헤더 -->

		<header data-role="header" data-theme="a">
			<%@ include file="../include/menu.inc"%>
		</header>
	

		<!-- 2. 팀 정보 목록 -->
		<section data-role="content">
			<div>
				<div>
					<img id="article" src="../images/banner/intro.jpg" />
				</div>
				<div style="margin-left: 5px; margin-right: 5px;">

					<br>
					<p>
						&nbsp;&nbsp;이 모바일 사이트는 한국 프로야구에 대한<br>&nbsp;&nbsp;정보를 제공하고자
						제작한 사이트 입니다.
					</p>
					<br>
					<p>&nbsp;&nbsp;프로야구는 2008년 베이징 올림픽 금메달과 2006 wbc 4강 진출, 2009
						wbc 준우승이라는 성과에 힘입어 관중 증가를 이뤄냈으며 이런열기를 바탕으로 프로야구는 최고의 스포츠 그리고 문화
						산업으로 자리 잡았습니다.</p>
					<br>
					<p>&nbsp;&nbsp;이제 NC다이노스, KT위즈의 창단으로 10개 구단 시스템을 갖추었습니다. 전국의
						수많은 야구팬, 그리고 야구를 잘 모르는 사람들에게 야구의 재미와 정보를 제공하기 위해 어떻게 해야할지 고민한 끝에
						프로야구 웹 페이지를 만들기로 결정하고 약 한 달 동안 주제선정, 정보 수집, 디자인 설계, 코딩 순서로 모바일 웹
						프로젝트 진행한 끝에 웹 사이트를 완성했습니다.</p>
					<br>
					<p>&nbsp;&nbsp;야구의 묘미는 투구 하나 하나의 긴장감과 예상치 못한 단 한번의 실투와 타격으로 팀을
						승리로 때로는 패배로 이끌기도 하는 것이 야구만의 매력입니다. 자기가 응원하는 팀의 플레이에 따라 울고 웃도록 만들며
						치열하고 뜨거운 프로야구의 세계를 알고 싶다면 바로 이 사이트에서 알려드립니다.</p>
				</div>
				<br>
				<div style="float: right;">
					<h2>제작자 윤태영, 조용진</h2>
				</div>
			</div>
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