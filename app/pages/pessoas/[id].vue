<template>
 <v-container class="pt-8 mt-8">

  <section v-if="person">
    <h2>{{ person.nome }}</h2>
    <p>Nascimento: {{ person.nascimento || 'N/D' }}</p>
    <div class="mt-4">
      <h3>Relações Familiares</h3>
      <ul>
        <li v-if="person.pai">Pai: {{ person.pai.nome }}</li>
        <li v-if="person.mae">Mãe: {{ person.mae.nome }}</li>
        <!-- ... outros relacionamentos ... -->
      </ul>
    </div>
  </section>
  <section v-else>
    <p>Carregando...</p>
  </section>
 </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const config = useRuntimeConfig()
const person = ref(await getPeople())

async function getPeople() {
  try {
    const { data } : { data: any} = await $fetch(`${config.public.apiBase}/items/people/${route.params.id}`, {
      params: {
        fields: ['*', 'pai.nome', 'mae.nome', 'falecimento', 'apelido', 'falecido', 'nome', 'id', 'status']
      }
    })
    // Trata a resposta para garantir que person seja um objeto esperado
 
    return data
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error)
    return null
  }
}
</script>