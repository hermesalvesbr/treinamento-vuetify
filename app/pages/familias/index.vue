<template>
  <section>
    
    <h2> Famílias </h2>
    <v-list>
     <v-list-item v-for="familia in families" :key="familia.sobrenome">
          <v-list-item-title>{{ familia.sobrenome }}</v-list-item-title>
            <v-list-item-subtitle>{{ familia.membros }} membros</v-list-item-subtitle>
    </v-list-item>
    </v-list>
  </section>
  <section v-if="peopleList.length" class="mt-8">
    <h3>Dados das pessoas</h3>
    <pre>{{ peopleList }}</pre>
  </section>
</template>
<script setup lang="ts">

import { ref, computed } from 'vue'
const config = useRuntimeConfig()
const base = config.public.apiBase

// Buscar todas as pessoas
const { data: allPeopleData } = await useFetch(`${base}/items/people`, {
  query: {
    fields: '*,pai.nome,mae.nome'
  }
})



// Verificar se os dados foram carregados corretamente
const peopleList = computed(() => {
  const data = allPeopleData.value && typeof allPeopleData.value === 'object' && 'data' in allPeopleData.value ? (allPeopleData.value as any).data : []
  const arr = Array.isArray(data) ? data : []
  console.log('peopleList:', arr)
  return arr
})

// Extrair sobrenomes únicos
const sobrenomes = computed(() => Array.from(new Set(peopleList.value.map((p: any) => p.familia).filter(Boolean))))

// Montar lista de famílias com contagem de membros
const families = computed(() =>
  sobrenomes.value.map(sobrenome => {
    const membros = peopleList.value.filter((p: any) => p.familia === sobrenome).length
    return { sobrenome, membros }
  })
)

onMounted(() => {
console.log('#######################:', allPeopleData)
})
</script>

