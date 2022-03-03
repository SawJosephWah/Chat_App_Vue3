<template>
  <form @submit.prevent="sendMessage">
    <div class="message-box">
      <input type="text" v-model="text" id="" placeholder="Send Message..." />
      <i class="fas fa-paper-plane" @click="sendMessage"></i>
    </div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
import { db } from "../../../firebase/init";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    // console.log(route.params.user_id);

    const authUser = inject("authUser");
    const text = ref("");
    const sendMessage = async () => {
      if (text.value.length != 0) {
        // console.log(text.value);
        let newMessage = {
          text: text.value,
          createdAt: new Date().toString(),
          uid: authUser.uid,
        };
        text.value = "";

        const collectionRef = db.collection("chats");
        await collectionRef
          .doc(`${authUser.uid}+${route.params.user_id}`)
          .collection("messages")
          .add(newMessage);

        delete newMessage.uid;

        await collectionRef
          .doc(`${route.params.user_id}+${authUser.uid}`)
          .collection("messages")
          .add(newMessage);
      }
    };
    return { text, sendMessage };
  },
};
</script>

<style>
.message-box {
  position: fixed;
  bottom: 0;
  width: 75%;
  background: var(--primary);
  padding: 15px 10px;
  display: flex;
  align-items: center;
}
input {
  width: 100%;
  background: var(--input-background);
  outline: none;
  border: none;
  outline: none;
  padding: 12px 20px;
  border-radius: 50px;
  color: var(--input-color);
}
input::placeholder {
  color: var(--input-color);
}
.message-box .fas {
  padding: 12px;
  cursor: pointer;
  background: var(--input-background);
  border-radius: 50%;
  margin-left: 10px;
}
</style>
