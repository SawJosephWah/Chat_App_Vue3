<template>
  <div class="message-container" :class="{ sender: message.uid }">
    <div class="user-img">
      <span v-if="message.uid">{{
        authUser.uid && message.uid ? authUser.name.charAt(0).toUpperCase() : ""
      }}</span>
      <span v-else> {{ user.name.charAt(0).toUpperCase() }}</span>
    </div>

    <!-- <div class="user-img">{{}}</div> -->
    <div class="message-text">
      <h3>{{ message.text }}</h3>
      <small>{{ message.createdAt }}</small>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  props: ["message", "user"],
  setup() {
    const authUser = inject("authUser");
    return { authUser };
  },
};
</script>

<style>
.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.message-text small {
  /* width: 200px;
  position: absolute;
  bottom: 2px; */
  color: var(--input-color);
  font-size: 14px;
}
.sender {
  flex-direction: row-reverse;
}
.message-container.sender .user-img {
  background: #387c67;
}
.sender .message-text {
  margin-right: 10px;
}

/* .sender .message-text h3 {
  background: #387c6d;
} */

.sender .message-text small {
  right: 10px;
  text-align: right;
}
h3::selection {
  background: #363636;
}
</style>
