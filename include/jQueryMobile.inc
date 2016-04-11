<!-- jQuery, jQuery Mobile 라이브러리 사용: CDN 방식 --> 
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.css" />
<script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
<script src="http://code.jquery.com/mobile/1.0.1/jquery.mobile-1.0.1.min.js"></script>

<!-- 메뉴바 -->
<link rel="stylesheet" href="../css/reset.css">
<link rel="stylesheet" href="../css/style.css">
<script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>

<!--go to Top Anchor -->

<script src="../js/Anchor3.js"></script>	
<script type="text/javascript" src="../js/Anchor2.js"></script>
<script type="text/javascript" src="../js/Anchor1.js"></script>

<script type="text/javascript">
                jQuery(document).ready(function($) {
                    // hide the menu when the page load
                    $("#navigation-list").hide();
                    // when .menuBtn is clicked, do this
                    $(".menuBtn").click(function() {
                        // open the menu with slide effect
                        $("#navigation-list").slideToggle(300);
                    });
                });
            </script>


