<template>
    <v-container>
        <button @click="createNewItem">Criar pessoa</button>
        <p v-if="isLoading">Enviando...</p>
        <p v-if="error">{{ error }}</p>
    </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { createDirectus, staticToken, rest, createItem } from '@directus/sdk';

// 🧬 Defina o tipo da sua coleção
interface Pessoa {
    id: number;
    nome: string;
    nascimento: string;
    sexo: string;
}

type Schema = {
    pessoa: Pessoa;
};

const secretkey = useRuntimeConfig().public.directusToken
const urlDirectus = useRuntimeConfig().public.apiBase
console.log('aqui a secret key', secretkey, urlDirectus)
// 🔌 Cria o client com REST incluído
const client = createDirectus<Schema>(urlDirectus)
    .with(staticToken(secretkey))
    .with(rest());


// ✍️ Novo item a ser criado
const newItem = ref({
    nome: 'Andrezinho2',
    nascimento: '1999-12-12',
    sexo: 'Masculino',
    status: 'published'
});

// 🌐 Estado de carregamento e erro
const isLoading = ref(false);
const error = ref('');

// 🚀 Função para criar o item via request + createItem
const createNewItem = async () => {
    isLoading.value = true;
    error.value = '';

    try {
        const created = await client.request(
            createItem<Schema, 'pessoa', Pessoa>('pessoa', newItem.value)
        );
        console.log('Item criado com sucesso:', created);
    } catch (err: any) {
        console.error('Erro ao criar item:', err);
        error.value = err?.errors?.[0]?.message || 'Erro desconhecido';
    } finally {
        isLoading.value = false;
    }
};
</script>
