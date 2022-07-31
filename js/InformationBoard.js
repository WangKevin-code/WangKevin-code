const VueApp = {
    data() {
        return {
            message: 'Hello Vue.js!',
            WeatherDatas: [],
            Title: '臺灣各縣市每12小時最高溫',
            TemperatureToHigh: 31,
            TemperatureToLow: 10,
            test: true,
            CardBodyClass: "card-body",
            RedText: "text-danger",
            BlueTest: "text-info",
            Img: "temperature.jpg"
        }
    },
    methods: {
        DateTimeFormat(DateTime) {
            let datetime = new Date(DateTime);
            let Y = datetime.getFullYear();
            let M = datetime.getMonth();
            let D = datetime.getDate();
            let H = (datetime.getHours() < 10 ? '0' : '') + datetime.getHours();
            let min = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes();
            return Y + "/" + M + "/" + D + " " + H + ":" + min;
        }
    },
    components: {

    },
    computed: {
        HighTemperatureCount() {
            if (this.WeatherDatas.length > 0) {
                // console.log(this.WeatherDatas.filter(x => x.temperature > this.TemperatureToHigh).length);
                return this.WeatherDatas.filter(x => x.temperature > this.TemperatureToHigh).length;
            }
            return 0;
        },
        LowTemperatureCount() {
            if (this.WeatherDatas.length > 0) {
                // console.log(this.WeatherDatas.filter(x => x.temperature < this.TemperatureToLow).length);
                return this.WeatherDatas.filter(x => x.temperature < this.TemperatureToLow).length;
            }
            return 0;
        },
    },
    mounted() { //mounted() => 頁面渲染後載入
        axios
            .get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-A149DF45-12F5-4ABF-954A-F00471BD0D59&offset=0&format=JSON&elementName=MaxT')
            .then((response) => { // 请求失败处理
                let LocationWeatherData = response.data.records.locations[0];
                let count = LocationWeatherData.location.length;
                for (let i = 0; i < count; i++) {
                    let NowWeatherData = LocationWeatherData.location[i].weatherElement[0].time.find(x => new Date(x.startTime) < new Date() && new Date(x.endTime) > new Date());
                    if (NowWeatherData == null) {
                        NowWeatherData = LocationWeatherData.location[i].weatherElement[0].time[0];
                    }
                    let data = new Object;
                    data.locationName = LocationWeatherData.location[i].locationName;
                    data.temperature = NowWeatherData.elementValue[0].value;
                    data.measures = NowWeatherData.elementValue[0].measures;
                    data.startTime = this.DateTimeFormat(NowWeatherData.startTime);
                    data.endTime = this.DateTimeFormat(NowWeatherData.endTime);
                    this.WeatherDatas.push(data);
                }
            })
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
    }
}


const vm = Vue.createApp(VueApp).mount('#InfoBoards');