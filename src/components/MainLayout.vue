<template>
  <div>
    <Navbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from "@/components/wrappers/Navbar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Navbar,
  },
  name: "MainLayout",
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
