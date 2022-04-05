<template>
  <div>
    <form>
      <div class="row g-3">
        <div class="col-sm-6">
          <label for="name" class="form-label">姓名</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder=""
            v-model="customerInfo.name"
            required=""
          />
        </div>

        <div class="col-sm-6">
          <label for="phone" class="form-label">聯絡電話</label>
          <input
            type="text"
            class="form-control"
            id="phone"
            placeholder=""
            v-model="customerInfo.phone"
            required=""
          />
        </div>

        <div class="col-12">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="you@example.com"
            v-model="customerInfo.email"
            required=""
          />
        </div>

        <div class="col-12">
          <label for="address" class="form-label">地址</label>
          <input
            type="text"
            class="form-control"
            id="address"
            placeholder="OO市XX路123號"
            v-model="customerInfo.address"
            required=""
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

export default defineComponent({
  name: "CustomerInfoForm",
  props: {
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  setup(prop, ctx) {
    const customerInfo = reactive({
      name: computed({
        get: () => prop.name,
        set: (val) => {
          ctx.emit("update:name", val);
        },
      }),
      phone: computed({
        get: () => prop.phone,
        set: (val) => {
          ctx.emit("update:phone", val);
        },
      }),
      email: computed({
        get: () => prop.email,
        set: (val) => {
          ctx.emit("update:email", val);
        },
      }),
      address: computed({
        get: () => prop.address,
        set: (val) => {
          ctx.emit("update:address", val);
        },
      }),
    });

    return {
        customerInfo
    };
  },
});
</script>
