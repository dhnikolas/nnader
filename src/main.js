import Vue from 'vue'
import VueResource from 'vue-resource'
import AsyncComputed from 'vue-async-computed';
import App from './App.vue'
import Locale from 'locales/locale'
import AuthFormComponent from 'components/authForm';

/* Подключение плагинов */
//Плагин для http запросов исоздания ресурсов на их основе
Vue.use(VueResource);
Vue.use(AsyncComputed);

/* Инициализация классов */
//В библиотеке i18n нужно передать именно переменную с таким названием
let i18n = new Locale('ru');

/* Объявление компонентов */
Vue.component('authFormComponent', AuthFormComponent);

/* Инициализая главного компонента. Старт приложения */
new Vue({
  el: '#app',
  render: h => h(App),
  i18n
});
