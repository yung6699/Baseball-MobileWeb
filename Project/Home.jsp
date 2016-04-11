<!DOCTYPE html>
<%@ page contentType="text/html;charset=utf-8"%>
<%@ page import="java.sql.*"%>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1">
<%@ include file="../include/jQueryMobile.inc"%>
<%@ include file="../include/jQueryMobile2.inc"%>

<title>Home</title>
<link href="../css/MenuStyle.css" rel="stylesheet" type="text/css" media="all" />
<style>
session{background-image:url('images.jpg')}
</style>


<!-- Hook up the FlexSlider -->
<script type="text/javascript">
	var Main = Main || {};

	
	jQuery(window).load(function() {
		window.responsiveFlag = jQuery('#responsiveFlag').css('display');
		Main.gallery = new Gallery();

		jQuery(window).resize(function() {
			Main.gallery.update();
		});
	});

	function Gallery() {
		var self = this, container = jQuery('.flexslider'), clone = container
				.clone(false);

		this.init = function() {
			if (responsiveFlag == 'block') {
				var slides = container.find('.slides');

				slides.kwicks({
					max : 500,
					spacing : 0
				}).find('li > a').click(function() {
					return false;
				});
			} else {
				container.flexslider();
			}
		}
		this.update = function() {
			var currentState = jQuery('#responsiveFlag').css('display');

			if (responsiveFlag != currentState) {

				responsiveFlag = currentState;
				container.replaceWith(clone);
				container = clone;
				clone = container.clone(false);

				this.init();
			}
		}

		this.init();
	}
</script>

</head>
<body>
	<section style="width:400px; height:1024px; background-image: url(../images/back/back3.jpg)" data-role="page">
		<header data-role="header" data-theme="a">
			<%@ include file="../include/menu.inc"%>
		</header>

		<br>
		<section>
		<div id="container" >
		<!-- 슬라이더 -->
			<div class="flexslider">
				<ul class="slides">
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
						for (int i = 1; i <=5; i++) {
							sql = " select * from photo where 순번 = " + "" + (i) + "";
							rs = stmt.executeQuery(sql);
							while (rs.next()) {
				%>
				
					<li><img src="../images/Photo/<%=rs.getString("이미지명")%>"  width="100%"/>
						<div class="flex-caption" width="100%">
							<a href="<%=rs.getString("주소")%>">
							<h4><%=rs.getString("기사제목")%></h4></a>
							<p><%=rs.getString("내용")%></p>
		
						</div></li>
					<%
					}
						}
						rs.close();
						stmt.close();
					} catch (SQLException e) {
					} 
				%>
				</ul>
			</div>
			<!--  슬라이더 끝-->
			<br><br>
			<div style="margin-left:10px">
			<span><a href="http://www.m.dugoutmagazine.co.kr/bbs/board.php?bo_table=NEWS"><img src="../images/banner/Book.png" width="150px" style="border:1px solid #000000;"></a>
			</span>
			<span><a href="http://www.wefan.co.kr/shop/goods/goods_view.php?goodsno=6747&category=018&inflow=KBO"><img src="../images/banner/Baseball.png" width="150px" style="border:1px solid #000000;"></a>
			</span>
			<div><br>

		<a href="https://m.facebook.com/kbo1982"><img src="../images/banner/Facebook.jpg" width="100%"></a>
		<br><br>
		<img src="../images/banner/Gamble.jpg" width="100%">
	
		</div>
		<br>
	</section>
		<footer data-role="footer" data-theme="a">
			<%@ include file="../include/businessInfo.inc"%>
		</footer>

	</section>
</body>
</html>