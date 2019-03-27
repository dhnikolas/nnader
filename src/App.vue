<template>
  <div id="app">
    <div class="current-auth" v-if="currentUser">
      <span class="user_login">{{ currentUser }}</span> <a v-on:click.prevent="logout">{{ $t('logout') }}</a>
    </div>
    <div class="main-title">
      <h3 class="logo">{{ $t("nblogs_adder") }}</h3>
      <h4 class="logo-title">{{ $t('chrome_extension') }}</h4>
    </div>
    <component
            :is="currentComponent"
            v-on:auth-success="authSuccess"
    ></component>
  </div>
</template>
<script>

import MainPanel from 'components/mainPanel'
import Token from 'scripts/token_model';

export default {
  name: 'app',
  components: {
    mainPanelComponent: MainPanel
  },
  data () {
    return {
      currentComponent: '',
      currentUser: ''
    }
  },

  created: async function () {
    this.renderComponents();
  },
  methods: {
    renderComponents: async function () {
      let auth;
      if(auth = await Token.isAuth()){
        this.currentComponent = 'mainPanelComponent';
        this.currentUser = auth.username;
      } else {
        this.currentComponent = 'authFormComponent';
      }
    },

    authSuccess: function (data) {
      this.currentComponent = 'mainPanelComponent';
      this.currentUser = data.username
    },
    logout: function () {
      Token.removeFromStorage();
      this.currentUser = null;
      this.currentComponent = 'authFormComponent';
    }
  }
}
</script>

<style lang="scss">

body{
  background-color: #f5f8fa;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 260px;
  a{
    cursor: pointer;
  }
  .current-auth{
    text-align: right;
    margin: 2px 0 5px;
  }

  .user_login{
    font-size: 14px;
  }
  .main-title{
    background: linear-gradient(to right, #3a68e8 0%, #499386 21%, #096fbc 51%, #5d52dd 80%, #8390e2 100%);
    border-radius: 3px;
    color: white;
    padding: 5px;
    margin-bottom: 8px;
  }
}

h1, h2 {
  font-weight: normal;
}

h1, h2, h3, h4 {
  margin: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
