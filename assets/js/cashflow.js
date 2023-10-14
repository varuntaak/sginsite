$(document).ready(function(){

    API_ROOT = "https://au48vk6k1f.execute-api.ap-southeast-1.amazonaws.com/"
    CASHFLOW_URL = API_ROOT + "prod"
    var price = 0
    var rent = 0
    $("#price").on("keyup click", function filter_links(){
        price = this.value
    })

    $("#rent").on("keyup click", function filter_links(){
        rent = this.value
    })

    $("#submit").on("click", function get_cashflow(){
        valid_price = validate_input(price, "price")
        valid_rent = validate_input(rent, "rent")
        if (valid_price && valid_rent){
            console.log("sending request")
            query = "/?price=" + price
            if (rent)
                query = query + "&" + "rent=" + rent
            query = check_and_add_parameters("tenure", query)
            query = check_and_add_parameters("downpayment_percentage", query)
            query = check_and_add_parameters("rate_percentage", query)
            query = query + "&" + "human_format=True"
            var url = CASHFLOW_URL + query
            $('.progress_overlay').show()
            $.get(url).then(
              function(response) {
                  console.log(response)
                  response = response.replace(/'/ig,'"');
                  var obj = $.parseJSON( response );
                  console.log(obj)
                  refresh_page(obj)
              },
              function(jqXHR) {
                console.log('Error occurred: '+ jqXHR.statusText + ' ' + jqXHR.status);
                $('.progress_overlay').fadeOut()
              }
            );
        } else {
            console.log("request condition not met")
        }
    })

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
        $("#cashflow-value").hide().html(obj.monthly_cashflow).fadeIn(3000)
        $("#monthly-payment-value").hide().html(obj.monthly_payment).fadeIn(3000)
        $("#interest-paid-value").hide().html(obj.interest_payable).fadeIn(3000)
        $("#interest-paid-percent").hide().html(obj.interest_part_percent).fadeIn(3000)
        $("#equity-paid-value").hide().html(obj.equity_payable).fadeIn(3000)
        $("#equity-paid-percent").hide().html(obj.equity_part_percent).fadeIn(3000)
        $("#downpayment-value").hide().html(obj.downpayment_value).fadeIn(3000)
        $("#loan-amount-value").hide().html(obj.loan_amount_value).fadeIn(3000)
    }

    function check_and_add_parameters(parameter, query) {
        value = $("#" + parameter).attr("value")
        if (value){
            query = query + "&" + parameter  + "=" + value
        }
        return query
    }

    function validate_input(value, value_cat){
        if (value_cat === "price") {
            error = $("#" + value_cat + "-error")
            error.hide()
            if (!value || !isNumber(value) || !(Number(value) > 99999))  {
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
            if ((value) && (!isNumber(value) || !(Number(value) > 99))) {
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

});