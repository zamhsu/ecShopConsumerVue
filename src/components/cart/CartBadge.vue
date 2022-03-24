<template>
  <span class="badge bg-danger" :class="{ 'd-none': cart.count <= 0 }">
    {{ cart.count }}
  </span>
</template>

<script lang="ts">
import { cart } from "@/services/cartService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CartBadge",
  setup() {
    return {
      cart,
    };
  },
});
</script>
