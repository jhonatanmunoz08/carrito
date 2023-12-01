<template>
  <div class="CategoryList scroll">
    <div v-for="(category, k) in categories" :key="k">
      <div class="CategoryList__items" @click="filterCategory(category)">
        {{ category }}
      </div>
    </div>
    <Button label="Limpiar filtro" @click="filterCategory('')" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

import Button from 'primevue/button';

// services
import { CategoriesService } from '/src/store/api/services';

const emit = defineEmits();

const loaderCategories = ref(false);
const categories = ref([]);
function getCategories() {
  CategoriesService.getAll({
    onBefore: () => loaderCategories.value = true,
    onFinally: () => loaderCategories.value = false,
    onSuccess: (success) => categories.value = success,
    onError: (err) => console.log('Error llamando categorias', err),
  })
}

function filterCategory(nameCategory) {
  emit('filterCategory', nameCategory)
}

onMounted(() => {
  getCategories();
})
</script>

<style lang="scss">
.CategoryList {
  overflow: auto;
  display: flex;
  padding-left: 0px;
  padding-right: 0px;

  &__items {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
    text-align: center;
    padding: 15px 15px;
    margin-right: 15px;
    border-radius: 20px;
    background: rgb(203, 203, 203);
  }
}
</style>