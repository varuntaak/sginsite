$(document).ready(function(){

    var page_type = null
    const BUY_TYPE = 'buy'
    const RENT_TYPE = 'rent'
    const PAGE_TYPE = 'page_type'
    var condos_page = 0
    var districts_page = 0
    var schools_page = 0
    var result = new Set();
    var default_condo_result = new Set()
    var districts_result = new Set();
    var default_districts_result = new Set();
    var schools_result = new Set();
    var default_schools_result = new Set();
    var default_condos_count = '2.5k+'
    const CONDOS_TYPE = 'condos'
    const DISTRICTS_TYPE = 'districts'
    const SCHOOLS_TYPE = 'schools'

    $(document).ready(function(){
        if (sessionStorage['PAGE_TYPE'] === undefined){
            page_type = BUY_TYPE
            sessionStorage['PAGE_TYPE'] = page_type
        } else {
            page_type = sessionStorage['PAGE_TYPE']
            $("#" + "pills-" + page_type +"-tab").click()
        }
        condo_keys = Object.keys(data['condos'])
        all_condo_ids = []
        for (var i=0; i<condo_keys.length; i++){
            Array.prototype.push.apply(all_condo_ids, data[CONDOS_TYPE][condo_keys[i]])
        }
        default_condo_result = new Set(all_condo_ids)
        default_districts_result = new Set(data[DISTRICTS_TYPE])
        default_schools_result = new Set(data[SCHOOLS_TYPE])
        do_filter()
   });

    function reset_results(){
        if (default_districts_result.size > 0 && default_condo_result.size > 0 && default_schools_result.size > 0){
            result = new Set(default_condo_result)
            districts_result = new Set(default_districts_result)
            schools_result = new Set(default_schools_result)
            reset_items(result, CONDOS_TYPE, default_condos_count)
            reset_items(districts_result, DISTRICTS_TYPE, default_districts_result.size)
            reset_items(schools_result, SCHOOLS_TYPE, default_schools_result.size)
        }
    }

    function reset_items(result, item_type, item_count) {
        clear_dom(item_type)
        update_dom(result, item_type, item_count)
    }

    // search js

    $("#search-summary-condos").on("click", function (){
         $("#" + CONDOS_TYPE + "-" + page_type +"-link-results-container").get(0).scrollIntoView();
    })
    $("#search-summary-districts").on("click", function (){
        $("#" + DISTRICTS_TYPE + "-" + page_type +"-link-results-container").get(0).scrollIntoView();
    })
    $("#search-summary-schools").on("click", function (){
        $("#" + SCHOOLS_TYPE + "-" + page_type +"-link-results-container").get(0).scrollIntoView();
    })

    $("#pills-buy-tab").on("click", function (){
        page_type = BUY_TYPE
        sessionStorage['PAGE_TYPE'] = page_type
        reset_results()
    })

    $("#pills-rent-tab").on("click", function (){
        page_type = RENT_TYPE
        sessionStorage['PAGE_TYPE'] = page_type
        reset_results()
    })

    $("#searchinputfield, #search-button").on("keyup click", function filter_links(){
      do_filter()
    })

    $('#searchinputfield').on('focus', function() {
        do_filter()
    });

    function do_filter(){
      clear_dom(CONDOS_TYPE)
      clear_dom(DISTRICTS_TYPE)
      clear_dom(SCHOOLS_TYPE)
      input = document.getElementById("searchinputfield");
      if (input.value){
        filter = input.value.toUpperCase();
        alphabet = filter[0]
        ids = []
        c_ids = data[CONDOS_TYPE][alphabet]
        if (c_ids == null){
          c_ids = []
        }
        cn_ids = data[CONDOS_TYPE]['#']
        Array.prototype.push.apply(cn_ids, c_ids)
        filter = remove_special_chars(filter)
        search(filter, cn_ids, result, CONDOS_TYPE)
        search(filter, data[DISTRICTS_TYPE], districts_result, DISTRICTS_TYPE)
        search(filter, data[SCHOOLS_TYPE], schools_result, SCHOOLS_TYPE)
      }
      else {
          reset_results()
      }
    }

    function search(filter, indexed_data, result, type){
      result.clear() //remove existing results
      pids = indexed_data
      filter_list(filter, pids, '^', result)
      populate_limit = 50
      if (result.size < populate_limit) {
        if (type === CONDOS_TYPE || (type === DISTRICTS_TYPE  && filter.length > 2) ||
            (type === SCHOOLS_TYPE && filter.length > 2)){
            populate_pattern_match_results(filter, result, type)
        }
      }
      update_dom(result, type, result.size)
    }

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }


    function update_search_message(size, type) {
        const messageElement = document.getElementById(type + "-" + page_type + "-search-message");
        messageElement.innerHTML = ''

        element = '<p>' + size + " " + type + " found" + '</p>'
        var p = document.createElement('p');
        p.innerHTML = element.trim();
        dom_element = p.firstChild
        messageElement.appendChild(dom_element);
        count_element = document.getElementById(type + "-count")
        count_element.innerHTML = size
    }

    function remove_special_chars(value) {
        value = value.trim()
        value = value.replace(/\/|\?|\.|:|#|,+/g, ' ')
        value = value.replace(/ +/g, ' ')
        value = value.replace(/'|\\|’+/g, '')
        value = value.replace(/&+/g, 'and')
        return value.toLowerCase()
    }

    function filter_list(filter, pids, pattern, result) {
        regex = new RegExp(pattern + filter, 'i');
        for ( i=0; i<pids.length; i++) {
          cleaned_pid = remove_special_chars(pids[i])
          if (cleaned_pid.match(regex) != null)
              result.add(pids[i])
        }
    }

    function populate_pattern_match_results(filter, result, type) {
        ids = data[type]
        if (type === CONDOS_TYPE){
            keys = Object.keys(ids);
            for (var i = 0; i < keys.length; i++) {
                pids = ids[keys[i]]
                filter_list(filter, pids, '', result)
            }
        } else {
            filter_list(filter, ids, '', result)
        }
    }

    function update_dom(result, type, count) {
      if (result.size > 10){
          $("#" + type + '-load-more').show()
          limit = 10
          condos_page = 1
      } else {
          $("#" + type + '-load-more').hide()
          limit = result.size
      }
      add_result_to_page(0, limit, type, Array.from(result))
      update_search_message(count, type)
    }

    function add_result_to_page(begin, end, type, data_list){
        for (var i = begin; i < end; i++){
            if (document.getElementById(data_list[i]) == null)
              add_element(data_list[i], type)
        }
    }

    $('.load_more_btn').on("click", function (){
      ctl_id = $(this).attr("id")
      ctl_type = ctl_id.split("-")[0]
      if (ctl_type === CONDOS_TYPE){
          condos_page = condos_page + 1
          new_limit = condos_page * 10
          items = Array.from(result)
      }
      else if (ctl_type === DISTRICTS_TYPE){
          districts_page = districts_page + 1
          new_limit = districts_page * 10
          items = Array.from(districts_result)
      } else if(ctl_type === SCHOOLS_TYPE){
          schools_page = schools_page + 1
          new_limit = schools_page * 10
          items = Array.from(schools_result)
      }
      add_result_to_page(new_limit - 10, new_limit, ctl_type, items)
    })

    function add_element(id, type) {
      element = '<li><button onclick="location.href=\'$element_link\'">$element_value</button></li>'
      element = element.replace('$element_link', build_link(id, type))
      element = element.replaceAll('$element_value', toTitleCase(id))
      var li = document.createElement('li');
      li.innerHTML = element.trim();
      dom_element = li.firstChild
      document.getElementById(type + "-" + page_type + "-link-results").appendChild(dom_element);
    }

    function build_link(value, type) {
      link = remove_special_chars(value)
      link = link.replace(/ +/g, '-').concat('.html')
      // root_url = './sales-trends/'
        root_url = ''
        if (type === CONDOS_TYPE) {
            if (page_type === BUY_TYPE)
                root_url = './sales-trends/'
            else
                root_url = './rental-rates/'
        } else if (type === DISTRICTS_TYPE){
            root_url = './districts/'
        } else if (type === SCHOOLS_TYPE){
            root_url = './schools/'
        }
      return root_url.concat(link)
    }

    function clear_dom(type){
      const linkResultsElement = document.getElementById(type + "-" + page_type + "-link-results");
      if (linkResultsElement)
        linkResultsElement.innerHTML = ''
    }

   $('i').on("click", function () {
      function build_target_id(argument, increament) {
         $('#' + map_id).hide()
         type_and_zoom = map_id.split('-')
         type = type_and_zoom[0]
         zoom = Number(type_and_zoom[1])
         return '' + type + "-" + String(zoom + increament)
      }
      map_id = $(this).parent().parent().attr("id")
      if ($(this).attr("id") == 'plus'){
         target_id = build_target_id(map_id, 1)
         $('#' + target_id).fadeIn()
       } else if ($(this).attr("id") == 'minus'){
         target_id = build_target_id(map_id, -1)
         $('#' + target_id).fadeIn()
       }
    })

    $('#bus-button, #mrt-button, #primary-button, #secondary-button').on("click", function() {
      $('#nearby-controls').children().removeClass('control-active')
      $(this).addClass('control-active')
      ctl_id = $(this).attr("id")
      ctl_type = ctl_id.split("-")[0]
      $('#neighbourhood-map').children().hide()
      $('#neighbourhood-details').children().hide()
      if (ctl_type == 'bus'){
        $('#' + ctl_type + '-' + '16').fadeIn()
      } else {
        $('#' + ctl_type + '-' + '14').fadeIn()
      }
      $('#nearby-' + ctl_type ).fadeIn()
    })

});
