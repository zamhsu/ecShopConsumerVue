<template>
  <div>
    <div class="mb-5">
      <section class="py-5 text-center container">
        <div class="row py-lg-5">
          <div class="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">查詢訂單</h1>
          </div>
        </div>
      </section>
    </div>

    <div class="col-md-12">
      <div class="col-md-4 mx-auto" v-if="errorMessages.length > 0">
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
    </div>

    <div class="col-md-12">
      <div class="col-md-4 mx-auto">
        <form>
          <div class="row mb-3">
            <label for="name" class="col-sm-2 col-form-label">姓名</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="訂單內當時填入的姓名"
                v-model="customerInfo.name"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="email" class="col-sm-2 col-form-label"> Email </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="訂單內當時填入的Email"
                v-model="customerInfo.email"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="phone" class="col-sm-2 col-form-label">電話</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="phone"
                placeholder="訂單內當時填入的電話"
                v-model="customerInfo.phone"
              />
            </div>
          </div>
          <button type="button" class="btn btn-primary" @click="query()">
            查詢
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CustomerInfoModel } from "@/models/orderModel";
import router from "@/router";
import orderCustomerInfoService from "@/services/orderCustomerInfoService";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    let customerInfo = ref<CustomerInfoModel>({
      name: "",
      phone: "",
      email: "",
      address: "",
    });
    let errorMessages = ref<string[]>([]);

    orderCustomerInfoService.removeCustomerInfo();

    function query() {
      if (!validateFormData()) {
        return;
      }

      orderCustomerInfoService.setCustomerInfo(customerInfo.value);
      router.push({ name: "OrderQueryResult" });
    }

    function validateFormData(): boolean {
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

      if (errorMessages.value.length > 0) {
        return false;
      }

      return true;
    }

    return {
      customerInfo,
      errorMessages,
      query,
    };
  },
});
</script>
