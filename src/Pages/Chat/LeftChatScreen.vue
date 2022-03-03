<template>
  <div class="contact-card">
    <chat-header :user="authUser" :online="true">
      <base-button @click="logout">Logout</base-button>
    </chat-header>
    <!-- <input type="text" v-model="test" /> -->
    <search-user v-model="search"></search-user>
    <user-list :usersList="searchUser"></user-list>
  </div>
</template>

<script>
import BaseButton from "../../components/UI/BaseButton.vue";
import { auth, db } from "../../firebase/init";
import ChatHeader from "./Shared/ChatHeader.vue";
import { useRouter } from "vue-router";
import SearchUser from "./SearchUser.vue";
import UserList from "./UserList.vue";
import { computed, ref } from "vue";
import { inject } from "vue";
export default {
  components: { ChatHeader, BaseButton, SearchUser, UserList },
  setup() {
    const router = useRouter();
    let usersList = ref();
    const authUser = inject("authUser");
    let search = ref("");
    let test = ref("");

    //logout
    const logout = async () => {
      await db.collection("users").doc(authUser.uid).update({
        online: false,
      });
      await auth.signOut();
      router.push({
        name: "Login",
      });
    };

    //fetch user
    db.collection("users")
      .orderBy("created_at", "desc")
      .onSnapshot((res) => {
        let users = res.docs.map((el) => {
          return { ...el.data(), id: el.id };
        });
        usersList.value = users;
      });

    //search users
    const searchUser = computed(() => {
      if (search.value) {
        return usersList.value.filter((el) => {
          return el.name.toUpperCase().includes(search.value.toUpperCase());
        });
      }

      return usersList.value;
    });

    return { logout, usersList, search, searchUser, test, authUser };
  },
};
</script>

<style>
.contact-card {
  /* overflow: scroll; */
  width: 25%;
  border-right: 2px solid rgba(0, 0, 0, 0.116);
  min-height: 100vh;
}
</style>
