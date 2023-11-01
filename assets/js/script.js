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

    $("#new_search").on("click", function (){
         $('#condo_search').focus()
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
           return value +' Years ';
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

      $("input[data-type='currency']").on({
        keyup: function() {
          formatCurrency($(this));
        }
      });
        function formatNumber(n) {
          // format number 1000000 to 1,234,567
          return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        function formatCurrency(input) {
          var input_val = input.val();
          sessionStorage[input.attr("id")] = input_val
          // don't validate empty input
          if (input_val === "") { return; }
          // remove all non-digits
          input_val = formatNumber(input_val);
          input_val = "$" + input_val;
          // send updated string to input
          input.val(input_val);
        }

    
});
/**
   * Preloader
   */
let preloader = $('#preloader');
if (preloader) {
window.addEventListener('load', () => {
  preloader.remove()
});
}
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



$(document).ready(function() {
  function checkMediaQuery() {
      if (window.matchMedia("(max-width: 575px)").matches) {
          $('#search_show').on('click', function() {
              $('.mobile_search_area').addClass('over_search_box');
              $('.mobile_apps').css('display', 'none');
              // $('.mobile_search_input').focus();
          });

          $('.mobile_back_search').on('click', function() {
              $('.mobile_search_area').removeClass('over_search_box');
              $('.mobile_apps').css('display', 'block');
          });
      } else {
          // Media query is false (above 575px)
          $('#search_show').off('click'); // Remove click event handler
          $('.mobile_apps').css('display', 'block');
      }
  }

  // Initial check when the page loads
  checkMediaQuery();

  // Check media query on window resize
  $(window).resize(function() {
      checkMediaQuery();
  });
});








document.getElementById('search_show').addEventListener('click', function() {
  focusAndOpenKeyboard('myInput');
});

function focusAndOpenKeyboard(elementId) {
  const el = document.getElementById(elementId);

  if (el) {
      // Create a temporary input element to focus on and open the keyboard
      let __tempEl__;
      function focusOnDummyElementToOpenIOSKeyboard() {
          __tempEl__ = document.createElement('input');
          __tempEl__.style.position = 'absolute';
          __tempEl__.style.top = (el.offsetTop + 7) + 'px';
          __tempEl__.style.left = el.offsetLeft + 'px';
          __tempEl__.style.height = 0;
          __tempEl__.style.opacity = 0; // Set opacity to 0 to make it invisible
          document.body.appendChild(__tempEl__);
          __tempEl__.focus();

           // The keyboard is open. Now do a delayed focus on the target element
            setTimeout(function() {
              el.focus();
              el.click();
              // Remove the temp element
              document.body.removeChild(__tempEl__);
            }, 100);
      }

      // Function to focus on the target element and remove the observer
      function focusOnElementAndCleanup() {
          el.focus();
          if (__tempEl && document.body.contains(__tempEl)) {
              document.body.removeChild(__tempEl);
          }
          if (observer) {
              observer.disconnect();
          }
      }

      // Check if the target element is already visible
      if (isVisible(el)) {
          focusOnElementAndCleanup();
      } else {
          focusOnDummyElementToOpenIOSKeyboard();
          let observer;

          // Create a MutationObserver to watch for changes in the DOM
          observer = new MutationObserver(function (mutationsList) {
              for (const mutation of mutationsList) {
                  if (mutation.type === 'childList' && isVisible(el)) {
                      focusOnElementAndCleanup();
                      break;
                  }
              }
          });

          // Start observing changes in the parent node (you can change this to a more appropriate parent)
          observer.observe(document.body, { childList: true, subtree: true });
      }


  }

  // Function to check if the element is visible in the DOM
  function isVisible(element) {
      var rect = element.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }
}


$(document).ready(function(){
    $('.search_type_btn button').click(function(){
      $('.search_type_btn button').removeClass("active");
      $(this).addClass("active");
  });

  $('.mobile_condo_btn button').click(function(){
    $('.mobile_condo_btn button').removeClass("active");
    $(this).addClass("active");
});

});














