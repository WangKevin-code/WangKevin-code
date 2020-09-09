new Vue({
    el:'#app',
    data:{
        number:0,
        btn_number:1,
        calaulator_number:0,
        calaulator_previous:0,
        calaulator_next:0,
        Operator:'',
    },
    methods:{
        reset(){
            this.number = 0
        },
        add(){
            if(this.btn_number=='')
            {
                alert('請輸入要兂檢的數量')
            }
            else{
                this.number = this.number + parseInt(this.btn_number)
            }
        },
        Subtract(){
            if(this.btn_number=='')
            {
                alert('請輸入要兂檢的數量')
            }
            else{
                this.number = this.number - parseInt(this.btn_number)
            }
        },
        calaulator_clear(){
            this.calaulator_number = 0
            this.calaulator_previous = 0
            this.calaulator_next = 0
        },
        equal(){
            this.calaulator_next = parseFloat(this.calaulator_number)
            if (this.Operator == '-') {
                this.calaulator_number = this.calaulator_previous - this.calaulator_next
            }
            else if(this.Operator == '+'){
                this.calaulator_number = this.calaulator_previous + this.calaulator_next
            }
            else if(this.Operator == '*'){
                this.calaulator_number = this.calaulator_previous * this.calaulator_next
            }
            else if(this.Operator == '/'){
                this.calaulator_number = this.calaulator_previous / this.calaulator_next
            }
            this.Operator = 0
        },
        calaulator_add(){
            this.calaulator_previous = parseFloat(this.calaulator_number)
            this.calaulator_number = '+'
            this.Operator = '+'
        },
        calaulator_subtract(){
            this.calaulator_previous = parseFloat(this.calaulator_number)
            this.calaulator_number = '-'
            this.Operator = '-'
        },
        calaulator_multiplicate(){
            this.calaulator_previous = parseFloat(this.calaulator_number)
            this.calaulator_number = '*'
            this.Operator = '*'
        },
        calaulator_division(){
            this.calaulator_previous = parseFloat(this.calaulator_number)
            this.calaulator_number = '/'
            this.Operator = '/'
        },
        input_number(value){
            if(this.calaulator_number == 0 || this.calaulator_number == '+' || this.calaulator_number == '-' || this.calaulator_number == '*'||this.calaulator_number == '/'){
                this.calaulator_number = value
            }
            else{
                this.calaulator_number = String(this.calaulator_number)+String(value)
            }
        }
    }
})