<template>
    <div>
        <div class="tabbar">
            <div class="tab active" :style="{ left: activeTab * 185 + 'px'}"></div>
            <div v-for="(tab, i) in tabs" :key="i" class="tab" @click="jump(i)">
                <image class="icon" :src="tab.icon"></image>
                <text class="title">{{tab.title}}</text>
            </div>
        </div>
        <div class="tab-panels" >
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import config from './pages/config'

    export default {
        data() {
            return {
                activeTab: 0,
                tabs: config.tabPath
            }
        },
        computed: {
        },
        methods: {
            jump(i) {
                this.activeTab=i
                let path = config.tabPath[i].path
                this.$router.push(path)
            }
        }
    }
</script>

<style scoped>
    .tabbar {
        flex-direction: row;
        background-color: #FF4563;
    }

    .tab {
        height: 120px;
        width: 185px;
        justify-content: center;
        align-items: center;
    }

    .active {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(218, 59, 85);
        transition: left 0.2s ease-in-out;
    }

    .icon {
        width: 45px;
        height: 45px;
    }

    .title {
        font-size: 28px;
        color: #FFF;
        margin-top: 10px;
    }

    .tab-panels {
        position: relative;
        width: 750px;
        flex: 1;
        flex-direction: row;
        align-items: stretch;
        background-color: #F5F5F5;
        transition: left 0.2s ease-in-out;
    }

    .panel {
        width: 750px;
        justify-content: center;
        align-items: center;
    }

    .content {
        font-size: 100px;
        color: #707070;
    }
</style>
