const Todo = {
    props: ['todos'],
    template: `<li>{{ todos.text }}</li>`
}

const APP1 = {
    data() {
        return {
            counter: 0,
            title: 'You loaded this page on ' + new Date().toLocaleString(),
            message: 'Hello Vue.js!',
            TwoWayData: "TwoWayData",
            seen: true,
            rawHtml: '<span style="color: red">This should be red.</span>',
            firstName: "Kevin",
            lastName: "Wang",
            todos2: [],
            todos: [
                { text: 'Learn JavaScript' },
                { text: 'Learn Vue' },
                { text: 'Build something awesome' }
            ],
            groceryList: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ],
            author: {
                name: 'John Doe',
                books: [
                    'Vue 2 - Advanced Guide',
                    'Vue 3 - Basic Guide',
                    'Vue 4 - The Mystery'
                ]
            }
        }
    },
    methods: {
        reverseMessage() {
            this.message = this.message
                .split('')
                .reverse()
                .join('')
        },
        CounterClear() {
            //一定要加this
            this.counter = 0;
        },
        add() {
            this.author.books.push("Vue 5 - The Mystery");
        },
        test() {
            //無法使用ref方式取得子元素
            //console.log(this.$refs.box.getBoundingClientRect());
            //無法取得document.getElementById("test")
            //console.log(document.getElementById("test").getBoundingClientRect());

            if (document.getElementById("test") != null) {
                console.log(document.getElementById("test").getBoundingClientRect());
            }
            else {
                console.log(document.getElementById("test"));
            }
            //第一次無法取得
            return $("#test").attr("style");
        }
    },
    components: {
        Todo, // 注册一个新组件
    },
    computed: {
        publishedBooksMessage() {
            // `this` 指向 vm 实例
            return this.author.books.length;
        },
        fullName: {
            // getter
            get() {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set(newValue) {
                const names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        },
        testtodo() {
            return this.todos;
        }

    },
    mounted() {
        setInterval(() => {
            this.counter++;
            console.log(this.groceryList.find(x => x.id == 1).text);
            this.groceryList.find(x => x.id == 1).text = this.counter;


        }, 1000);

        console.log($("#test").attr("style"));
    }
}


const vm = Vue.createApp(APP1).mount('#VueTest');
vm.counter = 5;
console.log(vm.counter);

//一般
// $("[statue = 1]").filter(function () {
//     return this.attributes["differ"].value > 10;
// }).addClass("greenText").removeClass("redText");

//lambda
$("[statue = " + 3 + "]")
    .filter((x, i) => i.attributes["differ"].value > 11)
    .addClass("greenText")
    .removeClass("redText");

setInterval(() => {

    vm.todos2.push({ id: vm.counter, text: 'Vegetables' });
    vm.todos2.find(x => x.id == 6).text = vm.counter;
}, 1000);