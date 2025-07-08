<template>
  <section>
    <h2>Lista de Indivíduos</h2>
    
    <!-- Campo de busca -->
    <v-text-field v-model="searchQuery" label="Buscar pessoa" prepend-icon="mdi-magnify" hide-details="auto" class="mb-4" />
    
    <!-- Lista de resultados -->
     <div class="mx-auto mt-4" style="max-width: 600px;">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Person {
  id: number;
  nome: string;
  nascimento: number;
}

const route = useRoute()

const config = useRuntimeConfig()


// `peopleData` will be a ref (reactive) containing the response.

// const people = ref<Person[]>([
//   // { id: 1, nome: "Ana Silva", nascimento: 1980 },
//   // { id: 2, nome: "Bruno Souza", nascimento: 1992 },
//   // { id: 3, nome: "Carlos Lima", nascimento: 1975 },
//   // ...adicione mais conforme necessário
// ])
const { data: peopleData, pending, error } = await useFetch(
  `${config.public.apiBase}/items/people`
)

const people = ref<Person[]>([])
if (peopleData.value && 'data' in peopleData.value) {
  people.value = peopleData.value.data as Person[]
}

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

async function getPeople() {
  try {
    const data = await $fetch(`${config.public.apiBase}/items/people`, {
      params: {
        fields: ['*']
      }
    })

    return data
  } catch (error) {
    console.error('Erro ao carregar pessoas:', error)
  }
}

onMounted(async () => {
  const item = await getPeople()
  console.log('Pessoas carregadas:', item)
})
</script>