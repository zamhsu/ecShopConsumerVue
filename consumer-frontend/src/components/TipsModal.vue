<template>
  <div
    class="modal fade"
    id="tipsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="tipsModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="tipsModalLabel">提示</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal()"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import { defineComponent, onBeforeUnmount, onMounted, watch } from "vue";

export default defineComponent({
  name: "TipsModal",
  props: {
    visibaleModal: Boolean,
    message: String,
  },
  emits: ["close"],

  setup(props, ctx) {
    let modal: Modal;

    onMounted(() => {
      modal = new Modal(document.getElementById("tipsModal") as HTMLElement);
      controlModalVisibility(props.visibaleModal);
    });

    onBeforeUnmount(() => {
      modal.dispose();
    });

    watch(props, (val) => {
      controlModalVisibility(val.visibaleModal);
    });

    function controlModalVisibility(visibale: boolean) {
      if (visibale) {
        modal.show();
      } else {
        modal.hide();
      }
    }

    function closeModal() {
      ctx.emit("close");
    }

    return {
      controlModalVisibility,
      closeModal,
    };
  },
});
</script>
