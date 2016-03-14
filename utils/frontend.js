// TODO: change the jQuery implementation to native or react way

$(document).ready(function(){
  $(window).scroll(function() { // check if scroll event happened
    if($(window).width() > 767) {
      $(".navbar-fixed-top.home").css("background-color", "transparent");
      if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
        $(".navbar-fixed-top.home").css("background-color", "#212121"); // if yes, then change the color of class "navbar-fixed-top"
      } else {
        $(".navbar-fixed-top.home").css("background-color", "transparent"); // if not, change it back to transparent
      }
    } else {
      $(".navbar-fixed-top").css("background-color", "#212121");
    }
  });

  $(window).resize(function() {
    if($(window).width() > 767) {
      $(".navbar-fixed-top.home").css("background-color", "transparent");
      $("#refine").removeClass("data-refine");
    } else {
      $(".navbar-fixed-top.home").css("background-color", "#212121");
    }
  });

  $(".navbar.searchResult").click(function(){
    $("#refine").toggleClass("data-refine");
  });

  $("#refine a[data-closerefine]").click(function(){
    $("#refine").removeClass("data-refine");
  })
});
