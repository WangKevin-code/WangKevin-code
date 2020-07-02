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
    $('#range_value').html('Input value is '+ $(this).val());
});

$(document).on('input change',"#ageRange", function () {
    $('#age').html('Age is '+ $(this).val());
});

$("#form2send").click(function () { 
    var checkval = 0;
    
    $("input.form2").each(function(){
        if($(this).val() == ""){
            $(this).removeClass("is-valid");
            $(this).addClass("is-invalid");
            checkval++;
        }
        else{
            $(this).removeClass("is-invalid");
            $(this).addClass("is-valid");
        }
    });
    
    if($("#CitySelect").val()==0){
        $("#CitySelect").removeClass("is-valid");
        $("#CitySelect").addClass("is-invalid");
        checkval++;
    }
    else{
        $("#CitySelect").removeClass("is-invalid");
        $("#CitySelect").addClass("is-valid");
    }

    if (checkval == 0 && $("#gridCheck").prop('checked') == true) {
        swal("填寫完畢!", "已送出", "success");
    }
    else{
        swal("還未填寫完畢!", "請確認填寫資料", "error");
        $("#gridCheck").addClass("is-invalid");
    }
    
});

$(document).ready(function () {
    
});