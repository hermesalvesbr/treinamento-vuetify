<template>
  <section>
    <h2>Famílias</h2>
    <v-list>
      <v-list-item v-for="familia in familias" :key="familia.sobrenome">
        <v-list-item-title>{{ familia.sobrenome }}</v-list-item-title>
        <v-list-item-subtitle>{{ familia.membros }} membros</v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </section>
</template>
<script setup>
const { data: famData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/families`)
const families = ref([])
if (famData.value && 'data' in famData.value) {
  families.value = famData.value.data
}
</script>