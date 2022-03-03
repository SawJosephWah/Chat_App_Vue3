<template>
  <div>
    <div class="row">
      <div class="card">
        <div class="card-header">Register</div>

        <div class="card-body">
          <div class="errors" v-if="errors.error">{{ errors.error }}</div>
          <form action="" @submit.prevent="register">
            <div class="form-group">
              <label> Name</label>
              <input
                type="text"
                name="name"
                class="form-control"
                v-model="name"
                :class="{
                  error: errors.name,
                }"
              />

              <span style="color: red" v-if="errors.name">{{ errors.name }}</span>
            </div>

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
              ><span v-if="!loading">Register </span>
              <span v-if="loading">Loading ... </span>
            </base-button>
          </form>
          <p>
            Have Alrady Account ?
            <router-link :to="{ path: '/login' }">Login Here</router-link>
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
import { inject } from "vue";

export default {
  components: { BaseButton },

  setup() {
    let user = reactive({
      name: "",
      email: "",
      password: "",
    });
    const errors = ref({});
    let loading = ref(false);
    const router = useRouter();
    let updateUser = inject("updateUser");

    const register = () => {
      errors.value = validation(user);

      if (Object.keys(errors.value).length == 0) {
        errors.value["error"] = "";
        loading.value = true;
        updateUser(user.name);
        //1. sign up
        auth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((userCredential) => {
            //2. update proifle after sign up
            auth.currentUser
              .updateProfile({
                displayName: user.name,
              })
              .then(() => {
                var signedUpUser = userCredential.user;
                console.log(signedUpUser);
                //3. add user to firestore
                db.collection("users")
                  .doc(signedUpUser.uid)
                  .set({
                    name: signedUpUser.displayName,
                    email: signedUpUser.email,
                    created_at: new Date().toString(),
                    online: true,
                  })
                  .then(() => {
                    console.log("Document successfully written!");
                    user.name = "";
                    user.email = "";
                    user.password = "";
                    loading.value = false;

                    router.push({ name: "Home" });
                  });
              });
          })
          .catch((error) => {
            var errorMessage = error.message;
            errors.value["error"] = errorMessage;

            loading.value = false;
          });
      }
    };

    return { ...toRefs(user), register, errors, loading };
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
