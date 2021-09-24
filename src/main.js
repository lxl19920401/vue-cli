// import './assets/index.css'
// import './assets/2.less'
// require('./assets/test.jpg')
// console.log('main.js')
import Vue from 'vue'
import App from './App'
import router from "@/router";
new Vue({

    render:h=>h(App),
    router,
}).$mount('#app')
