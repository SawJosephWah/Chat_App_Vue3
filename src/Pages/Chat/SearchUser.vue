<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search User..."
      v-model="search"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {};
</script>

<style>
.search {
  background: var(--primary);
  padding: 15px 10px;
}

.search input {
  width: 100%;
  background: var(--input-background);
  outline: none;
  border: none;
  padding: 15px 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
