var div0position = $('#div0').position().top - 50 + 'px';
var div1position = $('#div1').position().top - 50 + 'px';
var div2position = $('#div2').position().top - 50 + 'px';
var div3position = $('#div3').position().top - 50 + 'px';


$("#content1").click(function(){
  $("body, html").animate({
    scrollTop: div0position
  }, 500)
  $("#div0").animate({
    scrollTop: div1position
  }, 500)
});

$("#content2").click(function(){
  $("body, html").animate({
    scrollTop: div0position
  }, 500)
  $("#div0").animate({
    scrollTop: div2position
  }, 500)
})

$("#content3").click(function(){
  $("body, html").animate({
    scrollTop: div0position
  }, 500)
  $("#div0").animate({
    scrollTop: div3position
  }, 500)
});


$("#content1").mousedown(function () { 
  $("#content1").addClass("text-white");
});
$("#content1").mouseup(function () { 
  $("#content1").removeClass("text-white");
});
$("#content2").mousedown(function () { 
  $("#content2").addClass("text-white");
});
$("#content2").mouseup(function () { 
  $("#content2").removeClass("text-white");
});
$("#content3").mousedown(function () { 
  $("#content3").addClass("text-white");
});
$("#content3").mouseup(function () { 
  $("#content3").removeClass("text-white");
});
