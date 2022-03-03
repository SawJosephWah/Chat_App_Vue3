<template>
  <div>
    <loading v-if="fetchLoading"></loading>
    <div v-else>
      <chat-header :user="user"></chat-header>
      <message-list :messages="messages" :user="user"></message-list>
      <message-box></message-box>
    </div>
  </div>
</template>

<script>
import { inject, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { db } from "../../../firebase/init";
import Loading from "../Shared/Loading.vue";
import ChatHeader from "../Shared/ChatHeader.vue";
import MessageBox from "./MessageBox.vue";
import MessageItem from "./MessageItem.vue";
import MessageList from "./MessageList.vue";
import moment from "moment";
export default {
  components: { Loading, ChatHeader, MessageBox, MessageItem, MessageList },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const fetchLoading = ref(true);
    const user = reactive({});
    const authUser = inject("authUser");
    const messages = ref([]);

    //fetch user
    db.collection("users")
      .doc(route.params.user_id)
      .get()
      .then((fetchedUser) => {
        if (!fetchedUser.exists) {
          router.push({
            name: "WelcomeChat",
          });
        } else {
          user.name = fetchedUser.data().name;
          user.email = fetchedUser.data().email;
          user.online = fetchedUser.data().online;
          user.created_at = fetchedUser.data().created_at;

          //fetch messages
          db.collection("chats")
            .doc(`${authUser.uid}+${route.params.user_id}`)
            .collection("messages")
            .orderBy("createdAt")
            .onSnapshot((res) => {
              fetchLoading.value = false;
              messages.value = res.docs.map((el) => ({
                ...el.data(),
                id: el.id,
                createdAt: moment(new Date(el.data().createdAt)).format("d/MM/YYYY"),
              }));
              // res.docs.forEach((el) => console.log(el.data().text));
            });
        }
      });

    return { fetchLoading, user, messages };
  },
};
</script>

<style></style>
