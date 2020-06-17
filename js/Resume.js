$("body").parent().css("overflow-y","hidden");

$("#content1").click(function(){
  //alert("Hello! I am an alert box!");
  $("#test1").fadeIn();
  $("#test2").css("display","none");
  $("#test3").css("display","none");
  $("#test4").css("display","none");
});

$("#content2").click(function(){
  $("#test2").fadeIn();
  $("#test1").css("display","none");
  $("#test3").css("display","none");
  $("#test4").css("display","none");
});

$("#content3").click(function(){
  $("#test3").fadeIn();
  $("#test1").css("display","none");
  $("#test2").css("display","none");
  $("#test4").css("display","none");
});

$("#content4").click(function(){
  $("#test4").fadeIn();
  $("#test1").css("display","none");
  $("#test2").css("display","none");
  $("#test3").css("display","none");
});

