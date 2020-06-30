//要抓出資料的陣列
var testobj = [];
var chartemperature =[];
var charttime = [];
//select陣列
var selectlocation = [];
//bootstrapTable格式
var columns = [
  {
    field: 'location',
    title: 'location',
  }, 
  {
    field: 'startTime',
    title: 'startTime',
    sortable:true,
  }, 
  {
    field: 'endTime',
    title: 'endTime',
    sortable:true,
  },
  {
    field: 'temperature',
    title: 'MAX_temperature',
    sortable:true,
    cellStyle: degree,
  }, 
];

$.ajax({
  type: "GET",
  url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-A149DF45-12F5-4ABF-954A-F00471BD0D59&offset=0&format=JSON&elementName=MaxT",
  dataType: "json",
  async:false,
  success: function (response) {
    //console.log(response);
    for (i = 0; i < 22; i++) {
      //set location name
      selectlocation.push(response.records.locations[0].location[i].locationName);
      for (j = 0; j < 11; j++) {
        var obj = new Object;
        obj.location = response.records.locations[0].location[i].locationName;
        obj.temperature = response.records.locations[0].location[i].weatherElement[0].time[j].elementValue[0].value;
        obj.startTime = response.records.locations[0].location[i].weatherElement[0].time[j].startTime;
        obj.endTime = response.records.locations[0].location[i].weatherElement[0].time[j].endTime;
        testobj.push(obj);
      }
    }
    //console.log(chartemperature);
    $("#table").bootstrapTable({
      //url: 'js/data.json',
      search: true, //开启刷选
      columns: columns,
      data: testobj,
      pagination:true,
      pageNumber:1,
      pageSize:10,
      pageList:"[10, 20, 50, 200]",
      sortOrder: "desc",
      striped: true,              
    });
  },
  error: function(){
    alert("資料傳輸錯誤");
    window.location.href='./Dashboard.html';
  },
});


//bootstrapTable溫度顏色顯示
function degree(value, row, index) {
  if (value >= 30) {
    return {
      css: {
        background: 'red',
        color: 'white'
      }
    }
  }
  else if(value >= 20 && value < 30){
    return {
      css: {
        background: 'green',
        color: 'white'
      }
    }
  }
  return {
    css: {
      background: 'blue',
      color: 'black'
    }
  }
};


//set select
//bar chart
for (i = 0; i < selectlocation.length; i++) {
  $("#location").append("<option value=" +selectlocation[i] +">" +selectlocation[i] +"</option>");
}
//line chart
for (i = 0; i < selectlocation.length; i++) {
  $("#location2").append("<option value=" +selectlocation[i] +">" +selectlocation[i] +"</option>");
}

//抓出select選取值
//bar chart
$("#location").change(function (e) { 
  var loca =  $("#location").val(); 
  chartemperature.length = 0;//清空陣列
  charttime.length = 0;
  for (let index = 0; index < testobj.length; index++) {
    if (testobj[index].location == loca) {
      chartemperature.push(testobj[index].temperature);
      charttime.push(testobj[index].startTime);
    }
  }
  barchar(chartemperature,charttime);
  if(loca == "choice"){
    $("#chartitle").text("Please "+loca);
  }
  else{
    $("#chartitle").text(loca+"未來5日最高溫");
  }

});

//line chart
$("#location2").change(function (e) { 
  var loca =  $("#location2").val(); 
  chartemperature.length = 0;//清空陣列
  charttime.length = 0;
  for (let index = 0; index < testobj.length; index++) {
    if (testobj[index].location == loca) {
      chartemperature.push(testobj[index].temperature);
      charttime.push(testobj[index].startTime);
    }
  }
  linechart(chartemperature,charttime);
  if(loca == "choice"){
    $("#linechartitle").text("Please "+loca);
  }
  else{
    $("#linechartitle").text(loca+"未來5日最高溫");
  }

});

$(document).ready(function (){
  barchar(chartemperature,charttime);
  linechart(chartemperature,charttime);
  
});

$(".dataclear").click(function (e) { 
  chartemperature.length = 0;//清空陣列
  charttime.length = 0;
  $("#chartitle").text("Please choice");
  $("#linechartitle").text("Please choice");
});

function barchar(temperature,time) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: time,
        datasets: [{
            label: 'Max temperature',
            data: temperature,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
}

function linechart(temperature,time){
  var ctx = document.getElementById('lineChart').getContext('2d');
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: time,
        datasets: [{
            label: 'Max temperature',
            data: temperature,
            fill: true,
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor:'rgba(255, 99, 132, 1)',
            pointStyle: "circle",
            pointBackgroundColor:'rgba(255, 99, 132, 0.2)',
            pointRadius:5,
            pointHoverRadius:10,
        }]
    },
    options: {
        responsive: true,
        /*title:{
          display: true,
          fontSize: 26,
          text: "test",
        },*/
        tooltips:{
          mode:"point",
          intersect:'true',
        },
        legend:{
          position: "bottom",
          labels:{
            fontColor: 'black',
          }
        },
        scales: {
          yAxes: [{
              stacked: true
          }]
        }
    }
  });

}
