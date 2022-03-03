<template>
  <router-link
    :to="{ name: 'MessageScreen', params: { user_id: user.id } }"
    class="user-profile"
    v-if="authUser.uid !== user.id"
  >
    <div class="user-info" v-if="user.name">
      <div class="user-img">{{ user.name.charAt(0).toUpperCase() }}</div>
      <div>
        <div class="user-name">{{ user.name }}</div>
        <small class="status" :class="{ offline: !user.online }">{{
          user.online ? "Online" : "Offline"
        }}</small>
      </div>
    </div>
  </router-link>
</template>

<script>
import { inject } from "vue";
export default {
  props: ["user"],
  setup() {
    const authUser = inject("authUser");

    return { authUser };
  },
};
</script>

<style scoped>
.user-profile {
  background: none;
  color: white;
}
small {
  color: green;
}
.offline {
  color: rgb(209, 0, 0);
}
</style>
