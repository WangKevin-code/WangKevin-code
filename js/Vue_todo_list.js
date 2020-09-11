new Vue({
    el:'#app',
    data:{
        input_todo:'',
        todos:[],
        done_todos:[],
        change:'',//要被編輯的索引值
    },
    methods:{
        addlist(){
            if (this.input_todo =='') {
                alert('Please input your list.')
            }
            else{
                this.todos.push(this.input_todo)
            }
            this.input_todo = ''
        },
        deletelist(list){
            console.log(list)
            var del = this.todos.indexOf(list)
            if (del > -1) {
                this.todos.splice(del,1)
            }
        },
        deletedonelist(list){
            var del = this.done_todos.indexOf(list)
            if (del > -1) {
                this.done_todos.splice(del,1)
            }
        },
        editlist(list){
            console.log(list)
            $('#edit_input').val(list)
            this.change = this.todos.indexOf(list)
        },
        save_change(){
            console.log($('#edit_input').val())
            if (this.change > -1) {
                this.todos.splice(this.change,1,$('#edit_input').val())
            }
            $('#exampleModalLong').modal('hide')
        },
        done(list){
            this.done_todos.push(list)
            var del = this.todos.indexOf(list)
            if (del > -1) {
                this.todos.splice(del,1)
            }
        }
    },
})