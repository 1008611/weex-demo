<template>
    <div class="wrapper">

    </div>
</template>

<style scoped>
    .wrapper {
        flex-direction: column;
        padding: 10px;
    }
</style>

<script>
    var stream = weex.requireModule('stream');
    const storage = weex.requireModule('storage')
    export default {
        data() {
            return {
                pagestart: '',
                pagefinish: '',
                title: '',
                error: '',
                GET_URL: 'https://cnodejs.org/api/v1/topic/',
                content:'',
            }
        },

        created: function () {
            let id=''
            storage.getItem('id', event => {
                console.log('get value:', event.data)
                id =  event.data
            })

            this.GET_URL = this.GET_URL+id

            // console.log(id)
            // this.getInitData(id)
        },
        methods: {
            getInitData(id) {
                var me = this;
                let url = me.GET_URL + id
                console.log(url)
                stream.fetch({
                    method: 'GET',
                    url: url,
                    type: 'json'
                }, function (ret) {
                    console.log(ret)
                    if (!ret.ok) {
                        me.getResult = "request failed";
                    } else {
                        console.log(  ret);
                        let data = ret.data.data

                        me.content = data.content

                    }
                }, function (response) {
                    console.log('get in progress:' + response.length);
                    me.getResult = "bytes received:" + response.length;
                });
            },
            onPageStart: function (e) {
                this.pagestart = e.url;
            },
            onPageFinish: function (e) {
                this.pagefinish = e.url;
                if (e.title) {
                    this.title = e.title;
                }
            },
            onError: function (e) {
                this.error = url;
            }
        }
    }
</script>