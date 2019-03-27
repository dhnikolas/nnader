import VueI18n from 'vue-i18n'
import Vue from 'vue'
export default function (locale) {
  const messages = {
    en: require('locales/en'),
    ru: require('locales/ru')
  }
  Vue.use(VueI18n);
  return new VueI18n({
    locale: locale, // set locale
    messages, // set locale messages
  });
}