<template>
<v-container class="pt-8 mt-8">


  <v-row>
    <v-col cols="12" md="4">
         <div>
        <h1>Pessoa: {{ pessoa?.nome || 'Carregando...' }}</h1>
        <div v-if="pessoa">
            <p><strong>ID:</strong> {{ pessoa.id }}</p>
            <p><strong>Nome:</strong> {{ pessoa.nome }}</p>
            <p><strong>Idade:</strong> {{ pessoa.idade }}</p>
            <!-- Adicione mais campos conforme necessário -->
        </div>
        <div v-else>
            <p>Carregando dados da pessoa...</p>
        </div>
    </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const config = useRuntimeConfig()
const route = useRoute()
const pessoa = ref(await getPeople())

 

async function getPeople() {
  try {
    const { data } = await $fetch(`${config.public.apiBase}/items/people/${route.params.id}`, {
      
      params: {
        fields: [
        'pai.nome',
        'mae.nome',
        'data_de_falecimento',
        'nome']
      }
    })
    return data

  } catch (error) {
    console.error('Error fetching people:', error)
    return []
  } 
}
</script>''