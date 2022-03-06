<template>
  <div class="container">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" v-for="(product, index) in products" :key="index">
        <div class="card shadow-sm">
          <img
            v-if="product.imageUrl"
            :src="product.imageUrl"
            class="card-img-top"
            :alt="product.title"
          />
          <svg
            v-else
            class="bd-placeholder-img card-img-top"
            width="100%"
            height="225"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c"></rect>
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">暫無圖片</text>
          </svg>

          <div class="card-body">
            <h5 class="card-title">
              {{ product.title }}
            </h5>
            <p class="card-text">
              {{ product.description }}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-success">{{ product.categoryString }}</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  加入購物車
                </button>
              </div>
              <small class="text-muted">{{ currency(product.price) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <Pagination
        :pages="pagination"
        @emitPage="getProducts"
        v-if="pagination"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination.vue";
import { PaginationModel } from "@/models/paginationModel";
import { ProductDisplayModel } from "@/models/productModel";
import productApi from "@/api/product";
import { currency } from "@/utils/filter";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    Pagination,
  },
  name: "ProductList",
  setup() {
    const pageSize = 10;
    let products = ref<ProductDisplayModel[]>([]);
    let pagination = ref<PaginationModel>();

    getProducts();

    function getProducts(page = 1) {
      productApi.getPaged(pageSize, page).then((response) => {
        if (response.isSuccess) {
          products.value = response.data.products;
          pagination.value = response.data.pagination;
        }
      });
    }

    return {
      products,
      pagination,
      getProducts,
      currency,
    };
  },
});
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>