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
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="goToCheckout()"
        >
          前往結帳
        </button>
      </div>
    </div>

    <TipsModal
      :visibaleModal="showTipsModal"
      :message="tipsMessage"
      @close="closeTipsModal()"
    />
  </div>
</template>

<script lang="ts">
import CartItem from "@/components/cart/CartItemList.vue";
import TipsModal from "@/components/TipsModal.vue";
import router from "@/router";
import { cart } from "@/services/cartService";
import { currency } from "@/utils/filter";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    CartItem,
    TipsModal,
  },
  setup() {
    let showTipsModal = ref<boolean>(false);
    let tipsMessage = ref<string>("");

    function goToCheckout() {
      if (!cart.count) {
        tipsMessage.value = "購物車內沒有商品，請先加入商品。";
        openTipsModal();

        return;
      }

      removeZeroQuantityItem();
      router.push({ name: "CartCheckout" });
    }

    function removeZeroQuantityItem() {
      let items = cart.getItems();

      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].quantity === 0) {
          cart.remove(items[i].productGuid);
        }
      }
    }

    function openTipsModal() {
      showTipsModal.value = true;
    }

    function closeTipsModal() {
      showTipsModal.value = false;
    }

    return {
      showTipsModal,
      tipsMessage,
      openTipsModal,
      closeTipsModal,
      goToCheckout,
      currency,
    };
  },
});
</script>
