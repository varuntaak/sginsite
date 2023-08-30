$(document).ready(function(){


  

      // End Fixed Scroll Area jQuery






       // Setting page Start
      // With JQuery
   
      $("#ex20").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'';
        },
        ticks_tooltip: true,
        step: 1
     });
      $("#ex21").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'K';
        },
        ticks_tooltip: true,
        step: 1
     });

      $("#ex22").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'% ';
        },
        ticks_tooltip: true,
        step: 1.2
     });
      $("#ex23").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'Years ';
        },
        ticks_tooltip: true,
        step: 1
     });




   //   Pricing Page range 
      $("#ex24").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'M';
        },
        ticks_tooltip: true,
        step: 1
     });

   //   Pricing Page range 
      $("#ex25").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'M';
        },
        ticks_tooltip: true,
        step: 1
     });







});


  // Nice Select
  $(document).ready(function () {
      $('select').niceSelect();
  });

 // Start Fixed Scroll Area jQuery
   
   function backtotop() {
      $(window).scroll(function(){
            if ($(this).scrollTop() > 500) {
               $('#backtotop').addClass('activate');
            } else {
               $('#backtotop').removeClass('activate');
            }
      });
   }
   backtotop();




document.addEventListener("DOMContentLoaded", function() {
   const menuContainer = document.querySelector(".select_menu");
   const menuToggle = document.querySelector(".select_btn"); // Check this element's existence
   const menu = document.querySelector(".menu");

   if (menuToggle) { // Make sure menuToggle is defined before using it
       menuToggle.addEventListener("click", function(event) {
           event.stopPropagation(); // Prevents the click event from reaching the document

           menu.classList.toggle("active");
           menuToggle.classList.toggle("active");
       });
   }

   document.addEventListener("click", function(event) {
       const target = event.target;

       if (menuContainer && !menuContainer.contains(target)) {
           menu.classList.remove("active");
           if (menuToggle) { // Check menuToggle again before using it
               menuToggle.classList.remove("active");
           }
       }
   });
});



window.addEventListener('load', function() {
    function openMobileMenu() {
        document.querySelector('.mobile_menu').style.right = '0';
        document.querySelector('.mobile_menu').style.opacity = '1';
        document.querySelector('.mobile_menu').style.display = 'flex';
        document.querySelector('.mobile_menu').style.visibility = 'visible';
        document.querySelector('.mobile_overlay').style.display = 'block';
    }

    function closeMobileMenu() {
        document.querySelector('.mobile_menu').style.right = '0';
        document.querySelector('.mobile_menu').style.opacity = '0';
        document.querySelector('.mobile_menu').style.display = 'none';
        document.querySelector('.mobile_menu').style.visibility = 'hidden';
        document.querySelector('.mobile_overlay').style.display = 'none';
    }

    document.querySelector('#nav-icon').addEventListener('click', function() {
        openMobileMenu();
    });

    document.querySelector('#menu_close').addEventListener('click', function() {
        closeMobileMenu();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            closeMobileMenu();
        }
    });
});


