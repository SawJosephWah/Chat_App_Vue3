<template>
  <div>
    <div class="chat-screen">
      <left-chat-screen></left-chat-screen>
      <div class="chat">
        <router-view :key="Math.random()"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftChatScreen from "./LeftChatScreen.vue";

export default {
  components: { LeftChatScreen },
};
</script>

<style>
.chat-screen {
  display: flex;
}
.chat {
  width: 75%;
  height: 100vh;
}
</style>
