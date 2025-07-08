<template>
  <section>
    <h2>Lista de Indivíduos</h2>
    <v-row>
     
      <v-col cols="12" md="4">
        <v-text-field v-model="searchQuery" label="Buscar pessoa" prepend-icon="mdi-magnify" hide-details="auto" class="mb-4" />
      </v-col>
      <v-col cols="12" md="8">
        <v-list class="mx-auto" style="max-width: 600px;">
          <v-list-item 
            v-for="person in filteredPeople" :key="person.id" 
            @click="selectPerson(person)"
          >
            <v-list-item-avatar>
              <v-icon color="primary">mdi-account-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
            <v-list-item-title>{{ person.nome_completo || person.nome }}</v-list-item-title>
            <v-list-item-subtitle>Nasc.: {{ person.data_de_nascimento || 'N/D' }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon="mdi-account-plus" @click.stop="inviteRelative(person)" :title="'Convidar parente de ' + person.nome"></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'

interface Person {
  id: number;
  nome: string;
  nome_completo?: string;
  data_de_nascimento?: string | null;
}

const route = useRoute()
const config = useRuntimeConfig()

// Busca reativa dos dados das pessoas
const { data: peopleData } = await useFetch(`${config.public.apiBase}/items/people`)

const people = computed<Person[]>(() => {
  const data = peopleData.value && typeof peopleData.value === 'object' && 'data' in peopleData.value ? (peopleData.value as any).data : []
  return Array.isArray(data) ? data as Person[] : []
})

const searchQuery = ref<string>(
  typeof route.query.q === 'string' ? route.query.q :
  Array.isArray(route.query.q) ? route.query.q[0] || '' :
  ''
)

const filteredPeople = computed(() => {
  if (!searchQuery.value) {
    return people.value
  }
  const query = String(searchQuery.value).toLowerCase()
  return people.value.filter(p => {
    return ( 
      (p.nome && p.nome.toLowerCase().includes(query)) ||
      (p.nome_completo && p.nome_completo.toLowerCase().includes(query))
    )
  })
})

const selectPerson = (person: Person) => {
  // ex: navegar para página de detalhes (implementaremos depois)
  navigateTo(`/pessoas/${person.id}`)
}
const inviteRelative = (person: Person) => {
  alert(`Convite enviado para parente de ${person.nome}! (Simulação)`)
}
</script>