<template>
    <wxc-tab-bar :tab-titles="tabTitles"
                 :tab-styles="tabStyles"
                 title-type="icon"
                 @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">

        <div class="item-container" :style="contentStyle">
            <!--<router-view></router-view>-->
            <main></main>
        </div>
        <div class="item-container" :style="contentStyle">
            <!--<router-view></router-view>-->
            <jock></jock>
        </div>
        <div class="item-container" :style="contentStyle">
            <!--<router-view></router-view>-->
            <image></image>
        </div>
        <div class="item-container" :style="contentStyle">
            <!--<router-view></router-view>-->
            <video></video>
        </div>

    </wxc-tab-bar>


</template>

<script>
    import {WxcTabBar, Utils} from 'weex-ui';
    import Config from './config'

    import main from './main'
    import jock from './jock'
    import image from './image'
    import video from './video'

    export default {
        name: 'App',
        components: {WxcTabBar,main,jock,image,video},
        data() {
            return {
                tabTitles: Config.tabTitles,
                tabStyles: Config.tabStyles,
                tabPath: Config.tabPath,
            }
        },
        created() {
            const tabPageHeight = Utils.env.getPageHeight();
            // 如果页面没有导航栏，可以用下面这个计算高度的方法
            // const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
            const {tabStyles} = this;
            this.contentStyle = {height: (tabPageHeight - tabStyles.height) + 'px'};

        },
        methods: {
            wxcTabBarCurrentTabSelected(e) {
                const index = e.page;
                let tabPath = this.tabPath[index].path
                console.log(tabPath)
                this.$router.push(tabPath)
            }
        }
    }
</script>

<style scoped>

    .item-container {
        width: 750px;
        background-color: #999;
        align-items: center;
        justify-content: center;
    }
</style>
