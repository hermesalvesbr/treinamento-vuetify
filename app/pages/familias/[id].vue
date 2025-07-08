<template>
    <div>
        <h1>Família: {{ familia?.nome || 'Carregando...' }}</h1>
        <div v-if="familia">
            <p><strong>ID:</strong> {{ familia.id }}</p>
            <p><strong>Descrição:</strong> {{ familia.descricao }}</p>
            <!-- Adicione mais campos conforme necessário -->
        </div>
        <div v-else>
            <p>Carregando dados da família...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const familia = ref(null)

onMounted(async () => {
    const id = route.params.id
    // Substitua a URL abaixo pela sua API real
    const res = await fetch(`/api/familias/${id}`)
    if (res.ok) {
        familia.value = await res.json()
    }
})
</script>