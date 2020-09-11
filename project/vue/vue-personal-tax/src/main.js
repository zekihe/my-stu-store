import Vue from 'vue'
import App from './app.vue'


new Vue({
  render: h => h(App)
}).$mount('#app')

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })   //报错不显示，改为render加载

// let root = document.createElement('div');
// document.body.append(root)

// new Vue({
//   render: h => h(App)
// }).$mount(root)

