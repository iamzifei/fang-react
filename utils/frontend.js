// TODO: change the jQuery implementation to native or react way

$(document).ready(function(){
  $(window).scroll(function() { // check if scroll event happened
    if($(window).width() > 767) {
      $(".navbar-fixed-top").css("background-color", "transparent");
      if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
        $(".navbar-fixed-top").css("background-color", "#212121"); // if yes, then change the color of class "navbar-fixed-top"
      } else {
        $(".navbar-fixed-top").css("background-color", "transparent"); // if not, change it back to transparent
      }
    } else {
      $(".navbar-fixed-top").css("background-color", "#212121");
    }
  });

  $(window).resize(function() {
    if($(window).width() > 767) {
      $(".navbar-fixed-top").css("background-color", "transparent");
    } else {
      $(".navbar-fixed-top").css("background-color", "#212121");
    }
  });
});
