$(document).ready(function(){

    API_ROOT = "https://au48vk6k1f.execute-api.ap-southeast-1.amazonaws.com/"
    CASHFLOW_URL = API_ROOT + "prod"
    var QUERY = new URLSearchParams(location.search)
    var price = 0
    var rent = 0

    price = QUERY.get('price')
    rent = QUERY.get('rent')
    update_parameter('downpayment_percentage', QUERY.get('downpayment_percentage'))
    update_parameter('rate_percentage', QUERY.get('rate_percentage'))
    update_parameter('tenure', QUERY.get('tenure'))
    draw_sliders()
    update_parameter('human_format', QUERY.get('human_format'))
    var params = Array.from(QUERY).length
    if (params > 0) {
        set_session_storage(price, rent)
        load_cashflow()
    } else {
        reset_session_storage()
    }
    var link = $("a.critical-link")
    if (link)
        link.attr("href", link.attr("href") + location.search)
    $("#rent").on("keyup click", function filter_links(){
        rent = this.value
    })

    $("#submit").on("click", function get_cashflow(){
        load_cashflow()
    })

    $("#price-analysis-form").on( "submit", function( event ) {
      // console.log( "Handler for `submit` called." );
    });

    $('a[href^="#"]').on('click', function(event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
         event.preventDefault();
         $('html, body').stop().animate({
            scrollTop: target.offset().top
         }, 0);
      }
   });

    function refresh_page(obj) {
        $('.progress_overlay').fadeOut()
        if (obj.monthly_cashflow.startsWith("-")){
            $("img.cash_flow_result_trend").attr("src", "assets/images/down_chart.png")
            $("#cashflow-block").removeClass("green_text")
            $("#cashflow-block").addClass("red_text")
        } else {
            $("#cashflow-block").removeClass("red_text")
            $("#cashflow-block").addClass("green_text")
        }
        $("#cashflow-value").hide().html(obj.monthly_cashflow).fadeIn(3000)
        $("#monthly-payment-value").hide().html(obj.monthly_payment).fadeIn(3000)
        $("#price-value").hide().html(obj.price).fadeIn(3000)
        $("#interest-paid-value").hide().html(obj.interest_payable).fadeIn(3000)
        $("#interest-paid-percent").hide().html(obj.interest_part_percent).fadeIn(3000)
        $("#equity-paid-value").hide().html(obj.equity_payable).fadeIn(3000)
        $("#equity-paid-percent").hide().html(obj.equity_part_percent).fadeIn(3000)
        $("#downpayment-value").hide().html(obj.downpayment_value).fadeIn(3000)
        $("#loan-amount-value").hide().html(obj.loan_amount_value).fadeIn(3000)
        $("#annual-rental-value").hide().html(obj.annual_rental_value).fadeIn(3000)
        $("#payable-taxes-value").hide().html(obj.annual_taxes_value).fadeIn(3000)
        // $("#mcst-fee-value").hide().html(obj.annual_maintenance_fee_value).fadeIn(3000)
    }

    function check_and_add_parameters(parameter, query) {
        value = $("#" + parameter).val()
        if (value){
            query = query + "&" + parameter  + "=" + value
        }
        return query
    }

    function validate_input(input_value, value_cat){
        var value = null
        if (input_value)
            value = Number(input_value.replace(/[^0-9.-]+/g,""));

        if (value_cat === "price") {
            error = $("#" + value_cat + "-error")
            error.hide()
            if (!value || !(value > 99999))  {
                error.fadeIn()
                return false
            } else {
                error.fadeOut()
                return true
            }
        }
        else if (value_cat === "rent") {
            error = $("#" + value_cat + "-error")
            error.hide()
            if (!value && location.pathname === '/cashflow-analysis.html'){
                error.fadeIn()
                return false
            }
            if ((value) && (!(value > 99))) {
                error.fadeIn()
                return false
            } else {
                error.fadeOut()
                return true
            }
        } else
            return false

    }

    function isNumber(value) {
      if (typeof value === 'number')
          return true
        else return !isNaN(Number(value));
    }

    function load_cashflow(){
        price = $("#price").val()
        rent = $("#rent").val()
        valid_price = validate_input(price, "price")
        valid_rent = validate_input(rent, "rent")
        if (valid_price && valid_rent){
            send_cashflow_request(price, rent)
        } else {
            $("#filter_bar").click()
            console.log("request condition not met")
        }
    }

    function send_cashflow_request(price, rent){
        query = "/?price=" + price
        if (rent && rent !== 'null')
            query = query + "&" + "rent=" + rent
        query = check_and_add_parameters("tenure", query)
        query = check_and_add_parameters("downpayment_percentage", query)
        query = check_and_add_parameters("rate_percentage", query)
        query = query + "&" + "human_format=True"
        var url = CASHFLOW_URL + query
        $('.progress_overlay').show()
        $.get(url).then(
          function(response) {
              response = response.replace(/'/ig,'"');
              var obj = $.parseJSON( response );
              refresh_page(obj)
          },
          function(jqXHR) {
            console.log('Error occurred: '+ jqXHR.statusText + ' ' + jqXHR.status);
            $('.progress_overlay').fadeOut()
          }
        );
    }

    function reset_session_storage(){
        sessionStorage['price'] = null
        sessionStorage['rent'] = null
        $("#price").val('')
        $("#rent").val('')
    }

    function set_session_storage(price, rent){
        sessionStorage['price'] = price
        sessionStorage['rent'] = rent
        $("#price").val(price)
        $("#rent").val(rent)
    }

    function update_parameter(parameter_name, value){
        if (value && value !== '') {
            if (parameter_name === 'human_format'){
                $("#" + parameter_name).val(value)
            }
            else{
                $("#" + parameter_name).attr('data-slider-value', value)
                slider_elem = $("#" + parameter_name).wrap('<p/>').parent().html();
                $("#" + parameter_name + "_slider").html(slider_elem)
            }
        }
    }

    function draw_sliders(){
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
    }

});