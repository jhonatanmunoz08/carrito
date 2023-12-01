<template>
  <div class="ProductList">
    <SearchBar :data="filteredProducts" @results="filteredDataProducts" />
    <div v-if="loaderProducts">Cargando...</div>
    <DataTable :value="filteredData" tableStyle="min-width: 50rem; margin-top: 20px">
      <Column field="id" header="id"></Column>
      <Column header="image">
        <template #body="slotProps">
            <img :src="slotProps.data.image" :alt="slotProps.data.image" class="productImage" />
        </template>
      </Column>
      <Column field="title" header="title"></Column>
      <Column field="price" header="price"></Column>
      <Column field="category" header="Category"></Column>
      <Column>
        <template #body="slotProps">
          <Button icon="pi pi-shopping-cart" rounded outlined aria-label="shopping" @click="addCart(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"

// components
import { SearchBar } from "../../components"
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';

import { useStore } from 'vuex'
const store = useStore()

// services
import { ProductsService } from '/src/store/api/services';

const props = defineProps({
  filterCategory: {
    type: String,
    default: ''
  }
})

const loaderProducts = ref(false);
const products = ref([]);
function getProducts() {
  ProductsService.getAll({
    onBefore: () => loaderProducts.value = true,
    onFinally: () => loaderProducts.value = false,
    onSuccess: (success) => products.value = success,
    onError: (err) => console.log('Error llamando productos', err),
  })
}

const filteredData = ref([]);
function filteredDataProducts(newData) {
  filteredData.value = newData;
}

const filteredProducts = computed({
  get(){
    const filterCategory = props.filterCategory.toLowerCase().trim();
    if (!filterCategory) {
        return products.value;
    } else {
      return products.value.filter(item =>
        item.category.toLowerCase().includes(filterCategory)
      );
    }
  }
})

const addCart = (product) => {
  product.quantity = 1;

  let carrito = [];
  let productTmp = JSON.stringify(product);
  if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }

  const existingProduct = carrito.find(item => item.id === product.id);

  if (existingProduct) {
    // El producto ya existe en el carrito, aumentar la cantidad
    existingProduct.quantity += 1;
  } else {
    // El producto no existe en el carrito, agregarlo
    carrito.push(product);
  }

  console.log(carrito);


  // if(carrito.includes(productTmp)) {
  //   console.log("ya existo");
  // }
  // carrito.push(JSON.parse(productTmp));
  localStorage.setItem('carrito', JSON.stringify(carrito))

  store.commit('getCarts')
}

onMounted(() => {
  getProducts();
})
</script>

<style lang="scss">
.ProductList {
  .productImage {
    width: 6rem!important;
  }
}
</style>