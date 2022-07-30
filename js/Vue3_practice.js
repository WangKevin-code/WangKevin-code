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
        }
    },
    mounted() {
        setInterval(() => {
            this.counter++
        }, 1000)
    }
}


const vm = Vue.createApp(APP1).mount('#VueTest');
vm.counter = 5;
console.log(vm.counter);

