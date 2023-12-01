<template>
  <div class="SearchBar">
    <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="search" placeholder="Search" />
    </span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import InputText from 'primevue/inputtext';

const emit = defineEmits();

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const search = ref('');
const filteredResults = computed({
  get(){
    const searchTerm = search.value.toLowerCase().trim();
    if (!searchTerm) {
        return props.data;
    } else {
      return props.data.filter(item =>
        item.title.toLowerCase().includes(searchTerm)
      );
    }
  }
})

watch(filteredResults, (newResults) => {
  emit('results', newResults)
}, { deep: true });
</script>

<style lang="scss">
.SearchBar {

}
</style>