<template>
    <scroller>
        <div class="group" v-for="(item,index) in list" :key="index">
            <div class="user-header">
                <div class="user-left">
                    <image class="profile_image" :src="item.author.avatar_url"></image>
                    <text class="user-name">{{item.author.loginname}}</text>
                </div>

                <text class="create-time">{{item.create_at}}</text>
            </div>


            <text class="content-text" @click="jump2Detail(item.id)">{{item.title}}</text>

        </div>
        <loading class="loading" @loading="onloading" :display="loadinging ? 'show' : 'hide'">
            <loading-indicator class="indicator"></loading-indicator>
        </loading>
    </scroller>
</template>

<script>
    var stream = weex.requireModule('stream');
    const storage = weex.requireModule('storage')
    const modal = weex.requireModule('modal')
    export default {
        data() {
            return {
                getResult: 'loading...',
                list: [],
                loadinging: false,
                GET_URL: 'https://cnodejs.org/api/v1/topics?page=',
                page: 1
            }
        },
        created: function () {
            var me = this;
            me.getData()
        },
        methods: {
            onloading(event) {
                modal.toast({message: 'Loading', duration: 1})
                this.page = this.page + 1
                this.getData()
            },
            getData() {
                let self = this;
                let url = self.GET_URL + '' + self.page
                console.log(url)
                self.loadinging = true
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
            //跳转到详情页
            jump2Detail(id) {
                console.log(id)
                modal.toast({ 'message': '暂未开放', 'duration': 1 });
                // storage.setItem('id', id, event => {
                //     console.log('set success')
                //     this.$router.push('/cnode')
                //
                // })
            }
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