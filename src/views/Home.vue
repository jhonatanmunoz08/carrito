<template>
  <div class="state-home">
    <div class="state-home__categories">
      <h2>Categorias</h2>
      <CategoryList @filterCategory="filterProducts" />
    </div>

    <div class="state-home__products">
      <h2>Productos</h2>
      <ProductList :filterCategory="filterCategory" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { CategoryList, ProductList } from "../components"

const filterCategory = ref('');
function filterProducts(nameCategory) {
  filterCategory.value = nameCategory;
}
</script>

<style lang="scss">
.state-home {
  padding: 20px;
}
</style>