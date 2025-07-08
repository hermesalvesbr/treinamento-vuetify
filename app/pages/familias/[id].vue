<template>
  <section v-if="person">
    <h2>{{ person.nome }}</h2>
    <p> Nascimento: {{ person.nascimento || "N/D" }}</p>
    <div class="mt-4">
        <h3> Relações Familiares</h3>
        <ul>
            <li v-if="person.pai">Pai: {{ person.pai.nome }} </li>
            <li v-if="person.mae">Mãe: {{ person.mae.nome }} </li>
            <li v-if="children && children.length">Filhos:
              <ul>
                <li v-for="child in children" :key="child.id">{{ child.nome_completo }} </li>
              </ul>
            </li>
        </ul>
    </div>
  </section>
  <section v-else>
    <p>carregando...</p>
  </section>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router'
import { ref } from 'vue'
// Se estiver usando Nuxt 3, use useFetch do Nuxt
// import { useFetch } from '#app'

// Definição mínima para Person
interface Person {
  id: number | string;
  nome: string;
  nome_completo?: string;
  nascimento?: string;
}

interface PersonDetails extends Person {
  pai?: Person;
  mae?: Person;
}

const route = useRoute()
const personId = route.params.id

const person = ref<PersonDetails | null>(null)
const children = ref<Person[]>([])

// Buscar dados da pessoa pelo ID, incluindo pai, mãe e filhos
const { data: personData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/people/${personId}`, {
  query: {
    fields: '*,pai.nome,mae.nome'
  }
})
if (personData.value && typeof personData.value === 'object' && personData.value !== null && 'data' in personData.value) {
  person.value = (personData.value as any).data as PersonDetails
}

// Buscar filhos desta pessoa (supondo campo pai_id ou mae_id relacionando)
const { data: childrenData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/people`, {
  query: {
    filter: {
      pai: personId // supondo 'pai' é um campo relacional
    },
  fields: ['id','nome_completo','data_de_nascimento','sexo','pai.nome','mae.nome','falecido','falecimento','families','conjugue']
  }
})
if (childrenData.value && typeof childrenData.value === 'object' && childrenData.value !== null && 'data' in childrenData.value) {
  children.value = (childrenData.value as any).data as Person[]
}

</script>