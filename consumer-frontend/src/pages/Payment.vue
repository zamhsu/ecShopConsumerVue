<template>
  <div class="mb-5">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">付款</h1>
        </div>
      </div>
    </section>

    <div class="col-md-10 row g-5 mx-auto">
      <OrderDetailList
        v-if="order"
        :total="order.total"
        :orderDetails="order.orderDetails"
        :couponDetail="order.couponDetail"
      />

      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">付款方式</h4>
        <div class="my-3">
          <div
            class="form-check"
            v-for="(method, index) in paymentMethodList"
            :key="index"
          >
            <input
              :id="'method_' + index"
              name="paymentmethod"
              type="radio"
              class="form-check-input"
              required=""
              :value="method.id"
              v-model="sendPaymentModel.paymentMethodId"
            />
            <label class="form-check-label" :for="'method_' + index">
              {{ method.name }}
            </label>
          </div>
        </div>

        <hr class="my-4" />

        <div v-if="errorMessages.length > 0">
          <ul>
            <li
              class="text-danger"
              v-for="(message, index) in errorMessages"
              :key="index"
            >
              {{ message }}
            </li>
          </ul>
        </div>

        <button
          class="w-100 btn btn-primary btn-lg"
          type="button"
          @click="payTheBill()"
        >
          付款
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import OrderDetailList from "@/components/order/OrderDetailList.vue";
import paymentApi from "@/api/payment";
import orderApi from "@/api/order";
import { defineComponent, ref } from "vue";
import { PaymentMethodModel, SendPaymentModel } from "@/models/payment";
import { SingleOrderModel } from "@/models/orderModel";
import router from "@/router";
import { currency } from "@/utils/filter";

export default defineComponent({
  components: {
    OrderDetailList,
  },
  setup() {
    const orderGuid = router.currentRoute.value.params.id.toString();
    let couponCode = ref<string>("");
    let paymentMethodList = ref<PaymentMethodModel[]>([]);
    let sendPaymentModel = ref<SendPaymentModel>({
      orderGuid: orderGuid,
      paymentMethodId: 1,
    });
    let order = ref<SingleOrderModel>();
    let errorMessages = ref<string[]>([]);

    getOrder();
    getPaymentMethodList();

    function getOrder() {
      orderApi.getOneOrder(orderGuid).then((response) => {
        if (response.isSuccess) {
          order.value = response.data;
        }
      });
    }

    function getPaymentMethodList() {
      paymentApi.getPaymentMethods().then((response) => {
        if (response.isSuccess) {
          paymentMethodList.value = response.data;
        }
      });
    }

    function payTheBill() {
      errorMessages.value = [];

      paymentApi
        .payTheBill(sendPaymentModel.value)
        .then((response) => {
          if (response.isSuccess) {
            router.push({ name: "PaymentResult" });
          } else {
            errorMessages.value.push(response.message);
          }
        })
        .catch(() => {
          errorMessages.value.push("付款失敗");
        });
    }

    return {
      couponCode,
      paymentMethodList,
      sendPaymentModel,
      order,
      errorMessages,
      payTheBill,
      currency,
    };
  },
});
</script>
