<template>
  <div class="chat-list" ref="chatList">
    <message-item
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
      :user="user"
    ></message-item>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import MessageItem from "./MessageItem.vue";
import { nextTick, onMounted, watch } from "@vue/runtime-core";
export default {
  props: ["messages", "user"],
  components: { MessageItem },
  setup(props) {
    const chatList = ref(null);

    onMounted(() => {
      nextTick(() => {
        chatList.value.scroll({
          top: chatList.value.scrollHeight,
          behavior: "smooth",
        });
      });
    });

    watch(
      () => props.messages,
      () => {
        nextTick(() => {
          chatList.value.scroll({
            top: chatList.value.scrollHeight,
            behavior: "smooth",
          });
        });
      }
    );

    return { chatList };
  },
};
</script>

<style>
.chat-list {
  padding: 15px 10px;
  height: 85.52vh;
  overflow-y: auto;
  width: 100%;
}
</style>
