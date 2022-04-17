<template>
  <div class="mb-5">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <h1 class="fw-light">查詢訂單結果</h1>
        </div>
      </div>
    </section>
  </div>

  <div class="mx-5">
    <div class="col-md-12">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>購買時間</th>
            <th>應付金額</th>
            <th>付款狀態</th>
            <th>詳細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderDisplays" :key="index">
            <td>{{ item.guid }}</td>
            <td>{{ fullDateTime(item.createDate) }}</td>
            <td>{{ currency(item.total) }}</td>
            <td>
              <span>{{ item.statusString }}</span>
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openDetailModal(index)"
              >
                查看
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :pages="pagination"
        @emitPage="getCustomerOrder"
        v-if="pagination"
      ></Pagination>

      <!-- detialModal -->
      <div
        class="modal fade"
        id="detailModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="detailModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h5 class="modal-title" id="detailModalLabel">
                <span>詳細資料</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <template v-if="selectedOrder">
                <div>
                  <h5>商品</h5>
                  <table class="table mt-4">
                    <thead>
                      <tr>
                        <th>項次</th>
                        <th>名稱</th>
                        <th>數量</th>
                        <th>金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!selectedOrder.orderDetails">
                        <td colspan="4">
                          <p class="text-center">沒有商品</p>
                        </td>
                      </tr>
                      <tr
                        v-else
                        v-for="(item, index) in selectedOrder.orderDetails"
                        :key="index"
                      >
                        <td>{{ item.itemNo }}</td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>
                          <span>{{ currency(item.total) }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h5>優惠券</h5>
                  <table class="table mt-4">
                    <thead>
                      <tr>
                        <th>項次</th>
                        <th>優惠碼</th>
                        <th>數量</th>
                        <th>金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!selectedOrder.couponDetail">
                        <td colspan="4">
                          <p class="text-center">沒有使用優惠券</p>
                        </td>
                      </tr>
                      <tr v-else>
                        <td>{{ selectedOrder.couponDetail.itemNo }}</td>
                        <td>
                          {{ selectedOrder.couponDetail.couponCode }}
                        </td>
                        <td>{{ selectedOrder.couponDetail.quantity }}</td>
                        <td>
                          <span>
                            -{{
                              currency(selectedOrder.couponDetail.total * -1)
                            }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h5>個人資料</h5>
                <div class="row">
                  <div class="row">
                    <div class="mb-3 col-md-4">
                      姓名：{{ selectedOrder.name }}
                    </div>
                    <div class="mb-3 col-md-4">
                      Email：{{ selectedOrder.email }}
                    </div>
                    <div class="mb-3 col-md-4">
                      電話：{{ selectedOrder.phone }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-12">
                      地址：{{ selectedOrder.address }}
                    </div>
                  </div>
                </div>

                <h5>付款資料</h5>
                <div class="row">
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      訂單狀態：{{ selectedOrder.statusString }}
                    </div>
                    <div class="mb-3 col-md-6">
                      購買時間：{{ fullDateTime(selectedOrder.createDate) }}
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      付款方式：{{ selectedOrder.paymentMethodString }}
                    </div>
                    <div class="mb-3 col-md-6">
                      付款時間：{{ fullDateTime(selectedOrder.paidDate) }}
                    </div>
                  </div>
                </div>
              </template>
              <template> 沒有資料 </template>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Modal } from "bootstrap";
import Pagination from "@/components/Pagination.vue";
import { CustomerInfoModel, SingleOrderModel } from "@/models/orderModel";
import orderApi from "@/api/order";
import orderCustomerInfoService from "@/services/orderCustomerInfoService";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import router from "@/router";
import { emitter } from "@/utils/eventBus";
import { currency, fullDateTime } from "@/utils/filter";
import { PaginationModel } from "@/models/PaginationModel";

export default defineComponent({
  components: {
    Pagination,
  },
  setup() {
    const pageSize = 10;
    let orderDisplays = ref<SingleOrderModel[]>();
    let selectedOrder = ref<SingleOrderModel>();
    let pagination = ref<PaginationModel>();
    let customerInfo = ref<CustomerInfoModel | null>();
    let detailModal: Modal;

    checkAuth();
    getCustomerOrder();

    onMounted(() => {
      detailModal = new Modal(
        document.getElementById("detailModal") as HTMLElement
      );
    });

    onBeforeUnmount(() => {
      orderCustomerInfoService.removeCustomerInfo();
      detailModal.dispose();
    });

    function checkAuth() {
      customerInfo.value = orderCustomerInfoService.getCustomerInfo();

      if (!customerInfo.value) {
        emitter.emit("alertEvent", {
          message: "請先輸入個人資料",
          status: "danger",
        });

        router.push({ name: "OrderIdentity" });
      }
    }

    function getCustomerOrder(page = 1) {
      if (!customerInfo.value) {
        return;
      }

      orderApi
        .getCustomerOrders(customerInfo.value, pageSize, page)
        .then((response) => {
          orderDisplays.value = response.data.orderDisplays;
          pagination.value = response.data.pagination;
        });
    }

    function openDetailModal(index: number) {
      if (orderDisplays.value) {
        selectedOrder.value = orderDisplays.value[index];
      }

      detailModal.show();
    }

    function closeDetailModal() {
      detailModal.hide();
    }

    return {
      selectedOrder,
      orderDisplays,
      pagination,
      getCustomerOrder,
      openDetailModal,
      closeDetailModal,
      currency,
      fullDateTime,
    };
  },
});
</script>
