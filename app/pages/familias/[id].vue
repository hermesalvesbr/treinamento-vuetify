<template>
    <div>
        <h1>Família {{ familia?.nome || id }}</h1>
        <div v-if="familia">
            <p><strong>ID:</strong> {{ familia.id }}</p>
            <p><strong>Descrição:</strong> {{ familia.descricao }}</p>
            <!-- Adicione mais campos conforme necessário -->
        </div>
        <div v-else>
            <p>Carregando...</p>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const id = route.params.id
const familia = ref(null)

onMounted(async () => {
    // Substitua pela sua lógica de busca de dados
    // Exemplo fictício:
    familia.value = await fetchFamilia(id)
})

async function fetchFamilia(id) {
    // Simulação de busca de dados
    // Troque por chamada real à API ou banco de dados
    return {
        id,
        nome: 'Família Exemplo',
        descricao: 'Descrição da família exemplo.'
    }
}
</script>