<template>
  <div class="ShoppingCart">
    <Dialog v-model:visible="visible" header="Carrito de compras" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" position="topright"  :draggable="false">
      <div v-for="(car, key) in carrito" :key="key">
        <div class="ShoppingCart__cart-product">
          <div class="ShoppingCart__cart-product_name">
            <img :src="car.image">
            {{ car.title }}
          </div>
          <div class="ShoppingCart__cart-product_cantidad">
            Cantidad <br>
            {{ car.quantity }}
          </div>
          <div class="ShoppingCart__cart-product_price">
            Precio <br>
            {{ car.price * car.quantity }}
          </div>
          <div class="ShoppingCart__cart-product_actions">
            <Button label="eliminar" icon="pi pi-shopping-cart" @click="deleteProduct(key)"  />
          </div>
        </div>
      </div>
      <div v-if="!carrito.length">No hay productos agregados en el carrito</div>
      <template #footer>
        <Button label="cancelar" icon="pi pi-times" @click="close" autofocus />
        <Button v-if="carrito.length" label="Comprar" icon="pi pi-shopping-cart" @click="close" autofocus />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useStore } from 'vuex'

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const store = useStore()
const emit = defineEmits();

const visible = ref(true)
function close() {
  visible.value = false
  emit('close')
}

const carrito = ref(JSON.parse(localStorage.getItem('carrito')));

const deleteProduct = (key) => {
  carrito.value.splice(key, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
  store.commit('getCarts')
}
</script>

<style lang="scss">
.ShoppingCart {
  &__cart-product {
    display: flex;
    padding: 20px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 10px;
    background: rgb(231, 231, 231);
    &_name {
      width: 50%;
      flex-grow: 1;
      display: flex;
      overflow: hidden;
      align-items: center;
      text-overflow: ellipsis;
      img {
        margin-right: 10px;
        width: 3rem!important;
      }
    }
    &_cantidad {
      margin: 0px 25px;
      text-align: center;
    }
    &_price {
      margin: 0px 25px;
      text-align: center;
    }
    &_actions {
      text-align: right;
      align-content: end;
      align-items: end;
    }
  }
}
</style>