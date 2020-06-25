var testobj = [];
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
  success: function (response) {
    console.log(response);
    console.log(response.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value);
    for (i = 0; i < 22; i++) {
      for (j = 0; j < 11; j++) {
        var obj = new Object;
        obj.location = response.records.locations[0].location[i].locationName;
        obj.temperature = response.records.locations[0].location[i].weatherElement[0].time[j].elementValue[0].value;
        obj.startTime = response.records.locations[0].location[i].weatherElement[0].time[j].startTime;
        obj.endTime = response.records.locations[0].location[i].weatherElement[0].time[j].endTime;
        testobj.push(obj);
      }
    }
    //console.log(testobj);
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
  }
});

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



