import { createApp } from 'vue'
import './style.css'
import { createMemoryHistory, createRouter } from 'vue-router'
import Incomes from './views/Incomes.vue'
import Orders from './views/Orders.vue'
import Sales from './views/Sales.vue'
import Stocks from './views/Stocks.vue'
import App from './App.vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const routes = [
    { path: '/', component: Incomes },
  { path: '/incomes', component: Incomes },
  { path: '/orders', component: Orders },
  { path: '/sales', component: Sales },
  { path: '/stocks', component: Stocks },
]
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App)
  .use(router).use(vuetify)
  .mount('#app')
