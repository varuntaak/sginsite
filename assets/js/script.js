$(document).ready(function(){

  

    var page = 'buy'



    // script for memorizing the tab click on district page

    var district_page_type = null
    const RESALE = 'home'
    const NEW = 'profile'
     $(document).ready(function(){
        if (sessionStorage['DISTRICT_PAGE_TYPE'] === undefined){
            district_page_type = RESALE
            sessionStorage['DISTRICT_PAGE_TYPE'] = district_page_type
        } else {
            district_page_type = sessionStorage['DISTRICT_PAGE_TYPE']
            $("#" + "pills-" + district_page_type + "-tab").click()
        }
    });

    $("#pills-home-tab").on("click", function (){
        district_page_type = RESALE
        sessionStorage['DISTRICT_PAGE_TYPE'] = district_page_type
    })

    $("#pills-profile-tab").on("click", function (){
        district_page_type = NEW
        sessionStorage['DISTRICT_PAGE_TYPE'] = district_page_type
    })

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

      $("#rate_percentage").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'% ';
        },
        ticks_tooltip: true,
        step: 0.1
     });
      $("#tenure").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'Years ';
        },
        ticks_tooltip: true,
        step: 1
     });
     $("#downpayment_percentage").slider({
         ticks_snap_bounds: 200,
         tooltip: 'always',
        formatter: function(value) {
           return value +'%';
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
  var lastScrollTop = 0;
  $(window).scroll(function(){
        var st = $(this).scrollTop();
        if (st > 500 && st < lastScrollTop) {
           $('#backtotop').addClass('activate');
        } else {
           $('#backtotop').removeClass('activate');
        }
        lastScrollTop = st;
  });
}
backtotop();

  // End Fixed Scroll Area jQuery

// Distance Custom Click

// const optionMenu = document.querySelector('.select_menu'),
//       selectBtn = optionMenu.querySelector('.select_btn');

// selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));


// window.onclick = function(event){
//    if(!event.targer.matches(".select_btn")){
//       var dd = document.getElementsByClassName("options");
//    }
//    for(var i = 0; i<dd.length; i++){
//       var x =dd(i);
//       if(x.classList.contains('active'))(x.classList.remove('active'))
//    }
// }


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