import { reactive } from "vue";

const validation = (items) => {
  const errors = reactive({});
  let validate = true;
  for (let [key, value] of Object.entries(items)) {
    if (!value) {
      validate = false;
      errors[key] = `Please fill ${key}`;
    }
  }

  return errors;
};

export default validation;
