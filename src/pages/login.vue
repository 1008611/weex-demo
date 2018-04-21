<template>
    <div class="wrapper-login" style="flex:1">

        <image style="flex:1"
               src="http://oims9p4rv.bkt.clouddn.com/image.jpg"></image>
        <wxc-overlay
                :show="show"
                opacity="0.6"
                @wxcOverlayBodyClicked="wxcOverlayBodyClicked"></wxc-overlay>
    </div>
</template>

<script>
    import {WxcOverlay} from 'weex-ui';

    export default {
        name: 'App',
        components: {WxcOverlay},
        data() {
            return {
                show: true,
                height:''
            }
        },
        create(){
        },
        methods: {
            wxcOverlayBodyClicked() {
                this.show = false;
                this.$router.push('/admin')
            }
        }
    }
</script>

<style scoped>


    .wrapper-login {
        background-color: #0088fb;
        width: 750px;
    }

    .image {
        width: 750px;
        height: 800px;
    }

    .btn-txt {

        font-size: 100px;
        color: aqua;
        padding: 10px;
        width: 100%;
    }

</style>
