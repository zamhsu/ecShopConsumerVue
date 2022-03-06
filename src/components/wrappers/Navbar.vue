<template>
  <div>
    <header>
      <div class="px-3 py-2 bg-dark text-white">
        <div class="container">
          <div
            class="
              d-flex
              flex-wrap
              align-items-center
              justify-content-center justify-content-lg-start
            "
          >
            <a
              href="#"
              class="
                d-flex
                align-items-center
                my-2 my-lg-0
                me-lg-auto
                text-white text-decoration-none
              "
            >
              <i class="fas fa-store"></i>
              ecShop
            </a>

            <ul
              class="
                nav
                col-12 col-lg-auto
                my-2
                justify-content-center
                my-md-0
                text-small
              "
            >
              <li>
                <router-link
                  :to="{ name: 'Index' }"
                  class="nav-link text-white"
                >
                  <i class="fas fa-gift"></i>
                  產品
                </router-link>
              </li>
              <li>
                <a href="#" class="nav-link text-white">
                  <i class="fas fa-table"></i>
                  訂單
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
});
</script>

<style lang="css" scoped>
</style>