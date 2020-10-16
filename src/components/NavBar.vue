<template>
  <nav class="nav-extended">
    <div class="nav-wrapper indigo darken">
      <router-link class="brand-logo" :to="{ name: 'index' }" exact>
        Vue Smoothies
      </router-link>
    </div>
    <div class="nav-content">
      <router-link
        :to="{ name: 'add-smoothie' }"
        class="btn-floating btn-large halfway-fab waves-effect waves-light teal"
      >
        <i class="material-icons red-text text-darken-2 white">add</i>
      </router-link>
    </div>
  </nav>
</template>

<style>
.nav-wrapper {
  padding: 0 20px;
}
</style>