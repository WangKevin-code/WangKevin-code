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
