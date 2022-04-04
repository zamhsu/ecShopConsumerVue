<template>
  <div>
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">購物車</h1>
        </div>
      </div>
    </section>

    <div class="col-lg-6 mx-auto">
      <CartItem />
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
        <button type="button" class="btn btn-outline-primary">前往結帳</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CartItem from "@/components/cart/CartItemList.vue";
import { currency } from "@/utils/filter";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    CartItem,
  },
  setup() {
    return {
      currency,
    };
  },
});
</script>
