<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.hasPrevious }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pages.totalPage"
        :key="page"
        :class="{ active: pages.currentPage == page }"
      >
        <a class="page-link" href="#" @click.prevent="updatePage(page)">{{
          page
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.hasNext }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { PaginationModel } from "@/models/paginationModel";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    pages: Object as () => PaginationModel,
  },
  setup(prop, ctx) {
    function updatePage(page: number) {
      ctx.emit("emitPage", page);
    }

    return {
      updatePage,
    };
  },
});
</script>
