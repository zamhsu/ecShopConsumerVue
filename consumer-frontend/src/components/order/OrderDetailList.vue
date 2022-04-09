<template>
  <div class="col-md-5 col-lg-4 order-md-last">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-primary">商品</span>
      <span class="badge bg-primary rounded-pill" v-if="orderDetails">
        {{ orderDetails.length }}
      </span>
      <span class="badge bg-primary rounded-pill" v-else>0</span>
    </h4>
    <ul class="list-group mb-3" v-if="orderDetails">
      <li
        class="list-group-item d-flex justify-content-between lh-sm"
        v-for="(item, index) in orderDetails"
        :key="index"
      >
        <div>
          <h6 class="my-0">{{ item.productName }}</h6>
          <small class="text-muted">數量：{{ item.quantity }}</small>
        </div>
        <span class="text-muted">{{ currency(item.total) }}</span>
      </li>
      <li
        class="list-group-item d-flex justify-content-between bg-light"
        v-if="couponDetail"
      >
        <div class="text-success">
          <h6 class="my-0">優惠券</h6>
          <small>{{ couponDetail.couponCode }}</small>
        </div>
        <span class="text-success">
          −{{ currency(couponDetail.total * -1) }}
        </span>
      </li>
      <li class="list-group-item d-flex justify-content-between">
        <span>總計</span>
        <strong>{{ currency(total) }}</strong>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  OrderCouponDetailModel,
  OrderItemDetailModel,
} from "@/models/orderModel";
import { defineComponent } from "vue";
import { currency } from "@/utils/filter";

export default defineComponent({
  name: "OrderDetailList",
  props: {
    total: {
      type: Number,
    },
    orderDetails: {
      type: Object as () => OrderItemDetailModel[] | null,
    },
    couponDetail: {
      type: Object as () => OrderCouponDetailModel | null,
    },
  },
  setup() {
    return {
      currency,
    };
  },
});
</script>
