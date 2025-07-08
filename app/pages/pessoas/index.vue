<template>
  <section>
    <h2>Lista de Indivíduos</h2>
    
    <!-- Campo de busca -->
    <v-text-field v-model="searchQuery" label="Buscar pessoa" prepend-icon="mdi-magnify" hide-details="auto" />
    
    <!-- Lista de resultados -->
    <v-list>
      <v-list-item 
        v-for="person in filteredPeople" :key="person.id" 
        @click="selectPerson(person)"
      >
        <v-list-item-avatar>
          <v-icon color="primary">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ person.nome }}</v-list-item-title>
          <v-list-item-subtitle>Nasc.: {{ person.nascimento }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- Botão de convidar primo (por exemplo) -->
          <v-btn icon="mdi-account-plus" @click.stop="inviteRelative(person)" :title="'Convidar parente de ' + person.nome"></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()

interface Person {
  id: number;
  nome: string;
  nascimento: number;
}

const config = useRuntimeConfig()

const { data: peopleData, pending, error } = await useFetch(
  `${config.public.apiBase}/items/people`
)
// `peopleData` will be a ref (reactive) containing the response.

const people = ref(await getPeople())


// const people = ref<Person[]>([
//   { id: 1, nome: "Ana Silva", nascimento: 1980 },
//   { id: 2, nome: "Bruno Souza", nascimento: 1992 },
//   { id: 3, nome: "Carlos Lima", nascimento: 1975 },
// ])

const searchQuery = ref<string>(Array.isArray(route.query.q) ? route.query.q[0] || '' : route.query.q || '')

const filteredPeople = computed(() => {
  if (!searchQuery.value) {
    return people.value
  }
  const query = searchQuery.value.toLowerCase()
  return people.value.filter(p => p.nome.toLowerCase().includes(query))
})

// Ações (a implementar posteriormente)
const selectPerson = (person: Person) => {
  // ex: navegar para página de detalhes (implementaremos depois)
  navigateTo(`/pessoas/${person.id}`)
}

const inviteRelative = (person: Person) => {
  alert(`Convite enviado para parente de ${person.nome}! (Simulação)`)
}

async function pegaPessoas () {
  const { data: peopleData } = await useFetch(
    `${config.public.apiBase}/items/people`
  ) 
  return peopleData
}

async function getPeople() {
  try {
    const { data } : { data: Person[] } = await $fetch(`${config.public.apiBase}/items/people`)
    return data
  } catch (error) {
    console.error('Erro ao buscar pessoas:', error)
  }
}
</script>