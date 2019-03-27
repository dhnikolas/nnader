<template>
    <div class="main-panel">
        <div class="add-post-panel">
            <div class="add-post-button" v-for="set in availableSettings">
                <button class="minimal"  v-on:click.prevent="addPost(set.discussion_id)">{{ set.name }}</button>
                <a v-on:click.prevent="removeSetting(set.id)">X</a>
            </div>
        </div>
        <div class="settings-button">
            <loading-component></loading-component>
            <a v-on:click.prevent="settings = !settings">{{ $t('settings') }}</a>
        </div>
        <settings-component v-if="settings" v-on:settings-changed="settingsChanged"></settings-component>
    </div>
</template>

<script>
  import SettingsComponent from 'components/settings';
  import LoadingPanelComponent from 'components/loadingPanel';
  import Settings from 'scripts/settings_model';
  import ClipboardHelper from 'scripts/clipboard_helper';
  import Post from 'scripts/forum/post_model';
  import LoaderController from 'scripts/loader_controller';

  export default {
    name: "main-panel",
    components: {
      settingsComponent: SettingsComponent,
      loadingComponent: LoadingPanelComponent
    },
    data() {
      return {
        settings: false,
        availableSettings: [],
        currentDiscussionId: null
      }
    },

    created: async function () {
      //console.log(await ClipboardHelper.getSelection());
      //Тут вешаем событие на прослушивание вставки текста, для того что бы этот текст перехватить)
      ClipboardHelper.initListener(this.receiveBuffer);

      this.availableSettings = await Settings.getSettings();
    },

    methods: {
      settingsChanged: async function () {
        this.availableSettings = await Settings.getSettings();
      },

      removeSetting: async function (id) {
        this.availableSettings = await Settings.removeSetting({id: id});
      },

      addPost: function (discussion_id) {
        LoaderController.loadStart();
        this.currentDiscussionId = discussion_id;
        ClipboardHelper.executeCopy();
      },

      receiveBuffer: function (e) {
        let text = ClipboardHelper.getTextFromEvent(e);
        let result = Post.save({discussion_id: this.currentDiscussionId, body: text.html});
        console.log(text);
        if(result){
          LoaderController.loadStopWithMsg(this.$t('added'), 2);
        } else {
          console.log('error');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.settings-button{
    margin-top: 5px;
    a{
        float: right;
    }
}
.add-post-button{
    margin: 0 4px 4px 0;
    display: inline-block;
}

button.minimal {
    background: #e3e3e3;
    border: 1px solid #bbb;
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 1px 1px #f6f6f6;
    box-shadow: inset 0 0 1px 1px #f6f6f6;
    color: #333;
    font: bold 12px/1 "helvetica neue", helvetica, arial, sans-serif;
    padding: 4px 3px 5px 3px;
    text-align: center;
    text-shadow: 0 1px 0 #fff;
    min-width: 80px; }
button.minimal:hover {
    background: #d9d9d9;
    -webkit-box-shadow: inset 0 0 1px 1px #eaeaea;
    box-shadow: inset 0 0 1px 1px #eaeaea;
    color: #222;
    cursor: pointer; }
button.minimal:active {
    background: #d0d0d0;
    -webkit-box-shadow: inset 0 0 1px 1px #e3e3e3;
    box-shadow: inset 0 0 1px 1px #e3e3e3;
    color: #000; }

</style>