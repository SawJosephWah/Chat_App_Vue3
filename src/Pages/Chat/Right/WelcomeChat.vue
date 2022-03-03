<template>
  <div class="welcome-chat">
    <div>
      <div class="user-img-container">
        <div class="user-img">A</div>
      </div>

      <h3>Hi , {{ authUser.name }}</h3>
      <p>Please select a chat to message.</p>
    </div>
  </div>
</template>

<script>
import { inject } from "@vue/runtime-core";
export default {
  setup() {
    const authUser = inject("authUser");
    return {
      authUser,
    };
  },
};
</script>

<style scoped>
.user-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.welcome-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  flex-direction: column;
}
h3,
p {
  margin: 10px 0px;
}
</style>
