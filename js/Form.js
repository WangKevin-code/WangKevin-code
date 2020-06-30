$("#inputbtn2").click(function (e) { 
    var showinput2 = $("#input2").val();
    alert(showinput2);
});

$("#dropdown1").children(".dropdown-item").click(function (e) { 
    var showselect = $(this).text();
    $("#dropdownbtn1").text(showselect);
    //console.log(showselect);
});

$("#inputGroupSelect01").change(function (e) { 
    var showoption = $(this).val();
    //console.log(showoption);
});

$("#changecheckbox").toggle(
    function(){
        $("#defaultCheck1").prop('checked', true);
        $("#defaultCheck2").prop('checked', true);
        
    },
    function(){
        $("#defaultCheck1").prop('checked', false);
        $("#defaultCheck2").prop('checked', false);
    },
);

$("#showcheckbox").click(function (e) { 
    var checkbox = $("input.form-check-input").map(function(){
        if ($(this).prop('checked') == true) {
            return $(this).val();
        }
        }).get();
    alert(checkbox);
});

$(document).on('input change',"#formControlRange", function () {
    $('#range_value').html('Input range is '+ $(this).val() );
});