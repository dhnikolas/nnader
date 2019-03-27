<template>
    <div class="settings">
        <h4>
            {{ $t('where_save') }}
        </h4>
        <p class="settings-description">
            {{ $t('chose_desc') }}
        </p>
        <div class="form-settings">
            <select class="category-select" id="category-select" v-model="selectedCategory">
                <option selected disabled value="empty">{{$t('choose_category')}}</option>
                <option v-if="categories"  :value="value.id" v-for="(value, key) in categories">{{value.name}}</option>
            </select>
            <select v-if="!Object.keys(discussions).length == 0" class="discussion-select" id="discussion-select" v-model="selectedDiscussion">
                <option selected disabled value="empty">{{$t('choose_entry')}}</option>
                <option :value="discussion.id" v-for="(discussion, key) in discussions">{{discussion.title}}</option>
            </select>
            <a v-if="selectedDiscussion && selectedDiscussion !== 'empty'"  v-on:click.prevent="addSetting">{{ $t('add') }}</a>
        </div>
    </div>
</template>

<script>
  import Categories from 'scripts/forum/category_model';
  import Discussions from 'scripts/forum/discussion_model';
  import Settings from 'scripts/settings_model';

  export default {
    name: "settings",
    data(){
      return {
        categories: {},
        discussions: {},
        selectedCategory: 'empty',
        selectedDiscussion: 'empty',
        settingsList: []
      }
    },
    asyncComputed: {
      async getDiscussions(){
       if(!this.selectedCategory) return;
       this.selectedDiscussion = 'empty';
       this.discussions = await Discussions.get({category_id: this.selectedCategory});

      }
    },
    created: function () {
      this.initSettings();
    },
    methods: {
      initSettings: async function(){
        this.settingsList = await Settings.getSettings();
        this.categories = await Categories.get();
      },
      addSetting: async function () {
        let newSetting = {
          name: this.discussions[this.selectedDiscussion].title,
          category_id: this.selectedCategory,
          discussion_id: this.selectedDiscussion
        };
        let allSettings = await Settings.addNewSetting(newSetting);
        this.selectedCategory = 'empty';
        this.selectedDiscussion = 'empty';
        this.discussions = [];
        this.settingsList = allSettings;
        this.$emit('settings-changed');
      }
    }
  }
</script>

<style scoped>
    .settings select{
        width: 80px;
    }
    .settings{
        border-top: 1px dashed #42b983;
        padding-top: 8px;
        margin-top: 5px;
    }
    .settings p{
        margin: 5px 0 5px;
    }
</style>