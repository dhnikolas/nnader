<template>
    <div class="main-loader">
        <div  v-show="isLoadNow" class="main">
            <div class="inside"></div>
        </div>
        <div v-show="isMsg" class="main-message">{{ isMsg }}</div>
    </div>
</template>

<script>
  import {Events} from 'scripts/events';
  export default {
    name: "loadingPanel",
    data() {
      return {
        isLoadNow: false,
        isMsg: null
      }
    },
    created(){
      Events.$on('loader-is-loading', this.isLoading);
      Events.$on('loader-message', this.showMsg);
    },
    methods:{
      isLoading(isLoading){
        this.isLoadNow = isLoading;
      },
      showMsg(data){
        this.renderMsg(data.text, data.duration, data.type);
      },
      renderMsg(text, duration, type){
        let self = this;
        this.isMsg = text;
        setTimeout(function () {
          self.isMsg = null;
        }, duration * 1000);
      }
    }

  }
</script>

<style scoped>
    *{margin:0;padding:0;}
    .main-loader{
        display: inline-block;
        vertical-align: middle;
        min-width:15px;
        height:15px;
    }
    .main-message{
        display: inline-block;
        vertical-align: middle;
    }
    .main{
        width:15px;
        height:15px;
        display: inline-block;
        vertical-align: middle;
        border-radius:50%;
        position:relative;
        margin:0;
        overflow:hidden;
        -webkit-animation:spin 1s linear infinite;
        -moz-animation:spin 1s linear infinite;
        -o-animation:spin 1s linear infinite;
        -ms-animation:spin 1s linear infinite;
        animation:spin 1s linear infinite;
    }
    @-webkit-keyframes spin{
        0%{-webkit-transform:rotate(0deg);
            -moz-transform:rotate(0deg);
            -o-transform:rotate(0deg);
            -ms-transform:rotate(0deg);
            -transform:rotate(0deg);
        }
        100%{-webkit-transform:rotate(360deg);
            -moz-transform:rotate(360deg);
            -o-transform:rotate(360deg);
            -ms-transform:rotate(360deg);
            -transform:rotate(360deg);

        }
    }

    .inside{
        width:100%;
        height:50%;
        position:absolute;
        margin-top:50%;
        background:linear-gradient(to right, #3a68e8 0%, #499386 21%, #f5f8fa 51%, #f5f8fa 80%, #f5f8fa 100%);
    }
    .inside:before{
        content:'';
        width:100%;
        height:100%;
        position:absolute;
        margin-top:-50%;
        background:linear-gradient(to right, #3a68e8 0%, #499386 21%, #096fbc 51%, #5d52dd 80%, #8390e2 100%);

    }
    .inside:after{
        content:'';
        width:80%;
        height:160%;
        position:absolute;
        margin-top:-40%;
        margin-left:10%;
        background:white;
        border-radius:50%;
    }

</style>