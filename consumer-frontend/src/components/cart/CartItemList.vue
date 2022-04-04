<template>
  <div v-if="items.length > 0">
    <div class="list-group">
      <div
        class="list-group-item list-group-item-action"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm me-3"
              @click="removeItem(index)"
            >
              <i class="far fa-trash-alt"></i>
            </button>
            {{ item.productTitle }}
          </h5>
          <h5>{{ currency(item.amount) }}</h5>
        </div>
        <div class="col-md-12">
          數量：
          <span class="cursor-pointer" @click="minusQuantity(index)">
            <i class="fas fa-minus"></i>
          </span>
          <span class="mx-2">{{ item.quantity }}</span>
          <span class="cursor-pointer" @click="addQuantity(index)">
            <i class="fas fa-plus"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="mt-3 text-end">
      <h5>總計： {{ currency(total) }} 元</h5>
    </div>
  </div>
  <div v-else>購物車內暫無商品</div>
</template>

<script lang="ts">
import { CartItemModel } from "@/models/cartModel";
import { cart } from "@/services/cartService";
import { currency } from "@/utils/filter";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let items = ref<CartItemModel[]>([]);
    const total = computed(() => {
      return items.value.reduce(
        (previousVal, currentVal) => previousVal + currentVal.amount,
        0
      );
    });

    getCartItems();

    function getCartItems() {
      items.value = cart.getItems();
    }

    function addQuantity(itemIndex: number) {
      items.value[itemIndex].quantity += 1;
      items.value[itemIndex].amount =
        items.value[itemIndex].productPrice * items.value[itemIndex].quantity;

      updateQuantityInTemp(
        items.value[itemIndex].productGuid,
        items.value[itemIndex].quantity
      );
    }

    function minusQuantity(itemIndex: number) {
      if (items.value[itemIndex].quantity !== 0) {
        items.value[itemIndex].quantity -= 1;
      }

      items.value[itemIndex].amount =
        items.value[itemIndex].productPrice * items.value[itemIndex].quantity;

      updateQuantityInTemp(
        items.value[itemIndex].productGuid,
        items.value[itemIndex].quantity
      );
    }

    function updateQuantityInTemp(productGuid: string, quantity: number) {
      cart.updateQuantity(productGuid, quantity);
    }

    function removeItem(itemIndex: number) {
      cart.remove(items.value[itemIndex].productGuid);

      items.value.splice(itemIndex, 1);
    }

    return {
      items,
      total,
      addQuantity,
      minusQuantity,
      removeItem,
      currency,
    };
  },
});
</script>
