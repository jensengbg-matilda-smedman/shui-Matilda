<template>
  <div class="settings">
    <h1>streams</h1>
    <article class="hashArt" > 
      <div v-for="(followed, index) in followds.data" :key="index" :hashtag="followed" class="followedHashtags">{{ followed }} 
        <p class="remove" @click="removeHashtag(index)">X</p>
      </div>
    </article>
    <input v-model="hashtag" class="hashtag" placeholder="#hashtags"/>
    <button @click="addHashtag(hashtag)">add Hashtag</button>
    <button @click="deleteUser">Shit, theyre on to me!</button>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      hashtag: '',
      followed: ''
    };
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("deleteUser");
    },
    addHashtag(hashtagValue) {
      this.$store.dispatch("addHashtag", hashtagValue);
    },
    removeHashtag(index) {
      this.$store.dispatch("removeHashtag", index);  
    }
  },
  beforeMount() {
     this.$store.dispatch('followedHashtags');
  },
  computed: {
    allHashtags() {
      return this.$store.getters.allHashtags;
    },
    followds() {
      return this.$store.state.followed
    },
  },
};
</script>

<style scoped>
.settings {
  width: 100%;
  background-color: #ef4343;
}
h1 {
  width: 347px;
  height: 48px;
  left: 32px;
  top: 74px;

  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 150%;
  /* identical to box height, or 48px */

  display: flex;
  align-items: center;

  color: #ffffff;
}
button {
  width: 347px;
  height: 72px;
  left: 32px;
  top: 499px;
  margin: 1rem;
  background: #ef4343;
  border-radius: 4px;
  color: #ffffff;
  font-family: PT Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 150%;
}
.hashArt {
  display: flex;
  justify-content: space-around;
}
.followedHashtags {
  max-width: 20%;
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
}
.remove {
  margin-top: 0;
  margin-left: 0.5rem;
  background-color:  rgba(255, 255, 255, 0.2);;
}
input {
  margin-top: 1rem;
  width: 347px;
  height: 72px;
  background-color: #082756;
  border: 1px solid #ffffff;
  color: #ffffff;
  box-sizing: border-box;
  border-radius: 3px;
  margin-bottom: 1rem;
}
::-webkit-input-placeholder {
  text-align: center;
  color: #ffffff;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.3em;
}
:-moz-placeholder {
  text-align: center;
}
</style>