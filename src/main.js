import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible/flexible'
import 'balloon-css';
import 'animate.css';
import {
    Lazyload,
    Loading,
    Search,
    Popup,
    ConfigProvider,
    Empty,
    SwipeCell,
    Overlay,
    Icon,

} from 'vant';
const app = createApp(App)

// const loadimage = require('@/views/loading.png')
app.use(router)
app.use(Lazyload, {
    // loading: loadimage,
})

app.use(Loading)
app.use(Search)
app.use(ConfigProvider)
app.use(Popup)
app.use(Empty)
app.use(SwipeCell)
app.use(Overlay)
app.use(Icon)
















app.mount('#app')