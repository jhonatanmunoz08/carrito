<template>
  <div class="state-index">
    <Toolbar>
      <template #start>
        <div class="state-index__content">
            <Avatar label="J" size="large" shape="circle" />
            <div class="state-index__content_name">Jhonatan Muñoz</div>
        </div>
      </template>
      <template #end>
        <Button icon="pi pi-shopping-cart" rounded :badge="store.state.countProductsCart" aria-label="Filter" outlined style="margin-right: 20px;" @click="showDialogCart" />
        <Button label="Salir" icon="pi pi-sign-in" />
      </template>
    </Toolbar>

    <ShoppingCart v-if="showcart" @close="showcart = false" />

    <!-- renderiza vistas -->
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import { useStore } from 'vuex'

  import { ShoppingCart } from "../components"

  import Avatar from 'primevue/avatar';
  import Button from 'primevue/button';
  import Toolbar from 'primevue/toolbar';

  const store = useStore()
  const showcart = ref(false)
  function showDialogCart() {
    showcart.value = true;
  }
</script>

<style lang="scss">
.state-index {
  &__content {
    display: flex;
    align-items: center;
    &_name {
      margin-left: 10px;
    }
  }
}
</style>