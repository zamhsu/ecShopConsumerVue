<template>
  <div class="col-md-5 col-lg-4 order-md-last">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-primary">商品</span>
      <span class="badge bg-primary rounded-pill">{{ cart.count }}</span>
    </h4>
    <ul class="list-group mb-3">
      <li
        class="list-group-item d-flex justify-content-between lh-sm"
        v-for="(item, index) in varifiedItemList"
        :key="index"
      >
        <div>
          <h6 class="my-0">{{ item.productTitle }}</h6>
          <small class="text-muted">數量：{{ item.quantity }}</small>
        </div>
        <span class="text-muted">{{ currency(item.amount) }}</span>
      </li>
      <li
        class="list-group-item d-flex justify-content-between bg-light"
        v-if="couponModel"
      >
        <div class="text-success">
          <h6 class="my-0">優惠券</h6>
          <small>{{ usedCouponCode }}</small>
        </div>
        <span class="text-success">
          −{{ currency(amount.discountTotal * -1) }}
        </span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>總計</span>
        <strong>{{ currency(totalAmount) }}</strong>
      </li>
    </ul>

    <form class="card p-2">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          placeholder="優惠券"
          v-model="usedCouponCode"
        />
        <button type="submit" class="btn btn-secondary" @click="useCoupon()">
          使用
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { CartItemModel } from "@/models/cartModel";
import { CouponSimpleModel } from "@/models/couponModel";
import { cart } from "@/services/cartService";
import { currency } from "@/utils/filter";
import productApi from "@/api/product";
import couponApi from "@/api/coupon";
import { computed, defineComponent, reactive, ref } from "vue";
import { emitter } from "@/utils/eventBus";

export default defineComponent({
  name: "CheckoutProductList",
  props: {
    couponCode: { type: String, default: "" },
  },
  setup(prop, ctx) {
    let clientItemList = ref<CartItemModel[]>([]);
    let varifiedItemList = ref<CartItemModel[]>([]);
    let usedCouponCode = computed({
      get: () => prop.couponCode,
      set: (val) => {
        ctx.emit("update:couponCode", val);
      },
    });
    let couponModel = ref<CouponSimpleModel>();
    const amount = reactive({
      itemTotal: computed(() => {
        return varifiedItemList.value.reduce(
          (previousVal, currentVal) => previousVal + currentVal.amount,
          0
        );
      }),
      discountTotal: computed(() => {
        if (!couponModel.value) {
          return 0;
        }

        let total = varifiedItemList.value.reduce(
          (previousVal, currentVal) => previousVal + currentVal.amount,
          0
        );

        let discount =
          Math.floor((total * couponModel.value.discountPercentage) / 100) -
          total;

        if (discount + total < 0) {
          return total * -1;
        }

        return discount;
      }),
    });
    const totalAmount = computed(() => {
      return amount.itemTotal + amount.discountTotal;
    });

    varifyItem();

    function getClientItems() {
      clientItemList.value = cart.getItems();
    }

    function varifyItem() {
      getClientItems();

      clientItemList.value.forEach((val) => {
        productApi.getOne(val.productGuid).then((response) => {
          if (response.isSuccess) {
            let item: CartItemModel = {
              itemNo: val.itemNo,
              productGuid: val.productGuid,
              productTitle: response.data.title,
              productPrice: response.data.price,
              quantity: val.quantity,
              amount: response.data.price * val.quantity,
            };

            varifiedItemList.value.push(item);
          }
        });
      });
    }

    function useCoupon() {
      couponApi.getCheckResult(usedCouponCode.value).then((response) => {
        if (response.isSuccess) {
          couponModel.value = response.data;

          emitter.emit("alertEvent", {
            message: "使用成功",
            status: "success",
          });
        } else {
          emitter.emit("alertEvent", {
            message: "無法使用此優惠券",
            status: "danger",
          });
        }
      });
    }

    return {
      cart,
      clientItemList,
      varifiedItemList,
      usedCouponCode,
      couponModel,
      amount,
      totalAmount,
      useCoupon,
      currency,
    };
  },
});
</script>
