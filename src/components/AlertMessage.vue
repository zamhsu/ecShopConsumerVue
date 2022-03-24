<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
      />
    </symbol>
    <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      />
    </symbol>
    <symbol
      id="exclamation-triangle-fill"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      />
    </symbol>
  </svg>

  <div class="message-alert">
    <div
      class="alert d-flex align-items-center alert-dismissible fade show"
      :class="'alert-' + item.status"
      role="alert"
      v-for="item in messages"
      :key="item.id"
    >
      <svg
        class="bi flex-shrink-0 me-2"
        width="24"
        height="24"
        role="img"
        aria-label="Info:"
      >
        <use :xlink:href="'#' + item.icon" />
      </svg>
      <div>{{ item.message }}</div>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="removeMessage(item)"
      ></button>
    </div>
  </div>
</template>

<script lang="ts">
import { emitter } from "@/utils/eventBus";
import { AlertMessageModel } from "@/models/alertMessageModel";
import { defineComponent, ref } from "vue";
import { stringUtils } from "@/utils/stringUtils";
export default defineComponent({
  name: "AlertMessage",
  setup() {
    let messages = ref<AlertMessageModel[]>([]);

    emitter.on("alertEvent", (alertMessage) => {
      addMessage(alertMessage);
    });

    function addMessage(alertMessage: AlertMessageModel) {
      const timestamp = Math.floor(Date.now() / 1000);

      alertMessage.id = stringUtils.getGuid();
      alertMessage.timestamp = timestamp;
      alertMessage.icon = getIconName(alertMessage.status);
      messages.value.push(alertMessage);

      removeMessageWithTiming(timestamp);
    }

    function getIconName(status: string): string {
      switch (status) {
        case "primary":
          return "info-fill";
        case "success":
          return "check-circle-fill";
        case "warning":
          return "exclamation-triangle-fill";
        case "danger":
          return "exclamation-triangle-fill";
        default:
          return "info-fill";
      }
    }

    function removeMessage(alertMessage: AlertMessageModel) {
      // 移除訊息
      let index = messages.value.indexOf(alertMessage);
      messages.value.splice(index, 1);
    }

    function removeMessageWithTiming(timestamp: number) {
      // 5秒後自動移除
      setTimeout(() => {
        messages.value.forEach((element, index) => {
          if (element.timestamp === timestamp) {
            messages.value.splice(index, 1);
          }
        });
      }, 5000);
    }

    return {
      messages,
      addMessage,
      getIconName,
      removeMessage,
      removeMessageWithTiming,
    };
  },
});
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  bottom: 10px;
  right: 20px;
  z-index: 1100;
}
</style>