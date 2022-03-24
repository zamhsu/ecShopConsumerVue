<template>
  <div>
    <Navbar />
    <AlertMessage />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/wrappers/Navbar.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Navbar,
    AlertMessage,
  },
  name: "MainLayout",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
