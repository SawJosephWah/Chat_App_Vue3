<template>
  <router-view />
</template>
<script>
import { reactive, provide } from "vue";
import { auth } from "./firebase/init";
export default {
  setup() {
    let user = reactive({});

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (authUser.displayName) {
          user.name = authUser.displayName;
        }

        user.email = authUser.email;
        user.uid = authUser.uid;
      } else {
        user.name = "";
        user.email = "";
        user.uid = "";
      }
    });

    provide("authUser", user);

    const updateUser = (name) => {
      user.name = name;
    };
    provide("updateUser", updateUser);
  },
};
</script>
<style></style>
