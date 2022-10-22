const vm = Vue.createApp({
    data() {
        return {
            message: '123',
            toggleData: [
                {
                    pageid: "test",
                    visable: true
                },
                {
                    pageid: "test2",
                    visable: false
                },
                {
                    pageid: "test3",
                    visable: true
                }
            ],
            test: false
        }
    },
    methods: {
        updatapagevisable(pageid, visable) {
            console.log(pageid, visable);
        },
    },
    components: {

    },
    computed: {


    },
    mounted() {

    }
}).mount('#BootstrapToggle');;

function updatapagevisable(data) {
    vm.updatapagevisable(data.getAttribute("pageid"), $(data).prop("checked"));
}
