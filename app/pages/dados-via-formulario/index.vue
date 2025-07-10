<template>
    <v-container class="d-flex justify-left">
        <v-card min-width="400">
            <v-card-title>Cadastro de pessoa</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="nome" label="Nome" required />
                    <v-date-input v-model="nascimento" label="Nascimento"></v-date-input>
                    <v-select v-model="sexo" label="Sexo" required :items="['masculino', 'feminino', 'outro']" />
                    <v-card-actions class="justify-end" />
                    <v-btn color="primary" @click="createNewItem">
                        Cadastrar pessoa
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
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

const client = createDirectus<Schema>(urlDirectus)
    .with(staticToken(secretkey))
    .with(rest());

const nome = ref('')
const nascimento = ref()
const sexo = ref('')

const newItem = ref({
    nome: nome,
    nascimento: nascimento,
    sexo: sexo
});

const isLoading = ref(false);
const error = ref('');

const createNewItem = async () => {
    isLoading.value = true;
    error.value = '';

    try {
        const created = await client.request(
            createItem<Schema, 'pessoa', any>('pessoa', newItem.value)
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