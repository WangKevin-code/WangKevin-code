const VueApp = {
    data() {
        return {
            message: 'Hello Vue.js!',
            WeatherDatas: [],
            EditData: {
                endTime: "2022/8/26 06:00",
                locationName: "新竹縣",
                startTime: "2022/8/25 18:00",
                temperature: "123"
            },
            TableFromData: [
                {
                    id: 0,
                    name: 'Item 0',
                    price: '$0'
                },
                {
                    id: 1,
                    name: 'Item 1',
                    price: '$1'
                },
                {
                    id: 2,
                    name: 'Item 2',
                    price: '$2'
                },
                {
                    id: 3,
                    name: 'Item 3',
                    price: '$3'
                },
                {
                    id: 4,
                    name: 'Item 4',
                    price: '$4'
                },
                {
                    id: 5,
                    name: 'Item 5',
                    price: '$5'
                },
                {
                    id: 6,
                    name: 'Item 6',
                    price: '$6'
                }
            ],
            columns: [
                {
                    checkbox: true,
                    visible: true //是否顯示複選框 
                },
                {
                    field: 'id',
                    title: 'ID'
                },
                {
                    field: 'name',
                    title: 'Name'
                },
                {
                    field: 'price',
                    title: 'Price'
                }
            ],
            WeatherDatasColumns: [
                {
                    checkbox: true,
                    visible: true //是否顯示複選框 
                },
                {
                    field: 'locationName',
                    title: '縣市'
                },
                {
                    field: 'temperature',
                    title: '溫度',
                    formatter: this.formatter
                },
                {
                    field: 'startTime',
                    title: '開始時間'
                },
                {
                    field: 'endTime',
                    title: '結束時間'
                },
                {
                    field: 'button',
                    title: '',
                    formatter: this.ButtonColumns
                }
            ]
        }
    },
    methods: {
        // 顯示 Modal Table 事件
        ShowModalTable() {
            $('#TableFromData2').bootstrapTable('resetView');
        },
        //處理時間格式
        DateTimeFormat(DateTime) {
            let datetime = new Date(DateTime);
            let Y = datetime.getFullYear();
            let M = datetime.getMonth();
            let D = datetime.getDate();
            let H = (datetime.getHours() < 10 ? '0' : '') + datetime.getHours();
            let min = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes();
            return Y + "/" + M + "/" + D + " " + H + ":" + min;
        },
        //載入AXIOS GET DATA 放入 Table (AXIOS 非同步問題有 Loading 畫面處理)
        GetWeatherDatas() {
            axios
                .get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-A149DF45-12F5-4ABF-954A-F00471BD0D59&offset=0&format=JSON&elementName=MaxT')
                .then((response) => { // 请求失败处理
                    testo = response;
                    let LocationWeatherData = response.data.records.locations[0];
                    let count = LocationWeatherData.location.length;
                    for (let i = 0; i < count; i++) {
                        let NowWeatherData = LocationWeatherData.location[i].weatherElement[0].time.find(x => new Date(x.startTime) < new Date() && new Date(x.endTime) > new Date());
                        if (NowWeatherData == null) {
                            NowWeatherData = LocationWeatherData.location[i].weatherElement[0].time[0];
                        }
                        this.WeatherDatas.push({
                            locationName: LocationWeatherData.location[i].locationName,
                            temperature: NowWeatherData.elementValue[0].value,
                            measures: NowWeatherData.elementValue[0].measures,
                            startTime: this.DateTimeFormat(NowWeatherData.startTime),
                            endTime: this.DateTimeFormat(NowWeatherData.endTime)
                        });
                    }
                    $('#TableFromWeatherDatas')
                        .bootstrapTable('load', this.WeatherDatas)
                        .bootstrapTable('hideLoading');//隱藏Loading
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        //資料欄位資料呈現調整
        formatter(value, row, index) {
            return row.measures + value;
        },
        //Button formatter
        ButtonColumns(value, row, index) {
            //按鈕只能外部呼叫function
            return '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#EditModal" onclick="ShowEditModal(' + "'" + row.locationName + "'" + ')">編輯</button>' +
                '<button type="button" class="btn btn-danger" onclick="DeleteData(' + "'" + row.locationName + "'" + ')">刪除</button>';
        },
        //父子表(最左邊加號)顯示內容
        detailFormatter(index, row) {
            var html = []
            $.each(row, function (key, value) {
                html.push('<p><b>' + key + ':</b> ' + value + '</p>')
            });
            return html.join('');
        },
        //取得全部資料
        GetTableAllData() {
            console.log(JSON.stringify($('#TableFromWeatherDatas').bootstrapTable('getData')));
            alert(JSON.stringify($('#TableFromWeatherDatas').bootstrapTable('getData')))
        },
        //取得選取資料
        GetTableSelectData() {
            console.log(JSON.stringify($('#TableFromWeatherDatas').bootstrapTable('getSelections')));
            alert(JSON.stringify($('#TableFromWeatherDatas').bootstrapTable('getSelections')))
        },
        //刪除選取資料
        DeleteSelectData() {
            var locationName = $.map(
                $('#TableFromWeatherDatas').bootstrapTable('getSelections'),
                function (row) {
                    return row.locationName;
                });

            $('#TableFromWeatherDatas').bootstrapTable('remove',
                {
                    field: 'locationName',
                    values: locationName
                });
        },
        //刪除選取資料
        DeleteData(locationName) {
            let remoedata = [];
            remoedata.push(locationName);
            $('#TableFromWeatherDatas').bootstrapTable('remove',
                {
                    field: 'locationName',
                    values: remoedata
                });
        },
        //新增資料
        AddNewDataToTable() {
            //newData需要追加的新数据
            var newData = [
                {
                    locationName: "新增資料1",
                    temperature: "10",
                    measures: "溫度",
                    startTime: "2022/8/25 06:00",
                    endTime: "2022/8/26 06:00"
                },
                {
                    locationName: "新增資料2",
                    temperature: "10",
                    measures: "溫度",
                    startTime: "2022/8/25 06:00",
                    endTime: "2022/8/26 06:00"
                }];

            $('#TableFromWeatherDatas').bootstrapTable('prepend', newData);
        },
        //將資料顯示到彈出視窗
        ShowEditModal(locationName) {
            var row = $('#TableFromWeatherDatas').bootstrapTable('getRowByUniqueId', locationName);
            this.EditData.locationName = row.locationName;
            this.EditData.temperature = row.temperature;
            this.EditData.startTime = row.startTime;
            this.EditData.endTime = row.endTime;
        },
        //更新資料
        UpdateData() {
            $('#TableFromWeatherDatas').bootstrapTable('updateByUniqueId', {
                id: this.EditData.locationName,
                row: {
                    temperature: this.EditData.temperature,
                    startTime: this.EditData.startTime,
                    endTime: this.EditData.endTime
                }
            });
        }
    },
    components: {

    },
    computed: {

    },
    beforeMount() {

    },
    mounted() { //mounted() => 頁面渲染後載入

        $('#TableFromData').bootstrapTable({ data: this.TableFromData });

        $('#TableFromData2').bootstrapTable({ data: this.TableFromData });

        $('#TableFromWeatherDatas')
            .bootstrapTable({
                columns: this.WeatherDatasColumns,
                /**設置自訂義工具欄***/
                //Html data-toolbar="#toolbar"

                /*****示詳細視圖****/
                showToggle: true, //是否顯示詳細視圖和列表視圖的切換按鈕
                cardView: false, //是否顯示詳細視圖

                /*****顯示父子表(最左邊加號)****/
                detailView: true, //是否顯示父子表
                detailFormatter: this.detailFormatter, //定义详情显示函数

                /******分頁********/
                pagination: true, //是否顯示分頁（*）
                pageSize: 5, //每頁的記錄行數（*）
                pageList: [5, 10, 20],

                /******搜索********/
                search: true, //是否顯示表格搜索

                /******所引鍵********/
                uniqueId: "locationName",

                /*****Table 樣式***/
                //classes: "table table-bordered table-striped table-sm table-dark", //table-striped表示隔行变色

                /******自訂等待載入圖示或文字********/
                formatLoadingMessage: function () {
                    return '<i class="fa fa-spinner fa-spin fa-fw fa-2x"></i>';
                },

                /******所有Cell點擊事件********/
                onClickCell: function (field, value, row, $element) {
                    console.log(field);
                    console.log(value);
                    console.log(row);
                    console.log($element);
                }
            })
            .bootstrapTable('showLoading')//Loading 圖示;
        this.GetWeatherDatas();

    }
};

const vm = Vue.createApp(VueApp);

const vms = vm.mount('#BootstrapTable');

function ShowEditModal(locationName) {
    vms.ShowEditModal(locationName);
}

function DeleteData(locationName) {
    vms.DeleteData(locationName);
}