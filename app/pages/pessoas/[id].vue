<template>
  <section v-if="person">
    <h2>{{ person.nome_completo }}</h2>
    <p> Nascimento: {{ person.data_de_nascimento|| "N/D" }}</p>
    <div class="mt-4">
        <h3> Relações Familiares</h3>
        <ul>
            <li v-if="person.pai">Pai: {{ person.pai.nome_completo }} </li>
            <li v-if="person.mae">Mãe: {{ person.mae.nome_completo }} </li>
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
  nome_completo: string;
  data_de_nascimento: string
  sexo?: string; 
  id: number | string;
}

interface PersonDetails extends Person {
  pai?: Person;
  mae?: Person;
}


const route = useRoute()
const person = ref<PersonDetails | null>(null)
const children = ref<Person[]>([])
import { onMounted } from 'vue'

async function getPeople () {
  const { data } = await useFetch(`http://localhost:8055/items/people/${route.params.id}`, {
    query: {
      fields: 'nome_completo,data_de_nascimento,sexo,pai.id,pai.nome_completo,mae.id,mae.nome_completo,falecido,falecimento,families,conjugue'
    }
  })
  // Directus retorna { data: {...} }
  return data.value ? (data.value as any).data : null
}

async function getChildren (parentId: string | number) {
  // Busca filhos onde pai = parentId OU mae = parentId
  const { data } = await useFetch(`http://localhost:8055/items/people`, {
    query: {
      filter: {
        _or: [
          { pai: parentId },
          { mae: parentId }
        ]
      },
      fields: 'nome_completo,data_de_nascimento,sexo,pai.id,mae.id'
    }
  })
  return data.value && (data.value as any).data ? (data.value as any).data : []
}

onMounted(async () => {
  const data = await getPeople()
  if (data && typeof data === 'object') {
    person.value = data as PersonDetails
    // Só busca filhos se a pessoa foi carregada
    children.value = await getChildren(person.value.id)
  }
})

</script>
