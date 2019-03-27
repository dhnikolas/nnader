<template>
    <div class="auth_form_wrapper">
        <form class="auth_form" v-on:submit.prevent="submitAuthForm">
            <ul>
                <li class="error-message" v-for="error in formData.errors">{{ error }}</li>
            </ul>
            <input type="text" id="auth_form__login" :placeholder="$t('login')" v-model="formData.login">
            <input type="password" id="auth_form__password" :placeholder="$t('password')" v-model="formData.password">
            <input type="submit" :value="$t('enter')">
        </form>
        <loading-component></loading-component>
    </div>
</template>

<script>

import TokenModel from 'scripts/token_model';
import LoaderComponent from 'components/loadingPanel';
import LoaderController from 'scripts/loader_controller';
export default {

  data() {
    return {
      formData:{
        login: '',
        password: '',
        errors: []
      }
    }
  },
  components: {
    loadingComponent: LoaderComponent
  },

  methods: {

    submitAuthForm: async function (e) {
      if(!this.validateForm()) return;

      try {
        LoaderController.loadStart();
        let auth = await TokenModel.create(this.formData.login, this.formData.password);
        LoaderController.loadStop();
        this.$emit('auth-success', {username: this.formData.login});

      } catch (e) {
        LoaderController.loadStop();
        switch(e.response.status){
          case 401:
            this.formData.errors.push(this.$t('wrong_login_or_password'));
        }
      }
    },

    validateForm: function () {
      let is_valid = true;
      this.formData.errors = [];

      if(!this.formData.login.length){
        this.formData.errors.push(this.$t('login_require'));
        is_valid = false;
      }
      if(!this.formData.password.length){
        this.formData.errors.push(this.$t('password_require'));
        is_valid = false;
      }
      return is_valid;
    }
  }
};
</script>

<style scoped>
.error-message{
    color: #ff1906;
}

.auth_form{
    margin-bottom: 5px;
}
</style>