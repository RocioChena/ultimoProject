import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';



Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

axios.get('endpoint', {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type':'application/json',
  },
  params: {
    id: 1
  }
}
)
.then((res) => {
console.log(res)
})