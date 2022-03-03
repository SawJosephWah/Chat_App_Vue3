<template>
  <div class="user-list">
    <user-list-item
      v-for="user in usersList"
      :key="user.id"
      :user="user"
    ></user-list-item>
  </div>
</template>

<script>
import UserListItem from "./UserListItem.vue";
export default {
  props: ["usersList"],
  components: { UserListItem },
};
</script>

<style></style>
