
 $(document).ready(function($) {
     //magnific popup
    $('#popimg').magnificPopup({
       delegate: '.btn-gallery',
       type: 'image',
       gallery: {
           enabled: true
       }
   }); 
   //End of magnific popup

   //scroll down
   $(".scroll").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    } 
  });
//   End of scroll down

// slick slider
  $(".vertical-center-4").slick({
    dots: true,
    vertical: true,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 2
  });
  $(".vertical-center-3").slick({
    dots: true,
    vertical: true,
    centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
  $(".vertical-center-2").slick({
    dots: true,
    vertical: true,
    centerMode: true,
    slidesToShow: 2,
    slidesToScroll: 2
  });
  $(".vertical-center").slick({
    dots: true,
    vertical: true,
    centerMode: true,
  });
  $(".vertical").slick({
    dots: true,
    vertical: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
  $(".regular").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
  $(".center").slick({
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 3
  });
  $(".variable").slick({
    dots: true,
    infinite: true,
    variableWidth: true
  });
  $(".lazy").slick({
    lazyLoad: 'ondemand', // ondemand progressive anticipated
    infinite: true
  });
//   End of slick slider

// adding nav-item through jquery in navigation
  var large = '<li class="menu-item only-mob"><div id="appended" class="added-through-js"><div class="search"><form role="search" method="get" class="search-form" action="#"><label><span class="screen-reader-text">Search for:</span><input type="search" class="search-field" placeholder="Search &hellip;" value="" name="s" /></label><input type="submit" class="search-submit" value="" /></form></div><div class="account"><p>Account</p></div></div>  </li>';
  var inserted = $("#respMenu") .append(large); 
  console.log( "hurry! Done")
// adding nav-item throught jquery in navigation
});

 //Start of mobile navigation bar
 $(document).on( 'click', 'span#open-navigation-bar', function(){
  document.getElementById("mySidenav").style.width = "300px";
});
$(document).on( 'click', 'a#close-navigation-bar', function(){
  document.getElementById("mySidenav").style.width = "0";
});
//adding nav item in ul
// var menu = document.getElementById("respMenu");
// var navItem = document.createElement('li');
// menu.appendChild(navItem);
// var addedLi =document.getElementById('appended');
// navItem.append(addedLi);
// navItem.classList.add("menu-item");
// navItem.classList.add("only-mob");


//end of adding nav item in ul


//End of mobile navigation bar
// remove text from button
  // $(".search-widget .search-submit").val("");
// remove text from button

 

