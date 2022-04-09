<template>
  <div class="mb-5">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">結帳</h1>
        </div>
      </div>
    </section>

    <div class="col-md-10 row g-5 mx-auto">
      <CheckoutProductList v-model:couponCode="couponCode" />

      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">收件人資料</h4>
        <CustomerInfoForm
          v-model:name="customerInfo.name"
          v-model:phone="customerInfo.phone"
          v-model:email="customerInfo.email"
          v-model:address="customerInfo.address"
        />

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
          @click="placeOrder()"
        >
          送出訂單
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomerInfoForm from "@/components/order/CustomerInfoForm.vue";
import CheckoutProductList from "@/components/order/CheckoutProductList.vue";
import { CustomerInfoModel, OrderDetailModel } from "@/models/orderModel";
import orderApi from "@/api/order";
import { defineComponent, ref } from "vue";
import { cart } from "@/services/cartService";
import { emitter } from "@/utils/eventBus";
import router from "@/router";

export default defineComponent({
  components: {
    CustomerInfoForm,
    CheckoutProductList,
  },
  setup() {
    let customerInfo = ref<CustomerInfoModel>({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    let couponCode = ref<string>("");
    let errorMessages = ref<string[]>([]);

    function placeOrder() {
      if (!validateCustomerInfo()) {
        return;
      }

      let orderDetails: OrderDetailModel[] = [];

      cart.getItems().forEach((val) => {
        let detail: OrderDetailModel = {
          productId: 0,
          productGuid: val.productGuid,
          price: val.productPrice,
          quantity: val.quantity,
        };

        orderDetails.push(detail);
      });

      orderApi
        .placeOrder(customerInfo.value, orderDetails, couponCode.value)
        .then((response) => {
          if (response.isSuccess) {
            cart.removeAll();

            emitter.emit("alertEvent", {
              message: "建立成功",
              status: "success",
            });

            router.push({ name: "Payment", params: { id: response.data } });
          } else {
            emitter.emit("alertEvent", {
              message: "建立失敗",
              status: "danger",
            });
          }
        })
        .catch(() => {
          emitter.emit("alertEvent", {
            message: "發生錯誤，建立失敗",
            status: "danger",
          });
        });

      console.log("Send Order", customerInfo.value, couponCode.value);
    }

    function validateCustomerInfo(): boolean {
      errorMessages.value = [];

      if (!customerInfo.value.name) {
        errorMessages.value.push("請輸入姓名");
      }

      if (!customerInfo.value.phone) {
        errorMessages.value.push("請輸入連絡電話");
      }

      if (!customerInfo.value.email) {
        errorMessages.value.push("請輸入Email");
      }

      if (!customerInfo.value.address) {
        errorMessages.value.push("請輸入地址");
      }

      if (errorMessages.value.length > 0) {
        return false;
      }

      return true;
    }

    return {
      customerInfo,
      couponCode,
      errorMessages,
      placeOrder,
    };
  },
});
</script>
