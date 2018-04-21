/*global Vue*/
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Video from '@/pages/video'
import Jock from '@/pages/jock'
import Main from '@/pages/main'
import Admin from '@/pages/admin'
import Login from '@/pages/login'
import Image from '@/pages/image'
import cnode from '@/pagedetail/cnode'

Vue.use(Router)

module.exports = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/cnode',
            name: 'cnode',
            component: cnode
        }, {
            path: '/admin',
            name: 'admin',
            component: Admin,

        }, {
            path: '/',
            name: 'main',
            component: Main
        },{
            path: '/main',
            name: 'main',
            component: Main
        }, {
            path: '/image',
            name: 'image',
            component: Image
        }, {
            path: '/video',
            name: 'video',
            component: Video
        }, {
            path: '/jock',
            name: 'jock',
            component: Jock
        }

    ]
})
