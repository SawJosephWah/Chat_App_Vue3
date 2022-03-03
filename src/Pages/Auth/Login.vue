<template>
  <div>
    <div class="row">
      <div class="card">
        <div class="card-header">Login</div>

        <div class="card-body">
          <div class="errors" v-if="errors.error">{{ errors.error }}</div>
          <form action="" @submit.prevent="login">
            <div class="form-group">
              <label> Email</label>
              <input type="email" name="email" class="form-control" v-model="email" />
              <span style="color: red" v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div class="form-group">
              <label> Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                v-model="password"
              />
              <span style="color: red" v-if="errors.password">{{ errors.password }}</span>
            </div>
            <base-button :disabled="loading"
              ><span v-if="!loading">Login </span>
              <span v-if="loading">Loading ... </span>
            </base-button>
          </form>
          <p>
            Don't Have Account ?
            <router-link :to="{ path: '/register' }">Register Here</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import BaseButton from "../../components/UI/BaseButton.vue";
import validation from "../../hooks/validation.js";
import { auth, db } from "../../firebase/init";
import { useRouter } from "vue-router";

export default {
  components: { BaseButton },
  setup() {
    let user = reactive({
      email: "",
      password: "",
    });
    const errors = ref({});
    let loading = ref(false);
    const router = useRouter();

    const login = async () => {
      errors.value = validation(user);

      if (Object.keys(errors.value).length == 0) {
        errors.value["error"] = "";
        loading.value = true;

        try {
          let signInUser = await auth.signInWithEmailAndPassword(
            user.email,
            user.password
          );
          await db.collection("users").doc(signInUser.user.uid).update({
            online: true,
          });
          router.push({
            name: "WelcomeChat",
          });
        } catch (error) {
          errors.value["error"] = error.message;
        } finally {
          user.email = "";
          user.password = "";
          loading.value = false;
        }
      }
    };

    return { ...toRefs(user), login, errors, loading };
  },
};
</script>

<style>
p {
  text-align: center;
}
a {
  color: white;
}
</style>
