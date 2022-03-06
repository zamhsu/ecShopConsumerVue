<template>
  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">ecShop</h1>
          <p class="lead text-muted">Sell every thing what you want.</p>
        </div>
      </div>
    </section>
    <!-- Product -->
    <div class="album py-5 bg-light">
      <ProductList />
    </div>
  </div>
</template>

<script lang="ts">
import ProductList from "@/components/ProductList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ProductList,
  },
  setup() {
    return {};
  },
});
</script>
