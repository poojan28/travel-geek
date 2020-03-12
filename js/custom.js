
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

    //top  Initialize Swiper
    
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: false,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });
    
//swiper ended
// section Initialize Swiper

  var swiper = new Swiper('.section-swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    }
  });

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

 

