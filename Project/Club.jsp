<!DOCTYPE HTML>
<%@ page contentType="text/html;charset=utf-8"%>

<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>구단 정보</title>
<%@ include file="../include/jQueryMobile.inc"%>
<%@ page import="java.sql.*"%>
<link rel="stylesheet" href="../css/Club.css">
 <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/earlyaccess/jejugothic.css">
 <style type="text/css">
 #dialog{
        font-family: 'Jeju Gothic', serif;
        font-size: 15px;
      }


</style>
<script type="text/javascript">
	$(function() {
		$('ul li a').click(function() {

			var Title = $(this).find('h3').text();
			var Win = $(this).find('div.win').text();
			var Intro = $(this).find('div.intro').text();
		
			
			$("#p2_title").html(Title);
			$("#p2_win").html(Win);
			$("#p2_intro").html(Intro);

			/// page1 /// 
			// 클릭된 개체(this) 내의 각 엘리먼트를 찾아(find), 그 속성(attr) 또는 데이터(text) 인식 
			var videoSrc = $(this).find('div.video').text();

			// 비디오 소스 변경과 실행    
			var video = $("#p2_video")
			video.attr('src',videoSrc);
			video.get(0).play();
		});

		$('#page2').click(function() {
			// 기존 실행 중인 비디오 중지 
			$("#p2_video").get(0).pause();
		});
	});
</script>
</head>
<body>

	<section style="width:400; height:auto; background-image: url(../images/back/back1.jpg)" data-role="page">

	
		<!-- 1. 헤더 -->
		<header data-role="header" data-theme="a">
			<%@ include file="../include/menu.inc"%>
		</header>


		<!-- 2. 팀 정보 목록 -->
		<section data-role="content">
			<ul data-role="listview" data-inset="true" data-theme="e">
				<li data-role="list-divider" data-theme="a">팀별 정보</li>

				<%
					Connection con = null;
					Statement stmt = null;
					ResultSet rs = null;
					String sql = "";
					String rst = "sucess";
					String msg = "";
				%>

				<%
					try {
				%>
				<%
					Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
						con = DriverManager
								.getConnection("jdbc:sqlserver://localhost:1433;databasename=myDB;user=jsp;password=1234;");
						stmt = con.createStatement();
						for (int i = 1; i <= 10; i++) {
							sql = " select * from Club where 순위 = " + "" + (i) + "";
							rs = stmt.executeQuery(sql);
							while (rs.next()) {
				%>





				<li data-role="list-divider"><a href="#page2" data-rel="dialog"
					data-transition="pop"> <img
						src="../images/Teamlogo/<%=rs.getString("로고")%>" width=80%
						height=80%>

						<h3><%=rs.getString("팀명")%></h3>
						<div class="win" style="display: none"><%=rs.getString("우승횟수")%></div>
						<div class="intro" style="display: none"><%=rs.getString("소개")%></div>
						<div class="video" style="display: none"><%=rs.getString("소개영상")%></div>
						<p class="hometown" style="line-height: 1.6em;">
							&nbsp;연고지 :
							<%=rs.getString("연고지")%>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;홈구장 :
							<%=rs.getString("홈")%></p>
						<p class="manager">
							&nbsp;감독 :
							<%=rs.getString("감독")%>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;창단년도 :
							<%=rs.getString("창단연도")%></p>
				</a></li>
	<%
					}

						}
						rs.close();
						stmt.close();
					} catch (SQLException e) {
					}
				%>
				
			</ul>
		</section>
		<!-- 리스트 끝 -->

		<!-- 3. 푸터 -->
		<footer data-role="footer">
			<%@ include file="../include/businessInfo.inc"%>

		</footer>

	</section>
	<!--  팀 정보 페이지 끝 -->


	<!-- 다이얼로그 페이지 시작 -->
	<section data-role="page" id="page2">

		<header data-role="header" data-theme="b">
			<!-- 헤더 타이틀 -->
			<h1 id="p2_title"></h1>
		</header>

		<!-- 2. 본문 -->
		<section id="dialog" data-role="content">
			<div class="js-video [vimeo, widescreen]">
			<iframe id="p2_video" width="100%" height="315"  frameborder="0" allowfullscreen></iframe></div>
			<br>
			<table style="line-height: 1.0em;">
				<tr height="3">
					<td width="80" height="5"><h4>우승 횟수 :</h4></td>
					<td height="5"><h4><span id="p2_win"></span></h4></td>
				</tr>
			</table>
			<br>
			<h4 style="line-height: 2.3em;">구단 소개글</h4>
			<h4><span id="p2_intro"></span></h4>
		</section>
	</section>
	<!-- 다이얼로그 페이지 끝 -->
</body>
</html>