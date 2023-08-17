$(document).ready(function(){
    // Mobile Menu Icon
   $(document).ready(function(){
      $('#nav-icon').click(function(){
         // $(this).toggleClass('open');
         // $('.header-nav nav').slideToggle();
         $('.mobile_menu').css({'display':'flex','opacity': '1', 'visibility': 'visible'}); 
         $('.mobile_overlay').show(); 
      });
      $('#menu_close').click(function(){
         // $(this).toggleClass('open');
         // $('.header-nav nav').slideToggle();
         $('.mobile_menu').css({'display':'none', 'opacity': '0', 'visibility': 'hidden'});
         $('.mobile_overlay').hide();
      });
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

      // End Fixed Scroll Area jQuery

    
});
