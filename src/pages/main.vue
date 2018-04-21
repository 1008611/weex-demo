<template>
    <scroller>
        <div class="group" v-for="(item,index) in list" :key="index">
            <div class="user-header">
                <div class="user-left">
                    <image class="profile_image" :src="item.profile_image"></image>
                    <text class="user-name">{{item.screen_name}}</text>
                </div>

                <text class="create-time">{{item.passtime}}</text>
            </div>

            <text class="content-text">{{item.text}}</text>

            <video v-if="item.videotime>0" class="video" :src="item.videouri" :style="{height:item.height+'px'}"
                   autoplay controls ></video>
            <image v-else class="image" :style="{height:item.height+'px'}"
                   :src="item.cdn_img"></image>
        </div>
        <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
            <loading-indicator class="indicator"></loading-indicator>
        </loading>
    </scroller>
</template>

<script>
    var stream = weex.requireModule('stream');
    const modal = weex.requireModule('modal')
    export default {
        data() {
            return {
                getResult: 'loading...',
                list: [],
                loadinging: false,
                GET_URL: 'https://www.apiopen.top/satinApi?type=1&page=',
                page:1
            }
        },
        created: function () {
            var me = this;
            me.getData()
        },
        methods: {
            onloading(event) {
                modal.toast({message: 'Loading', duration: 1})
               this.page++
                this.getData()
            },
            getData(i) {
                let self =this
                let url = self.GET_URL + "" + self.page
                console.log(url)
                this.loadinging = true
                stream.fetch({
                    method: 'GET',
                    url: url,
                    type: 'json'
                }, function (ret) {
                    console.log(ret)
                    if (!ret.ok) {
                        self.getResult = "request failed";
                    } else {
                        console.log('get:' + ret);
                        let data = ret.data.data
                        data.forEach(item => {
                            self.list.push(item)
                        })
                        self.loadinging = false
                    }
                }, function (response) {
                    console.log('get in progress:' + response.length);
                    self.getResult = "bytes received:" + response.length;
                });
            },
        }

    };
</script>

<style scoped>
    .group {
        margin-left: 32px;
        margin-right: 32px;
        margin-bottom: 32px;
        width: 700px;
    }

    .user-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 700px;
        margin-left: 0px;
    }

    .user-left {
        display: flex;
        flex-direction: row;
    }

    .profile_image {
        height: 50px;
        width: 50px;
        border-radius: 25px;
    }

    .user-name {
        margin-left: 5px;
        margin-top: 13px;
        font-size: 12px;
        color: #00B4FF;
    }

    .create-time {
        margin-right: 0px;
        font-size: 12px;
        margin-top: 13px;
        color: #00B4FF;
    }

    .content-text {
        width: 650px;
        margin-left: 40px;
        color: #666;
        justify-content: center;
        margin-top: 20px;
        font-size: 18px;
    }

    .image {
        width: 700px;
    }

    .video {
        width: 700px;
        margin-top: 60px;
        margin-left: 60px;
    }
</style>