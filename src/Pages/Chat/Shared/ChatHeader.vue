<template>
  <div class="user-profile">
    <div class="user-info">
      <div class="user-img" v-if="user.name">
        {{ user.name.charAt(0).toUpperCase() }}
      </div>
      <div>
        <div class="user-name">{{ user.name }}</div>
        <small v-if="online">Online</small>
        <small v-else class="status">{{ user.online ? "Online" : "Offline" }}</small>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  props: ["user", "online"],
  // setup() {
  //   const authUser = inject("authUser");
  //   return {
  //     authUser,
  //   };
  // },
};
</script>

<style></style>
